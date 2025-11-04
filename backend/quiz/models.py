from django.db import models
from student.models import StudentProfile

class Quiz(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name="quizzes")
    title = models.CharField(max_length=255)
    total_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.student.user.username})"

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    question_text = models.TextField()
    correct_option = models.CharField(max_length=255)

    def __str__(self):
        return self.question_text[:50]

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="options")
    option_text = models.CharField(max_length=255)

    def __str__(self):
        return self.option_text
