import React, { useState } from "react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, ArrowRight, Loader2, FileText } from "lucide-react";

const MasterUseLicenseForm = () => {
  // 1. STATE MANAGEMENT
  const [step, setStep] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const [formData, setFormData] = useState({
    licensor: '',
    licensee: '',
    workTitle: '',
    licenseDate: '',
    territory: '',
    term: '',
    usageTerms: '',
    // Added signature fields for the PDF
    licensorSignName: '',
    licenseeSignName: ''
  });

  // 2. HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(4, s + 1));
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  // 3. SUBMIT LOGIC (PDF GENERATION)
  const generatePDF = () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 40;
      let y = margin;
      const lineHeight = 14;

      // Helper to add text
      const addText = (text: string, size = 11, bold = false, center = false) => {
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setFontSize(size);
        const maxWidth = pageWidth - margin * 2;
        const lines = doc.splitTextToSize(text || "", maxWidth);
        
        lines.forEach((line: string) => {
          if (y > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            y = margin;
          }
          if (center) {
            const textWidth = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
            const textX = (pageWidth - textWidth) / 2;
            doc.text(line, textX, y);
          } else {
            doc.text(line, margin, y);
          }
          y += lineHeight * 1.2;
        });
        y += 5; // Extra spacing after paragraph
      };

      // --- DOCUMENT CONTENT ---
      addText("MASTER USE LICENSE AGREEMENT", 16, true, true);
      addText("\n");

      addText(`This Master Use License Agreement ("Agreement") is made and entered into as of ${formData.licenseDate || "__________"} (the "Effective Date"), by and between:`);
      addText(`LICENSOR: ${formData.licensor || "[Licensor Name]"} ("Licensor")`);
      addText(`LICENSEE: ${formData.licensee || "[Licensee Name]"} ("Licensee")`);
      addText("\n");

      addText("1. SUBJECT MASTER", 12, true);
      addText(`The Licensor controls the master recording(s) embodying the performance known as "${formData.workTitle || "[Work Title]"}" (the "Master").`);
      addText("\n");

      addText("2. GRANT OF RIGHTS", 12, true);
      addText("Licensor hereby grants to Licensee a non-exclusive license to use the Master as follows:");
      addText(`Territory: ${formData.territory || "Worldwide"}`);
      addText(`Term: ${formData.term || "Perpetual"}`);
      addText(`Permitted Usage: ${formData.usageTerms || "As agreed upon by parties."}`);
      addText("\n");

      addText("3. REPRESENTATIONS & WARRANTIES", 12, true);
      addText("Licensor warrants that it owns or controls all rights in the Master necessary to grant this license and that the use of the Master as permitted herein will not infringe upon the rights of any third party.");
      addText("\n");

      addText("4. MISCELLANEOUS", 12, true);
      addText("This Agreement constitutes the entire understanding between the parties and shall be governed by the laws of the applicable jurisdiction.");
      addText("\n");

      // Signatures
      y += 20; 
      addText("IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.");
      y += 20;

      addText("Licensor:", 11, true);
      addText(`By: ${formData.licensorSignName || formData.licensor}`);
      doc.line(margin, y, margin + 200, y); // Signature line
      y += 20;

      addText("Licensee:", 11, true);
      addText(`By: ${formData.licenseeSignName || formData.licensee}`);
      doc.line(margin, y, margin + 200, y); // Signature line

      doc.save("Master_Use_License_Agreement.pdf");
      setPdfGenerated(true);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // 4. STEP RENDERING
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Parties</h3>
            <div>
              <Label>Licensor (Owner of Master)</Label>
              <Input name="licensor" value={formData.licensor} onChange={handleChange} placeholder="e.g. Record Label or Artist Name" />
            </div>
            <div>
              <Label>Licensee (Party Licensing Master)</Label>
              <Input name="licensee" value={formData.licensee} onChange={handleChange} placeholder="e.g. Production Company" />
            </div>
            <div>
              <Label>Work Title (Song/Recording Name)</Label>
              <Input name="workTitle" value={formData.workTitle} onChange={handleChange} placeholder="e.g. 'Bohemian Rhapsody'" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">License Details</h3>
            <div>
              <Label>License Date</Label>
              <Input type="date" name="licenseDate" value={formData.licenseDate} onChange={handleChange} />
            </div>
            <div>
              <Label>Territory</Label>
              <Input name="territory" value={formData.territory} onChange={handleChange} placeholder="e.g. North America, Worldwide" />
            </div>
            <div>
              <Label>Term (Duration)</Label>
              <Input name="term" value={formData.term} onChange={handleChange} placeholder="e.g. 5 Years, Perpetuity" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Usage Terms</h3>
            <div>
              <Label>Permitted Usage Description</Label>
              <Textarea 
                name="usageTerms" 
                value={formData.usageTerms} 
                onChange={handleChange} 
                placeholder="Describe how the track will be used (e.g., Background music in a film, TV commercial, etc.)" 
                rows={6}
              />
            </div>
          </div>
        );
      case 4:
        return (
           <div className="space-y-4">
            <h3 className="text-lg font-semibold">Signatures</h3>
            <div>
              <Label>Licensor Signature Name</Label>
              <Input name="licensorSignName" value={formData.licensorSignName} onChange={handleChange} placeholder="Print Name" />
            </div>
            <div>
              <Label>Licensee Signature Name</Label>
              <Input name="licenseeSignName" value={formData.licenseeSignName} onChange={handleChange} placeholder="Print Name" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // 5. SUCCESS UI
  if (pdfGenerated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle className="text-green-600 flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6" /> Generated
            </CardTitle>
            <CardDescription>Master Use License Agreement Ready</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center gap-4">
             <Button variant="outline" onClick={() => setPdfGenerated(false)}>Back</Button>
             <Button onClick={generatePDF}>Download Again</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 6. MAIN WIZARD UI
  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-50">
      <Card>
        <CardHeader>
          <CardTitle>Master Use License Form</CardTitle>
          <CardDescription>Step {step} of 4</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          {step < 4 ? (
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={generatePDF} disabled={isGeneratingPDF}>
              {isGeneratingPDF ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <FileText className="mr-2 h-4 w-4" />}
              Generate Agreement
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default MasterUseLicenseForm;