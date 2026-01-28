import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  leaseDate: string;
  landlord: string;
  tenant: string;
  address: string;
  start: string;
  end: string;
  rent: string;
  deposit: string;
  permittedUse: string;
}

const initialData: FormData = {
  leaseDate: "",
  landlord: "",
  tenant: "",
  address: "",
  start: "",
  end: "",
  rent: "",
  deposit: "",
  permittedUse: "",
};

export default function CommercialLeaseForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("COMMERCIAL LEASE AGREEMENT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`Lease Date: ${formData.leaseDate}`, 20, y); y += 10;
    doc.text(`Landlord: ${formData.landlord}`, 20, y); y += 10;
    doc.text(`Tenant: ${formData.tenant}`, 20, y); y += 10;
    doc.text(`Premises: ${formData.address}`, 20, y); y += 20;
    
    doc.text(`Term: ${formData.start} to ${formData.end}`, 20, y); y += 10;
    doc.text(`Monthly Rent: $${formData.rent}`, 20, y); y += 10;
    doc.text(`Security Deposit: $${formData.deposit}`, 20, y); y += 10;
    doc.text(`Permitted Use: ${formData.permittedUse}`, 20, y); y += 20;

    doc.text("Signatures: ___________________    ___________________", 20, y);

    doc.save("Commercial_Lease.pdf");
    toast.success("PDF Generated");
  };

  const steps = [
    {
      label: "Parties",
      content: (
        <div className="space-y-3">
          <div><Label>Lease Date</Label><Input type="date" name="leaseDate" value={formData.leaseDate} onChange={handleChange} /></div>
          <div><Label>Landlord Name</Label><Input name="landlord" value={formData.landlord} onChange={handleChange} /></div>
          <div><Label>Tenant Name</Label><Input name="tenant" value={formData.tenant} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Premises",
      content: (
        <div className="space-y-3">
          <div><Label>Property Address</Label><Input name="address" value={formData.address} onChange={handleChange} /></div>
          <div><Label>Permitted Use</Label><Input name="permittedUse" value={formData.permittedUse} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Terms",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Start Date</Label><Input type="date" name="start" value={formData.start} onChange={handleChange} /></div>
            <div><Label>End Date</Label><Input type="date" name="end" value={formData.end} onChange={handleChange} /></div>
          </div>
          <div><Label>Monthly Rent ($)</Label><Input type="number" name="rent" value={formData.rent} onChange={handleChange} /></div>
          <div><Label>Security Deposit ($)</Label><Input type="number" name="deposit" value={formData.deposit} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Commercial Lease Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}