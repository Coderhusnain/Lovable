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

const BidProposalInfo = () => {
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

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bid Proposal</h1>
            <p className="text-lg text-gray-600">
              Submit professional bids with clear scope, pricing, and timelines.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Bid Proposal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A strong Bid Proposal helps contractors, freelancers, suppliers, and businesses
                compete for projects with confidence while giving project owners a clear comparison
                of offers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Use This Bid Proposal on Legalgram For:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Construction project bids</li>
                <li>Freelance service proposals</li>
                <li>Website design quotations</li>
                <li>Interior design project bids</li>
                <li>Supplier quotations</li>
                <li>Repair and maintenance bids</li>
                <li>Commercial service contracts</li>
                <li>Tender submissions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Bid Proposal?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A Bid Proposal is a business document used by contractors, freelancers, vendors,
                or companies to offer services for a project. It includes project details, cost
                estimates, labor charges, material pricing, schedules, and terms for completing the
                work.
              </p>
              <p className="text-gray-700">It may include:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Project name and description</li>
                <li>Scope of work</li>
                <li>Cost estimate</li>
                <li>Labor and material charges</li>
                <li>Completion timeline</li>
                <li>Terms and conditions</li>
                <li>Payment schedule</li>
                <li>Contractor contact details</li>
              </ul>
              <p className="text-gray-700">
                Download the best Bid Proposal format from Legalgram and submit professional bids.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Bid Proposal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Creates a professional image</li>
                <li>Helps win projects and contracts</li>
                <li>Clearly states pricing and scope</li>
                <li>Reduces misunderstandings</li>
                <li>Helps compare competing bids</li>
                <li>Builds client trust</li>
                <li>Speeds up project approval</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Best Format Bid Proposal from Legalgram
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Our draft Bid Proposal is designed for contractors, consultants, freelancers, and
                businesses. Simply download, edit your project details, and send to clients.
              </p>
              <div>
                <p className="text-gray-700 mb-2">Available formats:</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Bid Proposal Word format</li>
                  <li>Bid Proposal PDF download</li>
                  <li>Editable draft Bid Proposal</li>
                  <li>Contractor quote template</li>
                  <li>Project proposal template</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Who Should Use This Proposal?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Contractors</li>
                <li>Construction companies</li>
                <li>Freelancers</li>
                <li>Web designers</li>
                <li>Consultants</li>
                <li>Suppliers</li>
                <li>Service providers</li>
                <li>Small businesses</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Free Download Bid Proposal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Need a ready-made template? Download Bid Proposal now from Legalgram and submit
                winning offers professionally.
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
                <li>Professionally drafted business templates</li>
                <li>Easy editable documents</li>
                <li>Instant downloads</li>
                <li>Affordable legal forms</li>
                <li>Trusted contract formats</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Download Now</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Get your Bid Proposal on Legalgram today and submit accurate, professional, and
                competitive project bids.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BidProposalInfo;
