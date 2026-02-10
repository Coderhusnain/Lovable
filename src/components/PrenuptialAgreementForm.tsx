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
    label: "Effective Date",
    fields: [
      {
        name: "effectiveDate",
        label: "What is the effective date of this document?",
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
        type: "phone",
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
        type: "phone",
        required: false,
        placeholder: "(555) 123-4567",
      },
    ],
  },
  {
    label: "Document Details",
    fields: [
      {
        name: "description",
        label: "Describe the purpose and details of this document",
        type: "textarea",
        required: true,
        placeholder: "Provide a detailed description...",
      },
    ],
  },
  {
    label: "Terms & Duration",
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
        placeholder: "Enter any additional terms...",
      },
    ],
  },
  {
    label: "Signatures",
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
  const doc = new jsPDF();

  // ===== PAGE SETUP =====
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const textWidth = pageWidth - margin * 2;
  let y = 25;

  // ===== AUTO PAGE BREAK =====
  const checkPageBreak = (space = 10) => {
    if (y + space > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // ===== UNDERLINED FIELD =====
  const addUnderlinedField = (label: string, value: string, minWidth = 80) => {
    checkPageBreak();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(label, margin, y);
    const labelWidth = doc.getTextWidth(label);
    const startX = margin + labelWidth + 3;
    const display = value || "";

    if (display) doc.text(display, startX, y);

    const width = display ? doc.getTextWidth(display) : minWidth;
    doc.line(startX, y + 1, startX + width, y + 1);

    y += 9;
  };

  // ===== PARAGRAPH =====
  const addParagraph = (text: string, bold = false) => {
    checkPageBreak(12);

    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(text, textWidth);
    doc.text(lines, margin, y);
    y += lines.length * 6 + 3;
  };

  // ===== PARAGRAPH WITH UNDERLINE =====
  const addParagraphWithUnderline = (before: string, value: string, after: string) => {
    const full = `${before}${value}${after}`;
    const lines = doc.splitTextToSize(full, textWidth);

    lines.forEach((line: string) => {
      checkPageBreak(10);
      doc.text(line, margin, y);

      if (value && line.includes(value)) {
        const beforeText = line.substring(0, line.indexOf(value));
        const startX = margin + doc.getTextWidth(beforeText);
        const valueWidth = doc.getTextWidth(value);
        doc.line(startX, y + 1, startX + valueWidth, y + 1);
      }

      y += 7;
    });

    y += 2;
  };

  // ===== TITLE =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);

  const title = "PRENUPTIAL AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });

  const titleWidth = doc.getTextWidth(title);
  const titleX = pageWidth / 2 - titleWidth / 2;
  doc.line(titleX, y + 2, titleX + titleWidth, y + 2);

  y += 18;

  // ===== DATE / PARTIES =====
  addUnderlinedField("Date:", values.effectiveDate || "");
  addUnderlinedField("First Party:", values.party1Name || "");
  addUnderlinedField("Second Party:", values.party2Name || "");

  y += 6;

  const party1 = values.party1Name || "________";
  const party2 = values.party2Name || "________";

  // ===== BODY =====
  addParagraphWithUnderline(
    "This Prenuptial Agreement is entered into between ",
    party1,
    " and "
  );

  addParagraphWithUnderline(
    "",
    party2,
    " in contemplation of marriage."
  );

  addParagraph(
    "The parties desire to define their respective rights and obligations regarding property, assets, debts, income, and financial matters that may arise during the marriage or upon separation, divorce, or death."
  );

  addParagraph(
    "Each party agrees that all property owned individually before the marriage shall remain the separate property of that party unless otherwise agreed in writing."
  );

  addParagraph(
    "Any property acquired during the marriage shall be treated in accordance with the terms of this Agreement and applicable law."
  );

  addParagraph(
    "Each party acknowledges full disclosure of assets and liabilities and enters into this Agreement voluntarily and without coercion."
  );

  addParagraph(
    "This Agreement shall become effective upon the legal marriage of the parties and shall be governed by the laws of the selected jurisdiction."
  );

  addParagraph(
    "In witness whereof, the parties have executed this Prenuptial Agreement on the date first written above."
  );

  y += 6;
  addParagraph("Sincerely,");

  y += 12;

  // ===== SIGNATURES =====
  checkPageBreak();

  doc.setFont("helvetica", "bold");
  doc.text(party1, margin, y);
  const w1 = doc.getTextWidth(party1);
  doc.line(margin, y + 1, margin + w1, y + 1);

  y += 10;

  doc.setFont("helvetica", "normal");
  addParagraph(`${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`);
  addParagraph(`Email: ${values.party1Email || ""}`);

  if (values.party1Phone) addParagraph(`Phone: ${values.party1Phone}`);

  y += 12;

  doc.setFont("helvetica", "bold");
  doc.text(party2, margin, y);
  const w2 = doc.getTextWidth(party2);
  doc.line(margin, y + 1, margin + w2, y + 1);

  y += 10;

  doc.setFont("helvetica", "normal");
  addParagraph(`${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`);
  addParagraph(`Email: ${values.party2Email || ""}`);

  if (values.party2Phone) addParagraph(`Phone: ${values.party2Phone}`);

  // ===== SAVE =====
  doc.save("prenuptial_agreement.pdf");
};


export default function PrenuptialAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Prenuptial Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="prenuptialagreement"
    />
  );
}
