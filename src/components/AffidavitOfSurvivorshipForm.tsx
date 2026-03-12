import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State / Province", type: "text", required: true },
      { name: "county", label: "County", type: "text", required: true },
    ],
  },
  {
    label: "Affiant",
    fields: [
      { name: "affiantName", label: "Affiant full name", type: "text", required: true },
      { name: "affiantResidence", label: "Affiant residence", type: "text", required: true },
      { name: "jointOwnerName", label: "Joint owner name", type: "text", required: true },
    ],
  },
  {
    label: "Deed and Property",
    fields: [
      { name: "deedDay", label: "Deed day", type: "text", required: true },
      { name: "deedMonth", label: "Deed month", type: "text", required: true },
      { name: "deedYear", label: "Deed year", type: "text", required: true },
      { name: "bookVolume", label: "Book / Volume", type: "text", required: true },
      { name: "page", label: "Page", type: "text", required: true },
      { name: "officialRecordsCounty", label: "Official records county", type: "text", required: true },
      { name: "documentNumber", label: "Document number", type: "text", required: true },
      { name: "propertyDescription", label: "Full legal description of property", type: "textarea", required: true },
    ],
  },
  {
    label: "Death and Oath",
    fields: [
      { name: "deathDay", label: "Death day", type: "text", required: true },
      { name: "deathMonth", label: "Death month", type: "text", required: true },
      { name: "deathYear", label: "Death year", type: "text", required: true },
      { name: "deceasedName", label: "Name of deceased", type: "text", required: true },
      { name: "oathState", label: "Oath law state", type: "text", required: true },
      { name: "executedDay", label: "Executed day", type: "text", required: true },
      { name: "executedMonth", label: "Executed month", type: "text", required: true },
      { name: "executedYear", label: "Executed year", type: "text", required: true },
      { name: "affiantSignature", label: "Affiant signature name", type: "text", required: true },
    ],
  },
  {
    label: "Notary and Legal Notes",
    fields: [
      { name: "notaryDay", label: "Notary day", type: "text", required: true },
      { name: "notaryMonth", label: "Notary month", type: "text", required: true },
      { name: "notaryYear", label: "Notary year", type: "text", required: true },
      { name: "commissionExpires", label: "My commission expires", type: "text", required: true },
      { name: "stateOfLine", label: "State of (bottom line)", type: "text", required: true },
      { name: "countryOfLine", label: "Country of (bottom line)", type: "text", required: true },
      { name: "makeItLegalSigner", label: "Signer name in Make It Legal line", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const m = 16;
  const tw = pageW - m * 2;
  const lh = 5.2;
  const limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.5) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.1);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.1);
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

  const title = "AFFIDAVIT OF SURVIVORSHIP";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.6);
  doc.text(title, pageW / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(pageW / 2 - titleW / 2, y + 1.2, pageW / 2 + titleW / 2, y + 1.2);
  y += 9;

  uf("State of", v.state);
  uf("County of", v.county);
  p(
    `I, ${u(v.affiantName)}, residing at ${u(v.affiantResidence)}, being of legal age and competent to testify, do hereby depose and state as follows:`
  );
  p(
    `1. That on the ${u(v.deedDay, 3)} day of ${u(v.deedMonth)}, ${u(v.deedYear, 4)}, by deed executed on that date and recorded in Book/Volume ${u(v.bookVolume)}, Page ${u(v.page)}, of the Official Records of ${u(v.officialRecordsCounty)} County, under Document Number ${u(v.documentNumber)} (hereinafter referred to as the "Deed"), the undersigned Affiant and ${u(v.jointOwnerName)} became joint owners of the following legally described real property:`
  );
  p(u(v.propertyDescription, 30));
  p(
    `2. That the Affiant and ${u(v.jointOwnerName)} acquired title to the said property as joint tenants with the right of survivorship.`
  );
  p(
    `3. That on the ${u(v.deathDay, 3)} day of ${u(v.deathMonth)}, ${u(v.deathYear, 4)}, the said ${u(v.deceasedName)} died, thereby terminating his/her interest in the above-described real property. A certified copy of the death certificate of ${u(v.deceasedName)} is attached hereto and marked as Exhibit A.`
  );
  p("Oath or Affirmation", true);
  p(
    `I certify under penalty of perjury under the laws of the State of ${u(v.oathState)} that the foregoing statements made in this Affidavit are true and correct to the best of my knowledge, information, and belief.`
  );
  p(`Executed this ${u(v.executedDay, 3)} day of ${u(v.executedMonth)}, ${u(v.executedYear, 4)}.`);
  uf("[Affiant's Full Name]", v.affiantName);
  uf("(Signature of Affiant)", v.affiantSignature);
  p(
    `Subscribed and sworn to before me on this ${u(v.notaryDay, 3)} day of ${u(v.notaryMonth)}, ${u(v.notaryYear, 4)}.`
  );
  p("Notary Public");
  uf("My Commission Expires", v.commissionExpires);
  uf("State of", v.stateOfLine);
  uf("Country Of", v.countryOfLine);
  p("Make It Legal", true);
  p(`This Affidavit should be signed in front of a notary public by ${u(v.makeItLegalSigner)}.`);
  p("Once signed in front of a notary, this document should be delivered to the appropriate court for filing.");
  p("Copies", true);
  p("The original Affidavit should be filed with the Clerk of Court or delivered to the requesting business.");
  p("The Affiant should maintain a copy of the Affidavit. Your copy should be kept in a safe place.");
  p("If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it.");
  p("Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference.");
  p("Additional Assistance", true);
  p("If you are unsure or have questions regarding this Affidavit or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.");

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
