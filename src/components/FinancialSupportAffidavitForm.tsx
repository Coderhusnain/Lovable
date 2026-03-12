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
    label: "Affiant and Jurisdiction",
    fields: [
      { name: "affiantName", label: "Affiant Name", type: "text", required: true },
      { name: "employmentStatement", label: "Employment Statement", type: "text", required: true, placeholder: "I am unemployed" },
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
    label: "Income and Deductions",
    fields: [
      { name: "incomeSource", label: "Income source", type: "text", required: true },
      { name: "incomeDescription", label: "Income description", type: "text", required: true },
      { name: "incomeAmount", label: "Income amount", type: "text", required: true },
      { name: "federalTax", label: "Federal/State/Local income tax", type: "text", required: true },
      { name: "ficaTaxes", label: "FICA or self-employment taxes", type: "text", required: true },
      { name: "medicare", label: "Medicare payments", type: "text", required: true },
      { name: "unionDues", label: "Mandatory union dues", type: "text", required: true },
      { name: "retirementPayments", label: "Mandatory retirement payments", type: "text", required: true },
      { name: "healthInsurance", label: "Health insurance payments", type: "text", required: true },
      { name: "childSupport", label: "Child support", type: "text", required: true },
      { name: "alimony", label: "Alimony", type: "text", required: true },
      { name: "netMonthlyIncome", label: "Present net monthly income", type: "text", required: true },
    ],
  },
  {
    label: "Expenses, Debts, and Assets",
    fields: [
      { name: "averageMonthlyExpense", label: "Average monthly expense", type: "text", required: true },
      { name: "householdExpenseItem", label: "Household Expense item", type: "text", required: true },
      { name: "householdExpenseDescription", label: "Household Expense description", type: "text", required: true },
      { name: "householdExpenseCost", label: "Household Expense average cost", type: "text", required: true },
      { name: "debtLender", label: "Debt lender", type: "text", required: true },
      { name: "debtDescription", label: "Debt description", type: "text", required: true },
      { name: "debtTotal", label: "Debt total", type: "text", required: true },
      { name: "debtMonthlyPayment", label: "Debt monthly payment", type: "text", required: true },
      { name: "assetName", label: "Asset name", type: "text", required: true },
      { name: "assetDescription", label: "Asset description", type: "text", required: true },
      { name: "assetValue", label: "Asset value", type: "text", required: true },
      { name: "totalMonthlyExpenses", label: "Total monthly expenses", type: "text", required: true },
      { name: "totalAssets", label: "Total assets", type: "text", required: true },
    ],
  },
  {
    label: "Affiant and Notary Signatures",
    fields: [
      { name: "affiantSignature", label: "Affiant signature", type: "text", required: true },
      { name: "affidavitDate", label: "Affiant date", type: "date", required: true },
      { name: "notaryDay", label: "Notary day", type: "text", required: true },
      { name: "notaryMonth", label: "Notary month", type: "text", required: true },
      { name: "notaryYear", label: "Notary year", type: "text", required: true },
      { name: "notaryAppearedName", label: "Person appearing before notary", type: "text", required: true },
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
      { name: "notarySignature", label: "Notary signature name", type: "text", required: true },
      { name: "notaryName", label: "Notary full name", type: "text", required: true },
      { name: "commissionExpires", label: "Commission expires", type: "text", required: true },
    ],
  },
  {
    label: "Make It Legal and Copies",
    fields: [
      { name: "makeItLegalSigner", label: "Signer name in Make It Legal line", type: "text", required: true },
      { name: "copiesNote", label: "Copies note (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Additional Assistance",
    fields: [
      { name: "additionalAssistance", label: "Additional assistance note (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.2, limit = 282;
  let y = 18;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const line = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
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
    doc.setFontSize(10.3);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const centeredUnderlinedTitle = (text: string, size = 12.4, gap = 8.8) => {
    ensure(10);
    doc.setFont("times", "bold");
    doc.setFontSize(size);
    doc.text(text, w / 2, y, { align: "center" });
    const titleW = doc.getTextWidth(text);
    doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
    y += gap;
  };

  centeredUnderlinedTitle("AFFIDAVIT OF FINANCIAL SUPPORT");
  p(`I, ${line(v.affiantName, 8)}, being duly sworn, do depose and say:`);
  p(`${line(v.employmentStatement, 20)}`);
  p("");
  p("1. Gross Monthly Income from All Sources:", true);
  p("   •   Source " + line(v.incomeSource, 10));
  p("   •   Description " + line(v.incomeDescription, 12));
  p("   •   Income " + line(v.incomeAmount, 14));
  p("");
  p("2. Total Present Monthly Deduction", true);
  p("   •   Federal, State, and Local income tax: " + line(v.federalTax, 4));
  p("   •   FICA or self-employment taxes: " + line(v.ficaTaxes, 4));
  p("   •   Medicare payments: " + line(v.medicare, 4));
  p("   •   Mandatory union dues: " + line(v.unionDues, 4));
  p("   •   Mandatory retirement payments: " + line(v.retirementPayments, 4));
  p("   •   Health insurance payments: " + line(v.healthInsurance, 4));
  p("   •   Child Support: " + line(v.childSupport, 4));
  p("   •   Alimony: " + line(v.alimony, 4));
  p("➤  Present Net Monthly Income " + line(v.netMonthlyIncome, 8));
  p("3.   Average Monthly Expense:", true);
  p("➤  Household Expenses:");
  p("   •   Expense                     Description                 Average Cost");
  p(`      ${line(v.householdExpenseItem, 10)}               ${line(v.householdExpenseDescription, 10)}               ${line(v.householdExpenseCost, 10)}`);
  p("➤  Debts:");
  p("   •   Lender : " + line(v.debtLender, 8));
  p("   •   Description: " + line(v.debtDescription, 8));
  p("   •   Total Debt: " + line(v.debtTotal, 8));
  p("   •   Monthly Payment: " + line(v.debtMonthlyPayment, 8));

  doc.addPage();
  y = 20;
  p("4.   Assets Owned by the Parties:", true);
  p("   •   Assets: " + line(v.assetName, 10));
  p("   •   Description: " + line(v.assetDescription, 10));
  p("   •   Value: " + line(v.assetValue, 10));
  p("");
  p("5.   Summary:", true);
  p("   •   Total Present Net Monthly income: " + line(v.netMonthlyIncome, 10));
  p("   •   Total Monthly Expenses: " + line(v.totalMonthlyExpenses, 10));
  p("   •   Total Assets: " + line(v.totalAssets, 10));
  p("");
  p("The undersigned certifies that the information and statements in this affidavit are true and complete.");
  p("");
  p(`Affiant's Name: ${line(v.affiantName, 36)}`, true, 0.9);
  p(`Affiant's Signature: ${line(v.affiantSignature, 32)}`, true, 0.9);
  p(`Date: ${line(v.affidavitDate, 20)}`, true, 1.6);
  p(
    `Subscribed and sworn to (or affirmed) before me on this ${u(v.notaryDay, 4)} day of ${u(v.notaryMonth, 6)}, ${u(v.notaryYear, 2)}, by ${line(v.notaryAppearedName, 28)}, who ${u(v.identityType, 14)}.`,
    true
  );
  p(`Signature of Notary Public: ${line(v.notarySignature, 30)}`, true, 0.9);
  p(`Name of Notary Public: ${line(v.notaryName, 33)}`, true, 0.9);
  p(`My Commission Expires: ${line(v.commissionExpires, 30)}`, true, 0.9);
  p("Notary Seal:", true, 1.2);

  doc.addPage();
  y = 30;
  centeredUnderlinedTitle("Make It Legal", 12, 7);
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

  doc.save("financial_support_affidavit.pdf");
};

export default function FinancialSupportAffidavit() {
  return (
    <FormWizard
      steps={steps}
      title="Financial Support Affidavit"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="financialsupportaffidavit"
      preserveStepLayout
    />
  );
}
