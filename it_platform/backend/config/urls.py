from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

# Простой обработчик для корневого URL
def home_view(request):
    return JsonResponse({
        'status': 'success',
        'message': 'IT-Platform API работает',
        'endpoints': {
            'admin': '/admin/',
            'api': {
                'users': '/api/users/',
                'events': '/api/events/',
                'news': '/api/news/',
                'achievements': '/api/achievements/',
            }
        }
    })

urlpatterns = [
    path('', home_view, name='home'),  # Добавляем корневой URL
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/events/', include('events.urls')),
    path('api/news/', include('news.urls')),
    path('api/achievements/', include('achievements.urls')),
    path('auth/', include('social_django.urls', namespace='social')),
]

# Добавляем URL-пути для статических и медиа-файлов в режиме разработки
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) 