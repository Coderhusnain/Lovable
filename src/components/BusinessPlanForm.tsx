import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface BusinessPlanData {
  businessName: string;
  industry: string;
  marketOpportunity: string;
  businessSpecialization: string;
  operatingLocation: string;
  targetCustomers: string;
  totalInvestment: string;
  marketingFunds: string;
  startupCosts: string;
  monthlyRevenue: string;
  breakEvenMonths: string;
}

const initialData: BusinessPlanData = {
  businessName: '',
  industry: '',
  marketOpportunity: '',
  businessSpecialization: '',
  operatingLocation: '',
  targetCustomers: '',
  totalInvestment: '',
  marketingFunds: '',
  startupCosts: '',
  monthlyRevenue: '',
  breakEvenMonths: '',
};

export default function BusinessPlanForm() {
  const [formData, setFormData] = useState<BusinessPlanData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("BUSINESS PLAN", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    const addSection = (title: string, content: string) => {
      if (y > 250) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.text(title, 20, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(content || "N/A", 170);
      doc.text(lines, 20, y);
      y += (lines.length * 7) + 10;
    };

    addSection("Executive Summary", `Business: ${formData.businessName}. Industry: ${formData.industry}.`);
    addSection("Market Opportunity", formData.marketOpportunity);
    addSection("Specialization", formData.businessSpecialization);
    addSection("Financials", `Investment Required: ${formData.totalInvestment}\nMonthly Revenue: ${formData.monthlyRevenue}\nBreak-even: ${formData.breakEvenMonths} months.`);

    doc.save("Business_Plan.pdf");
    toast.success("Business Plan Generated!");
  };

  const steps = [
    {
      label: "Overview",
      content: (
        <div className="space-y-3">
          <div><Label>Business Name</Label><Input name="businessName" value={formData.businessName} onChange={handleChange} /></div>
          <div><Label>Industry</Label><Input name="industry" value={formData.industry} onChange={handleChange} /></div>
          <div><Label>Operating Location</Label><Input name="operatingLocation" value={formData.operatingLocation} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Strategy",
      content: (
        <div className="space-y-3">
          <div><Label>Market Opportunity</Label><Textarea name="marketOpportunity" value={formData.marketOpportunity} onChange={handleChange} /></div>
          <div><Label>Target Customers</Label><Textarea name="targetCustomers" value={formData.targetCustomers} onChange={handleChange} /></div>
          <div><Label>Business Specialization</Label><Textarea name="businessSpecialization" value={formData.businessSpecialization} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Financials",
      content: (
        <div className="space-y-3">
          <div><Label>Total Investment ($)</Label><Input type="number" name="totalInvestment" value={formData.totalInvestment} onChange={handleChange} /></div>
          <div><Label>Startup Costs ($)</Label><Input type="number" name="startupCosts" value={formData.startupCosts} onChange={handleChange} /></div>
          <div><Label>Monthly Revenue Proj.</Label><Input type="number" name="monthlyRevenue" value={formData.monthlyRevenue} onChange={handleChange} /></div>
          <div><Label>Break Even (Months)</Label><Input type="number" name="breakEvenMonths" value={formData.breakEvenMonths} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Business Plan Generator</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}