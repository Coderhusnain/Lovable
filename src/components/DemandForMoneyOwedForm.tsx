import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction & Date",
    fields: [
      {
        name: "country",
        label: "Which country's laws will govern this document?",
        type: "select",
        required: true,
        options: [{ value: "us", label: "United States" }],
      },
      {
        name: "state",
        label: "Which state?",
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
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
    ],
  },
  {
    label: "Parties Involved",
    fields: [
      { name: "party1Name", label: "Creditor Full Legal Name", type: "text", required: true },
      { name: "party1Street", label: "Creditor Street Address", type: "text", required: true },
      { name: "party1City", label: "Creditor City", type: "text", required: true },
      { name: "party1Zip", label: "Creditor ZIP Code", type: "text", required: true },
      { name: "party2Name", label: "Debtor Full Legal Name", type: "text", required: true },
      { name: "party2Street", label: "Debtor Street Address", type: "text", required: true },
      { name: "party2City", label: "Debtor City", type: "text", required: true },
      { name: "party2Zip", label: "Debtor ZIP Code", type: "text", required: true },
    ],
  },
  {
    label: "Debt & Payment Details",
    fields: [
      { name: "debtAmount", label: "Amount Owed ($)", type: "text", required: true },
      { name: "description", label: "Debt Description (Goods/Services/Loans)", type: "textarea", required: true },
      { name: "paymentDeadline", label: "Payment Deadline Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const textWidth = pageWidth - margin * 2;
  let y = 20;

  const checkPageBreak = (space = 10) => {
    if (y + space > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const addParagraph = (text: string, bold = false, fontSize = 10) => {
    checkPageBreak(10);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, textWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 2;
  };

  // Title and Aliases [cite: 29-35]
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("DEMAND FOR MONEY OWED", pageWidth / 2, y, { align: "center" });
  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("(Also known as: Demand Letter, Collection Letter, Money Owed Letter)", pageWidth / 2, y, { align: "center" });
  y += 12;

  // Header [cite: 50]
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Date: ${values.effectiveDate || ""}`, margin, y); y += 6;
  doc.text(`To: ${values.party2Name || ""}`, margin, y); y += 5;
  doc.text(`${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`, margin, y);
  y += 10;

  // Subject and Definition [cite: 37, 54]
  addParagraph("Subject: Formal Demand for Payment and Notice of Potential Legal Action", true);
  
  // Body Content [cite: 37, 38, 51, 52]
  addParagraph(`This is a formal written document used to request repayment of money that is owed to ${values.party1Name || "the Creditor"}. This letter provides official notice that payment is due.`);
  
  addParagraph("DEBT DESCRIPTION:", true);
  addParagraph(values.description || "No description provided.");

  addParagraph("PAYMENT DETAILS:", true);
  addParagraph(`Total Amount Owed: $${values.debtAmount || "0.00"}`);
  addParagraph(`Payment Deadline: ${values.paymentDeadline || "Immediate"}`);

  // Legal Compliance & Warnings [cite: 41, 46, 55]
  addParagraph("LEGAL NOTICE:", true);
  addParagraph("Failure to make payment by the deadline specified above may result in legal action being considered to recover the debt. This letter ensures compliance with applicable state laws and federal regulations such as the Fair Debt Collection Practices Act.");

  // Signature [cite: 40]
  y += 10;
  addParagraph("Sincerely,");
  y += 5;
  addParagraph("__________________________");
  addParagraph(`${values.party1Name || "Creditor Name"}`);
  addParagraph("Creditor / Authorized Representative");

  // Appendix: Information & Checklist 
  y += 15;
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;
  addParagraph("DOCUMENT STEPS & CHECKLIST", true, 11);
  addParagraph("1. Make the Document: Answered questions to customize terms. [cite: 77]");
  addParagraph("2. Review: Ensure amounts, deadlines, and legal notices are correct. [cite: 78]");
  addParagraph("3. Sign: Use secure signing for all parties. [cite: 79]");
  addParagraph("4. Records: Maintain copies of this signed letter and all related correspondence. [cite: 80]");
  addParagraph("5. Follow Up: Initiate legal action if the deadline is not met. [cite: 81]");

  doc.save("demand_for_money_owed.pdf");
};

export default function DemandForMoneyOwedForm() {
  return (
    <FormWizard
      steps={steps}
      title="Demand for Money Owed"
      subtitle="Create a professional collection letter compliant with debt regulations"
      onGenerate={generatePDF}
      documentType="demandforowedmoney"
    />
  );
}