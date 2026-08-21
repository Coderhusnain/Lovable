import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  FileText,
  Users,
  Shield,
  CheckCircle,
  Download,
  BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArbitrationAgreementInfo = () => {
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
            Back to Documents
          </Button>

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Arbitration Agreement</h1>
            <p className="text-lg text-gray-600">
              Resolve disputes through arbitration instead of court litigation.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Arbitration Agreement Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Use a professionally drafted Arbitration Agreement to legally agree that disputes
                will be resolved through arbitration instead of lengthy court proceedings. Download
                the best format Arbitration Agreement from Legalgram and protect your business or
                personal interests.
              </p>
              <p className="text-gray-700">
                A properly written Arbitration Agreement helps both parties save time, reduce legal
                expenses, and resolve conflicts privately through a neutral arbitrator.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Use This Arbitration Agreement on Legalgram For:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Business partnership disputes</li>
                <li>Commercial contract disputes</li>
                <li>Employment disputes</li>
                <li>Service agreement conflicts</li>
                <li>Vendor and supplier disagreements</li>
                <li>Property and payment disputes</li>
                <li>Future dispute resolution planning</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is an Arbitration Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                An Arbitration Agreement is a legal contract between two or more parties agreeing
                that any disputes between them will be settled through arbitration rather than
                through court litigation.
              </p>
              <p className="text-gray-700">This agreement usually includes:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Names of the parties</li>
                <li>Scope of disputes covered</li>
                <li>Arbitration rules and procedure</li>
                <li>Selection of arbitrator</li>
                <li>Location of arbitration</li>
                <li>Binding decision terms</li>
                <li>Cost-sharing arrangements</li>
              </ul>
              <p className="text-gray-700">
                Download the best Arbitration Agreement format from Legalgram for secure dispute
                resolution.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need an Arbitration Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Avoids expensive court cases</li>
                <li>Saves time and legal costs</li>
                <li>Keeps disputes private and confidential</li>
                <li>Faster resolution process</li>
                <li>Reduces business disruption</li>
                <li>Creates clear legal procedure</li>
                <li>Binding and enforceable outcome</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Best Format Arbitration Agreement from Legalgram
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Our draft Arbitration Agreement is designed for businesses, companies, employers,
                contractors, and individuals. Simply download, customize party details, and use
                immediately.
              </p>
              <div>
                <p className="text-gray-700 mb-2">Available formats:</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Arbitration Agreement Word format</li>
                  <li>Arbitration Agreement PDF download</li>
                  <li>Editable draft Arbitration Agreement</li>
                  <li>Legal dispute resolution contract</li>
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
                <li>Business partners</li>
                <li>Employers and employees</li>
                <li>Companies and clients</li>
                <li>Contractors and service providers</li>
                <li>Suppliers and vendors</li>
                <li>Individuals in legal disputes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Free Download Arbitration Agreement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Need a ready-made legal template? Download Arbitration Agreement now from Legalgram
                and resolve disputes the smart way.
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
                <li>Professionally drafted legal agreements</li>
                <li>Easy editable templates</li>
                <li>Instant downloads</li>
                <li>Affordable legal documents</li>
                <li>Trusted business contracts</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArbitrationAgreementInfo;
