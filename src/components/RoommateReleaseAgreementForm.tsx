import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Send, CheckCircle, UserMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { toast } from "sonner";
import CountryStateAPI from 'countries-states-cities';
import UserInfoStep from "@/components/UserInfoStep";

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
  releasingRoommate: string;
  remainingRoommates: string;
  premisesAddress: string;
  premisesCity: string;
  premisesState: string;
  premisesZip: string;
  leaseDate: string;
  vacateDate: string;
}

const RoommateReleaseAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '', releasingRoommate: '',
    remainingRoommates: '', premisesAddress: '', premisesCity: '',
    premisesState: '', premisesZip: '', leaseDate: '', vacateDate: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
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
      case 2: return !!(formData.releasingRoommate && formData.remainingRoommates);
      case 3: return !!(formData.premisesAddress && formData.premisesCity && formData.leaseDate);
      case 4: return !!(formData.vacateDate);
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
      doc.text("ROOMMATE RELEASE AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const intro = `This Roommate Release Agreement (the "Agreement") is made and entered into on ${formData.effectiveDate || '__________'} (the "Effective Date"), by and between ${formData.releasingRoommate || '__________'} (the "Releasing Roommate") and ${formData.remainingRoommates || '__________'} (collectively, the "Remaining Roommates"). The Releasing Roommate and the Remaining Roommates are hereinafter collectively referred to as the "Roommates."`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      const recitals = [
        `WHEREAS, the Roommates are co-tenants of the residential premises located at ${formData.premisesAddress || '__________'}, ${formData.premisesCity || '__________'}, ${formData.premisesState || '__________'}, ${formData.premisesZip || '__________'} (the "Premises");`,
        `WHEREAS, the Roommates entered into a lease agreement dated ${formData.leaseDate || '__________'} (the "Lease"), a copy of which is attached hereto;`,
        `WHEREAS, the Releasing Roommate desires to withdraw from the Lease and be fully released from all rights, duties, liabilities, and obligations arising thereunder; and`,
        `WHEREAS, the Remaining Roommates have agreed to assume full responsibility for all obligations and liabilities under the Lease for the remainder of the Lease term.`
      ];

      recitals.forEach(recital => {
        checkPage();
        doc.splitTextToSize(recital, 175).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
        y += lh / 2;
      });
      y += lh;

      doc.text("NOW, THEREFORE, in consideration of the foregoing recitals, which are incorporated herein by reference,", 15, y); y += lh;
      doc.text("and the mutual covenants and agreements contained herein, the Roommates agree as follows:", 15, y);
      y += lh * 2;

      const sections = [
        { title: "1. Vacating of Premises", content: `The Releasing Roommate shall vacate and relinquish possession of the Premises on ${formData.vacateDate || '__________'} and hereby assigns and transfers all possessory rights therein to the Remaining Roommates.` },
        { title: "2. Assumption of Obligations", content: "Effective as of the Effective Date, the Remaining Roommates shall assume and be solely responsible for the full and timely performance of all covenants, obligations, and liabilities arising under the Lease for the remainder of the Lease term, including, without limitation, the payment of rent, utilities, and any other charges due thereunder." },
        { title: "3. Release of Releasing Roommate", content: "The Releasing Roommate shall be fully and irrevocably released from any and all obligations, liabilities, claims, and responsibilities under the Lease accruing on or after the Effective Date, including, without limitation, liability for rent, damages, or destruction to the Premises." },
        { title: "4. Security Deposit", content: "The Releasing Roommate hereby assigns and transfers all rights, title, and interest in and to any security deposit paid in connection with the Lease to the Remaining Roommates. Any entitlement to the return of such security deposit at the termination of the Lease shall be determined solely between the Remaining Roommates and the landlord." },
        { title: "5. Landlord's Consent and Release", content: "The landlord hereby consents to this Agreement and agrees to release the Releasing Roommate from any and all obligations and liabilities under the Lease arising on or after the Effective Date of this Agreement." },
        { title: "6. Governing Law", content: `This Agreement shall be governed by and construed in accordance with the laws of ${getStateName(formData.country, formData.state) || '__________'}, ${getCountryName(formData.country) || '__________'}.` },
        { title: "7. Entire Agreement", content: "This Agreement constitutes the entire agreement between the Roommates with respect to the subject matter hereof and supersedes all prior negotiations, understandings, and agreements." },
        { title: "8. Amendments", content: "This Agreement may be amended only by a written document signed by all parties." },
        { title: "9. Counterparts", content: "This Agreement may be executed in counterparts, each of which shall be deemed an original." }
      ];

      sections.forEach(section => {
        checkPage(30);
        doc.setFont("helvetica", "bold");
        doc.text(section.title, 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(section.content, 175).forEach((line: string) => { checkPage(); doc.text(line, 15, y); y += lh; });
        y += lh / 2;
      });

      // Signatures
      checkPage(80);
      doc.setFont("helvetica", "bold");
      doc.text("SIGNATURES", pageWidth / 2, y, { align: "center" }); y += lh * 2;
      doc.setFont("helvetica", "normal");
      doc.text("IN WITNESS WHEREOF, the Roommates have executed this Agreement as of the Effective Date.", 15, y);
      y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("RELEASING ROOMMATE", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.releasingRoommate || '__________'}`, 15, y); y += lh;
      doc.text("Signature: _________________________", 15, y); y += lh;
      doc.text("Date: _________________________", 15, y); y += lh * 2;

      // Remaining roommates signatures
      const remaining = formData.remainingRoommates.split(',').map(r => r.trim()).filter(r => r);
      remaining.forEach((roommate, idx) => {
        checkPage(25);
        doc.setFont("helvetica", "bold");
        doc.text(`REMAINING ROOMMATE ${idx + 1}`, 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.text(`Name: ${roommate}`, 15, y); y += lh;
        doc.text("Signature: _________________________", 15, y); y += lh;
        doc.text("Date: _________________________", 15, y); y += lh * 2;
      });

      // Landlord signature
      checkPage(25);
      doc.setFont("helvetica", "bold");
      doc.text("LANDLORD (Optional)", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text("Name: _________________________", 15, y); y += lh;
      doc.text("Signature: _________________________", 15, y); y += lh;
      doc.text("Date: _________________________", 15, y);

      doc.save("Roommate_Release_Agreement.pdf");
      toast.success("PDF generated successfully!");
      setIsComplete(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Jurisdiction / Location</h3>
            <p className="text-gray-400 text-sm">Select the country and state/province that will govern this agreement.</p>
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Roommate Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="releasingRoommate">Releasing Roommate (Full Name)</Label>
                <Input id="releasingRoommate" value={formData.releasingRoommate} onChange={(e) => handleInputChange('releasingRoommate', e.target.value)} placeholder="Name of roommate being released" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remainingRoommates">Remaining Roommates (comma separated)</Label>
                <Textarea id="remainingRoommates" value={formData.remainingRoommates} onChange={(e) => handleInputChange('remainingRoommates', e.target.value)} placeholder="John Doe, Jane Smith" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Premises & Lease Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="premisesAddress">Premises Address</Label>
                <Input id="premisesAddress" value={formData.premisesAddress} onChange={(e) => handleInputChange('premisesAddress', e.target.value)} placeholder="Street address" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="premisesCity">City</Label>
                <Input id="premisesCity" value={formData.premisesCity} onChange={(e) => handleInputChange('premisesCity', e.target.value)} placeholder="City" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="premisesState">State/Province</Label>
                <Input id="premisesState" value={formData.premisesState} onChange={(e) => handleInputChange('premisesState', e.target.value)} placeholder="State" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="premisesZip">ZIP/Postal Code</Label>
                <Input id="premisesZip" value={formData.premisesZip} onChange={(e) => handleInputChange('premisesZip', e.target.value)} placeholder="ZIP code" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaseDate">Original Lease Date</Label>
                <Input type="date" id="leaseDate" value={formData.leaseDate} onChange={(e) => handleInputChange('leaseDate', e.target.value)} className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Release Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vacateDate">Vacate Date</Label>
                <Input type="date" id="vacateDate" value={formData.vacateDate} onChange={(e) => handleInputChange('vacateDate', e.target.value)} className="bg-gray-800 border-gray-700" />
                <p className="text-xs text-gray-400">Date when the releasing roommate will vacate the premises</p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <UserInfoStep
            onBack={handleBack}
            onGenerate={generatePDF}
            documentType="Roommate Release Agreement"
            isGenerating={isGeneratingPDF}
          />
        );

      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700 max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Document Generated!</h2>
            <p className="text-gray-400 mb-6">Your Roommate Release Agreement has been created and downloaded.</p>
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
              <div className="p-2 bg-purple-600 rounded-lg"><UserMinus className="w-6 h-6 text-white" /></div>
              <div>
                <CardTitle className="text-white">Roommate Release Agreement</CardTitle>
                <CardDescription className="text-gray-400">Release a roommate from a shared lease agreement</CardDescription>
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
              <span>Location</span><span>Roommates</span><span>Premises</span><span>Release</span><span>Generate</span>
            </div>
            <div className="min-h-[400px]">{renderStep()}</div>
            {currentStep < 5 && (
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="border-gray-600 text-gray-300 hover:bg-gray-700"><ArrowLeft className="w-4 h-4 mr-2" /> Previous</Button>
                <Button onClick={handleNext} disabled={!canAdvance()} className="bg-purple-600 hover:bg-purple-700">Next <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoommateReleaseAgreementForm;
