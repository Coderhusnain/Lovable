import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Vendor Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "organizerName", label: "Organizer name", type: "text", required: true },
      { name: "organizerAddress", label: "Organizer address", type: "text", required: true },
      { name: "vendorName", label: "Vendor name", type: "text", required: true },
      { name: "vendorAddress", label: "Vendor address", type: "text", required: true },
      { name: "buildingName", label: "Building name", type: "text", required: true },
      { name: "buildingAddress", label: "Building address", type: "text", required: true },
      { name: "eventName", label: "Event name", type: "text", required: true },
      { name: "vendorBusiness", label: "Vendor business type", type: "text", required: true },
      { name: "minSquareFeet", label: "Minimum square feet", type: "text", required: true },
      { name: "eventStart", label: "Event start date", type: "date", required: true },
      { name: "eventEnd", label: "Event end date", type: "date", required: true },
      { name: "eventHoursFrom", label: "Public hours from", type: "text", required: true },
      { name: "eventHoursTo", label: "Public hours to", type: "text", required: true },
      { name: "installDateTime", label: "Installation date/time", type: "text", required: true },
      { name: "tearDownDeadline", label: "Tear-down deadline", type: "text", required: true },
      { name: "spaceFee", label: "Space fee", type: "text", required: true },
      { name: "grossReceiptPercent", label: "Gross daily receipts %", type: "text", required: true },
      { name: "cureDays", label: "Default cure days", type: "text", required: true },
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
  const title = "VENDOR AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Vendor Agreement is made as of ${v.effectiveDate || "__________"} between Organizer ${v.organizerName || "__________"} (${v.organizerAddress || "__________"}) and Vendor ${v.vendorName || "__________"} (${v.vendorAddress || "__________"}).`);
  p(`Recitals: Organizer manages ${v.buildingName || "________________"} at ${v.buildingAddress || "________________"} for event ${v.eventName || "________________"}; Vendor business ${v.vendorBusiness || "________________"} seeks participation.`);
  p("2. Purpose and Grant of Space", true);
  p(`Organizer grants limited non-exclusive license to occupy designated space; minimum ${v.minSquareFeet || "______"} sq ft; no lease/tenancy created.`);
  p("3-4. Event Dates/Hours and Installation/Tear-down", true);
  p(`Event dates ${v.eventStart || "__________"} to ${v.eventEnd || "__________"}; public hours ${v.eventHoursFrom || "________"} to ${v.eventHoursTo || "________"}.`);
  p(`Installation: ${v.installDateTime || "________"}; complete removal by ${v.tearDownDeadline || "________"}.`);
  p("5. Payment Terms", true);
  p(`Vendor pays space fee $${v.spaceFee || "__________"} on execution and ${v.grossReceiptPercent || "____"}% of gross daily receipts plus taxes.`);
  p("6-13. Appearance/Maintenance, Displays, Product standards, Staffing, Food restrictions, Insurance, Indemnification, Default apply.");
  p("14-24. Remedies, Force majeure, dispute resolution (AAA arbitration), governing law, entire agreement, severability, amendment, assignment, waiver, notices, signatures.");
  p(`14.2 Default cure period: ${v.cureDays || "____"} days.`);
  p(`17. Governing law: ${v.governingLawState || "__________________"}.`);
  doc.save("vendor_agreement.pdf");
};

export default function VendorAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Vendor Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="vendoragreement"
    />
  );
}

