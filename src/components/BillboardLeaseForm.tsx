import React, { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import jsPDF from "jspdf";
import { toast } from "sonner"; // Assuming you use sonner or similar

// 1. Define the Data Structure
interface FormData {
  agreementDate: string;
  landlordName: string;
  billboardOwnerName: string;
  landlordAddress: string;
  billboardOwnerAddress: string;
  physicalAddress: string;
  legalDescription: string;
  startDate: string;
  endDate: string;
  numberOfBillboards: string;
  yearlyRent: string;
  monthlyRent: string;
  paymentAddress: string;
  maintenanceDays: string;
  curePeriodDays: string;
  billboardOwnerNoticeDays: string;
  governingState: string;
  landlordSignature: string;
  landlordSignatureDate: string;
  billboardOwnerSignature: string;
  billboardOwnerSignatureDate: string;
  notaryName: string;
}

const initialFormData: FormData = {
  agreementDate: "",
  landlordName: "",
  billboardOwnerName: "",
  landlordAddress: "",
  billboardOwnerAddress: "",
  physicalAddress: "",
  legalDescription: "",
  startDate: "",
  endDate: "",
  numberOfBillboards: "one",
  yearlyRent: "",
  monthlyRent: "",
  paymentAddress: "",
  maintenanceDays: "30",
  curePeriodDays: "30",
  billboardOwnerNoticeDays: "60",
  governingState: "",
  landlordSignature: "",
  landlordSignatureDate: "",
  billboardOwnerSignature: "",
  billboardOwnerSignatureDate: "",
  notaryName: "",
};

export default function BillboardLeaseForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper to update state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. PDF Generation Logic (Moved from the old file into onFinish)
  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF();
    let y = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    const fontSize = 12;

    const addText = (text: string, size = 12, isBold = false) => {
      doc.setFontSize(size);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text || "", maxLineWidth);
      doc.text(lines, margin, y);
      y += (lines.length * size * 0.4) + 6;
    };

    // --- PDF CONTENT ---
    addText("BILLBOARD LEASE AGREEMENT", 16, true);
    
    addText(`This Billboard Lease Agreement ("Agreement") is made and entered into as of ${formData.agreementDate}, by and between ${formData.landlordName}, having a principal address at ${formData.landlordAddress} ("Landlord"), and ${formData.billboardOwnerName}, having a principal address at ${formData.billboardOwnerAddress} ("Billboard Owner").`);
    
    addText("1. Lease", 12, true);
    addText(`Landlord hereby leases to Billboard Owner a portion of the property located at ${formData.physicalAddress}, legally described as ${formData.legalDescription}.`);
    
    addText("2. Term", 12, true);
    addText(`The term shall commence on ${formData.startDate} and expire on ${formData.endDate}.`);
    
    addText("3. Rent", 12, true);
    addText(`Rent is $${formData.yearlyRent} per year, payable in monthly installments of $${formData.monthlyRent}. Payments sent to: ${formData.paymentAddress}.`);
    
    addText("4. Use of Premises", 12, true);
    addText(`Billboard Owner may maintain ${formData.numberOfBillboards} billboard(s) on the Premises.`);
    
    if (y > 250) { doc.addPage(); y = 20; }
    
    addText("5. Maintenance", 12, true);
    addText(`Billboard Owner must maintain the Display. Failure to repair within ${formData.maintenanceDays} days of notice constitutes a breach.`);

    addText("6. Termination", 12, true);
    addText(`Landlord may terminate if breach is not cured within ${formData.curePeriodDays} days. Billboard Owner may terminate with ${formData.billboardOwnerNoticeDays} days notice if laws restrict usage.`);

    addText("7. Governing Law", 12, true);
    addText(`Governed by the laws of the State of ${formData.governingState}.`);

    addText("IN WITNESS WHEREOF, the parties have executed this Agreement:", 12, true);
    addText(`Landlord: ${formData.landlordSignature} (Date: ${formData.landlordSignatureDate})`);
    addText(`Billboard Owner: ${formData.billboardOwnerSignature} (Date: ${formData.billboardOwnerSignatureDate})`);
    
    addText(`Notarized by: ${formData.notaryName}`);

    doc.save("Billboard_Lease_Agreement.pdf");
    setIsGenerating(false);
    toast.success("PDF Generated Successfully!");
  };

  // 3. Wizard Steps Configuration
  const steps = [
    {
      label: "Parties & Date",
      content: (
        <div className="space-y-3">
          <div><Label>Agreement Date</Label><Input type="date" name="agreementDate" value={formData.agreementDate} onChange={handleChange} /></div>
          <div><Label>Landlord Name</Label><Input name="landlordName" value={formData.landlordName} onChange={handleChange} /></div>
          <div><Label>Landlord Address</Label><Textarea name="landlordAddress" value={formData.landlordAddress} onChange={handleChange} /></div>
          <div><Label>Billboard Owner Name</Label><Input name="billboardOwnerName" value={formData.billboardOwnerName} onChange={handleChange} /></div>
          <div><Label>Billboard Owner Address</Label><Textarea name="billboardOwnerAddress" value={formData.billboardOwnerAddress} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Property & Term",
      content: (
        <div className="space-y-3">
          <div><Label>Physical Address</Label><Input name="physicalAddress" value={formData.physicalAddress} onChange={handleChange} /></div>
          <div><Label>Legal Description</Label><Textarea name="legalDescription" value={formData.legalDescription} onChange={handleChange} placeholder="Lot number, block, subdivision..." /></div>
          <div><Label>Lease Start Date</Label><Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} /></div>
          <div><Label>Lease End Date</Label><Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} /></div>
          <div><Label>Number of Billboards</Label><Input name="numberOfBillboards" value={formData.numberOfBillboards} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Rent & Payment",
      content: (
        <div className="space-y-3">
          <div><Label>Yearly Rent ($)</Label><Input name="yearlyRent" value={formData.yearlyRent} onChange={handleChange} /></div>
          <div><Label>Monthly Rent ($)</Label><Input name="monthlyRent" value={formData.monthlyRent} onChange={handleChange} /></div>
          <div><Label>Payment Address</Label><Textarea name="paymentAddress" value={formData.paymentAddress} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Terms & Conditions",
      content: (
        <div className="space-y-3">
          <div><Label>Maintenance Response (Days)</Label><Input name="maintenanceDays" value={formData.maintenanceDays} onChange={handleChange} /></div>
          <div><Label>Breach Cure Period (Days)</Label><Input name="curePeriodDays" value={formData.curePeriodDays} onChange={handleChange} /></div>
          <div><Label>Owner Notice Period (Days)</Label><Input name="billboardOwnerNoticeDays" value={formData.billboardOwnerNoticeDays} onChange={handleChange} /></div>
          <div><Label>Governing State</Label><Input name="governingState" value={formData.governingState} onChange={handleChange} /></div>
        </div>
      )
    },
    {
      label: "Signatures",
      content: (
        <div className="space-y-3">
           <div className="grid grid-cols-2 gap-4">
             <div><Label>Landlord Signature</Label><Input name="landlordSignature" value={formData.landlordSignature} onChange={handleChange} /></div>
             <div><Label>Date</Label><Input type="date" name="landlordSignatureDate" value={formData.landlordSignatureDate} onChange={handleChange} /></div>
             <div><Label>Owner Signature</Label><Input name="billboardOwnerSignature" value={formData.billboardOwnerSignature} onChange={handleChange} /></div>
             <div><Label>Date</Label><Input type="date" name="billboardOwnerSignatureDate" value={formData.billboardOwnerSignatureDate} onChange={handleChange} /></div>
           </div>
           <div><Label>Notary Public Name</Label><Input name="notaryName" value={formData.notaryName} onChange={handleChange} /></div>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Billboard Lease Agreement</h2>
      <FormWizard steps={steps} onFinish={generatePDF} />
      {isGenerating && <p className="text-center text-sm text-gray-500 mt-2">Generating PDF...</p>}
    </div>
  );
}