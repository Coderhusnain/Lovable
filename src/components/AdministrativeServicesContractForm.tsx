import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { ArrowLeft, ArrowRight, Send, CheckCircle, Calendar as CalendarIcon, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FormWizard } from "./FormWizard";

interface FormData {
  effectiveDate: string;
  recipientName: string;
  recipientAddress: string;
  providerName: string;
  providerAddress: string;
  servicesStartDate: string;
  servicesDescription: string;
  standardFeeRate: string;
  additionalServiceRate: string;
  billingSchedule: string;
  contractEndDate: string;
  earlyTerminationDays: string;
  curePeriodDays: string;
  confidentialityClause: string;
  insuranceNote: string;
  indemnificationClause: string;
  arbitrationTerms: string;
  attorneysFeesClause: string;
  limitationOfLiability: string;
  governingLaw: string;
  noticesAddress: string;
  signRecipientName: string;
  signRecipientDate: string;
  signProviderName: string;
  signProviderDate: string;
}

export default function AdministrativeServicesContractForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    recipientName: "",
    recipientAddress: "",
    providerName: "",
    providerAddress: "",
    servicesStartDate: "",
    servicesDescription: "",
    standardFeeRate: "",
    additionalServiceRate: "",
    billingSchedule: "",
    contractEndDate: "",
    earlyTerminationDays: "30",
    curePeriodDays: "10",
    confidentialityClause:
      "The Service Provider shall not use, disclose, or otherwise reveal any proprietary or confidential information belonging to the Recipient. This obligation survives termination.",
    insuranceNote: "Service Provider is responsible for obtaining appropriate insurance for itself and its employees.",
    indemnificationClause:
      "The Service Provider agrees to indemnify and hold harmless the Recipient from all claims, losses, liabilities, damages, costs, judgments, and attorney fees arising from the acts or omissions of the Service Provider.",
    arbitrationTerms:
      "All disputes shall be resolved by binding arbitration in accordance with Commercial Arbitration Rules. Arbitration decisions are final and binding.",
    attorneysFeesClause:
      "The prevailing party in any dispute shall be entitled to recover reasonable attorneys' fees and costs.",
    limitationOfLiability:
      "Neither Party shall be liable for indirect, incidental, consequential, special, or exemplary damages, including loss of profits.",
    governingLaw: "",
    noticesAddress: "",
    signRecipientName: "",
    signRecipientDate: "",
    signProviderName: "",
    signProviderDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const write = (
    doc: jsPDF,
    text: string,
    state: { y: number },
    opts?: { size?: number; bold?: boolean; center?: boolean }
  ) => {
    const margin = 40;
    const pageW = doc.internal.pageSize.getWidth();
    const maxW = pageW - margin * 2;
    const size = opts?.size ?? 11;
    doc.setFont("times", opts?.bold ? ("bold" as any) : ("normal" as any));
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    lines.forEach((line) => {
      if (state.y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        state.y = margin;
      }
      if (opts?.center) {
        const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
        const tx = (pageW - tw) / 2;
        doc.text(line, tx, state.y);
      } else {
        doc.text(line, margin, state.y);
      }
      state.y += size * 1.3;
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const state = { y: 40 };

    write(doc, "ADMINISTRATIVE SERVICES CONTRACT", state, { size: 14, bold: true, center: true });
    write(doc, "\n", state);

    write(
      doc,
      `This Administrative Services Contract (“Contract”) is made effective as of ${formData.effectiveDate || "__"} (“Effective Date”), by and between:`,
      state
    );
    write(doc, `Recipient: ${formData.recipientName || "__"} ${formData.recipientAddress ? `— ${formData.recipientAddress}` : ""}`, state);
    write(
      doc,
      `Service Provider: ${formData.providerName || "__"} ${formData.providerAddress ? `— ${formData.providerAddress}` : ""}`,
      state
    );

    write(doc, "\n1. DESCRIPTION OF SERVICES", state, { size: 12, bold: true });
    write(
      doc,
      `Beginning on ${formData.servicesStartDate || "___"}, the Service Provider shall provide administrative support and related services to the Recipient. These services include (collectively, the "Services"):`,
      state
    );
    write(doc, formData.servicesDescription || "• [Insert detailed list of administrative tasks]", state);
    write(doc, "The Service Provider shall perform the Services professionally, promptly, and in accordance with industry standards applicable to administrative and support services.", state);

    write(doc, "\n2. MUTUAL OBLIGATIONS OF THE PARTIES", state, { size: 12, bold: true });
    write(doc, "Both Parties agree to take all steps reasonably necessary to fulfill their obligations under this Contract, including:", state);
    write(doc, "(a) Designating key individuals to coordinate and manage responsibilities.", state);
    write(doc, "(b) Conducting periodic meetings between such individuals as reasonably required.", state);
    write(doc, "(c) Cooperating fully with reasonable requests for assistance and information.", state);
    write(doc, "(d) Executing all documents and taking actions reasonably necessary to carry out the terms of this Contract.", state);
    write(doc, "Each Party further agrees to use its best efforts to resolve issues in a constructive and timely manner.", state);

    write(doc, "\n3. PAYMENT TERMS", state, { size: 12, bold: true });
    write(doc, `Standard Fees: The Service Provider’s fees shall be $${formData.standardFeeRate || "___"} per hour.`, state);
    write(doc, `Additional Services: Any services not listed above shall be billed at $${formData.additionalServiceRate || "___"} per hour.`, state);
    write(doc, `Billing / Invoices: ${formData.billingSchedule || "[describe billing schedule]"} Invoices shall be payable in accordance with the billing schedule agreed upon by the Parties.`, state);

    write(doc, "\n4. TERM OF CONTRACT", state, { size: 12, bold: true });
    write(doc, `This Contract shall commence on the Effective Date and shall remain in effect until ${formData.contractEndDate || "___"} unless terminated earlier as provided herein.`, state);

    write(doc, "\n5. TERMINATION", state, { size: 12, bold: true });
    write(doc, `5.1 Termination Without Cause: Either Party may terminate with or without cause upon ${formData.earlyTerminationDays ||
      "___"} days' written notice. Upon early termination, the Service Provider shall be compensated pro-rata for Services performed up to the effective date of termination.`, state);
    write(doc, `5.2 Termination for Default: Material defaults include failure to pay, insolvency, seizure of property, or failure to perform services. The non-defaulting Party must provide written notice describing the default. The defaulting Party shall have ${formData.curePeriodDays ||
      "___"} days to cure. Failure to cure results in automatic termination unless waived.`, state);

    write(doc, "\n6. RELATIONSHIP OF THE PARTIES", state, { size: 12, bold: true });
    write(doc, "The Parties understand that the Service Provider is an independent contractor, not an employee. Nothing in this Contract creates a partnership, joint venture, or employment relationship. The Service Provider is responsible for payroll taxes and benefits for its personnel.", state);

    write(doc, "\n7. WORK PRODUCT OWNERSHIP", state, { size: 12, bold: true });
    write(doc, "All copyrightable works, inventions, ideas, improvements, or other materials (\"Work Product\") created by the Service Provider in connection with the Services shall be the exclusive property of the Recipient. The Service Provider shall execute documents necessary to confirm ownership.", state);

    write(doc, "\n8. CONFIDENTIALITY", state, { size: 12, bold: true });
    write(doc, formData.confidentialityClause || "The Service Provider shall treat all Recipient information as strictly confidential and return materials upon termination.", state);

    write(doc, "\n9. INJURIES AND INSURANCE", state, { size: 12, bold: true });
    write(doc, formData.insuranceNote || "The Service Provider is responsible for obtaining appropriate insurance and waives rights to recover from the Recipient for injuries arising from Provider's negligence.", state);

    write(doc, "\n10. INDEMNIFICATION", state, { size: 12, bold: true });
    write(doc, formData.indemnificationClause || "The Service Provider shall indemnify and hold harmless the Recipient for claims arising from Provider acts or omissions.", state);

    write(doc, "\n11. REMEDIES", state, { size: 12, bold: true });
    write(doc, "In addition to legal remedies, if a Party fails to substantially perform, the other may terminate by written notice specifying the default. The defaulting Party has the cure period to remedy the default.", state);

    write(doc, "\n12. FORCE MAJEURE", state, { size: 12, bold: true });
    write(
      doc,
      "Neither Party shall be liable for failure to perform if prevented by events beyond reasonable control, including Acts of God, epidemics, government orders, storms, riots, war, strikes, and similar events. The affected Party must give prompt written notice and shall resume performance when possible.",
      state
    );

    write(doc, "\n13. ARBITRATION", state, { size: 12, bold: true });
    write(doc, formData.arbitrationTerms || "All disputes shall be resolved by binding arbitration per the Commercial Arbitration Rules. Arbitration is final and binding.", state);
    write(doc, "Parties shall continue performance during arbitration.", state);

    write(doc, "\n14. ATTORNEYS’ FEES", state, { size: 12, bold: true });
    write(doc, formData.attorneysFeesClause || "The prevailing party shall be entitled to recover reasonable attorneys' fees and costs.", state);

    write(doc, "\n15. LIMITATION OF LIABILITY", state, { size: 12, bold: true });
    write(doc, formData.limitationOfLiability || "Neither party shall be liable for indirect, incidental, consequential, special, or exemplary damages.", state);

    write(doc, "\n16. ENTIRE CONTRACT", state, { size: 12, bold: true });
    write(doc, "This Contract constitutes the entire agreement between the Parties and supersedes prior agreements, representations, or understandings.", state);

    write(doc, "\n17. SEVERABILITY", state, { size: 12, bold: true });
    write(doc, "If any provision is held invalid, the remainder shall remain in full force and effect. If limiting a provision makes it valid, it shall be enforced as limited.", state);

    write(doc, "\n18. NOTICE", state, { size: 12, bold: true });
    write(
      doc,
      `Notices shall be delivered in person or by certified mail to the addresses listed above or to any other address designated in writing. Notices address / contact: ${formData.noticesAddress || "[Insert notices address]"}`,
      state
    );

    write(doc, "\n19. WAIVER", state, { size: 12, bold: true });
    write(doc, "Failure to enforce a provision does not waive future enforcement. All waivers must be in writing and signed by the waiving Party.", state);

    write(doc, "\n20. ASSIGNMENT", state, { size: 12, bold: true });
    write(doc, "Neither Party may assign or transfer this Contract without prior written consent of the other. Any assignment without consent is void.", state);

    write(doc, "\n21. AMENDMENT", state, { size: 12, bold: true });
    write(doc, "This Contract may only be amended in writing signed by both Parties.", state);

    write(doc, "\n22. GOVERNING LAW", state, { size: 12, bold: true });
    write(doc, `This Contract shall be governed by and interpreted in accordance with the laws of ${formData.governingLaw || "__"}.`, state);

    write(doc, "\n23. SIGNATORIES", state, { size: 12, bold: true });
    write(doc, "This Contract is signed by the Parties as of the Effective Date.", state);

    write(doc, "\n\nRecipient:", state);
    write(doc, `${formData.recipientName || "[Recipient]"}\nSignature: __________________________\nDate: ${formData.signRecipientDate || "________"}`, state);

    write(doc, "\n\nService Provider:", state);
    write(doc, `${formData.providerName || "[Service Provider]"}\nSignature: __________________________\nDate: ${formData.signProviderDate || "________"}`, state);

    doc.save("Administrative_Services_Contract.pdf");
    setPdfGenerated(true);
  };

  const steps = [
    {
      label: "Parties & Effective Date",
      content: (
        <>
          <Label>Effective Date</Label>
          <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

          <hr />
          <h4 className="font-medium">Recipient</h4>
          <Label>Name</Label>
          <Input name="recipientName" value={formData.recipientName} onChange={handleChange} />
          <Label>Address</Label>
          <Textarea name="recipientAddress" value={formData.recipientAddress} onChange={handleChange} />

          <hr />
          <h4 className="font-medium">Service Provider</h4>
          <Label>Name</Label>
          <Input name="providerName" value={formData.providerName} onChange={handleChange} />
          <Label>Address</Label>
          <Textarea name="providerAddress" value={formData.providerAddress} onChange={handleChange} />

          <Label>Services Start Date</Label>
          <Input name="servicesStartDate" value={formData.servicesStartDate} onChange={handleChange} />
        </>
      ),
      validate: () => Boolean(formData.effectiveDate && formData.recipientName && formData.providerName),
    },
    {
      label: "Services & Payment",
      content: (
        <>
          <Label>Services Description</Label>
          <Textarea name="servicesDescription" value={formData.servicesDescription} onChange={handleChange} />

          <Label>Standard Fee Rate ($/hour)</Label>
          <Input name="standardFeeRate" value={formData.standardFeeRate} onChange={handleChange} />

          <Label>Additional Service Rate ($/hour)</Label>
          <Input name="additionalServiceRate" value={formData.additionalServiceRate} onChange={handleChange} />

          <Label>Billing / Invoicing Schedule</Label>
          <Textarea name="billingSchedule" value={formData.billingSchedule} onChange={handleChange} />
        </>
      ),
      validate: () => Boolean(formData.servicesDescription && formData.standardFeeRate && formData.additionalServiceRate),
    },
    {
      label: "Term, Termination & Obligations",
      content: (
        <>
          <Label>Contract End Date</Label>
          <Input name="contractEndDate" value={formData.contractEndDate} onChange={handleChange} />

          <Label>Early Termination Notice (days)</Label>
          <Input name="earlyTerminationDays" value={formData.earlyTerminationDays} onChange={handleChange} />

          <Label>Cure Period (days) for Defaults</Label>
          <Input name="curePeriodDays" value={formData.curePeriodDays} onChange={handleChange} />

          <Label>Mutual Obligations (optional)</Label>
          <Textarea name="servicesDescription" value={formData.servicesDescription} onChange={handleChange} />
        </>
      ),
      validate: () => Boolean(formData.contractEndDate && formData.earlyTerminationDays && formData.curePeriodDays),
    },
    {
      label: "Legal Clauses & Signatures",
      content: (
        <>
          <Label>Confidentiality Clause</Label>
          <Textarea name="confidentialityClause" value={formData.confidentialityClause} onChange={handleChange} />

          <Label>Insurance Note</Label>
          <Textarea name="insuranceNote" value={formData.insuranceNote} onChange={handleChange} />

          <Label>Indemnification Clause</Label>
          <Textarea name="indemnificationClause" value={formData.indemnificationClause} onChange={handleChange} />

          <Label>Arbitration Terms</Label>
          <Textarea name="arbitrationTerms" value={formData.arbitrationTerms} onChange={handleChange} />

          <Label>Attorneys' Fees Clause</Label>
          <Input name="attorneysFeesClause" value={formData.attorneysFeesClause} onChange={handleChange} />

          <Label>Limitation of Liability</Label>
          <Textarea name="limitationOfLiability" value={formData.limitationOfLiability} onChange={handleChange} />

          <Label>Governing Law / State</Label>
          <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

          <Label>Notices Address / Contact</Label>
          <Textarea name="noticesAddress" value={formData.noticesAddress} onChange={handleChange} />

          <hr />
          <h4 className="font-medium">Signatures</h4>
          <Label>Recipient - Signatory Name</Label>
          <Input name="signRecipientName" value={formData.signRecipientName} onChange={handleChange} />
          <Label>Recipient - Date</Label>
          <Input name="signRecipientDate" value={formData.signRecipientDate} onChange={handleChange} />

          <Label>Service Provider - Signatory Name</Label>
          <Input name="signProviderName" value={formData.signProviderName} onChange={handleChange} />
          <Label>Service Provider - Date</Label>
          <Input name="signProviderDate" value={formData.signProviderDate} onChange={handleChange} />
        </>
      ),
      validate: () => Boolean(formData.confidentialityClause && formData.insuranceNote && formData.indemnificationClause),
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <FormWizard
        steps={steps}
        onFinish={() => {
          generatePDF();
          alert("Form submitted!");
        }}
      />

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Administrative Services Contract PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
