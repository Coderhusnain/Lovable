import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Step 1: Contract Parties",
    fields: [
      { name: "contractDate", label: "Contract Date", type: "date", required: true },
      { name: "clientName", label: "Party A (Client) Name", type: "text", required: true },
      { name: "softwareHouseName", label: "Party B (Software House) Name", type: "text", required: true },
    ],
  },
  {
    label: "Step 2: Scope Timelines",
    fields: [
      { name: "serviceTimeline", label: "Service Provision Timeline", type: "text", required: true },
      { name: "probationPeriod", label: "Probation Period for New Resource", type: "text", required: true },
      { name: "backupTimeline", label: "Backup Resource Timeline", type: "text", required: true },
    ],
  },
  {
    label: "Step 3: Payments and Tax",
    fields: [
      { name: "invoiceBasis", label: "Invoice Basis (man-day/man-hour)", type: "text", required: true },
      { name: "salesTaxDays", label: "Sales Tax Filing Days", type: "text", required: true },
    ],
  },
  {
    label: "Step 4: Legal Controls",
    fields: [
      { name: "forceMajeureDays", label: "Force Majeure Continuation Days", type: "text", required: true },
      { name: "resourceProvisionDays", label: "Resource Provision Deadline (days)", type: "text", required: true },
      { name: "terminationDelayDays", label: "Delay Termination Threshold (days)", type: "text", required: true },
      { name: "governingLawState", label: "Governing Law State", type: "text", required: true },
    ],
  },
  {
    label: "Step 5: Notices and Addresses",
    fields: [
      { name: "clientNoticeAddress", label: "Client Notice Address", type: "textarea", required: true },
      { name: "addressChangeDays", label: "Address Change Notice Days", type: "text", required: true },
    ],
  },
  {
    label: "Step 6: Signatories",
    fields: [
      { name: "softwareHouseSigner", label: "Software House Signer", type: "text", required: true },
      { name: "softwareHouseTitle", label: "Software House Signer Title", type: "text", required: true },
      { name: "clientSigner", label: "Client Signer", type: "text", required: true },
      { name: "clientTitle", label: "Client Signer Title", type: "text", required: true },
    ],
  },
  {
    label: "Step 7: Witnesses",
    fields: [
      { name: "witness1Name", label: "Witness 1 Name", type: "text", required: false },
      { name: "witness1Cnic", label: "Witness 1 CNIC", type: "text", required: false },
      { name: "witness2Name", label: "Witness 2 Name", type: "text", required: false },
      { name: "witness2Cnic", label: "Witness 2 CNIC", type: "text", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const m = 16;
  const tw = 178;
  const lh = 5.15;
  let y = 18;

  const u = (val?: string, n = 16) => ((val || "").trim() ? (val || "").trim() : "_".repeat(n));
  const p = (text: string, bold = false, gap = 1.35) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > 286) {
      doc.addPage();
      y = 18;
    }
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.4);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  const title = "SERVICES CONTRACT";
  doc.text(title, 105, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.line(105 - tW / 2, y + 1.1, 105 + tW / 2, y + 1.1);
  y += 8;

  p(`This Services Contract (the "Contract") is made and entered into on ${u(v.contractDate, 10)}.`);
  p("By and Between", true);
  p(`Party A ${u(v.clientName)} (hereinafter called the "service provider", which expression shall deem to mean and include its administrators, authorized representatives, successors-in-interest and permitted assigns) of the One Part; and Party B ${u(v.softwareHouseName)} (hereinafter called the "Software House"), which expression shall deem to mean and include its successors-in-interest and permitted assigns of the Second Part.`);
  p('(The Client and the Software House shall, hereinafter, collectively be referred to as the "Parties" and individually as the "Party" where the context so requires.)');

  p("WHEREAS:", true);
  p("A. The Client wishes to engage a software house to provide software development services through staff augmentation.");
  p("B. The Software House is engaged in providing software and digital solutions and has developed a pool of resources with qualifications, credentials, certifications, skills, knowledge, expertise and experience.");
  p("C. The Client may, from time to time and in its complete discretion, engage the Software House to provide Services through provision of resources having skill sets and expertise.");
  p("D. The Software House undertakes and agrees to provide the Services as per the requirements of the Client and in accordance with the terms and conditions set forth herein and under the relevant Schedules of this Contract.");

  p("NON-EXCLUSIVITY AND MINIMUM VOLUME COMMITMENTS", true);
  p("The execution of this Contract does not in itself bind the Client to purchase a certain minimum volume of services from the Software House. Furthermore, the Contract is on a non-exclusive basis and does not restrain the Client to enter into similar arrangements or agreements with other service providers for the provisioning of similar services.");

  p("SCOPE OF WORK", true);
  p("The Software House undertakes to deliver all Services required for the successful delivery of the Project(s) awarded hereunder.");
  p("4.2.1 The Software House shall provide the Services to the satisfaction of Client and for the purposes required by Client, subject to the conditions set forth in this Contract and specifically in accordance with timelines set for provisioning of such Services.");
  p("4.2.2 The Software House agrees that all Deliverable(s) (including software, applications, products, etc.) produced or delivered under management/supervision of Client, fully or partially, shall form Client intellectual property.");
  p("4.2.3 Nothing contained herein creates any kind of exclusivity in favour of the Software House, and the Client shall be free to order similar Services from third parties. The Parties agree that there is no exclusivity and no guaranteed volume commitment under this Contract.");
  p(`4.2.4 The Software House shall ensure provisioning of Services and backup resources within ${u(v.serviceTimeline)} as agreed between the Parties in writing (including email). The probation period for any new resource is ${u(v.probationPeriod)}. The Client reserves the right to continue with the resource after probation based on performance evaluation, deliverables, quality, and compliance with Client guidelines and expectations.`);
  p("4.2.5 The Client shall ensure resources provisioned for Services are equipped with up-to-date IT machines/laptops in accordance with specifications communicated by Client.");
  p("4.2.6 The Client shall ensure resources payment of working days, if disengage during any period of month.");

  p("TERMS OF PAYMENT AND INVOICING", true);
  p("The Client shall pay to the Software House for successful completion of Services. Fees shall be calculated in accordance with payment terms below.");
  p(`A) All invoices for Services shall be raised monthly in arrears in accordance with ${u(v.invoiceBasis)} rate.`);
  p("B) All invoices shall be raised with specific reference to this Contract and must be accompanied by relevant Acceptance Certificates and ancillary documentation required by Client for verification.");

  p("TAXES, DUTIES AND LEVIES", true);
  p("If the Software House provides a duly executed tax exemption certificate, Client will exempt in accordance with law effective from date mentioned. If Client is required by law to deduct/withhold from any payment due, Client will pay net amount, provide evidence of remittance to tax authority, and provide reasonable assistance for recovery of withheld amounts where applicable.");
  p("The Software House shall be responsible for validity, accuracy, completeness, and legal compliance of invoices and shall keep Client indemnified for delays attributable to Software House invoice/tax non-compliance.");
  p(`The Software House shall submit valid sales tax invoices and file such invoices in monthly sales tax return within ${u(v.salesTaxDays, 2)} days of invoice date.`);

  p("ELIGIBLE SOURCES FOR PROCUREMENT OF FACILITIES", true);
  p("The Software House shall not make any purchase/expenditure for the purpose of this Contract without prior written approval of Client.");

  p("SUPPLIER'S OBLIGATIONS", true);
  p("The Software House shall promptly fulfill all obligations and responsibilities in this Contract and schedules.");
  p("a) Maintain organization with competent personnel having necessary level of competence and skill.");
  p("b) Ensure personnel comply with Client safety/security rules and Client network/system access policies while rendering Services.");
  p("c) Deliver Services/assigned tasks strictly in accordance with agreed timelines and Client instructions; failure entitles Client to claim liquidated damages/penalties.");
  p("d) Comply with all applicable laws and indemnify/hold harmless Client from losses/fines caused by non-compliance.");

  p("COMMENCEMENT AND CARE OF WORK", true);
  p("The Software House shall commence Services as soon as this Contract is signed. From commencement to completion of Services, the Software House shall take full responsibility for its personnel.");

  p("WARRANTY / GUARANTEE", true);
  p("Software House will ensure the Services as per SOW are provided timely during the Contract.");

  p("INTELLECTUAL PROPERTY", true);
  p("The intellectual property of developed software will remain on Client side and shall be the property of Client.");

  p("INDEMNITY", true);
  p("The Software House shall indemnify and hold harmless Client, its officers, directors, employees and personnel against any and all claims, damages, liabilities, losses, and expenses, direct or indirect, including personal injury, death, and damage to property, reputation and goodwill arising from negligence, intentional act/omission, or performance of obligations under this Agreement.");

  p("FORCE MAJEURE", true);
  p("Force Majeure means an event beyond reasonable control making performance impossible or impractical, including war, terrorism, riots, natural disasters, fire, labor disputes, acts of government, epidemics, pandemics, etc.");
  p("Failure due to Force Majeure is not breach/default if affected Party takes reasonable precautions and informs other Party as soon as possible.");
  p(`If Force Majeure continues for a period of ${u(v.forceMajeureDays, 2)} days, Client has the right to terminate the Contract.`);
  p("Force Majeure does not relieve liability for obligations arising before occurrence of such event.");
  p("Software House has no entitlement and Client has no liability for costs/losses/expenses/damages or contract-price payment during Force Majeure, and no delay costs incurred by Software House due to Force Majeure.");

  p("GOVERNING LAW AND DISPUTE RESOLUTION", true);
  p(`This Contract shall be construed and governed by the laws of ${u(v.governingLawState)}.`);
  p("Any dispute not resolved through informal negotiation within thirty (30) days shall be settled through mediation, and if mediation fails, by arbitration through one mutually appointed arbitrator, or by court of competent jurisdiction if no agreement on arbitrator.");

  p("LIQUIDATED DAMAGES & PENALTY", true);
  p(`Software House shall provide requested resource within ${u(v.resourceProvisionDays, 2)} days of Client request. Where Software House fails, Client may recover liquidated damages via direct deduction from invoices. If delay reaches beyond ${u(v.terminationDelayDays, 2)} days, Client may terminate without prejudice to other rights.`);

  p("CONFIDENTIALITY", true);
  p("Each Party and its personnel shall hold in confidence all confidential information disclosed by the other Party, technical/financial/legal/commercial, whether oral or written, expressly marked or deemed confidential by nature. Confidential information shall be used only for fulfilling this Contract and not disclosed to third parties without prior written consent.");
  p("Receiving Party may disclose only to employees/affiliates/consultants/advisors on a strict need-to-know basis under similar confidentiality obligations.");
  p("Confidentiality obligations do not apply to information already known, publicly available without breach, lawfully obtained from third party, independently developed without use of confidential information, or required by law.");
  p("Confidentiality survives expiration/termination unless otherwise agreed in writing or required by law.");

  p("NOTICES", true);
  p(`Notices/correspondence shall be sent by email, fax, or registered post to: ${u(v.clientNoticeAddress)}.`);
  p(`In case of address change, written notification shall be made to other Party within ${u(v.addressChangeDays, 2)} working days.`);

  p("BUSINESS PRACTICES", true);
  p("Software House shall comply with all applicable laws and regulations, including export laws, and shall not offer/pay/authorize any illegal or improper benefit to influence award decisions or obtain/retain business. On failure, Client may terminate after reasonable hearing opportunity, and Software House shall indemnify Client.");

  p("HEALTH, SAFETY, SECURITY AND ENVIRONMENT (HSSE)", true);
  p("Software House shall provide healthy, safe and secure working environment conforming to Client HSSE policies and internationally recognized standards; prohibit forced/bonded/child labor; ensure non-discrimination and dignity/privacy; comply with labor and employment laws; and avoid anti-competitive behavior, corruption, money laundering, and prohibited business practices.");
  p("Client may conduct worker interviews, inspections and audits. Software House shall rectify non-conformities at its own risk and cost, failing which Client may suspend/terminate and pursue remedies.");

  p("MISCELLANEOUS", true);
  p("Waiver: Client failure to insist on performance or exercise rights in one or more instances does not waive future performance or rights.");
  p("Severability: Invalid clauses are deemed severed and remaining Contract continues in force as closely as possible to original consensus.");
  p("Survival: Terms that by nature should survive termination/cancellation shall survive.");

  p("IN WITNESS WHEREOF", true);
  p(`For and on behalf of Software House: ${u(v.softwareHouseSigner)} | Title: ${u(v.softwareHouseTitle)}`);
  p(`For and on behalf of Client: ${u(v.clientSigner)} | Title: ${u(v.clientTitle)}`);
  p(`Witness 1: ${u(v.witness1Name || "________________", 8)} | CNIC: ${u(v.witness1Cnic || "________________", 8)}`);
  p(`Witness 2: ${u(v.witness2Name || "________________", 8)} | CNIC: ${u(v.witness2Cnic || "________________", 8)}`);
  p(`Witness 1: ${u(v.witness1Name || "________________", 8)} | CNIC: ${u(v.witness1Cnic || "________________", 8)}`);
  p(`Witness 2: ${u(v.witness2Name || "________________", 8)} | CNIC: ${u(v.witness2Cnic || "________________", 8)}`);

  doc.save("services_contract.pdf");
};

export default function ServicesContract() {
  return (
    <FormWizard
      steps={steps}
      title="Services Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="servicescontract"
      preserveStepLayout
    />
  );
}
