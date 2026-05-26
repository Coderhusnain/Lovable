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
      { name: "equipmentDescription", label: "Equipment description / Exhibit A", type: "textarea", required: true },
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "leaseTerm", label: "Lease Term / termination date", type: "text", required: true },
    ],
  },
  {
    label: "Payments",
    fields: [
      { name: "rentalRate", label: "Rental rate (e.g. $___ per ___)", type: "text", required: true },
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
      { name: "taxesFees", label: "Taxes / fees notes", type: "textarea", required: false },
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
  const w = 210;
  const m = 18;
  const tw = w - m * 2;
  const lh = 6;
  const limit = 280;
  let y = 20;

  const u = (v?: string, min = 20) => (v && v.trim() ? v.trim() : "_".repeat(min));

  const p = (text: string, bold = false, gap = 2) => {
    const lines = doc.splitTextToSize(text, tw);
    if (y + lines.length * lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  const uf = (label: string, value?: string, min = 30, gap = 2) => {
    if (y + lh + gap > limit) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "normal");
    const labelText = `${label}: `;
    doc.text(labelText, m, y);
    const startX = m + doc.getTextWidth(labelText);
    const shown = (value || "").trim();
    if (shown) {
      doc.text(shown, startX, y);
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + Math.max(20, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.setLineWidth(0.22);
      doc.line(startX, y + 1.1, startX + doc.getTextWidth("_".repeat(min)), y + 1.1);
    }
    y += lh + gap;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "EQUIPMENT LEASE AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  y += 8;

  p(`This Equipment Lease Agreement (“Lease”) is made and entered into as of ${u(values.effectiveDate,12)} (“Effective Date”), by and between:`);
  p(`Lessor: ${u(values.lessorName,20)}, of ${u(values.lessorAddress,30)}`);
  p(`and`);
  p(`Lessee: ${u(values.lesseeName,20)}, of ${u(values.lesseeAddress,30)}`);
  p(`Collectively referred to as the “Parties.”`);

  p("1. EQUIPMENT SUBJECT TO LEASE", true);
  p(`Lessor hereby leases to Lessee the equipment described in Exhibit A attached hereto and incorporated herein by reference (the “Equipment”).`);

  p("2. TERM", true);
  p(`This Lease shall commence on the Effective Date and shall terminate on ${u(values.leaseTerm,20)} (“Lease Term”), unless earlier terminated in accordance with this Lease.`);

  p("3. RENTAL PAYMENTS", true);
  p(`3.1 Lessee shall pay rental charges at the rate of ${u(values.rentalRate,20)} of use.`);
  p("3.2 All rental charges shall accrue from the Effective Date until the Equipment is returned to Lessor.");
  p("3.3 The total amount due shall be payable upon return of the Equipment, unless otherwise agreed in writing.");

  p("4. LATE CHARGES", true);
  p(`If any payment is not received within ${u(values.lateDays,6)} days after its due date, Lessee shall pay a late service charge of ${u(values.lateFee,12)}.`);

  p("5. RETURNED PAYMENTS", true);
  p(`Lessee shall pay a fee of ${u(values.returnedFee,12)} for each payment returned due to insufficient funds.`);

  p("6. SECURITY DEPOSIT", true);
  p(`6.1 Upon execution of this Lease, Lessee shall pay a security deposit of ${u(values.securityDeposit,12)}.`);
  p("6.2 The security deposit may be applied by Lessor toward unpaid charges, damages, or other obligations.");
  p("6.3 Any remaining balance shall be refunded upon termination of this Lease.");
  p(`6.4 The security deposit shall accrue interest at an annual rate of ${u(values.securityInterestRate,4)}%, calculated from the date received until refunded.`);

  p("7. ACCEPTANCE OF EQUIPMENT", true);
  p("Lessee shall inspect the Equipment upon delivery and promptly notify Lessor of any discrepancies or defects. Failure to provide written notice prior to acceptance shall constitute conclusive acceptance of the Equipment as described in Exhibit A.");

  p("8. OWNERSHIP AND TITLE", true);
  p("8.1 The Equipment shall remain personal property at all times.");
  p("8.2 Title to the Equipment shall remain vested in Lessor unless expressly transferred by written agreement.");
  p("8.3 Lessee shall promptly notify Lessor of any lien, claim, levy, or legal process affecting the Equipment.");

  p("9. DISCLAIMER OF WARRANTIES", true);
  p("The Equipment is leased on an “AS IS” and “WHERE IS” basis. Lessor makes no warranties, express or implied, including any warranty of merchantability or fitness for a particular purpose.");

  p("10. RISK OF LOSS", true);
  p("Lessee assumes all risk of loss, theft, destruction, or damage to the Equipment from any cause during the Lease Term and shall return the Equipment in substantially the same condition, reasonable wear and tear excepted.");

  p("11. DAMAGE OR LOSS", true);
  p("In the event of loss or damage, Lessor may require Lessee to: (a) Repair the Equipment to good working condition; or (b) Replace the Equipment with comparable equipment acceptable to Lessor, which shall become the property of Lessor.");

  p("12. LIABILITY AND INDEMNIFICATION", true);
  p(`12.1 Lessee assumes full responsibility for any injury, disability, death, or property damage arising from the possession, use, operation, or transportation of the Equipment.`);
  p("12.2 Lessee shall indemnify and hold harmless Lessor from all claims, damages, liabilities, and expenses, including reasonable attorney’s fees.");
  p(`12.3 Lessee shall maintain liability insurance in an amount not less than ${u(values.liabilityInsurance,12)}.`);

  p("13. CASUALTY INSURANCE", true);
  p(`Lessee shall maintain insurance coverage on the Equipment in an amount not less than ${u(values.casualtyInsurance,12)}, naming Lessor as loss payee where applicable.`);

  p("14. TAXES AND FEES", true);
  p("Lessee shall be responsible for all taxes, assessments, license fees, and registration fees relating to the Equipment during the Lease Term.");

  p("15. LOCATION AND USE", true);
  p(`15.1 The Equipment shall be located at: ${u(values.location,30)}.`);
  p("15.2 Equipment shall not be relocated without Lessor’s prior written consent.");
  p("15.3 Lessee shall operate and maintain the Equipment in compliance with all applicable laws and regulations.");

  p("16. MAINTENANCE AND ALTERATIONS", true);
  p("16.1 Lessee shall maintain the Equipment in good operating condition at its own expense.");
  p("16.2 Lessee shall not make alterations without Lessor’s prior written consent.");
  p("16.3 Any approved alterations shall become the property of Lessor.");

  p("17. INSPECTION", true);
  p("Lessor shall have the right to inspect the Equipment during normal business hours upon reasonable notice.");

  p("18. RETURN OF EQUIPMENT", true);
  p("Upon expiration or termination of this Lease, Lessee shall return the Equipment to Lessor at Lessee’s expense.");

  p("19. DEFAULT", true);
  p("The following shall constitute events of default: (a) Failure to make required payments; (b) Breach of any provision not cured within ____ days after written notice; (c) Insolvency or bankruptcy of Lessee; (d) Seizure or levy upon Lessee’s property affecting the Equipment.");

  p("20. REMEDIES", true);
  p("Upon default, Lessor may repossess the Equipment without notice where permitted by law and recover all associated costs, including attorney’s fees. Lessor’s remedies shall be cumulative and in addition to those available at law.");

  p("21. ASSIGNMENT", true);
  p("Lessee shall not assign, sublease, or permit use of the Equipment by third parties without Lessor’s prior written consent.");

  p("22. DISPUTE RESOLUTION", true);
  p("The Parties shall attempt to resolve disputes through good faith negotiation. If unresolved, disputes shall be submitted to mediation in accordance with applicable mediation rules before pursuing further legal remedies.");

  p("23. NOTICES", true);
  p("All notices shall be in writing and delivered personally or by prepaid mail to the addresses set forth above.");

  p("24. ENTIRE AGREEMENT", true);
  p("This Lease constitutes the entire agreement between the Parties and supersedes all prior agreements or understandings.");

  p("25. AMENDMENTS", true);
  p("No amendment shall be valid unless in writing and signed by both Parties.");

  p("26. GOVERNING LAW", true);
  p(`This Lease shall be governed by the laws of ${u(values.governingLaw,20)}.`);

  p("27. SEVERABILITY", true);
  p("If any provision is held invalid, the remaining provisions shall remain in full force and effect.");

  p("28. WAIVER", true);
  p("Failure to enforce any provision shall not constitute a waiver of future enforcement.");

  p("29. OPTION TO RENEW", true);
  p("If Lessee is not in default, Lessee may renew this Lease upon mutually agreed terms.");

  p("30. OPTION TO PURCHASE", true);
  p("If Lessee is not in default, Lessee may purchase the Equipment at the price specified in Exhibit A by providing written notice at least ____ days prior to expiration of the Lease Term.");

  p("31. EXECUTION", true);
  p("This Lease shall be effective as of the Effective Date upon execution by both Parties.");

  p("LESSOR:");
  uf("Signature", values.lessorSignature, 30);
  uf("Date", values.lessorDate, 12);

  p("LESSEE:");
  uf("Signature", values.lesseeSignature, 30);
  uf("Date", values.lesseeDate, 12);

  doc.save("equipment_lease_agreement.pdf");
};

export default function EquipmentLeaseAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Equipment Lease Agreement"
      subtitle="Create an equipment lease agreement and export as PDF"
      onGenerate={generatePDF}
      documentType="equipment-lease-agreement"
    />
  );
}
