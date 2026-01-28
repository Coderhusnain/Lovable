import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdvertisingAgencyInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Advertising Agency Agreement</h1>
      <p className="mb-4">An Advertising Agency Agreement defines the relationship between a client and an agency, including media channels, budget, creative control, and fees. It ensures both parties understand their roles and compensation.</p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Key Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Identifies client and agency</li>
        <li>Lists media channels and budget</li>
        <li>Specifies creative control and fees</li>
        <li>Clarifies deliverables and expectations</li>
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/advertising-agency-form')}
      >
        Create Document
      </button>
    </div>
  );
};

export default AdvertisingAgencyInfo;
