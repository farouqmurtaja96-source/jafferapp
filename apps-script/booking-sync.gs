function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getConfig_() {
  const props = PropertiesService.getScriptProperties();
  const preplyRaw = props.getProperty('PREPLY_CALENDAR_ID') || '';
  return {
    primaryCalendarId: props.getProperty('PRIMARY_CALENDAR_ID') || 'primary',
    preplyCalendarId: normalizeCalendarId_(preplyRaw),
    defaultTimeZone: props.getProperty('DEFAULT_TIMEZONE') || Session.getScriptTimeZone() || 'Africa/Cairo',
  };
}

function normalizeCalendarId_(value) {
  const raw = (value || '').trim();
  if (!raw) return '';
  if (raw.indexOf('calendar.google.com') === -1) return raw;
  const srcMatch = raw.match(/[?&]src=([^&]+)/i);
  return srcMatch && srcMatch[1] ? decodeURIComponent(srcMatch[1]) : raw;
}

function parseRequest_(e) {
  let body = {};
  try {
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
  } catch (err) {}
  const params = (e && e.parameter) || {};
  return Object.assign({}, params, body);
}

function listEvents_(calendarId, start, end) {
  const cal = CalendarApp.getCalendarById(calendarId);
  if (!cal) return [];
  return cal.getEvents(start, end).map(function (event) {
    return {
      id: event.getId(),
      title: event.getTitle(),
      start: event.getStartTime().getTime(),
      end: event.getEndTime().getTime(),
    };
  });
}

function buildBusyBlocks_(events, timeZone) {
  return events.map(function (event) {
    const start = new Date(event.start);
    const end = new Date(event.end);
    return {
      date: Utilities.formatDate(start, timeZone, 'yyyy-MM-dd'),
      start: Utilities.formatDate(start, timeZone, 'HH:mm'),
      end: Utilities.formatDate(end, timeZone, 'HH:mm'),
      note: event.title || 'Busy',
      sourceEventId: event.id || '',
    };
  });
}

function doGet(e) {
  return handleRequest_(e);
}

function doPost(e) {
  return handleRequest_(e);
}

function handleRequest_(e) {
  try {
    const req = parseRequest_(e);
    const action = req.action || 'test';
    const config = getConfig_();

    if (action === 'test') {
      const primary = CalendarApp.getCalendarById(config.primaryCalendarId);
      return jsonOut({
        success: !!primary,
        message: primary ? 'Apps Script backend is reachable.' : 'Primary calendar not found.',
        timeZone: config.defaultTimeZone,
        preplyCalendarId: config.preplyCalendarId || '',
      });
    }

    if (action === 'getBusy') {
      const days = Math.max(1, Math.min(90, Number(req.days || 30)));
      const timeZone = req.timeZone || config.defaultTimeZone;
      const start = new Date();
      const end = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
      let events = listEvents_(config.primaryCalendarId, start, end);
      if (config.preplyCalendarId) {
        events = events.concat(listEvents_(config.preplyCalendarId, start, end));
      }
      return jsonOut({
        success: true,
        message: 'Busy times loaded.',
        busyBlocks: buildBusyBlocks_(events, timeZone),
        counts: {
          total: events.length,
          preplyEnabled: !!config.preplyCalendarId,
        }
      });
    }

    if (action === 'createBooking') {
      const slot = Number(req.slot || 0);
      const durationMinutes = Math.max(30, Math.min(180, Number(req.durationMinutes || 50)));
      const timeZone = req.timeZone || config.defaultTimeZone;
      const name = req.name || 'Student';
      const email = req.email || '';
      const phone = req.phone || '';
      const notes = req.notes || '';
      const bookingId = req.bookingId || '';
      if (!slot) {
        return jsonOut({ success: false, message: 'Missing slot timestamp.' });
      }
      const start = new Date(slot);
      const end = new Date(slot + durationMinutes * 60 * 1000);
      const cal = CalendarApp.getCalendarById(config.primaryCalendarId);
      if (!cal) {
        return jsonOut({ success: false, message: 'Primary calendar not found.' });
      }
      const description = [
        'Booked from Palestinian Arabic Lab',
        'Booking ID: ' + bookingId,
        'Student: ' + name,
        'Email: ' + email,
        'Phone: ' + phone,
        'Notes: ' + notes,
        'Timezone: ' + timeZone
      ].join('\n');
      const event = cal.createEvent('Lesson with ' + name, start, end, { description: description });
      return jsonOut({
        success: true,
        message: 'Booking added to Google Calendar.',
        eventId: event.getId(),
      });
    }

    return jsonOut({ success: false, message: 'Unknown action.' });
  } catch (err) {
    return jsonOut({ success: false, message: err.message || String(err) });
  }
}
