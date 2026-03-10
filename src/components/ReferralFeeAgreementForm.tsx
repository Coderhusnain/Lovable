import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "buyerName", label: "Buyer name", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer address", type: "text", required: true },
      { name: "referrerName", label: "Referrer name", type: "text", required: true },
      { name: "referrerAddress", label: "Referrer address", type: "text", required: true },
      { name: "industry", label: "Industry", type: "text", required: true },
    ],
  },
  {
    label: "Commercial Terms",
    fields: [
      { name: "terminationDate", label: "Termination date", type: "date", required: true },
      { name: "earlyTerminationDays", label: "Early termination notice days", type: "text", required: true, placeholder: "e.g., 30" },
      { name: "referralFeePercent", label: "Referral fee percentage", type: "text", required: true, placeholder: "e.g., 5" },
      { name: "paymentMethods", label: "Accepted payment methods", type: "text", required: true, placeholder: "Bank transfer, ACH, check" },
      { name: "licensedStatus", label: "Referrer licensing status", type: "select", required: true, options: [
        { value: "does", label: "Referrer does hold required licenses/certifications" },
        { value: "does_not", label: "Referrer does not hold required licenses/certifications" },
      ] },
      { name: "governingLaw", label: "Governing law (State/Country)", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "buyerSignName", label: "Buyer signatory name", type: "text", required: true },
      { name: "buyerDesignation", label: "Buyer signatory designation", type: "text", required: true },
      { name: "buyerSignature", label: "Buyer signature (typed)", type: "text", required: true },
      { name: "buyerSignDate", label: "Buyer signature date", type: "date", required: true },
      { name: "referrerSignName", label: "Referrer signatory name", type: "text", required: true },
      { name: "referrerDesignation", label: "Referrer signatory designation", type: "text", required: true },
      { name: "referrerSignature", label: "Referrer signature (typed)", type: "text", required: true },
      { name: "referrerSignDate", label: "Referrer signature date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 16;
  const W = 178;
  const LH = 5.6;
  let y = 18;

  const ensure = (h = 10) => {
    if (y + h > 282) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.8) => {
    ensure(12);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    const safeValue = (value || "").trim();
    doc.setFont("helvetica", "normal");
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    if (safeValue) {
      doc.text(safeValue, x, y);
      doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(safeValue)), y + 1);
    } else {
      const blank = "________________________";
      doc.text(blank, x, y);
    }
    y += LH + 1.2;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "REFERRAL FEE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p(
    `This Referral Fee Agreement ("Agreement") is made and entered into on ${v.effectiveDate || "____________"} (the "Effective Date"), ` +
      `by and between ${v.buyerName || "____________"}, of ${v.buyerAddress || "____________"} (the "Buyer"), and ` +
      `${v.referrerName || "____________"}, of ${v.referrerAddress || "____________"} (the "Referrer").`,
  );
  p("RECITALS", true);
  p(
    `WHEREAS, the Buyer intends to purchase certain goods; WHEREAS, the Referrer possesses contacts and industry connections within the ` +
      `${v.industry || "____________"} industry and is willing to act as an intermediary for introducing potential sellers to the Buyer; ` +
      "NOW, THEREFORE, the Parties agree as follows:",
  );

  p("1. LEGAL COMPLIANCE", true);
  p(
    `The Referrer shall comply with all applicable laws, rules, and regulations governing the ${v.industry || "____________"} industry. ` +
      `Where licensing/certification is required, the Referrer shall obtain and maintain it. The Buyer acknowledges the Referrer ` +
      `${v.licensedStatus === "does_not" ? "does not" : "does"} hold the required licensing/certification as applicable.`,
  );
  p("2. TERM", true);
  p(
    `This Agreement commences on the Effective Date and remains in force until ${v.terminationDate || "____________"} (the "Termination Date"), ` +
      "unless earlier terminated under this Agreement. The Termination Date may be modified by mutual written agreement.",
  );
  p("3. TERMINATION", true);
  p(
    `Either Party may terminate early, with or without cause, by providing not less than ${v.earlyTerminationDays || "____"} days' written notice. ` +
      "Upon Early Termination, the Referrer is entitled to pro-rated payment for services performed to the effective date. Notice by email is valid.",
  );
  p("4. EXCLUSIVITY", true);
  p("During the term, the Referrer has exclusive right to introduce prospective sellers not previously known to or engaged by Buyer.");
  p("5. RELATIONSHIP OF THE PARTIES", true);
  p(
    "Referrer acts as independent contractor. Nothing creates partnership, joint venture, agency, or employment. " +
      "Referrer is responsible for taxes and statutory obligations and shall provide workers' compensation and liability insurance evidence on request.",
  );
  p("6. FEES AND PAYMENT", true);
  p(
    `This is an introduction-only arrangement. Referrer's fee equals ${v.referralFeePercent || "____"}% of Net Value of goods purchased directly from referrals. ` +
      "Net Value excludes VAT, postage, packaging, insurance, refunds, and dishonored payments. Referrer invoices Buyer when entitled; " +
      "payment is due within thirty (30) days of invoice. Accepted payment methods: " +
      `${v.paymentMethods || "____________"}.`,
  );
  p("7. NON-CIRCUMVENTION", true);
  p("Buyer shall not transact with introduced sellers to avoid paying referral commission. Referrer remains fully entitled to commission in circumvention cases.");
  p("8. CONFIDENTIALITY", true);
  p("Referrer shall keep Buyer proprietary/commercial information strictly confidential and use it only for Agreement performance. This survives termination/expiry.");
  p("9. ENTIRE AGREEMENT", true);
  p("This Agreement is the entire understanding and supersedes all prior oral/written discussions and agreements on this subject.");
  p("10. SEVERABILITY", true);
  p("If any provision is invalid or unenforceable, it is severed and the remaining provisions continue in full force and effect.");
  p("11. FORCE MAJEURE", true);
  p("Neither Party is liable for delay/failure caused by events beyond reasonable control (acts of God, pandemics, disasters, war, riots, strikes, government acts).");
  p("12. ALTERNATIVE DISPUTE RESOLUTION", true);
  p("Parties shall first attempt amicable negotiation. Failing resolution, disputes are referred to mediation under applicable statutory mediation rules.");
  p("13. AMENDMENT", true);
  p("Any amendment or modification must be in writing and signed by both Parties.");
  p("14. WAIVER", true);
  p("Failure to enforce any provision is not a waiver of that provision or future enforcement rights.");
  p("15. GOVERNING LAW", true);
  p(`This Agreement shall be governed by and construed under the laws of ${v.governingLaw || "____________"}.`);
  p("16. ATTORNEYS' FEES", true);
  p("In legal proceedings arising from this Agreement, the prevailing Party is entitled to recover reasonable legal fees and costs.");
  p("17. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");

  uf("Authorized Signatory (Buyer) - Name", v.buyerSignName);
  uf("Designation", v.buyerDesignation);
  uf("Signature", v.buyerSignature);
  uf("Date", v.buyerSignDate);
  y += 1.2;
  uf("Authorized Signatory (Referrer) - Name", v.referrerSignName);
  uf("Designation", v.referrerDesignation);
  uf("Signature", v.referrerSignature);
  uf("Date", v.referrerSignDate);

  doc.save("referral_fee_agreement.pdf");
};

export default function ReferralFeeAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Referral Fee Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="referralfeeagreement"
    />
  );
}

