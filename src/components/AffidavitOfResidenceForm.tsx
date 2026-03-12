import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State / Province", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
    ],
  },
  {
    label: "Affiant Details",
    fields: [
      { name: "affiantName", label: "Affiant full name", type: "text", required: true },
      { name: "fullResidenceAddress", label: "Residence address", type: "text", required: true },
    ],
  },
  {
    label: "Residence Statements",
    fields: [
      { name: "residedPlace", label: "Resided in (place)", type: "text", required: true },
      { name: "residedState", label: "Resided in state", type: "text", required: true },
      { name: "coResidents", label: "Names of co-residents", type: "textarea", required: true },
      { name: "applicableLaw", label: "Perjury law jurisdiction", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "affidavitDate", label: "Affidavit date", type: "date", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "notaryPublicName", label: "Notary public name", type: "text", required: true },
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

  const title = "AFFIDAVIT OF RESIDENCE";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.6);
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 10;

  p(`1. I ${u(v.affiantName)} being of lawful age and a resident at ${u(v.fullResidenceAddress)} in ${u(v.city)} do on oath and under penalties of perjury, depose and say:`);
  p(`2. I have resided in ${u(v.residedPlace)}, state ${u(v.residedState)}.`);
  p("3. I made this affidavit for no improper use.");
  p(`4. The following individuals reside with me at the above address: ${u(v.coResidents, 20)}.`);
  p(`5. I certify under penalty of perjury under ${u(v.applicableLaw)} law that I know the contents of this Affidavit signed by me and that the statements are true and correct.`);
  uf("Date", v.affidavitDate);
  p(`STATE OF ${u(v.state)}, COUNTRY OF ${u(v.country)}`);
  uf("Notary Public", v.notaryPublicName);

  doc.save("affidavit_of_residence.pdf");
};

export default function AffidavitOfResidence() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit Of Residence"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="affidavitofresidence"
    />
  );
}
