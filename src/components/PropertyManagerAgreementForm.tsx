import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  effectiveDate: string;
  ownerName: string;
  ownerAddress: string;
  managerName: string;
  managerAddress: string;
  propertyDescription: string;
  startDate: string;
  feePercent: string;
  additionalCompensation: string;
  shortfallDays: string;
  endDate: string;
  terminationNoticeDays: string;
  indemnification: string;
  insuranceDetails: string;
  defaultNoticeDays: string;
  governingLaw: string;
  signOwnerName: string;
  signOwnerDate: string;
  signManagerName: string;
  signManagerDate: string;
}

export default function PropertyManagerAgreementForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    ownerName: "",
    ownerAddress: "",
    managerName: "",
    managerAddress: "",
    propertyDescription: "",
    startDate: "",
    feePercent: "",
    additionalCompensation: "",
    shortfallDays: "15",
    endDate: "",
    terminationNoticeDays: "30",
    indemnification: "",
    insuranceDetails: "",
    defaultNoticeDays: "30",
    governingLaw: "",
    signOwnerName: "",
    signOwnerDate: "",
    signManagerName: "",
    signManagerDate: "",
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

    write("PROPERTY MANAGER AGREEMENT", 14, true, true);
    write("\n");

    // Insert the full agreement text exactly as provided, substituting fields where appropriate
    write(
      `This Property Manager Agreement (“Agreement”) is entered into and made effective as of the ${
        formData.effectiveDate || "___ day of ________, 20"
      }, by and between\n\n${formData.ownerName || "[Owner Name]"}, of ${formData.ownerAddress || "[Owner Address]"} (hereinafter the “Owner”),\nAnd\n${formData.managerName || "[Manager Name]"}, of ${formData.managerAddress || "[Manager Address]"} (hereinafter the “Manager”).\nThe Owner and Manager may be collectively referred to as the “Parties.”`
    );

    write("\n");

    write("RECITALS", 12, true);
    write(
      "WHEREAS, the Manager is experienced in the operation and management of real property and possesses the necessary personnel and resources to manage real estate competently;"
    );
    write(
      "WHEREAS, the Owner desires to retain the Manager to provide property management services for the real estate owned by the Owner, and the Manager agrees to provide such services on the terms set forth herein."
    );
    write(
      "NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows:" 
    );

    write("\n");
    write("1. Description of the Property", 12, true);
    write(`This Agreement applies to the management of the following property(ies) (the “Property”):\n${formData.propertyDescription || "[Insert Property Address(es) and Description]"}`);

    write("\n");
    write("2. Responsibilities of the Manager", 12, true);
    write("The Manager shall serve as an independent contractor and the Owner’s exclusive agent in managing the Property beginning on " + (formData.startDate || "[Start Date]") + ". The Manager’s duties shall include, but are not limited to:");

    write("a. Collection and Disbursement of Rents");
    write(
      "The Manager shall collect all rents as they become due and provide monthly accounting statements detailing rents received and expenses paid. Net income, after deduction of authorized disbursements, shall be remitted to the Owner by mail or as otherwise directed by the Owner, on or before the ___ day of each month, subject to timely rent receipt from tenants."
    );

    write("b. Maintenance and Labor");
    write(
      "The Manager shall arrange for and oversee maintenance, repairs, and improvements to the Property, and may hire and supervise employees and contractors as required."
    );

    write("c. Leasing and Legal Proceedings");
    write(
      "The Manager shall advertise vacancies, screen and select tenants, set market rents, negotiate leases, sign, renew, or terminate rental agreements, and pursue legal actions for rent recovery or damage to the Property. The Manager may settle or compromise claims where appropriate."
    );

    write("\n");
    write("3. Authority Granted", 12, true);
    write("The Owner grants the Manager full authority to perform all acts reasonably necessary to carry out the responsibilities described in this Agreement, as if performed by the Owner personally.");

    write("\n");
    write("4. Fair Housing Compliance", 12, true);
    write("The Manager shall comply with all applicable federal, state, and local laws, including the Fair Housing Act, and shall not discriminate based on race, color, religion, sex, national origin, disability, or familial status.");

    write("\n");
    write("5. Compensation", 12, true);
    write(
      `The Manager shall be entitled to retain ${formData.feePercent || "___%"} of monthly gross rental collections as compensation. Additional compensation for services not described in this Agreement shall be agreed upon in writing by the Parties. The Manager may deduct actual out-of-pocket expenses incurred in the course of management and must provide itemized monthly statements detailing all income and expenditures.\nIf rent collections are insufficient to cover fees and expenses in a given month, the Owner shall remit the shortfall within ${formData.shortfallDays || "15"} days of receiving written notice from the Manager.`
    );

    write("\n");
    write("6. Independent Contractor", 12, true);
    write("The Manager shall perform all duties as an independent contractor and not as an employee of the Owner. The Manager shall be responsible for all taxes, benefits, and obligations as required by law.");

    write("\n");
    write("7. Standard of Performance", 12, true);
    write("The Manager shall perform its duties with reasonable diligence and in accordance with generally accepted industry standards, providing services consistent with those of reputable property managers in the community.");

    write("\n");
    write("8. Term and Termination", 12, true);
    write(
      `This Agreement shall terminate automatically on ${formData.endDate || "[End Date]"}, unless earlier terminated by either party with at least ${formData.terminationNoticeDays || "___"} days written notice. Either party may terminate this Agreement without cause, provided such notice is properly given.`
    );

    write("\n");
    write("9. Indemnification", 12, true);
    write(formData.indemnification || "The Manager shall indemnify, defend, and hold harmless the Owner from and against any and all claims, liabilities, damages, losses, and expenses (including reasonable attorney’s fees) arising from the negligent or willful acts or omissions of the Manager, its agents, employees, or representatives.");

    write("\n");
    write("10. Insurance", 12, true);
    write(formData.insuranceDetails || "The Manager shall maintain General Liability and Errors & Omissions insurance and shall provide proof of such coverage to the Owner upon request. The Owner shall include the Manager as an additional insured under the Owner’s Public Liability Insurance Policy.");

    write("\n");
    write("11. Default", 12, true);
    write("The following shall constitute a material default:");
    write("• Failure to make required payments;");
    write("• Bankruptcy or insolvency of either party;");
    write("• Property of either party becoming subject to seizure or assignment;");
    write("• Failure to perform services in a timely or proper manner.");

    write("\n");
    write("12. Remedies for Default", 12, true);
    write(
      `If a default occurs, the non-defaulting party may terminate this Agreement upon ${formData.defaultNoticeDays || "___"} days written notice, provided the default is not cured within the notice period. The notice must specify the nature of the breach with reasonable detail.`
    );

    write("\n");
    write("13. Force Majeure", 12, true);
    write(
      "Neither party shall be liable for delay or failure to perform obligations due to causes beyond their reasonable control, including but not limited to acts of God, pandemics, civil unrest, war, labor strikes, or governmental orders. Affected obligations shall be suspended until performance becomes possible."
    );

    write("\n");
    write("14. Dispute Resolution", 12, true);
    write("The Parties agree to attempt resolution of disputes through informal negotiations. If unsuccessful, the matter shall be submitted to mediation in accordance with applicable rules. If mediation fails, the Parties may pursue available legal remedies.");

    write("\n");
    write("15. Confidentiality", 12, true);
    write("The Manager shall not disclose any confidential or proprietary information belonging to the Owner, either during the term of this Agreement or thereafter. All records and data shall be returned to the Owner upon termination.");

    write("\n");
    write("16. Return of Property", 12, true);
    write("Upon termination of this Agreement, the Manager shall promptly return to the Owner all materials, documentation, keys, and property relating to the management of the Property.");

    write("\n");
    write("17. Notices", 12, true);
    write("All notices shall be in writing and deemed effective upon delivery by personal service, certified mail, or courier to the address of each party stated herein, or to such other address as may be designated in writing.");

    write("\n");
    write("18. Entire Agreement", 12, true);
    write("This Agreement represents the entire understanding between the Parties and supersedes all prior or contemporaneous agreements. No oral representations or warranties shall be binding unless reduced to writing and signed by both Parties.");

    write("\n");
    write("19. Amendment", 12, true);
    write("This Agreement may only be modified by a written instrument executed by both Parties.");

    write("\n");
    write("20. Severability", 12, true);
    write("If any provision is deemed invalid or unenforceable, the remainder of this Agreement shall remain in full force and effect.");

    write("\n");
    write("21. Waiver", 12, true);
    write("The failure of either party to enforce any provision shall not be construed as a waiver of future enforcement of that provision or any other provision.");

    write("\n");
    write("22. Governing Law", 12, true);
    write(`This Agreement shall be governed and interpreted in accordance with the laws of the State of ${formData.governingLaw || "[Insert State]"}.`);

    write("\n");
    write("23. Signatures", 12, true);
    write("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.");
    write("OWNER:");
    write("Signature: ___________________________");
    write("Name: " + (formData.signOwnerName || "____________________________"));
    write("Date: " + (formData.signOwnerDate || "_____________________"));
    write("\n");
    write("MANAGER:");
    write("Signature: ___________________________");
    write("Name: " + (formData.signManagerName || "____________________________"));
    write("Date: " + (formData.signManagerDate || "_____________________"));

    doc.save("Property_Manager_Agreement.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Parties & Property</h3>
              </div>
              <Label>Agreement Date (Effective Date)</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <Label>Owner Name</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />
              <Label>Owner Address</Label>
              <Textarea name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} />

              <hr />

              <Label>Manager Name</Label>
              <Input name="managerName" value={formData.managerName} onChange={handleChange} />
              <Label>Manager Address</Label>
              <Textarea name="managerAddress" value={formData.managerAddress} onChange={handleChange} />

              <Label>Property Description / Addresses</Label>
              <Textarea name="propertyDescription" value={formData.propertyDescription} onChange={handleChange} />

              <Label>Management Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Compensation & Terms</h3>
              <Label>Manager Fee (% of gross rent)</Label>
              <Input name="feePercent" value={formData.feePercent} onChange={handleChange} />

              <Label>Additional Compensation Details</Label>
              <Textarea name="additionalCompensation" value={formData.additionalCompensation} onChange={handleChange} />

              <Label>Shortfall Payment Days</Label>
              <Input name="shortfallDays" value={formData.shortfallDays} onChange={handleChange} />

              <Label>Agreement End Date</Label>
              <Input name="endDate" value={formData.endDate} onChange={handleChange} />

              <Label>Termination Notice Days</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />

              <Label>Indemnification Text</Label>
              <Textarea name="indemnification" value={formData.indemnification} onChange={handleChange} />

              <Label>Insurance Requirements / Details</Label>
              <Textarea name="insuranceDetails" value={formData.insuranceDetails} onChange={handleChange} />

              <Label>Default Cure Notice Days</Label>
              <Input name="defaultNoticeDays" value={formData.defaultNoticeDays} onChange={handleChange} />

              <Label>Governing Law / State</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Signatures</h3>
              <Label>Owner - Signatory Name</Label>
              <Input name="signOwnerName" value={formData.signOwnerName} onChange={handleChange} />
              <Label>Owner - Date</Label>
              <Input name="signOwnerDate" value={formData.signOwnerDate} onChange={handleChange} />

              <Label>Manager - Signatory Name</Label>
              <Input name="signManagerName" value={formData.signManagerName} onChange={handleChange} />
              <Label>Manager - Date</Label>
              <Input name="signManagerDate" value={formData.signManagerDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Back
        </Button>
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
            <div className="text-green-600 font-semibold">Property Manager Agreement PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
