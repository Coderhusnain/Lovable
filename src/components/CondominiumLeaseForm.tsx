import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties and Premises", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "landlordName", label: "Landlord name", type: "text", required: true },
    { name: "tenantName", label: "Tenant name", type: "text", required: true },
    { name: "premisesAddress", label: "Premises address", type: "text", required: true },
    { name: "propertyManager", label: "Property manager name", type: "text", required: true },
    { name: "managerContact", label: "Manager contact", type: "text", required: true },
  ]},
  { label: "Term and Rent", fields: [
    { name: "commencementDate", label: "Commencement date", type: "date", required: true },
    { name: "terminationDate", label: "Termination date", type: "date", required: true },
    { name: "monthlyRent", label: "Monthly rent", type: "text", required: true },
    { name: "dueDay", label: "Rent due day", type: "text", required: true },
    { name: "paymentMethods", label: "Accepted payment methods", type: "text", required: true },
    { name: "securityDeposit", label: "Security deposit", type: "text", required: true },
  ]},
  { label: "Occupancy and Use", fields: [
    { name: "occupantsMax", label: "Maximum occupants", type: "text", required: true },
    { name: "guestConsecutiveDays", label: "Guest consecutive day limit", type: "text", required: true },
    { name: "guestAnnualDays", label: "Guest annual day limit", type: "text", required: true },
    { name: "furnishings", label: "Furnishings/appliances provided", type: "textarea", required: true },
    { name: "damagesTable", label: "Damages item/charge list", type: "textarea", required: true },
    { name: "premisesKeys", label: "Premises key count", type: "text", required: true },
    { name: "mailboxKeys", label: "Mailbox key count", type: "text", required: true },
    { name: "unreturnedKeyCharge", label: "Unreturned key charge", type: "text", required: true },
    { name: "lockoutFee", label: "Lockout fee", type: "text", required: true },
  ]},
  { label: "Operations and Utilities", fields: [
    { name: "landlordUtilities", label: "Landlord utility responsibilities", type: "textarea", required: true },
    { name: "returnedCheckFee", label: "Returned check fee", type: "text", required: true },
    { name: "saleTerminationDays", label: "Termination on sale notice days", type: "text", required: true },
    { name: "earlyTerminationDays", label: "Early termination notice days", type: "text", required: true },
    { name: "earlyTerminationFee", label: "Early termination fee", type: "text", required: true },
    { name: "casualtyCostThreshold", label: "Destruction cost threshold", type: "text", required: true },
  ]},
  { label: "Defaults and Legal Clauses", fields: [
    { name: "financialDefaultDays", label: "Financial default cure days", type: "text", required: true },
    { name: "nonFinancialDefaultDays", label: "Non-financial default cure days", type: "text", required: true },
    { name: "landlordNoticeAddress", label: "Landlord notice address", type: "text", required: true },
    { name: "tenantNoticeAddress", label: "Tenant notice address", type: "text", required: true },
    { name: "governingLawState", label: "Governing law state", type: "text", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "landlordSign", label: "Landlord signature name", type: "text", required: true },
    { name: "landlordSignDate", label: "Landlord date", type: "date", required: true },
    { name: "tenantSign", label: "Tenant signature name", type: "text", required: true },
    { name: "tenantSignDate", label: "Tenant date", type: "date", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.1, limit = 282;
  let y = 20;
  const u = (x?: string, n = 12) => (x || "").trim() || "_".repeat(n);
  const ensure = (n = 8) => { if (y + n > limit) { doc.addPage(); y = 20; } };
  const p = (t: string, b = false, g = 1.4) => { const lines = doc.splitTextToSize(t, tw); ensure(lines.length * lh + g); doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(9.8); doc.text(lines, m, y); y += lines.length * lh + g; };
  const uf = (l: string, x?: string) => { ensure(lh + 2); const lt = `${l}: `; doc.text(lt, m, y); const sx = m + doc.getTextWidth(lt); const t = (x || "").trim(); if (t) { doc.text(t, sx, y); doc.line(sx, y + 1, sx + Math.max(18, doc.getTextWidth(t)), y + 1); } else { doc.text("____________________", sx, y); } y += lh + 0.7; };

  const title = "CONDOMINIUM LEASE AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.5); doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title); doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2); y += 9;

  p(`This Condominium Lease Agreement is entered into on ${u(v.effectiveDate)} by and between ${u(v.landlordName)} ("Landlord") and ${u(v.tenantName)} ("Tenant"), collectively the "Parties."`);
  p("1. Premises", true);
  p(`Landlord leases to Tenant the condominium unit at ${u(v.premisesAddress)} together with expressly stated common elements/improvements/fixtures. No additional building portion is included unless written.`);
  p("2. Term", true);
  p(`Lease commences ${u(v.commencementDate)} and terminates ${u(v.terminationDate)}; thereafter month-to-month under same terms unless modified by law/writing. Tenant vacates at termination unless written renewal, rent-control requirement, or Landlord accepts post-term rent creating month-to-month tenancy terminable on 30 days written notice.`);
  p("3. Management", true);
  p(`Designated property manager: ${u(v.propertyManager)}. Communications may be directed to ${u(v.managerContact)}.`);
  p("4-5. Rent and Security Deposit", true);
  p(`Rent includes all monetary obligations except security deposit. Monthly rent is $${u(v.monthlyRent)} due in advance on day ${u(v.dueDay)}; delinquent if not received by next day. Accepted methods: ${u(v.paymentMethods)}. Returned payments may require cash for three months and future money order/cashier's check. Security Deposit: $${u(v.securityDeposit)} per applicable statutes.`);
  p("6-15. Possession, Occupants, Furnishings, Damages, Keys, Lockout, Smoking, Storage, Parking, Maintenance", true);
  p(`Tenant receives possession on commencement and surrenders at lease end with personal items removed and restoration except ordinary wear. Max occupants: ${u(v.occupantsMax)}. Guest limits: ${u(v.guestConsecutiveDays)} consecutive days and ${u(v.guestAnnualDays)} total days annually. Furnishings/appliances: ${u(v.furnishings, 20)}. Damage charges: ${u(v.damagesTable, 20)}. Keys: ${u(v.premisesKeys)} premises / ${u(v.mailboxKeys)} mailbox; unreturned key charge $${u(v.unreturnedKeyCharge)}. Lockout fee: $${u(v.lockoutFee)}. Smoking prohibited. No exterior storage. No parking rights. Written maintenance requests required except emergencies.`);
  p("16-19. Utilities, Taxes, Insurance, Returned Payments", true);
  p(`Landlord responsibilities: ${u(v.landlordUtilities, 20)}. Tenant responsibilities include electricity, water/sewer, gas, heating, trash, telephone, cable, internet. Real estate taxes: Landlord responsibility. Personal property taxes attributable to Tenant use: Landlord pays. Both parties maintain proper insurance. Returned check fee: $${u(v.returnedCheckFee)}.`);
  p("20-24. Default, Sale Termination, Early Termination, Military, Destruction/Condemnation", true);
  p(`Default cure periods: ${u(v.financialDefaultDays)} days financial and ${u(v.nonFinancialDefaultDays)} days non-monetary, plus related legal/administrative costs. Landlord may terminate on bona fide sale with ${u(v.saleTerminationDays)} days notice. Tenant early termination: ${u(v.earlyTerminationDays)} days notice and $${u(v.earlyTerminationFee)} fee subject to law. Active military termination upon 30 days notice with orders. If uninhabitable and unrepaired within 60 days or repair cost exceeds $${u(v.casualtyCostThreshold)}, lease terminates and rent abates.`);
  p("25-45. Remaining Lease Clauses", true);
  p(`Habitability acknowledgment; holdover month-to-month; cumulative rights; improvements only with written consent and restoration/removal as directed; landlord access with notice (emergency without notice); tenant indemnification except landlord gross negligence; disability accommodations; hazardous materials restrictions; legal compliance; mechanic's liens prohibited; subordination to mortgages; assignment/subletting prohibited without written permission; notices to designated addresses with receipt deemed three days after mailing; governing law ${u(v.governingLawState)}; entire agreement; severability and waiver; time of essence; estoppel certificate within 3 days; tenant representations accuracy; binding effect on heirs/successors/assigns; dispute process negotiation then mediation then legal remedies.`);
  p("Notices", true);
  uf("Landlord Address", v.landlordNoticeAddress);
  uf("Tenant Address", v.tenantNoticeAddress);
  p("IN WITNESS WHEREOF, the Parties execute this Lease:", true);
  uf("LANDLORD By", v.landlordSign); uf("Date", v.landlordSignDate);
  uf("TENANT By", v.tenantSign); uf("Date", v.tenantSignDate);
  p(`Jurisdiction: ${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  doc.save("condominium_lease_agreement.pdf");
};

export default function CondominiumLease() {
  return <FormWizard steps={steps} title="Condominium Lease Agreement" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="condominiumlease" />;
}
