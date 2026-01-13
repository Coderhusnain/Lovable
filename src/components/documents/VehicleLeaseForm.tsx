import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, FileText, Car } from 'lucide-react';
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

interface VehicleLeaseFormProps {
  onBack?: () => void;
}

const VehicleLeaseForm: React.FC<VehicleLeaseFormProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const [formData, setFormData] = useState({
    // Location
    country: '',
    state: '',
    
    // Lessor (Vehicle Owner) Information
    lessorName: '',
    lessorAddress: '',
    lessorCity: '',
    lessorState: '',
    lessorZip: '',
    lessorPhone: '',
    lessorEmail: '',
    
    // Lessee (Renter/Driver) Information
    lesseeName: '',
    lesseeAddress: '',
    lesseeCity: '',
    lesseeState: '',
    lesseeZip: '',
    lesseePhone: '',
    lesseeEmail: '',
    lesseeLicenseNumber: '',
    lesseeLicenseState: '',
    
    // Vehicle Information
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    vehicleVIN: '',
    vehicleLicensePlate: '',
    vehicleOdometer: '',
    vehicleCondition: '',
    
    // Lease Terms
    leaseStartDate: '',
    leaseEndDate: '',
    monthlyPayment: '',
    securityDeposit: '',
    paymentDueDay: '',
    lateFee: '',
    
    // Mileage Terms
    annualMileageLimit: '',
    excessMileageFee: '',
    
    // Insurance Requirements
    insuranceRequired: 'yes',
    minimumLiability: '',
    
    // Additional Terms
    maintenanceResponsibility: '',
    useRestrictions: '',
    additionalTerms: '',
    
    // Governing Law
    governingLawState: '',
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

      const stateName = formData.state ? getStateName(parseInt(formData.country), parseInt(formData.state)) : formData.governingLawState;

      // Title
      addText('VEHICLE LEASE AGREEMENT', 18, true, true);
      y += 10;

      // Introduction
      addText(`This Vehicle Lease Agreement ("Agreement") is entered into as of ${formData.leaseStartDate} ("Effective Date"), by and between:`);
      y += 3;
      addText(`LESSOR (Vehicle Owner):`, 11, true);
      addText(`${formData.lessorName}`, 11, false, false, 10);
      addText(`${formData.lessorAddress}, ${formData.lessorCity}, ${formData.lessorState} ${formData.lessorZip}`, 11, false, false, 10);
      addText(`Phone: ${formData.lessorPhone}`, 11, false, false, 10);
      if (formData.lessorEmail) {
        addText(`Email: ${formData.lessorEmail}`, 11, false, false, 10);
      }
      y += 3;
      
      addText(`LESSEE (Vehicle Renter):`, 11, true);
      addText(`${formData.lesseeName}`, 11, false, false, 10);
      addText(`${formData.lesseeAddress}, ${formData.lesseeCity}, ${formData.lesseeState} ${formData.lesseeZip}`, 11, false, false, 10);
      addText(`Phone: ${formData.lesseePhone}`, 11, false, false, 10);
      if (formData.lesseeEmail) {
        addText(`Email: ${formData.lesseeEmail}`, 11, false, false, 10);
      }
      addText(`Driver's License: ${formData.lesseeLicenseNumber} (${formData.lesseeLicenseState})`, 11, false, false, 10);
      y += 5;

      // Section 1: Vehicle Description
      addText('1. VEHICLE DESCRIPTION', 12, true);
      addText('The Lessor agrees to lease to the Lessee the following vehicle:');
      addText(`Year: ${formData.vehicleYear}`, 11, false, false, 10);
      addText(`Make: ${formData.vehicleMake}`, 11, false, false, 10);
      addText(`Model: ${formData.vehicleModel}`, 11, false, false, 10);
      addText(`Color: ${formData.vehicleColor}`, 11, false, false, 10);
      addText(`VIN: ${formData.vehicleVIN}`, 11, false, false, 10);
      addText(`License Plate: ${formData.vehicleLicensePlate}`, 11, false, false, 10);
      addText(`Current Odometer Reading: ${formData.vehicleOdometer} miles`, 11, false, false, 10);
      if (formData.vehicleCondition) {
        addText(`Vehicle Condition at Lease Start: ${formData.vehicleCondition}`, 11, false, false, 10);
      }
      y += 3;

      // Section 2: Lease Term
      addText('2. LEASE TERM', 12, true);
      addText(`The lease term shall begin on ${formData.leaseStartDate} and shall end on ${formData.leaseEndDate}, unless terminated earlier in accordance with this Agreement.`);
      y += 3;

      // Section 3: Payment Terms
      addText('3. PAYMENT TERMS', 12, true);
      addText(`Monthly Lease Payment: $${formData.monthlyPayment}`, 11, false, false, 10);
      addText(`Security Deposit: $${formData.securityDeposit}`, 11, false, false, 10);
      addText(`Payment Due Date: Day ${formData.paymentDueDay} of each month`, 11, false, false, 10);
      if (formData.lateFee) {
        addText(`Late Fee: $${formData.lateFee} for payments received after the 5th day following the due date`, 11, false, false, 10);
      }
      y += 3;

      // Section 4: Mileage
      addText('4. MILEAGE ALLOWANCE', 12, true);
      addText(`Annual Mileage Limit: ${formData.annualMileageLimit} miles per year`);
      if (formData.excessMileageFee) {
        addText(`Excess Mileage Fee: $${formData.excessMileageFee} per mile over the annual limit`);
      }
      y += 3;

      // Section 5: Insurance
      addText('5. INSURANCE REQUIREMENTS', 12, true);
      if (formData.insuranceRequired === 'yes') {
        addText('The Lessee shall maintain comprehensive automobile insurance coverage throughout the lease term with the following minimum requirements:');
        if (formData.minimumLiability) {
          addText(`Minimum Liability Coverage: ${formData.minimumLiability}`, 11, false, false, 10);
        }
        addText('The Lessee shall provide proof of insurance to the Lessor prior to taking possession of the vehicle and upon request.', 11, false, false, 10);
      } else {
        addText('Insurance requirements shall be as mutually agreed upon by the parties.');
      }
      y += 3;

      // Section 6: Maintenance
      addText('6. MAINTENANCE AND REPAIRS', 12, true);
      if (formData.maintenanceResponsibility) {
        addText(formData.maintenanceResponsibility);
      } else {
        addText('The Lessee shall be responsible for routine maintenance including oil changes, tire rotations, and minor repairs. Major repairs resulting from normal wear and tear shall be the responsibility of the Lessor.');
      }
      y += 3;

      // Section 7: Use Restrictions
      addText('7. USE RESTRICTIONS', 12, true);
      addText('The Lessee agrees:');
      addText('• Not to use the vehicle for any illegal purpose;', 11, false, false, 10);
      addText('• Not to sublease or assign this lease without written consent from the Lessor;', 11, false, false, 10);
      addText('• Not to make any modifications to the vehicle without prior written consent;', 11, false, false, 10);
      addText('• To operate the vehicle in accordance with all applicable traffic laws;', 11, false, false, 10);
      addText('• Not to allow unauthorized drivers to operate the vehicle.', 11, false, false, 10);
      if (formData.useRestrictions) {
        addText('Additional Restrictions:', 11, true);
        addText(formData.useRestrictions, 11, false, false, 10);
      }
      y += 3;

      // Section 8: Return of Vehicle
      addText('8. RETURN OF VEHICLE', 12, true);
      addText('Upon termination of this lease, the Lessee shall return the vehicle to the Lessor in the same condition as received, reasonable wear and tear excepted. The Lessee shall be responsible for any damages beyond normal wear and tear.');
      y += 3;

      // Section 9: Default
      addText('9. DEFAULT', 12, true);
      addText('The following shall constitute default under this Agreement:');
      addText('• Failure to make any payment when due;', 11, false, false, 10);
      addText('• Breach of any term of this Agreement;', 11, false, false, 10);
      addText('• Failure to maintain required insurance;', 11, false, false, 10);
      addText('• Use of the vehicle in violation of any restriction herein.', 11, false, false, 10);
      y += 3;

      // Additional Terms
      if (formData.additionalTerms) {
        addText('10. ADDITIONAL TERMS', 12, true);
        addText(formData.additionalTerms);
        y += 3;
      }

      // Governing Law
      addText('11. GOVERNING LAW', 12, true);
      addText(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingLawState || stateName}.`);
      y += 5;

      // Signatures
      addText('SIGNATURES', 14, true, true);
      y += 5;
      addText('By signing below, the parties acknowledge that they have read, understand, and agree to the terms of this Vehicle Lease Agreement.');
      y += 10;

      addText('LESSOR:', 11, true);
      y += 10;
      addText('_______________________________', 11, false, false);
      addText(`${formData.lessorName}`, 11, false, false);
      addText(`Date: _______________`, 11, false, false);
      y += 10;

      addText('LESSEE:', 11, true);
      y += 10;
      addText('_______________________________', 11, false, false);
      addText(`${formData.lesseeName}`, 11, false, false);
      addText(`Date: _______________`, 11, false, false);

      // Save PDF
      doc.save('Vehicle_Lease_Agreement.pdf');
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
            <p className="text-gray-600">Select the jurisdiction for this vehicle lease agreement.</p>
            
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
                <Label htmlFor="governingLawState">Governing Law State *</Label>
                <Input
                  id="governingLawState"
                  value={formData.governingLawState}
                  onChange={(e) => handleInputChange('governingLawState', e.target.value)}
                  placeholder="State whose laws will govern this agreement"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Party Information</h2>
            <p className="text-gray-600">Enter the details of the vehicle owner (Lessor) and renter (Lessee).</p>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Lessor (Vehicle Owner) *</h3>
              
              <div>
                <Label htmlFor="lessorName">Full Name *</Label>
                <Input
                  id="lessorName"
                  value={formData.lessorName}
                  onChange={(e) => handleInputChange('lessorName', e.target.value)}
                  placeholder="Enter lessor's full name"
                />
              </div>

              <div>
                <Label htmlFor="lessorAddress">Street Address *</Label>
                <Input
                  id="lessorAddress"
                  value={formData.lessorAddress}
                  onChange={(e) => handleInputChange('lessorAddress', e.target.value)}
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="lessorCity">City *</Label>
                  <Input
                    id="lessorCity"
                    value={formData.lessorCity}
                    onChange={(e) => handleInputChange('lessorCity', e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="lessorState">State *</Label>
                  <Input
                    id="lessorState"
                    value={formData.lessorState}
                    onChange={(e) => handleInputChange('lessorState', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div>
                  <Label htmlFor="lessorZip">ZIP *</Label>
                  <Input
                    id="lessorZip"
                    value={formData.lessorZip}
                    onChange={(e) => handleInputChange('lessorZip', e.target.value)}
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lessorPhone">Phone *</Label>
                  <Input
                    id="lessorPhone"
                    value={formData.lessorPhone}
                    onChange={(e) => handleInputChange('lessorPhone', e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="lessorEmail">Email</Label>
                  <Input
                    id="lessorEmail"
                    type="email"
                    value={formData.lessorEmail}
                    onChange={(e) => handleInputChange('lessorEmail', e.target.value)}
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-700 mb-3">Lessee (Vehicle Renter) *</h3>
                
                <div>
                  <Label htmlFor="lesseeName">Full Name *</Label>
                  <Input
                    id="lesseeName"
                    value={formData.lesseeName}
                    onChange={(e) => handleInputChange('lesseeName', e.target.value)}
                    placeholder="Enter lessee's full name"
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor="lesseeAddress">Street Address *</Label>
                  <Input
                    id="lesseeAddress"
                    value={formData.lesseeAddress}
                    onChange={(e) => handleInputChange('lesseeAddress', e.target.value)}
                    placeholder="Enter street address"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="lesseeCity">City *</Label>
                    <Input
                      id="lesseeCity"
                      value={formData.lesseeCity}
                      onChange={(e) => handleInputChange('lesseeCity', e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lesseeState">State *</Label>
                    <Input
                      id="lesseeState"
                      value={formData.lesseeState}
                      onChange={(e) => handleInputChange('lesseeState', e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lesseeZip">ZIP *</Label>
                    <Input
                      id="lesseeZip"
                      value={formData.lesseeZip}
                      onChange={(e) => handleInputChange('lesseeZip', e.target.value)}
                      placeholder="ZIP"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="lesseePhone">Phone *</Label>
                    <Input
                      id="lesseePhone"
                      value={formData.lesseePhone}
                      onChange={(e) => handleInputChange('lesseePhone', e.target.value)}
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lesseeEmail">Email</Label>
                    <Input
                      id="lesseeEmail"
                      type="email"
                      value={formData.lesseeEmail}
                      onChange={(e) => handleInputChange('lesseeEmail', e.target.value)}
                      placeholder="Email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="lesseeLicenseNumber">Driver's License # *</Label>
                    <Input
                      id="lesseeLicenseNumber"
                      value={formData.lesseeLicenseNumber}
                      onChange={(e) => handleInputChange('lesseeLicenseNumber', e.target.value)}
                      placeholder="License number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lesseeLicenseState">License State *</Label>
                    <Input
                      id="lesseeLicenseState"
                      value={formData.lesseeLicenseState}
                      onChange={(e) => handleInputChange('lesseeLicenseState', e.target.value)}
                      placeholder="State of issuance"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Vehicle Information</h2>
            <p className="text-gray-600">Enter the details of the vehicle being leased.</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="vehicleYear">Year *</Label>
                  <Input
                    id="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                    placeholder="e.g., 2023"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleMake">Make *</Label>
                  <Input
                    id="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={(e) => handleInputChange('vehicleMake', e.target.value)}
                    placeholder="e.g., Toyota"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleModel">Model *</Label>
                  <Input
                    id="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                    placeholder="e.g., Camry"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vehicleColor">Color *</Label>
                  <Input
                    id="vehicleColor"
                    value={formData.vehicleColor}
                    onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
                    placeholder="e.g., Silver"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleLicensePlate">License Plate *</Label>
                  <Input
                    id="vehicleLicensePlate"
                    value={formData.vehicleLicensePlate}
                    onChange={(e) => handleInputChange('vehicleLicensePlate', e.target.value)}
                    placeholder="e.g., ABC-1234"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="vehicleVIN">VIN (Vehicle Identification Number) *</Label>
                <Input
                  id="vehicleVIN"
                  value={formData.vehicleVIN}
                  onChange={(e) => handleInputChange('vehicleVIN', e.target.value)}
                  placeholder="17-character VIN"
                />
              </div>

              <div>
                <Label htmlFor="vehicleOdometer">Current Odometer Reading (miles) *</Label>
                <Input
                  id="vehicleOdometer"
                  type="number"
                  value={formData.vehicleOdometer}
                  onChange={(e) => handleInputChange('vehicleOdometer', e.target.value)}
                  placeholder="e.g., 25000"
                />
              </div>

              <div>
                <Label htmlFor="vehicleCondition">Vehicle Condition at Lease Start</Label>
                <Textarea
                  id="vehicleCondition"
                  value={formData.vehicleCondition}
                  onChange={(e) => handleInputChange('vehicleCondition', e.target.value)}
                  placeholder="Describe the current condition of the vehicle, note any existing damage or issues"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Lease Terms</h2>
            <p className="text-gray-600">Specify the lease duration, payment terms, and mileage allowance.</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leaseStartDate">Lease Start Date *</Label>
                  <Input
                    id="leaseStartDate"
                    type="date"
                    value={formData.leaseStartDate}
                    onChange={(e) => handleInputChange('leaseStartDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="leaseEndDate">Lease End Date *</Label>
                  <Input
                    id="leaseEndDate"
                    type="date"
                    value={formData.leaseEndDate}
                    onChange={(e) => handleInputChange('leaseEndDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monthlyPayment">Monthly Payment ($) *</Label>
                  <Input
                    id="monthlyPayment"
                    type="number"
                    value={formData.monthlyPayment}
                    onChange={(e) => handleInputChange('monthlyPayment', e.target.value)}
                    placeholder="e.g., 500"
                  />
                </div>
                <div>
                  <Label htmlFor="securityDeposit">Security Deposit ($) *</Label>
                  <Input
                    id="securityDeposit"
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                    placeholder="e.g., 1000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paymentDueDay">Payment Due Day *</Label>
                  <Select value={formData.paymentDueDay} onValueChange={(value) => handleInputChange('paymentDueDay', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 5, 10, 15, 20, 25].map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}th of each month
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lateFee">Late Fee ($)</Label>
                  <Input
                    id="lateFee"
                    type="number"
                    value={formData.lateFee}
                    onChange={(e) => handleInputChange('lateFee', e.target.value)}
                    placeholder="e.g., 50"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-700 mb-3">Mileage Terms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="annualMileageLimit">Annual Mileage Limit *</Label>
                    <Input
                      id="annualMileageLimit"
                      type="number"
                      value={formData.annualMileageLimit}
                      onChange={(e) => handleInputChange('annualMileageLimit', e.target.value)}
                      placeholder="e.g., 12000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="excessMileageFee">Excess Mileage Fee ($/mile)</Label>
                    <Input
                      id="excessMileageFee"
                      value={formData.excessMileageFee}
                      onChange={(e) => handleInputChange('excessMileageFee', e.target.value)}
                      placeholder="e.g., 0.25"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Insurance & Additional Terms</h2>
            <p className="text-gray-600">Specify insurance requirements and any additional terms.</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="insuranceRequired">Insurance Required? *</Label>
                <Select value={formData.insuranceRequired} onValueChange={(value) => handleInputChange('insuranceRequired', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - Lessee must maintain insurance</SelectItem>
                    <SelectItem value="no">No - No insurance requirement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.insuranceRequired === 'yes' && (
                <div>
                  <Label htmlFor="minimumLiability">Minimum Liability Coverage</Label>
                  <Input
                    id="minimumLiability"
                    value={formData.minimumLiability}
                    onChange={(e) => handleInputChange('minimumLiability', e.target.value)}
                    placeholder="e.g., 100/300/100 or $300,000 combined"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="maintenanceResponsibility">Maintenance Responsibilities</Label>
                <Textarea
                  id="maintenanceResponsibility"
                  value={formData.maintenanceResponsibility}
                  onChange={(e) => handleInputChange('maintenanceResponsibility', e.target.value)}
                  placeholder="Describe who is responsible for maintenance, oil changes, repairs, etc."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="useRestrictions">Use Restrictions</Label>
                <Textarea
                  id="useRestrictions"
                  value={formData.useRestrictions}
                  onChange={(e) => handleInputChange('useRestrictions', e.target.value)}
                  placeholder="Any additional restrictions on vehicle use (e.g., no commercial use, geographic limitations)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="additionalTerms">Additional Terms</Label>
                <Textarea
                  id="additionalTerms"
                  value={formData.additionalTerms}
                  onChange={(e) => handleInputChange('additionalTerms', e.target.value)}
                  placeholder="Any other terms or conditions not covered above"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <UserInfoStep
            onBack={prevStep}
            onGenerate={generatePDF}
            documentType="Vehicle Lease Agreement"
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
          <div className="p-2 bg-orange-100 rounded-lg">
            <Car className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vehicle Lease Agreement</h1>
            <p className="text-gray-600">Create a contract for leasing a vehicle</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5, 6].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNum ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum}
              </div>
              {stepNum < 6 && (
                <div className={`w-12 h-1 mx-1 ${step > stepNum ? 'bg-orange-600' : 'bg-gray-200'}`} />
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

export default VehicleLeaseForm;
