import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Shield, DollarSign, Users, CheckCircle, PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InteriorDesignInfo = () => {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Clearly define scope of design services",
    "Avoid disputes over pricing and deliverables",
    "Establish timelines and expectations",
    "Protect both designer and client legally",
    "Ensure smooth execution of the project",
  ];

  const whenToUse = [
    "You are providing interior design services to a client",
    "You are hiring an interior designer for your home or office",
    "You want to define scope, deliverables, and timelines",
    "You need clear payment terms",
    "You want legal protection before starting work",
  ];

  const keyFeatures = [
    { title: "Parties Details", body: "Identifies interior designer and client" },
    { title: "Scope of Work", body: "Defines design services, styling, and deliverables" },
    { title: "Project Timeline", body: "Specifies start date, milestones, and completion" },
    { title: "Fees & Payment Terms", body: "Outlines cost, deposits, and payment schedule" },
    { title: "Confidentiality & Liability", body: "Protects sensitive information and legal interests" },
    { title: "Dispute Resolution", body: "Ensures proper handling of conflicts" },
  ];

  const faqs = [
    {
      q: "Why is an Interior Design Contract important?",
      a: "An Interior Design Contract from Legalgram helps avoid disputes, defines responsibilities, and ensures smooth project execution.",
    },
    {
      q: "What should be included in an Interior Design Contract?",
      a: "A draft Interior Design Contract should include scope, cost, timeline, and legal clauses.",
    },
    {
      q: "Is an Interior Design Contract legally binding?",
      a: "Yes. Once signed, the Interior Design Contract on Legalgram is enforceable.",
    },
    {
      q: "Can I customize the Interior Design Contract?",
      a: "Yes. You can easily download and customize Interior Design Contract from Legalgram.",
    },
  ];

  const checklist = [
    "Make your Interior Design Contract",
    "Customize your draft Interior Design Contract with project details",
    "Review your document to ensure all terms are clear",
    "Sign the agreement by the client and interior designer",
    "Store and share a secure copy of the final contract",
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interior Design Contract Information</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interior Design Contract • Interior Design Agreement • Design Services Agreement
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              What is an Interior Design Contract?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              An Interior Design Contract is a legal agreement that outlines the terms and conditions under which interior design services are provided.
            </p>
            <p>
              This draft Interior Design Contract from Legalgram includes details of the interior designer and client, scope of design services (residential or commercial), project timeline and milestones, fees and payment schedule, and responsibilities, liabilities, and dispute resolution clauses.
            </p>
            <p>
              The best format Interior Design Contract from Legalgram ensures clarity, professionalism, and legal protection for both parties.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Why You Need an Interior Design Contract
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">
              Creating a draft Interior Design Contract is essential for avoiding misunderstandings and ensuring project success. With Legalgram, you can:
            </p>
            <ul className="space-y-2">
              {whyYouNeed.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700">
              Get your free download Interior Design Contract from Legalgram today and secure your design project.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                When to Use This Agreement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {whenToUse.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Legal Protection Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Clear scope of design services</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Defined payment terms and deliverables</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Project timeline and milestone protections</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Liability and dispute resolution terms</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Confidentiality protections for design materials</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              Key Features of the Best Interior Design Contract Format
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {keyFeatures.map((feature) => (
                <div key={feature.title} className="rounded-lg border p-4 bg-white">
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-700">{feature.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              How Does an Interior Design Contract Work?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              A draft Interior Design Contract from Legalgram works by clearly documenting all agreed terms before the project begins.
            </p>
            <p>It ensures:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Clear communication between designer and client</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Proper execution of design services</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Legal protection in case of disputes</span></li>
            </ul>
            <p>
              Download Interior Design Contract from Legalgram to manage your design project professionally and efficiently.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Interior Design Contract FAQs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-lg border p-4 bg-white">
                <h4 className="font-semibold text-gray-900">{faq.q}</h4>
                <p className="text-gray-700 mt-1">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Interior Design Contract Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>Follow these steps to complete your Interior Design Contract on Legalgram:</p>
            <ul className="space-y-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Download Interior Design Contract - Legalgram</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                "Professionally drafted",
                "Easy to customize",
                "Legally reliable format",
                "Instant download",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button onClick={() => navigate("/interior-design-agreement-form")} className="bg-blue-600 hover:bg-blue-700">
            <ArrowRight className="w-4 h-4 mr-2" />
            Start Creating Your Agreement
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default InteriorDesignInfo;
