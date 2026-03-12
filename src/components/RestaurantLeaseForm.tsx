import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Parties and Premises",
    fields: [
      { name: "agreementDate", label: "Agreement Date", type: "date", required: true },
      { name: "landlordName", label: "Landlord Name", type: "text", required: true },
      { name: "landlordAddress", label: "Landlord Address", type: "textarea", required: true },
      { name: "tenantName", label: "Tenant Name", type: "text", required: true },
      { name: "tenantAddress", label: "Tenant Address", type: "textarea", required: true },
      { name: "restaurantName", label: "Restaurant Name / Unit Number", type: "text", required: true },
      { name: "premisesAddress", label: "Premises Address", type: "textarea", required: true },
      { name: "legalDescription", label: "Legal Description", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 2: Lease Term and Rent",
    fields: [
      { name: "startDate", label: "Lease Start Date", type: "date", required: true },
      { name: "endDate", label: "Lease End Date", type: "date", required: true },
      { name: "monthlyRent", label: "Monthly Rent Amount", type: "text", required: true },
      { name: "paymentAddress", label: "Rent Payment Address", type: "textarea", required: true },
      { name: "securityDeposit", label: "Security Deposit Amount", type: "text", required: true },
    ],
  },
  {
    label: "Step 3: Use and Operations",
    fields: [
      { name: "furnishings", label: "Furnishings List", type: "textarea", required: true },
      { name: "parkingSpaces", label: "Customer/Guest Parking Spaces", type: "text", required: true },
      { name: "storageArea", label: "Storage Area", type: "text", required: true },
    ],
  },
  {
    label: "Step 4: Insurance and Renewal",
    fields: [
      { name: "liabilityInsurance", label: "Liability Insurance Minimum", type: "text", required: true },
      { name: "renewalDuration", label: "Renewal Term Duration", type: "text", required: true },
      { name: "nonRenewalNoticeDays", label: "Non-Renewal Notice Days", type: "text", required: true },
      { name: "renewalRent", label: "Renewal Rent", type: "text", required: true },
    ],
  },
  {
    label: "Step 5: Defaults and Fees",
    fields: [
      { name: "saleTerminationDays", label: "Termination Upon Sale Notice Days", type: "text", required: true },
      { name: "repairCostThreshold", label: "Repair Cost Threshold", type: "text", required: true },
      { name: "lateFeeDays", label: "Late Payment Grace Days", type: "text", required: true },
      { name: "lateFeeAmount", label: "Late Fee Amount", type: "text", required: true },
      { name: "returnedCheckFee", label: "Returned Check Fee", type: "text", required: true },
    ],
  },
  {
    label: "Step 6: Governing Law and Notices",
    fields: [
      { name: "governingState", label: "Governing Law State", type: "text", required: true },
      { name: "landlordNoticeAddress", label: "Landlord Notice Address", type: "textarea", required: true },
      { name: "tenantNoticeAddress", label: "Tenant Notice Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Step 7: Signatures",
    fields: [
      { name: "landlordSign", label: "Landlord Signature Name", type: "text", required: true },
      { name: "landlordSignDate", label: "Landlord Signature Date", type: "date", required: true },
      { name: "tenantSign", label: "Tenant Signature Name", type: "text", required: true },
      { name: "tenantSignDate", label: "Tenant Signature Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const m = 16;
  const tw = 178;
  const lh = 5.15;
  let y = 18;
  const u = (val?: string, n = 12) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const p = (text: string, bold = false, gap = 1.35) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > 286) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "RESTAURANT LEASE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 8;

  p(`This Lease Agreement ("Lease") is entered into on ${u(v.agreementDate, 10)}, by and between ${u(v.landlordName)} ("Landlord"), ${u(v.landlordAddress)}, and ${u(v.tenantName)} ("Tenant"), ${u(v.tenantAddress)}. Landlord and Tenant may collectively be referred to as the "Parties."`);
  p("1. Leased Premises", true);
  p(`Landlord hereby leases to Tenant the restaurant space known as ${u(v.restaurantName)}, located at ${u(v.premisesAddress)} (the "Restaurant"), in consideration of the lease payments and covenants set forth herein.`);
  p("2. Legal Description", true);
  p(`The legal description of the Restaurant is as follows: ${u(v.legalDescription)}.`);
  p("3. Term", true);
  p(`The term of this Lease shall commence on ${u(v.startDate, 10)} and shall expire on ${u(v.endDate, 10)}, unless extended or terminated earlier in accordance with this Lease.`);
  p("4. Rent", true);
  p(`Tenant agrees to pay monthly rent in the amount of $${u(v.monthlyRent, 4)}, payable in advance on or before the first day of each month. All rental payments shall be delivered to Landlord at ${u(v.paymentAddress)} or other designated address.`);
  p("5. Security Deposit", true);
  p(`Upon execution of this Lease, Tenant shall pay Landlord a security deposit of $${u(v.securityDeposit, 4)}, to be held in trust for performance of Tenant obligations and to cover damages beyond normal wear and tear.`);
  p("6. Possession", true);
  p("Tenant shall take possession on first day of Lease term and vacate/return possession at end of term unless otherwise agreed in writing. Upon expiration/termination, Tenant shall remove personal property and surrender premises in good condition, reasonable wear and tear excepted.");
  p("7. Use of Premises", true);
  p("Tenant shall use premises solely for operating a restaurant or coffee shop business and related incidental purposes. Sale of alcoholic beverages is prohibited except beer and wine and only if properly licensed. Other use requires Landlord prior written consent.");
  p("8. Furnishings", true);
  p(`Furnishings provided: ${u(v.furnishings)}. Tenant shall return furnishings in same condition as received, normal wear and tear excepted.`);
  p("9. Parking", true);
  p(`Tenant is entitled to use ${u(v.parkingSpaces, 1)} parking spaces for customers and guests, and exclusive designated carry-out spaces as assigned by Landlord. Tenant is responsible for monitoring/enforcement.`);
  p("10. Signage and Awnings", true);
  p("Tenant shall install signage and awnings at own expense subject to Landlord prior approval of design/location/aesthetics, maintain them in good condition, and remove/repair on lease termination.");
  p("11. Quiet Enjoyment", true);
  p("Landlord warrants good title and legal right to lease. Tenant is entitled to quiet enjoyment while in compliance with Lease.");
  p("12. Storage", true);
  p(`Tenant may store personal property in ${u(v.storageArea)} at own risk. Landlord shall not be liable for stored property loss/damage.`);
  p("13. Insurance", true);
  p(`Property insurance maintained by each party for respective property/interests. Tenant names Landlord as additional insured. Tenant shall maintain commercial general liability insurance with combined single limit at least $${u(v.liabilityInsurance, 4)} naming Landlord as additional insured.`);
  p("14. Renewal", true);
  p(`Lease renews automatically for successive terms of ${u(v.renewalDuration)} unless either party gives written notice of non-renewal at least ${u(v.nonRenewalNoticeDays, 2)} days before current term expiration. Renewal rent shall be $${u(v.renewalRent, 4)} per period unless otherwise agreed.`);
  p("15. Maintenance", true);
  p("Landlord shall maintain restaurant structure/systems in good repair. Tenant is responsible for cleanliness and sanitary condition of leased area.");
  p("16. Pest Control", true);
  p("Tenant shall provide regular pest control services at own cost in all food handling/trash/delivery areas.");
  p("17. Janitorial Services", true);
  p("Tenant shall provide janitorial services for leased premises at own expense.");
  p("18. Waste and Grease Management", true);
  p("Tenant shall prevent waste and maintain cleanliness, including sewer lines free of grease/blockages. Grease must be professionally removed/recycled where required.");
  p("19. Utilities and Services", true);
  p("Tenant shall be responsible for all utility charges and service costs associated with use of Restaurant.");
  p("20. Taxes", true);
  p("Real estate taxes paid by Landlord. Personal property/use taxes allocated in accordance with Lease terms.");
  p("21. Termination Upon Sale", true);
  p(`Landlord may terminate this Lease upon ${u(v.saleTerminationDays, 2)} days written notice in event the Restaurant is sold.`);
  p("22. Destruction or Condemnation", true);
  p(`If partially destroyed but repairable within 60 days and cost under $${u(v.repairCostThreshold, 4)}, Landlord repairs and rent abates proportionately during repairs. If repair not feasible or condemnation occurs, either party may terminate by twenty (20) days notice.`);
  p("23. Default", true);
  p("If Tenant fails to comply and does not cure monetary default within five (5) days or other breach within ten (10) days after notice, Landlord may re-enter and pursue legal remedies including attorney's fees.");
  p("24. Late Payments", true);
  p(`Any payment not made within ${u(v.lateFeeDays, 1)} days of due date shall incur late fee of $${u(v.lateFeeAmount, 4)}.`);
  p("25. Holdover", true);
  p("If Tenant remains after expiration, holdover rent is due at same renewal-rate unless otherwise agreed in writing.");
  p("26. Cumulative Rights", true);
  p("All rights/remedies under Lease are cumulative and may be exercised concurrently or separately.");
  p("27. Returned Checks", true);
  p(`Tenant shall be charged $${u(v.returnedCheckFee, 4)} for each returned check due to insufficient funds.`);
  p("28. Governing Law", true);
  p(`This Lease shall be governed by and construed in accordance with laws of the State of ${u(v.governingState)}.`);
  p("29. Entire Agreement / Amendment", true);
  p("This Lease is full and final agreement and supersedes prior discussions/agreements. Modifications must be in writing signed by both Parties.");
  p("30. Severability", true);
  p("If any provision is invalid/unenforceable, remaining provisions remain effective and court may limit offending provision to enforceable extent.");
  p("31. Waiver", true);
  p("Failure by either party to enforce any term is not waiver of that or other provisions.");
  p("32. Binding Effect", true);
  p("This Lease binds and benefits Parties and respective heirs, successors, legal representatives, and assigns.");
  p("33. Notices", true);
  p(`All notices must be in writing delivered personally or by certified mail to Landlord at ${u(v.landlordNoticeAddress)} and Tenant at ${u(v.tenantNoticeAddress)} unless changed by written designation.`);
  p("IN WITNESS WHEREOF", true);
  p(`LANDLORD Signature: ${u(v.landlordSign)}   Date: ${u(v.landlordSignDate, 10)}`);
  p(`TENANT Signature: ${u(v.tenantSign)}   Date: ${u(v.tenantSignDate, 10)}`);
  p("Make It Legal", true);
  p("This Agreement should be signed in front of a notary public by ____________________.");
  p("Once signed in front of a notary, this document should be delivered to the appropriate court for filing.");
  p("Copies", true);
  p("The original Agreement should be filed with the Clerk of Court or delivered to the requesting business.");
  p("The Affiant should maintain a copy of the Agreement. Your copy should be kept in a safe place.");
  p("Additional Assistance", true);
  p("If you are unsure or have questions regarding this Agreement or need additional assistance with special situations or circumstances, use Legal Gram Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.");

  doc.save("restaurant_lease.pdf");
};

export default function RestaurantLease() {
  return (
    <FormWizard
      steps={steps}
      title="Restaurant Lease"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="restaurantlease"
      preserveStepLayout
    />
  );
}
