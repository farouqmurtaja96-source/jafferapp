// Contact Manager Module
// Handles contact settings and WhatsApp integration

import * as CONST from '../core/constants.js';

// Re-create constant names
const LS_CONTACT_SETTINGS_KEY = CONST.LS_CONTACT_SETTINGS_KEY;

class ContactManager {
    constructor() {
        this.settings = {
            whatsapp: "",
            sitePrice: "",
        };
    }

    // Load settings from localStorage
    loadFromStorage() {
        try {
            const raw = localStorage.getItem(LS_CONTACT_SETTINGS_KEY);
            if (raw) {
                this.settings = { ...this.settings, ...JSON.parse(raw) };
            }
        } catch (error) {
            console.error('Error loading contact settings:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Load Contact Settings');
            }
        }
        return this.settings;
    }

    // Save settings to localStorage
    saveToStorage() {
        try {
            localStorage.setItem(LS_CONTACT_SETTINGS_KEY, JSON.stringify(this.settings));
        } catch (error) {
            console.error('Error saving contact settings:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Save Contact Settings');
            }
            throw error;
        }
    }

    // Update WhatsApp number
    updateWhatsApp(whatsapp) {
        this.settings.whatsapp = whatsapp;
        this.saveToStorage();
    }

    // Update site price
    updateSitePrice(price) {
        this.settings.sitePrice = price;
        this.saveToStorage();
    }

    // Build WhatsApp URL
    buildWhatsAppUrl(message) {
        try {
            const raw = (this.settings.whatsapp || "").trim();
            if (!raw) {
                return null;
            }

            if (raw.startsWith("http")) {
                const sep = raw.includes("?") ? "&" : "?";
                return `${raw}${sep}text=${encodeURIComponent(message)}`;
            }

            const number = raw.replace(/[^0-9]/g, "");
            if (!number) {
                return null;
            }

            return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        } catch (error) {
            console.error('Error building WhatsApp URL:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Build WhatsApp URL');
            }
            return null;
        }
    }

    // Open WhatsApp with message
    openWhatsApp(message) {
        try {
            const url = this.buildWhatsAppUrl(message);
            if (!url) {
                throw new Error('WhatsApp contact not set');
            }
            window.open(url, "_blank");
        } catch (error) {
            console.error('Error opening WhatsApp:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Open WhatsApp');
            }
            // Show user-friendly message
            this.showWhatsAppNotSetMessage();
        }
    }

    // Show WhatsApp not set message
    showWhatsAppNotSetMessage() {
        const toast = document.createElement('div');
        toast.className = 'contact-toast';
        toast.textContent = 'WhatsApp contact not set. Please configure it in settings.';
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #2ba48c;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;

        document.body.appendChild(toast);

        // Remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // Get current settings
    getSettings() {
        return { ...this.settings };
    }

    // Validate WhatsApp number
    validateWhatsAppNumber(number) {
        // Remove all non-numeric characters
        const cleaned = number.replace(/[^0-9]/g, '');

        // Check if it's a valid international number (8-15 digits)
        const isValid = cleaned.length >= 8 && cleaned.length <= 15;

        return {
            isValid,
            cleaned,
            error: isValid ? null : 'Invalid WhatsApp number format'
        };
    }
}

// Create and export singleton instance
const contactManager = new ContactManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = contactManager;
} else {
    window.contactManager = contactManager;
}
