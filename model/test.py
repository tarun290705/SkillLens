# import pandas as pd
# import numpy as np

# data = {
#     "cgpa": np.random.uniform(5, 10, 200),
#     "num_skills": np.random.randint(1, 15, 200),
#     "tech_skill_score": np.random.randint(0, 10, 200),
#     "soft_skill_score": np.random.randint(0, 5, 200)
# }

# # Employability rule: more skills + higher CGPA => higher employability
# data["employable"] = ((data["cgpa"] > 7.5) & (data["num_skills"] > 5)).astype(int)

# df = pd.DataFrame(data)
# df.to_csv("employability_dataset.csv", index=False)


import joblib
import pandas as pd

# Load the trained model
model = joblib.load("employability_model.pkl")

# Ask for user input via terminal
test_cases = [
    # 🌟 Highly employable candidate
    {"cgpa": 9.1, "num_skills": 10, "tech_skill_score": 7, "soft_skill_score": 3},

    # 💻 Strong technical candidate but few soft skills
    {"cgpa": 8.4, "num_skills": 8, "tech_skill_score": 7, "soft_skill_score": 1},

    # 🗣️ Good communicator but not many technical skills
    {"cgpa": 7.8, "num_skills": 5, "tech_skill_score": 2, "soft_skill_score": 3},

    # 📚 High CGPA but very few practical skills
    {"cgpa": 9.2, "num_skills": 2, "tech_skill_score": 1, "soft_skill_score": 1},

    # ⚙️ Average CGPA with balanced skills
    {"cgpa": 7.2, "num_skills": 6, "tech_skill_score": 3, "soft_skill_score": 3},

    # 🧠 Excellent in both academics and skills
    {"cgpa": 9.5, "num_skills": 12, "tech_skill_score": 8, "soft_skill_score": 4},

    # 😕 Low CGPA and few skills
    {"cgpa": 5.6, "num_skills": 3, "tech_skill_score": 2, "soft_skill_score": 1},

    # 🎯 Mid-level student improving technical ability
    {"cgpa": 7.8, "num_skills": 7, "tech_skill_score": 5, "soft_skill_score": 2},

    # 💬 Strong in soft skills (management roles)
    {"cgpa": 8.0, "num_skills": 6, "tech_skill_score": 2, "soft_skill_score": 4},

    # 🧩 Minimal academic performance, strong technical base
    {"cgpa": 6.0, "num_skills": 8, "tech_skill_score": 6, "soft_skill_score": 2},
]

# --- Run predictions for all ---
for i, case in enumerate(test_cases, start=1):
    X = pd.DataFrame([case])
    pred = model.predict(X)[0]
    confidence = model.predict_proba(X)[0][1]
    print(f"\n🧪 Test Case {i}: {case}")
    print(f"➡️ Employable: {'✅ YES' if pred else '❌ NO'} | Confidence: {confidence:.2f}")


