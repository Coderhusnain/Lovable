import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Case",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "complainantName", label: "Complainant name", type: "text", required: true },
      { name: "complainantAddress", label: "Complainant address", type: "text", required: true },
      { name: "defendantName", label: "Defendant name", type: "text", required: true },
      { name: "defendantAddress", label: "Defendant address", type: "text", required: true },
      { name: "litigationDate", label: "Litigation filing date", type: "date", required: true },
      { name: "courtName", label: "Court name", type: "text", required: true },
      { name: "courtLocation", label: "Court location", type: "text", required: true },
      { name: "caseCaption", label: "Case caption", type: "text", required: true, placeholder: "Plaintiff v. Defendant" },
      { name: "caseNumber", label: "Case number", type: "text", required: true },
    ],
  },
  {
    label: "Payment and Release",
    fields: [
      { name: "paymentAmount", label: "Settlement payment amount", type: "text", required: true, placeholder: "0.00" },
      { name: "paymentWithinDays", label: "Payment due within days", type: "text", required: true, placeholder: "30" },
      { name: "payableAttorneyName", label: "Payable to attorney name", type: "text", required: true },
      { name: "mailingAddress", label: "Payment mailing address", type: "text", required: true },
      { name: "complainantAttorney", label: "Attorney for Complainant", type: "text", required: true },
      { name: "defendantAttorney", label: "Attorney for Defendant", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures and Notary",
    fields: [
      { name: "complainantSignDate", label: "Complainant sign date", type: "date", required: true },
      { name: "defendantSignDate", label: "Defendant sign date", type: "date", required: true },
      { name: "complainantAttorneyLawFirm", label: "Complainant attorney law firm", type: "text", required: false },
      { name: "complainantAttorneyDate", label: "Complainant attorney date", type: "date", required: false },
      { name: "defendantAttorneyLawFirm", label: "Defendant attorney law firm", type: "text", required: false },
      { name: "defendantAttorneyDate", label: "Defendant attorney date", type: "date", required: false },
      { name: "notaryState", label: "Notary state (optional)", type: "text", required: false },
      { name: "notaryCounty", label: "Notary county (optional)", type: "text", required: false },
      { name: "notaryDate", label: "Notary date (optional)", type: "date", required: false },
      { name: "notaryAppearer", label: "Notary appearer (optional)", type: "text", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 18;
  const width = pageWidth - margin * 2;
  const lineHeight = 5.6;
  const bottomLimit = 280;
  let y = 20;

  const writeWrapped = (text: string, bold = false, gapAfter = 1.8) => {
    const lines = doc.splitTextToSize(text, width);
    const needed = lines.length * lineHeight + gapAfter;
    if (y + needed > bottomLimit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gapAfter;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  const title = "SETTLEMENT AND RELEASE AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(pageWidth / 2 - tw / 2, y + 1.2, pageWidth / 2 + tw / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  writeWrapped(
    `This Settlement and Release Agreement (the "Agreement") is entered into as of ${
      values.agreementDate || "____________"
    }, by and between:`
  );
  writeWrapped(`- ${values.complainantName || "____________"} (the "Complainant"), residing at ${values.complainantAddress || "______________________"}; and`);
  writeWrapped(`- ${values.defendantName || "____________"} (the "Defendant"), residing at ${values.defendantAddress || "______________________"}.`);
  writeWrapped('Complainant and Defendant are collectively referred to herein as the "Parties."');
  writeWrapped("This Agreement shall become effective upon its full execution by the Parties.", false, 3);

  writeWrapped("RECITALS", true);
  writeWrapped(
    `A. On or about ${values.litigationDate || "__________"}, Complainant commenced a legal action against Defendant in the ${
      values.courtName || "__________ Court"
    } of ${values.courtLocation || "______"}, entitled ${values.caseCaption || "________, Plaintiff v. ________, Defendant"}, Case No. ${
      values.caseNumber || "__________"
    } (the "Litigation").`
  );
  writeWrapped("B. Defendant expressly denies, and continues to deny, all claims, allegations, and assertions asserted by Complainant in the Litigation.");
  writeWrapped("C. The Parties now desire to fully and finally resolve the Litigation in order to avoid the further expense, burden, and uncertainty of continued proceedings.");
  writeWrapped("D. The execution of this Agreement shall not be construed as, nor deemed to constitute, an admission of liability or wrongdoing by either Party.");
  writeWrapped(
    "NOW, THEREFORE, in consideration of the mutual covenants and undertakings herein contained, and intending to be legally bound, the Parties agree as follows:",
    false,
    3
  );

  writeWrapped("1. Payment", true);
  writeWrapped(
    `1.1 Defendant shall pay to Complainant the sum of $${values.paymentAmount || "__________"} within ${
      values.paymentWithinDays || "___"
    } days of receipt by Defendant's counsel of this Agreement duly executed by Complainant and Complainant's attorney.`
  );
  writeWrapped(
    `1.2 Payment shall be made by certified check payable to Complainant's attorney, ${
      values.payableAttorneyName || "____________"
    }, and mailed to: ${values.mailingAddress || "______________________"}.`
  );
  writeWrapped(
    "1.3 Such payment shall constitute full and final settlement of all claims, including but not limited to claims for attorney's fees, damages, penalties, or other relief of any kind arising from or related to the Litigation."
  );
  writeWrapped("1.4 Upon receipt of payment, Complainant shall promptly execute and file all necessary documents to dismiss the Litigation with prejudice.", false, 3);

  writeWrapped("2. Release", true);
  writeWrapped("2.1 Complainant, for himself and his heirs, executors, administrators, representatives, successors, and assigns, hereby fully releases and forever discharges Defendant, and Defendant's parents, subsidiaries, affiliates, franchisees, franchisors, officers, directors, agents, employees, attorneys, insurers, successors, and assigns (collectively, the \"Releasees\"), from any and all claims, demands, actions, causes of action, liabilities, or obligations of any kind whatsoever, whether known or unknown, suspected or unsuspected, arising from the beginning of time through the date of this Agreement.");
  writeWrapped("2.2 This Release specifically includes, without limitation, all claims asserted or that could have been asserted in the Litigation, and any claims arising under federal, state, or local law, whether statutory, contractual, or common law.");
  writeWrapped("2.3 Complainant acknowledges that this general release does not extend to claims that he did not know or suspect to exist at the time of execution, which if known would have materially affected his decision to enter into this Agreement.", false, 3);

  writeWrapped("3. Confidentiality", true);
  writeWrapped("The Parties agree that the existence, terms, conditions, and negotiations of this Agreement, as well as all facts and circumstances underlying the Litigation, shall remain strictly confidential, except as required by law or as disclosed to legal, financial, or tax advisors.", false, 3);
  writeWrapped("4. Severability", true);
  writeWrapped("If any provision of this Agreement is declared invalid, void, or unenforceable by a court or arbitrator of competent jurisdiction, the remaining provisions shall continue in full force and effect.", false, 3);
  writeWrapped("5. Entire Agreement", true);
  writeWrapped("This Agreement constitutes the entire agreement between the Parties regarding the subject matter hereof and supersedes all prior or contemporaneous agreements, representations, or understandings, whether written or oral.", false, 3);
  writeWrapped("6. Amendments", true);
  writeWrapped("No modification or amendment of this Agreement shall be valid unless in writing and signed by Complainant and by a duly authorized representative of Defendant.", false, 3);
  writeWrapped("7. Attorney Explanation", true);
  writeWrapped(`A. ${values.complainantAttorney || "____________________"}, an attorney licensed to practice law in this State, has explained the terms and legal effect of this Agreement to Complainant, who acknowledges full understanding prior to executing it.`);
  writeWrapped(`B. ${values.defendantAttorney || "____________________"}, an attorney licensed to practice law in this State, has explained the terms and legal effect of this Agreement to Defendant, who acknowledges full understanding prior to executing it.`, false, 3);
  writeWrapped("8. Governing Law", true);
  writeWrapped(
    `This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${
      values.governingLawState || "____________"
    }, without regard to conflict-of-law principles.`,
    false,
    3
  );

  writeWrapped("SIGNATURES", true);
  writeWrapped("Complainant", true, 1);
  writeWrapped("________________________________________", false, 1);
  writeWrapped(`Name: ${values.complainantName || "_______________________________"}`, false, 1);
  writeWrapped(`Date: ${values.complainantSignDate || "_______________________________"}`, false, 2);
  writeWrapped("Defendant", true, 1);
  writeWrapped("________________________________________", false, 1);
  writeWrapped(`Name: ${values.defendantName || "_______________________________"}`, false, 1);
  writeWrapped(`Date: ${values.defendantSignDate || "_______________________________"}`, false, 2);
  writeWrapped("Approved as to Form:", true, 1);
  writeWrapped("Attorney for Complainant", true, 1);
  writeWrapped(`Name: ${values.complainantAttorney || "_______________________________"}`, false, 1);
  writeWrapped(`Law Firm: ${values.complainantAttorneyLawFirm || "______________________________"}`, false, 1);
  writeWrapped(`Date: ${values.complainantAttorneyDate || "_______________________________"}`, false, 2);
  writeWrapped("Attorney for Defendant", true, 1);
  writeWrapped(`Name: ${values.defendantAttorney || "_______________________________"}`, false, 1);
  writeWrapped(`Law Firm: ${values.defendantAttorneyLawFirm || "______________________________"}`, false, 1);
  writeWrapped(`Date: ${values.defendantAttorneyDate || "_______________________________"}`, false, 3);

  if (values.notaryState || values.notaryCounty || values.notaryDate || values.notaryAppearer) {
    writeWrapped("[Notary Acknowledgment]", true, 1);
    writeWrapped(`State of ${values.notaryState || "____________"} )`, false, 1);
    writeWrapped(`County of ${values.notaryCounty || "__________"} )`, false, 1);
    writeWrapped(
      `On this ${values.notaryDate || "___ day of __________, ____"}, before me, the undersigned Notary Public, personally appeared ${
        values.notaryAppearer || "______________________"
      }, known to me (or satisfactorily proven) to be the person(s) whose name(s) are subscribed to this instrument, and acknowledged that he/she executed the same for the purposes therein contained.`
    );
    writeWrapped("IN WITNESS WHEREOF, I hereunto set my hand and official seal.");
    writeWrapped("________________________________________");
    writeWrapped("Notary Public");
  }

  doc.save("settlement_and_release_agreement.pdf");
};

export default function SettlementAndReleaseAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Settlement and Release Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="settlementandreleaseagreement"
    />
  );
}
