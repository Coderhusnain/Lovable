import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Parties", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "institutionName", label: "Institution", type: "text", required: true },
    { name: "sponsorName", label: "Sponsor", type: "text", required: true },
    { name: "product", label: "Product", type: "text", required: false },
    { name: "drugDevice", label: "Drug/Device", type: "text", required: false },
    { name: "protocolTitle", label: "Protocol title", type: "text", required: false },
    { name: "principalInvestigator", label: "Principal investigator", type: "text", required: false },
    { name: "startDate", label: "Start date", type: "date", required: false },
    { name: "endDate", label: "End date", type: "date", required: false },
    { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: false },
    { name: "paymentAmount", label: "Payment amount", type: "text", required: false },
    { name: "confidentialityPeriod", label: "Confidentiality period", type: "text", required: false },
    { name: "governingState", label: "Governing law state", type: "text", required: true },
  ]},
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w=210,m=16,tw=w-m*2,lh=5.5,limit=280; let y=20;
  const u=(v?:string,min=14)=>(v||"").trim()||" ".repeat(min);
  const p=(t:string,b=false,g=1.8)=>{const lines=doc.splitTextToSize(t,tw);if(y+lines.length*lh+g>limit){doc.addPage();y=20;}doc.setFont("helvetica",b?"bold":"normal");doc.text(lines,m,y);y+=lines.length*lh+g;};
  doc.setFont("helvetica","bold");doc.setFontSize(13);const title="CLINICAL TRIAL AGREEMENT";doc.text(title,w/2,y,{align:"center"});const twd=doc.getTextWidth(title);doc.line(w/2-twd/2,y+1.1,w/2+twd/2,y+1.1);y+=9;doc.setFontSize(10.5);
  p(`This Clinical Trial Agreement is effective ${u(values.effectiveDate,12)} by and between ${u(values.institutionName,12)} ("Institution") and ${u(values.sponsorName,12)} ("Sponsor").`,false,3);
  p(`Sponsor develops/commercializes ${u(values.product,10)}. Institution will conduct a Trial of Sponsor's ${u(values.drugDevice,10)} under protocol "${u(values.protocolTitle,12)}" (Exhibit A). ${u(values.principalInvestigator,10)} serves as Principal Investigator.`);
  p("2. Scope of Work and Term",true);
  p(`Investigator shall conduct Trial under GCP, 21 CFR, approved Protocol, Sponsor instructions, and all applicable laws. Term runs from ${u(values.startDate,12)} to ${u(values.endDate,12)} unless earlier terminated by ${u(values.terminationNoticeDays,4)} days written notice.`);
  p("3. Payment and Confidentiality",true);
  p(`Sponsor pays Institution $${u(values.paymentAmount,8)} upon completion; delayed payment includes collection costs/attorneys' fees.`);
  p(`Institution shall not disclose Sponsor confidential information except reasonably necessary for trial conduct; confidentiality survives for ${u(values.confidentialityPeriod,8)} after termination/expiry, with customary exceptions (prior knowledge, independent development, public domain).`);
  p("Publication of trial results/confidential information requires Sponsor prior written consent except where required by law.");
  p("4. Proprietary and Invention Rights",true);
  p("Ownership of inventions follows applicable patent law. Data generated from Trial belongs to Institution; Sponsor receives non-exclusive, royalty-free, worldwide license to use data for lawful purposes. Sponsor-owned deliverables remain Sponsor property.");
  p("5. Indemnification and Subject Injury",true);
  p("Sponsor shall indemnify and hold harmless Institution from claims/property damage arising from trial performance. Sponsor bears reasonable medical/hospital costs for adverse effects directly attributable to investigational product/study procedures.");
  p("6. General Provisions",true);
  p(`Use of name/logo/trademark requires prior written consent except where required by law. Governing law: ${u(values.governingState,10)}. Amendments require signed writing. No assignment without Sponsor consent. Prevailing party may recover attorneys' fees and costs.`);
  p("SIGNATORIES",true);
  p("For the Institution: Name/Title/Institution/Date/Signature lines.");
  p("For the Sponsor: Name/Title/Company/Date/Signature lines.");
  doc.save("clinical_trial_agreement.pdf");
};

export default function ClinicalTrialAgreementForm() {
  return <FormWizard steps={steps} title="Clinical Trial Agreement" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="clinicaltrialagreement" />;
}
