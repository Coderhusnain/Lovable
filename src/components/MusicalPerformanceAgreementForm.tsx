import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State/Commonwealth", type: "text", required: true },
      { name: "province", label: "Province", type: "text", required: false },
      { name: "city", label: "City", type: "text", required: false },
    ],
  },
  {
    label: "Parties and Dates",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "clientName", label: "Client Name/Entity", type: "text", required: true },
      { name: "clientAddress", label: "Client Address", type: "textarea", required: true },
      { name: "musicianName", label: "Musician Name/Entity", type: "text", required: true },
      { name: "musicianAddress", label: "Musician Address", type: "textarea", required: true },
      { name: "serviceStartDate", label: "Performance Start Date", type: "date", required: true },
      { name: "terminationDate", label: "Termination Date/Event Completion", type: "text", required: true },
    ],
  },
  {
    label: "Commercial Terms",
    fields: [
      { name: "depositAmount", label: "Deposit Amount", type: "text", required: true },
      { name: "cancelNoticePeriod", label: "Cancellation Notice Period", type: "text", required: true },
      { name: "refundDays", label: "Refund Days if Musician Cancels", type: "text", required: true },
      { name: "mediationDays", label: "Mediation Window in Days", type: "text", required: true },
      { name: "arbitrationInstitution", label: "Arbitration Institution", type: "text", required: true, placeholder: "American Arbitration Association" },
    ],
  },
  {
    label: "Legal Clauses",
    fields: [
      { name: "governingLawState", label: "Governing Law State/Commonwealth", type: "text", required: true },
      { name: "additionalAddressNotice", label: "Alternate Notice Address (Optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "clientSign", label: "Client Authorized Representative", type: "text", required: true },
      { name: "clientTitle", label: "Client Title (if applicable)", type: "text", required: false },
      { name: "clientDate", label: "Client Signature Date", type: "date", required: true },
      { name: "musicianSign", label: "Musician Authorized Representative", type: "text", required: true },
      { name: "musicianTitle", label: "Musician Title (if applicable)", type: "text", required: false },
      { name: "musicianDate", label: "Musician Signature Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 16;
  const width = 178;
  const lh = 5.3;
  let y = 18;

  const u = (val?: string, n = 14) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const ensure = (need = 10) => {
    if (y + need > 285) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.7) => {
    const lines = doc.splitTextToSize(text, width);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, left, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    doc.text(label, left, y);
    const x = left + doc.getTextWidth(label);
    const s = u(value);
    doc.text(s, x, y);
    doc.line(x, y + 1, x + doc.getTextWidth(s), y + 1);
    y += 6.2;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "MUSICAL PERFORMANCE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1.1, 105 + tw / 2, y + 1.1);
  y += 10;

  uf("Jurisdiction: ", `${u(v.state)}, ${u(v.country)}${v.province ? `, ${v.province}` : ""}${v.city ? `, ${v.city}` : ""}`);

  p(
    `This Musical Performance Agreement (the "Agreement") is made and entered into as of ${u(v.effectiveDate, 12)} (the "Effective Date"), by and between ${u(v.clientName)}, residing at/with a principal place of business at ${u(v.clientAddress)} ("Client"), and ${u(v.musicianName)}, residing at/with a principal place of business at ${u(v.musicianAddress)} ("Musician"). Client and Musician may hereinafter be referred to individually as a "Party" and collectively as the "Parties."`
  );

  p("1. Description of Services", true);
  p(`1.1 Beginning on ${u(v.serviceStartDate, 12)}, the Musician shall provide to the Client live musical performance services for the event described below (the "Services").`);
  p("1.2 The Services shall include, but not be limited to:");
  p("- Live performance of songs selected by the Musician and/or pre-approved by the Client, suitable to the mood and atmosphere of the event;");
  p("- Continuous musical entertainment for the agreed duration, without significant interruptions other than brief, reasonable breaks as necessary;");
  p("- The provision of professional sound equipment, microphones, and related gear to ensure optimum quality of performance; and");
  p("- Compliance with reasonable artistic and event-related directions from the Client.");

  p("2. Performance Obligations of the Musician", true);
  p("2.1 The Musician shall arrive at least one (1) hour prior to the scheduled commencement time to conduct set-up and sound checks.");
  p("2.2 The Musician shall ensure that high-quality microphones and sound equipment are used and that sound reproduction is suitable for the size and acoustics of the venue.");
  p("2.3 The Client shall provide the Musician with adequate and private dressing room facilities, together with reasonable access to food and refreshments during the performance.");
  p("2.4 The Musician warrants that he/she/they have an extensive and diverse collection of songs and will ensure that the performance remains consistent and without undue interruptions for the agreed period.");

  p("3. Deposit and Fees", true);
  p(`3.1 Upon execution of this Agreement, the Client shall pay to the Musician a non-refundable deposit of ${u(v.depositAmount)}, which shall be applied towards the total performance fee.`);
  p("3.2 The balance of all sums due under this Agreement shall be payable by the Client to the Musician immediately upon completion of the Services, unless otherwise agreed in writing.");

  p("4. Cancellation Policy", true);
  p("4.1 All deposits paid by the Client shall be non-refundable.");
  p(`4.2 A minimum of ${u(v.cancelNoticePeriod)} written notice shall be required for cancellation by the Client. In the event of cancellation by the Client with less than the required notice, the Client shall remain liable to pay the full agreed fee.`);
  p(`4.3 In the event of cancellation by the Musician, all sums paid by the Client, including the deposit, shall be refunded in full within ${u(v.refundDays, 2)} days of cancellation.`);

  p("5. Term", true);
  p(`5.1 This Agreement shall commence on the Effective Date and terminate on ${u(v.terminationDate)}, unless extended or renewed by mutual written agreement of the Parties.`);

  p("6. Relationship of the Parties", true);
  p("6.1 The Parties acknowledge that the Musician is engaged as an independent contractor and not as an employee, agent, partner, or joint venturer of the Client.");
  p("6.2 Nothing in this Agreement shall be construed as creating any employer-employee relationship between the Parties.");

  p("7. Indemnification", true);
  p("7.1 The Client agrees to indemnify, defend, and hold harmless the Musician, together with his/her/their members, employees, agents, and representatives, against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorney's fees) arising out of:");
  p("- The actions or omissions of the Client, its guests, invitees, or staff;");
  p("- Any breach of this Agreement by the Client; or");
  p("- Any claims arising from the use of the venue, except to the extent caused by the gross negligence or willful misconduct of the Musician.");

  p("8. Force Majeure", true);
  p("8.1 Neither Party shall be liable for any delay or failure in performing its obligations under this Agreement if such delay or failure results from events beyond its reasonable control, including but not limited to acts of God, fire, flood, natural disasters, pandemic, epidemic, public health emergencies, labor strikes, acts of terrorism, governmental restrictions, or other similar events (\"Force Majeure Event\").");
  p("8.2 In the event of a Force Majeure Event, the affected Party shall promptly notify the other Party in writing. Obligations shall be suspended for the duration of the Force Majeure Event, and the Parties shall work in good faith to reschedule the performance. If rescheduling is not possible within a reasonable time, either Party may terminate this Agreement without liability, and the Musician shall refund any fees paid in advance, less any non-recoverable costs incurred.");

  p("9. Dispute Resolution", true);
  p("9.1 In the event of any dispute, controversy, or claim arising out of or relating to this Agreement, the Parties shall first attempt to resolve the matter amicably through good-faith negotiations.");
  p(`9.2 If negotiations fail, the Parties agree to submit the dispute to mediation administered by a mutually agreed mediator within ${u(v.mediationDays, 2)} days.`);
  p(`9.3 If mediation is unsuccessful, the dispute shall be finally resolved by binding arbitration under the rules of ${u(v.arbitrationInstitution)}, and judgment on the arbitral award may be entered in any court of competent jurisdiction.`);
  p("9.4 Each Party shall bear its own costs of mediation and arbitration, except as otherwise determined by the arbitrator.");

  p("10. Entire Agreement", true);
  p("10.1 This Agreement contains the entire understanding of the Parties with respect to the subject matter herein and supersedes all prior agreements, negotiations, or representations, whether written or oral.");

  p("11. Severability", true);
  p("11.1 If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be deemed severed, and the remainder of this Agreement shall remain in full force and effect.");
  p("11.2 Where permissible, such invalid provision shall be reformed to the minimum extent necessary to render it enforceable.");

  p("12. Amendment", true);
  p("12.1 This Agreement may not be modified, amended, or waived except by a written instrument duly signed by both Parties.");

  p("13. Governing Law", true);
  p(`13.1 This Agreement shall be governed by and construed in accordance with the laws of the State/Commonwealth of ${u(v.governingLawState)}, without regard to its conflict of law provisions.`);

  p("14. Notices", true);
  p(
    `14.1 Any notice required or permitted under this Agreement shall be deemed duly given if delivered personally, or if sent by certified mail, return receipt requested, to the addresses set forth in the preamble of this Agreement${(v.additionalAddressNotice || "").trim() ? `, and to the following additional address: ${v.additionalAddressNotice}` : ""}, or to such other address as may be designated by a Party in writing.`
  );

  p("15. Waiver of Contractual Rights", true);
  p("15.1 The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of that Party's right thereafter to enforce such provision or any other provision of this Agreement.");

  p("16. Assignment", true);
  p("16.1 Neither Party may assign or transfer its rights or obligations under this Agreement without the prior written consent of the other Party, which consent shall not be unreasonably withheld.");

  p("17. Execution and Signatures", true);
  p("17.1 This Agreement shall be executed by the duly authorized representatives of the Parties and shall be effective as of the Effective Date.");

  p("CLIENT:", true);
  uf("Name: ", v.clientSign);
  uf("Title (if applicable): ", v.clientTitle);
  uf("Date: ", v.clientDate);

  p("MUSICIAN:", true);
  uf("Name: ", v.musicianSign);
  uf("Title (if applicable): ", v.musicianTitle);
  uf("Date: ", v.musicianDate);

  doc.save("musical_performance_agreement.pdf");
};

export default function MusicalPerformanceAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Musical Performance Agreement"
      subtitle="Complete all steps to generate your document"
      onGenerate={generatePDF}
      documentType="musicalperformanceagreement"
    />
  );
}
