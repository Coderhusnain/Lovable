import React, { useState } from "react";
import { FormWizard } from "./FormWizard";

const ArbitrationAgreementForm = () => {
  const [form, setForm] = useState({
    date: "",
    firstParty: "",
    secondParty: "",
    secondPartyAddress: "",
    businessRelationshipDate: "",
    originalContractTitle: "",
    arbitratorName: "",
    arbitrationLocation: "",
    firstPartyName: "",
    firstPartyTitle: "",
    firstPartyDate: "",
    secondPartyName: "",
    secondPartyTitle: "",
    secondPartyDate: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const steps = [
    {
      label: "Parties Information",
      content: (
        <>
          <div>
            <label>Date<input name="date" value={form.date} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>First Party<input name="firstParty" value={form.firstParty} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>Second Party<input name="secondParty" value={form.secondParty} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>Second Party Address<input name="secondPartyAddress" value={form.secondPartyAddress} onChange={handleChange} required /></label>
          </div>
        </>
      ),
      validate: () => Boolean(form.date && form.firstParty && form.secondParty && form.secondPartyAddress),
    },
    {
      label: "Business Contract Details",
      content: (
        <>
          <div>
            <label>Business Relationship Date<input name="businessRelationshipDate" value={form.businessRelationshipDate} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>Original Contract Title<input name="originalContractTitle" value={form.originalContractTitle} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>Arbitrator Name<input name="arbitratorName" value={form.arbitratorName} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>Arbitration Location<input name="arbitrationLocation" value={form.arbitrationLocation} onChange={handleChange} required /></label>
          </div>
        </>
      ),
      validate: () => Boolean(form.businessRelationshipDate && form.originalContractTitle && form.arbitratorName && form.arbitrationLocation),
    },
    {
      label: "Execution Details",
      content: (
        <>
          <div>
            <label>First Party Name<input name="firstPartyName" value={form.firstPartyName} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>First Party Title<input name="firstPartyTitle" value={form.firstPartyTitle} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>First Party Date<input name="firstPartyDate" value={form.firstPartyDate} onChange={handleChange} required /></label>
          </div>
        </>
      ),
      validate: () => Boolean(form.firstPartyName && form.firstPartyTitle && form.firstPartyDate),
    },
    {
      label: "Second Party Execution",
      content: (
        <>
          <div>
            <label>Second Party Name<input name="secondPartyName" value={form.secondPartyName} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>Second Party Title<input name="secondPartyTitle" value={form.secondPartyTitle} onChange={handleChange} required /></label>
          </div>
          <div>
            <label>Second Party Date<input name="secondPartyDate" value={form.secondPartyDate} onChange={handleChange} required /></label>
          </div>
        </>
      ),
      validate: () => Boolean(form.secondPartyName && form.secondPartyTitle && form.secondPartyDate),
    },
  ];

  return <FormWizard steps={steps} onFinish={() => alert('Form submitted!')} />;
};

export default ArbitrationAgreementForm;
