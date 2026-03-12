import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction and Principal",
    fields: [
      {
        name: "stateName",
        label: "State",
        type: "select",
        required: true,
        options: [
          { value: "Alabama", label: "Alabama" },
          { value: "Alaska", label: "Alaska" },
          { value: "Arizona", label: "Arizona" },
          { value: "California", label: "California" },
          { value: "Florida", label: "Florida" },
          { value: "New York", label: "New York" },
          { value: "Texas", label: "Texas" },
          { value: "Other", label: "Other" },
        ],
      },
      { name: "principalName", label: "Principal full legal name", type: "text", required: true },
      { name: "principalAddress", label: "Principal address", type: "textarea", required: true },
      { name: "principalDob", label: "Principal date of birth", type: "date", required: true },
      { name: "principalSignature", label: "Principal signature (typed)", type: "text", required: true },
      { name: "signedDate", label: "Date signed", type: "date", required: true },
    ],
  },
  {
    label: "Proxy Appointment Choice",
    fields: [
      { name: "appointProxy", label: "Appoint health care proxy?", type: "select", required: true, options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
      {
        name: "appointProxyReason",
        label: "Optional note for appointment choice",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    label: "Primary Health Care Proxy",
    fields: [
      { name: "proxyName", label: "Primary proxy name", type: "text", required: false },
      { name: "proxyRelationship", label: "Primary proxy relationship", type: "text", required: false },
      { name: "proxyAddress", label: "Primary proxy address", type: "textarea", required: false },
      { name: "proxyCityStateZip", label: "Primary proxy city/state/zip", type: "text", required: false },
      { name: "proxyDayPhone", label: "Primary proxy daytime phone", type: "text", required: false },
      { name: "proxyEveningPhone", label: "Primary proxy evening phone", type: "text", required: false },
    ],
  },
  {
    label: "Alternate Proxy",
    fields: [
      { name: "altProxyName", label: "Alternate proxy name", type: "text", required: false },
      { name: "altProxyRelationship", label: "Alternate proxy relationship", type: "text", required: false },
      { name: "altProxyAddress", label: "Alternate proxy address", type: "textarea", required: false },
      { name: "altProxyCityStateZip", label: "Alternate proxy city/state/zip", type: "text", required: false },
      { name: "altProxyDayPhone", label: "Alternate proxy daytime phone", type: "text", required: false },
    ],
  },
  {
    label: "Instructions and Intent",
    fields: [
      { name: "nutritionHydration", label: "Authorize feeding tube/IV decisions", type: "select", required: true, options: [{ value: "YES", label: "YES" }, { value: "NO", label: "NO" }] },
      { name: "authorityScope", label: "Scope of authority", type: "select", required: true, options: [{ value: "specific", label: "Follow specific instructions only" }, { value: "instructionsPlus", label: "Follow instructions + decide uncovered matters" }, { value: "finalAuthority", label: "Final authority even if different" }] },
      { name: "consultIndividuals", label: "Individuals physician should discuss with", type: "text", required: false },
    ],
  },
  {
    label: "Witness One",
    fields: [
      { name: "witnessOneName", label: "Witness one name", type: "text", required: true },
      { name: "witnessOneAddress", label: "Witness one address", type: "textarea", required: true },
      { name: "witnessOneSignature", label: "Witness one signature (typed)", type: "text", required: true },
    ],
  },
  {
    label: "Witness Two",
    fields: [
      { name: "witnessTwoName", label: "Witness two name", type: "text", required: true },
      { name: "witnessTwoAddress", label: "Witness two address", type: "textarea", required: true },
      { name: "witnessTwoSignature", label: "Witness two signature (typed)", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16;
  const W = 178;
  const LH = 5.5;
  const pageBottom = 282;
  const startNewPage = (top = 18) => {
    doc.addPage();
    y = top;
  };
  const sectionBreak = (needed = 70) => {
    if (y + needed > pageBottom) startNewPage();
    else y += 2;
  };
  const p = (t: string, b = false, gap = 1.5) => {
    doc.setFont("times", b ? "bold" : "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH + gap > pageBottom) startNewPage();
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };
  const u = (v1?: string, n = 18) => (v1 || "").trim() || "_".repeat(n);
  const lineItem = (label: string, value?: string) => p(`•   ${label}: ${u(value, 24)}`, true, 1.0);

  const title = "HEALTHCARE POWER OF ATTORNEY";
  doc.setFont("times", "bold");
  doc.setFontSize(12.8);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 9;

  p("(Health Care Proxy)", false, 1.3);
  p(`State of ${u(v.stateName, 18)}`, true, 1.5);
  p(
    `This Healthcare Power of Attorney is executed pursuant to the laws of the State of ${u(v.stateName, 10)}. It allows an adult individual to appoint a trusted person to make healthcare and medical decisions on their behalf if they become unable to communicate or make such decisions independently. The appointed individual is referred to as the Health Care Proxy.`,
    false,
    1.5
  );
  p(
    "You are not required to appoint a Health Care Proxy. If no proxy is appointed, the instructions contained in this document shall nevertheless govern your healthcare decisions to the extent permitted by law.",
    false,
    1.8
  );
  p("A. APPOINTMENT OF HEALTH CARE PROXY", true, 1.2);
  p("(Initial only ONE option)", false, 1.2);
  p(
    `___ I DO NOT wish to appoint a Health Care Proxy.${v.appointProxy === "no" ? "  [SELECTED]" : ""}`,
    true,
    1.1
  );
  p("OR", true, 1.1);
  p(
    `___ I DO wish to appoint the individual named below as my Health Care Proxy. I have discussed my wishes with this person.${v.appointProxy === "yes" ? "  [SELECTED]" : ""}`,
    true,
    1.4
  );

  p("Primary Health Care Proxy", true, 1.0);
  lineItem("Name", v.proxyName);
  lineItem("Relationship", v.proxyRelationship);
  lineItem("Address", v.proxyAddress);
  lineItem("City, State, Zip Code", v.proxyCityStateZip);
  lineItem("Daytime Phone Number", v.proxyDayPhone);
  lineItem("Evening Phone Number", v.proxyEveningPhone);
  p(
    "A healthcare provider or a non-relative employee of a healthcare provider may not serve as a Health Care Proxy.",
    false,
    1.5
  );
  p("Alternate Health Care Proxy", true, 1.0);
  p(
    "If the above-named individual is unwilling, unable, or unavailable to serve, I appoint the following individual as my alternate Health Care Proxy:",
    false,
    1.2
  );
  lineItem("Name", v.altProxyName);
  lineItem("Relationship", v.altProxyRelationship);
  lineItem("Address", v.altProxyAddress);
  lineItem("City, State, Zip Code", v.altProxyCityStateZip);
  lineItem("Daytime Phone Number", v.altProxyDayPhone);

  // Sections B/C/D
  sectionBreak(105);
  p("B. INSTRUCTIONS TO HEALTH CARE PROXY", true, 1.2);
  p("Artificial Nutrition and Hydration", true, 1.2);
  p("(Initial YES or NO)", false, 1.2);
  p(
    "I authorize my Health Care Proxy to make decisions regarding the provision of nutrition and hydration through a feeding tube or intravenous (IV) means:",
    false,
    1.2
  );
  p(`__ YES     __ NO     Selected: ${u(v.nutritionHydration, 3)}`, true, 1.5);
  p("Scope of Authority", true, 1.2);
  p("(Initial only ONE option)", false, 1.2);
  p(
    `___ My Health Care Proxy shall follow only the specific instructions contained in this document.${v.authorityScope === "specific" ? "  [SELECTED]" : ""}`,
    false,
    1.1
  );
  p(
    `___ My Health Care Proxy shall follow my instructions and may make decisions on matters not expressly addressed herein.${v.authorityScope === "instructionsPlus" ? "  [SELECTED]" : ""}`,
    false,
    1.1
  );
  p(
    `___ My Health Care Proxy shall have final decision-making authority, even if such decisions differ from the instructions contained in this document.${v.authorityScope === "finalAuthority" ? "  [SELECTED]" : ""}`,
    false,
    1.5
  );

  p("C. STATEMENT OF INTENT", true, 1.2);
  p("I affirm that the instructions stated in this document reflect my healthcare wishes.");
  p("I understand that:");
  p("•   If a healthcare provider or facility is unwilling to comply with my instructions, reasonable steps must be taken to transfer me to one that will.");
  p("•   If I am pregnant, or become pregnant, these instructions may not be implemented until after the birth of the child, as required by Alabama law.");
  p(
    `•   If life-sustaining treatment or artificial nutrition and hydration are to be withdrawn, my physician shall discuss the risks, benefits, and my expressed wishes with my Health Care Proxy, if appointed, and with the following individuals (if any): ${u(v.consultIndividuals, 18)}.`
  );

  p("D. SEVERABILITY", true, 1.2);
  p(
    "If any provision of this Healthcare Power of Attorney is determined to be invalid or unenforceable, such determination shall not affect the remaining provisions, which shall remain in full force and effect."
  );

  // Sections E/F
  sectionBreak(105);
  p("E. SIGNATURE OF PRINCIPAL", true, 1.2);
  lineItem("Full Legal Name", v.principalName);
  lineItem("Address", v.principalAddress);
  lineItem("State of Residence", "Alabama");
  lineItem("Date of Birth (MM/DD/YYYY)", v.principalDob);
  p(`Signature: ${u(v.principalSignature, 35)}`, true, 1.0);
  p(`Date Signed: ${u(v.signedDate, 22)}`, true, 1.5);

  p("F. WITNESS ATTESTATION", true, 1.2);
  p("(Two witnesses required)", false, 1.2);
  p("Each undersigned witness affirms that:");
  p("•   The principal appeared to be of sound mind and acting voluntarily;");
  p("•   The witness did not sign on behalf of the principal;");
  p("•   The witness is not the appointed Health Care Proxy;");
  p("•   The witness is not related to the principal by blood, adoption, or marriage;");
  p("•   The witness is not entitled to any portion of the principal's estate;");
  p("•   The witness is at least nineteen (19) years of age;");
  p("•   The witness is not directly responsible for the principal's medical expenses.");
  p("Witness One", true, 1.0);
  lineItem("Name", v.witnessOneName);
  lineItem("Address", v.witnessOneAddress);
  lineItem("Signature", v.witnessOneSignature);
  p("Witness Two", true, 1.0);
  lineItem("Name", v.witnessTwoName);
  lineItem("Address", v.witnessTwoAddress);
  lineItem("Signature", v.witnessTwoSignature);

  // Legal requirements / copies / lawyer
  sectionBreak(105);
  p("MAKE IT LEGAL - IMPORTANT REQUIREMENTS", true, 1.4);
  p("1.   You must be nineteen (19) years of age or older and mentally competent at the time of execution.");
  p("2.   This document must be signed and dated to be effective.");
  p("3.   You must sign this document in the presence of two (2) qualified witnesses, who must also sign in your presence and in the presence of each other.");
  p("4.   Alabama law requires that certain provisions be separately initialed or signed.");
  p("5.   Witness qualifications and execution requirements are state-specific and must be strictly complied with to ensure validity.");
  p("6.   You should initial the bottom margin of each page to prevent alteration or substitution.");
  p("7.   This document should indicate who has received copies for reference, modification, or revocation purposes.");
  p("");
  p("COPIES", true, 1.2);
  p("A signed copy of this document should be provided to:");
  p("•   Your physician and healthcare providers");
  p("•   Any hospital or medical facility where you receive treatment");
  p("•   Appropriate family members, trusted friends, or clergy");
  p("You should retain the original or a copy for your personal records.");
  p("");
  p("WHEN TO CONSULT A LAWYER", true, 1.2);
  p("You should consult an attorney if there is any uncertainty regarding:");
  p("•   The applicability of this document to your circumstances");
  p("•   Execution requirements under Alabama law");
  p("•   Interpretation or enforcement of your healthcare instructions");

  doc.save("healthcare_power_of_attorney.pdf");
};

export default function HealthcarePOAForm() {
  return (
    <FormWizard
      steps={steps}
      title="Healthcare Power of Attorney"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="healthcarepoa"
      preserveStepLayout
    />
  );
}

