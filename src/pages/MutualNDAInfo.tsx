import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, CheckCircle, AlertTriangle, ArrowRight, Shield, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MutualNDAInfo = () => {
  const navigate = useNavigate();

  const documentContent = {
    title: "Mutual Non-Disclosure Agreement",
    otherNames: ["Mutual Confidentiality Agreement", "Mutual NDA", "MNDA", "Bilateral NDA"],
    whatIs: "A Mutual Non-Disclosure Agreement (Mutual NDA) is a legally binding confidentiality agreement that enables two parties to share and receive sensitive or proprietary information securely. This agreement is ideal when both parties expect to exchange confidential data, such as trade secrets, business plans, financial details, or intellectual property. It clearly defines confidentiality obligations and protects information from unauthorized disclosure, giving both parties legal rights to take action in case of breach.",
    whenToUse: [
      "You are sharing confidential or proprietary information with another party",
      "You will receive sensitive information from another individual or organization",
      "You are entering into partnerships, vendor agreements, or consulting arrangements",
      "Both parties need mutual confidentiality protection during negotiations or collaborations"
    ],
    faqs: [
      {
        question: "Where can I get a free Mutual NDA?",
        answer: "You can download a Mutual Non-Disclosure Agreement template from legal document providers instantly. Simply customize your draft agreement with party information and protected details, and your document will be ready in minutes without expensive attorney fees."
      },
      {
        question: "Do I need a lawyer to draft a Mutual NDA?",
        answer: "Not necessarily. With professionally structured templates, you can create an enforceable Mutual NDA without high legal fees. However, consult a legal expert for particularly complex cases involving significant intellectual property or unique business situations."
      },
      {
        question: "What is the cost of a Mutual NDA?",
        answer: "Hiring a lawyer may cost between $200-$1,000. Using professionally drafted templates, you can enjoy a free or low-cost download and save significantly while still maintaining legal enforceability and comprehensive protection."
      },
      {
        question: "What should I do after creating a Mutual NDA?",
        answer: "After downloading your Mutual NDA, edit and review it for accuracy, then print or share it digitally with the other party. Both parties must sign the document electronically or physically, then each party should receive and securely store a signed copy for their records."
      },
      {
        question: "Does a Mutual NDA require notarization?",
        answer: "No, notarization is generally not required for a Mutual NDA to be legally enforceable. A properly signed agreement between parties is sufficient. However, notarization can add an extra layer of authenticity and may be helpful in certain circumstances or jurisdictions."
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
            Bilateral confidentiality protection enabling secure information sharing between two parties
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
            <CardTitle>What Is a Mutual Non-Disclosure Agreement?</CardTitle>
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
                <h3 className="font-bold text-gray-900 mb-2">Bilateral Protection</h3>
                <p className="text-sm text-gray-600">Both parties protect shared information with equal confidentiality obligations and reciprocal enforcement rights</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Information Security</h3>
                <p className="text-sm text-gray-600">Comprehensive protection for all shared confidential information including trade secrets and business plans</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Legal Enforcement</h3>
                <p className="text-sm text-gray-600">Clear remedies for breach including injunctive relief and damages recovery for both parties</p>
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
                  <CheckCircle className="w-5 h-5 text-rose-600 mt-1 flex-shrink-0" />
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
              Mutual NDAs involve important confidentiality and business considerations. Clearly identify both parties, describe all confidential information to be protected, specify permitted uses, define duration, and establish dispute resolution procedures. Consider consulting with a legal professional to ensure the agreement properly protects both parties' interests and complies with applicable state and local laws.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/documents/mutual-non-disclosure-agreement")}
            size="lg"
            className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white px-8 py-3"
          >
            Start Mutual Non-Disclosure Agreement
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

export default MutualNDAInfo;
