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
  pickupDate: string; pickupTime: string; pickupLocation: string;
  dropoffLocation: string;
  eventDate: string; eventType: string;
  vehicleType: string; vehicleCapacity: string;
  hoursRequired: string;
  totalCost: string; depositAmount: string; depositDueDate: string;
  gratuityIncluded: boolean; overtimeRate: string;
  servicesIncluded: string[];
  additionalNotes: string;
}

const LimousineServiceAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '',
    clientName: '', clientAddress: '', clientPhone: '', clientEmail: '',
    providerName: '', providerCompany: '', providerAddress: '', providerPhone: '', providerEmail: '',
    pickupDate: '', pickupTime: '', pickupLocation: '',
    dropoffLocation: '',
    eventDate: '', eventType: '',
    vehicleType: '', vehicleCapacity: '',
    hoursRequired: '',
    totalCost: '', depositAmount: '', depositDueDate: '',
    gratuityIncluded: false, overtimeRate: '',
    servicesIncluded: [],
    additionalNotes: ''
  });

  const serviceOptions = [
    "Professional chauffeur", "Red carpet service", "Champagne/beverages",
    "Ice and glasses", "WiFi in vehicle", "TV/entertainment system",
    "Privacy partition", "Multiple stops allowed", "Airport meet and greet",
    "Door-to-door service", "Luggage assistance", "Wait time included"
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
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
      case 3: return !!(formData.pickupDate && formData.pickupLocation && formData.vehicleType);
      case 4: return !!(formData.totalCost);
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
      doc.text("LIMOUSINE SERVICE AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      const intro = `This Limousine Service Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold"); doc.text("Client:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.clientPhone || '__________'} | Email: ${formData.clientEmail || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("Limousine Service Provider:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.providerName || '__________'}`, 20, y); y += lh;
      if (formData.providerCompany) { doc.text(`Company: ${formData.providerCompany}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.providerAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.providerPhone || '__________'} | Email: ${formData.providerEmail || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. SERVICE DETAILS", content: `Service Date: ${formData.pickupDate || '__________'}\nPickup Time: ${formData.pickupTime || '__________'}\nEvent Type: ${formData.eventType || '__________'}\nHours Required: ${formData.hoursRequired || '__________'}` },
        { title: "2. PICKUP AND DROPOFF", content: `Pickup Location: ${formData.pickupLocation || '__________'}\nDropoff Location: ${formData.dropoffLocation || 'Same as pickup'}` },
        { title: "3. VEHICLE", content: `Vehicle Type: ${formData.vehicleType || '__________'}\nPassenger Capacity: ${formData.vehicleCapacity || '__________'}` },
        { title: "4. SERVICES INCLUDED", content: formData.servicesIncluded.length > 0 ? formData.servicesIncluded.map(s => `• ${s}`).join('\n') : '• Standard limousine service' },
        { title: "5. PAYMENT TERMS", content: `Total Cost: $${formData.totalCost || '__________'}\nDeposit: $${formData.depositAmount || '__________'} due by ${formData.depositDueDate || 'upon booking'}\nGratuity: ${formData.gratuityIncluded ? 'Included' : 'Not included (customary 18-20%)'}\n${formData.overtimeRate ? `Overtime Rate: $${formData.overtimeRate}/hour` : ''}` },
        { title: "6. PROVIDER RESPONSIBILITIES", content: "Provider agrees to: Provide a clean, well-maintained vehicle, Provide a professional, licensed chauffeur, Arrive at pickup location on time, Maintain appropriate insurance coverage, Ensure passenger safety and comfort." },
        { title: "7. CLIENT RESPONSIBILITIES", content: "Client agrees to: Be ready at the scheduled pickup time, Not allow illegal substances in the vehicle, Not exceed vehicle passenger capacity, Report any damage or issues immediately, Pay for any damage caused by Client or guests." },
        { title: "8. CANCELLATION POLICY", content: "Cancellation 72+ hours before: Full refund minus deposit. Cancellation 24-72 hours: 50% refund. Less than 24 hours: No refund." },
        { title: "9. LIABILITY", content: "Provider carries appropriate liability insurance. Provider is not responsible for delays due to traffic, weather, or circumstances beyond control. Client assumes responsibility for behavior of all passengers." },
        { title: "10. GOVERNING LAW", content: `This Agreement shall be governed by the laws of ${formData.state ? getStateName(formData.country.split(':')[0], formData.state.split(':')[0]) : '__________'}.` }
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
        doc.setFont("helvetica", "bold"); doc.text("11. ADDITIONAL TERMS", 15, y); y += lh;
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
      doc.save(`limousine_service_agreement_${timestamp}.pdf`);
      const guidePDF = generateGuidePDF({ documentId: "limousine-agreement", documentTitle: "Limousine Service Agreement" });
      setTimeout(() => guidePDF.save(`limousine_service_guide_${timestamp}.pdf`), 500);
      toast.success("Limousine Service Agreement and Guide PDF generated!");
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
              <h3 className="font-semibold">Limousine Service Provider</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Provider/Driver Name *</Label><Input value={formData.providerName} onChange={(e) => handleInputChange('providerName', e.target.value)} /></div>
                <div><Label>Company Name</Label><Input value={formData.providerCompany} onChange={(e) => handleInputChange('providerCompany', e.target.value)} /></div>
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
              <div><Label>Service Date *</Label><Input type="date" value={formData.pickupDate} onChange={(e) => handleInputChange('pickupDate', e.target.value)} /></div>
              <div><Label>Pickup Time</Label><Input type="time" value={formData.pickupTime} onChange={(e) => handleInputChange('pickupTime', e.target.value)} /></div>
            </div>
            <div><Label>Pickup Location *</Label><Textarea placeholder="Full address" value={formData.pickupLocation} onChange={(e) => handleInputChange('pickupLocation', e.target.value)} /></div>
            <div><Label>Dropoff Location</Label><Textarea placeholder="Full address (leave blank if same as pickup)" value={formData.dropoffLocation} onChange={(e) => handleInputChange('dropoffLocation', e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Event Type</Label><Select value={formData.eventType} onValueChange={(v) => handleInputChange('eventType', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Wedding">Wedding</SelectItem><SelectItem value="Prom">Prom</SelectItem><SelectItem value="Bachelor/Bachelorette">Bachelor/Bachelorette</SelectItem><SelectItem value="Airport Transfer">Airport Transfer</SelectItem><SelectItem value="Corporate Event">Corporate Event</SelectItem><SelectItem value="Night Out">Night Out</SelectItem><SelectItem value="Anniversary">Anniversary</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></div>
              <div><Label>Hours Required</Label><Input type="number" value={formData.hoursRequired} onChange={(e) => handleInputChange('hoursRequired', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Vehicle Type *</Label><Select value={formData.vehicleType} onValueChange={(v) => handleInputChange('vehicleType', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Sedan">Sedan</SelectItem><SelectItem value="SUV">SUV</SelectItem><SelectItem value="Stretch Limousine">Stretch Limousine</SelectItem><SelectItem value="SUV Limousine">SUV Limousine</SelectItem><SelectItem value="Party Bus">Party Bus</SelectItem><SelectItem value="Luxury Van">Luxury Van</SelectItem></SelectContent></Select></div>
              <div><Label>Passenger Capacity</Label><Input type="number" value={formData.vehicleCapacity} onChange={(e) => handleInputChange('vehicleCapacity', e.target.value)} /></div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Services Included</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {serviceOptions.map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox id={service} checked={formData.servicesIncluded.includes(service)} onCheckedChange={() => handleServiceToggle(service)} />
                    <Label htmlFor={service} className="text-sm cursor-pointer">{service}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Total Cost ($) *</Label><Input type="number" value={formData.totalCost} onChange={(e) => handleInputChange('totalCost', e.target.value)} /></div>
              <div><Label>Deposit Amount ($)</Label><Input type="number" value={formData.depositAmount} onChange={(e) => handleInputChange('depositAmount', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Deposit Due Date</Label><Input type="date" value={formData.depositDueDate} onChange={(e) => handleInputChange('depositDueDate', e.target.value)} /></div>
              <div><Label>Overtime Rate ($/hour)</Label><Input type="number" value={formData.overtimeRate} onChange={(e) => handleInputChange('overtimeRate', e.target.value)} /></div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="gratuity" checked={formData.gratuityIncluded} onCheckedChange={(c) => handleInputChange('gratuityIncluded', !!c)} />
              <Label htmlFor="gratuity">Gratuity included in total cost</Label>
            </div>
            <div><Label>Additional Notes</Label><Textarea value={formData.additionalNotes} onChange={(e) => handleInputChange('additionalNotes', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="Limousine Service Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />Limousine Agreement Ready</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p><strong>Client:</strong> {formData.clientName}</p><p><strong>Provider:</strong> {formData.providerName}</p><p><strong>Date:</strong> {formData.pickupDate}</p></div>
              <div><p><strong>Vehicle:</strong> {formData.vehicleType}</p><p><strong>Event:</strong> {formData.eventType}</p><p><strong>Total:</strong> ${formData.totalCost}</p></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}><ArrowLeft className="mr-2 h-4 w-4" />Edit</Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-gray-800 hover:bg-gray-900">{isGeneratingPDF ? "Generating..." : "Generate PDF"}<FileText className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>
    );
  }

  const stepTitles = ["", "Location", "Parties", "Service Details", "Payment", "Your Info"];
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg">
        <CardTitle>Limousine Service Agreement</CardTitle>
        <CardDescription className="text-gray-300">Step {currentStep} of 5: {stepTitles[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStep()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-gray-800 hover:bg-gray-900">{currentStep === 5 ? "Complete" : "Next"}{currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</Button>
      </CardFooter>
    </Card>
  );
};

export default LimousineServiceAgreementForm;
