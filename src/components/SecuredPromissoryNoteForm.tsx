import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Note and Collateral",
    fields: [
      { name: "borrowerOne", label: "Borrower 1 name", type: "text", required: true },
      { name: "borrowerOneAddress", label: "Borrower 1 address", type: "text", required: true },
      { name: "borrowerTwo", label: "Borrower 2 name", type: "text", required: true },
      { name: "borrowerTwoAddress", label: "Borrower 2 address", type: "text", required: true },
      { name: "lenderOne", label: "Lender 1 name", type: "text", required: true },
      { name: "lenderTwo", label: "Lender 2 name", type: "text", required: true },
      { name: "principalSum", label: "Principal sum", type: "text", required: true },
      { name: "interestOnlyInstallments", label: "Interest-only installments", type: "text", required: true },
      { name: "interestOnlyStart", label: "Interest-only start date", type: "date", required: true },
      { name: "interestOnlyEnd", label: "Interest-only end date", type: "date", required: true },
      { name: "amortizedInstallments", label: "Principal+interest installments", type: "text", required: true },
      { name: "amortizedAmount", label: "Installment amount", type: "text", required: true },
      { name: "amortizedStart", label: "Amortized start date", type: "date", required: true },
      { name: "dueDate", label: "Due date", type: "date", required: true },
      { name: "collateralPledgor", label: "Collateral pledgor", type: "text", required: true },
      { name: "governingLaw", label: "Governing law", type: "text", required: true },
      { name: "executedDay", label: "Executed day", type: "text", required: true },
      { name: "executedMonth", label: "Executed month", type: "text", required: true },
      { name: "executedYear", label: "Executed year", type: "text", required: true },
      { name: "executedPlace", label: "Executed place", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18; const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "SECURED PROMISSORY NOTE";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`FOR VALUE RECEIVED, ${v.borrowerOne || "__________"}, ${v.borrowerOneAddress || "__________"}, and ${v.borrowerTwo || "__________"}, ${v.borrowerTwoAddress || "__________"} (jointly/severally "Borrower"), promise to pay ${v.lenderOne || "__________"} and ${v.lenderTwo || "__________"} ("Lender") principal ${v.principalSum || "__________"} with interest per this Secured Promissory Note.`);
  p("TERMS OF REPAYMENT", true);
  p(`Interest-only payments in ${v.interestOnlyInstallments || "__________"} installments from ${v.interestOnlyStart || "__________"} to ${v.interestOnlyEnd || "__________"}.`);
  p(`Thereafter, unpaid principal plus accrued interest repaid in ${v.amortizedInstallments || "__________"} installments of ${v.amortizedAmount || "__________"}, commencing ${v.amortizedStart || "__________"} through ${v.dueDate || "__________"} (Due Date), when remaining unpaid amounts are due in full.`);
  p("SECURED OBLIGATION", true);
  p(`Obligations secured by collateral pledged by ${v.collateralPledgor || "__________"}, with terms read alongside contemporaneous Security Agreement.`);
  p("SECURITY AND COLLATERAL", true);
  p("Collateral includes real property and related improvements/fixtures/appurtenances; security interest evidenced/perfected by Security Agreement.");
  p("MISCELLANEOUS / EVENTS OF DEFAULT / SEVERABILITY / APPLICATION OF PAYMENTS / COLLECTION COSTS", true);
  p("Borrower waives presentment/protest/notices; no delay/assignment/non-acceleration/late acceptance waives strict compliance rights; amendments require writing by holder.");
  p("Default events include nonpayment, dissolution/death/incompetency, insolvency/bankruptcy, receiver, assignment for creditors, misrepresentation for credit, sale/transfer of material business/assets.");
  p("Installments may not fully amortize principal; balloon payment may be due on Due Date. Payments applied to interest then principal. Prepayment applied inverse maturity with accrued interest through prepayment date.");
  p(`GOVERNING LAW: ${v.governingLaw || "__________"}.`);
  p("EXECUTION AND SIGNATURES", true);
  p(`Executed on ${v.executedDay || "___"} day of ${v.executedMonth || "__________"}, ${v.executedYear || "___"}, at ${v.executedPlace || "__________"}. Signature lines apply.`);
  doc.save("secured_promissory_note.pdf");
};

export default function SecuredPromissoryNoteForm() {
  return (
    <FormWizard
      steps={steps}
      title="Secured Promissory Note"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="securedpromissorynote"
    />
  );
}

