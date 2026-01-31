import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ContractExtensionInfo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Contract Extension</h1>
      <p className="mb-6 text-muted-foreground">
        A Contract Extension document formalizes the extension of an existing
        agreement, specifying new terms, duration, and any amendments agreed upon
        by the parties.
      </p>
      <h2 className="text-xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Identifies original contract and parties</li>
        <li>Specifies new term or duration</li>
        <li>Outlines amendments or changes</li>
        <li>Includes signatures and effective date</li>
        <li>Details dispute resolution and termination</li>
      </ul>
      <Button onClick={() => navigate("/contract-extension-form")}>
        Create Document
      </Button>
    </div>
  );
};

export default ContractExtensionInfo;
