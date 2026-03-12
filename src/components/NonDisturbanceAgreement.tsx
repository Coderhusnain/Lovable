import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement Date and Jurisdiction",
    fields: [
      { name: "agreementDay", label: "Agreement Day (e.g., 23rd)", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement Month", type: "text", required: true },
      { name: "agreementYearSuffix", label: "Agreement Year Suffix (for 20__)", type: "text", required: true, placeholder: "e.g., 25" },
      {
        name: "country",
        label: "Country",
        type: "select",
        required: true,
        options: [
          { value: "United States", label: "United States" },
          { value: "Canada", label: "Canada" },
          { value: "United Kingdom", label: "United Kingdom" },
          { value: "Australia", label: "Australia" },
          { value: "Pakistan", label: "Pakistan" },
          { value: "Other", label: "Other" },
        ],
      },
      {
        name: "province",
        label: "Province/State/Region",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => {
          if (values.country === "United States") return [{ value: "California", label: "California" }, { value: "New York", label: "New York" }, { value: "Texas", label: "Texas" }, { value: "Other US State", label: "Other US State" }];
          if (values.country === "Canada") return [{ value: "Ontario", label: "Ontario" }, { value: "Quebec", label: "Quebec" }, { value: "British Columbia", label: "British Columbia" }, { value: "Other Canadian Province", label: "Other Canadian Province" }];
          if (values.country === "United Kingdom") return [{ value: "England", label: "England" }, { value: "Scotland", label: "Scotland" }, { value: "Wales", label: "Wales" }, { value: "Northern Ireland", label: "Northern Ireland" }];
          if (values.country === "Australia") return [{ value: "New South Wales", label: "New South Wales" }, { value: "Victoria", label: "Victoria" }, { value: "Queensland", label: "Queensland" }, { value: "Other Australian State", label: "Other Australian State" }];
          if (values.country === "Pakistan") return [{ value: "Punjab", label: "Punjab" }, { value: "Sindh", label: "Sindh" }, { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" }, { value: "Balochistan", label: "Balochistan" }, { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" }];
          return [{ value: "Other Region", label: "Other Region" }];
        },
      },
      { name: "city", label: "City", type: "text", required: true },
    ],
  },
  {
    label: "Parties",
    fields: [
      { name: "mortgageeName", label: "Mortgagee Name", type: "text", required: true },
      { name: "mortgageeAddress", label: "Mortgagee Address", type: "textarea", required: true },
      { name: "tenantName", label: "Tenant Name", type: "text", required: true },
      { name: "tenantAddress", label: "Tenant Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Lease and Recitals",
    fields: [
      { name: "leaseDate", label: "Lease Date", type: "date", required: true },
      { name: "landlordName", label: "Landlord Name", type: "text", required: true },
      { name: "landlordAddress", label: "Landlord Address", type: "textarea", required: true },
      { name: "legalDescription", label: "Legal Description", type: "textarea", required: true },
      { name: "propertyAddress", label: "Property Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Core Agreement Clauses",
    fields: [
      { name: "subordinationExtra", label: "Subordination additional detail (optional)", type: "textarea", required: false },
      { name: "nonDisturbanceExtra", label: "Non-Disturbance additional detail (optional)", type: "textarea", required: false },
      { name: "attornmentExtra", label: "Attornment additional detail (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Legal Process",
    fields: [
      { name: "notarySigner", label: "Signed before notary public by", type: "text", required: true },
      { name: "courtOrFilingOffice", label: "Court/Filing office for delivery", type: "text", required: true },
      { name: "requestingBusiness", label: "Requesting business name (if applicable)", type: "text", required: false },
    ],
  },
  {
    label: "Signatories",
    fields: [
      { name: "mortgageeBy", label: "Mortgagee By", type: "text", required: true },
      { name: "mortgageeSignName", label: "Mortgagee Signatory Name", type: "text", required: true },
      { name: "mortgageeSignTitle", label: "Mortgagee Signatory Title", type: "text", required: true },
      { name: "mortgageeSignDate", label: "Mortgagee Sign Date", type: "date", required: true },
      { name: "tenantBy", label: "Tenant By", type: "text", required: true },
      { name: "tenantSignName", label: "Tenant Signatory Name", type: "text", required: true },
      { name: "tenantSignTitle", label: "Tenant Signatory Title", type: "text", required: true },
      { name: "tenantSignDate", label: "Tenant Sign Date", type: "date", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [
      { name: "additionalAssistanceNotes", label: "Additional assistance notes (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
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
  const title = "NON-DISTURBANCE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.province)}, ${u(v.country)}`);

  p(`This Agreement ("Agreement") is made and entered into on the ${u(v.agreementDay, 3)} day of ${u(v.agreementMonth)}, 20${u(v.agreementYearSuffix, 2)}, by and between ${u(v.mortgageeName)}, of ${u(v.mortgageeAddress)} (hereinafter referred to as the "Mortgagee"), and ${u(v.tenantName)}, of ${u(v.tenantAddress)} (hereinafter referred to as the "Tenant").`);

  p("RECITALS", true);
  p(`WHEREAS, Tenant entered into a lease agreement (the "Lease") dated ${u(v.leaseDate, 12)}, with ${u(v.landlordName)} (the "Landlord"), of ${u(v.landlordAddress)}, for the lease of a portion of the real property legally described as ${u(v.legalDescription)}, commonly known as ${u(v.propertyAddress)} (the "Real Property");`);
  p("WHEREAS, Mortgagee has made a loan to Landlord secured, in part, by a mortgage (the \"Mortgage\") encumbering the Real Property;");
  p("WHEREAS, Tenant has agreed to subordinate its leasehold interest to the Mortgage in exchange for the Mortgagee's agreement not to disturb Tenant's possession of the Real Property under the Lease so long as Tenant is not in default under the terms of the Lease.");

  p("AGREEMENT", true);
  p("NOW, THEREFORE, in consideration of the mutual covenants herein and intending to be legally bound, the parties agree as follows:");

  p("1. Subordination", true);
  p("Tenant agrees that the Lease, and all rights of the Tenant under it, shall be and remain subordinate in all respects to the lien, terms, and conditions of the Mortgage, including any renewals, extensions, modifications, replacements, or consolidations thereof, and to any future mortgage or mortgages placed on the Real Property by or through the Mortgagee.");
  if ((v.subordinationExtra || "").trim()) p(v.subordinationExtra);

  p("2. Non-Disturbance", true);
  p("Provided Tenant is not in default under the Lease beyond applicable notice and cure periods, the Mortgagee agrees that:");
  p("- The Lease shall not be terminated,");
  p("- Tenant's possession, use, or enjoyment of the Premises shall not be disturbed, and");
  p("- The leasehold estate shall not otherwise be affected");
  p("in the event of foreclosure or any action or proceeding under or related to the Mortgage, or in the event the Mortgagee takes possession of the Real Property.");
  p("Notwithstanding the foregoing, any person or entity acquiring the interest of the Landlord as a result of such foreclosure or proceeding, including their successors and assigns (collectively, the \"Purchaser\"), shall not be:");
  p("(a) liable for any act or omission of any prior landlord;");
  p("(b) subject to any defenses or offsets Tenant may have against any prior landlord;");
  p("(c) bound by any rent prepayment exceeding one month; or");
  p("(d) bound by any amendment or modification of the Lease made without the Mortgagee's prior written consent.");
  if ((v.nonDisturbanceExtra || "").trim()) p(v.nonDisturbanceExtra);

  p("3. Attornment", true);
  p("In the event of a transfer of the Landlord's interest by foreclosure, deed in lieu of foreclosure, or otherwise, Tenant agrees to attorn to and recognize the Purchaser (including the Mortgagee, if applicable) as its landlord under the Lease. Such attornment shall be effective automatically and without the execution of any further instrument. Following such attornment, the Lease shall remain in full force and effect between the Purchaser and Tenant, with the same terms, covenants, and conditions as though the Purchaser were the original landlord.");
  if ((v.attornmentExtra || "").trim()) p(v.attornmentExtra);

  p("4. Successors and Assigns", true);
  p("This Agreement shall be binding upon and inure to the benefit of the parties hereto, and their respective successors, legal representatives, and assigns.");

  p("5. Execution", true);
  p("This Agreement may be executed in counterparts, each of which shall constitute an original, but all of which together shall constitute one and the same instrument. Facsimile or electronic signatures shall be deemed to have the same force and effect as originals.");

  p("IN WITNESS WHEREOF, the undersigned have executed this Lease Subordination and Non-Disturbance Agreement as of the date first written above.", true);

  p("MORTGAGEE", true);
  uf("By: ", v.mortgageeBy);
  uf("Name: ", v.mortgageeSignName);
  uf("Title: ", v.mortgageeSignTitle);
  uf("Date: ", v.mortgageeSignDate);

  p("TENANT", true);
  uf("By: ", v.tenantBy);
  uf("Name: ", v.tenantSignName);
  uf("Title: ", v.tenantSignTitle);
  uf("Date: ", v.tenantSignDate);

  p("Make It Legal", true);
  p(`This Agreement should be signed in front of a notary public by ${u(v.notarySigner, 16)}.`);
  p(`Once signed in front of a notary, this document should be delivered to ${u(v.courtOrFilingOffice, 18)} for filing.`);

  p("Copies", true);
  p(`The original Agreement should be filed with the Clerk of Court or delivered to ${u(v.requestingBusiness, 18)}.`);
  p("The Affiant should maintain a copy of the Agreement. Your copy should be kept in a safe place. If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it. Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference.");

  p("Additional Assistance", true);
  p("If you are unsure or have questions regarding this Agreement or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.");
  if ((v.additionalAssistanceNotes || "").trim()) p(v.additionalAssistanceNotes);

  doc.save("non_disturbance_agreement.pdf");
};

export default function NonDisturbanceAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Non-Disturbance Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="nondisturbanceagreement"
      preserveStepLayout
    />
  );
}
