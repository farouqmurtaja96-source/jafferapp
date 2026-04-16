async function readBookingSettingsDoc() {
    try {
        const snap = await window.db.collection("bookingSettings").doc("primary").get();
        return snap.exists ? (snap.data() || {}) : {};
    } catch {
        return {};
    }
}

async function readTeacherAppsScriptSettings() {
    try {
        const user = window.firebase?.auth()?.currentUser;
        if (!user) return {};
        const snap = await window.db.collection("teachers").doc(user.uid).get();
        const data = snap.exists ? (snap.data() || {}) : {};
        return data.appsScript || {};
    } catch {
        return {};
    }
}

function normalizeWebAppUrl(url) {
    return (url || "").trim();
}

async function getAppsScriptWebAppUrl() {
    const teacherSettings = await readTeacherAppsScriptSettings();
    if (teacherSettings.webAppUrl) return normalizeWebAppUrl(teacherSettings.webAppUrl);
    const bookingData = await readBookingSettingsDoc();
    return normalizeWebAppUrl(bookingData.appsScript?.webAppUrl || "");
}

async function callAppsScript(action, payload = {}, { allowGet = false } = {}) {
    const webAppUrl = await getAppsScriptWebAppUrl();
    if (!webAppUrl) {
        return { success: false, message: "Apps Script Web App URL is not configured." };
    }

    try {
        const body = { action, ...payload };
        const res = await fetch(webAppUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(body),
        });
        const text = await res.text();
        const parsed = text ? JSON.parse(text) : {};
        return parsed;
    } catch (err) {
        if (allowGet) {
            try {
                const qs = new URLSearchParams({ action, ...Object.fromEntries(Object.entries(payload).map(([k, v]) => [k, String(v)])) });
                const res = await fetch(`${webAppUrl}?${qs.toString()}`);
                const text = await res.text();
                return text ? JSON.parse(text) : {};
            } catch (getErr) {
                return { success: false, message: getErr?.message || String(getErr) };
            }
        }
        return { success: false, message: err?.message || String(err) };
    }
}

async function saveAppsScriptSettings({ webAppUrl }) {
    const user = window.firebase?.auth()?.currentUser;
    if (!user) return { success: false, message: "Teacher is not logged in." };
    const normalizedUrl = normalizeWebAppUrl(webAppUrl);
    let teacherWriteOk = false;
    let bookingWriteOk = false;
    let lastError = null;

    try {
        await window.db.collection("teachers").doc(user.uid).set({
            appsScript: {
                webAppUrl: normalizedUrl,
                updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
            }
        }, { merge: true });
        teacherWriteOk = true;
    } catch (err) {
        lastError = err;
    }

    try {
        await window.db.collection("bookingSettings").doc("primary").set({
            appsScript: {
                webAppUrl: normalizedUrl,
                enabled: !!normalizedUrl,
                updatedAt: Date.now(),
            }
        }, { merge: true });
        bookingWriteOk = true;
    } catch (err) {
        lastError = err;
    }

    if (teacherWriteOk && bookingWriteOk) {
        return { success: true, message: normalizedUrl ? "Apps Script URL saved." : "Apps Script URL cleared." };
    }

    if (teacherWriteOk || bookingWriteOk) {
        return { success: true, message: "Apps Script URL saved partially. Recheck teacher settings after publishing rules." };
    }

    return { success: false, message: lastError?.message || String(lastError) };
}

async function testAppsScriptConnection() {
    return callAppsScript("test", {}, { allowGet: true });
}

async function fetchBusyBlocksFromAppsScript({ days = 30, timeZone = "Africa/Cairo" } = {}) {
    return callAppsScript("getBusy", { days, timeZone }, { allowGet: true });
}

async function createBookingViaAppsScript(payload) {
    return callAppsScript("createBooking", payload);
}

async function syncPendingBookingsViaAppsScript({ limit = 10 } = {}) {
    try {
        const snap = await window.db
            .collection("bookings")
            .where("calendarSynced", "==", false)
            .limit(limit)
            .get();
        const pendingDocs = snap.docs.sort((a, b) => {
            const aTs = a.data()?.createdAt || 0;
            const bTs = b.data()?.createdAt || 0;
            return aTs - bTs;
        });
        let syncedCount = 0;
        let failedCount = 0;
        for (const doc of pendingDocs) {
            const booking = doc.data();
            if (!booking || !booking.slot || booking.status === "canceled") continue;
            const result = await createBookingViaAppsScript({
                bookingId: doc.id,
                slot: booking.slot,
                durationMinutes: booking.slotMinutes || window.bookingSettings?.slotMinutes || 50,
                timeZone: booking.timezone || window.bookingSettings?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Cairo",
                name: booking.name || "",
                email: booking.email || "",
                phone: booking.phone || "",
                notes: booking.notes || "",
            });
            if (result?.success) {
                await window.db.collection("bookings").doc(doc.id).set({
                    calendarSynced: true,
                    googleCalendarEventId: result.eventId || null,
                    history: window.firebase.firestore.FieldValue.arrayUnion({
                        at: Date.now(),
                        action: "apps_script_synced",
                        by: "system"
                    })
                }, { merge: true });
                await window.db.collection("publicBookings").doc(doc.id).set({
                    calendarSynced: true,
                    updatedAt: Date.now(),
                }, { merge: true });
                syncedCount += 1;
            } else {
                failedCount += 1;
            }
        }
        return {
            success: failedCount === 0,
            syncedCount,
            failedCount,
            message: failedCount ? `Synced ${syncedCount} bookings. ${failedCount} failed.` : `Synced ${syncedCount} bookings.`,
        };
    } catch (err) {
        return { success: false, message: err?.message || String(err), syncedCount: 0, failedCount: 0 };
    }
}

window.saveAppsScriptSettings = saveAppsScriptSettings;
window.testAppsScriptConnection = testAppsScriptConnection;
window.fetchBusyBlocksFromAppsScript = fetchBusyBlocksFromAppsScript;
window.createBookingViaAppsScript = createBookingViaAppsScript;
window.syncPendingBookingsViaAppsScript = syncPendingBookingsViaAppsScript;
