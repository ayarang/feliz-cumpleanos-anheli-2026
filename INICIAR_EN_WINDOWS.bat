@echo off
cd /d "%~dp0"
echo Abriendo la web local en http://localhost:8000/
echo Para detener el servidor, presiona Ctrl+C.
start "" "http://localhost:8000/"
py -3 -m http.server 8000 || python -m http.server 8000
pause
