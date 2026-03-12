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
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true },
      { name: "governingLawState", label: "Governing Law State", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
    ],
  },
  {
    label: "Parties and Scope",
    fields: [
      { name: "clientName", label: "Client Full Legal Name", type: "text", required: true },
      { name: "clientAddress", label: "Client Address", type: "textarea", required: true },
      { name: "contractorName", label: "Contractor Full Legal Name / Business Name", type: "text", required: true },
      { name: "contractorAddress", label: "Contractor Address", type: "textarea", required: true },
      { name: "startDate", label: "Start Date", type: "date", required: true },
    ],
  },
  {
    label: "Services and Payment",
    fields: [
      { name: "paymentAmount", label: "Total Payment Amount", type: "text", required: true, placeholder: "Amount" },
      { name: "endDate", label: "Agreement End Date", type: "date", required: true },
      { name: "breachCureDays", label: "Material Breach Cure Days", type: "text", required: true, placeholder: "Number" },
      { name: "warrantyMonths", label: "Warranty Period (months)", type: "text", required: true, placeholder: "Number" },
      { name: "remediesCureDays", label: "Remedies Cure Period (days)", type: "text", required: true, placeholder: "Number" },
    ],
  },
  {
    label: "Risk and Compliance Terms",
    fields: [
      { name: "riskComplianceNotes", label: "Risk/compliance notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Default and Dispute",
    fields: [
      { name: "defaultNotes", label: "Default notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "clientSignName", label: "Client Name", type: "text", required: true },
      { name: "clientSignature", label: "Client Signature", type: "text", required: true },
      { name: "clientSignDate", label: "Client Date", type: "date", required: true },
      { name: "contractorSignName", label: "Contractor Name", type: "text", required: true },
      { name: "contractorSignature", label: "Contractor Signature", type: "text", required: true },
      { name: "contractorSignDate", label: "Contractor Date", type: "date", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [
      { name: "finalNotes", label: "Final notes (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
  const lh = 5.25;
  let y = 18;

  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.35);
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
  const title = "DRYWALL SERVICES AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;
  
  uf("Effective Date: ", v.effectiveDate);
  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);

  p(`This Drywall Services Agreement ("Agreement") is made and entered into as of ${u(v.effectiveDate, 12)} ("Effective Date"), by and between: ${u(v.clientName)}, of ${u(v.clientAddress)} ("Client"), and ${u(v.contractorName)}, of ${u(v.contractorAddress)} ("Contractor"). The Client and Contractor may be referred to individually as a "Party" and collectively as the "Parties."`);

  p("1. Description of Services", true);
  p(`Beginning on ${u(v.startDate, 12)}, the Contractor shall furnish all labor, materials, tools, and equipment necessary to perform the following drywall services (collectively, the "Services"):`);
  p("1.1 Preparation & Finishing Work");
  p("- Spotting, pointing, detailing, flushing, sanding, and finishing of interior and exterior gypsum, drywall, thin wall, concrete, steel, wood, and plaster surfaces.");
  p("- Spackling, drywall pointing, taping, and finishing in accordance with industry standards.");
  p("1.2 Application of Finishing Materials");
  p("- Application of all finish and flushing materials, regardless of the method of application or surface type.");
  p("- Includes texture, simulated acoustic materials, radiant heat fill, steel fireproofing, and other specialty finishes as specified.");
  p("1.3 Installation of Protective Coverings");
  p("- Placement of protective coverings on surfaces prior to application of finishing materials to safeguard against damage.");
  p("1.4 Equipment Operation & Maintenance");
  p("- Proper use and upkeep of taping and texturing tools, compressors, brushes, rollers, spray texturing equipment, and related devices.");
  p("1.5 Site Cleanup");
  p("- Removal of materials, waste, and debris from all construction and repair areas to leave the site broom-clean.");

  p("2. Payment for Services", true);
  p(`- The Client shall pay the Contractor the sum of $${u(v.paymentAmount)} for the satisfactory completion of the Services described herein.`);
  p("- Payment shall be due upon completion of the Services, unless otherwise agreed in writing.");
  p("- If the Client fails to make payment when due, the Contractor may suspend work until full payment is received.");

  p("3. Term and Termination", true);
  p(`- This Agreement shall automatically terminate on ${u(v.endDate, 12)}, unless extended in writing by mutual agreement.`);
  p(`- Either Party may terminate this Agreement upon written notice if the other Party commits a material breach that remains uncured after ${u(v.breachCureDays, 2)} days' written notice.`);

  p("4. Relationship of the Parties", true);
  p("- The Contractor is engaged as an independent contractor and shall not be deemed an employee, partner, or agent of the Client.");

  p("5. Additional Work", true);
  p("- Any work not specifically described in Section 1 must be authorized in writing by the Client before commencement.");
  p("- Compensation for such work shall be agreed upon in writing prior to performance.");

  p("6. Confidentiality", true);
  p("- The Contractor shall not, during or after the term of this Agreement, disclose or use any proprietary or confidential information of the Client, except as required to perform the Services.");

  p("7. Injuries", true);
  p("- The Contractor shall maintain appropriate liability and workers' compensation insurance coverage at its own expense.");
  p("- The Contractor hereby waives any claims against the Client for injuries caused by the Contractor's own negligence.");

  p("8. Hazardous Materials", true);
  p("- If hazardous materials (including flammable, toxic, corrosive, or radioactive substances) are encountered, the Contractor shall immediately stop work until such hazards are removed by the Client.");

  p("9. Indemnification", true);
  p("- Each Party shall indemnify and hold harmless the other from and against all claims, damages, losses, and expenses (including attorneys' fees) resulting from that Party's acts, omissions, or breaches of this Agreement.");

  p("10. Assignment", true);
  p("- Neither Party may assign its rights or obligations under this Agreement without the prior written consent of the other Party.");

  p("11. Warranty", true);
  p("- All Services shall be performed in accordance with generally accepted industry standards.");
  p("- All materials shall be new and of good quality unless otherwise agreed in writing.");
  p(`- The Contractor shall, within the warranty period of ${u(v.warrantyMonths, 2)} months from completion, repair any peeling, deterioration, or defective work attributable to its workmanship or materials.`);

  p("12. Compliance with Building Regulations", true);
  p("- The Contractor shall comply with all applicable building codes and regulations, but shall not be responsible for pre-existing abnormal site conditions or the Client's failure to comply with applicable laws.");

  p("13. Insurance", true);
  p("- The Contractor shall maintain fire insurance and workers' compensation insurance throughout the term of this Agreement.");

  p("14. Default", true);
  p("- Events of default include: (a) Failure to pay amounts due; (b) Bankruptcy or insolvency;");
  if ((v.defaultNotes || "").trim()) p(v.defaultNotes);

  p("15. Remedies", true);
  p(`- In the event of a substantial breach, the non-defaulting Party may terminate this Agreement upon written notice, after giving the defaulting Party an opportunity to cure within ${u(v.remediesCureDays, 2)} days.`);

  p("16. Force Majeure", true);
  p("- Neither Party shall be liable for delays or failure to perform due to causes beyond their reasonable control, including natural disasters, strikes, riots, or acts of government.");

  p("17. Dispute Resolution & Arbitration", true);
  p("- Any dispute arising under this Agreement shall be resolved by binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association (AAA).");
  p("- The arbitrator's decision shall be final, binding, and enforceable in any court of competent jurisdiction.");

  p("18. Entire Agreement", true);
  p("- This Agreement constitutes the entire understanding of the Parties and supersedes all prior agreements or understandings, whether written or oral.");

  p("19. Severability", true);
  p("- If any provision of this Agreement is held invalid, the remainder shall remain in full force and effect.");

  p("20. Amendment", true);
  p("- No modification or amendment shall be valid unless in writing and signed by both Parties.");

  p("21. Governing Law", true);
  p(`- This Agreement shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState)}.`);

  p("22. Notice", true);
  p("- All notices required under this Agreement shall be delivered in person or sent by certified mail to the addresses stated above.");

  p("23. Waiver of Contractual Right", true);
  p("- Failure by either Party to enforce any provision of this Agreement shall not be deemed a waiver of such provision or any other provision in the future.");

  p("24. Signatures", true);
  p("CLIENT", true);
  uf("Name: ", v.clientSignName);
  uf("Signature: ", v.clientSignature);
  uf("Date: ", v.clientSignDate);
  p("CONTRACTOR", true);
  uf("Name: ", v.contractorSignName);
  uf("Signature: ", v.contractorSignature);
  uf("Date: ", v.contractorSignDate);
  if ((v.riskComplianceNotes || "").trim()) p(v.riskComplianceNotes);
  if ((v.finalNotes || "").trim()) p(v.finalNotes);
  
  doc.save("drywall_services_agreement.pdf");
};

export default function DrywallServicesAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Drywall Services Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="drywallservicesagreement"
      preserveStepLayout
    />
  );
}
