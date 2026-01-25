# CodePath Academy - API Документация

Полная документация JavaScript API платформы.

## 🔴 Основные функции навигации

### `handleNavClick(page)`
Переключает текущую страницу.

**Параметры:**
- `page` (string): 'home', 'courses', 'progress', 'about', 'lesson'

**Пример:**
```javascript
handleNavClick('courses');  // Открыть страницу курсов
handleNavClick('progress');  // Открыть страницу прогресса
```

### `openCourse(courseId)`
Открывает курс и показывает первый урок.

**Параметры:**
- `courseId` (string): ID курса из JSON

**Пример:**
```javascript
openCourse('cpp-basics');        // Открыть курс для начинающих
openCourse('cpp-intermediate');  // Открыть средний курс
```

### `displayLesson(courseId, lessonId)`
Показывает конкретный урок.

**Параметры:**
- `courseId` (string): ID курса
- `lessonId` (string): ID урока

**Пример:**
```javascript
displayLesson('cpp-basics', 'lesson-1-1');  // Показать первый урок
```

### `nextLesson()` / `previousLesson()`
Навигация между уроками.

**Пример:**
```javascript
nextLesson();      // Перейти к следующему уроку
previousLesson();  // Вернуться к предыдущему уроку
```

---

## 💾 Управление прогрессом

### `markLessonComplete()`
Отмечает текущий урок как завершенный.

**Пример:**
```javascript
markLessonComplete();  // Отметить урок как завершенный
```

### `saveLessonProgress(courseId, lessonId, progress)`
Сохраняет прогресс урока в localStorage.

**Параметры:**
- `courseId` (string): ID курса
- `lessonId` (string): ID урока
- `progress` (object): { completed: boolean, timeSpent: number }

**Пример:**
```javascript
saveLessonProgress('cpp-basics', 'lesson-1-1', { completed: true, timeSpent: 600 });
```

### `getProgress()`
Получает весь прогресс пользователя из localStorage.

**Возвращает:** Object с прогрессом по всем урокам

**Пример:**
```javascript
const progress = getProgress();
console.log(progress);  // { 'cpp-basics': { 'lesson-1-1': {...} } }
```

### `getCompletedLessons(courseId)`
Получает список завершенных уроков в курсе.

**Параметры:**
- `courseId` (string): ID курса

**Возвращает:** Array с ID завершенных уроков

**Пример:**
```javascript
const completed = getCompletedLessons('cpp-basics');
console.log(completed);  // ['lesson-1-1', 'lesson-1-2', ...]
```

### `isLessonCompleted(courseId, lessonId)`
Проверяет, завершен ли урок.

**Параметры:**
- `courseId` (string): ID курса
- `lessonId` (string): ID урока

**Возвращает:** boolean

**Пример:**
```javascript
if (isLessonCompleted('cpp-basics', 'lesson-1-1')) {
    console.log('Урок завершен!');
}
```

### `getCourseProgress(courseId, totalLessons)`
Получает прогресс курса.

**Параметры:**
- `courseId` (string): ID курса
- `totalLessons` (number): Всего уроков в курсе

**Возвращает:** Object с { completed, total, percentage }

**Пример:**
```javascript
const progress = getCourseProgress('cpp-basics', 7);
console.log(progress);  // { completed: 3, total: 7, percentage: 43 }
```

### `getOverallProgress(totalLessons)`
Получает общий прогресс по всем урокам.

**Возвращает:** percentage (0-100)

**Пример:**
```javascript
const overall = getOverallProgress(100);
console.log(overall);  // 35
```

### `clearAllProgress()`
Очищает весь прогресс (для тестирования).

**Пример:**
```javascript
clearAllProgress();  // ВНИМАНИЕ: Удаляет весь прогресс!
```

### `exportProgress()`
Экспортирует прогресс в JSON файл.

**Пример:**
```javascript
exportProgress();  // Загружает файл codepath-progress-ДАТА.json
```

---

## 🎨 Управление темой

### `toggleTheme()`
Переключает между светлой и темной темой.

**Пример:**
```javascript
toggleTheme();  // Переключить тему
```

### `applyTheme(theme)`
Применяет определенную тему.

**Параметры:**
- `theme` (string): 'light' или 'dark'

**Пример:**
```javascript
applyTheme('dark');   // Применить темную тему
applyTheme('light');  // Применить светлую тему
```

### `initializeTheme()`
Инициализирует тему на основе сохраненных настроек или системных предпочтений.

**Пример:**
```javascript
initializeTheme();  // Автоматически вызывается при загрузке
```

---

## 📚 Работа с курсами

### `loadCoursesData()`
Загружает курсы из JSON файла.

**Пример:**
```javascript
loadCoursesData();  // Автоматически вызывается при загрузке
```

### `getCourseById(courseId)`
Получает объект курса по ID.

**Параметры:**
- `courseId` (string): ID курса

**Возвращает:** Course object или undefined

**Пример:**
```javascript
const course = getCourseById('cpp-basics');
console.log(course.title);  // "C++ для начинающих"
```

### `getLessonById(courseId, lessonId)`
Получает объект урока по ID.

**Параметры:**
- `courseId` (string): ID курса
- `lessonId` (string): ID урока

**Возвращает:** Lesson object или null

**Пример:**
```javascript
const lesson = getLessonById('cpp-basics', 'lesson-1-1');
console.log(lesson.title);  // "Что такое C++?"
```

### `searchCourses(keyword)`
Ищет курсы по ключевому слову.

**Параметры:**
- `keyword` (string): Ключевое слово для поиска

**Возвращает:** Array курсов

**Пример:**
```javascript
const results = searchCourses('функции');
console.log(results);  // Курсы с "функции" в названии
```

### `filterCoursesByLevel(level)`
Фильтрует курсы по уровню.

**Параметры:**
- `level` (string): 'beginner', 'intermediate', 'advanced', 'all'

**Возвращает:** Array фильтрованных курсов

**Пример:**
```javascript
const advanced = filterCoursesByLevel('advanced');
const all = filterCoursesByLevel('all');
```

### `sortCoursesByProgress(coursesList)`
Сортирует курсы по прогрессу (от большего к меньшему).

**Параметры:**
- `coursesList` (array): Массив курсов (опционально)

**Возвращает:** Отсортированный массив

**Пример:**
```javascript
const sorted = sortCoursesByProgress();
// Курсы с наибольшим прогрессом впереди
```

### `getTotalLessonsCount()`
Получает общее количество уроков.

**Возвращает:** number

**Пример:**
```javascript
const total = getTotalLessonsCount();
console.log(total);  // 18
```

### `getTotalCompletedLessonsCount()`
Получает количество завершенных уроков.

**Возвращает:** number

**Пример:**
```javascript
const completed = getTotalCompletedLessonsCount();
console.log(completed);  // 5
```

### `getEstimatedCourseTime(courseId)`
Получает примерное время для завершения курса.

**Параметры:**
- `courseId` (string): ID курса

**Возвращает:** number (в минутах)

**Пример:**
```javascript
const time = getEstimatedCourseTime('cpp-basics');
console.log(time);  // 120 (минут)
```

### `getLearningStats()`
Получает полную статистику обучения.

**Возвращает:** Object с полной статистикой

**Пример:**
```javascript
const stats = getLearningStats();
console.log(stats);
// {
//   totalCourses: 3,
//   completedCourses: 1,
//   inProgressCourses: 1,
//   totalLessons: 18,
//   completedLessons: 5,
//   inProgressLessons: 2,
//   overallProgress: 28
// }
```

---

## 🎬 Анимации

### `setupScrollAnimations()`
Инициализирует GSAP анимации при скролле.

**Пример:**
```javascript
setupScrollAnimations();  // Автоматически вызывается при загрузке
```

### `triggerScrollAnimations()`
Перезагружает и переинициализирует анимации прокрутки.

**Пример:**
```javascript
triggerScrollAnimations();  // После добавления новых элементов
```

### `animateHeroSection()`
Анимирует hero секцию (заголовок, кнопки и т.д.).

**Пример:**
```javascript
animateHeroSection();  // Вызывается на главной странице
```

### `animateCourseCardsIn()`
Анимирует появление карточек курсов.

**Пример:**
```javascript
animateCourseCardsIn();  // Вызывается на странице курсов
```

### `fadeInScale(element, delay)`
Анимирует элемент с fade и scale эффектом.

**Параметры:**
- `element` (DOM): DOM элемент
- `delay` (number): Задержка в секундах

**Пример:**
```javascript
const el = document.querySelector('.my-element');
fadeInScale(el, 0.3);  // Анимировать с задержкой 0.3s
```

### `slideInFromLeft(element, delay)`
Анимирует слайд элемента слева.

**Пример:**
```javascript
slideInFromLeft(document.querySelector('.card'), 0);
```

### `slideInFromRight(element, delay)`
Анимирует слайд элемента справа.

**Пример:**
```javascript
slideInFromRight(document.querySelector('.card'), 0.2);
```

---

## 🔧 Утилиты

### `copyCode(button)`
Копирует код в буфер обмена.

**Параметры:**
- `button` (DOM): Кнопка копирования

**Пример:**
```javascript
// Автоматически вызывается при нажатии на кнопку "Копировать"
copyCode(button);
```

### `showNotification(message)`
Показывает всплывающее уведомление.

**Параметры:**
- `message` (string): Текст уведомления

**Пример:**
```javascript
showNotification('Урок отмечен как завершенный!');
showNotification('Ошибка при загрузке данных');
```

### `escapeHtml(text)`
Экранирует HTML специальные символы.

**Параметры:**
- `text` (string): Текст для экранирования

**Возвращает:** Экранированная строка

**Пример:**
```javascript
const safe = escapeHtml('<script>alert("XSS")</script>');
```

### `getLevelLabel(level)`
Получает русский текст для уровня сложности.

**Параметры:**
- `level` (string): 'beginner', 'intermediate', 'advanced'

**Возвращает:** Локализованная строка

**Пример:**
```javascript
console.log(getLevelLabel('beginner'));      // "Начинающие"
console.log(getLevelLabel('intermediate'));  // "Средний"
console.log(getLevelLabel('advanced'));      // "Продвинутый"
```

---

## 🎯 Примеры использования

### Пример 1: Открыть курс и получить статистику
```javascript
// Открыть курс для начинающих
openCourse('cpp-basics');

// Получить прогресс
const progress = getCourseProgress('cpp-basics', 7);
console.log(`Завершено: ${progress.percentage}%`);

// Получить статистику
const stats = getLearningStats();
console.log(`Всего завершено: ${stats.completedLessons}/${stats.totalLessons}`);
```

### Пример 2: Проверить и отметить урок
```javascript
// Проверить, завершен ли урок
if (!isLessonCompleted('cpp-basics', 'lesson-1-1')) {
    console.log('Урок еще не завершен');
    
    // Отметить как завершенный
    markLessonComplete();
    
    showNotification('Поздравляем! Урок завершен!');
}
```

### Пример 3: Поиск и фильтрация курсов
```javascript
// Получить все продвинутые курсы
const advancedCourses = filterCoursesByLevel('advanced');
console.log(`Найдено продвинутых курсов: ${advancedCourses.length}`);

// Поиск по ключевому слову
const results = searchCourses('ООП');
console.log(`Найдено курсов: ${results.length}`);

// Сортировать по прогрессу
const sorted = sortCoursesByProgress(results);
console.log(sorted);
```

### Пример 4: Экспорт прогресса
```javascript
// Получить статистику
const stats = getLearningStats();
console.log('Статистика:');
console.log(`- Курсов завершено: ${stats.completedCourses}/${stats.totalCourses}`);
console.log(`- Уроков завершено: ${stats.completedLessons}/${stats.totalLessons}`);
console.log(`- Общий прогресс: ${stats.overallProgress}%`);

// Экспортировать
exportProgress();
```

---

## 📝 Структура данных

### Структура Course
```javascript
{
    id: "cpp-basics",
    title: "C++ для начинающих",
    description: "Описание курса",
    level: "beginner",  // beginner, intermediate, advanced
    icon: "📚",
    lessons: [/* array of lessons */]
}
```

### Структура Lesson
```javascript
{
    id: "lesson-1-1",
    title: "Название урока",
    duration: 20,  // в минутах
    sections: [
        {
            title: "Раздел 1",
            content: "Описание",
            code: "// код C++"
        }
    ],
    learned: ["Что выучили 1", "Что выучили 2"]
}
```

### Структура Progress
```javascript
{
    "courseid": {
        "lesson-id": {
            completed: true,
            timestamp: "2026-01-25T10:30:00",
            timeSpent: 1800  // в секундах
        }
    }
}
```

---

## 🚨 Советы и лучшие практики

1. **Всегда проверяйте существование элемента перед использованием**
   ```javascript
   const element = document.querySelector('.my-class');
   if (element) {
       // Работать с элементом
   }
   ```

2. **Используйте локальные переменные для часто используемых значений**
   ```javascript
   const courseId = 'cpp-basics';
   const progress = getCourseProgress(courseId, 7);
   ```

3. **Отловите ошибки при загрузке курсов**
   ```javascript
   loadCoursesData().catch(error => {
       console.error('Ошибка загрузки курсов:', error);
       showNotification('Ошибка при загрузке данных');
   });
   ```

4. **Используйте GSAP для сложных анимаций**
   ```javascript
   if (typeof gsap !== 'undefined') {
       gsap.to('.my-element', { duration: 1, opacity: 0 });
   }
   ```

---

Для получения дополнительной информации, см. README.md и исходный код.
