import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Work",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "partyOneName", label: "Party One full name", type: "text", required: true },
      { name: "partyOneAddress", label: "Party One address", type: "text", required: true },
      { name: "partyTwoName", label: "Party Two full name", type: "text", required: true },
      { name: "partyTwoAddress", label: "Party Two address", type: "text", required: true },
      { name: "workType", label: "Type of work", type: "text", required: true },
      { name: "workTitle", label: "Work title", type: "text", required: true },
      { name: "creditTerms", label: "Credit terms text", type: "text", required: true },
      { name: "confidentialityPeriod", label: "Confidentiality period", type: "text", required: false },
      { name: "partyOneShare", label: "Party One proceeds %", type: "text", required: true },
      { name: "partyTwoShare", label: "Party Two proceeds %", type: "text", required: true },
      { name: "governingState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Termination and Signature",
    fields: [
      { name: "cureDays", label: "Material breach cure days", type: "text", required: true },
      { name: "partyOneSignName", label: "Party One signature name", type: "text", required: false },
      { name: "partyOneSignDate", label: "Party One sign date", type: "date", required: true },
      { name: "partyTwoSignName", label: "Party Two signature name", type: "text", required: false },
      { name: "partyTwoSignDate", label: "Party Two sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 18, tw = w - m * 2, lh = 5.6, limit = 280;
  let y = 20;
  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };
  const p = (t: string, b = false, g = 1.8) => {
    const lines = doc.splitTextToSize(t, tw);
    if (y + lines.length * lh + g > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + g;
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
    const startX = m + doc.getTextWidth(labelText);
    if (shown) {
      doc.text(shown, startX, y);
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + Math.max(12, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "COLLABORATION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - titleW / 2, y + 1.2, w / 2 + titleW / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  p(`This Collaboration Agreement is made on ${u(values.effectiveDate, 12)} by and between ${u(values.partyOneName, 20)} at ${u(values.partyOneAddress, 20)}, and ${u(values.partyTwoName, 20)} at ${u(values.partyTwoAddress, 20)}.`);
  p('Party One and Party Two are collectively "Parties" and individually a "Party".', false, 3);
  p("1. PURPOSE AND COLLABORATION", true);
  p(`Parties collaborate to create/develop/produce a ${u(values.workType, 16)} tentatively titled "${u(values.workTitle, 16)}" (the "Work"), including related ancillary rights.`);
  p("2. JOINT OWNERSHIP AND COPYRIGHT", true);
  p("Work is a joint work; absent written agreement otherwise, Parties hold equal and undivided ownership in copyright and related IP.");
  p("3. OBLIGATIONS AND RESPONSIBILITIES", true);
  p("3.1 Each Party shall perform its obligations in a professional, timely, and diligent manner and shall exercise reasonable skill and care.");
  p("3.2 The Parties shall ensure uninterrupted exchange of information, access to relevant data, and cooperation necessary for efficient implementation, subject to agreed confidentiality/access protocols.");
  p("3.3 Each Party shall promptly disclose material third-party communications regarding the Work/Project.");
  p("4. RESTRICTION ON INDIVIDUAL ACTS", true);
  p("4.1 No Party shall independently enter any contract/license/assignment affecting rights in the Work without prior written consent of the other Party.");
  p("4.2 Either Party may grant written power of attorney to the other for execution of specific agreements relating to the Work, provided authority is clearly defined and documented.");
  p("5. APPOINTMENT OF AGENT", true);
  p("5.1 Parties may mutually appoint an Agent to represent them exclusively in promotion, negotiation, licensing, and exploitation of the Work and Ancillary Rights under a separate written Agency Agreement.");
  p("5.2 In absence of an agreed Agent within a reasonable period, either Party may negotiate directly with third parties; however, no Party shall charge or receive any commission/agency fee/related compensation.");
  p("6. MODIFICATIONS TO COMPLETED WORK", true);
  p("6.1 No alterations/revisions/adaptations/modifications to completed Work shall be made without prior written approval of the other Party, which shall not be unreasonably withheld or delayed.");
  p("7. PRODUCTION AND LICENSING AGREEMENTS", true);
  p("7.1 All agreements relating to production/publication/licensing/exploitation of the Work shall be executed in duplicate, with copy furnished to each Party.");
  p("7.2 Any such agreement shall expressly provide for direct payment of sums due to each Party, or payments administered by Agent under Agency Agreement.");
  p("8. AUTHORSHIP AND CREDIT", true);
  p(`All credits shall state "${u(values.creditTerms, 18)} by ${u(values.partyOneName, 16)} and ${u(values.partyTwoName, 16)}" with equal prominence.`);
  p("9. RESTRICTION ON TRANSFER OF RIGHTS", true);
  p("No transfer/encumbrance of Work rights without prior written consent; right of first refusal applies.");
  p("10. CONFIDENTIALITY", true);
  p(`Confidential materials exchanged under this Agreement shall remain confidential for at least ${u(values.confidentialityPeriod, 16)} from disclosure, except as required by law.`);
  p("11. FORCE MAJEURE", true);
  p("11.1 Neither Party shall be liable for failure/delay resulting from events beyond reasonable control, including acts of God, natural disasters, war, civil unrest, pandemics, governmental actions, or utility failures.");
  p("11.2 Affected Party shall notify the other promptly and use reasonable efforts to resume performance as soon as practicable.");
  p("12. FINANCIAL ARRANGEMENTS", true);
  p(`Proceeds: Party One ${u(values.partyOneShare, 8)}%, Party Two ${u(values.partyTwoShare, 8)}%. Expenses follow same proportion unless agreed otherwise in writing.`);
  p("12.3 Each Party remains solely responsible for its own tax obligations and indemnifies the other against related liabilities.");
  p("13. TERM AND TERMINATION", true);
  p(`13.1 This Agreement remains in force for the entire copyright term and extensions. 13.2 In event of death of a Party, surviving Party shall continue performance/credit while estate retains financial entitlements. 13.3 A Party may terminate on material breach after written notice and ${u(values.cureDays, 8)} working-day cure period.`);
  p("14. DISPUTE RESOLUTION", true);
  p("14.1 Disputes shall first be resolved amicably through negotiation. 14.2 Failing resolution, dispute shall be referred to mediation, and if unresolved, to arbitration or legal proceedings as mutually agreed.");
  p("15. GOVERNING LAW", true);
  p(`This Agreement shall be governed and construed in accordance with laws of the State of ${u(values.governingState, 14)}.`);
  p("16. NOTICES", true);
  p("All notices under this Agreement shall be in writing and delivered by registered post or recognized courier service to the addresses stated above.");
  p("17. ENTIRE AGREEMENT", true);
  p("This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements/representations/understandings.");
  p("18. SEVERABILITY", true);
  p("If any provision is held invalid, the remainder continues in full force and effect.");
  p("19. AMENDMENTS", true);
  p("This Agreement may be amended only by written instrument signed by both Parties.");
  p("20. NO PARTNERSHIP", true);
  p("Nothing herein creates a partnership, joint venture, or agency relationship.");
  p("21. WAIVER", true);
  p("No waiver is valid unless in writing and signed by the waiving Party.");
  p("22. RESERVATION OF RIGHTS", true);
  p("All rights not expressly granted remain reserved to the respective Parties.");
  p("23. ADDITIONAL INSTRUMENTS", true);
  p("Parties shall execute all further documents required to give effect to this Agreement.");
  p("24. SUCCESSORS AND ASSIGNS", true);
  p("This Agreement binds and benefits the Parties and their lawful successors and assigns.", false, 3);
  p("IN WITNESS WHEREOF", true);
  p("Party One Signature");
  p(`Name: ${u(values.partyOneSignName, 20)}`);
  uf("Date", values.partyOneSignDate, 22);
  p("Party Two Signature");
  p(`Name: ${u(values.partyTwoSignName, 20)}`);
  uf("Date", values.partyTwoSignDate, 22);

  doc.save("collaboration_agreement.pdf");
};

export default function CollaborationAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Collaboration Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="collaborationagreement"
    />
  );
}
