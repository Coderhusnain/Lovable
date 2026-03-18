import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Jurisdiction",
    fields: [
      {
        name: "country",
        label: "Which country's laws will govern this document?",
        type: "select",
        required: true,
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
          { value: "au", label: "Australia" },
          { value: "other", label: "Other" },
        ],
      },
    ],
  },
  {
    label: "State/Province",
    fields: [
      {
        name: "state",
        label: "Which state or province?",
        type: "select",
        required: true,
        dependsOn: "country",
        getOptions: (values) => {
          if (values.country === "us") {
            return [
              { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" },
              { value: "AZ", label: "Arizona" }, { value: "AR", label: "Arkansas" },
              { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
              { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" },
              { value: "FL", label: "Florida" }, { value: "GA", label: "Georgia" },
              { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
              { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" },
              { value: "IA", label: "Iowa" }, { value: "KS", label: "Kansas" },
              { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
              { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" },
              { value: "MA", label: "Massachusetts" }, { value: "MI", label: "Michigan" },
              { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
              { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" },
              { value: "NE", label: "Nebraska" }, { value: "NV", label: "Nevada" },
              { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
              { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" },
              { value: "NC", label: "North Carolina" }, { value: "ND", label: "North Dakota" },
              { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
              { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" },
              { value: "RI", label: "Rhode Island" }, { value: "SC", label: "South Carolina" },
              { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
              { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" },
              { value: "VT", label: "Vermont" }, { value: "VA", label: "Virginia" },
              { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
              { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
              { value: "DC", label: "District of Columbia" },
            ];
          } else if (values.country === "ca") {
            return [
              { value: "AB", label: "Alberta" }, { value: "BC", label: "British Columbia" },
              { value: "MB", label: "Manitoba" }, { value: "NB", label: "New Brunswick" },
              { value: "NL", label: "Newfoundland and Labrador" }, { value: "NS", label: "Nova Scotia" },
              { value: "ON", label: "Ontario" }, { value: "PE", label: "Prince Edward Island" },
              { value: "QC", label: "Quebec" }, { value: "SK", label: "Saskatchewan" },
              { value: "NT", label: "Northwest Territories" }, { value: "NU", label: "Nunavut" },
              { value: "YT", label: "Yukon" },
            ];
          } else if (values.country === "uk") {
            return [
              { value: "ENG", label: "England" }, { value: "SCT", label: "Scotland" },
              { value: "WLS", label: "Wales" }, { value: "NIR", label: "Northern Ireland" },
            ];
          } else if (values.country === "au") {
            return [
              { value: "NSW", label: "New South Wales" }, { value: "VIC", label: "Victoria" },
              { value: "QLD", label: "Queensland" }, { value: "WA", label: "Western Australia" },
              { value: "SA", label: "South Australia" }, { value: "TAS", label: "Tasmania" },
              { value: "ACT", label: "Australian Capital Territory" }, { value: "NT", label: "Northern Territory" },
            ];
          }
          return [{ value: "other", label: "Other Region" }];
        },
      },
    ],
  },
  {
    label: "Agreement Date",
    fields: [
      { name: "effectiveDate", label: "Effective date of this agreement", type: "date", required: true },
    ],
  },
  {
    label: "Landlord",
    fields: [
      { name: "party1Name",   label: "Landlord Full Legal Name",  type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party1Street", label: "Landlord Street Address",   type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party1City",   label: "Landlord City",             type: "text",  required: true,  placeholder: "City" },
      { name: "party1State",  label: "Landlord State",            type: "text",  required: true,  placeholder: "State" },
      { name: "party1Zip",    label: "Landlord ZIP Code",         type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party1Email",  label: "Landlord Email",            type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party1Phone",  label: "Landlord Phone",            type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Tenant",
    fields: [
      { name: "party2Name",   label: "Tenant Full Legal Name",  type: "text",  required: true,  placeholder: "Enter full legal name" },
      { name: "party2Street", label: "Tenant Street Address",   type: "text",  required: true,  placeholder: "123 Main Street" },
      { name: "party2City",   label: "Tenant City",             type: "text",  required: true,  placeholder: "City" },
      { name: "party2Zip",    label: "Tenant ZIP Code",         type: "text",  required: true,  placeholder: "ZIP Code" },
      { name: "party2Email",  label: "Tenant Email",            type: "email", required: true,  placeholder: "email@example.com" },
      { name: "party2Phone",  label: "Tenant Phone",            type: "tel",   required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Premises",
    fields: [
      { name: "propAddress", label: "Property Street Address", type: "text", required: true,  placeholder: "123 Vacation Dr" },
      { name: "propCity",    label: "Property City",           type: "text", required: true,  placeholder: "City" },
      { name: "propState",   label: "Property State",          type: "text", required: true,  placeholder: "State" },
      { name: "propZip",     label: "Property ZIP Code",       type: "text", required: true,  placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Term",
    fields: [
      { name: "startTime", label: "Check-in Time",    type: "text", required: true,  placeholder: "e.g. 3:00 PM" },
      { name: "startDate", label: "Check-in Date",    type: "date", required: true  },
      { name: "endTime",   label: "Check-out Time",   type: "text", required: true,  placeholder: "e.g. 11:00 AM" },
      { name: "endDate",   label: "Check-out Date",   type: "date", required: true  },
      { name: "minStay",   label: "Minimum Stay (nights)", type: "text", required: true, placeholder: "e.g. 2" },
    ],
  },
  {
    label: "Payments",
    fields: [
      { name: "totalRent",        label: "Total rent for the Lease term",          type: "text", required: true,  placeholder: "$0.00" },
      { name: "depositAmount",    label: "Non-refundable reservation deposit",     type: "text", required: true,  placeholder: "$0.00" },
      { name: "depositDeadline",  label: "Deposit due date",                       type: "date", required: true  },
      { name: "remainingBalance", label: "Remaining balance amount",               type: "text", required: true,  placeholder: "$0.00" },
      { name: "balanceDueDate",   label: "Remaining balance due date",             type: "date", required: true  },
    ],
  },
  {
    label: "Security Deposit",
    fields: [
      { name: "securityDeposit", label: "Security deposit amount", type: "text", required: true, placeholder: "$0.00" },
    ],
  },
  {
    label: "Occupancy & Furnishings",
    fields: [
      { name: "maxOccupancy",   label: "Maximum number of occupants",      type: "text", required: true,  placeholder: "e.g. 6" },
      { name: "ageLimit",       label: "Age at which guests count toward occupancy", type: "text", required: true, placeholder: "e.g. 2" },
      { name: "furnishings",    label: "Furnishings provided",             type: "textarea", required: true, placeholder: "List all furnishings included" },
    ],
  },
  {
    label: "Cancellation Policy",
    fields: [
      { name: "cancelDaysLong",    label: "Days before arrival for standard cancellation", type: "text", required: true, placeholder: "e.g. 30" },
      { name: "cancelFeeLong",     label: "Cancellation fee for standard cancellation",    type: "text", required: true, placeholder: "$0.00" },
      { name: "cancelDaysShort",   label: "Short-notice cancellation window (days)",       type: "text", required: true, placeholder: "e.g. 14" },
      { name: "cancelFeeShort",    label: "Fee if Landlord re-rents during short-notice",  type: "text", required: true, placeholder: "$0.00" },
      { name: "cancelNoRefund",    label: "No-refund window (days before arrival)",        type: "text", required: true, placeholder: "e.g. 7" },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      {
        name: "additionalTerms",
        label: "Any additional terms or special conditions?",
        type: "textarea",
        required: false,
        placeholder: "Enter any additional terms, conditions, or special provisions...",
      },
    ],
  },
  {
    label: "Review & Sign",
    fields: [
      { name: "party1Signature", label: "Landlord Signature (type full legal name)", type: "text", required: true,  placeholder: "Type your full legal name" },
      { name: "party2Signature", label: "Tenant Signature (type full legal name)",   type: "text", required: true,  placeholder: "Type your full legal name" },
      { name: "witnessName",     label: "Witness Name (Optional)",                   type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

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

function section(
  doc: jsPDF,
  num: number,
  title: string,
  x: number,
  y: number
): number {
  y = checkPageBreak(doc, y);
  boldHeading(doc, `${num}.  ${title}`, x, y);
  return y + 6.5;
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
  doc.text("VACATION LEASE AGREEMENT", 105, y, { align: "center" });
  const titleW = doc.getTextWidth("VACATION LEASE AGREEMENT");
  doc.setLineWidth(0.4);
  doc.line(105 - titleW / 2, y + 1.2, 105 + titleW / 2, y + 1.2);
  y += 12;

  // ── PREAMBLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y = wrappedText(
    doc,
    `This Vacation Lease Agreement ("Lease") is made and entered into on ` +
    `${values.effectiveDate || "[Insert Date]"} by and between ` +
    `${values.party1Name || "[Insert Landlord Name]"} ("Landlord") and ` +
    `${values.party2Name || "[Insert Tenant Name]"} ("Tenant"). ` +
    `The parties agree as follows:`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 1. PREMISES ───────────────────────────────────────────────────────────
  y = section(doc, 1, "PREMISES", LM, y);
  y = wrappedText(
    doc,
    `The Landlord, in consideration of the lease payments set forth herein, leases to the Tenant the premises located at:`,
    LM, y, PW, LH
  );
  y += 2;
  const propLine = [values.propAddress, values.propCity, values.propState, values.propZip].filter(Boolean).join(", ") || "[Insert Property Address]";
  const premisesBullets = [
    `Address: ${propLine}`,
    `City: ${values.propCity || "[City]"}     State: ${values.propState || "[State]"}     ZIP: ${values.propZip || "[ZIP]"}`,
  ];
  for (const b of premisesBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 2. TERM ───────────────────────────────────────────────────────────────
  y = section(doc, 2, "TERM", LM, y);
  const termBullets = [
    `Check-in: ${values.startTime || "[Time]"} on ${values.startDate || "[Start Date]"}`,
    `Check-out: ${values.endTime || "[Time]"} on ${values.endDate || "[End Date]"}`,
    `Tenant shall have exclusive use and control of the Premises during this period.`,
  ];
  for (const b of termBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 3. LEASE PAYMENTS ─────────────────────────────────────────────────────
  y = section(doc, 3, "LEASE PAYMENTS", LM, y);
  const payBullets = [
    `Total rent due for the Lease term: ${values.totalRent || "$0.00"}, payable in advance.`,
    `Non-refundable reservation deposit of ${values.depositAmount || "$0.00"} shall be paid by ${values.depositDeadline || "[Insert Date]"} to secure the reservation. This deposit will be applied to the total rental amount.`,
    `Remaining balance of ${values.remainingBalance || "$0.00"} is due no later than ${values.balanceDueDate || "[Insert Date]"}.`,
    `Payments shall be made to the Landlord at: ${[values.party1Street, values.party1City, values.party1State, values.party1Zip].filter(Boolean).join(", ") || "[Insert Landlord Address]"}.`,
    `Note: Payment address may be updated by written notice from the Landlord.`,
  ];
  for (const b of payBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 4;

  // ── 4. SECURITY DEPOSIT ───────────────────────────────────────────────────
  y = section(doc, 4, "SECURITY DEPOSIT", LM, y);
  y = wrappedText(
    doc,
    `At the time of signing, Tenant shall pay a security deposit of ${values.securityDeposit || "$0.00"}, held in trust by the Landlord, to cover any damages or defaults under this agreement, as allowed by law.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 5. POSSESSION ─────────────────────────────────────────────────────────
  y = section(doc, 5, "POSSESSION", LM, y);
  const possBullets = [
    `Tenant shall take possession on the Lease start date and shall vacate the Premises on the end date, unless otherwise agreed in writing.`,
    `Tenant shall return the Premises in a clean and undamaged condition, normal wear and tear excepted.`,
  ];
  for (const b of possBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 4;

  // ── 6. MINIMUM STAY ───────────────────────────────────────────────────────
  y = section(doc, 6, "MINIMUM STAY", LM, y);
  const minStayBullets = [
    `A minimum stay of ${values.minStay || "[Insert Number]"} night(s) is required.`,
    `Longer minimums may apply during holidays.`,
  ];
  for (const b of minStayBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 7. USE OF PREMISES & ABSENCES ─────────────────────────────────────────
  y = section(doc, 7, "USE OF PREMISES & ABSENCES", LM, y);
  const useBullets = [
    `Tenant agrees to use the Premises solely as a residential dwelling.`,
    `Tenant shall notify the Landlord of any extended absence.`,
    `Tenant shall maintain the Premises in clean and good condition throughout the tenancy.`,
  ];
  for (const b of useBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 8. OCCUPANCY ──────────────────────────────────────────────────────────
  y = section(doc, 8, "OCCUPANCY", LM, y);
  const occBullets = [
    `Maximum occupancy is limited to ${values.maxOccupancy || "[Insert Number]"} persons.`,
    `All guests over the age of ${values.ageLimit || "[Insert Age]"} count toward the occupancy limit.`,
    `Misrepresentation or exceeding occupancy limits may result in immediate eviction without refund.`,
  ];
  for (const b of occBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 9. FURNISHINGS ────────────────────────────────────────────────────────
  y = section(doc, 9, "FURNISHINGS", LM, y);
  const furnBullets = [
    `The following furnishings are provided: ${values.furnishings || "[Insert Furnishings]"}.`,
    `Tenant shall return all furnishings in their original condition, less reasonable wear.`,
  ];
  for (const b of furnBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 4;

  // ── 10. INSURANCE ─────────────────────────────────────────────────────────
  y = section(doc, 10, "INSURANCE", LM, y);
  const insBullets = [
    `Both parties are responsible for insuring their respective interests.`,
    `Tenant is advised to carry travel and personal property insurance.`,
  ];
  for (const b of insBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 11. NON-DISTURBANCE CLAUSE ────────────────────────────────────────────
  y = section(doc, 11, "NON-DISTURBANCE CLAUSE", LM, y);
  y = wrappedText(
    doc,
    `Tenant and guests shall not disturb or endanger neighbours or engage in unlawful activities on the Premises.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 12. CANCELLATION POLICY ───────────────────────────────────────────────
  y = section(doc, 12, "CANCELLATION POLICY", LM, y);
  const cancelBullets = [
    `If the Premises become unavailable before occupancy due to circumstances beyond Landlord's control, the Landlord will refund all amounts paid.`,
    `If the Tenant cancels more than ${values.cancelDaysLong || "[Insert Days]"} days before arrival, a refund will be issued minus a ${values.cancelFeeLong || "$0.00"} cancellation fee.`,
    `Cancellations ${values.cancelDaysShort || "[Insert Days]"} days or fewer before arrival result in forfeiture, unless the Landlord re-rents the Premises. If re-rented, a refund minus a cancellation fee of ${values.cancelFeeShort || "$0.00"} will be issued.`,
    `No cancellations are permitted within ${values.cancelNoRefund || "[Insert Days]"} days of arrival. Failure to pay the final balance will be treated as cancellation.`,
  ];
  for (const b of cancelBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 4;

  // ── 13. SMOKING ───────────────────────────────────────────────────────────
  y = section(doc, 13, "SMOKING", LM, y);
  const smokeBullets = [
    `Smoking is strictly prohibited indoors.`,
    `Outdoor smoking is allowed in designated areas only.`,
    `Violations may lead to eviction, forfeiture of deposit, and additional cleaning fees.`,
  ];
  for (const b of smokeBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 14. COOKING ───────────────────────────────────────────────────────────
  y = section(doc, 14, "COOKING", LM, y);
  const cookBullets = [
    `Cooking is restricted to designated areas of the Premises.`,
    `Open flames are only allowed in grills, outdoor fireplaces, or stone hearths.`,
    `Fires must never be left unattended.`,
  ];
  for (const b of cookBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 15. CLEANING ──────────────────────────────────────────────────────────
  y = section(doc, 15, "CLEANING", LM, y);
  const cleanBullets = [
    `Tenant must leave the Premises in good condition upon departure.`,
    `Rental fee includes linen laundry.`,
    `Tenant is responsible for washing dishes and ensuring the unit is tidy.`,
  ];
  for (const b of cleanBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 16. HOLDOVER ──────────────────────────────────────────────────────────
  y = section(doc, 16, "HOLDOVER", LM, y);
  const holdBullets = [
    `If Tenant remains in possession after the Lease ends, rent shall continue at the most recent monthly rate.`,
    `Holdover creates a month-to-month tenancy terminable by either party with appropriate written notice.`,
  ];
  for (const b of holdBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 17. CUMULATIVE RIGHTS ─────────────────────────────────────────────────
  y = section(doc, 17, "CUMULATIVE RIGHTS", LM, y);
  y = wrappedText(
    doc,
    `All rights provided under this Lease are cumulative and do not exclude any rights granted by applicable law.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 18. CASUALTY OR DESTRUCTION ───────────────────────────────────────────
  y = section(doc, 18, "CASUALTY OR DESTRUCTION", LM, y);
  const casualtyBullets = [
    `If the Premises are destroyed before occupancy due to natural disaster or environmental cause, this Lease is void and all payments shall be refunded in full.`,
    `If destruction occurs during occupancy, a prorated refund may be negotiated between the parties.`,
    `No refund will be issued for inclement weather that does not render the Premises uninhabitable.`,
  ];
  for (const b of casualtyBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 2;
  }
  y += 4;

  // ── 19. NOTICES ───────────────────────────────────────────────────────────
  y = section(doc, 19, "NOTICES", LM, y);
  const noticeBullets = [
    `All notices must be in writing and sent by prepaid mail to the addresses provided by both parties.`,
    `Notices are deemed received three (3) days after the date of mailing.`,
  ];
  for (const b of noticeBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 20. GOVERNING LAW ─────────────────────────────────────────────────────
  y = section(doc, 20, "GOVERNING LAW", LM, y);
  y = wrappedText(
    doc,
    `This Lease shall be governed by the laws of the State of ${values.state || "[Insert State]"}.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 21. ENTIRE AGREEMENT ──────────────────────────────────────────────────
  y = section(doc, 21, "ENTIRE AGREEMENT", LM, y);
  y = wrappedText(
    doc,
    `This document represents the full and complete agreement between the parties with respect to the vacation lease of the Premises.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 22. AMENDMENTS ────────────────────────────────────────────────────────
  y = section(doc, 22, "AMENDMENTS", LM, y);
  y = wrappedText(
    doc,
    `This Lease may only be modified by a written document signed by both parties.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 23. SEVERABILITY ──────────────────────────────────────────────────────
  y = section(doc, 23, "SEVERABILITY", LM, y);
  y = wrappedText(
    doc,
    `If any provision of this Lease is held invalid or unenforceable, the remaining provisions shall remain in full force and effect.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 24. WAIVER ────────────────────────────────────────────────────────────
  y = section(doc, 24, "WAIVER", LM, y);
  y = wrappedText(
    doc,
    `Failure to enforce any part of this Lease does not constitute a waiver and does not limit the right of either party to enforce it at a later time.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 25. BINDING EFFECT ────────────────────────────────────────────────────
  y = section(doc, 25, "BINDING EFFECT", LM, y);
  y = wrappedText(
    doc,
    `This Lease binds and benefits both parties, their heirs, successors, and permitted assigns.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 26. DISPUTE RESOLUTION ────────────────────────────────────────────────
  y = section(doc, 26, "DISPUTE RESOLUTION", LM, y);
  const dispBullets = [
    `Disputes shall first be resolved through good faith negotiation between the parties.`,
    `If unresolved, the parties shall submit the matter to mediation before seeking any legal remedies.`,
  ];
  for (const b of dispBullets) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 27. CAUSE FOR EVICTION ────────────────────────────────────────────────
  y = section(doc, 27, "CAUSE FOR EVICTION", LM, y);
  const evictBullets = [
    `Tenant may be evicted for Lease violations, including but not limited to:`,
    `Unauthorized occupancy beyond the stated maximum.`,
    `Unauthorized pets on the Premises.`,
    `Excessive noise or disturbance of neighbours.`,
    `Smoking indoors or in non-designated areas.`,
    `Damage to the Premises or furnishings.`,
  ];
  y = checkPageBreak(doc, y);
  y = wrappedText(doc, evictBullets[0], LM, y, PW, LH);
  y += 2;
  for (const b of evictBullets.slice(1)) {
    y = checkPageBreak(doc, y);
    y = bulletItem(doc, b, LM + 2, y, PW - 2, LH);
    y += 1;
  }
  y += 5;

  // ── 28. ATTORNEY'S FEES ───────────────────────────────────────────────────
  y = section(doc, 28, "ATTORNEY'S FEES", LM, y);
  y = wrappedText(
    doc,
    `Tenant shall pay all reasonable attorney's fees and costs if the Landlord must take legal action to enforce any provision of this Lease.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── 29. ACKNOWLEDGMENT ────────────────────────────────────────────────────
  y = section(doc, 29, "ACKNOWLEDGMENT", LM, y);
  y = wrappedText(
    doc,
    `The parties acknowledge that they have read, understood, and agree to all terms and conditions of this Vacation Lease Agreement.`,
    LM, y, PW, LH
  );
  y += 7;

  // ── ADDITIONAL TERMS ──────────────────────────────────────────────────────
  if (values.additionalTerms) {
    y = checkPageBreak(doc, y);
    boldHeading(doc, "ADDITIONAL TERMS", LM, y);
    y += LH + 1;
    y = wrappedText(doc, values.additionalTerms, LM, y, PW, LH);
    y += 7;
  }

  // ── MAIN SIGNATURES ───────────────────────────────────────────────────────
  y = checkPageBreak(doc, y, 45);
  boldHeading(doc, "SIGNATURES", LM, y);
  y += LH + 3;

  const col1 = LM;
  const col2 = 110;

  doc.setFont("helvetica", "bold");
  doc.text("LANDLORD:", col1, y);
  doc.text("TENANT:", col2, y);
  doc.setFont("helvetica", "normal");
  y += 7;

  doc.text("Name:", col1, y);
  doc.text(values.party1Name || "", col1 + 14, y);
  doc.text("Name:", col2, y);
  doc.text(values.party2Name || "", col2 + 14, y);
  y += 7;

  doc.text("Signature:", col1, y);
  doc.line(col1 + 22, y + 1, col1 + 78, y + 1);
  doc.text("Signature:", col2, y);
  doc.line(col2 + 22, y + 1, col2 + 78, y + 1);
  y += 2;
  doc.setFontSize(9);
  doc.text(values.party1Signature || "", col1 + 22, y);
  doc.text(values.party2Signature || "", col2 + 22, y);
  doc.setFontSize(10);
  y += 8;

  doc.text("Date:", col1, y);
  doc.line(col1 + 14, y + 1, col1 + 78, y + 1);
  doc.text("Date:", col2, y);
  doc.line(col2 + 14, y + 1, col2 + 78, y + 1);
  y += 12;

  if (values.witnessName) {
    y = checkPageBreak(doc, y, 20);
    doc.setFont("helvetica", "bold");
    doc.text("WITNESS:", col1, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    doc.text("Name: " + values.witnessName, col1, y);
    y += 6;
    doc.text("Signature:", col1, y);
    doc.line(col1 + 22, y + 1, col1 + 78, y + 1);
    y += 10;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PAGE BREAK → INSPECTION CHECKLIST
  // ═══════════════════════════════════════════════════════════════════════════
  doc.addPage();
  y = 22;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("VACATION LEASE INSPECTION CHECKLIST", 105, y, { align: "center" });
  const clW = doc.getTextWidth("VACATION LEASE INSPECTION CHECKLIST");
  doc.line(105 - clW / 2, y + 1.2, 105 + clW / 2, y + 1.2);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y = wrappedText(
    doc,
    `Tenant affirms the Premises is in satisfactory condition unless noted below:`,
    LM, y, PW, LH
  );
  y += 5;

  // Table
  const rowH = 7;
  const colX  = [LM, LM + 62, LM + 115];

  const drawRow = (area: string, satisfactory: string, comments: string, isHeader = false) => {
    if (isHeader) {
      doc.setFillColor(215, 215, 215);
      doc.rect(LM, y - 5, PW, rowH, "F");
    }
    doc.setDrawColor(180, 180, 180);
    doc.rect(LM, y - 5, PW, rowH);
    doc.line(colX[1], y - 5, colX[1], y + rowH - 5);
    doc.line(colX[2], y - 5, colX[2], y + rowH - 5);

    doc.setFont("helvetica", isHeader ? "bold" : "normal");
    doc.text(area,        colX[0] + 2, y);
    doc.text(satisfactory,colX[1] + 2, y);
    doc.text(comments,    colX[2] + 2, y);
    doc.setFont("helvetica", "normal");
    y += rowH;
  };

  drawRow("AREA", "SATISFACTORY", "COMMENTS", true);

  const checklistItems = [
    "Bathrooms", "Carpeting", "Ceilings", "Closets", "Dishwasher",
    "Disposal", "Doors", "Fireplace", "Lights", "Locks",
    "Refrigerator", "Screens", "Stove",
  ];
  for (const item of checklistItems) {
    y = checkPageBreak(doc, y, rowH + 2);
    drawRow(item, "", "[Comments]");
  }
  y += 8;

  // Acknowledgment initials
  boldHeading(doc, "TENANT'S ACKNOWLEDGMENT", LM, y);
  y += LH + 2;
  const ackItems = [
    "(a) _______ — Received all required information regarding the Premises.",
    "(b) _______ — Received lead safety pamphlet (if applicable).",
  ];
  for (const a of ackItems) {
    y = checkPageBreak(doc, y);
    y = wrappedText(doc, a, LM, y, PW, LH);
    y += 2;
  }
  y += 6;

  // Certification
  boldHeading(doc, "CERTIFICATION OF ACCURACY", LM, y);
  y += LH + 2;
  y = wrappedText(
    doc,
    `We, the undersigned, certify that the information disclosed in this checklist is true and complete to the best of our knowledge.`,
    LM, y, PW, LH
  );
  y += 8;

  // Checklist signatures side by side
  doc.setFont("helvetica", "bold");
  doc.text("LANDLORD / AGENT:", col1, y);
  doc.text("TENANT:", col2, y);
  doc.setFont("helvetica", "normal");
  y += 7;

  doc.text("Signature:", col1, y);
  doc.line(col1 + 22, y + 1, col1 + 78, y + 1);
  doc.text("Signature:", col2, y);
  doc.line(col2 + 22, y + 1, col2 + 78, y + 1);
  y += 8;

  doc.text("Date:", col1, y);
  doc.line(col1 + 14, y + 1, col1 + 78, y + 1);
  doc.text("Date:", col2, y);
  doc.line(col2 + 14, y + 1, col2 + 78, y + 1);

  doc.save("vacation_lease_agreement.pdf");
};

export default function VacationLease() {
  return (
    <FormWizard
      steps={steps}
      title="Vacation Lease Agreement"
      subtitle="Complete each step to generate your Vacation Lease Agreement"
      onGenerate={generatePDF}
      documentType="vacationlease"
    />
  );
}