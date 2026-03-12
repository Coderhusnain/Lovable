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
  if (country === "United States") {
    return [
      { value: "California", label: "California" },
      { value: "New York", label: "New York" },
      { value: "Texas", label: "Texas" },
      { value: "Florida", label: "Florida" },
      { value: "Other US State", label: "Other US State" },
    ];
  }
  if (country === "Canada") {
    return [
      { value: "Ontario", label: "Ontario" },
      { value: "Quebec", label: "Quebec" },
      { value: "British Columbia", label: "British Columbia" },
      { value: "Alberta", label: "Alberta" },
      { value: "Other Canadian Province", label: "Other Canadian Province" },
    ];
  }
  if (country === "United Kingdom") {
    return [
      { value: "England", label: "England" },
      { value: "Scotland", label: "Scotland" },
      { value: "Wales", label: "Wales" },
      { value: "Northern Ireland", label: "Northern Ireland" },
    ];
  }
  if (country === "Australia") {
    return [
      { value: "New South Wales", label: "New South Wales" },
      { value: "Victoria", label: "Victoria" },
      { value: "Queensland", label: "Queensland" },
      { value: "Western Australia", label: "Western Australia" },
      { value: "Other Australian State", label: "Other Australian State" },
    ];
  }
  if (country === "Pakistan") {
    return [
      { value: "Punjab", label: "Punjab" },
      { value: "Sindh", label: "Sindh" },
      { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" },
      { value: "Balochistan", label: "Balochistan" },
      { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" },
    ];
  }
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "affidavitCountry", label: "Affidavit Country", type: "select", required: true, options: countryOptions },
      {
        name: "affidavitState",
        label: "Affidavit State/Province/Region",
        type: "select",
        required: true,
        dependsOn: "affidavitCountry",
        getOptions: (values) => getStateOptions(values.affidavitCountry),
      },
      { name: "affidavitCounty", label: "Affidavit County", type: "text", required: true },
    ],
  },
  {
    label: "Affiant",
    fields: [
      { name: "affiantName", label: "Affiant Full Name", type: "text", required: true },
      { name: "affiantResidence", label: "Affiant Residence", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "executedDay", label: "Executed Day", type: "text", required: true, placeholder: "___" },
      { name: "executedMonth", label: "Executed Month", type: "text", required: true, placeholder: "___________" },
      { name: "deponentName", label: "Deponent Name", type: "text", required: true },
    ],
  },
  {
    label: "Notarial Jurisdiction",
    fields: [
      { name: "notaryCountry", label: "Notary Country", type: "select", required: true, options: countryOptions },
      {
        name: "notaryState",
        label: "Notary State/Province/Region",
        type: "select",
        required: true,
        dependsOn: "notaryCountry",
        getOptions: (values) => getStateOptions(values.notaryCountry),
      },
      { name: "notaryCounty", label: "Notary County", type: "text", required: true },
    ],
  },
  {
    label: "Notarial Details",
    fields: [
      { name: "notaryDay", label: "Notary Day", type: "text", required: true, placeholder: "___" },
      { name: "notaryMonth", label: "Notary Month", type: "text", required: true, placeholder: "___________" },
      { name: "notaryYear", label: "Notary Year", type: "text", required: true, placeholder: "---------------" },
      { name: "appearedPersonName", label: "Person Appearing Before Notary", type: "text", required: true },
    ],
  },
  {
    label: "Notary Signature",
    fields: [
      { name: "notaryPublicName", label: "Notary Public (Name Optional)", type: "text", required: false },
      { name: "commissionExpires", label: "My Commission Expires", type: "text", required: true, placeholder: "__________" },
    ],
  },
  {
    label: "Checklist",
    fields: [
      {
        name: "signedBy",
        label: "This Document Needs To Be Signed By",
        type: "text",
        required: true,
        placeholder: "Deponent",
      },
      { name: "reviewNote", label: "Final Review Note (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 18;
  const width = 174;
  let y = 18;
  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const p = (text: string, bold = false, size = 10.5, gap = 1.8) => {
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, left, y);
    y += lines.length * 5.5 + gap;
  };
  const centeredUnderlinedTitle = (text: string, size = 12.5, gapAfter = 8) => {
    doc.setFont("times", "bold");
    doc.setFontSize(size);
    doc.text(text, 105, y, { align: "center" });
    const w = doc.getTextWidth(text);
    doc.line(105 - w / 2, y + 1.1, 105 + w / 2, y + 1.1);
    y += gapAfter;
  };

  // PAGE 1
  centeredUnderlinedTitle("AFFIDAVIT", 13, 10);
  p(`State/County of ${u(v.affidavitState)} / ${u(v.affidavitCounty)}`, true, 11.5, 4);
  p(`I, ${u(v.affiantName, 22)}, being duly sworn, do hereby depose and state as follows:`, false, 11.5, 5);
  p(
    `1. That I am over the age of eighteen (18) years and a resident of ${u(v.affiantResidence, 22)}. I am competent to make this Affidavit and have personal knowledge of the facts stated herein. If called upon to testify, I would be able and competent to do so.`,
    false,
    11.5,
    4
  );
  p(
    "2. That I am not subject to any legal disability and that the statements made herein are based upon my personal knowledge.",
    false,
    11.5,
    4
  );
  p(
    "I solemnly affirm and declare that the foregoing statements are true and correct to the best of my knowledge, information, and belief, and that nothing material has been concealed therefrom.",
    false,
    11.5,
    16
  );
  p(`Executed on this ${u(v.executedDay, 3)} day of ${u(v.executedMonth, 12)},`, false, 11.5, 20);
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.text("Deponent", 188, y, { align: "right" });

  // PAGE 2
  doc.addPage();
  y = 22;
  centeredUnderlinedTitle("NOTARIAL ACKNOWLEDGMENT", 13, 14);
  p(`State of ${u(v.notaryState, 22)}`, false, 11.5, 8);
  p(`County of ${u(v.notaryCounty, 22)}`, false, 11.5, 8);
  p(
    `Subscribed and sworn to before me on this ${u(v.notaryDay, 3)} day of ${u(v.notaryMonth, 12)}, ${u(
      v.notaryYear,
      14
    )}, by ${u(v.appearedPersonName || v.affiantName, 22)}, who is personally known to me or has produced satisfactory proof of identity.`,
    false,
    11.5,
    12
  );
  if ((v.notaryPublicName || "").trim()) p(v.notaryPublicName, true, 11.5, 4);
  p("Notary Public", true, 11.5, 6);
  p(`My Commission Expires: ${u(v.commissionExpires, 12)}`, false, 11.5, 6);

  // PAGE 3
  doc.addPage();
  y = 56;
  centeredUnderlinedTitle("Affidavit Checklist", 12.5, 12);
  p("Make It Legal\u2122", false, 11.5, 12);
  p("Find out next steps for your document _ Sign this document.", false, 11.5, 16);
  p(`This document needs to be signed by: ${u(v.signedBy, 8)}`, false, 11.5, 16);
  p("The Affidavit must be signed in front of a notary public. It becomes effective as of the date signed.", false, 11.5, 6);
  if ((v.reviewNote || "").trim()) p(`Review Note: ${v.reviewNote}`, false, 11.2, 5);

  doc.save("affidavit_general.pdf");
};

export default function AffidavitGeneralForm() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="affidavit"
      preserveStepLayout
    />
  );
}
