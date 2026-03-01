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
    label: "Extension Date",
    fields: [
      {
        name: "effectiveDate",
        label: "What is the effective date of this extension?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "Original Contract",
    fields: [
      {
        name: "originalContractTitle",
        label: "What is the title of the original contract?",
        type: "text",
        required: true,
        placeholder: "e.g. Service Agreement dated Jan 1, 2024",
      },
      {
        name: "originalEndDate",
        label: "What was the original end/expiration date?",
        type: "date",
        required: true,
      },
      {
        name: "newEndDate",
        label: "What is the new extended end date?",
        type: "date",
        required: true,
      },
    ],
  },
  {
    label: "First Party Name",
    fields: [
      {
        name: "party1Name",
        label: "What is the full legal name of the first party?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party1Type",
        label: "Is this party an individual or a business?",
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
    label: "First Party Address",
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
    label: "First Party Contact",
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
    label: "Second Party Name",
    fields: [
      {
        name: "party2Name",
        label: "What is the full legal name of the second party?",
        type: "text",
        required: true,
        placeholder: "Enter full legal name",
      },
      {
        name: "party2Type",
        label: "Is this party an individual or a business?",
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
    label: "Second Party Address",
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
    label: "Second Party Contact",
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
    label: "Amendments",
    fields: [
      {
        name: "amendments",
        label: "List any amendments or changes to the original contract (if any)",
        type: "textarea",
        required: false,
        placeholder: "Describe any specific changes or amendments to original terms...",
      },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      {
        name: "additionalTerms",
        label: "Any additional terms for this extension?",
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
        label: "First Party Signature (Type full legal name)",
        type: "text",
        required: true,
        placeholder: "Type your full legal name as signature",
      },
      {
        name: "party2Signature",
        label: "Second Party Signature (Type full legal name)",
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

// ─────────────────────────────────────────────────────────────────────────────
// PDF HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Render text + draw underline beneath it */
const ulText = (doc: jsPDF, text: string, x: number, y: number) => {
  doc.text(text, x, y);
  const w = doc.getTextWidth(text);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.25);
  doc.line(x, y + 1.1, x + w, y + 1.1);
};

/** Plain label then underlined value on same line */
const labelUl = (doc: jsPDF, label: string, value: string, x: number, y: number) => {
  doc.setFont("helvetica", "normal");
  doc.text(label, x, y);
  ulText(doc, value, x + doc.getTextWidth(label), y);
};

// ─────────────────────────────────────────────────────────────────────────────
// PDF GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const PW       = 210;
  const M        = 20;
  const TW       = PW - M * 2;
  const FS       = 10.5;
  const LH       = 5.8;
  const SAFE_BOT = 270;
  let y = 22;

  const checkPage = (needed = 12) => {
    if (y + needed > SAFE_BOT) { doc.addPage(); y = 22; }
  };

  // ── TITLE ────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  const TITLE = "CONTRACT EXTENSION AGREEMENT";
  doc.text(TITLE, PW / 2, y, { align: "center" });
  const tw = doc.getTextWidth(TITLE);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.4);
  doc.line(PW / 2 - tw / 2, y + 1.5, PW / 2 + tw / 2, y + 1.5);
  y += 12;

  // ── DATE / JURISDICTION ──────────────────────────────────────────────────
  doc.setFontSize(FS);
  doc.setTextColor(0, 0, 0);
  labelUl(doc, "Date:  ", values.effectiveDate || "N/A", M, y); y += LH + 1;
  labelUl(doc, "Jurisdiction:  ", `${values.state || ""}, ${values.country?.toUpperCase() || ""}`, M, y);
  y += LH + 6;

  // ── ORIGINAL CONTRACT DETAILS ────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FS);
  doc.text("ORIGINAL CONTRACT DETAILS", M, y); y += LH + 1;
  doc.setFont("helvetica", "normal");
  labelUl(doc, "Original Contract:  ", values.originalContractTitle || "N/A", M, y); y += LH;
  labelUl(doc, "Original End Date:  ", values.originalEndDate || "N/A", M, y); y += LH;
  labelUl(doc, "New Extended End Date:  ", values.newEndDate || "N/A", M, y); y += LH + 6;

  // ── PARTIES ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.text("PARTIES", M, y); y += LH + 1;
  doc.setFont("helvetica", "normal");

  // First Party
  labelUl(doc, "First Party:  ", values.party1Name || "N/A", M, y); y += LH;
  labelUl(doc, "Address:  ", `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`, M, y); y += LH;
  labelUl(doc, "Email:  ", values.party1Email || "N/A", M, y); y += LH;
  if (values.party1Phone) { labelUl(doc, "Phone:  ", values.party1Phone, M, y); y += LH; }
  y += 4;

  // Second Party
  labelUl(doc, "Second Party:  ", values.party2Name || "N/A", M, y); y += LH;
  labelUl(doc, "Address:  ", `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`, M, y); y += LH;
  labelUl(doc, "Email:  ", values.party2Email || "N/A", M, y); y += LH;
  if (values.party2Phone) { labelUl(doc, "Phone:  ", values.party2Phone, M, y); y += LH; }
  y += 6;

  // ── EXTENSION TERMS ──────────────────────────────────────────────────────
  checkPage(20);
  doc.setFont("helvetica", "bold");
  doc.text("EXTENSION TERMS", M, y); y += LH + 1;
  doc.setFont("helvetica", "normal");
  const extText = doc.splitTextToSize(
    `The parties hereby agree to extend the above-referenced contract from ` +
    `${values.originalEndDate || "N/A"} to ${values.newEndDate || "N/A"}. ` +
    `All other terms and conditions of the original contract remain in full force and effect, ` +
    `unless specifically amended herein.`,
    TW
  );
  doc.text(extText, M, y);
  y += extText.length * LH + 5;

  // ── AMENDMENTS ───────────────────────────────────────────────────────────
  if (values.amendments) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.text("AMENDMENTS TO ORIGINAL CONTRACT", M, y); y += LH + 1;
    doc.setFont("helvetica", "normal");
    const amendLines = doc.splitTextToSize(values.amendments, TW);
    doc.text(amendLines, M, y);
    y += amendLines.length * LH + 5;
  }

  // ── ADDITIONAL TERMS ─────────────────────────────────────────────────────
  if (values.additionalTerms) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.text("ADDITIONAL TERMS", M, y); y += LH + 1;
    doc.setFont("helvetica", "normal");
    const addLines = doc.splitTextToSize(values.additionalTerms, TW);
    doc.text(addLines, M, y);
    y += addLines.length * LH + 5;
  }

  // ── SIGNATURES ───────────────────────────────────────────────────────────
  checkPage(45);
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURES", M, y); y += LH + 3;
  doc.setFont("helvetica", "normal");

  const C2 = 110;
  doc.text("_______________________________", M, y);
  doc.text("_______________________________", C2, y);
  y += LH;

  // Underlined party names
  ulText(doc, values.party1Name || "First Party", M, y);
  ulText(doc, values.party2Name || "Second Party", C2, y);
  y += LH;

  // Underlined typed signatures
  labelUl(doc, "Signature:  ", values.party1Signature || "", M, y);
  labelUl(doc, "Signature:  ", values.party2Signature || "", C2, y);
  y += LH;

  doc.text("Date: " + new Date().toLocaleDateString(), M, y);
  doc.text("Date: " + new Date().toLocaleDateString(), C2, y);

  if (values.witnessName) {
    y += LH + 6;
    doc.text("Witness: _______________________________", M, y); y += LH;
    labelUl(doc, "Name:  ", values.witnessName, M, y);
  }

  // ── FOOTER ───────────────────────────────────────────────────────────────
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated  •  ${new Date().toLocaleDateString()}`, PW / 2, 288, { align: "center" });

  doc.save("contract_extension_agreement.pdf");
};

export default function ContractExtensionAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Contract Extension Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="contractextensionagreement"
    />
  );
}