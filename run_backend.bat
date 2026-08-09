@echo off
echo Запуск Django Backend сервера...
cd C:\Users\Py6\PycharmProjects\hackaton2\it_platform\backend
cd ..\it_platform
call venv\Scripts\activate
cd ..\backend
py manage.py runserver
pause 