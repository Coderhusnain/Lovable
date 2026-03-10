import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "recipientName", label: "Client (Recipient) name", type: "text", required: true },
      { name: "recipientAddress", label: "Client address", type: "text", required: true },
      { name: "providerName", label: "Service Provider name", type: "text", required: true },
      { name: "providerAddress", label: "Provider address", type: "text", required: true },
      { name: "servicesBeginDate", label: "Services begin date", type: "date", required: true },
      { name: "recipientSelectedFormat", label: "Selected final format", type: "text", required: true },
    ],
  },
  {
    label: "Payment and Cancellation",
    fields: [
      { name: "totalFee", label: "Total fee", type: "text", required: true },
      { name: "includedHours", label: "Included videography hours", type: "text", required: true },
      { name: "perCopyFee", label: "Fee per copy of completed video", type: "text", required: true },
      { name: "cancelNoticeDays", label: "Minimum cancellation notice days", type: "text", required: true },
      { name: "fullPaymentDays", label: "Full payment if cancelled less than __ days", type: "text", required: true },
    ],
  },
  {
    label: "Legal Terms",
    fields: [
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "arbitrationLocation", label: "Arbitration location", type: "text", required: true },
      { name: "cureDays", label: "Default cure period days", type: "text", required: true },
      { name: "termEndDate", label: "Agreement termination date", type: "date", required: true },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "recipientSignName", label: "Recipient signatory name", type: "text", required: true },
      { name: "recipientSignDate", label: "Recipient sign date", type: "date", required: true },
      { name: "providerSignName", label: "Provider signatory name", type: "text", required: true },
      { name: "providerSignDate", label: "Provider sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
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
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(20, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("____________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "VIDEOGRAPHY SERVICES AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.2);

  p(`This Videography Services Agreement ("Agreement") is entered into as of ${u(v.effectiveDate)} ("Effective Date"), by and between:`);
  uf("Client (Recipient) Name", v.recipientName);
  uf("Client Address", v.recipientAddress);
  uf("Service Provider Name", v.providerName);
  uf("Provider Address", v.providerAddress);
  p('(collectively referred to as the "Parties").');

  p("1. DESCRIPTION OF SERVICES", true);
  p(`1.1 Beginning on ${u(v.servicesBeginDate)}, the Provider shall render professional videography services to the Recipient (the "Services").`);
  p("1.2 Services include videographic coverage, high-quality digital footage capture, professional post-production editing/processing, and final delivery.");
  p(`1.2 Final files delivered in selected format: ${u(v.recipientSelectedFormat)}.`);
  p("1.3 Additional services beyond listed scope require separate written agreement and additional fees.");

  p("2. PERFORMANCE OF SERVICES", true);
  p("2.1 Provider shall exercise commercially reasonable efforts for complete and professional coverage.");
  p("2.2 Provider shall use professional-grade equipment and techniques and timely delivery consistent with industry standards.");
  p("2.3 Footage shall be captured, edited, and mastered using professional digital production methods.");
  p("2.4 Final deliverables are subject to technical feasibility.");

  p("3. PAYMENT TERMS", true);
  p(`3.1 Total fee: $${u(v.totalFee)}.`);
  p(`3.2 Fee includes up to ${u(v.includedHours)} hours of videography coverage.`);
  p("3.3 Provider shall provide proof of final video delivery upon completion.");
  p(`3.4 Upon satisfaction, Recipient agrees to pay $${u(v.perCopyFee)} per copy of completed video, plus additional quoted fees for compilation edits/special requests.`);

  p("4. CANCELLATION POLICY", true);
  p(`4.1 Minimum ${u(v.cancelNoticeDays, 2)} days written notice required for cancellation.`);
  p(`4.2 Cancellation less than ${u(v.fullPaymentDays, 2)} days prior to scheduled service date results in full payment due.`);

  p("5-11. GENERAL LEGAL TERMS", true);
  p("Entire Agreement, Severability, Amendments, Governing Law, Notice, Waiver, and Assignment apply as drafted.");
  uf("Governing Law State", v.governingState);

  p("12. FORCE MAJEURE", true);
  p("Neither party is liable for failure/delay due to events beyond reasonable control, and affected party shall promptly notify and resume performance as practicable.");
  p("13. ARBITRATION", true);
  p("Disputes shall be resolved by binding arbitration under the Commercial Arbitration Rules of the American Arbitration Association.");
  uf("Arbitration Location", v.arbitrationLocation);
  p("Arbitrator may not modify Agreement or award punitive damages. Decision is final and enforceable.");

  p("14-24. ADDITIONAL CLAUSES", true);
  p("Courtesy and Cooperation, Indemnification, Warranty, Default, Remedies, Term, Termination, Ownership of Work Product, Social Media Ownership, Independent Contractor, and Confidentiality apply as drafted.");
  uf("Default Cure Days", v.cureDays);
  uf("Term End Date", v.termEndDate);
  uf("Termination Notice Days", v.terminationNoticeDays);

  p("25. SIGNATURES", true);
  uf("RECIPIENT Name", v.recipientSignName);
  uf("RECIPIENT Date", v.recipientSignDate);
  uf("PROVIDER Name", v.providerSignName);
  uf("PROVIDER Date", v.providerSignDate);

  doc.save("videography_services_agreement.pdf");
};

export default function VideographyServicesAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Videography Services Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="videographyagreement"
    />
  );
}
