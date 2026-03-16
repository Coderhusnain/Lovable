import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Partnership Name & Partners",
    fields: [
      { name: "partnershipName", label: "Limited Partnership name", type: "text", required: true },
      { name: "generalPartners", label: "General Partner(s) full name(s)", type: "text", required: true },
      { name: "limitedPartners", label: "Limited Partner(s) full name(s)", type: "text", required: true },
      { name: "formationAuthority", label: "Authority/state where Certificate of Limited Partnership was filed", type: "text", required: false },
    ],
  },
  {
    label: "Effective Date & Term",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "term", label: "Term / duration of the Limited Partnership", type: "text", required: false },
    ],
  },
  {
    label: "Governing Law & Jurisdiction",
    fields: [
      { name: "governingLaw", label: "Governing law (state/country)", type: "text", required: true },
      { name: "jurisdiction", label: "Exclusive jurisdiction (courts of which location)", type: "text", required: false },
    ],
  },
  {
    label: "Capital Contributions & Ownership",
    fields: [
      { name: "contributionAAmount", label: "Initial contribution amount (a) — $", type: "text", required: false },
      { name: "contributionABy", label: "Contribution (a) made by", type: "text", required: false },
      { name: "contributionBAmount", label: "Initial contribution amount (b) — $", type: "text", required: false },
      { name: "contributionBBy", label: "Contribution (b) made by", type: "text", required: false },
      { name: "contributionDeadline", label: "Contributions due no later than", type: "date", required: false },
      { name: "ownershipA", label: "Ownership interest (a) — %", type: "text", required: false },
      { name: "ownershipB", label: "Ownership interest (b) — %", type: "text", required: false },
    ],
  },
  {
    label: "Withdrawal & Buy-Out",
    fields: [
      { name: "buyoutDays", label: "Days to purchase withdrawn partner's interest", type: "text", required: false },
      { name: "dissolutionDays", label: "Days after which Partnership dissolves if interest not purchased", type: "text", required: false },
    ],
  },
  {
    label: "General Partner Signatures",
    fields: [
      { name: "gp1Name", label: "General Partner 1 — Name", type: "text", required: false },
      { name: "gp1Cnic", label: "General Partner 1 — CNIC/ID No.", type: "text", required: false },
      { name: "gp1Address", label: "General Partner 1 — Address", type: "text", required: false },
      { name: "gp1Date", label: "General Partner 1 — Date", type: "date", required: false },
      { name: "gp2Name", label: "General Partner 2 — Name", type: "text", required: false },
      { name: "gp2Cnic", label: "General Partner 2 — CNIC/ID No.", type: "text", required: false },
      { name: "gp2Address", label: "General Partner 2 — Address", type: "text", required: false },
      { name: "gp2Date", label: "General Partner 2 — Date", type: "date", required: false },
    ],
  },
  {
    label: "Limited Partner Signatures",
    fields: [
      { name: "lp1Name", label: "Limited Partner 1 — Name", type: "text", required: false },
      { name: "lp1Cnic", label: "Limited Partner 1 — CNIC/ID No.", type: "text", required: false },
      { name: "lp1Address", label: "Limited Partner 1 — Address", type: "text", required: false },
      { name: "lp1Date", label: "Limited Partner 1 — Date", type: "date", required: false },
      { name: "lp2Name", label: "Limited Partner 2 — Name", type: "text", required: false },
      { name: "lp2Cnic", label: "Limited Partner 2 — CNIC/ID No.", type: "text", required: false },
      { name: "lp2Address", label: "Limited Partner 2 — Address", type: "text", required: false },
      { name: "lp2Date", label: "Limited Partner 2 — Date", type: "date", required: false },
    ],
  },
  {
    label: "Witnesses",
    fields: [
      { name: "w1Name", label: "Witness 1 — Name", type: "text", required: false },
      { name: "w1Cnic", label: "Witness 1 — CNIC/ID No.", type: "text", required: false },
      { name: "w1Date", label: "Witness 1 — Date", type: "date", required: false },
      { name: "w2Name", label: "Witness 2 — Name", type: "text", required: false },
      { name: "w2Cnic", label: "Witness 2 — CNIC/ID No.", type: "text", required: false },
      { name: "w2Date", label: "Witness 2 — Date", type: "date", required: false },
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

  // Plain paragraph
  const p = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, tw);
    checkBreak(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // Sub-heading (e.g. "1.1 Name")
  const sub = (text: string, gap = 1.5) => {
    checkBreak(lh + gap);
    doc.setFont("helvetica", "bold");
    doc.text(text, m, y);
    y += lh + gap;
  };

  // Lettered item: "(a) text"
  const lettered = (letter: string, text: string, gap = 2) => {
    const full = `(${letter})  ${text}`;
    const lines = doc.splitTextToSize(full, tw - 6);
    checkBreak(lines.length * lh + gap);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m + 4, y);
    y += lines.length * lh + gap;
  };

  // Signature block for one signatory
  const sigBlock = (
    nameVal: string, cnicVal: string, addrVal: string, dateVal: string
  ) => {
    checkBreak(38);
    const fields: Array<[string, string, number]> = [
      ["Name", nameVal, 28],
      ["CNIC/ID No.", cnicVal, 24],
      ["Address", addrVal, 28],
      ["Signature", "", 28],
      ["Date", dateVal, 20],
    ];
    for (const [label, val, minChars] of fields) {
      const shown = (val || "").trim();
      const labelText = `${label}: `;
      checkBreak(lh + 2.5);
      doc.setFont("helvetica", "normal");
      doc.text(labelText, m + 4, y);
      const x = m + 4 + doc.getTextWidth(labelText);
      const lineEnd = shown
        ? x + Math.max(10, doc.getTextWidth(shown))
        : x + doc.getTextWidth("_".repeat(minChars));
      if (shown) doc.text(shown, x, y);
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, lineEnd, y + 1.1);
      y += lh + 2.5;
    }
    y += 1;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "LIMITED PARTNERSHIP AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.3, w / 2 + tW / 2, y + 1.3);
  y += 10;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────────────────────
  p(
    'THIS LIMITED PARTNERSHIP AGREEMENT ("Agreement") is made and entered into by and among the undersigned parties for the purpose of regulating the rights, duties, obligations, and liabilities of the Partners in accordance with the applicable Limited Partnership laws.'
  );

  // ── 1. NAME AND STATUS ──────────────────────────────────────────────────
  p("1. NAME AND STATUS OF LIMITED PARTNERSHIP", true);
  sub("1.1 Name");
  p(
    `The Limited Partnership formed pursuant to this Agreement shall be known as "${u(values.partnershipName, 16)}" (hereinafter referred to as the "Limited Partnership").`
  );
  sub("1.2 Partners");
  lettered(
    "a",
    `General Partners: ${u(values.generalPartners, 20)} (individually referred to as a "General Partner" and collectively as the "General Partners").`
  );
  lettered(
    "b",
    `Limited Partner(s): ${u(values.limitedPartners, 20)} (individually referred to as a "Limited Partner" and collectively as the "Limited Partners").`
  );
  sub("1.3 Formation");
  p(
    `The Limited Partnership has been duly formed and legally constituted pursuant to the filing of a Certificate of Limited Partnership with the appropriate authority in ${u(values.formationAuthority, 14)}, in accordance with the applicable statutory provisions governing limited partnerships.`
  );

  // ── 2. EFFECTIVE DATE AND TERM ──────────────────────────────────────────
  p("2. EFFECTIVE DATE AND TERM", true);
  sub("2.1 Effective Date");
  p(
    `This Agreement shall become effective and binding upon the Partners as of ${u(values.effectiveDate, 12)} (the "Effective Date").`
  );
  sub("2.2 Term");
  p(
    `The Limited Partnership shall continue in full force and effect for a period of ${u(values.term, 14)}, unless earlier dissolved in accordance with the provisions set forth herein or under applicable law.`
  );

  // ── 3. GOVERNING LAW AND JURISDICTION ──────────────────────────────────
  p("3. GOVERNING LAW AND JURISDICTION", true);
  p(
    `This Agreement shall be governed by, construed, and interpreted in accordance with the laws of ${u(values.governingLaw, 14)}. The exclusive jurisdiction and proper venue for any dispute, claim, or legal action arising out of or in connection with this Agreement or the operations of the Limited Partnership shall lie solely in the courts situated in ${u(values.jurisdiction, 14)}, and the Partners hereby submit to such jurisdiction.`
  );

  // ── 4. CAPITAL CONTRIBUTIONS AND FINANCIAL STRUCTURE ───────────────────
  p("4. CAPITAL CONTRIBUTIONS AND FINANCIAL STRUCTURE", true);
  sub("4.1 Initial Capital Contributions");
  p(
    "Each Partner agrees to make an initial capital contribution to the Limited Partnership in the following amounts and manner:"
  );
  lettered("a", `$${u(values.contributionAAmount, 8)} by ${u(values.contributionABy, 20)}`);
  lettered("b", `$${u(values.contributionBAmount, 8)} by ${u(values.contributionBBy, 20)}`);
  sub("4.2 Submission of Contributions");
  p(
    `All initial capital contributions shall be paid and delivered to the Limited Partnership no later than ${u(values.contributionDeadline, 12)}, unless otherwise mutually agreed in writing by the General Partners.`
  );
  sub("4.3 Additional Contributions");
  p(
    "The General Partners may, at their discretion and subject to the needs of the Limited Partnership, require additional cash contributions from time to time. No Limited Partner shall be obligated or compelled to make any further capital contribution beyond their agreed initial contribution."
  );
  sub("4.4 Ownership Interests");
  p(
    "The ownership interest of each Partner in the Limited Partnership shall be as follows:"
  );
  lettered("a", `${u(values.ownershipA, 6)} %`);
  lettered("b", `${u(values.ownershipB, 6)} %`);
  p(
    "These percentages shall determine each Partner's economic rights, including entitlement to profits and responsibility for losses."
  );
  sub("4.5 Allocation of Income, Expenses, and Losses");
  p(
    "All profits, losses, credits, deductions, tax preferences, and other financial items of the Limited Partnership shall be allocated among the Partners on a pro-rata basis in accordance with their respective ownership percentages for both accounting and income tax purposes."
  );
  sub("4.6 Distribution of Cash");
  p(
    "Net distributable cash of the Limited Partnership shall be distributed periodically, as determined by the General Partners, to the Partners in proportion to their respective percentage ownership interests."
  );

  // ── 5. MANAGEMENT AND AUTHORITY ────────────────────────────────────────
  p("5. MANAGEMENT AND AUTHORITY", true);
  sub("5.1 Management Powers");
  p(
    "The day-to-day management, administration, and control of the business and affairs of the Limited Partnership shall vest exclusively in the General Partners, who shall have full authority to manage, operate, direct, and control the business operations of the Limited Partnership in accordance with this Agreement."
  );
  sub("5.2 Authority of General Partners");
  p(
    "The General Partners shall have full and exclusive power to make all decisions concerning the development, conduct, and operation of the Limited Partnership's business, and such decisions shall be binding upon the Limited Partnership and all Partners, except where expressly restricted by this Agreement."
  );
  sub("5.3 Rights of Limited Partners");
  p(
    "The Limited Partners shall have only such rights as are expressly conferred upon them under this Agreement and the applicable Limited Partnership laws. They shall not participate in, interfere with, or exercise control over the day-to-day management or operational affairs of the Limited Partnership."
  );
  sub("5.4 Voting Rights");
  p(
    "Each Partner shall be entitled to an equal vote unless otherwise stated. Decisions requiring Partner approval shall be determined by a majority of the votes cast. In matters reserved exclusively for General Partners, decisions shall be made by majority vote of the General Partners."
  );

  // ── 6. LIABILITY AND INDEMNIFICATION ───────────────────────────────────
  p("6. LIABILITY AND INDEMNIFICATION", true);
  sub("6.1 Limited Liability of Limited Partners");
  p(
    "Subject to the provisions of the applicable Limited Partnership laws, no Limited Partner shall be personally liable for the debts, obligations, or liabilities of the Limited Partnership beyond the amount of their capital contribution."
  );
  sub("6.2 Liability of General Partners");
  p(
    `The General Partners shall not be liable to the Limited Partnership or any Partner for any act or omission undertaken in good faith and within the scope of authority granted under this Agreement, including decisions based upon legal or professional advice ("Permitted Acts").`
  );
  sub("6.3 Exceptions to Limitation of Liability");
  p(
    `The General Partners shall, however, remain personally liable for any acts or omissions arising from fraud, willful misconduct, bad faith, gross negligence, or material breach of this Agreement ("Excluded Acts").`
  );

  // ── 7. WITHDRAWAL AND DISSOLUTION ──────────────────────────────────────
  p("7. WITHDRAWAL AND DISSOLUTION", true);
  sub("7.1 Withdrawal of General Partner");
  p(
    "The withdrawal of any General Partner, for any reason whatsoever, shall not constitute a breach of this Agreement. Upon withdrawal, such General Partner shall automatically be reclassified as a Limited Partner and shall retain their corresponding economic interest in the Limited Partnership."
  );
  sub("7.2 Buy-Out of Withdrawn Partner's Interest");
  p(
    `Upon the withdrawal of any Partner, the Limited Partnership shall have ${u(values.buyoutDays, 8)} days within which to purchase the withdrawn Partner's interest. In the event such interest is not purchased within ${u(values.dissolutionDays, 8)} days, the Limited Partnership shall stand dissolved.`
  );
  sub("7.3 Dissolution");
  p("The Limited Partnership shall be dissolved upon:");
  lettered("a", "Majority vote of the Partners;");
  lettered("b", "Expiration of the buy-out period;");
  lettered("c", "Occurrence of any event requiring dissolution under applicable law.");
  sub("7.4 Liquidation");
  p(
    "Upon dissolution, the General Partners or duly appointed Liquidating Partners shall supervise the winding-up and liquidation of the Limited Partnership's affairs."
  );
  sub("7.5 Order of Distribution");
  p(
    "The assets of the Limited Partnership shall be applied in the following order:"
  );
  lettered(
    "a",
    "Payment of all outstanding taxes, debts, liabilities, and obligations of the Limited Partnership;"
  );
  lettered(
    "b",
    "Distribution of remaining assets to the Partners on a pro-rata basis in accordance with their respective ownership percentages."
  );
  y += 2;
  p(
    "This Agreement constitutes the binding framework governing the contractual relationship among the Partners and shall remain enforceable until its lawful termination or dissolution."
  );

  // ── EXECUTION ──────────────────────────────────────────────────────────
  y += 3;
  p(
    "IN WITNESS WHEREOF, the Parties hereto, intending to be legally bound, have executed this Limited Partnership Agreement on the dates written below."
  );
  y += 2;
  p("SIGNED AND EXECUTED BY:", true);

  // General Partners
  p("GENERAL PARTNERS", true);
  p("1.", false, 0.5);
  sigBlock(values.gp1Name, values.gp1Cnic, values.gp1Address, values.gp1Date);
  p("2.", false, 0.5);
  sigBlock(values.gp2Name, values.gp2Cnic, values.gp2Address, values.gp2Date);

  // Limited Partners
  checkBreak(10);
  p("LIMITED PARTNER(S)", true);
  p("1.", false, 0.5);
  sigBlock(values.lp1Name, values.lp1Cnic, values.lp1Address, values.lp1Date);
  p("2.", false, 0.5);
  sigBlock(values.lp2Name, values.lp2Cnic, values.lp2Address, values.lp2Date);

  // Witnesses
  checkBreak(10);
  p("WITNESSES", true);

  // Witness 1
  p("1.", false, 0.5);
  const w1Fields: Array<[string, string, number]> = [
    ["Name", values.w1Name, 28],
    ["CNIC/ID No.", values.w1Cnic, 24],
    ["Signature", "", 28],
    ["Date", values.w1Date, 20],
  ];
  for (const [label, val, minChars] of w1Fields) {
    const shown = (val || "").trim();
    const labelText = `${label}: `;
    checkBreak(lh + 2.5);
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m + 4, y);
    const x = m + 4 + doc.getTextWidth(labelText);
    const lineEnd = shown
      ? x + Math.max(10, doc.getTextWidth(shown))
      : x + doc.getTextWidth("_".repeat(minChars));
    if (shown) doc.text(shown, x, y);
    doc.setLineWidth(0.22);
    doc.line(x, y + 1.1, lineEnd, y + 1.1);
    y += lh + 2.5;
  }
  y += 1;

  // Witness 2
  p("2.", false, 0.5);
  const w2Fields: Array<[string, string, number]> = [
    ["Name", values.w2Name, 28],
    ["CNIC/ID No.", values.w2Cnic, 24],
    ["Signature", "", 28],
    ["Date", values.w2Date, 20],
  ];
  for (const [label, val, minChars] of w2Fields) {
    const shown = (val || "").trim();
    const labelText = `${label}: `;
    checkBreak(lh + 2.5);
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m + 4, y);
    const x = m + 4 + doc.getTextWidth(labelText);
    const lineEnd = shown
      ? x + Math.max(10, doc.getTextWidth(shown))
      : x + doc.getTextWidth("_".repeat(minChars));
    if (shown) doc.text(shown, x, y);
    doc.setLineWidth(0.22);
    doc.line(x, y + 1.1, lineEnd, y + 1.1);
    y += lh + 2.5;
  }

  doc.save("limited_partnership_agreement.pdf");
};

export default function LimitedPartnershipAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Limited Partnership Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="limitedpartnershipagreement"
    />
  );
}