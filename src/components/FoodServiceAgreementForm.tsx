import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Which country's laws will govern this document?",
        type: "select",
        required: true,
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
          { value: "au", label: "Australia" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    label: "State/Province",
    fields: [
      {
        name: "state",
        label: "Which state or province?",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => {
          if (values.country === "us") {
            return [
              { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" },
              { value: "AZ", label: "Arizona" }, { value: "AR", label: "Arkansas" },
              { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
              { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" },
              { value: "FL", label: "Florida" }, { value: "GA", label: "Georgia" },
              { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
              { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" },
              { value: "IA", label: "Iowa" }, { value: "KS", label: "Kansas" },
              { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
              { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" },
              { value: "MA", label: "Massachusetts" }, { value: "MI", label: "Michigan" },
              { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
              { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" },
              { value: "NE", label: "Nebraska" }, { value: "NV", label: "Nevada" },
              { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
              { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" },
              { value: "NC", label: "North Carolina" }, { value: "ND", label: "North Dakota" },
              { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
              { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" },
              { value: "RI", label: "Rhode Island" }, { value: "SC", label: "South Carolina" },
              { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
              { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" },
              { value: "VT", label: "Vermont" }, { value: "VA", label: "Virginia" },
              { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
              { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
              { value: "DC", label: "District of Columbia" },
            ];
          } else if (values.country === "ca") {
            return [
              { value: "AB", label: "Alberta" }, { value: "BC", label: "British Columbia" },
              { value: "MB", label: "Manitoba" }, { value: "NB", label: "New Brunswick" },
              { value: "NL", label: "Newfoundland and Labrador" }, { value: "NS", label: "Nova Scotia" },
              { value: "ON", label: "Ontario" }, { value: "PE", label: "Prince Edward Island" },
              { value: "QC", label: "Quebec" }, { value: "SK", label: "Saskatchewan" },
              { value: "NT", label: "Northwest Territories" }, { value: "NU", label: "Nunavut" },
              { value: "YT", label: "Yukon" },
            ];
          } else if (values.country === "uk") {
            return [
              { value: "ENG", label: "England" }, { value: "SCT", label: "Scotland" },
              { value: "WLS", label: "Wales" }, { value: "NIR", label: "Northern Ireland" },
            ];
          } else if (values.country === "au") {
            return [
              { value: "NSW", label: "New South Wales" }, { value: "VIC", label: "Victoria" },
              { value: "QLD", label: "Queensland" }, { value: "WA", label: "Western Australia" },
              { value: "SA", label: "South Australia" }, { value: "TAS", label: "Tasmania" },
              { value: "ACT", label: "Australian Capital Territory" }, { value: "NT", label: "Northern Territory" },
            ];
          }
          return [{ value: "other", label: "Other Region" }];
        },
      },
    ],
  },
  {
    label: "Agreement Date",
    fields: [
      {
        name: "effectiveDate",
        label: "What is the effective date of this agreement?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "First Party Name",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the first party?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is this party an individual or a business?",
        type: "select",
        required: true,
        options: [
          { value: "individual", label: "Individual" },
          { value: "business", label: "Business/Company" },
        ],
      },
    ],
  },
  {
    label: "First Party Address",
    fields: [
      {
        name: "party1Street",
        label: "Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "party1City",
        label: "City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "party1Zip",
        label: "ZIP/Postal Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
    ],
  },
  {
    label: "First Party Contact",
    fields: [
      {
        name: "party1Email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party1Phone",
        label: "Phone Number",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Second Party Name",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the second party?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is this party an individual or a business?",
        type: "select",
        required: true,
        options: [
          { value: "individual", label: "Individual" },
          { value: "business", label: "Business/Company" },
        ],
      },
    ],
  },
  {
    label: "Second Party Address",
    fields: [
      {
        name: "party2Street",
        label: "Street Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street",
      },
      {
        name: "party2City",
        label: "City",
        type: "text",
        required: true,
        placeholder: "City",
      },
      {
        name: "party2Zip",
        label: "ZIP/Postal Code",
        type: "text",
        required: true,
        placeholder: "ZIP Code",
      },
    ],
  },
  {
    label: "Second Party Contact",
    fields: [
      {
        name: "party2Email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "email@example.com",
      },
      {
        name: "party2Phone",
        label: "Phone Number",
        type: "tel",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Agreement Details",
    fields: [
      {
        name: "description",
        label: "Describe the purpose and scope of this agreement",
        type: "textarea",
        required: true,
        placeholder: "Provide a detailed description of the agreement terms...",
      },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      {
        name: "duration",
        label: "What is the duration of this agreement?",
        type: "select",
        required: true,
        options: [
          { value: "1month", label: "1 Month" },
          { value: "3months", label: "3 Months" },
          { value: "6months", label: "6 Months" },
          { value: "1year", label: "1 Year" },
          { value: "2years", label: "2 Years" },
          { value: "5years", label: "5 Years" },
          { value: "indefinite", label: "Indefinite/Ongoing" },
          { value: "custom", label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice",
        label: "How much notice is required to terminate?",
        type: "select",
        required: true,
        options: [
          { value: "immediate", label: "Immediate" },
          { value: "7days", label: "7 Days" },
          { value: "14days", label: "14 Days" },
          { value: "30days", label: "30 Days" },
          { value: "60days", label: "60 Days" },
          { value: "90days", label: "90 Days" },
        ],
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "What is the payment amount (if applicable)?",
        type: "text",
        required: false,
        placeholder: "$0.00",
      },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: false,
        options: [
          { value: "onetime", label: "One-time Payment" },
          { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" },
          { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "annually", label: "Annually" },
          { value: "milestone", label: "Milestone-based" },
        ],
      },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      {
        name: "confidentiality",
        label: "Include confidentiality clause?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes - Include confidentiality provisions" },
          { value: "no", label: "No - Not needed" },
        ],
      },
      {
        name: "disputeResolution",
        label: "How should disputes be resolved?",
        type: "select",
        required: true,
        options: [
          { value: "mediation", label: "Mediation" },
          { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation", label: "Court Litigation" },
          { value: "negotiation", label: "Good Faith Negotiation First" },
        ],
      },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      {
        name: "additionalTerms",
        label: "Any additional terms or special conditions?",
        type: "textarea",
        required: false,
        placeholder: "Enter any additional terms, conditions, or special provisions...",
      },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      {
        name: "party1Signature",
        label: "First Party Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Second Party Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "witnessName",
        label: "Witness Name (Optional)",
        type: "text",
        required: false,
        placeholder: "Witness full legal name",
      },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ─── PDF helpers ────────────────────────────────────────────────────────────

const PAGE_H = 297;   // A4 height in mm
const MARGIN_TOP = 18;
const MARGIN_BOTTOM = 18;
const MARGIN_LEFT = 20;
const CONTENT_W = 170; // usable width in mm

/** Adds a new page and resets Y to the top margin. */
function addPage(doc: jsPDF): number {
  doc.addPage();
  return MARGIN_TOP;
}

/**
 * Writes a bold section heading and returns the updated Y position.
 * Automatically adds a new page if there is not enough space.
 */
function writeHeading(doc: jsPDF, text: string, y: number): number {
  if (y > PAGE_H - MARGIN_BOTTOM - 14) y = addPage(doc);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, MARGIN_LEFT, y);
  return y + 7;
}

/**
 * Writes a normal body paragraph (wrapped), returning the updated Y.
 * Automatically adds a new page when lines would overflow.
 */
function writeBody(doc: jsPDF, text: string, y: number, indent = 0): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, CONTENT_W - indent);
  for (const line of lines) {
    if (y > PAGE_H - MARGIN_BOTTOM) y = addPage(doc);
    doc.text(line, MARGIN_LEFT + indent, y);
    y += 5;
  }
  return y + 1;
}

/**
 * Writes a bullet item (•  text) with a hanging indent, returning updated Y.
 */
function writeBullet(doc: jsPDF, text: string, y: number): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const bulletX = MARGIN_LEFT + 4;
  const textX   = MARGIN_LEFT + 10;
  const lines    = doc.splitTextToSize(text, CONTENT_W - 10);
  if (y > PAGE_H - MARGIN_BOTTOM) y = addPage(doc);
  doc.text("\u2022", bulletX, y);
  doc.text(lines[0], textX, y);
  y += 5;
  for (let i = 1; i < lines.length; i++) {
    if (y > PAGE_H - MARGIN_BOTTOM) y = addPage(doc);
    doc.text(lines[i], textX, y);
    y += 5;
  }
  return y + 1;
}

/** Adds a thin horizontal rule. */
function writeRule(doc: jsPDF, y: number): number {
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_LEFT, y, MARGIN_LEFT + CONTENT_W, y);
  return y + 4;
}

// ─── Main PDF generator ──────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN_TOP;

  // ── Cover title ──────────────────────────────────────────────────────────
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("FOOD SERVICE AGREEMENT", 105, y, { align: "center" });
  y += 8;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Effective Date: ${values.effectiveDate || "___________"}     |     Jurisdiction: ${values.state || "___"}, ${(values.country || "").toUpperCase()}`,
    105,
    y,
    { align: "center" }
  );
  y += 5;
  y = writeRule(doc, y);

  // ── Parties block ────────────────────────────────────────────────────────
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const intro =
    `This Food Service Agreement ("Agreement") is made and entered into as of ` +
    `${values.effectiveDate || "___________"} ("Effective Date"), by and between:`;
  y = writeBody(doc, intro, y);
  y += 2;

  doc.setFont("helvetica", "bold");
  doc.text("CLIENT (First Party):", MARGIN_LEFT, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.party1Name || "______________________________"}`, MARGIN_LEFT + 4, y); y += 5;
  doc.text(
    `Address: ${values.party1Street || "______________________________"}, ${values.party1City || "____________"} ${values.party1Zip || "_______"}`,
    MARGIN_LEFT + 4, y
  ); y += 5;
  doc.text(`Email:   ${values.party1Email || "______________________________"}   Phone: ${values.party1Phone || "______________________________"}`, MARGIN_LEFT + 4, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("SERVICE PROVIDER (Second Party):", MARGIN_LEFT, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.party2Name || "______________________________"}`, MARGIN_LEFT + 4, y); y += 5;
  doc.text(
    `Address: ${values.party2Street || "______________________________"}, ${values.party2City || "____________"} ${values.party2Zip || "_______"}`,
    MARGIN_LEFT + 4, y
  ); y += 5;
  doc.text(`Email:   ${values.party2Email || "______________________________"}   Phone: ${values.party2Phone || "______________________________"}`, MARGIN_LEFT + 4, y);
  y += 6;

  doc.setFont("helvetica", "italic");
  doc.text(`(collectively referred to as the "Parties").`, MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  y += 6;
  y = writeRule(doc, y);

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 1 – RECITALS
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "1. RECITALS", y);
  y = writeBody(doc, "WHEREAS, the Service Provider is engaged in the business of providing food services; and", y);
  y = writeBody(doc, `WHEREAS, the Client desires to retain the Service Provider to provide food-related services, and the Service Provider desires to provide such services under the terms and conditions set forth herein;`, y);
  y = writeBody(doc, "NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the Parties agree as follows:", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 2 – DESCRIPTION OF SERVICES
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "2. DESCRIPTION OF SERVICES", y);
  y = writeBody(doc, `2.1  Beginning on ${values.effectiveDate || "___________"}, the Service Provider shall provide food services to the Client (the "Services").`, y);
  y = writeBody(doc, "2.2  The Services shall be performed at the following location:", y);
  y = writeBody(doc, `Location: ${values.description ? values.description.split("\n")[0] : "______________________________"}`, y, 6);
  y = writeBody(doc, "2.3  The Services shall include, but are not limited to, the preparation, handling, and service of food items in accordance with applicable laws and industry standards.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 3 – FEES AND PAYMENT TERMS
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "3. SERVICE PROVIDER'S FEES AND PAYMENT TERMS", y);
  y = writeBody(doc, `3.1  In consideration of the Services rendered, the Client agrees to pay the Service Provider at a rate of ${values.paymentAmount ? values.paymentAmount + " per " + (values.paymentSchedule || "period") : "$__________ per hour"}, unless otherwise agreed in writing.`, y);
  y = writeBody(doc, "3.2  The Service Provider shall submit invoices detailing services performed and associated costs.", y);
  y = writeBody(doc, "3.3  The Client shall remit payment within 30 days of receipt of the invoice.", y);
  y = writeBody(doc, "3.4  Late payments may be subject to interest at the maximum rate permitted by law.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 4 – TERM
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "4. TERM", y);
  y = writeBody(doc, `4.1  This Agreement shall commence on the Effective Date and shall remain in effect for ${values.duration || "the agreed duration"}, unless earlier terminated in accordance with this Agreement.`, y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 5 – TERMINATION
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "5. TERMINATION", y);
  y = writeBody(doc, `5.1  Either Party may terminate this Agreement upon ${values.terminationNotice || "30 days'"} written notice.`, y);
  y = writeBody(doc, "5.2  Upon termination, the Service Provider shall be entitled to payment for all Services performed up to the effective date of termination.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 6 – SEVERABILITY
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "6. SEVERABILITY", y);
  y = writeBody(doc, "If any provision of this Agreement is held to be invalid, illegal, or unenforceable, such provision shall be modified to the extent necessary to make it enforceable, and the remaining provisions shall remain in full force and effect.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 7 – AMENDMENTS
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "7. AMENDMENTS", y);
  y = writeBody(doc, "This Agreement may be amended or modified only by a written document signed by both Parties.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 8 – GOVERNING LAW
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "8. GOVERNING LAW", y);
  y = writeBody(doc, `This Agreement shall be governed by and construed in accordance with the laws of ${values.state || "_______________"}, ${(values.country || "").toUpperCase() || "_______________"}.`, y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 9 – NOTICE
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "9. NOTICE", y);
  y = writeBody(doc, "All notices required or permitted under this Agreement shall be in writing and shall be deemed properly given if delivered personally or sent by certified mail, return receipt requested, to the addresses set forth above or to such other address as a Party may designate in writing.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 10 – WAIVER
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "10. WAIVER", y);
  y = writeBody(doc, "The failure of either Party to enforce any provision of this Agreement shall not be deemed a waiver of future enforcement of that or any other provision.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 11 – ASSIGNMENT
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "11. ASSIGNMENT", y);
  y = writeBody(doc, "Neither Party may assign or transfer this Agreement, in whole or in part, without the prior written consent of the other Party, which shall not be unreasonably withheld.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 12 – REMEDIES
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "12. REMEDIES", y);
  y = writeBody(doc, "If either Party fails to perform any material obligation under this Agreement, the non-defaulting Party may provide written notice of default. The defaulting Party shall have 30 days to cure such default. Failure to cure within the specified time shall result in termination of this Agreement and pursuit of all available legal remedies.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 13 – FORCE MAJEURE
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "13. FORCE MAJEURE", y);
  y = writeBody(doc, "Neither Party shall be liable for failure or delay in performance caused by events beyond reasonable control, including but not limited to acts of God, pandemics, epidemics, government restrictions, fire, flood, labor disputes, or civil unrest. Performance shall resume as soon as reasonably practicable.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 14 – DISPUTE RESOLUTION
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "14. DISPUTE RESOLUTION", y);
  y = writeBody(doc, `The Parties shall attempt to resolve disputes through good-faith negotiation. If unresolved, disputes shall be submitted to ${values.disputeResolution || "alternative dispute resolution, including mediation or arbitration"}, as mutually agreed.`, y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 15 – ENTIRE AGREEMENT
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "15. ENTIRE AGREEMENT", y);
  y = writeBody(doc, "This Agreement constitutes the entire understanding between the Parties and supersedes all prior oral or written agreements relating to the subject matter herein.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 16 – INDEMNIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "16. INDEMNIFICATION", y);
  y = writeBody(doc, "The Service Provider agrees to indemnify, defend, and hold harmless the Client from and against all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:", y);
  y = writeBullet(doc, "Acts or omissions of the Service Provider or its employees", y);
  y = writeBullet(doc, "Breach of this Agreement", y);
  y = writeBullet(doc, "Violation of applicable laws or regulations", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 17 – WARRANTY
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "17. WARRANTY", y);
  y = writeBody(doc, "The Service Provider warrants that all Services shall be performed in a professional, timely, and workmanlike manner consistent with generally accepted industry standards.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 18 – DEFAULT
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "18. DEFAULT", y);
  y = writeBody(doc, "The following shall constitute a material default:", y);
  y = writeBullet(doc, "Failure to make payment when due", y);
  y = writeBullet(doc, "Insolvency or bankruptcy of either Party", y);
  y = writeBullet(doc, "Seizure or levy upon property", y);
  y = writeBullet(doc, "Failure to perform Services as required", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 19 – MENUS
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "19. MENUS", y);
  y = writeBody(doc, "The Service Provider shall prepare menus in coordination with the Client and shall ensure food quality, safety, and affordability.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 20 – CLEANLINESS AND SANITATION
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "20. CLEANLINESS AND SANITATION", y);
  y = writeBody(doc, "The Service Provider shall maintain clean and sanitary working conditions and comply with all health and safety regulations.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 21 – RETURN OF EQUIPMENT
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "21. RETURN OF EQUIPMENT", y);
  y = writeBody(doc, "All Client-owned equipment shall be returned in good condition, ordinary wear and tear excepted.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 22 – INSURANCE
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "22. INSURANCE", y);
  y = writeBody(doc, "The Service Provider shall maintain general liability insurance in accordance with applicable legal requirements and shall provide proof upon request.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 23 – LICENSES, TAXES, AND PERMITS
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "23. LICENSES, TAXES, AND PERMITS", y);
  y = writeBody(doc, "The Service Provider shall obtain and pay for all licenses, permits, and taxes required to perform the Services.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 24 – WORKERS' COMPENSATION
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "24. WORKERS' COMPENSATION", y);
  y = writeBody(doc, "The Service Provider shall maintain workers' compensation insurance as required by law and provide proof upon request.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 25 – HEALTH DEPARTMENT COMPLIANCE
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "25. HEALTH DEPARTMENT COMPLIANCE", y);
  y = writeBody(doc, "The Service Provider shall comply with all health department rules, including employee health screenings and food safety regulations.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 26 – RELATIONSHIP OF PARTIES
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "26. RELATIONSHIP OF PARTIES", y);
  y = writeBody(doc, "The Service Provider is an independent contractor and not an employee or agent of the Client. The Client shall not be responsible for payroll taxes or employment benefits.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 27 – LIMITATION OF LIABILITY
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "27. LIMITATION OF LIABILITY", y);
  y = writeBody(doc, "Neither Party shall be liable for indirect, incidental, consequential, or special damages arising from this Agreement.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 28 – FACILITIES AND EQUIPMENT
  // ─────────────────────────────────────────────────────────────────────────
  y = writeHeading(doc, "28. FACILITIES AND EQUIPMENT", y);
  y = writeBullet(doc, "The Client shall provide suitable space and utilities for food service operations.", y);
  y = writeBullet(doc, "The Client shall maintain such facilities in usable condition.", y);
  y += 2;

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION 29 (optional) – CONFIDENTIALITY
  // ─────────────────────────────────────────────────────────────────────────
  if (values.confidentiality === "yes") {
    y = writeHeading(doc, "29. CONFIDENTIALITY", y);
    y = writeBody(doc, "Each Party agrees to keep confidential all non-public information disclosed by the other Party in connection with this Agreement. This obligation survives the termination of this Agreement.", y);
    y += 2;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ADDITIONAL TERMS (if provided)
  // ─────────────────────────────────────────────────────────────────────────
  if (values.additionalTerms) {
    y = writeHeading(doc, "ADDITIONAL TERMS AND CONDITIONS", y);
    y = writeBody(doc, values.additionalTerms, y);
    y += 2;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SIGNATURES
  // ─────────────────────────────────────────────────────────────────────────
  // Ensure signatures start on a fresh page if less than 55 mm remain
  if (y > PAGE_H - MARGIN_BOTTOM - 55) y = addPage(doc);

  y = writeRule(doc, y);
  y = writeHeading(doc, "SIGNATURES", y);
  y = writeBody(doc, "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", y);
  y += 6;

  // Client signature block
  doc.setFont("helvetica", "bold");
  doc.text("CLIENT", MARGIN_LEFT, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.party1Name || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Signature: ${values.party1Signature || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Date:      ${new Date().toLocaleDateString()}`, MARGIN_LEFT, y); y += 10;

  // Service Provider signature block
  doc.setFont("helvetica", "bold");
  doc.text("SERVICE PROVIDER", MARGIN_LEFT, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.party2Name || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Signature: ${values.party2Signature || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Date:      ${new Date().toLocaleDateString()}`, MARGIN_LEFT, y); y += 10;

  // Witness block (optional)
  if (values.witnessName) {
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS", MARGIN_LEFT, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Name:      ${values.witnessName}`, MARGIN_LEFT, y); y += 6;
    doc.text("Signature: ______________________________", MARGIN_LEFT, y); y += 6;
    doc.text(`Date:      ${new Date().toLocaleDateString()}`, MARGIN_LEFT, y);
  }

  doc.save("food_service_agreement.pdf");
};

export default function FoodServiceAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Food Service Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="foodserviceagreement"
    />
  );
}