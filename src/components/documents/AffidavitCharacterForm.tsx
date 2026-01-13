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

interface AffidavitCharacterFormProps {
  onBack?: () => void;
}

const AffidavitCharacterForm: React.FC<AffidavitCharacterFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const [formData, setFormData] = useState({
    // Location
    country: '',
    state: '',
    county: '',
    
    // Affiant (Person Writing the Reference) Information
    affiantName: '',
    affiantAddress: '',
    affiantCity: '',
    affiantState: '',
    affiantZip: '',
    affiantOccupation: '',
    affiantPhone: '',
    affiantEmail: '',
    
    // Subject (Person Being Referenced) Information
    subjectName: '',
    subjectRelationship: '',
    yearsKnown: '',
    howMet: '',
    
    // Character Reference Details
    characterQualities: '',
    specificExamples: '',
    purposeOfReference: '',
    recommendation: '',
    
    // Statement Details
    statementDate: '',
    
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

      const stateName = formData.state ? getStateName(parseInt(formData.country), parseInt(formData.state)) : formData.notaryState;

      // Title
      addText('AFFIDAVIT OF CHARACTER', 18, true, true);
      addText('(Character Reference Sworn Statement)', 12, false, true);
      y += 10;

      // Jurisdiction Header
      addText(`STATE OF ${stateName.toUpperCase()}`, 12, true);
      addText(`COUNTY OF ${formData.county.toUpperCase() || formData.notaryCounty.toUpperCase()}`, 12, true);
      y += 5;

      // Opening Statement
      addText(`I, ${formData.affiantName}, being of legal age and being first duly sworn upon my oath, do hereby depose and state as follows:`, 11);
      y += 5;

      // Section 1: Affiant Information
      addText('1. AFFIANT IDENTIFICATION', 12, true);
      addText(`My name is ${formData.affiantName}. I am over the age of 18 years and am competent to make this affidavit.`);
      addText(`I reside at ${formData.affiantAddress}, ${formData.affiantCity}, ${formData.affiantState} ${formData.affiantZip}.`);
      addText(`My occupation is: ${formData.affiantOccupation}.`);
      if (formData.affiantPhone) {
        addText(`Contact Information: ${formData.affiantPhone}${formData.affiantEmail ? ', ' + formData.affiantEmail : ''}.`);
      }
      y += 3;

      // Section 2: Relationship with Subject
      addText('2. RELATIONSHIP WITH THE SUBJECT', 12, true);
      addText(`I have known ${formData.subjectName} for approximately ${formData.yearsKnown} years.`);
      addText(`My relationship to the subject is: ${formData.subjectRelationship}.`);
      if (formData.howMet) {
        addText(`We first met: ${formData.howMet}.`);
      }
      y += 3;

      // Section 3: Purpose
      addText('3. PURPOSE OF THIS AFFIDAVIT', 12, true);
      addText(formData.purposeOfReference);
      y += 3;

      // Section 4: Character Assessment
      addText('4. CHARACTER ASSESSMENT', 12, true);
      addText(`Based on my personal knowledge of ${formData.subjectName}, I can attest to the following character qualities:`);
      addText(formData.characterQualities, 11, false, false, 10);
      y += 3;

      // Section 5: Specific Examples
      if (formData.specificExamples) {
        addText('5. SPECIFIC EXAMPLES', 12, true);
        addText('I offer the following specific examples that demonstrate the character of the subject:');
        addText(formData.specificExamples, 11, false, false, 10);
        y += 3;
      }

      // Section 6: Recommendation
      addText('6. RECOMMENDATION', 12, true);
      addText(formData.recommendation);
      y += 5;

      // Affirmation
      addText('7. AFFIRMATION', 12, true);
      addText('I hereby declare under penalty of perjury that the foregoing statements are true and correct to the best of my knowledge, information, and belief. I have made this statement voluntarily and without any promise of compensation or reward.');
      y += 5;

      // Signature Block
      addText('FURTHER AFFIANT SAYETH NOT.', 11, true, true);
      y += 15;

      addText('_______________________________', 11, false, false);
      addText(`${formData.affiantName}`, 11, false, false);
      addText('Affiant', 10, false, false);
      y += 3;
      addText(`Occupation: ${formData.affiantOccupation}`, 10, false, false);
      addText(`Date: ${formData.statementDate || '_______________'}`, 11);
      y += 10;

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
      doc.save('Affidavit_of_Character.pdf');
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
            <p className="text-gray-600">Select the jurisdiction for this character affidavit.</p>
            
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
            <h2 className="text-xl font-semibold text-gray-800">Your Information (Affiant)</h2>
            <p className="text-gray-600">Enter your details as the person providing the character reference.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="affiantName">Your Full Legal Name *</Label>
                <Input
                  id="affiantName"
                  value={formData.affiantName}
                  onChange={(e) => handleInputChange('affiantName', e.target.value)}
                  placeholder="Enter your full legal name"
                />
              </div>

              <div>
                <Label htmlFor="affiantOccupation">Your Occupation *</Label>
                <Input
                  id="affiantOccupation"
                  value={formData.affiantOccupation}
                  onChange={(e) => handleInputChange('affiantOccupation', e.target.value)}
                  placeholder="Enter your occupation or profession"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="affiantPhone">Phone Number</Label>
                  <Input
                    id="affiantPhone"
                    value={formData.affiantPhone}
                    onChange={(e) => handleInputChange('affiantPhone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="affiantEmail">Email Address</Label>
                  <Input
                    id="affiantEmail"
                    type="email"
                    value={formData.affiantEmail}
                    onChange={(e) => handleInputChange('affiantEmail', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Subject Information</h2>
            <p className="text-gray-600">Enter details about the person you are providing a character reference for.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="subjectName">Subject's Full Name *</Label>
                <Input
                  id="subjectName"
                  value={formData.subjectName}
                  onChange={(e) => handleInputChange('subjectName', e.target.value)}
                  placeholder="Enter the full name of the person you are writing about"
                />
              </div>

              <div>
                <Label htmlFor="subjectRelationship">Your Relationship to Subject *</Label>
                <Input
                  id="subjectRelationship"
                  value={formData.subjectRelationship}
                  onChange={(e) => handleInputChange('subjectRelationship', e.target.value)}
                  placeholder="e.g., Friend, Colleague, Neighbor, Employer, Pastor"
                />
              </div>

              <div>
                <Label htmlFor="yearsKnown">Years Known *</Label>
                <Input
                  id="yearsKnown"
                  value={formData.yearsKnown}
                  onChange={(e) => handleInputChange('yearsKnown', e.target.value)}
                  placeholder="e.g., 5, 10, 15"
                />
              </div>

              <div>
                <Label htmlFor="howMet">How Did You Meet?</Label>
                <Input
                  id="howMet"
                  value={formData.howMet}
                  onChange={(e) => handleInputChange('howMet', e.target.value)}
                  placeholder="Describe how and where you first met"
                />
              </div>

              <div>
                <Label htmlFor="purposeOfReference">Purpose of This Reference *</Label>
                <Textarea
                  id="purposeOfReference"
                  value={formData.purposeOfReference}
                  onChange={(e) => handleInputChange('purposeOfReference', e.target.value)}
                  placeholder="Explain why this character reference is being provided (e.g., court proceedings, immigration application, employment, adoption)"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Character Assessment</h2>
            <p className="text-gray-600">Provide details about the subject's character and your recommendation.</p>
            
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
                <Label htmlFor="characterQualities">Character Qualities *</Label>
                <Textarea
                  id="characterQualities"
                  value={formData.characterQualities}
                  onChange={(e) => handleInputChange('characterQualities', e.target.value)}
                  placeholder="Describe the subject's character traits (e.g., honesty, integrity, reliability, compassion, work ethic, responsibility)"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="specificExamples">Specific Examples</Label>
                <Textarea
                  id="specificExamples"
                  value={formData.specificExamples}
                  onChange={(e) => handleInputChange('specificExamples', e.target.value)}
                  placeholder="Provide specific examples or instances that demonstrate the subject's good character"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="recommendation">Your Recommendation *</Label>
                <Textarea
                  id="recommendation"
                  value={formData.recommendation}
                  onChange={(e) => handleInputChange('recommendation', e.target.value)}
                  placeholder="State your recommendation and overall assessment of the subject's character"
                  rows={3}
                />
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

      case 5:
        return (
          <UserInfoStep
            onBack={prevStep}
            onGenerate={generatePDF}
            documentType="Affidavit of Character"
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
          <div className="p-2 bg-purple-100 rounded-lg">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Affidavit of Character</h1>
            <p className="text-gray-600">Create a sworn character reference statement</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 5 && (
                <div className={`w-16 h-1 mx-2 ${step > stepNum ? 'bg-purple-600' : 'bg-gray-200'}`} />
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

export default AffidavitCharacterForm;
