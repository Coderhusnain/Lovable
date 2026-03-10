import { FormWizard, FieldDef } from "../FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Lease Terms",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "termEndDate", label: "Term end date", type: "date", required: true },
      { name: "lesseeName", label: "Lessee name", type: "text", required: true },
      { name: "lesseeAddress", label: "Lessee address", type: "text", required: true },
      { name: "lessorName", label: "Lessor name", type: "text", required: true },
      { name: "lessorAddress", label: "Lessor address", type: "text", required: true },
      { name: "organizationLaw", label: "Lessor organization law", type: "text", required: true },
      { name: "vehicleColor", label: "Vehicle color", type: "text", required: true },
      { name: "vehicleYear", label: "Vehicle year", type: "text", required: true },
      { name: "vehicleMake", label: "Vehicle make", type: "text", required: true },
      { name: "vehicleModel", label: "Vehicle model", type: "text", required: true },
      { name: "vehicleBodyStyle", label: "Vehicle body style", type: "text", required: true },
      { name: "licensePlate", label: "License plate", type: "text", required: true },
      { name: "vin", label: "VIN", type: "text", required: true },
      { name: "leaseTotalCost", label: "Total cost of lease", type: "text", required: true },
      { name: "monthlyPayment", label: "Total monthly payment", type: "text", required: true },
      { name: "paymentDay", label: "Payment day of month", type: "text", required: true },
      { name: "lateFee", label: "Late fee", type: "text", required: true },
      { name: "extraMileCharge", label: "Per extra mile charge", type: "text", required: true },
      { name: "insuranceState", label: "Insurance required by state", type: "text", required: true },
      { name: "governingLawState", label: "Governing law", type: "text", required: true },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 18; const L = 16, W = 178, LH = 5.7;
  const p = (t: string, b = false, gap = 1.8) => {
    doc.setFont("helvetica", b ? "bold" : "normal"); doc.setFontSize(10.1);
    const lines = doc.splitTextToSize(t, W);
    if (y + lines.length * LH > 282) { doc.addPage(); y = 18; }
    doc.text(lines, L, y); y += lines.length * LH + gap;
  };
  const title = "VEHICLE LEASE AGREEMENT";
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title); doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1); y += 10;
  p(`This Agreement is entered on ${v.agreementDate || "_______"} and remains in force through ${v.termEndDate || "_______"}, between ${v.lesseeName || "_______"} of ${v.lesseeAddress || "_______"} ("Lessee"), and ${v.lessorName || "_______"} of ${v.lessorAddress || "_______"} organized under laws of ${v.organizationLaw || "________"} ("Lessor").`);
  p("1. Recitals", true);
  p("Lessor owns Vehicle and leases to Lessee; true lease for tax treatment; Lessee receives use rights only.");
  p("2. Description of Leased Vehicle", true);
  p(`Vehicle Type New; Color ${v.vehicleColor || "________"}; Year ${v.vehicleYear || "________"}; Make ${v.vehicleMake || "________"}; Model ${v.vehicleModel || "________"}; Body Style ${v.vehicleBodyStyle || "________"}; Mileage 0; License Plate ${v.licensePlate || "________"}; VIN ${v.vin || "________"}; Intended purpose: personal use.`);
  p("3-9. Lease Costs/Fees, Payment Form, Late Fees, Mileage, GAP, Insurance, Taxes/Fees", true);
  p(`Total lease cost $${v.leaseTotalCost || "<insert amount>"}; monthly payment $${v.monthlyPayment || "<insert amount>"} due day ${v.paymentDay || "__"}; late fee $${v.lateFee || "<insert amount>"}; extra mileage charge $${v.extraMileCharge || "<insert amount>"}.`);
  p(`Insurance must satisfy ${v.insuranceState || "____"} law and name Lessor as additional insured/loss payee.`);
  p("10-32. End-of-term liability, appraisal, early termination disclosures, excessive wear, purchase option, notices, assignment, termination/default, return, maintenance, severability, risk of loss, driver/usage limits, waiver, warranties, inspection, entire agreement/modification, indemnification, arbitration, governing law, signatories apply as drafted.");
  p(`31. Governing Law: ${v.governingLawState || "________"}.`);
  p("Make It Legal guidance and insurance minimums sections included.");
  doc.save("vehicle_lease_agreement.pdf");
};

export default function VehicleLeaseForm() {
  return (
    <FormWizard
      steps={steps}
      title="Vehicle Lease Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="vehicleleaseagreement"
    />
  );
}

