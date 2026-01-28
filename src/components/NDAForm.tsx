import React from "react";
import { FormWizard } from "./FormWizard";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import CountryStateAPI from 'countries-states-cities';
import { generateGuidePDF } from "@/utils/generateGuidePDF";

// Helper functions for country/state data
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

// Helper function to get available states for selected country
const getStatesForCountry = (countryAnswer: string): string[] => {
  if (!countryAnswer) return [];
  const countryId = parseInt(countryAnswer.split(':')[0]);
  const states = CountryStateAPI.getStatesOfCountry(countryId);
  return states.map(state => `${state.id}:${state.name}`);
};

// PDF generation function
const generatePDF = (formData: any) => {
  const doc = new jsPDF();
  const lineHeight = 4;
  
  // Get proper names for display
  const countryName = formData.country ? getCountryName(formData.country.split(':')[0]) : '';
  const stateName = formData.state ? getStateName(formData.country?.split(':')[0] || '', formData.state.split(':')[0]) : '';
  
  // Title
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("NON-DISCLOSURE AGREEMENT", 105, 20, { align: "center" });
  
  let yPosition = 40;
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  
  // Introduction
  const introText = `This Non-Disclosure Agreement ("Agreement") is entered into and made effective as of ${formData.effectiveDate} ("Effective Date"), by and between ${formData.disclosingPartyName}, having its address at ${formData.disclosingPartyAddress} ("Disclosing Party"), and ${formData.recipientName}, having its address at ${formData.recipientAddress} ("Recipient").`;
  const introLines = doc.splitTextToSize(introText, 170);
  doc.text(introLines, 20, yPosition);
  yPosition += introLines.length * lineHeight + 10;

  const purposeText = `The Disclosing Party intends to disclose certain confidential and proprietary information to the Recipient, and the Recipient agrees to maintain the confidentiality of such information under the terms and conditions set forth herein. Accordingly, the parties hereby agree as follows:`;
  const purposeLines = doc.splitTextToSize(purposeText, 170);
  doc.text(purposeLines, 20, yPosition);
  yPosition += purposeLines.length * lineHeight + 15;

  // Add sections (simplified for brevity)
  doc.setFont("helvetica", "bold");
  doc.text("1. Confidential Information", 20, yPosition);
  yPosition += 8;
  
  doc.setFont("helvetica", "normal");
  const section1Text = `"Confidential Information" shall mean any and all non-public, proprietary, or confidential data or information disclosed, whether directly or indirectly, by the Disclosing Party to the Recipient in any form—oral, written, visual, or otherwise—including but not limited to trade secrets, business plans, technical data, financial information, customer information, and any other data or material disclosed on or after the Effective Date.`;
  const section1Lines = doc.splitTextToSize(section1Text, 170);
  doc.text(section1Lines, 20, yPosition);
  yPosition += section1Lines.length * lineHeight + 10;

  // Governing Law
  doc.setFont("helvetica", "bold");
  doc.text("17. Governing Law", 20, yPosition);
  yPosition += 8;
  
  doc.setFont("helvetica", "normal");
  doc.text(`This Agreement shall be governed by the laws of ${stateName}, ${countryName}.`, 20, yPosition);
  yPosition += 15;

  // Signature section
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURES", 20, yPosition);
  yPosition += 10;

  doc.setFont("helvetica", "normal");
  doc.text("Disclosing Party:", 20, yPosition);
  yPosition += 10;
  doc.text(`Name: ${formData.disclosingSignatoryName}`, 20, yPosition);
  yPosition += 10;
  doc.text("Signature: _______________________", 20, yPosition);
  yPosition += 10;
  doc.text(`Title: ${formData.disclosingSignatoryTitle}`, 20, yPosition);
  yPosition += 10;
  doc.text("Date: ___________________________", 20, yPosition);
  yPosition += 30;

  doc.text("Recipient:", 20, yPosition);
  yPosition += 10;
  doc.text(`Name: ${formData.recipientSignatoryName}`, 20, yPosition);
  yPosition += 10;
  doc.text("Signature: _______________________", 20, yPosition);
  yPosition += 10;
  doc.text(`Title: ${formData.recipientSignatoryTitle}`, 20, yPosition);
  yPosition += 10;
  doc.text("Date: ___________________________", 20, yPosition);
  
  doc.save('non-disclosure-agreement.pdf');
  
  // Also generate and save the guide PDF
  const guidePDF = generateGuidePDF({ 
    documentId: "nda", 
    documentTitle: "Non-Disclosure Agreement (NDA)" 
  });
  setTimeout(() => {
    guidePDF.save('nda_guide.pdf');
  }, 500);
  
  toast.success("NDA and Guide PDF generated successfully!");
};

const steps = [
  {
    label: "Location & Disclosing Party",
    fields: [
      { 
        name: "country", 
        label: "Country", 
        type: "select", 
        required: true,
        options: CountryStateAPI.getAllCountries().map((country: any) => ({
          value: `${country.id}:${country.name}`,
          label: country.name
        }))
      },
      { 
        name: "state", 
        label: "State/Province", 
        type: "select", 
        required: true,
        options: [], // Will be populated dynamically based on country
        dependsOn: "country",
        getOptions: (value: string) => getStatesForCountry(value).map(state => ({
          value: state,
          label: state.split(':')[1]
        }))
      },
      { name: "effectiveDate", label: "Effective Date", type: "date", required: true },
      { name: "disclosingPartyName", label: "Disclosing Party Name", type: "text", required: true },
      { name: "disclosingPartyAddress", label: "Disclosing Party Address", type: "textarea", required: true }
    ]
  },
  {
    label: "Recipient & Terms",
    fields: [
      { name: "recipientName", label: "Recipient Name", type: "text", required: true },
      { name: "recipientAddress", label: "Recipient Address", type: "textarea", required: true },
      { name: "terminationDate", label: "Termination Date", type: "date", required: true },
      { name: "earlyTerminationDays", label: "Early Termination Notice (Days)", type: "number", required: true }
    ]
  },
  {
    label: "Legal Terms",
    fields: [
      { name: "nonCircumventionDuration", label: "Non-Circumvention Duration", type: "text", required: true },
      { name: "governingLaw", label: "Governing Law", type: "text", required: true }
    ]
  },
  {
    label: "Signatories",
    fields: [
      { name: "disclosingSignatoryName", label: "Disclosing Signatory Name", type: "text", required: true },
      { name: "disclosingSignatoryTitle", label: "Disclosing Signatory Title", type: "text", required: true },
      { name: "recipientSignatoryName", label: "Recipient Signatory Name", type: "text", required: true },
      { name: "recipientSignatoryTitle", label: "Recipient Signatory Title", type: "text", required: true }
    ]
  }
];

const NDAForm = () => {
  return (
    <FormWizard 
      steps={steps}
      title="Non-Disclosure Agreement"
      subtitle="Create a legally binding NDA to protect your confidential information"
      onGenerate={generatePDF}
      documentType="Non-Disclosure Agreement"
    />
  );
};

export default NDAForm;