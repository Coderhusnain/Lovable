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
        getOptions: (value) => {
          if (value === "us") {
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
          { value: "1month",    label: "1 Month" },
          { value: "3months",   label: "3 Months" },
          { value: "6months",   label: "6 Months" },
          { value: "1year",     label: "1 Year" },
          { value: "2years",    label: "2 Years" },
          { value: "5years",    label: "5 Years" },
          { value: "indefinite",label: "Indefinite/Ongoing" },
          { value: "custom",    label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice",
        label: "How much notice is required to terminate?",
        type: "select",
        required: true,
        options: [
          { value: "immediate", label: "Immediate" },
          { value: "7days",     label: "7 Days" },
          { value: "14days",    label: "14 Days" },
          { value: "30days",    label: "30 Days" },
          { value: "60days",    label: "60 Days" },
          { value: "90days",    label: "90 Days" },
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
          { value: "onetime",   label: "One-time Payment" },
          { value: "weekly",    label: "Weekly" },
          { value: "biweekly",  label: "Bi-weekly" },
          { value: "monthly",   label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "annually",  label: "Annually" },
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
          { value: "no",  label: "No - Not needed" },
        ],
      },
      {
        name: "disputeResolution",
        label: "How should disputes be resolved?",
        type: "select",
        required: true,
        options: [
          { value: "mediation",    label: "Mediation" },
          { value: "arbitration",  label: "Binding Arbitration" },
          { value: "litigation",   label: "Court Litigation" },
          { value: "negotiation",  label: "Good Faith Negotiation First" },
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

// ─── PDF layout constants ────────────────────────────────────────────────────
const PAGE_H      = 297;   // A4 height in mm
const MARGIN_TOP  = 18;
const MARGIN_BTM  = 18;
const MARGIN_LEFT = 20;
const CONTENT_W   = 170;   // usable line width in mm

// ─── PDF helper functions ────────────────────────────────────────────────────

/** Opens a new page and returns the reset Y cursor. */
function newPage(doc: jsPDF): number {
  doc.addPage();
  return MARGIN_TOP;
}

/** Draws a thin horizontal divider and returns updated Y. */
function rule(doc: jsPDF, y: number): number {
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_LEFT, y, MARGIN_LEFT + CONTENT_W, y);
  return y + 4;
}

/**
 * Renders a bold section heading and returns updated Y.
 * Forces a new page when fewer than 14 mm remain.
 */
function heading(doc: jsPDF, text: string, y: number): number {
  if (y > PAGE_H - MARGIN_BTM - 14) y = newPage(doc);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, MARGIN_LEFT, y);
  return y + 7;
}

/**
 * Renders a wrapped body paragraph and returns updated Y.
 * Moves to a new page whenever a line would overflow the bottom margin.
 */
function body(doc: jsPDF, text: string, y: number, indent = 0): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, CONTENT_W - indent);
  for (const line of lines) {
    if (y > PAGE_H - MARGIN_BTM) y = newPage(doc);
    doc.text(line, MARGIN_LEFT + indent, y);
    y += 5;
  }
  return y + 1;
}

/**
 * Renders a single bullet item with a hanging indent and returns updated Y.
 * Handles multi-line wrapping and page overflow.
 */
function bullet(doc: jsPDF, text: string, y: number): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const bulletX = MARGIN_LEFT + 4;
  const textX   = MARGIN_LEFT + 10;
  const lines   = doc.splitTextToSize(text, CONTENT_W - 10);
  if (y > PAGE_H - MARGIN_BTM) y = newPage(doc);
  doc.text("\u2022", bulletX, y);
  doc.text(lines[0], textX, y);
  y += 5;
  for (let i = 1; i < lines.length; i++) {
    if (y > PAGE_H - MARGIN_BTM) y = newPage(doc);
    doc.text(lines[i], textX, y);
    y += 5;
  }
  return y + 1;
}

// ─── Main PDF generator ───────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN_TOP;

  // ── Title ─────────────────────────────────────────────────────────────────
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("CATERING AGREEMENT", 105, y, { align: "center" });
  y += 8;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Effective Date: ${values.effectiveDate || "___________"}     |     Jurisdiction: ${values.state || "___"}, ${(values.country || "").toUpperCase()}`,
    105, y, { align: "center" }
  );
  y += 5;
  y = rule(doc, y);

  // ── Preamble / Parties ────────────────────────────────────────────────────
  y = body(doc,
    `This Catering Agreement ("Agreement") is made and entered into as of ${values.effectiveDate || "___________"} ("Effective Date") by and between:`,
    y
  );
  y += 2;

  doc.setFont("helvetica", "bold");
  doc.text("CLIENT (FIRST PARTY)", MARGIN_LEFT, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.party1Name    || "______________________________"}`, MARGIN_LEFT + 4, y); y += 5;
  doc.text(
    `Address: ${values.party1Street || "______________________________"}, ${values.party1City || "____________"} ${values.party1Zip || "_______"}`,
    MARGIN_LEFT + 4, y
  ); y += 5;
  doc.text(
    `Email:   ${values.party1Email || "______________________________"}   Phone: ${values.party1Phone || "______________________________"}`,
    MARGIN_LEFT + 4, y
  );
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("CATERER (SECOND PARTY)", MARGIN_LEFT, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.party2Name    || "______________________________"}`, MARGIN_LEFT + 4, y); y += 5;
  doc.text(
    `Address: ${values.party2Street || "______________________________"}, ${values.party2City || "____________"} ${values.party2Zip || "_______"}`,
    MARGIN_LEFT + 4, y
  ); y += 5;
  doc.text(
    `Email:   ${values.party2Email || "______________________________"}   Phone: ${values.party2Phone || "______________________________"}`,
    MARGIN_LEFT + 4, y
  );
  y += 7;

  doc.setFont("helvetica", "italic");
  doc.text(`The Client and the Caterer may be referred to individually as a "Party" and collectively as the "Parties."`, MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  y += 6;
  y = rule(doc, y);

  // ── SECTION 1 – TERM ──────────────────────────────────────────────────────
  y = heading(doc, "1. TERM", y);
  y = body(doc,
    `1.1  This Agreement shall commence on ${values.effectiveDate || "___________"} and shall remain in full force and effect for ${values.duration || "the agreed duration"}, unless terminated earlier in accordance with this Agreement.`,
    y
  );
  y = body(doc,
    "1.2  The Agreement may be extended or renewed only by written consent duly executed by both Parties.",
    y
  );
  y += 2;

  // ── SECTION 2 – ENGAGEMENT OF SERVICES ───────────────────────────────────
  y = heading(doc, "2. ENGAGEMENT OF SERVICES", y);
  y = body(doc,
    "2.1  The Client hereby engages the Caterer to provide professional catering services for the event described herein, and the Caterer accepts such engagement subject to the terms and conditions set forth in this Agreement.",
    y
  );
  y += 2;

  // ── SECTION 3 – EVENT DETAILS ─────────────────────────────────────────────
  y = heading(doc, "3. EVENT DETAILS", y);
  y = body(doc, `3.1  Event Date: ${values.effectiveDate || "___________"}`, y);
  y = body(doc,
    `3.2  Event Location: ${values.description ? values.description.split("\n")[0] : "______________________________"}`,
    y
  );
  y = body(doc,
    "3.3  Prices, menu, and preparations are calculated based on the estimated number of attendees provided by the Client. The Caterer shall prepare sufficient food and beverages to adequately serve all attendees, subject to reasonable industry standards.",
    y
  );
  y += 2;

  // ── SECTION 4 – MENU ──────────────────────────────────────────────────────
  y = heading(doc, "4. MENU", y);
  y = body(doc,
    "4.1  The Caterer reserves the right to make minor substitutions to the agreed menu in the event that certain ingredients are unavailable due to circumstances beyond the Caterer's reasonable control.",
    y
  );
  y += 2;

  // ── SECTION 5 – CONSIDERATION AND PAYMENT TERMS ──────────────────────────
  y = heading(doc, "5. CONSIDERATION AND PAYMENT TERMS", y);
  y = body(doc,
    `5.1  The Client shall pay the Caterer ${values.paymentAmount ? values.paymentAmount + (values.paymentSchedule ? " (" + values.paymentSchedule + ")" : "") : "US $__________ per person"} in cash.`,
    y
  );
  y = body(doc,
    "5.2  Full payment shall be made on or before the event date. No set-off, deduction, or withholding shall be permitted unless otherwise required by law.",
    y
  );
  y = body(doc,
    "5.3  Late Payment Penalty: Any payment not made when due shall accrue interest at the maximum rate allowable by law, calculated from the due date until payment is received in full.",
    y
  );
  y = body(doc,
    "5.4  The Client shall also be liable for all reasonable collection costs, including attorney's fees and court costs, incurred by the Caterer in recovering overdue amounts.",
    y
  );
  y += 2;

  // ── SECTION 6 – ADDITIONAL SERVICES ──────────────────────────────────────
  y = heading(doc, "6. ADDITIONAL SERVICES", y);
  y = body(doc,
    "6.1  Any additional services requested by the Client that fall outside the scope of this Agreement shall be subject to additional charges.",
    y
  );
  y = body(doc,
    "6.2  All such requests must be made in writing and acknowledged by the Caterer prior to performance.",
    y
  );
  y += 2;

  // ── SECTION 7 – INDEPENDENT CONTRACTOR STATUS ────────────────────────────
  y = heading(doc, "7. INDEPENDENT CONTRACTOR STATUS", y);
  y = body(doc,
    "7.1  The Caterer shall perform its obligations as an independent contractor and not as an employee, partner, or agent of the Client.",
    y
  );
  y = body(doc,
    "7.2  The Caterer shall provide and maintain its own equipment, tools, and staff required for the performance of services.",
    y
  );
  y += 2;

  // ── SECTION 8 – FORCE MAJEURE ─────────────────────────────────────────────
  y = heading(doc, "8. FORCE MAJEURE", y);
  y = body(doc,
    "8.1  Neither Party shall be held liable for any failure or delay in performance under this Agreement if such failure or delay is caused by events beyond its reasonable control, including but not limited to:",
    y
  );
  y = bullet(doc, "Acts of God or natural disasters", y);
  y = bullet(doc, "Fire, flood, storm, or vandalism", y);
  y = bullet(doc, "Pandemic, epidemic, or public health crisis", y);
  y = bullet(doc, "Governmental restrictions or unforeseen regulatory changes", y);
  y = body(doc,
    "8.2  In such cases, obligations shall be suspended for the duration of the event preventing performance.",
    y
  );
  y += 2;

  // ── SECTION 9 – CANCELLATION ──────────────────────────────────────────────
  y = heading(doc, "9. CANCELLATION", y);
  y = body(doc,
    `9.1  If the Client cancels the event for any reason other than a Force Majeure event, the Caterer shall be entitled to liquidated damages as a percentage of the total estimated charges, as agreed in writing. Cancellation notice required: ${values.terminationNotice || "30 days"}.`,
    y
  );
  y += 2;

  // ── SECTION 10 – INSURANCE AND INDEMNIFICATION ────────────────────────────
  y = heading(doc, "10. INSURANCE AND INDEMNIFICATION", y);
  y = body(doc,
    "10.1  The Caterer shall maintain at its sole expense general liability insurance in coverage amounts customary for the catering industry.",
    y
  );
  y = body(doc,
    "10.2  The Client shall indemnify, defend, and hold harmless the Caterer and its employees, agents, and subcontractors from and against any claims, losses, damages, theft, or property loss caused by the Client's guests or invitees.",
    y
  );
  y += 2;

  // ── SECTION 11 – COMPLIANCE WITH RULES AND REGULATIONS ───────────────────
  y = heading(doc, "11. COMPLIANCE WITH RULES AND REGULATIONS", y);
  y = body(doc,
    "11.1  The Caterer shall comply with all applicable laws, regulations, ordinances, and rules of the local county health department and shall maintain industry-standard hygienic and food safety practices at all times.",
    y
  );
  y += 2;

  // ── SECTION 12 – ASSIGNMENT ───────────────────────────────────────────────
  y = heading(doc, "12. ASSIGNMENT", y);
  y = body(doc,
    "12.1  Neither Party may assign, transfer, or delegate its rights or obligations under this Agreement without the prior written consent of the other Party.",
    y
  );
  y = body(doc,
    "12.2  This Agreement shall be binding upon and inure to the benefit of the Parties and their respective successors and permitted assigns.",
    y
  );
  y += 2;

  // ── SECTION 13 – ENTIRE AGREEMENT ────────────────────────────────────────
  y = heading(doc, "13. ENTIRE AGREEMENT", y);
  y = body(doc,
    "13.1  This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations, understandings, or agreements, whether oral or written, relating to the subject matter hereof.",
    y
  );
  y += 2;

  // ── SECTION 14 – GOVERNING LAW AND VENUE ─────────────────────────────────
  y = heading(doc, "14. GOVERNING LAW AND VENUE", y);
  y = body(doc,
    `14.1  This Agreement shall be governed by and construed in accordance with the laws of the State of ${values.state || "_______________"}, without regard to its conflict of laws principles.`,
    y
  );
  y = body(doc,
    `14.2  The exclusive venue for any dispute arising under this Agreement shall be the courts located in ${values.state || "_______________"}.`,
    y
  );
  y += 2;

  // ── SECTION 15 – DISPUTE RESOLUTION ──────────────────────────────────────
  y = heading(doc, "15. DISPUTE RESOLUTION", y);
  y = body(doc,
    "15.1  In the event of any dispute, controversy, or claim arising out of or relating to this Agreement, the Parties shall first attempt to resolve the matter through good-faith negotiations.",
    y
  );
  y = body(doc,
    "15.2  If the dispute is not resolved within 30 days, the Parties agree to submit the matter to mediation administered by a mutually agreed mediator.",
    y
  );
  y = body(doc,
    `15.3  If mediation fails, the dispute shall be finally resolved by ${values.disputeResolution === "arbitration" ? "binding arbitration" : values.disputeResolution || "binding arbitration"} under the rules of the American Arbitration Association. The arbitral award shall be final and binding upon both Parties and may be entered and enforced in any court of competent jurisdiction.`,
    y
  );
  y += 2;

  // ── SECTION 16 – ATTORNEY'S FEES ─────────────────────────────────────────
  y = heading(doc, "16. ATTORNEY'S FEES", y);
  y = body(doc,
    "16.1  In the event of litigation or arbitration arising out of this Agreement, the prevailing Party shall be entitled to recover reasonable attorney's fees, costs, and expenses incurred.",
    y
  );
  y += 2;

  // ── CONFIDENTIALITY (conditional) ────────────────────────────────────────
  if (values.confidentiality === "yes") {
    y = heading(doc, "17. CONFIDENTIALITY", y);
    y = body(doc,
      "Each Party agrees to keep confidential all non-public information disclosed by the other Party in connection with this Agreement. This obligation survives termination of the Agreement.",
      y
    );
    y += 2;
  }

  // ── ADDITIONAL TERMS (conditional) ───────────────────────────────────────
  if (values.additionalTerms) {
    y = heading(doc, "ADDITIONAL TERMS AND CONDITIONS", y);
    y = body(doc, values.additionalTerms, y);
    y += 2;
  }

  // ── SECTION 17 – EXECUTION AND SIGNATURES ────────────────────────────────
  // Ensure the signature block always has at least 65 mm of space
  if (y > PAGE_H - MARGIN_BTM - 65) y = newPage(doc);
  y = rule(doc, y);
  y = heading(doc, `${values.confidentiality === "yes" ? "18" : "17"}. EXECUTION AND SIGNATURES`, y);
  y = body(doc,
    "17.1  This Agreement shall be executed by the duly authorized representatives of both Parties.",
    y
  );
  y = body(doc,
    "17.2  This Agreement shall be effective as of the Effective Date stated above.",
    y
  );
  y += 6;

  // Client signature block
  doc.setFont("helvetica", "bold");
  doc.text("CLIENT", MARGIN_LEFT, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.party1Name      || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Signature: ${values.party1Signature || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Title:     ______________________________`,                                MARGIN_LEFT, y); y += 6;
  doc.text(`Date:      ${new Date().toLocaleDateString()}`,                            MARGIN_LEFT, y);
  y += 10;

  // Caterer signature block
  doc.setFont("helvetica", "bold");
  doc.text("CATERER", MARGIN_LEFT, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.party2Name      || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Signature: ${values.party2Signature || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Title:     ______________________________`,                                MARGIN_LEFT, y); y += 6;
  doc.text(`Date:      ${new Date().toLocaleDateString()}`,                            MARGIN_LEFT, y);
  y += 10;

  // Optional witness block
  if (values.witnessName) {
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS", MARGIN_LEFT, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Name:      ${values.witnessName}`,     MARGIN_LEFT, y); y += 6;
    doc.text("Signature: ______________________________", MARGIN_LEFT, y); y += 6;
    doc.text(`Date:      ${new Date().toLocaleDateString()}`, MARGIN_LEFT, y);
  }

  doc.save("catering_agreement.pdf");
};

export default function CateringAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Catering Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="cateringagreement"
    />
  );
}