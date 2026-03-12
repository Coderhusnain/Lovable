import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "province", label: "Province / Region", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "agreementDate", label: "Agreement date", type: "date", required: true },
    { name: "companyName", label: "Company legal name", type: "text", required: true },
    { name: "companyState", label: "Company formation state", type: "text", required: true },
    { name: "companyAddress", label: "Company principal address", type: "text", required: true },
    { name: "employeeName", label: "Employee legal name", type: "text", required: true },
    { name: "employeeAddress", label: "Employee address", type: "text", required: true },
  ]},
  { label: "Term and Schedule", fields: [
    { name: "startDate", label: "Term start date", type: "date", required: true },
    { name: "endDate", label: "Term end date", type: "date", required: true },
    { name: "startTime", label: "Work start time", type: "text", required: true },
    { name: "endTime", label: "Work end time", type: "text", required: true },
    { name: "workDays", label: "Work days", type: "text", required: true },
    { name: "formalReviewText", label: "Formal review term-end text", type: "text", required: true },
  ]},
  { label: "Performance and Compliance", fields: [
    { name: "supervisorNameTitle", label: "Supervisor name/title", type: "text", required: true },
    { name: "performanceStandards", label: "Performance standards text", type: "textarea", required: true },
    { name: "recordsConfidentiality", label: "Records/confidentiality clause", type: "textarea", required: true },
    { name: "overtimeRules", label: "Overtime rules", type: "textarea", required: true },
  ]},
  { label: "Equipment and Liability", fields: [
    { name: "equipmentList", label: "Company-provided equipment", type: "textarea", required: true },
    { name: "liabilityIndemnification", label: "Liability and indemnification clause", type: "textarea", required: true },
    { name: "expenseReimbursement", label: "Expense reimbursement clause", type: "text", required: true },
    { name: "workersComp", label: "Workers compensation clause", type: "text", required: true },
  ]},
  { label: "Termination and Legal", fields: [
    { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
    { name: "attorneysFees", label: "Attorneys' fees clause", type: "text", required: true },
    { name: "entireAgreement", label: "Entire agreement clause", type: "text", required: true },
    { name: "amendmentClause", label: "Amendment in writing clause", type: "text", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "employerSignName", label: "Employer signatory name", type: "text", required: true },
    { name: "employerTitle", label: "Employer signatory title", type: "text", required: true },
    { name: "employerSignature", label: "Employer signature", type: "text", required: true },
    { name: "employerDate", label: "Employer date", type: "date", required: true },
    { name: "employeeSignature", label: "Employee signature", type: "text", required: true },
    { name: "employeeDate", label: "Employee date", type: "date", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF();
  const left = 20;
  const width = 170;
  let y = 20;
  const u = (s?: string, n = 24) => (s && s.trim() ? s.trim() : "_".repeat(n));
  const add = (t: string, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(t, width);
    if (y + lines.length * 6 > 280) { doc.addPage(); y = 20; }
    doc.text(lines, left, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "WORK FROM HOME AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  add(`Jurisdiction: Country ${u(v.country, 12)}, State ${u(v.state, 12)}, Province ${u(v.province, 12)}, City ${u(v.city, 12)}.`);

  add(`This Work From Home Agreement ("Agreement") is made and entered into on ${u(v.agreementDate)}, by and between ${u(v.companyName)}, a ${u(v.companyState)} corporation having principal place of business at ${u(v.companyAddress)} ("Company" or "Employer"), and ${u(v.employeeName)}, residing at ${u(v.employeeAddress)} ("Employee").`);
  add("RECITALS", true);
  add("WHEREAS, Company has established a Telecommuting Program with policies/procedures/performance standards; WHEREAS, Employee voluntarily agrees to participate and comply; WHEREAS, Company concurs subject to terms below.");
  add("1. TERM AND DURATION", true);
  add(`1.1 Agreement commences on ${u(v.startDate)} and continues until ${u(v.endDate)}, unless earlier terminated in accordance with Section 14 (Termination).`);
  add(`1.2 ${u(v.formalReviewText)}`);
  add("2. WORK SCHEDULE", true);
  add(`Employee shall perform services from ${u(v.startTime)} to ${u(v.endTime)}, ${u(v.workDays)}, unless otherwise modified in writing by mutual consent.`);
  add("3. COMPENSATION, ATTENDANCE, AND LEAVE", true);
  add("3.1 Pay/leave/travel allowances are based on primary business location as if on-site.");
  add("3.2 Time and attendance shall be recorded as official duty at primary business location.");
  add("3.3 Prior approval is required for leave per Company policies.");
  add("4. WORK ASSIGNMENTS AND PERFORMANCE", true);
  add(`4.1 Employee shall meet with ${u(v.supervisorNameTitle)} as necessary for assignments and updates.`);
  add(`4.2-4.3 ${u(v.performanceStandards)}`);
  add("5. RECORDS MANAGEMENT AND CONFIDENTIALITY", true);
  add(u(v.recordsConfidentiality));
  add("6. OVERTIME", true);
  add(u(v.overtimeRules));
  add("7. EQUIPMENT AND PROPERTY", true);
  add(`7.1 Company equipment: ${u(v.equipmentList)}.`);
  add("7.2-7.4 Company-owned equipment remains Company property; personally owned equipment maintenance is Employee responsibility; additional equipment requires written approval.");
  add("8. LIABILITY AND INDEMNIFICATION", true);
  add(u(v.liabilityIndemnification));
  add("9. REIMBURSEMENT OF EXPENSES", true);
  add(u(v.expenseReimbursement));
  add("10. WORKERS' COMPENSATION COVERAGE", true);
  add(u(v.workersComp));
  add("11. TERMINATION", true);
  add(`Either party may terminate with or without cause upon ${u(v.terminationNoticeDays, 3)} days written notice.`);
  add("12. GOVERNING LAW", true);
  add(`This Agreement is governed by laws of the State of ${u(v.state)}${v.province ? ` / Province ${u(v.province)}` : ""}.`);
  add("13. ATTORNEY FEES", true);
  add(u(v.attorneysFees));
  add("14. ENTIRE AGREEMENT", true);
  add(u(v.entireAgreement));
  add(u(v.amendmentClause));
  add("EXECUTION", true);
  add(`EMPLOYER Name: ${u(v.employerSignName)} | Title: ${u(v.employerTitle)} | Signature: ${u(v.employerSignature)} | Date: ${u(v.employerDate)}`);
  add(`EMPLOYEE Name: ${u(v.employeeName)} | Signature: ${u(v.employeeSignature)} | Date: ${u(v.employeeDate)}`);

  doc.save("work_from_home_agreement.pdf");
};

export default function WorkFromHome() {
  return (
    <FormWizard
      steps={steps}
      title="Work From Home Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="workfromhome"
    />
  );
}

