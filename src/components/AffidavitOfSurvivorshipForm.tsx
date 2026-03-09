import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Affiant and Property",
    fields: [
      { name: "state", label: "State", type: "text", required: true },
      { name: "county", label: "County", type: "text", required: true },
      { name: "affiantName", label: "Affiant full name", type: "text", required: true },
      { name: "affiantAddress", label: "Affiant address", type: "text", required: true },
      { name: "coOwnerName", label: "Deceased joint owner name", type: "text", required: true },
      { name: "deedDate", label: "Deed execution date", type: "date", required: true },
      { name: "bookVolume", label: "Book/Volume", type: "text", required: true },
      { name: "page", label: "Page", type: "text", required: true },
      { name: "recordCounty", label: "Official records county", type: "text", required: true },
      { name: "documentNumber", label: "Document number", type: "text", required: true },
      { name: "propertyLegalDescription", label: "Full legal description of property", type: "textarea", required: true },
      { name: "deathDate", label: "Date of death", type: "date", required: true },
    ],
  },
  {
    label: "Oath and Notary",
    fields: [
      { name: "oathState", label: "State for oath/perjury line", type: "text", required: true },
      { name: "executedDate", label: "Executed date", type: "date", required: true },
      { name: "notaryDate", label: "Notary sworn date", type: "date", required: true },
      { name: "commissionExpires", label: "Notary commission expires", type: "text", required: false },
      { name: "stateOf", label: "State Of line", type: "text", required: false },
      { name: "countryOf", label: "Country Of line", type: "text", required: false },
      { name: "makeItLegalPerson", label: "Person who signs before notary", type: "text", required: false },
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
  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };

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
  const uf = (label: string, value?: string, min = 20, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const startX = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, startX, y);
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "AFFIDAVIT OF SURVIVORSHIP";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`State of ${u(values.state)}`);
  p(`County of ${u(values.county)}`);
  p(`I, ${u(values.affiantName, 26)}, residing at ${u(values.affiantAddress, 26)}, being of legal age and competent to testify, do hereby depose and state as follows:`);
  p(`1. On ${u(values.deedDate, 10)}, by deed executed on that date and recorded in Book/Volume ${u(values.bookVolume, 10)}, Page ${u(values.page, 10)}, of the Official Records of ${u(values.recordCounty, 12)} County, under Document Number ${u(values.documentNumber, 12)} (the "Deed"), the undersigned Affiant and ${u(values.coOwnerName, 24)} became joint owners of the following legally described real property:`);
  p(values.propertyLegalDescription || "_".repeat(70));
  p(`2. The Affiant and ${u(values.coOwnerName, 24)} acquired title as joint tenants with right of survivorship.`);
  p(`3. On ${u(values.deathDate, 10)}, ${u(values.coOwnerName, 24)} died, thereby terminating his/her interest in the above-described real property. A certified death certificate is attached as Exhibit A.`, false, 3);

  p("Oath or Affirmation", true);
  p(`I certify under penalty of perjury under the laws of the State of ${u(values.oathState)} that the foregoing statements are true and correct to the best of my knowledge, information, and belief.`);
  p(`Executed this ${u(values.executedDate, 10)} day.`);
  p("[Affiant's Full Name]");
  p("(Signature of Affiant)");
  p(`Subscribed and sworn to before me on ${u(values.notaryDate, 10)} day.`);
  p("Notary Public");
  uf("My Commission Expires", values.commissionExpires, 16, 3);

  uf("State of", values.stateOf, 16);
  uf("Country Of", values.countryOf, 16);
  p("Make It Legal", true);
  p(`This Affidavit should be signed in front of a notary public by ${u(values.makeItLegalPerson, 18)}.`);
  p("Once signed in front of a notary, this document should be delivered to the appropriate court for filing.");
  p("Copies: The original should be filed with the Clerk of Court or delivered to the requesting business. Affiant should retain a copy in a safe place.");
  p("Additional Assistance: If unsure or if special circumstances apply, seek legal assistance from a licensed attorney.");

  doc.save("affidavit_of_survivorship.pdf");
};

export default function AffidavitOfSurvivorshipForm() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit of Survivorship"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="affidavitofsurvivorship"
    />
  );
}
