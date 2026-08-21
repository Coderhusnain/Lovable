import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, Shield, Lock } from "lucide-react";
import { documentContent } from "@/data/documentContent";

const SecurityAgreementInfo = () => {
  const navigate = useNavigate();
  const doc = documentContent["Security Agreement"] || documentContent["default"];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-100 rounded-full p-4">
                <Shield className="w-16 h-16 text-orange-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {doc.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {doc.whatIs}
            </p>
          </div>

          {/* Other Names Section */}
          {doc.otherNames && doc.otherNames.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
              <h3 className="font-semibold text-orange-900 mb-3">Also Known As:</h3>
              <div className="flex flex-wrap gap-2">
                {doc.otherNames.map((name, index) => (
                  <span
                    key={index}
                    className="bg-white border border-orange-300 text-orange-800 px-3 py-1 rounded-full text-sm"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-8">
            {/* When to Use Section */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                When Should You Use This?
              </h2>
              <div className="space-y-3">
                {doc.whenToUse && doc.whenToUse.map((item, index) => (
                  <div key={index} className="flex items-start bg-orange-50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* What You Need Section */}
            {doc.whatYouNeed && doc.whatYouNeed.length > 0 && (
              <section className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-6 h-6 text-orange-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    What You Need to Prepare
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doc.whatYouNeed.map((item, index) => (
                    <div key={index} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <p className="text-gray-700 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Protections Section */}
            {doc.keyProtections && doc.keyProtections.length > 0 && (
              <section className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-6">
                  <Lock className="w-6 h-6 text-orange-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Key Protections Included
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doc.keyProtections.map((protection, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg"
                    >
                      <p className="font-semibold text-gray-900">{protection}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            {doc.faqs && doc.faqs.length > 0 && (
              <section className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {doc.faqs.map((faq, index) => (
                    <div key={index} className="border border-orange-200 rounded-lg p-4">
                      <h3 className="font-semibold text-orange-900 mb-2 flex items-start">
                        {faq.q}
                      </h3>
                      <p className="text-gray-700 text-sm ml-7">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Important Notice */}
            <section className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center">
                Important Note
              </h3>
              <p className="text-amber-800 text-sm">
                Always ensure that your Security Agreement clearly defines the collateral, loan
                amount, repayment terms, and consequences of default. Keep executed copies securely
                and consider filing a UCC-1 Financing Statement to perfect your security interest
                and establish priority over other creditors.
              </p>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">
                Create Your Security Agreement
              </h2>
              <p className="text-xl mb-6">
                Secure your loan with clear collateral terms. Our guided form takes just {doc.estimatedTime}.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/documents/security-agreement")}
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8"
              >
                <Shield className="w-4 h-4 mr-2" />
                Start Security Agreement
              </Button>
              <p className="text-orange-100 mt-4">
                Clear collateral. Strong protection. Legal security.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SecurityAgreementInfo;