export const ALLOWED_TEACHER_EMAILS = ["farouqmoh@hotmail.com", "farouqmurtaja96@gmail.com"];

export function canUseTeacherRole(email) {
    const normalized = (email || "").trim().toLowerCase();
    return !!normalized && ALLOWED_TEACHER_EMAILS.includes(normalized);
}

export async function ensureTeacherDoc({ db, firebase, uid, email }) {
    if (!uid) return;
    try {
        const ref = db.collection("teachers").doc(uid);
        const snap = await ref.get();
        if (snap.exists) {
            await ref.set(
                {
                    email: email || "",
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                },
                { merge: true }
            );
            return;
        }
        await ref.set({
            email: email || "",
            name: "",
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (err) {
        if (err?.code !== "permission-denied" && err?.code !== "firestore/permission-denied") {
            console.warn("Could not ensure teacher doc.", err);
        }
    }
}

export async function ensureTeacherUserDoc({ db, firebase, uid, email }) {
    if (!uid || !canUseTeacherRole(email)) return false;
    try {
        const ref = db.collection("users").doc(uid);
        const snap = await ref.get();
        if (snap.exists) {
            return (snap.data() || {}).role === "teacher";
        }
        await ref.set({
            email: email || "",
            role: "teacher",
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: uid,
        });
        return true;
    } catch (err) {
        if (err?.code !== "permission-denied" && err?.code !== "firestore/permission-denied") {
            console.warn("Could not ensure teacher user doc.", err);
        }
        return false;
    }
}
