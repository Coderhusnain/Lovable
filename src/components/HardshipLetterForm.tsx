import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Loan Details",
    fields: [
      { name: "loanAccountNumber", label: "Loan account number", type: "text", required: false },
      { name: "approvalDate", label: "Loan approval date", type: "text", required: false },
      { name: "grossMonthlyIncome", label: "Gross monthly income at approval", type: "text", required: false },
      { name: "requiredMonthlyPayment", label: "Required monthly loan payment", type: "text", required: false },
    ],
  },
  {
    label: "Hardship Details",
    fields: [
      { name: "furloughDate", label: "Date furloughed / without employment income", type: "text", required: false },
      { name: "reducedPaymentFrom", label: "Proposed payment reduction from", type: "text", required: false },
      { name: "reducedPaymentTo", label: "Proposed payment reduction to", type: "text", required: false },
      { name: "paymentSchedule", label: "Proposed payment schedule", type: "text", required: false },
      { name: "supportingDocs", label: "Supporting documents", type: "textarea", required: false },
    ],
  },
  {
    label: "Contact Information",
    fields: [
      { name: "contactPhone", label: "Phone", type: "text", required: false },
      { name: "contactEmail", label: "Email", type: "text", required: false },
      { name: "contactAddress", label: "Address", type: "textarea", required: false },
    ],
  },
];

const txt = (value?: string) => (value || "").trim();

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const width = 210;
  const margin = 16;
  const textWidth = width - margin * 2;
  const lineHeight = 5.2;
  let y = 18;

  const ensureSpace = (needed = 8) => {
    if (y + needed > 282) {
      doc.addPage();
      y = 18;
    }
  };

  const write = (content: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(content, textWidth);
    ensureSpace(lines.length * lineHeight + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  // Centered main title
  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const _title4 = "Hardship Letter";
  doc.text(_title4, width / 2, y, { align: "center" });
  y += 10;
  write("To Whom It May Concern,");
  write(`I write to formally request financial hardship assistance in connection with my loan account numbered ${txt(values.loanAccountNumber) || "__________________________"}.`);
  write(`At the time my loan was approved on ${txt(values.approvalDate) || "______________________"}, my gross monthly income was approximately $${txt(values.grossMonthlyIncome) || "__________"}, and my required monthly loan payment was $${txt(values.requiredMonthlyPayment) || "______________"}.`);
  write(`Due to unforeseen circumstances, I am presently without employment income as of ${txt(values.furloughDate) || "__________________________"}, having been furloughed from my position. As a result, I am no longer able to meet the existing payment obligations under the current loan terms.`);
  write(`Based upon my present financial condition, including reduced income and ongoing necessary living expenses, I respectfully request a temporary modification of my payment arrangement. Specifically, I propose that my monthly payment be reduced from $${txt(values.reducedPaymentFrom) || "__________________"} to $${txt(values.reducedPaymentTo) || "__________________"}, to be paid ${txt(values.paymentSchedule) || "__________________________"}.`);
  write("Enclosed herewith are supporting documents demonstrating my current financial hardship and reduced capacity to make payments.");
  write(`Should you require any additional information or clarification, I may be contacted at ${txt(values.contactPhone) || "__________________________"} or ${txt(values.contactEmail) || "__________________________"}.`);
  write("Thank you for your time, understanding, and consideration of this request.");
  write("Respectfully submitted,");
  write("[Signature]");
  write("[Printed Name]");
  write("Date: __________________________");

  write("Final Checklist - Hardship Letter", true, 2.2);
  write("Requesting Party: __________________________");
  write("Execution");
  write("- The letter must be signed. Witnessing or notarization is not required.");
  write("Supporting Documentation");
  write("- Attach copies of all relevant documents showing the hardship, where applicable.");
  write("Copies");
  write("- Send the original signed letter to the lender or loan servicer.");
  write("- Submit copies of supporting documents unless an original is specifically required.");
  write("- Retain a complete copy of the letter and all enclosures for your records.");
  write("Additional Guidance");
  write("- Sending the letter via a trackable delivery method is strongly recommended.");
  write("- Follow up after a reasonable period to confirm receipt and review of the request.");

  doc.save("hardship_letter.pdf");
};

export default function HardshipLetterForm() {
  return <FormWizard steps={steps} title="Hardship Letter" subtitle="Complete the fields to generate the hardship assistance request" onGenerate={generatePDF} documentType="hardship-letter" />;
}
