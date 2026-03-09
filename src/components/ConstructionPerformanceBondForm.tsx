import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Contract",
    fields: [
      { name: "bondDate", label: "Bond date", type: "date", required: true },
      { name: "principalName", label: "Principal name", type: "text", required: true },
      { name: "principalAddress", label: "Principal address", type: "text", required: true },
      { name: "contractDate", label: "Contract date", type: "date", required: true },
      { name: "ownerName", label: "Owner name", type: "text", required: true },
      { name: "ownerAddress", label: "Owner address", type: "text", required: true },
      { name: "projectDescription", label: "Project description", type: "text", required: true },
      { name: "legalDescription", label: "Property legal description", type: "textarea", required: true },
      { name: "suretyName", label: "Surety name", type: "text", required: true },
      { name: "suretyState", label: "Surety incorporation state", type: "text", required: true },
      { name: "suretyAddress", label: "Surety address", type: "text", required: true },
      { name: "penalSum", label: "Penal sum", type: "text", required: true },
    ],
  },
  {
    label: "Bond Terms",
    fields: [
      { name: "claimYears", label: "Claim limitation years", type: "text", required: true, placeholder: "2" },
      { name: "governingState", label: "Governing state", type: "text", required: true },
      { name: "workJurisdiction", label: "Jurisdiction where work performed", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "principalSignName", label: "Principal signatory name", type: "text", required: false },
      { name: "principalSignTitle", label: "Principal signatory title", type: "text", required: false },
      { name: "principalSignDate", label: "Principal sign date", type: "date", required: true },
      { name: "principalSignAddress", label: "Principal signature page address", type: "text", required: false },
      { name: "suretySignName", label: "Surety signatory name", type: "text", required: false },
      { name: "suretySignTitle", label: "Surety signatory title", type: "text", required: false },
      { name: "suretySignDate", label: "Surety sign date", type: "date", required: true },
      { name: "suretySignAddress", label: "Surety signature page address", type: "text", required: false },
      { name: "ownerSignName", label: "Owner signatory name", type: "text", required: false },
      { name: "ownerSignTitle", label: "Owner signatory title", type: "text", required: false },
      { name: "ownerSignDate", label: "Owner sign date", type: "date", required: true },
      { name: "ownerSignAddress", label: "Owner signature page address", type: "text", required: false },
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

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
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
  const title = "CONSTRUCTION PERFORMANCE BOND";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  uf("Date", values.bondDate, 12);
  p("KNOW ALL PERSONS BY THESE PRESENTS:");
  p(`That ${values.principalName || "[Principal Name]"}, of ${values.principalAddress || "[Principal Address]"} (the "Principal"), having entered into written agreement dated ${values.contractDate || "[Contract Date]"} with ${values.ownerName || "[Owner Name]"}, of ${values.ownerAddress || "[Owner Address]"} (the "Owner"), for construction of ${values.projectDescription || "[Project Description]"}, located on property legally described as ${values.legalDescription || "[Legal Description]"}, and all documents forming part of or attached to said agreement (the "Contract"), incorporated by reference,`);
  p(`NOW THEREFORE, we, the Principal, and ${values.suretyName || "[Surety Name]"}, a corporation organized under laws of ${values.suretyState || "[State]"}, with principal office at ${values.suretyAddress || "[Surety Address]"}, authorized to transact surety business in the State of ${values.suretyState || "[State]"} (the "Surety"), are held and firmly bound unto the Owner in penal sum of ${values.penalSum || "$0.00"} (the "Penal Sum"), in lawful money of the United States, for which payment Principal and Surety bind themselves, heirs, legal representatives, successors, and assigns, jointly and severally.`, false, 3);

  p("1. Bond Obligations", true);
  p("Principal and Surety, jointly and severally, bind themselves to Owner for full and proper performance of Construction Contract. If Principal performs all covenants/conditions/obligations under Contract, obligation is null and void; otherwise remains in full force and effect.", false, 3);
  p("2. Default by the Principal", true);
  p("Upon Principal default declared by Owner, Surety shall promptly either: (a) undertake and complete Contract; or (b) arrange performance by qualified contractor, in which case Surety/substitute contractor is subrogated to Principal rights under Contract.", false, 3);
  p("3. Default by the Owner", true);
  p("If Owner materially defaults on obligations under Contract, Surety is released from further liability/obligations under this Bond.", false, 3);
  p("4. Monetary Liability of the Surety (Penal Sum)", true);
  p("Surety liability shall not exceed Penal Sum. Within this limit, Surety is liable for completion/correction of defective work; liquidated or actual damages from non-performance including back charges/offsets/indemnities; and additional legal/design/delay costs due to Principal default or Surety failure to act.", false, 3);
  p("5. Contract Modifications", true);
  p("Principal shall provide Surety written notice of material modifications to Contract (including drawings/specifications) prior to commencement under such modifications.");
  p("Surety reserves right, in sole discretion, to disapprove modifications that individually/cumulatively increase Contract cost by more than ten percent (10%).", false, 3);
  p("6. Force Majeure", true);
  p("Surety shall not be liable for failure to perform under Bond due to events beyond reasonable control, including acts of God, epidemics/pandemics/public health emergencies, quarantine restrictions, fire/explosion/vandalism/storm damage, acts of civil/military authority, national emergencies, riots, wars, labor disputes, or material shortages.", false, 3);
  p("7. Third-Party Rights", true);
  p("No rights accrue under this Bond to any person/entity other than Owner, successors, or assigns.", false, 3);
  p("8. Time Limitation on Claims", true);
  p(`No action/proceeding under this Bond unless commenced within ${values.claimYears || "2"} years following completion of construction work.`, false, 3);
  p("9. Governing Law and Jurisdiction", true);
  p(`Proceedings under this Bond may be instituted in court of competent jurisdiction where Contract proceedings are pending; in courts of ${values.governingState || "[Insert State]"}; or in jurisdiction where construction was performed (${values.workJurisdiction || "[work jurisdiction]"}).`, false, 3);
  p("10. Notices", true);
  p("All notices required under this Bond shall be in writing and delivered personally or by certified mail to addresses on signature page or as specified in Construction Contract.", false, 3);
  p("11. Severability", true);
  p("If any provision is inconsistent with statutory/regulatory requirements, provision is modified to conform; all other provisions remain in full force and effect.", false, 3);
  p("12. Execution", true);
  p("IN WITNESS WHEREOF, Parties have caused this Bond to be executed by duly authorized representatives on dates set below.");

  p("Principal:", true, 1);
  p("By: ___________________________");
  uf("Name", values.principalSignName, 22);
  uf("Title", values.principalSignTitle, 22);
  uf("Date", values.principalSignDate, 22);
  uf("Address", values.principalSignAddress, 22, 2.2);

  p("Surety:", true, 1);
  p("By: ___________________________");
  uf("Name", values.suretySignName, 22);
  uf("Title", values.suretySignTitle, 22);
  uf("Date", values.suretySignDate, 22);
  uf("Address", values.suretySignAddress, 22, 2.2);

  p("Owner:", true, 1);
  p("By: ___________________________");
  uf("Name", values.ownerSignName, 22);
  uf("Title", values.ownerSignTitle, 22);
  uf("Date", values.ownerSignDate, 22);
  uf("Address", values.ownerSignAddress, 22);

  doc.save("construction_performance_bond.pdf");
};

export default function ConstructionPerformanceBond() {
  return (
    <FormWizard
      steps={steps}
      title="Construction Performance Bond"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="constructionperformancebond"
    />
  );
}
