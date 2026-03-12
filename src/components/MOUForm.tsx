import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Date and Jurisdiction",
    fields: [
      { name: "mouDate", label: "Memorandum Date", type: "date", required: true },
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
      { name: "governingLawState", label: "Governing Law State/Jurisdiction", type: "text", required: true },
    ],
  },
  {
    label: "Partners and Project",
    fields: [
      { name: "partnerAName", label: "Partner A Name", type: "text", required: true },
      { name: "partnerAOffice", label: "Partner A Principal Office", type: "textarea", required: true },
      { name: "partnerBName", label: "Partner B Name", type: "text", required: true },
      { name: "partnerBOffice", label: "Partner B Principal Office", type: "textarea", required: true },
      { name: "projectName", label: "Project Name", type: "text", required: true },
    ],
  },
  {
    label: "Purpose and Obligations",
    fields: [
      { name: "partnerAServices", label: "Partner A Services to be Rendered", type: "textarea", required: true },
      { name: "partnerBServices", label: "Partner B Services to be Rendered", type: "textarea", required: true },
      { name: "partnerAResources", label: "Partner A Resources", type: "textarea", required: true, placeholder: "financial, material, labor resources" },
      { name: "partnerBResources", label: "Partner B Resources", type: "textarea", required: true, placeholder: "financial, material, labor resources" },
    ],
  },
  {
    label: "Cooperation and Communication",
    fields: [
      { name: "communicationNotes", label: "Communication strategy notes (optional)", type: "textarea", required: false },
      { name: "cooperationNotes", label: "Cooperation notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Dispute and Term",
    fields: [
      { name: "termStart", label: "Term Start Date", type: "date", required: true },
      { name: "termEnd", label: "Term End Date", type: "date", required: true },
      { name: "noticeAddressA", label: "Partner A Notice Address", type: "textarea", required: true },
      { name: "noticeAddressB", label: "Partner B Notice Address", type: "textarea", required: true },
    ],
  },
  {
    label: "Signatories",
    fields: [
      { name: "partnerASignerName", label: "Partner A Name", type: "text", required: true },
      { name: "partnerASignerTitle", label: "Partner A Title", type: "text", required: true },
      { name: "partnerASignerSignature", label: "Partner A Signature", type: "text", required: true },
      { name: "partnerASignerDate", label: "Partner A Date", type: "date", required: true },
      { name: "partnerBSignerName", label: "Partner B Name", type: "text", required: true },
      { name: "partnerBSignerTitle", label: "Partner B Title", type: "text", required: true },
      { name: "partnerBSignerSignature", label: "Partner B Signature", type: "text", required: true },
      { name: "partnerBSignerDate", label: "Partner B Date", type: "date", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [
      { name: "additionalClauses", label: "Additional clauses (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16, width = 178, lh = 5.3;
  let y = 18;
  const u = (val?: string, n = 14) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => { if (y + need > 285) { doc.addPage(); y = 18; } };
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width); ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal"); doc.setFontSize(10.4); doc.text(lines, left, y); y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => { ensure(8); doc.text(label, left, y); const x = left + doc.getTextWidth(label); const s = u(value); doc.text(s, x, y); doc.line(x, y + 1, x + doc.getTextWidth(s), y + 1); y += 6.2; };

  doc.setFont("times", "bold"); doc.setFontSize(13);
  const title = "MEMORANDUM OF UNDERSTANDING (MOU)";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1.1, 105 + tw / 2, y + 1.1); y += 10;

  uf("Jurisdiction: ", `${u(v.governingLawState)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`);

  p(`This Memorandum of Understanding (the "Memorandum") is made and entered into on ${u(v.mouDate, 12)}, by and between ${u(v.partnerAName)}, having its principal office at ${u(v.partnerAOffice)} ("Partner A"), and ${u(v.partnerBName)}, having its principal office at ${u(v.partnerBOffice)} ("Partner B"), collectively referred to as the "Partners," for the purpose of achieving the objectives and goals relating to the ${u(v.projectName)} (the "Project").`);

  p("RECITALS", true);
  p("WHEREAS, the Partners desire to enter into an understanding pursuant to which they shall collaborate, coordinate, and cooperate in connection with the Project;");
  p("AND WHEREAS, the Partners intend through this Memorandum to set forth their working arrangements and mutual expectations in preparation for the negotiation of any future binding agreement regarding the Project;");
  p("NOW, THEREFORE, the Partners hereby agree as follows:");

  p("1. Purpose", true);
  p("The purpose of this Memorandum is to establish the framework for any future binding agreement between the Partners with respect to the Project, including the allocation of responsibilities, resources, and cooperation mechanisms.");

  p("2. Obligations of the Partners", true);
  p("The Partners acknowledge that this Memorandum does not create a legally binding contract, but each Partner agrees to act in the spirit of collaboration, demonstrating leadership, financial commitment, administrative diligence, and managerial support.");
  p("2.1 Services to be Rendered:", true);
  p(`- Partner A shall provide the following services: ${u(v.partnerAServices)}`);
  p(`- Partner B shall provide the following services: ${u(v.partnerBServices)}`);

  p("3. Cooperation", true);
  p(`The Partners agree to cooperate fully in the execution of the Project. Activities shall include, but are not limited to, the services described above, collaborative planning, coordination of resources, and participation in all relevant Project meetings and activities.${(v.cooperationNotes || "").trim() ? ` ${v.cooperationNotes}` : ""}`);

  p("4. Resources", true);
  p("Each Partner shall make commercially reasonable efforts to secure and provide the necessary resources to fulfill their respective commitments.");
  p(`- Partner A shall provide: ${u(v.partnerAResources)}`);
  p(`- Partner B shall provide: ${u(v.partnerBResources)}`);

  p("5. Communication Strategy", true);
  p(`All communications, marketing, and public relations activities shall be consistent with the objectives of the Project and require the prior express agreement of both Partners. Open, transparent, and coordinated communication with external stakeholders is encouraged, subject to applicable confidentiality protocols.${(v.communicationNotes || "").trim() ? ` ${v.communicationNotes}` : ""}`);

  p("6. Liability", true);
  p("No liability, whether contractual or otherwise, shall arise between the Partners as a result of this Memorandum.");

  p("7. Dispute Resolution", true);
  p("In the event of any dispute during the negotiation of a binding agreement relating to the Project:");
  p("1. A Dispute Resolution Group shall be convened, comprising the Chief Executives of each Partner and one independent representative mutually appointed.");
  p("2. The group may consider any information deemed relevant to resolve the dispute.");
  p("3. Decisions made by the Dispute Resolution Group shall be final and binding.");
  p("4. If no resolution is reached, neither Partner shall be obligated to enter into any binding contract.");

  p("8. Term", true);
  p(`The term of this Memorandum shall commence on ${u(v.termStart, 12)} and continue until ${u(v.termEnd, 12)}, unless extended by mutual written agreement of all Partners.`);

  p("9. Notice", true);
  p(`Any notice or communication required or permitted under this Memorandum shall be sufficiently given if delivered in person or by certified mail, return receipt requested, to the addresses set forth above or to such other addresses as may be provided in writing. Partner A notice address: ${u(v.noticeAddressA)}. Partner B notice address: ${u(v.noticeAddressB)}.`);

  p("10. Governing Law", true);
  p(`This Memorandum shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState)}.`);

  p("11. Additional Clauses", true);
  p("- Non-Binding Nature: This Memorandum does not create any enforceable legal right, benefit, or fiduciary responsibility.");
  p("- Effectiveness: This Memorandum shall be effective upon signature by both Partners.");
  p("- Termination: Any Partner may terminate its participation by providing written notice to the other Partner.");
  p("- Assignment: Neither Partner may assign or transfer any rights or obligations without prior written consent of the other Partner.");
  p("- Amendment: This Memorandum may only be amended in writing, signed by the Party obligated under such amendment.");
  p("- Severability: If any provision is held invalid or unenforceable, the remaining provisions shall remain valid and enforceable.");
  p("- Supersession: This Memorandum constitutes the entire understanding between the Partners and supersedes all prior representations, discussions, negotiations, and memoranda, whether written or oral.");

  p("12. Understanding Between Partners", true);
  p("- Each Partner shall work collaboratively to advance the Project.");
  p("- This Memorandum does not restrict the Partners from entering into similar arrangements with other entities.");
  p("- Each Partner shall participate to the fullest extent possible in the development and execution of the Project.");

  p("13. Signatories", true);
  p("IN WITNESS WHEREOF, the Partners have executed this Memorandum of Understanding as of the date first written above.");
  p("Partner A:", true);
  uf("Name: ", v.partnerASignerName);
  uf("Title: ", v.partnerASignerTitle);
  uf("Signature: ", v.partnerASignerSignature);
  uf("Date: ", v.partnerASignerDate);
  p("Partner B:", true);
  uf("Name: ", v.partnerBSignerName);
  uf("Title: ", v.partnerBSignerTitle);
  uf("Signature: ", v.partnerBSignerSignature);
  uf("Date: ", v.partnerBSignerDate);

  if ((v.additionalClauses || "").trim()) {
    p("Additional Notes", true);
    p(v.additionalClauses);
  }

  doc.save("memorandum_of_understanding.pdf");
};

export default function MOUForm() {
  return (
    <FormWizard
      steps={steps}
      title="Memorandum Of Understanding"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="mou"
      preserveStepLayout
    />
  );
}
import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Jurisdiction", fields: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "state", label: "State", type: "text", required: true },
    { name: "province", label: "Province", type: "text", required: false },
    { name: "city", label: "City", type: "text", required: false },
  ]},
  { label: "Partners and Project", fields: [
    { name: "date", label: "Memorandum Date", type: "date", required: true },
    { name: "partnerA", label: "Partner A", type: "text", required: true },
    { name: "partnerAOffice", label: "Partner A Principal Office", type: "textarea", required: true },
    { name: "partnerB", label: "Partner B", type: "text", required: true },
    { name: "partnerBOffice", label: "Partner B Principal Office", type: "textarea", required: true },
    { name: "projectName", label: "Project Name", type: "text", required: true },
  ]},
  { label: "Services and Resources", fields: [
    { name: "partnerAServices", label: "Partner A Services", type: "textarea", required: true },
    { name: "partnerBServices", label: "Partner B Services", type: "textarea", required: true },
    { name: "partnerAResources", label: "Partner A Resources", type: "textarea", required: true },
    { name: "partnerBResources", label: "Partner B Resources", type: "textarea", required: true },
  ]},
  { label: "Term and Law", fields: [
    { name: "termStart", label: "Term Start", type: "date", required: true },
    { name: "termEnd", label: "Term End", type: "date", required: true },
    { name: "governingState", label: "Governing Law State", type: "text", required: true },
  ]},
  { label: "Signatories", fields: [
    { name: "partnerASignerName", label: "Partner A Signatory Name", type: "text", required: true },
    { name: "partnerASignerTitle", label: "Partner A Signatory Title", type: "text", required: true },
    { name: "partnerASignerSignature", label: "Partner A Signature Text", type: "text", required: true },
    { name: "partnerASignerDate", label: "Partner A Sign Date", type: "date", required: true },
    { name: "partnerBSignerName", label: "Partner B Signatory Name", type: "text", required: true },
    { name: "partnerBSignerTitle", label: "Partner B Signatory Title", type: "text", required: true },
    { name: "partnerBSignerSignature", label: "Partner B Signature Text", type: "text", required: true },
    { name: "partnerBSignerDate", label: "Partner B Sign Date", type: "date", required: true },
  ]},
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16, width = 178, lh = 5.3; let y = 18;
  const u = (val?: string, n = 14) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => { if (y + need > 285) { doc.addPage(); y = 18; } };
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width); ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal"); doc.setFontSize(10.4); doc.text(lines, left, y); y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8); doc.text(label, left, y); const x = left + doc.getTextWidth(label); const s = u(value); doc.text(s, x, y); doc.line(x, y + 1, x + doc.getTextWidth(s), y + 1); y += 6.2;
  };
  doc.setFont("times", "bold"); doc.setFontSize(13);
  const title = "MEMORANDUM OF UNDERSTANDING (MOU)";
  doc.text(title, 105, y, { align: "center" }); const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1.1, 105 + tw / 2, y + 1.1); y += 10;
  uf("Jurisdiction: ", `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`);
  p(`This Memorandum of Understanding is made on ${u(v.date, 12)} by and between ${u(v.partnerA)} at ${u(v.partnerAOffice)} ("Partner A"), and ${u(v.partnerB)} at ${u(v.partnerBOffice)} ("Partner B"), for objectives/goals relating to the ${u(v.projectName)} ("Project").`);
  p("RECITALS", true);
  p("Partners desire to collaborate, coordinate, and cooperate for the Project and set out working arrangements/mutual expectations in preparation for future binding agreement negotiations.");
  p("1. Purpose", true);
  p("This Memorandum establishes framework for future binding agreement, including responsibilities, resources, and cooperation mechanisms.");
  p("2. Obligations of the Partners", true);
  p("This Memorandum is non-binding, but each Partner agrees to act in collaborative spirit with leadership, financial commitment, administrative diligence, and managerial support.");
  p(`2.1 Services: Partner A shall provide ${u(v.partnerAServices)}. Partner B shall provide ${u(v.partnerBServices)}.`);
  p("3. Cooperation | 4. Resources | 5. Communication Strategy", true);
  p(`Partners will cooperate fully in planning, resource coordination, meetings, and activities. Partner A resources: ${u(v.partnerAResources)}. Partner B resources: ${u(v.partnerBResources)}. Public communications require prior express agreement of both Partners and coordinated transparency subject to confidentiality.`);
  p("6. Liability", true);
  p("No contractual or other liability arises between Partners solely by reason of this Memorandum.");
  p("7. Dispute Resolution", true);
  p("Disputes during negotiation of binding agreement shall be referred to Dispute Resolution Group (both Chief Executives + one mutually appointed independent representative). Group decisions are final and binding. If unresolved, no Partner is obligated to enter binding contract.");
  p("8. Term | 9. Notice | 10. Governing Law", true);
  p(`Term runs from ${u(v.termStart, 12)} to ${u(v.termEnd, 12)} unless extended by mutual written agreement. Notices by personal delivery or certified mail to stated addresses. Governing law is ${u(v.governingState)}.`);
  p("11. Additional Clauses | 12. Understanding Between Partners", true);
  p("Non-binding nature; effectiveness upon signatures; termination by written notice; no assignment without consent; amendment in writing; severability; supersession of prior discussions. Partners collaborate fully and may enter similar arrangements with others.");
  p("13. Signatories", true);
  p("Partner A:", true);
  uf("Name: ", v.partnerASignerName);
  uf("Title: ", v.partnerASignerTitle);
  uf("Signature: ", v.partnerASignerSignature);
  uf("Date: ", v.partnerASignerDate);
  p("Partner B:", true);
  uf("Name: ", v.partnerBSignerName);
  uf("Title: ", v.partnerBSignerTitle);
  uf("Signature: ", v.partnerBSignerSignature);
  uf("Date: ", v.partnerBSignerDate);
  doc.save("memorandum_of_understanding.pdf");
};

export default function MOUForm() {
  return (
    <FormWizard
      steps={steps}
      title="Memorandum Of Understanding"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="mou"
    />
  );
}
