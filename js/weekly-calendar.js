// Weekly Calendar Implementation
// Displays available time slots in a weekly view similar to Google Calendar and Preply
// Shows days and dates vertically, with time slots horizontally

let currentWeekStart = null;
let selectedSlot = null;
let availableSlots = [];
let busySlots = [];

// Days of the week (starting from Saturday as per Arabic calendar)
const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const daysInArabic = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
const daysInArabicShort = ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];

// Time slots configuration (30-minute intervals)
const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
];

// Initialize weekly calendar
function initWeeklyCalendar() {
    console.log('Initializing weekly calendar...');

    // Set current week start (Saturday)
    const today = new Date();
    currentWeekStart = getSaturdayOfWeek(today);

    // Render the calendar
    renderWeeklyCalendar();

    // Add event listeners
    document.getElementById('prevWeek')?.addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        renderWeeklyCalendar();
    });

    document.getElementById('nextWeek')?.addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        renderWeeklyCalendar();
    });
}

// Get Saturday of the week for a given date
function getSaturdayOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 6); // Adjust when day is Sunday
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

// Format date for display
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format time for display
function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Render the weekly calendar
async function renderWeeklyCalendar() {
    const grid = document.getElementById('weeklyCalendarGrid');
    const currentWeekDisplay = document.getElementById('currentWeek');

    if (!grid) return;

    // Update week display
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    currentWeekDisplay.textContent = `${formatDate(currentWeekStart)} - ${formatDate(weekEnd)}`;

    // Clear existing content
    grid.innerHTML = '';

    // Load teacher's availability and busy slots
    await loadAvailabilityAndBusySlots();

    // Get teacher's working hours
    const workingHours = getWorkingHours();

    // Create day rows for each day of the week (Preply-style)
    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(currentWeekStart);
        dayDate.setDate(dayDate.getDate() + i);

        // Create day row container
        const dayRow = document.createElement('div');
        dayRow.className = 'weekly-calendar-day-row';

        // Create day header
        const dayHeader = document.createElement('div');
        dayHeader.className = 'weekly-calendar-day-header';
        
        const dayName = document.createElement('div');
        dayName.className = 'weekly-calendar-day-name';
        dayName.textContent = daysInArabic[i];
        
        const dayDateText = document.createElement('div');
        dayDateText.className = 'weekly-calendar-day-date';
        dayDateText.textContent = `${dayDate.getDate()}/${dayDate.getMonth() + 1}`;
        
        dayHeader.appendChild(dayName);
        dayHeader.appendChild(dayDateText);
        dayRow.appendChild(dayHeader);

        // Create slots container for this day
        const daySlots = document.createElement('div');
        daySlots.className = 'weekly-calendar-day-slots';

        // Add time slots for this day
        for (let hour = workingHours.start; hour < workingHours.end; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const slotDate = new Date(dayDate);
                slotDate.setHours(hour, minute, 0, 0);

                const slotKey = getSlotKey(slotDate);
                const isAvailable = availableSlots.includes(slotKey);
                const isBusy = busySlots.includes(slotKey);

                const cell = document.createElement('div');
                cell.className = 'weekly-calendar-cell';

                if (isBusy) {
                    cell.classList.add('busy');
                    cell.textContent = '';
                } else if (isAvailable) {
                    cell.classList.add('available');
                    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                    cell.textContent = timeStr;
                    cell.addEventListener('click', () => selectSlot(slotDate, cell));
                } else {
                    cell.classList.add('busy');
                    cell.textContent = '';
                }

                daySlots.appendChild(cell);
            }
        }

        dayRow.appendChild(daySlots);
        grid.appendChild(dayRow);
    }

    // Time slots are already created above in the day rows
}

// Get teacher's working hours from settings
function getWorkingHours() {
    // Default working hours (can be customized from Firebase)
    return {
        start: 9,  // 9 AM
        end: 21    // 9 PM
    };
}

// Load availability and busy slots from Firebase
async function loadAvailabilityAndBusySlots() {
    try {
        // Get teacher's settings
        const teachersSnap = await firebase.firestore().collection('teachers').limit(1).get();

        if (teachersSnap.empty) {
            console.log('No teachers found');
            return;
        }

        const teacherDoc = teachersSnap.docs[0];
        const teacherData = teacherDoc.data();
        const settings = teacherData.settings || {};
        const busyBlocks = settings.busyBlocks || {};

        // Load specific dates (busy slots)
        const specificDates = busyBlocks.specificDates || [];
        busySlots = specificDates.map(block => {
            const date = new Date(block.date);
            const [hours, minutes] = block.time.split(':');
            date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            return getSlotKey(date);
        });

        // Load recurring busy blocks
        const recurring = busyBlocks.recurring || [];
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);

        for (const block of recurring) {
            const blockDate = new Date(currentWeekStart);
            const dayIndex = daysOfWeek.indexOf(block.day);
            if (dayIndex === -1) continue;

            const [hours, minutes] = block.time.split(':');

            // Add this recurring block for each occurrence in the week
            for (let d = 0; d < 7; d++) {
                const currentDate = new Date(currentWeekStart);
                currentDate.setDate(currentDate.getDate() + d);

                if (currentDate.getDay() === dayIndex) {
                    currentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                    busySlots.push(getSlotKey(currentDate));
                }
            }
        }

        // Load available slots (inverse of busy slots within working hours)
        const workingHours = getWorkingHours();
        availableSlots = [];

        for (let d = 0; d < 7; d++) {
            const dayDate = new Date(currentWeekStart);
            dayDate.setDate(dayDate.getDate() + d);

            for (let hour = workingHours.start; hour < workingHours.end; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                    dayDate.setHours(hour, minute, 0, 0);
                    const slotKey = getSlotKey(dayDate);

                    if (!busySlots.includes(slotKey)) {
                        availableSlots.push(slotKey);
                    }
                }
            }
        }

        console.log('Loaded', availableSlots.length, 'available slots and', busySlots.length, 'busy slots');
    } catch (error) {
        console.error('Error loading availability and busy slots:', error);
    }
}

// Get unique key for a time slot
function getSlotKey(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}`;
}

// Select a time slot
function selectSlot(date, cell) {
    // Remove previous selection
    document.querySelectorAll('.weekly-calendar-cell.selected').forEach(el => {
        el.classList.remove('selected');
    });

    // Add selection to current cell
    cell.classList.add('selected');

    // Store selected slot
    selectedSlot = date;

    // Update booking info display
    const bookingInfo = document.getElementById('bookingInfo');
    const selectedTimeDisplay = document.getElementById('selectedTimeDisplay');

    if (bookingInfo && selectedTimeDisplay) {
        bookingInfo.style.display = 'block';
        selectedTimeDisplay.textContent = `${daysInArabic[date.getDay()]} ${formatTime(date)}`;
    }

    // Enable booking form submit button
    const bookingSubmit = document.getElementById('bookingSubmit');
    if (bookingSubmit) {
        bookingSubmit.disabled = false;
    }

    console.log('Selected slot:', date);
}

// Calculate busy slots after booking (50 minutes lesson + 10 minutes break)
function calculateBusySlotsAfterBooking(bookedDate) {
    const busySlots = [];
    const workingHours = getWorkingHours();
    const lessonDuration = 50; // 50 minutes lesson
    const breakDuration = 10;  // 10 minutes break
    const totalDuration = lessonDuration + breakDuration; // 60 minutes total

    // Calculate end time (start + 60 minutes)
    const endDate = new Date(bookedDate);
    endDate.setMinutes(endDate.getMinutes() + totalDuration);

    // Mark all slots between start and end as busy
    const currentDate = new Date(bookedDate);
    while (currentDate < endDate) {
        const slotKey = getSlotKey(currentDate);
        busySlots.push(slotKey);
        
        // Move to next 30-minute slot
        currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    return busySlots;
}

// Mark slots as busy after booking
function markSlotsAsBusy(bookedDate) {
    const newBusySlots = calculateBusySlotsAfterBooking(bookedDate);
    
    // Add to global busy slots array
    newBusySlots.forEach(slotKey => {
        if (!busySlots.includes(slotKey)) {
            busySlots.push(slotKey);
        }
    });

    // Remove from available slots
    newBusySlots.forEach(slotKey => {
        const index = availableSlots.indexOf(slotKey);
        if (index > -1) {
            availableSlots.splice(index, 1);
        }
    });

    // Re-render calendar to show updated availability
    renderWeeklyCalendar();
}

// Get selected slot
function getSelectedSlot() {
    return selectedSlot;
}

// Export functions to global scope
window.initWeeklyCalendar = initWeeklyCalendar;
window.getSelectedSlot = getSelectedSlot;
window.calculateBusySlotsAfterBooking = calculateBusySlotsAfterBooking;
window.markSlotsAsBusy = markSlotsAsBusy;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initWeeklyCalendar();
});
