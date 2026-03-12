import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "state", label: "State / Province", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
      { name: "zip", label: "ZIP / Postal Code", type: "text", required: true },
    ],
  },
  {
    label: "Notice Parties",
    fields: [
      { name: "tenantLine", label: "To line", type: "text", required: true, placeholder: "Tenant(s) and All Others in Possession" },
      { name: "landlordName", label: "Landlord / Property Management name", type: "text", required: true },
      { name: "agentName", label: "Authorized agent name", type: "text", required: true },
      { name: "agentTitle", label: "Title / role", type: "text", required: true },
    ],
  },
  {
    label: "Premises and Dates",
    fields: [
      { name: "premisesAddress", label: "Premises street address", type: "text", required: true },
      { name: "terminationDate", label: "Lease termination date", type: "date", required: true },
      { name: "noticeDate", label: "Notice date", type: "date", required: true },
      { name: "leaseReference", label: "Lease reference (optional)", type: "text", required: false },
    ],
  },
  {
    label: "Vacate and Surrender",
    fields: [
      { name: "keyReturnItems", label: "Keys / access items to return", type: "text", required: true },
      { name: "conditionStandard", label: "Condition standard text", type: "text", required: true, placeholder: "same condition as move-in, reasonable wear and tear excepted" },
      { name: "vacateByText", label: "Vacate deadline text", type: "text", required: false, placeholder: "no later than the termination date above" },
    ],
  },
  {
    label: "Legal Reservation",
    fields: [
      { name: "governingState", label: "State for rights and remedies clause", type: "text", required: true },
      { name: "claimsReserved", label: "Reserved claims", type: "textarea", required: true, placeholder: "unpaid rent, property damage, and any other lawful relief" },
      { name: "proceedingsText", label: "Proceedings language", type: "text", required: true, placeholder: "unlawful detainer or other legal proceedings" },
    ],
  },
  {
    label: "Payment Handling",
    fields: [
      { name: "paymentReturnText", label: "How post-termination payments are handled", type: "text", required: true, placeholder: "Any payment accepted inadvertently will be returned and is not a waiver." },
      { name: "renewalDisclaimText", label: "No renewal / extension disclaimer", type: "text", required: true },
    ],
  },
  {
    label: "Execution",
    fields: [
      { name: "datedLine", label: "Dated line value", type: "date", required: true },
      { name: "signedBy", label: "By (signer name)", type: "text", required: true },
      { name: "signTitle", label: "Signer title / role", type: "text", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const left = 20;
  const right = 190;
  const pageHeight = 280;
  let y = 20;

  const u = (v?: string, len = 28) => (v && String(v).trim() ? String(v).trim() : "_".repeat(len));
  const ensure = (need = 10) => {
    if (y + need > pageHeight) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, indent = 0, bold = false) => {
    doc.setFont("times", bold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, right - left - indent);
    ensure(lines.length * 6 + 2);
    doc.text(lines, left + indent, y);
    y += lines.length * 6;
  };
  const uf = (label: string, value?: string, indent = 0) => {
    doc.setFont("times", "normal");
    const text = `${label}${u(value)}`;
    const lines = doc.splitTextToSize(text, right - left - indent);
    ensure(lines.length * 6 + 2);
    doc.text(lines, left + indent, y);
    y += lines.length * 6;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(14);
  const title = "LEASE TERMINATION LETTER";
  const tw = doc.getTextWidth(title);
  doc.text(title, 105, y, { align: "center" });
  doc.setLineWidth(0.5);
  doc.line(105 - tw / 2, y + 1.5, 105 + tw / 2, y + 1.5);
  y += 12;

  doc.setFontSize(12);
  uf("To: ", values.tenantLine || "Tenant(s) and All Others in Possession");
  uf(
    "Premises Address: ",
    `${u(values.premisesAddress)}, ${u(values.city, 12)}, ${u(values.state, 10)} ${u(values.zip, 8)}`
  );
  y += 3;

  p(
    `PLEASE TAKE NOTICE that the lease agreement under which you currently occupy the above-described premises shall terminate in accordance with its terms on ${u(
      values.terminationDate,
      18
    )}, and will not be renewed or converted into a month-to-month tenancy.`,
  );
  p(
    `Accordingly, you are not authorized to submit any rent payments for any period beyond the stated termination date. ${u(
      values.paymentReturnText
    )} ${u(values.renewalDisclaimText)}`,
  );
  y += 3;
  p(
    `FURTHER TAKE NOTICE that you are required to vacate and surrender possession of the premises to ${u(
      values.landlordName
    )} ${u(values.vacateByText || "no later than the termination date above", 20)}.`,
  );
  p(
    `The premises must be returned in the ${u(values.conditionStandard)}. All ${u(
      values.keyReturnItems
    )} must be returned at the time of vacating.`,
  );
  p(
    `Failure to surrender possession of the premises as required may result in legal proceedings being initiated against you, including but not limited to an action for ${u(
      values.proceedingsText
    )}, to recover possession of the premises.`,
  );
  y += 3;
  p(
    `The Landlord expressly reserves all rights and remedies provided by the lease agreement and applicable laws of the State of ${u(
      values.governingState
    )}, including but not limited to claims for ${u(values.claimsReserved)}.`,
  );
  p("Nothing in this notice shall be construed as a waiver of any such rights or remedies.");
  y += 6;

  uf("Dated: ", values.datedLine || values.noticeDate);
  uf("By: ", values.signedBy || values.agentName);
  uf("Title/Role: ", values.signTitle || values.agentTitle);

  doc.save("lease_termination_letter.pdf");
};

export default function LeaseTerminationLetter() {
  return (
    <FormWizard
      steps={steps}
      title="Lease Termination Letter"
      subtitle="Fill in the form to generate your PDF"
      onGenerate={generatePDF}
      documentType="leaseterminationletter"
    />
  );
}
