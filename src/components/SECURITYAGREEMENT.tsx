import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Security Terms",
    fields: [
      { name: "agreementDate", label: "Agreement date text", type: "text", required: true },
      { name: "debtorName", label: "Debtor name", type: "text", required: true },
      { name: "debtorAddressLine", label: "Debtor address line", type: "text", required: true },
      { name: "securedPartyName", label: "Secured Party name", type: "text", required: true },
      { name: "securedAddressLine", label: "Secured Party address line", type: "text", required: true },
      { name: "principalAmount", label: "Promissory note principal amount", type: "text", required: true },
      { name: "premisesAddress", label: "Premises address (for collateral)", type: "text", required: true },
      { name: "debtorNoticeAddress", label: "Debtor notice address", type: "text", required: true },
      { name: "securedNoticeAddress", label: "Secured Party notice address", type: "text", required: true },
      { name: "governingLaw", label: "Governing law jurisdiction", type: "text", required: true },
      { name: "performableLocation", label: "Obligations performable location", type: "text", required: true },
      { name: "execEntity1", label: "Entity 1 in execution clause", type: "text", required: false },
      { name: "execSigner1", label: "Signer 1 name", type: "text", required: false },
      { name: "execTitle1", label: "Signer 1 title", type: "text", required: false },
      { name: "execEntity2", label: "Entity 2 in execution clause", type: "text", required: false },
      { name: "execSigner2", label: "Signer 2 name", type: "text", required: false },
      { name: "execTitle2", label: "Signer 2 title", type: "text", required: false },
      { name: "signDate", label: "Signature date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  let y = 20;
  const bottom = 280;
  const p = (t: string, b = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
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

  const title = "SECURITY AGREEMENT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`This Security Agreement (this "Agreement") is made on ${v.agreementDate || ""}, by and between ${v.debtorName || "----"}, of ${v.debtorAddressLine || "__________, __________, __________"}, hereinafter referred to as the "Debtor," and ${v.securedPartyName || "__________"}, of ${v.securedAddressLine || "__________, __________, __________"}, hereinafter referred to as the "Secured Party."`);
  p('The Debtor and the Secured Party are sometimes referred to individually as a "Party" and collectively as the "Parties."');
  p("The Parties agree as follows:", false, 3);

  p("1. Creation of Security Interest", true);
  p(`The Secured Party shall secure payment/performance of Debtor's promissory note in principal amount of ${v.principalAmount || "__________"}, together with all other liabilities/obligations of Debtor to Secured Party, now existing or hereafter arising (collectively, "Obligations"). Debtor grants Secured Party a security interest in Collateral described in Paragraph 2 to secure Obligations under Paragraph 4.`);
  p("2. Collateral", true);
  p("Collateral consists of: all machinery/equipment/tools/furniture/fixtures/office equipment now owned or hereafter acquired; all inventory/goods/materials/supplies/products held for sale/lease; and all accounts/receivables/contract rights/general intangibles and proceeds including cash/deposits/insurance proceeds/replacements/substitutions.");
  p("3. Security Interest", true);
  p(`Debtor grants Secured Party security interest in Collateral now owned or hereafter acquired, now or hereafter located at ${v.premisesAddress || "__________, __________, __________, __________"} or used in connection therewith, together with all proceeds. Debtor further assigns security interest in any other rights/interests now held or later acquired.`);
  p("4. Warranties and Covenants", true);
  p("Debtor covenants: pay sums evidenced by promissory note(s) per terms; do not remove Collateral without prior written consent; keep Collateral free of unpaid charges/taxes/liens/encumbrances; maintain insurance against fire/theft/other risks in required amounts; make repairs/replacements/additions/improvements to maintain good working order.");
  p("5. Default", true);
  p("Debtor is in default upon failure to comply with any obligation under this Agreement. Upon default, Secured Party may declare all Obligations immediately due and payable and exercise all rights/remedies of a secured party under applicable law.");
  p("6. Waiver", true);
  p("No waiver by Secured Party of any default operates as waiver of any other default or same default on future occasion.");
  p("7. Notices", true);
  p("Notices must be in writing and may be delivered personally or by registered/certified mail, postage prepaid, return receipt requested. Notice deemed given upon delivery if personal, or upon mailing if by registered/certified mail.");
  p(`Debtor notice address: ${v.debtorNoticeAddress || "__________, __________, __________, __________"}.`);
  p(`Secured Party notice address: ${v.securedNoticeAddress || "__________, __________, __________, __________"}.`);
  p("Either Party may change notice address by written notice.");
  p("8. Governing Law", true);
  p(`This Agreement is governed by laws of ${v.governingLaw || "__________"}, and obligations are performable in ${v.performableLocation || "__________"}.`);
  p("9. Binding Effect", true);
  p("Agreement binds and benefits Parties and respective heirs, executors, administrators, legal representatives, successors, and assigns as permitted.");
  p("10. Legal Construction (Severability)", true);
  p("If any provision is invalid/illegal/unenforceable, remaining provisions remain in full force and Agreement is construed as if invalid provision were omitted.");
  p("11. Prior Agreements Superseded", true);
  p("This Agreement is entire agreement on subject matter and supersedes all prior or contemporaneous oral/written agreements, understandings, or representations.");
  p("12. Amendments", true);
  p("This Agreement may be amended only by written agreement executed by both Parties.");
  p("13. Attorney's Fees", true);
  p("In any action at law/equity to enforce or interpret this Agreement, prevailing Party is entitled to recover reasonable attorneys' fees in addition to other relief.");
  p("14. Execution", true);
  p(`This Agreement shall be executed on behalf of ${v.execEntity1 || "__________"} by ${v.execSigner1 || "__________"}, its ${v.execTitle1 || "__________"}, and on behalf of ${v.execEntity2 || "__________"} by ${v.execSigner2 || "__________"}, its ${v.execTitle2 || "__________"}, and effective as of date first written above.`);
  p("IN WITNESS WHEREOF, the Parties have executed this Security Agreement as of the date first written above.");
  p("By: __________________________");
  uf("Date", v.signDate);

  doc.save("security_agreement.pdf");
};

export default function SecurityAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Security Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="securityagreement"
    />
  );
}
