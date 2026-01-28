import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  buyerName: string;
  buyerStatus: string;
  buyerAddress: string;
  brokerName: string;
  brokerStatus: string;
  brokerAddress: string;
  industrySector: string;
  termDays: string;
  terminationNotice: string;
  brokerFee: string;
  invoiceDays: string;
  signBuyerName: string;
  signBuyerDesignation: string;
  signBuyerCNIC: string;
  signBuyerDate: string;
  witness1Name: string;
  witness1CNIC: string;
  witness1Address: string;
  signBrokerName: string;
  signBrokerDesignation: string;
  signBrokerCNIC: string;
  signBrokerDate: string;
  witness2Name: string;
  witness2CNIC: string;
  witness2Address: string;
}

const initialFormData: FormData = {
  effectiveDate: "",
  buyerName: "",
  buyerStatus: "",
  buyerAddress: "",
  brokerName: "",
  brokerStatus: "",
  brokerAddress: "",
  industrySector: "",
  termDays: "",
  terminationNotice: "",
  brokerFee: "",
  invoiceDays: "",
  signBuyerName: "",
  signBuyerDesignation: "",
  signBuyerCNIC: "",
  signBuyerDate: "",
  witness1Name: "",
  witness1CNIC: "",
  witness1Address: "",
  signBrokerName: "",
  signBrokerDesignation: "",
  signBrokerCNIC: "",
  signBrokerDate: "",
  witness2Name: "",
  witness2CNIC: "",
  witness2Address: "",
};

export default function BrokerAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    const addText = (text: string, fontSize = 11, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("times", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text || "", pageWidth - margin * 2);
      doc.text(lines, margin, y);
      y += (lines.length * fontSize * 0.5) + 5;
    };

    addText("BROKER AGREEMENT", 16, true);
    addText(`Effective Date: ${formData.effectiveDate}`);
    addText(`Between Buyer: ${formData.buyerName} and Broker: ${formData.brokerName}`);
    
    addText("1. Scope", 12, true);
    addText(`Industry Sector: ${formData.industrySector}`);
    addText(`Broker Fee: ${formData.brokerFee}`);
    
    addText("2. Signatures", 12, true);
    addText(`Buyer: ${formData.signBuyerName} (CNIC: ${formData.signBuyerCNIC})`);
    addText(`Broker: ${formData.signBrokerName} (CNIC: ${formData.signBrokerCNIC})`);

    doc.save("Broker_Agreement.pdf");
    setIsGenerating(false);
    toast.success("PDF Generated Successfully!");
  };

  const steps = [
    {
      label: "Parties",
      content: (
        <div className="space-y-3">
          <div><Label>Effective Date</Label><Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} /></div>
          <div><Label>Buyer Name</Label><Input name="buyerName" value={formData.buyerName} onChange={handleChange} /></div>
          <div><Label>Buyer Address</Label><Input name="buyerAddress" value={formData.buyerAddress} onChange={handleChange} /></div>
          <div><Label>Broker Name</Label><Input name="brokerName" value={formData.brokerName} onChange={handleChange} /></div>
          <div><Label>Broker Address</Label><Input name="brokerAddress" value={formData.brokerAddress} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Terms",
      content: (
        <div className="space-y-3">
          <div><Label>Industry Sector</Label><Input name="industrySector" value={formData.industrySector} onChange={handleChange} /></div>
          <div><Label>Broker Fee</Label><Input name="brokerFee" value={formData.brokerFee} onChange={handleChange} /></div>
          <div><Label>Term Days</Label><Input name="termDays" value={formData.termDays} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Signatures",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Buyer Sign Name</Label><Input name="signBuyerName" value={formData.signBuyerName} onChange={handleChange} /></div>
            <div><Label>Buyer CNIC</Label><Input name="signBuyerCNIC" value={formData.signBuyerCNIC} onChange={handleChange} /></div>
            <div><Label>Broker Sign Name</Label><Input name="signBrokerName" value={formData.signBrokerName} onChange={handleChange} /></div>
            <div><Label>Broker CNIC</Label><Input name="signBrokerCNIC" value={formData.signBrokerCNIC} onChange={handleChange} /></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Broker Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}