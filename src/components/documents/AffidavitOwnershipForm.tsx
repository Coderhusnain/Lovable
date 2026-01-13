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

interface AffidavitOwnershipFormProps {
  onBack?: () => void;
}

const AffidavitOwnershipForm: React.FC<AffidavitOwnershipFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const [formData, setFormData] = useState({
    // Location
    country: '',
    state: '',
    county: '',
    
    // Owner Information
    ownerName: '',
    ownerAddress: '',
    ownerCity: '',
    ownerState: '',
    ownerZip: '',
    ownerPhone: '',
    ownerIdType: '',
    ownerIdNumber: '',
    
    // Property Information
    propertyType: '',
    propertyDescription: '',
    propertyLocation: '',
    propertyValue: '',
    acquisitionDate: '',
    acquisitionMethod: '',
    
    // Supporting Documentation
    supportingDocs: '',
    
    // Statement Details
    statementDate: '',
    ownershipPurpose: '',
    additionalStatements: '',
    
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
      addText('AFFIDAVIT OF OWNERSHIP', 18, true, true);
      y += 10;

      // Jurisdiction Header
      addText(`STATE OF ${stateName.toUpperCase()}`, 12, true);
      addText(`COUNTY OF ${formData.county.toUpperCase() || formData.notaryCounty.toUpperCase()}`, 12, true);
      y += 5;

      // Opening Statement
      addText(`I, ${formData.ownerName}, being of legal age and being first duly sworn upon my oath, do hereby depose and state as follows:`, 11);
      y += 5;

      // Section 1: Declarant Information
      addText('1. DECLARANT IDENTIFICATION', 12, true);
      addText(`My name is ${formData.ownerName}. I am over the age of 18 years and am competent to make this affidavit.`);
      addText(`I reside at ${formData.ownerAddress}, ${formData.ownerCity}, ${formData.ownerState} ${formData.ownerZip}.`);
      if (formData.ownerPhone) {
        addText(`Contact Phone: ${formData.ownerPhone}.`);
      }
      if (formData.ownerIdType && formData.ownerIdNumber) {
        addText(`Identification: ${formData.ownerIdType} - ${formData.ownerIdNumber}.`);
      }
      y += 3;

      // Section 2: Property Description
      addText('2. PROPERTY DESCRIPTION', 12, true);
      addText(`Type of Property: ${formData.propertyType}`);
      addText('Property Description:');
      addText(formData.propertyDescription, 11, false, false, 10);
      if (formData.propertyLocation) {
        addText(`Property Location: ${formData.propertyLocation}`);
      }
      if (formData.propertyValue) {
        addText(`Estimated Value: $${formData.propertyValue}`);
      }
      y += 3;

      // Section 3: Ownership Declaration
      addText('3. DECLARATION OF OWNERSHIP', 12, true);
      addText(`I hereby declare that I am the sole and rightful owner of the above-described property.`);
      if (formData.acquisitionDate) {
        addText(`Date of Acquisition: ${formData.acquisitionDate}`);
      }
      if (formData.acquisitionMethod) {
        addText(`Method of Acquisition: ${formData.acquisitionMethod}`);
      }
      y += 3;

      // Section 4: Purpose
      addText('4. PURPOSE OF THIS AFFIDAVIT', 12, true);
      addText(formData.ownershipPurpose);
      y += 3;

      // Section 5: Supporting Documentation
      if (formData.supportingDocs) {
        addText('5. SUPPORTING DOCUMENTATION', 12, true);
        addText('The following documents support my claim of ownership:');
        addText(formData.supportingDocs, 11, false, false, 10);
        y += 3;
      }

      // Section 6: Additional Statements
      if (formData.additionalStatements) {
        addText('6. ADDITIONAL STATEMENTS', 12, true);
        addText(formData.additionalStatements);
        y += 3;
      }

      // Section 7: Warranties
      addText('7. WARRANTIES AND REPRESENTATIONS', 12, true);
      addText('I hereby warrant and represent that:');
      addText('• I have good and marketable title to the described property;', 11, false, false, 10);
      addText('• The property is free and clear of all liens, encumbrances, and claims unless otherwise stated;', 11, false, false, 10);
      addText('• I have full right and authority to make this declaration;', 11, false, false, 10);
      addText('• The information provided herein is true, accurate, and complete.', 11, false, false, 10);
      y += 3;

      // Affirmation
      addText('8. AFFIRMATION', 12, true);
      addText('I hereby declare under penalty of perjury that the foregoing statements are true and correct to the best of my knowledge, information, and belief.');
      y += 5;

      // Signature Block
      addText('FURTHER AFFIANT SAYETH NOT.', 11, true, true);
      y += 15;

      addText('_______________________________', 11, false, false);
      addText(`${formData.ownerName}`, 11, false, false);
      addText('Affiant / Property Owner', 10, false, false);
      y += 3;
      addText(`Date: ${formData.statementDate || '_______________'}`, 11);
      y += 10;

      // Notary Block
      addText('NOTARY ACKNOWLEDGMENT', 14, true, true);
      y += 5;
      addText(`STATE OF ${formData.notaryState.toUpperCase() || stateName.toUpperCase()}`);
      addText(`COUNTY OF ${formData.notaryCounty.toUpperCase() || formData.county.toUpperCase()}`);
      y += 5;
      addText(`Subscribed and sworn to (or affirmed) before me on this ______ day of ____________, 20___, by ${formData.ownerName}, proved to me on the basis of satisfactory evidence to be the person who appeared before me.`);
      y += 15;

      addText('_______________________________', 11, false, false);
      addText('Notary Public', 11, false, false);
      addText('My Commission Expires: _______________', 10, false, false);
      y += 5;
      addText('[NOTARY SEAL]', 10, false, false);

      // Save PDF
      doc.save('Affidavit_of_Ownership.pdf');
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
            <p className="text-gray-600">Select the jurisdiction for this ownership affidavit.</p>
            
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
            <h2 className="text-xl font-semibold text-gray-800">Owner Information</h2>
            <p className="text-gray-600">Enter your details as the property owner.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="ownerName">Full Legal Name *</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  placeholder="Enter your full legal name"
                />
              </div>

              <div>
                <Label htmlFor="ownerAddress">Street Address *</Label>
                <Input
                  id="ownerAddress"
                  value={formData.ownerAddress}
                  onChange={(e) => handleInputChange('ownerAddress', e.target.value)}
                  placeholder="Enter your street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="ownerCity">City *</Label>
                  <Input
                    id="ownerCity"
                    value={formData.ownerCity}
                    onChange={(e) => handleInputChange('ownerCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerState">State *</Label>
                  <Input
                    id="ownerState"
                    value={formData.ownerState}
                    onChange={(e) => handleInputChange('ownerState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="ownerZip">ZIP Code *</Label>
                  <Input
                    id="ownerZip"
                    value={formData.ownerZip}
                    onChange={(e) => handleInputChange('ownerZip', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ownerPhone">Phone Number</Label>
                <Input
                  id="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerIdType">ID Type</Label>
                  <Select value={formData.ownerIdType} onValueChange={(value) => handleInputChange('ownerIdType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Driver's License">Driver's License</SelectItem>
                      <SelectItem value="Passport">Passport</SelectItem>
                      <SelectItem value="State ID">State ID</SelectItem>
                      <SelectItem value="Military ID">Military ID</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ownerIdNumber">ID Number</Label>
                  <Input
                    id="ownerIdNumber"
                    value={formData.ownerIdNumber}
                    onChange={(e) => handleInputChange('ownerIdNumber', e.target.value)}
                    placeholder="Enter ID number"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Property Information</h2>
            <p className="text-gray-600">Describe the property you are declaring ownership of.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="propertyType">Type of Property *</Label>
                <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Vehicle">Vehicle</SelectItem>
                    <SelectItem value="Personal Property">Personal Property</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Jewelry">Jewelry</SelectItem>
                    <SelectItem value="Artwork">Artwork</SelectItem>
                    <SelectItem value="Intellectual Property">Intellectual Property</SelectItem>
                    <SelectItem value="Business Assets">Business Assets</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="propertyDescription">Property Description *</Label>
                <Textarea
                  id="propertyDescription"
                  value={formData.propertyDescription}
                  onChange={(e) => handleInputChange('propertyDescription', e.target.value)}
                  placeholder="Provide a detailed description of the property (include make, model, serial numbers, identifying features, etc.)"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="propertyLocation">Property Location</Label>
                <Input
                  id="propertyLocation"
                  value={formData.propertyLocation}
                  onChange={(e) => handleInputChange('propertyLocation', e.target.value)}
                  placeholder="Current location of the property (if applicable)"
                />
              </div>

              <div>
                <Label htmlFor="propertyValue">Estimated Value ($)</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  value={formData.propertyValue}
                  onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                  placeholder="Enter estimated value"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="acquisitionDate">Date of Acquisition</Label>
                  <Input
                    id="acquisitionDate"
                    type="date"
                    value={formData.acquisitionDate}
                    onChange={(e) => handleInputChange('acquisitionDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="acquisitionMethod">Method of Acquisition</Label>
                  <Select value={formData.acquisitionMethod} onValueChange={(value) => handleInputChange('acquisitionMethod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Purchase">Purchase</SelectItem>
                      <SelectItem value="Gift">Gift</SelectItem>
                      <SelectItem value="Inheritance">Inheritance</SelectItem>
                      <SelectItem value="Creation/Manufacture">Creation/Manufacture</SelectItem>
                      <SelectItem value="Trade/Exchange">Trade/Exchange</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Statement Details</h2>
            <p className="text-gray-600">Provide the purpose and any additional information.</p>
            
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
                <Label htmlFor="ownershipPurpose">Purpose of Affidavit *</Label>
                <Textarea
                  id="ownershipPurpose"
                  value={formData.ownershipPurpose}
                  onChange={(e) => handleInputChange('ownershipPurpose', e.target.value)}
                  placeholder="Explain why this affidavit is needed (e.g., title transfer, insurance claim, legal proceedings, estate matters)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="supportingDocs">Supporting Documentation</Label>
                <Textarea
                  id="supportingDocs"
                  value={formData.supportingDocs}
                  onChange={(e) => handleInputChange('supportingDocs', e.target.value)}
                  placeholder="List any documents that support your claim of ownership (e.g., bill of sale, title, registration, receipts)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="additionalStatements">Additional Statements</Label>
                <Textarea
                  id="additionalStatements"
                  value={formData.additionalStatements}
                  onChange={(e) => handleInputChange('additionalStatements', e.target.value)}
                  placeholder="Any additional information relevant to your ownership claim"
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
            documentType="Affidavit of Ownership"
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
          <div className="p-2 bg-green-100 rounded-lg">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Affidavit of Ownership</h1>
            <p className="text-gray-600">Declare legal ownership of property</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 5 && (
                <div className={`w-16 h-1 mx-2 ${step > stepNum ? 'bg-green-600' : 'bg-gray-200'}`} />
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

export default AffidavitOwnershipForm;
