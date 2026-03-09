import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Installment Note Details",
    fields: [
      { name: "loanAmount", label: "Loan amount", type: "text", required: false },
      { name: "installmentSchedule", label: "Installment schedule", type: "text", required: false },
      { name: "interestRate", label: "Interest rate", type: "text", required: false },
      { name: "finalDueDate", label: "Final due date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  const limit = 280;
  let y = 20;

  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "PROMISSORY NOTE WITH INSTALLMENT PAYMENTS AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  if (values.loanAmount) p(`Loan Amount: ${values.loanAmount}`);
  if (values.installmentSchedule) p(`Installment Schedule: ${values.installmentSchedule}`);
  if (values.interestRate) p(`Interest Rate: ${values.interestRate}`);
  if (values.finalDueDate) p(`Final Due Date: ${values.finalDueDate}`, false, 3);

  p("Other Names:", true);
  p("- Note Payable with Installment Payments");
  p("- Installment Promissory Note", false, 3);

  p("What is a Promissory Note with Installment Payments?", true);
  p("A Promissory Note with Installment Payments Agreement is a legal lending contract that outlines loan terms to be repaid in installments. It specifies consistent, equal payments over the loan term, including interest and repayment obligations.");
  p("Whether you are lender or borrower, using this agreement from Legalgram ensures all parties understand expectations. It simplifies loan administration and reduces disputes.");
  p("Download Promissory Note with Installment Payments on Legalgram for a legally enforceable document in the best format.", false, 3);

  p("When to Use a Promissory Note with Installment Payments", true);
  p("- You are a lender who prefers borrower repayment in installments.");
  p("- You are a borrower agreeing to installment repayment.");
  p("- You operate a lending business or manage a loan company.", false, 3);

  p("Key Features", true);
  p("- Clearly defines loan amount and installment schedule.");
  p("- Specifies interest rate and payment obligations.");
  p("- Outlines due dates for each installment.");
  p("- Legally binding and enforceable.");
  p("- Can be reviewed by legal professionals.");
  p("- Supports secure online signing.");
  p("- Downloadable in PDF or Word.");
  p("This agreement protects both parties and reduces repayment disputes.", false, 3);

  p("FAQs", true);
  p("How can I prepare one online?");
  p("1. Make your document by answering a few questions.");
  p("2. Send/share and discuss with counsel if needed.");
  p("3. Sign it electronically.");
  p("Do I need an attorney?");
  p("Not necessarily, but legal review is useful if needed.");
  p("Does it need notarization or witnesses?");
  p("Generally not required, though optional for added assurance.");
  p("Can I edit the document?");
  p("Yes. You can edit, save as PDF/Word, print, and sign.", false, 3);

  p("Related Documents on Legalgram", true);
  p("- Letter to Request a Credit Reference");
  p("- Request for Bank or Credit Reference");
  p("- Promissory Note Due on a Specific Date");
  p("- Note Payable");
  p("Download your Promissory Note with Installment Payments agreement on Legalgram for a professional enforceable format.");

  doc.save("promissory_note_installment_payments.pdf");
};

export default function InstallmentPromissoryNoteForm() {
  return (
    <FormWizard
      steps={steps}
      title="Promissory Note with Installment Payments"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="installmentpromissorynote"
    />
  );
}
