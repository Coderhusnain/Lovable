import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  // Contact Information
  name: string;
  address: string;
  phone: string;
  email: string;

  // Personal Information
  dob: string;
  race: string;
  sex: string;
  height: string;
  weight: string;

  // Report Information
  incidentType: string;
  dateOfIncident: string;
  howAware: string;
  locationOfIncident: string;
  briefDescription: string;

  // Lost / Stolen Item - Driver's License details
  dl_nameOnLicense: string;
  dl_licenseNumber: string;
  dl_stateOfIssue: string;
  dl_description: string;
  dl_issuedOn: string;
  dl_expiryDate: string;

  // Checklist / Legal notes
  checklist_makeItLegal: boolean;
  checklist_signDocument: boolean;
  checklist_copies: boolean;
  checklist_additionalAssistance: boolean;

  // Signature / report filer
  reporterName: string;
  reporterDate: string;
}

export default function InformationForPoliceReportForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    phone: "",
    email: "",

    dob: "",
    race: "",
    sex: "",
    height: "",
    weight: "",

    incidentType: "Theft - Personal Identification",
    dateOfIncident: "",
    howAware: "I became aware of the incident when I attempted to retrieve my driver’s license and found it missing from my wallet. I immediately retraced my steps but could not locate the item. I suspect the theft occurred during the day while I was in a public area.",
    locationOfIncident: "",
    briefDescription:
      "On the above-stated date, I was present at [insert specific location, e.g., “a shopping mall on Main Street”]. At some point during the day, my driver’s license was unlawfully taken from my possession without my knowledge or consent. The item was not misplaced by me, and I believe the loss was due to theft. No witnesses were available at the time of the incident, and no physical confrontation occurred.",

    dl_nameOnLicense: "",
    dl_licenseNumber: "",
    dl_stateOfIssue: "",
    dl_description: "Standard issue driver’s license with a light scratch on the top-left corner.",
    dl_issuedOn: "",
    dl_expiryDate: "",

    checklist_makeItLegal: true,
    checklist_signDocument: true,
    checklist_copies: true,
    checklist_additionalAssistance: true,

    reporterName: "",
    reporterDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") return; // handled separately
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const toggleCheckbox = (key: keyof FormData) => {
    setFormData((p) => ({ ...p, [key]: !p[key] }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    const lineHeight = 13;
    let y = margin;

    const write = (text: string, size = 11, bold = false, center = false) => {
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const maxW = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line) => {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin;
        }
        if (center) {
          const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, y);
        } else {
          doc.text(line, margin, y);
        }
        y += lineHeight;
      });
    };

    write("INFORMATION FOR POLICE REPORT", 16, true, true);
    write("\n");

    write("1. CONTACT INFORMATION", 12, true);
    write(`Name: ${formData.name || "[Insert Full Legal Name]"}`);
    write(`Address: ${formData.address || "[Insert Residential Address]"}`);
    write(`Phone Number: ${formData.phone || "[Insert Phone Number]"}`);
    write(`Email: ${formData.email || "[Insert Email Address]"}`);
    write("\n");

    write("2. PERSONAL INFORMATION", 12, true);
    write(`Date of Birth: ${formData.dob || "[Insert Date of Birth]"}`);
    write(`Race: ${formData.race || "[Insert Race]"}`);
    write(`Sex: ${formData.sex || "[Insert Sex]"}`);
    write(`Height: ${formData.height || "[Insert Height]"}`);
    write(`Weight: ${formData.weight ? `${formData.weight} lbs` : "[Insert Weight] lbs"}`);
    write("\n");

    write("3. REPORT INFORMATION", 12, true);
    write(`Type of Incident: ${formData.incidentType}`);
    write("The undersigned affirms that they have been the victim of the following theft(s):");
    write(`☒ Driver’s License`);
    write(`☐ Wallet`);
    write("\n");

    write(`Date of Incident: ${formData.dateOfIncident || "[Insert Date of Incident]"}`);
    write("How Did You Become Aware of the Incident:");
    write(formData.howAware || "");
    write("\n");

    write(`Location of Incident: ${formData.locationOfIncident || "[Insert Location Where the Incident Occurred]"}`);
    write("Brief Description of the Incident:");
    write(formData.briefDescription || "");
    write("\n");

    write("List of Items Lost or Stolen:", 12, true);
    write("1. Driver's License");
    write(`- Name on License: ${formData.dl_nameOnLicense || "[Insert Your Full Name]"}`);
    write(`- License Number: ${formData.dl_licenseNumber || "[Insert if known]"}`);
    write(`- State of Issue: ${formData.dl_stateOfIssue || "[Insert State or Jurisdiction]"}`);
    write(`- Description: ${formData.dl_description || "Standard issue driver's license with a light scratch on the top-left corner."}`);
    write(`- Issued On: ${formData.dl_issuedOn || "[Insert Date, if known]"}`);
    write(`- Expiry Date: ${formData.dl_expiryDate || "[Insert Date, if known]"}`);
    write("\n");

    write("To do Checklist for Police report:", 12, true);
    write(`Make it legal: ${formData.checklist_makeItLegal ? "☒" : "☐"}`);
    write(`Sign the document: ${formData.checklist_signDocument ? "☒" : "☐"}`);
    write(`Copies: ${formData.checklist_copies ? "☒" : "☐"}`);
    write("The original report should be filed with the Clerk of Court or delivered to the requesting business.");
    write("The report should maintain a copy. Your copy should be kept in a safe place. If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it. Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference.");
    write("\n");

    write("Additional Assistance", 12, true);
    write("If you are unsure or have questions regarding this report or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.");
    write("\n");

    write("Report Filed By:", 12, true);
    write(`Name: ${formData.reporterName || "[Insert Full Name]"}`);
    write(`Date: ${formData.reporterDate || "[Insert Date]"}`);

    doc.save("Information_for_Police_Report.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Contact Information</h3>
              <Label>Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} />
              <Label>Address</Label>
              <Input name="address" value={formData.address} onChange={handleChange} />
              <Label>Phone Number</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} />
              <Label>Email</Label>
              <Input name="email" value={formData.email} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Personal Information</h3>
              <Label>Date of Birth</Label>
              <Input name="dob" value={formData.dob} onChange={handleChange} />
              <Label>Race</Label>
              <Input name="race" value={formData.race} onChange={handleChange} />
              <Label>Sex</Label>
              <Input name="sex" value={formData.sex} onChange={handleChange} />
              <Label>Height</Label>
              <Input name="height" value={formData.height} onChange={handleChange} />
              <Label>Weight (lbs)</Label>
              <Input name="weight" value={formData.weight} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Report Information</h3>
              <Label>Type of Incident</Label>
              <Input name="incidentType" value={formData.incidentType} onChange={handleChange} />
              <Label>Date of Incident</Label>
              <Input name="dateOfIncident" value={formData.dateOfIncident} onChange={handleChange} />
              <Label>How did you become aware of the incident?</Label>
              <Textarea name="howAware" value={formData.howAware} onChange={handleChange} />
              <Label>Location of Incident</Label>
              <Input name="locationOfIncident" value={formData.locationOfIncident} onChange={handleChange} />
              <Label>Brief Description of the Incident</Label>
              <Textarea name="briefDescription" value={formData.briefDescription} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Lost / Stolen Items</h3>
              <Label>Name on Driver's License</Label>
              <Input name="dl_nameOnLicense" value={formData.dl_nameOnLicense} onChange={handleChange} />
              <Label>License Number</Label>
              <Input name="dl_licenseNumber" value={formData.dl_licenseNumber} onChange={handleChange} />
              <Label>State of Issue</Label>
              <Input name="dl_stateOfIssue" value={formData.dl_stateOfIssue} onChange={handleChange} />
              <Label>Description</Label>
              <Textarea name="dl_description" value={formData.dl_description} onChange={handleChange} />
              <Label>Issued On</Label>
              <Input name="dl_issuedOn" value={formData.dl_issuedOn} onChange={handleChange} />
              <Label>Expiry Date</Label>
              <Input name="dl_expiryDate" value={formData.dl_expiryDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Checklist & Legal Notes</h3>
              <div className="flex items-center gap-3">
                <input
                  id="makeItLegal"
                  type="checkbox"
                  checked={formData.checklist_makeItLegal}
                  onChange={() => toggleCheckbox("checklist_makeItLegal")}
                />
                <Label htmlFor="makeItLegal">Make it legal</Label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="signDocument"
                  type="checkbox"
                  checked={formData.checklist_signDocument}
                  onChange={() => toggleCheckbox("checklist_signDocument")}
                />
                <Label htmlFor="signDocument">Sign the document</Label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="copies"
                  type="checkbox"
                  checked={formData.checklist_copies}
                  onChange={() => toggleCheckbox("checklist_copies")}
                />
                <Label htmlFor="copies">Copies / File original with Clerk of Court</Label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="assistance"
                  type="checkbox"
                  checked={formData.checklist_additionalAssistance}
                  onChange={() => toggleCheckbox("checklist_additionalAssistance")}
                />
                <Label htmlFor="assistance">Additional Assistance / Find A Lawyer</Label>
              </div>
            </CardContent>
          </Card>
        );
      case 6:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Reporter / Sign</h3>
              <Label>Report Filed By - Name</Label>
              <Input name="reporterName" value={formData.reporterName} onChange={handleChange} />
              <Label>Date</Label>
              <Input name="reporterDate" value={formData.reporterDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Back
        </Button>

        {step < 6 ? (
          <Button onClick={() => setStep((s) => Math.min(6, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Information for Police Report PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
