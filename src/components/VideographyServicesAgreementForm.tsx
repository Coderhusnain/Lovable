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
  videographerName: string; videographerCompany: string; videographerAddress: string; videographerPhone: string; videographerEmail: string;
  eventDate: string; eventLocation: string; eventType: string; eventDescription: string;
  startTime: string; endTime: string;
  deliverables: string[];
  footageDeliveryFormat: string; editedVideoLength: string; deliveryDeadline: string;
  totalFee: string; depositAmount: string; depositDueDate: string;
  travelFees: string; additionalServices: string;
  rawFootageIncluded: boolean; highlightReel: boolean;
  additionalNotes: string;
}

const VideographyServicesAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '',
    clientName: '', clientAddress: '', clientPhone: '', clientEmail: '',
    videographerName: '', videographerCompany: '', videographerAddress: '', videographerPhone: '', videographerEmail: '',
    eventDate: '', eventLocation: '', eventType: '', eventDescription: '',
    startTime: '', endTime: '',
    deliverables: [],
    footageDeliveryFormat: '', editedVideoLength: '', deliveryDeadline: '',
    totalFee: '', depositAmount: '', depositDueDate: '',
    travelFees: '', additionalServices: '',
    rawFootageIncluded: false, highlightReel: false,
    additionalNotes: ''
  });

  const deliverableOptions = [
    "Full event video", "Highlight reel (3-5 min)", "Social media clips", "Documentary style edit",
    "Raw footage", "Drone/aerial footage", "Second camera coverage", "Same-day edit",
    "Slow motion footage", "Audio recording", "Music licensing", "Photo stills from footage"
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'country') setFormData(prev => ({ ...prev, state: '' }));
  };

  const handleDeliverableToggle = (item: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.includes(item)
        ? prev.deliverables.filter(d => d !== item)
        : [...prev.deliverables, item]
    }));
  };

  const getStatesForCountry = (country: string): string[] => {
    if (!country) return [];
    return getStatesByCountry(parseInt(country.split(':')[0])).map(s => `${s.id}:${s.name}`);
  };

  const canAdvance = (): boolean => {
    switch (currentStep) {
      case 1: return !!(formData.country && formData.state && formData.effectiveDate);
      case 2: return !!(formData.clientName && formData.videographerName);
      case 3: return !!(formData.eventDate && formData.eventLocation);
      case 4: return !!(formData.totalFee && formData.deliverables.length > 0);
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
      doc.text("VIDEOGRAPHY SERVICES AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      const intro = `This Videography Services Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold"); doc.text("Client:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.clientPhone || '__________'} | Email: ${formData.clientEmail || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("Videographer:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.videographerName || '__________'}`, 20, y); y += lh;
      if (formData.videographerCompany) { doc.text(`Company: ${formData.videographerCompany}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.videographerAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.videographerPhone || '__________'} | Email: ${formData.videographerEmail || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. EVENT DETAILS", content: `Event Date: ${formData.eventDate || '__________'}\nEvent Type: ${formData.eventType || '__________'}\nLocation: ${formData.eventLocation || '__________'}\nStart Time: ${formData.startTime || '__________'} | End Time: ${formData.endTime || '__________'}\nDescription: ${formData.eventDescription || 'As specified'}` },
        { title: "2. DELIVERABLES", content: `Deliverables:\n${formData.deliverables.map(d => `• ${d}`).join('\n') || '• As agreed upon'}\n\nFormat: ${formData.footageDeliveryFormat || 'Digital download/USB drive'}\nEdited Video Length: ${formData.editedVideoLength || 'As appropriate'}\nDelivery Deadline: ${formData.deliveryDeadline || 'Within 4-6 weeks of event'}` },
        { title: "3. PAYMENT TERMS", content: `Total Fee: $${formData.totalFee || '__________'}\nDeposit: $${formData.depositAmount || '__________'} (due by ${formData.depositDueDate || 'signing'})\nRemaining Balance: Due upon delivery of final product\n${formData.travelFees ? `Travel Fees: $${formData.travelFees}` : ''}` },
        { title: "4. VIDEOGRAPHER RESPONSIBILITIES", content: "The Videographer agrees to: Arrive at the specified time and location, Provide professional-grade equipment, Capture footage of the event as discussed, Edit and deliver footage according to specifications, Maintain backup copies of footage until delivery." },
        { title: "5. CLIENT RESPONSIBILITIES", content: "The Client agrees to: Provide accurate event details and timeline, Ensure Videographer has access to key moments/locations, Designate a contact person on event day, Make timely payments as agreed." },
        { title: "6. COPYRIGHT & USAGE", content: "Videographer retains copyright to all footage. Client receives license to use delivered content for personal, non-commercial purposes. Videographer may use footage for portfolio/marketing unless otherwise agreed." },
        { title: "7. CANCELLATION", content: "Cancellation 30+ days before event: Full refund minus deposit. Cancellation 14-30 days: 50% refund. Less than 14 days: No refund. In case of emergency cancellation by Videographer, full refund will be provided." },
        { title: "8. LIMITATION OF LIABILITY", content: "In the unlikely event of equipment failure or footage loss, Videographer's liability is limited to refund of fees paid. Videographer is not liable for missed moments due to circumstances beyond their control." },
        { title: "9. GOVERNING LAW", content: `This Agreement shall be governed by the laws of ${formData.state ? getStateName(formData.country.split(':')[0], formData.state.split(':')[0]) : '__________'}.` }
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
        doc.setFont("helvetica", "bold"); doc.text("10. ADDITIONAL TERMS", 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(formData.additionalNotes, 180).forEach((line: string) => { checkPage(); doc.text(line, 15, y); y += lh; });
        y += 3;
      }

      checkPage(50);
      doc.setFont("helvetica", "bold"); doc.text("SIGNATURES", 15, y); y += lh * 2;
      doc.setFont("helvetica", "normal");
      doc.text(`Client: ${formData.clientName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y); y += lh * 2;
      doc.text(`Videographer: ${formData.videographerName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y);

      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`videography_agreement_${timestamp}.pdf`);
      const guidePDF = generateGuidePDF({ documentId: "videography-agreement", documentTitle: "Videography Services Agreement" });
      setTimeout(() => guidePDF.save(`videography_guide_${timestamp}.pdf`), 500);
      toast.success("Videography Agreement and Guide PDF generated!");
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
              <h3 className="font-semibold">Videographer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Videographer Name *</Label><Input value={formData.videographerName} onChange={(e) => handleInputChange('videographerName', e.target.value)} /></div>
                <div><Label>Company/Business Name</Label><Input value={formData.videographerCompany} onChange={(e) => handleInputChange('videographerCompany', e.target.value)} /></div>
              </div>
              <div><Label>Address</Label><Textarea value={formData.videographerAddress} onChange={(e) => handleInputChange('videographerAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.videographerPhone} onChange={(e) => handleInputChange('videographerPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.videographerEmail} onChange={(e) => handleInputChange('videographerEmail', e.target.value)} /></div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Event Date *</Label><Input type="date" value={formData.eventDate} onChange={(e) => handleInputChange('eventDate', e.target.value)} /></div>
              <div><Label>Event Type</Label><Select value={formData.eventType} onValueChange={(v) => handleInputChange('eventType', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Wedding">Wedding</SelectItem><SelectItem value="Corporate Event">Corporate Event</SelectItem><SelectItem value="Music Video">Music Video</SelectItem><SelectItem value="Documentary">Documentary</SelectItem><SelectItem value="Birthday/Party">Birthday/Party</SelectItem><SelectItem value="Conference">Conference</SelectItem><SelectItem value="Commercial">Commercial</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label>Event Location *</Label><Textarea placeholder="Full venue address" value={formData.eventLocation} onChange={(e) => handleInputChange('eventLocation', e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Start Time</Label><Input type="time" value={formData.startTime} onChange={(e) => handleInputChange('startTime', e.target.value)} /></div>
              <div><Label>End Time</Label><Input type="time" value={formData.endTime} onChange={(e) => handleInputChange('endTime', e.target.value)} /></div>
            </div>
            <div><Label>Event Description</Label><Textarea placeholder="Key moments to capture, special requirements..." value={formData.eventDescription} onChange={(e) => handleInputChange('eventDescription', e.target.value)} /></div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Deliverables *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {deliverableOptions.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox id={item} checked={formData.deliverables.includes(item)} onCheckedChange={() => handleDeliverableToggle(item)} />
                    <Label htmlFor={item} className="text-sm cursor-pointer">{item}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Delivery Format</Label><Select value={formData.footageDeliveryFormat} onValueChange={(v) => handleInputChange('footageDeliveryFormat', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Digital Download">Digital Download</SelectItem><SelectItem value="USB Drive">USB Drive</SelectItem><SelectItem value="Cloud Storage">Cloud Storage</SelectItem><SelectItem value="DVD/Blu-ray">DVD/Blu-ray</SelectItem></SelectContent></Select></div>
              <div><Label>Edited Video Length</Label><Input placeholder="e.g., 15-20 minutes" value={formData.editedVideoLength} onChange={(e) => handleInputChange('editedVideoLength', e.target.value)} /></div>
            </div>
            <div><Label>Delivery Deadline</Label><Input type="date" value={formData.deliveryDeadline} onChange={(e) => handleInputChange('deliveryDeadline', e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Total Fee ($) *</Label><Input type="number" value={formData.totalFee} onChange={(e) => handleInputChange('totalFee', e.target.value)} /></div>
              <div><Label>Deposit Amount ($)</Label><Input type="number" value={formData.depositAmount} onChange={(e) => handleInputChange('depositAmount', e.target.value)} /></div>
            </div>
            <div><Label>Additional Notes</Label><Textarea value={formData.additionalNotes} onChange={(e) => handleInputChange('additionalNotes', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="Videography Services Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />Videography Agreement Ready</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p><strong>Client:</strong> {formData.clientName}</p><p><strong>Videographer:</strong> {formData.videographerName}</p><p><strong>Event Date:</strong> {formData.eventDate}</p></div>
              <div><p><strong>Event Type:</strong> {formData.eventType}</p><p><strong>Deliverables:</strong> {formData.deliverables.length} items</p><p><strong>Fee:</strong> ${formData.totalFee}</p></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}><ArrowLeft className="mr-2 h-4 w-4" />Edit</Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-red-500 hover:bg-red-600">{isGeneratingPDF ? "Generating..." : "Generate PDF"}<FileText className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>
    );
  }

  const stepTitles = ["", "Location", "Parties", "Event Details", "Deliverables & Payment", "Your Info"];
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
        <CardTitle>Videography Services Agreement</CardTitle>
        <CardDescription className="text-red-100">Step {currentStep} of 5: {stepTitles[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStep()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-red-500 hover:bg-red-600">{currentStep === 5 ? "Complete" : "Next"}{currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</Button>
      </CardFooter>
    </Card>
  );
};

export default VideographyServicesAgreementForm;
