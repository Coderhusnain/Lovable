import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Users, Clock, Shield, CheckCircle } from "lucide-react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer
} from "@react-pdf/renderer";

// ================== PDF STYLES ==================
const pdfStyles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Times-Roman", lineHeight: 1.6 },
  title: { textAlign: "center", fontSize: 16, fontWeight: "bold", textDecoration: "underline", marginBottom: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  sectionHeading: { fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  paragraph: { marginBottom: 4 },
  signatureContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 40 },
  signatureBlock: { width: "45%" },
  signatureLine: { borderBottomWidth: 1, marginBottom: 5, marginTop: 40 }
});

// ================== PDF DOCUMENT ==================
const LLCOperatingAgreementPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>LLC OPERATING AGREEMENT</Text>

      {/* Parties Section */}
      <View style={{ marginBottom: 15, padding: 10, border: 1, borderColor: '#000' }}>
        <Text style={pdfStyles.sectionHeading}>PARTIES</Text>
        <Text style={pdfStyles.paragraph}>First Party: {data.firstPartyName}</Text>
        <Text style={pdfStyles.paragraph}>Address: {data.firstPartyAddress}</Text>
        <Text style={pdfStyles.paragraph}>Contact: {data.firstPartyContact}</Text>
        <Text style={{ marginTop: 8 }}>Second Party: {data.secondPartyName}</Text>
        <Text style={pdfStyles.paragraph}>Address: {data.secondPartyAddress}</Text>
        <Text style={pdfStyles.paragraph}>Contact: {data.secondPartyContact}</Text>
      </View>

      {/* Document Details */}
      <View style={{ marginBottom: 15, padding: 10, border: 1, borderColor: '#000' }}>
        <Text style={pdfStyles.sectionHeading}>DOCUMENT DETAILS</Text>
        <Text style={pdfStyles.paragraph}>{data.documentDetails}</Text>
      </View>

      {/* Terms */}
      <View style={{ marginBottom: 15, padding: 10, border: 1, borderColor: '#000' }}>
        <Text style={pdfStyles.sectionHeading}>TERMS</Text>
        <Text style={pdfStyles.paragraph}>Duration: {data.duration}</Text>
        <Text style={pdfStyles.paragraph}>Termination Notice: {data.terminationNotice}</Text>
        <Text style={pdfStyles.paragraph}>Confidentiality: {data.confidentiality}</Text>
        <Text style={pdfStyles.paragraph}>Dispute Resolution: {data.disputeResolution}</Text>
      </View>

      {/* Signatures */}
      <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: '45%', textAlign: 'center' }}>
          <Text>{data.firstPartyName}</Text>
          <View style={{ borderBottomWidth: 1, marginTop: 40, marginBottom: 5 }} />
          <Text>Signature</Text>
          <Text>Date: {data.signatureDate}</Text>
        </View>

        <View style={{ width: '45%', textAlign: 'center' }}>
          <Text>{data.secondPartyName}</Text>
          <View style={{ borderBottomWidth: 1, marginTop: 40, marginBottom: 5 }} />
          <Text>Signature</Text>
          <Text>Date: {data.signatureDate}</Text>
        </View>
      </View>
    </Page>
  </Document>
);
// ================== MAIN COMPONENT ==================
const LLCOperatingAgreementInfo = () => {
  const navigate = useNavigate();

  const data = {
    effectiveDate: "2026-02-25",
    jurisdiction: "Other, CA",
    firstPartyName: "John Doe",
    firstPartyAddress: "123 Main Street",
    firstPartyContact: "john@email.com",
    secondPartyName: "Jane Smith",
    secondPartyAddress: "456 Business Ave",
    secondPartyContact: "jane@email.com",
    documentDetails: "This Operating Agreement defines the ownership structure, management rules, and operational procedures of the Limited Liability Company.",
    duration: "2 years",
    terminationNotice: "14 days",
    confidentiality: "Included",
    disputeResolution: "Arbitration",
    signatureDate: "02/18/2026"
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="text-center mb-8">
          <FileText className="w-16 h-16 text-bright-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">LLC Operating Agreement</h1>
          <p className="text-xl text-gray-600">
            Generate a complete LLC Operating Agreement PDF with all parties, terms, and signatures.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Live PDF Preview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" /> Live Preview
            </h2>
            <div className="border p-2">
              <PDFViewer width="100%" height={500}>
                <LLCOperatingAgreementPDF data={data} />
              </PDFViewer>
            </div>
          </section>

          {/* Download PDF */}
          <section className="text-center">
            <PDFDownloadLink
              document={<LLCOperatingAgreementPDF data={data} />}
              fileName="LLC-Operating-Agreement.pdf"
              className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              {({ loading }) => (loading ? "Generating PDF..." : "Download LLC Operating Agreement")}
            </PDFDownloadLink>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LLCOperatingAgreementInfo;