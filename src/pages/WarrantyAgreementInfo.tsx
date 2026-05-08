import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, Shield, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { getDocumentContent } from "@/data/documentContent";

const WarrantyAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Warranty Repair Request Letter");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const commonProducts = [
    "Refrigerators",
    "Washing machines",
    "Air conditioners",
    "Televisions",
    "Mobile phones",
    "Laptops",
    "Cars and motorcycles",
    "Furniture",
    "Home appliances",
    "Electronics",
  ];

  const whyDownload = [
    "Free download Warranty Repair Request Letter",
    "Editable Word and PDF templates",
    "Professional legal format",
    "Easy customization",
    "Instant download access",
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Shield className="w-8 h-8 text-amber-700" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">{doc.title}</h1>
            </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">{doc.whatIs}</p>

            {/* Other Names / Aliases */}
            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-12 p-6 bg-white border-2 border-amber-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use a Warranty Repair Request Letter?</h2>
            <p className="text-gray-700 mb-4">
              A professionally written Warranty Repair Request Letter helps:
            </p>
            <ul className="space-y-3">
              {doc.keyProtections?.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mt-4">
              Get the draft Warranty Repair Request Letter from Legalgram for fast and professional warranty claims.
            </p>
          </div>

          {/* When to Use Section */}
          {doc.whenToUse && doc.whenToUse.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                When to Use This Letter
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

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              Common Products Covered
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonProducts.map((product) => (
                <Card key={product} className="border-amber-100 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-700">{product}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Download from Legalgram?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {whyDownload.map((item) => (
                <Card key={item} className="border-amber-100 bg-amber-50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-gray-700 mt-4">
              For the best format this agreement from Legalgram, use our trusted ready-made legal templates.
            </p>
          </div>

          <div className="mb-12 p-6 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Download Warranty Repair Request Letter</h2>
            <p className="text-gray-700 leading-relaxed">
              Create and download Warranty Repair Request Letter instantly from Legalgram for appliances, electronics, vehicles, furniture, and all warranty-covered products.
            </p>
          </div>

          <div className="mb-12 p-6 bg-white border-2 border-amber-100 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sample Warranty Repair Request Letter</h2>
            <p className="text-gray-700 leading-relaxed">
              Your Warranty Repair Request Letter can be customized for product defects, delayed repairs, replacement claims, service center notices, or seller complaints.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Download Warranty Repair Request Letter on Legalgram today and protect your warranty rights professionally.
            </p>
          </div>

          {/* FAQ Section */}
          {doc.faqs && doc.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {doc.faqs.map((faq, idx) => (
                  <div key={idx} className="border-2 border-amber-100 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-amber-50 transition-colors text-left"
                    >
                      <span className="font-semibold text-gray-900">{faq.q}</span>
                      {expandedFAQ === idx ? (
                        <ChevronUp className="w-5 h-5 text-amber-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedFAQ === idx && (
                      <div className="px-6 py-4 bg-amber-50 border-t-2 border-amber-100">
                        <p className="text-gray-700">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Protections Section */}
          {doc.keyProtections && doc.keyProtections.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-amber-600" />
                Key Protections
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {doc.keyProtections.map((protection, idx) => (
                  <Card key={idx} className="border-amber-100 bg-amber-50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-3 items-start">
                        <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{protection}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* What You Need Section */}
          {doc.whatYouNeed && doc.whatYouNeed.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-amber-600" />
                What You'll Need
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doc.whatYouNeed.map((item, idx) => (
                  <Card key={idx} className="border-amber-100 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-700">{item}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="mb-12 p-6 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Important Note:</strong> A Warranty Repair Request Letter creates a formal record of your complaint and request for service. Keep copies of all correspondence and receipts, and consult a qualified attorney or consumer protection professional if the dispute is not resolved.
            </p>
          </div>

          {/* Estimated Time */}
          {doc.estimatedTime && (
            <div className="mb-12 p-6 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-200 rounded-lg text-center">
              <p className="text-lg font-semibold text-amber-900">
                ⏱️ Estimated Time to Complete: {doc.estimatedTime}
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/documents")}
              variant="outline"
              className="px-6 py-2"
            >
              Back to Documents
            </Button>
            <Button
              onClick={() => navigate("/documents")}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white"
            >
              Create Warranty Agreement Now
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WarrantyAgreementInfo;
