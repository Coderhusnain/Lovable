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
        label: "Effective date of this agreement",
        type: "date",
        required: true,
      },
      {
        name: "startDate",
        label: "Services start date",
        type: "date",
        required: true,
      },
      {
        name: "terminationDate",
        label: "Agreement termination date",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Client Details",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of the Client",
        type: "text",
        required: true,
        placeholder: "Enter full legal name or entity name",
      },
      {
        name: "party1Title",
        label: "Client Title / Role (optional)",
        type: "text",
        required: false,
        placeholder: "e.g. CEO, Property Manager",
      },
    ],
  },
  {
    label: "Client Address",
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
    label: "Client Contact",
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
    label: "Contractor Details",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of the Contractor",
        type: "text",
        required: true,
        placeholder: "Enter full legal name or entity name",
      },
      {
        name: "party2Title",
        label: "Contractor Title / Role (optional)",
        type: "text",
        required: false,
        placeholder: "e.g. Operations Manager",
      },
    ],
  },
  {
    label: "Contractor Address",
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
    label: "Contractor Contact",
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
    label: "Services & Schedule",
    fields: [
      {
        name: "routineFrequency",
        label: "How many times per week are routine services performed?",
        type: "text",
        required: true,
        placeholder: "e.g. 5",
      },
    ],
  },
  {
    label: "Payment & Default",
    fields: [
      {
        name: "paymentAmount",
        label: "Compensation amount for services (USD)",
        type: "text",
        required: true,
        placeholder: "e.g. 2,500.00",
      },
      {
        name: "defaultCureDays",
        label: "Days allowed to cure a default after written notice",
        type: "text",
        required: true,
        placeholder: "e.g. 10",
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

// ─── PDF helpers ──────────────────────────────────────────────────────────────

/** Bold numbered section heading — returns updated y. */
const addHeading = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 22) { doc.addPage(); y = 20; }
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, 20, y);
  return y + 7;
};

/** Bold sub-label (e.g. "Routine Services") on its own line — returns updated y. */
const addSubLabel = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 16) { doc.addPage(); y = 20; }
  doc.setFontSize(10.5);
  doc.setFont("helvetica", "bold");
  doc.text(text, 20, y);
  return y + 6;
};

/** Wrapped body paragraph — returns updated y. */
const addBody = (
  doc: jsPDF,
  text: string,
  y: number,
  pageH: number,
  indent = 20,
  maxWidth = 170
): number => {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines: string[] = doc.splitTextToSize(text, maxWidth - (indent - 20));
  for (const line of lines) {
    if (y > pageH - 14) { doc.addPage(); y = 20; }
    doc.text(line, indent, y);
    y += 5.5;
  }
  return y + 2;
};

/** Bullet point — returns updated y. */
const addBullet = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 14) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("\u2022", 24, y);
  const lines: string[] = doc.splitTextToSize(text, 156);
  for (let i = 0; i < lines.length; i++) {
    if (y > pageH - 14) { doc.addPage(); y = 20; }
    doc.text(lines[i], 30, y);
    if (i < lines.length - 1) y += 5.5;
  }
  return y + 6;
};

// ─── PDF generator ────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const pageH = doc.internal.pageSize.height;
  let y = 20;

  // ── TITLE ──
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("JANITORIAL SERVICES AGREEMENT", 105, y, { align: "center" });
  y += 11;

  // ── PREAMBLE ──
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  y = addBody(
    doc,
    `This Janitorial Services Agreement (the "Agreement") is entered into and made effective as of ${values.effectiveDate || "[Effective Date]"} (the "Effective Date"), by and between:`,
    y, pageH
  );
  y += 1;

  doc.setFont("helvetica", "bold");
  doc.text(`${values.party1Name || "[Client Name]"},`, 20, y);
  doc.setFont("helvetica", "normal");
  y += 6;
  y = addBody(doc, `having a place of business at ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""} (the "Client"),`, y, pageH);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("and", 105, y, { align: "center" });
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.text(`${values.party2Name || "[Contractor Name]"},`, 20, y);
  doc.setFont("helvetica", "normal");
  y += 6;
  y = addBody(doc, `having a place of business at ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""} (the "Contractor").`, y, pageH);

  y = addBody(doc, 'The Client and the Contractor may hereinafter be referred to individually as a "Party" and collectively as the "Parties."', y, pageH);
  y += 3;

  // ── 1. DESCRIPTION OF SERVICES ──
  y = addHeading(doc, "1. Description of Services", y, pageH);
  y = addBody(
    doc,
    `1.1 Beginning on ${values.startDate || "[Start Date]"}, the Contractor shall provide professional janitorial and cleaning services to the Client (the "Services") at the Client's premises.`,
    y, pageH
  );
  y = addBody(doc, "1.2 The Services shall include, without limitation, the following duties:", y, pageH);
  y += 2;

  y = addSubLabel(doc, `Routine Services (${values.routineFrequency || "[__]"} times per week):`, y, pageH);
  y = addBullet(doc, "a. Cleaning of front door glass and thresholds;", y, pageH);
  y = addBullet(doc, "b. Sweeping and dust mopping of all floors;", y, pageH);
  y = addBullet(doc, "c. Sweeping of all halls and stairways;", y, pageH);
  y = addBullet(doc, "d. Vacuuming of carpets and rugs, with spot cleaning as necessary;", y, pageH);
  y = addBullet(doc, "e. Emptying and cleaning of all ashtrays;", y, pageH);
  y = addBullet(doc, "f. Emptying of all waste containers;", y, pageH);
  y = addBullet(doc, "g. Dusting of office furniture, telephones, ledges, woodwork, and accessible surfaces;", y, pageH);
  y = addBullet(doc, "h. Removal of fingerprints from both sides of entrance doors, interior doors, partitions, woodwork, and walls;", y, pageH);
  y = addBullet(doc, "i. Scrubbing and disinfecting of all restroom floors and fixtures;", y, pageH);
  y = addBullet(doc, "j. Replacement of restroom supplies in appropriate dispensers;", y, pageH);
  y = addBullet(doc, "k. Dusting of light fixtures; and", y, pageH);
  y = addBullet(doc, "l. Maintenance of the janitorial room in a clean, neat, and orderly condition.", y, pageH);
  y += 2;

  y = addSubLabel(doc, "Monthly Services (once per month):", y, pageH);
  y = addBullet(doc, "m. Thorough cleaning and waxing of all floors; and", y, pageH);
  y = addBullet(doc, "n. Cleaning of exterior windows on both the interior and exterior sides.", y, pageH);
  y += 2;

  // ── 2. MATERIALS AND SUPPLIES ──
  y = addHeading(doc, "2. Materials and Supplies", y, pageH);
  y = addBody(
    doc,
    "2.1 The Contractor shall provide, at its sole cost, all cleaning materials, equipment, and tools necessary for performance of the Services, with the exception of consumables (including hand soap, paper towels, toilet tissue, seat covers, and similar supplies).",
    y, pageH
  );
  y = addBody(
    doc,
    "2.2 The Client shall supply all consumables and shall maintain an adequate stock in the janitorial storage area of the building.",
    y, pageH
  );
  y += 2;

  // ── 3. SUPERVISION ──
  y = addHeading(doc, "3. Supervision", y, pageH);
  y = addBody(
    doc,
    "3.1 The Contractor shall conduct systematic inspections to ensure that the Services are performed in a satisfactory manner and in accordance with professional cleaning standards.",
    y, pageH
  );
  y = addBody(
    doc,
    "3.2 Any complaints or deficiencies reported by the Client shall be promptly addressed and remedied by the Contractor.",
    y, pageH
  );
  y += 2;

  // ── 4. PAYMENT TERMS ──
  y = addHeading(doc, "4. Payment Terms", y, pageH);
  y = addBody(
    doc,
    `4.1 The Client shall pay the Contractor the sum of US $${values.paymentAmount || "[Amount]"} as compensation for the Services described herein, payable upon completion of Services, unless otherwise agreed in writing.`,
    y, pageH
  );
  y = addBody(
    doc,
    "4.2 Compensation shall be consistent with the prevailing union wage scale applicable to employees in this sector. Should there be an increase or decrease in the union wage scale, the compensation payable under this Agreement shall be adjusted accordingly.",
    y, pageH
  );
  y += 2;

  // ── 5. TERM ──
  y = addHeading(doc, "5. Term", y, pageH);
  y = addBody(
    doc,
    `5.1 This Agreement shall commence on the Effective Date and shall automatically terminate on ${values.terminationDate || "[Termination Date]"}, unless earlier terminated in accordance with this Agreement or extended by written agreement of the Parties.`,
    y, pageH
  );
  y += 2;

  // ── 6. COMPLIANCE WITH LAWS ──
  y = addHeading(doc, "6. Compliance with Laws", y, pageH);
  y = addBody(
    doc,
    "6.1 In the performance of the Services, the Contractor shall comply with all applicable federal, state, county, and municipal laws, statutes, ordinances, regulations, and codes.",
    y, pageH
  );
  y += 2;

  // ── 7. INSURANCE ──
  y = addHeading(doc, "7. Insurance", y, pageH);
  y = addBody(
    doc,
    "7.1 At its sole cost and expense, the Contractor shall procure and maintain throughout the term of this Agreement adequate workers' compensation insurance covering all of its employees engaged in the performance of Services under this Agreement.",
    y, pageH
  );
  y = addBody(
    doc,
    "7.2 The Contractor shall furnish evidence of insurance coverage to the Client upon request.",
    y, pageH
  );
  y += 2;

  // ── 8. CONFIDENTIALITY ──
  y = addHeading(doc, "8. Confidentiality", y, pageH);
  y = addBody(
    doc,
    "8.1 The Contractor, including its employees, agents, and representatives, shall not, during or after the term of this Agreement, disclose, communicate, or use for personal benefit any confidential or proprietary information belonging to the Client.",
    y, pageH
  );
  y = addBody(
    doc,
    "8.2 This confidentiality obligation shall survive termination of this Agreement.",
    y, pageH
  );
  y += 2;

  // ── 9. INDEMNIFICATION ──
  y = addHeading(doc, "9. Indemnification", y, pageH);
  y = addBody(
    doc,
    "9.1 The Contractor agrees to indemnify, defend, and hold harmless the Client, its officers, agents, and employees from and against any and all claims, losses, damages, liabilities, and expenses, including reasonable attorney's fees, arising out of or related to the acts, omissions, or negligence of the Contractor, its employees, agents, or subcontractors in connection with the performance of the Services.",
    y, pageH
  );
  y += 2;

  // ── 10. WARRANTY OF SERVICES ──
  y = addHeading(doc, "10. Warranty of Services", y, pageH);
  y = addBody(
    doc,
    "10.1 The Contractor warrants that all Services shall be performed diligently, in a timely and workmanlike manner, and in accordance with generally accepted industry standards.",
    y, pageH
  );
  y = addBody(
    doc,
    "10.2 The Contractor further warrants that the quality of Services shall be equal to or superior to that provided by similar service providers in the community.",
    y, pageH
  );
  y += 2;

  // ── 11. DEFAULT ──
  y = addHeading(doc, "11. Default", y, pageH);
  y = addBody(doc, "11.1 The occurrence of any of the following shall constitute a default under this Agreement:", y, pageH);
  y = addBullet(doc, "a. Failure of either Party to make payments when due;", y, pageH);
  y = addBullet(doc, "b. Insolvency or bankruptcy of either Party;", y, pageH);
  y = addBullet(doc, "c. Property of either Party being subjected to levy, seizure, or sale by creditors or governmental authorities; or", y, pageH);
  y = addBullet(doc, "d. Failure by the Contractor to perform or deliver the Services in the time, manner, and quality required herein.", y, pageH);
  y += 2;

  // ── 12. REMEDIES ──
  y = addHeading(doc, "12. Remedies", y, pageH);
  y = addBody(
    doc,
    "12.1 In the event of default, the non-defaulting Party may terminate this Agreement by providing written notice to the defaulting Party.",
    y, pageH
  );
  y = addBody(
    doc,
    `12.2 The defaulting Party shall have ${values.defaultCureDays || "[__]"} days from receipt of such notice to cure the default. If the default is not cured within the stated period, this Agreement shall automatically terminate without further notice.`,
    y, pageH
  );
  y += 2;

  // ── 13. FORCE MAJEURE ──
  y = addHeading(doc, "13. Force Majeure", y, pageH);
  y = addBody(
    doc,
    "13.1 Neither Party shall be liable for failure to perform its obligations under this Agreement if such failure is caused by an event beyond its reasonable control, including but not limited to acts of God, pandemics, epidemics, natural disasters, strikes, riots, vandalism, governmental restrictions, public health crises, or war.",
    y, pageH
  );
  y = addBody(
    doc,
    "13.2 The obligations of the affected Party shall be suspended for the duration of the Force Majeure event.",
    y, pageH
  );
  y += 2;

  // ── 14. DISPUTE RESOLUTION ──
  y = addHeading(doc, "14. Dispute Resolution", y, pageH);
  y = addBody(
    doc,
    "14.1 Any dispute, controversy, or claim arising out of or relating to this Agreement shall first be addressed by the Parties through good-faith negotiations.",
    y, pageH
  );
  y = addBody(
    doc,
    "14.2 If the dispute is not resolved, it shall proceed to Alternative Dispute Resolution (ADR) in the form of mediation conducted under applicable statutory rules.",
    y, pageH
  );
  y = addBody(
    doc,
    "14.3 If mediation fails, either Party may seek appropriate legal or equitable remedies in a court of competent jurisdiction.",
    y, pageH
  );
  y += 2;

  // ── 15. ENTIRE AGREEMENT ──
  y = addHeading(doc, "15. Entire Agreement", y, pageH);
  y = addBody(
    doc,
    "15.1 This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior discussions, negotiations, or agreements, whether oral or written.",
    y, pageH
  );
  y += 2;

  // ── 16. SEVERABILITY ──
  y = addHeading(doc, "16. Severability", y, pageH);
  y = addBody(
    doc,
    "16.1 If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect.",
    y, pageH
  );
  y = addBody(
    doc,
    "16.2 If limitation or modification of a provision renders it valid and enforceable, such provision shall be enforced to the fullest extent permissible.",
    y, pageH
  );
  y += 2;

  // ── 17. AMENDMENT ──
  y = addHeading(doc, "17. Amendment", y, pageH);
  y = addBody(
    doc,
    "17.1 This Agreement may only be amended, modified, or supplemented by a written instrument signed by both Parties.",
    y, pageH
  );
  y += 2;

  // ── 18. GOVERNING LAW ──
  y = addHeading(doc, "18. Governing Law", y, pageH);
  y = addBody(
    doc,
    `18.1 This Agreement shall be governed by and construed in accordance with the laws of the State of ${values.state || "[Insert State]"}, without regard to its conflict-of-law principles.`,
    y, pageH
  );
  y += 2;

  // ── 19. NOTICES ──
  y = addHeading(doc, "19. Notices", y, pageH);
  y = addBody(
    doc,
    "19.1 Any notice or communication required or permitted under this Agreement shall be deemed duly given if delivered personally or sent by certified mail, return receipt requested, to the addresses specified in the preamble of this Agreement, or to such other address as either Party may designate in writing.",
    y, pageH
  );
  y += 2;

  // ── 20. WAIVER OF CONTRACTUAL RIGHTS ──
  y = addHeading(doc, "20. Waiver of Contractual Rights", y, pageH);
  y = addBody(
    doc,
    "20.1 The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of such provision or any other provision, nor shall it affect that Party's right to enforce such provision thereafter.",
    y, pageH
  );
  y += 2;

  // ── ADDITIONAL TERMS ──
  if (values.additionalTerms) {
    y = addHeading(doc, "Additional Terms", y, pageH);
    y = addBody(doc, values.additionalTerms, y, pageH);
    y += 2;
  }

  // ── 21. EXECUTION AND SIGNATURES ──
  if (y > pageH - 72) { doc.addPage(); y = 20; }
  y = addHeading(doc, "21. Execution and Signatures", y, pageH);
  y = addBody(
    doc,
    "21.1 This Agreement shall be executed by the duly authorized representatives of the Parties and shall be binding as of the Effective Date.",
    y, pageH
  );
  y += 6;

  // Client block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("SERVICE RECIPIENT (Client):", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("By: _______________________________", 20, y);
  y += 7;
  doc.text(`Name: ${values.party1Name || ""}`, 20, y);
  y += 7;
  if (values.party1Title) {
    doc.text(`Title: ${values.party1Title}`, 20, y);
    y += 7;
  }
  doc.text(`Typed Signature: ${values.party1Signature || ""}`, 20, y);
  y += 7;
  doc.text(`Date: ${values.effectiveDate || new Date().toLocaleDateString()}`, 20, y);
  y += 14;

  // Contractor block
  doc.setFont("helvetica", "bold");
  doc.text("SERVICE PROVIDER (Contractor):", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("By: _______________________________", 20, y);
  y += 7;
  doc.text(`Name: ${values.party2Name || ""}`, 20, y);
  y += 7;
  if (values.party2Title) {
    doc.text(`Title: ${values.party2Title}`, 20, y);
    y += 7;
  }
  doc.text(`Typed Signature: ${values.party2Signature || ""}`, 20, y);
  y += 7;
  doc.text(`Date: ${values.effectiveDate || new Date().toLocaleDateString()}`, 20, y);
  y += 14;

  // Witness block
  if (values.witnessName) {
    if (y > pageH - 20) { doc.addPage(); y = 20; }
    doc.text("Witness: _______________________________", 20, y);
    y += 7;
    doc.text(`Name: ${values.witnessName}`, 20, y);
  }

  doc.save("janitorial_services_agreement.pdf");
};

export default function JanitorialServicesAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Janitorial Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="janitorialservicesagreement"
    />
  );
}