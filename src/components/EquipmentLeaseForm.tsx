import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "lessorName", label: "Lessor name", type: "text", required: true },
      { name: "lessorAddress", label: "Lessor address", type: "text", required: true },
      { name: "lesseeName", label: "Lessee name", type: "text", required: true },
      { name: "lesseeAddress", label: "Lessee address", type: "text", required: true },
    ],
  },
  {
    label: "Equipment & Term",
    fields: [
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "leaseTerm", label: "Lease Term / termination date", type: "text", required: true },
      { name: "equipmentDescription", label: "Equipment description / Exhibit A", type: "textarea", required: true },
      { name: "equipmentLocation", label: "Equipment location", type: "text", required: false },
    ],
  },
  {
    label: "Payments",
    fields: [
      { name: "rentalRate", label: "Rental rate", type: "text", required: true },
      { name: "rentalPeriod", label: "Rental period", type: "text", required: true },
      { name: "lateDays", label: "Late days before charge", type: "text", required: false },
      { name: "lateFee", label: "Late service charge", type: "text", required: false },
      { name: "returnedFee", label: "Returned payment fee", type: "text", required: false },
      { name: "securityDeposit", label: "Security deposit amount", type: "text", required: false },
      { name: "securityInterestRate", label: "Security deposit interest rate (%)", type: "text", required: false },
    ],
  },
  {
    label: "Insurance & Liability",
    fields: [
      { name: "liabilityInsurance", label: "Liability insurance amount", type: "text", required: false },
      { name: "casualtyInsurance", label: "Casualty insurance amount", type: "text", required: false },
      { name: "governingLaw", label: "Governing law", type: "text", required: false },
      { name: "cureDays", label: "Days to cure breach", type: "text", required: false },
      { name: "purchaseNoticeDays", label: "Days before purchase notice", type: "text", required: false },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "lessorSignature", label: "Lessor signature (printed name)", type: "text", required: true },
      { name: "lessorDate", label: "Lessor date", type: "date", required: true },
      { name: "lesseeSignature", label: "Lessee signature (printed name)", type: "text", required: true },
      { name: "lesseeDate", label: "Lessee date", type: "date", required: true },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 18;
  const textWidth = pageWidth - margin * 2;
  const lineHeight = 6;
  const pageBottom = 280;
  let y = 20;

  const valueOrBlank = (value?: string, minLength = 20) => (value && value.trim() ? value.trim() : "_".repeat(minLength));

  const paragraph = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, textWidth);
    if (y + lines.length * lineHeight + gap > pageBottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gap;
  };

  const fieldLine = (label: string, value?: string, minLength = 30, gap = 2) => {
    if (y + lineHeight + gap > pageBottom) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "normal");
    const labelText = `${label}: `;
    doc.text(labelText, margin, y);
    const startX = margin + doc.getTextWidth(labelText);
    const shown = (value || "").trim();
    if (shown) {
      doc.text(shown, startX, y);
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + Math.max(20, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + doc.getTextWidth("_".repeat(minLength)), y + 1.1);
    }
    y += lineHeight + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("EQUIPMENT LEASE AGREEMENT", pageWidth / 2, y, { align: "center" });
  y += 8;

  paragraph(`This Equipment Lease Agreement ("Lease") is made and entered into as of ${valueOrBlank(values.effectiveDate, 12)} ("Effective Date"), by and between:`);
  paragraph(`Lessor: ${valueOrBlank(values.lessorName, 20)}, of ${valueOrBlank(values.lessorAddress, 30)}`);
  paragraph("and");
  paragraph(`Lessee: ${valueOrBlank(values.lesseeName, 20)}, of ${valueOrBlank(values.lesseeAddress, 30)}`);
  paragraph('Collectively referred to as the "Parties."');

  paragraph("1. EQUIPMENT SUBJECT TO LEASE", true);
  paragraph(`Lessor hereby leases to Lessee the equipment described in Exhibit A attached hereto and incorporated herein by reference (the "Equipment").`);

  paragraph("2. TERM", true);
  paragraph(`This Lease shall commence on the Effective Date and shall terminate on ${valueOrBlank(values.leaseTerm, 20)} ("Lease Term"), unless earlier terminated in accordance with this Lease.`);

  paragraph("3. RENTAL PAYMENTS", true);
  paragraph(`3.1 Lessee shall pay rental charges at the rate of ${valueOrBlank(values.rentalRate, 14)} per ${valueOrBlank(values.rentalPeriod, 10)} of use.`);
  paragraph("3.2 All rental charges shall accrue from the Effective Date until the Equipment is returned to Lessor.");
  paragraph("3.3 The total amount due shall be payable upon return of the Equipment, unless otherwise agreed in writing.");

  paragraph("4. LATE CHARGES", true);
  paragraph(`If any payment is not received within ${valueOrBlank(values.lateDays, 6)} days after its due date, Lessee shall pay a late service charge of ${valueOrBlank(values.lateFee, 12)}.`);

  paragraph("5. RETURNED PAYMENTS", true);
  paragraph(`Lessee shall pay a fee of ${valueOrBlank(values.returnedFee, 12)} for each payment returned due to insufficient funds.`);

  paragraph("6. SECURITY DEPOSIT", true);
  paragraph(`6.1 Upon execution of this Lease, Lessee shall pay a security deposit of ${valueOrBlank(values.securityDeposit, 12)}.`);
  paragraph("6.2 The security deposit may be applied by Lessor toward unpaid charges, damages, or other obligations.");
  paragraph("6.3 Any remaining balance shall be refunded upon termination of this Lease.");
  paragraph(`6.4 The security deposit shall accrue interest at an annual rate of ${valueOrBlank(values.securityInterestRate, 4)}%, calculated from the date received until refunded.`);

  paragraph("7. ACCEPTANCE OF EQUIPMENT", true);
  paragraph("Lessee shall inspect the Equipment upon delivery and promptly notify Lessor of any discrepancies or defects. Failure to provide written notice prior to acceptance shall constitute conclusive acceptance of the Equipment as described in Exhibit A.");

  paragraph("8. OWNERSHIP AND TITLE", true);
  paragraph("8.1 The Equipment shall remain personal property at all times.");
  paragraph("8.2 Title to the Equipment shall remain vested in Lessor unless expressly transferred by written agreement.");
  paragraph("8.3 Lessee shall promptly notify Lessor of any lien, claim, levy, or legal process affecting the Equipment.");

  paragraph("9. DISCLAIMER OF WARRANTIES", true);
  paragraph('The Equipment is leased on an "AS IS" and "WHERE IS" basis. Lessor makes no warranties, express or implied, including any warranty of merchantability or fitness for a particular purpose.');

  paragraph("10. RISK OF LOSS", true);
  paragraph("Lessee assumes all risk of loss, theft, destruction, or damage to the Equipment from any cause during the Lease Term and shall return the Equipment in substantially the same condition, reasonable wear and tear excepted.");

  paragraph("11. DAMAGE OR LOSS", true);
  paragraph("In the event of loss or damage, Lessor may require Lessee to: (a) Repair the Equipment to good working condition; or (b) Replace the Equipment with comparable equipment acceptable to Lessor, which shall become the property of Lessor.");

  paragraph("12. LIABILITY AND INDEMNIFICATION", true);
  paragraph("12.1 Lessee assumes full responsibility for any injury, disability, death, or property damage arising from the possession, use, operation, or transportation of the Equipment.");
  paragraph("12.2 Lessee shall indemnify and hold harmless Lessor from all claims, damages, liabilities, and expenses, including reasonable attorney's fees.");
  paragraph(`12.3 Lessee shall maintain liability insurance in an amount not less than ${valueOrBlank(values.liabilityInsurance, 12)}.`);

  paragraph("13. CASUALTY INSURANCE", true);
  paragraph(`Lessee shall maintain insurance coverage on the Equipment in an amount not less than ${valueOrBlank(values.casualtyInsurance, 12)}, naming Lessor as loss payee where applicable.`);

  paragraph("14. TAXES AND FEES", true);
  paragraph("Lessee shall be responsible for all taxes, assessments, license fees, and registration fees relating to the Equipment during the Lease Term.");

  paragraph("15. LOCATION AND USE", true);
  paragraph(`15.1 The Equipment shall be located at: ${valueOrBlank(values.equipmentLocation, 30)}.`);
  paragraph("15.2 Equipment shall not be relocated without Lessor's prior written consent.");
  paragraph("15.3 Lessee shall operate and maintain the Equipment in compliance with all applicable laws and regulations.");

  paragraph("16. MAINTENANCE AND ALTERATIONS", true);
  paragraph("16.1 Lessee shall maintain the Equipment in good operating condition at its own expense.");
  paragraph("16.2 Lessee shall not make alterations without Lessor's prior written consent.");
  paragraph("16.3 Any approved alterations shall become the property of Lessor.");

  paragraph("17. INSPECTION", true);
  paragraph("Lessor shall have the right to inspect the Equipment during normal business hours upon reasonable notice.");

  paragraph("18. RETURN OF EQUIPMENT", true);
  paragraph("Upon expiration or termination of this Lease, Lessee shall return the Equipment to Lessor at Lessee's expense.");

  paragraph("19. DEFAULT", true);
  paragraph(`The following shall constitute events of default: (a) Failure to make required payments; (b) Breach of any provision not cured within ${valueOrBlank(values.cureDays, 6)} days after written notice; (c) Insolvency or bankruptcy of Lessee; (d) Seizure or levy upon Lessee's property affecting the Equipment.`);

  paragraph("20. REMEDIES", true);
  paragraph("Upon default, Lessor may repossess the Equipment without notice where permitted by law and recover all associated costs, including attorney's fees. Lessor's remedies shall be cumulative and in addition to those available at law.");

  paragraph("21. ASSIGNMENT", true);
  paragraph("Lessee shall not assign, sublease, or permit use of the Equipment by third parties without Lessor's prior written consent.");

  paragraph("22. DISPUTE RESOLUTION", true);
  paragraph("The Parties shall attempt to resolve disputes through good faith negotiation. If unresolved, disputes shall be submitted to mediation in accordance with applicable mediation rules before pursuing further legal remedies.");

  paragraph("23. NOTICES", true);
  paragraph("All notices shall be in writing and delivered personally or by prepaid mail to the addresses set forth above.");

  paragraph("24. ENTIRE AGREEMENT", true);
  paragraph("This Lease constitutes the entire agreement between the Parties and supersedes all prior agreements or understandings.");

  paragraph("25. AMENDMENTS", true);
  paragraph("No amendment shall be valid unless in writing and signed by both Parties.");

  paragraph("26. GOVERNING LAW", true);
  paragraph(`This Lease shall be governed by the laws of ${valueOrBlank(values.governingLaw, 20)}.`);

  paragraph("27. SEVERABILITY", true);
  paragraph("If any provision is held invalid, the remaining provisions shall remain in full force and effect.");

  paragraph("28. WAIVER", true);
  paragraph("Failure to enforce any provision shall not constitute a waiver of future enforcement.");

  paragraph("29. OPTION TO RENEW", true);
  paragraph("If Lessee is not in default, Lessee may renew this Lease upon mutually agreed terms.");

  paragraph("30. OPTION TO PURCHASE", true);
  paragraph(`If Lessee is not in default, Lessee may purchase the Equipment at the price specified in Exhibit A by providing written notice at least ${valueOrBlank(values.purchaseNoticeDays, 6)} days prior to expiration of the Lease Term.`);

  paragraph("31. EXECUTION", true);
  paragraph("This Lease shall be effective as of the Effective Date upon execution by both Parties.");

  paragraph("LESSOR:");
  fieldLine("Signature", values.lessorSignature, 30);
  fieldLine("Date", values.lessorDate, 12);

  paragraph("LESSEE:");
  fieldLine("Signature", values.lesseeSignature, 30);
  fieldLine("Date", values.lesseeDate, 12);

  doc.save("equipment_lease_agreement.pdf");
};

export default function EquipmentLeaseForm() {
  return (
    <FormWizard
      steps={steps}
      title="Equipment Lease Agreement"
      subtitle="Complete each step to generate your Equipment Lease Agreement"
      onGenerate={generatePDF}
      documentType="equipment-lease-agreement"
    />
  );
}