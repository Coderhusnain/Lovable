import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "agreementDay", label: "Agreement day", type: "text", required: true },
    { name: "agreementMonth", label: "Agreement month", type: "text", required: true },
    { name: "agreementYear", label: "Agreement year", type: "text", required: true },
    { name: "landlordName", label: "Landlord full name", type: "text", required: true },
    { name: "tenantNames", label: "Tenant full name(s)", type: "text", required: true },
    { name: "coSignerName", label: "Co-signer full name", type: "text", required: true },
    { name: "leaseDate", label: "Referenced lease date", type: "text", required: true },
  ]},
  { label: "Property and Co-Signer ID", fields: [
    { name: "propertyAddress", label: "Property address", type: "text", required: true },
    { name: "propertyCity", label: "Property city", type: "text", required: true },
    { name: "propertyState", label: "Property state", type: "text", required: true },
    { name: "propertyZip", label: "Property ZIP", type: "text", required: true },
    { name: "coSignerResidentialAddress", label: "Co-signer residential address", type: "text", required: true },
    { name: "coSignerUnit", label: "Apartment/unit", type: "text", required: false },
    { name: "coSignerCity", label: "Co-signer city", type: "text", required: true },
    { name: "coSignerState", label: "Co-signer state", type: "text", required: true },
    { name: "coSignerZip", label: "Co-signer ZIP", type: "text", required: true },
    { name: "licenseNumber", label: "Driver license number", type: "text", required: true },
    { name: "licenseState", label: "Issuing state", type: "text", required: true },
    { name: "coSignerPhone", label: "Telephone number", type: "text", required: true },
  ]},
  { label: "Guarantee Terms", fields: [
    { name: "signOnBehalfName", label: "Agreement signed by (Make It Legal)", type: "text", required: true },
    { name: "onBehalfOfName", label: "On behalf of", type: "text", required: true },
  ]},
  { label: "Legal Clauses", fields: [
    { name: "attorneyFeesClauseNote", label: "Attorney fees clause note", type: "text", required: false },
  ]},
  { label: "Signatures", fields: [
    { name: "coSignerSignature", label: "Co-signer signature name", type: "text", required: true },
    { name: "coSignerPrintName", label: "Co-signer print name", type: "text", required: true },
    { name: "coSignerDate", label: "Co-signer date", type: "date", required: true },
    { name: "landlordSignature", label: "Landlord signature name", type: "text", required: true },
    { name: "landlordPrintName", label: "Landlord print name", type: "text", required: true },
    { name: "landlordDate", label: "Landlord date", type: "date", required: true },
    { name: "tenantSignature", label: "Tenant signature (optional)", type: "text", required: false },
    { name: "tenantPrintName", label: "Tenant print name (optional)", type: "text", required: false },
    { name: "tenantDate", label: "Tenant date (optional)", type: "date", required: false },
  ]},
  { label: "Notary Notes", fields: [
    { name: "notarySignerName", label: "Signer before notary", type: "text", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.2, limit = 282;
  let y = 20;
  const u = (x?: string, n = 12) => (x || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => { if (y + n > limit) { doc.addPage(); y = 20; } };
  const p = (t: string, b = false, g = 1.4) => { const lines = doc.splitTextToSize(t, tw); ensure(lines.length * lh + g); doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10); doc.text(lines, m, y); y += lines.length * lh + g; };
  const uf = (l: string, x?: string) => { ensure(lh + 2); const lt = `${l}: `; doc.text(lt, m, y); const sx = m + doc.getTextWidth(lt); const t = (x || "").trim(); if (t) { doc.text(t, sx, y); doc.line(sx, y + 1, sx + Math.max(18, doc.getTextWidth(t)), y + 1); } else { doc.text("____________________", sx, y); } y += lh + 0.8; };

  const title = "CO-SIGNER AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.5); doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title); doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2); y += 9;

  p(`This Co-Signer Agreement is made on this ${u(v.agreementDay, 2)} day of ${u(v.agreementMonth)}, ${u(v.agreementYear, 4)}, by and between Landlord ${u(v.landlordName)}, Tenant(s) ${u(v.tenantNames)}, and Co-Signer ${u(v.coSignerName)}. This Agreement modifies and is read with lease dated ${u(v.leaseDate)} (Attachment A).`);
  p("PROPERTY DESCRIPTION", true);
  uf("Address", v.propertyAddress); uf("City", v.propertyCity); uf("State", v.propertyState); uf("ZIP", v.propertyZip);
  p("CO-SIGNER IDENTIFICATION", true);
  uf("Full Legal Name", v.coSignerName);
  uf("Residential Address", v.coSignerResidentialAddress);
  uf("Apartment/Unit Number", v.coSignerUnit);
  uf("City", v.coSignerCity); uf("State", v.coSignerState); uf("ZIP Code", v.coSignerZip);
  uf("Driver's License Number", v.licenseNumber); uf("Issuing State", v.licenseState); uf("Telephone Number", v.coSignerPhone);
  p("AGREEMENT OF GUARANTEE", true);
  p("Co-Signer has read and understands Lease and unconditionally/irrevocably guarantees Tenant financial obligations including rent, late fees/penalties, repair damages (tenant/guests/pets/service animals), cleaning/restoration charges, utility bills, and unpaid charges during tenancy or after termination.");
  p("Co-Signer obligations become effective upon Tenant default. Agreement remains in effect during lease term and any renewal/extension/holdover/assignment/subletting. In eviction/termination/abandonment, Co-Signer remains liable for unpaid rent, damages, legal fees, and costs until re-rented. Obligations continue notwithstanding assignment/subletting unless Landlord agrees in writing.");
  p("CREDIT AUTHORIZATION", true);
  p("Co-Signer authorizes Landlord to obtain consumer credit report and perform background/reference checks for financial responsibility and creditworthiness.");
  p("LEGAL FEES AND COSTS", true);
  p(v.attorneyFeesClauseNote || "In legal action arising from this Agreement, prevailing party recovers reasonable attorneys' fees, court costs, and collection/enforcement/defense expenses.");
  p("ENTIRE AGREEMENT", true);
  p("This is the entire understanding regarding subject matter and may be modified only by writing signed by Landlord and Co-Signer.");
  p("SIGNATURES", true);
  uf("Co-Signer Signature", v.coSignerSignature); uf("Print Name", v.coSignerPrintName); uf("Date", v.coSignerDate);
  uf("Landlord Signature", v.landlordSignature); uf("Print Name", v.landlordPrintName); uf("Date", v.landlordDate);
  uf("Tenant Signature (Optional)", v.tenantSignature); uf("Print Name", v.tenantPrintName); uf("Date", v.tenantDate);
  p(`This Agreement shall be signed by ${u(v.signOnBehalfName)} on behalf of ${u(v.onBehalfOfName)} and by all co-signers.`);
  p("Make It Legal", true);
  p(`This Agreement should be signed in front of a notary public by ${u(v.notarySignerName)}. Once signed in front of a notary, this document should be delivered to the appropriate court for filing.`);
  p("Copies: File original with Clerk of Court or deliver to requesting business; maintain a copy in safe place. Additional Assistance: seek legal assistance if uncertain.");
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  doc.save("co_signer_agreement.pdf");
};

export default function CoSignerAgreement() {
  return <FormWizard steps={steps} title="Co-Signer Agreement" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="cosigneragreement" />;
}
