// ================================================================
// AEROBOTIX EDTECH INSTITUTE — Google Apps Script
// Receives enrollment form submissions → writes to Google Sheet
// ================================================================
// SETUP: See instructions in the HTML file or below.
// ================================================================

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON payload
    const data = JSON.parse(e.postData.contents);

    // Define column headers (only written once on first submission)
    const headers = [
      "Timestamp",
      "Full Name",
      "Date of Birth",
      "Gender",
      "Nationality",
      "Address",
      "Mobile",
      "WhatsApp",
      "Email",
      "Guardian Name",
      "Guardian Contact",
      "Qualification",
      "Stream",
      "Institution",
      "Year of Passing",
      "Occupation",
      "Course / Track",
      "Preferred Batch",
      "How They Heard",
      "Motivation"
    ];

    // Write headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);

      // Style header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0d1b3e");
      headerRange.setFontColor("#f26522");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);
    }

    // Append student row
    sheet.appendRow([
      data.timestamp      || "",
      data.fullName       || "",
      data.dob            || "",
      data.gender         || "",
      data.nationality    || "",
      data.address        || "",
      data.phone          || "",
      data.whatsapp       || "",
      data.email          || "",
      data.guardianName   || "",
      data.guardianPhone  || "",
      data.qualification  || "",
      data.stream         || "",
      data.institution    || "",
      data.yearPassing    || "",
      data.occupation     || "",
      data.course         || "",
      data.batch          || "",
      data.source         || "",
      data.motivation     || ""
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, headers.length);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function — run this manually in Apps Script editor to check setup
function testSetup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log("Sheet name: " + sheet.getName());
  Logger.log("Sheet rows: " + sheet.getLastRow());
  Logger.log("✅ Apps Script is connected to the sheet correctly.");
}
