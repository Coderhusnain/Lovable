import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Testator and Family",
    fields: [
      { name: "testatorName", label: "Testator full name", type: "text", required: true },
      { name: "testatorAddress", label: "Testator residence address", type: "text", required: true },
      { name: "spouseName", label: "Spouse name", type: "text", required: true },
      { name: "childrenNames", label: "Children names", type: "textarea", required: true },
      { name: "specificBequests", label: "Specific bequests", type: "textarea", required: true },
      { name: "tangibleBeneficiary", label: "Tangible property beneficiary", type: "text", required: true },
      { name: "residuaryAltBeneficiary", label: "Residuary alternate beneficiary", type: "text", required: true },
      { name: "heirsLawState", label: "Heirs-at-law state", type: "text", required: true },
    ],
  },
  {
    label: "Executors and Guardians",
    fields: [
      { name: "petsNames", label: "Pet names", type: "text", required: true },
      { name: "petCaretaker1", label: "Primary pet caretaker", type: "text", required: true },
      { name: "petCaretaker1Address", label: "Primary pet caretaker address", type: "text", required: true },
      { name: "petCaretaker2", label: "Successor pet caretaker", type: "text", required: true },
      { name: "petCaretaker2Address", label: "Successor pet caretaker address", type: "text", required: true },
      { name: "petCareFunds", label: "Pet care funds amount", type: "text", required: true },
      { name: "independentExecutor", label: "Independent executor", type: "text", required: true },
      { name: "independentExecutorAddress", label: "Executor address", type: "text", required: true },
      { name: "successorExecutor", label: "Successor independent executor", type: "text", required: true },
      { name: "successorExecutorAddress", label: "Successor executor address", type: "text", required: true },
      { name: "digitalExecutor", label: "Digital executor", type: "text", required: true },
      { name: "digitalExecutorAddress", label: "Digital executor address", type: "text", required: true },
      { name: "successorDigitalExecutor", label: "Successor digital executor", type: "text", required: true },
      { name: "successorDigitalExecutorAddress", label: "Successor digital executor address", type: "text", required: true },
      { name: "guardianName", label: "Guardian for minor children", type: "text", required: true },
      { name: "guardianAddress", label: "Guardian address", type: "text", required: true },
      { name: "successorGuardianName", label: "Successor guardian", type: "text", required: true },
      { name: "successorGuardianAddress", label: "Successor guardian address", type: "text", required: true },
      { name: "specialDirectives", label: "Special directives", type: "textarea", required: true },
    ],
  },
  {
    label: "Execution and Witnesses",
    fields: [
      { name: "executionDay", label: "Execution day", type: "text", required: true },
      { name: "executionMonth", label: "Execution month", type: "text", required: true },
      { name: "executionYear", label: "Execution year", type: "text", required: true },
      { name: "testatorSignatureName", label: "Testator signature name", type: "text", required: true },
      { name: "witnessPages", label: "Number of pages in instrument", type: "text", required: true },
      { name: "witness1Signature", label: "Witness #1 signature name", type: "text", required: true },
      { name: "witness1Name", label: "Witness #1 full name", type: "text", required: true },
      { name: "witness1Address", label: "Witness #1 address", type: "text", required: true },
      { name: "witness1CityState", label: "Witness #1 city/state", type: "text", required: true },
      { name: "witness2Signature", label: "Witness #2 signature name", type: "text", required: true },
      { name: "witness2Name", label: "Witness #2 full name", type: "text", required: true },
      { name: "witness2Address", label: "Witness #2 address", type: "text", required: true },
      { name: "witness2CityState", label: "Witness #2 city/state", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210;
  const m = 16;
  const tw = w - m * 2;
  const lh = 5.4;
  const limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.2);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(lh + 2);
    const lt = `${label}: `;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.2);
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    const t = (value || "").trim();
    if (t) {
      doc.text(t, x, y);
      doc.line(x, y + 1, x + Math.max(20, doc.getTextWidth(t)), y + 1);
    } else {
      doc.text("____________________", x, y);
    }
    y += lh + 0.8;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.6);
  const title = "LAST WILL AND TESTAMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(w / 2 - tW / 2, y + 1.2, w / 2 + tW / 2, y + 1.2);
  y += 9;

  p(`I, ${u(v.testatorName)}, residing at ${u(v.testatorAddress)}, hereby revoke all prior Wills and Codicils heretofore made by me and declare this instrument to be my Last Will and Testament ("Will").`);
  p("ARTICLE I - Identification of Family", true);
  p(`I am lawfully married to ${u(v.spouseName)}, and all references in this Will to "my spouse" shall mean and refer to said ${u(v.spouseName)}.`);
  p(`The names of my children are ${u(v.childrenNames, 20)}. All references in this Will to "my children" shall include the above-named children and any other child or children hereafter born to or adopted by me after execution.`);
  p("ARTICLE II - Payment of Debts and Expenses", true);
  p("I direct that all of my just debts, including but not limited to funeral expenses and expenses of my last illness, be first paid from my estate as soon as practicable after my death.");
  p("ARTICLE III - Disposition of Property", true);
  p(`A. Specific Bequests: I direct that the following specific bequests be made from my estate: ${u(v.specificBequests, 22)}.`);
  p("B. Digital Assets: All of my digital assets shall be distributed in accordance with Schedule \"A\" attached and incorporated into this Will.");
  p("For purposes of this Will, digital assets include any electronic, online, or virtual property, accounts, content, credentials, and associated data.");
  p("A Letter of Instructions with usernames/passwords/access information is incorporated by reference and shall be delivered exclusively to my appointed Digital Executor.");
  p(`C. Tangible Personal Property: All remaining tangible personal property not otherwise specifically bequeathed shall be distributed to ${u(v.tangibleBeneficiary)}. If this beneficiary fails to survive me, such property becomes part of my residuary estate.`);
  p(`D. Residuary Estate: I direct that the remainder of my estate be distributed to my spouse, ${u(v.spouseName)}. If spouse does not survive me, distribute equally among surviving children with right of representation for descendants. If none survive, distribute to ${u(v.residuaryAltBeneficiary)}; if this beneficiary also fails, pass to heirs-at-law under laws of ${u(v.heirsLawState)}.`);
  p("ARTICLE IV - Pet Care Directives", true);
  p(`A. Appointment of Pet Caretaker: I give my pets, namely ${u(v.petsNames)}, and any other companion animals I may own at my death, to ${u(v.petCaretaker1)} of ${u(v.petCaretaker1Address)}, requesting proper care and companionship.`);
  p(`If unable/unwilling, I give said animals to ${u(v.petCaretaker2)} of ${u(v.petCaretaker2Address)}. If neither accepts custody, my Executor shall select an appropriate caretaker.`);
  p(`B. Funds for Pet Care: I direct my Executor to deliver ${u(v.petCareFunds)} from my estate to the person accepting custody, requested solely for pet care without creating a legally binding obligation.`);
  p("ARTICLE V - Nomination of Independent Executor", true);
  p(`I nominate ${u(v.independentExecutor)}, of ${u(v.independentExecutorAddress)}, to serve as my Independent Executor. If unable or unwilling, I nominate ${u(v.successorExecutor)}, of ${u(v.successorExecutorAddress)}, as successor Independent Executor.`);
  p("ARTICLE VI - Nomination of Digital Executor", true);
  p(`I nominate ${u(v.digitalExecutor)}, of ${u(v.digitalExecutorAddress)}, to serve as my Digital Executor. If unable or unwilling, I nominate ${u(v.successorDigitalExecutor)}, of ${u(v.successorDigitalExecutorAddress)}, as successor Digital Executor.`);
  p("ARTICLE VII - Nomination of Guardian", true);
  p(`If necessary at my death, I nominate ${u(v.guardianName)}, of ${u(v.guardianAddress)}, as Guardian of my minor children's persons and estates. If unable/unwilling, I nominate ${u(v.successorGuardianName)}, of ${u(v.successorGuardianAddress)}, as successor Guardian. No bond/security required.`);
  p("ARTICLE VIII - Executor Powers", true);
  p("My Independent Executor has full authority without court order to collect/manage assets, settle debts/claims, file/pay taxes, sell/lease/mortgage property, invest/reinvest assets, redirect mail/close accounts, fund trusts, and perform all necessary acts; estate administered through independent probate.");
  p("ARTICLE IX - Digital Executor Powers", true);
  p("My Digital Executor has full authority to manage, access, distribute, transfer, archive, and delete digital assets; engage professionals; receive reasonable compensation; and continue powers until all digital assets are fully administered.");
  p("ARTICLE X - Special Directives", true);
  p(u(v.specialDirectives, 24));
  p("ARTICLE XI - Miscellaneous Provisions", true);
  p("Paragraph titles are convenience only; gender and singular/plural are interpreted inclusively. Beneficiary must survive me by thirty (30) days. Common-disaster presumption applies if order of death cannot be determined. Fiduciaries are protected for good-faith actions and entitled to reasonable compensation/reimbursement. Independent Executor may fairly divide disputed bequests.");
  p(`IN WITNESS WHEREOF, I have hereunto subscribed my name this ${u(v.executionDay, 3)} day of ${u(v.executionMonth)} ${u(v.executionYear)}.`);
  uf("Testator", v.testatorSignatureName);
  p("Witness Certification", true);
  p(`We certify that the foregoing instrument, consisting of ${u(v.witnessPages, 2)} pages, was signed by ${u(v.testatorSignatureName)} (the Testator) in our presence, who declared it to be their Last Will and Testament, and we signed as witnesses in the presence of Testator and each other.`);
  uf("Witness #1", v.witness1Signature);
  uf("Name", v.witness1Name);
  uf("Address", v.witness1Address);
  uf("City/State", v.witness1CityState);
  uf("Witness #2", v.witness2Signature);
  uf("Name", v.witness2Name);
  uf("Address", v.witness2Address);
  uf("City/State", v.witness2CityState);

  doc.save("last_will_and_testament.pdf");
};

export default function LastWillForm() {
  return (
    <FormWizard
      steps={steps}
      title="Last Will and Testament"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="lastwill"
    />
  );
}
