import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State / Province", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "county", label: "County", type: "text", required: true },
    ],
  },
  {
    label: "Applicant Identity",
    fields: [
      { name: "currentName", label: "Current name of applicant", type: "text", required: true },
      { name: "currentNameAssumedDate", label: "Approximate date current name was assumed", type: "text", required: true },
      { name: "formerName", label: "Former name of applicant", type: "text", required: true },
      { name: "applicantDob", label: "Applicant date of birth", type: "date", required: true },
      { name: "yearsKnown", label: "Years known", type: "text", required: true },
    ],
  },
  {
    label: "Name Usage and Relationship",
    fields: [
      { name: "byCurrentName", label: "Known by current name", type: "text", required: true },
      { name: "byFormerName", label: "Known by former name", type: "text", required: true },
      { name: "relationshipToApplicant", label: "Relationship to applicant", type: "text", required: true },
      { name: "currentResidentialAddress", label: "Applicant current residential address", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "affiantName", label: "Affiant name", type: "text", required: true },
      { name: "affiantSignature", label: "Affiant signature name", type: "text", required: true },
      { name: "affiantDate", label: "Affiant date", type: "date", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "notaryDay", label: "Notary day", type: "text", required: true },
      { name: "notaryMonth", label: "Notary month", type: "text", required: true },
      { name: "notaryYear", label: "Notary year", type: "text", required: true },
      { name: "notaryAppearanceName", label: "Name appearing before notary", type: "text", required: true },
      { name: "notaryIdentityProof", label: "Identity proof details", type: "text", required: false },
      { name: "notarySignature", label: "Notary public signature name", type: "text", required: true },
      { name: "notaryName", label: "Notary public full name", type: "text", required: true },
      { name: "commissionExpires", label: "Commission expires", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.3;
  const limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.2);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(18, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("____________________", x, y);
    }
    y += lh + 0.8;
  };

  const title = "AFFIDAVIT OF MARRIAGE";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.6);
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;

  p(`State of ${u(v.state)}`);
  p(`County of ${u(v.county)}`);
  p("I, the undersigned, do hereby make this affidavit and state as follows:");
  uf("1. Current Name of Applicant", v.currentName);
  uf("2. Approximate Date Current Name Was Assumed", v.currentNameAssumedDate);
  uf("3. Former Name of Applicant", v.formerName);
  uf("4. Applicant's Date of Birth", v.applicantDob);
  uf("5. Number of Years You Have Known the Applicant", v.yearsKnown);
  uf("6. By Current Name", v.byCurrentName || v.currentName);
  uf("   By Former Name", v.byFormerName || v.formerName);
  uf("7. Your Relationship to the Applicant", v.relationshipToApplicant);
  p("8. The variance in the Applicant's name as it appears on their birth records and the name currently in use is due to:");
  p("The current name is used exclusively and for all purposes.");
  uf("9. The current residential address of the Applicant is", v.currentResidentialAddress);
  p("I solemnly swear (or affirm) that the information provided above is true and correct to the best of my knowledge and belief.");
  p("I further affirm that the Applicant has been known by both present and former names and is one and the same individual.");
  p("The Applicant is known by their current name to friends, relatives, and within the community in which they reside.");
  uf("Affiant's Name", v.affiantName);
  uf("Affiant's Signature", v.affiantSignature);
  uf("Date", v.affiantDate);
  p(
    `Subscribed and sworn to (or affirmed) before me on this ${u(v.notaryDay, 2)} day of ${u(v.notaryMonth)}, ${u(v.notaryYear, 4)}, by ${u(v.notaryAppearanceName)}, who is personally known to me or has provided satisfactory proof of identity ${u(v.notaryIdentityProof, 10)}.`
  );
  uf("Signature of Notary Public", v.notarySignature);
  uf("Name of Notary Public", v.notaryName);
  uf("My Commission Expires", v.commissionExpires);
  p("Notary Seal: __________________________");
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);

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
