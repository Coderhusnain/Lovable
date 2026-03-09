import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parents and Children",
    fields: [
      { name: "parent1", label: "Parent 1", type: "text", required: true },
      { name: "parent2", label: "Parent 2", type: "text", required: true },
      { name: "childrenTable", label: "Children (Name, Sex, DOB)", type: "textarea", required: true },
      { name: "physicalCustodyParent", label: "Parent with sole physical custody", type: "text", required: false },
      { name: "exchangePoint", label: "Exchange point", type: "text", required: false },
      { name: "healthInsuranceParent", label: "Parent providing health insurance", type: "text", required: false },
    ],
  },
  {
    label: "Support and Tax Terms",
    fields: [
      { name: "evenYearParent", label: "Even-numbered years dependency parent", type: "text", required: false },
      { name: "oddYearParent", label: "Odd-numbered years dependency parent", type: "text", required: false },
      { name: "form8332Deadline", label: "IRS Form 8332 deadline", type: "text", required: false },
      { name: "childSupportAmount", label: "Child support amount per month", type: "text", required: false },
      { name: "childSupportBasis", label: "Child support basis", type: "text", required: false },
    ],
  },
  {
    label: "Execution and Notary",
    fields: [
      { name: "dated", label: "Dated", type: "date", required: false },
      { name: "parent1Signature", label: "Parent 1 signature name", type: "text", required: false },
      { name: "parent2Signature", label: "Parent 2 signature name", type: "text", required: false },
      { name: "notaryState", label: "Notary state", type: "text", required: false },
      { name: "notaryCounty", label: "Notary county", type: "text", required: false },
      { name: "notaryName", label: "Notary public", type: "text", required: false },
      { name: "notaryTitleRank", label: "Notary title/rank", type: "text", required: false },
      { name: "notaryCommissionExpires", label: "Notary commission expires", type: "text", required: false },
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

  const u = (value?: string, min = 20) => (value || "").trim() || "_".repeat(min);

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
  const title = "PARENTING PLAN";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p("1. Parents", true);
  p(`This Parenting Plan is entered into by: Parent 1: ${u(values.parent1, 20)} and Parent 2: ${u(values.parent2, 20)}.`);
  p("2. Children", true);
  p(`The minor children of this marriage/relationship are: ${u(values.childrenTable, 26)}.`);
  p("3. Child Custody and Visitation", true);
  p("A. Legal Custody: Both parents agree to maintain joint legal custody of the children.");
  p(`B. Physical Custody: The parties agree that ${u(values.physicalCustodyParent, 18)} shall have sole physical custody of the children.`);
  p("C. Parenting Time / Visitation: The non-custodial parent shall have visitation every other weekend starting Friday at 5:00 p.m. and ending Sunday at 7:00 p.m.");
  p("D. Holiday / Extended Visitation:");
  p("1. Even-numbered years: New Year's Eve, Martin Luther King Jr. Day, Presidents Day, Easter Weekend, Father's Day, Independence Day, Columbus Day, Thanksgiving Holiday Break, Hanukkah, Christmas Eve.");
  p("2. Odd-numbered years: New Year's Day, Spring Break Week, Mother's Day, Memorial Day, Labor Day, Veterans Day, Winter Holiday Break, Christmas Day.");
  p("3. Birthdays: Each parent shall have visitation with the children on their own birthday.");
  p("Holiday, summer, and extended visitation shall take precedence over regular visitation. Missed visits due to holiday or extended visitation will not be rescheduled.");
  p("4. Transportation", true);
  p("The parties agree to equally divide all transportation costs for visitation.");
  p("5. Exchange Point", true);
  p(`The exchange point for pick-up and drop-off shall be ${u(values.exchangePoint, 18)}.`);
  p("6. Notification", true);
  p("Neither parent shall change the residence of the children without adequate prior written notice to the other parent. If either parent relocates, custody and visitation arrangements shall be reassessed.");
  p("7. Childcare", true);
  p("Each parent shall give the other the first opportunity to care for the children during their scheduled parenting time before utilizing any third-party childcare provider.");
  p("8. Health Insurance", true);
  p(`${u(values.healthInsuranceParent, 18)} shall provide health insurance coverage for the children if available at no or minimal cost through employment.`);
  p("9. Non-Covered Medical Expenses", true);
  p("Each parent shall be responsible for 50% of any uninsured or out-of-pocket medical, dental, vision, orthodontic, physical therapy, psychiatric, or pharmaceutical expenses for the children. Reimbursement shall be made within 30 days of receiving written statement and receipts.");
  p("10. Tax Matters Related to the Children", true);
  p(`A. In even-numbered tax years, ${u(values.evenYearParent, 16)} shall claim dependency exemptions.`);
  p(`B. In odd-numbered tax years, ${u(values.oddYearParent, 16)} shall claim dependency exemptions.`);
  p(`C. IRS Form 8332 shall be executed by ${u(values.form8332Deadline, 12)} of the applicable tax year when required.`);
  p("D. Child tax credit and related credits follow dependency allocation unless otherwise agreed in writing.");
  p("E. Earned Income Credit shall be claimed only by the parent meeting the IRS definition of custodial parent for that tax year.");
  p("F. Filing status and modifications must comply with IRS regulations, written agreement, or court order.");
  p("G. Cooperation: both parents shall sign forms and provide necessary information to implement this section.");
  p("11. Child Support", true);
  p(`Child support shall be set at ${u(values.childSupportAmount, 10)} per month based on ${u(values.childSupportBasis, 16)}. Payments shall begin on the 1st day of the month following decree entry and be paid directly to the custodial parent.`);
  p("12. College Expenses", true);
  p("If children attend college, trade school, or technical school, both parents shall equally share tuition, room and board, and required books.");
  p("13. Information Sharing", true);
  p("Both parents are entitled to important information regarding the children, including address, phone number, educational records, medical records, and governmental/law enforcement records. Each parent shall notify the other of emergencies and significant health changes.");
  p("14. Parent-Child Communication", true);
  p("Both parents and children shall have the right to communicate by phone, writing, or email during reasonable hours without interference.");
  p("15. Dispute Resolution", true);
  p("Parents shall attempt to resolve disputes in good faith, prioritizing the children's best interests. If unresolved, they shall seek mediation before court proceedings.", false, 3);

  p("SIGNATURES", true);
  p("We knowingly and voluntarily agree to the terms of this Parenting Plan.");
  uf("Dated", values.dated, 22);
  uf("Parent", values.parent1Signature || values.parent1, 22);
  uf("Parent", values.parent2Signature || values.parent2, 22, 2.5);

  p(`STATE OF ${u(values.notaryState, 12)} )`);
  p(`COUNTY OF ${u(values.notaryCounty, 12)} ) ss:`);
  uf("Notary Public", values.notaryName, 22);
  uf("Title/Rank", values.notaryTitleRank, 22);
  uf("My Commission Expires", values.notaryCommissionExpires, 22);

  doc.save("parenting_plan.pdf");
};

export default function ParentingPlanForm() {
  return (
    <FormWizard
      steps={steps}
      title="Parenting Plan"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="parentingplan"
    />
  );
}
