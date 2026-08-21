import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Hammer, FileText, Shield, DollarSign, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeImprovementInfo = () => {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Clearly define scope of work and responsibilities",
    "Avoid confusion about costs and payments",
    "Establish timelines and expectations",
    "Protect both contractor and client legally",
    "Ensure smooth execution of the project",
  ];

  const whenToUse = [
    "You are hiring a contractor for renovation or remodeling",
    "You are providing home improvement services",
    "You want to define tasks, materials, and deadlines",
    "You need clear payment terms",
    "You want legal protection before starting work",
  ];

  const keyFeatures = [
    { title: "Parties Details", body: "Identifies contractor and property owner" },
    { title: "Scope of Work", body: "Defines all renovation and improvement tasks" },
    { title: "Project Timeline", body: "Specifies start and completion dates" },
    { title: "Fees & Payment Terms", body: "Outlines cost, deposits, and payment schedule" },
    { title: "Materials & Specifications", body: "Details materials to be used in the project" },
    { title: "Liability & Dispute Resolution", body: "Ensures legal protection and conflict resolution" },
  ];

  const faqs = [
    {
      q: "Do I need a Home Improvement Contract for small projects?",
      a: "Yes. A Home Improvement Contract from Legalgram helps avoid misunderstandings even for small jobs.",
    },
    {
      q: "What should be included in a Home Improvement Contract?",
      a: "A draft Home Improvement Contract should include scope, cost, timeline, and legal clauses.",
    },
    {
      q: "Is a Home Improvement Contract legally binding?",
      a: "Yes. Once signed, the Home Improvement Contract on Legalgram is enforceable.",
    },
    {
      q: "Can I customize the Home Improvement Contract?",
      a: "Yes. You can easily download and customize the Home Improvement Contract from Legalgram.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Improvement Contract Information</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Home Improvement Contract • Renovation Agreement • Remodeling Contract
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              What is a Home Improvement Contract?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              A Home Improvement Contract is a legal agreement that outlines the terms under which home improvement services are provided.
            </p>
            <p>
              This draft Home Improvement Contract from Legalgram includes details of contractor and property owner, scope of work (renovation, repair, remodeling), project timeline and deadlines, cost and payment schedule, and liability, confidentiality, and dispute resolution clauses.
            </p>
            <p>
              The best format Home Improvement Contract from Legalgram ensures clarity, professionalism, and legal protection for both parties.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Why You Need a Home Improvement Contract
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">
              Creating a draft Home Improvement Contract is essential for avoiding disputes and ensuring project success. With Legalgram, you can:
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
              Get your free download Home Improvement Contract from Legalgram today and secure your project.
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
                <span className="text-sm text-gray-700">Clear scope of work and responsibilities</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Defined payment terms and timelines</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Project deadline and delivery protections</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Liability and dispute resolution terms</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Professional workmanship expectations</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              Key Features of the Best Home Improvement Contract Format
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
              How Does a Home Improvement Contract Work?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              A draft Home Improvement Contract from Legalgram works by clearly documenting all agreed terms before the project begins.
            </p>
            <p>It ensures:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Clear communication between contractor and homeowner</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Proper execution of renovation work</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Legal protection in case of disputes</span></li>
            </ul>
            <p>
              Download Home Improvement Contract from Legalgram to manage your project professionally and efficiently.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Home Improvement Contract FAQs</CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>Download Home Improvement Contract - Legalgram</CardTitle>
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
          <Button onClick={() => navigate("/home-improvement-contract-form")} className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Start Creating Your Agreement
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HomeImprovementInfo;
