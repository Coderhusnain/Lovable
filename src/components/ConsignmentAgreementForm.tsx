import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  consignorName: string;
  consignorAddress: string;
  consigneeName: string;
  consigneeAddress: string;
  merchandiseDescription: string;
  territory: string;
  pricingDesignatedParty: string;
  percentToConsignor: string;
  paymentDueDayNumber: string;
  inventoryReportNote: string;
  recordsAuditNoticeDays: string;
  insuranceCoverageAmount: string;
  payrollObligationsNote: string;
  indemnifyPayrollNote: string;
  defaultCureDays: string;
  disputeMediationNote: string;
  liabilityLimitNote: string;
  assignmentConsentNote: string;
  amendmentNote: string;
  severabilityNote: string;
  waiverNote: string;
  governingState: string;
  consignorSignName: string;
  consignorSignTitle: string;
  consignorSignDate: string;
  consigneeSignName: string;
  consigneeSignTitle: string;
  consigneeSignDate: string;
}

export default function ConsignmentAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    consignorName: "",
    consignorAddress: "",
    consigneeName: "",
    consigneeAddress: "",
    merchandiseDescription: "",
    territory: "",
    pricingDesignatedParty: "",
    percentToConsignor: "",
    paymentDueDayNumber: "",
    inventoryReportNote: "",
    recordsAuditNoticeDays: "7",
    insuranceCoverageAmount: "",
    payrollObligationsNote: "",
    indemnifyPayrollNote: "",
    defaultCureDays: "30",
    disputeMediationNote: "",
    liabilityLimitNote: "",
    assignmentConsentNote: "",
    amendmentNote: "",
    severabilityNote: "",
    waiverNote: "",
    governingState: "",
    consignorSignName: "",
    consignorSignTitle: "",
    consignorSignDate: "",
    consigneeSignName: "",
    consigneeSignTitle: "",
    consigneeSignDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 8;
    let currentY = margin;

    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("times", isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, textWidth);
      lines.forEach((line: string) => {
        if (currentY > doc.internal.pageSize.getHeight() - margin) {
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

    // === CONSIGNMENT AGREEMENT CONTENT ===
    addText("CONSIGNMENT AGREEMENT", 14, true, true);
    addText("\n");
    addText(
      `This Consignment Agreement (the “Agreement”) is entered into and made effective as of ${formData.effectiveDate || "[Effective Date]"}, by and between ${formData.consignorName || "[Consignor’s Name/Entity]"}, having its principal place of business at ${formData.consignorAddress || "[address]"} (the “Consignor”), and ${formData.consigneeName || "[Consignee’s Name/Entity]"}, having its principal place of business at ${formData.consigneeAddress || "[address]"} (the “Consignee”). The Consignor and the Consignee may hereinafter be referred to individually as a “Party” and collectively as the “Parties.”`
    );

    addText("\nI. Right to Sell");
    addText(`1.1 The Consignor is the lawful owner of ${formData.merchandiseDescription || "[describe goods/merchandise]"} (the “Merchandise”).`);
    addText("1.2 The Consignor hereby grants to the Consignee the exclusive right to sell the Merchandise on consignment, subject to the terms and conditions of this Agreement.");
    addText(`1.3 This grant of exclusivity shall apply solely to the following defined sales territory: ${formData.territory || "[describe territory]"}.`);
    addText("1.4 The Consignor agrees to deliver the Merchandise to the Consignee on consignment, and the Consignee agrees to use its best efforts to promote, market, and sell the Merchandise.");
    addText(`1.5 All final sales prices, discounts, and terms of sale shall be established by ${formData.pricingDesignatedParty || "[designating party: Consignor or Consignee]"}.`);

    addText("\nII. Proceeds of Sales");
    addText(`2.1 The Consignee shall remit to the Consignor ${formData.percentToConsignor || "[percentage]"}% of the gross proceeds received from the sale of the Merchandise.`);
    addText(`2.2 Payments shall be made to the Consignor in installments on or before the ${formData.paymentDueDayNumber || "[number]"}th day following the close of each installment period in which the proceeds were collected.`);
    addText("2.3 With each payment, the Consignee shall provide the Consignor with a written report setting forth:");
    addText("• The calculation of proceeds and the Consignor’s share thereof; and");
    addText("• A detailed statement of current inventory levels.");
    if (formData.inventoryReportNote) addText(formData.inventoryReportNote);

    addText("\nIII. Records");
    addText("3.1 The Consignee shall maintain accurate, complete, and up-to-date books and records of all sales of the Merchandise.");
    addText(`3.2 The Consignor shall have the right, upon reasonable prior written notice, to inspect and audit such records during regular business hours${formData.recordsAuditNoticeDays ? ` (with ${formData.recordsAuditNoticeDays} days' prior notice)` : ""}.`);

    addText("\nIV. Title to Merchandise");
    addText("4.1 Title to all consigned Merchandise shall at all times remain with the Consignor until such Merchandise is sold to a bona fide purchaser.");
    addText("4.2 The Consignee shall have no right, title, or ownership interest in the Merchandise except as expressly set forth herein.");

    addText("\nV. Risk of Loss and Insurance");
    addText("5.1 The Consignee shall be solely responsible for any loss, theft, shortage, or damage to the Merchandise while in its possession, custody, or control.");
    addText(`5.2 The Consignee shall, at its own cost and expense, maintain insurance in adequate amounts to fully replace the Merchandise in the event of such loss, theft, or damage. ${formData.insuranceCoverageAmount ? `Insurance amount / coverage note: ${formData.insuranceCoverageAmount}` : ""}`);

    addText("\nVI. Payroll Taxes and Employment Obligations");
    addText("6.1 The Consignee shall be solely responsible for all payroll taxes, employee benefits, workers’ compensation, and insurance obligations relating to its employees engaged in the performance of this Agreement.");
    addText(`6.2 The Consignee shall indemnify, defend, and hold harmless the Consignor from any claims or liabilities arising out of such employment obligations. ${formData.indemnifyPayrollNote || ""}`);

    addText("\nVII. Defaults");
    addText("7.1 Any of the following shall constitute a default under this Agreement:");
    addText("(a) Failure of the Consignee to remit payment to the Consignor when due;");
    addText("(b) Breach of any other material obligation under this Agreement;");
    addText("(c) Insolvency, bankruptcy, or receivership of either Party.");
    addText("7.2 In the event of default, the non-defaulting Party shall have the right to terminate this Agreement by giving written notice of termination.");
    addText(`7.3 The defaulting Party shall have ${formData.defaultCureDays || "[number]"} days from receipt of notice to cure the default. If the default is not cured within such period, termination shall become effective automatically.`);

    addText("\nVIII. Dispute Resolution");
    addText("8.1 The Parties shall first attempt in good faith to resolve any dispute, controversy, or claim arising under this Agreement through amicable negotiation.");
    addText("8.2 If negotiation fails, the dispute shall be submitted to mediation conducted under the applicable statutory rules of mediation.");
    addText("8.3 If mediation does not resolve the matter, either Party may pursue other remedies available under applicable law.");
    if (formData.disputeMediationNote) addText(formData.disputeMediationNote);

    addText("\nIX. Warranties and Limitation of Liability");
    addText("9.1 Neither Party makes any representations or warranties, express or implied, regarding the condition, merchantability, or fitness for a particular purpose of the Merchandise.");
    addText(`9.2 In no event shall either Party be liable to the other for any indirect, incidental, consequential, or special damages, including without limitation loss of profits, even if advised of the possibility of such damages. ${formData.liabilityLimitNote || ""}`);

    addText("\nX. Transfer of Rights");
    addText("10.1 This Agreement shall be binding upon, and inure to the benefit of, the Parties and their respective heirs, executors, administrators, successors, and permitted assigns.");
    addText("10.2 Neither Party may assign or transfer its rights or obligations under this Agreement without the prior written consent of the other Party.");
    if (formData.assignmentConsentNote) addText(formData.assignmentConsentNote);

    addText("\nXI. Entire Agreement");
    addText("11.1 This Agreement constitutes the entire agreement between the Parties with respect to the subject matter herein and supersedes all prior or contemporaneous oral or written agreements or understandings.");

    addText("\nXII. Amendment");
    addText("12.1 This Agreement may be amended, modified, or supplemented only by a written instrument executed by both Parties.");
    if (formData.amendmentNote) addText(formData.amendmentNote);

    addText("\nXIII. Severability");
    addText("13.1 If any provision of this Agreement is determined by a court of competent jurisdiction to be invalid or unenforceable, such provision shall be enforced to the fullest extent permissible, and the remaining provisions shall remain in full force and effect.");
    if (formData.severabilityNote) addText(formData.severabilityNote);

    addText("\nXIV. Waiver of Contractual Rights");
    addText("14.1 The failure of either Party to enforce any provision of this Agreement shall not be construed as a waiver of such provision, nor shall it affect the right of such Party thereafter to enforce every provision of this Agreement strictly in accordance with its terms.");
    if (formData.waiverNote) addText(formData.waiverNote);

    addText("\nXV. Governing Law");
    addText(`15.1 This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${formData.governingState || "[insert state]"}, without regard to its conflict-of-law principles.`);

    addText("\nXVI. Execution and Signatures");
    addText("16.1 This Agreement shall be executed by the duly authorized representatives of the Parties and shall be effective as of the Effective Date.");
    addText("\n");
    addText("CONSIGNOR: ___________________________");
    addText(`Name: ${formData.consignorSignName || "________________"}`);
    addText(`Title (if applicable): ${formData.consignorSignTitle || "________________"}`);
    addText(`Date: ${formData.consignorSignDate || "________________"}`);
    addText("\nCONSIGNEE: ___________________________");
    addText(`Name: ${formData.consigneeSignName || "________________"}`);
    addText(`Title (if applicable): ${formData.consigneeSignTitle || "________________"}`);
    addText(`Date: ${formData.consigneeSignDate || "________________"}`);

    // Save file
    doc.save("Consignment_Agreement.pdf");
    setPdfGenerated(true);
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Effective Date</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              <Label>Consignor Name / Entity</Label>
              <Input name="consignorName" value={formData.consignorName} onChange={handleChange} />
              <Label>Consignor Address</Label>
              <Input name="consignorAddress" value={formData.consignorAddress} onChange={handleChange} />
              <Label>Consignee Name / Entity</Label>
              <Input name="consigneeName" value={formData.consigneeName} onChange={handleChange} />
              <Label>Consignee Address</Label>
              <Input name="consigneeAddress" value={formData.consigneeAddress} onChange={handleChange} />
              <Label>Merchandise Description</Label>
              <textarea
                name="merchandiseDescription"
                value={formData.merchandiseDescription}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={4}
              />
              <Label>Territory (exclusive sales territory)</Label>
              <Input name="territory" value={formData.territory} onChange={handleChange} />
              <Label>Who sets final prices/discounts/terms?</Label>
              <Input name="pricingDesignatedParty" value={formData.pricingDesignatedParty} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Proceeds, Payments & Records</h3>
              <Label>Percent to Consignor (%)</Label>
              <Input name="percentToConsignor" value={formData.percentToConsignor} onChange={handleChange} />
              <Label>Payment Due Day Number (e.g., 15)</Label>
              <Input name="paymentDueDayNumber" value={formData.paymentDueDayNumber} onChange={handleChange} />
              <Label>Inventory / Payment Report Note</Label>
              <textarea
                name="inventoryReportNote"
                value={formData.inventoryReportNote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <Label>Records / Audit Notice Days</Label>
              <Input name="recordsAuditNoticeDays" value={formData.recordsAuditNoticeDays} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Title, Risk, Taxes & Defaults</h3>
              <Label>Insurance Coverage / Note</Label>
              <Input name="insuranceCoverageAmount" value={formData.insuranceCoverageAmount} onChange={handleChange} />
              <Label>Payroll / Employment Obligations Note</Label>
              <Input name="payrollObligationsNote" value={formData.payrollObligationsNote} onChange={handleChange} />
              <Label>Consignee Indemnity Re: Payroll</Label>
              <Input name="indemnifyPayrollNote" value={formData.indemnifyPayrollNote} onChange={handleChange} />
              <Label>Default Cure Days</Label>
              <Input name="defaultCureDays" value={formData.defaultCureDays} onChange={handleChange} />
              <Label>Dispute / Mediation Note</Label>
              <Input name="disputeMediationNote" value={formData.disputeMediationNote} onChange={handleChange} />
              <Label>Liability / Warranty Limitation Note</Label>
              <Input name="liabilityLimitNote" value={formData.liabilityLimitNote} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Boilerplate & Signatures</h3>
              <Label>Assignment / Transfer Note</Label>
              <Input name="assignmentConsentNote" value={formData.assignmentConsentNote} onChange={handleChange} />
              <Label>Amendment Note</Label>
              <Input name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} />
              <Label>Severability Note</Label>
              <Input name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
              <Label>Waiver Note</Label>
              <Input name="waiverNote" value={formData.waiverNote} onChange={handleChange} />
              <Label>Governing State</Label>
              <Input name="governingState" value={formData.governingState} onChange={handleChange} />
              <hr />
              <h4 className="font-semibold">Consignor Signatory</h4>
              <Label>Name</Label>
              <Input name="consignorSignName" value={formData.consignorSignName} onChange={handleChange} />
              <Label>Title (if applicable)</Label>
              <Input name="consignorSignTitle" value={formData.consignorSignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="consignorSignDate" value={formData.consignorSignDate} onChange={handleChange} />
              <h4 className="font-semibold">Consignee Signatory</h4>
              <Label>Name</Label>
              <Input name="consigneeSignName" value={formData.consigneeSignName} onChange={handleChange} />
              <Label>Title (if applicable)</Label>
              <Input name="consigneeSignTitle" value={formData.consigneeSignTitle} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="consigneeSignDate" value={formData.consigneeSignDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Back
        </Button>

        {step < 4 ? (
          <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {step === 5 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Consignment Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
