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
  clientName1: string; clientName2: string; clientAddress: string; clientPhone: string; clientEmail: string;
  plannerName: string; plannerCompany: string; plannerAddress: string; plannerPhone: string; plannerEmail: string;
  weddingDate: string; ceremonyLocation: string; receptionLocation: string; estimatedGuests: string;
  packageType: string; totalFee: string; depositAmount: string; depositDueDate: string;
  paymentSchedule: string;
  servicesIncluded: string[];
  additionalNotes: string;
  cancellationDays: string;
}

const WeddingPlannerAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '',
    clientName1: '', clientName2: '', clientAddress: '', clientPhone: '', clientEmail: '',
    plannerName: '', plannerCompany: '', plannerAddress: '', plannerPhone: '', plannerEmail: '',
    weddingDate: '', ceremonyLocation: '', receptionLocation: '', estimatedGuests: '',
    packageType: '', totalFee: '', depositAmount: '', depositDueDate: '',
    paymentSchedule: '',
    servicesIncluded: [],
    additionalNotes: '',
    cancellationDays: '30'
  });

  const serviceOptions = [
    "Venue selection and booking",
    "Vendor coordination (caterer, florist, photographer, etc.)",
    "Budget planning and management",
    "Timeline and schedule creation",
    "Guest list management",
    "Invitation design coordination",
    "Ceremony coordination",
    "Reception coordination",
    "Rehearsal coordination",
    "Day-of coordination",
    "Transportation arrangements",
    "Accommodation arrangements"
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
      case 2: return !!(formData.clientName1 && formData.clientAddress && formData.plannerName);
      case 3: return !!(formData.weddingDate && (formData.ceremonyLocation || formData.receptionLocation));
      case 4: return !!(formData.totalFee && formData.depositAmount && formData.servicesIncluded.length > 0);
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
      doc.text("WEDDING PLANNER AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      const intro = `This Wedding Planner Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold"); doc.text("Client(s):", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      const clientNames = [formData.clientName1, formData.clientName2].filter(Boolean).join(' and ');
      doc.text(`Name(s): ${clientNames || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.clientPhone || '__________'} | Email: ${formData.clientEmail || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("Wedding Planner:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.plannerName || '__________'}`, 20, y); y += lh;
      if (formData.plannerCompany) { doc.text(`Company: ${formData.plannerCompany}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.plannerAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.plannerPhone || '__________'} | Email: ${formData.plannerEmail || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. WEDDING DETAILS", content: `Wedding Date: ${formData.weddingDate || '__________'}\nCeremony Location: ${formData.ceremonyLocation || '__________'}\nReception Location: ${formData.receptionLocation || '__________'}\nEstimated Guests: ${formData.estimatedGuests || '__________'}` },
        { title: "2. SERVICES PROVIDED", content: `Package Type: ${formData.packageType || 'Full Planning'}\n\nServices included:\n${formData.servicesIncluded.map(s => `• ${s}`).join('\n') || '• As agreed upon'}` },
        { title: "3. PAYMENT TERMS", content: `Total Fee: $${formData.totalFee || '__________'}\nDeposit Required: $${formData.depositAmount || '__________'} (due by ${formData.depositDueDate || 'upon signing'})\nPayment Schedule: ${formData.paymentSchedule || 'Remaining balance due 30 days before wedding date'}` },
        { title: "4. PLANNER RESPONSIBILITIES", content: "The Planner agrees to: Provide professional wedding planning services, Act in the best interest of the Client, Maintain confidentiality of all Client information, Communicate regularly regarding progress and decisions, Attend meetings and site visits as reasonably necessary." },
        { title: "5. CLIENT RESPONSIBILITIES", content: "The Client agrees to: Make timely decisions and provide requested information, Make payments according to the agreed schedule, Communicate preferences and concerns promptly, Attend scheduled planning meetings." },
        { title: "6. VENDOR RELATIONSHIPS", content: "The Planner may recommend vendors but final selection is the Client's decision. Any vendor contracts are between the Client and the vendor directly." },
        { title: "7. CANCELLATION POLICY", content: `Cancellation by Client: If cancelled more than ${formData.cancellationDays || '30'} days before the wedding, Client forfeits the deposit. Less than ${formData.cancellationDays || '30'} days notice, Client is responsible for 50% of total fee.\nCancellation by Planner: Full refund of all payments, Planner will assist in finding replacement.` },
        { title: "8. LIABILITY", content: "The Planner shall not be liable for actions of third-party vendors. Maximum liability shall not exceed fees paid under this Agreement." },
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
        doc.setFont("helvetica", "bold"); doc.text("10. ADDITIONAL NOTES", 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(formData.additionalNotes, 180).forEach((line: string) => { checkPage(); doc.text(line, 15, y); y += lh; });
        y += 3;
      }

      checkPage(60);
      doc.setFont("helvetica", "bold"); doc.text("SIGNATURES", 15, y); y += lh * 2;
      doc.setFont("helvetica", "normal");
      doc.text(`Client: ${formData.clientName1 || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y); y += lh * 2;
      if (formData.clientName2) {
        doc.text(`Client: ${formData.clientName2}`, 15, y); y += lh;
        doc.text("Signature: ____________________________ Date: ____________", 15, y); y += lh * 2;
      }
      doc.text(`Wedding Planner: ${formData.plannerName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y);

      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`wedding_planner_agreement_${timestamp}.pdf`);
      const guidePDF = generateGuidePDF({ documentId: "wedding-planner-agreement", documentTitle: "Wedding Planner Agreement" });
      setTimeout(() => guidePDF.save(`wedding_planner_guide_${timestamp}.pdf`), 500);
      toast.success("Wedding Planner Agreement and Guide PDF generated!");
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Partner 1 Name *</Label><Input value={formData.clientName1} onChange={(e) => handleInputChange('clientName1', e.target.value)} /></div>
                <div><Label>Partner 2 Name</Label><Input value={formData.clientName2} onChange={(e) => handleInputChange('clientName2', e.target.value)} /></div>
              </div>
              <div><Label>Address *</Label><Textarea value={formData.clientAddress} onChange={(e) => handleInputChange('clientAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.clientPhone} onChange={(e) => handleInputChange('clientPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.clientEmail} onChange={(e) => handleInputChange('clientEmail', e.target.value)} /></div>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Wedding Planner Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Planner Name *</Label><Input value={formData.plannerName} onChange={(e) => handleInputChange('plannerName', e.target.value)} /></div>
                <div><Label>Company Name</Label><Input value={formData.plannerCompany} onChange={(e) => handleInputChange('plannerCompany', e.target.value)} /></div>
              </div>
              <div><Label>Address</Label><Textarea value={formData.plannerAddress} onChange={(e) => handleInputChange('plannerAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.plannerPhone} onChange={(e) => handleInputChange('plannerPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.plannerEmail} onChange={(e) => handleInputChange('plannerEmail', e.target.value)} /></div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div><Label>Wedding Date *</Label><Input type="date" value={formData.weddingDate} onChange={(e) => handleInputChange('weddingDate', e.target.value)} /></div>
            <div><Label>Ceremony Location</Label><Textarea placeholder="Venue name and address" value={formData.ceremonyLocation} onChange={(e) => handleInputChange('ceremonyLocation', e.target.value)} /></div>
            <div><Label>Reception Location</Label><Textarea placeholder="Venue name and address (if different)" value={formData.receptionLocation} onChange={(e) => handleInputChange('receptionLocation', e.target.value)} /></div>
            <div><Label>Estimated Number of Guests</Label><Input type="number" value={formData.estimatedGuests} onChange={(e) => handleInputChange('estimatedGuests', e.target.value)} /></div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div><Label>Package Type</Label><Select value={formData.packageType} onValueChange={(v) => handleInputChange('packageType', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Full Planning">Full Planning</SelectItem><SelectItem value="Partial Planning">Partial Planning</SelectItem><SelectItem value="Day-Of Coordination">Day-Of Coordination</SelectItem><SelectItem value="Custom">Custom Package</SelectItem></SelectContent></Select></div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Total Fee ($) *</Label><Input type="number" value={formData.totalFee} onChange={(e) => handleInputChange('totalFee', e.target.value)} /></div>
              <div><Label>Deposit Amount ($) *</Label><Input type="number" value={formData.depositAmount} onChange={(e) => handleInputChange('depositAmount', e.target.value)} /></div>
            </div>
            <div><Label>Deposit Due Date</Label><Input type="date" value={formData.depositDueDate} onChange={(e) => handleInputChange('depositDueDate', e.target.value)} /></div>
            <div><Label>Additional Notes</Label><Textarea placeholder="Any special arrangements or notes" value={formData.additionalNotes} onChange={(e) => handleInputChange('additionalNotes', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="Wedding Planner Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />Wedding Planner Agreement Ready</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p><strong>Couple:</strong> {formData.clientName1}{formData.clientName2 ? ` & ${formData.clientName2}` : ''}</p><p><strong>Planner:</strong> {formData.plannerName}</p><p><strong>Wedding Date:</strong> {formData.weddingDate}</p></div>
              <div><p><strong>Package:</strong> {formData.packageType}</p><p><strong>Fee:</strong> ${formData.totalFee}</p><p><strong>Services:</strong> {formData.servicesIncluded.length} selected</p></div>
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

  const stepTitles = ["", "Location", "Parties", "Wedding Details", "Services & Payment", "Your Info"];
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle>Wedding Planner Agreement</CardTitle>
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

export default WeddingPlannerAgreementForm;
