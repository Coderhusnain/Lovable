import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const countryOptions = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Other", label: "Other" },
];

const getStateOptions = (country?: string) => {
  if (country === "United States") return [{ value: "California", label: "California" }, { value: "New York", label: "New York" }, { value: "Texas", label: "Texas" }, { value: "Florida", label: "Florida" }, { value: "Other US State", label: "Other US State" }];
  if (country === "Canada") return [{ value: "Ontario", label: "Ontario" }, { value: "Quebec", label: "Quebec" }, { value: "British Columbia", label: "British Columbia" }, { value: "Alberta", label: "Alberta" }, { value: "Other Canadian Province", label: "Other Canadian Province" }];
  if (country === "United Kingdom") return [{ value: "England", label: "England" }, { value: "Scotland", label: "Scotland" }, { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" }];
  if (country === "Australia") return [{ value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" }, { value: "Queensland", label: "Queensland" }, { value: "Western Australia", label: "Western Australia" }, { value: "Other Australian State", label: "Other Australian State" }];
  if (country === "Pakistan") return [{ value: "Punjab", label: "Punjab" }, { value: "Sindh", label: "Sindh" }, { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" }, { value: "Balochistan", label: "Balochistan" }, { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" }];
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Date and Jurisdiction",
    fields: [
      { name: "agreementDate", label: "Agreement Date", type: "date", required: true },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true },
      { name: "governingLawState", label: "Governing Law State", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
    ],
  },
  {
    label: "Parties and Premises",
    fields: [
      { name: "landlordName", label: "Landlord Full Legal Name", type: "text", required: true },
      { name: "tenantName", label: "Tenant Full Legal Name", type: "text", required: true },
      { name: "premisesDescription", label: "Description of Space", type: "text", required: true },
      { name: "premisesStreetAddress", label: "Premises Street Address", type: "text", required: true },
      { name: "premisesCity", label: "Premises City", type: "text", required: true },
      { name: "premisesState", label: "Premises State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "premisesZipCode", label: "Premises ZIP/Postal Code", type: "text", required: true },
      { name: "legalDescription", label: "Legal Description", type: "textarea", required: true },
      { name: "startDate", label: "Lease Start Date", type: "date", required: true },
      { name: "endDate", label: "Lease End Date", type: "date", required: true },
    ],
  },
  {
    label: "Payments and Deposit",
    fields: [
      { name: "monthlyRent", label: "Monthly Rent Amount", type: "text", required: true, placeholder: "0.00" },
      { name: "paymentAddress", label: "Payment Address", type: "textarea", required: true },
      { name: "securityDeposit", label: "Security Deposit Amount", type: "text", required: true, placeholder: "0.00" },
      { name: "furnishings", label: "Furnishings List", type: "textarea", required: true },
      { name: "parkingSpaces", label: "Designated Parking Space(s)", type: "text", required: true, placeholder: "0" },
      { name: "storageLocation", label: "Storage Location", type: "text", required: true },
    ],
  },
  {
    label: "Insurance and Operations",
    fields: [
      { name: "liabilityCoverage", label: "Liability Insurance Minimum Amount", type: "text", required: true, placeholder: "0.00" },
      { name: "renewalTermDuration", label: "Renewal Term Duration", type: "text", required: true },
      { name: "renewalNoticeDays", label: "Renewal Non-Renewal Notice Days", type: "text", required: true },
      { name: "renewalRent", label: "Renewal Rent Amount and Frequency", type: "text", required: true },
      { name: "saleTerminationDays", label: "Termination Upon Sale Notice Days", type: "text", required: true },
      { name: "destructionThreshold", label: "Destruction/Condemnation Cost Threshold", type: "text", required: true, placeholder: "0.00" },
      { name: "lateDays", label: "Late Payment Trigger Days", type: "text", required: true },
      { name: "lateFee", label: "Late Fee Amount", type: "text", required: true, placeholder: "0.00" },
      { name: "nsfFee", label: "Non-Sufficient Funds Fee Amount", type: "text", required: true, placeholder: "0.00" },
    ],
  },
  {
    label: "Notices",
    fields: [
      { name: "landlordNoticeName", label: "Landlord Notice Name", type: "text", required: true },
      { name: "landlordNoticeAddress", label: "Landlord Notice Address", type: "textarea", required: true },
      { name: "tenantNoticeName", label: "Tenant Notice Name", type: "text", required: true },
      { name: "tenantNoticeAddress", label: "Tenant Notice Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "landlordSignature", label: "Landlord Signature", type: "text", required: true },
      { name: "landlordSignatureName", label: "Landlord Name", type: "text", required: true },
      { name: "landlordDate", label: "Landlord Signature Date", type: "date", required: true },
      { name: "tenantSignature", label: "Tenant Signature", type: "text", required: true },
      { name: "tenantSignatureName", label: "Tenant Name", type: "text", required: true },
      { name: "tenantDate", label: "Tenant Signature Date", type: "date", required: true },
    ],
  },
  {
    label: "Legal Filing Notes",
    fields: [
      { name: "notarySignerLabel", label: "Signed before notary public by", type: "text", required: true },
      { name: "courtOrFilingOffice", label: "Appropriate court/filing office", type: "text", required: true },
      { name: "requestingBusiness", label: "Requesting business (if applicable)", type: "text", required: false },
      { name: "additionalAssistanceNotes", label: "Additional assistance notes (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 15;
  const width = 180;
  const lh = 5.3;
  let y = 18;

  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    doc.setFont("times", "normal");
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const show = u(value, 12);
    doc.text(show, x, y);
    doc.line(x, y + 1, x + doc.getTextWidth(show), y + 1);
    y += 6.2;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "OFFICE SPACE LEASE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);

  p(`This Lease Agreement ("Lease") is made and entered into as of ${u(v.agreementDate, 12)}, by and between ${u(v.landlordName)}, hereinafter referred to as the "Landlord," and ${u(v.tenantName)}, hereinafter referred to as the "Tenant" (collectively, the "Parties").`);

  p("1. Premises", true);
  p(`Landlord hereby leases to Tenant the office space known as ${u(v.premisesDescription)} (the "Premises"), located at ${u(v.premisesStreetAddress)}, ${u(v.premisesCity)}, ${u(v.premisesState)}, ${u(v.premisesZipCode)}.`);

  p("2. Legal Description", true);
  p(`The Premises are further legally described as: ${u(v.legalDescription)}.`);

  p("3. Term", true);
  p(`The term of this Lease shall commence on ${u(v.startDate, 12)} and shall terminate on ${u(v.endDate, 12)}, unless earlier terminated in accordance with this Lease.`);

  p("4. Lease Payments", true);
  p(`Tenant agrees to pay to Landlord monthly rent in the amount of $${u(v.monthlyRent)}, payable in advance on the first (1st) day of each calendar month. All payments shall be made to Landlord at ${u(v.paymentAddress)}, or at such other address as Landlord may designate in writing.`);

  p("5. Security Deposit", true);
  p(`Upon execution of this Lease, Tenant shall pay to Landlord a security deposit of $${u(v.securityDeposit)}, to be held in trust as security for any damage to the Premises or other obligations under this Lease, subject to applicable law.`);

  p("6. Possession", true);
  p("Tenant shall be entitled to possession of the Premises on the Lease commencement date and shall vacate the Premises on the expiration date. Upon vacating, Tenant shall return the Premises in as good condition as when received, ordinary wear and tear excepted. By taking possession, Tenant affirms the Premises are in satisfactory and acceptable condition.");

  p("7. Furnishings", true);
  p(`The following furnishings will be provided: ${u(v.furnishings)}. Tenant shall return all such items in good condition, reasonable wear and tear excepted, at the end of the Lease term.`);

  p("8. Parking", true);
  p(`Tenant shall be entitled to use ${u(v.parkingSpaces, 2)} designated parking space(s) for the use of its employees, customers, and invitees.`);

  p("9. Storage", true);
  p(`Tenant may store personal property in ${u(v.storageLocation)} during the Lease term. Landlord shall not be liable for any loss or damage to stored items.`);

  p("10. Property Insurance", true);
  p("Both Parties shall maintain appropriate insurance on their respective interests in the Premises. Landlord shall be named as an additional insured on Tenant's policies. Proof of insurance coverage shall be provided to Landlord. Tenant shall also maintain casualty insurance on its own property.");

  p("11. Liability Insurance", true);
  p(`Tenant shall maintain general liability insurance covering the Premises in an aggregate amount not less than $${u(v.liabilityCoverage)}. Certificates of insurance shall be provided to Landlord, who shall be entitled to advance written notice of policy termination.`);

  p("12. Renewal Terms", true);
  p(`This Lease shall automatically renew for successive terms of ${u(v.renewalTermDuration)}, unless either party gives written notice of non-renewal at least ${u(v.renewalNoticeDays, 2)} days before the end of the current term. During any renewal term, rent shall be ${u(v.renewalRent)}.`);

  p("13. Maintenance", true);
  p("Landlord shall be responsible for maintaining the Premises in a safe and tenantable condition, except where damage results from Tenant's misuse or neglect.");

  p("14. Utilities and Services", true);
  p("Tenant shall be solely responsible for all utility and service charges incurred in connection with the Premises during the Lease term.");

  p("15. Common Areas", true);
  p("Landlord shall provide access to and maintain common areas (including parking) of the building. Use of these areas shall be non-exclusive and subject to rules and regulations established and amended by Landlord. Tenant shall comply with all such rules.");

  p("16. Pest Control", true);
  p("Tenant shall, at its own expense, arrange regular pest and vermin control, especially in areas used for food handling or waste disposal.");

  p("17. Janitorial Services", true);
  p("Tenant shall provide regular janitorial service to the Premises at its own expense.");

  p("18. Covenant Against Waste", true);
  p("Tenant agrees not to commit or permit any waste or damage to the Premises. Tenant shall be responsible for maintaining cleanliness and ensuring waste and sewerage systems remain unobstructed.");

  p("19. Taxes", true);
  p("Landlord shall be responsible for all personal property taxes and any sales or use taxes related to Tenant's use of the Premises.");

  p("20. Termination Upon Sale", true);
  p(`Notwithstanding any provision to the contrary, Landlord may terminate this Lease upon giving ${u(v.saleTerminationDays, 2)} days' written notice if the Premises are sold.`);

  p("21. Destruction or Condemnation", true);
  p(`If the Premises are damaged or condemned such that Tenant cannot reasonably use them, and repairs are not feasible within sixty (60) days, or cost exceeds $${u(v.destructionThreshold)}, either party may terminate the Lease with written notice.`);

  p("22. Defaults", true);
  p("Tenant shall be in default if it fails to comply with any Lease obligation and does not cure the default within: 5 days for financial obligations; and 10 days for non-financial obligations after written notice. Landlord may enter and take possession, subject to law, and recover damages. Any costs incurred in enforcing this Lease shall be reimbursed by Tenant, including attorney fees.");

  p("23. Late Payments", true);
  p(`If any rent or other amount due is not paid within ${u(v.lateDays, 2)} days of its due date, a late fee of $${u(v.lateFee)} shall be payable by Tenant.`);

  p("24. Holdover", true);
  p("If Tenant remains in possession beyond the Lease term without Landlord's written consent, Tenant shall pay rent at the same rate as under the last renewal period.");

  p("25. Cumulative Rights", true);
  p("All rights and remedies under this Lease shall be cumulative and not exclusive of any rights available at law or in equity.");

  p("26. Non-Sufficient Funds", true);
  p(`Tenant shall be charged $${u(v.nsfFee)} for any check returned due to insufficient funds.`);

  p("27. Governing Law", true);
  p(`This Lease shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState)}.`);

  p("28. Entire Agreement & Amendments", true);
  p("This Lease contains the entire agreement between the Parties regarding the Premises. No modifications shall be valid unless in writing and signed by both Parties.");

  p("29. Severability", true);
  p("If any provision of this Lease is held unenforceable, the remaining provisions shall continue in full force and effect.");

  p("30. Waiver", true);
  p("The failure of either Party to enforce any term of this Lease shall not constitute a waiver of future enforcement of that or any other term.");

  p("31. Binding Effect", true);
  p("This Lease shall bind and benefit the Parties and their respective successors, assigns, heirs, and legal representatives.");

  p("32. Signatures & Notices", true);
  p("All notices under this Lease must be in writing and delivered personally or by certified mail to the following addresses (or any updated address provided in writing):");
  p(`Landlord: ${u(v.landlordNoticeName)} | ${u(v.landlordNoticeAddress)}`);
  p(`Tenant: ${u(v.tenantNoticeName)} | ${u(v.tenantNoticeAddress)}`);

  p("IN WITNESS WHEREOF, the parties have executed this Lease as of the date first written above.", true);
  p("LANDLORD:", true);
  uf("Signature: ", v.landlordSignature);
  uf("Name: ", v.landlordSignatureName);
  uf("Date: ", v.landlordDate);
  p("TENANT:", true);
  uf("Signature: ", v.tenantSignature);
  uf("Name: ", v.tenantSignatureName);
  uf("Date: ", v.tenantDate);

  p("Make It Legal", true);
  p(`This Agreement should be signed in front of a notary public by ${u(v.notarySignerLabel, 16)}.`);
  p(`Once signed in front of a notary, this document should be delivered to ${u(v.courtOrFilingOffice, 18)} for filing.`);

  p("Copies", true);
  p(`The original Agreement should be filed with the Clerk of Court or delivered to ${u(v.requestingBusiness, 18)}.`);
  p("The Affiant should maintain a copy of the Agreement. Your copy should be kept in a safe place. If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it. Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference.");

  p("Additional Assistance", true);
  p("If you are unsure or have questions regarding this Agreement or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.");
  if ((v.additionalAssistanceNotes || "").trim()) p(v.additionalAssistanceNotes);

  doc.save("office_space_lease_agreement.pdf");
};

export default function OfficeSpaceLeaseForm() {
  return (
    <FormWizard
      steps={steps}
      title="Office Space Lease Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="officespacelease"
      preserveStepLayout
    />
  );
}
