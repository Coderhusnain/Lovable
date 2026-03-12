import { FormWizard, FieldDef } from "../FormWizard";
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
    label: "Affiant and Vehicle",
    fields: [
      { name: "affiantName", label: "Affiant full name", type: "text", required: true },
      { name: "affiantResidence", label: "Affiant residence address", type: "text", required: true },
      { name: "vehicleMake", label: "Vehicle make", type: "text", required: true },
      { name: "vehicleModel", label: "Vehicle model", type: "text", required: true },
      { name: "vehicleYearDetails", label: "Year / identification details", type: "text", required: true },
    ],
  },
  {
    label: "Ownership and Purpose",
    fields: [
      { name: "transferFrom", label: "Transferred from", type: "text", required: true },
      { name: "transferDate", label: "Transfer date", type: "text", required: true },
      { name: "courtState", label: "Court state for judgment line", type: "text", required: true },
      { name: "purpose", label: "Affidavit executed for", type: "text", required: true },
      { name: "perjuryLawState", label: "Perjury law state", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "affiantSignature", label: "Affiant signature name", type: "text", required: true },
      { name: "affiantDate", label: "Signature date", type: "text", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "notaryState", label: "Notary state", type: "text", required: true },
      { name: "notaryCounty", label: "Notary county", type: "text", required: true },
      { name: "notaryDay", label: "Notary day", type: "text", required: true },
      { name: "notaryMonth", label: "Notary month", type: "text", required: true },
      { name: "notaryYear", label: "Notary year", type: "text", required: true },
      { name: "notaryAffiantName", label: "Name appearing before notary", type: "text", required: true },
      { name: "notaryIdType", label: "Satisfactory identification", type: "text", required: true },
      { name: "notaryPublicName", label: "Notary public name", type: "text", required: true },
      { name: "notaryTitleRank", label: "Title (and Rank)", type: "text", required: true },
      { name: "commissionExpires", label: "My commission expires", type: "text", required: true },
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

  const title = "AFFIDAVIT OF OWNERSHIP";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.6);
  doc.text(title, pageW / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(pageW / 2 - titleW / 2, y + 1.2, pageW / 2 + titleW / 2, y + 1.2);
  y += 9;

  uf("State of", v.state);
  uf("County of", v.county);
  p(
    `I, ${u(v.affiantName)}, residing at ${u(v.affiantResidence)}, being of lawful age and duly sworn, do hereby depose and state as follows:`
  );
  p("Description of Property", true);
  p("That I am the lawful owner of a motor vehicle described as follows:");
  uf("Make", v.vehicleMake);
  uf("Model", v.vehicleModel);
  uf("Year / Identification Details", v.vehicleYearDetails);
  p("Ownership", true);
  p(
    `That lawful title to the above-described vehicle was duly transferred to me from ${u(v.transferFrom)}, on or about ${u(v.transferDate)}, in accordance with applicable law.`
  );
  p("Possession", true);
  p("That I took possession of the vehicle on the date of purchase and have since remained in continuous, open, peaceful, and exclusive possession thereof.");
  p("That I am unaware of any facts, claims, or circumstances that would call into question or dispute my ownership or right to possession of the said vehicle.");
  p("To the best of my knowledge and belief, my title to the vehicle has never been challenged, denied, or contested by any person or authority.");
  p("Liens and Encumbrances", true);
  p("That no claim, demand, lien, or legal action has been asserted against the vehicle to challenge my title or right of possession, nor are any such proceedings presently pending in any court of competent jurisdiction.");
  p(`That there are no outstanding judgments against me in any court of ${u(v.courtState)} or of the United States, and that the vehicle is free and clear of all liens, charges, and encumbrances.`);
  p("That no bankruptcy proceedings have been initiated by or against me, nor have I made any assignment for the benefit of creditors or entered into any arrangement with creditors affecting the said vehicle.");
  p("Purpose", true);
  p(`That this Affidavit is executed for ${u(v.purpose)} and for such lawful purposes as it may be required.`);
  p("Oath or Affirmation", true);
  p(`I hereby certify, under penalty of perjury under the laws of ${u(v.perjuryLawState)}, that I have read and fully understand the contents of this Affidavit and that the statements made herein are true and correct to the best of my knowledge and belief.`);
  uf("Signature of Affiant", v.affiantSignature);
  uf("Date", v.affiantDate);
  uf("STATE OF", v.notaryState);
  uf("COUNTY OF", v.notaryCounty);
  p(
    `Subscribed and sworn before me on this ${u(v.notaryDay, 3)} day of ${u(v.notaryMonth)}, ${u(v.notaryYear, 4)}, by ${u(v.notaryAffiantName)}, who is personally known to me or has produced satisfactory identification (${u(v.notaryIdType)}).`
  );
  uf("Notary Public", v.notaryPublicName);
  uf("Title (and Rank)", v.notaryTitleRank);
  uf("My Commission Expires", v.commissionExpires);

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
