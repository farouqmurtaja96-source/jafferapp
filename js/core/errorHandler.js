// Global Error Handler Module
// Provides centralized error handling and user feedback

class ErrorHandler {
    constructor() {
        this.errors = [];
        this.setupGlobalHandlers();
    }

    // Setup global error handlers
    setupGlobalHandlers() {
        // Handle unhandled errors
        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'Unhandled Error');
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection');
            event.preventDefault();
        });
    }

    // Main error handling method
    handleError(error, context = '') {
        console.error(`[Error${context ? ` - ${context}` : ''}]:`, error);

        // Add to error log
        this.errors.push({
            timestamp: new Date().toISOString(),
            error: error?.message || String(error),
            context,
            stack: error?.stack
        });

        // Show user-friendly message
        this.showUserMessage(error);

        // Optionally send to error tracking service
        this.logToService(error, context);
    }

    // Show user-friendly error message
    showUserMessage(error) {
        const message = this.getUserFriendlyMessage(error);

        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #ef4444;
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

    // Get user-friendly error message
    getUserFriendlyMessage(error) {
        const errorMessages = {
            'Missing or insufficient permissions': 'ليس لديك الصلاحية الكافية للقيام بهذا الإجراء',
            'network-request-failed': 'حدث خطأ في الاتصال. يرجى التحقق من الإنترنت والمحاولة مرة أخرى',
            'auth/invalid-email': 'البريد الإلكتروني غير صالح',
            'auth/user-not-found': 'لم يتم العثور على هذا المستخدم',
            'auth/wrong-password': 'كلمة المرور غير صحيحة',
            'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
            'auth/weak-password': 'كلمة المرور ضعيفة جداً',
            'Google Calendar not connected': 'يرجى ربط تقويم Google أولاً',
            'No user logged in': 'يرجى تسجيل الدخول أولاً',
            'Teacher not found': 'لم يتم العثور على حساب المدرس'
        };

        const errorMessage = error?.message || String(error);
        return errorMessages[errorMessage] || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى';
    }

    // Log error to service (optional)
    async logToService(error, context) {
        // Implement error logging to your preferred service
        // Example: Firebase Crashlytics, Sentry, etc.
        try {
            // Example: log to Firebase
            if (window.db) {
                await window.db.collection('errorLogs').add({
                    timestamp: new Date().toISOString(),
                    error: error?.message || String(error),
                    context,
                    stack: error?.stack,
                    userAgent: navigator.userAgent
                });
            }
        } catch (e) {
            const code = e?.code || "";
            if (code === "permission-denied" || String(e?.message || "").includes("Missing or insufficient permissions")) {
                return;
            }
            console.error('Failed to log error:', e);
        }
    }

    // Handle async errors with retry logic
    async withRetry(asyncFn, maxRetries = 3, delay = 1000) {
        let lastError;

        for (let i = 0; i < maxRetries; i++) {
            try {
                return await asyncFn();
            } catch (error) {
                lastError = error;
                if (i < maxRetries - 1) {
                    await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
                }
            }
        }

        throw lastError;
    }

    // Handle async errors with timeout
    async withTimeout(asyncFn, timeoutMs = 10000, timeoutMessage = 'انتهت مهلة العملية') {
        const task = typeof asyncFn === 'function' ? asyncFn() : asyncFn;
        return Promise.race([
            Promise.resolve(task),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs)
            )
        ]);
    }

    // Get error statistics
    getErrorStats() {
        return {
            total: this.errors.length,
            recent: this.errors.slice(-10),
            byContext: this.errors.reduce((acc, err) => {
                acc[err.context] = (acc[err.context] || 0) + 1;
                return acc;
            }, {})
        };
    }
}

// Create global instance
const errorHandler = new ErrorHandler();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = errorHandler;
} else {
    window.errorHandler = errorHandler;
}

// Add CSS animations for error toasts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
