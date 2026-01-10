import jsPDF from "jspdf";
import { documentInfoDatabase, DocumentInfo } from "@/components/DocumentAboutSidebar";

interface GuidePDFOptions {
  documentId: string;
  documentTitle: string;
  filledFormData?: Record<string, string>;
}

// Get default info for documents not in database
const getDefaultDocumentInfo = (documentId: string): DocumentInfo => ({
  title: documentId.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
  shortDescription: "Complete this legal document to protect your interests.",
  fullDescription: "This document helps establish a formal agreement between parties.",
  whenToUse: ["When you need a formal written agreement"],
  keyTerms: [{ term: "Parties", definition: "Individuals or entities in this agreement." }],
  tips: ["Read all sections carefully before signing"],
  warnings: ["This document creates legal obligations"],
  estimatedTime: "15-25 minutes"
});

export const generateGuidePDF = (options: GuidePDFOptions): jsPDF => {
  const { documentId, documentTitle, filledFormData } = options;
  const docInfo = documentInfoDatabase[documentId] || getDefaultDocumentInfo(documentId);
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 25;
  const lineHeight = 7;
  
  // Helper to add new page if needed
  const checkPageBreak = (neededSpace: number = 30) => {
    if (y > 270 - neededSpace) {
      doc.addPage();
      y = 25;
    }
  };
  
  // Title
  doc.setFillColor(249, 115, 22); // orange-500
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("DOCUMENT GUIDE", pageWidth / 2, 18, { align: "center" });
  doc.setFontSize(14);
  doc.text(documentTitle || docInfo.title, pageWidth / 2, 32, { align: "center" });
  
  y = 55;
  doc.setTextColor(0, 0, 0);
  
  // What Is This Document section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(249, 115, 22);
  doc.text("What Is This Document?", margin, y);
  y += lineHeight + 3;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const descLines = doc.splitTextToSize(docInfo.fullDescription, contentWidth);
  descLines.forEach((line: string) => {
    checkPageBreak();
    doc.text(line, margin, y);
    y += lineHeight;
  });
  y += lineHeight;
  
  // When To Use section
  checkPageBreak(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(59, 130, 246); // blue-500
  doc.text("When To Use This Document", margin, y);
  y += lineHeight + 3;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  docInfo.whenToUse.forEach((item) => {
    checkPageBreak();
    doc.text("• " + item, margin + 5, y);
    y += lineHeight;
  });
  y += lineHeight;
  
  // Key Terms section
  checkPageBreak(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(139, 92, 246); // purple-500
  doc.text("Key Terms & Definitions", margin, y);
  y += lineHeight + 3;
  
  doc.setFontSize(11);
  docInfo.keyTerms.forEach((item) => {
    checkPageBreak(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text(item.term + ":", margin + 5, y);
    y += lineHeight;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const defLines = doc.splitTextToSize(item.definition, contentWidth - 10);
    defLines.forEach((line: string) => {
      doc.text(line, margin + 10, y);
      y += lineHeight;
    });
    y += 2;
  });
  y += lineHeight;
  
  // Helpful Tips section
  checkPageBreak(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(34, 197, 94); // green-500
  doc.text("Helpful Tips", margin, y);
  y += lineHeight + 3;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  docInfo.tips.forEach((tip) => {
    checkPageBreak();
    const tipLines = doc.splitTextToSize("✓ " + tip, contentWidth - 5);
    tipLines.forEach((line: string) => {
      doc.text(line, margin + 5, y);
      y += lineHeight;
    });
  });
  y += lineHeight;
  
  // Important Warnings section
  checkPageBreak(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(239, 68, 68); // red-500
  doc.text("Important Warnings", margin, y);
  y += lineHeight + 3;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  docInfo.warnings.forEach((warning) => {
    checkPageBreak();
    doc.setTextColor(180, 30, 30);
    const warnLines = doc.splitTextToSize("⚠ " + warning, contentWidth - 5);
    warnLines.forEach((line: string) => {
      doc.text(line, margin + 5, y);
      y += lineHeight;
    });
  });
  y += lineHeight * 2;
  
  // Legal Disclaimer
  checkPageBreak(30);
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, y - 5, contentWidth, 25, "F");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const disclaimer = "DISCLAIMER: This guide is for informational purposes only and does not constitute legal advice. Consult with a qualified attorney for specific legal matters in your jurisdiction.";
  const discLines = doc.splitTextToSize(disclaimer, contentWidth - 10);
  discLines.forEach((line: string) => {
    doc.text(line, margin + 5, y);
    y += 5;
  });
  
  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated by Legalgram - Your Legal Document Assistant", pageWidth / 2, 290, { align: "center" });
    doc.text("Page " + i + " of " + totalPages, pageWidth - margin, 290, { align: "right" });
  }
  
  return doc;
};

export const downloadBothPDFs = (
  contractPDF: jsPDF,
  documentId: string,
  documentTitle: string,
  contractFilename?: string
) => {
  // Download the contract PDF
  const contractName = contractFilename || documentTitle.replace(/\s+/g, "_") + "_Contract.pdf";
  contractPDF.save(contractName);
  
  // Generate and download the guide PDF
  const guidePDF = generateGuidePDF({ documentId, documentTitle });
  const guideName = documentTitle.replace(/\s+/g, "_") + "_Guide.pdf";
  
  // Small delay to prevent browser blocking multiple downloads
  setTimeout(() => {
    guidePDF.save(guideName);
  }, 500);
};

export default generateGuidePDF;
