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
    label: "Effective Date",
    fields: [
      {
        name: "effectiveDate",
        label: "What is the effective date of this document?",
        type: "date",
        required: true,
      },
    ],
  },
  // NEW: Company Information
  {
    label: "Company Information",
    fields: [
      { name: "companyName", label: "Full Legal Name of the LLC", type: "text", required: true, placeholder: "e.g. ABC Ventures, LLC" },
      { name: "companyPurpose", label: "Business Purpose of the Company", type: "textarea", required: true, placeholder: "Describe the business purpose of the LLC..." },
      { name: "principalOffice", label: "Principal Office Address", type: "text", required: true, placeholder: "123 Business Ave, City, State ZIP" },
      { name: "registeredAgent", label: "Registered Agent Name", type: "text", required: true, placeholder: "Full name of registered agent" },
      { name: "registeredAgentAddress", label: "Registered Agent Address", type: "text", required: true, placeholder: "Registered office address" },
    ],
  },
  // NEW: Members & Ownership
  {
    label: "Member 1 Details",
    fields: [
      { name: "party1Name", label: "What is the full legal name of the first member?", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party1Type", label: "Is this member an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
      { name: "party1MembershipInterest", label: "Membership Interest (%) of Member 1", type: "text", required: true, placeholder: "e.g. 50%" },
      { name: "party1InitialContribution", label: "Initial Capital Contribution of Member 1", type: "text", required: true, placeholder: "e.g. $10,000" },
    ],
  },
  {
    label: "Member 1 Address",
    fields: [
      { name: "party1Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party1City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party1Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Member 1 Contact",
    fields: [
      { name: "party1Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party1Phone", label: "Phone Number", type: "phone", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  {
    label: "Member 2 Details",
    fields: [
      { name: "party2Name", label: "What is the full legal name of the second member?", type: "text", required: true, placeholder: "Enter full legal name" },
      { name: "party2Type", label: "Is this member an individual or a business?", type: "select", required: true, options: [{ value: "individual", label: "Individual" }, { value: "business", label: "Business/Company" }] },
      { name: "party2MembershipInterest", label: "Membership Interest (%) of Member 2", type: "text", required: true, placeholder: "e.g. 50%" },
      { name: "party2InitialContribution", label: "Initial Capital Contribution of Member 2", type: "text", required: true, placeholder: "e.g. $10,000" },
    ],
  },
  {
    label: "Member 2 Address",
    fields: [
      { name: "party2Street", label: "Street Address", type: "text", required: true, placeholder: "123 Main Street" },
      { name: "party2City", label: "City", type: "text", required: true, placeholder: "City" },
      { name: "party2Zip", label: "ZIP/Postal Code", type: "text", required: true, placeholder: "ZIP Code" },
    ],
  },
  {
    label: "Member 2 Contact",
    fields: [
      { name: "party2Email", label: "Email Address", type: "email", required: true, placeholder: "email@example.com" },
      { name: "party2Phone", label: "Phone Number", type: "phone", required: false, placeholder: "(555) 123-4567" },
    ],
  },
  // NEW: Accounting & Distributions
  {
    label: "Accounting & Distributions",
    fields: [
      {
        name: "fiscalYearEnd",
        label: "Fiscal Year End Month",
        type: "select",
        required: true,
        options: [
          { value: "January", label: "January" }, { value: "February", label: "February" },
          { value: "March", label: "March" }, { value: "April", label: "April" },
          { value: "May", label: "May" }, { value: "June", label: "June" },
          { value: "July", label: "July" }, { value: "August", label: "August" },
          { value: "September", label: "September" }, { value: "October", label: "October" },
          { value: "November", label: "November" }, { value: "December", label: "December" },
        ],
      },
      {
        name: "taxTreatment",
        label: "Tax Treatment Election",
        type: "select",
        required: true,
        options: [
          { value: "passthrough", label: "Pass-Through (Default)" },
          { value: "ccorp", label: "C-Corporation" },
          { value: "scorp", label: "S-Corporation" },
          { value: "partnership", label: "Partnership" },
        ],
      },
    ],
  },
  // NEW: Board of Managers & Officers
  {
    label: "Board of Managers",
    fields: [
      { name: "chairmanName", label: "Chairman of the Board Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "secretaryName", label: "Secretary Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "treasurerName", label: "Treasurer Name", type: "text", required: true, placeholder: "Full legal name" },
      { name: "additionalManagers", label: "Additional Managers (Optional)", type: "textarea", required: false, placeholder: "List any additional managers and their titles..." },
    ],
  },
  {
    label: "Document Details",
    fields: [
      { name: "description", label: "Describe the purpose and details of this document", type: "textarea", required: true, placeholder: "Provide a detailed description..." },
    ],
  },
  {
    label: "Terms & Duration",
    fields: [
      {
        name: "duration", label: "What is the duration of this agreement?", type: "select", required: true,
        options: [
          { value: "1month", label: "1 Month" }, { value: "3months", label: "3 Months" },
          { value: "6months", label: "6 Months" }, { value: "1year", label: "1 Year" },
          { value: "2years", label: "2 Years" }, { value: "5years", label: "5 Years" },
          { value: "indefinite", label: "Indefinite/Ongoing" }, { value: "custom", label: "Custom Duration" },
        ],
      },
      {
        name: "terminationNotice", label: "How much notice is required to terminate?", type: "select", required: true,
        options: [
          { value: "immediate", label: "Immediate" }, { value: "7days", label: "7 Days" },
          { value: "14days", label: "14 Days" }, { value: "30days", label: "30 Days" },
          { value: "60days", label: "60 Days" }, { value: "90days", label: "90 Days" },
        ],
      },
    ],
  },
  {
    label: "Financial Terms",
    fields: [
      { name: "paymentAmount", label: "What is the payment amount (if applicable)?", type: "text", required: false, placeholder: "$0.00" },
      {
        name: "paymentSchedule", label: "Payment Schedule", type: "select", required: false,
        options: [
          { value: "onetime", label: "One-time Payment" }, { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" }, { value: "monthly", label: "Monthly" },
          { value: "quarterly", label: "Quarterly" }, { value: "annually", label: "Annually" },
          { value: "milestone", label: "Milestone-based" },
        ],
      },
    ],
  },
  {
    label: "Legal Protections",
    fields: [
      {
        name: "confidentiality", label: "Include confidentiality clause?", type: "select", required: true,
        options: [{ value: "yes", label: "Yes - Include confidentiality provisions" }, { value: "no", label: "No - Not needed" }],
      },
      {
        name: "disputeResolution", label: "How should disputes be resolved?", type: "select", required: true,
        options: [
          { value: "mediation", label: "Mediation" }, { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation", label: "Court Litigation" }, { value: "negotiation", label: "Good Faith Negotiation First" },
        ],
      },
    ],
  },
  {
    label: "Additional Terms",
    fields: [
      { name: "additionalTerms", label: "Any additional terms or special conditions?", type: "textarea", required: false, placeholder: "Enter any additional terms..." },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "party1Signature", label: "First Member Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "party2Signature", label: "Second Member Signature (Type full legal name)", type: "text", required: true, placeholder: "Type your full legal name as signature" },
      { name: "witnessName", label: "Witness Name (Optional)", type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
] as Array<{ label: string; fields: FieldDef[] }>;

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const textWidth = pageWidth - margin * 2;
  let y = 20;

  const checkPageBreak = (space = 10) => {
    if (y + space > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const addUnderlinedField = (label: string, value: string, minWidth = 60) => {
    checkPageBreak();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(label, margin, y);
    const labelWidth = doc.getTextWidth(label);
    const startX = margin + labelWidth + 2;
    const display = value || "";
    if (display) doc.text(display, startX, y);
    const width = display ? doc.getTextWidth(display) : minWidth;
    doc.line(startX, y + 1, startX + width, y + 1);
    y += 8;
  };

  const addSectionTitle = (text: string) => {
    checkPageBreak(14);
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(text, margin, y);
    y += 2;
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  };

  const addParagraph = (text: string, bold = false) => {
    checkPageBreak(10);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textWidth);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 2;
  };

  const addParagraphWithUnderline = (before: string, value: string, after: string) => {
    const fullText = `${before}${value}${after}`;
    const lines = doc.splitTextToSize(fullText, textWidth);
    lines.forEach((line: string) => {
      checkPageBreak(8);
      doc.text(line, margin, y);
      if (line.includes(value)) {
        const beforeText = line.substring(0, line.indexOf(value));
        const startX = margin + doc.getTextWidth(beforeText);
        const valueWidth = doc.getTextWidth(value);
        doc.line(startX, y + 1, startX + valueWidth, y + 1);
      }
      y += 6;
    });
    y += 2;
  };

  const addBullet = (text: string) => {
    checkPageBreak(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textWidth - 8);
    doc.text("•", margin, y);
    doc.text(lines, margin + 6, y);
    y += lines.length * 5 + 2;
  };

  // ─── TITLE ───────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const title = "LLC OPERATING AGREEMENT";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const titleWidth = doc.getTextWidth(title);
  const titleX = pageWidth / 2 - titleWidth / 2;
  doc.line(titleX, y + 2, titleX + titleWidth, y + 2);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const subtitle = `A Limited Liability Company`;
  doc.text(subtitle, pageWidth / 2, y, { align: "center" });
  y += 15;

  // ─── DATE & JURISDICTION ─────────────────────────────────────────────────────
  addUnderlinedField("Date:", values.effectiveDate || "", 50);
  addUnderlinedField(
    "Jurisdiction:",
    values.state ? `${values.state}, ${values.country?.toUpperCase()}` : (values.country || ""),
    80
  );
  y += 4;

  // ─── SECTION 1: FORMATION ────────────────────────────────────────────────────
  addSectionTitle("1. FORMATION");

  addParagraph(`This Operating Agreement ("Agreement") of ${values.companyName || "________________"} ("Company"), is executed and agreed to, for good and valuable consideration, by the undersigned members (individually, "Member" or collectively, "Members").`);

  addParagraph("(a) State of Formation.", true);
  addParagraph(`This Agreement is for ${values.companyName || "________________"}, a manager-managed limited liability company formed under and pursuant to ${values.state || "________________"} law.`);

  addParagraph("(b) Operating Agreement Controls.", true);
  addParagraph("To the extent that the rights or obligations of the Members, or the Company under provisions of this Agreement differ from what they would be under state law absent such a provision, this Agreement, to the extent permitted under state law, shall control.");

  addParagraph("(c) Principal Office.", true);
  addUnderlinedField("Principal Office:", values.principalOffice || "", 120);

  addParagraph("(d) Registered Agent and Office.", true);
  addUnderlinedField("Registered Agent:", values.registeredAgent || "", 100);
  addUnderlinedField("Registered Office:", values.registeredAgentAddress || "", 120);

  addParagraph("(e) No State Law Partnership.", true);
  addParagraph("No provisions of this Agreement shall be deemed or construed to constitute a partnership (including, without limitation, a limited partnership) or joint venture, or any Member a partner or joint venturer of or with any other Member, for any purposes other than federal and state tax purposes.");

  // ─── SECTION 2: PURPOSES AND POWERS ─────────────────────────────────────────
  addSectionTitle("2. PURPOSES AND POWERS");

  addParagraph("(a) Purpose.", true);
  addParagraph(values.companyPurpose || values.description || "________________");

  addParagraph("(b) Powers.", true);
  addParagraph(`The Company shall have all of the powers of a limited liability company set forth under ${values.state || "________________"} law.`);

  addParagraph("(c) Duration.", true);
  addParagraphWithUnderline(
    "The Company's term shall commence upon the filing of Articles of Organization with ",
    values.state || "________________",
    ". The Company will operate until terminated as outlined in this Agreement unless: (i) A majority of the Members vote to dissolve the Company; (ii) No Member of the Company exists unless the business of the Company is continued in a manner permitted by state law; (iii) It becomes unlawful for any Member or the Company to continue in business; (iv) A judicial decree is entered that dissolves the Company; or (v) Any other event results in the dissolution of the Company under applicable law."
  );

  // ─── SECTION 3: MEMBERS ──────────────────────────────────────────────────────
  addSectionTitle("3. MEMBERS");

  addParagraph("(a) Members.", true);
  addParagraph("The Members of the Company and their membership interest at the time of adoption of this Agreement are as follows:");
  y += 2;

  // Member table header
  checkPageBreak(30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Member Name", margin, y);
  doc.text("Membership Interest", margin + 100, y);
  doc.text("Initial Contribution", margin + 145, y);
  y += 2;
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Member 1 row
  doc.setFont("helvetica", "normal");
  doc.text(values.party1Name || "________________", margin, y);
  doc.text(values.party1MembershipInterest || "________", margin + 100, y);
  doc.text(values.party1InitialContribution || "________", margin + 145, y);
  y += 7;

  // Member 2 row
  doc.text(values.party2Name || "________________", margin, y);
  doc.text(values.party2MembershipInterest || "________", margin + 100, y);
  doc.text(values.party2InitialContribution || "________", margin + 145, y);
  y += 2;
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  addParagraph("(b) Initial Contribution.", true);
  addParagraph("Each Member shall make an initial contribution to the company. No Member shall be entitled to interest on their initial contribution. Except as expressly provided by this Agreement, or as required by law, no Member shall have any right to demand or receive the return of their initial contribution. Any modifications as to the signatories' respective rights as to the receipt of their initial contributions must be set forth in writing and signed by all interested parties.");

  addParagraph("(c) Death, Incompetency, Resignation, or Termination of a Member.", true);
  addParagraph("Should a member die, be declared incompetent, or withdraw from the Company voluntarily or involuntarily, the remaining Members will have the option to buy out that Member's Membership interest in the Company. If a member is removed involuntarily, it must be by vote recorded in the official minutes. If a member resigns, they should submit a notarized resignation letter to the Agent. Should the Members agree to buy out the membership interest of the withdrawing Member, that Interest shall be paid for equally by the remaining Members and distributed in equal amounts to the remaining Members. The Members agree to hire an outside firm to assess the value of the membership interest.");
  addParagraph("The Members will have 70 days to decide if they want to buy the membership interest together and disperse it equally. If all Members do not agree to buy the membership interest, individual members will then have the right to buy the membership interest individually. If more than one Member requests to buy the remaining membership interest, the membership interest will be paid for and split equally among those Members wishing to purchase the membership interest. If all Members agree by unanimous vote, the Company may choose to allow a non-Member to buy the membership interest thereby replacing the previous Member.");

  // ─── SECTION 4: MEMBER VOTING ────────────────────────────────────────────────
  addSectionTitle("4. MEMBER VOTING");

  addParagraph("(a) Voting Power.", true);
  addParagraph("The company's members shall each have one vote equal to the vote of each other member, regardless of the member's share of membership interest in the company. At all meetings of members, a member may vote in person or by proxy executed in writing by the member or by his duly authorized attorney.");

  // ─── SECTION 5: ACCOUNTING AND DISTRIBUTIONS ─────────────────────────────────
  addSectionTitle("5. ACCOUNTING AND DISTRIBUTIONS");

  addParagraph("(a) Fiscal Year.", true);
  addUnderlinedField("The Company's fiscal year shall end on the last day of:", values.fiscalYearEnd || "", 60);

  addParagraph("(b) Records.", true);
  addParagraph("All financial records including tax returns and financial statements will be held at the Company's primary business address and will be accessible to all Members.");

  addParagraph("(c) Distributions.", true);
  addParagraph("Distributions shall be issued, as directed by the Company's Treasurer or Assistant Treasurer, on a quarterly basis, based upon the Company's fiscal year. The distribution shall not exceed the remaining net cash of the Company after making appropriate provisions for the Company's ongoing and anticipatable liabilities and expenses. Each Member shall receive a percentage of the overall distribution that matches that Member's percentage of membership interest in the Company.");

  // ─── SECTION 6: TAX TREATMENT ────────────────────────────────────────────────
  addSectionTitle("6. TAX TREATMENT ELECTION");

  const taxMap: Record<string, string> = {
    passthrough: "pass-through organization",
    ccorp: "C-Corporation",
    scorp: "S-Corporation",
    partnership: "partnership",
  };
  addParagraph(`The Company has not filed with the Internal Revenue Service for treatment as a corporation. Instead, the Company will be taxed as a ${taxMap[values.taxTreatment] || "pass-through organization"}. The Members may elect for the Company to be treated as a C-Corporation, S-Corporation, or a partnership at any time.`);

  // ─── SECTION 7: BOARD OF MANAGERS ────────────────────────────────────────────
  addSectionTitle("7. BOARD OF MANAGERS");

  addParagraph("(a) Creation of a Board of Managers.", true);
  addParagraph(`The Members shall create a board of managers ("Board") consisting of managers appointed at the sole discretion of the Members and headed by the Chairman of the Board. The Members may serve as managers and may appoint a Member to serve as the Chairman.`);

  addParagraph("Initial Board Officers:", true);
  addUnderlinedField("Chairman:", values.chairmanName || "", 100);
  addUnderlinedField("Secretary:", values.secretaryName || "", 100);
  addUnderlinedField("Treasurer:", values.treasurerName || "", 100);
  if (values.additionalManagers) {
    addParagraph("Additional Managers:", true);
    addParagraph(values.additionalManagers);
  }

  addParagraph("(b) Powers and Operation of the Board of Managers.", true);
  addParagraph("The Board shall have the power to do any and all acts necessary, convenient, or incidental to or for the furtherance of the Company's purposes described herein, including all powers, statutory or otherwise.");

  addParagraph("(c) Meetings.", true);
  addParagraph(`The Board may hold meetings, both regular and special, within or outside ${values.state || "________________"}. Regular meetings of the Board may be held without notice at such time and at such place as shall from time to time be determined by the Board. Special meetings of the Board may be called by the Chairman on not less than one day's notice to each manager by telephone, electronic mail, facsimile, mail, or any other means of communication.`);
  addBullet("At all meetings of the Board, a majority of the managers shall constitute a quorum for the transaction of business and the act of a majority of the managers present at any meeting at which there is a quorum shall be the act of the Board.");
  addBullet("Managers may participate in meetings by means of telephone conference or similar communications equipment that allows all persons participating in the meeting to hear each other.");

  addParagraph("(d) Removal of Managers.", true);
  addParagraph("Unless otherwise restricted by law, any manager or the entire Board may be removed, with or without cause, by the Members, and any vacancy caused by any such removal may be filled by action of the Members.");

  addParagraph("(e) No Power to Dissolve the Company.", true);
  addParagraph("None of the Board shall be authorized or empowered, nor shall they permit the Company, without the affirmative vote of the Members, to institute proceedings to have the Company be adjudicated bankrupt or insolvent, or consent to the institution of bankruptcy or insolvency proceedings against the Company.");

  // ─── SECTION 8: DUTIES OF THE BOARD ─────────────────────────────────────────
  addSectionTitle("8. DUTIES OF THE BOARD");

  addParagraph("The Board and the Members shall cause the Company to do or cause to be done all things necessary to preserve and keep in full force and effect its existence, rights, and franchises. The Board shall cause the Company to:");
  addBullet("Maintain its own books, records, accounts, financial statements, stationery, invoices, checks, and other limited liability company documents and bank accounts separate from any other person.");
  addBullet("At all times hold itself out as being a legal entity separate from the Members and any other person and conduct its business in its own name.");
  addBullet("File its own tax returns, if any, as may be required under applicable law, and pay any taxes required to be paid under applicable law.");
  addBullet("Not commingle its assets with assets of the Members or any other person, and separately identify, maintain, and segregate all Company assets.");
  addBullet("Pay its own liabilities only out of its own funds, except with respect to organizational expenses.");
  addBullet("Maintain an arm's length relationship with the Members with respect to all business transactions.");
  addBullet("Pay the salaries of its own employees, if any, out of its own funds and maintain a sufficient number of employees in light of its contemplated business operations.");
  addBullet("Not guarantee or become obligated for the debts of any other person or hold out its credit as being available to satisfy the obligations of others.");
  addBullet("Not pledge its assets for the benefit of any other person or make any loans or advances to any person.");
  addBullet("Maintain adequate capital in light of its contemplated business purposes.");

  // ─── SECTION 9: OFFICERS ─────────────────────────────────────────────────────
  addSectionTitle("9. APPOINTMENT AND TITLES OF OFFICERS");

  addParagraph(`The initial officers shall be appointed by the Members and shall consist of at least a Chairman, a Secretary, and a Treasurer. Any additional or substitute officers shall be chosen by the Board. Any number of offices may be held by the same person, as permitted by ${values.state || "________________"} law. The officers and agents of the Company shall hold office until their successors are chosen and qualified. Any officer elected or appointed by the Members or the Board may be removed at any time with or without cause, by the affirmative vote of a majority of the Board.`);

  // ─── SECTION 10: FINANCIAL TERMS ─────────────────────────────────────────────
  if (values.paymentAmount || values.paymentSchedule) {
    addSectionTitle("10. FINANCIAL TERMS");
    addParagraphWithUnderline("Payment Amount: ", values.paymentAmount || "N/A", "");
    addParagraphWithUnderline("Payment Schedule: ", values.paymentSchedule || "N/A", "");
  }

  // ─── SECTION 11: DISSOLUTION ─────────────────────────────────────────────────
  addSectionTitle("11. DISSOLUTION");

  addParagraph("(a) Limits on Dissolution.", true);
  addParagraph("The Company shall have a perpetual existence, and shall be dissolved, and its affairs shall be wound up only upon the provisions established above. Notwithstanding any other provision of this Agreement, the bankruptcy of any Member shall not cause such Member to cease to be a Member of the Company and upon the occurrence of such an event, the business of the Company shall continue without dissolution.");

  addParagraph("(b) Winding Up.", true);
  addParagraph("Upon the occurrence of any dissolution event, the Company shall continue solely for the purpose of winding up its affairs in an orderly manner, liquidating its assets, and satisfying the claims of its creditors. One or more Members, selected by the remaining Members, shall be responsible for overseeing the winding up and liquidation of the Company, shall take full account of the liabilities of the Company and its assets, shall either cause its assets to be distributed as provided under this Agreement or sold.");

  // ─── SECTION 12: INSURANCE ───────────────────────────────────────────────────
  addSectionTitle("12. INSURANCE");
  addParagraph("The Company shall have the power to purchase and maintain insurance, including insurance on behalf of any Covered Person against any liability asserted against such person and incurred by such Covered Person in any such capacity, or arising out of such Covered Person's status as an agent of the Company, whether or not the Company would have the power to indemnify such person against such liability under the applicable law provision.");

  // ─── SECTION 13: SETTLING DISPUTES ──────────────────────────────────────────
  addSectionTitle("13. SETTLING DISPUTES");

  addParagraphWithUnderline(
    "All Members agree to enter into mediation before filing suit against any other Member or the Company for any dispute arising from this Agreement or Company. Members agree to attend one session of mediation before filing suit. Any lawsuits will be under the jurisdiction of ",
    values.state || "________________",
    "."
  );

  addParagraph(`Dispute Resolution Method: ${values.disputeResolution || "Mediation"}.`);

  // ─── SECTION 14: LEGAL PROVISIONS ───────────────────────────────────────────
  addSectionTitle("14. LEGAL PROVISIONS");

  if (values.confidentiality === "yes") {
    addParagraph("(a) Confidentiality.", true);
    addParagraph("All members agree to maintain the confidentiality of all proprietary information, trade secrets, and sensitive business data disclosed during the course of this agreement. This obligation shall survive the termination of this agreement.");
  }

  addParagraph("(b) Independent Counsel.", true);
  addParagraph("All Members entering into this Agreement have been advised of their right to seek the advice of independent legal counsel before signing this Agreement. All Members have entered into this Agreement freely and voluntarily and without any coercion or duress.");

  addParagraph("(c) Governing Law.", true);
  addParagraph(`This Agreement shall be governed by and construed in all respects in accordance with the laws of ${values.state || "________________"} (without regard to conflicts of law principles thereof).`);

  addParagraph("(d) Amendment.", true);
  addParagraph(`This Agreement may be amended only by written consent of the Board and the Members. Upon obtaining the approval of any such amendment, the Company shall cause a Certificate of Amendment to be prepared, executed, and filed in accordance with ${values.state || "________________"} law.`);

  addParagraph("(e) Entire Agreement.", true);
  addParagraph("This Agreement contains the entire understanding among the parties hereto with respect to the subject matter hereof, and supersedes all prior and contemporaneous agreements and understandings, inducements, or conditions, express or implied, oral or written, except as herein contained.");

  addParagraph("(f) Severability.", true);
  addParagraph("The provisions of this Agreement are independent and separable from each other, and no provision shall be affected or invalidated by reason of any one or more other provisions being held to be invalid or unenforceable in whole or in part.");

  addParagraph("(g) Notices.", true);
  addParagraph("All notices, offers, or other communications required or permitted to be given pursuant to this Agreement shall be in writing and may be personally served or sent by United States mail and be deemed delivered when delivered in person or three business days after deposit in the United States mail, properly addressed, and postage prepaid.");

  // ─── ADDITIONAL TERMS ────────────────────────────────────────────────────────
  if (values.additionalTerms) {
    addSectionTitle("15. ADDITIONAL TERMS");
    addParagraph(values.additionalTerms);
  }

  // ─── EXECUTION ───────────────────────────────────────────────────────────────
  addSectionTitle("IN WITNESS WHEREOF");

  addParagraph("The members have executed this LLC Operating Agreement as of the date first written above.");
  y += 10;

  // SIGNATURES
  checkPageBreak(70);

  // First Member
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("First Member Signature:", margin, y);
  y += 8;
  const sig1 = values.party1Signature || "";
  doc.setFont("helvetica", "normal");
  doc.text(sig1, margin, y);
  doc.line(margin, y + 1, margin + (sig1 ? doc.getTextWidth(sig1) : 80), y + 1);
  y += 8;
  addParagraph(`Printed Name: ${values.party1Name || ""}`);
  addParagraph(`Membership Interest: ${values.party1MembershipInterest || ""}`);
  addParagraph(`Address: ${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`);
  addParagraph(`Email: ${values.party1Email || ""}`);
  if (values.party1Phone) addParagraph(`Phone: ${values.party1Phone}`);
  y += 8;

  // Second Member
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Second Member Signature:", margin, y);
  y += 8;
  const sig2 = values.party2Signature || "";
  doc.setFont("helvetica", "normal");
  doc.text(sig2, margin, y);
  doc.line(margin, y + 1, margin + (sig2 ? doc.getTextWidth(sig2) : 80), y + 1);
  y += 8;
  addParagraph(`Printed Name: ${values.party2Name || ""}`);
  addParagraph(`Membership Interest: ${values.party2MembershipInterest || ""}`);
  addParagraph(`Address: ${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`);
  addParagraph(`Email: ${values.party2Email || ""}`);
  if (values.party2Phone) addParagraph(`Phone: ${values.party2Phone}`);

  if (values.witnessName) {
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Witness:", margin, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text(values.witnessName, margin, y);
    const witnessWidth = doc.getTextWidth(values.witnessName);
    doc.line(margin, y + 1, margin + witnessWidth, y + 1);
    y += 8;
  }

  doc.save("llc_operating_agreement.pdf");
};

export default function LLCOperatingAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="L L C Operating Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="llcoperatingagreement"
    />
  );
}