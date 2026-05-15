import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Stethoscope, CheckCircle, AlertTriangle, Building, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";

const PhysicianServicesInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
            <Stethoscope className="w-10 h-10 text-teal-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Physician Services Agreement</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A written Physician Services Agreement helps reduce misunderstandings and creates a professional structure for medical service arrangements.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What is a Physician Services Agreement?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Physician Services Agreement is a legal contract between a physician and a healthcare provider that outlines the medical services to be provided and the terms of engagement. It explains responsibilities, payment terms, compliance requirements, scheduling, confidentiality, and dispute resolution.
            </p>
            <p className="text-gray-600">
              This agreement commonly covers service scope, work locations, compensation and billing, credentialing and licensing, malpractice insurance responsibilities, HIPAA and patient confidentiality, and renewal/termination rules.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Clear Duties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Define physician duties, schedules, and on-call obligations.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Building className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Ensure licensing, credentialing, and HIPAA compliance are specified.</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Stethoscope className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Insurance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Clarify malpractice and liability insurance responsibilities.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="text-center bg-gradient-to-r from-teal-50 to-indigo-50 border-teal-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Physician Services Agreement?</CardTitle>
            <CardDescription className="text-lg">Download a professionally drafted Physician Services Agreement template.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-3"
                onClick={() => navigate('/documents/physician-services')}
              >
                Create Physician Services Agreement Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500">Editable Word & PDF formats available.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PhysicianServicesInfo;
