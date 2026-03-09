import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Employment",
    fields: [
      { name: "agreementDateText", label: "Agreement date text", type: "text", required: true, placeholder: "23rd day of June 2025" },
      { name: "agreementCity", label: "City", type: "text", required: true, placeholder: "Islamabad" },
      { name: "masterName", label: "Master name", type: "text", required: true },
      { name: "masterAddress", label: "Master residential address", type: "text", required: true },
      { name: "servantName", label: "Servant name", type: "text", required: true },
      { name: "servantRelationName", label: "son/daughter/wife of", type: "text", required: false },
      { name: "servantAddress", label: "Servant residential address", type: "text", required: true },
      { name: "employmentPlace", label: "Place of employment address", type: "text", required: true },
      { name: "monthlyAmount", label: "Monthly package amount", type: "text", required: true },
      { name: "payDay", label: "Payment day each month", type: "text", required: true, placeholder: "5th" },
      { name: "governingState", label: "Governing state/law text", type: "text", required: true },
    ],
  },
  {
    label: "Signatures and Witnesses",
    fields: [
      { name: "masterSignName", label: "Master signature name", type: "text", required: false },
      { name: "masterCnic", label: "Master CNIC", type: "text", required: false },
      { name: "servantSignName", label: "Servant signature name", type: "text", required: false },
      { name: "servantCnic", label: "Servant CNIC", type: "text", required: false },
      { name: "witness1Name", label: "Witness 1 name", type: "text", required: false },
      { name: "witness1Cnic", label: "Witness 1 CNIC", type: "text", required: false },
      { name: "witness2Name", label: "Witness 2 name", type: "text", required: false },
      { name: "witness2Cnic", label: "Witness 2 CNIC", type: "text", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  const limit = 280;
  let y = 20;

  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "DOMESTIC SERVICE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Agreement is made on this ${values.agreementDateText || "23rd day of June 2025"}, at ${values.agreementCity || "Islamabad"}, by and between:`);
  p(`${values.masterName || "Party One"}, residing at ${values.masterAddress || "[Full Residential Address]"}, hereinafter referred to as the "Master",`);
  p(`AND ${values.servantName || "Party Two"}, son/daughter/wife of ${values.servantRelationName || "__________________"}, residing at ${values.servantAddress || "[Full Residential Address]"}, hereinafter referred to as the "Servant".`);
  p('Collectively referred to as the "Parties".', false, 3);

  p("Purpose of the Agreement", true);
  p("Master agrees to employ Servant as domestic worker responsible for household duties and safeguarding Master's premises. In consideration, Master shall provide designated portion of residence within premises for Servant accommodation, subject to this Agreement.", false, 3);
  p("Place of Employment", true);
  p(`Servant is employed at residence of Master located at ${values.employmentPlace || "[Full Residential Address]"}.`, false, 3);
  p("Duties and Responsibilities", true);
  p("Servant agrees to perform: cleaning/maintenance; washing clothes/dishes; cooking or assisting in food preparation; elderly care; grocery shopping/errands if instructed; and related domestic tasks assigned by Master.", false, 3);
  p("Code of Conduct", true);
  p("Servant undertakes: maintain discipline/honesty/confidentiality; not invite outsiders without prior consent; refrain from damage/unlawful activity; not allow entry of persons involved in criminal charges/proceedings; not leave premises without prior permission; behave respectfully and courteously; not use Master's address for correspondence/legal documentation/proof of residence or represent affiliation without express written permission.", false, 3);
  p("Remuneration", true);
  p(`Master shall pay Servant monthly package of ${values.monthlyAmount || "[mentioned amount]"} on ${values.payDay || "5th"} of each month, including salary and portion of house to stay with free electricity and gas utilities.`, false, 3);
  p("Prohibited Conduct", true);
  p("Strictly prohibited actions include theft/misuse of belongings, physical or verbal abuse, use/possession of intoxicating substances, bringing outsiders without permission, and misrepresentation of identity/use of false documents.", false, 3);
  p("Duration and Termination", true);
  p("Agreement is valid for two (02) years from signing and may be renewed by mutual consent. Either party may terminate with 30 days notice or salary in lieu. Master reserves right to terminate immediately for misconduct, breach of trust, or violation of any term.", false, 3);
  p("Miscellaneous", true);
  p("This Agreement constitutes entire understanding between Parties. Any modification must be in writing and signed by both Parties. Agreement shall be governed by laws of state.");
  p("Acknowledgment", true);
  p("Servant acknowledges having read, understood, and voluntarily agreed to terms and conditions and signs in full acceptance.");
  p("IN WITNESS WHEREOF, Parties have executed this Agreement on day, month, and year first written above.", false, 3);

  p("MASTER", true, 1);
  uf("Name", values.masterSignName, 22);
  p("Signature: _________________________");
  uf("CNIC No.", values.masterCnic, 22, 2.2);
  p("SERVANT", true, 1);
  uf("Name", values.servantSignName, 22);
  p("Signature: _________________________");
  uf("CNIC No.", values.servantCnic, 22, 2.2);
  p("1. WITNESSES", true, 1);
  uf("Name", values.witness1Name, 22);
  p("Signature: _______________________");
  uf("CNIC No.", values.witness1Cnic, 22, 2.2);
  p("2. WITNESSES", true, 1);
  uf("Name", values.witness2Name, 22);
  p("Signature: _______________________");
  uf("CNIC No.", values.witness2Cnic, 22);

  doc.save("domestic_service_agreement.pdf");
};

export default function DomesticServiceAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Domestic Service Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="domesticserviceagreement"
    />
  );
}
