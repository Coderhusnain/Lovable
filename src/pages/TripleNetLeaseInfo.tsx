import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Shield, Edit3, HelpCircle } from "lucide-react";

const TripleNetLeaseInfo = () => {
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
            <h1 className="text-3xl font-bold">Triple Net Lease Agreement</h1>
            <p className="text-muted-foreground">
              A commercial lease where tenants are responsible for property taxes, building insurance, and maintenance expenses
            </p>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Triple Net Lease Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">
                A Triple Net Lease Agreement (NNN Lease) is a commercial lease where the tenant is responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Property taxes</li>
                <li>Building insurance</li>
                <li>Maintenance and operating expenses</li>
              </ul>
              <p className="text-gray-700">
                This Triple Net Lease Agreement on Legalgram ensures that all property-related costs are transferred to the tenant, making it a preferred structure for commercial landlords. The best format Triple Net Lease Agreement from Legalgram helps reduce disputes and clearly defines financial obligations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why Use a Triple Net Lease Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">Using a draft Triple Net Lease Agreement offers several advantages:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Clearly allocates expenses between landlord and tenant</li>
                <li>Reduces financial burden on landlords</li>
                <li>Allows negotiation of lower base rent</li>
                <li>Provides transparency in commercial leasing</li>
                <li>Ensures legal protection for both parties</li>
              </ul>
              <p className="text-gray-700 mt-4">
                📥 Free download tenancy agreement and Triple Net Lease Agreement on Legalgram for complete lease solutions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Triple Net Lease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">You should download Triple Net Lease Agreement from Legalgram when:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Leasing a commercial property (retail, office, or industrial)</li>
                <li>You want tenants to cover all property expenses</li>
                <li>Negotiating net-based rental structures</li>
                <li>Managing standalone commercial buildings</li>
              </ul>
              <p className="text-gray-700 mt-4">
                The Triple Net Lease Agreement on Legalgram is ideal for landlords, investors, and business tenants.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Features of the Best Triple Net Lease Agreement Format</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">The best format Triple Net Lease Agreement from Legalgram includes:</p>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold">1. Property Details</h4>
                  <p className="text-gray-600 text-sm">Full description and address of the leased premises</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold">2. Expense Responsibilities</h4>
                  <p className="text-gray-600 text-sm">Taxes, insurance, and maintenance obligations</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold">3. Rent & Payment Terms</h4>
                  <p className="text-gray-600 text-sm">Base rent, due dates, and payment methods</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold">4. Insurance Requirements</h4>
                  <p className="text-gray-600 text-sm">Tenant's obligation to maintain coverage</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold">5. Maintenance & Repairs</h4>
                  <p className="text-gray-600 text-sm">Responsibility for upkeep and improvements</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold">6. Default & Termination</h4>
                  <p className="text-gray-600 text-sm">Conditions for breach and lease termination</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold">7. Renewal & Holdover</h4>
                  <p className="text-gray-600 text-sm">Terms for lease extension or continuation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Is a Triple Net Lease Agreement Legally Binding?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">
                Yes. A Triple Net Lease Agreement is a legally enforceable commercial contract.
              </p>
              <p className="text-gray-700">
                👉 Download Triple Net Lease Agreement on Legalgram to ensure your lease complies with legal standards and protects your interests.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                How to Draft a Triple Net Lease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">With Legalgram, you can easily:</p>
              <ol className="list-decimal list-inside text-gray-700 space-y-1">
                <li>Enter property and party details</li>
                <li>Define rent and expense responsibilities</li>
                <li>Add maintenance and insurance clauses</li>
                <li>Customize lease duration and renewal terms</li>
                <li>Download Triple Net Lease Agreement instantly</li>
              </ol>
              <p className="text-gray-700 mt-3">
                The draft Triple Net Lease Agreement from Legalgram simplifies the entire process.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Triple Net Lease Agreement FAQs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900">What expenses does a Triple Net Lease cover?</h4>
                  <p className="text-gray-700 text-sm">Property taxes, insurance, and maintenance costs.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Is it suitable for all commercial properties?</h4>
                  <p className="text-gray-700 text-sm">Yes, especially for standalone buildings and long-term leases.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Can rent be negotiated in an NNN Lease?</h4>
                  <p className="text-gray-700 text-sm">Yes, tenants often negotiate lower base rent.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Can I customize the lease?</h4>
                  <p className="text-gray-700 text-sm">Yes, you can fully edit and download Triple Net Lease Agreement from Legalgram.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Download Triple Net Lease Agreement – Legalgram</h3>
              <ul className="text-gray-700 space-y-1 mb-4">
                <li>✔ Professionally drafted template</li>
                <li>✔ Easy customization</li>
                <li>✔ Suitable for all commercial leases</li>
                <li>✔ Instant download access</li>
              </ul>
              <Button className="w-full" onClick={() => navigate('/make-document/triple-net-lease')}>
                Start Creating Your Agreement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TripleNetLeaseInfo;
