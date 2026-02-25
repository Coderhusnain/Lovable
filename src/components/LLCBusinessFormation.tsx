import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, lineHeight: 1.5 },
  title: { fontSize: 18, fontWeight: 'bold', textDecoration: 'underline', marginBottom: 15, textAlign: 'center' },
  sectionHeading: { fontSize: 14, fontWeight: 'bold', textDecoration: 'underline', marginBottom: 8 },
  paragraph: { marginBottom: 5, textDecoration: 'underline' },
  signatureBox: { width: '45%', textAlign: 'center' },
  signatureLine: { borderBottomWidth: 1, marginTop: 40, marginBottom: 5 }
});

const LLCOperatingAgreementPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      
      {/* Title */}
      <Text style={pdfStyles.title}>LLC OPERATING AGREEMENT</Text>

      {/* Parties Section */}
      <View style={{ marginBottom: 15, padding: 10, border: 1, borderColor: '#000' }}>
        <Text style={pdfStyles.sectionHeading}>PARTIES</Text>
        <Text style={pdfStyles.paragraph}>First Party: {data.firstPartyName}</Text>
        <Text style={pdfStyles.paragraph}>Address: {data.firstPartyAddress}</Text>
        <Text style={pdfStyles.paragraph}>Contact: {data.firstPartyContact}</Text>
        <Text style={pdfStyles.paragraph}>Second Party: {data.secondPartyName}</Text>
        <Text style={pdfStyles.paragraph}>Address: {data.secondPartyAddress}</Text>
        <Text style={pdfStyles.paragraph}>Contact: {data.secondPartyContact}</Text>

        <Text style={pdfStyles.paragraph}>Extra Name: Test User</Text>
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
        <View style={pdfStyles.signatureBox}>
          <Text style={pdfStyles.paragraph}>{data.firstPartyName}</Text>
          <View style={pdfStyles.signatureLine} />
          <Text style={pdfStyles.paragraph}>Signature</Text>
          <Text style={pdfStyles.paragraph}>Date: {data.signatureDate}</Text>
        </View>

        <View style={pdfStyles.signatureBox}>
          <Text style={pdfStyles.paragraph}>{data.secondPartyName}</Text>
          <View style={pdfStyles.signatureLine} />
          <Text style={pdfStyles.paragraph}>Signature</Text>
          <Text style={pdfStyles.paragraph}>Date: {data.signatureDate}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default LLCOperatingAgreementPDF;