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
        label: "What is the effective date of this agreement?",
        type: "date",
        required: true,
      },
      {
        name: "originalLeaseDate",
        label: "What is the date of the original Lease Agreement?",
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
    label: "Tenant Address",
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
    label: "Amendment Details",
    fields: [
      {
        name: "description",
        label: "Describe the specific amendment(s) to the Lease (e.g. updated rent, extended term, modified utilities)",
        type: "textarea",
        required: true,
        placeholder: "List each amendment clearly, one per line...",
      },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      {
        name: "duration",
        label: "What is the duration of this amendment?",
        type: "select",
        required: true,
        options: [
          { value: "1month", label: "1 Month" },
          { value: "3months", label: "3 Months" },
          { value: "6months", label: "6 Months" },
          { value: "1year", label: "1 Year" },
          { value: "2years", label: "2 Years" },
          { value: "5years", label: "5 Years" },
          { value: "indefinite", label: "Indefinite/Ongoing" },
          { value: "custom", label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice",
        label: "How much notice is required to terminate?",
        type: "select",
        required: true,
        options: [
          { value: "immediate", label: "Immediate" },
          { value: "7days", label: "7 Days" },
          { value: "14days", label: "14 Days" },
          { value: "30days", label: "30 Days" },
          { value: "60days", label: "60 Days" },
          { value: "90days", label: "90 Days" },
        ],
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      {
        name: "paymentAmount",
        label: "What is the payment amount (if applicable)?",
        type: "text",
        required: false,
        placeholder: "$0.00",
      },
      {
        name: "paymentSchedule",
        label: "Payment Schedule",
        type: "select",
        required: false,
        options: [
          { value: "onetime", label: "One-time Payment" },
          { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" },
          { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" },
          { value: "annually", label: "Annually" },
          { value: "milestone", label: "Milestone-based" },
        ],
      },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      {
        name: "confidentiality",
        label: "Include confidentiality clause?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes - Include confidentiality provisions" },
          { value: "no", label: "No - Not needed" },
        ],
      },
      {
        name: "disputeResolution",
        label: "How should disputes be resolved?",
        type: "select",
        required: true,
        options: [
          { value: "mediation", label: "Mediation" },
          { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation", label: "Court Litigation" },
          { value: "negotiation", label: "Good Faith Negotiation First" },
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

// ─── PDF helpers ─────────────────────────────────────────────────────────────

const PAGE_W = 210;
const MARGIN = 20;
const CONTENT_W = PAGE_W - MARGIN * 2;
const PAGE_H = 297;
const BOTTOM_MARGIN = 20;

function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line: string) => {
    if (y > PAGE_H - BOTTOM_MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

function sectionHeading(doc: jsPDF, label: string, y: number): number {
  if (y > PAGE_H - BOTTOM_MARGIN) { doc.addPage(); y = MARGIN; }
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(label, MARGIN, y);
  y += 7;
  return y;
}

function bodyText(doc: jsPDF, text: string, y: number, indent = 0): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  return addWrappedText(doc, text, MARGIN + indent, y, CONTENT_W - indent, 5.5);
}

function bulletItem(doc: jsPDF, text: string, y: number): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  if (y > PAGE_H - BOTTOM_MARGIN) { doc.addPage(); y = MARGIN; }
  doc.text("\u2022", MARGIN + 4, y);
  y = addWrappedText(doc, text, MARGIN + 10, y, CONTENT_W - 10, 5.5);
  return y;
}

// ─── Main PDF generator ───────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  // ── Title ──────────────────────────────────────────────────────────────────
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("LEASE AMENDMENT", PAGE_W / 2, y, { align: "center" });
  y += 10;

  // Jurisdiction line
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  const juris = `Jurisdiction: ${values.state || "N/A"}, ${(values.country || "").toUpperCase()}`;
  doc.text(juris, PAGE_W / 2, y, { align: "center" });
  y += 10;

  // ── Preamble ───────────────────────────────────────────────────────────────
  const landlord = values.party1Name || "[Landlord's Full Name]";
  const tenant   = values.party2Name || "[Tenant's Full Name]";
  const effDate  = values.effectiveDate || "[Insert Date]";
  const origDate = values.originalLeaseDate || "[Insert Original Lease Date]";
  const property = [values.party2Street, values.party2City, values.party2Zip]
    .filter(Boolean).join(", ") || "[Street Address, City, State, ZIP Code]";

  y = bodyText(
    doc,
    `This Lease Amendment ("Amendment") is made and entered into on ${effDate}, by and between ${landlord} ("Landlord") and ${tenant} ("Tenant") (collectively referred to as the "Parties").`,
    y
  );
  y += 4;

  // ── Background ─────────────────────────────────────────────────────────────
  y = sectionHeading(doc, "Background", y);
  y = bodyText(
    doc,
    `The Parties previously entered into a Lease Agreement dated ${origDate} (the "Lease"), under which the Tenant leased from the Landlord the property located at ${property}, as further described in the Lease.`,
    y
  );
  y += 3;
  y = bodyText(
    doc,
    "The Parties now wish to amend the Lease under the terms set forth in this Amendment.",
    y
  );
  y += 6;

  // ── Section 1 ──────────────────────────────────────────────────────────────
  y = sectionHeading(doc, "1.  Confirmation of Existing Lease", y);
  y = bodyText(
    doc,
    "The Parties acknowledge that the Lease is currently valid and in full effect and that neither party is in breach or default of any of its terms.",
    y
  );
  y += 6;

  // ── Section 2 ──────────────────────────────────────────────────────────────
  y = sectionHeading(doc, "2.  Amendments", y);
  y = bodyText(doc, "The Lease is hereby amended as follows:", y);
  y += 2;

  // Render each amendment as a bullet point
  if (values.description) {
    const items = values.description
      .split(/\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    items.forEach((item) => {
      y = bulletItem(doc, item, y);
      y += 1;
    });
  } else {
    y = bulletItem(doc, "[Insert specific amendment(s) here]", y);
  }

  // Duration bullet
  if (values.duration && values.duration !== "custom") {
    y = bulletItem(doc, `Duration of this amendment: ${values.duration.replace(/(\d+)/, "$1 ")}`, y);
  }

  // Termination notice bullet
  if (values.terminationNotice) {
    y = bulletItem(
      doc,
      `Termination notice required: ${values.terminationNotice === "immediate" ? "Immediate" : values.terminationNotice.replace(/(\d+)/, "$1 ")}`,
      y
    );
  }

  // Financial terms bullets
  if (values.paymentAmount) {
    y = bulletItem(doc, `Revised payment amount: ${values.paymentAmount}`, y);
  }
  if (values.paymentSchedule) {
    y = bulletItem(doc, `Payment schedule: ${values.paymentSchedule}`, y);
  }

  // Confidentiality bullet
  if (values.confidentiality === "yes") {
    y = bulletItem(doc, "Confidentiality provisions: Included", y);
  }

  // Dispute resolution bullet
  if (values.disputeResolution) {
    const drMap: Record<string, string> = {
      mediation: "Mediation",
      arbitration: "Binding Arbitration",
      litigation: "Court Litigation",
      negotiation: "Good Faith Negotiation First",
    };
    y = bulletItem(doc, `Dispute resolution method: ${drMap[values.disputeResolution] || values.disputeResolution}`, y);
  }

  y += 6;

  // ── Section 3 ──────────────────────────────────────────────────────────────
  y = sectionHeading(doc, "3.  Remaining Provisions Unaffected", y);
  y = bodyText(
    doc,
    "Except as expressly amended in this Agreement, all other terms, covenants, and provisions of the original Lease shall remain unchanged and in full force and effect. The Parties reaffirm their agreement to the Lease, as modified by this Amendment.",
    y
  );
  y += 6;

  // ── Section 4 ──────────────────────────────────────────────────────────────
  y = sectionHeading(doc, "4.  Recordation (Optional)", y);
  y = bodyText(
    doc,
    `This Amendment may be recorded at the discretion of either party. Alternatively, the Parties may prepare and execute a short-form memorandum of this Amendment to be recorded in the Register's Office of ${values.state || "[Insert County and State]"}.`,
    y
  );
  y += 6;

  // ── Section 5 ──────────────────────────────────────────────────────────────
  y = sectionHeading(doc, "5.  Conflict", y);
  y = bodyText(
    doc,
    "If any provision in this Amendment conflicts with any term or condition of the original Lease, the terms of this Amendment shall prevail and control.",
    y
  );
  y += 6;

  // ── Section 6 ──────────────────────────────────────────────────────────────
  y = sectionHeading(doc, "6.  Binding Effect", y);
  y = bodyText(
    doc,
    "This Amendment shall be binding upon and shall inure to the benefit of the Parties and their respective successors and assigns. However, nothing in this clause shall be construed to permit assignment of the Lease by the Tenant unless otherwise authorized by the original Lease.",
    y
  );
  y += 6;

  // ── Additional Terms ───────────────────────────────────────────────────────
  if (values.additionalTerms) {
    y = sectionHeading(doc, "7.  Additional Terms", y);
    const addItems = values.additionalTerms
      .split(/\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    addItems.forEach((item) => {
      y = bulletItem(doc, item, y);
      y += 1;
    });
    y += 4;
  }

  // ── Execution / Signatures ─────────────────────────────────────────────────
  y = sectionHeading(doc, "IN WITNESS WHEREOF", y);
  y = bodyText(
    doc,
    "The Parties have executed this Lease Amendment as of the date first written above.",
    y
  );
  y += 8;

  // Landlord block
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("LANDLORD:", MARGIN, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", MARGIN, y); y += 6;
  doc.text(`Name:  ${landlord}`, MARGIN, y); y += 6;
  doc.text(`Signed as: ${values.party1Signature || ""}`, MARGIN, y); y += 6;
  doc.text(`Address: ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`, MARGIN, y); y += 6;
  doc.text(`Contact: ${values.party1Email || ""}${values.party1Phone ? " | " + values.party1Phone : ""}`, MARGIN, y); y += 6;
  doc.text("Date: _______________________________", MARGIN, y);
  y += 10;

  // Tenant block
  doc.setFont("helvetica", "bold");
  doc.text("TENANT:", MARGIN, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text("Signature: _______________________________", MARGIN, y); y += 6;
  doc.text(`Name:  ${tenant}`, MARGIN, y); y += 6;
  doc.text(`Signed as: ${values.party2Signature || ""}`, MARGIN, y); y += 6;
  doc.text(`Address: ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`, MARGIN, y); y += 6;
  doc.text(`Contact: ${values.party2Email || ""}${values.party2Phone ? " | " + values.party2Phone : ""}`, MARGIN, y); y += 6;
  doc.text("Date: _______________________________", MARGIN, y);
  y += 10;

  // Witness (optional)
  if (values.witnessName) {
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS:", MARGIN, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text("Signature: _______________________________", MARGIN, y); y += 6;
    doc.text(`Name:  ${values.witnessName}`, MARGIN, y); y += 6;
    doc.text("Date: _______________________________", MARGIN, y);
  }

  doc.save("lease_amendment.pdf");
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function LeaseAmendment() {
  return (
    <FormWizard
      steps={steps}
      title="Lease Amendment"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="leaseamendment"
    />
  );
}