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
  studentName: string; studentAge: string; studentGradeLevel: string;
  tutorName: string; tutorQualifications: string; tutorAddress: string; tutorPhone: string; tutorEmail: string;
  subjects: string[];
  sessionDuration: string; sessionsPerWeek: string; sessionLocation: string; sessionFormat: string;
  startDate: string; endDate: string;
  hourlyRate: string; packageType: string; totalCost: string; paymentFrequency: string;
  cancellationNotice: string;
  learningGoals: string;
  materialsProvided: boolean;
  additionalNotes: string;
}

const TutoringAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '',
    clientName: '', clientAddress: '', clientPhone: '', clientEmail: '',
    studentName: '', studentAge: '', studentGradeLevel: '',
    tutorName: '', tutorQualifications: '', tutorAddress: '', tutorPhone: '', tutorEmail: '',
    subjects: [],
    sessionDuration: '60', sessionsPerWeek: '1', sessionLocation: '', sessionFormat: 'In-Person',
    startDate: '', endDate: '',
    hourlyRate: '', packageType: '', totalCost: '', paymentFrequency: 'per session',
    cancellationNotice: '24',
    learningGoals: '',
    materialsProvided: false,
    additionalNotes: ''
  });

  const subjectOptions = [
    "Mathematics", "Algebra", "Geometry", "Calculus", "Statistics",
    "English/Language Arts", "Reading", "Writing", "ESL/English as Second Language",
    "Science", "Biology", "Chemistry", "Physics",
    "History", "Social Studies", "Geography",
    "Foreign Language", "Test Prep (SAT/ACT)", "Study Skills", "Computer Science"
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'country') setFormData(prev => ({ ...prev, state: '' }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const getStatesForCountry = (country: string): string[] => {
    if (!country) return [];
    return getStatesByCountry(parseInt(country.split(':')[0])).map(s => `${s.id}:${s.name}`);
  };

  const canAdvance = (): boolean => {
    switch (currentStep) {
      case 1: return !!(formData.country && formData.state && formData.effectiveDate);
      case 2: return !!(formData.clientName && formData.studentName && formData.tutorName);
      case 3: return !!(formData.subjects.length > 0 && formData.sessionLocation);
      case 4: return !!(formData.hourlyRate);
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
      doc.text("TUTORING AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal"); doc.setFontSize(11);
      const intro = `This Tutoring Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.setFont("helvetica", "bold"); doc.text("Client (Parent/Guardian):", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.clientName || '__________'}`, 20, y); y += lh;
      doc.text(`Address: ${formData.clientAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.clientPhone || '__________'} | Email: ${formData.clientEmail || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("Student:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.studentName || '__________'}`, 20, y); y += lh;
      doc.text(`Age: ${formData.studentAge || '__________'} | Grade Level: ${formData.studentGradeLevel || '__________'}`, 20, y); y += lh * 2;

      doc.setFont("helvetica", "bold"); doc.text("Tutor:", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${formData.tutorName || '__________'}`, 20, y); y += lh;
      if (formData.tutorQualifications) { doc.text(`Qualifications: ${formData.tutorQualifications}`, 20, y); y += lh; }
      doc.text(`Address: ${formData.tutorAddress || '__________'}`, 20, y); y += lh;
      doc.text(`Phone: ${formData.tutorPhone || '__________'} | Email: ${formData.tutorEmail || '__________'}`, 20, y); y += lh * 2;

      const sections = [
        { title: "1. SUBJECTS", content: `Subjects to be tutored:\n${formData.subjects.map(s => `• ${s}`).join('\n') || '• As agreed'}` },
        { title: "2. SESSION SCHEDULE", content: `Duration: ${formData.sessionDuration || '60'} minutes per session\nFrequency: ${formData.sessionsPerWeek || '1'} session(s) per week\nFormat: ${formData.sessionFormat || 'In-Person'}\nLocation: ${formData.sessionLocation || '__________'}\nStart Date: ${formData.startDate || '__________'}\nEnd Date: ${formData.endDate || 'Ongoing'}` },
        { title: "3. LEARNING GOALS", content: formData.learningGoals || 'Goals to be established collaboratively between Tutor, Student, and Client.' },
        { title: "4. PAYMENT TERMS", content: `Hourly Rate: $${formData.hourlyRate || '__________'}\n${formData.packageType ? `Package: ${formData.packageType}\n` : ''}${formData.totalCost ? `Total Cost: $${formData.totalCost}\n` : ''}Payment: ${formData.paymentFrequency || 'Per session'}` },
        { title: "5. CANCELLATION POLICY", content: `Client must provide ${formData.cancellationNotice || '24'}-hour notice for cancellations. Sessions cancelled with less notice may be charged at the full rate.` },
        { title: "6. TUTOR RESPONSIBILITIES", content: `The Tutor agrees to:\n• Come prepared with appropriate materials and lesson plans\n• Provide instruction tailored to Student's learning style and needs\n• Communicate progress to Client regularly\n• Arrive on time and conduct professional sessions\n${formData.materialsProvided ? '• Provide necessary learning materials' : ''}` },
        { title: "7. CLIENT/STUDENT RESPONSIBILITIES", content: "The Client and Student agree to:\n• Ensure Student is present and prepared for sessions\n• Provide a quiet, suitable learning environment\n• Complete assigned homework/practice between sessions\n• Communicate any concerns or schedule changes promptly\n• Make timely payments as agreed" },
        { title: "8. CONFIDENTIALITY", content: "Tutor agrees to keep all Student information confidential and will not share academic records or personal information with third parties." },
        { title: "9. TERMINATION", content: "Either party may terminate this Agreement with 7 days written notice. Prepaid sessions are refundable on a pro-rata basis." },
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
      doc.text(`Tutor: ${formData.tutorName || '__________'}`, 15, y); y += lh;
      doc.text("Signature: ____________________________ Date: ____________", 15, y);

      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`tutoring_agreement_${timestamp}.pdf`);
      const guidePDF = generateGuidePDF({ documentId: "tutoring-agreement", documentTitle: "Tutoring Agreement" });
      setTimeout(() => guidePDF.save(`tutoring_guide_${timestamp}.pdf`), 500);
      toast.success("Tutoring Agreement and Guide PDF generated!");
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
              <h3 className="font-semibold">Client (Parent/Guardian) Information</h3>
              <div><Label>Client Name *</Label><Input value={formData.clientName} onChange={(e) => handleInputChange('clientName', e.target.value)} /></div>
              <div><Label>Address</Label><Textarea value={formData.clientAddress} onChange={(e) => handleInputChange('clientAddress', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.clientPhone} onChange={(e) => handleInputChange('clientPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.clientEmail} onChange={(e) => handleInputChange('clientEmail', e.target.value)} /></div>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Student Information</h3>
              <div><Label>Student Name *</Label><Input value={formData.studentName} onChange={(e) => handleInputChange('studentName', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Age</Label><Input type="number" value={formData.studentAge} onChange={(e) => handleInputChange('studentAge', e.target.value)} /></div>
                <div><Label>Grade Level</Label><Input placeholder="e.g., 8th grade, High School Junior" value={formData.studentGradeLevel} onChange={(e) => handleInputChange('studentGradeLevel', e.target.value)} /></div>
              </div>
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Tutor Information</h3>
              <div><Label>Tutor Name *</Label><Input value={formData.tutorName} onChange={(e) => handleInputChange('tutorName', e.target.value)} /></div>
              <div><Label>Qualifications</Label><Input placeholder="e.g., BA in Mathematics, Certified Teacher" value={formData.tutorQualifications} onChange={(e) => handleInputChange('tutorQualifications', e.target.value)} /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><Label>Phone</Label><Input value={formData.tutorPhone} onChange={(e) => handleInputChange('tutorPhone', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={formData.tutorEmail} onChange={(e) => handleInputChange('tutorEmail', e.target.value)} /></div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Subjects *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {subjectOptions.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox id={subject} checked={formData.subjects.includes(subject)} onCheckedChange={() => handleSubjectToggle(subject)} />
                    <Label htmlFor={subject} className="text-sm cursor-pointer">{subject}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Session Format</Label><Select value={formData.sessionFormat} onValueChange={(v) => handleInputChange('sessionFormat', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="In-Person">In-Person</SelectItem><SelectItem value="Online">Online (Video Call)</SelectItem><SelectItem value="Hybrid">Hybrid</SelectItem></SelectContent></Select></div>
              <div><Label>Session Duration</Label><Select value={formData.sessionDuration} onValueChange={(v) => handleInputChange('sessionDuration', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="30">30 minutes</SelectItem><SelectItem value="45">45 minutes</SelectItem><SelectItem value="60">60 minutes</SelectItem><SelectItem value="90">90 minutes</SelectItem><SelectItem value="120">120 minutes</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label>Session Location *</Label><Textarea placeholder="e.g., Student's home, Library, Online via Zoom" value={formData.sessionLocation} onChange={(e) => handleInputChange('sessionLocation', e.target.value)} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Sessions Per Week</Label><Select value={formData.sessionsPerWeek} onValueChange={(v) => handleInputChange('sessionsPerWeek', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1 session</SelectItem><SelectItem value="2">2 sessions</SelectItem><SelectItem value="3">3 sessions</SelectItem><SelectItem value="4">4 sessions</SelectItem><SelectItem value="5">5 sessions</SelectItem></SelectContent></Select></div>
              <div><Label>Start Date</Label><Input type="date" value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} /></div>
            </div>
            <div><Label>Learning Goals</Label><Textarea placeholder="Specific goals for tutoring (e.g., improve grade from C to B, prepare for SAT)" value={formData.learningGoals} onChange={(e) => handleInputChange('learningGoals', e.target.value)} /></div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Hourly Rate ($) *</Label><Input type="number" value={formData.hourlyRate} onChange={(e) => handleInputChange('hourlyRate', e.target.value)} /></div>
              <div><Label>Package Type</Label><Select value={formData.packageType} onValueChange={(v) => handleInputChange('packageType', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Pay Per Session">Pay Per Session</SelectItem><SelectItem value="5 Session Package">5 Session Package</SelectItem><SelectItem value="10 Session Package">10 Session Package</SelectItem><SelectItem value="Monthly Flat Rate">Monthly Flat Rate</SelectItem></SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Total Cost ($)</Label><Input type="number" value={formData.totalCost} onChange={(e) => handleInputChange('totalCost', e.target.value)} /></div>
              <div><Label>Payment Frequency</Label><Select value={formData.paymentFrequency} onValueChange={(v) => handleInputChange('paymentFrequency', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="per session">Per Session</SelectItem><SelectItem value="weekly">Weekly</SelectItem><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="upfront">Upfront</SelectItem></SelectContent></Select></div>
            </div>
            <div><Label>Cancellation Notice (hours)</Label><Select value={formData.cancellationNotice} onValueChange={(v) => handleInputChange('cancellationNotice', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="12">12 hours</SelectItem><SelectItem value="24">24 hours</SelectItem><SelectItem value="48">48 hours</SelectItem></SelectContent></Select></div>
            <div className="flex items-center space-x-2">
              <Checkbox id="materials" checked={formData.materialsProvided} onCheckedChange={(c) => handleInputChange('materialsProvided', !!c)} />
              <Label htmlFor="materials">Tutor will provide learning materials</Label>
            </div>
            <div><Label>Additional Notes</Label><Textarea value={formData.additionalNotes} onChange={(e) => handleInputChange('additionalNotes', e.target.value)} /></div>
          </div>
        );
      case 5:
        return <UserInfoStep onBack={handleBack} onGenerate={() => setIsComplete(true)} documentType="Tutoring Agreement" isGenerating={isGeneratingPDF} />;
      default: return null;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6" />Tutoring Agreement Ready</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border rounded-lg p-4 text-black">
            <h3 className="font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p><strong>Student:</strong> {formData.studentName}</p><p><strong>Tutor:</strong> {formData.tutorName}</p><p><strong>Subjects:</strong> {formData.subjects.length} selected</p></div>
              <div><p><strong>Format:</strong> {formData.sessionFormat}</p><p><strong>Sessions:</strong> {formData.sessionsPerWeek}x/week</p><p><strong>Rate:</strong> ${formData.hourlyRate}/hour</p></div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}><ArrowLeft className="mr-2 h-4 w-4" />Edit</Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-blue-500 hover:bg-blue-600">{isGeneratingPDF ? "Generating..." : "Generate PDF"}<FileText className="ml-2 h-4 w-4" /></Button>
        </CardFooter>
      </Card>
    );
  }

  const stepTitles = ["", "Location", "Parties", "Sessions", "Payment", "Your Info"];
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle>Tutoring Agreement</CardTitle>
        <CardDescription className="text-blue-100">Step {currentStep} of 5: {stepTitles[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStep()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-blue-500 hover:bg-blue-600">{currentStep === 5 ? "Complete" : "Next"}{currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</Button>
      </CardFooter>
    </Card>
  );
};

export default TutoringAgreementForm;
