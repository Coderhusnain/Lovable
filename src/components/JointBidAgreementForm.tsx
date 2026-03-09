import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Project and Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "ownerEntity", label: "Owner/entity issuing contract", type: "text", required: false },
      { name: "projectName", label: "Project description", type: "text", required: false },
      { name: "contractor1", label: "Contractor 1 name", type: "text", required: true },
      { name: "contractor1Title", label: "Contractor 1 signer title", type: "text", required: false },
      { name: "contractor1Date", label: "Contractor 1 sign date", type: "date", required: false },
      { name: "contractor2", label: "Contractor 2 name", type: "text", required: true },
      { name: "contractor2Title", label: "Contractor 2 signer title", type: "text", required: false },
      { name: "contractor2Date", label: "Contractor 2 sign date", type: "date", required: false },
      { name: "contractor3", label: "Contractor 3 name (optional)", type: "text", required: false },
      { name: "contractor3Title", label: "Contractor 3 signer title", type: "text", required: false },
      { name: "contractor3Date", label: "Contractor 3 sign date", type: "date", required: false },
      { name: "governingLaw", label: "Governing law state/country", type: "text", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.5, limit = 280;
  let y = 20;
  const u = (value?: string, min = 14) => (value || "").trim() || " ".repeat(min);
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 20) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + 1.8 > limit) { doc.addPage(); y = 20; }
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) { doc.text(shown, x, y); doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1); }
    else { doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1); }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  const title = "JOINT BID AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9; doc.setFontSize(10.5);

  p(`This Joint Bid Agreement (the "Agreement") is entered into as of ${u(values.effectiveDate, 12)} by and between the undersigned general contractors (the "Contractors"), for the purpose of jointly preparing and submitting a bid for ${u(values.projectName, 16)} issued by ${u(values.ownerEntity, 16)} (the "Project").`, false, 3);
  p("1. Purpose", true);
  p("The purpose is to establish terms under which Contractors prepare and submit a joint bid and define respective rights, obligations, and responsibilities for the bid and any resulting contract award.");
  p("2. Conditions for Joint Bid Submission", true);
  p("A joint bid will not be submitted unless: (i) bid amount/terms are mutually agreed; (ii) required Bid Bond is obtained; and (iii) binding commitments for other required bonds (including performance/payment bonds) are secured.");
  p("3. Execution of Bid Bond", true);
  p("Each Contractor shall jointly and severally execute Bid Bond and indemnity agreements required to secure issuance, binding each Contractor individually and collectively.");
  p("4. Award of Contract", true);
  p("If awarded, Contractors shall promptly execute a formal Joint Venture Agreement and jointly/severally execute the construction contract, all required performance/payment bonds, and related indemnity agreements.");
  p("5. Costs of Bid Preparation", true);
  p("Each Contractor bears its own bid preparation costs unless otherwise agreed in writing.");
  p("6. Negotiations with Owner", true);
  p("All negotiations/discussions/correspondence with Owner (including Architect/Engineer) after submission shall be conducted jointly; no unilateral action without prior written consent.");
  p("7. Withdrawal from Agreement", true);
  p("Any Contractor may withdraw before formal bid submission without liability. Remaining Contractor(s) may then submit individually or with another party without liability to withdrawing Contractor.");
  p("8. Execution and Effectiveness", true);
  p("This Agreement is effective upon execution by all Contractors. Signatories warrant due authority.");
  p("9. Miscellaneous", true);
  p(`Governing Law: ${u(values.governingLaw, 12)}. Entire Agreement supersedes prior discussions. Amendments must be in writing signed by all Contractors. Severability applies to preserve remaining provisions.`);
  p("10. Signatories", true);
  p("IN WITNESS WHEREOF, the undersigned have executed this Joint Bid Agreement as of the Effective Date.");
  uf("Contractor 1 Name", values.contractor1, 22);
  uf("Title", values.contractor1Title, 14);
  p("Signature: _______________________");
  uf("Date", values.contractor1Date, 14);
  uf("Contractor 2 Name", values.contractor2, 22);
  uf("Title", values.contractor2Title, 14);
  p("Signature: _______________________");
  uf("Date", values.contractor2Date, 14);
  if ((values.contractor3 || "").trim()) {
    uf("Contractor 3 Name", values.contractor3, 22);
    uf("Title", values.contractor3Title, 14);
    p("Signature: _______________________");
    uf("Date", values.contractor3Date, 14);
  }

  doc.save("joint_bid_agreement.pdf");
};

export default function JointBidAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Joint Bid Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="jointbidagreement"
    />
  );
}
