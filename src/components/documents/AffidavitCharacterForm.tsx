import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "stateName", label: "State / Province", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "countyName", label: "County", type: "text", required: true },
    ],
  },
  {
    label: "Affiant and Subject",
    fields: [
      { name: "affiantName", label: "Affiant name", type: "text", required: true },
      { name: "affiantAddress", label: "Affiant address", type: "text", required: true },
      { name: "subjectName", label: "Subject name", type: "text", required: true },
      { name: "affiantDob", label: "Affiant date of birth", type: "date", required: true },
    ],
  },
  {
    label: "Acquaintance Details",
    fields: [
      { name: "yearsKnown", label: "Years known", type: "text", required: true },
      { name: "monthsKnown", label: "Months known", type: "text", required: true },
      { name: "capacityKnown", label: "Capacity known", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "signedName", label: "Signed by", type: "text", required: true },
      { name: "signedDate", label: "Date", type: "date", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [{ name: "notaryName", label: "Notary Public", type: "text", required: true }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
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
    doc.setFontSize(10.4);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.4);
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
  doc.setFontSize(12.6);
  const title = "AFFIDAVIT OF CHARACTER";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 10;

  p(`I, ${u(v.affiantName)}, of ${u(v.affiantAddress)}, do hereby certify that ${u(v.subjectName)} is personally known to me and is of good moral character.`);
  p(`My date of birth is ${u(v.affiantDob)} and I have been personally acquainted with ${u(v.subjectName)} for ${u(v.yearsKnown, 2)} years and ${u(v.monthsKnown, 2)} months in the following capacity: ${u(v.capacityKnown)}.`);
  uf("Signed", v.signedName);
  uf("Date", v.signedDate);
  uf("STATE OF", v.stateName);
  uf("COUNTY OF", v.countyName);
  uf("Notary Public", v.notaryName);

  doc.save("affidavit_of_character.pdf");
};

export default function AffidavitCharacterForm() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit of Character"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="affidavitcharacter"
    />
  );
}
