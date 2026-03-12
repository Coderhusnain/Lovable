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
    label: "Company and Effective Date",
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "companyAddress", label: "Company Address", type: "textarea", required: true },
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true },
    ],
  },
  {
    label: "Introduction",
    fields: [
      { name: "fullTimeHours", label: "Full-Time Hours Per Week", type: "text", required: true, placeholder: "number" },
      { name: "partTimeHours", label: "Part-Time Hours Per Week (fewer than)", type: "text", required: true, placeholder: "number" },
      { name: "introductoryDays", label: "Introductory/Probationary Period (days)", type: "text", required: true, placeholder: "number" },
    ],
  },
  {
    label: "Employment Policies",
    fields: [
      { name: "policyNotes", label: "Employment policy notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Hours and Conduct",
    fields: [
      { name: "hoursConductNotes", label: "Hours and conduct notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Benefits and Leave",
    fields: [
      { name: "benefitsLeaveNotes", label: "Benefits and leave notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Acknowledgement",
    fields: [
      { name: "employeeSignature", label: "Employee Signature", type: "text", required: true },
      { name: "employeeSignDate", label: "Acknowledgement Date", type: "date", required: true },
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
  const lh = 5.2;
  let y = 18;

  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.35);
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
  const title = "EMPLOYEE HANDBOOK";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 9;

  p(u(v.companyName), true);
  p(u(v.companyAddress));
  uf("Effective Date: ", v.effectiveDate);
  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);

  p("Section 1 - Introduction", true);
  p("Welcome", true);
  p(`Welcome to ${u(v.companyName)} ("the Company"). We are pleased to have you join our team and contribute to our shared mission and values. This Handbook is intended to provide you with important information regarding the Company's policies, procedures, benefits, and expectations.`);
  p("Purpose of the Handbook", true);
  p(`This Employee Handbook ("Handbook") serves as a general guide to the Company's workplace rules, policies, and employee benefits. It applies to all employees of the Company, regardless of position, unless otherwise stated. Compliance with the policies set forth herein is a condition of continued employment.`);
  p("This Handbook supersedes and replaces all prior oral or written policies, procedures, rules, or benefits previously communicated to employees, whether formal or informal, express or implied.");
  p("The Company reserves the sole and absolute discretion to amend, modify, rescind, delete, or supplement any provision of this Handbook at any time, with or without notice, except for the policy of employment-at-will, which may only be modified in a written agreement signed by both the employee and an authorized representative of the Company.");
  p("This Handbook is not an express or implied contract of employment. Nothing contained herein shall alter the at-will employment relationship or create any contractual rights to continued employment.");
  p("Changes in Policy", true);
  p("Due to the evolving nature of our business, the Company expressly reserves the right to revise, modify, or eliminate any policies, procedures, work rules, or benefits described in this Handbook. Only the Chief Executive Officer or an authorized executive officer may approve changes to the at-will employment status, and such changes must be documented in a signed written agreement.");
  p("Employment-At-Will", true);
  p("Employment with the Company is on an at-will basis unless otherwise expressly provided in a duly executed written employment agreement. This means that either the employee or the Company may terminate the employment relationship at any time, with or without cause, and with or without notice, subject only to applicable federal, state, and local laws.");

  p("Section 2 - Employment Policies", true);
  p("Employee Classifications", true);
  p("For purposes of compensation, benefits, and compliance with wage and hour laws, employees are classified as follows:");
  p("1. Exempt Employees - Those whose positions meet the requirements of the Fair Labor Standards Act (FLSA) and applicable state law for exemption from overtime.");
  p("2. Non-Exempt Employees - Those whose positions do not meet exemption criteria and who are therefore entitled to overtime pay in accordance with applicable law.");
  p(`3. Full-Time Employees - Employees regularly scheduled to work ${u(v.fullTimeHours, 2)} or more hours per week.`);
  p(`4. Part-Time Employees - Employees regularly scheduled to work fewer than ${u(v.partTimeHours, 2)} hours per week.`);
  p("5. Temporary Employees - Employees engaged for a fixed term or specific project with no guarantee of continued employment.");
  p("6. Independent Contractors/Consultants - Individuals retained under contract to perform services and who are not employees of the Company.");
  p("Equal Employment Opportunity (EEO) and ADA Compliance", true);
  p("The Company is committed to providing equal employment opportunities to all qualified individuals and prohibits discrimination based on race, color, religion, sex, sexual orientation, gender identity or expression, age, national origin, disability, veteran status, or any other protected category under federal, state, or local law.");
  p("The Company will provide reasonable accommodations to qualified individuals with disabilities in accordance with the Americans with Disabilities Act (ADA) and applicable state law, unless such accommodations would impose an undue hardship on the Company.");
  p("Confidentiality", true);
  p("Employees may be entrusted with confidential, proprietary, or trade secret information belonging to the Company. Employees are prohibited from using or disclosing such information except as required in the performance of their duties or as authorized in writing by the Company. This obligation continues after employment ends.");
  p("Employment of Minors", true);
  p("The Company complies with all applicable child labor laws, including those under the FLSA, and will not employ individuals under the legal minimum working age.");
  p("Employment of Relatives", true);
  p("The Company may restrict or prohibit the employment of immediate family members in circumstances where it may present a conflict of interest, create supervisory/subordinate relationships, or otherwise disrupt business operations.");
  p("Introductory Period", true);
  p(`The first ${u(v.introductoryDays, 2)} days of employment constitute an introductory or probationary period, during which performance and suitability for continued employment will be evaluated.`);
  p("Personnel Records and Employee References", true);
  p("Personnel files are the property of the Company. Employees may review their own records in accordance with applicable law. Only authorized personnel may provide employment references.");
  p("Privacy", true);
  p("While the Company respects employee privacy, employees should have no expectation of privacy in any Company property, including offices, desks, lockers, vehicles, or electronic systems.");
  p("Immigration Law Compliance", true);
  p("In accordance with the Immigration Reform and Control Act, all employees must complete the Form I-9 and provide documentation verifying their eligibility to work in the United States.");
  p("Political Neutrality", true);
  p("Employees may engage in lawful political activities outside of work but may not use Company resources, time, or branding for political purposes.");
  if ((v.policyNotes || "").trim()) p(v.policyNotes);

  p("Section 3 - Hours of Work and Payroll Practices", true);
  p("- Pay Periods & Paydays - Employees are paid on a bi-weekly schedule unless otherwise specified.");
  p("- Overtime - Non-exempt employees are entitled to overtime pay for hours worked over 40 in a workweek, or as otherwise provided by state law.");
  p("- Rest & Meal Periods - Provided in accordance with applicable federal and state law.");
  p("- Timekeeping - Accurate recording of hours worked is mandatory. Falsifying time records is grounds for immediate termination.");
  p("- Payroll Deductions - Deductions will be made for taxes, insurance premiums, retirement contributions, and other authorized purposes.");
  p("- Wage Garnishment - The Company will comply with court-ordered wage garnishments.");
  p("- Direct Deposit - Direct deposit is encouraged but optional, unless otherwise required by law.");

  p("Section 4 - Standards of Conduct and Employee Performance", true);
  p("- Anti-Harassment & Discrimination - Strictly prohibited; employees must report violations promptly.");
  p("- Attendance - Reliable attendance is essential; excessive absenteeism may result in discipline.");
  p("- Dress Code - Employees must dress appropriately for their position, with consideration for safety and professionalism.");
  p("- Pet Policy - Only registered service animals are permitted; advance notice to a supervisor is required.");
  p("- Safety - Compliance with OSHA and other safety regulations is mandatory.");
  p("- Substance Abuse - Possession or use of illegal drugs on Company property is prohibited. Alcohol permitted only at approved events.");
  p("- Workplace Searches - The Company reserves the right to search any property on its premises.");
  p("- Internet, Email, and Computer Use - Company technology is for business use only; personal use is restricted.");
  p("- Cell Phone Use - Personal calls should be limited to break times; must not interfere with work.");
  if ((v.hoursConductNotes || "").trim()) p(v.hoursConductNotes);

  p("Section 5 - Benefits and Services", true);
  p("- Workers' Compensation - Provided in accordance with law.");
  p("- Social Security (FICA) - Employer and employee contributions as required.");
  p("- Unemployment Insurance - Provided as required by law.");

  p("Section 6 - Leaves of Absence and Time Off", true);
  p("- Family & Medical Leave - Granted as required by applicable law; the Company may voluntarily approve unpaid leave requests.");
  p("- Workers' Compensation Leave - Available in cases of job-related injury.");
  p("- Jury Duty - Paid or unpaid leave as required by law; employees must notify management immediately upon receipt of a summons.");
  if ((v.benefitsLeaveNotes || "").trim()) p(v.benefitsLeaveNotes);

  p("Acknowledgement", true);
  p("I acknowledge that I have received and read the Employee Handbook, understand its provisions, and agree to comply with all policies contained herein.");
  uf("Employee Signature: ", v.employeeSignature);
  uf("Date: ", v.employeeSignDate);
  if ((v.finalNotes || "").trim()) p(v.finalNotes);

  doc.save("employee_handbook.pdf");
};

export default function EmployeeHandbook() {
  return (
    <FormWizard
      steps={steps}
      title="Employee Handbook"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="employeehandbook"
      preserveStepLayout
    />
  );
}
