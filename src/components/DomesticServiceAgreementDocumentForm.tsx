import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement Date and Place",
    fields: [
      { name: "agreementDay", label: "Agreement day", type: "number", required: true, placeholder: "23" },
      { name: "agreementMonth", label: "Agreement month", type: "text", required: true, placeholder: "June" },
      { name: "agreementYear", label: "Agreement year", type: "number", required: true, placeholder: "2025" },
      { name: "agreementPlace", label: "Agreement place", type: "text", required: true, placeholder: "Islamabad" },
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
    ],
  },
  {
    label: "Parties",
    fields: [
      { name: "masterName", label: "Master name", type: "text", required: true },
      { name: "masterAddress", label: "Master full residential address", type: "textarea", required: true },
      { name: "servantName", label: "Servant name", type: "text", required: true },
      {
        name: "servantRelationType",
        label: "Servant relation type",
        type: "select",
        required: true,
        options: [
          { value: "son", label: "Son of" },
          { value: "daughter", label: "Daughter of" },
          { value: "wife", label: "Wife of" },
        ],
      },
      { name: "servantRelationName", label: "Servant relation name", type: "text", required: true },
      { name: "servantAddress", label: "Servant full residential address", type: "textarea", required: true },
    ],
  },
  {
    label: "Employment and Duties",
    fields: [
      { name: "employmentAddress", label: "Place of employment (full residential address)", type: "textarea", required: true },
      { name: "extraDuty", label: "Any other related domestic tasks (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Code and Prohibited Conduct",
    fields: [
      { name: "extraConduct", label: "Additional code of conduct term (optional)", type: "textarea", required: false },
      { name: "extraProhibited", label: "Additional prohibited conduct term (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Remuneration and Termination",
    fields: [
      { name: "monthlyPackage", label: "Monthly package amount", type: "text", required: true, placeholder: "PKR ______" },
      { name: "payDay", label: "Salary payment day (e.g. 5)", type: "number", required: true, placeholder: "5" },
      { name: "termYears", label: "Agreement term in years", type: "number", required: true, placeholder: "2" },
      { name: "terminationNoticeDays", label: "Termination notice days", type: "number", required: true, placeholder: "30" },
      { name: "governingLawText", label: "Governing law text", type: "text", required: true, placeholder: "laws of state" },
    ],
  },
  {
    label: "Master and Servant Signatures",
    fields: [
      { name: "masterSignName", label: "MASTER Name", type: "text", required: true },
      { name: "masterSignature", label: "MASTER Signature", type: "text", required: true },
      { name: "masterCnic", label: "MASTER CNIC No.", type: "text", required: true },
      { name: "servantSignName", label: "SERVANT Name", type: "text", required: true },
      { name: "servantSignature", label: "SERVANT Signature", type: "text", required: true },
      { name: "servantCnic", label: "SERVANT CNIC No.", type: "text", required: true },
    ],
  },
  {
    label: "Witnesses",
    fields: [
      { name: "w1Name", label: "Witness 1 Name", type: "text", required: true },
      { name: "w1Signature", label: "Witness 1 Signature", type: "text", required: true },
      { name: "w1Cnic", label: "Witness 1 CNIC No.", type: "text", required: true },
      { name: "w2Name", label: "Witness 2 Name", type: "text", required: true },
      { name: "w2Signature", label: "Witness 2 Signature", type: "text", required: true },
      { name: "w2Cnic", label: "Witness 2 CNIC No.", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16, width = 178, lh = 5.3;
  let y = 18;
  const u = (val?: string, n = 14) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => { if (y + need > 285) { doc.addPage(); y = 18; } };
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width); ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal"); doc.setFontSize(10.4); doc.text(lines, left, y); y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => { ensure(8); doc.text(label, left, y); const x = left + doc.getTextWidth(label); const s = u(value); doc.text(s, x, y); doc.line(x, y + 1, x + doc.getTextWidth(s), y + 1); y += 6.2; };

  const rel = (v.servantRelationType || "son").toLowerCase();
  const relText = rel === "daughter" ? "daughter/wife of" : rel === "wife" ? "wife of" : "son/daughter/wife of";
  const jurisdiction = `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`;

  doc.setFont("times", "bold"); doc.setFontSize(13);
  const title = "DOMESTIC SERVICE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1.1, 105 + tw / 2, y + 1.1); y += 10;

  uf("Jurisdiction: ", jurisdiction);
  p(`This Agreement is made on this ${u(v.agreementDay, 2)} day of ${u(v.agreementMonth, 5)} ${u(v.agreementYear, 4)}, at ${u(v.agreementPlace, 8)}, by and between:`);
  p(`Party One, ${u(v.masterName)}, residing at ${u(v.masterAddress)}, hereinafter referred to as the "Master",`);
  p("AND", true);
  p(`Party Two, ${u(v.servantName)}, ${relText} ${u(v.servantRelationName)}, residing at ${u(v.servantAddress)}, hereinafter referred to as the "Servant".`);
  p('Collectively referred to as the "Parties".');
  p("Purpose of the Agreement", true);
  p("The Master agrees to employ the Servant as a domestic worker, responsible for carrying out general household duties and safeguarding the Master's premises. In consideration thereof, the Master shall provide a designated portion of the residence within the premises for the Servant's accommodation, subject to the terms and conditions stipulated in this Agreement.");
  p("Place of Employment", true);
  p("The Servant is employed at the residence of the Master located at:");
  p(u(v.employmentAddress, 20));
  p("Duties and Responsibilities", true);
  p("The Servant agreed to perform the following duties:");
  p("- Cleaning and maintenance of the house");
  p("- Washing clothes and dishes");
  p("- Cooking or assisting in food preparation");
  p("- elderly care");
  p("- Grocery shopping or errands, if instructed;");
  p(`- Any other related domestic tasks assigned by the Master${(v.extraDuty || "").trim() ? `; ${v.extraDuty}` : ""}`);
  p("Code of Conduct", true);
  p("The Servant agreed and undertook as follows:");
  p("- To maintain discipline, honesty, and confidentiality in all matters pertaining to the household;");
  p("- Not to invite or allow any guest or outsider to enter the premises without the prior consent of the Master;");
  p("- To refrain from causing any damage to the property and from engaging in any unlawful or illegal activity;");
  p("- Not to allow entry into the premises of any individual, including the Servant's son, who is involved in or facing any criminal charges or proceedings;");
  p("- Not to leave the premises of the house without the prior permission or approval of the Master;");
  p("- To behave respectfully and courteously towards the Master at all times, and to refrain from any form of misconduct or misbehavior;");
  p("- Not to use the address of the Master's residence for any purpose, including but not limited to correspondence, legal documentation, or as proof of residence, nor to represent any affiliation or connection with the Master or the premises without express written permission.");
  if ((v.extraConduct || "").trim()) p(`- Additional term: ${v.extraConduct}`);
  p("Remuneration", true);
  p(`The Master is paying the Servant a monthly package of ${u(v.monthlyPackage, 10)} on ${u(v.payDay, 1)}th of each month. It includes salary, a portion of house to stay including free electricity as well as gas utilities.`);
  p("Prohibited Conduct", true);
  p("The following actions are strictly prohibited and may result in immediate termination:");
  p("- Theft or misuse of the Master's belongings;");
  p("- Physical or verbal abuse;");
  p("- Use or possession of intoxicating substances;");
  p("- Bringing outsiders without permission;");
  p("- Misrepresentation of identity or use of false documents.");
  if ((v.extraProhibited || "").trim()) p(`- Additional prohibited term: ${v.extraProhibited}`);
  p("Duration and Termination", true);
  p(`This agreement shall be valid for a period of two (${u(v.termYears, 1)}) years from the date of signing and may be renewed with mutual consent.`);
  p(`- Either party may terminate this agreement with ${u(v.terminationNoticeDays, 2)} days notice or salary in lieu thereof.`);
  p("- The Master reserves the right to terminate the Agreement immediately in case of misconduct, breach of trust, or violation of any term of this Agreement.");
  p("Miscellaneous", true);
  p("- This Agreement constitutes the entire understanding between the Parties.");
  p("- Any modification must be in writing and signed by both Parties.");
  p(`- This Agreement shall be governed by the ${u(v.governingLawText, 10)}.`);
  p("Acknowledgment", true);
  p("The Servant acknowledges that she has read, understood, and voluntarily agreed to the terms and conditions of this Agreement and signs it in full acceptance thereof.");
  p("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement on the day, month, and year first written above.");
  p("MASTER", true);
  uf("Name: ", v.masterSignName); uf("Signature: ", v.masterSignature); uf("CNIC No.: ", v.masterCnic);
  p("SERVANT", true);
  uf("Name: ", v.servantSignName); uf("Signature: ", v.servantSignature); uf("CNIC No.: ", v.servantCnic);
  p("1. WITNESSES", true);
  uf("Name: ", v.w1Name); uf("Signature: ", v.w1Signature); uf("CNIC No.: ", v.w1Cnic);
  p("2. WITNESSES", true);
  uf("Name: ", v.w2Name); uf("Signature: ", v.w2Signature); uf("CNIC No.: ", v.w2Cnic);
  doc.save("domestic_service_agreement.pdf");
};

export default function DomesticServiceAgreementDocumentForm() {
  return (
    <FormWizard
      steps={steps}
      title="Domestic Service Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="domesticserviceagreement"
      preserveStepLayout
    />
  );
}
