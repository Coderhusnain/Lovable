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
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.2;
  const limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.5) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.1);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.1);
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(18, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("____________________", x, y);
    }
    y += lh + 0.8;
  };

  const title = "CONFIDENTIALITY AGREEMENT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.7);
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;

  p(
    `This Confidentiality Agreement ("Agreement") is made and entered into as of ${u(v.effectiveDate)} ("Effective Date") by and between: ${u(v.ownerName)}, of ${u(v.ownerAddress)} ("Owner" or "Disclosing Party"); and ${u(v.recipientName)}, of ${u(v.recipientAddress)} ("Recipient" or "Receiving Party").`
  );
  p("RECITALS", true);
  p(`WHEREAS, the Owner is engaged in the business of ${u(v.ownerBusinessDescription)};`);
  p(`WHEREAS, the Recipient is engaged in the business of ${u(v.recipientBusinessDescription)};`);
  p("WHEREAS, the Owner possesses certain confidential, proprietary, and trade secret information of substantial commercial value and has agreed to disclose certain of such information to the Recipient solely for the limited purposes contemplated under this Agreement;");
  p("WHEREAS, the Recipient agrees to receive such information in strict confidence and to use it only in accordance with the terms of this Agreement;");
  p("NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, and intending to be legally bound, the parties agree as follows:");

  p("1. DEFINITION OF CONFIDENTIAL INFORMATION", true);
  p("1.1 Meaning");
  p(
    `"Confidential Information" means any and all non-public, proprietary, or confidential data, information, and material, whether in written, oral, electronic, graphic, or other tangible or intangible form, disclosed or made available by the Owner to the Recipient, whether before, on, or after the Effective Date, including without limitation: business records/operational data/strategic plans; financial statements/projections/budgets; product designs/specifications/prototypes/technical data; software/source code/algorithms; customer lists/supplier details/pricing information/marketing plans; trade secrets and know-how; and any analyses, compilations, or other documents prepared by the Recipient containing or reflecting such information.`
  );
  p("1.2 Exclusions");
  p(
    "Confidential Information shall not include information which: (a) is or becomes publicly available through no breach of this Agreement; (b) is lawfully received by Recipient from a third party without restriction; (c) is independently developed by Recipient without use/reference; (d) is disclosed pursuant to valid legal process, with prompt notice/cooperation where permitted; (e) is approved for release in writing by Owner; or (f) both parties agree in writing is not confidential."
  );

  p("2. OBLIGATIONS OF THE RECIPIENT", true);
  p("2.1 Non-Disclosure and Non-Use");
  p(
    `Recipient shall hold all Confidential Information in strict confidence using at least the same degree of care it uses for its own confidential information, and in no event less than reasonable care. Recipient shall not disclose/publish/disseminate Confidential Information to any third party without prior written consent of Owner, and shall not use Confidential Information for any purpose other than ${u(v.permittedPurpose)} authorized in writing by Owner.`
  );
  p("2.2 No Copying or Modification");
  p("Recipient shall not copy, reproduce, summarize, or otherwise duplicate Confidential Information, in whole or in part, without prior written approval of Owner, except as strictly necessary for the permitted purpose.");
  p("2.3 Disclosure to Employees/Agents");
  p("Disclosure shall be limited to Recipient employees/contractors/agents with legitimate need to know for the permitted purpose and bound by written confidentiality obligations no less restrictive than this Agreement.");
  p("2.4 Injunctive Relief");
  p("Recipient acknowledges unauthorized disclosure/use causes immediate and irreparable harm for which monetary damages may be inadequate; Owner may seek injunctive relief without bond in addition to other legal/equitable remedies.");

  p("3. RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION", true);
  p(
    `Upon Owner's written request, Recipient shall, within ${u(v.returnDestroyDays, 1)} business days: (a) return all documents/tangible materials containing Confidential Information; (b) permanently delete or destroy all electronic copies; and (c) provide written certification signed by an authorized representative confirming compliance.`
  );

  p("4. RELATIONSHIP OF THE PARTIES", true);
  p("Nothing in this Agreement obligates either party to enter any business relationship/transaction and does not create agency, partnership, joint venture, employment, or fiduciary relationship.");
  p("5. NO WARRANTY", true);
  p("Owner makes no representations/warranties (express or implied) regarding accuracy/completeness of Confidential Information, disclaims implied warranties of merchantability/fitness, and is not liable for damages resulting from Recipient use.");
  p("6. NO LICENSE", true);
  p("Except for limited right to use Confidential Information for permitted purpose, no license/ownership/IP rights are granted by implication, estoppel, or otherwise; all rights/title/interest remain solely with Owner.");
  p("7. TERM AND SURVIVAL", true);
  p(
    `Agreement commences on Effective Date and continues until terminated by mutual written agreement. Confidentiality and non-use obligations survive for ${u(v.survivalYears)} years following disclosure, or longer while information remains confidential/proprietary.`
  );
  p("8. MISCELLANEOUS", true);
  p("8.1 Entire Agreement - Entire understanding and supersedes prior oral/written discussions and agreements on subject matter.");
  p("8.2 Amendment - May be amended only in writing signed by both parties.");
  p("8.3 Assignment - Neither party may assign rights/delegate duties without prior written consent of the other.");
  p(`8.4 Governing Law - Governed by laws of the State of ${u(v.governingLawState)}, without regard to conflict of law principles.`);
  p("8.5 Severability - Invalid/unenforceable provision does not affect remaining provisions.");
  p("8.6 Waiver - Failure to enforce any provision is not a waiver of rights.");

  p("IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.", true);
  p("Owner (Disclosing Party):", true);
  uf("Name", v.ownerSignName);
  uf("Signature", v.ownerSignature);
  uf("Date", v.ownerSignDate);
  p("Recipient (Receiving Party):", true);
  uf("Name", v.recipientSignName);
  uf("Signature", v.recipientSignature);
  uf("Date", v.recipientSignDate);
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)} ${u(v.zip)}`);

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
