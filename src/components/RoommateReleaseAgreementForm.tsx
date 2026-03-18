import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Country",
        type: "select",
        required: true,
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "other", label: "Other" },
        ],
      },
      { name: "state",  label: "State/Province", type: "text", required: true, placeholder: "State or province" },
      { name: "city",   label: "City",           type: "text", required: true, placeholder: "City" },
      { name: "county", label: "County",         type: "text", required: true, placeholder: "County name" },
    ],
  },
  {
    label: "Roommates & Premises",
    fields: [
      { name: "effectiveDate",       label: "Effective Date",                          type: "date",     required: true  },
      { name: "releasingRoommate",   label: "Releasing Roommate Full Legal Name",      type: "text",     required: true  },
      { name: "remainingRoommates",  label: "Remaining Roommate(s) Full Legal Name(s)",type: "textarea", required: true, placeholder: "List all remaining roommates" },
      { name: "premisesAddress",     label: "Premises Street Address",                 type: "text",     required: true, placeholder: "123 Main St" },
      { name: "premisesCity",        label: "Premises City",                           type: "text",     required: true, placeholder: "City" },
      { name: "premisesState",       label: "Premises State",                          type: "text",     required: true, placeholder: "State" },
      { name: "premisesZip",         label: "Premises ZIP Code",                       type: "text",     required: true, placeholder: "ZIP" },
      { name: "leaseDate",           label: "Original Lease Date",                     type: "date",     required: true  },
      { name: "vacateDate",          label: "Date Releasing Roommate Will Vacate",     type: "date",     required: true  },
    ],
  },
  {
    label: "Security Deposit",
    fields: [
      {
        name: "securityDepositAssignment",
        label: "Security Deposit Assignment Terms",
        type: "textarea",
        required: true,
        placeholder: "Describe how deposit rights are assigned to remaining roommates",
      },
    ],
  },
  {
    label: "Landlord Consent",
    fields: [
      {
        name: "landlordConsent",
        label: "Does the Landlord consent to this release?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes — Landlord consents" },
          { value: "no",  label: "No — Consent not yet obtained" },
        ],
      },
      { name: "landlordName", label: "Landlord Name (optional)", type: "text", required: false, placeholder: "Landlord full name or company" },
    ],
  },
  {
    label: "Obligations & Release Scope",
    fields: [
      {
        name: "obligationAssumption",
        label: "Summary of obligations assumed by Remaining Roommates",
        type: "textarea",
        required: true,
        placeholder: "e.g. rent, utilities, and all charges under the Lease",
      },
      {
        name: "releaseScope",
        label: "Summary of liabilities released for the Releasing Roommate",
        type: "textarea",
        required: true,
        placeholder: "e.g. all obligations arising on or after the Effective Date",
      },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "releasingSignature", label: "Releasing Roommate Signature (type full legal name)", type: "text", required: true },
      { name: "releasingSignDate",  label: "Releasing Roommate Signature Date",                   type: "date", required: true },
      { name: "remainingSignature", label: "Remaining Roommate Signature (type full legal name)", type: "text", required: true },
      { name: "remainingSignDate",  label: "Remaining Roommate Signature Date",                   type: "date", required: true },
    ],
  },
  {
    label: "Final Check",
    fields: [
      {
        name: "leaseAttached",
        label: "Is a copy of the Lease attached to this Agreement?",
        type: "select",
        required: true,
        options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }],
      },
      {
        name: "finalConfirm",
        label: "Confirm this release is complete and accurate",
        type: "select",
        required: true,
        options: [{ value: "yes", label: "Yes — confirmed" }, { value: "no", label: "No" }],
      },
    ],
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────

function boldHeading(doc: jsPDF, text: string, x: number, y: number): void {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(text, x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
}

function wrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function bulletItem(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  doc.text("\u2022", x, y);
  const lines = doc.splitTextToSize(text, maxWidth - 6);
  doc.text(lines, x + 6, y);
  return y + lines.length * lineHeight;
}

function checkPageBreak(doc: jsPDF, y: number, needed = 20): number {
  if (y + needed > 275) {
    doc.addPage();
    return 20;
  }
  return y;
}

// ── PDF generator ─────────────────────────────────────────────────────────────

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const LM = 20;
  const PW = 170;
  const LH = 5.5;
  let y = 22;

  // ── TITLE ─────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("ROOMMATE RELEASE AGREEMENT", 105, y, { align: "center" });
  const titleW = doc.getTextWidth("ROOMMATE RELEASE AGREEMENT");
  doc.setLineWidth(0.4);
  doc.line(105 - titleW / 2, y + 1.2, 105 + titleW / 2, y + 1.2);
  y += 12;

  // ── PREAMBLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const fullPremises = [
    values.premisesAddress,
    values.premisesCity,
    values.premisesState,
    values.premisesZip,
  ]
    .filter(Boolean)
    .join(", ") || "[Insert Premises Address]";

  y = wrappedText(
    doc,
    `This Roommate Release Agreement (the "Agreement") is made and entered into on ` +
    `${values.effectiveDate || "[Insert Date]"} (the "Effective Date"), by and between ` +
    `${values.releasingRoommate || "[Insert Releasing Roommate Name]"} (the "Releasing Roommate") ` +
    `and ${values.remainingRoommates || "[Insert Remaining Roommate(s)"} (collectively, the ` +
    `"Remaining Roommates"). The Releasing Roommate and the Remaining Roommates are hereinafter ` +
    `collectively referred to as the "Roommates."`,
    LM, y, PW, LH
  );
  y += 7;

  // ── RECITALS ──────────────────────────────────────────────────────────────
  boldHeading(doc, "RECITALS", LM, y);
  y += LH + 2;

  const recitals = [
    `WHEREAS, the Roommates are co-tenants of the residential premises located at ${fullPremises} (the "Premises");`,
    `WHEREAS, the Roommates entered into a lease agreement dated ${values.leaseDate || "[Insert Date]"} (the "Lease"), a copy of which is attached hereto;`,
    `WHEREAS, the Releasing Roommate desires to withdraw from the Lease and be fully released from all rights, duties, liabilities, and obligations arising thereunder; and`,
    `WHEREAS, the Remaining Roommates have agreed to assume full responsibility for all obligations and liabilities under the Lease for the remainder of the Lease term.`,
    `NOW, THEREFORE, in consideration of the foregoing recitals, which are incorporated herein by reference, and the mutual covenants and agreements contained herein, the Roommates agree as follows:`,
  ];
  for (const r of recitals) {
    y = checkPageBreak(doc, y);
    y = wrappedText(doc, r, LM, y, PW, LH);
    y += 3;
  }
  y += 5;

  // ── SECTION 1: VACATING OF PREMISES ──────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "1.  VACATING OF PREMISES", LM, y);
  y += LH + 1;

  const vacateBullets = [
    `The Releasing Roommate shall vacate and relinquish possession of the Premises on ${values.vacateDate || "[Insert Vacate Date]"}.`,
    `The Releasing Roommate hereby assigns and transfers all possessory rights in the Premises to the Remaining Roommates upon vacation.`,
  ];
  for (const b of vacateBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── SECTION 2: ASSUMPTION OF OBLIGATIONS ─────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "2.  ASSUMPTION OF OBLIGATIONS", LM, y);
  y += LH + 1;

  const assumptionBullets = [
    `Effective as of the Effective Date, the Remaining Roommates shall assume and be solely responsible for the full and timely performance of all covenants, obligations, and liabilities arising under the Lease for the remainder of the Lease term.`,
    `Such obligations include, without limitation: ${values.obligationAssumption || "payment of rent, utilities, and any other charges due under the Lease"}.`,
  ];
  for (const b of assumptionBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── SECTION 3: RELEASE OF RELEASING ROOMMATE ─────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "3.  RELEASE OF RELEASING ROOMMATE", LM, y);
  y += LH + 1;

  const releaseBullets = [
    `The Releasing Roommate shall be fully and irrevocably released from any and all obligations, liabilities, claims, and responsibilities under the Lease accruing on or after the Effective Date.`,
    `Released liabilities include, without limitation: ${values.releaseScope || "liability for rent, damages, or destruction to the Premises"}.`,
  ];
  for (const b of releaseBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── SECTION 4: SECURITY DEPOSIT ──────────────────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "4.  SECURITY DEPOSIT", LM, y);
  y += LH + 1;

  const depositBullets = [
    `The Releasing Roommate hereby assigns and transfers all rights, title, and interest in and to any security deposit paid in connection with the Lease to the Remaining Roommates.`,
    `Any entitlement to the return of such security deposit at the termination of the Lease shall be determined solely between the Remaining Roommates and the Landlord.`,
    values.securityDepositAssignment
      ? `Additional deposit terms: ${values.securityDepositAssignment}`
      : null,
  ].filter(Boolean) as string[];

  for (const b of depositBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 5;

  // ── SECTION 5: LANDLORD'S CONSENT AND RELEASE ────────────────────────────
  y = checkPageBreak(doc, y);
  boldHeading(doc, "5.  LANDLORD'S CONSENT AND RELEASE", LM, y);
  y += LH + 1;

  const consentStatus =
    values.landlordConsent === "yes"
      ? `The Landlord${values.landlordName ? ` (${values.landlordName})` : ""} hereby consents to this Agreement`
      : `Landlord consent has not yet been obtained${values.landlordName ? ` from ${values.landlordName}` : ""}`;

  const consentBullets = [
    `${consentStatus} and agrees to release the Releasing Roommate from any and all obligations and liabilities under the Lease arising on or after the Effective Date of this Agreement.`,
    `This release by the Landlord is expressly conditioned upon the Remaining Roommates assuming full responsibility for all obligations under the Lease as set forth in Section 2 above.`,
    `Lease copy attached to this Agreement: ${values.leaseAttached === "yes" ? "Yes" : "Pending"}.`,
  ];
  for (const b of consentBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 7;

  // ── SIGNATURE BLOCK ───────────────────────────────────────────────────────
  y = checkPageBreak(doc, y, 60);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  y = wrappedText(
    doc,
    `IN WITNESS WHEREOF, the Roommates have executed this Agreement as of the Effective Date first written above.`,
    LM, y, PW, LH
  );
  doc.setFont("helvetica", "normal");
  y += 8;

  boldHeading(doc, "SIGNATURES", LM, y);
  y += LH + 3;

  const col1 = LM;
  const col2 = 110;

  // Row: labels
  doc.setFont("helvetica", "bold");
  doc.text("RELEASING ROOMMATE:", col1, y);
  doc.text("REMAINING ROOMMATE:", col2, y);
  doc.setFont("helvetica", "normal");
  y += 7;

  // Name row
  doc.text("Name:", col1, y);
  doc.text(values.releasingRoommate || "", col1 + 14, y);
  doc.text("Name:", col2, y);
  const remainingFirst = (values.remainingRoommates || "").split("\n")[0];
  doc.text(remainingFirst, col2 + 14, y);
  y += 7;

  // Signature row
  doc.text("Signature:", col1, y);
  doc.line(col1 + 22, y + 1, col1 + 75, y + 1);
  doc.text("Signature:", col2, y);
  doc.line(col2 + 22, y + 1, col2 + 75, y + 1);
  y += 2;
  doc.setFontSize(9);
  doc.text(values.releasingSignature || "", col1 + 22, y);
  doc.text(values.remainingSignature || "", col2 + 22, y);
  doc.setFontSize(10);
  y += 8;

  // Date row
  doc.text("Date:", col1, y);
  doc.text(values.releasingSignDate || "", col1 + 14, y);
  doc.text("Date:", col2, y);
  doc.text(values.remainingSignDate || "", col2 + 14, y);
  y += 12;

  // Checklist footer
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    `Checklist — Lease attached: [${values.leaseAttached === "yes" ? "Done" : "Pending"}]   Final confirmation: [${values.finalConfirm === "yes" ? "Confirmed" : "Not Confirmed"}]`,
    LM,
    y
  );

  doc.save("roommate_release_agreement.pdf");
};

export default function RoommateReleaseAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Roommate Release Agreement"
      subtitle="Complete each step to generate your Roommate Release Agreement"
      onGenerate={generatePDF}
      documentType="roommate-release-agreement"
    />
  );
}