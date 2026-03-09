import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Core Terms",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "party1", label: "Party 1", type: "text", required: true },
      { name: "party1Address", label: "Party 1 address", type: "text", required: false },
      { name: "party2", label: "Party 2", type: "text", required: true },
      { name: "party2Address", label: "Party 2 address", type: "text", required: false },
      { name: "scopeActivities", label: "Scope of activities", type: "textarea", required: false },
      { name: "initialTermMonths", label: "Initial term months", type: "text", required: false },
      { name: "renewalMonths", label: "Renewal months", type: "text", required: false },
      { name: "terminationNoticeDays", label: "Convenience termination days", type: "text", required: false },
      { name: "liabilityCap", label: "Liability cap", type: "text", required: false },
      { name: "governingState", label: "Governing state", type: "text", required: true },
      { name: "venue", label: "Venue", type: "text", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.5, limit = 280;
  let y = 20;
  const u = (v?: string, min = 14) => (v || "").trim() || " ".repeat(min);
  const p = (t: string, b = false, g = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + g;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "MARKETING AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.1, w / 2 + tW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Marketing Agreement is dated ${u(values.effectiveDate, 12)} by and between ${u(values.party1, 12)} at ${u(values.party1Address, 12)} and ${u(values.party2, 12)} at ${u(values.party2Address, 12)} (each a "Party", collectively "Parties").`, false, 3);
  p("RECITALS", true);
  p("Parties desire an exclusive strategic marketing relationship and agree this Agreement may be amended only by written instrument executed by both Parties.");
  p("1. Scope of Activities", true);
  p(`The Parties will conduct: ${u(values.scopeActivities, 16)}.`);
  p("2. Reporting", true);
  p("Within 10 days after each month-end, each Party provides monthly reports with data needed to determine traffic, completed sales, revenue, and conversions generated under this Agreement.");
  p("3. Tracking of Users", true);
  p("Each Party shall maintain reasonable tracking mechanisms to identify linked users and purchases across sites/services.");
  p("4. Licenses", true);
  p("Each Party grants the other non-exclusive, non-transferable, royalty-free license to use marks solely for performance, with prior written approval required for usage/modification; ownership/goodwill remain with owner.");
  p("5. Term and Termination", true);
  p(`Initial term is ${u(values.initialTermMonths, 4)} months from Effective Date; automatic renewal for ${u(values.renewalMonths, 4)}-month periods unless terminated. Termination for cause after 30-day cure; for convenience after initial term with ${u(values.terminationNoticeDays, 4)} days notice.`);
  p("6. Warranties; Disclaimer", true);
  p("Each Party warrants authority and binding effect; disclaims all implied warranties except expressly stated.");
  p("7. Indemnification", true);
  p("Mutual indemnification applies for IP-related and other covered claims with notice/defense/settlement procedures.");
  p("8. Confidentiality", true);
  p("Confidential information protections, exceptions, injunctive relief rights, and survival obligations apply.");
  p("9. Limitation of Liability", true);
  p(`No indirect/incidental/special/consequential/punitive damages. Aggregate liability cap: ${u(values.liabilityCap, 8)}, except indemnification/confidentiality obligations.`);
  p("10-11. Publicity and Miscellaneous", true);
  p(`No unauthorized publicity; notices in writing; entire agreement; waiver; force majeure; headings; amendments; severability; assignment; independent contractor status; records retention; governing law ${u(values.governingState, 10)} with venue ${u(values.venue, 10)}.`);
  p("12. Signatories", true);
  p("Party 1 By/Name/Title/Date; Party 2 By/Name/Title/Date.");

  doc.save("marketing_agreement.pdf");
};

export default function MarketingAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Marketing Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="marketingagreement"
    />
  );
}
