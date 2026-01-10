import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Send, CheckCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { toast } from "sonner";
import CountryStateAPI from 'countries-states-cities';
import UserInfoStep from "@/components/UserInfoStep";
import { generateGuidePDF } from "@/utils/generateGuidePDF";

interface CountryData { id: number; name: string; iso3: string; iso2: string; phone_code: string; capital: string; currency: string; native: string; region: string; subregion: string; emoji: string; }
interface StateData { id: number; name: string; country_id: number; country_code: string; state_code: string; }

const getAllCountries = (): CountryData[] => CountryStateAPI.getAllCountries();
const getStatesByCountry = (countryId: number): StateData[] => CountryStateAPI.getStatesOfCountry(countryId);
const getStateName = (countryId: string, stateId: string): string => { const c = getAllCountries().find(c => c.id.toString() === countryId); if (!c) return stateId; const s = getStatesByCountry(c.id).find(s => s.id.toString() === stateId); return s?.name || stateId; };

interface FormData {
  country: string; state: string; effectiveDate: string;
  clientName: string; clientAddress: string; clientPhone: string; clientEmail: string;
  attorneyName: string; firmName: string; firmAddress: string; firmPhone: string; firmEmail: string; barNumber: string;
  matterDescription: string;
  retainerAmount: string; hourlyRate: string; billingFrequency: string;
  paymentDue: string;
  scopeOfServices: string[];
  expenseHandling: string;
  conflictCheck: boolean;
  additionalNotes: string;
}

const RetainerAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '',
    clientName: '', clientAddress: '', clientPhone: '', clientEmail: '',
    attorneyName: '', firmName: '', firmAddress: '', firmPhone: '', firmEmail: '', barNumber: '',
    matterDescription: '',
    retainerAmount: '', hourlyRate: '', billingFrequency: 'monthly',
    paymentDue: '30',
    scopeOfServices: [],
    expenseHandling: 'billed separately',
    conflictCheck: false,
    additionalNotes: ''
  });

  const serviceOptions = [
    "Legal consultation and advice", "Document preparation and review", "Negotiation on client's behalf",
    "Court representation", "Legal research", "Contract drafting",
    "Correspondence with opposing parties", "Settlement negotiations", "Discovery and depositions",
    "Appeals", "Regulatory compliance advice", "Transaction support"
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'country') setFormData(prev => ({ ...prev, state: '' }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      scopeOfServices: prev.scopeOfServices.includes(service)
        ? prev.scopeOfServices.filter(s => s !== service)
        : [...prev.scopeOfServices, service]
    }));
  };

  const getStatesForCountry = (country: string): string[] => {
    if (!country) return [];
    return getStatesByCountry(parseInt(country.split(':')[0])).map(s => `${s.id}:${s.name}`);
  };

  const canAdvance = (): boolean => {
    switch (currentStep) {
      case 1: return !!(formData.country && formData.state && formData.effectiveDate);
      case 2: return !!(formData.clientName && formData.attorneyName);
      case 3: return !!(formData.matterDescription && formData.scopeOfServices.length > 0);
      case 4: return !!(formData.retainerAmount && formData.hourlyRate);
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
      const lh = 7; let y = 20;
      const checkPage = (n: number = 25) => { if (y > 270 - n) { doc.addPage(); y = 20; } };

      doc.setFont("helvetica", "bold"); doc.setFontSize(16);
      doc.text("RETAINER AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      const intro = `This Retainer Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold"); doc.text("Client:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.clientPhone || '__________'} | Email: ${formData.clientEmail || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("Attorney/Law Firm:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Attorney: ${formData.attorneyName || '__________'}`, 20, y); y += lh;
      if (formData.firmName) { doc.text(`Firm: ${formData.firmName}`, 20, y); y += lh; }
      if (formData.barNumber) { doc.text(`Bar Number: ${formData.barNumber}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.firmAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.firmPhone || '__________'} | Email: ${formData.firmEmail || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. MATTER DESCRIPTION", content: formData.matterDescription || 'Legal matter to be described.' },
        { title: "2. SCOPE OF SERVICES", content: `Attorney agrees to provide the following services:\n${formData.scopeOfServices.map(s => `• ${s}`).join('\n') || '• As agreed upon'}` },
        { title: "3. RETAINER AND FEES", content: `Initial Retainer: $${formData.retainerAmount || '__________'}\nHourly Rate: $${formData.hourlyRate || '__________'}/hour\nBilling Frequency: ${formData.billingFrequency || 'Monthly'}\nPayment Due: Within ${formData.paymentDue || '30'} days of invoice` },
        { title: "4. EXPENSES", content: `Expenses will be ${formData.expenseHandling || 'billed separately to Client'}. Expenses may include court filing fees, copying, postage, travel, expert witnesses, and other reasonable costs.` },
        { title: "5. RETAINER APPLICATION", content: "The retainer will be deposited into Attorney's trust account and applied against fees and expenses as incurred. Client will receive regular statements. Additional retainer may be required if balance is depleted." },
        { title: "6. ATTORNEY RESPONSIBILITIES", content: "Attorney agrees to: Provide competent legal representation, Keep Client informed of case progress, Respond to Client communications in a timely manner, Maintain client confidentiality, Act in Client's best interest." },
        { title: "7. CLIENT RESPONSIBILITIES", content: "Client agrees to: Provide truthful and complete information, Cooperate with Attorney's reasonable requests, Appear at scheduled meetings and court dates, Make timely fee payments, Keep Attorney informed of contact information changes." },
        { title: "8. COMMUNICATION", content: "Attorney will keep Client informed of significant developments. Client may communicate with Attorney during normal business hours. Emergency matters will be handled as appropriate." },
        { title: "9. TERMINATION", content: "Either party may terminate this Agreement upon written notice. Upon termination: Attorney will refund unused retainer, Client is responsible for fees and expenses incurred through termination, Attorney will assist with transition to new counsel if requested." },
        { title: "10. DISPUTE RESOLUTION", content: "Any disputes regarding fees shall be subject to binding arbitration if not resolved through direct communication." },
        { title: "11. GOVERNING LAW", content: `This Agreement shall be governed by the laws of ${formData.state ? getStateName(formData.country.split(':')[0], formData.state.split(':')[0]) : '__________'}.` }
      ];

      sections.forEach(s => {
        checkPage(30);
        doc.setFont("helvetica", "bold"); doc.text(s.title, 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(s.content, 180).forEach((line: string) => { checkPage(); doc.text(line, 15, y); y += lh; });
        y += 3;
      });

      if (formData.additionalNotes) {
        checkPage(30);
        doc.setFont("helvetica", "bold"); doc.text("12. ADDITIONAL TERMS", 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(formData.additionalNotes, 180).forEach((line: string) => { checkPage(); doc.text(line, 15, y); y += lh; });
        y += 3;
      }

      checkPage(50);
      doc.setFont("helvetica", "bold"); doc.text("SIGNATURES", 15, y); y += lh * 2;
      doc.setFont("helvetica", "normal");
      doc.text(`Client: ${formData.clientName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y); y += lh * 2;
      doc.text(`Attorney: ${formData.attorneyName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y);

      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`retainer_agreement_${timestamp}.pdf`);
      const guidePDF = generateGuidePDF({ documentId: "retainer-agreement", documentTitle: "Retainer Agreement" });
      setTimeout(() => guidePDF.save(`retainer_guide_${timestamp}.pdf`), 500);
      toast.success("Retainer Agreement and Guide PDF generated!");
    } catch (error) { console.error("Error:", error); toast.error("Failed to generate PDF"); }
    finally { setIsGeneratingPDF(false); }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Country</Label><Select value={formData.country} onValueChange={(v) => handleInputChange('country', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{getAllCountries().map((c) => (<SelectItem key={c.id} value={`${c.id}:${c.name}`}>{c.name}</SelectItem>))}</SelectContent></Select></div>
              <div><Label>State/Province</Label><Select value={formData.state} onValueChange={(v) => handleInputChange('state', v)} disabled={!formData.country}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent>{getStatesForCountry(formData.country).map((s) => (<SelectItem key={s} value={s}>{s.split(':')[1]}</SelectItem>))}</SelectContent></Select></div>
            </div>
            <div><Label>Agreement Date</Label><Input type="date" value={formData.effectiveDate} onChange={(e) => handleInputChange('effectiveDate', e.target.value)} /></div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Client Information</h3>
              <div><Label>Client Name *</Label><Input value={formData.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} /></div>
              <div><Label>Address</Label><Textarea value={formData.clientAddress} onChange={(e) => handleInputChange('clientAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.clientPhone} onChange={(e) => handleInputChange('clientPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.clientEmail} onChange={(e) => handleInputChange('clientEmail', e.target.value)} /></div>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Attorney/Law Firm Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Attorney Name *</Label><Input value={formData.attorneyName} onChange={(e) => handleInputChange('attorneyName', e.target.value)} /></div>
                <div><Label>Bar Number</Label><Input value={formData.barNumber} onChange={(e) => handleInputChange('barNumber', e.target.value)} /></div>
              </div>
              <div><Label>Law Firm Name</Label><Input value={formData.firmName} onChange={(e) => handleInputChange('firmName', e.target.value)} /></div>
              <div><Label>Address</Label><Textarea value={formData.firmAddress} onChange={(e) => handleInputChange('firmAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.firmPhone} onChange={(e) => handleInputChange('firmPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.firmEmail} onChange={(e) => handleInputChange('firmEmail', e.target.value)} /></div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div><Label>Matter Description *</Label><Textarea placeholder="Describe the legal matter for which you are retaining the attorney..." value={formData.matterDescription} onChange={(e) => handleInputChange('matterDescription', e.target.value)} rows={4} /></div>
            <div className="space-y-2">
              <Label>Scope of Services *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {serviceOptions.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox id={service} checked={formData.scopeOfServices.includes(service)} onCheckedChange={() => handleServiceToggle(service)} />
                    <Label htmlFor={service} className="text-sm cursor-pointer">{service}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="conflict" checked={formData.conflictCheck} onCheckedChange={(c) => handleInputChange('conflictCheck', !!c)} />
              <Label htmlFor="conflict">Attorney has performed conflict check</Label>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Initial Retainer ($) *</Label><Input type="number" value={formData.retainerAmount} onChange={(e) => handleInputChange('retainerAmount', e.target.value)} /></div>
              <div><Label>Hourly Rate ($) *</Label><Input type="number" value={formData.hourlyRate} onChange={(e) => handleInputChange('hourlyRate', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Billing Frequency</Label><Select value={formData.billingFrequency} onValueChange={(v) => handleInputChange('billingFrequency', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="upon completion">Upon Completion</SelectItem></SelectContent></Select></div>
              <div><Label>Payment Due (days)</Label><Select value={formData.paymentDue} onValueChange={(v) => handleInputChange('paymentDue', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="15">15 days</SelectItem><SelectItem value="30">30 days</SelectItem><SelectItem value="45">45 days</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label>Expense Handling</Label><Select value={formData.expenseHandling} onValueChange={(v) => handleInputChange('expenseHandling', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="billed separately">Billed Separately</SelectItem><SelectItem value="included in fees">Included in Fees</SelectItem><SelectItem value="deducted from retainer">Deducted from Retainer</SelectItem></SelectContent></Select></div>
            <div><Label>Additional Notes</Label><Textarea value={formData.additionalNotes} onChange={(e) => handleInputChange('additionalNotes', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="Retainer Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />Retainer Agreement Ready</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p><strong>Client:</strong> {formData.clientName}</p><p><strong>Attorney:</strong> {formData.attorneyName}</p><p><strong>Matter:</strong> {formData.matterDescription.substring(0, 50)}...</p></div>
              <div><p><strong>Retainer:</strong> ${formData.retainerAmount}</p><p><strong>Rate:</strong> ${formData.hourlyRate}/hour</p><p><strong>Services:</strong> {formData.scopeOfServices.length} selected</p></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}><ArrowLeft className="mr-2 h-4 w-4" />Edit</Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-slate-700 hover:bg-slate-800">{isGeneratingPDF ? "Generating..." : "Generate PDF"}<FileText className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>
    );
  }

  const stepTitles = ["", "Location", "Parties", "Matter & Scope", "Fees", "Your Info"];
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
        <CardTitle>Retainer Agreement</CardTitle>
        <CardDescription className="text-slate-300">Step {currentStep} of 5: {stepTitles[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStep()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-slate-700 hover:bg-slate-800">{currentStep === 5 ? "Complete" : "Next"}{currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</Button>
      </CardFooter>
    </Card>
  );
};

export default RetainerAgreementForm;
