import React, { useState } from "react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, ArrowRight, Loader2, FileText } from "lucide-react";

const LeaseSubordinationAgreementForm = () => {
  // 1. STATE MANAGEMENT
  const [step, setStep] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Agreement & Parties
    agreementDate: '',
    mortgageeName: '',
    mortgageeAddress: '',
    tenantName: '',
    tenantAddress: '',
    // Step 2: Lease & Property
    leaseDate: '',
    landlordName: '',
    landlordAddress: '',
    legalDescription: '',
    premisesAddress: '',
    // Step 3: Signatures
    signMortgageeName: '',
    signMortgageeTitle: '',
    signMortgageeDate: '',
    signTenantName: '',
    signTenantTitle: '',
    signTenantDate: ''
  });

  // 2. HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(3, s + 1));
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  // 3. PDF GENERATION LOGIC
  const generatePDF = () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 40;
      const maxW = pageW - margin * 2;
      let y = margin;

      const write = (text: string, size = 11, bold = false, center = false) => {
        doc.setFont("times", bold ? "bold" : "normal");
        doc.setFontSize(size);
        const lines = doc.splitTextToSize(text || "", maxW);
        lines.forEach((line: string) => {
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
        y += 5; // Extra spacing between paragraphs
      };

      // --- DOCUMENT CONTENT ---
      write("LEASE SUBORDINATION AGREEMENT", 16, true, true);
      write("\n");

      write(`This Lease Subordination Agreement ("Agreement") is made and entered into as of ${formData.agreementDate || "[Insert Date]"}, by and between:`);
      write(`Mortgagee: ${formData.mortgageeName || "[Mortgagee Name]"}, of ${formData.mortgageeAddress || "[Address]"}.`);
      write("and");
      write(`Tenant: ${formData.tenantName || "[Tenant Name]"}, of ${formData.tenantAddress || "[Address]"}.`);
      write("\n");

      write("RECITALS", 12, true);
      write(`WHEREAS, the Tenant entered into a lease agreement (the "Lease") dated ${formData.leaseDate || "[Date]"}, with ${formData.landlordName || "[Landlord Name]"}, of ${formData.landlordAddress || "[Address]"} ("Landlord"), covering certain real property described as follows:`);
      write(`${formData.legalDescription || "[Insert Legal Description of Premises]"},`);
      write(`commonly known as: ${formData.premisesAddress || "[Insert Premises Address]"} ("Premises");`);

      write("WHEREAS, the Mortgagee has extended a mortgage loan to the Landlord, secured, inter alia, by a mortgage (\"Mortgage\") recorded against the Premises;");
      write("WHEREAS, the Tenant has agreed to subordinate its leasehold interest in the Premises in consideration of the Mortgagee's agreement not to disturb the Tenant's possession thereof under the terms of the Lease, so long as the Tenant remains in compliance with its obligations.");
      write("\n");

      write("NOW, THEREFORE, in consideration of the foregoing and the mutual covenants contained herein, the parties agree as follows:", 11, true);
      write("\n");

      write("1. Subordination", 12, true);
      write("The Tenant hereby covenants and agrees that the Lease, and all of the Tenant's rights, title, and interest thereunder, shall be and remain subject and subordinate in all respects to the lien, terms, and conditions of the Mortgage, including all renewals, extensions, modifications, consolidations, substitutions, or replacements thereof, and to any future mortgage or mortgages encumbering the Premises that are held by the Mortgagee or its successors or assigns.");

      write("2. Non-Disturbance", 12, true);
      write("So long as the Tenant is not in default under the Lease beyond any applicable notice and cure periods, the Mortgagee agrees that the Lease shall not be terminated, nor shall the Tenant's possession, use, or enjoyment of the Premises be disturbed, nor shall the leasehold interest be otherwise affected in the event of foreclosure, or any proceeding to enforce the Mortgage, or if the Mortgagee or any purchaser acquires the Premises.");
      write("Notwithstanding the foregoing, any party succeeding to the interest of the Landlord (hereinafter, the \"Purchaser\") as a result of foreclosure or similar action shall not be:");
      write("(a) liable for any act or omission of any prior landlord;");
      write("(b) subject to any offsets or defenses which the Tenant may have against any prior landlord;");
      write("(c) bound by any prepayment of rent for more than one month in advance; or");
      write("(d) bound by any modification or amendment to the Lease not expressly approved in writing by the Mortgagee.");

      write("3. Attornment", 12, true);
      write("In the event of foreclosure or conveyance in lieu thereof, or if the Mortgagee otherwise succeeds to the interest of the Landlord under the Lease, the Tenant agrees to attorn to and recognize the Purchaser (including Mortgagee, if applicable) as its landlord under the Lease. Such attornment shall be effective automatically and shall not require the execution of any further instrument.");
      write("From and after such attornment, the Lease shall continue in full force and effect as a direct lease between the Purchaser and the Tenant for the remainder of the term, including any extensions or renewals pursuant to the Lease, and the Purchaser shall assume the obligations of Landlord thereunder arising from and after the date of such succession.");

      write("4. Binding Effect", 12, true);
      write("This Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective heirs, executors, legal representatives, successors, and assigns.");

      write("5. Execution and Counterparts", 12, true);
      write("This Agreement may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one instrument. Electronic or scanned signatures shall be deemed effective as originals.");
      write("\n");

      // Signatures
      if (y > doc.internal.pageSize.getHeight() - 150) {
        doc.addPage();
        y = margin;
      }
      
      write("IN WITNESS WHEREOF, the undersigned have executed this Lease Subordination Agreement as of the date first written above.");
      write("\n");

      write("MORTGAGEE:", 11, true);
      write(`By: ${formData.signMortgageeName}`);
      write(`Name: ${formData.signMortgageeName}`);
      write(`Title: ${formData.signMortgageeTitle}`);
      write(`Date: ${formData.signMortgageeDate}`);
      write("\n");

      write("TENANT:", 11, true);
      write(`By: ${formData.signTenantName}`);
      write(`Name: ${formData.signTenantName}`);
      write(`Title: ${formData.signTenantTitle}`);
      write(`Date: ${formData.signTenantDate}`);

      doc.save("Lease_Subordination_Agreement.pdf");
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
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Agreement & Parties</h3>
            <div>
              <Label>Agreement Date</Label>
              <Input type="date" name="agreementDate" value={formData.agreementDate} onChange={handleChange} />
            </div>
            <div>
              <Label>Mortgagee Name (Lender)</Label>
              <Input name="mortgageeName" value={formData.mortgageeName} onChange={handleChange} />
            </div>
            <div>
              <Label>Mortgagee Address</Label>
              <Textarea name="mortgageeAddress" value={formData.mortgageeAddress} onChange={handleChange} rows={2} />
            </div>
            <div>
              <Label>Tenant Name</Label>
              <Input name="tenantName" value={formData.tenantName} onChange={handleChange} />
            </div>
            <div>
              <Label>Tenant Address</Label>
              <Textarea name="tenantAddress" value={formData.tenantAddress} onChange={handleChange} rows={2} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Lease & Property Details</h3>
            <div>
              <Label>Original Lease Date</Label>
              <Input type="date" name="leaseDate" value={formData.leaseDate} onChange={handleChange} />
            </div>
            <div>
              <Label>Landlord Name</Label>
              <Input name="landlordName" value={formData.landlordName} onChange={handleChange} />
            </div>
            <div>
              <Label>Landlord Address</Label>
              <Textarea name="landlordAddress" value={formData.landlordAddress} onChange={handleChange} rows={2} />
            </div>
            <div>
              <Label>Premises Address (Common Name)</Label>
              <Input name="premisesAddress" value={formData.premisesAddress} onChange={handleChange} placeholder="e.g. 123 Main St, Suite 400" />
            </div>
            <div>
              <Label>Legal Description of Premises</Label>
              <Textarea name="legalDescription" value={formData.legalDescription} onChange={handleChange} placeholder="Lot, Block, and Survey details..." rows={4} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Signatures</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                 <h4 className="font-medium text-sm">Mortgagee</h4>
                 <Label>Signatory Name</Label>
                 <Input name="signMortgageeName" value={formData.signMortgageeName} onChange={handleChange} />
                 <Label>Title</Label>
                 <Input name="signMortgageeTitle" value={formData.signMortgageeTitle} onChange={handleChange} />
                 <Label>Date</Label>
                 <Input type="date" name="signMortgageeDate" value={formData.signMortgageeDate} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                 <h4 className="font-medium text-sm">Tenant</h4>
                 <Label>Signatory Name</Label>
                 <Input name="signTenantName" value={formData.signTenantName} onChange={handleChange} />
                 <Label>Title</Label>
                 <Input name="signTenantTitle" value={formData.signTenantTitle} onChange={handleChange} />
                 <Label>Date</Label>
                 <Input type="date" name="signTenantDate" value={formData.signTenantDate} onChange={handleChange} />
              </div>
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
            <CardDescription>Lease Subordination Agreement Ready</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setPdfGenerated(false)}>Back</Button>
            <Button onClick={generatePDF}>Download Again</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 6. MAIN RENDER
  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-50">
      <Card>
        <CardHeader>
          <CardTitle>Lease Subordination Agreement</CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {step < 3 ? (
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

export default LeaseSubordinationAgreementForm;