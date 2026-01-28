import React, { useState } from 'react';
import { FormWizard } from './FormWizard';

// Corporate Bylaws Form Component
const CorporateBylawsForm = () => {
  const [form, setForm] = useState({
    corporationName: '',
    stateOfIncorporation: '',
    effectiveDate: '',
    purpose: '',
    principalOffice: '',
    registeredAgent: '',
    boardMembers: '',
    officerTitles: '',
    shareholderMeetings: '',
    quorum: '',
    voting: '',
    amendmentProcedure: '',
    indemnification: '',
    signName: '',
    signTitle: '',
    signDate: '',
  });

  // Steps for the form wizard
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
            Purpose
            <textarea
              value={form.purpose}
              onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
              required
            />
          </label>
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
      validate: () => Boolean(form.purpose && form.principalOffice && form.registeredAgent),
    },
    {
      label: 'Step 3',
      content: (
        <>
          <label>
            Board Members
            <textarea
              value={form.boardMembers}
              onChange={e => setForm(f => ({ ...f, boardMembers: e.target.value }))}
              required
            />
          </label>
          <label>
            Officer Titles
            <textarea
              value={form.officerTitles}
              onChange={e => setForm(f => ({ ...f, officerTitles: e.target.value }))}
              required
            />
          </label>
          <label>
            Shareholder Meetings
            <textarea
              value={form.shareholderMeetings}
              onChange={e => setForm(f => ({ ...f, shareholderMeetings: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.boardMembers && form.officerTitles && form.shareholderMeetings),
    },
    {
      label: 'Step 4',
      content: (
        <>
          <label>
            Quorum
            <input
              type="text"
              value={form.quorum}
              onChange={e => setForm(f => ({ ...f, quorum: e.target.value }))}
              required
            />
          </label>
          <label>
            Voting
            <textarea
              value={form.voting}
              onChange={e => setForm(f => ({ ...f, voting: e.target.value }))}
              required
            />
          </label>
          <label>
            Amendment Procedure
            <textarea
              value={form.amendmentProcedure}
              onChange={e => setForm(f => ({ ...f, amendmentProcedure: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.quorum && form.voting && form.amendmentProcedure),
    },
    {
      label: 'Step 5',
      content: (
        <>
          <label>
            Indemnification
            <textarea
              value={form.indemnification}
              onChange={e => setForm(f => ({ ...f, indemnification: e.target.value }))}
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
          <label>
            Signatory Title
            <input
              type="text"
              value={form.signTitle}
              onChange={e => setForm(f => ({ ...f, signTitle: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.indemnification && form.signName && form.signTitle),
    },
    {
      label: 'Step 6',
      content: (
        <>
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
      validate: () => Boolean(form.signDate),
    },
  ];

  return <FormWizard steps={steps} onFinish={() => alert('Form submitted!')} />;
};

export default CorporateBylawsForm;
