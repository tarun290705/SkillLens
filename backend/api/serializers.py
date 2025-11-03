from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']

    def create(self, validate_data):
        user = User.objects.create_user(
            username=validate_data['username'],
            email=validate_data.get('email',''),
            password=validate_data['password'],
            role=validate_data.get('role', 'student')
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if not user:
            raise serializers.ValidationError("Invalid username or password")
        return user