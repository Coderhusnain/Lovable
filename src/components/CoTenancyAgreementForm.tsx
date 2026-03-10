import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Lease",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "coTenants", label: "Co-tenant names (comma-separated)", type: "textarea", required: true },
      { name: "landlordName", label: "Landlord name", type: "text", required: true },
      { name: "dwellingAddress", label: "Dwelling address", type: "text", required: true },
      { name: "leaseDate", label: "Lease date", type: "date", required: true },
      { name: "leaseStart", label: "Lease start", type: "date", required: true },
      { name: "leaseEnd", label: "Lease end", type: "date", required: true },
      { name: "securityDeposit", label: "Security deposit amount", type: "text", required: true },
      { name: "monthlyRent", label: "Monthly rent", type: "text", required: true },
      { name: "repairApprovalLimit", label: "Repair approval limit", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.3);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "CO-TENANCY AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Co-Tenancy Agreement is made as of ${v.effectiveDate || "___"}, among ${v.coTenants || "___"} (collectively, "Co-Tenants").`);
  p(`Recitals: Lease dated ${v.leaseDate || "___"} with ${v.landlordName || "___"} for dwelling at ${v.dwellingAddress || "___"}, term ${v.leaseStart || "___"} to ${v.leaseEnd || "___"}, security deposit $${v.securityDeposit || "___"}, monthly rent $${v.monthlyRent || "___"}.`);
  p("1. Compliance with lease/rules/laws; 2. Allocation of rent with defaulting co-tenant responsible for late fees; 3. Utilities/services allocation; 4. Shared expenses and damage responsibility.");
  p("5. Termination of co-tenancy by replacement acceptable to co-tenants/landlord or written release by remaining co-tenants.");
  p("6. Security deposit refund pro rata unless otherwise agreed.");
  p("7. Joint and several liability to landlord; mutual indemnification among co-tenants.");
  p("8. Long-distance telephone charges borne individually.");
  p(`9. No repairs/alterations/improvements above $${v.repairApprovalLimit || "___"} without prior written consent of all co-tenants.`);
  p("10. Pets comply with landlord policy and owner responsible for pet-related damages.");
  p("11. Agreement governs rights among co-tenants and does not amend lease.");
  p("12. Reimbursement rights for overpayments.");
  p("13. Survival/amendment; due process required for removal.");
  p(`14. Governing law: ${v.governingLawState || "___"}.`);
  p("15. Prior co-tenancy agreements superseded except outstanding financial obligations.");
  p("SIGNATURES: each co-tenant signs name/date lines.");
  doc.save("co_tenancy_agreement.pdf");
};

export default function CoTenancyAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Co-Tenancy Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="cotenancyagreement"
    />
  );
}

