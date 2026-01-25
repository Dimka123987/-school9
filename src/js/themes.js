/**
 * Themes Management
 * Handles dark/light theme switching and persistence
 */

const THEME_KEY = 'codepath-theme';
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};

/**
 * Initialize theme from localStorage or system preference
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? THEMES.DARK : THEMES.LIGHT);
    applyTheme(theme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
        }
    });
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

/**
 * Toggle between themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || THEMES.LIGHT;
    const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    
    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
    
    // Add animation to icon
    const icon = document.querySelector('.theme-icon');
    if (icon) {
        icon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 600);
    }
}

/**
 * Update theme toggle icon
 */
function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = theme === THEMES.DARK ? '☀️' : '🌙';
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeTheme);
