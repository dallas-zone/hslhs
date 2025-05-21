/**
 * Healing Streams Dallas Zone - Resource Download Handler
 * 
 * This script manages direct downloads from Google Drive and other sources
 * It converts sharing URLs to direct download URLs when possible
 * For resources that cannot be directly downloaded, it opens them in a new tab
 */

window.hsDallasZone = window.hsDallasZone || {};

// Download Handler Module
window.hsDallasZone.downloadHandler = (function() {
    // Private variables
    const storageKey = 'healingStreams_downloads';
    
    /**
     * Tracks download analytics
     * @param {string} resourceTitle - Title of the resource
     * @param {string} resourceType - Type of resource (pdf, doc, video, etc.)
     * @param {string} resourceUrl - URL of the resource
     */
    function trackDownload(resourceTitle, resourceType, resourceUrl) {
        // Track with Google Analytics if available
        if (typeof gtag === 'function') {
            gtag('event', 'resource_download', {
                'event_category': resourceType,
                'event_label': resourceTitle,
                'value': 1
            });
        }
        
        // Store download in localStorage
        const downloads = JSON.parse(localStorage.getItem(storageKey) || '[]');
        downloads.push({
            title: resourceTitle,
            type: resourceType,
            url: resourceUrl,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(storageKey, JSON.stringify(downloads));
        
        // Log to console in development
        console.log(`Download tracked: ${resourceTitle} (${resourceType})`);
    }
    
    /**
     * Converts Google Drive sharing URL to direct download URL
     * @param {string} url - Google Drive sharing URL
     * @returns {string} - Direct download URL or original URL if conversion not possible
     */
    function convertGoogleDriveUrl(url) {
        // Check if it's a Google Drive URL
        if (url.includes('drive.google.com/file/d/')) {
            // Extract the file ID
            const fileIdMatch = url.match(/\/d\/([^\/]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
                const fileId = fileIdMatch[1];
                return `https://drive.google.com/uc?export=download&id=${fileId}`;
            }
        }
        
        // Check if it's a Google Doc
        if (url.includes('docs.google.com/document/d/')) {
            // Extract the document ID
            const docIdMatch = url.match(/\/d\/([^\/]+)/);
            if (docIdMatch && docIdMatch[1]) {
                const docId = docIdMatch[1];
                return `https://docs.google.com/document/d/${docId}/export?format=pdf`;
            }
        }
        
        // Check if it's a Google Spreadsheet
        if (url.includes('docs.google.com/spreadsheets/d/')) {
            // Extract the spreadsheet ID
            const sheetIdMatch = url.match(/\/d\/([^\/]+)/);
            if (sheetIdMatch && sheetIdMatch[1]) {
                const sheetId = sheetIdMatch[1];
                return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`;
            }
        }
        
        // Return original URL if no conversion is possible
        return url;
    }
    
    /**
     * Initiates download for a resource
     * @param {string} url - Resource URL
     * @param {string} title - Resource title
     * @param {string} type - Resource type
     */
    function downloadResource(url, title, type) {
        console.log('Downloading resource:', title, type, url);
        
        // Track the download
        trackDownload(title, type, url);
        
        // Determine if this is a Google resource
        const isGoogleResource = url.includes('drive.google.com') || 
                               url.includes('docs.google.com');
        
        if (isGoogleResource) {
            // Convert to direct download URL
            const downloadUrl = convertGoogleDriveUrl(url);
            console.log('Converted download URL:', downloadUrl);
            
            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            
            // For PDFs and documents, download directly
            if (type === 'pdf' || type === 'doc' || type === 'spreadsheet') {
                // Set filename
                const fileExt = type === 'pdf' ? 'pdf' : (type === 'spreadsheet' ? 'xlsx' : 'docx');
                downloadLink.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fileExt}`;
                
                // Show download started toast notification
                showToast(`Downloading ${title}...`);
            } else {
                // For other types, open in new tab
                downloadLink.target = '_blank';
                
                // Show opening notification
                showToast(`Opening ${title} in new tab...`);
            }
            
            // Trigger click
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
        } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            // Open YouTube videos in new tab
            window.open(url, '_blank');
            showToast(`Opening video: ${title}`);
        } else if (url.startsWith('http')) {
            // Open external links in new tab
            window.open(url, '_blank');
            showToast(`Opening resource: ${title}`);
        } else {
            // For relative URLs or other resources
            showToast(`Resource not available for direct download.`);
        }
    }
    
    /**
     * Shows a toast notification
     * @param {string} message - Message to display
     * @param {number} duration - Duration in milliseconds
     */
    function showToast(message, duration = 3000) {
        // Check if toast container exists
        let toastContainer = document.querySelector('.toast-container');
        
        // Create container if it doesn't exist
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        // Determine icon based on message
        let icon = '';
        if (message.includes('Download')) {
            icon = '<i class="fas fa-download"></i>';
        } else if (message.includes('Opening')) {
            icon = '<i class="fas fa-external-link-alt"></i>';
        } else if (message.includes('Preparing')) {
            icon = '<i class="fas fa-spinner fa-spin"></i>';
        } else if (message.includes('Copied')) {
            icon = '<i class="fas fa-check"></i>';
        } else {
            icon = '<i class="fas fa-info-circle"></i>';
        }
        
        // Set toast content
        toast.innerHTML = `${icon} <span>${message}</span>`;
        
        // Add toast to container
        toastContainer.appendChild(toast);
        
        // Remove toast after duration
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }
    
    /**
     * Gets all user downloads
     * @returns {Array} - Array of download objects
     */
    function getAllDownloads() {
        return JSON.parse(localStorage.getItem(storageKey) || '[]');
    }
    
    /**
     * Clears download history
     */
    function clearDownloads() {
        localStorage.removeItem(storageKey);
    }
    
    // Public API
    return {
        downloadResource: downloadResource,
        convertGoogleDriveUrl: convertGoogleDriveUrl,
        getAllDownloads: getAllDownloads,
        clearDownloads: clearDownloads,
        showToast: showToast
    };
})();