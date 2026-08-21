import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { documentContent } from "@/data/documentContent";

const MarketingAgreementInfo = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const doc = documentContent["Marketing Agreement"];

  if (!doc) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-600">Document information not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/documents")}
            className="mb-4"
          >
            ← Back to Contracts
          </Button>

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Marketing Agreement Information
            </h1>
            <p className="text-lg text-gray-600">
              {doc.title} • {doc.otherNames?.[0] || "Professional Marketing Services"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* What Is Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What Is a Marketing Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 whitespace-pre-wrap">
                {doc.whatIs}
              </p>
            </CardContent>
          </Card>

          {/* When to Use Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When Should You Use a Marketing Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {doc.whenToUse?.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* FAQs Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Learn more about Marketing Agreements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {doc.faqs?.map((faq, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                >
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === idx ? null : idx)
                    }
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="font-semibold text-gray-900">
                      {faq.q}
                    </span>
                    {expandedFAQ === idx ? (
                      <ChevronUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {expandedFAQ === idx && (
                    <div className="px-4 py-3 bg-gray-50 border-t">
                      <p className="text-gray-700">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Key Protections Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Protections
              </CardTitle>
              <CardDescription>
                What your Marketing Agreement should include
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doc.keyProtections?.map((protection, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{protection}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* What You'll Need Section */}
          <Card>
            <CardHeader>
              <CardTitle>What You'll Need</CardTitle>
              <CardDescription>
                Gather these items before creating your agreement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {doc.whatYouNeed?.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Important Tips Section */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Important Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-blue-900">
              <p>
                <strong>Estimated Time:</strong> {doc.estimatedTime} to complete your Marketing Agreement
              </p>
              <p>
                A properly drafted Marketing Agreement ensures clear expectations around deliverables, compensation, intellectual property, and performance metrics for all parties involved in marketing activities.
              </p>
              <p>
                This agreement has been customized over 11,100 times, demonstrating its reliability and widespread use across businesses, agencies, and marketing consultants.
              </p>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="flex justify-center pb-4">
            <Button
              onClick={() => navigate("/documents")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              Create Your Marketing Agreement Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingAgreementInfo;
