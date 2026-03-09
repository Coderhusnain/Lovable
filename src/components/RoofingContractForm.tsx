import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Dates",
    fields: [
      { name: "contractDate", label: "Contract date", type: "date", required: true },
      { name: "ownerName", label: "Owner name", type: "text", required: true },
      { name: "contractorName", label: "Contractor name", type: "text", required: true },
      { name: "effectiveDate", label: "Effective date", type: "date", required: false },
    ],
  },
  {
    label: "Worksite and Services",
    fields: [
      { name: "ownerDescription", label: "Description of owner / description of work", type: "textarea", required: false },
      { name: "worksiteAddress", label: "Worksite address", type: "text", required: true },
      { name: "startDate", label: "Agreed start date", type: "date", required: false },
      { name: "completionTimeframe", label: "Completion timeframe", type: "text", required: false },
      { name: "completionDate", label: "Completion date", type: "date", required: false },
    ],
  },
  {
    label: "Payment and Warranty",
    fields: [
      { name: "contractPrice", label: "Contract price", type: "text", required: false },
      { name: "discountTimeLimit", label: "Early payment discount time limit", type: "text", required: false },
      { name: "workmanshipMonths", label: "Workmanship warranty months", type: "text", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "ownerSignatureName", label: "Owner name for signature line", type: "text", required: false },
      { name: "ownerSignatureDate", label: "Owner signature date", type: "date", required: false },
      { name: "contractorSignatureName", label: "Contractor name for signature line", type: "text", required: false },
      { name: "contractorSignatureDate", label: "Contractor signature date", type: "date", required: false },
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

  const u = (value?: string, min = 20) => (value || "").trim() || " ".repeat(min);

  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 20, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "ROOFING CONTRACT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Roofing Contract ("Contract") is made and entered into as of ${u(values.contractDate, 12)}, by and between:`);
  uf("Owner", values.ownerName, 34);
  uf("Contractor", values.contractorName, 34);
  p(`Effective Date: This Contract shall become effective on ${u(values.effectiveDate || values.contractDate, 12)}, the date first written above.`, false, 3);

  p("1. Parties & Effective Date", true);
  p("This Contract is made between the Owner and the Contractor, and shall be effective from the date stated herein. The obligations, covenants, and agreements set forth shall bind the parties from such date.");

  p("2. Description of Services", true);
  p(`The Contractor shall furnish all labor, equipment, and materials necessary to perform the roofing services in accordance with ${u(values.ownerDescription, 24)} ("Description of Work") at the property located at:`);
  uf("Address", values.worksiteAddress, 46);
  p(`The Contractor shall commence work on ${u(values.startDate, 12)} and complete the work within ${u(values.completionTimeframe, 20)}, subject to extensions permitted under this Contract.`);

  p("3. Scope of Work", true);
  p("The Contractor shall supply and deliver all necessary labor, materials, tools, equipment, and supervision required to complete the roofing project in accordance with industry standards, applicable building codes, and manufacturer specifications. Work shall be performed Monday through Saturday, excluding statutory holidays, and is subject to favorable weather conditions.");

  p("4. Worksite Access & Conditions", true);
  p("The Owner grants the Contractor the right to access the Worksite for purposes of performing the services herein. This includes authorization for excavation or grading as necessary to perform roofing work. Unless specifically stated, no landscaping, grading, filling, or excavation work is included.");

  p("5. Payment Terms", true);
  p(`(a) Contract Price - The total Contract Price shall be ${u(values.contractPrice, 16)} as set forth in writing.`);
  p("(b) Due Date - Payment shall be due upon completion of the work unless otherwise agreed in writing.");
  p(`(c) Discounts - Any early payment discounts must be taken within ${u(values.discountTimeLimit, 14)}.`);
  p("(d) Late Payments - Late payments shall accrue interest at the maximum rate permitted by law.");
  p("(e) Collection Costs - In the event of non-payment, the defaulting party shall be liable for all collection costs, including reasonable attorneys' fees.");
  p("(f) Material Breach - Non-payment constitutes a material breach, entitling the non-defaulting party to suspend performance or terminate this Contract.");

  p("6. Permits & Insurance", true);
  p("The Contractor shall be responsible for obtaining all permits and licenses necessary for the performance of the work and shall maintain all insurance required by law, including commercial general liability insurance and workers' compensation coverage.");

  p("7. Survey & Title", true);
  p("If property lines are uncertain, the Owner shall indicate the boundaries and provide stakes or other markers. The Owner shall be responsible for ensuring that all work is performed within legal property limits.");

  p("8. Indemnification", true);
  p("Each party agrees to indemnify, defend, and hold harmless the other party, its officers, employees, and agents from any and all claims, liabilities, damages, costs, and expenses, including reasonable attorneys' fees, arising out of or related to the negligent acts, omissions, or willful misconduct of the indemnifying party or its agents.");

  p("9. Warranty", true);
  p(`(a) Workmanship Warranty - The Contractor warrants that all work will be free from defects in workmanship for a period of ${u(values.workmanshipMonths, 8)} months from the date of completion.`);
  p("(b) Coverage - This warranty covers leaks occurring under normal weather conditions.");
  p("(c) Exclusions - This warranty does not cover damage caused by misuse, neglect, unauthorized modifications, or acts of God.");
  p("(d) Material Warranty - Manufacturer's warranties for materials shall be assigned to the Owner upon completion.");

  p("10. Completion of Services", true);
  p("Upon completion, the Contractor shall restore the property to its pre-work condition and remove all debris, tools, and equipment. The work shall be deemed completed when accepted by the Owner in writing.");

  p("11. Change Orders", true);
  p('No changes to the scope of work shall be binding unless documented in a written "Change Order" signed by both parties. Additional costs associated with change orders shall be borne by the Owner.');

  p("12. Access & Protection", true);
  p("The Owner shall provide the Contractor with free and unhindered access to the Worksite, including adequate space for the storage of materials and equipment. The Contractor shall take reasonable measures to protect the Owner's property during the course of work.");

  p("13. Term", true);
  p(`This Contract shall automatically terminate on ${u(values.completionDate, 12)}, unless extended by mutual written agreement.`);

  p("14. Work Product Ownership", true);
  p("All completed work and deliverables produced under this Contract shall be the property of the Owner upon payment in full. The Contractor shall execute any documents necessary to evidence such ownership.");

  p("15. Confidentiality", true);
  p("Each party agrees to maintain in strict confidence all proprietary or confidential information disclosed during the term of this Contract and not to use such information except as necessary to perform obligations herein.");

  p("16. Default", true);
  p("Events of default include, but are not limited to:");
  p("(a) Failure to make timely payments;");
  p("(b) Insolvency or bankruptcy;");
  p("(c) Seizure of property;");
  p("(d) Failure to commence or complete services within the agreed timeframe.");

  p("17. Remedies", true);
  p("In the event of default, the non-defaulting party may terminate this Contract upon written notice, provided the defaulting party fails to cure the breach within ten (10) business days after receipt of such notice.");

  p("18. Force Majeure", true);
  p("Neither party shall be liable for delays or failures in performance due to events beyond their reasonable control, including but not limited to natural disasters, pandemics, war, acts of terrorism, labor disputes, or government orders.");

  p("19. Arbitration", true);
  p("All disputes arising from or relating to this Contract shall be resolved by binding arbitration under the Construction Industry Arbitration Rules of the American Arbitration Association. The arbitrator's decision shall be final, and judgment may be entered in any court of competent jurisdiction.");

  p("20. Entire Agreement & Amendments", true);
  p("This Contract constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements, whether written or oral. Any amendments must be in writing and signed by both parties.");

  p("21. Severability", true);
  p("If any provision of this Contract is found invalid or unenforceable, the remaining provisions shall remain in full force and effect.");

  p("22. Governing Law", true);
  p(`This Contract shall be governed by and construed in accordance with the laws of the State of ${u(values.governingState, 16)}.`);

  p("23. Notices", true);
  p("All notices required under this Contract shall be in writing and delivered personally, by certified mail, or by recognized courier service to the addresses provided herein. Notices shall be deemed received upon delivery.");

  p("24. Waiver of Contractual Right", true);
  p("Failure to enforce any provision of this Contract shall not constitute a waiver of that provision or any other provision, nor prevent subsequent enforcement.");

  p("25. Signatories", true);
  p("By signing below, the parties affirm that they are duly authorized to enter into this Contract and that they agree to be bound by its terms.");
  p("OWNER:");
  uf("Name", values.ownerSignatureName || values.ownerName, 24);
  p("Signature: ___________________________");
  uf("Date", values.ownerSignatureDate, 14, 2.3);
  p("CONTRACTOR:");
  uf("Name", values.contractorSignatureName || values.contractorName, 24);
  p("Signature: ___________________________");
  uf("Date", values.contractorSignatureDate, 14);

  doc.save("roofing_contract.pdf");
};

export default function RoofingContract() {
  return (
    <FormWizard
      steps={steps}
      title="Roofing Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="roofingcontract"
    />
  );
}
