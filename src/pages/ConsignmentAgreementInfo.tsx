import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle,
  BookOpen,
  Lock,
  FileText,
  Download,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDocumentContent } from "@/data/documentContent";

const ConsignmentAgreementInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Consignment Agreement");

  // Parse the "What Is" section into paragraphs
  const whatIsParagraphs = doc.whatIs.split("\n\n").filter(p => p.trim());

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate("/documents")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </Button>

        {/* Header Section */}
        <div className="text-center mb-8">
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{doc.title}</h1>
          
          {doc.otherNames && doc.otherNames.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {doc.otherNames.map((name) => (
                <span
                  key={name}
                  className="inline-block px-3 py-1 bg-white text-cyan-700 text-sm font-medium rounded-full border border-cyan-200"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* What Is Section */}
        <Card className="mb-8 border-cyan-200">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200">
            <CardTitle className="flex items-center gap-2 text-cyan-900">
              What Is a Consignment Agreement?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {whatIsParagraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* When to Use Section */}
        <Card className="mb-8 border-cyan-200">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200">
            <CardTitle className="flex items-center gap-2 text-cyan-900">
              When to Use This Agreement
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {doc.whenToUse.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* What You Need Section */}
        {doc.whatYouNeed && doc.whatYouNeed.length > 0 && (
          <Card className="mb-8 border-cyan-200">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200">
              <CardTitle className="flex items-center gap-2 text-cyan-900">
                What You Need to Prepare
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doc.whatYouNeed.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Key Protections Section */}
        {doc.keyProtections && doc.keyProtections.length > 0 && (
          <Card className="mb-8 border-cyan-200">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200">
              <CardTitle className="flex items-center gap-2 text-cyan-900">
                Key Protections Included
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doc.keyProtections.map((protection, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{protection}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* FAQs Section */}
        {doc.faqs && doc.faqs.length > 0 && (
          <Card className="mb-8 border-cyan-200">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-200">
              <CardTitle className="flex items-center gap-2 text-cyan-900">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {doc.faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {index + 1}. {faq.q}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legal Disclaimer Section */}
        {doc.legalDisclaimer && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200">
              <CardTitle className="flex items-center gap-2 text-red-900">
                Important Legal Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-red-800 text-sm leading-relaxed">
                {doc.legalDisclaimer}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Call to Action Section */}
        <div className="text-center bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg p-8 border border-cyan-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Create Your Consignment Agreement?
          </h2>
          <p className="text-gray-700 mb-6">
            {doc.estimatedTime ? (
              <>Estimated time to complete: <strong>{doc.estimatedTime}</strong></>
            ) : (
              "Download our professionally drafted template and customize it for your specific needs."
            )}
          </p>
          <Button
            onClick={() => navigate("/documents")}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsignmentAgreementInfo;
