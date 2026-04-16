// Input Validation Module
// Provides centralized input validation for all forms and API calls

class Validator {
    // Email validation
    static validateEmail(email) {
        if (!email || typeof email !== 'string') {
            return { isValid: false, error: 'البريد الإلكتروني مطلوب' };
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.trim())) {
            return { isValid: false, error: 'صيغة البريد الإلكتروني غير صحيحة' };
        }

        return { isValid: true, value: email.trim() };
    }

    // Phone validation
    static validatePhone(phone) {
        if (!phone || typeof phone !== 'string') {
            return { isValid: false, error: 'رقم الهاتف مطلوب' };
        }

        const phoneRegex = /^[+]?[0-9]{8,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
            return { isValid: false, error: 'رقم الهاتف يجب أن يكون بين 8-15 رقم' };
        }

        return { isValid: true, value: phone.replace(/[\s-]/g, '') };
    }

    // Name validation
    static validateName(name, fieldName = 'الاسم') {
        if (!name || typeof name !== 'string') {
            return { isValid: false, error: `${fieldName} مطلوب` };
        }

        const trimmedName = name.trim();
        if (trimmedName.length < 2) {
            return { isValid: false, error: `${fieldName} يجب أن يكون حرفين على الأقل` };
        }

        if (trimmedName.length > 100) {
            return { isValid: false, error: `${fieldName} طويل جداً` };
        }

        return { isValid: true, value: trimmedName };
    }

    // Date validation
    static validateDate(date, fieldName = 'التاريخ') {
        if (!date) {
            return { isValid: false, error: `${fieldName} مطلوب` };
        }

        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
            return { isValid: false, error: `${fieldName} غير صحيح` };
        }

        return { isValid: true, value: dateObj };
    }

    // Time validation
    static validateTime(time, fieldName = 'الوقت') {
        if (!time || typeof time !== 'string') {
            return { isValid: false, error: `${fieldName} مطلوب` };
        }

        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(time)) {
            return { isValid: false, error: `${fieldName} يجب أن يكون بصيغة HH:MM` };
        }

        return { isValid: true, value: time };
    }

    // Notes validation
    static validateNotes(notes, maxLength = 500) {
        if (!notes) {
            return { isValid: true, value: '' };
        }

        if (typeof notes !== 'string') {
            return { isValid: false, error: 'الملاحظات يجب أن تكون نص' };
        }

        const trimmedNotes = notes.trim();
        if (trimmedNotes.length > maxLength) {
            return { isValid: false, error: `الملاحظات يجب أن لا تتجاوز ${maxLength} حرف` };
        }

        return { isValid: true, value: trimmedNotes };
    }

    // Booking slot validation
    static validateBookingSlot(slot) {
        if (!slot) {
            return { isValid: false, error: 'وقت الحجز مطلوب' };
        }

        const slotTimestamp = new Date(slot).getTime();
        const now = Date.now();
        const oneHourFromNow = now + (60 * 60 * 1000);

        if (slotTimestamp < oneHourFromNow) {
            return { isValid: false, error: 'يجب حجز الدرس قبل ساعة على الأقل' };
        }

        const oneMonthFromNow = now + (30 * 24 * 60 * 60 * 1000);
        if (slotTimestamp > oneMonthFromNow) {
            return { isValid: false, error: 'لا يمكن الحجز لأكثر من شهر' };
        }

        return { isValid: true, value: slotTimestamp };
    }

    // Validate complete booking data
    static validateBookingData(data) {
        const errors = [];

        const nameResult = this.validateName(data.name, 'اسم الطالب');
        if (!nameResult.isValid) errors.push(nameResult.error);

        const emailResult = this.validateEmail(data.email);
        if (!emailResult.isValid) errors.push(emailResult.error);

        const phoneResult = this.validatePhone(data.phone);
        if (!phoneResult.isValid) errors.push(phoneResult.error);

        const slotResult = this.validateBookingSlot(data.slot);
        if (!slotResult.isValid) errors.push(slotResult.error);

        const notesResult = this.validateNotes(data.notes);
        if (!notesResult.isValid) errors.push(notesResult.error);

        return {
            isValid: errors.length === 0,
            errors,
            data: {
                name: nameResult.value,
                email: emailResult.value,
                phone: phoneResult.value,
                slot: slotResult.value,
                notes: notesResult.value
            }
        };
    }

    // Sanitize HTML input (prevent XSS)
    static sanitizeHTML(input) {
        if (!input || typeof input !== 'string') {
            return '';
        }

        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    // Validate URL
    static validateURL(url) {
        if (!url || typeof url !== 'string') {
            return { isValid: false, error: 'الرابط مطلوب' };
        }

        try {
            new URL(url);
            return { isValid: true, value: url.trim() };
        } catch {
            return { isValid: false, error: 'الرابط غير صحيح' };
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validator;
} else {
    window.Validator = Validator;
}
