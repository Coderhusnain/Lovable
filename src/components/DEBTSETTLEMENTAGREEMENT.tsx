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
  date: string;
  creditorName: string;
  creditorAddress: string;
  creditorContact: string;
  debtorName: string;
  debtorAddress: string;
  debtorContact: string;
  outstandingAmount: string;
  debtNature: string;
  settlementAmount: string;
  settlementPaymentMethod: string;
  settlementDueDate: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  failureConsequenceText: string;
  initialReleasor1: string;
  initialReleasor2: string;
  initialDebtor1: string;
  initialDebtor2: string;
  governingState: string;
  governingCountyState: string;
  creditorSignerName: string;
  creditorSignerTitle: string;
  creditorSignerDate: string;
  debtorSignerName: string;
  debtorSignerTitle: string;
  debtorSignerDate: string;
}

const defaultFormData: FormData = {
  date: "",
  creditorName: "",
  creditorAddress: "",
  creditorContact: "",
  debtorName: "",
  debtorAddress: "",
  debtorContact: "",
  outstandingAmount: "",
  debtNature: "",
  settlementAmount: "",
  settlementPaymentMethod: "",
  settlementDueDate: "",
  accountName: "",
  bankName: "",
  accountNumber: "",
  routingNumber: "",
  failureConsequenceText: "",
  initialReleasor1: "",
  initialReleasor2: "",
  initialDebtor1: "",
  initialDebtor2: "",
  governingState: "",
  governingCountyState: "",
  creditorSignerName: "",
  creditorSignerTitle: "",
  creditorSignerDate: "",
  debtorSignerName: "",
  debtorSignerTitle: "",
  debtorSignerDate: "",
};

const DebtSettlementAgreementForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 5));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const filled = (template: string, replacement: string) => {
    if (!replacement || replacement.trim() === "") return template;
    // Replace either underscores or bracketed placeholders
    return template.replace(/_{3,}|\[.*?\]/, replacement);
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

      paragraphs.push(
        `DEBT SETTLEMENT AGREEMENT\nThis Debt Settlement Agreement (\u201cAgreement\u201d) is made and entered into as of ${formData.date || "[Date]"}, by and between the following parties:`
      );

      paragraphs.push(
        `Creditor:\nName: ${formData.creditorName || "__________________________"}\nAddress: ${formData.creditorAddress || "__________________________"}\nTelephone/Email: ${formData.creditorContact || "__________________________"}`
      );

      paragraphs.push(
        `Debtor:\nName: ${formData.debtorName || "________________________"}\nAddress: ${formData.debtorAddress || "________________________"}\nTelephone/Email: ${formData.debtorContact || "________________________"}`
      );

      paragraphs.push(`Collectively referred to herein as the \u201cParties,\u201d and individually as a \u201cParty.\u201d`);

      paragraphs.push(
        `RECITALS\nWHEREAS, the Debtor is indebted to the Creditor in the total amount of ${formData.outstandingAmount || "[insert amount]"} (the \u201cOutstanding Debt\u201d) arising from ${formData.debtNature || "[describe the nature of the debt, e.g., a loan, promissory note, or credit account]"}; and\nWHEREAS, the Parties desire to fully and finally resolve, discharge, and settle the Outstanding Debt and any related claims, disputes, or obligations between them without resort to litigation; and\nWHEREAS, the Creditor has agreed to accept a reduced amount in full and final satisfaction of the Outstanding Debt, under the terms and conditions set forth herein.`
      );

      paragraphs.push(
        `NOW, THEREFORE, in consideration of the mutual covenants, promises, and representations contained herein, and intending to be legally bound, the Parties agree as follows:`
      );

      // Section 1
      paragraphs.push(
        `1. ACKNOWLEDGMENT OF DEBT\n1.1 The Debtor acknowledges and confirms that the Outstanding Debt owed to the Creditor as of the date of this Agreement is ${formData.outstandingAmount || "[amount in figures and words]"}.\n1.2 The Debtor represents that the amount stated above constitutes the entire balance due and payable, and that there are no other claims, set-offs, or counterclaims against the Creditor related to this obligation.`
      );

      // Section 2
      paragraphs.push(
        `2. SETTLEMENT TERMS\n2.1 The Creditor agrees to accept payment in the amount of ${formData.settlementAmount || "[insert settlement amount in figures and words]"} (the \u201cSettlement Amount\u201d) as full and final satisfaction of the Outstanding Debt.\n2.2 The Settlement Amount shall be paid by the Debtor via ${formData.settlementPaymentMethod || "[wire transfer / certified check / cashier’s check / cash]"} to the Creditor on or before ${formData.settlementDueDate || "[insert payment due date]"}.\n2.3 Payment shall be made to the following account or address as designated by the Creditor:\nAccount Name: ${formData.accountName || "________________________"}\nBank Name: ${formData.bankName || "________________________"}\nAccount Number: ${formData.accountNumber || "________________________"}\nRouting Number: ${formData.routingNumber || "________________________"}\n2.4 Upon receipt and clearance of the full Settlement Amount, the Creditor shall release the Debtor from any further obligation or liability in connection with the Outstanding Debt.`
      );

      // Section 3
      paragraphs.push(
        `3. FAILURE TO PAY\n3.1 Should the Debtor fail to remit the full Settlement Amount by the due date specified in Clause 2.2, this Agreement shall be deemed null and void, and the Creditor shall be entitled to demand immediate payment of the original amount owed plus any accrued interest, fees, or costs recoverable under applicable law.\n3.2 The Debtor acknowledges that failure to comply with the payment obligation herein may result in legal action or other enforcement proceedings by the Creditor.`
      );

      // Section 4
      paragraphs.push(
        `4. RELEASE AND WAIVER\n4.1 Upon full receipt of the Settlement Amount, the Creditor hereby fully and irrevocably releases, acquits, and forever discharges the Debtor and the Debtor’s successors, assigns, agents, and representatives from any and all claims, actions, causes of action, suits, debts, accounts, or demands whatsoever, whether known or unknown, arising from or related to the Outstanding Debt.\n4.2 The Parties expressly acknowledge and agree that this release constitutes a full and final settlement and discharge of any and all disputes and liabilities relating to the debt.`
      );

      // Section 5
      paragraphs.push(
        `5. WAIVER OF CALIFORNIA CIVIL CODE \u00a7 1542\nTo the extent applicable, the Parties expressly waive the provisions of California Civil Code Section 1542, which provides as follows:\n\u201cA GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR(S) DO NOT KNOW OR SUSPECT TO EXIST IN THEIR FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH, IF KNOWN BY THEM, MUST HAVE MATERIALLY AFFECTED THEIR SETTLEMENT WITH THE DEBTOR(S).\u201d\nEach Party acknowledges that they have read and understood this provision, and that they are voluntarily waiving any and all rights thereunder. The Parties further acknowledge that this waiver has been fully explained to them by their respective legal counsel (if any), and that they understand the legal consequences of such waiver.\nInitials of Releasor(s): ${formData.initialReleasor1 || "_______"} ${formData.initialReleasor2 || "_______"}\nInitials of Debtor(s): ${formData.initialDebtor1 || "_______"} ${formData.initialDebtor2 || "_______"}`
      );

      // Section 6
      paragraphs.push(
        `6. REPRESENTATIONS AND WARRANTIES\n6.1 Each Party represents and warrants that:\n\u2022They have full legal authority and capacity to enter into and perform this Agreement;\n\u2022This Agreement constitutes a valid and binding obligation, enforceable in accordance with its terms; and\n\u2022They have not assigned, transferred, or otherwise conveyed any claim or right related to the subject matter of this Agreement to any third party.`
      );

      // Section 7
      paragraphs.push(
        `7. CONFIDENTIALITY\n7.1 The Parties agree to maintain strict confidentiality regarding the existence and terms of this Agreement, except as required by law or as may be necessary to enforce its provisions.\n7.2 Neither Party shall make any public statements, disclosures, or communications concerning the settlement except by mutual written consent.`
      );

      // Section 8
      paragraphs.push(`8. NO ADMISSION OF LIABILITY\n8.1 This Agreement represents a compromise of disputed claims and shall not be construed as an admission of liability, wrongdoing, or fault by either Party.`);

      // Section 9
      paragraphs.push(`9. ENTIRE AGREEMENT\n9.1 This Agreement constitutes the entire understanding between the Parties concerning the subject matter hereof and supersedes all prior or contemporaneous negotiations, representations, promises, and agreements, whether oral or written.\n9.2 No amendment or modification of this Agreement shall be valid unless made in writing and signed by both Parties.`);

      // Section 10
      paragraphs.push(`10. SEVERABILITY\n10.1 If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall remain in full force and effect and shall be construed to give maximum legal effect to the Parties’ intentions.`);

      // Section 11
      paragraphs.push(
        `11. GOVERNING LAW AND JURISDICTION\n11.1 This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingState || "[insert state]"}, without regard to its conflict of law principles.\n11.2 Any disputes arising from or related to this Agreement shall be subject to the exclusive jurisdiction of the courts located within ${formData.governingCountyState || "[insert county and state]"}.`
      );

      // Section 12
      paragraphs.push(
        `12. EXECUTION AND COUNTERPARTS\n12.1 This Agreement may be executed in multiple counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument.\n12.2 Electronic signatures, facsimile copies, or scanned versions of this Agreement shall be deemed legally binding as originals.`
      );

      // Execution block
      paragraphs.push(
        `IN WITNESS WHEREOF, the Parties hereto have executed this Debt Settlement Agreement as of the date first above written.`
      );

      paragraphs.push(
        `Creditor\tDebtor\nBy: ${formData.creditorSignerName || "_______________________"}\tBy: ${formData.debtorSignerName || "_______________________"}\nName: ${formData.creditorSignerName || "_____________________"}\tName: ${formData.debtorSignerName || "_____________________"}\nTitle (if applicable): ${formData.creditorSignerTitle || "________________"}\tTitle (if applicable): ${formData.debtorSignerTitle || "________________"}\nDate: ${formData.creditorSignerDate || "_____________________"}\tDate: ${formData.debtorSignerDate || "_____________________"}`
      );

      paragraphs.push(`ACKNOWLEDGMENT\nBoth Parties acknowledge that they have carefully read this Agreement, fully understand its terms, and voluntarily execute it with the intent to be legally bound.`);

      // write to PDF verbatim
      paragraphs.forEach((p) => {
        addText(p);
        currentY += 6;
      });

      doc.save("debt-settlement-agreement.pdf");
      toast.success("Debt Settlement Agreement PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Debt Settlement Agreement PDF");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Parties & Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Date (e.g., Oct 30, 2025)</Label>
                <Input value={formData.date} onChange={(e) => handleInputChange("date", e.target.value)} placeholder="[Date]" />
              </div>

              <div className="space-y-2">
                <Label>Creditor - Name</Label>
                <Input value={formData.creditorName} onChange={(e) => handleInputChange("creditorName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Creditor - Address</Label>
                <Textarea value={formData.creditorAddress} onChange={(e) => handleInputChange("creditorAddress", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Creditor - Telephone/Email</Label>
                <Input value={formData.creditorContact} onChange={(e) => handleInputChange("creditorContact", e.target.value)} placeholder="" />
              </div>

              <hr />

              <div className="space-y-2">
                <Label>Debtor - Name</Label>
                <Input value={formData.debtorName} onChange={(e) => handleInputChange("debtorName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Debtor - Address</Label>
                <Textarea value={formData.debtorAddress} onChange={(e) => handleInputChange("debtorAddress", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Debtor - Telephone/Email</Label>
                <Input value={formData.debtorContact} onChange={(e) => handleInputChange("debtorContact", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recitals & Amounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Outstanding Debt (amount in figures & words)</Label>
                <Input value={formData.outstandingAmount} onChange={(e) => handleInputChange("outstandingAmount", e.target.value)} placeholder="[insert amount]" />
              </div>

              <div className="space-y-2">
                <Label>Nature of Debt (describe)</Label>
                <Textarea value={formData.debtNature} onChange={(e) => handleInputChange("debtNature", e.target.value)} placeholder="[describe the nature of the debt, e.g., a loan, promissory note, or credit account]" />
              </div>

              <div className="space-y-2">
                <Label>Settlement Amount (figures & words)</Label>
                <Input value={formData.settlementAmount} onChange={(e) => handleInputChange("settlementAmount", e.target.value)} placeholder="[insert settlement amount]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Payment Method</Label>
                  <Input value={formData.settlementPaymentMethod} onChange={(e) => handleInputChange("settlementPaymentMethod", e.target.value)} placeholder="wire transfer / certified check / cash" />
                </div>
                <div>
                  <Label>Payment Due Date</Label>
                  <Input value={formData.settlementDueDate} onChange={(e) => handleInputChange("settlementDueDate", e.target.value)} placeholder="[insert payment due date]" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Account Name</Label>
                <Input value={formData.accountName} onChange={(e) => handleInputChange("accountName", e.target.value)} placeholder="" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Bank Name</Label>
                  <Input value={formData.bankName} onChange={(e) => handleInputChange("bankName", e.target.value)} placeholder="" />
                </div>
                <div>
                  <Label>Account Number</Label>
                  <Input value={formData.accountNumber} onChange={(e) => handleInputChange("accountNumber", e.target.value)} placeholder="" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Routing Number</Label>
                <Input value={formData.routingNumber} onChange={(e) => handleInputChange("routingNumber", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Failure, Release & Waiver</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Failure consequence text (optional — keeps original if blank)</Label>
                <Textarea value={formData.failureConsequenceText} onChange={(e) => handleInputChange("failureConsequenceText", e.target.value)} placeholder="Leave blank to preserve original clause text" />
              </div>

              <div className="space-y-2">
                <Label>Initials of Releasor(s) - 1</Label>
                <Input value={formData.initialReleasor1} onChange={(e) => handleInputChange("initialReleasor1", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Initials of Releasor(s) - 2</Label>
                <Input value={formData.initialReleasor2} onChange={(e) => handleInputChange("initialReleasor2", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Initials of Debtor(s) - 1</Label>
                <Input value={formData.initialDebtor1} onChange={(e) => handleInputChange("initialDebtor1", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Initials of Debtor(s) - 2</Label>
                <Input value={formData.initialDebtor2} onChange={(e) => handleInputChange("initialDebtor2", e.target.value)} placeholder="" />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Governing Law & Misc</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Governing State</Label>
                <Input value={formData.governingState} onChange={(e) => handleInputChange("governingState", e.target.value)} placeholder="[insert state]" />
              </div>

              <div className="space-y-2">
                <Label>Governing County & State</Label>
                <Input value={formData.governingCountyState} onChange={(e) => handleInputChange("governingCountyState", e.target.value)} placeholder="[insert county and state]" />
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Execution & Signatures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Creditor - Signer Name</Label>
                <Input value={formData.creditorSignerName} onChange={(e) => handleInputChange("creditorSignerName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Creditor - Title (if applicable)</Label>
                <Input value={formData.creditorSignerTitle} onChange={(e) => handleInputChange("creditorSignerTitle", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Creditor - Date</Label>
                <Input value={formData.creditorSignerDate} onChange={(e) => handleInputChange("creditorSignerDate", e.target.value)} placeholder="" />
              </div>

              <hr />

              <div className="space-y-2">
                <Label>Debtor - Signer Name</Label>
                <Input value={formData.debtorSignerName} onChange={(e) => handleInputChange("debtorSignerName", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Debtor - Title (if applicable)</Label>
                <Input value={formData.debtorSignerTitle} onChange={(e) => handleInputChange("debtorSignerTitle", e.target.value)} placeholder="" />
              </div>

              <div className="space-y-2">
                <Label>Debtor - Date</Label>
                <Input value={formData.debtorSignerDate} onChange={(e) => handleInputChange("debtorSignerDate", e.target.value)} placeholder="" />
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Debt Settlement Agreement</h1>
        <p className="text-gray-600">Fill all required fields and export the Debt Settlement Agreement as a PDF. Nothing will be skipped.</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium text-gray-700">Step {currentStep} of 5</div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / 5) * 100}%` }} />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {currentStep < 5 ? (
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

export default DebtSettlementAgreementForm;
