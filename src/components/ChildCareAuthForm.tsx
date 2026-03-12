import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      { name: "country", label: "Country", type: "text", required: true },
      { name: "stateOrProvince", label: "State / Province", type: "text", required: true },
      { name: "city", label: "City", type: "text", required: true },
    ],
  },
  {
    label: "Parties",
    fields: [
      { name: "agreementDay", label: "Agreement day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement year", type: "text", required: true },
      { name: "parent1Name", label: "Parent/Guardian 1 name", type: "text", required: true },
      { name: "parent2Name", label: "Parent/Guardian 2 name", type: "text", required: true },
      { name: "parentAddress", label: "Parent/Guardian address", type: "text", required: true },
      { name: "parentPhones", label: "Parent/Guardian phone number(s)", type: "text", required: true },
      { name: "parentEmails", label: "Parent/Guardian email(s)", type: "text", required: true },
      { name: "caretaker1Name", label: "Caretaker 1 name", type: "text", required: true },
      { name: "caretaker2Name", label: "Caretaker 2 name", type: "text", required: true },
      { name: "caretakerAddress", label: "Caretaker address", type: "text", required: true },
      { name: "caretakerPhones", label: "Caretaker phone number(s)", type: "text", required: true },
      { name: "caretakerRelationship", label: "Caretaker relationship to child(ren)", type: "text", required: true },
    ],
  },
  {
    label: "Children and Duration",
    fields: [
      { name: "child1Name", label: "Child 1 full name", type: "text", required: true },
      { name: "child1Dob", label: "Child 1 date of birth", type: "date", required: true },
      { name: "child2Name", label: "Child 2 full name", type: "text", required: false },
      { name: "child2Dob", label: "Child 2 date of birth", type: "date", required: false },
      { name: "startDay", label: "Authorization start day", type: "text", required: true },
      { name: "startMonth", label: "Authorization start month", type: "text", required: true },
      { name: "startYear", label: "Authorization start year", type: "text", required: true },
      { name: "endDay", label: "Authorization end day", type: "text", required: true },
      { name: "endMonth", label: "Authorization end month", type: "text", required: true },
      { name: "endYear", label: "Authorization end year", type: "text", required: true },
    ],
  },
  {
    label: "Emergency and Governing Law",
    fields: [
      { name: "primaryContactName", label: "Primary emergency contact name", type: "text", required: true },
      { name: "primaryContactPhone", label: "Primary emergency contact phone", type: "text", required: true },
      { name: "primaryContactEmail", label: "Primary emergency contact email", type: "text", required: true },
      { name: "secondaryContactName", label: "Secondary emergency contact name", type: "text", required: true },
      { name: "secondaryContactPhone", label: "Secondary emergency contact phone", type: "text", required: true },
      { name: "secondaryContactEmail", label: "Secondary emergency contact email", type: "text", required: true },
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "parent1Sign", label: "Parent/Guardian 1 signature name", type: "text", required: true },
      { name: "parent1Date", label: "Parent/Guardian 1 date", type: "date", required: true },
      { name: "parent2Sign", label: "Parent/Guardian 2 signature name", type: "text", required: true },
      { name: "parent2Date", label: "Parent/Guardian 2 date", type: "date", required: true },
      { name: "caretaker1Sign", label: "Caretaker 1 signature name", type: "text", required: true },
      { name: "caretaker1Date", label: "Caretaker 1 date", type: "date", required: true },
      { name: "caretaker2Sign", label: "Caretaker 2 signature name", type: "text", required: false },
      { name: "caretaker2Date", label: "Caretaker 2 date", type: "date", required: false },
    ],
  },
  {
    label: "Notary Acknowledgment",
    fields: [
      { name: "notaryState", label: "Notary state", type: "text", required: false },
      { name: "notaryCounty", label: "Notary county", type: "text", required: false },
      { name: "notaryDay", label: "Notary day", type: "text", required: false },
      { name: "notaryMonth", label: "Notary month", type: "text", required: false },
      { name: "notaryYear", label: "Notary year", type: "text", required: false },
      { name: "notaryAppeared1", label: "Notary appeared person 1", type: "text", required: false },
      { name: "notaryAppeared2", label: "Notary appeared person 2", type: "text", required: false },
      { name: "notarySignature", label: "Notary public signature name", type: "text", required: false },
      { name: "notaryCommissionExpires", label: "Commission expires", type: "text", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.3;
  const limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.5) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.1);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.1);
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(18, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("____________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.6);
  const title = "CHILD CARE AUTHORIZATION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`This Child Care Authorization Agreement ("Agreement") is made and entered into on this ${u(v.agreementDay, 2)} day of ${u(v.agreementMonth)}, ${u(v.agreementYear, 4)}, by and between the undersigned parents and/or legal guardians and the designated caretaker(s).`);
  p("I. PARTIES", true);
  uf("Parent(s)/Guardian(s) Names", `${u(v.parent1Name)} and ${u(v.parent2Name)}`);
  uf("Parent(s)/Guardian(s) Address", v.parentAddress);
  uf("Parent(s)/Guardian(s) Phone Number(s)", v.parentPhones);
  uf("Parent(s)/Guardian(s) Email(s)", v.parentEmails);
  uf("Caretaker(s) Names", `${u(v.caretaker1Name)} and ${u(v.caretaker2Name)}`);
  uf("Caretaker(s) Address", v.caretakerAddress);
  uf("Caretaker(s) Phone Number(s)", v.caretakerPhones);
  uf("Relationship to Child(ren)", v.caretakerRelationship);

  p("II. SUBJECT CHILD(REN)", true);
  uf("1. Full Name", v.child1Name);
  uf("1. Date of Birth", v.child1Dob);
  uf("2. Full Name", v.child2Name);
  uf("2. Date of Birth", v.child2Dob);
  p("(Attach additional pages if necessary)");

  p("III. PURPOSE", true);
  p("This Agreement delegates temporary caregiving authority to the Caretaker(s) to act in the best interests of the minor child(ren) during the duration of this Agreement when Parent(s)/Guardian(s) are unavailable due to travel, emergency, illness, or other circumstances.");

  p("IV. DURATION OF AUTHORIZATION", true);
  p(`This authorization commences on the ${u(v.startDay, 2)} day of ${u(v.startMonth)}, ${u(v.startYear, 4)} and remains in effect until the ${u(v.endDay, 2)} day of ${u(v.endMonth)}, ${u(v.endYear, 4)} unless earlier revoked in writing.`);

  p("V. GRANT OF AUTHORITY", true);
  p("The Caretaker(s) are granted temporary legal authority to perform and make decisions regarding: (1) medical and health care, including emergency treatment and records access; (2) educational matters, including enrollment and school communication; (3) daily welfare and routine, including food, shelter, activities, medications, and transportation; and (4) domestic U.S. travel authorization. International travel requires separate written consent.");

  p("VI. LIMITATIONS OF AUTHORITY", true);
  p("This authorization does not permit consent to adoption or marriage, transfer of permanent custody/guardianship, or passport/international travel document applications without explicit permission.");

  p("VII. EMERGENCY CONTACT INFORMATION", true);
  uf("Primary Contact Name", v.primaryContactName);
  uf("Primary Contact Phone", v.primaryContactPhone);
  uf("Primary Contact Email", v.primaryContactEmail);
  uf("Secondary Contact Name", v.secondaryContactName);
  uf("Secondary Contact Phone", v.secondaryContactPhone);
  uf("Secondary Contact Email", v.secondaryContactEmail);

  p("VIII. INDEMNIFICATION", true);
  p("Parent(s)/Guardian(s) agree to indemnify and hold harmless the Caretaker(s) for reasonable and good-faith actions under this Agreement, except for willful misconduct, gross negligence, or violation of law.");
  p("IX. REVOCATION", true);
  p("This authorization may be revoked at any time by written notice from either Parent/Guardian delivered personally, by certified mail, or by electronic transmission with acknowledgment.");
  p("X. GOVERNING LAW", true);
  p(`This Agreement is governed by the laws of the State of ${u(v.governingLawState)}.`);
  p("XI. ENTIRE AGREEMENT", true);
  p("This Agreement is the entire understanding between the parties and supersedes prior written or oral agreements on the same subject. Any modification must be in writing and signed by all parties.");

  p("XII. SIGNATURES", true);
  p("By signing below, Parent(s)/Guardian(s) affirm legal authority to grant caregiving authority and that all information provided is true and accurate to the best of their knowledge.");
  uf("Parent/Guardian 1 Signature", v.parent1Sign);
  uf("Parent/Guardian 1 Full Name", v.parent1Name);
  uf("Parent/Guardian 1 Date", v.parent1Date);
  uf("Parent/Guardian 2 Signature", v.parent2Sign);
  uf("Parent/Guardian 2 Full Name", v.parent2Name);
  uf("Parent/Guardian 2 Date", v.parent2Date);
  uf("Caretaker 1 Signature", v.caretaker1Sign);
  uf("Caretaker 1 Full Name", v.caretaker1Name);
  uf("Caretaker 1 Date", v.caretaker1Date);
  uf("Caretaker 2 Signature", v.caretaker2Sign);
  uf("Caretaker 2 Full Name", v.caretaker2Name);
  uf("Caretaker 2 Date", v.caretaker2Date);

  p("XIII. NOTARY ACKNOWLEDGMENT (Optional but Recommended)", true);
  uf("STATE OF", v.notaryState);
  uf("COUNTY OF", v.notaryCounty);
  p(`On this ${u(v.notaryDay, 2)} day of ${u(v.notaryMonth)}, ${u(v.notaryYear, 4)}, before me, a Notary Public, personally appeared ${u(v.notaryAppeared1)} and ${u(v.notaryAppeared2)}, known to me to be the persons whose names are subscribed to this instrument, and acknowledged execution for the purposes therein contained.`);
  uf("Notary Public Signature", v.notarySignature);
  uf("My Commission Expires", v.notaryCommissionExpires);
  p(`Jurisdiction: ${u(v.city)}, ${u(v.stateOrProvince)}, ${u(v.country)}`);

  doc.save("child_care_authorization_agreement.pdf");
};

export default function ChildCareAuth() {
  return (
    <FormWizard
      steps={steps}
      title="Child Care Authorization Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="childcareauth"
    />
  );
}
