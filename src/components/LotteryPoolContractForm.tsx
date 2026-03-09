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
  const limit = 280;
  let y = 20;

  const p = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 24, gap = 1.8) => {
    const shown = (value || "").trim();
    if (y + lh + gap > limit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const labelText = `${label}: `;
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
  const title = "LOTTERY POOL CONTRACT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  uf("Date", values.agreementDate, 20);
  p('This Lottery Pool Agreement (the "Agreement") is entered into by the undersigned individuals (collectively, the "Co-Owners"), who hereby agree as follows:');
  p("1. Term of Agreement", true);
  p("This Agreement shall commence on the date first written above and shall terminate one (1) year and one (1) day after the most recent lottery drawing date for which lottery tickets are purchased pursuant to this Agreement.");
  p("2. Participants and Contributions", true);
  p(`The individuals identified below are parties to this Agreement and have collectively contributed a total sum of $${values.totalContribution || "-----"} for the purpose of purchasing ${values.entryCountWords || "-------"} (${values.entryCountNumber || "----"}) lottery entries under this Agreement.`);
  p("3. Ownership of Tickets", true);
  p("All lottery tickets purchased pursuant to this Agreement shall be jointly owned by the Co-Owners as tenants in common, with each Co-Owner holding an undivided ownership interest in such tickets.");
  p("4. Covered Lottery Entries", true);
  p(`This Agreement applies to ${values.coveredEntries || "----"} entries in the ${values.lotteryName || "__________________________"} lottery drawing scheduled to occur on ${values.drawingDate || "__________________________"}. In the event no winning ticket is selected on the initial drawing date, this Agreement shall remain in full force and effect until a winning jackpot ticket is selected, subject to the term stated herein.`);
  p("5. Legal Eligibility", true);
  p("Each Co-Owner represents and warrants that they are at least eighteen (18) years of age and are not otherwise prohibited by law from purchasing lottery tickets or claiming lottery prizes.");
  p("6. Designation of Manager", true);
  p(`The Co-Owners hereby designate ${values.managerName || "__________________________"} (the "Manager"), a party to this Agreement, as the authorized representative of all Co-Owners. The Manager is empowered to act on behalf of the Co-Owners for purposes of administering the lottery pool, including collecting funds, purchasing lottery tickets, and safeguarding all tickets in a secure location.`);
  p("The Manager shall serve without compensation for the duration of this Agreement. If the Manager is unable to perform these duties for any reason, the Manager may appoint another Co-Owner to act as Manager, provided that notice of such substitution is given to all Co-Owners. Any acting Manager shall be bound by the terms of this Agreement.");
  p("7. Prize Claims and Applicable Law", true);
  p(`The Co-Owners acknowledge that the payment of lottery prizes is governed by applicable ${values.stateLaw || "__________________________"} state law and lottery regulations.`);
  p("If lottery regulations permit direct payment of any prize to multiple individuals, the appropriate claim for such payment shall be made. If regulations require payment to a single natural person, the Manager shall claim the prize and hold it in trust for the benefit of all Co-Owners, in accordance with their respective ownership interests.");
  p("8. Distribution of Winnings", true);
  p("Any lottery winnings shall be distributed to the Co-Owners in a lump-sum payment, in proportion to their respective ownership interests, unless otherwise required by law.");
  p("9. Entire Agreement; Amendments", true);
  p("This Agreement constitutes the entire agreement among the Co-Owners with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, understandings, representations, or communications, whether written or oral. This Agreement may be amended only by a written instrument signed by all Co-Owners.");
  p("10. Withdrawal from Pool", true);
  p("Any Co-Owner may withdraw from participation in the lottery pool by providing written notice to the Manager. Such withdrawal shall be effective upon receipt of notice but shall not affect the withdrawing Co-Owner's interest in any lottery drawings conducted prior to withdrawal.");
  p("11. Acknowledgment", true);
  p("By executing this Agreement, each Co-Owner acknowledges that they have read, understood, and voluntarily agreed to all of the terms and conditions set forth herein.");
  p("IN WITNESS WHEREOF, the Co-Owners have executed this Agreement as of the date first written above.", true, 2.6);

  p("CO-OWNER / MANAGER (if applicable):", true, 1);
  uf("Signature", values.managerSignature, 30);
  uf("Printed Name", values.managerPrintedName, 28);
  uf("Address", values.managerAddress, 34);
  uf("Date", values.managerDate, 20, 2.4);
  p("CO-OWNER:", true, 1);
  uf("Signature", values.co1Signature, 30);
  uf("Printed Name", values.co1PrintedName, 28);
  uf("Address", values.co1Address, 34);
  uf("Date", values.co1Date, 20, 2.4);
  p("CO-OWNER:", true, 1);
  uf("Signature", values.co2Signature, 30);
  uf("Printed Name", values.co2PrintedName, 28);
  uf("Address", values.co2Address, 34);
  uf("Date", values.co2Date, 20);

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
