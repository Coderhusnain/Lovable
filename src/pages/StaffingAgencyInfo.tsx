import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Briefcase, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const StaffingAgencyInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-emerald-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Staffing Agency Contract</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A Staffing Agency Contract sets clear expectations for recruitment services, placement fees, and
            replacement guarantees to keep hiring operations smooth and compliant.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Staffing Agency Contract?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Staffing Agency Contract is an agreement between a staffing agency and a client company where
              the agency provides qualified personnel for temporary, permanent, or contract placements. It
              defines services, fees, timelines, confidentiality, and compliance obligations.
            </p>
            <p className="text-gray-600">
              Use this template for temporary staffing, permanent placements, executive recruitment,
              seasonal workforce hiring, and outsourced staffing solutions.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Briefcase className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Clear Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Define placement commissions, hourly markups, and payment schedules.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Replacement Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Set replacement windows and refund or re-placement terms for early departures.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Ensure candidate checks, labor law compliance, and confidentiality obligations.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-indigo-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Staffing Agency Contract?</CardTitle>
            <CardDescription className="text-lg">Download an editable Staffing Agency Contract template in Word or PDF and customize it for your hiring needs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3"
                onClick={() => navigate('/documents/staffing-agency')}
              >
                Create Staffing Agency Contract Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500">Professionally drafted, editable, and business-ready.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StaffingAgencyInfo;
