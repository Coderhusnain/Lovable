import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  agreementDate: string;
  landlordName: string;
  tenantNames: string;
  coSignerName: string;
  leaseDate: string;

  // Property
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;

  // Co-signer identification
  cosignerFullName: string;
  cosignerResidentialAddress: string;
  cosignerUnitNumber: string;
  cosignerCity: string;
  cosignerState: string;
  cosignerZip: string;
  cosignerDriversLicense: string;
  cosignerDriversState: string;
  cosignerTelephone: string;

  // Guarantee terms & notes (optional customizations)
  guaranteeRent: string;
  guaranteeLateFees: string;
  guaranteeDamages: string;
  guaranteeCleaningCharges: string;
  guaranteeUtilities: string;

  responsibilityOnDefault: string;
  durationOfGuarantee: string;
  postEvictionResponsibility: string;
  assignmentSublettingNote: string;

  creditAuthorizationNote: string;
  legalFeesNote: string;
  entireAgreementNote: string;

  // Signatures
  cosignerSignName: string;
  cosignerSignDate: string;
  landlordSignName: string;
  landlordSignDate: string;
  tenantSignName: string;
  tenantSignDate: string;

  // Notary / copies / assistance text (user can override)
  notaryNote: string;
  copiesNote: string;
  assistanceNote: string;
}

export default function CoSignerAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    agreementDate: "",
    landlordName: "",
    tenantNames: "",
    coSignerName: "",
    leaseDate: "",

    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",

    cosignerFullName: "",
    cosignerResidentialAddress: "",
    cosignerUnitNumber: "",
    cosignerCity: "",
    cosignerState: "",
    cosignerZip: "",
    cosignerDriversLicense: "",
    cosignerDriversState: "",
    cosignerTelephone: "",

    guaranteeRent: "Rent payments",
    guaranteeLateFees: "Late fees or penalties",
    guaranteeDamages: "Costs of repairs for damages to the premises caused by the Tenant(s), their guests, pets, or service animals",
    guaranteeCleaningCharges: "Charges for cleaning and/or restoration required upon move-out",
    guaranteeUtilities: "Utility bills and other charges not paid by the Tenant(s) during tenancy or upon termination of the Lease.",

    responsibilityOnDefault:
      "The Co-Signer's obligations shall become effective only upon the failure of the Tenant(s) to fulfill their financial obligations under the Lease.",
    durationOfGuarantee:
      "This Agreement shall remain in full force and effect for the entire duration of the Lease term, including any renewal, extension, holdover period, assignment, or subletting of the premises.",
    postEvictionResponsibility:
      "In the event of eviction, lease termination, or abandonment of the premises by the Tenant(s), the Co-Signer shall remain liable for any unpaid rent, damages, legal fees, and costs until such time as the property is re-rented.",
    assignmentSublettingNote:
      "The obligations of the Co-Signer shall continue notwithstanding any assignment or subletting by the Tenant(s) unless otherwise agreed in writing by the Landlord.",

    creditAuthorizationNote:
      "The Co-Signer hereby authorizes the Landlord to obtain a consumer credit report and perform any necessary background or reference checks to verify the Co-Signer’s financial responsibility and creditworthiness.",
    legalFeesNote:
      "In the event of any legal action arising from this Agreement, the prevailing party shall be entitled to recover from the other party all reasonable attorney’s fees, court costs, and any expenses incurred in enforcing or defending this Agreement, including costs of collection.",
    entireAgreementNote:
      "This Agreement constitutes the entire understanding between the parties with respect to the subject matter contained herein and may not be modified except in writing signed by both the Landlord and the Co-Signer.",

    cosignerSignName: "",
    cosignerSignDate: "",
    landlordSignName: "",
    landlordSignDate: "",
    tenantSignName: "",
    tenantSignDate: "",

    notaryNote:
      "This Agreement should be signed in front of a notary public by ---------------------. Once signed in front of a notary, this document should be delivered to the appropriate court for filing.",
    copiesNote:
      "The original Agreement should be filed with the Clerk of Court or delivered to the requesting business. The Co-Signer should maintain a copy of the Agreement. Your copy should be kept in a safe place.",
    assistanceNote:
      "If you are unsure or have questions regarding this Agreement or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 8;
    let currentY = margin;

    const addText = (text: string, fontSize = 11, isBold = false, isCenter = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("times", isBold ? "bold" : "normal");
      const textWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(text, textWidth);
      lines.forEach((line: string) => {
        if (currentY > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          currentY = margin;
        }
        if (isCenter) {
          const tw = (doc.getStringUnitWidth(line) * fontSize) / doc.internal.scaleFactor;
          const tx = (pageWidth - tw) / 2;
          doc.text(line, tx, currentY);
        } else {
          doc.text(line, margin, currentY);
        }
        currentY += lineHeight;
      });
    };

    // === CO-SIGNER AGREEMENT CONTENT ===
    addText("CO-SIGNER AGREEMENT", 14, true, true);
    addText("\n");
    addText(
      `This Co-Signer Agreement ("Agreement") is made and entered into on this ${formData.agreementDate || "___ day of _________, 20"} , by and between:`
    );
    addText(`Landlord: ${formData.landlordName || "[Insert Full Name]"}`);
    addText(`Tenant(s): ${formData.tenantNames || "[Insert Full Name(s)]"}`);
    addText(`Co-Signer: ${formData.coSignerName || "[Insert Full Name]"}`);
    addText(
      `This Agreement is intended to modify and be read in conjunction with the lease agreement dated ${formData.leaseDate || "____________"} ("Lease"), attached hereto as Attachment A, between the Landlord and the Tenant(s), for the lease of the property described below.`
    );
    addText("\n");

    addText("PROPERTY DESCRIPTION", 12, true);
    addText("The leased premises are located at:");
    addText(`Address: ${formData.propertyAddress || "__________________________________________"}`);
    addText(`City: ${formData.propertyCity || "_______________"} State: ${formData.propertyState || "_______"} ZIP Code: ${formData.propertyZip || "___________"}`);
    addText("\n");

    addText("CO-SIGNER IDENTIFICATION", 12, true);
    addText(`Full Legal Name: ${formData.cosignerFullName || "__________________________________________"}`);
    addText(`Residential Address: ${formData.cosignerResidentialAddress || "__________________________________________"}`);
    addText(`Apartment/Unit Number: ${formData.cosignerUnitNumber || "_________"}`);
    addText(`City: ${formData.cosignerCity || "________________"} State: ${formData.cosignerState || "_________"} ZIP Code: ${formData.cosignerZip || "__________"}`);
    addText(`Driver’s License Number: ${formData.cosignerDriversLicense || "________________"}`);
    addText(`Issuing State: ${formData.cosignerDriversState || "________"}`);
    addText(`Telephone Number: ${formData.cosignerTelephone || "(_____) _____________"}`);
    addText("\n");

    addText("AGREEMENT OF GUARANTEE", 12, true);
    addText("The Co-Signer acknowledges that he/she has read and fully understands the terms and conditions of the Lease referenced above and hereby unconditionally and irrevocably agrees to:");
    addText("1. Guarantee all financial obligations of the Tenant(s) under the Lease, including but not limited to:");
    addText(`- ${formData.guaranteeRent}`);
    addText(`- ${formData.guaranteeLateFees}`);
    addText(`- ${formData.guaranteeDamages}`);
    addText(`- ${formData.guaranteeCleaningCharges}`);
    addText(`- ${formData.guaranteeUtilities}`);
    addText("\n");

    addText("2. Responsibility upon Tenant Default:");
    addText(`${formData.responsibilityOnDefault}`);
    addText("\n");

    addText("3. Duration of Guarantee:");
    addText(`${formData.durationOfGuarantee}`);
    addText("\n");

    addText("4. Responsibility after Eviction or Lease Termination:");
    addText(`${formData.postEvictionResponsibility}`);
    addText("\n");

    addText("5. Assignment and Subletting:");
    addText(`${formData.assignmentSublettingNote}`);
    addText("\n");

    addText("CREDIT AUTHORIZATION", 12, true);
    addText(`${formData.creditAuthorizationNote}`);
    addText("\n");

    addText("LEGAL FEES AND COSTS", 12, true);
    addText(`${formData.legalFeesNote}`);
    addText("\n");

    addText("ENTIRE AGREEMENT", 12, true);
    addText(`${formData.entireAgreementNote}`);
    addText("\n");

    addText("SIGNATURES", 12, true);
    addText("By signing below, the parties acknowledge and agree to all terms of this Co-Signer Agreement:");
    addText("Co-Signer Signature: _____________________________");
    addText(`Print Name: ${formData.cosignerSignName || "___________________________________"}`);
    addText(`Date: ${formData.cosignerSignDate || "_________________"}`);
    addText("Landlord Signature: _____________________________");
    addText(`Print Name: ${formData.landlordSignName || "___________________________________"}`);
    addText(`Date: ${formData.landlordSignDate || "_________________"}`);
    addText("Tenant(s) Acknowledgment (Optional):");
    addText("Tenant Signature: _____________________________");
    addText(`Print Name: ${formData.tenantSignName || "___________________________________"}`);
    addText(`Date: ${formData.tenantSignDate || "_________________"}`);
    addText("\n");
    addText("This Agreement shall be signed by ----------on behalf of --------------and by all co-signers.");
    addText("\n");

    addText("Make It Legal", 12, true);
    addText(`${formData.notaryNote}`);
    addText("\n");

    addText("Copies", 12, true);
    addText(`${formData.copiesNote}`);
    addText("\n");

    addText("Additional Assistance", 12, true);
    addText(`${formData.assistanceNote}`);
    addText("\n");

    // Save file
    doc.save("CoSigner_Agreement.pdf");
    setPdfGenerated(true);
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Basic Info</h3>
              <Label>Agreement Date</Label>
              <Input name="agreementDate" value={formData.agreementDate} onChange={handleChange} />
              <Label>Landlord Full Name</Label>
              <Input name="landlordName" value={formData.landlordName} onChange={handleChange} />
              <Label>Tenant(s) Full Name(s)</Label>
              <Input name="tenantNames" value={formData.tenantNames} onChange={handleChange} />
              <Label>Co-Signer Full Name</Label>
              <Input name="coSignerName" value={formData.coSignerName} onChange={handleChange} />
              <Label>Lease Date</Label>
              <Input name="leaseDate" value={formData.leaseDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Property Description</h3>
              <Label>Property Address</Label>
              <Input name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} />
              <Label>City</Label>
              <Input name="propertyCity" value={formData.propertyCity} onChange={handleChange} />
              <Label>State</Label>
              <Input name="propertyState" value={formData.propertyState} onChange={handleChange} />
              <Label>ZIP Code</Label>
              <Input name="propertyZip" value={formData.propertyZip} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Co-Signer Identification</h3>
              <Label>Full Legal Name</Label>
              <Input name="cosignerFullName" value={formData.cosignerFullName} onChange={handleChange} />
              <Label>Residential Address</Label>
              <Input name="cosignerResidentialAddress" value={formData.cosignerResidentialAddress} onChange={handleChange} />
              <Label>Apartment/Unit Number</Label>
              <Input name="cosignerUnitNumber" value={formData.cosignerUnitNumber} onChange={handleChange} />
              <Label>City</Label>
              <Input name="cosignerCity" value={formData.cosignerCity} onChange={handleChange} />
              <Label>State</Label>
              <Input name="cosignerState" value={formData.cosignerState} onChange={handleChange} />
              <Label>ZIP Code</Label>
              <Input name="cosignerZip" value={formData.cosignerZip} onChange={handleChange} />
              <Label>Driver's License Number</Label>
              <Input name="cosignerDriversLicense" value={formData.cosignerDriversLicense} onChange={handleChange} />
              <Label>Issuing State</Label>
              <Input name="cosignerDriversState" value={formData.cosignerDriversState} onChange={handleChange} />
              <Label>Telephone Number</Label>
              <Input name="cosignerTelephone" value={formData.cosignerTelephone} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Guarantee Terms</h3>
              <Label>Guarantee — Rent</Label>
              <Input name="guaranteeRent" value={formData.guaranteeRent} onChange={handleChange} />
              <Label>Guarantee — Late Fees</Label>
              <Input name="guaranteeLateFees" value={formData.guaranteeLateFees} onChange={handleChange} />
              <Label>Guarantee — Damages</Label>
              <Input name="guaranteeDamages" value={formData.guaranteeDamages} onChange={handleChange} />
              <Label>Guarantee — Cleaning Charges</Label>
              <Input name="guaranteeCleaningCharges" value={formData.guaranteeCleaningCharges} onChange={handleChange} />
              <Label>Guarantee — Utilities</Label>
              <Input name="guaranteeUtilities" value={formData.guaranteeUtilities} onChange={handleChange} />
              <Label>Responsibility upon Tenant Default</Label>
              <textarea name="responsibilityOnDefault" value={formData.responsibilityOnDefault} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Duration of Guarantee</Label>
              <textarea name="durationOfGuarantee" value={formData.durationOfGuarantee} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Responsibility after Eviction / Lease Termination</Label>
              <textarea name="postEvictionResponsibility" value={formData.postEvictionResponsibility} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Assignment & Subletting Note</Label>
              <textarea name="assignmentSublettingNote" value={formData.assignmentSublettingNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Legal, Notices & Signatures</h3>
              <Label>Credit Authorization Note</Label>
              <textarea name="creditAuthorizationNote" value={formData.creditAuthorizationNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Legal Fees & Costs Note</Label>
              <textarea name="legalFeesNote" value={formData.legalFeesNote} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
              <Label>Entire Agreement Note</Label>
              <textarea name="entireAgreementNote" value={formData.entireAgreementNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <hr />
              <h4 className="font-semibold">Signatures</h4>
              <Label>Co-Signer - Print Name</Label>
              <Input name="cosignerSignName" value={formData.cosignerSignName} onChange={handleChange} />
              <Label>Co-Signer - Date</Label>
              <Input name="cosignerSignDate" value={formData.cosignerSignDate} onChange={handleChange} />
              <Label>Landlord - Print Name</Label>
              <Input name="landlordSignName" value={formData.landlordSignName} onChange={handleChange} />
              <Label>Landlord - Date</Label>
              <Input name="landlordSignDate" value={formData.landlordSignDate} onChange={handleChange} />
              <Label>Tenant - Print Name (Optional)</Label>
              <Input name="tenantSignName" value={formData.tenantSignName} onChange={handleChange} />
              <Label>Tenant - Date (Optional)</Label>
              <Input name="tenantSignDate" value={formData.tenantSignDate} onChange={handleChange} />
              <hr />
              <Label>Notary Note (override)</Label>
              <textarea name="notaryNote" value={formData.notaryNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Copies Note (override)</Label>
              <textarea name="copiesNote" value={formData.copiesNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
              <Label>Additional Assistance Note (override)</Label>
              <textarea name="assistanceNote" value={formData.assistanceNote} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
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

        {step < 5 ? (
          <Button onClick={() => setStep((s) => Math.min(5, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {step === 6 && pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold pt-5">Co-Signer Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
