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

interface OfferToLeaseFormProps {
  onBack?: () => void;
}

const OfferToLeaseForm: React.FC<OfferToLeaseFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const [formData, setFormData] = useState({
    // Location
    country: '',
    state: '',
    
    // Tenant Information
    tenantName: '',
    tenantAddress: '',
    tenantCity: '',
    tenantState: '',
    tenantZip: '',
    
    // Landlord Information
    landlordName: '',
    landlordAddress: '',
    landlordCity: '',
    landlordState: '',
    landlordZip: '',
    
    // Premises Information
    premisesAddress: '',
    premisesCity: '',
    premisesState: '',
    premisesDescription: '',
    permittedUse: '',
    
    // Lease Terms
    offerDate: '',
    commencementDate: '',
    expirationDate: '',
    monthlyRent: '',
    securityDeposit: '',
    
    // Irrevocability
    irrevocableTime: '',
    irrevocableDate: '',
    
    // Conditions for Lease Execution
    conditions: [''],
    
    // Signage Rights
    signageRights: 'yes',
    
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

  const handleConditionChange = (index: number, value: string) => {
    const newConditions = [...formData.conditions];
    newConditions[index] = value;
    setFormData(prev => ({ ...prev, conditions: newConditions }));
  };

  const addCondition = () => {
    setFormData(prev => ({ ...prev, conditions: [...prev.conditions, ''] }));
  };

  const removeCondition = (index: number) => {
    if (formData.conditions.length > 1) {
      const newConditions = formData.conditions.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, conditions: newConditions }));
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

      const countryName = getCountryName(parseInt(formData.country));
      const stateName = getStateName(parseInt(formData.country), parseInt(formData.state));

      // Title
      addText('OFFER TO LEASE', 16, true, true);
      y += 5;

      // Introduction
      addText(`This Offer to Lease (the "Offer") is made as of ${formData.offerDate} (the "Offer Date"), by ${formData.tenantName}, having an address at ${formData.tenantAddress}, ${formData.tenantCity}, ${formData.tenantState} ${formData.tenantZip} (the "Tenant"),`);
      y += 3;

      addText(`And ${formData.landlordName}, having an address at ${formData.landlordAddress}, ${formData.landlordCity}, ${formData.landlordState} ${formData.landlordZip} (the "Landlord").`);
      y += 3;

      addText('The Tenant and the Landlord are hereinafter collectively referred to as the "Parties."');
      y += 5;

      // Recitals
      addText('Recitals', 12, true);
      addText('WHEREAS, the Landlord is the owner and/or authorized property manager of certain commercial real property available for lease; and');
      addText(`WHEREAS, the Tenant hereby offers to lease from the Landlord the commercial premises located at ${formData.premisesAddress}, ${formData.premisesCity}, ${formData.premisesState} (the "Premises"), subject to the terms and conditions set forth herein.`);
      addText('NOW, THEREFORE, in consideration of the foregoing recitals, which are incorporated herein by reference, and the mutual covenants and agreements contained herein, the Parties agree as follows:');
      y += 5;

      // 1. Description of Premises
      addText('1. Description of Premises', 12, true);
      addText(`The Premises shall consist of the following space and improvements: ${formData.premisesDescription}.`);
      y += 3;

      // 2. Term
      addText('2. Term', 12, true);
      addText(`The term of the lease (the "Term") shall commence on ${formData.commencementDate} and shall expire on ${formData.expirationDate}, unless earlier terminated in accordance with the terms of the lease.`);
      y += 3;

      // 3. Rent
      addText('3. Rent', 12, true);
      addText(`As consideration for leasing the Premises, the Tenant shall pay to the Landlord a monthly base rent (the "Base Rent") in the amount of $${formData.monthlyRent}, payable in advance on such dates and in such manner as shall be specified in the lease.`);
      y += 3;

      // 4. Signage
      if (formData.signageRights === 'yes') {
        addText('4. Signage', 12, true);
        addText('The Tenant shall have the right, at its sole cost and expense, to install, maintain, and display signage identifying the Tenant and its business operations on the Premises, subject to compliance with all applicable municipal by-laws, zoning regulations, and governmental requirements. Upon termination or expiration of the lease, the Tenant may remove such signage, provided that any damage caused by such removal shall be promptly repaired by the Tenant at its own expense.');
        y += 3;
      }

      // 5. Severability
      addText('5. Severability', 12, true);
      addText('If any provision of this Offer is held by a court of competent jurisdiction to be invalid or unenforceable, and such determination is final and non-appealable, such provision shall be severed, and the remaining provisions of this Offer shall remain in full force and effect and shall be construed so as to best give effect to the intent of the Parties.');
      y += 3;

      // 6. Binding Effect
      addText('6. Binding Effect', 12, true);
      addText('Upon written acceptance of this Offer by the Landlord, this Offer shall constitute a legally binding agreement between the Parties, enforceable in accordance with its terms.');
      y += 3;

      // 7. Irrevocability
      addText('7. Irrevocability', 12, true);
      addText(`This Offer shall be irrevocable until ${formData.irrevocableTime} on ${formData.irrevocableDate}, after which time, if not accepted by the Landlord, it shall automatically lapse and become null and void without further action by either Party.`);
      y += 3;

      // 8. Security Deposit
      addText('8. Security Deposit', 12, true);
      addText(`Upon execution of the formal lease, the Tenant shall pay to the Landlord a security deposit (the "Security Deposit") in the amount of $${formData.securityDeposit}. The Security Deposit shall be held by the Landlord in accordance with the lease and shall be refundable at the end of the tenancy, less any lawful deductions. The Security Deposit shall not be applied toward payment of Base Rent.`);
      y += 3;

      // 9. Formal Lease
      addText('9. Formal Lease', 12, true);
      addText('A formal lease agreement shall be prepared by the Landlord and executed by both Parties promptly following acceptance of this Offer. The lease shall incorporate all material terms and conditions contained herein and shall be subject to the Tenant\'s approval and review by the Tenant\'s legal counsel. The Tenant shall not be obligated to execute the lease unless and until the following conditions have been satisfied:');
      const validConditions = formData.conditions.filter(c => c.trim());
      validConditions.forEach((condition, index) => {
        addText(`${index + 1}. ${condition}`, 11, false, false, 10);
      });
      y += 3;

      // 10. Use of Premises
      addText('10. Use of Premises', 12, true);
      addText(`The Premises shall be used solely for ${formData.permittedUse} (the "Permitted Use") and for no other purpose without the prior written consent of the Landlord.`);
      y += 3;

      // 11. Possession and Occupancy
      addText('11. Possession and Occupancy', 12, true);
      addText('The Landlord shall deliver vacant possession of the Premises to the Tenant on or before the commencement date of the Term. The Landlord represents and warrants that, as of such date, the Premises shall be free from any existing leases, options, rights of renewal, or other leasehold interests.');
      y += 3;

      // 12. Alterations and Improvements
      addText('12. Alterations and Improvements', 12, true);
      addText('The Tenant shall have the right to make alterations, renovations, or improvements to the Premises, subject to the prior written consent of the Landlord, which consent shall not be unreasonably withheld or delayed. All work shall comply with applicable municipal by-laws, building codes, and governmental regulations.');
      y += 3;

      // 13. Assignment and Subletting
      addText('13. Assignment and Subletting', 12, true);
      addText('The Tenant may assign the lease or sublet all or any portion of the Premises with the prior written consent of the Landlord, such consent not to be unreasonably withheld, conditioned, or delayed.');
      y += 3;

      // 14. Compliance With Laws
      addText('14. Compliance With Laws', 12, true);
      addText('The Landlord represents and warrants that the building and the Premises have been constructed and maintained in compliance with all applicable zoning regulations, building codes, and requirements of all governmental authorities having jurisdiction.');
      y += 3;

      // Additional Terms
      if (formData.additionalTerms) {
        addText('15. Additional Terms', 12, true);
        addText(formData.additionalTerms);
        y += 3;
      }

      // Execution
      y += 10;
      addText('Execution', 12, true);
      addText('IN WITNESS WHEREOF, the Tenant has executed this Offer in accordance with applicable law as of the Offer Date first written above.');
      y += 10;

      addText('TENANT:', 11, true);
      y += 5;
      addText(`Name: ${formData.tenantName}`);
      addText(`Date: ${formData.offerDate}`);
      y += 3;
      addText('Signature: _______________________________');
      y += 15;

      addText('LANDLORD ACCEPTANCE:', 11, true);
      y += 5;
      addText(`Name: ${formData.landlordName}`);
      addText('Date: _______________________________');
      y += 3;
      addText('Signature: _______________________________');

      doc.save('offer-to-lease.pdf');
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
            <p className="text-gray-600">Select the jurisdiction for this Offer to Lease.</p>
            
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
            <p className="text-gray-600">Enter the tenant and landlord details.</p>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Tenant Information</h3>
              
              <div>
                <Label htmlFor="tenantName">Tenant Name *</Label>
                <Input
                  id="tenantName"
                  value={formData.tenantName}
                  onChange={(e) => handleInputChange('tenantName', e.target.value)}
                  placeholder="Enter tenant name (individual or company)"
                />
              </div>

              <div>
                <Label htmlFor="tenantAddress">Street Address *</Label>
                <Input
                  id="tenantAddress"
                  value={formData.tenantAddress}
                  onChange={(e) => handleInputChange('tenantAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="tenantCity">City *</Label>
                  <Input
                    id="tenantCity"
                    value={formData.tenantCity}
                    onChange={(e) => handleInputChange('tenantCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="tenantState">State *</Label>
                  <Input
                    id="tenantState"
                    value={formData.tenantState}
                    onChange={(e) => handleInputChange('tenantState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="tenantZip">ZIP Code *</Label>
                  <Input
                    id="tenantZip"
                    value={formData.tenantZip}
                    onChange={(e) => handleInputChange('tenantZip', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <h3 className="font-medium text-gray-700 pt-4">Landlord Information</h3>

              <div>
                <Label htmlFor="landlordName">Landlord Name *</Label>
                <Input
                  id="landlordName"
                  value={formData.landlordName}
                  onChange={(e) => handleInputChange('landlordName', e.target.value)}
                  placeholder="Enter landlord name"
                />
              </div>

              <div>
                <Label htmlFor="landlordAddress">Street Address *</Label>
                <Input
                  id="landlordAddress"
                  value={formData.landlordAddress}
                  onChange={(e) => handleInputChange('landlordAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="landlordCity">City *</Label>
                  <Input
                    id="landlordCity"
                    value={formData.landlordCity}
                    onChange={(e) => handleInputChange('landlordCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="landlordState">State *</Label>
                  <Input
                    id="landlordState"
                    value={formData.landlordState}
                    onChange={(e) => handleInputChange('landlordState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="landlordZip">ZIP Code *</Label>
                  <Input
                    id="landlordZip"
                    value={formData.landlordZip}
                    onChange={(e) => handleInputChange('landlordZip', e.target.value)}
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
            <h2 className="text-xl font-semibold text-gray-800">Premises & Lease Details</h2>
            <p className="text-gray-600">Enter premises information and lease terms.</p>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Premises Information</h3>

              <div>
                <Label htmlFor="premisesAddress">Premises Address *</Label>
                <Input
                  id="premisesAddress"
                  value={formData.premisesAddress}
                  onChange={(e) => handleInputChange('premisesAddress', e.target.value)}
                  placeholder="Enter premises street address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="premisesCity">City *</Label>
                  <Input
                    id="premisesCity"
                    value={formData.premisesCity}
                    onChange={(e) => handleInputChange('premisesCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="premisesState">State *</Label>
                  <Input
                    id="premisesState"
                    value={formData.premisesState}
                    onChange={(e) => handleInputChange('premisesState', e.target.value)}
                    placeholder="State"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="premisesDescription">Premises Description *</Label>
                <Textarea
                  id="premisesDescription"
                  value={formData.premisesDescription}
                  onChange={(e) => handleInputChange('premisesDescription', e.target.value)}
                  placeholder="Describe the space and improvements (e.g., 'approximately 2,500 sq ft of retail space on the ground floor')"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="permittedUse">Permitted Use *</Label>
                <Input
                  id="permittedUse"
                  value={formData.permittedUse}
                  onChange={(e) => handleInputChange('permittedUse', e.target.value)}
                  placeholder="e.g., retail sales of clothing and accessories"
                />
              </div>

              <h3 className="font-medium text-gray-700 pt-4">Lease Term</h3>

              <div>
                <Label htmlFor="offerDate">Offer Date *</Label>
                <Input
                  id="offerDate"
                  type="date"
                  value={formData.offerDate}
                  onChange={(e) => handleInputChange('offerDate', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="commencementDate">Lease Commencement Date *</Label>
                  <Input
                    id="commencementDate"
                    type="date"
                    value={formData.commencementDate}
                    onChange={(e) => handleInputChange('commencementDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="expirationDate">Lease Expiration Date *</Label>
                  <Input
                    id="expirationDate"
                    type="date"
                    value={formData.expirationDate}
                    onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="signageRights">Signage Rights</Label>
                <Select value={formData.signageRights} onValueChange={(value) => handleInputChange('signageRights', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - Tenant has signage rights</SelectItem>
                    <SelectItem value="no">No - No signage rights included</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Financial Terms & Conditions</h2>
            <p className="text-gray-600">Enter rent, deposit, and conditions for lease execution.</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyRent">Monthly Base Rent ($) *</Label>
                  <Input
                    id="monthlyRent"
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="securityDeposit">Security Deposit ($) *</Label>
                  <Input
                    id="securityDeposit"
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <h3 className="font-medium text-gray-700 pt-4">Offer Irrevocability</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="irrevocableTime">Irrevocable Until (Time) *</Label>
                  <Input
                    id="irrevocableTime"
                    type="time"
                    value={formData.irrevocableTime}
                    onChange={(e) => handleInputChange('irrevocableTime', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="irrevocableDate">Irrevocable Until (Date) *</Label>
                  <Input
                    id="irrevocableDate"
                    type="date"
                    value={formData.irrevocableDate}
                    onChange={(e) => handleInputChange('irrevocableDate', e.target.value)}
                  />
                </div>
              </div>

              <h3 className="font-medium text-gray-700 pt-4">Conditions for Lease Execution</h3>
              <p className="text-sm text-gray-500">Conditions that must be satisfied before tenant is obligated to execute the formal lease.</p>

              {formData.conditions.map((condition, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={condition}
                    onChange={(e) => handleConditionChange(index, e.target.value)}
                    placeholder={`Condition ${index + 1} (e.g., "Satisfactory inspection of premises")`}
                  />
                  {formData.conditions.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeCondition(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              <Button type="button" variant="outline" onClick={addCondition} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Condition
              </Button>

              <div className="pt-4">
                <Label htmlFor="additionalTerms">Additional Terms (Optional)</Label>
                <Textarea
                  id="additionalTerms"
                  value={formData.additionalTerms}
                  onChange={(e) => handleInputChange('additionalTerms', e.target.value)}
                  placeholder="Enter any additional terms or conditions..."
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
            documentType="Offer to Lease"
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
            <h1 className="text-2xl font-bold text-gray-900">Offer to Lease</h1>
            <p className="text-gray-600">Create a formal offer to lease commercial premises</p>
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

export default OfferToLeaseForm;
