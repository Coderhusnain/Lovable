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
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "county", label: "County", type: "text", required: true },
    ],
  },
  {
    label: "Affiant and Property",
    fields: [
      { name: "affiantName", label: "Affiant Name", type: "text", required: true },
      { name: "affiantResidence", label: "Affiant Residence Address", type: "text", required: true },
      { name: "vehicleMake", label: "Make", type: "text", required: true },
      { name: "vehicleModel", label: "Model", type: "text", required: true },
      { name: "vehicleYearDetails", label: "Year / Identification Details", type: "text", required: true },
    ],
  },
  {
    label: "Ownership and Possession",
    fields: [
      { name: "transferFrom", label: "Transferred From", type: "text", required: true },
      { name: "transferDate", label: "Transfer Date", type: "text", required: true },
    ],
  },
  {
    label: "Liens and Purpose",
    fields: [
      { name: "courtState", label: "Court State/Region", type: "text", required: true },
      { name: "purpose", label: "Affidavit Executed For", type: "text", required: true },
      { name: "perjuryLawState", label: "Perjury Law State/Region", type: "text", required: true },
    ],
  },
  {
    label: "Affiant Signature",
    fields: [
      { name: "affiantDate", label: "Date", type: "text", required: true },
    ],
  },
  {
    label: "Notarial Jurisdiction",
    fields: [
      { name: "notaryCountry", label: "Notary Country", type: "select", required: true, options: countryOptions },
      { name: "notaryState", label: "Notary State/Province/Region", type: "select", required: true, dependsOn: "notaryCountry", getOptions: (values) => getStateOptions(values.notaryCountry) },
      { name: "notaryCounty", label: "Notary County", type: "text", required: true },
      { name: "notaryDay", label: "Notary Day", type: "text", required: true, placeholder: "______" },
      { name: "notaryMonth", label: "Notary Month", type: "text", required: true, placeholder: "______" },
      { name: "notaryYear", label: "Notary Year", type: "text", required: true, placeholder: "20" },
      { name: "notaryAffiantName", label: "Name Appearing Before Notary", type: "text", required: true },
      {
        name: "notaryIdType",
        label: "Satisfactory Identification",
        type: "select",
        required: true,
        options: [
          { value: "personally known to me", label: "Personally known to me" },
          { value: "has produced satisfactory identification", label: "Has produced satisfactory identification" },
        ],
      },
    ],
  },
  {
    label: "Notary Signature Details",
    fields: [
      { name: "notaryPublicName", label: "Notary Public", type: "text", required: true },
      { name: "notaryTitle", label: "Title", type: "text", required: false },
      { name: "notaryRank", label: "Rank", type: "text", required: false },
      { name: "commissionExpires", label: "My Commission Expires", type: "text", required: true },
      { name: "reviewNote", label: "Final Review Note (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 18;
  const width = 174;
  const lh = 5.6;
  const bottom = 282;
  let y = 18;

  const u = (value?: string, n = 16) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > bottom) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, size = 11.4, gap = 2.0) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };
  const centeredUnderlinedTitle = (text: string, size = 12.8, gapAfter = 8) => {
    ensure(10);
    doc.setFont("times", "bold");
    doc.setFontSize(size);
    doc.text(text, 105, y, { align: "center" });
    const w = doc.getTextWidth(text);
    doc.line(105 - w / 2, y + 1.1, 105 + w / 2, y + 1.1);
    y += gapAfter;
  };

  centeredUnderlinedTitle("Affidavit of Ownership", 13, 10);
  p(`State of ${u(v.state, 12)}`, true, 12, 3);
  p(`County of ${u(v.county, 12)}`, true, 12, 6);
  p(
    `I, ${u(v.affiantName, 18)}, residing at ${u(v.affiantResidence, 26)}, being of lawful age and duly sworn, do hereby depose and state as follows:`,
    false,
    11.8,
    7
  );

  p("Description of Property", true, 12.2, 3);
  p("That I am the lawful owner of a motor vehicle described as follows:", false, 11.8, 3);
  p(`Make: ${u(v.vehicleMake, 10)}`, false, 11.8, 2);
  p(`Model: ${u(v.vehicleModel, 10)}`, false, 11.8, 2);
  p(`Year / Identification Details: ${u(v.vehicleYearDetails, 24)}.`, false, 11.8, 8);

  p("Ownership", true, 12.2, 3);
  p(
    `That lawful title to the above-described vehicle was duly transferred to me from ${u(v.transferFrom, 16)}, on or about ${u(v.transferDate, 16)}, in accordance with applicable law.`,
    false,
    11.8,
    8
  );

  p("Possession", true, 12.2, 3);
  p(
    "That I took possession of the vehicle on the date of purchase and have since remained in continuous, open, peaceful, and exclusive possession thereof.",
    false,
    11.8,
    3
  );
  p(
    "That I am unaware of any facts, claims, or circumstances that would call into question or dispute my ownership or right to possession of the said vehicle.",
    false,
    11.8,
    3
  );
  p(
    "To the best of my knowledge and belief, my title to the vehicle has never been challenged, denied, or contested by any person or authority.",
    false,
    11.8,
    8
  );

  p("Liens and Encumbrances", true, 12.2, 3);
  p(
    "That no claim, demand, lien, or legal action has been asserted against the vehicle to challenge my title or right of possession, nor are any such proceedings presently pending in any court of competent jurisdiction.",
    false,
    11.8,
    3
  );
  p(
    `That there are no outstanding judgments against me in any court of ${u(v.courtState, 14)} or of the United States, and that the vehicle is free and clear of all liens, charges, and encumbrances.`,
    false,
    11.8,
    3
  );
  p(
    "That no bankruptcy proceedings have been initiated by or against me, nor have I made any assignment for the benefit of creditors or entered into any arrangement with creditors affecting the said vehicle.",
    false,
    11.8,
    8
  );

  p("Purpose", true, 12.2, 3);
  p(`That this Affidavit is executed for ${u(v.purpose, 24)} and for such lawful purposes as it may be required.`, false, 11.8, 8);

  p("Oath or Affirmation", true, 12.2, 3);
  p(
    `I hereby certify, under penalty of perjury under the laws of ${u(v.perjuryLawState, 20)}, that I have read and fully understand the contents of this Affidavit and that the statements made herein are true and correct to the best of my knowledge and belief.`,
    false,
    11.8,
    14
  );

  p("Signature of Affiant", true, 12.2, 3);
  p(`Date: ${u(v.affiantDate, 20)}`, false, 11.8, 10);

  p(`STATE OF ${u(v.notaryState, 18)}`, true, 12.3, 3);
  p(`COUNTY OF ${u(v.notaryCounty, 18)}, SS:`, true, 12.3, 5);
  p(
    `Subscribed and sworn before me on this ${u(v.notaryDay, 3)} day of ${u(v.notaryMonth, 8)}, ${u(v.notaryYear, 2)}, by ${u(v.notaryAffiantName, 20)}, who ${u(v.notaryIdType, 10)}.`,
    false,
    11.8,
    12
  );

  p("Notary Public", true, 12.2, 3);
  p(`Title ${u(v.notaryTitle, 8)}    (and    Rank): ${u(v.notaryRank, 12)}`, false, 11.8, 2);
  p(`My Commission Expires: ${u(v.commissionExpires, 14)}`, false, 11.8, 6);
  if ((v.reviewNote || "").trim()) p(`Review Note: ${v.reviewNote}`, false, 11.2, 4);

  doc.save("affidavit_of_ownership.pdf");
};

export default function AffidavitOwnershipForm() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit of Ownership"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="affidavitownership"
      preserveStepLayout
    />
  );
}
