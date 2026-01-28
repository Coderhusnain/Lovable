import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdministrativeServicesInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Administrative Services Agreement</h1>
      <p className="mb-4">An Administrative Services Agreement outlines the terms under which a provider delivers administrative services to a client. It details the services, hourly rate, and confidentiality terms, protecting both parties.</p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Key Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Defines client and provider</li>
        <li>Lists services and hourly rate</li>
        <li>Specifies confidentiality requirements</li>
        <li>Clarifies service expectations</li>
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/administrative-services-form')}
      >
        Create Document
      </button>
    </div>
  );
};

export default AdministrativeServicesInfo;
