import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Parties and Date",
    fields: [
      { name: "agreementDate", label: "Agreement Date", type: "date", required: true },
      { name: "employeeName", label: "Employee Full Legal Name", type: "text", required: true },
      { name: "employeeAddress", label: "Employee Address", type: "textarea", required: true },
      { name: "employerName", label: "Employer Full Legal Name", type: "text", required: true },
      { name: "employerAddress", label: "Employer Principal Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 2: Termination and Pay",
    fields: [
      { name: "terminationDate", label: "Termination Date", type: "date", required: true },
      { name: "severanceAmount", label: "Severance Payment Amount", type: "text", required: true },
      { name: "paymentDays", label: "Severance Payment in [X] Business Days", type: "text", required: true },
    ],
  },
  {
    label: "Step 3: Revocation and Property",
    fields: [
      { name: "revocationDays", label: "Revocation Period Days", type: "text", required: true },
      { name: "revocationTime", label: "Revocation Cutoff Time", type: "text", required: true },
      { name: "returnPropertyDate", label: "Company Property Return Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 4: Law and Compliance",
    fields: [
      { name: "governingState", label: "Governing Law State", type: "text", required: true },
      { name: "referenceText", label: "Reference Response Limitation Text", type: "textarea", required: false },
    ],
  },
  {
    label: "Step 5: Employee Signature",
    fields: [
      { name: "employeeSign", label: "Employee Signature Name", type: "text", required: true },
      { name: "employeeSignDate", label: "Employee Signature Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 6: Employer Signature",
    fields: [
      { name: "employerSign", label: "Employer Signature Name", type: "text", required: true },
      { name: "employerSignTitle", label: "Employer Signatory Title", type: "text", required: true },
      { name: "employerSignDate", label: "Employer Signature Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 7: Final Review",
    fields: [{ name: "reviewNote", label: "Optional Internal Review Note", type: "textarea", required: false }],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const m = 16;
  const tw = 178;
  const lh = 5.2;
  let y = 18;
  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));

  const p = (text: string, bold = false, gap = 1.4) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > 286) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "SEVERANCE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1, 105 + tW / 2, y + 1);
  y += 8;

  p(
    `This Severance Agreement ("Agreement") is made and entered into as of ${u(v.agreementDate, 12)}, by and between ${u(v.employeeName)} residing at ${u(v.employeeAddress)} ("Employee"), and ${u(v.employerName)} having its principal place of business at ${u(v.employerAddress)} ("Employer" or "Company").`
  );
  p("1. TERMINATION DATE", true);
  p(`The Employee's final day of employment shall be ${u(v.terminationDate, 10)} ("Termination Date"). As of that date, employment shall be fully concluded, subject to this Agreement.`);
  p("2. FINAL PAYCHECK", true);
  p("2.1 Employee shall receive, on next regular payroll date after the Termination Date, all wages/salary/commissions earned through Termination Date, less lawful deductions.");
  p("2.2 Except as expressly provided in this Agreement, no further compensation, benefits, bonuses, or other payments are due.");
  p("3. SEVERANCE PAYMENT", true);
  p(`3.1 Consideration - Employer shall pay a one-time lump sum severance payment of $${u(v.severanceAmount, 6)} ("Severance Payment").`);
  p(`3.2 Severance Payment shall be made within ${u(v.paymentDays, 2)} business days after the Effective Date and is subject to applicable tax withholdings.`);
  p("4. RELEASE OF CLAIMS", true);
  p("4.1 General Release - The Employee, on behalf of themselves and their heirs, executors, administrators, successors, and assigns, hereby fully and forever releases, discharges, and covenants not to sue the Employer, its past, present, and future parents, subsidiaries, affiliates, officers, directors, shareholders, employees, agents, representatives, insurers, and assigns (\"Released Parties\") from any and all claims, demands, liabilities, and causes of action, known or unknown, arising out of or relating to:");
  p("• the Employee's employment with the Employer;");
  p("• the termination of such employment; and");
  p("• any other acts, omissions, or events occurring prior to the Effective Date of this Agreement.");
  p("4.2 No Pending Actions - The Employee represents and warrants that they have not filed, joined, or participated in any lawsuits, complaints, or administrative charges against the Employer as of the date of execution of this Agreement.");
  p("5. REVIEW PERIOD AND REVOCATION", true);
  p("5.1 Employee acknowledges a twenty-one (21) day review period.");
  p(`5.2 Employee may revoke within ${u(v.revocationDays, 1)} calendar days after signing by written notice delivered no later than ${u(v.revocationTime, 6)} on the final day. This Agreement becomes effective after revocation period expires without revocation.`);
  p("6. CONFIDENTIALITY AND NON-DISCLOSURE", true);
  p("6.1 Employee shall execute a separate NDA as condition to receiving Severance Payment.");
  p("6.2 Employee shall not use or disclose Employer confidential information except as required by law.");
  p("7. NON-DISPARAGEMENT", true);
  p("Employee shall refrain from false, malicious, or defamatory statements about Employer, products, services, clients, or personnel, except truthful statements required by law.");
  p("8. RETURN OF COMPANY PROPERTY", true);
  p(`8.1 No later than ${u(v.returnPropertyDate, 10)}, Employee shall return all Company property, physical and electronic materials, devices, keys, access items, and any business-related materials.`);
  p("8.2 Failure to return property by deadline may delay Severance Payment processing.");
  p("9. DISCLAIMER UNDER THE NATIONAL LABOR RELATIONS ACT (NLRA)", true);
  p("Nothing in this Agreement shall be construed to prohibit or interfere with the Employee's rights, if applicable, under Section 7 of the NLRA, including but not limited to engaging in concerted activity or discussing terms and conditions of employment.");
  p("10. NO ADMISSION OF LIABILITY", true);
  p(`This Agreement is not an admission of wrongdoing by either party. Employer reference responses: ${u(v.referenceText || "job title and dates of employment only", 18)}.`);
  p("11. ENTIRE AGREEMENT", true);
  p("This Agreement constitutes the full and complete agreement between the parties regarding the subject matter herein, superseding all prior or contemporaneous agreements, understandings, and representations, whether written or oral. Any amendment or modification must be in writing and signed by both parties.");
  p("12. SEVERABILITY", true);
  p("If any provision of this Agreement is held invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect. Any invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.");
  p("13. GOVERNING LAW", true);
  p(`This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State of ${u(v.governingState)}, without regard to its conflicts-of-law principles.`);
  p("ACKNOWLEDGEMENT", true);
  p("By signing below, the Employee acknowledges that they have:");
  p("• read and fully understand this Agreement;");
  p("• had an opportunity to seek legal counsel;");
  p("• entered into this Agreement voluntarily and without coercion; and");
  p("• knowingly released the claims described herein in exchange for the consideration provided.");
  p("EMPLOYEE:", true);
  p(`Signature: ${u(v.employeeSign)}   Date: ${u(v.employeeSignDate, 10)}`);
  p("EMPLOYER:", true);
  p(`Signature: ${u(v.employerSign)}   Title: ${u(v.employerSignTitle)}   Date: ${u(v.employerSignDate, 10)}`);

  doc.save("severance_agreement.pdf");
};

export default function Severance() {
  return (
    <FormWizard
      steps={steps}
      title="Severance Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="severance"
      preserveStepLayout
    />
  );
}
