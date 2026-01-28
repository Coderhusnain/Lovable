import { useState } from "react";
import { FormWizard } from "./FormWizard"; // Ensure this path is correct
import { jsPDF } from "jspdf";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// 1. Define the Data Interface
interface FormData {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  dateOfBirth: string;
  yearsAtResidence: string;
  previousAddress: string;
  reason: string;
  witnessName: string;
  witnessAddress: string;
  notaryName: string;
  notaryCommission: string;
  notaryExpiration: string;
  date: string;
  signature: string;
}

// 2. Initial State
const initialFormData: FormData = {
  fullName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  dateOfBirth: "",
  yearsAtResidence: "",
  previousAddress: "",
  reason: "",
  witnessName: "",
  witnessAddress: "",
  notaryName: "",
  notaryCommission: "",
  notaryExpiration: "",
  date: "",
  signature: "",
};

export default function AffidavitOfResidenceForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Helper to update state
  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 3. Define Fields (Grouped for readability)
  // You can change 'type' to 'date' or 'textarea' as needed
  const fields: Array<{ name: keyof FormData; label: string; type?: string }> = [
    { name: "fullName", label: "Full Name" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "address", label: "Current Address" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "zip", label: "ZIP" },
    { name: "country", label: "Country" },
    { name: "yearsAtResidence", label: "Years at Residence" },
    { name: "previousAddress", label: "Previous Address" },
    { name: "reason", label: "Reason for Affidavit", type: "textarea" },
    { name: "date", label: "Date of Signing", type: "date" },
    { name: "signature", label: "Signature (Type Name)" },
    { name: "witnessName", label: "Witness Name" },
    { name: "witnessAddress", label: "Witness Address" },
    { name: "notaryName", label: "Notary Name" },
    { name: "notaryCommission", label: "Notary Commission Number" },
    { name: "notaryExpiration", label: "Notary Commission Expiration", type: "date" },
  ];

  // 4. Generate Wizard Steps
  // This automatically groups your fields into pages of 3 inputs each
  const steps = [];
  for (let i = 0; i < fields.length; i += 3) {
    steps.push({
      label: `Step ${steps.length + 1}`,
      content: (
        <div className="space-y-4">
          {fields.slice(i, i + 3).map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  value={formData[field.name]}
                  onChange={(e) => updateFormData(field.name, e.target.value)}
                  placeholder={`Enter ${field.label}`}
                />
              ) : (
                <Input
                  id={field.name}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={(e) => updateFormData(field.name, e.target.value)}
                  placeholder={`Enter ${field.label}`}
                />
              )}
            </div>
          ))}
        </div>
      ),
    });
  }

  // 5. PDF Generation Logic
  const onFinish = () => {
    setIsGeneratingPDF(true);
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 40;
    const maxW = pageW - margin * 2;
    let y = margin;

    const write = (text: string, size = 11, bold = false, center = false) => {
      if (!text) text = "";
      if (text.trim() === "") {
        y += size * 0.8;
        return;
      }
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line: string) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        if (center) {
          const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (pageW - tw) / 2;
          doc.text(line, tx, y);
        } else {
          doc.text(line, margin, y);
        }
        y += size * 1.3;
      });
    };

    // Document Content
    write("AFFIDAVIT OF RESIDENCE", 14, true, true);
    write("");
    write(`I, ${formData.fullName}, born on ${formData.dateOfBirth}, currently residing at ${formData.address}, ${formData.city}, ${formData.state}, ${formData.zip}, ${formData.country}, do hereby solemnly affirm and declare as follows:`);
    write("");
    write(`1. I have resided at the above address for ${formData.yearsAtResidence} years.`);
    write(`2. My previous address was: ${formData.previousAddress}`);
    write(`3. Reason for affidavit: ${formData.reason}`);
    write("");
    write("I affirm that the above information is true and correct to the best of my knowledge and belief.");
    write("");
    write(`Date: ${formData.date}`);
    write(`Signature: ${formData.signature}`);
    write("");
    write("Witness Details:");
    write(`Name: ${formData.witnessName}`);
    write(`Address: ${formData.witnessAddress}`);
    write("");
    write("Notary Public Details:");
    write(`Name: ${formData.notaryName}`);
    write(`Commission Number: ${formData.notaryCommission}`);
    write(`Commission Expiration: ${formData.notaryExpiration}`);

    doc.save("Affidavit_of_Residence.pdf");
    setIsGeneratingPDF(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Affidavit of Residence</h2>
      {/* The FormWizard handles the Next/Back logic internally */}
      <FormWizard steps={steps} onFinish={onFinish} />
      {isGeneratingPDF && <div className="text-center text-sm text-gray-500">Generating PDF...</div>}
    </div>
  );
}