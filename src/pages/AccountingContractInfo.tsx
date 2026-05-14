import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  Users,
  Shield,
  CheckCircle,
  Download,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InfoBadge = ({ icon: Icon, title, children, className = "" }) => (
  <div className={`bg-white border border-gray-100 rounded-lg p-4 shadow-sm ${className}`}>
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-3 mt-0.5">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <div className="text-gray-700 text-sm mt-1">{children}</div>
      </div>
    </div>
  </div>
);

const AccountingContractInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/documents")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contracts
          </Button>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <FileText className="w-8 h-8 text-indigo-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Accounting Contract Agreement</h1>
            <p className="text-lg text-gray-600">
              An Accounting Contract Agreement helps avoid misunderstandings and creates a legally binding relationship
              between the client and accountant.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-sky-600" />
                What Is an Accounting Contract Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Whether you are a business owner, company, startup, freelancer, or individual, using a written
                Accounting Agreement helps avoid misunderstandings and creates a legally binding relationship between
                the client and accountant.
              </p>
              <p className="text-gray-700">
                An Accounting Contract Agreement is a legal document between a client and an accountant or accounting
                firm. It explains:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Scope of accounting work</li>
                <li>Service duration</li>
                <li>Payment terms and fees</li>
                <li>Confidentiality obligations</li>
                <li>Deadlines and deliverables</li>
                <li>Termination terms</li>
                <li>Responsibilities of both parties</li>
              </ul>
              <p className="text-gray-700">
                Download the best Accounting Contract Agreement format from Legalgram and use it with confidence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Use This Accounting Contract on Legalgram For:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Hiring a chartered accountant</li>
                <li>Bookkeeping services</li>
                <li>Tax filing and tax return preparation</li>
                <li>Payroll management</li>
                <li>Financial statements and reports</li>
                <li>Ongoing accounting consultancy</li>
                <li>Small business accounting services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Why You Need an Accounting Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Prevents payment disputes</li>
                <li>Clearly defines accounting duties</li>
                <li>Protects confidential financial records</li>
                <li>Sets deadlines and expectations</li>
                <li>Creates professional accountability</li>
                <li>Reduces legal risk</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-amber-600" />
                Best Format Accounting Contract Agreement from Legalgram
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Our Accounting Contract Agreement draft is professionally prepared and suitable for businesses, firms,
                startups, and individuals. Simply download, edit names and details, and use immediately.
              </p>
              <div>
                <p className="text-gray-700 mb-2">You can download:</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Accounting Contract Agreement Word format</li>
                  <li>Accounting Agreement PDF format</li>
                  <li>Editable draft Accounting Agreement</li>
                  <li>Professional Accounting Services Contract</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Who Should Use This Agreement?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Accountants</li>
                <li>Bookkeepers</li>
                <li>Tax consultants</li>
                <li>CA firms</li>
                <li>Companies hiring accountants</li>
                <li>Individuals needing accounting help</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Free Download Accounting Contract Agreement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Need a ready legal template? Download Accounting Contract Agreement now from Legalgram and save time
                and legal costs.
              </p>
              <div className="flex items-center gap-3">
                <Button onClick={() => navigate("/documents")}>
                  <FileText className="w-4 h-4 mr-2" />
                  Download Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Choose Legalgram?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Professionally drafted agreements</li>
                <li>Easy editable formats</li>
                <li>Instant downloads</li>
                <li>Affordable legal templates</li>
                <li>Reliable business contracts</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountingContractInfo;
