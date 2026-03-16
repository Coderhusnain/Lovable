import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Partnership Basics",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "partnerName", label: "Partner name", type: "text", required: true },
      { name: "partnerAddress", label: "Partner address", type: "text", required: false },
      { name: "partnerCityStateZip", label: "Partner city/state/ZIP", type: "text", required: false },
      { name: "partnershipName", label: "Partnership name", type: "text", required: true },
      { name: "formationDate", label: "Formation date", type: "date", required: false },
      { name: "principalOffice", label: "Principal place of business", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state/jurisdiction", type: "text", required: true },
      { name: "purpose", label: "Partnership purpose", type: "textarea", required: true },
    ],
  },
  {
    label: "Capital & Ownership",
    fields: [
      { name: "initialContributionDesc", label: "Initial contribution description", type: "text", required: false },
      { name: "initialContributionAmount", label: "Initial contribution amount", type: "text", required: false },
      { name: "contributionDeadline", label: "Contribution deadline", type: "date", required: false },
      { name: "ownershipPercent", label: "Ownership percentage", type: "text", required: false },
      { name: "profitPercent", label: "Profit percentage", type: "text", required: false },
      { name: "distributionMethod", label: "Profits accounted for by (party/method)", type: "text", required: false },
      { name: "distributionDay", label: "Distribution day each month", type: "text", required: false },
      { name: "costPercent", label: "Cost sharing percentage", type: "text", required: false },
    ],
  },
  {
    label: "Roles, Records & Dispute Resolution",
    fields: [
      { name: "vacationDays", label: "Vacation days per partner", type: "text", required: false },
      { name: "fiscalYearEndMonth", label: "Fiscal year end month", type: "text", required: false },
      { name: "buyoutDecisionDays", label: "Buy-out decision days", type: "text", required: false },
      { name: "buyoutFinalizeDays", label: "Buy-out finalization days", type: "text", required: false },
      { name: "mediationLocation", label: "Mediation location/jurisdiction", type: "text", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "partner1Name", label: "Partner 1 name", type: "text", required: false },
      { name: "partner1Date", label: "Partner 1 date", type: "date", required: false },
      { name: "partner2Name", label: "Partner 2 name", type: "text", required: false },
      { name: "partner2Date", label: "Partner 2 date", type: "date", required: false },
      { name: "partner3Name", label: "Partner 3 name (optional)", type: "text", required: false },
      { name: "partner3Date", label: "Partner 3 date", type: "date", required: false },
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

  // Plain paragraph (with optional bold)
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // Bullet item indented with a bullet character
  const bullet = (text: string, gap = 1.8) => {
    const indent = 6;
    const bulletChar = "\u2022  ";
    const lines = doc.splitTextToSize(bulletChar + text, tw - indent);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(lines, m + indent, y);
    y += lines.length * lh + gap;
  };

  // Signature line helper
  const sigLine = (label: string, value?: string, min = 24, gap = 2.5) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "PARTNERSHIP AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 10;
  doc.setFontSize(10.5);

  // ── PREAMBLE ───────────────────────────────────────────────────────────────
  p(
    `This Partnership Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)}, by and among the following parties (collectively, the "Partners" and individually, a "Partner"):`
  );
  bullet(`Partner Name: ${u(values.partnerName, 20)}`);
  bullet(`Address: ${u(values.partnerAddress, 20)}`);
  bullet(`City/State/ZIP: ${u(values.partnerCityStateZip, 18)}`);
  y += 1;

  // ── 1. NAME OF PARTNERSHIP ─────────────────────────────────────────────────
  p("1. NAME OF PARTNERSHIP", true);
  p(
    `The Partners hereby agree that the business shall operate under the name ${u(values.partnershipName, 18)} (the "Partnership").`
  );

  // ── 2. FORMATION AND PURPOSE ───────────────────────────────────────────────
  p("2. FORMATION AND PURPOSE", true);
  p("2.1 Formation", false);
  p(
    `The Partners wish to establish a legal partnership in business. The terms and conditions of this Partnership shall be governed by this Agreement, which shall become effective on ${u(values.formationDate, 12)}.`
  );
  p("2.2 Principal Place of Business", false);
  p(`The Partnership's principal office shall be located at ${u(values.principalOffice, 18)}.`);
  p("2.3 Governing Law", false);
  p(
    `The Partnership shall be governed by, and construed in accordance with, the laws of ${u(values.governingLaw, 16)}.`
  );
  p("2.4 Purpose", false);
  p(`The primary purpose of the Partnership shall be ${u(values.purpose, 20)}.`);
  p("2.5 Licenses and Permits", false);
  p(
    "If applicable, the Partners shall obtain all necessary licenses, permits, and registrations to operate the business, including a Doing Business As Name (DBA) and a Federal Employer Identification Number (EIN)."
  );

  // ── 3. CAPITAL CONTRIBUTIONS ───────────────────────────────────────────────
  p("3. CAPITAL CONTRIBUTIONS", true);
  p("3.1 Initial Contributions", false);
  p("The Partners shall make the following initial contributions to the Partnership:");
  bullet(`${u(values.initialContributionDesc, 14)}: $${u(values.initialContributionAmount, 8)}`);
  p("3.2 Timing of Contributions", false);
  p(
    `All contributions shall be made no later than ${u(values.contributionDeadline, 12)}. All capital contributions shall be final unless the Partners agree in writing to permit a withdrawal.`
  );
  p("3.3 Capital Accounts", false);
  p("All contributions shall be deposited into a joint capital account maintained by the Partnership.");

  // ── 4. OWNERSHIP INTEREST AND AUTHORITY ───────────────────────────────────
  p("4. OWNERSHIP INTEREST AND AUTHORITY", true);
  p("4.1 Ownership Interest", false);
  p("The ownership interest of each Partner in the Partnership shall be as follows:");
  bullet(`${u(values.ownershipPercent, 6)} %`);
  p("4.2 Authority of Partners", false);
  p("Except as expressly provided herein:");
  bullet("All Partners shall have an equal vote on Partnership matters.");
  bullet(
    "No Partner may independently bind the Partnership in contracts, financial obligations, or other commitments."
  );
  bullet("Decisions shall be made by a majority of equal votes of the Partners.");

  // ── 5. FINANCIAL MATTERS ───────────────────────────────────────────────────
  p("5. FINANCIAL MATTERS", true);
  p("5.1 Profits", false);
  p("Net profits of the Partnership shall be allocated as follows:");
  bullet(`${u(values.profitPercent, 6)} %`);
  p(
    `Profits shall be accounted for by ${u(values.distributionMethod, 12)} and distributed on ${u(values.distributionDay, 8)} of each month after payment of Partnership costs in accordance with the agreed cost allocation.`
  );
  p("5.2 Costs", false);
  p("Costs and expenses shall be shared as follows:");
  bullet(`${u(values.costPercent, 6)} %`);
  p("5.3 Salaries", false);
  p(
    "Any permanent salary for a Partner shall require unanimous consent of all Partners, including the determination of the amount."
  );

  // ── 6. PARTNER ROLES AND BENEFITS ─────────────────────────────────────────
  p("6. PARTNER ROLES AND BENEFITS", true);
  p("6.1 Vacation", false);
  p(`Each Partner shall be entitled to ${u(values.vacationDays, 4)} vacation days per year.`);
  p("6.2 Accounting and Records", false);
  bullet(
    "(a) Partnership accounts, including contribution and distribution accounts, shall be audited every six months."
  );
  bullet(
    "(b) Partners shall maintain a joint contribution account and a joint distribution account."
  );
  bullet(
    "(c) Each Partner shall be responsible for their individual tax obligations on any distributions received."
  );
  bullet("(d) Accounting records shall be maintained on a cash basis.");
  bullet(
    `(e) The fiscal year shall end on ${u(values.fiscalYearEndMonth, 8)} of each year. Partners shall report on the state of the Partnership within two weeks of fiscal year-end.`
  );

  // ── 7. WITHDRAWAL, DEATH, OR BUY-OUT ──────────────────────────────────────
  p("7. WITHDRAWAL, DEATH, OR BUY-OUT", true);
  p("7.1 Withdrawal", false);
  p(
    "Any Partner may withdraw from the Partnership at any time in accordance with this Agreement."
  );
  p("7.2 Death or Withdrawal of a Partner", false);
  p("In the event of a Partner's death or voluntary withdrawal:");
  bullet("The remaining Partners shall have the option to buy out the departing Partner's interest.");
  bullet(
    "If agreed, the buy-out shall be shared equally among all remaining Partners."
  );
  bullet(
    "An independent valuation firm shall assess the value of the departing Partner's interest."
  );
  bullet("The valuation shall be final only upon unanimous agreement of the Partners.");
  bullet(
    `Partners shall have ${u(values.buyoutDecisionDays, 6)} days to decide whether to exercise the buy-out option.`
  );
  bullet(
    "If unanimity is not achieved, individual Partners may purchase shares proportionally."
  );
  bullet(
    "With unanimous consent, the Partnership may allow a non-Partner to purchase the interest."
  );
  bullet(
    `If no purchase is finalized within ${u(values.buyoutFinalizeDays, 6)} days, the Partnership may be dissolved.`
  );

  // ── 8. DISSOLUTION ─────────────────────────────────────────────────────────
  p("8. DISSOLUTION", true);
  p("In the event of dissolution by majority vote:");
  bullet("The Partnership shall be liquidated, and all debts shall be paid.");
  bullet(
    "Remaining assets shall be distributed according to each Partner's percentage ownership interest."
  );

  // ── 9. AMENDMENTS AND NOTICES ─────────────────────────────────────────────
  p("9. AMENDMENTS AND NOTICES", true);
  p("9.1 Amendments", false);
  p(
    "Amendments to this Agreement shall require unanimous written consent of all Partners, with original signatures affixed."
  );
  p("9.2 Notices", false);
  p(
    "All notices, requests, claims, or demands under this Agreement shall be in writing and delivered via:"
  );
  bullet("Personal delivery");
  bullet("Certified mail");
  bullet("Electronic mail, if consented");

  // ── 10. DISPUTE RESOLUTION ─────────────────────────────────────────────────
  p("10. DISPUTE RESOLUTION", true);
  p(
    "The Partners agree to attempt resolution of any dispute arising out of or relating to the Partnership or this Agreement through amicable negotiations."
  );
  p(
    `If negotiation fails, disputes shall be submitted to mediation in accordance with applicable statutory rules in ${u(values.mediationLocation, 12)}. If mediation is unsuccessful or unavailable, the Parties may pursue any other legal remedies available.`
  );

  // ── 11. SIGNATORIES ────────────────────────────────────────────────────────
  p("11. SIGNATORIES", true);
  p(
    "IN WITNESS WHEREOF, the Partners have executed this Partnership Agreement as of the Effective Date first written above. Each Partner acknowledges that they have read, understood, and agreed to the terms and conditions of this Agreement."
  );
  y += 2;

  p("Partner 1:");
  sigLine("Name", values.partner1Name, 24);
  p("Signature: ___________________________");
  sigLine("Date", values.partner1Date, 24);
  y += 3;

  p("Partner 2:");
  sigLine("Name", values.partner2Name, 24);
  p("Signature: ___________________________");
  sigLine("Date", values.partner2Date, 24);
  y += 3;

  p("Partner 3 (if applicable):");
  sigLine("Name", values.partner3Name, 24);
  p("Signature: ___________________________");
  sigLine("Date", values.partner3Date, 24);

  doc.save("partnership_agreement.pdf");
};

export default function PartnershipAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Partnership Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="partnershipagreement"
    />
  );
}