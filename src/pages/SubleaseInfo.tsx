import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Users, Calendar, Scale, Edit3 } from "lucide-react";

const SubleaseInfo = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sublease Agreement</h1>
            <p className="text-lg text-gray-600">
              A professionally written Sublease Agreement helps tenants and subtenants clearly define responsibilities and avoid disputes.
            </p>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Sublease Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">A Sublease Agreement is a legally binding rental contract between the original tenant and a subtenant. It allows the original tenant to rent out all or part of the leased property.</p>
              <p className="text-gray-700 mb-4">The draft Sublease Agreement from Legalgram includes:</p>
              <ul className="space-y-1 text-gray-700 mb-4">
                <li>• Details of original tenant and subtenant</li>
                <li>• Lease duration and sublease period</li>
                <li>• Rent amount and payment terms</li>
                <li>• Property description (full unit or partial room)</li>
                <li>• Rights and responsibilities of each party</li>
              </ul>
              <p className="text-gray-700">Using the best format Sublease Agreement from Legalgram ensures legal clarity and proper documentation.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Sublease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">A well-drafted Sublease Agreement is essential for secure subletting. With Legalgram, you can:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Clearly define rent and payment responsibilities</li>
                <li>• Avoid misunderstandings between tenants and subtenants</li>
                <li>• Protect the original tenant from liability risks</li>
                <li>• Ensure compliance with lease terms</li>
                <li>• Maintain proper legal documentation</li>
              </ul>
              <p className="text-gray-700 mt-3">Free download tenancy agreement and Sublease Agreement on Legalgram for complete rental solutions.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Sublease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">You should download Sublease Agreement from Legalgram when:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• You want to sublet your apartment, house, or room</li>
                <li>• You are temporarily relocating and need a subtenant</li>
                <li>• You want to add a roommate under a formal contract</li>
                <li>• You need someone to complete your lease term</li>
              </ul>
              <p className="text-gray-700 mt-3">The Sublease Agreement on Legalgram is ideal for tenants, roommates, and temporary renters.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Features of the Best Sublease Agreement Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">The best format Sublease Agreement from Legalgram includes:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Party Details: Original tenant, subtenant, and landlord (if required)</li>
                <li>• Lease Terms: Start date, duration, and conditions</li>
                <li>• Rent &amp; Deposit: Payment structure and security deposit details</li>
                <li>• Property Description: Details of the rented portion (room, unit, etc.)</li>
                <li>• Permissions: Landlord approval requirements</li>
                <li>• Legal Clauses: Dispute resolution and liability terms</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Is a Sublease Agreement Legally Binding?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">Yes. A Sublease Agreement on Legalgram is legally binding once signed by both parties. However, landlord approval may be required depending on the original lease.</p>
              <p className="text-gray-700">Download Sublease Agreement from Legalgram to ensure your subletting arrangement is legally secure.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                How to Draft a Sublease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">With Legalgram, you can:</p>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Enter tenant and subtenant details</li>
                <li>Add original lease information</li>
                <li>Define rent and payment terms</li>
                <li>Include landlord consent (if required)</li>
                <li>Download Sublease Agreement instantly</li>
              </ol>
              <p className="text-gray-700 mt-3">The draft Sublease Agreement from Legalgram makes the process quick and hassle-free.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              Sublease Agreement FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold">What is the difference between sublease and sublet?</h4>
                <p>Both refer to renting property to another tenant, but a Sublease Agreement is the formal legal document.</p>
              </div>
              <div>
                <h4 className="font-semibold">Do I need landlord permission?</h4>
                <p>Yes, in most cases landlord approval is required before subletting.</p>
              </div>
              <div>
                <h4 className="font-semibold">Can I customize the agreement?</h4>
                <p>Yes, you can fully edit and download Sublease Agreement from Legalgram.</p>
              </div>
              <div>
                <h4 className="font-semibold">Is a Sublease Agreement enforceable?</h4>
                <p>Yes, once signed, it is legally binding.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Download Sublease Agreement – Legalgram</h3>
              <ul className="space-y-1 text-gray-700 mb-4">
                <li>✔ Professionally drafted legal format</li>
                <li>✔ Easy to customize and edit</li>
                <li>✔ Suitable for all subletting situations</li>
                <li>✔ Instant download access</li>
              </ul>
              <Button 
                onClick={() => navigate('/make-document/sublease')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
              >
                Start Creating Your Agreement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubleaseInfo;
