from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Event, Booking
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['is_staff'] = user.is_staff
        token['username'] = user.username
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role')
        read_only_fields = ('id', 'role', 'email', 'username')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role')
        extra_kwargs = {
            'role': {'default': 'User'},  # default role
        }
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already in use, pick another.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already registered.")
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            role=validated_data.get('role', 'User')
        )
        return user
    
class EventListSerializer(serializers.ModelSerializer):
    is_booked = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ('id', 'event_name', 'date', 'image', 'is_booked')

    def get_is_booked(self, obj):
        user = self.context.get('request').user
        if user and user.is_authenticated:
            return Booking.objects.filter(user=user, event=obj).exists()
        return False

class EventDetailSerializer(serializers.ModelSerializer):
    is_booked = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_is_booked(self, obj):
        user = self.context.get('request').user
        if user and user.is_authenticated:
            return Booking.objects.filter(user=user, event=obj).exists()
        return False
