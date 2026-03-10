import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Roommate Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "roommates", label: "Roommates (names)", type: "textarea", required: true },
      { name: "premisesAddress", label: "Premises address", type: "text", required: true },
      { name: "landlordName", label: "Landlord", type: "text", required: true },
      { name: "rentalAgreementDate", label: "Rental agreement date", type: "date", required: true },
      { name: "termStart", label: "Term start", type: "date", required: true },
      { name: "termEnd", label: "Term end", type: "date", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
      { name: "monthlyRent", label: "Total monthly rent", type: "text", required: true },
      { name: "rentDueDay", label: "Rent due day", type: "text", required: true },
      { name: "securityDeposit", label: "Total security deposit", type: "text", required: true },
      { name: "utilityAllocations", label: "Utility allocations", type: "textarea", required: true },
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
  const title = "ROOMMATE AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Roommate Agreement is made as of ${v.effectiveDate || "__________"} by and between the undersigned roommates (${v.roommates || "________________"}).`);
  p(`Recitals: co-tenants at ${v.premisesAddress || "________________"} under Rental Agreement with ${v.landlordName || "________________"} dated ${v.rentalAgreementDate || "__________"}.`);
  p("1. Incorporation of Rental Agreement: roommates comply with all lease terms; this Agreement does not modify lease.");
  p(`2. Term: occupancy from ${v.termStart || "________"} through ${v.termEnd || "________"}, then month-to-month unless terminated in writing; early vacating roommate remains responsible until replacement/subtenant approved.`);
  p("3-5. Amendments/waiver/arbitration apply as drafted, including AAA arbitration panel and ongoing performance during arbitration.");
  p("6-12. Personal property, household duties, additional roommates, governing law, entire agreement, severability, landlord notice.");
  p(`13. Rent: total monthly rent $${v.monthlyRent || "__________"} due on day ${v.rentDueDay || "_____"} directly to landlord; joint and several liability applies.`);
  p(`14. Security Deposit: total $${v.securityDeposit || "__________"} distributed proportionately subject to lawful deductions.`);
  p("15. Pets: pet-owning roommate solely responsible for pet damage.");
  p(`16. Utilities: ${v.utilityAllocations || "________________"}. Failure to pay assigned utilities is material breach.`);
  p(`Governing law: ${v.governingLawState || "__________"}.`);
  p("IN WITNESS WHEREOF, roommates execute Agreement as of Effective Date. Signature lines for each roommate.");
  doc.save("roommate_agreement.pdf");
};

export default function RoommateAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Roommate Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="roommateagreement"
    />
  );
}

