// Utility Functions for Kali Linux Simulator

// Format date to string
function formatDate(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Format permissions
function formatPermissions(perms) {
    const type = perms.charAt(0);
    const user = perms.substring(1, 4);
    const group = perms.substring(4, 7);
    const other = perms.substring(7, 10);
    
    return `${type}${formatPermPart(user)}${formatPermPart(group)}${formatPermPart(other)}`;
}

function formatPermPart(part) {
    let result = '';
    result += part.charAt(0) === 'r' ? 'r' : '-';
    result += part.charAt(1) === 'w' ? 'w' : '-';
    result += part.charAt(2) === 'x' ? 'x' : '-';
    return result;
}

// Generate random ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Deep clone object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Check if object is empty
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// Merge objects
function mergeObjects(target, source) {
    return { ...target, ...source };
}

// Convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Convert RGB to hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Get random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Parse command arguments
function parseArgs(command) {
    const args = [];
    let currentArg = '';
    let inQuotes = false;
    let quoteChar = '';
    
    for (let i = 0; i < command.length; i++) {
        const char = command[i];
        
        if ((char === '"' || char === "'") && !inQuotes) {
            inQuotes = true;
            quoteChar = char;
        } else if (char === quoteChar && inQuotes) {
            inQuotes = false;
            quoteChar = '';
        } else if (char === ' ' && !inQuotes) {
            if (currentArg) {
                args.push(currentArg);
                currentArg = '';
            }
        } else {
            currentArg += char;
        }
    }
    
    if (currentArg) {
        args.push(currentArg);
    }
    
    return args;
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Strip HTML tags
function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate URL
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Validate IP address
function isValidIp(ip) {
    const re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return re.test(ip);
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry function
async function retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error;
            await sleep(delay);
        }
    }
}

// Parse time string
function parseTime(timeStr) {
    const units = {
        's': 1000,
        'm': 60000,
        'h': 3600000,
        'd': 86400000
    };
    
    const match = timeStr.match(/^(\d+)([smhd])$/);
    if (match) {
        const value = parseInt(match[1]);
        const unit = match[2];
        return value * units[unit];
    }
    
    return null;
}

// Format time duration
function formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
        return `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
        return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    } else {
        return `${seconds}s`;
    }
}

// Generate random string
function randomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Generate random number
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Clamp value
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Lerp between values
function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

// Map value from range to range
function map(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Scroll to element
function scrollToElement(element, options = {}) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
        ...options
    });
}

// Get element offset
function getElementOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

// Copy text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Failed to copy text:', error);
        return false;
    }
}

// Get text from clipboard
async function getFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        return text;
    } catch (error) {
        console.error('Failed to read clipboard:', error);
        return null;
    }
}

// Download file
function downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Upload file
function uploadFile(accept, callback) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => callback(e.target.result, file);
            reader.readAsText(file);
        }
    };
    input.click();
}

// Parse URL parameters
function getUrlParams() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
        params[key] = value;
    }
    return params;
}

// Build URL with parameters
function buildUrl(url, params) {
    const searchParams = new URLSearchParams(params);
    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
}

// Local storage helpers
const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Failed to set storage:', error);
            return false;
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Failed to get storage:', error);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Failed to remove storage:', error);
            return false;
        }
    },
    
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Failed to clear storage:', error);
            return false;
        }
    }
};

// Session storage helpers
const session = {
    set(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Failed to set session:', error);
            return false;
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Failed to get session:', error);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            sessionStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Failed to remove session:', error);
            return false;
        }
    },
    
    clear() {
        try {
            sessionStorage.clear();
            return true;
        } catch (error) {
            console.error('Failed to clear session:', error);
            return false;
        }
    }
};

// Console logger with colors
const logger = {
    log(...args) {
        console.log('%c[Kali]', 'color: #557799; font-weight: bold;', ...args);
    },
    
    info(...args) {
        console.info('%c[Kali INFO]', 'color: #557799; font-weight: bold;', ...args);
    },
    
    warn(...args) {
        console.warn('%c[Kali WARN]', 'color: #aaaa55; font-weight: bold;', ...args);
    },
    
    error(...args) {
        console.error('%c[Kali ERROR]', 'color: #aa5555; font-weight: bold;', ...args);
    },
    
    success(...args) {
        console.log('%c[Kali SUCCESS]', 'color: #55aa55; font-weight: bold;', ...args);
    }
};

// Export utilities
window.utils = {
    formatDate,
    formatFileSize,
    formatPermissions,
    generateId,
    debounce,
    throttle,
    deepClone,
    isEmpty,
    mergeObjects,
    hexToRgb,
    rgbToHex,
    getRandomColor,
    parseArgs,
    escapeHtml,
    stripHtml,
    isValidEmail,
    isValidUrl,
    isValidIp,
    sleep,
    retry,
    parseTime,
    formatDuration,
    randomString,
    randomNumber,
    clamp,
    lerp,
    map,
    isInViewport,
    scrollToElement,
    getElementOffset,
    copyToClipboard,
    getFromClipboard,
    downloadFile,
    uploadFile,
    getUrlParams,
    buildUrl,
    storage,
    session,
    logger
};