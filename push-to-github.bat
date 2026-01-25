@echo off
REM Script to push CodePath Academy to GitHub (Windows)

setlocal enabledelayedexpansion

echo.
echo 🚀 CodePath Academy - GitHub Push Script
echo =========================================

REM Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git is not installed!
    echo 📥 Download from https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git found!

REM Initialize git if needed
if not exist ".git" (
    echo.
    echo Initializing git repository...
    call git init
    call git config user.email "your-email@github.com"
    call git config user.name "Your Name"
    echo ✅ Git initialized
) else (
    echo.
    echo ℹ️  Git already initialized
)

echo.
echo 📦 Adding all files...
call git add .

echo.
echo 💾 Creating commit...
call git commit -m "Initial commit: CodePath Academy - C^+^+ Learning Platform v2.0"

echo.
echo 🔗 Adding remote repository...
echo 📝 Repository: github.com/Dimka123987/school9

call git remote add origin https://github.com/Dimka123987/school9.git 2>nul

echo.
echo 🌿 Setting main branch...
call git branch -M main

echo.
echo 🚀 Pushing to GitHub...
call git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ Successfully pushed to GitHub!
    echo.
    echo 🎉 Visit your repository:
    echo    https://github.com/Dimka123987/school9
) else (
    echo.
    echo ❌ Push failed. Make sure:
    echo    1. Your GitHub credentials are set up
    echo    2. The repository exists at github.com/Dimka123987/school9
    echo    3. You have write access to the repository
)

echo.
pause
