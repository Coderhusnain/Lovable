import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContractExtensionInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Contract Extension Agreement</h1>
      <p className="mb-4">A Contract Extension Agreement is used to formally extend the duration of an existing contract, specifying the new end date and any amendments. It ensures both parties agree to the updated terms.</p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Key Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>References the original contract</li>
        <li>Specifies new end date and amendments</li>
        <li>Requires agreement from both parties</li>
        <li>Provides legal clarity for contract changes</li>
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/contract-extension-form')}
      >
        Create Document
      </button>
    </div>
  );
};

export default ContractExtensionInfo;
