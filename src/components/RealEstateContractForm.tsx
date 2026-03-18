import { useState } from "react";
import { jsPDF } from "jspdf";

// ─── Country / State Options ──────────────────────────────────────────────────

const countryOptions = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Other", label: "Other" },
];

const getStateOptions = (country) => {
  if (country === "United States")
    return [
      { value: "Alabama", label: "Alabama" }, { value: "Alaska", label: "Alaska" },
      { value: "Arizona", label: "Arizona" }, { value: "Arkansas", label: "Arkansas" },
      { value: "California", label: "California" }, { value: "Colorado", label: "Colorado" },
      { value: "Connecticut", label: "Connecticut" }, { value: "Delaware", label: "Delaware" },
      { value: "Florida", label: "Florida" }, { value: "Georgia", label: "Georgia" },
      { value: "Hawaii", label: "Hawaii" }, { value: "Idaho", label: "Idaho" },
      { value: "Illinois", label: "Illinois" }, { value: "Indiana", label: "Indiana" },
      { value: "Iowa", label: "Iowa" }, { value: "Kansas", label: "Kansas" },
      { value: "Kentucky", label: "Kentucky" }, { value: "Louisiana", label: "Louisiana" },
      { value: "Maine", label: "Maine" }, { value: "Maryland", label: "Maryland" },
      { value: "Massachusetts", label: "Massachusetts" }, { value: "Michigan", label: "Michigan" },
      { value: "Minnesota", label: "Minnesota" }, { value: "Mississippi", label: "Mississippi" },
      { value: "Missouri", label: "Missouri" }, { value: "Montana", label: "Montana" },
      { value: "Nebraska", label: "Nebraska" }, { value: "Nevada", label: "Nevada" },
      { value: "New Hampshire", label: "New Hampshire" }, { value: "New Jersey", label: "New Jersey" },
      { value: "New Mexico", label: "New Mexico" }, { value: "New York", label: "New York" },
      { value: "North Carolina", label: "North Carolina" }, { value: "North Dakota", label: "North Dakota" },
      { value: "Ohio", label: "Ohio" }, { value: "Oklahoma", label: "Oklahoma" },
      { value: "Oregon", label: "Oregon" }, { value: "Pennsylvania", label: "Pennsylvania" },
      { value: "Rhode Island", label: "Rhode Island" }, { value: "South Carolina", label: "South Carolina" },
      { value: "South Dakota", label: "South Dakota" }, { value: "Tennessee", label: "Tennessee" },
      { value: "Texas", label: "Texas" }, { value: "Utah", label: "Utah" },
      { value: "Vermont", label: "Vermont" }, { value: "Virginia", label: "Virginia" },
      { value: "Washington", label: "Washington" }, { value: "West Virginia", label: "West Virginia" },
      { value: "Wisconsin", label: "Wisconsin" }, { value: "Wyoming", label: "Wyoming" },
      { value: "District of Columbia", label: "District of Columbia" },
    ];
  if (country === "Canada")
    return [
      { value: "Alberta", label: "Alberta" }, { value: "British Columbia", label: "British Columbia" },
      { value: "Manitoba", label: "Manitoba" }, { value: "New Brunswick", label: "New Brunswick" },
      { value: "Newfoundland and Labrador", label: "Newfoundland and Labrador" },
      { value: "Nova Scotia", label: "Nova Scotia" }, { value: "Ontario", label: "Ontario" },
      { value: "Prince Edward Island", label: "Prince Edward Island" }, { value: "Quebec", label: "Quebec" },
      { value: "Saskatchewan", label: "Saskatchewan" }, { value: "Northwest Territories", label: "Northwest Territories" },
      { value: "Nunavut", label: "Nunavut" }, { value: "Yukon", label: "Yukon" },
    ];
  if (country === "United Kingdom")
    return [
      { value: "England", label: "England" }, { value: "Scotland", label: "Scotland" },
      { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" },
    ];
  if (country === "Australia")
    return [
      { value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" },
      { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" },
      { value: "South Australia", label: "South Australia" }, { value: "Tasmania", label: "Tasmania" },
      { value: "Australian Capital Territory", label: "Australian Capital Territory" },
      { value: "Northern Territory", label: "Northern Territory" },
    ];
  if (country === "Pakistan")
    return [
      { value: "Punjab", label: "Punjab" }, { value: "Sindh", label: "Sindh" },
      { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" },
      { value: "Balochistan", label: "Balochistan" },
      { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" },
    ];
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

// ─── Step / Field Definitions ─────────────────────────────────────────────────

const steps = [
  {
    label: "Effective Date & Parties",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "sellerName", label: "Seller — Full Legal Name", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "sellerStreetAddress", label: "Seller — Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "sellerCountry", label: "Seller — Country", type: "select", required: true, options: countryOptions },
      { name: "sellerState", label: "Seller — State / Province / Region", type: "dynamic_select", required: true, dependsOn: "sellerCountry" },
      { name: "sellerCity", label: "Seller — City", type: "text", required: true, placeholder: "City" },
      { name: "sellerEmail", label: "Seller — Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "sellerPhone", label: "Seller — Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Agent Details",
    fields: [
      { name: "agentName", label: "Agent — Full Legal Name", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "agentStreetAddress", label: "Agent — Street Address", type: "text", required: true, placeholder: "123 Business Ave" },
      { name: "agentCountry", label: "Agent — Country", type: "select", required: true, options: countryOptions },
      { name: "agentState", label: "Agent — State / Province / Region", type: "dynamic_select", required: true, dependsOn: "agentCountry" },
      { name: "agentCity", label: "Agent — City", type: "text", required: true, placeholder: "City" },
      { name: "agentEmail", label: "Agent — Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "agentPhone", label: "Agent — Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Property Details",
    fields: [
      {
        name: "realProperty",
        label: "Real Property — Description / Address",
        type: "textarea",
        required: true,
        placeholder: "Enter full address and description of the real property...",
      },
    ],
  },
  {
    label: "Appointment & Compensation",
    fields: [
      { name: "commissionPercent", label: "Agent Commission (%)", type: "text", required: true, placeholder: "e.g. 6" },
      { name: "priorNegotiationPerson", label: "Excluded Prior-Negotiation Person Name", type: "text", required: true, placeholder: "Name of excluded party" },
      { name: "approvedPrice", label: "Seller's Approved Price", type: "text", required: true, placeholder: "e.g. $500,000" },
    ],
  },
  {
    label: "Expenses & Assignment",
    fields: [
      {
        name: "expensesOverride",
        label: "Expenses Clause (leave blank to use default)",
        type: "textarea",
        required: false,
        placeholder: "Default: Agent bears all out-of-pocket expenses unless otherwise agreed in writing.",
      },
      {
        name: "assignmentConsentParty",
        label: "Assignment Consent Authority (default: Seller)",
        type: "text",
        required: false,
        placeholder: "Seller",
      },
    ],
  },
  {
    label: "Governing Law & Signatures",
    fields: [
      { name: "governingLawCountry", label: "Governing Law — Country", type: "select", required: true, options: countryOptions },
      { name: "governingLawState", label: "Governing Law — State / Province / Region", type: "dynamic_select", required: true, dependsOn: "governingLawCountry" },
      { name: "sellerSignName", label: "Seller — Name (Signature Block)", type: "text", required: true, placeholder: "Full legal name" },
      { name: "sellerSignature", label: "Seller — Signature (type full name)", type: "text", required: true, placeholder: "Type full legal name" },
      { name: "sellerDate", label: "Seller — Signing Date", type: "date", required: true },
      { name: "agentSignName", label: "Agent — Name (Signature Block)", type: "text", required: true, placeholder: "Full legal name" },
      { name: "agentSignature", label: "Agent — Signature (type full name)", type: "text", required: true, placeholder: "Type full legal name" },
      { name: "agentDate", label: "Agent — Signing Date", type: "date", required: true },
      { name: "witnessName", label: "Witness Name (optional)", type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
  {
    label: "Additional Notes",
    fields: [
      {
        name: "clauseNotes",
        label: "Additional Clause Notes (optional)",
        type: "textarea",
        required: false,
        placeholder: "Any special provisions or additional terms...",
      },
      {
        name: "reviewNote",
        label: "Final Review Note (optional)",
        type: "textarea",
        required: false,
        placeholder: "Any final observations or instructions...",
      },
    ],
  },
];

// ─── PDF Generator ────────────────────────────────────────────────────────────

const generatePDF = (values) => {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const PW = 612, PH = 792;
  const ML = 56, MR = 56, MT = 56, MB = 56;
  const TW = PW - ML - MR; // 500pt

  let y = MT;

  // ── Helpers ───────────────────────────────────────────────────────────────

  const checkPage = (needed = 20) => {
    if (y + needed > PH - MB) { doc.addPage(); y = MT; }
  };

  // Bold uppercase section heading
  const heading = (text) => {
    checkPage(32);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(15, 15, 15);
    doc.text(text, ML, y);
    y += 18;
  };

  // Bold inline sub-label (e.g. "6.1 Commission.")
  const subLabel = (numText, labelText) => {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text(numText + "  " + labelText, ML, y);
    y += 15;
  };

  // Normal body — optional left indent
  const body = (text, indent = 0) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(text, TW - indent);
    lines.forEach((line) => { checkPage(14); doc.text(line, ML + indent, y); y += 14; });
  };

  // Numbered sub-clause (2.1, 3.1, etc.) — normal weight
  const clause = (num, text) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const prefix = num + "  ";
    const lines = doc.splitTextToSize(text, TW - 24);
    lines.forEach((line, i) => {
      checkPage(14);
      if (i === 0) { doc.text(prefix, ML, y); doc.text(line, ML + 24, y); }
      else { doc.text(line, ML + 24, y); }
      y += 14;
    });
    y += 2;
  };

  // Bullet item
  const bullet = (text, indent = 0) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(text, TW - 22 - indent);
    lines.forEach((line, i) => {
      checkPage(14);
      if (i === 0) { doc.text("\u2022", ML + 4 + indent, y); doc.text(line, ML + 20 + indent, y); }
      else { doc.text(line, ML + 20 + indent, y); }
      y += 14;
    });
  };

  const gap  = (n = 8) => { y += n; };

  const hline = () => {
    checkPage(10);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(ML, y, ML + TW, y);
    y += 10;
  };

  const v = (key, fallback = "[___________]") =>
    (values[key] || "").trim() || fallback;

  // ── Title ─────────────────────────────────────────────────────────────────

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(15, 15, 15);
  const title = "REAL ESTATE AGENT AGREEMENT";
  doc.text(title, PW / 2, y, { align: "center" });
  y += 5;
  // Underline
  const tW = doc.getTextWidth(title);
  doc.setDrawColor(15, 15, 15);
  doc.setLineWidth(0.8);
  doc.line(PW / 2 - tW / 2, y, PW / 2 + tW / 2, y);
  y += 18;
  hline();

  // Header row
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text("Effective Date: " + v("effectiveDate", "[Insert Date]"), ML, y);
  doc.text(
    "Governing Law: " + v("governingLawState") + ", " + v("governingLawCountry"),
    PW - MR, y, { align: "right" }
  );
  y += 20;
  hline();
  gap(4);

  // ── Preamble ─────────────────────────────────────────────────────────────

  body(
    'This Real Estate Agent Agreement ("Agreement") is entered into as of ' +
    v("effectiveDate", "[Effective Date]") +
    ' ("Effective Date"), by and between: ' +
    v("sellerName", "[Seller Name]") + ", with an address at " +
    v("sellerStreetAddress") + ", " + v("sellerCity") + ", " +
    v("sellerState") + ", " + v("sellerCountry") +
    ' ("Seller"), and ' +
    v("agentName", "[Agent Name]") + ", with an address at " +
    v("agentStreetAddress") + ", " + v("agentCity") + ", " +
    v("agentState") + ", " + v("agentCountry") + ' ("Agent").'
  );
  gap(6);
  body('The Seller and Agent may be referred to individually as a "Party" and collectively as the "Parties."');
  gap(14);

  // ── Section 1: Recitals ───────────────────────────────────────────────────

  heading("1.  RECITALS");
  body("WHEREAS, the Seller is the owner of certain real property, together with all improvements thereon, commonly known as:");
  gap(4);
  body(v("realProperty", "[Insert Property Address / Description]"), 16);
  gap(4);
  body('(the "Real Property"); and');
  gap(6);
  body("WHEREAS, the Agent is experienced in marketing, advertising, negotiating, and selling real estate; and");
  gap(6);
  body("WHEREAS, the Seller desires to engage the Agent to market and sell the Real Property, and the Agent agrees to provide such services under the terms and conditions set forth herein;");
  gap(6);
  body("NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:");
  gap(14);

  // ── Section 2: Appointment ────────────────────────────────────────────────

  heading("2.  APPOINTMENT AND GRANT OF AUTHORITY");
  clause("2.1", "The Seller hereby appoints the Agent as the Seller's agent for the purpose of marketing and selling the Real Property, subject to the terms of this Agreement.");
  clause("2.2", "The Seller shall promptly provide the Agent with all documents, records, and information in the Seller's possession relating to the Real Property that may be necessary for marketing or sale.");
  gap(12);

  // ── Section 3: Scope of Services ─────────────────────────────────────────

  heading("3.  SCOPE OF SERVICES");
  clause("3.1", "The Seller shall refer to the Agent all inquiries, offers, and negotiations relating to the Real Property, including inquiries from other brokers or prospective purchasers.");
  body("3.2  The Agent shall:", 0);
  gap(4);
  bullet("Investigate and develop offers for the Real Property;", 12);
  bullet("Market and promote the Real Property;", 12);
  bullet("Solicit potential purchasers;", 12);
  bullet("Conduct negotiations on behalf of the Seller; and", 12);
  bullet("Use commercially reasonable efforts to procure a purchaser.", 12);
  gap(6);
  clause("3.3", "The Agent is authorized to cooperate with and enlist the assistance of other licensed real estate brokers as deemed appropriate.");
  clause("3.4", "The Agent shall promptly disclose to the Seller all offers received and any proposed purchase price or material terms.");
  gap(12);

  // ── Section 4: Term ───────────────────────────────────────────────────────

  heading("4.  TERM OF AGREEMENT");
  body("This Agreement shall commence on the Effective Date and shall remain in effect until terminated in accordance with this Agreement.");
  gap(12);

  // ── Section 5: Performance ────────────────────────────────────────────────

  heading("5.  PERFORMANCE OF SERVICES");
  body("The manner, method, and means by which the Agent performs the Services shall be determined solely by the Agent. The Agent shall devote such time and effort as reasonably necessary to fulfill the obligations of this Agreement.");
  gap(12);

  // ── Section 6: Compensation ───────────────────────────────────────────────

  heading("6.  COMPENSATION");

  subLabel("6.1", "Commission.");
  body(
    "The Seller agrees to pay the Agent a commission equal to " +
    v("commissionPercent", "___") +
    "% of the gross sales price of the Real Property if the sale is consummated as a result of the Agent's efforts.",
    16
  );
  gap(6);

  subLabel("6.2", "Commission Protection.");
  body(
    "If, after termination of this Agreement, the Seller sells the Real Property to any purchaser introduced to the Property by the Agent during the term of this Agreement, the Agent shall be entitled to the full commission.",
    16
  );
  gap(6);

  subLabel("6.3", "Excluded Transactions.");
  body(
    "The Seller reserves the right to sell the Real Property to any person with whom the Seller was negotiating prior to the Effective Date (" +
    v("priorNegotiationPerson", "[Prior Negotiation Person]") +
    "). In such event, no commission shall be owed to the Agent.",
    16
  );
  gap(6);

  subLabel("6.4", "Refusal of Offer.");
  body(
    "If the Seller rejects a bona fide offer at or above the Seller's approved price (" +
    v("approvedPrice", "[Approved Price]") +
    ") during the term of this Agreement, and the property is later sold to that same purchaser, the Agent shall be entitled to full commission.",
    16
  );
  gap(12);

  // ── Section 7: Expenses ───────────────────────────────────────────────────

  heading("7.  EXPENSES");
  body(
    (values.expensesOverride || "").trim() ||
    "Unless otherwise agreed in writing, the Agent shall be responsible for all out-of-pocket expenses incurred in connection with the performance of services under this Agreement."
  );
  gap(12);

  // ── Section 8: Independent Contractor ────────────────────────────────────

  heading("8.  INDEPENDENT CONTRACTOR RELATIONSHIP");
  body("The Agent is an independent contractor and not an employee of the Seller. Nothing in this Agreement shall be construed as creating an employer-employee, partnership, or joint venture relationship.");
  gap(6);
  body("The Seller shall not be responsible for employee benefits, taxes, insurance, or withholdings of any kind.");
  gap(12);

  // ── Section 9: Employees ──────────────────────────────────────────────────

  heading("9.  EMPLOYEES AND SUBAGENTS");
  body("Any employees or subagents engaged by the Agent shall be under the Agent's sole direction and control. Upon request, the Agent shall provide proof of employment or engagement of such persons.");
  gap(12);

  // ── Section 10: Indemnification ───────────────────────────────────────────

  heading("10.  INDEMNIFICATION");
  body("The Agent shall indemnify and hold harmless the Seller from any claims, damages, losses, liabilities, or expenses, including reasonable attorneys' fees, arising out of the Agent's negligence, misconduct, or breach of this Agreement.");
  gap(12);

  // ── Section 11: Assignment ────────────────────────────────────────────────

  heading("11.  ASSIGNMENT");
  body(
    "The Agent may not assign or transfer this Agreement, in whole or in part, without the prior written consent of " +
    ((values.assignmentConsentParty || "").trim() || "the Seller") + "."
  );
  gap(12);

  // ── Section 12: Confidentiality ───────────────────────────────────────────

  heading("12.  CONFIDENTIALITY");
  body("The Agent agrees to keep all non-public information relating to the Real Property and the Seller confidential and shall not disclose such information to any third party without prior written consent.");
  gap(6);
  body("This obligation shall survive termination of this Agreement.");
  gap(12);

  // ── Section 13: Return of Records ────────────────────────────────────────

  heading("13.  RETURN OF RECORDS");
  body("Upon termination of this Agreement, the Agent shall promptly return all documents, records, data, and materials belonging to the Seller.");
  gap(12);

  // ── Section 14: Notices ───────────────────────────────────────────────────

  heading("14.  NOTICES");
  body("All notices under this Agreement shall be in writing and deemed given when delivered personally or sent by certified mail to the addresses of the Parties listed above.");
  gap(12);

  // ── Section 15: Entire Agreement ─────────────────────────────────────────

  heading("15.  ENTIRE AGREEMENT");
  body("This Agreement constitutes the entire agreement between the Parties and supersedes all prior oral or written agreements relating to the subject matter herein.");
  gap(12);

  // ── Section 16: Amendments ────────────────────────────────────────────────

  heading("16.  AMENDMENTS");
  body("This Agreement may be amended only by a written instrument signed by both Parties.");
  gap(12);

  // ── Section 17: Severability ──────────────────────────────────────────────

  heading("17.  SEVERABILITY");
  body("If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.");
  gap(12);

  // ── Section 18: Exculpation ───────────────────────────────────────────────

  heading("18.  EXCULPATION");
  body("The Agent shall look solely to the Seller's interest in the Real Property for satisfaction of any claims arising under this Agreement.");
  gap(12);

  // ── Section 19: Waiver ────────────────────────────────────────────────────

  heading("19.  WAIVER");
  body("The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of future enforcement of that or any other provision.");
  gap(12);

  // ── Section 20: Governing Law ─────────────────────────────────────────────

  heading("20.  GOVERNING LAW");
  body(
    "This Agreement shall be governed by and construed in accordance with the laws of the State of " +
    v("governingLawState", "[Insert State]") +
    " (" + v("governingLawCountry", "[Insert Country]") + ")."
  );
  gap(12);

  // ── Optional: Additional Notes ────────────────────────────────────────────

  if ((values.clauseNotes || "").trim()) {
    heading("ADDITIONAL CLAUSE NOTES");
    body(values.clauseNotes.trim(), 12);
    gap(12);
  }
  if ((values.reviewNote || "").trim()) {
    heading("FINAL REVIEW NOTE");
    body(values.reviewNote.trim(), 12);
    gap(12);
  }

  // ── Section 21: Execution / Signatures ───────────────────────────────────

  checkPage(200);
  hline();
  heading("21.  EXECUTION");
  body("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");
  gap(22);

  // Two-column signature block
  const col1    = ML;
  const col2    = ML + TW / 2 + 10;
  const lineLen = TW / 2 - 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 15, 15);
  doc.text("SELLER", col1, y);
  doc.text("AGENT", col2, y);
  y += 20;

  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.75);
  doc.line(col1, y, col1 + lineLen, y);
  doc.line(col2, y, col2 + lineLen, y);
  y += 14;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.text("Signature: " + v("sellerSignature", ""), col1, y);
  doc.text("Signature: " + v("agentSignature",  ""), col2, y);
  y += 16;

  doc.text("Name: " + v("sellerSignName"), col1, y);
  doc.text("Name: " + v("agentSignName"),  col2, y);
  y += 16;

  // Addresses (wrapped)
  const addr1   = v("sellerStreetAddress") + ", " + v("sellerCity") + ", " + v("sellerState") + ", " + v("sellerCountry");
  const addr2   = v("agentStreetAddress")  + ", " + v("agentCity")  + ", " + v("agentState")  + ", " + v("agentCountry");
  const a1Lines = doc.splitTextToSize("Address: " + addr1, lineLen);
  const a2Lines = doc.splitTextToSize("Address: " + addr2, lineLen);
  a1Lines.forEach((l, i) => { checkPage(14); doc.text(l, col1, y + i * 14); });
  a2Lines.forEach((l, i) => { doc.text(l, col2, y + i * 14); });
  y += Math.max(a1Lines.length, a2Lines.length) * 14 + 6;

  doc.text("Email: " + v("sellerEmail", "—"), col1, y);
  doc.text("Email: " + v("agentEmail",  "—"), col2, y);
  y += 16;

  doc.text("Phone: " + v("sellerPhone", "—"), col1, y);
  doc.text("Phone: " + v("agentPhone",  "—"), col2, y);
  y += 16;

  doc.text("Date: " + v("sellerDate", new Date().toLocaleDateString()), col1, y);
  doc.text("Date: " + v("agentDate",  new Date().toLocaleDateString()), col2, y);
  y += 24;

  // Optional Witness
  if ((values.witnessName || "").trim()) {
    checkPage(60);
    hline();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("WITNESS", ML, y);
    y += 16;
    doc.setDrawColor(80, 80, 80);
    doc.setLineWidth(0.75);
    doc.line(ML, y, ML + 200, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.text("Name: " + values.witnessName.trim(), ML, y);
    y += 14;
    doc.text("Date: " + new Date().toLocaleDateString(), ML, y);
  }

  // ── Page numbers ──────────────────────────────────────────────────────────

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Page " + i + " of " + totalPages, PW / 2, PH - 24, { align: "center" });
    doc.text(
      "Real Estate Agent Agreement  |  " +
      v("sellerName", "Seller") + " & " + v("agentName", "Agent"),
      PW / 2, PH - 12, { align: "center" }
    );
  }

  doc.save("Real_Estate_Agent_Agreement.pdf");
};

// ─── Form Wizard UI ───────────────────────────────────────────────────────────

const inputClass =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

function FieldInput({ field, value, onChange, allValues }) {
  if (field.type === "select") {
    return (
      <select
        className={inputClass}
        value={value || ""}
        onChange={(e) => onChange(field.name, e.target.value)}
        required={field.required}
      >
        <option value="">— Select —</option>
        {field.options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  }
  if (field.type === "dynamic_select") {
    const dependVal = allValues[field.dependsOn] || "";
    const opts = getStateOptions(dependVal);
    return (
      <select
        className={inputClass}
        value={value || ""}
        onChange={(e) => onChange(field.name, e.target.value)}
        required={field.required}
      >
        <option value="">— Select —</option>
        {opts.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  }
  if (field.type === "textarea") {
    return (
      <textarea
        className={inputClass + " min-h-[90px] resize-y"}
        value={value || ""}
        onChange={(e) => onChange(field.name, e.target.value)}
        placeholder={field.placeholder || ""}
        required={field.required}
        rows={4}
      />
    );
  }
  return (
    <input
      className={inputClass}
      type={field.type}
      value={value || ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      placeholder={field.placeholder || ""}
      required={field.required}
    />
  );
}

export default function RealEstateAgentAgreementForm() {
  const [step,   setStep]   = useState(0);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const current = steps[step];
  const total   = steps.length;

  const handleChange = (name, val) => {
    setValues((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    current.fields.forEach((f) => {
      if (f.required && !(values[f.name] || "").trim())
        errs[f.name] = "This field is required.";
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next   = () => { if (validate()) setStep((s) => Math.min(s + 1, total - 1)); };
  const prev   = () => setStep((s) => Math.max(s - 1, 0));
  const submit = () => { if (validate()) generatePDF(values); };

  const pct = Math.round(((step + 1) / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 to-red-600 px-6 py-5">
          <h1 className="text-white text-xl font-bold tracking-tight">
            🏡 Real Estate Agent Agreement
          </h1>
          <p className="text-rose-100 text-xs mt-1">
            Complete all steps to generate your legal document
          </p>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Step {step + 1} of {total} — {current.label}</span>
            <span>{pct}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-rose-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: pct + "%" }}
            />
          </div>
        </div>

        {/* Step pills */}
        <div className="px-6 pt-3 flex flex-wrap gap-1">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={
                "text-xs px-2 py-0.5 rounded-full border transition-all " +
                (i === step
                  ? "bg-rose-600 text-white border-rose-600"
                  : i < step
                  ? "bg-rose-100 text-rose-700 border-rose-300"
                  : "bg-gray-100 text-gray-400 border-gray-200")
              }
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div className="px-6 py-5 space-y-4">
          <h2 className="text-base font-semibold text-gray-800 border-b pb-2">
            {current.label}
          </h2>
          {current.fields.map((field) => (
            <div key={field.name}>
              <label className={labelClass}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <FieldInput
                field={field}
                value={values[field.name]}
                onChange={handleChange}
                allValues={values}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 flex justify-between items-center">
          <button
            onClick={prev}
            disabled={step === 0}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Back
          </button>

          {step < total - 1 ? (
            <button
              onClick={next}
              className="px-5 py-2 text-sm rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700 transition"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={submit}
              className="px-5 py-2 text-sm rounded-lg bg-red-700 text-white font-semibold hover:bg-red-800 transition flex items-center gap-2"
            >
              📄 Generate PDF
            </button>
          )}
        </div>

      </div>
    </div>
  );
}