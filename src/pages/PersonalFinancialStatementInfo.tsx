import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, CheckCircle, Users, Clock, Shield } from "lucide-react";
import { documentContent } from "@/data/documentContent";

const PersonalFinancialStatementInfo = () => {
  const navigate = useNavigate();
  const doc = (documentContent["Personal Financial Statement"] || documentContent["default"]) as typeof documentContent[string] & {
    sample?: { description?: string; highlights?: string[] };
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-bright-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">{doc.title || "Personal Financial Statement"}</h1>
            <p className="text-xl text-gray-600">{doc.shortDescription || "A personal financial statement to document assets, liabilities, income, and expenses."}</p>
            {doc.otherNames && doc.otherNames.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {doc.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">{name}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What is a Personal Financial Statement?</h2>
            <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">{doc.whatIs}</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Key Details</h3>
              <ul className="text-blue-800 space-y-1">
                {(doc.keyProtections || []).map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">When to Use</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">{(doc.whenToUse || []).slice(0, Math.ceil((doc.whenToUse || []).length / 2)).map((item, idx) => (<li key={idx}>• {item}</li>))}</ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-gray-700 space-y-2">{(doc.whenToUse || []).slice(Math.ceil((doc.whenToUse || []).length / 2)).map((item, idx) => (<li key={idx}>• {item}</li>))}</ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-bright-orange-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Sample Statement</h2>
            </div>
            <p className="text-gray-700 mb-6 whitespace-pre-line">{doc.sample?.description || "Use this Personal Financial Statement to record assets, liabilities, income, and expenses. Sign to certify accuracy."}</p>
            <div className="bg-gradient-to-r from-bright-orange-50 to-bright-orange-100 p-6 rounded-lg">
              <ul className="text-gray-700 space-y-3">{(doc.sample?.highlights || []).map((item, idx) => (<li key={idx}>• {item}</li>))}</ul>
            </div>
          </section>

          <section className="text-center bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 text-white p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Create Your Personal Financial Statement</h2>
            <p className="text-xl mb-6">Complete the statement to generate a printable PDF for lenders or records.</p>
            <Button size="lg" onClick={() => navigate("/documents") } className="bg-white text-bright-orange-600 hover:bg-gray-100 font-semibold px-8 py-3">Open Documents</Button>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalFinancialStatementInfo;
