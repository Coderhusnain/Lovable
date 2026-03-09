import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "offerorName", label: "Offeror name", type: "text", required: true },
      { name: "offerorAddress", label: "Offeror address", type: "text", required: false },
      { name: "offereeName", label: "Offeree name", type: "text", required: true },
      { name: "offereeAddress", label: "Offeree address", type: "text", required: false },
    ],
  },
  {
    label: "Goods and Terms",
    fields: [
      { name: "offerorDescription", label: "Offeror goods description", type: "textarea", required: false },
      { name: "offerorCondition", label: "Offeror goods condition", type: "text", required: false },
      { name: "offereeDescription", label: "Offeree goods description", type: "textarea", required: false },
      { name: "offereeCondition", label: "Offeree goods condition", type: "text", required: false },
      { name: "exchangeDate", label: "Delivery/exchange date", type: "date", required: false },
      { name: "governingLaw", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "offerorSignerDate", label: "Offeror sign date", type: "date", required: false },
      { name: "offereeSignerDate", label: "Offeree sign date", type: "date", required: false },
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
  const u = (value?: string, min = 14) => (value || "").trim() || " ".repeat(min);
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
  const uf = (label: string, value?: string, min = 20) => {
    const labelText = `${label}: `;
    const shown = (value || "").trim();
    if (y + lh + 1.8 > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(14, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth(" ".repeat(min)), y + 1.1);
    }
    y += lh + 1.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "BARTER AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Barter Agreement ("Agreement") is made and entered into as of ${u(values.effectiveDate, 12)} (the "Effective Date"), by and between ${u(values.offerorName, 12)}, having its address at ${u(values.offerorAddress, 14)} ("Offeror"), and ${u(values.offereeName, 12)}, having its address at ${u(values.offereeAddress, 14)} ("Offeree"). The Offeror and Offeree may be referred to individually as a "Party" and collectively as the "Parties".`, false, 3);
  p("1. Bartered Goods", true);
  p("1.1 Goods Offered by the Offeror");
  p(`Description: ${u(values.offerorDescription, 14)}`);
  p(`Condition: ${u(values.offerorCondition, 10)}`);
  p("1.2 Goods Offered by the Offeree");
  p(`Description: ${u(values.offereeDescription, 14)}`);
  p(`Condition: ${u(values.offereeCondition, 10)}`);
  p('The above goods shall collectively be referred to as the "Bartered Goods".');
  p("2. Delivery and Exchange", true);
  p(`The Parties agree that delivery and exchange of Bartered Goods shall occur on or before ${u(values.exchangeDate, 12)}, at a mutually agreed location and manner. Each Party shall deliver goods in stated condition and according to agreed schedule.`);
  p("Each Party further agrees to disclose any anticipated charges, costs, or fees before any exchange of goods/services.");
  p("3. Delivery Schedule", true);
  p("The Parties shall strictly adhere to mutually agreed delivery schedule and ensure conformity to descriptions and conditions at delivery.");
  p("4. Termination", true);
  p("If either Party elects to terminate this Agreement or barter arrangement, terminating Party shall fairly compensate non-terminating Party for goods/services provided up to effective termination date.");
  p("5. Agreement Freely Entered Into", true);
  p("Each Party warrants it has freely, voluntarily, and lawfully entered this Agreement and undertakes full compliance.");
  p("6. Finality of Valuation", true);
  p("Each Party acknowledges valuation assigned to the other Party's Bartered Goods as final and binding and reflective of fair market value to best of knowledge.");
  p("7. Mutual Representations and Warranties", true);
  p("Each Party represents and warrants legal capacity/authority; lawful ownership and transferability of offered goods free from liens/claims; non-infringement of third-party rights; and accuracy/completeness of information.");
  p("8. Mutual Indemnification", true);
  p("Each Party shall indemnify, defend, and hold harmless the other Party and its affiliates/representatives against third-party claims, losses, liabilities, damages, and costs (including legal fees) arising from material breach, misrepresentation, or warranty non-compliance.");
  p("9. Alternative Dispute Resolution", true);
  p("Parties shall first attempt good-faith amicable negotiation. If unresolved, dispute shall be submitted to mediation under applicable statutory rules.");
  p("10. Further Assurances", true);
  p("Parties shall execute additional documents and take further actions reasonably required to give full effect to this Agreement.");
  p("11. Assignment", true);
  p("No Party may assign/transfer/delegate rights or obligations without prior written consent of other Party; unauthorized assignment is null and void.");
  p("12. Notices", true);
  p("Notices shall be duly given if personally delivered or sent by registered/certified mail, return receipt requested, to stated addresses or other designated written notice address.");
  p("13. Entire Agreement", true);
  p("This Agreement constitutes entire understanding and supersedes prior negotiations/discussions/representations/agreements.");
  p("14. Waiver", true);
  p("Failure to enforce any provision does not constitute waiver of that or any other provision and does not affect later enforcement.");
  p("15. Severability", true);
  p("If any provision is invalid/illegal/unenforceable, it shall be modified to minimum extent necessary and remaining provisions remain in full force.");
  p("16. Governing Law", true);
  p(`This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw, 12)}.`);
  p("17. Execution and Signatures", true);
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");
  p("For the Offeror:");
  uf("Name", values.offerorName, 22);
  p("Signature: __________________________");
  uf("Date", values.offerorSignerDate, 14);
  p("For the Offeree:");
  uf("Name", values.offereeName, 22);
  p("Signature: __________________________");
  uf("Date", values.offereeSignerDate, 14);

  doc.save("barter_agreement.pdf");
};

export default function BarterAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Barter Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="barteragreement"
    />
  );
}
