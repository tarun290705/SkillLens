from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import os
from extractor import extract_text, extract_tech_skills_with_gemini

app = FastAPI(title="SkillLens API", version="1.0")

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/extract-skills/")
async def extract_skills(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        # Save uploaded file
        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Extract text
        text = extract_text(file_path)
        skills = extract_tech_skills_with_gemini(text)

        return JSONResponse(
            content={"filename": file.filename, "skills": skills},
            status_code=200
        )

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
@app.post("/extract-multi/")
async def extract_multi(files: list[UploadFile] = File(...)):
    combined_text = ""
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        combined_text += extract_text(file_path) + "\n\n"

    skills = extract_tech_skills_with_gemini(combined_text)
    return {"skills": skills}

