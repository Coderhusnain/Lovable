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
    label: "Notice Date",
    fields: [
      {
        name: "effectiveDate",
        label: "Date of this Notice",
        type: "date",
        required: true,
      },
      {
        name: "leaseDateSigned",
        label: "Date the original Lease was signed",
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
        label: "Full legal name of the Landlord",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is the Landlord an individual or a business?",
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
        label: "Full legal name of the Tenant",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is the Tenant an individual or a business?",
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
    label: "Tenant Address (Premises)",
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
    label: "Violations",
    fields: [
      {
        name: "leaseViolations",
        label: "Describe the specific lease violation(s)",
        type: "textarea",
        required: true,
        placeholder: "e.g. Non-payment of rent for the month of June 2025; Unauthorized occupants; Damage to property...",
      },
    ],
  },
  {
    label: "Required Actions",
    fields: [
      {
        name: "correctiveActions",
        label: "List the corrective action(s) the Tenant must take",
        type: "textarea",
        required: true,
        placeholder: "e.g. Pay all outstanding rent in full; Remove unauthorized occupants; Repair damaged property...",
      },
      {
        name: "complianceDays",
        label: "Number of days given to comply (default: 30)",
        type: "text",
        required: true,
        placeholder: "e.g. 30",
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
        placeholder: "Enter any additional terms or special provisions...",
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

/** Labelled info row (bold label + normal value) — returns updated y. */
const addInfoRow = (
  doc: jsPDF,
  label: string,
  value: string,
  y: number,
  pageH: number
): number => {
  if (y > pageH - 14) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  const labelWidth = doc.getTextWidth(label + " ");
  doc.text(label, 20, y);
  doc.setFont("helvetica", "normal");
  const valLines: string[] = doc.splitTextToSize(value || "[Not provided]", 170 - labelWidth);
  doc.text(valLines[0], 20 + labelWidth, y);
  y += 5.5;
  for (let i = 1; i < valLines.length; i++) {
    if (y > pageH - 14) { doc.addPage(); y = 20; }
    doc.text(valLines[i], 20 + labelWidth, y);
    y += 5.5;
  }
  return y + 1;
};

// ─── PDF generator ────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const pageH = doc.internal.pageSize.height;
  let y = 20;

  // ── TITLE ──
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("EVICTION NOTICE", 105, y, { align: "center" });
  y += 14;

  // ── HEADER INFO BLOCK ──
  y = addInfoRow(doc, "DATE OF NOTICE:", values.effectiveDate || "[Insert Date]", y, pageH);
  y = addInfoRow(doc, "TENANT'S NAME:", values.party2Name || "[Insert Tenant Name]", y, pageH);
  y = addInfoRow(
    doc,
    "ADDRESS OF PREMISES:",
    `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`.trim().replace(/^,\s*/, ""),
    y, pageH
  );
  y += 4;

  // ── TAKE NOTICE HEADER ──
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  if (y > pageH - 20) { doc.addPage(); y = 20; }
  doc.text("TAKE NOTICE THAT", 20, y);
  y += 8;

  // ── PREAMBLE ──
  y = addBody(
    doc,
    `This Notice is being provided to you pursuant to the terms of your written lease agreement (the "Lease"), entered into on or about ${values.leaseDateSigned || "[Insert Date of Lease]"}, between you and the undersigned, concerning the leased premises located at: ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""} (hereinafter referred to as the "Premises").`,
    y, pageH
  );
  y += 3;

  // ── 1. LEASE VIOLATION ──
  y = addHeading(doc, "1. Lease Violation", y, pageH);
  y = addBody(
    doc,
    "Please be advised that you are currently in breach of one or more covenants, conditions, or provisions of your Lease. The specific violations are as follows:",
    y, pageH
  );

  // Split violations into individual bullets if separated by newlines or semicolons
  const violations = (values.leaseViolations || "[Insert violations]")
    .split(/\n|;/)
    .map((v: string) => v.trim())
    .filter((v: string) => v.length > 0);

  if (violations.length > 1) {
    for (const v of violations) {
      y = addBullet(doc, v, y, pageH);
    }
  } else {
    y = addBody(doc, violations[0] || "[Insert violations]", y, pageH, 24);
  }
  y += 2;

  // ── 2. REQUIRED CORRECTIVE ACTION ──
  y = addHeading(doc, "2. Required Corrective Action", y, pageH);
  y = addBody(
    doc,
    "You are hereby required to take the following corrective action(s) in order to cure the above-described violations:",
    y, pageH
  );

  const actions = (values.correctiveActions || "[Insert corrective actions]")
    .split(/\n|;/)
    .map((a: string) => a.trim())
    .filter((a: string) => a.length > 0);

  if (actions.length > 1) {
    for (const a of actions) {
      y = addBullet(doc, a, y, pageH);
    }
  } else {
    y = addBody(doc, actions[0] || "[Insert corrective actions]", y, pageH, 24);
  }
  y += 2;

  // ── 3. TIMEFRAME FOR COMPLIANCE ──
  y = addHeading(doc, "3. Timeframe for Compliance", y, pageH);
  y = addBody(
    doc,
    `Pursuant to applicable law and the terms of your Lease, you are required to correct the above-mentioned violations within ${values.complianceDays || "thirty (30)"} days of receipt or delivery of this Notice (the "Deadline").`,
    y, pageH
  );
  y = addBody(
    doc,
    "Failure to comply within this timeframe will be deemed a continuing violation of the Lease and may result in further legal action.",
    y, pageH
  );
  y += 2;

  // ── 4. LANDLORD'S RIGHT TO REMEDY ──
  y = addHeading(doc, "4. Landlord's Right to Remedy", y, pageH);
  y = addBody(
    doc,
    "Please be advised that if you do not correct the violations within the stated time period, the Landlord or its authorized agents may, but are not obligated to, take necessary steps to rectify the matter at your expense, including but not limited to:",
    y, pageH
  );
  y = addBullet(doc, "Entering the Premises to cure the default, if permitted by applicable law;", y, pageH);
  y = addBullet(doc, "Engaging third-party contractors or service providers to remedy the violation at Tenant's cost;", y, pageH);
  y = addBullet(doc, "Pursuing all other remedies available under the Lease or applicable law.", y, pageH);
  y += 2;

  // ── 5. POTENTIAL CONSEQUENCES ──
  y = addHeading(doc, "5. Potential Consequences", y, pageH);
  y = addBody(
    doc,
    `This Notice shall also serve as a formal warning that repeated or continued violations of your Lease may constitute grounds for termination of your tenancy and possible eviction proceedings in accordance with the governing laws of the State of ${values.state || "[Insert State]"}.`,
    y, pageH
  );
  y = addBody(
    doc,
    "Consequences of non-compliance may include, but are not limited to:",
    y, pageH
  );
  y = addBullet(doc, "Termination of the Lease agreement;", y, pageH);
  y = addBullet(doc, "Initiation of formal eviction proceedings;", y, pageH);
  y = addBullet(doc, "Recovery of damages, court costs, and attorneys' fees as permitted by law.", y, pageH);
  y += 2;

  // ── ADDITIONAL TERMS ──
  if (values.additionalTerms) {
    y = addHeading(doc, "Additional Terms", y, pageH);
    y = addBody(doc, values.additionalTerms, y, pageH);
    y += 2;
  }

  // ── SIGNATURES ──
  if (y > pageH - 70) { doc.addPage(); y = 20; }
  y += 4;

  // Tenant signature block
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("TENANT:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Tenant's Name:", 20, y);
  doc.text(values.party2Name || "", 70, y);
  y += 8;
  doc.text("Signature:", 20, y);
  doc.text("_______________________________", 50, y);
  y += 8;
  doc.text("Date:", 20, y);
  doc.text(new Date().toLocaleDateString(), 50, y);
  y += 14;

  // Landlord signature block
  doc.setFont("helvetica", "bold");
  doc.text("LANDLORD:", 20, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Landlord Name:", 20, y);
  doc.text(values.party1Name || "", 70, y);
  y += 8;
  doc.text("Signature:", 20, y);
  doc.text("_______________________________", 50, y);
  y += 8;
  doc.text(`Typed Signature: ${values.party1Signature || ""}`, 20, y);
  y += 8;
  doc.text("Date:", 20, y);
  doc.text(new Date().toLocaleDateString(), 50, y);
  y += 14;

  // Witness block
  if (values.witnessName) {
    if (y > pageH - 20) { doc.addPage(); y = 20; }
    doc.text("Witness: _______________________________", 20, y);
    y += 7;
    doc.text(`Name: ${values.witnessName}`, 20, y);
  }

  doc.save("eviction_notice.pdf");
};

export default function EvictionNotice() {
  return (
    <FormWizard
      steps={steps}
      title="Eviction Notice"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="evictionnotice"
    />
  );
}