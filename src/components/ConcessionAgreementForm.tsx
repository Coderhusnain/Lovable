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
  ownerName: string;
  ownerAddress: string;
  concessionaireName: string;
  concessionaireAddress: string;
  operatingHoursStart: string;
  operatingHoursEnd: string;
  installationDays: string;
  removalDays: string;
  termYears: string;
  terminationNoticeDays: string;
  revenuePercentage: string;
  lateFee: string;
}

const ConcessionAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '', ownerName: '', ownerAddress: '',
    concessionaireName: '', concessionaireAddress: '', operatingHoursStart: '',
    operatingHoursEnd: '', installationDays: '', removalDays: '', termYears: '',
    terminationNoticeDays: '', revenuePercentage: '', lateFee: ''
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
      case 2: return !!(formData.ownerName && formData.ownerAddress && formData.concessionaireName && formData.concessionaireAddress);
      case 3: return !!(formData.operatingHoursStart && formData.operatingHoursEnd && formData.termYears);
      case 4: return !!(formData.revenuePercentage && formData.terminationNoticeDays);
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
      doc.text("CONCESSION AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const intro = `This Concession Agreement ("Agreement") is entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold");
      doc.text("Owner:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.ownerName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.ownerAddress || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("Concessionaire:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.concessionaireName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.concessionaireAddress || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. EMPLOYEE TRAINING", content: "The Concessionaire shall be solely responsible for ensuring that all employees, agents, and representatives engaged in performance under this Agreement are properly trained and qualified. Such training shall include, without limitation, customer service standards, food handling and presentation, sanitation and cleanliness, professionalism, and compliance with all operational policies and procedures of the Owner." },
        { title: "2. STAFFING REQUIREMENTS", content: "The Concessionaire shall provide sufficient staffing at all times to ensure prompt, efficient, and uninterrupted service to the public. The Concessionaire shall anticipate periods of increased demand, including holidays, special events, and peak operating hours, and shall adjust staffing levels accordingly." },
        { title: "3. HOURS OF OPERATION", content: `The Concession Stands shall operate during the hours of ${formData.operatingHoursStart || '__________'} to ${formData.operatingHoursEnd || '__________'} on each day the facility is open for business, unless otherwise directed by the Owner in writing.` },
        { title: "4. PRICING", content: "All prices for goods and services shall be consistent with Exhibit \"B\" and must receive prior written approval from the Owner. The Concessionaire shall not change prices, offer discounts, or modify pricing structures without the Owner's prior written consent." },
        { title: "5. PRODUCTS AND SERVICES", content: "Only products and services expressly approved in writing by the Owner may be offered for sale. The Owner reserves the right to require the addition or removal of any product or service at any time." },
        { title: "6. DELIVERY AND INSTALLATION", content: `The Concessionaire shall, at its sole cost and expense, deliver, install, and place all concession facilities, fixtures, equipment, and machinery ("Concession Equipment") within ${formData.installationDays || '__________'} days of execution of this Agreement. All installations shall comply with all applicable laws, building codes, safety standards, and regulations.` },
        { title: "7. ALTERATIONS AND IMPROVEMENTS", content: "The Concessionaire shall not make any alterations, additions, or improvements to the Concession Stands or Equipment without the Owner's prior written approval. All approved improvements shall be made at the Concessionaire's sole expense and shall become the property of the Owner upon termination of this Agreement." },
        { title: "8. TEMPORARY REMOVAL OF EQUIPMENT", content: `If the Owner requires removal of any Concession Equipment, the Concessionaire shall remove such equipment at its sole expense and restore the premises to their original condition within ${formData.removalDays || '__________'} days.` },
        { title: "9. MAINTENANCE AND CLEANLINESS", content: "The Concessionaire shall, at its sole expense, maintain the Concession Stands and Equipment in a clean, sanitary, and safe condition at all times, including daily cleaning and waste removal." },
        { title: "10. DAMAGE TO PREMISES", content: "Any damage to the Concession Stands or surrounding premises caused by the Concessionaire, its employees, or agents shall be repaired by the Concessionaire at its sole cost and expense." },
        { title: "11. OWNER'S RIGHT TO REMEDY", content: "If the Concessionaire fails to perform required maintenance, repairs, or removal of equipment, the Owner may perform such work and recover all associated costs from the Concessionaire." },
        { title: "12. UTILITIES, TAXES, AND EXPENSES", content: "The Concessionaire shall be responsible for all operating expenses, including labor, supplies, maintenance, insurance, and utilities, except where water or power is provided by the Owner. The Concessionaire shall pay all taxes, fees, and assessments related to its operations, equipment, and inventory." },
        { title: "13. TERM", content: `This Agreement shall commence on the Effective Date and shall continue for a period of ${formData.termYears || '__________'} years, unless earlier terminated in accordance with this Agreement or extended by mutual written agreement.` },
        { title: "14. TERMINATION", content: `Either Party may terminate this Agreement upon ${formData.terminationNoticeDays || '__________'} days' written notice. Termination shall not relieve the Concessionaire of any obligations accrued prior to termination.` },
        { title: "15. COMPENSATION TO OWNER", content: `The Concessionaire shall pay the Owner ${formData.revenuePercentage || '__________'}% of gross monthly revenue. "Gross Monthly Revenue" includes all receipts from sales or services, whether cash, credit, electronic, or otherwise.` },
        { title: "16. PAYMENT DUE DATE", content: "Payments shall be made on or before the first day of each month for the preceding month's operations." },
        { title: "17. ACCESS TO RECORDS", content: "The Concessionaire shall maintain accurate financial records and provide monthly statements. The Owner shall have the right to inspect and audit such records upon reasonable notice." },
        { title: "18. CASH REGISTERS", content: "All sales shall be recorded through approved cash registers capable of producing receipts and audit trails. Daily opening and closing balances shall be maintained." },
        { title: "19. LATE FEES", content: `Late payments shall incur a late fee of $${formData.lateFee || '__________'} per occurrence.` },
        { title: "20. TAXES", content: "The Concessionaire shall be solely responsible for all taxes arising from its operations, including sales, payroll, and income taxes." },
        { title: "21. COMPLIANCE WITH LAWS", content: "The Concessionaire shall comply with all applicable federal, state, and local laws, including health, safety, sanitation, and licensing requirements." },
        { title: "22. WARRANTIES", content: "The Concessionaire warrants that it is properly licensed, trained, and authorized to perform all services under this Agreement." },
        { title: "23. INDEPENDENT CONTRACTOR", content: "The Concessionaire is an independent contractor. Nothing herein shall create an employer-employee or agency relationship." },
        { title: "24. INDEMNIFICATION BY CONCESSIONAIRE", content: "The Concessionaire shall indemnify and hold harmless the Owner from all claims, damages, losses, liabilities, and expenses arising from the Concessionaire's acts, omissions, or breach of this Agreement." },
        { title: "25. INDEMNIFICATION BY OWNER", content: "The Owner shall indemnify the Concessionaire only to the extent of damages caused solely by the Owner's negligence." },
        { title: "26. SURVIVAL", content: "All provisions which by their nature should survive termination shall survive termination of this Agreement." },
        { title: "27. CONFIDENTIALITY", content: "All non-public information obtained by the Concessionaire shall remain confidential. Any breach shall constitute grounds for immediate termination." },
        { title: "28. INSURANCE", content: "The Concessionaire shall maintain workers' compensation, general liability, and any other required insurance and shall name the Owner as an additional insured." },
        { title: "29. NON-EXCLUSIVITY", content: "This Agreement does not grant exclusivity. The Owner may grant similar rights to other concessionaires." },
        { title: "30. SIGNAGE", content: "The Concessionaire may display signage only with the prior written approval of the Owner." },
        { title: "31. ENTIRE AGREEMENT", content: "This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements or understandings." },
        { title: "32. ASSIGNMENT", content: "Neither Party may assign this Agreement without prior written consent of the other." },
        { title: "33. SUCCESSORS AND ASSIGNS", content: "This Agreement shall bind and benefit the Parties and their permitted successors and assigns." },
        { title: "34. ATTORNEYS' FEES", content: "Each Party shall bear its own legal fees unless otherwise required by law." },
        { title: "35. SEVERABILITY", content: "If any provision is held unenforceable, the remaining provisions shall remain in full force and effect." },
        { title: "36. AMENDMENT", content: "This Agreement may be amended only by a written document signed by both Parties." },
        { title: "37. WAIVER", content: "Failure to enforce any provision shall not constitute a waiver of future enforcement." },
        { title: "38. GOVERNING LAW", content: `This Agreement shall be governed by and construed in accordance with the laws of ${getStateName(formData.country, formData.state) || '__________'}, ${getCountryName(formData.country) || '__________'}.` },
        { title: "39. AUTHORITY", content: "Each signatory represents that they have full authority to bind their respective party to this Agreement." },
        { title: "40. DISPUTE RESOLUTION", content: "The Parties shall attempt to resolve disputes through good-faith negotiation. If unresolved, disputes shall be submitted to mediation prior to litigation." },
        { title: "41. NOTICES", content: "All notices shall be delivered personally or by certified mail to the addresses stated herein." },
        { title: "42. TIME OF THE ESSENCE", content: "Time is of the essence with respect to all obligations under this Agreement." }
      ];

      sections.forEach(section => {
        checkPage(40);
        doc.setFont("helvetica", "bold");
        doc.text(section.title, 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(section.content, 175).forEach((line: string) => { checkPage(); doc.text(line, 15, y); y += lh; });
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
      doc.text("CONCESSIONAIRE", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.concessionaireName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: _________________________", 15, y); y += lh;
      doc.text("Date: _________________________", 15, y); y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("OWNER", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.ownerName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: _________________________", 15, y); y += lh;
      doc.text("Date: _________________________", 15, y);

      doc.save("Concession_Agreement.pdf");
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
            <h3 className="text-lg font-semibold text-white">Party Information</h3>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-300">Owner Information</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input id="ownerName" value={formData.ownerName} onChange={(e) => handleInputChange('ownerName', e.target.value)} placeholder="Enter owner name" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerAddress">Owner Address</Label>
                  <Textarea id="ownerAddress" value={formData.ownerAddress} onChange={(e) => handleInputChange('ownerAddress', e.target.value)} placeholder="Enter owner address" className="bg-gray-800 border-gray-700" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-300">Concessionaire Information</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="concessionaireName">Concessionaire Name</Label>
                  <Input id="concessionaireName" value={formData.concessionaireName} onChange={(e) => handleInputChange('concessionaireName', e.target.value)} placeholder="Enter concessionaire name" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="concessionaireAddress">Concessionaire Address</Label>
                  <Textarea id="concessionaireAddress" value={formData.concessionaireAddress} onChange={(e) => handleInputChange('concessionaireAddress', e.target.value)} placeholder="Enter concessionaire address" className="bg-gray-800 border-gray-700" />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Concession Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="operatingHoursStart">Operating Hours Start</Label>
                <Input type="time" id="operatingHoursStart" value={formData.operatingHoursStart} onChange={(e) => handleInputChange('operatingHoursStart', e.target.value)} className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operatingHoursEnd">Operating Hours End</Label>
                <Input type="time" id="operatingHoursEnd" value={formData.operatingHoursEnd} onChange={(e) => handleInputChange('operatingHoursEnd', e.target.value)} className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="installationDays">Installation Days</Label>
                <Input type="number" id="installationDays" value={formData.installationDays} onChange={(e) => handleInputChange('installationDays', e.target.value)} placeholder="Days for installation" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="removalDays">Equipment Removal Days</Label>
                <Input type="number" id="removalDays" value={formData.removalDays} onChange={(e) => handleInputChange('removalDays', e.target.value)} placeholder="Days for removal" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="termYears">Term (Years)</Label>
                <Input type="number" id="termYears" value={formData.termYears} onChange={(e) => handleInputChange('termYears', e.target.value)} placeholder="Agreement term in years" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Compensation & Terms</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="revenuePercentage">Revenue Percentage (%)</Label>
                <Input type="number" id="revenuePercentage" value={formData.revenuePercentage} onChange={(e) => handleInputChange('revenuePercentage', e.target.value)} placeholder="Percentage of gross revenue to owner" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terminationNoticeDays">Termination Notice (Days)</Label>
                <Input type="number" id="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={(e) => handleInputChange('terminationNoticeDays', e.target.value)} placeholder="Days notice for termination" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lateFee">Late Fee ($)</Label>
                <Input type="number" id="lateFee" value={formData.lateFee} onChange={(e) => handleInputChange('lateFee', e.target.value)} placeholder="Late payment fee" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <UserInfoStep
            onBack={handleBack}
            onGenerate={generatePDF}
            documentType="Concession Agreement"
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
            <p className="text-gray-400 mb-6">Your Concession Agreement has been created and downloaded.</p>
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
              <div className="p-2 bg-purple-600 rounded-lg"><FileText className="w-6 h-6 text-white" /></div>
              <div>
                <CardTitle className="text-white">Concession Agreement</CardTitle>
                <CardDescription className="text-gray-400">Create a comprehensive concession agreement for vendor operations</CardDescription>
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
              <span>Location</span><span>Parties</span><span>Details</span><span>Compensation</span><span>Generate</span>
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

export default ConcessionAgreementForm;
