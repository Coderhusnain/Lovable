import React from 'react';
import { ArrowLeft, FileText, Shield, Clock, DollarSign, AlertTriangle, Users, Calendar, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const StorageSpaceLeaseInfo = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate('/documents')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Storage Space Lease Agreement</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A Storage Space Lease Agreement is a legal contract between a storage owner and a tenant for renting space to store personal or business property.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Storage Space Lease Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">The draft Storage Space Lease Agreement from Legalgram includes:</p>
              <ul className="space-y-1 text-gray-700 mt-2">
                <li>• Lease term and renewal provisions</li>
                <li>• Rental amount and payment schedule</li>
                <li>• Storage unit or area description</li>
                <li>• Usage restrictions and prohibited items</li>
                <li>• Liability, insurance, and termination clauses</li>
              </ul>
              <p className="text-gray-700 mt-3">Using the best format Storage Space Lease Agreement from Legalgram helps keep terms clear and legally protected.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Storage Space Lease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Define rent and payment responsibilities clearly</li>
                <li>• Avoid disputes over storage use and access</li>
                <li>• Protect both landlord and tenant rights</li>
                <li>• Maintain legal clarity and written records</li>
                <li>• Support professional rental documentation</li>
              </ul>
              <p className="text-gray-700 mt-3">Free download tenancy agreement and Storage Space Lease Agreement on Legalgram for complete rental documentation.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Storage Space Lease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Renting out a storage unit or storage room</li>
                <li>• Leasing garage, shed, basement, or warehouse space</li>
                <li>• Closing a rental and documenting terms in writing</li>
                <li>• Setting clear occupancy and insurance expectations</li>
              </ul>
              <p className="text-gray-700 mt-3">The Storage Space Lease Agreement on Legalgram is ideal for property owners, managers, and tenants.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Who Should Use This Agreement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3"><div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div><p><strong>Storage Facility Owners:</strong> Self-storage businesses, mini-storage operators, warehouse owners</p></div>
              <div className="flex items-start space-x-3"><div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div><p><strong>Individual Property Owners:</strong> Those renting out garage space, basement storage, or shed space</p></div>
              <div className="flex items-start space-x-3"><div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div><p><strong>Commercial Property Managers:</strong> Managing storage units in commercial buildings</p></div>
              <div className="flex items-start space-x-3"><div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div><p><strong>Renters:</strong> Individuals seeking personal storage space for belongings</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Features of the Best Storage Space Lease Agreement Format
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3"><div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div><p><strong>1. Tenant &amp; Property Details:</strong> Names, address, and storage location</p></div>
              <div className="flex items-start space-x-3"><div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div><p><strong>2. Deposit Information:</strong> Original deposit amount and terms</p></div>
              <div className="flex items-start space-x-3"><div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div><p><strong>3. Itemized Deductions:</strong> Clear list of repair, cleaning, or charge amounts</p></div>
              <div className="flex items-start space-x-3"><div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div><p><strong>4. Refund Amount:</strong> Final amount returned to the tenant</p></div>
              <div className="flex items-start space-x-3"><div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div><p><strong>5. Return Date:</strong> Date when payment or refund is issued</p></div>
              <div className="flex items-start space-x-3"><div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div><p><strong>6. Legal Clarity:</strong> Proper documentation to avoid disputes</p></div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              Is a Storage Space Lease Agreement Important?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">Risk and Insurance</h4>
              <p className="text-amber-700 text-sm">This agreement clearly states that the lessee stores property at their own risk and the lessor provides no insurance coverage. Lessees are strongly encouraged to obtain their own storage insurance to protect their belongings.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Security Considerations</h4>
              <p className="text-blue-700 text-sm">The agreement acknowledges that storage premises may not have security systems. Both parties should understand the security limitations and take appropriate precautions.</p>
            </div>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">State Law Compliance</h4>
              <p className="text-purple-700 text-sm">Storage lease agreements are subject to state-specific regulations. Ensure compliance with local laws regarding storage facilities, lien rights, and termination procedures in your jurisdiction.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What You'll Need</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Party Information:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Full legal names of lessor and lessee</li>
                  <li>• Complete addresses for both parties</li>
                  <li>• Storage unit specific address</li>
                  <li>• Lease start and end dates</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Financial Terms:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Monthly rental amount</li>
                  <li>• Security deposit amount</li>
                  <li>• Payment due date (day of month)</li>
                  <li>• Termination notice period</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Download Storage Space Lease Agreement - Legalgram</h3>
              <ul className="space-y-1 text-gray-700 mb-4">
                <li>✔ Professionally drafted legal format</li>
                <li>✔ Easy to customize and edit</li>
                <li>✔ Suitable for all storage situations</li>
                <li>✔ Instant download access</li>
              </ul>
              <Button onClick={() => navigate('/storage-space-lease-form')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                Start Creating Your Agreement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StorageSpaceLeaseInfo;
