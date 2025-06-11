/**
 * Healing Streams Dallas Zone - Portal Page Script
 * 
 * This script handles all portal page functionality:
 * - Form submission and data collection
 * - Formspree integration for email notifications
 * - Resource rendering and display for Pre-HSLHS, HSLHS Program, and Post-HSLHS sections
 * - Download and view actions for resources
 * - Animation and interaction for resource categories
 * - Resource preview functionality
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
                        type: "JPEG",
                        url: "https://drive.google.com/file/d/1Du2GQEX_1gfaw9ZOwVsP8oEwW-kxYvTi/view?usp=sharing",
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
                        title: "HSLHS Church Chairpersons Terms of Reference",
                        description: "Guidelines and responsibilities for chairpersons.",
                        type: "doc", // Assuming it's a document
                        url: "",
                        external: true
                    },
                    {
                        title: "HSLHS Zonal Subcommittee Managers Terms of Reference",
                        description: "Guidelines and responsibilities for subcommittee managers.",
                        type: "doc",
                        url: "",
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
                        title: "Access Prayer Cloud",
                        description: "Access the Prayer Cloud portal.",
                        type: "link",
                        url: "https://prayerclouds.org/app/signin.php?user=",
                        external: true
                    },
                    {
                        title: "KingsConference Prayer Platform",
                        description: "Access the Zonal Prayer Platform on KingsConference for coordinated prayer sessions.",
                        type: "link",
                        url: "https://pro2.kingsconference.org/dallas",
                        external: true
                    },
                    {
                        title: "Zonal Prayer Schedule",
                        description: "Complete schedule for all prayer sessions before and during HSLHS.",
                        type: "doc", // Assuming PDF or Doc
                        url: "",
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
                        url: "https://drive.google.com/file/d/1FecxE3BjxTStdpb_mcPcOVLuJxA9B1Ye/view?usp=sharing",
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
                        title: "Be a Herald Flier",
                        description: "Downloadable flier for promoting the Herald program.",
                        type: "pdf",
                        url: "https://drive.google.com/file/d/14XEoWFHCvocOVb-nHC8qvn0UNjRKxpYD/view?usp=drive_link",
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
            },
            {
                id: "publicity-logistics",
                title: "Publicity Logistics and Resources",
                icon: "fas fa-bullhorn",
                resources: [
                    {
                        title: "Branding and Publicity Materials",
                        description: "Access publicity and branding materials (Banners of different sizes, Chest Tag, Envelope design, Flier, Sponsorship Sign-up form) for HSLHS promotion.",
                        type: "link",
                        url: "https://drive.google.com/drive/folders/1xOenEeeuXLXhZ377CD-kqy2K1gskkQvU?usp=sharing",
                        external: true
                    },
                    {
                        title: "T-Shirt Logo Design",
                        description: "Logo for T-Shirt Branding.",
                        type: "doc",
                        url: "https://drive.google.com/file/d/1RnD6qfcy9M8wk8SGsWNRHMjLDBAxdoMM/view?usp=sharing",
                        external: true
                    }
                ]
            },
            {
                id: "inspiration-videos",
                title: "Videos / Programs to Inspire Faith",
                icon: "fas fa-video",
                resources: [
                    {
                        title: "Raised from Dead Series (ROR, Pastor Bear Testimony)",
                        description: "Powerful testimonies of resurrection from the dead.",
                        type: "video",
                        url: "https://www.youtube.com/watch?v=u33yMb3_DMF&ab_channel=CHRISTEMBASSYTURKEY",
                        external: true
                    },
                    {
                        title: "HSLHS Testimonies",
                        description: "Collection of testimonies from previous Healing Streams programs.",
                        type: "video",
                        url: "https://www.youtube.com/watch?v=_-zzHtrLobk&ab_channel=HealingStreamsDigital",
                        external: true
                    },
                    {
                        title: "HSLHS Prophecies",
                        description: "Prophetic words and declarations for Healing Streams.",
                        type: "video",
                        url: "#", // Placeholder - no link provided
                        external: true
                    },
                    {
                        title: "Now is the Time",
                        description: "Inspirational message about seizing the moment for healing.",
                        type: "video",
                        url: "https://youtu.be/A8r4PZx1NFY",
                        external: true
                    },
                    {
                        title: "Foundation School Promo",
                        description: "Promotional video for the Foundation School program.",
                        type: "video",
                        url: "#", // Placeholder - no link provided
                        external: true
                    },
                    {
                        title: "Cell Ministry",
                        description: "Resources and videos for cell ministry activities.",
                        type: "link",
                        url: "https://cellministry.tv",
                        external: true
                    },
                    {
                        title: "Festival of Miracles",
                        description: "Videos and resources from the Festival of Miracles events.",
                        type: "video",
                        url: "#", // Placeholder - no link provided
                        external: true
                    },
                    {
                        title: "Prophecies Fulfilled (Packing out stadiums for crusade)",
                        description: "Documentation of fulfilled prophecies regarding stadium crusades.",
                        type: "video",
                        url: "#", // Placeholder - no link provided
                        external: true
                    },
                    {
                        title: "Healing Streams Affirmations",
                        description: "Positive affirmations and declarations for healing.",
                        type: "audio",
                        url: "#", // Placeholder - no link provided
                        external: true
                    }
                ]
            },
            {
                id: "trainings",
                title: "Trainings",
                icon: "fas fa-graduation-cap",
                resources: [
                    {
                        title: "Pre-Program Training",
                        description: "Comprehensive training materials for pre-program preparation.",
                        type: "doc",
                        url: "",
                        external: true
                    },
                    {
                        title: "Post-Program Training Schedule",
                        description: "Schedule and materials for post-program training sessions.",
                        type: "pdf",
                        url: "",
                        external: true
                    }
                ]
            },
            {
                id: "preparing-places",
                title: "Preparing Places",
                icon: "fas fa-map-marker-alt",
                resources: [
                    {
                        title: "MyStreamSpace",
                        description: "Platform for streaming and virtual participation.",
                        type: "link",
                        url: "https://mystreamspace.org",
                        external: true
                    },
                    {
                        title: "Virtual Center",
                        description: "Access the virtual center for online participation via H.E.R.A.L.D.",
                        type: "link",
                        url: "https://healingstreams.tv",
                        external: true
                    },
                    {
                        title: "Letter to Use Facility for Healing Center",
                        description: "Template letter for requesting facility use (put on letterhead).",
                        type: "doc",
                        url: "https://docs.google.com/document/d/1JQJvyQUipVSohKFC4ZNddy5Lj-_AIaix/edit?usp=sharing&ouid=103193794838078583968&rtpof=true&sd=true",
                        external: true
                    }
                ]
            },
            {
                id: "partnership-resources",
                title: "Partnership Resources",
                icon: "fas fa-handshake",
                resources: [
                    {
                        title: "Type of Partnership Categories",
                        description: "Information about different types of partnership opportunities.",
                        type: "doc",
                        url: "https://drive.google.com/file/d/1OwH3MVtfW827S8zd3Tk9rYszlN7Qa4hf/view?usp=sharing", // Placeholder - no link provided
                        informational: true
                    }
                ]
            },
            {
                id: "check-lists",
                title: "Check Lists",
                icon: "fas fa-tasks",
                resources: [
                    {
                        title: "Checklist/Program Outline and Flier for Organizing HSLHS Launch",
                        description: "Comprehensive checklist for organizing the HSLHS launch event.",
                        type: "pdf",
                        url: "#", // Placeholder - no link provided
                        external: true
                    },
                    {
                        title: "Checklist for Planning and Completing the HSLHS Reports",
                        description: "Step-by-step checklist for planning and completing program reports.",
                        type: "pdf",
                        url: "https://drive.google.com/file/d/1ZfT-4H9iJ0KBacWNJleGcPZLZUQh1wFJ/view?usp=drive_link",
                        external: true
                    },
                    {
                        title: "Checklist for Launching",
                        description: "Essential checklist items for program launch preparation.",
                        type: "pdf",
                        url: "#", // Placeholder - no link provided
                        external: true
                    },
                    {
                        title: "Week 1 in Focus Activities Flier",
                        description: "Flier outlining week 1 focus activities and schedule.",
                        type: "pdf",
                        url: "#", // Placeholder - no link provided
                        external: true
                    },
                    {
                        title: "Set Targets",
                        description: "Guidelines and templates for setting program targets and goals.",
                        type: "pdf",
                        url: "https://drive.google.com/file/d/1VOB0m1tKYbz6-bo8qwFI9dF2ApGAm27o/view?usp=drive_link",
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
                        url: "https://drive.google.com/file/d/1bVxosh1FWG_ScSPrdxHNTOB4rnjYHAZD/view?usp=sharing",
                        external: true
                    },
                    {
                        title: "Rhapsody of Realities Devotional",
                        description: "Access to the Rhapsody of Realities devotional. You can use promo code: CDP78.",
                        type: "link",
                        url: "https://app.rhapsodyofrealities.org/",
                        external: true
                    },
                    {
                        title: "Healing To The Nations (HTTN) Magazines",
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
                        description: "Collection of testimonies from Healing Streams programs.",
                        type: "doc",
                        url: "https://drive.google.com/file/d/1yLnD0naZ8UIqWS3X2JYhOPZiHKt-B_sD/view?usp=sharing",
                        external: true
                    },
                    {
                        title: "Viewership Report",
                        description: "Template for reporting viewership statistics for the program.",
                        type: "doc", // Assuming spreadsheet
                        url: "https://docs.google.com/spreadsheets/d/1GgHoICEnjlQlBA6RcmIblBtZGWmos3mQ/edit?usp=sharing&ouid=103193794838078583968&rtpof=true&sd=true",
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

// Formspree configuration
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrbkpwql';

/**
 * Checks if user has already been sent to Formspree
 * @param {string} email - User email
 * @param {string} role - User role  
 * @returns {boolean} - True if already sent
 */
function hasAlreadyNotified(email, role) {
    const notifiedUsers = JSON.parse(localStorage.getItem('hs_notified_users') || '[]');
    const userKey = `${email.toLowerCase()}_${role}`;
    return notifiedUsers.includes(userKey);
}

/**
 * Marks user as notified in localStorage
 * @param {string} email - User email
 * @param {string} role - User role
 */
function markAsNotified(email, role) {
    const notifiedUsers = JSON.parse(localStorage.getItem('hs_notified_users') || '[]');
    const userKey = `${email.toLowerCase()}_${role}`;
    
    if (!notifiedUsers.includes(userKey)) {
        notifiedUsers.push(userKey);
        localStorage.setItem('hs_notified_users', JSON.stringify(notifiedUsers));
    }
}

/**
 * Sends form data to Formspree for email notification (unique entries only)
 * @param {Object} userData - User data to send
 * @returns {Promise} - Formspree submission promise
 */
async function sendToFormspree(userData) {
    // Check if we've already sent notification for this user
    if (hasAlreadyNotified(userData.email, userData.role)) {
        console.log('Email notification already sent for this user, skipping...');
        return { success: true, skipped: true, reason: 'already_notified' };
    }

    try {
        const formData = new FormData();
        
        // Add form fields for Formspree
        formData.append('email', userData.email);
        formData.append('role', userData.role);
        formData.append('timestamp', userData.timestamp);
        formData.append('access_type', 'Resource Portal Access');
        formData.append('notification_subject', 'New Resource Portal Access - Healing Streams Dallas Zone');
        
        // Create a descriptive message with Chicago time
        const chicagoTime = new Date(userData.timestamp).toLocaleString('en-US', {
            timeZone: 'America/Chicago',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        });
        
        const message = `
New Resource Portal Access:

Email: ${userData.email}
Role: ${userData.role}
Access Time: ${chicagoTime}
Portal: Healing Streams Dallas Zone Resources

This user has successfully accessed the resource portal and can now view all Pre-HSLHS, HSLHS Program, and Post-HSLHS materials.
        `.trim();
        
        formData.append('message', message);
        
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('Successfully sent to Formspree');
            return { success: true, response };
        } else {
            console.error('Formspree error:', response.statusText);
            return { success: false, error: response.statusText };
        }
    } catch (error) {
        console.error('Formspree submission failed:', error);
        return { success: false, error: error.message };
    }
}

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
        resourceForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Resource form submitted');
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnHTML = submitBtn.innerHTML; // Save full HTML for spinner
            
            submitBtn.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
            submitBtn.disabled = true;
            
            const formData = new FormData(resourceForm);
            const userData = {
                email: formData.get('email'),
                role: formData.get('role'),
                timestamp: new Date().toISOString()
            };
            
            console.log('User data collected:', userData);
            
            // Save to localStorage first
            if (window.hsDallasZone && window.hsDallasZone.formHandler) {
                window.hsDallasZone.formHandler.saveUserData(userData);
            } else {
                localStorage.setItem('healingStreams_user_data', JSON.stringify(userData));
            }
            
            // Send to Formspree for email notification
            try {
                const formspreeResult = await sendToFormspree(userData);
                
                if (formspreeResult.success) {
                    console.log('Email notification sent successfully');
                } else {
                    console.warn('Email notification failed, but proceeding with portal access:', formspreeResult.error);
                    // Don't block portal access if email fails
                }
            } catch (error) {
                console.warn('Email notification error, but proceeding with portal access:', error);
                // Don't block portal access if email fails
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
                        'event_label': 'combined_resources_portal',
                        'user_role': userData.role
                    });
                }
                
                // Show success notification
                showToast('Welcome! Resources loaded successfully.', '<i class="fas fa-check-circle"></i>', 4000);
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
    
    const resourcesWrapper = document.getElementById(sectionId + '-wrapper');
    if (!resourcesWrapper) {
        console.error('Resources wrapper element #' + sectionId + '-wrapper not found.');
        return;
    }
    resourcesWrapper.innerHTML = ''; // Clear previous content
    
    const sectionData = resources[sectionId];
    if (!sectionData || !sectionData.categories) {
        console.error('Resource data or categories not found for section: ' + sectionId);
        return;
    }
    
    console.log('Found ' + sectionData.categories.length + ' categories for ' + sectionId);
    
    sectionData.categories.forEach((category, categoryIndex) => {
        const categorySection = document.createElement('div');
        categorySection.className = 'resource-category'; // From portal-styles.css
        categorySection.setAttribute('data-category-id', category.id);
        
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header'; // From portal-styles.css
        categoryHeader.innerHTML = '<h3 class="category-title">' +
            '<i class="' + (category.icon || 'fas fa-folder') + '"></i>' +
            '<span>' + category.title + '</span>' +
            '</h3>' +
            '<button class="category-toggle">' +
            '<i class="fas fa-chevron-up"></i>' +
            '</button>';
        
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
    resourceItem.className = 'resource-item ' + resource.type; // From portal-styles.css
    resourceItem.style.transitionDelay = (index * 0.05) + 's';
    
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
    
    const previewAttribute = !resource.informational ? 'data-preview-trigger' : '';
    
    resourceItem.innerHTML = '<div class="resource-content" ' + previewAttribute + '>' +
        '<div class="resource-icon">' + iconHTML + '</div>' +
        '<div class="resource-details">' +
        '<h4 class="resource-title">' + resource.title + '</h4>' +
        '<p class="resource-description">' + resource.description + '</p>' +
        '<div class="resource-meta">' +
        '<span class="resource-type">' + resource.type.toUpperCase() + '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="resource-actions">' +
        (resource.informational ? 
            '<button class="info-btn" title="View Information"><i class="fas fa-info-circle"></i></button>' :
        resource.type === 'info' ? 
            '<button class="view-btn" title="View Details"><i class="fas fa-eye"></i></button>' :
        (resource.type === 'pdf' || resource.type === 'doc' || resource.type === 'spreadsheet') ?
            '<button class="download-btn" title="Download"><i class="fas fa-download"></i></button>' +
            '<button class="preview-btn" title="Preview"><i class="fas fa-eye"></i></button>' :
            '<button class="view-btn" title="Open Link"><i class="fas fa-external-link-alt"></i></button>' +
            '<button class="preview-btn" title="Preview"><i class="fas fa-eye"></i></button>'
        ) +
        (!resource.informational ? '<button class="share-btn" title="Share"><i class="fas fa-share-alt"></i></button>' : '') +
        '</div>';
    
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
            showToast(resource.title + ': ' + resource.description, '<i class="fas fa-info-circle"></i>', 5000);
            if (typeof gtag === 'function') gtag('event', 'info_view', {'event_category': 'information', 'event_label': resource.title});
        };
        if (infoBtn) infoBtn.addEventListener('click', action);
        if (resourceContent) resourceContent.addEventListener('click', action); // Make content clickable too
        return;
    }

    // Download button
    const downloadBtn = resourceItemEl.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            if (window.hsDallasZone && window.hsDallasZone.downloadHandler) {
                window.hsDallasZone.downloadHandler.downloadResource(resource.url, resource.title, resource.type);
            } else {
                handleResourceDownload(resource); // Fallback
            }
            if (typeof gtag === 'function') gtag('event', 'resource_download', {'event_category': resource.type, 'event_label': resource.title});
        });
    }

    // View button
    const viewBtn = resourceItemEl.querySelector('.view-btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', function() {
            window.open(resource.url, '_blank');
            showToast('Opening: ' + resource.title, '<i class="fas fa-external-link-alt"></i>');
            if (typeof gtag === 'function') gtag('event', 'resource_view', {'event_category': resource.type, 'event_label': resource.title});
        });
    }

    // Preview button
    const previewBtn = resourceItemEl.querySelector('.preview-btn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            if (typeof window.openPreviewModal === 'function') {
                window.openPreviewModal(resource);
            } else {
                // Fallback to opening the resource
                window.open(resource.url, '_blank');
                showToast('Opening: ' + resource.title, '<i class="fas fa-external-link-alt"></i>');
            }
            if (typeof gtag === 'function') gtag('event', 'resource_preview', {'event_category': resource.type, 'event_label': resource.title});
        });
    }

    // Share button
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
                showToast('Link copied: ' + resource.title, '<i class="fas fa-copy"></i>');
            }
            if (typeof gtag === 'function') gtag('event', 'resource_share', {'event_category': resource.type, 'event_label': resource.title});
        });
    }

    // Preview trigger (if resourceContent is meant to open the resource)
    if (resourceContent && resourceContent.hasAttribute('data-preview-trigger')) {
        resourceContent.addEventListener('click', function(e) {
            // Prevent opening if a button inside resource-actions was clicked
            if (e.target.closest('.resource-actions')) return;

            // Check if preview modal function is available
            if (typeof window.openPreviewModal === 'function') {
                window.openPreviewModal(resource);
            } else {
                // Fallback behavior
                if (resource.type === 'video' || resource.type === 'link' || resource.type === 'audio') {
                    window.open(resource.url, '_blank');
                    showToast('Opening: ' + resource.title, '<i class="fas fa-' + (resource.type === 'video' ? 'video' : 'external-link-alt') + '"></i>');
                } else if (resource.type === 'pdf' || resource.type === 'doc' || resource.type === 'spreadsheet') {
                    if (window.hsDallasZone && window.hsDallasZone.downloadHandler) {
                        window.hsDallasZone.downloadHandler.downloadResource(resource.url, resource.title, resource.type);
                    } else {
                        handleResourceDownload(resource); // Fallback
                    }
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
    
    showToast('Preparing download: ' + resource.title, '<i class="fas fa-spinner fa-spin"></i>', 1500);

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
function showToast(message, iconHTML, duration) {
    iconHTML = iconHTML || '';
    duration = duration || 3000;
    
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        console.warn('Toast container (#toast-container) not found. Cannot show toast.');
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast'; // From styles.css or portal-styles.css
    toast.innerHTML = iconHTML + ' <span>' + message + '</span>'; // Wrap message in span for potential styling
    
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