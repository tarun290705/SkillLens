import React, { useEffect, useState } from "react";

const API_URL = "https://quizapi.io/api/v1/questions";
const API_KEY = "6k8lQXxocb2171svkcVa9UO4gvU7Nl4j0V24LclR"; // Replace with your actual API Key

function QuizMcq() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `${API_URL}?apiKey=${API_KEY}&limit=10&category=Bash&difficulty=medium`
    )
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => setError("Error fetching questions"));
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Linux Quiz (Easy)</h2>
      {questions.map((q, idx) => (
        <div key={q.id} style={{ border: "1px solid #ddd", margin: "16px 0", padding: "16px" }}>
          <p>
            <strong>Q{idx + 1}:</strong> {q.question}
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {Object.entries(q.answers)
              .filter(([key, value]) => value !== null)
              .map(([key, value]) => (
                <li key={key}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${idx}`}
                      value={key}
                      style={{ marginRight: "8px" }}
                    />
                    {value}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default QuizMcq;
