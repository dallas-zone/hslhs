/**
 * Healing Streams Dallas Zone - Main Application Script
 * 
 * This script handles all the dynamic functionality of the Healing Streams website:
 * - Theme toggle functionality
 * - Landing page interactions
 * - Stats animation
 */

// DOM Elements and Global Variables
let currentTheme = localStorage.getItem('theme') || 'light';

// DOM Ready Event Listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing application');
    
    // Apply saved theme
    applyTheme(currentTheme);
    
    // Set current year in footer
    document.querySelectorAll('#current-year').forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // Setup theme toggle
    const themeToggle = document.getElementById('theme-switch');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Determine which page we're on
    const isLandingPage = document.getElementById('resources-section') !== null;
    
    if (isLandingPage) {
        setupLandingPage();
    }
});

// Window load event - handle page loader
window.addEventListener('load', function() {
    console.log('Window loaded - hiding loader');
    setTimeout(() => {
        document.body.classList.remove('loading');
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('hidden');
        } else {
            console.warn('Loader element not found in the DOM');
        }
    }, 800);
});

/**
 * Sets up the landing page functionality
 */
function setupLandingPage() {
    console.log('Setting up landing page');
    
    // Add staggered animation to portal items
    const portalItems = document.querySelectorAll('.portal-item');
    portalItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('fade-in');
        }, 100 + (index * 150));
    });
    
    // Setup portal card interactions
    setupCardInteractions();
}

/**
 * Sets up interactive card behaviors
 */
function setupCardInteractions() {
    const cards = document.querySelectorAll('.portal-item');
    
    cards.forEach(card => {
        // 3D tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation based on mouse position
            const rotateY = (mouseX / (cardRect.width / 2)) * 5; // Max 5 degrees
            const rotateX = -(mouseY / (cardRect.height / 2)) * 5; // Max 5 degrees
            
            // Apply the rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            // Move the shine effect
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.backgroundPosition = `${(mouseX / cardRect.width) * 100 + 50}% ${(mouseY / cardRect.height) * 100 + 50}%`;
                shine.style.opacity = '1';
            }
        });
        
        // Reset card on mouse out
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.opacity = '0';
            }
        });
        
        // Add touch effects for mobile
        card.addEventListener('touchstart', function() {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('touchend', function() {
            card.style.transform = '';
        });
    });
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Track theme change
    trackEvent('theme_change', currentTheme, '');
}

/**
 * Apply the selected theme to the document
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeToggle = document.getElementById('theme-switch');
        if (themeToggle) {
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    } else {
        document.body.classList.remove('dark-theme');
        const themeToggle = document.getElementById('theme-switch');
        if (themeToggle) {
            themeToggle.querySelector('i').className = 'fas fa-moon';
        }
    }
}

/**
 * Saves user data to localStorage
 * @param {Object} userData - User data to save
 */
function saveUserData(userData) {
    let existingData = JSON.parse(localStorage.getItem('healingStreams_user_data') || 'null') || {};
    const newData = { ...existingData, ...userData, lastUpdate: new Date().toISOString() };
    localStorage.setItem('healingStreams_user_data', JSON.stringify(newData));
}

/**
 * Tracks an event via Google Analytics
 * @param {string} action - Event action
 * @param {string} category - Event category
 * @param {string} label - Event label
 */
function trackEvent(action, category, label) {
    // Check if gtag is available
    if (typeof gtag === 'function') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Log to console in development
    console.log(`Event tracked: ${action}, ${category}, ${label}`);
}