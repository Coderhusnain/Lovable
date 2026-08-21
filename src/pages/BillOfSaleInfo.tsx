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

const BillOfSaleInfo = () => {
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

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bill of Sale</h1>
            <p className="text-lg text-gray-600">
              Proof of purchase, payment, and ownership transfer for personal property.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Bill of Sale Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A proper Bill of Sale acts as proof of purchase, proof of payment, and evidence of
                ownership transfer for valuable personal property.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Use This Bill of Sale on Legalgram For:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Furniture sale</li>
                <li>Equipment transfer</li>
                <li>Electronics sale</li>
                <li>Business assets sale</li>
                <li>Household goods sale</li>
                <li>Machinery sale</li>
                <li>Animal or livestock sale</li>
                <li>General personal property transfer</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Bill of Sale?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                A Bill of Sale is a legal document used to transfer ownership of personal property
                from a seller to a buyer. It confirms that payment has been made and ownership has
                passed to the purchaser.
              </p>
              <p className="text-gray-700">This document usually includes:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Buyer and seller details</li>
                <li>Description of item sold</li>
                <li>Purchase price</li>
                <li>Date of sale</li>
                <li>Condition of item</li>
                <li>As-is sale terms</li>
                <li>Warranty terms (if any)</li>
                <li>Signatures of both parties</li>
              </ul>
              <p className="text-gray-700">
                Download the best Bill of Sale format from Legalgram for secure transactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Bill of Sale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Proof of ownership transfer</li>
                <li>Proof of payment received</li>
                <li>Protects buyer and seller</li>
                <li>Reduces future disputes</li>
                <li>Records item condition at sale time</li>
                <li>Useful for tax and accounting records</li>
                <li>Legally valuable transaction evidence</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Best Format Bill of Sale from Legalgram
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Our draft Bill of Sale is designed for individuals, businesses, traders, and private
                sellers. Simply download, enter transaction details, and sign.
              </p>
              <div>
                <p className="text-gray-700 mb-2">Available formats:</p>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Bill of Sale Word format</li>
                  <li>Bill of Sale PDF download</li>
                  <li>Editable draft Bill of Sale</li>
                  <li>General Bill of Sale template</li>
                  <li>Proof of sale document</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types of Bill of Sale Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">You may use a Bill of Sale for:</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>General personal property</li>
                <li>Car Bill of Sale</li>
                <li>Motorcycle Bill of Sale</li>
                <li>Boat Bill of Sale</li>
                <li>Trailer Bill of Sale</li>
                <li>Horse Bill of Sale</li>
                <li>Livestock Bill of Sale</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Who Should Use This Document?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Buyers and sellers</li>
                <li>Businesses selling equipment</li>
                <li>Individuals selling personal property</li>
                <li>Dealers and traders</li>
                <li>Farmers and livestock sellers</li>
                <li>Small business owners</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Free Download Bill of Sale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Need a ready-made ownership transfer template? Download Bill of Sale now from
                Legalgram and complete your sale professionally.
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
                <li>Professionally drafted legal templates</li>
                <li>Easy editable formats</li>
                <li>Instant downloads</li>
                <li>Affordable legal documents</li>
                <li>Trusted transaction forms</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Download Now</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Get your Bill of Sale on Legalgram today and complete your purchase or sale with
                confidence and legal protection.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillOfSaleInfo;
