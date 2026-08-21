import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield, BookOpen } from "lucide-react";
import { getDocumentContent } from "@/data/documentContent";

const IOUInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("IOU");

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{doc.title}</h1>
            <p className="text-xl text-gray-600 whitespace-pre-line">{doc.whatIs}</p>
            {doc.otherNames?.length ? (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium">{name}</span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">{doc.whatIs}</p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">An IOU typically includes:</h3>
              <ul className="text-blue-800 space-y-1">
                {doc.whatYouNeed.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">IOUs are commonly used for personal loans, informal lending arrangements, business advances, and situations where proof of debt is required.</p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">When to Use an IOU Form</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doc.whenToUse.map((item) => (
                <div key={item} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">• {item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Key Benefits of an IOU Form</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doc.keyProtections.map((item) => (
                <div key={item} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle className="text-green-500 mt-1 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">How to Create an IOU</h2>
            </div>
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start"><span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span><span>Enter borrower and lender information.</span></li>
                <li className="flex items-start"><span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span><span>Specify the amount owed and repayment terms.</span></li>
                <li className="flex items-start"><span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span><span>Add interest, installment, or due date details.</span></li>
                <li className="flex items-start"><span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span><span>Download, sign, and store securely.</span></li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {doc.faqs.map((faq) => (
                <div key={faq.q} className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <h3 className="font-semibold text-blue-900 mb-1">{faq.q}</h3>
                  <p className="text-blue-800">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Does an IOU Need Notarization?</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">{doc.legalDisclaimer}</p>
            </div>
          </section>

          <section>
            <div className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">Download IOU Form</h2>
              <p className="text-xl mb-6">Prepare and download IOU Form instantly from Legalgram.</p>
              <Button size="lg" onClick={() => navigate("/documents/iou")} className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3">
                Start Your IOU
              </Button>
              <p className="text-bright-orange-100 mt-4">Clear acknowledgment. Secure repayment. Legal clarity.</p>
            </div>
          </section>

          <section>
            <Card>
              <CardHeader>
                <CardTitle>Sample IOU Form</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Your document updates automatically based on the information you provide. Thousands of users trust Legalgram for financial forms and legal templates.</p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default IOUInfo;
