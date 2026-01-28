import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Hammer } from "lucide-react";

export default function FlooringServicesAgreementInfo() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-yellow-600 rounded-xl">
            <Hammer className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Flooring Contract</h1>
        </div>
        <p className="text-xl text-gray-300">
          A specific construction contract detailing the installation, repair, or replacement of flooring materials between a contractor and a client.
        </p>
        <Button size="lg" onClick={() => navigate("/flooring-services-agreement-form")} className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-lg px-8">
          Create Contract
        </Button>
      </div>
    </div>
  );
}