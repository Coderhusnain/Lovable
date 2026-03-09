import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Client and Bidder",
    fields: [
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "clientPhone", label: "Client phone", type: "text", required: false },
      { name: "clientEmail", label: "Client email", type: "email", required: false },
      { name: "bidderCompany", label: "Bidder company name", type: "text", required: true },
      { name: "bidderAddress", label: "Bidder address", type: "text", required: true },
      { name: "bidderPhone", label: "Bidder phone", type: "text", required: false },
      { name: "bidderEmail", label: "Bidder email", type: "email", required: false },
    ],
  },
  {
    label: "Proposal Details",
    fields: [
      { name: "projectName", label: "Project / execution subject", type: "text", required: true },
      { name: "fromDate", label: "Schedule start date", type: "date", required: true },
      { name: "toDate", label: "Schedule end date", type: "date", required: true },
      { name: "scopeServices", label: "Scope of services", type: "textarea", required: true },
      { name: "estimatedTimeline", label: "Estimated timeline", type: "textarea", required: true },
      { name: "estimatedBudget", label: "Estimated budget / costs", type: "textarea", required: true },
      { name: "currency", label: "Currency", type: "text", required: true, placeholder: "USD" },
      { name: "keyPersonnel", label: "Key personnel", type: "textarea", required: true },
    ],
  },
  {
    label: "Validity and Execution",
    fields: [
      { name: "validityDays", label: "Proposal validity (days)", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "signatory", label: "Authorized signatory", type: "text", required: true },
      { name: "signName", label: "Signatory name", type: "text", required: true },
      { name: "designation", label: "Designation", type: "text", required: false },
      { name: "signDate", label: "Date", type: "date", required: true },
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
  const u = (value?: string, min = 24) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };

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
  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const startX = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, startX, y);
      const wLine = Math.max(12, doc.getTextWidth(shown));
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + wLine, y + 1.1);
    } else {
      const wLine = doc.getTextWidth("_".repeat(min));
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + wLine, y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "BID PROPOSAL";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p("1. Client Information", true);
  uf("Client Name", values.clientName);
  uf("Address", values.clientAddress);
  uf("Phone", values.clientPhone);
  uf("Email", values.clientEmail, 24, 2.5);

  p("2. Bidder Information", true);
  uf("Company Name", values.bidderCompany);
  uf("Address", values.bidderAddress);
  uf("Phone", values.bidderPhone);
  uf("Email", values.bidderEmail, 24, 3);

  p("3. Introduction", true);
  p(`We are honored to submit this Bid Proposal (the "Proposal") for the execution of ${u(values.projectName, 22)}, scheduled to take place between ${u(values.fromDate, 18)} and ${u(values.toDate, 18)}.`);
  p("This Proposal sets forth a detailed outline of the scope of services, estimated project schedule, budgetary framework, and professional approach for fulfillment of Client objectives.");
  p("The Bidder affirms this Proposal is submitted in good faith after careful review of Client requirements. This Proposal is not a legally binding agreement, but an offer to negotiate and, if accepted, to enter into a formal contract on substantially similar terms.");
  p("This Proposal is submitted to facilitate transparent evaluation, mutual understanding, and alignment of expectations prior to formal engagement.", false, 3);

  p("4. Scope of Services", true);
  p(values.scopeServices || "_".repeat(40));
  p("Services shall be rendered in accordance with industry standards, applicable regulations, and the Client's specific requirements.", false, 3);

  p("5. Estimated Timeline", true);
  p(values.estimatedTimeline || "_".repeat(40));
  p("Timeline may be reasonably adjusted due to unforeseen circumstances, material availability, regulatory approvals, or delays caused by Client/third parties. Changes require written communication and mutual approval.", false, 3);

  p("6. Estimated Budget / Costs", true);
  p(values.estimatedBudget || "_".repeat(40));
  p(`All prices are quoted in ${u(values.currency, 16)} and exclude applicable taxes, duties, or surcharges unless stated otherwise.`);
  p("Bidder may revise budget only for material scope/technical/schedule changes, with prior written Client approval.", false, 3);

  p("7. Key Personnel", true);
  p(values.keyPersonnel || "_".repeat(40));
  p("Each designated individual shall possess requisite professional credentials and experience.", false, 3);
  p("8. Client Responsibilities", true);
  p("Client shall provide site/document access and information; timely communication/decisions; authorized representative; timely payments; and permits/consents under Client control. Non-compliance may cause reasonable time/cost adjustments.", false, 3);
  p("9. Proposal Validity", true);
  p(`This Proposal remains valid for ${u(values.validityDays, 8)} days from submission date unless extended in writing.`, false, 3);
  p("10. Confidentiality", true);
  p("Both parties shall maintain strict confidentiality regarding proprietary/sensitive information exchanged in connection with this Proposal, except as required by law.", false, 3);
  p("11. No Waiver / Reservation of Rights", true);
  p("Submission of this Proposal is not a waiver of any right/claim/privilege and does not obligate either party to contract absent a definitive written agreement.", false, 3);
  p("12. Governing Law", true);
  p(`This Proposal is governed by laws of the State of ${u(values.governingState, 18)}, United States of America, without conflict-of-law principles.`, false, 3);
  p("13. Conclusion", true);
  p("The Bidder respectfully submits this Proposal as demonstration of competence, commitment, and capacity to deliver Services with professionalism, quality, and efficiency. The Bidder looks forward to discussing and negotiating terms toward formal contract execution.", false, 3);

  p("For and on behalf of the Bidder", true, 1);
  uf("Authorized Signatory", values.signatory);
  uf("Name", values.signName, 34);
  uf("Designation", values.designation, 30);
  uf("Company Name", values.bidderCompany, 28);
  uf("Date", values.signDate, 26);

  doc.save("bid_proposal.pdf");
};

export default function BidProposalForm() {
  return (
    <FormWizard
      steps={steps}
      title="Bid Proposal"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="bidproposal"
    />
  );
}
