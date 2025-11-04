import requests
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import StudentProfile
from .serializers import StudentProfileSerializer

FASTAPI_URL = "http://127.0.0.1:8001/extract-skills/"


class UploadResumeView(APIView):
    """Handles resume upload, skill extraction via FastAPI, and profile update."""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user  
        resume_file = request.FILES.get('resume')

        if not resume_file:
            return Response({'error': 'No resume uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        # Send file to FastAPI for skill extraction
        files = {'file': (resume_file.name, resume_file.read(), resume_file.content_type)}
        try:
            fastapi_response = requests.post(FASTAPI_URL, files=files)
            fastapi_response.raise_for_status()
        except requests.exceptions.RequestException as e:
            return Response({'error': f'FastAPI request failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        data = fastapi_response.json()
        extracted_skills = data.get('skills', [])

        # Save or update the profile
        profile, _ = StudentProfile.objects.get_or_create(user=user)
        profile.skills = ", ".join(extracted_skills)  # Convert list to text
        profile.resume = resume_file
        profile.save()

        serializer = StudentProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StudentProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get profile for the logged-in user
        try:
            profile = StudentProfile.objects.get(user=request.user)
            serializer = StudentProfileSerializer(profile)
            return Response(serializer.data)
        except StudentProfile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        # Create or update profile for logged-in user
        profile, created = StudentProfile.objects.get_or_create(user=request.user)
        serializer = StudentProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

