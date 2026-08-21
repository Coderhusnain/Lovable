import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, FileText, DollarSign, CheckCircle, Users, Download } from "lucide-react";
import Layout from "@/components/layout/Layout";

const FinancialSupportAffidavitInfo = () => {
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
              <h1 className="text-3xl font-bold">Affidavit of Financial Support</h1>
              <p className="text-muted-foreground">Professional legal draft to confirm financial condition and support details</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                What is an Affidavit of Financial Support?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                An Affidavit of Financial Support is an important legal document used to officially confirm a person&apos;s financial condition. If a court, immigration authority, lender, or business requests proof of income, expenses, assets, or debts, this affidavit helps provide that information in a professional and legally accepted format.
              </p>
              <p>
                Users looking for the best format Affidavit of Financial Support can easily prepare and download it on Legalgram in an easy editable format.
              </p>
            </CardContent>
          </Card>

          {/* Other Names */}
          <Card>
            <CardHeader>
              <CardTitle>Other Names</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Financial Support Affidavit</li>
                <li>Financial Affidavit of Support</li>
                <li>Support Affidavit Draft</li>
                <li>Financial Declaration Affidavit</li>
              </ul>
            </CardContent>
          </Card>

          {/* Included Details */}
          <Card>
            <CardHeader>
              <CardTitle>What This Document May Include</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Full name of the affiant (person making the affidavit)</li>
                  <li>Employment details and monthly income</li>
                  <li>Sources of additional earnings</li>
                  <li>Monthly salary deductions</li>
                </ul>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Household expenses</li>
                  <li>Existing loans or debts</li>
                  <li>Bank balances and owned assets</li>
                  <li>Efforts to seek employment (if unemployed)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* When to Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                When to Use an Affidavit of Financial Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>A court requests your financial details</li>
                <li>You need to prove income for a legal case</li>
                <li>A business requires financial verification</li>
                <li>Immigration sponsorship requires proof of support</li>
                <li>Loan or financial applications need supporting evidence</li>
              </ul>
            </CardContent>
          </Card>

          {/* Why Legalgram */}
          <Card>
            <CardHeader>
              <CardTitle>Why Choose Legalgram?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Free download Affidavit of Financial Support</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">PDF format</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Professional legal draft</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Ready-to-use affidavit template</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Instant download document</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download and Sample */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Download Affidavit of Financial Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Prepare and download Affidavit of Financial Support instantly from Legalgram. Our templates are user-friendly, legally structured, and designed for quick use.
              </p>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Sample Affidavit of Financial Support</h4>
                <p className="text-sm text-muted-foreground">
                  Your document updates automatically based on the information you provide. Thousands of users trust Legalgram for legal forms and affidavits.
                </p>
              </div>
              <p className="text-sm font-medium">Download Affidavit of Financial Support on Legalgram today.</p>
            </CardContent>
          </Card>

          {/* Get Started */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Need a Reliable Affidavit of Financial Support?</h3>
                <p className="text-muted-foreground">
                  Choose the best format Affidavit of Financial Support from Legalgram and download instantly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FinancialSupportAffidavitInfo;
