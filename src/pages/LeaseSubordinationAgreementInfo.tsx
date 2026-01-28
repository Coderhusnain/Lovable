import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowDownUp } from "lucide-react";

export default function LeaseSubordinationAgreementInfo() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-orange-600 rounded-xl">
            <ArrowDownUp className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Lease Subordination</h1>
        </div>
        <p className="text-xl text-gray-300">
          An agreement establishing that a tenant's lease interest is secondary (subordinate) to a lender's mortgage interest on the property.
        </p>
        <Button size="lg" onClick={() => navigate("/lease-subordination-agreement-form")} className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-lg px-8">
          Start Agreement
        </Button>
      </div>
    </div>
  );
}