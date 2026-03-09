import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Partnership Basics",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "generalPartnerName", label: "General partner name", type: "text", required: true },
      { name: "generalPartnerAddress", label: "General partner address", type: "text", required: false },
      { name: "silentPartnerName", label: "Silent partner name", type: "text", required: true },
      { name: "silentPartnerAddress", label: "Silent partner address", type: "text", required: false },
      { name: "partnershipName", label: "Partnership name", type: "text", required: true },
      { name: "principalAddress", label: "Principal place of business", type: "text", required: false },
      { name: "termEnd", label: "Termination date/event", type: "text", required: false },
    ],
  },
  {
    label: "Contributions and Legal Terms",
    fields: [
      { name: "contributionDate", label: "Contribution due date", type: "date", required: false },
      { name: "generalOwnership", label: "General partner ownership %", type: "text", required: false },
      { name: "silentOwnership", label: "Silent partner ownership %", type: "text", required: false },
      { name: "stateLaw", label: "Governing state", type: "text", required: true },
      { name: "generalSignerDate", label: "General partner sign date", type: "date", required: false },
      { name: "silentSignerDate", label: "Silent partner sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;

  const u = (value?: string, min = 14) => (value || "").trim() || " ".repeat(min);
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
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "SILENT PARTNERSHIP AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Silent Partnership Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)}, by and between:`);
  p(`- ${u(values.generalPartnerName, 12)}, residing at ${u(values.generalPartnerAddress, 16)}; and`);
  p(`- ${u(values.silentPartnerName, 12)}, residing at ${u(values.silentPartnerAddress, 16)}.`);
  p('The Partners desire to establish a business partnership in accordance with the terms and conditions set forth herein.', false, 3);

  p("I. GENERAL PROVISIONS", true);
  p("1.1 Preamble", true);
  p("The Partners wish to enter into a business venture, wherein the Silent Partner(s) shall participate in the Partnership without active management or control, in accordance with the terms of this Agreement.");
  p("1.2 Partnership Name, Place, and Business", true);
  p(`The business shall be conducted under the name ${u(values.partnershipName, 14)} (the "Partnership"). The Partnership shall operate in compliance with all applicable federal, state, and local laws. The principal place of business of the Partnership shall be ${u(values.principalAddress, 16)}.`);
  p("1.3 Term", true);
  p(`The Partnership shall commence on the Effective Date and shall continue in full force and effect until ${u(values.termEnd, 12)}, unless earlier dissolved in accordance with this Agreement or by operation of law.`);

  p("II. PARTNER CONTRIBUTIONS, INTERESTS, AND AUTHORITY", true);
  p("2.1 Contributions", true);
  p(`Each Partner shall make an initial capital contribution in the amount agreed upon, submitted no later than ${u(values.contributionDate, 12)}.`);
  p("2.2 Interest on Contributions", true);
  p("No Partner's contribution to the capital of the Partnership shall bear interest. All interest or other income earned on such contributions shall be credited to the Partnership's capital account.");
  p("2.3 Ownership Interest and Authority", true);
  p(`Ownership: ${u(values.generalPartnerName, 10)} - ${u(values.generalOwnership, 4)}%; ${u(values.silentPartnerName, 10)} - ${u(values.silentOwnership, 4)}%.`);
  p("Except as expressly provided, the General Partner(s) shall have full authority to manage and control operations, while the Silent Partner(s) shall have no right to participate in day-to-day management.");

  p("III. DUTIES AND LIABILITIES", true);
  p("3.1 Duties of the General Partner(s)", true);
  p("The General Partner(s) shall be solely responsible for management, operation, and control of the Partnership, including hiring/managing personnel, entering contracts, purchasing/selling goods/services, maintaining records, and implementing policies.");
  p("3.2 Duties of the Silent Partner(s)", true);
  p('The Silent Partner(s) shall remain "silent" in managerial matters, may engage in other business ventures, and shall not be personally liable for debts except as required by law.');
  p("3.3 Profits and Losses", true);
  p("All Partners, including the Silent Partner(s), shall share in profits, losses, income, deductions, and credits in proportion to ownership interests unless otherwise agreed in writing.");
  p("3.4 Limited Liability", true);
  p("Subject to applicable law, the Silent Partner(s) shall have no personal liability for debts, obligations, or liabilities of the Partnership.");

  p("IV. LEGAL AND GOVERNING CLAUSES", true);
  p("4.1 Entire Agreement", true);
  p("This Agreement contains the entire understanding between the Partners and supersedes all prior agreements, understandings, or representations.");
  p("4.2 Waivers", true);
  p("No waiver shall be valid unless in writing and signed by the Partner(s) to be bound. Failure to enforce is not waiver of future enforcement.");
  p("4.3 Severability", true);
  p("If any provision is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.");
  p("4.4 Counterparts", true);
  p("This Agreement may be executed in one or more counterparts, each deemed an original and all together constituting one instrument.");
  p("4.5 Dispute Resolution", true);
  p("All Partners agree to submit disputes to mediation prior to commencing litigation. If unresolved in mediation, legal remedies may be pursued.");
  p("4.6 Jurisdiction", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${u(values.stateLaw, 12)}, and all disputes shall be subject to exclusive jurisdiction of that State's courts.`);

  p("V. EXECUTION", true);
  p("IN WITNESS WHEREOF, the Partners have executed this Silent Partnership Agreement as of the Effective Date, intending to be legally bound.");
  uf("General Partner Name", values.generalPartnerName, 22);
  p("Signature: ___________________________");
  uf("Date", values.generalSignerDate, 14);
  uf("Silent Partner Name", values.silentPartnerName, 22);
  p("Signature: ___________________________");
  uf("Date", values.silentSignerDate, 14);

  doc.save("silent_partnership.pdf");
};

export default function SilentPartnership() {
  return (
    <FormWizard
      steps={steps}
      title="Silent Partnership"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="silentpartnership"
    />
  );
}
