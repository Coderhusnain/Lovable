import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State / Province", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "county", label: "County", type: "text", required: true },
    ],
  },
  {
    label: "Affiant and Income",
    fields: [
      { name: "affiantName", label: "Affiant full name", type: "text", required: true },
      { name: "employmentStatement", label: "Employment statement", type: "text", required: true, placeholder: "I am unemployed" },
      { name: "incomeSource", label: "Income source", type: "text", required: true },
      { name: "incomeDescription", label: "Income description", type: "text", required: true },
      { name: "incomeAmount", label: "Income amount", type: "text", required: true },
    ],
  },
  {
    label: "Deductions and Expenses",
    fields: [
      { name: "federalTax", label: "Federal/State/Local income tax", type: "text", required: true },
      { name: "ficaTaxes", label: "FICA or self-employment taxes", type: "text", required: true },
      { name: "medicare", label: "Medicare payments", type: "text", required: true },
      { name: "unionDues", label: "Mandatory union dues", type: "text", required: true },
      { name: "retirementPayments", label: "Mandatory retirement payments", type: "text", required: true },
      { name: "healthInsurance", label: "Health insurance payments", type: "text", required: true },
      { name: "childSupport", label: "Child support", type: "text", required: true },
      { name: "alimony", label: "Alimony", type: "text", required: true },
      { name: "netMonthlyIncome", label: "Present net monthly income", type: "text", required: true },
      { name: "averageMonthlyExpense", label: "Average monthly expense", type: "text", required: true },
      { name: "householdExpenses", label: "Household expenses detail", type: "textarea", required: true },
      { name: "debtsSummary", label: "Debts detail", type: "textarea", required: true },
      { name: "assetsSummary", label: "Assets detail", type: "textarea", required: true },
      { name: "totalMonthlyExpenses", label: "Total monthly expenses", type: "text", required: true },
      { name: "totalAssets", label: "Total assets", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "affiantSignature", label: "Affiant signature name", type: "text", required: true },
      { name: "affidavitDate", label: "Affiant date", type: "date", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "notaryDay", label: "Notary day", type: "text", required: true },
      { name: "notaryMonth", label: "Notary month", type: "text", required: true },
      { name: "notaryYear", label: "Notary year", type: "text", required: true },
      { name: "notaryAppearedName", label: "Person appearing before notary", type: "text", required: true },
      { name: "notarySignature", label: "Notary signature name", type: "text", required: true },
      { name: "notaryName", label: "Notary full name", type: "text", required: true },
      { name: "commissionExpires", label: "Commission expires", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.3;
  const limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.2);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(18, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("____________________", x, y);
    }
    y += lh + 0.8;
  };

  const title = "AFFIDAVIT OF FINANCIAL SUPPORT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.6);
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 10;

  p(`I, ${u(v.affiantName)}, being duly sworn, do depose and say:`);
  p(`${u(v.employmentStatement)}.`);
  p("1. Gross Monthly Income from All Sources:", true);
  uf("Source", v.incomeSource);
  uf("Description", v.incomeDescription);
  uf("Income", v.incomeAmount);
  p("2. Total Present Monthly Deduction", true);
  uf("Federal, State, and Local income tax", v.federalTax);
  uf("FICA or self-employment taxes", v.ficaTaxes);
  uf("Medicare payments", v.medicare);
  uf("Mandatory union dues", v.unionDues);
  uf("Mandatory retirement payments", v.retirementPayments);
  uf("Health insurance payments", v.healthInsurance);
  uf("Child Support", v.childSupport);
  uf("Alimony", v.alimony);
  uf("Present Net Monthly Income", v.netMonthlyIncome);
  p("3. Average Monthly Expense:", true);
  uf("Average Monthly Expense", v.averageMonthlyExpense);
  p(`Household Expenses: ${u(v.householdExpenses, 20)}`);
  p(`Debts: ${u(v.debtsSummary, 20)}`);
  p("4. Assets Owned by the Parties:", true);
  p(u(v.assetsSummary, 20));
  p("5. Summary:", true);
  uf("Total Present Net Monthly Income", v.netMonthlyIncome);
  uf("Total Monthly Expenses", v.totalMonthlyExpenses);
  uf("Total Assets", v.totalAssets);
  p("The undersigned certifies that the information and statements in this affidavit are true and complete.");
  uf("Affiant's Name", v.affiantName);
  uf("Affiant's Signature", v.affiantSignature);
  uf("Date", v.affidavitDate);
  p(
    `Subscribed and sworn to (or affirmed) before me on this ${u(v.notaryDay, 2)} day of ${u(v.notaryMonth)}, ${u(v.notaryYear, 4)}, by ${u(v.notaryAppearedName)}, who is personally known to me or has provided satisfactory proof of identity.`
  );
  uf("Signature of Notary Public", v.notarySignature);
  uf("Name of Notary Public", v.notaryName);
  uf("My Commission Expires", v.commissionExpires);
  p("Notary Seal: __________________________");
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)} (${u(v.county)})`);

  doc.save("financial_support_affidavit.pdf");
};

export default function FinancialSupportAffidavit() {
  return (
    <FormWizard
      steps={steps}
      title="Financial Support Affidavit"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="financialsupportaffidavit"
    />
  );
}
