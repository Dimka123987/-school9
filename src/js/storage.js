/**
 * Local Storage Management
 * Handles user progress and preferences
 */

const STORAGE_KEYS = {
    PROGRESS: 'codepath-progress',
    COMPLETED_LESSONS: 'codepath-completed',
    USER_PREFS: 'codepath-preferences'
};

/**
 * Get user progress
 */
function getProgress() {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return stored ? JSON.parse(stored) : {};
}

/**
 * Save progress for a lesson
 */
function saveLessonProgress(courseId, lessonId, progress) {
    const currentProgress = getProgress();
    
    if (!currentProgress[courseId]) {
        currentProgress[courseId] = {};
    }
    
    currentProgress[courseId][lessonId] = {
        completed: progress.completed || false,
        timestamp: new Date().toISOString(),
        timeSpent: progress.timeSpent || 0
    };
    
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(currentProgress));
    return currentProgress[courseId][lessonId];
}

/**
 * Get completed lessons
 */
function getCompletedLessons(courseId) {
    const progress = getProgress();
    const courseProgress = progress[courseId] || {};
    
    return Object.entries(courseProgress)
        .filter(([_, data]) => data.completed)
        .map(([lessonId]) => lessonId);
}

/**
 * Check if lesson is completed
 */
function isLessonCompleted(courseId, lessonId) {
    const progress = getProgress();
    return progress[courseId]?.[lessonId]?.completed || false;
}

/**
 * Mark lesson as completed
 */
function markLessonAsCompleted(courseId, lessonId) {
    return saveLessonProgress(courseId, lessonId, { completed: true });
}

/**
 * Get overall progress percentage
 */
function getOverallProgress(totalLessons) {
    const progress = getProgress();
    let completedCount = 0;
    let totalCount = 0;
    
    for (const courseId in progress) {
        for (const lessonId in progress[courseId]) {
            totalCount++;
            if (progress[courseId][lessonId].completed) {
                completedCount++;
            }
        }
    }
    
    return totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
}

/**
 * Get course progress
 */
function getCourseProgress(courseId, totalLessons) {
    const completed = getCompletedLessons(courseId).length;
    const percentage = totalLessons === 0 ? 0 : Math.round((completed / totalLessons) * 100);
    
    return {
        completed,
        total: totalLessons,
        percentage
    };
}

/**
 * Clear all progress (for testing)
 */
function clearAllProgress() {
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
}

/**
 * Export progress as JSON
 */
function exportProgress() {
    const progress = getProgress();
    const dataStr = JSON.stringify(progress, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `codepath-progress-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}
