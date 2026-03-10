import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "manufacturerName", label: "Manufacturer name", type: "text", required: true },
      { name: "manufacturerAddress", label: "Manufacturer principal business address", type: "text", required: true },
      { name: "customerName", label: "Customer name", type: "text", required: true },
      { name: "customerAddress", label: "Customer address", type: "text", required: true },
      { name: "governingLaw", label: "Governing law", type: "text", required: true },
    ],
  },
  {
    label: "Covered Product",
    fields: [
      { name: "productName", label: "Product name", type: "text", required: true },
      { name: "productType", label: "Product type", type: "text", required: true },
      { name: "modelNumber", label: "Model number", type: "text", required: true },
      { name: "serialNumber", label: "Serial number", type: "text", required: true },
      { name: "warrantyPeriod", label: "Warranty period", type: "text", required: true, placeholder: "e.g., 24 months" },
      { name: "warrantyStartDate", label: "Warranty period start date", type: "date", required: true },
    ],
  },
  {
    label: "Service Terms",
    fields: [
      { name: "serviceContactName", label: "Warranty service contact name", type: "text", required: true },
      { name: "servicePhone", label: "Toll-free service phone", type: "text", required: true },
      { name: "serviceDays", label: "Repair/replace response in days", type: "text", required: true },
      { name: "manufacturerSignature", label: "Manufacturer authorized signatory", type: "text", required: true },
      { name: "customerSignature", label: "Customer signature", type: "text", required: true },
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
    doc.setFontSize(10.5);
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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "WARRANTY AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p("I. GENERAL AGREEMENT DETAILS", true);
  p(
    `This Warranty Agreement ("Agreement") is made and entered into as of ${v.effectiveDate || "____________"} (the "Effective Date"), ` +
      `by and between ${v.manufacturerName || "____________"}, having its principal place of business at ` +
      `${v.manufacturerAddress || "____________"} (the "Manufacturer"), and ${v.customerName || "____________"}, ` +
      `residing at ${v.customerAddress || "____________"} (the "Customer").`,
  );
  p("Covered Product", true);
  uf("Product Name", v.productName);
  uf("Product Type", v.productType);
  uf("Model Number", v.modelNumber);
  uf("Serial Number", v.serialNumber);
  p(
    `Warranty Coverage: The Manufacturer warrants that the Covered Product shall be free from defects in material and workmanship for a period of ` +
      `${v.warrantyPeriod || "____________"} commencing from ${v.warrantyStartDate || "____________"} (the "Warranty Period"). ` +
      "This warranty applies to the original purchaser and any successive purchaser during the Warranty Period, subject to terms and limitations herein.",
  );

  p("II. SCOPE OF WARRANTY AND EXCLUSIONS", true);
  p("Scope: This warranty strictly covers manufacturing defects arising from faulty materials or workmanship under normal and intended use.");
  p("Exclusions:", true);
  p("- Misuse, abuse, negligence, or accident; - Unauthorized alterations, modifications, or repairs; - Normal wear and tear.");
  p("Conditions Rendering Warranty Void:", true);
  p(
    "This warranty is void if the Covered Product has been altered/serviced/repaired by unauthorized persons, " +
      "used contrary to intended function, or exposed to non-recommended environmental/operational conditions.",
  );

  p("III. OBTAINING WARRANTY SERVICE", true);
  p("1. Customer Obligations", true);
  p(
    "Within the Warranty Period, Customer must promptly notify Manufacturer of defects, provide proof of purchase upon request, " +
      "and return product for inspection where required.",
  );
  p("2. Procedure for Warranty Service", true);
  p(
    `(a) In-Home Repairs (Large Appliances): Customer shall notify ${v.serviceContactName || "____________"} by contacting toll-free ` +
      `${v.servicePhone || "____________"} immediately upon discovery of defect/non-conformity. An authorized service technician shall ` +
      `repair or replace defective component within ${v.serviceDays || "____"} days from receipt of notification.`,
  );
  p(
    "(b) Products Returned by Mail: Customer should dispatch via insured shipment and return receipt requested. " +
      "Manufacturer is not liable for loss/damage/misplacement during transit.",
  );

  p("IV. BUYER REMEDIES", true);
  p(
    "Upon confirmation of covered defect, Manufacturer may at sole discretion: (i) repair using new/refurbished components; " +
      "(ii) replace with equivalent product; or (iii) refund original purchase price.",
  );

  p("V. DISPUTE RESOLUTION AND LEGAL PROVISIONS", true);
  p("1. ADR: Parties shall attempt amicable negotiations, then good-faith mediation under applicable statutory mediation rules.");
  p("2. Severability: Invalid provisions are severed/limited to minimum necessary; remaining provisions remain in full force.");
  p(
    "3. Limitation of Liability: Manufacturer is not liable for indirect, incidental, consequential, special, or exemplary damages, including " +
      "loss of profits/revenue/business interruption/third-party claims, even if advised of possibility.",
  );
  p(`4. Governing Law: This Agreement is governed by the laws of ${v.governingLaw || "____________"}, without conflict-of-law principles.`);
  p("5. Entire Agreement: This document supersedes all prior oral/written negotiations, representations, agreements, or understandings.");

  p("IN WITNESS WHEREOF, the Parties hereto have executed this Warranty Agreement as of the Effective Date first written above.", true);
  uf("Manufacturer - Authorized Signatory", v.manufacturerSignature);
  uf("Customer - Signature", v.customerSignature);
  uf("Date", v.signatureDate);

  doc.save("warranty_agreement.pdf");
};

export default function WarrantyAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Warranty Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="warrantyagreement"
    />
  );
}

