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
    label: "Affiant Identity",
    fields: [
      { name: "affiantName", label: "Affiant Full Name", type: "text", required: true },
      { name: "residenceAddress", label: "Residence Address", type: "textarea", required: true },
      { name: "residenceCity", label: "Residence City", type: "text", required: true },
      { name: "phoneNumber", label: "Telephone Number", type: "text", required: true },
    ],
  },
  {
    label: "Gift Description",
    fields: [
      { name: "relationship", label: "I am ___ of", type: "text", required: true, placeholder: "father / mother / guardian / friend" },
      { name: "giftToName", label: "Recipient Name", type: "text", required: true },
      { name: "giftToCity", label: "Recipient City", type: "text", required: true },
      { name: "giftToState", label: "Recipient State/Province", type: "text", required: true },
      { name: "giftDetails", label: "What I am giving or have given", type: "textarea", required: true },
      { name: "noSideDealsParty", label: "No side deals between (name)", type: "text", required: true },
      { name: "transferDate", label: "Date of transfer of the gift", type: "text", required: true },
    ],
  },
  {
    label: "Affiant Signature",
    fields: [
      { name: "affiantSignature", label: "Affiant Signature", type: "text", required: true },
      { name: "affidavitDate", label: "Date", type: "date", required: true },
    ],
  },
  {
    label: "Notary Acknowledgment",
    fields: [
      { name: "notaryDay", label: "Notary Day", type: "text", required: true },
      { name: "notaryMonth", label: "Notary Month", type: "text", required: true },
      { name: "notaryYear", label: "Notary Year", type: "text", required: true },
      { name: "appearingPerson", label: "Person Appearing Before Notary", type: "text", required: true },
      {
        name: "identityType",
        label: "Identity Confirmation",
        type: "select",
        required: true,
        options: [
          { value: "is personally known to me", label: "Personally known to me" },
          { value: "has provided satisfactory proof of identity", label: "Provided satisfactory proof of identity" },
        ],
      },
      { name: "identityProofDetail", label: "Identity Proof Details (Optional)", type: "textarea", required: false },
      { name: "notarySignature", label: "Signature of Notary Public", type: "text", required: true },
      { name: "notaryName", label: "Notary public name", type: "text", required: true },
      { name: "commissionExpires", label: "Commission expires", type: "text", required: true },
    ],
  },
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State / Province / Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "county", label: "County", type: "text", required: true },
    ],
  },
  {
    label: "Make It Legal and Copies",
    fields: [
      { name: "makeItLegalSigner", label: "Signer Name in Make It Legal line", type: "text", required: true },
      { name: "copiesNote", label: "Copies note (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Additional Assistance",
    fields: [
      { name: "additionalAssistance", label: "Additional Assistance note (optional)", type: "textarea", required: false },
      { name: "reviewNote", label: "Final review note (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.2, limit = 282;
  let y = 18;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const line = (value?: string, n = 26) => (value || "").trim() || "_".repeat(n);
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
  const title = (text: string, size = 12.8, gap = 8.8) => {
    ensure(10);
    doc.setFont("times", "bold");
    doc.setFontSize(size);
    doc.text(text, w / 2, y, { align: "center" });
    const titleW = doc.getTextWidth(text);
    doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
    y += gap;
  };

  title("GIFT AFFIDAVIT");
  p(`I, ${line(v.affiantName, 10)}, being duly sworn, do depose and say:`);
  p("");
  p(
    `1.   That I reside at ${line(v.residenceAddress, 24)}, ${line(v.residenceCity, 8)}, my telephone number is ${line(v.phoneNumber, 14)}, and I am ${line(v.relationship, 8)} of ${line(v.giftToName, 8)}, ${line(v.giftToCity, 8)}, ${line(v.giftToState, 8)}.`
  );
  p("");
  p(`2.   That I am giving or have given ${line(v.giftDetails, 20)}.`);
  p("");
  p("3.   This is an outright gift, with no repayment expected or implied either in the form of cash or by future services.");
  p("");
  p(`4.   There are no side deals or other terms, conditions, understandings or agreements either verbal or written between ${line(v.noSideDealsParty, 10)}, myself or any other party concerning the Gift as identified above.`);
  p("");
  p(`5.   That the date of transfer of the gift is ${line(v.transferDate, 10)}.`);
  p("");
  p("The undersigned certifies that the information and statements in this affidavit are true and complete.");
  p("");

  // Keep notary/signature block on page 2 for clean spacing
  doc.addPage();
  y = 20;
  p(`Affiant's Name: ${line(v.affiantName, 36)}`, true, 0.9);
  p(`Affiant's Signature: ${line(v.affiantSignature, 32)}`, true, 0.9);
  p(`Date: ${line(v.affidavitDate, 20)}`, true, 1.6);
  p(
    `Subscribed and sworn to (or affirmed) before me on this ${u(v.notaryDay, 4)} day of ${u(v.notaryMonth, 7)}, ${u(v.notaryYear, 2)}, by ${line(v.appearingPerson, 28)}, who ${u(v.identityType, 14)}.`,
    true
  );
  if ((v.identityProofDetail || "").trim()) p(`Identity proof details: ${v.identityProofDetail}`);
  p(`Signature of Notary Public: ${line(v.notarySignature, 30)}`, true, 0.9);
  p(`Name of Notary Public: ${line(v.notaryName, 33)}`, true, 0.9);
  p(`My Commission Expires: ${line(v.commissionExpires, 30)}`, true, 0.9);
  p("Notary Seal:", true, 1.2);

  doc.addPage();
  y = 30;
  title("Make It Legal", 12, 7);
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

  doc.save("gift_affidavit.pdf");
};

export default function GiftAffidavit() {
  return (
    <FormWizard
      steps={steps}
      title="Gift Affidavit"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="giftaffidavit"
      preserveStepLayout
    />
  );
}
