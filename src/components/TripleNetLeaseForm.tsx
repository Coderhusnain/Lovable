import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Premises",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "landlordName", label: "Landlord full legal name", type: "text", required: true },
      { name: "landlordAddress", label: "Landlord mailing address", type: "text", required: true },
      { name: "tenantName", label: "Tenant full legal name", type: "text", required: true },
      { name: "tenantAddress", label: "Tenant mailing address", type: "text", required: true },
      { name: "premisesAddress", label: "Full property address", type: "text", required: true },
    ],
  },
  {
    label: "Term and Financials",
    fields: [
      { name: "startDate", label: "Lease start date", type: "date", required: true },
      { name: "endDate", label: "Lease end date", type: "date", required: true },
      { name: "monthlyRent", label: "Monthly base rent", type: "text", required: false },
      { name: "paymentAddress", label: "Rent payment address", type: "text", required: false },
      { name: "securityDeposit", label: "Security deposit amount", type: "text", required: false },
      { name: "casualtyCoverageAmount", label: "Casualty insurance amount", type: "text", required: false },
      { name: "liabilityCoverageAmount", label: "Liability insurance amount", type: "text", required: false },
      { name: "landlordSaleTerminationDays", label: "Landlord sale termination days", type: "text", required: false },
      { name: "tenantTerminationDays", label: "Tenant termination notice days", type: "text", required: false },
      { name: "terminationFeeMonths", label: "Tenant termination fee (months rent)", type: "text", required: false },
      { name: "defaultCureDays", label: "Default cure days", type: "text", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "landlordSignerName", label: "Landlord signer name", type: "text", required: false },
      { name: "landlordSignerDate", label: "Landlord sign date", type: "date", required: false },
      { name: "tenantSignerName", label: "Tenant signer name", type: "text", required: false },
      { name: "tenantSignerDate", label: "Tenant sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.5;
  const limit = 280;
  let y = 20;
  const u = (value?: string, min = 16) => (value || "").trim() || " ".repeat(min);
  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "TRIPLE NET LEASE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Triple Net Lease Agreement ("Agreement" or "Lease") is made and entered into as of ${u(values.agreementDate, 12)}, by and between ${u(values.landlordName, 16)}, whose mailing address is ${u(values.landlordAddress, 18)} ("Landlord"), and ${u(values.tenantName, 16)}, whose mailing address is ${u(values.tenantAddress, 18)} ("Tenant"). The Landlord and the Tenant may collectively be referred to as the "Parties" and individually as a "Party."`, false, 3);

  p("1. Premises", true);
  p(`The Landlord hereby leases to the Tenant, and the Tenant hereby leases from the Landlord, the real property, building, and improvements located at ${u(values.premisesAddress, 20)} (the "Premises"), subject to the terms and conditions set forth herein.`);
  p("2. Term", true);
  p(`The term of this Lease shall commence on ${u(values.startDate, 12)} and shall continue through ${u(values.endDate, 12)} (the "Term"), unless sooner terminated pursuant to the provisions herein. Either Party may terminate this Lease by providing at least thirty (30) days' prior written notice, which must coincide with the end of a calendar month.`);
  p("3. Triple Net Lease", true);
  p("This Lease is a Triple Net Lease, meaning the Tenant shall be solely responsible for all expenses associated with the Premises, including but not limited to real estate taxes, property insurance, repairs and maintenance, utilities, common area maintenance (CAM), and any other costs associated with operation, use, or occupancy of the Premises. It is the intention of the Parties that the Landlord shall have no obligation to incur expenses related to the Premises during the Term.");
  p("4. Rent", true);
  p(`The Tenant agrees to pay monthly base rent of $${u(values.monthlyRent, 8)}, payable in advance on or before the first day of each calendar month, at ${u(values.paymentAddress, 18)} or such other address designated by the Landlord.`);
  p("5. Additional Charges (Estimated Payments)", true);
  p("In addition to base rent, Tenant shall pay estimated monthly charges for taxes, insurance premiums, and maintenance costs. Estimates may be updated from time to time and billed monthly with rent. Actual expenses shall be reconciled quarterly, and overpayment/underpayment refunded or invoiced.");
  p("6. Security Deposit", true);
  p(`Upon execution, Tenant shall deposit $${u(values.securityDeposit, 8)} as Security Deposit, to be held as security for faithful performance and returned at lease expiration less lawful deductions.`);
  p("7. Possession and Condition", true);
  p("Tenant shall take possession on commencement date and surrender on expiration/termination in good order, condition, and repair, broom-cleaned and free of personal property/debris, reasonable wear and tear excepted.");
  p("8. Alterations and Improvements", true);
  p("Tenant shall not make alterations, additions, or improvements without prior written consent of Landlord, not to be unreasonably withheld. All such work shall comply with applicable laws at Tenant's sole expense.");
  p("9. Insurance", true);
  p(`Tenant shall maintain casualty insurance not less than $${u(values.casualtyCoverageAmount, 8)} and general liability insurance of at least $${u(values.liabilityCoverageAmount, 8)}. Landlord shall be additional insured, and certificates shall be delivered to Landlord with 30 days' cancellation/material change notice.`);
  p("10. Maintenance and Utilities", true);
  p("Tenant shall maintain all structural components, systems, and exterior areas in good order and repair, and pay all utility/service charges including water, sewer, electricity, gas, telephone, trash, and related services.");
  p("11. Taxes", true);
  p("Tenant shall pay all real property and personal property taxes levied against the Premises or arising from its use thereof. Tenant may contest taxes at its own expense, provided such contest does not subject Premises to lien or forfeiture.");
  p("12. Termination", true);
  p(`Landlord may terminate on sale by giving ${u(values.landlordSaleTerminationDays, 4)} days' notice. Tenant may terminate with ${u(values.tenantTerminationDays, 4)} days' prior written notice and payment of termination fee equal to ${u(values.terminationFeeMonths, 4)} months' rent.`);
  p("13. Casualty or Condemnation", true);
  p("If Premises are materially impaired by casualty and not repairable within sixty (60) days, either Party may terminate upon twenty (20) days' notice. Any prepaid rent shall be prorated and refunded.");
  p("14. Default and Remedies", true);
  p(`Tenant defaults by failure to perform any obligation and failure to cure within ${u(values.defaultCureDays, 4)} days after written notice. On default, Landlord may terminate, retake possession, and pursue legal/equitable remedies.`);
  p("15. Indemnification", true);
  p("Tenant shall indemnify, defend, and hold harmless Landlord from claims, damages, or liabilities arising from Tenant's occupancy/use/maintenance, except those caused by Landlord's willful misconduct or negligence.");
  p("16. Hazardous Materials", true);
  p("Tenant shall not bring/store hazardous materials except reasonably required for business and in compliance with environmental law; Tenant shall remediate spills/releases and indemnify Landlord for related liabilities.");
  p("17. Dispute Resolution", true);
  p("Parties shall first negotiate in good faith, then mediate unresolved disputes, and if mediation fails may pursue legal remedies under applicable law.");
  p("18. Assignment and Subletting", true);
  p("Tenant shall not assign this Lease or sublease without Landlord's prior written consent, not to be unreasonably withheld.");
  p("19. Notices", true);
  p("Notices shall be in writing and delivered personally or by certified mail, return receipt requested, to addresses listed in this Lease or other designated addresses.");
  p("20. Governing Law", true);
  p(`This Lease shall be governed by and construed in accordance with the laws of the State of ${u(values.governingState, 14)}.`);
  p("21. Entire Agreement", true);
  p("This Lease constitutes the entire agreement between the Parties regarding the subject matter and supersedes all prior agreements or understandings.");
  p("22. Amendment", true);
  p("This Lease may only be amended in writing signed by both Parties.");
  p("23. Severability", true);
  p("If any provision is invalid or unenforceable, the remaining provisions remain in full force and effect.");
  p("24. Waiver", true);
  p("No waiver of any term/condition is a continuing waiver or waiver of any other term/condition.");
  p("25. Binding Effect", true);
  p("This Lease binds and inures to benefit of Parties and their successors, legal representatives, and permitted assigns.");
  p("IN WITNESS WHEREOF, the Parties have executed this Lease as of the date first above written.");
  p("Landlord:");
  uf("Name", values.landlordSignerName || values.landlordName, 24);
  p("Signature: ___________________________");
  uf("Date", values.landlordSignerDate, 14);
  p("Tenant:");
  uf("Name", values.tenantSignerName || values.tenantName, 24);
  p("Signature: ___________________________");
  uf("Date", values.tenantSignerDate, 14);

  doc.save("triple_net_lease_agreement.pdf");
};

export default function TripleNetLeaseForm() {
  return (
    <FormWizard
      steps={steps}
      title="Triple Net Lease Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="triplenetlease"
    />
  );
}
