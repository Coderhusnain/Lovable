import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, CheckCircle, AlertTriangle, ArrowRight, Lock, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";


const RoyaltyAgreementInfo = () => {
  const navigate = useNavigate();

  const documentContent = {
    title: "Royalty Agreement",
    otherNames: ["Royalty Contract", "Royalty Agreements"],
    whatIs: "A Royalty Agreement is a formal legal contract that governs the licensed use of intellectual property such as patents, trademarks, copyrights, designs, logos, or proprietary processes. This agreement clearly outlines the terms under which the property may be used and the compensation payable to the owner. It structures financial terms including royalty rates, payment schedules, and duration of use. Whether you are licensing your intellectual property or acquiring rights to use someone else's work, this agreement ensures clarity, protection, and enforceability.",
    whenToUse: [
      "You own intellectual property and want to license it for a fee",
      "You want to grant limited usage rights while retaining ownership",
      "You intend to use intellectual property owned by another individual or company",
      "You need a legally enforceable agreement to define payment and usage terms"
    ],
    faqs: [
      {
        question: "What is a Royalty Agreement?",
        answer: "A Royalty Agreement is a formal legal contract governing the licensed use of intellectual property such as patents, trademarks, copyrights, designs, and proprietary processes. It clearly outlines terms of use and compensation payable to the owner, ensuring clarity and enforceability."
      },
      {
        question: "Why do I need a Royalty Agreement?",
        answer: "If you own intellectual property, a Royalty Agreement ensures fair compensation whenever your work is used commercially. If using others' IP, it demonstrates professionalism and legal compliance, increasing credibility and chances of obtaining permission."
      },
      {
        question: "What types of intellectual property can be licensed?",
        answer: "You can license patents, trademarks, copyrights, designs, logos, proprietary processes, software, artistic works, and other creative or technical intellectual property."
      },
      {
        question: "Can this template work for multiple industries?",
        answer: "Yes. This Royalty Agreement template is suitable and adaptable for multiple industries including technology, entertainment, publishing, design, manufacturing, and creative services."
      },
      {
        question: "Is this agreement legally binding?",
        answer: "Yes. When properly executed by authorized representatives of both parties, a Royalty Agreement is legally binding and enforceable under applicable state and federal law."
      }
    ]
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header with Icon */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{documentContent.title}</h1>
          <p className="text-xl text-gray-600">License your intellectual property and ensure fair compensation</p>
        </div>

        {/* Other Names Card */}
        {documentContent.otherNames && documentContent.otherNames.length > 0 && (
          <Card className="mb-8 border-l-4 border-blue-500">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">Also Known As</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {documentContent.otherNames.map((name, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* What Is Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <BookOpen className="w-5 h-5 mr-3 text-violet-600" />
              What Is a {documentContent.title}?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed">{documentContent.whatIs}</p>
          </CardContent>
        </Card>

        {/* Key Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-t-4 border-violet-500">
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                Fair Compensation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Establishes clear royalty rates and payment schedules ensuring fair compensation whenever your intellectual property is used commercially.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-violet-500">
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                Clear Terms & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Defines ownership, licensed rights, permitted uses, restrictions, and duration of use with legal clarity and enforceability.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-violet-500">
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                Protection for Both Parties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Provides legal protection for both licensor and licensee, demonstrating professionalism and ensuring compliance with applicable laws.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* When to Use Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>When to Use a {documentContent.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documentContent.whenToUse.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-violet-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
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
            <div className="space-y-6">
              {documentContent.faqs.map((faq, idx) => {
                const colors = ["bg-blue-50 border-blue-200", "bg-green-50 border-green-200", "bg-purple-50 border-purple-200", "bg-yellow-50 border-yellow-200", "bg-red-50 border-red-200"];
                const color = colors[idx % colors.length];
                return (
                  <div key={idx} className={`p-4 border rounded-lg ${color}`}>
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-700 text-sm">{faq.answer}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="mb-8 border-l-4 border-amber-500 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-900">
              Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-900 text-sm">
              Royalty Agreements involve intellectual property licensing and financial arrangements. We strongly recommend consulting with an intellectual property attorney to ensure proper structure, fair royalty rates, tax compliance, and legal enforceability under applicable state and federal laws.
            </p>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="text-center mb-8">
          <Button
            className="bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white px-8 py-6 text-lg font-semibold"
            onClick={() => navigate("/documents/royalty-agreement")}
          >
            Start Royalty Agreement
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default RoyaltyAgreementInfo;
