/**
 * Healing Streams Dallas Zone - Enhanced Form Handling
 * 
 * This script handles all form submissions for the Healing Streams Dallas Zone website:
 * - User data collection and storage
 * - Form validation
 * - Analytics tracking
 * - Integration with local storage
 */

// Initialize namespace for form handler
window.hsDallasZone = window.hsDallasZone || {};

// Form Handler Module
window.hsDallasZone.formHandler = (function() {
    // Private variables
    const storageKey = 'healingStreams_user_data';
    const storageKeyVisitors = 'healingStreams_visitors';
    let visitorCount = parseInt(localStorage.getItem(storageKeyVisitors) || '0');
    
    // Track unique visitors
    function initVisitorTracking() {
        // Check if this is a new visitor
        if (!localStorage.getItem(storageKeyVisitors)) {
            visitorCount = 1;
        } else {
            visitorCount++;
        }
        
        // Store visitor count
        localStorage.setItem(storageKeyVisitors, visitorCount.toString());
        
        // Track analytics event
        trackAnalyticsEvent('visitor_count', visitorCount.toString());
    }
    
    /**
     * Submits form data to local storage
     * @param {FormData} formData - Form data to submit
     * @param {Function} onSuccess - Success callback
     * @param {Function} onError - Error callback
     */
    function submitForm(formData, onSuccess, onError) {
        console.log('Submitting form data');
        
        // Convert FormData to object
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Add timestamp
        formDataObj.timestamp = new Date().toISOString();
        formDataObj.visitorId = generateVisitorId();
        
        // Track form submission event
        trackFormAnalytics('form_submit', formDataObj);
        
        // Log to console in development
        console.log('Form submission:', formDataObj);
        
        try {
            // Save to localStorage
            saveUserData(formDataObj);
            
            // Simulate API request (would be real in production)
            setTimeout(() => {
                // Success callback
                if (typeof onSuccess === 'function') onSuccess(formDataObj);
                
            }, 800);
        } catch (error) {
            console.error('Form processing error:', error);
            if (typeof onError === 'function') onError(error);
            trackFormAnalytics('form_error', { message: error.message });
        }
    }
    
    /**
     * Saves user data to localStorage
     * @param {Object} data - User data to save
     */
    function saveUserData(data) {
        try {
            // Get existing data
            let existingData = JSON.parse(localStorage.getItem(storageKey) || '{}');
            
            // Merge with new data
            const updatedData = { ...existingData, ...data };
            
            // Save back to localStorage
            localStorage.setItem(storageKey, JSON.stringify(updatedData));
            
            return true;
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    }
    
    /**
     * Retrieves user data from localStorage
     * @returns {Object} User data object
     */
    function getUserData() {
        try {
            return JSON.parse(localStorage.getItem(storageKey) || '{}');
        } catch (error) {
            console.error('Error retrieving user data:', error);
            return {};
        }
    }
    
    /**
     * Validates email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid
     */
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    /**
     * Validates phone number format
     * @param {string} phone - Phone number to validate
     * @returns {boolean} - True if valid
     */
    function validatePhone(phone) {
        // Accept various formats with optional country code
        const re = /^(\+?\d{1,3}[- ]?)?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return re.test(String(phone).trim());
    }
    
    /**
     * Validates a complete form
     * @param {HTMLFormElement} form - Form to validate
     * @returns {boolean} - True if valid
     */
    function validateForm(form) {
        let isValid = true;
        const formElements = form.elements;
        
        // Clear all previous errors
        const errorElements = form.querySelectorAll('.form-error');
        errorElements.forEach(el => el.remove());
        
        // Check each form element
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            
            // Skip buttons, fieldsets, etc.
            if (!['input', 'select', 'textarea'].includes(element.tagName.toLowerCase())) {
                continue;
            }
            
            // Skip elements without a name
            if (!element.name) {
                continue;
            }
            
            // Check required fields
            if (element.hasAttribute('required') && !element.value.trim()) {
                showFieldError(element, 'This field is required');
                isValid = false;
                continue;
            }
            
            // Validate by type
            if (element.value.trim()) {
                if (element.type === 'email' && !validateEmail(element.value)) {
                    showFieldError(element, 'Please enter a valid email address');
                    isValid = false;
                } else if (element.type === 'tel' && !validatePhone(element.value)) {
                    showFieldError(element, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        }
        
        return isValid;
    }
    
    /**
     * Shows an error message for a form field
     * @param {HTMLElement} field - Form field
     * @param {string} message - Error message
     */
    function showFieldError(field, message) {
        // Clear any existing error
        clearFieldError(field);
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        
        // Add error class to field
        field.classList.add('has-error');
        
        // Insert error after the field's parent (to account for label positioning)
        field.parentNode.appendChild(errorElement);
        
        // Focus the field
        field.focus();
    }
    
    /**
     * Clears error message for a form field
     * @param {HTMLElement} field - Form field
     */
    function clearFieldError(field) {
        // Remove error class
        field.classList.remove('has-error');
        
        // Remove error message if exists
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    /**
     * Generates a unique visitor ID
     * @returns {string} - Unique visitor ID
     */
    function generateVisitorId() {
        // Use existing ID if available
        const userData = getUserData();
        if (userData.visitorId) {
            return userData.visitorId;
        }
        
        // Generate new ID
        return 'visitor_' + Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    }
    
    /**
     * Tracks form-related analytics events
     * @param {string} action - Event action
     * @param {Object} data - Event data
     */
    function trackFormAnalytics(action, data) {
        // Send to Google Analytics if available
        if (typeof gtag === 'function') {
            gtag('event', action, {
                'event_category': 'form',
                'event_label': JSON.stringify(data).substring(0, 100)
            });
        }
        
        // Log to console in development
        console.log(`Form Analytics: ${action}`, data);
    }
    
    /**
     * Tracks general analytics events
     * @param {string} action - Event action
     * @param {string} value - Event value
     */
    function trackAnalyticsEvent(action, value) {
        // Send to Google Analytics if available
        if (typeof gtag === 'function') {
            gtag('event', action, {
                'event_category': 'general',
                'event_label': value
            });
        }
        
        // Log to console in development
        console.log(`Analytics Event: ${action}`, value);
    }
    
    /**
     * Setup form field interactions for analytics
     * @param {HTMLFormElement} form - Form to track
     */
    function setupFormTracking(form) {
        if (!form) return;
        
        const formFields = form.querySelectorAll('input, select, textarea');
        
        formFields.forEach(field => {
            // Track field focus
            field.addEventListener('focus', function() {
                trackFormAnalytics('field_focus', {
                    formId: form.id || 'unknown',
                    fieldName: field.name || 'unnamed',
                    fieldType: field.type || 'unknown'
                });
            });
            
            // Track field completion
            field.addEventListener('blur', function() {
                if (field.value) {
                    trackFormAnalytics('field_completed', {
                        formId: form.id || 'unknown',
                        fieldName: field.name || 'unnamed',
                        fieldType: field.type || 'unknown',
                        hasValue: Boolean(field.value)
                    });
                }
            });
        });
    }
    
    /**
     * Initialize form handlers on document ready
     */
    function init() {
        console.log('Initializing form handler');
        
        // Track visitor
        initVisitorTracking();
        
        // Setup form handlers
        document.addEventListener('DOMContentLoaded', function() {
            // Find all forms
            const forms = document.querySelectorAll('form');
            
            console.log('Found forms:', forms.length);
            
            // Set up tracking and validation for each form
            forms.forEach(form => {
                setupFormTracking(form);
                
                // Add submit event handler
                form.addEventListener('submit', function(e) {
                    console.log('Form submitted:', form.id || 'unnamed form');
                    
                    // Prevent default form submission
                    e.preventDefault();
                    
                    // Validate form
                    if (!validateForm(form)) {
                        console.log('Form validation failed');
                        return false;
                    }
                    
                    // Get form data
                    const formData = new FormData(form);
                    
                    // Find submit button and show loading state
                    const submitBtn = form.querySelector('[type="submit"]');
                    let originalBtnContent = '';
                    
                    if (submitBtn) {
                        originalBtnContent = submitBtn.innerHTML;
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = `
                            <div class="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        `;
                    }
                    
                    // Submit form
                    submitForm(
                        formData,
                        // Success callback
                        function(response) {
                            console.log('Form submission success:', response);
                            
                            // Reset submit button
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalBtnContent;
                            }
                            
                            // Trigger custom event for success
                            const successEvent = new CustomEvent('formSubmitSuccess', {
                                detail: { form: form, response: response }
                            });
                            document.dispatchEvent(successEvent);
                            
                            // If the form has a data-success-redirect attribute, redirect
                            const successRedirect = form.getAttribute('data-success-redirect');
                            if (successRedirect) {
                                window.location.href = successRedirect;
                            } else if (form.getAttribute('data-success-message')) {
                                // Show success message if defined
                                const successMsg = document.createElement('div');
                                successMsg.className = 'form-success-message';
                                successMsg.textContent = form.getAttribute('data-success-message');
                                form.parentNode.insertBefore(successMsg, form.nextSibling);
                                
                                // Hide the form
                                form.style.display = 'none';
                            }
                        },
                        // Error callback
                        function(error) {
                            console.error('Form submission error:', error);
                            
                            // Reset submit button
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.innerHTML = originalBtnContent;
                            }
                            
                            // Show error message at the top of the form
                            const errorMsg = document.createElement('div');
                            errorMsg.className = 'form-error form-error-summary';
                            errorMsg.textContent = error.message || 'An error occurred. Please try again.';
                            form.insertBefore(errorMsg, form.firstChild);
                            
                            // Trigger custom event for error
                            const errorEvent = new CustomEvent('formSubmitError', {
                                detail: { form: form, error: error }
                            });
                            document.dispatchEvent(errorEvent);
                        }
                    );
                });
            });
        });
    }
    
    // Initialize the module
    init();
    
    // Public API
    return {
        submitForm: submitForm,
        validateForm: validateForm,
        validateEmail: validateEmail,
        validatePhone: validatePhone,
        showFieldError: showFieldError,
        clearFieldError: clearFieldError,
        getUserData: getUserData,
        saveUserData: saveUserData,
        trackAnalyticsEvent: trackAnalyticsEvent
    };
})();

// Add form error styles if not already present
(function() {
    // Check if styles already exist
    if (!document.getElementById('form-handler-styles')) {
        const formErrorStyle = document.createElement('style');
        formErrorStyle.id = 'form-handler-styles';
        formErrorStyle.textContent = `
        .form-error {
            color: #e53935;
            font-size: 13px;
            margin-top: 5px;
            animation: errorShake 0.4s ease-in-out;
        }
        
        .form-error-summary {
            background-color: rgba(229, 57, 53, 0.1);
            padding: 12px;
            border-radius: 8px;
            border-left: 4px solid #e53935;
            margin-bottom: 20px;
        }
        
        .form-success-message {
            background-color: rgba(92, 184, 92, 0.1);
            color: #5cb85c;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #5cb85c;
            margin: 20px 0;
            animation: fadeIn 0.5s ease-in-out;
        }
        
        .has-error {
            border-color: #e53935 !important;
        }
        
        .loading-dots {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .loading-dots span {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: white;
            margin: 0 3px;
            opacity: 0.6;
        }
        
        .loading-dots span:nth-child(1) {
            animation: loadingDot 1.2s infinite ease-in-out;
        }
        
        .loading-dots span:nth-child(2) {
            animation: loadingDot 1.2s infinite ease-in-out 0.2s;
        }
        
        .loading-dots span:nth-child(3) {
            animation: loadingDot 1.2s infinite ease-in-out 0.4s;
        }
        
        @keyframes loadingDot {
            0%, 100% { opacity: 0.3; transform: scale(0.7); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes errorShake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        `;
        document.head.appendChild(formErrorStyle);
    }
})();