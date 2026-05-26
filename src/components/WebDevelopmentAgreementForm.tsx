import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Basic Info",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "clientName", label: "Client Name", type: "text", required: true },
      { name: "clientAddress", label: "Client Address", type: "textarea", required: false },
      { name: "developerName", label: "Web Developer Name", type: "text", required: true },
      { name: "developerAddress", label: "Web Developer Address", type: "textarea", required: false },
    ],
  },
  {
    label: "Project & Payment",
    fields: [
      { name: "projectStartDate", label: "Project Start Date", type: "date", required: false },
      { name: "projectDescription", label: "Project Description", type: "textarea", required: true },
      { name: "compensation", label: "Compensation (e.g., $____ per hour or fixed fee)", type: "text", required: true },
      { name: "paymentTerms", label: "Payment Terms (days to pay)", type: "text", required: false },
      { name: "reimburseExpenses", label: "Reimburse Expenses (yes/no)", type: "text", required: false },
    ],
  },
  {
    label: "Legal",
    fields: [
      { name: "terminationNoticeDays", label: "Termination Notice (days)", type: "text", required: false },
      { name: "governingLaw", label: "Governing Law (state)", type: "text", required: false },
      { name: "warrantyPeriod", label: "Warranty Period (months)", type: "text", required: false },
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
  doc.text("WEB DEVELOPMENT AGREEMENT", W / 2, y, { align: "center" });
  y += 10;

  write(`This Web Development Agreement ("Agreement") is made and entered into as of ${u(values.effectiveDate) || "[___]"} ("Effective Date"), by and between ${u(values.clientName) || "[___]"}, having its address at ${u(values.clientAddress) || "[___]"} ("Client"), and ${u(values.developerName) || "[___]"}, having its address at ${u(values.developerAddress) || "[___]"} ("Web Developer"). The Client and the Web Developer may hereinafter be referred to individually as a "Party" and collectively as the "Parties."`);

  write("Recitals", true);
  write("WHEREAS, the Web Developer possesses professional knowledge, experience, and technical expertise in the field of computer programming and, in particular, the design, development, and implementation of website technology; and WHEREAS, the Client desires to retain the services of the Web Developer to design and develop a website for the Client (the \"Web Design Project\"), and the Web Developer agrees to provide such services under the terms and conditions set forth herein. NOW, THEREFORE, in consideration of the mutual covenants, promises, and agreements contained herein, and intending to be legally bound, the Parties agree as follows:");

  write("1. Engagement of Web Developer", true);
  write("The Client hereby retains and engages the Web Developer to perform website design and development services in connection with the Web Design Project. The website shall be developed for publication on the Client’s account with an Internet Service Provider (\"ISP\") or Web Presence Provider (\"WPP\") hosting service, or alternatively may be delivered to the Client on electronic media at the Client’s request.");

  write("2. Description of Services", true);
  write(`Commencing on ${u(values.projectStartDate) || "[___]"}, the Web Developer shall perform the services necessary for the design, development, and implementation of the Client’s website (collectively, the "Services"). Such Services may include, without limitation, website design, programming, testing, configuration, and other related development activities as agreed by the Parties.`);

  write("3. Change Orders", true);
  write("The Parties may modify the scope of the Services at any time through a written Change Order. Each Change Order shall describe the requested modifications and any corresponding adjustment to fees, timelines, or deliverables. No Change Order shall become effective unless it is reduced to writing and signed by both Parties.");

  write("4. Compensation and Payment Terms", true);
  write(`In consideration of the Services rendered by the Web Developer, the Client agrees to compensate the Web Developer as follows: ${u(values.compensation) || "[see agreement]"}. The Client shall remit payment per the agreed payment terms: ${u(values.paymentTerms) || "[___]"}. The Client shall reimburse the Web Developer for all reasonable and pre-approved costs and expenses incurred in connection with the performance of the Services.`);

  write("5. Web Hosting", true);
  write("The Client acknowledges that web hosting services are not included within this Agreement and may require a separate agreement with a third-party hosting provider. The Client shall ensure that the selected hosting provider grants the Web Developer sufficient access to perform the Services contemplated herein.");

  write("6. Term", true);
  write("This Agreement shall commence on the Effective Date and shall remain in force until the completion of the Services (\"Termination Date\"), unless earlier terminated in accordance with this Agreement. The Parties may extend or modify the Termination Date by mutual written agreement.");

  write("7. Termination", true);
  write(`Either Party may terminate this Agreement prior to the Termination Date, with or without cause, by providing ${u(values.terminationNoticeDays) || "[___]"} days' written notice to the other Party. In the event of early termination, the Web Developer shall be entitled to payment for all Services rendered and approved expenses incurred up to the effective date of termination.`);

  write("8. Independent Contractor Relationship", true);
  write("The Parties acknowledge and agree that the Web Developer shall act as an independent contractor and not as an employee, partner, or agent of the Client. Accordingly, the Web Developer shall not be entitled to any employee benefits.");

  write("9. Ownership of Work Product", true);
  write("All copyrightable works, designs, inventions, discoveries, software code, and other materials developed by the Web Developer in connection with the Services (collectively, the \"Work Product\") shall become the exclusive property of the Client upon full payment for the Services. The Web Developer agrees to execute any documents reasonably required to confirm or perfect the Client’s ownership rights in such Work Product.");

  write("10. Compliance with Laws", true);
  write("The Client acknowledges and agrees that it is solely responsible for complying with all applicable laws, regulations, taxes, and tariffs relating to electronic commerce and online business activities conducted through the website. The Client shall indemnify and hold harmless the Web Developer and its subcontractors from any claims arising from the Client’s failure to comply with such legal obligations.");

  write("11. Confidentiality", true);
  write("The Web Developer agrees that any confidential or proprietary information disclosed by the Client shall be kept strictly confidential and shall not be used or disclosed for any purpose other than the performance of this Agreement. This obligation of confidentiality shall survive the termination or expiration of this Agreement. Upon termination, the Web Developer shall promptly return to the Client all documents, materials, and records containing confidential information.");

  write("12. Insurance and Injuries", true);
  write("The Web Developer shall be responsible for maintaining appropriate insurance coverage for itself and any employees engaged in the performance of the Services. The Web Developer hereby waives any claim against the Client for injuries sustained in connection with the performance of the Services where such injuries arise from the negligence or acts of the Web Developer or its personnel.");

  write("13. Employees and Subcontractors", true);
  write("Any employees or subcontractors engaged by the Web Developer in the performance of the Services shall be subject to the terms and conditions of this Agreement. Upon request, the Web Developer shall provide evidence that such individuals are duly engaged by the Web Developer.");

  write("14. Assignment", true);
  write("The Web Developer shall not assign or transfer any rights or obligations under this Agreement without the prior written consent of the Client.");

  write("15. Indemnification", true);
  write("The Web Developer agrees to indemnify, defend, and hold harmless the Client from and against any claims, damages, losses, liabilities, or expenses, including reasonable attorneys’ fees, arising out of or resulting from the acts, omissions, or negligence of the Web Developer or its personnel.");

  write("16. Force Majeure", true);
  write("Neither Party shall be liable for any failure or delay in the performance of its obligations under this Agreement where such failure results from events beyond its reasonable control (\"Force Majeure\"). The affected Party shall promptly notify the other Party in writing of the occurrence of such event.");

  write("17. Dispute Resolution", true);
  write("The Parties shall first attempt to resolve any dispute arising out of or relating to this Agreement through good-faith negotiations. If the dispute cannot be resolved through negotiation, the Parties agree to submit the matter to mediation or another form of Alternative Dispute Resolution (ADR) before initiating formal legal proceedings.");

  write("18. Default", true);
  write("Events constituting default include failure to make required payments when due, insolvency, seizure of property, or failure to perform services as required under this Agreement.");

  write("19. Remedies", true);
  write("Upon the occurrence of a material default, the non-defaulting Party may provide written notice specifying the nature of the default. The defaulting Party shall have the specified cure period to rectify the default. If not cured, the Agreement may be terminated.");

  write("20. Limitation of Liability", true);
  write("To the fullest extent permitted by law, neither Party shall be liable to the other for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, revenue, or business opportunities arising out of or relating to this Agreement.");

  write("21. Entire Agreement", true);
  write("This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, understandings, or agreements, whether written or oral.");

  write("22. Severability", true);
  write("If any provision of this Agreement is held to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect.");

  write("23. Amendments", true);
  write("This Agreement may only be amended, modified, or supplemented by a written document executed by both Parties.");

  write("24. Waiver", true);
  write("The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of that provision or any other provision.");

  write("25. Notices", true);
  write("All notices required or permitted under this Agreement shall be in writing and shall be deemed duly given when delivered personally or sent by certified mail, courier, or other recognized delivery service to the addresses of the Parties stated above.");

  write("26. Governing Law", true);
  write(`This Agreement shall be governed by and construed in accordance with the laws of ${u(values.governingLaw) || "[___]"}, without regard to its conflict of law principles.`);

  write("27. Signatures", true);
  write("IN WITNESS WHEREOF, the Parties have executed this Web Development Agreement as of the Effective Date first written above.\n\nCLIENT\nSignature: _______________________\nName: __________________________\nDate: ___________________________\n\nWEB DEVELOPER\nSignature: _______________________\nName: __________________________\nDate: ___________________________");

  doc.save("web_development_agreement.pdf");
};

export default function WebDevelopmentAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Web Development Agreement"
      subtitle="Fill the fields to generate the Web Development Agreement PDF"
      onGenerate={generatePDF}
      documentType="web-development-agreement"
    />
  );
}
