import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";
import { documentContent } from "@/data/documentContent";

const LotteryPoolContractInfo = () => {
  const navigate = useNavigate();
  const doc = (documentContent["Lottery Pool Agreement"] || documentContent["Lottery Pool Contract"] || documentContent["default"]) as typeof documentContent[string] & {
    importance?: string;
    download?: string;
    sample?: { description?: string; highlights?: string[] };
  };

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
            <h1 className="text-4xl font-bold mb-4">
              {doc.title || "Lottery Pool Agreement"}
            </h1>
            <p className="text-xl text-gray-600">
              {doc.shortDescription || "An agreement for shared ownership and distribution of lottery entries and winnings"}
            </p>
            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">
                    {name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What is a Lottery Pool Agreement?</h2>
            <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">{doc.whatIs}</p>

            {doc.importance && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Importance of a Lottery Pool Contract</h3>
                <p className="text-blue-800 whitespace-pre-line">{doc.importance}</p>
              </div>
            )}

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                A Lottery Pool Agreement typically includes:
              </h3>
              <ul className="text-blue-800 space-y-1">
                {(doc.keyProtections || []).map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* When to Use Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                When to Use a Lottery Pool Contract
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              A Lottery Pool Agreement should be used in the following situations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  {(doc.whenToUse || []).slice(0, Math.ceil((doc.whenToUse || []).length / 2)).map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">
                  {(doc.whenToUse || []).slice(Math.ceil((doc.whenToUse || []).length / 2)).map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Key Requirements Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Download Lottery Pool Agreement - Legalgram
              </h2>
            </div>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {doc.download || "If you are planning to create a lottery pool with friends, colleagues, or family members, download the Lottery Pool Agreement from Legalgram in a professionally structured format."}
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-3">
                <li>• Download Lottery Pool Agreement in the best professional format</li>
                <li>• Access a free Lottery Pool Agreement template</li>
                <li>• Use a ready-to-edit Lottery Pool Agreement draft</li>
                <li>• Get the best format Lottery Pool Agreement from Legalgram for personal or workplace lottery pools</li>
              </ul>
            </div>
          </section>

          {/* Sample Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Sample Lottery Pool Agreement
              </h2>
            </div>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {doc.sample?.description || "The terms in your Lottery Pool Agreement draft will update based on the information you provide."}
            </p>

            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-3">
                {(doc.sample?.highlights || []).map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {doc.faqs.map((faq, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">{faq.q}</h3>
                  <p className="text-blue-800">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final Steps Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Final Steps After Creating Your Lottery Pool Agreement
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="text-gray-700 space-y-2">
                <li>1. Review all participant details.</li>
                <li>2. Ensure every co-owner signs and dates the contract.</li>
                <li>3. Share copies with all participants.</li>
                <li>4. Store the original securely with the manager.</li>
              </ol>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Create Your Lottery Pool Agreement Now
            </h2>
            <p className="text-xl mb-6">
              Set clear rules and share winnings the right way.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/documents/lottery-pool-agreement")}
              className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Lottery Pool Agreement
            </Button>
            <p className="text-bright-orange-100 mt-4">
              Fair shares. Clear rules. Peace of mind.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default LotteryPoolContractInfo;
