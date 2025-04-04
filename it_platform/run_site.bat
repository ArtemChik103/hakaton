@echo off
echo Активация виртуального окружения и запуск серверов...

cd C:\Users\Py6\PycharmProjects\hackaton2\it_platform\it_platform
call venv\Scripts\activate

echo Запуск Django Backend сервера...
cd ..\backend
start py manage.py runserver

echo Запуск Vue.js Frontend сервера...
cd ..\frontend
start npm run serve

echo Сервера запущены!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:8080
pause 