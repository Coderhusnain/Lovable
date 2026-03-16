import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties and Case",
    fields: [
      { name: "agreementDate",    label: "Agreement date",          type: "date",  required: true  },
      { name: "complainantName",  label: "Complainant name",        type: "text",  required: true  },
      { name: "complainantAddress", label: "Complainant address",   type: "text",  required: true  },
      { name: "defendantName",    label: "Defendant name",          type: "text",  required: true  },
      { name: "defendantAddress", label: "Defendant address",       type: "text",  required: true  },
      { name: "litigationDate",   label: "Litigation filing date",  type: "date",  required: true  },
      { name: "courtName",        label: "Court name",              type: "text",  required: true  },
      { name: "courtLocation",    label: "Court location",          type: "text",  required: true  },
      {
        name: "caseCaption", label: "Case caption", type: "text",
        required: true, placeholder: "Plaintiff v. Defendant",
      },
      { name: "caseNumber",       label: "Case number",             type: "text",  required: true  },
    ],
  },
  {
    label: "Payment and Release",
    fields: [
      {
        name: "paymentAmount",  label: "Settlement payment amount", type: "text",
        required: true, placeholder: "0.00",
      },
      {
        name: "paymentWithinDays", label: "Payment due within days", type: "text",
        required: true, placeholder: "30",
      },
      { name: "payableAttorneyName", label: "Payable to attorney name",   type: "text", required: true },
      { name: "mailingAddress",      label: "Payment mailing address",    type: "text", required: true },
      { name: "complainantAttorney", label: "Attorney for Complainant",   type: "text", required: true },
      { name: "defendantAttorney",   label: "Attorney for Defendant",     type: "text", required: true },
      { name: "governingLawState",   label: "Governing law state",        type: "text", required: true },
    ],
  },
  {
    label: "Signatures and Notary",
    fields: [
      { name: "complainantSignDate",        label: "Complainant sign date",             type: "date", required: true  },
      { name: "defendantSignDate",          label: "Defendant sign date",               type: "date", required: true  },
      { name: "complainantAttorneyLawFirm", label: "Complainant attorney law firm",     type: "text", required: false },
      { name: "complainantAttorneyDate",    label: "Complainant attorney date",         type: "date", required: false },
      { name: "defendantAttorneyLawFirm",   label: "Defendant attorney law firm",       type: "text", required: false },
      { name: "defendantAttorneyDate",      label: "Defendant attorney date",           type: "date", required: false },
      { name: "notaryState",    label: "Notary state (optional)",           type: "text", required: false },
      { name: "notaryCounty",   label: "Notary county (optional)",          type: "text", required: false },
      { name: "notaryDate",     label: "Notary date (optional)",            type: "date", required: false },
      { name: "notaryAppearer", label: "Notary appearer name (optional)",   type: "text", required: false },
    ],
  },
];

// ─── PDF Generation ────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth  = 210;
  const margin     = 18;
  const cw         = pageWidth - margin * 2;   // content width
  const lineH      = 5.6;
  const bottomLimit = 280;
  let y = 20;

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const checkPage = (needed: number) => {
    if (y + needed > bottomLimit) { doc.addPage(); y = 20; }
  };

  /** Full-width wrapped paragraph, optionally bold. */
  const write = (text: string, bold = false, gap = 1.8) => {
    const lines = doc.splitTextToSize(text, cw);
    checkPage(lines.length * lineH + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, margin, y);
    y += lines.length * lineH + gap;
  };

  /** Bullet point — real • character, body text indented. */
  const writeBullet = (text: string, gap = 2) => {
    const indent = 7;
    const lines  = doc.splitTextToSize(text, cw - indent);
    checkPage(lines.length * lineH + gap);
    doc.setFont("helvetica", "normal");
    doc.text("\u2022", margin, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + gap;
  };

  /**
   * Mixed-weight line: boldPart in bold, normalPart in normal,
   * both on the same baseline. Overflow lines wrap in normal weight.
   */
  const writeMixed = (boldPart: string, normalPart: string, gap = 1.8) => {
    const full  = boldPart + normalPart;
    const lines = doc.splitTextToSize(full, cw);
    checkPage(lines.length * lineH + gap);

    doc.setFont("helvetica", "bold");
    const bw = doc.getTextWidth(boldPart);
    doc.text(boldPart, margin, y);

    doc.setFont("helvetica", "normal");
    const remainder = lines[0].length >= boldPart.length
      ? lines[0].slice(boldPart.length)
      : "";
    doc.text(remainder, margin + bw, y);

    if (lines.length > 1) {
      y += lineH;
      doc.text(lines.slice(1), margin, y);
      y += (lines.length - 1) * lineH + gap;
    } else {
      y += lineH + gap;
    }
  };

  // ── Title ──────────────────────────────────────────────────────────────────

  doc.setFontSize(12.5);
  doc.setFont("helvetica", "bold");
  const title = "SETTLEMENT AND RELEASE AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(pageWidth / 2 - tw / 2, y + 1.2, pageWidth / 2 + tw / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  // ── Preamble ───────────────────────────────────────────────────────────────

  write(
    `This Settlement and Release Agreement (the "Agreement") is entered into as of ${
      values.agreementDate || "____________"
    }, by and between:`
  );

  writeBullet(
    `${values.complainantName || "____________"} (the "Complainant"), residing at ${
      values.complainantAddress || "______________________"
    }; and`
  );

  writeBullet(
    `${values.defendantName || "____________"} (the "Defendant"), residing at ${
      values.defendantAddress || "______________________"
    }.`
  );

  write(
    'Complainant and Defendant are collectively referred to herein as the "Parties."'
  );
  write(
    "This Agreement shall become effective upon its full execution by the Parties.",
    false,
    3
  );

  // ── Recitals ───────────────────────────────────────────────────────────────

  write("RECITALS", true);

  writeMixed(
    "A.  ",
    `On or about ${values.litigationDate || "__________"}, Complainant commenced a legal action against Defendant in the ${
      values.courtName || "__________ Court"
    } of ${values.courtLocation || "______"}, entitled ${
      values.caseCaption || "________, Plaintiff v. ________, Defendant"
    }, Case No. ${values.caseNumber || "__________"} (the "Litigation").`
  );

  writeMixed(
    "B.  ",
    "Defendant expressly denies, and continues to deny, all claims, allegations, and assertions asserted by Complainant in the Litigation."
  );

  writeMixed(
    "C.  ",
    "The Parties now desire to fully and finally resolve the Litigation in order to avoid the further expense, burden, and uncertainty of continued proceedings."
  );

  writeMixed(
    "D.  ",
    "The execution of this Agreement shall not be construed as, nor deemed to constitute, an admission of liability or wrongdoing by either Party."
  );

  write(
    "NOW, THEREFORE, in consideration of the mutual covenants and undertakings herein contained, and intending to be legally bound, the Parties agree as follows:",
    false,
    3
  );

  // ── Section 1: Payment ─────────────────────────────────────────────────────

  write("1.  Payment", true);

  writeMixed(
    "1.1  ",
    `Defendant shall pay to Complainant the sum of $${
      values.paymentAmount || "__________"
    } within ${
      values.paymentWithinDays || "___"
    } days of receipt by Defendant's counsel of this Agreement duly executed by Complainant and Complainant's attorney.`
  );

  writeMixed(
    "1.2  ",
    `Payment shall be made by certified check payable to Complainant's attorney, ${
      values.payableAttorneyName || "____________"
    }, and mailed to: ${values.mailingAddress || "______________________"}.`
  );

  writeMixed(
    "1.3  ",
    "Such payment shall constitute full and final settlement of all claims, including but not limited to claims for attorney\u2019s fees, damages, penalties, or other relief of any kind arising from or related to the Litigation."
  );

  writeMixed(
    "1.4  ",
    "Upon receipt of payment, Complainant shall promptly execute and file all necessary documents to dismiss the Litigation with prejudice.",
    3
  );

  // ── Section 2: Release ─────────────────────────────────────────────────────

  write("2.  Release", true);

  writeMixed(
    "2.1  ",
    'Complainant, for himself and his heirs, executors, administrators, representatives, successors, and assigns, hereby fully releases and forever discharges Defendant, and Defendant\u2019s parents, subsidiaries, affiliates, franchisees, franchisors, officers, directors, agents, employees, attorneys, insurers, successors, and assigns (collectively, the "Releasees"), from any and all claims, demands, actions, causes of action, liabilities, or obligations of any kind whatsoever, whether known or unknown, suspected or unsuspected, arising from the beginning of time through the date of this Agreement.'
  );

  writeMixed(
    "2.2  ",
    "This Release specifically includes, without limitation, all claims asserted or that could have been asserted in the Litigation, and any claims arising under federal, state, or local law, whether statutory, contractual, or common law."
  );

  writeMixed(
    "2.3  ",
    "Complainant acknowledges that this general release does not extend to claims that he did not know or suspect to exist at the time of execution, which if known would have materially affected his decision to enter into this Agreement.",
    3
  );

  // ── Section 3: Confidentiality ─────────────────────────────────────────────

  write("3.  Confidentiality", true);
  write(
    "The Parties agree that the existence, terms, conditions, and negotiations of this Agreement, as well as all facts and circumstances underlying the Litigation, shall remain strictly confidential, except as required by law or as disclosed to legal, financial, or tax advisors.",
    false,
    3
  );

  // ── Section 4: Severability ───────────────────────────────────────────────

  write("4.  Severability", true);
  write(
    "If any provision of this Agreement is declared invalid, void, or unenforceable by a court or arbitrator of competent jurisdiction, the remaining provisions shall continue in full force and effect.",
    false,
    3
  );

  // ── Section 5: Entire Agreement ───────────────────────────────────────────

  write("5.  Entire Agreement", true);
  write(
    "This Agreement constitutes the entire agreement between the Parties regarding the subject matter hereof and supersedes all prior or contemporaneous agreements, representations, or understandings, whether written or oral. The Parties represent and warrant that no promises or representations exist except as expressly set forth herein.",
    false,
    3
  );

  // ── Section 6: Amendments ────────────────────────────────────────────────

  write("6.  Amendments", true);
  write(
    "No modification or amendment of this Agreement shall be valid unless in writing and signed by Complainant and by a duly authorized representative of Defendant.",
    false,
    3
  );

  // ── Section 7: Attorney Explanation ──────────────────────────────────────

  write("7.  Attorney Explanation", true);

  writeMixed(
    "A.  ",
    `${
      values.complainantAttorney || "____________________"
    }, an attorney licensed to practice law in this State, has explained the terms and legal effect of this Agreement to Complainant, who acknowledges full understanding prior to executing it.`
  );

  writeMixed(
    "B.  ",
    `${
      values.defendantAttorney || "____________________"
    }, an attorney licensed to practice law in this State, has explained the terms and legal effect of this Agreement to Defendant, who acknowledges full understanding prior to executing it.`,
    3
  );

  // ── Section 8: Governing Law ──────────────────────────────────────────────

  write("8.  Governing Law", true);
  write(
    `This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${
      values.governingLawState || "____________"
    }, without regard to conflict-of-law principles.`,
    false,
    4
  );

  // ── Signatures ────────────────────────────────────────────────────────────

  write("SIGNATURES", true, 3);

  write("Complainant", true, 1);
  write("________________________________________", false, 1);
  write(`Name:  ${values.complainantName || "_______________________________"}`, false, 1);
  write(`Date:  ${values.complainantSignDate || "_______________________________"}`, false, 3);

  write("Defendant", true, 1);
  write("________________________________________", false, 1);
  write(`Name:  ${values.defendantName || "_______________________________"}`, false, 1);
  write(`Date:  ${values.defendantSignDate || "_______________________________"}`, false, 3);

  write("Approved as to Form:", true, 2);

  write("Attorney for Complainant", true, 1);
  write("________________________________________", false, 1);
  write(`Name:      ${values.complainantAttorney || "_______________________________"}`, false, 1);
  write(`Law Firm:  ${values.complainantAttorneyLawFirm || "_______________________________"}`, false, 1);
  write(`Date:      ${values.complainantAttorneyDate || "_______________________________"}`, false, 3);

  write("Attorney for Defendant", true, 1);
  write("________________________________________", false, 1);
  write(`Name:      ${values.defendantAttorney || "_______________________________"}`, false, 1);
  write(`Law Firm:  ${values.defendantAttorneyLawFirm || "_______________________________"}`, false, 1);
  write(`Date:      ${values.defendantAttorneyDate || "_______________________________"}`, false, 4);

  // ── Optional Notary ───────────────────────────────────────────────────────

  if (values.notaryState || values.notaryCounty || values.notaryDate || values.notaryAppearer) {
    write("[Notary Acknowledgment]", true, 2);
    write(`State of ${values.notaryState || "____________"} )`, false, 1);
    write(`County of ${values.notaryCounty || "__________"} )`, false, 2);
    write(
      `On this ${
        values.notaryDate || "___ day of __________, ____"
      }, before me, the undersigned Notary Public, personally appeared ${
        values.notaryAppearer || "______________________"
      }, known to me (or satisfactorily proven) to be the person(s) whose name(s) are subscribed to this instrument, and acknowledged that he/she executed the same for the purposes therein contained.`
    );
    write("IN WITNESS WHEREOF, I hereunto set my hand and official seal.", false, 3);
    write("________________________________________", false, 1);
    write("Notary Public");
  }

  doc.save("settlement_and_release_agreement.pdf");
};

// ─── Component ────────────────────────────────────────────────────────────────

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