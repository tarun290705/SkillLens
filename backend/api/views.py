from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import RegisterSerializer, LoginSerializer
from .permissions import IsPlacementOfficer, IsStudent

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_class = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "msg": "User registed successfully",
            "user": {
                "username": user.username,
                "email": user.email,
                "role": user.role,
            }
        }, status = status.HTTP_201_CREATED)
    
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_class = [AllowAny]

    def post(self, request):
        serilaizer = self.get_serializer(data=request.data)
        serilaizer.is_valid(raise_exception=True)
        user = serilaizer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "username": user.username,
                "password": user.password,
            }
        }, status=status.HTTP_200_OK)
        
class PODashboard(APIView):
    permission_class = [IsPlacementOfficer]

    def get(self, request):
        return Response({"msg": "Welcome, PO!"})
    
class StudentDashboard(APIView):
    permission_class = [IsStudent]

    def get(self, request):
        return Response({"msg": "Welcome, Student!"})