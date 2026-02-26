const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  let y = 20;

  const pageHeight = doc.internal.pageSize.height;

  const addLine = (textLeft: string, textRight: string) => {
    if (y > pageHeight - 20) { // add new page if overflow
      doc.addPage();
      y = 20;
    }
    doc.text(textLeft, 20, y);
    doc.text(textRight, 60, y);
    doc.line(20, y + 1, 190, y + 1);
    y += 8;
  };

  const addSectionTitle = (title: string) => {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, y);
    doc.line(20, y + 1, 190, y + 1);
    y += 10;
    doc.setFont("helvetica", "normal");
  };

  // Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("LLC BUSINESS FORMATION", 105, y, { align: "center" });
  y += 15;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Effective Date
  addLine("Effective Date:", values.effectiveDate || "N/A");

  // Jurisdiction
  addLine("Jurisdiction:", `${values.state || ""}, ${values.country || ""}`);

  // PARTIES
  addSectionTitle("PARTIES");

  addLine("First Party Name:", values.party1Name || "N/A");
  addLine("Type:", values.party1Type || "N/A");
  addLine("Address:", `${values.party1Street || ""}, ${values.party1City || ""} ${values.party1Zip || ""}`);
  addLine("Contact:", `${values.party1Email || ""} | ${values.party1Phone || ""}`);

  addLine("Second Party Name:", values.party2Name || "N/A");
  addLine("Type:", values.party2Type || "N/A");
  addLine("Address:", `${values.party2Street || ""}, ${values.party2City || ""} ${values.party2Zip || ""}`);
  addLine("Contact:", `${values.party2Email || ""} | ${values.party2Phone || ""}`);

  // Document Details
  addSectionTitle("DOCUMENT DETAILS");
  const descLines = doc.splitTextToSize(values.description || "N/A", 170);
  descLines.forEach((line) => {
    if (y > pageHeight - 20) { doc.addPage(); y = 20; }
    doc.text(line, 20, y);
    doc.line(20, y + 1, 190, y + 1);
    y += 6;
  });
  y += 6;

  // TERMS & CONDITIONS
  addSectionTitle("TERMS & CONDITIONS");
  addLine("Duration:", values.duration || "N/A");
  addLine("Termination Notice:", values.terminationNotice || "N/A");
  addLine("Confidentiality:", values.confidentiality === "yes" ? "Included" : "Not Included");
  addLine("Dispute Resolution:", values.disputeResolution || "N/A");

  // SIGNATURES
  addSectionTitle("SIGNATURES");
  addLine("First Party Signature:", values.party1Signature || "");
  addLine("Second Party Signature:", values.party2Signature || "");
  addLine("Date:", new Date().toLocaleDateString());

  doc.save("llc_business_formation.pdf");
};