import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties and Premises", fields: [
    { name: "agreementDate", label: "Agreement date", type: "date", required: true },
    { name: "landlordName", label: "Landlord full legal name", type: "text", required: true },
    { name: "landlordAddress", label: "Landlord address", type: "text", required: true },
    { name: "ownerName", label: "Billboard owner full legal name", type: "text", required: true },
    { name: "ownerAddress", label: "Billboard owner address", type: "text", required: true },
    { name: "physicalAddress", label: "Premises physical address", type: "text", required: true },
    { name: "legalDescription", label: "Premises legal description", type: "textarea", required: true },
  ]},
  { label: "Term and Rent", fields: [
    { name: "startDate", label: "Term start date", type: "date", required: true },
    { name: "endDate", label: "Term end date", type: "date", required: true },
    { name: "annualRent", label: "Annual rent", type: "text", required: true },
    { name: "monthlyInstallment", label: "Monthly installment", type: "text", required: true },
    { name: "paymentAddress", label: "Payment address", type: "text", required: true },
    { name: "billboardCount", label: "Maximum billboard count", type: "text", required: true },
  ]},
  { label: "Operations", fields: [
    { name: "maintenanceDays", label: "Maintenance cure days after notice", type: "text", required: true },
    { name: "renewalNoticeMonths", label: "Renewal notice months before expiry", type: "text", required: true },
    { name: "landlordCureDays", label: "Landlord termination cure period days", type: "text", required: true },
    { name: "ownerTerminationDays", label: "Billboard owner termination notice days", type: "text", required: true },
  ]},
  { label: "Insurance and Liability", fields: [
    { name: "liabilityLimit", label: "Insurance minimum limit", type: "text", required: true },
  ]},
  { label: "Law and Notices", fields: [
    { name: "governingLawState", label: "Governing law state", type: "text", required: true },
  ]},
  { label: "Signatures", fields: [
    { name: "landlordSign", label: "Landlord signature name", type: "text", required: true },
    { name: "landlordDate", label: "Landlord date", type: "date", required: true },
    { name: "ownerSign", label: "Billboard owner signature name", type: "text", required: true },
    { name: "ownerDate", label: "Billboard owner date", type: "date", required: true },
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

  const title = "BILLBOARD LEASE AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.6); doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title); doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2); y += 9;

  p(`This Billboard Lease Agreement is made as of ${u(v.agreementDate)} by and between ${u(v.landlordName)} of ${u(v.landlordAddress)} ("Landlord") and ${u(v.ownerName)} of ${u(v.ownerAddress)} ("Billboard Owner"), collectively "Parties."`);
  p("1-3. Lease, Premises, Term", true);
  p(`Landlord leases designated area at ${u(v.physicalAddress)} legally described as ${u(v.legalDescription, 20)} solely to erect, operate, and maintain billboard display; exclusive for this purpose while Landlord retains all other property rights. Term commences ${u(v.startDate)} and expires ${u(v.endDate)} unless earlier terminated.`);
  p("4-8. Rent, Use, Access, Electrical, Maintenance", true);
  p(`Rent: $${u(v.annualRent)} per year, payable monthly $${u(v.monthlyInstallment)} in advance on first of each month beginning ${u(v.startDate)} at ${u(v.paymentAddress)} or other designated address. Billboard Owner may construct/maintain no more than ${u(v.billboardCount)} billboard(s). Landlord grants reasonable access for erection/repair/inspection. Billboard Owner bears electrical costs and utility expenses. Billboard Owner maintains display in safe/clean condition and promptly repairs weather/vandalism/graffiti damage; if failure continues ${u(v.maintenanceDays)} days after written notice, Landlord may repair and recover costs or remove display at Billboard Owner expense.`);
  p("9-12. Compliance, Taxes, Condition/Alterations, Ownership of Display", true);
  p("Billboard Owner complies with all applicable laws/regulations/codes at its own expense. Billboard Owner pays taxes/assessments/fees related to display and personal property. Premises accepted as-is and no alterations/improvements without prior written consent. Display remains Billboard Owner personal property (not fixture); on termination/expiry, Owner removes display and restores premises free of debris.");
  p("13. Indemnification and Insurance", true);
  p(`Billboard Owner indemnifies/defends/holds Landlord harmless from claims/losses/liabilities/damages from use/occupancy. Owner maintains CGL insurance naming Landlord additional insured with limits not less than $${u(v.liabilityLimit)}, and fire/casualty coverage for damage caused by display; proof furnished on request and before occupancy.`);
  p("14-18. Renewal, Termination, Notices, Time", true);
  p(`Owner may renew by written notice at least ${u(v.renewalNoticeMonths)} months before expiry; renewal terms by mutual writing. Landlord may terminate for breach uncured within ${u(v.landlordCureDays)} days after written notice and recover lawful damages. Owner may terminate with ${u(v.ownerTerminationDays)} days written notice if law materially restricts billboard use. Notices by personal delivery/certified mail/recognized overnight courier are effective on delivery or attempted delivery. Time is of the essence.`);
  p("19-23. Governing Law, Fees, Entire Agreement, Severability, Amendment", true);
  p(`Governing law: ${u(v.governingLawState)}. Prevailing party recovers reasonable attorneys' fees/costs. Entire agreement supersedes prior oral/written agreements. Invalid provisions are severed. Amendments only by signed writing.`);
  p("IN WITNESS WHEREOF:", true);
  uf("LANDLORD Signature", v.landlordSign); uf("Date", v.landlordDate);
  uf("BILLBOARD OWNER Signature", v.ownerSign); uf("Date", v.ownerDate);
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  doc.save("billboard_lease_agreement.pdf");
};

export default function BillboardLease() {
  return <FormWizard steps={steps} title="Billboard Lease Agreement" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="billboardlease" />;
}
