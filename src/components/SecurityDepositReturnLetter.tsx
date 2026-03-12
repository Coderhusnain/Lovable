import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Tenant and Lease",
    fields: [
      { name: "tenantName", label: "Tenant Name", type: "text", required: true },
      { name: "leaseDate", label: "Lease Date", type: "date", required: true },
      { name: "premisesAddress", label: "Premises Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 2: Deposit Information",
    fields: [
      { name: "depositPaidDate", label: "Deposit Paid Date", type: "date", required: true },
      { name: "depositAmount", label: "Security Deposit Amount", type: "text", required: true },
      { name: "inspectionDate", label: "Inspection Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 3: Deductions",
    fields: [
      { name: "deductionReason", label: "Reason for Deduction", type: "textarea", required: true },
      { name: "deductionAmount", label: "Deduction Amount", type: "text", required: true },
      { name: "remainingBalance", label: "Remaining Balance", type: "text", required: true },
    ],
  },
  {
    label: "Step 4: Dispute Terms",
    fields: [
      { name: "objectionDays", label: "Objection Period (Days)", type: "text", required: true },
      { name: "senderAddress", label: "Sender Mailing Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 5: Sender Identity",
    fields: [
      { name: "senderName", label: "Sender Printed Name", type: "text", required: true },
      { name: "senderTitle", label: "Sender Title/Role", type: "text", required: false },
      { name: "letterDate", label: "Letter Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 6: Return Option",
    fields: [
      {
        name: "returnOption",
        label: "Return Option",
        type: "select",
        required: true,
        options: [
          { value: "enclosed", label: "Balance enclosed with this letter" },
          { value: "none", label: "No balance remains to be returned" },
        ],
      },
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
  const u = (val?: string, n = 12) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const p = (text: string, bold = false, gap = 1.5) => {
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
  const title = "RE: RETURN OF SECURITY DEPOSIT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1, 105 + tW / 2, y + 1);
  y += 9;

  p(`Dear ${u(v.tenantName)},`);
  p(
    `This letter pertains to the lease agreement dated ${u(v.leaseDate, 10)}, under which you leased the property located at ${u(v.premisesAddress)} (the "Premises"). On ${u(v.depositPaidDate, 10)}, you paid a security deposit in the amount of $${u(v.depositAmount, 4)}.`
  );
  p(
    `Upon inspection of the Premises following lease termination on ${u(v.inspectionDate, 10)}, the following deductions have been made from your security deposit:`
  );
  p("Reason for Deduction:", true);
  p(`${u(v.deductionReason)}`);
  p(`Amount Deducted: $${u(v.deductionAmount, 4)}`);
  if (v.returnOption === "enclosed") {
    p(`As a result of the above deduction(s), the remaining balance of your security deposit is $${u(v.remainingBalance, 4)}, which is enclosed with this letter.`);
  } else {
    p("As a result of the above deduction(s), accordingly, no balance remains to be returned.");
  }
  p(
    `If you dispute any deductions listed above, you must submit your objection in writing to ${u(v.senderAddress)} within ${u(v.objectionDays, 2)} days of receipt of this letter. Failure to respond within this time period may be deemed a waiver of any objection.`
  );
  p("By my signature below, I certify that this notice has been sent to your last known mailing address.");
  p("Sincerely,");
  p("___________________________");
  p(`${u(v.senderName)}${v.senderTitle ? `, ${v.senderTitle}` : ""}`);
  p(`${u(v.letterDate, 10)}`);

  doc.save("security_deposit_return_letter.pdf");
};

export default function SecurityDepositReturnLetter() {
  return (
    <FormWizard
      steps={steps}
      title="Security Deposit Return Letter"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="securitydepositreturnletter"
      preserveStepLayout
    />
  );
}
