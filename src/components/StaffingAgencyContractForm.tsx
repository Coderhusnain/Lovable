import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Which country's laws will govern this document?",
        type: "select",
        required: true,
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
          { value: "au", label: "Australia" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    label: "State/Province",
    fields: [
      {
        name: "state",
        label: "Which state or province?",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => {
          if (values.country === "us") {
            return [
              { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" },
              { value: "AZ", label: "Arizona" }, { value: "AR", label: "Arkansas" },
              { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
              { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" },
              { value: "FL", label: "Florida" }, { value: "GA", label: "Georgia" },
              { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
              { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" },
              { value: "IA", label: "Iowa" }, { value: "KS", label: "Kansas" },
              { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
              { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" },
              { value: "MA", label: "Massachusetts" }, { value: "MI", label: "Michigan" },
              { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
              { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" },
              { value: "NE", label: "Nebraska" }, { value: "NV", label: "Nevada" },
              { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
              { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" },
              { value: "NC", label: "North Carolina" }, { value: "ND", label: "North Dakota" },
              { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
              { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" },
              { value: "RI", label: "Rhode Island" }, { value: "SC", label: "South Carolina" },
              { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
              { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" },
              { value: "VT", label: "Vermont" }, { value: "VA", label: "Virginia" },
              { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
              { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
              { value: "DC", label: "District of Columbia" },
            ];
          } else if (values.country === "ca") {
            return [
              { value: "AB", label: "Alberta" }, { value: "BC", label: "British Columbia" },
              { value: "MB", label: "Manitoba" }, { value: "NB", label: "New Brunswick" },
              { value: "NL", label: "Newfoundland and Labrador" }, { value: "NS", label: "Nova Scotia" },
              { value: "ON", label: "Ontario" }, { value: "PE", label: "Prince Edward Island" },
              { value: "QC", label: "Quebec" }, { value: "SK", label: "Saskatchewan" },
              { value: "NT", label: "Northwest Territories" }, { value: "NU", label: "Nunavut" },
              { value: "YT", label: "Yukon" },
            ];
          } else if (values.country === "uk") {
            return [
              { value: "ENG", label: "England" }, { value: "SCT", label: "Scotland" },
              { value: "WLS", label: "Wales" }, { value: "NIR", label: "Northern Ireland" },
            ];
          } else if (values.country === "au") {
            return [
              { value: "NSW", label: "New South Wales" }, { value: "VIC", label: "Victoria" },
              { value: "QLD", label: "Queensland" }, { value: "WA", label: "Western Australia" },
              { value: "SA", label: "South Australia" }, { value: "TAS", label: "Tasmania" },
              { value: "ACT", label: "Australian Capital Territory" }, { value: "NT", label: "Northern Territory" },
            ];
          }
          return [{ value: "other", label: "Other Region" }];
        },
      },
    ],
  },
  {
    label: "Agreement Date",
    fields: [
      { name: "effectiveDate", label: "What is the effective date of this agreement?", type: "date", required: true },
    ],
  },
  {
    label: "Recipient Details",
    fields: [
      { name: "party1Name", label: "Recipient full legal name", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
      { name: "party1Email", label: "Email Address", type: "email", required: false, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Service Provider Details",
    fields: [
      { name: "party2Name", label: "Service Provider full legal name", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
      { name: "party2Email", label: "Email Address", type: "email", required: false, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "tel", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Services",
    fields: [
      { name: "description", label: "Describe the position / skills / services required", type: "textarea", required: true, placeholder: "Describe the position, required skills, and educational background..." },
    ],
  },
  {
    label: "Payment Terms",
    fields: [
      { name: "tempStaffFee", label: "Temporary staff fee ($ per staff)", type: "text", required: false, placeholder: "$0.00" },
      { name: "transferFee", label: "Transfer fee if temp becomes permanent ($)", type: "text", required: false, placeholder: "$0.00" },
      { name: "permStaffFee", label: "Permanent staff placement fee ($)", type: "text", required: false, placeholder: "$0.00" },
      { name: "paymentDays", label: "Payment due within (business days of invoice)", type: "text", required: true, placeholder: "30" },
      {
        name: "paymentSchedule", label: "Invoice schedule", type: "select", required: false,
        options: [
          { value: "monthly", label: "Monthly" }, { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" }, { value: "milestone", label: "Milestone-based" },
        ],
      },
    ],
  },
  {
    label: "Terms & Conditions",
    fields: [
      {
        name: "duration", label: "Duration of this agreement", type: "select", required: true,
        options: [
          { value: "1month", label: "1 Month" }, { value: "3months", label: "3 Months" },
          { value: "6months", label: "6 Months" }, { value: "1year", label: "1 Year" },
          { value: "2years", label: "2 Years" }, { value: "5years", label: "5 Years" },
          { value: "indefinite", label: "Until completion of services" }, { value: "custom", label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice", label: "Termination notice period", type: "select", required: true,
        options: [
          { value: "immediate", label: "Immediate" }, { value: "7days", label: "7 Days" },
          { value: "14days", label: "14 Days" }, { value: "30days", label: "30 Days" },
          { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" },
        ],
      },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      {
        name: "confidentiality", label: "Include confidentiality clause?", type: "select", required: true,
        options: [
          { value: "yes", label: "Yes - Include confidentiality provisions" },
          { value: "no", label: "No - Not needed" },
        ],
      },
      {
        name: "disputeResolution", label: "How should disputes be resolved?", type: "select", required: true,
        options: [
          { value: "mediation", label: "Mediation" }, { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation", label: "Court Litigation" }, { value: "negotiation", label: "Good Faith Negotiation First" },
        ],
      },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      { name: "additionalTerms", label: "Any additional terms or special conditions?", type: "textarea", required: false, placeholder: "Enter any additional terms, conditions, or special provisions..." },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      { name: "party1Signature", label: "Recipient Signature (type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party1SignDate", label: "Recipient sign date", type: "text", required: false },
      { name: "party2Signature", label: "Service Provider Signature (type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2SignDate", label: "Service Provider sign date", type: "text", required: false },
      { name: "witnessName", label: "Witness Name (Optional)", type: "text", required: false },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const u = (val?: string, fallback = "____________________") =>
  val && val.trim() ? val.trim() : fallback;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW  = 210;
  const margin = 18;
  const textW  = pageW - margin * 2;
  const lineH  = 5.5;
  const pageLimit = 278;
  let y = 20;

  // ── Layout helpers ──────────────────────────────────────────────────

  const checkY = (needed: number) => {
    if (y + needed > pageLimit) { doc.addPage(); y = 20; }
  };

  // Plain body paragraph — normal or bold, optional indent
  const p = (text: string, bold = false, indent = 0, gapAfter = 2.8) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + gapAfter);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + gapAfter;
  };

  // Bold ALL-CAPS numbered section heading  e.g. "1.  DESCRIPTION OF SERVICES"
  const heading = (text: string) => {
    checkY(lineH + 7);
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10.5);
  };

  // Bullet item with bold label prefix  e.g. "• Temporary Staff: $..."
  const bulletBold = (label: string, body: string, indent = 6) => {
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "bold");
    const prefix = `${label}: `;
    const prefixW = doc.getTextWidth(prefix);
    const bodyLines = doc.splitTextToSize(body, textW - indent - prefixW);
    const totalLines = doc.splitTextToSize(prefix + body, textW - indent);
    checkY(totalLines.length * lineH + 2.5);
    doc.setFont("helvetica", "normal");
    doc.text("\u2022", margin + 1.5, y);
    doc.setFont("helvetica", "bold");
    doc.text(prefix, margin + indent, y);
    doc.setFont("helvetica", "normal");
    if (bodyLines[0]) doc.text(bodyLines[0], margin + indent + prefixW, y);
    y += lineH;
    for (let i = 1; i < bodyLines.length; i++) {
      checkY(lineH + 1);
      doc.text(bodyLines[i], margin + indent, y);
      y += lineH;
    }
    y += 2.5;
  };

  // Plain bullet item
  const bullet = (text: string, indent = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + 2.2);
    doc.text("\u2022", margin + 1.5, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 2.2;
  };

  // Signature field row with measured underline
  const field = (label: string, value: string, lineLen = 65) => {
    checkY(lineH + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lbl = `${label}: `;
    doc.text(lbl, margin, y);
    const lblW = doc.getTextWidth(lbl);
    doc.setFont("helvetica", "normal");
    const val = value.trim();
    if (val) {
      doc.text(val, margin + lblW, y);
      doc.line(margin + lblW, y + 1.3, margin + lblW + Math.max(lineLen, doc.getTextWidth(val) + 2), y + 1.3);
    } else {
      doc.line(margin + lblW, y + 1.3, margin + lblW + lineLen, y + 1.3);
    }
    y += lineH + 2.8;
  };

  // ── TITLE ────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const title = "STAFFING AGENCY CONTRACT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const halfTW = doc.getTextWidth(title) / 2;
  doc.line(pageW / 2 - halfTW, y + 1.5, pageW / 2 + halfTW, y + 1.5);
  y += 11;
  doc.setFontSize(10.5);

  // ── PREAMBLE ─────────────────────────────────────────────────────────
  const recipientAddr = [values.party1City, values.party1Zip].filter(Boolean).join(", ");
  const providerAddr  = [values.party2City, values.party2Zip].filter(Boolean).join(", ");

  p(
    `This Staffing Agency Contract ("Contract") is made effective as of ${u(values.effectiveDate, "___")}, by and between ${u(values.party1Name, "___")} of ${u(values.party1Street, "___")}${recipientAddr ? ", " + recipientAddr : ""} ("Recipient"), and ${u(values.party2Name, "___")} of ${u(values.party2Street, "___")}${providerAddr ? ", " + providerAddr : ""} ("Service Provider").`
  );

  // ── 1. DESCRIPTION OF SERVICES ───────────────────────────────────────
  heading("1.  DESCRIPTION OF SERVICES");

  p(
    `Beginning on ${u(values.effectiveDate, "___")} ("Effective Date"), the Service Provider will submit to the Recipient the names and resumes of qualified candidates ("Candidates") for the position with the skills and educational background described as follows (collectively, the "Services"):`
  );
  p(u(values.description, "[Description of position, skills, and educational background required]"), false, 4, 3);

  // ── 2. PAYMENT FOR SERVICES ──────────────────────────────────────────
  heading("2.  PAYMENT FOR SERVICES");

  p(
    `For Services provided by the Service Provider under this Contract, the Service Provider shall be compensated as follows:`
  );

  bulletBold("Temporary Staff", `$${u(values.tempStaffFee, "___")} per staff for the period of service`);
  bulletBold("Transfer Fee", `$${u(values.transferFee, "___")} shall be paid if a temporary employee is taken on a permanent basis`);
  bulletBold("Permanent Staff", `$${u(values.permStaffFee, "___")} shall be paid for the appointment of each permanent staff member`);

  y += 1;
  p(
    `Invoices will be submitted to the Recipient by the Service Provider on a ${values.paymentSchedule === "weekly" ? "weekly" : values.paymentSchedule === "biweekly" ? "bi-weekly" : "monthly"} basis, with payment to the Service Provider to be made within ${u(values.paymentDays, "___")} business days of receipt of a valid invoice.`
  );

  // ── 3. SERVICE PROVIDER'S REPRESENTATION ─────────────────────────────
  heading("3.  SERVICE PROVIDER'S REPRESENTATION");

  p(
    `The Service Provider represents and warrants that the Service Provider and its supplied workers have the right to perform the Services under and pursuant to this Contract without violation of obligations to others, and that the Service Provider and its supplied workers have the right to disclose to the Recipient all information transmitted to the Recipient in the performance of the Services under and pursuant to this Contract. The Service Provider agrees that any information submitted to the Recipient shall be truthful, accurate, and complete.`
  );

  // ── 4. INJURIES ──────────────────────────────────────────────────────
  heading("4.  INJURIES");

  p(
    `The Service Provider acknowledges the Service Provider's obligation to obtain appropriate insurance coverage for the benefit of the Service Provider (and the Service Provider's employees, if any). The Service Provider waives any rights to recovery from the Recipient for any injuries that the Service Provider (and/or the Service Provider's employees) may sustain while performing Services under this Contract and that are a result of the negligence of the Service Provider or the Service Provider's employees.`
  );

  // ── 5. INDEMNIFICATION ───────────────────────────────────────────────
  heading("5.  INDEMNIFICATION");

  p(
    `The Service Provider agrees to indemnify and hold harmless the Recipient from all claims, losses, expenses, fees, including attorney fees, costs, and judgments that may be asserted against the Recipient that result from the acts or omissions of the Service Provider, the Service Provider's employees, if any, and the Service Provider's agents.`
  );

  // ── 6. LIMITATION OF LIABILITY ───────────────────────────────────────
  heading("6.  LIMITATION OF LIABILITY");

  p(
    `Under no circumstance shall either party be liable to the other party or any third party for indirect, incidental, consequential, special or exemplary damages (even if that party has been advised of the possibility of such damages), arising from any provision of this Contract such as, but not limited to, loss of revenue or anticipated profit or lost business, cost of delay or failure of delivery, or liabilities to third parties arising from any source.`
  );

  // ── 7. ATTORNEYS' FEES ───────────────────────────────────────────────
  heading("7.  ATTORNEYS' FEES");

  p(
    `If a legal suit, action, or proceeding, including arbitration, is brought by any party to enforce or to interpret any provision of this Contract, the prevailing party will be entitled to recover, in addition to any other damages awarded, all costs associated with conducting the suit, action, proceeding, or arbitration and reasonable attorneys' fees.`
  );

  // ── 8. ENTIRE CONTRACT ───────────────────────────────────────────────
  heading("8.  ENTIRE CONTRACT");

  p(
    `This Contract contains the entire agreement of the parties with respect to the subject matter contained herein. No other promises, warranties, representations, agreements, or understandings, whether oral or written, exist concerning this subject matter. This Contract supersedes any previous or simultaneous oral or written promises, warranties, representations, agreements, or conditions between the parties.`
  );

  // ── 9. SEVERABILITY ──────────────────────────────────────────────────
  heading("9.  SEVERABILITY");

  p(
    `If any provision of this Contract shall be held to be invalid or unenforceable for any reason, the remaining provisions shall continue to be valid and enforceable. If a court finds that any provision of this Contract is invalid or unenforceable, but that by limiting such provision it would become valid and enforceable, then such provision shall be deemed to be written, construed, and enforced as so limited.`
  );

  // ── 10. AMENDMENT ────────────────────────────────────────────────────
  heading("10.  AMENDMENT");

  p(
    `This Contract may be modified, amended, or supplemented only if the changes are made in writing and signed by all parties.`
  );

  // ── 11. WAIVER ───────────────────────────────────────────────────────
  heading("11.  WAIVER");

  p(
    `The failure of either party to enforce any provision of this Contract shall not be construed as a waiver or limitation of that party's right to subsequently enforce and compel strict compliance with every provision of this Contract.`
  );

  // ── 12. APPLICABLE LAW ───────────────────────────────────────────────
  heading("12.  APPLICABLE LAW");

  const govLaw = values.state
    ? `${values.state}${values.country ? ", " + values.country.toUpperCase() : ""}`
    : u(values.country, "[Governing Jurisdiction]");
  p(`This Contract shall be governed by the laws of ${govLaw}.`);

  // ── 13. TERM ─────────────────────────────────────────────────────────
  heading("13.  TERM");

  const durationMap: Record<string, string> = {
    "1month": "one (1) month", "3months": "three (3) months", "6months": "six (6) months",
    "1year": "one (1) year", "2years": "two (2) years", "5years": "five (5) years",
    "indefinite": "until completion of the Services", "custom": "the agreed custom duration",
  };
  const durationText = durationMap[values.duration] || "the agreed term";

  p(
    `This Contract will begin on the Effective Date and shall remain in effect for ${durationText} ("Termination Date"), unless terminated earlier as outlined in the Termination section below. Either party may alter the Termination Date by mutual written consent.`
  );

  // ── 14. TERMINATION ──────────────────────────────────────────────────
  heading("14.  TERMINATION");

  const noticeMap: Record<string, string> = {
    "immediate": "immediate", "7days": "seven (7)", "14days": "fourteen (14)",
    "30days": "thirty (30)", "60days": "sixty (60)", "90days": "ninety (90)",
  };
  const noticeDays = noticeMap[values.terminationNotice] || "thirty (30)";

  p(
    `Either party may end this Contract prior to the Termination Date, with or without cause, upon ${noticeDays} days' written notice to the other party ("Early Termination"). Upon Early Termination, the Provider shall receive a pro-rated payment for the Services rendered prior to the Early Termination Date.`
  );

  // ── 15. RELATIONSHIP OF PARTIES ──────────────────────────────────────
  heading("15.  RELATIONSHIP OF PARTIES");

  p(
    `The Service Provider is an independent contractor with respect to its relationship to the Recipient. Neither the Service Provider nor the Service Provider's employees is or shall be deemed for any purpose to be employees of the Recipient. The Recipient shall not be responsible to the Service Provider or the Service Provider's employees, or any governing body for any payroll taxes related to the performance of the Services. Upon request, the Service Provider will provide evidence of appropriate insurance coverage for workers' compensation and general liability insurance.`
  );

  // ── 16. ALTERNATIVE DISPUTE RESOLUTION ───────────────────────────────
  heading("16.  ALTERNATIVE DISPUTE RESOLUTION");

  p(
    `The parties will attempt to resolve any dispute arising out of or relating to this Contract through friendly negotiations among the parties. If the matter is not resolved by negotiation, the parties will resolve the dispute using the following Alternative Dispute Resolution ("ADR") procedure.`
  );

  const drMap: Record<string, string> = {
    mediation: `If any controversies, claims, or disputes arising out of or relating to this Contract cannot be resolved through negotiation, the parties agree to try in good faith to settle the dispute by mediation in accordance with any statutory rules of mediation.`,
    arbitration: `If any controversies, claims, or disputes arising out of or relating to this Contract cannot be resolved through negotiation, the parties agree to submit the matter to binding arbitration under applicable AAA rules, and the arbitrator's decision shall be final and enforceable.`,
    litigation: `If any controversies, claims, or disputes arising out of or relating to this Contract cannot be resolved through negotiation, the parties agree to submit the matter to litigation in a court of competent jurisdiction in ${govLaw}.`,
    negotiation: `The parties agree to make every reasonable effort to resolve disputes through good-faith negotiation for a period of thirty (30) days before pursuing any other remedy.`,
  };
  p(drMap[values.disputeResolution] || drMap["mediation"]);

  // ── 17. CONFIDENTIALITY (conditional) ────────────────────────────────
  if (values.confidentiality === "yes") {
    heading("17.  CONFIDENTIALITY");

    p(
      `The Service Provider will not, at any time or in any manner, either directly or indirectly, use for the personal benefit of the Service Provider, or divulge, disclose, or communicate in any manner any information that is proprietary to the Recipient. The Service Provider will protect such information and treat it as strictly confidential. This provision shall continue to be effective after the termination of this Contract.`
    );
    p(
      `Upon termination of this Contract, the Service Provider will return to the Recipient all records, notes, documentation, and other items that were used, created, or controlled by the Service Provider during the term of this Contract.`
    );
  }

  // ── ADDITIONAL TERMS (optional) ───────────────────────────────────────
  if (values.additionalTerms?.trim()) {
    const addSecNum = values.confidentiality === "yes" ? "18" : "17";
    heading(`${addSecNum}.  ADDITIONAL TERMS AND CONDITIONS`);
    p(values.additionalTerms.trim());
  }

  // ── SIGNATURES ───────────────────────────────────────────────────────
  const sigSecNum = (() => {
    let n = 18;
    if (values.confidentiality !== "yes") n--;
    if (values.additionalTerms?.trim()) n++;
    return n;
  })();

  heading(`${sigSecNum}.  SIGNATURES`);

  p(
    `This Contract shall be signed by ${u(values.party1Name, "the Recipient")}, and by ${u(values.party2Name, "the Service Provider")}, and effective as of the date first above written.`,
    false, 0, 5
  );

  // Recipient block
  checkY(lineH * 5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("The Recipient:", margin, y);
  y += lineH + 2;
  field("Name", u(values.party1Name, ""));
  field("Signature", u(values.party1Signature, ""));
  field("Date", u(values.party1SignDate, ""));

  y += 5;

  // Service Provider block
  checkY(lineH * 5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("The Service Provider:", margin, y);
  y += lineH + 2;
  field("Name", u(values.party2Name, ""));
  field("Signature", u(values.party2Signature, ""));
  field("Date", u(values.party2SignDate, ""));

  // Optional witness
  if (values.witnessName?.trim()) {
    y += 4;
    checkY(lineH * 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text("Witness:", margin, y);
    y += lineH + 2;
    field("Name", values.witnessName.trim());
    field("Signature", "");
  }

  doc.save("staffing_agency_contract.pdf");
};

export default function StaffingAgencyContract() {
  return (
    <FormWizard
      steps={steps}
      title="Staffing Agency Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="staffingagencycontract"
    />
  );
}