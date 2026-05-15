import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { DollarSign, FileText, Users, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const SeveranceInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6">
            <DollarSign className="w-10 h-10 text-rose-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Severance Agreement</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A written Severance Agreement creates clarity, reduces disputes, and supports a smooth transition after employment ends.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Severance Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Severance Agreement outlines the terms of separation including severance pay, continuation of benefits, release of claims, confidentiality obligations, and return of company property.
            </p>
            <p className="text-gray-600">
              Use this template to document payment terms, release language, confidentiality and non-disparagement clauses, and any cooperation obligations after termination.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 text-rose-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Protect Both Sides</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Document final payments and releases to avoid future disputes.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <FileText className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Legal Finality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Include enforceable release and dismissal language when settling claims.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Clear Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Specify severance amount, tax treatment, and payment schedule.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 text-center bg-gradient-to-r from-rose-50 to-indigo-50 border-rose-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Severance Agreement?</CardTitle>
            <CardDescription className="text-lg">Download an editable Severance Agreement template in Word or PDF and customize it for your business.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-rose-700 hover:bg-rose-800 text-white px-8 py-3"
                onClick={() => navigate('/documents/Severance')}
              >
                Create Severance Agreement Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500">Professionally drafted, editable, and ready for immediate use.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SeveranceInfo;
