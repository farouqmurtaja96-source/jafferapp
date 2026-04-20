# Lesson Booking Studio

Booking app focused on two roles only:

- `Student`: views available lesson slots and books a session
- `Teacher`: manages availability, busy blocks, bookings, Apps Script sync, and Google Calendar

## What This Project Is

This repository is now a standalone booking product.

The previous lesson/LMS code was removed from the active app flow, and the repo was cleaned to keep only the booking-related parts.

## Main Features

- Student booking calendar
- Booking status lookup by email
- Teacher-only dashboard
- Protected teacher login modal
- Weekly availability management
- Manual busy blocks
- Google Apps Script integration
- Google Calendar integration
- Booking cancel and reschedule tools

## Project Structure

```text
/
├── index.html
├── styles.css
├── firestore.rules
├── apps-script/
│   └── booking-sync.gs
└── js/
    ├── app.js
    ├── booking-app.js
    ├── apps-script-sync.js
    ├── google-calendar.js
    ├── config.js
    ├── core/
    │   └── errorHandler.js
    └── logic/
        ├── authFlows.js
        ├── bookingAvailability.js
        ├── bookingSettingsStore.js
        ├── contactSettingsStore.js
        ├── guestBookingFlow.js
        ├── teacherAccess.js
        └── teacherBookingAdmin.js
```

## Local Setup

### 1. Runtime Config

Create `js/config.runtime.js` locally and provide:

- Firebase config
- Google Calendar client config

This file is ignored by git.

### 2. Firebase

Set up:

- Firebase Authentication
- Firestore
- teacher user documents
- teacher role in `users/{uid}`

### 3. Google Calendar

Set up:

- Google Calendar API
- OAuth client
- approved redirect URI matching your deployment

### 4. Apps Script

Deploy `apps-script/booking-sync.gs` as a Web App, then save the URL from the teacher dashboard.

## Run

Serve the project locally with any static server, for example:

```bash
npx serve
```

Then open the local URL in the browser.

## Notes

- The app starts on the student booking screen.
- The teacher dashboard can only be opened by signing in with a teacher account.
- Public booking availability is mirrored from teacher settings.
