import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Company",
    fields: [
      { name: "companyName", label: "Company name", type: "text", required: true },
      { name: "companyStreet", label: "Company street", type: "text", required: true },
      { name: "companyCity", label: "Company city", type: "text", required: true },
      { name: "companyState", label: "Company state/province", type: "text", required: true },
      { name: "companyDate", label: "Adoption date", type: "date", required: true },
      { name: "authorizedPoster", label: "Authorized employee posting identifier", type: "text", required: true },
    ],
  },
  {
    label: "Policy Settings",
    fields: [
      { name: "reviewAgent", label: "Company agent for policy review/amendment", type: "text", required: true },
      { name: "videoSiteStatus", label: "Social video policy", type: "text", required: true, placeholder: "e.g., Not currently active" },
      { name: "companySignName", label: "Company signatory name", type: "text", required: true },
      { name: "companySignTitle", label: "Company signatory title", type: "text", required: true },
      { name: "companySignDate", label: "Company sign date", type: "date", required: true },
      { name: "employeeSignName", label: "Employee signatory name", type: "text", required: true },
      { name: "employeeSignDate", label: "Employee sign date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 16;
  const W = 178;
  const LH = 5.6;
  let y = 18;

  const ensure = (h = 10) => {
    if (y + h > 282) {
      doc.addPage();
      y = 18;
    }
  };
  const p = (text: string, bold = false, gap = 1.8) => {
    ensure(12);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.3);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };
  const uf = (label: string, value?: string) => {
    ensure(8);
    const safeValue = (value || "").trim();
    doc.setFont("helvetica", "normal");
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    if (safeValue) {
      doc.text(safeValue, x, y);
      doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(safeValue)), y + 1);
    } else {
      doc.text("________________________", x, y);
    }
    y += LH + 1.2;
  };

  const title = "SOCIAL MEDIA CONTRACT";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 10;

  p(
    `This Social Media Contract ("Contract") has been adopted by ${v.companyName || "____________"} ("Company") of ` +
      `${[v.companyStreet, v.companyCity, v.companyState].filter(Boolean).join(", ")} on ${v.companyDate || "____________"}, ` +
      "to optimize employee social media interaction consistent with Company policy and professional communication.",
  );
  p(
    "Social media includes multimedia, social networking sites, user rating services, blogs, microblogs, wikis, chat rooms, " +
      "newsletters, and online forums for professional and personal use.",
  );
  p(
    "These guidelines assist employees in making appropriate social media decisions and should be read together with employee policies/handbooks.",
  );

  p("1. SCOPE AND APPLICABILITY", true);
  p(
    "This Contract applies to Company employees, contractors, and personnel acting officially for business purposes on intranet/internet. " +
      "It does not infringe personal activity outside work. Protected speech cannot be censored; however, offensive/defamatory/abusive " +
      "conduct that creates hostile environment is prohibited.",
  );
  p("2. GENERAL POLICIES", true);
  p(
    "2.1 Approval: Employees must obtain approval from appropriate Company agents before beginning any social media project for official purposes.",
  );
  p(
    "2.2 Blocking Policy: Company does not block social media sites. Employees are accountable for online actions and must use good judgment regarding security.",
  );

  p("3. CODE OF CONDUCT", true);
  p(
    "3.1 Blogging: Company-related blogs require permission. Personal blogs may not be worked on during business hours. " +
      "Employees should provide useful perspective, engage appropriately, and cite relevant links. Any company comments must include identity and disclaimer " +
      "that views are personal. Logos/trademarks require permission. Confidentiality always applies.",
  );
  p(
    `3.2 Online Social Networking: Company maintains social presence for information and dialogue. Authorized posters are identified as ${v.authorizedPoster || "____________"}. ` +
      "Personal networking during business hours is allowed only for professional purpose and without disrupting duties/productivity.",
  );
  p(`3.4 Social Video (YouTube): ${v.videoSiteStatus || "Not currently active on social video sites."}`);
  p(
    "3.5 Forums/Discussion Boards: Employees may not discuss non-public information, including on private forums. " +
      "Disclosure of sensitive/proprietary/classified information is prohibited and may trigger discipline.",
  );

  p("4. REVIEWING AND AMENDING THE TERMS", true);
  p(`The proper Company agents (${v.reviewAgent || "____________"}) may periodically review and revise this Contract for evolving platforms/trends.`);
  p("5. VIOLATIONS", true);
  p(
    "Violations may result in discipline up to termination. Employees remain personally and legally responsible for content they publish. " +
      "Liability may include failure to disclose company relationship, spreading false information, or posting defamatory/harassing/hostile content.",
  );
  p("6. CONFIDENTIALITY", true);
  p(
    "Employees must not disclose confidential/proprietary Company or third-party data, including Internal Use Only information. " +
      "Examples include business strategy, trademarks, product releases, financial/sales data, workforce size, and non-public information.",
  );
  p(
    "Employees must identify copyrighted materials, obtain posting permissions where required, and credit original authors.",
  );
  p("7. OWNERSHIP", true);
  p(
    "Employees must distinguish Company vs personal content ownership. Non-work personal posts generally belong to employee. " +
      "Contacts/followers/friends obtained via Company accounts are Company property.",
  );
  p("8. TRANSPARENCY AND DISCLOSURES", true);
  p(
    "Employees sharing information about clients/partners/organizations must disclose relationships. " +
      "Employees may not discuss organizations/products online in exchange for money. Benefits received for reviews must be disclosed.",
  );
  p("9. ONLINE DISCRIMINATION AND HARASSMENT", true);
  p(
    "Company prohibits online discrimination/harassment based on protected characteristics, including race, religion, age, disability, pregnancy, " +
      "marital status, veteran status, national origin, political affiliation, sex, genetics, and other protected statuses under local law.",
  );
  p("10. SIGNATORIES", true);
  p("IN WITNESS WHEREOF, the parties have executed this Social Media Contract as of the dates set forth below.");

  uf("For the Company - Name", v.companySignName);
  uf("Title", v.companySignTitle);
  uf("Date", v.companySignDate);
  y += 1.2;
  uf("For the Employee - Name", v.employeeSignName);
  uf("Date", v.employeeSignDate);

  doc.save("social_media_contract.pdf");
};

export default function SocialMediaContractForm() {
  return (
    <FormWizard
      steps={steps}
      title="Social Media Contract"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="socialmediacontract"
    />
  );
}

