from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os
import json
import re
import pdfplumber
from docx import Document
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "models/gemini-2.5-pro"
gemini_model = genai.GenerativeModel(MODEL_NAME)

app = FastAPI(title="SkillLens Employability & Quiz API", version="3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Load ML model
try:
    model = joblib.load("employability_model.pkl")
    print("Employability model loaded successfully.")
except Exception:
    model = None
    print("employability_model.pkl not found.")


# ─────────────────────────────────────────────
# File Text Extraction Utilities
# ─────────────────────────────────────────────
def extract_text_from_pdf(filepath: str):
    with pdfplumber.open(filepath) as pdf:
        return "\n".join([p.extract_text() or "" for p in pdf.pages])


def extract_text_from_docx(filepath: str):
    doc = Document(filepath)
    return "\n".join([p.text for p in doc.paragraphs])


def extract_text(filepath: str):
    """Auto-detect and extract text from PDF or DOCX"""
    if filepath.lower().endswith(".pdf"):
        return extract_text_from_pdf(filepath)
    elif filepath.lower().endswith((".docx", ".doc")):
        return extract_text_from_docx(filepath)
    else:
        raise ValueError("Unsupported file format")


# ─────────────────────────────────────────────
#  Skill Extraction and Classification
# ─────────────────────────────────────────────
def extract_tech_skills_with_gemini(text: str):
    prompt = f"""
    You are an expert technical skill extractor.
    Extract only *technical skills* such as:
    - Programming languages
    - Frameworks and libraries
    - Databases
    - Tools, platforms, and cloud technologies
    - ML/Data Science tools

    Exclude soft skills.
    Return only a JSON array of strings.
    Text:
    {text}
    """
    response = gemini_model.generate_content(prompt)
    output = response.text.strip()

    try:
        output = output.replace("```json", "").replace("```", "")
        skills = json.loads(output)
        if isinstance(skills, list):
            return [s.strip() for s in skills]
    except Exception:
        return []
    return []


def extract_soft_skills_with_gemini(text: str):
    prompt = f"""
    Extract only *soft skills* such as communication, teamwork, leadership,
    adaptability, creativity, etc. Return a JSON array of soft skills.
    Text:
    {text}
    """
    response = gemini_model.generate_content(prompt)
    output = response.text.strip()
    try:
        output = output.replace("```json", "").replace("```", "")
        skills = json.loads(output)
        if isinstance(skills, list):
            return [s.strip() for s in skills]
    except Exception:
        return []
    return []


# ─────────────────────────────────────────────
#  CGPA Extraction
# ─────────────────────────────────────────────
def extract_cgpa_from_marks(text: str) -> float:
    # Try regex first
    matches = re.findall(r"(\d\.\d{1,2})", text)
    possible = [float(m) for m in matches if 0 < float(m) <= 10]
    if possible:
        return round(sum(possible) / len(possible), 2)

    # fallback: use Gemini to interpret marks
    prompt = f"Extract only the CGPA (out of 10) from this marks card text:\n{text}\nReturn only a number."
    response = gemini_model.generate_content(prompt)
    try:
        return float(response.text.strip())
    except:
        return 0.0


# ─────────────────────────────────────────────
# Employability Prediction Endpoint
# ─────────────────────────────────────────────
@app.post("/analyze-employability/")
async def analyze_employability(
    resume: UploadFile = File(...),
    marks_card: UploadFile = File(...)
):
    """Upload resume + marks card → Get employability score, reasoning, and skills."""
    try:
        # Save uploaded files
        resume_path = os.path.join(UPLOAD_DIR, resume.filename)
        marks_path = os.path.join(UPLOAD_DIR, marks_card.filename)

        with open(resume_path, "wb") as f:
            f.write(await resume.read())
        with open(marks_path, "wb") as f:
            f.write(await marks_card.read())

        # Extract text
        resume_text = extract_text(resume_path)
        marks_text = extract_text(marks_path)

        # Extract skills
        tech_skills = extract_tech_skills_with_gemini(resume_text)
        soft_skills = extract_soft_skills_with_gemini(resume_text)
        all_skills = list(set(tech_skills + soft_skills))

        # Extract CGPA
        cgpa = extract_cgpa_from_marks(marks_text)

        # Predict using model
        if not model:
            raise HTTPException(status_code=500, detail="Model not loaded")

        X = pd.DataFrame([{
            "cgpa": cgpa,
            "num_skills": len(all_skills),
            "tech_skill_score": len(tech_skills),
            "soft_skill_score": len(soft_skills)
        }])

        pred = model.predict(X)[0]
        confidence = float(model.predict_proba(X)[0][1])
        placement_percent = round(confidence * 100, 2)

        # Generate reason with Gemini
        reason_prompt = f"""
        A student has:
        - CGPA: {cgpa}
        - Technical skills: {tech_skills}
        - Soft skills: {soft_skills}
        - Predicted placement chance: {placement_percent}%

        In 2-3 lines, explain the reason behind this probability.
        """
        reason_response = gemini_model.generate_content(reason_prompt)
        reason = reason_response.text.strip()

        return JSONResponse(content={
            "cgpa": cgpa,
            "placement_chance": f"{placement_percent}%",
            "reason": reason,
            "skills": {
                "tech_skills": tech_skills,
                "soft_skills": soft_skills,
                "total_skills": all_skills
            }
        }, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/extract-skills/")
async def extract_skills(file: UploadFile = File(...)):
    """Extract skills from uploaded resume and classify with Gemini."""
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())

        text = extract_text(file_path)
        prompt = f"Extract all professional, technical, and soft skills from this text:\n{text}\nReturn as JSON list."
        response = genai.GenerativeModel("gemini-1.5-flash").generate_content(prompt)
        skills = json.loads(response.text)
        classified = classify_skills(skills)

        return JSONResponse(content={
            "filename": file.filename,
            "skills": classified
        }, status_code=200)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

