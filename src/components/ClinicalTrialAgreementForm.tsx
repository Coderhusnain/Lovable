import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  institutionName: string;
  institutionAddress: string;
  sponsorName: string;
  sponsorAddress: string;
  product: string;
  protocolTitle: string;
  principalInvestigator: string;
  startDate: string;
  endDate: string;
  paymentAmount: string;
  paymentTerms: string;
  confidentialityPeriod: string;
  signInstitutionName: string;
  signInstitutionDate: string;
  signSponsorName: string;
  signSponsorDate: string;
}

const initialData: FormData = {
  effectiveDate: "",
  institutionName: "",
  institutionAddress: "",
  sponsorName: "",
  sponsorAddress: "",
  product: "",
  protocolTitle: "",
  principalInvestigator: "",
  startDate: "",
  endDate: "",
  paymentAmount: "",
  paymentTerms: "",
  confidentialityPeriod: "5 years",
  signInstitutionName: "",
  signInstitutionDate: "",
  signSponsorName: "",
  signSponsorDate: "",
};

export default function ClinicalTrialAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("CLINICAL TRIAL AGREEMENT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`Effective Date: ${formData.effectiveDate}`, 20, y); y += 10;
    doc.text(`Institution: ${formData.institutionName}`, 20, y); y += 10;
    doc.text(`Sponsor: ${formData.sponsorName}`, 20, y); y += 10;
    
    doc.text("1. Protocol:", 20, y); y += 7;
    doc.text(`Title: ${formData.protocolTitle}`, 20, y); y += 7;
    doc.text(`Product: ${formData.product}`, 20, y); y += 7;
    doc.text(`Investigator: ${formData.principalInvestigator}`, 20, y); y += 15;

    doc.text("2. Term & Payment:", 20, y); y += 7;
    doc.text(`Start: ${formData.startDate}  End: ${formData.endDate}`, 20, y); y += 7;
    doc.text(`Total Payment: $${formData.paymentAmount}`, 20, y); y += 7;
    doc.text(`Terms: ${formData.paymentTerms}`, 20, y); y += 15;

    doc.text("3. Confidentiality:", 20, y); y += 7;
    doc.text(`Period: ${formData.confidentialityPeriod}`, 20, y); y += 20;

    doc.text("Signatures:", 20, y); y += 10;
    doc.text(`Institution: ${formData.signInstitutionName} (${formData.signInstitutionDate})`, 20, y); y += 10;
    doc.text(`Sponsor: ${formData.signSponsorName} (${formData.signSponsorDate})`, 20, y);

    doc.save("Clinical_Trial_Agreement.pdf");
    toast.success("PDF Generated");
  };

  const steps = [
    {
      label: "Parties",
      content: (
        <div className="space-y-3">
          <div><Label>Effective Date</Label><Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} /></div>
          <div><Label>Institution Name</Label><Input name="institutionName" value={formData.institutionName} onChange={handleChange} /></div>
          <div><Label>Institution Address</Label><Input name="institutionAddress" value={formData.institutionAddress} onChange={handleChange} /></div>
          <div><Label>Sponsor Name</Label><Input name="sponsorName" value={formData.sponsorName} onChange={handleChange} /></div>
          <div><Label>Sponsor Address</Label><Input name="sponsorAddress" value={formData.sponsorAddress} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Protocol",
      content: (
        <div className="space-y-3">
          <div><Label>Product/Drug Name</Label><Input name="product" value={formData.product} onChange={handleChange} /></div>
          <div><Label>Protocol Title</Label><Input name="protocolTitle" value={formData.protocolTitle} onChange={handleChange} /></div>
          <div><Label>Principal Investigator</Label><Input name="principalInvestigator" value={formData.principalInvestigator} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Terms",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Start Date</Label><Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} /></div>
            <div><Label>End Date</Label><Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} /></div>
          </div>
          <div><Label>Payment Amount ($)</Label><Input type="number" name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} /></div>
          <div><Label>Payment Terms</Label><Textarea name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} /></div>
          <div><Label>Confidentiality Period</Label><Input name="confidentialityPeriod" value={formData.confidentialityPeriod} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Signatures",
      content: (
        <div className="space-y-3">
          <div><Label>Institution Signatory</Label><Input name="signInstitutionName" value={formData.signInstitutionName} onChange={handleChange} /></div>
          <div><Label>Date</Label><Input type="date" name="signInstitutionDate" value={formData.signInstitutionDate} onChange={handleChange} /></div>
          <div><Label>Sponsor Signatory</Label><Input name="signSponsorName" value={formData.signSponsorName} onChange={handleChange} /></div>
          <div><Label>Date</Label><Input type="date" name="signSponsorDate" value={formData.signSponsorDate} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Clinical Trial Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}