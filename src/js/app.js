/**
 * Main Application Logic
 * Handles page navigation, lesson rendering, and user interactions
 */

let currentPage = 'home';
let currentCourse = null;
let currentLesson = null;
let courses = [];
let lessonStartTime = null;

/**
 * Global function to open a course (works on all pages)
 * This function navigates to the lesson page with the first lesson of the course
 */
function openCourse(courseId) {
    console.log('openCourse called with courseId:', courseId);
    
    // Try to find in various locations
    let coursesList = null;
    
    // 1. Check if courses are already loaded globally
    if (window.courses && window.courses.length > 0) {
        console.log('Found courses in window.courses');
        coursesList = window.courses;
    } else if (typeof courses !== 'undefined' && courses.length > 0) {
        console.log('Found courses in local variable');
        coursesList = courses;
    } else {
        console.log('Courses not loaded, attempting to load...');
        loadCoursesForOpen(courseId);
        return;
    }
    
    // Find the course
    const course = coursesList.find(c => c.id === courseId);
    console.log('Found course:', course ? course.title : 'NOT FOUND');
    
    if (!course) {
        console.error('Course not found with id:', courseId);
        return;
    }
    
    if (!course.lessons || course.lessons.length === 0) {
        console.error('Course has no lessons');
        return;
    }
    
    // Navigate to lesson page
    console.log('Navigating to lesson page with course:', courseId, 'and lesson:', course.lessons[0].id);
    sessionStorage.setItem('currentCourseId', courseId);
    sessionStorage.setItem('currentLessonId', course.lessons[0].id);
    window.location.href = 'lesson.html';
}

/**
 * Load courses and then open the specified course
 */
async function loadCoursesForOpen(courseId) {
    try {
        console.log('Loading courses from JSON...');
        const response = await fetch('src/data/courses.json');
        if (!response.ok) throw new Error('Failed to load courses');
        
        const loadedCourses = await response.json();
        window.courses = loadedCourses;
        
        const course = loadedCourses.find(c => c.id === courseId);
        console.log('After loading, found course:', course ? course.title : 'NOT FOUND');
        
        if (!course || !course.lessons || course.lessons.length === 0) {
            console.error('Course not found or has no lessons after loading');
            return;
        }
        
        console.log('Navigating to lesson page');
        sessionStorage.setItem('currentCourseId', courseId);
        sessionStorage.setItem('currentLessonId', course.lessons[0].id);
        window.location.href = 'lesson.html';
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing CodePath Academy...');
    loadCoursesData();
    setupEventListeners();
    updateNavigationState();
    renderHomePage();
});

/**
 * Load courses from JSON
 */
async function loadCoursesData() {
    try {
        const response = await fetch('src/data/courses.json');
        courses = await response.json();
        window.courses = courses; // Also store in window for global access
        console.log('Loaded courses:', courses.length);
    } catch (error) {
        console.error('Error loading courses:', error);
        courses = getDefaultCourses();
        window.courses = courses;
    }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Scroll animations
    setupScrollAnimations();
    
    // Window resize
    window.addEventListener('resize', () => {
        updateNavigationState();
    });
}

/**
 * Navigate to a page
 */
function handleNavClick(page) {
    // Close mobile menu
    const menu = document.querySelector('.navbar-menu');
    if (menu) {
        menu.classList.remove('active');
    }
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });
    
    // Show selected page
    const pageElement = document.getElementById(`${page}-page`);
    if (pageElement) {
        pageElement.style.display = 'block';
        pageElement.classList.add('active');
        currentPage = page;
        
        // Render page content
        if (page === 'home') {
            renderHomePage();
        } else if (page === 'courses') {
            renderCoursesPage();
        } else if (page === 'progress') {
            renderProgressPage();
        } else if (page === 'about') {
            renderAboutPage();
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Render home page
 */
function renderHomePage() {
    // Animate step cards with stagger effect
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        card.style.animation = 'none';
        card.style.opacity = '1';
        // Trigger reflow to restart animation
        void card.offsetWidth;
        card.style.animation = `slideUp 0.6s ease-out forwards`;
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Trigger scroll animations
    setTimeout(() => {
        triggerScrollAnimations();
    }, 100);
}

/**
 * Render courses page
 */
function renderCoursesPage() {
    const grid = document.getElementById('courses-grid');
    if (!grid || !courses.length) return;
    
    let html = '';
    
    courses.forEach(course => {
        const progress = getCourseProgress(course.id, course.lessons.length);
        const levelBadgeClass = `badge-${course.level}`;
        
        html += `
            <div class="course-card" onclick="openCourse('${course.id}')">
                <div class="course-header">
                    <span class="course-icon">${course.icon}</span>
                    <span class="course-level">${getLevelLabel(course.level)}</span>
                </div>
                <div class="course-body">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-stats">
                        <div class="course-stat">
                            <div class="course-stat-number">${course.lessons.length}</div>
                            <div class="course-stat-label">Уроков</div>
                        </div>
                        <div class="course-stat">
                            <div class="course-stat-number">${progress.completed}</div>
                            <div class="course-stat-label">Завершено</div>
                        </div>
                        <div class="course-stat">
                            <div class="course-stat-number">${progress.percentage}%</div>
                            <div class="course-stat-label">Прогресс</div>
                        </div>
                    </div>
                </div>
                <button class="course-button">
                    ${progress.completed === course.lessons.length ? '✓ Завершено' : 'Начать'}
                </button>
            </div>
        `;
    });
    
    grid.innerHTML = html;
    
    // Animate cards with stagger effect
    const cards = grid.querySelectorAll('.course-card');
    cards.forEach((card, index) => {
        card.style.animation = 'none';
        card.style.opacity = '1';
        // Trigger reflow to restart animation
        void card.offsetWidth;
        card.style.animation = `slideUp 0.6s ease-out forwards`;
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Setup filter buttons
    setupCourseFilters();
    
    // Trigger animations
    setTimeout(() => {
        triggerScrollAnimations();
    }, 100);
}

/**
 * Setup course filter buttons
 */
function setupCourseFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const level = btn.dataset.level;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter courses
            const cards = document.querySelectorAll('.course-card');
            cards.forEach(card => {
                if (level === 'all') {
                    card.style.display = '';
                } else {
                    const courseId = card.onclick.toString().match(/'([^']+)'/)[1];
                    const course = courses.find(c => c.id === courseId);
                    card.style.display = course.level === level ? '' : 'none';
                }
            });
        });
    });
}

/**
 * Render progress page
 */
function renderProgressPage() {
    const totalPercent = getOverallProgress(courses.length);
    updateProgressCircle(totalPercent);
    
    // Render level-wise progress
    const levelProgress = document.getElementById('level-progress');
    let html = '';
    
    const levels = ['beginner', 'intermediate', 'advanced'];
    const levelLabels = {
        beginner: 'Для начинающих',
        intermediate: 'Средний уровень',
        advanced: 'Продвинутый уровень'
    };
    
    levels.forEach(level => {
        const levelCourses = courses.filter(c => c.level === level);
        const totalLessons = levelCourses.reduce((sum, c) => sum + c.lessons.length, 0);
        const completedLessons = levelCourses.reduce((sum, c) => {
            return sum + getCompletedLessons(c.id).length;
        }, 0);
        
        const percentage = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
        
        html += `
            <div class="level-card">
                <div class="level-header">
                    <span class="level-name">${levelLabels[level]}</span>
                    <span class="badge badge-${level}">${level}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="level-stats">
                    ${completedLessons} из ${totalLessons} уроков • ${percentage}%
                </div>
            </div>
        `;
    });
    
    if (levelProgress) {
        levelProgress.innerHTML = html;
    }
}

/**
 * Render about page
 */
function renderAboutPage() {
    // Content is already in HTML
    triggerScrollAnimations();
}

/**
 * Open a course in SPA mode (display lessons on same page)
 * Used only in single-page application context
 */
function openCourseSPA(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.lessons.length) return;
    
    currentCourse = course;
    currentLesson = course.lessons[0];
    
    displayLesson(course.id, currentLesson.id);
}

/**
 * Display a lesson
 */
function displayLesson(courseId, lessonId) {
    const course = courses.find(c => c.id === courseId);
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (!lesson) return;
    
    currentCourse = course;
    currentLesson = lesson;
    
    // Hide courses page
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show lesson page
    const lessonPage = document.getElementById('lesson-page');
    lessonPage.classList.add('active');
    
    // Render lesson content
    renderLessonContent(course, lesson);
    
    // Start timer
    lessonStartTime = Date.now();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    currentPage = 'lesson';
}

/**
 * Render lesson content
 */
function renderLessonContent(course, lesson) {
    // Update title and meta
    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-level').textContent = getLevelLabel(course.level);
    document.getElementById('lesson-time').textContent = `~${lesson.duration} мин`;
    
    // Render content
    const contentArea = document.getElementById('lesson-content');
    let html = '';
    
    // Render lesson sections
    lesson.sections.forEach(section => {
        html += `<h2>${section.title}</h2>`;
        html += `<p>${section.content}</p>`;
        
        if (section.code) {
            html += `
                <div class="code-example">
                    <div class="code-label">
                        <span>C++ Пример</span>
                        <button class="code-copy" onclick="copyCode(this)">Копировать</button>
                    </div>
                    <pre><code class="code-block">${escapeHtml(section.code)}</code></pre>
                </div>
            `;
        }
    });
    
    contentArea.innerHTML = html;
    
    // Update sidebar
    updateLessonSidebar(course, lesson);
    
    // Update complete button
    const completeBtn = document.getElementById('complete-btn');
    const isCompleted = isLessonCompleted(course.id, lesson.id);
    completeBtn.textContent = isCompleted ? '✓ Уже отмечено как пройденный' : '✓ Отметить как пройденный';
    completeBtn.disabled = isCompleted;
    completeBtn.style.opacity = isCompleted ? '0.5' : '1';
    
    // Trigger animations
    setTimeout(() => {
        triggerScrollAnimations();
    }, 100);
}

/**
 * Update lesson sidebar
 */
function updateLessonSidebar(course, lesson) {
    // Progress bar
    const progress = getCourseProgress(course.id, course.lessons.length);
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressBar) {
        progressBar.style.width = progress.percentage + '%';
    }
    if (progressText) {
        progressText.textContent = `${progress.completed} из ${progress.total} уроков`;
    }
    
    // What you learned
    const learnedList = document.getElementById('learned-items');
    if (lesson.learned && learnedList) {
        learnedList.innerHTML = lesson.learned.map(item => 
            `<li>${item}</li>`
        ).join('');
    }
}

/**
 * Mark lesson as complete
 */
function markLessonComplete() {
    if (!currentCourse || !currentLesson) return;
    
    markLessonAsCompleted(currentCourse.id, currentLesson.id);
    
    // Update UI
    const completeBtn = document.getElementById('complete-btn');
    completeBtn.textContent = '✓ Уже отмечено как пройденный';
    completeBtn.disabled = true;
    completeBtn.style.opacity = '0.5';
    
    // Update sidebar
    updateLessonSidebar(currentCourse, currentLesson);
    
    // Show notification
    showNotification('Поздравляем! Урок отмечен как пройденный!');
}

/**
 * Navigate to next lesson
 */
function nextLesson() {
    if (!currentCourse) return;
    
    const currentIndex = currentCourse.lessons.findIndex(l => l.id === currentLesson.id);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < currentCourse.lessons.length) {
        const nextLesson = currentCourse.lessons[nextIndex];
        displayLesson(currentCourse.id, nextLesson.id);
    } else {
        showNotification('Вы завершили все уроки в этом курсе! 🎉');
    }
}

/**
 * Navigate to previous lesson
 */
function previousLesson() {
    if (!currentCourse) return;
    
    const currentIndex = currentCourse.lessons.findIndex(l => l.id === currentLesson.id);
    const prevIndex = currentIndex - 1;
    
    if (prevIndex >= 0) {
        const prevLesson = currentCourse.lessons[prevIndex];
        displayLesson(currentCourse.id, prevLesson.id);
    }
}

/**
 * Copy code to clipboard
 */
function copyCode(button) {
    const codeBlock = button.closest('.code-example').querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Скопировано';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const menu = document.querySelector('.navbar-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (menu) {
        menu.classList.toggle('mobile-open');
        menu.classList.toggle('active');
    }
    
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

/**
 * Update navigation state
 */
function updateNavigationState() {
    const isMobile = window.innerWidth <= 768;
    // Mobile-specific logic can go here
}

/**
 * Scroll to section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Show notification
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Setup scroll animations
 */
function setupScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.log('GSAP not loaded, using basic animations');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate step cards on scroll
    gsap.utils.toArray('.step-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            opacity: 0,
            y: 30,
            delay: index * 0.1
        });
    });
    
    // Animate course cards on scroll
    gsap.utils.toArray('.course-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            opacity: 0,
            y: 30,
            delay: (index % 3) * 0.1
        });
    });
}

/**
 * Trigger scroll animations
 */
function triggerScrollAnimations() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}

/**
 * Update progress circle
 */
function updateProgressCircle(percentage) {
    const circle = document.querySelector('.progress-circle-fill');
    const percentText = document.getElementById('overall-percent');
    
    if (circle && percentText) {
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
        
        percentText.textContent = percentage + '%';
    }
}

/**
 * Get level label
 */
function getLevelLabel(level) {
    const labels = {
        beginner: 'Начинающие',
        intermediate: 'Средний',
        advanced: 'Продвинутый'
    };
    return labels[level] || level;
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Get default courses (fallback if JSON not loaded)
 */
function getDefaultCourses() {
    return [
        {
            id: 'cpp-basics',
            title: 'C++ для начинающих',
            description: 'Начните свой путь в программирование с основ C++',
            level: 'beginner',
            icon: '📚',
            lessons: [
                {
                    id: 'lesson-1',
                    title: 'Что такое C++?',
                    duration: 10,
                    sections: [
                        {
                            title: 'Введение в C++',
                            content: 'C++ - это мощный, быстрый и универсальный язык программирования, созданный Бьярне Страуструпом в 1985 году как расширение языка C.'
                        }
                    ],
                    learned: ['Определение C++', 'История создания', 'Применение']
                }
            ]
        }
    ];
}

/**
 * Close mobile menu when clicking on a link
 */
function closeMobileMenu() {
    const menu = document.querySelector('.navbar-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (menu) {
        menu.classList.remove('mobile-open');
        menu.classList.remove('active');
    }
    
    if (hamburger) {
        hamburger.classList.remove('active');
    }
}

// Initialize mobile menu close on nav link click
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

function initMobileMenu() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const menu = document.querySelector('.navbar-menu');
        const hamburger = document.querySelector('.hamburger');
        const navbar = document.querySelector('.navbar');
        
        if (menu && menu.classList.contains('mobile-open')) {
            if (!navbar.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });
}


