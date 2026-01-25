# 🚀 Быстрый пуш на GitHub

## Если Git уже установлен

Откройте PowerShell в папке проекта и выполните:

```powershell
# Перейти в папку проекта
cd c:\Users\ххх\Desktop\SCHOOL9

# Инициализировать репо (если еще не инициализировано)
git init

# Настроить git
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Добавить все файлы
git add .

# Создать commit
git commit -m "Initial commit: CodePath Academy - C++ Learning Platform v2.0"

# Добавить удаленный репозиторий
git remote add origin https://github.com/Dimka123987/school9.git

# Установить главную ветку
git branch -M main

# Загрузить на GitHub
git push -u origin main
```

## Если Git не установлен

1. Скачайте с https://git-scm.com/download/win
2. Установите с дефолтными параметрами
3. Перезагрузите PowerShell
4. Выполните команды выше

## Что загружается

- ✅ 5 HTML страниц (index, courses, lesson, progress, about)
- ✅ 5 CSS файлов (responsive дизайн)
- ✅ 4 JavaScript модуля
- ✅ courses.json с 16 полными уроками
- ✅ 6+ документов (README, API, QUICKSTART, etc)
- ✅ Конфиги и скрипты запуска

Всего: **~5800+ строк кода**

## После пуша

Откройте в браузере: https://github.com/Dimka123987/school9

Вы увидите весь код и сможете:
- Смотреть файлы в веб-интерфейсе
- Клонировать репо на другой компьютер
- Добавлять новые фичи через pull requests
- Отслеживать историю изменений
