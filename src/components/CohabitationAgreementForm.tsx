import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "party1Name", label: "Party 1 full legal name", type: "text", required: true },
      { name: "party2Name", label: "Party 2 full legal name", type: "text", required: true },
    ],
  },
  {
    label: "Governing Terms",
    fields: [
      { name: "governingState", label: "Governing law state", type: "text", required: true },
      { name: "terminationDays", label: "Termination notice days", type: "text", required: true, placeholder: "30" },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "party1SignDate", label: "Party 1 signature date", type: "date", required: true },
      { name: "party2SignDate", label: "Party 2 signature date", type: "date", required: true },
      { name: "notaryDate", label: "Notary sworn date", type: "date", required: true },
      { name: "notaryName", label: "Notary public name", type: "text", required: true },
      { name: "notaryCommissionExpires", label: "Notary commission expires", type: "text", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 20;

  const u = (v?: string, n = 18) => {
    const t = (v || "").trim();
    return t || "_".repeat(n);
  };
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const labelText = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(22, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.8);
  const title = "COHABITATION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.3, w / 2 + titleW / 2, y + 1.3);
  y += 9;
  doc.setFontSize(10.5);

  p(
    `This Cohabitation Agreement ("Agreement") is made and entered into on ${u(values.agreementDate)}, by and between ${u(values.party1Name)} and ${u(values.party2Name)} (collectively, the "Parties"), with reference to the following recitals:`
  );
  p("RECITALS", true);
  p("1. The Parties affirm that they are not now married to each other, have never been married to each other, and have no present intention of marrying one another.");
  p('2. The Parties desire to reside together in a conjugal, nonmarital relationship for an indefinite period of time in the future (the "Cohabitation Period").');
  p("3. The Parties wish to set forth in writing their mutual understanding with respect to their respective rights, obligations, and expectations regarding each other and regarding any real, personal, or mixed property before, during, and after the Cohabitation Period.");
  p("NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:", false, 2.4);

  p("1. Agreement Not to Be Governed by State Laws of Marriage and Dissolution", true);
  p("The Parties do not intend their relationship to be governed by family-code or comparable marriage and dissolution law provisions.");
  p("2. Relationship of the Parties", true);
  p("Any confidential relationship arising during cohabitation shall not impose fiduciary duties except as expressly provided in this Agreement.");
  p("3. Public Recognition of Relationship", true);
  p("Each Party retains their legal name and shall not hold themselves out as married absent written agreement.");
  p("4. Property Acquired During Term", true);
  p("Property acquired by either Party after the effective date, and all related income and profits, remains the acquiring Party's separate property.");
  p("5. Earnings", true);
  p("All personal earnings, salaries, commissions, and compensation remain separate property.");
  p("6. Jointly Acquired Property", true);
  p("Jointly acquired property is equal one-half ownership unless otherwise proven in a written agreement.");
  p("7. Property Passing Between Parties", true);
  p("A transfer between Parties is presumed a gift unless valuable consideration is proven in writing.");
  p("8. Property Acquired by Gift, Bequest, Devise, or Descent", true);
  p("Such property remains separate unless acquired jointly and otherwise documented.");
  p("9. Joint Bank Account", true);
  p("The Parties may open a joint checking account for agreed household expenses with monthly contributions in agreed proportions.");
  p("10. Jointly Purchased Property", true);
  p("Jointly purchased property shall be acquired from separate funds and governed by written disposition terms.");
  p("11. Compensation for Services Rendered", true);
  p("No compensation claim for services before execution; services during relationship are presumed voluntary unless otherwise agreed.");
  p("12. Full Disclosure of Property", true);
  p("Each Party warrants full disclosure of property interests and waives further disclosure rights.");
  p("13. Waiver of Right to Support and Other Rights", true);
  p("Voluntary support during cohabitation does not create post-termination support rights; maintenance/support rights are waived.");
  p("14. Effective Date", true);
  p("This Agreement takes effect on the date first written above.");
  p("15. Termination", true);
  p(
    `Either Party may terminate this Agreement upon ${u(values.terminationDays, 2)} days prior written notice. Termination is automatic upon marriage between the Parties or either Party's marriage to a third party.`
  );
  p("16. Household Expenses and Responsibilities", true);
  p("Household responsibilities and expenses shall be shared equally, paid from the joint account.");
  p("17. General Release", true);
  p("Each Party releases the other from claims related to property, support, inheritance, or other matters except as expressly preserved.");
  p("18. Attorneys' Fees", true);
  p("Each Party bears their own attorneys' fees, court costs, and related expenses in enforcement litigation.");
  p("19. Consideration", true);
  p("Consideration consists of the mutual promises and covenants herein.");
  p("20. Severability", true);
  p("If a provision is invalid or unenforceable, the remainder remains in force and is modified only as necessary to be valid.");
  p("21. Execution of Documents", true);
  p("Each Party shall execute additional instruments reasonably necessary to carry out this Agreement.");
  p("22. Waiver of Breach", true);
  p("Waiver of one breach is not waiver of another breach.");
  p("23. Entire Agreement", true);
  p("This Agreement is the entire understanding and supersedes all prior negotiations and understandings.");
  p("24. Governing Law", true);
  p(`This Agreement is governed by the laws of the State of ${u(values.governingState)}.`);
  p("25. Acknowledgment of Advisement of Rights", true);
  p("Each Party enters voluntarily, free from duress, and with full understanding and opportunity to seek independent legal advice.", false, 2.4);

  p("IN WITNESS WHEREOF, the Parties have executed this Agreement on the date first written above.", true, 2);
  uf("Party 1", values.party1Name);
  uf("Date", values.party1SignDate);
  uf("Party 2", values.party2Name);
  uf("Date", values.party2SignDate);
  p(`STATE OF ${u(values.governingState)} )`);
  p("COUNTY OF ____________________ ) ss:");
  p(
    `Subscribed and sworn before me this ${u(values.notaryDate, 8)} by ${u(values.party1Name)} and ${u(values.party2Name)}.`
  );
  uf("Notary Public", values.notaryName);
  uf("My Commission Expires", values.notaryCommissionExpires);

  doc.save("cohabitation_agreement.pdf");
};

export default function CohabitationAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Cohabitation Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="cohabitationagreement"
    />
  );
}
