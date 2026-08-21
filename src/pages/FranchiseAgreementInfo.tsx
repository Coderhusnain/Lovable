import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, Users, CheckCircle, Download, Store, BookOpen, DollarSign, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { documentContent } from "@/data/documentContent";

const InfoBadge = ({ icon: Icon, title, children, className = "" }) => (
  <div className={`bg-white border border-gray-100 rounded-lg p-4 shadow-sm ${className}`}>
    <div className="flex items-start">
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <div className="text-gray-700 text-sm mt-1">{children}</div>
      </div>
    </div>
  </div>
);

const FranchiseAgreementInfo = () => {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const doc = documentContent["Franchise Purchase Agreement"] || documentContent["default"];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/documents')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contracts
          </Button>

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{doc.title}</h1>
            {doc.otherNames && doc.otherNames.length > 0 && (
              <p className="text-lg text-gray-600">{doc.otherNames[0]}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What Is a Franchise Purchase Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 whitespace-pre-line">{doc.whatIs}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When Should You Use a Franchise Purchase Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                {doc.whenToUse && doc.whenToUse.map((use: string, idx: number) => (
                  <div key={idx} className="flex items-start">
                    <p>{use}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {doc.faqs && doc.faqs.map((faq: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left font-semibold text-gray-700"
                    >
                      <span>{faq.q}</span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-indigo-600" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-4 py-3 bg-white">
                        <p className="text-gray-600">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Protections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {doc.keyProtections && doc.keyProtections.map((protection: string, idx: number) => (
                  <div key={idx} className="flex items-start">
                    <p className="text-gray-600 text-sm">{protection}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What You'll Need
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {doc.whatYouNeed && doc.whatYouNeed.map((need: string, idx: number) => (
                  <div key={idx} className="flex items-start">
                    <p className="text-gray-600">{need}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Download Franchise Purchase Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-gray-700">
                  <p className="mb-1">Download a professional, customizable Franchise Purchase Agreement ideal for franchisors and franchisees.</p>
                  <p className="text-sm text-gray-500">Estimated time to complete: {doc.estimatedTime}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button onClick={() => navigate('/documents')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Sign Online
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">
                  This information is provided for educational purposes only and does not constitute legal advice. For complex franchising matters or jurisdiction-specific questions, consult a qualified franchise attorney to ensure the agreement complies with applicable laws and protects your interests.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default FranchiseAgreementInfo;
