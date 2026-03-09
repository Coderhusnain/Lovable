import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Parties and Territory", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "supplierName", label: "Supplier name", type: "text", required: true },
    { name: "supplierAddress", label: "Supplier address", type: "text", required: false },
    { name: "distributorName", label: "Distributor name", type: "text", required: true },
    { name: "distributorAddress", label: "Distributor address", type: "text", required: false },
    { name: "territory", label: "Territory", type: "text", required: false },
    { name: "proceedsPercent", label: "Net proceeds % to supplier", type: "text", required: false },
    { name: "installments", label: "Installments", type: "text", required: false },
    { name: "dueDay", label: "Due day of period", type: "text", required: false },
    { name: "terminationNoticeDays", label: "Default termination notice days", type: "text", required: false },
    { name: "governingLaw", label: "Governing law jurisdiction", type: "text", required: true },
  ]},
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w=210,m=16,tw=w-m*2,lh=5.5,limit=280; let y=20;
  const u=(v?:string,min=14)=>(v||"").trim()||" ".repeat(min);
  const p=(t:string,b=false,g=1.8)=>{const lines=doc.splitTextToSize(t,tw);if(y+lines.length*lh+g>limit){doc.addPage();y=20;}doc.setFont("helvetica",b?"bold":"normal");doc.text(lines,m,y);y+=lines.length*lh+g;};
  doc.setFont("helvetica","bold");doc.setFontSize(13);const title="PRODUCT DISTRIBUTION AGREEMENT";doc.text(title,w/2,y,{align:"center"});const tW=doc.getTextWidth(title);doc.line(w/2-tW/2,y+1.1,w/2+tW/2,y+1.1);y+=9;doc.setFontSize(10.5);
  p(`This Product Distribution Agreement is made as of ${u(values.effectiveDate,12)} between ${u(values.supplierName,12)} at ${u(values.supplierAddress,12)} ("Supplier") and ${u(values.distributorName,12)} at ${u(values.distributorAddress,12)} ("Distributor").`,false,3);
  p("I. RIGHT TO SELL AND APPOINTMENT",true);
  p(`Supplier grants Distributor exclusive right to distribute/sell Products in ${u(values.territory,12)} on consignment basis. Distributor shall use best efforts to market/sell. Sales prices and commercial terms are determined solely by Supplier unless otherwise agreed in writing.`);
  p("II. PROCEEDS OF SALES AND PAYMENT TERMS",true);
  p(`Distributor remits ${u(values.proceedsPercent,4)}% of net sales proceeds in ${u(values.installments,2)} installment(s), due on or before day ${u(values.dueDay,2)} following each accounting period, with detailed statement of sales and inventory.`);
  p("III. RECORD KEEPING AND INSPECTION",true); p("Distributor maintains complete records; Supplier may inspect with reasonable notice during business hours.");
  p("IV. TITLE TO MERCHANDISE",true); p("Consigned products remain Supplier property until sold to third-party purchasers.");
  p("V. LOSS, DAMAGE, INSURANCE",true); p("Distributor is fully responsible for shortages/loss/theft/damage in its custody and maintains insurance to full replacement value.");
  p("VI. PAYROLL TAXES",true); p("Distributor is exclusively liable for payroll taxes and employment obligations for its personnel and indemnifies Supplier for related claims.");
  p("VII. DEFAULT AND TERMINATION",true); p(`Supplier may terminate on Distributor material non-compliance with ${u(values.terminationNoticeDays,4)} days written notice; Distributor may cure within notice period to prevent termination.`);
  p("VIII. DISPUTE RESOLUTION",true); p("Parties first negotiate in good faith, then mediate; if unresolved, may proceed to arbitration or court as mutually agreed.");
  p("IX. WARRANTIES; LIMITATION",true); p("No express/implied warranties by either party regarding sale/use/transfer beyond stated terms. Neither party liable for indirect/incidental/consequential/special/punitive damages.");
  p("X-XV. GENERAL CLAUSES",true); p("Assignment only with written consent; entire agreement supersedes prior understandings; amendments in signed writing; severability, waiver, and governing law apply.");
  p(`Governing Law: ${u(values.governingLaw,12)}.`);
  p("XVI. SIGNATORIES",true); p("Supplier and Distributor execute through duly authorized representatives on Effective Date.");
  doc.save("product_distribution_agreement.pdf");
};

export default function ProductDistributionAgreementForm() {
  return <FormWizard steps={steps} title="Product Distribution Agreement" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="productdistributionagreement" />;
}
