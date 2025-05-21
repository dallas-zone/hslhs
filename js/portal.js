/**
 * Healing Streams Dallas Zone - Portal Page Script
 * * This script handles all portal page functionality:
 * - Form submission and data collection
 * - Resource rendering and display for Pre-HSLHS, HSLHS Program, and Post-HSLHS sections
 * - Download and view actions for resources
 * - Animation and interaction for resource categories
 */

// Configuration for resources
const resources = {
    "pre-hslhs": {
        title: "Pre-HSLHS Resources",
        description: "Prepare effectively with committee logistics, prayer guides, registration materials, and publicity resources.",
        icon: "icons/pre-hslhs.svg", // Ensure this path is correct if icons are used per section
        categories: [
            {
                id: "meeting-committee",
                title: "Meeting Committee Logistics and Resources",
                icon: "fas fa-users-gear",
                resources: [
                    {
                        title: "Zonal Committee Structure",
                        description: "Overview of the zonal committee structure for HSLHS.",
                        type: "pdf",
                        url: "https://drive.google.com/file/d/19wd474AgHrhsKTj4oxWfldblqRwTk5Yl/view?usp=drive_link",
                        external: true
                    },
                    {
                        title: "Meeting Days",
                        description: "Scheduled meeting days for the committee (Sundays, 8pm CST/9pm EST).",
                        type: "info",
                        url: "#", // Placeholder if it's just info
                        informational: true // Custom flag for info-only items
                    },
                    {
                        title: "HSLHS Chairpersons and Terms of Reference",
                        description: "Guidelines and responsibilities for chairpersons.",
                        type: "doc", // Assuming it's a document
                        url: "https://docs.google.com/spreadsheets/d/1RcZ6QRc1x1XqVr7IAONfS0QOzUL4q041/edit?usp=drive_link&ouid=107455283263421670283&rtpof=true&sd=true",
                        external: true
                    },
                    {
                        title: "HSLHS Sub-Committee Managers and Terms of Reference",
                        description: "Guidelines and responsibilities for sub-committee managers.",
                        type: "doc",
                        url: "https://docs.google.com/document/d/1tfp4Pj3WVe6yf-7ZkOgQ4ah-zzL5aVCu/edit?usp=drive_link&ouid=107455283263421670283&rtpof=true&sd=true",
                        external: true
                    }
                ]
            },
            {
                id: "prayer-logistics",
                title: "Prayer Logistics and Resources",
                icon: "fas fa-hands-praying",
                resources: [
                    {
                        title: "Zonal Prayer Cloud",
                        description: "Access the Zonal Prayer Cloud for coordinated prayer sessions.",
                        type: "link",
                        url: "https://prayerclouds.org/app/pstlanr",
                        external: true
                    },
                    {
                        title: "Zonal Prayer Schedule",
                        description: "Complete schedule for all prayer sessions before and during HSLHS.",
                        type: "doc", // Assuming PDF or Doc
                        url: "https://drive.google.com/file/d/1WUi9nGxfUa22-mDxtMPFbpdK5i3U8fFi/view?usp=drive_link",
                        external: true
                    }
                ]
            },
            {
                id: "registration-logistics",
                title: "Registration Logistics and Resources",
                icon: "fas fa-clipboard-check",
                resources: [
                    {
                        title: "Church Registration Links",
                        description: "Official links for church registrations for the program.",
                        type: "doc",
                        url: "https://docs.google.com/document/d/1Ks4TfSW4X0tkJ0sYmdphIEGLqWFesp5lRiyMkzxp2bI/edit?usp=drive_link",
                        external: true
                    },
                    {
                        title: "Be a HERALD - Ambassador",
                        description: "Information on becoming a HERALD ambassador for the healing service.",
                        type: "video",
                        url: "https://www.youtube.com/watch?v=2uOxGxyKFfw&ab_channel=HealingStreamsDigital", // Replace with actual video link
                        external: true
                    },
                    {
                        title: "HERALD Registration",
                        description: "Register to become a HERALD for the Healing Streams program.",
                        type: "link",
                        url: "http://herald.healingstreams.tv",
                        external: true
                    },
                    {
                        title: "How to Register for Faith Clinic",
                        description: "Step-by-step guide to register for the Faith Clinic.",
                        type: "doc",
                        url: "https://docs.google.com/document/d/1Wtcbk2JbmRL_wLZzUpQnnTYOgN7kC4zG1E2mX-qk6ZQ/edit?usp=sharing",
                        external: true
                    }
                ]
            }
        ]
    },
    "hslhs-program": {
        title: "HSLHS Program Resources",
        description: "Access ministry materials, templates, and program essentials for running successful Healing Streams events.",
        icon: "icons/program.svg", // Ensure this path is correct
        categories: [
            {
                id: "ministry-materials",
                title: "Ministry Materials",
                icon: "fas fa-book-bible",
                resources: [
                    {
                        title: "Now That You Are Born Again",
                        description: "Resources for new converts in the Christian faith.",
                        type: "link",
                        url: "http://www.nowthatyouarebornagain.org",
                        external: true
                    },
                    {
                        title: "Why You Should Go To Church",
                        description: "Teaching on the importance of church attendance for spiritual growth.",
                        type: "doc",
                        url: "https://drive.google.com/file/d/14YvoGgZfrPKrdXvK0xm7BqDvtIIeD52_/view?usp=drive_link",
                        external: true
                    },
                    {
                        title: "RoR (TAP2READ CODE)",
                        description: "Access to the Rhapsody of Realities devotional with promo code: TAP2READ.",
                        type: "link",
                        url: "https://app.rhapsodyofrealities.org/",
                        external: true
                    },
                    {
                        title: "HTTN Magazines",
                        description: "Access to Healing to the Nations magazines for spiritual growth.",
                        type: "link",
                        url: "https://httnmagazine.org/",
                        external: true
                    }
                ]
            },
            {
                id: "templates",
                title: "Templates",
                icon: "fas fa-file-lines",
                resources: [
                    {
                        title: "Testimony Bank",
                        description: "Collection of testimonies from previous Healing Streams programs.",
                        type: "doc",
                        url: "https://drive.google.com/file/d/14b-FHDpeZ-lk6J7pfnL0VdsjRx48TX_S/view?usp=drive_link",
                        external: true
                    },
                    {
                        title: "Viewership Report",
                        description: "Template for reporting viewership statistics for the program.",
                        type: "doc", // Assuming spreadsheet
                        url: "https://docs.google.com/spreadsheets/d/1f6iEGTjnY56zYyXyzs8J7zct7qf7tPKP/edit?usp=drive_link&ouid=107455283263421670283&rtpof=true&sd=true",
                        external: true
                    }
                ]
            }
        ]
    },
    "post-hslhs": {
        title: "Post-HSLHS Resources",
        description: "Maximize impact with retainership tips, reporting templates, and insights from previous editions.",
        icon: "icons/post-hslhs.svg", // Ensure this path is correct
        categories: [
            {
                id: "retainership",
                title: "Tips for Retainership",
                icon: "fas fa-hand-holding-heart",
                resources: [
                    {
                        title: "Retainership Guidelines",
                        description: "Guidelines for retaining participants after the Healing Streams program.",
                        type: "doc",
                        url: "https://docs.google.com/document/d/1y7kTm9gJB-iquR3KYNfWlVyfDGhsx-y9rEFXpNJNZOU/edit?usp=sharing",
                        external: true
                    }
                ]
            },
            {
                id: "report-templates",
                title: "Report Templates",
                icon: "fas fa-chart-simple",
                resources: [
                    {
                        title: "Zonal Report",
                        description: "Template for creating comprehensive zonal reports.",
                        type: "link", // Assuming KingsForms is a web link
                        url: "https://www.kingsforms.online/hslhs-dallas-zone-report",
                        external: true
                    }
                ]
            },
            {
                id: "insights",
                title: "Insights from Previous Editions",
                icon: "fas fa-lightbulb",
                resources: [
                    {
                        title: "2024 October Edition",
                        description: "Insights and lessons from the October 2024 edition of Healing Streams.",
                        type: "info",
                        url: "#", // Placeholder
                        informational: true
                    },
                    {
                        title: "2025 March Edition",
                        description: "Insights and lessons from the March 2025 edition of Healing Streams.",
                        type: "info",
                        url: "#", // Placeholder
                        informational: true
                    }
                ]
            }
        ]
    }
};

// DOM Ready Event Listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portal page loaded - combined structure');
    
    setTimeout(() => {
        document.body.classList.remove('loading');
        const loader = document.querySelector('.page-loader'); // Assuming you might have a .page-loader
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 800);
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    const themeToggle = document.getElementById('theme-switch');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    document.querySelectorAll('#current-year').forEach(element => {
        element.textContent = new Date().getFullYear();
    });
    
    const resourceForm = document.getElementById('resource-form');
    if (resourceForm) {
        resourceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Resource form submitted');
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnHTML = submitBtn.innerHTML; // Save full HTML for spinner
            
            submitBtn.innerHTML = `<div class="loading-dots"><span></span><span></span><span></span></div>`;
            submitBtn.disabled = true;
            
            const formData = new FormData(resourceForm);
            const userData = {
                email: formData.get('email'),
                role: formData.get('role'),
                timestamp: new Date().toISOString()
            };
            
            console.log('User data collected:', userData);
            
            if (window.hsDallasZone && window.hsDallasZone.formHandler) {
                window.hsDallasZone.formHandler.saveUserData(userData);
            } else {
                localStorage.setItem('healingStreams_user_data', JSON.stringify(userData));
            }
            
            setTimeout(() => {
                document.getElementById('form-container').style.display = 'none';
                const resourcesContainer = document.getElementById('resources-container');
                resourcesContainer.style.display = 'block';
                resourcesContainer.classList.add('fade-in'); // Ensure fade-in class is defined in CSS
                
                console.log('Rendering all resource sections');
                // Render resources for each phase into their respective wrappers
                renderResources('pre-hslhs');
                renderResources('hslhs-program');
                renderResources('post-hslhs');
                
                // Restore button (though form is hidden, good practice if it were to be shown again)
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;

                // Track form submission with Google Analytics if gtag is defined
                if (typeof gtag === 'function') {
                    gtag('event', 'form_submit', {
                        'event_category': 'portal_access',
                        'event_label': 'combined_resources_portal' 
                    });
                }
            }, 1000); // Simulate API call or processing time
        });
    } else {
        console.error('Resource form (#resource-form) not found.');
    }

    // For development/demo: Uncomment to skip form
    // setTimeout(skipForm, 500); 
});

/**
 * Skips the form and displays resources (for development/testing)
 */
function skipForm() {
    console.log('Skipping form and displaying all resources');
    const formContainer = document.getElementById('form-container');
    if (formContainer) formContainer.style.display = 'none';
    
    const resourcesContainer = document.getElementById('resources-container');
    if (resourcesContainer) {
        resourcesContainer.style.display = 'block';
        resourcesContainer.classList.add('fade-in');
    }
    
    renderResources('pre-hslhs');
    renderResources('hslhs-program');
    renderResources('post-hslhs');
}

/**
 * Apply the selected theme to the document
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
    
    if (typeof gtag === 'function') {
        gtag('event', 'theme_change', {
            'event_category': 'user_preference',
            'event_label': newTheme
        });
    }
}

/**
 * Render resources for a specific phase/section
 * @param {string} sectionId - ID of the section (e.g., 'pre-hslhs', 'hslhs-program', 'post-hslhs')
 */
function renderResources(sectionId) {
    console.log('Rendering resources for section:', sectionId);
    
    const resourcesWrapper = document.getElementById(`${sectionId}-wrapper`);
    if (!resourcesWrapper) {
        console.error(`Resources wrapper element #${sectionId}-wrapper not found.`);
        return;
    }
    resourcesWrapper.innerHTML = ''; // Clear previous content
    
    const sectionData = resources[sectionId];
    if (!sectionData || !sectionData.categories) {
        console.error(`Resource data or categories not found for section: ${sectionId}`);
        return;
    }
    
    console.log(`Found ${sectionData.categories.length} categories for ${sectionId}`);
    
    sectionData.categories.forEach((category, categoryIndex) => {
        const categorySection = document.createElement('div');
        categorySection.className = 'resource-category'; // From portal-styles.css
        categorySection.setAttribute('data-category-id', category.id);
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header'; // From portal-styles.css
        categoryHeader.innerHTML = `
            <h3 class="category-title">
                <i class="${category.icon || 'fas fa-folder'}"></i>
                <span>${category.title}</span>
            </h3>
            <button class="category-toggle">
                <i class="fas fa-chevron-up"></i>
            </button>
        `;
        
        categoryHeader.querySelector('.category-toggle').addEventListener('click', function() {
            const resList = categorySection.querySelector('.resources-list');
            const icon = this.querySelector('i');
            if (resList) {
                resList.classList.toggle('collapsed'); // Ensure .collapsed styles exist
                icon.className = resList.classList.contains('collapsed') ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
            }
        });
        
        const resourcesListDiv = document.createElement('div');
        resourcesListDiv.className = 'resources-list'; // From portal-styles.css
        
        if (category.resources && category.resources.length > 0) {
            category.resources.forEach((resource, resourceIndex) => {
                const resourceItemEl = createResourceItem(resource, resourceIndex);
                resourcesListDiv.appendChild(resourceItemEl);
                setTimeout(() => resourceItemEl.classList.add('animated'), 50 + (resourceIndex * 50));
            });
        } else {
            resourcesListDiv.innerHTML = '<p class="no-resources-in-category">No resources in this category.</p>';
        }
        
        categorySection.appendChild(categoryHeader);
        categorySection.appendChild(resourcesListDiv);
        resourcesWrapper.appendChild(categorySection);
        setTimeout(() => categorySection.classList.add('fade-in'), 100 + (categoryIndex * 100));
    });
     // Dispatch an event after rendering is complete for this section
    const event = new CustomEvent('resourcesRendered', { detail: { sectionId: sectionId } });
    document.dispatchEvent(event);
}

/**
 * Creates a resource item element
 * @param {Object} resource - Resource data
 * @param {number} index - Index for animation delay
 * @returns {HTMLElement} - Resource item element
 */
function createResourceItem(resource, index) {
    const resourceItem = document.createElement('div');
    resourceItem.className = `resource-item ${resource.type}`; // From portal-styles.css
    resourceItem.style.transitionDelay = `${index * 0.05}s`;
    
    let iconHTML = '';
    switch(resource.type) {
        case 'pdf': iconHTML = '<i class="fas fa-file-pdf"></i>'; break;
        case 'doc': iconHTML = '<i class="fas fa-file-word"></i>'; break;
        case 'spreadsheet': iconHTML = '<i class="fas fa-file-excel"></i>'; break;
        case 'video': iconHTML = '<i class="fas fa-video"></i>'; break;
        case 'audio': iconHTML = '<i class="fas fa-headphones"></i>'; break;
        case 'link': iconHTML = '<i class="fas fa-link"></i>'; break;
        case 'info': iconHTML = '<i class="fas fa-info-circle"></i>'; break;
        default: iconHTML = '<i class="fas fa-file"></i>';
    }
    
    resourceItem.innerHTML = `
        <div class="resource-content" ${!resource.informational ? 'data-preview-trigger' : ''}>
            <div class="resource-icon">${iconHTML}</div>
            <div class="resource-details">
                <h4 class="resource-title">${resource.title}</h4>
                <p class="resource-description">${resource.description}</p>
                <div class="resource-meta">
                    <span class="resource-type">${resource.type.toUpperCase()}</span>
                </div>
            </div>
        </div>
        <div class="resource-actions">
            ${resource.informational ? 
                `<button class="info-btn" title="View Information"><i class="fas fa-info-circle"></i></button>` :
            resource.type === 'info' ? // This case is a bit redundant if informational flag is used
                `<button class="view-btn" title="View Details"><i class="fas fa-eye"></i></button>` :
            (resource.type === 'pdf' || resource.type === 'doc' || resource.type === 'spreadsheet') ?
                `<button class="download-btn" title="Download"><i class="fas fa-download"></i></button>` :
                `<button class="view-btn" title="Open Link"><i class="fas fa-external-link-alt"></i></button>`
            }
            ${!resource.informational ? `<button class="share-btn" title="Share"><i class="fas fa-share-alt"></i></button>` : ''}
        </div>
    `;
    
    setupResourceActions(resourceItem, resource);
    return resourceItem;
}

/**
 * Sets up event listeners for resource actions
 * @param {HTMLElement} resourceItemEl - Resource item element
 * @param {Object} resource - Resource data
 */
function setupResourceActions(resourceItemEl, resource) {
    const resourceContent = resourceItemEl.querySelector('.resource-content');

    if (resource.informational) {
        const infoBtn = resourceItemEl.querySelector('.info-btn');
        const action = () => {
            showToast(`${resource.title}: ${resource.description}`, '<i class="fas fa-info-circle"></i>', 5000);
            if (typeof gtag === 'function') gtag('event', 'info_view', {'event_category': 'information', 'event_label': resource.title});
        };
        if (infoBtn) infoBtn.addEventListener('click', action);
        if (resourceContent) resourceContent.addEventListener('click', action); // Make content clickable too
        return;
    }

    const actionBtn = resourceItemEl.querySelector('.download-btn, .view-btn');
    if (actionBtn) {
        actionBtn.addEventListener('click', function() {
            const actionType = this.classList.contains('download-btn') ? 'download' : 'view';
            if (actionType === 'download') {
                if (window.hsDallasZone && window.hsDallasZone.downloadHandler) {
                    window.hsDallasZone.downloadHandler.downloadResource(resource.url, resource.title, resource.type);
                } else {
                    handleResourceDownload(resource); // Fallback
                }
            } else {
                window.open(resource.url, '_blank');
                showToast(`Opening: ${resource.title}`, '<i class="fas fa-external-link-alt"></i>');
            }
            if (typeof gtag === 'function') gtag('event', `resource_${actionType}`, {'event_category': resource.type, 'event_label': resource.title});
        });
    }

    const shareBtn = resourceItemEl.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) { // Use Web Share API if available
                navigator.share({
                    title: resource.title,
                    text: resource.description,
                    url: resource.url,
                })
                .then(() => showToast('Shared successfully!', '<i class="fas fa-check"></i>'))
                .catch((error) => showToast('Sharing failed.', '<i class="fas fa-times"></i>', 3000));
            } else { // Fallback to copy link
                const tempInput = document.createElement('input');
                tempInput.value = resource.url;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast(`Link copied: ${resource.title}`, '<i class="fas fa-copy"></i>');
            }
            if (typeof gtag === 'function') gtag('event', 'resource_share', {'event_category': resource.type, 'event_label': resource.title});
        });
    }

    // Preview trigger (if resourceContent is meant to open the resource)
    if (resourceContent && resourceContent.hasAttribute('data-preview-trigger')) {
        resourceContent.addEventListener('click', function(e) {
            // Prevent opening if a button inside resource-actions was clicked
            if (e.target.closest('.resource-actions')) return;

            // For non-downloadable types or if a specific preview modal is not implemented, open directly
            if (resource.type === 'video' || resource.type === 'link' || resource.type === 'audio') {
                 window.open(resource.url, '_blank');
                 showToast(`Opening: ${resource.title}`, `<i class="fas fa-${resource.type === 'video' ? 'video' : 'external-link-alt'}"></i>`);
            } else if (resource.type === 'pdf' || resource.type === 'doc' || resource.type === 'spreadsheet') {
                // Could implement a modal preview here, or just open/download
                // For now, consistent with actionBtn:
                 if (window.hsDallasZone && window.hsDallasZone.downloadHandler) {
                    window.hsDallasZone.downloadHandler.downloadResource(resource.url, resource.title, resource.type);
                } else {
                    handleResourceDownload(resource); // Fallback
                }
            }
            if (typeof gtag === 'function') gtag('event', 'resource_preview', {'event_category': resource.type, 'event_label': resource.title});
        });
    }
}

/**
 * Fallback Handle resource download for PDF, DOC, and spreadsheet files
 * (Preferably use download-handler.js)
 * @param {Object} resource - Resource data
 */
function handleResourceDownload(resource) {
    let fileName = resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    let fileExtension = resource.type === 'pdf' ? '.pdf' : (resource.type === 'doc' ? '.docx' : (resource.type === 'spreadsheet' ? '.xlsx' : ''));
    
    showToast(`Preparing download: ${resource.title}`, '<i class="fas fa-spinner fa-spin"></i>', 1500);

    // Create a temporary link and trigger download
    const downloadLink = document.createElement('a');
    downloadLink.href = resource.url; 
    downloadLink.target = '_blank'; // Open in new tab which might trigger download or viewing
    if (fileExtension) { // Attempt direct download for known types
      // For Google Drive links, this direct download might not always work without specific URL formats
      // downloadHandler.js has better logic for Google Drive links.
      downloadLink.download = fileName + fileExtension;
    }
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    // Toast for actual download starting would be better if success could be confirmed
}

/**
 * Shows a toast notification
 * @param {string} message - Message to display
 * @param {string} iconHTML - Icon HTML string
 * @param {number} duration - Duration in milliseconds
 */
function showToast(message, iconHTML = '', duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        console.warn('Toast container (#toast-container) not found. Cannot show toast.');
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast'; // From styles.css or portal-styles.css
    toast.innerHTML = `${iconHTML} <span>${message}</span>`; // Wrap message in span for potential styling
    
    toastContainer.appendChild(toast);
    
    // Trigger fade-in animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10); // Short delay to ensure transition takes effect

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300); // Remove after fade-out
    }, duration);
}