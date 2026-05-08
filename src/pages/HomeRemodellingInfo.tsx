import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Hammer, FileText, Shield, DollarSign, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeRemodellingInfo = () => {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Clearly define scope of work and expectations",
    "Avoid confusion about pricing and payments",
    "Establish timelines and milestones",
    "Protect both contractor and client legally",
    "Ensure smooth execution of remodelling work",
  ];

  const whenToUse = [
    "You are hiring a contractor for renovation or remodelling",
    "You are providing remodelling services to a client",
    "You want to define project scope and deliverables",
    "You need clear payment terms and deadlines",
    "You want legal protection before starting work",
  ];

  const keyFeatures = [
    { title: "Parties Details", body: "Identifies contractor and property owner" },
    { title: "Scope of Work", body: "Defines remodelling tasks and deliverables" },
    { title: "Project Timeline", body: "Specifies start date, milestones, and completion" },
    { title: "Fees & Payment Terms", body: "Outlines cost, deposit, and payment schedule" },
    { title: "Materials & Specifications", body: "Details materials and quality standards" },
    { title: "Liability & Dispute Resolution", body: "Ensures legal protection and conflict resolution" },
  ];

  const faqs = [
    {
      q: "Why is a Remodelling Contract important?",
      a: "A Remodelling Contract from Legalgram helps avoid disputes, defines responsibilities, and ensures timely completion.",
    },
    {
      q: "What should be included in a Remodelling Contract?",
      a: "A draft Remodelling Contract should include scope, cost, timeline, and legal clauses.",
    },
    {
      q: "Is a Remodelling Contract legally binding?",
      a: "Yes. Once signed, the Remodelling Contract on Legalgram is enforceable.",
    },
    {
      q: "Can I customize the Remodelling Contract?",
      a: "Yes. You can easily download and customize the Remodelling Contract from Legalgram.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Hammer className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Remodeling Contract Information</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Home Remodeling Contract • Remodeling Agreement • Home Renovation Contract
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              What is a Remodelling Contract?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              A Remodeling Contract is a legal agreement that sets out the terms under which remodeling services are provided.
            </p>
            <p>
              This draft Remodeling Contract from Legalgram includes:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Details of contractor and client</li>
              <li>Scope of remodeling work (renovation, upgrades, repairs)</li>
              <li>Project timeline and deadlines</li>
              <li>Cost and payment schedule</li>
              <li>Liability, confidentiality, and dispute resolution clauses</li>
            </ul>
            <p className="mt-3">
              The best format Remodeling Contract from Legalgram ensures clarity, professionalism, and legal protection for both parties.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Why You Need a Remodeling Contract
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">
              Creating a draft Remodeling Contract is essential for avoiding disputes and ensuring project success. With Legalgram, you can:
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
              📥 Get your free download Remodeling Contract from Legalgram today and secure your project.
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
                <span className="text-sm text-gray-700">Clear scope of work and expectations</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Defined payment terms and milestones</span>
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
              Key Features of the Best Remodelling Contract Format
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
              How Does a Remodeling Contract Work?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              A draft Remodeling Contract from Legalgram works by clearly documenting all agreed terms before the project begins.
            </p>
            <p>It ensures:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Clear communication between contractor and client</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Proper execution of renovation work</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" /><span>Legal protection in case of disputes</span></li>
            </ul>
            <p>
              👉 Download Remodeling Contract from Legalgram to manage your remodeling project professionally and efficiently.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Remodelling Contract FAQs</CardTitle>
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
            <CardTitle>Download Remodelling Contract - Legalgram</CardTitle>
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
          <Button onClick={() => navigate("/home-remodelling-agreement-form")} className="bg-blue-600 hover:bg-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Start Creating Your Agreement
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HomeRemodellingInfo;
