import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileSignature } from "lucide-react";

export default function MutualReleaseInfo() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-purple-600 rounded-xl">
            <FileSignature className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Mutual Release Agreement</h1>
        </div>
        <p className="text-xl text-gray-300">
          A legal document where two parties agree to drop all legal claims against each other, often used to settle disputes or end a contract cleanly.
        </p>
        <Button size="lg" onClick={() => navigate("/mutual-release-form")} className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-lg px-8">
          Create Mutual Release
        </Button>
      </div>
    </div>
  );
}