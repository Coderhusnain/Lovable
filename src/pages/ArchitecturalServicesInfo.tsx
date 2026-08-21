import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Landmark, Lock, AlertCircle } from "lucide-react";
import { architecturalServicesAgreementInfo } from "@/data/architecturalServicesAgreementInfo";

const ArchitecturalServicesInfo: React.FC = () => {
  const navigate = useNavigate();
  const info = architecturalServicesAgreementInfo;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">Architectural Services Agreement</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{info.definition}</p>

            {/* Other Names / Aliases */}
            {info.otherNames && info.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {info.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Why Important Section */}
          <div className="mb-12 bg-gradient-to-r from-slate-50 to-indigo-50 border border-indigo-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why It's Important</h2>
            <p className="text-gray-700 leading-relaxed">{info.whyImportant}</p>
          </div>

          {/* How It Works Section */}
          {info.howItWorks && (
            <div className="mb-12 bg-white border border-indigo-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How Does an Architect Contract Work?</h2>
              <p className="text-gray-700 mb-6">{info.howItWorks.description}</p>
              {info.howItWorks.ensures && info.howItWorks.ensures.length > 0 && (
                <div className="space-y-3">
                  <p className="text-gray-700 font-semibold">It ensures:</p>
                  {info.howItWorks.ensures.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* When to Use Section */}
          {info.whenToUse && info.whenToUse.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                When to Use
              </h2>
              <ul className="space-y-3">
                {info.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
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
                  <div key={idx} className="flex gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
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
                  <div key={idx} className="p-4 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-lg border border-indigo-200">
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
                What's Included
              </h2>
              <div className="space-y-4">
                {info.whatIncludes.map((section, idx) => (
                  <div key={idx} className="bg-white border border-indigo-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-2 text-indigo-700">{section.title}</h3>
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
                  <div key={idx} className="bg-white border border-indigo-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-3 text-indigo-700">{faq.question}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights Section */}
          {info.highlights && info.highlights.length > 0 && (
            <div className="mb-12 bg-gradient-to-r from-indigo-600 to-slate-600 rounded-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Why Choose Our Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {info.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-6 h-6 text-indigo-200 mt-0.5 flex-shrink-0" />
                    <span className="text-indigo-50">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Notice */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8 flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Legal Notice</h3>
              <p className="text-amber-800 text-sm">
                An Architectural Services Agreement is a significant professional contract. Requirements and best practices vary by jurisdiction, project type, and scope of architectural services. This template is designed as a general reference for architectural service agreements. For complex architectural projects, significant contract terms, or jurisdiction-specific concerns, consult with a qualified attorney experienced in professional services agreements to ensure the contract complies with local regulations and industry standards.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center space-y-4">
            <Button
              onClick={() => navigate("/documents/architectural-services")}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-slate-600 hover:from-indigo-700 hover:to-slate-700 text-white px-8 py-3"
            >
              Create Architectural Services Agreement
            </Button>
            <p className="text-sm text-gray-500">
              Estimated time: 20-25 minutes
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArchitecturalServicesInfo;
