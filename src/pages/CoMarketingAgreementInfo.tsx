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
  Megaphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDocumentContent } from "@/data/documentContent";

const CoMarketingAgreementInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Co-Marketing Agreement");

  // Parse the "What Is" section into paragraphs
  const whatIsParagraphs = doc.whatIs.split("\n\n").filter(p => p.trim());

  return (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-50 to-pink-50 py-8">
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
                  className="inline-block px-3 py-1 bg-white text-fuchsia-700 text-sm font-medium rounded-full border border-fuchsia-200"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* What Is Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-fuchsia-100 to-pink-100 rounded-t-lg">
              <CardTitle className="flex items-center text-gray-900">
                <BookOpen className="w-5 h-5 mr-3 text-fuchsia-700" />
                What Is a {doc.title}?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {whatIsParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>

          {/* When to Use Section */}
          {doc.whenToUse && doc.whenToUse.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-fuchsia-100 to-pink-100 rounded-t-lg">
                <CardTitle className="flex items-center text-gray-900">
                  <CheckCircle className="w-5 h-5 mr-3 text-fuchsia-700" />
                  When Should You Use This?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {doc.whenToUse.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* What You Need Section */}
          {doc.whatYouNeed && doc.whatYouNeed.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-fuchsia-100 to-pink-100 rounded-t-lg">
                <CardTitle className="flex items-center text-gray-900">
                  <FileText className="w-5 h-5 mr-3 text-fuchsia-700" />
                  What You'll Need
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {doc.whatYouNeed.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 mr-2 mt-1">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-fuchsia-200 flex items-center justify-center">
                          <span className="text-xs font-bold text-fuchsia-700">✓</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Key Protections Section */}
          {doc.keyProtections && doc.keyProtections.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-fuchsia-100 to-pink-100 rounded-t-lg">
                <CardTitle className="flex items-center text-gray-900">
                  <Lock className="w-5 h-5 mr-3 text-fuchsia-700" />
                  Key Protections
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {doc.keyProtections.map((protection, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-fuchsia-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{protection}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* FAQs Section */}
          {doc.faqs && doc.faqs.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-fuchsia-100 to-pink-100 rounded-t-lg">
                <CardTitle className="text-gray-900">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {doc.faqs.map((faq, idx) => (
                  <div key={idx} className="border-l-4 border-fuchsia-300 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Information Section */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                Ready to Create Your {doc.title}?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">
                Our online tool makes it easy to create a professional, legally sound {doc.title.toLowerCase()} in minutes. 
                {doc.estimatedTime && ` Estimated time: ${doc.estimatedTime}.`}
              </p>
              <Button
                onClick={() => navigate("/documents")}
                className="w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Start Creating Agreement
              </Button>
            </CardContent>
          </Card>

          {/* Legal Disclaimer */}
          {doc.legalDisclaimer && (
            <Card className="border-0 shadow-lg border-t-4 border-t-amber-300 bg-amber-50">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">
                  <strong>Legal Disclaimer:</strong> {doc.legalDisclaimer}
                </p>
              </CardContent>
            </Card>
          )}

          {!doc.legalDisclaimer && (
            <Card className="border-0 shadow-lg border-t-4 border-t-amber-300 bg-amber-50">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">
                  <strong>Legal Disclaimer:</strong> This information is provided for educational purposes only and does not constitute legal advice. 
                  For complex marketing partnerships, consult a qualified attorney to ensure your agreement complies with applicable laws and protects your interests.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoMarketingAgreementInfo;
