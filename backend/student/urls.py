from django.urls import path
from .views import UploadResumeView, GetStudentProfileView

urlpatterns = [
    path('upload-resume/', UploadResumeView.as_view(), name='upload-resume'),
    path('profile/', GetStudentProfileView.as_view(), name='student-profile'),
]