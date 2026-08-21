import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, Lock, Handshake } from "lucide-react";
import { documentContent } from "@/data/documentContent";

const DebtSettlementInfo: React.FC = () => {
  const navigate = useNavigate();
  const doc = documentContent["Debt Settlement Agreement"] || documentContent["default"];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">{doc.title}</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6 whitespace-pre-line">{doc.whatIs}</p>

            {/* Other Names / Aliases */}
            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {doc.otherNames.map((name: string) => (
                  <span key={name} className="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full font-medium">
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
                {doc.whenToUse.map((use: string, idx: number) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What You Need Section */}
          {doc.whatYouNeed && doc.whatYouNeed.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                What You Need
              </h2>
              <ul className="space-y-3">
                {doc.whatYouNeed.map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
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
              <ul className="space-y-3">
                {doc.keyProtections.map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQs Section */}
          {doc.faqs && doc.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {doc.faqs.map((faq: { q: string; a: string }, idx: number) => (
                  <Card key={idx} className="border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-pink-700 text-lg">{faq.q}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 whitespace-pre-line">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Legal Disclaimer Section */}
          {doc.legalDisclaimer && (
            <div className="mb-12">
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-yellow-800 text-sm whitespace-pre-line">{doc.legalDisclaimer}</p>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="flex justify-end mt-8">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DebtSettlementInfo;
