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
    label: "State and County",
    fields: [
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      {
        name: "state",
        label: "State / Province / Region",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => getStateOptions(values.country),
      },
      { name: "county", label: "County", type: "text", required: true },
    ],
  },
  {
    label: "Applicant Identity",
    fields: [
      { name: "currentName", label: "Current Name of Applicant", type: "text", required: true },
      { name: "currentNameAssumedDate", label: "Approximate Date Current Name Was Assumed", type: "text", required: true },
      { name: "formerName", label: "Former Name of Applicant", type: "text", required: true },
      { name: "applicantDob", label: "Applicant's Date of Birth", type: "date", required: true },
      { name: "yearsKnown", label: "Number of Years You Have Known the Applicant", type: "text", required: true },
    ],
  },
  {
    label: "Name Usage and Relationship",
    fields: [
      { name: "byCurrentName", label: "By Current Name", type: "text", required: true },
      { name: "byFormerName", label: "By Former Name", type: "text", required: true },
      { name: "relationshipToApplicant", label: "Your Relationship to the Applicant", type: "text", required: true },
      {
        name: "currentResidentialAddress",
        label: "Current Residential Address of the Applicant",
        type: "textarea",
        required: true,
      },
      {
        name: "varianceReason",
        label: "Reason for Name Variance (Optional Additional Detail)",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    label: "Affiant Statement and Signature",
    fields: [
      { name: "affiantName", label: "Affiant's Name", type: "text", required: true },
      { name: "affiantSignature", label: "Affiant's Signature", type: "text", required: true },
      { name: "affiantDate", label: "Date", type: "date", required: true },
    ],
  },
  {
    label: "Notary Acknowledgment",
    fields: [
      { name: "notaryDay", label: "Notary day", type: "text", required: true },
      { name: "notaryMonth", label: "Notary month", type: "text", required: true },
      { name: "notaryYear", label: "Notary year", type: "text", required: true },
      { name: "notaryAppearanceName", label: "Person Appearing Before Notary", type: "text", required: true },
      {
        name: "notaryIdentityType",
        label: "Identity Confirmation",
        type: "select",
        required: true,
        options: [
          { value: "is personally known to me", label: "Personally known to me" },
          { value: "has provided satisfactory proof of identity", label: "Provided satisfactory proof of identity" },
        ],
      },
      { name: "notaryIdentityProof", label: "Identity Proof Details (Optional)", type: "textarea", required: false },
      { name: "notarySignature", label: "Signature of Notary Public", type: "text", required: true },
      { name: "notaryName", label: "Name of Notary Public", type: "text", required: true },
      { name: "commissionExpires", label: "My Commission Expires", type: "text", required: true },
    ],
  },
  {
    label: "Make It Legal and Copies",
    fields: [
      { name: "makeItLegalSigner", label: "Signer Name In Make It Legal Line", type: "text", required: true },
      { name: "copiesNote", label: "Copies Section Note (Optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Additional Assistance",
    fields: [
      { name: "additionalAssistance", label: "Additional Assistance Note (Optional)", type: "textarea", required: false },
      { name: "reviewNote", label: "Final Review Note (Optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.3, limit = 282;
  let y = 18;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const line = (value?: string, n = 28) => (value || "").trim() || "_".repeat(n);
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
    doc.setFontSize(10.2);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const centeredUnderlinedTitle = (text: string, size = 12.6, gap = 8.8) => {
    ensure(10);
    doc.setFont("times", "bold");
    doc.setFontSize(size);
    doc.text(text, w / 2, y, { align: "center" });
    const titleW = doc.getTextWidth(text);
    doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
    y += gap;
  };

  centeredUnderlinedTitle("AFFIDAVIT OF MARRIAGE");

  p(`State of ${line(v.state, 22)}`, true, 0.9);
  p(`County of ${line(v.county, 22)}`, true, 1.6);
  p("");
  p("I, the undersigned, do hereby make this affidavit and state as follows:");
  p(`1.   Current Name of Applicant: ${line(v.currentName, 40)}`, true, 1.4);
  p(`2.   Approximate Date Current Name Was Assumed: ${line(v.currentNameAssumedDate, 23)}`, true, 1.4);
  p(`3.   Former Name of Applicant: ${line(v.formerName, 41)}`, true, 1.4);
  p(`4.   Applicant's Date of Birth: ${line(v.applicantDob, 37)}`, true, 1.4);
  p(`5.   Number of Years You Have Known the Applicant: ${line(v.yearsKnown, 16)}`, true, 1.4);
  p("6. The Applicant has been known by the following names:");
  p(`   o   By Current Name: ${line(v.byCurrentName || v.currentName, 41)}`);
  p(`   o   By Former Name: ${line(v.byFormerName || v.formerName, 42)}`);
  p(`7.   Your Relationship to the Applicant: ${line(v.relationshipToApplicant, 24)}`, true, 1.4);
  p("8. The variance in the Applicant's name as it appears on their birth records and the name currently in use is due to:");
  p("The current name is used exclusively and for all purposes.");
  if ((v.varianceReason || "").trim()) p(v.varianceReason);
  p("9.   The current residential address of the Applicant is:");
  p(line(v.currentResidentialAddress, 55));
  p("");
  p("I solemnly swear (or affirm) that the information provided above is true and correct to the best of my knowledge and belief.");
  p("I further affirm that the Applicant named herein has been known by both the present and former names as stated, and that they are one and the same individual.");
  p("The Applicant is known by their current name to friends, relatives, and within the community in which they reside.");
  p("");
  p(`Affiant's Name: ${line(v.affiantName, 34)}`, true, 0.9);
  p(`Affiant's Signature: ${line(v.affiantSignature, 29)}`, true, 0.9);
  p(`Date: ${line(v.affiantDate, 20)}`, true, 1.6);
  p("");
  p(
    `Subscribed and sworn to (or affirmed) before me on this ${u(v.notaryDay, 2)} day of ${u(v.notaryMonth)}, ${u(v.notaryYear, 4)}, by ${u(v.notaryAppearanceName)}, who ${u(v.notaryIdentityType, 20)}.`
  , true);
  if ((v.notaryIdentityProof || "").trim()) p(`Identity Proof Details: ${v.notaryIdentityProof}`);
  p(`Signature of Notary Public: ${line(v.notarySignature, 29)}`, true, 0.9);
  p(`Name of Notary Public: ${line(v.notaryName, 31)}`, true, 0.9);
  p(`My Commission Expires: ${line(v.commissionExpires, 30)}`, true, 0.9);
  p("Notary Seal:", true, 1.2);

  doc.addPage();
  y = 30;
  centeredUnderlinedTitle("Make It Legal", 12, 7.5);
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

  doc.save("affidavit_of_marriage.pdf");
};

export default function AffidavitOfMarriage() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit Of Marriage"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="affidavitofmarriage"
      preserveStepLayout
    />
  );
}
