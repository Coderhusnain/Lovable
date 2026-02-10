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

interface AttorneyEngagementLetterFormProps {
  onBack?: () => void;
}

const AttorneyEngagementLetterForm: React.FC<AttorneyEngagementLetterFormProps> = ({ onBack }) => {
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
    
    // Matter Details
    effectiveDate: '',
    matterDescription: '',
    
    // Fee Structure
    feeType: 'flat',
    flatFee: '',
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

    const addText = (
      text: string,
      fontSize: number = 11,
      isBold: boolean = false,
      centered: boolean = false,
      indent: number = 0
    ) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      const lines = doc.splitTextToSize(text, maxWidth - indent);
      lines.forEach(line => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        if (centered) {
          doc.text(line, pageWidth / 2, y, { align: 'center' });
        } else {
          doc.text(line, margin + indent, y);
        }
        y += fontSize * 0.5 + 2;
      });
      y += 2;
    };

    // === PDF CONTENT ===
    addText('ATTORNEY ENGAGEMENT LETTER', 16, true, true);
    addText(`Effective Date: ${formData.effectiveDate || '________'}`, 11, false, true);
    y += 5;

    addText(`This Attorney Engagement Letter ("Agreement") is entered into by and between:`);
    addText(`${formData.attorneyName || '________'}, Attorney ("Attorney")`, 11, false, false, 10);
    addText(`${formData.clientName || '________'}, Client ("Client")`, 11, false, false, 10);
    addText('Attorney and Client may be referred to individually as a "Party" and collectively as the "Parties".');
    y += 5;

    // 1. Scope of Services
    addText('1. SCOPE OF LEGAL SERVICES', 12, true);
    addText('Attorney agrees to provide legal services to Client in connection with the following matter(s):');
    addText(formData.matterDescription || '________', 11, false, false, 10);
    addText('Attorney shall provide the Services in a professional and competent manner.');
    y += 3;

    // 2. Responsibilities
    addText('2. RESPONSIBILITIES OF THE PARTIES', 12, true);
    addText('2.1 Attorney Responsibilities', 11, true);
    addText('Attorney shall:');
    ['Perform the Services competently and diligently;',
     'Keep Client reasonably informed;',
     'Respond to Client inquiries in a timely manner;',
     'Provide legal advice consistent with applicable law'].forEach(line => addText(`• ${line}`, 11, false, false, 10));
    y += 2;

    addText('2.2 Client Responsibilities', 11, true);
    ['Provide truthful, accurate, and complete information;',
     'Cooperate fully with Attorney;',
     'Keep Attorney informed of changes;',
     'Promptly review and respond to communications;',
     'Timely pay all fees and costs'].forEach(line => addText(`• ${line}`, 11, false, false, 10));
    y += 3;

    // 3. Compensation
    addText('3. COMPENSATION', 12, true);
    if (formData.feeType === 'flat') {
      addText('3.1 Flat Fee', 11, true);
      addText(`Client agrees to pay Attorney a flat fee of $${formData.flatFee || '________'}.`);
    } else {
      addText('3.1 Hourly Fee', 11, true);
      addText(`Client agrees to pay Attorney at $${formData.hourlyRate || '________'} per hour.`);
    }
    addText('3.2 Scope of Fees', 11, true);
    ['Client conferences',
     'Court appearances',
     'Preparation of pleadings and documents',
     'Legal research',
     'Correspondence and communications'].forEach(line => addText(`• ${line}`, 11, false, false, 10));
    y += 3;

    // 4. Payment Terms
    addText('4. PAYMENT TERMS', 12, true);
    addText('Payment is due upon receipt of invoice. Increases in billing rates require 30 days notice.');
    y += 3;

    // 5. Costs and Expenses
    addText('5. COSTS AND EXPENSES', 12, true);
    ['Court filing fees', 'Deposition costs', 'Expert witness fees', 'Investigation expenses', 
     'Long-distance charges', 'Courier services', 'Photocopying', 'Process server fees']
      .forEach(line => addText(`• ${line}`, 11, false, false, 10));
    addText('Attorney may advance costs on Client\'s behalf.');
    y += 3;

    // 6. Governing Law
    addText('6. GOVERNING LAW', 12, true);
    addText(`This Agreement is governed by the laws of the State of ${formData.governingLawState || '________'}.`);
    y += 3;

    // 7. Additional Terms
    if (formData.additionalTerms) {
      addText('7. ADDITIONAL TERMS', 12, true);
      addText(formData.additionalTerms);
      y += 3;
    }

    // 8. Signatures
    addText('8. SIGNATURES', 12, true);
    addText('IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.');
    y += 10;

    ['ATTORNEY', 'CLIENT'].forEach(party => {
      addText(party, 11, true);
      y += 3;
      addText('Signature: _______________________________');
      addText(`Name: ${party === 'ATTORNEY' ? formData.attorneyName || '________' : formData.clientName || '________'}`);
      addText(`Date: ${formData.effectiveDate || '________'}`);
      y += 10;
    });

    doc.save('Attorney-Engagement-Letter.pdf');
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
            <p className="text-gray-600">Select the jurisdiction for this Attorney Engagement Letter.</p>
            
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
            <h2 className="text-xl font-semibold text-gray-800">Matter Details</h2>
            <p className="text-gray-600">Define the legal matter for this engagement.</p>
            
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
                  placeholder="Describe the legal matter(s) for this engagement (e.g., 'Representation in personal injury claim arising from automobile accident on March 15, 2024')"
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
            <p className="text-gray-600">Define the compensation terms.</p>
            
            <div className="space-y-4">
              <div>
                <Label>Fee Type *</Label>
                <Select value={formData.feeType} onValueChange={(value) => handleInputChange('feeType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat Fee</SelectItem>
                    <SelectItem value="hourly">Hourly Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.feeType === 'flat' ? (
                <div>
                  <Label htmlFor="flatFee">Flat Fee Amount ($) *</Label>
                  <Input
                    id="flatFee"
                    type="number"
                    value={formData.flatFee}
                    onChange={(e) => handleInputChange('flatFee', e.target.value)}
                    placeholder="e.g., 5000"
                  />
                </div>
              ) : (
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
              )}

              <div className="pt-4">
                <Label htmlFor="additionalTerms">Additional Terms (Optional)</Label>
                <Textarea
                  id="additionalTerms"
                  value={formData.additionalTerms}
                  onChange={(e) => handleInputChange('additionalTerms', e.target.value)}
                  placeholder="Enter any additional terms, retainer requirements, or special provisions..."
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
            documentType="Attorney Engagement Letter"
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
            <h1 className="text-2xl font-bold text-gray-900">Attorney Engagement Letter</h1>
            <p className="text-gray-600">Create an attorney-client engagement letter</p>
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

export default AttorneyEngagementLetterForm;
