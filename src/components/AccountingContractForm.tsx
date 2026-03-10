import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Contract Basics",
    fields: [
      { name: "contractDate", label: "Contract date", type: "date", required: true },
      { name: "accountantName", label: "Accountant/Firm name", type: "text", required: true },
      { name: "accountantAddress", label: "Accountant address", type: "text", required: true },
      { name: "clientName", label: "Client name", type: "text", required: true },
      { name: "clientAddress", label: "Client address", type: "text", required: true },
      { name: "governingLaw", label: "Governing law", type: "text", required: true },
    ],
  },
  {
    label: "Services",
    fields: [
      { name: "services", label: "Accounting services scope", type: "textarea", required: true, placeholder: "Bookkeeping, payroll, tax, reporting, advisory..." },
      { name: "feeStructure", label: "Fee structure", type: "text", required: true, placeholder: "Hourly, fixed monthly, milestone..." },
      { name: "invoiceTerms", label: "Invoice/payment terms", type: "text", required: true, placeholder: "e.g., Net 15 days" },
      { name: "startDate", label: "Service start date", type: "date", required: true },
      { name: "endDate", label: "Service end/renewal date", type: "date", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "accountantSignatory", label: "Accountant signatory", type: "text", required: true },
      { name: "clientSignatory", label: "Client signatory", type: "text", required: true },
      { name: "signatureDate", label: "Signature date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 16;
  const W = 178;
  const LH = 5.6;
  let y = 18;

  const ensure = (h = 10) => {
    if (y + h > 282) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.8) => {
    ensure(12);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.3);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    const safeValue = (value || "").trim();
    doc.setFont("helvetica", "normal");
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    if (safeValue) {
      doc.text(safeValue, x, y);
      doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(safeValue)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += LH + 1.2;
  };

  const title = "ACCOUNTING CONTRACT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p("Other names: Accounting Contract, Accounting Agreement, Accountancy Agreement.", true);
  p(
    `This Accounting Contract is made on ${v.contractDate || "____________"} between ${v.accountantName || "____________"} of ` +
      `${v.accountantAddress || "____________"} ("Accountant") and ${v.clientName || "____________"} of ${v.clientAddress || "____________"} ("Client").`,
  );
  p(
    "What Is an Accounting Contract? It is a legally binding document governing the professional relationship between an accountant and client. " +
      "It defines service scope, fee structure, timelines, confidentiality, compliance, and termination terms.",
  );
  p(
    "This agreement establishes expectations at engagement outset, reduces dispute risk, and ensures services are delivered in accordance with agreed terms.",
  );
  p(
    `Services under this agreement: ${v.services || "____________"}. Fee structure: ${v.feeStructure || "____________"}. ` +
      `Invoice terms: ${v.invoiceTerms || "____________"}. Start date: ${v.startDate || "____________"}. ` +
      `${v.endDate ? `End/renewal date: ${v.endDate}.` : "End date as agreed by the Parties."}`,
  );
  p("When Should You Use an Accounting Contract?", true);
  p(
    "- When onboarding a new client for accounting/bookkeeping.\n" +
      "- When an individual hires an accountant for personal tax/accounting matters.\n" +
      "- When a business hires accountant/firm for specific financial responsibilities requiring legal clarity and compliance.",
  );
  p("Sample Accounting Agreement Note", true);
  p(
    "This template is designed to update terms based on provided information. It is a practical professional starting point and can be reviewed by legal counsel " +
      "for added assurance prior to final execution.",
  );
  p("Download/Use Note", true);
  p(
    "The agreement can be downloaded and customized in professionally drafted format suitable for individuals, startups, and established businesses.",
  );
  p("Core Legal Terms", true);
  p(
    "Confidentiality applies to all client records and proprietary information. Amendments must be in writing signed by both parties. " +
      `Governing law: ${v.governingLaw || "____________"}. In disputes, parties should first attempt amicable resolution and then pursue available legal remedies.`,
  );
  p("IN WITNESS WHEREOF, the Parties have executed this Accounting Contract as of the date first above written.", true);

  uf("Accountant Signatory", v.accountantSignatory);
  uf("Client Signatory", v.clientSignatory);
  uf("Date", v.signatureDate);

  doc.save("accounting_contract.pdf");
};

export default function AccountingContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Accounting Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="accountingcontract"
    />
  );
}

