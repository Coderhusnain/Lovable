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
      { name: "executionDay", label: "Execution Day", type: "text", required: true, placeholder: "___" },
      { name: "executionMonth", label: "Execution Month", type: "text", required: true, placeholder: "__________" },
      { name: "executionYear", label: "Execution Year", type: "text", required: true, placeholder: "20__" },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      { name: "state", label: "State/Province/Region", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
      { name: "city", label: "City", type: "text", required: true },
      { name: "governingLawState", label: "Governing Law State", type: "select", required: true, dependsOn: "country", getOptions: (values) => getStateOptions(values.country) },
    ],
  },
  {
    label: "Assignor and Assignee",
    fields: [
      { name: "assignorName", label: "Assignor Name", type: "text", required: true },
      { name: "assignorAddress", label: "Assignor Address", type: "textarea", required: true },
      { name: "assigneeName", label: "Assignee Name", type: "text", required: true },
      { name: "assigneeAddress", label: "Assignee Address", type: "textarea", required: true },
      { name: "copyrightTitle", label: "Title of Copyrighted Work", type: "text", required: true },
      { name: "exhibitADescription", label: "Exhibit A Description", type: "textarea", required: true },
    ],
  },
  {
    label: "Assignment and Scope",
    fields: [
      { name: "rightsScopeNotes", label: "Rights scope notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Warranties and Moral Rights",
    fields: [
      { name: "warrantyNotes", label: "Warranties/moral rights notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Legal Terms",
    fields: [
      { name: "legalTermsNotes", label: "Assignment legal terms notes (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "assignorSignName", label: "Assignor Name (Signature Block)", type: "text", required: true },
      { name: "assignorSignature", label: "Assignor Signature", type: "text", required: true },
      { name: "assignorDate", label: "Assignor Date", type: "date", required: true },
      { name: "assigneeSignName", label: "Assignee Name (Signature Block)", type: "text", required: true },
      { name: "assigneeSignature", label: "Assignee Signature", type: "text", required: true },
      { name: "assigneeDate", label: "Assignee Date", type: "date", required: true },
    ],
  },
  {
    label: "Final Review",
    fields: [{ name: "finalNotes", label: "Final notes (optional)", type: "textarea", required: false }],
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
  const title = "COPYRIGHT ASSIGNMENT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction: ", `${u(v.city)}, ${u(v.state)}, ${u(v.country)}`);
  p(`This Copyright Assignment (hereinafter referred to as the "Assignment") is made and entered into on this ${u(v.executionDay, 3)} day of ${u(v.executionMonth)}, ${u(v.executionYear, 4)}, by and between:`);
  p(`${u(v.assignorName)}, residing at ${u(v.assignorAddress)} (hereinafter referred to as "Assignor"),`);
  p("AND");
  p(`${u(v.assigneeName)}, residing at ${u(v.assigneeAddress)} (hereinafter referred to as "Assignee").`);

  p("1. Ownership and Representation", true);
  p(`The Assignor hereby represents, warrants, and affirms that they are the sole creator and exclusive owner of the copyrighted work entitled "${u(v.copyrightTitle)}" (hereinafter referred to as the "Copyrighted Work").`);

  p("2. Assignment of Rights", true);
  p(`For good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, the Assignor irrevocably assigns, transfers, and conveys to the Assignee all right, title, and interest, including all copyrights and associated rights, in and to the Copyrighted Work, as described in Exhibit A, which is attached hereto and made a part of this Assignment. Exhibit A: ${u(v.exhibitADescription)}.`);

  p("3. Scope of Assigned Rights", true);
  p("The rights assigned to the Assignee include, without limitation, the full and exclusive right to exploit, reproduce, publish, distribute, perform, display, license, modify, and otherwise use the Copyrighted Work in any manner and in all forms, media, or technologies now known or hereafter developed. The Assignee shall have the right to take any and all actions necessary or desirable to enforce and protect these rights, including initiating legal proceedings in the name of the Assignor, the Assignee, or both.");
  if ((v.rightsScopeNotes || "").trim()) p(v.rightsScopeNotes);

  p("4. Registrations and Renewals", true);
  p("The Assignor further assigns and conveys all rights necessary for the Assignee to obtain and maintain copyright registrations, renewals, extensions, and reissues in relation to the Copyrighted Work, and agrees to cooperate with and assist the Assignee in executing any documents or taking any action required to perfect or enforce the rights assigned herein.");

  p("5. Warranties and Representations", true);
  p("The Assignor hereby covenants, warrants, and represents that:");
  p("(a) The Assignor is the sole and exclusive creator and owner of the Copyrighted Work and has full authority to assign the rights granted herein;");
  p("(b) The Copyrighted Work is original, free from any third-party claims, liens, encumbrances, licenses, or obligations, and does not infringe upon the rights of any third party;");
  p("(c) There are no existing agreements or understandings that would conflict with or impair the rights transferred under this Assignment.");
  if ((v.warrantyNotes || "").trim()) p(v.warrantyNotes);

  p("6. Waiver of Moral Rights", true);
  p("To the maximum extent permitted by applicable law, the Assignor hereby irrevocably waives any and all moral rights, including, but not limited to:");
  p("- The right of attribution or the right to be identified as the author of the Copyrighted Work;");
  p("- The right to object to any modification, alteration, distortion, or mutilation of the Copyrighted Work;");
  p("- The right to withdraw the work from circulation;");
  p("- The right to prevent others from being falsely credited or attributed as the author of the Copyrighted Work;");
  p("- Any other right recognized under applicable moral rights or authorship laws.");

  p("7. Governing Law", true);
  p(`This Assignment shall be governed by and construed in accordance with the laws of the State of ${u(v.governingLawState)}, without regard to its conflict of laws provisions.`);
  if ((v.legalTermsNotes || "").trim()) p(v.legalTermsNotes);

  p("IN WITNESS WHEREOF, the Assignor has executed this Assignment voluntarily and with full authority, as of the day and year first above written.", true);
  p("ASSIGNOR:", true);
  uf("Name: ", v.assignorSignName);
  uf("Signature: ", v.assignorSignature);
  uf("Date: ", v.assignorDate);
  p("ASSIGNEE:", true);
  uf("Name: ", v.assigneeSignName);
  uf("Signature: ", v.assigneeSignature);
  uf("Date: ", v.assigneeDate);
  if ((v.finalNotes || "").trim()) p(v.finalNotes);

  doc.save("copyright_assignment.pdf");
};

export default function CopyrightAssignment() {
  return (
    <FormWizard
      steps={steps}
      title="Copyright Assignment"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="copyrightassignment"
      preserveStepLayout
    />
  );
}
