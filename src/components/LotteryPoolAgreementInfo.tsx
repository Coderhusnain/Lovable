import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: false },
      { name: "termYears", label: "Term years (e.g. 1)", type: "text", required: false },
      { name: "termDays", label: "Term days (e.g. 0)", type: "text", required: false },
    ],
  },
  {
    label: "Drawing & Tickets",
    fields: [
      { name: "contestName", label: "Contest name", type: "text", required: false },
      { name: "drawingDate", label: "Drawing date", type: "date", required: false },
      { name: "numberOfEntries", label: "Number of entries", type: "text", required: false },
      { name: "ticketDescription", label: "Ticket description / notes", type: "textarea", required: false },
      { name: "totalContribution", label: "Total contributed ($)", type: "text", required: false },
    ],
  },
  {
    label: "Participants",
    fields: [
      { name: "participant1", label: "Participant 1 name", type: "text", required: false },
      { name: "contribution1", label: "Participant 1 contribution ($)", type: "text", required: false },
      { name: "participant2", label: "Participant 2 name", type: "text", required: false },
      { name: "contribution2", label: "Participant 2 contribution ($)", type: "text", required: false },
      { name: "participant3", label: "Participant 3 name", type: "text", required: false },
      { name: "contribution3", label: "Participant 3 contribution ($)", type: "text", required: false },
      { name: "participant4", label: "Participant 4 name", type: "text", required: false },
      { name: "contribution4", label: "Participant 4 contribution ($)", type: "text", required: false },
    ],
  },
  {
    label: "Manager & Jurisdiction",
    fields: [
      { name: "managerName", label: "Manager name", type: "text", required: false },
      { name: "managerContact", label: "Manager contact info", type: "text", required: false },
      { name: "jurisdiction", label: "State / jurisdiction", type: "text", required: false },
    ],
  },
  {
    label: "Execution & Signatures",
    fields: [
      { name: "coownerSignatures", label: "Co-owner signature names (comma-separated)", type: "textarea", required: false },
      { name: "participant1Signature", label: "Participant 1 signature line text", type: "text", required: false },
      { name: "participant2Signature", label: "Participant 2 signature line text", type: "text", required: false },
      { name: "participant3Signature", label: "Participant 3 signature line text", type: "text", required: false },
      { name: "participant4Signature", label: "Participant 4 signature line text", type: "text", required: false },
      { name: "participant1Date", label: "Participant 1 date", type: "date", required: false },
      { name: "participant2Date", label: "Participant 2 date", type: "date", required: false },
      { name: "participant3Date", label: "Participant 3 date", type: "date", required: false },
      { name: "participant4Date", label: "Participant 4 date", type: "date", required: false },
      { name: "witness1", label: "Witness 1 name", type: "text", required: false },
      { name: "witness2", label: "Witness 2 name", type: "text", required: false },
    ],
  },
];

const line = (value?: string) => (value || "").trim() || "__________________";

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const width = 210;
  const margin = 16;
  const textWidth = width - margin * 2;
  const lineHeight = 5.3;
  let y = 18;

  const ensureSpace = (needed = 8) => {
    if (y + needed > 282) { doc.addPage(); y = 18; }
  };

  const write = (content: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(content, textWidth);
    ensureSpace(lines.length * lineHeight + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  write("LOTTERY POOL AGREEMENT", true);
  write("");
  write(`This Lottery Pool Agreement (\u201cAgreement\u201d) is made and entered into on this ${values.agreementDate || "___ day of _______,."}`);
  write("BY AND AMONG");
  write("The undersigned participants (hereinafter collectively referred to as the \u201cCo-Owners\u201d), who hereby agree as follows:");
  write("");
  write("1. TERM OF AGREEMENT");
  write(`The term of this Agreement shall commence on the date first written above and shall expire exactly ${values.termYears || "-------- year"} and ${values.termDays || "-------day"} from the date of the latest lottery drawing for which tickets are purchased pursuant to this Agreement.`);
  write("");
  write("2. PARTICIPANTS AND CONTRIBUTIONS");
  write(`The individuals listed below are participating in this Agreement as Co-Owners. The Co-Owners have collectively contributed the total sum of $${values.totalContribution || "________"} for the purpose of purchasing ${values.numberOfEntries || "________"} entries into the relevant lottery contest drawing.`);
  write("S. No.\tName of Participant\tContribution\tSignature");
  write(`1.\t${values.participant1 || "__________________"}\t${values.contribution1 || "__________"}\t${values.participant1Signature || "__________"}`);
  write(`2.\t${values.participant2 || "__________________"}\t${values.contribution2 || "__________"}\t${values.participant2Signature || "__________"}`);
  write(`3.\t${values.participant3 || "__________________"}\t${values.contribution3 || "__________"}\t${values.participant3Signature || "__________"}`);
  write(`4.\t${values.participant4 || "__________________"}\t${values.contribution4 || "__________"}\t${values.participant4Signature || "__________"}`);
  write("");
  write("3. OWNERSHIP OF LOTTERY TICKETS");
  write("All lottery tickets purchased pursuant to this Agreement shall be jointly owned by the Co-Owners. Each Co-Owner shall have an undivided ownership interest in the tickets, and such tickets shall be held by the parties as tenants in common.");
  write("");
  write("4. LOTTERY DRAWING");
  write(`The lottery tickets covered by this Agreement consist of ${values.numberOfEntries || "________"} entries into the ${values.contestName || "________________"} contest drawing, scheduled to take place on ${values.drawingDate || "________________"}.`);
  write("In the event that no winning ticket is selected on the original drawing date, this Agreement shall remain valid until a winning jackpot ticket is selected in accordance with the applicable lottery rules and regulations.");
  write("");
  write("5. ELIGIBILITY");
  write("Each Co-Owner hereby represents and warrants that he or she:\n• Is at least eighteen (18) years of age, and\n• Is not prohibited by any applicable law from purchasing lottery tickets or claiming lottery prizes.");
  write("");
  write("6. APPOINTMENT OF MANAGER");
  write("The Co-Owners hereby appoint " + (values.managerName || "_______________") + " (\u201cManager\u201d) as the designated representative of the lottery pool.");
  write("The Manager shall:");
  write("• Collect contributions from the Co-Owners;");
  write("• Purchase the lottery tickets using the collected funds;");
  write("• Maintain custody of all purchased lottery tickets;");
  write("• Ensure the tickets are kept in a safe and secure location.");
  write("The Manager shall serve without compensation for the duration of this Agreement.");
  write("If the Manager becomes unable to perform these duties for any reason, the Manager may designate another participant to serve as Manager, and written notice of such designation shall be provided to all Co-Owners. Any acting Manager shall comply with the terms and conditions of this Agreement.");
  write("");
  write("7. COMPLIANCE WITH LOTTERY LAWS");
  write("The Co-Owners acknowledge that the payment of any lottery prize shall be governed by the applicable state laws and lottery regulations of " + (values.jurisdiction || "________________") + ".");
  write("Where applicable lottery regulations permit direct payment of prizes to multiple persons, the Co-Owners shall submit a claim accordingly.");
  write("Where regulations permit payment of the prize to only one natural person, the Manager shall claim the prize and hold the proceeds in trust for the benefit of all Co-Owners in accordance with their respective ownership interests under this Agreement.");
  write("");
  write("8. DISTRIBUTION OF WINNINGS");
  write("Any lottery prize or winnings obtained pursuant to this Agreement shall be distributed among the Co-Owners in a lump-sum payment, proportionate to each participant’s ownership interest in the lottery pool.");
  write("");
  write("9. ENTIRE AGREEMENT");
  write("This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, understandings, negotiations, representations, or warranties, whether written or oral.");
  write("");
  write("10. WITHDRAWAL FROM THE POOL");
  write("Any Co-Owner may withdraw from the lottery pool by providing written notice to the Manager. Such withdrawal shall terminate that Co-Owner’s participation in future lottery drawings; however, the withdrawing Co-Owner shall remain entitled to any winnings resulting from drawings conducted prior to the effective date of withdrawal.");
  write("");
  write("11. ACKNOWLEDGEMENT");
  write("By signing this Agreement, each Co-Owner acknowledges that he or she has read, understood, and agreed to be legally bound by the terms and conditions set forth herein.");
  write("");
  write("SIGNATURES OF CO-OWNERS");
  write("Name\tSignature\tDate");
  write(`${values.participant1 || "__________________"}\t${values.participant1Signature || "__________________"}\t${values.participant1Date || "__________"}`);
  write(`${values.participant2 || "__________________"}\t${values.participant2Signature || "__________________"}\t${values.participant2Date || "__________"}`);
  write(`${values.participant3 || "__________________"}\t${values.participant3Signature || "__________________"}\t${values.participant3Date || "__________"}`);
  write(`${values.participant4 || "__________________"}\t${values.participant4Signature || "__________________"}\t${values.participant4Date || "__________"}`);
  write("");
  write("MANAGER");
  write("Name: " + (values.managerName || "______________________________"));
  write("Signature: __________________________");
  write("Date: _______________________________");
  write("");
  write("WITNESSES");
  write("Witness 1\nName: " + (values.witness1 || "______________________________") + "\nSignature: __________________________\nDate: _______________________________");
  write("Witness 2\nName: " + (values.witness2 || "______________________________") + "\nSignature: __________________________\nDate: _______________________________");

  doc.save("lottery_pool_agreement.pdf");
};

export default function LotteryPoolAgreementInfo() {
  return (
    <FormWizard
      steps={steps}
      title="Lottery Pool Agreement"
      subtitle="Create a legally binding lottery pool agreement"
      onGenerate={generatePDF}
      documentType="lottery-pool-agreement"
    />
  );
}
