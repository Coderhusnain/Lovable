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

      const stateName = formData.state ? getStateName(parseInt(formData.country), parseInt(formData.state)) : formData.notaryState;
      const countryName = formData.country ? getCountryName(parseInt(formData.country)) : '';

      // Title
      addText('GENERAL AFFIDAVIT', 18, true, true);
      y += 10;

      // Jurisdiction Header
      addText(`STATE OF ${stateName.toUpperCase()}`, 12, true);
      addText(`COUNTY OF ${formData.county.toUpperCase() || formData.notaryCounty.toUpperCase()}`, 12, true);
      y += 5;

      // Affiant Statement
      addText(`I, ${formData.affiantName}, being of legal age and being first duly sworn upon my oath, depose and state as follows:`, 11);
      y += 5;

      // Personal Information
      addText('1. PERSONAL INFORMATION', 12, true);
      addText(`My name is ${formData.affiantName}. I am over the age of 18 years and am competent to make this affidavit.`);
      addText(`I reside at ${formData.affiantAddress}, ${formData.affiantCity}, ${formData.affiantState} ${formData.affiantZip}.`);
      if (formData.affiantPhone) {
        addText(`I can be reached at ${formData.affiantPhone}.`);
      }
      y += 3;

      // Purpose of Affidavit
      if (formData.statementPurpose) {
        addText('2. PURPOSE OF THIS AFFIDAVIT', 12, true);
        addText(formData.statementPurpose);
        y += 3;
      }

      // Statement Content
      addText('3. STATEMENT OF FACTS', 12, true);
      addText(formData.statementContent);
      y += 5;

      // Affirmation
      addText('4. AFFIRMATION', 12, true);
      addText('I hereby declare under penalty of perjury that the foregoing statements are true and correct to the best of my knowledge, information, and belief.');
      y += 5;

      // Signature Block
      addText('FURTHER AFFIANT SAYETH NOT.', 11, true, true);
      y += 15;

      addText('_______________________________', 11, false, false);
      addText(`${formData.affiantName}`, 11, false, false);
      addText('Affiant', 10, false, false);
      y += 5;
      addText(`Date: ${formData.statementDate || '_______________'}`, 11);
      y += 10;

      // Witness Section (if applicable)
      if (formData.witnessName) {
        addText('WITNESS:', 12, true);
        y += 10;
        addText('_______________________________', 11, false, false);
        addText(`${formData.witnessName}`, 11, false, false);
        addText(`Address: ${formData.witnessAddress}`, 10, false, false);
        y += 10;
      }

      // Notary Block
      addText('NOTARY ACKNOWLEDGMENT', 14, true, true);
      y += 5;
      addText(`STATE OF ${formData.notaryState.toUpperCase() || stateName.toUpperCase()}`);
      addText(`COUNTY OF ${formData.notaryCounty.toUpperCase() || formData.county.toUpperCase()}`);
      y += 5;
      addText(`Subscribed and sworn to (or affirmed) before me on this ______ day of ____________, 20___, by ${formData.affiantName}, proved to me on the basis of satisfactory evidence to be the person who appeared before me.`);
      y += 15;

      addText('_______________________________', 11, false, false);
      addText('Notary Public', 11, false, false);
      addText('My Commission Expires: _______________', 10, false, false);
      y += 5;
      addText('[NOTARY SEAL]', 10, false, false);

      // Save PDF
      doc.save('General_Affidavit.pdf');
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
