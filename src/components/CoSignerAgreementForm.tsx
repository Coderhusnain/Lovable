import React, { useState } from "react";
import jsPDF from "jspdf";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, ArrowRight, Loader2, FileText } from "lucide-react";

// Mock toast for notification - replace with your actual toast import
const toast = { success: (msg: string) => alert(msg), error: (msg: string) => alert(msg) };

const CoSignerAgreementForm = () => {
  // 1. STATE MANAGEMENT
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Basics
    agreementDate: '',
    landlordName: '',
    tenantNames: '',
    coSignerName: '',
    leaseDate: '',
    // Step 2: Property
    propertyAddress: '',
    propertyCity: '',
    propertyState: '',
    propertyZip: '',
    // Step 3: Co-Signer Details
    cosignerFullName: '',
    cosignerResidentialAddress: '',
    cosignerUnitNumber: '',
    cosignerCity: '',
    cosignerState: '',
    cosignerZip: '',
    cosignerDriversLicense: '',
    cosignerDriversState: '',
    cosignerTelephone: '',
    // Step 4: Guarantees
    guaranteeRent: '',
    guaranteeLateFees: '',
    guaranteeDamages: '',
    guaranteeCleaningCharges: '',
    guaranteeUtilities: '',
    responsibilityOnDefault: '',
    durationOfGuarantee: '',
    postEvictionResponsibility: '',
    assignmentSublettingNote: '',
    // Step 5: Notes & Signatures
    creditAuthorizationNote: '',
    legalFeesNote: '',
    entireAgreementNote: '',
    cosignerSignName: '',
    cosignerSignDate: '',
    landlordSignName: '',
    landlordSignDate: '',
    tenantSignName: '',
    tenantSignDate: '',
    notaryNote: '',
    copiesNote: '',
    assistanceNote: ''
  });

  // 2. HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // 3. PDF GENERATION
  const generatePDF = () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("CO-SIGNER AGREEMENT", 105, 20, { align: "center" });
      
      let y = 40;
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      
      const addText = (text: string, isBold = false) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        const lines = doc.splitTextToSize(text, 170);
        doc.text(lines, 20, y);
        y += lines.length * 5 + 5;
      };

      addText(`This Agreement is made on ${formData.agreementDate} attached to the Lease Agreement dated ${formData.leaseDate}.`);
      
      addText("1. PARTIES:", true);
      addText(`Landlord: ${formData.landlordName}`);
      addText(`Tenant(s): ${formData.tenantNames}`);
      addText(`Co-Signer: ${formData.coSignerName}`);
      
      addText("2. PROPERTY ADDRESS:", true);
      addText(`${formData.propertyAddress}, ${formData.propertyCity}, ${formData.propertyState} ${formData.propertyZip}`);

      addText("3. CO-SIGNER DETAILS:", true);
      addText(`Legal Name: ${formData.cosignerFullName}`);
      addText(`Address: ${formData.cosignerResidentialAddress} ${formData.cosignerUnitNumber ? '#' + formData.cosignerUnitNumber : ''}, ${formData.cosignerCity}, ${formData.cosignerState} ${formData.cosignerZip}`);
      addText(`Phone: ${formData.cosignerTelephone} | DL: ${formData.cosignerDriversLicense} (${formData.cosignerDriversState})`);

      addText("4. GUARANTEES:", true);
      addText(`The Co-Signer guarantees the following:\nRent: ${formData.guaranteeRent}\nDamages: ${formData.guaranteeDamages}\nUtilities: ${formData.guaranteeUtilities}`);
      
      addText("5. TERMS:", true);
      addText(`Responsibility on Default: ${formData.responsibilityOnDefault}`);
      addText(`Duration: ${formData.durationOfGuarantee}`);
      
      // Signatures Page
      doc.addPage();
      doc.setFontSize(14);
      doc.text("SIGNATURES", 20, 30);
      
      doc.setFontSize(11);
      doc.text("Co-Signer:", 20, 50);
      doc.text(`Name: ${formData.cosignerSignName}`, 20, 60);
      doc.text(`Date: ${formData.cosignerSignDate}`, 120, 60);
      doc.line(20, 75, 90, 75); // Signature line
      
      doc.text("Landlord:", 20, 90);
      doc.text(`Name: ${formData.landlordSignName}`, 20, 100);
      doc.text(`Date: ${formData.landlordSignDate}`, 120, 100);
      doc.line(20, 115, 90, 115);

      doc.save('co-signer-agreement.pdf');
      toast.success("Document generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // 4. STEPS CONFIGURATION
  const steps = [
    {
      label: "Agreement Basics",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Agreement Date</Label><Input type="date" name="agreementDate" value={formData.agreementDate} onChange={handleChange} /></div>
            <div><Label>Lease Date</Label><Input type="date" name="leaseDate" value={formData.leaseDate} onChange={handleChange} /></div>
          </div>
          <Label>Landlord Name</Label><Input name="landlordName" value={formData.landlordName} onChange={handleChange} />
          <Label>Tenant Name(s)</Label><Input name="tenantNames" value={formData.tenantNames} onChange={handleChange} />
          <Label>Co-Signer Name (Short)</Label><Input name="coSignerName" value={formData.coSignerName} onChange={handleChange} />
        </div>
      ),
      validate: () => Boolean(formData.agreementDate && formData.landlordName),
    },
    {
      label: "Property Info",
      content: (
        <div className="space-y-4">
          <Label>Property Address</Label><Input name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} />
          <div className="grid grid-cols-3 gap-2">
            <div><Label>City</Label><Input name="propertyCity" value={formData.propertyCity} onChange={handleChange} /></div>
            <div><Label>State</Label><Input name="propertyState" value={formData.propertyState} onChange={handleChange} /></div>
            <div><Label>Zip</Label><Input name="propertyZip" value={formData.propertyZip} onChange={handleChange} /></div>
          </div>
        </div>
      ),
      validate: () => Boolean(formData.propertyAddress && formData.propertyCity),
    },
    {
      label: "Co-Signer Details",
      content: (
        <div className="space-y-4">
          <Label>Full Legal Name</Label><Input name="cosignerFullName" value={formData.cosignerFullName} onChange={handleChange} />
          <Label>Residential Address</Label><Input name="cosignerResidentialAddress" value={formData.cosignerResidentialAddress} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
             <div><Label>Unit #</Label><Input name="cosignerUnitNumber" value={formData.cosignerUnitNumber} onChange={handleChange} /></div>
             <div><Label>Phone</Label><Input name="cosignerTelephone" value={formData.cosignerTelephone} onChange={handleChange} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div><Label>Driver's License</Label><Input name="cosignerDriversLicense" value={formData.cosignerDriversLicense} onChange={handleChange} /></div>
             <div><Label>State</Label><Input name="cosignerDriversState" value={formData.cosignerDriversState} onChange={handleChange} /></div>
          </div>
        </div>
      ),
      validate: () => Boolean(formData.cosignerFullName && formData.cosignerResidentialAddress),
    },
    {
      label: "Guarantees",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div><Label>Guarantee Rent ($)</Label><Input name="guaranteeRent" value={formData.guaranteeRent} onChange={handleChange} /></div>
             <div><Label>Guarantee Damages ($)</Label><Input name="guaranteeDamages" value={formData.guaranteeDamages} onChange={handleChange} /></div>
             <div><Label>Cleaning Charges ($)</Label><Input name="guaranteeCleaningCharges" value={formData.guaranteeCleaningCharges} onChange={handleChange} /></div>
             <div><Label>Utilities ($)</Label><Input name="guaranteeUtilities" value={formData.guaranteeUtilities} onChange={handleChange} /></div>
          </div>
          <Label>Responsibility on Default</Label>
          <Textarea name="responsibilityOnDefault" value={formData.responsibilityOnDefault} onChange={handleChange} />
        </div>
      ),
      validate: () => Boolean(formData.guaranteeRent),
    },
    {
      label: "Final Signatures",
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Signatures</h4>
          <div className="grid grid-cols-2 gap-4">
             <div><Label>Co-Signer Name</Label><Input name="cosignerSignName" value={formData.cosignerSignName} onChange={handleChange} /></div>
             <div><Label>Date</Label><Input type="date" name="cosignerSignDate" value={formData.cosignerSignDate} onChange={handleChange} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div><Label>Landlord Name</Label><Input name="landlordSignName" value={formData.landlordSignName} onChange={handleChange} /></div>
             <div><Label>Date</Label><Input type="date" name="landlordSignDate" value={formData.landlordSignDate} onChange={handleChange} /></div>
          </div>
          <Label>Notary Notes (Optional)</Label>
          <Textarea name="notaryNote" value={formData.notaryNote} onChange={handleChange} />
        </div>
      ),
      validate: () => Boolean(formData.cosignerSignName && formData.landlordSignName),
    },
  ];

  // 5. MAIN RENDER
  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="text-green-600 flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6" /> Agreement Ready
            </CardTitle>
            <CardDescription>Review complete. Click below to download.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={generatePDF} disabled={isGeneratingPDF} className="w-full" size="lg">
              {isGeneratingPDF ? <Loader2 className="animate-spin mr-2" /> : <FileText className="mr-2" />}
              Download PDF
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="ghost" onClick={() => { setIsComplete(false); setCurrentStep(1); }}>Edit Details</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Co-Signer Agreement</CardTitle>
          <CardDescription>Step {currentStep} of {steps.length}: {steps[currentStep - 1].label}</CardDescription>
        </CardHeader>
        <CardContent>
          {steps[currentStep - 1].content}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <Button onClick={handleNext} disabled={!steps[currentStep - 1].validate()}>
            {currentStep === steps.length ? "Finish" : "Next"}
            {currentStep === steps.length ? <CheckCircle className="h-4 w-4 ml-2" /> : <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoSignerAgreementForm;