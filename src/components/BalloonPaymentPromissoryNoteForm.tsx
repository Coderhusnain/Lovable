import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Balloon Note Details",
    fields: [
      { name: "noteDate", label: "Date", type: "date", required: false },
      { name: "borrowerName", label: "Borrower", type: "text", required: false },
      { name: "borrowerAddress", label: "Borrower address", type: "text", required: false },
      { name: "coBorrower", label: "Co-borrower", type: "text", required: false },
      { name: "lenderName", label: "Lender", type: "text", required: false },
      { name: "paymentPlace", label: "Payment place", type: "text", required: false },
      { name: "principalSum", label: "Principal sum", type: "text", required: false },
      { name: "interestText", label: "Interest text", type: "text", required: false },
      { name: "installmentCount", label: "Installment count", type: "text", required: false },
      { name: "installmentAmount", label: "Installment amount", type: "text", required: false },
      { name: "commenceDate", label: "Commencement date", type: "date", required: false },
      { name: "dueDate", label: "Due date", type: "date", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: false },
      { name: "securedThing", label: "Secured obligation text", type: "text", required: false },
      { name: "collateralBy", label: "Collateral pledged by", type: "text", required: false },
      { name: "execByOne", label: "Executed by (1)", type: "text", required: false },
      { name: "execByTwo", label: "Executed by (2)", type: "text", required: false },
      { name: "onBehalfOf", label: "On behalf of", type: "text", required: false },
      { name: "borrowerBy", label: "Borrower by", type: "text", required: false },
      { name: "borrowerDate", label: "Borrower date", type: "date", required: false },
      { name: "lenderBy", label: "Lender by", type: "text", required: false },
      { name: "lenderDate", label: "Lender date", type: "date", required: false },
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
  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
    const shown = (value || "").trim();
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const labelText = `${label}: `;
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "BALLOON PAYMENT PROMISSORY NOTE";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", values.noteDate, 20);
  p(`FOR VALUE RECEIVED, the undersigned ${values.borrowerName || "__________"}, of ${values.borrowerAddress || "__________, __________, __________"}, and ${values.coBorrower || "__________"} (collectively, the "Borrower"), each acting as principal and jointly and severally liable, hereby promise to pay to the order of ${values.lenderName || "__________"} (the "Lender"), at ${values.paymentPlace || "__________, __________, __________"}, or at such other place as the Lender may designate in writing, the principal sum of ${values.principalSum || "__________"}, together with ${values.interestText || "__________"}, in accordance with the terms of this Balloon Payment Promissory Note (the "Note").`);
  p("TERMS OF REPAYMENT", true);
  p("Payments", true);
  p(`The unpaid principal shall be payable in ${values.installmentCount || "__________"} installments of ${values.installmentAmount || "__________"}, commencing on ${values.commenceDate || "__________"}, and continuing until ${values.dueDate || "__________"} (the "Due Date"), at which time the remaining unpaid principal and all accrued interest shall be immediately due and payable in full.`);
  p("THE BORROWER ACKNOWLEDGES AND UNDERSTANDS THAT THE INSTALLMENT PAYMENTS SET FORTH ABOVE MAY NOT FULLY AMORTIZE THE PRINCIPAL BALANCE OF THIS NOTE AND THAT, ACCORDINGLY, A BALLOON PAYMENT MAY BE DUE ON THE DUE DATE.");
  p("Application of Payments", true);
  p("All payments made under this Note shall be applied first to accrued interest and thereafter to principal.");
  p("Acceleration of Debt", true);
  p("If any installment under this Note is not paid when due, the entire unpaid principal balance together with all accrued interest shall, at the option of the Lender, become immediately due and payable.");
  p("The Borrower may prepay this Note, in whole or in part, at any time prior to the Due Date without penalty, by paying the then outstanding principal balance together with all accrued interest.");
  p("Collection Costs", true);
  p("If any payment obligation under this Note is not paid when due, the Borrower agrees to pay all costs of collection incurred by the Lender, including reasonable attorneys' fees, whether or not legal proceedings are commenced.");
  p("DEFAULT", true);
  p("Upon the occurrence of any of the following events of default, this Note and any other obligations of the Borrower to the Lender shall become immediately due and payable, without notice or demand:");
  p("1. Failure of the Borrower to pay any principal or accrued interest when due;");
  p("2. Death of the Borrower or the Lender;");
  p("3. Filing of bankruptcy proceedings involving the Borrower as a debtor;");
  p("4. Application for the appointment of a receiver for the Borrower;");
  p("5. Making of a general assignment for the benefit of the Borrower's creditors;");
  p("6. Insolvency of the Borrower;");
  p("7. Any misrepresentation by the Borrower to the Lender for the purpose of obtaining or extending credit.");
  p("Assets pledged as security: real estate pledged as collateral.");
  p("Severability", true);
  p("If any provision of this Note is determined to be unenforceable, in whole or in part, for any reason, the remaining provisions shall remain in full force and effect.");
  p("Miscellaneous", true);
  p("All payments of principal and interest under this Note shall be made in lawful currency of the United States of America. The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand with respect to this Note.");
  p("Governing Law", true);
  p(`This Note shall be governed by and construed in accordance with the laws of the ${values.governingLaw || "__________"}.`);
  p("SECURITY", true);
  p(`The ${values.securedThing || "__________"} is secured by collateral pledged by ${values.collateralBy || "__________"}. Accordingly, a separate Security Agreement shall be executed by the parties in addition to this Note.`);
  p("EXECUTION AND SIGNATURES", true);
  p(`This Note shall be executed by ${values.execByOne || "__________"} and ${values.execByTwo || "__________"}, on behalf of ${values.onBehalfOf || "__________"}.`);
  p("IN WITNESS WHEREOF, this Note has been executed and delivered in accordance with applicable law as of the date first written above.");
  p("BORROWER:", true);
  uf("By", values.borrowerBy, 24);
  uf("Date", values.borrowerDate, 20, 2.4);
  p("LENDER:", true);
  uf("By", values.lenderBy, 24);
  uf("Date", values.lenderDate, 20);

  doc.save("balloon_payment_promissory_note.pdf");
};

export default function BalloonPaymentPromissoryNoteForm() {
  return (
    <FormWizard
      steps={steps}
      title="Balloon Payment Promissory Note"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="balloonpaymentpromissorynote"
    />
  );
}
