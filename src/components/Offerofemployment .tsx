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
  if (country === "United States") return [
    { value: "California", label: "California" }, { value: "New York", label: "New York" },
    { value: "Texas", label: "Texas" }, { value: "Florida", label: "Florida" },
    { value: "Other US State", label: "Other US State" },
  ];
  if (country === "Canada") return [
    { value: "Ontario", label: "Ontario" }, { value: "Quebec", label: "Quebec" },
    { value: "British Columbia", label: "British Columbia" }, { value: "Alberta", label: "Alberta" },
    { value: "Other Canadian Province", label: "Other Canadian Province" },
  ];
  if (country === "United Kingdom") return [
    { value: "England", label: "England" }, { value: "Scotland", label: "Scotland" },
    { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" },
  ];
  if (country === "Australia") return [
    { value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" },
    { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" },
    { value: "Other Australian State", label: "Other Australian State" },
  ];
  if (country === "Pakistan") return [
    { value: "Punjab", label: "Punjab" }, { value: "Sindh", label: "Sindh" },
    { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" },
    { value: "Balochistan", label: "Balochistan" },
    { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" },
  ];
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

// ─── PDF helpers ──────────────────────────────────────────────────────────────

const u = (val?: string, fallback = "____________________") =>
  val && val.trim() ? val.trim() : fallback;

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 16;
  const textW = pageW - margin * 2;
  const lineH = 5.4;
  const pageLimit = 283;
  let y = 18;

  // ── Layout helpers ──────────────────────────────────────────────────

  const checkY = (needed: number) => {
    if (y + needed > pageLimit) {
      doc.addPage();
      y = 18;
    }
  };

  // Plain body paragraph — normal or bold, optional indent
  const p = (text: string, bold = false, indent = 0, gapAfter = 2.5) => {
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + gapAfter);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + gapAfter;
  };

  // Bold ALL-CAPS section heading  e.g. "1. POSITION OFFER"
  const heading = (text: string) => {
    checkY(lineH + 7);
    y += 3;
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10.4);
  };

  // Sub-section with bold inline label  e.g. "4.1  Base Salary — body text"
  const sub = (num: string, title: string, body: string) => {
    checkY(lineH * 2);
    doc.setFontSize(10.4);
    // Measure bold prefix
    doc.setFont("times", "bold");
    const prefix = `${num}  ${title} \u2014 `;
    const prefixW = doc.getTextWidth(prefix);
    doc.text(prefix, margin, y);
    // Body wraps after prefix on first line, then indented
    doc.setFont("times", "normal");
    const bodyLines = doc.splitTextToSize(body, textW - prefixW);
    if (bodyLines[0]) doc.text(bodyLines[0], margin + prefixW, y);
    y += lineH;
    for (let i = 1; i < bodyLines.length; i++) {
      checkY(lineH + 1);
      doc.text(bodyLines[i], margin + 4, y);
      y += lineH;
    }
    y += 2.8;
  };

  // Bullet item with hanging indent
  const bullet = (text: string, indent = 6) => {
    doc.setFont("times", "normal");
    doc.setFontSize(10.4);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + 2.2);
    doc.text("\u2022", margin + 1.5, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 2.2;
  };

  // Header info row  e.g. "Date:  12/01/2025" — bold label then normal value
  const infoRow = (label: string, value: string) => {
    checkY(lineH + 2);
    doc.setFont("times", "bold");
    doc.setFontSize(10.4);
    const lbl = `${label}  `;
    doc.text(lbl, margin, y);
    doc.setFont("times", "normal");
    doc.text(u(value, ""), margin + doc.getTextWidth(lbl), y);
    y += lineH + 1.5;
  };

  // Signature field with underline
  const field = (label: string, value: string, lineLen = 65) => {
    checkY(lineH + 3);
    doc.setFont("times", "bold");
    doc.setFontSize(10.4);
    const lbl = `${label}: `;
    doc.text(lbl, margin, y);
    const lblW = doc.getTextWidth(lbl);
    doc.setFont("times", "normal");
    const val = value.trim();
    if (val) {
      doc.text(val, margin + lblW, y);
      doc.line(margin + lblW, y + 1.2, margin + lblW + Math.max(lineLen, doc.getTextWidth(val) + 2), y + 1.2);
    } else {
      doc.line(margin + lblW, y + 1.2, margin + lblW + lineLen, y + 1.2);
    }
    y += lineH + 2.5;
  };

  // ── TITLE ─────────────────────────────────────────────────────────────
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "OFFER OF EMPLOYMENT LETTER";
  doc.text(title, pageW / 2, y, { align: "center" });
  const halfTW = doc.getTextWidth(title) / 2;
  doc.line(pageW / 2 - halfTW, y + 1.3, pageW / 2 + halfTW, y + 1.3);
  y += 10;
  doc.setFontSize(10.4);

  // ── HEADER BLOCK ──────────────────────────────────────────────────────
  infoRow("Date:", u(v.letterDate, "[Insert Date]"));

  y += 1;
  p("To:", true, 0, 1);
  p(u(v.employeeName, "[Employee's Full Legal Name]"), false, 0, 1);
  p(u(v.employeeAddress, "[Employee's Address]"), false, 0, 1);
  p(
    `${u(v.employeeCity, "[City]")}, ${u(v.employeeState, "[State]")}, ${u(v.employeeZip, "[ZIP Code]")}`,
    false, 0, 3
  );

  p("From:", true, 0, 1);
  p(u(v.employerName, "[Employer's Full Legal Name]"), false, 0, 1);
  p(u(v.employerAddress, "[Employer's Address]"), false, 0, 1);
  p(
    `${u(v.employerCity, "[City]")}, ${u(v.employerState, "[State]")}, ${u(v.employerZip, "[ZIP Code]")}`,
    false, 0, 2
  );

  // Jurisdiction line
  const jurisdictionStr = [v.city, v.state, v.country].filter(Boolean).join(", ");
  if (jurisdictionStr.trim()) {
    infoRow("Jurisdiction:", jurisdictionStr);
  }

  y += 1;

  // ── 1. POSITION OFFER ─────────────────────────────────────────────────
  heading("1.  POSITION OFFER");

  p(
    `We are pleased to extend to you an offer of employment for the position of ${u(v.positionTitle, "[Position Title]")} with ${u(v.employerName, "[Employer's Name]")} ("Employer"), as discussed during our meeting on ${u(v.meetingDate, "[Date]")}.`
  );
  p(
    `Your acceptance of this offer constitutes your agreement to the terms, conditions, and obligations set forth in this letter, which shall remain binding until superseded by a formal written Employment Agreement.`
  );

  // ── 2. COMMENCEMENT OF EMPLOYMENT ─────────────────────────────────────
  heading("2.  COMMENCEMENT OF EMPLOYMENT");

  p(
    `Your anticipated start date will be ${u(v.startDate, "[Date]")}, or such other date as mutually agreed in writing. You will report directly to ${u(v.supervisorNameTitle, "[Supervisor's Name & Title]")}, or such other supervisor as the Employer may designate.`
  );

  // ── 3. JOB RESPONSIBILITIES ───────────────────────────────────────────
  heading("3.  JOB RESPONSIBILITIES");

  p(
    `You will perform all duties customarily associated with the position of ${u(v.positionTitle, "[Position Title]")}, along with such additional tasks as may reasonably be assigned from time to time. You are expected to discharge your responsibilities with diligence, integrity, and full compliance with all company policies, applicable laws, and professional standards.`
  );

  // ── 4. COMPENSATION ───────────────────────────────────────────────────
  heading("4.  COMPENSATION");

  sub(
    "4.1", "Base Salary",
    `You will receive a monthly salary of $${u(v.baseSalary, "[Amount]")}, payable in accordance with the Employer's standard payroll schedule and subject to all applicable withholdings and deductions.`
  );

  sub(
    "4.2", "Commission",
    `In addition to your base salary, you will be entitled to commissions calculated at ${u(v.commissionPercentage, "[Percentage]")}% of ${u(v.commissionBasis, "[Basis for Commission Calculation]")}, subject to adjustment in accordance with company policy.`
  );

  // ── 5. EXPENSE REIMBURSEMENT ──────────────────────────────────────────
  heading("5.  EXPENSE REIMBURSEMENT");

  p(
    `You will be reimbursed for reasonable, pre-approved out-of-pocket business expenses incurred in the course of performing your duties, provided that proper documentation is submitted in accordance with the Employer's expense reimbursement policy.`
  );

  // ── 6. BENEFITS AND LEAVE ─────────────────────────────────────────────
  heading("6.  BENEFITS AND LEAVE");

  sub(
    "6.1", "Benefits",
    `You will be eligible to participate in such health, retirement, and other benefit programs as the Employer may offer from time to time, subject to the applicable terms and eligibility requirements.`
  );

  sub(
    "6.2", "Vacation Leave",
    `You will be entitled to ${u(v.vacationDays, "[Number]")} days of paid vacation per calendar year.`
  );

  sub(
    "6.3", "Sick/Personal Leave",
    `You will be entitled to ${u(v.sickPersonalDays, "[Number]")} days of paid sick or personal leave per calendar year, subject to applicable law and company policy.`
  );

  // ── 7. EMPLOYMENT RELATIONSHIP ────────────────────────────────────────
  heading("7.  EMPLOYMENT RELATIONSHIP");

  p(
    `Your employment will be at-will, meaning that either you or the Employer may terminate the relationship at any time, with or without cause, and with or without notice, subject to applicable law.`
  );

  // ── 8. CONFIDENTIALITY AND INTELLECTUAL PROPERTY ─────────────────────
  heading("8.  CONFIDENTIALITY AND INTELLECTUAL PROPERTY");

  sub(
    "8.1", "Confidentiality",
    `You agree to maintain the confidentiality of all proprietary, trade secret, or confidential information belonging to the Employer, whether obtained before, during, or after your employment, and not to use or disclose such information except as authorized in writing by the Employer.`
  );

  sub(
    "8.2", "Intellectual Property",
    `Any inventions, designs, works of authorship, processes, or other intellectual property created by you in the scope of your employment, or using the Employer's resources, shall be the sole and exclusive property of the Employer. You agree to execute any documents necessary to vest such rights in the Employer.`
  );

  // ── 9. NON-COMPETE AND NON-SOLICITATION ───────────────────────────────
  heading("9.  NON-COMPETE AND NON-SOLICITATION");

  sub(
    "9.1", "Non-Compete",
    `During your employment and for a period of ${u(v.nonCompetePeriod, "[Time Period]")} following termination, you shall not, within ${u(v.nonCompeteArea, "[Geographic Area]")}, engage in or provide services to any business that is in direct competition with the Employer's business as conducted during your employment.`
  );

  sub(
    "9.2", "Non-Solicitation",
    `During your employment and for a period of ${u(v.nonSolicitPeriod, "[Time Period]")} following termination, you shall not solicit, divert, or attempt to induce any employee, contractor, or client of the Employer to terminate or alter their relationship with the Employer.`
  );

  // ── 10. CONDITIONS OF OFFER ───────────────────────────────────────────
  heading("10.  CONDITIONS OF OFFER");

  p("This offer is contingent upon:", false, 0, 2);
  bullet("Your written acceptance of this letter.");
  bullet(
    "Completion of all pre-employment requirements, including any background checks, reference verifications, or drug screening as may be required by the Employer."
  );

  // ── 11. NON-CONTRACTUAL NATURE ────────────────────────────────────────
  heading("11.  NON-CONTRACTUAL NATURE");

  p(
    `This letter is not intended to create a guarantee of continued employment for any specific duration, and the at-will nature of your employment shall remain in effect unless expressly modified by a subsequent written agreement signed by both parties.`
  );

  // ── 12. GOVERNING LAW ─────────────────────────────────────────────────
  heading("12.  GOVERNING LAW");

  p(
    `This letter shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState, "[State]")}, without regard to its conflict of laws principles.`
  );

  // ── 13. ACCEPTANCE OF OFFER ───────────────────────────────────────────
  heading("13.  ACCEPTANCE OF OFFER");

  p(
    `If you accept this offer, please sign and return a copy of this letter by ${u(v.acceptanceDeadline, "[Deadline Date]")}.`
  );
  p(
    `We look forward to working with you and are confident that your skills and dedication will be valuable assets to our team.`
  );

  // ── EMPLOYER SIGNATURE BLOCK ──────────────────────────────────────────
  checkY(lineH + 6);
  y += 3;
  p("Sincerely,", true, 0, 4);

  field("Employer's Name", u(v.employerSignerName, ""));
  field("Title", u(v.employerSignerTitle, ""));
  field("Signature", u(v.employerSignature, ""));
  field("Date", u(v.employerSignDate, ""));

  // ── ACKNOWLEDGEMENT BLOCK ─────────────────────────────────────────────
  y += 3;
  checkY(lineH * 6);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("Acknowledgement and Acceptance:", margin, y);
  y += lineH + 3;
  doc.setFontSize(10.4);

  p(
    `I, ${u(v.employeeSignerName, "[Employee's Name]")}, acknowledge that I have read and understood the terms of this Offer of Employment and agree to be bound by them.`,
    false, 0, 4
  );

  field("Employee Signature", u(v.employeeSignature, ""));
  field("Date", u(v.employeeSignDate, ""));

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