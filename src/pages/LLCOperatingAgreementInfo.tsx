import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";

// ================== STYLES ==================
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Times-Roman",
    lineHeight: 1.6
  },

  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 20
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  sectionHeading: {
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5
  },

  paragraph: {
    marginBottom: 4
  },

  signatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40
  },

  signatureBlock: {
    width: "45%"
  },

  signatureLine: {
    borderBottomWidth: 1,
    marginBottom: 5,
    marginTop: 40
  }
});

// ================== PDF DOCUMENT ==================
const LLCOperatingAgreementPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* TITLE */}
      <Text style={styles.title}>LLC OPERATING AGREEMENT</Text>

      {/* EFFECTIVE DATE & JURISDICTION */}
      <View style={styles.row}>
        <Text>Effective Date: {data.effectiveDate}</Text>
        <Text>Jurisdiction: {data.jurisdiction}</Text>
      </View>

      {/* PARTIES */}
      <Text style={styles.sectionHeading}>PARTIES</Text>

      <Text style={styles.paragraph}>
        First Party: {data.firstPartyName}
      </Text>
      <Text style={styles.paragraph}>
        Address: {data.firstPartyAddress}
      </Text>
      <Text style={styles.paragraph}>
        Contact: {data.firstPartyContact}
      </Text>

      <Text style={{ marginTop: 8 }}>
        Second Party: {data.secondPartyName}
      </Text>
      <Text style={styles.paragraph}>
        Address: {data.secondPartyAddress}
      </Text>
      <Text style={styles.paragraph}>
        Contact: {data.secondPartyContact}
      </Text>

      {/* DOCUMENT DETAILS */}
      <Text style={styles.sectionHeading}>DOCUMENT DETAILS</Text>
      <Text style={styles.paragraph}>{data.documentDetails}</Text>

      {/* TERMS */}
      <Text style={styles.sectionHeading}>TERMS</Text>
      <Text style={styles.paragraph}>
        Duration: {data.duration}
      </Text>
      <Text style={styles.paragraph}>
        Termination Notice: {data.terminationNotice}
      </Text>
      <Text style={styles.paragraph}>
        Confidentiality: {data.confidentiality}
      </Text>
      <Text style={styles.paragraph}>
        Dispute Resolution: {data.disputeResolution}
      </Text>

      {/* SIGNATURES */}
      <Text style={styles.sectionHeading}>SIGNATURES</Text>

      <View style={styles.signatureContainer}>
        {/* First Signature */}
        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text>{data.firstPartyName}</Text>
          <Text>Signature: ____________________</Text>
          <Text>Date: {data.signatureDate}</Text>
        </View>

        {/* Second Signature */}
        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text>{data.secondPartyName}</Text>
          <Text>Signature: ____________________</Text>
          <Text>Date: {data.signatureDate}</Text>
        </View>
      </View>

    </Page>
  </Document>
);

// ================== MAIN COMPONENT ==================
const LLCOperatingAgreementGenerator = () => {

  const data = {
    effectiveDate: "2026-02-25",
    jurisdiction: "Other, CA",

    firstPartyName: "John Doe",
    firstPartyAddress: "123 Main Street",
    firstPartyContact: "john@email.com",

    secondPartyName: "Jane Smith",
    secondPartyAddress: "456 Business Ave",
    secondPartyContact: "jane@email.com",

    documentDetails:
      "This Operating Agreement defines the ownership structure, management rules, and operational procedures of the Limited Liability Company.",

    duration: "2 years",
    terminationNotice: "14 days",
    confidentiality: "Included",
    disputeResolution: "Arbitration",

    signatureDate: "02/18/2026"
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>LLC Operating Agreement Generator</h2>

      <PDFDownloadLink
        document={<LLCOperatingAgreementPDF data={data} />}
        fileName="LLC-Operating-Agreement.pdf"
        style={{
          padding: "10px 20px",
          backgroundColor: "#f97316",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
          display: "inline-block",
          marginTop: "20px"
        }}
      >
        {({ loading }) =>
          loading ? "Generating PDF..." : "Download LLC Operating Agreement"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default LLCOperatingAgreementGenerator;