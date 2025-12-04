import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  agreementDate: string;
  mortgageeName: string;
  mortgageeAddress: string;
  tenantName: string;
  tenantAddress: string;
  leaseDate: string;
  landlordName: string;
  landlordAddress: string;
  legalDescription: string;
  premisesAddress: string;
  signMortgageeName: string;
  signMortgageeTitle: string;
  signMortgageeDate: string;
  signTenantName: string;
  signTenantTitle: string;
  signTenantDate: string;
}

export default function LeaseSubordinationAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    mortgageeName: "",
    mortgageeAddress: "",
    tenantName: "",
    tenantAddress: "",
    leaseDate: "",
    landlordName: "",
    landlordAddress: "",
    legalDescription: "",
    premisesAddress: "",
    signMortgageeName: "",
    signMortgageeTitle: "",
    signMortgageeDate: "",
    signTenantName: "",
    signTenantTitle: "",
    signTenantDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 40;
    const maxW = pageW - margin * 2;
    let y = margin;

    const write = (text: string, size = 11, bold = false, center = false) => {
      doc.setFont("times", bold ? "bold" : "normal");
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line) => {
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

    write("LEASE SUBORDINATION AGREEMENT", 16, true, true);
    write("\n");

    write(`This Lease Subordination Agreement (\"Agreement\") is made and entered into as of ${formData.agreementDate || "[Insert Date]"}, by and between`);
    write(`Mortgagee: ${formData.mortgageeName || "[Insert Name]"}, of ${formData.mortgageeAddress || "[Insert Address]"}.`);
    write(`and`);
    write(`Tenant: ${formData.tenantName || "[Insert Name]"}, of ${formData.tenantAddress || "[Insert Address]"}.`);

    write("\n");
    write("RECITALS", 12, true);
    write("WHEREAS, the Tenant entered into a lease agreement (the \"Lease\") dated " + (formData.leaseDate || "[Insert Lease Date]") + ", with " + (formData.landlordName || "[Insert Landlord Name]") + ", of " + (formData.landlordAddress || "[Insert Landlord Address]") + " (\"Landlord\"), covering certain real property described as follows:");
    write(formData.legalDescription || "[Insert Legal Description of Premises],");
    write("commonly known as: " + (formData.premisesAddress || "[Insert Premises Address]") + " (\"Premises\");");

    write("\n");
    write("WHEREAS, the Mortgagee has extended a mortgage loan to the Landlord, secured, inter alia, by a mortgage (\"Mortgage\") recorded against the Premises;");
    write("WHEREAS, the Tenant has agreed to subordinate its leasehold interest in the Premises in consideration of the Mortgagee's agreement not to disturb the Tenant's possession thereof under the terms of the Lease, so long as the Tenant remains in compliance with its obligations.");

    write("\n");
    write("NOW, THEREFORE, in consideration of the foregoing and the mutual covenants contained herein, the parties agree as follows:", 11, true);
    write("\n");

    write("1. Subordination", 12, true);
    write("The Tenant hereby covenants and agrees that the Lease, and all of the Tenant's rights, title, and interest thereunder, shall be and remain subject and subordinate in all respects to the lien, terms, and conditions of the Mortgage, including all renewals, extensions, modifications, consolidations, substitutions, or replacements thereof, and to any future mortgage or mortgages encumbering the Premises that are held by the Mortgagee or its successors or assigns.");

    write("\n");
    write("2. Non-Disturbance", 12, true);
    write("So long as the Tenant is not in default under the Lease beyond any applicable notice and cure periods, the Mortgagee agrees that the Lease shall not be terminated, nor shall the Tenant's possession, use, or enjoyment of the Premises be disturbed, nor shall the leasehold interest be otherwise affected in the event of foreclosure, or any proceeding to enforce the Mortgage, or if the Mortgagee or any purchaser acquires the Premises.");
    write("Notwithstanding the foregoing, any party succeeding to the interest of the Landlord (hereinafter, the \"Purchaser\") as a result of foreclosure or similar action shall not be:");
    write("(a) liable for any act or omission of any prior landlord;");
    write("(b) subject to any offsets or defenses which the Tenant may have against any prior landlord;");
    write("(c) bound by any prepayment of rent for more than one month in advance; or");
    write("(d) bound by any modification or amendment to the Lease not expressly approved in writing by the Mortgagee.");

    write("\n");
    write("3. Attornment", 12, true);
    write("In the event of foreclosure or conveyance in lieu thereof, or if the Mortgagee otherwise succeeds to the interest of the Landlord under the Lease, the Tenant agrees to attorn to and recognize the Purchaser (including Mortgagee, if applicable) as its landlord under the Lease. Such attornment shall be effective automatically and shall not require the execution of any further instrument.");
    write("From and after such attornment, the Lease shall continue in full force and effect as a direct lease between the Purchaser and the Tenant for the remainder of the term, including any extensions or renewals pursuant to the Lease, and the Purchaser shall assume the obligations of Landlord thereunder arising from and after the date of such succession.");

    write("\n");
    write("4. Binding Effect", 12, true);
    write("This Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective heirs, executors, legal representatives, successors, and assigns.");

    write("\n");
    write("5. Execution and Counterparts", 12, true);
    write("This Agreement may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one instrument. Electronic or scanned signatures shall be deemed effective as originals.");

    write("\n");
    write("IN WITNESS WHEREOF, the undersigned have executed this Lease Subordination Agreement as of the date first written above.");
    write("\n");

    write("MORTGAGEE", 12, true);
    write(`By: ${formData.signMortgageeName || "_____________________________"}`);
    write(`Name: ${formData.signMortgageeName || "_____________________________"}`);
    write(`Title: ${formData.signMortgageeTitle || "_____________________________"}`);
    write(`Date: ${formData.signMortgageeDate || "_____________________________"}`);

    write("\n");
    write("TENANT", 12, true);
    write(`By: ${formData.signTenantName || "_____________________________"}`);
    write(`Name: ${formData.signTenantName || "_____________________________"}`);
    write(`Title: ${formData.signTenantTitle || "_____________________________"}`);
    write(`Date: ${formData.signTenantDate || "_____________________________"}`);

    doc.save("Lease_Subordination_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Agreement & Parties</h3>
              </div>
              <Label>Agreement Date</Label>
              <Input name="agreementDate" value={formData.agreementDate} onChange={handleChange} />
              <Label>Mortgagee Name</Label>
              <Input name="mortgageeName" value={formData.mortgageeName} onChange={handleChange} />
              <Label>Mortgagee Address</Label>
              <Textarea name="mortgageeAddress" value={formData.mortgageeAddress} onChange={handleChange} rows={2} />
              <Label>Tenant Name</Label>
              <Input name="tenantName" value={formData.tenantName} onChange={handleChange} />
              <Label>Tenant Address</Label>
              <Textarea name="tenantAddress" value={formData.tenantAddress} onChange={handleChange} rows={2} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Lease & Property</h3>
              <Label>Lease Date</Label>
              <Input name="leaseDate" value={formData.leaseDate} onChange={handleChange} />
              <Label>Landlord Name</Label>
              <Input name="landlordName" value={formData.landlordName} onChange={handleChange} />
              <Label>Landlord Address</Label>
              <Textarea name="landlordAddress" value={formData.landlordAddress} onChange={handleChange} rows={2} />
              <Label>Legal Description of Premises</Label>
              <Textarea name="legalDescription" value={formData.legalDescription} onChange={handleChange} rows={4} />
              <Label>Premises Address (common name)</Label>
              <Input name="premisesAddress" value={formData.premisesAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Mortgagee - Signatory Name</Label>
              <Input name="signMortgageeName" value={formData.signMortgageeName} onChange={handleChange} />
              <Label>Mortgagee - Title</Label>
              <Input name="signMortgageeTitle" value={formData.signMortgageeTitle} onChange={handleChange} />
              <Label>Mortgagee - Date</Label>
              <Input name="signMortgageeDate" value={formData.signMortgageeDate} onChange={handleChange} />

              <Label>Tenant - Signatory Name</Label>
              <Input name="signTenantName" value={formData.signTenantName} onChange={handleChange} />
              <Label>Tenant - Title</Label>
              <Input name="signTenantTitle" value={formData.signTenantTitle} onChange={handleChange} />
              <Label>Tenant - Date</Label>
              <Input name="signTenantDate" value={formData.signTenantDate} onChange={handleChange} />
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
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</Button>
        {step < 3 ? (
          <Button onClick={() => setStep((s) => Math.min(3, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Lease Subordination Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
