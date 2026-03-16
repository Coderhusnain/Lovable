import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective Date of this Agreement", type: "date", required: true },
    ],
  },
  {
    label: "Manufacturer Details",
    fields: [
      { name: "manufacturerName", label: "Manufacturer's Full Legal Name / Entity", type: "text", required: true, placeholder: "Enter full legal name or entity" },
      { name: "manufacturerAddress", label: "Manufacturer's Principal Place of Business Address", type: "text", required: true, placeholder: "Enter full address" },
    ],
  },
  {
    label: "Customer Details",
    fields: [
      { name: "customerName", label: "Customer's Full Legal Name", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "customerAddress", label: "Customer's Residential / Business Address", type: "text", required: true, placeholder: "Enter full address" },
    ],
  },
  {
    label: "Covered Product",
    fields: [
      { name: "productName", label: "Product Name", type: "text", required: true, placeholder: "e.g., Model X Washing Machine" },
      { name: "productType", label: "Product Type", type: "text", required: true, placeholder: "e.g., Home Appliance, Electronics" },
      { name: "modelNumber", label: "Model Number", type: "text", required: true, placeholder: "e.g., WM-2024-XL" },
      { name: "serialNumber", label: "Serial Number", type: "text", required: true, placeholder: "e.g., SN-00123456" },
    ],
  },
  {
    label: "Warranty Coverage",
    fields: [
      { name: "warrantyPeriod", label: "Warranty Period (duration)", type: "text", required: true, placeholder: "e.g., 12 months, 2 years" },
      { name: "warrantyCommencesFrom", label: "Warranty commences from", type: "text", required: true, placeholder: "e.g., date of purchase, date of installation" },
    ],
  },
  {
    label: "Warranty Service",
    fields: [
      {
        name: "serviceType", label: "Type of warranty service", type: "select", required: true,
        options: [
          { value: "inHome", label: "In-Home Repairs (Large Appliances)" },
          { value: "mail", label: "Products Returned by Mail" },
          { value: "both", label: "Both In-Home and Mail-In" },
        ],
      },
      { name: "serviceContactName", label: "Service contact name (for in-home repairs)", type: "text", required: false, placeholder: "Name or department to contact" },
      { name: "serviceContactPhone", label: "Toll-free service number (for in-home repairs)", type: "text", required: false, placeholder: "e.g., 1-800-000-0000" },
      { name: "technicianResponseDays", label: "Technician response time (days) for in-home service", type: "text", required: false, placeholder: "e.g., 5" },
    ],
  },
  {
    label: "Governing Law",
    fields: [
      { name: "governingLaw", label: "This Agreement shall be governed by the laws of:", type: "text", required: true, placeholder: "e.g., State of California" },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "manufacturerSignature", label: "Manufacturer – Authorised Signatory (typed)", type: "text", required: true, placeholder: "Type full legal name as signature" },
      { name: "manufacturerSignDate", label: "Manufacturer – Date", type: "date", required: true },
      { name: "customerSignature", label: "Customer – Signature (typed)", type: "text", required: true, placeholder: "Type full legal name as signature" },
      { name: "customerSignDate", label: "Customer – Date", type: "date", required: true },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 16;
  const W = 178;
  const LH = 5.8;
  let y = 18;

  const ensure = (h = 10) => {
    if (y + h > 282) { doc.addPage(); y = 18; }
  };

  // Bold heading + horizontal rule underneath
  const heading = (text: string, size = 11) => {
    ensure(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.text(text, L, y);
    y += 2.5;
    doc.setDrawColor(80, 80, 80);
    doc.line(L, y, L + W, y);
    y += 4;
    doc.setFontSize(10.5);
  };

  // Sub-heading bold, no rule
  const subHeading = (text: string) => {
    ensure(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, L, y);
    y += LH + 0.5;
  };

  // Normal paragraph
  const p = (text: string, bold = false, gap = 2) => {
    ensure(10);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };

  // Bullet point with proper indent
  const bullet = (text: string) => {
    ensure(10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const indent = 10;
    const lines = doc.splitTextToSize(text, W - indent);
    doc.text("\u2022", L + 2, y);
    doc.text(lines, L + indent, y);
    y += lines.length * LH + 1.5;
  };

  const uf = (label: string, value?: string) => {
    ensure(8);
    const safeValue = (value || "").trim();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
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

  // ── Main Title ──
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const title = "WARRANTY AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 13;

  // ── Section I ──
  heading("I. GENERAL AGREEMENT DETAILS");
  p(
    `This Warranty Agreement ("Agreement") is made and entered into as of ${values.effectiveDate || "[BLANK]"} (the "Effective Date"), ` +
    `by and between ${values.manufacturerName || "[BLANK]"}, having its principal place of business at ` +
    `${values.manufacturerAddress || "[BLANK]"} (hereinafter referred to as the "Manufacturer"), and ` +
    `${values.customerName || "[BLANK]"}, residing at ${values.customerAddress || "[BLANK]"} (hereinafter referred to as the "Customer").`
  );
  y += 1;

  subHeading("Covered Product");
  p(`The product covered under this Agreement (the "Covered Product") is described as follows:`);
  bullet(`Product Name: ${values.productName || "[BLANK]"}`);
  bullet(`Product Type: ${values.productType || "[BLANK]"}`);
  bullet(`Model Number: ${values.modelNumber || "[BLANK]"}`);
  bullet(`Serial Number: ${values.serialNumber || "[BLANK]"}`);
  y += 1;

  subHeading("Warranty Coverage");
  p(
    `The Manufacturer warrants that the Covered Product shall be free from defects in material and workmanship for a period of ` +
    `${values.warrantyPeriod || "[BLANK]"} commencing from ${values.warrantyCommencesFrom || "[BLANK]"} (the "Warranty Period"). ` +
    `This warranty shall apply exclusively to the original purchaser and any successive purchaser during the Warranty Period, ` +
    `subject to the terms and limitations herein.`
  );
  y += 2;

  // ── Section II ──
  heading("II. SCOPE OF WARRANTY AND EXCLUSIONS");
  subHeading("Scope of Warranty");
  p(`This warranty strictly covers manufacturing defects arising from faulty materials or workmanship under normal and intended use of the Covered Product.`);
  y += 1;

  subHeading("Exclusions");
  p(`This warranty shall not apply to, and expressly excludes, any defects or damages resulting from:`);
  bullet(`Misuse, abuse, negligence, or accident;`);
  bullet(`Unauthorized alterations, modifications, or repairs;`);
  bullet(`Normal wear and tear arising from ordinary usage.`);
  y += 1;

  subHeading("Conditions Rendering Warranty Void");
  p(`This warranty shall be deemed null and void if the Covered Product has been:`);
  bullet(`Altered, serviced, or repaired by any person not authorized by the Manufacturer;`);
  bullet(`Used for purposes inconsistent with or contrary to its intended function;`);
  bullet(`Exposed to environmental conditions or operational settings not recommended by the Manufacturer.`);
  y += 2;

  // ── Section III ──
  heading("III. OBTAINING WARRANTY SERVICE");
  subHeading("1. Customer Obligations");
  p(`In order to obtain warranty service, the Customer must, within the Warranty Period:`);
  bullet(`Promptly notify the Manufacturer of any defect or malfunction;`);
  bullet(`Provide valid proof of purchase upon request; and`);
  bullet(`Return the Covered Product for inspection when so required by the Manufacturer.`);
  y += 1;

  subHeading("2. Procedure for Warranty Service");

  if (values.serviceType === "inHome" || values.serviceType === "both" || !values.serviceType) {
    p("(a) In-Home Repairs (Large Appliances)", true);
    p(
      `Where in-home service is applicable, the Customer shall notify ${values.serviceContactName || "[BLANK]"} by contacting the toll-free number ` +
      `${values.serviceContactPhone || "[BLANK]"} immediately upon discovery of any defect, malfunction, or non-conformity. ` +
      `An authorised service technician shall attend the Customer's premises to repair or replace the defective component within ` +
      `${values.technicianResponseDays || "[BLANK]"} days from receipt of such notification.`
    );
  }

  if (values.serviceType === "mail" || values.serviceType === "both" || !values.serviceType) {
    p("(b) Products Returned by Mail", true);
    p(
      `Where the Covered Product is returned by post, the Customer is advised to dispatch the product via insured shipment and return receipt requested. ` +
      `The Manufacturer shall not be liable for any loss, damage, or misplacement occurring during transit.`
    );
  }
  y += 2;

  // ── Section IV ──
  heading("IV. BUYER REMEDIES");
  p(`Upon confirmation of a covered defect, the Manufacturer shall, at its sole discretion, elect to:`);
  bullet(`Repair the Covered Product using new or refurbished components; or`);
  bullet(`Replace the Covered Product with a product of equivalent specification; or`);
  bullet(`Refund the original purchase price to the Customer.`);
  y += 2;

  // ── Section V ──
  heading("V. DISPUTE RESOLUTION AND LEGAL PROVISIONS");

  subHeading("1. Alternative Dispute Resolution (ADR)");
  p(
    `The Parties shall endeavour to resolve any dispute, controversy, or claim arising out of or relating to this Agreement through amicable negotiations. ` +
    `Failing such resolution, the Parties agree to attempt settlement in good faith through mediation in accordance with applicable statutory mediation rules.`
  );

  subHeading("2. Severability");
  p(
    `If any provision of this Agreement is held by a court of competent jurisdiction to be invalid, illegal, or unenforceable, such provision shall be ` +
    `severed or limited to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.`
  );

  subHeading("3. Limitation of Liability");
  p(
    `Under no circumstances shall the Manufacturer be liable for any indirect, incidental, consequential, special, or exemplary damages arising out of or ` +
    `related to this Agreement, including but not limited to loss of profits, revenue, business interruption, or third-party claims, even if advised of ` +
    `the possibility of such damages.`
  );

  subHeading("4. Governing Law");
  p(
    `This Agreement shall be governed by and construed in accordance with the laws of ${values.governingLaw || "[BLANK]"}, ` +
    `without regard to its conflict of law principles.`
  );

  subHeading("5. Entire Agreement");
  p(
    `This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior ` +
    `negotiations, representations, agreements, or understandings, whether oral or written.`
  );
  y += 6;

  // ── Signatures ──
  ensure(40);
  p(`IN WITNESS WHEREOF, the Parties hereto have executed this Warranty Agreement as of the Effective Date first written above.`);
  y += 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Manufacturer:", L, y);
  doc.setFont("helvetica", "normal");
  doc.text(" __________________________", L + doc.getTextWidth("Manufacturer:"), y);
  y += LH + 1;
  doc.text("Authorised Signatory", L, y);
  y += LH;
  if (values.manufacturerSignature) {
    doc.text(values.manufacturerSignature, L, y);
    doc.line(L, y + 1, L + doc.getTextWidth(values.manufacturerSignature), y + 1);
  }
  y += LH;
  uf("Date", values.manufacturerSignDate);
  y += 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Customer:", L, y);
  doc.setFont("helvetica", "normal");
  doc.text(" __________________________", L + doc.getTextWidth("Customer:"), y);
  y += LH + 1;
  doc.text("Signature", L, y);
  y += LH;
  if (values.customerSignature) {
    doc.text(values.customerSignature, L, y);
    doc.line(L, y + 1, L + doc.getTextWidth(values.customerSignature), y + 1);
  }
  y += LH;
  uf("Date", values.customerSignDate);

  doc.save("warranty_agreement.pdf");
};

export default function WarrantyAgreement() {
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