import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "recipientName", label: "Recipient name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient address", type: "text", required: true },
      { name: "providerName", label: "Service Provider name", type: "text", required: true },
      { name: "providerAddress", label: "Service Provider address", type: "text", required: true },
      { name: "governingLaw", label: "Applicable law", type: "text", required: true },
    ],
  },
  {
    label: "Services & Fees",
    fields: [
      { name: "candidateCriteria", label: "Candidate skills/background criteria", type: "textarea", required: true },
      { name: "temporaryFee", label: "Temporary staff fee", type: "text", required: true },
      { name: "transferFee", label: "Transfer fee", type: "text", required: true },
      { name: "permanentFee", label: "Permanent staff fee", type: "text", required: true },
      { name: "invoiceDays", label: "Invoice payment timeline (business days)", type: "text", required: true },
      { name: "terminationNoticeDays", label: "Early termination notice days", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "recipientSignature", label: "Recipient signature (typed)", type: "text", required: true },
      { name: "recipientSignDate", label: "Recipient sign date", type: "date", required: true },
      { name: "providerSignature", label: "Provider signature (typed)", type: "text", required: true },
      { name: "providerSignDate", label: "Provider sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 16;
  const W = 178;
  const LH = 5.6;
  let y = 18;

  const ensure = (h = 10) => {
    if (y + h > 282) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.8) => {
    ensure(12);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    const safeValue = (value || "").trim();
    doc.setFont("helvetica", "normal");
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    if (safeValue) {
      doc.text(safeValue, x, y);
      doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(safeValue)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += LH + 1.2;
  };

  const title = "STAFFING AGENCY CONTRACT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p(
    `This Staffing Agency Contract ("Contract") is made effective as of ${v.effectiveDate || "____________"}, by and between ` +
      `${v.recipientName || "____________"} of ${v.recipientAddress || "____________"} ("Recipient"), and ` +
      `${v.providerName || "____________"} of ${v.providerAddress || "____________"} ("Service Provider").`,
  );

  p("1. DESCRIPTION OF SERVICES", true);
  p(
    `Beginning on ${v.effectiveDate || "____________"}, Service Provider shall submit names and resumes of qualified candidates for positions ` +
      `with the following skills/educational background: ${v.candidateCriteria || "____________"}.`,
  );
  p("2. PAYMENT FOR SERVICES", true);
  p(
    `Temporary Staff: ${v.temporaryFee || "____________"}; Transfer Fee: ${v.transferFee || "____________"}; Permanent Staff: ${v.permanentFee || "____________"}. ` +
      `Invoices are submitted monthly and paid within ${v.invoiceDays || "____"} business days of receipt of valid invoice.`,
  );
  p("3. SERVICE PROVIDER'S REPRESENTATION", true);
  p(
    "Service Provider represents that it and supplied workers have rights to perform services without violating obligations to others, " +
      "and have right to disclose all information transmitted in performing services under this Contract.",
  );
  p("4. INJURIES", true);
  p(
    "Service Provider shall obtain appropriate insurance for itself and its employees (if any), and waives recovery rights against Recipient " +
      "for injuries resulting from Service Provider negligence.",
  );
  p("5. INDEMNIFICATION", true);
  p("Service Provider indemnifies and holds Recipient harmless from claims/losses/expenses (including reasonable attorney fees) arising from Provider acts/omissions.");
  p("6. LIMITATION OF LIABILITY", true);
  p("Neither party is liable for indirect, incidental, consequential, special, or exemplary damages, including loss of revenue/profit/business.");
  p("7. ATTORNEYS' FEES", true);
  p("Prevailing party in suit/action/proceeding/arbitration is entitled to recover costs and reasonable attorneys' fees.");
  p("8. ENTIRE CONTRACT", true);
  p("This Contract is entire agreement and supersedes prior simultaneous/previous oral or written agreements on same subject.");
  p("9. SEVERABILITY", true);
  p("If any provision is invalid/unenforceable, remaining provisions remain valid and enforceable; invalid provision is construed as limited to be enforceable.");
  p("10. AMENDMENT", true);
  p("Modifications/amendments/supplements must be in writing signed by all parties.");
  p("11. WAIVER", true);
  p("Failure to enforce any provision is not waiver/limitation of right to later enforce strict compliance.");
  p("12. APPLICABLE LAW", true);
  p(`This Contract is governed by the laws of ${v.governingLaw || "____________"}.`);
  p("13. TERM", true);
  p(
    "Contract begins on Effective Date and remains in effect until completion of Services unless earlier terminated. " +
      "Termination Date may be altered by mutual written consent.",
  );
  p("14. TERMINATION", true);
  p(
    `Either party may terminate with or without cause upon ${v.terminationNoticeDays || "____"} days' written notice. ` +
      "Upon early termination, Provider receives pro-rated payment for services rendered before early termination date.",
  );
  p("15. RELATIONSHIP OF PARTIES", true);
  p("Service Provider is an independent contractor; neither Provider nor its workers are employees of Recipient for payroll/tax purposes.");
  p("16. ALTERNATIVE DISPUTE RESOLUTION", true);
  p("Parties first attempt friendly negotiation, then good-faith mediation under applicable statutory mediation rules.");
  p("17. CONFIDENTIALITY", true);
  p(
    "Service Provider shall not directly/indirectly use or disclose Recipient proprietary information and shall treat it as strictly confidential. " +
      "Upon termination, Provider returns records/notes/documentation and other items used/created/controlled during term.",
  );
  p("18. SIGNATURES", true);
  p("This Contract shall be signed by the Recipient and the Provider, effective as of the date first written above.");

  uf("The Recipient - Signature", v.recipientSignature);
  uf("Date", v.recipientSignDate);
  y += 1.2;
  uf("The Provider - Signature", v.providerSignature);
  uf("Date", v.providerSignDate);

  doc.save("staffing_agency_contract.pdf");
};

export default function StaffingAgencyContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Staffing Agency Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="staffingagencycontract"
    />
  );
}

