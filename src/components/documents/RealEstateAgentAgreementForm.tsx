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

interface RealEstateAgentAgreementFormProps {
  onBack?: () => void;
}

const RealEstateAgentAgreementForm: React.FC<RealEstateAgentAgreementFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const [formData, setFormData] = useState({
    // Location
    country: '',
    state: '',
    
    // Seller Information
    sellerName: '',
    sellerAddress: '',
    sellerCity: '',
    sellerState: '',
    sellerZip: '',
    
    // Agent Information
    agentName: '',
    agentAddress: '',
    agentCity: '',
    agentState: '',
    agentZip: '',
    agentLicenseNumber: '',
    
    // Property Information
    propertyAddress: '',
    propertyCity: '',
    propertyState: '',
    propertyZip: '',
    propertyDescription: '',
    
    // Agreement Terms
    effectiveDate: '',
    commissionPercentage: '',
    
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
      addText('REAL ESTATE AGENT AGREEMENT', 16, true, true);
      y += 5;

      // Introduction
      addText(`This Real Estate Agent Agreement ("Agreement") is entered into as of ${formData.effectiveDate} ("Effective Date"), by and between:`);
      y += 3;
      addText(`${formData.sellerName}, with an address at ${formData.sellerAddress}, ${formData.sellerCity}, ${formData.sellerState} ${formData.sellerZip} ("Seller"),`, 11, false, false, 10);
      addText('And', 11, false, false, 10);
      addText(`${formData.agentName}, with an address at ${formData.agentAddress}, ${formData.agentCity}, ${formData.agentState} ${formData.agentZip} ("Agent").`, 11, false, false, 10);
      y += 3;
      addText('The Seller and Agent may be referred to individually as a "Party" and collectively as the "Parties."');
      y += 5;

      // 1. Recitals
      addText('1. RECITALS', 12, true);
      addText('WHEREAS, the Seller is the owner of certain real property, together with all improvements thereon, commonly known as:');
      addText(`${formData.propertyAddress}, ${formData.propertyCity}, ${formData.propertyState} ${formData.propertyZip}`, 11, false, false, 10);
      addText('(the "Real Property"); and');
      addText('WHEREAS, the Agent is experienced in marketing, advertising, negotiating, and selling real estate; and');
      addText('WHEREAS, the Seller desires to engage the Agent to market and sell the Real Property, and the Agent agrees to provide such services under the terms and conditions set forth herein;');
      addText('NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:');
      y += 3;

      // 2. Appointment
      addText('2. APPOINTMENT AND GRANT OF AUTHORITY', 12, true);
      addText('2.1 The Seller hereby appoints the Agent as the Seller\'s agent for the purpose of marketing and selling the Real Property, subject to the terms of this Agreement.');
      addText('2.2 The Seller shall promptly provide the Agent with all documents, records, and information in the Seller\'s possession relating to the Real Property that may be necessary for marketing or sale.');
      y += 3;

      // 3. Scope of Services
      addText('3. SCOPE OF SERVICES', 12, true);
      addText('3.1 The Seller shall refer to the Agent all inquiries, offers, and negotiations relating to the Real Property, including inquiries from other brokers or prospective purchasers.');
      addText('3.2 The Agent shall:');
      addText('• Investigate and develop offers for the Real Property;', 11, false, false, 10);
      addText('• Market and promote the Real Property;', 11, false, false, 10);
      addText('• Solicit potential purchasers;', 11, false, false, 10);
      addText('• Conduct negotiations on behalf of the Seller; and', 11, false, false, 10);
      addText('• Use commercially reasonable efforts to procure a purchaser.', 11, false, false, 10);
      addText('3.3 The Agent is authorized to cooperate with and enlist the assistance of other licensed real estate brokers as deemed appropriate.');
      addText('3.4 The Agent shall promptly disclose to the Seller all offers received and any proposed purchase price or material terms.');
      y += 3;

      // 4. Term
      addText('4. TERM OF AGREEMENT', 12, true);
      addText('This Agreement shall commence on the Effective Date and shall remain in effect until terminated in accordance with this Agreement.');
      y += 3;

      // 5. Performance
      addText('5. PERFORMANCE OF SERVICES', 12, true);
      addText('The manner, method, and means by which the Agent performs the Services shall be determined solely by the Agent. The Agent shall devote such time and effort as reasonably necessary to fulfill the obligations of this Agreement.');
      y += 3;

      // 6. Compensation
      addText('6. COMPENSATION', 12, true);
      addText('6.1 Commission.');
      addText(`The Seller agrees to pay the Agent a commission equal to ${formData.commissionPercentage}% of the gross sales price of the Real Property if the sale is consummated as a result of the Agent's efforts.`);
      addText('6.2 Commission Protection.');
      addText('If, after termination of this Agreement, the Seller sells the Real Property to any purchaser introduced to the Property by the Agent during the term of this Agreement, the Agent shall be entitled to the full commission.');
      addText('6.3 Excluded Transactions.');
      addText('The Seller reserves the right to sell the Real Property to any person with whom the Seller was negotiating prior to the Effective Date. In such event, no commission shall be owed to the Agent.');
      addText('6.4 Refusal of Offer.');
      addText('If the Seller rejects a bona fide offer at or above the Seller\'s approved price during the term of this Agreement, and the property is later sold to that same purchaser, the Agent shall be entitled to full commission.');
      y += 3;

      // 7. Expenses
      addText('7. EXPENSES', 12, true);
      addText('Unless otherwise agreed in writing, the Agent shall be responsible for all out-of-pocket expenses incurred in connection with the performance of services under this Agreement.');
      y += 3;

      // 8. Independent Contractor
      addText('8. INDEPENDENT CONTRACTOR RELATIONSHIP', 12, true);
      addText('The Agent is an independent contractor and not an employee of the Seller. Nothing in this Agreement shall be construed as creating an employer-employee, partnership, or joint venture relationship.');
      addText('The Seller shall not be responsible for employee benefits, taxes, insurance, or withholdings of any kind.');
      y += 3;

      // 9. Employees and Subagents
      addText('9. EMPLOYEES AND SUBAGENTS', 12, true);
      addText('Any employees or subagents engaged by the Agent shall be under the Agent\'s sole direction and control. Upon request, the Agent shall provide proof of employment or engagement of such persons.');
      y += 3;

      // 10. Indemnification
      addText('10. INDEMNIFICATION', 12, true);
      addText('The Agent shall indemnify and hold harmless the Seller from any claims, damages, losses, liabilities, or expenses, including reasonable attorneys\' fees, arising out of the Agent\'s negligence, misconduct, or breach of this Agreement.');
      y += 3;

      // 11. Assignment
      addText('11. ASSIGNMENT', 12, true);
      addText('The Agent may not assign or transfer this Agreement, in whole or in part, without the prior written consent of the Seller.');
      y += 3;

      // 12. Confidentiality
      addText('12. CONFIDENTIALITY', 12, true);
      addText('The Agent agrees to keep all non-public information relating to the Real Property and the Seller confidential and shall not disclose such information to any third party without prior written consent.');
      addText('This obligation shall survive termination of this Agreement.');
      y += 3;

      // 13. Return of Records
      addText('13. RETURN OF RECORDS', 12, true);
      addText('Upon termination of this Agreement, the Agent shall promptly return all documents, records, data, and materials belonging to the Seller.');
      y += 3;

      // 14. Notices
      addText('14. NOTICES', 12, true);
      addText('All notices under this Agreement shall be in writing and deemed given when delivered personally or sent by certified mail to the addresses of the Parties listed above.');
      y += 3;

      // 15. Entire Agreement
      addText('15. ENTIRE AGREEMENT', 12, true);
      addText('This Agreement constitutes the entire agreement between the Parties and supersedes all prior oral or written agreements relating to the subject matter herein.');
      y += 3;

      // 16. Amendments
      addText('16. AMENDMENTS', 12, true);
      addText('This Agreement may be amended only by a written instrument signed by both Parties.');
      y += 3;

      // 17. Severability
      addText('17. SEVERABILITY', 12, true);
      addText('If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.');
      y += 3;

      // 18. Exculpation
      addText('18. EXCULPATION', 12, true);
      addText('The Agent shall look solely to the Seller\'s interest in the Real Property for satisfaction of any claims arising under this Agreement.');
      y += 3;

      // 19. Waiver
      addText('19. WAIVER', 12, true);
      addText('The failure of either Party to enforce any provision of this Agreement shall not constitute a waiver of future enforcement of that or any other provision.');
      y += 3;

      // 20. Governing Law
      addText('20. GOVERNING LAW', 12, true);
      addText(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLawState}.`);
      y += 3;

      // Additional Terms
      if (formData.additionalTerms) {
        addText('21. ADDITIONAL TERMS', 12, true);
        addText(formData.additionalTerms);
        y += 3;
      }

      // Signatures
      y += 10;
      addText('21. EXECUTION', 12, true);
      addText('IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.');
      y += 10;

      addText('SELLER', 11, true);
      y += 3;
      addText(`Name: ${formData.sellerName}`);
      addText('Signature: _______________________________');
      addText(`Date: ${formData.effectiveDate}`);
      y += 10;

      addText('AGENT', 11, true);
      y += 3;
      addText(`Name: ${formData.agentName}`);
      addText('Signature: _______________________________');
      addText('Date: _______________________________');

      doc.save('real-estate-agent-agreement.pdf');
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
            <p className="text-gray-600">Select the jurisdiction for this Real Estate Agent Agreement.</p>
            
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
            <p className="text-gray-600">Enter the seller and agent details.</p>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Seller Information</h3>
              
              <div>
                <Label htmlFor="sellerName">Seller Name *</Label>
                <Input
                  id="sellerName"
                  value={formData.sellerName}
                  onChange={(e) => handleInputChange('sellerName', e.target.value)}
                  placeholder="Enter seller's full name"
                />
              </div>

              <div>
                <Label htmlFor="sellerAddress">Street Address *</Label>
                <Input
                  id="sellerAddress"
                  value={formData.sellerAddress}
                  onChange={(e) => handleInputChange('sellerAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sellerCity">City *</Label>
                  <Input
                    id="sellerCity"
                    value={formData.sellerCity}
                    onChange={(e) => handleInputChange('sellerCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="sellerState">State *</Label>
                  <Input
                    id="sellerState"
                    value={formData.sellerState}
                    onChange={(e) => handleInputChange('sellerState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="sellerZip">ZIP Code *</Label>
                  <Input
                    id="sellerZip"
                    value={formData.sellerZip}
                    onChange={(e) => handleInputChange('sellerZip', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <h3 className="font-medium text-gray-700 pt-4">Agent Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agentName">Agent Name *</Label>
                  <Input
                    id="agentName"
                    value={formData.agentName}
                    onChange={(e) => handleInputChange('agentName', e.target.value)}
                    placeholder="Enter agent's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="agentLicenseNumber">License Number (Optional)</Label>
                  <Input
                    id="agentLicenseNumber"
                    value={formData.agentLicenseNumber}
                    onChange={(e) => handleInputChange('agentLicenseNumber', e.target.value)}
                    placeholder="Enter license number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="agentAddress">Street Address *</Label>
                <Input
                  id="agentAddress"
                  value={formData.agentAddress}
                  onChange={(e) => handleInputChange('agentAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="agentCity">City *</Label>
                  <Input
                    id="agentCity"
                    value={formData.agentCity}
                    onChange={(e) => handleInputChange('agentCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="agentState">State *</Label>
                  <Input
                    id="agentState"
                    value={formData.agentState}
                    onChange={(e) => handleInputChange('agentState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="agentZip">ZIP Code *</Label>
                  <Input
                    id="agentZip"
                    value={formData.agentZip}
                    onChange={(e) => handleInputChange('agentZip', e.target.value)}
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
            <h2 className="text-xl font-semibold text-gray-800">Property Information</h2>
            <p className="text-gray-600">Enter the details of the real property to be sold.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="propertyAddress">Property Address *</Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                  placeholder="Enter property street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="propertyCity">City *</Label>
                  <Input
                    id="propertyCity"
                    value={formData.propertyCity}
                    onChange={(e) => handleInputChange('propertyCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="propertyState">State *</Label>
                  <Input
                    id="propertyState"
                    value={formData.propertyState}
                    onChange={(e) => handleInputChange('propertyState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="propertyZip">ZIP Code *</Label>
                  <Input
                    id="propertyZip"
                    value={formData.propertyZip}
                    onChange={(e) => handleInputChange('propertyZip', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="propertyDescription">Property Description (Optional)</Label>
                <Textarea
                  id="propertyDescription"
                  value={formData.propertyDescription}
                  onChange={(e) => handleInputChange('propertyDescription', e.target.value)}
                  placeholder="Describe the property (e.g., 'Single-family residence with 4 bedrooms, 3 bathrooms, 2,500 sq ft')"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Agreement Terms</h2>
            <p className="text-gray-600">Define the commission and agreement terms.</p>
            
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
                <Label htmlFor="commissionPercentage">Commission Percentage (%) *</Label>
                <Input
                  id="commissionPercentage"
                  type="number"
                  step="0.1"
                  value={formData.commissionPercentage}
                  onChange={(e) => handleInputChange('commissionPercentage', e.target.value)}
                  placeholder="e.g., 6"
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
            documentType="Real Estate Agent Agreement"
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
            <h1 className="text-2xl font-bold text-gray-900">Real Estate Agent Agreement</h1>
            <p className="text-gray-600">Create a real estate agent listing agreement</p>
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

export default RealEstateAgentAgreementForm;
