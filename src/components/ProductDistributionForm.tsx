import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Parties and Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "supplierName", label: "Supplier Name", type: "text", required: true },
      { name: "supplierAddress", label: "Supplier Address", type: "textarea", required: true },
      { name: "distributorName", label: "Distributor Name", type: "text", required: true },
      { name: "distributorAddress", label: "Distributor Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 2: Appointment and Territory",
    fields: [
      { name: "territory", label: "Defined Territory", type: "text", required: true },
      { name: "productsSummary", label: "Products Summary", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 3: Commercial Terms",
    fields: [
      { name: "proceedsPercent", label: "Supplier Share % of Net Proceeds", type: "text", required: true },
      { name: "installments", label: "Installments Count", type: "text", required: true },
      { name: "dueDay", label: "Due Day After Accounting Period", type: "text", required: true },
    ],
  },
  {
    label: "Step 4: Default, Insurance, and Disputes",
    fields: [
      { name: "noticeDays", label: "Termination Notice Days", type: "text", required: true },
      { name: "disputeMethod", label: "Dispute method detail", type: "textarea", required: true },
      { name: "insuranceDetail", label: "Insurance/Replacement value detail", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 5: Governing Law",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State / Jurisdiction", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
    ],
  },
  {
    label: "Step 6: Execution",
    fields: [
      { name: "supplierSignName", label: "Supplier Signatory Name", type: "text", required: true },
      { name: "supplierSignDesignation", label: "Supplier Designation", type: "text", required: true },
      { name: "supplierSignDate", label: "Supplier Sign Date", type: "date", required: true },
      { name: "distributorSignName", label: "Distributor Signatory Name", type: "text", required: true },
      { name: "distributorSignDesignation", label: "Distributor Designation", type: "text", required: true },
      { name: "distributorSignDate", label: "Distributor Sign Date", type: "date", required: true },
    ],
  },
  {
    label: "Step 7: Final Review",
    fields: [{ name: "reviewNote", label: "Optional Internal Review Note", type: "textarea", required: false }],
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

  doc.setFont("times", "bold");
  doc.setFontSize(12.8);
  const title = "PRODUCT DISTRIBUTION AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 9;

  p(
    `This Product Distribution Agreement ("Agreement") is made and entered into as of ${u(v.effectiveDate, 12)} ("Effective Date"), by and between ${u(
      v.supplierName
    )}, having principal place of business at ${u(v.supplierAddress)} ("Supplier"), and ${u(
      v.distributorName
    )}, having principal place of business at ${u(v.distributorAddress)} ("Distributor").`
  );
  p('Supplier and Distributor are collectively the "Parties" and individually a "Party."');

  p("I. RIGHT TO SELL AND APPOINTMENT", true);
  p(`1.1 Supplier is lawful owner of the products described in this Agreement (the "Products"): ${u(v.productsSummary)}.`);
  p(`1.2 Supplier grants Distributor an exclusive right to distribute and sell Products within territory: ${u(v.territory)}.`);
  p("1.3 Products are supplied on consignment basis; Distributor shall use best efforts, due diligence, and professional expertise to promote, market, and sell Products.");
  p("1.4 Sales prices and commercial terms are determined solely by Supplier unless otherwise agreed in writing.");

  p("II. PROCEEDS OF SALES AND PAYMENT TERMS", true);
  p(
    `2.1 Distributor shall remit to Supplier ${u(v.proceedsPercent, 3)}% of net sales proceeds derived from Product sales.`
  );
  p(
    `2.2 Payment shall be made in ${u(v.installments, 2)} installment(s), due on or before day ${u(
      v.dueDay,
      2
    )} following each relevant accounting period.`
  );
  p("2.3 Each payment shall be accompanied by detailed written statement of net proceeds calculation, quantities sold, and current inventory status.");

  p("III. RECORD KEEPING AND INSPECTION", true);
  p("3.1 Distributor shall maintain complete, accurate, and current records relating to receipt, storage, sale, and inventory.");
  p("3.2 Supplier may inspect such records during normal business hours with reasonable prior notice for verification/audit.");

  p("IV. TITLE TO MERCHANDISE", true);
  p("All consigned Products remain sole property of Supplier until sold to third-party purchasers, at which point title transfers per terms of sale.");

  p("V. LOSS, DAMAGE AND INSURANCE", true);
  p(
    `5.1 Distributor is fully responsible for shortage, loss, theft, or damage while Products are in its possession, custody, or control. 5.2 Distributor shall maintain insurance coverage sufficient for full replacement value: ${u(
      v.insuranceDetail
    )}.`
  );

  p("VI. PAYROLL TAXES AND EMPLOYMENT OBLIGATIONS", true);
  p("Distributor is solely liable for payroll taxes, social security contributions, insurance premiums, and statutory obligations for its personnel and shall indemnify Supplier for related claims.");

  p("VII. DEFAULT AND TERMINATION", true);
  p(
    `If Distributor fails to comply with material obligations (including payment defaults), Supplier may terminate by giving ${u(
      v.noticeDays,
      2
    )} days written notice. Distributor may prevent termination by full cure within notice period provided no further default occurs.`
  );

  p("VIII. DISPUTE RESOLUTION", true);
  p(
    `Parties shall first attempt amicable negotiations. If unresolved, dispute shall proceed to mediation, and if mediation fails, parties may pursue arbitration or court remedies as mutually agreed. Detail: ${u(
      v.disputeMethod
    )}.`
  );

  p("IX. WARRANTIES AND LIMITATION OF LIABILITY", true);
  p("Neither Party provides express/implied warranties regarding sale/use/transfer by the other Party or third parties. Neither Party is liable for indirect, incidental, consequential, special, or punitive damages.");

  p("X. ASSIGNMENT AND TRANSFER OF RIGHTS", true);
  p("Agreement binds Parties and permitted successors/assigns. Neither Party may assign/transfer rights/obligations without prior written consent of the other.");
  p("XI. ENTIRE AGREEMENT | XII. AMENDMENTS | XIII. SEVERABILITY | XIV. WAIVER", true);
  p("This Agreement is complete and supersedes prior understandings; amendments require signed writing; invalid provisions are severed; non-enforcement is not waiver.");
  p("XV. GOVERNING LAW", true);
  p(`Governing law is the State/Jurisdiction of ${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? ` (${v.city})` : ""}.`);

  p("XVI. SIGNATORIES", true);
  p(`For Supplier: Name ${u(v.supplierSignName)} | Designation ${u(v.supplierSignDesignation)} | Date ${u(v.supplierSignDate, 10)}`);
  p(`For Distributor: Name ${u(v.distributorSignName)} | Designation ${u(v.distributorSignDesignation)} | Date ${u(v.distributorSignDate, 10)}`);

  doc.save("product_distribution_agreement.pdf");
};

export default function ProductDistributionForm() {
  return (
    <FormWizard
      steps={steps}
      title="Product Distribution Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="productdistribution"
      preserveStepLayout
    />
  );
}
