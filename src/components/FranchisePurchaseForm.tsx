import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  { label: "Franchise Terms", fields: [
    { name: "franchisor", label: "Franchisor", type: "text", required: true },
    { name: "franchisee", label: "Franchisee", type: "text", required: true },
    { name: "franchiseFee", label: "Franchise fee", type: "text", required: false },
    { name: "initialFranchiseFee", label: "Initial franchise fee", type: "text", required: false },
    { name: "trainingDays", label: "Training days", type: "text", required: false },
    { name: "onsiteSupportDays", label: "On-site support days", type: "text", required: false },
    { name: "royaltyPercent", label: "Monthly royalty %", type: "text", required: false },
    { name: "termYears", label: "Term years", type: "text", required: false },
    { name: "abandonmentDays", label: "Abandonment days", type: "text", required: false },
    { name: "paymentDefaultDays", label: "Payment default cure days", type: "text", required: false },
    { name: "stateLaw", label: "Governing law state", type: "text", required: true },
    { name: "jurisdictionState", label: "Jurisdiction state", type: "text", required: false },
    { name: "sellerSignDate", label: "Seller sign date", type: "date", required: false },
    { name: "buyerSignDate", label: "Buyer sign date", type: "date", required: false },
  ]},
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w=210,m=16,tw=w-m*2,lh=5.5,limit=280; let y=20;
  const u=(v?:string,min=14)=>(v||"").trim()||" ".repeat(min);
  const p=(t:string,b=false,g=1.8)=>{const lines=doc.splitTextToSize(t,tw);if(y+lines.length*lh+g>limit){doc.addPage();y=20;}doc.setFont("helvetica",b?"bold":"normal");doc.text(lines,m,y);y+=lines.length*lh+g;};
  const uf=(l:string,v?:string,min=20)=>{const s=(v||"").trim(),lt=`${l}: `;if(y+lh+1.8>limit){doc.addPage();y=20;}doc.text(lt,m,y);const x=m+doc.getTextWidth(lt);if(s){doc.text(s,x,y);doc.line(x,y+1.1,x+Math.max(14,doc.getTextWidth(s)),y+1.1);}else{doc.line(x,y+1.1,x+doc.getTextWidth(" ".repeat(min)),y+1.1);}y+=lh+1.8;};
  doc.setFont("helvetica","bold");doc.setFontSize(13);const title="FRANCHISE PURCHASE AGREEMENT";doc.text(title,w/2,y,{align:"center"});const tW=doc.getTextWidth(title);doc.line(w/2-tW/2,y+1.1,w/2+tW/2,y+1.1);y+=9;doc.setFontSize(10.5);
  p(`This Franchise Purchase Agreement is entered between Franchisor ${u(values.franchisor,12)} and Franchisee ${u(values.franchisee,12)} under the terms below.`,false,3);
  p("1. Basis for Agreement",true); p("Franchisor grants rights to develop/operate franchises under marks and licensed methods; Franchisee desires to operate at designated/mutually approved location.");
  p("2. Grant of Franchise",true); p("Franchisor grants exclusive right to use marks and licensed methods for operation at approved location under operations manual and standards.");
  p("3. Franchise Fee",true); p(`Franchise fee: $${u(values.franchiseFee,8)} (non-refundable except as expressly provided).`);
  p("4. Franchised Location and Designated Area",true); p("Grant is for single franchise unless further written consent.");
  p("5. Initial Franchise Fee",true); p(`Initial franchise fee: $${u(values.initialFranchiseFee,8)} for rights to establish/operate franchise.`);
  p("6. Training",true); p(`Franchisor provides initial training of ${u(values.trainingDays,3)} days and may modify/reschedule reasonably.`);
  p("7. Development Assistance",true); p(`Franchisor provides approved supplier list, advertising plan/materials, and on-site support for ${u(values.onsiteSupportDays,3)} days.`);
  p("8. Operations Manual",true); p("Franchisor loans operations manual/technical bulletins/proprietary materials; Franchisee must maintain confidentiality.");
  p("9. Royalties",true); p(`Monthly royalty is ${u(values.royaltyPercent,4)}% of gross retail sales during term.`);
  p("10-12. Advertising, Quality Control, Term",true); p(`Advertising requires Franchisor prior written approval; strict compliance with standards/inspections required; term is ${u(values.termYears,4)} years unless earlier termination.`);
  p("13. Default and Termination",true); p(`Franchisor may terminate for abandonment of ${u(values.abandonmentDays,4)} days, non-payment uncured within ${u(values.paymentDefaultDays,4)} days after notice, or other material uncured breaches.`);
  p("14-20. Restrictive Covenants, Insurance, Law, Fees, Set-Off",true); p(`Franchisee non-compete applies during term; required insurances maintained with Franchisor as additional insured; governing law ${u(values.stateLaw,10)} with exclusive jurisdiction in ${u(values.jurisdictionState,10)}; prevailing party attorneys' fees; no right of set-off.`);
  p("Signatories",true);
  p("Seller: [Signature] ___________________"); uf("Date", values.sellerSignDate, 14);
  p("Buyer: [Signature] ___________________"); uf("Date", values.buyerSignDate, 14);
  doc.save("franchise_purchase_agreement.pdf");
};

export default function FranchisePurchaseForm() {
  return <FormWizard steps={steps} title="Franchise Purchase Agreement" subtitle="Complete each step to generate your document" onGenerate={generatePDF} documentType="franchisepurchase" />;
}
