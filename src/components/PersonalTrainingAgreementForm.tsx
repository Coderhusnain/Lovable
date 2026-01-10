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
  trainerName: string; trainerCertifications: string; trainerAddress: string; trainerPhone: string; trainerEmail: string;
  sessionDuration: string; sessionsPerWeek: string; sessionLocation: string;
  startDate: string; endDate: string; contractLength: string;
  trainingGoals: string[];
  sessionRate: string; packageType: string; totalCost: string; paymentFrequency: string;
  cancellationPolicy: string;
  fitnessAssessmentIncluded: boolean; nutritionGuidanceIncluded: boolean;
  healthConditions: string;
  additionalNotes: string;
}

const PersonalTrainingAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '',
    clientName: '', clientAddress: '', clientPhone: '', clientEmail: '',
    trainerName: '', trainerCertifications: '', trainerAddress: '', trainerPhone: '', trainerEmail: '',
    sessionDuration: '60', sessionsPerWeek: '2', sessionLocation: '',
    startDate: '', endDate: '', contractLength: '',
    trainingGoals: [],
    sessionRate: '', packageType: '', totalCost: '', paymentFrequency: 'monthly',
    cancellationPolicy: '24',
    fitnessAssessmentIncluded: true, nutritionGuidanceIncluded: false,
    healthConditions: '',
    additionalNotes: ''
  });

  const goalOptions = [
    "Weight loss", "Muscle building", "Strength training", "Cardiovascular fitness",
    "Flexibility/mobility", "Sports performance", "Injury rehabilitation", "General fitness",
    "Body composition", "Endurance training", "Functional fitness", "Competition prep"
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'country') setFormData(prev => ({ ...prev, state: '' }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      trainingGoals: prev.trainingGoals.includes(goal)
        ? prev.trainingGoals.filter(g => g !== goal)
        : [...prev.trainingGoals, goal]
    }));
  };

  const getStatesForCountry = (country: string): string[] => {
    if (!country) return [];
    return getStatesByCountry(parseInt(country.split(':')[0])).map(s => `${s.id}:${s.name}`);
  };

  const canAdvance = (): boolean => {
    switch (currentStep) {
      case 1: return !!(formData.country && formData.state && formData.effectiveDate);
      case 2: return !!(formData.clientName && formData.trainerName);
      case 3: return !!(formData.sessionLocation && formData.trainingGoals.length > 0);
      case 4: return !!(formData.sessionRate || formData.totalCost);
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
      doc.text("PERSONAL TRAINING AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      const intro = `This Personal Training Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold"); doc.text("Client:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.clientPhone || '__________'} | Email: ${formData.clientEmail || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("Personal Trainer:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.trainerName || '__________'}`, 20, y); y += lh;
      if (formData.trainerCertifications) { doc.text(`Certifications: ${formData.trainerCertifications}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.trainerAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.trainerPhone || '__________'} | Email: ${formData.trainerEmail || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. TRAINING SCHEDULE", content: `Session Duration: ${formData.sessionDuration || '60'} minutes\nSessions Per Week: ${formData.sessionsPerWeek || '2'}\nLocation: ${formData.sessionLocation || '__________'}\nStart Date: ${formData.startDate || '__________'}\nEnd Date: ${formData.endDate || 'Ongoing'}` },
        { title: "2. TRAINING GOALS", content: `Primary Goals:\n${formData.trainingGoals.map(g => `• ${g}`).join('\n') || '• As discussed'}` },
        { title: "3. SERVICES INCLUDED", content: `• Personalized workout programming\n• Exercise instruction and supervision\n${formData.fitnessAssessmentIncluded ? '• Initial fitness assessment\n' : ''}${formData.nutritionGuidanceIncluded ? '• Basic nutrition guidance\n' : ''}• Progress tracking and adjustments` },
        { title: "4. PAYMENT TERMS", content: `Session Rate: $${formData.sessionRate || '__________'} per session\n${formData.packageType ? `Package: ${formData.packageType}\n` : ''}${formData.totalCost ? `Total Cost: $${formData.totalCost}\n` : ''}Payment Frequency: ${formData.paymentFrequency || 'Per session'}` },
        { title: "5. CANCELLATION POLICY", content: `Client must provide ${formData.cancellationPolicy || '24'}-hour notice for session cancellations. Late cancellations or no-shows may be charged at the full session rate at Trainer's discretion.` },
        { title: "6. TRAINER RESPONSIBILITIES", content: "The Trainer agrees to: Provide safe and effective training sessions, Design programs appropriate for Client's fitness level, Arrive prepared and on time for sessions, Track Client progress and adjust programming as needed, Maintain current certifications and insurance." },
        { title: "7. CLIENT RESPONSIBILITIES", content: "The Client agrees to: Attend scheduled sessions or provide timely cancellation notice, Follow exercise instructions for safety, Communicate any pain, discomfort, or health changes, Make timely payments as agreed, Disclose relevant health information honestly." },
        { title: "8. HEALTH DISCLOSURE", content: formData.healthConditions ? `Known health conditions/limitations: ${formData.healthConditions}` : "Client affirms they have disclosed all relevant health conditions and have obtained medical clearance if necessary." },
        { title: "9. ASSUMPTION OF RISK", content: "Client understands that physical exercise involves inherent risks. Client assumes full responsibility for any injury that may occur during training and agrees to follow all safety instructions." },
        { title: "10. TERMINATION", content: "Either party may terminate this Agreement with 7 days written notice. Prepaid sessions are non-refundable unless otherwise agreed." },
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
      doc.text(`Trainer: ${formData.trainerName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y);

      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`personal_training_agreement_${timestamp}.pdf`);
      const guidePDF = generateGuidePDF({ documentId: "personal-training-agreement", documentTitle: "Personal Training Agreement" });
      setTimeout(() => guidePDF.save(`personal_training_guide_${timestamp}.pdf`), 500);
      toast.success("Personal Training Agreement and Guide PDF generated!");
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
              <h3 className="font-semibold">Personal Trainer Information</h3>
              <div><Label>Trainer Name *</Label><Input value={formData.trainerName} onChange={(e) => handleInputChange('trainerName', e.target.value)} /></div>
              <div><Label>Certifications</Label><Input placeholder="e.g., NASM-CPT, ACE, NSCA" value={formData.trainerCertifications} onChange={(e) => handleInputChange('trainerCertifications', e.target.value)} /></div>
              <div><Label>Address</Label><Textarea value={formData.trainerAddress} onChange={(e) => handleInputChange('trainerAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.trainerPhone} onChange={(e) => handleInputChange('trainerPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.trainerEmail} onChange={(e) => handleInputChange('trainerEmail', e.target.value)} /></div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div><Label>Training Location *</Label><Textarea placeholder="Gym name and address, or 'Client's home', etc." value={formData.sessionLocation} onChange={(e) => handleInputChange('sessionLocation', e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Session Duration (minutes)</Label><Select value={formData.sessionDuration} onValueChange={(v) => handleInputChange('sessionDuration', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="30">30 minutes</SelectItem><SelectItem value="45">45 minutes</SelectItem><SelectItem value="60">60 minutes</SelectItem><SelectItem value="90">90 minutes</SelectItem></SelectContent></Select></div>
              <div><Label>Sessions Per Week</Label><Select value={formData.sessionsPerWeek} onValueChange={(v) => handleInputChange('sessionsPerWeek', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1 session</SelectItem><SelectItem value="2">2 sessions</SelectItem><SelectItem value="3">3 sessions</SelectItem><SelectItem value="4">4 sessions</SelectItem><SelectItem value="5">5 sessions</SelectItem></SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Start Date</Label><Input type="date" value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} /></div>
              <div><Label>End Date</Label><Input type="date" value={formData.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)} /></div>
            </div>
            <div className="space-y-2">
              <Label>Training Goals *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {goalOptions.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox id={goal} checked={formData.trainingGoals.includes(goal)} onCheckedChange={() => handleGoalToggle(goal)} />
                    <Label htmlFor={goal} className="text-sm cursor-pointer">{goal}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div><Label>Health Conditions/Limitations</Label><Textarea placeholder="Any injuries, conditions, or limitations the trainer should know about" value={formData.healthConditions} onChange={(e) => handleInputChange('healthConditions', e.target.value)} /></div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Session Rate ($)</Label><Input type="number" value={formData.sessionRate} onChange={(e) => handleInputChange('sessionRate', e.target.value)} /></div>
              <div><Label>Package Type</Label><Select value={formData.packageType} onValueChange={(v) => handleInputChange('packageType', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Pay Per Session">Pay Per Session</SelectItem><SelectItem value="10 Session Package">10 Session Package</SelectItem><SelectItem value="20 Session Package">20 Session Package</SelectItem><SelectItem value="Monthly Unlimited">Monthly Unlimited</SelectItem></SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Total Cost ($)</Label><Input type="number" value={formData.totalCost} onChange={(e) => handleInputChange('totalCost', e.target.value)} /></div>
              <div><Label>Payment Frequency</Label><Select value={formData.paymentFrequency} onValueChange={(v) => handleInputChange('paymentFrequency', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="per session">Per Session</SelectItem><SelectItem value="weekly">Weekly</SelectItem><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="upfront">Upfront</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label>Cancellation Notice (hours)</Label><Select value={formData.cancellationPolicy} onValueChange={(v) => handleInputChange('cancellationPolicy', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="12">12 hours</SelectItem><SelectItem value="24">24 hours</SelectItem><SelectItem value="48">48 hours</SelectItem></SelectContent></Select></div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2"><Checkbox id="assessment" checked={formData.fitnessAssessmentIncluded} onCheckedChange={(c) => handleInputChange('fitnessAssessmentIncluded', !!c)} /><Label htmlFor="assessment">Include fitness assessment</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="nutrition" checked={formData.nutritionGuidanceIncluded} onCheckedChange={(c) => handleInputChange('nutritionGuidanceIncluded', !!c)} /><Label htmlFor="nutrition">Include nutrition guidance</Label></div>
            </div>
            <div><Label>Additional Notes</Label><Textarea value={formData.additionalNotes} onChange={(e) => handleInputChange('additionalNotes', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="Personal Training Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />Personal Training Agreement Ready</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p><strong>Client:</strong> {formData.clientName}</p><p><strong>Trainer:</strong> {formData.trainerName}</p><p><strong>Location:</strong> {formData.sessionLocation}</p></div>
              <div><p><strong>Sessions:</strong> {formData.sessionsPerWeek}x/week</p><p><strong>Goals:</strong> {formData.trainingGoals.length} selected</p><p><strong>Rate:</strong> ${formData.sessionRate}/session</p></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}><ArrowLeft className="mr-2 h-4 w-4" />Edit</Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-green-500 hover:bg-green-600">{isGeneratingPDF ? "Generating..." : "Generate PDF"}<FileText className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>
    );
  }

  const stepTitles = ["", "Location", "Parties", "Training Details", "Payment", "Your Info"];
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
        <CardTitle>Personal Training Agreement</CardTitle>
        <CardDescription className="text-green-100">Step {currentStep} of 5: {stepTitles[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStep()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-green-500 hover:bg-green-600">{currentStep === 5 ? "Complete" : "Next"}{currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalTrainingAgreementForm;
