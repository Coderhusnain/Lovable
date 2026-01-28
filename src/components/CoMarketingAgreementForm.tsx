import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  date: string;
  partner1: string;
  partner2: string;
  campaign: string;
  activities: string;
  costs: string;
  duration: string;
}

const initialData: FormData = {
  date: "",
  partner1: "",
  partner2: "",
  campaign: "",
  activities: "",
  costs: "Each party bears own costs",
  duration: "",
};

export default function CoMarketingAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("CO-MARKETING AGREEMENT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`Date: ${formData.date}`, 20, y); y += 10;
    doc.text(`Partner 1: ${formData.partner1}`, 20, y); y += 10;
    doc.text(`Partner 2: ${formData.partner2}`, 20, y); y += 20;
    
    doc.text(`Campaign: ${formData.campaign}`, 20, y); y += 10;
    doc.text("Activities:", 20, y); y += 7;
    doc.text(formData.activities, 20, y); y += 20;

    doc.text(`Cost Allocation: ${formData.costs}`, 20, y); y += 10;
    doc.text(`Duration: ${formData.duration}`, 20, y); y += 20;

    doc.text("Signatures: ___________________    ___________________", 20, y);

    doc.save("Co_Marketing_Agreement.pdf");
    toast.success("PDF Generated");
  };

  const steps = [
    {
      label: "Partners",
      content: (
        <div className="space-y-3">
          <div><Label>Agreement Date</Label><Input type="date" name="date" value={formData.date} onChange={handleChange} /></div>
          <div><Label>Partner 1 Name</Label><Input name="partner1" value={formData.partner1} onChange={handleChange} /></div>
          <div><Label>Partner 2 Name</Label><Input name="partner2" value={formData.partner2} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Campaign",
      content: (
        <div className="space-y-3">
          <div><Label>Campaign Name</Label><Input name="campaign" value={formData.campaign} onChange={handleChange} /></div>
          <div><Label>Joint Activities</Label><Textarea name="activities" value={formData.activities} onChange={handleChange} placeholder="Events, webinars, shared content..." /></div>
        </div>
      )
    },
    {
      label: "Terms",
      content: (
        <div className="space-y-3">
          <div><Label>Cost Allocation</Label><Input name="costs" value={formData.costs} onChange={handleChange} /></div>
          <div><Label>Duration</Label><Input name="duration" value={formData.duration} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Co-Marketing Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}