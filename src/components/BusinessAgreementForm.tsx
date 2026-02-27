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
          if (value=== "us") {
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

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = 210;
  const margin = 20;
  const textWidth = pageWidth - margin * 2;
  const fs = 10.5;  // base font size
  const lh = 5.5;   // base line height
  let y = 22;

  // ── helpers ──────────────────────────────────────────────────────────────────

  // "Label:  _value_" row with underline under value
  const labeledField = (label: string, value: string, minUnderlineW = 55) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fs);
    doc.setTextColor(20, 20, 20);
    doc.text(label, margin, y);
    const lw = doc.getTextWidth(label);
    const vx = margin + lw + 2;
    const display = value || "";
    if (display) doc.text(display, vx, y);
    const uw = display ? doc.getTextWidth(display) : minUnderlineW;
    doc.setDrawColor(20, 20, 20);
    doc.line(vx, y + 1, vx + uw, y + 1);
    y += lh + 1.5;
  };

  // Plain paragraph
  const para = (text: string, bold = false, extraAfter = 0) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(fs);
    doc.setTextColor(20, 20, 20);
    const lines = doc.splitTextToSize(text, textWidth);
    doc.text(lines, margin, y);
    y += lines.length * lh + extraAfter;
  };

  // ── TITLE ────────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  const title = "BUSINESS AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  const tx = pageWidth / 2 - tw / 2;
  doc.setDrawColor(0, 0, 0);
  doc.line(tx, y + 1.5, tx + tw, y + 1.5);
  y += 12;

  // ── HEADER FIELDS ────────────────────────────────────────────────────────────
  const jurisdiction = [values.state, values.country?.toUpperCase()].filter(Boolean).join(", ");
  labeledField("Date:", values.effectiveDate || "");
  labeledField("Jurisdiction:", jurisdiction);
  y += 3;

  // ── SUBJECT ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(fs);
  doc.setTextColor(0, 0, 0);
  doc.text("Subject: Business Agreement Between Parties", margin, y);
  y += lh + 4;

  // ── PARTIES ──────────────────────────────────────────────────────────────────
  para("Dear Sir or Madam,", false, lh);

  const p1addr = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const p2addr = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");

  para(
    `This Business Agreement ("Agreement") is entered into as of ${values.effectiveDate || "the date signed"}, ` +
    `by and between ${values.party1Name || "First Party"} ` +
    `(${values.party1Type === "business" ? "Business/Company" : "Individual"}), ` +
    `located at ${p1addr || "N/A"}, Email: ${values.party1Email || "N/A"}` +
    `${values.party1Phone ? ", Phone: " + values.party1Phone : ""} ("First Party"); and ` +
    `${values.party2Name || "Second Party"} ` +
    `(${values.party2Type === "business" ? "Business/Company" : "Individual"}), ` +
    `located at ${p2addr || "N/A"}, Email: ${values.party2Email || "N/A"}` +
    `${values.party2Phone ? ", Phone: " + values.party2Phone : ""} ("Second Party").`,
    false,
    lh
  );

  // ── AGREEMENT DETAILS ────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(fs);
  doc.setTextColor(0, 0, 0);
  doc.text("1. PURPOSE AND SCOPE", margin, y);
  y += lh + 1;
  para(values.description || "N/A", false, lh);

  // ── TERMS ────────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(fs);
  doc.setTextColor(0, 0, 0);
  doc.text("2. TERMS AND CONDITIONS", margin, y);
  y += lh + 1;
  para(
    `Duration: ${values.duration || "N/A"}.  Termination Notice: ${values.terminationNotice || "N/A"}.  ` +
    `Confidentiality: ${values.confidentiality === "yes" ? "Included" : "Not Included"}.  ` +
    `Dispute Resolution: ${values.disputeResolution || "N/A"}.`,
    false,
    lh
  );

  // ── FINANCIAL TERMS ──────────────────────────────────────────────────────────
  if (values.paymentAmount || values.paymentSchedule) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fs);
    doc.setTextColor(0, 0, 0);
    doc.text("3. FINANCIAL TERMS", margin, y);
    y += lh + 1;
    para(
      `Payment Amount: ${values.paymentAmount || "N/A"}.  Schedule: ${values.paymentSchedule || "N/A"}.`,
      false,
      lh
    );
  }

  // ── ADDITIONAL TERMS ─────────────────────────────────────────────────────────
  if (values.additionalTerms) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fs);
    doc.setTextColor(0, 0, 0);
    doc.text("4. ADDITIONAL TERMS", margin, y);
    y += lh + 1;
    // cap to 2 lines to stay on one page
    const addAllLines = doc.splitTextToSize(values.additionalTerms, textWidth);
    const addLines = addAllLines.slice(0, 2);
    doc.setFont("helvetica", "normal");
    doc.text(addLines, margin, y);
    y += addLines.length * lh + lh;
  }

  para(
    "IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.",
    false,
    lh + 2
  );

  // ── SIGNATURES ───────────────────────────────────────────────────────────────
  para("Sincerely,", false, lh + 2);

  // First Party signature
  const sig1 = values.party1Signature || values.party1Name || "";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(fs);
  doc.setTextColor(0, 0, 0);
  doc.text(sig1, margin, y);
  if (sig1) {
    const sw = doc.getTextWidth(sig1);
    doc.setDrawColor(0, 0, 0);
    doc.line(margin, y + 1, margin + sw, y + 1);
  }
  y += lh + 1;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(fs);
  para(`${values.party1Name || "First Party"} — First Party`, false, 1);
  if (p1addr) para(p1addr, false, 1);
  if (values.party1Email) para(`Email: ${values.party1Email}`, false, 1);
  y += 3;

  // Second Party signature
  const sig2 = values.party2Signature || values.party2Name || "";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(fs);
  doc.setTextColor(0, 0, 0);
  doc.text(sig2, margin, y);
  if (sig2) {
    const sw2 = doc.getTextWidth(sig2);
    doc.setDrawColor(0, 0, 0);
    doc.line(margin, y + 1, margin + sw2, y + 1);
  }
  y += lh + 1;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(fs);
  para(`${values.party2Name || "Second Party"} — Second Party`, false, 1);
  if (p2addr) para(p2addr, false, 1);
  if (values.party2Email) para(`Email: ${values.party2Email}`, false, 1);
  y += 3;

  // Witness (optional)
  if (values.witnessName) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fs);
    doc.text(values.witnessName, margin, y);
    const ww = doc.getTextWidth(values.witnessName);
    doc.setDrawColor(0, 0, 0);
    doc.line(margin, y + 1, margin + ww, y + 1);
    y += lh + 1;
    doc.setFont("helvetica", "normal");
    para("Witness", false, 1);
  }

  // ── FOOTER ───────────────────────────────────────────────────────────────────
  doc.setFontSize(7);
  doc.setTextColor(160, 160, 160);
  doc.text(
    `Generated by Legalgram  •  ${new Date().toLocaleDateString()}`,
    pageWidth / 2,
    290,
    { align: "center" }
  );

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
