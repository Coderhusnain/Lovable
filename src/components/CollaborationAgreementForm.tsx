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
  project: string;
  roles: string;
  ownership: string;
  profitSplit: string;
}

const initialData: FormData = {
  date: "",
  party1: "",
  party2: "",
  project: "",
  roles: "",
  ownership: "Joint Ownership",
  profitSplit: "50/50",
};

export default function CollaborationAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("COLLABORATION AGREEMENT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`Date: ${formData.date}`, 20, y); y += 10;
    doc.text(`Party 1: ${formData.party1}`, 20, y); y += 10;
    doc.text(`Party 2: ${formData.party2}`, 20, y); y += 20;
    
    doc.text(`Project: ${formData.project}`, 20, y); y += 10;
    doc.text(`Roles: ${formData.roles}`, 20, y); y += 20;

    doc.text(`Ownership: ${formData.ownership}`, 20, y); y += 10;
    doc.text(`Profit Split: ${formData.profitSplit}`, 20, y); y += 20;

    doc.text("Signatures: ___________________    ___________________", 20, y);

    doc.save("Collaboration_Agreement.pdf");
    toast.success("PDF Generated");
  };

  const steps = [
    {
      label: "Parties",
      content: (
        <div className="space-y-3">
          <div><Label>Agreement Date</Label><Input type="date" name="date" value={formData.date} onChange={handleChange} /></div>
          <div><Label>Collaborator 1</Label><Input name="party1" value={formData.party1} onChange={handleChange} /></div>
          <div><Label>Collaborator 2</Label><Input name="party2" value={formData.party2} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Project Details",
      content: (
        <div className="space-y-3">
          <div><Label>Project Name/Description</Label><Input name="project" value={formData.project} onChange={handleChange} /></div>
          <div><Label>Roles & Responsibilities</Label><Textarea name="roles" value={formData.roles} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Financials",
      content: (
        <div className="space-y-3">
          <div><Label>Ownership Structure</Label><Input name="ownership" value={formData.ownership} onChange={handleChange} /></div>
          <div><Label>Profit Split</Label><Input name="profitSplit" value={formData.profitSplit} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Collaboration Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}