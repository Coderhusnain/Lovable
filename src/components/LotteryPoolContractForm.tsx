import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Pool Details",
    fields: [
      { name: "agreementDate", label: "Date", type: "date", required: false },
      { name: "totalContribution", label: "Total contribution amount", type: "text", required: false },
      { name: "entryCountWords", label: "Entry count text", type: "text", required: false },
      { name: "entryCountNumber", label: "Entry count number", type: "text", required: false },
      { name: "coveredEntries", label: "Covered entries", type: "text", required: false },
      { name: "lotteryName", label: "Lottery drawing name", type: "text", required: false },
      { name: "drawingDate", label: "Drawing date", type: "date", required: false },
      { name: "managerName", label: "Manager name", type: "text", required: false },
      { name: "stateLaw", label: "Applicable state law", type: "text", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "managerSignature", label: "Manager signature", type: "text", required: false },
      { name: "managerPrintedName", label: "Manager printed name", type: "text", required: false },
      { name: "managerAddress", label: "Manager address", type: "text", required: false },
      { name: "managerDate", label: "Manager date", type: "date", required: false },
      { name: "co1Signature", label: "Co-owner 1 signature", type: "text", required: false },
      { name: "co1PrintedName", label: "Co-owner 1 printed name", type: "text", required: false },
      { name: "co1Address", label: "Co-owner 1 address", type: "text", required: false },
      { name: "co1Date", label: "Co-owner 1 date", type: "date", required: false },
      { name: "co2Signature", label: "Co-owner 2 signature", type: "text", required: false },
      { name: "co2PrintedName", label: "Co-owner 2 printed name", type: "text", required: false },
      { name: "co2Address", label: "Co-owner 2 address", type: "text", required: false },
      { name: "co2Date", label: "Co-owner 2 date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 5.6;
  const limit = 278;
  let y = 22;

  // ── helpers ───────────────────────────────────────────────────────────────

  const newPageIfNeeded = (need: number) => {
    if (y + need > limit) { doc.addPage(); y = 22; }
  };

  // plain paragraph
  const p = (text: string, bold = false, gap = 2.2) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // numbered section heading: "N.\tTitle" — bold, gap above and below
  const heading = (text: string, gapBefore = 1.5, gapAfter = 1.2) => {
    y += gapBefore;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gapAfter);
    doc.text(lines, m, y);
    y += lines.length * lh + gapAfter;
  };

  // underline field  "Label: ___________"
  const uf = (label: string, value?: string, lineLen = 24, gap = 2.2) => {
    const shown = (value || "").trim();
    newPageIfNeeded(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lt = `${label}: `;
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    doc.setLineWidth(0.22);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(doc.getTextWidth("_".repeat(lineLen)), doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(lineLen)), y + 1.1);
    }
    y += lh + gap;
  };

  // ── Title — bold, centred, underlined ─────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "Lottery Pool Contract";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(w / 2 - tW / 2, y + 1.5, w / 2 + tW / 2, y + 1.5);
  y += 11;

  // ── Date ──────────────────────────────────────────────────────────────────
  uf("Date", values.agreementDate, 22, 3);

  // ── Opening ───────────────────────────────────────────────────────────────
  p('This Lottery Pool Agreement (the \u201cAgreement\u201d) is entered into by the undersigned individuals (collectively, the \u201cCo-Owners\u201d), who hereby agree as follows:');

  // ── Section 1 ─────────────────────────────────────────────────────────────
  heading("1.\tTerm of Agreement");
  p("This Agreement shall commence on the date first written above and shall terminate one (1) year and one (1) day after the most recent lottery drawing date for which lottery tickets are purchased pursuant to this Agreement.");

  // ── Section 2 ─────────────────────────────────────────────────────────────
  heading("2.\tParticipants and Contributions");
  p(`The individuals identified below are parties to this Agreement and have collectively contributed a total sum of $${values.totalContribution || "-----"} for the purpose of purchasing ${values.entryCountWords || "-------"} (${values.entryCountNumber || "----"}) lottery entries under this Agreement.`);

  // ── Section 3 ─────────────────────────────────────────────────────────────
  heading("3.\tOwnership of Tickets");
  p("All lottery tickets purchased pursuant to this Agreement shall be jointly owned by the Co-Owners as tenants in common, with each Co-Owner holding an undivided ownership interest in such tickets.");

  // ── Section 4 ─────────────────────────────────────────────────────────────
  heading("4.\tCovered Lottery Entries");
  p(`This Agreement applies to ${values.coveredEntries || "----"} entries in the ${values.lotteryName || "__________________________"} lottery drawing scheduled to occur on ${values.drawingDate || "__________________________"}. In the event no winning ticket is selected on the initial drawing date, this Agreement shall remain in full force and effect until a winning jackpot ticket is selected, subject to the term stated herein.`);

  // ── Section 5 ─────────────────────────────────────────────────────────────
  heading("5.\tLegal Eligibility");
  p("Each Co-Owner represents and warrants that they are at least eighteen (18) years of age and are not otherwise prohibited by law from purchasing lottery tickets or claiming lottery prizes.");

  // ── Section 6 ─────────────────────────────────────────────────────────────
  heading("6.\tDesignation of Manager");
  p(`The Co-Owners hereby designate ${values.managerName || "__________________________"} (the \u201cManager\u201d), a party to this Agreement, as the authorized representative of all Co-Owners. The Manager is empowered to act on behalf of the Co-Owners for purposes of administering the lottery pool, including collecting funds, purchasing lottery tickets, and safeguarding all tickets in a secure location.`);
  p("The Manager shall serve without compensation for the duration of this Agreement. If the Manager is unable to perform these duties for any reason, the Manager may appoint another Co-Owner to act as Manager, provided that notice of such substitution is given to all Co-Owners. Any acting Manager shall be bound by the terms of this Agreement.");

  // ── Section 7 ─────────────────────────────────────────────────────────────
  heading("7.\tPrize Claims and Applicable Law");
  p(`The Co-Owners acknowledge that the payment of lottery prizes is governed by applicable ${values.stateLaw || "__________________________"} state law and lottery regulations.`);
  p("If lottery regulations permit direct payment of any prize to multiple individuals, the appropriate claim for such payment shall be made. If regulations require payment to a single natural person, the Manager shall claim the prize and hold it in trust for the benefit of all Co-Owners, in accordance with their respective ownership interests.");

  // ── Section 8 ─────────────────────────────────────────────────────────────
  heading("8.\tDistribution of Winnings");
  p("Any lottery winnings shall be distributed to the Co-Owners in a lump-sum payment, in proportion to their respective ownership interests, unless otherwise required by law.");

  // ── Section 9 ─────────────────────────────────────────────────────────────
  heading("9.\tEntire Agreement; Amendments");
  p("This Agreement constitutes the entire agreement among the Co-Owners with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, understandings, representations, or communications, whether written or oral. This Agreement may be amended only by a written instrument signed by all Co-Owners.");

  // ── Section 10 ────────────────────────────────────────────────────────────
  heading("10.\tWithdrawal from Pool");
  p("Any Co-Owner may withdraw from participation in the lottery pool by providing written notice to the Manager. Such withdrawal shall be effective upon receipt of notice but shall not affect the withdrawing Co-Owner\u2019s interest in any lottery drawings conducted prior to withdrawal.");

  // ── Section 11 ────────────────────────────────────────────────────────────
  heading("11.\tAcknowledgment");
  p("By executing this Agreement, each Co-Owner acknowledges that they have read, understood, and voluntarily agreed to all of the terms and conditions set forth herein.");

  // ── Witness block ─────────────────────────────────────────────────────────
  y += 3;
  p("IN WITNESS WHEREOF, the Co-Owners have executed this Agreement as of the date first written above.");

  // ── CO-OWNER / MANAGER ────────────────────────────────────────────────────
  y += 3;
  p("CO-OWNER / MANAGER (if applicable):", true, 1.5);
  uf("Signature", values.managerSignature, 33);
  uf("Printed Name", values.managerPrintedName, 30);
  uf("Address", values.managerAddress, 35);
  y += 1;
  uf("Date", values.managerDate, 33, 4);

  // ── CO-OWNER 1 ────────────────────────────────────────────────────────────
  p("CO-OWNER:", true, 1.5);
  uf("Signature", values.co1Signature, 33);
  uf("Printed Name", values.co1PrintedName, 30);
  uf("Address", values.co1Address, 35);
  y += 1;
  uf("Date", values.co1Date, 33, 4);

  // ── CO-OWNER 2 ────────────────────────────────────────────────────────────
  p("CO-OWNER:", true, 1.5);
  uf("Signature", values.co2Signature, 33);
  uf("Printed Name", values.co2PrintedName, 30);
  uf("Address", values.co2Address, 35);
  y += 1;
  uf("Date", values.co2Date, 33);

  doc.save("lottery_pool_contract.pdf");
};

export default function LotteryPoolContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Lottery Pool Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="lotterypool"
    />
  );
}