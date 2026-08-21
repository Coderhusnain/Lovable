import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, AlertTriangle, ArrowRight, Lock, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NonCircumventionInfo = () => {
  const navigate = useNavigate();

  const documentContent = {
    title: "Non-Circumvention Agreement",
    otherNames: ["Non-Circumvent Agreement", "Non-Compete Agreement", "Contact Protection Agreement", "Bypass Prevention Agreement"],
    whatIs: "A Non-Circumvention Agreement is a legally binding contract that prevents one party from bypassing another to directly engage with shared business contacts. This agreement ensures that confidential business relationships remain protected, the receiving party cannot circumvent or bypass the disclosing party, and any unauthorized dealings result in financial penalties or compensation. Once you execute a Non-Circumvention Agreement, you secure your business against unfair competition and unauthorized dealings while protecting valuable client relationships and business contacts.",
    whenToUse: [
      "You are working with another business in the same or similar industry and sharing contacts",
      "Your client list or business contacts are confidential and valuable",
      "You want to prevent third parties from bypassing your business relationships",
      "You are entering into partnerships, vendor agreements, or consulting relationships"
    ],
    faqs: [
      {
        question: "What is a Non-Circumvention, Non-Disclosure Agreement?",
        answer: "It combines confidentiality and non-circumvention protections, ensuring that shared information and contacts are not disclosed or misused. It provides comprehensive protection for both confidential information and valuable business relationships."
      },
      {
        question: "Is a Non-Circumvention Agreement enforceable?",
        answer: "In most jurisdictions, yes. However, enforceability may vary by region (certain restrictions may apply in states like California). Always review local laws before executing your Non-Circumvention Agreement."
      },
      {
        question: "What is a Non-Disclosure Clause?",
        answer: "A non-disclosure clause prevents parties from sharing confidential information. It is often included within a Non-Circumvention Agreement for added protection of business secrets and contact information."
      },
      {
        question: "Do I need a lawyer to draft this agreement?",
        answer: "Our professionally structured templates allow you to create an enforceable Non-Circumvention Agreement without expensive legal fees. However, consult an attorney for complex situations or significant business relationships."
      },
      {
        question: "How long should a Non-Circumvention period last?",
        answer: "Typical periods range from 1-5 years after the business relationship ends, depending on industry standards and the sensitivity of the business contacts involved. Customize the duration based on your specific needs."
      }
    ]
  };



  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{documentContent.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Protect your business contacts and prevent unauthorized dealings with legally binding protection
          </p>
        </div>

        {/* Other Names */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Also Known As</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {documentContent.otherNames.map((name, index) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What Is */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What Is a Non-Circumvention Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{documentContent.whatIs}</p>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Legal Protection</h3>
                <p className="text-sm text-gray-600">Legally binding protection against unauthorized bypass of your business relationships and contacts</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Contact Security</h3>
                <p className="text-sm text-gray-600">Secure your valuable client lists and business relationships from unauthorized access or circumvention</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Business Integrity</h3>
                <p className="text-sm text-gray-600">Maintain fair competition and business ethics by preventing unfair circumvention practices in partnerships</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* When to Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>When to Use This Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documentContent.whenToUse.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentContent.faqs.map((faq, index) => {
                const colors = ["bg-blue-50", "bg-green-50", "bg-purple-50", "bg-yellow-50", "bg-red-50"];
                const borderColors = ["border-l-4 border-blue-500", "border-l-4 border-green-500", "border-l-4 border-purple-500", "border-l-4 border-yellow-500", "border-l-4 border-red-500"];
                return (
                  <div key={index} className={`${colors[index]} ${borderColors[index]} rounded-lg p-4`}>
                    <p className="font-semibold text-gray-900 mb-2">{faq.question}</p>
                    <p className="text-gray-700 text-sm">{faq.answer}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Important Notice</h3>
            <p className="text-amber-800 text-sm">
              Non-Circumvention Agreements involve important business relationship protections. Clearly identify both parties, define protected contacts and relationships, specify what constitutes circumvention, establish penalties for violations, and define the duration of protection. Consider consulting with a legal professional to ensure the agreement properly protects your business interests and complies with applicable state and local laws, particularly regarding non-compete provisions.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/documents/non-circumvention-agreement")}
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3"
          >
            Start Non-Circumvention Agreement
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Estimated time: 15-20 minutes
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NonCircumventionInfo;
