/**
 * Google Apps Script Web App for Receiving Application Form Submissions
 * 
 * Instructions:
 * 1. Open Google Sheets and create a new spreadsheet (or use an existing one)
 * 2. Copy the Spreadsheet ID from the URL (the long string between /d/ and /edit)
 * 3. Replace YOUR_SPREADSHEET_ID_HERE below with your actual Spreadsheet ID
 * 4. Create a sheet named "Applications" (or change SHEET_NAME constant below)
 * 5. Open Extensions > Apps Script
 * 6. Paste this entire code into the script editor
 * 7. Save the project
 * 8. Click Deploy > New deployment
 * 9. Select type: Web app
 * 10. Set Execute as: Me
 * 11. Set Who has access: Anyone
 * 12. Click Deploy
 * 13. Copy the Web App URL
 * 14. Add it to your .env.local file as: NEXT_PUBLIC_APPLICATION_WEBHOOK_URL=<your-web-app-url>
 */

// Configuration
const SPREADSHEET_ID = '1gxHSIfOq5UJUmiIYBaLnPXSp8kvxq19g3XJaNjw2nKk'; // Replace with your Spreadsheet ID
const SHEET_NAME = 'Applications'; // Change this if you want a different sheet name

/**
 * Handle POST requests from the application form
 * @param {GoogleAppsScript.Events.DoPost} e - The event object containing POST data
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function doPost(e) {
  // CORS headers to allow requests from your website
  const CORSHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Parse the JSON payload
    const data = JSON.parse(e.postData.contents);

    // Open the spreadsheet and get the sheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      const headers = [
        'Timestamp',
        'Name',
        'Instagram',
        'Email',
        'OnlyFans',
        'Prior Agency',
        'Contact Method',
        'Phone',
        'Page URL',
      ];
      sheet.appendRow(headers);
      // Make header row bold
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
    }

    // Initialize headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Name',
        'Instagram',
        'Email',
        'OnlyFans',
        'Prior Agency',
        'Contact Method',
        'Phone',
        'Page URL',
      ];
      sheet.appendRow(headers);
      // Make header row bold
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
    }

    // Prepare the row data
    const rowData = [
      new Date(), // Timestamp
      data.name || '',
      data.instagram || '',
      data.email || '',
      data.onlyfans || '',
      data.priorAgency ? 'Yes' : 'No',
      data.contactMethod || '',
      data.phone || '',
      data.pageUrl || '',
    ];

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        message: 'Application received successfully' 
      })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(CORSHeaders);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(CORSHeaders);
  }
}

/**
 * Handle GET requests (for testing or direct browser access)
 * @param {GoogleAppsScript.Events.DoGet} e - The event object
 * @return {GoogleAppsScript.Content.TextOutput} JSON response
 */
function doGet(e) {
  const CORSHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  
  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      message: 'Webhook is active. Use POST to submit applications.',
      method: 'GET',
      note: 'This endpoint accepts POST requests with JSON payloads.'
    })
  )
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(CORSHeaders);
}

/**
 * Handle OPTIONS requests for CORS preflight
 * @param {GoogleAppsScript.Events.DoOptions} e - The event object
 * @return {GoogleAppsScript.Content.TextOutput} Empty response with CORS headers
 */
function doOptions(e) {
  const CORSHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(CORSHeaders);
}

