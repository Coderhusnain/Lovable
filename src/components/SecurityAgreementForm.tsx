import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  // ── Step 1: Agreement Date ──────────────────────────────────────────────
  // Draft: "made and entered into on this ___ day of _______________, ------"
  {
    label: "Step 1: Agreement Date",
    fields: [
      { name: "agreementDay",   label: "Day — e.g. 5th (fills: '...on this ___ day of...')",          type: "text", required: true,  placeholder: "e.g. 5th"     },
      { name: "agreementMonth", label: "Month — e.g. January (fills: '...day of _______________, ')", type: "text", required: true,  placeholder: "e.g. January" },
      { name: "agreementYear",  label: "Year — e.g. 2025 (fills: '..., ------')",                     type: "text", required: true,  placeholder: "e.g. 2025"    },
    ],
  },

  // ── Step 2: Debtor ───────────────────────────────────────────────────────
  // Draft:
  //   Debtor:
  //   Name: ________________________________________________
  //   Address: ________________________________________________
  //   City/State/Zip: ___________________________________________
  {
    label: "Step 2: Debtor",
    fields: [
      { name: "debtorName",         label: "Debtor — Name",           type: "text", required: true,  placeholder: "Full legal name of Debtor"    },
      { name: "debtorAddress",      label: "Debtor — Address",        type: "text", required: true,  placeholder: "Street address"               },
      { name: "debtorCityStateZip", label: "Debtor — City/State/Zip", type: "text", required: true,  placeholder: "City, State, ZIP"             },
    ],
  },

  // ── Step 3: Secured Party ────────────────────────────────────────────────
  // Draft:
  //   Secured Party:
  //   Name: ________________________________________________
  //   Address: ________________________________________________
  //   City/State/Zip: ___________________________________________
  {
    label: "Step 3: Secured Party",
    fields: [
      { name: "securedPartyName",         label: "Secured Party — Name",           type: "text", required: true,  placeholder: "Full legal name of Secured Party" },
      { name: "securedPartyAddress",      label: "Secured Party — Address",        type: "text", required: true,  placeholder: "Street address"                   },
      { name: "securedPartyCityStateZip", label: "Secured Party — City/State/Zip", type: "text", required: true,  placeholder: "City, State, ZIP"                 },
    ],
  },

  // ── Step 4: Promissory Note & Collateral ────────────────────────────────
  // Draft:
  //   RECITALS: "...promissory note in the principal amount of [insert principal amount]"
  //   Section 2.1: "[Insert detailed description of collateral...]"
  {
    label: "Step 4: Promissory Note & Collateral",
    fields: [
      { name: "principalAmount",       label: "Promissory Note — Principal Amount (fills RECITALS & §1.1a)",                                                       type: "text",     required: true,  placeholder: "e.g. $10,000.00"                                          },
      { name: "collateralDescription", label: "Collateral Description (fills §2.1 — describe equipment, vehicles, inventory, etc.)",                               type: "textarea", required: true,  placeholder: "e.g. One (1) 2020 Ford F-150, VIN: 1FTFW1ET5LFA00000"   },
    ],
  },

  // ── Step 5: Location of Collateral ──────────────────────────────────────
  // Draft §3.1:
  //   "The Collateral is or will be located at:"
  //   Address: ____________________________________________
  //   City/State/Zip: _______________________________________
  {
    label: "Step 5: Location of Collateral",
    fields: [
      { name: "collateralAddress",      label: "Collateral Location — Address (fills §3.1: 'Address: ____________')",        type: "text", required: true, placeholder: "Street address where collateral is located" },
      { name: "collateralCityStateZip", label: "Collateral Location — City/State/Zip (fills §3.1: 'City/State/Zip: _____')", type: "text", required: true, placeholder: "City, State, ZIP"                         },
    ],
  },

  // ── Step 6: Governing Law & Notices ─────────────────────────────────────
  // Draft §8: "laws of the State/Province of [insert jurisdiction]"
  //           "obligations...performable in [insert location]"
  // Draft §7.3: "Debtor: ___" / "Secured Party: ___"
  {
    label: "Step 6: Governing Law & Notices",
    fields: [
      { name: "governingJurisdiction",     label: "Governing State / Province (fills §8: '...laws of the State/Province of ___')",          type: "text", required: true, placeholder: "e.g. California"              },
      { name: "performanceLocation",       label: "Performance Location (fills §8: '...obligations...performable in ___')",                  type: "text", required: true, placeholder: "e.g. Los Angeles, California" },
      { name: "noticeAddressDebtor",       label: "Notice Address — Debtor (fills §7.3: 'Debtor: ___')",                                    type: "text", required: true, placeholder: "Full address for notices to Debtor"         },
      { name: "noticeAddressSecuredParty", label: "Notice Address — Secured Party (fills §7.3: 'Secured Party: ___')",                      type: "text", required: true, placeholder: "Full address for notices to Secured Party"  },
    ],
  },

  // ── Step 7: Signatures ───────────────────────────────────────────────────
  // Draft §13 — side-by-side table:
  //   Debtor                          Secured Party
  //   By: __________________________  By: __________________________
  //   Name: ________________________  Name: ________________________
  //   Title (if applicable): _______  Title (if applicable): _______
  //   Date: ________________________  Date: ________________________
  {
    label: "Step 7: Signatures",
    fields: [
      { name: "debtorSigner",    label: "Debtor — By / Name (fills §13 Debtor column: 'By: ___ Name: ___')",                   type: "text", required: true,  placeholder: "Full legal name"                   },
      { name: "debtorTitle",     label: "Debtor — Title if applicable (fills §13: 'Title (if applicable): ___')",              type: "text", required: false, placeholder: "e.g. CEO, Managing Member"         },
      { name: "debtorSignDate",  label: "Debtor — Date (fills §13 Debtor column: 'Date: ___')",                                type: "date", required: true                                                       },
      { name: "securedSigner",   label: "Secured Party — By / Name (fills §13 Secured Party column: 'By: ___ Name: ___')",    type: "text", required: true,  placeholder: "Full legal name"                   },
      { name: "securedTitle",    label: "Secured Party — Title if applicable (fills §13: 'Title (if applicable): ___')",       type: "text", required: false, placeholder: "e.g. CEO, Managing Member"         },
      { name: "securedSignDate", label: "Secured Party — Date (fills §13 Secured Party column: 'Date: ___')",                  type: "date", required: true                                                       },
    ],
  },
];

const generatePDF = (v: Record<string, string>) => {
  const doc   = new jsPDF({ unit: "mm", format: "a4" });
  const w     = 210;
  const m     = 16;
  const tw    = w - m * 2;
  const lh    = 5.5;
  const limit = 278;
  let y = 20;

  // ── helpers ───────────────────────────────────────────────────────────────

  const newPageIfNeeded = (need: number) => {
    if (y + need > limit) { doc.addPage(); y = 20; }
  };

  const val = (key: string, fallback = "________________________") =>
    (v[key] || "").trim() || fallback;

  // paragraph
  const p = (text: string, bold = false, gap = 2.0) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text(lines, m, y);
    y += lines.length * lh + gap;
  };

  // indented paragraph (for sub-clauses a/b/c)
  const pi = (text: string, indent = 6, gap = 1.8) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw - indent);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text(lines, m + indent, y);
    y += lines.length * lh + gap;
  };

  // bullet
  const bullet = (text: string, gap = 1.8) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw - 6);
    newPageIfNeeded(lines.length * lh + gap);
    doc.text("\u2022", m + 2, y);
    doc.text(lines, m + 6, y);
    y += lines.length * lh + gap;
  };

  // horizontal divider
  const divider = () => {
    y += 1.5;
    newPageIfNeeded(3);
    doc.setLineWidth(0.25);
    doc.line(m, y, w - m, y);
    y += 3.5;
  };

  // bold section heading
  const heading = (text: string, gapBefore = 1, gapAfter = 1.5) => {
    y += gapBefore;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(text, tw);
    newPageIfNeeded(lines.length * lh + gapAfter);
    doc.text(lines, m, y);
    y += lines.length * lh + gapAfter;
  };

  // underline field label: value ___
  const uf = (label: string, value?: string, lineLen = 26, gap = 1.8) => {
    const shown = (value || "").trim();
    newPageIfNeeded(lh + gap);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lt = `${label}: `;
    doc.text(lt, m, y);
    const x = m + doc.getTextWidth(lt);
    doc.setLineWidth(0.22);
    if (shown) {
      doc.text(shown, x, y);
      doc.line(x, y + 1.1, x + Math.max(doc.getTextWidth("_".repeat(lineLen)), doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(x, y + 1.1, x + doc.getTextWidth("_".repeat(lineLen)), y + 1.1);
    }
    y += lh + gap;
  };

  // ── Title ─────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const title = "SECURITY AGREEMENT";
  doc.text(title, w / 2, y, { align: "center" });
  const tW = doc.getTextWidth(title);
  doc.setLineWidth(0.5);
  doc.line(w / 2 - tW / 2, y + 1.5, w / 2 + tW / 2, y + 1.5);
  y += 10;

  // ── Opening ───────────────────────────────────────────────────────────────
  // Draft: "...on this ___ day of _______________, ------, by and between:"
  const agreementDate = `${val("agreementDay", "___")} day of ${val("agreementMonth", "_______________")}, ${val("agreementYear", "------")}`;
  p(`This Security Agreement (\u201cAgreement\u201d) is made and entered into on this ${agreementDate}, by and between:`);
  y += 1;

  // Debtor block
  p("Debtor:", true, 1);
  uf("Name",           v.debtorName,         40);
  uf("Address",        v.debtorAddress,      40);
  uf("City/State/Zip", v.debtorCityStateZip, 40);
  y += 1;
  p("AND", false, 1);
  y += 1;

  // Secured Party block
  p("Secured Party:", true, 1);
  uf("Name",           v.securedPartyName,            40);
  uf("Address",        v.securedPartyAddress,         40);
  uf("City/State/Zip", v.securedPartyCityStateZip,    40);
  y += 1;
  p(`Each individually referred to as a \u201cParty\u201d and collectively as the \u201cParties.\u201d`);

  divider();

  // ── RECITALS ──────────────────────────────────────────────────────────────
  heading("RECITALS");
  p(`WHEREAS, the Debtor is indebted to the Secured Party pursuant to a promissory note in the principal amount of ${val("principalAmount", "[insert principal amount]")}, together with all other obligations of the Debtor, whether presently existing or hereafter arising; and`);
  p("WHEREAS, the Debtor desires to grant a security interest in certain property described herein as collateral to secure the full and prompt payment and performance of all such obligations; and");
  p("WHEREAS, the Secured Party agrees to accept said collateral as security for the obligations of the Debtor, subject to the terms and conditions of this Agreement.");
  p("NOW, THEREFORE, in consideration of the mutual covenants contained herein and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:");

  divider();

  // ── 1. CREATION OF SECURITY INTEREST ─────────────────────────────────────
  heading("1. CREATION OF SECURITY INTEREST");
  p(`1.1 The Debtor hereby grants, assigns, and conveys to the Secured Party a continuing security interest in the property described in Clause 2 below (\u201cCollateral\u201d), as security for:`);
  pi(`(a) Payment and performance of Debtor\u2019s obligations under the promissory note in the principal amount of ${val("principalAmount", "[insert amount]")}; and`);
  pi(`(b) Payment and performance of all other liabilities, debts, and obligations of every kind and nature now existing or hereafter arising between the Debtor and the Secured Party, whether direct or indirect, absolute or contingent, and whether due or to become due (collectively, the \u201cObligations\u201d).`);
  p("1.2 This security interest shall attach upon the execution of this Agreement and shall remain in effect until all Obligations have been fully satisfied.");

  divider();

  // ── 2. COLLATERAL ─────────────────────────────────────────────────────────
  heading("2. COLLATERAL");
  p("2.1 The Collateral subject to this Agreement includes the following described property:");
  p(val("collateralDescription", "[Insert detailed description of collateral \u2013 e.g., equipment, vehicles, inventory, receivables, or personal property]"));
  p("2.2 The Collateral also includes:");
  pi("(a) All replacements, substitutions, accessions, and additions to the property described above;");
  pi("(b) All proceeds (including insurance proceeds) arising from the sale, lease, or other disposition of the Collateral; and");
  pi("(c) All rights and interests which the Debtor now owns or hereafter acquires in connection with the Collateral.");

  divider();

  // ── 3. LOCATION OF COLLATERAL ─────────────────────────────────────────────
  heading("3. LOCATION OF COLLATERAL");
  p("3.1 The Collateral is or will be located at:");
  uf("Address",        v.collateralAddress,      40);
  uf("City/State/Zip", v.collateralCityStateZip, 40);
  p("3.2 The Debtor shall not remove or relocate the Collateral from the above location except in the ordinary course of business or with the prior written consent of the Secured Party.");

  divider();

  // ── 4. DEBTOR'S REPRESENTATIONS, WARRANTIES, AND COVENANTS ───────────────
  heading("4. DEBTOR\u2019S REPRESENTATIONS, WARRANTIES, AND COVENANTS");
  p("The Debtor hereby represents, warrants, and covenants that:");
  p("4.1 Ownership and Authority: The Debtor is the lawful owner of the Collateral, free and clear of all liens, encumbrances, and adverse claims, except as disclosed herein.");
  p("4.2 Payment Obligations: The Debtor shall duly and punctually pay to the Secured Party the amounts evidenced by the promissory note and all other Obligations in accordance with their respective terms.");
  p("4.3 Maintenance and Insurance: The Debtor shall:");
  bullet("Maintain the Collateral in good working order and condition, making all necessary repairs, replacements, and improvements.");
  bullet("Keep the Collateral insured at all times against fire, theft, loss, and such other risks and in such amounts as may be reasonably required by the Secured Party.");
  bullet("Furnish proof of insurance upon request by the Secured Party.");
  p("4.4 Preservation of Collateral: The Debtor shall not sell, transfer, assign, or otherwise dispose of the Collateral or any interest therein without the prior written consent of the Secured Party.");
  p("4.5 Taxes and Liens: The Debtor shall keep the Collateral free from all unpaid taxes, charges, and liens, and shall pay all assessments or levies relating thereto when due.");
  p("4.6 Notification: The Debtor shall immediately notify the Secured Party in writing of any change in its address or any event that may materially affect the Collateral.");

  divider();

  // ── 5. DEFAULT ────────────────────────────────────────────────────────────
  heading("5. DEFAULT");
  p("5.1 The Debtor shall be deemed in default under this Agreement upon the occurrence of any of the following events:");
  pi("(a) Failure to make payment or perform any obligation when due under the promissory note or this Agreement;");
  pi("(b) Breach of any covenant, warranty, or representation contained herein;");
  pi("(c) Insolvency, bankruptcy, or assignment for the benefit of creditors by the Debtor; or");
  pi("(d) Any attempt by the Debtor to sell, transfer, or encumber the Collateral in violation of this Agreement.");
  p("5.2 Remedies Upon Default:");
  p("Upon default, the Secured Party may, at its sole discretion, declare all Obligations immediately due and payable and may exercise any and all rights available under applicable law, including but not limited to:");
  pi("(a) Taking possession of the Collateral with or without judicial process;");
  pi("(b) Selling, leasing, or otherwise disposing of the Collateral in a commercially reasonable manner; and");
  pi("(c) Applying the proceeds of any disposition to the satisfaction of the Obligations, with any surplus returned to the Debtor and any deficiency remaining due from the Debtor.");

  divider();

  // ── 6. WAIVER ─────────────────────────────────────────────────────────────
  heading("6. WAIVER");
  p("No waiver by the Secured Party of any default or breach shall operate as a waiver of any subsequent default or breach, and no delay or omission on the part of the Secured Party in exercising any right or remedy shall impair such right or be construed as a waiver thereof.");

  divider();

  // ── 7. NOTICES ────────────────────────────────────────────────────────────
  heading("7. NOTICES");
  p("7.1 All notices or communications required under this Agreement shall be made in writing and delivered either:");
  pi("(a) Personally;");
  pi("(b) By registered or certified mail, postage prepaid, return receipt requested; or");
  pi("(c) By reputable courier or electronic mail with confirmation of receipt.");
  p("7.2 Notice shall be deemed given:");
  bullet("On the date of delivery if delivered personally;");
  bullet("Three (3) business days after mailing if sent by certified mail; or");
  bullet("Upon confirmed transmission if sent electronically.");
  p("7.3 The address of each Party for the purpose of receiving notice shall be:");
  uf("Debtor",         v.noticeAddressDebtor,       40);
  uf("Secured Party",  v.noticeAddressSecuredParty, 40);
  p("Either Party may change its address for notice purposes by giving written notice to the other Party in accordance with this Clause.");

  divider();

  // ── 8. GOVERNING LAW AND JURISDICTION ────────────────────────────────────
  heading("8. GOVERNING LAW AND JURISDICTION");
  p(`This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State/Province of ${val("governingJurisdiction", "[insert jurisdiction]")}, and all obligations hereunder shall be performable in ${val("performanceLocation", "[insert location]")}.`);
  p("Each Party hereby consents to the exclusive jurisdiction of the courts located in said jurisdiction for the resolution of any disputes arising out of or relating to this Agreement.");

  divider();

  // ── 9. BINDING EFFECT ─────────────────────────────────────────────────────
  heading("9. BINDING EFFECT");
  p("This Agreement shall be binding upon and inure to the benefit of the Parties hereto and their respective heirs, executors, administrators, legal representatives, successors, and permitted assigns.");

  divider();

  // ── 10. SEVERABILITY ──────────────────────────────────────────────────────
  heading("10. SEVERABILITY");
  p("If any provision of this Agreement is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed, and the remaining provisions shall continue in full force and effect.");

  divider();

  // ── 11. ENTIRE AGREEMENT ──────────────────────────────────────────────────
  heading("11. ENTIRE AGREEMENT");
  p("This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior agreements, representations, and understandings, whether oral or written.");
  p("No amendment or modification of this Agreement shall be valid unless made in writing and executed by both Parties.");

  divider();

  // ── 12. ATTORNEY'S FEES ───────────────────────────────────────────────────
  heading("12. ATTORNEY\u2019S FEES");
  p("In the event of any dispute or legal action arising out of this Agreement, the prevailing party shall be entitled to recover from the other Party all reasonable attorney\u2019s fees, court costs, and expenses incurred in enforcing or defending its rights hereunder.");

  divider();

  // ── 13. EXECUTION ─────────────────────────────────────────────────────────
  heading("13. EXECUTION");
  p("This Agreement shall be executed on behalf of the Debtor and the Secured Party as follows and shall be effective as of the date first written above.");

  // Side-by-side signature table
  y += 2;
  newPageIfNeeded(40);
  const col1 = m;
  const col2 = m + tw / 2 + 4;
  const colW = tw / 2 - 4;

  const sigLine = (label: string, value: string | undefined, x: number) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lt = `${label}: `;
    doc.text(lt, x, y);
    const lx = x + doc.getTextWidth(lt);
    const shown = (value || "").trim();
    const lineW = colW - doc.getTextWidth(lt);
    doc.setLineWidth(0.22);
    if (shown) {
      doc.text(shown, lx, y);
      doc.line(lx, y + 1.1, lx + Math.max(lineW, doc.getTextWidth(shown)), y + 1.1);
    } else {
      doc.line(lx, y + 1.1, lx + lineW, y + 1.1);
    }
  };

  // Headers
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Debtor", col1, y);
  doc.text("Secured Party", col2, y);
  y += lh + 1.5;

  // By row
  sigLine("By", v.debtorSigner,  col1);
  sigLine("By", v.securedSigner, col2);
  y += lh + 2;

  // Name row
  sigLine("Name", v.debtorSigner,  col1);
  sigLine("Name", v.securedSigner, col2);
  y += lh + 2;

  // Title row
  sigLine("Title (if applicable)", v.debtorTitle,  col1);
  sigLine("Title (if applicable)", v.securedTitle, col2);
  y += lh + 2;

  // Date row
  sigLine("Date", v.debtorSignDate,  col1);
  sigLine("Date", v.securedSignDate, col2);
  y += lh + 3;

  divider();

  // ── ACKNOWLEDGMENT ────────────────────────────────────────────────────────
  heading("ACKNOWLEDGMENT");
  p("The Parties acknowledge that they have carefully read this Agreement, fully understand its terms, and voluntarily execute it with the intent to be legally bound.");

  doc.save("security_agreement.pdf");
};

export default function SecurityAgreementForm() {
  return (
    <FormWizard
      steps={steps}
      title="Security Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="securityagreement"
      preserveStepLayout
    />
  );
}