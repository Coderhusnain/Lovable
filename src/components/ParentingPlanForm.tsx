import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parents and Children",
    fields: [
      { name: "parent1", label: "Parent 1", type: "text", required: true },
      { name: "parent2", label: "Parent 2", type: "text", required: true },
      { name: "child1Name", label: "Child 1 Name", type: "text", required: true },
      { name: "child1Sex", label: "Child 1 Sex", type: "text", required: true },
      { name: "child1Dob", label: "Child 1 Date of Birth", type: "date", required: true },
      { name: "child2Name", label: "Child 2 Name", type: "text", required: false },
      { name: "child2Sex", label: "Child 2 Sex", type: "text", required: false },
      { name: "child2Dob", label: "Child 2 Date of Birth", type: "date", required: false },
    ],
  },
  {
    label: "Custody and Visitation",
    fields: [
      { name: "physicalCustodyParent", label: "Parent with sole physical custody", type: "text", required: true },
      { name: "evenYearParent", label: "Even-numbered years holiday parent", type: "text", required: true },
      { name: "oddYearParent", label: "Odd-numbered years holiday parent", type: "text", required: true },
    ],
  },
  {
    label: "Logistics and Insurance",
    fields: [
      { name: "exchangePoint", label: "Exchange point", type: "text", required: true },
      { name: "healthInsuranceParent", label: "Parent providing health insurance", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Child Support and Tax",
    fields: [
      { name: "childSupportAmount", label: "Child support amount per month", type: "text", required: true },
      { name: "childSupportBasis", label: "Child support basis", type: "text", required: true },
      { name: "taxSplitNote", label: "Tax split note (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "dated", label: "Dated", type: "date", required: true },
      { name: "parent1Signature", label: "Parent 1 signature name", type: "text", required: true },
      { name: "parent2Signature", label: "Parent 2 signature name", type: "text", required: true },
      { name: "caretaker1Signature", label: "Caretaker 1 signature name", type: "text", required: true },
      { name: "caretaker2Signature", label: "Caretaker 2 signature name", type: "text", required: false },
    ],
  },
  {
    label: "Notary Acknowledgment",
    fields: [
      { name: "notaryState", label: "Notary state", type: "text", required: false },
      { name: "notaryCounty", label: "Notary county", type: "text", required: false },
      { name: "notaryDay", label: "Notary day", type: "text", required: false },
      { name: "notaryMonth", label: "Notary month", type: "text", required: false },
      { name: "notaryYear", label: "Notary year", type: "text", required: false },
      { name: "notaryAppeared1", label: "Notary appeared person 1", type: "text", required: false },
      { name: "notaryAppeared2", label: "Notary appeared person 2", type: "text", required: false },
      { name: "notarySignature", label: "Notary public signature name", type: "text", required: false },
      { name: "notaryCommissionExpires", label: "Commission expires", type: "text", required: false },
    ],
  },
  {
    label: "Final Review",
    fields: [{ name: "reviewNote", label: "Final review note (optional)", type: "textarea", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.25;
  const bottom = 282;
  let y = 18;

  const u = (value?: string, min = 18) => (value || "").trim() || "_".repeat(min);
  const p = (text: string, bold = false, gap = 1.2) => {
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > bottom) {
      doc.addPage();
      y = 18;
    }
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const hr = () => {
    doc.setLineWidth(0.22);
    doc.line(m, y, w - m, y);
    y += 5;
  };
  const newPage = (top = 18) => {
    doc.addPage();
    y = top;
  };

  // Page 1
  doc.setFont("times", "bold");
  doc.setFontSize(12.7);
  const title = "PARENTING PLAN";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 10;

  p("1. Parents", true, 1.5);
  p("This Parenting Plan is entered into by the following parents:");
  p(`•   Parent 1: ${u(v.parent1, 24)}`, true, 0.9);
  p(`•   Parent 2: ${u(v.parent2, 24)}`, true, 1.7);

  p("2. Children", true, 1.5);
  p("The minor children of this marriage (or relationship) are:");
  p("Name            Sex            Date of Birth", true);
  p(
    `${u(v.child1Name, 12)}    ${u(v.child1Sex, 6)}    ${u(v.child1Dob, 12)}`
  );
  p(
    `${u(v.child2Name, 12)}    ${u(v.child2Sex, 6)}    ${u(v.child2Dob, 12)}`
  );
  p("", false, 0.8);

  p("3. Child Custody and Visitation", true, 1.5);
  p("A. Legal Custody", true, 1.0);
  p("Legal custody refers to the authority to make major decisions regarding the minor children, including but not limited to health care, religion, and education. Both parents agree to maintain joint legal custody of the children.");
  p("B. Physical Custody", true, 1.0);
  p(`Physical custody refers to the authority to make routine, day-to-day decisions and determine the children's primary residence. The parties agree that ${u(v.physicalCustodyParent, 18)} shall have sole physical custody of the children.`);
  p("C. Parenting Time / Visitation", true, 1.0);
  p("The non-custodial parent shall have visitation:");
  p("•   Every other weekend starting Friday at 5:00 p.m. and ending Sunday at 7:00 p.m.", true);
  p("D. Holiday / Extended Visitation", true, 1.0);
  p("The parents agree to divide holiday visitation as follows:");
  p(`1.  Even-numbered years - ${u(v.evenYearParent, 16)} shall have the children for:`, true);
  p("    o   New Year's Eve");
  p("    o   Martin Luther King, Jr. Day");
  p("    o   Presidents Day");
  p("    o   Easter Weekend");
  p("    o   Father's Day");
  p("    o   Independence Day");
  p("    o   Columbus Day");

  // Page 2
  newPage(18);
  p("    o   Thanksgiving Holiday Break");
  p("    o   Hanukkah");
  p("    o   Christmas Eve");
  p(`2.  Odd-numbered years - ${u(v.oddYearParent, 16)} shall have the children for:`, true);
  p("    o   New Year's Day");
  p("    o   Spring Break Week");
  p("    o   Mother's Day");
  p("    o   Memorial Day");
  p("    o   Labor Day");
  p("    o   Veterans Day");
  p("    o   Winter Holiday Break");
  p("    o   Christmas Day");
  p("3.  Birthdays - Each parent shall have visitation with the children on their own birthday.", true);
  p("Holiday, summer, and extended visitation shall take precedence over regular visitation. Missed visits due to holiday or extended visitation will not be rescheduled.");
  p("", false, 0.8);
  p("4. Transportation", true, 1.3);
  p("The parties agree to equally divide all transportation costs for visitation.");
  p("", false, 0.8);
  p("5. Exchange Point", true, 1.3);
  p(`The exchange point for pick-up and drop-off shall be: ${u(v.exchangePoint, 22)}.`);
  p("", false, 0.8);
  p("6. Notification", true, 1.3);
  p("Neither parent shall change the residence of the children without adequate prior written notice to the other parent. If either parent relocates, the custody and visitation arrangements shall be reassessed.");
  p("", false, 0.8);
  p("7. Childcare", true, 1.3);
  p("Each parent shall give the other the first opportunity to care for the children during their scheduled parenting time before utilizing any third-party childcare provider.");
  p("", false, 0.8);
  p("8. Health Insurance", true, 1.3);

  // Page 3
  newPage(18);
  p(`${u(v.healthInsuranceParent, 20)} shall provide health insurance coverage for the children if available at no or minimal cost through employment.`);
  p("", false, 0.8);
  p("9. Non-Covered Medical Expenses", true, 1.3);
  p("Each parent shall be responsible for 50% of any uninsured or out-of-pocket medical, dental, vision, orthodontic, physical therapy, psychiatric, or pharmaceutical expenses for the children. Reimbursement shall be made within 30 days of receiving a written statement and receipts.");
  p("", false, 0.8);
  p("10. Tax Matters Related to the Children", true, 1.3);
  p("A. Allocation of Dependency Exemptions", true, 1.0);
  p("Unless otherwise agreed in writing or modified by court order, the parents agree to allocate the right to claim the federal and state income tax dependency exemptions for the minor children as follows:");
  p(`1.  In even-numbered tax years, ${u(v.evenYearParent, 16)} shall claim the dependency exemption(s) for all minor children.`);
  p(`2.  In odd-numbered tax years, ${u(v.oddYearParent, 16)} shall claim the dependency exemption(s) for all minor children.`);
  p("3.  If there is more than one child, and the parents wish to split the exemptions, such allocation shall be set forth in writing and attached to this Plan.");
  p("B. IRS Form 8332 - Release/Revocation of Claim to Exemption", true, 1.0);
  p("The parent not entitled to claim a child in a given year, but who would otherwise qualify, shall execute IRS Form 8332 or its successor form by ______ of the applicable tax year. Failure to provide the form in a timely manner shall entitle the other parent to seek court enforcement, including reimbursement for any resulting tax liability, penalties, interest, and reasonable attorney's fees.");
  p("C. Child Tax Credit and Other Credits", true, 1.0);
  p("The parent entitled to claim the dependency exemption for a child in a given year shall also be entitled to claim any associated Child Tax Credit, Additional Child Tax Credit, and any other applicable tax benefits unless otherwise agreed in writing.");
  p("D. Earned Income Credit (EIC)", true, 1.0);
  p('The "Earned Income Credit" shall be claimed only by the parent who meets the IRS definition of "custodial parent" for that tax year, regardless of dependency exemption allocation.');
  p("E. Filing Status", true, 1.0);
  p("Each parent shall file taxes in compliance with IRS regulations and consistent with this allocation.");
  p("F. Modification", true, 1.0);
  p("Any modification to this section must be in writing, signed by both parties, or ordered by the court.");

  // Page 4
  newPage(18);
  p("G. Cooperation", true, 1.0);
  p("Both parents agree to sign all necessary forms and provide all necessary information to carry out this section, including providing copies of relevant portions of tax returns upon reasonable request.");
  p("", false, 0.8);
  p("11. Child Support", true, 1.3);
  p(`Child support shall be set at ${u(v.childSupportAmount, 8)} per month based on ${u(v.childSupportBasis, 18)}. Payments shall begin on the 1st day of the month following entry of the decree and be paid directly to the custodial parent.`);
  p("", false, 0.8);
  p("12. College Expenses", true, 1.3);
  p("If the children attend college, trade school, or technical school, both parents shall equally share tuition, room and board, and required books.");
  p("", false, 0.8);
  p("13. Information Sharing", true, 1.3);
  p("A. Both parents are entitled to all important information regarding the children, including their address, phone number, educational records, medical records, and any governmental or law enforcement records.");
  p("B. Both parents shall have equal access to school progress reports and activity schedules.");
  p("C. Each parent shall notify the other of any emergencies or significant changes in the children's health.");
  p("", false, 0.8);
  p("14. Parent-Child Communication", true, 1.3);
  p("Both parents and children shall have the right to communicate by phone, writing, or email during reasonable hours without interference.");
  p("", false, 0.8);
  p("15. Dispute Resolution", true, 1.3);
  p("Parents shall attempt to resolve disputes in good faith, prioritizing the children's best interests. If unable to resolve an issue, they shall first seek mediation before resorting to court proceedings.");
  p("", false, 1.5);
  p("SIGNATURES", true, 1.2);
  p("We knowingly and voluntarily agree to the terms of this Parenting Plan.");
  p(`Dated: ${u(v.dated, 10)}`);
  p(`Parent: ${u(v.parent1Signature || v.parent1, 24)}`);
  p(`Parent: ${u(v.parent2Signature || v.parent2, 24)}`);
  p(`Caretaker 1: ${u(v.caretaker1Signature, 20)}`);
  p(`Caretaker 2: ${u(v.caretaker2Signature, 20)}`);

  // Page 5
  newPage(18);
  hr();
  section("XIII. NOTARY ACKNOWLEDGMENT (Optional but Recommended)");
  p(`STATE OF ${u(v.notaryState, 18)}`, true, 0.9);
  p(`COUNTY OF ${u(v.notaryCounty, 18)}`, true, 1.2);
  p(
    `On this ${u(v.notaryDay, 4)} day of ${u(v.notaryMonth, 10)}, ${u(v.notaryYear, 2)}, before me, a Notary Public in and for said State, personally appeared ${u(v.notaryAppeared1, 22)} and ${u(v.notaryAppeared2, 22)}, known to me to be the persons whose names are subscribed to the within instrument, and acknowledged that they executed the same for the purposes therein contained.`
  );
  p("IN WITNESS WHEREOF, I have hereunto set my hand and affixed my official seal the day and year first above written.", true);
  hr();
  p(`Notary Public Signature ${u(v.notarySignature, 20)}`);
  p(`My Commission Expires: ${u(v.notaryCommissionExpires, 16)}`);
  if ((v.taxSplitNote || "").trim()) p(`Tax Split Note: ${v.taxSplitNote}`);
  if ((v.reviewNote || "").trim()) p(`Review Note: ${v.reviewNote}`);

  doc.save("parenting_plan.pdf");
};

export default function ParentingPlanForm() {
  return (
    <FormWizard
      steps={steps}
      title="Parenting Plan"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="parentingplan"
      preserveStepLayout
    />
  );
}
