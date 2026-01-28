import React, { useState } from "react";
import jsPDF from "jspdf";
import { FormWizard } from "./FormWizard"; // Assuming this exists in your project
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CheckCircle, ArrowLeft, ArrowRight, Send, FileText, Loader2 } from "lucide-react";
// If you use a toast library like sonner or react-hot-toast, import it here.
// const toast = ... 

// --- MOCK HELPERS (Replace these with your actual utils imports) ---
const getAllCountries = () => [{ id: 'US', name: 'United States' }, { id: 'CA', name: 'Canada' }];
const getStatesForCountry = (countryId: string) => 
  countryId.startsWith('US') ? ['NY:New York', 'CA:California'] : ['ON:Ontario'];
const getCountryName = (id: string) => id === 'US' ? 'United States' : 'Canada';
const getStateName = (countryId: string, stateId: string) => stateId === 'NY' ? 'New York' : stateId;
const toast = { success: (msg: string) => alert(msg), error: (msg: string) => alert(msg) };
// ------------------------------------------------------------------

const CopyrightLicenseForm = () => {
  // 1. STATE MANAGEMENT
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    effectiveDate: '',
    licensorName: '',
    licensorAddress: '',
    licenseeName: '',
    licenseeAddress: '',
    copyrightedWorkDescription: '',
    licenseTerritory: '',
    royaltyStructure: '',
    defaultNoticeDays: '',
    exclusiveOrNonExclusive: 'exclusive'
  });

  // 2. HANDLERS
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const generatePDF = () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF();
      
      // -- PDF GENERATION LOGIC --
      const countryName = formData.country ? getCountryName(formData.country.split(':')[0]) : '';
      const stateName = formData.state ? getStateName(formData.country?.split(':')[0] || '', formData.state.split(':')[0]) : '';

      // Title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("COPYRIGHT LICENSE AGREEMENT", 105, 30, { align: "center" });
      
      let yPosition = 50;
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      
      // Intro
      const introText = `This Copyright License Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate} by and between:`;
      const introLines = doc.splitTextToSize(introText, 170);
      doc.text(introLines, 20, yPosition);
      yPosition += introLines.length * 5 + 10;

      // Licensor & Licensee Details
      const partyText = `LICENSOR: ${formData.licensorName} (${formData.licensorAddress})\nAND\nLICENSEE: ${formData.licenseeName} (${formData.licenseeAddress})`;
      const partyLines = doc.splitTextToSize(partyText, 170);
      doc.text(partyLines, 20, yPosition);
      yPosition += partyLines.length * 5 + 20;

      // Terms
      doc.setFont("helvetica", "bold");
      doc.text("TERMS AND CONDITIONS", 20, yPosition);
      yPosition += 10;
      doc.setFont("helvetica", "normal");

      const termsText = `1. GRANT: Licensor grants Licensee an ${formData.exclusiveOrNonExclusive} license to use: ${formData.copyrightedWorkDescription}.\n\n` +
        `2. TERRITORY: ${formData.licenseTerritory}\n\n` +
        `3. ROYALTIES: ${formData.royaltyStructure}\n\n` +
        `4. NOTICE: Default notice period shall be ${formData.defaultNoticeDays} days.\n\n` +
        `5. GOVERNING LAW: This agreement is governed by the laws of ${stateName}, ${countryName}.`;
      
      const termLines = doc.splitTextToSize(termsText, 170);
      doc.text(termLines, 20, yPosition);
      
      // Signatures Area
      doc.addPage();
      doc.text("SIGNATURES", 20, 30);
      doc.text(`Licensor: ___________________   Date: _______`, 20, 50);
      doc.text(`Licensee: ___________________   Date: _______`, 20, 70);

      doc.save('copyright-license-agreement.pdf');
      toast.success("Document generated successfully!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Failed to generate document");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // 3. STEPS CONFIGURATION
  const steps = [
    {
      label: 'License Info',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Country</Label>
              <Select value={formData.country} onValueChange={(val) => handleInputChange('country', val)}>
                <SelectTrigger><SelectValue placeholder="Select country..." /></SelectTrigger>
                <SelectContent>
                  {getAllCountries().map((c) => (
                    <SelectItem key={c.id} value={`${c.id}:${c.name}`}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>State/Province</Label>
              <Select value={formData.state} onValueChange={(val) => handleInputChange('state', val)} disabled={!formData.country}>
                <SelectTrigger><SelectValue placeholder="Select state..." /></SelectTrigger>
                <SelectContent>
                  {getStatesForCountry(formData.country).map((s) => (
                    <SelectItem key={s} value={s}>{s.split(':')[1]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Effective Date</Label>
            <Input type="date" value={formData.effectiveDate} onChange={(e) => handleInputChange('effectiveDate', e.target.value)} />
          </div>
          <div>
            <Label>License Type</Label>
            <Select value={formData.exclusiveOrNonExclusive} onValueChange={(val) => handleInputChange('exclusiveOrNonExclusive', val)}>
              <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="exclusive">Exclusive</SelectItem>
                <SelectItem value="non-exclusive">Non-Exclusive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
      validate: () => Boolean(formData.country && formData.state && formData.effectiveDate),
    },
    {
      label: 'Parties',
      content: (
        <div className="space-y-4">
          <Input placeholder="Licensor Name" value={formData.licensorName} onChange={(e) => handleInputChange('licensorName', e.target.value)} />
          <Textarea placeholder="Licensor Address" value={formData.licensorAddress} onChange={(e) => handleInputChange('licensorAddress', e.target.value)} />
          <Input placeholder="Licensee Name" value={formData.licenseeName} onChange={(e) => handleInputChange('licenseeName', e.target.value)} />
          <Textarea placeholder="Licensee Address" value={formData.licenseeAddress} onChange={(e) => handleInputChange('licenseeAddress', e.target.value)} />
        </div>
      ),
      validate: () => Boolean(formData.licensorName && formData.licenseeName),
    },
    {
      label: 'Work Details',
      content: (
        <div className="space-y-4">
          <Textarea placeholder="Description of Copyrighted Work" value={formData.copyrightedWorkDescription} onChange={(e) => handleInputChange('copyrightedWorkDescription', e.target.value)} />
          <Textarea placeholder="License Territory" value={formData.licenseTerritory} onChange={(e) => handleInputChange('licenseTerritory', e.target.value)} />
        </div>
      ),
      validate: () => Boolean(formData.copyrightedWorkDescription && formData.licenseTerritory),
    },
    {
      label: 'Terms',
      content: (
        <div className="space-y-4">
          <Textarea placeholder="Royalty Structure" value={formData.royaltyStructure} onChange={(e) => handleInputChange('royaltyStructure', e.target.value)} />
          <Input type="number" placeholder="Default Notice Days" value={formData.defaultNoticeDays} onChange={(e) => handleInputChange('defaultNoticeDays', e.target.value)} />
        </div>
      ),
      validate: () => Boolean(formData.royaltyStructure && formData.defaultNoticeDays),
    },
    {
      label: 'Review',
      content: (
        <div className="space-y-4 text-sm border p-4 rounded bg-gray-50">
           <h3 className="font-bold">Summary</h3>
           <p><strong>Licensor:</strong> {formData.licensorName}</p>
           <p><strong>Licensee:</strong> {formData.licenseeName}</p>
           <p><strong>Work:</strong> {formData.copyrightedWorkDescription}</p>
           <p><strong>Type:</strong> {formData.exclusiveOrNonExclusive}</p>
        </div>
      ),
      validate: () => true,
    }
  ];

  // 4. MAIN RENDER
  if (isComplete) {
    return (
      <div className="bg-gray-50 p-4 min-h-screen flex items-center justify-center">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-green-600">Agreement Ready</CardTitle>
            <CardDescription>Your document is ready to be generated.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={generatePDF} disabled={isGeneratingPDF} size="lg">
              {isGeneratingPDF ? <Loader2 className="animate-spin mr-2" /> : <CheckCircle className="mr-2" />}
              Download PDF
            </Button>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="ghost" onClick={() => { setIsComplete(false); setCurrentStep(1); }}>Start Over</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 flex justify-center">
      <Card className="max-w-4xl w-full">
        <CardHeader>
          <CardTitle>Copyright License Agreement - Step {currentStep}</CardTitle>
          <CardDescription>{steps[currentStep - 1].label}</CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* This renders the content of the current step */}
          {steps[currentStep - 1].content}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={!steps[currentStep - 1].validate()}
          >
            {currentStep === steps.length ? "Finish" : "Next"}
            {currentStep === steps.length ? <CheckCircle className="w-4 h-4 ml-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CopyrightLicenseForm;