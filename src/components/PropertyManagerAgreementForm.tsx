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
        label: "Management start date",
        type: "date",
        required: true,
      },
      {
        name: "endDate",
        label: "Agreement end / termination date",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Owner Details",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of the Owner",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Owner an individual or a business?",
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
    label: "Owner Address",
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
    label: "Owner Contact",
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
    label: "Manager Details",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of the Manager",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Manager an individual or a business?",
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
    label: "Manager Address",
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
    label: "Manager Contact",
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
    label: "Property Details",
    fields: [
      {
        name: "propertyDescription",
        label: "Property address(es) and description",
        type: "textarea",
        required: true,
        placeholder: "e.g. 123 Oak Street, Unit 4B, Springfield, IL 62701 — 2-bedroom residential apartment",
      },
    ],
  },
  {
    label: "Compensation & Term",
    fields: [
      {
        name: "commissionPercent",
        label: "Manager's compensation (% of monthly gross rental collections)",
        type: "text",
        required: true,
        placeholder: "e.g. 10",
      },
      {
        name: "remittanceDay",
        label: "Day of month net income is remitted to Owner",
        type: "text",
        required: true,
        placeholder: "e.g. 15",
      },
      {
        name: "terminationNoticeDays",
        label: "Days of written notice required to terminate",
        type: "text",
        required: true,
        placeholder: "e.g. 30",
      },
      {
        name: "defaultCureDays",
        label: "Days allowed to cure a default before termination",
        type: "text",
        required: true,
        placeholder: "e.g. 15",
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
        label: "Owner Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Manager Signature (Type full legal name)",
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

/** Bold sub-label (e.g. "a. Collection and Disbursement") on its own line — returns updated y. */
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
  doc.text("PROPERTY MANAGER AGREEMENT", 105, y, { align: "center" });
  y += 11;

  // ── PREAMBLE ──
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  y = addBody(
    doc,
    `This Property Manager Agreement ("Agreement") is entered into and made effective as of ${values.effectiveDate || "[Effective Date]"}, by and between:`,
    y, pageH
  );
  y += 1;

  doc.setFont("helvetica", "bold");
  doc.text(`${values.party1Name || "[Owner Name]"},`, 20, y);
  doc.setFont("helvetica", "normal");
  y += 6;
  y = addBody(doc, `of ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""} (hereinafter the "Owner"),`, y, pageH);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("And", 105, y, { align: "center" });
  y += 7;

  doc.setFont("helvetica", "bold");
  doc.text(`${values.party2Name || "[Manager Name]"},`, 20, y);
  doc.setFont("helvetica", "normal");
  y += 6;
  y = addBody(doc, `of ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""} (hereinafter the "Manager").`, y, pageH);

  y = addBody(doc, 'The Owner and Manager may be collectively referred to as the "Parties."', y, pageH);
  y += 3;

  // ── RECITALS ──
  y = addHeading(doc, "RECITALS", y, pageH);
  y = addBody(doc, "WHEREAS, the Manager is experienced in the operation and management of real property and possesses the necessary personnel and resources to manage real estate competently;", y, pageH);
  y = addBody(doc, "WHEREAS, the Owner desires to retain the Manager to provide property management services for the real estate owned by the Owner, and the Manager agrees to provide such services on the terms set forth herein.", y, pageH);
  y = addBody(doc, "NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:", y, pageH);
  y += 3;

  // ── 1. DESCRIPTION OF THE PROPERTY ──
  y = addHeading(doc, "1. Description of the Property", y, pageH);
  y = addBody(doc, 'This Agreement applies to the management of the following property(ies) (the "Property"):', y, pageH);
  y = addBody(doc, values.propertyDescription || "[Insert Property Address(es) and Description]", y, pageH, 28);
  y += 2;

  // ── 2. RESPONSIBILITIES OF THE MANAGER ──
  y = addHeading(doc, "2. Responsibilities of the Manager", y, pageH);
  y = addBody(
    doc,
    `The Manager shall serve as an independent contractor and the Owner's exclusive agent in managing the Property beginning on ${values.startDate || "[Start Date]"}. The Manager's duties shall include, but are not limited to:`,
    y, pageH
  );
  y += 2;

  y = addSubLabel(doc, "a. Collection and Disbursement of Rents", y, pageH);
  y = addBody(
    doc,
    `The Manager shall collect all rents as they become due and provide monthly accounting statements detailing rents received and expenses paid. Net income, after deduction of authorized disbursements, shall be remitted to the Owner by mail or as otherwise directed by the Owner, on or before the ${values.remittanceDay || "[__]"} day of each month, subject to timely rent receipt from tenants.`,
    y, pageH
  );
  y += 2;

  y = addSubLabel(doc, "b. Maintenance and Labor", y, pageH);
  y = addBody(
    doc,
    "The Manager shall arrange for and oversee maintenance, repairs, and improvements to the Property, and may hire and supervise employees and contractors as required.",
    y, pageH
  );
  y += 2;

  y = addSubLabel(doc, "c. Leasing and Legal Proceedings", y, pageH);
  y = addBody(
    doc,
    "The Manager shall advertise vacancies, screen and select tenants, set market rents, negotiate leases, sign, renew, or terminate rental agreements, and pursue legal actions for rent recovery or damage to the Property. The Manager may settle or compromise claims where appropriate.",
    y, pageH
  );
  y += 2;

  // ── 3. AUTHORITY GRANTED ──
  y = addHeading(doc, "3. Authority Granted", y, pageH);
  y = addBody(
    doc,
    "The Owner grants the Manager full authority to perform all acts reasonably necessary to carry out the responsibilities described in this Agreement, as if performed by the Owner personally.",
    y, pageH
  );
  y += 2;

  // ── 4. FAIR HOUSING COMPLIANCE ──
  y = addHeading(doc, "4. Fair Housing Compliance", y, pageH);
  y = addBody(
    doc,
    "The Manager shall comply with all applicable federal, state, and local laws, including the Fair Housing Act, and shall not discriminate based on race, color, religion, sex, national origin, disability, or familial status.",
    y, pageH
  );
  y += 2;

  // ── 5. COMPENSATION ──
  y = addHeading(doc, "5. Compensation", y, pageH);
  y = addBody(
    doc,
    `The Manager shall be entitled to retain ${values.commissionPercent || "[__]"}% of monthly gross rental collections as compensation. Additional compensation for services not described in this Agreement shall be agreed upon in writing by the Parties. The Manager may deduct actual out-of-pocket expenses incurred in the course of management and must provide itemized monthly statements detailing all income and expenditures.`,
    y, pageH
  );
  y = addBody(
    doc,
    "If rent collections are insufficient to cover fees and expenses in a given month, the Owner shall remit the shortfall within fifteen (15) days of receiving written notice from the Manager.",
    y, pageH
  );
  y += 2;

  // ── 6. INDEPENDENT CONTRACTOR ──
  y = addHeading(doc, "6. Independent Contractor", y, pageH);
  y = addBody(
    doc,
    "The Manager shall perform all duties as an independent contractor and not as an employee of the Owner. The Manager shall be responsible for all taxes, benefits, and obligations as required by law.",
    y, pageH
  );
  y += 2;

  // ── 7. STANDARD OF PERFORMANCE ──
  y = addHeading(doc, "7. Standard of Performance", y, pageH);
  y = addBody(
    doc,
    "The Manager shall perform its duties with reasonable diligence and in accordance with generally accepted industry standards, providing services consistent with those of reputable property managers in the community.",
    y, pageH
  );
  y += 2;

  // ── 8. TERM AND TERMINATION ──
  y = addHeading(doc, "8. Term and Termination", y, pageH);
  y = addBody(
    doc,
    `This Agreement shall terminate automatically on ${values.endDate || "[End Date]"}, unless earlier terminated by either party with at least ${values.terminationNoticeDays || "[__]"} days written notice. Either party may terminate this Agreement without cause, provided such notice is properly given.`,
    y, pageH
  );
  y += 2;

  // ── 9. INDEMNIFICATION ──
  y = addHeading(doc, "9. Indemnification", y, pageH);
  y = addBody(
    doc,
    "The Manager shall indemnify, defend, and hold harmless the Owner from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable attorney's fees) arising from the negligent or willful acts or omissions of the Manager, its agents, employees, or representatives.",
    y, pageH
  );
  y += 2;

  // ── 10. INSURANCE ──
  y = addHeading(doc, "10. Insurance", y, pageH);
  y = addBody(
    doc,
    "The Manager shall maintain General Liability and Errors & Omissions insurance and shall provide proof of such coverage to the Owner upon request. The Owner shall include the Manager as an additional insured under the Owner's Public Liability Insurance Policy.",
    y, pageH
  );
  y += 2;

  // ── 11. DEFAULT ──
  y = addHeading(doc, "11. Default", y, pageH);
  y = addBody(doc, "The following shall constitute a material default:", y, pageH);
  y = addBullet(doc, "Failure to make required payments;", y, pageH);
  y = addBullet(doc, "Bankruptcy or insolvency of either party;", y, pageH);
  y = addBullet(doc, "Property of either party becoming subject to seizure or assignment;", y, pageH);
  y = addBullet(doc, "Failure to perform services in a timely or proper manner.", y, pageH);
  y += 2;

  // ── 12. REMEDIES FOR DEFAULT ──
  y = addHeading(doc, "12. Remedies for Default", y, pageH);
  y = addBody(
    doc,
    `If a default occurs, the non-defaulting party may terminate this Agreement upon ${values.defaultCureDays || "[__]"} days written notice, provided the default is not cured within the notice period. The notice must specify the nature of the breach with reasonable detail.`,
    y, pageH
  );
  y += 2;

  // ── 13. FORCE MAJEURE ──
  y = addHeading(doc, "13. Force Majeure", y, pageH);
  y = addBody(
    doc,
    "Neither party shall be liable for delay or failure to perform obligations due to causes beyond their reasonable control, including but not limited to acts of God, pandemics, civil unrest, war, labor strikes, or governmental orders. Affected obligations shall be suspended until performance becomes possible.",
    y, pageH
  );
  y += 2;

  // ── 14. DISPUTE RESOLUTION ──
  y = addHeading(doc, "14. Dispute Resolution", y, pageH);
  y = addBody(
    doc,
    "The Parties agree to attempt resolution of disputes through informal negotiations. If unsuccessful, the matter shall be submitted to mediation in accordance with applicable rules. If mediation fails, the Parties may pursue available legal remedies.",
    y, pageH
  );
  y += 2;

  // ── 15. CONFIDENTIALITY ──
  y = addHeading(doc, "15. Confidentiality", y, pageH);
  y = addBody(
    doc,
    "The Manager shall not disclose any confidential or proprietary information belonging to the Owner, either during the term of this Agreement or thereafter. All records and data shall be returned to the Owner upon termination.",
    y, pageH
  );
  y += 2;

  // ── 16. RETURN OF PROPERTY ──
  y = addHeading(doc, "16. Return of Property", y, pageH);
  y = addBody(
    doc,
    "Upon termination of this Agreement, the Manager shall promptly return to the Owner all materials, documentation, keys, and property relating to the management of the Property.",
    y, pageH
  );
  y += 2;

  // ── 17. NOTICES ──
  y = addHeading(doc, "17. Notices", y, pageH);
  y = addBody(
    doc,
    "All notices shall be in writing and deemed effective upon delivery by personal service, certified mail, or courier to the address of each party stated herein, or to such other address as may be designated in writing.",
    y, pageH
  );
  y += 2;

  // ── 18. ENTIRE AGREEMENT ──
  y = addHeading(doc, "18. Entire Agreement", y, pageH);
  y = addBody(
    doc,
    "This Agreement represents the entire understanding between the Parties and supersedes all prior or contemporaneous agreements. No oral representations or warranties shall be binding unless reduced to writing and signed by both Parties.",
    y, pageH
  );
  y += 2;

  // ── 19. AMENDMENT ──
  y = addHeading(doc, "19. Amendment", y, pageH);
  y = addBody(doc, "This Agreement may only be modified by a written instrument executed by both Parties.", y, pageH);
  y += 2;

  // ── 20. SEVERABILITY ──
  y = addHeading(doc, "20. Severability", y, pageH);
  y = addBody(
    doc,
    "If any provision is deemed invalid or unenforceable, the remainder of this Agreement shall remain in full force and effect.",
    y, pageH
  );
  y += 2;

  // ── 21. WAIVER ──
  y = addHeading(doc, "21. Waiver", y, pageH);
  y = addBody(
    doc,
    "The failure of either party to enforce any provision shall not be construed as a waiver of future enforcement of that provision or any other provision.",
    y, pageH
  );
  y += 2;

  // ── 22. GOVERNING LAW ──
  y = addHeading(doc, "22. Governing Law", y, pageH);
  y = addBody(
    doc,
    `This Agreement shall be governed and interpreted in accordance with the laws of the State of ${values.state || "[Insert State]"}.`,
    y, pageH
  );
  y += 2;

  // ── ADDITIONAL TERMS ──
  if (values.additionalTerms) {
    y = addHeading(doc, "Additional Terms", y, pageH);
    y = addBody(doc, values.additionalTerms, y, pageH);
    y += 2;
  }

  // ── 23. SIGNATURES ──
  if (y > pageH - 70) { doc.addPage(); y = 20; }
  y = addHeading(doc, "23. Signatures", y, pageH);
  y = addBody(doc, "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.", y, pageH);
  y += 6;

  // Owner block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("OWNER:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", 20, y);
  y += 7;
  doc.text(`Name: ${values.party1Name || ""}`, 20, y);
  y += 7;
  doc.text(`Typed Signature: ${values.party1Signature || ""}`, 20, y);
  y += 7;
  doc.text(`Date: ${values.effectiveDate || new Date().toLocaleDateString()}`, 20, y);
  y += 14;

  // Manager block
  doc.setFont("helvetica", "bold");
  doc.text("MANAGER:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", 20, y);
  y += 7;
  doc.text(`Name: ${values.party2Name || ""}`, 20, y);
  y += 7;
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

  doc.save("property_manager_agreement.pdf");
};

export default function PropertyManagerAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Property Manager Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="propertymanageragreement"
    />
  );
}