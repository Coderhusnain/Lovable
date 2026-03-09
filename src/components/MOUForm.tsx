import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Project",
    fields: [
      { name: "date", label: "Memorandum date", type: "date", required: true },
      { name: "partnerA", label: "Partner A name", type: "text", required: true },
      { name: "partnerAOffice", label: "Partner A principal office", type: "text", required: true },
      { name: "partnerB", label: "Partner B name", type: "text", required: true },
      { name: "partnerBOffice", label: "Partner B principal office", type: "text", required: true },
      { name: "projectName", label: "Project name", type: "text", required: true },
    ],
  },
  {
    label: "Services and Terms",
    fields: [
      { name: "partnerAServices", label: "Partner A services", type: "textarea", required: false },
      { name: "partnerBServices", label: "Partner B services", type: "textarea", required: false },
      { name: "partnerAResources", label: "Partner A resources", type: "textarea", required: false },
      { name: "partnerBResources", label: "Partner B resources", type: "textarea", required: false },
      { name: "termStart", label: "Term start", type: "date", required: false },
      { name: "termEnd", label: "Term end", type: "date", required: false },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "partnerASignerName", label: "Partner A signatory name", type: "text", required: false },
      { name: "partnerASignerTitle", label: "Partner A signatory title", type: "text", required: false },
      { name: "partnerASignerDate", label: "Partner A sign date", type: "date", required: false },
      { name: "partnerBSignerName", label: "Partner B signatory name", type: "text", required: false },
      { name: "partnerBSignerTitle", label: "Partner B signatory title", type: "text", required: false },
      { name: "partnerBSignerDate", label: "Partner B sign date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  const limit = 280;
  let y = 20;

  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    return v || "_".repeat(min);
  };

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
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "MEMORANDUM OF UNDERSTANDING (MOU)";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Memorandum of Understanding (the "Memorandum") is made and entered into on ${u(values.date, 12)}, by and between ${u(values.partnerA, 20)}, having its principal office at ${u(values.partnerAOffice, 22)} ("Partner A"), and ${u(values.partnerB, 20)}, having its principal office at ${u(values.partnerBOffice, 22)} ("Partner B"), collectively referred to as the "Partners," for the purpose of achieving the objectives and goals relating to the ${u(values.projectName, 18)} (the "Project").`);
  p("RECITALS", true);
  p("WHEREAS, the Partners desire to enter into an understanding pursuant to which they shall collaborate, coordinate, and cooperate in connection with the Project;");
  p("AND WHEREAS, the Partners intend through this Memorandum to set forth their working arrangements and mutual expectations in preparation for the negotiation of any future binding agreement regarding the Project;");
  p("NOW, THEREFORE, the Partners hereby agree as follows:", false, 3);

  p("1. Purpose", true);
  p("The purpose of this Memorandum is to establish the framework for any future binding agreement between the Partners with respect to the Project, including the allocation of responsibilities, resources, and cooperation mechanisms.");
  p("2. Obligations of the Partners", true);
  p("The Partners acknowledge that this Memorandum does not create a legally binding contract, but each Partner agrees to act in the spirit of collaboration, demonstrating leadership, financial commitment, administrative diligence, and managerial support.");
  p(`2.1 Services to be Rendered: Partner A shall provide ${u(values.partnerAServices, 25)}. Partner B shall provide ${u(values.partnerBServices, 25)}.`);
  p("3. Cooperation", true);
  p("The Partners agree to cooperate fully in the execution of the Project, including collaborative planning, coordination of resources, and participation in relevant Project meetings and activities.");
  p("4. Resources", true);
  p(`Each Partner shall make commercially reasonable efforts to secure and provide necessary resources. Partner A resources: ${u(values.partnerAResources, 18)}. Partner B resources: ${u(values.partnerBResources, 18)}.`);
  p("5. Communication Strategy", true);
  p("All communications, marketing, and public relations activities shall be consistent with Project objectives and require prior express agreement of both Partners.");
  p("6. Liability", true);
  p("No liability, whether contractual or otherwise, shall arise between the Partners as a result of this Memorandum.");
  p("7. Dispute Resolution", true);
  p("In the event of any dispute during negotiation of a binding agreement, a Dispute Resolution Group shall be convened (Chief Executives of each Partner and one mutually appointed independent representative). Decisions shall be final and binding. If no resolution is reached, neither Partner shall be obligated to enter into any binding contract.");
  p("8. Term", true);
  p(`The term of this Memorandum shall commence on ${u(values.termStart, 12)} and continue until ${u(values.termEnd, 12)}, unless extended by mutual written agreement.`);
  p("9. Notice", true);
  p("Any notice or communication required or permitted under this Memorandum shall be sufficiently given if delivered in person or by certified mail, return receipt requested, to the addresses set forth above or as otherwise provided in writing.");
  p("10. Governing Law", true);
  p(`This Memorandum shall be governed by and construed in accordance with the laws of the State of ${u(values.governingState, 16)}.`);
  p("11. Additional Clauses", true);
  p("Non-Binding Nature; Effectiveness upon signature; Termination by written notice; No assignment without prior written consent; Amendment only in writing; Severability; Supersession of prior discussions and memoranda.");
  p("12. Understanding Between Partners", true);
  p("Each Partner shall work collaboratively to advance the Project. This Memorandum does not restrict either Partner from entering into similar arrangements with other entities. Each Partner shall participate to the fullest extent possible in development and execution of the Project.", false, 3);

  p("13. Signatories", true);
  p("IN WITNESS WHEREOF, the Partners have executed this Memorandum of Understanding as of the date first written above.");
  p("Partner A:");
  uf("Name", values.partnerASignerName, 26);
  uf("Title", values.partnerASignerTitle, 26);
  p("Signature: ___________________________");
  uf("Date", values.partnerASignerDate, 26, 2.5);
  p("Partner B:");
  uf("Name", values.partnerBSignerName, 26);
  uf("Title", values.partnerBSignerTitle, 26);
  p("Signature: ___________________________");
  uf("Date", values.partnerBSignerDate, 26);

  doc.save("memorandum_of_understanding.pdf");
};

export default function MOU() {
  return (
    <FormWizard
      steps={steps}
      title="Memorandum of Understanding (MOU)"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="mou"
    />
  );
}
