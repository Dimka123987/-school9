# 🎉 Новая структура - отдельные HTML страницы

## Изменения

Платформа теперь состоит из **5 независимых HTML файлов** вместо одного большого файла:

### 📄 HTML страницы

| Файл | Назначение |
|------|-----------|
| **index.html** | 🏠 Главная страница (Hero, как это работает, статистика) |
| **courses.html** | 📚 Страница со всеми курсами, фильтрация по уровню |
| **lesson.html** | 📖 Страница отдельного урока с контентом и прогрессом |
| **progress.html** | 📊 Страница со статистикой и прогрессом обучения |
| **about.html** | ℹ️ Информация о платформе и особенности |

### ✅ Преимущества отдельных страниц

1. **Быстрая загрузка** - каждая страница загружает только нужный контент
2. **Чистая структура** - разделение контента по файлам
3. **Легче редактировать** - изменения в одной странице не влияют на другие
4. **Стандартный подход** - как в обычных веб-приложениях
5. **Лучше для SEO** - каждая страница имеет свой title и meta

### 🔗 Навигация

Навигация работает через обычные ссылки HTML (без onclick):

```html
<!-- Главная -->
<a href="index.html">Главная</a>

<!-- Курсы -->
<a href="courses.html">Курсы</a>

<!-- Прогресс -->
<a href="progress.html">Прогресс</a>

<!-- О платформе -->
<a href="about.html">О платформе</a>

<!-- Из курсов в урок -->
<a href="lesson.html">Открыть урок</a>
```

### 💾 Передача данных между страницами

Используется **sessionStorage** для передачи ID курса и урока:

```javascript
// На странице courses.html - когда клик на курс
sessionStorage.setItem('currentCourseId', courseId);
sessionStorage.setItem('currentLessonId', lessonId);
window.location.href = 'lesson.html';

// На странице lesson.html - когда загружается
const courseId = sessionStorage.getItem('currentCourseId');
const lessonId = sessionStorage.getItem('currentLessonId');
```

### 📊 Общие ресурсы

Все страницы используют одинаковые CSS и JS файлы:

**CSS:**
- `src/css/variables.css` - переменные и система дизайна
- `src/css/base.css` - базовые стили
- `src/css/components.css` - стили компонентов
- `src/css/animations.css` - анимации
- `src/css/responsive.css` - адаптивность

**JavaScript:**
- `src/js/themes.js` - переключение темы (light/dark)
- `src/js/storage.js` - работа с localStorage для прогресса
- `src/js/courses.js` - утилиты для работы с курсами
- `src/js/animations.js` - GSAP анимации

**Данные:**
- `src/data/courses.json` - содержание всех курсов и уроков

### 🚀 Как запустить

```bash
# Вариант 1: Открыть прямо в браузере
c:\Users\ххх\Desktop\SCHOOL9\index.html

# Вариант 2: С Node.js сервером
node server.js
# Затем открыть http://localhost:8000

# Вариант 3: С Python
python -m http.server 8000
# Затем открыть http://localhost:8000

# Вариант 4: С Live Server расширением VS Code
Правая кнопка на index.html → Open with Live Server
```

### 📁 Структура файлов

```
SCHOOL9/
├── index.html           # Главная страница
├── courses.html         # Страница курсов
├── lesson.html          # Страница урока
├── progress.html        # Страница прогресса
├── about.html           # Страница "О платформе"
├── server.js            # Node.js сервер
├── package.json         # npm конфигурация
├── src/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── animations.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── themes.js
│   │   ├── storage.js
│   │   ├── courses.js
│   │   └── animations.js
│   └── data/
│       └── courses.json
└── assets/              # Для картинок и иконок
```

### ✨ Что не изменилось

- ✅ Весь контент и функциональность
- ✅ Дизайн и анимации
- ✅ Отслеживание прогресса через localStorage
- ✅ Переключение темы (light/dark)
- ✅ Адаптивность на мобильных устройствах

### 🐛 Что было исправлено

Раньше была проблема с исчезновением контента при переключении между страницами. Теперь каждая страница - отдельный HTML файл, поэтому такой проблемы нет.

### 📝 Примечание

Если открыть `lesson.html` напрямую, она может не загрузить урок (так как нет courseId в sessionStorage). Всегда переходите на урок через `courses.html`!

---

**Дата обновления:** 25 января 2026 г.  
**Версия:** 2.0.0  
**Статус:** ✅ Production-ready с отдельными страницами
