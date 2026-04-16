// Google Calendar API Configuration
// NOTE: clientSecret should never be exposed in client-side code
// It should be stored securely on your backend server
const googleCalendarConfig = {
    clientId: '728875114917-im3ui9lcb471mc43h11bgoq5fbr9kvu2.apps.googleusercontent.com',
    apiKey: 'AIzaSyCVff8yPsjylbM5Fhwl2HnqLyIpQhlbneE',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scopes: 'https://www.googleapis.com/auth/calendar.events',
    redirectUri: window.location.origin + '/'
};

// Security note: 
// 1. Restrict this API key in Google Cloud Console to your domain only
// 2. Set up proper HTTP referrer restrictions
// 3. Enable only the APIs you need
// 4. Set up application restrictions
