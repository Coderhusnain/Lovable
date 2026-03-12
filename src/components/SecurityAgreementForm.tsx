import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Parties and Date",
    fields: [
      { name: "agreementDateText", label: "Agreement Date Text", type: "text", required: true },
      { name: "debtorName", label: "Debtor Name", type: "text", required: true },
      { name: "debtorAddress", label: "Debtor Address", type: "textarea", required: true },
      { name: "securedPartyName", label: "Secured Party Name", type: "text", required: true },
      { name: "securedPartyAddress", label: "Secured Party Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 2: Debt and Collateral",
    fields: [
      { name: "principalAmount", label: "Promissory Note Principal Amount", type: "text", required: true },
      { name: "collateralDescription", label: "Collateral Description", type: "textarea", required: true },
      { name: "collateralLocation", label: "Collateral Location", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 3: Debtor Covenants",
    fields: [
      { name: "insuranceRequirement", label: "Insurance Requirement Detail", type: "textarea", required: true },
      { name: "notificationRequirement", label: "Notification Requirement", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 4: Default and Remedies",
    fields: [
      { name: "defaultDetail", label: "Additional Default Detail", type: "textarea", required: false },
      { name: "remediesDetail", label: "Additional Remedies Detail", type: "textarea", required: false },
    ],
  },
  {
    label: "Step 5: Law and Notices",
    fields: [
      { name: "governingJurisdiction", label: "Governing Jurisdiction", type: "text", required: true },
      { name: "performanceLocation", label: "Performance Location", type: "text", required: true },
      { name: "noticeAddressDebtor", label: "Notice Address - Debtor", type: "textarea", required: true },
      { name: "noticeAddressSecuredParty", label: "Notice Address - Secured Party", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 6: Signatures",
    fields: [
      { name: "debtorSigner", label: "Debtor Signer Name", type: "text", required: true },
      { name: "debtorTitle", label: "Debtor Signer Title", type: "text", required: false },
      { name: "debtorSignDate", label: "Debtor Sign Date", type: "date", required: true },
      { name: "securedSigner", label: "Secured Party Signer Name", type: "text", required: true },
      { name: "securedTitle", label: "Secured Party Signer Title", type: "text", required: false },
      { name: "securedSignDate", label: "Secured Party Sign Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 7: Final Review",
    fields: [{ name: "reviewNote", label: "Optional Internal Review Note", type: "textarea", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const m = 16;
  const tw = 178;
  const lh = 5.2;
  let y = 18;
  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const p = (text: string, bold = false, gap = 1.4) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > 286) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "SECURITY AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1, 105 + tW / 2, y + 1);
  y += 8;

  p(`This Security Agreement ("Agreement") is made and entered into on ${u(v.agreementDateText)} by and between Debtor ${u(v.debtorName)} of ${u(v.debtorAddress)} and Secured Party ${u(v.securedPartyName)} of ${u(v.securedPartyAddress)}.`);
  p("RECITALS", true);
  p(`WHEREAS Debtor is indebted to Secured Party under a promissory note in principal amount of ${u(v.principalAmount)} and related obligations; and Debtor grants a security interest in collateral to secure full payment and performance.`);
  p("1. CREATION OF SECURITY INTEREST", true);
  p("1.1 Debtor grants a continuing security interest in the Collateral to secure payment/performance of obligations now existing or hereafter arising.");
  p("1.2 Security interest attaches upon execution and remains until all obligations are fully satisfied.");
  p("2. COLLATERAL", true);
  p(`2.1 Collateral includes: ${u(v.collateralDescription)}.`);
  p("2.2 Collateral also includes replacements, substitutions, additions, proceeds (including insurance proceeds), and after-acquired rights/interests.");
  p("3. LOCATION OF COLLATERAL", true);
  p(`3.1 Collateral location: ${u(v.collateralLocation)}.`);
  p("3.2 Debtor shall not remove or relocate collateral except in ordinary course of business or with prior written consent.");
  p("4. DEBTOR'S REPRESENTATIONS, WARRANTIES, AND COVENANTS", true);
  p("Debtor represents lawful ownership, authority, timely payment obligations, preservation of collateral, tax/lien compliance, and immediate notice of material changes/events.");
  p(`Insurance and maintenance obligations: ${u(v.insuranceRequirement)}.`);
  p(`Notification requirements: ${u(v.notificationRequirement)}.`);
  p("5. DEFAULT", true);
  p("Default includes non-payment, breach of covenants/warranties, insolvency/bankruptcy, or unauthorized transfer/encumbrance of collateral.");
  p(`Additional default details: ${u(v.defaultDetail || "None", 8)}.`);
  p("Upon default, Secured Party may accelerate obligations and exercise remedies including possession, disposition of collateral, and application of proceeds.");
  p(`Additional remedies details: ${u(v.remediesDetail || "None", 8)}.`);
  p("6. WAIVER", true);
  p("No waiver of any default/breach constitutes waiver of subsequent defaults, and delay/omission in exercising rights does not impair those rights.");
  p("7. NOTICES", true);
  p("Notices shall be in writing and delivered personally, by certified/registered mail, courier, or electronic mail with confirmation, and deemed received per contractual notice rules.");
  p(`Debtor notice address: ${u(v.noticeAddressDebtor)}.`);
  p(`Secured Party notice address: ${u(v.noticeAddressSecuredParty)}.`);
  p("8. GOVERNING LAW AND JURISDICTION", true);
  p(`This Agreement is governed by laws of ${u(v.governingJurisdiction)} and obligations are performable in ${u(v.performanceLocation)}. Parties consent to exclusive jurisdiction in that forum.`);
  p("9. BINDING EFFECT | 10. SEVERABILITY | 11. ENTIRE AGREEMENT", true);
  p("Agreement binds Parties and successors/assigns; invalid provisions are severed while remaining terms remain effective; this is the entire agreement and amendments must be signed in writing.");
  p("12. ATTORNEY'S FEES", true);
  p("Prevailing party in disputes under this Agreement may recover reasonable attorney's fees, court costs, and expenses.");
  p("13. EXECUTION", true);
  p(`Debtor - By: ${u(v.debtorSigner)} | Title: ${u(v.debtorTitle || "N/A", 3)} | Date: ${u(v.debtorSignDate, 10)}`);
  p(`Secured Party - By: ${u(v.securedSigner)} | Title: ${u(v.securedTitle || "N/A", 3)} | Date: ${u(v.securedSignDate, 10)}`);
  p("ACKNOWLEDGMENT", true);
  p("The Parties acknowledge that they have read, understood, and voluntarily executed this Agreement with intent to be legally bound.");

  doc.save("security_agreement.pdf");
};

export default function SecurityAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Security Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="securityagreement"
      preserveStepLayout
    />
  );
}
