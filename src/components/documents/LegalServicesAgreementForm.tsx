import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
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

const getCountryName = (countryId: number): string => {
  const countries = getAllCountries();
  const country = countries.find(c => c.id === countryId);
  return country ? country.name : '';
};

const getStateName = (countryId: number, stateId: number): string => {
  const states = getStatesByCountry(countryId);
  const state = states.find(s => s.id === stateId);
  return state ? state.name : '';
};

interface LegalServicesAgreementFormProps {
  onBack?: () => void;
}

const LegalServicesAgreementForm: React.FC<LegalServicesAgreementFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const [formData, setFormData] = useState({
    // Location
    country: '',
    state: '',
    
    // Attorney Information
    attorneyName: '',
    attorneyAddress: '',
    attorneyCity: '',
    attorneyState: '',
    attorneyZip: '',
    attorneyBarNumber: '',
    
    // Client Information
    clientName: '',
    clientAddress: '',
    clientCity: '',
    clientState: '',
    clientZip: '',
    
    // Service Details
    effectiveDate: '',
    scopeOfServices: '',
    
    // Fee Structure
    hourlyRate: '',
    minimumBillingIncrement: '0.1',
    
    // Governing Law State
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
      addText('LEGAL SERVICES AGREEMENT', 16, true, true);
      y += 5;

      // Introduction
      addText(`This Legal Services Agreement ("Agreement") is entered into as of ${formData.effectiveDate} ("Effective Date"), by and between:`);
      y += 3;
      addText(`Attorney: ${formData.attorneyName}`, 11, false, false, 10);
      addText('and', 11, false, false, 10);
      addText(`Client: ${formData.clientName}`, 11, false, false, 10);
      y += 3;
      addText('(collectively referred to as the "Parties").');
      y += 5;

      // 1. Scope of Legal Services
      addText('1. SCOPE OF LEGAL SERVICES', 12, true);
      addText('The Attorney agrees to provide legal services to the Client in connection with the following matter(s):');
      addText(formData.scopeOfServices, 11, false, false, 10);
      addText('(collectively, the "Services").');
      addText('Any additional legal services not described above shall require separate authorization and may be subject to additional fees.');
      y += 3;

      // 2. Responsibilities
      addText('2. RESPONSIBILITIES OF THE PARTIES', 12, true);
      y += 2;
      addText('2.1 Attorney Responsibilities', 11, true);
      addText('The Attorney agrees to:');
      addText('• Perform legal services competently and professionally in accordance with applicable ethical standards;', 11, false, false, 10);
      addText('• Keep the Client reasonably informed regarding the status of the matter;', 11, false, false, 10);
      addText('• Respond to Client inquiries within a reasonable time; and', 11, false, false, 10);
      addText('• Provide legal advice and representation consistent with the Client\'s best interests.', 11, false, false, 10);
      y += 2;

      addText('2.2 Client Responsibilities', 11, true);
      addText('The Client agrees to:');
      addText('• Provide truthful, complete, and accurate information to the Attorney;', 11, false, false, 10);
      addText('• Cooperate fully in the handling of the matter;', 11, false, false, 10);
      addText('• Keep the Attorney informed of current contact information;', 11, false, false, 10);
      addText('• Timely review and respond to communications; and', 11, false, false, 10);
      addText('• Promptly pay all fees and costs in accordance with this Agreement.', 11, false, false, 10);
      y += 3;

      // 3. Fees and Compensation
      addText('3. FEES AND COMPENSATION', 12, true);
      y += 2;
      addText('3.1 Hourly Rates', 11, true);
      addText(`The Client agrees to pay the Attorney for legal services at the following rate: $${formData.hourlyRate} per hour.`);
      addText(`Time shall be billed in increments of one-tenth (${formData.minimumBillingIncrement}) of an hour, rounded to the nearest tenth. The minimum charge for any task shall be one-tenth (0.1) of an hour.`);
      y += 2;

      addText('3.2 Billable Activities', 11, true);
      addText('Billable services include, but are not limited to:');
      addText('• Client conferences and consultations', 11, false, false, 10);
      addText('• Court appearances and hearings', 11, false, false, 10);
      addText('• Depositions and preparation', 11, false, false, 10);
      addText('• Legal research and drafting', 11, false, false, 10);
      addText('• Correspondence and communications', 11, false, false, 10);
      addText('• Document preparation and review', 11, false, false, 10);
      addText('• Telephone calls and emails', 11, false, false, 10);
      addText('If more than one attorney or staff member works on the matter simultaneously, each person\'s time shall be billed at their applicable hourly rate.');
      y += 3;

      // 4. Payment Terms
      addText('4. PAYMENT TERMS', 12, true);
      addText('4.1 Payment is due upon receipt of each invoice.');
      addText('4.2 The Attorney reserves the right to require advance payment or retainers as deemed appropriate.');
      addText('4.3 If the Attorney increases hourly rates during the term of this Agreement, the increased rate shall apply only to services rendered thirty (30) days after written notice to the Client.');
      addText('4.4 If the Client does not agree to the revised rate, the Client may terminate this Agreement by providing written notice and executing a substitution of attorney.');
      y += 3;

      // 5. Costs and Expenses
      addText('5. COSTS AND EXPENSES', 12, true);
      addText('The Client agrees to pay all costs incurred in connection with legal representation, including but not limited to:');
      addText('• Court filing fees', 11, false, false, 10);
      addText('• Deposition and transcript costs', 11, false, false, 10);
      addText('• Expert witness fees', 11, false, false, 10);
      addText('• Investigation expenses', 11, false, false, 10);
      addText('• Messenger and courier services', 11, false, false, 10);
      addText('• Long-distance communications', 11, false, false, 10);
      addText('• Photocopying and document production', 11, false, false, 10);
      addText('• Process server fees', 11, false, false, 10);
      addText('The Attorney may advance costs on the Client\'s behalf, which shall be reimbursed upon invoicing.');
      y += 3;

      // 6. Termination
      addText('6. TERMINATION OF REPRESENTATION', 12, true);
      addText('6.1 Either Party may terminate this Agreement at any time upon written notice.');
      addText('6.2 Upon termination, the Client shall remain responsible for payment of all fees and costs incurred up to the effective date of termination.');
      addText('6.3 Upon termination and payment of all outstanding balances, the Attorney shall take reasonable steps to transfer the Client\'s file as required by law.');
      y += 3;

      // 7. Governing Law
      addText('7. GOVERNING LAW', 12, true);
      addText(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLawState}.`);
      y += 3;

      // 8. Entire Agreement
      addText('8. ENTIRE AGREEMENT', 12, true);
      addText('This Agreement constitutes the entire agreement between the Parties and supersedes all prior oral or written agreements or understandings regarding the subject matter herein.');
      y += 3;

      // 9. Amendments
      addText('9. AMENDMENTS', 12, true);
      addText('This Agreement may be amended only by a written document signed by both Parties.');
      y += 3;

      // 10. Severability
      addText('10. SEVERABILITY', 12, true);
      addText('If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.');
      y += 3;

      // 11. Effective Date
      addText('11. EFFECTIVE DATE', 12, true);
      addText('This Agreement shall become effective as of the date first written above.');
      y += 3;

      // Additional Terms
      if (formData.additionalTerms) {
        addText('12. ADDITIONAL TERMS', 12, true);
        addText(formData.additionalTerms);
        y += 3;
      }

      // Signatures
      y += 10;
      addText('12. SIGNATURES', 12, true);
      addText('IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.');
      y += 10;

      addText('ATTORNEY', 11, true);
      y += 3;
      addText('Signature: _______________________________');
      addText(`Name: ${formData.attorneyName}`);
      addText(`Date: ${formData.effectiveDate}`);
      y += 10;

      addText('CLIENT', 11, true);
      y += 3;
      addText('Signature: _______________________________');
      addText(`Name: ${formData.clientName}`);
      addText('Date: _______________________________');

      doc.save('legal-services-agreement.pdf');
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
            <p className="text-gray-600">Select the jurisdiction for this Legal Services Agreement.</p>
            
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
            <p className="text-gray-600">Enter the attorney and client details.</p>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Attorney Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="attorneyBarNumber">Bar Number (Optional)</Label>
                  <Input
                    id="attorneyBarNumber"
                    value={formData.attorneyBarNumber}
                    onChange={(e) => handleInputChange('attorneyBarNumber', e.target.value)}
                    placeholder="Enter bar number"
                  />
                </div>
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

              <h3 className="font-medium text-gray-700 pt-4">Client Information</h3>

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
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Service Details</h2>
            <p className="text-gray-600">Define the scope of legal services.</p>
            
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
                <Label htmlFor="scopeOfServices">Scope of Services *</Label>
                <Textarea
                  id="scopeOfServices"
                  value={formData.scopeOfServices}
                  onChange={(e) => handleInputChange('scopeOfServices', e.target.value)}
                  placeholder="Describe the legal matters the attorney will handle (e.g., 'Representation in civil litigation case Smith v. Jones, Case No. 12345')"
                  rows={5}
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
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Fee Structure</h2>
            <p className="text-gray-600">Define the billing rates and payment terms.</p>
            
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
                <Label htmlFor="minimumBillingIncrement">Minimum Billing Increment (hours)</Label>
                <Select value={formData.minimumBillingIncrement} onValueChange={(value) => handleInputChange('minimumBillingIncrement', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.1">0.1 (6 minutes)</SelectItem>
                    <SelectItem value="0.25">0.25 (15 minutes)</SelectItem>
                    <SelectItem value="0.5">0.5 (30 minutes)</SelectItem>
                  </SelectContent>
                </Select>
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
            documentType="Legal Services Agreement"
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
            <h1 className="text-2xl font-bold text-gray-900">Legal Services Agreement</h1>
            <p className="text-gray-600">Create an attorney-client legal services agreement</p>
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

export default LegalServicesAgreementForm;
