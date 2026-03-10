import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Release Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "releasingRoommate", label: "Releasing roommate", type: "text", required: true },
      { name: "remainingRoommates", label: "Remaining roommates", type: "text", required: true },
      { name: "premisesAddress", label: "Premises address", type: "text", required: true },
      { name: "leaseDate", label: "Lease date", type: "date", required: true },
      { name: "vacateDate", label: "Vacate date", type: "date", required: true },
      { name: "landlordName", label: "Landlord name", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10.3);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "ROOMMATE RELEASE AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Roommate Release Agreement is made on ${v.effectiveDate || "___"} between ${v.releasingRoommate || "___"} ("Releasing Roommate") and ${v.remainingRoommates || "___"} ("Remaining Roommates").`);
  p(`Recitals: co-tenants at ${v.premisesAddress || "___"} under Lease dated ${v.leaseDate || "___"}. Releasing Roommate seeks release; Remaining Roommates assume all obligations for remainder of lease term.`);
  p(`1. Vacating of Premises: Releasing Roommate vacates on ${v.vacateDate || "___"} and assigns possessory rights to Remaining Roommates.`);
  p("2. Assumption of Obligations: Remaining Roommates are solely responsible for lease obligations after Effective Date.");
  p("3. Release of Releasing Roommate: fully and irrevocably released from obligations/liabilities accruing on/after Effective Date.");
  p("4. Security Deposit: Releasing Roommate assigns all rights in deposit to Remaining Roommates.");
  p(`5. Landlord Consent and Release: landlord ${v.landlordName || "___"} consents and releases Releasing Roommate from obligations/liabilities on/after Effective Date.`);
  p("SIGNATURES: Releasing Roommate and Remaining Roommate sign/date.");
  doc.save("roommate_release_agreement.pdf");
};

export default function RoommateReleaseAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Roommate Release Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="roommatereleaseagreement"
    />
  );
}

