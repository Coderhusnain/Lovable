import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Fuel, FileText, Shield, DollarSign, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GasLeaseInfo = () => {
  const navigate = useNavigate();

  const whyYouNeed = [
    "Clearly define drilling and development rights",
    "Avoid disputes over royalties and rental payments",
    "Set surface-use, environmental, and access terms",
    "Document obligations for both lessor and lessee",
    "Protect property owners and operators legally",
  ];

  const whenToUse = [
    "Leasing land for oil and gas exploration",
    "Mineral rights development",
    "Hydrocarbon extraction operations",
    "Energy development projects",
    "Natural gas drilling and production",
  ];

  const keyFeatures = [
    { title: "Exclusive Drilling Rights", body: "Complete exploration, drilling, and extraction rights for oil, gas, and hydrocarbons" },
    { title: "Royalty Provisions", body: "Detailed oil, gas, and casinghead gasoline royalty terms" },
    { title: "Development Obligations", body: "Clear drilling and development requirements with offset well provisions" },
    { title: "Payment Terms", body: "Structured rental and royalty payment schedules" },
    { title: "Surface Use Rights", body: "Balanced rights for surface use by both lessor and lessee" },
    { title: "Tax Allocation", body: "Clear division of tax responsibilities between parties" },
  ];

  const faqs = [
    {
      q: "What does a Gas Lease Agreement cover?",
      a: "It covers the leased premises, drilling and production rights, royalty rates, rental payments, development obligations, surface-use rights, assignment rules, and default or termination procedures.",
    },
    {
      q: "Is a Gas Lease Agreement different from an Oil Lease?",
      a: "Yes. A Gas Lease Agreement is tailored to natural gas rights and may address gas-specific production, royalty, and operational terms.",
    },
    {
      q: "Why is a written Gas Lease Agreement important?",
      a: "It prevents disputes by documenting who may develop the property, how compensation is calculated, what obligations the lessee must follow, and how the agreement can end or be transferred.",
    },
    {
      q: "Can I customize a Gas Lease Agreement?",
      a: "Yes. You can customize the agreement to fit the property, royalty structure, drilling rights, environmental obligations, and negotiated special terms.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gas Lease Agreement Information</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gas Lease Agreement • Natural Gas Lease Agreement • Oil and Gas Lease Agreement
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              What is a Gas Lease Agreement?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <p>
              A Gas Lease Agreement is a legally binding contract that grants a lessee the right to explore, drill, produce, and develop natural gas or related hydrocarbon resources on a property owned by the lessor.
            </p>
            <p>
              It defines the scope of the gas rights being leased, royalty and rental terms, operational obligations, and the conditions under which the lease may continue, renew, or terminate.
            </p>
            <p>
              A properly drafted Gas Lease Agreement gives both parties clarity on compensation, land use, and compliance obligations before any development begins.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Why You Need a Gas Lease Agreement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-700">
              Creating a draft Gas Lease Agreement is essential for preventing disputes and documenting the rights and obligations of both parties.
            </p>
            <ul className="space-y-2">
              {whyYouNeed.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
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
                <span className="text-sm text-gray-700">Royalty protection and payment clarity</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Environmental compliance provisions</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Operational standards requirements</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Property restoration obligations</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">Default cure procedures</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              Key Features of the Best Gas Lease Agreement Format
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
              Important Lease Terms Covered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Financial Terms</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Annual rental amounts</li>
                  <li>• Oil and gas royalty percentages</li>
                  <li>• Casinghead gasoline royalties</li>
                  <li>• Payment schedules and methods</li>
                  <li>• Tax allocation between parties</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Operational Rights</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Exclusive drilling and extraction rights</li>
                  <li>• Infrastructure development permissions</li>
                  <li>• Water usage and injection rights</li>
                  <li>• Processing facility construction</li>
                  <li>• Surface access and use</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal Protections</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Development and drilling obligations</li>
                  <li>• Offset well requirements</li>
                  <li>• Assignment and transfer rules</li>
                  <li>• Default and cure procedures</li>
                  <li>• Termination and restoration terms</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mx-auto mb-2">1</div>
                <h4 className="font-semibold mb-1">Enter Location</h4>
                <p className="text-xs text-gray-600">Provide property location and legal description</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mx-auto mb-2">2</div>
                <h4 className="font-semibold mb-1">Define Parties</h4>
                <p className="text-xs text-gray-600">Enter lessor and lessee information</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mx-auto mb-2">3</div>
                <h4 className="font-semibold mb-1">Set Terms</h4>
                <p className="text-xs text-gray-600">Configure lease terms and royalty rates</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mx-auto mb-2">4</div>
                <h4 className="font-semibold mb-1">Generate Agreement</h4>
                <p className="text-xs text-gray-600">Download your completed gas lease</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Gas Lease Agreement FAQs</CardTitle>
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

        <div className="text-center">
          <Button
            onClick={() => navigate('/gas-lease-form')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Create Your Gas Lease Agreement
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            Professional-grade template • Instant PDF generation • Legally compliant
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default GasLeaseInfo;
