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
    label: "Parties",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "recipientName", label: "Client (Recipient) Name", type: "text", required: true },
      { name: "recipientAddress", label: "Client Address", type: "text", required: true },
      { name: "providerName", label: "Service Provider Name", type: "text", required: true },
      { name: "providerAddress", label: "Provider Address", type: "text", required: true },
      { name: "serviceStartDate", label: "Service Start Date", type: "date", required: true },
      { name: "termEndDate", label: "Agreement End Date", type: "date", required: true },
    ],
  },
  {
    label: "Services",
    fields: [
      {
        name: "serviceDetails",
        label: "Service Scope",
        type: "textarea",
        required: true,
        placeholder: "Coverage, footage, editing, delivery details",
      },
      { name: "deliveryFormat", label: "Selected Delivery Format", type: "text", required: true, placeholder: "MP4, MOV, etc." },
      { name: "coverageHours", label: "Included Coverage Hours", type: "number", required: true, placeholder: "8" },
      { name: "extraServicesNote", label: "Additional Services (optional)", type: "textarea", required: false, placeholder: "Any extra requested services" },
    ],
  },
  {
    label: "Payment and Cancellation",
    fields: [
      { name: "totalFee", label: "Total Service Fee", type: "text", required: true, placeholder: "$0.00" },
      { name: "perCopyFee", label: "Fee Per Completed Video Copy", type: "text", required: true, placeholder: "$0.00" },
      { name: "additionalFeeTerms", label: "Compilation/Special Request Fee Terms", type: "textarea", required: true, placeholder: "As quoted by Provider in writing" },
      { name: "cancelNoticeDays", label: "Cancellation Notice (days)", type: "number", required: true, placeholder: "14" },
      { name: "cancelPenaltyDays", label: "Full-payment penalty window (days)", type: "number", required: true, placeholder: "7" },
    ],
  },
  {
    label: "Legal Terms",
    fields: [
      { name: "governingLawState", label: "Governing Law State", type: "text", required: true },
      { name: "cureDays", label: "Default Cure Period (days)", type: "number", required: true, placeholder: "10" },
      { name: "terminationNoticeDays", label: "Termination Notice (days)", type: "number", required: true, placeholder: "15" },
      { name: "arbitrationLocation", label: "Arbitration Location", type: "text", required: true, placeholder: "Mutually agreed location" },
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
        name: "finalConfirmation",
        label: "Confirm both parties reviewed all terms",
        type: "select",
        required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
      },
    ],
  },
];

// ─── PDF helpers ─────────────────────────────────────────────────────────────

const PAGE_H       = 297;   // A4 height mm
const MARGIN_TOP   = 18;
const MARGIN_BTM   = 18;
const MARGIN_LEFT  = 20;
const CONTENT_W    = 170;   // usable width mm

/** Opens a new page and returns the reset Y position. */
function newPage(doc: jsPDF): number {
  doc.addPage();
  return MARGIN_TOP;
}

/** Draws a thin horizontal rule and returns updated Y. */
function rule(doc: jsPDF, y: number): number {
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_LEFT, y, MARGIN_LEFT + CONTENT_W, y);
  return y + 4;
}

/**
 * Writes a bold section heading and returns updated Y.
 * Adds a new page automatically if space is insufficient.
 */
function heading(doc: jsPDF, text: string, y: number): number {
  if (y > PAGE_H - MARGIN_BTM - 14) y = newPage(doc);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(text, MARGIN_LEFT, y);
  return y + 7;
}

/**
 * Writes a wrapped normal-weight paragraph and returns updated Y.
 * Handles page overflow line by line.
 */
function body(doc: jsPDF, text: string, y: number, indent = 0): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, CONTENT_W - indent);
  for (const line of lines) {
    if (y > PAGE_H - MARGIN_BTM) y = newPage(doc);
    doc.text(line, MARGIN_LEFT + indent, y);
    y += 5;
  }
  return y + 1;
}

/**
 * Writes a single bullet item with a hanging indent and returns updated Y.
 * Handles page overflow.
 */
function bullet(doc: jsPDF, text: string, y: number): number {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const bulletX = MARGIN_LEFT + 4;
  const textX   = MARGIN_LEFT + 10;
  const lines   = doc.splitTextToSize(text, CONTENT_W - 10);
  if (y > PAGE_H - MARGIN_BTM) y = newPage(doc);
  doc.text("\u2022", bulletX, y);
  doc.text(lines[0], textX, y);
  y += 5;
  for (let i = 1; i < lines.length; i++) {
    if (y > PAGE_H - MARGIN_BTM) y = newPage(doc);
    doc.text(lines[i], textX, y);
    y += 5;
  }
  return y + 1;
}

// ─── Main PDF generator ───────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN_TOP;

  // ── Document title ──────────────────────────────────────────────────────
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("VIDEOGRAPHY SERVICES AGREEMENT", 105, y, { align: "center" });
  y += 8;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Effective Date: ${values.effectiveDate || "___________"}     |     ${values.city || "___"}, ${values.state || "___"}, ${(values.country || "").toUpperCase()}`,
    105, y, { align: "center" }
  );
  y += 5;
  y = rule(doc, y);

  // ── Parties block ───────────────────────────────────────────────────────
  y = body(doc,
    `This Videography Services Agreement ("Agreement") is entered into as of ${values.effectiveDate || "___________"} ("Effective Date"), by and between:`,
    y
  );
  y += 2;

  doc.setFont("helvetica", "bold");
  doc.text("CLIENT (\"RECIPIENT\")", MARGIN_LEFT, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.recipientName    || "______________________________"}`, MARGIN_LEFT + 4, y); y += 5;
  doc.text(`Address: ${values.recipientAddress || "______________________________"}`, MARGIN_LEFT + 4, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("SERVICE PROVIDER (\"PROVIDER\")", MARGIN_LEFT, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:    ${values.providerName    || "______________________________"}`, MARGIN_LEFT + 4, y); y += 5;
  doc.text(`Address: ${values.providerAddress || "______________________________"}`, MARGIN_LEFT + 4, y);
  y += 7;

  doc.setFont("helvetica", "italic");
  doc.text(`(collectively referred to as the "Parties").`, MARGIN_LEFT, y);
  doc.setFont("helvetica", "normal");
  y += 6;
  y = rule(doc, y);

  // ── SECTION 1 – DESCRIPTION OF SERVICES ────────────────────────────────
  y = heading(doc, "1. DESCRIPTION OF SERVICES", y);
  y = body(doc, `1.1  Beginning on ${values.serviceStartDate || "___________"}, the Provider shall render professional videography services to the Recipient (the "Services").`, y);
  y = body(doc, "1.2  The Services shall include, but are not limited to:", y);
  y = bullet(doc, "Videographic coverage of the Recipient's event or project", y);
  y = bullet(doc, "Capture of high-quality digital video footage", y);
  y = bullet(doc, "Professional post-production editing and processing", y);
  y = bullet(doc, `Delivery of final video files in ${values.deliveryFormat || "the format selected by the Recipient"}`, y);
  y = body(doc, "1.3  Any additional services requested by the Recipient beyond those listed herein shall be subject to separate written agreement and additional fees.", y);
  if (values.extraServicesNote) {
    y = body(doc, `Additional service notes: ${values.extraServicesNote}`, y, 4);
  }
  y += 2;

  // ── SECTION 2 – PERFORMANCE OF SERVICES ────────────────────────────────
  y = heading(doc, "2. PERFORMANCE OF SERVICES", y);
  y = body(doc, "2.1  The Provider shall exercise commercially reasonable efforts to provide complete and professional coverage of the event.", y);
  y = body(doc, "2.2  The Provider shall utilize professional-grade equipment and techniques and shall deliver final edited content in a timely manner consistent with industry standards.", y);
  y = body(doc, "2.3  All video footage shall be captured, edited, and mastered using professional digital production methods.", y);
  y = body(doc, "2.4  The final video deliverables shall be provided in the format selected by the Recipient, subject to technical feasibility.", y);
  y += 2;

  // ── SECTION 3 – PAYMENT TERMS ───────────────────────────────────────────
  y = heading(doc, "3. PAYMENT TERMS", y);
  y = body(doc, `3.1  In consideration for the Services, the Recipient agrees to pay the Provider the total sum of ${values.totalFee || "$__________"}.`, y);
  y = body(doc, `3.2  This fee includes up to ${values.coverageHours || "____"} hours of videography coverage.`, y);
  y = body(doc, "3.3  The Provider shall provide proof of final video delivery upon completion.", y);
  y = body(doc, "3.4  Upon satisfaction with the Services, the Recipient agrees to pay:", y);
  y = bullet(doc, `${values.perCopyFee || "$__________"} per copy of the completed video; and`, y);
  y = bullet(doc, `Additional fees for compilation edits or special requests, as quoted by the Provider in writing.`, y);
  if (values.additionalFeeTerms) {
    y = body(doc, `Additional fee terms: ${values.additionalFeeTerms}`, y, 4);
  }
  y += 2;

  // ── SECTION 4 – CANCELLATION POLICY ────────────────────────────────────
  y = heading(doc, "4. CANCELLATION POLICY", y);
  y = body(doc, `4.1  A minimum of ${values.cancelNoticeDays || "____"} days' written notice is required for cancellation.`, y);
  y = body(doc, `4.2  Any cancellation made less than ${values.cancelPenaltyDays || "____"} days prior to the scheduled service date shall result in full payment being due and payable.`, y);
  y += 2;

  // ── SECTION 5 – ENTIRE AGREEMENT ────────────────────────────────────────
  y = heading(doc, "5. ENTIRE AGREEMENT", y);
  y = body(doc, "This Agreement constitutes the entire understanding between the Parties and supersedes all prior oral or written agreements, representations, or negotiations.", y);
  y += 2;

  // ── SECTION 6 – SEVERABILITY ────────────────────────────────────────────
  y = heading(doc, "6. SEVERABILITY", y);
  y = body(doc, "If any provision of this Agreement is found to be invalid or unenforceable, such provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.", y);
  y += 2;

  // ── SECTION 7 – AMENDMENTS ──────────────────────────────────────────────
  y = heading(doc, "7. AMENDMENTS", y);
  y = body(doc, "This Agreement may be amended or modified only by a written document signed by both Parties.", y);
  y += 2;

  // ── SECTION 8 – GOVERNING LAW ───────────────────────────────────────────
  y = heading(doc, "8. GOVERNING LAW", y);
  y = body(doc, `This Agreement shall be governed by and construed in accordance with the laws of the State of ${values.governingLawState || "_______________"}.`, y);
  y += 2;

  // ── SECTION 9 – NOTICE ──────────────────────────────────────────────────
  y = heading(doc, "9. NOTICE", y);
  y = body(doc, "Any notice required under this Agreement shall be deemed properly given if delivered personally or sent by certified mail, return receipt requested, to the address of the receiving party as set forth above or as later designated in writing.", y);
  y += 2;

  // ── SECTION 10 – WAIVER ─────────────────────────────────────────────────
  y = heading(doc, "10. WAIVER", y);
  y = body(doc, "The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of that provision or of any other provision.", y);
  y += 2;

  // ── SECTION 11 – ASSIGNMENT ─────────────────────────────────────────────
  y = heading(doc, "11. ASSIGNMENT", y);
  y = body(doc, "Neither Party may assign, transfer, or delegate this Agreement or any rights or obligations hereunder without the prior written consent of the other Party, which shall not be unreasonably withheld.", y);
  y += 2;

  // ── SECTION 12 – FORCE MAJEURE ──────────────────────────────────────────
  y = heading(doc, "12. FORCE MAJEURE", y);
  y = body(doc, `12.1  Neither Party shall be liable for failure or delay in performance due to causes beyond reasonable control ("Force Majeure").`, y);
  y = body(doc, "12.2  Force Majeure events include, but are not limited to:", y);
  y = bullet(doc, "Acts of God", y);
  y = bullet(doc, "Epidemics or pandemics", y);
  y = bullet(doc, "Government orders or restrictions", y);
  y = bullet(doc, "Fire, explosion, or natural disasters", y);
  y = bullet(doc, "Labor disputes or supply shortages", y);
  y = bullet(doc, "Civil unrest or acts of war", y);
  y = body(doc, "12.3  The affected Party shall promptly notify the other Party and shall use reasonable efforts to resume performance as soon as practicable.", y);
  y += 2;

  // ── SECTION 13 – ARBITRATION ────────────────────────────────────────────
  y = heading(doc, "13. ARBITRATION", y);
  y = body(doc, "13.1  Any dispute arising out of or relating to this Agreement shall be resolved through binding arbitration conducted under the Commercial Arbitration Rules of the American Arbitration Association.", y);
  y = body(doc, "13.2  The arbitrator(s) shall be knowledgeable in matters relating to this Agreement.", y);
  y = body(doc, `13.3  The arbitration shall take place at ${values.arbitrationLocation || "a mutually agreed location"}.`, y);
  y = body(doc, "13.4  The arbitrator shall have no authority to modify this Agreement or award punitive damages.", y);
  y = body(doc, "13.5  The arbitrator's decision shall be final and binding and may be enforced in any court of competent jurisdiction.", y);
  y += 2;

  // ── SECTION 14 – COURTESY AND COOPERATION ───────────────────────────────
  y = heading(doc, "14. COURTESY AND COOPERATION", y);
  y = body(doc, "The Parties acknowledge that cooperation, punctuality, and coordination are essential to successful performance. Both Parties agree to act in good faith to facilitate completion of the Services.", y);
  y += 2;

  // ── SECTION 15 – INDEMNIFICATION ────────────────────────────────────────
  y = heading(doc, "15. INDEMNIFICATION", y);
  y = body(doc, "The Provider agrees to indemnify, defend, and hold harmless the Recipient from any and all claims, damages, losses, liabilities, costs, or expenses (including reasonable attorney's fees) arising from the acts or omissions of the Provider or its employees, agents, or subcontractors.", y);
  y += 2;

  // ── SECTION 16 – WARRANTY ───────────────────────────────────────────────
  y = heading(doc, "16. WARRANTY", y);
  y = body(doc, "The Provider warrants that all Services shall be performed in a professional, timely, and workmanlike manner consistent with industry standards and best practices.", y);
  y += 2;

  // ── SECTION 17 – DEFAULT ────────────────────────────────────────────────
  y = heading(doc, "17. DEFAULT", y);
  y = body(doc, "The following shall constitute a material default:", y);
  y = bullet(doc, "Failure to make payment when due", y);
  y = bullet(doc, "Insolvency or bankruptcy of either Party", y);
  y = bullet(doc, "Seizure or attachment of property", y);
  y = bullet(doc, "Failure to perform Services as required", y);
  y += 2;

  // ── SECTION 18 – REMEDIES ───────────────────────────────────────────────
  y = heading(doc, "18. REMEDIES", y);
  y = body(doc, `Upon default, the non-defaulting Party may provide written notice of breach. The defaulting Party shall have ${values.cureDays || "____"} days to cure such breach. Failure to cure shall result in automatic termination and entitlement to all available legal remedies.`, y);
  y += 2;

  // ── SECTION 19 – TERM ───────────────────────────────────────────────────
  y = heading(doc, "19. TERM", y);
  y = body(doc, `This Agreement shall commence on ${values.effectiveDate || "the Effective Date"} and shall terminate on ${values.termEndDate || "___________"}, unless earlier terminated pursuant to this Agreement.`, y);
  y += 2;

  // ── SECTION 20 – TERMINATION ────────────────────────────────────────────
  y = heading(doc, "20. TERMINATION", y);
  y = body(doc, `Either Party may terminate this Agreement upon ${values.terminationNoticeDays || "____"} days' written notice. Upon termination, the Provider shall be entitled to pro-rata payment for Services performed.`, y);
  y += 2;

  // ── SECTION 21 – OWNERSHIP OF WORK PRODUCT ─────────────────────────────
  y = heading(doc, "21. OWNERSHIP OF WORK PRODUCT", y);
  y = body(doc, "All video footage, edits, and creative materials produced under this Agreement shall remain the exclusive intellectual property of the Provider unless otherwise agreed in writing.", y);
  y += 2;

  // ── SECTION 22 – SOCIAL MEDIA OWNERSHIP ────────────────────────────────
  y = heading(doc, "22. SOCIAL MEDIA OWNERSHIP", y);
  y = body(doc, "Any social media contacts, accounts, or audience relationships developed in connection with the Services shall remain the property of the Provider.", y);
  y += 2;

  // ── SECTION 23 – INDEPENDENT CONTRACTOR ────────────────────────────────
  y = heading(doc, "23. INDEPENDENT CONTRACTOR", y);
  y = body(doc, "The Provider is an independent contractor and not an employee, partner, or agent of the Recipient.", y);
  y += 2;

  // ── SECTION 24 – CONFIDENTIALITY ────────────────────────────────────────
  y = heading(doc, "24. CONFIDENTIALITY", y);
  y = body(doc, "The Provider shall maintain the confidentiality of all non-public information obtained during performance of the Services. This obligation shall survive termination of this Agreement.", y);
  y += 2;

  // ── SECTION 25 – SIGNATURES ─────────────────────────────────────────────
  // Ensure signatures start with at least 55 mm of space remaining
  if (y > PAGE_H - MARGIN_BTM - 55) y = newPage(doc);

  y = rule(doc, y);
  y = heading(doc, "25. SIGNATURES", y);
  y = body(doc, "IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", y);
  y += 6;

  // Recipient signature block
  doc.setFont("helvetica", "bold");
  doc.text("RECIPIENT", MARGIN_LEFT, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.recipientName      || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Signature: ${values.recipientSignature || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Date:      ${values.recipientSignDate  || new Date().toLocaleDateString()}`,  MARGIN_LEFT, y);
  y += 10;

  // Provider signature block
  doc.setFont("helvetica", "bold");
  doc.text("PROVIDER", MARGIN_LEFT, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Name:      ${values.providerName      || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Signature: ${values.providerSignature || "______________________________"}`, MARGIN_LEFT, y); y += 6;
  doc.text(`Date:      ${values.providerSignDate  || new Date().toLocaleDateString()}`,  MARGIN_LEFT, y);
  y += 10;

  // Confirmation note
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.text(
    `Both parties confirmation: ${values.finalConfirmation === "yes" ? "Confirmed — both parties have reviewed all terms." : "Not yet confirmed."}`,
    MARGIN_LEFT, y
  );

  doc.save("videography_services_agreement.pdf");
};

export default function VideographyServicesAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Videography Services Agreement"
      subtitle="Complete 6 steps to generate your document"
      onGenerate={generatePDF}
      documentType="videography-services-agreement"
    />
  );
}