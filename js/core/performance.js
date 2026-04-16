// Performance Optimization Module
// Provides utilities for improving app performance

class PerformanceOptimizer {
    constructor() {
        this.metrics = new Map();
        this.observers = new Map();
    }

    // Measure execution time of a function
    async measure(name, fn) {
        const start = performance.now();
        try {
            const result = await fn();
            const duration = performance.now() - start;
            this.recordMetric(name, duration);
            return result;
        } catch (error) {
            const duration = performance.now() - start;
            this.recordMetric(`${name}_error`, duration);
            throw error;
        }
    }

    // Record a performance metric
    recordMetric(name, value) {
        if (!this.metrics.has(name)) {
            this.metrics.set(name, []);
        }
        this.metrics.get(name).push({
            value,
            timestamp: Date.now()
        });
    }

    // Get metrics for a specific operation
    getMetrics(name) {
        return this.metrics.get(name) || [];
    }

    // Get average execution time
    getAverageMetric(name) {
        const metrics = this.getMetrics(name);
        if (metrics.length === 0) return 0;
        const sum = metrics.reduce((acc, m) => acc + m.value, 0);
        return sum / metrics.length;
    }

    // Debounce function execution
    debounce(func, wait) {
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

    // Throttle function execution
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Optimize scroll events
    optimizeScroll(element, callback, options = {}) {
        const {
            throttleMs = 100,
            passive = true
        } = options;

        const throttledCallback = this.throttle(callback, throttleMs);

        element.addEventListener('scroll', throttledCallback, { passive });

        // Return cleanup function
        return () => {
            element.removeEventListener('scroll', throttledCallback);
        };
    }

    // Optimize resize events
    optimizeResize(callback, options = {}) {
        const {
            debounceMs = 200
        } = options;

        const debouncedCallback = this.debounce(callback, debounceMs);

        window.addEventListener('resize', debouncedCallback);

        // Return cleanup function
        return () => {
            window.removeEventListener('resize', debouncedCallback);
        };
    }

    // Implement virtual scrolling for long lists
    createVirtualScroll(container, itemHeight, renderItem) {
        const state = {
            scrollTop: 0,
            viewportHeight: container.clientHeight,
            totalItems: 0,
            visibleStart: 0,
            visibleEnd: 0
        };

        const updateVisibleRange = () => {
            state.visibleStart = Math.floor(state.scrollTop / itemHeight);
            state.visibleEnd = Math.ceil((state.scrollTop + state.viewportHeight) / itemHeight);
        };

        const render = () => {
            updateVisibleRange();
            const fragment = document.createDocumentFragment();

            for (let i = state.visibleStart; i <= state.visibleEnd; i++) {
                if (i >= 0 && i < state.totalItems) {
                    const item = renderItem(i, i * itemHeight);
                    fragment.appendChild(item);
                }
            }

            container.innerHTML = '';
            container.appendChild(fragment);
        };

        const handleScroll = this.throttle(() => {
            state.scrollTop = container.scrollTop;
            render();
        }, 16); // ~60fps

        container.addEventListener('scroll', handleScroll, { passive: true });

        return {
            setTotalItems: (count) => {
                state.totalItems = count;
                container.style.height = `${count * itemHeight}px`;
                render();
            },
            update: () => render(),
            destroy: () => {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }

    // Cache expensive computations
    createCache(ttl = 5000) {
        const cache = new Map();

        return {
            get: (key) => {
                const entry = cache.get(key);
                if (!entry) return null;

                if (Date.now() - entry.timestamp > ttl) {
                    cache.delete(key);
                    return null;
                }

                return entry.value;
            },
            set: (key, value) => {
                cache.set(key, {
                    value,
                    timestamp: Date.now()
                });
            },
            clear: () => cache.clear()
        };
    }

    // Optimize image loading
    optimizeImages(container) {
        const images = container.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => imageObserver.observe(img));

        // Return cleanup function
        return () => imageObserver.disconnect();
    }

    // Batch DOM updates
    batchUpdates(updates) {
        requestAnimationFrame(() => {
            updates.forEach(update => update());
        });
    }

    // Get performance report
    getPerformanceReport() {
        const report = {
            timestamp: Date.now(),
            metrics: {}
        };

        for (const [name, values] of this.metrics.entries()) {
            const avg = this.getAverageMetric(name);
            const min = Math.min(...values.map(v => v.value));
            const max = Math.max(...values.map(v => v.value));

            report.metrics[name] = {
                average: avg,
                min,
                max,
                count: values.length
            };
        }

        return report;
    }

    // Clear all metrics
    clearMetrics() {
        this.metrics.clear();
    }
}

// Create global instance
const performanceOptimizer = new PerformanceOptimizer();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = performanceOptimizer;
} else {
    window.performanceOptimizer = performanceOptimizer;
}
