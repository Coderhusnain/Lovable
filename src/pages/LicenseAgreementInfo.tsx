import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

const LicenseAgreementInfo = () => {
  const navigate = useNavigate();
  const documentContent = {
    title: "License Agreement",
    otherNames: ["Licensing Agreement", "Software License Agreement", "Trademark License Agreement"],
    whatIs: "A License Agreement is a legally binding contract under which one party (the licensor) grants permission to another party (the licensee) to use specific intellectual property, business concepts, software, trademarks, or products. This agreement defines scope, duration, territorial restrictions, and financial terms while the licensor retains ownership. License Agreements enable businesses to commercialize their intellectual property while maintaining control and receiving compensation.",
    whenToUse: [
      "To grant usage rights to intellectual property or business assets",
      "To create exclusive or non-exclusive licensing arrangements",
      "To define territorial or geographical usage restrictions",
      "To establish royalty or payment terms",
      "To authorize manufacturing or distribution of your product"
    ],
    faqs: [
      { q: "What should be included in a License Agreement?", a: "A comprehensive agreement includes: term and duration, licensing fees and royalties, confidentiality provisions, permitted and prohibited uses, transfer and resale rights, warranties and indemnities, and termination clauses." },
      { q: "What types of property can be licensed?", a: "You can license various types of intellectual property including trademarks, software and digital assets, copyrights, and patents. Each requires careful definition of scope and usage rights." },
      { q: "Should I consult a lawyer?", a: "While you can download and customize a license agreement template, consulting a legal professional is advisable to ensure the agreement fully protects your interests and complies with applicable laws." },
      { q: "What is an Unlimited License Agreement?", a: "An Unlimited License Agreement typically applies to software, allowing unrestricted usage or access. This is common for enterprise software solutions and internal business tool licensing." },
      { q: "Can I grant exclusive or non-exclusive licenses?", a: "Yes. An exclusive license means only the licensee can use the property. A non-exclusive license allows the licensor to grant usage to multiple parties. Specify this clearly in your agreement." }
    ]
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            License Agreement
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Grant or receive rights to use intellectual property, software, trademarks, or business assets with clear terms, royalty structures, and legal protections
          </p>
        </div>

        {/* Other Names Section */}
        {documentContent.otherNames && documentContent.otherNames.length > 0 && (
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Other Names for This Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {documentContent.otherNames.map((name) => (
                  <span key={name} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {name}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* What Is */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What Is a License Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              {documentContent.whatIs}
            </p>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">IP Commercial Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Generate revenue from intellectual property while maintaining ownership and controlling usage rights
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Clear Licensing Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Define scope, exclusivity, territory, royalties, and all terms to prevent misunderstandings and disputes
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Legal Enforcement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Protect against unauthorized use, establish remedies for breach, and ensure compliance with agreed terms
              </p>
            </CardContent>
          </Card>
        </div>

        {/* When to Use */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">When to Use a License Agreement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documentContent.whenToUse && documentContent.whenToUse.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentContent.faqs && documentContent.faqs.map((faq, idx) => {
                const colors = [
                  { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900" },
                  { bg: "bg-green-50", border: "border-green-200", text: "text-green-900" },
                  { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-900" },
                  { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-900" },
                  { bg: "bg-red-50", border: "border-red-200", text: "text-red-900" }
                ];
                const color = colors[idx % colors.length];
                return (
                  <div key={idx} className={`${color.bg} border ${color.border} rounded-lg p-4`}>
                    <p className={`font-semibold ${color.text} mb-2`}>{faq.q}</p>
                    <p className={`${color.text}`}>{faq.a}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <div className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Important Notice</h3>
              <p className="text-amber-800">
                License Agreements must clearly specify the scope of rights granted, territorial limitations, and royalty or payment terms. Ensure the agreement protects your intellectual property interests and defines remedies for breach. Consider consulting a legal professional for complex licensing arrangements involving patents, trademarks, or software.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Create Your License Agreement?</h2>
          <p className="text-orange-100 mb-6">
            Get started in 15–20 minutes with our step-by-step template
          </p>
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-orange-50"
            onClick={() => navigate("/documents/license-agreement")}
          >
            Create Agreement <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LicenseAgreementInfo;
