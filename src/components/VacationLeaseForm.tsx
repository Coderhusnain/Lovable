import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Premises",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "landlordName", label: "Landlord name", type: "text", required: true },
      { name: "tenantName", label: "Tenant name", type: "text", required: true },
      { name: "premisesAddress", label: "Premises address", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: false },
      { name: "state", label: "State", type: "text", required: true },
      { name: "zip", label: "ZIP", type: "text", required: false },
    ],
  },
  {
    label: "Term and Payment",
    fields: [
      { name: "startTime", label: "Start time", type: "text", required: false },
      { name: "startDate", label: "Start date", type: "date", required: true },
      { name: "endTime", label: "End time", type: "text", required: false },
      { name: "endDate", label: "End date", type: "date", required: true },
      { name: "totalRent", label: "Total rent", type: "text", required: false },
      { name: "depositAmount", label: "Reservation deposit", type: "text", required: false },
      { name: "depositDueDate", label: "Reservation deposit due date", type: "date", required: false },
      { name: "remainingBalance", label: "Remaining balance", type: "text", required: false },
      { name: "balanceDueDate", label: "Balance due date", type: "date", required: false },
      { name: "paymentAddress", label: "Payment address", type: "text", required: false },
      { name: "paymentCity", label: "Payment city", type: "text", required: false },
      { name: "paymentState", label: "Payment state", type: "text", required: false },
      { name: "paymentZip", label: "Payment ZIP", type: "text", required: false },
      { name: "securityDeposit", label: "Security deposit", type: "text", required: false },
    ],
  },
  {
    label: "Rules and Checklist",
    fields: [
      { name: "minimumNights", label: "Minimum nights", type: "text", required: false },
      { name: "maxOccupancy", label: "Maximum occupancy", type: "text", required: false },
      { name: "guestAgeLimit", label: "Guest age count threshold", type: "text", required: false },
      { name: "furnishings", label: "Furnishings provided", type: "textarea", required: false },
      { name: "cancellationDays", label: "Cancellation days before arrival", type: "text", required: false },
      { name: "cancellationFee", label: "Cancellation fee", type: "text", required: false },
      { name: "noCancellationDays", label: "No-cancellation window days", type: "text", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "landlordSignDate", label: "Landlord sign date", type: "date", required: false },
      { name: "tenantSignDate", label: "Tenant sign date", type: "date", required: false },
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
  const u = (value?: string, min = 14) => (value || "").trim() || " ".repeat(min);
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
  const title = "VACATION LEASE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Vacation Lease Agreement ("Lease") is made and entered into on ${u(values.agreementDate, 12)} by and between ${u(values.landlordName, 14)} ("Landlord") and ${u(values.tenantName, 14)} ("Tenant"). The parties agree as follows:`, false, 3);
  p("1. Premises", true);
  p("The Landlord, in consideration of the lease payments set forth herein, leases to the Tenant the premises located at:");
  uf("Address", values.premisesAddress, 30);
  uf("City", values.city, 10);
  uf("State", values.state, 10);
  uf("ZIP", values.zip, 10);
  p("2. Term", true);
  p(`Tenant shall have exclusive use and control of the Premises from ${u(values.startTime, 6)} on ${u(values.startDate, 12)} through ${u(values.endTime, 6)} on ${u(values.endDate, 12)}.`);
  p("3. Lease Payments", true);
  p(`The total rent due for the Lease term is $${u(values.totalRent, 8)}, payable in advance. A non-refundable deposit of $${u(values.depositAmount, 8)} shall be paid by ${u(values.depositDueDate, 12)} to secure reservation and applied to total rental amount.`);
  p(`The remaining balance of $${u(values.remainingBalance, 8)} is due no later than ${u(values.balanceDueDate, 12)}.`);
  p("Payments shall be made to the Landlord at:");
  uf("Address", values.paymentAddress, 26);
  uf("City", values.paymentCity, 10);
  uf("State", values.paymentState, 10);
  uf("ZIP", values.paymentZip, 10);
  p("(Note: This address may be updated by written notice from the Landlord.)");
  p("4. Security Deposit", true);
  p(`At signing, Tenant shall pay security deposit of $${u(values.securityDeposit, 8)} held in trust by Landlord to cover damages/defaults as allowed by law.`);
  p("5. Possession", true);
  p("Tenant shall take possession on Lease start date and vacate on end date unless otherwise agreed in writing, returning Premises clean and undamaged, normal wear and tear excepted.");
  p("6. Minimum Stay", true);
  p(`A minimum stay of ${u(values.minimumNights, 4)} night(s) is required; longer minimums may apply during holidays.`);
  p("7. Use of Premises & Absences", true);
  p("Tenant shall use Premises solely as residential dwelling, notify Landlord of extended absence, and maintain Premises in clean/good condition.");
  p("8. Occupancy", true);
  p(`Maximum occupancy is limited to ${u(values.maxOccupancy, 4)} persons. All guests over age ${u(values.guestAgeLimit, 4)} count toward occupancy limits. Misrepresentation/exceeding occupancy may result in immediate eviction without refund.`);
  p("9. Furnishings", true);
  p(`The following furnishings are provided: ${u(values.furnishings, 18)}. Tenant shall return them in original condition, less reasonable wear.`);
  p("10. Insurance", true);
  p("Both parties are responsible for insuring their respective interests. Tenant is advised to carry travel and personal property insurance.");
  p("11. Non-Disturbance Clause", true);
  p("Tenant and guests shall not disturb or endanger neighbours or engage in unlawful activities on Premises.");
  p("12. Cancellation Policy", true);
  p("(a) If Premises become unavailable before occupancy, Landlord refunds all amounts paid.");
  p(`(b) If Tenant cancels more than ${u(values.cancellationDays, 4)} days before arrival, refund issued minus cancellation fee of $${u(values.cancellationFee, 6)}.`);
  p(`Cancellations ${u(values.cancellationDays, 4)} days or fewer before arrival result in forfeiture unless Premises is re-rented; if re-rented, refund minus cancellation fee applies.`);
  p(`(c) No cancellations within ${u(values.noCancellationDays, 4)} days of arrival. Failure to pay final balance is treated as cancellation.`);
  p("13. Smoking", true);
  p("Smoking is strictly prohibited indoors. Outdoor smoking only in designated areas. Violations may result in eviction, forfeiture, and cleaning fees.");
  p("14. Cooking", true);
  p("Cooking is restricted to designated areas. Open flames are only allowed in grills, outdoor fireplaces, or stone hearths and must never be left unattended.");
  p("15. Cleaning", true);
  p("Tenant must leave Premises in good condition. Rental fee includes linen laundry; Tenant is responsible for dishes and unit tidiness.");
  p("16. Holdover", true);
  p("If Tenant remains after Lease ends, rent continues at most recent monthly rate, creating month-to-month tenancy.");
  p("17. Cumulative Rights", true);
  p("All rights provided are cumulative and do not exclude rights granted by law.");
  p("18. Casualty or Destruction", true);
  p("If Premises are destroyed before occupancy by disaster/environmental cause, Lease is void and payments refunded. If destruction occurs during occupancy, prorated refund may be negotiated; no refund for inclement weather.");
  p("19. Notices", true);
  p("All notices must be in writing and sent by prepaid mail to addresses provided by both parties; notices deemed received three (3) days after mailing.");
  p("20. Governing Law", true);
  p(`This Lease shall be governed by the laws of the State of ${u(values.governingState, 12)}.`);
  p("21. Entire Agreement", true);
  p("This document represents the full agreement between the parties.");
  p("22. Amendments", true);
  p("This Lease may only be modified by written document signed by both parties.");
  p("23. Severability", true);
  p("If any provision is invalid, remaining provisions remain in effect.");
  p("24. Waiver", true);
  p("Failure to enforce any part of this Lease does not waive the right to enforce later.");
  p("25. Binding Effect", true);
  p("This Lease binds and benefits parties, heirs, successors, and assigns.");
  p("26. Dispute Resolution", true);
  p("Disputes shall first be resolved through good faith negotiation, then mediation before legal remedies.");
  p("27. Cause for Eviction", true);
  p("Tenant may be evicted for Lease violations, including unauthorized occupancy, pets, noise, smoking, or damage.");
  p("28. Attorney's Fees", true);
  p("Tenant shall pay reasonable attorney's fees and costs if Landlord enforces this Lease.");
  p("29. Acknowledgment", true);
  p("The parties acknowledge they have read and agree to this Lease.");
  p("Landlord Signature: _______________________");
  uf("Date", values.landlordSignDate, 14);
  p("Tenant Signature: _________________________");
  uf("Date", values.tenantSignDate, 14);

  p("VACATION LEASE INSPECTION CHECKLIST", true, 2.5);
  p("Tenant affirms Premises is in satisfactory condition unless noted below:");
  p("Bathrooms / Carpeting / Ceilings / Closets / Dishwasher / Disposal / Doors / Fireplace / Lights / Locks / Refrigerator / Screens / Stove");
  p("Tenant's Acknowledgment (initial): (c) ____ Received all required information. (d) ____ Received lead safety pamphlet.");
  p("Certification of Accuracy: We, the undersigned, certify that the information disclosed is true and complete to the best of our knowledge.");
  p("Landlord/Agent Signature: _______________________ Date: __________");
  p("Tenant Signature: _____________________________ Date: __________");

  doc.save("vacation_lease_agreement.pdf");
};

export default function VacationLeaseForm() {
  return (
    <FormWizard
      steps={steps}
      title="Vacation Lease Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="vacationlease"
    />
  );
}
