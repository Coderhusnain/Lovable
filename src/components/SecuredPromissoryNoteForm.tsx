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
      { name: "personalPropertyLocation", label: "Personal property location", type: "text", required: false },
      { name: "securityType", label: "Security type (e.g. Deed of Trust)", type: "text", required: false },
      { name: "propertyAddress", label: "Real property address", type: "text", required: false },
      { name: "propertyCity", label: "Real property city", type: "text", required: false },
      { name: "propertyState", label: "Real property state", type: "text", required: false },
      { name: "executedBy", label: "Executed by (name)", type: "text", required: false },
      { name: "executedOnBehalf", label: "Executed on behalf of", type: "text", required: false },
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
  const L = 16;
  const W = 178;
  const LH = 5.7;
  const limit = 282;
  let y = 18;

  // Plain paragraph — bold=true for headings
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH + gap > limit) { doc.addPage(); y = 18; }
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };

  // Bullet point — • with 6 mm indent
  const bullet = (t: string, gap = 1.8) => {
    const indent = L + 6;
    const lines = doc.splitTextToSize(t, W - 6);
    if (y + lines.length * LH + gap > limit) { doc.addPage(); y = 18; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    doc.text("\u2022", L + 1.5, y);
    doc.text(lines, indent, y);
    y += lines.length * LH + gap;
  };

  // Underlined fill field
  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
    const shown = (value || "").trim();
    if (y + LH + gap > limit) { doc.addPage(); y = 18; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    const labelText = `${label}: `;
    doc.text(labelText, L, y);
    const x = L + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += LH + gap;
  };

  // ── Title ──────────────────────────────────────────────────────────────────
  const title = "SECURED PROMISSORY NOTE";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(105 - tw / 2, y + 1.2, 105 + tw / 2, y + 1.2);
  y += 10;

  // ── Preamble ───────────────────────────────────────────────────────────────
  p(
    `FOR VALUE RECEIVED, the undersigned ${v.borrowerOne || "__________"}, with an address at ${v.borrowerOneAddress || "__________"}, and ${v.borrowerTwo || "__________"}, with an address at ${v.borrowerTwoAddress || "__________"} (collectively, the \u201cBorrower\u201d), each acting as principal and jointly and severally liable, hereby promise to pay to the order of ${v.lenderOne || "__________"} and ${v.lenderTwo || "__________"} (collectively, the \u201cLender\u201d), at such address as the Lender may designate in writing, the principal sum of ${v.principalSum || "__________"}, together with interest thereon, in accordance with the terms of this Secured Promissory Note (the \u201cNote\u201d).`
  );

  // ── TERMS OF REPAYMENT ────────────────────────────────────────────────────
  p("TERMS OF REPAYMENT", true);
  p("Payments", true);
  p("The principal and accrued interest evidenced by this Note shall be repaid as follows:");
  p(
    `Interest-only payments shall be made in ${v.interestOnlyInstallments || "__________"} installments commencing on ${v.interestOnlyStart || "__________"}, and continuing until ${v.interestOnlyEnd || "__________"}. Thereafter, the unpaid principal balance together with accrued interest shall be repaid in ${v.amortizedInstallments || "__________"} installments of ${v.amortizedAmount || "__________"}, commencing on ${v.amortizedStart || "__________"}, and continuing until ${v.dueDate || "__________"} (the \u201cDue Date\u201d), at which time any remaining unpaid principal and accrued interest shall be immediately due and payable in full.`
  );

  // ── SECURED OBLIGATION ────────────────────────────────────────────────────
  p("SECURED OBLIGATION", true);
  p(
    `This Note is a Secured Promissory Note. The repayment obligations of the Borrower are secured by collateral pledged by ${v.collateralPledgor || "__________"}, as more particularly described below. The terms of this Note shall be read in conjunction with a separate Security Agreement executed by the parties.`
  );

  // ── SECURITY AND COLLATERAL ───────────────────────────────────────────────
  p("SECURITY AND COLLATERAL", true);
  p(
    `The obligations under this Note are secured by collateral pledged by ${v.collateralPledgor || "__________"}. Accordingly, the parties shall execute a Security Agreement contemporaneously with this Note to evidence and perfect the Lender\u2019s security interest.`
  );
  p(
    "The assets pledged as collateral include real property, together with any related improvements, fixtures, and appurtenances."
  );

  // ── MISCELLANEOUS ─────────────────────────────────────────────────────────
  p("MISCELLANEOUS", true);
  p("All payments of principal and interest under this Note shall be made in lawful currency of the United States of America.");
  p("The Borrower hereby waives presentment for payment, protest, notice of protest, and notice of demand.");
  p(
    "No delay or failure by the Lender to exercise any right under this Note, no assignment of this Note, no failure to accelerate the indebtedness upon default, and no acceptance of a late or partial payment shall operate as a waiver of the Lender\u2019s right to thereafter enforce strict compliance with the terms of this Note without notice to the Borrower. All rights and remedies of the Lender are cumulative and may be exercised concurrently or consecutively."
  );
  p("This Note may not be amended or modified except by a written instrument signed by the holder of the Note.");

  // ── EVENTS OF DEFAULT ─────────────────────────────────────────────────────
  p("EVENTS OF DEFAULT", true);
  p(
    "Upon the occurrence of any of the following events of default, the entire unpaid principal balance together with accrued interest and all other amounts due shall become immediately due and payable, without notice or demand:"
  );
  bullet("Failure of the Borrower to pay any principal or accrued interest when due;");
  bullet("Liquidation, dissolution, incompetency, or death of the Borrower;");
  bullet("Filing of bankruptcy or insolvency proceedings by or against the Borrower;");
  bullet("Appointment of a receiver for the Borrower or the Borrower\u2019s assets;");
  bullet("General assignment for the benefit of creditors by the Borrower;");
  bullet("Insolvency of the Borrower;");
  bullet("Any material misrepresentation made by the Borrower for the purpose of obtaining or extending credit; or");
  bullet("Sale or transfer of a material portion of the Borrower\u2019s business or assets.");

  // ── SEVERABILITY ──────────────────────────────────────────────────────────
  p("SEVERABILITY", true);
  p(
    "If any provision of this Note is held to be invalid or unenforceable, in whole or in part, such invalidity or unenforceability shall not affect the remaining provisions, which shall remain in full force and effect."
  );

  // ── APPLICATION OF PAYMENTS ───────────────────────────────────────────────
  p("APPLICATION OF PAYMENTS", true);
  p(
    "THE BORROWER ACKNOWLEDGES THAT THE INSTALLMENT PAYMENTS PROVIDED FOR HEREIN MAY NOT FULLY AMORTIZE THE PRINCIPAL BALANCE OF THIS NOTE AND THAT A BALLOON PAYMENT MAY BE DUE ON THE DUE DATE."
  );
  p("All payments shall be applied first to accrued interest and thereafter to principal.");
  p(
    `This Note is secured by personal property located in ${v.personalPropertyLocation || "__________"}, and further secured by a ${v.securityType || "__________"} against real property commonly known as ${v.propertyAddress || "__________"}, ${v.propertyCity || "__________"}, ${v.propertyState || "__________"}.`
  );
  p(
    "Any prepayment shall be applied to the principal installments in inverse order of maturity and shall be accompanied by payment of all accrued interest on the amount prepaid through the date of prepayment."
  );

  // ── COLLECTION COSTS ──────────────────────────────────────────────────────
  p("COLLECTION COSTS", true);
  p(
    "In the event of default, the Borrower agrees to pay all costs incurred by the Lender in the collection of amounts due under this Note, including reasonable attorneys\u2019 fees and expenses, whether or not legal proceedings are initiated."
  );

  // ── GOVERNING LAW ─────────────────────────────────────────────────────────
  p("GOVERNING LAW", true);
  p(
    `This Note shall be governed by and construed in accordance with the laws of the ${v.governingLaw || "__________"}.`
  );

  // ── EXECUTION AND SIGNATURES ──────────────────────────────────────────────
  p("EXECUTION AND SIGNATURES", true);
  p(
    `This Note shall be executed by ${v.executedBy || "__________"}, acting on behalf of ${v.executedOnBehalf || "__________"}.`
  );
  p(
    "IN WITNESS WHEREOF, the parties have executed and delivered this Note in accordance with applicable law as of the date first written above."
  );
  p(
    `Executed on this ${v.executedDay || "___"} day of ${v.executedMonth || "__________"}, ${v.executedYear || "___"}, at ${v.executedPlace || "__________"}.`,
    false,
    3
  );

  // Signature blocks
  p("BORROWER 1:", true);
  uf("Name", v.borrowerOne, 28);
  uf("Signature", "", 28);
  uf("Date", "", 22, 2.4);

  p("BORROWER 2:", true);
  uf("Name", v.borrowerTwo, 28);
  uf("Signature", "", 28);
  uf("Date", "", 22, 2.4);

  p("LENDER 1:", true);
  uf("Name", v.lenderOne, 28);
  uf("Signature", "", 28);
  uf("Date", "", 22, 2.4);

  p("LENDER 2:", true);
  uf("Name", v.lenderTwo, 28);
  uf("Signature", "", 28);
  uf("Date", "", 22);

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
