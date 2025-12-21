import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  supplierName: string;
  supplierAddress: string;
  distributorName: string;
  distributorAddress: string;
  territory: string;
  consignmentBasis: string;
  pricingControl: string;
  salesPercent: string;
  installments: string;
  paymentDueDays: string;
  paymentStatementRequirements: string;
  recordKeeping: string;
  inspectionRights: string;
  titleToMerchandise: string;
  lossDamageResponsibility: string;
  insuranceRequirements: string;
  payrollTaxObligations: string;
  terminationNoticeDays: string;
  curePeriodDays: string;
  disputeResolution: string;
  warrantiesLimitations: string;
  assignmentConsent: string;
  entireAgreementText: string;
  governingLaw: string;
  supplierSignatoryName: string;
  supplierSignatoryDesignation: string;
  supplierSignatoryDate: string;
  distributorSignatoryName: string;
  distributorSignatoryDesignation: string;
  distributorSignatoryDate: string;
}

export default function ProductDistributionAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    supplierName: "",
    supplierAddress: "",
    distributorName: "",
    distributorAddress: "",
    territory: "",
    consignmentBasis: "Consignment",
    pricingControl: "Supplier",
    salesPercent: "",
    installments: "1",
    paymentDueDays: "",
    paymentStatementRequirements: "",
    recordKeeping: "",
    inspectionRights: "",
    titleToMerchandise: "",
    lossDamageResponsibility: "",
    insuranceRequirements: "",
    payrollTaxObligations: "",
    terminationNoticeDays: "",
    curePeriodDays: "",
    disputeResolution: "",
    warrantiesLimitations: "",
    assignmentConsent: "",
    entireAgreementText: "",
    governingLaw: "",
    supplierSignatoryName: "",
    supplierSignatoryDesignation: "",
    supplierSignatoryDate: "",
    distributorSignatoryName: "",
    distributorSignatoryDesignation: "",
    distributorSignatoryDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 40;
    const maxW = pageW - margin * 2;
    let y = margin;

    const write = (text: string, size = 11, bold = false, center = false) => {
      if (text === undefined || text === null) text = "";
      if (text.trim() === "") {
        y += size * 0.8;
        return;
      }
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        if (center) {
          const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (pageW - tw) / 2;
          doc.text(line, tx, y);
        } else {
          doc.text(line, margin, y);
        }
        y += size * 1.3;
      });
    };

    write("PRODUCT DISTRIBUTION AGREEMENT", 14, true, true);
    write("\n");

    write(
      `This Product Distribution Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || "__________"} ("Effective Date"), by and between: ${formData.supplierName || "[Owner / Manufacturer Name]"}, having its principal place of business at ${formData.supplierAddress || "[address]"} ("Supplier"), and ${formData.distributorName || "[Distributor Name]"}, having its principal place of business at ${formData.distributorAddress || "[address]"} ("Distributor"). The Supplier and the Distributor shall hereinafter be collectively referred to as the "Parties" and individually as a "Party".`
    );

    write("\n");
    write("I. RIGHT TO SELL AND APPOINTMENT", 12, true);
    write(
      `The Supplier is the lawful owner of the products described herein (the "Products"). The Supplier grants to the Distributor the exclusive right to distribute and sell the Products within the following territory: ${formData.territory || "[Territory]"}. The Products shall be supplied on ${formData.consignmentBasis || "[consignment basis]"}. All sales prices and commercial terms shall be determined by ${formData.pricingControl || "[Supplier]"}.`
    );

    write("\n");
    write("II. PROCEEDS OF SALES AND PAYMENT TERMS", 12, true);
    write(
      `The Distributor shall remit to the Supplier ${formData.salesPercent || "[____]%"} of the net sales proceeds. Payments shall be made in ${formData.installments || "[____]"} installment(s), due within ${formData.paymentDueDays || "[____]"} days. With each payment, the Distributor shall submit a detailed statement: ${formData.paymentStatementRequirements || "[statement requirements]"}.`
    );

    write("\n");
    write("III. RECORD KEEPING AND INSPECTION", 12, true);
    write(
      `The Distributor shall maintain accurate records: ${formData.recordKeeping || "[record keeping details]"}. The Supplier has the right to inspect such records upon reasonable prior notice: ${formData.inspectionRights || "[inspection rights]"}.`
    );

    write("\n");
    write("IV. TITLE TO MERCHANDISE", 12, true);
    write(
      formData.titleToMerchandise ||
        "All Products delivered on consignment shall remain the sole property of the Supplier until sold to third-party purchasers, at which point title shall transfer in accordance with the terms of sale."
    );

    write("\n");
    write("V. LOSS, DAMAGE AND INSURANCE", 12, true);
    write(
      `The Distributor shall be responsible for any shortage, loss, theft, or damage to the Products while in its possession. Insurance requirements: ${formData.insuranceRequirements || "[insurance requirements]"}.`
    );

    write("\n");
    write("VI. PAYROLL TAXES AND EMPLOYMENT OBLIGATIONS", 12, true);
    write(
      formData.payrollTaxObligations ||
        "The Distributor shall be exclusively liable for all payroll taxes, social security contributions, insurance premiums, and any other statutory obligations arising from the employment of its personnel in connection with this Agreement."
    );

    write("\n");
    write("VII. DEFAULT AND TERMINATION", 12, true);
    write(
      `If the Distributor fails to comply with any material obligation, the Supplier may terminate upon ${formData.terminationNoticeDays || "[____]"} days' written notice. The Distributor may cure within ${formData.curePeriodDays || "[____]"} days to prevent termination.`
    );

    write("\n");
    write("VIII. DISPUTE RESOLUTION", 12, true);
    write(
      formData.disputeResolution ||
        "The Parties shall first attempt to resolve disputes amicably, then by mediation, and finally by arbitration or court proceedings as mutually agreed."
    );

    write("\n");
    write("IX. WARRANTIES AND LIMITATION OF LIABILITY", 12, true);
    write(
      formData.warrantiesLimitations ||
        "Neither Party makes any express or implied warranties. Under no circumstances shall either Party be liable for indirect, incidental, consequential, special, or punitive damages."
    );

    write("\n");
    write("X. ASSIGNMENT AND TRANSFER OF RIGHTS", 12, true);
    write(
      formData.assignmentConsent ||
        "This Agreement is binding upon the Parties and their respective successors and permitted assigns. Neither Party may assign its rights without prior written consent."
    );

    write("\n");
    write("XI - XIV. MISCELLANEOUS", 12, true);
    write(
      formData.entireAgreementText ||
        "This Agreement constitutes the entire understanding between the Parties. It may only be amended in writing signed by authorized representatives. If any provision is held invalid, the remainder shall remain in effect. Failure to enforce any provision does not constitute waiver."
    );

    write("\n");
    write("XV. GOVERNING LAW", 12, true);
    write(
      `This Agreement shall be governed by and construed in accordance with the laws of ${formData.governingLaw || "[State/Jurisdiction]"}.`
    );

    write("\n");
    write("XVI. SIGNATORIES", 12, true);
    write(
      "IN WITNESS WHEREOF, the Parties have executed this Agreement through their duly authorized representatives on the Effective Date first written above."
    );

    write("\n");
    write("For and on behalf of the Supplier:");
    write(`Name: ${formData.supplierSignatoryName || "__________________________"}`);
    write(`Designation: ${formData.supplierSignatoryDesignation || "____________________"}`);
    write(`Signature: ________________________`);
    write(`Date: ${formData.supplierSignatoryDate || "___________________________"}`);

    write("\n");
    write("For and on behalf of the Distributor:");
    write(`Name: ${formData.distributorSignatoryName || "__________________________"}`);
    write(`Designation: ${formData.distributorSignatoryDesignation || "____________________"}`);
    write(`Signature: ________________________`);
    write(`Date: ${formData.distributorSignatoryDate || "___________________________"}`);

    doc.save("Product_Distribution_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Effective Date</h3>
              <Label>Effective Date</Label>
              <Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label className="pt-2">Supplier - Name</Label>
              <Input name="supplierName" value={formData.supplierName} onChange={handleChange} />
              <Label>Supplier - Address</Label>
              <Textarea name="supplierAddress" value={formData.supplierAddress} onChange={handleChange} />

              <Label className="pt-2">Distributor - Name</Label>
              <Input name="distributorName" value={formData.distributorName} onChange={handleChange} />
              <Label>Distributor - Address</Label>
              <Textarea name="distributorAddress" value={formData.distributorAddress} onChange={handleChange} />

              <Label className="pt-2">Territory</Label>
              <Input name="territory" value={formData.territory} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Commercial Terms & Payments</h3>
              <Label>Consignment Basis</Label>
              <Input name="consignmentBasis" value={formData.consignmentBasis} onChange={handleChange} />

              <Label>Pricing Control (who sets prices)</Label>
              <Input name="pricingControl" value={formData.pricingControl} onChange={handleChange} />

              <Label className="pt-2">Distributor Share (%)</Label>
              <Input name="salesPercent" value={formData.salesPercent} onChange={handleChange} />

              <Label>Installments</Label>
              <Input name="installments" value={formData.installments} onChange={handleChange} />

              <Label>Payment Due (days)</Label>
              <Input name="paymentDueDays" value={formData.paymentDueDays} onChange={handleChange} />

              <Label className="pt-2">Payment Statement Requirements</Label>
              <Textarea name="paymentStatementRequirements" value={formData.paymentStatementRequirements} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Logistics, Risk & Records</h3>
              <Label>Record Keeping Requirements</Label>
              <Textarea name="recordKeeping" value={formData.recordKeeping} onChange={handleChange} />

              <Label>Inspection Rights</Label>
              <Textarea name="inspectionRights" value={formData.inspectionRights} onChange={handleChange} />

              <Label>Title to Merchandise</Label>
              <Textarea name="titleToMerchandise" value={formData.titleToMerchandise} onChange={handleChange} />

              <Label className="pt-2">Loss, Damage Responsibility</Label>
              <Textarea name="lossDamageResponsibility" value={formData.lossDamageResponsibility} onChange={handleChange} />

              <Label>Insurance Requirements</Label>
              <Textarea name="insuranceRequirements" value={formData.insuranceRequirements} onChange={handleChange} />

              <Label className="pt-2">Payroll Taxes & Employment Obligations</Label>
              <Textarea name="payrollTaxObligations" value={formData.payrollTaxObligations} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal, Termination & Signatories</h3>
              <Label>Termination Notice (days)</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />

              <Label>Cure Period (days)</Label>
              <Input name="curePeriodDays" value={formData.curePeriodDays} onChange={handleChange} />

              <Label className="pt-2">Dispute Resolution</Label>
              <Textarea name="disputeResolution" value={formData.disputeResolution} onChange={handleChange} />

              <Label>Warranties & Limitations</Label>
              <Textarea name="warrantiesLimitations" value={formData.warrantiesLimitations} onChange={handleChange} />

              <Label className="pt-2">Assignment & Transfer</Label>
              <Textarea name="assignmentConsent" value={formData.assignmentConsent} onChange={handleChange} />

              <Label>Entire Agreement / Amendments / Severability</Label>
              <Textarea name="entireAgreementText" value={formData.entireAgreementText} onChange={handleChange} />

              <Label className="pt-2">Governing Law / Jurisdiction</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <hr />

              <Label>Supplier Signatory - Name</Label>
              <Input name="supplierSignatoryName" value={formData.supplierSignatoryName} onChange={handleChange} />
              <Label>Supplier Signatory - Designation</Label>
              <Input name="supplierSignatoryDesignation" value={formData.supplierSignatoryDesignation} onChange={handleChange} />
              <Label>Supplier Signatory - Date</Label>
              <Input type="date" name="supplierSignatoryDate" value={formData.supplierSignatoryDate} onChange={handleChange} />

              <hr />

              <Label>Distributor Signatory - Name</Label>
              <Input name="distributorSignatoryName" value={formData.distributorSignatoryName} onChange={handleChange} />
              <Label>Distributor Signatory - Designation</Label>
              <Input name="distributorSignatoryDesignation" value={formData.distributorSignatoryDesignation} onChange={handleChange} />
              <Label>Distributor Signatory - Date</Label>
              <Input type="date" name="distributorSignatoryDate" value={formData.distributorSignatoryDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
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

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Product Distribution Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
