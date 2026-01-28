import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormWizard } from "./FormWizard";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { generateGuidePDF } from "@/utils/generateGuidePDF";
import CountryStateAPI from 'countries-states-cities';

// Define section structure
interface Section {
  id: string;
  title: string;
  description?: string;
  questions: string[];
  nextSectionId?: string;
}

// Define the question type interface
interface Question {
  id: string;
  type: 'text' | 'select' | 'radio' | 'textarea' | 'confirmation' | 'date' | 'number' | 'email' | 'phone' | 'agent' | 'physician' | 'witness';
  text: string;
  options?: string[];
  nextQuestionId?: Record<string, string>;
  defaultNextId?: string;
}

// Define interfaces for the countries-states-cities data structure
interface CountryData {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  phone_code: string;
  capital: string;
  currency: string;
  native: string;
  region: string;
  subregion: string;
  emoji: string;
}

interface StateData {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  state_code: string;
}

// Country to states/provinces mapping using comprehensive database with proper ID relationships
const getAllCountries = (): CountryData[] => {
  return CountryStateAPI.getAllCountries();
};

const getStatesByCountry = (countryId: number): StateData[] => {
  return CountryStateAPI.getStatesOfCountry(countryId);
};

// Helper functions to get display names from IDs
const getCountryName = (countryId: string): string => {
  const country = CountryStateAPI.getAllCountries().find(c => c.id.toString() === countryId);
  return country?.name || `Country ID: ${countryId}`;
};

const getStateName = (countryId: string, stateId: string): string => {
  const country = CountryStateAPI.getAllCountries().find(c => c.id.toString() === countryId);
  if (!country) return `State ID: ${stateId}`;
  
  const states = CountryStateAPI.getStatesOfCountry(country.id);
  const state = states.find(s => s.id.toString() === stateId);
  return state?.name || `State ID: ${stateId}`;
};

// Health Care Agent interface
interface HealthCareAgent {
  name: string;
  address: string;
  phone: string;
  designation: string;
  relation: string;
}

// Physician interface
interface Physician {
  name: string;
  address: string;
  phone: string;
}

// Witness interface
interface Witness {
  name: string;
  addressLine1: string;
  addressLine2: string;
}

// Sections definition - grouping questions by category
const sections: Record<string, Section> = {
  'location_selection': {
    id: 'location_selection',
    title: 'Location Selection',
    description: 'Select the country and state/province where this Living Will will be executed',
    questions: ['country', 'state'],
    nextSectionId: 'declarant'
  },
  'declarant': {
    id: 'declarant',
    title: 'Declarant Information',
    description: 'Enter information about the person making this Living Will',
    questions: ['declarant_name', 'declarant_address', 'declarant_city', 'declarant_zip'],
    nextSectionId: 'primary_agent'
  },
  'primary_agent': {
    id: 'primary_agent',
    title: 'Primary Health Care Agent',
    description: 'Designate your primary health care agent',
    questions: ['primary_agent_info'],
    nextSectionId: 'first_alternate'
  },
  'first_alternate': {
    id: 'first_alternate',
    title: 'First Alternate Agent',
    description: 'Designate your first alternate health care agent',
    questions: ['first_alternate_info'],
    nextSectionId: 'second_alternate'
  },
  'second_alternate': {
    id: 'second_alternate',
    title: 'Second Alternate Agent',
    description: 'Designate your second alternate health care agent',
    questions: ['second_alternate_info'],
    nextSectionId: 'physician'
  },  'physician': {
    id: 'physician',
    title: 'Primary Physician',
    description: 'Enter your primary physician information',
    questions: ['primary_physician_info'],
    nextSectionId: 'medical_treatment'
  },
  'medical_treatment': {
    id: 'medical_treatment',
    title: 'Medical Treatment',
    description: 'Specify your medical treatment preferences and instructions',
    questions: ['medical_treatment_preference'],
    nextSectionId: 'nutrition'
  },
  'nutrition': {
    id: 'nutrition',
    title: 'Nutrition and Hydration',
    description: 'Specify your preferences for artificial nutrition and hydration',
    questions: ['nutrition_preference'],
    nextSectionId: 'directions'
  },
  'directions': {
    id: 'directions',
    title: 'Other Directions',
    description: 'Additional medical or legal instructions/preferences',
    questions: ['other_directions'],
    nextSectionId: 'witnesses'
  },
  'witnesses': {
    id: 'witnesses',
    title: 'Witness Information',
    description: 'Enter witness information for the document',
    questions: ['witness1_info', 'witness2_info'],
    nextSectionId: 'additional_witness'
  },
  'additional_witness': {
    id: 'additional_witness',
    title: 'Additional Witness (Optional)',
    description: 'Required for residents of skilled nursing facility or if applicable',
    questions: ['additional_witness_info'],
    nextSectionId: 'confirmation'
  },
  'confirmation': {
    id: 'confirmation',
    title: 'Confirmation',
    description: 'Review and confirm your information',
    questions: ['confirmation']
  }
};

// Define the question flow
const questions: Record<string, Question> = {
  'country': {
    id: 'country',
    type: 'select',
    text: 'Select your country:',
    options: getAllCountries().map(country => `${country.id}|${country.name}`),
    defaultNextId: 'state'
  },
  'state': {
    id: 'state',
    type: 'select',
    text: 'Select your state/province:',
    options: [], // Will be populated dynamically
    defaultNextId: 'declarant_name'
  },
  'declarant_name': {
    id: 'declarant_name',
    type: 'text',
    text: 'Declarant\'s Full Name:',
    defaultNextId: 'declarant_address'
  },
  'declarant_address': {
    id: 'declarant_address',
    type: 'text',
    text: 'Declarant\'s Address:',
    defaultNextId: 'declarant_city'
  },
  'declarant_city': {
    id: 'declarant_city',
    type: 'text',
    text: 'City:',
    defaultNextId: 'declarant_zip'
  },
  'declarant_zip': {
    id: 'declarant_zip',
    type: 'text',
    text: 'ZIP Code:',
    defaultNextId: 'primary_agent_info'
  },
  'primary_agent_info': {
    id: 'primary_agent_info',
    type: 'agent',
    text: 'Primary Health Care Agent Information:',
    defaultNextId: 'first_alternate_info'
  },
  'first_alternate_info': {
    id: 'first_alternate_info',
    type: 'agent',
    text: 'First Alternate Agent Information:',
    defaultNextId: 'second_alternate_info'
  },
  'second_alternate_info': {
    id: 'second_alternate_info',
    type: 'agent',
    text: 'Second Alternate Agent Information:',
    defaultNextId: 'primary_physician_info'
  },
  'primary_physician_info': {
    id: 'primary_physician_info',
    type: 'physician',
    text: 'Primary Physician Information:',
    defaultNextId: 'other_directions'
  },
  'other_directions': {
    id: 'other_directions',
    type: 'textarea',
    text: 'Other Directions (Additional medical or legal instructions/preferences):',
    defaultNextId: 'witness1_info'
  },
  'witness1_info': {
    id: 'witness1_info',
    type: 'witness',
    text: 'Witness 1 Information:',
    defaultNextId: 'witness2_info'
  },
  'witness2_info': {
    id: 'witness2_info',
    type: 'witness',
    text: 'Witness 2 Information:',
    defaultNextId: 'additional_witness_info'
  },  'additional_witness_info': {
    id: 'additional_witness_info',
    type: 'witness',
    text: 'Additional Witness Information (Optional):',
    defaultNextId: 'confirmation'
  },  'medical_treatment_preference': {
    id: 'medical_treatment_preference',
    type: 'radio',
    text: 'Medical Treatment Instructions - These instructions depict my commitment to decline medical treatment in the circumstances mentioned below: In the event that I am diagnosed with an incurable or irreversible physical or mental condition, from which there is no reasonable prospect of recovery, I hereby instruct my Health Agent to withhold or withdraw any medical interventions that serve solely to prolong the dying process. Such conditions shall include, but are not limited to: (a) a terminal illness; (b) a state of permanent unconsciousness; or (c) a minimally conscious state wherein I am permanently incapable of making informed decisions or communicating my preferences. I instruct that my Health Agent be confined to interventions aimed solely at ensuring my comfort and alleviating pain, including any discomfort that may result from the withholding or withdrawal of life-sustaining treatment. I acknowledge that the law does not obligate me to specify in advance the particular treatments to be limited or declined.',
    options: ['I agree to these medical treatment instructions', 'I do not agree to these medical treatment instructions'],
    defaultNextId: 'nutrition_preference'
  },
  'nutrition_preference': {
    id: 'nutrition_preference',
    type: 'radio',
    text: 'Nutrition and Hydration Preference:',
    options: ['TO RECEIVE artificially administered nutrition and hydration', 'NOT TO RECEIVE artificially administered nutrition and hydration'],
    defaultNextId: 'other_directions'
  },  'confirmation': {
    id: 'confirmation',
    type: 'confirmation',
    text: 'Thank you for providing the information. We will generate your Living Will based on your answers.',
  }
};


// TODO: Implement FormWizard steps and onFinish for LivingWillForm


// Helper functions for country/state names

const LivingWillForm = () => {
  // Initial values for all fields
  const initialValues = {
    country: '',
    state: '',
    declarant_name: '',
    declarant_address: '',
    declarant_city: '',
    declarant_zip: '',
    primaryAgent_name: '',
    primaryAgent_address: '',
    primaryAgent_phone: '',
    primaryAgent_designation: '',
    primaryAgent_relation: '',
    firstAlternate_name: '',
    firstAlternate_address: '',
    firstAlternate_phone: '',
    firstAlternate_designation: '',
    firstAlternate_relation: '',
    secondAlternate_name: '',
    secondAlternate_address: '',
    secondAlternate_phone: '',
    secondAlternate_designation: '',
    secondAlternate_relation: '',
    primaryPhysician_name: '',
    primaryPhysician_address: '',
    primaryPhysician_phone: '',
    medical_treatment_preference: '',
    nutrition_preference: '',
    other_directions: '',
    witness1_name: '',
    witness1_addressLine1: '',
    witness1_addressLine2: '',
    witness2_name: '',
    witness2_addressLine1: '',
    witness2_addressLine2: '',
    additionalWitness_name: '',
    additionalWitness_addressLine1: '',
    additionalWitness_addressLine2: '',
  };

  // Steps: max 3 fields per step, grouped logically
  // FormWizard expects steps as label/content pairs, but content must be a ReactNode, not a function
  // We'll use a stateful approach to pass values/setFieldValue via FormWizard's renderField prop
  const steps = [
    { label: 'Location', content: null },
    { label: 'Declarant Info', content: null },
    { label: 'Declarant ZIP', content: null },
    { label: 'Primary Health Care Agent', content: null },
    { label: 'Agent Details', content: null },
    { label: 'First Alternate Agent', content: null },
    { label: 'First Alternate Details', content: null },
    { label: 'Second Alternate Agent', content: null },
    { label: 'Second Alternate Details', content: null },
    { label: 'Primary Physician', content: null },
    { label: 'Medical Preferences', content: null },
    { label: 'Other Directions', content: null },
    { label: 'Witness 1', content: null },
    { label: 'Witness 2', content: null },
    { label: 'Additional Witness (optional)', content: null },
  ];

  // PDF generation logic (moved to onFinish)
  function generateLivingWillPDF(values: any) {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("LIVING WILL", 105, 20, { align: "center" });
      doc.setFontSize(12);
      doc.text("(Living Will Declaration)", 105, 30, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      let y = 45;
      const lineHeight = 6;
      const pageHeight = 280;
      doc.setFont("helvetica", "bold");
      doc.text("STATEMENT OF DIRECTIVE", 15, y);
      y += lineHeight + 3;
      doc.setFont("helvetica", "normal");
      const selectedCountry = getCountryName(values.country || '');
      const selectedState = getStateName(values.country || '', values.state || '');
      const declarantText = `I, ${values.declarant_name || '________________'}, residing at ${values.declarant_address || '_____________'}, ${selectedState}, ${selectedCountry}, ${values.declarant_zip || '___________'}, being of full legal capacity and sound mind, do make this statement as a Directive to be followed in case I become permanently unable to make, or participate in making own medical decisions.`;
      const declarantLines = doc.splitTextToSize(declarantText, 170);
      declarantLines.forEach((line: string) => { doc.text(line, 15, y); y += lineHeight; });
      y += lineHeight + 5;
      doc.setFont("helvetica", "bold");
      doc.text("APPOINTMENT OF HEALTH CARE AGENT", 15, y);
      y += lineHeight + 3;
      doc.setFont("helvetica", "normal");
      const agentText = "I hereby appoint the following person as my Health Care Agent (hereinafter referred as 'Health Agent') in case I become unable to make my own health care decision as mentioned in Clause 1";
      const agentLines = doc.splitTextToSize(agentText, 170);
      agentLines.forEach((line: string) => { doc.text(line, 15, y); y += lineHeight; });
      y += lineHeight + 3;
      doc.text(`Name: ${values.primaryAgent_name || '____________________'}`, 15, y); y += lineHeight;
      doc.text(`Address: ${values.primaryAgent_address || '______________________'}`, 15, y); y += lineHeight;
      doc.text(`Phone: ${values.primaryAgent_phone || '____________________'}`, 15, y); y += lineHeight;
      doc.text(`Designation: ${values.primaryAgent_designation || '_________________'}`, 15, y); y += lineHeight;
      doc.text(`Relation, if any: ${values.primaryAgent_relation || '________________'}`, 15, y); y += lineHeight + 3;
      if (y > pageHeight - 80) { doc.addPage(); y = 20; }
      const firstAlternateText = "In case I revoke my Health Agent authority, or if my agent is not willing or unable to undertake the responsibilities stipulated in this Living Will, I designate my First Alternate Agent:";
      const firstAlternateLines = doc.splitTextToSize(firstAlternateText, 170);
      firstAlternateLines.forEach((line: string) => { doc.text(line, 15, y); y += lineHeight; });
      y += lineHeight + 3;
      doc.setFont("helvetica", "bold");
      doc.text("First Alternate:", 15, y); y += lineHeight + 5;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${values.firstAlternate_name || '____________________'}`, 15, y); y += lineHeight;
      doc.text(`Address: ${values.firstAlternate_address || '______________________'}`, 15, y); y += lineHeight;
      doc.text(`Phone: ${values.firstAlternate_phone || '____________________'}`, 15, y); y += lineHeight;
      doc.text(`Designation: ${values.firstAlternate_designation || '_________________'}`, 15, y); y += lineHeight;
      doc.text(`Relation, if any: ${values.firstAlternate_relation || '________________'}`, 15, y); y += lineHeight + 3;
      const secondAlternateText = "If I revoke the authority of my Health Agent of First Alternate, or neither is willing, or unable to undertake the duties stipulated in this Living Will, I designate my Second Alternate Agent:";
      const secondAlternateLines = doc.splitTextToSize(secondAlternateText, 170);
      secondAlternateLines.forEach((line: string) => { doc.text(line, 15, y); y += lineHeight; });
      y += lineHeight + 3;
      doc.setFont("helvetica", "bold");
      doc.text("Second Alternate Agent:", 15, y); y += lineHeight + 5;
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${values.secondAlternate_name || '____________________'}`, 15, y); y += lineHeight;
      doc.text(`Address: ${values.secondAlternate_address || '______________________'}`, 15, y); y += lineHeight;
      doc.text(`Phone: ${values.secondAlternate_phone || '____________________'}`, 15, y); y += lineHeight;
      doc.text(`Designation: ${values.secondAlternate_designation || '_________________'}`, 15, y); y += lineHeight;
      doc.text(`Relation, if any: ${values.secondAlternate_relation || '________________'}`, 15, y); y += lineHeight + 5;
      if (y > pageHeight - 80) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.text("MEDICAL TREATMENT", 15, y); y += lineHeight + 3;
      doc.setFont("helvetica", "normal");
      const medicalText = values.medical_treatment_preference || "These instructions depict my commitment to decline medical treatment in the circumstances mentioned below:";
      const medicalLines = doc.splitTextToSize(medicalText, 170);
      medicalLines.forEach((line: string) => { if (y > pageHeight - 20) { doc.addPage(); y = 20; } doc.text(line, 15, y); y += lineHeight; });
      y += lineHeight + 3;
      if (y > pageHeight - 40) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.text("NUTRITION AND HYDRATION", 15, y); y += lineHeight + 3;
      doc.setFont("helvetica", "normal");
      const nutritionText = values.nutrition_preference || "If I have a condition state above, it is my preference TO RECEIVE artificially administered nutrition and hydration.";
      const nutritionLines = doc.splitTextToSize(nutritionText, 170);
      nutritionLines.forEach((line: string) => { doc.text(line, 15, y); y += lineHeight; });
      y += lineHeight + 5;
      doc.setFont("helvetica", "bold");
      doc.text("PRIMARY PHYSICIAN", 15, y); y += lineHeight + 3;
      doc.setFont("helvetica", "normal");
      doc.text("I designate the following as my Primary Physician:", 15, y); y += lineHeight + 3;
      doc.text(`Name: ${values.primaryPhysician_name || '____________________'}`, 15, y); y += lineHeight;
      doc.text(`Address: ${values.primaryPhysician_address || '______________________'}`, 15, y); y += lineHeight;
      doc.text(`Phone: ${values.primaryPhysician_phone || '____________________'}`, 15, y); y += lineHeight + 3;
      const physicianText = "If a primary physician is not selected as per Clause 5, then I request that the applicable medical association rules be applied for the identification of my primary physician.";
      const physicianLines = doc.splitTextToSize(physicianText, 170);
      physicianLines.forEach((line: string) => { if (y > pageHeight - 20) { doc.addPage(); y = 20; } doc.text(line, 15, y); y += lineHeight; });
      y += lineHeight + 5;
      doc.setFont("helvetica", "bold");
      doc.text("OTHER DIRECTIONS", 15, y); y += lineHeight + 3;
      doc.setFont("helvetica", "normal");
      const otherDirectionsText = values.other_directions || "These instructions represent the lawful exercise of my right to refuse medical treatment following the applicable laws. I intend that these directives be honoured and implemented unless I have revoked them through a subsequent written statement or by an unmistakable expression of a change in my wishes:";
      const otherDirectionsLines = doc.splitTextToSize(otherDirectionsText, 170);
      otherDirectionsLines.forEach((line: string) => { if (y > pageHeight - 20) { doc.addPage(); y = 20; } doc.text(line, 15, y); y += lineHeight; });
      y += lineHeight;
      if (y > pageHeight - 100) { doc.addPage(); y = 20; }
      doc.text("Declarant Signature _____________________________________", 15, y); y += lineHeight + 10;
      doc.text("Date __________________", 15, y); y += lineHeight + 5;
      doc.text("Address _____________________________________________________________", 15, y); y += lineHeight;
      doc.text("____________________________________________________", 15, y); y += lineHeight + 10;
      if (y > pageHeight - 120) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.text("STATEMENT OF WITNESS:", 15, y); y += lineHeight + 3;
      doc.setFont("helvetica", "normal");
      const witnessText = "I declare under the penalty of perjury under the applicable laws:";
      doc.text(witnessText, 15, y); y += lineHeight;
      const witnessItems = [
        "That I am over the age of eighteen (18) and competent to testify to the matters stated herein;",
        "That the Individual signed or acknowledged this advance directive in my presence;",
        "That the individual who signed or acknowledged this advance directive is personally known to me, or that his identity was proven to me through cogent evidence;",
        "That the individual appears to be of sound mind and not under any kind of duress or undue influence;",
        "That I am not the person appointed as a Health Agent by this advance directive",
        "That I am not the individual's Health Care provider, an employee of the Health Care provider, the operator of the community care facility, an employee of the an operator of a community care facility, the operator of a residential care facility for the elderly, nor an employee of an operator of a residential care facility for the elderly;"
      ];
      witnessItems.forEach((item) => {
        const itemLines = doc.splitTextToSize(item, 165);
        itemLines.forEach((line: string) => { if (y > pageHeight - 20) { doc.addPage(); y = 20; } doc.text(line, 20, y); y += lineHeight; });
        y += 2;
      });
      doc.text("Signed _____________________________________", 15, y); y += lineHeight;
      doc.text(`Name of Witness 2: ${values.witness2_name || '_________________________'}`, 15, y); y += lineHeight + 5;
      doc.text("Signed _____________________________________", 15, y); y += lineHeight;
      doc.text("Date __________________", 120, y - lineHeight); y += lineHeight + 5;
      doc.text("Address _____________________________________________________________", 15, y); y += lineHeight;
      doc.text("____________________________________________________", 15, y); y += lineHeight + 10;
      if (y > pageHeight - 100) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.text("ADDITIONAL STATEMENT OF WITNESS:", 15, y); y += lineHeight;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("At least one of the above witnesses must also sign the following declaration", 15, y); y += lineHeight;
      doc.text("(If you are a resident in a skilled working facility, the patient advocate or ombudsman must sign this statement)", 15, y); y += lineHeight + 3;
      doc.setFontSize(11);
      const additionalWitnessText = "I further declare under the applicable laws of perjury that I am not related to the individual executing this advance directive by blood, marriage, or adoption, and to the best of my knowledge, I am not entitled to any part of of the individual's estate upon their death under a will or operation of law";
      const additionalWitnessLines = doc.splitTextToSize(additionalWitnessText, 170);
      additionalWitnessLines.forEach((line: string) => { if (y > pageHeight - 20) { doc.addPage(); y = 20; } doc.text(line, 15, y); y += lineHeight; });
      y += lineHeight + 5;
      doc.text("Witness Signature _____________________________________", 15, y); y += lineHeight;
      doc.text("Date __________________", 120, y - lineHeight); y += lineHeight + 5;
      doc.text("Address _____________________________________________________________", 15, y); y += lineHeight;
      doc.text("____________________________________________________", 15, y);
      const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
      const filename = `living_will_${timestamp}.pdf`;
      doc.save(filename);
      const guidePDF = generateGuidePDF({ documentId: "living-will", documentTitle: "Living Will (Advance Directive)" });
      setTimeout(() => { guidePDF.save(`living_will_guide_${timestamp}.pdf`); }, 500);
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error generating PDF:", error);
      return false;
    }
  }

  // Render field by type
  function renderField(field: any, values: any, setFieldValue: any) {
    if (field.type === 'text') {
      return (
        <div key={field.name} className="mb-2">
          <Label htmlFor={field.name}>{field.label}{field.required && ' *'}</Label>
          <Input
            id={field.name}
            value={values[field.name] || ''}
            onChange={e => setFieldValue(field.name, e.target.value)}
            className="mt-1 text-black w-full bg-white"
            required={field.required}
          />
        </div>
      );
    }
    if (field.type === 'textarea') {
      return (
        <div key={field.name} className="mb-2">
          <Label htmlFor={field.name}>{field.label}{field.required && ' *'}</Label>
          <Textarea
            id={field.name}
            value={values[field.name] || ''}
            onChange={e => setFieldValue(field.name, e.target.value)}
            className="mt-1 text-black w-full bg-white"
            rows={4}
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      );
    }
    if (field.type === 'select') {
      const options = typeof field.options === 'function' ? field.options(values) : field.options;
      return (
        <div key={field.name} className="mb-2">
          <Label htmlFor={field.name}>{field.label}{field.required && ' *'}</Label>
          <Select
            value={values[field.name] || ''}
            onValueChange={v => setFieldValue(field.name, v)}
            disabled={field.name === 'state' && !values.country}
          >
            <SelectTrigger className="mt-1 text-black w-full bg-white">
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {options.map((opt: any) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }
    return null;
  }

  // FormWizard usage
  return (
    <FormWizard
      steps={steps}
      onFinish={() => {}}
    />
  );
};

export default LivingWillForm;








