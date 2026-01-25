/**
 * Courses Data Loader
 * Additional utilities for course management
 */

/**
 * Search courses by keyword
 */
function searchCourses(keyword) {
    if (!keyword) return courses;
    
    const lowerKeyword = keyword.toLowerCase();
    return courses.filter(course => 
        course.title.toLowerCase().includes(lowerKeyword) ||
        course.description.toLowerCase().includes(lowerKeyword)
    );
}

/**
 * Filter courses by level
 */
function filterCoursesByLevel(level) {
    if (level === 'all') return courses;
    return courses.filter(course => course.level === level);
}

/**
 * Sort courses by progress
 */
function sortCoursesByProgress(coursesList = courses) {
    return [...coursesList].sort((a, b) => {
        const progressA = getCourseProgress(a.id, a.lessons.length).percentage;
        const progressB = getCourseProgress(b.id, b.lessons.length).percentage;
        return progressB - progressA;
    });
}

/**
 * Sort courses by level (beginner > intermediate > advanced)
 */
function sortCoursesByLevel(coursesList = courses) {
    const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 };
    return [...coursesList].sort((a, b) => 
        levelOrder[a.level] - levelOrder[b.level]
    );
}

/**
 * Get course by ID
 */
function getCourseById(courseId) {
    return courses.find(c => c.id === courseId);
}

/**
 * Get lesson by ID from course
 */
function getLessonById(courseId, lessonId) {
    const course = getCourseById(courseId);
    return course ? course.lessons.find(l => l.id === lessonId) : null;
}

/**
 * Get lesson position in course
 */
function getLessonPosition(course, lessonId) {
    return course.lessons.findIndex(l => l.id === lessonId) + 1;
}

/**
 * Get total lessons count
 */
function getTotalLessonsCount() {
    return courses.reduce((sum, course) => sum + course.lessons.length, 0);
}

/**
 * Get total completed lessons count
 */
function getTotalCompletedLessonsCount() {
    return courses.reduce((sum, course) => {
        return sum + getCompletedLessons(course.id).length;
    }, 0);
}

/**
 * Get next lesson after current one
 */
function getNextLesson(courseId, currentLessonId) {
    const course = getCourseById(courseId);
    if (!course) return null;
    
    const currentIndex = course.lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex === -1 || currentIndex >= course.lessons.length - 1) {
        return null;
    }
    
    return course.lessons[currentIndex + 1];
}

/**
 * Get previous lesson before current one
 */
function getPreviousLesson(courseId, currentLessonId) {
    const course = getCourseById(courseId);
    if (!course) return null;
    
    const currentIndex = course.lessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex <= 0) {
        return null;
    }
    
    return course.lessons[currentIndex - 1];
}

/**
 * Get estimated time for course
 */
function getEstimatedCourseTime(courseId) {
    const course = getCourseById(courseId);
    if (!course) return 0;
    
    return course.lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
}

/**
 * Get related courses
 */
function getRelatedCourses(courseId, limit = 3) {
    const course = getCourseById(courseId);
    if (!course) return [];
    
    return courses
        .filter(c => c.id !== courseId && c.level === course.level)
        .slice(0, limit);
}

/**
 * Get recommended next course (based on progress)
 */
function getRecommendedNextCourse() {
    // Find courses sorted by completion level
    const coursesWithProgress = courses.map(course => ({
        ...course,
        progress: getCourseProgress(course.id, course.lessons.length)
    }));
    
    // First, find course with highest progress but not completed
    const inProgress = coursesWithProgress.find(c => 
        c.progress.percentage > 0 && c.progress.percentage < 100
    );
    
    if (inProgress) return inProgress;
    
    // If no in-progress course, suggest next level course
    const completedCourses = coursesWithProgress.filter(c => c.progress.percentage === 100);
    if (completedCourses.length > 0) {
        const levels = ['beginner', 'intermediate', 'advanced'];
        const maxLevel = Math.max(...completedCourses.map(c => 
            levels.indexOf(c.level)
        ));
        
        if (maxLevel < levels.length - 1) {
            return coursesWithProgress.find(c => c.level === levels[maxLevel + 1]);
        }
    }
    
    // Default to first course
    return coursesWithProgress[0];
}

/**
 * Get learning statistics
 */
function getLearningStats() {
    const totalLessons = getTotalLessonsCount();
    const completedLessons = getTotalCompletedLessonsCount();
    const totalCourses = courses.length;
    const completedCourses = courses.filter(c => {
        const progress = getCourseProgress(c.id, c.lessons.length);
        return progress.percentage === 100;
    }).length;
    
    return {
        totalCourses,
        completedCourses,
        inProgressCourses: totalCourses - completedCourses,
        totalLessons,
        completedLessons,
        inProgressLessons: totalLessons - completedLessons,
        overallProgress: getOverallProgress(totalLessons)
    };
}

/**
 * Validate course data structure
 */
function validateCourse(course) {
    const required = ['id', 'title', 'level', 'lessons'];
    for (let field of required) {
        if (!course[field]) {
            console.warn(`Course missing required field: ${field}`);
            return false;
        }
    }
    
    if (!Array.isArray(course.lessons) || course.lessons.length === 0) {
        console.warn('Course has no lessons');
        return false;
    }
    
    return true;
}

/**
 * Validate lesson data structure
 */
function validateLesson(lesson) {
    const required = ['id', 'title', 'sections'];
    for (let field of required) {
        if (!lesson[field]) {
            console.warn(`Lesson missing required field: ${field}`);
            return false;
        }
    }
    
    return true;
}

/**
 * Get all lesson IDs for a course
 */
function getAllLessonIdsForCourse(courseId) {
    const course = getCourseById(courseId);
    return course ? course.lessons.map(l => l.id) : [];
}

/**
 * Check if course is completed
 */
function isCoursCompleted(courseId) {
    const progress = getCourseProgress(courseId, getTotalLessonsCount());
    return progress.percentage === 100;
}

/**
 * Mark entire course as completed
 */
function markCourseAsCompleted(courseId) {
    const course = getCourseById(courseId);
    if (!course) return;
    
    course.lessons.forEach(lesson => {
        if (!isLessonCompleted(courseId, lesson.id)) {
            markLessonAsCompleted(courseId, lesson.id);
        }
    });
}
