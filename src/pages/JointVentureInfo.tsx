import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Users, Globe } from "lucide-react";
import { getDocumentContent } from "@/data/documentContent";

const JointVentureInfo: React.FC = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Joint Venture Agreement");

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">{doc.title}</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6 whitespace-pre-line leading-relaxed">{doc.whatIs}</p>

            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {doc.whenToUse && doc.whenToUse.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                When to Use
              </h2>
              <ul className="space-y-3">
                {doc.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {doc.whatYouNeed && doc.whatYouNeed.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You Need</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.whatYouNeed.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {doc.keyProtections && doc.keyProtections.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Protections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doc.keyProtections.map((protection, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
                    <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{protection}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {doc.faqs && doc.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {doc.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-amber-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-3 text-amber-700">{faq.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center space-y-4">
            <Button
              onClick={() => navigate("/documents/joint-venture-agreement")}
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-8 py-3"
            >
              Create Joint Venture Agreement
            </Button>
            <p className="text-sm text-gray-500">Estimated time: {doc.estimatedTime}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JointVentureInfo;
