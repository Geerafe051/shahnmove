# shahnmove Google Sheets lead capture

Use this Apps Script as the backend for the static GitHub Pages form.

1. Create a Google Sheet for shahnmove leads.
2. Open `Extensions -> Apps Script`.
3. Paste `Code.gs` into the Apps Script editor.
4. Deploy it as `Web app`.
5. Set `Execute as` to `Me`.
6. Set `Who has access` to `Anyone`.
7. Copy the Web App URL.
8. Paste that URL into `v1.2/leads-config.js` as `window.SHAHNMOVE_LEADS_ENDPOINT`.

The script creates or uses a sheet named `Leads` and appends:

- createdAt
- email
- formId
- page
- referrer
- utmSource
- utmMedium
- utmCampaign
- userAgent
