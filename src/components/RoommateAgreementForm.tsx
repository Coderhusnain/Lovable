import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Send, CheckCircle, FileText, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { toast } from "sonner";
import CountryStateAPI from 'countries-states-cities';
import UserInfoStep from "@/components/UserInfoStep";
import { generateGuidePDF } from "@/utils/generateGuidePDF";

interface CountryData {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  phone_code: string;
  capital: string;
  currency: string;
  native: string;
  region: string;
  subregion: string;
  emoji: string;
}

interface StateData {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  state_code: string;
}

interface Roommate {
  name: string;
  rentShare: string;
  depositShare: string;
  utilities: string;
}

interface RoommateAgreementData {
  country: string;
  state: string;
  effectiveDate: string;
  premisesAddress: string;
  landlordName: string;
  rentalAgreementDate: string;
  leaseStartDate: string;
  leaseEndDate: string;
  totalMonthlyRent: string;
  rentDueDay: string;
  totalSecurityDeposit: string;
  petsAllowed: string;
  petDetails: string;
}

const getAllCountries = (): CountryData[] => {
  return CountryStateAPI.getAllCountries();
};

const getStatesByCountry = (countryId: number): StateData[] => {
  return CountryStateAPI.getStatesOfCountry(countryId);
};

const getCountryName = (countryId: string): string => {
  const country = CountryStateAPI.getAllCountries().find(c => c.id.toString() === countryId);
  return country?.name || countryId;
};

const getStateName = (countryId: string, stateId: string): string => {
  const country = CountryStateAPI.getAllCountries().find(c => c.id.toString() === countryId);
  if (!country) return stateId;
  const states = CountryStateAPI.getStatesOfCountry(country.id);
  const state = states.find(s => s.id.toString() === stateId);
  return state?.name || stateId;
};

const RoommateAgreementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [roommates, setRoommates] = useState<Roommate[]>([
    { name: '', rentShare: '', depositShare: '', utilities: '' },
    { name: '', rentShare: '', depositShare: '', utilities: '' }
  ]);
  const [formData, setFormData] = useState<RoommateAgreementData>({
    country: '',
    state: '',
    effectiveDate: '',
    premisesAddress: '',
    landlordName: '',
    rentalAgreementDate: '',
    leaseStartDate: '',
    leaseEndDate: '',
    totalMonthlyRent: '',
    rentDueDay: '',
    totalSecurityDeposit: '',
    petsAllowed: 'no',
    petDetails: ''
  });

  const handleInputChange = (field: keyof RoommateAgreementData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'country') {
      setFormData(prev => ({ ...prev, state: '' }));
    }
  };

  const handleRoommateChange = (index: number, field: keyof Roommate, value: string) => {
    const updated = [...roommates];
    updated[index] = { ...updated[index], [field]: value };
    setRoommates(updated);
  };

  const addRoommate = () => {
    if (roommates.length < 6) {
      setRoommates([...roommates, { name: '', rentShare: '', depositShare: '', utilities: '' }]);
    }
  };

  const removeRoommate = (index: number) => {
    if (roommates.length > 2) {
      setRoommates(roommates.filter((_, i) => i !== index));
    }
  };

  const getStatesForCountry = (countryAnswer: string): string[] => {
    if (!countryAnswer) return [];
    const countryId = parseInt(countryAnswer.split(':')[0]);
    const states = getStatesByCountry(countryId);
    return states.map(state => `${state.id}:${state.name}`);
  };

  const canAdvance = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.country && formData.state && formData.effectiveDate && formData.premisesAddress);
      case 2:
        return !!(formData.landlordName && formData.rentalAgreementDate && formData.leaseStartDate && formData.leaseEndDate);
      case 3:
        return roommates.every(r => r.name && r.rentShare) && !!(formData.totalMonthlyRent && formData.rentDueDay);
      case 4:
        return roommates.every(r => r.depositShare) && !!formData.totalSecurityDeposit;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canAdvance()) return;
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generatePDF = () => {
    setIsGeneratingPDF(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const lineHeight = 7;
      let y = 20;

      const checkPage = (needed: number = 25) => {
        if (y > 270 - needed) {
          doc.addPage();
          y = 20;
        }
      };

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("ROOMMATE AGREEMENT", pageWidth / 2, y, { align: "center" });
      y += lineHeight * 2;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      // Intro
      const intro = `This Roommate Agreement ("Agreement") is made and entered into as of ${formData.effectiveDate || '__________'} ("Effective Date"), by and between the undersigned individuals (collectively referred to as the "Roommates").`;
      doc.splitTextToSize(intro, 180).forEach((line: string) => {
        doc.text(line, 15, y);
        y += lineHeight;
      });
      y += lineHeight;

      // Recitals
      checkPage();
      doc.setFont("helvetica", "bold");
      doc.text("RECITALS", 15, y);
      y += lineHeight;
      doc.setFont("helvetica", "normal");

      const recital1 = `WHEREAS, the Roommates are co-tenants residing at the premises located at ${formData.premisesAddress || '__________'} (the "Premises");`;
      doc.splitTextToSize(recital1, 180).forEach((line: string) => {
        doc.text(line, 15, y);
        y += lineHeight;
      });
      y += 3;

      const stateName = formData.state ? getStateName(formData.country.split(':')[0], formData.state.split(':')[0]) : '__________';
      const recital2 = `WHEREAS, the Premises are subject to a written lease or rental agreement entered into with ${formData.landlordName || '__________'} ("Landlord"), dated ${formData.rentalAgreementDate || '__________'} (the "Rental Agreement");`;
      doc.splitTextToSize(recital2, 180).forEach((line: string) => {
        doc.text(line, 15, y);
        y += lineHeight;
      });
      y += lineHeight;

      // Sections
      const sections = [
        {
          title: "1. INCORPORATION OF RENTAL AGREEMENT",
          content: "All Roommates expressly agree to comply with, and be bound by, all terms, conditions, obligations, and covenants contained in the Rental Agreement. Nothing in this Agreement shall be construed to modify or supersede the Rental Agreement."
        },
        {
          title: "2. TERM",
          content: `The Roommates shall occupy the Premises for the term specified in the Rental Agreement, commencing on ${formData.leaseStartDate || '__________'} and terminating on ${formData.leaseEndDate || '__________'}. Upon expiration of the lease term, this Agreement shall continue on a month-to-month basis unless otherwise terminated in writing.`
        },
        {
          title: "3. AMENDMENTS",
          content: "This Agreement may be amended, modified, or supplemented only by a written instrument executed by all Roommates."
        },
        {
          title: "4. WAIVER",
          content: "The failure of any Roommate to enforce any provision of this Agreement shall not constitute a waiver of such provision, nor shall it limit that Roommate's right to subsequently enforce strict compliance with all terms of this Agreement."
        },
        {
          title: "5. ARBITRATION",
          content: "Any dispute, claim, or controversy arising out of or relating to this Agreement shall be resolved exclusively through binding arbitration in accordance with the then-current Commercial Arbitration Rules of the American Arbitration Association."
        },
        {
          title: "6. PERSONAL PROPERTY",
          content: "No Roommate shall borrow or use another Roommate's personal property without prior consent. Borrowed property shall be used with reasonable care and returned in its original condition."
        },
        {
          title: "7. HOUSEHOLD DUTIES",
          content: "All Roommates shall equally share responsibility for cleaning and maintaining the common areas of the Premises, including bathrooms, kitchens, and common spaces; disposing of trash; and general upkeep."
        },
        {
          title: "8. ADDITIONAL ROOMMATES",
          content: "No additional roommate may occupy the Premises without the prior written consent of all existing Roommates and the Landlord."
        },
        {
          title: "9. GOVERNING LAW",
          content: `This Agreement shall be governed by and construed in accordance with the laws of the State of ${stateName}.`
        },
        {
          title: "10. SEVERABILITY",
          content: "If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions shall remain in full force and effect."
        }
      ];

      sections.forEach(section => {
        checkPage(30);
        doc.setFont("helvetica", "bold");
        doc.text(section.title, 15, y);
        y += lineHeight;
        doc.setFont("helvetica", "normal");
        doc.splitTextToSize(section.content, 180).forEach((line: string) => {
          checkPage();
          doc.text(line, 15, y);
          y += lineHeight;
        });
        y += 3;
      });

      // Rent Section
      checkPage(40);
      doc.setFont("helvetica", "bold");
      doc.text("11. RENT", 15, y);
      y += lineHeight;
      doc.setFont("helvetica", "normal");
      doc.text(`The total monthly rent for the Premises is $${formData.totalMonthlyRent || '__________'}.`, 15, y);
      y += lineHeight;
      doc.text("Each Roommate shall pay the following portion:", 15, y);
      y += lineHeight;
      roommates.forEach(r => {
        doc.text(`${r.name || '__________'}: $${r.rentShare || '__________'}`, 20, y);
        y += lineHeight;
      });
      doc.text(`Rent shall be due on the ${formData.rentDueDay || '__________'} day of each month.`, 15, y);
      y += lineHeight * 2;

      // Security Deposit Section
      checkPage(40);
      doc.setFont("helvetica", "bold");
      doc.text("12. SECURITY DEPOSIT", 15, y);
      y += lineHeight;
      doc.setFont("helvetica", "normal");
      doc.text(`The total security deposit for the Premises is $${formData.totalSecurityDeposit || '__________'}.`, 15, y);
      y += lineHeight;
      doc.text("Each Roommate shall contribute as follows:", 15, y);
      y += lineHeight;
      roommates.forEach(r => {
        doc.text(`${r.name || '__________'}: $${r.depositShare || '__________'}`, 20, y);
        y += lineHeight;
      });
      y += lineHeight;

      // Pets Section
      checkPage(20);
      doc.setFont("helvetica", "bold");
      doc.text("13. PETS", 15, y);
      y += lineHeight;
      doc.setFont("helvetica", "normal");
      if (formData.petsAllowed === 'yes') {
        doc.text(`Pets are permitted. ${formData.petDetails || 'Pet-owning Roommates are solely responsible for any damage caused by their pets.'}`, 15, y);
      } else {
        doc.text("No pets are permitted on the Premises.", 15, y);
      }
      y += lineHeight * 2;

      // Utilities Section
      checkPage(30);
      doc.setFont("helvetica", "bold");
      doc.text("14. UTILITIES", 15, y);
      y += lineHeight;
      doc.setFont("helvetica", "normal");
      doc.text("Each Roommate shall be responsible for timely payment of assigned utilities:", 15, y);
      y += lineHeight;
      roommates.forEach(r => {
        if (r.utilities) {
          doc.text(`${r.name || '__________'}: ${r.utilities}`, 20, y);
          y += lineHeight;
        }
      });
      y += lineHeight;

      // Signatures
      checkPage(60);
      doc.setFont("helvetica", "bold");
      doc.text("IN WITNESS WHEREOF", 15, y);
      y += lineHeight;
      doc.setFont("helvetica", "normal");
      doc.text("The Roommates have executed this Agreement as of the Effective Date first written above.", 15, y);
      y += lineHeight * 2;

      doc.text("Roommate Signatures:", 15, y);
      y += lineHeight * 2;
      roommates.forEach((r, i) => {
        checkPage(25);
        doc.text(`Name: ${r.name || '__________'}`, 15, y);
        y += lineHeight;
        doc.text("Signature: ____________________________", 15, y);
        y += lineHeight;
        doc.text("Date: ____________________________", 15, y);
        y += lineHeight * 2;
      });

      // Save PDF
      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      doc.save(`roommate_agreement_${timestamp}.pdf`);

      // Generate guide PDF
      const guidePDF = generateGuidePDF({
        documentId: "roommate-agreement",
        documentTitle: "Roommate Agreement"
      });
      setTimeout(() => {
        guidePDF.save(`roommate_agreement_guide_${timestamp}.pdf`);
      }, 500);

      toast.success("Roommate Agreement and Guide PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate Roommate Agreement");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country || ''} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger><SelectValue placeholder="Select country..." /></SelectTrigger>
                  <SelectContent>
                    {getAllCountries().map((country) => (
                      <SelectItem key={country.id} value={`${country.id}:${country.name}`}>{country.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="state">State/Province</Label>
                <Select value={formData.state || ''} onValueChange={(value) => handleInputChange('state', value)} disabled={!formData.country}>
                  <SelectTrigger><SelectValue placeholder="Select state..." /></SelectTrigger>
                  <SelectContent>
                    {getStatesForCountry(formData.country).map((state) => (
                      <SelectItem key={state} value={state}>{state.split(':')[1]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="effectiveDate">Effective Date</Label>
              <Input type="date" value={formData.effectiveDate} onChange={(e) => handleInputChange('effectiveDate', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="premisesAddress">Premises Address</Label>
              <Textarea placeholder="Enter the full address of the shared premises" value={formData.premisesAddress} onChange={(e) => handleInputChange('premisesAddress', e.target.value)} />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="landlordName">Landlord Name</Label>
              <Input placeholder="Enter landlord's full name" value={formData.landlordName} onChange={(e) => handleInputChange('landlordName', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="rentalAgreementDate">Rental Agreement Date</Label>
              <Input type="date" value={formData.rentalAgreementDate} onChange={(e) => handleInputChange('rentalAgreementDate', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="leaseStartDate">Lease Start Date</Label>
                <Input type="date" value={formData.leaseStartDate} onChange={(e) => handleInputChange('leaseStartDate', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="leaseEndDate">Lease End Date</Label>
                <Input type="date" value={formData.leaseEndDate} onChange={(e) => handleInputChange('leaseEndDate', e.target.value)} />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalMonthlyRent">Total Monthly Rent ($)</Label>
                <Input type="number" placeholder="e.g., 2000" value={formData.totalMonthlyRent} onChange={(e) => handleInputChange('totalMonthlyRent', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="rentDueDay">Rent Due Day of Month</Label>
                <Input type="number" min="1" max="31" placeholder="e.g., 1" value={formData.rentDueDay} onChange={(e) => handleInputChange('rentDueDay', e.target.value)} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Roommates & Rent Shares</Label>
                {roommates.length < 6 && (
                  <Button type="button" variant="outline" size="sm" onClick={addRoommate}>
                    <Plus className="h-4 w-4 mr-1" /> Add Roommate
                  </Button>
                )}
              </div>
              {roommates.map((roommate, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Roommate {index + 1}</span>
                    {roommates.length > 2 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeRoommate(index)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Full Name</Label>
                      <Input placeholder="Enter roommate's name" value={roommate.name} onChange={(e) => handleRoommateChange(index, 'name', e.target.value)} />
                    </div>
                    <div>
                      <Label>Rent Share ($)</Label>
                      <Input type="number" placeholder="e.g., 1000" value={roommate.rentShare} onChange={(e) => handleRoommateChange(index, 'rentShare', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="totalSecurityDeposit">Total Security Deposit ($)</Label>
              <Input type="number" placeholder="e.g., 4000" value={formData.totalSecurityDeposit} onChange={(e) => handleInputChange('totalSecurityDeposit', e.target.value)} />
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Deposit & Utility Shares</Label>
              {roommates.map((roommate, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <span className="font-medium">{roommate.name || `Roommate ${index + 1}`}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Deposit Share ($)</Label>
                      <Input type="number" placeholder="e.g., 2000" value={roommate.depositShare} onChange={(e) => handleRoommateChange(index, 'depositShare', e.target.value)} />
                    </div>
                    <div>
                      <Label>Assigned Utilities</Label>
                      <Input placeholder="e.g., Electric, Internet" value={roommate.utilities} onChange={(e) => handleRoommateChange(index, 'utilities', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <Label>Are Pets Allowed?</Label>
              <Select value={formData.petsAllowed} onValueChange={(value) => handleInputChange('petsAllowed', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
              {formData.petsAllowed === 'yes' && (
                <div>
                  <Label>Pet Details</Label>
                  <Textarea placeholder="Describe pets and any specific rules" value={formData.petDetails} onChange={(e) => handleInputChange('petDetails', e.target.value)} />
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <UserInfoStep 
            onBack={handleBack}
            onGenerate={() => setIsComplete(true)}
            documentType="Roommate Agreement"
            isGenerating={isGeneratingPDF}
          />
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Location & Premises";
      case 2: return "Lease Information";
      case 3: return "Rent Details";
      case 4: return "Deposits & Utilities";
      case 5: return "Your Information";
      default: return "";
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Roommate Agreement Ready
          </CardTitle>
          <CardDescription className="text-orange-100">Your agreement is ready to be generated</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 text-black">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Agreement Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Location:</strong> {formData.state ? getStateName(formData.country.split(':')[0], formData.state.split(':')[0]) : 'Not specified'}</p>
                  <p><strong>Premises:</strong> {formData.premisesAddress}</p>
                  <p><strong>Landlord:</strong> {formData.landlordName}</p>
                  <p><strong>Lease Period:</strong> {formData.leaseStartDate} to {formData.leaseEndDate}</p>
                </div>
                <div>
                  <p><strong>Total Rent:</strong> ${formData.totalMonthlyRent}/month</p>
                  <p><strong>Security Deposit:</strong> ${formData.totalSecurityDeposit}</p>
                  <p><strong>Roommates:</strong> {roommates.filter(r => r.name).length}</p>
                  <p><strong>Pets:</strong> {formData.petsAllowed === 'yes' ? 'Allowed' : 'Not Allowed'}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-6 bg-gray-50">
          <Button variant="outline" onClick={() => setIsComplete(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Edit
          </Button>
          <Button onClick={generatePDF} disabled={isGeneratingPDF} className="bg-orange-500 hover:bg-orange-600">
            {isGeneratingPDF ? "Generating..." : "Generate PDF"}
            <FileText className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle>Roommate Agreement</CardTitle>
        <CardDescription className="text-orange-100">
          Step {currentStep} of 5: {getStepTitle()}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">{renderStepContent()}</CardContent>
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} disabled={!canAdvance()} className="bg-orange-500 hover:bg-orange-600">
          {currentStep === 5 ? "Complete" : "Next"}
          {currentStep === 5 ? <Send className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoommateAgreementForm;
