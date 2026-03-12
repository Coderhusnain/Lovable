import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties and Status", fields: [
    { name: "effectiveDate", label: "Effective date", type: "text", required: true },
    { name: "advertiserName", label: "Advertiser name", type: "text", required: true },
    { name: "advertiserEntityType", label: "Advertiser legal status", type: "text", required: true },
    { name: "advertiserState", label: "Advertiser organization state", type: "text", required: true },
    { name: "advertiserAddress", label: "Advertiser principal office", type: "text", required: true },
    { name: "advertiserBusiness", label: "Advertiser business", type: "text", required: true },
    { name: "agencyName", label: "Agency name", type: "text", required: true },
    { name: "agencyEntityType", label: "Agency legal status", type: "text", required: true },
    { name: "agencyState", label: "Agency organization state", type: "text", required: true },
    { name: "agencyAddress", label: "Agency principal office", type: "text", required: true },
  ]},
  { label: "Scope and Products", fields: [
    { name: "productsCovered", label: "Products/services covered", type: "textarea", required: true },
    { name: "exclusivityScope", label: "Exclusivity scope in U.S.", type: "text", required: true },
  ]},
  { label: "Compensation", fields: [
    { name: "mediaCommissionPercent", label: "Media commission percent", type: "text", required: true },
    { name: "outdoorCommissionPercent", label: "Outdoor commission percent", type: "text", required: true },
    { name: "thirdPartyCommissionPercent", label: "Third-party services commission percent", type: "text", required: true },
  ]},
  { label: "Term and Defaults", fields: [
    { name: "servicesCommencementDate", label: "Services commencement date", type: "text", required: true },
    { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: true },
    { name: "defaultCureDays", label: "Default cure days", type: "text", required: true },
  ]},
  { label: "Insurance and Law", fields: [
    { name: "insuranceLimit", label: "Agency liability insurance minimum", type: "text", required: true },
    { name: "governingLaw", label: "Governing law", type: "text", required: true },
  ]},
  { label: "Signatories", fields: [
    { name: "signedByAdvertiser", label: "Advertiser signatory", type: "text", required: true },
    { name: "signedByAgency", label: "Agency signatory", type: "text", required: true },
    { name: "advertiserDate", label: "Advertiser date", type: "text", required: true },
    { name: "agencyDate", label: "Agency date", type: "text", required: true },
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

  const title = "ADVERTISING AGENCY AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.4); doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title); doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2); y += 9;

  p(`This Advertising Agency Agreement is made effective on ${u(v.effectiveDate)} by and between ${u(v.advertiserName)} ("Advertiser") and ${u(v.agencyName)} ("Agency").`);
  p("1-3. Legal Status and Appointment", true);
  p(`Advertiser is a ${u(v.advertiserEntityType)} duly organized and in good standing under laws of ${u(v.advertiserState)}, principal office ${u(v.advertiserAddress)}, engaged in ${u(v.advertiserBusiness)}. Agency is a ${u(v.agencyEntityType)} organized under laws of ${u(v.agencyState)}, principal office ${u(v.agencyAddress)}, providing advertising agency services for fee. Advertiser appoints Agency to represent Advertiser advertising program under this Agreement.`);
  p("4. Agency Services", true);
  p("Agency may study/analyze advertiser business and markets, develop advertising program, counsel merchandising, measure advertising impact, plan/create/copy/layout, analyze media, contract media/services on favorable terms, monitor proper performance/placement/quality, arrange talent/production materials, make timely payments, maintain records and bill remittances, cooperate on tax advantages, and insert copyright notices.");
  p("5-8. Products, Prior Approval, Exclusivity, Costs", true);
  p(`Products/services covered: ${u(v.productsCovered, 20)}. Agency shall not incur obligations or provide services without prior written Advertiser approval and written proposals with full description and estimates. Agency is exclusive U.S. advertising agency with respect to ${u(v.exclusivityScope)}. Advertiser reimburses approved media/costs/direct costs/travel and pays increases (or receives credits) from estimate changes.`);
  p("9. Agency Compensation", true);
  p(`Agency commission: ${u(v.mediaCommissionPercent)}% of media gross charges (except outdoor), outdoor commission ${u(v.outdoorCommissionPercent)}%, and ${u(v.thirdPartyCommissionPercent)}% of third-party charges for approved implementation. Non-commission items billed hourly. Special projects require cost estimates.`);
  p("10-14. Termination, Assignment, Property, Competitors", true);
  p(`Agreement starts on Effective Date; services begin ${u(v.servicesCommencementDate)}; either party may terminate with ${u(v.terminationNoticeDays)} days written notice with obligations continuing during notice period. Agency completes approved in-progress work and new work stops after notice unless mutually agreed. Agency assigns to Advertiser rights in third-party contracts made for Advertiser account where assignable. Advertiser owns paid-for plans/sketches/copy/artwork/materials; on termination unpaid materials remain Agency property. Agency may accept non-competitive client work.`);
  p("15-21. Estimates, Audit, Ownership, Default, Force Majeure, Billing, Indemnity/Insurance", true);
  p(`Agency shall not begin work without estimated prep/production costs and approval. Advertiser may inspect relevant contracts/accounts/documents at Advertiser expense. Advertiser owns rights (including IP/copyright) in materials created for Advertiser. Written default notice required; cure period ${u(v.defaultCureDays)} days before termination. Force majeure suspends performance. Billing follows AAAA standards with itemized commissions/adjustments. Advertiser indemnifies Agency for covered advertising claims; Agency maintains advertising liability insurance not less than $${u(v.insuranceLimit)} naming Advertiser additional insured.`);
  p("22-27. Arbitration, Entire Agreement, Severability, Governing Law, Fees, Signatories", true);
  p(`Disputes are binding arbitration under commercial rules with each party selecting one arbitrator and those two selecting a third; no punitive damages and no contract modification by arbitrators; award final and binding. Entire agreement supersedes prior understandings. Invalid provisions severed and limited to enforceable extent. Governing law: ${u(v.governingLaw)}. Prevailing party entitled to reasonable attorneys' fees.`);
  uf("The Advertiser", v.signedByAdvertiser); uf("Date", v.advertiserDate);
  uf("The Agency", v.signedByAgency); uf("Date", v.agencyDate);
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  doc.save("advertising_agency_agreement.pdf");
};

export default function AdvertisingAgency() {
  return <FormWizard steps={steps} title="Advertising Agency Agreement" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="advertisingagency" />;
}
