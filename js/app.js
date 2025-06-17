/**
 * Healing Streams Dallas Zone - Main Application Script
 * 
 * This script handles all the dynamic functionality of the Healing Streams website:
 * - Theme toggle functionality
 * - Landing page interactions
 * - Stats animation
 * - Portal card interactions (Resources, Reports, Admin)
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
    
    // Track portal card clicks
    setupPortalCardTracking();
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
 * Setup portal card click tracking
 */
function setupPortalCardTracking() {
    const portalItems = document.querySelectorAll('.portal-item');
    
    portalItems.forEach(item => {
        const link = item.querySelector('.card-cta-button');
        if (link) {
            link.addEventListener('click', function(e) {
                const cardType = item.classList.contains('resources') ? 'resources' :
                               item.classList.contains('reports') ? 'reports' :
                               item.classList.contains('admin') ? 'admin' : 'unknown';
                
                const cardTitle = item.querySelector('h2').textContent;
                
                // Track with Google Analytics
                trackEvent('portal_card_click', cardType, cardTitle);
                
                // Add visual feedback
                const button = this;
                const originalText = button.innerHTML;
                
                // Show loading state
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                button.style.pointerEvents = 'none';
                
                // Reset after a short delay (visual feedback)
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.pointerEvents = 'auto';
                }, 1000);
            });
        }
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
    trackEvent('theme_change', 'user_preference', currentTheme);
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
 * @param {Object} customData - Additional custom data
 */
function trackEvent(action, category, label, customData = {}) {
    // Check if gtag is available
    if (typeof gtag === 'function') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            ...customData
        });
    }
    
    // Log to console in development
    console.log(`Event tracked: ${action}, ${category}, ${label}`, customData);
}

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of notification ('success', 'error', 'info', 'warning')
 * @param {number} duration - Duration in milliseconds
 */
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        console.warn('Toast container not found');
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = '';
    let backgroundColor = '';
    
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            backgroundColor = 'rgba(76, 175, 80, 0.9)';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            backgroundColor = 'rgba(244, 67, 54, 0.9)';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            backgroundColor = 'rgba(255, 193, 7, 0.9)';
            break;
        case 'info':
        default:
            icon = '<i class="fas fa-info-circle"></i>';
            backgroundColor = 'rgba(13, 33, 161, 0.9)';
    }
    
    toast.style.backgroundColor = backgroundColor;
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    toast.style.fontSize = '14px';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.maxWidth = '300px';
    
    toast.innerHTML = `<span style="margin-right: 10px;">${icon}</span> ${message}`;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

/**
 * Get device and browser information for analytics
 * @returns {Object} Device and browser information
 */
function getDeviceInfo() {
    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenWidth: screen.width,
        screenHeight: screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        deviceType: window.innerWidth <= 768 ? 'mobile' : 
                   window.innerWidth <= 1024 ? 'tablet' : 'desktop'
    };
}

// Export functions for global use
window.healingStreamsApp = {
    applyTheme,
    toggleTheme,
    saveUserData,
    trackEvent,
    showToast,
    getDeviceInfo
};