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
      { name: "effectiveDate", label: "Effective date of this Agreement", type: "date", required: true },
    ],
  },
  {
    label: "Landlord",
    fields: [
      { name: "party1Name",     label: "Landlord Full Legal Name",          type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party1Street",   label: "Landlord Street Address",           type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party1City",     label: "Landlord City",                     type: "text",  required: true,  placeholder: "City" },
      { name: "party1Zip",      label: "Landlord ZIP/Postal Code",          type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party1Email",    label: "Landlord Email",                    type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party1Phone",    label: "Landlord Phone",                    type: "tel",   required: false, placeholder: "(555) 123-4567" },
      { name: "paymentAddress", label: "Rent payment address (if different)", type: "text", required: false, placeholder: "Address for rent payments" },
    ],
  },
  {
    label: "Tenant",
    fields: [
      { name: "party2Name",   label: "Tenant Full Legal Name",  type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party2Street", label: "Tenant Street Address",   type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party2City",   label: "Tenant City",             type: "text",  required: true,  placeholder: "City" },
      { name: "party2Zip",    label: "Tenant ZIP/Postal Code",  type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party2Email",  label: "Tenant Email",            type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone",  label: "Tenant Phone",            type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Warehouse Premises",
    fields: [
      { name: "legalDescription", label: "Legal description of the Premises",     type: "textarea", required: true,  placeholder: "Insert legal description" },
      { name: "propAddress",      label: "Premises full address",                 type: "text",     required: true,  placeholder: "123 Warehouse Blvd, City, State ZIP" },
      { name: "tenantObligations",label: "Tenant maintenance obligations (e.g. HVAC, lighting)", type: "text", required: false, placeholder: "e.g. HVAC, lighting fixtures" },
    ],
  },
  {
    label: "Lease Term & Rent",
    fields: [
      { name: "leaseStart",      label: "Lease start date",             type: "date", required: true },
      { name: "leaseEnd",        label: "Lease end date",               type: "date", required: true },
      { name: "monthlyRent",     label: "Monthly rent amount",          type: "text", required: true, placeholder: "$0.00" },
      { name: "securityDeposit", label: "Security deposit amount",      type: "text", required: true, placeholder: "$0.00" },
    ],
  },
  {
    label: "Default & Late Fees",
    fields: [
      { name: "financialCureDays", label: "Days to cure a financial default",  type: "text", required: true, placeholder: "e.g. 5" },
      { name: "otherCureDays",     label: "Days to cure any other breach",     type: "text", required: true, placeholder: "e.g. 10" },
      { name: "lateFeeDays",       label: "Days after due date before late fee", type: "text", required: true, placeholder: "e.g. 5" },
      { name: "lateFee",           label: "Late fee amount",                   type: "text", required: true, placeholder: "$0.00" },
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
  doc.text("WAREHOUSE LEASE AGREEMENT", 105, y, { align: "center" });
  const titleW = doc.getTextWidth("WAREHOUSE LEASE AGREEMENT");
  doc.setLineWidth(0.4);
  doc.line(105 - titleW / 2, y + 1.2, 105 + titleW / 2, y + 1.2);
  y += 12;

  // ── PREAMBLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  y = wrappedText(
    doc,
    `This Warehouse Lease Agreement ("Agreement") is entered into on ` +
    `${values.effectiveDate || "[Insert Date]"}, by and between:`,
    LM, y, PW, LH
  );
  y += 4;

  const landlordAddr = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ") || "[Insert Landlord's Address]";
  doc.setFont("helvetica", "bold");
  doc.text(`${values.party1Name || "[Insert Landlord's Full Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(`, ${landlordAddr} ("Landlord"),`,
    LM + doc.getTextWidth(`${values.party1Name || "[Insert Landlord's Full Name]"}`), y);
  y += LH + 2;

  doc.text("And", LM, y);
  y += LH + 2;

  const tenantAddr = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ") || "[Insert Tenant's Address]";
  doc.setFont("helvetica", "bold");
  doc.text(`${values.party2Name || "[Insert Tenant's Full Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(`, ${tenantAddr} ("Tenant").`,
    LM + doc.getTextWidth(`${values.party2Name || "[Insert Tenant's Full Name]"}`), y);
  y += LH + 3;

  y = wrappedText(
    doc,
    `Collectively, the Landlord and Tenant shall be referred to as the "Parties."`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 1. LEASED PREMISES ────────────────────────────────────────────────────
  y = sectionHead(doc, 1, "LEASED PREMISES", LM, y);
  y = wrappedText(
    doc,
    `Landlord hereby leases to Tenant the property described as ` +
    `${values.legalDescription || "[Insert Legal Description]"}, located at ` +
    `${values.propAddress || "[Insert Address, City, State, ZIP Code]"} (the "Leased Premises" or ` +
    `"Premises"), for the term and under the terms set forth in this Agreement.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 2. LEASE TERM ─────────────────────────────────────────────────────────
  y = sectionHead(doc, 2, "LEASE TERM", LM, y);
  const termBullets = [
    `The term of this Lease shall commence on ${values.leaseStart || "[Insert Start Date]"} and shall expire on ${values.leaseEnd || "[Insert End Date]"}.`,
    `The Lease may be terminated earlier in accordance with this Agreement.`,
  ];
  for (const b of termBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 3. RENTAL PAYMENTS ────────────────────────────────────────────────────
  y = sectionHead(doc, 3, "RENTAL PAYMENTS", LM, y);
  const rentAddr = values.paymentAddress ||
    [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ") ||
    "[Insert Payment Address]";
  const rentBullets = [
    `Tenant agrees to pay to Landlord a monthly rent of ${values.monthlyRent || "$0.00"}, payable in advance on or before the first day of each calendar month.`,
    `Payments shall be made to Landlord at ${rentAddr}, or such other address as the Landlord may later designate in writing.`,
  ];
  for (const b of rentBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 4. SECURITY DEPOSIT ───────────────────────────────────────────────────
  y = sectionHead(doc, 4, "SECURITY DEPOSIT", LM, y);
  y = wrappedText(
    doc,
    `Upon execution of this Lease, Tenant shall pay to Landlord a security deposit of ` +
    `${values.securityDeposit || "$0.00"}, to be held in trust by Landlord as security for Tenant's ` +
    `performance of all obligations under this Lease and for the cost of remedying any damages caused ` +
    `to the Premises, beyond reasonable wear and tear.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 5. POSSESSION AND SURRENDER ───────────────────────────────────────────
  y = sectionHead(doc, 5, "POSSESSION AND SURRENDER", LM, y);
  const possBullets = [
    `Tenant shall be entitled to possession of the Premises on the Lease commencement date and shall surrender possession at the expiration or earlier termination of the Lease.`,
    `Tenant agrees to return the Premises in good condition, ordinary wear and tear excepted.`,
  ];
  for (const b of possBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 6. PERMITTED USE ──────────────────────────────────────────────────────
  y = sectionHead(doc, 6, "PERMITTED USE", LM, y);
  const useBullets = [
    `Tenant may use the Premises solely for warehousing, distribution, light industrial activities, and other lawful uses incidental thereto.`,
    `Any additional uses require Landlord's prior written approval, which shall not be unreasonably withheld.`,
  ];
  for (const b of useBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 7. CONDITION OF PREMISES ──────────────────────────────────────────────
  y = sectionHead(doc, 7, "CONDITION OF PREMISES", LM, y);
  const condBullets = [
    `Tenant acknowledges that it has inspected the Premises or had the opportunity to do so and accepts the Premises in its present "as-is" condition.`,
    `If the condition of the Premises deteriorates during the Lease term in a manner that materially impairs its use or value, Tenant shall promptly notify Landlord in writing.`,
  ];
  for (const b of condBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 8. INSURANCE OBLIGATIONS ──────────────────────────────────────────────
  y = sectionHead(doc, 8, "INSURANCE OBLIGATIONS", LM, y);
  const insBullets = [
    `Each party shall maintain insurance appropriate to its interest in the Premises and any personal property located therein.`,
    `Tenant shall not permit any use that would invalidate such coverage.`,
    `Proof of insurance shall be provided to the other party upon request.`,
  ];
  for (const b of insBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 9. MAINTENANCE AND REPAIRS ────────────────────────────────────────────
  y = sectionHead(doc, 9, "MAINTENANCE AND REPAIRS", LM, y);
  const maintBullets = [
    `Landlord shall maintain the Premises in a condition suitable for occupancy, including structural elements, roof, and common areas.`,
    `Tenant shall be responsible for maintaining and repairing any damage caused by its operations or personnel.`,
    values.tenantObligations
      ? `Tenant shall also be specifically responsible for: ${values.tenantObligations}.`
      : `Tenant shall also be responsible for any other obligations specified in writing by the Landlord.`,
  ];
  for (const b of maintBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 10. UTILITIES AND SERVICES ────────────────────────────────────────────
  y = sectionHead(doc, 10, "UTILITIES AND SERVICES", LM, y);
  const utilBullets = [
    `Landlord shall be responsible for the cost of all utilities and services unless otherwise specified in writing.`,
    `Tenant shall not cause unreasonable usage or burden on such services.`,
  ];
  for (const b of utilBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 11. REAL ESTATE TAXES ─────────────────────────────────────────────────
  y = sectionHead(doc, 11, "REAL ESTATE TAXES", LM, y);
  y = wrappedText(
    doc,
    `Landlord shall be solely responsible for the payment of all real estate taxes, assessments, and charges levied against the Premises.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 12. TERMINATION DUE TO SALE ───────────────────────────────────────────
  y = sectionHead(doc, 12, "TERMINATION DUE TO SALE", LM, y);
  y = wrappedText(
    doc,
    `Landlord may terminate this Lease by providing sixty (60) days' written notice in the event the Premises are sold to a third party.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 13. CASUALTY OR CONDEMNATION ──────────────────────────────────────────
  y = sectionHead(doc, 13, "CASUALTY OR CONDEMNATION", LM, y);
  const casualtyBullets = [
    `If the Premises are damaged or destroyed, Landlord may elect to repair the damage or terminate this Lease upon thirty (30) days' written notice.`,
    `In the case of condemnation or if repair is not feasible, either party may terminate this Lease by providing twenty (20) days' written notice.`,
  ];
  for (const b of casualtyBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 14. TENANT DEFAULT ────────────────────────────────────────────────────
  y = sectionHead(doc, 14, "TENANT DEFAULT", LM, y);
  const defaultBullets = [
    `Tenant shall be in default if it fails to comply with any material term of this Lease.`,
    `Tenant shall have ${values.financialCureDays || "[Insert Number]"} days to cure a financial default after receipt of written notice.`,
    `Tenant shall have ${values.otherCureDays || "[Insert Number]"} days to cure any other breach after receipt of written notice.`,
    `If the default is not cured, Landlord may pursue legal remedies, including recovery of costs and attorney's fees.`,
  ];
  for (const b of defaultBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 15. LATE PAYMENTS ─────────────────────────────────────────────────────
  y = sectionHead(doc, 15, "LATE PAYMENTS", LM, y);
  y = wrappedText(
    doc,
    `For any rental payment not received within ${values.lateFeeDays || "[Insert Number]"} days of the due date, Tenant shall pay a late fee of ${values.lateFee || "$0.00"}.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 16. HOLDOVER ──────────────────────────────────────────────────────────
  y = sectionHead(doc, 16, "HOLDOVER", LM, y);
  const holdBullets = [
    `If Tenant remains in possession after Lease termination without written consent, Tenant shall pay rent at 150% of the prior monthly rent.`,
    `Such occupancy shall automatically convert to a month-to-month tenancy at that rate.`,
  ];
  for (const b of holdBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 17. RETURNED PAYMENTS ─────────────────────────────────────────────────
  y = sectionHead(doc, 17, "RETURNED PAYMENTS", LM, y);
  y = wrappedText(
    doc,
    `Tenant shall be charged the maximum amount permitted by law for any payment returned due to insufficient funds.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 18. IMPROVEMENTS AND ALTERATIONS ─────────────────────────────────────
  y = sectionHead(doc, 18, "IMPROVEMENTS AND ALTERATIONS", LM, y);
  const altBullets = [
    `Tenant shall not undertake any alterations, construction, or remodeling without prior written approval of Landlord, which shall not be unreasonably withheld.`,
    `Any improvements shall be at Tenant's expense.`,
    `Upon termination, Tenant shall remove any such improvements if requested by Landlord and restore the Premises to its prior condition.`,
  ];
  for (const b of altBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 19. ACCESS BY LANDLORD ────────────────────────────────────────────────
  y = sectionHead(doc, 19, "ACCESS BY LANDLORD", LM, y);
  const accessBullets = [
    `Landlord may enter the Premises upon reasonable notice and during business hours for inspections, maintenance, or to show the property.`,
    `In case of emergency, Landlord may enter without prior notice.`,
    `During the final 90 days of the Lease, Landlord may display "For Lease" signs and show the Premises to prospective tenants.`,
  ];
  for (const b of accessBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 20. PROHIBITED ITEMS AND HAZARDOUS MATERIALS ──────────────────────────
  y = sectionHead(doc, 20, "PROHIBITED ITEMS AND HAZARDOUS MATERIALS", LM, y);
  y = wrappedText(
    doc,
    `Tenant shall not keep flammable, hazardous, or explosive materials on the Premises without Landlord's prior written consent and proof of adequate insurance.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 21. MECHANICS' LIENS ──────────────────────────────────────────────────
  y = sectionHead(doc, 21, "MECHANICS' LIENS", LM, y);
  const lienBullets = [
    `Tenant shall not permit any liens to be filed against the Premises arising from any work performed or materials provided at Tenant's request.`,
    `Tenant shall promptly discharge any lien filed against the Premises.`,
  ];
  for (const b of lienBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 22. SUBORDINATION ─────────────────────────────────────────────────────
  y = sectionHead(doc, 22, "SUBORDINATION", LM, y);
  y = wrappedText(
    doc,
    `This Lease is and shall be subordinate to any current or future mortgage placed on the Premises by Landlord.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 23. ASSIGNMENT AND SUBLETTING ─────────────────────────────────────────
  y = sectionHead(doc, 23, "ASSIGNMENT AND SUBLETTING", LM, y);
  const assignBullets = [
    `Tenant shall not assign this Lease, sublet the Premises, or allow third-party use without Landlord's prior written consent.`,
    `Unauthorized transfers shall be voidable at Landlord's option.`,
  ];
  for (const b of assignBullets) { y = checkPageBreak(doc, y); y = bulletItem(doc, b, LM + 2, y, PW - 2, LH); y += 2; }
  y += 5;

  // ── 24. NOTICE ────────────────────────────────────────────────────────────
  y = sectionHead(doc, 24, "NOTICE", LM, y);
  y = wrappedText(
    doc,
    `All notices required under this Lease shall be in writing and delivered via personal service or certified mail to the addresses stated below, or any updated address provided in writing:`,
    LM, y, PW, LH
  );
  y += 3;
  y = bulletItem(doc, `Landlord: ${values.party1Name || "[Insert Name]"}, ${landlordAddr}`, LM + 2, y, PW - 2, LH);
  y += 2;
  y = bulletItem(doc, `Tenant: ${values.party2Name || "[Insert Name]"}, ${tenantAddr}`, LM + 2, y, PW - 2, LH);
  y += 2;
  y = bulletItem(doc, `Notices shall be deemed received three (3) business days after mailing.`, LM + 2, y, PW - 2, LH);
  y += 7;

  // ── 25. GOVERNING LAW ─────────────────────────────────────────────────────
  y = sectionHead(doc, 25, "GOVERNING LAW", LM, y);
  y = wrappedText(
    doc,
    `This Lease shall be governed by and construed in accordance with the laws of the State of ${values.state || "[Insert State]"}.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 26. ENTIRE AGREEMENT ──────────────────────────────────────────────────
  y = sectionHead(doc, 26, "ENTIRE AGREEMENT", LM, y);
  y = wrappedText(
    doc,
    `This document constitutes the entire agreement between the Parties with respect to the subject matter hereof. No oral statements or prior writings shall be binding unless incorporated herein.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 27. AMENDMENTS ────────────────────────────────────────────────────────
  y = sectionHead(doc, 27, "AMENDMENTS", LM, y);
  y = wrappedText(
    doc,
    `Any amendments to this Lease must be in writing and signed by both Parties.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 28. SEVERABILITY ──────────────────────────────────────────────────────
  y = sectionHead(doc, 28, "SEVERABILITY", LM, y);
  y = wrappedText(
    doc,
    `If any provision of this Lease is found invalid or unenforceable, the remainder shall remain in full force and effect. If such invalidity can be cured by limiting the clause, it shall be construed accordingly.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 29. WAIVER ────────────────────────────────────────────────────────────
  y = sectionHead(doc, 29, "WAIVER", LM, y);
  y = wrappedText(
    doc,
    `Failure by either Party to enforce any provision shall not constitute a waiver of such provision or the right to enforce it in the future.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 30. BINDING EFFECT ────────────────────────────────────────────────────
  y = sectionHead(doc, 30, "BINDING EFFECT", LM, y);
  y = wrappedText(
    doc,
    `This Lease shall be binding upon and inure to the benefit of the Parties and their respective heirs, successors, and permitted assigns.`,
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
    `IN WITNESS WHEREOF, the Parties have executed this Warehouse Lease Agreement as of the date first above written.`,
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

  doc.save("warehouse_lease_agreement.pdf");
};

export default function WarehouseLease() {
  return (
    <FormWizard
      steps={steps}
      title="Warehouse Lease Agreement"
      subtitle="Complete each step to generate your Warehouse Lease Agreement"
      onGenerate={generatePDF}
      documentType="warehouselease"
    />
  );
}