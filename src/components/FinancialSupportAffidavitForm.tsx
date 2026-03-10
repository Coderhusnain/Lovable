import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Affiant",
    fields: [
      { name: "affiantName", label: "Affiant full name", type: "text", required: true },
      { name: "unemploymentStatement", label: "Employment statement", type: "text", required: true, placeholder: "I am unemployed" },
    ],
  },
  {
    label: "Financial Summary",
    fields: [
      { name: "incomeSource", label: "Income source", type: "text", required: true },
      { name: "incomeDescription", label: "Income description", type: "text", required: true },
      { name: "incomeAmount", label: "Gross monthly income amount", type: "text", required: true },
      { name: "deductionsSummary", label: "Monthly deductions summary", type: "textarea", required: true },
      { name: "netMonthlyIncome", label: "Present net monthly income", type: "text", required: true },
      { name: "averageMonthlyExpense", label: "Average monthly expense", type: "text", required: true },
      { name: "householdExpenses", label: "Household expenses summary", type: "textarea", required: true },
      { name: "debtsSummary", label: "Debt details summary", type: "textarea", required: true },
      { name: "assetsSummary", label: "Assets owned summary", type: "textarea", required: true },
      { name: "totalMonthlyExpenses", label: "Total monthly expenses", type: "text", required: true },
      { name: "totalAssets", label: "Total assets", type: "text", required: true },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "affidavitDate", label: "Affidavit date", type: "date", required: true },
      { name: "notaryDate", label: "Notary sworn date", type: "date", required: true },
      { name: "notaryName", label: "Notary public name", type: "text", required: true },
      { name: "notaryCommissionExpires", label: "Notary commission expires", type: "text", required: false },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 20;
  const u = (v?: string, n = 14) => (v || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => {
    if (y + n > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const l = `${label}: `;
    doc.text(l, m, y);
    const x = m + doc.getTextWidth(l);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(20, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.8);
  const title = "AFFIDAVIT OF FINANCIAL SUPPORT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`I, ${u(values.affiantName)}, being duly sworn, do depose and say:`);
  p(`${u(values.unemploymentStatement)}.`);
  p("1. Gross Monthly Income from All Sources:", true);
  uf("Source", values.incomeSource);
  uf("Description", values.incomeDescription);
  uf("Income", values.incomeAmount);
  p("2. Total Present Monthly Deduction", true);
  p(values.deductionsSummary || "Federal/State/Local income tax, FICA/self-employment taxes, Medicare, mandatory union dues, mandatory retirement payments, health insurance, child support, alimony.");
  uf("Present Net Monthly Income", values.netMonthlyIncome);
  p("3. Average Monthly Expense", true);
  uf("Average Monthly Expense", values.averageMonthlyExpense);
  p("Household Expenses:", true);
  p(values.householdExpenses);
  p("Debts:", true);
  p(values.debtsSummary);
  p("4. Assets Owned by the Parties:", true);
  p(values.assetsSummary);
  p("5. Summary:", true);
  uf("Total Present Net Monthly Income", values.netMonthlyIncome);
  uf("Total Monthly Expenses", values.totalMonthlyExpenses);
  uf("Total Assets", values.totalAssets);
  p("The undersigned certifies that the information and statements in this affidavit are true and complete.");
  uf("Affiant's Name", values.affiantName);
  uf("Affiant's Signature Date", values.affidavitDate);
  p(
    `Subscribed and sworn to (or affirmed) before me on this ${u(values.notaryDate, 8)} by ${u(values.affiantName)}, who is personally known to me or has provided satisfactory proof of identity.`
  );
  uf("Signature of Notary Public", values.notaryName);
  uf("Name of Notary Public", values.notaryName);
  uf("My Commission Expires", values.notaryCommissionExpires);
  p("Notary Seal: __________________________");
  p("Make It Legal", true);
  p(`This Affidavit should be signed in front of a notary public by ${u(values.affiantName)}.`);
  p("Once signed in front of a notary, this document should be delivered to the appropriate court for filing.");
  p("Copies: The original should be filed and the Affiant should maintain a copy in a safe place.");
  p("Additional Assistance: Seek legal counsel for special situations or legal questions.");

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
