import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { documentContent } from "@/data/documentContent";

const PersonalPropertyLeaseAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  const doc = (documentContent["Personal Property Lease Agreement"] || documentContent.default) as typeof documentContent[string] & {
    whyDownload?: string[];
    sample?: { description?: string; highlights?: string[] };
  };

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "48px 16px", backgroundColor: "#ffffff" }}>
      <div style={{ marginBottom: "32px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: "16px",
            background: "transparent",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            padding: "10px 14px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Back
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{ padding: "12px", backgroundColor: "#dbeafe", borderRadius: "8px" }}>
            <FileText style={{ width: "32px", height: "32px", color: "#2563eb" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#111827", margin: "12px 0 0 0" }}>{doc.title}</h1>
            <p style={{ color: "#4b5563", marginTop: "8px", margin: 0 }}>Also known as: {doc.otherNames.join(", ")}</p>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#eff6ff", borderRadius: "8px", padding: "32px", marginBottom: "32px", border: "1px solid #bfdbfe" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "16px" }}>What is a Personal Property Lease Agreement?</h2>
        <p style={{ color: "#374151", lineHeight: "1.6", fontSize: "16px", whiteSpace: "pre-line" }}>{doc.whatIs}</p>
      </div>

      <div style={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: "32px", marginBottom: "32px", border: "1px solid #e5e7eb", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "24px" }}>When Should You Use a Personal Property Lease Agreement?</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {doc.whenToUse.map((item, index) => (
            <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
              <span style={{ color: "#2563eb", fontWeight: "bold", fontSize: "18px", marginTop: "4px" }}>•</span>
              <span style={{ color: "#374151" }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: "#f0fdf4", borderRadius: "8px", padding: "32px", marginBottom: "32px", border: "1px solid #bbf7d0" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "24px" }}>Why Download Personal Property Lease Agreement from Legalgram?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
          {(doc.whyDownload || []).map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "12px", backgroundColor: "#ffffff", padding: "16px", borderRadius: "8px" }}>
              <CheckCircle2 style={{ color: "#16a34a", fontWeight: "bold", fontSize: "18px", marginTop: "2px", width: "20px", height: "20px" }} />
              <span style={{ color: "#374151" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "#eff6ff", borderRadius: "8px", padding: "32px", marginBottom: "32px", border: "1px solid #bfdbfe" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "16px" }}>Sample Personal Property Lease Agreement - Legalgram</h2>
        <p style={{ color: "#374151", lineHeight: "1.6", fontSize: "16px", marginBottom: "16px", whiteSpace: "pre-line" }}>{doc.sample?.description}</p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {(doc.sample?.highlights || []).map((item, index) => (
            <li key={index} style={{ color: "#374151", marginBottom: "8px" }}>• {item}</li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: "#ffffff", borderRadius: "8px", padding: "32px", marginBottom: "32px", border: "1px solid #e5e7eb", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "24px" }}>Personal Property Lease Agreement FAQs</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {(doc.faqs || []).map((faq, index) => (
            <div key={index} style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                  backgroundColor: "#f9fafb",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
              >
                <span style={{ fontWeight: 600, color: "#111827" }}>{faq.q}</span>
                {expandedFAQ === index ? (
                  <ChevronUp style={{ width: "20px", height: "20px", color: "#2563eb" }} />
                ) : (
                  <ChevronDown style={{ width: "20px", height: "20px", color: "#9ca3af" }} />
                )}
              </button>
              {expandedFAQ === index && (
                <div style={{ padding: "16px 24px", backgroundColor: "#ffffff", borderTop: "1px solid #f3f4f6" }}>
                  <p style={{ color: "#374151", margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "#fef3c7", borderRadius: "8px", padding: "24px", marginBottom: "32px", borderLeft: "4px solid #f59e0b" }}>
        <p style={{ fontSize: "14px", color: "#78350f", margin: 0 }}>
          <span style={{ fontWeight: 600 }}>Legal Disclaimer:</span> Legalgram provides professionally formatted legal documents, but consulting a lawyer is always recommended for complex transactions.
        </p>
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/documents/personal-property-lease-agreement")}
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "12px 32px",
            borderRadius: "8px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create Personal Property Lease Agreement
        </button>
        <button
          onClick={() => navigate("/documents")}
          style={{
            backgroundColor: "#ffffff",
            color: "#111827",
            padding: "12px 32px",
            borderRadius: "8px",
            fontWeight: 600,
            border: "1px solid #d1d5db",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Back to Documents
        </button>
      </div>
    </div>
  );
};

export default PersonalPropertyLeaseAgreementInfo;
