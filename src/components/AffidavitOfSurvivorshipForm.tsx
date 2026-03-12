import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const countryOptions = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Other", label: "Other" },
];

const getStateOptions = (country?: string) => {
  if (country === "United States") return [{ value: "California", label: "California" }, { value: "New York", label: "New York" }, { value: "Texas", label: "Texas" }, { value: "Florida", label: "Florida" }, { value: "Other US State", label: "Other US State" }];
  if (country === "Canada") return [{ value: "Ontario", label: "Ontario" }, { value: "Quebec", label: "Quebec" }, { value: "British Columbia", label: "British Columbia" }, { value: "Alberta", label: "Alberta" }, { value: "Other Canadian Province", label: "Other Canadian Province" }];
  if (country === "United Kingdom") return [{ value: "England", label: "England" }, { value: "Scotland", label: "Scotland" }, { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" }];
  if (country === "Australia") return [{ value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" }, { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" }, { value: "Other Australian State", label: "Other Australian State" }];
  if (country === "Pakistan") return [{ value: "Punjab", label: "Punjab" }, { value: "Sindh", label: "Sindh" }, { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" }, { value: "Balochistan", label: "Balochistan" }, { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" }];
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "State and County",
    fields: [
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "county", label: "County", type: "text", required: true },
      { name: "affiantName", label: "Affiant Full Name", type: "text", required: true },
      { name: "affiantResidence", label: "Affiant Residence Address", type: "textarea", required: true },
      { name: "jointOwnerName", label: "Other Joint Owner Name", type: "text", required: true },
    ],
  },
  {
    label: "Deed Information",
    fields: [
      { name: "deedDay", label: "Deed Day", type: "text", required: true, placeholder: "_____" },
      { name: "deedMonth", label: "Deed Month", type: "text", required: true, placeholder: "______" },
      { name: "deedYear", label: "Deed Year", type: "text", required: true, placeholder: "20" },
      { name: "bookVolume", label: "Book/Volume", type: "text", required: true },
      { name: "page", label: "Page", type: "text", required: true },
      { name: "officialRecordsCounty", label: "Official Records County", type: "text", required: true },
      { name: "documentNumber", label: "Document Number", type: "text", required: true },
      { name: "propertyDescription", label: "Full Legal Description of Property", type: "textarea", required: true },
    ],
  },
  {
    label: "Ownership and Death",
    fields: [
      { name: "deathDay", label: "Death Day", type: "text", required: true, placeholder: "_____" },
      { name: "deathMonth", label: "Death Month", type: "text", required: true, placeholder: "______" },
      { name: "deathYear", label: "Death Year", type: "text", required: true, placeholder: "20" },
      { name: "deceasedName", label: "Deceased Name", type: "text", required: true },
    ],
  },
  {
    label: "Oath and Execution",
    fields: [
      { name: "oathState", label: "Oath Law State/Province/Region", type: "text", required: true },
      { name: "executedDay", label: "Executed Day", type: "text", required: true, placeholder: "_____" },
      { name: "executedMonth", label: "Executed Month", type: "text", required: true, placeholder: "______" },
      { name: "executedYear", label: "Executed Year", type: "text", required: true, placeholder: "20" },
      { name: "affiantSignature", label: "Signature of Affiant", type: "text", required: true },
    ],
  },
  {
    label: "Notary Details",
    fields: [
      { name: "notaryDay", label: "Notary Day", type: "text", required: true, placeholder: "_____" },
      { name: "notaryMonth", label: "Notary Month", type: "text", required: true, placeholder: "______" },
      { name: "notaryYear", label: "Notary Year", type: "text", required: true, placeholder: "20" },
      { name: "notaryName", label: "Notary Public", type: "text", required: true },
      { name: "commissionExpires", label: "My Commission Expires", type: "text", required: true },
      { name: "countryOfLine", label: "Country Of (Bottom Line)", type: "select", required: true, options: countryOptions },
      {
        name: "stateOfLine",
        label: "State of (Bottom Line)",
        type: "select",
        required: true,
        dependsOn: "countryOfLine",
        getOptions: (values) => getStateOptions(values.countryOfLine),
      },
    ],
  },
  {
    label: "Make It Legal and Filing",
    fields: [
      { name: "makeItLegalSigner", label: "Signer Name In Make It Legal Line", type: "text", required: true },
      { name: "copiesNote", label: "Copies / Recordkeeping Note (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Additional Assistance",
    fields: [
      { name: "additionalAssistance", label: "Additional Assistance Note (optional)", type: "textarea", required: false },
      { name: "reviewNote", label: "Final Review Note (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210, m = 16, tw = pageW - m * 2, lh = 5.1, limit = 282;
  let y = 18;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.8);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const lineText = (label: string, value?: string, blanks = "____________________") => {
    p(`${label} ${((value || "").trim() || blanks).trim()}`);
  };
  const title = (text: string, size = 13, gap = 9) => {
    ensure(10);
    doc.setFont("times", "bold");
    doc.setFontSize(size);
    doc.text(text, pageW / 2, y, { align: "center" });
    const titleW = doc.getTextWidth(text);
    doc.line(pageW / 2 - titleW / 2, y + 1.2, pageW / 2 + titleW / 2, y + 1.2);
    y += gap;
  };

  title("AFFIDAVIT OF SURVIVORSHIP", 13, 10);
  lineText("State of", v.state);
  p("");
  lineText("County of", v.county);
  p(
    `I, ${u(v.affiantName)}, residing at ${u(v.affiantResidence)}, being of legal age and competent to testify, do hereby depose and state as follows:`
  );
  p("");
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

  // Keep the affidavit body on page one and move signature/notary block to next page,
  // matching the provided draft flow.
  doc.addPage();
  y = 14;
  p(`[Affiant's Full Name] ${u(v.affiantName)}`, true, 0.9);
  p(`(Signature of Affiant) ${u(v.affiantSignature)}`, false, 1.2);
  p(`Subscribed and sworn to before me on this ${u(v.notaryDay, 3)} day of ${u(v.notaryMonth)}, ${u(v.notaryYear, 4)}.`, false, 1.2);
  p(`Notary Public ${u(v.notaryName)}`, true, 1.2);
  p(`My Commission Expires: ${u(v.commissionExpires)}`, false, 1.2);
  p(`State of : ${u(v.stateOfLine)}`, false, 0.9);
  p(`Country Of : ${u(v.countryOfLine)}`, false, 1.2);
  title("Make It Legal", 12, 6.2);
  p(`This Affidavit should be signed in front of a notary public by ${u(v.makeItLegalSigner)}.`);
  p("Once signed in front of a notary, this document should be delivered to the appropriate court for filing.");
  p("Copies", true);
  p("The original Affidavit should be filed with the Clerk of Court or delivered to the requesting business.");
  p("The Affiant should maintain a copy of the Affidavit. Your copy should be kept in a safe place.");
  p("If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it. Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference.");
  if ((v.copiesNote || "").trim()) p(v.copiesNote);
  p("Additional Assistance", true);
  p("If you are unsure or have questions regarding this Affidavit or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.");
  if ((v.additionalAssistance || "").trim()) p(v.additionalAssistance);
  if ((v.reviewNote || "").trim()) p(`Final Note: ${v.reviewNote}`);

  doc.save("affidavit_of_survivorship.pdf");
};

export default function AffidavitOfSurvivorshipForm() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit of Survivorship"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="affidavitofsurvivorship"
      preserveStepLayout
    />
  );
}
