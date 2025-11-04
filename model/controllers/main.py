from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib
import os
import json
import re
import pdfplumber
from docx import Document
from dotenv import load_dotenv
import google.generativeai as genai
from pydantic import BaseModel
from quiz_generator import generate_quiz  
from PyPDF2 import PdfReader
import traceback

# ───────────── Setup ─────────────
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel("models/gemini-2.0-flash-lite")

app = FastAPI(title="SkillLens Employability & Quiz API", version="3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ───────────── Load ML Model ─────────────
try:
    model = joblib.load("employability_model.pkl")
    print("✅ Employability model loaded successfully.")
except Exception as e:
    model = None
    print(f"⚠️ Model not loaded: {e}")


# ───────────── Text Extraction ─────────────
def extract_text_from_pdf(path):
    with pdfplumber.open(path) as pdf:
        return "\n".join([page.extract_text() or "" for page in pdf.pages])

def extract_text_from_docx(path):
    doc = Document(path)
    return "\n".join([p.text for p in doc.paragraphs])

def extract_text(path):
    if path.lower().endswith(".pdf"):
        return extract_text_from_pdf(path)
    elif path.lower().endswith((".docx", ".doc")):
        return extract_text_from_docx(path)
    else:
        raise ValueError("Unsupported file format")


# ───────────── Skill Extraction ─────────────
def extract_tech_skills(text):
    prompt = f"""
    Extract only technical skills such as programming languages, frameworks,
    databases, tools, and ML technologies. Exclude soft skills.
    Return JSON array only.
    Text:
    {text}
    """
    try:
        res = gemini_model.generate_content(prompt)
        data = res.text.strip().replace("```json", "").replace("```", "")
        return json.loads(data) if isinstance(json.loads(data), list) else []
    except Exception as e:
        print("⚠️ Tech skill extraction failed:", e)
        return []

def extract_soft_skills(text):
    prompt = f"""
    Extract soft skills like communication, teamwork, leadership,
    adaptability, creativity, etc. Return JSON array only.
    Text:
    {text}
    """
    try:
        res = gemini_model.generate_content(prompt)
        data = res.text.strip().replace("```json", "").replace("```", "")
        return json.loads(data) if isinstance(json.loads(data), list) else []
    except Exception as e:
        print("⚠️ Soft skill extraction failed:", e)
        return []


# ───────────── CGPA Extraction ─────────────
def extract_cgpa(text):
    try:
        matches = re.findall(r"(\d\.\d{1,2})", text)
        possible = [float(m) for m in matches if 0 < float(m) <= 10]
        if possible:
            return round(sum(possible) / len(possible), 2)
    except:
        pass

    prompt = f"Extract the CGPA (out of 10) from this marks card:\n{text}\nReturn only the number."
    try:
        res = gemini_model.generate_content(prompt)
        return float(res.text.strip())
    except:
        return 0.0


# ───────────── Employability Analysis ─────────────
@app.post("/analyze-employability/")
async def analyze_employability(
    resume: UploadFile = File(...),
    marks_card: UploadFile = File(...)
):
    try:
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        # Safe filenames
        resume_path = os.path.join(UPLOAD_DIR, f"resume_{resume.filename.replace(' ', '_')}")
        marks_path = os.path.join(UPLOAD_DIR, f"marks_{marks_card.filename.replace(' ', '_')}")

        # Save uploaded files
        with open(resume_path, "wb") as f:
            f.write(await resume.read())
        with open(marks_path, "wb") as f:
            f.write(await marks_card.read())

        print("📁 Uploaded files:", resume.filename, marks_card.filename)
        print("📂 Upload directory contents:", os.listdir(UPLOAD_DIR))

        if not os.path.exists(resume_path):
            raise HTTPException(status_code=400, detail=f"Resume not found at {resume_path}")
        if not os.path.exists(marks_path):
            raise HTTPException(status_code=400, detail=f"Marks card not found at {marks_path}")

        # Extract data
        resume_text = extract_text(resume_path)
        marks_text = extract_text(marks_path)

        tech_skills = extract_tech_skills(resume_text)
        soft_skills = extract_soft_skills(resume_text)
        all_skills = list(set(tech_skills + soft_skills))

        cgpa = extract_cgpa(marks_text)

        if not model:
            raise HTTPException(status_code=500, detail="Model not loaded")

        X = pd.DataFrame([{
            "cgpa": cgpa,
            "num_skills": len(all_skills),
            "tech_skill_score": len(tech_skills),
            "soft_skill_score": len(soft_skills),
        }])

        pred = model.predict(X)[0]
        confidence = float(model.predict_proba(X)[0][1])
        placement_percent = round(confidence * 100, 2)

        reason_prompt = f"""
        A student with CGPA {cgpa}, {len(tech_skills)} technical and {len(soft_skills)} soft skills
        has a placement chance of {placement_percent}%.
        In 2–3 lines, explain the reason for this prediction.
        """
        reason = gemini_model.generate_content(reason_prompt).text.strip()

        return {
            "cgpa": cgpa,
            "placement_chance": f"{placement_percent}%",
            "reason": reason,
            "skills": {
                "tech_skills": tech_skills,
                "soft_skills": soft_skills,
                "total_skills": all_skills,
            },
        }

    except Exception as e:
        print("❌ Error analyzing employability:", e)
        return JSONResponse(content={"error": str(e)}, status_code=500)


# ───────────── Skill Extraction Endpoint ─────────────
@app.post("/extract-skills/")
async def extract_skills(file: UploadFile = File(...)):
    try:
        path = os.path.join(UPLOAD_DIR, f"{file.filename.replace(' ', '_')}")
        with open(path, "wb") as f:
            f.write(await file.read())

        text = extract_text(path)
        prompt = f"Extract all professional, technical, and soft skills from this text:\n{text}\nReturn as JSON list."
        res = gemini_model.generate_content(prompt)
        skills = json.loads(res.text.strip().replace("```json", "").replace("```", ""))
        return {"filename": file.filename, "skills": skills}

    except Exception as e:
        print("❌ Error extracting skills:", e)
        return JSONResponse(content={"error": str(e)}, status_code=500)
    

class QuizRequest(BaseModel):
    skill: str
    level: str
    num_questions: int = 5

@app.post("/generate-quiz/")
async def generate_quiz_api(data: dict):
    try:
        skill = data.get("skill", "Python")
        level = data.get("level", "easy")
        num = data.get("num_questions", 5)
        quiz = generate_quiz(skill, level, num)
        return {"questions": quiz}
    except Exception as e:
        print("❌ Error generating quiz:", e)
        raise HTTPException(status_code=500, detail=str(e))


class Message(BaseModel):
    message: str


# ------------------- ROUTE -------------------
@app.post("/ask-gemini")
async def ask_gemini(msg: Message):
    try:
        if not msg.message.strip():
            return {"reply": "Please provide a question."}

        prompt = f"""
You are ChatBolt, an AI mentor specializing in:
- College placements guidance
- Resume writing and skill evaluation
- Interview preparation (HR + technical)
- Career roadmap advice

User Query: {msg.message}

Provide a clear, friendly, helpful response.
"""

        # Use gemini_model, NOT joblib model
        result = gemini_model.generate_content(prompt)
        if not result or not hasattr(result, "text"):
            raise Exception("No response from Gemini API")

        reply = result.text.strip()
        return {"reply": reply}

    except Exception as e:
        print("❌ Gemini API Error:", e)
        raise HTTPException(status_code=500, detail="Gemini API failed. Check logs.")
