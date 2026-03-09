import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Agreement Basics",
    fields: [
      {
        name: "agreementDate",
        label: "Agreement date",
        type: "date",
        required: true,
      },
      {
        name: "relationshipDate",
        label: "Date the business relationship started",
        type: "date",
        required: true,
      },
      {
        name: "originalContractTitle",
        label: "Original business contract title",
        type: "text",
        required: true,
        placeholder: "Example: Master Service Agreement",
      },
    ],
  },
  {
    label: "Party Information",
    fields: [
      {
        name: "firstPartyName",
        label: "First Party legal name",
        type: "text",
        required: true,
      },
      {
        name: "secondPartyName",
        label: "Second Party legal name",
        type: "text",
        required: true,
      },
      {
        name: "secondPartyAddress",
        label: "Second Party address",
        type: "text",
        required: true,
        placeholder: "Street, city, state/province, zip",
      },
    ],
  },
  {
    label: "Arbitration Terms",
    fields: [
      {
        name: "arbitratorName",
        label: "Arbitrator name",
        type: "text",
        required: true,
      },
      {
        name: "arbitrationLocation",
        label: "Arbitration location",
        type: "text",
        required: true,
        placeholder: "City, State/Country",
      },
      {
        name: "additionalTerms",
        label: "Additional arbitration terms (optional)",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      {
        name: "firstPartyTitle",
        label: "First Party title",
        type: "text",
        required: false,
      },
      {
        name: "firstPartySignDate",
        label: "First Party signature date",
        type: "date",
        required: true,
      },
      {
        name: "secondPartyTitle",
        label: "Second Party title",
        type: "text",
        required: false,
      },
      {
        name: "secondPartySignDate",
        label: "Second Party signature date",
        type: "date",
        required: true,
      },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 18;
  const maxWidth = pageWidth - margin * 2;
  const lineHeight = 5.6;
  const bottomLimit = 280;
  let y = 20;
  const u = (value?: string, min = 20) => {
    const v = (value || "").trim();
    if (!v) return "_".repeat(min);
    return v;
  };

  const writeWrapped = (
    text: string,
    options?: { bold?: boolean; center?: boolean; indent?: number; gapAfter?: number }
  ) => {
    const indent = options?.indent ?? 0;
    const lines = doc.splitTextToSize(text, maxWidth - indent);
    const needed = lines.length * lineHeight + (options?.gapAfter ?? 0);
    if (y + needed > bottomLimit) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", options?.bold ? "bold" : "normal");
    if (options?.center) {
      doc.text(lines, pageWidth / 2, y, { align: "center" });
    } else {
      doc.text(lines, margin + indent, y);
    }
    y += lines.length * lineHeight + (options?.gapAfter ?? 0);
  };

  const sectionHeader = (title: string) => {
    writeWrapped(title, { bold: true, gapAfter: 1.5 });
  };

  const writeUnderlinedField = (label: string, value: string, options?: { indent?: number; gapAfter?: number }) => {
    const indent = options?.indent ?? 0;
    const gapAfter = options?.gapAfter ?? 1.2;
    const display = u(value);
    const x = margin + indent;
    const labelText = `${label}: `;
    const needed = lineHeight + gapAfter;
    if (y + needed > bottomLimit) {
      doc.addPage();
      y = 20;
    }

    doc.setFont("helvetica", "normal");
    doc.text(labelText, x, y);
    const labelWidth = doc.getTextWidth(labelText);
    const valueX = x + labelWidth;
    doc.text(display, valueX, y);
    const available = maxWidth - indent - labelWidth;
    const underlineWidth = Math.min(doc.getTextWidth(display), Math.max(20, available));
    doc.setLineWidth(0.2);
    doc.line(valueX, y + 1.1, valueX + underlineWidth, y + 1.1);
    y += lineHeight + gapAfter;
  };

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  const arbitrationTitle = "ARBITRATION AGREEMENT";
  const arbitrationTitleY = y;
  doc.text(arbitrationTitle, pageWidth / 2, arbitrationTitleY, { align: "center" });
  const arbitrationTitleWidth = doc.getTextWidth(arbitrationTitle);
  doc.setLineWidth(0.35);
  doc.line(
    pageWidth / 2 - arbitrationTitleWidth / 2,
    arbitrationTitleY + 1.2,
    pageWidth / 2 + arbitrationTitleWidth / 2,
    arbitrationTitleY + 1.2
  );
  y += 8;
  doc.setFontSize(10.5);

  writeWrapped(
    `This Arbitration Agreement (the "Agreement") is made and entered into on ${
      u(values.agreementDate, 14)
    }, by and between:`,
    { gapAfter: 1.5 }
  );
  writeWrapped(`- ${u(values.firstPartyName, 18)}, hereinafter referred to as the "First Party";`, {
    indent: 3,
  });
  writeWrapped(
    `- ${u(values.secondPartyName, 18)}, of ${
      u(values.secondPartyAddress, 22)
    }, hereinafter referred to as the "Second Party".`,
    { indent: 3, gapAfter: 5 }
  );

  sectionHeader("RECITALS");
  writeWrapped(
    `WHEREAS, the Parties entered into a business relationship on or about ${
      u(values.relationshipDate, 14)
    }, as defined in the original business contract titled "${
      u(values.originalContractTitle, 16)
    }", which is attached hereto and incorporated herein by reference;`
  );
  writeWrapped("WHEREAS, disputes and differences have arisen between the Parties under said business relationship;");
  writeWrapped(
    "WHEREAS, the Parties acknowledge that litigation in court is costly, time-consuming, and may not serve their mutual interests; and"
  );
  writeWrapped(
    `WHEREAS, the Parties have agreed to resolve such disputes through arbitration, and have appointed ${
      u(values.arbitratorName, 20)
    } as arbitrator.`,
    { gapAfter: 5 }
  );

  sectionHeader("AGREEMENT");
  writeWrapped(
    "NOW, THEREFORE, in consideration of the foregoing recitals, which are hereby incorporated into this Agreement, and the mutual covenants herein contained, the Parties agree as follows:",
    { gapAfter: 2 }
  );

  writeWrapped(
    "1. Submission to Arbitration - The Parties agree that any disputes, claims, or controversies arising out of or relating to the original business contract or this Agreement shall be resolved exclusively by binding arbitration, and the Parties hereby waive their right to pursue such matters through litigation in court."
  );
  writeWrapped(
    '2. Governing Arbitration Rules - All arbitration proceedings shall be conducted in accordance with the Commercial Arbitration Rules of the American Arbitration Association ("AAA"), which the Parties expressly agree to follow.'
  );
  writeWrapped(
    `3. Location of Arbitration - Arbitration shall take place in ${
      u(values.arbitrationLocation, 20)
    }, unless otherwise mutually agreed in writing by the Parties.`
  );
  writeWrapped(
    "4. Selection of Arbitrator - The arbitrator shall be mutually selected by the Parties in accordance with the AAA Commercial Arbitration Rules."
  );
  writeWrapped("5. Award and Enforcement");
  writeWrapped("(a) The arbitrator shall issue a written decision and award.", { indent: 4 });
  writeWrapped("(b) The award shall be final, binding, and enforceable upon the Parties.", { indent: 4 });
  writeWrapped("(c) Any such award may be confirmed and enforced in a court of competent jurisdiction.", {
    indent: 4,
  });
  writeWrapped(
    "6. Costs and Fees - Unless otherwise agreed, the costs of arbitration shall be borne as directed by the arbitrator in the final award.",
    { gapAfter: 5 }
  );

  if (values.additionalTerms) {
    sectionHeader("ADDITIONAL TERMS");
    writeWrapped(values.additionalTerms, { gapAfter: 5 });
  }

  sectionHeader("EXECUTION");
  writeWrapped(
    "IN WITNESS WHEREOF, the Parties hereto have executed this Arbitration Agreement as of the date first written above.",
    { gapAfter: 3 }
  );

  writeWrapped("First Party", { bold: true });
  writeWrapped("________________________________________");
  writeUnderlinedField("Name", values.firstPartyName);
  writeUnderlinedField("Title", values.firstPartyTitle);
  writeUnderlinedField("Date", values.firstPartySignDate, { gapAfter: 4 });

  writeWrapped("Second Party", { bold: true });
  writeWrapped("________________________________________");
  writeUnderlinedField("Name", values.secondPartyName);
  writeUnderlinedField("Title", values.secondPartyTitle);
  writeUnderlinedField("Date", values.secondPartySignDate);

  doc.save("arbitration_agreement.pdf");
};

export default function ArbitrationAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Arbitration Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="arbitrationagreement"
    />
  );
}