from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os
import json
import random
from dotenv import load_dotenv
import google.generativeai as genai
from PyPDF2 import PdfReader
import traceback

# ─────────────────────────────────────────────
# 🔧 Configuration
# ─────────────────────────────────────────────
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="SkillLens Employability & Quiz API", version="1.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Load ML model
try:
    model = joblib.load("employability_model.pkl")
except Exception:
    model = None
    print("⚠️ Model not found — ensure employability_model.pkl exists")

# ─────────────────────────────────────────────
# 📄 Dummy text extractor placeholder
# (Replace with your actual implementation)
# ─────────────────────────────────────────────
def extract_text(file_path: str) -> str:
    """Extract text safely from PDF files."""
    text = ""
    if file_path.endswith(".pdf"):
        try:
            reader = PdfReader(file_path)
            for page in reader.pages:
                text += page.extract_text() or ""
        except Exception as e:
            text = f"Error reading PDF: {e}"
    else:
        # fallback for txt files or plain text
        with open(file_path, "r", errors="ignore") as f:
            text = f.read()
    return text

# ─────────────────────────────────────────────
# 🧠 Gemini Skill Validator
# ─────────────────────────────────────────────
def classify_skills(skills):
    prompt = f"""
    You are an AI skill validator. For each skill in the following list, classify it as:
    - TECH if it is a technical or programming-related skill
    - SOFT if it is a soft skill (communication, teamwork, etc.)
    - INVALID if it is not a valid or professional skill.
    Input Skills: {skills}
    Return JSON like:
    {{
        "valid_skills": ["Python", "SQL", "Teamwork"],
        "tech_skills": ["Python", "SQL"],
        "soft_skills": ["Teamwork"]
    }}
    """

    response = genai.GenerativeModel("gemini-1.5-flash-latest").generate_content(prompt)
    try:
        result = json.loads(response.text)
        return result
    except Exception:
        return {"valid_skills": [], "tech_skills": [], "soft_skills": []}

# ─────────────────────────────────────────────
# 📤 Resume Upload & Skill Extraction
# ─────────────────────────────────────────────
@app.post("/extract-skills/")
async def extract_skills(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())

        text = extract_text(file_path)
        print("✅ Extracted Text Preview:", text[:300])

        prompt = f"Extract all professional, technical, and soft skills from this text:\n{text}\nReturn as JSON list."
        response = genai.GenerativeModel("gemini-1.5-flash-latest").generate_content(prompt)
        print("✅ Gemini Raw Response:", response.text[:300])

        try:
            skills = json.loads(response.text)
        except json.JSONDecodeError:
            print("⚠️ Gemini returned non-JSON response.")
            skills = [s.strip() for s in response.text.split(",") if s.strip()]

        classified = classify_skills(skills)

        return JSONResponse(content={
            "filename": file.filename,
            "skills": classified
        }, status_code=200)

    except Exception as e:
        print("❌ ERROR DETAILS:")
        traceback.print_exc()   # <── shows the exact line and reason
        return JSONResponse(content={"error": str(e)}, status_code=500)


# ─────────────────────────────────────────────
# 📊 Employability Prediction
# ─────────────────────────────────────────────
class EmployabilityInput(BaseModel):
    cgpa: float
    skills: list[str]

@app.post("/predict")
def predict_employability(data: EmployabilityInput):
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded")

    classified = classify_skills(data.skills)

    num_skills = len(classified["valid_skills"])
    tech_skill_score = len(classified["tech_skills"])
    soft_skill_score = len(classified["soft_skills"])

    X = pd.DataFrame([{
        "cgpa": data.cgpa,
        "num_skills": num_skills,
        "tech_skill_score": tech_skill_score,
        "soft_skill_score": soft_skill_score
    }])

    pred = model.predict(X)[0]
    confidence = float(model.predict_proba(X)[0][1])

    return {
        "employable": bool(pred),
        "confidence": round(confidence, 3),
        "classified_skills": classified,
        "input_summary": {
            "cgpa": data.cgpa,
            "num_skills": num_skills
        }
    }
