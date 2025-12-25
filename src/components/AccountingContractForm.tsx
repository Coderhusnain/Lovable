import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import { ArrowLeft, ArrowRight, Send, CheckCircle, Calendar as CalendarIcon, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface FormData {
  effectiveDate: string;
  accountantName: string;
  accountantLicenseState: string;
  accountantAddress: string;
  clientName: string;
  clientAddress: string;
  contractStartDate: string;
  servicesDescription: string;
  gaapNote: string;
  feesBillingTerms: string;
  invoicesDueDays: string;
  clientCooperation: string;
  representationsClient: string;
  representationsAccountant: string;
  confidentiality: string;
  terminationNoticeDays: string;
  terminationOther: string;
  noticesAddress: string;
  governingLaw: string;
  signAccountantName: string;
  signAccountantDate: string;
  signClientName: string;
  signClientDate: string;
}

export default function AccountingContractForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    effectiveDate: "",
    accountantName: "",
    accountantLicenseState: "",
    accountantAddress: "",
    clientName: "",
    clientAddress: "",
    contractStartDate: "",
    servicesDescription: "",
    gaapNote: "",
    feesBillingTerms: "",
    invoicesDueDays: "30",
    clientCooperation: "",
    representationsClient: "",
    representationsAccountant: "",
    confidentiality:
      "Any confidential information exchanged shall be held in trust and not divulged during the term or thereafter except as required by law.",
    terminationNoticeDays: "30",
    terminationOther: "",
    noticesAddress: "",
    governingLaw: "",
    signAccountantName: "",
    signAccountantDate: "",
    signClientName: "",
    signClientDate: "",
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

    write(doc, "ACCOUNTING CONTRACT", state, { size: 14, bold: true, center: true });
    write(doc, "\n", state);

    write(
      doc,
      `This CONTRACT is made and entered into on ${formData.effectiveDate || "___"} by and between, ${formData.accountantName ||
        "______"} (“Accountant”), duly licensed in the state of ${formData.accountantLicenseState || "_____"} as a certified public accountant, and having a principal place of business at ${formData.accountantAddress ||
        "_________"}, and ${formData.clientName || "______"} (“Client”), of ${formData.clientAddress || "_________"}.`,
      state
    );

    write(doc, "\nIn consideration of the mutual promises contained in this Contract, the contracting parties agree as follows:", state);

    write(doc, "\nI. CONTRACT TERM", state, { size: 12, bold: true });
    write(
      doc,
      `This Contract shall become effective on ${formData.contractStartDate || "____"}. It shall remain in effect until the services required hereunder have been completed satisfactorily by Accountant unless sooner terminated as provided in this Contract.`,
      state
    );

    write(doc, "\nII. ACCOUNTING SERVICES", state, { size: 12, bold: true });
    write(
      doc,
      `Under the terms and conditions stated in this Contract, the Accountant agrees to perform the following specific accounting services for the Client, together with any tasks reasonably incidental to such services and necessary to properly carry out the intent of this Contract:`,
      state
    );
    write(doc, formData.servicesDescription || "[Insert detailed services description]", state);
    write(
      doc,
      `The services described above shall be performed:\n1. In accordance with generally accepted accounting principles (GAAP) or other applicable professional standards;${formData.gaapNote ? ` ${formData.gaapNote}` : ""}\n2. With due professional care, skill, and diligence ordinarily exercised by certified public accountants;\n3. Within the timeframes reasonably required by the Client to support its business operations; and\n4. Using information provided by the Client, which the Accountant shall rely upon as accurate and complete unless otherwise specifically stated in writing.`,
      state
    );
    write(
      doc,
      "The Accountant shall not be obligated to perform additional services beyond those listed above unless mutually agreed upon in writing by both parties. Any such additional services shall be subject to the fee structure described in Section III of this Contract.",
      state
    );

    write(doc, "\nIII. FEES FOR SERVICES", state, { size: 12, bold: true });
    write(
      doc,
      `In consideration of the services to be performed by the Accountant, the Client agrees to compensate the Accountant for all services rendered as follows:`,
      state
    );
    write(doc, formData.feesBillingTerms || "[Insert fee/billing terms here]", state);
    write(
      doc,
      `Invoices shall be due and payable within ${formData.invoicesDueDays || "30"} days of receipt. The Client agrees to make timely payment for all services rendered and acknowledges that failure to do so may constitute a breach of this Contract and may subject the Client to late charges or suspension of services as permitted under applicable law.`,
      state
    );

    write(doc, "\nIV. CLIENT’S COOPERATION", state, { size: 12, bold: true });
    write(
      doc,
      `The Accountant is hereby authorized to communicate with the Client’s custodian regarding the Client’s account and other relevant financial data. The Client takes sole responsibility for the acts or omissions of its custodian and will have by the effective date of this Contract instructed its custodian, and will instruct any future custodian of the Client to provide the Accountant with custodian’s reports and other information of the Client that the Accountant requires to perform its Services. The Client will provide the Accountant with true and complete information necessary for the Accountant to perform its services. The timely performance of the Services will depend on the timely receipt of complete Client data.`,
      state
    );
    if (formData.clientCooperation) write(doc, `\n${formData.clientCooperation}`, state);

    write(doc, "\nV. MUTUAL REPRESENTATIONS", state, { size: 12, bold: true });
    write(doc, "(a) Representations by the Client:", state);
    write(doc, formData.representationsClient || "[Client representations as agreed]", state);
    write(doc, "\n(b) Representations by the Accountant:", state);
    write(doc, formData.representationsAccountant || "[Accountant representations as agreed]", state);

    write(doc, "\nVI. CONFIDENTIALITY", state, { size: 12, bold: true });
    write(doc, formData.confidentiality || "Any confidential information exchanged shall be held in trust and not divulged.", state);

    write(doc, "\nVII. TERMINATION", state, { size: 12, bold: true });
    write(doc, `(a) This Contract may be terminated by either party by giving ${formData.terminationNoticeDays || "30"} days advance written notice to the other party.`, state);
    write(doc, `(b) Either party has the right to terminate this Contract where the other party becomes insolvent, fails to pay its bills when due, goes out of business, or there is a death of a party.`, state);
    write(
      doc,
      `(c) If either party breaches any provision of this Contract and if such breach is not cured within thirty (30) days after receiving written notice from the other party specifying such breach in reasonable detail, the non-breaching party shall have the right to terminate this Contract by giving written notice thereof to the party in breach, which termination shall go into effect immediately upon receipt.`,
      state
    );
    if (formData.terminationOther) write(doc, `\n${formData.terminationOther}`, state);

    write(doc, "\nVIII. NOTICES", state, { size: 12, bold: true });
    write(
      doc,
      `Any notices to be given under this Contract by either party to the other may be effected either by personal delivery in writing or by mail, registered or certified, postage prepaid with return receipt requested. Mailed notices shall be addressed to the addresses of the parties as they appear in the introductory paragraph of this Contract, but each party may change the address by written notice in accordance with this paragraph.`,
      state
    );
    if (formData.noticesAddress) write(doc, `\nNotices Address / Contact: ${formData.noticesAddress}`, state);

    write(doc, "\nIX. MISCELLANEOUS", state, { size: 12, bold: true });
    write(
      doc,
      `(a) Independent Legal Advice. Each party acknowledges that it has had the opportunity to seek independent legal counsel prior to entering into this Contract and that it fully understands the terms, conditions, rights, and obligations contained herein.`,
      state
    );
    write(doc, "(b) No Third-Party Beneficiaries. This Contract is entered into solely for the benefit of the Accountant and the Client.", state);
    write(doc, "(c) Execution in Counterparts. This Contract may be executed in any number of counterparts.", state);
    write(doc, "(d) Headings. The section and paragraph headings are for convenience only.", state);
    write(doc, "(e) Non-Exclusivity. Nothing prevents either party from entering into similar agreements, provided obligations are not interfered with.", state);
    write(doc, "(f) Further Assurances. Each party agrees to perform all further acts and execute documents reasonably necessary.", state);
    write(doc, "(g) Time of the Essence. Time is of the essence with respect to all obligations.", state);
    write(doc, "(h) Survival. Obligations that extend beyond termination (confidentiality, indemnification, payment) shall survive.", state);

    write(doc, "\nX. GOVERNING LAW", state, { size: 12, bold: true });
    write(doc, `This Contract shall be construed under and in accordance with the laws of ${formData.governingLaw || "______"}.`, state);

    write(doc, "\nXI. PARTIES BOUND", state, { size: 12, bold: true });
    write(doc, "This Contract shall be binding on and inure to the benefit of the parties and their heirs, executors, administrators, legal representatives, successors and assigns as permitted.", state);

    write(doc, "\nXII. SEVERABILITY", state, { size: 12, bold: true });
    write(doc, "If one or more provisions are held invalid, the remainder shall continue in full force and effect.", state);

    write(doc, "\nXIII. PRIOR CONTRACTS SUPERSEDED", state, { size: 12, bold: true });
    write(doc, "This Contract constitutes the sole and only agreement of the parties and supersedes prior understandings.", state);

    write(doc, "\nXIV. ENTIRE AGREEMENT", state, { size: 12, bold: true });
    write(doc, "This instrument contains the entire agreement between the parties. Amendments must be written and signed.", state);

    write(doc, "\nXV. ATTORNEYS’ FEES", state, { size: 12, bold: true });
    write(doc, "The prevailing party in enforcement or interpretation actions shall be entitled to reasonable attorneys’ fees.", state);

    write(doc, "\nXVI. SIGNATORIES", state, { size: 12, bold: true });
    write(doc, `This Contract shall be signed by ${formData.signAccountantName || "_______"} and by ${formData.signClientName || "_______"}.`, state);
    write(doc, "\n\nAccountant:", state);
    write(doc, `${formData.accountantName || "[Accountant]"}\nSignature: ______________________\nDate: ${formData.signAccountantDate || "________"}`, state);
    write(doc, "\n\nClient:", state);
    write(doc, `${formData.clientName || "[Client]"}\nSignature: ______________________\nDate: ${formData.signClientDate || "________"}`, state);

    doc.save("Accounting_Contract.pdf");
    setPdfGenerated(true);
  };

  const renderStep = () => {

    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
            <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/accounting-contract-info')}
              className="text-orange-600 border-orange-200  hover:border-orange-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              Learn More About Accounting Contracts
            </Button>
          </div>
              <h3 className="font-semibold">Parties & Term</h3>
              <Label>Effective Date</Label>
              <Input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Accountant</h4>
              <Label>Name</Label>
              <Input name="accountantName" value={formData.accountantName} onChange={handleChange} />
              <Label>License State</Label>
              <Input name="accountantLicenseState" value={formData.accountantLicenseState} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="accountantAddress" value={formData.accountantAddress} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Client</h4>
              <Label>Name</Label>
              <Input name="clientName" value={formData.clientName} onChange={handleChange} />
              <Label>Address</Label>
              <Textarea name="clientAddress" value={formData.clientAddress} onChange={handleChange} />

              <Label>Contract Start Date</Label>
              <Input name="contractStartDate" value={formData.contractStartDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Services & Fees</h3>
              <Label>Services Description</Label>
              <Textarea name="servicesDescription" value={formData.servicesDescription} onChange={handleChange} />

              <Label>GAAP / Standards Note (optional)</Label>
              <Input name="gaapNote" value={formData.gaapNote} onChange={handleChange} />

              <Label>Fees & Billing Terms</Label>
              <Textarea name="feesBillingTerms" value={formData.feesBillingTerms} onChange={handleChange} />

              <Label>Invoices Due (days)</Label>
              <Input name="invoicesDueDays" value={formData.invoicesDueDays} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Cooperation & Confidentiality</h3>
              <Label>Client Cooperation / Custodian Access</Label>
              <Textarea name="clientCooperation" value={formData.clientCooperation} onChange={handleChange} />

              <Label>Representations by Client</Label>
              <Textarea name="representationsClient" value={formData.representationsClient} onChange={handleChange} />

              <Label>Representations by Accountant</Label>
              <Textarea name="representationsAccountant" value={formData.representationsAccountant} onChange={handleChange} />

              <Label>Confidentiality Clause</Label>
              <Textarea name="confidentiality" value={formData.confidentiality} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Termination, Notices & Signatures</h3>
              <Label>Termination Notice (days)</Label>
              <Input name="terminationNoticeDays" value={formData.terminationNoticeDays} onChange={handleChange} />
              <Label>Other Termination Conditions (optional)</Label>
              <Textarea name="terminationOther" value={formData.terminationOther} onChange={handleChange} />

              <Label>Notices Address / Contact</Label>
              <Textarea name="noticesAddress" value={formData.noticesAddress} onChange={handleChange} />

              <Label>Governing Law / State</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />

              <hr />
              <h4 className="font-medium">Signatures</h4>
              <Label>Accountant - Signatory Name</Label>
              <Input name="signAccountantName" value={formData.signAccountantName} onChange={handleChange} />
              <Label>Accountant - Date</Label>
              <Input name="signAccountantDate" value={formData.signAccountantDate} onChange={handleChange} />

              <Label>Client - Signatory Name</Label>
              <Input name="signClientName" value={formData.signClientName} onChange={handleChange} />
              <Label>Client - Date</Label>
              <Input name="signClientDate" value={formData.signClientDate} onChange={handleChange} />
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
        {step < 4 ? (
          <Button onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Accounting Contract PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
