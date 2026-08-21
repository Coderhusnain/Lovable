import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield, BookOpen } from "lucide-react";
import { documentContent, getDocumentContent } from "@/data/documentContent";

const DirectMailAdvertisingInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Direct Mail Advertising Request");

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{doc.title}</h1>
            <p className="text-xl text-gray-600 whitespace-pre-line">{doc.whatIs}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">{doc.whatIs}</p>

            {doc.whatYouNeed && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">This request typically includes:</h3>
                <ul className="text-blue-800 space-y-1">
                  {doc.whatYouNeed.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* When to Use */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Direct Mail Advertising Request
              </h2>
            </div>
            <p className="text-gray-700 mb-4">This document is appropriate in the following situations:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doc.whenToUse && doc.whenToUse.map((item, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">• {item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Requirements */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Key Requirements
              </h2>
            </div>
            <p className="text-gray-700 mb-6">To ensure your request is accepted and processed, include the following:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(doc.whatYouNeed || []).map((item, idx) => (
                <div key={idx} className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">{idx + 1}. {item.split(' ')[0]}</h3>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to Create */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                How to Create a Direct Mail Advertising Request
              </h2>
            </div>
            <p className="text-gray-700 mb-6">Creating a request is simple and can be completed in minutes:</p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                {(doc.whatYouNeed || []).slice(0,4).map((step, i) => (
                  <li key={i} className="flex items-start">
                    <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">{i+1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {(doc.faqs || []).map((faq, i) => (
                <div key={i} className="border-l-4 border-blue-200 bg-blue-50 p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">{faq.q}</h3>
                  <p className="text-blue-800">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final Checklist */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Checklist — Direct Mail Advertising Request
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Ensure the letter is signed.</li>
                <li>2. Confirm mailing and contact details are accurate.</li>
                <li>3. Retain a copy for your records.</li>
              </ol>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Direct Mail Advertising Request
            </h2>
            <p className="text-xl mb-6">
              Request targeted advertising materials quickly and professionally using
              our ready-to-use template.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/direct-mail-request")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Request Now
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Clear requests. Better outreach.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DirectMailAdvertisingInfo;
