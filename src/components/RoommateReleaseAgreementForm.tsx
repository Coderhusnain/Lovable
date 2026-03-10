import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Roommate and Lease",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "releasingRoommate", label: "Releasing roommate name", type: "text", required: true },
      { name: "remainingRoommates", label: "Remaining roommates (names)", type: "textarea", required: true },
      { name: "premisesAddress", label: "Premises full address", type: "textarea", required: true },
      { name: "leaseDate", label: "Original lease date", type: "date", required: true },
      { name: "vacateDate", label: "Vacate date", type: "date", required: true },
      { name: "landlordName", label: "Landlord name", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "releasingSignDate", label: "Releasing roommate sign date", type: "date", required: true },
      { name: "remainingSignDate", label: "Remaining roommate sign date", type: "date", required: true },
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
  const title = "ROOMMATE RELEASE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.3);

  p(
    `This Roommate Release Agreement (the "Agreement") is made and entered into on ${u(v.effectiveDate)} (the "Effective Date"), by and between ${u(v.releasingRoommate)} (the "Releasing Roommate") and ${u(v.remainingRoommates, 24)} (collectively, the "Remaining Roommates"). The Releasing Roommate and the Remaining Roommates are collectively referred to as the "Roommates".`
  );
  p(`WHEREAS, the Roommates are co-tenants of the residential premises located at ${u(v.premisesAddress, 24)} (the "Premises");`);
  p(`WHEREAS, the Roommates entered into a lease agreement dated ${u(v.leaseDate)} (the "Lease");`);
  p("WHEREAS, the Releasing Roommate desires to withdraw from the Lease and be released from rights, duties, liabilities, and obligations thereunder;");
  p("WHEREAS, the Remaining Roommates agreed to assume full responsibility for obligations and liabilities under the Lease for the remainder of the term;");
  p("NOW, THEREFORE, the Roommates agree as follows:", true);

  p("1. Vacating of Premises", true);
  p(`The Releasing Roommate shall vacate and relinquish possession of the Premises on ${u(v.vacateDate)} and assigns all possessory rights to the Remaining Roommates.`);
  p("2. Assumption of Obligations", true);
  p("Effective as of the Effective Date, the Remaining Roommates assume and are solely responsible for full and timely performance of all Lease obligations, including rent, utilities, and other charges.");
  p("3. Release of Releasing Roommate", true);
  p("The Releasing Roommate is fully and irrevocably released from all obligations, liabilities, claims, and responsibilities under the Lease accruing on or after the Effective Date.");
  p("4. Security Deposit", true);
  p("The Releasing Roommate assigns all rights, title, and interest in the security deposit to Remaining Roommates. Any return entitlement is solely between Remaining Roommates and landlord.");
  p("5. Landlord's Consent and Release", true);
  p(`The landlord, ${u(v.landlordName)}, consents and agrees to release the Releasing Roommate from obligations/liabilities under the Lease arising on or after the Effective Date.`);

  p("IN WITNESS WHEREOF, the Roommates executed this Agreement as of the Effective Date.", true);
  uf("Releasing Roommate", v.releasingRoommate);
  uf("Date", v.releasingSignDate);
  uf("Remaining Roommate(s)", v.remainingRoommates);
  uf("Date", v.remainingSignDate);

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
