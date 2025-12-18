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
  contractorName: string;
  contractorAddress: string;
  startDate: string;
  descriptionOfWork: string;
  worksiteAddress: string;
  completionDate: string;
  contractPrice: string;
  paymentDue: string;
  warrantyMonths: string;
  cureDays: string;
  governingLaw: string;
  signOwnerName: string;
  signOwnerDate: string;
  signContractorName: string;
  signContractorDate: string;
}

export default function RoofingContractForm() {
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    ownerName: "",
    ownerAddress: "",
    contractorName: "",
    contractorAddress: "",
    startDate: "",
    descriptionOfWork: "",
    worksiteAddress: "",
    completionDate: "",
    contractPrice: "",
    paymentDue: "Upon completion",
    warrantyMonths: "",
    cureDays: "10",
    governingLaw: "",
    signOwnerName: "",
    signOwnerDate: "",
    signContractorName: "",
    signContractorDate: "",
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

    write("ROOFING CONTRACT", 14, true, true);
    write("\n");

    // Use provided fields but keep the exact contract text structure and punctuation.
    write(
      `This Roofing Contract (“Contract”) is made and entered into as of the ${formData.effectiveDate || "___ day of ________"} , ----, by and between:`
    );
    write(`Owner: ${formData.ownerName || "___________________________________"}`);
    write(`Contractor: ${formData.contractorName || "_______________________________"}`);
    write(`Effective Date: This Contract shall become effective on the date first written above.`);
    write("\n");

    write("1. Parties & Effective Date");
    write(
      "This Contract is made between the Owner and the Contractor, and shall be effective from the date stated herein. The obligations, covenants, and agreements set forth shall bind the parties from such date."
    );
    write("\n");

    write("2. Description of Services");
    write(
      `The Contractor shall furnish all labor, equipment, and materials necessary to perform the roofing services in accordance with description of owner (${formData.descriptionOfWork || "Description of Work"}) at the property located at:`
    );
    write(`Address: ${formData.worksiteAddress || "____________________________________"} (“Worksite”).`);
    write(
      `The Contractor shall commence work on the agreed start date (${formData.startDate || "__________"}) and complete the work within the time frame specified, subject to extensions permitted under this Contract.`
    );
    write("\n");

    write("3. Scope of Work");
    write(
      "The Contractor shall supply and deliver all necessary labor, materials, tools, equipment, and supervision required to complete the roofing project in accordance with industry standards, applicable building codes, and manufacturer specifications. Work shall be performed Monday through Saturday, excluding statutory holidays, and is subject to favorable weather conditions."
    );
    write("\n");

    write("4. Worksite Access & Conditions");
    write(
      "The Owner grants the Contractor the right to access the Worksite for purposes of performing the services herein. This includes authorization for excavation or grading as necessary to perform roofing work. Unless specifically stated , no landscaping, grading, filling, or excavation work is included."
    );
    write("\n");

    write("5. Payment Terms");
    write("(a) Contract Price – The total Contract Price shall be as set forth in writing.");
    write(`Contract Price: ${formData.contractPrice || "[Contract Price]"}`);
    write("(b) Due Date – Payment shall be due upon completion of the work unless otherwise agreed in writing.");
    write(`Payment Terms: ${formData.paymentDue || "Upon completion"}`);
    write("(c) Discounts – Any early payment discounts must be taken within the stated time limit.");
    write("(d) Late Payments – Late payments shall accrue interest at the maximum rate permitted by law.");
    write("(e) Collection Costs – In the event of non-payment, the defaulting party shall be liable for all collection costs, including reasonable attorneys’ fees.");
    write("(f) Material Breach – Non-payment constitutes a material breach, entitling the non-defaulting party to suspend performance or terminate this Contract.");
    write("\n");

    write("6. Permits & Insurance");
    write(
      "The Contractor shall be responsible for obtaining all permits and licenses necessary for the performance of the work and shall maintain all insurance required by law, including commercial general liability insurance and workers’ compensation coverage."
    );
    write("\n");

    write("7. Survey & Title");
    write(
      "If property lines are uncertain, the Owner shall indicate the boundaries and provide stakes or other markers. The Owner shall be responsible for ensuring that all work is performed within legal property limits."
    );
    write("\n");

    write("8. Indemnification");
    write(
      "Each party agrees to indemnify, defend, and hold harmless the other party, its officers, employees, and agents from any and all claims, liabilities, damages, costs, and expenses, including reasonable attorneys’ fees, arising out of or related to the negligent acts, omissions, or willful misconduct of the indemnifying party or its agents."
    );
    write("\n");

    write("9. Warranty");
    write(`(a) Workmanship Warranty – The Contractor warrants that all work will be free from defects in workmanship for a period of ${formData.warrantyMonths || "___"} months from the date of completion.`);
    write("(b) Coverage – This warranty covers leaks occurring under normal weather conditions.");
    write("(c) Exclusions – This warranty does not cover damage caused by misuse, neglect, unauthorized modifications, or acts of God.");
    write("(d) Material Warranty – Manufacturer’s warranties for materials shall be assigned to the Owner upon completion.");
    write("\n");

    write("10. Completion of Services");
    write(
      "Upon completion, the Contractor shall restore the property to its pre-work condition and remove all debris, tools, and equipment. The work shall be deemed completed when accepted by the Owner in writing."
    );
    write("\n");

    write("11. Change Orders");
    write(
      "No changes to the scope of work shall be binding unless documented in a written “Change Order” signed by both parties. Additional costs associated with change orders shall be borne by the Owner."
    );
    write("\n");

    write("12. Access & Protection");
    write(
      "The Owner shall provide the Contractor with free and unhindered access to the Worksite, including adequate space for the storage of materials and equipment. The Contractor shall take reasonable measures to protect the Owner’s property during the course of work."
    );
    write("\n");

    write("13. Term");
    write(
      `This Contract shall automatically terminate on ${formData.completionDate || "__________"}, unless extended by mutual written agreement.`
    );
    write("\n");

    write("14. Work Product Ownership");
    write(
      "All completed work and deliverables produced under this Contract shall be the property of the Owner upon payment in full. The Contractor shall execute any documents necessary to evidence such ownership."
    );
    write("\n");

    write("15. Confidentiality");
    write(
      "Each party agrees to maintain in strict confidence all proprietary or confidential information disclosed during the term of this Contract and not to use such information except as necessary to perform obligations herein."
    );
    write("\n");

    write("16. Default");
    write("Events of default include, but are not limited to:");
    write("(a) Failure to make timely payments;");
    write("(b) Insolvency or bankruptcy;");
    write("(c) Seizure of property;");
    write("(d) Failure to commence or complete services within the agreed timeframe.");
    write("\n");

    write("17. Remedies");
    write(
      `In the event of default, the non-defaulting party may terminate this Contract upon written notice, provided the defaulting party fails to cure the breach within ${formData.cureDays || "10"} business days after receipt of such notice.`
    );
    write("\n");

    write("18. Force Majeure");
    write(
      "Neither party shall be liable for delays or failures in performance due to events beyond their reasonable control, including but not limited to natural disasters, pandemics, war, acts of terrorism, labor disputes, or government orders."
    );
    write("\n");

    write("19. Arbitration");
    write(
      "All disputes arising from or relating to this Contract shall be resolved by binding arbitration under the Construction Industry Arbitration Rules of the American Arbitration Association. The arbitrator’s decision shall be final, and judgment may be entered in any court of competent jurisdiction."
    );
    write("\n");

    write("20. Entire Agreement & Amendments");
    write(
      "This Contract constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements, whether written or oral. Any amendments must be in writing and signed by both parties."
    );
    write("\n");

    write("21. Severability");
    write(
      "If any provision of this Contract is found invalid or unenforceable, the remaining provisions shall remain in full force and effect."
    );
    write("\n");

    write("22. Governing Law");
    write(`This Contract shall be governed by and construed in accordance with the laws of the State of ${formData.governingLaw || "__________"}.`);
    write("\n");

    write("23. Notices");
    write(
      "All notices required under this Contract shall be in writing and delivered personally, by certified mail, or by recognized courier service to the addresses provided herein. Notices shall be deemed received upon delivery."
    );
    write("\n");

    write("24. Waiver of Contractual Right");
    write(
      "Failure to enforce any provision of this Contract shall not constitute a waiver of that provision or any other provision, nor prevent subsequent enforcement."
    );
    write("\n");

    write("25. Signatories");
    write("By signing below, the parties affirm that they are duly authorized to enter into this Contract and that they agree to be bound by its terms.");
    write("\n");

    write("OWNER: " + (formData.ownerName || "___________________________") + " (Name, Signature, Date)");
    write("CONTRACTOR: " + (formData.contractorName || "___________________________") + " (Name, Signature, Date)");
    write("\n");

    // Also output signature blocks with entered names/dates
    write(`${formData.signOwnerName || "[Owner Name]"} `);
    write("Signature: ___________________________");
    write("Date: " + (formData.signOwnerDate || "_____________________"));
    write("\n");
    write(`${formData.signContractorName || "[Contractor Name]"} `);
    write("Signature: ___________________________");
    write("Date: " + (formData.signContractorDate || "_____________________"));

    doc.save("Roofing_Contract.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">Parties & Work Details</h3>
              </div>

              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Owner</h4>
              <Label>Owner Name</Label>
              <Input name="ownerName" value={formData.ownerName} onChange={handleChange} />
              <Label>Owner Address</Label>
              <Textarea name="ownerAddress" value={formData.ownerAddress} onChange={handleChange} />

              <hr />

              <h4 className="font-medium">Contractor</h4>
              <Label>Contractor Name</Label>
              <Input name="contractorName" value={formData.contractorName} onChange={handleChange} />
              <Label>Contractor Address</Label>
              <Textarea name="contractorAddress" value={formData.contractorAddress} onChange={handleChange} />

              <Label>Start Date</Label>
              <Input name="startDate" value={formData.startDate} onChange={handleChange} />

              <Label>Description of Work</Label>
              <Textarea name="descriptionOfWork" value={formData.descriptionOfWork} onChange={handleChange} />

              <Label>Worksite Address</Label>
              <Textarea name="worksiteAddress" value={formData.worksiteAddress} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Payment, Warranty & Terms</h3>

              <Label>Contract Price</Label>
              <Input name="contractPrice" value={formData.contractPrice} onChange={handleChange} />

              <Label>Payment Due (text)</Label>
              <Input name="paymentDue" value={formData.paymentDue} onChange={handleChange} />

              <Label>Completion / Termination Date</Label>
              <Input name="completionDate" value={formData.completionDate} onChange={handleChange} />

              <Label>Warranty (months)</Label>
              <Input name="warrantyMonths" value={formData.warrantyMonths} onChange={handleChange} />

              <Label>Cure Period (business days)</Label>
              <Input name="cureDays" value={formData.cureDays} onChange={handleChange} />

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

              <Label>Contractor - Signatory Name</Label>
              <Input name="signContractorName" value={formData.signContractorName} onChange={handleChange} />
              <Label>Contractor - Date</Label>
              <Input name="signContractorDate" value={formData.signContractorDate} onChange={handleChange} />
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
            <div className="text-green-600 font-semibold">Roofing Contract PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
