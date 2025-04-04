from django.urls import path
from .views import (
    UserRegistrationView, 
    UserLoginView, 
    UserLogoutView, 
    UserProfileView,
    VerifyPhoneView,
    SendSmsVerificationView,
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('verify-phone/', VerifyPhoneView.as_view(), name='verify-phone'),
    path('send-sms/', SendSmsVerificationView.as_view(), name='send-sms'),
] 