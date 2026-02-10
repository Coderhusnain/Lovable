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
  const doc = new jsPDF();

  // ===== PAGE SETUP =====
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const textWidth = pageWidth - margin * 2;
  let y = 20;

  // ===== AUTO PAGE BREAK =====
  const checkPageBreak = (space = 10) => {
    if (y + space > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // ===== UNDERLINED FIELD (Date / To / Address) =====
  const addUnderlinedField = (
    label: string,
    value: string,
    minWidth = 60
  ) => {
    checkPageBreak();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(label, margin, y);
    const labelWidth = doc.getTextWidth(label);

    const startX = margin + labelWidth + 2;
    const display = value || "";

    if (display) {
      doc.text(display, startX, y);
    }

    const width = display
      ? doc.getTextWidth(display)
      : minWidth;

    doc.line(startX, y + 1, startX + width, y + 1);

    y += 8;
  };

  // ===== PARAGRAPH (tight spacing) =====
  const addParagraph = (text: string, bold = false) => {
    checkPageBreak(10);

    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(text, textWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 2; // tight spacing
  };

  // ===== PARAGRAPH WITH UNDERLINED VALUE (wrapped safe) =====
  const addParagraphWithUnderline = (
    before: string,
    value: string,
    after: string
  ) => {
    const fullText = `${before}${value}${after}`;
    const lines = doc.splitTextToSize(fullText, textWidth);

    lines.forEach((line: string) => {
      checkPageBreak(8);

      doc.text(line, margin, y);

      if (line.includes(value)) {
        const beforeText = line.substring(0, line.indexOf(value));
        const startX = margin + doc.getTextWidth(beforeText);
        const valueWidth = doc.getTextWidth(value);
        doc.line(startX, y + 1, startX + valueWidth, y + 1);
      }

      y += 6;
    });

    y += 2;
  };

  // ===== TITLE =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);

  const title = "  Promissory Note Due on a Specific Date Letter";
  doc.text(title, pageWidth / 2, y, { align: "center" });

  const titleWidth = doc.getTextWidth(title);
  const titleX = pageWidth / 2 - titleWidth / 2;
  doc.line(titleX, y + 2, titleX + titleWidth, y + 2);

  y += 15;

  // ===== DATE / TO / ADDRESS =====
  addUnderlinedField("Date:", values.effectiveDate || "", 50);

  addUnderlinedField("To:", values.party2Name || "", 100);

  const address = `${values.party2Street || ""}, ${
    values.party2City || ""
  } ${values.party2Zip || ""}`.trim();

  addUnderlinedField("Address:", address, 120);

  y += 4;
// ===== SUBJECT =====
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.text(
  "Subject: Promissory Note Due on a Specific Date",
  margin,
  y
);
y += 10;

// ===== GREETING =====
addParagraph("Dear Sir or Madam:");

// ===== BODY =====

// Parties
const lenderName = values.party1Name || "________";
const borrowerName = values.party2Name || "________";



// Identification
addParagraphWithUnderline(
  "Lender: ",
  lenderName,
  ""
);

addParagraphWithUnderline(
  "Borrower: ",
  borrowerName,
  ""
);


// Introduction
addParagraph(
  "This Promissory Note documents the Borrower’s promise to repay the loan described below to the Lender under the terms specified in this agreement."
);



// Promise to pay
addParagraph(
  "The Borrower promises to pay the full principal amount, together with any accrued interest, to the Lender on or before the due date stated above."
);

// Prepayment
addParagraph(
  "The Borrower may prepay all or any portion of the outstanding balance prior to the due date without penalty, unless otherwise agreed in writing."
);

// Default clause
addParagraph(
  "If payment is not made by the due date, the Lender may declare the entire outstanding balance immediately due and payable and may pursue any remedies available under applicable law."
);

// Modification clause
addParagraph(
  "Any modification to this Promissory Note must be made in writing and agreed to by both parties."
);

// Closing
addParagraph(
  "This document serves as a formal record of the Borrower’s obligation to repay the loan on the specified date. Please retain a copy for your records."
);

addParagraph(
  "Thank you for your attention to this matter."
);

  y += 6;
  addParagraph("Sincerely,");

  y += 10;

  // ===== SIGNATURE =====
  checkPageBreak();

  doc.setFont("helvetica", "bold");
  const name = values.party1Name || "";
  doc.text(name, margin, y);

  if (name) {
    const nameWidth = doc.getTextWidth(name);
    doc.line(margin, y + 1, margin + nameWidth, y + 1);
  }

  y += 8;

  doc.setFont("helvetica", "normal");
  addParagraph(
    `${values.party1Street || ""}, ${values.party1City || ""} ${
      values.party1Zip || ""
    }`
  );

  addParagraph(`Email: ${values.party1Email || ""}`);

  if (values.party1Phone) {
    addParagraph(`Phone: ${values.party1Phone}`);
  }

  // ===== SAVE =====
  doc.save("PromissoryNotedueonSpecificdate.pdf");
};
export default function PromissoryNoteDueOnSpecificDateForm() {
  return (
    <FormWizard
      steps={steps}
      title="Promissory Note Due on specific Date"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="PromissoryNotedueonSpecificdate"
    />
  );
}
