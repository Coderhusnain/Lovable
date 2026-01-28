import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  date: string;
  party1: string;
  party2: string;
  propertyDetails: string;
  financialArrangement: string;
  terminationTerms: string;
}

const initialData: FormData = {
  date: "",
  party1: "",
  party2: "",
  propertyDetails: "",
  financialArrangement: "",
  terminationTerms: "",
};

export default function CohabitationAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("COHABITATION AGREEMENT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`Date: ${formData.date}`, 20, y); y += 10;
    doc.text(`Party 1: ${formData.party1}`, 20, y); y += 10;
    doc.text(`Party 2: ${formData.party2}`, 20, y); y += 20;
    
    doc.text("1. Property Details:", 20, y); y += 7;
    doc.text(formData.propertyDetails, 20, y); y += 20;

    doc.text("2. Financial Arrangements:", 20, y); y += 7;
    doc.text(formData.financialArrangement, 20, y); y += 20;

    doc.text("3. Termination:", 20, y); y += 7;
    doc.text(formData.terminationTerms, 20, y); y += 20;

    doc.text("Signatures: ___________________    ___________________", 20, y);

    doc.save("Cohabitation_Agreement.pdf");
    toast.success("PDF Generated");
  };

  const steps = [
    {
      label: "Parties",
      content: (
        <div className="space-y-3">
          <div><Label>Agreement Date</Label><Input type="date" name="date" value={formData.date} onChange={handleChange} /></div>
          <div><Label>Party 1 Name</Label><Input name="party1" value={formData.party1} onChange={handleChange} /></div>
          <div><Label>Party 2 Name</Label><Input name="party2" value={formData.party2} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Arrangements",
      content: (
        <div className="space-y-3">
          <div><Label>Property Ownership Details</Label><Textarea name="propertyDetails" value={formData.propertyDetails} onChange={handleChange} placeholder="Who owns what..." /></div>
          <div><Label>Financial Arrangements</Label><Textarea name="financialArrangement" value={formData.financialArrangement} onChange={handleChange} placeholder="Shared expenses, joint accounts..." /></div>
          <div><Label>Termination Terms</Label><Textarea name="terminationTerms" value={formData.terminationTerms} onChange={handleChange} placeholder="What happens if the relationship ends..." /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cohabitation Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}