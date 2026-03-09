import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Court and Claim",
    fields: [
      { name: "courtName", label: "Court name", type: "text", required: true },
      { name: "courtLine2", label: "Court location line", type: "text", required: false },
      { name: "estateName", label: "Estate name", type: "text", required: true },
      { name: "caseNumber", label: "Case number", type: "text", required: true },
      { name: "claimAmount", label: "Claim amount", type: "text", required: true, placeholder: "$0.00" },
      { name: "obligationDescription", label: "Obligation description", type: "textarea", required: true },
      { name: "exhibitsDescription", label: "Exhibits description", type: "textarea", required: true },
      { name: "securityDescription", label: "Security held for claim", type: "textarea", required: false },
      { name: "executionDate", label: "Affirmation execution date", type: "date", required: true },
      { name: "claimantName", label: "Claimant / Affiant printed name", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  let y = 20;
  const bottom = 280;
  const p = (t: string, b = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 22, gap = 1.8) => {
    const shown = (value || "").trim();
    const labelText = `${label}: `;
    if (y + lh + gap > bottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
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

  const title = "STATEMENT OF CLAIM AGAINST ESTATE";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`IN THE COURT OF ${v.courtName || "__________"}`);
  p(`${v.courtLine2 || "__________, __________, __________"}`);
  p("IN THE MATTER OF THE ESTATE OF");
  p(`${v.estateName || "________________________"}`);
  p(`Case Number: ${v.caseNumber || "________________________"}`, false, 3);
  p("CLAIM AGAINST ESTATE", true);
  p(`1. The undersigned states that the Claimant is a creditor of the Estate of ${v.estateName || "________________________"}.`);
  p(`2. The Claimant further states that the Estate is indebted to the Claimant in the amount of ${v.claimAmount || "$0.00"}, arising from the following obligation: ${v.obligationDescription || "________________________________________."}`);
  p(`3. The following documents are attached and incorporated as Exhibits, and constitute proof of the Claim: ${v.exhibitsDescription || "________________________________________."}`);
  p(`4. The Claimant holds security for the Claim as follows: ${v.securityDescription || "________________________________________."}`);
  p("5. The Affiant states that the Affiant is the Claimant, and that all credits, payments, and offsets to which the Estate is entitled have been duly applied. The balance claimed herein is justly due and owing.");
  p("6. The undersigned swears and affirms that the matters set forth are true and correct to the best of the undersigned's knowledge, information, and belief, and are made subject to penalties prescribed by law for false affidavit or declaration.", false, 3);
  p("AFFIRMATION", true);
  uf("Executed this", v.executionDate, 24);
  p("Claimant / Affiant:");
  p("Signature");
  uf("Printed Name", v.claimantName, 22, 4);

  p("FINAL CHECKLIST FOR STATEMENT OF CLAIM AGAINST ESTATE", true);
  p("Make It Legal");
  p("- [ ] Review the Statement of Claim Against Estate to confirm it accurately reflects your intentions. If revisions are required, edits may be made online or in Word format.");
  p("- [ ] Ensure all supporting documents are properly attached and uploaded for a complete claim file.");
  p("Copies");
  p("- [ ] Retain a copy for your records.");
  p("- [ ] Maintain an original signed copy in a secure location and store an electronic copy for future reference/sharing.");

  doc.save("statement_of_claim_against_estate.pdf");
};

export default function StatementOfClaimAgainstEstateForm() {
  return (
    <FormWizard
      steps={steps}
      title="Statement of Claim Against Estate"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="statementofclaimagainstestate"
    />
  );
}
