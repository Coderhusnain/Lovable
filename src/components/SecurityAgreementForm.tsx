import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  debtorName: string;
  debtorAddress: string;
  securedPartyName: string;
  securedPartyAddress: string;
  principalAmount: string;
  collateralDescription: string;
  collateralLocation: string;
  governingLaw: string;
  signDebtor: string;
  signSecuredParty: string;
}

const initialData: FormData = {
  effectiveDate: "",
  debtorName: "",
  debtorAddress: "",
  securedPartyName: "",
  securedPartyAddress: "",
  principalAmount: "",
  collateralDescription: "",
  collateralLocation: "",
  governingLaw: "",
  signDebtor: "",
  signSecuredParty: "",
};

export default function SecurityAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("SECURITY AGREEMENT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`Effective Date: ${formData.effectiveDate}`, 20, y); y += 10;
    doc.text(`Debtor: ${formData.debtorName} (${formData.debtorAddress})`, 20, y); y += 10;
    doc.text(`Secured Party: ${formData.securedPartyName} (${formData.securedPartyAddress})`, 20, y); y += 20;
    
    doc.text("1. Security Interest", 20, y); y += 10;
    doc.text(`Principal Amount Secured: $${formData.principalAmount}`, 20, y); y += 10;
    
    doc.text("Collateral Description:", 20, y); y += 7;
    doc.text(formData.collateralDescription, 20, y); y += 20;

    doc.text(`Location of Collateral: ${formData.collateralLocation}`, 20, y); y += 10;
    doc.text(`Governing Law: ${formData.governingLaw}`, 20, y); y += 20;

    doc.text("Signatures:", 20, y); y += 10;
    doc.text(`Debtor: ${formData.signDebtor}`, 20, y); y += 10;
    doc.text(`Secured Party: ${formData.signSecuredParty}`, 20, y);

    doc.save("Security_Agreement.pdf");
    toast.success("PDF Generated");
  };

  const steps = [
    {
      label: "Parties",
      content: (
        <div className="space-y-3">
          <div><Label>Effective Date</Label><Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} /></div>
          <div><Label>Debtor Name</Label><Input name="debtorName" value={formData.debtorName} onChange={handleChange} /></div>
          <div><Label>Debtor Address</Label><Input name="debtorAddress" value={formData.debtorAddress} onChange={handleChange} /></div>
          <div><Label>Secured Party Name</Label><Input name="securedPartyName" value={formData.securedPartyName} onChange={handleChange} /></div>
          <div><Label>Secured Party Address</Label><Input name="securedPartyAddress" value={formData.securedPartyAddress} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Collateral",
      content: (
        <div className="space-y-3">
          <div><Label>Principal Amount ($)</Label><Input type="number" name="principalAmount" value={formData.principalAmount} onChange={handleChange} /></div>
          <div><Label>Collateral Description</Label><Textarea name="collateralDescription" value={formData.collateralDescription} onChange={handleChange} placeholder="Describe the assets pledged..." /></div>
          <div><Label>Location of Collateral</Label><Input name="collateralLocation" value={formData.collateralLocation} onChange={handleChange} /></div>
          <div><Label>Governing Law (State)</Label><Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Signatures",
      content: (
        <div className="space-y-3">
          <div><Label>Debtor Signature</Label><Input name="signDebtor" value={formData.signDebtor} onChange={handleChange} /></div>
          <div><Label>Secured Party Signature</Label><Input name="signSecuredParty" value={formData.signSecuredParty} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Security Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}