from django.db import models
from django.conf import settings

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="student_profile")
    dob = models.DateField(null=True, blank=True)
    contact = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    department = models.CharField(max_length=100, blank=True)
    year = models.CharField(max_length=10, blank=True)
    semester = models.CharField(max_length=10, blank=True)
    skills = models.TextField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    dream_company = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username

