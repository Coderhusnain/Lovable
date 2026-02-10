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
}

interface StateData {
  id: number;
  name: string;
  country_id: number;
}

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

interface AffidavitGeneralFormProps {
  onBack?: () => void;
}

const AffidavitGeneralForm: React.FC<AffidavitGeneralFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const [formData, setFormData] = useState({
    // Location
    country: '',
    state: '',
    county: '',
    
    // Affiant Information
    affiantName: '',
    affiantAddress: '',
    affiantCity: '',
    affiantState: '',
    affiantZip: '',
    affiantPhone: '',
    
    // Statement Details
    statementDate: '',
    statementContent: '',
    statementPurpose: '',
    
    // Witness Information (Optional)
    witnessName: '',
    witnessAddress: '',
    
    // Notary Information
    notaryCounty: '',
    notaryState: '',
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

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const generatePDF = () => {
  setIsGenerating(true);
  
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 25;
    const textWidth = pageWidth - 2 * margin;
    let y = 20;

    const addParagraph = (text: string, bold = false) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(text, textWidth);
      doc.text(lines, margin, y);
      y += lines.length * 6 + 2;
    };

    const addField = (label: string, value: string, minWidth = 80) => {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text(label, margin, y);
      const startX = margin + doc.getTextWidth(label) + 2;
      doc.text(value || '', startX, y);
      const width = value ? doc.getTextWidth(value) : minWidth;
      doc.line(startX, y + 1, startX + width, y + 1);
      y += 8;
    };

    // === Use formData here ===
    addParagraph('GENERAL AFFIDAVIT', true);
    addParagraph(`STATE OF ${formData.affiantState?.toUpperCase() || ''}`, true);
    addParagraph(`COUNTY OF ${formData.county?.toUpperCase() || formData.notaryCounty?.toUpperCase() || ''}`, true);
    addParagraph(`I, ${formData.affiantName || '________'}, being of legal age and first duly sworn upon my oath, do hereby depose and state as follows:`);
    
    addParagraph('1. AFFIANT INFORMATION', true);
    addField('Full Name:', formData.affiantName);
    addField('Address:', `${formData.affiantAddress}, ${formData.affiantCity}, ${formData.affiantState} ${formData.affiantZip}`);
    if (formData.affiantPhone) addField('Phone:', formData.affiantPhone);

    if (formData.statementPurpose) {
      addParagraph('2. PURPOSE OF THIS AFFIDAVIT', true);
      addParagraph(formData.statementPurpose);
    }

    addParagraph('3. STATEMENT OF FACTS', true);
    addParagraph(formData.statementContent || '________');

    addParagraph('4. AFFIRMATION', true);
    addParagraph('I hereby declare under penalty of perjury that the foregoing statements are true and correct to the best of my knowledge, information, and belief.');

    addParagraph('FURTHER AFFIANT SAYETH NOT.', true);

    addField('Signature:', formData.affiantName);
    addField('Date:', formData.statementDate || '________');

    if (formData.witnessName) {
      addParagraph('WITNESS:', true);
      addField('Name:', formData.witnessName);
      addField('Address:', formData.witnessAddress);
    }

    addParagraph('NOTARY ACKNOWLEDGMENT', true);
    addParagraph(`STATE OF ${formData.notaryState?.toUpperCase() || formData.affiantState?.toUpperCase()}`);
    addParagraph(`COUNTY OF ${formData.notaryCounty?.toUpperCase() || formData.county?.toUpperCase()}`);
    addParagraph(`Subscribed and sworn to (or affirmed) before me on this ______ day of ____________, 20___, by ${formData.affiantName || '________'}, proved to me on the basis of satisfactory evidence to be the person who appeared before me.`);
    addField('Notary Signature:', '_________________________');
    addField('Notary Public', '');
    addField('Commission Expires:', '___________');
    addParagraph('[NOTARY SEAL]');

    doc.save('General_Affidavit.pdf');
  } catch (error) {
    console.error(error);
  } finally {
    setIsGenerating(false);
  }
};


  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Location & Jurisdiction</h2>
            <p className="text-gray-600">Select the jurisdiction for this affidavit.</p>
            
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

              <div>
                <Label htmlFor="county">County/District *</Label>
                <Input
                  id="county"
                  value={formData.county}
                  onChange={(e) => handleInputChange('county', e.target.value)}
                  placeholder="Enter county or district name"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Affiant Information</h2>
            <p className="text-gray-600">Enter the details of the person making the sworn statement.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="affiantName">Full Legal Name *</Label>
                <Input
                  id="affiantName"
                  value={formData.affiantName}
                  onChange={(e) => handleInputChange('affiantName', e.target.value)}
                  placeholder="Enter your full legal name"
                />
              </div>

              <div>
                <Label htmlFor="affiantAddress">Street Address *</Label>
                <Input
                  id="affiantAddress"
                  value={formData.affiantAddress}
                  onChange={(e) => handleInputChange('affiantAddress', e.target.value)}
                  placeholder="Enter your street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="affiantCity">City *</Label>
                  <Input
                    id="affiantCity"
                    value={formData.affiantCity}
                    onChange={(e) => handleInputChange('affiantCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="affiantState">State *</Label>
                  <Input
                    id="affiantState"
                    value={formData.affiantState}
                    onChange={(e) => handleInputChange('affiantState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="affiantZip">ZIP Code *</Label>
                  <Input
                    id="affiantZip"
                    value={formData.affiantZip}
                    onChange={(e) => handleInputChange('affiantZip', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="affiantPhone">Phone Number (Optional)</Label>
                <Input
                  id="affiantPhone"
                  value={formData.affiantPhone}
                  onChange={(e) => handleInputChange('affiantPhone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Statement Details</h2>
            <p className="text-gray-600">Enter the sworn statement you wish to affirm.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="statementDate">Date of Statement *</Label>
                <Input
                  id="statementDate"
                  type="date"
                  value={formData.statementDate}
                  onChange={(e) => handleInputChange('statementDate', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="statementPurpose">Purpose of Affidavit *</Label>
                <Textarea
                  id="statementPurpose"
                  value={formData.statementPurpose}
                  onChange={(e) => handleInputChange('statementPurpose', e.target.value)}
                  placeholder="Describe the purpose of this affidavit (e.g., for court proceedings, immigration, property verification, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="statementContent">Statement of Facts *</Label>
                <Textarea
                  id="statementContent"
                  value={formData.statementContent}
                  onChange={(e) => handleInputChange('statementContent', e.target.value)}
                  placeholder="Enter the detailed statement of facts you are swearing to be true. Be specific and thorough."
                  rows={8}
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-700 mb-3">Witness Information (Optional)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="witnessName">Witness Name</Label>
                    <Input
                      id="witnessName"
                      value={formData.witnessName}
                      onChange={(e) => handleInputChange('witnessName', e.target.value)}
                      placeholder="Enter witness name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="witnessAddress">Witness Address</Label>
                    <Input
                      id="witnessAddress"
                      value={formData.witnessAddress}
                      onChange={(e) => handleInputChange('witnessAddress', e.target.value)}
                      placeholder="Enter witness address"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-700 mb-3">Notary Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="notaryState">Notary State *</Label>
                    <Input
                      id="notaryState"
                      value={formData.notaryState}
                      onChange={(e) => handleInputChange('notaryState', e.target.value)}
                      placeholder="State where notarized"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notaryCounty">Notary County *</Label>
                    <Input
                      id="notaryCounty"
                      value={formData.notaryCounty}
                      onChange={(e) => handleInputChange('notaryCounty', e.target.value)}
                      placeholder="County where notarized"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <UserInfoStep
            onBack={prevStep}
            onGenerate={generatePDF}
            documentType="General Affidavit"
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
            <h1 className="text-2xl font-bold text-gray-900">General Affidavit</h1>
            <p className="text-gray-600">Create a legally binding sworn statement</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-20 h-1 mx-2 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {renderStepContent()}

        {step < 4 && (
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

export default AffidavitGeneralForm;
