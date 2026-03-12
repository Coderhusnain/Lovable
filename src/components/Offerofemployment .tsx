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
  if (country === "United States") return [{ value: "California", label: "California" }, { value: "New York", label: "New York" }, { value: "Texas", label: "Texas" }, { value: "Florida", label: "Florida" }, { value: "Other US State", label: "Other US State" }];
  if (country === "Canada") return [{ value: "Ontario", label: "Ontario" }, { value: "Quebec", label: "Quebec" }, { value: "British Columbia", label: "British Columbia" }, { value: "Alberta", label: "Alberta" }, { value: "Other Canadian Province", label: "Other Canadian Province" }];
  if (country === "United Kingdom") return [{ value: "England", label: "England" }, { value: "Scotland", label: "Scotland" }, { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" }];
  if (country === "Australia") return [{ value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" }, { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" }, { value: "Other Australian State", label: "Other Australian State" }];
  if (country === "Pakistan") return [{ value: "Punjab", label: "Punjab" }, { value: "Sindh", label: "Sindh" }, { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" }, { value: "Balochistan", label: "Balochistan" }, { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" }];
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Date and Jurisdiction",
    fields: [
      { name: "letterDate", label: "Letter Date", type: "date", required: true },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true },
      { name: "governingLawState", label: "Governing Law State", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
    ],
  },
  {
    label: "Employee Details",
    fields: [
      { name: "employeeName", label: "Employee Full Legal Name", type: "text", required: true },
      { name: "employeeAddress", label: "Employee Address", type: "textarea", required: true },
      { name: "employeeCity", label: "Employee City", type: "text", required: true },
      { name: "employeeState", label: "Employee State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "employeeZip", label: "Employee ZIP/Postal Code", type: "text", required: true },
    ],
  },
  {
    label: "Employer and Position",
    fields: [
      { name: "employerName", label: "Employer Full Legal Name", type: "text", required: true },
      { name: "employerAddress", label: "Employer Address", type: "textarea", required: true },
      { name: "employerCity", label: "Employer City", type: "text", required: true },
      { name: "employerState", label: "Employer State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "employerZip", label: "Employer ZIP/Postal Code", type: "text", required: true },
      { name: "positionTitle", label: "Position Title", type: "text", required: true },
      { name: "meetingDate", label: "Meeting Date", type: "date", required: true },
      { name: "startDate", label: "Anticipated Start Date", type: "date", required: true },
      { name: "supervisorNameTitle", label: "Supervisor Name and Title", type: "text", required: true },
    ],
  },
  {
    label: "Compensation and Expenses",
    fields: [
      { name: "baseSalary", label: "Monthly Base Salary Amount", type: "text", required: true },
      { name: "commissionPercentage", label: "Commission Percentage", type: "text", required: true },
      { name: "commissionBasis", label: "Basis for Commission Calculation", type: "text", required: true },
    ],
  },
  {
    label: "Benefits and Restrictions",
    fields: [
      { name: "vacationDays", label: "Paid Vacation Days per Year", type: "text", required: true },
      { name: "sickPersonalDays", label: "Paid Sick/Personal Days per Year", type: "text", required: true },
      { name: "nonCompetePeriod", label: "Non-Compete Time Period", type: "text", required: true },
      { name: "nonCompeteArea", label: "Non-Compete Geographic Area", type: "text", required: true },
      { name: "nonSolicitPeriod", label: "Non-Solicitation Time Period", type: "text", required: true },
    ],
  },
  {
    label: "Conditions and Acceptance",
    fields: [
      { name: "acceptanceDeadline", label: "Acceptance Deadline Date", type: "date", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "employerSignerName", label: "Employer Signatory Name", type: "text", required: true },
      { name: "employerSignerTitle", label: "Employer Signatory Title", type: "text", required: true },
      { name: "employerSignature", label: "Employer Signature", type: "text", required: true },
      { name: "employerSignDate", label: "Employer Signature Date", type: "date", required: true },
      { name: "employeeSignerName", label: "Employee Name for Acknowledgement", type: "text", required: true },
      { name: "employeeSignature", label: "Employee Signature", type: "text", required: true },
      { name: "employeeSignDate", label: "Employee Signature Date", type: "date", required: true },
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
  const title = "OFFER OF EMPLOYMENT LETTER";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 9;

  uf("Date: ", v.letterDate);
  p("To:", true);
  p(u(v.employeeName));
  p(u(v.employeeAddress));
  p(`${u(v.employeeCity)}, ${u(v.employeeState)}, ${u(v.employeeZip)}`);
  p("From:", true);
  p(u(v.employerName));
  p(u(v.employerAddress));
  p(`${u(v.employerCity)}, ${u(v.employerState)}, ${u(v.employerZip)}`);
  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);

  p("1. POSITION OFFER", true);
  p(`We are pleased to extend to you an offer of employment for the position of ${u(v.positionTitle)} with ${u(v.employerName)} ("Employer"), as discussed during our meeting on ${u(v.meetingDate, 12)}.`);
  p("Your acceptance of this offer constitutes your agreement to the terms, conditions, and obligations set forth in this letter, which shall remain binding until superseded by a formal written Employment Agreement.");

  p("2. COMMENCEMENT OF EMPLOYMENT", true);
  p(`Your anticipated start date will be ${u(v.startDate, 12)}, or such other date as mutually agreed in writing. You will report directly to ${u(v.supervisorNameTitle)}, or such other supervisor as the Employer may designate.`);

  p("3. JOB RESPONSIBILITIES", true);
  p(`You will perform all duties customarily associated with the position of ${u(v.positionTitle)}, along with such additional tasks as may reasonably be assigned from time to time. You are expected to discharge your responsibilities with diligence, integrity, and full compliance with all company policies, applicable laws, and professional standards.`);

  p("4. COMPENSATION", true);
  p(`4.1 Base Salary - You will receive monthly salary of $${u(v.baseSalary)}, payable in accordance with the Employer's standard payroll schedule and subject to all applicable withholdings and deductions.`);
  p(`4.2 Commission - In addition to your base salary, you will be entitled to commissions calculated at ${u(v.commissionPercentage, 2)}% of ${u(v.commissionBasis)}, subject to adjustment in accordance with company policy.`);

  p("5. EXPENSE REIMBURSEMENT", true);
  p("You will be reimbursed for reasonable, pre-approved out-of-pocket business expenses incurred in the course of performing your duties, provided that proper documentation is submitted in accordance with the Employer's expense reimbursement policy.");

  p("6. BENEFITS AND LEAVE", true);
  p("6.1 Benefits - You will be eligible to participate in such health, retirement, and other benefit programs as the Employer may offer from time to time, subject to the applicable terms and eligibility requirements.");
  p(`6.2 Vacation Leave - You will be entitled to ${u(v.vacationDays, 2)} days of paid vacation per calendar year.`);
  p(`6.3 Sick/Personal Leave - You will be entitled to ${u(v.sickPersonalDays, 2)} days of paid sick or personal leave per calendar year, subject to applicable law and company policy.`);

  p("7. EMPLOYMENT RELATIONSHIP", true);
  p("Your employment will be at-will, meaning that either you or the Employer may terminate the relationship at any time, with or without cause, and with or without notice, subject to applicable law.");

  p("8. CONFIDENTIALITY AND INTELLECTUAL PROPERTY", true);
  p("8.1 Confidentiality - You agree to maintain the confidentiality of all proprietary, trade secret, or confidential information belonging to the Employer, whether obtained before, during, or after your employment, and not to use or disclose such information except as authorized in writing by the Employer.");
  p("8.2 Intellectual Property - Any inventions, designs, works of authorship, processes, or other intellectual property created by you in the scope of your employment, or using the Employer's resources, shall be the sole and exclusive property of the Employer. You agree to execute any documents necessary to vest such rights in the Employer.");

  p("9. NON-COMPETE AND NON-SOLICITATION", true);
  p(`9.1 Non-Compete - During your employment and for a period of ${u(v.nonCompetePeriod)} following termination, you shall not, within ${u(v.nonCompeteArea)}, engage in or provide services to any business that is in direct competition with the Employer's business as conducted during your employment.`);
  p(`9.2 Non-Solicitation - During your employment and for a period of ${u(v.nonSolicitPeriod)} following termination, you shall not solicit, divert, or attempt to induce any employee, contractor, or client of the Employer to terminate or alter their relationship with the Employer.`);

  p("10. CONDITIONS OF OFFER", true);
  p("This offer is contingent upon:");
  p("- Your written acceptance of this letter.");
  p("- Completion of all pre-employment requirements, including any background checks, reference verifications, or drug screening as may be required by the Employer.");

  p("11. NON-CONTRACTUAL NATURE", true);
  p("This letter is not intended to create a guarantee of continued employment for any specific duration, and the at-will nature of your employment shall remain in effect unless expressly modified by a subsequent written agreement signed by both parties.");

  p("12. GOVERNING LAW", true);
  p(`This letter shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState)}, without regard to its conflict of laws principles.`);

  p("13. ACCEPTANCE OF OFFER", true);
  p(`If you accept this offer, please sign and return a copy of this letter by ${u(v.acceptanceDeadline, 12)}.`);
  p("We look forward to working with you and are confident that your skills and dedication will be valuable assets to our team.");

  p("Sincerely,", true);
  uf("Employer's Name: ", v.employerSignerName);
  uf("Title: ", v.employerSignerTitle);
  uf("Signature: ", v.employerSignature);
  uf("Date: ", v.employerSignDate);

  p("Acknowledgement and Acceptance:", true);
  p(`I, ${u(v.employeeSignerName)}, acknowledge that I have read and understood the terms of this Offer of Employment and agree to be bound by them.`);
  uf("Employee Signature: ", v.employeeSignature);
  uf("Date: ", v.employeeSignDate);

  doc.save("offer_of_employment_letter.pdf");
};

export default function OfferOfEmployment() {
  return (
    <FormWizard
      steps={steps}
      title="Offer Of Employment Letter"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="offerofemployment"
      preserveStepLayout
    />
  );
}
