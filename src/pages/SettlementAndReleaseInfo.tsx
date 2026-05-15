import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FileCheck, Gavel, Users, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const SettlementAndReleaseInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mb-6">
            <FileCheck className="w-10 h-10 text-sky-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Settlement and Release Agreement</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A written Settlement and Release Agreement helps parties resolve disputes quickly, avoid litigation costs, and record enforceable settlement terms.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Settlement and Release Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Settlement and Release Agreement documents the resolution of a dispute, including payment terms, mutual releases of claims, confidentiality clauses, and dismissal or release language to finalize the matter. It is commonly used in lawsuits, contractual disputes, employment claims, and property damage claims.
            </p>
            <p className="text-gray-600">
              Use this template to set settlement amounts and schedules, define releases of liability, require confidentiality or non-disparagement, and include dismissal instructions for any pending court proceedings.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 text-sky-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Resolve Quickly</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">End disputes without lengthy court proceedings.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Gavel className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Legal Finality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Provide enforceable releases and dismissal language for courts.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <FileCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Protect Confidentiality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Add confidentiality and non-disparagement clauses to keep terms private.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 text-center bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create a Settlement Agreement?</CardTitle>
            <CardDescription className="text-lg">Download an editable Settlement and Release Agreement template in Word or PDF and customize it for your settlement.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-sky-700 hover:bg-sky-800 text-white px-8 py-3"
                onClick={() => navigate('/documents/settlement-and-release-agreement')}
              >
                Create Settlement Agreement Now
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

export default SettlementAndReleaseInfo;
