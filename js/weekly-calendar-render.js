// Weekly Calendar Render Module - Horizontal Days Layout
// Displays days horizontally with time slots vertically (Google Calendar style)

// Time slots configuration (30-minute intervals)
const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
];

// Days of the week
const daysInArabic = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
const daysInArabicShort = ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'];

// Render the weekly calendar - Horizontal Days Layout
async function renderWeeklyCalendarHorizontal() {
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

    // Get today's date for highlighting
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create main container
    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'weekly-calendar-container';

    // Create header row with days
    const headerRow = document.createElement('div');
    headerRow.className = 'weekly-calendar-header-row';

    // Empty cell for time column
    const emptyHeaderCell = document.createElement('div');
    emptyHeaderCell.className = 'weekly-calendar-day-header';
    emptyHeaderCell.textContent = 'الوقت';
    headerRow.appendChild(emptyHeaderCell);

    // Add day headers
    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(currentWeekStart);
        dayDate.setDate(dayDate.getDate() + i);

        const dayHeader = document.createElement('div');
        dayHeader.className = 'weekly-calendar-day-header';

        // Check if this is today
        const isToday = dayDate.toDateString() === today.toDateString();
        if (isToday) {
            dayHeader.classList.add('current-day');
        }

        const dayName = document.createElement('div');
        dayName.className = 'weekly-calendar-day-name';
        dayName.textContent = daysInArabicShort[i];

        const dayDateText = document.createElement('div');
        dayDateText.className = 'weekly-calendar-day-date';
        dayDateText.textContent = `${dayDate.getDate()}/${dayDate.getMonth() + 1}`;

        dayHeader.appendChild(dayName);
        dayHeader.appendChild(dayDateText);
        headerRow.appendChild(dayHeader);
    }

    calendarContainer.appendChild(headerRow);

    // Create time rows with slots
    TIME_SLOTS.forEach(time => {
        const [hour, minute] = time.split(':').map(Number);

        // Create time row
        const timeRow = document.createElement('div');
        timeRow.style.display = 'flex';
        timeRow.style.flexDirection = 'row';

        // Add time cell
        const timeCell = document.createElement('div');
        timeCell.className = 'weekly-calendar-time-cell';
        timeCell.textContent = time;
        timeRow.appendChild(timeCell);

        // Add slot cells for each day
        for (let i = 0; i < 7; i++) {
            const dayDate = new Date(currentWeekStart);
            dayDate.setDate(dayDate.getDate() + i);
            dayDate.setHours(hour, minute, 0, 0);

            const slotKey = getSlotKey(dayDate);
            const isAvailable = availableSlots.includes(slotKey);
            const isBusy = busySlots.includes(slotKey);
            const isToday = dayDate.toDateString() === today.toDateString();

            const cell = document.createElement('div');
            cell.className = 'weekly-calendar-slot-cell';

            if (isToday) {
                cell.classList.add('today');
            }

            if (isBusy) {
                cell.classList.add('busy');
                cell.title = 'محجوز';
            } else if (isAvailable) {
                cell.classList.add('available');
                cell.title = `متاح - ${time}`;
                cell.addEventListener('click', () => selectSlot(dayDate, cell));
            } else {
                cell.classList.add('unavailable');
                cell.title = 'غير متاح';
            }

            timeRow.appendChild(cell);
        }

        calendarContainer.appendChild(timeRow);
    });

    grid.appendChild(calendarContainer);
}

// Export function to global scope
window.renderWeeklyCalendarHorizontal = renderWeeklyCalendarHorizontal;
