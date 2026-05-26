import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Lease Details",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "text", required: false },
      { name: "lessor", label: "Lessor", type: "text", required: false },
      { name: "lessee", label: "Lessee", type: "text", required: false },
      { name: "horseName", label: "Horse Name", type: "text", required: false },
      { name: "description", label: "Description", type: "textarea", required: false },
      { name: "termEnd", label: "Term End", type: "text", required: false },
      { name: "leaseFee", label: "Lease Fee (per month)", type: "text", required: false },
      { name: "paymentDay", label: "Payment Day (each month)", type: "text", required: false },
      { name: "stablingLocation", label: "Stabling Location", type: "textarea", required: false },
      { name: "insuranceValue", label: "Insurance Value", type: "text", required: false },
      { name: "governingLaw", label: "Governing Law", type: "text", required: false },
      { name: "lessorSignature", label: "Lessor Signature Name", type: "text", required: false },
      { name: "lesseeSignature", label: "Lessee Signature Name", type: "text", required: false },
    ],
  },
];

const v = (s?: string) => (s || "").trim();

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const width = 210;
  const margin = 16;
  const textWidth = width - margin * 2;
  const lineHeight = 5.2;
  let y = 18;

  const ensureSpace = (needed = 8) => {
    if (y + needed > 282) {
      doc.addPage();
      y = 18;
    }
  };

  const write = (content: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(content, textWidth);
    ensureSpace(lines.length * lineHeight + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  // Centered main title
  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const _title = "HORSE LEASE AGREEMENT";
  doc.text(_title, width / 2, y, { align: "center" });
  y += 10;

  // Write content exactly as in draft
  write("This Horse Lease Agreement (\u201cAgreement\u201d) is made and entered into on <insert date>(\u201cEffective Date\u201d), by and between:");
  write("Lessor: ____________________________");
  write("Lessee: ____________________________");
  write("Collectively referred to as the \u201cParties.\u201d");

  write("1. IDENTIFICATION OF ANIMAL");
  write("The Lessor hereby leases to the Lessee the horse described as follows:");
  write("Name: ____________________________");
  write("Description: ____________________________");
  write("(the \u201cHorse\u201d).");

  write("2. TERM OF LEASE");
  write("This Agreement shall commence on the Effective Date and shall remain in force until ______________________, unless earlier terminated in accordance with this Agreement.");

  write("3. LEASE FEE AND PAYMENT TERMS");
  write("3.1 The Lessee shall pay Lessor a lease fee of $---------per month for exclusive use of the Horse for riding and showing purposes.");
  write("3.2 Payments shall be due on the ______ day of each month and delivered to:");
  write("________________________________________");

  write("4. CARE, MAINTENANCE, AND STANDARDS");
  write("4.1 Lessee shall provide proper care and exercise good judgment in maintaining the Horse in good health and condition.");
  write("4.2 Lessee shall follow accepted standards of good husbandry, including but not limited to:");
  write("•\tRegular veterinary attention");
  write("•\tRequired vaccinations");
  write("•\tAdequate feed and water");
  write("•\tProper shelter and supervision");
  write("4.3 The Horse shall be maintained in condition comparable to its condition at the commencement of this Agreement, reasonable wear excepted.");

  write("5. EXPENSES");
  write("5.1 Lessee shall be solely responsible for all costs during the lease term, including but not limited to:");
  write("•\tBoarding");
  write("•\tFarrier services");
  write("•\tTransportation");
  write("•\tShow and competition expenses");
  write("5.2 Lessor shall remain responsible for regular veterinary care, except as otherwise provided herein.");
  write("5.3 All expenses incurred by Lessee shall be personal obligations of Lessee and shall not create any lien or claim against the Horse.");

  write("6. STABLING LOCATION");
  write("The Horse’s principal stable shall be located at:");
  write( v(values.stablingLocation) || "" );
  write("");
  write("Temporary relocation is permitted for shows or events, provided prior approval is obtained from Lessor for any permanent change in stabling location.");

  write("7. LIABILITY AND RELEASE");
  write("The Lessee assumes all risk associated with the Horse during the term of this Agreement.");
  write("The Lessor shall not be liable for any loss, injury, damage, claim, or expense arising from the Horse’s use, handling, or stabling, whether involving persons or animals.");
  write("Lessee hereby releases and holds harmless the Lessor from all related claims, including legal costs.");

  write("8. INSURANCE AND LOSS");
  write("8.1 The Horse is valued at $-------- and shall be insured by Lessee against death and theft for such amount.");
  write("8.2 Lessee shall maintain the insurance policy in full force and bear all premiums.");
  write("8.3 In the event of theft, death, or euthanasia while under Lessee’s care, insurance proceeds shall constitute full compensation to Lessor, provided proper veterinary care was administered and Lessor was promptly notified.");

  write("9. PRE-EXISTING CONDITIONS");
  write("Lessor shall not hold Lessee responsible for death or extraordinary veterinary treatment resulting from any medical conditions existing at the commencement of this Agreement.");

  write("10. OWNERSHIP");
  write("The Horse shall remain the sole and exclusive property of the Lessor.");
  write("Nothing in this Agreement shall transfer any ownership interest to Lessee except as expressly provided herein.");

  write("11. RIGHT OF FIRST REFUSAL");
  write("If during the lease term the Horse is offered for sale and a bona fide third-party offer is received, Lessee shall have the right to match such offer and purchase the Horse before acceptance of any other offer.");

  write("12. DEFAULT AND TERMINATION");
  write("Failure by Lessee to make payments or properly care for the Horse shall constitute default, entitling Lessor to immediate termination and repossession of the Horse.");

  write("13. GOVERNING LAW");
  write("This Agreement shall be governed by and construed in accordance with the laws of ____________________.");

  write("14. ENTIRE AGREEMENT");
  write("This Agreement constitutes the entire understanding between the Parties and may only be amended by written agreement signed by both Parties.");

  write("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");

  write("LESSEE:");
  write("Signature: ___________________________");
  write("Date: ___________________");
  write("LESSOR:");
  write("Signature: ___________________________");
  write("Date: ___________________");

  doc.save("horse_lease_agreement.pdf");
};

export default function HorseLeaseAgreementForm() {
  return <FormWizard steps={steps} title="HORSE LEASE AGREEMENT" subtitle="Complete the fields to generate the Horse Lease Agreement" onGenerate={generatePDF} documentType="horse-lease-agreement" />;
}
