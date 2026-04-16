import { canUseTeacherRole, ensureTeacherDoc, ensureTeacherUserDoc } from './teacherAccess.js';

export async function resolveUserRole({ db, uid, email, savedRole, fallbackRole }) {
    let data = {};
    try {
        const snap = await db.collection("users").doc(uid).get();
        data = snap.data() || {};
    } catch (readErr) {
        console.warn("Could not read user profile, using role fallback.", readErr);
    }

    const inferredTeacherRole = canUseTeacherRole(email) ? "teacher" : null;
    const role = data.role || savedRole || fallbackRole || inferredTeacherRole || "student";
    return { role, data };
}

export async function bootstrapTeacherAccess({ db, firebase, uid, email }) {
    await ensureTeacherUserDoc({ db, firebase, uid, email });
    await ensureTeacherDoc({ db, firebase, uid, email });
}

export async function createStudentAccount({
    db,
    firebase,
    secondaryAuth,
    teacherUid,
    email,
    password,
}) {
    const cred = await secondaryAuth.createUserWithEmailAndPassword(email, password);
    const uid = cred.user.uid;

    await db.collection("users").doc(uid).set({
        email,
        role: "student",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: teacherUid || null,
    });

    await secondaryAuth.signOut();
    return { uid, email };
}
