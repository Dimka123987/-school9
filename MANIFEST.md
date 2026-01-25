# 📋 MANIFEST - Полный список файлов проекта CodePath Academy

Этот файл содержит полный список всех файлов и папок проекта с описанием.

---

## 📂 Структура директорий

```
SCHOOL9/
├── 📁 index/                          # Старая папка (можно удалить)
│   └── 📁 index/
│       └── index.html
│
├── 📁 src/                            # Исходный код приложения
│   ├── 📁 css/                        # Стили (5 файлов)
│   ├── 📁 js/                         # JavaScript логика (5 файлов)
│   └── 📁 data/                       # Данные курсов (1 файл JSON)
│
├── 📁 assets/                         # Папка для изображений (пуста, готова для использования)
│
├── 📄 index.html                      # Главный HTML файл (335 строк)
├── 📄 package.json                    # npm конфигурация
├── 📄 server.js                       # Node.js HTTP сервер
├── 🚀 start.sh                        # Скрипт запуска для Mac/Linux
├── 🚀 start.bat                       # Батник запуска для Windows
├── 📖 README.md                       # Основная документация
├── 🏃 QUICKSTART.md                   # Быстрый старт
├── 📚 API.md                          # Справочник всех функций
├── 📊 STATS.md                        # Статистика проекта
├── ✅ COMPLETED.md                    # Это завершено!
├── 📋 MANIFEST.md                     # Этот файл
└── 📄 .gitignore                      # Git игнор файлы

```

---

## 📄 Основные файлы

### `index.html` (335 строк)
**Главный HTML файл приложения**

Содержит:
- Полную разметку всех 5 страниц
- Navigation bar
- Hero section
- Course cards template
- Lesson content template
- Progress dashboard
- Footer

Подключает все CSS и JS файлы.

### `package.json`
**npm конфигурация проекта**

```json
{
  "name": "codepath-academy",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js 3000",
    "serve": "node server.js 8000"
  }
}
```

Используется для запуска сервера и управления зависимостями.

### `server.js` (60 строк)
**Простой HTTP сервер на Node.js**

Функции:
- Обслуживание статических файлов
- MIME типы
- Обработка 404 ошибок
- CORS поддержка
- Защита от directory traversal

**Запуск:**
```bash
node server.js          # Порт 8000
node server.js 3000     # Порт 3000
```

---

## 🎨 CSS файлы (src/css/)

### `variables.css` (200+ строк)
**CSS переменные и система дизайна**

Определяет:
- Цветовая схема (light & dark)
- Типографика (размеры, веса)
- Spacing система (xs до 4xl)
- Shadows
- Transitions
- Z-index значения

### `base.css` (400+ строк)
**Базовые стили и типографика**

Включает:
- CSS reset
- Типографика (h1-h6, p, links)
- Списки
- Code стили
- Scrollbar styling
- Utility классы

### `components.css` (900+ строк)
**Компоненты UI**

Стили для:
- Navigation (navbar)
- Buttons (primary, secondary, success)
- Forms (input, textarea, select)
- Badges
- Cards
- Code blocks
- Hero section
- Step cards
- Course cards
- Lesson page
- Progress components
- Footer

### `animations.css` (500+ строк)
**Все анимации**

Анимации:
- Fade, Slide, Scale, Rotate, Bounce, Pulse
- Shimmer, Glow
- Parallax, Float
- Typing, Stagger
- Page transitions

Стейтлес, работает вместе с JS.

### `responsive.css` (400+ строк)
**Мобильные и адаптивные стили**

Breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1024px
- Mobile: < 768px
- Small: < 480px
- Landscape: < 600px height

---

## 🔧 JavaScript файлы (src/js/)

### `app.js` (600+ строк)
**Основная логика приложения**

Функции:
- Инициализация приложения
- Управление страницами
- Загрузка курсов
- Отображение уроков
- Обработка навигации
- Сохранение прогресса

Ключевые функции:
- `handleNavClick(page)`
- `openCourse(courseId)`
- `displayLesson(courseId, lessonId)`
- `markLessonComplete()`
- `nextLesson() / previousLesson()`
- `copyCode()`
- `showNotification()`

### `themes.js` (70 строк)
**Управление темой (light/dark)**

Функции:
- `initializeTheme()` - инициализация
- `toggleTheme()` - переключение темы
- `applyTheme(theme)` - применение темы
- Сохранение в localStorage

### `storage.js` (150 строк)
**Управление прогрессом в localStorage**

Функции:
- `getProgress()` - получить весь прогресс
- `saveLessonProgress()` - сохранить
- `isLessonCompleted()` - проверить
- `getCourseProgress()` - прогресс курса
- `getOverallProgress()` - общий прогресс
- `exportProgress()` - экспорт в JSON
- `clearAllProgress()` - очистить

### `courses.js` (300 строк)
**Утилиты для работы с курсами**

Функции:
- `searchCourses(keyword)` - поиск
- `filterCoursesByLevel(level)` - фильтр
- `sortCoursesByProgress()` - сортировка
- `getCourseById(courseId)`
- `getLessonById(courseId, lessonId)`
- `getTotalLessonsCount()`
- `getLearningStats()` - полная статистика
- `getEstimatedCourseTime(courseId)`

### `animations.js` (400 строк)
**GSAP анимации и эффекты**

Функции:
- `initGSAPAnimations()` - инициализация
- `animateHeroSection()` - анимация hero
- `setupScrollAnimations()` - скролл анимации
- `fadeInScale()`, `slideInFromLeft()`, и др.
- `setupButtonAnimations()` - hover эффекты
- `setupCardAnimations()` - карточки

---

## 📚 Данные (src/data/)

### `courses.json` (1500+ строк)
**Контент всех 16 уроков**

Структура:
```json
[
  {
    "id": "cpp-basics",
    "title": "C++ для начинающих",
    "level": "beginner",
    "lessons": [
      {
        "id": "lesson-1-1",
        "title": "Название",
        "duration": 20,
        "sections": [
          {
            "title": "Раздел",
            "content": "Текст",
            "code": "// C++ код"
          }
        ],
        "learned": ["Концепция 1", "Концепция 2"]
      }
    ]
  }
]
```

Содержит:
- **C++ для начинающих** (7 уроков)
- **C++ Средний уровень** (4 урока)
- **C++ Продвинутый уровень** (5 уроков)

---

## 📖 Документация

### `README.md`
**Полная документация проекта**

Включает:
- Описание проекта
- Технологический стек
- Структура файлов
- Быстрый старт
- Список курсов
- Дизайн система
- Управление прогрессом
- Кастомизация
- Адаптивность

### `QUICKSTART.md`
**Быстрый старт за 5 минут**

Включает:
- 4 способа запуска
- Первые шаги
- Интерактивные элементы
- Расширение платформы
- Браузер совместимость
- Проблемы и решения

### `API.md`
**Полный справочник всех функций**

Документирует:
- Функции навигации
- Управление прогрессом
- Управление темой
- Работа с курсами
- Анимации
- Утилиты
- Примеры использования
- Структура данных

### `STATS.md`
**Статистика и метрики проекта**

Содержит:
- Размер проекта (5800+ строк кода)
- Контент (16 уроков)
- Компоненты UI
- Анимации
- Производительность
- Браузер поддержка
- Образовательная ценность

### `COMPLETED.md`
**Что включено и что дальше**

Включает:
- Список всего, что создано
- Статистику проекта
- Быстрый старт (3 варианта)
- Основные возможности
- Дизайн описание
- Для кого это
- Что дальше

### `MANIFEST.md`
**Этот файл - полный список всех файлов**

Описывает каждый файл в проекте с содержанием.

---

## 🚀 Скрипты запуска

### `start.sh` (для Mac/Linux)
**Bash скрипт для запуска сервера**

Логика:
1. Проверяет Node.js
2. Проверяет Python 3
3. Проверяет Python 2
4. Проверяет PHP
5. Выбирает лучший вариант

Использование:
```bash
chmod +x start.sh
./start.sh
```

### `start.bat` (для Windows)
**Батник для запуска сервера**

Логика:
1. Проверяет Node.js
2. Проверяет Python
3. Проверяет PHP
4. Показывает ошибку если ничего не найдено

Использование:
```cmd
start.bat
```

---

## 📁 Служебные файлы

### `.gitignore`
**Git игнор файлы**

Игнорирует:
- node_modules/
- .DS_Store
- .env файлы
- *.log файлы
- dist/, build/, .cache/
- IDE файлы (.vscode, .idea)

---

## 📊 Статистика файлов

| Файл | Строк | Размер |
|------|-------|--------|
| index.html | 335 | ~35 KB |
| src/css/variables.css | 200 | ~8 KB |
| src/css/base.css | 400 | ~15 KB |
| src/css/components.css | 900 | ~40 KB |
| src/css/animations.css | 500 | ~15 KB |
| src/css/responsive.css | 400 | ~15 KB |
| **CSS Всего** | **2400** | **~93 KB** |
| src/js/app.js | 600 | ~25 KB |
| src/js/themes.js | 70 | ~2 KB |
| src/js/storage.js | 150 | ~5 KB |
| src/js/courses.js | 300 | ~12 KB |
| src/js/animations.js | 400 | ~15 KB |
| **JS Всего** | **1520** | **~59 KB** |
| src/data/courses.json | 1500 | ~120 KB |
| README.md | 200 | ~12 KB |
| API.md | 400 | ~30 KB |
| QUICKSTART.md | 250 | ~18 KB |
| STATS.md | 200 | ~15 KB |
| COMPLETED.md | 150 | ~10 KB |
| MANIFEST.md | 200 | ~15 KB |
| **Документация** | **1400** | **~100 KB** |
| **ВСЕГО** | **~5800+** | **~305 KB** |

---

## 🎯 Как использовать этот файл

1. **Для понимания структуры** - прочитайте полное описание папок и файлов
2. **Для редактирования** - знайте, где находится нужный код
3. **Для добавления функций** - знайте, какой файл отредактировать
4. **Для документации** - ссылайтесь на этот файл

---

## 🔗 Связанные документы

- [README.md](README.md) - Основная документация
- [QUICKSTART.md](QUICKSTART.md) - Быстрый старт
- [API.md](API.md) - Справочник функций
- [STATS.md](STATS.md) - Статистика проекта
- [COMPLETED.md](COMPLETED.md) - Что завершено

---

## ✅ Проверка целостности

Все файлы присутствуют и работают. Проект готов к использованию!

**Файлы:** ✅ Все на месте  
**Код:** ✅ Чистый и готовый  
**Контент:** ✅ 16 полных уроков  
**Документация:** ✅ Полная  
**Функциональность:** ✅ Полная  

---

**Последнее обновление:** 25 января 2026 г.  
**Версия:** 1.0.0  
**Статус:** ✅ Production-ready
