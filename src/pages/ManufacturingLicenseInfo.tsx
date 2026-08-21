import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManufacturingLicenseInfo = () => {
  const navigate = useNavigate();

  const documentContent = {
    title: "Manufacturing Contract",
    otherNames: ["Private Label Manufacturing", "Contract Manufacturing", "Production Agreement", "Manufacturing Agreement", "Production Contract"],
    whatIs: "A Manufacturing Contract is a legally binding agreement between a product developer and a manufacturer that sets out the terms under which goods are produced. This contract defines essential elements such as product specifications, production standards, order quantities, delivery timelines, pricing, and payment terms. It protects both parties by clearly establishing responsibilities, quality standards, intellectual property rights, and dispute resolution procedures to ensure smooth production operations.",
    whenToUse: [
      "When your business is ready to launch a product and you need a manufacturer to produce it",
      "When you are a manufacturer entering into a production arrangement with a client",
      "When you want to clearly define responsibilities, quality standards, timelines, and payment terms",
      "When you want to avoid disputes by establishing a comprehensive and legally binding manufacturing agreement"
    ],
    faqs: [
      {
        question: "What is a contract manufacturer and how does it work?",
        answer: "A contract manufacturer is a company that produces goods on behalf of another business. Under a Manufacturing Contract, the manufacturer is responsible for sourcing raw materials, managing production processes, and meeting agreed standards for quality, quantity, and delivery timelines."
      },
      {
        question: "What is contract manufacturing known as?",
        answer: "Contract manufacturing is also commonly referred to as private label manufacturing, where products are produced by one company and branded by another. This arrangement allows businesses to focus on marketing and sales while outsourcing production."
      },
      {
        question: "What is an example of contract manufacturing?",
        answer: "Common examples include mobile phones, electronics, gaming consoles, and consumer goods produced under Manufacturing Contracts for global brands. Contract manufacturing is prevalent in technology, apparel, and consumer product industries."
      },
      {
        question: "What is the difference between toll manufacturing and contract manufacturing?",
        answer: "Toll Manufacturing: The hiring company supplies raw materials, and the manufacturer provides only production services. Contract Manufacturing: The manufacturer handles both sourcing raw materials and producing the finished goods. Contract manufacturing typically involves higher responsibility for the manufacturer."
      },
      {
        question: "Why is a written Manufacturing Contract essential?",
        answer: "A written Manufacturing Contract protects both parties by clearly defining specifications, timelines, quality standards, payment terms, and intellectual property rights. It prevents disputes, reduces misunderstandings, and provides legal recourse if either party fails to perform."
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
            Establish clear production terms and protect both parties with a comprehensive manufacturing agreement
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
            <CardTitle>What Is a Manufacturing Contract?</CardTitle>
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
                <h3 className="font-bold text-gray-900 mb-2">Clear Specifications</h3>
                <p className="text-sm text-gray-600">Define detailed product specifications, production standards, and quality control requirements upfront</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Timeline Certainty</h3>
                <p className="text-sm text-gray-600">Establish binding delivery schedules and production timelines with accountability measures</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Legal Protection</h3>
                <p className="text-sm text-gray-600">Protect intellectual property, define liability, and establish dispute resolution procedures</p>
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
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
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
              Manufacturing Contracts involve significant operational and legal considerations. Clearly define all product specifications, production timelines, quality standards, and payment terms. Consider consulting with a qualified attorney to ensure the agreement adequately protects intellectual property rights, compliance requirements, dispute resolution procedures, and operational expectations.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/documents/manufacturing-contract")}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3"
          >
            Start Manufacturing Contract
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

export default ManufacturingLicenseInfo;
