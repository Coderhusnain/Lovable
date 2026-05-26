import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "lessorName", label: "Lessor name", type: "text", required: true },
      { name: "lesseeName", label: "Lessee name", type: "text", required: true },
    ],
  },
  {
    label: "Property & Term",
    fields: [
      { name: "propertyDescription", label: "Description of property", type: "textarea", required: true },
      { name: "leaseStart", label: "Lease start date", type: "date", required: true },
      { name: "leaseEnd", label: "Lease end date", type: "date", required: true },
      { name: "useLocation", label: "Location where property will be used", type: "text", required: true },
    ],
  },
  {
    label: "Rent & Insurance",
    fields: [
      { name: "monthlyRent", label: "Monthly rent", type: "text", required: true },
      { name: "paymentLocation", label: "Payment location", type: "text", required: true },
      { name: "returnedPaymentFee", label: "Returned payment fee", type: "text", required: false },
      { name: "insuranceAmount", label: "Insurance coverage amount", type: "text", required: false },
    ],
  },
  {
    label: "Notices & Governing Law",
    fields: [
      { name: "lessorNoticeAddress", label: "Lessor notice address", type: "text", required: false },
      { name: "lesseeNoticeAddress", label: "Lessee notice address", type: "text", required: false },
      { name: "governingLaw", label: "State governing law", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "lessorSignature", label: "Lessor signature (printed name)", type: "text", required: true },
      { name: "lessorDate", label: "Lessor date", type: "date", required: true },
      { name: "lesseeSignature", label: "Lessee signature (printed name)", type: "text", required: true },
      { name: "lesseeDate", label: "Lessee date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 18;

  const u = (v?: string, min = 18) => (v && v.trim() ? v.trim() : "_".repeat(min));
  const ensure = (n = 8) => {
    if (y + n > limit) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.5) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.2);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const labelText = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const startX = m + doc.getTextWidth(labelText);
    const shown = (value || "").trim();
    if (shown) {
      doc.text(shown, startX, y);
      doc.line(startX, y + 1.1, startX + Math.max(20, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(startX, y + 1.1, startX + 45, y + 1.1);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "PERSONAL PROPERTY LEASE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  y += 8;

  p(`This Personal Property Lease Agreement (“Agreement”) is made and entered into as of ${u(values.effectiveDate)} (“Effective Date”), by and between:`);
  uf("Lessor", values.lessorName);
  uf("Lessee", values.lesseeName);
  p("Lessor hereby leases to Lessee the personal property described below (the “Property”) subject to the terms and conditions set forth herein.");

  p("1. DESCRIPTION OF PROPERTY", true);
  p(u(values.propertyDescription, 40));

  p("2. TERM", true);
  p(`2.1 The lease term shall commence on ${u(values.leaseStart)} and shall terminate on ${u(values.leaseEnd)} (“Lease Term”).`);
  p("2.2 Lessee may extend the Lease Term upon written notice to Lessor prior to expiration, subject to Lessor’s written approval and mutually agreed terms.");

  p("3. RENT AND PAYMENT TERMS", true);
  p(`3.1 Lessee shall pay monthly rent of ${u(values.monthlyRent, 12)}, payable in advance on the first day of each month.`);
  p(`3.2 Payments shall be made to Lessor at ${u(values.paymentLocation, 20)} or at any other location designated by Lessor in writing.`);
  p(`3.3 Returned payments shall incur a fee of ${u(values.returnedPaymentFee, 8)} or the maximum permitted by law.`);

  p("4. DELIVERY, LOCATION, AND USE", true);
  p("4.1 Lessor shall deliver possession of the Property to Lessee at the commencement of the Lease Term.");
  p(`4.2 The Property shall be used solely at the following location: ${u(values.useLocation, 20)}.`);
  p("4.3 Lessee shall not remove, assign, transfer, pledge, sublease, or dispose of the Property without Lessor’s prior written consent.");

  p("5. CONDITION; DISCLAIMER OF WARRANTIES", true);
  p("5.1 The Property is leased AS IS and WITH ALL FAULTS.");
  p("5.2 Lessor makes no warranties, express or implied, including merchantability or fitness for any particular purpose.");

  p("6. MAINTENANCE AND TAXES", true);
  p("6.1 Lessee shall maintain the Property in good working condition.");
  p("6.2 Lessee shall pay all taxes, assessments, and charges imposed upon the Property.");

  p("7. INSURANCE AND RISK OF LOSS", true);
  p(`7.1 Lessee shall maintain insurance coverage of ${u(values.insuranceAmount, 12)}, naming Lessor as loss payee.`);
  p("7.2 Lessee bears all risk of loss, theft, or damage unless the Property is in Lessor’s possession.");

  p("8. INDEMNIFICATION", true);
  p("Lessee shall indemnify and hold Lessor harmless from all claims, damages, liabilities, and legal fees arising from Lessee’s possession or use of the Property.");

  p("9. NON-ASSIGNMENT", true);
  p("Lessee shall not assign this Agreement or any rights without Lessor’s prior written consent.");

  p("10. CONFIDENTIALITY", true);
  p("Neither party shall disclose the existence or terms of this Agreement without written consent, except as required by law.");

  p("11. NOTICES", true);
  p(`All notices shall be in writing and delivered to: Lessor: ${u(values.lessorNoticeAddress, 18)}; Lessee: ${u(values.lesseeNoticeAddress, 18)}.`);

  p("12. TIME IS OF THE ESSENCE", true);
  p("Time is of the essence with respect to all obligations under this Agreement.");

  p("13. DEFAULT AND REMEDIES", true);
  p("13.1 Failure to pay rent or comply with any term constitutes default.");
  p("13.2 Upon default, Lessor may repossess the Property without notice where permitted by law.");
  p("13.3 All unpaid rent for the remainder of the Lease Term shall become immediately due.");

  p("14. HOLDOVER", true);
  p("If Lessee remains in possession after termination, rent shall increase to 150% of the last monthly rate and tenancy shall convert to month-to-month.");

  p("15. RETURN OF PROPERTY", true);
  p("Lessee shall return the Property upon termination in good condition, reasonable wear and tear excepted.");

  p("16. ENTIRE AGREEMENT; AMENDMENTS", true);
  p("This Agreement constitutes the entire agreement between the parties and may only be modified in writing signed by both parties.");

  p("17. GOVERNING LAW", true);
  p(`This Agreement shall be governed by the laws of the State of ${u(values.governingLaw, 18)}.`);

  p("18. ATTORNEY’S FEES", true);
  p("The prevailing party in any enforcement action shall recover reasonable attorney’s fees and costs.");

  p("19. SEVERABILITY", true);
  p("If any provision is found unenforceable, the remaining provisions shall remain in full force.");

  p("20. COUNTERPARTS", true);
  p("This Agreement may be executed in counterparts, each of which shall be deemed an original.");

  p("IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.", true);
  p("LESSOR:");
  uf("Signature", values.lessorSignature);
  uf("Date", values.lessorDate);
  p("LESSEE:");
  uf("Signature", values.lesseeSignature);
  uf("Date", values.lesseeDate);

  doc.save("personal_property_lease_agreement.pdf");
};

export default function PersonalPropertyLeaseAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Personal Property Lease Agreement"
      subtitle="Create a personal property lease agreement and export as PDF"
      onGenerate={generatePDF}
      documentType="personal-property-lease-agreement"
    />
  );
}
