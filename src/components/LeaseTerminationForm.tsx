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
    label: "Letter Date",
    fields: [
      {
        name: "effectiveDate",
        label: "Date of this letter",
        type: "date",
        required: true,
      },
      {
        name: "terminationDate",
        label: "Lease termination date (date tenant must vacate)",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Landlord Details",
    fields: [
      {
        name: "party1Name",
        label: "Full legal name of Landlord or Property Management Company",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Title",
        label: "Title or Role (e.g. Property Manager, Owner)",
        type: "text",
        required: false,
        placeholder: "e.g. Property Manager",
      },
    ],
  },
  {
    label: "Landlord Address",
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
    label: "Landlord Contact",
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
    label: "Tenant Details",
    fields: [
      {
        name: "party2Name",
        label: "Full legal name of Tenant(s)",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
    ],
  },
  {
    label: "Premises Address",
    fields: [
      {
        name: "party2Street",
        label: "Premises Street Address",
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
    label: "Tenant Contact",
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
    label: "Additional Terms",
    fields: [
      {
        name: "additionalTerms",
        label: "Any additional notes or conditions?",
        type: "textarea",
        required: false,
        placeholder: "Enter any additional notes or special provisions...",
      },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      {
        name: "party1Signature",
        label: "Landlord Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Tenant Signature (Type full legal name)",
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

/** Bold section heading — returns updated y. */
const addHeading = (doc: jsPDF, text: string, y: number, pageH: number): number => {
  if (y > pageH - 22) { doc.addPage(); y = 20; }
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, 20, y);
  return y + 7;
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

/** Bold label + normal value on same line — returns updated y. */
const addLabelValue = (
  doc: jsPDF,
  label: string,
  value: string,
  y: number,
  pageH: number
): number => {
  if (y > pageH - 14) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  const lw = doc.getTextWidth(label + " ");
  doc.text(label, 20, y);
  doc.setFont("helvetica", "normal");
  const valLines: string[] = doc.splitTextToSize(value || "[Not provided]", 170 - lw);
  doc.text(valLines[0], 20 + lw, y);
  y += 5.5;
  for (let i = 1; i < valLines.length; i++) {
    if (y > pageH - 14) { doc.addPage(); y = 20; }
    doc.text(valLines[i], 20 + lw, y);
    y += 5.5;
  }
  return y + 2;
};

// ─── PDF generator ────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const pageH = doc.internal.pageSize.height;
  let y = 20;

  // ── TITLE ──
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("LEASE TERMINATION LETTER", 105, y, { align: "center" });
  y += 12;

  // ── HEADER INFO BLOCK ──
  y = addLabelValue(doc, "To:", `${values.party2Name || "[Tenant Name]"} and All Others in Possession`, y, pageH);
  y = addLabelValue(
    doc,
    "Premises Address:",
    `${values.party2Street || "[Street Address]"}, ${values.party2City || "[City]"}, ${values.state || "[State]"} ${values.party2Zip || "[ZIP]"}`,
    y, pageH
  );
  y += 4;

  // ── NOTICE 1: TERMINATION OF LEASE ──
  y = addHeading(doc, "Notice of Lease Termination", y, pageH);
  y = addBody(
    doc,
    `PLEASE TAKE NOTICE that the lease agreement under which you currently occupy the above-described premises shall terminate in accordance with its terms on ${values.terminationDate || "[Insert Termination Date]"}, and will not be renewed or converted into a month-to-month tenancy.`,
    y, pageH
  );
  y = addBody(
    doc,
    "Accordingly, you are not authorized to submit any rent payments for any period beyond the stated termination date. Any such payment inadvertently accepted will be returned and shall not be construed as a renewal, extension, or waiver of the termination.",
    y, pageH
  );
  y += 2;

  // ── NOTICE 2: VACATE AND SURRENDER ──
  y = addHeading(doc, "Notice to Vacate and Surrender Possession", y, pageH);
  y = addBody(
    doc,
    `FURTHER TAKE NOTICE that you are required to vacate and surrender possession of the premises to ${values.party1Name || "[Insert Landlord's Name or Property Management Company]"} no later than the termination date above.`,
    y, pageH
  );
  y = addBody(
    doc,
    "The premises must be returned in the same condition as received at the time of move-in, reasonable wear and tear excepted. The following items must be returned at the time of vacating:",
    y, pageH
  );
  y = addBullet(doc, "All keys to the premises;", y, pageH);
  y = addBullet(doc, "All access cards and entry fobs;", y, pageH);
  y = addBullet(doc, "Any other related items provided at the commencement of the tenancy.", y, pageH);
  y += 2;

  // ── NOTICE 3: FAILURE TO SURRENDER ──
  y = addHeading(doc, "Consequences of Failure to Vacate", y, pageH);
  y = addBody(
    doc,
    "Failure to surrender possession of the premises as required may result in legal proceedings being initiated against you, including but not limited to:",
    y, pageH
  );
  y = addBullet(doc, "An action for unlawful detainer to recover possession of the premises;", y, pageH);
  y = addBullet(doc, "Claims for holdover rent and any additional damages permitted by law;", y, pageH);
  y = addBullet(doc, "Recovery of attorneys' fees and court costs as allowed under the lease or applicable law.", y, pageH);
  y += 2;

  // ── NOTICE 4: RESERVED RIGHTS ──
  y = addHeading(doc, "Reservation of Rights and Remedies", y, pageH);
  y = addBody(
    doc,
    `The Landlord expressly reserves all rights and remedies provided by the lease agreement and applicable laws of the State of ${values.state || "[Insert State]"}, including but not limited to:`,
    y, pageH
  );
  y = addBullet(doc, "Claims for unpaid rent;", y, pageH);
  y = addBullet(doc, "Claims for property damage beyond normal wear and tear;", y, pageH);
  y = addBullet(doc, "Any other lawful relief available under the lease or applicable law.", y, pageH);
  y = addBody(
    doc,
    "Nothing in this notice shall be construed as a waiver of any such rights or remedies.",
    y, pageH
  );
  y += 2;

  // ── ADDITIONAL TERMS ──
  if (values.additionalTerms) {
    y = addHeading(doc, "Additional Notes", y, pageH);
    y = addBody(doc, values.additionalTerms, y, pageH);
    y += 2;
  }

  // ── SIGNATURE BLOCK ──
  if (y > pageH - 65) { doc.addPage(); y = 20; }
  y += 4;

  y = addLabelValue(doc, "Dated:", values.effectiveDate || new Date().toLocaleDateString(), y, pageH);
  y = addLabelValue(doc, "By:", values.party1Name || "[Landlord or Authorized Agent's Name]", y, pageH);
  if (values.party1Title) {
    y = addLabelValue(doc, "Title/Role:", values.party1Title, y, pageH);
  }
  y += 6;

  // Landlord signature
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("LANDLORD:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", 20, y);
  y += 7;
  doc.text(`Printed Name: ${values.party1Name || ""}`, 20, y);
  y += 7;
  if (values.party1Signature) {
    doc.text(`Typed Signature: ${values.party1Signature}`, 20, y);
    y += 7;
  }
  doc.text(`Date: ${values.effectiveDate || new Date().toLocaleDateString()}`, 20, y);
  y += 14;

  // Tenant signature
  doc.setFont("helvetica", "bold");
  doc.text("TENANT:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", 20, y);
  y += 7;
  doc.text(`Printed Name: ${values.party2Name || ""}`, 20, y);
  y += 7;
  if (values.party2Signature) {
    doc.text(`Typed Signature: ${values.party2Signature}`, 20, y);
    y += 7;
  }
  doc.text("Date: _______________________________", 20, y);
  y += 14;

  // Witness block
  if (values.witnessName) {
    if (y > pageH - 20) { doc.addPage(); y = 20; }
    doc.text("Witness: _______________________________", 20, y);
    y += 7;
    doc.text(`Name: ${values.witnessName}`, 20, y);
  }

  doc.save("lease_termination_letter.pdf");
};

export default function LeaseTerminationLetter() {
  return (
    <FormWizard
      steps={steps}
      title="Lease Termination Letter"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="leaseterminationletter"
    />
  );
}