export function createInitialContactSettings() {
    return {
        whatsapp: "",
        sitePrice: "",
    };
}

export function loadContactSettings(storageKey, currentSettings) {
    try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
            return { ...currentSettings, ...JSON.parse(raw) };
        }
    } catch {}
    return currentSettings;
}

export function saveContactSettings(storageKey, settings) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch {}
}

export async function loadContactSettingsFromCloud(db, currentSettings) {
    try {
        const ref = db.collection("bookingSettings").doc("primary");
        const snap = await ref.get();
        if (snap.exists) {
            const data = snap.data() || {};
            return {
                ...currentSettings,
                whatsapp: typeof data.whatsapp === "string" ? data.whatsapp : currentSettings.whatsapp,
                sitePrice: typeof data.sitePrice === "string" ? data.sitePrice : currentSettings.sitePrice,
            };
        }
    } catch {}
    return currentSettings;
}

export async function saveContactSettingsToCloud(db, firebase, settings) {
    try {
        const ref = db.collection("bookingSettings").doc("primary");
        await ref.set(
            {
                whatsapp: settings?.whatsapp || "",
                sitePrice: settings?.sitePrice || "",
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
        );
    } catch {}
}

export function buildWhatsAppUrl(settings, message) {
    const raw = (settings?.whatsapp || "").trim();
    if (!raw) return null;
    if (raw.startsWith("http")) {
        const sep = raw.includes("?") ? "&" : "?";
        return `${raw}${sep}text=${encodeURIComponent(message)}`;
    }
    const number = raw.replace(/[^0-9]/g, "");
    if (!number) return null;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
