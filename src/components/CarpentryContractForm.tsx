import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  ownerName: string;
  ownerAddress: string;
  carpenterName: string;
  carpenterAddress: string;
  serviceDescription: string;
  paymentAmount: string;
  paymentSchedule: string;
  startDate: string;
  endDate: string;
}

const initialData: FormData = {
  effectiveDate: "",
  ownerName: "",
  ownerAddress: "",
  carpenterName: "",
  carpenterAddress: "",
  serviceDescription: "",
  paymentAmount: "",
  paymentSchedule: "",
  startDate: "",
  endDate: "",
};

export default function CarpentryContractForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("CARPENTRY CONTRACT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`This contract is made on ${formData.effectiveDate} between:`, 20, y); y += 10;
    doc.text(`Owner: ${formData.ownerName} (${formData.ownerAddress})`, 20, y); y += 10;
    doc.text(`Carpenter: ${formData.carpenterName} (${formData.carpenterAddress})`, 20, y); y += 20;

    doc.text("1. Services:", 20, y); y += 7;
    doc.text(formData.serviceDescription, 20, y); y += 20;

    doc.text(`2. Payment: Total $${formData.paymentAmount}`, 20, y); y += 10;
    doc.text(`Schedule: ${formData.paymentSchedule}`, 20, y); y += 10;

    doc.text(`3. Timeline: Start: ${formData.startDate}, End: ${formData.endDate}`, 20, y); y += 20;

    doc.text("Signatures: ________________________   ________________________", 20, y);

    doc.save("Carpentry_Contract.pdf");
    toast.success("Contract Generated");
  };

  const steps = [
    {
      label: "Parties",
      content: (
        <div className="space-y-3">
          <div><Label>Effective Date</Label><Input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} /></div>
          <div><Label>Owner Name</Label><Input name="ownerName" value={formData.ownerName} onChange={handleChange} /></div>
          <div><Label>Owner Address</Label><Input name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} /></div>
          <div><Label>Carpenter Name</Label><Input name="carpenterName" value={formData.carpenterName} onChange={handleChange} /></div>
          <div><Label>Carpenter Address</Label><Input name="carpenterAddress" value={formData.carpenterAddress} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Work Scope",
      content: (
        <div className="space-y-3">
          <div><Label>Service Description</Label><Textarea name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} placeholder="Detailed description of carpentry work..." /></div>
          <div><Label>Start Date</Label><Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} /></div>
          <div><Label>Est. End Date</Label><Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Payment",
      content: (
        <div className="space-y-3">
          <div><Label>Total Payment ($)</Label><Input type="number" name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} /></div>
          <div><Label>Payment Schedule</Label><Textarea name="paymentSchedule" value={formData.paymentSchedule} onChange={handleChange} placeholder="e.g., 50% upfront, 50% on completion" /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Carpentry Contract</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}