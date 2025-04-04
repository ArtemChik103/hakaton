from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import SmsVerification

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор для модели пользователя."""
    
    class Meta:
        model = User
        fields = ('id', 'email', 'phone', 'first_name', 'last_name', 'avatar', 
                  'rating', 'points', 'phone_verified', 'date_joined', 'is_organizer',
                  'is_staff', 'is_superuser')
        read_only_fields = ('rating', 'points', 'phone_verified', 'date_joined',
                           'is_staff', 'is_superuser')


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Сериализатор для регистрации пользователя."""
    
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    is_organizer = serializers.BooleanField(required=False, default=False)
    
    class Meta:
        model = User
        fields = ('email', 'phone', 'password', 'password_confirm', 'first_name', 
                 'last_name', 'is_organizer')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }
    
    def validate(self, attrs):
        """Проверяем, что пароли совпадают и есть хотя бы один способ аутентификации."""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Пароли не совпадают."})
        
        if not attrs.get('email') and not attrs.get('phone'):
            raise serializers.ValidationError("Необходимо указать email или номер телефона.")
        
        return attrs
    
    def create(self, validated_data):
        """Создаем нового пользователя с шифрованным паролем."""
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class PhoneVerificationSerializer(serializers.Serializer):
    """Сериализатор для проверки кода подтверждения телефона."""
    
    code = serializers.CharField(max_length=6, min_length=4)


class SmsVerificationSerializer(serializers.ModelSerializer):
    """Сериализатор для отправки SMS-верификации."""
    
    class Meta:
        model = SmsVerification
        fields = ('id', 'code', 'created_at', 'expires_at', 'is_used')
        read_only_fields = ('id', 'code', 'created_at', 'expires_at', 'is_used') 