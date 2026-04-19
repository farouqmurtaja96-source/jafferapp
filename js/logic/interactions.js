// Auto-generated refactor: keeps original logic mostly intact.
// NOTE: This module assigns key objects/functions to window to keep cross-file references working.

import * as CONST from '../core/constants.js';
import { defaultLessons as importedDefaultLessons } from '../lessons/index.js';
import * as Cloud from '../cloud/lessonsCloud.js';
import { arabicLetters, arabicLettersExtras, arabicLettersExercises } from '../data/arabicLettersData.js';
import {
    createInitialContactSettings,
    loadContactSettings as loadStoredContactSettings,
    saveContactSettings as saveStoredContactSettings,
    buildWhatsAppUrl as buildWhatsAppUrlFromSettings,
    extractWhatsAppNumber,
    loadContactSettingsFromCloud as loadContactSettingsStateFromCloud,
    saveContactSettingsToCloud as saveContactSettingsStateToCloud,
} from './contactSettingsStore.js';
import {
    createInitialBookingSettings,
    getDefaultBookingSettings as createDefaultBookingSettings,
    ensureBookingSettingsShape as normalizeBookingSettings,
    loadBookingSettings as loadStoredBookingSettings,
    saveBookingSettings as saveStoredBookingSettings,
    loadBookingSettingsFromCloud as loadBookingSettingsStateFromCloud,
    saveBookingSettingsToCloud as saveBookingSettingsStateToCloud,
} from './bookingSettingsStore.js';
import {
    canUseTeacherRole,
    ensureTeacherDoc as ensureTeacherDocRecord,
    ensureTeacherUserDoc as ensureTeacherUserRecord,
} from './teacherAccess.js';
import {
    resolveUserRole,
    bootstrapTeacherAccess,
    createStudentAccount,
} from './authFlows.js';
import {
    renderTeacherBookings as renderTeacherBookingsView,
    openReschedulePanel,
    cancelBooking as cancelTeacherBooking,
    rescheduleBooking as rescheduleTeacherBooking,
    clearAllBookings as clearAllTeacherBookings,
} from './teacherBookingAdmin.js';
import {
    loadBookingStatusByEmail,
    submitGuestBooking,
} from './guestBookingFlow.js';
import {
    wireDialogueEditor,
    wireGrammarEditor,
    wireTranslationEditor,
    wireQuizEditor,
    wireRolePlayEditor,
    wireHomeworkEditor,
    wireTeacherNotesEditor,
} from './teacherPracticeEditor.js';
import {
    toMinutes as bookingToMinutes,
    addDaysToDateKey as bookingAddDaysToDateKey,
    getZonedParts as bookingGetZonedParts,
    zonedDateTimeToUtcMs as bookingZonedDateTimeToUtcMs,
    isSlotBlockedByException as bookingIsSlotBlockedByException,
    getBookedSlotsMap as bookingGetBookedSlotsMap,
    doesSlotOverlap as bookingDoesSlotOverlap,
    findBookingConflict as bookingFindBookingConflict,
    getAvailableSlots as bookingGetAvailableSlots,
    getSchedulableSlots as bookingGetSchedulableSlots,
} from './bookingAvailability.js';

// Re-create original constant names in module scope
const LS_STUDENTS_KEY = CONST.LS_STUDENTS_KEY;
const LS_LESSON_PREFIX = CONST.LS_LESSON_PREFIX;
const LS_FONT_SIZE_KEY = CONST.LS_FONT_SIZE_KEY;
const LS_CUSTOM_UNITS_KEY = CONST.LS_CUSTOM_UNITS_KEY;
const LS_BACKUP_SETTINGS_KEY = CONST.LS_BACKUP_SETTINGS_KEY;
const LS_WHITEBOARD_PREFIX = CONST.LS_WHITEBOARD_PREFIX;
const LS_USER_ROLE_KEY = CONST.LS_USER_ROLE_KEY;
const LS_CONTACT_SETTINGS_KEY = CONST.LS_CONTACT_SETTINGS_KEY;
const LS_BOOKING_SETTINGS_KEY = CONST.LS_BOOKING_SETTINGS_KEY;
const LESSON_ID_GREETING = CONST.LESSON_ID_GREETING;
const LESSON_ID_DAILY_ROUTINE = CONST.LESSON_ID_DAILY_ROUTINE;
const LESSON_ID_FOOD_DRINK = CONST.LESSON_ID_FOOD_DRINK;
const LESSON_ID_FAMILY = CONST.LESSON_ID_FAMILY;
const LESSON_ID_TRANSPORT = CONST.LESSON_ID_TRANSPORT;
const LESSON_ID_WORK_STUDY = CONST.LESSON_ID_WORK_STUDY;
const LESSON_ID_HEALTH = CONST.LESSON_ID_HEALTH;
const LESSON_ID_APARTMENT = CONST.LESSON_ID_APARTMENT;
const LESSON_ID_SHOPPING = CONST.LESSON_ID_SHOPPING;
const LESSON_ID_WEATHER = CONST.LESSON_ID_WEATHER;
const LESSON_ID_OPINIONS = CONST.LESSON_ID_OPINIONS;
const LESSON_ID_COMPLAINTS = CONST.LESSON_ID_COMPLAINTS;
const LESSON_ID_PLANS_FUTURE = CONST.LESSON_ID_PLANS_FUTURE;
const LESSON_ID_FEELINGS = CONST.LESSON_ID_FEELINGS;
const LESSON_ID_HOBBIES = CONST.LESSON_ID_HOBBIES;
const BASE_PROGRESS_TEMPLATE = CONST.BASE_PROGRESS_TEMPLATE;

// Match original variable name used throughout the legacy code
const defaultLessons = importedDefaultLessons;
const getServerTimestamp = Cloud.getServerTimestamp;
const loadLessonsFromCloudOnce = Cloud.loadLessonsFromCloudOnce;
const subscribeLessonsFromCloud = Cloud.subscribeLessonsFromCloud;
const saveLessonToCloud = Cloud.saveLessonToCloud;
const deleteLessonFromCloud = Cloud.deleteLessonFromCloud;
const startLessonCloudSync = Cloud.startLessonCloudSync;
const stopLessonCloudSync = Cloud.stopLessonCloudSync;
const syncLessonsNow = Cloud.syncLessonsNow;
const setLessonSyncForScreen = Cloud.setLessonSyncForScreen;

const lessons = {};
// Expose for cloud module and other modules
window.lessons = lessons;


let cloudSaveTimer = null;

function scheduleCloudSave() {
    if (!appState.currentUser || appState.currentUser.role !== "teacher") return;
    clearTimeout(cloudSaveTimer);
    cloudSaveTimer = setTimeout(() => {
        saveStudentsToCloud().catch(console.error);
    }, 600); // نصف ثانية بعد آخر تغيير
}

// ========================= STATE =========================
const appState = {
    students: [],
    currentStudentId: null,
    currentLessonId: LESSON_ID_GREETING,
    teacherMode: false,
    currentTab: "overview",
    lessonFontSize: 1,
    vocabCoreVisited: {},
    guestMode: false,
    guestStudent: null,
};
window.appState = appState;
let backupSettings = {
    frequency: "off",      // "off" | "daily" | "2d" | "weekly"
    lastBackupAt: null,    // ISO string
};

let contactSettings = createInitialContactSettings();
let runtimeBusyBlocks = [];
let bookingSettings = createInitialBookingSettings();

function getDefaultBookingSettings() {
    return createDefaultBookingSettings(bookingSettings.timezone || getLocalTimezone() || "Africa/Cairo");
}

function ensureBookingSettingsShape() {
    bookingSettings = normalizeBookingSettings(bookingSettings);
}

function loadBookingSettings() {
    bookingSettings = loadStoredBookingSettings(LS_BOOKING_SETTINGS_KEY, bookingSettings);
    return bookingSettings;
}

function saveBookingSettings() {
    saveStoredBookingSettings(LS_BOOKING_SETTINGS_KEY, bookingSettings);
}

async function loadBookingSettingsFromCloud() {
    bookingSettings = await loadBookingSettingsStateFromCloud(db, bookingSettings);
}

async function saveBookingSettingsToCloud() {
    await saveBookingSettingsStateToCloud(db, bookingSettings);
}

function loadContactSettings() {
    contactSettings = loadStoredContactSettings(LS_CONTACT_SETTINGS_KEY, contactSettings);
    return contactSettings;
}

function saveContactSettings() {
    saveStoredContactSettings(LS_CONTACT_SETTINGS_KEY, contactSettings);
}

async function loadContactSettingsFromCloud() {
    contactSettings = await loadContactSettingsStateFromCloud(db, contactSettings);
    return contactSettings;
}

async function saveContactSettingsToCloud() {
    await saveContactSettingsStateToCloud(db, firebase, contactSettings);
}

async function ensureTeacherDoc(uid, email) {
    return ensureTeacherDocRecord({ db, firebase, uid, email });
}

async function ensureTeacherUserDoc(uid, email) {
    return ensureTeacherUserRecord({ db, firebase, uid, email });
}


function buildWhatsAppUrl(message) {
    return buildWhatsAppUrlFromSettings(contactSettings, message);
}

function mergeBusyBlocksLists(existingList, incomingList) {
    const merged = [];
    const seen = new Set();
    [...(Array.isArray(existingList) ? existingList : []), ...(Array.isArray(incomingList) ? incomingList : [])].forEach((block) => {
        if (!block || !block.date || !block.start || !block.end) return;
        const key = `${block.date}|${block.start}|${block.end}|${block.sourceEventId || ""}|${block.note || ""}`;
        if (seen.has(key)) return;
        seen.add(key);
        merged.push(block);
    });
    return merged.sort((a, b) => `${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`));
}

function isTikTokInAppBrowser() {
    const ua = navigator.userAgent || "";
    return /TikTok|BytedanceWebview|musical_ly/i.test(ua);
}

function isMobileDevice() {
    const ua = navigator.userAgent || "";
    return /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
}

let pendingWhatsAppTargets = null;

function openWhatsAppWithMessage(message) {
    const webUrl = buildWhatsAppUrl(message);
    const number = extractWhatsAppNumber(contactSettings);
    if (!webUrl || !number) {
        toast("WhatsApp contact not set.");
        return;
    }

    const appUrl = `whatsapp://send?phone=${number}&text=${encodeURIComponent(message)}`;
    const fallbackToWeb = () => {
        try {
            window.location.assign(webUrl);
        } catch {
            window.open(webUrl, "_blank", "noopener,noreferrer");
        }
    };

    if (isTikTokInAppBrowser()) {
        try {
            navigator.clipboard?.writeText(webUrl);
        } catch {}
        toast("If TikTok blocks WhatsApp, open in browser or paste the copied link.");
        fallbackToWeb();
        return;
    }

    if (isMobileDevice()) {
        pendingWhatsAppTargets = { appUrl, webUrl };
        const chooser = document.getElementById("whatsAppChooserModal");
        if (chooser) {
            chooser.classList.add("modal--open");
            return;
        }
    }

    const fallbackTimer = setTimeout(() => {
        fallbackToWeb();
    }, isMobileDevice() ? 900 : 1200);

    const clearFallback = () => {
        clearTimeout(fallbackTimer);
        document.removeEventListener("visibilitychange", clearFallback);
        window.removeEventListener("pagehide", clearFallback);
        window.removeEventListener("blur", clearFallback);
    };

    document.addEventListener("visibilitychange", clearFallback, { once: true });
    window.addEventListener("pagehide", clearFallback, { once: true });
    window.addEventListener("blur", clearFallback, { once: true });

    try {
        window.location.assign(appUrl);
    } catch {
        fallbackToWeb();
    }
}

function ensureEmailJsInit() {
    try {
        if (window.emailjs && typeof window.emailjs.init === "function") {
            window.emailjs.init("N5rGMrRJY7IbqGsuJ");
        }
    } catch { }
}

async function sendBookingEmail(payload) {
    try {
        if (!window.emailjs || typeof window.emailjs.send !== "function") return;
        const params = {
            to_email: (payload.recipientEmail || contactSettings.email || "farouqmurtaja96@gmail.com").trim(),
            student_name: payload.name,
            student_email: payload.email,
            student_phone: payload.phone,
            slot_time: payload.slot,
            notes: payload.notes || "",
            student_timezone: payload.studentTimeZone || "",
            student_locale: payload.studentLocale || "",
            teacher_timezone: payload.teacherTimeZone || "",
            booking_reasons: payload.reasons || "",
            booking_level: payload.level || "",
            booking_lessons_per_month: payload.lessonsPerMonth || "",
            booking_country_hint: payload.countryHint || "",
            booking_summary: payload.summary || "",
        };
        await window.emailjs.send("service_977rmzv", "template_419nlgt", params);
        console.log("Booking email sent successfully");
        return true;
    } catch (err) {
        console.error("Error sending booking email:", err);
        return false;
    }
}

function getLocalTimezone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch {
        return "";
    }
}

function formatSlotTime(ts) {
    try {
        return new Date(ts).toLocaleString();
    } catch {
        return String(ts);
    }
}

function getDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function toMinutes(timeStr) {
    return bookingToMinutes(timeStr);
}

function addDaysToDateKey(dateKey, days) {
    return bookingAddDaysToDateKey(dateKey, days);
}

function getZonedParts(date, timeZone) {
    return bookingGetZonedParts(date, timeZone);
}

function getTimeZoneOffsetMs(timeZone, date) {
    const parts = getZonedParts(date, timeZone);
    const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second || 0);
    return asUtc - date.getTime();
}

function zonedDateTimeToUtcMs(timeZone, year, month, day, hour, minute) {
    return bookingZonedDateTimeToUtcMs(timeZone, year, month, day, hour, minute);
}

function normalizePhone(input) {
    const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
    let s = (input || "").toString();
    s = s
        .split("")
        .map((ch) => {
            const idx = arabicDigits.indexOf(ch);
            return idx >= 0 ? String(idx) : ch;
        })
        .join("");
    return s.replace(/[^\d+]/g, "");
}

function getSelectedPhoneDialCode() {
    const countrySelect = document.getElementById("bookingPhoneCountry");
    if (!countrySelect) return "";
    const selectedOption = countrySelect.options[countrySelect.selectedIndex];
    return selectedOption?.dataset?.dial || "";
}

function buildBookingPhoneValue(phoneRaw) {
    const normalized = normalizePhone(phoneRaw);
    if (!normalized) return "";
    if (normalized.startsWith("+")) return normalized;
    const dialCode = getSelectedPhoneDialCode();
    return `${dialCode}${normalized.replace(/^0+/, "")}`;
}

function getPreferredPhoneCountryCode() {
    try {
        const locale = navigator.language || "";
        const region = locale.includes("-") ? locale.split("-").pop().toUpperCase() : "";
        if (region) return region;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        if (timeZone.includes("Cairo")) return "EG";
        if (timeZone.includes("Jerusalem") || timeZone.includes("Gaza")) return "PS";
        if (timeZone.includes("Amman")) return "JO";
        if (timeZone.includes("Riyadh")) return "SA";
        if (timeZone.includes("Dubai")) return "AE";
    } catch {}
    return "EG";
}

function setupBookingPhoneField() {
    const countrySelect = document.getElementById("bookingPhoneCountry");
    const phoneInput = document.getElementById("bookingPhone");
    if (!countrySelect || !phoneInput) return;
    const preferred = getPreferredPhoneCountryCode();
    const matchingOption = Array.from(countrySelect.options).find((option) => option.value === preferred);
    if (matchingOption) {
        countrySelect.value = preferred;
    }
    const updatePlaceholder = () => {
        const dialCode = getSelectedPhoneDialCode();
        phoneInput.placeholder = dialCode ? `Mobile number (${dialCode})` : "Mobile number";
    };
    countrySelect.addEventListener("change", updatePlaceholder);
    updatePlaceholder();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
}

function isValidPhone(phone) {
    const digits = (phone || "").replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
}

function escapeHtml(str) {
    return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function escapeAttr(str) {
    return escapeHtml(str).replace(/`/g, "&#96;");
}

function isLocalDevHost() {
    try {
        const host = window.location.hostname || "";
        return host === "localhost" || host === "127.0.0.1";
    } catch {
        return false;
    }
}

function getBookingReasonLabels() {
    const labels = {
        travel: "For Travel",
        study: "For Study",
        work: "For Work",
        family: "Family Communication",
        fun: "For Fun",
        other: "Other",
    };
    return Array.from(document.querySelectorAll("#bookingReasonGroup input:checked"))
        .map((input) => labels[input.value] || input.value)
        .filter(Boolean);
}

async function hashEmail(email) {
    const normalized = (email || "").trim().toLowerCase();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function isSlotBlockedByException(slotStartMs, slotMinutes) {
    return bookingIsSlotBlockedByException(slotStartMs, slotMinutes, {
        bookingSettings,
        runtimeBusyBlocks,
        getLocalTimezone,
    });
}

async function getBookedSlotsMap(startMs, endMs) {
    return bookingGetBookedSlotsMap(startMs, endMs, { db, bookingSettings });
}

function doesSlotOverlap(slotStartMs, slotMinutes, bookedMap, excludeBookingId = null) {
    return bookingDoesSlotOverlap(slotStartMs, slotMinutes, bookedMap, excludeBookingId);
}

async function findBookingConflict(slotStartMs, { excludeBookingId = null } = {}) {
    return bookingFindBookingConflict(slotStartMs, { db, bookingSettings }, { excludeBookingId });
}

async function getAvailableSlots(daysToShow = 14, options = {}) {
    return bookingGetAvailableSlots(daysToShow, {
        db,
        bookingSettings,
        runtimeBusyBlocks,
        getLocalTimezone,
        getDateKey,
    }, options);
}

async function getSchedulableSlots(daysToShow = 14, options = {}) {
    return bookingGetSchedulableSlots(daysToShow, {
        db,
        bookingSettings,
        runtimeBusyBlocks,
        getLocalTimezone,
        getDateKey,
    }, options);
}

const exportContext = {
    lessonId: null,
    studentName: "",
    source: "", // "lesson-view" أو "teacher-dashboard"
};
let customUnits = {
    Beginner: [],
    "Pre-Intermediate": [],
    Intermediate: [],
};
// =============== SECONDARY AUTH APP (لإنشاء الطلاب فقط) ===============
let secondaryAuth = null;

function getSecondaryAuth() {
    if (secondaryAuth) return secondaryAuth;

    if (typeof firebase === "undefined" || typeof firebaseConfig === "undefined") {
        console.warn("Firebase or firebaseConfig not available for secondary app.");
        return null;
    }

    // نحاول نلقى app باسم "teacherAdmin" لو موجود
    let secondaryApp = firebase.apps.find((a) => a.name === "teacherAdmin");
    if (!secondaryApp) {
        secondaryApp = firebase.initializeApp(firebaseConfig, "teacherAdmin");
    }

    secondaryAuth = secondaryApp.auth();
    return secondaryAuth;
}

// ================= AUTH UI =================
function updateAuthUI() {
    const authStatus = document.getElementById("authStatus");
    const btnLogin = document.getElementById("btnLogin");
    const btnLogout = document.getElementById("btnLogout");

    const navTeacher = document.querySelector(
        '.top-nav__link[data-nav="teacher-dashboard-screen"]'
    );
    const navProfiles = document.querySelector(
        '.top-nav__link[data-nav="students-screen"]'
    );

    if (!appState.currentUser) {
        if (authStatus) authStatus.textContent = "Not signed in";
        if (btnLogin) btnLogin.style.display = "inline-flex";
        if (btnLogout) btnLogout.style.display = "none";

        // أي حد مش مسجّل → ما يشوف Teacher Dashboard
        if (navTeacher) navTeacher.style.display = "none";
        // لو حابة تخلي Profiles ظاهر قبل تسجيل الدخول، خليه هيك:
        if (navProfiles) navProfiles.style.display = "inline-flex";
        if (typeof window.setDrawingLayerForRole === "function") {
            window.setDrawingLayerForRole(null);
        }
        return;
    }

    const { email, role } = appState.currentUser;

    if (role === "guest") {
        if (authStatus) authStatus.textContent = "GUEST – Limited access";
        if (btnLogin) btnLogin.style.display = "inline-flex";
        if (btnLogout) {
            btnLogout.style.display = "inline-flex";
            btnLogout.textContent = "Exit Guest";
        }
        if (navTeacher) navTeacher.style.display = "none";
        if (navProfiles) navProfiles.style.display = "none";
        if (typeof window.setDrawingLayerForRole === "function") {
            window.setDrawingLayerForRole("guest");
        }
        return;
    }

    if (authStatus) authStatus.textContent = `${role.toUpperCase()} – ${email}`;
    if (btnLogin) btnLogin.style.display = "none";
    if (btnLogout) {
        btnLogout.style.display = "inline-flex";
        btnLogout.textContent = "Logout";
    }

    if (role === "teacher") {
        if (navTeacher) navTeacher.style.display = "inline-flex";
        if (navProfiles) navProfiles.style.display = "inline-flex";
    } else {
        // student
        if (navTeacher) navTeacher.style.display = "none";
        // الطالب ما يشوف صفحة البروفايلات
        if (navProfiles) navProfiles.style.display = "none";
    }
    if (typeof window.setDrawingLayerForRole === "function") {
        window.setDrawingLayerForRole(role);
    }
}

// =============== AUTH STATE LISTENER =================
auth.onAuthStateChanged(async (user) => {
    if (!user) {
        appState.currentUser = null;
        updateAuthUI();
        try { window.refreshGoogleCalendarStatus?.(); } catch { }
        // رجّعيه للصفحة الرئيسية
        showScreen("home-screen");
        return;
    }

    try {
        // نحاول نقرأ الدور من Firestore، ولو مش موجود من localStorage
        let savedRole = null;
        try {
            savedRole = localStorage.getItem(LS_USER_ROLE_KEY);
        } catch (e) {
            console.warn("Could not read role from localStorage", e);
        }

        const { role } = await resolveUserRole({
            db,
            uid: user.uid,
            email: user.email,
            savedRole,
            fallbackRole: null,
        });

        appState.currentUser = {
            uid: user.uid,
            email: user.email,
            role,
        };

        // نحدّث الـ localStorage بالدور النهائي
        try {
            localStorage.setItem(LS_USER_ROLE_KEY, role);
        } catch (e) {
            console.warn("Could not save role to localStorage", e);
        }

        try { window.refreshGoogleCalendarStatus?.(); } catch { }
        updateAuthUI();

        if (role === "teacher") {
            await bootstrapTeacherAccess({ db, firebase, uid: user.uid, email: user.email });
            await syncTeacherStudentsFromCloud?.();
            renderStudents();
            renderTeacherPicker();
            goToTeacherDashboard();
        } else {
            appState.students = [
                {
                    id: user.uid,
                    name: user.email,
                    level: "Beginner",
                    goals: [],
                    progress: {},
                    homeworkNotes: {},
                },
            ];
            appState.currentStudentId = user.uid;
            goToLevels();
        }
    } catch (err) {
        console.error("auth.onAuthStateChanged error:", err);
    }
});

// =======================
// Translation Sentence Generator (from lesson vocabulary)
// =======================

function normalizeText(s) {
    return (s || "").toString().trim();
}

function pickRandom(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function uniqBy(arr, keyFn) {
    const seen = new Set();
    const out = [];
    for (const x of arr) {
        const k = keyFn(x);
        if (!k || seen.has(k)) continue;
        seen.add(k);
        out.push(x);
    }
    return out;
}

// Try to detect nouns / greetings / misc from vocabulary (very lightweight)
function bucketVocabulary(vocabItems) {
    const items = (Array.isArray(vocabItems) ? vocabItems : [])
        .map((it) => ({
            ...it,
            ar: normalizeText(it.ar),
            en: normalizeText(it.en),
            hint: normalizeText(it.hint),
            exampleAr: normalizeText(it.exampleAr),
            exampleEn: normalizeText(it.exampleEn),
        }))
        .filter((it) => it.ar || it.en);

    // greetings / common phrases: heuristics by english keywords OR arabic starts
    const greetingKeywords = [
        "hello",
        "hi",
        "good morning",
        "good evening",
        "goodbye",
        "welcome",
        "nice to meet",
        "please",
        "thanks",
        "thank you",
    ];

    const greetings = items.filter((it) => {
        const en = it.en.toLowerCase();
        const ar = it.ar;
        return (
            greetingKeywords.some((k) => en.includes(k)) ||
            ar.includes("مرحبا") ||
            ar.includes("أهلا") ||
            ar.includes("صباح") ||
            ar.includes("مساء") ||
            ar.includes("مع السلامة") ||
            ar.includes("تشرف")
        );
    });

    // nouns: heuristic - english contains "my" forms or common noun list in hint
    // (Not perfect; we also just keep "others" as nouns candidates.)
    const nounCandidates = items.filter((it) => {
        const en = it.en.toLowerCase();
        const ar = it.ar;
        // If it looks like a noun (contains "/" or is a single word) we allow it
        const enWords = en.split(/\s+/).filter(Boolean);
        return enWords.length <= 3 || ar.length <= 12;
    });

    // verbs: if forms.present has content OR english starts with "to "
    const verbs = items.filter((it) => {
        const en = it.en.toLowerCase();
        const hasForms =
            it.forms &&
            ((it.forms.present && Object.keys(it.forms.present).length > 0) ||
                (it.forms.past && Object.keys(it.forms.past).length > 0) ||
                (it.forms.future && Object.keys(it.forms.future).length > 0));
        return hasForms || en.startsWith("to ");
    });

    const others = items;

    return {
        all: items,
        greetings: uniqBy(greetings, (x) => x.id || x.ar || x.en),
        nouns: uniqBy(nounCandidates, (x) => x.id || x.ar || x.en),
        verbs: uniqBy(verbs, (x) => x.id || x.ar || x.en),
        others: uniqBy(others, (x) => x.id || x.ar || x.en),
    };
}

/**
 * Generate translation sentences (not word=word) from lesson vocabulary
 * @param {object} lesson - the lesson object (has vocabulary)
 * @param {number} count - how many translation items to generate
 * @returns {Array} translation items [{id,type,textAr,textEn}]
 */
function generateTranslationFromVocab(lesson, count = 10) {
    const vocabCore = lesson?.vocabulary?.core || [];
    const vocabExtra = lesson?.vocabulary?.extra || [];
    const vocab = bucketVocabulary([...vocabCore, ...vocabExtra]);

    const results = [];

    // Some reusable fillers to make sentences natural
    const names = ["سارة", "أحمد", "لينا", "كريم", "نابل", "هبة"];
    const timesAr = ["اليوم", "هلّق", "بكرا"];
    const timesEn = ["today", "now", "tomorrow"];

    function addPair(en, ar) {
        const textEn = normalizeText(en);
        const textAr = normalizeText(ar);
        if (!textEn || !textAr) return;

        // avoid duplicates
        const key = (textEn + "||" + textAr).toLowerCase();
        if (results.some((r) => (r.textEn + "||" + r.textAr).toLowerCase() === key)) return;

        // alternate directions roughly half/half
        const type = results.length % 2 === 0 ? "enToAr" : "arToEn";

        results.push({
            id: `auto_t_${results.length + 1}`,
            type,
            textEn,
            textAr,
        });
    }

    // ---------- Template 1: Greeting + name ----------
    // "Hello, I'm X." / "مرحبا، أنا X."
    if (vocab.greetings.length) {
        const g = pickRandom(vocab.greetings);
        const helloAr = g?.ar || "مرحبا";
        const helloEn = g?.en || "Hello";
        const name = pickRandom(names);

        addPair(`${helloEn}! I'm ${name}.`, `${helloAr}! أنا ${name}.`);
    } else {
        const name = pickRandom(names);
        addPair(`Hello! I'm ${name}.`, `مرحبا! أنا ${name}.`);
    }

    // ---------- Template 2: How are you? + I'm fine ----------
    // "How are you today? I'm fine." / "كيفك اليوم؟ أنا منيح/منيحة."
    // If you have "كيفك" or "منيح" in vocab, use them, else fallback
    const howAr =
        pickRandom(vocab.others.filter((x) => x.ar.includes("كيف")))?.ar || "كيفك";
    const howEn =
        pickRandom(vocab.others.filter((x) => x.en.toLowerCase().includes("how are")))?.en ||
        "How are you";
    const fineAr =
        pickRandom(vocab.others.filter((x) => x.ar.includes("منيح") || x.ar.includes("منيحة")))
            ?.ar || "منيح";
    const fineEn =
        pickRandom(vocab.others.filter((x) => x.en.toLowerCase().includes("fine")))
            ?.en || "I’m fine";

    const tA = pickRandom(timesAr);
    const tE = timesEn[timesAr.indexOf(tA)] || "today";
    addPair(`${howEn} ${tE}? ${fineEn}.`, `${howAr} ${tA}؟ أنا ${fineAr}.`);

    // ---------- Template 3: Nice to meet you ----------
    // "Nice to meet you, X." / "تشرفنا يا X."
    const meetAr =
        pickRandom(vocab.others.filter((x) => x.ar.includes("تشرف")))?.ar || "تشرفنا";
    const meetEn =
        pickRandom(vocab.others.filter((x) => x.en.toLowerCase().includes("nice to meet")))
            ?.en || "Nice to meet you";
    const name2 = pickRandom(names);
    addPair(`${meetEn}, ${name2}.`, `${meetAr} يا ${name2}.`);

    // ---------- Template 4: Want + noun (biddi + noun) ----------
    // We'll pick a noun candidate; if none, use "قهوة" (coffee)
    const noun = pickRandom(vocab.nouns) || { ar: "قهوة", en: "coffee" };
    // Natural sentence:
    // "I want a coffee, please." / "بدي قهوة، لو سمحت."
    addPair(
        `I want ${noun.en || "coffee"}, please.`,
        `بدي ${noun.ar || "قهوة"}، لو سمحت.`
    );

    // ---------- Template 5: Do you have + noun? ----------
    // "Do you have ___?" / "عندك ___؟"
    const noun2 = pickRandom(shuffle(vocab.nouns)) || { ar: "مي", en: "water" };
    addPair(`Do you have ${noun2.en || "water"}?`, `عندك ${noun2.ar || "مي"}؟`);

    // ---------- Template 6: My family / my work / my study style ----------
    // If you have family nouns, use them, otherwise use generic
    const familyWord =
        pickRandom(vocab.others.filter((x) => x.en.toLowerCase().includes("family") || x.ar.includes("عيلة")))
            ?.ar || "عيلتي";
    const familyEn =
        pickRandom(vocab.others.filter((x) => x.en.toLowerCase().includes("family")))
            ?.en || "My family";

    addPair(`${familyEn} is big.`, `${familyWord} كبيرة.`);

    // ---------- Template 7: Goodbye + see you tomorrow ----------
    const byeAr =
        pickRandom(vocab.others.filter((x) => x.ar.includes("مع السلامة") || x.ar.includes("الله معك")))
            ?.ar || "مع السلامة";
    const byeEn =
        pickRandom(vocab.others.filter((x) => x.en.toLowerCase().includes("goodbye")))
            ?.en || "Goodbye";
    addPair(`${byeEn}, see you tomorrow.`, `${byeAr}، بشوفك بكرا.`);

    // ---------- Bonus: Use existing example sentences from vocab (if present) ----------
    // These are already full sentences and strongly "from the lesson"
    // We add a few of them if they exist, to reach target count.
    const examplePairs = vocab.all
        .filter((it) => it.exampleAr && it.exampleEn)
        .map((it) => ({ en: it.exampleEn, ar: it.exampleAr }));

    for (const ex of shuffle(examplePairs)) {
        if (results.length >= count) break;
        addPair(ex.en, ex.ar);
    }

    // If still not enough, generate variations with different nouns/times
    while (results.length < count) {
        const n = pickRandom(vocab.nouns) || { ar: "قهوة", en: "coffee" };
        const ta = pickRandom(timesAr);
        const te = timesEn[timesAr.indexOf(ta)] || "today";
        addPair(
            `I want ${n.en || "coffee"} ${te}.`,
            `بدي ${n.ar || "قهوة"} ${ta}.`
        );
    }

    return results.slice(0, count);
}

/**
 * Ensure lesson has translation items (auto-generate if empty)
 * Call this when opening a lesson or rendering the Translation tab.
 */
function ensureLessonTranslation(lesson, count = 10) {
    if (!lesson.practice) lesson.practice = {};
    if (!Array.isArray(lesson.practice.translation) || lesson.practice.translation.length === 0) {
        lesson.practice.translation = generateTranslationFromVocab(lesson, count);
    }
}
function safeArr(x) { return Array.isArray(x) ? x : []; }
function txt(x) { return (x ?? "").toString().trim(); }
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function pick(arr) { return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null; }
function uniqPairs(items) {
    const seen = new Set();
    return items.filter(it => {
        const key = (txt(it.textEn) + "||" + txt(it.textAr)).toLowerCase();
        if (!txt(it.textEn) || !txt(it.textAr)) return false;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}


function generateTranslationItemsFromLesson(lesson, minCount = 7) {
    const items = [];

    const vocab = lesson?.vocabulary || {};
    const core = safeArr(vocab.core);
    const extra = safeArr(vocab.extra);
    const allVocab = [...core, ...extra];

    // 1) أخذ أمثلة من vocabulary (أفضل مصدر لأنه جمل جاهزة من المنهج)
    for (const v of allVocab) {
        const ar = txt(v.exampleAr);
        const en = txt(v.exampleEn);
        if (ar && en) {
            items.push({ id: `ex_${txt(v.id) || Math.random()}`, textEn: en, textAr: ar });
        }
    }

    // 2) أخذ جمل من الحوار (كل سطر pair مع ترجمته)
    const lines = safeArr(lesson?.dialogue?.lines);
    for (const line of lines) {
        const ar = txt(line.ar);
        const en = txt(line.en);
        if (ar && en) {
            items.push({ id: `dlg_${Math.random()}`, textEn: en, textAr: ar });
        }
    }

    // 3) إذا لسه أقل من المطلوب: نولّد جمل بالقوالب
    const nouns = allVocab
        .map(v => ({ ar: txt(v.ar), en: txt(v.en) }))
        .filter(v => v.ar || v.en);

    const nameAr = ["سارة", "أحمد", "لينا", "كريم", "هبة", "نابل"];
    const nameEn = ["Sara", "Ahmad", "Lina", "Karim", "Hiba", "Nabil"];

    const getNoun = () => pick(nouns) || { ar: "قهوة", en: "coffee" };

    const templates = [
        () => {
            const i = Math.floor(Math.random() * nameAr.length);
            return { en: `Hello! I'm ${nameEn[i]}.`, ar: `مرحبا! أنا ${nameAr[i]}.` };
        },
        () => {
            return { en: `How are you today?`, ar: `كيفك اليوم؟` };
        },
        () => {
            const n = getNoun();
            return { en: `I want ${n.en || "coffee"}, please.`, ar: `بدي ${n.ar || "قهوة"}، لو سمحت.` };
        },
        () => {
            const n = getNoun();
            return { en: `Do you have ${n.en || "water"}?`, ar: `عندك ${n.ar || "مي"}؟` };
        },
        () => {
            const n = getNoun();
            return { en: `This is ${n.en || "it"}.`, ar: `هاد ${n.ar || "هاد"}.` };
        },
        () => {
            return { en: `Nice to meet you.`, ar: `تشرفنا.` };
        },
        () => {
            return { en: `Goodbye, see you tomorrow.`, ar: `مع السلامة، بشوفك بكرا.` };
        },
    ];

    let guard = 0;
    while (items.length < minCount && guard < 50) {
        const t = pick(templates);
        if (t) {
            const out = t();
            items.push({ id: `auto_${items.length + 1}`, textEn: out.en, textAr: out.ar });
        }
        guard++;
    }

    return uniqPairs(items).slice(0, Math.max(minCount, 7));
}


function ensureTranslationItems(lesson, minCount = 7) {
    if (!lesson.practice) lesson.practice = {};
    const list = safeArr(lesson.practice.translation);

    if (list.length > 0) return; // موجودة مسبقاً

    const generated = generateTranslationItemsFromLesson(lesson, minCount);

    // نحولها لصيغة القالب: type + textEn/textAr
    lesson.practice.translation = generated.map((it, idx) => ({
        id: it.id || `t_${idx + 1}`,
        type: idx % 2 === 0 ? "enToAr" : "arToEn",
        textEn: it.textEn,
        textAr: it.textAr,
    }));
}


// ========================= VOCAB MODAL STATE =========================
const vocabModalState = {
    list: [],       // array of items (core أو extra)
    index: 0,       // current index in list
    showExamples: true,// هل الأمثلة ظاهرة أو مخفية
    showAr: true,
    showEn: true,
    showArabeezy: true,
    nextClickCount: 0,
};
const translationState = {
    items: [],
    index: 0,
    hidePrompt: false,
    hideAnswer: false,
    shuffled: false,
};
const microCheckState = {
    isOpen: false,
    pendingNextAdvance: false,
    currentItem: null,
    currentLessonId: null,
    checked: false,
    selectedOption: null,
    buildAnswer: [],
    rotationIndexByLesson: {},
};

function getVocabMemoryKey(lessonId, studentId = appState.currentStudentId) {
    const sid = studentId || "anon";
    return `pal_vocab_memory_${sid}_${lessonId || "unknown"}`;
}

function loadVocabMemory(lessonId, studentId = appState.currentStudentId) {
    try {
        const raw = localStorage.getItem(getVocabMemoryKey(lessonId, studentId));
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveVocabMemory(lessonId, memory, studentId = appState.currentStudentId) {
    try {
        localStorage.setItem(
            getVocabMemoryKey(lessonId, studentId),
            JSON.stringify(memory || {})
        );
    } catch { }
}

function setVocabMemoryStatus(lessonId, itemId, status) {
    if (!lessonId || !itemId) return;
    const memory = loadVocabMemory(lessonId);
    memory[itemId] = status;
    saveVocabMemory(lessonId, memory);
}



function getMicroCheckConfig(lesson) {
    const cfg = lesson?.microChecks || {};
    return {
        enabled: cfg.enabled === true,
        every: Number.isFinite(cfg.every) ? cfg.every : 5,
        items: Array.isArray(cfg.items) ? cfg.items : [],
    };
}

function ensureMicroCheckItems(lesson) {
    if (!lesson || !lesson.microChecks) return;
    const items = Array.isArray(lesson.microChecks.items) ? lesson.microChecks.items : [];
    const existingTypes = new Set(items.map((it) => it.type));
    const needed = ["match", "complete", "reorder", "choose"].filter(
        (type) => !existingTypes.has(type)
    );
    if (!needed.length) return;
    const generated = buildMicroCheckItemsFromLesson(lesson, needed);
    if (generated.length) {
        lesson.microChecks.items = items.concat(generated);
    }
}

function buildMicroCheckItemsFromLesson(lesson, types) {
    const vocab = getLessonVocabPairs(lesson);
    const grammarRows = getLessonGrammarRows(lesson);
    const items = [];
    let autoId = 1;
    const makeId = (prefix) => `mc_auto_${prefix}_${autoId++}`;

    types.forEach((type) => {
        let item = null;
        if (type === "match") {
            item = buildMatchMicroCheck(vocab, makeId);
        } else if (type === "complete") {
            item = buildCompleteMicroCheck(vocab, makeId);
        } else if (type === "reorder") {
            item = buildReorderMicroCheck(vocab, makeId);
        } else if (type === "choose") {
            item = buildChooseMicroCheck(grammarRows, makeId);
        }
        if (item) items.push(item);
    });

    return items;
}

function getLessonVocabPairs(lesson) {
    const vocab = lesson?.vocabulary || {};
    const items = [...safeArr(vocab.core), ...safeArr(vocab.extra)].map((it) => ({
        ar: txt(it.ar),
        en: txt(it.en),
        exampleAr: txt(it.exampleAr),
        exampleEn: txt(it.exampleEn),
    }));
    return items.filter((it) => it.ar && it.en);
}

function getLessonGrammarRows(lesson) {
    const pronouns = [
        "أنا",
        "إنتَ",
        "إنتِ",
        "هو",
        "هي",
        "إحنا",
        "إنتو",
        "هم",
        "انت",
        "انتي",
    ];
    const items = safeArr(lesson?.grammar);
    const rows = [];
    items.forEach((g) => {
        const examples = Array.isArray(g.examples) ? g.examples : [];
        examples.forEach((ex) => {
            const exampleText = txt(ex.ar);
            if (!exampleText) return;
            const matched = pronouns.find((p) => exampleText.includes(p));
            if (!matched) return;
            rows.push({ pronoun: matched, example: exampleText });
        });
    });
    return rows;
}

function buildMatchMicroCheck(vocab, makeId) {
    if (vocab.length < 2) return null;
    const target = pick(vocab);
    if (!target) return null;
    const distractors = shuffleArray(vocab.filter((it) => it.en !== target.en))
        .map((it) => it.en)
        .filter(Boolean);
    const options = shuffleArray([target.en, ...distractors].slice(0, 4));
    if (options.length < 2) return null;
    return {
        id: makeId("match"),
        type: "match",
        prompt: `طابق الكلمة العربية مع الترجمة: ${target.ar}`,
        options,
        correct: target.en,
    };
}

function buildCompleteMicroCheck(vocab, makeId) {
    const candidates = vocab.filter(
        (it) => it.exampleAr && it.ar && it.exampleAr.includes(it.ar)
    );
    if (!candidates.length) return null;
    const target = pick(candidates);
    if (!target) return null;
    const prompt = target.exampleAr.replace(target.ar, "___");
    const distractors = shuffleArray(vocab.filter((it) => it.ar !== target.ar))
        .map((it) => it.ar)
        .filter(Boolean);
    const options = shuffleArray([target.ar, ...distractors].slice(0, 4));
    if (options.length < 2) return null;
    return {
        id: makeId("complete"),
        type: "complete",
        prompt,
        options,
        correct: target.ar,
    };
}

function buildReorderMicroCheck(vocab, makeId) {
    const sentences = vocab
        .map((it) => it.exampleAr || it.exampleEn)
        .filter(Boolean);
    const candidates = sentences
        .map((text) => ({ text, words: tokenizeMicroCheckWords(text) }))
        .filter((it) => it.words.length >= 3 && it.words.length <= 8);
    if (!candidates.length) return null;
    const target = pick(candidates);
    if (!target) return null;
    return {
        id: makeId("reorder"),
        type: "reorder",
        prompt: "رتّب الكلمات",
        options: target.words,
        correct: target.words,
    };
}

function buildChooseMicroCheck(rows, makeId) {
    if (rows.length < 2) return null;
    const target = pick(rows);
    if (!target) return null;
    const distractors = shuffleArray(rows.filter((r) => r.pronoun !== target.pronoun))
        .map((r) => r.pronoun)
        .filter(Boolean);
    const options = shuffleArray([target.pronoun, ...distractors].slice(0, 4));
    if (options.length < 2) return null;
    return {
        id: makeId("choose"),
        type: "choose",
        prompt: `اختر الضمير الصحيح: ${target.example}`,
        options,
        correct: target.pronoun,
    };
}

function tokenizeMicroCheckWords(text) {
    return String(text)
        .replace(/[.,!?;:()"]/g, "")
        .split(/\s+/)
        .filter(Boolean);
}

function pickNextMicroCheckItem(lesson) {
    const cfg = getMicroCheckConfig(lesson);
    if (!cfg.items.length) return null;
    const lessonId = appState.currentLessonId || "lesson";
    const nextIndex = microCheckState.rotationIndexByLesson[lessonId] || 0;
    microCheckState.rotationIndexByLesson[lessonId] =
        (nextIndex + 1) % cfg.items.length;
    return cfg.items[nextIndex];
}

function openMicroCheckModal(lesson) {
    const item = pickNextMicroCheckItem(lesson);
    if (!item) return false;
    const modal = document.getElementById("microCheckModal");
    if (!modal) return false;

    microCheckState.isOpen = true;
    microCheckState.currentItem = item;
    microCheckState.currentLessonId = appState.currentLessonId;
    microCheckState.checked = false;
    microCheckState.selectedOption = null;
    microCheckState.buildAnswer = [];

    renderMicroCheckItem(item);
    modal.classList.add("modal--open");
    return true;
}

function closeMicroCheckModal() {
    const modal = document.getElementById("microCheckModal");
    if (modal) modal.classList.remove("modal--open");
    microCheckState.isOpen = false;
    microCheckState.currentItem = null;
    microCheckState.checked = false;
    microCheckState.selectedOption = null;
    microCheckState.buildAnswer = [];
    microCheckState.pendingNextAdvance = false;
}

function renderMicroCheckItem(item) {
    const titleEl = document.getElementById("microCheckTitle");
    const promptEl = document.getElementById("microCheckPrompt");
    const optionsEl = document.getElementById("microCheckOptions");
    const builderEl = document.getElementById("microCheckBuilder");
    const feedbackEl = document.getElementById("microCheckFeedback");
    const resetBtn = document.getElementById("microCheckResetBtn");
    const checkBtn = document.getElementById("microCheckCheckBtn");
    const continueBtn = document.getElementById("microCheckContinueBtn");
    const closeBtn = document.getElementById("microCheckCloseBtn");

    if (!titleEl || !promptEl || !optionsEl || !builderEl || !feedbackEl) return;

    const titles = {
        match: "Match (Arabic ↔ English) – طابق",
        complete: "Complete the sentence – اختار الكلمة الناقصة",
        reorder: "Build it – رتّب الكلمات",
        choose: "Choose the correct form – اختر الصيغة",
    };

    titleEl.textContent = item.title || titles[item.type] || "Micro-Check";
    promptEl.textContent = item.prompt || "";
    feedbackEl.textContent = "";
    optionsEl.innerHTML = "";
    builderEl.innerHTML = "";

    if (resetBtn) resetBtn.style.display = item.type === "reorder" ? "" : "none";
    if (checkBtn) checkBtn.disabled = false;
    if (continueBtn) continueBtn.disabled = true;
    if (closeBtn) closeBtn.disabled = true;

    if (item.type === "reorder") {
        const bankLabel = document.createElement("div");
        bankLabel.className = "translation-muted";
        bankLabel.textContent = "Word bank";

        const answerLabel = document.createElement("div");
        answerLabel.className = "translation-muted";
        answerLabel.textContent = "Your sentence";

        const bank = document.createElement("div");
        bank.className = "microcheck__bank";
        const answer = document.createElement("div");
        answer.className = "microcheck__answer";

        const baseWords = Array.isArray(item.options) && item.options.length
            ? item.options
            : Array.isArray(item.correct)
                ? item.correct
                : String(item.correct || "")
                    .split(" ")
                    .filter(Boolean);
        const words = shuffleArray(baseWords || []);
        microCheckState.buildAnswer = [];

        function renderBank() {
            bank.innerHTML = "";
            words.forEach((w, idx) => {
                const chip = document.createElement("button");
                chip.type = "button";
                chip.className = "microcheck__chip";
                chip.textContent = w;
                chip.addEventListener("click", () => {
                    const picked = words.splice(idx, 1)[0];
                    microCheckState.buildAnswer.push(picked);
                    renderBank();
                    renderAnswer();
                });
                bank.appendChild(chip);
            });
        }

        function renderAnswer() {
            answer.innerHTML = "";
            microCheckState.buildAnswer.forEach((w, idx) => {
                const chip = document.createElement("button");
                chip.type = "button";
                chip.className = "microcheck__chip";
                chip.textContent = w;
                chip.addEventListener("click", () => {
                    const removed = microCheckState.buildAnswer.splice(idx, 1)[0];
                    words.splice(idx, 0, removed);
                    renderBank();
                    renderAnswer();
                });
                answer.appendChild(chip);
            });
        }

        renderBank();
        renderAnswer();

        builderEl.appendChild(bankLabel);
        builderEl.appendChild(bank);
        builderEl.appendChild(answerLabel);
        builderEl.appendChild(answer);

        if (resetBtn) {
            resetBtn.onclick = () => {
                words.splice(0, words.length, ...shuffleArray(baseWords || []));
                microCheckState.buildAnswer = [];
                renderBank();
                renderAnswer();
                feedbackEl.textContent = "";
                microCheckState.checked = false;
                if (continueBtn) continueBtn.disabled = true;
                if (closeBtn) closeBtn.disabled = true;
            };
        }
        return;
    }

    const options = shuffleArray(item.options || []);
    options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "microcheck__option";
        btn.textContent = opt;
        btn.dataset.option = opt;
        btn.addEventListener("click", () => {
            if (microCheckState.checked) return;
            microCheckState.selectedOption = opt;
            optionsEl.querySelectorAll(".microcheck__option").forEach((b) => {
                b.classList.toggle("is-selected", b.dataset.option === opt);
            });
        });
        optionsEl.appendChild(btn);
    });
}

function evaluateMicroCheck() {
    const item = microCheckState.currentItem;
    const feedbackEl = document.getElementById("microCheckFeedback");
    const continueBtn = document.getElementById("microCheckContinueBtn");
    const closeBtn = document.getElementById("microCheckCloseBtn");

    if (!item || !feedbackEl) return;

    if (item.type === "reorder") {
        const correct = Array.isArray(item.correct)
            ? item.correct
            : String(item.correct || "")
                .split(" ")
                .filter(Boolean);
        if (microCheckState.buildAnswer.length !== correct.length) {
            feedbackEl.textContent = "Complete the sentence first.";
            return;
        }
        const isCorrect =
            microCheckState.buildAnswer.join(" ").trim() === correct.join(" ").trim();
        feedbackEl.textContent = isCorrect ? "Correct!" : "Not quite. Try again.";
        microCheckState.checked = isCorrect;
        if (isCorrect) {
            if (continueBtn) continueBtn.disabled = false;
            if (closeBtn) closeBtn.disabled = false;
        }
        return;
    }

    if (!microCheckState.selectedOption) {
        feedbackEl.textContent = "Choose an answer first.";
        return;
    }

    const correct =
        Array.isArray(item.correct) ? item.correct[0] : item.correct;
    const isCorrect = microCheckState.selectedOption === correct;
    feedbackEl.textContent = isCorrect ? "Correct!" : "Not quite. Try again.";
    microCheckState.checked = isCorrect;

    document.querySelectorAll("#microCheckOptions .microcheck__option").forEach((btn) => {
        const isThisCorrect = btn.dataset.option === correct;
        btn.classList.toggle("is-correct", isThisCorrect && microCheckState.checked);
        btn.classList.toggle(
            "is-wrong",
            !isThisCorrect && btn.dataset.option === microCheckState.selectedOption && microCheckState.checked
        );
    });

    if (isCorrect) {
        if (continueBtn) continueBtn.disabled = false;
        if (closeBtn) closeBtn.disabled = false;
    }
}

function continueFromMicroCheck() {
    if (!microCheckState.checked) return;
    closeMicroCheckModal();
    if (microCheckState.pendingNextAdvance) {
        microCheckState.pendingNextAdvance = false;
        if (vocabModalState.list.length) {
            vocabModalState.index =
                (vocabModalState.index + 1) % vocabModalState.list.length;
            renderVocabModalFromState();
        }
    }
}

// ========================= HELPERS =========================
// ========================= WHITEBOARD =========================
const whiteboardState = {
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    ctx: null,
    color: "#111827",
    size: 3,
};

function getWhiteboardKeyForCurrentLesson() {
    return LS_WHITEBOARD_PREFIX + (appState.currentLessonId || "no_lesson");
}

function saveWhiteboardToLS() {
    const canvas = document.getElementById("whiteboardCanvas");
    if (!canvas) return;
    try {
        const dataUrl = canvas.toDataURL("image/png");
        localStorage.setItem(getWhiteboardKeyForCurrentLesson(), dataUrl);
    } catch {
        // ignore
    }
}

function loadWhiteboardFromLS() {
    const canvas = document.getElementById("whiteboardCanvas");
    if (!canvas) return;
    const dataUrl = localStorage.getItem(getWhiteboardKeyForCurrentLesson());
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!dataUrl) return;
    const img = new Image();
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = dataUrl;
}

function initWhiteboardCanvas() {
    const canvas = document.getElementById("whiteboardCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    whiteboardState.ctx = ctx;

    // إعدادات الرسم
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // تحميل أي رسم محفوظ
    loadWhiteboardFromLS();

    function getCanvasPos(evt) {
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        if (evt.touches && evt.touches.length > 0) {
            clientX = evt.touches[0].clientX;
            clientY = evt.touches[0].clientY;
        } else {
            clientX = evt.clientX;
            clientY = evt.clientY;
        }

        return {
            x: ((clientX - rect.left) / rect.width) * canvas.width,
            y: ((clientY - rect.top) / rect.height) * canvas.height,
        };
    }

    function startDrawing(evt) {
        evt.preventDefault();
        whiteboardState.isDrawing = true;
        const pos = getCanvasPos(evt);
        whiteboardState.lastX = pos.x;
        whiteboardState.lastY = pos.y;
    }

    function draw(evt) {
        if (!whiteboardState.isDrawing) return;
        evt.preventDefault();
        const pos = getCanvasPos(evt);
        ctx.strokeStyle = whiteboardState.color;
        ctx.lineWidth = whiteboardState.size;

        ctx.beginPath();
        ctx.moveTo(whiteboardState.lastX, whiteboardState.lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        whiteboardState.lastX = pos.x;
        whiteboardState.lastY = pos.y;
    }

    function stopDrawing(evt) {
        if (!whiteboardState.isDrawing) return;
        whiteboardState.isDrawing = false;
        saveWhiteboardToLS();
    }

    // Mouse events
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    // Touch events
    canvas.addEventListener("touchstart", startDrawing, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDrawing);
    canvas.addEventListener("touchcancel", stopDrawing);
}

// ========================= BACKUP SETTINGS =========================
function loadBackupSettings() {
    try {
        const raw = localStorage.getItem(LS_BACKUP_SETTINGS_KEY);
        if (!raw) {
            backupSettings = { frequency: "off", lastBackupAt: null };
            return;
        }
        const parsed = JSON.parse(raw);
        backupSettings = {
            frequency: parsed.frequency || "off",
            lastBackupAt: parsed.lastBackupAt || null,
        };
    } catch {
        backupSettings = { frequency: "off", lastBackupAt: null };
    }
}

function saveBackupSettings() {
    localStorage.setItem(LS_BACKUP_SETTINGS_KEY, JSON.stringify(backupSettings));
}

function backupFrequencyToDays(freq) {
    switch (freq) {
        case "daily":
            return 1;
        case "2d":
            return 2;
        case "weekly":
            return 7;
        default:
            return null; // off
    }
}

function checkBackupReminder() {
    const banner = document.getElementById("backupReminderBanner");
    const info = document.getElementById("backupLastInfo");
    if (!banner || !info) return;

    const daysLimit = backupFrequencyToDays(backupSettings.frequency);
    if (!daysLimit) {
        banner.classList.add("hidden");
        return;
    }

    if (!backupSettings.lastBackupAt) {
        // ما في ولا backup لسه
        banner.textContent =
            "You haven't created any backup yet. It's a good time to export your data now.";
        banner.classList.remove("hidden");
        info.textContent = "";
        return;
    }

    const last = new Date(backupSettings.lastBackupAt);
    const diffMs = Date.now() - last.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays >= daysLimit) {
        banner.textContent =
            `It has been about ${Math.round(diffDays)} day(s) since your last backup. ` +
            `Please export your data so you don't lose student progress.`;
        banner.classList.remove("hidden");
    } else {
        banner.classList.add("hidden");
    }

    info.textContent =
        "Last backup: " +
        last.toLocaleString() +
        "  |  Frequency: " +
        backupSettings.frequency;
}
// ========================= BACKUP EXPORT / IMPORT =========================
function buildBackupSnapshot() {
    return {
        version: 1,
        createdAt: new Date().toISOString(),
        students: appState.students || [],
        lessons: lessons || {},
        customUnits: customUnits || {},
        settings: {
            lessonFontSize: appState.lessonFontSize,
        },
    };
}

function downloadBackupFile(snapshot) {
    const json = JSON.stringify(snapshot, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    const date = new Date();
    const stamp =
        date.getFullYear().toString() +
        String(date.getMonth() + 1).padStart(2, "0") +
        String(date.getDate()).padStart(2, "0") +
        "_" +
        String(date.getHours()).padStart(2, "0") +
        String(date.getMinutes()).padStart(2, "0");

    a.href = url;
    a.download = `pal_arabic_backup_${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function handleExportBackup() {
    const snapshot = buildBackupSnapshot();
    downloadBackupFile(snapshot);

    // حدّث وقت آخر backup
    backupSettings.lastBackupAt = new Date().toISOString();
    saveBackupSettings();
    checkBackupReminder();
    alert("Backup exported successfully. Keep the JSON file in a safe place.");
}

function applyBackupSnapshot(snapshot) {
    if (!snapshot || typeof snapshot !== "object") {
        alert("Invalid backup file.");
        return;
    }

    // students
    if (Array.isArray(snapshot.students)) {
        appState.students = snapshot.students;
        saveStudentsToLS();
    }

    // lessons (نمحي القديم ونحط الجديد)
    if (snapshot.lessons && typeof snapshot.lessons === "object") {
        // clear current lessons
        Object.keys(lessons).forEach((id) => {
            delete lessons[id];
        });

        // clear old lesson entries from localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(LS_LESSON_PREFIX)) {
                localStorage.removeItem(key);
                i--; // لأن length تغير
            }
        }

        Object.keys(snapshot.lessons).forEach((id) => {
            lessons[id] = snapshot.lessons[id];
            saveLessonToLS(id);
        });
    }

    // custom units
    if (snapshot.customUnits && typeof snapshot.customUnits === "object") {
        customUnits = {
            Beginner: snapshot.customUnits.Beginner || [],
            "Pre-Intermediate": snapshot.customUnits["Pre-Intermediate"] || [],
            Intermediate: snapshot.customUnits.Intermediate || [],
        };
        saveCustomUnits();
    }

    // settings (زي حجم الخط)
    if (snapshot.settings) {
        if (typeof snapshot.settings.lessonFontSize === "number") {
            appState.lessonFontSize = snapshot.settings.lessonFontSize;
            applyFontSize();
            saveFontSize();
        }
    }

    // إعادة رسم الواجهات الرئيسية
    renderStudents();
    renderTeacherPicker();
    if (getCurrentStudent()) {
        renderLevels();
    }

    alert("Backup imported successfully.");
}

function handleImportBackupFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = e.target.result;
            const snapshot = JSON.parse(json);
            if (
                !confirm(
                    "Importing this backup will replace current students, lessons and units.\nAre you sure?"
                )
            ) {
                return;
            }
            applyBackupSnapshot(snapshot);
        } catch (err) {
            console.error(err);
            alert("Could not read backup file.");
        }
    };
    reader.readAsText(file);
}

const $ = (s) => document.querySelector(s);
const $all = (s) => Array.from(document.querySelectorAll(s));

const arabicLettersState = {
    selectedId: arabicLetters[0]?.id || null,
    tab: "letters",
    selectedForm: "initial",
    initialized: false,
    mode: "student",
};
const arabicLettersModalState = {
    open: false,
};
const arabicLettersExerciseState = {
    match: new Map(),
    order: new Map(),
    mcq: new Map(),
};

function renderArabicLettersScreen() {
    if (!arabicLettersState.initialized) return;
    renderArabicLettersExtras();
    renderArabicLettersGrid();
    renderArabicLetterDetail();
    renderArabicLettersSide();
    renderArabicLettersExercises();
    setArabicLettersTab(arabicLettersState.tab || "letters");
}

function initArabicLettersScreen() {
    const lettersGrid = $("#lettersGrid");
    if (!lettersGrid || arabicLettersState.initialized) return;

    const tabButtons = $all(".letters-tab-btn");
    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tab = btn.dataset.lettersTab || "letters";
            setArabicLettersTab(tab);
        });
    });

    lettersGrid.addEventListener("click", (event) => {
        const card = event.target.closest(".letter-card");
        if (!card) return;
        const letterId = card.dataset.letterId;
        if (!letterId) return;
        arabicLettersState.selectedId = letterId;
        renderArabicLettersGrid();
        renderArabicLetterDetail();
        openLetterModal();
    });

    const exercises = $("#lettersExercises");
    if (exercises) {
        exercises.addEventListener("click", handleArabicLettersExerciseClick);
    }
    const btnLetterModalPrev = $("#btnLetterModalPrev");
    const btnLetterModalNext = $("#btnLetterModalNext");
    if (btnLetterModalPrev) {
        btnLetterModalPrev.addEventListener("click", () => {
            selectAdjacentArabicLetter(-1);
        });
    }
    if (btnLetterModalNext) {
        btnLetterModalNext.addEventListener("click", () => {
            selectAdjacentArabicLetter(1);
        });
    }

    const letterModal = $("#letterModal");
    if (letterModal) {
        letterModal.addEventListener("click", (event) => {
            const btn = event.target.closest("[data-letter-form]");
            if (!btn) return;
            const form = btn.dataset.letterForm;
            if (!form) return;
            arabicLettersState.selectedForm = form;
            renderArabicLetterDetail();
        });
    }

    $all("[data-close-letter-modal]").forEach((el) =>
        el.addEventListener("click", () => closeLetterModal())
    );

    const lettersSide = $("#lettersSide");
    if (lettersSide) {
        lettersSide.addEventListener("click", (event) => {
            const btn = event.target.closest("[data-letters-mode]");
            if (!btn) return;
            const mode = btn.dataset.lettersMode;
            if (!mode) return;
            setArabicLettersMode(mode);
        });
    }

    arabicLettersState.initialized = true;
    renderArabicLettersScreen();
}

function setArabicLettersTab(tab) {
    arabicLettersState.tab = tab;
    const lettersTab = $("#lettersTabLetters");
    const exercisesTab = $("#lettersTabExercises");
    const tabButtons = $all(".letters-tab-btn");

    if (lettersTab) lettersTab.classList.toggle("letters-tab--active", tab === "letters");
    if (exercisesTab) exercisesTab.classList.toggle("letters-tab--active", tab === "exercises");
    tabButtons.forEach((btn) => {
        const isActive = btn.dataset.lettersTab === tab;
        btn.classList.toggle("is-active", isActive);
    });
}

function setArabicLettersMode(mode) {
    arabicLettersState.mode = mode === "teacher" ? "teacher" : "student";
    renderArabicLettersSide();
}

function renderArabicLettersExtras() {
    const extras = $("#lettersExtras");
    if (!extras) return;
    extras.innerHTML = arabicLettersExtras
        .map(
            (item) => `
            <div class="letters-extra">
                <div class="letters-extra__title">${item.title}</div>
                <div class="letters-extra__text">${item.text}</div>
            </div>
        `
        )
        .join("");
}

function buildArabicLettersExportHtml() {
    const extrasHtml = arabicLettersExtras
        .map(
            (item) => `
            <div class="extra-card">
                <div class="extra-title">${escapeHtml(item.title)}</div>
                <div class="extra-text">${escapeHtml(item.text)}</div>
            </div>
        `
        )
        .join("");

    const lettersHtml = arabicLetters
        .map((letter) => {
            const sunMoon = letter.sunMoon === "sun" ? "Sun" : "Moon";
            const examples = letter.examples || {};
            const exInitial =
                examples.initial?.arTashkeel || examples.initial?.ar || "";
            const exMedial =
                examples.medial?.arTashkeel || examples.medial?.ar || "";
            const exFinal =
                examples.final?.arTashkeel || examples.final?.ar || "";
            return `
                <div class="letter-card">
                    <div class="letter-glyph" lang="ar">${escapeHtml(letter.letter)}</div>
                    <div class="letter-name">${escapeHtml(letter.nameEn)} (${escapeHtml(letter.nameAr)})</div>
                    <div class="letter-meta">${escapeHtml(letter.sound)} · ${sunMoon}</div>
                    <div class="letter-forms">
                        <div><span>Isolated</span><strong lang="ar">${escapeHtml(letter.forms.isolated)}</strong></div>
                        <div>
                            <span>Initial</span>
                            <strong lang="ar">${escapeHtml(letter.forms.initial)}</strong>
                            <em lang="ar">${escapeHtml(exInitial)}</em>
                        </div>
                        <div>
                            <span>Medial</span>
                            <strong lang="ar">${escapeHtml(letter.forms.medial)}</strong>
                            <em lang="ar">${escapeHtml(exMedial)}</em>
                        </div>
                        <div>
                            <span>Final</span>
                            <strong lang="ar">${escapeHtml(letter.forms.final)}</strong>
                            <em lang="ar">${escapeHtml(exFinal)}</em>
                        </div>
                    </div>
                    <div class="letter-example">
                        <span lang="ar">${escapeHtml(letter.exampleAr)}</span>
                        <span class="example-roman">${escapeHtml(letter.exampleArabeezy)}</span>
                    </div>
                    <div class="letter-note">${escapeHtml(letter.note)}</div>
                </div>
            `;
        })
        .join("");

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Arabic Letters Export</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: "IBM Plex Sans Arabic", system-ui, sans-serif; margin: 20px; color: #0f172a; direction: rtl; }
    h1 { font-size: 20px; margin-bottom: 8px; }
    .subtitle { font-size: 12px; color: #64748b; margin-bottom: 14px; }
    .extras { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 16px; }
    .extra-card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 12px; }
    .extra-title { font-weight: 700; font-size: 12px; margin-bottom: 4px; }
    .extra-text { font-size: 11px; color: #475569; }
    .letters-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; }
    .letter-card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 12px; background: #fff; break-inside: avoid; page-break-inside: avoid; }
    .extra-card { break-inside: avoid; page-break-inside: avoid; }
    .letter-glyph { font-size: 32px; font-weight: 700; text-align: center; }
    .letter-name { text-align: center; font-weight: 600; margin-top: 4px; font-size: 13px; }
    .letter-meta { text-align: center; font-size: 11px; color: #64748b; margin-top: 2px; }
    .letter-forms { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; margin-top: 8px; }
    .letter-forms div { border: 1px solid #e2e8f0; border-radius: 8px; padding: 4px 6px; text-align: center; font-size: 11px; display: grid; gap: 2px; }
    .letter-forms span { display: block; color: #64748b; font-size: 9px; }
    .letter-forms strong { font-size: 13px; }
    .letter-forms em { font-style: normal; font-size: 11px; color: #475569; }
    .letter-example { margin-top: 6px; display: flex; justify-content: space-between; font-size: 11px; }
    .example-roman { color: #64748b; }
    .letter-note { margin-top: 6px; font-size: 10px; color: #64748b; }
    @media print { body { margin: 10mm; } }
  </style>
</head>
<body>
  <h1>Arabic Letters</h1>
  <div class="subtitle">Exported from Palestinian Arabic Local LMS</div>
  <div class="extras">${extrasHtml}</div>
  <div class="letters-grid">${lettersHtml}</div>
</body>
</html>`;
}

function exportArabicLettersPdf() {
    const html = buildArabicLettersExportHtml();
    const win = window.open("", "_blank");
    if (!win) {
        alert("Popup blocked – please allow popups to export PDF.");
        return;
    }
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
}

function renderArabicLettersSide() {
    const side = $("#lettersSide");
    if (!side) return;

    const letter =
        arabicLetters.find((item) => item.id === arabicLettersState.selectedId) || arabicLetters[0];
    const mode = arabicLettersState.mode || "student";

    const tips =
        mode === "teacher"
            ? [
                "Start with sound + example word out loud.",
                "Show isolated form, then connect it in a short word.",
                "Highlight if it connects to the left or not.",
                "Use one quick exercise before moving on.",
            ]
            : [
                "Tap a letter card to open details.",
                "Say the sound, then read the example word.",
                "Notice how the shape changes in a word.",
                "Try one exercise for practice.",
            ];

    const flow =
        mode === "teacher"
            ? ["Model", "Repeat", "Connect", "Check"]
            : ["See", "Say", "Trace", "Practice"];

    const noteLower = (letter?.note || "").toLowerCase();
    const connectsLeft = noteLower.includes("does not connect")
        ? "Does not connect left"
        : "Connects left";

    side.innerHTML = `
        <div class="letters-panel">
            <div class="letters-panel__title">Mode</div>
            <div class="letters-mode">
                <button class="letters-mode__btn ${mode === "student" ? "is-active" : ""}" data-letters-mode="student">Student</button>
                <button class="letters-mode__btn ${mode === "teacher" ? "is-active" : ""}" data-letters-mode="teacher">Teacher</button>
            </div>
            <div class="letters-panel__meta">Switch tips and flow to match who is using the screen.</div>
        </div>

        <div class="letters-panel letters-focus">
            <div class="letters-panel__title">Current Letter</div>
            <div class="letters-focus__glyph" lang="ar">${letter?.letter || ""}</div>
            <div class="letters-focus__name">${letter?.nameEn || ""} (${letter?.nameAr || ""})</div>
            <div class="letters-focus__chips">
                <span class="letters-chip">${letter?.sunMoon === "sun" ? "Sun letter" : "Moon letter"}</span>
                <span class="letters-chip">${connectsLeft}</span>
            </div>
            <div class="letters-focus__note">${letter?.note || ""}</div>
        </div>

        <div class="letters-panel">
            <div class="letters-panel__title">${mode === "teacher" ? "Teaching Tips" : "Learning Tips"}</div>
            <ul class="letters-tiplist">
                ${tips.map((tip) => `<li>${tip}</li>`).join("")}
            </ul>
        </div>

        <div class="letters-panel">
            <div class="letters-panel__title">Quick Flow</div>
            <div class="letters-flow">
                ${flow.map((step, i) => `<span class="letters-flow__step">${i + 1}. ${step}</span>`).join("")}
            </div>
        </div>
    `;
}

function renderArabicLettersGrid() {
    const lettersGrid = $("#lettersGrid");
    if (!lettersGrid) return;

    lettersGrid.innerHTML = arabicLetters
        .map((letter) => {
            const isActive = letter.id === arabicLettersState.selectedId;
            const sunMoon = letter.sunMoon === "sun" ? "sun" : "moon";
            return `
                <button class="letter-card ${isActive ? "letter-card--active" : ""}" data-letter-id="${letter.id}">
                    <span class="letter-card__glyph" lang="ar">${letter.letter}</span>
                    <span class="letter-card__name">${letter.nameEn}</span>
                    <span class="letter-card__badge letter-card__badge--${sunMoon}">
                        ${sunMoon === "sun" ? "Sun" : "Moon"}
                    </span>
                </button>
            `;
        })
        .join("");
}

function renderArabicLetterDetail() {
    const letter = arabicLetters.find((item) => item.id === arabicLettersState.selectedId) || arabicLetters[0];
    if (!letter) return;
    const glyph = $("#letterModalGlyph");
    const name = $("#letterModalName");
    const sound = $("#letterModalSound");
    const formIsolated = $("#letterModalFormIsolated");
    const formInitial = $("#letterModalFormInitial");
    const formMedial = $("#letterModalFormMedial");
    const formFinal = $("#letterModalFormFinal");
    const exampleAr = $("#letterModalExampleAr");
    const exampleArabeezy = $("#letterModalExampleArabeezy");
    const note = $("#letterModalNote");
    const sunMoon = $("#letterModalSunMoon");
    const writingSteps = $("#letterModalWritingSteps");

    if (glyph) glyph.textContent = letter.letter;
    if (name) name.textContent = `${letter.nameEn} (${letter.nameAr})`;
    if (sound) sound.textContent = `Sound: ${letter.sound}`;
    if (sunMoon) sunMoon.textContent = letter.sunMoon === "sun" ? "Sun letter" : "Moon letter";
    if (formIsolated) formIsolated.textContent = letter.forms.isolated;
    if (formInitial) formInitial.textContent = letter.forms.initial;
    if (formMedial) formMedial.textContent = letter.forms.medial;
    if (formFinal) formFinal.textContent = letter.forms.final;
    if (exampleAr) exampleAr.textContent = letter.exampleAr;
    if (exampleArabeezy) exampleArabeezy.textContent = letter.exampleArabeezy;
    if (note) note.textContent = letter.note;

    renderLetterFormExample(letter);
    renderLetterFormButtons();
    renderLetterWritingSteps(letter, writingSteps);
    renderArabicLettersSide();
}

function selectAdjacentArabicLetter(direction) {
    const currentIndex = arabicLetters.findIndex((item) => item.id === arabicLettersState.selectedId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + arabicLetters.length) % arabicLetters.length;
    arabicLettersState.selectedId = arabicLetters[nextIndex].id;
    renderArabicLettersGrid();
    renderArabicLetterDetail();
    if (arabicLettersModalState.open) openLetterModal();
}

function openLetterModal() {
    const modal = $("#letterModal");
    if (!modal) return;
    arabicLettersState.selectedForm = arabicLettersState.selectedForm || "initial";
    renderArabicLetterDetail();
    modal.classList.add("modal--open");
    arabicLettersModalState.open = true;
}

function closeLetterModal() {
    const modal = $("#letterModal");
    if (!modal) return;
    modal.classList.remove("modal--open");
    arabicLettersModalState.open = false;
}

function renderLetterFormExample(letter) {
    const label = $("#letterModalExampleLabel");
    const exampleAr = $("#letterModalExampleFormAr");
    const exampleArabeezy = $("#letterModalExampleFormArabeezy");
    const form = arabicLettersState.selectedForm || "initial";
    const example = letter.examples?.[form];

    if (label) {
        const labelText =
            form === "isolated"
                ? "Example (Isolated)"
                : form === "initial"
                    ? "Example (Beginning)"
                    : form === "medial"
                        ? "Example (Middle)"
                        : "Example (End)";
        label.textContent = labelText;
    }
    if (exampleAr) exampleAr.textContent = example?.ar || "";
    if (exampleArabeezy) exampleArabeezy.textContent = example?.arabeezy || "";
}

function renderLetterFormButtons() {
    $all(".letter-form--btn").forEach((btn) => {
        const form = btn.dataset.letterForm;
        btn.classList.toggle("letter-form--active", form === arabicLettersState.selectedForm);
    });
}

function renderLetterWritingSteps(letter, listEl) {
    if (!listEl) return;
    const steps =
        letter.writingSteps && letter.writingSteps.length
            ? letter.writingSteps
            : [
                "Start at the top guideline, then follow the curve smoothly.",
                "Lift the pen only when the stroke ends.",
                "Practice isolated, then connect it in a short word.",
            ];
    listEl.innerHTML = steps.map((step) => `<li>${step}</li>`).join("");
}

function renderArabicLettersExercises() {
    const exercises = $("#lettersExercises");
    if (!exercises) return;

    exercises.innerHTML = arabicLettersExercises
        .map((exercise) => {
            if (exercise.type === "match") return renderArabicLettersMatch(exercise);
            if (exercise.type === "order") return renderArabicLettersOrder(exercise);
            if (exercise.type === "mcq") return renderArabicLettersMcq(exercise);
            return "";
        })
        .join("");

    arabicLettersExercises.forEach((exercise) => {
        if (exercise.type === "match") {
            arabicLettersExerciseState.match.set(exercise.id, {
                selectedLeft: null,
                pairs: exercise.pairs,
                matchedLeft: new Set(),
                matchedRight: new Set(),
            });
        }
        if (exercise.type === "order") {
            arabicLettersExerciseState.order.set(exercise.id, {
                current: [],
                answer: exercise.answer,
            });
        }
        if (exercise.type === "mcq") {
            arabicLettersExerciseState.mcq.set(exercise.id, {
                selected: null,
                answer: exercise.answer,
            });
        }
    });
}

function renderArabicLettersMatch(exercise) {
    const rightItems = shuffleArray(exercise.pairs.map((item) => item.right));
    return `
        <div class="exercise-card" data-exercise-id="${exercise.id}" data-exercise-type="match">
            <div class="exercise-title">Match</div>
            <div class="exercise-prompt">${exercise.prompt}</div>
            <div class="match-grid">
                <div class="match-column">
                    ${exercise.pairs
            .map(
                (pair) => `
                        <button class="match-item" data-match-left="${pair.left}">
                            ${pair.left}
                        </button>
                    `
            )
            .join("")}
                </div>
                <div class="match-column">
                    ${rightItems
            .map(
                (item) => `
                        <button class="match-item" data-match-right="${item}" lang="ar">
                            ${item}
                        </button>
                    `
            )
            .join("")}
                </div>
            </div>
        </div>
    `;
}

function renderArabicLettersOrder(exercise) {
    const pool = shuffleArray(exercise.pool);
    return `
        <div class="exercise-card" data-exercise-id="${exercise.id}" data-exercise-type="order">
            <div class="exercise-title">Build it</div>
            <div class="exercise-prompt">${exercise.prompt}</div>
            <div class="order-answer" data-order-answer></div>
            <div class="order-pool">
                ${pool
            .map(
                (item) => `
                    <button class="order-chip" data-order-item="${item}" lang="ar">
                        ${item}
                    </button>
                `
            )
            .join("")}
            </div>
            <div class="order-status" data-order-status>Tap letters to build the word.</div>
            <div class="order-controls" style="margin-top:8px; display:flex; gap:8px;">
                <button class="btn btn--ghost btn--sm" data-order-action="undo">Undo</button>
                <button class="btn btn--ghost btn--sm" data-order-action="reset">Reset</button>
            </div>
        </div>
    `;
}

function renderArabicLettersMcq(exercise) {
    return `
        <div class="exercise-card" data-exercise-id="${exercise.id}" data-exercise-type="mcq">
            <div class="exercise-title">Choose</div>
            <div class="exercise-prompt">${exercise.prompt}</div>
            <div class="mcq-options">
                ${exercise.options
            .map(
                (item) => `
                    <button class="mcq-option" data-mcq-option="${item}" lang="ar">${item}</button>
                `
            )
            .join("")}
            </div>
        </div>
    `;
}

function handleArabicLettersExerciseClick(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const exerciseCard = target.closest("[data-exercise-id]");
    if (!exerciseCard) return;
    const exerciseId = exerciseCard.dataset.exerciseId;
    const exerciseType = exerciseCard.dataset.exerciseType;

    if (exerciseType === "match") handleArabicLettersMatchClick(exerciseId, exerciseCard, target);
    if (exerciseType === "order") handleArabicLettersOrderClick(exerciseId, exerciseCard, target);
    if (exerciseType === "mcq") handleArabicLettersMcqClick(exerciseId, exerciseCard, target);
}

function handleArabicLettersMatchClick(exerciseId, exerciseCard, target) {
    const state = arabicLettersExerciseState.match.get(exerciseId);
    if (!state) return;

    const leftBtn = target.closest("[data-match-left]");
    const rightBtn = target.closest("[data-match-right]");

    if (leftBtn) {
        const leftValue = leftBtn.dataset.matchLeft;
        if (state.matchedLeft.has(leftValue)) return;
        state.selectedLeft = leftValue;
        exerciseCard.querySelectorAll("[data-match-left]").forEach((btn) => {
            btn.classList.toggle("is-selected", btn.dataset.matchLeft === leftValue);
        });
        return;
    }

    if (rightBtn && state.selectedLeft) {
        const rightValue = rightBtn.dataset.matchRight;
        if (state.matchedRight.has(rightValue)) return;
        const expected = state.pairs.find((pair) => pair.left === state.selectedLeft)?.right;

        if (expected === rightValue) {
            state.matchedLeft.add(state.selectedLeft);
            state.matchedRight.add(rightValue);
            exerciseCard
                .querySelector(`[data-match-left="${state.selectedLeft}"]`)
                ?.classList.add("is-correct");
            rightBtn.classList.add("is-correct");
        } else {
            rightBtn.classList.add("is-wrong");
            setTimeout(() => rightBtn.classList.remove("is-wrong"), 500);
        }

        state.selectedLeft = null;
        exerciseCard.querySelectorAll("[data-match-left]").forEach((btn) => {
            btn.classList.remove("is-selected");
        });
    }
}

function handleArabicLettersOrderClick(exerciseId, exerciseCard, target) {
    const state = arabicLettersExerciseState.order.get(exerciseId);
    if (!state) return;

    const orderItem = target.closest("[data-order-item]");
    const actionBtn = target.closest("[data-order-action]");

    if (orderItem) {
        if (state.current.length >= state.answer.length) return;
        state.current.push(orderItem.dataset.orderItem);
        updateArabicLettersOrderState(state, exerciseCard);
        return;
    }

    if (actionBtn) {
        const action = actionBtn.dataset.orderAction;
        if (action === "undo") state.current.pop();
        if (action === "reset") state.current = [];
        updateArabicLettersOrderState(state, exerciseCard);
    }
}

function updateArabicLettersOrderState(state, exerciseCard) {
    const answerEl = exerciseCard.querySelector("[data-order-answer]");
    const statusEl = exerciseCard.querySelector("[data-order-status]");
    if (!answerEl || !statusEl) return;

    answerEl.innerHTML = state.current
        .map((item) => `<span class="order-chip" lang="ar">${item}</span>`)
        .join("");

    const isComplete = state.current.length === state.answer.length;
    const isCorrect = isComplete && state.current.join("") === state.answer.join("");
    if (isCorrect) {
        statusEl.textContent = "Great! You built the word.";
    } else if (isComplete) {
        statusEl.textContent = "Almost! Try again.";
    } else {
        statusEl.textContent = "Tap letters to build the word.";
    }
}

function handleArabicLettersMcqClick(exerciseId, exerciseCard, target) {
    const option = target.closest("[data-mcq-option]");
    if (!option) return;
    const state = arabicLettersExerciseState.mcq.get(exerciseId);
    if (!state) return;

    const selected = option.dataset.mcqOption;
    const isCorrect = selected === state.answer;
    exerciseCard.querySelectorAll("[data-mcq-option]").forEach((btn) => {
        btn.classList.remove("is-correct", "is-wrong");
    });
    option.classList.add(isCorrect ? "is-correct" : "is-wrong");
}
function openExportModal(source, lessonId, studentName = "") {
    exportContext.lessonId = lessonId;
    exportContext.studentName = studentName;
    exportContext.source = source;

    const modal = document.getElementById("exportModal");
    if (modal) modal.classList.add("modal--open");
}

function closeExportModal() {
    const modal = document.getElementById("exportModal");
    if (modal) modal.classList.remove("modal--open");
}

async function saveStudentsToCloud() {
    if (!appState.currentUser || appState.currentUser.role !== "teacher") return;

    const batch = db.batch();
    const ref = db.collection("teacherStudents");

    // نفضي كل طلاب هذا المعلم ثم نرفع من جديد (بسيطة مبدئيًا)
    const snap = await ref.where("teacherId", "==", appState.currentUser.uid).get();
    snap.forEach((doc) => batch.delete(doc.ref));

    appState.students.forEach((s) => {
        const docRef = ref.doc(s.id);
        batch.set(docRef, {
            teacherId: appState.currentUser.uid,
            name: s.name,
            level: s.level,
            goals: s.goals || [],
            progress: s.progress || {},
            homeworkNotes: s.homeworkNotes || {},
            lastSeen: s.lastSeen || null,
        });
    });

    await batch.commit();
}

function saveStudentsToLS({ skipCloud = false } = {}) {
    localStorage.setItem(LS_STUDENTS_KEY, JSON.stringify(appState.students));
    if (!skipCloud) scheduleCloudSave();
}


async function syncTeacherStudentsFromCloud() {
    if (!appState.currentUser || appState.currentUser.role !== "teacher") return;
    try {

    const ref = db.collection("teacherStudents");
    const snap = await ref.where("teacherId", "==", appState.currentUser.uid).get();

    const loaded = [];
    snap.forEach((doc) => {
        const d = doc.data();
        loaded.push({
            id: doc.id, // أو خلي ID محلي منفصل
            name: d.name,
            level: d.level,
            goals: d.goals || [],
            progress: d.progress || {},
            homeworkNotes: d.homeworkNotes || {},
            lastSeen: d.lastSeen || null,
        });
    });

    appState.students = loaded;
    saveStudentsToLS({ skipCloud: true }); // نخزن نسخة محلية
    } catch (err) {
        console.warn("Could not sync teacher students from cloud, using local students.", err);
        appState.students = loadStudentsFromLS();
    }
}

function loadStudentsFromLS() {
    try {
        const raw = localStorage.getItem(LS_STUDENTS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function ensureStudentProgress(student, lessonId) {
    if (!student.progress) student.progress = {};
    if (!student.progress[lessonId]) {
        student.progress[lessonId] = { ...BASE_PROGRESS_TEMPLATE };
    } else {
        Object.keys(BASE_PROGRESS_TEMPLATE).forEach((key) => {
            if (!(key in student.progress[lessonId])) {
                student.progress[lessonId][key] = BASE_PROGRESS_TEMPLATE[key];
            }
        });
    }
}

function getCurrentStudent() {
    if (appState.currentUser && appState.currentUser.role === "guest") {
        return appState.guestStudent || null;
    }
    return appState.students.find((s) => s.id === appState.currentStudentId) || null;
}

function getStudentProgress(student, lessonId) {
    ensureStudentProgress(student, lessonId);
    return student.progress[lessonId];
}

function setStudentProgressField(sectionKey, value) {
    const student = getCurrentStudent();
    if (!student) return;
    ensureStudentProgress(student, appState.currentLessonId);
    student.progress[appState.currentLessonId][sectionKey] = value;
    saveStudentsToLS();
    updateProgressBar();
    updateSectionStatusBadge(sectionKey);
}

// lessons save/load
function loadLessonDataFromLS() {
    // start from defaults
    Object.keys(defaultLessons).forEach((id) => {
        lessons[id] = JSON.parse(JSON.stringify(defaultLessons[id]));
    });

    // then override / add from localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(LS_LESSON_PREFIX)) {
            const id = key.slice(LS_LESSON_PREFIX.length);
            try {
                const data = JSON.parse(localStorage.getItem(key));
                lessons[id] = data;
            } catch {
                /* ignore */
            }
        }
    }

    // Sanitize/normalize lessons loaded from localStorage (old/partial/corrupted entries can exist)
    Object.keys(lessons).forEach((id) => {
        const lesson = lessons[id];
        if (!lesson || typeof lesson !== "object") {
            delete lessons[id];
            return;
        }
        if (!lesson.meta || typeof lesson.meta !== "object") lesson.meta = {};
        lesson.meta.level = (lesson.meta.level || "").trim();
        lesson.meta.unit = (lesson.meta.unit || "").trim();
        lesson.meta.lessonTitle = (lesson.meta.lessonTitle || "").trim();

        // If meta is still missing core fields, drop it (prevents runtime crashes in teacher picker)
        if (!lesson.meta.level || !lesson.meta.unit || !lesson.meta.lessonTitle) {
            delete lessons[id];
            return;
        }

        if (!lesson.vocabulary) lesson.vocabulary = { core: [], extra: [] };
        if (!Array.isArray(lesson.vocabulary.core)) lesson.vocabulary.core = [];
        if (!Array.isArray(lesson.vocabulary.extra)) lesson.vocabulary.extra = [];

        if (!Array.isArray(lesson.useInLife)) lesson.useInLife = [];

        if (!lesson.dialogue) lesson.dialogue = { lines: [] };
        if (!Array.isArray(lesson.dialogue.lines)) lesson.dialogue.lines = [];

        if (!Array.isArray(lesson.grammar)) lesson.grammar = [];
        if (lesson.grammarTab && typeof lesson.grammarTab === "object") {
            delete lesson.grammarTab;
        }

        if (!lesson.practice) lesson.practice = { quiz: [], rolePlays: [], translation: [] };
        if (!Array.isArray(lesson.practice.quiz)) lesson.practice.quiz = [];
        if (!Array.isArray(lesson.practice.rolePlays)) lesson.practice.rolePlays = [];
        if (!Array.isArray(lesson.practice.translation)) lesson.practice.translation = [];

        if (!lesson.microChecks || typeof lesson.microChecks !== "object") {
            lesson.microChecks = { enabled: false, every: 5, items: [] };
        }
        lesson.microChecks.enabled = true;
        if (!Number.isFinite(lesson.microChecks.every)) lesson.microChecks.every = 5;
        if (!Array.isArray(lesson.microChecks.items)) lesson.microChecks.items = [];
    });
}
function markVocabularyDone() {
    // هذي الدالة تعتمد إنو عندك setStudentProgressField موجودة
    // وتشتغل على الدرس والطالب الحاليين
    try {
        setStudentProgressField("vocabulary", true);
    } catch (e) {
        console.warn("Could not mark vocabulary as done:", e);
    }
}

function saveLessonToLS(lessonId) {
    localStorage.setItem(LS_LESSON_PREFIX + lessonId, JSON.stringify(lessons[lessonId]));
}

// custom units
function loadCustomUnits() {
    try {
        const raw = localStorage.getItem(LS_CUSTOM_UNITS_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            customUnits = {
                Beginner: parsed.Beginner || [],
                "Pre-Intermediate": parsed["Pre-Intermediate"] || [],
                Intermediate: parsed.Intermediate || [],
            };
        }
    } catch {
        /* ignore */
    }
}
function saveCustomUnits() {
    localStorage.setItem(LS_CUSTOM_UNITS_KEY, JSON.stringify(customUnits));
}

// font size
function loadFontSize() {
    const raw = localStorage.getItem(LS_FONT_SIZE_KEY);
    if (!raw) {
        appState.lessonFontSize = 1;
    } else {
        const n = parseFloat(raw);
        appState.lessonFontSize = isNaN(n) ? 1 : n;
    }
    applyFontSize();
}
function saveFontSize() {
    localStorage.setItem(LS_FONT_SIZE_KEY, String(appState.lessonFontSize));
}
function applyFontSize() {
    const v = Math.max(0.85, Math.min(1.4, appState.lessonFontSize));
    document.documentElement.style.setProperty("--lesson-font-size", v + "rem");
}

// ========================= NAVIGATION =========================
function showScreen(id) {
    $all(".screen").forEach((sec) =>
        sec.classList.toggle("screen--active", sec.id === id)
    );
}

function goToHome() {
    persistResumeBeforeNav();
    // ندخل وضع الصفحة الرئيسية فقط
    document.body.classList.add("home-only");

    // نخلي بس الهوم screen هي الظاهرة
    showScreen("home-screen");
}

function goToStudents() {
    persistResumeBeforeNav();
    const role = appState.currentUser?.role || "";
    if (!appState.currentUser || role === "student" || role === "guest") {
        if (getCurrentStudent()) {
            goToLevels();
        } else {
            goToHome();
        }
        return;
    }
    document.body.classList.remove("home-only");
    showScreen("students-screen");
    renderStudents();
}

function goToLevels() {
    persistResumeBeforeNav();
    document.body.classList.remove("home-only");
    if (isGuestUser() && appState.guestStudent && !appState.currentStudentId) {
        appState.currentStudentId = appState.guestStudent.id;
    }
    const currentStudent = getCurrentStudent();
    if (!currentStudent) {
        if (appState.currentUser?.role === "teacher") {
            goToStudents();
        } else {
            goToHome();
        }
        return;
    }
    showScreen("levels-screen");
    $("#currentStudentNameLevels").textContent = currentStudent.name;
    const btnSwitchProfile = $("#btnSwitchProfile");
    const btnGoTeacherDashboard = $("#btnGoTeacherDashboard");
    if (btnSwitchProfile) btnSwitchProfile.style.display = isGuestUser() ? "none" : "inline-flex";
    if (btnGoTeacherDashboard) btnGoTeacherDashboard.style.display = isGuestUser() ? "none" : "inline-flex";
    renderLevels();
    updateContinueButton();
}

function goToArabicLetters() {
    persistResumeBeforeNav();
    document.body.classList.remove("home-only");
    showScreen("arabic-letters-screen");
    renderArabicLettersScreen();
}
function goToLessonView(opts = {}) {
    const { teacherMode = null } = opts;
    if (!getCurrentStudent()) {
        goToStudents();
        return;
    }
    if (isGuestUser() && !isGuestAllowedLesson(appState.currentLessonId)) {
        toast("Guest access is limited to the first two units.");
        goToSubscribeScreen();
        return;
    }
    showScreen("lesson-screen");
    if (teacherMode !== null) {
        appState.teacherMode = teacherMode;
        $("#teacherModeToggle").checked = teacherMode;
    }
    updateTeacherTabsVisibility();
    updateLessonTopBar();
    updateProgressBar();
    const lesson = lessons[appState.currentLessonId];
    updateLessonTabsVisibility(lesson);
    appState.currentTab = normalizeLessonTabKey(appState.currentTab, lesson);
    setActiveTab(appState.currentTab || "overview");

    // حاول يحمّل whiteboard حق هذا الدرس لو اللوحة مفتوحة
    const whiteboardPanel = document.getElementById("whiteboardPanel");
    if (whiteboardPanel && !whiteboardPanel.classList.contains("hidden")) {
        initWhiteboardCanvas();
    }
}

function buildLessonExportHtml(lesson, options) {
    const {
        includeVocab,
        includeDialogue,
        includeGrammar,
        includeHomework,
        includeTeacherNotes,
        version,
        studentName,
    } = options;

    const escapeHtml = (str) =>
        String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // ========== Vocabulary ==========
    let vocabRows = "";
    if (includeVocab && lesson.vocabulary) {
        const allVocab = [
            ...(lesson.vocabulary.core || []),
            ...(lesson.vocabulary.extra || []),
        ];
        allVocab.forEach((w) => {
            vocabRows += `
            <tr>
                <td class="ar">${escapeHtml(w.ar)}</td>
                <td class="en">${escapeHtml(w.en)}</td>
                
                <td class="en">${escapeHtml(w.enArabeezy)}</td>
                <td class="en">
                    ${escapeHtml(w.exampleAr || "")}
                    ${w.exampleAr || w.exampleArabeezy || w.exampleEn ? " - " : ""}
                    ${escapeHtml(w.exampleArabeezy || "")}
                    ${w.exampleArabeezy && w.exampleEn ? " - " : ""}
                    ${escapeHtml(w.exampleEn || "")}
                </td>
            </tr>`;
        });
    }

    // ========== Dialogue ==========
    let dialogueHtml = "";
    if (includeDialogue && lesson.dialogue && lesson.dialogue.lines) {
        dialogueHtml = lesson.dialogue.lines
            .map(
                (line) => `
                <div class="dialogue-line">
                    <span class="speaker">${escapeHtml(line.speaker)}:</span>
                    <div class="dialogue-ar">${escapeHtml(line.ar)}</div>
                    ${line.arArabeezy || line.arabeezy
                        ? `<div class="dialogue-arabeezy">${escapeHtml(line.arArabeezy || line.arabeezy)}</div>`
                        : ""}
                    ${line.en
                        ? `<span class="dialogue-en">${escapeHtml(line.en)}</span>`
                        : ""
                    }
                </div>
            `
            )
            .join("");
    }

    // ========== Grammar ==========
    let grammarHtml = "";
    if (includeGrammar && lesson.grammar && lesson.grammar.length) {
        grammarHtml = lesson.grammar
            .map((g) => {
                const desc = g.description ? `<p>${escapeHtml(g.description)}</p>` : "";
                let tableHtml = "";
                if (g.table && Array.isArray(g.table.headers) && Array.isArray(g.table.rows)) {
                    const headCells = g.table.headers
                        .map((h) => `<th>${escapeHtml(h)}</th>`)
                        .join("");
                    const bodyRows = g.table.rows
                        .map(
                            (row) =>
                                `<tr>${row
                                    .map((cell) => `<td>${escapeHtml(cell)}</td>`)
                                    .join("")}</tr>`
                        )
                        .join("");
                    tableHtml = `
                        <div class="grammar-table">
                            <div class="grammar-table__title">${escapeHtml(g.table.title || "Table")}</div>
                            <table class="grammar-table__table">
                                <thead><tr>${headCells}</tr></thead>
                                <tbody>${bodyRows}</tbody>
                            </table>
                        </div>`;
                }

                const examples = Array.isArray(g.examples) ? g.examples : [];
                const examplesHtml = examples.length
                    ? `<div class="grammar-examples">
                            <div class="grammar-examples__title">Examples</div>
                            ${examples
                        .map(
                            (ex) => `
                                <div class="grammar-example">
                                    <div class="grammar-example__ar">${escapeHtml(ex.ar || "")}</div>
                                    <div class="grammar-example__arabeezy">${escapeHtml(ex.arabeezy || "")}</div>
                                    <div class="grammar-example__en">${escapeHtml(ex.en || "")}</div>
                                </div>`
                        )
                        .join("")}
                        </div>`
                    : "";

                const teacherNotes =
                    includeTeacherNotes && version === "teacher"
                        ? `<div class="grammar-teacher">
                                <div class="grammar-teacher__title">Teacher Notes</div>
                                <div class="grammar-teacher__text">${escapeHtml(
                            g.teacherNotes || ""
                        )}</div>
                           </div>`
                        : "";

                return `<div class="grammar-item">
                            <h4>${escapeHtml(g.title)}</h4>
                            ${desc}
                            ${tableHtml}
                            ${examplesHtml}
                            ${teacherNotes}
                        </div>`;
            })
            .join("");
    }

    // ========== Homework ==========
    let homeworkHtml = "";
    if (includeHomework && lesson.homework && lesson.homework.instructions) {
        homeworkHtml = `<p>${escapeHtml(lesson.homework.instructions)}</p>`;
    }

    // ========== Teacher Notes ==========
    let teacherNotesHtml = "";
    const notes = lesson.teacherNotes && lesson.teacherNotes.myNotes;
    if (includeTeacherNotes && version === "teacher" && notes) {
        teacherNotesHtml = `<p>${escapeHtml(notes)}</p>`;
    }

    return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<title>Lesson Export – ${escapeHtml(lesson.meta.lessonTitle)}</title>
<style>
    body {
        font-family:
            "Amiri",
            "Scheherazade New",
            "IBM Plex Sans Arabic",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        margin: 20px;
        color: #111827;
        
      
    }
        .headtext{
         direction: center;
          text-align: center;
        }
    h1, h2, h3, h4 {
        margin: 0 0 6px;
        color: #0f172a;
    }
    h1 {
        font-size: 20px;
        margin-bottom: 10px;
        
    }
    .meta {
        font-size: 12px;
        margin-bottom: 14px;
         direction: ltr;
    }
    .meta div {
        margin-bottom: 2px;
    }
    .section {
    
        margin-top: 12px;
        padding-top: 10px;
        border-top: 1px solid #e5e7eb;
        /* 🔴 مهم: شلنا page-break-inside: avoid; عشان ما يطير القسم كله لصفحة جديدة ويترك الهيدر لحاله */
    }
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11px;
        direction: rtl; /* الجدول نفسه RTL */
    }
    th, td {
        border: 1px solid #e5e7eb;
        padding: 4px 6px;
        vertical-align: top;
    }
    th {
        background: #e0f2fe;
    }
    .ar {
        direction: rtl;
        text-align: right;
        font-family: "Amiri", "Scheherazade New", "IBM Plex Sans Arabic", system-ui, sans-serif;
        font-size: 20px;
    }
    .en {
        direction: ltr;
        text-align: left;
        font-size: 20px;
    }
    .small-note {
        font-size: 12px;
        color: #6b7280;
        margin-top: 4px;
        direction: ltr;
    }
    .grammar-item {
        margin-bottom: 8px;
        font-size: 18px;
        direction: ltr;
    }
    .grammar-item h4 {
        font-size: 18px;
        margin-bottom: 2px;
        direction: ltr;
    }
    .section-title {
        display:flex;
        justify-content:space-between;
        align-items:baseline;
        
    }
    .badge {
        font-size:10px;
        padding:2px 6px;
        border-radius:999px;
        background:#e5f9f5;
        color:#047857;
    }

    /* 🗨️ المحادثة RTL مع الإنجليزي تحت */
    .dialogue-line {
        margin-bottom: 6px;
        direction: rtl;
        text-align: right;
        font-size: 24px;
    }
    .speaker {
        font-weight: 700;
        margin-left: 4px;
    }
    .dialogue-ar {
        font-family: "Amiri", "Scheherazade New", "IBM Plex Sans Arabic", system-ui, sans-serif;
    }
    .dialogue-en {
        display: block;
       
        font-size: 20px;
        color: #4b5563;
        margin-right: 2em; /* شوي مسافة عن اسم المتحدث */
    }

    @media print {
        body { margin: 10mm; }
        .small-note { display:none; }
    }
</style>
</head>
<body>
    <h1 class="headtext">Palestinian Arabic – ${escapeHtml(lesson.meta.lessonTitle)}</h1>
    <div class="meta" >
        <div><strong>Level:</strong> ${escapeHtml(lesson.meta.level)}</div>
        <div><strong>Unit:</strong> ${escapeHtml(lesson.meta.unit)}</div>
        ${studentName
            ? `<div><strong>Student:</strong> ${escapeHtml(studentName)}</div>`
            : ""
        }
        <div><strong>Version:</strong> ${version === "teacher" ? "Teacher" : "Student"
        }</div>
    </div>

    ${vocabRows
            ? `<div class="section">
                <div class="section-title">
                    <h2>المفردات – Vocabulary</h2>
                    <span class="badge">Core & Extra</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>العربي</th>
                            <th>English</th>
                            <th>enArabeezy</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vocabRows}
                    </tbody>
                </table>
            </div>`
            : ""
        }

    ${dialogueHtml
            ? `<div class="section">
                <h2>المحادثة – Dialogue</h2>
                ${dialogueHtml}
            </div>`
            : ""
        }

    ${grammarHtml
            ? `<div class="section">
                <h2>القواعد – Grammar</h2>
                ${grammarHtml}
            </div>`
            : ""
        }

    ${homeworkHtml
            ? `<div class="section">
                <h2>الواجب – Homework</h2>
                ${homeworkHtml}
            </div>`
            : ""
        }

    ${teacherNotesHtml
            ? `<div class="section">
                <h2>ملاحظات المعلم – Teacher Notes</h2>
                ${teacherNotesHtml}
            </div>`
            : ""
        }

    <p class="small-note">
        Generated from Palestinian Arabic Local LMS – you can print or save as PDF from your browser.
    </p>
</body>
</html>
        </div>
      </div>
    `;
}


function openPrintWindow(html) {
    const win = window.open("", "_blank");
    if (!win) {
        alert("Popup blocked – please allow popups to export PDF.");
        return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    // نعطيه وقت بسيط يرنّدر قبل الطباعة
    win.focus();
    setTimeout(() => {
        win.print();
    }, 300);
}

function goToTeacherDashboard() {
    persistResumeBeforeNav();
    // لو مش مسجل، أو مش مدرّس:
    if (!appState.currentUser || appState.currentUser.role !== "teacher") {
        // بدل ما نعمل alert بس، نفتحه على مودال تسجيل دخول المدرّس
        if (typeof openAuthModal === "function") {
            openAuthModal("teacher");
        } else {
            alert("Teacher access only.");
        }
        return;
    }
    document.body.classList.remove("home-only")
    showScreen("teacher-dashboard-screen");
    renderTeacherPicker();
}




// ========================= STUDENTS =========================
function renderStudents() {
    const grid = $("#studentsGrid");
    const empty = $("#noStudentsMessage");
    grid.innerHTML = "";

    if (!appState.students.length) {
        empty.style.display = "block";
        return;
    }
    empty.style.display = "none";

    appState.students.forEach((student) => {
        const card = document.createElement("article");
        card.className = "student-card";

        const avatar = document.createElement("div");
        avatar.className = "student-card__avatar";
        avatar.textContent = student.name.charAt(0).toUpperCase();

        const nameEl = document.createElement("div");
        nameEl.className = "student-card__name";
        nameEl.textContent = student.name;

        const levelEl = document.createElement("div");
        levelEl.className = "student-card__level";
        levelEl.textContent = `Level: ${student.level}`;

        const goalsWrap = document.createElement("div");
        goalsWrap.className = "student-card__goals";

        const goals = student.goals || [];
        if (goals.length) {
            const map = {
                Travel: "✈️ Travel",
                Study: "🎓 Study",
                Family: "👨‍👩‍👧 Family",
                VisitPalestine: "🕌 Visit Palestine",
                Work: "💼 Work",
                Fun: "😊 For Fun",
            };
            goals.forEach((g) => {
                const tag = document.createElement("span");
                tag.className = "goal-tag";
                tag.textContent = map[g] || g;
                goalsWrap.appendChild(tag);
            });
        } else if (student.goal) {
            const tag = document.createElement("span");
            tag.className = "goal-tag";
            tag.textContent = student.goal;
            goalsWrap.appendChild(tag);
        }

        const footer = document.createElement("div");
        footer.className = "student-card__footer";

        const btnContinue = document.createElement("button");
        btnContinue.className = "btn btn--primary btn--sm";
        btnContinue.textContent = "Continue Learning";
        btnContinue.addEventListener("click", () => {
            appState.currentStudentId = student.id;
            // If teacher saved a resume spot for this student, go there
            if (!tryResumeStudent(student)) {
                setStudentLessonContext(student);
                goToLevels();
            }
        });

        const btnDelete = document.createElement("button");
        btnDelete.className = "student-card__delete";
        btnDelete.textContent = "❌";
        btnDelete.addEventListener("click", () => {
            if (!confirm(`Delete student "${student.name}"?`)) return;
            appState.students = appState.students.filter((s) => s.id !== student.id);
            saveStudentsToLS();
            if (appState.currentStudentId === student.id) appState.currentStudentId = null;
            renderStudents();
        });

        footer.appendChild(btnContinue);
        footer.appendChild(btnDelete);

        card.appendChild(avatar);
        card.appendChild(nameEl);
        card.appendChild(levelEl);
        card.appendChild(goalsWrap);
        card.appendChild(footer);

        grid.appendChild(card);
    });
}

// ========================= LEVELS & UNITS =========================
function findLessonIdFor(levelName, unitName) {
    return Object.keys(lessons).find(
        (id) =>
            lessons[id].meta &&
            lessons[id].meta.level === levelName &&
            lessons[id].meta.unit === unitName
    );
}

function renderLevels() {
    const container = $("#levelsContainer");
    container.innerHTML = "";

    const levelsDef = [
        {
            level: "Beginner",
            units: ["Greetings", "Family", "Daily Routine", "Food & Drink", "Transportation"],
        },
        {
            level: "Pre-Intermediate",
            units: ["Work & Study", "Health & Emergencies", "Shopping & Prices", "Weather & Small Talk", "Apartment & Problems"],
        },
        {
            level: "Intermediate",
            units: ["Opinions", "Complaints", "Plans & Future", "Free Time & Hobbies", "Feelings & Mental State"],
        },
    ];

    const student = getCurrentStudent();

    levelsDef.forEach((lvl) => {
        const card = document.createElement("article");
        card.className = "level-card";

        const titleRow = document.createElement("div");
        titleRow.className = "level-card__title";

        const title = document.createElement("h4");
        title.className = "td-lessonitem__title";
        title.textContent = lvl.level;

        const badge = document.createElement("span");
        badge.className = "badge badge--soft";
        badge.textContent = "Local track";

        titleRow.appendChild(title);
        titleRow.appendChild(badge);

        const unitsContainer = document.createElement("div");
        unitsContainer.className = "level-card__units";

        // default units
        const allUnits = [...lvl.units];

        // add custom units for this level
        if (customUnits[lvl.level] && customUnits[lvl.level].length) {
            customUnits[lvl.level].forEach((u) => {
                if (!allUnits.includes(u)) allUnits.push(u);
            });
        }

        allUnits.forEach((unitName) => {
            const pill = document.createElement("div");
            pill.className = "unit-pill";

            const nameSpan = document.createElement("span");
            nameSpan.className = "unit-pill__name";
            nameSpan.textContent = unitName;

            const statusSpan = document.createElement("span");
            statusSpan.className = "unit-pill__status";

            const lessonId = findLessonIdFor(lvl.level, unitName);

            if (lessonId) {
                if (isGuestUser() && !isGuestAllowedLesson(lessonId)) {
                    pill.classList.add("unit-pill--locked");
                    statusSpan.textContent = "Locked (Guest)";
                    pill.addEventListener("click", () => {
                        goToSubscribeScreen();
                    });
                } else {
                    pill.classList.add("unit-pill--clickable");
                }
                if (student) {
                    const progress = getStudentProgress(student, lessonId);
                    const total = Object.keys(progress).length || 1;
                    const completed = Object.values(progress).filter(Boolean).length;
                    const percent = Math.round((completed / total) * 100);
                    if (!statusSpan.textContent) {
                        statusSpan.textContent = `Progress: ${completed}/${total} sections`;
                    }

                    if (percent >= 80) {
                        pill.classList.add("unit-pill--done");
                    } else if (percent >= 30) {
                        pill.classList.add("unit-pill--mid");
                    } else {
                        pill.classList.add("unit-pill--low");
                    }
                } else {
                    statusSpan.textContent = "Open lesson";
                    pill.classList.add("unit-pill--low");
                }

                if (!pill.classList.contains("unit-pill--locked")) {
                    pill.addEventListener("click", () => {
                        appState.currentLessonId = lessonId;
                        appState.currentTab = "overview";
                        goToLessonView();
                    });
                }
            } else {
                pill.classList.add("unit-pill--nolesson");
                statusSpan.textContent = "No lesson template yet";
            }

            pill.appendChild(nameSpan);
            pill.appendChild(statusSpan);
            unitsContainer.appendChild(pill);
        });

        card.appendChild(titleRow);
        card.appendChild(unitsContainer);
        container.appendChild(card);
    });

    // Render the new "Dialogue Only (Decisions)" section if present
    try {
        if (typeof window.renderDialogueOnlyLevels === "function") {
            window.renderDialogueOnlyLevels();
        }
    } catch (e) { }
}

// ========================= LESSON VIEW =========================
function updateLessonTopBar() {
    const student = getCurrentStudent();
    const lesson = lessons[appState.currentLessonId];
    if (!student || !lesson) return;
    $("#lessonStudentName").textContent = student.name;
    $("#lessonMeta").textContent = `${lesson.meta.level} – ${lesson.meta.unit} – ${lesson.meta.lessonTitle}`;
}

function countCompletedSections(p) {
    return Object.values(p).filter(Boolean).length;
}
function updateProgressBar() {
    const student = getCurrentStudent();
    if (!student) {
        $("#lessonProgressFill").style.width = "0%";
        return;
    }
    const p = getStudentProgress(student, appState.currentLessonId);
    const c = countCompletedSections(p);
    const t = Object.keys(p).length || 1;
    const percent = Math.round((c / t) * 100);
    $("#lessonProgressFill").style.width = percent + "%";
}

function renderSectionStatus(container, sectionKey) {
    const student = getCurrentStudent();
    let done = false;
    if (student) {
        const p = getStudentProgress(student, appState.currentLessonId);
        done = !!p[sectionKey];
    }
    const div = document.createElement("div");
    div.className =
        "section-status " + (done ? "section-status--done" : "section-status--todo");
    div.dataset.sectionStatusKey = sectionKey;
    div.textContent = done ? "✓ Section completed" : "Section not completed yet";
    container.appendChild(div);
}
function updateSectionStatusBadge(sectionKey) {
    const badge = document.querySelector(
        `.section-status[data-section-status-key="${sectionKey}"]`
    );
    if (!badge) return;
    const student = getCurrentStudent();
    const p = student && getStudentProgress(student, appState.currentLessonId);
    const done = !!(p && p[sectionKey]);
    badge.className =
        "section-status " + (done ? "section-status--done" : "section-status--todo");
    badge.textContent = done ? "✓ Section completed" : "Section not completed yet";
}

function isGuestUser() {
    return !!(appState.currentUser && appState.currentUser.role === "guest");
}

function isGuestAllowedLesson(lessonId) {
    if (!lessonId) return false;
    const lesson = lessons[lessonId];
    if (!lesson || !lesson.meta) return false;
    if (lesson.meta.level !== "Beginner") return false;
    const allowed = new Set(["Greetings", "Family"]);
    return allowed.has(lesson.meta.unit);
}

function goToSubscribeScreen() {
    showScreen("subscribe-screen");
    try {
        if (typeof window.buildBookingSelects === "function") window.buildBookingSelects();
    } catch { }
}

// Open subscribe modal
function openSubscribeModal() {
    const modal = document.getElementById("subscribeModal");
    if (modal) {
        const priceWrap = document.getElementById("subscribeSitePriceWrap");
        const priceText = document.getElementById("subscribeSitePrice");
        if (priceWrap && priceText) {
            if (contactSettings.sitePrice) {
                priceWrap.style.display = "block";
                priceText.textContent = contactSettings.sitePrice;
            } else {
                priceWrap.style.display = "none";
                priceText.textContent = "â€“";
            }
        }
        modal.classList.add("modal--open");
        console.log("Subscribe modal opened");
    }
}

// Close subscribe modal
function closeSubscribeModal() {
    const modal = document.getElementById("subscribeModal");
    if (modal) {
        modal.classList.remove("modal--open");
        console.log("Subscribe modal closed");
    }
}

function isGrammarTabEnabled(lesson) {
    if (!lesson) return false;
    const hasGrammar = Array.isArray(lesson.grammar) && lesson.grammar.length > 0;
    return appState.teacherMode && hasGrammar;
}

function updateLessonTabsVisibility(lesson) {
    const grammarTab = document.querySelector('.lesson-tab[data-tab="grammar"]');
    if (grammarTab) {
        grammarTab.textContent = "Grammar";
        grammarTab.style.display = isGrammarTabEnabled(lesson) ? "inline-flex" : "none";
    }
}

function normalizeLessonTabKey(tabKey, lesson) {
    if (tabKey === "grammar" && !isGrammarTabEnabled(lesson)) {
        return "translation";
    }
    return tabKey || "overview";
}


function getUseInLifeQuestions(lesson) {
    const raw = Array.isArray(lesson?.useInLife) ? lesson.useInLife : [];
    const items = raw
        .map((q) => {
            if (typeof q === "string") return { en: q };
            if (q && typeof q === "object") {
                return { ar: q.ar || "", en: q.en || "" };
            }
            return null;
        })
        .filter(Boolean)
        .filter((q) => q.ar || q.en);

    if (items.length >= 2) return items;

    return [
        { ar: "شو اسمك؟", en: "What's your name?" },
        { ar: "إنتَ/إنتِ من وين؟", en: "Where are you from?" },
    ];
}

function persistResumeBeforeNav() {
    // Only save when lesson screen is active for the current student.
    // Prevents copying previous student's lesson into a newly selected student.
    try {
        const lessonScreen = document.getElementById("lesson-screen");
        const inLessonScreen = !!(lessonScreen && lessonScreen.classList.contains("screen--active"));
        if (inLessonScreen && appState && appState.currentLessonId && appState.currentStudentId) {
            saveResumeSpot({ silent: true });
        }
    } catch { }
}

function getDefaultLessonIdForLevel(level) {
    switch ((level || "").trim()) {
        case "Pre-Intermediate":
            return LESSON_ID_WORK_STUDY;
        case "Intermediate":
            return LESSON_ID_OPINIONS;
        case "Beginner":
        default:
            return LESSON_ID_GREETING;
    }
}

function setStudentLessonContext(student) {
    appState.currentLessonId = getDefaultLessonIdForLevel(student?.level);
    appState.currentTab = "overview";
}

// =======================
// Resume Last Spot (per student)
// =======================
function ensureStudentLastSeen(student) {
    if (!student) return;
    if (!student.lastSeen || typeof student.lastSeen !== "object") {
        student.lastSeen = null;
    }
}

function saveResumeSpot({ silent = false } = {}) {
    const student = getCurrentStudent();
    if (!student) return;
    ensureStudentLastSeen(student);

    student.lastSeen = {
        lessonId: appState.currentLessonId,
        tab: appState.currentTab || "overview",
        at: Date.now(),
    };

    saveStudentsToLS();
    // if teacher, also save student cloud snapshot (debounced)
    try { scheduleCloudSave(); } catch { }

    if (!silent) {
        toast("Saved! Next time this student will open right here.");
    }
    updateContinueButton();
}

function tryResumeStudent(student) {
    if (!student || !student.lastSeen) return false;
    const { lessonId, tab } = student.lastSeen || {};
    if (!lessonId || !lessons[lessonId]) return false;
    const lessonLevel = (lessons[lessonId]?.meta?.level || "").trim();
    const studentLevel = (student.level || "").trim();
    if (lessonLevel && studentLevel && lessonLevel !== studentLevel) return false;

    appState.currentLessonId = lessonId;
    appState.currentTab = tab || "overview";
    goToLessonView({ teacherMode: false });
    return true;
}

function updateContinueButton() {
    const btn = document.getElementById("btnContinueLesson");
    const student = getCurrentStudent();
    if (!btn) return;
    const canResume = !!(student && student.lastSeen && lessons[student.lastSeen.lessonId]);
    btn.disabled = !canResume;
    if (canResume) {
        const lesson = lessons[student.lastSeen.lessonId];
        btn.textContent = `Continue: ${lesson.meta.unit}`;
    } else {
        btn.textContent = "Continue";
    }
}

// Tabs
function setActiveTab(tabKey) {
    const lesson = lessons[appState.currentLessonId];
    const normalizedTab = normalizeLessonTabKey(tabKey, lesson);
    appState.currentTab = normalizedTab;
    // Auto-save student's last spot whenever they switch tabs
    try { saveResumeSpot({ silent: true }); } catch { }
    $all(".lesson-tab").forEach((btn) =>
        btn.classList.toggle("lesson-tab--active", btn.dataset.tab === normalizedTab)
    );

    const container = $("#lessonTabContent");
    container.innerHTML = "";
    if (!lesson) return;

    switch (normalizedTab) {
        case "overview":
            renderOverviewTab(container, lesson);
            break;
        case "vocabulary":
            renderVocabularyTab(container, lesson);
            break;
        case "dialogue":
            renderDialogueTab(container, lesson);
            break;
        case "grammar":
            renderGrammarTab(container, lesson);
            break;
        case "translation":
            renderTranslationTab(container, lesson);
            break;
        case "practice":
            renderPracticeTab(container, lesson);
            break;
        case "homework":
            renderHomeworkTab(container, lesson);
            break;
        case "review":
            renderReviewTab(container, lesson);
            break;
        case "teacher-notes":
            renderTeacherNotesTab(container, lesson);
            break;
    }
}

// Overview
function renderOverviewTab(container, lesson) {
    const ov = lesson.overview;
    const h3 = document.createElement("h3");
    h3.textContent = ov.title;
    const p = document.createElement("p");
    p.textContent = ov.description;

    const goalsTitle = document.createElement("p");
    goalsTitle.textContent = "By the end of this lesson, the student can:";
    goalsTitle.style.fontWeight = "600";

    const ul = document.createElement("ul");
    ov.goals.forEach((g) => {
        const li = document.createElement("li");
        li.textContent = g;
        ul.appendChild(li);
    });

    const useTitle = document.createElement("h4");
    useTitle.textContent = "Use it in your life";
    useTitle.style.marginTop = "12px";

    const useList = document.createElement("div");
    const useItems = getUseInLifeQuestions(lesson);
    useItems.forEach((q) => {
        const wrap = document.createElement("div");
        wrap.style.marginBottom = "6px";

        if (q.ar) {
            const ar = document.createElement("div");
            ar.className = "dialogue-col--ar";
            ar.style.fontSize = "1rem";
            ar.textContent = q.ar;
            wrap.appendChild(ar);
        }

        if (q.en) {
            const en = document.createElement("div");
            en.className = "translation-muted";
            en.textContent = q.en;
            wrap.appendChild(en);
        }

        useList.appendChild(wrap);
    });

    const btn = document.createElement("button");
    btn.className = "btn btn--primary btn--sm";
    btn.textContent = "Mark Overview as Done";
    btn.addEventListener("click", () => setStudentProgressField("overview", true));

    container.appendChild(h3);
    container.appendChild(p);
    container.appendChild(goalsTitle);
    container.appendChild(ul);
    container.appendChild(useTitle);
    container.appendChild(useList);
    container.appendChild(btn);
    renderSectionStatus(container, "overview");
}

// Vocabulary


function renderVocabModalFromState() {
    const item = vocabModalState.list[vocabModalState.index];
    if (!item) return;

    const elAr = $("#vocabModalWord");
    const elEn = $("#vocabModalMeaning");
    const elArabeezy = $("#vocabModalArabeezy");
    const elHint = $("#vocabModalHint");
    const elProgress = $("#vocabModalProgress");

    const exAr = $("#vocabModalExampleAr");
    const exArabeezy = $("#vocabModalExampleArabeezy");
    const exEn = $("#vocabModalExampleEn");

    // Fill text
    elAr.textContent = item.ar || "";
    elEn.textContent = item.en || "";
    elArabeezy.textContent = item.enArabeezy || "";
    if (elHint) elHint.textContent = item.hint || "";

    if (exAr) exAr.textContent = item.exampleAr || "";
    if (exArabeezy) exArabeezy.textContent = item.exampleArabeezy || "";
    if (exEn) exEn.textContent = item.exampleEn || "";

    if (elProgress) {
        elProgress.textContent = `${vocabModalState.index + 1} / ${vocabModalState.list.length}`;
    }

    // ✅ Word visibility (Arabic word follows example toggle)
    elAr.style.display = (vocabModalState.showAr && vocabModalState.showExamples) ? "" : "none";
    elEn.style.display = vocabModalState.showEn ? "" : "none";
    elArabeezy.style.display = vocabModalState.showArabeezy ? "" : "none";

    // ✅ Examples visibility (independent, but respects each language toggle)
    const showEx = !!vocabModalState.showExamples;

    if (exAr) exAr.style.display = (showEx && vocabModalState.showAr) ? "" : "none";
    if (exEn) exEn.style.display = vocabModalState.showEn ? "" : "none";
    if (exArabeezy) exArabeezy.style.display = vocabModalState.showArabeezy ? "" : "none";

    // Buttons text
    const btnAr = $("#vocabToggleArBtn");          // لو عندك زر عربي
    const btnEn = $("#vocabToggleEnBtn");
    const btnEx = $("#vocabToggleExamplesBtn");
    const btnArabeezy = $("#vocabToggleArabeezyBtn");

    if (btnAr) btnAr.textContent = vocabModalState.showAr ? "👁 Hide" : "👁 Show";
    if (btnEn) btnEn.textContent = vocabModalState.showEn ? "👁 Hide" : "👁 Show";
    if (btnArabeezy) btnArabeezy.textContent = vocabModalState.showArabeezy ? "👁 Hide" : "👁 Show";
    if (btnEx) btnEx.textContent = vocabModalState.showExamples ? "👁 Hide" : "👁 Show";
}




function openVocabModal(list, index) {
    vocabModalState.list = list || [];
    vocabModalState.index = index || 0;
    vocabModalState.showExamples = true;
    vocabModalState.showAr = true;
    vocabModalState.showEn = true;
    vocabModalState.showArabeezy = true;
    vocabModalState.nextClickCount = 0;
    microCheckState.pendingNextAdvance = false;

    renderVocabModalFromState();
    $("#vocabModal").classList.add("modal--open");
}


function closeVocabModal() {
    $("#vocabModal").classList.remove("modal--open");
    vocabModalState.list = [];
    closeMicroCheckModal();
}


function ensureVocabVisitedSet() {
    const sid = appState.currentStudentId || "anon";
    if (!appState.vocabCoreVisited[sid]) {
        appState.vocabCoreVisited[sid] = {};
    }
    if (!appState.vocabCoreVisited[sid][appState.currentLessonId]) {
        appState.vocabCoreVisited[sid][appState.currentLessonId] = new Set();
    }
    return appState.vocabCoreVisited[sid][appState.currentLessonId];
}
function maybeAutoCompleteVocab() {
    const lesson = lessons[appState.currentLessonId];
    const set = ensureVocabVisitedSet();
    const totalCore = lesson.vocabulary.core.length;
    if (totalCore && set.size >= totalCore) {
        setStudentProgressField("vocabulary", true);
    }
}

function renderVocabularyGroup(container, titleText, items, isCore) {
    const title = document.createElement("div");
    title.className = "vocab-group-title";
    title.textContent = titleText;
    container.appendChild(title);

    const list = document.createElement("div");
    list.className = "vocab-list";

    items.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "vocab-item";

        const ar = document.createElement("div");
        ar.className = "vocab-item__ar";
        ar.textContent = item.ar;

        const en = document.createElement("div");
        en.className = "vocab-item__en";
        en.textContent = item.en;

        card.appendChild(ar);
        card.appendChild(en);

        card.addEventListener("click", () => {
            // ✅ نرسل الليست + index للمودال
            openVocabModal(items, index);

            // نفس منطق الـ progress القديم
            if (isCore) {
                const s = ensureVocabVisitedSet();
                s.add(item.id);
                maybeAutoCompleteVocab();
            }
        });

        list.appendChild(card);
    });

    container.appendChild(list);
}


function handleAddVocabItem(lesson, groupKey) {
    const ar = prompt("Arabic word (with vowels):");
    if (!ar) return;
    const en = prompt("English meaning:");
    if (!en) return;
    const hint = prompt("Optional hint / note:") || "";
    const enArabeezy = prompt("Arabeezy (optional):") || "";
    const exampleAr = prompt("Example sentence in Arabic (optional):") || "";
    const exampleArabeezy = prompt("Example sentence in Arabeezy (optional):") || "";
    const exampleEn = prompt("Example sentence in English (optional):") || "";
    lesson.vocabulary[groupKey].push({
        id: groupKey + "_" + Date.now(),
        ar,
        en,
        enArabeezy,
        hint,
        exampleAr,
        exampleArabeezy,
        exampleEn,
    });
    saveLessonToLS(appState.currentLessonId);
    saveLessonToCloud(appState.currentLessonId);
    setActiveTab("vocabulary");
}

function handleEditVocabItems(lesson) {
    const all = [
        ...lesson.vocabulary.core.map((i) => ({ ...i, groupKey: "core" })),
        ...lesson.vocabulary.extra.map((i) => ({ ...i, groupKey: "extra" })),
    ];
    if (!all.length) {
        alert("No vocabulary to edit.");
        return;
    }
    const list = all.map((i, idx) => `${idx + 1}. ${i.ar} / ${i.en}`).join("\n");
    const indexStr = prompt(
        "Choose item number to edit/delete:\n" + list + "\n\nEnter number (or cancel):"
    );
    if (!indexStr) return;
    const index = Number(indexStr) - 1;
    if (isNaN(index) || index < 0 || index >= all.length) return;
    const item = all[index];

    const action = prompt(
        `Selected: ${item.ar} / ${item.en}\nType:\n  e = edit\n  d = delete`
    );
    if (!action) return;

    const group = lesson.vocabulary[item.groupKey];
    const idxInGroup = group.findIndex((x) => x.id === item.id);
    if (action.toLowerCase() === "d") {
        if (idxInGroup !== -1) group.splice(idxInGroup, 1);
    } else if (action.toLowerCase() === "e") {
        const ar = prompt("Arabic:", item.ar) || item.ar;
        const en = prompt("English:", item.en) || item.en;
        const enArabeezy =
            prompt("Arabeezy:", item.enArabeezy || "") || item.enArabeezy || "";
        const hint = prompt("Hint:", item.hint || "") || item.hint || "";
        const exampleAr =
            prompt("Example Arabic:", item.exampleAr || "") || item.exampleAr || "";
        const exampleArabeezy =
            prompt("Example Arabeezy:", item.exampleArabeezy || "") || item.exampleArabeezy || "";
        const exampleEn =
            prompt("Example English:", item.exampleEn || "") || item.exampleEn || "";
        if (idxInGroup !== -1) {
            group[idxInGroup] = {
                ...item,
                ar,
                en,
                enArabeezy,
                hint,
                exampleAr,
                exampleArabeezy,
                exampleEn,
            };
        }
    }
    saveLessonToLS(appState.currentLessonId);
    saveLessonToCloud(appState.currentLessonId);
    setActiveTab("vocabulary");
}

function renderVocabularyTab(container, lesson) {
    const hint = document.createElement("p");
    hint.className = "teacher-edit-note";
    hint.textContent =
        "Tap a card to see details and example sentences. When you finish reviewing, press 'Done' to complete this section.";
    container.appendChild(hint);

    // ✅ شريط "تم إنهاء القسم"
    const doneBar = document.createElement("div");
    doneBar.className = "section-done-bar";

    const doneLabel = document.createElement("span");
    doneLabel.className = "section-done-text";


    const doneBtn = document.createElement("button");
    doneBtn.className = "btn btn--outline btn--sm section-done-btn";
    doneBtn.textContent = "Mark Vocabulary as Done";

    doneBtn.addEventListener("click", () => {
        markVocabularyDone();
    });

    doneBar.appendChild(doneLabel);
    doneBar.appendChild(doneBtn);
    container.appendChild(doneBar);

    // ✅ باقي تبويب المفردات
    const vocab = lesson.vocabulary || {};
    const core = Array.isArray(vocab.core) ? vocab.core : [];
    const extra = Array.isArray(vocab.extra) ? vocab.extra : [];

    if (core.length) {
        renderVocabularyGroup(container, "Core Vocabulary", core, true);
    }
    if (extra.length) {
        renderVocabularyGroup(container, "Extra Vocabulary", extra, false);
    }
}



// Dialogue
function renderDialogueTab(container, lesson) {
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.gap = "8px";

    const title = document.createElement("h4");
    title.className = "td-lessonitem__title";
    title.textContent = "Model Dialogue";

    const controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.gap = "6px";

    const btnToggleEnglish = document.createElement("button");
    btnToggleEnglish.className = "btn btn--ghost btn--sm";
    btnToggleEnglish.textContent = "Show/Hide English";

    const btnToggleArabic = document.createElement("button");
    btnToggleArabic.className = "btn btn--ghost btn--sm";
    btnToggleArabic.textContent = "Show/Hide Arabic";

    const btnToggleArabeezy = document.createElement("button");
    btnToggleArabeezy.className = "btn btn--ghost btn--sm";
    btnToggleArabeezy.textContent = "Show/Hide Arabeezy";

    const btnDone = document.createElement("button");
    btnDone.className = "btn btn--primary btn--sm";
    btnDone.textContent = "Mark Dialogue as Done";
    btnDone.addEventListener("click", () => setStudentProgressField("dialogue", true));

    controls.appendChild(btnToggleArabic);
    controls.appendChild(btnToggleEnglish);
    controls.appendChild(btnToggleArabeezy);
    controls.appendChild(btnDone);

    header.appendChild(title);
    header.appendChild(controls);

    const layout = document.createElement("div");
    layout.className = "dialogue-layout";

    const enCol = document.createElement("div");
    enCol.className = "dialogue-col";

    const arCol = document.createElement("div");
    arCol.className = "dialogue-col dialogue-col--ar";

    lesson.dialogue.lines.forEach((line) => {
        const enLine = document.createElement("div");
        enLine.className = "dialogue-line";
        const enSpeaker = document.createElement("div");
        enSpeaker.className = "dialogue-speaker-en";
        enSpeaker.textContent = line.speaker;
        const enText = document.createElement("div");
        enText.className = "dialogue-text";
        enText.textContent = line.en;
        enLine.appendChild(enSpeaker);
        enLine.appendChild(enText);
        enCol.appendChild(enLine);

        const arLine = document.createElement("div");
        arLine.className = "dialogue-line";
        const arSpeaker = document.createElement("div");
        arSpeaker.className = "dialogue-speaker-ar";
        arSpeaker.textContent = line.speaker;
        const arContent = document.createElement("div");
        arContent.className = "dialogue-content";

        const arText = document.createElement("div");
        arText.className = "dialogue-text";
        arText.textContent = line.ar;
        arContent.appendChild(arText);

        const arArabeezyText = line.arArabeezy || line.arabeezy || "";
        if (arArabeezyText) {
            const arArabeezy = document.createElement("div");
            arArabeezy.className = "dialogue-arabeezy";
            arArabeezy.textContent = arArabeezyText;
            arContent.appendChild(arArabeezy);
        }
        arLine.appendChild(arSpeaker);
        arLine.appendChild(arContent);
        arCol.appendChild(arLine);
    });

    layout.appendChild(enCol);
    layout.appendChild(arCol);

    let englishVisible = true;
    let arabicVisible = true;
    let arabeezyVisible = true;


    function adjustLayout() {
        const showArabicCol = arabicVisible || arabeezyVisible;
        if (englishVisible && showArabicCol) {
            layout.style.gridTemplateColumns = "minmax(0, 1fr) minmax(0, 1fr)";
            enCol.style.display = "block";
            arCol.style.display = "block";
            enCol.style.margin = "0";
            arCol.style.margin = "0";
        } else if (englishVisible && !showArabicCol) {
            layout.style.gridTemplateColumns = "minmax(0, 1fr)";
            enCol.style.display = "block";
            arCol.style.display = "none";
            enCol.style.margin = "0 auto";
        } else if (!englishVisible && showArabicCol) {
            layout.style.gridTemplateColumns = "minmax(0, 1fr)";
            enCol.style.display = "none";
            arCol.style.display = "block";
            arCol.style.margin = "0 auto";
        } else {
            // لو الاثنين مخفيين، خليه فاضي لكن نحافظ على التخطيط
            layout.style.gridTemplateColumns = "minmax(0, 1fr)";
            enCol.style.display = "none";
            arCol.style.display = "none";
        }
    }

    function updateArabicVisibility() {
        arCol.querySelectorAll(".dialogue-text").forEach((el) => {
            el.style.display = arabicVisible ? "" : "none";
        });
    }

    function updateArabeezyVisibility() {
        arCol.querySelectorAll(".dialogue-arabeezy").forEach((el) => {
            el.style.display = arabeezyVisible ? "" : "none";
        });
    }

    btnToggleEnglish.addEventListener("click", () => {
        englishVisible = !englishVisible;
        adjustLayout();
    });

    btnToggleArabic.addEventListener("click", () => {
        arabicVisible = !arabicVisible;
        adjustLayout();
        updateArabicVisibility();
    });

    btnToggleArabeezy.addEventListener("click", () => {
        arabeezyVisible = !arabeezyVisible;
        adjustLayout();
        updateArabeezyVisibility();
    });

    // أول مرة
    adjustLayout();
    updateArabicVisibility();
    updateArabeezyVisibility();

    container.appendChild(header);
    container.appendChild(layout);

    if (appState.teacherMode) {
        const note = document.createElement("p");
        note.className = "teacher-edit-note";
        note.textContent =
            "Teacher Mode: You can edit the dialogue from the Teacher Dashboard form (Edit Lesson Content).";
        container.appendChild(note);
    }

    renderSectionStatus(container, "dialogue");
}

// Translation
function renderTranslationTab(container, lesson) {
    ensureTranslationItems(lesson, 7);

    const list = safeArr(lesson?.practice?.translation);
    translationState.items = list;
    translationState.index = 0;
    translationState.hidePrompt = false;
    translationState.hideAnswer = false;
    translationState.shuffled = false;

    // زر "تم"
    const doneBar = document.createElement("div");
    doneBar.className = "section-done-bar";

    const doneText = document.createElement("span");
    doneText.className = "translation-muted";
    doneText.textContent = "بعد ما تخلص ترجمة الجمل اضغط تم لإنهاء القسم.";

    const doneBtn = document.createElement("button");
    doneBtn.className = "btn btn--outline btn--sm";
    doneBtn.textContent = "✓ تم إنهاء قسم الترجمة";
    doneBtn.addEventListener("click", () => {
        setStudentProgressField("translation", true);
    });

    doneBar.appendChild(doneText);
    doneBar.appendChild(doneBtn);
    container.appendChild(doneBar);

    // Toolbar (إخفاء مرتب، مش معجوق)
    const toolbar = document.createElement("div");
    toolbar.className = "translation-toolbar";

    const left = document.createElement("div");
    left.className = "group";

    const btnHidePrompt = document.createElement("button");
    btnHidePrompt.className = "btn btn--ghost btn--sm";
    btnHidePrompt.textContent = "Hide prompt";

    const btnHideAnswer = document.createElement("button");
    btnHideAnswer.className = "btn btn--ghost btn--sm";
    btnHideAnswer.textContent = "Hide answer";

    const btnShuffle = document.createElement("button");
    btnShuffle.className = "btn btn--ghost btn--sm";
    btnShuffle.textContent = "Shuffle";

    const btnReset = document.createElement("button");
    btnReset.className = "btn btn--ghost btn--sm";
    btnReset.textContent = "Reset";

    left.appendChild(btnHidePrompt);
    left.appendChild(btnHideAnswer);
    left.appendChild(btnShuffle);
    left.appendChild(btnReset);

    const right = document.createElement("div");
    right.className = "group";

    const counter = document.createElement("span");
    counter.className = "translation-muted";
    counter.textContent = list.length ? `1 / ${list.length}` : "0 / 0";

    const btnPrev = document.createElement("button");
    btnPrev.className = "btn btn--ghost btn--sm";
    btnPrev.textContent = "⬅ Prev";

    const btnNext = document.createElement("button");
    btnNext.className = "btn btn--ghost btn--sm";
    btnNext.textContent = "Next ➡";

    right.appendChild(btnPrev);
    right.appendChild(btnNext);
    right.appendChild(counter);

    toolbar.appendChild(left);
    toolbar.appendChild(right);
    container.appendChild(toolbar);

    // Card container
    const cardHost = document.createElement("div");
    container.appendChild(cardHost);

    // Render function
    function renderTranslationCard() {
        cardHost.innerHTML = "";

        const item = translationState.items[translationState.index];
        if (!item) {
            const p = document.createElement("p");
            p.className = "translation-muted";
            p.textContent = "No translation items available.";
            cardHost.appendChild(p);
            return;
        }

        const type = item.type === "arToEn" ? "Arabic → English" : "English → Arabic";

        const card = document.createElement("div");
        card.className = "translation-card";

        const badge = document.createElement("span");
        badge.className = "translation-badge";
        badge.textContent = type;

        const prompt = document.createElement("div");
        prompt.className = "translation-prompt";

        const answer = document.createElement("div");
        answer.className = "translation-answer";

        // prompt/answer content
        if (item.type === "enToAr") {
            prompt.textContent = translationState.hidePrompt ? "••••••••" : `EN: ${txt(item.textEn)}`;
            answer.textContent = translationState.hideAnswer ? "••••••••" : `AR: ${txt(item.textAr)}`;
        } else {
            prompt.textContent = translationState.hidePrompt ? "••••••••" : `AR: ${txt(item.textAr)}`;
            answer.textContent = translationState.hideAnswer ? "••••••••" : `EN: ${txt(item.textEn)}`;
        }

        const btnShow = document.createElement("button");
        btnShow.className = "btn btn--outline btn--sm";
        btnShow.textContent = "Show answer";

        btnShow.addEventListener("click", () => {
            const isVisible = answer.classList.toggle("is-visible");
            btnShow.textContent = isVisible ? "Hide answer" : "Show answer";
        });

        const footer = document.createElement("div");
        footer.className = "translation-footer";

        const tip = document.createElement("span");
        tip.className = "translation-muted";
        tip.textContent = "Try to say it out loud before showing the answer.";

        footer.appendChild(tip);
        footer.appendChild(btnShow);

        card.appendChild(badge);
        card.appendChild(prompt);
        card.appendChild(footer);
        card.appendChild(answer);

        cardHost.appendChild(card);

        counter.textContent = `${translationState.index + 1} / ${translationState.items.length}`;

        // Update toolbar button text states
        btnHidePrompt.textContent = translationState.hidePrompt ? "Show prompt" : "Hide prompt";
        btnHideAnswer.textContent = translationState.hideAnswer ? "Show answer" : "Hide answer";
    }

    // toolbar actions
    btnHidePrompt.addEventListener("click", () => {
        translationState.hidePrompt = !translationState.hidePrompt;
        renderTranslationCard();
    });

    btnHideAnswer.addEventListener("click", () => {
        translationState.hideAnswer = !translationState.hideAnswer;
        renderTranslationCard();
    });

    btnShuffle.addEventListener("click", () => {
        translationState.items = shuffleArray(translationState.items);
        translationState.index = 0;
        translationState.shuffled = true;
        renderTranslationCard();
    });

    btnReset.addEventListener("click", () => {
        translationState.index = 0;
        translationState.hidePrompt = false;
        translationState.hideAnswer = false;
        renderTranslationCard();
    });

    btnPrev.addEventListener("click", () => {
        if (!translationState.items.length) return;
        translationState.index =
            (translationState.index - 1 + translationState.items.length) % translationState.items.length;
        renderTranslationCard();
    });

    btnNext.addEventListener("click", () => {
        if (!translationState.items.length) return;
        translationState.index =
            (translationState.index + 1) % translationState.items.length;
        renderTranslationCard();
    });

    renderTranslationCard();
    renderSectionStatus(container, "translation");
}

// Grammar
function renderGrammarTab(container, lesson) {
    const title = document.createElement("h4");
    title.className = "td-lessonitem__title";
    title.textContent = "Grammar Notes";
    container.appendChild(title);

    const items = safeArr(lesson?.grammar);
    if (!items.length) {
        const empty = document.createElement("p");
        empty.className = "translation-muted";
        empty.textContent = "No grammar points available yet.";
        container.appendChild(empty);
    } else {
        const accordion = document.createElement("div");
        accordion.className = "grammar-accordion";

        items.forEach((g, idx) => {
            const details = document.createElement("details");
            details.className = "grammar-accordion__item";
            if (idx === 0) details.open = true;

            const summary = document.createElement("summary");
            summary.className = "grammar-accordion__summary";

            const summaryTitle = document.createElement("span");
            summaryTitle.className = "grammar-accordion__title";
            summaryTitle.textContent = g.title || "Grammar point";

            const summaryHint = document.createElement("span");
            summaryHint.className = "grammar-accordion__hint";
            summaryHint.textContent = g.short || "Tap to see rules, examples, and notes.";

            summary.appendChild(summaryTitle);
            summary.appendChild(summaryHint);

            const body = document.createElement("div");
            body.className = "grammar-accordion__body";

            const desc = document.createElement("p");
            desc.className = "grammar-desc";
            desc.textContent = g.description || "";
            body.appendChild(desc);

            if (g.table && Array.isArray(g.table.headers) && Array.isArray(g.table.rows)) {
                const tableWrap = document.createElement("div");
                tableWrap.className = "grammar-topic-table";

                const tableTitle = document.createElement("div");
                tableTitle.className = "grammar-topic-table__title";
                tableTitle.textContent = g.table.title || "Table";

                const table = document.createElement("table");
                table.className = "grammar-table__table";

                const thead = document.createElement("thead");
                const headRow = document.createElement("tr");
                g.table.headers.forEach((h) => {
                    const th = document.createElement("th");
                    th.textContent = h;
                    headRow.appendChild(th);
                });
                thead.appendChild(headRow);

                const tbody = document.createElement("tbody");
                g.table.rows.forEach((row) => {
                    const tr = document.createElement("tr");
                    row.forEach((cell) => {
                        const td = document.createElement("td");
                        td.textContent = cell;
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });

                table.appendChild(thead);
                table.appendChild(tbody);
                tableWrap.appendChild(tableTitle);
                tableWrap.appendChild(table);
                body.appendChild(tableWrap);
            }

            const examples = Array.isArray(g.examples) ? g.examples : [];
            const examplesBlock = document.createElement("div");
            examplesBlock.className = "grammar-examples";
            const examplesTitle = document.createElement("div");
            examplesTitle.className = "grammar-examples__title";
            examplesTitle.textContent = "Examples";
            examplesBlock.appendChild(examplesTitle);

            if (!examples.length) {
                const emptyExamples = document.createElement("div");
                emptyExamples.className = "grammar-examples__empty";
                emptyExamples.textContent = "No examples yet.";
                examplesBlock.appendChild(emptyExamples);
            } else {
                const list = document.createElement("div");
                list.className = "grammar-examples__list";
                examples.forEach((ex) => {
                    const row = document.createElement("div");
                    row.className = "grammar-example";

                    const ar = document.createElement("div");
                    ar.className = "grammar-example__ar";
                    ar.textContent = ex.ar || "";

                    const arabeezy = document.createElement("div");
                    arabeezy.className = "grammar-example__arabeezy";
                    arabeezy.textContent = ex.arabeezy || "";

                    const en = document.createElement("div");
                    en.className = "grammar-example__en";
                    en.textContent = ex.en || "";

                    row.appendChild(ar);
                    row.appendChild(arabeezy);
                    row.appendChild(en);
                    list.appendChild(row);
                });
                examplesBlock.appendChild(list);
            }
            body.appendChild(examplesBlock);

            if (appState.teacherMode) {
                const notesWrap = document.createElement("div");
                notesWrap.className = "grammar-teacher";

                const notesTitle = document.createElement("div");
                notesTitle.className = "grammar-teacher__title";
                notesTitle.textContent = "Teacher Notes";

                const notesText = document.createElement("div");
                notesText.className = "grammar-teacher__text";
                notesText.textContent = g.teacherNotes || "No teacher notes yet.";

                notesWrap.appendChild(notesTitle);
                notesWrap.appendChild(notesText);
                body.appendChild(notesWrap);
            }

            details.appendChild(summary);
            details.appendChild(body);
            accordion.appendChild(details);
        });

        container.appendChild(accordion);
    }

    const doneBtn = document.createElement("button");
    doneBtn.className = "btn btn--outline btn--sm";
    doneBtn.textContent = "Mark Grammar as Done";
    doneBtn.addEventListener("click", () => setStudentProgressField("grammar", true));
    container.appendChild(doneBtn);
    renderSectionStatus(container, "grammar");
}


// Practice
function renderPracticeTab(container, lesson) {
    const title = document.createElement("h4");
    title.className = "td-lessonitem__title";
    title.textContent = "Practice – Quiz & Role-play";

    const quizBlock = document.createElement("div");
    let correctCount = 0;

    lesson.practice.quiz.forEach((q) => {
        const qWrap = document.createElement("div");
        qWrap.className = "quiz-question";

        const qText = document.createElement("div");
        qText.className = "flashcard__ar";
        qText.style.direction = "rtl";
        qText.textContent = q.questionAr;

        const optionsWrap = document.createElement("div");
        optionsWrap.className = "quiz-options";

        const feedback = document.createElement("div");
        feedback.className = "quiz-feedback";

        q.optionsEn.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "quiz-option";
            btn.textContent = opt;
            btn.addEventListener("click", () => {
                if (idx === q.correctIndex) {
                    btn.classList.add("quiz-option--correct");
                    feedback.textContent = "✅ Correct!";
                    correctCount++;
                    if (correctCount >= 5 || correctCount >= lesson.practice.quiz.length) {
                        setStudentProgressField("practice", true);
                    }
                } else {
                    btn.classList.add("quiz-option--incorrect");
                    feedback.textContent = "❌ Not quite. Try again.";
                }
            });
            optionsWrap.appendChild(btn);
        });

        qWrap.appendChild(qText);
        qWrap.appendChild(optionsWrap);
        qWrap.appendChild(feedback);
        quizBlock.appendChild(qWrap);
    });

    const roleTitle = document.createElement("p");
    roleTitle.style.marginTop = "8px";
    roleTitle.style.fontWeight = "600";
    roleTitle.textContent = "Role-play prompts:";

    const ul = document.createElement("ul");
    ul.className = "roleplay-list";
    lesson.practice.rolePlays.forEach((rp) => {
        const li = document.createElement("li");
        li.textContent = rp;
        ul.appendChild(li);
    });

    const btnDone = document.createElement("button");
    btnDone.className = "btn btn--primary btn--sm";
    btnDone.textContent = "Mark Practice as Done";
    btnDone.addEventListener("click", () => setStudentProgressField("practice", true));

    container.appendChild(title);
    container.appendChild(quizBlock);
    container.appendChild(roleTitle);
    container.appendChild(ul);
    container.appendChild(btnDone);

    if (appState.teacherMode) {
        const note = document.createElement("p");
        note.className = "teacher-edit-note";
        note.textContent =
            "Teacher Mode: You can adjust questions and role-plays from the Teacher Dashboard form (Edit Lesson Content).";
        container.appendChild(note);
    }

    renderSectionStatus(container, "practice");
}

// Homework
function renderHomeworkTab(container, lesson) {
    const student = getCurrentStudent();
    const progress = student && getStudentProgress(student, appState.currentLessonId);

    const title = document.createElement("h4");
    title.className = "td-lessonitem__title";
    title.textContent = "Homework";

    const text = document.createElement("p");
    text.className = "homework-text";
    text.textContent = lesson.homework.instructions;

    const wrap = document.createElement("div");
    wrap.style.display = "flex";
    wrap.style.alignItems = "center";
    wrap.style.gap = "6px";
    wrap.style.marginBottom = "8px";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = "homeworkAssignedCheckbox";
    check.checked = progress && progress.homework;

    const label = document.createElement("label");
    label.htmlFor = "homeworkAssignedCheckbox";
    label.textContent = "Homework assigned / completed";

    wrap.appendChild(check);
    wrap.appendChild(label);

    check.addEventListener("change", () => {
        setStudentProgressField("homework", check.checked);
    });

    const notesLabel = document.createElement("p");
    notesLabel.className = "teacher-edit-note";
    notesLabel.textContent = "Teacher notes for this student:";

    const notes = document.createElement("textarea");
    notes.className = "homework-notes";
    notes.placeholder = "E.g. Needs more practice with kifak/kifik.";
    notes.value =
        (student &&
            student.homeworkNotes &&
            student.homeworkNotes[appState.currentLessonId]) ||
        "";

    notes.addEventListener("change", () => {
        if (!student) return;
        if (!student.homeworkNotes) student.homeworkNotes = {};
        student.homeworkNotes[appState.currentLessonId] = notes.value;
        saveStudentsToLS();
    });

    const btnDone = document.createElement("button");
    btnDone.className = "btn btn--primary btn--sm";
    btnDone.textContent = "Mark Homework as Done";
    btnDone.addEventListener("click", () => {
        check.checked = true;
        setStudentProgressField("homework", true);
    });

    container.appendChild(title);
    container.appendChild(text);
    container.appendChild(wrap);
    container.appendChild(notesLabel);
    container.appendChild(notes);
    container.appendChild(btnDone);

    if (appState.teacherMode) {
        const note = document.createElement("p");
        note.className = "teacher-edit-note";
        note.textContent =
            "Teacher Mode: You can edit the main homework instructions for this lesson from the Teacher Dashboard form (Edit Lesson Content).";
        container.appendChild(note);
    }

    renderSectionStatus(container, "homework");
}

// Quick review

function renderReviewTab(container, lesson) {
    const title = document.createElement("h4");
    title.className = "td-lessonitem__title";
    title.textContent = "Quick Review – Flashcards";

    const all = [...lesson.vocabulary.core, ...lesson.vocabulary.extra];
    if (!all.length) {
        const p = document.createElement("p");
        p.textContent = "No vocabulary available for review.";
        container.appendChild(title);
        container.appendChild(p);
        renderSectionStatus(container, "review");
        return;
    }

    let pool = shuffleArray(all).slice(0, Math.min(5, all.length));
    let index = 0;
    let showFront = true;

    const card = document.createElement("div");
    card.className = "flashcard";
    const arEl = document.createElement("div");
    arEl.className = "flashcard__ar";
    const enEl = document.createElement("div");
    enEl.className = "flashcard__en";

    function renderCard() {
        const item = pool[index];
        if (showFront) {
            arEl.textContent = item.ar;
            enEl.textContent = "(tap to reveal meaning)";
            enEl.style.color = "#6b7280";
        } else {
            arEl.textContent = item.ar;
            enEl.textContent = item.en;
            enEl.style.color = "#111827";
        }
    }

    card.appendChild(arEl);
    card.appendChild(enEl);
    card.addEventListener("click", () => {
        showFront = !showFront;
        renderCard();
    });

    const controlsRow = document.createElement("div");
    controlsRow.style.display = "flex";
    controlsRow.style.justifyContent = "space-between";
    controlsRow.style.alignItems = "center";
    controlsRow.style.marginTop = "6px";

    const navButtons = document.createElement("div");
    navButtons.style.display = "flex";
    navButtons.style.gap = "6px";

    const btnPrev = document.createElement("button");
    btnPrev.className = "btn btn--ghost btn--sm";
    btnPrev.textContent = "Prev";
    btnPrev.addEventListener("click", () => {
        if (index > 0) {
            index--;
            showFront = true;
            renderCard();
        }
    });

    const btnNext = document.createElement("button");
    btnNext.className = "btn btn--ghost btn--sm";
    btnNext.textContent = "Next";
    btnNext.addEventListener("click", () => {
        if (index < pool.length - 1) {
            index++;
            showFront = true;
            renderCard();
        } else {
            alert("Nice! Quick review completed.");
            setStudentProgressField("review", true);
        }
    });

    const btnRandom = document.createElement("button");
    btnRandom.className = "btn btn--outline btn--sm";
    btnRandom.textContent = "Random";
    btnRandom.addEventListener("click", () => {
        index = Math.floor(Math.random() * pool.length);
        showFront = true;
        renderCard();
    });

    navButtons.appendChild(btnPrev);
    navButtons.appendChild(btnNext);
    navButtons.appendChild(btnRandom);

    const btnDone = document.createElement("button");
    btnDone.className = "btn btn--primary btn--sm";
    btnDone.textContent = "Mark Quick Review as Done";
    btnDone.addEventListener("click", () => setStudentProgressField("review", true));

    controlsRow.appendChild(navButtons);
    controlsRow.appendChild(btnDone);

    container.appendChild(title);
    container.appendChild(card);
    container.appendChild(controlsRow);

    renderCard();
    renderSectionStatus(container, "review");
}

// Teacher notes
function renderTeacherNotesTab(container, lesson) {
    const title = document.createElement("h4");
    title.className = "td-lessonitem__title";
    title.textContent = "Teacher Notes";

    const info = document.createElement("p");
    info.className = "teacher-edit-note";
    info.textContent =
        "Use this space to plan your flow, note common mistakes, or add extra prompts. Notes are saved locally on this device.";

    const textarea = document.createElement("textarea");
    textarea.className = "homework-notes";
    textarea.value = lesson.teacherNotes.myNotes || "";
    textarea.placeholder =
        "Lesson flow, timing, reminders about pronunciation, extra speaking prompts...";

    textarea.addEventListener("change", () => {
        lesson.teacherNotes.myNotes = textarea.value;
        saveLessonToLS(appState.currentLessonId);
        saveLessonToCloud(appState.currentLessonId);
    });

    container.appendChild(title);
    container.appendChild(info);
    container.appendChild(textarea);
}

// ========================= TEACHER MODE VISIBILITY =========================
function updateTeacherTabsVisibility() {
    const show = appState.teacherMode;
    $all(".lesson-tab--teacher-only").forEach((btn) => {
        btn.style.display = show ? "inline-flex" : "none";
    });
}

// ========================= TEACHER DASHBOARD =========================

function getLessonIdsSorted() {
    return Object.keys(lessons).sort((a, b) => {
        const la = lessons[a]?.meta?.level || "";
        const lb = lessons[b]?.meta?.level || "";
        const ua = lessons[a]?.meta?.unit || "";
        const ub = lessons[b]?.meta?.unit || "";
        const ta = lessons[a]?.meta?.lessonTitle || "";
        const tb = lessons[b]?.meta?.lessonTitle || "";
        return (la + ua + ta).localeCompare(lb + ub + tb);
    });
}

function getUniqueUnits() {
    const units = new Set();
    getLessonIdsSorted().forEach((id) => {
        const u = (lessons[id]?.meta?.unit || "").trim();
        if (u) units.add(u);
    });
    return Array.from(units).sort((a, b) => a.localeCompare(b));
}

function renderTeacherPicker() {
    const unitSel = document.getElementById("tdUnitSelect");
    const lessonSel = document.getElementById("tdLessonSelect");
    const sectionSel = document.getElementById("tdPickSection");
    const btnEdit = document.getElementById("tdEditSelected");
    const btnOpen = document.getElementById("tdOpenSelected");
    const btnDelete = document.getElementById("tdDeleteSelected");
    const btnSync = document.getElementById("tdSyncLessonsNow");

    // If picker UI isn't present, fall back to the full list
    if (!unitSel || !lessonSel || !sectionSel || !btnEdit || !btnOpen || !btnDelete) {
        // Avoid infinite recursion if the dashboard picker isn't in the DOM.
        // Fall back to rendering the long list if available.
        if (typeof renderTeacherLessonList === "function") {
            try { renderTeacherLessonList(); } catch { }
        }
        return;
    }

    // Hide the long list to reduce clutter (still present for compatibility)
    const listEl = document.getElementById("teacherLessonList");
    if (listEl) listEl.style.display = "none";

    const units = getUniqueUnits();
    const savedUnit = localStorage.getItem("td_selected_unit") || "";
    const savedLesson = localStorage.getItem("td_selected_lesson") || "";
    const savedPickSection = localStorage.getItem("td_pick_section") || "overview";

    // Fill unit select
    unitSel.innerHTML = "";
    const optAll = document.createElement("option");
    optAll.value = "";
    optAll.textContent = "All units";
    unitSel.appendChild(optAll);

    units.forEach((u) => {
        const opt = document.createElement("option");
        opt.value = u;
        opt.textContent = u;
        unitSel.appendChild(opt);
    });

    if (savedUnit && units.includes(savedUnit)) unitSel.value = savedUnit;

    // restore last picked section
    if (sectionSel) {
        sectionSel.value = savedPickSection;
        sectionSel.onchange = () => localStorage.setItem("td_pick_section", sectionSel.value || "overview");
    }

    function fillLessons() {
        const unit = unitSel.value;
        const ids = getLessonIdsSorted().filter((id) => {
            const u = (lessons[id]?.meta?.unit || "").trim();
            return !unit || u === unit;
        });

        lessonSel.innerHTML = "";
        const validIds = [];
        ids.forEach((id) => {
            const lesson = lessons[id];
            if (!lesson || !lesson.meta) return;
            const level = lesson.meta.level || "";
            const unitName = lesson.meta.unit || "";
            const title = lesson.meta.lessonTitle || "";
            if (!level || !unitName || !title) return;

            const opt = document.createElement("option");
            opt.value = id;
            opt.textContent = `${level} • ${unitName} • ${title}`;
            lessonSel.appendChild(opt);
            validIds.push(id);
        });

        // restore last selected lesson if still in filtered set
        if (savedLesson && validIds.includes(savedLesson)) lessonSel.value = savedLesson;
        else if (validIds.length) lessonSel.value = validIds[0];

        localStorage.setItem("td_selected_unit", unitSel.value || "");
        localStorage.setItem("td_selected_lesson", lessonSel.value || "");
    }

    fillLessons();

    unitSel.onchange = () => {
        localStorage.setItem("td_selected_unit", unitSel.value || "");
        fillLessons();
    };

    lessonSel.onchange = () => {
        localStorage.setItem("td_selected_lesson", lessonSel.value || "");
    };

    btnEdit.onclick = () => {
        const id = lessonSel.value;
        if (!id) return;
        const picked = (sectionSel && sectionSel.value) ? sectionSel.value : (localStorage.getItem("td_pick_section") || "overview");
        renderTeacherEditor(id, null, picked);
    };

    btnOpen.onclick = () => {
        const id = lessonSel.value;
        if (!id) return;
        appState.currentLessonId = id;
        goToLessonView({ teacherMode: false });
    };

    if (btnSync) {
        btnSync.onclick = async () => {
            await loadLessonsFromCloudOnce();
            // refresh picker lists
            renderTeacherPicker();
            alert("Synced lessons from online.");
        };
    }

    btnDelete.onclick = () => {
        const id = lessonSel.value;
        if (!id) return;
        if (!confirm("Delete this lesson template? This cannot be undone.")) return;
        delete lessons[id];
        localStorage.removeItem(LS_LESSON_PREFIX + id);
        try { deleteLessonFromCloud(id); } catch { }
        // refresh selects
        renderTeacherPicker();
        const editor = $("#teacherEditor");
        editor.style.display = "none";
        editor.innerHTML = "";
    };
}


function renderTeacherLessonList() {
    const listEl = $("#teacherLessonList");
    listEl.innerHTML = "";
    const ids = Object.keys(lessons);
    const q = (document.getElementById("tdLessonSearch")?.value || "").trim().toLowerCase();
    if (!ids.length) {
        const p = document.createElement("p");
        p.className = "empty-state";
        p.textContent =
            "No lesson templates yet. Use “Add New Lesson Template” to create your first lesson.";
        listEl.appendChild(p);
        return;
    }

    ids
        .filter((id) => {
            if (!q) return true;
            const lesson = lessons[id] || {};
            const hay = `${id} ${lesson?.meta?.level || ""} ${lesson?.meta?.unit || ""} ${lesson?.meta?.lessonTitle || ""}`.toLowerCase();
            return hay.includes(q);
        })
        .forEach((id) => {
            const lesson = lessons[id];
            const card = document.createElement("article");
            card.className = "td-lessonitem" + (appState.currentLessonId === id ? " td-lessonitem--active" : "");

            const title = document.createElement("h4");
            title.className = "td-lessonitem__title";
            title.textContent = `${lesson.meta.level} – ${lesson.meta.unit}`;

            const meta = document.createElement("p");
            meta.className = "td-lessonitem__meta";
            meta.textContent = lesson.meta.lessonTitle;

            const badge = document.createElement("span");
            badge.className = "td-lessonitem__id";
            badge.textContent = `ID: ${id}`;

            const actions = document.createElement("div");
            actions.className = "td-lessonitem__actions";

            const btnEdit = document.createElement("button");
            btnEdit.className = "btn btn--primary btn--sm";
            btnEdit.textContent = "Edit Lesson Content";
            btnEdit.addEventListener("click", () => {
                appState.currentLessonId = id;
                renderTeacherEditor(id, card); // ⭐ مررنا الكارد
            });




            const btnOpen = document.createElement("button");
            btnOpen.className = "btn btn--outline btn--sm";
            btnOpen.textContent = "Open Lesson View";
            btnOpen.addEventListener("click", () => {
                appState.currentLessonId = id;
                appState.teacherMode = false;
                $("#teacherModeToggle").checked = false;
                goToLessonView({ teacherMode: false });
            });

            const btnDelete = document.createElement("button");
            btnDelete.className = "btn btn--ghost btn--sm";
            btnDelete.textContent = "Delete Template";
            btnDelete.addEventListener("click", () => {
                if (
                    !confirm(
                        `Delete lesson template "${lesson.meta.lessonTitle}"?\nThis does not delete students' progress, but the lesson won't be available anymore.`
                    )
                )
                    return;
                delete lessons[id];
                localStorage.removeItem(LS_LESSON_PREFIX + id);
                deleteLessonFromCloud(id);
                const editor = $("#teacherEditor");
                editor.style.display = "none";
                editor.innerHTML = "";
                renderTeacherPicker();
            });

            actions.appendChild(btnEdit);
            actions.appendChild(btnOpen);
            actions.appendChild(btnDelete);

            card.appendChild(title);
            card.appendChild(meta);
            card.appendChild(badge);
            card.appendChild(actions);

            listEl.appendChild(card);
        });
}

function createNewLessonTemplate() {
    const newId = "lesson_" + Date.now();
    lessons[newId] = {
        meta: {
            level: "Beginner",
            unit: "New Unit",
            lessonTitle: "New Lesson",
        },
        overview: {
            title: "New Lesson Overview",
            description: "",
            goals: [],
        },
        useInLife: [],
        vocabulary: {
            core: [],
            extra: [],
        },
        dialogue: {
            lines: [],
        },
        grammar: [],
        practice: {
            quiz: [],
            rolePlays: [],
            translation: [],
        },
        microChecks: {
            enabled: false,
            every: 5,
            items: [],
        },
        homework: {
            instructions: "",
        },
        teacherNotes: {
            myNotes: "",
        },
    };
    saveLessonToLS(newId);
    saveLessonToCloud(newId);
    renderTeacherPicker();
    renderTeacherEditor(newId);
}



function applyTeacherSectionFilter(sectionKey) {
    const sections = $all('.teacher-editor__section[data-td-section]');
    sections.forEach((sec) => {
        const key = sec.getAttribute('data-td-section');
        sec.classList.toggle('td-hidden-section', key !== sectionKey);
    });
    localStorage.setItem("td_selected_section", sectionKey);
}

function renderTeacherEditor(lessonId, anchorCard, preselectSection) {
    const lesson = lessons[lessonId];
    const editor = $("#teacherEditor");
    if (!lesson || !editor) return;

    if (!lesson.practice) lesson.practice = { quiz: [], rolePlays: [], translation: [] };
    if (!Array.isArray(lesson.practice.translation)) lesson.practice.translation = [];
    if (lesson.grammarTab && typeof lesson.grammarTab === "object") {
        delete lesson.grammarTab;
    }

    // نحرك الفورم تحت الكارد اللي انضغط (Teacher Dashboard)
    editor.innerHTML = "";
    if (anchorCard) {
        anchorCard.insertAdjacentElement("afterend", editor);
    } else {
        const list = $("#teacherLessonList");
        if (list) list.insertAdjacentElement("afterend", editor);
    }
    editor.style.display = "block";

    editor.innerHTML = `
     <div class="teacher-editor__section">
     
      <div class="td-editor-buttons">
        
        <button id="tdCloseEditor" class="btn btn--ghost btn--sm">Close Editor</button>
      </div>
    </div>
    <h3>Editing: ${escapeHtml(lesson.meta.level)} – ${escapeHtml(lesson.meta.unit)} – ${escapeHtml(lesson.meta.lessonTitle)}</h3>
    <p class="teacher-edit-note">
      All changes here are saved locally and will apply to all students for this lesson.
    </p>

    <div class="td-sectionbar">
      <label for="tdSectionSelect">Edit section</label>
      <select id="tdSectionSelect" class="td-select">
        <option value="meta">Lesson Meta</option>
        <option value="overview">Overview</option>
        <option value="vocab">Vocabulary</option>
        <option value="dialogue">Dialogue</option>
        <option value="grammar">Grammar</option>
        <option value="translation">Translation</option>
        <option value="practice">Practice</option>
        <option value="homework">Homework</option>
        <option value="notes">Teacher Notes</option>
      </select>
    </div>

    <div class="teacher-editor__section" data-td-section="meta">
      <h4>Lesson Meta</h4>
      <div class="form-field form-field--inline">
        <label for="tdMetaLevel">Level</label>
        <select id="tdMetaLevel">
          <option value="Beginner">Beginner</option>
          <option value="Pre-Intermediate">Pre-Intermediate</option>
          <option value="Intermediate">Intermediate</option>
        </select>
      </div>
      <div class="form-field">
        <label for="tdMetaUnit">Unit</label>
        <input id="tdMetaUnit" class="td-input" />
      </div>
      <div class="form-field">
        <label for="tdMetaTitle">Lesson Title</label>
        <input id="tdMetaTitle" class="td-input" />
      </div>
      <p class="section-header__subtitle">Lesson ID: <span id="tdMetaId"></span></p>
      <div class="td-editor-buttons">
        <button id="tdSaveMeta" class="btn btn--primary btn--sm">Save Meta</button>
      </div>
    </div>

    <div class="teacher-editor__section" data-td-section="overview">
      <h4>Overview</h4>
      <div class="form-field">
        <label for="tdOverviewTitle">Overview Title</label>
        <input id="tdOverviewTitle" class="td-input" />
      </div>
      <div class="form-field">
        <label for="tdOverviewDesc">Description</label>
        <textarea id="tdOverviewDesc" class="homework-notes" rows="3"></textarea>
      </div>
      <div class="form-field">
        <label>Goals</label>
        <div id="tdOverviewGoalsList"></div>
        <div class="td-editor-buttons">
          <button id="tdAddGoal" class="btn btn--outline btn--sm">Add Goal</button>
          <button id="tdSaveGoals" class="btn btn--primary btn--sm">Save Goals</button>
        </div>
      </div>
      <div class="form-field">
        <label>Use it in your life (Arabic + English)</label>
        <div id="tdUseInLifeList"></div>
        <div class="td-editor-buttons">
          <button id="tdAddUseInLife" class="btn btn--outline btn--sm">Add Prompt</button>
        </div>
      </div>
    </div>

    <!-- 🆕 Vocab Section -->
    <div class="teacher-editor__section" data-td-section="vocab">
      <h4>Vocabulary</h4>
      <p class="teacher-edit-note">
        Edit core and extra vocabulary for this lesson. These words تظهر في تبويب Vocabulary و Quick Review.
      </p>

      <h5>Core Vocabulary</h5>
      <div id="tdVocabCoreList"></div>
      <div class="td-editor-buttons">
        <button id="tdAddVocabCore" class="btn btn--outline btn--sm">Add Core Word</button>
        <button id="tdSaveVocabCore" class="btn btn--primary btn--sm">Save Core</button>
      </div>

      <h5 style="margin-top: 10px;">Extra Vocabulary</h5>
      <div id="tdVocabExtraList"></div>
      <div class="td-editor-buttons">
        <button id="tdAddVocabExtra" class="btn btn--outline btn--sm">Add Extra Word</button>
        <button id="tdSaveVocabExtra" class="btn btn--primary btn--sm">Save Extra</button>
      </div>
    </div>

    <div class="teacher-editor__section" data-td-section="dialogue">
      <h4>Dialogue</h4>
      <p class="teacher-edit-note">Edit each line: speaker, Arabic (RTL) and English.</p>
      <div id="tdDialogueList"></div>
      <div class="td-editor-buttons">
        <button id="tdAddDialogueLine" class="btn btn--outline btn--sm">Add Line</button>
        <button id="tdSaveDialogue" class="btn btn--primary btn--sm">Save Dialogue</button>
      </div>
    </div>

    <div class="teacher-editor__section" data-td-section="grammar">
      <h4>Grammar Points</h4>
      <p class="teacher-edit-note">Short rules with descriptions.</p>
      <div id="tdGrammarList"></div>
      <div class="td-editor-buttons">
        <button id="tdAddGrammar" class="btn btn--outline btn--sm">Add Rule</button>
        <button id="tdSaveGrammar" class="btn btn--primary btn--sm">Save Grammar</button>
      </div>
    </div>

    <div class="teacher-editor__section" data-td-section="translation">
      <h4>Translation (Practice)</h4>
      <p class="teacher-edit-note">Custom translation sentences for the Translation tab.</p>
      <div id="tdTranslationList"></div>
      <div class="td-editor-buttons">
        <button id="tdAddTranslation" class="btn btn--outline btn--sm">Add Sentence</button>
        <button id="tdSaveTranslation" class="btn btn--primary btn--sm">Save Translation</button>
      </div>
    </div>

    <div class="teacher-editor__section" data-td-section="practice">
      <h4>Practice – MCQ</h4>
      <p class="teacher-edit-note">Edit quiz questions: Arabic question and 3 English options.</p>
      <div id="tdQuizList"></div>
      <div class="td-editor-buttons">
        <button id="tdAddQuiz" class="btn btn--outline btn--sm">Add MCQ</button>
        <button id="tdSaveQuiz" class="btn btn--primary btn--sm">Save MCQ</button>
      </div>
    </div>

    <div class="teacher-editor__section" data-td-section="practice">
      <h4>Practice – Role-play Prompts</h4>
      <p class="teacher-edit-note">Short speaking prompts for in-class practice.</p>
      <div id="tdRoleList"></div>
      <div class="td-editor-buttons">
        <button id="tdAddRole" class="btn btn--outline btn--sm">Add Prompt</button>
        <button id="tdSaveRole" class="btn btn--primary btn--sm">Save Prompts</button>
      </div>
    </div>

    <div class="teacher-editor__section" data-td-section="homework">
      <h4>Homework Instructions</h4>
      <p class="teacher-edit-note">This text is shared for all students.</p>
      <textarea id="tdHomeworkText" class="homework-notes" rows="3"></textarea>
      <div class="td-editor-buttons">
        <button id="tdSaveHomework" class="btn btn--primary btn--sm">Save Homework</button>
      </div>
    </div>

    <div class="teacher-editor__section" data-td-section="notes">
      <h4>Teacher Notes (Template)</h4>
      <textarea id="tdTeacherNotes" class="homework-notes" rows="3"></textarea>
      <div class="td-editor-buttons">
        <button id="tdSaveTeacherNotes" class="btn btn--primary btn--sm">Save Notes</button>
        <button id="tdCloseEditor" class="btn btn--ghost btn--sm">Close Editor</button>
      </div>
    </div>
  `;

    // Section filter: show only one editor section at a time
    const sectionSel = document.getElementById("tdSectionSelect");
    if (sectionSel) {
        const saved = localStorage.getItem("td_selected_section") || "meta";
        const initial = preselectSection || saved;
        sectionSel.value = initial;
        applyTeacherSectionFilter(sectionSel.value);
        sectionSel.addEventListener("change", () => applyTeacherSectionFilter(sectionSel.value));
    } else {
        // if no selector, show all
        $all('.teacher-editor__section[data-td-section]').forEach((sec) => sec.classList.remove('td-hidden-section'));
    }


    // ========== Meta ==========
    $("#tdMetaLevel").value = lesson.meta.level;
    $("#tdMetaUnit").value = lesson.meta.unit;
    $("#tdMetaTitle").value = lesson.meta.lessonTitle;
    $("#tdMetaId").textContent = lessonId;

    $("#tdSaveMeta").addEventListener("click", () => {
        lesson.meta.level = $("#tdMetaLevel").value;
        lesson.meta.unit = $("#tdMetaUnit").value.trim() || "Unit";
        lesson.meta.lessonTitle = $("#tdMetaTitle").value.trim() || "Lesson";
        saveLessonToLS(lessonId);
        renderTeacherPicker();
        alert("Lesson meta saved.");
    });

    // ========== Overview ==========
    $("#tdOverviewTitle").value = lesson.overview.title || "";
    $("#tdOverviewDesc").value = lesson.overview.description || "";

    const goalsListEl = $("#tdOverviewGoalsList");
    function renderGoals() {
        goalsListEl.innerHTML = "";
        (lesson.overview.goals || []).forEach((g) => {
            const row = document.createElement("div");
            row.className = "td-role-row";
            const inp = document.createElement("input");
            inp.className = "td-input td-role-input";
            inp.value = g;
            const delBtn = document.createElement("button");
            delBtn.type = "button";
            delBtn.className = "btn btn--ghost btn--sm";
            delBtn.textContent = "Delete";
            delBtn.addEventListener("click", () => row.remove());
            row.appendChild(inp);
            row.appendChild(delBtn);
            goalsListEl.appendChild(row);
        });
    }
    renderGoals();

    const useInLifeListEl = $("#tdUseInLifeList");
    function createUseInLifeRow(item = {}) {
        const row = document.createElement("div");
        row.className = "td-role-row";

        const ar = document.createElement("input");
        ar.className = "td-input td-input--ar";
        ar.placeholder = "Arabic prompt";
        ar.value = item.ar || "";

        const en = document.createElement("input");
        en.className = "td-input";
        en.placeholder = "English prompt";
        en.value = item.en || "";

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());

        row.appendChild(ar);
        row.appendChild(en);
        row.appendChild(delBtn);
        return row;
    }

    function renderUseInLife() {
        if (!useInLifeListEl) return;
        useInLifeListEl.innerHTML = "";
        (lesson.useInLife || []).forEach((q) => {
            const item = typeof q === "string" ? { en: q } : q;
            useInLifeListEl.appendChild(createUseInLifeRow(item));
        });
    }
    renderUseInLife();

    $("#tdAddGoal").addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "td-role-row";
        const inp = document.createElement("input");
        inp.className = "td-input td-role-input";
        inp.placeholder = "New goal...";
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());
        row.appendChild(inp);
        row.appendChild(delBtn);
        goalsListEl.appendChild(row);
    });

    const addUseInLifeBtn = $("#tdAddUseInLife");
    if (addUseInLifeBtn) {
        addUseInLifeBtn.addEventListener("click", () => {
            if (!useInLifeListEl) return;
            useInLifeListEl.appendChild(createUseInLifeRow({}));
        });
    }

    $("#tdSaveGoals").addEventListener("click", () => {
        const rows = goalsListEl.querySelectorAll(".td-role-row");
        const newGoals = [];
        rows.forEach((r) => {
            const val = r.querySelector("input").value.trim();
            if (val) newGoals.push(val);
        });

        const useRows = useInLifeListEl ? useInLifeListEl.querySelectorAll(".td-role-row") : [];
        const newUseInLife = [];
        useRows.forEach((r) => {
            const inputs = r.querySelectorAll("input");
            const ar = (inputs[0]?.value || "").trim();
            const en = (inputs[1]?.value || "").trim();
            if (ar || en) newUseInLife.push({ ar, en });
        });

        lesson.overview.title = $("#tdOverviewTitle").value.trim() || lesson.overview.title;
        lesson.overview.description =
            $("#tdOverviewDesc").value.trim() || lesson.overview.description;
        lesson.overview.goals = newGoals;
        lesson.useInLife = newUseInLife;
        saveLessonToLS(lessonId);
        // also sync online (shared)
        saveLessonToCloud(lessonId);
        alert("Overview saved.");
    });

    // ========== 🆕 Vocabulary ==========

    const vocabCoreList = $("#tdVocabCoreList");
    const vocabExtraList = $("#tdVocabExtraList");


    function createVocabRow(item = {}, isCore = true) {
        const row = document.createElement("div");
        row.className = "td-quiz-row";
        row.dataset.itemId = item.id || "";

        row.innerHTML = `
          <div class="td-label">Arabic (with vowels)</div>
          <input class="td-input td-input--ar td-vocab-ar" value="${escapeAttr(item.ar || "")}" />

          <div class="td-label">English meaning</div>
          <input class="td-input td-vocab-en" value="${escapeAttr(item.en || "")}" />

          <div class="td-label">Arabeezy (optional)</div>
          <input class="td-input td-vocab-arabeezy" value="${escapeAttr(item.enArabeezy || "")}" />

          <div class="td-label">Hint (optional)</div>
          <input class="td-input td-vocab-hint" value="${escapeAttr(item.hint || "")}" />

          <div class="td-label">Arabic example (optional)</div>
          <textarea class="td-input td-input--ar td-vocab-ex-ar" rows="2">${escapeHtml(item.exampleAr || "")}</textarea>

          <div class="td-label">Arabeezy example (optional)</div>
          <textarea class="td-input td-vocab-ex-arabeezy" rows="2">${escapeHtml(item.exampleArabeezy || "")}</textarea>

          <div class="td-label">English example (optional)</div>
          <textarea class="td-input td-vocab-ex-en" rows="2">${escapeHtml(item.exampleEn || "")}</textarea>
        `;

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());
        row.appendChild(delBtn);

        return row;
    }

    function renderVocabGroup(listEl, items) {
        listEl.innerHTML = "";
        (items || []).forEach((item) => {
            listEl.appendChild(createVocabRow(item));
        });
    }

    renderVocabGroup(vocabCoreList, lesson.vocabulary.core || []);
    renderVocabGroup(vocabExtraList, lesson.vocabulary.extra || []);

    $("#tdAddVocabCore").addEventListener("click", () => {
        vocabCoreList.appendChild(createVocabRow({}, true));
    });

    $("#tdAddVocabExtra").addEventListener("click", () => {
        vocabExtraList.appendChild(createVocabRow({}, false));
    });

    function collectVocabFrom(listEl, isCore) {
        const rows = listEl.querySelectorAll(".td-quiz-row");
        const result = [];
        rows.forEach((row) => {
            const ar = row.querySelector(".td-vocab-ar").value.trim();
            const en = row.querySelector(".td-vocab-en").value.trim();
            const enArabeezy = row.querySelector(".td-vocab-arabeezy").value.trim();
            const hint = row.querySelector(".td-vocab-hint").value.trim();
            const exampleAr = row.querySelector(".td-vocab-ex-ar").value.trim();
            const exampleArabeezy = row.querySelector(".td-vocab-ex-arabeezy").value.trim();
            const exampleEn = row.querySelector(".td-vocab-ex-en").value.trim();
            if (!ar || !en) return;
            let id = row.dataset.itemId;
            if (!id) {
                id = (isCore ? "core_" : "extra_") + Date.now() + "_" + Math.random().toString(16).slice(2);
            }
            result.push({ id, ar, en, enArabeezy, hint, exampleAr, exampleArabeezy, exampleEn });
        });
        return result;
    }

    $("#tdSaveVocabCore").addEventListener("click", () => {
        lesson.vocabulary.core = collectVocabFrom(vocabCoreList, true);
        saveLessonToLS(lessonId);
        // also sync online (shared)
        saveLessonToCloud(lessonId);
        alert("Core vocabulary saved.");
    });

    $("#tdSaveVocabExtra").addEventListener("click", () => {
        lesson.vocabulary.extra = collectVocabFrom(vocabExtraList, false);
        saveLessonToLS(lessonId);
        // also sync online (shared)
        saveLessonToCloud(lessonId);
        alert("Extra vocabulary saved.");
    });

    wireDialogueEditor({ $, lesson, lessonId, saveLessonToLS, saveLessonToCloud });
    wireGrammarEditor({
        $,
        lesson,
        lessonId,
        saveLessonToLS,
        saveLessonToCloud,
        escapeAttr,
        escapeHtml,
    });
    wireTranslationEditor({
        $,
        lesson,
        lessonId,
        saveLessonToLS,
        saveLessonToCloud,
        escapeHtml,
    });
    wireQuizEditor({ $, lesson, lessonId, saveLessonToLS, saveLessonToCloud });

    if (false) { // Legacy inline editor logic kept disabled during module migration.
    // ========== Grammar ==========
    const grammarList = $("#tdGrammarList");
    function renderGrammarRows() {
        grammarList.innerHTML = "";
        (lesson.grammar || []).forEach((g) => {
            const exampleLines = Array.isArray(g.examples)
                ? g.examples.map((ex) => [ex.ar, ex.arabeezy, ex.en].filter(Boolean).join(" | ")).join("\n")
                : "";
            const row = document.createElement("div");
            row.className = "td-quiz-row";
            row.innerHTML = `
        <div class="td-label">Rule title</div>
        <input class="td-input td-grammar-title" value="${escapeAttr(g.title || "")}" />
        <div class="td-label">Description</div>
        <textarea class="td-input td-grammar-desc" rows="2">${escapeHtml(g.description || "")}</textarea>
        <div class="td-label">Examples (Arabic | Arabeezy | English)</div>
        <textarea class="td-input td-grammar-examples" rows="3">${escapeHtml(exampleLines)}</textarea>
        <div class="td-label">Teacher notes</div>
        <textarea class="td-input td-grammar-notes" rows="2">${escapeHtml(g.teacherNotes || "")}</textarea>
      `;
            const delBtn = document.createElement("button");
            delBtn.type = "button";
            delBtn.className = "btn btn--ghost btn--sm";
            delBtn.textContent = "Delete";
            delBtn.addEventListener("click", () => row.remove());
            row.appendChild(delBtn);
            grammarList.appendChild(row);
        });
    }
    renderGrammarRows();

    $("#tdAddGrammar").addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "td-quiz-row";
        row.innerHTML = `
      <div class="td-label">Rule title</div>
      <input class="td-input td-grammar-title" placeholder="Rule title" />
      <div class="td-label">Description</div>
      <textarea class="td-input td-grammar-desc" rows="2" placeholder="Description / example"></textarea>
      <div class="td-label">Examples (Arabic | Arabeezy | English)</div>
      <textarea class="td-input td-grammar-examples" rows="3" placeholder="مثال عربي | Arabeezy | English"></textarea>
      <div class="td-label">Teacher notes</div>
      <textarea class="td-input td-grammar-notes" rows="2" placeholder="Notes for teacher mode"></textarea>
    `;
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());
        row.appendChild(delBtn);
        grammarList.appendChild(row);
    });

    $("#tdSaveGrammar").addEventListener("click", () => {
        const rows = grammarList.querySelectorAll(".td-quiz-row");
        const newGrammar = [];
        rows.forEach((r) => {
            const title = r.querySelector(".td-grammar-title").value.trim();
            const desc = r.querySelector(".td-grammar-desc").value.trim();
            const notes = r.querySelector(".td-grammar-notes")?.value.trim() || "";
            const examplesRaw = r.querySelector(".td-grammar-examples")?.value || "";
            const examples = examplesRaw
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => {
                    const parts = line.split("|").map((p) => p.trim());
                    return {
                        ar: parts[0] || "",
                        arabeezy: parts[1] || "",
                        en: parts[2] || "",
                    };
                })
                .filter((ex) => ex.ar || ex.en || ex.arabeezy);
            if (title) {
                newGrammar.push({
                    id: "g_" + Date.now() + Math.random(),
                    title,
                    description: desc,
                    teacherNotes: notes,
                    examples,
                });
            }
        });
        lesson.grammar = newGrammar;
        saveLessonToLS(lessonId);
        // also sync online (shared)
        saveLessonToCloud(lessonId);
        alert("Grammar saved.");
    });

    // ========== Translation ==========
    const translationList = $("#tdTranslationList");
    function createTranslationRow(item = {}) {
        const row = document.createElement("div");
        row.className = "td-quiz-row";
        row.dataset.itemId = item.id || "";

        row.innerHTML = `
      <div class="td-label">Direction</div>
      <select class="td-select td-translation-type">
        <option value="enToAr">English → Arabic</option>
        <option value="arToEn">Arabic → English</option>
      </select>
      <div class="td-label">English sentence</div>
      <textarea class="td-input td-translation-en" rows="2">${escapeHtml(item.textEn || "")}</textarea>
      <div class="td-label">Arabic sentence</div>
      <textarea class="td-input td-input--ar td-translation-ar" rows="2">${escapeHtml(item.textAr || "")}</textarea>
    `;

        const typeSel = row.querySelector(".td-translation-type");
        if (typeSel) typeSel.value = item.type || "enToAr";

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());
        row.appendChild(delBtn);
        return row;
    }

    function renderTranslationRows() {
        if (!translationList) return;
        translationList.innerHTML = "";
        (lesson.practice.translation || []).forEach((t) => {
            translationList.appendChild(createTranslationRow(t));
        });
    }
    renderTranslationRows();

    const addTranslationBtn = $("#tdAddTranslation");
    if (addTranslationBtn && translationList) {
        addTranslationBtn.addEventListener("click", () => {
            translationList.appendChild(createTranslationRow({}));
        });
    }

    const saveTranslationBtn = $("#tdSaveTranslation");
    if (saveTranslationBtn && translationList) {
        saveTranslationBtn.addEventListener("click", () => {
            const rows = translationList.querySelectorAll(".td-quiz-row");
            const newItems = [];
            rows.forEach((row, idx) => {
                const type = row.querySelector(".td-translation-type")?.value || "enToAr";
                const textEn = row.querySelector(".td-translation-en")?.value.trim() || "";
                const textAr = row.querySelector(".td-translation-ar")?.value.trim() || "";
                if (!textEn && !textAr) return;
                const id = row.dataset.itemId || `t_${Date.now()}_${idx}`;
                newItems.push({ id, type, textEn, textAr });
            });
            lesson.practice.translation = newItems;
            saveLessonToLS(lessonId);
            saveLessonToCloud(lessonId);
            alert("Translation saved.");
        });
    }

    // ========== Quiz ==========
    const quizList = $("#tdQuizList");
    quizList.innerHTML = "";
    lesson.practice.quiz.forEach((q) => {
        const row = document.createElement("div");
        row.className = "td-quiz-row";

        const qLabel = document.createElement("div");
        qLabel.className = "td-label";
        qLabel.textContent = "Question (Arabic)";

        const qInput = document.createElement("textarea");
        qInput.className = "td-input td-input--ar td-quiz-question";
        qInput.rows = 2;
        qInput.value = q.questionAr || "";

        const optLabel = document.createElement("div");
        optLabel.className = "td-label";
        optLabel.textContent = "Options (English)";

        const optGrid = document.createElement("div");
        optGrid.className = "td-quiz-grid";

        const optInputs = [];
        for (let i = 0; i < 3; i++) {
            const inp = document.createElement("input");
            inp.className = "td-input";
            inp.value = q.optionsEn[i] || "";
            optGrid.appendChild(inp);
            optInputs.push(inp);
        }

        const correctWrap = document.createElement("div");
        correctWrap.style.marginTop = "4px";
        correctWrap.style.display = "flex";
        correctWrap.style.justifyContent = "space-between";
        correctWrap.style.alignItems = "center";

        const sel = document.createElement("select");
        sel.className = "td-select";
        ["Option 1", "Option 2", "Option 3"].forEach((lab, idx) => {
            const op = document.createElement("option");
            op.value = String(idx);
            op.textContent = lab;
            sel.appendChild(op);
        });
        sel.value = String(q.correctIndex || 0);

        const selLabel = document.createElement("span");
        selLabel.className = "td-label";
        selLabel.textContent = "Correct option:";

        const left = document.createElement("div");
        left.style.display = "flex";
        left.style.flexDirection = "column";
        left.style.gap = "2px";
        left.appendChild(selLabel);
        left.appendChild(sel);

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());

        correctWrap.appendChild(left);
        correctWrap.appendChild(delBtn);

        row.appendChild(qLabel);
        row.appendChild(qInput);
        row.appendChild(optLabel);
        row.appendChild(optGrid);
        row.appendChild(correctWrap);

        quizList.appendChild(row);
    });

    $("#tdAddQuiz").addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "td-quiz-row";

        const qLabel = document.createElement("div");
        qLabel.className = "td-label";
        qLabel.textContent = "Question (Arabic)";

        const qInput = document.createElement("textarea");
        qInput.className = "td-input td-input--ar td-quiz-question";
        qInput.rows = 2;
        qInput.placeholder = "Question in Arabic";

        const optLabel = document.createElement("div");
        optLabel.className = "td-label";
        optLabel.textContent = "Options (English)";

        const optGrid = document.createElement("div");
        optGrid.className = "td-quiz-grid";
        ["Option 1", "Option 2", "Option 3"].forEach((placeholder) => {
            const inp = document.createElement("input");
            inp.className = "td-input";
            inp.placeholder = placeholder;
            optGrid.appendChild(inp);
        });

        const correctWrap = document.createElement("div");
        correctWrap.style.marginTop = "4px";
        correctWrap.style.display = "flex";
        correctWrap.style.justifyContent = "space-between";
        correctWrap.style.alignItems = "center";

        const selLabel = document.createElement("span");
        selLabel.className = "td-label";
        selLabel.textContent = "Correct option:";

        const sel = document.createElement("select");
        sel.className = "td-select";
        ["Option 1", "Option 2", "Option 3"].forEach((lab, idx) => {
            const op = document.createElement("option");
            op.value = String(idx);
            op.textContent = lab;
            sel.appendChild(op);
        });

        const left = document.createElement("div");
        left.style.display = "flex";
        left.style.flexDirection = "column";
        left.style.gap = "2px";
        left.appendChild(selLabel);
        left.appendChild(sel);

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "btn btn--ghost btn--sm";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => row.remove());

        correctWrap.appendChild(left);
        correctWrap.appendChild(delBtn);

        row.appendChild(qLabel);
        row.appendChild(qInput);
        row.appendChild(optLabel);
        row.appendChild(optGrid);
        row.appendChild(correctWrap);
        quizList.appendChild(row);
    });

    $("#tdSaveQuiz").addEventListener("click", () => {
        const rows = quizList.querySelectorAll(".td-quiz-row");
        const newQuiz = [];
        rows.forEach((row) => {
            const qInput = row.querySelector(".td-quiz-question");
            const questionAr = qInput.value.trim();
            if (!questionAr) return;
            const opts = Array.from(row.querySelectorAll(".td-quiz-grid .td-input")).map((i) =>
                i.value.trim()
            );
            if (!opts[0] || !opts[1] || !opts[2]) return;
            const sel = row.querySelector(".td-select");
            const correctIndex = Number(sel.value) || 0;
            newQuiz.push({
                id: "q_" + Date.now() + "_" + Math.random().toString(16).slice(2),
                questionAr,
                optionsEn: opts,
                correctIndex,
            });
        });
        lesson.practice.quiz = newQuiz;
        saveLessonToLS(lessonId);
        // also sync online (shared)
        saveLessonToCloud(lessonId);
        alert("MCQ saved.");
    });

    }

    // ========== Role-play / Homework / Teacher Notes ==========
    wireRolePlayEditor({ $, lesson, lessonId, saveLessonToLS, saveLessonToCloud });
    wireHomeworkEditor({ $, lesson, lessonId, saveLessonToLS, saveLessonToCloud });
    wireTeacherNotesEditor({
        $,
        lesson,
        lessonId,
        saveLessonToLS,
        saveLessonToCloud,
        editor,
    });
}
// ================= AUTH MODAL HELPERS =================
function openAuthModal(forcedRole) {
    document.body.classList.remove("home-only");
    console.log("openAuthModal called with role:", forcedRole);
    const modal = document.getElementById("authModal");
    const roleSelect = document.getElementById("authRole");
    const errorBox = document.getElementById("authError");

    if (!modal) return;

    // مسح أي خطأ قديم
    if (errorBox) errorBox.textContent = "";

    // لو جاي من زر "أنا طالب" أو "أنا مدرس"
    if (forcedRole === "student" || forcedRole === "teacher") {
        modal.dataset.forcedRole = forcedRole;
        if (roleSelect) roleSelect.value = forcedRole;
    } else {
        // لو جاي من زر Login العادي
        delete modal.dataset.forcedRole;
    }

    modal.classList.add("modal--open");
}

function closeAuthModal() {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    modal.classList.remove("modal--open");
    delete modal.dataset.forcedRole;
}

// ========================= DOM READY =========================
document.addEventListener("DOMContentLoaded", async () => {
    loadLessonDataFromLS();
    loadCustomUnits();
    loadFontSize();
    appState.students = loadStudentsFromLS();
    loadBackupSettings();
    loadContactSettings();
    loadBookingSettings();
    await loadContactSettingsFromCloud();
    await loadBookingSettingsFromCloud();
    ensureEmailJsInit();

    // top nav
    $all(".top-nav__link").forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.nav;
            if (target === "home-screen") goToHome();
            else if (target === "students-screen") goToStudents();
            else if (target === "levels-screen") goToLevels();
            else if (target === "teacher-dashboard-screen") goToTeacherDashboard();
        });
    });

    const btnArabicLetters = $("#btnArabicLetters");
    if (btnArabicLetters) {
        btnArabicLetters.addEventListener("click", () => {
            goToArabicLetters();
        });
    }
    const btnSubscribe = $("#btnSubscribe");
    if (btnSubscribe) {
        btnSubscribe.addEventListener("click", () => {
            openSubscribeModal();
        });
    }
    const btnContact = $("#btnContact");
    if (btnContact) {
        btnContact.addEventListener("click", () => {
            openWhatsAppWithMessage("Hi! I want to ask about Palestinian Arabic lessons.");
        });
    }
    const btnBackFromSubscribe = document.getElementById("btnBackToUnitsFromSubscribe");
    if (btnBackFromSubscribe) {
        btnBackFromSubscribe.addEventListener("click", () => {
            goToLevels();
        });
    }
    const btnLettersBackToUnits = $("#btnLettersBackToUnits");
    if (btnLettersBackToUnits) {
        btnLettersBackToUnits.addEventListener("click", () => {
            goToLevels();
        });
    }
    const btnExportArabicLettersPdf = $("#btnExportArabicLettersPdf");
    if (btnExportArabicLettersPdf) {
        btnExportArabicLettersPdf.addEventListener("click", () => {
            exportArabicLettersPdf();
        });
    }
    const btnSaveContact = document.getElementById("btnSaveContact");
    const contactSaveMsg = document.getElementById("contactSaveMsg");
    const inputWhatsApp = document.getElementById("contactWhatsApp");
    const inputContactEmail = document.getElementById("contactEmail");
    const inputSitePrice = document.getElementById("contactSitePrice");
    if (inputWhatsApp) inputWhatsApp.value = contactSettings.whatsapp || "";
    if (inputContactEmail) inputContactEmail.value = contactSettings.email || "";
    if (inputSitePrice) inputSitePrice.value = contactSettings.sitePrice || "";
    if (btnSaveContact) {
        btnSaveContact.addEventListener("click", async () => {
            contactSettings.whatsapp = inputWhatsApp ? inputWhatsApp.value.trim() : "";
            contactSettings.email = inputContactEmail ? inputContactEmail.value.trim() : "";
            contactSettings.sitePrice = inputSitePrice ? inputSitePrice.value.trim() : "";
            saveContactSettings();
            await saveContactSettingsToCloud();
            if (contactSaveMsg) contactSaveMsg.textContent = "Saved.";
            setTimeout(() => {
                if (contactSaveMsg) contactSaveMsg.textContent = "";
            }, 1500);
        });
    }

    // Availability editor
    const availGrid = document.getElementById("availabilityGrid");
    const availTz = document.getElementById("availTimezone");
    const availSlot = document.getElementById("availSlotMinutes");
    const availBreak = document.getElementById("availBreakMinutes");
    const btnSaveAvail = document.getElementById("btnSaveAvailability");
    const btnResetAvail = document.getElementById("btnResetAvailability");
    const availSaveMsg = document.getElementById("availabilitySaveMsg");
    const dayKeys = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    function renderAvailabilityEditor() {
        if (availTz) availTz.value = bookingSettings.timezone || "";
        if (availSlot) availSlot.value = bookingSettings.slotMinutes || 50;
        if (availBreak) availBreak.value = bookingSettings.breakMinutes || 10;
        if (!availGrid) return;
        availGrid.innerHTML = dayKeys
            .map((d) => {
                const info = bookingSettings.days[d];
                return `
                    <div class="avail-day" data-day="${escapeAttr(d)}">
                        <div class="avail-day__head">
                            <input type="checkbox" data-avail-enabled ${info.enabled ? "checked" : ""} />
                            <strong>${escapeHtml(d)}</strong>
                        </div>
                        <div class="form-field form-field--inline">
                            <label>Start</label>
                            <input type="time" data-avail-start value="${escapeAttr(info.start)}" />
                        </div>
                        <div class="form-field form-field--inline">
                            <label>End</label>
                            <input type="time" data-avail-end value="${escapeAttr(info.end)}" />
                        </div>
                    </div>
                `;
            })
            .join("");
    }
    renderAvailabilityEditor();
    if (btnSaveAvail) {
        btnSaveAvail.addEventListener("click", async () => {
            bookingSettings.timezone = availTz ? availTz.value.trim() : "";
            bookingSettings.slotMinutes = Number(availSlot?.value || 50);
            bookingSettings.breakMinutes = Number(availBreak?.value || 10);
            bookingSettings.totalSlotMinutes = bookingSettings.slotMinutes + bookingSettings.breakMinutes;
            if (availGrid) {
                dayKeys.forEach((d) => {
                    const el = availGrid.querySelector(`.avail-day[data-day="${d}"]`);
                    if (!el) return;
                    bookingSettings.days[d] = {
                        enabled: !!el.querySelector("[data-avail-enabled]")?.checked,
                        start: el.querySelector("[data-avail-start]")?.value || "09:00",
                        end: el.querySelector("[data-avail-end]")?.value || "17:00",
                    };
                });
            }
            saveBookingSettings();
            await saveBookingSettingsToCloud();
            if (availSaveMsg) availSaveMsg.textContent = "Saved.";
            setTimeout(() => {
                if (availSaveMsg) availSaveMsg.textContent = "";
            }, 1500);
        });
    }
    if (btnResetAvail) {
        btnResetAvail.addEventListener("click", async () => {
            bookingSettings = getDefaultBookingSettings();
            ensureBookingSettingsShape();
            renderAvailabilityEditor();
            saveBookingSettings();
            await saveBookingSettingsToCloud();
            renderExceptions();
            await buildBookingSelects();
            if (availSaveMsg) availSaveMsg.textContent = "Availability reset to fresh defaults.";
            setTimeout(() => {
                if (availSaveMsg) availSaveMsg.textContent = "";
            }, 1800);
        });
    }

    // Busy exceptions
    const exceptionDate = document.getElementById("exceptionDate");
    const exceptionStart = document.getElementById("exceptionStart");
    const exceptionEnd = document.getElementById("exceptionEnd");
    const exceptionNote = document.getElementById("exceptionNote");
    const btnAddException = document.getElementById("btnAddException");
    const exceptionsList = document.getElementById("exceptionsList");
    const exceptionsMsg = document.getElementById("exceptionsMsg");
    const btnConnectGoogleCalendar = document.getElementById("btnConnectGoogleCalendar");
    const btnDisconnectGoogleCalendar = document.getElementById("btnDisconnectGoogleCalendar");
    const btnImportGoogleCalendar = document.getElementById("btnImportGoogleCalendar");
    const btnSyncBookingsNow = document.getElementById("btnSyncBookingsNow");
    const googleCalendarMsg = document.getElementById("googleCalendarMsg");
    const calendarStatusIndicator = document.getElementById("calendarStatusIndicator");
    const calendarStatusText = document.getElementById("calendarStatusText");
    const appsScriptWebAppUrl = document.getElementById("appsScriptWebAppUrl");
    const btnSaveAppsScriptUrl = document.getElementById("btnSaveAppsScriptUrl");
    const btnTestAppsScript = document.getElementById("btnTestAppsScript");
    const btnImportBusyAppsScript = document.getElementById("btnImportBusyAppsScript");
    const appsScriptMsg = document.getElementById("appsScriptMsg");
    const preplyCalendarIdInput = document.getElementById("preplyCalendarIdInput");
    const btnSavePreplyCalendarId = document.getElementById("btnSavePreplyCalendarId");
    const btnTestPreplyCalendar = document.getElementById("btnTestPreplyCalendar");
    let calendarSyncTimer = null;
    let calendarBusyImportDone = false;

    async function updateGoogleCalendarStatus() {
        if (!calendarStatusIndicator || !calendarStatusText) return;
        try {
            const isConnected = await window.isGoogleCalendarConnected?.();
            calendarStatusIndicator.className = `status-indicator ${isConnected ? 'connected' : 'disconnected'}`;
            calendarStatusText.textContent = isConnected ? 'Connected' : 'Not connected';
            if (btnConnectGoogleCalendar) btnConnectGoogleCalendar.style.display = isConnected ? 'none' : 'inline-block';
            if (btnDisconnectGoogleCalendar) btnDisconnectGoogleCalendar.style.display = isConnected ? 'inline-block' : 'none';
            if (appState.currentUser?.role === "teacher" && preplyCalendarIdInput) {
                try {
                    const teacherDoc = await db.collection("teachers").doc(appState.currentUser.uid).get();
                    const teacherData = teacherDoc.exists ? (teacherDoc.data() || {}) : {};
                    preplyCalendarIdInput.value = teacherData.preplyCalendarId || teacherData.googleCalendar?.preplyCalendarId || "";
                    if (appsScriptWebAppUrl) appsScriptWebAppUrl.value = teacherData.appsScript?.webAppUrl || "";
                } catch {}
            }
            if (isConnected) startCalendarAutoSync();
            else stopCalendarAutoSync();
            if (isConnected && appState.currentUser?.role === "teacher" && !calendarBusyImportDone) {
                calendarBusyImportDone = true;
                try {
                    const result = await window.importGoogleCalendarEventsToBusyBlocks?.();
                    if (result?.success) {
                        await loadBookingSettingsFromCloud();
                        renderExceptions();
                        await buildBookingSelects();
                    }
                } catch {}
            }
        } catch {
            calendarStatusIndicator.className = 'status-indicator disconnected';
            calendarStatusText.textContent = 'Not connected';
        }
    }
    function updateGoogleCalendarStatusMessage(message) {
        if (googleCalendarMsg) googleCalendarMsg.textContent = message || "";
    }
    try { window.refreshGoogleCalendarStatus = updateGoogleCalendarStatus; } catch { }
    try { window.updateGoogleCalendarStatusMessage = updateGoogleCalendarStatusMessage; } catch { }

    async function refreshRuntimeBusyBlocks() {
        runtimeBusyBlocks = [];
        try {
            const result = await window.fetchBusyBlocksFromAppsScript?.({
                days: 35,
                timeZone: bookingSettings.timezone || getLocalTimezone() || "Africa/Cairo",
            });
            if (result?.success && Array.isArray(result.busyBlocks)) {
                runtimeBusyBlocks = result.busyBlocks;
            }
        } catch {}
    }

    async function syncPendingBookingsToCalendar({ showMsg = true } = {}) {
        if (!appState.currentUser || appState.currentUser.role !== "teacher") return;
        const appsScriptResult = await window.syncPendingBookingsViaAppsScript?.({ limit: 10 });
        if (appsScriptResult?.success || appsScriptResult?.syncedCount) {
            if (showMsg && googleCalendarMsg) googleCalendarMsg.textContent = appsScriptResult.message;
            await refreshRuntimeBusyBlocks();
            await buildBookingSelects();
            return;
        }
        if (!window.createGoogleCalendarEvent) return;
        try {
            const connected = await window.isGoogleCalendarConnected?.();
            if (!connected) {
                if (showMsg && googleCalendarMsg) googleCalendarMsg.textContent = "Google Calendar is not connected.";
                return;
            }
            const tokenOk = await window.ensureGoogleCalendarAccess?.({ interactive: false });
            if (!tokenOk) {
                if (showMsg && googleCalendarMsg) googleCalendarMsg.textContent = "Reconnect Google Calendar, then try again.";
                return;
            }
            const snap = await db
                .collection("bookings")
                .where("calendarSynced", "==", false)
                .limit(10)
                .get();
            const pendingDocs = snap.docs.sort((a, b) => {
                const aTs = a.data()?.createdAt || 0;
                const bTs = b.data()?.createdAt || 0;
                return aTs - bTs;
            });
            if (!pendingDocs.length) {
                if (showMsg && googleCalendarMsg) googleCalendarMsg.textContent = "No pending bookings to sync.";
                return;
            }
            let syncedCount = 0;
            let failedCount = 0;
            for (const doc of pendingDocs) {
                const booking = doc.data();
                if (!booking || !booking.slot || booking.status === "canceled") continue;
                const slotDate = new Date(booking.slot);
                const slotMinutes = bookingSettings.slotMinutes || 50;
                const slotEnd = new Date(slotDate.getTime() + slotMinutes * 60000);
                const eventData = {
                    summary: `Lesson with ${booking.name}`,
                    description: `Student: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nNotes: ${booking.notes || 'None'}\nBooking ID: ${doc.id}`,
                    start: {
                        dateTime: slotDate.toISOString(),
                        timeZone: bookingSettings.timezone || getLocalTimezone()
                    },
                    end: {
                        dateTime: slotEnd.toISOString(),
                        timeZone: bookingSettings.timezone || getLocalTimezone()
                    },
                    attendees: [
                        { email: booking.email, displayName: booking.name }
                    ],
                    reminders: { useDefault: true }
                };
                const googleEvent = await window.createGoogleCalendarEvent(eventData);
                if (googleEvent) {
                    await db.collection("bookings").doc(doc.id).set(
                        {
                            calendarSynced: true,
                            googleCalendarEventId: googleEvent.id,
                            history: firebase.firestore.FieldValue.arrayUnion({
                                at: Date.now(),
                                action: "calendar_synced",
                                by: "system"
                            })
                        },
                        { merge: true }
                    );
                    await db.collection("publicBookings").doc(doc.id).set(
                        { calendarSynced: true, updatedAt: Date.now() },
                        { merge: true }
                    );
                    syncedCount += 1;
                } else {
                    failedCount += 1;
                }
            }
            if (showMsg && googleCalendarMsg) {
                googleCalendarMsg.textContent = failedCount
                    ? `Synced ${syncedCount} bookings. ${failedCount} need reconnect or retry.`
                    : `Bookings synced to Google Calendar (${syncedCount}).`;
            }
        } catch (err) {
            console.error("Booking sync failed:", err);
            if (showMsg && googleCalendarMsg) googleCalendarMsg.textContent = err?.message || "Sync failed. Try reconnecting Google Calendar.";
        }
    }

    function startCalendarAutoSync() {
        if (calendarSyncTimer) return;
        calendarSyncTimer = setInterval(() => {
            syncPendingBookingsToCalendar({ showMsg: false });
        }, 60000);
        syncPendingBookingsToCalendar({ showMsg: false });
    }

    function stopCalendarAutoSync() {
        if (calendarSyncTimer) clearInterval(calendarSyncTimer);
        calendarSyncTimer = null;
    }

    if (btnConnectGoogleCalendar) {
        btnConnectGoogleCalendar.addEventListener("click", async () => {
            window.connectToGoogleCalendar?.((success, error) => {
                if (googleCalendarMsg) {
                    googleCalendarMsg.textContent = success ? "Google Calendar connected. Now save/test your Preply calendar if needed." : (error || "Connect failed.");
                }
                calendarBusyImportDone = false;
                updateGoogleCalendarStatus();
            });
        });
    }
    if (btnDisconnectGoogleCalendar) {
        btnDisconnectGoogleCalendar.addEventListener("click", async () => {
            const ok = await window.disconnectFromGoogleCalendar?.();
            if (googleCalendarMsg) googleCalendarMsg.textContent = ok ? "Google Calendar disconnected." : "Disconnect failed.";
            updateGoogleCalendarStatus();
        });
    }
    if (btnImportGoogleCalendar) {
        btnImportGoogleCalendar.addEventListener("click", async () => {
            if (googleCalendarMsg) googleCalendarMsg.textContent = "Importing...";
            const result = await window.importGoogleCalendarEventsToBusyBlocks?.();
            if (googleCalendarMsg) googleCalendarMsg.textContent = result?.message || "Import finished.";
            await updateGoogleCalendarStatus();
            await loadBookingSettingsFromCloud();
            renderExceptions();
            await buildBookingSelects();
        });
    }
    if (btnSyncBookingsNow) {
        btnSyncBookingsNow.addEventListener("click", async () => {
            await syncPendingBookingsToCalendar();
        });
    }
    if (btnSaveAppsScriptUrl) {
        btnSaveAppsScriptUrl.addEventListener("click", async () => {
            const result = await window.saveAppsScriptSettings?.({ webAppUrl: appsScriptWebAppUrl?.value || "" });
            if (appsScriptMsg) appsScriptMsg.textContent = result?.message || "Apps Script save finished.";
        });
    }
    if (btnTestAppsScript) {
        btnTestAppsScript.addEventListener("click", async () => {
            if (appsScriptMsg) appsScriptMsg.textContent = "Testing Apps Script...";
            const result = await window.testAppsScriptConnection?.();
            if (appsScriptMsg) appsScriptMsg.textContent = result?.message || "Apps Script test finished.";
        });
    }
    if (btnImportBusyAppsScript) {
        btnImportBusyAppsScript.addEventListener("click", async () => {
            if (appsScriptMsg) appsScriptMsg.textContent = "Importing busy times from Apps Script...";
            const result = await window.fetchBusyBlocksFromAppsScript?.({
                days: 35,
                timeZone: bookingSettings.timezone || getLocalTimezone() || "Africa/Cairo",
            });
            if (result?.success && Array.isArray(result.busyBlocks)) {
                bookingSettings.exceptions = mergeBusyBlocksLists(bookingSettings.exceptions, result.busyBlocks);
                saveBookingSettings();
                await saveBookingSettingsToCloud();
                runtimeBusyBlocks = result.busyBlocks;
                renderExceptions();
                await buildBookingSelects();
                if (appsScriptMsg) appsScriptMsg.textContent = `Imported ${result.busyBlocks.length} busy blocks from Apps Script and merged them with existing busy times.`;
            } else if (appsScriptMsg) {
                appsScriptMsg.textContent = result?.message || "Apps Script import failed.";
            }
        });
    }
    if (btnSavePreplyCalendarId) {
        btnSavePreplyCalendarId.addEventListener("click", async () => {
            if (!appState.currentUser || appState.currentUser.role !== "teacher") return;
            const value = (window.normalizeCalendarId?.(preplyCalendarIdInput?.value || "") || (preplyCalendarIdInput?.value || "").trim());
            try {
                await db.collection("teachers").doc(appState.currentUser.uid).set({
                    preplyCalendarId: value,
                    googleCalendar: {
                        preplyCalendarId: value,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    }
                }, { merge: true });
                try { window.preplyCalendarId = value; } catch {}
                if (preplyCalendarIdInput) preplyCalendarIdInput.value = value;
                if (googleCalendarMsg) googleCalendarMsg.textContent = value ? "Preply Calendar ID saved." : "Preply Calendar ID cleared.";
            } catch (err) {
                if (googleCalendarMsg) googleCalendarMsg.textContent = "Could not save Preply Calendar ID.";
            }
        });
    }
    if (btnTestPreplyCalendar) {
        btnTestPreplyCalendar.addEventListener("click", async () => {
            if (googleCalendarMsg) googleCalendarMsg.textContent = "Testing Preply calendar...";
            const result = await window.testPreplyCalendarAccess?.();
            if (googleCalendarMsg) googleCalendarMsg.textContent = result?.message || "Preply calendar test finished.";
        });
    }
    updateGoogleCalendarStatus();

    function renderExceptions() {
        if (!exceptionsList) return;
        const list = Array.isArray(bookingSettings.exceptions) ? bookingSettings.exceptions : [];
        if (!list.length) {
            exceptionsList.innerHTML = "<div class=\"small-note\">No busy blocks yet.</div>";
            return;
        }
        exceptionsList.innerHTML = list
            .map((ex, idx) => {
                const note = ex.note ? `<div class="exception-item__note">${ex.note}</div>` : "";
                return `
                    <div class="exception-item" data-exception-index="${idx}">
                        <div>
                            <div class="exception-item__meta">${ex.date} · ${ex.start}–${ex.end}</div>
                            ${note}
                        </div>
                        <button class="btn btn--ghost btn--sm" data-exception-remove>Remove</button>
                    </div>
                `;
            })
            .join("");
    }

    if (exceptionsList) {
        exceptionsList.addEventListener("click", async (e) => {
            const btn = e.target.closest("[data-exception-remove]");
            if (!btn) return;
            const item = btn.closest("[data-exception-index]");
            if (!item) return;
            const idx = Number(item.getAttribute("data-exception-index"));
            if (Number.isNaN(idx)) return;
            bookingSettings.exceptions.splice(idx, 1);
            saveBookingSettings();
            await saveBookingSettingsToCloud();
            renderExceptions();
            await buildBookingSelects();
        });
    }

    if (btnAddException) {
        btnAddException.addEventListener("click", async () => {
            const date = (exceptionDate?.value || "").trim();
            const start = (exceptionStart?.value || "").trim();
            const end = (exceptionEnd?.value || "").trim();
            const note = (exceptionNote?.value || "").trim();
            if (!date || !start || !end) {
                if (exceptionsMsg) exceptionsMsg.textContent = "Please choose date, start, and end.";
                return;
            }
            if (toMinutes(end) <= toMinutes(start)) {
                if (exceptionsMsg) exceptionsMsg.textContent = "End time must be after start time.";
                return;
            }
            bookingSettings.exceptions.push({ date, start, end, note });
            saveBookingSettings();
            await saveBookingSettingsToCloud();
            
            if (exceptionNote) exceptionNote.value = "";
            if (exceptionsMsg) exceptionsMsg.textContent = "Busy block added.";
            setTimeout(() => {
                if (exceptionsMsg) exceptionsMsg.textContent = "";
            }, 1500);
            renderExceptions();
            await buildBookingSelects();
        });
    }

    renderExceptions();

    // Booking UI
    const bookingForm = document.getElementById("bookingForm");
    const bookingMsg = document.getElementById("bookingMsg");
    const bookingSubmit = document.getElementById("bookingSubmit");
    const bookingInfo = document.getElementById("bookingInfo");
    const selectedTimeDisplay = document.getElementById("selectedTimeDisplay");
    const bookingTimezoneLabel = document.getElementById("bookingTimezoneLabel");
    const bookingDateChips = document.getElementById("bookingDateChips");
    const bookingWeekPrev = document.getElementById("bookingWeekPrev");
    const bookingWeekNext = document.getElementById("bookingWeekNext");
    const bookingWeekLabel = document.getElementById("bookingWeekLabel");
    const bookingWeeklyGrid = document.getElementById("bookingWeeklyGrid");
    const bookingEmptyState = document.getElementById("bookingEmptyState");
    const bookingStatusEmail = document.getElementById("bookingStatusEmail");
    const bookingStatusBtn = document.getElementById("bookingStatusBtn");
    const bookingStatusList = document.getElementById("bookingStatusList");
    const bookingStatusMsg = document.getElementById("bookingStatusMsg");
    const bookingSuccessModal = document.getElementById("bookingSuccessModal");
    const bookingSuccessText = document.getElementById("bookingSuccessText");
    const btnClearAllBookings = document.getElementById("btnClearAllBookings");
    const btnClearBusyBlocks = document.getElementById("btnClearBusyBlocks");
    let slotsByDate = new Map();
    let scheduleByDate = new Map();
    let bookingWeekOffset = 0;

    function updateBookingInfo() {
        if (!bookingInfo || !selectedTimeDisplay) return;
        if (!window.selectedDate || !window.selectedTime) {
            bookingInfo.style.display = "none";
            selectedTimeDisplay.textContent = "";
            return;
        }
        const dt = new Date(window.selectedDate);
        const [h, m] = window.selectedTime.split(":").map(Number);
        dt.setHours(h, m, 0, 0);
        bookingInfo.style.display = "block";
        selectedTimeDisplay.textContent = formatSlotTime(dt.getTime());
    }

    function renderDateChips(keys, activeKey = "") {
        if (!bookingDateChips) return;
        bookingDateChips.innerHTML = "";
        keys.slice(0, 7).forEach((key) => {
            const dateObj = new Date(`${key}T12:00:00`);
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "date-chip";
            btn.textContent = dateObj.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
            if (activeKey === key) btn.classList.add("is-active");
            btn.addEventListener("click", () => {
                const slots = (scheduleByDate.get(key) || []).filter((slot) => slot.available).sort((a, b) => a.startMs - b.startMs);
                if (slots.length) setSelectedSlot(new Date(slots[0].startMs));
                buildBookingSelects();
            });
            bookingDateChips.appendChild(btn);
        });
    }

    function getWeekStart(date, weekOffset = 0) {
        const base = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        base.setDate(base.getDate() + weekOffset * 7);
        return base;
    }

    function setSelectedSlot(slot) {
        const dt = new Date(slot.getTime());
        dt.setSeconds(0, 0);
        window.selectedDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        window.selectedTime = dt.toTimeString().slice(0, 5);
        if (bookingSubmit) bookingSubmit.disabled = false;
        updateBookingInfo();
    }

    function renderWeeklyCalendar(activeDateKeys) {
        if (!bookingWeeklyGrid) return;
        bookingWeeklyGrid.innerHTML = "";
        const weekStart = getWeekStart(new Date(), bookingWeekOffset);
        const todayKey = getDateKey(new Date());
        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i);
            const dateKey = getDateKey(day);
            const slots = (scheduleByDate.get(dateKey) || []).slice().sort((a, b) => a.startMs - b.startMs);
            const col = document.createElement("div");
            const hasAvailable = slots.some((slot) => slot.available);
            col.className = `booking-day-column${hasAvailable ? "" : " is-empty"}`;
            const header = document.createElement("div");
            header.className = "booking-day-header";
            const headerLabel = document.createElement("div");
            headerLabel.className = "booking-day-label";
            headerLabel.textContent = dateKey === todayKey ? "Today" : day.toLocaleDateString([], { weekday: "short" });
            const headerDate = document.createElement("div");
            headerDate.className = "booking-day-date";
            headerDate.textContent = day.toLocaleDateString([], { month: "short", day: "numeric" });
            header.appendChild(headerLabel);
            header.appendChild(headerDate);
            const body = document.createElement("div");
            body.className = "booking-day-slots";
            if (!slots.length) {
                const empty = document.createElement("div");
                empty.className = "booking-day-empty";
                empty.textContent = "No working times set";
                body.appendChild(empty);
            } else {
                slots.forEach((slot) => {
                    const btn = document.createElement("button");
                    btn.type = "button";
                    btn.className = `slot-btn${slot.available ? "" : " is-unavailable"}`;
                    btn.disabled = !slot.available;
                    const slotDate = new Date(slot.startMs);
                    btn.appendChild(
                        document.createTextNode(
                            slotDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
                        )
                    );
                    if (!slot.available) {
                        const meta = document.createElement("span");
                        meta.className = "slot-btn__meta";
                        meta.textContent = slot.reason || "";
                        btn.appendChild(meta);
                    }
                    if (window.selectedDate && window.selectedTime) {
                        const selectedStamp = `${getDateKey(window.selectedDate)} ${window.selectedTime}`;
                        const slotStamp = `${getDateKey(slotDate)} ${slotDate.toTimeString().slice(0, 5)}`;
                        if (selectedStamp === slotStamp) btn.classList.add("is-active");
                    }
                    if (slot.available) {
                        btn.addEventListener("click", () => {
                            setSelectedSlot(slotDate);
                            buildBookingSelects();
                        });
                    }
                    body.appendChild(btn);
                });
            }
            col.appendChild(header);
            col.appendChild(body);
            bookingWeeklyGrid.appendChild(col);
        }

        if (bookingEmptyState) {
            const hasAnySlots = Array.from({ length: 7 }, (_, idx) => {
                const d = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + idx);
                return (scheduleByDate.get(getDateKey(d)) || []).length > 0;
            }).some(Boolean);
            bookingEmptyState.style.display = hasAnySlots ? "none" : "block";
        }

        if (bookingWeekLabel) {
            const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
            bookingWeekLabel.textContent = `${weekStart.toLocaleDateString([], { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString([], { month: "short", day: "numeric" })}`;
        }

        const visibleKeys = Array.from({ length: 7 }, (_, idx) => {
            const d = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + idx);
            return getDateKey(d);
        });
        renderDateChips(visibleKeys, window.selectedDate ? getDateKey(window.selectedDate) : getDateKey(weekStart));
    }

    function enableBookingGridDrag() {
        if (!bookingWeeklyGrid || bookingWeeklyGrid.dataset.dragReady === "1") return;
        bookingWeeklyGrid.dataset.dragReady = "1";
        let isDown = false;
        let startX = 0;
        let startScrollLeft = 0;
        bookingWeeklyGrid.addEventListener("pointerdown", (e) => {
            if (e.target.closest(".slot-btn")) return;
            isDown = true;
            startX = e.clientX;
            startScrollLeft = bookingWeeklyGrid.scrollLeft;
            bookingWeeklyGrid.classList.add("is-dragging");
        });
        window.addEventListener("pointerup", () => {
            isDown = false;
            bookingWeeklyGrid.classList.remove("is-dragging");
        });
        bookingWeeklyGrid.addEventListener("pointermove", (e) => {
            if (!isDown) return;
            const dx = e.clientX - startX;
            bookingWeeklyGrid.scrollLeft = startScrollLeft - dx;
        });
    }

    async function buildBookingSelects() {
        if (bookingTimezoneLabel) {
            const tz = getLocalTimezone() || "your local timezone";
            bookingTimezoneLabel.textContent = `Showing times in ${tz}`;
        }

        await refreshRuntimeBusyBlocks();
        const schedule = await getSchedulableSlots(35);
        slotsByDate = new Map();
        scheduleByDate = new Map();
        schedule.forEach((slot) => {
            const key = slot.dateKey;
            if (!scheduleByDate.has(key)) scheduleByDate.set(key, []);
            scheduleByDate.get(key).push(slot);
            if (!slot.available) return;
            const dt = new Date(slot.startMs);
            if (!slotsByDate.has(key)) slotsByDate.set(key, []);
            slotsByDate.get(key).push(dt);
        });

        const dateKeys = Array.from(scheduleByDate.keys()).sort();
        if (!dateKeys.length) {
            if (bookingEmptyState) bookingEmptyState.style.display = "block";
            window.selectedDate = null;
            window.selectedTime = null;
            if (bookingSubmit) bookingSubmit.disabled = true;
            renderWeeklyCalendar([]);
            updateBookingInfo();
            return;
        }

        if (window.selectedDate && window.selectedTime) {
            const selectedKey = getDateKey(window.selectedDate);
            const stillAvailable = (slotsByDate.get(selectedKey) || []).some((slot) => slot.toTimeString().slice(0, 5) === window.selectedTime);
            if (!stillAvailable) {
                window.selectedDate = null;
                window.selectedTime = null;
                if (bookingSubmit) bookingSubmit.disabled = true;
            }
        }

        const currentWeekStart = getWeekStart(new Date(), bookingWeekOffset);
        const visibleHasSlots = Array.from({ length: 7 }, (_, idx) => {
            const d = new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() + idx);
            return (scheduleByDate.get(getDateKey(d)) || []).length > 0;
        }).some(Boolean);
        if (!visibleHasSlots && dateKeys.length) {
            const firstAvailable = new Date(`${dateKeys[0]}T12:00:00`);
            const today = new Date();
            const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const firstStart = new Date(firstAvailable.getFullYear(), firstAvailable.getMonth(), firstAvailable.getDate());
            const dayDiff = Math.max(0, Math.floor((firstStart.getTime() - todayStart.getTime()) / 86400000));
            bookingWeekOffset = Math.floor(dayDiff / 7);
        }

        renderWeeklyCalendar(dateKeys);
        updateBookingInfo();
    }

    if (bookingWeekPrev) {
        bookingWeekPrev.addEventListener("click", () => {
            bookingWeekOffset = Math.max(0, bookingWeekOffset - 1);
            buildBookingSelects();
        });
    }

    if (bookingWeekNext) {
        bookingWeekNext.addEventListener("click", () => {
            bookingWeekOffset += 1;
            buildBookingSelects();
        });
    }

    buildBookingSelects();
    setupBookingPhoneField();
    enableBookingGridDrag();
    try { window.buildBookingSelects = buildBookingSelects; } catch { }

    async function loadBookingStatus(email) {
        await loadBookingStatusByEmail({
            db,
            email,
            bookingStatusList,
            bookingStatusMsg,
            hashEmail,
            escapeHtml,
            formatSlotTime,
        });
    }

    if (bookingStatusBtn) {
        bookingStatusBtn.addEventListener("click", () => {
            const email = (bookingStatusEmail?.value || "").trim();
            loadBookingStatus(email);
        });
    }
    const lastEmail = (localStorage.getItem("pal_arabic_last_booking_email") || "").trim();
    if (lastEmail && bookingStatusEmail) {
        bookingStatusEmail.value = lastEmail;
        loadBookingStatus(lastEmail);
    }

    if (bookingForm) {
        bookingForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const selectedDate = window.selectedDate;
            const selectedTime = window.selectedTime;
            const name = (document.getElementById("bookingName").value || "").trim().slice(0, 100);
            const email = (document.getElementById("bookingEmail").value || "").trim().toLowerCase().slice(0, 200);
            const phoneRaw = (document.getElementById("bookingPhone")?.value || "").trim();
            const phone = buildBookingPhoneValue(phoneRaw);
            const notes = (document.getElementById("bookingNotes")?.value || "").trim().slice(0, 1000);
            const reasonLabels = getBookingReasonLabels();
            const reason = reasonLabels.join(", ");
            const level = (document.getElementById("bookingLevel")?.value || "").trim().slice(0, 100);
            const lessonsPerMonth = (document.getElementById("bookingLessonsPerMonth")?.value || "").trim().slice(0, 50);
            const honeypot = (document.getElementById("bookingWebsite")?.value || "").trim();
            const studentTimeZone = getLocalTimezone() || "";
            const studentLocale = navigator.language || "";
            const countryHint = studentLocale.includes("-") ? studentLocale.split("-").pop() : studentLocale;
            const bookingSubmitLabel = bookingSubmit?.querySelector(".btn__label");
            if (!isValidEmail(email)) {
                if (bookingMsg) bookingMsg.textContent = "Please enter a valid email.";
                return;
            }
            if (!isValidPhone(phone)) {
                if (bookingMsg) bookingMsg.textContent = "Please enter a valid phone number.";
                return;
            }
            if (notes.length > 1000) {
                if (bookingMsg) bookingMsg.textContent = "Notes are too long.";
                return;
            }
            const recaptchaReady = isLocalDevHost() || !window.grecaptcha || typeof window.grecaptcha.getResponse !== "function"
                ? true
                : !!window.grecaptcha.getResponse();

            await submitGuestBooking({
                db,
                bookingSettings,
                contactSettings,
                getLocalTimezone,
                selectedDate,
                selectedTime,
                formValues: {
                    name,
                    email,
                    phone,
                    notes,
                    reasonLabels,
                    reason,
                    level,
                    lessonsPerMonth,
                    honeypot,
                    studentTimeZone,
                    studentLocale,
                    countryHint,
                    recaptchaReady,
                },
                bookingSubmit,
                bookingSubmitLabel,
                bookingMsg,
                bookingSuccessModal,
                bookingSuccessText,
                bookingStatusEmail,
                findBookingConflict,
                buildBookingSelects,
                hashEmail,
                sendBookingEmail,
                createBookingViaAppsScript: window.createBookingViaAppsScript,
                loadBookingStatus,
                isLocalDevHost,
            });
        });
    }

    // Teacher booking list
    const teacherBookingList = document.getElementById("teacherBookingList");
    const teacherBookingMsg = document.getElementById("teacherBookingMsg");
    let bookingCache = new Map();

    async function renderTeacherBookings() {
        bookingCache = await renderTeacherBookingsView({
            db,
            teacherBookingList,
            bookingCache,
            escapeHtml,
            formatSlotTime,
        });
    }

    async function openReschedule(itemEl, booking) {
        await openReschedulePanel({
            itemEl,
            booking,
            getAvailableSlots,
            escapeHtml,
        });
    }

    if (teacherBookingList) {
        teacherBookingList.addEventListener("click", async (e) => {
            const btn = e.target.closest("[data-action]");
            if (!btn) return;
            const item = btn.closest("[data-booking-id]");
            if (!item) return;
            const bookingId = item.getAttribute("data-booking-id");
            const booking = bookingCache.get(bookingId);
            const action = btn.getAttribute("data-action");
            if (!booking) return;

            if (action === "cancel") {
                try {
                    await cancelTeacherBooking({ db, firebase, bookingId });
                    if (teacherBookingMsg) teacherBookingMsg.textContent = "Booking canceled.";
                    await renderTeacherBookings();
                    await buildBookingSelects();
                } catch {
                    if (teacherBookingMsg) teacherBookingMsg.textContent = "Cancel failed.";
                }
                return;
            }

            if (action === "reschedule") {
                await openReschedule(item, booking);
                return;
            }

            if (action === "close-reschedule") {
                const resched = item.querySelector(".booking-item__resched");
                if (resched) {
                    resched.classList.remove("is-open");
                    resched.innerHTML = "";
                }
                return;
            }

            if (action === "confirm-reschedule") {
                const select = item.querySelector(".booking-resched-select");
                const newSlot = select ? Number(select.value) : null;
                if (!newSlot || Number.isNaN(newSlot)) return;
                if (newSlot === booking.slot) {
                    if (teacherBookingMsg) teacherBookingMsg.textContent = "Pick a different time.";
                    return;
                }
                try {
                    const conflict = await findBookingConflict(newSlot, { excludeBookingId: bookingId });
                    if (conflict) {
                        if (teacherBookingMsg) teacherBookingMsg.textContent = "That slot is taken.";
                        return;
                    }
                    await rescheduleTeacherBooking({
                        db,
                        firebase,
                        bookingId,
                        booking,
                        newSlot,
                    });
                    if (teacherBookingMsg) teacherBookingMsg.textContent = "Booking rescheduled.";
                    await renderTeacherBookings();
                    await buildBookingSelects();
                } catch {
                    if (teacherBookingMsg) teacherBookingMsg.textContent = "Reschedule failed.";
                }
            }
        });
        renderTeacherBookings();
    }

    if (btnClearBusyBlocks) {
        btnClearBusyBlocks.addEventListener("click", async () => {
            if (!window.confirm("Clear all busy blocks? This cannot be undone.")) return;
            bookingSettings.exceptions = [];
            saveBookingSettings();
            await saveBookingSettingsToCloud();
            renderExceptions();
            await buildBookingSelects();
            if (teacherBookingMsg) teacherBookingMsg.textContent = "Busy blocks cleared.";
        });
    }

    if (btnClearAllBookings) {
        btnClearAllBookings.addEventListener("click", async () => {
            if (!appState.currentUser || appState.currentUser.role !== "teacher") return;
            if (!window.confirm("Delete all bookings from both private and public collections? This cannot be undone.")) return;
            try {
                await clearAllTeacherBookings({ db });
                if (bookingStatusList) bookingStatusList.innerHTML = "";
                if (teacherBookingMsg) teacherBookingMsg.textContent = "All bookings cleared.";
                await renderTeacherBookings();
                await buildBookingSelects();
            } catch (err) {
                if (teacherBookingMsg) teacherBookingMsg.textContent = "Could not clear bookings.";
            }
        });
    }

    // Subscribe screen wiring
    const guestSiteWhatsApp = document.getElementById("guestSiteWhatsApp");
    if (guestSiteWhatsApp) {
        guestSiteWhatsApp.addEventListener("click", () => {
            openWhatsAppWithMessage("Hi! I want full site access.");
        });
    }
    const trialContactBtn = document.getElementById("trialContactBtn");
    if (trialContactBtn) {
        trialContactBtn.addEventListener("click", () => {
            openWhatsAppWithMessage("Hi! I want to ask about the free 50-minute trial lesson.");
        });
    }
    const trialEmailBtn = document.getElementById("trialEmailBtn");
    if (trialEmailBtn) {
        trialEmailBtn.addEventListener("click", () => {
            const email = (contactSettings.email || "").trim();
            if (!email) {
                toast("Contact email not set.");
                return;
            }
            const subject = encodeURIComponent("Question about Palestinian Arabic lessons");
            const body = encodeURIComponent("Hello,\n\nI want to ask about Palestinian Arabic lessons.");
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        });
    }
    initArabicLettersScreen();

    // hero buttons
    // ===== HERO BUTTONS (أنا طالب / أنا مدرس) =====
    const btnHeroStudent = document.getElementById("btnHeroStudent");
    const btnHeroTeacher = document.getElementById("btnHeroTeacher");
    const btnHeroGuest = document.getElementById("btnHeroGuest");
    const btnHeroSubscribe = document.getElementById("btnHeroSubscribe");

    if (btnHeroStudent) {
        btnHeroStudent.addEventListener("click", () => {
            // الطالب → نفتح مودال تسجيل الدخول كـ STUDENT
            console.log("Student hero clicked");
            openAuthModal("student");
        });
    }

    if (btnHeroTeacher) {
        btnHeroTeacher.addEventListener("click", () => {
            // المدرّس → نفتح مودال تسجيل الدخول كـ TEACHER
            console.log("Teacher hero clicked");
            openAuthModal("teacher");
        });
    }
    if (btnHeroGuest) {
        btnHeroGuest.addEventListener("click", () => {
            appState.currentUser = { uid: "guest", email: "Guest", role: "guest" };
            appState.guestMode = true;
            appState.guestStudent = {
                id: "guest",
                name: "Guest",
                level: "Beginner",
                progress: {},
                homeworkNotes: {},
            };
            appState.currentStudentId = "guest";
            appState.currentLessonId = LESSON_ID_GREETING;
            appState.currentTab = "overview";
            updateAuthUI();
            goToLevels();
        });
    }
    if (btnHeroSubscribe) {
        btnHeroSubscribe.addEventListener("click", () => {
            openSubscribeModal();
        });
    }

    // Subscribe modal buttons
    const subscribeWhatsAppBtn = document.getElementById("subscribeWhatsAppBtn");
    const subscribeBookingBtn = document.getElementById("subscribeBookingBtn");

    if (subscribeWhatsAppBtn) {
        subscribeWhatsAppBtn.addEventListener("click", () => {
            closeSubscribeModal();
            openWhatsAppWithMessage("Hello, I'm interested in Full Site Access. Can you please provide more information?");
        });
    }
    const floatingChatBtn = document.getElementById("floatingChatBtn");
    if (floatingChatBtn) {
        floatingChatBtn.addEventListener("click", () => {
            openWhatsAppWithMessage("Hello, I want to ask about Palestinian Arabic lessons.");
        });
    }

    document.querySelectorAll("[data-close-booking-success]").forEach((el) => {
        el.addEventListener("click", () => {
            if (bookingSuccessModal) bookingSuccessModal.classList.remove("modal--open");
        });
    });
    document.querySelectorAll("[data-close-whatsapp-chooser]").forEach((el) => {
        el.addEventListener("click", () => {
            const chooser = document.getElementById("whatsAppChooserModal");
            if (chooser) chooser.classList.remove("modal--open");
        });
    });
    const whatsappAppBtn = document.getElementById("openWhatsAppAppBtn");
    if (whatsappAppBtn) {
        whatsappAppBtn.addEventListener("click", () => {
            const chooser = document.getElementById("whatsAppChooserModal");
            if (chooser) chooser.classList.remove("modal--open");
            if (pendingWhatsAppTargets?.appUrl) {
                window.location.assign(pendingWhatsAppTargets.appUrl);
            }
        });
    }
    const whatsappWebBtn = document.getElementById("openWhatsAppWebBtn");
    if (whatsappWebBtn) {
        whatsappWebBtn.addEventListener("click", () => {
            const chooser = document.getElementById("whatsAppChooserModal");
            if (chooser) chooser.classList.remove("modal--open");
            if (pendingWhatsAppTargets?.webUrl) {
                window.location.assign(pendingWhatsAppTargets.webUrl);
            }
        });
    }
    const whatsappCopyBtn = document.getElementById("copyWhatsAppLinkBtn");
    if (whatsappCopyBtn) {
        whatsappCopyBtn.addEventListener("click", async () => {
            if (pendingWhatsAppTargets?.webUrl) {
                try {
                    await navigator.clipboard?.writeText(pendingWhatsAppTargets.webUrl);
                    toast("WhatsApp link copied.");
                } catch {
                    toast("Could not copy the WhatsApp link.");
                }
            }
        });
    }

    if (subscribeBookingBtn) {
        subscribeBookingBtn.addEventListener("click", () => {
            closeSubscribeModal();
            goToSubscribeScreen();
        });
    }

    // Close subscribe modal on backdrop click
    document.querySelectorAll("[data-close-subscribe]").forEach(el => {
        el.addEventListener("click", closeSubscribeModal);
    });

    // add student
    $("#addStudentForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = $("#studentName").value.trim();
        const level = $("#studentLevel").value;
        if (!name) return;

        const goalCheckboxes = document.querySelectorAll('input[name="goalOption"]:checked');
        const goals = Array.from(goalCheckboxes).map((c) => c.value);

        const student = {
            id: "s_" + Date.now(),
            name,
            goals,
            level,
            progress: {},
            homeworkNotes: {},
        };
        appState.students.push(student);
        saveStudentsToLS();
        $("#studentName").value = "";
        goalCheckboxes.forEach((c) => (c.checked = false));
        $("#studentLevel").value = "Beginner";
        renderStudents();
    });
    // ================= WHITEBOARD UI =================
    const whiteboardPanel = document.getElementById("whiteboardPanel");
    const btnToggleWhiteboard = document.getElementById("btnToggleWhiteboard");
    const wbColorInput = document.getElementById("whiteboardColor");
    const wbSizeInput = document.getElementById("whiteboardSize");
    const wbSizeVal = document.getElementById("whiteboardSizeVal");
    const wbClearBtn = document.getElementById("whiteboardClear");
    const wbDownloadBtn = document.getElementById("whiteboardDownload");

    if (btnToggleWhiteboard && whiteboardPanel) {
        btnToggleWhiteboard.addEventListener("click", () => {
            const isHidden = whiteboardPanel.classList.contains("hidden");
            if (isHidden) {
                whiteboardPanel.classList.remove("hidden");
                // لما أفتح اللوحة، أهيّئ الكانفاس وأحمّل الرسمة
                initWhiteboardCanvas();
            } else {
                whiteboardPanel.classList.add("hidden");
            }
        });
    }

    if (wbColorInput) {
        wbColorInput.addEventListener("input", () => {
            whiteboardState.color = wbColorInput.value;
        });
    }

    if (wbSizeInput && wbSizeVal) {
        wbSizeInput.addEventListener("input", () => {
            const v = Number(wbSizeInput.value) || 3;
            whiteboardState.size = v;
            wbSizeVal.textContent = v + "px";
        });
        // قيمة ابتدائية
        whiteboardState.size = Number(wbSizeInput.value) || 3;
        wbSizeVal.textContent = whiteboardState.size + "px";
    }

    if (wbClearBtn) {
        wbClearBtn.addEventListener("click", () => {
            const canvas = document.getElementById("whiteboardCanvas");
            if (!canvas || !whiteboardState.ctx) return;
            if (!confirm("Clear this whiteboard for the current lesson?")) return;
            whiteboardState.ctx.clearRect(0, 0, canvas.width, canvas.height);
            saveWhiteboardToLS();
        });
    }

    if (wbDownloadBtn) {
        wbDownloadBtn.addEventListener("click", () => {
            const canvas = document.getElementById("whiteboardCanvas");
            if (!canvas) return;
            const link = document.createElement("a");
            const lesson = lessons[appState.currentLessonId];
            const title = lesson ? lesson.meta.lessonTitle || "lesson" : "lesson";
            link.download = `whiteboard_${title.replace(/\s+/g, "_")}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    }

    const btnExportLesson = document.getElementById("btnExportLessonPdf");
    if (btnExportLesson) {
        btnExportLesson.addEventListener("click", () => {
            const student = getCurrentStudent();
            const studentName = student ? student.name : "";
            const lessonId = appState.currentLessonId;
            if (!lessonId) {
                alert("No lesson selected.");
                return;
            }
            openExportModal("lesson-view", lessonId, studentName);
        });
    }
    const exportForm = document.getElementById("exportOptionsForm");
    if (exportForm) {
        exportForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const modal = document.getElementById("exportModal");
            const lessonId = exportContext.lessonId;
            const lesson = lessons[lessonId];
            if (!lesson) {
                alert("Lesson not found.");
                return;
            }

            const includeVocab = document.getElementById("expIncludeVocab").checked;
            const includeDialogue = document.getElementById("expIncludeDialogue").checked;
            const includeGrammar = document.getElementById("expIncludeGrammar").checked;
            const includeHomework = document.getElementById("expIncludeHomework").checked;
            let includeTeacherNotes =
                document.getElementById("expIncludeTeacherNotes").checked;

            const versionInput = exportForm.querySelector(
                'input[name="expVersion"]:checked'
            );
            const version = versionInput ? versionInput.value : "student";

            if (version === "student") {
                // مهما كان checkbox تبع Teacher Notes، نخفيه في Student version
                includeTeacherNotes = false;
            }

            const html = buildLessonExportHtml(lesson, {
                includeVocab,
                includeDialogue,
                includeGrammar,
                includeHomework,
                includeTeacherNotes,
                version,
                studentName: exportContext.studentName,
            });

            closeExportModal();
            openPrintWindow(html);
        });
    }
    // Backup buttons in Teacher Dashboard
    const btnExportBackup = document.getElementById("btnExportBackup");
    const btnImportBackup = document.getElementById("btnImportBackup");
    const backupFileInput = document.getElementById("backupFileInput");
    const backupFrequencySelect = document.getElementById("backupFrequencySelect");
    const backupLastInfo = document.getElementById("backupLastInfo");

    if (backupFrequencySelect) {
        backupFrequencySelect.value = backupSettings.frequency || "off";
        backupFrequencySelect.addEventListener("change", () => {
            backupSettings.frequency = backupFrequencySelect.value;
            saveBackupSettings();
            checkBackupReminder();
        });
    }

    if (backupLastInfo && backupSettings.lastBackupAt) {
        const last = new Date(backupSettings.lastBackupAt);
        backupLastInfo.textContent =
            "Last backup: " +
            last.toLocaleString() +
            "  |  Frequency: " +
            backupSettings.frequency;
    }

    if (btnExportBackup) {
        btnExportBackup.addEventListener("click", () => {
            handleExportBackup();
        });
    }

    if (btnImportBackup && backupFileInput) {
        btnImportBackup.addEventListener("click", () => {
            backupFileInput.click();
        });

        backupFileInput.addEventListener("change", () => {
            const file = backupFileInput.files[0];
            if (file) {
                handleImportBackupFile(file);
                backupFileInput.value = "";
            }
        });
    }

    // تشيك التذكير بعد ما نحمّل الإعدادات
    checkBackupReminder();

    // أزرار إغلاق المودال
    document
        .querySelectorAll("[data-close-export-modal], #exportCancelBtn")
        .forEach((el) => {
            el.addEventListener("click", () => closeExportModal());
        });

    // level & teacher buttons
    $("#btnSwitchProfile").addEventListener("click", () => {
        // Save current lesson position before clearing current student
        try { persistResumeBeforeNav(); } catch { }
        appState.currentStudentId = null;
        goToStudents();
    });
    const btnContinueLesson = document.getElementById("btnContinueLesson");
    if (btnContinueLesson) {
        btnContinueLesson.addEventListener("click", () => {
            const student = getCurrentStudent();
            if (!student) return;
            if (!tryResumeStudent(student)) {
                setStudentLessonContext(student);
                goToLevels();
                toast("No saved spot yet. Opened this student's level.");
            }
        });
    }
    $("#btnGoTeacherDashboard").addEventListener("click", () => {
        goToTeacherDashboard();
    });
    $("#btnBackToLevels").addEventListener("click", () => goToLevels());
    $("#btnBackToStudents").addEventListener("click", () => goToStudents());
    $("#btnTDBackLevels").addEventListener("click", () => goToLevels());
    $("#btnTDBackStudents").addEventListener("click", () => goToStudents());
    // ================= VOCAB MODAL CONTROLS =================
    const btnPrev = document.getElementById("vocabPrevBtn");
    const btnNext = document.getElementById("vocabNextBtn");
    const btnToggleExamples = document.getElementById("vocabToggleExamplesBtn");
    const btnToggleAr = document.getElementById("vocabToggleArBtn");
    const btnToggleEn = document.getElementById("vocabToggleEnBtn");
    const btnToggleArabeezy = document.getElementById("vocabToggleArabeezyBtn");
    const btnDontKnow = document.getElementById("vocabDontKnowBtn");
    function checkIfVocabDone() {
        if (!currentLesson || !currentLesson.vocabulary) return;

        const allVocab = [
            ...(currentLesson.vocabulary.core || []),
            ...(currentLesson.vocabulary.extra || []),
        ];

        const visited = ensureVocabVisitedSet();
        const allSeen = allVocab.every((v) => visited.has(v.id));

        if (allSeen) {
            // لما يمرّ على كل الكلمات مرة واحدة على الأقل
            markLessonSectionDone("vocabulary");
            updateLessonProgressUI();
        }
    }
    function updateLessonProgressUI() {
        // حدّث شريط التقدم
        updateProgressBar();

        // حدّث بادج قسم المفردات فقط
        updateSectionStatusBadge("vocabulary");
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            if (!vocabModalState.list.length) return;
            vocabModalState.index =
                (vocabModalState.index - 1 + vocabModalState.list.length) %
                vocabModalState.list.length;
            vocabModalState.showExamples = true; // نرجّع الأمثلة ظاهرة عند الانتقال
            renderVocabModalFromState();
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            if (!vocabModalState.list.length) return;

            const currentLesson = lessons[appState.currentLessonId];
            const microCfg = getMicroCheckConfig(currentLesson);
            if (microCfg.enabled && microCfg.items.length) {
                vocabModalState.nextClickCount += 1;
                if (vocabModalState.nextClickCount >= microCfg.every) {
                    vocabModalState.nextClickCount = 0;
                    microCheckState.pendingNextAdvance = true;
                    if (openMicroCheckModal(currentLesson)) {
                        return;
                    }
                    microCheckState.pendingNextAdvance = false;
                }
            }

            vocabModalState.index =
                (vocabModalState.index + 1) % vocabModalState.list.length;

            renderVocabModalFromState();
        });
    }

    if (btnDontKnow) {
        btnDontKnow.addEventListener("click", () => {
            const item = vocabModalState.list[vocabModalState.index];
            if (!item || !item.id) return;
            setVocabMemoryStatus(appState.currentLessonId, item.id, "review");
            renderVocabModalFromState();
        });
    }


    if (btnToggleExamples) {
        btnToggleExamples.addEventListener("click", () => {
            vocabModalState.showExamples = !vocabModalState.showExamples;
            renderVocabModalFromState();
        });
    }
    if (btnToggleAr) {
        btnToggleAr.addEventListener("click", () => {
            vocabModalState.showAr = !vocabModalState.showAr;
            renderVocabModalFromState();
        });
    }

    if (btnToggleEn) {
        btnToggleEn.addEventListener("click", () => {
            vocabModalState.showEn = !vocabModalState.showEn;
            renderVocabModalFromState();
        });
    }

    if (btnToggleArabeezy) {
        btnToggleArabeezy.addEventListener("click", () => {
            vocabModalState.showArabeezy = !vocabModalState.showArabeezy;
            renderVocabModalFromState();
        });
    }

    const microCheckCheckBtn = document.getElementById("microCheckCheckBtn");
    const microCheckContinueBtn = document.getElementById("microCheckContinueBtn");
    const microCheckCloseBtn = document.getElementById("microCheckCloseBtn");

    if (microCheckCheckBtn) {
        microCheckCheckBtn.addEventListener("click", () => evaluateMicroCheck());
    }
    if (microCheckContinueBtn) {
        microCheckContinueBtn.addEventListener("click", () => continueFromMicroCheck());
    }
    if (microCheckCloseBtn) {
        microCheckCloseBtn.addEventListener("click", () => continueFromMicroCheck());
    }
    document.getElementById("btnLogin").addEventListener("click", () => openAuthModal());
    document
        .querySelectorAll("[data-close-auth]")
        .forEach((el) => el.addEventListener("click", closeAuthModal));

    document.getElementById("btnLogout").addEventListener("click", () => {
        if (isGuestUser()) {
            appState.currentUser = null;
            appState.guestMode = false;
            appState.guestStudent = null;
            appState.currentStudentId = null;
            updateAuthUI();
            showScreen("home-screen");
            return;
        }
        auth.signOut();
    });

    document.getElementById("authForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("authEmail").value.trim();
        const password = document.getElementById("authPassword").value;
        const roleSelect = document.getElementById("authRole");
        const modal = document.getElementById("authModal");
        const errorBox = document.getElementById("authError");

        if (errorBox) errorBox.textContent = "";

        // الدور المقصود: لو جاي من زر Student / Teacher في الهيرو
        let role = roleSelect ? roleSelect.value : "student";
        if (modal && modal.dataset.forcedRole) {
            role = modal.dataset.forcedRole; // student أو teacher
        }

        try {
            let cred;

            if (role === "teacher") {
                if (!canUseTeacherRole(email)) {
                    if (errorBox) errorBox.textContent = "Teacher access is restricted.";
                    return;
                }
                // المدرّس: sign in ثم sign up لو مش موجود
                try {
                    cred = await auth.signInWithEmailAndPassword(email, password);
                } catch (err) {
                    if (err.code === "auth/user-not-found") {
                        // أول مرة → ننشئ حساب مدرس
                        if (errorBox) {
	                            errorBox.textContent = "";
	                        }
	                        cred = await auth.createUserWithEmailAndPassword(email, password);
                    } else {
                        throw err;
                    }
                }
            } else {
                // الطالب: فقط تسجيل دخول بحساب جاهز
                try {
                    cred = await auth.signInWithEmailAndPassword(email, password);
                } catch (err) {
                    if (err.code === "auth/user-not-found") {
                        if (errorBox) {
                            errorBox.textContent =
                                "لا يوجد حساب بهذا الإيميل. تواصلي مع المدرّس ليعمل لك حساب.";
                        } else {
                            alert("لا يوجد حساب بهذا الإيميل. اسألي المدرس يعمل لك حساب.");
                        }
                        return;
                    }
                    throw err;
                }
            }

            // نقرأ بيانات المستخدم من Firestore
	            const { role: resolvedRole } = await resolveUserRole({
	                db,
	                uid: cred.user.uid,
	                email: cred.user.email,
	                savedRole: null,
	                fallbackRole: role,
	            });

	            if (role === "student" && resolvedRole === "teacher") {
	                await auth.signOut();
	                if (errorBox) errorBox.textContent = "This email belongs to a teacher account. Please sign in as Teacher.";
	                return;
	            }

	            let finalRole = resolvedRole;
	            if (role === "teacher") {
	                await bootstrapTeacherAccess({ db, firebase, uid: cred.user.uid, email: cred.user.email });
	                finalRole = "teacher";
	            }

            appState.currentUser = {
                uid: cred.user.uid,
                email: cred.user.email,
                role: finalRole,
            };

            // خزّن الدور محلياً عشان نرجع له بعد الـ refresh
            try {
                localStorage.setItem(LS_USER_ROLE_KEY, finalRole);
            } catch (e) {
                console.warn("Could not save role to localStorage", e);
            }

            closeAuthModal();
            updateAuthUI();


            // 🔁 توجيه حسب الدور
            if (finalRole === "teacher") {
                // نزامن بيانات الطلاب من السحابة ونفتح Teacher Dashboard
                await syncTeacherStudentsFromCloud();
                renderStudents();
                renderTeacherPicker();
                goToTeacherDashboard();
            } else {
                // STUDENT:
                // نحمّل بيانات الطالب / تقدمه من السحابة (لو عندك هذه الدالة)
                await loadStudentProgressFromCloud?.();

                // نربط الطالب الحالي بـ currentStudentId
                appState.students = [
                    {
                        id: appState.currentUser.uid,
                        name: appState.currentUser.email,
                        level: "Beginner",
                        goals: [],
                        progress: {},
                        homeworkNotes: {},
                    },
                ];
                appState.currentStudentId = appState.currentUser.uid;

                // مباشرة نفتح صفحة الوحدات
                goToLevels();
            }
        } catch (err) {
            console.error("Auth error:", err);
            if (errorBox) {
                if (err.code === "auth/wrong-password" || err.code === "auth/invalid-login-credentials") {
                    errorBox.textContent = "كلمة السر غير صحيحة. حاولي مرة ثانية.";
                } else {
                    errorBox.textContent = "مشكلة في تسجيل الدخول: " + err.message;
                }
            } else {
                alert("Auth error: " + err.message);
            }
        }
    });





    // Add Unit form
    $("#addUnitForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const level = $("#addUnitLevel").value;
        const name = $("#addUnitName").value.trim();
        if (!name) return;
        if (!customUnits[level]) customUnits[level] = [];
        if (!customUnits[level].includes(name)) {
            customUnits[level].push(name);
            saveCustomUnits();
        }
        $("#addUnitName").value = "";
        renderLevels();
    });

    // Teacher dashboard actions
    $("#btnTDAddLesson").addEventListener("click", () => {
        createNewLessonTemplate();
    });

    // lesson tabs
    $all(".lesson-tab").forEach((btn) => {
        btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
    });

    // teacher mode toggle
    $("#teacherModeToggle").addEventListener("change", (e) => {
        appState.teacherMode = e.target.checked;
        updateTeacherTabsVisibility();
        const lesson = lessons[appState.currentLessonId];
        if (lesson) updateLessonTabsVisibility(lesson);
        setActiveTab(appState.currentTab);
    });


    // font size
    $("#btnFontSmaller").addEventListener("click", () => {
        appState.lessonFontSize = Math.max(0.85, appState.lessonFontSize - 0.05);
        applyFontSize();
        saveFontSize();
    });
    $("#btnFontLarger").addEventListener("click", () => {
        appState.lessonFontSize = Math.min(1.4, appState.lessonFontSize + 0.05);
        applyFontSize();
        saveFontSize();
    });

    // vocab modal closes
    $all("[data-close-modal]").forEach((el) =>
        el.addEventListener("click", () => closeVocabModal())
    );


    const tdSyncNowBtn = document.getElementById("tdSyncNowBtn");
    if (tdSyncNowBtn) {
        tdSyncNowBtn.addEventListener("click", async () => {
            await syncLessonsNow();
        });
    }
    // initial
    renderStudents();
    renderTeacherPicker();
    goToHome();


    const btnLoginTop = document.getElementById("btnLogin");
    if (btnLoginTop) {
        btnLoginTop.addEventListener("click", () => openAuthModal());
    }


    const createStudentForm = document.getElementById("createStudentForm");
    if (createStudentForm) {
        createStudentForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // تأكيد أن المستخدم الحالي مدرّس
            if (!appState.currentUser || appState.currentUser.role !== "teacher") {
                alert("Only teachers can create students.");
                return;
            }

            const emailEl = document.getElementById("newStudentEmail");
            const passwordEl = document.getElementById("newStudentPassword");
            const msg = document.getElementById("createStudentMsg");

            const email = emailEl.value.trim();
            const password = passwordEl.value.trim();

            if (msg) {
                msg.textContent = "";
                msg.style.color = "#111827";
            }

            if (!email || !password) {
                if (msg) {
                    msg.style.color = "#b91c1c";
                    msg.textContent = "Please enter student email and a temporary password.";
                }
                return;
            }

            if (password.length < 6) {
                if (msg) {
                    msg.style.color = "#b91c1c";
                    msg.textContent = "Password must be at least 6 characters.";
                }
                return;
            }

            const submitBtn = createStudentForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Creating...";
            }

            try {
                const secAuth = getSecondaryAuth();
                if (!secAuth) {
                    if (msg) {
                        msg.style.color = "#b91c1c";
                        msg.textContent = "Secondary Firebase app is not available.";
                    }
                    return;
                }

                // 🧑‍🎓 إنشاء المستخدم الجديد باستخدام الـ secondary auth
                await createStudentAccount({
                    db,
                    firebase,
                    secondaryAuth: secAuth,
                    teacherUid: appState.currentUser.uid || null,
                    email,
                    password,
                });

                // تنظيف الحقول
                emailEl.value = "";
                passwordEl.value = "";

                if (msg) {
                    msg.style.color = "#15803d";
                    msg.textContent =
                        "Student account created successfully. Share the email and password with the student.";
                }
            } catch (err) {
                console.error("Create student error:", err);
                if (msg) {
                    msg.style.color = "#b91c1c";
                    if (err.code === "auth/email-already-in-use") {
                        msg.textContent = "This email is already in use. Pick another email for the student.";
                    } else if (err.code === "auth/invalid-email") {
                        msg.textContent = "Invalid email format.";
                    } else {
                        msg.textContent = "Error: " + err.message;
                    }
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Create Student";
                }
            }
        });
    }
});


async function handleCreateStudentSubmit(e) {
    e.preventDefault();
    console.log("Create student submitted");
    if (!appState.currentUser || appState.currentUser.role !== "teacher") {
        alert("Only teachers can create students.");
        return;
    }

    const emailEl = document.getElementById("newStudentEmail");
    const passwordEl = document.getElementById("newStudentPassword");
    const msg = document.getElementById("createStudentMsg");

    const email = emailEl.value.trim();
    const password = passwordEl.value.trim();

    if (msg) {
        msg.textContent = "";
        msg.style.color = "#111827";
    }

    if (!email || !password) {
        if (msg) {
            msg.style.color = "#b91c1c";
            msg.textContent = "Please enter student email and a temporary password.";
        }
        return;
    }

    if (password.length < 6) {
        if (msg) {
            msg.style.color = "#b91c1c";
            msg.textContent = "Password must be at least 6 characters.";
        }
        return;
    }

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Creating...";
    }

    try {
        const secAuth = getSecondaryAuth();
        if (!secAuth) {
            if (msg) {
                msg.style.color = "#b91c1c";
                msg.textContent = "Secondary Firebase app is not available.";
            }
            return;
        }

        await createStudentAccount({
            db,
            firebase,
            secondaryAuth: secAuth,
            teacherUid: appState.currentUser.uid || null,
            email,
            password,
        });

        emailEl.value = "";
        passwordEl.value = "";

        if (msg) {
            msg.style.color = "#15803d";
            msg.textContent =
                "Student account created successfully. Share the email and password with the student.";
        }
    } catch (err) {
        console.error("Create student error:", err);
        if (msg) {
            msg.style.color = "#b91c1c";
            if (err.code === "auth/email-already-in-use") {
                msg.textContent = "This email is already in use. Pick another email.";
            } else if (err.code === "auth/invalid-email") {
                msg.textContent = "Invalid email format.";
            } else {
                msg.textContent = "Error: " + err.message;
            }
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Create Student";
        }
    }
}








let __toastTimer = null;
function toast(message) {
    const existing = document.getElementById("toast");
    let el = existing;
    if (!el) {
        el = document.createElement("div");
        el.id = "toast";
        el.style.position = "fixed";
        el.style.left = "50%";
        el.style.bottom = "18px";
        el.style.transform = "translateX(-50%)";
        el.style.padding = "10px 12px";
        el.style.borderRadius = "12px";
        el.style.background = "rgba(17,24,39,.92)";
        el.style.color = "white";
        el.style.fontSize = ".9rem";
        el.style.zIndex = "9999";
        el.style.maxWidth = "92vw";
        el.style.boxShadow = "0 10px 20px rgba(0,0,0,.18)";
        document.body.appendChild(el);
    }
    el.textContent = message;
    el.style.opacity = "1";
    if (__toastTimer) clearTimeout(__toastTimer);
    __toastTimer = setTimeout(() => {
        el.style.opacity = "0";
    }, 1800);
}




// ---- Expose key functions to window for cross-module access ----
try { Object.assign(window, { saveLessonToLS, toast, renderLesson, renderLevels }); } catch (e) { }




