import os
import django
import random
from datetime import date, timedelta

# ───────────────────────────────
# ⚙️ Django setup
# ───────────────────────────────
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.contrib.auth import get_user_model
from student.models import StudentProfile

User = get_user_model()

print("✅ Django environment ready!")

# ───────────────────────────────
# 📋 Dummy data sources
# ───────────────────────────────
dream_companies = [
    "Google", "Microsoft", "Amazon", "Infosys", "TCS", "Accenture",
    "IBM", "Meta", "Adobe", "Wipro", "Oracle", "Salesforce"
]
departments = ["CSE", "ECE", "ME", "IT", "EEE", "Civil"]
years = ["1st", "2nd", "3rd", "4th"]
semesters = ["I", "II"]
skills_pool = [
    "Python", "C++", "Java", "HTML", "CSS", "SQL", "Django", "React",
    "Flask", "Node.js", "Machine Learning", "Teamwork", "Leadership",
    "Public Speaking", "Cloud Computing", "Problem Solving"
]

TOTAL_USERS = 50

# ───────────────────────────────
# 👤 Create Dummy Users
# ───────────────────────────────
existing_users = User.objects.count()
new_users = []

if existing_users < TOTAL_USERS:
    for i in range(existing_users + 1, TOTAL_USERS + 1):
        new_users.append(
            User(
                username=f"user{i}",
                email=f"user{i}@example.com",
            )
        )
    User.objects.bulk_create(new_users)
    # Set passwords separately (bulk_create skips hashing)
    for user in User.objects.filter(username__startswith="user"):
        user.set_password("password123")
        user.save()
    print(f"✅ Created {len(new_users)} new users.")
else:
    print(f"ℹ️ Already have {existing_users} users, skipping creation.")

# ───────────────────────────────
# 🎓 Create Student Profiles
# ───────────────────────────────
users = User.objects.all()
created_profiles = 0

for user in users:
    profile, created = StudentProfile.objects.get_or_create(
        user=user,
        defaults={
            "name": user.username.capitalize(),
            "dob": date.today() - timedelta(days=random.randint(7000, 9000)),
            "contact": f"98765{random.randint(10000, 99999)}",
            "address": f"City-{random.randint(1, 100)}, India",
            "department": random.choice(departments),
            "year": random.choice(years),
            "semester": random.choice(semesters),
            "cgpa": round(random.uniform(6.0, 9.8), 2),
            "skills": random.sample(skills_pool, random.randint(3, 7)),
            "dream_company": random.choice(dream_companies),
            "github": f"https://github.com/{user.username}",
            "linkedin": f"https://linkedin.com/in/{user.username}",
        },
    )
    if created:
        created_profiles += 1

print(f"\n🎉 Dummy data generation complete!")
print(f"👤 Total users: {User.objects.count()}")
print(f"🧠 New student profiles added: {created_profiles}")
