import React, { useState } from "react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, ArrowRight, Loader2, FileText } from "lucide-react";

const FlooringServicesAgreementForm = () => {
  // 1. STATE MANAGEMENT
  const [step, setStep] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const [formData, setFormData] = useState({
    // Parties & Date
    effectiveDate: '',
    serviceRecipientName: '',
    serviceRecipientAddress: '',
    contractorName: '',
    contractorAddress: '',
    // Services
    startDate: '',
    serviceDescription: '',
    completionDate: '',
    projectAddress: '',
    // Payment
    amount: '',
    promptDiscount: '',
    promptDiscountDays: '',
    interestRate: '',
    collectionCostsNote: 'The Service Recipient shall be responsible for all costs of collection, including reasonable attorney fees.',
    nonPaymentNote: 'Failure to make payment when due shall be considered a material breach of this Agreement.',
    // Ownership/Permits
    workProductOwnershipNote: 'Contractor retains ownership of all intellectual property until full payment is received.',
    permitsNote: 'Contractor shall obtain all necessary permits required for the Services.',
    insuranceDetails: 'General Liability Insurance: $1,000,000 coverage.',
    // Warranty
    warrantyNote: 'Contractor warrants that the Services will be performed in a professional and workmanlike manner.',
    warrantyMonths: '12',
    indemnificationNote: 'Contractor agrees to indemnify Service Recipient against claims arising from Contractor\'s negligence.',
    // Default
    defaultEventsNote: '1. Failure to pay.\n2. Failure to perform Services.\n3. Insolvency.',
    cureDays: '10',
    remediesNote: 'Terminate the agreement and seek damages.',
    // Force Majeure
    forceMajeureNote: 'Neither party shall be liable for delays caused by events beyond their control.',
    arbitrationNote: 'Any disputes shall be resolved via binding arbitration.',
    terminationDate: '',
    // Boilerplate
    entireAgreementNote: 'This Agreement constitutes the entire understanding between the parties.',
    severabilityNote: 'If any provision is invalid, the remainder remains in effect.',
    amendmentNote: 'This Agreement may only be amended in writing.',
    governingLaw: '',
    noticeAddressServiceRecipient: '',
    noticeAddressContractor: '',
    waiverNote: 'Failure to enforce any provision shall not constitute a waiver.',
    // Signatures
    serviceRecipientSignName: '',
    serviceRecipientSignDate: '',
    contractorSignName: '',
    contractorSignDate: ''
  });

  // 2. HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(9, s + 1));
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  // 3. PDF GENERATION
  const generatePDF = () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 40;
      const lineHeight = 14;
      let y = margin;

      const addText = (text: string, size = 11, bold = false, center = false, spacing = 1) => {
        doc.setFont("times", bold ? "bold" : "normal");
        doc.setFontSize(size);
        const maxWidth = pageWidth - margin * 2;
        const lines = doc.splitTextToSize(text || "", maxWidth);
        
        lines.forEach((line: string) => {
          if (y > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            y = margin;
          }
          if (center) {
            const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
            const tx = (pageWidth - tw) / 2;
            doc.text(line, tx, y);
          } else {
            doc.text(line, margin, y);
          }
          y += lineHeight * spacing;
        });
      };

      // --- PDF CONTENT START ---
      addText("FLOORING SERVICES AGREEMENT", 16, true, true);
      addText("\n");

      addText(`This Flooring Services Agreement ("Agreement") is entered into and made effective as of ${formData.effectiveDate || "__________"} by and between:`);
      addText(`${formData.serviceRecipientName || "[Client Name]"}, of ${formData.serviceRecipientAddress || "[Address]"} (hereinafter referred to as the "Service Recipient"),`);
      addText("AND", 11, true, true);
      addText(`${formData.contractorName || "[Contractor Name]"}, of ${formData.contractorAddress || "[Address]"} (hereinafter referred to as the "Contractor").`);
      addText("\n");

      addText("1. Description of Services", 12, true);
      addText(`Commencing on ${formData.startDate || "__________"}, the Contractor shall perform the following flooring services (the "Services"):`);
      addText(formData.serviceDescription || "[Description]");
      addText(`All Services shall be completed on or before ${formData.completionDate || "__________"}.`);
      addText("\n");

      addText("2. Scope of Work & Location", 12, true);
      addText(`Installation location: ${formData.projectAddress || "[Project Address]"}`);
      addText("The Contractor shall furnish all necessary labor, materials, equipment, and expertise.");
      addText("\n");

      addText("3. Payment", 12, true);
      addText(`Payment in the sum of ${formData.amount || "$0.00"} shall be made upon satisfactory completion.`);
      if (formData.promptDiscount) {
        addText(`A prompt payment discount of ${formData.promptDiscount} shall apply if paid within ${formData.promptDiscountDays} days.`);
      }
      if (formData.interestRate) {
        addText(`Overdue sums accrue interest at ${formData.interestRate} per annum.`);
      }
      addText(formData.collectionCostsNote);
      addText("\n");

      addText("4. Warranty", 12, true);
      addText(formData.warrantyNote);
      addText(`Warranty Period: ${formData.warrantyMonths} months.`);
      addText("\n");

      addText("5. General Terms", 12, true);
      addText(`Indemnification: ${formData.indemnificationNote}`);
      addText(`Governing Law: ${formData.governingLaw}`);
      addText(`Dispute Resolution: ${formData.arbitrationNote}`);
      addText("\n");

      addText("6. Execution", 12, true);
      addText("IN WITNESS WHEREOF, the Parties have executed this Agreement.");
      addText("\n");
      
      // Signatures
      addText("Service Recipient:", 11, true);
      addText(`Name: ${formData.serviceRecipientSignName}`);
      addText(`Date: ${formData.serviceRecipientSignDate}`);
      addText("___________________________________ (Signature)");
      addText("\n");
      
      addText("Contractor:", 11, true);
      addText(`Name: ${formData.contractorSignName}`);
      addText(`Date: ${formData.contractorSignDate}`);
      addText("___________________________________ (Signature)");

      doc.save("Flooring_Services_Agreement.pdf");
      setPdfGenerated(true);
    } catch (err) {
      console.error(err);
      alert("Error generating PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // 4. RENDER STEPS
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Parties & Date</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Effective Date</Label><Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} /></div>
              <div><Label>Service Recipient Name</Label><Input name="serviceRecipientName" value={formData.serviceRecipientName} onChange={handleChange} /></div>
            </div>
            <Label>Service Recipient Address</Label><Input name="serviceRecipientAddress" value={formData.serviceRecipientAddress} onChange={handleChange} />
            <Label>Contractor Name</Label><Input name="contractorName" value={formData.contractorName} onChange={handleChange} />
            <Label>Contractor Address</Label><Input name="contractorAddress" value={formData.contractorAddress} onChange={handleChange} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Services & Schedule</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Start Date</Label><Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} /></div>
              <div><Label>Completion Date</Label><Input type="date" name="completionDate" value={formData.completionDate} onChange={handleChange} /></div>
            </div>
            <Label>Project Address</Label><Input name="projectAddress" value={formData.projectAddress} onChange={handleChange} />
            <Label>Service Description</Label>
            <Textarea name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} placeholder="Describe flooring type, square footage, etc." rows={6} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Payment</h3>
            <Label>Total Amount ($)</Label><Input name="amount" value={formData.amount} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Prompt Discount (%)</Label><Input name="promptDiscount" value={formData.promptDiscount} onChange={handleChange} /></div>
              <div><Label>Discount Days</Label><Input name="promptDiscountDays" value={formData.promptDiscountDays} onChange={handleChange} /></div>
            </div>
            <Label>Interest Rate (per annum)</Label><Input name="interestRate" value={formData.interestRate} onChange={handleChange} />
            <Label>Collection Costs Note</Label><Textarea name="collectionCostsNote" value={formData.collectionCostsNote} onChange={handleChange} />
          </div>
        );
      case 4:
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Ownership & Permits</h3>
            <Label>Work Product Ownership</Label><Textarea name="workProductOwnershipNote" value={formData.workProductOwnershipNote} onChange={handleChange} />
            <Label>Permits</Label><Textarea name="permitsNote" value={formData.permitsNote} onChange={handleChange} />
            <Label>Insurance Details</Label><Input name="insuranceDetails" value={formData.insuranceDetails} onChange={handleChange} />
          </div>
        );
      case 5:
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Warranty & Indemnity</h3>
            <Label>Warranty Note</Label><Textarea name="warrantyNote" value={formData.warrantyNote} onChange={handleChange} />
            <Label>Warranty Months</Label><Input name="warrantyMonths" value={formData.warrantyMonths} onChange={handleChange} />
            <Label>Indemnification</Label><Textarea name="indemnificationNote" value={formData.indemnificationNote} onChange={handleChange} />
          </div>
        );
      case 6:
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Default & Remedies</h3>
            <Label>Default Events</Label><Textarea name="defaultEventsNote" value={formData.defaultEventsNote} onChange={handleChange} rows={4} />
            <Label>Cure Days</Label><Input name="cureDays" value={formData.cureDays} onChange={handleChange} />
            <Label>Remedies</Label><Textarea name="remediesNote" value={formData.remediesNote} onChange={handleChange} />
          </div>
        );
      case 7:
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Legal Terms</h3>
            <Label>Force Majeure</Label><Textarea name="forceMajeureNote" value={formData.forceMajeureNote} onChange={handleChange} />
            <Label>Arbitration</Label><Textarea name="arbitrationNote" value={formData.arbitrationNote} onChange={handleChange} />
            <Label>Governing Law</Label><Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
          </div>
        );
      case 8:
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Final Clauses</h3>
            <Label>Entire Agreement</Label><Textarea name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} />
            <Label>Severability</Label><Input name="severabilityNote" value={formData.severabilityNote} onChange={handleChange} />
            <Label>Amendment</Label><Input name="amendmentNote" value={formData.amendmentNote} onChange={handleChange} />
            <Label>Waiver</Label><Input name="waiverNote" value={formData.waiverNote} onChange={handleChange} />
          </div>
        );
      case 9:
        return (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Signatures</h3>
            <div className="grid grid-cols-2 gap-4">
               <div><Label>Recipient Name</Label><Input name="serviceRecipientSignName" value={formData.serviceRecipientSignName} onChange={handleChange} /></div>
               <div><Label>Date</Label><Input type="date" name="serviceRecipientSignDate" value={formData.serviceRecipientSignDate} onChange={handleChange} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div><Label>Contractor Name</Label><Input name="contractorSignName" value={formData.contractorSignName} onChange={handleChange} /></div>
               <div><Label>Date</Label><Input type="date" name="contractorSignDate" value={formData.contractorSignDate} onChange={handleChange} /></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // 5. FINAL UI
  if (pdfGenerated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-xl w-full text-center">
          <CardHeader>
            <CardTitle className="text-green-600 flex justify-center items-center gap-2">
              <CheckCircle /> Generated Successfully
            </CardTitle>
            <CardDescription>Your Flooring Services Agreement is ready.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center gap-4">
            <Button onClick={() => setPdfGenerated(false)} variant="outline">Create Another</Button>
            <Button onClick={generatePDF}>Download Again</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50">
      <Card>
        <CardHeader>
          <CardTitle>Flooring Services Agreement</CardTitle>
          <CardDescription>Step {step} of 9</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button disabled={step === 1} onClick={handleBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {step < 9 ? (
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={generatePDF} disabled={isGeneratingPDF}>
              {isGeneratingPDF ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <FileText className="mr-2 h-4 w-4" />}
              Generate PDF
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default FlooringServicesAgreementForm;