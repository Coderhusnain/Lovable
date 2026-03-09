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
        name: "relationshipDate",
        label: "Business relationship start date",
        type: "date",
        required: true,
      },
      {
        name: "originalContractTitle",
        label: "Original contract title",
        type: "text",
        required: true,
        placeholder: "Example: Service Contract",
      },
      {
        name: "governingLaw",
        label: "Governing law jurisdiction",
        type: "text",
        required: true,
        placeholder: "Example: State of California, USA",
      },
      {
        name: "enforcementCourt",
        label: "Court jurisdiction for enforcement",
        type: "text",
        required: true,
        placeholder: "Example: Los Angeles County, California, USA",
      },
    ],
  },
  {
    label: "Party Information",
    fields: [
      {
        name: "partyAName",
        label: "Party A legal name",
        type: "text",
        required: true,
      },
      {
        name: "partyAAddress",
        label: "Party A address",
        type: "text",
        required: true,
        placeholder: "Street, city, state/province, zip",
      },
      {
        name: "partyBName",
        label: "Party B legal name",
        type: "text",
        required: true,
      },
      {
        name: "partyBAddress",
        label: "Party B address",
        type: "text",
        required: true,
        placeholder: "Street, city, state/province, zip",
      },
    ],
  },
  {
    label: "Mediator and Process",
    fields: [
      {
        name: "mediatorName",
        label: "Mediator name",
        type: "text",
        required: true,
      },
      {
        name: "mediationPlace",
        label: "Mediation place (city/state/country)",
        type: "text",
        required: true,
      },
      {
        name: "extraTerms",
        label: "Additional mediation terms (optional)",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      {
        name: "partyASignDate",
        label: "Party A signature date",
        type: "date",
        required: true,
      },
      {
        name: "partyBSignDate",
        label: "Party B signature date",
        type: "date",
        required: true,
      },
      {
        name: "mediatorSignDate",
        label: "Mediator signature date",
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
  const maxWidth = pageWidth - margin * 2;
  const lineHeight = 5.6;
  const bottomLimit = 280;
  let y = 20;

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
    const display = value || "____________________";
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
  const mediationTitle = "MEDIATION AGREEMENT";
  const mediationTitleY = y;
  doc.text(mediationTitle, pageWidth / 2, mediationTitleY, { align: "center" });
  const mediationTitleWidth = doc.getTextWidth(mediationTitle);
  doc.setLineWidth(0.35);
  doc.line(
    pageWidth / 2 - mediationTitleWidth / 2,
    mediationTitleY + 1.2,
    pageWidth / 2 + mediationTitleWidth / 2,
    mediationTitleY + 1.2
  );
  y += 8;
  doc.setFontSize(10.5);

  writeWrapped(
    `This Mediation Agreement (the "Agreement") is made and entered into on ${
      values.effectiveDate || "___ day of ________, ______"
    } (the "Effective Date"), by and between:`,
    { gapAfter: 1.5 }
  );
  writeWrapped(`${values.partyAName || "____________________"}, of ${values.partyAAddress || "____________________"},`, {
    indent: 3,
  });
  writeWrapped(`${values.partyBName || "____________________"}, of ${values.partyBAddress || "____________________"},`, {
    indent: 3,
  });
  writeWrapped('hereinafter collectively referred to as the "Parties" and individually as a "Party".', {
    indent: 3,
    gapAfter: 5,
  });

  sectionHeader("RECITALS");
  writeWrapped(
    `WHEREAS, the Parties entered into a business relationship commencing on ${
      values.relationshipDate || "__________"
    }, pursuant to the terms of that certain contract titled ${
      values.originalContractTitle || "____________________"
    } (the "Original Contract"), attached hereto as Exhibit A and incorporated herein by reference;`
  );
  writeWrapped("WHEREAS, disputes and differences have arisen between the Parties regarding the Original Contract;");
  writeWrapped(
    "WHEREAS, the Parties recognize that litigation before a court of law is time-consuming, costly, and adversarial in nature; and"
  );
  writeWrapped(
    `WHEREAS, the Parties have mutually appointed ${
      values.mediatorName || "__________________"
    } as their mediator (the "Mediator"), who has accepted the appointment subject to disclosure of any actual or potential conflicts of interest.`,
    { gapAfter: 5 }
  );

  writeWrapped(
    "NOW, THEREFORE, in consideration of the foregoing recitals and the mutual covenants contained herein, the Parties agree as follows:",
    { gapAfter: 3 }
  );

  sectionHeader("I. DUTIES OF THE MEDIATOR");
  writeWrapped(
    "1. Self-Determination of the Parties - The Mediator shall conduct the mediation in accordance with the principle of party self-determination, whereby any settlement shall result from the voluntary, uncoerced, and informed decision of the Parties."
  );
  writeWrapped(
    "2. Ex-Parte Communications - The Mediator may, in their discretion, conduct private meetings or engage in separate communications with either Party and/or their representatives before, during, or after scheduled mediation sessions."
  );
  writeWrapped(
    "3. Exchange of Information - The Parties shall exchange all documents reasonably necessary for consideration of the dispute. The Mediator may request the submission of memoranda or additional information. Any materials intended to remain confidential may be submitted solely to the Mediator."
  );
  writeWrapped(
    "4. Facilitation Role Only - The Mediator has no authority to impose or issue a settlement. The Mediator's role is limited to facilitating discussion and encouraging a mutually satisfactory resolution."
  );
  writeWrapped(
    "5. No Decision-Making Authority - The Mediator shall not serve as an arbitrator, adjudicator, or decision-maker and shall not provide legal representation to either Party."
  );
  writeWrapped(
    "6. Continuing Efforts - If a full settlement is not reached during the mediation conference, the Mediator may continue to communicate with the Parties in an effort to facilitate resolution."
  );
  writeWrapped(
    `7. Scheduling - The Mediator shall determine the date, time, and place of mediation sessions (initial location: ${
      values.mediationPlace || "__________________"
    }), and the Parties shall cooperate in good faith by attending as scheduled.`
  );
  writeWrapped(
    "8. Submission of Statements and Evidence - The Mediator may direct the Parties to submit statements of claim, legal submissions, defenses, and supporting documents."
  );
  writeWrapped(
    "9. Representation - Each Party may appear with legal counsel duly authorized to negotiate and conclude a settlement. Any Party may elect to appear pro se (without representation)."
  );
  writeWrapped(
    "10. Confidentiality of Proceedings - Mediation sessions and related communications shall be private and confidential. Attendance shall be limited to the Parties and their representatives, unless otherwise agreed by the Parties and approved by the Mediator.",
    { gapAfter: 3 }
  );

  sectionHeader("II. CONFIDENTIALITY AND PRIVILEGE");
  writeWrapped(
    "1. Confidential Nature of Mediation - All oral and written communications made in the course of the mediation, including offers, admissions, statements, proposals, and documents exchanged, shall be strictly confidential."
  );
  writeWrapped(
    "2. Inadmissibility in Subsequent Proceedings - No mediation communications, whether oral or written, shall be admissible in any subsequent litigation, arbitration, or administrative proceeding, except to the extent necessary to enforce a settlement agreement reached as a result of the mediation."
  );
  writeWrapped(
    "3. Mediator's Protection - The Mediator shall not be called as a witness in any judicial, arbitral, or administrative proceeding relating to the subject matter of the mediation. The Mediator shall have immunity from any subpoena or discovery process relating to the mediation."
  );
  writeWrapped("4. Exceptions - Confidentiality shall not apply to:");
  writeWrapped("(i) communications necessary to prove the existence, validity, or terms of a settlement agreement reached in mediation;", {
    indent: 4,
  });
  writeWrapped("(ii) disclosures required by law, regulation, or court order; or", { indent: 4 });
  writeWrapped("(iii) information independently available to a Party outside the mediation process.", {
    indent: 4,
    gapAfter: 3,
  });

  sectionHeader("III. TERMINATION");
  writeWrapped("The mediation shall be deemed terminated upon the earliest occurrence of any of the following:");
  writeWrapped("(i) the execution of a written settlement agreement by the Parties;", { indent: 4 });
  writeWrapped("(ii) a declaration by the Mediator, in writing or verbally, that further mediation efforts would not be productive;", {
    indent: 4,
  });
  writeWrapped("(iii) a declaration by all Parties, in writing or verbally, that the mediation proceedings are terminated; or", {
    indent: 4,
  });
  writeWrapped(
    "(iv) a period of twenty-one (21) consecutive days following the conclusion of the last mediation session during which there has been no communication between the Mediator and any Party or Party's representative.",
    { indent: 4, gapAfter: 3 }
  );

  sectionHeader("IV. COSTS AND EXPENSES");
  writeWrapped(
    "1. Each Party shall bear its own costs and expenses in connection with the mediation, unless otherwise mutually agreed in writing."
  );
  writeWrapped(
    "2. The expenses of any additional participants requested by a Party shall be borne solely by the requesting Party.",
    { gapAfter: 3 }
  );

  sectionHeader("V. GOVERNING LAW AND JURISDICTION");
  writeWrapped(
    `1. This Agreement shall be governed by, and construed in accordance with, the laws of ${
      values.governingLaw || "[insert jurisdiction]"
    }, without regard to its conflict of law principles.`
  );
  writeWrapped(
    `2. The Parties agree that any legal action seeking to enforce the terms of this Agreement, or any settlement reached pursuant to it, shall be brought exclusively before the courts of ${
      values.enforcementCourt || "[insert jurisdiction/city/country]"
    }, which shall have subject-matter jurisdiction and personal jurisdiction over the Parties.`,
    { gapAfter: 3 }
  );

  if (values.extraTerms) {
    sectionHeader("ADDITIONAL TERMS");
    writeWrapped(values.extraTerms, { gapAfter: 3 });
  }

  sectionHeader("SIGNATURES");
  writeWrapped("IN WITNESS WHEREOF, the Parties have executed this Mediation Agreement as of the Effective Date.", {
    gapAfter: 3,
  });
  writeWrapped("________________________________________");
  writeUnderlinedField("Name", values.partyAName || "[Name of Party A]");
  writeUnderlinedField("Date", values.partyASignDate, { gapAfter: 3 });

  writeWrapped("________________________________________");
  writeUnderlinedField("Name", values.partyBName || "[Name of Party B]");
  writeUnderlinedField("Date", values.partyBSignDate, { gapAfter: 3 });

  writeWrapped("________________________________________");
  writeUnderlinedField("Name", values.mediatorName || "[Name of Mediator]");
  writeUnderlinedField("Date", values.mediatorSignDate);

  doc.save("mediation_agreement.pdf");
};

export default function MediationAgreement() {
  return (
    <FormWizard
      steps={steps}
      title="Mediation Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="mediationagreement"
    />
  );
}