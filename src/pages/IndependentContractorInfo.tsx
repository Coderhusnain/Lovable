import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

const IndependentContractorInfo = () => {
  const navigate = useNavigate();
  const documentContent = {
    title: "Independent Contractor Agreement",
    otherNames: ["Freelance Contract", "Consulting Agreement", "Contract Labor Form", "Independent Contractor Contract", "Freelancer Contractor Agreement", "Consulting Contract", "Consulting Services Agreement"],
    whatIs: "A legal contract establishing a business relationship between a company and an independent contractor. It defines the scope of work, payment terms, and clarifies that the contractor is not an employee. This distinction is crucial for tax purposes, liability protection, and compliance. The contractor controls how they perform the work, uses their own equipment, can work for others, and handles their own taxes and business expenses.",
    whenToUse: [
      "Hiring freelancers or consultants for specific projects",
      "Engaging specialists for temporary or ongoing work",
      "Outsourcing specific business functions or services",
      "Working with vendors or service providers",
      "When the worker operates their own business"
    ],
    faqs: [
      { q: "Why do I need an Independent Contractor Agreement?", a: "It sets clear expectations, protects intellectual property ownership, maintains confidentiality, defines the scope of work, and most importantly documents that the relationship is independent—not employment. This protects both parties from IRS misclassification penalties." },
      { q: "What's the difference between a contractor and an employee?", a: "Contractors work independently, control how they perform work, use their own equipment, can work for multiple clients, set their own hours, and pay their own taxes and business expenses. Employees work under the hiring party's direction, receive company equipment, work set hours, and have taxes deducted by the employer." },
      { q: "Can I sign an Independent Contractor Agreement online?", a: "Yes, with proper e-signature tools like DocuSign or Hellosign that are legally binding in most jurisdictions. Both parties can sign securely and electronically, making the process faster and more convenient." },
      { q: "Who owns the work created by the contractor?", a: "This should be clearly specified in the contract. Without an explicit clause, the contractor typically retains ownership of work they create. You can assign ownership to yourself through a Work-Made-For-Hire clause if needed." },
      { q: "What happens if a contractor is misclassified?", a: "Misclassification can result in significant IRS penalties, back taxes, unpaid payroll taxes, unemployment insurance liability, and workers' compensation violations. A properly drafted agreement demonstrating true contractor status can provide protection." }
    ]
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Independent Contractor Agreement
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Establish clear contractor relationships with a legally binding agreement that protects your business and defines roles
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
            <CardTitle className="text-2xl text-gray-900">What Is an Independent Contractor Agreement?</CardTitle>
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
              <CardTitle className="text-lg">Clear Scope Definition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Defines exactly what work the contractor will perform, deliverables, timelines, and payment terms to prevent misunderstandings
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Legal Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Protects intellectual property rights, ensures contractor independence status for tax compliance, and limits liability exposure
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Regulatory Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Demonstrates independent contractor status to IRS and labor agencies, reducing misclassification risks and penalties
              </p>
            </CardContent>
          </Card>
        </div>

        {/* When to Use */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">When to Use an Independent Contractor Agreement</CardTitle>
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
                  Contractor misclassification can result in significant IRS penalties, back taxes, payroll tax liability, and workers' compensation exposure. Ensure your agreement clearly documents the independent nature of the relationship and that the contractor controls how work is performed, uses their own equipment, and handles their own taxes.
                </p>
              </div>
            </div>
          </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to Create Your Independent Contractor Agreement?</h2>
            <p className="text-blue-100 mb-6">
              Get started in 15–20 minutes with our step-by-step template
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => navigate("/documents/independent-contractor-agreement")}
            >
              Create Agreement <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Layout>
    );
};

export default IndependentContractorInfo;
