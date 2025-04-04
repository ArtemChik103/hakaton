@echo off
echo Создание нового суперпользователя для Django...
cd C:\Users\Py6\PycharmProjects\hackaton\it_platform\backend
py manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser(email='admin@example.com', password='admin12345', first_name='Admin', last_name='User') if not User.objects.filter(email='admin@example.com').exists() else print('Пользователь уже существует')"
echo.
echo Суперпользователь создан с учетными данными:
echo Email: admin@example.com
echo Пароль: admin12345
echo.
echo Теперь вы можете войти в систему с этими учетными данными.
pause 