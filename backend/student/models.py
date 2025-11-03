# student/models.py
from django.db import models
from django.conf import settings

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    dob = models.DateField(null=True, blank=True)
    contact = models.CharField(max_length=100)
    address = models.TextField(blank=True)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    department = models.CharField(max_length=100, blank=True)
    year = models.CharField(max_length=20, blank=True)
    semester = models.CharField(max_length=20, blank=True)
    skills = models.JSONField(default=list, blank=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)

    def __str__(self):
        return self.user.username
