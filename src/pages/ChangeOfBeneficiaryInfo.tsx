import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, AlertCircle, Shield, Users } from "lucide-react";
import { getDocumentContent } from "@/data/documentContent";

const ChangeOfBeneficiaryInfo = () => {
  const navigate = useNavigate();
  const docContent = getDocumentContent("Change of Beneficiary Letter");

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
            <h1 className="text-4xl font-bold mb-4">{docContent.title}</h1>
            <p className="text-xl text-gray-600">Update life insurance and financial policy beneficiaries easily</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">

          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What is a Change of Beneficiary Letter?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {docContent.whatIs}
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">A Change of Beneficiary Letter usually includes:</h3>
              <ul className="text-blue-800 space-y-1">
                {docContent.whatYouNeed?.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Get your draft Change of Beneficiary Letter today from Legalgram with ready-to-use professional format.
            </p>
          </section>

          {/* Other Names Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Other Names</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                {docContent.otherNames?.map((name, idx) => (
                  <li key={idx}>• {name}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">When to Use a Change of Beneficiary Letter</h2>
            </div>
            <p className="text-gray-700 mb-4">Use this Change of Beneficiary Letter when:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                {docContent.whenToUse?.map((use, idx) => (
                  <li key={idx}>• {use}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Why Choose Legalgram Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Why Choose Legalgram?</h2>
            </div>
            <p className="text-gray-700 mb-4">At Legalgram, users can get:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• Free download Change of Beneficiary Letter</li>
                <li>• Editable Word & PDF format</li>
                <li>• Professionally drafted template</li>
                <li>• Instant download document</li>
                <li>• Easy customization online</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you need a trusted Change of Beneficiary Letter, choose the best format this agreement from Legalgram.
            </p>
          </section>

          {/* Key Benefits Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Key Benefits of a Change of Beneficiary Letter</h2>
            </div>
            <p className="text-gray-700 mb-4">A proper Change of Beneficiary Letter helps:</p>
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-3">
                {docContent.keyProtections?.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="bg-bright-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">{idx + 1}</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* What to Include Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">What to Include in a Change of Beneficiary Letter</h2>
            </div>
            <p className="text-gray-700 mb-4">Your Change of Beneficiary Letter should include:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="text-gray-700 space-y-2">
                <li>• Policy number</li>
                <li>• Policyholder details</li>
                <li>• Existing beneficiary information</li>
                <li>• New beneficiary information</li>
                <li>• Requested changes</li>
                <li>• Signature and date</li>
              </ul>
            </div>
          </section>

          {/* Download Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Download Change of Beneficiary Letter</h2>
            <p className="text-gray-700 mb-4">
              Prepare and download Change of Beneficiary Letter instantly from Legalgram. Our templates are simple, professional, and suitable for insurance and financial record updates.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Sample Change of Beneficiary Letter</h3>
              <p className="text-gray-700">
                Your document updates automatically based on the information you provide. Thousands of users trust Legalgram for legal letters and document templates.
              </p>
            </div>
            <p className="text-gray-700 font-medium">
              Download Change of Beneficiary Letter on Legalgram today.
            </p>
          </section>


          {/* CTA Button Section */}
          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {docContent.faqs?.map((faq, idx) => (
                <div key={idx} className="border-l-4 border-bright-orange-500 bg-orange-50 p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">❓ {faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Get Your Change of Beneficiary Letter Today</h2>
            <p className="text-lg mb-6">Create your professional document now with Legalgram's easy-to-use template.</p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/ChangeOfBeneficiaryForm")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Create Letter
            </Button>
            <p className="text-bright-orange-100 mt-4">Instant download. Professional. Ready to use.</p>
          </section>

        </div>
      </div>
    </Layout>
  );
};

export default ChangeOfBeneficiaryInfo;
