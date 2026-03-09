import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Payment Agreement Info",
    fields: [
      { name: "requesterName", label: "Requester name (optional)", type: "text", required: false },
      { name: "loanAmount", label: "Loan amount (optional)", type: "text", required: false },
      { name: "interestRate", label: "Interest rate (optional)", type: "text", required: false },
      { name: "repaymentType", label: "Repayment type (optional)", type: "text", required: false },
      { name: "collateral", label: "Collateral details (optional)", type: "text", required: false },
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
  const title = "PAYMENT AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p("Other Names:", true);
  p("Repayment Agreement");
  p("Installment Agreement");
  p("Payment Contract");
  p("Contract Payment Agreement", false, 3);
  p("What is a Payment Agreement?", true);
  p("A Payment Agreement is a legally binding contract used to document and manage the repayment of a loan or outstanding amount. This payment agreement format clearly outlines the terms under which money is borrowed or lent, helping both parties avoid confusion and future disputes.");
  p("A well-drafted payment agreement typically includes the total loan amount, applicable interest rate (if any), repayment schedule, installment details, and other important conditions. Whether you are lending money or borrowing it, using a draft payment agreement ensures transparency and legal protection.");
  p("Agreements can sometimes fall apart - especially when money is involved. That's why having a written payment agreement is essential. A properly structured agreement gives both parties peace of mind and acts as proof of obligation if disputes arise. Creating a payment agreement on Legalgram is a smart first step toward a smooth and secure financial arrangement.");
  p("You can now download a payment agreement from Legalgram in the best format of payment agreement, ready to use and customize according to your needs.", false, 3);
  p("When Should You Use a Payment Agreement?", true);
  p("You should use a payment agreement if:");
  p("- You plan to borrow money");
  p("- You are thinking about lending money");
  p("- You want to prepare an amortization table");
  p("- You need to calculate and document monthly payments and interest");
  p("- You want a legally enforceable record of money owed");
  p("This payment agreement draft is suitable for personal loans, business loans, and installment-based repayments from Legalgram.", false, 3);
  p("Sample Payment Agreement", true);
  p("The terms in your payment agreement document will automatically update based on the information you provide.");
  p("Yes Customized over 320,000+ times");
  p("Yes Legally binding and enforceable");
  p("Yes Reviewed and trusted by legal professionals");
  p("Yes Option to consult a legal expert for review");
  p("Yes Sign online for free");
  p("You can download this payment agreement instantly in a professional and legally accepted format from Legalgram", false, 3);
  p("Payment Agreement FAQs", true);
  p("How do I write a Payment Agreement?");
  p("You can easily create a payment agreement online by answering a few simple questions from Legalgram. To prepare a complete and accurate payment agreement draft, you should consider:");
  p(`- Will the borrower pay interest on the loan? ${values.interestRate ? `(Selected: ${values.interestRate})` : ""}`);
  p(`- How will the payment agreement be paid (lump sum or installments)? ${values.repaymentType ? `(Selected: ${values.repaymentType})` : ""}`);
  p("- Is there an early payment discount?");
  p(`- Will the payment agreement be secured with collateral (property or assets)? ${values.collateral ? `(Selected: ${values.collateral})` : ""}`);
  p("If you don't have all the details ready, you can save your payment agreement and complete it later.");
  p("How do I make a Payment Agreement?");
  p("Making a payment agreement is quick and straightforward. Start with a reliable payment agreement format, define the loan terms, and ensure both parties sign the document. Once signed, the payment agreement becomes legally enforceable.");
  p("You can create, customize, and download a payment agreement within minutes from Legalgram.");
  p("How do you write a legal document for money owed?");
  p("A payment agreement is the most effective legal document for money owed. It clearly states the loan amount, interest rate, repayment terms, and other conditions. Using a professionally prepared draft payment agreement ensures clarity and legal validity.");
  p("With Legalgram, you can access a free download payment agreement, prepared in the best format of payment agreement, ready for immediate use.", false, 3);
  p("Download Payment Agreement", true);
  p("Get your payment agreement on Legalgram today.");
  p("Yes Free download");
  p("Yes Editable format");
  p("Yes Legally compliant");
  p("Yes Suitable for personal and business use");
  p("Download Payment Agreement now and protect your financial interests with confidence.");

  doc.save("payment_agreement.pdf");
};

export default function PaymentAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Payment Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="paymentagreement"
    />
  );
}
