import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, FileText, Shield, Wrench } from "lucide-react";

const DrywallContractInfo = () => {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Clearly define work scope and responsibilities",
    "Avoid confusion about pricing and payments",
    "Set timelines and project expectations",
    "Protect both contractor and client legally",
    "Ensure smooth project execution",
  ];

  const whenToUse = [
    "You are hiring a drywall contractor for a project",
    "You are providing drywall services as a contractor",
    "You want to define work scope and deliverables",
    "You need clear payment terms and deadlines",
    "You want legal protection before starting work",
  ];

  const keyFeatures = [
    {
      title: "1. Parties Details",
      body: "Clearly identifies the contractor and client",
    },
    {
      title: "2. Scope of Work",
      body: "Defines all drywall tasks and deliverables",
    },
    {
      title: "3. Project Timeline",
      body: "Specifies start date, duration, and completion",
    },
    {
      title: "4. Fees & Payment Terms",
      body: "Outlines cost, payment schedule, and method",
    },
    {
      title: "5. Independent Contractor Clause",
      body: "Clarifies non-employment relationship",
    },
    {
      title: "6. Liability & Dispute Resolution",
      body: "Protects both parties legally",
    },
  ];

  const faqs = [
    {
      q: "Should I use a Drywall Contract for small jobs?",
      a: "Yes. Even for small projects, a Drywall Contract from Legalgram helps avoid misunderstandings.",
    },
    {
      q: "What should be included in a Drywall Contract?",
      a: "A draft Drywall Contract should include scope of work, payment terms, and timelines.",
    },
    {
      q: "Is a Drywall Contract legally binding?",
      a: "Yes. Once signed, the Drywall Contract on Legalgram is enforceable.",
    },
    {
      q: "Can I customize the Drywall Contract?",
      a: "Yes. You can easily download and customize Drywall Contract from Legalgram.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button variant="outline" onClick={() => navigate("/documents")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Drywall Contract Information</h1>
          <p className="text-lg text-gray-600">Drywall Services Agreement • Drywall Contract • Drywall Agreement</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Drywall Contract?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                A Drywall Contract is a legal agreement used when drywall installation, repair, or finishing services are provided.
              </p>
              <p>This draft Drywall Contract from Legalgram includes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Details of the contractor and client</li>
                <li>Scope of drywall work</li>
                <li>Project duration and deadlines</li>
                <li>Fees and payment schedule</li>
                <li>Liability and dispute resolution terms</li>
              </ul>
              <p>
                The best format Drywall Contract from Legalgram ensures clarity, professionalism, and legal protection for both parties.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Drywall Contract
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                Creating a draft Drywall Contract is crucial for avoiding misunderstandings and disputes. With Legalgram, you can:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {whyYouNeed.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                Get your free download Drywall Contract from Legalgram today and secure your work.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Drywall Contract
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>You should download and draft a Drywall Contract when:</p>
              <ul className="list-disc list-inside space-y-1">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                The Drywall Contract on Legalgram is ideal for both professionals and clients.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Features of the Best Drywall Contract Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {keyFeatures.map((feature) => (
                  <div key={feature.title} className="rounded-lg border p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-700 text-sm">{feature.body}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                How Does a Drywall Contract Work?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                A draft Drywall Contract from Legalgram works by documenting all agreed terms before the project begins.
              </p>
              <p>It ensures:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Transparency between contractor and client</li>
                <li>Clear expectations and deliverables</li>
                <li>Legal protection in case of disputes</li>
              </ul>
              <p>
                Download Drywall Contract from Legalgram to ensure your drywall project runs smoothly and professionally.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Drywall Contract FAQs</CardTitle>
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
              <CardTitle>Download Drywall Contract - Legalgram</CardTitle>
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

          <Card>
            <CardHeader>
              <CardTitle>Ready to Create Your Drywall Contract?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Start the guided form to build a drywall services agreement tailored to your project scope, duration, and payment terms.
              </p>
              <Button onClick={() => navigate("/documents") }>
                <FileText className="w-4 h-4 mr-2" />
                Start Creating Your Agreement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DrywallContractInfo;
