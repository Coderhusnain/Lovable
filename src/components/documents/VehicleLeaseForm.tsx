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
  const L = 16, W = 178, LH = 5.7;
  let y = 18;

  const checkPage = (lines: number) => {
    if (y + lines * LH > 282) { doc.addPage(); y = 18; }
  };

  const heading = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, W);
    checkPage(lines.length + 1);
    doc.text(lines, L, y);
    y += lines.length * LH + 2.5;
  };

  const body = (text: string, gap = 1.8) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.1);
    const lines = doc.splitTextToSize(text, W);
    checkPage(lines.length);
    doc.text(lines, L, y);
    y += lines.length * LH + gap;
  };

  const bullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.1);
    const indent = L + 5;
    const lineW = W - 5;
    const lines = doc.splitTextToSize(text, lineW);
    checkPage(lines.length);
    doc.text("\u2022", L + 1, y);
    doc.text(lines, indent, y);
    y += lines.length * LH + 1.5;
  };

  const numbered = (num: number, text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.1);
    const prefix = `${num}.  `;
    const indent = L + 7;
    const lineW = W - 7;
    const lines = doc.splitTextToSize(text, lineW);
    checkPage(lines.length);
    doc.text(prefix, L, y);
    doc.text(lines, indent, y);
    y += lines.length * LH + 1.5;
  };

  const spacer = (h = 3) => { y += h; };

  // ── TITLE ──────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13.5);
  const title = "VEHICLE LEASE AGREEMENT";
  doc.text(title, 105, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.line(105 - tw / 2, y + 1, 105 + tw / 2, y + 1);
  y += 12;

  // ── PREAMBLE ───────────────────────────────────────────────────────────────
  body(
    `This Agreement is entered into this day, ${v.agreementDate || "_______"}, and shall remain in full force and effect through ${v.termEndDate || "_______"}, between ${v.lesseeName || "_______"} ("Lessee"), of ${v.lesseeAddress || "_______"}, and ${v.lessorName || "_______"} ("Lessor"), of ${v.lessorAddress || "_______"}, organized and existing under the laws of the ${v.organizationLaw || "________"}.`
  );
  body("The following terms and conditions shall apply for the length of the lease:");
  spacer();

  // ── 1. RECITALS ────────────────────────────────────────────────────────────
  heading("1. RECITALS");
  body("WHEREAS, the Lessor is the registered owner of the Vehicle;");
  body(`WHEREAS, the Lessor is desirous of leasing the Vehicle to the Lessee on such terms as are set out in this Vehicle Lease Agreement (the "Agreement"), and the Lessee is desirous of leasing the Vehicle from the Lessor on said terms;`);
  body("WHEREAS, this Agreement is a lease only and Lessee will have no right, title, or interest in or to the Vehicle except for the use of the Vehicle as described in this Agreement;");
  body("WHEREAS, this Agreement shall be treated as a true lease for federal and applicable state income tax purposes with Lessor having all benefits of ownership of the Vehicle;");
  body("NOW, THEREFORE, IT IS HEREBY AGREED as follows:");
  spacer();

  // ── 2. DESCRIPTION OF LEASED VEHICLE ──────────────────────────────────────
  heading("2. DESCRIPTION OF LEASED VEHICLE");
  body("The following vehicle (\"the Vehicle\") is the subject of this Lease Agreement:");
  bullet(`Vehicle Type: New`);
  bullet(`Color: ${v.vehicleColor || "________"}`);
  bullet(`Year: ${v.vehicleYear || "________"}`);
  bullet(`Make: ${v.vehicleMake || "________"}`);
  bullet(`Model: ${v.vehicleModel || "________"}`);
  bullet(`Body Style: ${v.vehicleBodyStyle || "________"}`);
  bullet(`Mileage: 0`);
  bullet(`License Plate: ${v.licensePlate || "________"}`);
  bullet(`VIN: ${v.vin || "________"}`);
  body("Intended Vehicle Purpose: Personal use");
  spacer();

  // ── 3. LEASE COSTS AND FEES SUMMARY ───────────────────────────────────────
  heading("3. LEASE COSTS AND FEES SUMMARY");
  body(`The Lessor and Lessee agree that at the end of the term of this Lease the total cost of the lease will be $${v.leaseTotalCost || "<insert amount>"}, excluding any costs for repairing any excess wear and tear of the Vehicle. This total is based on the following provisions:`);
  numbered(1, "The full retail cost of the Vehicle is $<insert amount>.");
  numbered(2, "The Lessor and Lessee have negotiated and agree that the value of the Vehicle is $<insert amount>.");
  numbered(3, "A good faith estimate of the residual value of the Vehicle is $<insert amount>.");
  numbered(4, "The invoice price of the Vehicle minus net trade-in allowance, down payment, rebate, non-cash credit, or cash paid (net capitalized cost) is $<insert amount>.");
  numbered(5, "The amortized amount over the term of the Lease is $<insert amount>.");
  numbered(6, "The term of the Lease is for ---- months (the \"Term\").");
  numbered(7, "The total base monthly depreciated payment is $<insert amount>.");
  numbered(8, "Lessor is charging a lease rate of $<insert amount>.");
  numbered(9, "The financing fees total $<insert amount>.");
  body(`Total Monthly Payment: $${v.monthlyPayment || "<insert amount>"}.`);
  body(`Total Cost of Lease: $${v.leaseTotalCost || "<insert amount>"}`);
  spacer();

  // ── 4. FORM OF PAYMENT ─────────────────────────────────────────────────────
  heading("4. FORM OF PAYMENT");
  body(`The monthly payments are to be made on the ${v.paymentDay || "__"} day of each month, with the first payment due on the first payment day that occurs after the effective date of this Lease. Payments may be made by personal check, cashier's check, money order, certified check, cash, or by any other means agreed upon by the Lessor and Lessee. Payments are to be paid to the Lessor at the address listed above, unless the parties agree that payment is to be submitted elsewhere.`);
  spacer();

  // ── 5. LATE PAYMENT FEES ──────────────────────────────────────────────────
  heading("5. LATE PAYMENT FEES");
  body(`A late fee of $${v.lateFee || "<insert amount>"} will be charged on all payments that are paid after the due date.`);
  spacer();

  // ── 6. MILEAGE PERMITTED ──────────────────────────────────────────────────
  heading("6. MILEAGE PERMITTED");
  body(`Lessee will be permitted to drive the Vehicle for a maximum of 0 miles per year and be charged $${v.extraMileCharge || "<insert amount>"} per extra mile if the Vehicle is driven over the allotted amount of miles.`);
  spacer();

  // ── 7. GAP LIABILITY NOTICE ───────────────────────────────────────────────
  heading("7. GAP LIABILITY NOTICE");
  body("In the event of theft or damage to the Vehicle that results in a total loss, there may be a gap between the amount due upon early termination and the proceeds of your insurance settlement and deductible. THIS LEASE PROVIDES THAT LESSEE IS LIABLE FOR THE GAP AMOUNT.");
  spacer();

  // ── 8. INSURANCE ─────────────────────────────────────────────────────────
  heading("8. INSURANCE");
  body(`Lessee must maintain Automobile Liability Insurance in the form of any applicable bodily injury and property damage coverage, and collision and comprehensive insurance, as required by ${v.insuranceState || "____"} state law. Proof of insurance or the insurance card must be provided to the Lessor upon request. The Lessee is responsible for insuring the Vehicle based on its full value. The Lessor will be named as the registered owner and as "Additional Insured" and loss payee in the insurance policy.`);
  spacer();

  // ── 9. TAXES AND FEES ─────────────────────────────────────────────────────
  heading("9. TAXES AND FEES");
  body("During the term of this Lease, the Lessee shall pay all applicable taxes, assessments, and license and registration fees on the Vehicle.");
  spacer();

  // ── 10. END OF TERM LIABILITY ─────────────────────────────────────────────
  heading("10. END OF TERM LIABILITY");
  doc.setFont("helvetica", "bold"); doc.setFontSize(10.1);
  checkPage(2);
  doc.text("(a) Residual Value Liability", L, y); y += LH + 1.5;
  body("The residual value of the Vehicle is based on a reasonable, good faith estimate of the value of the Vehicle at the end of the lease term. If the actual value of the Vehicle at that time is greater than the residual value, Lessee will have no further liability under this Lease, except for other charges already incurred. If the actual value of the Vehicle is less than the residual value, Lessee will be liable for any difference up to three (3) times the monthly payment. For any difference in excess of that amount, Lessee will only be liable if:");
  numbered(1, "Excessive use or damage representing more than normal wear and use resulting in an unusually low value at the end of the term;");
  numbered(2, "The matter is not otherwise resolved and Lessor wins a lawsuit against Lessee seeking a higher payment; or");
  numbered(3, "Lessee voluntarily agrees with Lessor after the end of the lease term to make a higher payment.");
  body("Should the Lessor bring a lawsuit against the Lessee, the Lessor must prove that the original estimate of the value of the leased property at the end of the lease term was reasonable and was made in good faith. The Lessor must also pay attorney's fees.");
  spacer(2);
  doc.setFont("helvetica", "bold"); doc.setFontSize(10.1);
  checkPage(2);
  doc.text("(b) Independent Appraisal", L, y); y += LH + 1.5;
  body("If Lessee disagrees with the value assigned to the Vehicle, Lessee may obtain, at Lessee's own expense, from an independent third party agreeable to both parties, a professional appraisal of the value of the leased Vehicle which could be realized at sale. The appraised value shall then be used as the actual value.");
  spacer();

  // ── 11. EARLY TERMINATION DISCLOSURE ─────────────────────────────────────
  heading("11. EARLY TERMINATION DISCLOSURE");
  body("Lessee may have to pay a substantial charge if this Lease is ended early. The charge may be up to several thousand dollars. The actual charge will depend on when the Lease is terminated. The earlier the Lease is ended, the greater this charge is.");
  spacer();

  // ── 12. EXCESSIVE WEAR AND USE ────────────────────────────────────────────
  heading("12. EXCESSIVE WEAR AND USE");
  body("Lessee may be charged for excessive wear based on Lessor's specifications and generally accepted standards for normal use. Excessive wear and tear includes, but is not limited to:");
  bullet("Damaged glass");
  bullet("Damaged body panels, lights, fenders, and paint");
  bullet("Dysfunctional accessories");
  bullet("Extremely worn tire tread");
  bullet("Any damage to the interior");
  bullet("Any mechanical damage that interferes with the safe and lawful operation of the Vehicle");
  spacer();

  // ── 13. PURCHASE OPTION AT THE END OF LEASE TERM ─────────────────────────
  heading("13. PURCHASE OPTION AT THE END OF LEASE TERM");
  body("Lessee will not have the option to purchase the leased Vehicle.");
  spacer();

  // ── 14. NOTICE ───────────────────────────────────────────────────────────
  heading("14. NOTICE");
  body("All notices required or permitted under this Lease shall be deemed delivered when delivered in person or by mail, postage prepaid, addressed to the appropriate party at the address shown for that party at the beginning of this Lease.");
  spacer();

  // ── 15. ASSIGNMENT ────────────────────────────────────────────────────────
  heading("15. ASSIGNMENT");
  body("The Lessee shall not assign, transfer, or sublet any of its obligations, rights, or interest under this Agreement to any third party, whether an associated entity or not, whether in whole or in part, without prior written consent of the Lessor.");
  spacer();

  // ── 16. TERMINATION ───────────────────────────────────────────────────────
  heading("16. TERMINATION");
  body("If Lessee fails to pay any amount due under this Agreement or to comply with any of the covenants contained in this Agreement, Lessor may terminate this Agreement upon thirty (30) days written notice and exercise any remedies under applicable law.");
  spacer();

  // ── 17. EVENT OF DEFAULT ──────────────────────────────────────────────────
  heading("17. EVENT OF DEFAULT");
  body("The Lessee will be in default if:");
  bullet("Lessee fails to make a monthly payment on the due date");
  bullet("Lessee has misrepresented personal or financial information");
  bullet("The Vehicle is damaged or is beyond repair");
  bullet("The Vehicle is not returned at the end of the lease term");
  bullet("Lessee fails to maintain vehicle insurance as required");
  bullet("Lessee breaches any other term of this Lease");
  spacer();

  // ── 18. VEHICLE RETURN ────────────────────────────────────────────────────
  heading("18. VEHICLE RETURN");
  body("At the end of the Lease, the Vehicle may be returned to the care of the Lessor. Lessee shall pay any applicable end-of-lease costs.");
  spacer();

  // ── 19. COSTS, EXPENSES, FEES, AND CHARGES ───────────────────────────────
  heading("19. COSTS, EXPENSES, FEES, AND CHARGES");
  body("Lessee agrees to pay all fines, tickets, or penalties incurred in connection with the operation of the Vehicle during the term of this Agreement.");
  spacer();

  // ── 20. MAINTENANCE ───────────────────────────────────────────────────────
  heading("20. MAINTENANCE");
  body("Lessee agrees, at its expense, to maintain the Vehicle in good condition, repair, maintenance, and running order and in accordance with all manufacturers and warranty requirements. Lessee shall be responsible for all expenses that shall result as a part of the normal wear and tear of the automobile. Lessee also agrees to comply with the Lessor's requirements of maintenance, including but not limited to:");
  bullet("Tire rotation and replacement");
  bullet("Replacement of the air filter");
  bullet("Replacement of hoses, clamps, belts, and spark plugs");
  bullet("Oil changes");
  spacer();

  // ── 21. SEVERABILITY ──────────────────────────────────────────────────────
  heading("21. SEVERABILITY");
  body("If a court holds any provision of this Agreement to be illegal, invalid, or unenforceable, the remaining provisions shall remain in full force and effect and the parties will amend this Agreement to give effect to the stricken clause to the maximum extent possible.");
  spacer();

  // ── 22. RISK OF LOSS ──────────────────────────────────────────────────────
  heading("22. RISK OF LOSS");
  body("Lessee assumes and agrees to bear the entire risk of loss of, theft of, damage to, or destruction of the Vehicle from any cause whatsoever. In the event of such occurrence to the Vehicle, Lessee shall give Lessor prompt notice of the occurrence and thereafter will place the Vehicle in good repair, condition, and working order.");
  spacer();

  // ── 23. ACCEPTABLE DRIVERS, LIMITATIONS, AND MODIFICATIONS ───────────────
  heading("23. ACCEPTABLE DRIVERS, LIMITATIONS, AND MODIFICATIONS TO THE VEHICLE");
  body("The Vehicle is not to be operated by drivers without an appropriate license or those restricted under the insurance policy. Lessee agrees that it will not permit the Vehicle to be located in a state other than the state in which the Vehicle is then titled for any continuous period of time that would require such Vehicle to become subject to the titling and/or registration laws of such other state. Using the Vehicle on trips of less than sixty (60) days within continental North America is permitted. Any exceptions can only be made upon Lessor's prior written consent. Any modifications or cosmetic additions to the Vehicle are not permitted without the Lessor's prior written consent.");
  spacer();

  // ── 24. WAIVER ────────────────────────────────────────────────────────────
  heading("24. WAIVER");
  body("The failure of either party to enforce any provision of this Lease shall not be construed as a waiver or limitation of that party's right to subsequently enforce and compel strict compliance with every provision of this Lease.");
  spacer();

  // ── 25. WARRANTIES ────────────────────────────────────────────────────────
  heading("25. WARRANTIES");
  body("The Vehicle herein is in an \"as is\" condition and Lessor has not made, and does not hereby make, any representation, warranty, or covenant expressed or implied with respect to the condition, quality, durability, capability, or suitability of the Vehicle or against any patent or latent defects therein.");
  spacer();

  // ── 26. EARLY TERMINATION ─────────────────────────────────────────────────
  heading("26. EARLY TERMINATION");
  body("There is no cancellation period before the end of the term of this Vehicle Lease. This Lease may only be terminated with the agreement of the Lessor or upon proven and valid legal cause.");
  spacer();

  // ── 27. INSPECTION ───────────────────────────────────────────────────────
  heading("27. INSPECTION");
  body("Lessor and Lessee acknowledge that the Vehicle has been inspected and the Lessee accepts the Vehicle as being in good condition, not including manufacturer's defects.");
  spacer();

  // ── 28. ENTIRE AGREEMENT AND MODIFICATION ────────────────────────────────
  heading("28. ENTIRE AGREEMENT AND MODIFICATION");
  body("This Lease constitutes the entire agreement between the parties. No modification or amendment of this Lease shall be effective unless in writing and signed by both parties.");
  spacer();

  // ── 29. INDEMNIFICATION ───────────────────────────────────────────────────
  heading("29. INDEMNIFICATION");
  body("Lessee agrees to indemnify and hold harmless the Lessor from any loss; shall keep the Vehicle free from encumbrances, fines, liens, claims, and expenses resulting from the maintenance and use of the Vehicle.");
  spacer();

  // ── 30. ARBITRATION ──────────────────────────────────────────────────────
  heading("30. ARBITRATION");
  body("Any controversy or claim relating to this Lease, including the construction or application of this Lease, will be settled by binding arbitration under the rules of the American Arbitration Association, or similar dispute resolution service, and any judgment granted by the arbitrator(s) may be enforced in any court of proper jurisdiction.");
  spacer();

  // ── 31. GOVERNING LAW ─────────────────────────────────────────────────────
  heading("31. GOVERNING LAW");
  body(`This Lease shall be governed by and construed in accordance with the laws of ${v.governingLawState || "________"}.`);
  spacer();

  // ── 32. SIGNATORIES ───────────────────────────────────────────────────────
  heading("32. SIGNATORIES");
  body(`This Agreement shall be executed by ${v.lesseeName || "_______"} and by ${v.lessorName || "_______"}, acting on behalf of ${v.organizationLaw || "________"}. This Agreement shall become effective as of the date stated above.`);
  spacer(6);

  doc.setFont("helvetica", "bold"); doc.setFontSize(10.1);
  checkPage(4);
  doc.text("LESSEE", L, y); y += LH + 2;
  doc.setFont("helvetica", "normal");
  doc.text("By: ____________________________", L, y); y += LH + 1.5;
  doc.text("Date: __________________________", L, y); y += LH + 6;

  doc.setFont("helvetica", "bold");
  doc.text("LESSOR", L, y); y += LH + 2;
  doc.setFont("helvetica", "normal");
  doc.text("By: ____________________________", L, y); y += LH + 1.5;
  doc.text("Date: __________________________", L, y);
  spacer(10);

  // ── MAKE IT LEGAL ─────────────────────────────────────────────────────────
  heading("MAKE IT LEGAL\u2122 \u2014 Next Steps for Your Document");

  doc.setFont("helvetica", "bold"); doc.setFontSize(10.1);
  checkPage(2); doc.text("Sign this document.", L, y); y += LH + 1.5;
  doc.setFont("helvetica", "normal"); doc.setFontSize(10.1);
  body("This Agreement must be signed by all required parties.");

  doc.setFont("helvetica", "bold"); doc.setFontSize(10.1);
  checkPage(2); doc.text("Electronic Signature.", L, y); y += LH + 1.5;
  doc.setFont("helvetica", "normal"); doc.setFontSize(10.1);
  body("This Agreement may be signed electronically and shall become effective as of the date specified in the Agreement.");

  doc.setFont("helvetica", "bold"); doc.setFontSize(10.1);
  checkPage(2); doc.text("Copies of the Agreement.", L, y); y += LH + 1.5;
  doc.setFont("helvetica", "normal"); doc.setFontSize(10.1);
  body("Each party named in this Agreement should receive a copy of the fully executed document. If this Agreement is signed electronically, a copy will be securely stored in your account and may be shared directly from your account.");
  spacer(2);

  heading("IMPORTANT DETAILS \u2014 Insurance Requirements");
  body("When leasing a vehicle, automobile insurance must be obtained and maintained for the entire term of the Lease. Minimum insurance requirements may vary by state; however, most lease agreements require the following coverage:");
  bullet("Bodily Injury or Death Liability: $100,000 per person / $300,000 per occurrence");
  bullet("Property Damage Liability: $50,000");
  bullet("Comprehensive and Collision Coverage: Coverage for the actual value of the Vehicle, with a deductible not exceeding $500");

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