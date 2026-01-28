import { FormWizard } from "./FormWizard";

const steps = [
  {
    label: "Parties",
    fields: [
      { name: "vendor", label: "Vendor", type: "text", required: true },
      { name: "client", label: "Client", type: "text", required: true },
      { name: "serviceDescription", label: "Service Description", type: "textarea", required: true },
    ],
  },
  {
    label: "Agreement Details",
    fields: [
      { name: "agreementDate", label: "Agreement Date", type: "date", required: true },
      { name: "paymentTerms", label: "Payment Terms", type: "text" },
      { name: "term", label: "Term", type: "text" },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      { name: "additionalTerms", label: "Additional Terms", type: "textarea" },
    ],
  },
];

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Send, FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { toast } from "sonner";
import CountryStateAPI from 'countries-states-cities';
import { generateGuidePDF } from "@/utils/generateGuidePDF";

// ...rest of the VendorAgreementForm implementation (no duplicate export default)...

// Legacy code removed

interface UserInfoStepProps {
  onBack: () => void;
  onGenerate: () => void;
  documentType: string;
  isGenerating: boolean;
}

const UserInfoStep: React.FC<UserInfoStepProps> = ({ onBack, onGenerate, documentType, isGenerating }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const canGenerate = !!(name && email);

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-semibold">{documentType} Requestor Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={() => onGenerate()} disabled={!canGenerate || isGenerating}>
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      </div>
    </div>
  );
};


interface CountryData { id: number; name: string; iso3: string; iso2: string; phone_code: string; capital: string; currency: string; native: string; region: string; subregion: string; emoji: string; }
interface StateData { id: number; name: string; country_id: number; country_code: string; state_code: string; }

const getAllCountries = (): CountryData[] => CountryStateAPI.getAllCountries();
const getStatesByCountry = (countryId: number): StateData[] => CountryStateAPI.getStatesOfCountry(countryId);
const getStateName = (countryId: string, stateId: string): string => { const c = getAllCountries().find(c => c.id.toString() === countryId); if (!c) return stateId; const s = getStatesByCountry(c.id).find(s => s.id.toString() === stateId); return s?.name || stateId; };

interface FormData {
  country: string; state: string; effectiveDate: string;
  vendorName: string; vendorCompany: string; vendorAddress: string; vendorPhone: string; vendorEmail: string;
  clientName: string; clientCompany: string; clientAddress: string; clientPhone: string; clientEmail: string;
  eventDate: string; eventLocation: string; eventType: string;
  boothSize: string; boothNumber: string;
  productsServices: string;
  setupTime: string; teardownTime: string; eventStartTime: string; eventEndTime: string;
  boothFee: string; commissionRate: string; paymentDue: string;
  electricityNeeded: boolean; tableChairsNeeded: boolean;
  insuranceRequired: boolean; liabilityInsurance: string;
  cancellationPolicy: string;
  additionalNotes: string;
}

const VendorAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '',
    vendorName: '', vendorCompany: '', vendorAddress: '', vendorPhone: '', vendorEmail: '',
    clientName: '', clientCompany: '', clientAddress: '', clientPhone: '', clientEmail: '',
    eventDate: '', eventLocation: '', eventType: '',
    boothSize: '', boothNumber: '',
    productsServices: '',
    setupTime: '', teardownTime: '', eventStartTime: '', eventEndTime: '',
    boothFee: '', commissionRate: '', paymentDue: 'before event',
    electricityNeeded: false, tableChairsNeeded: false,
    insuranceRequired: true, liabilityInsurance: '1000000',
    cancellationPolicy: '14',
    additionalNotes: ''
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
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
      case 2: return !!(formData.vendorName && formData.clientName);
      case 3: return !!(formData.eventDate && formData.eventLocation && formData.productsServices);
      case 4: return !!(formData.boothFee);
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
      doc.text("VENDOR AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      const intro = `This Vendor Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold"); doc.text("Vendor:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.vendorName || '__________'}`, 20, y); y += lh;
      if (formData.vendorCompany) { doc.text(`Company: ${formData.vendorCompany}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.vendorAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.vendorPhone || '__________'} | Email: ${formData.vendorEmail || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("Event Organizer:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      if (formData.clientCompany) { doc.text(`Company: ${formData.clientCompany}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.clientPhone || '__________'} | Email: ${formData.clientEmail || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. EVENT DETAILS", content: `Event Date: ${formData.eventDate || '__________'}\nEvent Type: ${formData.eventType || '__________'}\nLocation: ${formData.eventLocation || '__________'}` },
        { title: "2. BOOTH INFORMATION", content: `Booth Size: ${formData.boothSize || '__________'}\n${formData.boothNumber ? `Booth Number: ${formData.boothNumber}` : ''}\nElectricity Required: ${formData.electricityNeeded ? 'Yes' : 'No'}\nTables/Chairs Needed: ${formData.tableChairsNeeded ? 'Yes' : 'No'}` },
        { title: "3. PRODUCTS/SERVICES", content: formData.productsServices || 'Products/services to be offered as discussed.' },
        { title: "4. SCHEDULE", content: `Setup Time: ${formData.setupTime || 'As designated by Organizer'}\nEvent Start: ${formData.eventStartTime || '__________'}\nEvent End: ${formData.eventEndTime || '__________'}\nTeardown: ${formData.teardownTime || 'Immediately following event'}` },
        { title: "5. FEES AND PAYMENT", content: `Booth Fee: $${formData.boothFee || '__________'}\n${formData.commissionRate ? `Commission: ${formData.commissionRate}% of sales` : ''}\nPayment Due: ${formData.paymentDue || 'Before event'}` },
        { title: "6. VENDOR RESPONSIBILITIES", content: "Vendor agrees to: Set up and maintain booth in professional manner, Comply with all applicable laws and regulations, Maintain proper licenses and permits, Staff booth during all event hours, Clean and vacate booth space after event, Carry appropriate insurance coverage." },
        { title: "7. ORGANIZER RESPONSIBILITIES", content: "Organizer agrees to: Provide designated booth space, Provide agreed-upon amenities (electricity, tables, etc.), Market the event to attract attendees, Maintain safe event environment, Provide Vendor with event rules and guidelines." },
        { title: "8. INSURANCE", content: formData.insuranceRequired ? `Vendor shall maintain general liability insurance of at least $${formData.liabilityInsurance || '1,000,000'} and provide proof of insurance upon request.` : "Insurance requirements as discussed." },
        { title: "9. CONDUCT", content: "Vendor shall conduct business in professional manner, comply with all event rules, and not interfere with other vendors. Organizer reserves right to remove Vendor for inappropriate conduct." },
        { title: "10. CANCELLATION", content: `Vendor cancellation: ${formData.cancellationPolicy || '14'} days notice required for full refund. Less notice may result in partial or no refund.\nOrganizer cancellation: Full refund of booth fees.` },
        { title: "11. LIABILITY", content: "Vendor assumes full responsibility for their merchandise, equipment, and activities. Organizer is not liable for theft, damage, or loss of Vendor property." },
        { title: "12. GOVERNING LAW", content: `This Agreement shall be governed by the laws of ${formData.state ? getStateName(formData.country.split(':')[0], formData.state.split(':')[0]) : '__________'}.` }
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
        doc.setFont("helvetica", "bold"); doc.text("13. ADDITIONAL TERMS", 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(formData.additionalNotes, 180).forEach((line: string) => { checkPage(); doc.text(line, 15, y); y += lh; });
        y += 3;
      }

      checkPage(50);
      doc.setFont("helvetica", "bold"); doc.text("SIGNATURES", 15, y); y += lh * 2;
      doc.setFont("helvetica", "normal");
      doc.text(`Vendor: ${formData.vendorName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y); y += lh * 2;
      doc.text(`Event Organizer: ${formData.clientName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y);

      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`vendor_agreement_${timestamp}.pdf`);
      const guidePDF = generateGuidePDF({ documentId: "vendor-agreement", documentTitle: "Vendor Agreement" });
      setTimeout(() => guidePDF.save(`vendor_guide_${timestamp}.pdf`), 500);
      toast.success("Vendor Agreement and Guide PDF generated!");
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
              <h3 className="font-semibold">Vendor Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Vendor Name *</Label><Input value={formData.vendorName} onChange={(e) => handleInputChange('vendorName', e.target.value)} /></div>
                <div><Label>Business Name</Label><Input value={formData.vendorCompany} onChange={(e) => handleInputChange('vendorCompany', e.target.value)} /></div>
              </div>
              <div><Label>Address</Label><Textarea value={formData.vendorAddress} onChange={(e) => handleInputChange('vendorAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.vendorPhone} onChange={(e) => handleInputChange('vendorPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.vendorEmail} onChange={(e) => handleInputChange('vendorEmail', e.target.value)} /></div>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Event Organizer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Organizer Name *</Label><Input value={formData.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} /></div>
                <div><Label>Organization Name</Label><Input value={formData.clientCompany} onChange={(e) => handleInputChange('clientCompany', e.target.value)} /></div>
              </div>
              <div><Label>Address</Label><Textarea value={formData.clientAddress} onChange={(e) => handleInputChange('clientAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.clientPhone} onChange={(e) => handleInputChange('clientPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.clientEmail} onChange={(e) => handleInputChange('clientEmail', e.target.value)} /></div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Event Date *</Label><Input type="date" value={formData.eventDate} onChange={(e) => handleInputChange('eventDate', e.target.value)} /></div>
              <div><Label>Event Type</Label><Select value={formData.eventType} onValueChange={(v) => handleInputChange('eventType', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Trade Show">Trade Show</SelectItem><SelectItem value="Festival">Festival</SelectItem><SelectItem value="Farmers Market">Farmers Market</SelectItem><SelectItem value="Craft Fair">Craft Fair</SelectItem><SelectItem value="Food Festival">Food Festival</SelectItem><SelectItem value="Convention">Convention</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label>Event Location *</Label><Textarea placeholder="Venue name and address" value={formData.eventLocation} onChange={(e) => handleInputChange('eventLocation', e.target.value)} /></div>
            <div><Label>Products/Services to be Offered *</Label><Textarea placeholder="Describe what you will be selling or offering..." value={formData.productsServices} onChange={(e) => handleInputChange('productsServices', e.target.value)} rows={3} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Booth Size</Label><Input placeholder="e.g., 10x10 ft" value={formData.boothSize} onChange={(e) => handleInputChange('boothSize', e.target.value)} /></div>
              <div><Label>Booth Number</Label><Input value={formData.boothNumber} onChange={(e) => handleInputChange('boothNumber', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><Label>Setup Time</Label><Input type="time" value={formData.setupTime} onChange={(e) => handleInputChange('setupTime', e.target.value)} /></div>
              <div><Label>Event Start</Label><Input type="time" value={formData.eventStartTime} onChange={(e) => handleInputChange('eventStartTime', e.target.value)} /></div>
              <div><Label>Event End</Label><Input type="time" value={formData.eventEndTime} onChange={(e) => handleInputChange('eventEndTime', e.target.value)} /></div>
              <div><Label>Teardown Time</Label><Input type="time" value={formData.teardownTime} onChange={(e) => handleInputChange('teardownTime', e.target.value)} /></div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Booth Fee ($) *</Label><Input type="number" value={formData.boothFee} onChange={(e) => handleInputChange('boothFee', e.target.value)} /></div>
              <div><Label>Commission Rate (%)</Label><Input type="number" placeholder="Optional" value={formData.commissionRate} onChange={(e) => handleInputChange('commissionRate', e.target.value)} /></div>
            </div>
            <div><Label>Payment Due</Label><Select value={formData.paymentDue} onValueChange={(v) => handleInputChange('paymentDue', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="upon signing">Upon Signing</SelectItem><SelectItem value="before event">Before Event</SelectItem><SelectItem value="day of event">Day of Event</SelectItem><SelectItem value="after event">After Event</SelectItem></SelectContent></Select></div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2"><Checkbox id="electricity" checked={formData.electricityNeeded} onCheckedChange={(c) => handleInputChange('electricityNeeded', !!c)} /><Label htmlFor="electricity">Electricity needed</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="tables" checked={formData.tableChairsNeeded} onCheckedChange={(c) => handleInputChange('tableChairsNeeded', !!c)} /><Label htmlFor="tables">Tables/chairs needed</Label></div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="insurance" checked={formData.insuranceRequired} onCheckedChange={(c) => handleInputChange('insuranceRequired', !!c)} />
              <Label htmlFor="insurance">Insurance required</Label>
              {formData.insuranceRequired && <div className="flex-1 ml-4"><Label>Minimum Coverage ($)</Label><Input type="number" value={formData.liabilityInsurance} onChange={(e) => handleInputChange('liabilityInsurance', e.target.value)} /></div>}
            </div>
            <div><Label>Cancellation Notice (days)</Label><Select value={formData.cancellationPolicy} onValueChange={(v) => handleInputChange('cancellationPolicy', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7">7 days</SelectItem><SelectItem value="14">14 days</SelectItem><SelectItem value="30">30 days</SelectItem></SelectContent></Select></div>
            <div><Label>Additional Notes</Label><Textarea value={formData.additionalNotes} onChange={(e) => handleInputChange('additionalNotes', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="Vendor Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />Vendor Agreement Ready</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p><strong>Vendor:</strong> {formData.vendorName}</p><p><strong>Organizer:</strong> {formData.clientName}</p><p><strong>Event Date:</strong> {formData.eventDate}</p></div>
              <div><p><strong>Event Type:</strong> {formData.eventType}</p><p><strong>Booth Fee:</strong> ${formData.boothFee}</p><p><strong>Booth Size:</strong> {formData.boothSize}</p></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}><ArrowLeft className="mr-2 h-4 w-4" />Edit</Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-teal-500 hover:bg-teal-600">{isGeneratingPDF ? "Generating..." : "Generate PDF"}<FileText className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>
    );
  }

  const stepTitles = ["", "Location", "Parties", "Event Details", "Fees & Terms", "Your Info"];
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-lg">
        <CardTitle>Vendor Agreement</CardTitle>
        <CardDescription className="text-teal-100">Step {currentStep} of 5: {stepTitles[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStep()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-teal-500 hover:bg-teal-600">{currentStep === 5 ? "Complete" : "Next"}{currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</Button>
      </CardFooter>
    </Card>
  );
};

export default VendorAgreementForm;
