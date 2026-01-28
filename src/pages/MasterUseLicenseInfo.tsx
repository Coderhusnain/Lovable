import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music } from "lucide-react";

export default function MasterUseLicenseInfo() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-pink-600 rounded-xl">
            <Music className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Master Use License</h1>
        </div>
        <p className="text-xl text-gray-300">
          Grants permission to use a specific sound recording in film, television, commercials, or other media.
        </p>
        <Button size="lg" onClick={() => navigate("/master-use-license-form")} className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-lg px-8">
          Create License
        </Button>
      </div>
    </div>
  );
}