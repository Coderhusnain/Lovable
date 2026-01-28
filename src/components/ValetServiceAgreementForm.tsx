import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Send, CheckCircle, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { toast } from "sonner";
import CountryStateAPI from 'countries-states-cities';
import UserInfoStep from "@/components/UserInfoStep";
import { FormWizard } from './FormWizard';

interface CountryData { id: number; name: string; iso3: string; iso2: string; phone_code: string; capital: string; currency: string; native: string; region: string; subregion: string; emoji: string; }
interface StateData { id: number; name: string; country_id: number; country_code: string; state_code: string; }

const getAllCountries = (): CountryData[] => CountryStateAPI.getAllCountries();
const getStatesByCountry = (countryId: number): StateData[] => CountryStateAPI.getStatesOfCountry(countryId);
const getCountryName = (countryId: string): string => { const c = getAllCountries().find(c => c.id.toString() === countryId); return c?.name || countryId; };
const getStateName = (countryId: string, stateId: string): string => { const c = getAllCountries().find(c => c.id.toString() === countryId); if (!c) return stateId; const s = getStatesByCountry(c.id).find(s => s.id.toString() === stateId); return s?.name || stateId; };

const ValetServiceAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    effectiveDate: '',
    clientName: '',
    clientAddress: '',
    providerName: '',
    providerAddress: '',
    totalAmount: '',
    overtimeRate: '',
    lateInterestRate: '',
    depositAmount: '',
    depositRefundDays: '',
    terminationNoticeDays: '',
    cureDays: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'country') setFormData(prev => ({ ...prev, state: '' }));
  };

  const getStatesForCountry = (): StateData[] => {
    if (!formData.country) return [];
    return getStatesByCountry(parseInt(formData.country));
  };

  const canAdvance = (): boolean => {
    switch (currentStep) {
      case 1: return !!(formData.country && formData.state && formData.effectiveDate);
      case 2: return !!(formData.clientName && formData.clientAddress && formData.providerName && formData.providerAddress);
      case 3: return !!(formData.totalAmount && formData.depositAmount);
      case 4: return !!(formData.terminationNoticeDays);
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => { if (!canAdvance()) return; if (currentStep < 5) setCurrentStep(currentStep + 1); else setIsComplete(true); };
  const handleBack = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const generatePDF = () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const lh = 7;
      let y = 20;
      const checkPage = (n: number = 25) => { if (y > 270 - n) { doc.addPage(); y = 20; } };

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("VALET SERVICE AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const intro = `This Valet Service Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold");
      doc.text("Client:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("Service Provider:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.providerName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.providerAddress || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. PURPOSE OF AGREEMENT", content: "The Client hereby engages the Provider to supply professional valet parking services for the Client's event(s), and the Provider agrees to perform such services in accordance with the terms and conditions set forth in this Agreement." },
        { title: "2. DESCRIPTION OF SERVICES", content: "2.1 The Provider shall provide valet parking services (\"Services\") for automobiles and motorcycles belonging to the Client's guests, patrons, and invitees.\n\n2.2 The Services shall include, but are not limited to:\n• Receiving and parking vehicles in a safe and orderly manner\n• Returning vehicles to their owners upon request\n• Managing traffic flow in designated parking areas\n• Providing clear directional and informational signage\n• Staffing the event with trained and qualified valet attendants\n\n2.3 The Provider shall ensure that all services are rendered professionally, courteously, and in compliance with industry standards." },
        { title: "3. PERFORMANCE OF SERVICES", content: "3.1 Prior to commencement of services, the Provider and Client shall jointly inspect the parking area. Any existing damage or hazardous conditions shall be documented.\n\n3.2 Upon completion of the event, a post-service inspection shall be conducted.\n\n3.3 Any damage, excessive cleaning, or loss caused by the Client, its guests, or invitees shall be the sole responsibility of the Client.\n\n3.4 The Provider shall make reasonable efforts to ensure timely arrival and efficient service. Any delay shall be communicated promptly to the Client." },
        { title: "4. PAYMENT TERMS", content: `4.1 The Client agrees to pay the Provider the total amount of $${formData.totalAmount || '__________'} for the Services.\n\n4.2 Payment shall be made upon completion of the Services unless otherwise agreed in writing.\n\n4.3 Additional service time, overtime, or special requests shall be billed at the rate of $${formData.overtimeRate || '__________'} per hour.\n\n4.4 Late payments shall accrue interest at a rate of ${formData.lateInterestRate || '__________'}% per annum or the maximum rate permitted by law, whichever is less.` },
        { title: "5. DEPOSIT", content: `5.1 A deposit of $${formData.depositAmount || '__________'} shall be paid upon execution of this Agreement.\n\n5.2 The deposit may be applied to damages, cleaning, overtime, or other costs incurred.\n\n5.3 Any unused portion of the deposit shall be refunded within ${formData.depositRefundDays || '__________'} days following completion of the Services.` },
        { title: "6. TERM OF AGREEMENT", content: "6.1 This Agreement shall commence on the Effective Date and remain in effect until completion of the Services, unless earlier terminated as provided herein.\n\n6.2 The term may be extended or modified only by mutual written agreement of the Parties." },
        { title: "7. TERMINATION", content: `7.1 Either Party may terminate this Agreement with ${formData.terminationNoticeDays || '__________'} days' written notice.\n\n7.2 Upon early termination, the Provider shall be entitled to payment for all Services rendered up to the termination date.\n\n7.3 If termination occurs due to breach, the non-breaching Party shall be entitled to all available remedies under law.` },
        { title: "8. RELATIONSHIP OF THE PARTIES", content: "8.1 The Provider is an independent contractor and not an employee, agent, or partner of the Client.\n\n8.2 The Client shall not be responsible for wages, taxes, insurance, or benefits related to the Provider or its employees.\n\n8.3 The Provider shall maintain appropriate insurance coverage and provide proof upon request." },
        { title: "9. COMPLIANCE WITH LAWS", content: "9.1 The Provider shall comply with all applicable federal, state, and local laws, ordinances, and regulations.\n\n9.2 The Provider shall obtain and maintain all necessary permits and licenses required to perform valet services." },
        { title: "10. PARKING AREA CONDITIONS", content: "10.1 The Client shall designate a suitable parking area with adequate capacity.\n\n10.2 The Provider accepts the parking area in its \"as-is\" condition.\n\n10.3 The Provider shall not alter the parking area without prior written consent from the Client.\n\n10.4 The Provider shall:\n• Prevent overnight parking\n• Prohibit vehicle repairs on-site\n• Ensure cleanliness and safety\n• Remove all trash and debris after the event" },
        { title: "11. INDEMNIFICATION", content: "11.1 The Provider agrees to indemnify, defend, and hold harmless the Client from all claims, damages, losses, liabilities, costs, and expenses arising from:\n• Acts or omissions of the Provider or its personnel\n• Negligence or misconduct\n• Property damage or bodily injury related to the Services\n\n11.2 The Client agrees to indemnify the Provider for damages arising from guest misconduct or unsafe premises conditions." },
        { title: "12. WARRANTY AND STANDARD OF CARE", content: "12.1 The Provider warrants that all Services shall be performed in a professional, skillful, and lawful manner.\n\n12.2 The Provider represents that all personnel are properly trained and qualified." },
        { title: "13. DEFAULT", content: "The following shall constitute a material default:\na) Failure to make payment when due\nb) Insolvency or bankruptcy of either Party\nc) Failure to perform contractual obligations\nd) Seizure or attachment of property" },
        { title: "14. REMEDIES", content: `14.1 The non-defaulting Party may provide written notice specifying the breach.\n\n14.2 The defaulting Party shall have ${formData.cureDays || '__________'} days to cure the breach.\n\n14.3 Failure to cure shall result in termination and pursuit of legal remedies.` },
        { title: "15. FORCE MAJEURE", content: "Neither Party shall be liable for failure or delay due to events beyond reasonable control, including but not limited to natural disasters, government actions, labor disputes, or emergencies." },
        { title: "16. ARBITRATION", content: "Any dispute arising under this Agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association." },
        { title: "17. GOVERNING LAW", content: `This Agreement shall be governed by and construed in accordance with the laws of ${getStateName(formData.country, formData.state) || '__________'}, ${getCountryName(formData.country) || '__________'}.` },
        { title: "18. ENTIRE AGREEMENT", content: "This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements or understandings, whether written or oral." },
        { title: "19. AMENDMENTS", content: "This Agreement may be amended only by a written instrument signed by both Parties." },
        { title: "20. SEVERABILITY", content: "If any provision is held invalid, the remaining provisions shall remain in full force and effect." },
        { title: "21. WAIVER", content: "Failure to enforce any provision shall not constitute a waiver of future enforcement." },
        { title: "22. NOTICES", content: "All notices shall be in writing and delivered to the addresses stated herein." }
      ];

      sections.forEach(section => {
        checkPage(40);
        doc.setFont("helvetica", "bold");
        doc.text(section.title, 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        section.content.split('\n').forEach(para => {
          checkPage();
          doc.splitTextToSize(para, 175).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
        });
        y += lh / 2;
      });

      // Signatures
      checkPage(60);
      doc.setFont("helvetica", "bold");
      doc.text("SIGNATURES", pageWidth / 2, y, { align: "center" }); y += lh * 2;
      doc.setFont("helvetica", "normal");
      doc.text("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.", 15, y);
      y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("CLIENT", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: _________________________", 15, y); y += lh;
      doc.text("Date: _________________________", 15, y); y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("SERVICE PROVIDER", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.providerName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: _________________________", 15, y); y += lh;
      doc.text("Date: _________________________", 15, y);

      doc.save("Valet_Service_Agreement.pdf");
      toast.success("PDF generated successfully!");
      setIsComplete(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const steps = [
    {
      label: 'Step 1',
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={formData.country} onValueChange={(v) => handleInputChange('country', v)}>
                <SelectTrigger className="bg-gray-800 border-gray-700"><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent>{getAllCountries().map(c => (<SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Select value={formData.state} onValueChange={(v) => handleInputChange('state', v)} disabled={!formData.country}>
                <SelectTrigger className="bg-gray-800 border-gray-700"><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>{getStatesForCountry().map(s => (<SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="effectiveDate">Effective Date</Label>
              <Input type="date" id="effectiveDate" value={formData.effectiveDate} onChange={(e) => handleInputChange('effectiveDate', e.target.value)} className="bg-gray-800 border-gray-700" />
            </div>
          </div>
        </>
      ),
      validate: () => Boolean(formData.country && formData.state && formData.effectiveDate),
    },
    {
      label: 'Step 2',
      content: (
        <>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-300">Client Information</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input id="clientName" value={formData.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} placeholder="Enter client name" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientAddress">Client Address</Label>
                <Textarea id="clientAddress" value={formData.clientAddress} onChange={(e) => handleInputChange('clientAddress', e.target.value)} placeholder="Enter client address" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-gray-300">Service Provider Information</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="providerName">Provider Name</Label>
                <Input id="providerName" value={formData.providerName} onChange={(e) => handleInputChange('providerName', e.target.value)} placeholder="Enter provider name" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="providerAddress">Provider Address</Label>
                <Textarea id="providerAddress" value={formData.providerAddress} onChange={(e) => handleInputChange('providerAddress', e.target.value)} placeholder="Enter provider address" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>
        </>
      ),
      validate: () => Boolean(formData.clientName && formData.clientAddress && formData.providerName),
    },
    {
      label: 'Step 3',
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="totalAmount">Total Service Amount ($)</Label>
              <Input type="number" id="totalAmount" value={formData.totalAmount} onChange={(e) => handleInputChange('totalAmount', e.target.value)} placeholder="Total service fee" className="bg-gray-800 border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositAmount">Deposit Amount ($)</Label>
              <Input type="number" id="depositAmount" value={formData.depositAmount} onChange={(e) => handleInputChange('depositAmount', e.target.value)} placeholder="Required deposit" className="bg-gray-800 border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtimeRate">Overtime Rate ($/hour)</Label>
              <Input type="number" id="overtimeRate" value={formData.overtimeRate} onChange={(e) => handleInputChange('overtimeRate', e.target.value)} placeholder="Hourly overtime rate" className="bg-gray-800 border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lateInterestRate">Late Payment Interest (%)</Label>
              <Input type="number" id="lateInterestRate" value={formData.lateInterestRate} onChange={(e) => handleInputChange('lateInterestRate', e.target.value)} placeholder="Annual interest rate" className="bg-gray-800 border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositRefundDays">Deposit Refund Days</Label>
              <Input type="number" id="depositRefundDays" value={formData.depositRefundDays} onChange={(e) => handleInputChange('depositRefundDays', e.target.value)} placeholder="Days to refund deposit" className="bg-gray-800 border-gray-700" />
            </div>
          </div>
        </>
      ),
      validate: () => Boolean(formData.totalAmount && formData.depositAmount && formData.overtimeRate),
    },
    {
      label: 'Step 4',
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="terminationNoticeDays">Termination Notice (Days)</Label>
              <Input type="number" id="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={(e) => handleInputChange('terminationNoticeDays', e.target.value)} placeholder="Days notice for termination" className="bg-gray-800 border-gray-700" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cureDays">Cure Period (Days)</Label>
              <Input type="number" id="cureDays" value={formData.cureDays} onChange={(e) => handleInputChange('cureDays', e.target.value)} placeholder="Days to cure breach" className="bg-gray-800 border-gray-700" />
            </div>
          </div>
        </>
      ),
      validate: () => Boolean(formData.terminationNoticeDays && formData.cureDays),
    },
    {
      label: 'Review & Generate',
      content: (
        <UserInfoStep
          onBack={handleBack}
          onGenerate={generatePDF}
          documentType="Valet Service Agreement"
          isGenerating={isGeneratingPDF}
        />
      ),
      validate: () => true,
    },
  ];

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700 max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Document Generated!</h2>
            <p className="text-gray-400 mb-6">Your Valet Service Agreement has been created and downloaded.</p>
            <Button onClick={() => navigate('/documents')} className="w-full bg-purple-600 hover:bg-purple-700">Back to Documents</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/documents')} className="mb-6 text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Documents
        </Button>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg"><Car className="w-6 h-6 text-white" /></div>
              <div>
                <CardTitle className="text-white">Valet Service Agreement</CardTitle>
                <CardDescription className="text-gray-400">Create a professional valet parking services agreement</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}>{step}</div>
                  {step < 5 && <div className={`w-12 md:w-24 h-1 mx-2 ${currentStep > step ? 'bg-purple-600' : 'bg-gray-700'}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between mb-8 text-xs text-gray-400">
              <span>Location</span><span>Parties</span><span>Payment</span><span>Terms</span><span>Generate</span>
            </div>
            <div className="min-h-[400px]">
              <FormWizard steps={steps} onFinish={() => alert('Form submitted!')} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ValetServiceAgreementForm;
