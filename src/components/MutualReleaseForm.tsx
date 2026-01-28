import React, { useState } from "react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, ArrowRight, Loader2, FileText } from "lucide-react";

const MutualReleaseForm = () => {
  // 1. STATE MANAGEMENT
  const [step, setStep] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Parties & Recitals
    effectiveDate: '',
    partyAName: '',
    partyATitle: '',
    partyBName: '',
    partyBTitle: '',
    underlyingContractDate: '',
    underlyingContractReference: '',
    // Step 2: Release Terms
    payment1_amount: '',
    payment1_from: '',
    payment1_to: '',
    payment2_amount: '',
    payment2_from: '',
    payment2_to: '',
    governingLaw: '',
    waiverUnknownClaims: 'Each Party expressly waives any rights with respect to unknown claims.',
    // Step 3: Signatures & Notary
    signPartyAName: '',
    signPartyADate: '',
    signPartyBName: '',
    signPartyBDate: '',
    notaryName: '',
    notaryDate: '',
    notaryCounty: '',
    notaryState: ''
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

      const write = (text: string, size = 11, bold = false, center = false, spacing = 1.3) => {
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
          y += size * spacing;
        });
        if (!center) y += 5; // Extra spacing for paragraphs
      };

      // --- DOCUMENT CONTENT ---
      write("MUTUAL RELEASE AGREEMENT", 14, true, true);
      write("\n");

      write(`This Mutual Release Agreement (the "Agreement") is entered into as of ${formData.effectiveDate || "__________"}, by and between:`);
      write(`${formData.partyAName || "[Party A]"}, and ${formData.partyBName || "[Party B]"}.`);
      write("\n");

      write("PURPOSE", 12, true);
      write("The purpose of this Agreement is to effect the full and final settlement of all disputes, obligations, and liabilities between the Parties, and to terminate any obligations owed by either Party to the other in connection with the matters described herein.");
      
      write("RECITALS", 12, true);
      write(`WHEREAS, disputes and differences have arisen between the Parties relating to that certain agreement dated ${formData.underlyingContractDate || "__________"}, a copy of which is attached hereto as Exhibit A (the "Underlying Contract");`);
      write("WHEREAS, the Parties desire to fully and finally resolve said disputes and differences, without admission of liability, by executing this Mutual Release;");
      write("WHEREAS, in consideration of this Mutual Release and additional consideration, including the payments acknowledged below, each Party wishes to release and discharge the other Party from all claims and liabilities arising from the Underlying Contract; and");
      write("\n");

      write("NOW, THEREFORE, in consideration of the foregoing recitals and the mutual covenants contained herein, the Parties agree as follows:", 11, false);
      write("\n");

      write("1. MUTUAL RELEASE", 12, true);
      write("1.1 Release by Party A.");
      write(`${formData.partyAName || "[Party A]"} does hereby release, cancel, forgive, and forever discharge ${formData.partyBName || "[Party B]"}, together with its predecessors, parent corporations, subsidiaries, affiliates, divisions, heirs, successors, and assigns, and all of their respective officers, directors, employees, and representatives, from any and all actions, claims, demands, damages, liabilities, obligations, controversies, and causes of action of every kind or nature whatsoever, whether known or unknown, suspected or unsuspected, which have arisen, may have arisen, or may hereafter arise out of or relating to the Underlying Contract, from the beginning of time through the date of this Agreement.`);

      write("1.2 Release by Party B.");
      write(`${formData.partyBName || "[Party B]"} does hereby release, cancel, forgive, and forever discharge ${formData.partyAName || "[Party A]"}, together with its predecessors, subsidiaries, affiliates, divisions, heirs, successors, and assigns, and all of their respective officers, directors, employees, and representatives, from any and all actions, claims, demands, damages, liabilities, obligations, controversies, and causes of action of every kind or nature whatsoever, whether known or unknown, suspected or unsuspected, which have arisen, may have arisen, or may hereafter arise out of or relating to the Underlying Contract, from the beginning of time through the date of this Agreement.`);

      write("1.3 Waiver of Unknown Claims.");
      write(formData.waiverUnknownClaims);
      write("\n");

      write("PAYMENTS (Acknowledged Consideration)", 12, true);
      if (formData.payment1_amount) {
        write(`Payment 1: ${formData.payment1_amount} paid by ${formData.payment1_from} to ${formData.payment1_to}. Receipt acknowledged.`);
      }
      if (formData.payment2_amount) {
        write(`Payment 2: ${formData.payment2_amount} paid by ${formData.payment2_from} to ${formData.payment2_to}. Receipt acknowledged.`);
      }
      if (!formData.payment1_amount && !formData.payment2_amount) {
        write("No monetary payments are recorded on this Agreement.");
      }
      write("\n");

      write("2. GOVERNING LAW", 12, true);
      write(`This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${formData.governingLaw || "[State]"}.`);
      write("\n");

      write("3. LEGAL CONSTRUCTION", 12, true);
      write("If any provision of this Agreement is held to be invalid, illegal, or unenforceable, such provision shall be deemed severed, and the remaining provisions shall remain valid and enforceable.");
      
      write("4. ATTORNEYS' FEES", 12, true);
      write("If any action or proceeding is brought to enforce or interpret the provisions of this Agreement, the prevailing Party shall be entitled to recover its reasonable attorneys' fees and costs.");
      
      write("5. ENTIRE AGREEMENT", 12, true);
      write("This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof.");
      write("\n");

      // Signatures
      if (y > doc.internal.pageSize.getHeight() - 200) {
        doc.addPage();
        y = margin;
      }

      write("EXECUTION", 12, true);
      write("IN WITNESS WHEREOF, the Parties hereto have executed this Mutual Release Agreement as of the date first written above.");
      write("\n");

      write(`${formData.partyAName || "[Party A]"}`);
      write(`Name / Title: ${formData.partyATitle}`);
      write(`Date: ${formData.signPartyADate}`);
      write("____________________________________ (Signature)");
      write("\n");

      write(`${formData.partyBName || "[Party B]"}`);
      write(`Name / Title: ${formData.partyBTitle}`);
      write(`Date: ${formData.signPartyBDate}`);
      write("____________________________________ (Signature)");
      write("\n");

      // Notary
      if (formData.notaryName) {
         if (y > doc.internal.pageSize.getHeight() - 150) {
            doc.addPage();
            y = margin;
         }
         write("NOTARY ACKNOWLEDGMENT (Optional)", 11, true);
         write(`State of ${formData.notaryState || "__________"} )`);
         write(`County of ${formData.notaryCounty || "__________"} )`);
         write(`On this ${formData.notaryDate || "___ day of ______, 20__"}, before me, the undersigned Notary Public, personally appeared ${formData.notaryName}, known to me (or satisfactorily proven) to be the person whose name is subscribed to this instrument, and acknowledged that he/she executed the same for the purposes therein contained.`);
         write("IN WITNESS WHEREOF, I hereunto set my hand and official seal.");
         write("\n\nNotary Public: ____________________________");
      }

      doc.save("Mutual_Release_Agreement.pdf");
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
            <h3 className="font-semibold text-lg">Parties & Recitals</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Effective Date</Label><Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} /></div>
              <div><Label>Underlying Contract Date</Label><Input type="date" name="underlyingContractDate" value={formData.underlyingContractDate} onChange={handleChange} /></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Party A Name</Label><Input name="partyAName" value={formData.partyAName} onChange={handleChange} /></div>
              <div><Label>Party A Title</Label><Input name="partyATitle" value={formData.partyATitle} onChange={handleChange} /></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div><Label>Party B Name</Label><Input name="partyBName" value={formData.partyBName} onChange={handleChange} /></div>
               <div><Label>Party B Title</Label><Input name="partyBTitle" value={formData.partyBTitle} onChange={handleChange} /></div>
            </div>

            <div><Label>Underlying Contract Reference/Exhibit</Label><Textarea name="underlyingContractReference" value={formData.underlyingContractReference} onChange={handleChange} rows={2} /></div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Release Terms & Consideration</h3>
            
            <div className="p-4 border rounded bg-gray-50 space-y-3">
               <h4 className="font-medium text-sm">Payment 1 (Optional)</h4>
               <div className="grid grid-cols-3 gap-2">
                 <div><Label>Amount</Label><Input name="payment1_amount" value={formData.payment1_amount} onChange={handleChange} placeholder="$0.00" /></div>
                 <div><Label>Paid By</Label><Input name="payment1_from" value={formData.payment1_from} onChange={handleChange} /></div>
                 <div><Label>Paid To</Label><Input name="payment1_to" value={formData.payment1_to} onChange={handleChange} /></div>
               </div>
            </div>

            <div className="p-4 border rounded bg-gray-50 space-y-3">
               <h4 className="font-medium text-sm">Payment 2 (Optional)</h4>
               <div className="grid grid-cols-3 gap-2">
                 <div><Label>Amount</Label><Input name="payment2_amount" value={formData.payment2_amount} onChange={handleChange} placeholder="$0.00" /></div>
                 <div><Label>Paid By</Label><Input name="payment2_from" value={formData.payment2_from} onChange={handleChange} /></div>
                 <div><Label>Paid To</Label><Input name="payment2_to" value={formData.payment2_to} onChange={handleChange} /></div>
               </div>
            </div>

            <div><Label>Governing Law (State)</Label><Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} /></div>
            <div><Label>Waiver of Unknown Claims</Label><Textarea name="waiverUnknownClaims" value={formData.waiverUnknownClaims} onChange={handleChange} rows={3} /></div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Signatures</h3>
            <div className="grid grid-cols-2 gap-4">
               <div><Label>Party A Sign Name</Label><Input name="signPartyAName" value={formData.signPartyAName} onChange={handleChange} /></div>
               <div><Label>Date</Label><Input type="date" name="signPartyADate" value={formData.signPartyADate} onChange={handleChange} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div><Label>Party B Sign Name</Label><Input name="signPartyBName" value={formData.signPartyBName} onChange={handleChange} /></div>
               <div><Label>Date</Label><Input type="date" name="signPartyBDate" value={formData.signPartyBDate} onChange={handleChange} /></div>
            </div>
            
            <hr />
            <h4 className="font-medium">Notary (Optional)</h4>
            <div className="grid grid-cols-2 gap-4">
               <div><Label>Notary Name</Label><Input name="notaryName" value={formData.notaryName} onChange={handleChange} /></div>
               <div><Label>Date</Label><Input type="date" name="notaryDate" value={formData.notaryDate} onChange={handleChange} /></div>
               <div><Label>County</Label><Input name="notaryCounty" value={formData.notaryCounty} onChange={handleChange} /></div>
               <div><Label>State</Label><Input name="notaryState" value={formData.notaryState} onChange={handleChange} /></div>
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
            <CardDescription>Mutual Release Agreement Ready</CardDescription>
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
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50">
      <Card>
        <CardHeader>
          <CardTitle>Mutual Release Agreement</CardTitle>
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

export default MutualReleaseForm;