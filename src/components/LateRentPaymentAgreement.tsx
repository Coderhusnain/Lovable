import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State / Province", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
  ]},
  { label: "Parties", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "landlordName", label: "Landlord full name", type: "text", required: true },
    { name: "landlordAddress", label: "Landlord address", type: "text", required: true },
    { name: "tenantName", label: "Tenant full name", type: "text", required: true },
    { name: "tenantAddress", label: "Tenant address", type: "text", required: true },
  ]},
  { label: "Premises and Debt", fields: [
    { name: "premisesAddress", label: "Rental property address", type: "text", required: true },
    { name: "arrearsAmount", label: "Past due rent amount", type: "text", required: true },
    { name: "finalPaymentDate", label: "Final payment date (Pay Date)", type: "date", required: true },
  ]},
  { label: "Payment Plan", fields: [
    { name: "goodFaithPayment", label: "Good faith payment on signing", type: "text", required: true },
    { name: "installmentCount", label: "Number of installments", type: "text", required: true },
    { name: "installmentAmount", label: "Installment amount", type: "text", required: true },
    { name: "paymentDates", label: "Installment payment dates", type: "text", required: true },
  ]},
  { label: "Default and Forbearance", fields: [
    { name: "vacateOnDefaultText", label: "Vacate on default text", type: "text", required: true },
    { name: "removeBelongingsDays", label: "Days to remove belongings after Pay Date", type: "text", required: true },
    { name: "forbearanceText", label: "Forbearance wording", type: "text", required: true },
  ]},
  { label: "Acknowledgments", fields: [
    { name: "debtAcknowledgmentText", label: "Debt acknowledgment wording", type: "text", required: true },
    { name: "entireAgreementText", label: "Entire agreement wording", type: "text", required: true },
  ]},
  { label: "Execution", fields: [
    { name: "landlordSignDate", label: "Landlord signature date", type: "date", required: true },
    { name: "tenantSignDate", label: "Tenant signature date", type: "date", required: true },
  ]},
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  let y = 20;
  const left = 20;
  const right = 190;
  const pageH = 280;
  const u = (v?: string, l = 22) => (v && String(v).trim() ? String(v).trim() : "_".repeat(l));
  const ensure = (n = 10) => {
    if (y + n > pageH) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (t: string, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(t, right - left);
    ensure(lines.length * 6 + 2);
    doc.text(lines, left, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "LATE RENT PAYMENT AGREEMENT";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;
  doc.setFontSize(12);
  p(`This Late Rent Payment Agreement is entered into on ${u(values.effectiveDate)} by and between ${u(values.landlordName)} of ${u(values.landlordAddress)} ("Landlord"), and ${u(values.tenantName)} of ${u(values.tenantAddress)} ("Tenant").`);
  p(`WHEREAS, Tenant leases ${u(values.premisesAddress)} and is in arrears in the amount of $${u(values.arrearsAmount, 8)}.`);
  p(`WHEREAS, Tenant agrees to satisfy the total amount due no later than ${u(values.finalPaymentDate)} and to continue paying all current and future rent.`);
  p("NOW, THEREFORE, the Parties agree as follows:", true);
  p("1. Payment Obligations", true);
  p(`Initial payment: $${u(values.goodFaithPayment, 8)} upon signing; ${u(values.installmentCount, 3)} installment(s) of $${u(values.installmentAmount, 8)} payable on ${u(values.paymentDates)}; and ongoing payment of all current and future rent.`);
  p("2. Default and Termination", true);
  p(`${u(values.vacateOnDefaultText)} Tenant shall remove personal belongings within ${u(values.removeBelongingsDays, 3)} days following Pay Date.`);
  p("3. Forbearance by Landlord", true);
  p(u(values.forbearanceText));
  p("4. Acknowledgment of Debt", true);
  p(u(values.debtAcknowledgmentText));
  p("5. Entire Agreement", true);
  p(u(values.entireAgreementText));
  y += 6;
  p(`Landlord: ${u(values.landlordName)}    Date: ${u(values.landlordSignDate)}`);
  p(`Tenant: ${u(values.tenantName)}    Date: ${u(values.tenantSignDate)}`);
  doc.save("late_rent_payment_agreement.pdf");
};

export default function LateRentPaymentAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Late Rent Payment Agreement"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="laterentpaymentagreement"
    />
  );
}
