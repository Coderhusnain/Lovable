import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Monitor, Shield, Wrench, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const WorkFromHomeInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Monitor className="w-10 h-10 text-slate-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Work from Home Agreement</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A Work from Home Agreement defines expectations, equipment responsibilities, data protection, and schedules for remote employees.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Work from Home Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              This agreement outlines the terms under which an employee may work remotely, including hours, communication standards, equipment use, and confidentiality requirements.
            </p>
            <p className="text-gray-600">
              Use Legalgram's professionally drafted Work from Home Agreement template to protect your organization and remote staff.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Shield className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Confidentiality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Protect company data with clear data privacy and cybersecurity rules for remote setups.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Wrench className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Equipment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Specify company device usage, maintenance, and reimbursement policies for home office equipment.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Monitor className="w-8 h-8 text-rose-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Set clear working hours, availability windows, and reporting expectations for remote employees.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 text-center bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Work from Home Agreement?</CardTitle>
            <CardDescription className="text-lg">Download an editable Work from Home Agreement template in Word or PDF and customize it to your company policy.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3"
                onClick={() => navigate('/documents')}
              >
                Create Work from Home Agreement Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500">Professionally drafted, HR-ready, and customizable.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WorkFromHomeInfo;
