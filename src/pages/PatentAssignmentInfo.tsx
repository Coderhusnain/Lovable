import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, CheckCircle, AlertTriangle, ArrowRight, Lock, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatentAssignmentInfo = () => {
  const navigate = useNavigate();

  const documentContent = {
    title: "Patent Assignment",
    otherNames: ["Patent Assignment Form", "Patent Assignment Contract", "Draft Patent Assignment Agreement", "Intellectual Property Assignment"],
    whatIs: "A Patent Assignment is a legally binding agreement that facilitates the transfer of ownership rights in a patent or patent application from one party to another. This agreement serves as a formal 'bill of sale' for intellectual property, ensuring that all rights, title, and interest in the patent are properly assigned and recorded. A Patent Assignment ensures legal clarity, enforceability, and protection of ownership interests when transferring patent rights whether the patent is registered or pending.",
    whenToUse: [
      "You are buying or selling a patent or patent application",
      "You need to add, remove, or update the name of a patent owner",
      "You are transferring rights between individuals, businesses, or partners",
      "You are formalizing ownership structure in a joint invention or business arrangement"
    ],
    faqs: [
      {
        question: "What is a Patent Assignment?",
        answer: "A Patent Assignment is a formal legal document that transfers ownership rights in a patent or patent application from one party to another. It serves as a 'bill of sale' for intellectual property and ensures all rights, title, and interest are properly documented and recorded."
      },
      {
        question: "Why do I need a Patent Assignment?",
        answer: "A Patent Assignment is essential whenever intellectual property rights are transferred, sold, or reassigned. Similar to transferring tangible assets, this document ensures all legal formalities are fulfilled before the transfer becomes effective and protects both parties' interests."
      },
      {
        question: "What rights are transferred in a Patent Assignment?",
        answer: "A Patent Assignment can transfer all rights, title, and interest in the patent, including exclusive rights to use, sell, license, and enforce the patent. The assignment can be complete (full ownership transfer) or partial (retaining some rights)."
      },
      {
        question: "Can I assign partial rights to a patent?",
        answer: "Yes. A Patent Assignment can be structured to transfer complete ownership or partial rights. You can retain certain rights while assigning others, or share ownership with co-inventors or partners as defined in the agreement."
      },
      {
        question: "Is a Patent Assignment recorded with the patent office?",
        answer: "Patent assignments should be recorded with the appropriate patent office (USPTO in the US) to establish a clear chain of title and provide public notice of the ownership transfer. This recording provides legal protection and enforceability."
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
            Legally transfer patent ownership and intellectual property rights between parties
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
            <CardTitle>What Is a Patent Assignment?</CardTitle>
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
                <h3 className="font-bold text-gray-900 mb-2">Legal Ownership Transfer</h3>
                <p className="text-sm text-gray-600">Formally and legally transfer complete patent ownership rights from assignor to assignee</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Clear Ownership Documentation</h3>
                <p className="text-sm text-gray-600">Professional documentation ensuring legal clarity and protection of ownership interests</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Intellectual Property Security</h3>
                <p className="text-sm text-gray-600">Protect rights, title, and interest in patents and patent applications with enforceability</p>
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
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
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
              Patent Assignments involve important intellectual property considerations. Clearly identify all parties, specify the patents or applications being transferred (include patent numbers), describe all rights being transferred, specify any consideration or compensation, and ensure proper execution and notarization. Record the assignment with the appropriate patent office (USPTO in the US) within 3 months for maximum protection. Consider consulting with an intellectual property attorney to ensure proper drafting and recording of your Patent Assignment.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/documents/patent-assignment")}
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-3"
          >
            Start Patent Assignment
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

export default PatentAssignmentInfo;
