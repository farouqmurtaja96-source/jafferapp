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
