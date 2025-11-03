from django.urls import path
from .views import UploadResumeView

urlpatterns = [
    path('upload-resume/', UploadResumeView.as_view(), name='upload-resume'),
]