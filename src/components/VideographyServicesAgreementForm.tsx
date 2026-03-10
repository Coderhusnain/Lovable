import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Videography Info",
    fields: [
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "videographerName", label: "Videographer name", type: "text", required: true },
      { name: "projectType", label: "Project/event type", type: "text", required: true },
      { name: "shootDate", label: "Shoot date", type: "date", required: true },
      { name: "shootDuration", label: "Shoot duration/schedule", type: "text", required: true },
      { name: "servicesDescription", label: "Services description", type: "textarea", required: true },
      { name: "editingTimeline", label: "Editing/delivery timeline", type: "text", required: true },
      { name: "paymentTerms", label: "Payment/deposit terms", type: "text", required: true },
      { name: "cancellationTerms", label: "Cancellation/refund terms", type: "text", required: true },
      { name: "ownershipTerms", label: "Ownership/usage rights", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18; const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "VIDEOGRAPHY AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p("Other Names: Videographer Contract, Video Production Contract, Wedding Videography Contract.");
  p("What Is a Videography Agreement?", true);
  p("A formal contract used when a videographer is hired for events/projects. It defines services, filming schedule, payment, ownership of footage, and cancellation/refund terms.");
  p("When Should You Use It?", true);
  p("Use when hiring or offering videography services to define deliverables, timelines, pricing, rights, and legal protections.");
  p("Key Clauses", true);
  p("Cancellation policy, deposit, default clause, confidentiality, work-product ownership, indemnity, dispute resolution, governing law.");
  p("Project Data", true);
  p(`Client: ${v.clientName || "________________"} | Videographer: ${v.videographerName || "________________"}`);
  p(`Project/Event: ${v.projectType || "________________"} on ${v.shootDate || "__________"} | Schedule: ${v.shootDuration || "________________"}`);
  p(`Services: ${v.servicesDescription || "________________"}`);
  p(`Editing/Delivery: ${v.editingTimeline || "________________"}`);
  p(`Payment/Deposit: ${v.paymentTerms || "________________"}`);
  p(`Cancellation/Refund: ${v.cancellationTerms || "________________"}`);
  p(`Ownership/Usage: ${v.ownershipTerms || "________________"}`);
  p(`Governing Law: ${v.governingLawState || "________________"}`);
  p("Signature blocks for Client and Videographer included.");
  doc.save("videography_agreement.pdf");
};

export default function VideographyServicesAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Videography Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="videographyagreement"
    />
  );
}

