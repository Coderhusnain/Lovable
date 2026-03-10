import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Affiant & Property",
    fields: [
      { name: "state", label: "State", type: "text", required: true },
      { name: "county", label: "County", type: "text", required: true },
      { name: "affiantName", label: "Affiant full name", type: "text", required: true },
      { name: "affiantAddress", label: "Affiant address", type: "text", required: true },
      { name: "vehicleMake", label: "Vehicle make", type: "text", required: true },
      { name: "vehicleModel", label: "Vehicle model", type: "text", required: true },
      { name: "vehicleYearDetails", label: "Year/ID details", type: "text", required: true },
      { name: "transferFrom", label: "Transferred from", type: "text", required: true },
      { name: "transferDate", label: "Transfer date", type: "date", required: true },
      { name: "purpose", label: "Affidavit purpose", type: "text", required: true },
      { name: "perjuryLawState", label: "State for perjury statement", type: "text", required: true },
    ],
  },
  {
    label: "Execution & Notary",
    fields: [
      { name: "affiantSignature", label: "Affiant signature (typed)", type: "text", required: true },
      { name: "affiantDate", label: "Affiant date", type: "date", required: true },
      { name: "notaryState", label: "Notary state", type: "text", required: true },
      { name: "notaryCounty", label: "Notary county", type: "text", required: true },
      { name: "swornDay", label: "Subscribed/sworn day", type: "text", required: true },
      { name: "swornMonth", label: "Subscribed/sworn month", type: "text", required: true },
      { name: "swornYear", label: "Subscribed/sworn year", type: "text", required: true },
      { name: "notaryName", label: "Notary public name", type: "text", required: true },
      { name: "notaryTitle", label: "Notary title/rank", type: "text", required: true },
      { name: "notaryCommissionExpiry", label: "Commission expiry", type: "text", required: true },
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
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += LH + 1;
  };
  const title = "AFFIDAVIT OF OWNERSHIP";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  uf("State of", v.state);
  uf("County of", v.county);
  p(
    `I, ${v.affiantName || "____________________"}, residing at ${v.affiantAddress || "_______________________________"}, being of lawful age and duly sworn, ` +
      "do hereby depose and state as follows:",
  );
  p("Description of Property", true);
  p(
    `That I am the lawful owner of a motor vehicle described as follows: Make ${v.vehicleMake || "__________"}, ` +
      `Model ${v.vehicleModel || "__________"}, Year/Identification Details ${v.vehicleYearDetails || "__________________________"}.`,
  );
  p("Ownership", true);
  p(
    `That lawful title to the above-described vehicle was duly transferred to me from ${v.transferFrom || "____________________"}, ` +
      `on or about ${v.transferDate || "____________________"}, in accordance with applicable law.`,
  );
  p("Possession", true);
  p("I took possession on purchase date and remain in continuous, open, peaceful, and exclusive possession.");
  p("I am unaware of claims disputing ownership/possession and, to best knowledge, title has not been challenged.");
  p("Liens and Encumbrances", true);
  p("No claim, lien, or legal action is pending against vehicle title or possession rights; vehicle is free of liens/charges/encumbrances.");
  p("No bankruptcy/assignment for creditors or arrangements affecting this vehicle have been initiated by or against me.");
  p("Purpose", true);
  p(`This Affidavit is executed for ${v.purpose || "_______________________________"} and other lawful purposes as required.`);
  p("Oath or Affirmation", true);
  p(
    `I certify under penalty of perjury under the laws of ${v.perjuryLawState || "____________________"} that I have read and understand ` +
      "this Affidavit and statements are true and correct to best of my knowledge and belief.",
  );
  uf("Signature of Affiant", v.affiantSignature);
  uf("Date", v.affiantDate);
  uf("STATE OF", v.notaryState);
  uf("COUNTY OF", v.notaryCounty);
  p(
    `Subscribed and sworn before me on this ${v.swornDay || "_____"} day of ${v.swornMonth || "______"}, ${v.swornYear || "20__"}, by ` +
      `${v.affiantName || "______________________________"}, who is personally known to me or has produced satisfactory identification.`,
  );
  uf("Notary Public", v.notaryName);
  uf("Title (and Rank)", v.notaryTitle);
  uf("My Commission Expires", v.notaryCommissionExpiry);

  doc.save("affidavit_of_ownership.pdf");
};

export default function AffidavitOwnershipForm() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit of Ownership"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="affidavitownership"
    />
  );
}

