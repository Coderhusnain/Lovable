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
    label: "Effective Date and Jurisdiction",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true },
    ],
  },
  {
    label: "Parties and Recitals",
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "companyJurisdiction", label: "Company Jurisdiction", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "companyAddress", label: "Company Principal Place of Business", type: "textarea", required: true },
      { name: "employeeName", label: "Employee Name", type: "text", required: true },
      { name: "employeeAddress", label: "Employee Address", type: "textarea", required: true },
      { name: "positionTitle", label: "Position Title", type: "text", required: true },
      { name: "retirementDate", label: "Retirement Date", type: "date", required: true },
    ],
  },
  {
    label: "Employment and Severance",
    fields: [
      { name: "baseSalaryMonthly", label: "Current Base Salary Per Month", type: "text", required: true, placeholder: "Amount" },
      { name: "retroactiveAdjustmentsDate", label: "Retroactive Adjustments Payment Date", type: "date", required: true },
      { name: "severanceYears", label: "Severance Period (Years)", type: "text", required: true, placeholder: "Number" },
      { name: "aggregateSalaryYears", label: "Aggregate Salary Equivalent (Years)", type: "text", required: true, placeholder: "Number" },
      { name: "cobraMonths", label: "Maximum COBRA Reimbursement Months", type: "text", required: true, placeholder: "Number" },
    ],
  },
  {
    label: "Covenants and Remedies",
    fields: [
      { name: "covenantNotes", label: "Covenant notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Claims and Property Return",
    fields: [
      { name: "releaseNotes", label: "Release notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Legal Clauses",
    fields: [
      { name: "governingLawJurisdiction", label: "Governing Law Jurisdiction", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "legalNotes", label: "Additional legal notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "employeeSignature", label: "Employee Signature", type: "text", required: true },
      { name: "employeeSignDate", label: "Employee Signature Date", type: "date", required: true },
      { name: "employerSignature", label: "Employer Signature", type: "text", required: true },
      { name: "employerSignDate", label: "Employer Signature Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
  const lh = 5.25;
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
  const title = "EMPLOYEE RETIREMENT AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  uf("Effective Date: ", v.effectiveDate);

  p(`This Employee Retirement Agreement ("Agreement") is made and entered into as of ${u(v.effectiveDate, 12)}, by and between ${u(v.companyName)}, a corporation duly organized and existing under the laws of ${u(v.companyJurisdiction)}, having its principal place of business at ${u(v.companyAddress)} (hereinafter referred to as the "Company"), and ${u(v.employeeName)}, residing at ${u(v.employeeAddress)} (hereinafter referred to as the "Employee"). The Company and the Employee may hereinafter be referred to collectively as the "Parties" and individually as a "Party."`);

  p("RECITALS", true);
  p(`WHEREAS, the Employee has rendered valuable service to the Company in various capacities during their tenure and is presently employed in the position of ${u(v.positionTitle)};`);
  p(`WHEREAS, the Parties have mutually agreed that it is in their respective best interests for the Employee to retire from employment with the Company, effective ${u(v.retirementDate, 12)};`);
  p("WHEREAS, the Parties wish to formally set forth the terms and conditions governing the Employee's retirement and the cessation of their employment with the Company;");
  p("NOW, THEREFORE, in consideration of the mutual promises, covenants, and undertakings contained herein, and intending to be legally bound, the Parties agree as follows:");

  p("1. Retirement", true);
  p(`The Employee shall voluntarily retire from and thereby terminate their employment with the Company, effective ${u(v.retirementDate, 12)} (the "Retirement Date"). As of the Retirement Date, the Employee's employment and all rights to compensation, remuneration, and benefits under the Company's benefit plans shall cease, except as expressly provided in this Agreement or required by applicable law.`);

  p("2. Employment Prior to Retirement Date", true);
  p(`Until the Retirement Date, the Employee shall remain employed in the position of ${u(v.positionTitle)} and shall continue to receive their current base salary in the amount of $${u(v.baseSalaryMonthly)} per month, together with all existing employment benefits. Any retroactive adjustments to base salary shall be paid to the Employee on or before ${u(v.retroactiveAdjustmentsDate, 12)}.`);

  p("3. Severance Benefits", true);
  p(`Commencing on the Retirement Date and continuing for a period of ${u(v.severanceYears, 2)} years, the Company shall pay the Employee, in accordance with its normal payroll schedule, an amount equal in the aggregate to ${u(v.aggregateSalaryYears, 2)} years of the Employee's base salary as in effect immediately prior to the Retirement Date.`);
  p(`In addition, the Company shall reimburse the Employee for the cost of continuing medical and dental insurance coverage for the Employee and any eligible dependents under the Consolidated Omnibus Budget Reconciliation Act of 1985 ("COBRA"), for the duration of the Employee's COBRA eligibility, but in no event beyond ${u(v.cobraMonths, 2)} months from the Retirement Date.`);

  p("4. No Mitigation", true);
  p("The severance benefits provided herein shall not be subject to mitigation or reduction on account of the Employee's acceptance of other employment or engagement in any other business following retirement, unless otherwise expressly agreed in writing by the Parties.");

  p("5. Employee Covenants", true);
  p("(a) Confidentiality and Non-Disclosure - The Employee shall not, during or after employment, disclose any confidential or proprietary information of the Company, except as required in the performance of duties or by law, without the Company's prior written consent.");
  p("(b) Non-Solicitation - For a period of one (1) year following the Retirement Date, the Employee shall not, directly or indirectly, solicit or induce any employee, customer, or supplier of the Company to terminate or alter their relationship with the Company.");
  p("(c) Non-Competition - For a period of one (1) year following the Retirement Date, the Employee shall not, without the Company's prior written consent, engage in any business that competes directly with the Company.");
  if ((v.covenantNotes || "").trim()) p(v.covenantNotes);

  p("6. Remedies", true);
  p("Any breach of the covenants contained herein shall entitle the Company to equitable relief, including but not limited to injunctive relief, in addition to any other remedies available at law or in equity.");

  p("7. Cooperation and Non-Disparagement", true);
  p("The Employee shall reasonably cooperate with the Company in any legal, regulatory, or business matters in which the Employee's prior knowledge may be relevant. Neither Party shall make any disparaging or defamatory statements about the other.");

  p("8. Release of Claims", true);
  p("(a) By Employee - In consideration of the benefits provided herein, the Employee hereby releases and forever discharges the Company and its affiliates from any and all claims, demands, and liabilities arising out of or in connection with their employment or the termination thereof.");
  p("(b) By Company - The Company releases the Employee from any claims it may have, except for those expressly preserved herein.");
  if ((v.releaseNotes || "").trim()) p(v.releaseNotes);

  p("9. Return of Property", true);
  p("On or before the Retirement Date, the Employee shall return all Company property in their possession, including but not limited to documents, records, computers, keys, and security devices.");

  p("10. Confidentiality of Agreement", true);
  p("The terms of this Agreement shall remain confidential and shall not be disclosed by either Party, except to legal, financial, or governmental advisors, or to immediate family members who agree to maintain confidentiality.");

  p("11. Governing Law", true);
  p(`This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${u(v.governingLawJurisdiction)}, without regard to conflict of laws principles.`);

  p("12. Entire Agreement", true);
  p("This Agreement contains the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, or representations, whether written or oral.");

  p("13. Amendments", true);
  p("This Agreement may be amended only by a written instrument signed by both Parties.");

  p("14. Counterparts", true);
  p("This Agreement may be executed in multiple counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument.");
  if ((v.legalNotes || "").trim()) p(v.legalNotes);

  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", true);
  uf("The Employee: ", v.employeeSignature);
  uf("Employee Date: ", v.employeeSignDate);
  uf("The Employer: ", v.employerSignature);
  uf("Employer Date: ", v.employerSignDate);

  doc.save("employee_retirement_agreement.pdf");
};

export default function EmployeeRetirement() {
  return (
    <FormWizard
      steps={steps}
      title="Employee Retirement Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="employeeretirement"
      preserveStepLayout
    />
  );
}
