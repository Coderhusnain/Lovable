import React, { useState } from 'react';
import { FormWizard } from './FormWizard';

const AffidavitOfMarriageForm = () => {
  const [form, setForm] = useState({
    affiantName: '',
    spouseName: '',
    marriageDate: '',
    location: '',
    witnessName: '',
    statement: '',
  });

  const steps = [
    {
      label: 'Step 1',
      content: (
        <>
          <label>
            Affiant Name
            <input
              type="text"
              value={form.affiantName}
              onChange={e => setForm(f => ({ ...f, affiantName: e.target.value }))}
              required
            />
          </label>
          <label>
            Spouse Name
            <input
              type="text"
              value={form.spouseName}
              onChange={e => setForm(f => ({ ...f, spouseName: e.target.value }))}
              required
            />
          </label>
          <label>
            Marriage Date
            <input
              type="date"
              value={form.marriageDate}
              onChange={e => setForm(f => ({ ...f, marriageDate: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.affiantName && form.spouseName && form.marriageDate),
    },
    {
      label: 'Step 2',
      content: (
        <>
          <label>
            Location
            <input
              type="text"
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              required
            />
          </label>
          <label>
            Witness Name
            <input
              type="text"
              value={form.witnessName}
              onChange={e => setForm(f => ({ ...f, witnessName: e.target.value }))}
            />
          </label>
          <label>
            Statement
            <textarea
              value={form.statement}
              onChange={e => setForm(f => ({ ...f, statement: e.target.value }))}
              required
            />
          </label>
        </>
      ),
      validate: () => Boolean(form.location && form.statement),
    },
  ];

  return <FormWizard steps={steps} onFinish={() => alert('Form submitted!')} />;
};

export default AffidavitOfMarriageForm;



