import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Scale } from "lucide-react";
import { getDocumentContent } from "@/data/documentContent";

const DivorceSettlementAgreementInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Marriage Separation Agreement");

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{doc.title} Guide</h1>
            <p className="text-xl text-gray-600">Complete guide to understanding and creating your {doc.title}</p>
            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-bright-orange-50 text-bright-orange-700 rounded-full text-sm">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">{doc.whatIs}</p>
            {doc.legalDisclaimer && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Important Note</h3>
                <p className="text-blue-800">{doc.legalDisclaimer}</p>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
              When to Use This Document
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">Use this document when:</p>
            <ul className="text-gray-700 space-y-2 ml-4">
              {doc.whenToUse.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
              What is Included?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">A complete {doc.title} usually contains:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doc.whatYouNeed?.map((item) => (
                <div key={item} className="border-l-4 border-green-500 pl-4 py-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item}</h3>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-5 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Separation vs Divorce</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  A {doc.title} allows spouses to live apart while often remaining legally married.
                </p>
                <p className="text-gray-700 leading-relaxed">A divorce legally ends the marriage.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Benefits of a Separation Agreement</h3>
                <ul className="text-gray-700 space-y-2">
                  {doc.keyProtections?.slice(0, 4).map((benefit) => (
                    <li key={benefit}>• {benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Why Use a Separation Agreement?</h2>
            </div>
            <p className="text-gray-700 mb-6">Using a {doc.title} can help:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doc.keyProtections?.map((item) => (
                <div key={item} className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-700">• {item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {doc.faqs.map((faq) => (
                <div key={faq.q} className="border-l-4 border-bright-orange-500 pl-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-bright-orange-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
              Create Your {doc.title} Today
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Create and download a {doc.title} instantly from Legalgram for temporary separation, legal separation, marital settlements, or pre-divorce planning.
            </p>

            <div className="bg-white p-4 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Why Use Legalgram?</h3>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• Free download {doc.title}</li>
                <li>• Editable Word & PDF templates</li>
                <li>• Lawyer-style professional drafts</li>
                <li>• Ready-to-use family law documents</li>
                <li>• Instant access downloads</li>
              </ul>
            </div>

            <p className="text-center text-lg font-semibold text-gray-800 mt-4">
              {doc.estimatedTime ? `Prepare your agreement in about ${doc.estimatedTime}.` : "Prepare your agreement quickly with a professional template."}
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Need More Help?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Legal Advice</h4>
                <p className="text-gray-600 text-sm mb-2">For complex situations or legal questions, consult with a qualified attorney.</p>
                <Button variant="outline" onClick={() => navigate('/ask-a-lawyer')}>
                  Ask a Lawyer
                </Button>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Other Forms</h4>
                <p className="text-gray-600 text-sm mb-2">Explore our library of legal document templates.</p>
                <Button variant="outline" onClick={() => navigate('/documents')}>
                  Browse Documents
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DivorceSettlementAgreementInfo;
