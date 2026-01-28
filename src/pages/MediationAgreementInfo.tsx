import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Handshake } from "lucide-react";

export default function MediationAgreementInfo() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-600 rounded-xl">
            <Handshake className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Mediation Agreement</h1>
        </div>
        <p className="text-xl text-gray-300">
          A contract used when two parties agree to resolve a dispute using a neutral third-party mediator instead of going to court.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-2 text-blue-400">When to use?</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Settling business disputes out of court.</li>
              <li>Divorce or family matters.</li>
              <li>Contract disagreements.</li>
            </ul>
          </div>
        </div>
        <Button size="lg" onClick={() => navigate("/mediation-agreement-form")} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8">
          Start Mediation Agreement
        </Button>
      </div>
    </div>
  );
}