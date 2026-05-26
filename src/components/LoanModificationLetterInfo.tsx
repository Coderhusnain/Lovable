import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Borrower Information",
    fields: [
      { name: "fullName", label: "Full legal name", type: "text", required: false },
      { name: "address", label: "Mailing address", type: "textarea", required: false },
      { name: "phone", label: "Phone number", type: "text", required: false },
      { name: "email", label: "Email address", type: "email", required: false },
    ],
  },
  {
    label: "Loan Details",
    fields: [
      { name: "lenderName", label: "Lender or servicer name", type: "text", required: false },
      { name: "loanNumber", label: "Loan or account number", type: "text", required: false },
      { name: "loanApprovalDate", label: "Loan approval date", type: "date", required: false },
      { name: "originalGrossMonthlyIncome", label: "Original gross monthly income", type: "text", required: false },
      { name: "originalRequiredMonthlyPayment", label: "Original required monthly payment", type: "text", required: false },
      { name: "currentPayment", label: "Current monthly payment", type: "text", required: false },
      { name: "requestedPayment", label: "Requested monthly payment", type: "text", required: false },
    ],
  },
  {
    label: "Hardship",
    fields: [
      { name: "hardshipReason", label: "Brief description of hardship", type: "textarea", required: false },
      { name: "incomeChange", label: "Change in income (amount/description)", type: "textarea", required: false },
      { name: "furloughDate", label: "Date furloughed / lost income began", type: "date", required: false },
    ],
  },
  {
    label: "Request Details",
    fields: [
      { name: "paymentFrequency", label: "Payment frequency (e.g., monthly)", type: "text", required: false },
      { name: "reliefRequested", label: "What relief are you requesting?", type: "textarea", required: false },
      { name: "contactPhone", label: "Contact phone", type: "text", required: false },
      { name: "contactAlternate", label: "Alternate contact (email or other)", type: "text", required: false },
      { name: "additionalNotes", label: "Additional notes", type: "textarea", required: false },
    ],
  },
];

const line = (value?: string) => (value || "").trim() || "________________________________________";

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const width = 210;
  const margin = 16;
  const textWidth = width - margin * 2;
  const lineHeight = 5.3;
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

  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "Loan Modification Letter";
  doc.text(title, width / 2, y, { align: "center" });
  y += 10;

  write(`Date: ${new Date().toLocaleDateString()}`);
  write("");
  write(values.lenderName || "[Lender/Servicer Name]");
  write(values.address || "[Lender Address]");
  write("");
  write(`Re: Request for Loan Modification — Loan/Account No. ${values.loanNumber || "__________________________"}`);
  write("");
  write("To Whom It May Concern,");
  write("");
  write("I respectfully submit this letter to formally request a modification of the repayment terms applicable to my loan account numbered " + (values.loanNumber || "__________________________") + ".");
  write("");
  write("At the time of loan approval on " + (values.loanApprovalDate || "____________________") + ", my gross monthly income was approximately " + (values.originalGrossMonthlyIncome || "$__________") + ", and my required monthly payment was " + (values.originalRequiredMonthlyPayment || "$______________") + ". Due to unforeseen financial hardship, I am presently without employment income as of " + (values.furloughDate || "________________________") + ", having been furloughed from my position. As a result, I am no longer able to meet the existing payment obligations under the current loan agreement.");
  write("");
  write("After careful review of my present financial circumstances, including income and necessary living expenses, I find myself unable to continue payments at the current amount. Accordingly, I respectfully request that my monthly payment be modified from " + (values.currentPayment || "$__________________") + " to " + (values.requestedPayment || "$__________________") + ", payable " + (values.paymentFrequency || "________________________") + ".");
  write("");
  write("Enclosed herewith are supporting financial documents evidencing my reduced income and financial hardship.");
  write("");
  write("Should you require any additional information or documentation to evaluate this request, I may be contacted at " + (values.contactPhone || "________________________") + " or " + (values.contactAlternate || "________________________") + ".");
  write("");
  write("Thank you for your time, consideration, and cooperation in this matter.");
  write("");
  write("Respectfully submitted,");
  write("");
  write("[Signature]");
  write("[Printed Name]");
  write("Date: " + (values.additionalNotes || "________________________"));

  write("\nLoan Modification Letter – Compliance Checklist", true);
  write("☐ The borrower must sign the letter", false);
  write("☐ Attach all relevant financial documentation supporting hardship", false);
  write("☐ Provide copies to all parties named in the correspondence", false);
  write("☐ Retain complete copies for personal records", false);

  doc.save("loan_modification_letter.pdf");
};

export default function LoanModificationLetterInfo() {
  return (
    <FormWizard
      steps={steps}
      title="Loan Modification Letter"
      subtitle="Request a modification to loan repayment terms"
      onGenerate={generatePDF}
      documentType="loan-modification-letter"
    />
  );
}
