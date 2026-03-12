import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "province", label: "Province / Region", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Principal and Attorney", fields: [
    { name: "executantName", label: "Executant / Principal name", type: "text", required: true },
    { name: "attorneyName", label: "Attorney name", type: "text", required: true },
    { name: "matter", label: "Matter / proceedings description", type: "textarea", required: true },
  ]},
  { label: "Authority Clauses 1-3", fields: [
    { name: "clause1", label: "Clause 1 details", type: "text", required: true },
    { name: "clause2", label: "Clause 2 details", type: "text", required: true },
    { name: "clause3", label: "Clause 3 details", type: "textarea", required: true },
  ]},
  { label: "Authority Clauses 4-6", fields: [
    { name: "clause4", label: "Clause 4 details", type: "text", required: true },
    { name: "clause5", label: "Clause 5 details", type: "textarea", required: true },
    { name: "clause6", label: "Clause 6 details", type: "text", required: true },
  ]},
  { label: "Authority Clauses 7-8", fields: [
    { name: "clause7", label: "Clause 7 details", type: "text", required: true },
    { name: "clause8", label: "Clause 8 details", type: "text", required: true },
    { name: "deedDate", label: "Date of deed", type: "date", required: true },
  ]},
  { label: "Witness 1", fields: [
    { name: "w1Name", label: "Witness 1 name", type: "text", required: true },
    { name: "w1Address", label: "Witness 1 address", type: "text", required: true },
    { name: "w1Nic", label: "Witness 1 NIC No.", type: "text", required: true },
  ]},
  { label: "Witness 2 and Signatures", fields: [
    { name: "w2Name", label: "Witness 2 name", type: "text", required: true },
    { name: "w2Address", label: "Witness 2 address", type: "text", required: true },
    { name: "w2Nic", label: "Witness 2 NIC No.", type: "text", required: true },
    { name: "executantSignature", label: "Executant signature", type: "text", required: true },
    { name: "attorneySignature", label: "Specimen signature of attorney", type: "text", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF();
  const left = 20;
  const width = 170;
  let y = 20;
  const u = (s?: string, n = 22) => (s && s.trim() ? s.trim() : "_".repeat(n));
  const add = (t: string, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(t, width);
    if (y + lines.length * 6 > 280) { doc.addPage(); y = 20; }
    doc.text(lines, left, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "SPECIAL POWER OF ATTORNEY";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  add(`Jurisdiction: Country ${u(v.country, 12)}, State ${u(v.state, 12)}, Province ${u(v.province, 12)}, City ${u(v.city, 12)}.`);

  add(`KNOW ALL MEN BY THESE PRESENTS THAT I, ${u(v.executantName)} do hereby appoint, constitute and nominate ${u(v.attorneyName)} as my Special Attorney to do the following acts, deeds, things and matters in:`);
  add(`1. To appear and act on my behalf in all Courts: ${u(v.matter)}. ${u(v.clause1)}`);
  add(`2. ${u(v.clause2)}`);
  add(`3. ${u(v.clause3)}`);
  add(`4. ${u(v.clause4)}`);
  add(`5. ${u(v.clause5)}`);
  add(`6. ${u(v.clause6)}`);
  add(`7. ${u(v.clause7)}`);
  add(`8. ${u(v.clause8)}`);
  add("All acts, deeds, matters and things done by the said Special Attorney shall be construed as having been done by me, and I hereby ratify and confirm the same.");
  add("This Special Power of Attorney is made by me without undue influence or coercion and in full knowledge of facts and consequences.");
  add(`WHEREOF I have put my hands to this Deed of Special Power of Attorney on ${u(v.deedDate)}.`);

  add(`Signature of Executant: ${u(v.executantSignature)}      Specimen Signature of Attorney: ${u(v.attorneySignature)}`);
  add(`Witness No. 1: ${u(v.w1Name)} | Address: ${u(v.w1Address)} | NIC No.: ${u(v.w1Nic)}`);
  add(`Witness No. 2: ${u(v.w2Name)} | Address: ${u(v.w2Address)} | NIC No.: ${u(v.w2Nic)}`);

  doc.save("special_power_of_attorney.pdf");
};

export default function SpecialPowerOfAttorney() {
  return (
    <FormWizard
      steps={steps}
      title="Special Power Of Attorney"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="specialpowerofattorney"
    />
  );
}

