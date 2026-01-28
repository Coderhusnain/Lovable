import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  eventDate: string;
  clientName: string;
  catererName: string;
  eventLocation: string;
  guestCount: string;
  menuDetails: string;
  totalCost: string;
  deposit: string;
}

const initialData: FormData = {
  eventDate: "",
  clientName: "",
  catererName: "",
  eventLocation: "",
  guestCount: "",
  menuDetails: "",
  totalCost: "",
  deposit: "",
};

export default function CateringAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("CATERING AGREEMENT", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    let y = 40;
    
    doc.text(`Event Date: ${formData.eventDate}`, 20, y); y += 10;
    doc.text(`Client: ${formData.clientName}`, 20, y); y += 10;
    doc.text(`Caterer: ${formData.catererName}`, 20, y); y += 10;
    doc.text(`Location: ${formData.eventLocation}`, 20, y); y += 10;
    doc.text(`Est. Guests: ${formData.guestCount}`, 20, y); y += 20;

    doc.text("Menu Details:", 20, y); y += 7;
    doc.text(formData.menuDetails, 20, y); y += 20;

    doc.text(`Total Cost: $${formData.totalCost}`, 20, y); y += 10;
    doc.text(`Deposit Required: $${formData.deposit}`, 20, y);

    doc.save("Catering_Agreement.pdf");
    toast.success("PDF Generated");
  };

  const steps = [
    {
      label: "Event Info",
      content: (
        <div className="space-y-3">
          <div><Label>Event Date</Label><Input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} /></div>
          <div><Label>Location</Label><Input name="eventLocation" value={formData.eventLocation} onChange={handleChange} /></div>
          <div><Label>Est. Guests</Label><Input type="number" name="guestCount" value={formData.guestCount} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Parties",
      content: (
        <div className="space-y-3">
          <div><Label>Client Name</Label><Input name="clientName" value={formData.clientName} onChange={handleChange} /></div>
          <div><Label>Caterer Name</Label><Input name="catererName" value={formData.catererName} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Menu & Cost",
      content: (
        <div className="space-y-3">
          <div><Label>Menu Details</Label><Textarea name="menuDetails" value={formData.menuDetails} onChange={handleChange} placeholder="Buffet style, specific dishes..." /></div>
          <div><Label>Total Cost ($)</Label><Input type="number" name="totalCost" value={formData.totalCost} onChange={handleChange} /></div>
          <div><Label>Deposit Amount ($)</Label><Input type="number" name="deposit" value={formData.deposit} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Catering Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}