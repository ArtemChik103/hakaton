from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """Менеджер модели пользователя с поддержкой email и телефона в качестве уникальных идентификаторов."""
    
    def create_user(self, email=None, phone=None, password=None, **extra_fields):
        """Создает и сохраняет пользователя с указанным email/телефоном и паролем."""
        if not email and not phone:
            raise ValueError(_('Необходимо указать email или номер телефона'))
        
        if email:
            email = self.normalize_email(email)
        
        user = self.model(email=email, phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email=None, phone=None, password=None, **extra_fields):
        """Создает и сохраняет суперпользователя."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Суперпользователь должен иметь is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Суперпользователь должен иметь is_superuser=True.'))
        
        return self.create_user(email, phone, password, **extra_fields)


class User(AbstractUser):
    """Модель пользователя с поддержкой аутентификации через email, телефон и социальные сети."""
    
    username = models.CharField(
        _('Имя пользователя'),
        max_length=150,
        blank=True,
        null=True,
        unique=True
    )
    email = models.EmailField(
        _('Email'),
        unique=True,
        blank=True,
        null=True,
        help_text=_('Используйте только российские сервисы: Mail.ru, Yandex, Rambler')
    )
    phone = models.CharField(
        _('Номер телефона'),
        max_length=15,
        unique=True,
        blank=True,
        null=True,
        help_text=_('Номер телефона для SMS-подтверждения')
    )
    phone_verified = models.BooleanField(
        _('Телефон подтвержден'),
        default=False
    )
    avatar = models.ImageField(
        _('Аватар'),
        upload_to='avatars/',
        blank=True,
        null=True
    )
    
    # Рейтинг и очки для системы достижений
    rating = models.IntegerField(_('Рейтинг'), default=0)
    points = models.IntegerField(_('Очки'), default=0)
    
    # Роль пользователя
    is_organizer = models.BooleanField(
        _('Организатор мероприятий'),
        default=False,
        help_text=_('Указывает, имеет ли пользователь права организатора мероприятий')
    )
    
    # Указываем, что основным идентификатором является email
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    class Meta:
        verbose_name = _('Пользователь')
        verbose_name_plural = _('Пользователи')
    
    def __str__(self):
        if self.username:
            return self.username
        if self.email:
            return self.email
        if self.phone:
            return self.phone
        return str(self.id)
    
    def get_achievements(self):
        """Получить все достижения пользователя."""
        return self.user_achievements.all()


class SmsVerification(models.Model):
    """Модель для верификации номера телефона через SMS."""
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sms_codes',
        verbose_name=_('Пользователь')
    )
    code = models.CharField(_('Код подтверждения'), max_length=6)
    created_at = models.DateTimeField(_('Время создания'), auto_now_add=True)
    expires_at = models.DateTimeField(_('Время истечения'))
    is_used = models.BooleanField(_('Использован'), default=False)
    
    class Meta:
        verbose_name = _('SMS-верификация')
        verbose_name_plural = _('SMS-верификации')
    
    def __str__(self):
        return f"SMS код для {self.user}" 