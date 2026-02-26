const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let y = 20;

  const textWidth = pageWidth - margin * 2;

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

  const addSectionTitle = (title: string) => {
    checkPageBreak(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, margin, y);
    const titleWidth = doc.getTextWidth(title);
    doc.line(margin, y + 1, margin + titleWidth, y + 1);
    y += 10;
    doc.setFont("helvetica", "normal");
  };

  const addParagraph = (text: string) => {
    checkPageBreak(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, textWidth);
    doc.text(lines, margin, y);
    y += lines.length * 6 + 2;
  };

  // ===== TITLE =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const title = "LLC BUSINESS FORMATION";
  doc.text(title, pageWidth / 2, y, { align: "center" });
  const titleWidth = doc.getTextWidth(title);
  const titleX = pageWidth / 2 - titleWidth / 2;
  doc.line(titleX, y + 2, titleX + titleWidth, y + 2);
  y += 15;

  // Effective Date & Jurisdiction
  addUnderlinedField("Effective Date:", values.effectiveDate || "N/A", 50);
  addUnderlinedField(
    "Jurisdiction:",
    values.state ? `${values.state}, ${values.country?.toUpperCase()}` : (values.country || ""),
    80
  );
  y += 4;

  // ===== PARTIES =====
  addSectionTitle("FIRST PARTY");
  addUnderlinedField("Name:", values.party1Name || "N/A", 100);
  addUnderlinedField("Type:", values.party1Type || "N/A", 60);
  addUnderlinedField(
    "Address:",
    `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`.trim(),
    120
  );
  addUnderlinedField("Email:", values.party1Email || "N/A", 100);
  if (values.party1Phone) addUnderlinedField("Phone:", values.party1Phone, 80);

  addSectionTitle("SECOND PARTY");
  addUnderlinedField("Name:", values.party2Name || "N/A", 100);
  addUnderlinedField("Type:", values.party2Type || "N/A", 60);
  addUnderlinedField(
    "Address:",
    `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`.trim(),
    120
  );
  addUnderlinedField("Email:", values.party2Email || "N/A", 100);
  if (values.party2Phone) addUnderlinedField("Phone:", values.party2Phone, 80);

  // ===== DOCUMENT DETAILS =====
  addSectionTitle("DOCUMENT DETAILS");
  if (values.description) addParagraph(values.description);

  // ===== TERMS & CONDITIONS =====
  addSectionTitle("TERMS & CONDITIONS");
  addUnderlinedField("Duration:", values.duration || "N/A", 50);
  addUnderlinedField("Termination Notice:", values.terminationNotice || "N/A", 50);
  addUnderlinedField(
    "Confidentiality:",
    values.confidentiality === "yes" ? "Included" : "Not Included",
    60
  );
  addUnderlinedField("Dispute Resolution:", values.disputeResolution || "N/A", 80);

  // ===== SIGNATURES =====
  addSectionTitle("SIGNATURES");
  addUnderlinedField("First Party Signature:", values.party1Signature || "________________", 80);
  addUnderlinedField("Second Party Signature:", values.party2Signature || "________________", 80);
  addUnderlinedField("Date:", new Date().toLocaleDateString(), 50);

  doc.save("llc_business_formation.pdf");
};