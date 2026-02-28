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
      { name: "effectiveDate", label: "What is the effective date of this agreement?", type: "date", required: true },
    ],
  },
  {
    label: "First Party Name",
    fields: [
      { name: "party1Name", label: "What is the full legal name of the first party?", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party1Type", label: "Is this party an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
    ],
  },
  {
    label: "First Party Address",
    fields: [
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "First Party Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Second Party Name",
    fields: [
      { name: "party2Name", label: "What is the full legal name of the second party?", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party2Type", label: "Is this party an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
    ],
  },
  {
    label: "Second Party Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Second Party Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Agreement Details",
    fields: [
      { name: "description", label: "Describe the purpose and scope of this agreement", type: "textarea", required: true, placeholder: "Provide a detailed description of the agreement terms..." },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      { name: "duration", label: "What is the duration of this agreement?", type: "select", required: true, options: [{ value: "1month", label: "1 Month" }, { value: "3months", label: "3 Months" }, { value: "6months", label: "6 Months" }, { value: "1year", label: "1 Year" }, { value: "2years", label: "2 Years" }, { value: "5years", label: "5 Years" }, { value: "indefinite", label: "Indefinite/Ongoing" }, { value: "custom", label: "Custom Duration" }] },
      { name: "terminationNotice", label: "How much notice is required to terminate?", type: "select", required: true, options: [{ value: "immediate", label: "Immediate" }, { value: "7days", label: "7 Days" }, { value: "14days", label: "14 Days" }, { value: "30days", label: "30 Days" }, { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" }] },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "paymentAmount", label: "What is the payment amount (if applicable)?", type: "text", required: false, placeholder: "$0.00" },
      { name: "paymentSchedule", label: "Payment Schedule", type: "select", required: false, options: [{ value: "onetime", label: "One-time Payment" }, { value: "weekly", label: "Weekly" }, { value: "biweekly", label: "Bi-weekly" }, { value: "monthly", label: "Monthly" }, { value: "quarterly", label: "Quarterly" }, { value: "annually", label: "Annually" }, { value: "milestone", label: "Milestone-based" }] },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      { name: "confidentiality", label: "Include confidentiality clause?", type: "select", required: true, options: [{ value: "yes", label: "Yes - Include confidentiality provisions" }, { value: "no", label: "No - Not needed" }] },
      { name: "disputeResolution", label: "How should disputes be resolved?", type: "select", required: true, options: [{ value: "mediation", label: "Mediation" }, { value: "arbitration", label: "Binding Arbitration" }, { value: "litigation", label: "Court Litigation" }, { value: "negotiation", label: "Good Faith Negotiation First" }] },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      { name: "additionalTerms", label: "Any additional terms or special conditions?", type: "textarea", required: false, placeholder: "Enter any additional terms, conditions, or special provisions..." },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      { name: "party1Signature", label: "First Party Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Signature", label: "Second Party Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "witnessName", label: "Witness Name (Optional)", type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 25;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const party1Address = [values.party1Street, values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const party2Address = [values.party2Street, values.party2City, values.party2Zip].filter(Boolean).join(", ");
  const jurisdiction  = [values.state, values.country?.toUpperCase()].filter(Boolean).join(", ");

  const scheduleMap: Record<string, string> = { "onetime": "one-time", "weekly": "weekly", "biweekly": "bi-weekly", "monthly": "monthly", "quarterly": "quarterly", "annually": "annual", "milestone": "milestone-based" };

  const para = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 3;
  };

  // TITLE
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "PROMISSORY NOTE LETTER";
  const titleWidth = doc.getTextWidth(title);
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, y);
  doc.setLineWidth(0.5);
  doc.line(titleX, y + 1.5, titleX + titleWidth, y + 1.5);
  y += 11;

  // HEADER FIELDS
  const field = (label: string, value: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(label, margin, y);
    const lw = doc.getTextWidth(label);
    const val = value || "N/A";
    doc.text(val, margin + lw, y);
    doc.setLineWidth(0.3);
    doc.line(margin + lw, y + 1.2, margin + lw + Math.max(doc.getTextWidth(val), 35), y + 1.2);
    y += 6;
  };

  field("Date:  ", values.effectiveDate || "N/A");
  field("To:  ", values.party2Name || "N/A");
  field("Address:  ", party2Address || "N/A");
  field("State/Province:  ", jurisdiction || "N/A");
  y += 3;

  // SUBJECT
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Subject: Promissory Note", margin, y);
  y += 7;

  // SALUTATION
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Dear ${values.party2Name || "Sir or Madam"},`, margin, y);
  y += 6;

  // LENDER / BORROWER lines with underlines
  const lenderName   = values.party1Name || "the Lender";
  const borrowerName = values.party2Name || "the Borrower";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const lenderLabel = "Lender:  ";
  doc.text(lenderLabel, margin, y);
  const llw = doc.getTextWidth(lenderLabel);
  doc.text(lenderName, margin + llw, y);
  doc.setLineWidth(0.3);
  doc.line(margin + llw, y + 1.2, margin + llw + doc.getTextWidth(lenderName), y + 1.2);
  y += 6;

  const borrowerLabel = "Borrower:  ";
  doc.text(borrowerLabel, margin, y);
  const blw = doc.getTextWidth(borrowerLabel);
  doc.text(borrowerName, margin + blw, y);
  doc.line(margin + blw, y + 1.2, margin + blw + doc.getTextWidth(borrowerName), y + 1.2);
  y += 8;

  // BODY
  para("This Promissory Note confirms that the Borrower promises to pay the Lender the amount described below under the terms and conditions outlined in this document.");

  if (values.description?.trim()) para(values.description.trim());

  para(`The Borrower agrees to repay${values.paymentAmount ? ` the principal amount of ${values.paymentAmount}` : " the full principal amount"} according to a ${scheduleMap[values.paymentSchedule] || values.paymentSchedule || "mutually agreed"} payment schedule until the total balance has been paid in full.`);

  para("The Borrower agrees to repay the full amount of principal and any accrued interest according to the terms stated above. If the Borrower fails to make any required payment when due, the Lender may declare the entire unpaid balance immediately due and payable, subject to applicable law.");

  para("Any modification to this Promissory Note must be made in writing and signed by both parties.");

  if (values.additionalTerms?.trim()) para(values.additionalTerms.trim());

  para("This document serves as a formal and legally binding promise to repay the debt described herein. Both parties should retain a copy for their records.");

  y += 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Thank you for your cooperation.", margin, y);
  y += 8;
  doc.text("Sincerely,", margin, y);
  y += 12;

  // SENDER BLOCK
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  const senderName = values.party1Name || "Lender";
  doc.text(senderName, margin, y);
  doc.setLineWidth(0.3);
  doc.line(margin, y + 1.2, margin + doc.getTextWidth(senderName), y + 1.2);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  if (party1Address)      { doc.text(party1Address,                  margin, y); y += 5; }
  if (values.party1Email) { doc.text(`Email: ${values.party1Email}`, margin, y); y += 5; }
  if (values.party1Phone) { doc.text(`Phone: ${values.party1Phone}`, margin, y); y += 5; }

  // SIGNATURES
  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Lender Signature:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(values.party1Signature || "________________________", margin + doc.getTextWidth("Lender Signature:  "), y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text("Borrower Signature:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(values.party2Signature || "________________________", margin + doc.getTextWidth("Borrower Signature:  "), y);
  y += 7;
  if (values.witnessName) {
    doc.setFont("helvetica", "bold");
    doc.text("Witness:", margin, y);
    doc.setFont("helvetica", "normal");
    const wx = margin + doc.getTextWidth("Witness:  ");
    doc.text(values.witnessName, wx, y);
    doc.setLineWidth(0.3);
    doc.line(wx, y + 1.2, wx + doc.getTextWidth(values.witnessName), y + 1.2);
  }

  doc.save("promissory_note.pdf");
};

export default function PromissoryNoteForm() {
  return (
    <FormWizard
      steps={steps}
      title="Promissory Note"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="PromissoryNote"
    />
  );
}