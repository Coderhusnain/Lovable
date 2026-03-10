import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Principal and Proxy",
    fields: [
      { name: "stateName", label: "State name", type: "text", required: true },
      { name: "principalName", label: "Principal full legal name", type: "text", required: true },
      { name: "principalAddress", label: "Principal address", type: "text", required: true },
      { name: "principalDob", label: "Principal date of birth", type: "date", required: true },
      { name: "appointProxy", label: "Appoint health care proxy?", type: "select", required: true, options: [{ value: "no", label: "No" }, { value: "yes", label: "Yes" }] },
      { name: "proxyName", label: "Primary proxy name", type: "text", required: false },
      { name: "proxyRelationship", label: "Primary proxy relationship", type: "text", required: false },
      { name: "proxyAddress", label: "Primary proxy address", type: "text", required: false },
      { name: "proxyCityStateZip", label: "Primary proxy city/state/zip", type: "text", required: false },
      { name: "proxyDayPhone", label: "Primary proxy daytime phone", type: "text", required: false },
      { name: "proxyEveningPhone", label: "Primary proxy evening phone", type: "text", required: false },
      { name: "altProxyName", label: "Alternate proxy name", type: "text", required: false },
      { name: "altProxyRelationship", label: "Alternate proxy relationship", type: "text", required: false },
      { name: "altProxyAddress", label: "Alternate proxy address", type: "text", required: false },
      { name: "altProxyCityStateZip", label: "Alternate proxy city/state/zip", type: "text", required: false },
      { name: "altProxyDayPhone", label: "Alternate proxy daytime phone", type: "text", required: false },
    ],
  },
  {
    label: "Instructions and Execution",
    fields: [
      { name: "nutritionHydration", label: "Authorize feeding tube/IV decisions", type: "select", required: true, options: [{ value: "YES", label: "YES" }, { value: "NO", label: "NO" }] },
      { name: "authorityScope", label: "Scope of authority", type: "select", required: true, options: [{ value: "specific", label: "Follow specific instructions only" }, { value: "instructionsPlus", label: "Follow instructions + decide uncovered matters" }, { value: "finalAuthority", label: "Final authority even if different" }] },
      { name: "consultIndividuals", label: "Individuals physician should discuss with", type: "text", required: false },
      { name: "principalSignature", label: "Principal signature (typed)", type: "text", required: true },
      { name: "signedDate", label: "Date signed", type: "date", required: true },
      { name: "witnessOneName", label: "Witness one name", type: "text", required: true },
      { name: "witnessOneAddress", label: "Witness one address", type: "text", required: true },
      { name: "witnessOneSignature", label: "Witness one signature (typed)", type: "text", required: true },
      { name: "witnessTwoName", label: "Witness two name", type: "text", required: true },
      { name: "witnessTwoAddress", label: "Witness two address", type: "text", required: true },
      { name: "witnessTwoSignature", label: "Witness two signature (typed)", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18;
  const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal");
    doc.setFontSize(10.2);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const t = (value || "").trim();
    if (t) { doc.text(t, x, y); doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(t)), y + 1); }
    else doc.text("________________________", x, y);
    y += LH + 1;
  };
  const title = "HEALTHCARE POWER OF ATTORNEY";
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.8);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 9;
  p("(Health Care Proxy)");
  p(`State of ${v.stateName || "---------------------"}`);
  p(`Executed pursuant to laws of ${v.stateName || "---------------"}. This document appoints a trusted person to make healthcare decisions if principal is unable to communicate or decide independently.`);
  p("A. APPOINTMENT OF HEALTH CARE PROXY", true);
  p(`Option selected: ${v.appointProxy === "yes" ? "I DO wish to appoint a Health Care Proxy." : "I DO NOT wish to appoint a Health Care Proxy."}`);
  if (v.appointProxy === "yes") {
    uf("Primary Proxy - Name", v.proxyName);
    uf("Relationship", v.proxyRelationship);
    uf("Address", v.proxyAddress);
    uf("City, State, Zip", v.proxyCityStateZip);
    uf("Daytime Phone", v.proxyDayPhone);
    uf("Evening Phone", v.proxyEveningPhone);
    uf("Alternate Proxy - Name", v.altProxyName);
    uf("Relationship", v.altProxyRelationship);
    uf("Address", v.altProxyAddress);
    uf("City, State, Zip", v.altProxyCityStateZip);
    uf("Daytime Phone", v.altProxyDayPhone);
  }
  p("B. INSTRUCTIONS TO HEALTH CARE PROXY", true);
  p(`Artificial Nutrition and Hydration authorization: ${v.nutritionHydration || "__ YES / __ NO"}.`);
  p(`Scope of authority selected: ${v.authorityScope || "________________________"}.`);
  p("C. STATEMENT OF INTENT", true);
  p("Principal affirms instructions reflect healthcare wishes, understands transfer obligations if provider/facility will not comply, and pregnancy-related implementation limits under applicable Alabama law.");
  p(`Physician discussion individuals (if any): ${v.consultIndividuals || "________________________"}.`);
  p("D. SEVERABILITY", true);
  p("Invalid/unenforceable provisions do not affect remaining provisions.");
  p("E. SIGNATURE OF PRINCIPAL", true);
  uf("Full Legal Name", v.principalName);
  uf("Address", v.principalAddress);
  uf("State of Residence", "Alabama");
  uf("Date of Birth", v.principalDob);
  uf("Signature", v.principalSignature);
  uf("Date Signed", v.signedDate);
  p("F. WITNESS ATTESTATION (two witnesses required)", true);
  p("Witnesses affirm principal appeared of sound mind and voluntary; witness qualifications apply (not proxy, not related, not beneficiary, age 19+, etc.).");
  uf("Witness One - Name", v.witnessOneName);
  uf("Address", v.witnessOneAddress);
  uf("Signature", v.witnessOneSignature);
  uf("Witness Two - Name", v.witnessTwoName);
  uf("Address", v.witnessTwoAddress);
  uf("Signature", v.witnessTwoSignature);
  p("MAKE IT LEGAL - IMPORTANT REQUIREMENTS", true);
  p("Principal must be 19+ and competent; document must be signed/dated with two qualified witnesses in each other's presence; state-specific execution requirements must be strictly followed.");
  p("COPIES: provide signed copy to physicians/providers/hospitals/trusted family and keep original or copy for records.");
  p("WHEN TO CONSULT A LAWYER: if uncertain about applicability, Alabama execution requirements, or interpretation/enforcement.");
  doc.save("healthcare_power_of_attorney.pdf");
};

export default function HealthcarePOAForm() {
  return (
    <FormWizard
      steps={steps}
      title="Healthcare Power of Attorney"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="healthcarepoa"
    />
  );
}

