import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  day: string;
  month: string;
  year: string;
  borrowerName: string;
  borrowerAddress: string;
  borrowerContact: string;
  borrowerEmail: string;
  lenderName: string;
  lenderAddress: string;
  lenderContact: string;
  lenderEmail: string;
  loanAmount: string;
  interestRate: string;
  interestPercent: string;
  interestBasis: string;
  installmentAmount: string;
  commencementDate: string;
  dueDate: string;
  paymentFrequency: string;
  balloonText: string;
  paymentMethod: string;
  prepaymentText: string;
  collateralText: string;
  governingLawState: string;
  jurisdictionLocation: string;
  executedAt: string;
  executedDate: string;
  borrowerSignature: string;
  lenderSignature: string;
  borrowerPrintedName: string;
  lenderPrintedName: string;
  borrowerDate: string;
  lenderDate: string;
  notarizationState: string;
  notarizationCounty: string;
  notarizationDay: string;
  notarizationMonth: string;
  notarizationYear: string;
  notaryPublic: string;
  commissionExpires: string;
}

const defaultFormData: FormData = {
  day: "",
  month: "",
  year: "",
  borrowerName: "",
  borrowerAddress: "",
  borrowerContact: "",
  borrowerEmail: "",
  lenderName: "",
  lenderAddress: "",
  lenderContact: "",
  lenderEmail: "",
  loanAmount: "",
  interestRate: "",
  interestPercent: "",
  interestBasis: "",
  installmentAmount: "",
  commencementDate: "",
  dueDate: "",
  paymentFrequency: "",
  balloonText: "",
  paymentMethod: "",
  prepaymentText: "",
  collateralText: "",
  governingLawState: "",
  jurisdictionLocation: "",
  executedAt: "",
  executedDate: "",
  borrowerSignature: "",
  lenderSignature: "",
  borrowerPrintedName: "",
  lenderPrintedName: "",
  borrowerDate: "",
  lenderDate: "",
  notarizationState: "",
  notarizationCounty: "",
  notarizationDay: "",
  notarizationMonth: "",
  notarizationYear: "",
    notaryPublic: "",
    commissionExpires: "",
};

const PaymentAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 4));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const filled = (template: string, replacement: string) => {
    // replace first run of underscores (3 or more) with replacement, if provided
    if (!replacement || replacement.trim() === "") return template;
    return template.replace(/_{3,}/, replacement);
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const pageWidth = doc.internal.pageSize.width;
      const margin = 40;
      const lineHeight = 14;
      let currentY = margin;

      const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
        doc.setFontSize(fontSize);
        doc.setFont("times", isBold ? "bold" : "normal");
        const textWidth = pageWidth - margin * 2;
        const lines = doc.splitTextToSize(text, textWidth);
        lines.forEach((line: string) => {
          if (currentY > 720) {
            doc.addPage();
            currentY = margin;
          }
          if (isCenter) {
            const tw = (doc.getStringUnitWidth(line) * fontSize) / doc.internal.scaleFactor;
            const tx = (pageWidth - tw) / 2;
            doc.text(line, tx, currentY);
          } else {
            doc.text(line, margin, currentY);
          }
          currentY += lineHeight;
        });
      };

      // Build the document verbatim, only substituting user-filled data for underscore placeholders
      const paragraphs: string[] = [];

      paragraphs.push(
        `PAYMENT AGREEMENTTHIS PAYMENT AGREEMENT(“Agreement” or “Note”) is made and entered into on this ${formData.day || "___"} day of ${formData.month || "_____________"}, ${formData.year || "------"},by and between:Borrower:${formData.borrowerName || "__________________________________________"}of ${formData.borrowerAddress || "____________________________________________________"}Contact No.: ${formData.borrowerContact || "_______________________"} Email: ${formData.borrowerEmail || "____________________"}ANDLender:${formData.lenderName || "____________________________________________"}of ${formData.lenderAddress || "____________________________________________________"}Contact No.: ${formData.lenderContact || "_______________________"} Email: ${formData.lenderEmail || "____________________"}The Borrower and the Lender are hereinafter collectively referred to as the “Parties,”and individually as a “Party.”`
      );

      paragraphs.push(
        `1. INTRODUCTION AND PROMISE TO PAY1.1 Identification of Parties:The Borrower is the personor entity receiving funds under this Agreement, and the Lender is the person or entity providing such funds.1.2 Promise to Pay:For value received, the Borrower hereby unconditionally promises to payto the order of the Lender, in lawful money of the United States of America, the principal sum of United States Dollars (US $${formData.loanAmount || "_________"})(the “Loan Amount”), together with interest thereon in accordance with the terms of this Agreement.1.3 Acknowledgment of Debt:The Borrower acknowledges that the funds advanced by the Lender constitute a valid and enforceable debt obligation. The Borrower further acknowledges that this Agreement represents the entire understanding of the Parties with respect to the payment and repayment of said funds.1.4 Interest Terms:The Loan Amount shall bear interest at a rate of ${formData.interestRate || "_____"} percent (${formData.interestPercent || "___"}%) per annum, calculated on the outstanding principal balance from the date of disbursement until payment in full. Interest shall be computed on a ${formData.interestBasis || "[simple/compound]"} interest basis, as mutually agreed by the Parties.`
      );

      paragraphs.push(
        `2. TERMS OF REPAYMENT2.1 Repayment Structure:The Borrower agrees to repay the Loan Amount, together with accrued interest, in periodic installments as follows:•Installment Amount:US $${formData.installmentAmount || "_________"} per month (or other agreed periodicpayment).•Commencement Date:${formData.commencementDate || "____________________________"}•Due Date:${formData.dueDate || "____________________________"} (the “Maturity Date”).•Frequency of Payments:${formData.paymentFrequency || "____________________________"}`
      );

      paragraphs.push(
        `2.2 Balloon Payment:The Borrower acknowledges that the periodic installmentpayments may not fully amortizethe principal balance of the loan. Therefore, a final balloon paymentrepresenting the remaining unpaid principal and any accrued interest shall be due and payable in full on the Maturity Date.2.3 Application of Payments:All payments received by the Lender shall be applied in the following order:(a) To any accrued and unpaid interest;(b) To any late fees, costs, or charges due under this Agreement; and(c) To the reduction of the outstanding principal balance.2.4 Methodof Payment:Payments shall be made in lawful currency of the United States, delivered by check, bank transfer, or any mutually agreed method, to the Lender’s designated address or account as specified in writing.2.5 Prepayment:The Borrower may, at any time and without penalty, prepay the whole or any part of the outstanding principal balance. Any prepayment shall first be applied to accrued interest before reducing the principal amount.`
      );

      paragraphs.push(
        `3. SECURITY AND COLLATERAL3.1 Secured Loan (if applicable):This Note may be securedby personal or real property as collateral. The Borrower agrees that such collateral shall serve as security for the repayment of this Note and all obligations arising hereunder.3.2 Security Agreement:If the Parties have agreed that the Note is to be secured, the Borrower shall execute a separate Security Agreementidentifying the collateral pledged, together with all necessary instruments of perfection required under applicable law.3.3 Ownership and Maintenance of Collateral:The Borrower represents and warrants that all collateral pledged under the Security Agreement shall be owned free and clear of any other liens or encumbrances, except as disclosed in writing to the Lender. The Borrower shall maintain the collateral in good condition and shall not transfer, sell, or dispose of it without the prior written consent of the Lender.3.4 Default Under Security Agreement:Any default under the Security Agreement shall constitute a default under this Payment Agreement, and the Lender shall be entitled to exercise all rights and remedies available under law, including repossession or foreclosure of the collateral.`
      );

      paragraphs.push(
        `4. DEFAULT4.1 Events Constituting Default:The occurrence of any one or more of the following events shall constitute an Event of Defaultunder this Agreement:(a) Failure of the Borrower to pay the principal or accrued interest when due;(b) The liquidation, dissolution, incompetency, or death of the Borrower;(c) The filing of bankruptcy or insolvency proceedings by or against the Borrower;(d) The appointment of a receiver or trustee for the Borrower’s assets;(e) The making of a general assignment for the benefit of the Borrower’s creditors;(f) Any material misrepresentation by the Borrower made to the Lender for the purpose of obtaining or extending credit; or(g) The sale, transfer, or disposal of a material portion of the Borrower’s business or assets without the Lender’s prior written consent.4.2 Effect of Default:Upon the occurrence of any Event of Default:(a) The entire unpaid principal balance, together with all accrued interest and other sums due, shall become immediately due and payable without further notice or demand; and(b) The Lender may pursue any and all rights and remedies available under this Agreement, at law, or in equity.`
      );

      paragraphs.push(
        `5. MISCELLANEOUS LEGAL PROVISIONS5.1 Collection Costs:If any payment obligation under this Agreement is not paid when due, the Borrower agrees to pay all reasonable costs of collection incurred by the Lender, including, but not limited to, attorney’s fees, court costs, and collection agency fees, whether or not litigation is commenced.5.2 Waiver of Presentment:The Borrower hereby waives presentment for payment, notice of dishonor, protest, and notice of protest, and all other notices or demands relating to enforcement of this Note.5.3 Waiver of Strict Compliance:No failure or delay by the Lender in exercising any right or remedy under this Agreement shall be deemed a waiver thereof. Acceptance of a late payment or partial payment shall not constitute a waiver of any default or the right to demand full compliance thereafter.5.4 Amendments:This Agreement may not be amended, altered, or modified except by a written instrument executed by both Parties. Oral amendments shall have noforce or effect.`
      );

      paragraphs.push(
        `5.5 Severability:If any provision of this Agreement is determined to be invalid, illegal, or unenforceable, the remaining provisions shall remain valid, binding, and enforceable to the fullest extent permitted by law.5.6 Assignment:TheBorrower shall not assign, transfer, or delegate any of its rights or obligations under this Agreement without the prior written consent of the Lender. The Lender may assign its rights under this Note to any third party upon written notice to the Borrower.`
      );

      paragraphs.push(
        filled(`6. GOVERNING LAW AND JURISDICTION6.1 Governing Law:This Agreement shall be governed by and construed in accordance with the laws of the State of ____________________________, without regard to its conflict-of-laws principles.`, formData.governingLawState)
      );

      paragraphs.push(
        filled(`6.2 Jurisdiction:The Parties agree that any legal action or proceeding arising out of or in connection with this Agreement shall be brought exclusively in the courts of competent jurisdiction located in ____________________________, and both Parties hereby submit to the jurisdiction of such courts.`, formData.jurisdictionLocation)
      );

      paragraphs.push(
        `7. EXECUTION AND SIGNATURESIN WITNESS WHEREOF, the Parties hereto have executed this Payment Agreement as of the date first above written.`
      );

      paragraphs.push(filled(`Executed at:_______________________________________________`, formData.executedAt));
      paragraphs.push(filled(`Date:___________________________`, formData.executedDate));

      const borrowerBlock = `Borrower
Signature: ${formData.borrowerSignature || "___________________________"}
Printed Name: ${formData.borrowerPrintedName || "________________________"}
Date: ${formData.borrowerDate || "________________________________"}`;
      const lenderBlock = `Lender
Signature: ${formData.lenderSignature || "___________________________"}
Printed Name: ${formData.lenderPrintedName || "________________________"}
Date: ${formData.lenderDate || "________________________________"}`;

      paragraphs.push(borrowerBlock);
      paragraphs.push(lenderBlock);

      paragraphs.push(
        `Optional NotarizationState of ${formData.notarizationState || "___________________"} )County of ${formData.notarizationCounty || "_________________"} )On this ${formData.notarizationDay || "___"} day of ${formData.notarizationMonth || "__________"}, ${formData.notarizationYear || "-----------"}, before me, the undersigned Notary Public, personally appeared ${formData.borrowerPrintedName || "________________________"} (Borrower) and ${formData.lenderPrintedName || "________________________"} (Lender), who acknowledged that they executed the foregoing Payment Agreement for the purposes therein contained.`
      );

paragraphs.push(
  `Notary Public: ${formData.notaryPublic || "___________________________"} Commission Expires: ${formData.commissionExpires || "______________________"}`
);

      // add paragraphs verbatim
      paragraphs.forEach((p) => {
        addText(p);
        currentY += 6;
      });

      doc.save("payment-agreement.pdf");
      toast.success("Payment Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Payment Agreement PDF");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Parties & Agreement Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Day</Label>
                  <Input value={formData.day} onChange={(e) => handleInputChange("day", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Month</Label>
                  <Input value={formData.month} onChange={(e) => handleInputChange("month", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input value={formData.year} onChange={(e) => handleInputChange("year", e.target.value)} placeholder="" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Borrower - Full Legal Name</Label>
                <Input value={formData.borrowerName} onChange={(e) => handleInputChange("borrowerName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Borrower - Address</Label>
                <Textarea value={formData.borrowerAddress} onChange={(e) => handleInputChange("borrowerAddress", e.target.value)} placeholder="" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Borrower - Contact No.</Label>
                  <Input value={formData.borrowerContact} onChange={(e) => handleInputChange("borrowerContact", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Borrower - Email</Label>
                  <Input value={formData.borrowerEmail} onChange={(e) => handleInputChange("borrowerEmail", e.target.value)} placeholder="" />
                </div>
              </div>

              <hr />

              <div className="space-y-2">
                <Label>Lender - Full Legal Name</Label>
                <Input value={formData.lenderName} onChange={(e) => handleInputChange("lenderName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Lender - Address</Label>
                <Textarea value={formData.lenderAddress} onChange={(e) => handleInputChange("lenderAddress", e.target.value)} placeholder="" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Lender - Contact No.</Label>
                  <Input value={formData.lenderContact} onChange={(e) => handleInputChange("lenderContact", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Lender - Email</Label>
                  <Input value={formData.lenderEmail} onChange={(e) => handleInputChange("lenderEmail", e.target.value)} placeholder="" />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Loan & Repayment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Loan Amount (US $)</Label>
                <Input value={formData.loanAmount} onChange={(e) => handleInputChange("loanAmount", e.target.value)} placeholder="" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Interest Rate (percent)</Label>
                  <Input value={formData.interestRate} onChange={(e) => handleInputChange("interestRate", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Interest Percent (repeat)</Label>
                  <Input value={formData.interestPercent} onChange={(e) => handleInputChange("interestPercent", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Interest Basis</Label>
                  <Input value={formData.interestBasis} onChange={(e) => handleInputChange("interestBasis", e.target.value)} placeholder="[simple/compound]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Installment Amount (US $)</Label>
                <Input value={formData.installmentAmount} onChange={(e) => handleInputChange("installmentAmount", e.target.value)} placeholder="" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Commencement Date</Label>
                  <Input value={formData.commencementDate} onChange={(e) => handleInputChange("commencementDate", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Due Date (Maturity Date)</Label>
                  <Input value={formData.dueDate} onChange={(e) => handleInputChange("dueDate", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Payment Frequency</Label>
                  <Input value={formData.paymentFrequency} onChange={(e) => handleInputChange("paymentFrequency", e.target.value)} placeholder="" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Method of Payment</Label>
                <Input value={formData.paymentMethod} onChange={(e) => handleInputChange("paymentMethod", e.target.value)} placeholder="check, bank transfer, etc." />
              </div>

              <div className="space-y-2">
                <Label>Prepayment Text (optional)</Label>
                <Textarea value={formData.prepaymentText} onChange={(e) => handleInputChange("prepaymentText", e.target.value)} placeholder="Leave blank to keep original wording" />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Security, Default & Misc</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Collateral / Security Text (optional)</Label>
                <Textarea value={formData.collateralText} onChange={(e) => handleInputChange("collateralText", e.target.value)} placeholder="Leave blank to keep original wording" />
              </div>

              <div className="space-y-2">
                <Label>Governing Law - State</Label>
                <Input value={formData.governingLawState} onChange={(e) => handleInputChange("governingLawState", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Jurisdiction - Court Location</Label>
                <Input value={formData.jurisdictionLocation} onChange={(e) => handleInputChange("jurisdictionLocation", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Execution, Signatures & Notary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Executed at (place)</Label>
                <Input value={formData.executedAt} onChange={(e) => handleInputChange("executedAt", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Executed Date (replace Date:_____)</Label>
                <Input value={formData.executedDate} onChange={(e) => handleInputChange("executedDate", e.target.value)} placeholder="" />
              </div>

              <hr />

              <div className="space-y-2">
                <Label>Borrower - Printed Name</Label>
                <Input value={formData.borrowerPrintedName} onChange={(e) => handleInputChange("borrowerPrintedName", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Borrower - Signature (typed)</Label>
                <Input value={formData.borrowerSignature} onChange={(e) => handleInputChange("borrowerSignature", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Borrower - Date</Label>
                <Input value={formData.borrowerDate} onChange={(e) => handleInputChange("borrowerDate", e.target.value)} />
              </div>

              <hr />

              <div className="space-y-2">
                <Label>Lender - Printed Name</Label>
                <Input value={formData.lenderPrintedName} onChange={(e) => handleInputChange("lenderPrintedName", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Lender - Signature (typed)</Label>
                <Input value={formData.lenderSignature} onChange={(e) => handleInputChange("lenderSignature", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Lender - Date</Label>
                <Input value={formData.lenderDate} onChange={(e) => handleInputChange("lenderDate", e.target.value)} />
              </div>

              <hr />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Notarization - Name</Label>
                  <Input value={formData.notaryPublic } onChange={(e) => handleInputChange("notaryPublic", e.target.value)} placeholder="" />
                </div>
                
                <div>
                  <Label>Notarization - State</Label>
                  <Input value={formData.notarizationState} onChange={(e) => handleInputChange("notarizationState", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Notarization - County</Label>
                  <Input value={formData.notarizationCounty} onChange={(e) => handleInputChange("notarizationCounty", e.target.value)} placeholder="" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Notarization - Day</Label>
                  <Input value={formData.notarizationDay} onChange={(e) => handleInputChange("notarizationDay", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Notarization - Month</Label>
                  <Input value={formData.notarizationMonth} onChange={(e) => handleInputChange("notarizationMonth", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Notarization - Year</Label>
                  <Input value={formData.notarizationYear} onChange={(e) => handleInputChange("notarizationYear", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Commission Expire Date</Label>
                  <Input value={formData.commissionExpires } onChange={(e) => handleInputChange("commissionExpires", e.target.value)} placeholder="" />
                </div>
              </div>

              
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Agreement</h1>
        <p className="text-gray-600">Complete the fields below and export the Payment Agreement as a PDF (verbatim).</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 4</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / 4) * 100}%` }} />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep < 4 ? (
            <Button onClick={nextStep} className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={generatePDF}>Generate PDF</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentAgreementForm;
