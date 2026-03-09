import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Joint Venturers",
    fields: [
      { name: "date", label: "Agreement date", type: "date", required: true },
      { name: "jointVenturerA", label: "Joint Venturer A", type: "text", required: true },
      { name: "jointVenturerAOffice", label: "A principal office", type: "text", required: true },
      { name: "jointVenturerB", label: "Joint Venturer B", type: "text", required: true },
      { name: "jointVenturerBOffice", label: "B principal office", type: "text", required: true },
      { name: "jointVentureName", label: "Joint venture name", type: "text", required: false },
      { name: "principalBusinessPlace", label: "Principal place of business", type: "text", required: false },
      { name: "jointVentureTermUntil", label: "Term until", type: "text", required: false },
      { name: "purpose", label: "Joint venture purpose", type: "textarea", required: true },
    ],
  },
  {
    label: "Financial and IP Terms",
    fields: [
      { name: "initialContributionA", label: "Initial contribution A", type: "text", required: false },
      { name: "initialContributionB", label: "Initial contribution B", type: "text", required: false },
      { name: "ownershipA", label: "Ownership % A", type: "text", required: false },
      { name: "ownershipB", label: "Ownership % B", type: "text", required: false },
      { name: "dutiesA", label: "Duties of A", type: "textarea", required: false },
      { name: "dutiesB", label: "Duties of B", type: "textarea", required: false },
      { name: "confidentialityYears", label: "Confidentiality years", type: "text", required: false },
      { name: "governingLaw", label: "Governing law state/country", type: "text", required: true },
      { name: "mediationLocation", label: "Mediation location", type: "text", required: false },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "aSignName", label: "A sign name", type: "text", required: false },
      { name: "aSignTitle", label: "A sign title", type: "text", required: false },
      { name: "aSignDate", label: "A sign date", type: "date", required: false },
      { name: "bSignName", label: "B sign name", type: "text", required: false },
      { name: "bSignTitle", label: "B sign title", type: "text", required: false },
      { name: "bSignDate", label: "B sign date", type: "date", required: false },
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

  const u = (v?: string, n = 18) => (v || "").trim() || "_".repeat(n);
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
  const title = "JOINT VENTURE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Joint Venture Agreement is made and entered into as of ${u(values.date, 12)}, by and between ${u(values.jointVenturerA, 18)}, having its principal office at ${u(values.jointVenturerAOffice, 18)}, and ${u(values.jointVenturerB, 18)}, having its principal office at ${u(values.jointVenturerBOffice, 18)}.`);
  p("Each may be referred to individually as a \"Joint Venturer\" and collectively as the \"Joint Venturers\" or the \"Parties.\"");
  p("In consideration of the mutual promises, covenants, warranties, and agreements contained herein, the Joint Venturers agree as follows:");
  p("1. NAME AND LEGAL TITLE", true);
  p(`The Joint Venturers hereby form and establish a joint venture under the name ${u(values.jointVentureName, 16)} (the "Joint Venture"). Legal title to all property and assets remains in the name of the Joint Venture.`);
  p("2. PLACE OF BUSINESS AND TERM", true);
  p(`Principal place of business: ${u(values.principalBusinessPlace, 16)}. Term starts on execution and continues until ${u(values.jointVentureTermUntil, 12)}, unless earlier dissolved in accordance with this Agreement.`);
  p("3. PURPOSE", true);
  p(`Purpose of the Joint Venture: ${u(values.purpose, 20)}. Each Joint Venturer owns an undivided fractional interest. No other business may be engaged in without prior written consent of all Joint Venturers.`);
  p("4. CAPITAL CONTRIBUTIONS", true);
  p(`Initial contributions: ${u(values.jointVenturerA, 8)} = ${u(values.initialContributionA, 10)}, ${u(values.jointVenturerB, 8)} = ${u(values.initialContributionB, 10)}. Additional contributions, financing, and guarantees may be arranged as mutually agreed.`);
  p("5. PERCENTAGE INTERESTS", true);
  p(`${u(values.jointVenturerA, 8)}: ${u(values.ownershipA, 5)}% | ${u(values.jointVenturerB, 8)}: ${u(values.ownershipB, 5)}%.`);
  p("6. PROFITS AND LOSSES", true);
  p("Net profits are distributed by ownership percentages. Losses, expenses, and disbursements are borne proportionally.");
  p("7. DUTIES OF JOINT VENTURERS", true);
  p(`Duties of ${u(values.jointVenturerA, 8)}: ${u(values.dutiesA, 16)}. Duties of ${u(values.jointVenturerB, 8)}: ${u(values.dutiesB, 16)}.`);
  p("8. DEFINITIONS", true);
  p("Intellectual Property Rights, Technology, Technology Improvements, Confidential Information, and Derivative Works are defined and governed by this Agreement.");
  p("9. POWERS OF JOINT VENTURERS", true);
  p("Borrowing, guarantees, extraordinary acquisitions, encumbrance/sale of JV assets, judgments/liens, and non-routine expenditures require consent of all Joint Venturers.");
  p("10. TREATMENT OF PROPRIETARY AND CONFIDENTIAL INFORMATION", true);
  p(`Confidential information remains disclosing party property and is returned upon request. During the term and for ${u(values.confidentialityYears, 5)} years thereafter, receiving party maintains confidentiality and limits access to need-to-know personnel/approved providers.`);
  p("11. TERMINATION AND DISSOLUTION", true);
  p("JV may be terminated by mutual written consent or completion of purpose. On termination, assets are liquidated, liabilities satisfied, and remaining funds distributed by ownership percentages.");
  p("12. GOVERNING LAW", true);
  p(`This Agreement is governed by the laws of ${u(values.governingLaw, 16)}.`);
  p("13. DISPUTE RESOLUTION", true);
  p(`Disputes are first addressed through friendly negotiations, then mediation in ${u(values.mediationLocation, 10)}, and if unresolved, remedies under applicable law.`);
  p("14. AMENDMENT AND ASSIGNMENT", true);
  p("Amendments must be in writing signed by all Joint Venturers. No assignment/transfer without prior written consent.");
  p("15. SEVERABILITY | 16. ENTIRE AGREEMENT | 17. SIGNATORIES", true);
  p("Invalid provisions are severed while remaining provisions continue in force. This Agreement supersedes prior understandings.", false, 3);
  p(`[${u(values.jointVenturerA, 10)}]`);
  p("By: ___________________________");
  uf("Name", values.aSignName, 22);
  uf("Title", values.aSignTitle, 22);
  uf("Date", values.aSignDate, 22, 2.6);
  p(`[${u(values.jointVenturerB, 10)}]`);
  p("By: ___________________________");
  uf("Name", values.bSignName, 22);
  uf("Title", values.bSignTitle, 22);
  uf("Date", values.bSignDate, 22);

  doc.save("joint_venture_agreement.pdf");
};

export default function JointVentureAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Joint Venture Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="jointventureagreement"
    />
  );
}
