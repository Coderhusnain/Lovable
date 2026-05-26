import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties & Dates",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "artistName", label: "Artist Full Legal Name", type: "text", required: true },
      { name: "artistAddress", label: "Artist Address", type: "textarea", required: false },
      { name: "agencyName", label: "Agency Name", type: "text", required: true },
      { name: "agencyAddress", label: "Agency Address", type: "textarea", required: false },
      { name: "artistProfession", label: "Artist Profession (e.g., musician, actor)", type: "text", required: false },
      { name: "commissionPercent", label: "Agency Commission (%)", type: "text", required: true },
      { name: "postTermMonths", label: "Post-termination commission months", type: "text", required: false },
      { name: "governingLaw", label: "Governing law (state)", type: "text", required: false },
      { name: "cureDays", label: "Cure period (days)", type: "text", required: false },
    ],
  },
];

const u = (v?: string) => (v || "").trim();

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const margin = 16;
  const textWidth = W - margin * 2;
  const lineHeight = 5.2;
  let y = 18;

  const ensureSpace = (needed = 8) => {
    if (y + needed > 282) {
      doc.addPage();
      y = 18;
    }
  };

  const write = (content: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(content, textWidth);
    ensureSpace(lines.length * lineHeight + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  // Title
  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("TALENT MANAGEMENT CONTRACT", W / 2, y, { align: "center" });
  y += 10;

  write(`This Talent Management Contract ("Contract") is made and entered into on ${u(values.effectiveDate) || "[____]"} ("Effective Date") by and between ${u(values.artistName) || "[____]"}, having an address at ${u(values.artistAddress) || "[____]"} ("Artist"), and ${u(values.agencyName) || "[____]"}, having an address at ${u(values.agencyAddress) || "[____]"} ("Agency"). The Artist and the Agency may hereinafter collectively be referred to as the "Parties" and individually as a "Party".`);

  write("1. Purpose of the Contract", true);
  write(`The Agency is engaged in the business of representing and managing talented entertainers and performers, and the Artist is a ${u(values.artistProfession) || "[describe profession]"}. The Artist hereby appoints the Agency to act as the Artist’s representative for purposes of securing professional opportunities in the entertainment industry, and the Agency agrees to provide such representation.`);

  write("2. Duties of the Agency", true);
  write("The Agency shall represent the Artist in connection with the Artist’s professional activities in the entertainment industry and shall use reasonable efforts to:");
  write("• solicit and procure employment opportunities for the Artist;");
  write("• negotiate contracts and agreements on behalf of the Artist for artistic or entertainment services; and");
  write("• negotiate opportunities involving entertainment projects or packages in which the Artist has an ownership or participation interest.");
  write("For purposes of this Contract, the term \"entertainment industry\" shall include, without limitation:");
  write("• motion pictures, television, radio, music and sound recordings, literary works and publications, personal appearances, public performances and engagements, live entertainment venues, advertising and commercial endorsements, licensing and use of the Artist’s name, likeness, voice, image, and talents.");

  write("3. Best Efforts", true);
  write("The Agency shall use reasonable and diligent efforts to procure employment and professional opportunities for the Artist. The Agency shall also provide professional advice, guidance, and consultation to assist in the development, promotion, and advancement of the Artist’s career. Notwithstanding the foregoing, the Artist shall retain the sole and absolute discretion to accept or reject any offer of employment, engagement, or contract negotiated or presented by the Agency.");

  write("4. Mutual Representations and Warranties", true);
  write("Each Party represents and warrants to the other that: (1) it possesses the full legal right, power, and authority to enter into and perform this Contract; (2) the execution and performance of this Contract will not violate or conflict with any other agreement; and (3) no existing contractual or legal obligations will interfere with the Party’s ability to perform its obligations under this Contract.");

  write("5. Compensation", true);
  write(`In consideration of the services provided by the Agency under this Contract, the Artist shall pay the Agency ${u(values.commissionPercent) || "[]"} percent (${u(values.commissionPercent) || "[]"}%) of the Artist’s gross earnings derived from employment or engagements obtained directly or indirectly through the Agency’s efforts in the entertainment industry.`);

  write("6. Computation of Gross Earnings", true);
  write("For the purposes of this Contract, the term \"gross earnings\" shall include, without limitation: salaries, wages, performance fees, appearance fees, royalties, bonuses, gifts or gratuities related to professional services, profit participation, shares of stock, partnership interests, percentages of revenue or profits, and any other form of compensation or consideration received by the Artist.");

  write("7. Payment of Compensation", true);
  write("The Agency’s commission shall become due and payable immediately upon the Artist’s receipt of the corresponding earnings or compensation from which the Agency’s commission is derived.");

  write("8. Indemnification", true);
  write("The Agency shall indemnify and hold harmless the Artist from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys’ fees) arising out of the negligence, misconduct, or breach of this Contract by the Agency. The Artist shall indemnify and hold harmless the Agency for claims arising from the Artist's negligence or breach.");

  write("9. Relationship of the Parties", true);
  write("Nothing contained in this Contract shall be construed to create a partnership, joint venture, or employment relationship between the Parties. The Artist shall remain an independent contractor, and the Agency shall act solely as the Artist’s representative.");

  write("10. Exclusivity", true);
  write("Artist: The Artist represents that the Artist has not granted, and shall not grant during the term of this Contract, authority to any other individual or entity to act as the Artist’s exclusive talent agent or representative in the entertainment industry. Agency: Nothing in this Contract shall prevent the Agency from representing other artists, performers, or clients during the term of this Contract.");

  write("11. Termination", true);
  write(`Post-Termination Compensation: If, within ${u(values.postTermMonths) || "[--]"} months following termination of this Contract, the Artist accepts an offer of employment substantially similar to an offer presented during the term of this Contract by the same offeror or an affiliated entity, the resulting engagement shall remain subject to the compensation provisions of this Contract.`);

  write("12. Notice of Breach", true);
  write(`If either Party materially breaches any provision of this Contract, the non-breaching Party may provide written notice describing the nature of the breach. The breaching Party shall have ${u(values.cureDays) || "[____]"} days from receipt of such notice to cure the breach.`);

  write("13. Termination for Failure to Procure Employment", true);
  write("If the Agency fails to procure a bona fide employment offer for the Artist within four (4) months from the Effective Date, either Party may terminate this Contract by providing written notice. Termination shall not affect the Agency’s right to receive commissions earned prior to termination.");

  write("14. Arbitration", true);
  write("Any dispute, controversy, or claim arising out of or relating to this Contract shall be resolved through binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association.");

  write("15. Amendment", true);
  write("This Contract may only be amended or modified by a written instrument signed by both Parties.");

  write("16. Governing Law", true);
  write(`This Contract shall be governed by and construed in accordance with the laws of ${u(values.governingLaw) || "[____]"}.`);

  write("17. Notices", true);
  write("Any notice required or permitted under this Contract shall be deemed properly given if delivered personally or by certified mail to the addresses set forth above.");

  write("18. Waiver", true);
  write("The failure of either Party to enforce any provision of this Contract shall not constitute a waiver of that provision.");

  write("19. Execution", true);
  write("IN WITNESS WHEREOF, the Parties have executed this Talent Management Contract as of the Effective Date first written above.");
  write("\nARTIST\nSignature: __________________________\nName: __________________________\nDate: __________________________");
  write("\nAGENCY\nSignature: __________________________\nName: __________________________\nTitle: __________________________\nDate: __________________________");

  doc.save("talent_management_contract.pdf");
};

export default function TalentManagementContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Talent Management Contract"
      subtitle="Fill the fields to generate the Talent Management Contract PDF"
      onGenerate={generatePDF}
      documentType="talent-management-contract"
    />
  );
}
