import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Balloon Note Details",
    fields: [
      { name: "loanAmount", label: "Loan amount", type: "text", required: false },
      { name: "monthlyPayment", label: "Monthly payment", type: "text", required: false },
      { name: "balloonAmount", label: "Balloon payment amount", type: "text", required: false },
      { name: "balloonDueDate", label: "Balloon due date", type: "date", required: false },
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
  const title = "PROMISSORY NOTE WITH BALLOON PAYMENTS";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  if (values.loanAmount) p(`Loan Amount: ${values.loanAmount}`);
  if (values.monthlyPayment) p(`Regular Payment: ${values.monthlyPayment}`);
  if (values.balloonAmount) p(`Balloon Payment Amount: ${values.balloonAmount}`);
  if (values.balloonDueDate) p(`Balloon Due Date: ${values.balloonDueDate}`, false, 3);

  p("Other Names:", true);
  p("- Note Payable with Balloon Payments");
  p("- Balloon Promissory Note", false, 3);

  p("What is a Promissory Note with Balloon Payments?", true);
  p("A Promissory Note with Balloon Payments is a legally binding loan agreement allowing regular payments and one or more large balloon payments due at end of term. It defines payment schedule, interest details, and final repayment obligations.");
  p("Using this note on Legalgram helps avoid confusion and disputes by clearly stating when balloon payment is due and how much must be paid. It supports transparency and legal protection for lender and borrower.");
  p("You can download this agreement in the best legal format from Legalgram for personal, business, or private lending.", false, 3);

  p("Why Use a Promissory Note with Balloon Payments?", true);
  p("- Lower periodic payments with larger final payment.");
  p("- Clear amortization schedule for interest-bearing loans.");
  p("- Strong legal clarity on repayment terms.");
  p("- Avoid misunderstandings about final balance.");
  p("The Legalgram version can include amortization table, interest rate, and exact dates.", false, 3);

  p("When to Use It", true);
  p("✔ You are part of a loan that includes balloon payments");
  p("✔ You want accurate monthly installment calculations");
  p("✔ You need a legally enforceable loan document");
  p("✔ You want a professional draft");
  p("✔ You need final payment obligations clearly defined", false, 3);

  p("Why Download from Legalgram?", true);
  p("- Legally binding and enforceable");
  p("- Best format from Legalgram");
  p("- Professionally drafted template");
  p("- Easy to customize");
  p("- Suitable for personal/business loans");
  p("- Free download option");
  p("- Secure and ready to sign", false, 3);

  p("FAQs", true);
  p("How can I draft one online?");
  p("1. Enter amount, rate, and payment schedule.");
  p("2. Define balloon amount and due date.");
  p("3. Review and finalize.");
  p("4. Download and sign.");
  p("Do I need an attorney?");
  p("Not always, but legal review may help for complex loans.");
  p("Does it need notarization or witnesses?");
  p("No, generally not required, but optional for additional strength.");

  doc.save("promissory_note_balloon_payments.pdf");
};

export default function BalloonPaymentPromissoryNoteForm() {
  return (
    <FormWizard
      steps={steps}
      title="Promissory Note with Balloon Payments"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="balloonpaymentpromissorynote"
    />
  );
}
