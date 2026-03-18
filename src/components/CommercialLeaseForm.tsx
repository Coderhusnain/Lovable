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
      { name: "party1Name",        label: "Landlord Full Legal Name",          type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party1Street",      label: "Landlord Street Address",           type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party1City",        label: "Landlord City",                     type: "text",  required: true,  placeholder: "City" },
      { name: "party1Zip",         label: "Landlord ZIP Code",                 type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party1Email",       label: "Landlord Email",                    type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party1Phone",       label: "Landlord Phone",                    type: "tel",   required: false, placeholder: "(555) 123-4567" },
      { name: "paymentAddress",    label: "Landlord Payment Address (if different)", type: "text", required: false, placeholder: "Address for rent payments" },
    ],
  },
  {
    label: "Tenant",
    fields: [
      { name: "party2Name",   label: "Tenant Full Legal Name",  type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party2Street", label: "Tenant Street Address",   type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party2City",   label: "Tenant City",             type: "text",  required: true,  placeholder: "City" },
      { name: "party2Zip",    label: "Tenant ZIP Code",         type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party2Email",  label: "Tenant Email",            type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone",  label: "Tenant Phone",            type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Premises",
    fields: [
      { name: "propAddress", label: "Full premises address (including unit)", type: "text", required: true, placeholder: "123 Commerce Blvd, Suite 200, City, State ZIP" },
    ],
  },
  {
    label: "Term & Rent",
    fields: [
      { name: "leaseStart",    label: "Lease start date",                      type: "date", required: true },
      { name: "leaseEnd",      label: "Lease end date",                        type: "date", required: true },
      { name: "monthlyRent",   label: "Monthly rent amount",                   type: "text", required: true,  placeholder: "$0.00" },
      { name: "rentDueDay",    label: "Day of month rent is due",              type: "text", required: true,  placeholder: "e.g. 1st" },
    ],
  },
  {
    label: "Deposits & Insurance",
    fields: [
      { name: "securityDeposit",    label: "Security deposit amount",                              type: "text", required: true,  placeholder: "$0.00" },
      { name: "liabilityInsurance", label: "Minimum liability insurance aggregate limit",          type: "text", required: true,  placeholder: "$1,000,000.00" },
    ],
  },
  {
    label: "Parking & Furnishings",
    fields: [
      { name: "parkingSpaces",  label: "Number of parking spaces included",  type: "text",     required: true,  placeholder: "e.g. 2" },
      { name: "storageArea",    label: "Storage area description",           type: "text",     required: false, placeholder: "e.g. Storage room B on Level 1" },
      { name: "furnishings",    label: "Furnishings provided by Landlord",   type: "textarea", required: false, placeholder: "List all furnishings included" },
    ],
  },
  {
    label: "Renewal & Termination",
    fields: [
      { name: "renewalDuration",   label: "Renewal term duration",                              type: "text", required: true,  placeholder: "e.g. 1 Year" },
      { name: "renewalNoticeDays", label: "Days notice required before end of term to terminate", type: "text", required: true, placeholder: "e.g. 30" },
      { name: "renewalRent",       label: "Rent amount during renewal term",                    type: "text", required: true,  placeholder: "$0.00" },
      { name: "renewalPeriod",     label: "Renewal rent period (e.g. month)",                  type: "text", required: true,  placeholder: "month" },
      { name: "saleterminationDays", label: "Days notice if Landlord terminates upon sale",     type: "text", required: true, placeholder: "e.g. 60" },
    ],
  },
  {
    label: "Default & Late Fees",
    fields: [
      { name: "financialCureDays",  label: "Days to cure a financial default",    type: "text", required: true, placeholder: "e.g. 5" },
      { name: "otherCureDays",      label: "Days to cure any other default",      type: "text", required: true, placeholder: "e.g. 15" },
      { name: "lateFee",            label: "Late fee amount",                     type: "text", required: true, placeholder: "$0.00" },
      { name: "lateFeeDays",        label: "Days after due date before late fee", type: "text", required: true, placeholder: "e.g. 5" },
      { name: "returnedCheckFee",   label: "Returned check fee",                 type: "text", required: true, placeholder: "$0.00" },
    ],
  },
  {
    label: "Casualty",
    fields: [
      { name: "casualtyThreshold", label: "Repair cost threshold for casualty termination", type: "text", required: true, placeholder: "$0.00" },
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
  if (y + needed > 275) {
    doc.addPage();
    return 20;
  }
  return y;
}

function sectionHead(
  doc: jsPDF,
  num: number,
  title: string,
  x: number,
  y: number
): number {
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
  doc.text("COMMERCIAL LEASE AGREEMENT", 105, y, { align: "center" });
  const titleW = doc.getTextWidth("COMMERCIAL LEASE AGREEMENT");
  doc.setLineWidth(0.4);
  doc.line(105 - titleW / 2, y + 1.2, 105 + titleW / 2, y + 1.2);
  y += 12;

  // ── PREAMBLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y = wrappedText(
    doc,
    `This Commercial Lease Agreement ("Lease") is made and entered into as of ` +
    `${values.effectiveDate || "[Insert Date]"}, by and between:`,
    LM, y, PW, LH
  );
  y += 4;

  doc.setFont("helvetica", "bold");
  doc.text(`${values.party1Name || "[Landlord's Full Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(`, hereinafter referred to as the "Landlord,"`,
    LM + doc.getTextWidth(`${values.party1Name || "[Landlord's Full Name]"}`), y);
  y += LH + 2;

  doc.text("And", LM, y);
  y += LH + 2;

  doc.setFont("helvetica", "bold");
  doc.text(`${values.party2Name || "[Tenant's Full Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(`, hereinafter referred to as the "Tenant."`,
    LM + doc.getTextWidth(`${values.party2Name || "[Tenant's Full Name]"}`), y);
  y += LH + 8;

  // ── 1. LEASED PREMISES ────────────────────────────────────────────────────
  y = sectionHead(doc, 1, "LEASED PREMISES", LM, y);
  y = wrappedText(
    doc,
    `Landlord hereby leases to Tenant the commercial premises located at ` +
    `${values.propAddress || "[Full Address including Unit, City, State, ZIP Code]"} ("Premises"), ` +
    `in consideration of the lease payments set forth herein.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 2. TERM ───────────────────────────────────────────────────────────────
  y = sectionHead(doc, 2, "TERM", LM, y);
  const termBullets = [
    `The term of this Lease shall commence on ${values.leaseStart || "[Start Date]"} and shall terminate on ${values.leaseEnd || "[End Date]"}.`,
    `The Lease may be terminated earlier in accordance with its terms.`,
  ];
  for (const b of termBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 3. RENT ───────────────────────────────────────────────────────────────
  y = sectionHead(doc, 3, "RENT", LM, y);
  const rentAddr = values.paymentAddress ||
    [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ") ||
    "[Landlord's Payment Address]";
  const rentBullets = [
    `Tenant shall pay monthly rent of ${values.monthlyRent || "$0.00"}, payable in advance on or before the ${values.rentDueDay || "[Due Day]"} of each calendar month.`,
    `Payments shall be made to the Landlord at: ${rentAddr}, or at such other address as Landlord may designate in writing.`,
  ];
  for (const b of rentBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 4. SECURITY DEPOSIT ───────────────────────────────────────────────────
  y = sectionHead(doc, 4, "SECURITY DEPOSIT", LM, y);
  y = wrappedText(
    doc,
    `Upon execution of this Lease, Tenant shall deposit with Landlord the sum of ` +
    `${values.securityDeposit || "$0.00"} as a security deposit to be held in trust and applied, if ` +
    `necessary, to cover damages or defaults, in accordance with applicable law.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 5. POSSESSION ─────────────────────────────────────────────────────────
  y = sectionHead(doc, 5, "POSSESSION", LM, y);
  const possBullets = [
    `Tenant shall be entitled to possession of the Premises on the lease commencement date.`,
    `Tenant shall surrender the Premises in good condition, ordinary wear and tear excepted, on the lease termination date, unless otherwise agreed in writing.`,
  ];
  for (const b of possBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 6. EXCLUSIVITY ────────────────────────────────────────────────────────
  y = sectionHead(doc, 6, "EXCLUSIVITY", LM, y);
  y = wrappedText(
    doc,
    `Landlord agrees not to lease any part of the property to a tenant engaged in a business that directly competes with the primary business of the Tenant, thereby granting Tenant the exclusive right to operate such business within the property.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 7. FURNISHINGS ────────────────────────────────────────────────────────
  y = sectionHead(doc, 7, "FURNISHINGS", LM, y);
  const furnBullets = [
    `The following furnishings shall be provided by the Landlord: ${values.furnishings || "[List Furnishings]"}.`,
    `Tenant agrees to return all such items in the same condition, reasonable wear and tear excepted, at lease termination.`,
  ];
  for (const b of furnBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 8. PARKING AND STORAGE ────────────────────────────────────────────────
  y = sectionHead(doc, 8, "PARKING AND STORAGE", LM, y);
  const parkBullets = [
    `Tenant shall be entitled to use ${values.parkingSpaces || "[Number]"} parking space(s).`,
    values.storageArea
      ? `Tenant may use ${values.storageArea} for personal property storage at Tenant's own risk; Landlord shall not be liable for any loss or damage.`
      : `Any storage area usage is at Tenant's own risk; Landlord shall not be liable for any loss or damage.`,
  ];
  for (const b of parkBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 9. INSURANCE ──────────────────────────────────────────────────────────
  y = sectionHead(doc, 9, "INSURANCE", LM, y);
  const insBullets = [
    `Both Landlord and Tenant shall maintain adequate property insurance covering their respective interests in the Premises.`,
    `Tenant shall also maintain commercial general liability insurance with a combined aggregate limit of not less than ${values.liabilityInsurance || "$1,000,000.00"}, naming Landlord as an additional insured.`,
  ];
  for (const b of insBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 10. RENEWAL ───────────────────────────────────────────────────────────
  y = sectionHead(doc, 10, "RENEWAL", LM, y);
  const renewBullets = [
    `This Lease shall automatically renew for successive terms of ${values.renewalDuration || "[Renewal Duration]"}, unless either party provides written notice of termination at least ${values.renewalNoticeDays || "[Number]"} days prior to the end of the current term.`,
    `The rent during renewal terms shall be ${values.renewalRent || "$0.00"} per ${values.renewalPeriod || "month"}.`,
  ];
  for (const b of renewBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 11. MAINTENANCE AND UTILITIES ─────────────────────────────────────────
  y = sectionHead(doc, 11, "MAINTENANCE AND UTILITIES", LM, y);
  y = wrappedText(
    doc,
    `Landlord shall maintain the Premises in good repair and be responsible for all utilities and services associated with the Premises unless otherwise agreed in writing.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 12. TAXES ─────────────────────────────────────────────────────────────
  y = sectionHead(doc, 12, "TAXES", LM, y);
  const taxBullets = [
    `Real Estate Taxes: Landlord shall be responsible for all real estate taxes associated with the Premises.`,
    `Personal Property Taxes: Landlord shall also pay any personal property taxes or charges resulting from Tenant's use of the Premises.`,
  ];
  for (const b of taxBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 13. TERMINATION UPON SALE ─────────────────────────────────────────────
  y = sectionHead(doc, 13, "TERMINATION UPON SALE", LM, y);
  y = wrappedText(
    doc,
    `Landlord may terminate this Lease upon ${values.saleterminationDays || "[Number]"} days' written notice if the Premises is sold.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 14. CASUALTY AND CONDEMNATION ─────────────────────────────────────────
  y = sectionHead(doc, 14, "CASUALTY AND CONDEMNATION", LM, y);
  const casualtyBullets = [
    `If the Premises is damaged or destroyed and cannot be reasonably repaired within 60 days at a cost below ${values.casualtyThreshold || "$0.00"}, either party may terminate this Lease upon 20 days' written notice.`,
    `If the Premises is condemned, either party may likewise terminate upon 20 days' written notice.`,
    `Rent shall be prorated and refunded for any prepaid period not used.`,
  ];
  for (const b of casualtyBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 15. DEFAULT ───────────────────────────────────────────────────────────
  y = sectionHead(doc, 15, "DEFAULT", LM, y);
  const defaultBullets = [
    `Tenant shall be in default if it fails to meet any obligations under this Lease.`,
    `Tenant shall have ${values.financialCureDays || "[Number]"} days to cure a financial default after written notice from Landlord.`,
    `Tenant shall have ${values.otherCureDays || "[Number]"} days to cure any other default after written notice from Landlord.`,
    `Landlord may enter and repossess the Premises or cure the default and recover associated costs and reasonable attorney's fees.`,
    `All sums due under this Lease are deemed additional rent.`,
  ];
  for (const b of defaultBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 16. LATE PAYMENTS ─────────────────────────────────────────────────────
  y = sectionHead(doc, 16, "LATE PAYMENTS", LM, y);
  y = wrappedText(
    doc,
    `A late fee of ${values.lateFee || "$0.00"} shall be assessed for any rent not paid within ` +
    `${values.lateFeeDays || "[Number]"} days of its due date.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 17. HOLDOVER ──────────────────────────────────────────────────────────
  y = sectionHead(doc, 17, "HOLDOVER", LM, y);
  const holdoverBullets = [
    `If Tenant retains possession of the Premises beyond the lease term without written agreement, such possession shall be deemed a holdover tenancy.`,
    `Rent shall be due at the renewal rate specified in this Lease during any holdover period.`,
  ];
  for (const b of holdoverBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 18. CUMULATIVE RIGHTS ─────────────────────────────────────────────────
  y = sectionHead(doc, 18, "CUMULATIVE RIGHTS", LM, y);
  y = wrappedText(
    doc,
    `All rights and remedies provided in this Lease are cumulative and do not exclude any rights available under applicable law.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 19. RETURNED CHECKS ───────────────────────────────────────────────────
  y = sectionHead(doc, 19, "RETURNED CHECKS", LM, y);
  y = wrappedText(
    doc,
    `Tenant shall be charged ${values.returnedCheckFee || "$0.00"} for each check returned due to insufficient funds.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 20. NOTICES ───────────────────────────────────────────────────────────
  y = sectionHead(doc, 20, "NOTICES", LM, y);
  y = wrappedText(
    doc,
    `All notices shall be in writing and delivered by certified mail, addressed as follows (or to any updated address upon written notice):`,
    LM, y, PW, LH
  );
  y += 3;

  const landlordAddr = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const tenantAddr   = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");

  y = bulletItem(doc, `Landlord: ${values.party1Name || "[Landlord Name]"}, ${landlordAddr || "[Address]"}`, LM + 2, y, PW - 2, LH);
  y += 2;
  y = bulletItem(doc, `Tenant: ${values.party2Name || "[Tenant Name]"}, ${tenantAddr || "[Address]"}`, LM + 2, y, PW - 2, LH);
  y += 2;
  y = bulletItem(doc, `Notices are deemed received three (3) days after the date of mailing.`, LM + 2, y, PW - 2, LH);
  y += 7;

  // ── 21. GOVERNING LAW ─────────────────────────────────────────────────────
  y = sectionHead(doc, 21, "GOVERNING LAW", LM, y);
  y = wrappedText(
    doc,
    `This Lease shall be governed by and construed in accordance with the laws of the State of ${values.state || "[Insert State]"}.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 22. ENTIRE AGREEMENT ──────────────────────────────────────────────────
  y = sectionHead(doc, 22, "ENTIRE AGREEMENT", LM, y);
  y = wrappedText(
    doc,
    `This Lease constitutes the entire agreement between the parties and supersedes all prior discussions, representations, and understandings.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 23. AMENDMENTS ────────────────────────────────────────────────────────
  y = sectionHead(doc, 23, "AMENDMENTS", LM, y);
  y = wrappedText(
    doc,
    `No modification of this Lease shall be valid unless in writing and signed by both parties.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 24. SEVERABILITY ──────────────────────────────────────────────────────
  y = sectionHead(doc, 24, "SEVERABILITY", LM, y);
  const severBullets = [
    `If any provision of this Lease is found invalid or unenforceable, the remaining provisions shall remain in full force and effect.`,
    `Any invalid provision shall be modified as necessary to become enforceable to the fullest extent permitted by law.`,
  ];
  for (const b of severBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 25. WAIVER ────────────────────────────────────────────────────────────
  y = sectionHead(doc, 25, "WAIVER", LM, y);
  y = wrappedText(
    doc,
    `Failure to enforce any provision shall not be deemed a waiver of that or any other provision of this Lease.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 26. BINDING EFFECT ────────────────────────────────────────────────────
  y = sectionHead(doc, 26, "BINDING EFFECT", LM, y);
  y = wrappedText(
    doc,
    `This Lease shall bind and benefit the parties, their heirs, successors, legal representatives, and permitted assigns.`,
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
    `IN WITNESS WHEREOF, the parties have executed this Commercial Lease Agreement as of the date first above written.`,
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

  doc.save("commercial_lease_agreement.pdf");
};

export default function CommercialLease() {
  return (
    <FormWizard
      steps={steps}
      title="Commercial Lease Agreement"
      subtitle="Complete each step to generate your Commercial Lease Agreement"
      onGenerate={generatePDF}
      documentType="commerciallease"
    />
  );
}