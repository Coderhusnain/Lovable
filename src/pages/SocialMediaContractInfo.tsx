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
  Share2,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { documentContent } from "@/data/documentContent";

const SocialMediaContractInfo = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const doc = documentContent["Social Media Contract"];

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
              Social Media Contract Information
            </h1>
            <p className="text-lg text-gray-600">
              {doc.title} • {doc.otherNames?.[0] || "Employment Agreement"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* What Is Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What Is a Social Media Contract?
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
                When Should You Use a Social Media Contract?
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
                Learn more about Social Media Contracts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {doc.faqs?.map((faq, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg overflow-hidden hover:border-violet-300 transition-colors"
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
                      <ChevronUp className="w-5 h-5 text-violet-600" />
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
                What your Social Media Contract should include
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doc.keyProtections?.map((protection, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-violet-600 mr-2 mt-1 flex-shrink-0" />
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
          <Card className="bg-violet-50 border-violet-200">
            <CardHeader>
              <CardTitle className="text-violet-900">Important Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-violet-900">
              <p>
                <strong>Estimated Time:</strong> {doc.estimatedTime} to complete your Social Media Contract
              </p>
              <p>
                A properly drafted Social Media Contract balances employee freedom of expression with professional responsibility and protects your company's reputation.
              </p>
              <p>
                Consider having a legal professional review your agreement to ensure it complies with employment laws in your jurisdiction.
              </p>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="flex justify-center pb-4">
            <Button
              onClick={() => navigate("/documents")}
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg"
            >
              Create Your Social Media Contract Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaContractInfo;
