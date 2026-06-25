const SHEET_NAME = 'Leads';

const HEADERS = [
  'createdAt',
  'email',
  'formId',
  'page',
  'referrer',
  'utmSource',
  'utmMedium',
  'utmCampaign',
  'userAgent'
];

function doPost(event) {
  const payload = parsePayload_(event);
  const sheet = getSheet_();

  ensureHeaders_(sheet);
  sheet.appendRow(HEADERS.map((key) => payload[key] || ''));

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function parsePayload_(event) {
  if (!event || !event.postData || !event.postData.contents) {
    throw new Error('Missing POST body.');
  }

  const payload = JSON.parse(event.postData.contents);

  if (!payload.email || !String(payload.email).includes('@')) {
    throw new Error('Invalid email.');
  }

  return {
    createdAt: payload.createdAt || new Date().toISOString(),
    email: String(payload.email).trim(),
    formId: payload.formId || '',
    page: payload.page || '',
    referrer: payload.referrer || '',
    utmSource: payload.utmSource || '',
    utmMedium: payload.utmMedium || '',
    utmCampaign: payload.utmCampaign || '',
    userAgent: payload.userAgent || ''
  };
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  const current = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = HEADERS.every((header, index) => current[index] === header);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}
