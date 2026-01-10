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

interface PhysicianServicesAgreementFormProps {
  onBack?: () => void;
}

const PhysicianServicesAgreementForm: React.FC<PhysicianServicesAgreementFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const [formData, setFormData] = useState({
    // Location
    country: '',
    state: '',
    
    // Health Care Center Information
    healthCareCenterName: '',
    healthCareCenterAddress: '',
    healthCareCenterCity: '',
    healthCareCenterState: '',
    healthCareCenterZip: '',
    
    // Physician Information
    physicianName: '',
    physicianAddress: '',
    physicianCity: '',
    physicianState: '',
    physicianZip: '',
    licenseState: '',
    
    // Agreement Terms
    effectiveDate: '',
    terminationNoticeDays: '30',
    paymentDay: '15',
    
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
      addText('PHYSICIAN SERVICES AGREEMENT', 16, true, true);
      y += 5;

      // Introduction
      addText(`This Physician Services Agreement ("Agreement") is entered into as of ${formData.effectiveDate} ("Effective Date"), by and between:`);
      y += 3;
      addText(`${formData.healthCareCenterName}, a healthcare entity located at ${formData.healthCareCenterAddress}, ${formData.healthCareCenterCity}, ${formData.healthCareCenterState} ${formData.healthCareCenterZip} ("Health Care Center"),`, 11, false, false, 10);
      addText('And', 11, false, false, 10);
      addText(`${formData.physicianName}, a licensed physician ("Physician").`, 11, false, false, 10);
      y += 3;
      addText('The Health Care Center and the Physician may be referred to individually as a "Party" and collectively as the "Parties."');
      y += 5;

      // 1. Recitals
      addText('1. RECITALS', 12, true);
      addText(`WHEREAS, the Health Care Center desires to retain the services of the Physician to provide professional medical services, including clinical, educational, and related services; and`);
      addText(`WHEREAS, the Physician represents that they are duly licensed to practice medicine in the State of ${formData.licenseState} and are in good standing with all applicable regulatory authorities; and`);
      addText('WHEREAS, the Parties desire to define the terms and conditions under which such services shall be rendered;');
      addText('NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows:');
      y += 3;

      // 2. Scope of Services
      addText('2. SCOPE OF SERVICES', 12, true);
      addText('2.1 The Health Care Center shall refer patients to the Physician for in-person consultations, evaluations, treatment, and, when appropriate, the prescribing of medications or refills.');
      addText('2.2 The Physician agrees to accept such referrals and to provide services in accordance with generally accepted standards of medical practice.');
      addText('2.3 The Physician shall not provide treatment for emergency or life-threatening conditions and shall promptly refer such patients to emergency medical services or appropriate specialists.');
      addText('2.4 The Physician shall render services consistent with their training, qualifications, and applicable medical standards.');
      y += 3;

      // 3. Licensure
      addText('3. LICENSURE AND QUALIFICATIONS', 12, true);
      addText('3.1 The Physician represents and warrants that they:');
      addText(`• Hold an active and unrestricted medical license in the State of ${formData.licenseState};`, 11, false, false, 10);
      addText('• Are duly authorized to prescribe medications;', 11, false, false, 10);
      addText('• Are not subject to probation, suspension, or disciplinary action.', 11, false, false, 10);
      addText('3.2 The Physician shall maintain all required licenses, certifications, and credentials throughout the term of this Agreement and shall immediately notify the Health Care Center of any change in licensure status.');
      y += 3;

      // 4. Compliance
      addText('4. COMPLIANCE WITH LAWS', 12, true);
      addText('The Physician shall comply with all applicable federal, state, and local laws, regulations, and professional standards, including but not limited to:');
      addText('• Medical licensing laws', 11, false, false, 10);
      addText('• HIPAA and patient privacy regulations', 11, false, false, 10);
      addText('• Controlled substances laws', 11, false, false, 10);
      addText('• Health and safety regulations', 11, false, false, 10);
      y += 3;

      // 5. Independent Contractor
      addText('5. INDEPENDENT CONTRACTOR STATUS', 12, true);
      addText('5.1 The Physician is an independent contractor and not an employee of the Health Care Center.');
      addText('5.2 Nothing in this Agreement shall be construed to create an employer-employee, partnership, or joint venture relationship.');
      addText('5.3 The Physician shall be solely responsible for payment of all taxes, insurance, and benefits arising from their services.');
      y += 3;

      // 6. Term and Termination
      addText('6. TERM AND TERMINATION', 12, true);
      addText(`6.1 This Agreement shall commence on the Effective Date and shall continue until terminated by either Party upon ${formData.terminationNoticeDays} days' written notice, unless earlier terminated pursuant to this Agreement.`);
      addText('6.2 Either Party may terminate this Agreement immediately for cause, including but not limited to:');
      addText('• Loss, suspension, or restriction of medical license;', 11, false, false, 10);
      addText('• Exclusion from Medicare, Medicaid, or government programs;', 11, false, false, 10);
      addText('• Breach of this Agreement not cured within ten (10) business days;', 11, false, false, 10);
      addText('• Professional misconduct or unethical behavior;', 11, false, false, 10);
      addText('• Criminal conviction involving fraud, drugs, or moral turpitude;', 11, false, false, 10);
      addText('• Failure to maintain required credentials.', 11, false, false, 10);
      y += 3;

      // 7. Compensation
      addText('7. COMPENSATION', 12, true);
      addText(`7.1 The Health Care Center shall compensate the Physician on the ${formData.paymentDay} day of each month or as otherwise mutually agreed.`);
      addText('7.2 Compensation shall be subject to applicable withholdings and deductions as required by law.');
      addText('7.3 No compensation shall be owed for services not performed or rendered outside the scope of this Agreement.');
      y += 3;

      // 8. Non-Exclusivity
      addText('8. NON-EXCLUSIVITY', 12, true);
      addText('This Agreement is non-exclusive. The Health Care Center may engage other physicians, and the Physician may engage in other professional activities, provided such activities do not interfere with the Physician\'s obligations under this Agreement.');
      y += 3;

      // 9. Medical Records
      addText('9. MEDICAL RECORDS', 12, true);
      addText('All patient records, charts, and documentation created in connection with services provided under this Agreement shall remain the exclusive property of the Health Care Center.');
      y += 3;

      // 10. Patient Relationships
      addText('10. PATIENT RELATIONSHIPS', 12, true);
      addText('Patients treated under this Agreement are patients of the Health Care Center. The Physician shall not independently solicit or treat such patients outside the scope of this Agreement without written authorization.');
      y += 3;

      // 11. Confidentiality
      addText('11. CONFIDENTIALITY', 12, true);
      addText('The Physician shall maintain strict confidentiality regarding all patient information and Health Care Center records, including Protected Health Information (PHI), in compliance with HIPAA and applicable law. These obligations shall survive termination of this Agreement.');
      y += 3;

      // 12. Non-Solicitation
      addText('12. NON-SOLICITATION AND NON-COMPETITION', 12, true);
      addText('For a period of one (1) year following termination of this Agreement, the Physician shall not:');
      addText('• Treat or solicit patients of the Health Care Center;', 11, false, false, 10);
      addText('• Solicit employees or contractors of the Health Care Center;', 11, false, false, 10);
      addText('• Engage in competing services that conflict with the Health Care Center\'s business interests.', 11, false, false, 10);
      y += 3;

      // 13-15 Additional Provisions
      addText('13. CONTINUING EDUCATION', 12, true);
      addText('The Physician shall be solely responsible for maintaining all continuing medical education requirements and professional certifications.');
      y += 3;

      addText('14. FACILITIES', 12, true);
      addText('The Health Care Center may, but is not obligated to, provide facilities or equipment. The Physician shall conduct in-person consultations as required.');
      y += 3;

      addText('15. TERMINATION OBLIGATIONS', 12, true);
      addText('Upon termination:');
      addText('• The Physician shall cooperate in transferring patient care;', 11, false, false, 10);
      addText('• Continue necessary care for up to thirty (30) days if required;', 11, false, false, 10);
      addText('• Return all Health Care Center property;', 11, false, false, 10);
      addText('• Settle outstanding obligations.', 11, false, false, 10);
      y += 3;

      // 16. Indemnification
      addText('16. INDEMNIFICATION', 12, true);
      addText('16.1 By Physician: The Physician shall indemnify and hold harmless the Health Care Center from any claims, damages, or liabilities arising from the Physician\'s negligence, misconduct, or breach of this Agreement.');
      addText('16.2 By Health Care Center: The Health Care Center shall indemnify the Physician for claims arising solely from the Health Care Center\'s negligence.');
      y += 3;

      // 17-20 Additional Sections
      addText('17. FORCE MAJEURE', 12, true);
      addText('Neither Party shall be liable for failure to perform due to events beyond reasonable control, including acts of God, pandemics, governmental actions, or other force majeure events.');
      y += 3;

      addText('18. GOVERNING LAW', 12, true);
      addText(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLawState}.`);
      y += 3;

      addText('19. DISPUTE RESOLUTION', 12, true);
      addText('The Parties shall first attempt to resolve disputes through good-faith negotiation. If unresolved, disputes shall proceed to mediation prior to litigation.');
      y += 3;

      addText('20. ASSIGNMENT', 12, true);
      addText('The Physician may not assign this Agreement without written consent. The Health Care Center may assign this Agreement as necessary.');
      y += 3;

      // 21-25 Final Sections
      addText('21. SEVERABILITY', 12, true);
      addText('If any provision is found unenforceable, the remaining provisions shall remain in full force and effect.');
      y += 3;

      addText('22. ENTIRE AGREEMENT', 12, true);
      addText('This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements or understandings.');
      y += 3;

      addText('23. AMENDMENTS', 12, true);
      addText('This Agreement may be amended only by a written document signed by both Parties.');
      y += 3;

      addText('24. WAIVER', 12, true);
      addText('Failure to enforce any provision shall not constitute a waiver of future enforcement.');
      y += 3;

      addText('25. ATTORNEYS\' FEES', 12, true);
      addText('The prevailing Party in any legal proceeding shall be entitled to recover reasonable attorneys\' fees and costs.');
      y += 3;

      // Additional Terms
      if (formData.additionalTerms) {
        addText('26. ADDITIONAL TERMS', 12, true);
        addText(formData.additionalTerms);
        y += 3;
      }

      // Signatures
      y += 10;
      addText('26. SIGNATURES', 12, true);
      addText('IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date first written above.');
      y += 10;

      addText('HEALTH CARE CENTER', 11, true);
      y += 3;
      addText(`Name: ${formData.healthCareCenterName}`);
      addText('Signature: _______________________________');
      addText(`Date: ${formData.effectiveDate}`);
      y += 10;

      addText('PHYSICIAN', 11, true);
      y += 3;
      addText(`Name: ${formData.physicianName}`);
      addText('Signature: _______________________________');
      addText('Date: _______________________________');

      doc.save('physician-services-agreement.pdf');
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
            <p className="text-gray-600">Select the jurisdiction for this Physician Services Agreement.</p>
            
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
            <p className="text-gray-600">Enter the health care center and physician details.</p>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Health Care Center Information</h3>
              
              <div>
                <Label htmlFor="healthCareCenterName">Health Care Center Name *</Label>
                <Input
                  id="healthCareCenterName"
                  value={formData.healthCareCenterName}
                  onChange={(e) => handleInputChange('healthCareCenterName', e.target.value)}
                  placeholder="Enter health care center name"
                />
              </div>

              <div>
                <Label htmlFor="healthCareCenterAddress">Street Address *</Label>
                <Input
                  id="healthCareCenterAddress"
                  value={formData.healthCareCenterAddress}
                  onChange={(e) => handleInputChange('healthCareCenterAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="healthCareCenterCity">City *</Label>
                  <Input
                    id="healthCareCenterCity"
                    value={formData.healthCareCenterCity}
                    onChange={(e) => handleInputChange('healthCareCenterCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="healthCareCenterState">State *</Label>
                  <Input
                    id="healthCareCenterState"
                    value={formData.healthCareCenterState}
                    onChange={(e) => handleInputChange('healthCareCenterState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="healthCareCenterZip">ZIP Code *</Label>
                  <Input
                    id="healthCareCenterZip"
                    value={formData.healthCareCenterZip}
                    onChange={(e) => handleInputChange('healthCareCenterZip', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <h3 className="font-medium text-gray-700 pt-4">Physician Information</h3>

              <div>
                <Label htmlFor="physicianName">Physician Name *</Label>
                <Input
                  id="physicianName"
                  value={formData.physicianName}
                  onChange={(e) => handleInputChange('physicianName', e.target.value)}
                  placeholder="Enter physician's full name"
                />
              </div>

              <div>
                <Label htmlFor="licenseState">Medical License State *</Label>
                <Input
                  id="licenseState"
                  value={formData.licenseState}
                  onChange={(e) => handleInputChange('licenseState', e.target.value)}
                  placeholder="Enter state where physician is licensed"
                />
              </div>

              <div>
                <Label htmlFor="physicianAddress">Street Address</Label>
                <Input
                  id="physicianAddress"
                  value={formData.physicianAddress}
                  onChange={(e) => handleInputChange('physicianAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="physicianCity">City</Label>
                  <Input
                    id="physicianCity"
                    value={formData.physicianCity}
                    onChange={(e) => handleInputChange('physicianCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="physicianState">State</Label>
                  <Input
                    id="physicianState"
                    value={formData.physicianState}
                    onChange={(e) => handleInputChange('physicianState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="physicianZip">ZIP Code</Label>
                  <Input
                    id="physicianZip"
                    value={formData.physicianZip}
                    onChange={(e) => handleInputChange('physicianZip', e.target.value)}
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
            <h2 className="text-xl font-semibold text-gray-800">Agreement Terms</h2>
            <p className="text-gray-600">Define the agreement terms and conditions.</p>
            
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
                <Label htmlFor="terminationNoticeDays">Termination Notice Period (Days) *</Label>
                <Select value={formData.terminationNoticeDays} onValueChange={(value) => handleInputChange('terminationNoticeDays', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
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
            <h2 className="text-xl font-semibold text-gray-800">Compensation Details</h2>
            <p className="text-gray-600">Define the payment schedule and additional terms.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="paymentDay">Monthly Payment Day *</Label>
                <Select value={formData.paymentDay} onValueChange={(value) => handleInputChange('paymentDay', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st of month</SelectItem>
                    <SelectItem value="15">15th of month</SelectItem>
                    <SelectItem value="last">Last day of month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Label htmlFor="additionalTerms">Additional Terms (Optional)</Label>
                <Textarea
                  id="additionalTerms"
                  value={formData.additionalTerms}
                  onChange={(e) => handleInputChange('additionalTerms', e.target.value)}
                  placeholder="Enter any additional terms, compensation details, or special provisions..."
                  rows={5}
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
            documentType="Physician Services Agreement"
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
            <h1 className="text-2xl font-bold text-gray-900">Physician Services Agreement</h1>
            <p className="text-gray-600">Create a physician services agreement for healthcare centers</p>
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

export default PhysicianServicesAgreementForm;
