import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  parentName: string;
  parentAddress: string;
  parentPhone: string;
  caregiverName: string;
  caregiverAddress: string;
  childrenNames: string;
  startDate: string;
  endDate: string;
  emergencyContact: string;
  medicalAuth: string;
}

const initialData: FormData = {
  parentName: "",
  parentAddress: "",
  parentPhone: "",
  caregiverName: "",
  caregiverAddress: "",
  childrenNames: "",
  startDate: "",
  endDate: "",
  emergencyContact: "",
  medicalAuth: "Yes",
};

export default function ChildCareAuthForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("CHILD CARE AUTHORIZATION", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`I, ${formData.parentName}, residing at ${formData.parentAddress}, authorize:`, 20, y); y += 10;
    doc.text(`${formData.caregiverName} (${formData.caregiverAddress})`, 20, y); y += 20;

    doc.text("To care for my children:", 20, y); y += 7;
    doc.text(formData.childrenNames, 20, y); y += 20;

    doc.text(`Period: From ${formData.startDate} To ${formData.endDate}`, 20, y); y += 20;
    
    doc.text(`Emergency Contact: ${formData.emergencyContact}`, 20, y); y += 10;
    doc.text(`Medical Authorization: ${formData.medicalAuth}`, 20, y); y += 20;

    doc.text("Parent Signature: _____________________________", 20, y);

    doc.save("Child_Care_Auth.pdf");
    toast.success("Authorization Generated");
  };

  const steps = [
    {
      label: "Parent/Guardian",
      content: (
        <div className="space-y-3">
          <div><Label>Parent Name</Label><Input name="parentName" value={formData.parentName} onChange={handleChange} /></div>
          <div><Label>Address</Label><Input name="parentAddress" value={formData.parentAddress} onChange={handleChange} /></div>
          <div><Label>Phone</Label><Input name="parentPhone" value={formData.parentPhone} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Caregiver",
      content: (
        <div className="space-y-3">
          <div><Label>Caregiver Name</Label><Input name="caregiverName" value={formData.caregiverName} onChange={handleChange} /></div>
          <div><Label>Address</Label><Input name="caregiverAddress" value={formData.caregiverAddress} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Children & Terms",
      content: (
        <div className="space-y-3">
          <div><Label>Children Names (Comma separated)</Label><Textarea name="childrenNames" value={formData.childrenNames} onChange={handleChange} placeholder="Child A, Child B..." /></div>
          <div><Label>Start Date</Label><Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} /></div>
          <div><Label>End Date</Label><Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} /></div>
          <div><Label>Emergency Contact</Label><Input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Child Care Authorization</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}