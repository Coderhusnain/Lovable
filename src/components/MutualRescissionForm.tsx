import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement Basics",
    fields: [
      {
        name: "effectiveDate",
        label: "Effective date",
        type: "date",
        required: true,
      },
      {
        name: "originalContractDate",
        label: "Original contract date",
        type: "date",
        required: true,
      },
      {
        name: "governingLawState",
        label: "Governing law state",
        type: "text",
        required: true,
      },
    ],
  },
  {
    label: "Party Information",
    fields: [
      {
        name: "partyAName",
        label: "Party A name",
        type: "text",
        required: true,
      },
      {
        name: "partyAAddress",
        label: "Party A address",
        type: "text",
        required: true,
      },
      {
        name: "partyBName",
        label: "Party B name",
        type: "text",
        required: true,
      },
      {
        name: "partyBAddress",
        label: "Party B address",
        type: "text",
        required: true,
      },
      {
        name: "extraTerms",
        label: "Additional terms (optional)",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      {
        name: "partyATitle",
        label: "Party A title",
        type: "text",
        required: false,
      },
      {
        name: "partyASignDate",
        label: "Party A sign date",
        type: "date",
        required: true,
      },
      {
        name: "partyBTitle",
        label: "Party B title",
        type: "text",
        required: false,
      },
      {
        name: "partyBSignDate",
        label: "Party B sign date",
        type: "date",
        required: true,
      },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 18;
  const width = pageWidth - margin * 2;
  const lineHeight = 5.6;
  const bottomLimit = 280;
  let y = 20;

  const writeWrapped = (text: string, bold = false, gapAfter = 1.8) => {
    const lines = doc.splitTextToSize(text, width);
    const needed = lines.length * lineHeight + gapAfter;
    if (y + needed > bottomLimit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + gapAfter;
  };

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  const title = "MUTUAL RESCISSION AND RELEASE AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(pageWidth / 2 - tw / 2, y + 1.2, pageWidth / 2 + tw / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  writeWrapped(
    `This Mutual Rescission and Release Agreement ("Agreement") is made and entered into as of ${
      values.effectiveDate || "the ___ day of ________, 20__"
    } (the "Effective Date"), by and between:`
  );
  writeWrapped(`${values.partyAName || "____________________"}, of ${values.partyAAddress || "____________________"}, hereinafter referred to as "Party A";`);
  writeWrapped(`${values.partyBName || "____________________"}, of ${values.partyBAddress || "____________________"}, hereinafter referred to as "Party B";`);
  writeWrapped('Party A and Party B are hereinafter collectively referred to as the "Parties" and individually as a "Party."', false, 4);

  writeWrapped("RECITALS", true);
  writeWrapped(
    `WHEREAS, the Parties entered into that certain agreement dated ${values.originalContractDate || "__________"}, attached hereto as Exhibit A and incorporated herein by reference (the "Original Contract");`
  );
  writeWrapped("WHEREAS, the Parties acknowledge that neither Party has fully performed its obligations under the Original Contract;");
  writeWrapped(
    "WHEREAS, the Parties now mutually desire to rescind and terminate the Original Contract and to be released from any and all rights, obligations, and liabilities arising thereunder;"
  );
  writeWrapped(
    "NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, and intending to be legally bound, the Parties hereby agree as follows:",
    false,
    4
  );

  writeWrapped("AGREEMENT", true);
  writeWrapped(
    "1. Rescission of Original Contract. The Original Contract is hereby rescinded, terminated, and rendered null and void as of the Effective Date. The Parties shall have no further rights, obligations, or liabilities thereunder."
  );
  writeWrapped(
    "2. Mutual Release. Each Party, on behalf of itself and its successors, assigns, representatives, and affiliates, hereby fully and forever releases, discharges, and waives any and all claims, demands, causes of action, obligations, or liabilities of any kind, whether known or unknown, which have arisen or may arise out of or in connection with the Original Contract prior to the Effective Date."
  );
  writeWrapped(
    "3. No Admission of Liability. This Agreement constitutes a mutual compromise and settlement of disputed matters. Nothing herein shall be construed as an admission of liability or wrongdoing by either Party."
  );
  writeWrapped(
    "4. Confidentiality. The Parties agree to maintain the confidentiality of this Agreement, its terms, and the circumstances leading to its execution. Neither Party shall disclose such information to any third party, except (i) to legal, financial, or tax advisors bound by confidentiality obligations, (ii) as required by law or court order, or (iii) with the prior written consent of the other Party."
  );
  writeWrapped(
    "5. Survival of Certain Provisions. Notwithstanding the rescission of the Original Contract, any provisions of the Original Contract which by their nature are intended to survive termination (including, without limitation, provisions relating to confidentiality, non-disclosure, intellectual property, indemnification, or governing law) shall survive and remain in full force and effect in accordance with their terms."
  );
  writeWrapped(
    "6. Entire Agreement. This Agreement contains the entire understanding of the Parties with respect to the subject matter hereof and supersedes all prior negotiations, discussions, or agreements, whether oral or written, relating to such subject matter."
  );
  writeWrapped(
    `7. Governing Law. This Agreement shall be governed by and construed in accordance with the laws of the State of ${
      values.governingLawState || "__________"
    }, without regard to its conflict-of-laws rules.`
  );
  writeWrapped(
    "8. Counterparts. This Agreement may be executed in counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument. Signatures delivered electronically or by facsimile shall be deemed effective.",
    false,
    3
  );

  if (values.extraTerms) {
    writeWrapped("ADDITIONAL TERMS", true);
    writeWrapped(values.extraTerms, false, 3);
  }

  writeWrapped("SIGNATURES", true);
  writeWrapped("IN WITNESS WHEREOF, the Parties have executed this Mutual Rescission and Release Agreement as of the Effective Date.", false, 2);
  writeWrapped("________________________________________", false, 1);
  writeWrapped(`${values.partyAName || "[Name of Party A]"}`, false, 1);
  writeWrapped(`Title: ${values.partyATitle || "________________________"}`, false, 1);
  writeWrapped(`Date: ${values.partyASignDate || "________________________"}`, false, 3);
  writeWrapped("________________________________________", false, 1);
  writeWrapped(`${values.partyBName || "[Name of Party B]"}`, false, 1);
  writeWrapped(`Title: ${values.partyBTitle || "________________________"}`, false, 1);
  writeWrapped(`Date: ${values.partyBSignDate || "________________________"}`);

  doc.save("mutual_rescission.pdf");
};

export default function MutualRescission() {
  return (
    <FormWizard
      steps={steps}
      title="Mutual Rescission and Release Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="mutualrescission"
    />
  );
}
