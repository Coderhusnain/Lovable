import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Shield, DollarSign, Users, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JanitorialInfo = () => {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Clearly define cleaning tasks and responsibilities",
    "Avoid disputes over payment and scheduling",
    "Establish service timelines and expectations",
    "Protect both service provider and client legally",
    "Ensure consistent and professional cleaning services",
  ];

  const whenToUse = [
    "You are providing janitorial or cleaning services",
    "You are hiring a cleaning company for your property",
    "You need recurring or one-time cleaning services",
    "You want to define scope, schedule, and payment terms",
    "You want legal protection before starting services",
  ];

  const keyFeatures = [
    { title: "Parties Details", body: "Identifies cleaning service provider and client" },
    { title: "Scope of Services", body: "Defines cleaning tasks and responsibilities" },
    { title: "Service Schedule", body: "Specifies frequency of service and timing" },
    { title: "Fees & Payment Terms", body: "Outlines charges, invoicing, and payment schedule" },
    { title: "Confidentiality & Liability", body: "Protects sensitive information and legal interests" },
    { title: "Dispute Resolution", body: "Ensures proper handling of conflicts" },
  ];

  const faqs = [
    {
      q: "Do I need a Janitorial Contract for small cleaning jobs?",
      a: "Yes. A Janitorial Contract from Legalgram helps avoid misunderstandings even for one-time services.",
    },
    {
      q: "What should be included in a Janitorial Contract?",
      a: "A draft Janitorial Contract should include scope, schedule, cost, and legal clauses.",
    },
    {
      q: "Is a Janitorial Contract legally binding?",
      a: "Yes. Once signed, the Janitorial Contract on Legalgram is enforceable.",
    },
    {
      q: "Can I customize the Janitorial Contract?",
      a: "Yes. You can easily download and customize Janitorial Contract from Legalgram.",
    },
  ];

  const checklist = [
    "Draft your Janitorial Contract",
    "Review your agreement and confirm the service scope",
    "Set the cleaning schedule, fees, and payment terms",
    "Sign the contract with the client and service provider",
    "Store and share a secure copy for future reference",
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Janitorial Contract Information</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Janitorial Contract • Janitorial Services Agreement • Cleaning Services Agreement
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              What is a Janitorial Contract?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              A Janitorial Contract is a comprehensive agreement that defines the scope and terms of cleaning services between a service provider and a client.
            </p>
            <p>
              This draft Janitorial Contract from Legalgram includes details of the service provider and client, scope of cleaning services (floors, windows, bathrooms, etc.), frequency of services (one-time or recurring), payment terms and schedule, and liability, confidentiality, and dispute resolution clauses.
            </p>
            <p>
              The best format Janitorial Contract from Legalgram ensures clarity, professionalism, and legal protection for both parties.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Why You Need a Janitorial Contract
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">
              Creating a draft Janitorial Contract is essential for avoiding misunderstandings and ensuring reliable service. With Legalgram, you can:
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
              Get your free download Janitorial Contract from Legalgram today and secure your service agreement.
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
                <span className="text-sm text-gray-700">Clear scope of cleaning tasks</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Defined payment terms and scheduling</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Service timeline and frequency protections</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Liability and dispute resolution terms</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Confidentiality protections for sensitive spaces</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              Key Features of the Best Janitorial Contract Format
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
              How Does a Janitorial Contract Work?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              A draft Janitorial Contract from Legalgram works by clearly documenting all agreed terms before services begin.
            </p>
            <p>It ensures:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Clear communication between service provider and client</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Proper execution of cleaning services</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Legal protection in case of disputes</span></li>
            </ul>
            <p>
              Download Janitorial Contract from Legalgram to manage your cleaning services professionally and efficiently.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Janitorial Contract FAQs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-lg border p-4 bg-white">
                <h4 className="font-semibold text-gray-900 mb-1">{faq.q}</h4>
                <p className="text-sm text-gray-700">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Steps After Creating Your Janitorial Contract
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklist.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Download Janitorial Contract - Legalgram</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-sm">
              <div className="flex items-center justify-center gap-2"><CheckCircle className="h-4 w-4" /> Professionally drafted</div>
              <div className="flex items-center justify-center gap-2"><CheckCircle className="h-4 w-4" /> Easy to customize</div>
              <div className="flex items-center justify-center gap-2"><CheckCircle className="h-4 w-4" /> Legally reliable format</div>
              <div className="flex items-center justify-center gap-2"><CheckCircle className="h-4 w-4" /> Instant download</div>
            </div>
            <Button
              size="lg"
              onClick={() => navigate("/janitorial-services-agreement-form")}
              className="bg-white text-blue-700 hover:bg-gray-100"
            >
              Create Your Janitorial Contract <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default JanitorialInfo;
