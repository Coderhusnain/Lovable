
import React, { useState } from 'react';
import { FormWizard } from './FormWizard';

const DomesticServiceAgreementForm = () => {
  const [form, setForm] = useState({
    serviceProvider: '',
    client: '',
    serviceDescription: '',
    startDate: '',
    endDate: '',
    paymentTerms: '',
    additionalTerms: '',
    providerSignature: '',
    providerSignDate: '',
    clientSignature: '',
    clientSignDate: '',
  });

  const steps = [
    {
      label: 'Parties',
      content: (
        <>
          <label>
            Service Provider
            <input type="text" value={form.serviceProvider} onChange={e => setForm(f => ({ ...f, serviceProvider: e.target.value }))} required />
          </label>
          <label>
            Client
            <input type="text" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} required />
          </label>
          <label>
            Service Description
            <textarea value={form.serviceDescription} onChange={e => setForm(f => ({ ...f, serviceDescription: e.target.value }))} required />
          </label>
        </>
      ),
      validate: () => Boolean(form.serviceProvider && form.client && form.serviceDescription),
    },
    {
      label: 'Dates & Payment',
      content: (
        <>
          <label>
            Start Date
            <input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} required />
          </label>
          <label>
            End Date
            <input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} required />
          </label>
          <label>
            Payment Terms
            <input type="text" value={form.paymentTerms} onChange={e => setForm(f => ({ ...f, paymentTerms: e.target.value }))} required />
          </label>
        </>
      ),
      validate: () => Boolean(form.startDate && form.endDate && form.paymentTerms),
    },
    {
      label: 'Additional Terms',
      content: (
        <>
          <label>
            Additional Terms
            <textarea value={form.additionalTerms} onChange={e => setForm(f => ({ ...f, additionalTerms: e.target.value }))} />
          </label>
        </>
      ),
      validate: () => true,
    },
    {
      label: 'Signatures',
      content: (
        <>
          <label>
            Provider Signature
            <input type="text" value={form.providerSignature} onChange={e => setForm(f => ({ ...f, providerSignature: e.target.value }))} required />
          </label>
          <label>
            Provider Signature Date
            <input type="date" value={form.providerSignDate} onChange={e => setForm(f => ({ ...f, providerSignDate: e.target.value }))} required />
          </label>
          <label>
            Client Signature
            <input type="text" value={form.clientSignature} onChange={e => setForm(f => ({ ...f, clientSignature: e.target.value }))} required />
          </label>
          <label>
            Client Signature Date
            <input type="date" value={form.clientSignDate} onChange={e => setForm(f => ({ ...f, clientSignDate: e.target.value }))} required />
          </label>
        </>
      ),
      validate: () => Boolean(form.providerSignature && form.providerSignDate && form.clientSignature && form.clientSignDate),
    },
  ];

  return <FormWizard steps={steps} onFinish={() => alert('Form submitted!')} />;
};

export default DomesticServiceAgreementForm;







