import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MasterUseLicenseInfo = () => {
  const navigate = useNavigate();

  const documentContent = {
    title: "Master Use License Agreement",
    otherNames: ["Music Use Licensing Agreement", "Master Use Licensing Contract", "Music License Agreement", "Sound Recording License", "Music Licensing Agreement"],
    whatIs: "A Master Use License Agreement is a legally binding contract that allows one party to use a sound recording owned by another party. This draft agreement is commonly used when music is incorporated into films, TV shows, advertisements, online content, or other creative productions. It clearly defines usage rights, ownership permissions, compensation terms, and restrictions to protect both the rights holder and the licensee while enabling legitimate use of the music.",
    whenToUse: [
      "You own a sound recording or music and want to license it for films, TV shows, or digital content",
      "You need a clear, written music licensing agreement draft that is legally binding and enforceable",
      "Multiple parties share ownership of the music and must approve usage",
      "You want to establish fair compensation and royalty terms for music usage"
    ],
    faqs: [
      {
        question: "What is a Master Use License Agreement?",
        answer: "A Master Use License Agreement is a contract granting permission to use a specific sound recording in a project. It covers the right to use the actual recorded version of the music, distinct from the composition itself. It defines scope, territory, duration, and compensation for music usage."
      },
      {
        question: "Who needs a Master Use License Agreement?",
        answer: "Record labels, music producers, independent artists, and sound recording owners use this agreement when licensing music. Filmmakers, producers, advertisers, and content creators use it when licensing music for their projects. Any legitimate music use typically requires this agreement."
      },
      {
        question: "What formats can be licensed under this agreement?",
        answer: "Master Use License Agreements can cover films, television shows, commercials, online videos, podcasts, streaming content, video games, YouTube videos, social media content, and other digital or traditional media formats."
      },
      {
        question: "What rights does the licensee receive?",
        answer: "The licensee receives the right to use the specific sound recording in the agreed-upon format and territory for a defined term. Rights typically include public performance, distribution, and synchronization for the specified purpose, but not ownership of the recording."
      },
      {
        question: "Can multiple parties own the master recording?",
        answer: "Yes. When multiple parties own the recording, all owners must typically approve usage and licensing. The agreement should clearly identify all owners, their ownership percentages, and approval requirements. This prevents disputes and ensures proper compensation distribution."
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
            Establish clear music licensing rights with legally binding terms and fair compensation
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
            <CardTitle>What Is a Master Use License Agreement?</CardTitle>
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
                <h3 className="font-bold text-gray-900 mb-2">Usage Rights Control</h3>
                <p className="text-sm text-gray-600">Clearly define exactly how your music can be used, in which formats, and for what duration</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Fair Compensation</h3>
                <p className="text-sm text-gray-600">Establish clear payment terms and royalty structures for music licensing and use</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-bold text-gray-900 mb-2">Legal Protection</h3>
                <p className="text-sm text-gray-600">Protect ownership rights, prevent unauthorized usage, and resolve disputes professionally</p>
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
              Master Use License Agreements involve important music rights and payment considerations. Clearly identify all parties, owners, usage scope, compensation terms, and approval requirements. Consider consulting with a music licensing attorney to ensure the agreement properly protects all parties' rights and complies with industry standards and local laws.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/documents/master-use-license-agreement")}
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-3"
          >
            Start Master Use License Agreement
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

export default MasterUseLicenseInfo;