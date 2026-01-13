import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, FileText, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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

interface HealthcarePOAFormProps {
  onBack?: () => void;
}

const HealthcarePOAForm: React.FC<HealthcarePOAFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const [formData, setFormData] = useState({
    // Location
    country: '',
    state: '',
    county: '',
    
    // Principal Information
    principalName: '',
    principalAddress: '',
    principalCity: '',
    principalState: '',
    principalZip: '',
    principalPhone: '',
    principalDOB: '',
    
    // Primary Agent Information
    agentName: '',
    agentAddress: '',
    agentCity: '',
    agentState: '',
    agentZip: '',
    agentPhone: '',
    agentRelationship: '',
    
    // Alternate Agent Information
    alternateAgentName: '',
    alternateAgentAddress: '',
    alternateAgentPhone: '',
    alternateAgentRelationship: '',
    
    // Healthcare Directives
    lifeSupportDirective: '',
    painManagement: true,
    organDonation: '',
    religiousConsiderations: '',
    
    // Specific Instructions
    specificInstructions: '',
    treatmentPreferences: '',
    
    // Statement Details
    effectiveDate: '',
    expirationProvision: '',
    
    // Witnesses
    witness1Name: '',
    witness1Address: '',
    witness2Name: '',
    witness2Address: '',
    
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
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
      addText('HEALTHCARE POWER OF ATTORNEY', 18, true, true);
      addText('(Durable Power of Attorney for Health Care Decisions)', 11, false, true);
      y += 10;

      // Jurisdiction
      addText(`STATE OF ${stateName.toUpperCase()}`, 12, true);
      y += 5;

      // Principal Declaration
      addText('DESIGNATION OF HEALTHCARE AGENT', 14, true);
      y += 3;
      addText(`I, ${formData.principalName}, of ${formData.principalAddress}, ${formData.principalCity}, ${formData.principalState} ${formData.principalZip}, born on ${formData.principalDOB}, being of sound mind, do hereby designate and appoint the following individual as my Healthcare Agent to make healthcare decisions on my behalf:`);
      y += 5;

      // Primary Agent
      addText('PRIMARY HEALTHCARE AGENT:', 12, true);
      addText(`Name: ${formData.agentName}`, 11, false, false, 10);
      addText(`Address: ${formData.agentAddress}, ${formData.agentCity}, ${formData.agentState} ${formData.agentZip}`, 11, false, false, 10);
      addText(`Phone: ${formData.agentPhone}`, 11, false, false, 10);
      addText(`Relationship: ${formData.agentRelationship}`, 11, false, false, 10);
      y += 5;

      // Alternate Agent
      if (formData.alternateAgentName) {
        addText('ALTERNATE HEALTHCARE AGENT:', 12, true);
        addText(`Name: ${formData.alternateAgentName}`, 11, false, false, 10);
        if (formData.alternateAgentAddress) {
          addText(`Address: ${formData.alternateAgentAddress}`, 11, false, false, 10);
        }
        if (formData.alternateAgentPhone) {
          addText(`Phone: ${formData.alternateAgentPhone}`, 11, false, false, 10);
        }
        if (formData.alternateAgentRelationship) {
          addText(`Relationship: ${formData.alternateAgentRelationship}`, 11, false, false, 10);
        }
        y += 5;
      }

      // Powers Granted
      addText('POWERS GRANTED TO MY HEALTHCARE AGENT', 14, true);
      addText('I grant my Healthcare Agent full power and authority to make healthcare decisions on my behalf, including but not limited to:');
      addText('• Consent, refuse, or withdraw consent to any medical treatment or procedure;', 11, false, false, 10);
      addText('• Select and discharge healthcare providers and institutions;', 11, false, false, 10);
      addText('• Access my medical records and disclose their contents;', 11, false, false, 10);
      addText('• Authorize pain relief and comfort care measures;', 11, false, false, 10);
      addText('• Make decisions regarding life-sustaining treatment;', 11, false, false, 10);
      addText('• Make anatomical gift decisions on my behalf.', 11, false, false, 10);
      y += 5;

      // Life Support Directive
      addText('DIRECTIVES REGARDING LIFE-SUSTAINING TREATMENT', 14, true);
      addText(formData.lifeSupportDirective || 'My Healthcare Agent shall make decisions regarding life-sustaining treatment based on their knowledge of my wishes and in my best interest.');
      y += 5;

      // Pain Management
      addText('PAIN MANAGEMENT', 12, true);
      addText(formData.painManagement ? 'I direct that I be given appropriate pain medication even if it may hasten my death.' : 'Special pain management instructions may be provided by my Healthcare Agent.');
      y += 3;

      // Organ Donation
      if (formData.organDonation) {
        addText('ANATOMICAL GIFT DIRECTIVE', 12, true);
        addText(formData.organDonation);
        y += 3;
      }

      // Religious Considerations
      if (formData.religiousConsiderations) {
        addText('RELIGIOUS/SPIRITUAL CONSIDERATIONS', 12, true);
        addText(formData.religiousConsiderations);
        y += 3;
      }

      // Specific Instructions
      if (formData.specificInstructions) {
        addText('SPECIFIC INSTRUCTIONS', 12, true);
        addText(formData.specificInstructions);
        y += 3;
      }

      // Treatment Preferences
      if (formData.treatmentPreferences) {
        addText('TREATMENT PREFERENCES', 12, true);
        addText(formData.treatmentPreferences);
        y += 3;
      }

      // Effective Date
      addText('EFFECTIVE DATE AND DURATION', 12, true);
      addText(`This Healthcare Power of Attorney shall become effective on ${formData.effectiveDate || 'the date I am determined to be incapacitated'}.`);
      if (formData.expirationProvision) {
        addText(`Expiration: ${formData.expirationProvision}`);
      } else {
        addText('This document shall remain in effect until revoked by me in writing.');
      }
      y += 5;

      // Revocation
      addText('RIGHT OF REVOCATION', 12, true);
      addText('I understand that I may revoke this Healthcare Power of Attorney at any time by notifying my Healthcare Agent or healthcare provider orally or in writing.');
      y += 5;

      // Principal Signature
      addText('PRINCIPAL SIGNATURE', 14, true, true);
      y += 10;
      addText('_______________________________', 11, false, false);
      addText(`${formData.principalName}`, 11, false, false);
      addText('Principal', 10, false, false);
      addText(`Date: _______________`, 11);
      y += 10;

      // Witness Signatures
      addText('WITNESS ATTESTATION', 14, true, true);
      y += 5;
      addText('We declare that the person who signed this document, or asked another to sign for them, did so in our presence, and that we believe the Principal to be of sound mind.');
      y += 10;

      addText('Witness 1:', 11, true);
      addText(`Name: ${formData.witness1Name}`, 11, false, false, 10);
      addText(`Address: ${formData.witness1Address}`, 11, false, false, 10);
      addText('Signature: _______________________________', 11, false, false, 10);
      y += 5;

      addText('Witness 2:', 11, true);
      addText(`Name: ${formData.witness2Name}`, 11, false, false, 10);
      addText(`Address: ${formData.witness2Address}`, 11, false, false, 10);
      addText('Signature: _______________________________', 11, false, false, 10);
      y += 10;

      // Notary Block
      doc.addPage();
      y = 20;
      addText('NOTARY ACKNOWLEDGMENT', 14, true, true);
      y += 5;
      addText(`STATE OF ${formData.notaryState.toUpperCase() || stateName.toUpperCase()}`);
      addText(`COUNTY OF ${formData.notaryCounty.toUpperCase() || formData.county.toUpperCase()}`);
      y += 5;
      addText(`On this ______ day of ____________, 20___, before me personally appeared ${formData.principalName}, known to me (or proved to me on the basis of satisfactory evidence) to be the person whose name is subscribed to this instrument, and acknowledged that they executed the same.`);
      y += 15;

      addText('_______________________________', 11, false, false);
      addText('Notary Public', 11, false, false);
      addText('My Commission Expires: _______________', 10, false, false);
      y += 5;
      addText('[NOTARY SEAL]', 10, false, false);

      // Save PDF
      doc.save('Healthcare_Power_of_Attorney.pdf');
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
            <p className="text-gray-600">Select the jurisdiction for this Healthcare Power of Attorney.</p>
            
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
            <h2 className="text-xl font-semibold text-gray-800">Principal Information</h2>
            <p className="text-gray-600">Enter your details as the person granting healthcare decision authority.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="principalName">Your Full Legal Name *</Label>
                <Input
                  id="principalName"
                  value={formData.principalName}
                  onChange={(e) => handleInputChange('principalName', e.target.value)}
                  placeholder="Enter your full legal name"
                />
              </div>

              <div>
                <Label htmlFor="principalDOB">Date of Birth *</Label>
                <Input
                  id="principalDOB"
                  type="date"
                  value={formData.principalDOB}
                  onChange={(e) => handleInputChange('principalDOB', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="principalAddress">Street Address *</Label>
                <Input
                  id="principalAddress"
                  value={formData.principalAddress}
                  onChange={(e) => handleInputChange('principalAddress', e.target.value)}
                  placeholder="Enter your street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="principalCity">City *</Label>
                  <Input
                    id="principalCity"
                    value={formData.principalCity}
                    onChange={(e) => handleInputChange('principalCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="principalState">State *</Label>
                  <Input
                    id="principalState"
                    value={formData.principalState}
                    onChange={(e) => handleInputChange('principalState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="principalZip">ZIP Code *</Label>
                  <Input
                    id="principalZip"
                    value={formData.principalZip}
                    onChange={(e) => handleInputChange('principalZip', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="principalPhone">Phone Number</Label>
                <Input
                  id="principalPhone"
                  value={formData.principalPhone}
                  onChange={(e) => handleInputChange('principalPhone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Healthcare Agent Information</h2>
            <p className="text-gray-600">Enter details of the person who will make healthcare decisions on your behalf.</p>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Primary Healthcare Agent *</h3>
              
              <div>
                <Label htmlFor="agentName">Agent's Full Name *</Label>
                <Input
                  id="agentName"
                  value={formData.agentName}
                  onChange={(e) => handleInputChange('agentName', e.target.value)}
                  placeholder="Enter agent's full legal name"
                />
              </div>

              <div>
                <Label htmlFor="agentRelationship">Relationship to You *</Label>
                <Input
                  id="agentRelationship"
                  value={formData.agentRelationship}
                  onChange={(e) => handleInputChange('agentRelationship', e.target.value)}
                  placeholder="e.g., Spouse, Child, Sibling, Friend"
                />
              </div>

              <div>
                <Label htmlFor="agentAddress">Agent's Street Address *</Label>
                <Input
                  id="agentAddress"
                  value={formData.agentAddress}
                  onChange={(e) => handleInputChange('agentAddress', e.target.value)}
                  placeholder="Enter agent's street address"
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

              <div>
                <Label htmlFor="agentPhone">Agent's Phone Number *</Label>
                <Input
                  id="agentPhone"
                  value={formData.agentPhone}
                  onChange={(e) => handleInputChange('agentPhone', e.target.value)}
                  placeholder="Enter agent's phone number"
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-700 mb-3">Alternate Healthcare Agent (Optional)</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="alternateAgentName">Alternate Agent Name</Label>
                    <Input
                      id="alternateAgentName"
                      value={formData.alternateAgentName}
                      onChange={(e) => handleInputChange('alternateAgentName', e.target.value)}
                      placeholder="Enter alternate agent's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alternateAgentRelationship">Relationship</Label>
                    <Input
                      id="alternateAgentRelationship"
                      value={formData.alternateAgentRelationship}
                      onChange={(e) => handleInputChange('alternateAgentRelationship', e.target.value)}
                      placeholder="Relationship to you"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="alternateAgentAddress">Address</Label>
                    <Input
                      id="alternateAgentAddress"
                      value={formData.alternateAgentAddress}
                      onChange={(e) => handleInputChange('alternateAgentAddress', e.target.value)}
                      placeholder="Enter address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alternateAgentPhone">Phone Number</Label>
                    <Input
                      id="alternateAgentPhone"
                      value={formData.alternateAgentPhone}
                      onChange={(e) => handleInputChange('alternateAgentPhone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Healthcare Directives</h2>
            <p className="text-gray-600">Specify your wishes regarding medical treatment and end-of-life care.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="lifeSupportDirective">Life-Sustaining Treatment Directive *</Label>
                <Select value={formData.lifeSupportDirective} onValueChange={(value) => handleInputChange('lifeSupportDirective', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your directive" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="I want life-sustaining treatment to be provided unless I am in a terminal condition or permanent unconscious state.">
                      Provide life-sustaining treatment unless terminal or permanent unconscious
                    </SelectItem>
                    <SelectItem value="I want life-sustaining treatment to be withheld or withdrawn if it would only prolong the dying process.">
                      Withhold/withdraw if only prolonging dying process
                    </SelectItem>
                    <SelectItem value="I want all available life-sustaining treatment to be provided regardless of my condition.">
                      Provide all available treatment regardless of condition
                    </SelectItem>
                    <SelectItem value="I grant my Healthcare Agent full discretion to make decisions about life-sustaining treatment.">
                      Agent has full discretion
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="painManagement"
                  checked={formData.painManagement}
                  onCheckedChange={(checked) => handleInputChange('painManagement', checked as boolean)}
                />
                <Label htmlFor="painManagement" className="text-sm">
                  I want to receive appropriate pain medication even if it may hasten my death
                </Label>
              </div>

              <div>
                <Label htmlFor="organDonation">Organ Donation Wishes</Label>
                <Select value={formData.organDonation} onValueChange={(value) => handleInputChange('organDonation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organ donation preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="I wish to donate any organs or tissues that may be useful.">
                      Donate any useful organs/tissues
                    </SelectItem>
                    <SelectItem value="I wish to donate only the following organs/tissues: (to be specified).">
                      Donate specific organs only
                    </SelectItem>
                    <SelectItem value="I do not wish to donate any organs or tissues.">
                      Do not donate
                    </SelectItem>
                    <SelectItem value="I leave organ donation decisions to my Healthcare Agent.">
                      Agent decides
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="religiousConsiderations">Religious/Spiritual Considerations</Label>
                <Textarea
                  id="religiousConsiderations"
                  value={formData.religiousConsiderations}
                  onChange={(e) => handleInputChange('religiousConsiderations', e.target.value)}
                  placeholder="Any religious or spiritual beliefs that should guide healthcare decisions"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="specificInstructions">Specific Instructions</Label>
                <Textarea
                  id="specificInstructions"
                  value={formData.specificInstructions}
                  onChange={(e) => handleInputChange('specificInstructions', e.target.value)}
                  placeholder="Any specific medical treatments you want or don't want"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="treatmentPreferences">Treatment Preferences</Label>
                <Textarea
                  id="treatmentPreferences"
                  value={formData.treatmentPreferences}
                  onChange={(e) => handleInputChange('treatmentPreferences', e.target.value)}
                  placeholder="Preferences about hospitalization, home care, hospice, etc."
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Witnesses & Final Details</h2>
            <p className="text-gray-600">Provide witness information and final document details.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="effectiveDate">Effective Date</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => handleInputChange('effectiveDate', e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">Leave blank if effective upon incapacity</p>
              </div>

              <div>
                <Label htmlFor="expirationProvision">Expiration Provision</Label>
                <Input
                  id="expirationProvision"
                  value={formData.expirationProvision}
                  onChange={(e) => handleInputChange('expirationProvision', e.target.value)}
                  placeholder="e.g., 'Until revoked' or specific date"
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-700 mb-3">Witness 1 *</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="witness1Name">Name *</Label>
                    <Input
                      id="witness1Name"
                      value={formData.witness1Name}
                      onChange={(e) => handleInputChange('witness1Name', e.target.value)}
                      placeholder="Witness full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="witness1Address">Address *</Label>
                    <Input
                      id="witness1Address"
                      value={formData.witness1Address}
                      onChange={(e) => handleInputChange('witness1Address', e.target.value)}
                      placeholder="Witness address"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-700 mb-3">Witness 2 *</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="witness2Name">Name *</Label>
                    <Input
                      id="witness2Name"
                      value={formData.witness2Name}
                      onChange={(e) => handleInputChange('witness2Name', e.target.value)}
                      placeholder="Witness full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="witness2Address">Address *</Label>
                    <Input
                      id="witness2Address"
                      value={formData.witness2Address}
                      onChange={(e) => handleInputChange('witness2Address', e.target.value)}
                      placeholder="Witness address"
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

      case 6:
        return (
          <UserInfoStep
            onBack={prevStep}
            onGenerate={generatePDF}
            documentType="Healthcare Power of Attorney"
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
          <div className="p-2 bg-red-100 rounded-lg">
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Healthcare Power of Attorney</h1>
            <p className="text-gray-600">Authorize someone to make medical decisions on your behalf</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5, 6].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 6 && (
                <div className={`w-12 h-1 mx-1 ${step > stepNum ? 'bg-red-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {renderStepContent()}

        {step < 6 && (
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

export default HealthcarePOAForm;
