import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Residence",
    fields: [
      { name: "affiantName", label: "Affiant full name", type: "text", required: true },
      { name: "streetAddress", label: "Residential address", type: "text", required: true },
      { name: "cityName", label: "City", type: "text", required: true },
      { name: "stateName", label: "State", type: "text", required: true },
      { name: "countryName", label: "Country", type: "text", required: true },
      { name: "residedInPlace", label: "Resided in (place)", type: "text", required: true },
      { name: "residedState", label: "Resided in state", type: "text", required: true },
      { name: "coResidents", label: "Individuals residing at address", type: "textarea", required: true },
      { name: "applicableLaw", label: "Applicable perjury law", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "affidavitDate", label: "Affidavit date", type: "date", required: true },
      { name: "notaryName", label: "Notary public name", type: "text", required: false },
    ],
  }
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 20;
  const u = (v?: string, n = 14) => (v || "").trim() || "_".repeat(n);
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
  const title = "AFFIDAVIT OF RESIDENCE";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(
    `1. I, ${u(values.affiantName)}, being of lawful age and a resident at ${u(values.streetAddress)} in ${u(values.cityName)}, do on oath and under penalties of perjury, depose and say:`
  );
  p(`2. I have resided in ${u(values.residedInPlace)}, state ${u(values.residedState)}.`);
  p("3. I made this affidavit for no improper use.");
  p(`4. The following individuals reside with me at the above address: ${u(values.coResidents, 20)}.`);
  p(
    `5. I certify under penalty of perjury under ${u(values.applicableLaw)} law that I know the contents of this Affidavit signed by me and that the statements are true and correct.`
  );
  uf("Date", values.affidavitDate);
  p(`STATE OF ${u(values.stateName)}, COUNTRY OF ${u(values.countryName)}`);
  uf("Notary Public", values.notaryName);
  p("Make It Legal", true);
  p(`This Affidavit should be signed in front of a notary public by ${u(values.affiantName)}.`);
  p("Once signed in front of a notary, this document should be delivered to the appropriate court for filing.");
  p("Copies: Keep a copy for your records in a safe place.");
  p("Additional Assistance: If unsure about legal effect or filing, consult a licensed lawyer.");

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
