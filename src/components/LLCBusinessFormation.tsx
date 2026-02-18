import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { FormWizard } from "./FormWizard";
import { FieldDef } from "./FormWizard";
import { jsPDF } from "jspdf";

const steps: Array<{ label: string; fields: FieldDef[] }> = [
  // --- Keep all your previous steps here ---
];

const generatePDF = (values: Record<string, string>) => {
  const doc = new jsPDF();
  let y = 20;

  // Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("LLC BUSINESS FORMATION", 105, y, { align: "center" });
  y += 15;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  // Effective Date
  doc.text("Effective Date:", 20, y);
  doc.text(values.effectiveDate || "N/A", 60, y);
  doc.line(20, y + 1, 190, y + 1); // underline
  y += 8;

  // Jurisdiction
  doc.text("Jurisdiction:", 20, y);
  doc.text((values.state || "") + ", " + (values.country || ""), 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 12;

  // PARTIES
  doc.setFont("helvetica", "bold");
  doc.text("PARTIES", 20, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 10;

  doc.setFont("helvetica", "normal");

  // First Party
  doc.text("First Party Name:", 20, y);
  doc.text(values.party1Name || "N/A", 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 8;

  doc.text("Type:", 20, y);
  doc.text(values.party1Type || "N/A", 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 8;

  doc.text("Address:", 20, y);
  doc.text((values.party1Street || "") + ", " + (values.party1City || "") + " " + (values.party1Zip || ""), 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 8;

  doc.text("Contact:", 20, y);
  doc.text((values.party1Email || "") + " | " + (values.party1Phone || ""), 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 12;

  // Second Party
  doc.text("Second Party Name:", 20, y);
  doc.text(values.party2Name || "N/A", 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 8;

  doc.text("Type:", 20, y);
  doc.text(values.party2Type || "N/A", 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 8;

  doc.text("Address:", 20, y);
  doc.text((values.party2Street || "") + ", " + (values.party2City || "") + " " + (values.party2Zip || ""), 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 8;

  doc.text("Contact:", 20, y);
  doc.text((values.party2Email || "") + " | " + (values.party2Phone || ""), 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 12;

  // Document Details
  doc.setFont("helvetica", "bold");
  doc.text("DOCUMENT DETAILS", 20, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 8;

  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(values.description || "N/A", 170);
  descLines.forEach((line) => {
    doc.text(line, 20, y);
    doc.line(20, y + 1, 190, y + 1);
    y += 6;
  });
  y += 6;

  // TERMS & CONDITIONS
  doc.setFont("helvetica", "bold");
  doc.text("TERMS & CONDITIONS", 20, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.text("Duration:", 20, y);
  doc.text(values.duration || "N/A", 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 6;

  doc.text("Termination Notice:", 20, y);
  doc.text(values.terminationNotice || "N/A", 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 6;

  doc.text("Confidentiality:", 20, y);
  doc.text(values.confidentiality === "yes" ? "Included" : "Not Included", 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 6;

  doc.text("Dispute Resolution:", 20, y);
  doc.text(values.disputeResolution || "N/A", 60, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 12;

  // Signatures
  doc.setFont("helvetica", "bold");
  doc.text("SIGNATURES", 20, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.text("First Party Signature:", 20, y);
  doc.text(values.party1Signature || "", 80, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 6;

  doc.text("Second Party Signature:", 20, y);
  doc.text(values.party2Signature || "", 80, y);
  doc.line(20, y + 1, 190, y + 1);
  y += 10;

  doc.text("Date:", 20, y);
  doc.text(new Date().toLocaleDateString(), 60, y);
  doc.line(20, y + 1, 190, y + 1);

  doc.save("llc_business_formation.pdf");
};

export default function LLCBusinessFormation() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-bright-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              LLC Business Formation
            </h1>
            <p className="text-xl text-gray-600">
              Complete the form to generate your LLC Formation Document
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <FormWizard
            steps={steps}
            title="LLC Business Formation"
            subtitle="Complete each step to generate your document"
            onGenerate={generatePDF}
            documentType="llcbusinessformation"
          />
        </div>
      </div>
    </Layout>
  );
}
