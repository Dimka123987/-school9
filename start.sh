#!/bin/bash
# Start Script for CodePath Academy
# Выбирает лучший способ запуска сервера

echo "🚀 CodePath Academy - Платформа для обучения C++"
echo "=================================================="
echo ""
echo "Выбери способ запуска:"
echo "1) Node.js сервер (рекомендуется)"
echo "2) Python http.server"
echo "3) PHP сервер"
echo "4) Просто открыть index.html"
echo ""

# Для Windows используй start.bat вместо этого

if command -v node &> /dev/null; then
    echo "ℹ️  Node.js обнаружен"
    echo "Запуск: node server.js"
    node server.js
    exit 0
fi

if command -v python3 &> /dev/null; then
    echo "ℹ️  Python 3 обнаружен"
    echo "Запуск: python -m http.server 8000"
    cd "$(dirname "$0")"
    python3 -m http.server 8000
    exit 0
fi

if command -v python &> /dev/null; then
    echo "ℹ️  Python обнаружен"
    echo "Запуск: python -m SimpleHTTPServer 8000"
    cd "$(dirname "$0")"
    python -m SimpleHTTPServer 8000
    exit 0
fi

if command -v php &> /dev/null; then
    echo "ℹ️  PHP обнаружен"
    echo "Запуск: php -S localhost:8000"
    cd "$(dirname "$0")"
    php -S localhost:8000
    exit 0
fi

echo "❌ Не найден ни Node.js, ни Python, ни PHP"
echo "Пожалуйста, установите одно из них или откройте index.html вручную"
