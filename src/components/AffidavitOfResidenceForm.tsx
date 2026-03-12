import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const countryOptions = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Other", label: "Other" },
];

const getStateOptions = (country?: string) => {
  if (country === "United States") {
    return [
      { value: "California", label: "California" },
      { value: "New York", label: "New York" },
      { value: "Texas", label: "Texas" },
      { value: "Florida", label: "Florida" },
      { value: "Other US State", label: "Other US State" },
    ];
  }
  if (country === "Canada") {
    return [
      { value: "Ontario", label: "Ontario" },
      { value: "Quebec", label: "Quebec" },
      { value: "British Columbia", label: "British Columbia" },
      { value: "Alberta", label: "Alberta" },
      { value: "Other Canadian Province", label: "Other Canadian Province" },
    ];
  }
  if (country === "United Kingdom") {
    return [
      { value: "England", label: "England" },
      { value: "Scotland", label: "Scotland" },
      { value: "Wales", label: "Wales" },
      { value: "Northern Ireland", label: "Northern Ireland" },
    ];
  }
  if (country === "Australia") {
    return [
      { value: "New South Wales", label: "New South Wales" },
      { value: "Victoria", label: "Victoria" },
      { value: "Queensland", label: "Queensland" },
      { value: "Western Australia", label: "Western Australia" },
      { value: "Other Australian State", label: "Other Australian State" },
    ];
  }
  if (country === "Pakistan") {
    return [
      { value: "Punjab", label: "Punjab" },
      { value: "Sindh", label: "Sindh" },
      { value: "Khyber Pakhtunkhwa", label: "Khyber Pakhtunkhwa" },
      { value: "Balochistan", label: "Balochistan" },
      { value: "Islamabad Capital Territory", label: "Islamabad Capital Territory" },
    ];
  }
  return [{ value: "Other State/Province/Region", label: "Other State/Province/Region" }];
};

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Affiant and Address",
    fields: [
      { name: "affiantName", label: "Affiant Name", type: "text", required: true },
      { name: "residenceAddress", label: "Residence Address", type: "textarea", required: true },
      { name: "residenceCity", label: "Residence City", type: "text", required: true },
    ],
  },
  {
    label: "Estate and Death Details",
    fields: [
      { name: "estateName", label: "Name in the estate of", type: "text", required: true },
      { name: "deathDate", label: "Date of death", type: "text", required: true },
      { name: "deathResidenceAddress", label: "Residence at time of death", type: "textarea", required: true },
      { name: "deathResidenceCity", label: "City at time of death", type: "text", required: true },
      { name: "deathResidenceCounty", label: "County at time of death", type: "text", required: true },
      { name: "deathResidenceState", label: "State at time of death", type: "text", required: true },
    ],
  },
  {
    label: "Perjury and Execution",
    fields: [
      { name: "applicableLaw", label: "Perjury law jurisdiction", type: "text", required: true },
      { name: "affidavitDate", label: "Date", type: "date", required: true },
    ],
  },
  {
    label: "State and Country",
    fields: [
      { name: "country", label: "Country", type: "select", required: true, options: countryOptions },
      {
        name: "state",
        label: "State / Province / Region",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => getStateOptions(values.country),
      },
    ],
  },
  {
    label: "Notary",
    fields: [
      { name: "notaryPublicName", label: "Notary Public", type: "text", required: true },
    ],
  },
  {
    label: "Make It Legal and Copies",
    fields: [
      { name: "makeItLegalSigner", label: "Signer name in Make It Legal line", type: "text", required: true },
      { name: "copiesNote", label: "Copies note (optional)", type: "textarea", required: false },
    ],
  },
  {
    label: "Additional Assistance",
    fields: [
      { name: "additionalAssistance", label: "Additional assistance note (optional)", type: "textarea", required: false },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = 210, m = 16, tw = w - m * 2, lh = 5.15, limit = 282;
  let y = 20;

  const u = (value?: string, n = 14) => (value || "").trim() || "_".repeat(n);
  const line = (value?: string, n = 16) => (value || "").trim() || "-".repeat(n);
  const ensure = (need = 8) => {
    if (y + need > limit) {
      doc.addPage();
      y = 20;
    }
  };
  const p = (text: string, bold = false, gap = 1.6) => {
    const lines = doc.splitTextToSize(text, tw);
    ensure(lines.length * lh + gap);
    doc.setFont("times", bold ? "bold" : "normal");
    doc.setFontSize(10.0);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };
  const centeredUnderlinedTitle = (text: string, size = 12.2, gap = 8.6) => {
    ensure(10);
    doc.setFont("times", "bold");
    doc.setFontSize(size);
    doc.text(text, w / 2, y, { align: "center" });
    const titleW = doc.getTextWidth(text);
    doc.line(w / 2 - titleW / 2, y + 1.1, w / 2 + titleW / 2, y + 1.1);
    y += gap;
  };

  centeredUnderlinedTitle("Affidavit of Residence", 12, 9);
  p(
    `I ${line(v.affiantName, 8)} being of lawful age and a resident at ${line(v.residenceAddress, 12)} in ${line(v.residenceCity, 12)} do on oath and under penalties of perjury, depose and say:`,
    false,
    1.35
  );
  p(
    `That I am a disinterested party in the estate of ${line(v.estateName, 14)} who died on ${line(v.deathDate, 12)}.`,
    false,
    1.35
  );
  p(
    `At the time of death ${line(v.estateName, 10)}'s legal residence was at ${line(v.deathResidenceAddress, 10)}, ${line(v.deathResidenceCity, 8)}, ${line(v.deathResidenceCounty, 4)} County and ${line(v.deathResidenceState, 8)} was a resident of state of ${line(v.deathResidenceState, 8)} for prior to death, and was not the resident of any other state at the time of death.`,
    false,
    1.35
  );
  p(
    `I certify under penalty of perjury under ${line(v.applicableLaw, 12)} law that I know the contents of this Affidavit signed by me and that the statements are true and correct.`,
    false,
    1.5
  );
  p("", false, 0.9);
  p("_____________________________", false, 0.7);
  p(`Date`, false, 0.9);
  p(`STATE OF ${line(v.state, 12)}, COUNTRY OF ${line(v.country, 18)}`, false, 0.9);
  p("                                           ______________________", false, 0.55);
  p("                                                     Notary Public", false, 1.2);

  doc.addPage();
  y = 30;
  centeredUnderlinedTitle("Make It Legal", 12, 7);
  p(`This Affidavit should be signed in front of a notary public by ${u(v.makeItLegalSigner)}.`);
  p("Once signed in front of a notary, this document should be delivered to the appropriate court for filing.");
  p("Copies", true);
  p("The original Affidavit should be filed with the Clerk of Court or delivered to the requesting business.");
  p("The Affiant should maintain a copy of the Affidavit. Your copy should be kept in a safe place.");
  p("If you signed a paper copy of your document, you can use Rocket Lawyer to store and share it. Safe and secure in your Rocket Lawyer File Manager, you can access it any time from any computer, as well as share it for future reference.");
  if ((v.copiesNote || "").trim()) p(v.copiesNote);
  p("Additional Assistance", true);
  p("If you are unsure or have questions regarding this Affidavit or need additional assistance with special situations or circumstances, use Legal Gram. Find A Lawyer search engine to find a lawyer in your area to assist you in this matter.");
  if ((v.additionalAssistance || "").trim()) p(v.additionalAssistance);

  doc.save("affidavit_of_residence.pdf");
};

export default function AffidavitOfResidence() {
  return (
    <FormWizard
      steps={steps}
      title="Affidavit Of Residence"
      subtitle="Complete all 7 steps to generate your document"
      onGenerate={generatePDF}
      documentType="affidavitofresidence"
      preserveStepLayout
    />
  );
}
