import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Scope",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "ownerName", label: "Owner full name", type: "text", required: true },
      { name: "ownerAddress", label: "Owner address", type: "text", required: true },
      { name: "carpenterName", label: "Carpenter full name", type: "text", required: true },
      { name: "carpenterAddress", label: "Carpenter address", type: "text", required: true },
      { name: "startDate", label: "Start date", type: "date", required: true },
      { name: "endDate", label: "End date", type: "date", required: true },
      { name: "servicesDescription", label: "Detailed services description", type: "textarea", required: true },
      { name: "paymentRate", label: "Payment rate", type: "text", required: true },
      { name: "paymentSchedule", label: "Payment schedule", type: "textarea", required: true },
      { name: "changeOrderRate", label: "Change order hourly rate", type: "text", required: false },
      { name: "invoiceDueDays", label: "Invoice due days", type: "text", required: true },
    ],
  },
  {
    label: "Legal and Signatures",
    fields: [
      { name: "cureDays", label: "Breach cure days", type: "text", required: true },
      { name: "governingState", label: "Governing state", type: "text", required: true },
      { name: "ownerSignName", label: "Owner signing name", type: "text", required: true },
      { name: "ownerSignDate", label: "Owner sign date", type: "date", required: true },
      { name: "carpenterSignName", label: "Carpenter signing name", type: "text", required: true },
      { name: "carpenterSignDate", label: "Carpenter sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 18, tw = w - m * 2, lh = 5.6, limit = 280;
  let y = 20;
  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };
  const p = (t: string, b = false, g = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + g;
  };
  const uf = (label: string, value?: string, min = 20, gap = 1.8) => {
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
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "CARPENTRY CONTRACT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Carpentry Contract is entered as of ${u(values.effectiveDate, 12)}, by and between ${u(values.ownerName, 18)} of ${u(values.ownerAddress, 18)} ("Owner"), and ${u(values.carpenterName, 18)} of ${u(values.carpenterAddress, 18)} ("Carpenter").`);
  p('Owner and Carpenter are collectively "Parties" and individually a "Party".', false, 3);
  p("1. Scope of Work", true);
  p("Carpenter shall provide carpentry services and all necessary materials per approved plans/specifications/change orders, in good and workmanlike manner per industry standards and applicable law.");
  p("2. Materials, Labor, and Permits", true);
  p("Carpenter furnishes all materials, labor, tools, equipment, freight, permits, and licenses at sole expense.");
  p("3. Description of Services", true);
  p(`Commencing on ${u(values.startDate, 12)}, Carpenter shall perform: ${values.servicesDescription || "_".repeat(50)}`);
  p("4. Payment Terms", true);
  p(`Owner compensates Carpenter at ${u(values.paymentRate, 14)} per hour/day/project per schedule: ${values.paymentSchedule || "_".repeat(40)}.`);
  p(`Additional work requires written change order and may be billed at ${u(values.changeOrderRate, 14)}. Payment due within ${u(values.invoiceDueDays, 8)} days of invoicing.`);
  p("5. Term and Termination", true);
  p(`Contract remains in effect until ${u(values.endDate, 12)}, unless earlier terminated for material breach uncured within ${u(values.cureDays, 8)} days of notice.`);
  p("6-12. Core Legal Terms", true);
  p("Independent contractor status; ownership of work product by Owner; confidentiality survives; insurance and injury liability on Carpenter; Carpenter indemnifies Owner; entire agreement and severability apply.");
  p("13. Governing Law", true);
  p(`This Contract is governed by laws of ${u(values.governingState, 16)}.`);
  p("14. Execution", true);
  p("OWNER");
  uf("Name", values.ownerSignName, 26);
  p("Signature: ____________________________");
  uf("Date", values.ownerSignDate, 12);
  p("CARPENTER");
  uf("Name", values.carpenterSignName, 26);
  p("Signature: ____________________________");
  uf("Date", values.carpenterSignDate, 12);

  doc.save("carpentry_contract.pdf");
};

export default function CarpentryContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Carpentry Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="carpentrycontract"
    />
  );
}
