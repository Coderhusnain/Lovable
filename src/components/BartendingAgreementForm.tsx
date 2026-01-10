import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
const getCountryName = (countryId: string): string => { const c = getAllCountries().find(c => c.id.toString() === countryId); return c?.name || countryId; };
const getStateName = (countryId: string, stateId: string): string => { const c = getAllCountries().find(c => c.id.toString() === countryId); if (!c) return stateId; const s = getStatesByCountry(c.id).find(s => s.id.toString() === stateId); return s?.name || stateId; };

interface FormData {
  country: string;
  state: string;
  effectiveDate: string;
  clientName: string;
  clientAddress: string;
  bartenderName: string;
  bartenderAddress: string;
  eventDate: string;
  eventLocation: string;
  eventStartTime: string;
  eventEndTime: string;
  totalServiceFee: string;
  retainerAmount: string;
  hourlyRate: string;
  latePaymentRate: string;
  cancellationDays: string;
}

const BartendingAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '', clientName: '', clientAddress: '',
    bartenderName: '', bartenderAddress: '', eventDate: '', eventLocation: '',
    eventStartTime: '', eventEndTime: '', totalServiceFee: '', retainerAmount: '',
    hourlyRate: '', latePaymentRate: '', cancellationDays: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'country') setFormData(prev => ({ ...prev, state: '' }));
  };

  const getStatesForCountry = (country: string): string[] => {
    if (!country) return [];
    const states = getStatesByCountry(parseInt(country.split(':')[0]));
    return states.map(s => `${s.id}:${s.name}`);
  };

  const canAdvance = (): boolean => {
    switch (currentStep) {
      case 1: return !!(formData.country && formData.state && formData.effectiveDate);
      case 2: return !!(formData.clientName && formData.clientAddress && formData.bartenderName && formData.bartenderAddress);
      case 3: return !!(formData.eventDate && formData.eventLocation && formData.eventStartTime && formData.eventEndTime);
      case 4: return !!(formData.totalServiceFee && formData.retainerAmount);
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
      doc.text("BARTENDING SERVICES AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const intro = `This Bartending Services Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold");
      doc.text("Recipient (Client):", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("Provider (Bartender):", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.bartenderName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.bartenderAddress || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. PURPOSE OF AGREEMENT", content: "The Recipient desires to retain the Provider to perform professional bartending services for an event, and the Provider agrees to provide such services under the terms and conditions set forth herein." },
        { title: "2. DESCRIPTION OF SERVICES", content: "The Provider shall provide professional bartending services including: Preparation and service of alcoholic and non-alcoholic beverages, Setup and breakdown of the bar area, Preparation of garnishes and beverage components, Maintenance of cleanliness and safety at the bar, Monitoring alcohol consumption and guest conduct." },
        { title: "3. EVENT DETAILS", content: `Event Date: ${formData.eventDate || '__________'}\nLocation: ${formData.eventLocation || '__________'}\nStart Time: ${formData.eventStartTime || '__________'}\nEnd Time: ${formData.eventEndTime || '__________'}` },
        { title: "4. PROVIDER RESPONSIBILITIES", content: "The Provider represents they are knowledgeable of all applicable laws governing the service of alcoholic beverages. The Provider shall not serve alcohol to any person under the legal drinking age and reserves the right to refuse service to intoxicated guests." },
        { title: "5. LOCATION AND PERMITS", content: "The Recipient shall be solely responsible for securing the event location and obtaining all required permits for the lawful service of alcohol at the event." },
        { title: "6. PAYMENT TERMS", content: `Total Service Fee: $${formData.totalServiceFee || '__________'}\nNon-refundable Retainer: $${formData.retainerAmount || '__________'} (due upon execution)\nAdditional Hours Rate: $${formData.hourlyRate || '__________'}/hour\nLate Payment Interest: ${formData.latePaymentRate || '__________'}% per annum` },
        { title: "7. CANCELLATION", content: `Cancellation by Recipient with less than ${formData.cancellationDays || '7'} days notice shall result in forfeiture of the retainer. Provider may cancel with written notice and refund of all payments received.` },
        { title: "8. INDEMNIFICATION", content: "The Recipient agrees to indemnify and hold harmless the Provider from any claims, damages, or liabilities arising from the event, except those caused by Provider's gross negligence." },
        { title: "9. LIMITATION OF LIABILITY", content: "Provider's liability shall not exceed the total fees paid under this Agreement." },
        { title: "10. GOVERNING LAW", content: `This Agreement shall be governed by the laws of ${formData.state ? getStateName(formData.country.split(':')[0], formData.state.split(':')[0]) : '__________'}.` }
      ];

      sections.forEach(s => {
        checkPage(30);
        doc.setFont("helvetica", "bold");
        doc.text(s.title, 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(s.content, 180).forEach((line: string) => { checkPage(); doc.text(line, 15, y); y += lh; });
        y += 3;
      });

      checkPage(50);
      doc.setFont("helvetica", "bold");
      doc.text("SIGNATURES", 15, y); y += lh * 2;
      doc.setFont("helvetica", "normal");
      doc.text("Client:", 15, y); y += lh;
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      doc.text("Signature: ____________________________", 20, y); y += lh;
      doc.text("Date: ____________________________", 20, y); y += lh * 2;
      doc.text("Bartender:", 15, y); y += lh;
      doc.text(`Name: ${formData.bartenderName || '__________'}`, 20, y); y += lh;
      doc.text("Signature: ____________________________", 20, y); y += lh;
      doc.text("Date: ____________________________", 20, y);

      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`bartending_agreement_${timestamp}.pdf`);

      const guidePDF = generateGuidePDF({ documentId: "bartending-agreement", documentTitle: "Bartending Services Agreement" });
      setTimeout(() => guidePDF.save(`bartending_agreement_guide_${timestamp}.pdf`), 500);

      toast.success("Bartending Agreement and Guide PDF generated!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Country</Label>
                <Select value={formData.country} onValueChange={(v) => handleInputChange('country', v)}>
                  <SelectTrigger><SelectValue placeholder="Select country..." /></SelectTrigger>
                  <SelectContent>{getAllCountries().map((c) => (<SelectItem key={c.id} value={`${c.id}:${c.name}`}>{c.name}</SelectItem>))}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>State/Province</Label>
                <Select value={formData.state} onValueChange={(v) => handleInputChange('state', v)} disabled={!formData.country}>
                  <SelectTrigger><SelectValue placeholder="Select state..." /></SelectTrigger>
                  <SelectContent>{getStatesForCountry(formData.country).map((s) => (<SelectItem key={s} value={s}>{s.split(':')[1]}</SelectItem>))}</SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Effective Date</Label><Input type="date" value={formData.effectiveDate} onChange={(e) => handleInputChange('effectiveDate', e.target.value)} /></div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Client (Recipient)</h3>
              <div><Label>Full Name</Label><Input placeholder="Client's full name" value={formData.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} /></div>
              <div><Label>Address</Label><Textarea placeholder="Client's address" value={formData.clientAddress} onChange={(e) => handleInputChange('clientAddress', e.target.value)} /></div>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Bartender (Provider)</h3>
              <div><Label>Full Name</Label><Input placeholder="Bartender's full name" value={formData.bartenderName} onChange={(e) => handleInputChange('bartenderName', e.target.value)} /></div>
              <div><Label>Address</Label><Textarea placeholder="Bartender's address" value={formData.bartenderAddress} onChange={(e) => handleInputChange('bartenderAddress', e.target.value)} /></div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div><Label>Event Date</Label><Input type="date" value={formData.eventDate} onChange={(e) => handleInputChange('eventDate', e.target.value)} /></div>
            <div><Label>Event Location</Label><Textarea placeholder="Full address of event venue" value={formData.eventLocation} onChange={(e) => handleInputChange('eventLocation', e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Start Time</Label><Input type="time" value={formData.eventStartTime} onChange={(e) => handleInputChange('eventStartTime', e.target.value)} /></div>
              <div><Label>End Time</Label><Input type="time" value={formData.eventEndTime} onChange={(e) => handleInputChange('eventEndTime', e.target.value)} /></div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Total Service Fee ($)</Label><Input type="number" placeholder="e.g., 500" value={formData.totalServiceFee} onChange={(e) => handleInputChange('totalServiceFee', e.target.value)} /></div>
              <div><Label>Retainer Amount ($)</Label><Input type="number" placeholder="e.g., 150" value={formData.retainerAmount} onChange={(e) => handleInputChange('retainerAmount', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Hourly Rate for Extra Hours ($)</Label><Input type="number" placeholder="e.g., 50" value={formData.hourlyRate} onChange={(e) => handleInputChange('hourlyRate', e.target.value)} /></div>
              <div><Label>Late Payment Interest Rate (%)</Label><Input type="number" placeholder="e.g., 5" value={formData.latePaymentRate} onChange={(e) => handleInputChange('latePaymentRate', e.target.value)} /></div>
            </div>
            <div><Label>Cancellation Notice Days</Label><Input type="number" placeholder="e.g., 7" value={formData.cancellationDays} onChange={(e) => handleInputChange('cancellationDays', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="Bartending Services Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  const getStepTitle = () => {
    const titles = ["", "Location & Date", "Parties", "Event Details", "Payment Terms", "Your Information"];
    return titles[currentStep] || "";
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />Bartending Agreement Ready</CardTitle>
          <CardDescription className="text-orange-100">Your agreement is ready to be generated</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="text-lg font-semibold mb-4">Agreement Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p><strong>Client:</strong> {formData.clientName}</p><p><strong>Bartender:</strong> {formData.bartenderName}</p><p><strong>Event Date:</strong> {formData.eventDate}</p></div>
              <div><p><strong>Service Fee:</strong> ${formData.totalServiceFee}</p><p><strong>Retainer:</strong> ${formData.retainerAmount}</p><p><strong>Location:</strong> {formData.eventLocation}</p></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}><ArrowLeft className="mr-2 h-4 w-4" /> Edit</Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-orange-500 hover:bg-orange-600">{isGeneratingPDF ? "Generating..." : "Generate PDF"}<FileText className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle>Bartending Services Agreement</CardTitle>
        <CardDescription className="text-orange-100">Step {currentStep} of 5: {getStepTitle()}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStep()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-orange-500 hover:bg-orange-600">{currentStep === 5 ? "Complete" : "Next"}{currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</Button>
      </CardFooter>
    </Card>
  );
};

export default BartendingAgreementForm;
