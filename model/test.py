import pdfplumber
from docx import Document
import re
from keybert import KeyBERT
import spacy

# Initialize NLP + Keyword Model
nlp = spacy.load("en_core_web_lg")
kw_model = KeyBERT(model='all-MiniLM-L6-v2')  # lightweight transformer model

def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                text += "\n" + t
    return text

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    return "\n".join(p.text for p in doc.paragraphs)

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_skills_from_text(text):
    keywords = kw_model.extract_keywords(text, 
                                         keyphrase_ngram_range=(1, 2),
                                         stop_words='english',
                                         top_n=20)
    return sorted({kw for kw, score in keywords})

def extract_skills_from_file(file_path):
    if file_path.endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        text = extract_text_from_docx(file_path)
    else:
        with open(file_path, 'r', encoding='utf-8') as f:
            text = f.read()
    text = clean_text(text)
    return extract_skills_from_text(text)

if __name__ == "__main__":
    file_path = r"D:/SkillLens/model/SUHAS_RESUME.docx"
    skills = extract_skills_from_file(file_path)
    print("✅ Extracted Keywords / Skills:")
    for s in skills:
        print("-", s)
