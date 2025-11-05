# SkillLens



SkillLens is a comprehensive, AI-powered platform designed to bridge the gap between students and their career aspirations. It equips students with tools for skill assessment, personalized learning, and employability analysis, while providing placement officers with streamlined data management capabilities.

## ✨ Features

- **Dual-Role System**: Separate, tailored dashboards for Students and Placement Officers.
- **AI-Powered Employability Analysis**: Upload a resume and marks card to receive a detailed employability report, predicting placement chances based on CGPA, technical skills, and soft skills.
- **Intelligent Skill Extraction**: Automatically extracts technical and soft skills from resumes using a Gemini-powered engine.
- **ChatBolt AI Mentor**: An integrated chatbot for instant guidance on placements, resume building, interview preparation, and career roadmaps.
- **Personalized Learning Roadmaps**: Generate custom, step-by-step preparation plans for any dream company.
- **AI Quiz Generator**: Create on-the-fly MCQs to assess proficiency in any programming language or technical topic.
- **Integrated Code Editor**: Practice coding in multiple languages (Python, JavaScript, Java, etc.) directly within the platform.
- **Alumni Connect**: Search and find alumni working at specific companies to seek mentorship and guidance.
- **Company Information Hub**: A centralized library of upcoming company drives, roles, packages, and eligibility criteria.
- **Comprehensive Student Profiles**: Students can create and manage detailed profiles showcasing their academic performance, skills, and projects.

## 🏛️ Project Architecture

SkillLens is built on a microservices-style architecture, separating concerns for scalability and maintainability.

-   **Frontend**: A responsive user interface built with **React** and **Vite**. It handles all user interactions and communicates with the backend APIs.
-   **Backend**: A robust API server built with **Django** and **Django REST Framework**. It manages user authentication, profile data, quiz information, and acts as a gateway to the model server.
-   **Model Server**: A high-performance AI inference server built with **FastAPI**. It hosts the machine learning models and AI logic for skill extraction, employability prediction, and other NLP tasks.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, Chakra UI, Axios, React Router
-   **Backend**: Django, Django REST Framework, Simple JWT, PostgreSQL
-   **Model & AI**: FastAPI, Scikit-learn, SHAP, Google Generative AI (Gemini), `pdfplumber`, `python-docx`
-   **Database**: PostgreSQL

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### 1. Prerequisites

-   Git
-   Python 3.8+ and Pip
-   Node.js and npm
-   PostgreSQL database

### 2. Clone the Repository

```bash
git clone https://github.com/tarun290705/SkillLens.git
cd SkillLens
```

### 3. Backend (Django) Setup

The backend server runs on `http://127.0.0.1:8000`.

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
# On Windows: venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file in the backend/ directory
# Add your PostgreSQL credentials
touch .env
```

Your `backend/.env` file should look like this:

```env
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```

```bash
# Apply database migrations
python manage.py migrate

# Run the Django server
python manage.py runserver
```

### 4. Model Server (FastAPI) Setup

The model server runs on `http://127.0.0.1:8001`.

```bash
# Navigate to the model directory from the project root
cd model

# Create and activate a virtual environment
python -m venv venv
# On Windows: venv\Scripts\activate
# On macOS/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file in the model/ directory for your Gemini API key
touch .env
```

Your `model/.env` file should contain:
```env
GEMINI_API_KEY=your_google_gemini_api_key
```

```bash
# Run the FastAPI server
uvicorn controllers.main:app --host 127.0.0.1 --port 8001 --reload
```

### 5. Frontend (React) Setup

The frontend application runs on `http://localhost:5173`.

```bash
# Navigate to the frontend directory from the project root
cd frontend

# Install dependencies
npm install

# Create a .env file in the frontend/ directory for your Gemini API key
touch .env
```

Your `frontend/.env` file should contain:

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

```bash
# Run the React development server
npm run dev
```

Once all three services are running, open your browser and navigate to `http://localhost:5173`.

## 📂 Project Structure

```
.
├── backend/            # Django REST Framework application
│   ├── api/            # Handles user authentication and roles
│   ├── student/        # Manages student profiles and resume uploads
│   ├── quiz/           # Manages quiz data
│   └── backend/        # Main project settings and configurations
├── frontend/           # React (Vite) application
│   ├── src/
│   │   ├── api/        # Axios instances and API calls
│   │   ├── component/  # Reusable components (e.g., CodeEditor)
│   │   ├── assets/     # Static assets like images
│   │   └── *.jsx       # Page and feature components
│   └── public/         # Static assets
└── model/              # FastAPI and Machine Learning server
    ├── controllers/    # FastAPI endpoints and core logic
    ├── employability_model.pkl # Trained Scikit-learn model
    ├── extractor.py    # Text and skill extraction logic
    └── quiz_generator.py # AI-powered quiz generation
```

## 📄 License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for more details.
