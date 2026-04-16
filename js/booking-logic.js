// Booking Logic - Handle busy slots after booking
// When a student books a slot, mark all slots within the booking duration as busy

// Calculate busy slots after booking (50 minutes lesson + 10 minutes break)
function calculateBusySlotsAfterBooking(bookedDate, bookingSettings) {
    const busySlots = [];
    const slotMinutes = bookingSettings?.slotMinutes || 50; // 50 minutes lesson
    const breakMinutes = bookingSettings?.breakMinutes || 10; // 10 minutes break
    const totalMinutes = slotMinutes + breakMinutes; // 60 minutes total

    // Calculate end time (start + 60 minutes)
    const endDate = new Date(bookedDate);
    endDate.setMinutes(endDate.getMinutes() + totalMinutes);

    // Mark all slots between start and end as busy
    const currentDate = new Date(bookedDate);
    while (currentDate < endDate) {
        const slotKey = getSlotKey(currentDate);
        busySlots.push(slotKey);

        // Move to next 30-minute slot
        currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    return busySlots;
}

// Get unique key for a time slot
function getSlotKey(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}`;
}

// Mark slots as busy in Firebase after booking
async function markSlotsAsBusyInFirebase(bookedDate, bookingSettings, bookingId, studentName) {
    try {
        const db = firebase.firestore();
        const teachersSnap = await db.collection("teachers").limit(1).get();

        if (teachersSnap.empty) {
            console.log('No teachers found');
            return;
        }

        const teacherDoc = teachersSnap.docs[0];
        const teacherData = teacherDoc.data();
        const settings = teacherData.settings || {};
        const busyBlocks = settings.busyBlocks || {};
        const specificDates = busyBlocks.specificDates || [];

        // Get booking settings for slot duration
        const slotMinutes = bookingSettings?.slotMinutes || 50; // 50 minutes lesson
        const breakMinutes = bookingSettings?.breakMinutes || 10; // 10 minutes break
        const totalMinutes = slotMinutes + breakMinutes; // 60 minutes total

        // Add all slots within the booking duration to busy blocks
        const slotDate = new Date(bookedDate);
        for (let i = 0; i < totalMinutes; i += 30) {
            const currentDate = new Date(slotDate.getTime() + i * 60000);
            const dateStr = currentDate.toISOString().split('T')[0];
            const timeStr = currentDate.toTimeString().split(' ')[0].substring(0, 5);

            // Check if this slot is already in busy blocks
            const alreadyExists = specificDates.some(block =>
                block.date === dateStr && block.time === timeStr
            );

            if (!alreadyExists) {
                // Add to busy blocks
                specificDates.push({
                    date: dateStr,
                    time: timeStr,
                    reason: `Booking with ${studentName}`,
                    bookingId: bookingId
                });
            }
        }

        // Update teacher's busy blocks
        await db.collection("teachers").doc(teacherDoc.id).update({
            'settings.busyBlocks.specificDates': specificDates
        });

        console.log("Booking added to teacher's busy blocks successfully");
    } catch (error) {
        console.error("Error marking slots as busy:", error);
        throw error;
    }
}

// Export functions to global scope
window.calculateBusySlotsAfterBooking = calculateBusySlotsAfterBooking;
window.markSlotsAsBusyInFirebase = markSlotsAsBusyInFirebase;
window.getSlotKey = getSlotKey;
