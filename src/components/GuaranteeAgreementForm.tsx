import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "creditorName", label: "Creditor name", type: "text", required: true },
      { name: "creditorAddress", label: "Creditor principal address", type: "text", required: true },
      { name: "guarantorName", label: "Guarantor name", type: "text", required: true },
      { name: "guarantorAddress", label: "Guarantor principal address", type: "text", required: true },
      { name: "debtorName", label: "Debtor name", type: "text", required: true },
      { name: "underlyingAgreement", label: "Underlying agreement description", type: "text", required: true },
    ],
  },
  {
    label: "Guarantee Terms",
    fields: [
      { name: "terminationDays", label: "Termination notice days", type: "text", required: true, placeholder: "30" },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "securedType", label: "Security type (Unsecured/Secured)", type: "text", required: true, placeholder: "Unsecured or Secured" },
      { name: "pledgeDate", label: "Pledge Agreement date (optional)", type: "date", required: false },
      { name: "securityDate", label: "Security Agreement date (optional)", type: "date", required: false },
      { name: "mortgageDate", label: "Mortgage date (optional)", type: "date", required: false },
      { name: "assignmentDate", label: "Collateral Assignment date (optional)", type: "date", required: false },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "creditorSignName", label: "Creditor signatory name", type: "text", required: true },
      { name: "creditorTitle", label: "Creditor title", type: "text", required: false },
      { name: "creditorSignDate", label: "Creditor sign date", type: "date", required: true },
      { name: "guarantorSignName", label: "Guarantor signatory name", type: "text", required: true },
      { name: "guarantorTitle", label: "Guarantor title", type: "text", required: false },
      { name: "guarantorSignDate", label: "Guarantor sign date", type: "date", required: true },
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
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
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
  const title = "GUARANTEE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Guarantee Agreement ("Agreement" or "Guaranty") is made and entered into on ${values.effectiveDate || "this ___ day of _______, ______"} ("Effective Date"), by and between:`);
  p(`${values.creditorName || "[Name of Creditor]"}, having its principal place of business at ${values.creditorAddress || "__________________________"} (the "Creditor"),`);
  p(`and ${values.guarantorName || "[Name of Guarantor]"}, residing or having its principal place of business at ${values.guarantorAddress || "__________________________"} (the "Guarantor").`);
  p('(Each individually referred to as a "Party" and collectively as the "Parties".)', false, 3);

  p("RECITALS", true);
  p(`WHEREAS, ${values.debtorName || "[Name of Debtor]"} ("Debtor") has entered or proposes to enter into ${values.underlyingAgreement || "the Underlying Agreement"} with the Creditor, incorporated as Exhibit A;`);
  p("AND WHEREAS, the Creditor has required this Guaranty as security for due performance and payment by the Debtor of all obligations;");
  p("NOW, THEREFORE, in consideration of the foregoing and other good and valuable consideration, the Guarantor agrees as follows:", false, 3);

  p("1. OBLIGATIONS OF THE GUARANTOR", true);
  p("1.1 Absolute and Unconditional Guarantee: The Guarantor absolutely, unconditionally, and irrevocably guarantees prompt full payment and performance of all Debtor obligations to Creditor, whether existing or future, direct/indirect, secured/unsecured, absolute/contingent.");
  p("1.2 Continuing Nature: This Guaranty is a continuing guarantee covering all existing and future obligations until duly terminated.");
  p("1.3 No Limitation by Enforcement: Guarantor liability is not diminished by failure/omission to enforce rights against Debtor or invalidity of Debtor obligations.");
  p("1.4 Reliance: Guarantor acknowledges this Guaranty induces Creditor reliance and continuation of contractual relationship.", false, 3);

  p("2. DURATION", true);
  p(`2.1 Term: This Guaranty remains in effect until expiration of ${values.terminationDays || "____"} days after written termination notice is received by the Creditor.`);
  p("2.2 Obligations Survive Termination: Obligations existing before termination remain guaranteed.");
  p("2.3 Effectiveness: Termination is not effective until all prior obligations are fully paid and discharged to Creditor satisfaction.", false, 3);

  p("3. NOTICE OF DEFAULT", true);
  p("3.1 Creditor shall provide written notice of Debtor default prior to enforcing rights under this Guaranty.");
  p("3.2 Creditor has no duty to notify guarantor of subsequent advances, extensions, or renewals.");
  p("3.3 Creditor shall not extend additional credit or new arrangements without prior written Guarantor consent, failing which this Guaranty is discharged.", false, 3);

  p("4. CREDITOR PROVISIONS AND SECURITY", true);
  p("4.1 Guarantor waives subrogation and rights against Debtor/collateral until full satisfaction of obligations.");
  p("4.2 Debtor indebtedness to Guarantor is subordinated/assigned to Creditor and may be held in trust for Creditor upon request.");
  p("4.3 Creditor may alter terms, extend time, release/substitute collateral, or settle claims without releasing Guarantor.");
  p("4.4 This Guaranty is void if Creditor enters/renews/modifies agreements with Debtor without Guarantor written consent.");
  p("4.5 Guarantor shall provide reasonable financial disclosure upon written request.");
  p(`4.6 Security for Guaranty: ${values.securedType || "Unsecured/Secured"}; Pledge (${values.pledgeDate || "N/A"}), Security Agreement (${values.securityDate || "N/A"}), Mortgage (${values.mortgageDate || "N/A"}), Collateral Assignment (${values.assignmentDate || "N/A"}).`, false, 3);

  p("5. FINAL PROVISIONS", true);
  p("5.1 Entire Agreement: This Guaranty is the entire agreement regarding its subject matter.");
  p("5.2 Amendments: Modifications must be in writing and signed by both Parties.");
  p("5.3 Severability: Invalid provisions are limited/severed; remaining provisions remain effective.");
  p("5.4 Waiver: Failure to enforce any right is not a waiver of future enforcement.");
  p(`5.5 Governing Law: This Guaranty is governed by the laws of the State of ${values.governingState || "__________"}.`);
  p("5.6 Acknowledgment of Receipt: Guarantor acknowledges receipt of a complete copy and understanding of terms, rights, and obligations.", false, 3);

  p("6. EXECUTION", true);
  p("IN WITNESS WHEREOF, the Parties have duly executed this Guarantee Agreement as of the day and year first above written.");
  p("CREDITOR", true, 1);
  uf("Name", values.creditorSignName, 26);
  uf("Title", values.creditorTitle, 26);
  p("Signature: ________________________");
  uf("Date", values.creditorSignDate, 26, 2.5);
  p("GUARANTOR", true, 1);
  uf("Name", values.guarantorSignName, 26);
  uf("Title (if applicable)", values.guarantorTitle, 26);
  p("Signature: ________________________");
  uf("Date", values.guarantorSignDate, 26);

  doc.save("guarantee_agreement.pdf");
};

export default function GuaranteeAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Guarantee Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="guaranteeagreement"
    />
  );
}
