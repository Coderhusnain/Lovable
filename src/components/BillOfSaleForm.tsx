import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // Assuming you use Sonner for toasts
import jsPDF from "jspdf";

// 1. Define Data Interface
interface FormData {
  date: string;
  sellerName: string;
  sellerAddress: string;
  buyerName: string;
  buyerAddress: string;
  amount: string;
  propertyDescription: string;
  state: string;
  county: string;
  sellerSignName: string;
  sellerSignDate: string;
  buyerSignName: string;
  buyerSignDate: string;
  notaryName: string;
  notaryCommissionExpires: string;
  notaryDate: string;
}

const initialFormData: FormData = {
  date: "",
  sellerName: "",
  sellerAddress: "",
  buyerName: "",
  buyerAddress: "",
  amount: "",
  propertyDescription: "",
  state: "",
  county: "",
  sellerSignName: "",
  sellerSignDate: "",
  buyerSignName: "",
  buyerSignDate: "",
  notaryName: "",
  notaryCommissionExpires: "",
  notaryDate: "",
};

export default function BillOfSaleForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper to update state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. PDF Generation Logic (Moved to onFinish)
  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 7;
    let currentY = margin;

    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("times", isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text || "", textWidth);
      lines.forEach((line: string) => {
        if (currentY > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          currentY = margin;
        }
        if (isCenter) {
          const tw = (doc.getStringUnitWidth(line) * fontSize) / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, currentY);
        } else {
          doc.text(line, margin, currentY);
        }
        currentY += lineHeight;
      });
      currentY += 2; // Extra spacing
    };

    // === PDF CONTENT ===
    addText("BILL OF SALE", 16, true, true);
    addText(`This Bill of Sale is made on ${formData.date}, between ${formData.sellerName} ("Seller") and ${formData.buyerName} ("Buyer").`);
    
    addText("1. Transfer of Ownership", 12, true);
    addText(`For the sum of $${formData.amount}, Seller transfers to Buyer the following property:`);
    addText(formData.propertyDescription);

    addText("2. Disclaimer", 12, true);
    addText("The Property is sold 'AS IS', without warranties of any kind.");

    addText("3. Representations", 12, true);
    addText("Seller warrants they are the lawful owner of the Property and it is free of liens.");

    addText("4. Governing Law", 12, true);
    addText(`Governed by the laws of the State of ${formData.state}.`);

    addText("SIGNATURES", 12, true);
    addText(`Seller: ${formData.sellerSignName} (Date: ${formData.sellerSignDate})`);
    addText(`Buyer: ${formData.buyerSignName} (Date: ${formData.buyerSignDate})`);

    addText("NOTARY ACKNOWLEDGMENT", 12, true);
    addText(`State of ${formData.state}, County of ${formData.county}.`);
    addText(`Notarized by ${formData.notaryName} on ${formData.notaryDate}. Commission Expires: ${formData.notaryCommissionExpires}`);

    doc.save("Bill_of_Sale.pdf");
    setIsGenerating(false);
    toast.success("Bill of Sale Generated Successfully!");
  };

  // 3. Wizard Steps
  const steps = [
    {
      label: "Parties & Date",
      content: (
        <div className="space-y-3">
          <div><Label>Date</Label><Input type="date" name="date" value={formData.date} onChange={handleChange} /></div>
          <div><Label>Seller Name</Label><Input name="sellerName" value={formData.sellerName} onChange={handleChange} /></div>
          <div><Label>Seller Address</Label><Input name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} /></div>
          <div><Label>Buyer Name</Label><Input name="buyerName" value={formData.buyerName} onChange={handleChange} /></div>
          <div><Label>Buyer Address</Label><Input name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Property & Price",
      content: (
        <div className="space-y-3">
          <div><Label>Sale Amount ($)</Label><Input type="number" name="amount" value={formData.amount} onChange={handleChange} /></div>
          <div><Label>Property Description</Label><Textarea name="propertyDescription" value={formData.propertyDescription} onChange={handleChange} rows={5} placeholder="Describe the item(s) being sold..." /></div>
        </div>
      )
    },
    {
      label: "Signatures",
      content: (
        <div className="space-y-3">
          <div><Label>State</Label><Input name="state" value={formData.state} onChange={handleChange} /></div>
          <div><Label>County</Label><Input name="county" value={formData.county} onChange={handleChange} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Seller Signature</Label><Input name="sellerSignName" value={formData.sellerSignName} onChange={handleChange} /></div>
            <div><Label>Date</Label><Input type="date" name="sellerSignDate" value={formData.sellerSignDate} onChange={handleChange} /></div>
            <div><Label>Buyer Signature</Label><Input name="buyerSignName" value={formData.buyerSignName} onChange={handleChange} /></div>
            <div><Label>Date</Label><Input type="date" name="buyerSignDate" value={formData.buyerSignDate} onChange={handleChange} /></div>
          </div>
        </div>
      )
    },
    {
      label: "Notary",
      content: (
        <div className="space-y-3">
          <div><Label>Notary Name</Label><Input name="notaryName" value={formData.notaryName} onChange={handleChange} /></div>
          <div><Label>Notary Date</Label><Input type="date" name="notaryDate" value={formData.notaryDate} onChange={handleChange} /></div>
          <div><Label>Commission Expires</Label><Input type="date" name="notaryCommissionExpires" value={formData.notaryCommissionExpires} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Bill of Sale</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
      {isGenerating && <p className="text-center text-sm text-gray-500 mt-2">Generating PDF...</p>}
    </div>
  );
}