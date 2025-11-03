from django.urls import path
from .views import RegisterView, LoginView, PODashboard, StudentDashboard

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('officer/dashboard/', PODashboard.as_view(), name='officer-dashboard'),
    path('student/dashboard/', StudentDashboard.as_view(), name='student-dashboard'),
]
