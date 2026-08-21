import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, Shield, Clock, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { documentContent } from "@/data/documentContent";

const ServiceLevelAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  const doc = documentContent["Service Level Agreement"] || documentContent["default"];
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setExpandedFAQ(expandedFAQ === idx ? null : idx);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">{doc.title}</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed whitespace-pre-line">{doc.whatIs}</p>

            {/* Other Names / Aliases */}
            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* When to Use Section */}
          {doc.whenToUse && doc.whenToUse.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                When to Use
              </h2>
              <ul className="space-y-3">
                {doc.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Protections Section */}
          {doc.keyProtections && doc.keyProtections.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Key Protections
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {doc.keyProtections.map((protection, idx) => (
                  <Card key={idx} className="border-indigo-100 bg-indigo-50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{protection}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section with Expandable Accordions */}
          {doc.faqs && doc.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {doc.faqs.map((faq, idx) => (
                  <Card 
                    key={idx} 
                    className="border-indigo-100 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => toggleFAQ(idx)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base text-indigo-700 flex-1">{faq.q}</CardTitle>
                        {expandedFAQ === idx ? (
                          <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    {expandedFAQ === idx && (
                      <CardContent>
                        <p className="text-sm text-gray-700 leading-relaxed">{faq.a}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* What You Need Section */}
          {doc.whatYouNeed && doc.whatYouNeed.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                What You Need
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doc.whatYouNeed.map((item, idx) => (
                  <Card key={idx} className="border-indigo-100 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-700">{item}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="mb-12 p-6 bg-indigo-50 border-2 border-indigo-200 rounded-lg flex gap-4">
            <AlertCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Important Note:</strong> A Service Level Agreement is a critical legal document that establishes clear service expectations, performance standards, and remedies. Ensure all KPIs, uptime commitments, response times, and escalation procedures are clearly defined and mutually agreed upon before implementation. Both parties should understand their obligations and consequences for non-compliance.
              </p>
            </div>
          </div>

          {/* Estimated Time Badge */}
          {doc.estimatedTime && (
            <div className="mb-12 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-full">
                <span className="text-sm font-medium text-indigo-700">
                  Estimated completion time: {doc.estimatedTime}
                </span>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="px-6 py-2"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => navigate("/documents/service-level-agreement")}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Create Service Level Agreement
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceLevelAgreementInfo;
