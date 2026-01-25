@echo off
REM Start Script for CodePath Academy (Windows)
REM Запуск сервера для платформы обучения C++

title CodePath Academy - Server
color 0A

echo.
echo ======================================================
echo   CodePath Academy - Platforma dlya obucheniya C++
echo ======================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo [OK] Node.js obnaruzen
    echo.
    echo Zapusk servera...
    echo.
    node server.js
    pause
    exit /b 0
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo [OK] Python obnaruzen
    echo.
    echo Zapusk servera...
    echo.
    python -m http.server 8000
    pause
    exit /b 0
)

REM Check if PHP is installed
where php >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo [OK] PHP obnaruzen
    echo.
    echo Zapusk servera...
    echo.
    php -S localhost:8000
    pause
    exit /b 0
)

REM If no server found
echo.
echo [ERROR] Ne najden oden iz: Node.js, Python ili PHP
echo.
echo Variants:
echo 1. Instaliruyte Node.js: https://nodejs.org
echo 2. Instaliruyte Python: https://www.python.org
echo 3. Ili otkroyite index.html v brauzere vruhnuyu
echo.
pause
