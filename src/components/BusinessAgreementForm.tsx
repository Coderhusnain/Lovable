import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  agreementDate: string;
  firstPartyName: string;
  firstPartyAddress: string;
  secondPartyName: string;
  secondPartyAddress: string;
  businessName: string;
  deductionAmount: string;
  projectDetails: string;
  commissionAmount: string;
  businessDetails: string;
  penaltyAmount: string;
  deductionPercentage: string;
  constructionTimePeriod: string;
  companyName: string;
  signingDate: string;
}

const initialFormData: FormData = {
  agreementDate: '',
  firstPartyName: '',
  firstPartyAddress: '',
  secondPartyName: '',
  secondPartyAddress: '',
  businessName: '',
  deductionAmount: '',
  projectDetails: '',
  commissionAmount: '',
  businessDetails: '',
  penaltyAmount: '',
  deductionPercentage: '',
  constructionTimePeriod: '',
  companyName: '',
  signingDate: '',
};

export default function BusinessAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("BUSINESS AGREEMENT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    const addLine = (text: string) => {
      doc.text(text, 20, y);
      y += 10;
    };

    addLine(`Date: ${formData.agreementDate}`);
    addLine(`1st Party: ${formData.firstPartyName}`);
    addLine(`2nd Party: ${formData.secondPartyName}`);
    addLine(`Business: ${formData.businessName}`);
    addLine(`Project Details: ${formData.projectDetails}`);
    addLine(`Commission: ${formData.commissionAmount}`);

    doc.save("Business_Agreement.pdf");
    toast.success("Generated Successfully!");
  };

  const steps = [
    {
      label: "Parties",
      content: (
        <div className="space-y-3">
          <div><Label>Agreement Date</Label><Input type="date" name="agreementDate" value={formData.agreementDate} onChange={handleChange} /></div>
          <div><Label>First Party Name</Label><Input name="firstPartyName" value={formData.firstPartyName} onChange={handleChange} /></div>
          <div><Label>First Party Address</Label><Input name="firstPartyAddress" value={formData.firstPartyAddress} onChange={handleChange} /></div>
          <div><Label>Second Party Name</Label><Input name="secondPartyName" value={formData.secondPartyName} onChange={handleChange} /></div>
          <div><Label>Second Party Address</Label><Input name="secondPartyAddress" value={formData.secondPartyAddress} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Business Details",
      content: (
        <div className="space-y-3">
          <div><Label>Business Name</Label><Input name="businessName" value={formData.businessName} onChange={handleChange} /></div>
          <div><Label>Project Details</Label><Textarea name="projectDetails" value={formData.projectDetails} onChange={handleChange} /></div>
          <div><Label>Business Details</Label><Textarea name="businessDetails" value={formData.businessDetails} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Financials",
      content: (
        <div className="space-y-3">
          <div><Label>Commission Amount</Label><Input name="commissionAmount" value={formData.commissionAmount} onChange={handleChange} /></div>
          <div><Label>Deduction Amount</Label><Input name="deductionAmount" value={formData.deductionAmount} onChange={handleChange} /></div>
          <div><Label>Penalty Amount</Label><Input name="penaltyAmount" value={formData.penaltyAmount} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Closing",
      content: (
        <div className="space-y-3">
          <div><Label>Company Name</Label><Input name="companyName" value={formData.companyName} onChange={handleChange} /></div>
          <div><Label>Construction Time</Label><Input name="constructionTimePeriod" value={formData.constructionTimePeriod} onChange={handleChange} /></div>
          <div><Label>Signing Date</Label><Input type="date" name="signingDate" value={formData.signingDate} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Business Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}