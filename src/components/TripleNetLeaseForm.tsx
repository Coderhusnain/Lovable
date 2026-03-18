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
      { name: "effectiveDate", label: "Effective date of this Lease", type: "date", required: true },
    ],
  },
  {
    label: "Landlord",
    fields: [
      { name: "party1Name",     label: "Landlord Full Legal Name",           type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party1Street",   label: "Landlord Mailing Street Address",    type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party1City",     label: "Landlord City",                      type: "text",  required: true,  placeholder: "City" },
      { name: "party1Zip",      label: "Landlord ZIP/Postal Code",           type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party1Email",    label: "Landlord Email",                     type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party1Phone",    label: "Landlord Phone",                     type: "tel",   required: false, placeholder: "(555) 123-4567" },
      { name: "paymentAddress", label: "Rent payment address (if different)", type: "text", required: false, placeholder: "Address for rent payments" },
    ],
  },
  {
    label: "Tenant",
    fields: [
      { name: "party2Name",   label: "Tenant Full Legal Name",         type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party2Street", label: "Tenant Mailing Street Address",  type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party2City",   label: "Tenant City",                    type: "text",  required: true,  placeholder: "City" },
      { name: "party2Zip",    label: "Tenant ZIP/Postal Code",         type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party2Email",  label: "Tenant Email",                   type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone",  label: "Tenant Phone",                   type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Premises & Term",
    fields: [
      { name: "propAddress", label: "Full property address of the Premises", type: "text", required: true, placeholder: "123 Commerce Blvd, City, State ZIP" },
      { name: "leaseStart",  label: "Lease start date",                      type: "date", required: true },
      { name: "leaseEnd",    label: "Lease end date",                        type: "date", required: true },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "monthlyRent",     label: "Monthly base rent amount",      type: "text", required: true,  placeholder: "$0.00" },
      { name: "securityDeposit", label: "Security deposit amount",       type: "text", required: true,  placeholder: "$0.00" },
      { name: "casualtyInsurance", label: "Casualty insurance minimum", type: "text", required: true,  placeholder: "$0.00" },
      { name: "liabilityInsurance",label: "Liability insurance combined single limit", type: "text", required: true, placeholder: "$1,000,000.00" },
    ],
  },
  {
    label: "Termination",
    fields: [
      { name: "landlordSaleDays",    label: "Days notice — Landlord terminates upon sale", type: "text", required: true, placeholder: "e.g. 60" },
      { name: "tenantTermDays",      label: "Days notice — Tenant early termination",      type: "text", required: true, placeholder: "e.g. 60" },
      { name: "tenantTermMonths",    label: "Months rent due as early termination fee",    type: "text", required: true, placeholder: "e.g. 3" },
      { name: "defaultCureDays",     label: "Days to cure a default after notice",         type: "text", required: true, placeholder: "e.g. 10" },
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
      { name: "party1Signature", label: "Landlord Signature (type full legal name)", type: "text", required: true,  placeholder: "Type your full legal name" },
      { name: "party2Signature", label: "Tenant Signature (type full legal name)",   type: "text", required: true,  placeholder: "Type your full legal name" },
      { name: "witnessName",     label: "Witness Name (Optional)",                   type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ── helpers ──────────────────────────────────────────────────────────────────

function boldHeading(doc: jsPDF, text: string, x: number, y: number): void {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(text, x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
}

function wrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function bulletItem(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  doc.text("\u2022", x, y);
  const lines = doc.splitTextToSize(text, maxWidth - 6);
  doc.text(lines, x + 6, y);
  return y + lines.length * lineHeight;
}

function checkPageBreak(doc: jsPDF, y: number, needed = 20): number {
  if (y + needed > 275) { doc.addPage(); return 20; }
  return y;
}

function sectionHead(doc: jsPDF, num: number, title: string, x: number, y: number): number {
  y = checkPageBreak(doc, y);
  boldHeading(doc, `${num}.  ${title}`, x, y);
  return y + 6.5;
}

// ── PDF generator ─────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const LM = 20;
  const PW = 170;
  const LH = 5.5;
  let y = 22;

  // ── TITLE ─────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("TRIPLE NET LEASE AGREEMENT", 105, y, { align: "center" });
  const titleW = doc.getTextWidth("TRIPLE NET LEASE AGREEMENT");
  doc.setLineWidth(0.4);
  doc.line(105 - titleW / 2, y + 1.2, 105 + titleW / 2, y + 1.2);
  y += 12;

  // ── PREAMBLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  y = wrappedText(
    doc,
    `This Triple Net Lease Agreement ("Agreement" or "Lease") is made and entered into as of ` +
    `${values.effectiveDate || "[Insert Date]"}, by and between:`,
    LM, y, PW, LH
  );
  y += 4;

  const landlordAddr = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ") || "[Insert Landlord's Address]";
  doc.setFont("helvetica", "bold");
  doc.text(`${values.party1Name || "[Insert Landlord's Full Legal Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(`, whose mailing address is ${landlordAddr} (the "Landlord"),`,
    LM + doc.getTextWidth(`${values.party1Name || "[Insert Landlord's Full Legal Name]"}`), y);
  y += LH + 2;

  doc.text("And", LM, y);
  y += LH + 2;

  const tenantAddr = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ") || "[Insert Tenant's Address]";
  doc.setFont("helvetica", "bold");
  doc.text(`${values.party2Name || "[Insert Tenant's Full Legal Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(`, whose mailing address is ${tenantAddr} (the "Tenant").`,
    LM + doc.getTextWidth(`${values.party2Name || "[Insert Tenant's Full Legal Name]"}`), y);
  y += LH + 3;

  y = wrappedText(
    doc,
    `The Landlord and the Tenant may collectively be referred to as the "Parties" and individually as a "Party."`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 1. PREMISES ───────────────────────────────────────────────────────────
  y = sectionHead(doc, 1, "PREMISES", LM, y);
  y = wrappedText(
    doc,
    `The Landlord hereby leases to the Tenant, and the Tenant hereby leases from the Landlord, the real ` +
    `property, building, and improvements located at ${values.propAddress || "[Insert Full Property Address]"} ` +
    `(the "Premises"), subject to the terms and conditions set forth herein.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 2. TERM ───────────────────────────────────────────────────────────────
  y = sectionHead(doc, 2, "TERM", LM, y);
  const termBullets = [
    `The term of this Lease shall commence on ${values.leaseStart || "[Insert Start Date]"} and shall continue through ${values.leaseEnd || "[Insert End Date]"} (the "Term"), unless sooner terminated pursuant to the provisions herein.`,
    `Either Party may terminate this Lease by providing at least thirty (30) days' prior written notice, which must coincide with the end of a calendar month.`,
  ];
  for (const b of termBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 3. TRIPLE NET LEASE ───────────────────────────────────────────────────
  y = sectionHead(doc, 3, "TRIPLE NET LEASE", LM, y);
  y = wrappedText(
    doc,
    `This Lease is a Triple Net Lease, meaning the Tenant shall be solely responsible for all expenses associated with the Premises, including but not limited to:`,
    LM, y, PW, LH
  );
  y += 3;

  const netItems = [
    "Real estate taxes",
    "Property insurance",
    "Repairs and maintenance",
    "Utilities",
    "Common area maintenance (CAM)",
    "Any other costs associated with the operation, use, or occupancy of the Premises",
  ];
  for (const item of netItems) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, item, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 3;
  y = wrappedText(
    doc,
    `It is the intention of the Parties that the Landlord shall have no obligation to incur any expenses related to the Premises during the Term of this Lease.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 4. RENT ───────────────────────────────────────────────────────────────
  y = sectionHead(doc, 4, "RENT", LM, y);
  const rentAddr = values.paymentAddress ||
    [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ") ||
    "[Insert Payment Address]";
  const rentBullets = [
    `Tenant agrees to pay to Landlord monthly base rent of ${values.monthlyRent || "$0.00"}, payable in advance on or before the first (1st) day of each calendar month.`,
    `Rent shall be payable at ${rentAddr}, or at such other address as the Landlord may designate in writing.`,
  ];
  for (const b of rentBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 5. ADDITIONAL CHARGES (ESTIMATED PAYMENTS) ────────────────────────────
  y = sectionHead(doc, 5, "ADDITIONAL CHARGES (ESTIMATED PAYMENTS)", LM, y);
  y = wrappedText(
    doc,
    `In addition to base rent, the Tenant shall pay estimated monthly charges for:`,
    LM, y, PW, LH
  );
  y += 2;
  const addCharges = [
    "Real estate taxes",
    "Insurance premiums",
    "Maintenance costs (including landscaping, parking lot repairs, etc.)",
  ];
  for (const item of addCharges) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, item, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 3;
  y = wrappedText(
    doc,
    `These estimated amounts will be determined and updated by the Landlord from time to time and billed monthly with the rent. Actual expenses shall be reconciled quarterly, and any overpayment or underpayment shall be refunded or invoiced accordingly.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 6. SECURITY DEPOSIT ───────────────────────────────────────────────────
  y = sectionHead(doc, 6, "SECURITY DEPOSIT", LM, y);
  const depBullets = [
    `Upon execution of this Lease, the Tenant shall deposit with the Landlord the sum of ${values.securityDeposit || "$0.00"} as a Security Deposit, to be held by the Landlord as security for the faithful performance of all terms and obligations of this Lease.`,
    `The Security Deposit shall be returned to the Tenant at the expiration of the Lease, less any lawful deductions.`,
  ];
  for (const b of depBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 7. POSSESSION AND CONDITION ───────────────────────────────────────────
  y = sectionHead(doc, 7, "POSSESSION AND CONDITION", LM, y);
  const possBullets = [
    `Tenant shall take possession of the Premises on the commencement date.`,
    `Upon expiration or earlier termination of this Lease, the Tenant shall vacate and surrender the Premises in good order, condition, and repair, broom-cleaned and free of all personal property and debris, reasonable wear and tear excepted.`,
  ];
  for (const b of possBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 8. ALTERATIONS AND IMPROVEMENTS ──────────────────────────────────────
  y = sectionHead(doc, 8, "ALTERATIONS AND IMPROVEMENTS", LM, y);
  const altBullets = [
    `Tenant shall not make any alterations, additions, or improvements to the Premises without the prior written consent of the Landlord, which shall not be unreasonably withheld.`,
    `All such work shall comply with all applicable laws and shall be conducted at the Tenant's sole cost and expense.`,
  ];
  for (const b of altBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 9. INSURANCE ──────────────────────────────────────────────────────────
  y = sectionHead(doc, 9, "INSURANCE", LM, y);
  y = wrappedText(doc, `Tenant shall, at its own expense, maintain:`, LM, y, PW, LH);
  y += 2;
  const insBullets = [
    `Casualty insurance covering the Premises in an amount not less than ${values.casualtyInsurance || "$0.00"}.`,
    `General liability insurance with a combined single limit of at least ${values.liabilityInsurance || "$0.00"}.`,
    `Landlord shall be named as an additional insured on all such policies.`,
    `Tenant shall deliver certificates of insurance to the Landlord as proof of coverage and shall ensure that Landlord receives at least thirty (30) days' notice prior to any cancellation or material change in coverage.`,
  ];
  for (const b of insBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 10. MAINTENANCE AND UTILITIES ─────────────────────────────────────────
  y = sectionHead(doc, 10, "MAINTENANCE AND UTILITIES", LM, y);
  const maintBullets = [
    `Tenant shall, at its sole expense, keep and maintain the Premises (including all structural components, systems, and exterior areas) in good order and repair throughout the Term.`,
    `Tenant shall be responsible for and shall pay all charges for water, sewer, electricity, gas, telephone, trash collection, and any other utilities or services used or consumed at the Premises.`,
  ];
  for (const b of maintBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 11. TAXES ─────────────────────────────────────────────────────────────
  y = sectionHead(doc, 11, "TAXES", LM, y);
  const taxBullets = [
    `Tenant shall pay all real property taxes and personal property taxes levied against the Premises or arising from its use thereof.`,
    `Tenant may contest any such taxes, at its own expense, provided such contest does not subject the Premises to lien or forfeiture.`,
  ];
  for (const b of taxBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 12. TERMINATION ───────────────────────────────────────────────────────
  y = sectionHead(doc, 12, "TERMINATION", LM, y);
  const termBulletsArr = [
    `Landlord Termination on Sale: Landlord may terminate this Lease upon ${values.landlordSaleDays || "[Insert Days]"} days' written notice in the event of sale of the Premises.`,
    `Tenant Termination: Tenant may terminate the Lease by providing ${values.tenantTermDays || "[Insert Days]"} days' prior written notice and paying a termination fee equal to ${values.tenantTermMonths || "[Insert Number]"} months' rent.`,
  ];
  for (const b of termBulletsArr) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 13. CASUALTY OR CONDEMNATION ──────────────────────────────────────────
  y = sectionHead(doc, 13, "CASUALTY OR CONDEMNATION", LM, y);
  const casualtyBullets = [
    `If the Premises are partially or totally damaged by fire or other casualty such that Tenant's use is materially impaired and the damage cannot be repaired within sixty (60) days, either Party may terminate the Lease upon twenty (20) days' written notice.`,
    `Any rent paid in advance shall be prorated and refunded accordingly.`,
  ];
  for (const b of casualtyBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 14. DEFAULT AND REMEDIES ──────────────────────────────────────────────
  y = sectionHead(doc, 14, "DEFAULT AND REMEDIES", LM, y);
  const defaultBullets = [
    `Tenant shall be in default if it fails to perform any obligation under this Lease and does not cure such failure within ${values.defaultCureDays || "[Insert Days]"} days of written notice.`,
    `Upon default, Landlord may terminate this Lease and take possession of the Premises, and pursue all legal and equitable remedies.`,
  ];
  for (const b of defaultBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 15. INDEMNIFICATION ───────────────────────────────────────────────────
  y = sectionHead(doc, 15, "INDEMNIFICATION", LM, y);
  y = wrappedText(
    doc,
    `Tenant shall indemnify, defend, and hold harmless the Landlord from any claims, damages, or liabilities arising from Tenant's occupancy, use, or maintenance of the Premises, except those caused by the Landlord's willful misconduct or negligence.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 16. HAZARDOUS MATERIALS ───────────────────────────────────────────────
  y = sectionHead(doc, 16, "HAZARDOUS MATERIALS", LM, y);
  const hazBullets = [
    `Tenant shall not bring or store any hazardous materials on the Premises except those reasonably required for its business and in full compliance with all applicable environmental laws.`,
    `Tenant shall promptly remediate any spills or releases caused by it or its agents and indemnify Landlord for related liabilities.`,
  ];
  for (const b of hazBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 17. DISPUTE RESOLUTION ────────────────────────────────────────────────
  y = sectionHead(doc, 17, "DISPUTE RESOLUTION", LM, y);
  const dispBullets = [
    `The Parties agree to first attempt to resolve any dispute arising from this Lease through good faith negotiations.`,
    `If resolution is not reached, the Parties agree to submit the dispute to mediation.`,
    `If mediation fails, either Party may pursue legal remedies available under applicable law.`,
  ];
  for (const b of dispBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 18. ASSIGNMENT AND SUBLETTING ─────────────────────────────────────────
  y = sectionHead(doc, 18, "ASSIGNMENT AND SUBLETTING", LM, y);
  y = wrappedText(
    doc,
    `Tenant shall not assign this Lease or sublease the Premises without the prior written consent of the Landlord, which shall not be unreasonably withheld.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 19. NOTICES ───────────────────────────────────────────────────────────
  y = sectionHead(doc, 19, "NOTICES", LM, y);
  y = wrappedText(
    doc,
    `All notices shall be in writing and shall be delivered personally or sent via certified mail, return receipt requested, to the addresses listed below, or such other addresses as either Party may designate:`,
    LM, y, PW, LH
  );
  y += 3;
  y = bulletItem(doc, `Landlord: ${values.party1Name || "[Insert Landlord Name]"}, ${landlordAddr}`, LM + 2, y, PW - 2, LH);
  y += 2;
  y = bulletItem(doc, `Tenant: ${values.party2Name || "[Insert Tenant Name]"}, ${tenantAddr}`, LM + 2, y, PW - 2, LH);
  y += 7;

  // ── 20. GOVERNING LAW ─────────────────────────────────────────────────────
  y = sectionHead(doc, 20, "GOVERNING LAW", LM, y);
  y = wrappedText(
    doc,
    `This Lease shall be governed by and construed in accordance with the laws of the State of ${values.state || "[Insert State]"}.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 21. ENTIRE AGREEMENT ──────────────────────────────────────────────────
  y = sectionHead(doc, 21, "ENTIRE AGREEMENT", LM, y);
  y = wrappedText(
    doc,
    `This Lease constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior agreements or understandings, oral or written.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 22. AMENDMENT ─────────────────────────────────────────────────────────
  y = sectionHead(doc, 22, "AMENDMENT", LM, y);
  y = wrappedText(
    doc,
    `This Lease may only be amended in writing, signed by both Parties.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 23. SEVERABILITY ──────────────────────────────────────────────────────
  y = sectionHead(doc, 23, "SEVERABILITY", LM, y);
  y = wrappedText(
    doc,
    `If any provision of this Lease is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 24. WAIVER ────────────────────────────────────────────────────────────
  y = sectionHead(doc, 24, "WAIVER", LM, y);
  y = wrappedText(
    doc,
    `No waiver of any term or condition of this Lease shall be deemed to be a continuing waiver or a waiver of any other term or condition.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 25. BINDING EFFECT ────────────────────────────────────────────────────
  y = sectionHead(doc, 25, "BINDING EFFECT", LM, y);
  y = wrappedText(
    doc,
    `This Lease shall be binding upon and shall inure to the benefit of the Parties and their respective successors, legal representatives, and permitted assigns.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── ADDITIONAL TERMS ──────────────────────────────────────────────────────
  if (values.additionalTerms) {
    y = checkPageBreak(doc, y);
    boldHeading(doc, "ADDITIONAL TERMS", LM, y);
    y += LH + 2;
    y = wrappedText(doc, values.additionalTerms, LM, y, PW, LH);
    y += 7;
  }

  // ── SIGNATURES ────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y, 55);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  y = wrappedText(
    doc,
    `IN WITNESS WHEREOF, the Parties have executed this Lease as of the date first above written.`,
    LM, y, PW, LH
  );
  doc.setFont("helvetica", "normal");
  y += 8;

  const col1 = LM;
  const col2 = 110;

  doc.setFont("helvetica", "bold");
  doc.text("LANDLORD:", col1, y);
  doc.text("TENANT:", col2, y);
  doc.setFont("helvetica", "normal");
  y += 7;

  doc.text("Name:", col1, y);
  doc.text(values.party1Name || "", col1 + 14, y);
  doc.text("Name:", col2, y);
  doc.text(values.party2Name || "", col2 + 14, y);
  y += 7;

  doc.text("Signature:", col1, y);
  doc.line(col1 + 22, y + 1, col1 + 78, y + 1);
  doc.text("Signature:", col2, y);
  doc.line(col2 + 22, y + 1, col2 + 78, y + 1);
  y += 2;
  doc.setFontSize(9);
  doc.text(values.party1Signature || "", col1 + 22, y);
  doc.text(values.party2Signature || "", col2 + 22, y);
  doc.setFontSize(10);
  y += 8;

  doc.text("Date:", col1, y);
  doc.line(col1 + 14, y + 1, col1 + 78, y + 1);
  doc.text("Date:", col2, y);
  doc.line(col2 + 14, y + 1, col2 + 78, y + 1);
  y += 12;

  if (values.witnessName) {
    y = checkPageBreak(doc, y, 22);
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS:", col1, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text("Name: " + values.witnessName, col1, y);
    y += 6;
    doc.text("Signature:", col1, y);
    doc.line(col1 + 22, y + 1, col1 + 78, y + 1);
  }

  doc.save("triple_net_lease_agreement.pdf");
};

export default function TripleNetLease() {
  return (
    <FormWizard
      steps={steps}
      title="Triple Net Lease Agreement"
      subtitle="Complete each step to generate your Triple Net Lease Agreement"
      onGenerate={generatePDF}
      documentType="triplenetlease"
    />
  );
}