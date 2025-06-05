/**
 * Healing Streams Dallas Zone - Resource Download Handler
 * 
 * This script manages direct downloads from Google Drive and other sources
 * It converts sharing URLs to direct download URLs when possible
 * For resources that cannot be directly downloaded, it opens them in a new tab
 * Now includes preview functionality for supported file types
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
        console.log('Download tracked: ' + resourceTitle + ' (' + resourceType + ')');
    }
    
    /**
     * Tracks preview analytics
     * @param {string} resourceTitle - Title of the resource
     * @param {string} resourceType - Type of resource (pdf, doc, video, etc.)
     * @param {string} resourceUrl - URL of the resource
     */
    function trackPreview(resourceTitle, resourceType, resourceUrl) {
        // Track with Google Analytics if available
        if (typeof gtag === 'function') {
            gtag('event', 'resource_preview', {
                'event_category': resourceType,
                'event_label': resourceTitle,
                'value': 1
            });
        }
        
        // Log to console in development
        console.log('Preview tracked: ' + resourceTitle + ' (' + resourceType + ')');
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
                return 'https://drive.google.com/uc?export=download&id=' + fileId;
            }
        }
        
        // Check if it's a Google Doc
        if (url.includes('docs.google.com/document/d/')) {
            // Extract the document ID
            const docIdMatch = url.match(/\/d\/([^\/]+)/);
            if (docIdMatch && docIdMatch[1]) {
                const docId = docIdMatch[1];
                return 'https://docs.google.com/document/d/' + docId + '/export?format=pdf';
            }
        }
        
        // Check if it's a Google Spreadsheet
        if (url.includes('docs.google.com/spreadsheets/d/')) {
            // Extract the spreadsheet ID
            const sheetIdMatch = url.match(/\/d\/([^\/]+)/);
            if (sheetIdMatch && sheetIdMatch[1]) {
                const sheetId = sheetIdMatch[1];
                return 'https://docs.google.com/spreadsheets/d/' + sheetId + '/export?format=xlsx';
            }
        }
        
        // Return original URL if no conversion is possible
        return url;
    }
    
    /**
     * Converts Google Drive sharing URL to preview URL
     * @param {string} url - Google Drive sharing URL
     * @returns {string} - Preview URL or original URL if conversion not possible
     */
    function convertGoogleDrivePreviewUrl(url) {
        // Check if it's a Google Drive URL
        if (url.includes('drive.google.com/file/d/')) {
            // Extract the file ID
            const fileIdMatch = url.match(/\/d\/([^\/]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
                const fileId = fileIdMatch[1];
                return 'https://drive.google.com/file/d/' + fileId + '/preview';
            }
        }
        
        // Check if it's a Google Doc
        if (url.includes('docs.google.com/document/d/')) {
            // Extract the document ID
            const docIdMatch = url.match(/\/d\/([^\/]+)/);
            if (docIdMatch && docIdMatch[1]) {
                const docId = docIdMatch[1];
                return 'https://docs.google.com/document/d/' + docId + '/preview';
            }
        }
        
        // Check if it's a Google Spreadsheet
        if (url.includes('docs.google.com/spreadsheets/d/')) {
            // Extract the spreadsheet ID
            const sheetIdMatch = url.match(/\/d\/([^\/]+)/);
            if (sheetIdMatch && sheetIdMatch[1]) {
                const sheetId = sheetIdMatch[1];
                return 'https://docs.google.com/spreadsheets/d/' + sheetId + '/preview';
            }
        }
        
        // Return original URL if no conversion is possible
        return url;
    }
    
    /**
     * Extracts YouTube video ID from URL
     * @param {string} url - YouTube URL
     * @returns {string|null} - Video ID or null if not found
     */
    function extractYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
    
    /**
     * Checks if a resource can be previewed
     * @param {string} url - Resource URL
     * @param {string} type - Resource type
     * @returns {boolean} - Whether the resource can be previewed
     */
    function canPreview(url, type) {
        // Google Drive files
        if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
            return ['pdf', 'doc', 'spreadsheet'].includes(type);
        }
        
        // YouTube videos
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            return type === 'video';
        }
        
        // External links can always be "previewed" (shown as info)
        if (type === 'link') {
            return true;
        }
        
        return false;
    }
    
    /**
     * Opens a resource preview
     * @param {string} url - Resource URL
     * @param {string} title - Resource title
     * @param {string} type - Resource type
     * @param {string} description - Resource description
     */
    function previewResource(url, title, type, description) {
        console.log('Previewing resource:', title, type, url);
        
        // Track the preview
        trackPreview(title, type, url);
        
        // Check if preview modal function exists (from portal.html)
        if (typeof window.openPreviewModal === 'function') {
            const resource = {
                url: url,
                title: title,
                type: type,
                description: description || 'No description available'
            };
            window.openPreviewModal(resource);
        } else {
            // Fallback: open in new tab
            window.open(url, '_blank');
            showToast('Opening preview: ' + title);
        }
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
                downloadLink.download = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.' + fileExt;
                
                // Show download started toast notification
                showToast('Downloading ' + title + '...');
            } else {
                // For other types, open in new tab
                downloadLink.target = '_blank';
                
                // Show opening notification
                showToast('Opening ' + title + ' in new tab...');
            }
            
            // Trigger click
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
        } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            // Open YouTube videos in new tab
            window.open(url, '_blank');
            showToast('Opening video: ' + title);
        } else if (url.startsWith('http')) {
            // Open external links in new tab
            window.open(url, '_blank');
            showToast('Opening resource: ' + title);
        } else {
            // For relative URLs or other resources
            showToast('Resource not available for direct download.');
        }
    }
    
    /**
     * Gets the appropriate preview URL for a resource
     * @param {string} url - Original resource URL
     * @param {string} type - Resource type
     * @returns {string} - Preview URL
     */
    function getPreviewUrl(url, type) {
        // Google Drive files
        if (url.includes('drive.google.com') || url.includes('docs.google.com')) {
            return convertGoogleDrivePreviewUrl(url);
        }
        
        // YouTube videos
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = extractYouTubeVideoId(url);
            if (videoId) {
                return 'https://www.youtube.com/embed/' + videoId;
            }
        }
        
        // Return original URL as fallback
        return url;
    }
    
    /**
     * Generates preview content HTML for different resource types
     * @param {Object} resource - Resource object with url, title, type, description
     * @returns {string} - HTML content for preview
     */
    function generatePreviewContent(resource) {
        let content = '';
        
        switch(resource.type) {
            case 'pdf':
                if (resource.url.includes('drive.google.com')) {
                    const previewUrl = getPreviewUrl(resource.url, resource.type);
                    content = '<div class="pdf-preview">' +
                             '<iframe src="' + previewUrl + '" ' +
                             'width="100%" height="500" frameborder="0">' +
                             '</iframe>' +
                             '</div>';
                } else {
                    content = getGenericPreview(resource);
                }
                break;
                
            case 'doc':
                if (resource.url.includes('docs.google.com')) {
                    const previewUrl = getPreviewUrl(resource.url, resource.type);
                    content = '<div class="doc-preview">' +
                             '<iframe src="' + previewUrl + '" ' +
                             'width="100%" height="500" frameborder="0">' +
                             '</iframe>' +
                             '</div>';
                } else {
                    content = getGenericPreview(resource);
                }
                break;
                
            case 'spreadsheet':
                if (resource.url.includes('docs.google.com/spreadsheets')) {
                    const previewUrl = getPreviewUrl(resource.url, resource.type);
                    content = '<div class="sheet-preview">' +
                             '<iframe src="' + previewUrl + '" ' +
                             'width="100%" height="500" frameborder="0">' +
                             '</iframe>' +
                             '</div>';
                } else {
                    content = getGenericPreview(resource);
                }
                break;
                
            case 'video':
                if (resource.url.includes('youtube.com') || resource.url.includes('youtu.be')) {
                    const videoId = extractYouTubeVideoId(resource.url);
                    if (videoId) {
                        content = '<div class="video-preview">' +
                                 '<iframe src="https://www.youtube.com/embed/' + videoId + '" ' +
                                 'width="100%" height="400" frameborder="0" ' +
                                 'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
                                 'allowfullscreen>' +
                                 '</iframe>' +
                                 '</div>';
                    } else {
                        content = getGenericPreview(resource);
                    }
                } else {
                    content = getGenericPreview(resource);
                }
                break;
                
            case 'link':
                content = '<div class="link-preview">' +
                         '<div class="link-info">' +
                         '<div class="link-icon">' +
                         '<i class="fas fa-external-link-alt"></i>' +
                         '</div>' +
                         '<div class="link-details">' +
                         '<h4>' + resource.title + '</h4>' +
                         '<p>' + resource.description + '</p>' +
                         '<div class="link-url">' +
                         '<i class="fas fa-link"></i>' +
                         '<span>' + resource.url + '</span>' +
                         '</div>' +
                         '</div>' +
                         '</div>' +
                         '<div class="link-actions">' +
                         '<button class="preview-link-btn" onclick="window.open(\'' + resource.url + '\', \'_blank\')">' +
                         '<i class="fas fa-external-link-alt"></i> Open Link' +
                         '</button>' +
                         '</div>' +
                         '</div>';
                break;
                
            default:
                content = getGenericPreview(resource);
        }
        
        return content;
    }
    
    /**
     * Gets generic preview HTML for unsupported types
     * @param {Object} resource - Resource object
     * @returns {string} - Generic preview HTML
     */
    function getGenericPreview(resource) {
        return '<div class="generic-preview">' +
               '<div class="preview-info">' +
               '<div class="preview-type-icon">' +
               '<i class="fas fa-file"></i>' +
               '</div>' +
               '<h4>' + resource.title + '</h4>' +
               '<p>' + resource.description + '</p>' +
               '<div class="resource-meta-info">' +
               '<span class="resource-type-badge">' + resource.type.toUpperCase() + '</span>' +
               '</div>' +
               '</div>' +
               '<div class="preview-message">' +
               '<p>Preview not available for this resource type. Please download or open the link to view the content.</p>' +
               '</div>' +
               '</div>';
    }
    
    /**
     * Shows a toast notification
     * @param {string} message - Message to display
     * @param {number} duration - Duration in milliseconds
     */
    function showToast(message, duration) {
        duration = duration || 3000;
        
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
        if (message.includes('Download') || message.includes('download')) {
            icon = '<i class="fas fa-download"></i>';
        } else if (message.includes('Opening') || message.includes('opening')) {
            icon = '<i class="fas fa-external-link-alt"></i>';
        } else if (message.includes('Preparing') || message.includes('preparing')) {
            icon = '<i class="fas fa-spinner fa-spin"></i>';
        } else if (message.includes('Copied') || message.includes('copied')) {
            icon = '<i class="fas fa-check"></i>';
        } else if (message.includes('Preview') || message.includes('preview')) {
            icon = '<i class="fas fa-eye"></i>';
        } else {
            icon = '<i class="fas fa-info-circle"></i>';
        }
        
        // Set toast content
        toast.innerHTML = icon + ' <span>' + message + '</span>';
        
        // Add toast to container
        toastContainer.appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove toast after duration
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
    
    /**
     * Gets download statistics
     * @returns {Object} - Download statistics
     */
    function getDownloadStats() {
        const downloads = getAllDownloads();
        const stats = {
            total: downloads.length,
            byType: {},
            recent: downloads.slice(-10).reverse() // Last 10 downloads, most recent first
        };
        
        // Count by type
        downloads.forEach(download => {
            stats.byType[download.type] = (stats.byType[download.type] || 0) + 1;
        });
        
        return stats;
    }
    
    // Public API
    return {
        downloadResource: downloadResource,
        previewResource: previewResource,
        convertGoogleDriveUrl: convertGoogleDriveUrl,
        convertGoogleDrivePreviewUrl: convertGoogleDrivePreviewUrl,
        getPreviewUrl: getPreviewUrl,
        generatePreviewContent: generatePreviewContent,
        canPreview: canPreview,
        extractYouTubeVideoId: extractYouTubeVideoId,
        getAllDownloads: getAllDownloads,
        clearDownloads: clearDownloads,
        getDownloadStats: getDownloadStats,
        showToast: showToast
    };
})();