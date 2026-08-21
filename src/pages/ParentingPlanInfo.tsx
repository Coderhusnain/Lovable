import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";
import { getDocumentContent } from "@/data/documentContent";

const ParentingPlanInfo = () => {
  const navigate = useNavigate();
  const doc = getDocumentContent("Parenting Plan");

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{doc.title}</h1>
            <p className="text-xl text-gray-600">A clear family-law plan for custody, visitation, and co-parenting responsibilities</p>
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
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What is a Parenting Plan?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{doc.whatIs}</p>
            <p className="text-gray-700 leading-relaxed">Get your draft Parenting Plan today from Legalgram with a ready-to-use professional format.</p>
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
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Common Custody Options</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-5 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Joint Legal Custody</h3>
                <p className="text-gray-700">Both parents make major decisions together.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Sole Legal Custody</h3>
                <p className="text-gray-700">One parent makes major decisions.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Joint Physical Custody</h3>
                <p className="text-gray-700">Children spend substantial time with both parents.</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Primary Physical Custody</h3>
                <p className="text-gray-700">Children mainly live with one parent.</p>
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

          <section className="bg-gray-50 rounded-xl p-6 border">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Sample Parenting Plan</h2>
            <p className="text-gray-700 leading-relaxed">Your document updates automatically based on the information you provide. Thousands of users trust Legalgram for family law documents and legal templates.</p>
          </section>

          {doc.legalDisclaimer && (
            <section className="text-sm text-gray-600">
              {doc.legalDisclaimer}
            </section>
          )}

          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Download Parenting Plan</h2>
            <p className="text-xl mb-6">Prepare and download {doc.title} instantly from Legalgram. Our templates are simple, professional, and suitable for divorce, separation, custody, and co-parenting matters.</p>
            <Button
              size="lg"
              onClick={() => navigate("/parenting-plan-form")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Parenting Plan
            </Button>
            <p className="text-bright-orange-100 mt-4">Clear terms. Legal certainty. Peace of mind.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ParentingPlanInfo;