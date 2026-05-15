import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Car, BookOpen } from "lucide-react";
import { getDocumentContent } from "@/data/documentContent";

const LimousineInfo: React.FC = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Limousine Service Contract");

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Car className="w-8 h-8 text-gray-700" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">{doc.title}</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6 whitespace-pre-line leading-relaxed">{doc.whatIs}</p>

            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {doc.whenToUse && doc.whenToUse.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-gray-700" />
                When to Use
              </h2>
              <ul className="space-y-3">
                {doc.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
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
                  <div key={idx} className="flex gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <CheckCircle className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
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
                  <div key={idx} className="flex gap-3 p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-200">
                    <CheckCircle className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
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
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-3">{faq.q}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center space-y-4">
            <Button
              onClick={() => navigate("/documents/limousine-service-contract")}
              size="lg"
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3"
            >
              Create Limousine Service Contract
            </Button>
            <p className="text-sm text-gray-500">Estimated time: {doc.estimatedTime}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LimousineInfo;
