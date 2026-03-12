import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const countryOptions = [
  { value: "Pakistan", label: "Pakistan" },
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Other", label: "Other" },
];

const getStateOptions = (country?: string) => {
  if (country === "Pakistan") return [{ value: "Punjab", label: "Punjab" }, { value: "Sindh", label: "Sindh" }, { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" }, { value: "Balochistan", label: "Balochistan" }, { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" }, { value: "Azad Jammu and Kashmir", label: "Azad Jammu and Kashmir" }, { value: "Gilgit-Baltistan", label: "Gilgit-Baltistan" }];
  if (country === "United States") return [{ value: "California", label: "California" }, { value: "New York", label: "New York" }, { value: "Texas", label: "Texas" }, { value: "Florida", label: "Florida" }, { value: "Other US State", label: "Other US State" }];
  if (country === "Canada") return [{ value: "Ontario", label: "Ontario" }, { value: "Quebec", label: "Quebec" }, { value: "British Columbia", label: "British Columbia" }, { value: "Alberta", label: "Alberta" }, { value: "Other Canadian Province", label: "Other Canadian Province" }];
  if (country === "United Kingdom") return [{ value: "England", label: "England" }, { value: "Scotland", label: "Scotland" }, { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" }];
  if (country === "Australia") return [{ value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" }, { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" }, { value: "Other Australian State", label: "Other Australian State" }];
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction and Effective Date",
    fields: [
      { name: "effectiveDate", label: "Agreement Effective Date", type: "date", required: true },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true, placeholder: "Rawalpindi" },
    ],
  },
  {
    label: "Parties and Position",
    fields: [
      { name: "employerName", label: "Employer Name", type: "text", required: true, placeholder: "Entertainment Nama Inc." },
      { name: "employerPrincipalOffice", label: "Employer Principal Office", type: "textarea", required: true, placeholder: "Near Al-Razi Children Hospital, Main Chandni Chowk, Rawalpindi" },
      { name: "employeeName", label: "Employee Name", type: "text", required: true, placeholder: "---------------------------" },
      { name: "positionTitle", label: "Position Title", type: "text", required: true, placeholder: "---------------------" },
    ],
  },
  {
    label: "Duties and Compensation",
    fields: [
      { name: "monthlySalaryPkr", label: "Monthly Salary (PKR)", type: "text", required: true, placeholder: "----------" },
      { name: "salaryPaymentPolicy", label: "Salary payment policy reference", type: "text", required: true, placeholder: "in accordance with the Employer’s position" },
    ],
  },
  {
    label: "Confidentiality and Disclosure",
    fields: [
      { name: "confidentialityNotes", label: "Confidentiality notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Termination and Compliance",
    fields: [
      { name: "employeeNoticeMonths", label: "Employee Notice Period (months)", type: "text", required: true, placeholder: "2" },
      { name: "terminationNotes", label: "Termination notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Execution Details",
    fields: [
      { name: "employeeSignature", label: "Employee Signature", type: "text", required: true },
      { name: "employeeExecutionName", label: "Employee Execution Name", type: "text", required: true },
      { name: "employeeExecutionDate", label: "Employee Execution Date", type: "date", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [
      { name: "finalNotes", label: "Final notes (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
  const lh = 5.3;
  let y = 18;

  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    doc.setFont("times", "normal");
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const show = u(value, 12);
    doc.text(show, x, y);
    doc.line(x, y + 1, x + doc.getTextWidth(show), y + 1);
    y += 6.2;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "EMPLOYMENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  uf("Effective Date: ", v.effectiveDate);

  p(`This Employment Agreement ("Agreement") is made and entered into ${u(v.effectiveDate, 12)}, by and between ${u(v.employerName)}, a corporation having its principal place of business at ${u(v.employerPrincipalOffice)} ("Employer"), and ${u(v.employeeName)} ("Employee"). The Employer and the Employee may hereinafter be referred to collectively as the "Parties" and individually as a "Party."`);

  p("RECITALS", true);
  p("The Employer desires to employ the Employee, and the Employee agrees to accept such employment, upon the terms and conditions set forth in this Agreement.");
  p("NOW, THEREFORE, in consideration of the mutual promises and covenants contained herein, the Parties agree as follows:");

  p("1. EMPLOYMENT", true);
  p("1.1 Position");
  p(`The Employer hereby employs the Employee on the position of ${u(v.positionTitle)}. The Employee accepts such employment, subject to the general supervision and direction of the Employer and its duly authorized supervisory personnel.`);
  p("1.2 Duties");
  p("The Employee shall perform all work as directed by the Employer. In addition, the Employee shall (i) discharge all duties customarily associated with the position, and (ii) undertake such other tasks as may reasonably be assigned by the Employer from time to time.");

  p("2. BEST EFFORTS", true);
  p("The Employee agrees to discharge their duties faithfully, diligently, and to the best of their professional ability, at such times and places as may reasonably be required by the Employer.");

  p("3. COMPENSATION", true);
  p("3.1 Salary");
  p(`As full compensation for all services rendered under this Agreement, the Employer shall pay the Employee salary of PKR ${u(v.monthlySalaryPkr)}, per month payable in accordance with ${u(v.salaryPaymentPolicy)}.`);

  p("4. RECOMMENDATIONS FOR IMPROVEMENT", true);
  p(`The Employee agrees to provide the Employer with suggestions, recommendations, and information that may contribute to the efficiency and improvement of the operations of ${u(v.employerName)}.`);

  p("5. CONFIDENTIALITY", true);
  p("5.1 Acknowledgment of Access");
  p("The Employee acknowledges that, during the course of employment, they will have access to confidential and proprietary information (\"Confidential Information\") belonging to the Employer.");
  p("5.2 Non-Disclosure Obligation");
  p("The Employee shall not, directly or indirectly, disclose, use, or permit the use of any Confidential Information except as expressly authorized in writing by the Employer.");
  p("5.3 Material Breach");
  p("Any unauthorized disclosure of Confidential Information shall constitute a material breach of this Agreement and shall entitle the Employer to immediate equitable relief, including but not limited to injunctive relief, in addition to any other remedies available at law.");
  if ((v.confidentialityNotes || "").trim()) p(v.confidentialityNotes);

  p("6. UNAUTHORIZED DISCLOSURE", true);
  p("In the event the Employee discloses, or threatens to disclose, Confidential Information, the Employer shall be entitled to seek injunctive relief to restrain such disclosure and may pursue damages and any other remedies available under applicable law.");

  p("7. TERMINATION", true);
  p("7.1 Notice of Termination");
  p(`The Employee may terminate this Agreement by providing the Employer with ${u(v.employeeNoticeMonths, 1)} (2) months' prior written notice.`);
  p("7.2 Termination by Employer");
  p("The Employer may terminate this Agreement at any time by providing written notice to the Employee.");
  p("7.3 Termination for Cause");
  p("If the Employee commits a material breach of this Agreement or engages in misconduct, the Employer may terminate the Employee's employment immediately, without further obligation of compensation beyond amounts accrued as of the termination date.");
  if ((v.terminationNotes || "").trim()) p(v.terminationNotes);

  p("8. COMPLIANCE WITH EMPLOYER'S RULES", true);
  p("The Employee agrees to abide by and comply with all rules, policies, and regulations established by the Employer, as may be amended or introduced from time to time.");

  p("9. RETURN OF EMPLOYER'S PROPERTY", true);
  p(`Upon termination of employment, the Employee shall immediately return to the Employer all property belonging to ${u(v.employerName)}, including but not limited to keys, access cards, records, documents, data, electronic equipment, memoranda, and any other materials, whether in tangible or electronic form.`);

  p("10. ENTIRE AGREEMENT", true);
  p("This Agreement constitutes the complete and entire understanding between the Parties and supersedes all prior oral or written agreements, representations, or understandings relating to the subject matter hereof.");

  p("11. SEVERABILITY", true);
  p("If any provision of this Agreement is determined to be invalid, illegal, or unenforceable, such provision shall be severed, and the remainder of this Agreement shall continue in full force and effect.");

  p("12. WAIVER", true);
  p("The failure of either Party to enforce any provision of this Agreement shall not be deemed a waiver of that provision or of any rights arising hereunder.");

  p("13. GOVERNING LAW", true);
  p("This Agreement shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law principles.");

  p("14. EXECUTION", true);
  p("IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date.");
  p(`Employer: ${u(v.employerName)}`, true);
  p(`Principal Office: ${u(v.employerPrincipalOffice)}`);
  p("Employee: ___________________________");
  uf("Name: ", v.employeeExecutionName);
  uf("Date: ", v.employeeExecutionDate);
  uf("Employee Signature: ", v.employeeSignature);
  if ((v.finalNotes || "").trim()) p(v.finalNotes);

  doc.save("employment_agreement.pdf");
};

export default function EmploymentAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Employment Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="employmentagreement"
      preserveStepLayout
    />
  );
}
