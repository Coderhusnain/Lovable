import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getDocumentContent } from "@/data/documentContent";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  Users,
  Clock,
  Shield,
  Layers,
} from "lucide-react";

const commonUses = [
  "Business startup financing",
  "Real estate lending",
  "Corporate restructuring",
  "Private lending deals",
  "Investor loans",
  "Shareholder loans",
  "Debt consolidation transactions",
];

const benefits = [
  "Create transparency among lenders",
  "Protect lending security",
  "Encourage new financing approvals",
  "Minimize future legal disputes",
  "Organize debt repayment structure",
  "Strengthen business borrowing options",
];

const whyDownload = [
  "Free download Subordinated Loan Agreement",
  "Editable Word and PDF templates",
  "Professional legal drafting format",
  "Ready-to-use financing documents",
  "Instant access and download",
];

const sampleUses = [
  "private lenders",
  "business creditors",
  "startup investors",
  "real estate lenders",
  "shareholder financing",
];

const SubordinatedLoanAgreementInfo = () => {
  const navigate = useNavigate();
  const docContent = getDocumentContent("Subordinated Loan Agreement");

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{docContent.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {docContent.whatIs}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{docContent.whatIs}</p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Why use a Subordinated Loan Agreement?</h3>
              <ul className="text-blue-800 space-y-2">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">When to Use This Document</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docContent.whenToUse.map((item) => (
                <div key={item} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 mt-1 text-bright-orange-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Common Uses</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonUses.map((item) => (
                <div key={item} className="rounded-lg border p-4">
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">What Is Included?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docContent.whatYouNeed?.map((item) => (
                <div key={item} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 mt-1 text-green-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Benefits of Using This Document</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docContent.keyProtections?.map((item) => (
                <div key={item} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 mt-1 text-bright-orange-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Download from Legalgram?</h2>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                At Legalgram, users get a professional Subordinated Loan Agreement template that is ready for business lending, refinancing, and structured debt transactions.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                {whyDownload.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 text-bright-orange-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Sample Subordinated Loan Agreement</h2>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed">
                Your Subordinated Loan Agreement can be customized for {sampleUses.join(", ")}. Download Subordinated Loan Agreement on Legalgram today and secure proper creditor repayment priority professionally.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {docContent.faqs.map((faq) => (
                <div key={faq.q} className="border-l-4 border-bright-orange-500 bg-orange-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Final Checklist Before Signing</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>Confirm the senior and junior debt definitions</li>
                <li>Review repayment priority and payment restrictions</li>
                <li>Check default, enforcement, and governing law clauses</li>
                <li>Ensure all required parties sign the agreement</li>
              </ul>
            </div>
          </section>

          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Download Subordinated Loan Agreement</h2>
            <p className="text-xl mb-6">
              Create and download Subordinated Loan Agreement instantly from Legalgram for creditor priority, loan ranking, business lending, refinancing, and structured debt transactions.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/subordinated-loan-agreement")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Subordinated Loan Agreement
            </Button>
            <p className="text-bright-orange-100 mt-4">Clear priority. Strong protection.</p>
          </section>

          {docContent.legalDisclaimer ? (
            <p className="text-sm text-gray-500 leading-relaxed">{docContent.legalDisclaimer}</p>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default SubordinatedLoanAgreementInfo;
