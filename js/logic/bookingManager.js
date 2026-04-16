// Booking Manager Module
// Handles all booking-related operations

import * as CONST from '../core/constants.js';

// Re-create constant names
const LS_BOOKING_SETTINGS_KEY = CONST.LS_BOOKING_SETTINGS_KEY;

class BookingManager {
    constructor() {
        this.settings = {
            timezone: "",
            slotMinutes: 50,
            breakMinutes: 10,
            totalSlotMinutes: 60,
            days: {
                Mon: { enabled: true, start: "09:00", end: "17:00" },
                Tue: { enabled: true, start: "09:00", end: "17:00" },
                Wed: { enabled: true, start: "09:00", end: "17:00" },
                Thu: { enabled: true, start: "09:00", end: "17:00" },
                Fri: { enabled: true, start: "09:00", end: "17:00" },
                Sat: { enabled: false, start: "10:00", end: "14:00" },
                Sun: { enabled: false, start: "10:00", end: "14:00" },
            },
            exceptions: [],
        };
    }

    // Ensure settings have proper structure
    ensureSettingsShape() {
        if (!this.settings || typeof this.settings !== "object") {
            this.settings = {};
        }

        if (!this.settings.days || typeof this.settings.days !== "object") {
            this.settings.days = {
                Mon: { enabled: true, start: "09:00", end: "17:00" },
                Tue: { enabled: true, start: "09:00", end: "17:00" },
                Wed: { enabled: true, start: "09:00", end: "17:00" },
                Thu: { enabled: true, start: "09:00", end: "17:00" },
                Fri: { enabled: true, start: "09:00", end: "17:00" },
                Sat: { enabled: false, start: "10:00", end: "14:00" },
                Sun: { enabled: false, start: "10:00", end: "14:00" },
            };
        }

        if (!Array.isArray(this.settings.exceptions)) {
            this.settings.exceptions = [];
        }

        if (!this.settings.slotMinutes) {
            this.settings.slotMinutes = 50;
        }

        if (!this.settings.breakMinutes) {
            this.settings.breakMinutes = 10;
        }

        if (!this.settings.totalSlotMinutes) {
            this.settings.totalSlotMinutes = this.settings.slotMinutes + this.settings.breakMinutes;
        }

        if (typeof this.settings.timezone !== "string") {
            this.settings.timezone = "";
        }
    }

    // Load settings from localStorage
    loadFromStorage() {
        try {
            const raw = localStorage.getItem(LS_BOOKING_SETTINGS_KEY);
            if (raw) {
                this.settings = { ...this.settings, ...JSON.parse(raw) };
            }
        } catch (error) {
            console.error('Error loading booking settings:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Load Booking Settings');
            }
        }
        this.ensureSettingsShape();
        return this.settings;
    }

    // Save settings to localStorage
    saveToStorage() {
        try {
            localStorage.setItem(LS_BOOKING_SETTINGS_KEY, JSON.stringify(this.settings));
        } catch (error) {
            console.error('Error saving booking settings:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Save Booking Settings');
            }
        }
    }

    // Load settings from Firebase
    async loadFromCloud() {
        try {
            if (!window.db) {
                throw new Error('Firebase not initialized');
            }

            const ref = window.db.collection("bookingSettings").doc("primary");
            const snap = await ref.get();

            if (snap.exists) {
                this.settings = { ...this.settings, ...snap.data() };
            }
        } catch (error) {
            console.error('Error loading booking settings from cloud:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Load Booking Settings from Cloud');
            }
        }
        this.ensureSettingsShape();
        return this.settings;
    }

    // Save settings to Firebase
    async saveToCloud() {
        try {
            if (!window.db) {
                throw new Error('Firebase not initialized');
            }

            const ref = window.db.collection("bookingSettings").doc("primary");
            await ref.set(this.settings, { merge: true });
        } catch (error) {
            console.error('Error saving booking settings to cloud:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Save Booking Settings to Cloud');
            }
            throw error;
        }
    }

    // Update specific setting
    updateSetting(key, value) {
        this.settings[key] = value;
        this.saveToStorage();
    }

    // Update day settings
    updateDay(day, enabled, start, end) {
        if (!this.settings.days[day]) {
            this.settings.days[day] = {};
        }

        this.settings.days[day].enabled = enabled;
        this.settings.days[day].start = start;
        this.settings.days[day].end = end;

        this.saveToStorage();
    }

    // Add exception
    addException(exception) {
        if (!Array.isArray(this.settings.exceptions)) {
            this.settings.exceptions = [];
        }
        this.settings.exceptions.push(exception);
        this.saveToStorage();
    }

    // Remove exception
    removeException(exceptionId) {
        this.settings.exceptions = this.settings.exceptions.filter(
            ex => ex.id !== exceptionId
        );
        this.saveToStorage();
    }

    // Get current settings
    getSettings() {
        return { ...this.settings };
    }

    // Check if slot is available
    isSlotAvailable(date, time) {
        const dateKey = this.formatDate(date);
        const dayName = this.getDayName(date);

        // Check if day is enabled
        const daySettings = this.settings.days[dayName];
        if (!daySettings || !daySettings.enabled) {
            return false;
        }

        // Check if time is within working hours
        const timeMinutes = this.timeToMinutes(time);
        const startMinutes = this.timeToMinutes(daySettings.start);
        const endMinutes = this.timeToMinutes(daySettings.end);

        if (timeMinutes < startMinutes || timeMinutes >= endMinutes) {
            return false;
        }

        // Check exceptions
        return !this.isSlotBlockedByException(date, time);
    }

    // Check if slot is blocked by exception
    isSlotBlockedByException(date, time) {
        const dateKey = this.formatDate(date);
        const timeMinutes = this.timeToMinutes(time);

        return this.settings.exceptions.some(ex => {
            if (ex.date !== dateKey) return false;

            const exStart = this.timeToMinutes(ex.start);
            const exEnd = this.timeToMinutes(ex.end);

            if (exStart === null || exEnd === null) return false;
            if (exEnd <= exStart) return false;

            return timeMinutes >= exStart && timeMinutes < exEnd;
        });
    }

    // Format date as YYYY-MM-DD
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Get day name from date
    getDayName(date) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date.getDay()];
    }

    // Convert time string to minutes
    timeToMinutes(timeStr) {
        if (!timeStr || !timeStr.includes(":")) return null;
        const [h, m] = timeStr.split(":").map(Number);
        if (Number.isNaN(h) || Number.isNaN(m)) return null;
        return h * 60 + m;
    }
}

// Create and export singleton instance
const bookingManager = new BookingManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = bookingManager;
} else {
    window.bookingManager = bookingManager;
}
