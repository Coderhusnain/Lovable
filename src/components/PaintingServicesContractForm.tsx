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
        name: "effectiveDay",
        label: "Day of the month (e.g. 5)",
        type: "text",
        required: true,
        placeholder: "e.g. 5",
      },
      {
        name: "effectiveMonth",
        label: "Month (e.g. January)",
        type: "text",
        required: true,
        placeholder: "e.g. January",
      },
      {
        name: "effectiveYear",
        label: "Year (e.g. 2025)",
        type: "text",
        required: true,
        placeholder: "e.g. 2025",
      },
    ],
  },
  {
    label: "First Party Name",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the first party (Client)?",
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
        label: "What is the full legal name of the second party (Contractor)?",
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
    label: "Services Description",
    fields: [
      {
        name: "serviceStartDate",
        label: "Service Commencement Date",
        type: "date",
        required: true,
      },
      {
        name: "description",
        label: "Detailed description of painting services to be performed",
        type: "textarea",
        required: true,
        placeholder: "Describe all painting services (e.g. interior walls, exterior trim, prep work)...",
      },
      {
        name: "siteAddress",
        label: "Site Address where services will be performed",
        type: "text",
        required: true,
        placeholder: "123 Work Site Road, City, State",
      },
    ],
  },
  {
    label: "Payment Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "Total compensation amount for services",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: true,
        options: [
          { value: "upon completion of all Services", label: "Upon Completion" },
          { value: "Weekly", label: "Weekly" },
          { value: "Bi-weekly", label: "Bi-weekly" },
          { value: "Monthly", label: "Monthly" },
          { value: "Milestone-based", label: "Milestone-based" },
        ],
      },
      {
        name: "promptPaymentDiscount",
        label: "Prompt payment discount % (if paid within 0 days)",
        type: "text",
        required: false,
        placeholder: "e.g. 2",
      },
      {
        name: "interestRate",
        label: "Interest rate on overdue payments (% per annum)",
        type: "text",
        required: false,
        placeholder: "e.g. 18",
      },
    ],
  },
  {
    label: "Warranty & Defects",
    fields: [
      {
        name: "warrantyRepairDays",
        label: "Number of days to undertake warranty repairs after written notice",
        type: "text",
        required: true,
        placeholder: "e.g. 14",
      },
    ],
  },
  {
    label: "Default & Remedies",
    fields: [
      {
        name: "curePeriodDays",
        label: "Number of days allowed to cure a material breach after notice",
        type: "text",
        required: true,
        placeholder: "e.g. 30",
      },
    ],
  },
  {
    label: "Term & Governing Law",
    fields: [
      {
        name: "contractEndDate",
        label: "Contract termination date",
        type: "date",
        required: true,
      },
      {
        name: "terminationNotice",
        label: "Notice required to terminate",
        type: "select",
        required: true,
        options: [
          { value: "Immediate", label: "Immediate" },
          { value: "7 days", label: "7 Days" },
          { value: "14 days", label: "14 Days" },
          { value: "30 days", label: "30 Days" },
          { value: "60 days", label: "60 Days" },
          { value: "90 days", label: "90 Days" },
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
        label: "Client Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Contractor Signature (Type full legal name)",
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

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_W  = 210;
const PAGE_H  = 297;
const ML      = 20;   // margin left
const MR      = 20;   // margin right
const CW      = PAGE_W - ML - MR; // content width
const MB      = 25;   // margin bottom
const LH      = 5.5;  // line height

// ─── Low-level primitives ─────────────────────────────────────────────────────

/** If remaining space is less than `need` mm, add a new page. */
function ensureSpace(doc: jsPDF, y: number, need: number): number {
  if (y + need > PAGE_H - MB) {
    doc.addPage();
    return 20;
  }
  return y;
}

/** Write wrapped normal body text; auto-paginate line by line. */
function wBody(doc: jsPDF, text: string, y: number, indent = 0): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines: string[] = doc.splitTextToSize(text, CW - indent);
  for (const line of lines) {
    if (y + LH > PAGE_H - MB) { doc.addPage(); y = 20; }
    doc.text(line, ML + indent, y);
    y += LH;
  }
  return y;
}

/** Write a bullet point with wrapped text. */
function wBullet(doc: jsPDF, text: string, y: number): number {
  if (y + LH > PAGE_H - MB) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const ix = 10; // text indent
  const lines: string[] = doc.splitTextToSize(text, CW - ix);
  doc.text("\u2022", ML + 4, y);
  doc.text(lines[0], ML + ix, y);
  y += LH;
  for (let i = 1; i < lines.length; i++) {
    if (y + LH > PAGE_H - MB) { doc.addPage(); y = 20; }
    doc.text(lines[i], ML + ix, y);
    y += LH;
  }
  return y;
}

/** Write an alpha sub-item (a. b. c. d.) with wrapped text. */
function wAlpha(doc: jsPDF, letter: string, text: string, y: number): number {
  if (y + LH > PAGE_H - MB) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const ix = 12;
  const lines: string[] = doc.splitTextToSize(text, CW - ix);
  doc.text(`${letter}.`, ML + 4, y);
  doc.text(lines[0], ML + ix, y);
  y += LH;
  for (let i = 1; i < lines.length; i++) {
    if (y + LH > PAGE_H - MB) { doc.addPage(); y = 20; }
    doc.text(lines[i], ML + ix, y);
    y += LH;
  }
  return y;
}

/**
 * Draw a section heading.
 * `reserve` = estimated mm needed for heading + first chunk of its content.
 * If not enough room, forces a new page BEFORE drawing anything.
 */
function wHeading(doc: jsPDF, title: string, y: number, reserve = 28): number {
  // Keep heading + first ~28mm of content together on same page
  y = ensureSpace(doc, y, reserve);
  // Horizontal rule
  doc.setDrawColor(150, 150, 150);
  doc.setLineWidth(0.3);
  doc.line(ML, y, PAGE_W - MR, y);
  y += 5;
  // Bold title
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(title, ML, y);
  y += 8; // gap between heading and body content
  return y;
}

// ─── PDF generator ────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 20;

  const p1Addr = [values.party1Street, values.party1City, values.party1Zip]
    .filter(Boolean).join(", ");
  const p2Addr = [values.party2Street, values.party2City, values.party2Zip]
    .filter(Boolean).join(", ");
  const stateName = values.state || "____________";

  const effDay   = values.effectiveDay   || "___";
  const effMonth = values.effectiveMonth || "_______";
  const effYear  = values.effectiveYear  || "____";
  const effDate  = `${effDay} day of ${effMonth}, ${effYear}`;

  // ── Title ──
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PAINTING SERVICES CONTRACT", PAGE_W / 2, y, { align: "center" });
  y += 10;

  // ── Preamble ──
  y = wBody(doc,
    `This Painting Services Contract ("Contract") is made and entered into on this ${effDate} (the "Effective Date"), by and between:`,
    y);
  y += 4;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(values.party1Name || "[Name of First Party]", ML, y);
  doc.setFont("helvetica", "normal");
  y += LH;
  y = wBody(doc, `residing at ${p1Addr} (hereinafter referred to as the "Client"),`, y);
  y += 4;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("AND", ML, y);
  y += LH + 3;

  doc.setFont("helvetica", "bold");
  doc.text(values.party2Name || "[Name of Second Party]", ML, y);
  doc.setFont("helvetica", "normal");
  y += LH;
  y = wBody(doc, `having its principal place of business at ${p2Addr} (hereinafter referred to as the "Contractor").`, y);
  y += 4;
  y = wBody(doc, `Collectively referred to as the "Parties" and individually as a "Party."`, y);
  y += 10;

  // ── 1. Description of Services ──
  y = wHeading(doc, "1. Description of Services", y, 35);
  y = wBody(doc, `Commencing on ${values.serviceStartDate || "__________"}, the Contractor shall provide the following painting services to the Client (collectively, the "Services"):`, y);
  y += 3;
  y = wBody(doc, values.description || "[Insert detailed description of the painting services to be performed].", y, 4);
  y += 3;
  y = wBody(doc, `All services shall be performed by the Contractor at the following location: ${values.siteAddress || "[Insert Site Address]"}.`, y);
  y += 10;

  // ── 2. Payment Terms ──
  y = wHeading(doc, "2. Payment Terms", y, 45);
  y = wBullet(doc, `The total compensation for the Services shall be ${values.paymentAmount || "<insert amount>"}, payable ${values.paymentSchedule || "upon completion of all Services"} outlined in this Contract.`, y);
  y = wBullet(doc, `Payment shall be made to the Contractor at ${p2Addr}.`, y);
  y = wBullet(doc, `A prompt payment discount of ${values.promptPaymentDiscount || "<insert amount>"}% shall apply if payment is made within 0 days.`, y);
  y = wBullet(doc, `Interest on overdue payments shall accrue at the rate of ${values.interestRate || "<insert amount>"}% per annum or the maximum rate permissible under applicable law, whichever is lower.`, y);
  y = wBullet(doc, `The Client shall be liable for all collection-related expenses, including reasonable attorneys' fees, incurred in connection with any payment default.`, y);
  y += 10;

  // ── 3. Confidentiality ──
  y = wHeading(doc, "3. Confidentiality", y, 40);
  y = wBullet(doc, `The Contractor, including its employees, agents, and representatives, shall not disclose, use, or permit the use of any proprietary or confidential information belonging to the Client for any purpose other than in connection with the performance of the Services.`, y);
  y = wBullet(doc, `This confidentiality obligation shall survive the termination of this Contract.`, y);
  y = wBullet(doc, `Upon termination, the Contractor shall return to the Client all documentation, records, notes, and materials belonging to the Client.`, y);
  y += 10;

  // ── 4. Changes to Scope of Work ──
  y = wHeading(doc, "4. Changes to Scope of Work", y, 40);
  y = wBullet(doc, `The Client may request changes to the scope of Services during the term of this Contract.`, y);
  y = wBullet(doc, `Any such changes shall only be effective upon execution of a written Change Order, signed by both Parties, which shall be incorporated into this Contract.`, y);
  y = wBullet(doc, `The Client agrees to bear any additional cost resulting from such modifications. Where the exact cost is not known at the time of executing the Change Order, the Contractor shall provide a good faith estimate, and the Client shall pay the actual cost even if it exceeds the estimate.`, y);
  y += 10;

  // ── 5. Indemnification ──
  y = wHeading(doc, "5. Indemnification", y, 30);
  y = wBody(doc, `The Contractor shall indemnify, defend, and hold the Client harmless from and against all claims, losses, liabilities, damages, expenses (including reasonable attorneys' fees), and judgments arising from any acts or omissions of the Contractor, its employees, agents, or representatives in connection with the performance of the Services.`, y);
  y += 10;

  // ── 6. Warranty ──
  y = wHeading(doc, "6. Warranty", y, 50);
  y = wBullet(doc, `The Contractor warrants that all Services shall be performed in a good, workmanlike manner consistent with industry standards applicable in the Contractor's region.`, y);
  y = wBullet(doc, `All materials used shall be new (unless otherwise specified) and of good quality.`, y);
  y = wBullet(doc, `The Contractor agrees to repair any peeling, deteriorating, or fading paint occurring within one (1) year from the date of completion due to its workmanship, provided such issues are not caused by mildew, fungus, or the negligence of builders.`, y);
  y = wBullet(doc, `Any such defects must be reported in writing, and repairs shall be undertaken within ${values.warrantyRepairDays || "<insert days>"} days, weather permitting.`, y);
  y = wBullet(doc, `The Contractor shall assist the Client in enforcing any applicable manufacturer warranties but shall not be otherwise liable for material defects.`, y);
  y += 10;

  // ── 7. Default ──
  y = wHeading(doc, "7. Default", y, 50);
  y = wBody(doc, "The following shall constitute a material breach of this Contract:", y);
  y += 4;
  y = wAlpha(doc, "a", "Failure to make any payment when due;", y);
  y = wAlpha(doc, "b", "Insolvency or bankruptcy of either Party;", y);
  y = wAlpha(doc, "c", "Attachment or seizure of either Party's property;", y);
  y = wAlpha(doc, "d", "Failure to deliver or perform the Services in the manner and timeframe specified.", y);
  y += 10;

  // ── 8. Remedies ──
  y = wHeading(doc, "8. Remedies", y, 28);
  y = wBody(doc, `Upon material breach, the non-defaulting Party may terminate this Contract by written notice. The defaulting Party shall have ${values.curePeriodDays || "-----"} days from receipt of notice to cure the breach. Failure to cure shall result in automatic termination, unless otherwise waived in writing.`, y);
  y += 10;

  // ── 9. Scope of Work Standards ──
  y = wHeading(doc, "9. Scope of Work Standards", y, 45);
  y = wBullet(doc, `The Contractor shall ensure that all surfaces to be painted are free of dirt, mildew, defects, or other impediments to proper adhesion.`, y);
  y = wBullet(doc, `Work shall not commence until all surfaces are clean, dry, and properly prepared.`, y);
  y = wBullet(doc, `Upon completion, the painted surfaces must be of uniform appearance, with full coverage, clean edges, and free from drips, sags, or roughness (except where surface texture is natural).`, y);
  y = wBullet(doc, `The Contractor is responsible for the timely delivery of all paint materials and for cleaning any splatters or residue from the site.`, y);
  y += 10;

  // ── 10. Term ──
  y = wHeading(doc, "10. Term", y, 25);
  y = wBody(doc, `This Contract shall automatically terminate on ${values.contractEndDate || "____________"}, unless earlier terminated in accordance with the provisions herein. Termination notice required: ${values.terminationNotice || "____________"}.`, y);
  y += 10;

  // ── 11. Permits ──
  y = wHeading(doc, "11. Permits", y, 25);
  y = wBody(doc, `The Contractor shall obtain, at its own cost, all necessary permits and approvals required by municipal or other governmental authorities for the execution of the Services.`, y);
  y += 10;

  // ── 12. Insurance ──
  y = wHeading(doc, "12. Insurance", y, 40);
  y = wBody(doc, "The Contractor shall maintain appropriate insurance, including:", y);
  y += 4;
  y = wBullet(doc, "General Liability Insurance", y);
  y = wBullet(doc, "Workers' Compensation Insurance", y);
  y = wBullet(doc, "Builder's Risk Insurance", y);
  y += 10;

  // ── 13. Force Majeure ──
  y = wHeading(doc, "13. Force Majeure", y, 30);
  y = wBody(doc, `If performance of this Contract is hindered or prevented due to Force Majeure (e.g., natural disasters, pandemics, war, civil unrest, strikes), the affected Party shall notify the other in writing. Obligations shall be suspended to the extent necessary, and the affected Party shall make reasonable efforts to resume performance.`, y);
  y += 10;

  // ── 14. Arbitration ──
  y = wHeading(doc, "14. Arbitration", y, 55);
  y = wBody(doc, `Any dispute arising out of this Contract shall be settled by binding arbitration pursuant to the Commercial Arbitration Rules of the American Arbitration Association. The Parties shall jointly appoint an arbitrator or follow a mutually agreed selection process. The arbitration shall take place at a mutually convenient location.`, y);
  y += 4;
  y = wBullet(doc, `The arbitrator(s) shall not modify the Contract or award punitive damages.`, y);
  y = wBullet(doc, `The award shall be final and enforceable in any court with jurisdiction.`, y);
  y = wBullet(doc, `Parties shall continue performance of contractual obligations during arbitration.`, y);
  y += 10;

  // ── 15. Entire Agreement ──
  y = wHeading(doc, "15. Entire Agreement", y, 22);
  y = wBody(doc, `This Contract constitutes the entire agreement between the Parties concerning the subject matter hereof and supersedes all prior oral or written representations or agreements.`, y);
  y += 10;

  // ── 16. Severability ──
  y = wHeading(doc, "16. Severability", y, 22);
  y = wBody(doc, `If any provision is deemed unenforceable or invalid, such provision shall be modified to the extent necessary to become enforceable. The remainder of the Contract shall remain in full force and effect.`, y);
  y += 10;

  // ── 17. Amendment ──
  y = wHeading(doc, "17. Amendment", y, 20);
  y = wBody(doc, `This Contract may only be amended in writing and signed by both Parties.`, y);
  y += 10;

  // ── 18. Governing Law ──
  y = wHeading(doc, "18. Governing Law", y, 20);
  y = wBody(doc, `This Contract shall be governed by and construed in accordance with the laws of the State of ${stateName}.`, y);
  y += 10;

  // ── 19. Notices ──
  y = wHeading(doc, "19. Notices", y, 22);
  y = wBody(doc, `Any notice under this Contract shall be in writing and delivered personally or sent by certified mail, return receipt requested, to the addresses specified in the preamble or as otherwise designated in writing by either Party.`, y);
  y += 10;

  // ── Additional Terms (optional) ──
  if (values.additionalTerms) {
    y = wHeading(doc, "Additional Terms & Conditions", y, 25);
    y = wBody(doc, values.additionalTerms, y);
    y += 10;
  }

  // ── 20. Execution ──
  // Reserve 95mm so entire sig block stays together
  y = ensureSpace(doc, y, 95);
  y = wHeading(doc, "20. Execution", y, 95);
  y = wBody(doc, `IN WITNESS WHEREOF, the Parties hereto have executed this Contract as of the Effective Date first written above.`, y);
  y += 10;

  // CLIENT
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("CLIENT:", ML, y);
  y += LH + 2;
  doc.setFont("helvetica", "normal");
  doc.text("By: ___________________________", ML, y);    y += LH + 3;
  doc.text(`Name: ${values.party1Name || "________________________"}`, ML, y); y += LH + 3;
  if (values.party1Signature) {
    doc.text(`Signature: ${values.party1Signature}`, ML, y); y += LH + 3;
  }
  doc.text("Date: _________________________", ML, y);
  y += LH + 14;

  // CONTRACTOR
  doc.setFont("helvetica", "bold");
  doc.text("CONTRACTOR:", ML, y);
  y += LH + 2;
  doc.setFont("helvetica", "normal");
  doc.text("By: ___________________________", ML, y);    y += LH + 3;
  doc.text(`Name: ${values.party2Name || "________________________"}`, ML, y); y += LH + 3;
  if (values.party2Signature) {
    doc.text(`Signature: ${values.party2Signature}`, ML, y); y += LH + 3;
  }
  doc.text("Date: _________________________", ML, y);
  y += LH + 14;

  // Witness (optional)
  if (values.witnessName) {
    doc.text("Witness: ___________________________", ML, y); y += LH + 3;
    doc.text(`Name: ${values.witnessName}`, ML, y);
  }

  doc.save("painting_services_contract.pdf");
};

export default function PaintingServicesContract() {
  return (
    <FormWizard
      steps={steps}
      title="Painting Services Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="paintingservicescontract"
    />
  );
}