#!/bin/bash
# Script to push CodePath Academy to GitHub

echo "🚀 CodePath Academy - GitHub Push Script"
echo "========================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed!"
    echo "📥 Download from https://git-scm.com/download/win"
    exit 1
fi

echo "✅ Git found!"

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo ""
    echo "Initializing git repository..."
    git init
    git config user.email "your-email@github.com"
    git config user.name "Your Name"
    echo "✅ Git initialized"
fi

echo ""
echo "📦 Adding all files..."
git add .

echo ""
echo "💾 Creating commit..."
git commit -m "Initial commit: CodePath Academy - C++ Learning Platform v2.0

- 5 separate HTML pages (index, courses, lesson, progress, about)
- Modern design with light/dark themes
- 16+ complete C++ lessons
- 50+ code examples
- Progress tracking via localStorage
- Fully responsive design
- 20+ smooth animations
- ~5800 lines of code
- Production-ready"

echo ""
echo "🔗 Adding remote repository..."
echo "📝 Repository: github.com/Dimka123987/school9"

git remote add origin https://github.com/Dimka123987/school9.git

echo ""
echo "🌿 Setting main branch..."
git branch -M main

echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Visit your repository:"
    echo "   https://github.com/Dimka123987/school9"
else
    echo ""
    echo "❌ Push failed. Make sure:"
    echo "   1. Your GitHub credentials are set up"
    echo "   2. The repository exists at github.com/Dimka123987/school9"
    echo "   3. You have write access to the repository"
fi
