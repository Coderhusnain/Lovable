import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date",
    fields: [
      { name: "effectiveDate", label: "Effective Date of this Agreement", type: "date", required: true },
    ],
  },
  {
    label: "Advertiser Details",
    fields: [
      { name: "advertiserName", label: "Advertiser's Full Legal Name / Entity", type: "text", required: true, placeholder: "Enter full legal name or entity" },
      { name: "advertiserEntityType", label: "Advertiser Legal Status (e.g. corporation, LLC)", type: "text", required: true, placeholder: "e.g., corporation, limited liability company" },
      { name: "advertiserState", label: "State of Organization (Advertiser)", type: "text", required: true, placeholder: "e.g., Delaware" },
      { name: "advertiserAddress", label: "Advertiser Principal Office Address", type: "text", required: true, placeholder: "Street, City, State, ZIP" },
      { name: "advertiserBusiness", label: "Advertiser's Business Description", type: "text", required: true, placeholder: "e.g., manufacturing and sale of consumer electronics" },
    ],
  },
  {
    label: "Agency Details",
    fields: [
      { name: "agencyName", label: "Agency's Full Legal Name / Entity", type: "text", required: true, placeholder: "Enter full legal name or entity" },
      { name: "agencyEntityType", label: "Agency Legal Status (e.g. corporation, LLC)", type: "text", required: true, placeholder: "e.g., corporation" },
      { name: "agencyState", label: "State of Organization (Agency)", type: "text", required: true, placeholder: "e.g., New York" },
      { name: "agencyAddress", label: "Agency Principal Office Address", type: "text", required: true, placeholder: "Street, City, State, ZIP" },
    ],
  },
  {
    label: "Scope & Products",
    fields: [
      { name: "productsCovered", label: "Products and/or Services covered by this Agreement", type: "textarea", required: true, placeholder: "List all products and services the Agency will advertise..." },
      { name: "exclusivityScope", label: "Exclusivity scope (Agency is exclusive U.S. advertising agency with respect to)", type: "text", required: true, placeholder: "e.g., all products and services of the Advertiser" },
    ],
  },
  {
    label: "Compensation",
    fields: [
      { name: "mediaCommissionPercent", label: "Media commission (% of gross charges, excluding outdoor advertising)", type: "text", required: true, placeholder: "e.g., 15" },
      { name: "outdoorCommissionPercent", label: "Outdoor advertising commission (%)", type: "text", required: true, placeholder: "e.g., 15" },
      { name: "thirdPartyCommissionPercent", label: "Third-party services commission (% of charges for approved proposals)", type: "text", required: true, placeholder: "e.g., 17.65" },
    ],
  },
  {
    label: "Term & Defaults",
    fields: [
      { name: "servicesCommencementDate", label: "Services Commencement Date", type: "date", required: true },
      { name: "terminationNoticeDays", label: "Termination notice period (days)", type: "text", required: true, placeholder: "e.g., 30" },
      { name: "defaultCureDays", label: "Default cure period (days)", type: "text", required: true, placeholder: "e.g., 30" },
    ],
  },
  {
    label: "Insurance & Law",
    fields: [
      { name: "insuranceLimit", label: "Agency advertising liability insurance minimum amount ($)", type: "text", required: true, placeholder: "e.g., 1,000,000" },
      { name: "governingLaw", label: "Governing Law (State)", type: "text", required: true, placeholder: "e.g., California" },
    ],
  },
  {
    label: "Signatories",
    fields: [
      { name: "signedByAdvertiser", label: "Advertiser – Signatory Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "advertiserDate", label: "Advertiser – Signature Date", type: "date", required: true },
      { name: "signedByAgency", label: "Agency – Signatory Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "agencyDate", label: "Agency – Signature Date", type: "date", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const L = 16, W = 178, LH = 5.8;
  let y = 18;

  const ensure = (h = 10) => { if (y + h > 282) { doc.addPage(); y = 18; } };

  const heading = (text: string) => {
    ensure(14);
    doc.setFont("helvetica", "bold"); doc.setFontSize(11);
    doc.text(text, L, y); y += 2.5;
    doc.setDrawColor(80, 80, 80); doc.line(L, y, L + W, y); y += 4;
    doc.setFontSize(10.5);
  };

  const p = (text: string, bold = false, gap = 2) => {
    ensure(10);
    doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, W);
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };

  const bullet = (text: string) => {
    ensure(10);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, W - 10);
    doc.text("\u2022", L + 2, y); doc.text(lines, L + 10, y);
    y += lines.length * LH + 1.5;
  };

  const uf = (label: string, value?: string) => {
    ensure(8);
    doc.setFont("helvetica", "normal"); doc.setFontSize(10.5);
    doc.text(`${label}: `, L, y);
    const x = L + doc.getTextWidth(`${label}: `);
    const sv = (value || "").trim();
    if (sv) { doc.text(sv, x, y); doc.line(x, y + 1, x + Math.max(24, doc.getTextWidth(sv)), y + 1); }
    else { doc.text("________________________", x, y); }
    y += LH + 1.2;
  };

  // Title
  doc.setFont("helvetica", "bold"); doc.setFontSize(15);
  const title = "ADVERTISING AGENCY AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  doc.line(105 - doc.getTextWidth(title) / 2, y + 1.5, 105 + doc.getTextWidth(title) / 2, y + 1.5);
  y += 13;

  // Preamble
  p(`This Advertising Agency Agreement ("Agreement") is made and effective on ${v.effectiveDate || "___"} ("Effective Date"), by and between ${v.advertiserName || "___"} ("Advertiser") and ${v.agencyName || "___"} ("Agency").`);
  y += 2;

  // 1
  heading("1. LEGAL STATUS AND BUSINESS OF ADVERTISER");
  p(`The Advertiser is a ${v.advertiserEntityType || "___"} duly organized, validly existing, and in good standing under the laws of the State of ${v.advertiserState || "___"}. The Advertiser has its principal office and place of business at ${v.advertiserAddress || "___"}. The Advertiser is in the business of ${v.advertiserBusiness || "___"} and, in order to fully advertise such business, desires to obtain the assistance and representation of the Agency.`);

  // 2
  heading("2. LEGAL STATUS AND BUSINESS OF AGENCY");
  p(`The Agency is a ${v.agencyEntityType || "___"} duly organized under the laws of the State of ${v.agencyState || "___"}. The Agency has its principal office and place of business at ${v.agencyAddress || "___"}. The Agency is in the business of assisting and representing its clients on advertising matters, including the preparation of advertising material and the obtaining of media space or time to present such advertising. The Agency provides advertising agency services for a fee.`);
  p(`The Advertiser desires to engage the Agency to render, and the Agency desires to render to the Advertiser, certain advertising agency services, all as set forth herein.`);

  // 3
  heading("3. APPOINTMENT OF AGENCY");
  p(`The Advertiser agrees to retain and appoint the Agency to represent the Advertiser in carrying out the Advertiser's advertising program, subject to the terms and conditions of this Agreement.`);
  p(`NOW, THEREFORE, in consideration of the mutual agreements and covenants herein contained, the parties agree as follows:`);

  // 4
  heading("4. AGENCY SERVICES");
  p(`The Agency agrees to act as the Advertiser's advertising representative and to perform, upon authorization by the Advertiser, any or all of the following services, to the extent necessary to meet the Advertiser's needs:`);
  bullet(`(a) Study and analyze the Advertiser's business and products or services, and survey the market therefor.`);
  bullet(`(b) Develop an advertising program designed to meet the Advertiser's needs and budgetary limitations.`);
  bullet(`(c) Counsel the Advertiser on the overall merchandising program or make plans therefor.`);
  bullet(`(d) Determine and analyze the effect of the advertising used.`);
  bullet(`(e) Plan, create, write, and prepare layouts and the actual copy to be used in advertisements of all types.`);
  bullet(`(f) Analyze all advertising media to determine those which are most suitable for use by the Advertiser.`);
  bullet(`(g) Make contracts with the advertising media for space or time and with others to effectuate the advertising program and obtain the most favorable terms and rates available.`);
  bullet(`(h) Check and follow up on all contracts with the media for proper performance, including appearance, accuracy, date, time, position, size, extent, site, workmanship, and mechanical reproduction.`);
  bullet(`(i) Negotiate, arrange, and contract for any special talent required and for all photography, models, special effects, layouts, artwork, printing, engravings, electrotypes, typography, and other necessary technical materials.`);
  bullet(`(j) Make timely payments to all persons or firms supplying goods or services in connection with the advertising program.`);
  bullet(`(k) Advise and bill the Advertiser for all remittances made by the Agency for the Advertiser's account and maintain complete and accurate books and records.`);
  bullet(`(l) Cooperate with the Advertiser and the Advertiser's representatives regarding achieving the best possible tax advantages for advertising expenditures.`);
  bullet(`(m) Insert the appropriate copyright notice on all advertising material produced for publication.`);

  // 5
  heading("5. PRODUCTS");
  p(`The Agency's engagement shall relate to the following products and services of the Advertiser:`);
  p(v.productsCovered || "___");

  // 6
  heading("6. PRIOR APPROVAL OF THE ADVERTISER");
  p(`The Agency shall not incur any obligations or provide any services for the Advertiser's account without first obtaining written approval from the Advertiser or any authorized designee.`);
  p(`The Agency shall submit written proposals containing full descriptions of the proposed advertisements and estimates of all costs involved, including media costs, preparation costs, production costs, and additional expenses such as mailing, travel, and postage.`);

  // 7
  heading("7. EXCLUSIVITY");
  p(`The Agency shall be the exclusive advertising agency in the United States for the Advertiser with respect to ${v.exclusivityScope || "___"}.`);

  // 8
  heading("8. ADVERTISING COSTS AND EXPENDITURES");
  bullet(`(a) The Advertiser shall reimburse the Agency for all costs and expenditures made on behalf of the Advertiser for approved advertising.`);
  bullet(`(b) The Advertiser shall pay the Agency for direct costs including mailing, packaging, shipping, taxes, duties, telephones, and telegrams.`);
  bullet(`(c) The Advertiser shall pay for necessary travel performed on its behalf.`);
  bullet(`(d) If media or other charges increase or decline after submission of an estimate, the Advertiser shall pay the increase or receive credit for the reduction.`);

  // 9
  heading("9. AGENCY'S COMPENSATION");
  bullet(`(a) The Agency shall receive a commission of ${v.mediaCommissionPercent || "___"}% of the gross charges made by the advertising media for time or space used by the Advertiser, except for outdoor advertising, for which the commission shall be ${v.outdoorCommissionPercent || "___"}%.`);
  bullet(`(b) The Agency shall receive a commission of ${v.thirdPartyCommissionPercent || "___"}% of third-party charges for services contracted for implementation of approved advertising proposals.`);
  bullet(`(c) For items not compensated on a commission basis, the Advertiser shall pay the Agency on an hourly basis.`);
  bullet(`(d) For special projects, the Agency shall prepare cost estimates including outside services.`);

  // 10
  heading("10. TERM");
  p(`This Agreement shall begin on the Effective Date and shall remain in effect until terminated by either party.`);
  p(`The Agency shall begin providing the Services on ${v.servicesCommencementDate || "___"} ("Commencement Date").`);

  // 11
  heading("11. TERMINATION");
  p(`Either party may terminate this Agreement, with or without cause, upon ${v.terminationNoticeDays || "___"} days' written notice to the other party.`);
  p(`All existing obligations shall continue during the notice period.`);
  p(`The Agency shall not begin new work after termination notice but must complete already-approved work.`);
  p(`If either party seeks to terminate work already in progress, mutual consent and compensation terms must be agreed upon.`);

  // 12
  heading("12. ASSIGNMENT OF CONTRACTS");
  p(`The Agency shall assign to the Advertiser all rights in contracts and arrangements with third parties made for the Advertiser's account.`);
  p(`The Advertiser shall assume all obligations unless the contract is nonassignable.`);

  // 13
  heading("13. DISPOSITION OF PROPERTY AND MATERIALS");
  p(`All plans, sketches, copy, artwork, and materials produced under this Agreement shall become the property of the Advertiser upon payment.`);
  p(`Upon termination, materials remain the property of the Agency unless the Advertiser pays for them.`);

  // 14
  heading("14. COMPETITORS");
  p(`The Agency may accept work from other clients unless the work is competitive with the Advertiser's products or services.`);

  // 15
  heading("15. COST ESTIMATES");
  p(`The Agency shall not begin any work without estimating preparation and production costs and obtaining the Advertiser's approval.`);

  // 16
  heading("16. AUDIT RIGHTS");
  p(`The Advertiser may inspect all relevant contracts, accounts, and documents at the Advertiser's expense.`);

  // 17
  heading("17. OWNERSHIP AND USE");
  p(`The Advertiser owns all rights—including copyrights and other intellectual property rights—in materials created by the Agency for the Advertiser.`);

  // 18
  heading("18. DEFAULT");
  p(`If either party defaults on its obligations, written notice must be provided.`);
  p(`If the default is not cured within ${v.defaultCureDays || "___"} days, the non-defaulting party may terminate this Agreement.`);

  // 19
  heading("19. FORCE MAJEURE");
  p(`Performance shall be excused for events beyond the parties' control, including acts of God, fire, vandalism, riots, or national emergencies.`);
  p(`Obligations shall be suspended for the duration of the event.`);

  // 20
  heading("20. BILLING");
  bullet(`(a) The Agency shall bill according to AAAA standards and Agency forms.`);
  bullet(`(b) Bills may be preliminary, with final invoices to follow.`);
  bullet(`(c) Bills shall itemize commissions and adjustments.`);

  // 21
  heading("21. INDEMNIFICATION AND INSURANCE");
  p(`The Advertiser shall indemnify and hold the Agency harmless from claims arising from advertising covered by this Agreement.`);
  p(`The Agency shall maintain advertising liability insurance with limits of at least $${v.insuranceLimit || "___"}, naming the Advertiser as an additional insured.`);

  // 22
  heading("22. ARBITRATION");
  p(`Any disputes arising under this Agreement shall be resolved by binding arbitration under the Commercial Arbitration Rules.`);
  p(`Each party shall select one arbitrator; the two arbitrators selected shall appoint a third.`);
  p(`The arbitrators shall not modify contract terms or award punitive damages.`);
  p(`The arbitration decision shall be final and binding.`);

  // 23
  heading("23. ENTIRE AGREEMENT");
  p(`This Agreement contains the entire understanding of the parties and supersedes all prior agreements concerning the subject matter.`);

  // 24
  heading("24. SEVERABILITY");
  p(`If any provision is found invalid, the remainder of this Agreement shall continue in effect.`);
  p(`The invalid provision shall be interpreted to the maximum extent permissible to render it enforceable.`);

  // 25
  heading("25. GOVERNING LAW");
  p(`This Agreement shall be governed by the laws of ${v.governingLaw || "___"}.`);

  // 26
  heading("26. ATTORNEYS' FEES");
  p(`The prevailing party in any action to enforce this Agreement shall be entitled to reasonable attorneys' fees.`);

  // 27
  heading("27. SIGNATORIES");
  p(`This Agreement shall be signed by ${v.signedByAdvertiser || "___"} and by ${v.signedByAgency || "___"} and shall be effective as of the date first written above.`);
  y += 4;

  ensure(30);
  doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
  doc.text("The Advertiser:", L, y); y += LH + 1;
  uf("Signature", v.signedByAdvertiser);
  uf("Date", v.advertiserDate);
  y += 4;
  doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
  doc.text("The Agency:", L, y); y += LH + 1;
  uf("Signature", v.signedByAgency);
  uf("Date", v.agencyDate);

  doc.save("advertising_agency_agreement.pdf");
};

export default function AdvertisingAgency() {
  return <FormWizard steps={steps} title="Advertising Agency Agreement" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="advertisingagency" />;
}