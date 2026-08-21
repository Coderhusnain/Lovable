import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Shield, CheckCircle, ArrowRight, AlertTriangle, Scale, Clock, DollarSign, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const CopyrightLicenseInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Copyright License
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Grant or obtain limited usage rights to copyrighted material while preserving ownership with clear, professional licensing terms
          </p>
        </div>

        {/* Other Names Section */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Other Names for This Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Intellectual Property License", "Creative Work License", "Digital Rights License", "Licensing Agreement", "Intellectual Property Licensing Agreement"].map((name) => (
                <span key={name} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What Is Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What Is a Copyright License?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              A Copyright License is a legally binding arrangement that allows one party (the licensee) to use copyrighted material owned by another party (the licensor), subject to defined terms and conditions. Unlike a copyright assignment that transfers ownership to the other party, a license agreement lets the original creator retain full ownership while granting controlled usage rights.
            </p>
            <p className="text-gray-600 mb-4">
              The key distinction is that a license is a limited, revocable grant of rights. The licensor maintains ownership and can terminate the arrangement if the terms are violated or the agreement expires. The licensee receives permission to use the work within specified boundaries—whether geographic, temporal, or usage-based.
            </p>
            <p className="text-gray-600">
              This agreement is essential for creative professionals, businesses, and individuals who want to monetize their intellectual property or obtain legal permission to use copyrighted works. It provides clear boundaries for usage while protecting both parties' interests and ensuring proper compensation.
            </p>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Ownership Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Maintain complete ownership of your copyrighted work while granting controlled usage rights to others
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Revenue Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Create ongoing income streams through royalty payments and licensing fees from your intellectual property
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-lg">Legal Clarity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Establish clear terms for usage, territory, duration, and compensation to prevent disputes and misunderstandings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* When to Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">When to Use a Copyright License Agreement</CardTitle>
            <CardDescription>
              Copyright licensing is ideal for various creative and business scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-gray-900">For Copyright Owners (Licensors)</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Licensing music for films, commercials, or streaming</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Allowing use of photographs, artwork, or designs</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Licensing software code or applications</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Granting publication rights for written content</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-gray-900">For License Seekers (Licensees)</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Using copyrighted material in your business or projects</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Obtaining legal permission for creative works</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Avoiding copyright infringement lawsuits</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-600">Securing rights for commercial distribution</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Included */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">What's Included in Your Copyright License Agreement</CardTitle>
            <CardDescription>
              Our comprehensive template covers all essential elements of copyright licensing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Grant of License</h4>
                    <p className="text-sm text-gray-600">Clear definition of exclusive or non-exclusive rights being granted</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Scope of Rights</h4>
                    <p className="text-sm text-gray-600">Detailed description of what the licensee can and cannot do</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Territory & Duration</h4>
                    <p className="text-sm text-gray-600">Geographic limitations and time period for the license</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Royalty Structure</h4>
                    <p className="text-sm text-gray-600">Payment terms, calculation methods, and reporting requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Modification Rights</h4>
                    <p className="text-sm text-gray-600">Restrictions on altering or modifying the licensed work</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Default & Termination</h4>
                    <p className="text-sm text-gray-600">Breach conditions and termination procedures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Dispute Resolution</h4>
                    <p className="text-sm text-gray-600">Arbitration clauses and governing law provisions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Warranties & Disclaimers</h4>
                    <p className="text-sm text-gray-600">Legal protections and liability limitations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Assignment Restrictions</h4>
                    <p className="text-sm text-gray-600">Controls on transferring license rights to third parties</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Indemnification</h4>
                    <p className="text-sm text-gray-600">Protection clauses for both parties against third-party claims</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Types Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Types of Copyright License Agreements</CardTitle>
            <CardDescription>
              Different licensing structures for various needs and industries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Exclusive License</h4>
                  <p className="text-purple-700 text-sm">Grants sole rights to the licensee, preventing the licensor from licensing to others</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Non-Exclusive License</h4>
                  <p className="text-blue-700 text-sm">Allows multiple licensees to use the same copyrighted material</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Sublicensing Rights</h4>
                  <p className="text-green-700 text-sm">Permission for licensee to grant sublicenses to third parties</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Territory-Based</h4>
                  <p className="text-orange-700 text-sm">Geographic restrictions on where the license can be exercised</p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-2">Time-Limited</h4>
                  <p className="text-indigo-700 text-sm">Licenses with specific start and end dates or renewal terms</p>
                </div>
                <div className="p-4 bg-rose-50 rounded-lg">
                  <h4 className="font-semibold text-rose-900 mb-2">Royalty-Free</h4>
                  <p className="text-rose-700 text-sm">One-time payment with no ongoing royalty obligations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-xl text-amber-800 flex items-center">
              Important Legal Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="text-amber-700">
            <p className="mb-4">
              <strong>Copyright licensing involves complex legal rights and obligations.</strong> Consider these important factors:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Ensure you own or have the right to license the copyrighted material</li>
              <li>Clearly define the scope of rights being granted to avoid future disputes</li>
              <li>Consider tax implications of royalty income and licensing fees</li>
              <li>Include proper termination and default provisions</li>
              <li>Notarization may be required for certain high-value agreements</li>
            </ul>
            <p>
              For complex licensing arrangements or high-value intellectual property, consult with an intellectual property attorney.
            </p>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">What's the difference between a copyright license and a copyright assignment?</h4>
              <p className="text-blue-800">A copyright license grants limited, revocable usage rights while the licensor retains ownership. An assignment permanently transfers ownership to the other party. A license is more common when you want to monetize your work while maintaining control.</p>
            </div>
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <h4 className="font-semibold text-green-900 mb-2">Can I revoke a copyright license once granted?</h4>
              <p className="text-green-800">Yes, copyright licenses can include termination provisions that allow revocation if the licensee violates the agreement terms or after a specified period. Most agreements include conditions under which the license can be terminated.</p>
            </div>
            <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">What types of content can be covered by a copyright license?</h4>
              <p className="text-purple-800">Copyright licenses can cover music, photographs, artwork, written works, software code, designs, videos, and any other original creative work protected by copyright law. The license should clearly describe what specific material is being licensed.</p>
            </div>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">Is a copyright license required to be in writing?</h4>
              <p className="text-yellow-800">While verbal agreements can exist, a written copyright license is strongly recommended for legal clarity and enforceability. Written agreements prevent misunderstandings and provide evidence of the agreed terms in case of disputes.</p>
            </div>
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <h4 className="font-semibold text-red-900 mb-2">What's the difference between exclusive and non-exclusive licenses?</h4>
              <p className="text-red-800">An exclusive license grants rights to only one licensee, preventing the licensor from licensing to others. A non-exclusive license allows multiple parties to use the same copyrighted material simultaneously. Exclusive licenses typically command higher fees.</p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Ready to Create Your Copyright License?</CardTitle>
            <CardDescription className="text-lg">
              Generate a professional copyright license agreement in 10-15 minutes with our guided process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-center space-x-8 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Clear licensing terms
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Customizable agreement
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Professional formatting
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                onClick={() => navigate('/documents/copyright-license')}
              >
                Create Copyright License Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Complete the form and generate your professional copyright license agreement
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CopyrightLicenseInfo;
