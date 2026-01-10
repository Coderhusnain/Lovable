import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, FileText, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserInfoStep from '@/components/UserInfoStep';
import CountryStateAPI from 'countries-states-cities';
import jsPDF from 'jspdf';

interface CountryData {
  id: number;
  name: string;
  iso2?: string;
  iso3?: string;
  phone_code?: string;
  capital?: string;
  currency?: string;
  native?: string;
  emoji?: string;
  emojiU?: string;
}

interface StateData {
  id: number;
  name: string;
  country_id: number;
  country_code?: string;
  country_name?: string;
  state_code?: string;
}

// Helper functions
const getAllCountries = (): CountryData[] => {
  return CountryStateAPI.getAllCountries();
};

const getStatesByCountry = (countryId: number): StateData[] => {
  return CountryStateAPI.getStatesOfCountry(countryId);
};

interface UnbundledLegalServicesAgreementFormProps {
  onBack?: () => void;
}

const UnbundledLegalServicesAgreementForm: React.FC<UnbundledLegalServicesAgreementFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const [formData, setFormData] = useState({
    // Location
    country: '',
    state: '',
    
    // Client Information
    clientName: '',
    clientAddress: '',
    clientCity: '',
    clientState: '',
    clientZip: '',
    
    // Attorney Information
    attorneyName: '',
    attorneyAddress: '',
    attorneyCity: '',
    attorneyState: '',
    attorneyZip: '',
    
    // Matter Description
    effectiveDate: '',
    matterDescription: '',
    
    // Services
    servicesToProvide: [''],
    
    // Fees
    hourlyRate: '',
    
    // Governing Law
    governingLawState: '',
    
    // Additional Terms
    additionalTerms: '',
  });

  useEffect(() => {
    const allCountries = getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (formData.country) {
      const countryStates = getStatesByCountry(parseInt(formData.country));
      setStates(countryStates);
    } else {
      setStates([]);
    }
  }, [formData.country]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...formData.servicesToProvide];
    newServices[index] = value;
    setFormData(prev => ({ ...prev, servicesToProvide: newServices }));
  };

  const addService = () => {
    setFormData(prev => ({ ...prev, servicesToProvide: [...prev.servicesToProvide, ''] }));
  };

  const removeService = (index: number) => {
    if (formData.servicesToProvide.length > 1) {
      const newServices = formData.servicesToProvide.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, servicesToProvide: newServices }));
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const generatePDF = () => {
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      let y = 20;

      const addText = (text: string, fontSize: number = 11, isBold: boolean = false, centered: boolean = false, indent: number = 0) => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        
        const lines = doc.splitTextToSize(text, maxWidth - indent);
        lines.forEach((line: string) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          if (centered) {
            doc.text(line, pageWidth / 2, y, { align: 'center' });
          } else {
            doc.text(line, margin + indent, y);
          }
          y += fontSize * 0.5;
        });
        y += 2;
      };

      // Title
      addText('UNBUNDLED LEGAL SERVICES AGREEMENT', 16, true, true);
      y += 5;

      // Introduction
      addText(`This Unbundled Legal Services Agreement ("Agreement") is entered into as of ${formData.effectiveDate}, by and between:`);
      y += 3;
      addText(`${formData.clientName} ("Client")`, 11, false, false, 10);
      addText('And', 11, false, false, 10);
      addText(`${formData.attorneyName} ("Attorney").`, 11, false, false, 10);
      y += 5;

      // 1. Purpose and Nature
      addText('1. PURPOSE AND NATURE OF AGREEMENT', 12, true);
      addText('Client desires to obtain limited legal services from Attorney, and Attorney agrees to provide such services on a limited-scope representation basis as permitted by applicable law and professional conduct rules.');
      addText('"Limited scope representation" means that Attorney\'s services are restricted solely to those specifically identified in this Agreement. Except as expressly stated herein, Attorney does not represent Client in any capacity and does not act as Client\'s attorney of record.');
      addText('The legal matter for which limited services are requested is as follows:');
      addText(formData.matterDescription, 11, false, false, 10);
      addText('(the "Matter").');
      y += 3;

      // 2. Scope of Representation
      addText('2. SCOPE OF REPRESENTATION', 12, true);
      addText('Attorney agrees to provide only the following legal services to Client:');
      const validServices = formData.servicesToProvide.filter(s => s.trim());
      validServices.forEach((service, index) => {
        addText(`${index + 1}. ${service}`, 11, false, false, 10);
      });
      addText('Attorney shall have no duty to perform any legal services beyond those specifically described above unless a written amendment to this Agreement is executed by both Parties.');
      y += 3;

      // 3. Effective Date
      addText('3. EFFECTIVE DATE', 12, true);
      addText('This Agreement shall become effective on the date it is signed by both Parties.');
      y += 3;

      // 4. Automatic Termination
      addText('4. AUTOMATIC TERMINATION', 12, true);
      addText('This Agreement shall automatically terminate upon the earlier of:');
      addText('(a) Completion of the services described in Section 2; or', 11, false, false, 10);
      addText('(b) Written termination by either Party pursuant to this Agreement.', 11, false, false, 10);
      addText('No further notice shall be required upon completion of the agreed-upon services.');
      y += 3;

      // 5. Attorney's Fees
      addText('5. ATTORNEY\'S FEES', 12, true);
      addText('Client agrees to compensate Attorney as follows:');
      addText('Hourly Fees', 11, true);
      addText(`Attorney shall bill Client at the following hourly rate: $${formData.hourlyRate} per hour.`);
      addText('Time shall be billed in increments customarily used by Attorney. Client agrees to pay for all time reasonably spent in providing the agreed-upon services.');
      y += 3;

      // 6. Costs and Expenses
      addText('6. COSTS AND EXPENSES', 12, true);
      addText('In addition to legal fees, Client agrees to pay all costs and expenses incurred in connection with the Matter, including but not limited to:');
      addText('• Filing fees', 11, false, false, 10);
      addText('• Copying and postage', 11, false, false, 10);
      addText('• Long-distance telephone charges', 11, false, false, 10);
      addText('• Courier or messenger services', 11, false, false, 10);
      addText('• Court or administrative fees', 11, false, false, 10);
      addText('Attorney shall not advance costs unless expressly agreed in writing. Client remains responsible for all expenses whether paid directly or advanced by Attorney.');
      y += 3;

      // 7. Additional Services
      addText('7. ADDITIONAL SERVICES', 12, true);
      addText('Client may request additional legal services beyond the scope of this Agreement. Attorney is under no obligation to provide additional services.');
      addText('If Attorney agrees to provide additional services, such services shall be documented in a written amendment signed by both Parties.');
      addText('If the Parties agree that Attorney will assume full representation, a new agreement or written amendment shall be executed prior to commencement of such services.');
      y += 3;

      // 8. Client Responsibilities
      addText('8. CLIENT RESPONSIBILITIES', 12, true);
      addText('Client agrees to:');
      addText('a. Provide complete, accurate, and timely information necessary for Attorney to perform the services;', 11, false, false, 10);
      addText('b. Cooperate fully with Attorney and comply with reasonable requests;', 11, false, false, 10);
      addText('c. Appear as required at meetings, hearings, or proceedings;', 11, false, false, 10);
      addText('d. Carefully consider Attorney\'s advice before making decisions;', 11, false, false, 10);
      addText('e. Maintain current contact information and notify Attorney promptly of any changes;', 11, false, false, 10);
      addText('f. Promptly forward all correspondence, pleadings, or notices related to the Matter.', 11, false, false, 10);
      y += 3;

      // 9. Termination
      addText('9. TERMINATION OF REPRESENTATION', 12, true);
      addText('9.1 Termination by Client', 11, true);
      addText('Client may terminate this Agreement at any time by written notice. Client remains responsible for all fees and costs incurred prior to termination.');
      addText('9.2 Termination by Attorney', 11, true);
      addText('Attorney may terminate this Agreement for good cause, including but not limited to:');
      addText('• Client\'s failure to cooperate;', 11, false, false, 10);
      addText('• Nonpayment of fees or costs;', 11, false, false, 10);
      addText('• Conflict of interest;', 11, false, false, 10);
      addText('• Ethical obligations requiring withdrawal.', 11, false, false, 10);
      addText('Upon termination, Attorney shall have no further obligation to provide services beyond those required by law.');
      y += 3;

      // 10. Client's Informed Consent
      addText('10. CLIENT\'S INFORMED CONSENT', 12, true);
      addText('Client acknowledges and agrees that:');
      addText('• Client has read and understands this Agreement;', 11, false, false, 10);
      addText('• Client understands the limitations of unbundled legal services;', 11, false, false, 10);
      addText('• Client understands that Attorney will not provide ongoing representation unless expressly agreed in writing;', 11, false, false, 10);
      addText('• Client has had the opportunity to ask questions and seek clarification before signing.', 11, false, false, 10);
      y += 3;

      // 11. No Guarantee
      addText('11. NO GUARANTEE OF OUTCOME', 12, true);
      addText('Attorney makes no representations or guarantees regarding the outcome of Client\'s legal matter. All opinions expressed are professional judgments only.');
      y += 3;

      // 12. Governing Law
      addText('12. GOVERNING LAW', 12, true);
      addText(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLawState}.`);
      y += 3;

      // 13. Entire Agreement
      addText('13. ENTIRE AGREEMENT', 12, true);
      addText('This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements, representations, or understandings, whether oral or written.');
      y += 3;

      // 14. Amendments
      addText('14. AMENDMENTS', 12, true);
      addText('This Agreement may be amended only by a written document signed by both Parties.');
      y += 3;

      // 15. Severability
      addText('15. SEVERABILITY', 12, true);
      addText('If any provision of this Agreement is found unenforceable, the remaining provisions shall remain in full force and effect.');
      y += 3;

      // Additional Terms
      if (formData.additionalTerms) {
        addText('16. ADDITIONAL TERMS', 12, true);
        addText(formData.additionalTerms);
        y += 3;
      }

      // Signatures
      y += 10;
      addText('16. SIGNATURES', 12, true);
      addText('IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.');
      y += 10;

      addText('CLIENT', 11, true);
      y += 3;
      addText('Signature: _______________________________');
      addText(`Name: ${formData.clientName}`);
      addText(`Date: ${formData.effectiveDate}`);
      y += 10;

      addText('ATTORNEY', 11, true);
      y += 3;
      addText('Signature: _______________________________');
      addText(`Name: ${formData.attorneyName}`);
      addText('Date: _______________________________');

      doc.save('unbundled-legal-services-agreement.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Location Information</h2>
            <p className="text-gray-600">Select the jurisdiction for this Unbundled Legal Services Agreement.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id.toString()}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="state">State/Province *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state/province" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id.toString()}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Party Information</h2>
            <p className="text-gray-600">Enter the client and attorney details.</p>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Client Information</h3>
              
              <div>
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Enter client's full name"
                />
              </div>

              <div>
                <Label htmlFor="clientAddress">Street Address</Label>
                <Input
                  id="clientAddress"
                  value={formData.clientAddress}
                  onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="clientCity">City</Label>
                  <Input
                    id="clientCity"
                    value={formData.clientCity}
                    onChange={(e) => handleInputChange('clientCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="clientState">State</Label>
                  <Input
                    id="clientState"
                    value={formData.clientState}
                    onChange={(e) => handleInputChange('clientState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="clientZip">ZIP Code</Label>
                  <Input
                    id="clientZip"
                    value={formData.clientZip}
                    onChange={(e) => handleInputChange('clientZip', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <h3 className="font-medium text-gray-700 pt-4">Attorney Information</h3>

              <div>
                <Label htmlFor="attorneyName">Attorney Name *</Label>
                <Input
                  id="attorneyName"
                  value={formData.attorneyName}
                  onChange={(e) => handleInputChange('attorneyName', e.target.value)}
                  placeholder="Enter attorney's full name"
                />
              </div>

              <div>
                <Label htmlFor="attorneyAddress">Street Address</Label>
                <Input
                  id="attorneyAddress"
                  value={formData.attorneyAddress}
                  onChange={(e) => handleInputChange('attorneyAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="attorneyCity">City</Label>
                  <Input
                    id="attorneyCity"
                    value={formData.attorneyCity}
                    onChange={(e) => handleInputChange('attorneyCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="attorneyState">State</Label>
                  <Input
                    id="attorneyState"
                    value={formData.attorneyState}
                    onChange={(e) => handleInputChange('attorneyState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="attorneyZip">ZIP Code</Label>
                  <Input
                    id="attorneyZip"
                    value={formData.attorneyZip}
                    onChange={(e) => handleInputChange('attorneyZip', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Matter & Services</h2>
            <p className="text-gray-600">Define the legal matter and scope of services.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="effectiveDate">Effective Date *</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => handleInputChange('effectiveDate', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="matterDescription">Matter Description *</Label>
                <Textarea
                  id="matterDescription"
                  value={formData.matterDescription}
                  onChange={(e) => handleInputChange('matterDescription', e.target.value)}
                  placeholder="Describe the legal matter (e.g., 'Contract dispute regarding purchase agreement dated January 15, 2024')"
                  rows={3}
                />
              </div>

              <h3 className="font-medium text-gray-700 pt-4">Services to Be Provided</h3>
              <p className="text-sm text-gray-500">List the specific legal services the attorney will provide.</p>

              {formData.servicesToProvide.map((service, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={service}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    placeholder={`Service ${index + 1} (e.g., "Draft demand letter")`}
                  />
                  {formData.servicesToProvide.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeService(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button type="button" variant="outline" onClick={addService} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Service
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Fees & Terms</h2>
            <p className="text-gray-600">Define the fee structure and governing terms.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  placeholder="e.g., 350"
                />
              </div>

              <div>
                <Label htmlFor="governingLawState">Governing Law State *</Label>
                <Input
                  id="governingLawState"
                  value={formData.governingLawState}
                  onChange={(e) => handleInputChange('governingLawState', e.target.value)}
                  placeholder="Enter the state whose laws will govern this agreement"
                />
              </div>

              <div className="pt-4">
                <Label htmlFor="additionalTerms">Additional Terms (Optional)</Label>
                <Textarea
                  id="additionalTerms"
                  value={formData.additionalTerms}
                  onChange={(e) => handleInputChange('additionalTerms', e.target.value)}
                  placeholder="Enter any additional terms or special provisions..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <UserInfoStep
            onBack={prevStep}
            onGenerate={generatePDF}
            documentType="Unbundled Legal Services Agreement"
            isGenerating={isGenerating}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Documents
        </Button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Unbundled Legal Services Agreement</h1>
            <p className="text-gray-600">Create an unbundled (limited scope) legal services agreement</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 5 && (
                <div className={`w-16 h-1 mx-2 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {renderStepContent()}

        {step < 5 && (
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={prevStep} disabled={step === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={nextStep}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnbundledLegalServicesAgreementForm;
