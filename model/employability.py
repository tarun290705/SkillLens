# train_model_with_xai.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import shap
import joblib
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv("employability_dataset.csv")

X = df[["cgpa", "num_skills", "tech_skill_score", "soft_skill_score"]]
y = df["employable"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print("✅ Model trained successfully!")
print("🎯 Accuracy:", accuracy_score(y_test, y_pred))

# Save model
joblib.dump(model, "employability_model.pkl")

# --- SHAP Explainability ---
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

if isinstance(shap_values, list):
    shap_values_to_use = shap_values[1]
else:
    shap_values_to_use = shap_values

shap.summary_plot(shap_values_to_use, X_test, plot_type="bar", show=False)
plt.savefig("feature_importance.png", bbox_inches="tight")
plt.close()

print("SHAP summary plot saved as feature_importance.png")

