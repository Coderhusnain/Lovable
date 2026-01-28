import React, { useState } from 'react';
import { FormWizard } from './FormWizard';

const CorporationFormation = () => {
  const [form, setForm] = useState({
    corporationName: '',
    stateOfIncorporation: '',
    effectiveDate: '',
    incorporatorName: '',
    incorporatorAddress: '',
    registeredAgent: '',
    principalOffice: '',
    businessPurpose: '',
    shareStructure: '',
    initialDirectors: '',
    bylaws: '',
    signName: '',
    signTitle: '',
    signDate: '',
  });

  const steps = [
    {
      label: 'Step 1',
      content: (
        <>
          <label>
            Corporation Name
            <input
              type="text"
              value={form.corporationName}
              onChange={e => setForm(f => ({ ...f, corporationName: e.target.value }))}
              required
            />
          </label>
          <label>
            State of Incorporation
            <input
              type="text"
              value={form.stateOfIncorporation}
              onChange={e => setForm(f => ({ ...f, stateOfIncorporation: e.target.value }))}
              required
            />
          </label>
          <label>
            Effective Date
            <input
              type="date"
              value={form.effectiveDate}
              onChange={e => setForm(f => ({ ...f, effectiveDate: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.corporationName && form.stateOfIncorporation && form.effectiveDate),
    },
    {
      label: 'Step 2',
      content: (
        <>
          <label>
            Incorporator Name
            <input
              type="text"
              value={form.incorporatorName}
              onChange={e => setForm(f => ({ ...f, incorporatorName: e.target.value }))}
              required
            />
          </label>
          <label>
            Incorporator Address
            <input
              type="text"
              value={form.incorporatorAddress}
              onChange={e => setForm(f => ({ ...f, incorporatorAddress: e.target.value }))}
              required
            />
          </label>
          <label>
            Registered Agent
            <input
              type="text"
              value={form.registeredAgent}
              onChange={e => setForm(f => ({ ...f, registeredAgent: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.incorporatorName && form.incorporatorAddress && form.registeredAgent),
    },
    {
      label: 'Step 3',
      content: (
        <>
          <label>
            Principal Office
            <input
              type="text"
              value={form.principalOffice}
              onChange={e => setForm(f => ({ ...f, principalOffice: e.target.value }))}
              required
            />
          </label>
          <label>
            Business Purpose
            <textarea
              value={form.businessPurpose}
              onChange={e => setForm(f => ({ ...f, businessPurpose: e.target.value }))}
              required
            />
          </label>
          <label>
            Share Structure
            <textarea
              value={form.shareStructure}
              onChange={e => setForm(f => ({ ...f, shareStructure: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.principalOffice && form.businessPurpose && form.shareStructure),
    },
    {
      label: 'Step 4',
      content: (
        <>
          <label>
            Initial Directors
            <textarea
              value={form.initialDirectors}
              onChange={e => setForm(f => ({ ...f, initialDirectors: e.target.value }))}
              required
            />
          </label>
          <label>
            Bylaws
            <textarea
              value={form.bylaws}
              onChange={e => setForm(f => ({ ...f, bylaws: e.target.value }))}
              required
            />
          </label>
          <label>
            Signatory Name
            <input
              type="text"
              value={form.signName}
              onChange={e => setForm(f => ({ ...f, signName: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.initialDirectors && form.bylaws && form.signName),
    },
    {
      label: 'Step 5',
      content: (
        <>
          <label>
            Signatory Title
            <input
              type="text"
              value={form.signTitle}
              onChange={e => setForm(f => ({ ...f, signTitle: e.target.value }))}
              required
            />
          </label>
          <label>
            Signatory Date
            <input
              type="date"
              value={form.signDate}
              onChange={e => setForm(f => ({ ...f, signDate: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.signTitle && form.signDate),
    },
  ];

  return <FormWizard steps={steps} onFinish={() => alert('Form submitted!')} />;
};

export default CorporationFormation;
