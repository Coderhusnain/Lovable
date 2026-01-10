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
  companyName: string;
  companyAddress: string;
  composerName: string;
  composerAddress: string;
  pictureTitle: string;
  termEndDate: string;
  deliveryDate: string;
  fixedFee: string;
  royaltyPercentage: string;
  additionalTerms: string;
}

const ComposerAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '', companyName: '', companyAddress: '',
    composerName: '', composerAddress: '', pictureTitle: '', termEndDate: '',
    deliveryDate: '', fixedFee: '', royaltyPercentage: '', additionalTerms: ''
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
      case 2: return !!(formData.companyName && formData.companyAddress && formData.composerName && formData.composerAddress);
      case 3: return !!(formData.pictureTitle && formData.termEndDate && formData.deliveryDate);
      case 4: return !!(formData.fixedFee && formData.royaltyPercentage);
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
      doc.text("COMPOSER AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const intro = `This Composer Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold");
      doc.text("Company:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.companyName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.companyAddress || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("Composer:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.composerName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.composerAddress || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. ENGAGEMENT", content: `The Company hereby engages the Composer, and the Composer accepts such engagement, to compose, arrange, record, and deliver original musical compositions and related recordings (collectively, the "Composition(s)") for use in connection with a motion picture currently entitled "${formData.pictureTitle || '__________'}" (the "Picture"), subject to the terms and conditions of this Agreement. The Composer shall render all services customarily performed by composers in connection with motion picture productions and shall perform such services in a professional and diligent manner consistent with industry standards.` },
        { title: "2. TERM", content: `The term of this Agreement shall commence on the Effective Date and shall continue until ${formData.termEndDate || '__________'}, unless earlier terminated pursuant to the provisions of this Agreement.` },
        { title: "3. SERVICES", content: `The Composer agrees to:\na) Compose and record the Composition and deliver all master recordings to the Company no later than ${formData.deliveryDate || '__________'};\nb) Attend spotting sessions, editing sessions, and dubbing sessions as reasonably requested by the Company;\nc) Assist with revisions, re-recordings, or modifications as required by the Company;\nd) Perform all services customarily rendered by composers and recording artists in the motion picture industry;\ne) Obtain all necessary licenses, waivers, and clearances required for the Company's use of the Composition;\nf) Serve as the sole composer and featured recording artist unless otherwise authorized in writing;\ng) Follow all reasonable instructions, policies, and procedures of the Company.` },
        { title: "4. COMPENSATION", content: `4.1 The Composer shall receive a fixed fee of $${formData.fixedFee || '__________'}, which shall constitute full and complete consideration for all services rendered and all rights granted under this Agreement.\n4.2 The Composer acknowledges that such compensation includes all costs associated with composing, recording, producing, and delivering the Composition.\n4.3 Except as expressly provided herein, the Composer shall not be entitled to any additional compensation.` },
        { title: "5. ROYALTIES", content: `a) Subject to recoupment, the Company shall pay the Composer royalties equal to ${formData.royaltyPercentage || '__________'}% of the suggested retail list price of net U.S. sales of soundtrack albums embodying the Composition.\nb) If the Composer performs on the master recordings, an additional royalty of eight percent (8%) shall apply.\nc) Royalties shall be calculated in accordance with the Company's standard accounting practices.\nd) Statements shall be rendered semi-annually and shall be binding unless objected to in writing within sixty (60) days.\ne) No royalties shall be payable until all recording, production, and related costs have been fully recouped.` },
        { title: "6. OWNERSHIP AND RIGHTS", content: "a) The Composition and all recordings shall be deemed \"works made for hire\" for the Company.\nb) To the extent any portion does not qualify as a work made for hire, the Composer hereby irrevocably assigns all worldwide right, title, and interest to the Company in perpetuity.\nc) The Company shall have the exclusive right to exploit the Composition in all media, whether now known or hereafter devised, throughout the world, in perpetuity." },
        { title: "7. PUBLICITY AND NAME USAGE", content: "The Composer grants the Company the perpetual, irrevocable right to use the Composer's name, likeness, voice, image, and biographical material in connection with the Picture and its advertising, publicity, and promotion." },
        { title: "8. CREDIT", content: "a) Screen credit shall be accorded as \"Composer,\" \"Music by,\" or \"Original Score by,\" subject to industry standards.\nb) Failure to accord credit shall not constitute breach and shall not give rise to injunctive relief or damages." },
        { title: "9. WARRANTIES AND REPRESENTATIONS", content: "The Composer represents and warrants that:\na) All compositions are original;\nb) No portion infringes any copyright or third-party rights;\nc) The Composer has full authority to enter into this Agreement;\nd) No conflicting agreements exist;\ne) All services shall be performed in a professional manner." },
        { title: "10. INDEMNIFICATION", content: "The Composer shall indemnify, defend, and hold harmless the Company from any claims, losses, damages, costs, or expenses (including attorneys' fees) arising from breach of this Agreement or violation of any third-party rights." },
        { title: "11. WAIVER OF MORAL RIGHTS", content: "The Composer irrevocably waives all moral rights, including rights of attribution and integrity, to the fullest extent permitted by law." },
        { title: "12. EXPENSES", content: "All costs incurred by the Composer in connection with performance shall be borne solely by the Composer unless expressly approved in writing by the Company." },
        { title: "13. INCAPACITY OR DEATH", content: "a) If the Composer becomes incapacitated, the Company may suspend performance.\nb) The Composer grants the Company power of attorney to execute necessary documents.\nc) This Agreement shall automatically terminate upon the Composer's death; however, all rights granted prior thereto shall remain vested in the Company." },
        { title: "14. NO OBLIGATION TO USE", content: "Nothing herein obligates the Company to use or exploit the Composition or any portion thereof. Failure to use the Composition shall not constitute breach." },
        { title: "15. TERMINATION", content: "The Company may terminate this Agreement immediately upon written notice if the Composer:\na) Engages in misconduct or fraud;\nb) Fails to perform obligations;\nc) Breaches this Agreement;\nd) Acts in a manner harmful to the production.\nAll rights granted shall survive termination." },
        { title: "16. FORCE MAJEURE", content: "Performance shall be excused for events beyond reasonable control, including acts of God, epidemics, governmental actions, war, labor disputes, or other emergencies. Performance shall resume when practicable." },
        { title: "17. GOVERNING LAW", content: `This Agreement shall be governed by and construed in accordance with the laws of ${getStateName(formData.country, formData.state) || '__________'}, ${getCountryName(formData.country) || '__________'}.` },
        { title: "18. DISPUTE RESOLUTION", content: "The Parties shall attempt good-faith resolution. If unresolved, disputes shall be resolved through mediation or binding arbitration pursuant to applicable law." },
        { title: "19. ATTORNEYS' FEES", content: "The prevailing Party in any legal action shall be entitled to recover reasonable attorneys' fees and costs." },
        { title: "20. ASSIGNMENT", content: "The Company may assign this Agreement freely. The Composer may not assign without written consent." },
        { title: "21. AMENDMENTS", content: "This Agreement may be amended only by a written instrument signed by both Parties." },
        { title: "22. SEVERABILITY", content: "If any provision is held invalid, the remainder shall remain enforceable." },
        { title: "23. ENTIRE AGREEMENT", content: "This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements or understandings." },
        { title: "24. COUNTERPARTS", content: "This Agreement may be executed in counterparts, including electronic signatures." },
        { title: "25. INDEPENDENT CONTRACTOR", content: "The Composer is an independent contractor and not an employee or agent of the Company." }
      ];

      sections.forEach(section => {
        checkPage(40);
        doc.setFont("helvetica", "bold");
        doc.text(section.title, 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        section.content.split('\n').forEach(para => {
          checkPage();
          doc.splitTextToSize(para, 175).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
        });
        y += lh / 2;
      });

      if (formData.additionalTerms) {
        checkPage(30);
        doc.setFont("helvetica", "bold");
        doc.text("26. ADDITIONAL TERMS", 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(formData.additionalTerms, 175).forEach((line: string) => { checkPage(); doc.text(line, 15, y); y += lh; });
        y += lh;
      }

      // Signatures
      checkPage(60);
      doc.setFont("helvetica", "bold");
      doc.text("SIGNATURES", pageWidth / 2, y, { align: "center" }); y += lh * 2;
      doc.setFont("helvetica", "normal");
      doc.text("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.", 15, y);
      y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("COMPANY", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.companyName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: _________________________", 15, y); y += lh;
      doc.text("Date: _________________________", 15, y); y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("COMPOSER", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.composerName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: _________________________", 15, y); y += lh;
      doc.text("Date: _________________________", 15, y);

      doc.save("Composer_Agreement.pdf");
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Jurisdiction / Location</h3>
              <p className="text-gray-400 text-sm">Select the country and state/province that will govern this agreement.</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select value={formData.country} onValueChange={(v) => handleInputChange('country', v)}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAllCountries().map(c => (
                        <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Select value={formData.state} onValueChange={(v) => handleInputChange('state', v)} disabled={!formData.country}>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {getStatesForCountry().map(s => (
                        <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effectiveDate">Effective Date</Label>
                  <Input type="date" id="effectiveDate" value={formData.effectiveDate} onChange={(e) => handleInputChange('effectiveDate', e.target.value)} className="bg-gray-800 border-gray-700" />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Party Information</h3>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-300">Company Information</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" value={formData.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} placeholder="Enter company name" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Company Address</Label>
                  <Textarea id="companyAddress" value={formData.companyAddress} onChange={(e) => handleInputChange('companyAddress', e.target.value)} placeholder="Enter company address" className="bg-gray-800 border-gray-700" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-300">Composer Information</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="composerName">Composer Name</Label>
                  <Input id="composerName" value={formData.composerName} onChange={(e) => handleInputChange('composerName', e.target.value)} placeholder="Enter composer name" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="composerAddress">Composer Address</Label>
                  <Textarea id="composerAddress" value={formData.composerAddress} onChange={(e) => handleInputChange('composerAddress', e.target.value)} placeholder="Enter composer address" className="bg-gray-800 border-gray-700" />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Engagement Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pictureTitle">Motion Picture Title</Label>
                <Input id="pictureTitle" value={formData.pictureTitle} onChange={(e) => handleInputChange('pictureTitle', e.target.value)} placeholder="Enter motion picture title" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="termEndDate">Term End Date</Label>
                <Input type="date" id="termEndDate" value={formData.termEndDate} onChange={(e) => handleInputChange('termEndDate', e.target.value)} className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Composition Delivery Date</Label>
                <Input type="date" id="deliveryDate" value={formData.deliveryDate} onChange={(e) => handleInputChange('deliveryDate', e.target.value)} className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Compensation & Royalties</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fixedFee">Fixed Fee ($)</Label>
                <Input type="number" id="fixedFee" value={formData.fixedFee} onChange={(e) => handleInputChange('fixedFee', e.target.value)} placeholder="Enter fixed fee amount" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="royaltyPercentage">Royalty Percentage (%)</Label>
                <Input type="number" id="royaltyPercentage" value={formData.royaltyPercentage} onChange={(e) => handleInputChange('royaltyPercentage', e.target.value)} placeholder="Enter royalty percentage" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalTerms">Additional Terms (Optional)</Label>
              <Textarea id="additionalTerms" value={formData.additionalTerms} onChange={(e) => handleInputChange('additionalTerms', e.target.value)} placeholder="Enter any additional terms..." className="bg-gray-800 border-gray-700 min-h-[100px]" />
            </div>
          </div>
        );

      case 5:
        return (
          <UserInfoStep
            onBack={handleBack}
            onGenerate={generatePDF}
            documentType="Composer Agreement"
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
            <p className="text-gray-400 mb-6">Your Composer Agreement has been created and downloaded.</p>
            <Button onClick={() => navigate('/documents')} className="w-full bg-purple-600 hover:bg-purple-700">
              Back to Documents
            </Button>
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
              <div className="p-2 bg-purple-600 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">Composer Agreement</CardTitle>
                <CardDescription className="text-gray-400">Create a comprehensive agreement between a production company and composer for original music</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'}`}>
                    {step}
                  </div>
                  {step < 5 && <div className={`w-12 md:w-24 h-1 mx-2 ${currentStep > step ? 'bg-purple-600' : 'bg-gray-700'}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between mb-8 text-xs text-gray-400">
              <span>Location</span><span>Parties</span><span>Engagement</span><span>Compensation</span><span>Generate</span>
            </div>

            <div className="min-h-[400px]">{renderStep()}</div>

            {currentStep < 5 && (
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                </Button>
                <Button onClick={handleNext} disabled={!canAdvance()} className="bg-purple-600 hover:bg-purple-700">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComposerAgreementForm;
