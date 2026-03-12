import { FormWizard, FieldDef } from "../FormWizard";
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
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "stateName", label: "State / Province / Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "countyName", label: "County", type: "text", required: true },
    ],
  },
  {
    label: "Affiant and Subject",
    fields: [
      { name: "affiantName", label: "Affiant name", type: "text", required: true },
      { name: "affiantAddress", label: "Affiant address", type: "text", required: true },
      { name: "subjectName", label: "Subject name", type: "text", required: true },
      { name: "affiantDob", label: "Affiant date of birth", type: "date", required: true },
    ],
  },
  {
    label: "Acquaintance Details",
    fields: [
      { name: "yearsKnown", label: "Years known", type: "text", required: true },
      { name: "monthsKnown", label: "Months known", type: "text", required: true },
      { name: "capacityKnown", label: "Capacity known", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "signedName", label: "Signed by", type: "text", required: true },
      { name: "signedDate", label: "Date", type: "date", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "notaryName", label: "Notary Public", type: "text", required: true },
      { name: "signedByChecklist", label: "This Affidavit must be signed by", type: "text", required: true },
    ],
  },
  {
    label: "Final Checklist",
    fields: [
      { name: "reviewNote", label: "Final note (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.5, limit = 282;
  let y = 18;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(11.2);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const title = (text: string, size = 13, gap = 10) => {
    ensure(12);
    doc.setFont("times", "bold");
    doc.setFontSize(size);
    doc.text(text, w / 2, y, { align: "center" });
    const twt = doc.getTextWidth(text);
    doc.line(w / 2 - twt / 2, y + 1.1, w / 2 + twt / 2, y + 1.1);
    y += gap;
  };

  title("AFFIDAVIT OF CHARACTER", 13, 10);

  p(`I, ${u(v.affiantName)}, of ${u(v.affiantAddress)}, do hereby certify that ${u(v.subjectName)} is personally known to me and is of good moral character.`);
  p(`My date of birth is ${u(v.affiantDob)} and I have been personally acquainted with ${u(v.subjectName)} for ${u(v.yearsKnown, 2)} years and ${u(v.monthsKnown, 2)} months in the following capacity: ${u(v.capacityKnown)}.`);
  p(`Signed: ${u(v.signedName)}`);
  p(`Date: ${u(v.signedDate)}`);
  p(`STATE OF ${u(v.stateName)}`, true);
  p(`COUNTY OF ${u(v.countyName)}`, true);
  p(`Notary Public: ${u(v.notaryName)}`);
  p("\u23bb");
  p("");
  p("");
  title("Final Checklist for Affidavit of Character", 12.5, 8);
  p("Legalgram provides accessible and reliable legal documentation designed to meet the needs of individuals, families, and businesses. Our resources offer professionally drafted legal documents and guidance to help ensure compliance with applicable legal requirements.", false, 5);
  p("Next Steps: Making the Affidavit Legally Effective", true);
  p("\u2610 Review the Document");
  p("Carefully examine the Affidavit of Character to confirm that it accurately reflects your statements and intentions. If revisions are required, the document may be edited using a word processing application or an online document management system prior to execution.");
  p("\u2610 Seek Legal Advice if Necessary");
  p("If you are uncertain whether the Affidavit of Character adequately satisfies your legal or procedural requirements, consult a qualified legal practitioner before signing.");
  p("\u2610 Execute Before a Notary Public");
  p(`This Affidavit must be signed by ${u(v.signedByChecklist, 18)} in the presence of a duly authorized notary public or other competent authority.`);
  p("\u2610 File or Submit the Affidavit");
  p("Following notarization, the Affidavit should be submitted to the appropriate court, tribunal, or requesting authority, as applicable.");
  p("Copies and Recordkeeping", true);
  p("\u2610 Original Document");
  p("The original, notarized Affidavit should be filed with the Clerk of Court or delivered to the requesting institution or organization.");
  p("\u2610 Retention of Copies");
  p("The affiant should retain a complete copy of the Affidavit in a secure location for future reference.");
  if ((v.reviewNote || "").trim()) p(`Final note: ${v.reviewNote}`);

  doc.save("affidavit_of_character.pdf");
};

export default function AffidavitCharacterForm() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit of Character"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="affidavitcharacter"
      preserveStepLayout
    />
  );
}
