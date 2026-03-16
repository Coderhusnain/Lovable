import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date & Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "buyerName", label: "Buyer name", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer address", type: "text", required: true },
      { name: "referrerName", label: "Referrer name", type: "text", required: true },
      { name: "referrerAddress", label: "Referrer address", type: "text", required: true },
      { name: "industry", label: "Industry (clause 1 & 2 recital)", type: "text", required: true },
    ],
  },
  {
    label: "Term & Termination",
    fields: [
      { name: "terminationDate", label: "Termination date (clause 2)", type: "date", required: false },
      { name: "earlyTerminationDays", label: "Early termination notice days (clause 3)", type: "text", required: false },
    ],
  },
  {
    label: "Fees & Licensing",
    fields: [
      { name: "referralFeePercent", label: "Referral fee percentage of Net Value (clause 6)", type: "text", required: false },
      { name: "paymentMethods", label: "Acceptable methods of payment (clause 6)", type: "text", required: false },
      { name: "licensedStatus", label: "Referrer licensing/certification status (clause 1)", type: "select", required: true,
        options: [
          { value: "does", label: "Referrer does hold required licensing/certification" },
          { value: "does_not", label: "Referrer does not hold required licensing/certification" },
        ],
      },
    ],
  },
  {
    label: "Governing Law",
    fields: [
      { name: "governingLaw", label: "Governing law (clause 15)", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "buyerSignName", label: "Buyer — Name", type: "text", required: false },
      { name: "buyerDesignation", label: "Buyer — Designation", type: "text", required: false },
      { name: "buyerSignDate", label: "Buyer — Date", type: "date", required: false },
      { name: "referrerSignName", label: "Referrer — Name", type: "text", required: false },
      { name: "referrerDesignation", label: "Referrer — Designation", type: "text", required: false },
      { name: "referrerSignDate", label: "Referrer — Date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  const limit = 280;
  let y = 20;

  const u = (v?: string, n = 18) => (v || "").trim() || "_".repeat(n);

  const checkBreak = (needed = lh) => {
    if (y + needed > limit) { doc.addPage(); y = 20; }
  };

  const p = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, tw);
    checkBreak(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const heading = (text: string) => {
    checkBreak(lh + 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 2;
  };

  const sigLine = (label: string, val?: string, minChars = 26, gap = 2.5) => {
    const shown = (val || "").trim();
    const labelText = `${label}: `;
    checkBreak(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    const lineEnd = shown ? x + Math.max(10, doc.getTextWidth(shown)) : x + doc.getTextWidth("_".repeat(minChars));
    if (shown) doc.text(shown, x, y);
    doc.setLineWidth(0.22);
    doc.line(x, y + 1.1, lineEnd, y + 1.1);
    y += lh + gap;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "REFERRAL FEE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.3, w / 2 + tW / 2, y + 1.3);
  y += 10;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────────────────────
  p(
    `This Referral Fee Agreement ("Agreement") is made and entered into on ${u(values.effectiveDate, 12)} (the "Effective Date"), by and between ${u(values.buyerName, 22)}, of ${u(values.buyerAddress, 22)} (hereinafter referred to as the "Buyer"), and ${u(values.referrerName, 22)}, of ${u(values.referrerAddress, 22)} (hereinafter referred to as the "Referrer").`
  );
  y += 1;

  // ── RECITALS ────────────────────────────────────────────────────────────
  p("RECITALS", true);
  p("WHEREAS, the Buyer intends to purchase certain goods;");
  p(`WHEREAS, the Referrer possesses contacts and industry connections within the ${u(values.industry, 14)} industry and is willing to act as an intermediary for the purpose of introducing potential sellers to the Buyer;`);
  p("NOW, THEREFORE, in consideration of the mutual covenants, representations, and undertakings contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:");
  y += 1;

  // ── 1. LEGAL COMPLIANCE ─────────────────────────────────────────────────
  heading("1. LEGAL COMPLIANCE");
  p(
    `The Referrer shall comply with all applicable laws, rules, and regulations governing the ${u(values.industry, 14)} industry. Where licensing and/or certification is required under applicable law, the Referrer shall be fully responsible for obtaining and maintaining such licensing and certifications. The Buyer acknowledges that the Referrer ${values.licensedStatus === "does_not" ? "does not" : "does"} hold the required licensing and/or certification, as applicable.`
  );

  // ── 2. TERM ─────────────────────────────────────────────────────────────
  heading("2. TERM");
  p(
    `This Agreement shall commence on the Effective Date and shall remain in full force and effect until ${u(values.terminationDate, 14)} (the "Termination Date"), unless earlier terminated in accordance with the provisions of this Agreement. The Termination Date may be extended or modified by mutual written agreement of the Parties.`
  );

  // ── 3. TERMINATION ──────────────────────────────────────────────────────
  heading("3. TERMINATION");
  p(
    `Either Party may terminate this Agreement prior to the Termination Date, with or without cause, by providing not less than ${u(values.earlyTerminationDays, 6)} days' written notice to the other Party ("Early Termination"). Upon Early Termination, the Referrer shall be entitled to receive a pro-rated payment for Services duly performed up to the effective date of termination. Notice delivered via email shall constitute valid notice for the purposes of this clause.`
  );

  // ── 4. EXCLUSIVITY ──────────────────────────────────────────────────────
  heading("4. EXCLUSIVITY");
  p(
    "During the term of this Agreement, the Referrer shall have the exclusive right to introduce prospective sellers to the Buyer, provided such sellers were not previously known to or engaged by the Buyer prior to such introduction."
  );

  // ── 5. RELATIONSHIP OF THE PARTIES ─────────────────────────────────────
  heading("5. RELATIONSHIP OF THE PARTIES");
  p(
    "The Referrer shall act as an independent contractor and nothing herein shall be deemed to create any partnership, joint venture, agency, or employer-employee relationship between the Parties. The Referrer shall be solely responsible for all taxes, contributions, and statutory obligations arising out of its activities under this Agreement. Upon reasonable request, the Referrer shall provide proof of workers' compensation and general liability insurance coverage."
  );

  // ── 6. FEES AND PAYMENT ─────────────────────────────────────────────────
  heading("6. FEES AND PAYMENT");
  p("This Agreement contemplates an introduction-only arrangement.");
  p(
    `The Referrer's fee shall be calculated as ${u(values.referralFeePercent, 6)}% of the net value of goods purchased by the Buyer as a direct result of an introduction made by the Referrer. "Net Value" shall exclude value-added tax (VAT), postage, packaging, insurance, refunds, and any payments not honoured by a financial institution.`
  );
  p(
    "Upon becoming entitled to the Referrer's fee, the Referrer shall issue an invoice to the Buyer. Payment shall be made within thirty (30) days from the date of the invoice."
  );
  p(`Acceptable methods of payment shall include: ${u(values.paymentMethods, 16)}.`);

  // ── 7. NON-CIRCUMVENTION ────────────────────────────────────────────────
  heading("7. NON-CIRCUMVENTION");
  p(
    "During the term of this Agreement, the Buyer shall not directly or indirectly engage in any transaction with any seller introduced by the Referrer with the intent of avoiding payment of the Referrer's commission. In the event of such circumvention, the Referrer shall remain fully entitled to its commission or referral fee in respect of such transaction."
  );

  // ── 8. CONFIDENTIALITY ──────────────────────────────────────────────────
  heading("8. CONFIDENTIALITY");
  p(
    "The Referrer agrees to keep strictly confidential all proprietary, commercial, and sensitive information of the Buyer and shall not, whether directly or indirectly, disclose or use such Confidential Information for any purpose other than the performance of this Agreement. Confidential Information includes, but is not limited to, business strategies, customer data, pricing structures, and trade secrets. This obligation shall survive termination or expiry of this Agreement."
  );

  // ── 9. ENTIRE AGREEMENT ─────────────────────────────────────────────────
  heading("9. ENTIRE AGREEMENT");
  p(
    "This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, representations, negotiations, or understandings, whether written or oral."
  );

  // ── 10. SEVERABILITY ────────────────────────────────────────────────────
  heading("10. SEVERABILITY");
  p(
    "If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed and the remaining provisions shall continue in full force and effect, provided the essential purpose of this Agreement is not defeated."
  );

  // ── 11. FORCE MAJEURE ───────────────────────────────────────────────────
  heading("11. FORCE MAJEURE");
  p(
    "Neither Party shall be liable for failure or delay in performance of its obligations under this Agreement where such failure arises due to events beyond its reasonable control, including but not limited to acts of God, pandemics, natural disasters, governmental actions, wars, riots, strikes, or other similar events (\"Force Majeure\"). The affected Party shall promptly notify the other Party and shall use reasonable efforts to resume performance as soon as practicable."
  );

  // ── 12. ALTERNATIVE DISPUTE RESOLUTION ─────────────────────────────────
  heading("12. ALTERNATIVE DISPUTE RESOLUTION");
  p(
    "The Parties shall endeavour to resolve any dispute arising out of or relating to this Agreement through amicable negotiations. Failing such resolution, the dispute shall be referred to mediation in accordance with the applicable statutory mediation rules."
  );

  // ── 13. AMENDMENT ───────────────────────────────────────────────────────
  heading("13. AMENDMENT");
  p(
    "This Agreement may only be amended or modified by a written instrument executed and signed by both Parties."
  );

  // ── 14. WAIVER ──────────────────────────────────────────────────────────
  heading("14. WAIVER");
  p(
    "Failure by either Party to enforce any provision of this Agreement shall not constitute a waiver of such provision or of the right to enforce it at a later time."
  );

  // ── 15. GOVERNING LAW ───────────────────────────────────────────────────
  heading("15. GOVERNING LAW");
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw, 16)}.`
  );

  // ── 16. ATTORNEYS' FEES ─────────────────────────────────────────────────
  heading("16. ATTORNEYS' FEES");
  p(
    "In the event of any legal action or proceeding arising out of this Agreement, the prevailing Party shall be entitled to recover reasonable legal fees and costs in addition to any other relief awarded."
  );

  // ── 17. SIGNATORIES ─────────────────────────────────────────────────────
  heading("17. SIGNATORIES");
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");
  y += 4;

  // Two-column signature block matching draft exactly
  const col1 = m;
  const col2 = w / 2 + 4;
  checkBreak(40);
  doc.setFont("helvetica", "bold");
  doc.text("Authorized Signatory (Buyer)", col1, y);
  doc.text("Authorized Signatory (Referrer)", col2, y);
  y += 7;

  const twoSigLine = (label: string, lv: string, rv: string) => {
    checkBreak(lh + 3);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.text(lt, col1, y);
    const lx = col1 + doc.getTextWidth(lt);
    const ls = (lv || "").trim();
    if (ls) { doc.text(ls, lx, y); doc.setLineWidth(0.22); doc.line(lx, y + 1.1, lx + Math.max(10, doc.getTextWidth(ls)), y + 1.1); }
    else { doc.setLineWidth(0.22); doc.line(lx, y + 1.1, lx + 38, y + 1.1); }
    doc.text(lt, col2, y);
    const rx = col2 + doc.getTextWidth(lt);
    const rs = (rv || "").trim();
    if (rs) { doc.text(rs, rx, y); doc.line(rx, y + 1.1, rx + Math.max(10, doc.getTextWidth(rs)), y + 1.1); }
    else { doc.line(rx, y + 1.1, rx + 38, y + 1.1); }
    y += lh + 3;
  };

  twoSigLine("Name", values.buyerSignName, values.referrerSignName);
  twoSigLine("Designation", values.buyerDesignation, values.referrerDesignation);
  twoSigLine("Signature", "", "");
  twoSigLine("Date", values.buyerSignDate, values.referrerSignDate);

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