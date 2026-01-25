# Git setup и push инструкции

## Шаг 1: Установить Git

Скачайте Git с https://git-scm.com/download/win и установите.

## Шаг 2: Инициализировать репозиторий

```powershell
cd c:\Users\ххх\Desktop\SCHOOL9
git init
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

## Шаг 3: Добавить все файлы

```powershell
git add .
```

## Шаг 4: Создать первый commit

```powershell
git commit -m "Initial commit: CodePath Academy - C++ Learning Platform"
```

## Шаг 5: Создать репозиторий на GitHub

1. Откройте https://github.com/new
2. Назовите его `school9`
3. Нажмите "Create repository"

## Шаг 6: Добавить удаленный репозиторий

```powershell
# Замените Dimka123987 на ваше имя пользователя GitHub
git remote add origin https://github.com/Dimka123987/school9.git
git branch -M main
git push -u origin main
```

## Шаг 7: Проверить на GitHub

Откройте https://github.com/Dimka123987/school9

---

## Что будет загружено

✅ Все HTML страницы (5 файлов)
✅ CSS файлы (5 стилей)
✅ JavaScript файлы (4 скрипта)
✅ JSON курсы и данные
✅ Документация (README, QUICKSTART, и т.д.)
✅ Конфиги и скрипты запуска

## Файлы, которые игнорируются (не загружаются)

❌ node_modules/ (создается при npm install)
❌ .DS_Store (Mac OS файлы)
❌ .vscode/ (IDE конфиги)
❌ *.log (логи)
❌ .env (секретные переменные)

Это контролируется файлом `.gitignore`
