import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Promissory Note Details",
    fields: [
      { name: "lenderName", label: "Lender name", type: "text", required: false },
      { name: "borrowerName", label: "Borrower name", type: "text", required: false },
      { name: "loanAmount", label: "Loan amount", type: "text", required: false },
      { name: "interestRate", label: "Interest rate", type: "text", required: false },
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
  const title = "PROMISSORY NOTE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  if (values.lenderName) p(`Lender: ${values.lenderName}`);
  if (values.borrowerName) p(`Borrower: ${values.borrowerName}`);
  if (values.loanAmount) p(`Loan Amount: ${values.loanAmount}`);
  if (values.interestRate) p(`Interest Rate: ${values.interestRate}`, false, 3);

  p("What is a Promissory Note?", true);
  p("A Promissory Note is a legally binding loan agreement between a lender and borrower that defines repayment terms, interest rates, late fees, collateral, and related obligations. This draft Promissory Note agreement protects both parties and creates clear expectations.");
  p("Whether lending to a family member, friend, or business, a Promissory Note on Legalgram provides a professional and enforceable record to prevent misunderstandings or disputes.");
  p("Download the best format from Legalgram for a complete, ready-to-use, legally enforceable document.", false, 3);

  p("When to Use a Promissory Note", true);
  p("- You are loaning money to an individual or business and want a written record.");
  p("- You are borrowing money from a private party and want to document terms.");
  p("- The loan includes interest and you need an amortization schedule.");
  p("- You want to clearly outline monthly payment and repayment conditions.");
  p("- You have been asked to create a Promissory Note for lender and borrower.", false, 3);

  p("Why Use Legalgram for Your Promissory Note", true);
  p("- Draft Promissory Note agreement with step-by-step guidance.");
  p("- Includes essential terms: amount, interest, schedule, late fees, collateral.");
  p("- Legally enforceable structure recognized by courts.");
  p("- Best format from Legalgram for professional reliability.");
  p("- Download in PDF or Word for signing, sharing, and printing.");
  p("Using a Promissory Note helps lenders secure repayment and gives borrowers clarity.", false, 3);

  p("Promissory Note FAQs", true);
  p("How do I get a Promissory Note online?");
  p("1. Make the document by answering a few questions.");
  p("2. Send or share for review.");
  p("3. Sign and make it legal with e-signature.");
  p("Is a Promissory Note legally enforceable?");
  p("Yes. When properly signed, it is legally binding.");
  p("Do I need collateral?");
  p("Collateral is optional but recommended for higher-risk loans.");
  p("Can I charge interest to family/friends?");
  p("Yes, while complying with applicable usury laws.");
  p("Is a handwritten promissory note valid?");
  p("Yes, but a structured Legalgram form is generally clearer and more complete.", false, 3);

  p("Related Loan Documents on Legalgram", true);
  p("- Payment Agreement");
  p("- Debt Collection Worksheet");
  p("- Security Agreement");
  p("- Debt Settlement Agreement");
  p("Download your Promissory Note on Legalgram in the best format and secure your loan terms professionally.");

  doc.save("promissory_note.pdf");
};

export default function PromissoryNoteForm() {
  return (
    <FormWizard
      steps={steps}
      title="Promissory Note"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="promissorynote"
    />
  );
}
