import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer
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
      <Text style={styles.title}>LLC OPERATING AGREEMENT</Text>

      <View style={styles.row}>
        <Text>Effective Date: {data.effectiveDate}</Text>
        <Text>Jurisdiction: {data.jurisdiction}</Text>
      </View>

      <Text style={styles.sectionHeading}>PARTIES</Text>
      <Text style={styles.paragraph}>First Party: {data.firstPartyName}</Text>
      <Text style={styles.paragraph}>Address: {data.firstPartyAddress}</Text>
      <Text style={styles.paragraph}>Contact: {data.firstPartyContact}</Text>

      <Text style={{ marginTop: 8 }}>Second Party: {data.secondPartyName}</Text>
      <Text style={styles.paragraph}>Address: {data.secondPartyAddress}</Text>
      <Text style={styles.paragraph}>Contact: {data.secondPartyContact}</Text>

      <Text style={styles.sectionHeading}>DOCUMENT DETAILS</Text>
      <Text style={styles.paragraph}>{data.documentDetails}</Text>

      <Text style={styles.sectionHeading}>WHAT IS AN LLC OPERATING AGREEMENT?</Text>
      <Text style={styles.paragraph}>{data.whatIsLLCDefinition}</Text>

      <Text style={styles.sectionHeading}>COMMONLY INCLUDES</Text>
      <Text style={styles.paragraph}>{data.commonlyIncludes}</Text>

      <Text style={styles.sectionHeading}>WHY YOU NEED THIS AGREEMENT</Text>
      <Text style={styles.paragraph}>{data.whyNeeded}</Text>

      <Text style={styles.sectionHeading}>AVAILABLE FORMATS</Text>
      <Text style={styles.paragraph}>{data.availableFormats}</Text>

      <Text style={styles.sectionHeading}>WHO SHOULD USE THIS AGREEMENT?</Text>
      <Text style={styles.paragraph}>{data.whoShouldUse}</Text>

      <Text style={styles.sectionHeading}>TERMS</Text>
      <Text style={styles.paragraph}>Duration: {data.duration}</Text>
      <Text style={styles.paragraph}>Termination Notice: {data.terminationNotice}</Text>
      <Text style={styles.paragraph}>Confidentiality: {data.confidentiality}</Text>
      <Text style={styles.paragraph}>Dispute Resolution: {data.disputeResolution}</Text>

      <Text style={styles.sectionHeading}>SIGNATURES</Text>
      <View style={styles.signatureContainer}>
        <View style={styles.signatureBlock}>
          <View style={styles.signatureLine} />
          <Text>{data.firstPartyName}</Text>
          <Text>Signature: ____________________</Text>
          <Text>Date: {data.signatureDate}</Text>
        </View>

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
      "This Operating Agreement defines the ownership structure, management rules, and operational procedures of the Limited Liability Company. An LLC Operating Agreement helps establish how your company operates and protects members by putting all key terms in writing.",

    whatIsLLCDefinition:
      "An LLC Operating Agreement (also called Operating Agreement or LLC Company Agreement) is a legal document that sets the internal rules for a Limited Liability Company. This agreement commonly includes: LLC name and principal business address, Business purpose, Effective date of agreement, Names of members, Capital contributions by each member, Ownership percentages, Profit and loss sharing terms, Management structure (member-managed or manager-managed), Voting procedures, Powers and duties of managers or members, Admission of new members, Transfer of ownership interests, Member resignation, death, or removal clauses, Buyout provisions, Tax treatment election, Record keeping requirements, Dissolution and winding-up procedures, Governing law, and Signature section.",

    commonlyIncludes:
      "• LLC name and principal business address\n• Business purpose\n• Effective date of agreement\n• Names of members\n• Capital contributions by each member\n• Ownership percentages\n• Profit and loss sharing terms\n• Management structure (member-managed or manager-managed)\n• Voting procedures\n• Powers and duties of managers or members\n• Admission of new members\n• Transfer of ownership interests\n• Member resignation, death, or removal clauses\n• Buyout provisions\n• Tax treatment election\n• Record keeping requirements\n• Dissolution and winding-up procedures\n• Governing law\n• Signature section",

    whyNeeded:
      "A written LLC Operating Agreement provides important benefits: (1) Defines how the business will run, (2) Prevents member disputes, (3) Protects ownership interests, (4) Clarifies profit distribution, (5) Establishes voting rights, (6) Supports limited liability protection, (7) Helps secure investors or lenders, (8) Overrides default state rules in many cases, (9) Creates a strong legal foundation for growth.",

    availableFormats:
      "Available in multiple formats: LLC Operating Agreement Word format, LLC Operating Agreement PDF download, Single Member LLC Agreement template, Multi Member LLC Agreement draft, Editable business ownership agreement.",

    whoShouldUse:
      "This LLC Operating Agreement is ideal for: Entrepreneurs, Startups, Family businesses, Real estate investors, Small business owners, Business partners, Consultants forming LLCs, E-commerce businesses.",

    duration: "As defined by members",
    terminationNotice: "As specified in agreement",
    confidentiality: "Included",
    disputeResolution: "Arbitration",

    signatureDate: "02/18/2026"
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>LLC Operating Agreement Generator</h2>

      {/* ========== LIVE PDF PREVIEW ========== */}
      <div style={{ border: "1px solid #ccc", marginBottom: 20 }}>
        <PDFViewer width="100%" height="500">
          <LLCOperatingAgreementPDF data={data} />
        </PDFViewer>
      </div>

      {/* ========== DOWNLOAD BUTTON ========== */}
      <PDFDownloadLink
        document={<LLCOperatingAgreementPDF data={data} />}
        fileName="LLC-Operating-Agreement.pdf"
        style={{
          padding: "10px 20px",
          backgroundColor: "#000", // changed to black
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
