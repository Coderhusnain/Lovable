import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  agreementDate: string;
  companyName: string;
  partners: string;
  valuationMethod: string;
  triggerEvents: string;
  paymentTerms: string;
  signDate: string;
}

const initialData: FormData = {
  agreementDate: "",
  companyName: "",
  partners: "",
  valuationMethod: "",
  triggerEvents: "",
  paymentTerms: "",
  signDate: "",
};

export default function BuySellAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("BUY-SELL AGREEMENT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`Date: ${formData.agreementDate}`, 20, y); y += 10;
    doc.text(`Company: ${formData.companyName}`, 20, y); y += 10;
    doc.text("Partners:", 20, y); y += 7;
    doc.text(formData.partners, 20, y); y += 20;
    
    doc.text("1. Valuation Method", 20, y); y += 7;
    doc.text(formData.valuationMethod, 20, y); y += 20;
    
    doc.text("2. Trigger Events", 20, y); y += 7;
    doc.text(formData.triggerEvents, 20, y); y += 20;

    doc.text("3. Payment Terms", 20, y); y += 7;
    doc.text(formData.paymentTerms, 20, y);

    doc.save("Buy_Sell_Agreement.pdf");
    toast.success("PDF Generated");
  };

  const steps = [
    {
      label: "Company Info",
      content: (
        <div className="space-y-3">
          <div><Label>Agreement Date</Label><Input type="date" name="agreementDate" value={formData.agreementDate} onChange={handleChange} /></div>
          <div><Label>Company Name</Label><Input name="companyName" value={formData.companyName} onChange={handleChange} /></div>
          <div><Label>List of Partners</Label><Textarea name="partners" value={formData.partners} onChange={handleChange} placeholder="Partner A, Partner B..." /></div>
        </div>
      )
    },
    {
      label: "Terms",
      content: (
        <div className="space-y-3">
          <div><Label>Valuation Method</Label><Textarea name="valuationMethod" value={formData.valuationMethod} onChange={handleChange} placeholder="How will shares be valued?" /></div>
          <div><Label>Trigger Events</Label><Textarea name="triggerEvents" value={formData.triggerEvents} onChange={handleChange} placeholder="Death, Disability, Retirement..." /></div>
          <div><Label>Payment Terms</Label><Textarea name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Execution",
      content: (
        <div className="space-y-3">
           <div><Label>Signing Date</Label><Input type="date" name="signDate" value={formData.signDate} onChange={handleChange} /></div>
           <p className="text-sm text-gray-500">Signatures will be collected on the printed document.</p>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Buy-Sell Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}