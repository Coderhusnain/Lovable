import React from 'react';
import { ArrowLeft, FileText, UtensilsCrossed, Shield, Calendar, Scale, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const RestaurantLeaseInfo = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Restaurant Lease Agreement</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A Restaurant Lease Agreement is a legal contract between a commercial landlord and a tenant for renting property to operate a restaurant.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                What is a Restaurant Lease Agreement?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-700">The draft Restaurant Lease Agreement from Legalgram includes:</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Property details and lease duration</li>
                <li>• Rent amount and payment schedule</li>
                <li>• Maintenance and utility responsibilities</li>
                <li>• Terms for property use as a restaurant</li>
                <li>• Legal clauses for compliance and dispute resolution</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Why You Need a Restaurant Lease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-1 text-gray-700">
                <li>• Clearly define rental terms and obligations</li>
                <li>• Avoid misunderstandings and legal disputes</li>
                <li>• Establish payment schedules and rent details</li>
                <li>• Ensure compliance with local rental laws</li>
                <li>• Protect your commercial investment</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                When to Use a Restaurant Lease Agreement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-1 text-gray-700">
                <li>• You own commercial property and want to lease it as a restaurant</li>
                <li>• You are renting space to start or run a restaurant business</li>
                <li>• You need a legally binding commercial lease document</li>
                <li>• You want to formalize landlord-tenant terms</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Key Features of the Best Restaurant Lease Agreement Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div className="p-3 bg-gray-50 rounded-lg"><strong>1. Property Description</strong><p>Details of the commercial space being leased</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><strong>2. Lease Duration</strong><p>Start and end date of tenancy</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><strong>3. Rent &amp; Payment Terms</strong><p>Clear breakdown of rent, due dates, and payment method</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><strong>4. Usage Terms</strong><p>Specifies use of property for restaurant operations</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><strong>5. Maintenance &amp; Utilities</strong><p>Responsibilities of landlord and tenant</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><strong>6. Legal Protection</strong><p>Clauses for damages, termination, and dispute resolution</p></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Is a Restaurant Lease Agreement Legally Binding?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                Yes. A Restaurant Lease Agreement on Legalgram is a legally binding contract once signed by both parties. It ensures enforceability of terms and protects both landlord and tenant rights.
              </p>
              <p className="text-gray-700">Download Restaurant Lease Agreement from Legalgram to ensure legal compliance and clarity.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Draft a Restaurant Lease Agreement</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Enter landlord and tenant details</li>
                <li>Add property description and lease term</li>
                <li>Specify rent and payment conditions</li>
                <li>Include usage, maintenance, and legal clauses</li>
                <li>Download Restaurant Lease Agreement instantly</li>
              </ol>
              <p className="text-gray-700 mt-3">The draft Restaurant Lease Agreement from Legalgram simplifies the process and saves time and cost.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Restaurant Lease Agreement FAQs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700">
                <div><strong>What should a Restaurant Lease Agreement include?</strong><p>It should include property details, lease term, rent, utilities, maintenance, and legal clauses.</p></div>
                <div><strong>Is it necessary to have a written lease?</strong><p>Yes, a written Restaurant Lease Agreement avoids disputes and ensures legal protection.</p></div>
                <div><strong>Can I customize the agreement?</strong><p>Yes, you can fully edit and download Restaurant Lease Agreement from Legalgram.</p></div>
                <div><strong>Are local laws important?</strong><p>Yes, local rental laws affect lease terms, so using a compliant format is essential.</p></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Download Restaurant Lease Agreement - Legalgram</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-gray-700">
                <li>• Professionally drafted legal format</li>
                <li>• Easy to customize and edit</li>
                <li>• Suitable for all commercial restaurant leases</li>
                <li>• Instant access and download</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={() => navigate('/restaurant-lease-form')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            Start Creating Your Agreement
            <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantLeaseInfo;
