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
  providerName: string; providerCompany: string; providerAddress: string; providerPhone: string; providerEmail: string;
  eventDate: string; eventLocation: string; eventType: string; guestCount: string;
  serviceType: string; cuisineType: string; servicesIncluded: string[];
  totalCost: string; depositAmount: string; depositDueDate: string; finalPaymentDue: string;
  menuDescription: string; dietaryAccommodations: string;
  setupTime: string; serviceStartTime: string; serviceEndTime: string;
  additionalNotes: string;
}

const FoodServiceAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '',
    clientName: '', clientAddress: '', clientPhone: '', clientEmail: '',
    providerName: '', providerCompany: '', providerAddress: '', providerPhone: '', providerEmail: '',
    eventDate: '', eventLocation: '', eventType: '', guestCount: '',
    serviceType: '', cuisineType: '', servicesIncluded: [],
    totalCost: '', depositAmount: '', depositDueDate: '', finalPaymentDue: '',
    menuDescription: '', dietaryAccommodations: '',
    setupTime: '', serviceStartTime: '', serviceEndTime: '',
    additionalNotes: ''
  });

  const serviceOptions = [
    "Food preparation", "Food service/waitstaff", "Beverage service", "Bar service",
    "Table setup", "Tableware/dishes provided", "Linens provided", "Cleanup services",
    "Chef on-site", "Menu planning consultation", "Food tasting session", "Cake/dessert service"
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'country') setFormData(prev => ({ ...prev, state: '' }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      servicesIncluded: prev.servicesIncluded.includes(service)
        ? prev.servicesIncluded.filter(s => s !== service)
        : [...prev.servicesIncluded, service]
    }));
  };

  const getStatesForCountry = (country: string): string[] => {
    if (!country) return [];
    return getStatesByCountry(parseInt(country.split(':')[0])).map(s => `${s.id}:${s.name}`);
  };

  const canAdvance = (): boolean => {
    switch (currentStep) {
      case 1: return !!(formData.country && formData.state && formData.effectiveDate);
      case 2: return !!(formData.clientName && formData.providerName);
      case 3: return !!(formData.eventDate && formData.eventLocation && formData.guestCount);
      case 4: return !!(formData.totalCost && formData.servicesIncluded.length > 0);
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
      doc.text("FOOD SERVICE AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      const intro = `This Food Service Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold"); doc.text("Client:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.clientPhone || '__________'} | Email: ${formData.clientEmail || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("Food Service Provider:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.providerName || '__________'}`, 20, y); y += lh;
      if (formData.providerCompany) { doc.text(`Company: ${formData.providerCompany}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.providerAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.providerPhone || '__________'} | Email: ${formData.providerEmail || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. EVENT DETAILS", content: `Event Date: ${formData.eventDate || '__________'}\nEvent Type: ${formData.eventType || '__________'}\nLocation: ${formData.eventLocation || '__________'}\nGuest Count: ${formData.guestCount || '__________'}` },
        { title: "2. SERVICE TIMES", content: `Setup Time: ${formData.setupTime || 'As agreed'}\nService Start: ${formData.serviceStartTime || '__________'}\nService End: ${formData.serviceEndTime || '__________'}` },
        { title: "3. SERVICES PROVIDED", content: `Service Type: ${formData.serviceType || 'Full Catering'}\nCuisine: ${formData.cuisineType || 'As specified'}\n\nServices included:\n${formData.servicesIncluded.map(s => `• ${s}`).join('\n') || '• As agreed upon'}` },
        { title: "4. MENU", content: formData.menuDescription || 'Menu to be finalized with Client prior to event.' },
        { title: "5. DIETARY ACCOMMODATIONS", content: formData.dietaryAccommodations || 'Provider will accommodate reasonable dietary restrictions with advance notice.' },
        { title: "6. PAYMENT TERMS", content: `Total Cost: $${formData.totalCost || '__________'}\nDeposit: $${formData.depositAmount || '__________'} due by ${formData.depositDueDate || 'signing'}\nFinal Payment: Due ${formData.finalPaymentDue || '7 days before event'}` },
        { title: "7. PROVIDER RESPONSIBILITIES", content: "The Provider agrees to: Prepare and serve food according to agreed menu, Provide adequate staff for service, Maintain food safety and hygiene standards, Arrive on time for setup and service, Clean up food service areas after event." },
        { title: "8. CLIENT RESPONSIBILITIES", content: "The Client agrees to: Provide accurate guest count and dietary requirements, Ensure adequate space and facilities for food service, Make timely payments as agreed, Provide access to venue for setup." },
        { title: "9. CANCELLATION", content: "Cancellation 14+ days before event: Full refund minus deposit. Cancellation 7-14 days: 50% refund. Cancellation less than 7 days: No refund." },
        { title: "10. LIABILITY", content: "Provider carries appropriate food service liability insurance. Client is responsible for ensuring guest safety at venue." },
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
      doc.text(`Provider: ${formData.providerName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y);

      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`food_service_agreement_${timestamp}.pdf`);
      const guidePDF = generateGuidePDF({ documentId: "food-service-agreement", documentTitle: "Food Service Agreement" });
      setTimeout(() => guidePDF.save(`food_service_guide_${timestamp}.pdf`), 500);
      toast.success("Food Service Agreement and Guide PDF generated!");
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
              <h3 className="font-semibold">Food Service Provider Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Provider Name *</Label><Input value={formData.providerName} onChange={(e) => handleInputChange('providerName', e.target.value)} /></div>
                <div><Label>Company/Business Name</Label><Input value={formData.providerCompany} onChange={(e) => handleInputChange('providerCompany', e.target.value)} /></div>
              </div>
              <div><Label>Address</Label><Textarea value={formData.providerAddress} onChange={(e) => handleInputChange('providerAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.providerPhone} onChange={(e) => handleInputChange('providerPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.providerEmail} onChange={(e) => handleInputChange('providerEmail', e.target.value)} /></div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Event Date *</Label><Input type="date" value={formData.eventDate} onChange={(e) => handleInputChange('eventDate', e.target.value)} /></div>
              <div><Label>Event Type</Label><Select value={formData.eventType} onValueChange={(v) => handleInputChange('eventType', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Wedding">Wedding</SelectItem><SelectItem value="Corporate Event">Corporate Event</SelectItem><SelectItem value="Birthday Party">Birthday Party</SelectItem><SelectItem value="Private Dinner">Private Dinner</SelectItem><SelectItem value="Graduation">Graduation</SelectItem><SelectItem value="Holiday Party">Holiday Party</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label>Event Location *</Label><Textarea placeholder="Full venue address" value={formData.eventLocation} onChange={(e) => handleInputChange('eventLocation', e.target.value)} /></div>
            <div><Label>Estimated Guest Count *</Label><Input type="number" value={formData.guestCount} onChange={(e) => handleInputChange('guestCount', e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><Label>Setup Time</Label><Input type="time" value={formData.setupTime} onChange={(e) => handleInputChange('setupTime', e.target.value)} /></div>
              <div><Label>Service Start Time</Label><Input type="time" value={formData.serviceStartTime} onChange={(e) => handleInputChange('serviceStartTime', e.target.value)} /></div>
              <div><Label>Service End Time</Label><Input type="time" value={formData.serviceEndTime} onChange={(e) => handleInputChange('serviceEndTime', e.target.value)} /></div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Service Type</Label><Select value={formData.serviceType} onValueChange={(v) => handleInputChange('serviceType', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Full Service Catering">Full Service Catering</SelectItem><SelectItem value="Drop-off Catering">Drop-off Catering</SelectItem><SelectItem value="Buffet Service">Buffet Service</SelectItem><SelectItem value="Plated Service">Plated Service</SelectItem><SelectItem value="Food Truck">Food Truck</SelectItem></SelectContent></Select></div>
              <div><Label>Cuisine Type</Label><Input placeholder="e.g., Italian, BBQ, Mexican" value={formData.cuisineType} onChange={(e) => handleInputChange('cuisineType', e.target.value)} /></div>
            </div>
            <div className="space-y-2">
              <Label>Services Included *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {serviceOptions.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox id={service} checked={formData.servicesIncluded.includes(service)} onCheckedChange={() => handleServiceToggle(service)} />
                    <Label htmlFor={service} className="text-sm cursor-pointer">{service}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div><Label>Menu Description</Label><Textarea placeholder="Describe the menu items..." value={formData.menuDescription} onChange={(e) => handleInputChange('menuDescription', e.target.value)} rows={4} /></div>
            <div><Label>Dietary Accommodations</Label><Textarea placeholder="Any dietary restrictions to accommodate" value={formData.dietaryAccommodations} onChange={(e) => handleInputChange('dietaryAccommodations', e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Total Cost ($) *</Label><Input type="number" value={formData.totalCost} onChange={(e) => handleInputChange('totalCost', e.target.value)} /></div>
              <div><Label>Deposit Amount ($)</Label><Input type="number" value={formData.depositAmount} onChange={(e) => handleInputChange('depositAmount', e.target.value)} /></div>
            </div>
            <div><Label>Additional Notes</Label><Textarea value={formData.additionalNotes} onChange={(e) => handleInputChange('additionalNotes', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="Food Service Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />Food Service Agreement Ready</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p><strong>Client:</strong> {formData.clientName}</p><p><strong>Provider:</strong> {formData.providerName}</p><p><strong>Event Date:</strong> {formData.eventDate}</p></div>
              <div><p><strong>Service Type:</strong> {formData.serviceType}</p><p><strong>Guests:</strong> {formData.guestCount}</p><p><strong>Total:</strong> ${formData.totalCost}</p></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}><ArrowLeft className="mr-2 h-4 w-4" />Edit</Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-amber-500 hover:bg-amber-600">{isGeneratingPDF ? "Generating..." : "Generate PDF"}<FileText className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>
    );
  }

  const stepTitles = ["", "Location", "Parties", "Event Details", "Services & Payment", "Your Info"];
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-t-lg">
        <CardTitle>Food Service Agreement</CardTitle>
        <CardDescription className="text-amber-100">Step {currentStep} of 5: {stepTitles[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStep()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-amber-500 hover:bg-amber-600">{currentStep === 5 ? "Complete" : "Next"}{currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</Button>
      </CardFooter>
    </Card>
  );
};

export default FoodServiceAgreementForm;
