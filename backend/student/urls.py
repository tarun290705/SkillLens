from django.urls import path
from .views import UploadResumeView, StudentProfileView

urlpatterns = [
    path('upload-resume/', UploadResumeView.as_view(), name='upload-resume'),
    path('profile/', StudentProfileView.as_view(), name='student-profile'),
]