/**
 * Healing Streams Dallas Zone - Reports Portal Script
 * 
 * This script handles all reports portal functionality:
 * - Theme toggle
 * - Quick navigation
 * - Form submission handling
 * - Analytics tracking
 * - Toast notifications
 */

// DOM Ready Event Listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reports portal loaded');
    
    // Remove loading state
    setTimeout(() => {
        document.body.classList.remove('loading');
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 800);
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    // Setup theme toggle
    const themeToggle = document.getElementById('theme-switch');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Set current year in footer
    document.querySelectorAll('#current-year').forEach(element => {
        element.textContent = new Date().getFullYear();
    });
    
    // Setup quick navigation
    setupQuickNavigation();
    
    // Setup report form handlers
    setupReportFormHandlers();
    
    // Setup category toggles
    setupCategoryToggles();
    
    // Track page visit
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            'event_category': 'reports_portal',
            'event_label': 'reports_portal_access'
        });
    }
});

/**
 * Setup quick navigation functionality
 */
function setupQuickNavigation() {
    const quickNavToggle = document.getElementById('quick-nav-toggle');
    const quickNavDropdown = document.getElementById('quick-nav-dropdown');
    const closeQuickNav = document.getElementById('close-quick-nav');
    const quickNavItems = document.querySelectorAll('.quick-nav-item');
    
    // Toggle quick nav menu
    if (quickNavToggle) {
        quickNavToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            quickNavDropdown.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close quick nav menu
    if (closeQuickNav) {
        closeQuickNav.addEventListener('click', function() {
            quickNavDropdown.classList.remove('active');
            quickNavToggle.classList.remove('active');
        });
    }
    
    // Close quick nav when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.quick-nav-menu')) {
            quickNavDropdown.classList.remove('active');
            quickNavToggle.classList.remove('active');
        }
    });
    
    // Quick nav item clicks
    quickNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href');
            const section = document.querySelector(targetSection);
            
            if (section) {
                // Close quick nav
                quickNavDropdown.classList.remove('active');
                quickNavToggle.classList.remove('active');
                
                // Smooth scroll to section
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add highlight animation
                section.classList.add('section-highlight');
                setTimeout(() => {
                    section.classList.remove('section-highlight');
                }, 2000);
                
                // Track navigation
                if (typeof gtag === 'function') {
                    gtag('event', 'quick_nav_click', {
                        'event_category': 'navigation',
                        'event_label': this.dataset.section
                    });
                }
            }
        });
    });
}

/**
 * Setup report form submission handlers
 */
function setupReportFormHandlers() {
    const submitButtons = document.querySelectorAll('.submit-report-btn');
    
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Skip if coming soon
            if (this.classList.contains('coming-soon')) {
                showToast('This form will be available soon. Please check back later.', 'info');
                return;
            }
            
            const formUrl = this.dataset.formUrl;
            const reportTitle = this.closest('.report-item').querySelector('.report-title').textContent;
            
            if (formUrl) {
                // Open form in new tab
                window.open(formUrl, '_blank');
                
                // Show success toast
                showToast('Opening form: ' + reportTitle, 'success');
                
                // Track form access
                if (typeof gtag === 'function') {
                    gtag('event', 'form_access', {
                        'event_category': 'reports',
                        'event_label': reportTitle,
                        'form_url': formUrl
                    });
                }
                
                console.log('Opened form:', reportTitle, formUrl);
            } else {
                showToast('Form URL not available. Please contact support.', 'error');
            }
        });
    });
}

/**
 * Setup category toggle functionality
 */
function setupCategoryToggles() {
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const category = this.closest('.report-category');
            const reportsList = category.querySelector('.reports-list');
            const toggleIcon = this.querySelector('.category-toggle i');
            
            if (reportsList) {
                reportsList.classList.toggle('collapsed');
                
                // Update icon
                if (toggleIcon) {
                    toggleIcon.className = reportsList.classList.contains('collapsed') 
                        ? 'fas fa-chevron-down' 
                        : 'fas fa-chevron-up';
                }
                
                // Track category toggle
                if (typeof gtag === 'function') {
                    gtag('event', 'category_toggle', {
                        'event_category': 'reports_interaction',
                        'event_label': this.querySelector('.category-title span').textContent
                    });
                }
            }
        });
    });
}

/**
 * Apply theme to the document
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    const themeIcon = document.getElementById('theme-switch')?.querySelector('i');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
    }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Track theme change
    if (typeof gtag === 'function') {
        gtag('event', 'theme_change', {
            'event_category': 'user_preference',
            'event_label': newTheme
        });
    }
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast ('success', 'error', 'info', 'warning')
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        console.warn('Toast container not found');
        return;
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Set icon and color based on type
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
    
    // Style the toast
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
    toast.style.maxWidth = '350px';
    toast.style.wordWrap = 'break-word';
    
    // Set content
    toast.innerHTML = `<span style="margin-right: 10px;">${icon}</span> ${message}`;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide and remove toast
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
 * Track report portal events
 * @param {string} action - Event action
 * @param {string} category - Event category
 * @param {string} label - Event label
 * @param {Object} customData - Additional custom data
 */
function trackEvent(action, category, label, customData = {}) {
    if (typeof gtag === 'function') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            ...customData
        });
    }
    
    console.log(`Event tracked: ${action}, ${category}, ${label}`, customData);
}

/**
 * Get user analytics data
 * @returns {Object} User analytics data
 */
function getUserAnalyticsData() {
    return {
        portal_type: 'reports',
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        referrer: document.referrer || 'direct'
    };
}

// Export functions for external use if needed
window.reportsPortal = {
    showToast,
    trackEvent,
    getUserAnalyticsData
};