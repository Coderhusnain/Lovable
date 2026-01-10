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

interface LimitedScopeRepresentationAgreementFormProps {
  onBack?: () => void;
}

const LimitedScopeRepresentationAgreementForm: React.FC<LimitedScopeRepresentationAgreementFormProps> = ({ onBack }) => {
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
    excludedServices: [''],
    
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

  const handleServiceChange = (type: 'servicesToProvide' | 'excludedServices', index: number, value: string) => {
    const newServices = [...formData[type]];
    newServices[index] = value;
    setFormData(prev => ({ ...prev, [type]: newServices }));
  };

  const addService = (type: 'servicesToProvide' | 'excludedServices') => {
    setFormData(prev => ({ ...prev, [type]: [...prev[type], ''] }));
  };

  const removeService = (type: 'servicesToProvide' | 'excludedServices', index: number) => {
    if (formData[type].length > 1) {
      const newServices = formData[type].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [type]: newServices }));
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
      addText('LIMITED SCOPE REPRESENTATION AGREEMENT', 16, true, true);
      y += 5;

      // Introduction
      addText(`This Limited Scope Representation Agreement ("Agreement") is entered into as of ${formData.effectiveDate}, by and between:`);
      y += 3;
      addText(`${formData.clientName}, of ${formData.clientAddress}, ${formData.clientCity}, ${formData.clientState} ${formData.clientZip} ("Client"),`, 11, false, false, 10);
      addText('And', 11, false, false, 10);
      addText(`${formData.attorneyName}, of ${formData.attorneyAddress}, ${formData.attorneyCity}, ${formData.attorneyState} ${formData.attorneyZip} ("Attorney").`, 11, false, false, 10);
      y += 3;
      addText('The Client and Attorney may be referred to individually as a "Party" and collectively as the "Parties."');
      y += 5;

      // I. Purpose and Nature
      addText('I. PURPOSE AND NATURE OF REPRESENTATION', 12, true);
      addText('The Client seeks legal assistance, and the Attorney agrees to provide such assistance on a limited scope basis, as permitted by applicable law and rules of professional conduct.');
      addText('"Limited scope representation" means that the Attorney\'s representation of the Client is restricted solely to the specific legal services described in this Agreement, and the Attorney shall not represent the Client in any other capacity or matter unless expressly agreed to in writing.');
      addText('The Client requests limited legal services in connection with the following matter:');
      addText(formData.matterDescription, 11, false, false, 10);
      addText('(the "Matter").');
      y += 3;

      // II. Scope of Representation
      addText('II. SCOPE OF REPRESENTATION', 12, true);
      addText('A. Services to Be Provided', 11, true);
      addText('The Attorney agrees to provide only the following legal services:');
      const validServices = formData.servicesToProvide.filter(s => s.trim());
      validServices.forEach((service, index) => {
        addText(`${index + 1}. ${service}`, 11, false, false, 10);
      });
      y += 2;

      addText('B. Excluded Services', 11, true);
      addText('The Attorney shall not provide any legal services beyond those expressly listed above. Excluded services include, but are not limited to:');
      const validExcluded = formData.excludedServices.filter(s => s.trim());
      validExcluded.forEach((service) => {
        addText(`• ${service}`, 11, false, false, 10);
      });
      addText('Any service not expressly listed above is excluded from the scope of this Agreement.');
      y += 3;

      // III. Effective Date
      addText('III. EFFECTIVE DATE', 12, true);
      addText('This Agreement shall become effective on the date it is signed by both Parties.');
      y += 3;

      // IV. Term and Termination
      addText('IV. TERM AND TERMINATION', 12, true);
      addText('This Agreement shall automatically terminate upon completion of the agreed-upon services, without the need for further notice by either Party.');
      y += 3;

      // V. Attorney's Fees
      addText('V. ATTORNEY\'S FEES', 12, true);
      addText('A. Hourly Fees', 11, true);
      addText(`The Client agrees to pay the Attorney for services rendered under this Agreement at the following hourly rate: $${formData.hourlyRate} per hour.`);
      addText('Time shall be billed in reasonable increments consistent with the Attorney\'s billing practices.');
      y += 3;

      // VI. Costs and Expenses
      addText('VI. COSTS AND EXPENSES', 12, true);
      addText('In addition to legal fees, the Client agrees to pay all costs and expenses incurred in connection with the Matter, including but not limited to:');
      addText('• Filing and court fees', 11, false, false, 10);
      addText('• Postage and delivery charges', 11, false, false, 10);
      addText('• Copying and printing costs', 11, false, false, 10);
      addText('• Long-distance communications', 11, false, false, 10);
      addText('• Investigation or research expenses', 11, false, false, 10);
      addText('The Attorney will not advance costs unless expressly agreed in writing. Any costs advanced shall be reimbursed promptly upon invoicing.');
      y += 3;

      // VII. Additional Services
      addText('VII. ADDITIONAL SERVICES', 12, true);
      addText('The Client may request additional legal services beyond the scope of this Agreement. The Attorney is under no obligation to provide additional services.');
      addText('If the Attorney agrees to provide additional services, such services must be documented in a written amendment signed by both Parties. If full representation is later agreed upon, a separate engagement agreement or amendment shall be executed.');
      y += 3;

      // VIII. Client Responsibilities
      addText('VIII. CLIENT RESPONSIBILITIES', 12, true);
      addText('The Client agrees to:');
      addText('• Provide complete, accurate, and timely information;', 11, false, false, 10);
      addText('• Cooperate fully with the Attorney;', 11, false, false, 10);
      addText('• Appear as requested for meetings, hearings, or proceedings;', 11, false, false, 10);
      addText('• Carefully consider the Attorney\'s advice before making decisions;', 11, false, false, 10);
      addText('• Maintain current contact information and promptly notify the Attorney of changes;', 11, false, false, 10);
      addText('• Provide copies of all relevant documents, notices, or correspondence.', 11, false, false, 10);
      addText('The Client acknowledges that the Attorney\'s ability to provide effective services depends upon the Client\'s cooperation.');
      y += 3;

      // IX. Termination of Representation
      addText('IX. TERMINATION OF REPRESENTATION', 12, true);
      addText('A. Termination by Client', 11, true);
      addText('The Client may terminate this Agreement at any time, with or without cause, by written notice. The Client remains responsible for payment of all fees and costs incurred prior to termination.');
      addText('B. Termination by Attorney', 11, true);
      addText('The Attorney may terminate this Agreement if:');
      addText('• The Client fails to fulfill material obligations;', 11, false, false, 10);
      addText('• The Client fails to pay fees or costs;', 11, false, false, 10);
      addText('• Continued representation would violate ethical rules;', 11, false, false, 10);
      addText('• Other good cause exists under applicable law.', 11, false, false, 10);
      y += 3;

      // X. Client's Informed Consent
      addText('X. CLIENT\'S INFORMED CONSENT', 12, true);
      addText('The Client acknowledges that:');
      addText('• The Client has read and understands this Agreement;', 11, false, false, 10);
      addText('• The scope of representation is limited;', 11, false, false, 10);
      addText('• The Attorney is not responsible for matters outside the stated scope;', 11, false, false, 10);
      addText('• The Client has had the opportunity to ask questions and seek clarification;', 11, false, false, 10);
      addText('• The Client knowingly consents to limited representation.', 11, false, false, 10);
      y += 3;

      // XI. No Guarantee
      addText('XI. NO GUARANTEE OF OUTCOME', 12, true);
      addText('The Attorney makes no promise or guarantee regarding the outcome of the Matter. All legal opinions are professional judgments only.');
      y += 3;

      // XII. Governing Law
      addText('XII. GOVERNING LAW', 12, true);
      addText(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLawState}.`);
      y += 3;

      // XIII. Entire Agreement
      addText('XIII. ENTIRE AGREEMENT', 12, true);
      addText('This Agreement constitutes the entire understanding between the Parties and supersedes all prior agreements or communications, whether oral or written.');
      y += 3;

      // XIV. Amendments
      addText('XIV. AMENDMENTS', 12, true);
      addText('This Agreement may be amended only by a written document signed by both Parties.');
      y += 3;

      // XV. Severability
      addText('XV. SEVERABILITY', 12, true);
      addText('If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.');
      y += 3;

      // Additional Terms
      if (formData.additionalTerms) {
        addText('XVI. ADDITIONAL TERMS', 12, true);
        addText(formData.additionalTerms);
        y += 3;
      }

      // Signatures
      y += 10;
      addText('XVI. SIGNATURES', 12, true);
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

      doc.save('limited-scope-representation-agreement.pdf');
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
            <p className="text-gray-600">Select the jurisdiction for this Limited Scope Representation Agreement.</p>
            
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
                <Label htmlFor="clientAddress">Street Address *</Label>
                <Input
                  id="clientAddress"
                  value={formData.clientAddress}
                  onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="clientCity">City *</Label>
                  <Input
                    id="clientCity"
                    value={formData.clientCity}
                    onChange={(e) => handleInputChange('clientCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="clientState">State *</Label>
                  <Input
                    id="clientState"
                    value={formData.clientState}
                    onChange={(e) => handleInputChange('clientState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="clientZip">ZIP Code *</Label>
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
                <Label htmlFor="attorneyAddress">Street Address *</Label>
                <Input
                  id="attorneyAddress"
                  value={formData.attorneyAddress}
                  onChange={(e) => handleInputChange('attorneyAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="attorneyCity">City *</Label>
                  <Input
                    id="attorneyCity"
                    value={formData.attorneyCity}
                    onChange={(e) => handleInputChange('attorneyCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="attorneyState">State *</Label>
                  <Input
                    id="attorneyState"
                    value={formData.attorneyState}
                    onChange={(e) => handleInputChange('attorneyState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="attorneyZip">ZIP Code *</Label>
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
            <p className="text-gray-600">Define the legal matter and scope of representation.</p>
            
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
                  placeholder="Describe the legal matter (e.g., 'Divorce proceedings in Case No. 12345, Smith v. Smith')"
                  rows={3}
                />
              </div>

              <h3 className="font-medium text-gray-700 pt-4">Services to Be Provided</h3>
              <p className="text-sm text-gray-500">List the specific legal services the attorney will provide.</p>

              {formData.servicesToProvide.map((service, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={service}
                    onChange={(e) => handleServiceChange('servicesToProvide', index, e.target.value)}
                    placeholder={`Service ${index + 1} (e.g., "Review and draft response to motion")`}
                  />
                  {formData.servicesToProvide.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeService('servicesToProvide', index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button type="button" variant="outline" onClick={() => addService('servicesToProvide')} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Service
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Excluded Services & Fees</h2>
            <p className="text-gray-600">Define excluded services and fee structure.</p>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Excluded Services</h3>
              <p className="text-sm text-gray-500">List services that are NOT included in this agreement.</p>

              {formData.excludedServices.map((service, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={service}
                    onChange={(e) => handleServiceChange('excludedServices', index, e.target.value)}
                    placeholder={`Excluded service ${index + 1} (e.g., "Court appearances")`}
                  />
                  {formData.excludedServices.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeService('excludedServices', index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button type="button" variant="outline" onClick={() => addService('excludedServices')} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Excluded Service
              </Button>

              <h3 className="font-medium text-gray-700 pt-4">Fee Structure</h3>

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
            documentType="Limited Scope Representation Agreement"
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
            <h1 className="text-2xl font-bold text-gray-900">Limited Scope Representation Agreement</h1>
            <p className="text-gray-600">Create a limited scope legal representation agreement</p>
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

export default LimitedScopeRepresentationAgreementForm;
