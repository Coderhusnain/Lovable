import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Home, AlertTriangle, Clock, Scale, CheckCircle, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";

const EvictionNoticeInfo = () => {
  const noticeTypes = [
    "Notice to Pay Rent or Quit",
    "Notice to Cure or Quit",
    "Unconditional Quit Notice",
    "Notice to Vacate",
    "Periodic Tenancy Termination Notice",
  ];

  const keyFeatures = [
    { title: "1. Parties Details", body: "Identifies landlord and tenant" },
    { title: "2. Property Information", body: "Full address and rental details" },
    { title: "3. Reason for Notice", body: "Clearly states violation or termination reason" },
    { title: "4. Notice Period", body: "Specifies legal time given to tenant" },
    { title: "5. Compliance Instructions", body: "Explains whether tenant can fix issue or must vacate" },
    { title: "6. Proof of Service", body: "Records how and when notice is delivered" },
  ];

  const faqs = [
    { q: "Is an Eviction Notice legally binding?", a: "Yes. A properly issued Eviction Notice from Legalgram is legally valid." },
    { q: "Can an Eviction Notice force a tenant to leave immediately?", a: "No. It is the first step; a court order is required for final eviction." },
    { q: "How many days notice is required?", a: "It depends on local laws, typically ranging from 3 to 30 days." },
    { q: "Can I customize the Eviction Notice?", a: "Yes. You can easily download and customize Eviction Notice from Legalgram." },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link to="/documents">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documents
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-3xl font-bold">Eviction Notice Information</h1>
              <p className="text-muted-foreground">Formal notice for lease violations and tenant compliance</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                What is an Eviction Notice?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                An Eviction Notice is a formal legal notice given by a landlord to a tenant, requiring them to either fix a lease violation or vacate the property.
              </p>
              <p>This draft Eviction Notice from Legalgram includes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Tenant and landlord details</li>
                <li>Property address and tenancy details</li>
                <li>Reason for eviction (non-payment, violation, etc.)</li>
                <li>Notice period and compliance deadline</li>
              </ul>
              <p>
                The best format Eviction Notice from Legalgram ensures legal compliance and proper documentation before court action.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Why You Need an Eviction Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                Creating a draft Eviction Notice is the first legal step in removing a tenant. With Legalgram, you can:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Document tenant violations formally</li>
                <li>Provide legal notice before eviction proceedings</li>
                <li>Avoid unlawful eviction actions</li>
                <li>Protect landlord rights under tenancy laws</li>
                <li>Ensure proper legal process is followed</li>
              </ul>
              <p>
                Get your free download tenancy agreement and Eviction Notice from Legalgram today.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                When to Use an Eviction Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>You should download and draft an Eviction Notice when:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>A tenant fails to pay rent</li>
                <li>A tenant violates lease or tenancy agreement terms</li>
                <li>You want to terminate a rental agreement</li>
                <li>A tenant refuses to vacate after lease expiry</li>
                <li>You need to initiate legal eviction proceedings</li>
              </ul>
              <p>The Eviction Notice on Legalgram is essential for landlords and property managers.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Types of Eviction Notices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {noticeTypes.map((item) => (
                  <div key={item} className="rounded-lg border p-4 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-1">{item}</h4>
                    <p className="text-gray-700 text-sm">
                      {item === "Notice to Pay Rent or Quit" && "Used when rent is overdue"}
                      {item === "Notice to Cure or Quit" && "Used for lease violations"}
                      {item === "Unconditional Quit Notice" && "Requires tenant to vacate without remedy"}
                      {item === "Notice to Vacate" && "Used for ending tenancy"}
                      {item === "Periodic Tenancy Termination Notice" && "For month-to-month or periodic leases"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Key Features of the Best Eviction Notice Format
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
              <CardTitle className="flex items-center gap-2">
                How Does an Eviction Notice Work?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>
                A draft Eviction Notice from Legalgram works as the first legal step in the eviction process.
              </p>
              <p>It ensures:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Tenants are formally notified</li>
                <li>Legal procedures are followed</li>
                <li>Landlords have documented evidence for court</li>
              </ul>
              <p>
                Download Eviction Notice from Legalgram to handle tenancy issues legally and effectively.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eviction Notice FAQs</CardTitle>
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
              <CardTitle>Eviction Notice Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>Follow these steps to complete your Eviction Notice on Legalgram:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Make your Eviction Notice</p>
                    <p>Customize your draft Eviction Notice with tenant and property details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Review your document</p>
                    <p>Ensure compliance with tenancy laws and accuracy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Serve the Notice</p>
                    <p>Deliver the Eviction Notice from Legalgram properly to the tenant.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Keep Records</p>
                    <p>Store a copy of your Eviction Notice on Legalgram for legal use.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Download Eviction Notice - Legalgram</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Professionally drafted",
                  "Easy to customize",
                  "Legally compliant format",
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

          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Create Your Eviction Notice Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Use our guided form to create a comprehensive eviction notice that meets legal requirements and protects your rights as a landlord.
              </p>
              <div className="flex gap-3">
                <Link to="/documents/eviction-notice">
                  <Button>Create Eviction Notice Now</Button>
                </Link>
                <Link to="/contact-lawyer">
                  <Button variant="outline">Consult a Lawyer</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default EvictionNoticeInfo;
