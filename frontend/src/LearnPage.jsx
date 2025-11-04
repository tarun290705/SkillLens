import React, { useState } from "react";
import "./LearnPage.css";
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const LearnPage = () => {
  const [language, setLanguage] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!language.trim()) {
      alert("⚠️ Please enter a programming language (e.g. Python, JavaScript, C++)");
      return;
    }

    setLoading(true);
    setQuiz([]);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        Generate 10 beginner-level multiple choice quiz questions for ${language}.
        Return JSON in this format:
        [
          { "q": "Question text", "options": ["A", "B", "C", "D"], "answer": "A" }
        ]
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      const cleaned = response.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      setQuiz(parsed);
    } catch (error) {
      console.error("❌ Error fetching Gemini data:", error);
      alert("Failed to load questions. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, option) => {
    setSelectedAnswers({ ...selectedAnswers, [index]: option });
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const percentage = (score / 10) * 100;
  const feedback =
    percentage >= 80
      ? "🔥 Excellent! You’re ready to take on projects!"
      : percentage >= 50
      ? "💪 Good effort! Strengthen your basics with practice."
      : "📚 Keep learning! Start with fundamentals and build up.";

  return (
    <div className="learn-page">
      <div className="learn-container">
        <h1>🎓 Learn & Assess</h1>
        <p className="subtitle">Choose your language and let AI generate your quiz!</p>

        {!quiz.length && !loading && (
          <div className="input-section">
            <input
              type="text"
              placeholder="Enter language (Python / JavaScript / C++)"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="lang-input"
            />
            <button onClick={handleStart} className="start-btn">
              🚀 Generate Quiz
            </button>
          </div>
        )}

        {loading && <p className="loading-text">⚙️ Generating questions using Gemini...</p>}

        {quiz.length > 0 && !submitted && (
          <div className="quiz-section">
            {quiz.map((q, i) => (
              <div key={i} className="question-card">
                <p>
                  <strong>Q{i + 1}:</strong> {q.q}
                </p>
                <div className="options">
                  {q.options.map((opt, j) => (
                    <label key={j} className="option">
                      <input
                        type="radio"
                        name={`question-${i}`}
                        value={opt}
                        checked={selectedAnswers[i] === opt}
                        onChange={() => handleChange(i, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleSubmit} className="submit-btn">
              🧠 Submit Answers
            </button>
          </div>
        )}

        {submitted && (
          <div className="results-section">
            <h2>🎯 Your Score: {score}/10</h2>
            <p className="feedback">{feedback}</p>

            <button onClick={() => setQuiz([])} className="restart-btn">
              🔁 Try Another Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
