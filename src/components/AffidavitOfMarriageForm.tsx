import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Affidavit Details",
    fields: [
      { name: "stateName", label: "State", type: "text", required: true },
      { name: "countyName", label: "County", type: "text", required: true },
      { name: "currentName", label: "Current name of applicant", type: "text", required: true },
      { name: "formerName", label: "Former name of applicant", type: "text", required: true },
      { name: "currentNameAssumedDate", label: "Approximate date current name assumed", type: "text", required: true },
      { name: "applicantDob", label: "Applicant date of birth", type: "date", required: true },
      { name: "yearsKnown", label: "Years you have known applicant", type: "text", required: true },
      { name: "relationshipToApplicant", label: "Your relationship to applicant", type: "text", required: true },
      { name: "currentAddress", label: "Current residential address", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "affiantName", label: "Affiant name", type: "text", required: true },
      { name: "affiantSignatureDate", label: "Affiant signature date", type: "date", required: true },
      { name: "notaryDate", label: "Notary sworn date", type: "date", required: true },
      { name: "notaryName", label: "Notary name", type: "text", required: true },
      { name: "notaryCommissionExpires", label: "Notary commission expires", type: "text", required: false },
      { name: "identityProof", label: "Identity proof details (optional)", type: "text", required: false },
      { name: "affiantForLegalNote", label: "Affiant name for legal note section", type: "text", required: false },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 20;
  const u = (v?: string, n = 16) => (v || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => {
    if (y + n > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const l = `${label}: `;
    doc.text(l, m, y);
    const x = m + doc.getTextWidth(l);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(20, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.8);
  const title = "AFFIDAVIT OF MARRIAGE";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`State of ${u(values.stateName)}`);
  p(`County of ${u(values.countyName)}`);
  p("I, the undersigned, do hereby make this affidavit and state as follows:");
  uf("1. Current Name of Applicant", values.currentName);
  uf("2. Approximate Date Current Name Was Assumed", values.currentNameAssumedDate);
  uf("3. Former Name of Applicant", values.formerName);
  uf("4. Applicant's Date of Birth", values.applicantDob);
  uf("5. Number of Years You Have Known the Applicant", values.yearsKnown);
  uf("6. By Current Name", values.currentName);
  uf("   By Former Name", values.formerName);
  uf("7. Your Relationship to the Applicant", values.relationshipToApplicant);
  p("8. The variance in the Applicant's name as it appears on their birth records and the name currently in use is due to:");
  p("The current name is used exclusively and for all purposes.");
  uf("9. Current residential address of Applicant", values.currentAddress);
  p("I solemnly swear (or affirm) that the information provided above is true and correct to the best of my knowledge and belief. I further affirm that the Applicant named herein has been known by both the present and former names as stated, and that they are one and the same individual.");
  p("The Applicant is known by their current name to friends, relatives, and within the community in which they reside.", false, 2.4);
  uf("Affiant's Name", values.affiantName);
  uf("Affiant's Signature Date", values.affiantSignatureDate);
  p(
    `Subscribed and sworn to (or affirmed) before me on this ${u(values.notaryDate, 8)} by ${u(values.affiantName)}, who is personally known to me or has provided satisfactory proof of identity ${u(values.identityProof, 8)}.`
  );
  uf("Signature of Notary Public", values.notaryName);
  uf("Name of Notary Public", values.notaryName);
  uf("My Commission Expires", values.notaryCommissionExpires);
  p("Notary Seal: __________________________");
  p("Make It Legal", true);
  p(`This Affidavit should be signed in front of a notary public by ${u(values.affiantForLegalNote || values.affiantName)}.`);
  p("Once signed in front of a notary, this document should be delivered to the appropriate court for filing.");
  p("Copies: The original should be filed with the Clerk of Court or delivered to the requesting business. The Affiant should maintain a copy.");
  p("Additional Assistance: If you are unsure or have questions regarding this Affidavit, seek legal assistance in your area.");

  doc.save("affidavit_of_marriage.pdf");
};

export default function AffidavitOfMarriage() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit Of Marriage"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="affidavitofmarriage"
    />
  );
}
