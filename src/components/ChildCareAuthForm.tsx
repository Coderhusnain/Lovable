import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const countryOptions = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Other", label: "Other" },
];

const getStateOptions = (country?: string) => {
  if (country === "United States") {
    return [
      { value: "Alabama", label: "Alabama" },
      { value: "California", label: "California" },
      { value: "Florida", label: "Florida" },
      { value: "New York", label: "New York" },
      { value: "Texas", label: "Texas" },
      { value: "Other US State", label: "Other US State" },
    ];
  }
  if (country === "Canada") {
    return [
      { value: "Ontario", label: "Ontario" },
      { value: "Quebec", label: "Quebec" },
      { value: "British Columbia", label: "British Columbia" },
      { value: "Alberta", label: "Alberta" },
      { value: "Other Canadian Province", label: "Other Canadian Province" },
    ];
  }
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement Date and Parties",
    fields: [
      { name: "agreementDay", label: "Agreement day", type: "text", required: true },
      { name: "agreementMonth", label: "Agreement month", type: "text", required: true },
      { name: "agreementYear", label: "Agreement year", type: "text", required: true },
      { name: "parent1Name", label: "Parent/Guardian 1 name", type: "text", required: true },
      { name: "parent2Name", label: "Parent/Guardian 2 name", type: "text", required: false },
      { name: "parentAddress", label: "Parent/Guardian address", type: "textarea", required: true },
      { name: "parentPhones", label: "Parent/Guardian phone number(s)", type: "text", required: true },
      { name: "parentEmails", label: "Parent/Guardian email(s)", type: "text", required: true },
      { name: "caretaker1Name", label: "Caretaker 1 name", type: "text", required: true },
      { name: "caretaker2Name", label: "Caretaker 2 name", type: "text", required: false },
      { name: "caretakerAddress", label: "Caretaker address", type: "textarea", required: true },
      { name: "caretakerPhones", label: "Caretaker phone number(s)", type: "text", required: true },
      { name: "caretakerRelationship", label: "Caretaker relationship to child(ren)", type: "text", required: true },
    ],
  },
  {
    label: "Children and Purpose",
    fields: [
      { name: "child1Name", label: "Child 1 full name", type: "text", required: true },
      { name: "child1Dob", label: "Child 1 date of birth", type: "date", required: true },
      { name: "child2Name", label: "Child 2 full name", type: "text", required: false },
      { name: "child2Dob", label: "Child 2 date of birth", type: "date", required: false },
      { name: "purposeNote", label: "Purpose note (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Duration and Grant of Authority",
    fields: [
      { name: "startDay", label: "Authorization start day", type: "text", required: true },
      { name: "startMonth", label: "Authorization start month", type: "text", required: true },
      { name: "startYear", label: "Authorization start year", type: "text", required: true },
      { name: "endDay", label: "Authorization end day", type: "text", required: true },
      { name: "endMonth", label: "Authorization end month", type: "text", required: true },
      { name: "endYear", label: "Authorization end year", type: "text", required: true },
      { name: "grantExtra", label: "Additional grant authority note (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Limits, Contacts, Governing Law",
    fields: [
      { name: "primaryContactName", label: "Primary emergency contact name", type: "text", required: true },
      { name: "primaryContactPhone", label: "Primary emergency contact phone", type: "text", required: true },
      { name: "primaryContactEmail", label: "Primary emergency contact email", type: "text", required: true },
      { name: "secondaryContactName", label: "Secondary emergency contact name", type: "text", required: true },
      { name: "secondaryContactPhone", label: "Secondary emergency contact phone", type: "text", required: true },
      { name: "secondaryContactEmail", label: "Secondary emergency contact email", type: "text", required: true },
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      {
        name: "governingLawState",
        label: "Governing law state",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => getStateOptions(values.country),
      },
      { name: "revocationNote", label: "Revocation note (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "parent1Sign", label: "Parent/Guardian 1 signature name", type: "text", required: true },
      { name: "parent1Date", label: "Parent/Guardian 1 date", type: "date", required: true },
      { name: "parent2Sign", label: "Parent/Guardian 2 signature name", type: "text", required: false },
      { name: "parent2Date", label: "Parent/Guardian 2 date", type: "date", required: false },
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
  {
    label: "Final Review",
    fields: [
      { name: "reviewNote", label: "Final review note (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  let y = 18;
  const pageBottom = 282;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const line = (value?: string, n = 22) => (value || "").trim() || "_".repeat(n);
  const startNewPage = (top = 20) => {
    doc.addPage();
    y = top;
  };
  const sectionBreak = (needed = 80) => {
    if (y + needed > pageBottom) startNewPage();
    else y += 2;
  };
  const p = (text: string, bold = false, gap = 1.35) => {
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.6);
    const lines = doc.splitTextToSize(text, tw);
    const blockHeight = lines.length * 5.2 + gap;
    if (y + blockHeight > pageBottom) startNewPage(18);
    doc.text(lines, m, y);
    y += lines.length * 5.2 + gap;
  };
  const hr = () => {
    doc.setLineWidth(0.2);
    doc.line(m, y, w - m, y);
    y += 5.2;
  };
  const section = (text: string) => p(text, true, 2.0);

  doc.setFont("times", "bold");
  doc.setFontSize(12.8);
  const title = "CHILD CARE AUTHORIZATION AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const titleW = doc.getTextWidth(title);
  doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
  y += 10;

  p(
    `This Child Care Authorization Agreement ("Agreement") is made and entered into on this ${u(v.agreementDay, 3)} day of ${u(v.agreementMonth, 10)}, ${u(v.agreementYear, 2)}, by and between the undersigned parents and/or legal guardians (hereinafter referred to as the "Parent(s)"/"Guardian(s)") and the designated caretaker(s) (hereinafter referred to as the "Caretaker(s)").`
  );
  hr();
  section("I. PARTIES");
  p("Parent(s)/Guardian(s):", true, 1.0);
  p(`Names: ${line(v.parent1Name)} and ${line(v.parent2Name)}`);
  p(`Address: ${line(v.parentAddress, 50)}`);
  p(`Phone Number(s): ${line(v.parentPhones, 44)}`);
  p(`Email(s): ${line(v.parentEmails, 50)}`);
  p("Caretaker(s):", true, 1.0);
  p(`Names: ${line(v.caretaker1Name)} and ${line(v.caretaker2Name)}`);
  p(`Address: ${line(v.caretakerAddress, 50)}`);
  p(`Phone Number(s): ${line(v.caretakerPhones, 44)}`);
  p(`Relationship to Child(ren): ${line(v.caretakerRelationship, 36)}`);
  hr();
  section("II. SUBJECT CHILD(REN)");
  p("This authorization pertains to the following minor child(ren):");
  p(`1.  Full Name: ${line(v.child1Name, 24)}  Date of Birth: ${line(v.child1Dob, 12)}`);
  p(`2.  Full Name: ${line(v.child2Name, 24)}  Date of Birth: ${line(v.child2Dob, 12)}`);
  p("(Attach additional pages if necessary)");
  hr();
  section("III. PURPOSE");

  sectionBreak(95);
  p(
    "This Agreement is intended to delegate temporary caregiving authority to the above-named Caretaker(s) to act in the best interests of the minor child(ren) during the duration of this Agreement, in the event that the Parent(s)/Guardian(s) are unavailable due to travel, emergency, illness, or other circumstances."
  );
  if ((v.purposeNote || "").trim()) p(v.purposeNote);
  hr();
  section("IV. DURATION OF AUTHORIZATION");
  p(
    `This authorization shall commence on the ${u(v.startDay, 3)} day of ${u(v.startMonth, 10)}, ${u(v.startYear, 2)} and shall remain in effect until the ${u(v.endDay, 3)} day of ${u(v.endMonth, 10)}, ${u(v.endYear, 2)} unless earlier revoked in writing by either of the Parent(s)/Guardian(s).`
  );
  hr();
  section("V. GRANT OF AUTHORITY");
  p("The Caretaker(s) are hereby granted the temporary legal authority to perform and make decisions regarding the following (but not limited to):");
  p("1.  Medical and Health Care", true);
  p("    o   Seek and authorize emergency medical or dental treatment.");
  p("    o   Admit the child(ren) to a hospital or clinic and authorize procedures.");
  p("    o   Access medical records and health insurance for the child(ren).");
  p("2.  Educational Matters", true);
  p("    o   Enroll the child(ren) in school or daycare if needed.");
  p("    o   Discuss academic progress or behavioral matters with educators.");
  p("    o   Pick up or drop off child(ren) at school or educational programs.");
  p("3.  Daily Welfare and Routine", true);
  p("    o   Make decisions concerning food, clothing, shelter, and general care.");
  p("    o   Supervise recreational and extracurricular activities.");
  p("    o   Administer medications and provide transportation as needed.");
  p("    o   Make transportation or lodging decisions on behalf of the child(ren).");
  p("      (International travel requires separate written consent.)");
  if ((v.grantExtra || "").trim()) p(v.grantExtra);

  sectionBreak(95);
  hr();
  section("VI. LIMITATIONS OF AUTHORITY");
  p("This authorization does not permit the Caretaker(s) to:");
  p("•   Consent to adoption or marriage of the child(ren).");
  p("•   Transfer permanent custody or legal guardianship.");
  p("•   Apply for passports or international travel documents without explicit permission.");
  hr();
  section("VII. EMERGENCY CONTACT INFORMATION");
  p("In the event of an emergency, the Parent(s)/Guardian(s) can be contacted as follows:");
  p("Primary Contact:", true);
  p(`Name: ${line(v.primaryContactName, 24)}`);
  p(`Phone: ${line(v.primaryContactPhone, 24)}`);
  p(`Email: ${line(v.primaryContactEmail, 24)}`);
  p("Secondary Contact:", true);
  p(`Name: ${line(v.secondaryContactName, 24)}`);
  p(`Phone: ${line(v.secondaryContactPhone, 24)}`);
  p(`Email: ${line(v.secondaryContactEmail, 24)}`);
  hr();
  section("VIII. INDEMNIFICATION");
  p("The undersigned Parent(s)/Guardian(s) agree to indemnify and hold harmless the Caretaker(s) for any reasonable and good-faith actions taken in the course of executing duties under this Agreement, unless such action constitutes willful misconduct, gross negligence, or violation of law.");
  hr();
  section("IX. REVOCATION");

  sectionBreak(95);
  p("This authorization may be revoked at any time by written notice from either Parent/Guardian. Notice must be delivered personally, by certified mail, or by electronic transmission with acknowledgment.");
  if ((v.revocationNote || "").trim()) p(v.revocationNote);
  hr();
  section("X. GOVERNING LAW");
  p(`This Agreement shall be governed and construed in accordance with the laws of the State of ${line(v.governingLawState, 22)}, without regard to its conflict of law principles.`);
  hr();
  section("XI. ENTIRE AGREEMENT");
  p("This Agreement constitutes the entire understanding between the parties and supersedes any prior agreements, written or oral, with respect to the subject matter herein. Any modification must be in writing and signed by all parties.");
  hr();
  section("XII. SIGNATURES");
  p("By signing below, the Parent(s)/Guardian(s) affirm that they are legally authorized to grant caregiving authority over the child(ren) listed above, and that all information provided is true and accurate to the best of their knowledge.");
  p("Parent/Guardian 1:", true);
  p(`Signature: ${line(v.parent1Sign, 24)}`);
  p(`Full Name: ${line(v.parent1Name, 24)}`);
  p(`Date: ${line(v.parent1Date, 14)}`);
  p("Parent/Guardian 2:", true);
  p(`Signature: ${line(v.parent2Sign, 24)}`);
  p(`Full Name: ${line(v.parent2Name, 24)}`);
  p(`Date: ${line(v.parent2Date, 14)}`);
  p("Caretaker 1:", true);
  p(`Signature: ${line(v.caretaker1Sign, 24)}`);
  p(`Full Name: ${line(v.caretaker1Name, 24)}`);
  p(`Date: ${line(v.caretaker1Date, 14)}`);
  p("Caretaker 2 (if applicable):", true);
  p(`Signature: ${line(v.caretaker2Sign, 24)}`);
  p(`Full Name: ${line(v.caretaker2Name, 24)}`);
  p(`Date: ${line(v.caretaker2Date, 14)}`);

  sectionBreak(95);
  hr();
  section("XIII. NOTARY ACKNOWLEDGMENT (Optional but Recommended)");
  p(`STATE OF ${line(v.notaryState, 20)}`, true, 0.8);
  p(`COUNTY OF ${line(v.notaryCounty, 20)}`, true, 1.2);
  p(`On this ${u(v.notaryDay, 4)} day of ${u(v.notaryMonth, 10)}, ${u(v.notaryYear, 2)}, before me, a Notary Public in and for said State, personally appeared ${line(v.notaryAppeared1, 22)} and ${line(v.notaryAppeared2, 22)}, known to me to be the persons whose names are subscribed to the within instrument, and acknowledged that they executed the same for the purposes therein contained.`);
  p("IN WITNESS WHEREOF, I have hereunto set my hand and affixed my official seal the day and year first above written.", true);
  hr();
  p(`Notary Public Signature ${line(v.notarySignature, 22)}`);
  p(`My Commission Expires: ${line(v.notaryCommissionExpires, 16)}`);
  if ((v.reviewNote || "").trim()) p(`Review Note: ${v.reviewNote}`);

  doc.save("child_care_authorization_agreement.pdf");
};

export default function ChildCareAuth() {
  return (
    <FormWizard
      steps={steps}
      title="Child Care Authorization Agreement"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="childcareauth"
      preserveStepLayout
    />
  );
}
