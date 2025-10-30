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
  agreementDay: string;
  agreementMonth: string;
  agreementYear: string;
  borrowerName: string;
  borrowerAddress: string;
  lenderName: string;
  lenderAddress: string;
  loanAmount: string;
  disbursementDate: string;
  dueDate: string;
  installmentAmount: string;
  installmentStartDate: string;
  interestRate: string;
  latePaymentFee: string;
  lateFeeDays: string;
  governingLawState: string;
  executionLocation: string;
  executionDate: string;
  borrowerSignatureDate: string;
  lenderSignatureDate: string;
}

const defaultFormData: FormData = {
  agreementDay: "",
  agreementMonth: "",
  agreementYear: "",
  borrowerName: "",
  borrowerAddress: "",
  lenderName: "",
  lenderAddress: "",
  loanAmount: "",
  disbursementDate: "",
  dueDate: "",
  installmentAmount: "",
  installmentStartDate: "",
  interestRate: "",
  latePaymentFee: "",
  lateFeeDays: "",
  governingLawState: "",
  executionLocation: "",
  executionDate: "",
  borrowerSignatureDate: "",
  lenderSignatureDate: "",
};

const PromissoryNoteForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 4));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const filled = (template: string, replacement: string) => {
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

      const paragraphs: string[] = [];

      // Header and parties
      paragraphs.push(
        `PROMISSORY NOTE AGREEMENTThis Promissory Note Agreement (“Agreement”)is made and entered into on this ${formData.agreementDay || "___"} day of ${formData.agreementMonth || "_______"}, ${formData.agreementYear || "-------"}, by and between:Borrower:${formData.borrowerName || "_____________________________________"}Address:${formData.borrowerAddress || "_______________________________________"}ANDLender:${formData.lenderName || "________________________________________"}Address:${formData.lenderAddress || "_______________________________________"}The Borrower and the Lender are hereinafter collectively referred to as the “Parties.”`
      );

      // Section 1
      paragraphs.push(
        `1. LOAN DETAILS1.1 Principal Amount:The Lender hereby lends to the Borrower the sum of US $${formData.loanAmount || "_________"}(“Loan Amount”).1.2 Disbursement Date:${formData.disbursementDate || "___________________________"}1.3 Due Date:${formData.dueDate || "----------, --------(unless otherwise amended in writing)."}`
      );

      // Section 2
      paragraphs.push(
        `2. TERMS OF REPAYMENT2.1 Installments:The Borrower shall repay the Loan Amount in monthly installments of US $${formData.installmentAmount || "_________"}each, commencing on ${formData.installmentStartDate || "__________"} and continuing until the Due Date, at which time all remaining unpaid principal and interest shall be due in full.2.2 Interest Rate:The unpaid principal remaining after the Due Date shall accrue interest at a rate of ${formData.interestRate || "_____"} % per annumuntil paid in full.2.3 Application of Payments:Payments received shall first be applied to any accrued interest, then to the principal balance.2.4 Late Payment Fee:A late charge of US $${formData.latePaymentFee || "_________"}shall apply to any installment unpaid more than ${formData.lateFeeDays || "_____"} day(s) after its Due Date. This charge constitutes liquidated damages and not a penalty.2.5 Acceleration of Debt:Upon failure to pay any installment when due, the Lender may, at its option, declare theentire unpaid principal and accrued interest immediately due and payable.`
      );

      // Section 3
      paragraphs.push(
        `3. PREPAYMENTThe Borrower may prepay this Note, in whole or in part, at any time before the Due Date without incurring any prepayment penalty.`
      );

      // Section 4
      paragraphs.push(
        `4. COLLECTION COSTSIn the event of default, the Borrower agrees to pay all reasonable costs of collection, including attorney’s fees and court costs, whether or not legal action is initiated.`
      );

      // Section 5
      paragraphs.push(
        `5. EVENTS OF DEFAULTThe occurrence of any of the following events shall constitute a Defaultunder this Agreement, and the entire balance shall become immediately due and payable without notice:(a) Failure to pay principal or accrued interest when due;(b) Death, liquidation, or dissolution of the Borrower;(c) Borrower’s insolvency or filing of bankruptcy;(d) Appointment of a receiver for the Borrower;(e) Assignment for the benefit of creditors;(f) Misrepresentation by the Borrower to obtain or extend credit; or(g) Sale or transfer of a material portion of the Borrower’s assets or business.`
      );

      // Section 6
      paragraphs.push(
        `6. SEVERABILITYIf any provision of this Agreement is determined to be invalid or unenforceable, the remaining provisions shall remain valid, binding, and enforceable to the fullest extent permitted by law.`
      );

      // Section 7
      paragraphs.push(
        `7. MISCELLANEOUS7.1 Currency:All payments ofprincipal and interest shall be made in lawful currency of the United States.7.2 Waiver:No delay or omission by the Lender in exercising any right under this Agreement shall operate as a waiver of such right. All rights and remedies of the Lender are cumulative and may be exercised concurrently or consecutively.7.3 Amendment:No amendment, modification, or waiver of any provision of this Agreement shall be valid unless made in writing and signed by both Parties.`
      );

      // Section 8
      paragraphs.push(filled(`8. GOVERNING LAWThis Agreement shall be governed by and construed in accordance with the laws of the State of _________________________.`, formData.governingLawState));

      // Section 9 and execution block
      paragraphs.push(
        `9. EXECUTIONIN WITNESS WHEREOF, the Parties hereto have executed this Promissory Note Agreement as of the date first written above.`
      );

      paragraphs.push(filled(`Executed at:___________________________________________`, formData.executionLocation));
      paragraphs.push(filled(`Date:_______________________`, formData.executionDate));

      const borrowerLine = `Borrower\n${formData.borrowerName || "______________________________________________________________"}\nSignature___________________________\nDate: ${formData.borrowerSignatureDate || "______________________"}`;
      const lenderLine = `Lender\n${formData.lenderName || "______________________________________________________________"}\nSignature___________________________\nDate: ${formData.lenderSignatureDate || "______________________"}`;

      paragraphs.push(borrowerLine);
      paragraphs.push(lenderLine);

      // Add every paragraph verbatim to the PDF
      paragraphs.forEach((p) => {
        addText(p);
        currentY += 6;
      });

      doc.save("promissory-note-agreement.pdf");
      toast.success("Promissory Note PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Promissory Note PDF");
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
                  <Input value={formData.agreementDay} onChange={(e) => handleInputChange("agreementDay", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Month</Label>
                  <Input value={formData.agreementMonth} onChange={(e) => handleInputChange("agreementMonth", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input value={formData.agreementYear} onChange={(e) => handleInputChange("agreementYear", e.target.value)} placeholder="-------" />
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

              <hr />

              <div className="space-y-2">
                <Label>Lender - Full Legal Name</Label>
                <Input value={formData.lenderName} onChange={(e) => handleInputChange("lenderName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Lender - Address</Label>
                <Textarea value={formData.lenderAddress} onChange={(e) => handleInputChange("lenderAddress", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Loan Details & Repayment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Loan Amount (US $)</Label>
                <Input value={formData.loanAmount} onChange={(e) => handleInputChange("loanAmount", e.target.value)} placeholder="" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Disbursement Date</Label>
                  <Input value={formData.disbursementDate} onChange={(e) => handleInputChange("disbursementDate", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input value={formData.dueDate} onChange={(e) => handleInputChange("dueDate", e.target.value)} placeholder="----------, --------(unless otherwise amended in writing)." />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Installment Amount (US $)</Label>
                <Input value={formData.installmentAmount} onChange={(e) => handleInputChange("installmentAmount", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Installment Commencement Date</Label>
                <Input value={formData.installmentStartDate} onChange={(e) => handleInputChange("installmentStartDate", e.target.value)} placeholder="" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Interest Rate (%)</Label>
                  <Input value={formData.interestRate} onChange={(e) => handleInputChange("interestRate", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Late Payment Fee (US $)</Label>
                  <Input value={formData.latePaymentFee} onChange={(e) => handleInputChange("latePaymentFee", e.target.value)} placeholder="" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Late Fee - Days After Due Date</Label>
                <Input value={formData.lateFeeDays} onChange={(e) => handleInputChange("lateFeeDays", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Miscellaneous & Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Governing Law - State</Label>
                <Input value={formData.governingLawState} onChange={(e) => handleInputChange("governingLawState", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Execution Location (Executed at)</Label>
                <Input value={formData.executionLocation} onChange={(e) => handleInputChange("executionLocation", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Execution Date</Label>
                <Input value={formData.executionDate} onChange={(e) => handleInputChange("executionDate", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Signatures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Borrower - Signature Date</Label>
                <Input value={formData.borrowerSignatureDate} onChange={(e) => handleInputChange("borrowerSignatureDate", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Lender - Signature Date</Label>
                <Input value={formData.lenderSignatureDate} onChange={(e) => handleInputChange("lenderSignatureDate", e.target.value)} placeholder="" />
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Promissory Note Agreement</h1>
        <p className="text-gray-600">Fill in the fields and export the Promissory Note PDF. No text will be skipped.</p>
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

export default PromissoryNoteForm;
