function defaultDays() {
    return {
        Mon: { enabled: true, start: "09:00", end: "17:00" },
        Tue: { enabled: true, start: "09:00", end: "17:00" },
        Wed: { enabled: true, start: "09:00", end: "17:00" },
        Thu: { enabled: true, start: "09:00", end: "17:00" },
        Fri: { enabled: true, start: "09:00", end: "17:00" },
        Sat: { enabled: false, start: "10:00", end: "14:00" },
        Sun: { enabled: false, start: "10:00", end: "14:00" },
    };
}

export function createInitialBookingSettings() {
    return {
        timezone: "",
        slotMinutes: 50,
        breakMinutes: 10,
        totalSlotMinutes: 60,
        days: defaultDays(),
        exceptions: [],
    };
}

export function getDefaultBookingSettings(timezoneHint = "Africa/Cairo") {
    return {
        timezone: timezoneHint,
        slotMinutes: 50,
        breakMinutes: 10,
        totalSlotMinutes: 60,
        days: defaultDays(),
        exceptions: [],
    };
}

export function ensureBookingSettingsShape(settings) {
    const base = createInitialBookingSettings();
    const next = { ...base, ...(settings || {}) };
    const days = defaultDays();
    next.days = { ...days, ...(next.days || {}) };
    Object.keys(days).forEach((day) => {
        next.days[day] = { ...days[day], ...(next.days[day] || {}) };
    });
    if (!Array.isArray(next.exceptions)) next.exceptions = [];
    if (!next.slotMinutes) next.slotMinutes = 50;
    if (!next.breakMinutes) next.breakMinutes = 10;
    if (!next.totalSlotMinutes) next.totalSlotMinutes = next.slotMinutes + next.breakMinutes;
    if (typeof next.timezone !== "string") next.timezone = "";
    return next;
}

export function loadBookingSettings(storageKey, currentSettings) {
    try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
            return ensureBookingSettingsShape({ ...currentSettings, ...JSON.parse(raw) });
        }
    } catch {}
    return ensureBookingSettingsShape(currentSettings);
}

export function saveBookingSettings(storageKey, settings) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch {}
}

export async function loadBookingSettingsFromCloud(db, currentSettings) {
    try {
        const ref = db.collection("bookingSettings").doc("primary");
        const snap = await ref.get();
        if (snap.exists) {
            return ensureBookingSettingsShape({ ...currentSettings, ...snap.data() });
        }
    } catch {}
    return ensureBookingSettingsShape(currentSettings);
}

export async function saveBookingSettingsToCloud(db, settings) {
    try {
        const ref = db.collection("bookingSettings").doc("primary");
        await ref.set(settings, { merge: true });
    } catch {}
}
