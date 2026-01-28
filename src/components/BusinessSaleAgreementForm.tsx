import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  sellerName: string;
  sellerAddress: string;
  buyerName: string;
  buyerAddress: string;
  businessDescription: string;
  purchasePrice: string;
  depositAmount: string;
  closingDate: string;
  signSellerName: string;
  signSellerDate: string;
  signBuyerName: string;
  signBuyerDate: string;
}

const initialFormData: FormData = {
  effectiveDate: "",
  sellerName: "",
  sellerAddress: "",
  buyerName: "",
  buyerAddress: "",
  businessDescription: "",
  purchasePrice: "",
  depositAmount: "",
  closingDate: "",
  signSellerName: "",
  signSellerDate: "",
  signBuyerName: "",
  signBuyerDate: "",
};

export default function BusinessSaleAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("BUSINESS SALE AGREEMENT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`Effective Date: ${formData.effectiveDate}`, 20, y); y += 10;
    doc.text(`Seller: ${formData.sellerName}`, 20, y); y += 10;
    doc.text(`Buyer: ${formData.buyerName}`, 20, y); y += 10;
    
    doc.text("1. Sale of Business", 20, y); y += 7;
    doc.text(formData.businessDescription, 20, y); y += 20;

    doc.text(`2. Purchase Price: $${formData.purchasePrice}`, 20, y); y += 10;
    doc.text(`3. Deposit: $${formData.depositAmount}`, 20, y); y += 10;
    doc.text(`4. Closing Date: ${formData.closingDate}`, 20, y); y += 20;

    doc.text("Signatures:", 20, y); y += 10;
    doc.text(`Seller: ${formData.signSellerName} (${formData.signSellerDate})`, 20, y); y += 10;
    doc.text(`Buyer: ${formData.signBuyerName} (${formData.signBuyerDate})`, 20, y);

    doc.save("Business_Sale_Agreement.pdf");
    toast.success("PDF Generated Successfully");
  };

  const steps = [
    {
      label: "Parties",
      content: (
        <div className="space-y-3">
          <div><Label>Effective Date</Label><Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} /></div>
          <div><Label>Seller Name</Label><Input name="sellerName" value={formData.sellerName} onChange={handleChange} /></div>
          <div><Label>Seller Address</Label><Input name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} /></div>
          <div><Label>Buyer Name</Label><Input name="buyerName" value={formData.buyerName} onChange={handleChange} /></div>
          <div><Label>Buyer Address</Label><Input name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Terms",
      content: (
        <div className="space-y-3">
          <div><Label>Business Description</Label><Textarea name="businessDescription" value={formData.businessDescription} onChange={handleChange} /></div>
          <div><Label>Purchase Price ($)</Label><Input type="number" name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} /></div>
          <div><Label>Deposit Amount ($)</Label><Input type="number" name="depositAmount" value={formData.depositAmount} onChange={handleChange} /></div>
          <div><Label>Closing Date</Label><Input type="date" name="closingDate" value={formData.closingDate} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Signatures",
      content: (
        <div className="space-y-3">
          <div><Label>Seller Signature Name</Label><Input name="signSellerName" value={formData.signSellerName} onChange={handleChange} /></div>
          <div><Label>Seller Signature Date</Label><Input type="date" name="signSellerDate" value={formData.signSellerDate} onChange={handleChange} /></div>
          <div><Label>Buyer Signature Name</Label><Input name="signBuyerName" value={formData.signBuyerName} onChange={handleChange} /></div>
          <div><Label>Buyer Signature Date</Label><Input type="date" name="signBuyerDate" value={formData.signBuyerDate} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Business Sale Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}