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
        getOptions: (value) => {
          if (value === "us") {
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
      {
        name: "effectiveDate",
        label: "What is the effective date of this agreement?",
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
    label: "Agreement Details",
    fields: [
      {
        name: "description",
        label: "Describe the purpose and scope of this agreement",
        type: "textarea",
        required: true,
        placeholder: "Provide a detailed description of the agreement terms...",
      },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      {
        name: "duration",
        label: "What is the duration of this agreement?",
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
// PDF GENERATOR — letter-style layout matching reference image
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

  const p1addr = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const p2addr = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");

  // ── TITLE ────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  const TITLE = "BUSINESS AGREEMENT";
  doc.text(TITLE, PW / 2, y, { align: "center" });
  const tw = doc.getTextWidth(TITLE);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.4);
  doc.line(PW / 2 - tw / 2, y + 1.5, PW / 2 + tw / 2, y + 1.5);
  y += 12;

  // ── HEADER: Date, To, Address ─────────────────────────────────────────────
  // Matches reference: "Date: <underlined>" / "To: <underlined>" / "Address: <underlined>"
  doc.setFontSize(FS);
  doc.setTextColor(0, 0, 0);
  labelUl(doc, "Date:  ", values.effectiveDate || "N/A", M, y); y += LH + 1;
  labelUl(doc, "Jurisdiction:  ", `${values.state || ""}, ${values.country?.toUpperCase() || ""}`, M, y); y += LH + 1;
  labelUl(doc, "To:  ", values.party2Name || "N/A", M, y); y += LH + 1;
  labelUl(doc, "Address:  ", p2addr || "N/A", M, y); y += LH + 6;

  // ── SUBJECT ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(FS);
  doc.text("Subject: Business Agreement Between Parties", M, y);
  y += LH + 5;

  // ── BODY ─────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.text("Dear Sir or Madam,", M, y); y += LH + 3;

  // Opening paragraph — party names underlined inline
  const p1type = values.party1Type === "business" ? "Business/Company" : "Individual";
  const p2type = values.party2Type === "business" ? "Business/Company" : "Individual";

  const openingParts = [
    `This Business Agreement ("Agreement") is entered into as of `,
    values.effectiveDate || "N/A",
    `, by and between `,
    values.party1Name || "First Party",
    ` (${p1type}), located at ${p1addr || "N/A"}, Email: `,
    values.party1Email || "N/A",
    `${values.party1Phone ? ", Phone: " + values.party1Phone : ""}`,
    ` ("First Party"); and `,
    values.party2Name || "Second Party",
    ` (${p2type}), located at ${p2addr || "N/A"}, Email: `,
    values.party2Email || "N/A",
    `${values.party2Phone ? ", Phone: " + values.party2Phone : ""}`,
    ` ("Second Party").`,
  ];

  // Render opening paragraph as plain wrapped text (names already in text)
  const openingText = openingParts.join("");
  const openLines = doc.splitTextToSize(openingText, TW);
  doc.text(openLines, M, y);
  y += openLines.length * LH + 4;

  // ── 1. PURPOSE AND SCOPE ─────────────────────────────────────────────────
  checkPage(20);
  doc.setFont("helvetica", "bold");
  doc.text("1. PURPOSE AND SCOPE", M, y); y += LH + 1;
  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(values.description || "N/A", TW);
  doc.text(descLines, M, y);
  y += descLines.length * LH + 5;

  // ── 2. TERMS AND CONDITIONS ──────────────────────────────────────────────
  checkPage(30);
  doc.setFont("helvetica", "bold");
  doc.text("2. TERMS AND CONDITIONS", M, y); y += LH + 1;
  doc.setFont("helvetica", "normal");
  labelUl(doc, "Duration:  ", values.duration || "N/A", M, y); y += LH;
  labelUl(doc, "Termination Notice:  ", values.terminationNotice || "N/A", M, y); y += LH;
  labelUl(doc, "Confidentiality:  ", values.confidentiality === "yes" ? "Included" : "Not Included", M, y); y += LH;
  labelUl(doc, "Dispute Resolution:  ", values.disputeResolution || "N/A", M, y); y += LH + 5;

  // ── 3. FINANCIAL TERMS ───────────────────────────────────────────────────
  if (values.paymentAmount || values.paymentSchedule) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.text("3. FINANCIAL TERMS", M, y); y += LH + 1;
    doc.setFont("helvetica", "normal");
    labelUl(doc, "Payment Amount:  ", values.paymentAmount || "N/A", M, y); y += LH;
    labelUl(doc, "Schedule:  ", values.paymentSchedule || "N/A", M, y); y += LH + 5;
  }

  // ── 4. ADDITIONAL TERMS ──────────────────────────────────────────────────
  if (values.additionalTerms) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.text("4. ADDITIONAL TERMS", M, y); y += LH + 1;
    doc.setFont("helvetica", "normal");
    const addLines = doc.splitTextToSize(values.additionalTerms, TW);
    doc.text(addLines, M, y);
    y += addLines.length * LH + 5;
  }

  // ── CLOSING PARAGRAPH ────────────────────────────────────────────────────
  checkPage(20);
  doc.setFont("helvetica", "normal");
  const closingLines = doc.splitTextToSize(
    "IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.",
    TW
  );
  doc.text(closingLines, M, y);
  y += closingLines.length * LH + 4;
  doc.text("Thank you for your cooperation.", M, y); y += LH + 4;
  doc.text("Sincerely,", M, y); y += LH + 10;

  // ── SIGNATURES ───────────────────────────────────────────────────────────
  // Matches reference: bold underlined name, then address / email / phone plain
  checkPage(40);

  // First Party signature block
  ulText(doc, values.party1Name || "First Party", M, y);
  doc.setFont("helvetica", "bold");  // name is bold in reference
  y += LH + 1;
  doc.setFont("helvetica", "normal");
  doc.text(p1addr || "", M, y); y += LH;
  if (values.party1Email) { doc.text(`Email: ${values.party1Email}`, M, y); y += LH; }
  if (values.party1Phone) { doc.text(`Phone: ${values.party1Phone}`, M, y); y += LH; }
  labelUl(doc, "Signature:  ", values.party1Signature || "", M, y); y += LH;
  doc.text("Date: " + new Date().toLocaleDateString(), M, y); y += LH + 8;

  // Second Party signature block
  checkPage(30);
  ulText(doc, values.party2Name || "Second Party", M, y);
  y += LH + 1;
  doc.setFont("helvetica", "normal");
  doc.text(p2addr || "", M, y); y += LH;
  if (values.party2Email) { doc.text(`Email: ${values.party2Email}`, M, y); y += LH; }
  if (values.party2Phone) { doc.text(`Phone: ${values.party2Phone}`, M, y); y += LH; }
  labelUl(doc, "Signature:  ", values.party2Signature || "", M, y); y += LH;
  doc.text("Date: " + new Date().toLocaleDateString(), M, y); y += LH;

  // Witness (optional)
  if (values.witnessName) {
    y += 8;
    checkPage(15);
    doc.text("Witness: _______________________________", M, y); y += LH;
    labelUl(doc, "Name:  ", values.witnessName, M, y);
  }

  // ── FOOTER ───────────────────────────────────────────────────────────────
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated by Legalgram  •  ${new Date().toLocaleDateString()}`, PW / 2, 288, { align: "center" });

  doc.save("business_agreement.pdf");
};

export default function BusinessAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Business Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="businessagreement"
    />
  );
}