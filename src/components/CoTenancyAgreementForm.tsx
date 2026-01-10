import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Send, CheckCircle, Users } from "lucide-react";
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
  coTenants: string;
  landlordName: string;
  propertyAddress: string;
  leaseStartDate: string;
  leaseEndDate: string;
  securityDeposit: string;
  monthlyRent: string;
  rentAllocations: string;
  repairThreshold: string;
}

const CoTenancyAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '', coTenants: '', landlordName: '',
    propertyAddress: '', leaseStartDate: '', leaseEndDate: '', securityDeposit: '',
    monthlyRent: '', rentAllocations: '', repairThreshold: ''
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
      case 2: return !!(formData.coTenants && formData.landlordName && formData.propertyAddress);
      case 3: return !!(formData.leaseStartDate && formData.leaseEndDate && formData.monthlyRent);
      case 4: return !!(formData.securityDeposit);
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
      doc.text("CO-TENANCY AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lh * 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const intro = `This Co-Tenancy Agreement (the "Agreement") is made and entered into on ${formData.effectiveDate || '__________'} (the "Effective Date"), by and among the following individuals:`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      y += lh;

      doc.text(`Co-Tenants: ${formData.coTenants || '__________'}`, 15, y); y += lh * 2;

      doc.setFont("helvetica", "bold");
      doc.text("RECITALS", 15, y); y += lh;
      doc.setFont("helvetica", "normal");
      
      const recitals = `WHEREAS, the Co-Tenants have entered into a lease agreement dated ${formData.leaseStartDate || '__________'} (the "Lease") with ${formData.landlordName || '__________'} (the "Landlord") for the residential property located at ${formData.propertyAddress || '__________'} (the "Dwelling"), for a term commencing on ${formData.leaseStartDate || '__________'} and expiring on ${formData.leaseEndDate || '__________'};\n\nWHEREAS, pursuant to the Lease, a security or damage deposit in the amount of $${formData.securityDeposit || '__________'} was paid to the Landlord or the Landlord's agent, and monthly rent in the amount of $${formData.monthlyRent || '__________'} is due and payable;\n\nNOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the Co-Tenants agree as follows:`;
      
      recitals.split('\n').forEach(para => {
        checkPage();
        doc.splitTextToSize(para, 175).forEach((line: string) => { doc.text(line, 15, y); y += lh; });
      });
      y += lh;

      const sections = [
        { title: "1. Compliance With Lease and Rules", content: "Each Co-Tenant agrees to comply fully with all terms, conditions, rules, and obligations set forth in the Lease, any related agreements executed with the Landlord, and all applicable local laws, ordinances, and regulations governing the Dwelling." },
        { title: "2. Allocation of Rent", content: `The Co-Tenants agree to share responsibility for rent as follows:\n\n${formData.rentAllocations || 'Each Co-Tenant shall pay their proportionate share.'}\n\nEach Co-Tenant shall timely pay his or her respective share of rent prior to the due date specified in the Lease. Any late fees, penalties, or charges resulting from a Co-Tenant's failure to timely pay his or her share shall be borne solely by the defaulting Co-Tenant.` },
        { title: "3. Utilities and Services", content: "The Co-Tenants shall be responsible for payment of the following utilities and services associated with the Dwelling:\n• Electricity\n• Water and sewer\n• Gas\n• Heating\n• Garbage and trash disposal\n• Janitorial services\n• Telephone service\n\nThe Co-Tenants acknowledge that certain utilities or services may be billed directly by service providers or through the Landlord." },
        { title: "4. Other Shared Expenses", content: "The Co-Tenants agree to allocate the following expenses as set forth below:\n\nGroceries: Each Co-Tenant shall be responsible for his or her own groceries.\n\nGeneral Damages: The cost of repairing damages not attributable to a specific Co-Tenant or guest shall be shared equally. A Co-Tenant shall be solely responsible for any damage caused by that Co-Tenant or his or her guests.\n\nGeneral Maintenance and Upkeep: Shared as mutually agreed by the Co-Tenants." },
        { title: "5. Termination of Co-Tenancy", content: "Each Co-Tenant agrees to remain in occupancy for the full Lease term and to continue paying his or her obligations under this Agreement unless one of the following occurs:\n\na. A departing Co-Tenant (the \"Outgoing Co-Tenant\") secures a replacement tenant acceptable to both the remaining Co-Tenants and the Landlord. The replacement tenant must execute this Agreement prior to occupancy; or\n\nb. The remaining Co-Tenants provide written consent releasing the Outgoing Co-Tenant from this Agreement." },
        { title: "6. Security Deposit", content: "Any refund of the security deposit received from the Landlord shall be divided among the Co-Tenants on a pro rata basis, unless otherwise agreed in writing." },
        { title: "7. Joint and Several Liability; Indemnification", content: "The Co-Tenants acknowledge that they are jointly and severally liable to the Landlord under the Lease. Accordingly, the Landlord may pursue any or all Co-Tenants for unpaid rent, damages, or other charges.\n\nEach Co-Tenant agrees to indemnify and hold harmless the other Co-Tenants from any losses, penalties, or charges resulting from his or her own acts or omissions." },
        { title: "8. Long-Distance Telephone Charges", content: "Each Co-Tenant shall be solely responsible for his or her own long-distance telephone charges." },
        { title: "9. Repairs and Improvements", content: `No repairs, alterations, or improvements exceeding $${formData.repairThreshold || '__________'} shall be undertaken without the prior written consent of all Co-Tenants.` },
        { title: "10. Pets", content: "All Co-Tenants shall comply with the pet policies established by the Landlord and applicable law. Any Co-Tenant who owns or keeps a pet shall be solely responsible for all damages, fees, or charges arising from such pet." },
        { title: "11. Relationship to Lease", content: "This Agreement does not modify or amend the Lease and is intended solely to govern the rights and obligations among the Co-Tenants." },
        { title: "12. Payments and Reimbursement", content: "If a Co-Tenant pays more than his or her allocated share of any expense under this Agreement, such Co-Tenant shall be entitled to reimbursement from the other Co-Tenants." },
        { title: "13. Survival and Amendment", content: "This Agreement shall remain in effect notwithstanding a breach by any Co-Tenant unless terminated in accordance with this Agreement. Any amendment or cancellation must be in writing and signed by all current Co-Tenants.\n\nNothing herein authorizes the removal of any Co-Tenant from the Dwelling without due process of law." },
        { title: "14. Governing Law", content: `This Agreement shall be governed by and construed in accordance with the laws of ${getStateName(formData.country, formData.state) || '__________'}, ${getCountryName(formData.country) || '__________'}.` },
        { title: "15. Prior Agreements", content: "All prior co-tenancy agreements between the Co-Tenants are hereby superseded; however, any outstanding financial obligations under such agreements shall remain enforceable." }
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

      // Signatures
      checkPage(60);
      doc.setFont("helvetica", "bold");
      doc.text("SIGNATURES", pageWidth / 2, y, { align: "center" }); y += lh * 2;
      doc.setFont("helvetica", "normal");
      doc.text("IN WITNESS WHEREOF, the Co-Tenants have executed this Agreement as of the Effective Date.", 15, y);
      y += lh * 2;

      // Add signature lines for each co-tenant mentioned
      const coTenantList = formData.coTenants.split(',').map(t => t.trim()).filter(t => t);
      coTenantList.forEach((tenant, idx) => {
        checkPage(25);
        doc.setFont("helvetica", "bold");
        doc.text(`CO-TENANT ${idx + 1}:`, 15, y); y += lh;
        doc.setFont("helvetica", "normal");
        doc.text(`Name: ${tenant}`, 15, y); y += lh;
        doc.text("Signature: _________________________", 15, y); y += lh;
        doc.text("Date: _________________________", 15, y); y += lh * 2;
      });

      doc.save("Co_Tenancy_Agreement.pdf");
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
            <h3 className="text-lg font-semibold text-white">Co-Tenant Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coTenants">Co-Tenants (comma separated)</Label>
                <Textarea id="coTenants" value={formData.coTenants} onChange={(e) => handleInputChange('coTenants', e.target.value)} placeholder="John Doe, Jane Smith, Bob Johnson" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landlordName">Landlord Name</Label>
                <Input id="landlordName" value={formData.landlordName} onChange={(e) => handleInputChange('landlordName', e.target.value)} placeholder="Enter landlord name" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyAddress">Property Address</Label>
                <Textarea id="propertyAddress" value={formData.propertyAddress} onChange={(e) => handleInputChange('propertyAddress', e.target.value)} placeholder="Enter full property address" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Lease Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="leaseStartDate">Lease Start Date</Label>
                <Input type="date" id="leaseStartDate" value={formData.leaseStartDate} onChange={(e) => handleInputChange('leaseStartDate', e.target.value)} className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaseEndDate">Lease End Date</Label>
                <Input type="date" id="leaseEndDate" value={formData.leaseEndDate} onChange={(e) => handleInputChange('leaseEndDate', e.target.value)} className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent ($)</Label>
                <Input type="number" id="monthlyRent" value={formData.monthlyRent} onChange={(e) => handleInputChange('monthlyRent', e.target.value)} placeholder="Total monthly rent" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Financial Terms</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
                <Input type="number" id="securityDeposit" value={formData.securityDeposit} onChange={(e) => handleInputChange('securityDeposit', e.target.value)} placeholder="Total security deposit" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repairThreshold">Repair Approval Threshold ($)</Label>
                <Input type="number" id="repairThreshold" value={formData.repairThreshold} onChange={(e) => handleInputChange('repairThreshold', e.target.value)} placeholder="Amount requiring approval" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rentAllocations">Rent Allocations (Optional)</Label>
              <Textarea id="rentAllocations" value={formData.rentAllocations} onChange={(e) => handleInputChange('rentAllocations', e.target.value)} placeholder="John Doe: $500/month, Jane Smith: $600/month..." className="bg-gray-800 border-gray-700 min-h-[100px]" />
            </div>
          </div>
        );

      case 5:
        return (
          <UserInfoStep
            onBack={handleBack}
            onGenerate={generatePDF}
            documentType="Co-Tenancy Agreement"
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
            <p className="text-gray-400 mb-6">Your Co-Tenancy Agreement has been created and downloaded.</p>
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
              <div className="p-2 bg-purple-600 rounded-lg"><Users className="w-6 h-6 text-white" /></div>
              <div>
                <CardTitle className="text-white">Co-Tenancy Agreement</CardTitle>
                <CardDescription className="text-gray-400">Create an agreement between roommates sharing a rental property</CardDescription>
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
              <span>Location</span><span>Co-Tenants</span><span>Lease</span><span>Financial</span><span>Generate</span>
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

export default CoTenancyAgreementForm;
