import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface FormData {
  mediationDate: string;
  location: string;
  mediator: string;
  partyA: string;
  partyB: string;
  disputeDescription: string;
  agreementTerms: string;
  partyASign: string;
  partyBSign: string;
  mediatorSign: string;
}

const initialData: FormData = {
  mediationDate: "",
  location: "",
  mediator: "",
  partyA: "",
  partyB: "",
  disputeDescription: "",
  agreementTerms: "",
  partyASign: "",
  partyBSign: "",
  mediatorSign: "",
};

export default function MediationAgreementForm() {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("MEDIATION AGREEMENT", 105, 20, { align: "center" });
    doc.setFontSize(12);
    let y = 40;

    doc.text(`Date: ${formData.mediationDate}`, 20, y); y += 10;
    doc.text(`Location: ${formData.location}`, 20, y); y += 10;
    doc.text(`Mediator: ${formData.mediator}`, 20, y); y += 10;
    doc.text(`Party A: ${formData.partyA}`, 20, y); y += 10;
    doc.text(`Party B: ${formData.partyB}`, 20, y); y += 20;

    doc.text("1. Dispute Description", 20, y); y += 7;
    doc.text(formData.disputeDescription, 20, y); y += 20;

    doc.text("2. Settlement Terms", 20, y); y += 7;
    doc.text(formData.agreementTerms, 20, y); y += 20;

    doc.text("Signatures:", 20, y); y += 10;
    doc.text(`Party A: ${formData.partyASign}`, 20, y); y += 10;
    doc.text(`Party B: ${formData.partyBSign}`, 20, y); y += 10;
    doc.text(`Mediator: ${formData.mediatorSign}`, 20, y);

    doc.save("Mediation_Agreement.pdf");
    toast.success("PDF Generated");
  };

  const steps = [
    {
      label: "Parties & Dispute",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Date</Label><Input type="date" name="mediationDate" value={formData.mediationDate} onChange={handleChange} /></div>
            <div><Label>Location</Label><Input name="location" value={formData.location} onChange={handleChange} /></div>
          </div>
          <div><Label>Mediator Name</Label><Input name="mediator" value={formData.mediator} onChange={handleChange} /></div>
          <div><Label>Party A Name</Label><Input name="partyA" value={formData.partyA} onChange={handleChange} /></div>
          <div><Label>Party B Name</Label><Input name="partyB" value={formData.partyB} onChange={handleChange} /></div>
          <div><Label>Dispute Description</Label><Textarea name="disputeDescription" value={formData.disputeDescription} onChange={handleChange} placeholder="Briefly describe the dispute..." /></div>
        </div>
      )
    },
    {
      label: "Settlement",
      content: (
        <div className="space-y-3">
          <div><Label>Agreed Terms</Label><Textarea name="agreementTerms" value={formData.agreementTerms} onChange={handleChange} className="min-h-[200px]" placeholder="List the terms agreed upon..." /></div>
        </div>
      )
    },
    {
      label: "Signatures",
      content: (
        <div className="space-y-3">
          <div><Label>Party A Signature</Label><Input name="partyASign" value={formData.partyASign} onChange={handleChange} /></div>
          <div><Label>Party B Signature</Label><Input name="partyBSign" value={formData.partyBSign} onChange={handleChange} /></div>
          <div><Label>Mediator Signature</Label><Input name="mediatorSign" value={formData.mediatorSign} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mediation Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
    </div>
  );
}