import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Parties",
    fields: [
      { name: "agreementDate", label: "Agreement date", type: "date", required: true },
      { name: "borrowerName", label: "Borrower name", type: "text", required: true },
      { name: "borrowerAddress", label: "Borrower address", type: "text", required: true },
      { name: "borrowerPhone", label: "Borrower contact number", type: "text", required: false },
      { name: "borrowerEmail", label: "Borrower email", type: "email", required: false },
      { name: "lenderName", label: "Lender name", type: "text", required: true },
      { name: "lenderAddress", label: "Lender address", type: "text", required: true },
      { name: "lenderPhone", label: "Lender contact number", type: "text", required: false },
      { name: "lenderEmail", label: "Lender email", type: "email", required: false },
    ],
  },
  {
    label: "Loan Terms",
    fields: [
      { name: "loanAmount", label: "Loan amount (USD)", type: "text", required: true, placeholder: "0.00" },
      { name: "interestRate", label: "Interest rate (%)", type: "text", required: true, placeholder: "0" },
      { name: "interestType", label: "Interest basis (simple/compound)", type: "text", required: true, placeholder: "simple" },
      { name: "installmentAmount", label: "Installment amount", type: "text", required: true },
      { name: "commencementDate", label: "Commencement date", type: "date", required: true },
      { name: "maturityDate", label: "Maturity date", type: "date", required: true },
      { name: "paymentFrequency", label: "Frequency of payments", type: "text", required: true, placeholder: "Monthly" },
    ],
  },
  {
    label: "Legal and Execution",
    fields: [
      { name: "governingLawState", label: "Governing law state", type: "text", required: true },
      { name: "jurisdictionLocation", label: "Court jurisdiction location", type: "text", required: true },
      { name: "executedAt", label: "Executed at", type: "text", required: false },
      { name: "borrowerPrintedName", label: "Borrower printed name", type: "text", required: true },
      { name: "lenderPrintedName", label: "Lender printed name", type: "text", required: true },
      { name: "borrowerSignDate", label: "Borrower signature date", type: "date", required: true },
      { name: "lenderSignDate", label: "Lender signature date", type: "date", required: true },
    ],
  },
  {
    label: "Optional Notary",
    fields: [
      { name: "notaryState", label: "Notary state", type: "text", required: false },
      { name: "notaryCounty", label: "Notary county", type: "text", required: false },
      { name: "notaryDate", label: "Notary acknowledgment date", type: "date", required: false },
      { name: "notaryBorrower", label: "Borrower name for notary line", type: "text", required: false },
      { name: "notaryLender", label: "Lender name for notary line", type: "text", required: false },
      { name: "commissionExpires", label: "Notary commission expires", type: "text", required: false },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 18;
  const width = pageWidth - margin * 2;
  const lineHeight = 5.5;
  const bottomLimit = 280;
  let y = 20;

  const writeWrapped = (text: string, bold = false, gapAfter = 1.8) => {
    const lines = doc.splitTextToSize(text, width);
    const needed = lines.length * lineHeight + gapAfter;
    if (y + needed > bottomLimit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gapAfter;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const title = "PAYMENT AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(pageWidth / 2 - tw / 2, y + 1.2, pageWidth / 2 + tw / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  writeWrapped(
    `THIS PAYMENT AGREEMENT ("Agreement" or "Note") is made and entered into on this ${
      values.agreementDate || "___ day of _______________, ______"
    }, by and between:`
  );
  writeWrapped(`Borrower: ${values.borrowerName || "__________________________________________"}`);
  writeWrapped(`of ${values.borrowerAddress || "____________________________________________________"}`);
  writeWrapped(
    `Contact No.: ${values.borrowerPhone || "_______________________"}   Email: ${
      values.borrowerEmail || "______________________"
    }`
  );
  writeWrapped("AND");
  writeWrapped(`Lender: ${values.lenderName || "____________________________________________"}`);
  writeWrapped(`of ${values.lenderAddress || "____________________________________________________"}`);
  writeWrapped(
    `Contact No.: ${values.lenderPhone || "_______________________"}   Email: ${
      values.lenderEmail || "______________________"
    }`
  );
  writeWrapped('The Borrower and the Lender are hereinafter collectively referred to as the "Parties," and individually as a "Party."', false, 3);

  writeWrapped("1. INTRODUCTION AND PROMISE TO PAY", true);
  writeWrapped("1.1 Identification of Parties: The Borrower is the person or entity receiving funds under this Agreement, and the Lender is the person or entity providing such funds.");
  writeWrapped(
    `1.2 Promise to Pay: For value received, the Borrower hereby unconditionally promises to pay to the order of the Lender, in lawful money of the United States of America, the principal sum of United States Dollars (US $${values.loanAmount || "_________"}) (the "Loan Amount"), together with interest thereon in accordance with the terms of this Agreement.`
  );
  writeWrapped(
    "1.3 Acknowledgment of Debt: The Borrower acknowledges that the funds advanced by the Lender constitute a valid and enforceable debt obligation. The Borrower further acknowledges that this Agreement represents the entire understanding of the Parties with respect to the payment and repayment of said funds."
  );
  writeWrapped(
    `1.4 Interest Terms: The Loan Amount shall bear interest at a rate of ${values.interestRate || "_____"} percent per annum, calculated on the outstanding principal balance from the date of disbursement until payment in full. Interest shall be computed on a ${
      values.interestType || "[simple/compound]"
    } interest basis, as mutually agreed by the Parties.`,
    false,
    3
  );

  writeWrapped("2. TERMS OF REPAYMENT", true);
  writeWrapped("2.1 Repayment Structure: The Borrower agrees to repay the Loan Amount, together with accrued interest, in periodic installments as follows:");
  writeWrapped(`- Installment Amount: US $${values.installmentAmount || "_________"} per month (or other agreed periodic payment).`);
  writeWrapped(`- Commencement Date: ${values.commencementDate || "____________________________"}`);
  writeWrapped(`- Due Date: ${values.maturityDate || "____________________________"} (the "Maturity Date").`);
  writeWrapped(`- Frequency of Payments: ${values.paymentFrequency || "____________________________"}`);
  writeWrapped("2.2 Balloon Payment: The Borrower acknowledges that the periodic installment payments may not fully amortize the principal balance of the loan. Therefore, a final balloon payment representing the remaining unpaid principal and any accrued interest shall be due and payable in full on the Maturity Date.");
  writeWrapped("2.3 Application of Payments: All payments received by the Lender shall be applied in the following order: (a) accrued and unpaid interest; (b) late fees, costs, or charges due; and (c) reduction of outstanding principal.");
  writeWrapped("2.4 Method of Payment: Payments shall be made in lawful currency of the United States, delivered by check, bank transfer, or any mutually agreed method, to the Lender's designated address or account as specified in writing.");
  writeWrapped("2.5 Prepayment: The Borrower may, at any time and without penalty, prepay the whole or any part of the outstanding principal balance. Any prepayment shall first be applied to accrued interest before reducing the principal amount.", false, 3);

  writeWrapped("3. SECURITY AND COLLATERAL", true);
  writeWrapped("3.1 Secured Loan (if applicable): This Note may be secured by personal or real property as collateral. The Borrower agrees that such collateral shall serve as security for the repayment of this Note and all obligations arising hereunder.");
  writeWrapped("3.2 Security Agreement: If the Parties have agreed that the Note is to be secured, the Borrower shall execute a separate Security Agreement identifying the collateral pledged, together with all necessary instruments of perfection required under applicable law.");
  writeWrapped("3.3 Ownership and Maintenance of Collateral: The Borrower represents and warrants that all collateral pledged under the Security Agreement shall be owned free and clear of any other liens or encumbrances, except as disclosed in writing to the Lender. The Borrower shall maintain the collateral in good condition and shall not transfer, sell, or dispose of it without the prior written consent of the Lender.");
  writeWrapped("3.4 Default Under Security Agreement: Any default under the Security Agreement shall constitute a default under this Payment Agreement, and the Lender shall be entitled to exercise all rights and remedies available under law, including repossession or foreclosure of the collateral.", false, 3);

  writeWrapped("4. DEFAULT", true);
  writeWrapped("4.1 Events Constituting Default: The occurrence of any one or more of the following events shall constitute an Event of Default under this Agreement: (a) failure to pay principal or interest when due; (b) liquidation, dissolution, incompetency, or death of Borrower; (c) bankruptcy or insolvency proceedings; (d) receiver or trustee appointment; (e) assignment for benefit of creditors; (f) material misrepresentation to obtain credit; or (g) sale/transfer of material assets without prior written consent.");
  writeWrapped("4.2 Effect of Default: Upon any Event of Default, (a) the entire unpaid principal balance, accrued interest, and other sums shall become immediately due and payable without further notice or demand; and (b) the Lender may pursue all rights and remedies available under this Agreement, at law, or in equity.", false, 3);

  writeWrapped("5. MISCELLANEOUS LEGAL PROVISIONS", true);
  writeWrapped("5.1 Collection Costs: If any payment obligation is not paid when due, the Borrower agrees to pay all reasonable collection costs, including attorney's fees, court costs, and collection agency fees, whether or not litigation is commenced.");
  writeWrapped("5.2 Waiver of Presentment: The Borrower waives presentment for payment, notice of dishonor, protest, notice of protest, and all other notices or demands related to enforcement of this Note.");
  writeWrapped("5.3 Waiver of Strict Compliance: No failure or delay by the Lender in exercising any right or remedy shall be deemed a waiver. Acceptance of late or partial payment shall not waive default or the right to demand full compliance.");
  writeWrapped("5.4 Amendments: This Agreement may not be amended except by written instrument executed by both Parties. Oral amendments have no force or effect.");
  writeWrapped("5.5 Severability: If any provision is invalid, illegal, or unenforceable, the remaining provisions remain valid and enforceable.");
  writeWrapped("5.6 Assignment: Borrower may not assign rights or obligations without Lender's prior written consent. Lender may assign rights under this Note with written notice to Borrower.", false, 3);

  writeWrapped("6. GOVERNING LAW AND JURISDICTION", true);
  writeWrapped(
    `6.1 Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the State of ${
      values.governingLawState || "____________________________"
    }, without regard to its conflict-of-laws principles.`
  );
  writeWrapped(
    `6.2 Jurisdiction: The Parties agree that any legal action or proceeding arising out of or in connection with this Agreement shall be brought exclusively in the courts of competent jurisdiction located in ${
      values.jurisdictionLocation || "____________________________"
    }, and both Parties hereby submit to the jurisdiction of such courts.`,
    false,
    3
  );

  writeWrapped("7. EXECUTION AND SIGNATURES", true);
  writeWrapped("IN WITNESS WHEREOF, the Parties hereto have executed this Payment Agreement as of the date first above written.");
  writeWrapped(`Executed at: ${values.executedAt || "_______________________________________________"}`);
  writeWrapped(`Date: ${values.agreementDate || "___________________________"}`);
  writeWrapped("Borrower                                  Lender");
  writeWrapped("Signature: ___________________________     Signature: ___________________________");
  writeWrapped(`Printed Name: ${values.borrowerPrintedName || "______________________"}     Printed Name: ${values.lenderPrintedName || "______________________"}`);
  writeWrapped(`Date: ${values.borrowerSignDate || "____________________________"}     Date: ${values.lenderSignDate || "____________________________"}`, false, 3);

  if (values.notaryState || values.notaryCounty || values.notaryDate || values.notaryBorrower || values.notaryLender) {
    writeWrapped("Optional Notarization", true);
    writeWrapped(`State of ${values.notaryState || "___________________"} )`);
    writeWrapped(`County of ${values.notaryCounty || "_________________"} )`);
    writeWrapped(
      `On this ${values.notaryDate || "___ day of ____________, ______"}, before me, the undersigned Notary Public, personally appeared ${
        values.notaryBorrower || "__________________________"
      } (Borrower) and ${values.notaryLender || "__________________________"} (Lender), who acknowledged that they executed the foregoing Payment Agreement for the purposes therein contained.`
    );
    writeWrapped("Notary Public: ___________________________");
    writeWrapped(`Commission Expires: ${values.commissionExpires || "______________________"}`);
  }

  doc.save("payment_agreement.pdf");
};

export default function PaymentAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Payment Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="paymentagreement"
    />
  );
}