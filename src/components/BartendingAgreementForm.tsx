import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Country",
        type: "select",
        required: true,
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "other", label: "Other" },
        ],
      },
      { name: "state", label: "State/Province", type: "text", required: true, placeholder: "State or province" },
      { name: "city", label: "City", type: "text", required: true, placeholder: "City" },
    ],
  },
  {
    label: "Parties and Event",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "recipientName", label: "Recipient (Client) Name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient Address", type: "text", required: true },
      { name: "providerName", label: "Provider (Bartender) Name", type: "text", required: true },
      { name: "providerAddress", label: "Provider Address", type: "text", required: true },
      { name: "terminationDate", label: "Termination Date", type: "date", required: true },
    ],
  },
  {
    label: "Service Scope",
    fields: [
      {
        name: "scopeDetails",
        label: "Scope of Services",
        type: "textarea",
        required: true,
        placeholder: "Drink service, setup, breakdown, cleanliness, monitoring, etc.",
      },
      {
        name: "exclusions",
        label: "Exclusions",
        type: "textarea",
        required: true,
        placeholder: "Purchasing alcohol, permits, unmanaged behavior, etc.",
      },
      {
        name: "permitResponsibility",
        label: "Who obtains permits/licenses?",
        type: "text",
        required: true,
        placeholder: "Usually Recipient",
      },
    ],
  },
  {
    label: "Payment and Cancellation",
    fields: [
      { name: "serviceFee", label: "Total Service Fee", type: "text", required: true, placeholder: "$0.00" },
      { name: "retainerFee", label: "Non-refundable Retainer", type: "text", required: true, placeholder: "$0.00" },
      { name: "additionalHourRate", label: "Additional Hourly Rate", type: "text", required: true, placeholder: "$0.00/hr" },
      { name: "lateInterestRate", label: "Late Payment Interest Rate (%)", type: "text", required: true, placeholder: "10" },
      { name: "cancelDaysFullRefundWindow", label: "Cancellation threshold (days)", type: "number", required: true, placeholder: "14" },
      { name: "cureDays", label: "Default Cure Period (days)", type: "number", required: true, placeholder: "10" },
    ],
  },
  {
    label: "Legal Terms",
    fields: [
      { name: "governingLawState", label: "Governing Law State", type: "text", required: true, placeholder: "State name" },
      { name: "arbitrationLocation", label: "Arbitration Location", type: "text", required: true, placeholder: "Mutually agreed location" },
      {
        name: "confidentialityIncluded",
        label: "Confidentiality included?",
        type: "select",
        required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
      },
      {
        name: "indemnificationIncluded",
        label: "Indemnification included?",
        type: "select",
        required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "recipientSignature", label: "Recipient Signature (typed)", type: "text", required: true },
      { name: "recipientSignDate", label: "Recipient Signature Date", type: "date", required: true },
      { name: "providerSignature", label: "Provider Signature (typed)", type: "text", required: true },
      { name: "providerSignDate", label: "Provider Signature Date", type: "date", required: true },
      {
        name: "finalConfirm",
        label: "Confirm final review",
        type: "select",
        required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
      },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const margin = 16;
  const bulletIndent = 22;
  const width = doc.internal.pageSize.getWidth() - margin * 2;
  const bulletWidth = doc.internal.pageSize.getWidth() - bulletIndent - margin;
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 20;

  // ── helpers ──────────────────────────────────────────────────────────────────

  const checkPage = (needed: number) => {
    if (y + needed > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  /** Render a bold section heading */
  const addHeading = (text: string) => {
    checkPage(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, margin, y);
    y += lines.length * 5.5 + 3;
  };

  /** Render normal body text */
  const addBody = (text: string, gap = 5) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, width);
    checkPage(lines.length * 5);
    doc.text(lines, margin, y);
    y += lines.length * 5 + gap;
  };

  /** Render a bullet item with a real bullet character */
  const addBullet = (text: string) => {
    checkPage(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, bulletWidth);
    checkPage(lines.length * 5);
    doc.text("\u2022", margin + 2, y);
    doc.text(lines, bulletIndent, y);
    y += lines.length * 5 + 3;
  };

  /** Small vertical gap */
  const gap = (px = 3) => { y += px; };

  // ── Document Title ───────────────────────────────────────────────────────────

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const titleLines = doc.splitTextToSize("BARTENDING SERVICES AGREEMENT", width);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 7 + 6;

  // ── Preamble ─────────────────────────────────────────────────────────────────

  addBody(
    `This Bartending Services Agreement ("Agreement") is made and entered into as of ` +
    `${values.effectiveDate || "__________"} ("Effective Date"), by and between:`
  );
  gap();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Recipient (Client):", margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${values.recipientName || "__________________________"}`, margin, y);
  y += 5;
  doc.text(`Address: ${values.recipientAddress || "__________________________"}`, margin, y);
  y += 7;

  addBody("and");
  gap();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Provider (Bartender):", margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${values.providerName || "__________________________"}`, margin, y);
  y += 5;
  doc.text(`Address: ${values.providerAddress || "__________________________"}`, margin, y);
  y += 7;

  addBody(`(Collectively referred to as the "Parties.")`);
  addBody(`Jurisdiction: ${values.city || "___________"}, ${values.state || "___________"}, ${values.country || "___________"}.`);
  gap(4);

  // ── Section 1 ────────────────────────────────────────────────────────────────

  addHeading("1. PURPOSE OF AGREEMENT");
  addBody(
    "The Recipient desires to retain the Provider to perform professional bartending services for an event, " +
    "and the Provider agrees to provide such services under the terms and conditions set forth herein."
  );
  gap(4);

  // ── Section 2 ────────────────────────────────────────────────────────────────

  addHeading("2. DESCRIPTION OF SERVICES");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("2.1 Scope of Services", margin, y);
  y += 6;

  addBody(
    `Beginning on the Effective Date, the Provider shall provide professional bartending services ("Services"), ` +
    `which may include but are not limited to:`
  );

  const scopeLines = values.scopeDetails
    ? values.scopeDetails.split(/\n|,/).map((s) => s.trim()).filter(Boolean)
    : [
        "Preparation and service of alcoholic and non-alcoholic beverages",
        "Setup and breakdown of the bar area",
        "Preparation of garnishes and beverage components",
        "Maintenance of cleanliness and safety at the bar",
        "Monitoring alcohol consumption and guest conduct",
        "Any additional bartending-related services agreed upon in writing",
      ];
  scopeLines.forEach(addBullet);
  gap(3);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("2.2 Exclusions", margin, y);
  y += 6;

  addBody("Unless expressly agreed in writing, the Provider shall not be responsible for:");

  const exclusionLines = values.exclusions
    ? values.exclusions.split(/\n|,/).map((s) => s.trim()).filter(Boolean)
    : [
        "Purchasing alcohol or supplies",
        "Providing bar equipment not specifically agreed upon",
        "Managing guest behavior beyond alcohol service",
        "Obtaining event permits or licenses",
      ];
  exclusionLines.forEach(addBullet);
  gap(4);

  // ── Section 3 ────────────────────────────────────────────────────────────────

  addHeading("3. RIGHTS AND RESPONSIBILITIES OF THE PROVIDER");
  addBody(
    "3.1 The Provider represents and warrants that they are knowledgeable of all applicable federal, state, " +
    "and local laws governing the service of alcoholic beverages."
  );
  addBody(
    "3.2 The Provider shall strictly comply with all applicable alcohol service regulations and shall not serve " +
    "alcohol to any person under the legal drinking age."
  );
  addBody(
    "3.3 The Provider reserves the right to request valid government-issued identification from any guest who " +
    "appears under the legal drinking age."
  );
  addBody(
    "3.4 The Provider shall exercise professional judgment and has the absolute right to refuse service to any " +
    "guest who appears intoxicated or whose behavior poses a risk to themselves or others."
  );
  addBody(
    "3.5 The Provider shall supply necessary bartending tools including, but not limited to, wine keys, bottle " +
    "openers, pour spouts, and standard bar tools unless otherwise agreed."
  );
  gap(4);

  // ── Section 4 ────────────────────────────────────────────────────────────────

  addHeading("4. LOCATION AND PERMITS");
  addBody(
    "4.1 The Recipient shall be solely responsible for securing the event location and ensuring that the venue " +
    "permits alcohol service."
  );
  addBody(
    `4.2 The Recipient (${values.permitResponsibility || "Recipient"}) shall obtain all required permits, licenses, ` +
    "and permissions necessary for the lawful service of alcohol at the event."
  );
  addBody(
    "4.3 The Provider shall not be held liable for any fines, penalties, or legal issues arising from the " +
    "Recipient's failure to obtain proper permits or comply with venue regulations."
  );
  gap(4);

  // ── Section 5 ────────────────────────────────────────────────────────────────

  addHeading("5. PAYMENT TERMS");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("5.1 Service Fee", margin, y);
  y += 6;
  addBody(
    `The Recipient agrees to pay the Provider a total fee of ${values.serviceFee || "$__________"} for the Services.`
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("5.2 Retainer", margin, y);
  y += 6;
  addBody(
    `A non-refundable retainer of ${values.retainerFee || "$__________"} is due upon execution of this Agreement. ` +
    "The remaining balance shall be paid in full on or before the date of the event."
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("5.3 Additional Hours", margin, y);
  y += 6;
  addBody(
    `Any services requested beyond the contracted time shall be billed at ${values.additionalHourRate || "$________"} ` +
    "per hour, subject to Provider availability."
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("5.4 Late Payments", margin, y);
  y += 6;
  addBody(
    `Any unpaid balance shall accrue interest at ${values.lateInterestRate || "____"}% per annum or the maximum ` +
    "rate permitted by law, whichever is less."
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("5.5 Collection Costs", margin, y);
  y += 6;
  addBody(
    "The Recipient shall be responsible for all costs of collection, including reasonable attorney's fees, " +
    "court costs, and administrative expenses."
  );
  gap(4);

  // ── Section 6 ────────────────────────────────────────────────────────────────

  addHeading("6. TERM");
  addBody(
    `This Agreement shall commence on the Effective Date and shall remain in effect until ` +
    `${values.terminationDate || "__________"} ("Termination Date"), unless earlier terminated in accordance with this Agreement.`
  );
  gap(4);

  // ── Section 7 ────────────────────────────────────────────────────────────────

  addHeading("7. TERMINATION");
  addBody("7.1 Either Party may terminate this Agreement by written notice as provided herein.");
  addBody(
    "7.2 Upon early termination, the Provider shall be entitled to payment for all Services rendered up to the termination date."
  );
  gap(4);

  // ── Section 8 ────────────────────────────────────────────────────────────────

  addHeading("8. CANCELLATION POLICY");
  addBody("8.1 All retainer fees are non-refundable.");
  addBody(
    `8.2 If the Recipient cancels the Agreement more than ${values.cancelDaysFullRefundWindow || "____"} days prior to the event, ` +
    "all amounts paid shall be refunded except the retainer."
  );
  addBody(
    `8.3 If cancellation occurs less than ${values.cancelDaysFullRefundWindow || "____"} days prior to the event, ` +
    "the Recipient shall be responsible for the full contract amount."
  );
  addBody(
    "8.4 If the Provider cancels the Agreement for any reason not caused by the Recipient, all monies paid shall be fully refunded."
  );
  gap(4);

  // ── Section 9 ────────────────────────────────────────────────────────────────

  if (values.confidentialityIncluded !== "no") {
    addHeading("9. CONFIDENTIALITY");
    addBody("9.1 The Provider agrees to keep all information relating to the Recipient and the event strictly confidential.");
    addBody("9.2 This obligation applies to all employees, agents, or representatives of the Provider.");
    addBody("9.3 Upon termination of this Agreement, all confidential materials shall be returned to the Recipient.");
    gap(4);
  }

  // ── Section 10 ───────────────────────────────────────────────────────────────

  if (values.indemnificationIncluded !== "no") {
    addHeading("10. INDEMNIFICATION");
    addBody(
      "The Provider agrees to indemnify and hold harmless the Recipient from any and all claims, damages, liabilities, " +
      "losses, or expenses arising from:"
    );
    addBullet("The Provider's negligence or misconduct");
    addBullet("Violation of applicable alcohol laws");
    addBullet("Acts or omissions of the Provider or their staff");
    gap(4);
  }

  // ── Section 11 ───────────────────────────────────────────────────────────────

  addHeading("11. WARRANTY");
  addBody("11.1 The Provider warrants that all services shall be performed in a professional and workmanlike manner.");
  addBody("11.2 The Provider affirms familiarity with all applicable alcohol laws and industry standards.");
  addBody("11.3 The Provider shall not consume alcohol or illegal substances while performing services.");
  gap(4);

  // ── Section 12 ───────────────────────────────────────────────────────────────

  addHeading("12. DEFAULT");
  addBody("A material default shall include, but not be limited to:");
  addBullet("Failure to make payment when due");
  addBullet("Insolvency or bankruptcy of either party");
  addBullet("Seizure or attachment of assets");
  addBullet("Failure to perform services as agreed");
  gap(4);

  // ── Section 13 ───────────────────────────────────────────────────────────────

  addHeading("13. REMEDIES");
  addBody(
    "Upon default, the non-defaulting party may provide written notice specifying the breach. " +
    `The defaulting party shall have ${values.cureDays || "____"} days to cure the default.`
  );
  addBody(
    "Failure to cure within the stated period shall result in immediate termination of this Agreement " +
    "and pursuit of all available legal remedies."
  );
  gap(4);

  // ── Section 14 ───────────────────────────────────────────────────────────────

  addHeading("14. FORCE MAJEURE");
  addBody(
    "Neither Party shall be liable for failure or delay in performance caused by events beyond reasonable control, including but not limited to:"
  );
  addBullet("Natural disasters");
  addBullet("Pandemics or epidemics");
  addBullet("Government restrictions");
  addBullet("War, civil unrest, or labor disputes");
  addBullet("Fire or utility failures");
  addBody("The affected Party shall promptly notify the other and resume performance as soon as reasonably possible.");
  gap(4);

  // ── Section 15 ───────────────────────────────────────────────────────────────

  addHeading("15. ARBITRATION");
  addBody(
    "Any dispute arising out of or relating to this Agreement shall be resolved by binding arbitration in accordance " +
    "with the rules of the American Arbitration Association."
  );
  addBody(
    `The arbitration shall take place at ${values.arbitrationLocation || "a mutually agreed location"}. ` +
    "The arbitrator's decision shall be final and binding."
  );
  gap(4);

  // ── Section 16 ───────────────────────────────────────────────────────────────

  addHeading("16. GOVERNING LAW");
  addBody(
    `This Agreement shall be governed by and interpreted in accordance with the laws of the State of ` +
    `${values.governingLawState || "__________"}.`
  );
  gap(4);

  // ── Section 17 ───────────────────────────────────────────────────────────────

  addHeading("17. ENTIRE AGREEMENT");
  addBody(
    "This Agreement constitutes the entire agreement between the Parties and supersedes all prior discussions or agreements."
  );
  gap(4);

  // ── Section 18 ───────────────────────────────────────────────────────────────

  addHeading("18. AMENDMENTS");
  addBody("Any amendment to this Agreement must be in writing and signed by both Parties.");
  gap(4);

  // ── Section 19 — Signatures ──────────────────────────────────────────────────

  addHeading("19. SIGNATURES");
  addBody(
    "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date written above."
  );
  gap(4);

  checkPage(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Recipient", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.recipientName || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Signature: ${values.recipientSignature || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Date:      ${values.recipientSignDate || "__________________________"}`, margin, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Provider", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.providerName || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Signature: ${values.providerSignature || "__________________________"}`, margin, y);
  y += 6;
  doc.text(`Date:      ${values.providerSignDate || "__________________________"}`, margin, y);
  y += 10;

  addBody(
    `Final confirmation: ${values.finalConfirm === "yes" ? "Confirmed by both parties." : "Not yet confirmed."}`
  );

  doc.save("bartending_services_agreement.pdf");
};

export default function BartendingAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Bartending Services Agreement"
      subtitle="Complete 6 steps to generate your document"
      onGenerate={generatePDF}
      documentType="bartending-services-agreement"
    />
  );
}