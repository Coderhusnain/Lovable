import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Note Payable Details",
    fields: [
      { name: "lenderName", label: "Lender name", type: "text", required: false },
      { name: "borrowerName", label: "Borrower name", type: "text", required: false },
      { name: "loanAmount", label: "Loan amount", type: "text", required: false },
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
  const title = "NOTE PAYABLE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  if (values.lenderName) p(`Lender: ${values.lenderName}`);
  if (values.borrowerName) p(`Borrower: ${values.borrowerName}`);
  if (values.loanAmount) p(`Loan Amount: ${values.loanAmount}`, false, 3);

  p("What is a Note Payable Agreement?", true);
  p("A Note Payable Agreement is a legal document that records the terms and conditions of a loan. This draft Note Payable agreement serves as formal documentation and ensures both lender and borrower are clear on repayment terms.");
  p("With this agreement on Legalgram, you can define interest rates, repayment schedules, and key loan details in a legally enforceable, professionally formatted document.");
  p("Download your Note Payable Agreement in the best format from Legalgram to secure financial arrangements.", false, 3);

  p("When to Use a Note Payable Agreement", true);
  p("- You are a party to a loan and want to formalize terms in writing.");
  p("- The loan includes interest and you need an amortization table.");
  p("- You have been asked to prepare a promissory-style loan document.", false, 3);

  p("Features of a Note Payable Agreement", true);
  p("- Clearly outlines loan amount, repayment terms, and interest rates.");
  p("- Legally binding and enforceable.");
  p("- Can be signed securely online.");
  p("- Downloadable in PDF or Word.");
  p("- Best format from Legalgram.");
  p("A Note Payable Agreement safeguards both lender and borrower and provides proof of obligations.", false, 3);

  p("Note Payable FAQs", true);
  p("What is the difference between Notes Payable and Accounts Payable?");
  p("Notes Payable generally refers to loan debt; Accounts Payable refers to amounts owed to vendors/suppliers for goods/services.");
  p("Are Notes Payable considered expenses?");
  p("Interest associated with Notes Payable is typically treated as an expense.");
  p("Are Notes Payable credit or debit?");
  p("Borrower usually records debit to cash and credit to Notes Payable when funds are borrowed.");
  p("Where can I find Notes Payable?");
  p("In the liabilities section of a balance sheet (current or long-term based on maturity).", false, 3);

  p("Related Documents on Legalgram", true);
  p("- Debt Collection Worksheet");
  p("- Promissory Note with Installment Payments");
  p("- Request for Bank or Credit Reference");
  p("- Security Agreement");
  p("Start your Note Payable Agreement and download the best format from Legalgram.");

  doc.save("note_payable_agreement.pdf");
};

export default function NotePayableForm() {
  return (
    <FormWizard
      steps={steps}
      title="Note Payable Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="notepayable"
    />
  );
}
