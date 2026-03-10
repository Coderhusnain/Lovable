import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement Details",
    fields: [
      { name: "ownerName", label: "Property owner/client name", type: "text", required: true },
      { name: "ownerAddress", label: "Owner/client address", type: "text", required: true },
      { name: "agentName", label: "Real estate agent name", type: "text", required: true },
      { name: "agentAddress", label: "Agent address", type: "text", required: true },
      { name: "propertyAddress", label: "Property address", type: "text", required: true },
      { name: "scopeServices", label: "Scope of services", type: "textarea", required: true },
      { name: "termStart", label: "Agreement start date", type: "date", required: true },
      { name: "termEnd", label: "Agreement end date", type: "date", required: true },
      { name: "commissionStructure", label: "Commission/payment structure", type: "text", required: true },
      { name: "paymentDue", label: "Payment due terms", type: "text", required: true },
      { name: "governingLaw", label: "Governing law state", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "REAL ESTATE AGENT AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p("Other Names: Easement Agreement");
  p("What Is a Real Estate Agent Agreement?", true);
  p("Used when a property owner hires an agent to sell, lease, or manage real estate. It defines scope of services, commission/payment terms, duration, and rights/obligations of both parties.");
  p("When Should You Use It?", true);
  p("Use when hiring/supplying licensed real estate services, defining commissions/timelines, and avoiding disputes over duties/payment.");
  p("Why Important?", true);
  p("Clearly defines roles, payment expectations, engagement duration, legal protections, and professional relationship.");
  p("What It Includes?", true);
  p("Party details, scope of services, term, compensation/commission and due dates, independent contractor clause, confidentiality/liability, governing law.");
  p("How to Use After Creation", true);
  p("Review terms, customize where needed, sign, provide a copy to each party, and store securely.");
  p("Custom Data", true);
  p(`Owner/Client: ${v.ownerName || "________________"} (${v.ownerAddress || "________________"})`);
  p(`Agent: ${v.agentName || "________________"} (${v.agentAddress || "________________"})`);
  p(`Property: ${v.propertyAddress || "________________"}`);
  p(`Scope: ${v.scopeServices || "________________"}`);
  p(`Term: ${v.termStart || "________"} to ${v.termEnd || "________"}`);
  p(`Compensation: ${v.commissionStructure || "________________"} | Due: ${v.paymentDue || "________________"}`);
  p(`Governing Law: ${v.governingLaw || "________________"}`);
  p("Signature blocks for Agent and Client included at execution.");
  doc.save("real_estate_agent_agreement.pdf");
};

export default function RealEstateAgentAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Real Estate Agent Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="realestateagentagreement"
    />
  );
}

