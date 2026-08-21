import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Calendar, Scale } from "lucide-react";

const RentIncreaseInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/documents')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Rent Increase Letter Information</h1>
            <p className="text-lg text-gray-600">
              A Rent Increase Letter is an essential document for landlords and property managers to formally communicate rent adjustments.
            </p>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Rent Increase Letter?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                A Rent Increase Letter is a written notice provided by a landlord to inform tenants about an increase in rent and the date it will take effect.
              </p>
              <p className="text-gray-700 mb-2">The draft Rent Increase Letter from Legalgram includes:</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Current and revised rent amount</li>
                <li>• Effective date of rent increase</li>
                <li>• Payment due date details</li>
                <li>• Notice period and terms</li>
                <li>• Legal compliance and documentation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Rent Increase Letter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Provide formal written notice to tenants</li>
                <li>• Maintain legal compliance with rent laws</li>
                <li>• Avoid misunderstandings regarding rent changes</li>
                <li>• Keep proper documentation for future reference</li>
                <li>• Protect landlord-tenant relationships</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Rent Increase Letter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• You want to increase monthly rent</li>
                <li>• You need to notify tenants in writing</li>
                <li>• You want to maintain a formal record of rent changes</li>
                <li>• You are renewing or updating lease terms</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Features of the Best Rent Increase Letter Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div className="p-3 bg-gray-50 rounded-lg"><strong>1. Current &amp; New Rent Amount</strong><p>Clear comparison of existing and revised rent</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><strong>2. Effective Date</strong><p>When the new rent will apply</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><strong>3. Payment Terms</strong><p>Due date and payment conditions</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><strong>4. Notice Period</strong><p>Advance notice as required by law</p></div>
                <div className="p-3 bg-gray-50 rounded-lg md:col-span-2"><strong>5. Legal Compliance</strong><p>Ensures adherence to rental regulations</p></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Is a Rent Increase Letter Legally Binding?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                Yes. A properly issued Rent Increase Letter on Legalgram serves as an official legal notice. While it does not itself change the lease terms, it is a required step before implementing rent changes.
              </p>
              <p className="text-gray-700">Download Rent Increase Letter from Legalgram to ensure legal compliance and proper documentation.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                How to Draft a Rent Increase Letter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Enter landlord and tenant details</li>
                <li>Add current and new rent amounts</li>
                <li>Specify the effective date</li>
                <li>Include notice period and terms</li>
                <li>Download Rent Increase Letter instantly</li>
              </ol>
              <p className="text-gray-700 mt-3">The draft Rent Increase Letter from Legalgram simplifies the process and saves time.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rent Increase Letter FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div><strong>How much can rent be increased?</strong><p>Typically 3-5%, but it depends on local laws and lease terms.</p></div>
                <div><strong>Can I notify tenants via email?</strong><p>Usually, written notice (hand-delivered or mailed) is required.</p></div>
                <div><strong>When can rent be increased?</strong><p>Generally, at the end of a lease term or as allowed by lease terms.</p></div>
                <div><strong>Can I customize the letter?</strong><p>Yes, you can download and edit Rent Increase Letter from Legalgram easily.</p></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Download Rent Increase Letter - Legalgram</h3>
              <p className="text-gray-600 mb-4">
                Professionally drafted legal format, easy to customize and edit, suitable for all rental properties, and instant access and download.
              </p>
              <Button 
                onClick={() => navigate('/make-document/rent-increase')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
              >
                Start Creating Your Letter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RentIncreaseInfo;
