import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "effectiveDate", label: "Effective date", type: "text", required: true },
    { name: "recipientName", label: "Recipient name", type: "text", required: true },
    { name: "recipientAddress", label: "Recipient address", type: "text", required: true },
    { name: "providerName", label: "Service provider name", type: "text", required: true },
    { name: "providerAddress", label: "Service provider address", type: "text", required: true },
  ]},
  { label: "Services and Payment", fields: [
    { name: "serviceStartDate", label: "Services start date", type: "text", required: true },
    { name: "servicesDescription", label: "Services description", type: "textarea", required: true },
    { name: "standardRate", label: "Standard hourly rate", type: "text", required: true },
    { name: "additionalRate", label: "Additional services hourly rate", type: "text", required: true },
  ]},
  { label: "Term and Termination", fields: [
    { name: "terminationDate", label: "Termination date", type: "text", required: true },
    { name: "earlyTerminationNoticeDays", label: "Early termination notice days", type: "text", required: true },
    { name: "defaultCureDays", label: "Default cure days", type: "text", required: true },
  ]},
  { label: "Dispute and Liability", fields: [
    { name: "arbitrationLocation", label: "Arbitration location", type: "text", required: true },
    { name: "governingLaw", label: "Governing law", type: "text", required: true },
  ]},
  { label: "Signatures", fields: [
    { name: "recipientSign", label: "Recipient signature name", type: "text", required: true },
    { name: "recipientDate", label: "Recipient date", type: "text", required: true },
    { name: "providerSign", label: "Service provider signature name", type: "text", required: true },
    { name: "providerDate", label: "Service provider date", type: "text", required: true },
  ]},
  { label: "Review", fields: [
    { name: "reviewNote", label: "Review note (optional)", type: "text", required: false },
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

  const title = "ADMINISTRATIVE SERVICES CONTRACT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.4); doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title); doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2); y += 9;

  p(`This Administrative Services Contract is effective as of ${u(v.effectiveDate)}, by and between Recipient ${u(v.recipientName)} of ${u(v.recipientAddress)} and Service Provider ${u(v.providerName)} of ${u(v.providerAddress)}.`);
  p("1. Description of Services", true);
  p(`Beginning on ${u(v.serviceStartDate)}, Service Provider shall provide administrative support and related services including but not limited to: ${u(v.servicesDescription, 20)}. Services shall be professional, prompt, and per industry standards.`);
  p("2. Mutual Obligations of the Parties", true);
  p("Parties shall designate key individuals, hold periodic meetings, cooperate with reasonable assistance/information requests, execute necessary documents/actions, and use best efforts to resolve issues timely.");
  p("3. Payment Terms", true);
  p(`Standard fee: $${u(v.standardRate)} per hour. Additional services not listed: $${u(v.additionalRate)} per hour. Invoices payable according to agreed billing schedule.`);
  p("4-5. Term and Termination", true);
  p(`Contract remains in effect until ${u(v.terminationDate)} unless terminated earlier. Either party may terminate without cause with ${u(v.earlyTerminationNoticeDays)} days written notice and provider is paid pro-rated services to effective date. Material default includes non-payment, insolvency/bankruptcy, seizure/assignment, or service failure; written notice required; defaulting party has ${u(v.defaultCureDays)} days to cure before automatic termination unless waived.`);
  p("6-12. Relationship, Ownership, Confidentiality, Insurance, Indemnification, Remedies, Force Majeure", true);
  p("Service Provider is independent contractor (not employee). Work product created under services is exclusive Recipient property. Provider must maintain confidentiality and return Recipient materials at termination. Provider obtains insurance and waives injury recovery from Recipient for provider negligence. Provider indemnifies Recipient for provider acts/omissions. Remedies and force majeure apply as drafted.");
  p("13-23. Arbitration, Fees, Limitation, Entire Contract, Severability, Notice, Waiver, Assignment, Amendment, Governing Law, Signatories", true);
  p(`All disputes are binding AAA commercial arbitration at ${u(v.arbitrationLocation)}. Prevailing party recovers attorneys' fees/costs. Limitation of liability excludes indirect/incidental/consequential/special/exemplary damages. Entire agreement, severability, notice, waiver, assignment, amendment clauses apply. Governing law: ${u(v.governingLaw)}.`);
  uf("Recipient", v.recipientSign); uf("Date", v.recipientDate);
  uf("Service Provider", v.providerSign); uf("Date", v.providerDate);
  if (v.reviewNote) p(`Review note: ${v.reviewNote}`);
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  doc.save("administrative_services_contract.pdf");
};

export default function AdministrativeServicesContractForm() {
  return <FormWizard steps={steps} title="Administrative Services Contract" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="administrativeservicescontract" />;
}
