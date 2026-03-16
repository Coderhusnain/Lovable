import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement Date and Place",
    fields: [
      { name: "agreementDay",   label: "Agreement day",   type: "number", required: true,  placeholder: "23" },
      { name: "agreementMonth", label: "Agreement month", type: "text",   required: true,  placeholder: "June" },
      { name: "agreementYear",  label: "Agreement year",  type: "number", required: true,  placeholder: "2025" },
      { name: "agreementPlace", label: "Agreement place", type: "text",   required: true,  placeholder: "Islamabad" },
      { name: "country",        label: "Country",         type: "text",   required: true  },
      { name: "state",          label: "State",           type: "text",   required: true  },
      { name: "province",       label: "Province",        type: "text",   required: false },
      { name: "city",           label: "City",            type: "text",   required: false },
    ],
  },
  {
    label: "Parties",
    fields: [
      { name: "masterName",    label: "Master name",                    type: "text",     required: true  },
      { name: "masterAddress", label: "Master full residential address", type: "textarea", required: true  },
      { name: "servantName",   label: "Servant name",                   type: "text",     required: true  },
      {
        name: "servantRelationType",
        label: "Servant relation type",
        type: "select",
        required: true,
        options: [
          { value: "son",      label: "Son of"      },
          { value: "daughter", label: "Daughter of" },
          { value: "wife",     label: "Wife of"     },
        ],
      },
      { name: "servantRelationName", label: "Servant relation name",                   type: "text",     required: true },
      { name: "servantAddress",      label: "Servant full residential address",         type: "textarea", required: true },
    ],
  },
  {
    label: "Employment and Duties",
    fields: [
      { name: "employmentAddress", label: "Place of employment (full residential address)", type: "textarea", required: true  },
      { name: "extraDuty",         label: "Any other related domestic tasks (optional)",    type: "textarea", required: false },
    ],
  },
  {
    label: "Code and Prohibited Conduct",
    fields: [
      { name: "extraConduct",    label: "Additional code of conduct term (optional)",  type: "textarea", required: false },
      { name: "extraProhibited", label: "Additional prohibited conduct term (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Remuneration and Termination",
    fields: [
      { name: "monthlyPackage",       label: "Monthly package amount",          type: "text",   required: true,  placeholder: "PKR ______" },
      { name: "payDay",               label: "Salary payment day (e.g. 5)",     type: "number", required: true,  placeholder: "5" },
      { name: "termYears",            label: "Agreement term in years",         type: "number", required: true,  placeholder: "2" },
      { name: "terminationNoticeDays",label: "Termination notice days",         type: "number", required: true,  placeholder: "30" },
      { name: "governingLawText",     label: "Governing law text",              type: "text",   required: true,  placeholder: "laws of state" },
    ],
  },
  {
    label: "Master and Servant Signatures",
    fields: [
      { name: "masterSignName",  label: "MASTER Name",      type: "text", required: true },
      { name: "masterSignature", label: "MASTER Signature", type: "text", required: true },
      { name: "masterCnic",      label: "MASTER CNIC No.",  type: "text", required: true },
      { name: "servantSignName",  label: "SERVANT Name",      type: "text", required: true },
      { name: "servantSignature", label: "SERVANT Signature", type: "text", required: true },
      { name: "servantCnic",      label: "SERVANT CNIC No.",  type: "text", required: true },
    ],
  },
  {
    label: "Witnesses",
    fields: [
      { name: "w1Name",      label: "Witness 1 Name",      type: "text", required: true },
      { name: "w1Signature", label: "Witness 1 Signature", type: "text", required: true },
      { name: "w1Cnic",      label: "Witness 1 CNIC No.",  type: "text", required: true },
      { name: "w2Name",      label: "Witness 2 Name",      type: "text", required: true },
      { name: "w2Signature", label: "Witness 2 Signature", type: "text", required: true },
      { name: "w2Cnic",      label: "Witness 2 CNIC No.",  type: "text", required: true },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const u = (val?: string, fallback = "____________________") =>
  val && val.trim() ? val.trim() : fallback;

const generatePDF = (v: Record<string, string>) => {
  const doc  = new jsPDF({ unit: "mm", format: "a4" });
  const pageW  = 210;
  const margin = 16;
  const textW  = pageW - margin * 2;
  const lineH  = 5.4;
  const pageLimit = 282;
  let y = 18;

  // ── Layout helpers ──────────────────────────────────────────────────

  const checkY = (needed: number) => {
    if (y + needed > pageLimit) { doc.addPage(); y = 18; }
  };

  // Plain body paragraph — normal or bold, optional left indent
  const p = (text: string, bold = false, indent = 0, gapAfter = 2.5) => {
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + gapAfter);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + gapAfter;
  };

  // Bold section heading with extra spacing  e.g. "Purpose of the Agreement"
  const heading = (text: string) => {
    checkY(lineH + 7);
    y += 3;
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textW);
    checkY(lines.length * lineH + 3);
    doc.text(lines, margin, y);
    y += lines.length * lineH + 3;
    doc.setFontSize(10.4);
  };

  // Bullet item with hanging indent
  const bullet = (text: string, indent = 6) => {
    doc.setFont("times", "normal");
    doc.setFontSize(10.4);
    const lines = doc.splitTextToSize(text, textW - indent);
    checkY(lines.length * lineH + 2.2);
    doc.text("\u2022", margin + 1.5, y);
    doc.text(lines, margin + indent, y);
    y += lines.length * lineH + 2.2;
  };

  // Signature / CNIC field row with measured underline
  const field = (label: string, value: string, lineLen = 65) => {
    checkY(lineH + 3);
    doc.setFont("times", "bold");
    doc.setFontSize(10.4);
    const lbl = `${label}: `;
    doc.text(lbl, margin, y);
    const lblW = doc.getTextWidth(lbl);
    doc.setFont("times", "normal");
    const val = value.trim();
    if (val) {
      doc.text(val, margin + lblW, y);
      doc.line(margin + lblW, y + 1.2,
        margin + lblW + Math.max(lineLen, doc.getTextWidth(val) + 2), y + 1.2);
    } else {
      doc.line(margin + lblW, y + 1.2, margin + lblW + lineLen, y + 1.2);
    }
    y += lineH + 2.5;
  };

  // ── TITLE ────────────────────────────────────────────────────────────
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "DOMESTIC SERVICE AGREEMENT";
  doc.text(title, pageW / 2, y, { align: "center" });
  const halfTW = doc.getTextWidth(title) / 2;
  doc.line(pageW / 2 - halfTW, y + 1.4, pageW / 2 + halfTW, y + 1.4);
  y += 10;
  doc.setFontSize(10.4);

  // ── JURISDICTION LINE ────────────────────────────────────────────────
  const jurisdiction = [v.state, v.country, v.province, v.city]
    .filter(Boolean).join(", ");
  doc.setFont("times", "bold");
  doc.text("Jurisdiction: ", margin, y);
  doc.setFont("times", "normal");
  doc.text(u(jurisdiction, "[Jurisdiction]"), margin + doc.getTextWidth("Jurisdiction: "), y);
  y += lineH + 3;

  // ── PREAMBLE ─────────────────────────────────────────────────────────
  const relType = (v.servantRelationType || "son").toLowerCase();
  const relLabel = relType === "daughter" ? "daughter of"
    : relType === "wife" ? "wife of"
    : "son/daughter/wife of";

  const ordinal = (n: string) => {
    const d = parseInt(n, 10);
    if (isNaN(d)) return n;
    const s = ["th","st","nd","rd"];
    const v = d % 100;
    return d + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  p(
    `This Agreement is made on this ${ordinal(v.agreementDay)} day of ${u(v.agreementMonth, "______")} ${u(v.agreementYear, "____")}, at ${u(v.agreementPlace, "______")}, by and between:`
  );

  // Party One
  p(
    `Party One, ${u(v.masterName, "[Master Name]")}, residing at ${u(v.masterAddress, "[Full Residential Address]")}, hereinafter referred to as the "Master",`,
    false, 4
  );

  // AND separator
  checkY(lineH + 2);
  doc.setFont("times", "bold");
  doc.setFontSize(10.4);
  doc.text("AND", pageW / 2, y, { align: "center" });
  y += lineH + 2;

  // Party Two
  p(
    `Party Two, ${u(v.servantName, "[Servant Name]")}, ${relLabel} ${u(v.servantRelationName, "______")}, residing at ${u(v.servantAddress, "[Full Residential Address]")}, hereinafter referred to as the "Servant".`,
    false, 4
  );

  p(`Collectively referred to as the "Parties".`);

  // ── PURPOSE ──────────────────────────────────────────────────────────
  heading("Purpose of the Agreement");

  p(
    `The Master agrees to employ the Servant as a domestic worker, responsible for carrying out general household duties and safeguarding the Master's premises. In consideration thereof, the Master shall provide a designated portion of the residence within the premises for the Servant's accommodation, subject to the terms and conditions stipulated in this Agreement.`
  );

  // ── PLACE OF EMPLOYMENT ──────────────────────────────────────────────
  heading("Place of Employment");

  p("The Servant is employed at the residence of the Master located at:");
  p(u(v.employmentAddress, "[Full Residential Address]"), false, 4, 3);

  // ── DUTIES AND RESPONSIBILITIES ──────────────────────────────────────
  heading("Duties and Responsibilities");

  p("The Servant agreed to perform the following duties:");
  bullet("Cleaning and maintenance of the house;");
  bullet("Washing clothes and dishes;");
  bullet("Cooking or assisting in food preparation;");
  bullet("Elderly care;");
  bullet("Grocery shopping or errands, if instructed;");
  if (v.extraDuty?.trim()) {
    bullet(`Any other related domestic tasks assigned by the Master: ${v.extraDuty.trim()}`);
  } else {
    bullet("Any other related domestic tasks assigned by the Master.");
  }

  // ── CODE OF CONDUCT ──────────────────────────────────────────────────
  heading("Code of Conduct");

  p("The Servant agreed and undertook as follows:");
  bullet("To maintain discipline, honesty, and confidentiality in all matters pertaining to the household;");
  bullet("Not to invite or allow any guest or outsider to enter the premises without the prior consent of the Master;");
  bullet("To refrain from causing any damage to the property and from engaging in any unlawful or illegal activity;");
  bullet("Not to allow entry into the premises of any individual, including the Servant's son, who is involved in or facing any criminal charges or proceedings;");
  bullet("Not to leave the premises of the house without the prior permission or approval of the Master;");
  bullet("To behave respectfully and courteously towards the Master at all times, and to refrain from any form of misconduct or misbehavior;");
  bullet("Not to use the address of the Master's residence for any purpose, including but not limited to correspondence, legal documentation, or as proof of residence, nor to represent any affiliation or connection with the Master or the premises without express written permission.");
  if (v.extraConduct?.trim()) {
    bullet(v.extraConduct.trim());
  }

  // ── REMUNERATION ─────────────────────────────────────────────────────
  heading("Remuneration");

  p(
    `The Master is paying the Servant a monthly package of ${u(v.monthlyPackage, "[mentioned amount]")} on ${u(v.payDay, "5")}th of each month. It includes salary, a portion of house to stay including free electricity as well as gas utilities.`
  );

  // ── PROHIBITED CONDUCT ───────────────────────────────────────────────
  heading("Prohibited Conduct");

  p("The following actions are strictly prohibited and may result in immediate termination:");
  bullet("Theft or misuse of the Master's belongings;");
  bullet("Physical or verbal abuse;");
  bullet("Use or possession of intoxicating substances;");
  bullet("Bringing outsiders without permission;");
  bullet("Misrepresentation of identity or use of false documents.");
  if (v.extraProhibited?.trim()) {
    bullet(v.extraProhibited.trim());
  }

  // ── DURATION AND TERMINATION ─────────────────────────────────────────
  heading("Duration and Termination");

  p(
    `This agreement shall be valid for a period of ${u(v.termYears, "two (02)")} years from the date of signing and may be renewed with mutual consent.`
  );
  bullet(`Either party may terminate this agreement with ${u(v.terminationNoticeDays, "30")} days notice or salary in lieu thereof.`);
  bullet("The Master reserves the right to terminate the Agreement immediately in case of misconduct, breach of trust, or violation of any term of this Agreement.");

  // ── MISCELLANEOUS ────────────────────────────────────────────────────
  heading("Miscellaneous");

  bullet("This Agreement constitutes the entire understanding between the Parties.");
  bullet("Any modification must be in writing and signed by both Parties.");
  bullet(`This Agreement shall be governed by the ${u(v.governingLawText, "laws of state")}.`);

  // ── ACKNOWLEDGMENT ───────────────────────────────────────────────────
  heading("Acknowledgment");

  p(
    `The Servant acknowledges that she has read, understood, and voluntarily agreed to the terms and conditions of this Agreement and signs it in full acceptance thereof.`
  );
  y += 2;
  p(
    `IN WITNESS WHEREOF, the Parties hereto have executed this Agreement on the day, month, and year first written above.`,
    true, 0, 5
  );

  // ── MASTER SIGNATURE BLOCK ───────────────────────────────────────────
  checkY(lineH * 5);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("MASTER", margin, y);
  y += lineH + 2;
  field("Name",      u(v.masterSignName,  ""));
  field("Signature", u(v.masterSignature, ""));
  field("CNIC No.",  u(v.masterCnic,      ""));

  y += 4;

  // ── SERVANT SIGNATURE BLOCK ──────────────────────────────────────────
  checkY(lineH * 5);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("SERVANT", margin, y);
  y += lineH + 2;
  field("Name",      u(v.servantSignName,  ""));
  field("Signature", u(v.servantSignature, ""));
  field("CNIC No.",  u(v.servantCnic,      ""));

  y += 4;

  // ── WITNESSES ────────────────────────────────────────────────────────
  checkY(lineH * 2);
  doc.setFont("times", "bold");
  doc.setFontSize(11);
  doc.text("WITNESSES", margin, y);
  y += lineH + 3;

  // Witness 1
  checkY(lineH * 4);
  doc.setFont("times", "bold");
  doc.setFontSize(10.4);
  doc.text("1.", margin, y);
  y += lineH + 1;
  field("Name",      u(v.w1Name,      ""));
  field("Signature", u(v.w1Signature, ""));
  field("CNIC No.",  u(v.w1Cnic,      ""));

  y += 3;

  // Witness 2
  checkY(lineH * 4);
  doc.setFont("times", "bold");
  doc.setFontSize(10.4);
  doc.text("2.", margin, y);
  y += lineH + 1;
  field("Name",      u(v.w2Name,      ""));
  field("Signature", u(v.w2Signature, ""));
  field("CNIC No.",  u(v.w2Cnic,      ""));

  doc.save("domestic_service_agreement.pdf");
};

export default function DomesticServiceAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Domestic Service Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="domesticserviceagreement"
      preserveStepLayout
    />
  );
}