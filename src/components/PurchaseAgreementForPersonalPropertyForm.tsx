import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "sellerName", label: "Seller name", type: "text", required: true },
      { name: "sellerAddress", label: "Seller address", type: "text", required: true },
      { name: "buyerName", label: "Buyer name", type: "text", required: true },
      { name: "buyerAddress", label: "Buyer address", type: "text", required: true },
    ],
  },
  {
    label: "Property and Price",
    fields: [
      { name: "propertyDescription", label: "Property description", type: "textarea", required: true },
      { name: "purchasePrice", label: "Purchase price", type: "text", required: true },
      { name: "propertyLocation", label: "Current property location", type: "text", required: true },
      { name: "deliveryTo", label: "Delivery / possession recipient", type: "text", required: true },
      { name: "transferDate", label: "Transfer of ownership date", type: "date", required: true },
      { name: "governingLaw", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "sellerSignature", label: "Seller signature (printed name)", type: "text", required: true },
      { name: "sellerDate", label: "Seller date", type: "date", required: true },
      { name: "buyerSignature", label: "Buyer signature (printed name)", type: "text", required: true },
      { name: "buyerDate", label: "Buyer date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 18;
  const textWidth = pageWidth - margin * 2;
  const lineHeight = 5.4;
  const pageLimit = 282;
  let y = 18;

  const u = (value?: string, min = 18) => (value && value.trim() ? value.trim() : "_".repeat(min));
  const ensureSpace = (needed: number) => {
    if (y + needed > pageLimit) {
      doc.addPage();
      y = 18;
    }
  };
  const paragraph = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, textWidth);
    ensureSpace(lines.length * lineHeight + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };
  const field = (label: string, value?: string, min = 18) => {
    ensureSpace(lineHeight + 2.5);
    const labelText = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text(labelText, margin, y);
    const startX = margin + doc.getTextWidth(labelText);
    const shown = (value || "").trim();
    if (shown) {
      doc.text(shown, startX, y);
      doc.line(startX, y + 1.1, startX + Math.max(18, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(startX, y + 1.1, startX + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lineHeight + 1.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13.5);
  const title = "PURCHASE AGREEMENT FOR PERSONAL PROPERTY";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const titleWidth = doc.getTextWidth(title);
  doc.line(pageWidth / 2 - titleWidth / 2, y + 1.4, pageWidth / 2 + titleWidth / 2, y + 1.4);
  y += 9;
  doc.setFontSize(10.5);

  // Preamble: print effective date and Seller/Buyer lines matching the DOCX formatting
  paragraph(`This Purchase Agreement ("Agreement") is made and entered into as of ${u(values.effectiveDate)} ("Effective Date"), by and between:`);

  // Helper to render a labeled party line like: Seller: <name/underscores>, of <address/underscores>
  const partyLine = (roleLabel: string, name?: string, address?: string) => {
    ensureSpace(lineHeight + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const prefix = `${roleLabel}: `;
    doc.text(prefix, margin, y);
    const prefixW = doc.getTextWidth(prefix);
    const nameText = name && name.trim() ? name.trim() : "___________________________";
    doc.text(nameText, margin + prefixW, y);
    const nameEndX = margin + prefixW + doc.getTextWidth(nameText) + 2;
    // add comma and ' of ' text
    const ofText = ", of ";
    doc.text(ofText, nameEndX, y);
    const ofW = doc.getTextWidth(ofText);
    const addrStart = nameEndX + ofW;
    const addrText = address && address.trim() ? address.trim() : "___________________________";
    doc.text(addrText, addrStart, y);
    // underline name and address areas
    const underlineY = y + 1.5;
    const nameUnderlineStart = margin + prefixW;
    const nameUnderlineEnd = nameUnderlineStart + Math.max(doc.getTextWidth(nameText), 80);
    doc.line(nameUnderlineStart, underlineY, nameUnderlineEnd, underlineY);
    const addrUnderlineStart = addrStart;
    const addrUnderlineEnd = addrUnderlineStart + Math.max(doc.getTextWidth(addrText), 120);
    doc.line(addrUnderlineStart, underlineY, addrUnderlineEnd, underlineY);
    y += lineHeight + 3;
  };

  partyLine("Seller", values.sellerName, values.sellerAddress);
  partyLine("Buyer", values.buyerName, values.buyerAddress);

  paragraph("1. SALE AND TRANSFER OF PROPERTY", true);
  paragraph(
    `Seller hereby sells, assigns, conveys, and transfers to Buyer all right, title, and interest in the following personal property (the "Property"):`
  );
  paragraph(u(values.propertyDescription, 40));

  paragraph("2. PURCHASE PRICE", true);
  paragraph(`Buyer shall pay Seller the total purchase price of $${u(values.purchasePrice, 12)} in exchange for the Property.`);

  paragraph("3. REPRESENTATIONS OF SELLER", true);
  paragraph("Seller represents and warrants that: Seller is the lawful owner of the Property; Seller has full authority to sell and transfer the Property; and the Property is conveyed free and clear of all liens, claims, security interests, and encumbrances.");

  paragraph("4. CONDITION OF PROPERTY", true);
  paragraph('The Property is sold and transferred on an "AS IS" and "WHERE IS" basis. Except as expressly stated in this Agreement, Seller disclaims all warranties, express or implied, including warranties of merchantability or fitness for a particular purpose.');

  paragraph("5. DELIVERY AND POSSESSION", true);
  paragraph(`Transfer of ownership shall be effective as of ${u(values.transferDate)}. The Property is presently located at ${u(values.propertyLocation, 20)} and shall be delivered into the possession of ${u(values.deliveryTo, 20)} upon execution of this Agreement, unless otherwise agreed in writing.`);

  paragraph("6. AMENDMENTS", true);
  paragraph("This Agreement may be amended or modified only by a written instrument executed by both Parties.");

  paragraph("7. ENTIRE AGREEMENT", true);
  paragraph("This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, representations, or understandings, whether oral or written.");

  paragraph("8. GOVERNING LAW", true);
  paragraph(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${u(values.governingLaw, 18)}.`);

  paragraph("9. SEVERABILITY", true);
  paragraph("If any provision of this Agreement is held invalid or unenforceable, such provision shall be enforced to the fullest extent permitted by law, and the remaining provisions shall remain in full force and effect.");

  paragraph("10. SUCCESSORS AND ASSIGNS", true);
  paragraph("This Agreement shall be binding upon and inure to the benefit of the Parties and their respective permitted successors and assigns.");

  paragraph("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", true);
  paragraph("SELLER:");
  field("Signature", values.sellerSignature, 24);
  field("Date", values.sellerDate, 18);
  paragraph("BUYER:");
  field("Signature", values.buyerSignature, 24);
  field("Date", values.buyerDate, 18);

  doc.save("purchase_agreement_for_personal_property.pdf");
};

export default function PurchaseAgreementForPersonalPropertyForm() {
  return (
    <FormWizard
      steps={steps}
      title="Purchase Agreement for Personal Property"
      subtitle="Create a purchase agreement for the sale of personal property and export it as PDF"
      onGenerate={generatePDF}
      documentType="purchase-agreement-for-personal-property"
    />
  );
}