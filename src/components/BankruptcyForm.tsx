import React from "react";
import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Background Information",
    fields: [
      { name: "preparedOn", label: "Prepared on", type: "date", required: false },
      { name: "fullLegalName", label: "Full legal name", type: "text", required: true },
      { name: "residentialAddress", label: "Residential address", type: "text", required: true },
      { name: "telephoneNumber", label: "Telephone number", type: "text", required: false },
      { name: "typeOfDebtor", label: "Type of Debtor", type: "text", required: false },
      { name: "natureOfDebt", label: "Nature of Debt", type: "text", required: false },
    ],
  },
  {
    label: "Income",
    fields: [
      { name: "totalMonthlyIncome", label: "Total monthly income", type: "text", required: false },
      { name: "grossMonthlyIncome", label: "Gross monthly income", type: "text", required: false },
    ],
  },
  {
    label: "Assets",
    fields: [
      { name: "cashOnHand", label: "Cash on hand", type: "text", required: false },
      { name: "bankAccounts", label: "Bank accounts", type: "text", required: false },
      { name: "realEstate", label: "Real estate or property owned", type: "textarea", required: false },
      { name: "vehicles", label: "Vehicles", type: "text", required: false },
      { name: "personalProperty", label: "Personal property and household items", type: "textarea", required: false },
      { name: "retirementAccounts", label: "Retirement or investment accounts", type: "textarea", required: false },
      { name: "businessInterests", label: "Business interests or ownership", type: "textarea", required: false },
    ],
  },
  {
    label: "Liabilities & Creditors",
    fields: [
      { name: "securedDebts", label: "Secured debts", type: "textarea", required: false },
      { name: "unsecuredDebts", label: "Unsecured debts", type: "textarea", required: false },
      { name: "creditorName", label: "Creditor name", type: "text", required: false },
      { name: "creditorAddress", label: "Creditor address", type: "text", required: false },
      { name: "accountNumber", label: "Account number", type: "text", required: false },
      { name: "amountOwed", label: "Amount owed", type: "text", required: false },
      { name: "monthlyPayment", label: "Monthly payment", type: "text", required: false },
      { name: "pastDueAmount", label: "Past due amount", type: "text", required: false },
      { name: "otherLiabilityNotes", label: "Other liability notes", type: "textarea", required: false },
    ],
  },
  {
    label: "Residential & Utilities",
    fields: [
      { name: "mortgageOrRent", label: "Mortgage or Rent", type: "text", required: false },
      { name: "propertyInsurance", label: "Property or Renter’s Insurance", type: "text", required: false },
      { name: "propertyTaxes", label: "Property Taxes", type: "text", required: false },
      { name: "hoaDues", label: "Homeowners' Association or Condominium Dues", type: "text", required: false },
      { name: "electricity", label: "Electricity, Heating, or Gas", type: "text", required: false },
      { name: "waterWaste", label: "Water and Waste Services", type: "text", required: false },
      { name: "telephone", label: "Telephone", type: "text", required: false },
      { name: "tvInternet", label: "Television and Internet", type: "text", required: false },
    ],
  },
  {
    label: "Household",
    fields: [
      { name: "homeMaintenance", label: "Home Maintenance, Repairs, and Supplies", type: "text", required: false },
      { name: "groceries", label: "Groceries and Household Food", type: "text", required: false },
    ],
  },
  {
    label: "Medical",
    fields: [
      { name: "healthInsurance", label: "Health Insurance", type: "text", required: false },
      { name: "medicalDental", label: "Medical and Dental Costs", type: "text", required: false },
      { name: "prescriptionCosts", label: "Prescription Medications and Other Health Costs", type: "text", required: false },
    ],
  },
  {
    label: "Personal & Family",
    fields: [
      { name: "clothingLaundry", label: "Clothing, Laundry, and Dry Cleaning", type: "text", required: false },
      { name: "personalCare", label: "Personal Care Products and Services", type: "text", required: false },
      { name: "childCare", label: "Child Care", type: "text", required: false },
      { name: "alimony", label: "Alimony or Spousal Support", type: "text", required: false },
      { name: "childSupport", label: "Child Support", type: "text", required: false },
      { name: "entertainment", label: "Entertainment, Travel, and Vacations", type: "text", required: false },
      { name: "transportation", label: "Transportation", type: "text", required: false },
      { name: "charitableContributions", label: "Charitable or Religious Contributions", type: "text", required: false },
      { name: "lifeInsurance", label: "Life Insurance", type: "text", required: false },
    ],
  },
  {
    label: "Totals & Compliance",
    fields: [
      { name: "totalMonthlyExpenses", label: "Total monthly expenses", type: "text", required: false },
      { name: "netMonthlyIncome", label: "Net monthly income after expenses", type: "text", required: false },
      { name: "creditCounselingDate", label: "Credit counseling date (if any)", type: "date", required: false },
      { name: "notes", label: "Additional notes", type: "textarea", required: false },
    ],
  },
];

const textValue = (value?: string) => (value || "").trim() || "[Not provided]";

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.7;
  const limit = 280;
  let y = 18;

  const ensureSpace = (needed = lh) => {
    if (y + needed > limit) {
      doc.addPage();
      y = 18;
    }
  };

  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    ensureSpace(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const field = (label: string, value?: string, min = 18, gap = 1.4) => {
    const shown = textValue(value);
    const labelText = `${label}: `;
    const combined = `${labelText}${shown}`;
    const lines = doc.splitTextToSize(combined, tw);
    ensureSpace(lines.length * lh + gap);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m, y);
    if (shown !== "[Not provided]") {
      const startX = m + doc.getTextWidth(labelText);
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, Math.min(w - m, startX + Math.max(18, doc.getTextWidth(shown))), y + 1.1);
    }
    y += lines.length * lh + gap;
  };

  const section = (title: string) => {
    p(title, true, 1.8);
  };

  doc.setFontSize(12.5);
  p("BANKRUPTCY WORKSHEET", true, 3);
  p("Prepared on: __________________________", false, 2.2);

  section("BACKGROUND INFORMATION");
  p("Debtor Information", true);
  field("Full Legal Name", values.fullLegalName, 24);
  field("Residential Address", values.residentialAddress, 30);
  field("Telephone Number", values.telephoneNumber, 18);
  field("Type of Debtor", values.typeOfDebtor, 24);
  field("Nature of Debt", values.natureOfDebt, 24);

  section("MONTHLY INCOME");
  p("(Insert all sources of income)");
  field("Total Monthly Income", values.totalMonthlyIncome, 18);

  section("INCOME PRIOR TO EXPENSES");
  field("Gross Monthly Income", values.grossMonthlyIncome, 18);

  section("ASSETS");
  field("Cash on hand", values.cashOnHand, 18);
  field("Bank accounts", values.bankAccounts, 18);
  field("Real estate or property owned", values.realEstate, 26);
  field("Vehicles", values.vehicles, 18);
  field("Personal property and household items", values.personalProperty, 26);
  field("Retirement or investment accounts", values.retirementAccounts, 26);
  field("Business interests or ownership", values.businessInterests, 26);

  section("LIABILITIES & CREDITORS");
  field("Secured debts", values.securedDebts, 26);
  field("Unsecured debts", values.unsecuredDebts, 26);
  field("Creditor name", values.creditorName, 18);
  field("Creditor address", values.creditorAddress, 26);
  field("Account number", values.accountNumber, 18);
  field("Amount owed", values.amountOwed, 18);
  field("Monthly payment", values.monthlyPayment, 18);
  field("Past due amount", values.pastDueAmount, 18);
  field("Other liability notes", values.otherLiabilityNotes, 28);

  section("MONTHLY EXPENDITURES");
  p("Residential Expenses", true);
  field("Mortgage or Rent", values.mortgageOrRent, 18);
  field("Property or Renter’s Insurance", values.propertyInsurance, 22);
  field("Property Taxes", values.propertyTaxes, 18);
  field("Homeowners’ Association or Condominium Dues", values.hoaDues, 26);

  p("Utilities", true);
  field("Electricity, Heating, or Gas", values.electricity, 24);
  field("Water and Waste Services", values.waterWaste, 24);
  field("Telephone", values.telephone, 18);
  field("Television and Internet", values.tvInternet, 24);

  p("Household Expenses", true);
  field("Home Maintenance, Repairs, and Supplies", values.homeMaintenance, 28);
  field("Groceries and Household Food", values.groceries, 26);

  p("Medical Expenses", true);
  field("Health Insurance", values.healthInsurance, 20);
  field("Medical and Dental Costs", values.medicalDental, 24);
  field("Prescription Medications and Other Health Costs", values.prescriptionCosts, 28);

  p("Personal and Family Expenses", true);
  field("Clothing, Laundry, and Dry Cleaning", values.clothingLaundry, 28);
  field("Personal Care Products and Services", values.personalCare, 28);
  field("Child Care", values.childCare, 18);
  field("Alimony or Spousal Support", values.alimony, 22);
  field("Child Support", values.childSupport, 18);
  field("Entertainment, Travel, and Vacations", values.entertainment, 28);
  field("Transportation", values.transportation, 20);
  field("Charitable or Religious Contributions", values.charitableContributions, 28);
  field("Life Insurance", values.lifeInsurance, 18);

  section("TOTAL MONTHLY EXPENSES");
  field("Total Monthly Expenses", values.totalMonthlyExpenses, 18);

  section("NET MONTHLY INCOME AFTER EXPENSES");
  field("Net Monthly Income After Expenses", values.netMonthlyIncome, 18);

  section("BANKRUPTCY WORKSHEET COMPLIANCE CHECKLIST");
  p("Important Notice", true);
  p("This Bankruptcy Worksheet is a financial planning tool only and does not constitute a legal document. No signature, witnesses, or notarization are required.");
  p("☐ Retain a complete copy of this worksheet for your records.");

  section("ADDITIONAL INFORMATION");
  p("This worksheet is intended to assist in organizing financial information necessary for bankruptcy preparation. Federal law requires that debtors receive credit counseling from an approved provider within 180 days prior to filing a bankruptcy petition. In certain circumstances, a Reaffirmation Agreement may be required for secured debts that the debtor intends to continue paying following bankruptcy. Such agreement is executed between the debtor and creditor to exclude specific debts from discharge. The United States Bankruptcy Court prescribes required disclosures and documentation for reaffirmation agreements. Consultation with a qualified attorney is strongly recommended for guidance.");

  section("REASONS FOR UPDATING THIS WORKSHEET");
  p("• To add, modify, or correct creditor information");
  p("• To update debt amounts or property values");
  p("• To reflect changes in income or expenses");

  doc.save("bankruptcy_worksheet.pdf");
};

export default function BankruptcyForm() {
  return (
    <FormWizard
      steps={steps}
      title="Bankruptcy Worksheet"
      subtitle="Fill out each section to generate your worksheet"
      onGenerate={generatePDF}
      documentType="bankruptcyworksheet"
    />
  );
}
