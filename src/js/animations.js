/**
 * Advanced Animations using GSAP
 * Enhances user experience with smooth, performant animations
 */

/**
 * Initialize GSAP animations
 */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        console.log('GSAP library not loaded');
        return;
    }
    
    // Set up default easing
    gsap.defaults({ duration: 0.6, ease: 'power2.out' });
    
    // Animate buttons on hover
    setupButtonAnimations();
    
    // Animate cards on hover
    setupCardAnimations();
    
    // Setup page transition animations
    setupPageTransitions();
}

/**
 * Button hover animations
 */
function setupButtonAnimations() {
    const buttons = document.querySelectorAll('.btn, .course-button, .nav-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -2,
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.5)'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
            });
        });
    });
}

/**
 * Card hover animations
 */
function setupCardAnimations() {
    const cards = document.querySelectorAll('.card, .course-card, .step-card, .sidebar-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -4,
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            });
        });
    });
}

/**
 * Page transition animations
 */
function setupPageTransitions() {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        if (!page.classList.contains('active')) {
            page.style.opacity = '0';
        }
    });
}

/**
 * Animate hero section on page load
 */
function animateHeroSection() {
    if (typeof gsap === 'undefined') return;
    
    const timeline = gsap.timeline();
    
    timeline
        .from('.hero-title', {
            duration: 0.8,
            y: 30,
            opacity: 0
        })
        .from('.hero-subtitle', {
            duration: 0.8,
            y: 30,
            opacity: 0
        }, '-=0.6')
        .from('.feature-badge', {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.1
        }, '-=0.6')
        .from('.hero-buttons', {
            duration: 0.8,
            y: 30,
            opacity: 0
        }, '-=0.6')
        .from('.hero-code', {
            duration: 0.8,
            x: 30,
            opacity: 0,
            scale: 0.95
        }, '-=1.2');
}

/**
 * Animate course cards in grid
 */
function animateCourseCardsIn() {
    if (typeof gsap === 'undefined') return;
    
    const cards = document.querySelectorAll('.course-card');
    
    gsap.from(cards, {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out'
    });
}

/**
 * Animate lesson page on open
 */
function animateLessonPageIn() {
    if (typeof gsap === 'undefined') return;
    
    const timeline = gsap.timeline();
    
    timeline
        .from('.lesson-header', {
            duration: 0.6,
            y: 20,
            opacity: 0
        })
        .from('.lesson-content', {
            duration: 0.6,
            y: 20,
            opacity: 0
        }, '-=0.4')
        .from('.sidebar-card', {
            duration: 0.6,
            x: 20,
            opacity: 0,
            stagger: 0.1
        }, '-=0.4');
}

/**
 * Animate progress bar filling
 */
function animateProgressBar(element, percentage) {
    if (typeof gsap === 'undefined') {
        element.style.width = percentage + '%';
        return;
    }
    
    gsap.to(element, {
        duration: 1,
        width: percentage + '%',
        ease: 'power2.out'
    });
}

/**
 * Animate number counter (for stats)
 */
function animateCounter(element, endValue, duration = 1) {
    if (typeof gsap === 'undefined') {
        element.textContent = endValue;
        return;
    }
    
    const obj = { value: 0 };
    gsap.to(obj, {
        duration: duration,
        value: endValue,
        onUpdate: function() {
            element.textContent = Math.round(obj.value);
        },
        ease: 'power1.out'
    });
}

/**
 * Parallax scroll effect
 */
function setupParallaxEffect() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top center',
                end: 'bottom center',
                scrub: 1,
                markers: false
            },
            y: -50,
            duration: 1
        });
    });
}

/**
 * Stagger reveal animation for lists
 */
function revealListItems(listSelector) {
    if (typeof gsap === 'undefined') return;
    
    const items = document.querySelectorAll(listSelector);
    
    gsap.from(items, {
        duration: 0.5,
        x: -20,
        opacity: 0,
        stagger: 0.1,
        ease: 'back.out'
    });
}

/**
 * Floating animation
 */
function setupFloatingAnimation(selector) {
    if (typeof gsap === 'undefined') return;
    
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        gsap.to(element, {
            duration: 4,
            y: -20,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

/**
 * Pulse animation
 */
function setupPulseAnimation(selector, intensity = 1.1) {
    if (typeof gsap === 'undefined') return;
    
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        gsap.to(element, {
            duration: 2,
            scale: intensity,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

/**
 * Typewriter effect
 */
function typewriterEffect(element, text, duration = 2) {
    if (typeof gsap === 'undefined') {
        element.textContent = text;
        return;
    }
    
    element.textContent = '';
    const chars = text.split('');
    const obj = { value: 0 };
    
    gsap.to(obj, {
        duration: duration,
        value: chars.length,
        onUpdate: function() {
            element.textContent = chars.slice(0, Math.round(obj.value)).join('');
        },
        ease: 'power1.inOut'
    });
}

/**
 * Shake animation (for errors)
 */
function shakeElement(element, intensity = 10) {
    if (typeof gsap === 'undefined') {
        return;
    }
    
    gsap.to(element, {
        duration: 0.5,
        x: 0,
        repeat: 5,
        onRepeat: function() {
            gsap.to(element, {
                duration: 0.1,
                x: intensity,
                yoyo: true
            });
        }
    });
}

/**
 * Fade and scale in
 */
function fadeInScale(element, delay = 0) {
    if (typeof gsap === 'undefined') {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        return;
    }
    
    gsap.from(element, {
        duration: 0.6,
        opacity: 0,
        scale: 0.95,
        delay: delay,
        ease: 'back.out'
    });
}

/**
 * Slide and fade in from left
 */
function slideInFromLeft(element, delay = 0) {
    if (typeof gsap === 'undefined') {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        return;
    }
    
    gsap.from(element, {
        duration: 0.6,
        opacity: 0,
        x: -30,
        delay: delay,
        ease: 'power2.out'
    });
}

/**
 * Slide and fade in from right
 */
function slideInFromRight(element, delay = 0) {
    if (typeof gsap === 'undefined') {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
        return;
    }
    
    gsap.from(element, {
        duration: 0.6,
        opacity: 0,
        x: 30,
        delay: delay,
        ease: 'power2.out'
    });
}

/**
 * Rotate and scale animation
 */
function rotateAndScale(element, rotation = 360, scale = 1.2, duration = 1) {
    if (typeof gsap === 'undefined') return;
    
    gsap.to(element, {
        duration: duration,
        rotation: rotation,
        scale: scale,
        transformOrigin: 'center center',
        ease: 'back.out'
    });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', initGSAPAnimations);
