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
        label: "Effective date of this Agreement",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Landlord",
    fields: [
      { name: "party1Name",   label: "Landlord Full Legal Name",  type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party1Street", label: "Landlord Street Address",   type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party1City",   label: "Landlord City",             type: "text",  required: true,  placeholder: "City" },
      { name: "party1Zip",    label: "Landlord ZIP/Postal Code",  type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party1Email",  label: "Landlord Email",            type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party1Phone",  label: "Landlord Phone",            type: "tel",   required: false, placeholder: "(555) 123-4567" },
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
    label: "Premises & Arrears",
    fields: [
      { name: "propAddress",  label: "Full rental property address",              type: "text", required: true,  placeholder: "123 Property Street, City, State ZIP" },
      { name: "arrearsAmount",label: "Total past due rent amount",                type: "text", required: true,  placeholder: "$0.00" },
      { name: "payDate",      label: "Final payment date (Pay Date)",             type: "date", required: true  },
    ],
  },
  {
    label: "Payment Plan",
    fields: [
      { name: "initialPayment",      label: "Good faith initial payment on signing",          type: "text", required: true,  placeholder: "$0.00" },
      { name: "installmentCount",    label: "Number of installment payments",                 type: "text", required: true,  placeholder: "e.g. 3" },
      { name: "installmentAmount",   label: "Amount of each installment payment",             type: "text", required: true,  placeholder: "$0.00" },
      { name: "installmentDates",    label: "Installment payment dates",                      type: "text", required: true,  placeholder: "e.g. 1st of each month" },
    ],
  },
  {
    label: "Default Terms",
    fields: [
      {
        name: "belongingsDays",
        label: "Days after Pay Date to remove personal belongings (if default)",
        type: "text",
        required: true,
        placeholder: "e.g. 7",
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
  doc.text("LATE RENT PAYMENT AGREEMENT", 105, y, { align: "center" });
  const titleW = doc.getTextWidth("LATE RENT PAYMENT AGREEMENT");
  doc.setLineWidth(0.4);
  doc.line(105 - titleW / 2, y + 1.2, 105 + titleW / 2, y + 1.2);
  y += 12;

  // ── PREAMBLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  y = wrappedText(
    doc,
    `This Late Rent Payment Agreement ("Agreement") is entered into on ` +
    `${values.effectiveDate || "[Insert Date]"} ("Effective Date"), by and between:`,
    LM, y, PW, LH
  );
  y += 4;

  // Landlord block
  const landlordAddr = [values.party1Street, values.party1City, values.party1Zip]
    .filter(Boolean).join(", ") || "[Insert Landlord's Address]";
  doc.setFont("helvetica", "bold");
  doc.text(`${values.party1Name || "[Insert Landlord's Full Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(`, residing at ${landlordAddr} ("Landlord"),`,
    LM + doc.getTextWidth(`${values.party1Name || "[Insert Landlord's Full Name]"}`), y);
  y += LH + 2;

  doc.text("And", LM, y);
  y += LH + 2;

  // Tenant block
  const tenantAddr = [values.party2Street, values.party2City, values.party2Zip]
    .filter(Boolean).join(", ") || "[Insert Tenant's Address]";
  doc.setFont("helvetica", "bold");
  doc.text(`${values.party2Name || "[Insert Tenant's Full Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(`, residing at ${tenantAddr} ("Tenant").`,
    LM + doc.getTextWidth(`${values.party2Name || "[Insert Tenant's Full Name]"}`), y);
  y += LH + 3;

  y = wrappedText(
    doc,
    `The Landlord and Tenant may collectively be referred to herein as the "Parties."`,
    LM, y, PW, LH
  );
  y += 7;

  // ── RECITALS / WHEREAS ────────────────────────────────────────────────────
  boldHeading(doc, "RECITALS", LM, y);
  y += LH + 2;

  const recitals = [
    `WHEREAS, the Tenant is currently leasing the property located at ` +
    `${values.propAddress || "[Insert Full Rental Property Address]"} ("Premises") from the Landlord;`,

    `WHEREAS, the Tenant is currently in arrears in the amount of ` +
    `${values.arrearsAmount || "$0.00"} in past due rent;`,

    `WHEREAS, the Tenant acknowledges the outstanding rent owed and agrees to satisfy the total amount due no later than ` +
    `${values.payDate || "[Insert Final Payment Date]"} ("Pay Date");`,

    `WHEREAS, the Tenant agrees to make a good faith payment of ` +
    `${values.initialPayment || "$0.00"} upon execution of this Agreement, and further agrees to pay ` +
    `${values.installmentCount || "[Insert Number]"} installment(s) of ` +
    `${values.installmentAmount || "$0.00"} until the total past due rent is paid in full;`,

    `WHEREAS, the Tenant remains responsible for paying all current and future rent in addition to the scheduled installment payments toward the past due rent;`,

    `NOW, THEREFORE, the Parties agree as follows:`,
  ];
  for (const r of recitals) {
    y = checkPageBreak(doc, y);
    y = wrappedText(doc, r, LM, y, PW, LH);
    y += 3;
  }
  y += 5;

  // ── 1. PAYMENT OBLIGATIONS ────────────────────────────────────────────────
  y = sectionHead(doc, 1, "PAYMENT OBLIGATIONS", LM, y);
  y = wrappedText(
    doc,
    `The Tenant shall remit the outstanding past due rent as follows:`,
    LM, y, PW, LH
  );
  y += 3;

  const payBullets = [
    `Initial payment of ${values.initialPayment || "$0.00"} upon signing this Agreement;`,
    `${values.installmentCount || "[Insert Number]"} installment(s) of ` +
    `${values.installmentAmount || "$0.00"} payable on ${values.installmentDates || "[Insert Payment Dates]"};`,
    `Ongoing payment of all current and future rent as it becomes due.`,
  ];
  for (const b of payBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 2. DEFAULT AND TERMINATION ────────────────────────────────────────────
  y = sectionHead(doc, 2, "DEFAULT AND TERMINATION", LM, y);
  const defaultBullets = [
    `If the Tenant fails to comply with the payment terms outlined herein, including payment of future rent as due, the Tenant agrees to vacate the Premises immediately and no later than the Pay Date (${values.payDate || "[Insert Pay Date]"}).`,
    `The Tenant further agrees to remove all personal belongings from the Premises within ${values.belongingsDays || "[Insert Number]"} days following the Pay Date.`,
  ];
  for (const b of defaultBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 3. FORBEARANCE BY LANDLORD ────────────────────────────────────────────
  y = sectionHead(doc, 3, "FORBEARANCE BY LANDLORD", LM, y);
  const forbearBullets = [
    `In consideration of the Tenant's promise to pay the past due rent, the Landlord agrees to refrain from initiating eviction or other legal proceedings for non-payment, provided that the Tenant strictly complies with the terms of this Agreement.`,
    `Nothing in this Agreement shall be construed as a waiver of the Landlord's rights under applicable landlord-tenant law should the Tenant default.`,
  ];
  for (const b of forbearBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 4. ACKNOWLEDGMENT OF DEBT ─────────────────────────────────────────────
  y = sectionHead(doc, 4, "ACKNOWLEDGMENT OF DEBT", LM, y);
  const debtBullets = [
    `The Tenant acknowledges and agrees that the amount of rent specified above (${values.arrearsAmount || "$0.00"}) is accurate and legally due.`,
    `The Landlord is fully entitled to collect such amounts under the applicable lease and governing law.`,
  ];
  for (const b of debtBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 5. ENTIRE AGREEMENT ───────────────────────────────────────────────────
  y = sectionHead(doc, 5, "ENTIRE AGREEMENT", LM, y);
  const entireBullets = [
    `This Agreement constitutes the full and complete understanding between the Parties with respect to the subject matter herein and supersedes any prior or contemporaneous oral or written agreements or understandings.`,
    `This Agreement may only be amended in writing, signed by both Parties.`,
  ];
  for (const b of entireBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

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
    `IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.`,
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

  // Name row
  doc.text("Name:", col1, y);
  doc.text(values.party1Name || "", col1 + 14, y);
  doc.text("Name:", col2, y);
  doc.text(values.party2Name || "", col2 + 14, y);
  y += 7;

  // Signature row
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

  // Date row
  doc.text("Date:", col1, y);
  doc.line(col1 + 14, y + 1, col1 + 78, y + 1);
  doc.text("Date:", col2, y);
  doc.line(col2 + 14, y + 1, col2 + 78, y + 1);
  y += 12;

  // Optional witness
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

  doc.save("late_rent_payment_agreement.pdf");
};

export default function LateRentPaymentAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Late Rent Payment Agreement"
      subtitle="Complete each step to generate your Late Rent Payment Agreement"
      onGenerate={generatePDF}
      documentType="laterentpaymentagreement"
    />
  );
}