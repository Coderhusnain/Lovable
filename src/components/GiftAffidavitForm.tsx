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
    label: "Affiant Details",
    fields: [
      { name: "affiantName", label: "Affiant full name", type: "text", required: true },
      { name: "affiantResidence", label: "Affiant residence", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "executedDay", label: "Executed day", type: "text", required: true },
      { name: "executedMonthYear", label: "Executed month and year", type: "text", required: true },
    ],
  },
  {
    label: "Notary Acknowledgment",
    fields: [
      { name: "notaryState", label: "Notary state", type: "text", required: true },
      { name: "notaryCounty", label: "Notary county", type: "text", required: true },
      { name: "notaryDay", label: "Notary day", type: "text", required: true },
    ],
  },
  {
    label: "Notary Details",
    fields: [
      { name: "notaryMonthYear", label: "Notary month and year", type: "text", required: true },
      { name: "proofType", label: "Identity proof type", type: "text", required: true },
      { name: "notaryName", label: "Notary public name", type: "text", required: true },
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

  const title = "GIFT AFFIDAVIT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.6);
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 10;

  uf("State/County of", `${u(v.state)} / ${u(v.county)}`);
  p(`I, ${u(v.affiantName)}, being duly sworn, do hereby depose and state as follows:`);
  p(`1. That I am over the age of eighteen (18) years and a resident of ${u(v.affiantResidence)}. I am competent to make this Affidavit and have personal knowledge of the facts stated herein.`);
  p("2. That I am not subject to any legal disability and that the statements made herein are based upon my personal knowledge.");
  p("I solemnly affirm and declare that the foregoing statements are true and correct to the best of my knowledge, information, and belief, and that nothing material has been concealed therefrom.");
  p(`Executed on this ${u(v.executedDay, 3)} day of ${u(v.executedMonthYear)}.`);
  uf("Deponent", v.affiantName);
  p("NOTARIAL ACKNOWLEDGMENT", true);
  uf("State of", v.notaryState);
  uf("County of", v.notaryCounty);
  p(`Subscribed and sworn to before me on this ${u(v.notaryDay, 3)} day of ${u(v.notaryMonthYear)}, by ${u(v.affiantName)}, who is personally known to me or has produced satisfactory proof of identity: ${u(v.proofType)}.`);
  uf("Notary Public", v.notaryName);
  uf("My Commission Expires", v.commissionExpires);
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);

  doc.save("gift_affidavit.pdf");
};

export default function GiftAffidavit() {
  return (
    <FormWizard
      steps={steps}
      title="Gift Affidavit"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="giftaffidavit"
    />
  );
}
