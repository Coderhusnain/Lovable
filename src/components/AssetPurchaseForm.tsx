import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

// 1. Define the Data Interface (Kept from your detailed version)
interface FormData {
  effectiveDate: string;
  sellerName: string;
  sellerAddress: string;
  buyerName: string;
  buyerAddress: string;
  assetsSummary: string;
  exhibitADetails: string;
  purchasePrice: string;
  depositAmount: string;
  balanceAmount: string;
  escrowAccount: string;
  closingDate: string;
  titleLocations: string;
  deliveryLocations: string;
  conditionInventoryDate: string;
  sellerRepsSummary: string;
  taxRepresentation: string;
  insuranceNotes: string;
  licensesNotes: string;
  litigationNotes: string;
  environmentalNotes: string;
  billOfSaleNotes: string;
  riskOfLossNotes: string;
  furtherAssurancesNotes: string;
  bulkSalesNotes: string;
  conditionsPrecedentNotes: string;
  adrNotes: string;
  feesNotes: string;
  indemnificationNotes: string;
  governingLaw: string;
  sellerSignatureName: string;
  sellerSignatureDate: string;
  buyerSignatureName: string;
  buyerSignatureDate: string;
}

const initialFormData: FormData = {
  effectiveDate: "",
  sellerName: "",
  sellerAddress: "",
  buyerName: "",
  buyerAddress: "",
  assetsSummary: "",
  exhibitADetails: "",
  purchasePrice: "",
  depositAmount: "",
  balanceAmount: "",
  escrowAccount: "",
  closingDate: "",
  titleLocations: "",
  deliveryLocations: "",
  conditionInventoryDate: "",
  sellerRepsSummary: "",
  taxRepresentation: "",
  insuranceNotes: "",
  licensesNotes: "",
  litigationNotes: "",
  environmentalNotes: "",
  billOfSaleNotes: "",
  riskOfLossNotes: "",
  furtherAssurancesNotes: "",
  bulkSalesNotes: "",
  conditionsPrecedentNotes: "",
  adrNotes: "",
  feesNotes: "",
  indemnificationNotes: "",
  governingLaw: "",
  sellerSignatureName: "",
  sellerSignatureDate: "",
  buyerSignatureName: "",
  buyerSignatureDate: "",
};

export default function AssetPurchaseForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper to update state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. PDF Generation Logic (Moved inside onFinish)
  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const ref = { y: 40 };

    const write = (text: string, opts?: { size?: number; bold?: boolean; center?: boolean }) => {
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 40;
      const maxW = pageW - margin * 2;
      const size = opts?.size ?? 11;
      doc.setFont("times", opts?.bold ? "bold" : "normal");
      doc.setFontSize(size);
      
      const lines = doc.splitTextToSize(text || "", maxW);
      for (const line of lines) {
        if (ref.y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          ref.y = margin;
        }
        if (opts?.center) {
          const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (pageW - tw) / 2;
          doc.text(line, tx, ref.y);
        } else {
          doc.text(line, margin, ref.y);
        }
        ref.y += size * 1.3;
      }
    };

    // --- PDF Content Construction ---
    write("ASSET PURCHASE AGREEMENT", { size: 14, bold: true, center: true });
    write("\n");
    write(`This Asset Purchase Agreement is made as of ${formData.effectiveDate || "[Date]"}, between ${formData.sellerName || "[Seller]"} ("Seller") and ${formData.buyerName || "[Buyer]"} ("Buyer").`);
    write("\n1. Purchase of Assets", { size: 12, bold: true });
    write(`Seller agrees to sell to Buyer the assets described in Exhibit A: ${formData.assetsSummary || "[Summary]"}. Details: ${formData.exhibitADetails}`);
    
    write("\n2. Purchase Price", { size: 12, bold: true });
    write(`Total Price: $${formData.purchasePrice}. Deposit: $${formData.depositAmount}. Balance: $${formData.balanceAmount}.`);
    
    write("\n3. Closing", { size: 12, bold: true });
    write(`Closing Date: ${formData.closingDate}. Escrow: ${formData.escrowAccount}.`);
    write(`Delivery Locations: ${formData.deliveryLocations}.`);

    write("\n4. Representations", { size: 12, bold: true });
    write(`Seller Reps: ${formData.sellerRepsSummary}`);
    write(`Tax Status: ${formData.taxRepresentation}`);
    write(`Litigation: ${formData.litigationNotes}`);

    write("\n5. Signatures", { size: 12, bold: true });
    write(`Seller: ${formData.sellerSignatureName} (${formData.sellerSignatureDate})`);
    write(`Buyer: ${formData.buyerSignatureName} (${formData.buyerSignatureDate})`);

    doc.save(`Asset_Purchase_${formData.sellerName.replace(/\s+/g, "_")}.pdf`);
    setIsGenerating(false);
  };

  // 3. Define the Wizard Steps
  const steps = [
    {
      label: "Parties & Assets",
      content: (
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/asset-purchase-agreement-info')}
            className="text-orange-600 border-orange-200 mb-4"
          >
            <FileText className="w-4 h-4 mr-2" />
            Learn More
          </Button>
          <div><Label>Effective Date</Label><Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} /></div>
          <div><Label>Seller Name</Label><Input name="sellerName" value={formData.sellerName} onChange={handleChange} /></div>
          <div><Label>Seller Address</Label><Textarea name="sellerAddress" value={formData.sellerAddress} onChange={handleChange} /></div>
          <div><Label>Buyer Name</Label><Input name="buyerName" value={formData.buyerName} onChange={handleChange} /></div>
          <div><Label>Buyer Address</Label><Textarea name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} /></div>
          <div><Label>Assets Summary</Label><Textarea name="assetsSummary" value={formData.assetsSummary} onChange={handleChange} /></div>
          <div><Label>Exhibit A Details</Label><Textarea name="exhibitADetails" value={formData.exhibitADetails} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Financials",
      content: (
        <div className="space-y-3">
          <div><Label>Purchase Price ($)</Label><Input name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} /></div>
          <div><Label>Deposit Amount ($)</Label><Input name="depositAmount" value={formData.depositAmount} onChange={handleChange} /></div>
          <div><Label>Balance Amount ($)</Label><Input name="balanceAmount" value={formData.balanceAmount} onChange={handleChange} /></div>
          <div><Label>Escrow Account</Label><Input name="escrowAccount" value={formData.escrowAccount} onChange={handleChange} /></div>
          <div><Label>Closing Date</Label><Input name="closingDate" value={formData.closingDate} onChange={handleChange} /></div>
          <div><Label>Delivery Locations</Label><Textarea name="deliveryLocations" value={formData.deliveryLocations} onChange={handleChange} /></div>
          <div><Label>Title Locations</Label><Input name="titleLocations" value={formData.titleLocations} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Representations",
      content: (
        <div className="space-y-3">
          <div><Label>Inventory Date</Label><Input name="conditionInventoryDate" value={formData.conditionInventoryDate} onChange={handleChange} /></div>
          <div><Label>Seller Reps Summary</Label><Textarea name="sellerRepsSummary" value={formData.sellerRepsSummary} onChange={handleChange} /></div>
          <div><Label>Tax Notes</Label><Textarea name="taxRepresentation" value={formData.taxRepresentation} onChange={handleChange} /></div>
          <div><Label>Insurance Notes</Label><Textarea name="insuranceNotes" value={formData.insuranceNotes} onChange={handleChange} /></div>
          <div><Label>Litigation Notes</Label><Textarea name="litigationNotes" value={formData.litigationNotes} onChange={handleChange} /></div>
          <div><Label>Environmental Notes</Label><Textarea name="environmentalNotes" value={formData.environmentalNotes} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Legal & Signatures",
      content: (
        <div className="space-y-3">
          <div><Label>Indemnification Notes</Label><Textarea name="indemnificationNotes" value={formData.indemnificationNotes} onChange={handleChange} /></div>
          <div><Label>Governing Law</Label><Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} /></div>
          <hr className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Seller Signature Name</Label><Input name="sellerSignatureName" value={formData.sellerSignatureName} onChange={handleChange} /></div>
            <div><Label>Date</Label><Input name="sellerSignatureDate" value={formData.sellerSignatureDate} onChange={handleChange} /></div>
            <div><Label>Buyer Signature Name</Label><Input name="buyerSignatureName" value={formData.buyerSignatureName} onChange={handleChange} /></div>
            <div><Label>Date</Label><Input name="buyerSignatureDate" value={formData.buyerSignatureDate} onChange={handleChange} /></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Asset Purchase Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
      {isGenerating && <p className="text-center text-sm text-gray-500 mt-2">Generating PDF...</p>}
    </div>
  );
}