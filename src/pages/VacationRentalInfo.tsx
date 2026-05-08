import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Home, Lock, AlertCircle } from "lucide-react";
import { vacationRentalAgreementInfo } from "@/data/vacationRentalAgreementInfo";

const VacationRentalInfo: React.FC = () => {
  const navigate = useNavigate();
  const info = vacationRentalAgreementInfo;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Home className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Vacation Rental Agreement</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{info.definition}</p>

            {/* Other Names / Aliases */}
            {info.otherNames && info.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {info.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Why Important Section */}
          <div className="mb-12 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why It's Important</h2>
            <p className="text-gray-700 leading-relaxed">{info.whyImportant}</p>
          </div>

          {/* When to Use Section */}
          {info.whenToUse && info.whenToUse.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-600" />
                When to Use
              </h2>
              <ul className="space-y-3">
                {info.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Benefits Section */}
          {info.keyBenefits && info.keyBenefits.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {info.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ideal For Section */}
          {info.idealFor && info.idealFor.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ideal For</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {info.idealFor.map((party, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                    <span className="text-gray-700 font-medium">{party}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's Included Section */}
          {info.whatIncludes && info.whatIncludes.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-amber-600" />
                What's Included
              </h2>
              <div className="space-y-4">
                {info.whatIncludes.map((section, idx) => (
                  <div key={idx} className="bg-white border border-amber-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-2 text-amber-700">{section.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{section.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {info.faqItems && info.faqItems.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {info.faqItems.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-amber-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-3 text-amber-700">{faq.question}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          {info.features && info.features.length > 0 && (
            <div className="mb-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Why Choose Our Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {info.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-6 h-6 text-amber-100 mt-0.5 flex-shrink-0" />
                    <span className="text-amber-50">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8 flex gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Legal Notice</h3>
              <p className="text-blue-800 text-sm">
                A Vacation Rental Agreement is a legally binding document. Requirements and best practices vary by jurisdiction, local rental laws, and property type. This template is designed as a general reference for short-term vacation rentals. Before using this agreement, verify compliance with local short-term rental regulations, tax requirements, and insurance requirements. For complex situations or jurisdiction-specific concerns, consult with a qualified attorney to ensure the agreement complies with all applicable laws and includes necessary protections for your specific situation.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center space-y-4">
            <Button
              onClick={() => navigate("/documents/vacation-rental")}
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3"
            >
              Create Vacation Rental Agreement
            </Button>
            <p className="text-sm text-gray-500">
              Estimated time: 15-20 minutes
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VacationRentalInfo;
