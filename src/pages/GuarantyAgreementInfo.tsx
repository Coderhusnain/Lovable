import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  Shield,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";
import { getDocumentContent } from "@/data/documentContent";

const GuarantyAgreementInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Guaranty Agreement");

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
            <h1 className="text-4xl font-bold mb-2">{doc.title}</h1>
            <p className="text-lg text-gray-600 whitespace-pre-line">{doc.whatIs}</p>
            {doc.otherNames?.length ? (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium">
                    {name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">When to Use</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                {doc.whenToUse.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Types of Guaranty Agreements</h2>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-5">
                <h3 className="font-semibold text-bright-orange-600 mb-2">Absolute Guaranty</h3>
                <p className="text-gray-700">The guarantor pays upon borrower default without additional conditions.</p>
              </div>
              <div className="border rounded-lg p-5">
                <h3 className="font-semibold text-bright-orange-600 mb-2">Conditional Guaranty</h3>
                <p className="text-gray-700">Liability begins only after specific conditions are met.</p>
              </div>
              <div className="border rounded-lg p-5">
                <h3 className="font-semibold text-bright-orange-600 mb-2">Limited Guaranty</h3>
                <p className="text-gray-700">Covers a fixed amount or limited scope of obligations.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">What to Include</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-5 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  {doc.whatYouNeed.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  {doc.keyProtections.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {doc.faqs.map((faq) => (
                <div key={faq.q} className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h3 className="font-semibold text-blue-900 mb-1">{faq.q}</h3>
                  <p className="text-blue-800">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Download a Guaranty Agreement from Legalgram?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3"><CheckCircle className="text-green-500 mt-1" /><span className="text-gray-700">Legally binding and enforceable format</span></div>
              <div className="flex items-start space-x-3"><CheckCircle className="text-green-500 mt-1" /><span className="text-gray-700">Professionally drafted template</span></div>
              <div className="flex items-start space-x-3"><CheckCircle className="text-green-500 mt-1" /><span className="text-gray-700">Easy to edit, print, and share</span></div>
              <div className="flex items-start space-x-3"><CheckCircle className="text-green-500 mt-1" /><span className="text-gray-700">Suitable for personal or business use</span></div>
            </div>
          </section>

          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-3">Download Guaranty Agreement</h2>
            <p className="text-lg mb-6">Best legal format • Free • Ready to sign</p>
            <Button size="lg" onClick={() => navigate("/documents/guaranty-agreement")} className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3">Download Guaranty Agreement</Button>
            <p className="text-orange-100 mt-4">Trusted by thousands of Legalgram users</p>
          </section>

          {doc.legalDisclaimer && (
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>Disclaimer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{doc.legalDisclaimer}</p>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GuarantyAgreementInfo;
