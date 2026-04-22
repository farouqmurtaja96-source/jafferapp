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
        "bookingDateChips",
        "bookingWeeklyGrid",
        "bookingEmptyState",
        "bookingInfo",
        "selectedTimeDisplay",
        "bookingForm",
        "bookingAccountSummary",
        "bookingWebsite",
        "bookingSubmit",
        "bookingMsg",
        "studentAuthPanel",
        "studentAuthForm",
        "studentAuthHint",
        "studentAuthBadge",
        "studentLoginModeBtn",
        "studentSignupModeBtn",
        "studentNameField",
        "studentName",
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
        "openTeacherLoginBtn",
        "teacherLoginModal",
        "teacherLoginForm",
        "teacherEmail",
        "teacherPassword",
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
    const prefix = (els.bookingPhoneCountry?.value || "").trim();
    const raw = (els.bookingPhone?.value || "").replace(/[^0-9]/g, "");
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

function updateBookingSubmitState() {
    if (!els.bookingSubmit) return;
    els.bookingSubmit.disabled = !state.selectedSlotMs || !isStudentSignedIn();
}

function setStudentAuthMode(mode) {
    state.studentAuthMode = mode === "signup" ? "signup" : "login";
    if (els.studentNameField) {
        els.studentNameField.hidden = state.studentAuthMode !== "signup";
    }
    if (els.studentAuthSubmit) {
        els.studentAuthSubmit.textContent = state.studentAuthMode === "signup" ? "Create Account" : "Sign In";
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
    if (els.studentAuthForm) {
        els.studentAuthForm.classList.toggle("is-signed-in", signedIn);
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
        return;
    }
    const result = await window.fetchBusyBlocksFromAppsScript({
        days: 45,
        timeZone: state.bookingSettings.timezone || getLocalTimezone(),
    });
    state.runtimeBusyBlocks = result?.success && Array.isArray(result.busyBlocks)
        ? result.busyBlocks
        : [];
}

async function refreshGoogleBusyAndCalendar({ silent = true } = {}) {
    await refreshRuntimeBusyBlocks();
    await renderBookingCalendar();
    if (!silent) {
        setStatus(
            els.bookingMsg,
            state.runtimeBusyBlocks.length
                ? "Calendar availability refreshed."
                : "Calendar availability checked.",
            "success"
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

function renderDateChips(days) {
    if (!els.bookingDateChips) return;
    els.bookingDateChips.innerHTML = "";
    days.forEach((day) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `date-chip${day.dateKey === state.visibleDateKey ? " is-selected" : ""}`;
        btn.textContent = day.label;
        btn.addEventListener("click", () => {
            state.visibleDateKey = day.dateKey;
            if (!day.firstSlotMs) return;
            setSelectedSlot(day.firstSlotMs);
            renderBookingCalendar().catch(console.error);
        });
        els.bookingDateChips.appendChild(btn);
    });
}

async function renderBookingCalendar() {
    if (!window.db) return;
    const timezone = getLocalTimezone();
    if (els.bookingTimezoneLabel) {
        els.bookingTimezoneLabel.textContent = `Showing times in ${timezone}`;
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

    renderDateChips(days);

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
            return `
                <div class="booking-status-item">
                    <div><strong>${escapeHtml(formatSlotTime(b.slot))}</strong></div>
                    <div>Status: ${escapeHtml(label)}</div>
                </div>
            `;
        }).join("");
    } catch (error) {
        console.error("Could not load student bookings.", error);
        els.bookingStatusList.innerHTML = "<div class=\"small-note\">Unable to load your bookings right now.</div>";
    }
}

function wireStudentActions() {
    document.querySelectorAll("[data-target]").forEach((button) => {
        button.addEventListener("click", () => showScreen(button.getAttribute("data-target")));
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
        try {
            setStatus(els.studentAuthMsg, state.studentAuthMode === "signup" ? "Creating account..." : "Signing in...");
            if (state.studentAuthMode === "signup") {
                if (name.length < 2) {
                    setStatus(els.studentAuthMsg, "Please enter your full name.", "error");
                    return;
                }
                const cred = await window.auth.createUserWithEmailAndPassword(email, password);
                await cred.user.updateProfile({ displayName: name });
                await window.db.collection("users").doc(cred.user.uid).set({
                    email,
                    name,
                    role: "student",
                    createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
                });
                setStatus(els.studentAuthMsg, "Account created. You can book now.", "success");
            } else {
                await window.auth.signInWithEmailAndPassword(email, password);
                setStatus(els.studentAuthMsg, "Signed in.", "success");
            }
        } catch (error) {
            setStatus(els.studentAuthMsg, error.message || "Student sign-in failed.", "error");
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

    els.bookingForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!isStudentSignedIn()) {
            setStatus(els.bookingMsg, "Please sign in as a student before booking.", "error");
            els.studentAuthPanel?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }
        const email = (state.currentUser.email || "").trim().toLowerCase();
        const name = getStudentName();

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
                phone: "",
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
            setStatus(els.teacherLoginMsg, "Signing in...");
            await window.auth.signInWithEmailAndPassword(
                (els.teacherEmail?.value || "").trim(),
                els.teacherPassword?.value || ""
            );
        } catch (error) {
            setStatus(els.teacherLoginMsg, error.message || "Sign-in failed.", "error");
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
                await rescheduleBooking({
                    db: window.db,
                    firebase: window.firebase,
                    bookingId,
                    booking,
                    newSlot,
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
        showScreen("student-screen");
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
    showScreen("student-screen");

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
