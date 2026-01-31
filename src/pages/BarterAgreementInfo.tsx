import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BarterAgreementInfo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Barter Agreement</h1>
      <p className="mb-6 text-muted-foreground">
        A Barter Agreement sets the terms for exchanging goods or services without money, specifying items, value, delivery, and dispute resolution.
      </p>
      <h2 className="text-xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Defines goods/services to be exchanged</li>
        <li>Specifies value and delivery terms</li>
        <li>Outlines obligations of each party</li>
        <li>Includes warranties and representations</li>
        <li>Details dispute resolution and termination</li>
      </ul>
      <Button onClick={() => navigate("/barter-agreement-form")}>Create Document</Button>
    </div>
  );
};

export default BarterAgreementInfo;
