import os
import pdfplumber
from docx import Document
from dotenv import load_dotenv
import google.generativeai as genai
import json

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "models/gemini-2.5-pro"
model = genai.GenerativeModel(MODEL_NAME)

def extract_text_from_pdf(filepath):
    with pdfplumber.open(filepath) as pdf:
        return "\n".join([p.extract_text() or "" for p in pdf.pages])

def extract_text_from_docx(filepath):
    doc = Document(filepath)
    return "\n".join([p.text for p in doc.paragraphs])

def extract_text(filepath):
    if filepath.lower().endswith(".pdf"):
        return extract_text_from_pdf(filepath)
    elif filepath.lower().endswith((".docx", ".doc")):
        return extract_text_from_docx(filepath)
    else:
        raise ValueError("Unsupported file format")

def extract_tech_skills_with_gemini(text):
    prompt = f"""
    You are an expert technical skill extractor.
    Extract only technical skills such as:
    - Programming languages
    - Frameworks and libraries
    - Databases
    - Tools, platforms, and cloud technologies
    - ML/Data Science tools

    Exclude soft skills.
    Return only a JSON array of skills.

    Text:
    {text}
    """
    response = model.generate_content(prompt)
    output = response.text.strip()

    try:
        output = output.replace("```json", "").replace("```", "")
        skills = json.loads(output)
        if isinstance(skills, list):
            return [s.strip() for s in skills]
    except Exception:
        return []
    return []
