import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Parties", fields: [
    { name: "effectiveDate", label: "Effective date", type: "date", required: true },
    { name: "advertiserName", label: "Advertiser", type: "text", required: true },
    { name: "agencyName", label: "Agency", type: "text", required: true },
    { name: "stateLaw", label: "State law", type: "text", required: true },
    { name: "products", label: "Products/services covered", type: "text", required: false },
    { name: "exclusiveScope", label: "Exclusivity scope", type: "text", required: false },
    { name: "commissionMedia", label: "Media commission %", type: "text", required: false },
    { name: "commissionOutdoor", label: "Outdoor commission %", type: "text", required: false },
    { name: "terminationNoticeDays", label: "Termination notice days", type: "text", required: false },
    { name: "commencementDate", label: "Commencement date", type: "date", required: false },
  ]},
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w=210,m=16,tw=w-m*2,lh=5.5,limit=280; let y=20;
  const u=(v?:string,min=14)=>(v||"").trim()||" ".repeat(min);
  const p=(t:string,b=false,g=1.8)=>{const lines=doc.splitTextToSize(t,tw);if(y+lines.length*lh+g>limit){doc.addPage();y=20;}doc.setFont("helvetica",b?"bold":"normal");doc.text(lines,m,y);y+=lines.length*lh+g;};
  doc.setFont("helvetica","bold");doc.setFontSize(13);const title="ADVERTISING AGENCY AGREEMENT";doc.text(title,w/2,y,{align:"center"});const tW=doc.getTextWidth(title);doc.line(w/2-tW/2,y+1.1,w/2+tW/2,y+1.1);y+=9;doc.setFontSize(10.5);
  p(`This Advertising Agency Agreement is effective ${u(values.effectiveDate,12)} by and between ${u(values.advertiserName,12)} ("Advertiser") and ${u(values.agencyName,12)} ("Agency").`,false,3);
  p("1-3. Legal Status and Appointment",true);
  p(`Advertiser and Agency are duly organized and in good standing under ${u(values.stateLaw,10)}. Advertiser appoints Agency to represent and carry out its advertising program under this Agreement.`);
  p("4. Agency Services",true);
  p("Agency may analyze business/market, design budget-aligned advertising programs, prepare copy/layouts, select media, negotiate media/third-party contracts, monitor contract performance, arrange production/talent, make timely payments, maintain records/billing, support tax-efficient planning, and include copyright notices.");
  p("5. Products",true); p(`Agency engagement applies to: ${u(values.products,12)}.`);
  p("6. Prior Approval",true); p("Agency shall not incur obligations for Advertiser without prior written approval and written proposals including full descriptions and cost estimates.");
  p("7. Exclusivity",true); p(`Agency is exclusive U.S. advertising agency for: ${u(values.exclusiveScope,10)}.`);
  p("8-9. Costs and Compensation",true);
  p(`Advertiser reimburses approved costs/expenditures. Agency compensation includes ${u(values.commissionMedia,4)}% media commission (except outdoor at ${u(values.commissionOutdoor,4)}%), plus commission on third-party charges and hourly billing/special project estimates where applicable.`);
  p("10-12. Term, Termination, Assignment",true);
  p(`Agreement begins Effective Date; services commence ${u(values.commencementDate,12)}; either party may terminate with ${u(values.terminationNoticeDays,4)} days written notice. Existing obligations continue during notice period. Agency assigns rights in third-party contracts to Advertiser where permissible.`);
  p("13-27. Additional Provisions",true);
  p(`Covers disposition/ownership of materials, competitor restrictions, cost-estimate controls, audit rights, ownership/use of IP, default and cure, force majeure, billing, indemnification/insurance, arbitration, entire agreement, severability, governing law (${u(values.stateLaw,10)}), attorneys' fees, and signatories.`);
  p("The Advertiser: __________________________ Date: ______");
  p("The Agency: __________________________ Date: ______");
  doc.save("advertising_agency_agreement.pdf");
};

export default function AdvertisingAgencyAgreementForm() {
  return <FormWizard steps={steps} title="Advertising Agency Agreement" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="advertisingagencyagreement" />;
}
