import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;

  clientName: string;
  clientAddress: string;

  contractorName: string;
  contractorAddress: string;

  startDate: string;
  siteAddress: string;
  serviceDescription: string;

  totalCompensation: string;
  paymentAddress: string;
  promptDiscountPercent: string;
  promptDiscountDays: string;
  interestRate: string;
  collectionCostsNote: string;

  confidentialityNote: string;
  changeOrderProcess: string;
  indemnificationNote: string;

  warrantyPeriodMonths: string;
  warrantyRepairTimelineDays: string;
  warrantyExceptions: string;

  defaultCureDays: string;
  scopeStandardsNote: string;

  termEndDate: string;
  permitsResponsibility: string;
  insuranceNote: string;

  forceMajeureNote: string;
  arbitrationLocation: string;
  governingLaw: string;
  noticesNote: string;

  signClientName: string;
  signClientDate: string;
  signContractorName: string;
  signContractorDate: string;
}

export default function PaintingServicesContractForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",

    clientName: "",
    clientAddress: "",

    contractorName: "",
    contractorAddress: "",

    startDate: "",
    siteAddress: "",
    serviceDescription: "",

    totalCompensation: "",
    paymentAddress: "",
    promptDiscountPercent: "",
    promptDiscountDays: "",
    interestRate: "",
    collectionCostsNote: "Client liable for collection costs including reasonable attorneys' fees.",

    confidentialityNote: "Contractor shall not disclose Client confidential information and shall return materials on termination.",
    changeOrderProcess: "All changes must be authorized by a written Change Order signed by both Parties. Client bears additional costs.",
    indemnificationNote: "Contractor indemnifies Client for acts, omissions, or negligence in performance of the Services.",

    warrantyPeriodMonths: "12",
    warrantyRepairTimelineDays: "30",
    warrantyExceptions: "Excludes mildew, fungus, builder negligence, or acts of God.",

    defaultCureDays: "30",
    scopeStandardsNote: "Surfaces to be clean and prepared; workmanship to industry standards; site cleaned upon completion.",

    termEndDate: "",
    permitsResponsibility: "Contractor shall obtain necessary permits at its cost.",
    insuranceNote: "Contractor to maintain General Liability, Workers' Compensation and Builder's Risk insurance.",

    forceMajeureNote: "Obligations suspended during Force Majeure; affected Party to notify the other in writing.",
    arbitrationLocation: "",
    governingLaw: "",
    noticesNote: "Notices to be delivered personally or by certified mail to addresses in this Contract.",

    signClientName: "",
    signClientDate: "",
    signContractorName: "",
    signContractorDate: "",
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

    const write = (text: string, size = 11, bold = false, center = false, spacing = 1.3) => {
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
        y += size * spacing;
      });
    };

    write("PAINTING SERVICES CONTRACT", 14, true, true);
    write("\n");

    write(
      `This Painting Services Contract (“Contract”) is made and entered into on this ${formData.effectiveDate ||
        "___ day of ________"} (the “Effective Date”), by and between:`,
    );
    write(`Client: ${formData.clientName || "____________________"}, of ${formData.clientAddress || "____________________"}.`);
    write(`Contractor: ${formData.contractorName || "____________________"}, of ${formData.contractorAddress || "____________________"}.`);
    write("\n");

    write("1. Description of Services", 12, true);
    write(
      `Commencing on ${formData.startDate || "__________"}, the Contractor shall provide the following painting services to the Client:`,
    );
    write(formData.serviceDescription || "[Detailed description of painting services]");
    write(`Worksite: ${formData.siteAddress || "____________________"}.`);
    write("\n");

    write("2. Payment Terms", 12, true);
    write(`Total compensation: ${formData.totalCompensation || "[insert amount]"}.`);
    write(`Payment to: ${formData.paymentAddress || "[Contractor's Address]"}.`);
    write(
      `Prompt payment discount: ${formData.promptDiscountPercent || "[insert]%"} if paid within ${formData.promptDiscountDays ||
        "[insert days]"} days.`,
    );
    write(`Interest on overdue payments: ${formData.interestRate || "[insert]%"} per annum (or max lawful rate).`);
    write(formData.collectionCostsNote);
    write("\n");

    write("3. Confidentiality", 12, true);
    write(formData.confidentialityNote);
    write("\n");

    write("4. Changes to Scope of Work", 12, true);
    write(formData.changeOrderProcess);
    write("\n");

    write("5. Indemnification", 12, true);
    write(formData.indemnificationNote);
    write("\n");

    write("6. Warranty", 12, true);
    write(
      `Contractor warrants Services are workmanlike and materials are new unless specified. Warranty period: ${formData.warrantyPeriodMonths ||
        "12"} months from completion.`,
    );
    write(`Contractor will repair paint defects reported in writing; repairs will be done within ${formData.warrantyRepairTimelineDays ||
      "30"} days weather permitting.`);
    write(`Exceptions: ${formData.warrantyExceptions || "As specified."}`);
    write("\n");

    write("7. Default", 12, true);
    write(
      `Material breaches include non-payment, insolvency, seizure of assets, or failure to perform in accordance with this Contract. Cure period: ${formData.defaultCureDays ||
        "[insert]"} days from notice.`,
    );
    write("\n");

    write("8. Remedies", 12, true);
    write("Upon material breach, the non-defaulting Party may terminate after cure period and pursue remedies under law.");
    write("\n");

    write("9. Scope of Work Standards", 12, true);
    write(formData.scopeStandardsNote);
    write("\n");

    write("10. Term", 12, true);
    write(`This Contract shall terminate on ${formData.termEndDate || "[insert date]"}, unless earlier terminated as provided herein.`);
    write("\n");

    write("11. Permits", 12, true);
    write(formData.permitsResponsibility || "Contractor shall obtain necessary permits at its own cost.");
    write("\n");

    write("12. Insurance", 12, true);
    write(formData.insuranceNote || "Contractor shall maintain General Liability, Workers' Compensation and Builder's Risk insurance.");
    write("\n");

    write("13. Force Majeure", 12, true);
    write(formData.forceMajeureNote || "Obligations suspended during Force Majeure; affected Party to notify the other.");
    write("\n");

    write("14. Arbitration", 12, true);
    write(
      `Any dispute will be settled by binding arbitration pursuant to the Commercial Arbitration Rules. Arbitration location: ${formData.arbitrationLocation ||
        "[insert location]"}. Arbitrator shall not award punitive damages.`,
    );
    write("\n");

    write("15. Entire Agreement", 12, true);
    write("This Contract is the entire agreement between the Parties and supersedes prior agreements.");
    write("\n");

    write("16. Severability", 12, true);
    write("If any provision is unenforceable, it shall be modified to be enforceable and remaining provisions remain in effect.");
    write("\n");

    write("17. Amendment", 12, true);
    write("This Contract may only be amended in writing and signed by both Parties.");
    write("\n");

    write("18. Governing Law", 12, true);
    write(`This Contract shall be governed by the laws of ${formData.governingLaw || "[insert state]"}.`);
    write("\n");

    write("19. Notices", 12, true);
    write(formData.noticesNote || "Notices shall be delivered personally or by certified mail to the addresses listed above.");
    write("\n");

    write("20. Execution", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Contract as of the Effective Date first written above.");
    write("\n");

    write(`CLIENT: ${formData.clientName || "[Client Name]"}`);
    write(`By: ${formData.signClientName || "______________________"}`);
    write(`Date: ${formData.signClientDate || "______________________"}`);
    write("\n");

    write(`CONTRACTOR: ${formData.contractorName || "[Contractor Name]"}`);
    write(`By: ${formData.signContractorName || "______________________"}`);
    write(`Date: ${formData.signContractorDate || "______________________"}`);

    doc.save("Painting_Services_Contract.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Services</h3>

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Client - Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Client - Address</Label>
              <Textarea name="clientAddress" value={formData.clientAddress} onChange={handleChange} />

              <Label>Contractor - Name</Label>
              <Input name="contractorName" value={formData.contractorName} onChange={handleChange} />
              <Label>Contractor - Address</Label>
              <Textarea name="contractorAddress" value={formData.contractorAddress} onChange={handleChange} />

              <Label>Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />
              <Label>Site Address</Label>
              <Input name="siteAddress" value={formData.siteAddress} onChange={handleChange} />
              <Label>Detailed Description of Services</Label>
              <Textarea name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment & Contract Terms</h3>

              <Label>Total Compensation</Label>
              <Input name="totalCompensation" value={formData.totalCompensation} onChange={handleChange} />

              <Label>Payment Address</Label>
              <Input name="paymentAddress" value={formData.paymentAddress} onChange={handleChange} />

              <Label>Prompt Payment Discount (%)</Label>
              <Input name="promptDiscountPercent" value={formData.promptDiscountPercent} onChange={handleChange} />
              <Label>Prompt Discount Days</Label>
              <Input name="promptDiscountDays" value={formData.promptDiscountDays} onChange={handleChange} />

              <Label>Interest Rate on Overdue Payments (%)</Label>
              <Input name="interestRate" value={formData.interestRate} onChange={handleChange} />

              <Label>Collection Costs Note</Label>
              <Textarea name="collectionCostsNote" value={formData.collectionCostsNote} onChange={handleChange} />

              <Label>Confidentiality Note</Label>
              <Textarea name="confidentialityNote" value={formData.confidentialityNote} onChange={handleChange} />

              <Label>Change Order Process</Label>
              <Textarea name="changeOrderProcess" value={formData.changeOrderProcess} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Warranties, Insurance & Signatures</h3>

              <Label>Indemnification Note</Label>
              <Textarea name="indemnificationNote" value={formData.indemnificationNote} onChange={handleChange} />

              <Label>Warranty Period (months)</Label>
              <Input name="warrantyPeriodMonths" value={formData.warrantyPeriodMonths} onChange={handleChange} />
              <Label>Warranty Repair Timeline (days)</Label>
              <Input name="warrantyRepairTimelineDays" value={formData.warrantyRepairTimelineDays} onChange={handleChange} />
              <Label>Warranty Exceptions</Label>
              <Textarea name="warrantyExceptions" value={formData.warrantyExceptions} onChange={handleChange} />

              <Label>Default Cure Days</Label>
              <Input name="defaultCureDays" value={formData.defaultCureDays} onChange={handleChange} />

              <Label>Scope Standards Note</Label>
              <Textarea name="scopeStandardsNote" value={formData.scopeStandardsNote} onChange={handleChange} />

              <Label>Term End Date</Label>
              <Input name="termEndDate" value={formData.termEndDate} onChange={handleChange} />

              <Label>Permits Responsibility</Label>
              <Textarea name="permitsResponsibility" value={formData.permitsResponsibility} onChange={handleChange} />

              <Label>Insurance Note</Label>
              <Textarea name="insuranceNote" value={formData.insuranceNote} onChange={handleChange} />

              <Label>Force Majeure Note</Label>
              <Textarea name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} />

              <Label>Arbitration Location</Label>
              <Input name="arbitrationLocation" value={formData.arbitrationLocation} onChange={handleChange} />

              <Label>Governing Law / State</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <Label>Notices Note</Label>
              <Textarea name="noticesNote" value={formData.noticesNote} onChange={handleChange} />

              <hr />

              <Label>Client - Signatory Name</Label>
              <Input name="signClientName" value={formData.signClientName} onChange={handleChange} />
              <Label>Client - Date</Label>
              <Input name="signClientDate" value={formData.signClientDate} onChange={handleChange} />

              <Label>Contractor - Signatory Name</Label>
              <Input name="signContractorName" value={formData.signContractorName} onChange={handleChange} />
              <Label>Contractor - Date</Label>
              <Input name="signContractorDate" value={formData.signContractorDate} onChange={handleChange} />
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
        {step < 3 ? (
          <Button onClick={() => setStep((s) => Math.min(3, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Painting Services Contract PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
