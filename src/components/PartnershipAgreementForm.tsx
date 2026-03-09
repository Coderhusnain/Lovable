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
    label: "Capital and Operations",
    fields: [
      { name: "initialContributionDesc", label: "Initial contribution description", type: "text", required: false },
      { name: "initialContributionAmount", label: "Initial contribution amount", type: "text", required: false },
      { name: "contributionDeadline", label: "Contribution deadline", type: "date", required: false },
      { name: "ownershipPercent", label: "Ownership percentage", type: "text", required: false },
      { name: "profitPercent", label: "Profit percentage", type: "text", required: false },
      { name: "distributionMethod", label: "Profit accounting by", type: "text", required: false },
      { name: "distributionDay", label: "Distribution day each month", type: "text", required: false },
      { name: "costPercent", label: "Cost sharing percentage", type: "text", required: false },
      { name: "vacationDays", label: "Vacation days per partner", type: "text", required: false },
      { name: "fiscalYearEndMonth", label: "Fiscal year end month", type: "text", required: false },
    ],
  },
  {
    label: "Withdrawal and Signatures",
    fields: [
      { name: "buyoutDecisionDays", label: "Buy-out decision days", type: "text", required: false },
      { name: "buyoutFinalizeDays", label: "Buy-out finalization days", type: "text", required: false },
      { name: "mediationLocation", label: "Mediation location/jurisdiction", type: "text", required: false },
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
  const uf = (label: string, value?: string, min = 20, gap = 1.8) => {
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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "PARTNERSHIP AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Partnership Agreement (the "Agreement") is made and entered into as of ${u(values.effectiveDate, 12)}, by and among the following parties (collectively, the "Partners" and individually, a "Partner"):`);
  p(`- Partner Name: ${u(values.partnerName, 20)}`);
  p(`- Address: ${u(values.partnerAddress, 20)}`);
  p(`- City/State/ZIP: ${u(values.partnerCityStateZip, 18)}`);
  p("1. NAME OF PARTNERSHIP", true);
  p(`The Partners hereby agree that the business shall operate under the name ${u(values.partnershipName, 18)} (the "Partnership").`);
  p("2. FORMATION AND PURPOSE", true);
  p(`2.1 Formation: The Partners wish to establish a legal partnership in business. This Agreement becomes effective on ${u(values.formationDate, 12)}.`);
  p(`2.2 Principal Place of Business: ${u(values.principalOffice, 18)}.`);
  p(`2.3 Governing Law: Laws of ${u(values.governingLaw, 16)}.`);
  p(`2.4 Purpose: ${u(values.purpose, 20)}.`);
  p("2.5 Licenses and Permits: Partners shall obtain all required licenses, permits, and registrations, including DBA and EIN where applicable.");
  p("3. CAPITAL CONTRIBUTIONS", true);
  p(`3.1 Initial Contributions: ${u(values.initialContributionDesc, 14)}: $${u(values.initialContributionAmount, 8)}.`);
  p(`3.2 Timing of Contributions: All contributions due no later than ${u(values.contributionDeadline, 12)}. Contributions are final unless withdrawal is approved in writing.`);
  p("3.3 Capital Accounts: All contributions are deposited into a joint capital account maintained by the Partnership.");
  p("4. OWNERSHIP INTEREST AND AUTHORITY", true);
  p(`4.1 Ownership Interest: ${u(values.ownershipPercent, 6)}%.`);
  p("4.2 Authority of Partners: All Partners have equal vote; no Partner may independently bind the Partnership; decisions are by majority of equal votes.");
  p("5. FINANCIAL MATTERS", true);
  p(`5.1 Profits: Net profits allocated at ${u(values.profitPercent, 6)}%. Profits accounted for by ${u(values.distributionMethod, 12)} and distributed on ${u(values.distributionDay, 8)} of each month after payment of costs.`);
  p(`5.2 Costs: Shared at ${u(values.costPercent, 6)}%.`);
  p("5.3 Salaries: Permanent salary for any Partner requires unanimous consent including amount.");
  p("6. PARTNER ROLES AND BENEFITS", true);
  p(`6.1 Vacation: Each Partner is entitled to ${u(values.vacationDays, 4)} vacation days per year.`);
  p("6.2 Accounting and Records: Accounts audited every six months; joint contribution and distribution accounts maintained; each Partner handles own tax obligations on distributions; records kept on cash basis; fiscal year ends on stated month with report within two weeks of fiscal year-end.");
  p(`Fiscal year-end month: ${u(values.fiscalYearEndMonth, 8)}.`);
  p("7. WITHDRAWAL, DEATH, OR BUY-OUT", true);
  p("Any Partner may withdraw under this Agreement. Upon death/withdrawal, remaining Partners may buy out interest; valuation by independent firm; valuation final upon unanimous agreement; proportional purchase by individual Partners if unanimity not achieved; non-Partner purchase allowed with unanimous consent.");
  p(`Partners have ${u(values.buyoutDecisionDays, 6)} days to decide buy-out option. If no purchase is finalized within ${u(values.buyoutFinalizeDays, 6)} days, Partnership may be dissolved.`);
  p("8. DISSOLUTION", true);
  p("Upon majority vote dissolution, Partnership is liquidated, debts paid, and remaining assets distributed by percentage ownership.");
  p("9. AMENDMENTS AND NOTICES", true);
  p("Amendments require unanimous written consent with original signatures. Notices are in writing by personal delivery, certified mail, or electronic mail if consented.");
  p("10. DISPUTE RESOLUTION", true);
  p(`Partners shall attempt amicable negotiations first. If unresolved, submit to mediation in ${u(values.mediationLocation, 12)} under applicable statutory rules. If unsuccessful, parties may pursue other legal remedies.`);
  p("11. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the Partners execute this Partnership Agreement as of the Effective Date and acknowledge they have read, understood, and agreed to all terms.");
  p("Partner 1:");
  uf("Name", values.partner1Name, 24);
  p("Signature: ___________________________");
  uf("Date", values.partner1Date, 24, 2.5);
  p("Partner 2:");
  uf("Name", values.partner2Name, 24);
  p("Signature: ___________________________");
  uf("Date", values.partner2Date, 24, 2.5);
  p("Partner 3 (if applicable):");
  uf("Name", values.partner3Name, 24);
  p("Signature: ___________________________");
  uf("Date", values.partner3Date, 24);

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
