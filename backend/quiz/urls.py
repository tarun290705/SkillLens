from django.urls import path
from .views import save_quiz

urlpatterns = [
    path('save/', save_quiz, name='save_quiz'),
]
