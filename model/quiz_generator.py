from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch
import random

# ───────────── Load Model ─────────────
print("🔄 Loading T5 question generation model (valhalla/t5-small-qg-hl)...")
model_name = "valhalla/t5-small-qg-hl"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)
print("✅ Model loaded successfully.\n")

# ───────────── Question Generator ─────────────
def generate_question(context, max_length=64):
    """Generate one meaningful question from a given skill context."""
    input_text = "generate question: " + context
    input_ids = tokenizer.encode(input_text, return_tensors="pt")
    outputs = model.generate(
        input_ids,
        max_length=max_length,
        num_beams=4,
        early_stopping=True
    )
    question = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return question

# ───────────── Quiz Generator ─────────────
def generate_quiz(skill: str, num_questions: int = 5):
    """Generate multiple questions and display them in the terminal."""
    # Create some factual skill-related statements as context
    context_bank = [
        f"{skill} is a widely used programming language.",
        f"{skill} supports variables, data types, and functions.",
        f"{skill} is used for automation, scripting, and data analysis.",
        f"{skill} supports object-oriented and functional programming.",
        f"Exception handling and modular programming are important in {skill}.",
    ]

    # Limit number of questions
    num_questions = min(num_questions, len(context_bank))

    quiz = []
    for i in range(num_questions):
        context = context_bank[i]
        question_text = generate_question(context)
        options = [
            f"{skill} concept A",
            f"{skill} concept B",
            f"{skill} concept C",
            f"{skill} concept D"
        ]
        correct = random.randint(1, 4)
        quiz.append({
            "id": i + 1,
            "question": question_text,
            "options": options,
            "correct": correct
        })

    # ───────────── Print Quiz ─────────────
    print("\n🧩 Generated Quiz:")
    for q in quiz:
        print(f"\n{q['id']}. {q['question']}")
        for idx, opt in enumerate(q["options"], start=1):
            print(f"   {idx}. {opt}")
        print(f"✅ Correct: Option {q['correct']}")
    print("\n🎯 Quiz generation complete!")

# ───────────── Run from Terminal ─────────────
if __name__ == "__main__":
    skill = input("Enter a skill or topic: ").strip()
    num_q = input("How many questions to generate? (default 5): ").strip()
    num_q = int(num_q) if num_q.isdigit() else 5
    generate_quiz(skill, num_q)
