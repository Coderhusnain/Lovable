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
        label: "Effective date of this Renewal Agreement",
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
    label: "Leased Property",
    fields: [
      { name: "propAddress", label: "Property Street Address", type: "text", required: true,  placeholder: "123 Property Street" },
      { name: "propCity",    label: "Property City",           type: "text", required: true,  placeholder: "City" },
      { name: "propState",   label: "Property State",          type: "text", required: true,  placeholder: "State" },
      { name: "propZip",     label: "Property ZIP Code",       type: "text", required: true,  placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Original Lease",
    fields: [
      { name: "originalLeaseDate",   label: "Date of the Original Lease",         type: "date", required: true },
      { name: "originalLeaseExpiry", label: "Expiration date of the Original Lease", type: "date", required: true },
    ],
  },
  {
    label: "Renewal Term",
    fields: [
      { name: "renewalMonths", label: "Renewal duration (number of months)",         type: "text", required: true, placeholder: "e.g. 12" },
      { name: "renewalStart",  label: "Renewal Term start date",                     type: "date", required: true },
      { name: "renewalEnd",    label: "Renewal Term end date",                        type: "date", required: true },
    ],
  },
  {
    label: "Renewed Rent",
    fields: [
      { name: "monthlyRent", label: "Monthly rent during the Renewal Term",  type: "text", required: true, placeholder: "$0.00" },
      { name: "rentDueDay",  label: "Day of month rent is due",              type: "text", required: true, placeholder: "e.g. 1st" },
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

function subHead(
  doc: jsPDF,
  label: string,
  x: number,
  y: number
): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(label, x, y);
  doc.setFont("helvetica", "normal");
  return y + 5.5;
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
  doc.text("LEASE RENEWAL AGREEMENT", 105, y, { align: "center" });
  const titleW = doc.getTextWidth("LEASE RENEWAL AGREEMENT");
  doc.setLineWidth(0.4);
  doc.line(105 - titleW / 2, y + 1.2, 105 + titleW / 2, y + 1.2);
  y += 12;

  // ── PREAMBLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  y = wrappedText(
    doc,
    `This Lease Renewal Agreement ("Renewal Agreement") is made and entered into as of ` +
    `${values.effectiveDate || "[Insert Effective Date]"} (the "Effective Date") by and between:`,
    LM, y, PW, LH
  );
  y += 4;

  // Landlord block
  const landlordAddr = [values.party1Street, values.party1City, values.party1Zip]
    .filter(Boolean).join(", ") || "[Landlord's Address]";
  doc.setFont("helvetica", "bold");
  doc.text(`${values.party1Name || "[Landlord's Full Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(`, residing at ${landlordAddr} ("Landlord"),`, LM + doc.getTextWidth(`${values.party1Name || "[Landlord's Full Name]"}`), y);
  y += LH + 2;

  doc.text("And", LM, y);
  y += LH + 2;

  doc.setFont("helvetica", "bold");
  doc.text(`${values.party2Name || "[Tenant's Full Name]"}`, LM, y);
  doc.setFont("helvetica", "normal");
  doc.text(` ("Tenant").`, LM + doc.getTextWidth(`${values.party2Name || "[Tenant's Full Name]"}`), y);
  y += LH + 7;

  // ── 1. LEASED PROPERTY ────────────────────────────────────────────────────
  y = sectionHead(doc, 1, "LEASED PROPERTY", LM, y);
  const propFull = [values.propAddress, values.propCity, values.propState, values.propZip]
    .filter(Boolean).join(", ") || "[Insert Property Address]";
  y = wrappedText(
    doc,
    `The Landlord hereby leases to the Tenant the residential property located at ` +
    `${propFull} (the "Premises").`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 2. ORIGINAL LEASE ─────────────────────────────────────────────────────
  y = sectionHead(doc, 2, "ORIGINAL LEASE", LM, y);
  const origBullets = [
    `The parties previously entered into a lease agreement dated ${values.originalLeaseDate || "[Insert Original Lease Date]"} for the Premises (the "Original Lease").`,
    `The Original Lease is set to expire on ${values.originalLeaseExpiry || "[Insert Expiration Date]"}.`,
    `A copy of the Original Lease is attached hereto as Exhibit A and incorporated herein by reference.`,
  ];
  for (const b of origBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 3. RENEWAL AND MODIFICATION ───────────────────────────────────────────
  y = sectionHead(doc, 3, "RENEWAL AND MODIFICATION", LM, y);
  y = wrappedText(
    doc,
    `The parties now wish to extend the term of the Original Lease and agree to amend it as follows:`,
    LM, y, PW, LH
  );
  y += 5;

  // 3a. Renewal Term
  y = subHead(doc, "a.  Renewal Term", LM + 4, y);
  const renewBullets = [
    `The lease is hereby extended for an additional period of ${values.renewalMonths || "[Insert Number]"} month(s) (the "Renewal Term").`,
    `Renewal Term begins on ${values.renewalStart || "[Insert Start Date]"} and ends on ${values.renewalEnd || "[Insert End Date]"}.`,
  ];
  for (const b of renewBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 8, y, PW - 8, LH);
    y += 2;
  }
  y += 4;

  // 3b. Rent
  y = subHead(doc, "b.  Rent", LM + 4, y);
  const rentBullets = [
    `Monthly rent during the Renewal Term: ${values.monthlyRent || "$0.00"}, payable in advance.`,
    `Rent is due on or before the ${values.rentDueDay || "[Insert Day]"} day of each calendar month.`,
  ];
  for (const b of rentBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 8, y, PW - 8, LH);
    y += 2;
  }
  y += 5;

  // ── 4. CONTINUED EFFECT OF ORIGINAL LEASE ────────────────────────────────
  y = sectionHead(doc, 4, "CONTINUED EFFECT OF ORIGINAL LEASE", LM, y);
  const continueBullets = [
    `Except as expressly modified by this Renewal Agreement, all other terms, covenants, and conditions of the Original Lease shall remain unchanged.`,
    `All unmodified terms of the Original Lease shall remain in full force and effect throughout the Renewal Term.`,
  ];
  for (const b of continueBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── 5. ENTIRE AGREEMENT ───────────────────────────────────────────────────
  y = sectionHead(doc, 5, "ENTIRE AGREEMENT", LM, y);
  y = wrappedText(
    doc,
    `This Renewal Agreement, together with the Original Lease, constitutes the entire understanding between the parties with respect to the Premises and supersedes all prior agreements or understandings, whether oral or written, relating to the subject matter hereof.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 6. EXECUTION ──────────────────────────────────────────────────────────
  y = sectionHead(doc, 6, "EXECUTION", LM, y);
  const execBullets = [
    `This Renewal Agreement may be executed in counterparts, each of which shall be deemed an original.`,
    `This Agreement shall be effective as of the Effective Date upon execution by both parties.`,
  ];
  for (const b of execBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── ADDITIONAL TERMS ──────────────────────────────────────────────────────
  if (values.additionalTerms) {
    y = checkPageBreak(doc, y);
    boldHeading(doc, "ADDITIONAL TERMS", LM, y);
    y += LH + 1;
    y = wrappedText(doc, values.additionalTerms, LM, y, PW, LH);
    y += 7;
  }

  // ── SIGNATURES ────────────────────────────────────────────────────────────
  y = checkPageBreak(doc, y, 55);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  y = wrappedText(
    doc,
    `IN WITNESS WHEREOF, the parties have executed this Lease Renewal Agreement as of the date set forth below.`,
    LM, y, PW, LH
  );
  doc.setFont("helvetica", "normal");
  y += 8;

  const col1 = LM;
  const col2 = 110;

  // Labels
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

  doc.save("lease_renewal_agreement.pdf");
};

export default function LeaseRenewal() {
  return (
    <FormWizard
      steps={steps}
      title="Lease Renewal Agreement"
      subtitle="Complete each step to generate your Lease Renewal Agreement"
      onGenerate={generatePDF}
      documentType="leaserenewal"
    />
  );
}