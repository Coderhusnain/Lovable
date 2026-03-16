import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State / Province", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "zip", label: "ZIP / Postal Code", type: "text", required: true },
    ],
  },
  {
    label: "Effective Date and Owner",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "ownerName", label: "Owner / Disclosing party full legal name", type: "text", required: true },
      { name: "ownerAddress", label: "Owner address", type: "text", required: true },
      { name: "ownerBusinessDescription", label: "Owner business description", type: "text", required: true },
    ],
  },
  {
    label: "Recipient",
    fields: [
      { name: "recipientName", label: "Recipient / Receiving party full legal name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: true },
      { name: "recipientBusinessDescription", label: "Recipient business description", type: "text", required: true },
    ],
  },
  {
    label: "Confidentiality Terms",
    fields: [
      { name: "permittedPurpose", label: "Permitted purpose (authorized in writing by Owner)", type: "text", required: true },
      { name: "returnDestroyDays", label: "Return/destruction timeline in business days", type: "text", required: true, placeholder: "5" },
      { name: "survivalYears", label: "Confidentiality survival period in years", type: "text", required: true },
    ],
  },
  {
    label: "Governing Law",
    fields: [{ name: "governingLawState", label: "Governing law state", type: "text", required: true }],
  },
  {
    label: "Owner Signature",
    fields: [
      { name: "ownerSignName", label: "Owner name", type: "text", required: true },
      { name: "ownerSignature", label: "Owner signature name", type: "text", required: true },
      { name: "ownerSignDate", label: "Owner signature date", type: "date", required: true },
    ],
  },
  {
    label: "Recipient Signature",
    fields: [
      { name: "recipientSignName", label: "Recipient name", type: "text", required: true },
      { name: "recipientSignature", label: "Recipient signature name", type: "text", required: true },
      { name: "recipientSignDate", label: "Recipient signature date", type: "date", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [{ name: "reviewedBy", label: "Reviewed by (optional)", type: "text", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 16;
  const textW = pageW - margin * 2;
  const lineH = 5.3;
  const pageLimit = 280;
  let y = 20;

  // ── Core helpers ────────────────────────────────────────────────────

  const u = (val?: string, fallback = "____________________") =>
    val && val.trim() ? val.trim() : fallback;

  const checkY = (needed: number) => {
    if (y + needed > pageLimit) {
      doc.addPage();
      y = 20;
    }
  };

  // Plain body paragraph — normal or bold, optional left indent
  const p = (text: string, bold = false, indent = 0, gapAfter = 2.5) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + gapAfter);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + gapAfter;
  };

  // Bold ALL-CAPS section heading  e.g. "1. DEFINITION OF CONFIDENTIAL INFORMATION"
  const heading = (text: string) => {
    checkY(lineH + 7);
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10.2);
  };

  // Bold sub-heading on its own line  e.g. "1.1  Meaning"
  const subHeading = (num: string, title: string) => {
    checkY(lineH + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.2);
    doc.text(`${num}  ${title}`, margin, y);
    y += lineH + 1.5;
  };

  // Bullet item with hanging indent
  const bullet = (text: string, indent = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + 2.2);
    doc.text("\u2022", margin + 1.5, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 2.2;
  };

  // Lettered clause  e.g. "(a) is or becomes publicly available..."
  const clause = (letter: string, text: string, indent = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    const lbl = `(${letter}) `;
    const lblW = doc.getTextWidth(lbl);
    const lines = doc.splitTextToSize(text, textW - indent - lblW);
    checkY(lines.length * lineH + 2.2);
    doc.text(lbl, margin + indent, y);
    doc.text(lines, margin + indent + lblW, y);
    y += lines.length * lineH + 2.2;
  };

  // Misc sub-clause with bold label  e.g. "8.1  Entire Agreement — body..."
  const miscClause = (num: string, title: string, body: string) => {
    checkY(lineH * 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.2);
    const lbl = `${num}  ${title} \u2014 `;
    const lblW = doc.getTextWidth(lbl);
    doc.text(lbl, margin, y);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(body, textW - lblW);
    // First line continues on same row as the bold label
    if (lines[0]) doc.text(lines[0], margin + lblW, y);
    y += lineH;
    for (let i = 1; i < lines.length; i++) {
      checkY(lineH + 1);
      doc.text(lines[i], margin + 4, y);
      y += lineH;
    }
    y += 2.5;
  };

  // Signature field with measured underline
  const field = (label: string, value: string, lineLen = 65) => {
    checkY(lineH + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.2);
    const lbl = `${label}: `;
    doc.text(lbl, margin, y);
    const lblW = doc.getTextWidth(lbl);
    doc.setFont("helvetica", "normal");
    const val = value.trim();
    if (val) {
      doc.text(val, margin + lblW, y);
      doc.line(margin + lblW, y + 1.2, margin + lblW + Math.max(lineLen, doc.getTextWidth(val) + 2), y + 1.2);
    } else {
      doc.line(margin + lblW, y + 1.2, margin + lblW + lineLen, y + 1.2);
    }
    y += lineH + 2.5;
  };

  // ── TITLE ──────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "CONFIDENTIALITY AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const halfTW = doc.getTextWidth(title) / 2;
  doc.line(pageW / 2 - halfTW, y + 1.3, pageW / 2 + halfTW, y + 1.3);
  y += 10;
  doc.setFontSize(10.2);

  // ── PREAMBLE ───────────────────────────────────────────────────────
  p(
    `This Confidentiality Agreement ("Agreement") is made and entered into as of ${u(v.effectiveDate, "<insert date>")} ("Effective Date") by and between:`
  );

  // Parties on separate lines for clarity
  p(`${u(v.ownerName, "[Full Legal Name of Disclosing Party]")}, of ${u(v.ownerAddress, "[Address, City, State, ZIP]")} ("Owner" or "Disclosing Party"); and`, false, 4);
  p(`${u(v.recipientName, "[Full Legal Name of Receiving Party]")}, of ${u(v.recipientAddress, "[Address, City, State, ZIP]")} ("Recipient" or "Receiving Party").`, false, 4);

  // ── RECITALS ───────────────────────────────────────────────────────
  heading("RECITALS");

  p(`WHEREAS, the Owner is engaged in the business of ${u(v.ownerBusinessDescription, "[Insert Description]")};`);
  p(`WHEREAS, the Recipient is engaged in the business of ${u(v.recipientBusinessDescription, "[Insert Description]")};`);
  p(`WHEREAS, the Owner possesses certain confidential, proprietary, and trade secret information of substantial commercial value and has agreed to disclose certain of such information to the Recipient solely for the limited purposes contemplated under this Agreement;`);
  p(`WHEREAS, the Recipient agrees to receive such information in strict confidence and to use it only in accordance with the terms of this Agreement;`);
  p(`NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and intending to be legally bound, the parties agree as follows:`);

  // ── 1. DEFINITION ──────────────────────────────────────────────────
  heading("1.  DEFINITION OF CONFIDENTIAL INFORMATION");

  subHeading("1.1", "Meaning");
  p(
    `"Confidential Information" means any and all non-public, proprietary, or confidential data, information, and material, whether in written, oral, electronic, graphic, or other tangible or intangible form, disclosed or made available by the Owner to the Recipient, whether before, on, or after the Effective Date, including without limitation:`,
    false, 4, 2
  );

  bullet("Business records, operational data, and strategic plans;");
  bullet("Financial statements, projections, and budgets;");
  bullet("Product designs, specifications, prototypes, and technical data;");
  bullet("Software, source code, and algorithms;");
  bullet("Customer lists, supplier details, pricing information, and marketing plans;");
  bullet("Trade secrets and know-how;");
  bullet("Any analyses, compilations, or other documents prepared by the Recipient containing or reflecting such information.");

  y += 1;
  subHeading("1.2", "Exclusions");
  p("Confidential Information shall not include information which:", false, 4, 2);

  clause("a", "is or becomes publicly available through no breach of this Agreement;");
  clause("b", "is lawfully received by the Recipient from a third party without restriction on disclosure;");
  clause("c", "is independently developed by the Recipient without use of or reference to the Owner's Confidential Information;");
  clause("d", "is disclosed pursuant to a valid court order, subpoena, or governmental authority, provided that the Recipient promptly notifies the Owner and cooperates in any effort to limit such disclosure;");
  clause("e", "is approved for release in writing by the Owner; or");
  clause("f", "both parties agree in writing is not confidential.");

  // ── 2. OBLIGATIONS ─────────────────────────────────────────────────
  heading("2.  OBLIGATIONS OF THE RECIPIENT");

  subHeading("2.1", "Non-Disclosure and Non-Use");
  p(
    `The Recipient shall hold all Confidential Information in the strictest confidence, using at least the same degree of care it uses to protect its own confidential information, but in no event less than a reasonable degree of care. The Recipient shall not disclose, publish, or otherwise disseminate Confidential Information to any third party without the prior written consent of the Owner, and shall not use Confidential Information for any purpose other than ${u(v.permittedPurpose, "[the limited purpose]")} authorized in writing by the Owner.`,
    false, 4, 3
  );

  subHeading("2.2", "No Copying or Modification");
  p(
    `The Recipient shall not copy, reproduce, summarize, or otherwise duplicate the Confidential Information, in whole or in part, without the prior written approval of the Owner, except as strictly necessary for the permitted purpose.`,
    false, 4, 3
  );

  subHeading("2.3", "Disclosure to Employees/Agents");
  p(
    `Disclosure of Confidential Information shall be limited to employees, contractors, or agents of the Recipient who have a legitimate need to know such information in connection with the permitted purpose, and who are bound by written confidentiality obligations no less restrictive than those contained herein.`,
    false, 4, 3
  );

  subHeading("2.4", "Injunctive Relief");
  p(
    `The Recipient acknowledges that any unauthorized disclosure or use of Confidential Information will cause immediate and irreparable harm to the Owner for which monetary damages may be inadequate. Accordingly, the Owner shall be entitled to seek injunctive relief, without the necessity of posting bond, in addition to any other remedies available at law or in equity.`,
    false, 4, 3
  );

  // ── 3. RETURN OR DESTRUCTION ───────────────────────────────────────
  heading("3.  RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION");

  p(
    `Upon the Owner's written request, the Recipient shall, within ${u(v.returnDestroyDays, "five (5)")} business days:`,
    false, 0, 2
  );

  clause("a", "return all documents and tangible materials containing or representing Confidential Information;");
  clause("b", "permanently delete or destroy all electronic copies; and");
  clause("c", "provide a written certification, signed by an authorized representative, confirming compliance with this Section.");

  // ── 4. RELATIONSHIP OF THE PARTIES ────────────────────────────────
  heading("4.  RELATIONSHIP OF THE PARTIES");

  p(
    `Nothing in this Agreement shall be construed as obligating either party to enter into any business relationship or transaction. This Agreement shall not create any agency, partnership, joint venture, employment, or fiduciary relationship between the parties.`
  );

  // ── 5. NO WARRANTY ─────────────────────────────────────────────────
  heading("5.  NO WARRANTY");

  p(
    `The Owner makes no representations or warranties, express or implied, regarding the accuracy or completeness of the Confidential Information, and expressly disclaims any implied warranties of merchantability or fitness for a particular purpose. The Owner shall not be liable for any damages resulting from the Recipient's use of the Confidential Information.`
  );

  // ── 6. NO LICENSE ──────────────────────────────────────────────────
  heading("6.  NO LICENSE");

  p(
    `Except for the limited right to use the Confidential Information for the permitted purpose, no license, ownership interest, or other rights to intellectual property are granted under this Agreement, whether by implication, estoppel, or otherwise. All rights, title, and interest in and to the Confidential Information shall remain vested solely in the Owner.`
  );

  // ── 7. TERM AND SURVIVAL ───────────────────────────────────────────
  heading("7.  TERM AND SURVIVAL");

  p(
    `This Agreement shall commence on the Effective Date and continue until terminated by mutual written agreement. The obligations of confidentiality and non-use shall survive for a period of ${u(v.survivalYears, "[Insert Years]")} years following the date of disclosure of the Confidential Information, or for such longer period as the information remains confidential and proprietary.`
  );

  // ── 8. MISCELLANEOUS ───────────────────────────────────────────────
  heading("8.  MISCELLANEOUS");

  miscClause("8.1", "Entire Agreement",
    "This Agreement constitutes the entire understanding between the parties regarding the subject matter and supersedes all prior discussions and agreements, whether oral or written."
  );
  miscClause("8.2", "Amendment",
    "This Agreement may only be amended in writing signed by both parties."
  );
  miscClause("8.3", "Assignment",
    "Neither party may assign its rights or delegate its duties under this Agreement without the prior written consent of the other party."
  );
  miscClause("8.4", "Governing Law",
    `This Agreement shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState, "[Insert State]")}, without regard to conflict of law principles.`
  );
  miscClause("8.5", "Severability",
    "If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall remain in full force and effect."
  );
  miscClause("8.6", "Waiver",
    "Failure to enforce any provision of this Agreement shall not constitute a waiver of any rights hereunder."
  );

  // ── SIGNATORIES ────────────────────────────────────────────────────
  checkY(lineH + 6);
  y += 3;
  p(
    `IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.`,
    false, 0, 5
  );

  // Owner block
  checkY(lineH * 5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.2);
  doc.text("Owner (Disclosing Party):", margin, y);
  y += lineH + 2;
  field("Name", u(v.ownerSignName, ""));
  field("Signature", u(v.ownerSignature, ""));
  field("Date", u(v.ownerSignDate, ""));

  y += 4;

  // Recipient block
  checkY(lineH * 5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.2);
  doc.text("Recipient (Receiving Party):", margin, y);
  y += lineH + 2;
  field("Name", u(v.recipientSignName, ""));
  field("Signature", u(v.recipientSignature, ""));
  field("Date", u(v.recipientSignDate, ""));

  y += 3;

  // Jurisdiction footer
  checkY(lineH + 3);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.2);
  const jurisdiction = [v.city, v.state, v.country, v.zip].filter(Boolean).join(", ");
  if (jurisdiction.trim()) {
    p(`Jurisdiction: ${jurisdiction}`);
  }

  // Reviewed by (optional)
  if (v.reviewedBy?.trim()) {
    p(`Reviewed by: ${v.reviewedBy.trim()}`);
  }

  doc.save("confidentiality_agreement.pdf");
};

export default function ConfidentialityAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Confidentiality Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="confidentialityagreement"
    />
  );
}