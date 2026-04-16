// Student Manager Module
// Handles all student-related operations

import * as CONST from '../core/constants.js';

// Re-create constant names
const LS_STUDENTS_KEY = CONST.LS_STUDENTS_KEY;
const LS_LESSON_PREFIX = CONST.LS_LESSON_PREFIX;

class StudentManager {
    constructor() {
        this.students = [];
        this.currentStudentId = null;
    }

    // Load students from localStorage
    loadFromStorage() {
        try {
            const raw = localStorage.getItem(LS_STUDENTS_KEY);
            if (raw) {
                this.students = JSON.parse(raw);
            } else {
                this.students = [];
            }
        } catch (error) {
            console.error('Error loading students:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Load Students');
            }
            this.students = [];
        }
        return this.students;
    }

    // Save students to localStorage
    saveToStorage() {
        try {
            localStorage.setItem(LS_STUDENTS_KEY, JSON.stringify(this.students));
        } catch (error) {
            console.error('Error saving students:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Save Students');
            }
            throw error;
        }
    }

    // Add new student
    addStudent(studentData) {
        try {
            const newStudent = {
                id: this.generateId(),
                name: studentData.name || '',
                goals: studentData.goals || [],
                level: studentData.level || 'Beginner',
                createdAt: new Date().toISOString(),
                progress: this.createProgressTemplate()
            };

            this.students.push(newStudent);
            this.saveToStorage();

            return newStudent;
        } catch (error) {
            console.error('Error adding student:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Add Student');
            }
            throw error;
        }
    }

    // Update existing student
    updateStudent(studentId, updates) {
        try {
            const index = this.students.findIndex(s => s.id === studentId);
            if (index === -1) {
                throw new Error('Student not found');
            }

            this.students[index] = {
                ...this.students[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };

            this.saveToStorage();
            return this.students[index];
        } catch (error) {
            console.error('Error updating student:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Update Student');
            }
            throw error;
        }
    }

    // Delete student
    deleteStudent(studentId) {
        try {
            const index = this.students.findIndex(s => s.id === studentId);
            if (index === -1) {
                throw new Error('Student not found');
            }

            // Remove student progress data
            this.removeStudentProgress(studentId);

            // Remove student from list
            this.students.splice(index, 1);
            this.saveToStorage();

            // If this was the current student, clear it
            if (this.currentStudentId === studentId) {
                this.currentStudentId = null;
            }
        } catch (error) {
            console.error('Error deleting student:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Delete Student');
            }
            throw error;
        }
    }

    // Get student by ID
    getStudent(studentId) {
        return this.students.find(s => s.id === studentId) || null;
    }

    // Get current student
    getCurrentStudent() {
        if (!this.currentStudentId) {
            return null;
        }
        return this.getStudent(this.currentStudentId);
    }

    // Set current student
    setCurrentStudent(studentId) {
        this.currentStudentId = studentId;
    }

    // Get all students
    getAllStudents() {
        return [...this.students];
    }

    // Load student progress
    loadStudentProgress(studentId) {
        try {
            const key = `${LS_LESSON_PREFIX}_${studentId}`;
            const raw = localStorage.getItem(key);
            if (raw) {
                return JSON.parse(raw);
            }
            return this.createProgressTemplate();
        } catch (error) {
            console.error('Error loading student progress:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Load Student Progress');
            }
            return this.createProgressTemplate();
        }
    }

    // Save student progress
    saveStudentProgress(studentId, progress) {
        try {
            const key = `${LS_LESSON_PREFIX}_${studentId}`;
            localStorage.setItem(key, JSON.stringify(progress));
        } catch (error) {
            console.error('Error saving student progress:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Save Student Progress');
            }
            throw error;
        }
    }

    // Remove student progress
    removeStudentProgress(studentId) {
        try {
            const key = `${LS_LESSON_PREFIX}_${studentId}`;
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing student progress:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Remove Student Progress');
            }
        }
    }

    // Create progress template
    createProgressTemplate() {
        return {
            completedLessons: [],
            vocabulary: {},
            practice: {},
            homework: {},
            lastAccessed: null
        };
    }

    // Generate unique ID
    generateId() {
        return `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Save students to cloud
    async saveToCloud() {
        try {
            if (!window.db) {
                throw new Error('Firebase not initialized');
            }

            const user = window.auth?.currentUser;
            if (!user) {
                throw new Error('No authenticated user');
            }

            await window.db.collection('teachers').doc(user.uid).update({
                students: this.students
            });
        } catch (error) {
            console.error('Error saving students to cloud:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Save Students to Cloud');
            }
            throw error;
        }
    }

    // Load students from cloud
    async loadFromCloud() {
        try {
            if (!window.db) {
                throw new Error('Firebase not initialized');
            }

            const user = window.auth?.currentUser;
            if (!user) {
                throw new Error('No authenticated user');
            }

            const doc = await window.db.collection('teachers').doc(user.uid).get();
            if (doc.exists && doc.data().students) {
                this.students = doc.data().students;
                this.saveToStorage();
            }
        } catch (error) {
            console.error('Error loading students from cloud:', error);
            if (window.errorHandler) {
                window.errorHandler.handleError(error, 'Load Students from Cloud');
            }
            throw error;
        }
    }
}

// Create and export singleton instance
const studentManager = new StudentManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = studentManager;
} else {
    window.studentManager = studentManager;
}
