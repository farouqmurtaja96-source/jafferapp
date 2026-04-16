// Lazy Loading Module
// Improves performance by loading resources only when needed

class LazyLoader {
    constructor() {
        this.loadedModules = new Set();
        this.loadingPromises = new Map();
    }

    // Load a module dynamically
    async loadModule(modulePath) {
        // Return cached promise if already loading
        if (this.loadingPromises.has(modulePath)) {
            return this.loadingPromises.get(modulePath);
        }

        // Return early if already loaded
        if (this.loadedModules.has(modulePath)) {
            return Promise.resolve();
        }

        // Create and cache loading promise
        const loadPromise = this._loadModule(modulePath);
        this.loadingPromises.set(modulePath, loadPromise);

        try {
            await loadPromise;
            this.loadedModules.add(modulePath);
            this.loadingPromises.delete(modulePath);
            return Promise.resolve();
        } catch (error) {
            this.loadingPromises.delete(modulePath);
            throw error;
        }
    }

    // Internal method to load a module
    async _loadModule(modulePath) {
        try {
            const module = await import(modulePath);
            console.log(`Module loaded: ${modulePath}`);
            return module;
        } catch (error) {
            console.error(`Failed to load module: ${modulePath}`, error);
            throw error;
        }
    }

    // Load multiple modules in parallel
    async loadModules(modulePaths) {
        const promises = modulePaths.map(path => this.loadModule(path));
        return Promise.all(promises);
    }

    // Load a lesson on demand
    async loadLesson(lessonId) {
        const lessonPath = `../lessons/${this._getLessonLevel(lessonId)}/${lessonId}.js`;
        return this.loadModule(lessonPath);
    }

    // Get lesson level from lesson ID
    _getLessonLevel(lessonId) {
        if (lessonId.startsWith('Beginner')) return 'beginner';
        if (lessonId.startsWith('PreInt')) return 'preIntermediate';
        if (lessonId.startsWith('Intermediate')) return 'intermediate';
        return 'beginner';
    }

    // Preload modules for a specific screen
    async preloadForScreen(screenId) {
        const screenModules = {
            'levels-screen': [
                '../lessons/index.js',
                '../data/arabicLettersData.js'
            ],
            'lesson-screen': [
                '../render/renderLesson.js',
                '../render/renderDialogue.js',
                '../render/renderPractice.js',
                '../render/renderVocabulary.js'
            ],
            'teacher-dashboard-screen': [
                '../logic/bookingManager.js',
                '../logic/studentManager.js',
                '../logic/contactManager.js'
            ],
            'booking-screen': [
                '../booking-logic.js',
                '../weekly-calendar.js',
                '../weekly-calendar-render.js'
            ]
        };

        const modules = screenModules[screenId] || [];
        if (modules.length > 0) {
            console.log(`Preloading modules for screen: ${screenId}`);
            await this.loadModules(modules);
        }
    }

    // Load image lazily
    lazyLoadImage(imgElement, src) {
        if ('loading' in HTMLImageElement.prototype) {
            // Use native lazy loading if supported
            imgElement.loading = 'lazy';
            imgElement.src = src;
        } else {
            // Fallback to Intersection Observer
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        imgElement.src = src;
                        observer.unobserve(imgElement);
                    }
                });
            });
            observer.observe(imgElement);
        }
    }

    // Get loading status
    isLoading(modulePath) {
        return this.loadingPromises.has(modulePath);
    }

    isLoaded(modulePath) {
        return this.loadedModules.has(modulePath);
    }

    // Clear cache (useful for development or hot-reloading)
    clearCache() {
        this.loadedModules.clear();
        this.loadingPromises.clear();
    }
}

// Create global instance
const lazyLoader = new LazyLoader();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = lazyLoader;
} else {
    window.lazyLoader = lazyLoader;
}
