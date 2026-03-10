import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Affiant & Subject",
    fields: [
      { name: "affiantName", label: "Affiant full name", type: "text", required: true },
      { name: "affiantAddress", label: "Affiant address", type: "text", required: true },
      { name: "subjectName", label: "Subject full name", type: "text", required: true },
      { name: "affiantDob", label: "Affiant date of birth", type: "date", required: true },
      { name: "yearsKnown", label: "Years known", type: "text", required: true },
      { name: "monthsKnown", label: "Additional months known", type: "text", required: true },
      { name: "capacityKnown", label: "Capacity in which affiant knows subject", type: "text", required: true },
      { name: "signedByName", label: "This affidavit must be signed by", type: "text", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "signedName", label: "Signed name (affiant)", type: "text", required: true },
      { name: "signedDate", label: "Signed date", type: "date", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "county", label: "County", type: "text", required: true },
      { name: "notaryName", label: "Notary public name", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16;
  const W = 178;
  const LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) {
      doc.addPage();
      y = 18;
    }
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    doc.setFont("helvetica", "normal");
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const txt = (value || "").trim();
    if (txt) {
      doc.text(txt, x, y);
      doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(txt)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += LH + 1;
  };

  const title = "AFFIDAVIT OF CHARACTER";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p(
    `I, ${v.affiantName || "__________"}, of ${v.affiantAddress || "__________"}, do hereby certify that ` +
      `${v.subjectName || "___________"} is personally known to me and is of good moral character.`,
  );
  p(
    `My date of birth is ${v.affiantDob || "__________"} and I have been personally acquainted with ` +
      `${v.subjectName || "__________"} for ${v.yearsKnown || "__"} years and ${v.monthsKnown || "__"} months ` +
      `in the following capacity: ${v.capacityKnown || "__________"}.`,
  );
  uf("Signed", v.signedName);
  uf("Date", v.signedDate);
  uf("STATE OF", v.state);
  uf("COUNTY OF", v.county);
  uf("Notary Public", v.notaryName);
  p("Final Checklist for Affidavit of Character", true);
  p("Review the document; seek legal advice if necessary; execute before a notary public; and file/submit after notarization.");
  p(`This Affidavit must be signed by ${v.signedByName || "______________________"} in presence of a duly authorized notary.`);
  p("Copies and Recordkeeping: File original with clerk/requesting authority and keep a secure copy for records.");

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

