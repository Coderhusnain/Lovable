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
        name: "underlyingContractDate",
        label: "Underlying contract date",
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
    label: "Parties and Consideration",
    fields: [
      {
        name: "partyAName",
        label: "Party A legal name",
        type: "text",
        required: true,
      },
      {
        name: "partyBName",
        label: "Party B legal name",
        type: "text",
        required: true,
      },
      {
        name: "consideration1Amount",
        label: "First consideration amount",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "consideration1From",
        label: "First payment from",
        type: "text",
        required: true,
      },
      {
        name: "consideration1To",
        label: "First payment to",
        type: "text",
        required: true,
      },
      {
        name: "consideration2Amount",
        label: "Second consideration amount",
        type: "text",
        required: true,
        placeholder: "$0.00",
      },
      {
        name: "consideration2From",
        label: "Second payment from",
        type: "text",
        required: true,
      },
      {
        name: "consideration2To",
        label: "Second payment to",
        type: "text",
        required: true,
      },
    ],
  },
  {
    label: "Execution and Notary",
    fields: [
      {
        name: "partyATitle",
        label: "Party A title",
        type: "text",
        required: false,
      },
      {
        name: "partyADate",
        label: "Party A signature date",
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
        name: "partyBDate",
        label: "Party B signature date",
        type: "date",
        required: true,
      },
      {
        name: "notaryState",
        label: "Notary state (optional)",
        type: "text",
        required: false,
      },
      {
        name: "notaryCounty",
        label: "Notary county (optional)",
        type: "text",
        required: false,
      },
      {
        name: "notaryAppearer",
        label: "Notary appearer name (optional)",
        type: "text",
        required: false,
      },
      {
        name: "notaryDate",
        label: "Notary acknowledgment date (optional)",
        type: "date",
        required: false,
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
  const title = "MUTUAL RELEASE AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const tw = doc.getTextWidth(title);
  doc.setLineWidth(0.35);
  doc.line(pageWidth / 2 - tw / 2, y + 1.2, pageWidth / 2 + tw / 2, y + 1.2);
  y += 9;
  doc.setFontSize(10.5);

  writeWrapped(
    `This Mutual Release Agreement (the "Agreement") is entered into as of ${values.agreementDate || "____________"}, by and between:`
  );
  writeWrapped(`- ${values.partyAName || "________________________"}, and`);
  writeWrapped(`- ${values.partyBName || "________________________"},`);
  writeWrapped('(each a "Party" and collectively, the "Parties").', false, 4);

  writeWrapped("Purpose", true);
  writeWrapped(
    "The purpose of this Agreement is to effect the full and final settlement of all disputes, obligations, and liabilities between the Parties, and to terminate any obligations owed by either Party to the other in connection with the matters described herein.",
    false,
    4
  );

  writeWrapped("Recitals", true);
  writeWrapped(
    `WHEREAS, disputes and differences have arisen between the Parties relating to that certain agreement dated ${values.underlyingContractDate || "____________"}, a copy of which is attached hereto as Exhibit A (the "Underlying Contract");`
  );
  writeWrapped(
    "WHEREAS, the Parties desire to fully and finally resolve said disputes and differences, without admission of liability, by executing this Mutual Release;"
  );
  writeWrapped(
    `WHEREAS, in consideration of this Mutual Release and additional consideration, including the payment of ${
      values.consideration1Amount || "$--------"
    } by ${values.consideration1From || "________________"} to ${
      values.consideration1To || "________________"
    }, receipt of which is hereby acknowledged, and the payment of ${
      values.consideration2Amount || "$------"
    } by ${values.consideration2From || "________________"} to ${
      values.consideration2To || "________________"
    }, receipt of which is hereby acknowledged, each Party wishes to release and discharge the other Party from all claims and liabilities arising from the Underlying Contract; and`
  );
  writeWrapped(
    "WHEREAS, the Parties desire to provide mutual releases, and in some instances indemnification, on the terms and conditions set forth herein."
  );
  writeWrapped(
    "NOW, THEREFORE, in consideration of the foregoing recitals, the payments acknowledged above, and the mutual covenants contained herein, the Parties agree as follows:",
    false,
    4
  );

  writeWrapped("1. Mutual Release", true);
  writeWrapped(
    `1.1 Release by [Party A]. [Party A] does hereby release, cancel, forgive, and forever discharge [Party B], together with its predecessors, parent corporations, holding companies, subsidiaries, affiliates, divisions, heirs, successors, and assigns, and all of their respective officers, directors, employees, and representatives, from any and all actions, claims, demands, damages, liabilities, obligations, controversies, and causes of action of every kind or nature whatsoever, whether known or unknown, suspected or unsuspected, which have arisen, may have arisen, or may hereafter arise out of or relating to the Underlying Contract, from the beginning of time through the date of this Agreement.`
  );
  writeWrapped(
    `1.2 Release by [Party B]. [Party B] does hereby release, cancel, forgive, and forever discharge [Party A], together with its subsidiaries, affiliates, divisions, heirs, successors, and assigns, in all capacities including as officers, directors, employees, representatives, agents, or shareholders, from any and all actions, claims, demands, damages, liabilities, obligations, controversies, and causes of action of every kind or nature whatsoever, whether known or unknown, suspected or unsuspected, which have arisen, may have arisen, or may hereafter arise out of or relating to the Underlying Contract, from the beginning of time through the date of this Agreement.`
  );
  writeWrapped(
    "1.3 Waiver of Unknown Claims. Each Party acknowledges that it has been advised of, and expressly waives, the provisions of any law which would otherwise limit the scope of this Release to matters known or suspected at the time of execution.",
    false,
    3
  );

  writeWrapped("2. Governing Law", true);
  writeWrapped(
    `This Agreement shall be governed by, and construed in accordance with, the laws of the State of ${
      values.governingLawState || "____________________"
    }.`,
    false,
    3
  );

  writeWrapped("3. Legal Construction", true);
  writeWrapped(
    "If any provision of this Agreement is held to be invalid, illegal, or unenforceable, such provision shall be deemed severed, and the remaining provisions shall remain valid and enforceable. This Agreement shall be construed as a whole and not as severable obligations.",
    false,
    3
  );

  writeWrapped("4. Attorneys' Fees", true);
  writeWrapped(
    "If any action or proceeding is brought to enforce or interpret the provisions of this Agreement, the prevailing Party shall be entitled to recover its reasonable attorneys' fees and costs, in addition to any other relief to which it may be entitled.",
    false,
    3
  );

  writeWrapped("5. Entire Agreement", true);
  writeWrapped(
    "This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof, and supersedes all prior negotiations, representations, or agreements, whether written or oral.",
    false,
    4
  );

  writeWrapped("Execution", true);
  writeWrapped(
    "IN WITNESS WHEREOF, the Parties hereto have executed this Mutual Release Agreement as of the date first written above.",
    false,
    2
  );

  writeWrapped("Party A", true, 1.2);
  writeWrapped("________________________________________", false, 1.2);
  writeWrapped(`Name: ${values.partyAName || "_______________________________"}`, false, 1.2);
  writeWrapped(`Title: ${values.partyATitle || "_______________________________"}`, false, 1.2);
  writeWrapped(`Date: ${values.partyADate || "_______________________________"}`, false, 3);

  writeWrapped("Party B", true, 1.2);
  writeWrapped("________________________________________", false, 1.2);
  writeWrapped(`Name: ${values.partyBName || "_______________________________"}`, false, 1.2);
  writeWrapped(`Title: ${values.partyBTitle || "_______________________________"}`, false, 1.2);
  writeWrapped(`Date: ${values.partyBDate || "_______________________________"}`, false, 3);

  if (values.notaryState || values.notaryCounty || values.notaryAppearer || values.notaryDate) {
    writeWrapped("[Optional Notary Acknowledgment]", true, 2);
    writeWrapped(`State of ${values.notaryState || "____________"} )`, false, 1);
    writeWrapped(`County of ${values.notaryCounty || "__________"} )`, false, 1);
    writeWrapped(
      `On this ${values.notaryDate || "___ day of __________, 20__"}, before me, the undersigned Notary Public, personally appeared ${
        values.notaryAppearer || "______________________"
      }, known to me (or satisfactorily proven) to be the person whose name is subscribed to this instrument, and acknowledged that he/she executed the same for the purposes therein contained.`
    );
    writeWrapped("IN WITNESS WHEREOF, I hereunto set my hand and official seal.");
    writeWrapped("Notary Public");
  }

  doc.save("mutual_release.pdf");
};

export default function MutualRelease() {
  return (
    <FormWizard
      steps={steps}
      title="Mutual Release Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="mutualrelease"
    />
  );
}