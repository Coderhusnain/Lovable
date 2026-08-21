import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Landmark, Lock, AlertCircle } from "lucide-react";
import { copyrightAssignmentInfo } from "@/data/copyrightAssignmentInfo";

const CopyrightAssignmentInfo: React.FC = () => {
  const navigate = useNavigate();
  const info = copyrightAssignmentInfo;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl font-bold text-gray-900">Copyright Assignment</h1>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">{info.definition}</p>

            {/* Other Names / Aliases */}
            {info.otherNames && info.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {info.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Why Important Section */}
          <div className="mb-12 bg-gradient-to-r from-slate-50 to-purple-50 border border-purple-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why It's Important</h2>
            <p className="text-gray-700 leading-relaxed">{info.whyImportant}</p>
          </div>

          {/* How It Works Section */}
          {info.howItWorks && (
            <div className="mb-12 bg-white border border-purple-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How Does a Copyright Assignment Work?</h2>
              <p className="text-gray-700 mb-6">{info.howItWorks.description}</p>
              {info.howItWorks.ensures && info.howItWorks.ensures.length > 0 && (
                <div className="space-y-3">
                  <p className="text-gray-700 font-semibold">It ensures:</p>
                  {info.howItWorks.ensures.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
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
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
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
                  <div key={idx} className="flex gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
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
                {info.idealFor.map((person, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-white rounded-lg border border-purple-200">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{person}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What Includes Section */}
          {info.whatIncludes && info.whatIncludes.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                What's Included in the Agreement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {info.whatIncludes.map((item, idx) => (
                  <div key={idx} className="p-6 bg-white rounded-lg border border-purple-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {info.faqItems && info.faqItems.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {info.faqItems.map((faq, idx) => (
                  <details key={idx} className="p-4 bg-white rounded-lg border border-purple-200 cursor-pointer hover:border-purple-300 transition">
                    <summary className="font-semibold text-gray-900 flex justify-between items-center">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Highlights Section */}
          {info.highlights && info.highlights.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our Copyright Assignment?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {info.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transfer Your Copyright?</h2>
            <p className="text-gray-700 mb-8 text-lg">Get started with our professionally designed Copyright Assignment template today.</p>
            <Button size="lg" onClick={() => navigate("/copyright-assignment-form")} className="bg-purple-600 hover:bg-purple-700 text-lg px-8 text-white">
              Create Your Assignment Now
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CopyrightAssignmentInfo;
