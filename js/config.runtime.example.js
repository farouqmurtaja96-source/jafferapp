window.__APP_CONFIG__ = {
    firebase: {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
        projectId: "YOUR_FIREBASE_PROJECT_ID",
        storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
        messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
        appId: "YOUR_FIREBASE_APP_ID",
        measurementId: "YOUR_FIREBASE_MEASUREMENT_ID",
    },
    googleCalendar: {
        clientId: "YOUR_GOOGLE_CLIENT_ID",
        apiKey: "YOUR_GOOGLE_API_KEY",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scopes: "https://www.googleapis.com/auth/calendar.events",
        redirectUri: window.location.origin + "/",
    },
};
