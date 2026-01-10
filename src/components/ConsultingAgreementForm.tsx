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
  clientName: string; clientCompany: string; clientAddress: string; clientPhone: string; clientEmail: string;
  consultantName: string; consultantCompany: string; consultantAddress: string; consultantPhone: string; consultantEmail: string;
  projectDescription: string;
  startDate: string; endDate: string;
  deliverables: string[];
  compensationType: string; hourlyRate: string; projectFee: string; paymentSchedule: string;
  expenseReimbursement: boolean; maxExpenses: string;
  confidentiality: boolean; nonCompete: boolean; nonCompetePeriod: string;
  intellectualProperty: string;
  terminationNotice: string;
  additionalNotes: string;
}

const ConsultingAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '',
    clientName: '', clientCompany: '', clientAddress: '', clientPhone: '', clientEmail: '',
    consultantName: '', consultantCompany: '', consultantAddress: '', consultantPhone: '', consultantEmail: '',
    projectDescription: '',
    startDate: '', endDate: '',
    deliverables: [],
    compensationType: 'hourly', hourlyRate: '', projectFee: '', paymentSchedule: 'monthly',
    expenseReimbursement: true, maxExpenses: '',
    confidentiality: true, nonCompete: false, nonCompetePeriod: '12',
    intellectualProperty: 'client',
    terminationNotice: '30',
    additionalNotes: ''
  });

  const deliverableOptions = [
    "Written reports and analysis", "Strategic recommendations", "Implementation plan",
    "Training and workshops", "Process documentation", "Technical specifications",
    "Project management support", "Ongoing advisory support", "Stakeholder presentations",
    "Research and data analysis", "Policy development", "Performance metrics"
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
      case 2: return !!(formData.clientName && formData.consultantName);
      case 3: return !!(formData.projectDescription && formData.deliverables.length > 0);
      case 4: return !!(formData.hourlyRate || formData.projectFee);
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
      doc.text("CONSULTING AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      const intro = `This Consulting Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold"); doc.text("Client:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      if (formData.clientCompany) { doc.text(`Company: ${formData.clientCompany}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.clientPhone || '__________'} | Email: ${formData.clientEmail || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("Consultant:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.consultantName || '__________'}`, 20, y); y += lh;
      if (formData.consultantCompany) { doc.text(`Company: ${formData.consultantCompany}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.consultantAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.consultantPhone || '__________'} | Email: ${formData.consultantEmail || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. PROJECT DESCRIPTION", content: formData.projectDescription || 'Project scope to be defined.' },
        { title: "2. TERM", content: `Start Date: ${formData.startDate || '__________'}\nEnd Date: ${formData.endDate || 'Upon project completion'}` },
        { title: "3. DELIVERABLES", content: `Consultant shall provide the following:\n${formData.deliverables.map(d => `• ${d}`).join('\n') || '• As specified in project scope'}` },
        { title: "4. COMPENSATION", content: `Compensation Type: ${formData.compensationType === 'hourly' ? 'Hourly' : 'Fixed Project Fee'}\n${formData.compensationType === 'hourly' ? `Hourly Rate: $${formData.hourlyRate || '__________'}/hour` : `Project Fee: $${formData.projectFee || '__________'}`}\nPayment Schedule: ${formData.paymentSchedule || 'Monthly'}\n${formData.expenseReimbursement ? `Expense Reimbursement: Yes${formData.maxExpenses ? ` (up to $${formData.maxExpenses})` : ''}` : 'Expense Reimbursement: No'}` },
        { title: "5. INDEPENDENT CONTRACTOR STATUS", content: "Consultant is an independent contractor and not an employee of Client. Consultant is responsible for their own taxes, insurance, and benefits. Consultant may work for other clients during the term of this Agreement." },
        { title: "6. CONFIDENTIALITY", content: formData.confidentiality ? "Consultant agrees to maintain strict confidentiality of all Client information, trade secrets, business strategies, and proprietary data accessed during the engagement. This obligation survives termination of this Agreement." : "No specific confidentiality provisions apply beyond standard professional ethics." },
        { title: "7. INTELLECTUAL PROPERTY", content: formData.intellectualProperty === 'client' ? "All work product, deliverables, and intellectual property created by Consultant during this engagement shall be owned exclusively by Client." : "Consultant retains ownership of all intellectual property created, granting Client a license to use deliverables for their business purposes." },
        { title: "8. NON-COMPETE", content: formData.nonCompete ? `Consultant agrees not to provide similar services to Client's direct competitors for a period of ${formData.nonCompetePeriod || '12'} months following termination.` : "No non-compete restrictions apply." },
        { title: "9. TERMINATION", content: `Either party may terminate this Agreement with ${formData.terminationNotice || '30'} days written notice. Upon termination, Consultant shall be paid for all work completed through the termination date.` },
        { title: "10. LIABILITY", content: "Consultant's liability shall be limited to the fees paid under this Agreement. Consultant provides services on an 'as-is' basis and disclaims all warranties beyond professional standards of care." },
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
      doc.text(`Consultant: ${formData.consultantName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y);

      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`consulting_agreement_${timestamp}.pdf`);
      const guidePDF = generateGuidePDF({ documentId: "consulting-agreement", documentTitle: "Consulting Agreement" });
      setTimeout(() => guidePDF.save(`consulting_guide_${timestamp}.pdf`), 500);
      toast.success("Consulting Agreement and Guide PDF generated!");
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
                <div><Label>Client Name *</Label><Input value={formData.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} /></div>
                <div><Label>Company Name</Label><Input value={formData.clientCompany} onChange={(e) => handleInputChange('clientCompany', e.target.value)} /></div>
              </div>
              <div><Label>Address</Label><Textarea value={formData.clientAddress} onChange={(e) => handleInputChange('clientAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.clientPhone} onChange={(e) => handleInputChange('clientPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.clientEmail} onChange={(e) => handleInputChange('clientEmail', e.target.value)} /></div>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Consultant Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Consultant Name *</Label><Input value={formData.consultantName} onChange={(e) => handleInputChange('consultantName', e.target.value)} /></div>
                <div><Label>Company Name</Label><Input value={formData.consultantCompany} onChange={(e) => handleInputChange('consultantCompany', e.target.value)} /></div>
              </div>
              <div><Label>Address</Label><Textarea value={formData.consultantAddress} onChange={(e) => handleInputChange('consultantAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.consultantPhone} onChange={(e) => handleInputChange('consultantPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.consultantEmail} onChange={(e) => handleInputChange('consultantEmail', e.target.value)} /></div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div><Label>Project Description *</Label><Textarea placeholder="Describe the consulting project, scope, and objectives..." value={formData.projectDescription} onChange={(e) => handleInputChange('projectDescription', e.target.value)} rows={4} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Start Date</Label><Input type="date" value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} /></div>
              <div><Label>End Date</Label><Input type="date" value={formData.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)} /></div>
            </div>
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
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div><Label>Compensation Type</Label><Select value={formData.compensationType} onValueChange={(v) => handleInputChange('compensationType', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="hourly">Hourly Rate</SelectItem><SelectItem value="fixed">Fixed Project Fee</SelectItem></SelectContent></Select></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.compensationType === 'hourly' ? (
                <div><Label>Hourly Rate ($)</Label><Input type="number" value={formData.hourlyRate} onChange={(e) => handleInputChange('hourlyRate', e.target.value)} /></div>
              ) : (
                <div><Label>Project Fee ($)</Label><Input type="number" value={formData.projectFee} onChange={(e) => handleInputChange('projectFee', e.target.value)} /></div>
              )}
              <div><Label>Payment Schedule</Label><Select value={formData.paymentSchedule} onValueChange={(v) => handleInputChange('paymentSchedule', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="weekly">Weekly</SelectItem><SelectItem value="bi-weekly">Bi-Weekly</SelectItem><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="upon completion">Upon Completion</SelectItem><SelectItem value="milestone">Milestone-Based</SelectItem></SelectContent></Select></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2"><Checkbox id="expenses" checked={formData.expenseReimbursement} onCheckedChange={(c) => handleInputChange('expenseReimbursement', !!c)} /><Label htmlFor="expenses">Expense Reimbursement</Label></div>
              {formData.expenseReimbursement && <div className="flex-1"><Label>Max Expenses ($)</Label><Input type="number" value={formData.maxExpenses} onChange={(e) => handleInputChange('maxExpenses', e.target.value)} /></div>}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2"><Checkbox id="confidentiality" checked={formData.confidentiality} onCheckedChange={(c) => handleInputChange('confidentiality', !!c)} /><Label htmlFor="confidentiality">Confidentiality clause</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="nonCompete" checked={formData.nonCompete} onCheckedChange={(c) => handleInputChange('nonCompete', !!c)} /><Label htmlFor="nonCompete">Non-compete clause</Label></div>
            </div>
            <div><Label>IP Ownership</Label><Select value={formData.intellectualProperty} onValueChange={(v) => handleInputChange('intellectualProperty', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="client">Client owns all work product</SelectItem><SelectItem value="consultant">Consultant retains IP, grants license</SelectItem></SelectContent></Select></div>
            <div><Label>Termination Notice (days)</Label><Select value={formData.terminationNotice} onValueChange={(v) => handleInputChange('terminationNotice', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="14">14 days</SelectItem><SelectItem value="30">30 days</SelectItem><SelectItem value="60">60 days</SelectItem></SelectContent></Select></div>
            <div><Label>Additional Notes</Label><Textarea value={formData.additionalNotes} onChange={(e) => handleInputChange('additionalNotes', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="Consulting Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />Consulting Agreement Ready</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p><strong>Client:</strong> {formData.clientName}</p><p><strong>Consultant:</strong> {formData.consultantName}</p><p><strong>Project:</strong> {formData.projectDescription.substring(0, 50)}...</p></div>
              <div><p><strong>Rate:</strong> {formData.compensationType === 'hourly' ? `$${formData.hourlyRate}/hr` : `$${formData.projectFee}`}</p><p><strong>Deliverables:</strong> {formData.deliverables.length} items</p><p><strong>Term:</strong> {formData.startDate} - {formData.endDate || 'TBD'}</p></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}><ArrowLeft className="mr-2 h-4 w-4" />Edit</Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-indigo-600 hover:bg-indigo-700">{isGeneratingPDF ? "Generating..." : "Generate PDF"}<FileText className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>
    );
  }

  const stepTitles = ["", "Location", "Parties", "Project Scope", "Terms & Payment", "Your Info"];
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-lg">
        <CardTitle>Consulting Agreement</CardTitle>
        <CardDescription className="text-indigo-100">Step {currentStep} of 5: {stepTitles[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStep()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-indigo-600 hover:bg-indigo-700">{currentStep === 5 ? "Complete" : "Next"}{currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</Button>
      </CardFooter>
    </Card>
  );
};

export default ConsultingAgreementForm;
