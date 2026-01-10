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
const getStateName = (countryId: string, stateId: string): string => { const c = getAllCountries().find(c => c.id.toString() === countryId); if (!c) return stateId; const s = getStatesByCountry(c.id).find(s => s.id.toString() === stateId); return s?.name || stateId; };

interface FormData {
  country: string; state: string; effectiveDate: string;
  clientName: string; clientAddress: string; clientPhone: string; clientEmail: string;
  djName: string; djAddress: string; djPhone: string; djEmail: string;
  eventDate: string; eventLocation: string; eventStartTime: string; eventEndTime: string; eventType: string;
  totalFee: string; depositAmount: string; depositDueDate: string; balanceDueDate: string;
  musicPreferences: string; doNotPlayList: string; announcements: string;
  equipmentIncluded: string; additionalServices: string;
  cancellationDays: string;
}

const DJServicesAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '',
    clientName: '', clientAddress: '', clientPhone: '', clientEmail: '',
    djName: '', djAddress: '', djPhone: '', djEmail: '',
    eventDate: '', eventLocation: '', eventStartTime: '', eventEndTime: '', eventType: '',
    totalFee: '', depositAmount: '', depositDueDate: '', balanceDueDate: '',
    musicPreferences: '', doNotPlayList: '', announcements: '',
    equipmentIncluded: '', additionalServices: '',
    cancellationDays: '14'
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'country') setFormData(prev => ({ ...prev, state: '' }));
  };

  const getStatesForCountry = (country: string): string[] => {
    if (!country) return [];
    return getStatesByCountry(parseInt(country.split(':')[0])).map(s => `${s.id}:${s.name}`);
  };

  const canAdvance = (): boolean => {
    switch (currentStep) {
      case 1: return !!(formData.country && formData.state && formData.effectiveDate);
      case 2: return !!(formData.clientName && formData.clientAddress && formData.djName && formData.djAddress);
      case 3: return !!(formData.eventDate && formData.eventLocation && formData.eventStartTime && formData.eventEndTime);
      case 4: return !!(formData.totalFee && formData.depositAmount);
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
      doc.text("DJ SERVICES AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      const intro = `This DJ Services Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold"); doc.text("Client:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.clientPhone || '__________'} | Email: ${formData.clientEmail || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("DJ/Provider:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.djName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.djAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.djPhone || '__________'} | Email: ${formData.djEmail || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. EVENT DETAILS", content: `Event Type: ${formData.eventType || 'Private Event'}\nDate: ${formData.eventDate || '__________'}\nLocation: ${formData.eventLocation || '__________'}\nStart Time: ${formData.eventStartTime || '__________'}\nEnd Time: ${formData.eventEndTime || '__________'}` },
        { title: "2. SERVICES PROVIDED", content: "The DJ agrees to provide professional disc jockey services including: Music selection and mixing, Sound system setup and operation, MC/announcement services as requested, Professional lighting (if included), Setup and breakdown of equipment." },
        { title: "3. EQUIPMENT", content: `Equipment included: ${formData.equipmentIncluded || 'Professional DJ equipment, speakers, microphone, and lighting as standard package.'}` },
        { title: "4. MUSIC PREFERENCES", content: `Preferred genres/songs: ${formData.musicPreferences || 'To be discussed'}\nDo Not Play List: ${formData.doNotPlayList || 'None specified'}\nSpecial Announcements: ${formData.announcements || 'None specified'}` },
        { title: "5. PAYMENT TERMS", content: `Total Fee: $${formData.totalFee || '__________'}\nDeposit Required: $${formData.depositAmount || '__________'} (due by ${formData.depositDueDate || 'upon signing'})\nBalance Due: By ${formData.balanceDueDate || 'event date'}\nPayment methods accepted: Cash, Check, or Electronic Transfer` },
        { title: "6. CANCELLATION POLICY", content: `Client cancellation with less than ${formData.cancellationDays || '14'} days notice: Deposit is non-refundable.\nDJ cancellation: Full refund of all payments received, DJ will make reasonable efforts to find replacement.` },
        { title: "7. LIABILITY", content: "The DJ shall not be held liable for any injury to guests or damage to property except as directly caused by DJ's gross negligence. Client is responsible for providing a safe environment for equipment setup." },
        { title: "8. FORCE MAJEURE", content: "Neither party shall be liable for failure to perform due to circumstances beyond their control including natural disasters, government actions, or venue closures." },
        { title: "9. GOVERNING LAW", content: `This Agreement shall be governed by the laws of ${formData.state ? getStateName(formData.country.split(':')[0], formData.state.split(':')[0]) : '__________'}.` }
      ];

      sections.forEach(s => {
        checkPage(30);
        doc.setFont("helvetica", "bold"); doc.text(s.title, 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(s.content, 180).forEach((line: string) => { checkPage(); doc.text(line, 15, y); y += lh; });
        y += 3;
      });

      checkPage(50);
      doc.setFont("helvetica", "bold"); doc.text("SIGNATURES", 15, y); y += lh * 2;
      doc.setFont("helvetica", "normal");
      doc.text(`Client: ${formData.clientName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y); y += lh * 2;
      doc.text(`DJ: ${formData.djName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y);

      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`dj_services_agreement_${timestamp}.pdf`);
      const guidePDF = generateGuidePDF({ documentId: "dj-services-agreement", documentTitle: "DJ Services Agreement" });
      setTimeout(() => guidePDF.save(`dj_services_guide_${timestamp}.pdf`), 500);
      toast.success("DJ Services Agreement and Guide PDF generated!");
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
            <div><Label>Effective Date</Label><Input type="date" value={formData.effectiveDate} onChange={(e) => handleInputChange('effectiveDate', e.target.value)} /></div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Full Name</Label><Input value={formData.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} /></div>
                <div><Label>Phone</Label><Input value={formData.clientPhone} onChange={(e) => handleInputChange('clientPhone', e.target.value)} /></div>
              </div>
              <div><Label>Address</Label><Textarea value={formData.clientAddress} onChange={(e) => handleInputChange('clientAddress', e.target.value)} /></div>
              <div><Label>Email</Label><Input type="email" value={formData.clientEmail} onChange={(e) => handleInputChange('clientEmail', e.target.value)} /></div>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">DJ Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Name/Business Name</Label><Input value={formData.djName} onChange={(e) => handleInputChange('djName', e.target.value)} /></div>
                <div><Label>Phone</Label><Input value={formData.djPhone} onChange={(e) => handleInputChange('djPhone', e.target.value)} /></div>
              </div>
              <div><Label>Address</Label><Textarea value={formData.djAddress} onChange={(e) => handleInputChange('djAddress', e.target.value)} /></div>
              <div><Label>Email</Label><Input type="email" value={formData.djEmail} onChange={(e) => handleInputChange('djEmail', e.target.value)} /></div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div><Label>Event Type</Label><Select value={formData.eventType} onValueChange={(v) => handleInputChange('eventType', v)}><SelectTrigger><SelectValue placeholder="Select event type..." /></SelectTrigger><SelectContent><SelectItem value="Wedding">Wedding</SelectItem><SelectItem value="Birthday Party">Birthday Party</SelectItem><SelectItem value="Corporate Event">Corporate Event</SelectItem><SelectItem value="Anniversary">Anniversary</SelectItem><SelectItem value="Graduation">Graduation</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></div>
            <div><Label>Event Date</Label><Input type="date" value={formData.eventDate} onChange={(e) => handleInputChange('eventDate', e.target.value)} /></div>
            <div><Label>Event Location</Label><Textarea placeholder="Full venue address" value={formData.eventLocation} onChange={(e) => handleInputChange('eventLocation', e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Start Time</Label><Input type="time" value={formData.eventStartTime} onChange={(e) => handleInputChange('eventStartTime', e.target.value)} /></div>
              <div><Label>End Time</Label><Input type="time" value={formData.eventEndTime} onChange={(e) => handleInputChange('eventEndTime', e.target.value)} /></div>
            </div>
            <div><Label>Music Preferences</Label><Textarea placeholder="Preferred genres, specific songs, etc." value={formData.musicPreferences} onChange={(e) => handleInputChange('musicPreferences', e.target.value)} /></div>
            <div><Label>Do Not Play List</Label><Textarea placeholder="Songs or genres to avoid" value={formData.doNotPlayList} onChange={(e) => handleInputChange('doNotPlayList', e.target.value)} /></div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Total Fee ($)</Label><Input type="number" value={formData.totalFee} onChange={(e) => handleInputChange('totalFee', e.target.value)} /></div>
              <div><Label>Deposit Amount ($)</Label><Input type="number" value={formData.depositAmount} onChange={(e) => handleInputChange('depositAmount', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Deposit Due Date</Label><Input type="date" value={formData.depositDueDate} onChange={(e) => handleInputChange('depositDueDate', e.target.value)} /></div>
              <div><Label>Balance Due Date</Label><Input type="date" value={formData.balanceDueDate} onChange={(e) => handleInputChange('balanceDueDate', e.target.value)} /></div>
            </div>
            <div><Label>Equipment Included</Label><Textarea placeholder="List equipment provided" value={formData.equipmentIncluded} onChange={(e) => handleInputChange('equipmentIncluded', e.target.value)} /></div>
            <div><Label>Cancellation Notice (Days)</Label><Input type="number" value={formData.cancellationDays} onChange={(e) => handleInputChange('cancellationDays', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="DJ Services Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />DJ Services Agreement Ready</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p><strong>Client:</strong> {formData.clientName}</p><p><strong>DJ:</strong> {formData.djName}</p><p><strong>Event:</strong> {formData.eventType}</p></div>
              <div><p><strong>Date:</strong> {formData.eventDate}</p><p><strong>Fee:</strong> ${formData.totalFee}</p><p><strong>Deposit:</strong> ${formData.depositAmount}</p></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}><ArrowLeft className="mr-2 h-4 w-4" />Edit</Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-orange-500 hover:bg-orange-600">{isGeneratingPDF ? "Generating..." : "Generate PDF"}<FileText className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>
    );
  }

  const stepTitles = ["", "Location", "Parties", "Event Details", "Payment", "Your Info"];
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle>DJ Services Agreement</CardTitle>
        <CardDescription className="text-orange-100">Step {currentStep} of 5: {stepTitles[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStep()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-orange-500 hover:bg-orange-600">{currentStep === 5 ? "Complete" : "Next"}{currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</Button>
      </CardFooter>
    </Card>
  );
};

export default DJServicesAgreementForm;
