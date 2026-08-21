import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";
import { getDocumentContent } from "@/data/documentContent";

const NotePayableInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Note Payable");

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{doc.title}</h1>
            <p className="text-xl text-gray-600">A formal loan document that records repayment terms and legal obligations</p>
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
            <p className="text-gray-700 leading-relaxed mb-4">{doc.whatIs}</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">A {doc.title} usually includes:</h3>
              <ul className="text-blue-800 space-y-1">
                {doc.whatYouNeed?.slice(0, 5).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This document helps both parties understand the amount borrowed, interest rate, payment schedule, maturity date, and consequences of default.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">When to Use a {doc.title}</h2>
            </div>
            <p className="text-gray-700 mb-4">Use this {doc.title} when:</p>
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
              <h2 className="text-2xl font-bold text-gray-900">Key Benefits of a {doc.title}</h2>
            </div>
            <p className="text-gray-700 mb-6">A proper {doc.title} helps:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doc.keyProtections?.map((benefit, index) => (
                <div key={benefit} className="border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-bright-orange-600">{index + 1}. {benefit}</h3>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">What to Include in a {doc.title}</h2>
            </div>
            <p className="text-gray-700 mb-6">Your {doc.title} should include:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doc.whatYouNeed?.map((item) => (
                <div key={item} className="border rounded-lg p-4 bg-gray-50">
                  <p className="text-gray-700">• {item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Note Payable vs Accounts Payable</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-5 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Note Payable</h3>
                <p className="text-gray-700">Formal borrowed debt with written repayment terms.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Accounts Payable</h3>
                <p className="text-gray-700">Business money owed to suppliers for goods or services.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {doc.faqs.map((faq, index) => {
                const classes = [
                  { box: "border-green-500 bg-green-50", title: "text-green-900", body: "text-green-800" },
                  { box: "border-blue-500 bg-blue-50", title: "text-blue-900", body: "text-blue-800" },
                  { box: "border-purple-500 bg-purple-50", title: "text-purple-900", body: "text-purple-800" },
                  { box: "border-orange-500 bg-orange-50", title: "text-orange-900", body: "text-orange-800" }
                ][index % 4];
                return (
                  <div key={faq.q} className={`border-l-4 ${classes.box} p-4`}>
                    <h3 className={`font-semibold ${classes.title} mb-2`}>✅ {faq.q}</h3>
                    <p className={classes.body}>{faq.a}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Create Your {doc.title}</h2>
            <p className="text-xl mb-6">Prepare and download {doc.title} instantly from Legalgram.</p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/note-payable")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Note Payable
            </Button>
            <p className="text-bright-orange-100 mt-4">Clear terms. Legal certainty. Peace of mind.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default NotePayableInfo;
