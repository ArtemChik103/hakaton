import random
import string
import datetime
from django.contrib.auth import get_user_model, login, logout, authenticate
from django.utils.timezone import now
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import SmsVerification
from .serializers import (
    UserSerializer, 
    UserRegistrationSerializer, 
    PhoneVerificationSerializer,
    SmsVerificationSerializer
)

User = get_user_model()


@method_decorator(csrf_exempt, name='dispatch')
class UserRegistrationView(generics.CreateAPIView):
    """Регистрация нового пользователя."""
    
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserRegistrationSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Автоматически входим в систему после регистрации
            # Указываем конкретный бэкенд аутентификации
            from django.contrib.auth import authenticate
            from django.contrib.auth.backends import ModelBackend
            
            # Аутентифицируем пользователя
            authenticated_user = authenticate(username=user.email, password=request.data.get('password'))
            if authenticated_user:
                login(request, authenticated_user, backend='django.contrib.auth.backends.ModelBackend')
            else:
                # Если аутентификация не сработала, подставляем бэкенд вручную
                user.backend = 'django.contrib.auth.backends.ModelBackend'
                login(request, user)
            
            return Response({
                'user': UserSerializer(user, context={'request': request}).data,
                'message': 'Регистрация успешно завершена!'
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name='dispatch')
class UserLoginView(views.APIView):
    """Вход в систему."""
    
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        email = request.data.get('email')
        phone = request.data.get('phone')
        password = request.data.get('password')
        
        # Проверяем, что предоставлен хотя бы один идентификатор
        if not email and not phone:
            return Response({
                'error': 'Необходимо указать email или номер телефона.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Используем authenticate для проверки учетных данных
        from django.contrib.auth import authenticate
        user = None
        
        if email:
            # Аутентификация по email
            user = authenticate(request, email=email, password=password)
            if not user:
                # Если аутентификация не сработала, проверяем пользователя вручную
                try:
                    user_obj = User.objects.get(email=email)
                    if user_obj.check_password(password):
                        user = user_obj
                except User.DoesNotExist:
                    user = None
        elif phone:
            # Аутентификация по телефону
            try:
                user_obj = User.objects.get(phone=phone)
                if user_obj.check_password(password):
                    user = user_obj
            except User.DoesNotExist:
                user = None
                
        # Если пользователь найден, входим в систему
        if user:
            # Указываем конкретный бэкенд аутентификации
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)
            
            # Выводим отладочную информацию
            print(f"Успешный вход: {user.email}")
            
            return Response({
                'user': UserSerializer(user, context={'request': request}).data,
                'message': 'Вход выполнен успешно!'
            })
        
        # Выводим отладочную информацию
        print(f"Неудачная попытка входа: {email or phone}")
        
        return Response({
            'error': 'Неверный email или пароль.'
        }, status=status.HTTP_401_UNAUTHORIZED)


@method_decorator(csrf_exempt, name='dispatch')
class UserLogoutView(views.APIView):
    """Выход из системы."""
    
    def post(self, request):
        logout(request)
        return Response({'message': 'Выход выполнен успешно!'})


class UserProfileView(generics.RetrieveUpdateAPIView):
    """Получение и обновление профиля пользователя."""
    
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user


class SendSmsVerificationView(APIView):
    """Отправка SMS с кодом подтверждения."""
    
    def post(self, request):
        # Проверяем, что пользователь аутентифицирован и имеет телефон
        if not request.user.is_authenticated:
            return Response({
                'error': 'Необходимо войти в систему.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        if not request.user.phone:
            return Response({
                'error': 'У вашего аккаунта не указан номер телефона.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Генерируем случайный код
        code = ''.join(random.choices(string.digits, k=6))
        
        # Устанавливаем время истечения (15 минут от текущего времени)
        expires_at = now() + datetime.timedelta(minutes=15)
        
        # Создаем запись о верификации
        sms_verification = SmsVerification.objects.create(
            user=request.user,
            code=code,
            expires_at=expires_at
        )
        
        # TODO: Здесь бы отправить SMS через SMSC.ru
        # В реальном приложении здесь будет код для отправки SMS
        # Для теста просто возвращаем код (в реальном приложении так делать не следует)
        
        return Response({
            'message': 'Код подтверждения отправлен',
            'sms_verification': SmsVerificationSerializer(sms_verification).data,
            'test_code': code  # ТОЛЬКО ДЛЯ ТЕСТИРОВАНИЯ
        })


class VerifyPhoneView(APIView):
    """Проверка кода подтверждения телефона."""
    
    def post(self, request):
        # Проверяем, что пользователь аутентифицирован
        if not request.user.is_authenticated:
            return Response({
                'error': 'Необходимо войти в систему.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Проверяем данные
        serializer = PhoneVerificationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        code = serializer.validated_data['code']
        
        # Ищем активную верификацию
        sms_verification = SmsVerification.objects.filter(
            user=request.user,
            code=code,
            is_used=False,
            expires_at__gt=now()
        ).first()
        
        if not sms_verification:
            return Response({
                'error': 'Неверный или устаревший код.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Подтверждаем телефон и отмечаем код как использованный
        request.user.phone_verified = True
        request.user.save()
        
        sms_verification.is_used = True
        sms_verification.save()
        
        return Response({
            'message': 'Номер телефона успешно подтвержден!',
            'user': UserSerializer(request.user).data
        }) 