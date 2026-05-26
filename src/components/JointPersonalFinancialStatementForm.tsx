import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Header", fields: [
    { name: "partyOne", label: "Full legal name (Party One)", type: "text", required: false },
    { name: "partyTwo", label: "Full legal name (Party Two)", type: "text", required: false },
    { name: "date", label: "Date", type: "date", required: false },
  ]},
  { label: "Individual Information", fields: [
    { name: "partyOneAddress", label: "Residential address (Party One)", type: "textarea", required: false },
    { name: "partyOnePhone", label: "Home telephone number (Party One)", type: "text", required: false },
    { name: "partyOneDob", label: "Date of birth (Party One)", type: "date", required: false },
    { name: "partyTwoAddress", label: "Residential address (Party Two)", type: "textarea", required: false },
    { name: "partyTwoPhone", label: "Home telephone number (Party Two)", type: "text", required: false },
    { name: "partyTwoDob", label: "Date of birth (Party Two)", type: "date", required: false },
  ]},
  { label: "Assets", fields: [
    { name: "partyOneAssets", label: "Party One - Total Assets", type: "text", required: false },
    { name: "partyTwoAssets", label: "Party Two - Total Assets", type: "text", required: false },
    { name: "jointAssets", label: "Joint Assets - Total", type: "text", required: false },
    { name: "totalCombinedAssets", label: "Total Combined Assets", type: "text", required: false },
    { name: "assetSubtotalOne", label: "Assets subtotal (Party One)", type: "text", required: false },
    { name: "assetSubtotalTwo", label: "Assets subtotal (Party Two)", type: "text", required: false },
    { name: "assetSubtotalJoint", label: "Assets subtotal (Joint)", type: "text", required: false },
  ]},
  { label: "Liabilities", fields: [
    { name: "liabilitySubtotalOne", label: "Liabilities subtotal (Party One)", type: "text", required: false },
    { name: "liabilitySubtotalTwo", label: "Liabilities subtotal (Party Two)", type: "text", required: false },
    { name: "liabilitySubtotalJoint", label: "Liabilities subtotal (Joint)", type: "text", required: false },
    { name: "totalLiabilities", label: "Total Liabilities", type: "text", required: false },
  ]},
  { label: "Income", fields: [
    { name: "investmentAccounts", label: "Investment accounts", type: "text", required: false },
    { name: "trustIncome", label: "Trust income", type: "text", required: false },
    { name: "otherIncome", label: "Other income sources", type: "text", required: false },
    { name: "totalMonthlyIncome", label: "Total Monthly Income", type: "text", required: false },
  ]},
  { label: "Monthly Expenditures", fields: [
    { name: "childCare", label: "Child care", type: "text", required: false },
    { name: "foodHousehold", label: "Food and household expenses", type: "text", required: false },
    { name: "medicalHealth", label: "Medical and health care costs", type: "text", required: false },
    { name: "utilities", label: "Utilities", type: "text", required: false },
    { name: "housingRent", label: "Housing/Rent", type: "text", required: false },
    { name: "mortgageObligations", label: "Additional mortgage obligations", type: "text", required: false },
    { name: "autoLoans", label: "Automobile loans", type: "text", required: false },
    { name: "autoInsurance", label: "Automobile insurance", type: "text", required: false },
    { name: "otherInsurance", label: "Other insurance", type: "text", required: false },
    { name: "creditCardPayments", label: "Credit card payments", type: "text", required: false },
    { name: "studentLoanPayments", label: "Student loan payments", type: "text", required: false },
    { name: "otherExpenses", label: "Other expenses", type: "textarea", required: false },
    { name: "totalMonthlyExpenses", label: "Total Monthly Expenses", type: "text", required: false },
  ]},
  { label: "Certification", fields: [
    { name: "netWorth", label: "Net worth", type: "text", required: false },
    { name: "signatureOne", label: "Signature (Party One)", type: "text", required: false },
    { name: "signatureTwo", label: "Signature (Party Two)", type: "text", required: false },
  ]}
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.2, limit = 282;
  let y = 20;
  const u = (x?: string, n = 12) => (x || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => { if (y + n > limit) { doc.addPage(); y = 20; } };
  const p = (t: string, b = false, g = 1.5) => { const lines = doc.splitTextToSize(t, tw); ensure(lines.length * lh + g); doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10.1); doc.text(lines, m, y); y += lines.length * lh + g; };
  const uf = (l: string, x?: string) => { ensure(lh + 2); const lt = `${l}: `; doc.text(lt, m, y); const sx = m + doc.getTextWidth(lt); const t = (x || "").trim(); if (t) { doc.text(t, sx, y); doc.line(sx, y + 1, sx + Math.max(18, doc.getTextWidth(t)), y + 1); } else { doc.text("____________________", sx, y); } y += lh + 0.8; };

  // helper to draw a 4-column row: label, partyOne, partyTwo, joint
  const drawFourColRow = (label: string, one?: string, two?: string, joint?: string) => {
    ensure(lh + 6);
    const col0 = m;
    const cellW = 40;
    const gap = 8;
    const col1 = m + 78;
    const col2 = col1 + cellW + gap;
    const col3 = col2 + cellW + gap;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    // label on left
    doc.text(label, col0, y);
    const drawCell = (x: number, val?: string) => {
      const display = val && val.trim() ? `$ ${val}` : "$ _____";
      // center the display within the cell
      doc.text(display, x + cellW / 2, y, { align: "center" });
    };
    drawCell(col1, one);
    drawCell(col2, two);
    drawCell(col3, joint);
    y += lh + 2.6;
  };

  const title = "JOINT PERSONAL FINANCIAL STATEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.2); doc.text(title, w / 2, y, { align: "center" }); const titleW = doc.getTextWidth(title); doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2); y += 9;

  p(`Prepared for: ${u(v.partyOne, 8)} and ${u(v.partyTwo, 8)}`);
  uf("Date", v.date);

  p("Individual Information", true);
  uf("Full Legal Name (Party One)", v.partyOne);
  p(`Residential Address (Party One):\n${u(v.partyOneAddress, 24)}`);
  uf("Home Telephone Number (Party One)", v.partyOnePhone);
  uf("Date of Birth (Party One)", v.partyOneDob);
  uf("Full Legal Name (Party Two)", v.partyTwo);
  p(`Residential Address (Party Two):\n${u(v.partyTwoAddress, 24)}`);
  uf("Home Telephone Number (Party Two)", v.partyTwoPhone);
  uf("Date of Birth (Party Two)", v.partyTwoDob);

  p("This Joint Personal Financial Statement is prepared for submission in connection with a loan or credit application and reflects the combined and individual financial condition of the undersigned.");

  p("DETAILED STATEMENT OF ASSETS", true);
  uf("Party One – Total Assets", v.partyOneAssets);
  uf("Party Two – Total Assets", v.partyTwoAssets);
  uf("Joint Assets – Total", v.jointAssets);
  uf("Total Combined Assets", v.totalCombinedAssets);

  p("SUMMARY OF ASSETS AND LIABILITIES", true);
  // column headers
  ensure(lh + 6);
  doc.setFont("helvetica", "bold"); doc.setFontSize(11);
  const hdrCol0 = m; const cellW = 40; const gap = 8; const hdrCol1 = m + 78; const hdrCol2 = hdrCol1 + cellW + gap; const hdrCol3 = hdrCol2 + cellW + gap;
  doc.text("ASSETS", hdrCol0, y - 2);
  // center headers above each fixed cell
  doc.text("Party One", hdrCol1 + cellW / 2, y - 2, { align: "center" });
  doc.text("Party Two", hdrCol2 + cellW / 2, y - 2, { align: "center" });
  doc.text("Joint", hdrCol3 + cellW / 2, y - 2, { align: "center" });
  doc.setFont("helvetica", "normal");
  y += lh + 0.8;
  drawFourColRow("Subtotals", v.assetSubtotalOne, v.assetSubtotalTwo, v.assetSubtotalJoint);
  // Total Assets line (bold with long underline)
  ensure(lh + 6);
  doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.text("Total Assets:", m, y);
  const totalAssetsX = m + doc.getTextWidth("Total Assets:") + 6;
  const totalAssetsVal = `$ ${v.totalCombinedAssets || "________"}`;
  doc.text(totalAssetsVal, totalAssetsX, y);
  // long underline to the right (extend to end of joint column)
  const underlineEnd = hdrCol3 + cellW;
  const ulStart = totalAssetsX + doc.getTextWidth(totalAssetsVal) + 4;
  doc.line(ulStart, y + 1.2, underlineEnd, y + 1.2);
  doc.setFont("helvetica", "normal");
  y += lh + 4;

  // LIABILITIES
  ensure(lh + 6);
  doc.setFont("helvetica", "bold"); doc.text("LIABILITIES", m, y);
  y += lh;
  doc.setFont("helvetica", "normal");
  drawFourColRow("Subtotals", v.liabilitySubtotalOne, v.liabilitySubtotalTwo, v.liabilitySubtotalJoint);
  ensure(lh + 4);
  doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.text("Total Liabilities:", m, y);
  const totalLiabX = m + doc.getTextWidth("Total Liabilities:") + 6;
  const totalLiabVal = `$ ${v.totalLiabilities || "________"}`;
  doc.text(totalLiabVal, totalLiabX, y);
  const ulLiabStart = totalLiabX + doc.getTextWidth(totalLiabVal) + 4;
  const ulLiabEnd = hdrCol3 + cellW;
  doc.line(ulLiabStart, y + 1.2, ulLiabEnd, y + 1.2);
  doc.setFont("helvetica", "normal");
  y += lh + 4;
  p("COMBINED NET WORTH", true);
  uf("Net Worth (Total Assets minus Total Liabilities)", v.netWorth);

  p("SOURCES OF MONTHLY INCOME", true);
  // show lines with labels on left and amount on right with dotted leaders
  const incomeLabelX = m; const incomeAmountX = m + 150;
  const drawIncomeLine = (label: string, val?: string) => {
    ensure(lh + 2);
    doc.text(label, incomeLabelX, y);
    // dotted leader
    const startX = incomeLabelX + doc.getTextWidth(label) + 4;
    const endX = incomeAmountX - 8;
    const dotW = doc.getTextWidth(".");
    let cur = startX;
    while (cur + dotW < endX) { doc.text(".", cur, y); cur += dotW + 0.6; }
    doc.text(`$ ${val && val.trim() ? val : "________"}`, incomeAmountX, y);
    y += lh + 0.8;
  };
  drawIncomeLine("Investment Accounts", v.investmentAccounts);
  drawIncomeLine("Trust Income", v.trustIncome);
  drawIncomeLine("Other Income Sources", v.otherIncome);
  drawIncomeLine("Total Monthly Income", v.totalMonthlyIncome);

  p("MONTHLY EXPENDITURES", true);
  const expLabelX = m; const expAmountX = m + 150;
  const drawExpLine = (label: string, val?: string) => { ensure(lh + 2); doc.text(label, expLabelX, y); doc.text(`$ ${val && val.trim() ? val : "________"}`, expAmountX, y); y += lh + 0.8; };
  drawExpLine("Child Care", v.childCare);
  drawExpLine("Food and Household Expenses", v.foodHousehold);
  drawExpLine("Medical and Health Care Costs", v.medicalHealth);
  drawExpLine("Utilities", v.utilities);
  drawExpLine("Housing/Rent", v.housingRent);
  drawExpLine("Additional Mortgage Obligations", v.mortgageObligations);
  drawExpLine("Automobile Loans", v.autoLoans);
  drawExpLine("Automobile Insurance", v.autoInsurance);
  drawExpLine("Other Insurance", v.otherInsurance);
  drawExpLine("Credit Card Payments", v.creditCardPayments);
  drawExpLine("Student Loan Payments", v.studentLoanPayments);
  ensure(lh + 4);
  p(`Other Expenses (including clothing, recreation, and miscellaneous costs): ${u(v.otherExpenses)}`);
  uf("Total Monthly Expenses", v.totalMonthlyExpenses);

  p("CERTIFICATION OF ACCURACY", true);
  p("We hereby certify and affirm that the information contained in this Joint Personal Financial Statement is true, accurate, and complete to the best of our knowledge and belief.");
  uf("Signature (Party One)", v.signatureOne);
  uf("Signature (Party Two)", v.signatureTwo);

  p("FINAL COMPLIANCE CHECKLIST", true);
  p(`Prepared For: ${u(v.partyOne, 8)} and ${u(v.partyTwo, 8)}`);
  p("Legal Verification: If formal certification is required, both parties must sign and date this statement.");
  p("Copies and Recordkeeping: Provide a signed copy to the lender or authorized financial institution representative and retain a complete copy for personal records.");
  p("Important Legal Notice: The submission of false, misleading, or incomplete information in this Joint Personal Financial Statement may result in serious legal consequences, including denial or revocation of credit, civil liability, and potential criminal penalties. If there is uncertainty regarding any financial entry, consult the lender or a financial professional prior to submission.");

  doc.save("joint_personal_financial_statement.pdf");
};

export default function JointPersonalFinancialStatementForm() {
  return <FormWizard steps={steps} title="Joint Personal Financial Statement" subtitle="Complete the fields to generate the Joint Personal Financial Statement" onGenerate={generatePDF} documentType="joint-personal-financial-statement" />;
}
