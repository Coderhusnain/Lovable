import { FormWizard, FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  {
    label: "Effective Date & Parties",
    fields: [
      { name: "effectiveDate", label: "Effective date", type: "date", required: true },
      { name: "landlordName",  label: "Landlord full legal name", type: "text", required: true, placeholder: "Landlord full name" },
      { name: "tenantName",    label: "Tenant full legal name",   type: "text", required: true, placeholder: "Tenant full name" },
    ],
  },
  {
    label: "Premises & Term",
    fields: [
      { name: "premisesAddress",    label: "Premises full address (clause 1)",              type: "text", required: true,  placeholder: "Full address of condominium unit" },
      { name: "commencementDate",   label: "Lease commencement date (clause 2)",            type: "date", required: true },
      { name: "terminationDate",    label: "Lease termination date (clause 2)",             type: "date", required: true },
      { name: "terminationSaleDays",label: "Days' notice for sale termination (clause 21)", type: "text", required: false, placeholder: "e.g. 30" },
      { name: "earlyTermDays",      label: "Early termination notice days (clause 22)",     type: "text", required: false, placeholder: "e.g. 60" },
    ],
  },
  {
    label: "Management & Rent",
    fields: [
      { name: "propertyManager",  label: "Property manager name (clause 3)",              type: "text", required: false, placeholder: "Property manager name" },
      { name: "managerContact",   label: "Property manager contact / address (clause 3)", type: "text", required: false, placeholder: "Contact info" },
      { name: "monthlyRent",      label: "Monthly rent amount $ (clause 4a)",             type: "text", required: true,  placeholder: "e.g. 2500.00" },
      { name: "rentDueDay",       label: "Rent due day of month (clause 4a)",             type: "text", required: false, placeholder: "e.g. 1" },
      { name: "paymentMethods",   label: "Accepted payment methods (clause 4b)",          type: "text", required: false, placeholder: "e.g. Bank transfer, cheque" },
    ],
  },
  {
    label: "Deposit, Occupants & Keys",
    fields: [
      { name: "securityDeposit",  label: "Security deposit amount $ (clause 5)",      type: "text", required: false, placeholder: "e.g. 5000.00" },
      { name: "maxOccupants",     label: "Maximum number of occupants (clause 7)",     type: "text", required: false, placeholder: "e.g. 2" },
      { name: "guestConsecDays",  label: "Max consecutive guest days (clause 7)",      type: "text", required: false, placeholder: "e.g. 7" },
      { name: "guestAnnualDays",  label: "Max total guest days annually (clause 7)",   type: "text", required: false, placeholder: "e.g. 14" },
      { name: "keysCount",        label: "Number of premises keys (clause 10)",        type: "text", required: false, placeholder: "e.g. 2" },
      { name: "mailboxKeysCount", label: "Number of mailbox keys (clause 10)",         type: "text", required: false, placeholder: "e.g. 1" },
      { name: "keyCharge",        label: "Unreturned key charge $ (clause 10)",        type: "text", required: false, placeholder: "e.g. 50.00" },
    ],
  },
  {
    label: "Financial Details",
    fields: [
      { name: "lockoutCharge",         label: "Lockout assistance charge $ (clause 11)",         type: "text",     required: false, placeholder: "e.g. 75.00" },
      { name: "returnedCheckFee",      label: "Returned check fee $ (clause 19)",                type: "text",     required: false, placeholder: "e.g. 35.00" },
      { name: "earlyTermFee",          label: "Early termination fee $ (clause 22)",             type: "text",     required: false, placeholder: "e.g. 2000.00" },
      { name: "destructionRepairCost", label: "Destruction repair cost threshold $ (clause 24)", type: "text",     required: false, placeholder: "e.g. 10000.00" },
      { name: "furnishings",           label: "Furnishings/appliances provided by Landlord (clause 8)", type: "textarea", required: false, placeholder: "e.g. Refrigerator, stove, dishwasher" },
      { name: "damageItem",            label: "Damaged item description (clause 9 table)",       type: "text",     required: false, placeholder: "e.g. Carpet" },
      { name: "damageCharge",          label: "Damage charge $ (clause 9 table)",                type: "text",     required: false, placeholder: "e.g. 500.00" },
    ],
  },
  {
    label: "Utilities & Legal",
    fields: [
      { name: "landlordUtilities", label: "Landlord utility responsibilities (clause 16)", type: "text",     required: false, placeholder: "e.g. Building maintenance, common area lighting" },
      { name: "governingState",    label: "Governing state (clause 38)",                   type: "text",     required: true,  placeholder: "e.g. California" },
      { name: "governingCountry",  label: "Governing country (clause 38)",                 type: "text",     required: false, placeholder: "e.g. US" },
      { name: "disputeResolution", label: "Dispute resolution method (clause 45)",         type: "select",   required: true,
        options: [
          { value: "mediation",   label: "Mediation" },
          { value: "arbitration", label: "Binding Arbitration" },
          { value: "litigation",  label: "Court Litigation" },
          { value: "negotiation", label: "Good Faith Negotiation" },
        ],
      },
      { name: "additionalTerms",   label: "Additional terms & conditions (optional)",      type: "textarea", required: false, placeholder: "Any extra provisions..." },
    ],
  },
  {
    label: "Signatures",
    fields: [
      { name: "landlordStreet",    label: "Landlord street address (clause 37)",  type: "text", required: false, placeholder: "123 Owner Street" },
      { name: "landlordCity",      label: "Landlord city",                        type: "text", required: false, placeholder: "City" },
      { name: "landlordZip",       label: "Landlord ZIP / postal code",           type: "text", required: false, placeholder: "ZIP" },
      { name: "tenantStreet",      label: "Tenant street address (clause 37)",    type: "text", required: false, placeholder: "123 Tenant Street" },
      { name: "tenantCity",        label: "Tenant city",                          type: "text", required: false, placeholder: "City" },
      { name: "tenantZip",         label: "Tenant ZIP / postal code",             type: "text", required: false, placeholder: "ZIP" },
      { name: "landlordSignature", label: "Landlord signature (type full name)",  type: "text", required: true,  placeholder: "Type full legal name" },
      { name: "tenantSignature",   label: "Tenant signature (type full name)",    type: "text", required: true,  placeholder: "Type full legal name" },
      { name: "witnessName",       label: "Witness name (optional)",              type: "text", required: false, placeholder: "Witness full legal name" },
    ],
  },
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, ML = 15, MR = 15, MT = 15, MB = 15, TW = W - ML - MR;
  const LH = 5.5, LHH = 6.5, FS = 9;
  let y = MT;

  const checkBreak = (n = LH) => { if (y + n > 297 - MB) { doc.addPage(); y = MT; } };
  const gap = (n = 2) => { y += n; };

  // Draw underline beneath text at (x, curY)
  const ul = (text: string, x: number, curY: number) => {
    doc.setLineWidth(0.18);
    doc.setDrawColor(0, 0, 0);
    doc.line(x, curY + 0.9, x + doc.getTextWidth(text), curY + 0.9);
  };

  // Return filled value or underscores
  const v = (key: string, n = 14) => (values[key] || "").trim() || "_".repeat(n);
  const filled = (key: string) => !!(values[key] || "").trim();

  /**
   * Render mixed segments inline with wrapping.
   * segments: array of { t: string, ul?: boolean }
   * Underlined segments get a line drawn beneath them wherever they land.
   */
  const seg = (segments: { t: string; ul?: boolean }[], indent = 0, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(FS);
    doc.setDrawColor(0, 0, 0);
    doc.setTextColor(0, 0, 0);

    // Build full string + track underline char ranges
    let full = "";
    const ulRanges: { s: number; e: number }[] = [];
    for (const s of segments) {
      const start = full.length;
      full += s.t;
      if (s.ul) ulRanges.push({ s: start, e: full.length });
    }

    const lines = doc.splitTextToSize(full, TW - indent);
    let pos = 0;
    for (const line of lines) {
      checkBreak(LH);
      doc.text(line, ML + indent, y);
      const lineEnd = pos + line.length;
      for (const r of ulRanges) {
        const os = Math.max(r.s, pos);
        const oe = Math.min(r.e, lineEnd);
        if (os < oe) {
          const before = line.substring(0, os - pos);
          const word   = line.substring(os - pos, oe - pos);
          ul(word, ML + indent + doc.getTextWidth(before), y);
        }
      }
      pos += line.length;
      if (pos < full.length && full[pos] === " ") pos++;
      y += LH;
    }
  };

  // Plain paragraph (no underlines)
  const p = (text: string, bold = false, indent = 0) => seg([{ t: text }], indent, bold);

  // Bold heading
  const heading = (text: string) => {
    gap(3); checkBreak(LHH + 2);
    doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(0,0,0);
    doc.text(text, ML, y); y += LHH;
  };

  // Bullet point (no underlines needed in fixed bullets)
  const bullet = (text: string, indent = 0) => {
    doc.setFont("helvetica", "normal"); doc.setFontSize(FS); doc.setTextColor(0,0,0);
    const lines = doc.splitTextToSize(text, TW - 8 - indent);
    checkBreak(LH);
    doc.text("\u2022", ML + 4 + indent, y);
    doc.text(lines[0], ML + 8 + indent, y); y += LH;
    for (let i = 1; i < lines.length; i++) { checkBreak(LH); doc.text(lines[i], ML + 8 + indent, y); y += LH; }
  };

  // Bold label + underlined user value
  const labelVal = (label: string, key: string, n = 16) => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(FS); doc.setTextColor(0,0,0);
    checkBreak(LH);
    doc.text(label, ML, y);
    const lw = doc.getTextWidth(label);
    doc.setFont("helvetica", "normal");
    const vv = v(key, n);
    const vlines = doc.splitTextToSize(vv, TW - lw - 1);
    doc.text(vlines[0], ML + lw + 1, y);
    if (filled(key)) ul(vlines[0], ML + lw + 1, y);
    y += LH;
    for (let i = 1; i < vlines.length; i++) {
      checkBreak(LH); doc.text(vlines[i], ML + lw + 1, y);
      if (filled(key)) ul(vlines[i], ML + lw + 1, y);
      y += LH;
    }
  };

  // ── TITLE ──────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold"); doc.setFontSize(14); doc.setTextColor(0,0,0);
  doc.text("CONDOMINIUM LEASE AGREEMENT", W / 2, y, { align: "center" });
  const tw = doc.getTextWidth("CONDOMINIUM LEASE AGREEMENT");
  doc.setLineWidth(0.4); doc.line(W/2 - tw/2, y+1, W/2 + tw/2, y+1);
  y += 9;

  // ── PREAMBLE ────────────────────────────────────────────────────────────
  seg([
    { t: 'This Condominium Lease Agreement (the "Agreement") is entered into on ' },
    { t: v("effectiveDate", 12), ul: filled("effectiveDate") },
    { t: ' (the "Effective Date"),' },
  ]);
  p("By and Between");
  seg([
    { t: v("landlordName", 20), ul: filled("landlordName") },
    { t: ' (the "Landlord") and ' },
    { t: v("tenantName", 20), ul: filled("tenantName") },
    { t: ' (the "Tenant"), collectively referred to as the "Parties."' },
  ]);
  p("For and in consideration of the mutual covenants and conditions set forth herein, the Parties hereby agree as follows:");

  // ── 1. PREMISES ────────────────────────────────────────────────────────
  heading("1. PREMISES");
  seg([
    { t: "Landlord hereby leases to Tenant the condominium unit located at " },
    { t: v("premisesAddress", 24), ul: filled("premisesAddress") },
    { t: ' (the "Premises"), together with any common elements, improvements, or fixtures expressly stated herein. No additional portion of the building (the "Building") is included unless otherwise agreed upon in writing.' },
  ]);

  // ── 2. TERM ────────────────────────────────────────────────────────────
  heading("2. TERM");
  seg([
    { t: "The lease term shall commence on " },
    { t: v("commencementDate", 12), ul: filled("commencementDate") },
    { t: ' (the "Commencement Date") and terminate on ' },
    { t: v("terminationDate", 12), ul: filled("terminationDate") },
    { t: ". Thereafter, the lease shall continue on a month-to-month basis under the same terms and conditions unless otherwise modified by law or written agreement." },
  ]);
  gap();
  p("Tenant shall vacate the Premises upon lease termination unless:");
  bullet("(i) A written extension or renewal is executed;");
  bullet("(ii) Required by rent control legislation; or");
  bullet("(iii) Landlord accepts Rent post-term, thereby establishing a month-to-month tenancy, terminable by either party with thirty (30) days\u2019 prior written notice.");

  // ── 3. MANAGEMENT ──────────────────────────────────────────────────────
  heading("3. MANAGEMENT");
  seg([
    { t: "Tenant is notified that " },
    { t: v("propertyManager", 16), ul: filled("propertyManager") },
    { t: " is the designated property manager. Any concerns or communications may be directed to " },
    { t: v("propertyManager", 14), ul: filled("propertyManager") },
    { t: " at " },
    { t: v("managerContact", 16), ul: filled("managerContact") },
    { t: "." },
  ]);

  // ── 4. RENT ────────────────────────────────────────────────────────────
  heading("4. RENT");
  p('"Rent" includes all monetary obligations except for the Security Deposit.');
  gap();
  seg([
    { t: "(a) Tenant shall remit monthly rent in the amount of $" },
    { t: v("monthlyRent", 8), ul: filled("monthlyRent") },
    { t: ", due in advance on the " },
    { t: v("rentDueDay", 2), ul: filled("rentDueDay") },
    { t: " day of each calendar month. Rent is deemed delinquent if not received by the following day." },
  ]);
  gap();
  seg([
    { t: "(b) Accepted payment method(s): " },
    { t: v("paymentMethods", 14), ul: filled("paymentMethods") },
    { t: ". In the event of a returned payment:" },
  ]);
  bullet("(i) Landlord may require cash payments for three consecutive months; and");
  bullet("(ii) All future rent must be made via money order or cashier\u2019s check.");

  // ── 5. SECURITY DEPOSIT ────────────────────────────────────────────────
  heading("5. SECURITY DEPOSIT");
  seg([
    { t: "Tenant shall deposit with Landlord the sum of $" },
    { t: v("securityDeposit", 8), ul: filled("securityDeposit") },
    { t: " as a Security Deposit to secure faithful performance under this Agreement. Said deposit shall be governed by applicable statutes." },
  ]);

  // ── 6. POSSESSION ──────────────────────────────────────────────────────
  heading("6. POSSESSION");
  p("Tenant shall receive possession on the Commencement Date and shall surrender possession upon lease termination, removing all personal belongings and restoring the Premises to original condition, less reasonable wear and tear.");

  // ── 7. OCCUPANTS ───────────────────────────────────────────────────────
  heading("7. OCCUPANTS");
  seg([
    { t: "No more than " },
    { t: v("maxOccupants", 2), ul: filled("maxOccupants") },
    { t: " person(s) may reside at the Premises without prior written consent from the Landlord. This lease shall bind all signatories regardless of occupancy status." },
  ]);
  gap();
  // "Guest Limitations:" bold label then underlined values inline
  doc.setFont("helvetica", "bold"); doc.setFontSize(FS); doc.setTextColor(0,0,0);
  checkBreak(LH);
  const glLabel = "Guest Limitations: ";
  doc.text(glLabel, ML, y);
  const glLabelW = doc.getTextWidth(glLabel);
  doc.setFont("helvetica", "normal");
  // Render rest as seg starting at offset
  const glSegs: { t: string; ul?: boolean }[] = [
    { t: "Guests may not remain more than " },
    { t: v("guestConsecDays", 2), ul: filled("guestConsecDays") },
    { t: " consecutive days or more than " },
    { t: v("guestAnnualDays", 2), ul: filled("guestAnnualDays") },
    { t: " total days annually. No more than two guests per bedroom are allowed at any time. Longer stays require written consent." },
  ];
  let glFull = "";
  const glRanges: { s: number; e: number }[] = [];
  for (const s of glSegs) {
    const st = glFull.length; glFull += s.t;
    if (s.ul) glRanges.push({ s: st, e: glFull.length });
  }
  const glLines = doc.splitTextToSize(glFull, TW - glLabelW - 1);
  let glPos = 0;
  for (let li = 0; li < glLines.length; li++) {
    const line = glLines[li];
    const startX = li === 0 ? ML + glLabelW + 1 : ML;
    checkBreak(LH);
    doc.text(line, startX, y);
    const lineEnd = glPos + line.length;
    for (const r of glRanges) {
      const os = Math.max(r.s, glPos), oe = Math.min(r.e, lineEnd);
      if (os < oe) {
        const before = line.substring(0, os - glPos);
        const word   = line.substring(os - glPos, oe - glPos);
        ul(word, startX + doc.getTextWidth(before), y);
      }
    }
    glPos += line.length;
    if (glPos < glFull.length && glFull[glPos] === " ") glPos++;
    y += LH;
  }

  // ── 8. FURNISHINGS ─────────────────────────────────────────────────────
  heading("8. FURNISHINGS");
  seg([
    { t: "The following furnishings and/or appliances shall be provided by Landlord: " },
    { t: v("furnishings", 20), ul: filled("furnishings") },
    { t: "." },
  ]);
  gap();
  p("Tenant shall return all such items in original condition, ordinary wear and tear excepted.");

  // ── 9. DAMAGES ─────────────────────────────────────────────────────────
  heading("9. DAMAGES");
  p("The following items, if damaged, shall incur the following charges:");
  gap(1);
  doc.setFont("helvetica", "bold"); doc.setFontSize(FS); doc.setTextColor(0,0,0);
  checkBreak(LH);
  doc.text("Item", ML + 4, y); doc.text("Charge", ML + 90, y); y += LH;
  doc.setLineWidth(0.2); doc.line(ML, y, ML + TW, y); y += 1;
  doc.setFont("helvetica", "normal"); doc.setFontSize(FS);
  checkBreak(LH);
  const dItem   = v("damageItem", 16);
  const dCharge = "$" + v("damageCharge", 10);
  doc.text(dItem, ML + 4, y);   if (filled("damageItem"))   ul(dItem, ML + 4, y);
  doc.text(dCharge, ML + 90, y); if (filled("damageCharge")) ul(dCharge, ML + 90, y);
  y += LH;

  // ── 10. KEYS ───────────────────────────────────────────────────────────
  heading("10. KEYS");
  seg([
    { t: "Tenant shall receive " },
    { t: v("keysCount", 2),        ul: filled("keysCount") },
    { t: " key(s) to the Premises and " },
    { t: v("mailboxKeysCount", 2), ul: filled("mailboxKeysCount") },
    { t: " mailbox key(s). A $" },
    { t: v("keyCharge", 6),        ul: filled("keyCharge") },
    { t: " charge applies for unreturned keys. Lock changes require prior approval and duplicate keys must be furnished to Landlord." },
  ]);

  // ── 11. LOCKOUT ────────────────────────────────────────────────────────
  heading("11. LOCKOUT");
  seg([
    { t: "Tenant shall pay $" },
    { t: v("lockoutCharge", 6), ul: filled("lockoutCharge") },
    { t: " for lockout assistance." },
  ]);

  // ── 12. SMOKING ────────────────────────────────────────────────────────
  heading("12. SMOKING");
  p("Smoking is strictly prohibited within or around the Premises, including common areas. Violations constitute a breach, subjecting Tenant to legal remedies including eviction.");

  // ── 13. STORAGE ────────────────────────────────────────────────────────
  heading("13. STORAGE");
  p("No exterior storage is included or authorized under this Agreement.");

  // ── 14. PARKING ────────────────────────────────────────────────────────
  heading("14. PARKING");
  p("No parking rights are conferred by this Lease.");

  // ── 15. MAINTENANCE ────────────────────────────────────────────────────
  heading("15. MAINTENANCE");
  p("Landlord shall maintain the Premises in good repair and in accordance with applicable habitability standards. Except in emergencies, maintenance requests must be submitted in writing.");

  // ── 16. UTILITIES & SERVICES ───────────────────────────────────────────
  heading("16. UTILITIES & SERVICES");
  labelVal("Landlord Responsibilities: ", "landlordUtilities", 20);
  gap();
  p("Tenant Responsibilities:", true);
  bullet("Electricity");
  bullet("Water & Sewer");
  bullet("Gas");
  bullet("Heating");
  bullet("Trash Removal");
  bullet("Telephone");
  bullet("Cable");
  bullet("Internet");

  // ── 17. TAXES ──────────────────────────────────────────────────────────
  heading("17. TAXES");
  p("Real Estate Taxes: Landlord\u2019s responsibility.");
  p("Personal Property Taxes: Landlord shall pay any such taxes attributable to Tenant\u2019s use of the Premises.");

  // ── 18. INSURANCE ──────────────────────────────────────────────────────
  heading("18. INSURANCE");
  p("Both parties shall maintain appropriate insurance coverage for their respective property and liabilities.");

  // ── 19. RETURNED PAYMENTS ──────────────────────────────────────────────
  heading("19. RETURNED PAYMENTS");
  seg([
    { t: "Each returned check incurs a $" },
    { t: v("returnedCheckFee", 6), ul: filled("returnedCheckFee") },
    { t: " fee. Repeated occurrences are subject to Lease default provisions." },
  ]);

  // ── 20. DEFAULT ────────────────────────────────────────────────────────
  heading("20. DEFAULT");
  p("Tenant shall be in default upon any lease breach. A 5-day cure period shall apply to financial defaults and 10 days for non-monetary defaults. Cured defaults shall include all related legal and administrative costs.");

  // ── 21. TERMINATION ON SALE ────────────────────────────────────────────
  heading("21. TERMINATION ON SALE");
  seg([
    { t: "Landlord may terminate the Lease with " },
    { t: v("terminationSaleDays", 4), ul: filled("terminationSaleDays") },
    { t: " days\u2019 written notice in the event of a bona fide sale of the Premises." },
  ]);

  // ── 22. EARLY TERMINATION ──────────────────────────────────────────────
  heading("22. EARLY TERMINATION");
  seg([
    { t: "Tenant may terminate with " },
    { t: v("earlyTermDays", 4), ul: filled("earlyTermDays") },
    { t: " days\u2019 written notice and payment of a $" },
    { t: v("earlyTermFee", 8), ul: filled("earlyTermFee") },
    { t: " early termination fee, subject to local law." },
  ]);

  // ── 23. MILITARY TERMINATION ───────────────────────────────────────────
  heading("23. MILITARY TERMINATION");
  p("Tenant in active military service may terminate upon thirty (30) days\u2019 written notice, along with a copy of deployment or relocation orders.");

  // ── 24. DESTRUCTION OR CONDEMNATION ───────────────────────────────────
  heading("24. DESTRUCTION OR CONDEMNATION");
  seg([
    { t: "If the Premises become uninhabitable and cannot be repaired within 60 days or cost exceeds $" },
    { t: v("destructionRepairCost", 10), ul: filled("destructionRepairCost") },
    { t: ", the Lease shall terminate, and rent shall abate accordingly." },
  ]);

  // ── 25. HABITABILITY ───────────────────────────────────────────────────
  heading("25. HABITABILITY");
  p("Tenant affirms the Premises are habitable upon occupancy. If the condition materially changes, Tenant must notify Landlord promptly.");

  // ── 26. HOLDOVER ───────────────────────────────────────────────────────
  heading("26. HOLDOVER");
  p("Any holdover beyond the lease term shall create a month-to-month tenancy at the most recent rent amount.");

  // ── 27. CUMULATIVE RIGHTS ──────────────────────────────────────────────
  heading("27. CUMULATIVE RIGHTS");
  p("All rights under this Agreement are cumulative and non-exclusive unless otherwise mandated by law.");

  // ── 28. IMPROVEMENTS ──────────────────────────────────────────────────
  heading("28. IMPROVEMENTS");
  p("Tenant shall not alter or improve the Premises without Landlord\u2019s prior written consent. Any approved alterations must be removed or restored at lease-end, as directed by Landlord.");

  // ── 29. LANDLORD ACCESS ────────────────────────────────────────────────
  heading("29. LANDLORD ACCESS");
  p("With reasonable notice, Landlord may enter the Premises for inspections, maintenance, or showing. Consent shall not be unreasonably withheld. Emergency access is permitted without notice.");

  // ── 30. INDEMNIFICATION ────────────────────────────────────────────────
  heading("30. INDEMNIFICATION");
  p("Tenant agrees to indemnify and hold harmless Landlord against claims or losses arising from Tenant\u2019s use or occupancy, except where due to Landlord\u2019s gross negligence.");

  // ── 31. ACCOMMODATION ─────────────────────────────────────────────────
  heading("31. ACCOMMODATION");
  p("Landlord shall provide reasonable accommodations for tenants with disabilities in accordance with applicable laws.");

  // ── 32. HAZARDOUS MATERIALS ────────────────────────────────────────────
  heading("32. HAZARDOUS MATERIALS");
  p("Tenant shall not store or use dangerous or flammable materials on the Premises without prior consent and proof of insurance.");

  // ── 33. LEGAL COMPLIANCE ───────────────────────────────────────────────
  heading("33. LEGAL COMPLIANCE");
  p("Tenant shall comply with all federal, state, and local laws, regulations, and codes.");

  // ── 34. MECHANIC'S LIENS ───────────────────────────────────────────────
  heading("34. MECHANIC\u2019S LIENS");
  p("Tenant shall not allow mechanic\u2019s or materialman\u2019s liens on the Premises. Tenant shall notify all vendors in advance that liens are not permitted.");

  // ── 35. SUBORDINATION ─────────────────────────────────────────────────
  heading("35. SUBORDINATION");
  p("This Lease is subordinate to all current and future mortgages on the Premises.");

  // ── 36. ASSIGNMENT & SUBLETTING ───────────────────────────────────────
  heading("36. ASSIGNMENT & SUBLETTING");
  p("Assignment or subletting is strictly prohibited unless otherwise permitted in writing by Landlord.");

  // ── 37. NOTICES ────────────────────────────────────────────────────────
  heading("37. NOTICES");
  p("Landlord Address:", true);
  const lStreet  = v("landlordStreet", 24);
  const lCityZip = v("landlordCity", 14) + ", " + v("landlordZip", 8);
  doc.setFont("helvetica", "normal"); doc.setFontSize(FS); doc.setTextColor(0,0,0);
  checkBreak(LH); doc.text(lStreet,  ML + 4, y); if (filled("landlordStreet")) ul(lStreet,  ML + 4, y); y += LH;
  checkBreak(LH); doc.text(lCityZip, ML + 4, y); if (filled("landlordCity") || filled("landlordZip")) ul(lCityZip, ML + 4, y); y += LH;
  gap();
  p("Tenant Address:", true);
  const tStreet  = v("tenantStreet", 24);
  const tCityZip = v("tenantCity", 14) + ", " + v("tenantZip", 8);
  doc.setFont("helvetica", "normal"); doc.setFontSize(FS); doc.setTextColor(0,0,0);
  checkBreak(LH); doc.text(tStreet,  ML + 4, y); if (filled("tenantStreet")) ul(tStreet,  ML + 4, y); y += LH;
  checkBreak(LH); doc.text(tCityZip, ML + 4, y); if (filled("tenantCity") || filled("tenantZip")) ul(tCityZip, ML + 4, y); y += LH;
  gap();
  p("Notice shall be deemed received three (3) days after mailing.");

  // ── 38. GOVERNING LAW ─────────────────────────────────────────────────
  heading("38. GOVERNING LAW");
  seg([
    { t: "This Agreement shall be governed by the laws of the State of " },
    { t: v("governingState", 14), ul: filled("governingState") },
    { t: " (" },
    { t: (values.governingCountry || "").trim() ? (values.governingCountry || "").trim().toUpperCase() : "_".repeat(4), ul: filled("governingCountry") },
    { t: ")." },
  ]);

  // ── 39. ENTIRE AGREEMENT ───────────────────────────────────────────────
  heading("39. ENTIRE AGREEMENT");
  p("This document contains the entire agreement between the Parties and supersedes all prior understandings.");

  // ── 40. SEVERABILITY; WAIVER ───────────────────────────────────────────
  heading("40. SEVERABILITY; WAIVER");
  p("Invalid provisions shall be severed without affecting enforceability of the remainder. Failure to enforce shall not constitute waiver.");

  // ── 41. TIME IS OF THE ESSENCE ─────────────────────────────────────────
  heading("41. TIME IS OF THE ESSENCE");
  p("Time is a material term of this Agreement.");

  // ── 42. ESTOPPEL CERTIFICATE ───────────────────────────────────────────
  heading("42. ESTOPPEL CERTIFICATE");
  p("Tenant shall return a signed estoppel certificate within three (3) days of request. Failure to do so constitutes agreement with the certificate\u2019s contents.");

  // ── 43. TENANT REPRESENTATIONS ────────────────────────────────────────
  heading("43. TENANT REPRESENTATIONS");
  p("Tenant affirms that all information in the rental application is accurate and authorizes verification by Landlord.");

  // ── 44. BINDING EFFECT ────────────────────────────────────────────────
  heading("44. BINDING EFFECT");
  p("This Lease shall bind and benefit the Parties and their respective heirs, successors, and assigns.");

  // ── 45. DISPUTE RESOLUTION ────────────────────────────────────────────
  heading("45. DISPUTE RESOLUTION");
  seg([
    { t: "Disputes shall first be addressed through good-faith negotiation. If unresolved, the matter shall proceed to " },
    { t: v("disputeResolution", 10), ul: filled("disputeResolution") },
    { t: ". If still unresolved, parties may pursue all legal remedies available." },
  ]);

  // ── ADDITIONAL TERMS ──────────────────────────────────────────────────
  if ((values.additionalTerms || "").trim()) {
    heading("ADDITIONAL TERMS & CONDITIONS");
    p(values.additionalTerms.trim());
  }

  // ── SIGNATURE BLOCK ───────────────────────────────────────────────────
  checkBreak(60); gap(6);
  p("IN WITNESS WHEREOF, the parties hereto have executed this Lease Agreement as of the dates set forth below:", true);
  gap(4);

  const col1X = ML, col2X = ML + TW / 2 + 5, lineW = TW / 2 - 8;
  checkBreak(36);
  const sy = y;

  doc.setFont("helvetica", "bold"); doc.setFontSize(FS); doc.setTextColor(0,0,0);
  doc.text("LANDLORD:", col1X, sy);
  doc.setFont("helvetica", "normal");
  doc.text("By:", col1X, sy + 8);
  doc.setLineWidth(0.3); doc.line(col1X + 6, sy + 8, col1X + 6 + lineW, sy + 8);
  const lSig = (values.landlordSignature || "").trim() || v("landlordName", 20);
  doc.text(lSig, col1X, sy + 14);
  if ((values.landlordSignature || "").trim()) ul(lSig, col1X, sy + 14);
  doc.text("Date: ___________________________", col1X, sy + 20);

  doc.setFont("helvetica", "bold"); doc.setFontSize(FS); doc.setTextColor(0,0,0);
  doc.text("TENANT:", col2X, sy);
  doc.setFont("helvetica", "normal");
  doc.text("By:", col2X, sy + 8);
  doc.setLineWidth(0.3); doc.line(col2X + 6, sy + 8, col2X + 6 + lineW, sy + 8);
  const tSig = (values.tenantSignature || "").trim() || v("tenantName", 20);
  doc.text(tSig, col2X, sy + 14);
  if ((values.tenantSignature || "").trim()) ul(tSig, col2X, sy + 14);
  doc.text("Date: ___________________________", col2X, sy + 20);

  y = sy + 30;

  if ((values.witnessName || "").trim()) {
    gap(4); checkBreak(24);
    doc.setFont("helvetica", "bold"); doc.setFontSize(FS); doc.setTextColor(0,0,0);
    doc.text("WITNESS:", ML, y); y += 7;
    doc.setFont("helvetica", "normal");
    doc.setLineWidth(0.3); doc.line(ML, y, ML + lineW, y); y += 5;
    doc.text("Name: " + values.witnessName.trim(), ML, y); y += 6;
    doc.text("Date: ___________________________", ML, y);
  }

  doc.save("condominium_lease_agreement.pdf");
};

export default function CondominiumLease() {
  return (
    <FormWizard
      steps={steps}
      title="Condominium Lease Agreement"
      subtitle="Complete each step to generate your document"
      onGenerate={generatePDF}
      documentType="condominiumlease"
    />
  );
}