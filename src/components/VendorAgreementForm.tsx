import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date & Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "organizerName", label: "Organizer name", type: "text", required: true },
      { name: "organizerAddress", label: "Organizer address", type: "text", required: true },
      { name: "vendorName", label: "Vendor name", type: "text", required: true },
      { name: "vendorAddress", label: "Vendor address", type: "text", required: true },
    ],
  },
  {
    label: "Building, Event & Space",
    fields: [
      { name: "buildingName", label: "Building / premises name (clause 1 WHEREAS)", type: "text", required: false },
      { name: "buildingAddress", label: "Building address (clause 1 WHEREAS)", type: "text", required: false },
      { name: "eventName", label: "Event name (clause 1 WHEREAS)", type: "text", required: false },
      { name: "vendorBusiness", label: "Vendor's business description (clause 1 WHEREAS)", type: "text", required: false },
      { name: "minSquareFeet", label: "Minimum square feet of space (clause 2.3)", type: "text", required: false },
    ],
  },
  {
    label: "Event Dates & Hours",
    fields: [
      { name: "eventStartDate", label: "Event start date (clause 3.1)", type: "date", required: false },
      { name: "eventEndDate", label: "Event end date (clause 3.1)", type: "date", required: false },
      { name: "hoursOpen", label: "Opening time to public (clause 3.2)", type: "text", required: false },
      { name: "hoursClose", label: "Closing time to public (clause 3.2)", type: "text", required: false },
    ],
  },
  {
    label: "Installation & Tear-Down",
    fields: [
      { name: "installDate", label: "Installation date (clause 4.1)", type: "date", required: false },
      { name: "installHours", label: "Installation hours (clause 4.1)", type: "text", required: false },
      { name: "tearDownDeadline", label: "Tear-down deadline time (clause 4.2)", type: "text", required: false },
      { name: "tearDownDate", label: "Tear-down deadline date (clause 4.2)", type: "date", required: false },
    ],
  },
  {
    label: "Payment Terms",
    fields: [
      { name: "spaceFee", label: "Space fee amount $ (clause 5.1)", type: "text", required: false },
      { name: "grossReceiptsPercent", label: "Percentage of gross daily receipts (clause 5.2)", type: "text", required: false },
      { name: "defaultCureDays", label: "Days to cure default (clause 14.2)", type: "text", required: false },
    ],
  },
  {
    label: "Governing Law",
    fields: [
      { name: "governingState", label: "Governing state (clause 17)", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "organizerSignName", label: "Organizer — Name", type: "text", required: false },
      { name: "organizerSignDate", label: "Organizer — Date", type: "date", required: false },
      { name: "vendorSignName", label: "Vendor — Name", type: "text", required: false },
      { name: "vendorSignDate", label: "Vendor — Date", type: "date", required: false },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = 210, m = 18, tw = w - m * 2, lh = 5.6, limit = 280;
  let y = 20;

  const u = (v?: string, n = 18) => (v || "").trim() || "_".repeat(n);

  const checkBreak = (needed = lh) => { if (y + needed > limit) { doc.addPage(); y = 20; } };

  const p = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, tw);
    checkBreak(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const heading = (text: string) => {
    y += 1;
    checkBreak(lh + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(text, m, y);
    y += lh + 3;
    doc.setFontSize(10.5);
  };

  const sub = (num: string, text: string) => {
    const full = `${num}  ${text}`;
    const lines = doc.splitTextToSize(full, tw);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m, y);
    y += lines.length * lh + 2;
  };

  const bullet = (text: string) => {
    const lines = doc.splitTextToSize("\u2022  " + text, tw - 6);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m + 6, y);
    y += lines.length * lh + 2;
  };

  const lettered = (letter: string, text: string) => {
    const full = `${letter}) ${text}`;
    const lines = doc.splitTextToSize(full, tw - 5);
    checkBreak(lines.length * lh + 2);
    doc.setFont("helvetica", "normal");
    doc.text(lines, m + 4, y);
    y += lines.length * lh + 2;
  };

  const sigLine = (label: string, val?: string, minChars = 26, gap = 2.5) => {
    const shown = (val || "").trim();
    const labelText = `${label}: `;
    checkBreak(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.text(labelText, m, y);
    const x = m + doc.getTextWidth(labelText);
    const lineEnd = shown ? x + Math.max(10, doc.getTextWidth(shown)) : x + doc.getTextWidth("_".repeat(minChars));
    if (shown) doc.text(shown, x, y);
    doc.setLineWidth(0.22);
    doc.line(x, y + 1.1, lineEnd, y + 1.1);
    y += lh + gap;
  };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "VENDOR AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(w / 2 - tW / 2, y + 1.3, w / 2 + tW / 2, y + 1.3);
  y += 10;
  doc.setFontSize(10.5);

  // ── PREAMBLE ────────────────────────────────────────────────────────────
  p(`This Vendor Agreement ("Agreement") is made and entered into as of ${u(values.effectiveDate, 12)} ("Effective Date"), by and between:`);
  y += 1;
  p("Organizer:");
  sigLine("Name", values.organizerName, 26);
  sigLine("Address", values.organizerAddress, 26);
  y += 1;
  p("and");
  y += 1;
  p("Vendor:");
  sigLine("Name", values.vendorName, 26);
  sigLine("Address", values.vendorAddress, 26);
  p('(collectively referred to as the "Parties").');
  y += 2;

  // ── 1. RECITALS ─────────────────────────────────────────────────────────
  heading("1. RECITALS");
  p(`WHEREAS, the Organizer is the owner, operator, or authorized manager of the premises known as ${u(values.buildingName, 20)} located at ${u(values.buildingAddress, 20)} (the "Building"), in which an event known as ${u(values.eventName, 16)} (the "Event") shall be conducted; and`);
  p(`WHEREAS, the Vendor is engaged in the business of ${u(values.vendorBusiness, 18)} and desires to participate in the Event as a vendor; and`);
  p("WHEREAS, the Organizer desires to permit the Vendor to occupy designated space within the Building for the purpose of conducting its business during the Event, subject to the terms and conditions set forth herein.");
  p("NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows:");

  // ── 2. PURPOSE AND GRANT OF SPACE ───────────────────────────────────────
  heading("2. PURPOSE AND GRANT OF SPACE");
  sub("2.1", "The Organizer hereby grants to the Vendor a limited, non-exclusive license to occupy a designated area (\u201cSpace\u201d) within the Building for the purpose of conducting vendor operations during the Event.");
  sub("2.2", "The Vendor acknowledges that the specific location and dimensions of the Space shall be determined solely by the Organizer and communicated prior to the Event.");
  sub("2.3", `The Vendor shall be entitled to a minimum of ${u(values.minSquareFeet, 6)} square feet of space, unless otherwise agreed in writing.`);
  sub("2.4", "The Vendor\u2019s right of occupancy is strictly limited to the duration of the Event and does not create a lease or tenancy of any kind.");

  // ── 3. EVENT DATES AND HOURS OF OPERATION ──────────────────────────────
  heading("3. EVENT DATES AND HOURS OF OPERATION");
  sub("3.1", `The Event shall take place from ${u(values.eventStartDate, 12)} to ${u(values.eventEndDate, 12)}.`);
  sub("3.2", `The Event shall be open to the public during the hours of ${u(values.hoursOpen, 8)} to ${u(values.hoursClose, 8)}, unless modified by the Organizer.`);
  sub("3.3", "The Vendor agrees to remain open and operational during all designated Event hours unless otherwise approved in writing by the Organizer.");

  // ── 4. INSTALLATION AND TEAR-DOWN ──────────────────────────────────────
  heading("4. INSTALLATION AND TEAR-DOWN");
  sub("4.1", `The Vendor shall be permitted to install its display and merchandise on ${u(values.installDate, 12)} between ${u(values.installHours, 12)}.`);
  sub("4.2", `The Vendor shall completely remove all equipment, merchandise, displays, and debris no later than ${u(values.tearDownDeadline, 8)} on ${u(values.tearDownDate, 12)}.`);
  sub("4.3", "Failure to remove materials within the allotted time may result in removal by the Organizer at the Vendor\u2019s sole expense.");

  // ── 5. PAYMENT TERMS ───────────────────────────────────────────────────
  heading("5. PAYMENT TERMS");
  sub("5.1", `The Vendor agrees to pay the Organizer a fee of $${u(values.spaceFee, 10)} for use of the Space, payable in full upon execution of this Agreement.`);
  sub("5.2", `In addition, the Vendor agrees to remit ${u(values.grossReceiptsPercent, 4)}% of gross daily receipts, plus any applicable taxes.`);
  sub("5.3", "\u201cGross daily receipts\u201d shall include all sales made during the Event, whether by cash, credit card, electronic transfer, or any other method.");
  sub("5.4", "Failure to make timely payment shall constitute a material breach of this Agreement.");

  // ── 6. APPEARANCE AND MAINTENANCE ──────────────────────────────────────
  heading("6. APPEARANCE AND MAINTENANCE");
  sub("6.1", "The Vendor shall maintain the Space in a clean, orderly, and professional manner at all times.");
  sub("6.2", "The Vendor shall remove all trash, packaging, and debris generated by its operations.");
  sub("6.3", "The Organizer reserves the right to assess additional cleaning or maintenance charges for failure to comply with this section.");

  // ── 7. DISPLAYS AND SIGNAGE ────────────────────────────────────────────
  heading("7. DISPLAYS AND SIGNAGE");
  sub("7.1", "All displays must be free-standing.");
  sub("7.2", "No signage, materials, or decorations may be affixed to walls, ceilings, columns, or other Building structures.");
  sub("7.3", "Displays shall not obstruct aisles, exits, or the view of neighboring vendors.");

  // ── 8. PRODUCTS AND QUALITY CONTROL ────────────────────────────────────
  heading("8. PRODUCTS AND QUALITY CONTROL");
  sub("8.1", "The Vendor represents and warrants that all products sold comply with all applicable laws, safety standards, and regulations.");
  sub("8.2", "The Organizer reserves the right to remove any product deemed unsafe, illegal, or inconsistent with the nature of the Event.");

  // ── 9. STAFFING ────────────────────────────────────────────────────────
  heading("9. STAFFING");
  sub("9.1", "The Vendor shall provide, at its sole cost, sufficient and qualified personnel to operate its booth during Event hours.");
  sub("9.2", "All personnel shall behave in a professional and courteous manner.");

  // ── 10. FOOD AND BEVERAGE RESTRICTIONS ─────────────────────────────────
  heading("10. FOOD AND BEVERAGE RESTRICTIONS");
  sub("10.1", "The Vendor shall not bring food or beverages into the Building unless expressly authorized in writing.");
  sub("10.2", "All food and beverages must be purchased through approved Event vendors or facilities.");

  // ── 11. INSURANCE ──────────────────────────────────────────────────────
  heading("11. INSURANCE");
  sub("11.1", "The Vendor is solely responsible for obtaining insurance coverage for its property, inventory, equipment, and personnel.");
  sub("11.2", "The Organizer assumes no responsibility for loss, theft, or damage to the Vendor\u2019s property.");

  // ── 12. INDEMNIFICATION ────────────────────────────────────────────────
  heading("12. INDEMNIFICATION");
  p("The Vendor agrees to indemnify, defend, and hold harmless the Organizer, its officers, employees, and agents from any and all claims, damages, losses, liabilities, costs, and expenses (including attorneys\u2019 fees) arising out of or related to:");
  bullet("The Vendor\u2019s operations");
  bullet("Acts or omissions of the Vendor or its employees");
  bullet("Injury to persons or damage to property");
  bullet("Violation of laws or Event rules");

  // ── 13. DEFAULT ────────────────────────────────────────────────────────
  heading("13. DEFAULT");
  p("The following shall constitute a material default:");
  lettered("a", "Failure to make required payments");
  lettered("b", "Insolvency or bankruptcy");
  lettered("c", "Seizure or levy upon property");
  lettered("d", "Failure to comply with this Agreement");

  // ── 14. REMEDIES ───────────────────────────────────────────────────────
  heading("14. REMEDIES");
  sub("14.1", "Upon default, the non-defaulting Party may terminate this Agreement by written notice.");
  sub("14.2", `The defaulting Party shall have ${u(values.defaultCureDays, 4)} days to cure the default.`);
  sub("14.3", "Failure to cure shall result in immediate termination and forfeiture of fees paid.");

  // ── 15. FORCE MAJEURE ──────────────────────────────────────────────────
  heading("15. FORCE MAJEURE");
  p("Neither Party shall be liable for failure or delay in performance due to events beyond reasonable control, including acts of God, fire, flood, epidemic, government action, labor disputes, or civil unrest.");

  // ── 16. DISPUTE RESOLUTION ────────────────────────────────────────────
  heading("16. DISPUTE RESOLUTION");
  p("Any dispute arising under this Agreement shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association. The arbitrator\u2019s decision shall be final and enforceable in any court of competent jurisdiction.");

  // ── 17. GOVERNING LAW ─────────────────────────────────────────────────
  heading("17. GOVERNING LAW");
  p(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${u(values.governingState, 14)}.`);

  // ── 18. ENTIRE AGREEMENT ──────────────────────────────────────────────
  heading("18. ENTIRE AGREEMENT");
  p("This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements or representations.");

  // ── 19. SEVERABILITY ──────────────────────────────────────────────────
  heading("19. SEVERABILITY");
  p("If any provision is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.");

  // ── 20. AMENDMENT ─────────────────────────────────────────────────────
  heading("20. AMENDMENT");
  p("This Agreement may be amended only by a written document signed by both Parties.");

  // ── 21. ASSIGNMENT ────────────────────────────────────────────────────
  heading("21. ASSIGNMENT");
  p("Neither Party may assign or transfer this Agreement without the prior written consent of the other Party.");

  // ── 22. WAIVER ────────────────────────────────────────────────────────
  heading("22. WAIVER");
  p("Failure to enforce any provision shall not constitute a waiver of future enforcement.");

  // ── 23. NOTICES ───────────────────────────────────────────────────────
  heading("23. NOTICES");
  p("All notices shall be delivered personally or by certified mail to the addresses listed above or as later designated in writing.");

  // ── 24. SIGNATURES ────────────────────────────────────────────────────
  heading("24. SIGNATURES");
  p("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.");
  y += 4;

  p("ORGANIZER", true, 1);
  sigLine("Name", values.organizerSignName, 28);
  sigLine("Signature", "", 28);
  sigLine("Date", values.organizerSignDate, 20);
  y += 4;

  checkBreak(35);
  p("VENDOR", true, 1);
  sigLine("Name", values.vendorSignName, 28);
  sigLine("Signature", "", 28);
  sigLine("Date", values.vendorSignDate, 20);

  doc.save("vendor_agreement.pdf");
};

export default function VendorAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Vendor Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="vendoragreement"
    />
  );
}