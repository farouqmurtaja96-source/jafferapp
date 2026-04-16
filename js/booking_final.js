// ==================== BOOKING SYSTEM ====================

// State
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;
let selectedMonth = new Date();

// Make selected variables globally accessible
window.selectedDate = selectedDate;
window.selectedTime = selectedTime;
let bookings = []; // Will be loaded from localStorage

// Use bookingSettings from interactions.js if available
let bookingSettings = window.bookingSettings || {
    timezone: "",
    slotMinutes: 50, // Duration of each lesson
    breakMinutes: 10, // Break between lessons
    totalSlotMinutes: 60, // Total time per slot (50 min lesson + 10 min break)
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

// Expose bookingSettings globally
window.bookingSettings = bookingSettings;

// Override getSelectedBooking to use weekly calendar
window.getSelectedBooking = function() {
    // Check if weekly calendar is available
    if (typeof window.getSelectedSlot === 'function') {
        const slot = window.getSelectedSlot();
        if (slot) {
            return {
                date: slot.toISOString(),
                time: slot.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
            };
        }
    }
    
    // Fallback to old system
    if (!selectedDate || !selectedTime) return null;
    return {
        date: formatDate(selectedDate),
        time: selectedTime
    };
};

// Constants
const MONTHS_EN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Initialize
async function initBookingSystem() {
    await loadBookings();
    renderCalendar();
    setupEventListeners();
}

// Load bookings from localStorage
async function loadBookings() {
    try {
        const stored = localStorage.getItem('pal_arabic_bookings');
        if (stored) {
            bookings = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading bookings:', e);
        bookings = [];
    }

    // Load booking settings from localStorage
    try {
        const stored = localStorage.getItem('pal_arabic_booking_settings');
        if (stored) {
            bookingSettings = { ...bookingSettings, ...JSON.parse(stored) };
        }
    } catch (e) {
        console.error('Error loading booking settings:', e);
    }
    
    // Load booking settings from Firebase if available
    try {
        if (window.db && typeof window.db.collection === 'function') {
            const ref = window.db.collection("bookingSettings").doc("primary");
            const snap = await ref.get();
            if (snap.exists) {
                bookingSettings = { ...bookingSettings, ...snap.data() };
                window.bookingSettings = bookingSettings;
                console.log("Booking settings loaded from Firebase:", bookingSettings);
            }
        }
    } catch (e) {
        console.error("Error loading booking settings from Firebase:", e);
    }
}

// Save bookings to localStorage
function saveBookings() {
    try {
        localStorage.setItem('pal_arabic_bookings', JSON.stringify(bookings));
    } catch (e) {
        console.error('Error saving bookings:', e);
    }
}

// Helper function to convert time string to minutes
function toMinutes(timeStr) {
    if (!timeStr || !timeStr.includes(":")) return null;
    const [h, m] = timeStr.split(":").map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return h * 60 + m;
}

// Helper function to get date key
function getDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

// Check if slot is blocked by exception
function isSlotBlockedByException(slotStartMs, slotMinutes) {
    if (!Array.isArray(bookingSettings.exceptions)) return false;
    const slotStart = new Date(slotStartMs);
    const dateKey = getDateKey(slotStart);
    const slotStartMin = slotStart.getHours() * 60 + slotStart.getMinutes();
    const slotEndMin = slotStartMin + slotMinutes;
    return bookingSettings.exceptions.some((ex) => {
        if (!ex || ex.date !== dateKey) return false;
        const exStart = toMinutes(ex.start);
        const exEnd = toMinutes(ex.end);
        if (exStart === null || exEnd === null) return false;
        if (exEnd <= exStart) return false;
        return slotStartMin < exEnd && slotEndMin > exStart;
    });
}

// Check if a slot is available
async function isSlotAvailable(date, time) {
    const dateStr = formatDate(date);

    // Check localStorage bookings
    const localBooking = bookings.find(b =>
        b.date === dateStr && b.time === time
    );
    if (localBooking) return false;

    // Check Firebase bookings
    try {
        const slotDate = new Date(`${dateStr}T${time}:00`);
        const slotTime = slotDate.getTime();
        console.log("Checking Firebase bookings for slot:", slotTime);
        const snap = await db.collection("bookings").where("slot", "==", slotTime).get();
        if (!snap.empty) {
            const booked = snap.docs.find(doc => {
                const data = doc.data();
                const status = data.status || "booked";
                return status !== "canceled";
            });
            if (booked) {
                console.log("Slot is already booked in Firebase");
                return false;
            }
        }
        console.log("Slot is available in Firebase");
    } catch (err) {
        console.error("Error checking Firebase bookings:", err);
        // Don't block the slot if Firebase check fails
    }

    // Check exceptions (busy blocks)
    try {
        const slotDate = new Date(`${dateStr}T${time}:00`);
        const slotStartMs = slotDate.getTime();
        const totalSlotMinutes = bookingSettings.totalSlotMinutes || 60; // Use total slot duration (50 min lesson + 10 min break)

        const blocked = isSlotBlockedByException(slotStartMs, totalSlotMinutes);
        if (blocked) return false;
    } catch (err) {
        console.error("Error checking exceptions:", err);
    }

    // Check Google Calendar availability
    try {
        if (typeof isSlotAvailableInGoogleCalendar === 'function') {
            const googleAvailable = await isSlotAvailableInGoogleCalendar(date, time);
            if (!googleAvailable) {
                console.log(`Slot ${dateStr} at ${time} is busy in Google Calendar`);
                return false;
            }
        }
    } catch (err) {
        console.error("Error checking Google Calendar:", err);
        // Don't block the slot if Google Calendar check fails
    }

    return true;
}

// Format date as YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Generate availability grid for each day
function generateAvailabilityGrid() {
    const grid = {};
    const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

    days.forEach(day => {
        grid[day] = {
            '09:00-10:00': true,
            '10:00-11:00': true,
            '11:00-12:00': true,
            '12:00-13:00': true,
            '13:00-14:00': true,
            '14:00-15:00': true,
            '15:00-16:00': true,
            '16:00-17:00': true,
            '17:00-18:00': true,
            '18:00-19:00': true,
            '19:00-20:00': true
        };
    });

    return grid;
}

// Render calendar
function renderCalendar() {
    const container = document.getElementById('calendarGrid');
    if (!container) return;

    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();

    // Update month title
    document.getElementById('currentMonth').textContent =
        `${MONTHS_EN[month]} ${year}`;

    // Get first day of month and total days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Clear and rebuild calendar
    container.innerHTML = '';

    // Add empty cells for days before first day
    for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day disabled';
        cell.textContent = '';
        container.appendChild(cell);
    }

    // Add days of month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.textContent = day;

        const cellDate = new Date(year, month, day);

        // Check if this is today
        if (cellDate.toDateString() === today.toDateString()) {
            cell.classList.add('today');
        }

        // Check if this date is selected
        if (selectedDate && cellDate.toDateString() === selectedDate.toDateString()) {
            cell.classList.add('selected');
        }

        // Check if this date has bookings
        const dateStr = formatDate(cellDate);
        const hasBookings = bookings.some(b => b.date === dateStr);

        if (hasBookings) {
            // Show some visual indicator
            cell.style.borderColor = 'var(--danger)';
        }

        cell.addEventListener('click', () => {
            selectDate(cellDate);
        });

        container.appendChild(cell);
    }

    // Add empty cells for remaining days
    const totalCells = firstDay + daysInMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day disabled';
        cell.textContent = '';
        container.appendChild(cell);
    }
}

// Select a date
function selectDate(date) {
    selectedDate = date;
    selectedTime = null;
    window.selectedDate = date;
    window.selectedTime = null;
    renderCalendar();
    renderTimeSlots(date);
}

// Render available time slots for selected date
async function renderTimeSlots(date) {
    const container = document.getElementById('timeSlotsContainer');
    const grid = document.getElementById('slotsGrid');

    if (!container || !grid) return;

    container.style.display = 'block';
    grid.innerHTML = '';

    // Get day name from date
    let dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    
    // Map different day name formats to our standard format
    const dayNameMap = {
        'Mon': 'Mon', 'Tue': 'Tue', 'Wed': 'Wed', 'Thu': 'Thu',
        'Fri': 'Fri', 'Sat': 'Sat', 'Sun': 'Sun',
        'Monday': 'Mon', 'Tuesday': 'Tue', 'Wednesday': 'Wed',
        'Thursday': 'Thu', 'Friday': 'Fri', 'Saturday': 'Sat',
        'Sunday': 'Sun'
    };
    
    dayName = dayNameMap[dayName] || dayName;
    const dayInfo = bookingSettings.days[dayName];
    
    console.log("Selected date:", date);
    console.log("Day name:", dayName);
    console.log("Day info:", dayInfo);
    
    // Check if this day is enabled
    if (!dayInfo || !dayInfo.enabled) {
        grid.innerHTML = '<div class="small-note">No availability for this day.</div>';
        return;
    }
    
    // Generate time slots based on settings (50 min lesson + 10 min break)
    const [startHour, startMin] = dayInfo.start.split(":").map(Number);
    let [endHour, endMin] = dayInfo.end.split(":").map(Number);
    const totalSlotMinutes = bookingSettings.totalSlotMinutes || 60; // 50 min lesson + 10 min break
    
    // Handle case where end time is 00:00 (midnight)
    let isNextDay = false;
    if (endHour === 0 && endMin === 0) {
        endHour = 24;
        endMin = 0;
    }
    
    let timeSlots = [];
    let currentHour = startHour;
    let currentMin = startMin;
    
    while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
        const timeStr = String(currentHour).padStart(2, '0') + ':' + String(currentMin).padStart(2, '0');
        timeSlots.push(timeStr);
        
        // Move to next slot (60 minutes = 50 min lesson + 10 min break)
        currentMin += totalSlotMinutes;
        while (currentMin >= 60) {
            currentMin -= 60;
            currentHour++;
        }
    }
    
    const dateStr = formatDate(date);
    for (const time of timeSlots) {
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.textContent = time;

        if (selectedTime === time) {
            slot.classList.add('selected');
        }

        const available = await isSlotAvailable(date, time);
        if (!available) {
            slot.classList.add('disabled');
        }

        slot.addEventListener('click', async () => {
            if (!slot.classList.contains('disabled')) {
                selectTime(time);
            }
        });

        grid.appendChild(slot);
    }
}

// Select a time slot
function selectTime(time) {
    selectedTime = time;
    window.selectedTime = time;
    renderTimeSlots(selectedDate);
    
    // Enable booking submit button
    const bookingSubmit = document.getElementById("bookingSubmit");
    if (bookingSubmit) {
        bookingSubmit.disabled = false;
    }
}

// Initialize booking system
async function initializeBookingSystem() {
    console.log("Initializing booking system...");
    await loadBookings();
    renderCalendar();
    setupEventListeners();
    console.log("Booking system initialized");
}

// Setup event listeners
function setupEventListeners() {
    // Previous month button
    document.getElementById('prevMonth')?.addEventListener('click', () => {
        selectedMonth.setMonth(selectedMonth.getMonth() - 1);
        renderCalendar();
    });

    // Next month button
    document.getElementById('nextMonth')?.addEventListener('click', () => {
        selectedMonth.setMonth(selectedMonth.getMonth() + 1);
        renderCalendar();
    });
}

// Export for use in main app
window.initBookingSystem = initBookingSystem;
window.getSelectedBooking = () => {
    if (!selectedDate || !selectedTime) return null;
    return {
        date: formatDate(selectedDate),
        time: selectedTime
    };
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeBookingSystem());
} else {
    initializeBookingSystem();
}
