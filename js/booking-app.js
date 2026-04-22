import {
    createInitialBookingSettings,
    ensureBookingSettingsShape,
    getDefaultBookingSettings,
    loadBookingSettingsFromCloud,
    saveBookingSettingsToCloud,
} from "./logic/bookingSettingsStore.js";
import {
    createInitialContactSettings,
    loadContactSettingsFromCloud,
    saveContactSettingsToCloud,
    buildWhatsAppUrl,
} from "./logic/contactSettingsStore.js";
import {
    loadBookingStatusByEmail,
    submitGuestBooking,
} from "./logic/guestBookingFlow.js";
import {
    renderTeacherBookings,
    openReschedulePanel,
    cancelBooking,
    rescheduleBooking,
    clearAllBookings,
} from "./logic/teacherBookingAdmin.js";
import {
    bootstrapTeacherAccess,
    resolveUserRole,
} from "./logic/authFlows.js";
import {
    getSchedulableSlots,
    getAvailableSlots,
    findBookingConflict,
} from "./logic/bookingAvailability.js";

const DAY_KEYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEFAULT_TIMEZONE = "Africa/Cairo";
const GOOGLE_BUSY_REFRESH_MS = 60000;
const STUDENT_CHANGE_CUTOFF_MS = 12 * 60 * 60 * 1000;

const state = {
    bookingSettings: ensureBookingSettingsShape(createInitialBookingSettings()),
    contactSettings: createInitialContactSettings(),
    runtimeBusyBlocks: [],
    selectedSlotMs: null,
    selectedDateKey: "",
    visibleDateKey: "",
    bookingWeekOffset: 0,
    currentUser: null,
    currentRole: "",
    studentProfile: null,
    studentAuthMode: "login",
    teacherUser: null,
    teacherRole: "",
    bookingCache: new Map(),
    googleCalendarMessage: "",
    busyRefreshTimer: null,
    busyRefreshInFlight: null,
    busySyncReady: false,
    busySyncMessage: "",
};

const els = {};

function qs(id) {
    return document.getElementById(id);
}

function cacheDom() {
    [
        "bookingTimezoneLabel",
        "bookingWeekPrev",
        "bookingWeekNext",
        "bookingWeekLabel",
        "bookingWeeklyGrid",
        "bookingEmptyState",
        "bookingInfo",
        "selectedTimeDisplay",
        "bookingForm",
        "bookingAccountSummary",
        "bookingWebsite",
        "bookingSubmit",
        "bookingMsg",
        "studentAuthModal",
        "studentAuthForm",
        "studentAuthHint",
        "studentAuthBadge",
        "studentLoginModeBtn",
        "studentSignupModeBtn",
        "studentNameField",
        "studentName",
        "studentPhoneField",
        "studentPhoneCountry",
        "studentPhone",
        "studentEmail",
        "studentPassword",
        "studentAuthSubmit",
        "studentLogoutBtn",
        "studentAuthMsg",
        "bookingStatusEmail",
        "bookingStatusBtn",
        "bookingStatusList",
        "bookingStatusMsg",
        "contactWhatsAppBtn",
        "contactEmailBtn",
        "bookingSuccessModal",
        "bookingSuccessText",
        "openStudentGateBtn",
        "openTeacherGateBtn",
        "openTeacherLoginBtn",
        "teacherLoginModal",
        "teacherLoginForm",
        "teacherEmail",
        "teacherPassword",
        "teacherLoginSubmit",
        "teacherLoginMsg",
        "teacherLogoutBtn",
        "teacherAuthBadge",
        "teacherAuthMsg",
        "teacherDashboard",
        "teacherTimezone",
        "teacherSlotMinutes",
        "teacherBreakMinutes",
        "teacherDaysGrid",
        "availabilityForm",
        "availabilityMsg",
        "teacherResetAvailabilityBtn",
        "contactSettingsForm",
        "teacherWhatsapp",
        "teacherContactEmail",
        "contactMsg",
        "appsScriptForm",
        "teacherAppsScriptUrl",
        "appsScriptMsg",
        "appsScriptTestBtn",
        "appsScriptRefreshBusyBtn",
        "exceptionForm",
        "exceptionDate",
        "exceptionStart",
        "exceptionEnd",
        "exceptionNote",
        "exceptionToggle",
        "exceptionBody",
        "exceptionList",
        "exceptionMsg",
        "clearExceptionsBtn",
        "teacherBookingMsg",
        "teacherBookingList",
        "refreshBookingsBtn",
        "clearBookingsBtn",
        "googleCalendarStatus",
        "googleConnectBtn",
        "googleDisconnectBtn",
        "googleImportBtn",
        "googleTestPreplyBtn",
        "teacherPreplyCalendarId",
        "savePreplyBtn",
    ].forEach((id) => {
        els[id] = qs(id);
    });
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    }[char]));
}

function isLocalDevHost() {
    const host = window.location.hostname || "";
    return host === "localhost" || host === "127.0.0.1" || host === "";
}

function ensureEmailJsInit() {
    const cfg = window.emailJsConfig || {};
    if (!cfg.publicKey) return false;
    try {
        if (window.emailjs && typeof window.emailjs.init === "function") {
            window.emailjs.init(cfg.publicKey);
            return true;
        }
    } catch {}
    return false;
}

async function sendBookingEmail(payload) {
    const cfg = window.emailJsConfig || {};
    if (!cfg.publicKey || !cfg.serviceId || !cfg.templateId) return false;
    if (!ensureEmailJsInit()) return false;

    try {
        await window.emailjs.send(cfg.serviceId, cfg.templateId, {
            to_email: (payload.recipientEmail || "").trim(),
            student_name: payload.name || "",
            student_email: payload.email || "",
            student_phone: payload.phone || "",
            slot_time: payload.slot || "",
            notes: payload.notes || "",
            student_timezone: payload.studentTimeZone || "",
            student_locale: payload.studentLocale || "",
            teacher_timezone: payload.teacherTimeZone || "",
            booking_reasons: payload.reasons || "",
            booking_level: payload.level || "",
            booking_lessons_per_month: payload.lessonsPerMonth || "",
            booking_country_hint: payload.countryHint || "",
            booking_summary: payload.summary || "",
        });
        return true;
    } catch {
        return false;
    }
}

function setStatus(element, message, tone = "") {
    if (!element) return;
    element.textContent = message || "";
    element.classList.remove("is-error", "is-success");
    if (tone === "error") element.classList.add("is-error");
    if (tone === "success") element.classList.add("is-success");
}

function setButtonLoading(button, loading, loadingText = "") {
    if (!button) return;
    const label = button.querySelector(".btn__label");
    if (loading) {
        button.dataset.idleLabel = label?.textContent || button.textContent || "";
        if (label && loadingText) label.textContent = loadingText;
        if (!label && loadingText) button.textContent = loadingText;
        button.disabled = true;
        button.classList.add("is-loading");
        return;
    }
    if (label) label.textContent = button.dataset.idleLabel || label.textContent;
    if (!label && button.dataset.idleLabel) button.textContent = button.dataset.idleLabel;
    button.disabled = false;
    button.classList.remove("is-loading");
}

function normalizeAppsScriptStudentError(result, fallbackMessage) {
    const message = String(result?.message || "");
    if (message.toLowerCase().includes("unknown action")) {
        return "Apps Script needs a new deployment before students can cancel or reschedule.";
    }
    return message || fallbackMessage;
}

function isAlreadyDeletedCalendarEvent(result) {
    const message = [
        result?.message,
        result?.error,
        result?.ignoredError,
    ].filter(Boolean).join(" ").toLowerCase();
    return Boolean(result?.alreadyDeleted)
        || message.includes("already removed")
        || message.includes("already been deleted")
        || message.includes("does not exist");
}

function getLocalTimezone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TIMEZONE;
    } catch {
        return DEFAULT_TIMEZONE;
    }
}

function formatSlotTime(ts) {
    const timezone = state.bookingSettings.timezone || getLocalTimezone();
    return new Date(ts).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: timezone,
    });
}

function getDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function hashEmail(email) {
    const normalized = String(email || "").trim().toLowerCase();
    const encoder = new TextEncoder();
    return crypto.subtle.digest("SHA-256", encoder.encode(normalized)).then((buffer) =>
        Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("")
    );
}

function normalizePhoneNumber() {
    const prefix = (els.studentPhoneCountry?.value || "").trim();
    const raw = (els.studentPhone?.value || "").replace(/[^0-9]/g, "");
    if (!raw) return "";
    const local = raw.replace(/^0+/, "");
    return `${prefix}${local}`;
}

function isStudentSignedIn() {
    return Boolean(state.currentUser && state.currentRole === "student");
}

function getStudentName() {
    return (state.studentProfile?.name || state.currentUser?.displayName || "Student").trim();
}

function getStudentPhone() {
    return (state.studentProfile?.phone || "").trim();
}

function updateBookingSubmitState() {
    if (!els.bookingSubmit) return;
    els.bookingSubmit.disabled = !state.selectedSlotMs || !isStudentSignedIn();
}

function setStudentAuthMode(mode) {
    state.studentAuthMode = mode === "signup" ? "signup" : "login";
    if (els.studentAuthForm) {
        els.studentAuthForm.classList.toggle("is-signup-mode", state.studentAuthMode === "signup");
        els.studentAuthForm.classList.toggle("is-login-mode", state.studentAuthMode !== "signup");
    }
    if (els.studentNameField) {
        els.studentNameField.hidden = state.studentAuthMode !== "signup";
    }
    if (els.studentPhoneField) {
        els.studentPhoneField.hidden = state.studentAuthMode !== "signup";
    }
    if (els.studentAuthSubmit) {
        const label = els.studentAuthSubmit.querySelector(".btn__label");
        if (label) {
            label.textContent = state.studentAuthMode === "signup" ? "Create Account" : "Sign In";
        } else {
            els.studentAuthSubmit.textContent = state.studentAuthMode === "signup" ? "Create Account" : "Sign In";
        }
    }
    els.studentLoginModeBtn?.classList.toggle("btn--primary", state.studentAuthMode === "login");
    els.studentLoginModeBtn?.classList.toggle("btn--outline", state.studentAuthMode !== "login");
    els.studentSignupModeBtn?.classList.toggle("btn--primary", state.studentAuthMode === "signup");
    els.studentSignupModeBtn?.classList.toggle("btn--outline", state.studentAuthMode !== "signup");
    setStatus(els.studentAuthMsg, "");
}

function updateStudentAuthUi() {
    const signedIn = isStudentSignedIn();
    if (els.studentAuthBadge) {
        els.studentAuthBadge.textContent = signedIn ? (state.currentUser.email || "Student") : "Signed out";
    }
    if (els.studentAuthHint) {
        els.studentAuthHint.textContent = signedIn
            ? `Ready to book as ${getStudentName()}.`
            : "Create an account or sign in before booking.";
    }
    if (els.bookingAccountSummary) {
        els.bookingAccountSummary.textContent = signedIn
            ? `Booking as ${getStudentName()} (${state.currentUser.email || ""}).`
            : "Sign in, choose a time, then confirm your lesson.";
    }
    if (els.studentLogoutBtn) {
        els.studentLogoutBtn.hidden = !signedIn;
    }
    updateBookingSubmitState();
}

function getWeekStart(offset = 0) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const day = date.getDay();
    const mondayDistance = day === 0 ? -6 : 1 - day;
    date.setDate(date.getDate() + mondayDistance + offset * 7);
    return date;
}

function setSelectedSlot(slotMs) {
    state.selectedSlotMs = slotMs;
    const slotDate = slotMs ? new Date(slotMs) : null;
    state.selectedDateKey = slotDate ? getDateKey(slotDate) : "";
    state.visibleDateKey = state.selectedDateKey || state.visibleDateKey;
    window.selectedDate = slotDate ? getDateKey(slotDate) : "";
    window.selectedTime = slotDate
        ? `${String(slotDate.getHours()).padStart(2, "0")}:${String(slotDate.getMinutes()).padStart(2, "0")}`
        : "";

    if (slotDate && els.bookingInfo && els.selectedTimeDisplay) {
        els.bookingInfo.hidden = false;
        els.selectedTimeDisplay.textContent = slotDate.toLocaleString([], {
            dateStyle: "full",
            timeStyle: "short",
        });
        updateBookingSubmitState();
    } else if (els.bookingInfo) {
        els.bookingInfo.hidden = true;
        updateBookingSubmitState();
    }
}

function bookingDeps() {
    return {
        db: window.db,
        bookingSettings: state.bookingSettings,
        runtimeBusyBlocks: state.runtimeBusyBlocks,
        getLocalTimezone,
        getDateKey,
    };
}

async function refreshRuntimeBusyBlocks() {
    if (state.busyRefreshInFlight) {
        return state.busyRefreshInFlight;
    }
    state.busyRefreshInFlight = refreshRuntimeBusyBlocksNow().finally(() => {
        state.busyRefreshInFlight = null;
    });
    return state.busyRefreshInFlight;
}

async function refreshRuntimeBusyBlocksNow() {
    if (typeof window.fetchBusyBlocksFromAppsScript !== "function") {
        state.runtimeBusyBlocks = [];
        state.busySyncReady = false;
        state.busySyncMessage = "Calendar sync is not available right now.";
        return;
    }
    const result = await window.fetchBusyBlocksFromAppsScript({
        days: 45,
        timeZone: state.bookingSettings.timezone || getLocalTimezone(),
    });
    state.busySyncReady = !!(result?.success && Array.isArray(result.busyBlocks));
    state.busySyncMessage = state.busySyncReady ? "" : (result?.message || "Could not reach Google Calendar sync.");
    state.runtimeBusyBlocks = state.busySyncReady ? result.busyBlocks : [];
}

async function refreshGoogleBusyAndCalendar({ silent = true } = {}) {
    await refreshRuntimeBusyBlocks();
    await renderBookingCalendar();
    if (!silent) {
        setStatus(
            els.bookingMsg,
            state.busySyncReady && state.runtimeBusyBlocks.length
                ? "Calendar availability refreshed."
                : state.busySyncReady
                    ? "Calendar availability checked."
                    : "Calendar sync is unavailable. Please try again in a moment.",
            state.busySyncReady ? "success" : "error"
        );
    }
}

function startGoogleBusyAutoRefresh() {
    if (state.busyRefreshTimer) return;
    state.busyRefreshTimer = window.setInterval(() => {
        const studentScreen = document.getElementById("student-screen");
        if (!studentScreen?.classList.contains("app-screen--active")) return;
        refreshGoogleBusyAndCalendar().catch(console.error);
    }, GOOGLE_BUSY_REFRESH_MS);
}

async function loadPublicSettings() {
    state.bookingSettings = ensureBookingSettingsShape(
        await loadBookingSettingsFromCloud(window.db, getDefaultBookingSettings(getLocalTimezone()))
    );
    state.contactSettings = await loadContactSettingsFromCloud(window.db, createInitialContactSettings());
    window.bookingSettings = state.bookingSettings;
    await refreshRuntimeBusyBlocks();
}

async function renderBookingCalendar() {
    if (!window.db) return;
    const timezone = getLocalTimezone();
    if (els.bookingTimezoneLabel) {
        els.bookingTimezoneLabel.textContent = `Showing times in ${timezone}`;
    }

    if (!state.busySyncReady) {
        setSelectedSlot(null);
        if (els.bookingWeeklyGrid) els.bookingWeeklyGrid.innerHTML = "";
        if (els.bookingEmptyState) {
            els.bookingEmptyState.hidden = false;
            els.bookingEmptyState.textContent = state.busySyncMessage
                || "Calendar sync is unavailable. Please refresh in a moment.";
        }
        return;
    }

    const schedule = await getSchedulableSlots(42, bookingDeps());
    const weekStart = getWeekStart(state.bookingWeekOffset);
    const days = [];

    for (let i = 0; i < 7; i += 1) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        const dateKey = getDateKey(date);
        const label = date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
        const slots = schedule.filter((slot) => slot.available && slot.dateKey === dateKey);
        days.push({
            date,
            dateKey,
            label,
            slots,
            firstSlotMs: slots[0]?.startMs || null,
        });
    }

    const fallbackVisibleDate = days.find((day) => day.dateKey === state.visibleDateKey)
        ? state.visibleDateKey
        : (days.find((day) => day.slots.length)?.dateKey || days[0]?.dateKey || "");
    state.visibleDateKey = fallbackVisibleDate;

    if (els.bookingWeekLabel) {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        els.bookingWeekLabel.textContent = `${weekStart.toLocaleDateString([], { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString([], { month: "short", day: "numeric" })}`;
    }

    if (!els.bookingWeeklyGrid) return;
    els.bookingWeeklyGrid.innerHTML = "";
    let hasAny = false;

    days.forEach((day) => {
        const column = document.createElement("div");
        column.className = `booking-day-column${day.slots.length ? "" : " is-empty"}${day.dateKey === state.visibleDateKey ? " is-focused" : ""}`;
        column.dataset.dateKey = day.dateKey;
        const header = document.createElement("div");
        header.className = "booking-day-header";
        header.innerHTML = `
            <div class="booking-day-label">${escapeHtml(day.date.toLocaleDateString([], { weekday: "long" }))}</div>
            <div class="booking-day-date">${escapeHtml(day.date.toLocaleDateString([], { month: "short", day: "numeric" }))}</div>
        `;
        column.appendChild(header);

        const body = document.createElement("div");
        body.className = "booking-day-slots";

        if (!day.slots.length) {
            const empty = document.createElement("div");
            empty.className = "booking-day-empty";
            empty.textContent = "No open times";
            body.appendChild(empty);
        } else {
            hasAny = true;
            day.slots.forEach((slot) => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = `slot-btn${state.selectedSlotMs === slot.startMs ? " is-selected" : ""}`;
                btn.textContent = new Date(slot.startMs).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                });
                btn.addEventListener("click", () => {
                    state.visibleDateKey = day.dateKey;
                    setSelectedSlot(slot.startMs);
                    renderBookingCalendar().catch(console.error);
                });
                body.appendChild(btn);
            });
        }

        column.appendChild(body);
        els.bookingWeeklyGrid.appendChild(column);
    });

    if (els.bookingEmptyState) {
        els.bookingEmptyState.hidden = hasAny;
    }

    if (state.selectedSlotMs) {
        const stillAvailable = schedule.some((slot) => slot.available && slot.startMs === state.selectedSlotMs);
        if (!stillAvailable) setSelectedSlot(null);
    }
}

async function loadBookingStatus(email) {
    if (state.currentUser) {
        await loadStudentBookings();
        return;
    }
    await loadBookingStatusByEmail({
        db: window.db,
        email,
        bookingStatusList: els.bookingStatusList,
        bookingStatusMsg: els.bookingStatusMsg,
        hashEmail,
        escapeHtml,
        formatSlotTime,
    });
}

async function loadStudentBookings() {
    if (!els.bookingStatusList) return;
    els.bookingStatusList.innerHTML = "";
    if (!state.currentUser || state.currentRole !== "student") {
        els.bookingStatusList.innerHTML = "<div class=\"small-note\">Sign in to see your bookings.</div>";
        return;
    }
    try {
        const snap = await window.db
            .collection("bookings")
            .where("studentUid", "==", state.currentUser.uid)
            .limit(10)
            .get();
        const rows = [];
        snap.forEach((doc) => rows.push({ id: doc.id, ...(doc.data() || {}) }));
        rows.sort((a, b) => (b.slot || 0) - (a.slot || 0));
        if (!rows.length) {
            els.bookingStatusList.innerHTML = "<div class=\"small-note\">No bookings yet.</div>";
            return;
        }
        els.bookingStatusList.innerHTML = rows.map((b) => {
            const status = (b.status || "booked").toLowerCase();
            const label = status === "canceled" ? "Canceled" : status === "rescheduled" ? "Rescheduled" : "Booked";
            const canChange = status !== "canceled" && Number(b.slot || 0) - Date.now() >= STUDENT_CHANGE_CUTOFF_MS;
            const cutoffNote = status !== "canceled" && !canChange
                ? "<div class=\"small-note\">Changes close 12 hours before the lesson.</div>"
                : "";
            return `
                <div class="booking-status-item" data-student-booking-id="${escapeHtml(b.id)}">
                    <div><strong>${escapeHtml(formatSlotTime(b.slot))}</strong></div>
                    <div>Status: ${escapeHtml(label)}</div>
                    ${cutoffNote}
                    <div class="booking-item__actions">
                        <button class="btn btn--ghost btn--small" data-student-action="cancel" ${canChange ? "" : "disabled"}>Cancel</button>
                        <button class="btn btn--outline btn--small" data-student-action="reschedule" ${canChange ? "" : "disabled"}>Reschedule</button>
                    </div>
                    <div class="booking-item__resched"></div>
                </div>
            `;
        }).join("");
    } catch (error) {
        console.error("Could not load student bookings.", error);
        els.bookingStatusList.innerHTML = "<div class=\"small-note\">Unable to load your bookings right now.</div>";
    }
}

async function cancelStudentBooking(bookingId) {
    const snap = await window.db.collection("bookings").doc(bookingId).get();
    const booking = snap.data() || {};
    if (booking.studentUid !== state.currentUser?.uid) throw new Error("This booking does not belong to your account.");
    if (Number(booking.slot || 0) - Date.now() < STUDENT_CHANGE_CUTOFF_MS) {
        throw new Error("You cannot cancel less than 12 hours before the lesson.");
    }
    if ((booking.googleCalendarEventId || bookingId) && typeof window.deleteBookingViaAppsScript === "function") {
        const result = await window.deleteBookingViaAppsScript({
            eventId: booking.googleCalendarEventId,
            bookingId,
            slot: booking.slot || 0,
        });
        if (result?.success === false && !isAlreadyDeletedCalendarEvent(result)) {
            throw new Error(normalizeAppsScriptStudentError(result, "Could not remove this booking from Google Calendar."));
        }
    }
    await window.db.collection("bookings").doc(bookingId).set({
        status: "canceled",
        updatedAt: Date.now(),
        calendarSynced: false,
        canceledAt: Date.now(),
        history: window.firebase.firestore.FieldValue.arrayUnion({
            at: Date.now(),
            action: "canceled",
            by: "student",
        }),
    }, { merge: true });
    await window.db.collection("publicBookings").doc(bookingId).set({
        status: "canceled",
        updatedAt: Date.now(),
        calendarSynced: false,
    }, { merge: true });
}

async function openStudentReschedulePanel(itemEl, bookingId) {
    const resched = itemEl.querySelector(".booking-item__resched");
    if (!resched) return;
    if (resched.classList.contains("is-open")) {
        resched.classList.remove("is-open");
        resched.innerHTML = "";
        return;
    }
    const bookingSnap = await window.db.collection("bookings").doc(bookingId).get();
    const booking = { id: bookingSnap.id, ...(bookingSnap.data() || {}) };
    if (booking.studentUid !== state.currentUser?.uid) throw new Error("This booking does not belong to your account.");
    if (Number(booking.slot || 0) - Date.now() < STUDENT_CHANGE_CUTOFF_MS) {
        throw new Error("You cannot reschedule less than 12 hours before the lesson.");
    }
    resched.classList.add("is-open");
    resched.innerHTML = "<div class=\"small-note\">Loading available times...</div>";
    await refreshRuntimeBusyBlocks();
    if (!state.busySyncReady) {
        resched.innerHTML = "<div class=\"small-note\">Calendar sync is unavailable. Please try again later.</div>";
        return;
    }
    const slots = await getAvailableSlots(30, bookingDeps(), { excludeBookingId: bookingId });
    const options = slots.slice(0, 80).map((slotDate) => {
        const ts = slotDate.getTime();
        return `<option value="${ts}">${escapeHtml(slotDate.toLocaleString())}</option>`;
    });
    if (!options.length) {
        resched.innerHTML = "<div class=\"small-note\">No available times right now.</div>";
        return;
    }
    resched.innerHTML = `
        <select class="booking-resched-select">${options.join("")}</select>
        <button class="btn btn--primary btn--small" data-student-action="confirm-reschedule">Confirm</button>
        <button class="btn btn--ghost btn--small" data-student-action="close-reschedule">Close</button>
    `;
}

async function rescheduleStudentBooking(bookingId, newSlot) {
    const snap = await window.db.collection("bookings").doc(bookingId).get();
    const booking = snap.data() || {};
    if (booking.studentUid !== state.currentUser?.uid) throw new Error("This booking does not belong to your account.");
    if (Number(booking.slot || 0) - Date.now() < STUDENT_CHANGE_CUTOFF_MS) {
        throw new Error("You cannot reschedule less than 12 hours before the lesson.");
    }
    const conflict = await findBookingConflict(newSlot, bookingDeps(), { excludeBookingId: bookingId });
    if (conflict) throw new Error("That time is no longer available.");
    if ((booking.googleCalendarEventId || bookingId) && typeof window.deleteBookingViaAppsScript === "function") {
        const deleteResult = await window.deleteBookingViaAppsScript({
            eventId: booking.googleCalendarEventId,
            bookingId,
            slot: booking.slot || 0,
        });
        if (deleteResult?.success === false && !isAlreadyDeletedCalendarEvent(deleteResult)) {
            throw new Error(normalizeAppsScriptStudentError(deleteResult, "Could not remove the old Google Calendar event."));
        }
    }
    let calendarSynced = false;
    let googleCalendarEventId = null;
    if (typeof window.createBookingViaAppsScript === "function") {
        const createResult = await window.createBookingViaAppsScript({
            bookingId,
            slot: newSlot,
            durationMinutes: 50,
            timeZone: state.bookingSettings.timezone || getLocalTimezone() || "Africa/Cairo",
            teacherEmail: (state.contactSettings?.email || "").trim(),
            name: booking.name || getStudentName(),
            email: booking.email || state.currentUser?.email || "",
            phone: booking.phone || getStudentPhone(),
            notes: booking.notes || "",
            studentTimeZone: getLocalTimezone(),
            studentLocale: navigator.language || "",
        });
        if (createResult?.success === false) {
            throw new Error(createResult.message || "Could not create the new Google Calendar event.");
        }
        calendarSynced = !!createResult?.success;
        googleCalendarEventId = createResult?.eventId || null;
    }
    await window.db.collection("bookings").doc(bookingId).set({
        slot: newSlot,
        status: "rescheduled",
        updatedAt: Date.now(),
        calendarSynced,
        googleCalendarEventId,
        rescheduledFrom: booking.slot,
        rescheduledAt: Date.now(),
        history: window.firebase.firestore.FieldValue.arrayUnion({
            at: Date.now(),
            action: "rescheduled",
            by: "student",
            from: booking.slot,
            to: newSlot,
        }),
    }, { merge: true });
    await window.db.collection("publicBookings").doc(bookingId).set({
        slot: newSlot,
        status: "rescheduled",
        updatedAt: Date.now(),
        calendarSynced,
        rescheduledFrom: booking.slot,
        rescheduledAt: Date.now(),
    }, { merge: true });
}

async function deleteCalendarEventForBooking(bookingId, booking) {
    if (typeof window.deleteBookingViaAppsScript !== "function") {
        return { success: false, message: "Apps Script is not available." };
    }
    return window.deleteBookingViaAppsScript({
        eventId: booking.googleCalendarEventId || "",
        bookingId,
        slot: booking.slot || 0,
    });
}

async function createCalendarEventForBooking(bookingId, booking, slot) {
    if (typeof window.createBookingViaAppsScript !== "function") {
        return { success: false, message: "Apps Script is not available." };
    }
    return window.createBookingViaAppsScript({
        bookingId,
        slot,
        durationMinutes: 50,
        timeZone: state.bookingSettings.timezone || getLocalTimezone() || "Africa/Cairo",
        teacherEmail: (state.contactSettings?.email || "").trim(),
        name: booking.name || "Student",
        email: booking.email || "",
        phone: booking.phone || "",
        notes: booking.notes || "",
        studentTimeZone: booking.studentTimeZone || getLocalTimezone(),
        studentLocale: booking.studentLocale || navigator.language || "",
    });
}

function wireStudentActions() {
    document.querySelectorAll("[data-target]").forEach((button) => {
        button.addEventListener("click", () => showScreen(button.getAttribute("data-target")));
    });

    els.openStudentGateBtn?.addEventListener("click", () => {
        if (isStudentSignedIn()) {
            showScreen("student-screen");
            return;
        }
        els.studentAuthModal?.classList.add("modal--open");
        setStatus(els.studentAuthMsg, "");
    });

    els.openTeacherGateBtn?.addEventListener("click", () => {
        if (state.teacherUser && state.teacherRole === "teacher") {
            showScreen("teacher-screen");
            return;
        }
        els.teacherLoginModal?.classList.add("modal--open");
        setStatus(els.teacherLoginMsg, "");
    });

    els.studentLoginModeBtn?.addEventListener("click", () => setStudentAuthMode("login"));
    els.studentSignupModeBtn?.addEventListener("click", () => setStudentAuthMode("signup"));

    els.studentAuthForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!window.auth) {
            setStatus(els.studentAuthMsg, "Firebase is not configured.", "error");
            return;
        }
        const email = (els.studentEmail?.value || "").trim().toLowerCase();
        const password = els.studentPassword?.value || "";
        const name = (els.studentName?.value || "").trim().slice(0, 100);
        const phone = normalizePhoneNumber();
        try {
            setButtonLoading(
                els.studentAuthSubmit,
                true,
                state.studentAuthMode === "signup" ? "Creating..." : "Signing in..."
            );
            setStatus(els.studentAuthMsg, state.studentAuthMode === "signup" ? "Creating account..." : "Signing in...");
            if (state.studentAuthMode === "signup") {
                if (name.length < 2) {
                    setStatus(els.studentAuthMsg, "Please enter your full name.", "error");
                    setButtonLoading(els.studentAuthSubmit, false);
                    return;
                }
                if (!phone) {
                    setStatus(els.studentAuthMsg, "Please enter your mobile number.", "error");
                    setButtonLoading(els.studentAuthSubmit, false);
                    return;
                }
                const cred = await window.auth.createUserWithEmailAndPassword(email, password);
                await cred.user.updateProfile({ displayName: name });
                await window.db.collection("users").doc(cred.user.uid).set({
                    email,
                    name,
                    phone,
                    role: "student",
                    createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
                });
                setStatus(els.studentAuthMsg, "Account created. You can book now.", "success");
                els.studentAuthModal?.classList.remove("modal--open");
                showScreen("student-screen");
            } else {
                await window.auth.signInWithEmailAndPassword(email, password);
                setStatus(els.studentAuthMsg, "Signed in.", "success");
                els.studentAuthModal?.classList.remove("modal--open");
                showScreen("student-screen");
            }
        } catch (error) {
            setStatus(els.studentAuthMsg, error.message || "Student sign-in failed.", "error");
        } finally {
            setButtonLoading(els.studentAuthSubmit, false);
        }
    });

    els.studentLogoutBtn?.addEventListener("click", async () => {
        if (!window.auth) return;
        await window.auth.signOut();
    });

    els.openTeacherLoginBtn?.addEventListener("click", () => {
        if (state.teacherUser && state.teacherRole === "teacher") {
            showScreen("teacher-screen");
            return;
        }
        els.teacherLoginModal?.classList.add("modal--open");
        setStatus(els.teacherLoginMsg, "");
    });

    els.bookingWeekPrev?.addEventListener("click", () => {
        state.bookingWeekOffset = Math.max(0, state.bookingWeekOffset - 1);
        refreshGoogleBusyAndCalendar().catch(console.error);
    });

    els.bookingWeekNext?.addEventListener("click", () => {
        state.bookingWeekOffset += 1;
        refreshGoogleBusyAndCalendar().catch(console.error);
    });

    els.bookingStatusBtn?.addEventListener("click", () => {
        if (!state.currentUser) {
            setStatus(els.bookingStatusMsg, "Sign in to see your bookings.", "error");
            return;
        }
        setStatus(els.bookingStatusMsg, "");
        loadStudentBookings().catch(() => {
            setStatus(els.bookingStatusMsg, "Unable to load booking status right now.", "error");
        });
    });

    els.bookingStatusList?.addEventListener("click", async (event) => {
        const button = event.target.closest("[data-student-action]");
        if (!button) return;
        const item = button.closest("[data-student-booking-id]");
        const bookingId = item?.dataset.studentBookingId || "";
        const action = button.dataset.studentAction;
        if (!bookingId) return;
        const loadingTextByAction = {
            cancel: "Canceling...",
            reschedule: "Loading times...",
            "confirm-reschedule": "Rescheduling...",
        };
        const shouldShowLoading = Boolean(loadingTextByAction[action]);
        try {
            if (shouldShowLoading) {
                setButtonLoading(button, true, loadingTextByAction[action]);
            }
            setStatus(els.bookingStatusMsg, "");
            if (action === "close-reschedule") {
                const panel = item.querySelector(".booking-item__resched");
                panel?.classList.remove("is-open");
                if (panel) panel.innerHTML = "";
                return;
            }
            if (action === "cancel") {
                await cancelStudentBooking(bookingId);
                setStatus(els.bookingStatusMsg, "Booking canceled.", "success");
                await loadStudentBookings();
                await renderBookingCalendar();
                return;
            }
            if (action === "reschedule") {
                await openStudentReschedulePanel(item, bookingId);
                return;
            }
            if (action === "confirm-reschedule") {
                const newSlot = Number(item.querySelector(".booking-resched-select")?.value || 0);
                if (!newSlot) return;
                await refreshRuntimeBusyBlocks();
                if (!state.busySyncReady) {
                    setStatus(els.bookingStatusMsg, "Calendar sync is unavailable. Please try again later.", "error");
                    return;
                }
                await rescheduleStudentBooking(bookingId, newSlot);
                setStatus(els.bookingStatusMsg, "Booking rescheduled.", "success");
                await loadStudentBookings();
                await renderBookingCalendar();
            }
        } catch (error) {
            setStatus(els.bookingStatusMsg, error.message || "Could not update booking.", "error");
        } finally {
            if (shouldShowLoading) {
                setButtonLoading(button, false);
            }
        }
    });

    els.contactWhatsAppBtn?.addEventListener("click", () => {
        const message = "Hello, I want help with booking a lesson.";
        const url = buildWhatsAppUrl(state.contactSettings, message);
        if (!url) {
            setStatus(els.bookingMsg, "WhatsApp contact is not configured yet.", "error");
            return;
        }
        window.open(url, "_blank", "noopener,noreferrer");
    });

    els.contactEmailBtn?.addEventListener("click", () => {
        const email = (state.contactSettings.email || "").trim();
        if (!email) {
            setStatus(els.bookingMsg, "Contact email is not configured yet.", "error");
            return;
        }
        window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Lesson booking inquiry")}`;
    });

    document.querySelectorAll("[data-close-booking-success]").forEach((button) => {
        button.addEventListener("click", () => {
            els.bookingSuccessModal?.classList.remove("modal--open");
        });
    });

    document.querySelectorAll("[data-close-teacher-modal]").forEach((button) => {
        button.addEventListener("click", () => {
            els.teacherLoginModal?.classList.remove("modal--open");
        });
    });

    document.querySelectorAll("[data-close-student-modal]").forEach((button) => {
        button.addEventListener("click", () => {
            els.studentAuthModal?.classList.remove("modal--open");
        });
    });

    els.bookingForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!isStudentSignedIn()) {
            setStatus(els.bookingMsg, "Please sign in as a student before booking.", "error");
            els.studentAuthModal?.classList.add("modal--open");
            return;
        }
        const email = (state.currentUser.email || "").trim().toLowerCase();
        const name = getStudentName();
        const phone = getStudentPhone();

        await submitGuestBooking({
            db: window.db,
            bookingSettings: state.bookingSettings,
            contactSettings: state.contactSettings,
            getLocalTimezone,
            selectedDate: window.selectedDate,
            selectedTime: window.selectedTime,
            formValues: {
                name,
                email,
                phone,
                notes: "",
                reasonLabels: [],
                reason: "",
                level: "",
                lessonsPerMonth: "",
                honeypot: (els.bookingWebsite?.value || "").trim(),
                studentTimeZone: getLocalTimezone(),
                studentLocale: navigator.language || "",
                countryHint: "",
                recaptchaReady: true,
                studentUid: state.currentUser.uid,
            },
            bookingSubmit: els.bookingSubmit,
            bookingSubmitLabel: els.bookingSubmit?.querySelector(".btn__label"),
            bookingMsg: els.bookingMsg,
            bookingSuccessModal: els.bookingSuccessModal,
            bookingSuccessText: els.bookingSuccessText,
            bookingStatusEmail: els.bookingStatusEmail,
            refreshCalendarAvailability: async () => {
                await refreshRuntimeBusyBlocks();
                return state.busySyncReady;
            },
            findBookingConflict: async (slotMs) => {
                await refreshRuntimeBusyBlocks();
                return findBookingConflict(slotMs, bookingDeps());
            },
            buildBookingSelects: renderBookingCalendar,
            hashEmail,
            sendBookingEmail,
            createBookingViaAppsScript: window.createBookingViaAppsScript,
            loadBookingStatus,
            isLocalDevHost,
        });
    });
}

function renderTeacherDays() {
    if (!els.teacherDaysGrid) return;
    els.teacherDaysGrid.innerHTML = "";
    DAY_KEYS.forEach((day) => {
        const item = state.bookingSettings.days[day] || { enabled: false, start: "09:00", end: "17:00" };
        const row = document.createElement("div");
        row.className = "day-row";
        row.innerHTML = `
            <div class="day-row__label">${day}</div>
            <label><input type="checkbox" data-day-enabled="${day}" ${item.enabled ? "checked" : ""} /> Enabled</label>
            <input type="time" data-day-start="${day}" value="${escapeHtml(item.start || "09:00")}" />
            <input type="time" data-day-end="${day}" value="${escapeHtml(item.end || "17:00")}" />
        `;
        els.teacherDaysGrid.appendChild(row);
    });
}

function syncTeacherFormFields() {
    if (els.teacherTimezone) els.teacherTimezone.value = state.bookingSettings.timezone || getLocalTimezone();
    if (els.teacherSlotMinutes) els.teacherSlotMinutes.value = String(state.bookingSettings.slotMinutes || 50);
    if (els.teacherBreakMinutes) els.teacherBreakMinutes.value = String(state.bookingSettings.breakMinutes || 10);
    if (els.teacherWhatsapp) els.teacherWhatsapp.value = state.contactSettings.whatsapp || "";
    if (els.teacherContactEmail) els.teacherContactEmail.value = state.contactSettings.email || "";
    renderTeacherDays();
    renderExceptions();
}

function renderExceptions() {
    if (!els.exceptionList) return;
    const exceptions = Array.isArray(state.bookingSettings.exceptions)
        ? [...state.bookingSettings.exceptions]
        : [];
    exceptions.sort((a, b) => `${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`));

    if (!exceptions.length) {
        els.exceptionList.innerHTML = `<div class="empty-state">No busy blocks yet.</div>`;
        return;
    }

    els.exceptionList.innerHTML = exceptions.map((item, index) => `
        <div class="exception-item">
            <div><strong>${escapeHtml(item.date || "")}</strong> ${escapeHtml(item.start || "")} - ${escapeHtml(item.end || "")}</div>
            <div class="small-note">${escapeHtml(item.note || "Busy")}</div>
            <div class="action-row">
                <button type="button" class="btn btn--ghost btn--small" data-remove-exception="${index}">Remove</button>
            </div>
        </div>
    `).join("");

    els.exceptionList.querySelectorAll("[data-remove-exception]").forEach((button) => {
        button.addEventListener("click", async () => {
            const index = Number(button.getAttribute("data-remove-exception"));
            if (!Number.isInteger(index)) return;
            state.bookingSettings.exceptions.splice(index, 1);
            await saveTeacherSettings();
            renderExceptions();
            renderBookingCalendar().catch(console.error);
        });
    });
}

async function saveBookingSettingsPublicMirror() {
    await window.db.collection("bookingSettings").doc("primary").set({
        timezone: state.bookingSettings.timezone,
        slotMinutes: state.bookingSettings.slotMinutes,
        breakMinutes: state.bookingSettings.breakMinutes,
        totalSlotMinutes: state.bookingSettings.totalSlotMinutes,
        days: state.bookingSettings.days,
        exceptions: state.bookingSettings.exceptions,
        updatedAt: Date.now(),
    }, { merge: true });
}

async function saveContactPublicMirror() {
    await window.db.collection("bookingSettings").doc("primary").set({
        whatsapp: state.contactSettings.whatsapp || "",
        contactEmail: state.contactSettings.email || "",
        updatedAt: Date.now(),
    }, { merge: true });
}

async function saveTeacherSettings() {
    state.bookingSettings = ensureBookingSettingsShape(state.bookingSettings);
    window.bookingSettings = state.bookingSettings;
    await saveBookingSettingsToCloud(window.db, state.bookingSettings);
    await saveBookingSettingsPublicMirror();
}

async function saveTeacherContactSettings() {
    await saveContactSettingsToCloud(window.db, window.firebase, state.contactSettings);
    await saveContactPublicMirror();
}

async function refreshTeacherDashboard() {
    if (!state.teacherUser || state.teacherRole !== "teacher") return;
    state.bookingSettings = ensureBookingSettingsShape(
        await loadBookingSettingsFromCloud(
            window.db,
            ensureBookingSettingsShape(state.bookingSettings || getDefaultBookingSettings(getLocalTimezone()))
        )
    );
    state.contactSettings = await loadContactSettingsFromCloud(
        window.db,
        state.contactSettings || createInitialContactSettings()
    );
    window.bookingSettings = state.bookingSettings;
    await refreshRuntimeBusyBlocks();
    syncTeacherFormFields();
    await refreshTeacherBookings();
    await refreshGoogleCalendarStatus();
    await renderBookingCalendar();
}

async function refreshTeacherBookings() {
    state.bookingCache = await renderTeacherBookings({
        db: window.db,
        teacherBookingList: els.teacherBookingList,
        bookingCache: state.bookingCache,
        escapeHtml,
        formatSlotTime,
    });
}

async function refreshGoogleCalendarStatus() {
    if (!state.teacherUser || state.teacherRole !== "teacher") {
        setStatus(els.googleCalendarStatus, "Sign in as a teacher to manage Google Calendar.");
        return;
    }
    const connected = await window.isGoogleCalendarConnected?.();
    const base = connected ? "Google Calendar is connected." : "Google Calendar is not connected.";
    setStatus(els.googleCalendarStatus, [base, state.googleCalendarMessage].filter(Boolean).join(" "));
}

window.updateGoogleCalendarStatusMessage = (message) => {
    state.googleCalendarMessage = message || "";
    refreshGoogleCalendarStatus().catch(console.error);
};

window.refreshGoogleCalendarStatus = refreshGoogleCalendarStatus;

async function savePreplyCalendarId() {
    if (!state.teacherUser) {
        setStatus(els.googleCalendarStatus, "Sign in as a teacher first.", "error");
        return;
    }
    const raw = (els.teacherPreplyCalendarId?.value || "").trim();
    const normalized = window.normalizeCalendarId ? window.normalizeCalendarId(raw) : raw;
    await window.db.collection("teachers").doc(state.teacherUser.uid).set({
        preplyCalendarId: normalized,
        googleCalendar: {
            preplyCalendarId: normalized,
            updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
        },
    }, { merge: true });
    window.preplyCalendarId = normalized;
    state.googleCalendarMessage = normalized ? "Preply calendar ID saved." : "Preply calendar ID cleared.";
    await refreshGoogleCalendarStatus();
}

function wireTeacherActions() {
    els.teacherLoginForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!window.auth) {
            setStatus(els.teacherLoginMsg, "Firebase is not configured.", "error");
            return;
        }
        try {
            setButtonLoading(els.teacherLoginSubmit, true, "Signing in...");
            setStatus(els.teacherLoginMsg, "Signing in...");
            await window.auth.signInWithEmailAndPassword(
                (els.teacherEmail?.value || "").trim(),
                els.teacherPassword?.value || ""
            );
        } catch (error) {
            setStatus(els.teacherLoginMsg, error.message || "Sign-in failed.", "error");
        } finally {
            setButtonLoading(els.teacherLoginSubmit, false);
        }
    });

    els.teacherLogoutBtn?.addEventListener("click", async () => {
        if (!window.auth) return;
        await window.auth.signOut();
    });

    els.availabilityForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            state.bookingSettings.timezone = (els.teacherTimezone?.value || "").trim() || DEFAULT_TIMEZONE;
            state.bookingSettings.slotMinutes = Number(els.teacherSlotMinutes?.value || 50);
            state.bookingSettings.breakMinutes = Number(els.teacherBreakMinutes?.value || 10);
            state.bookingSettings.totalSlotMinutes = state.bookingSettings.slotMinutes + state.bookingSettings.breakMinutes;

            DAY_KEYS.forEach((day) => {
                state.bookingSettings.days[day] = {
                    enabled: Boolean(document.querySelector(`[data-day-enabled="${day}"]`)?.checked),
                    start: document.querySelector(`[data-day-start="${day}"]`)?.value || "09:00",
                    end: document.querySelector(`[data-day-end="${day}"]`)?.value || "17:00",
                };
            });

            await saveTeacherSettings();
            await refreshRuntimeBusyBlocks();
            await renderBookingCalendar();
            setStatus(els.availabilityMsg, "Availability saved for both teacher and public booking settings.", "success");
        } catch (error) {
            setStatus(els.availabilityMsg, error.message || "Could not save availability.", "error");
        }
    });

    els.teacherResetAvailabilityBtn?.addEventListener("click", async () => {
        state.bookingSettings = getDefaultBookingSettings(getLocalTimezone());
        await saveTeacherSettings();
        syncTeacherFormFields();
        await renderBookingCalendar();
        setStatus(els.availabilityMsg, "Availability reset to default.", "success");
    });

    els.contactSettingsForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        state.contactSettings.whatsapp = (els.teacherWhatsapp?.value || "").trim();
        state.contactSettings.email = (els.teacherContactEmail?.value || "").trim();
        try {
            await saveTeacherContactSettings();
            setStatus(els.contactMsg, "Contact settings saved.", "success");
        } catch (error) {
            setStatus(els.contactMsg, error.message || "Could not save contact settings.", "error");
        }
    });

    els.appsScriptForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            const result = await window.saveAppsScriptSettings?.({
                webAppUrl: (els.teacherAppsScriptUrl?.value || "").trim(),
            });
            setStatus(els.appsScriptMsg, result?.message || "Apps Script settings saved.", result?.success === false ? "error" : "success");
        } catch (error) {
            setStatus(els.appsScriptMsg, error.message || "Could not save Apps Script URL.", "error");
        }
    });

    els.appsScriptTestBtn?.addEventListener("click", async () => {
        const result = await window.testAppsScriptConnection?.();
        setStatus(els.appsScriptMsg, result?.message || "Apps Script test finished.", result?.success ? "success" : "error");
    });

    els.appsScriptRefreshBusyBtn?.addEventListener("click", async () => {
        await refreshRuntimeBusyBlocks();
        await renderBookingCalendar();
        setStatus(els.appsScriptMsg, state.runtimeBusyBlocks.length
            ? `Loaded ${state.runtimeBusyBlocks.length} busy blocks from Apps Script.`
            : "Apps Script busy blocks refreshed.", "success");
    });

    els.exceptionForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const date = els.exceptionDate?.value || "";
        const start = els.exceptionStart?.value || "";
        const end = els.exceptionEnd?.value || "";
        const note = (els.exceptionNote?.value || "").trim();
        if (!date || !start || !end || end <= start) {
            setStatus(els.exceptionMsg, "Please enter a valid date and time range.", "error");
            return;
        }
        state.bookingSettings.exceptions.push({ date, start, end, note });
        await saveTeacherSettings();
        renderExceptions();
        await renderBookingCalendar();
        setStatus(els.exceptionMsg, "Busy block added.", "success");
        els.exceptionForm.reset();
    });

    els.exceptionToggle?.addEventListener("click", () => {
        const expanded = els.exceptionToggle.getAttribute("aria-expanded") === "true";
        els.exceptionToggle.setAttribute("aria-expanded", String(!expanded));
        if (els.exceptionBody) {
            els.exceptionBody.hidden = expanded;
        }
    });

    els.clearExceptionsBtn?.addEventListener("click", async () => {
        state.bookingSettings.exceptions = [];
        await saveTeacherSettings();
        renderExceptions();
        await renderBookingCalendar();
        setStatus(els.exceptionMsg, "All busy blocks cleared.", "success");
    });

    els.refreshBookingsBtn?.addEventListener("click", () => {
        refreshTeacherBookings().catch(console.error);
    });

    els.clearBookingsBtn?.addEventListener("click", async () => {
        const confirmed = window.confirm("Delete all bookings from both private and public collections?");
        if (!confirmed) return;
        try {
            await clearAllBookings({ db: window.db });
            await refreshTeacherBookings();
            await renderBookingCalendar();
            setStatus(els.teacherBookingMsg, "All bookings deleted.", "success");
        } catch (error) {
            setStatus(els.teacherBookingMsg, error.message || "Could not delete bookings.", "error");
        }
    });

    els.teacherBookingList?.addEventListener("click", async (event) => {
        const button = event.target.closest("[data-action]");
        if (!button) return;
        const item = button.closest("[data-booking-id]");
        const bookingId = item?.getAttribute("data-booking-id");
        const booking = bookingId ? state.bookingCache.get(bookingId) : null;
        if (!booking || !item) return;

        const action = button.getAttribute("data-action");
        try {
            if (action === "cancel") {
                const deleteResult = await deleteCalendarEventForBooking(bookingId, booking);
                if (deleteResult?.success === false && !isAlreadyDeletedCalendarEvent(deleteResult)) {
                    throw new Error(normalizeAppsScriptStudentError(deleteResult, "Could not remove this booking from Google Calendar."));
                }
                await cancelBooking({ db: window.db, firebase: window.firebase, bookingId });
                setStatus(els.teacherBookingMsg, "Booking canceled.", "success");
                await refreshTeacherBookings();
                await renderBookingCalendar();
                return;
            }

            if (action === "reschedule") {
                await openReschedulePanel({
                    itemEl: item,
                    booking: { ...booking, id: bookingId },
                    getAvailableSlots: (days, options) => getAvailableSlots(days, bookingDeps(), options),
                    escapeHtml,
                });
                return;
            }

            if (action === "close-reschedule") {
                const panel = item.querySelector(".booking-item__resched");
                if (panel) panel.innerHTML = "";
                return;
            }

            if (action === "confirm-reschedule") {
                const select = item.querySelector(".booking-resched-select");
                const newSlot = Number(select?.value || 0);
                if (!newSlot) return;
                const conflict = await findBookingConflict(newSlot, bookingDeps(), { excludeBookingId: bookingId });
                if (conflict) {
                    setStatus(els.teacherBookingMsg, "That slot is already taken.", "error");
                    return;
                }
                const deleteResult = await deleteCalendarEventForBooking(bookingId, booking);
                if (deleteResult?.success === false && !isAlreadyDeletedCalendarEvent(deleteResult)) {
                    throw new Error(normalizeAppsScriptStudentError(deleteResult, "Could not remove the old Google Calendar event."));
                }
                const createResult = await createCalendarEventForBooking(bookingId, booking, newSlot);
                if (createResult?.success === false) {
                    throw new Error(createResult.message || "Could not create the new Google Calendar event.");
                }
                await rescheduleBooking({
                    db: window.db,
                    firebase: window.firebase,
                    bookingId,
                    booking,
                    newSlot,
                    calendarSynced: !!createResult?.success,
                    googleCalendarEventId: createResult?.eventId || null,
                });
                setStatus(els.teacherBookingMsg, "Booking rescheduled.", "success");
                await refreshTeacherBookings();
                await renderBookingCalendar();
            }
        } catch (error) {
            setStatus(els.teacherBookingMsg, error.message || "Booking update failed.", "error");
        }
    });

    els.googleConnectBtn?.addEventListener("click", async () => {
        if (!state.teacherUser) {
            setStatus(els.googleCalendarStatus, "Sign in as a teacher first.", "error");
            return;
        }
        const ok = await window.connectToGoogleCalendar?.((success, message) => {
            state.googleCalendarMessage = success ? "Connection saved." : (message || "Connection failed.");
        });
        if (ok) {
            state.googleCalendarMessage = "Connection saved.";
        }
        await refreshGoogleCalendarStatus();
    });

    els.googleDisconnectBtn?.addEventListener("click", async () => {
        await window.disconnectFromGoogleCalendar?.();
        state.googleCalendarMessage = "Google Calendar disconnected.";
        await refreshGoogleCalendarStatus();
    });

    els.googleImportBtn?.addEventListener("click", async () => {
        const result = await window.importGoogleCalendarEventsToBusyBlocks?.();
        if (result?.success) {
            state.googleCalendarMessage = result.message || "Calendar events imported.";
            await refreshTeacherDashboard();
        } else {
            setStatus(els.googleCalendarStatus, result?.message || "Import failed.", "error");
        }
    });

    els.googleTestPreplyBtn?.addEventListener("click", async () => {
        const result = await window.testPreplyCalendarAccess?.();
        setStatus(els.googleCalendarStatus, result?.message || "Test finished.", result?.success ? "success" : "error");
    });

    els.savePreplyBtn?.addEventListener("click", () => {
        savePreplyCalendarId().catch((error) => {
            setStatus(els.googleCalendarStatus, error.message || "Could not save Preply calendar ID.", "error");
        });
    });
}

function showScreen(screenId) {
    if (screenId === "teacher-screen" && (!state.teacherUser || state.teacherRole !== "teacher")) {
        els.teacherLoginModal?.classList.add("modal--open");
        return;
    }
    document.querySelectorAll(".app-screen").forEach((screen) => {
        screen.classList.toggle("app-screen--active", screen.id === screenId);
    });
    document.querySelectorAll(".nav-link").forEach((button) => {
        button.classList.toggle("is-active", button.getAttribute("data-target") === screenId);
    });
    if (els.openTeacherLoginBtn) {
        els.openTeacherLoginBtn.classList.toggle("is-active", screenId === "teacher-screen");
    }
}

async function handleAuthState(user) {
    state.currentUser = user || null;
    state.currentRole = "";
    state.studentProfile = null;
    state.teacherUser = null;
    state.teacherRole = "";

    if (!user) {
        if (els.teacherDashboard) els.teacherDashboard.hidden = true;
        if (els.teacherAuthBadge) els.teacherAuthBadge.textContent = "Signed out";
        setStatus(els.teacherAuthMsg, "Sign in to access teacher controls.");
        setStatus(els.teacherLoginMsg, "");
        updateStudentAuthUi();
        await loadStudentBookings();
        await loadPublicSettings();
        await renderBookingCalendar();
        await refreshGoogleCalendarStatus();
        showScreen("welcome-screen");
        return;
    }

    const resolved = await resolveUserRole({
        db: window.db,
        uid: user.uid,
        email: user.email,
        savedRole: "",
        fallbackRole: "",
    });
    state.currentRole = resolved.role || "student";
    state.studentProfile = resolved.data || {};

    if (state.currentRole !== "teacher") {
        if (els.teacherDashboard) els.teacherDashboard.hidden = true;
        if (els.teacherAuthBadge) els.teacherAuthBadge.textContent = "Signed out";
        setStatus(els.teacherAuthMsg, "Sign in to access teacher controls.");
        setStatus(els.teacherLoginMsg, "");
        updateStudentAuthUi();
        await loadStudentBookings();
        await refreshGoogleCalendarStatus();
        showScreen("student-screen");
        return;
    }

    state.teacherUser = user;
    state.teacherRole = "teacher";
    updateStudentAuthUi();

    await bootstrapTeacherAccess({
        db: window.db,
        firebase: window.firebase,
        uid: user.uid,
        email: user.email,
    });

    els.teacherDashboard.hidden = false;
    els.teacherAuthBadge.textContent = user.email || "Teacher";
    setStatus(els.teacherAuthMsg, "Teacher access active.", "success");
    setStatus(els.teacherLoginMsg, "");
    els.teacherLoginModal?.classList.remove("modal--open");

    const teacherDoc = await window.db.collection("teachers").doc(user.uid).get();
    const teacherData = teacherDoc.exists ? (teacherDoc.data() || {}) : {};
    els.teacherAppsScriptUrl.value = teacherData.appsScript?.webAppUrl || "";
    els.teacherPreplyCalendarId.value = teacherData.preplyCalendarId || teacherData.googleCalendar?.preplyCalendarId || "";
    await refreshTeacherDashboard();
    showScreen("teacher-screen");
}

function buildTeacherScheduleUi() {
    renderTeacherDays();
}

async function init() {
    cacheDom();
    buildTeacherScheduleUi();
    setStudentAuthMode("login");
    updateStudentAuthUi();
    wireStudentActions();
    wireTeacherActions();
    showScreen("welcome-screen");

    if (!window.db || !window.auth) {
        setStatus(els.bookingMsg, "Firebase runtime config is missing. Add js/config.runtime.js first.", "error");
        return;
    }

    await loadPublicSettings();
    await renderBookingCalendar();
    startGoogleBusyAutoRefresh();
    window.auth.onAuthStateChanged((user) => {
        handleAuthState(user).catch(console.error);
    });
}

init().catch(console.error);
