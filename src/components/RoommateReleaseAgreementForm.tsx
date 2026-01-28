import React, { useState } from 'react';
import { FormWizard } from './FormWizard';

const RoommateReleaseAgreementForm = () => {
  const [form, setForm] = useState({
    country: '',
    state: '',
    effectiveDate: '',
    releasingRoommate: '',
    remainingRoommates: '',
    premisesAddress: '',
    premisesCity: '',
    premisesState: '',
    premisesZip: '',
    leaseDate: '',
    vacateDate: '',
  });

  const steps = [
    {
      label: 'Step 1',
      content: (
        <>
          <label>Country<input type="text" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} required /></label>
          <label>State<input type="text" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} required /></label>
          <label>Effective Date<input type="date" value={form.effectiveDate} onChange={e => setForm(f => ({ ...f, effectiveDate: e.target.value }))} required /></label>
        </>
      ),
      validate: () => Boolean(form.country && form.state && form.effectiveDate),
    },
    {
      label: 'Step 2',
      content: (
        <>
          <label>Releasing Roommate<input type="text" value={form.releasingRoommate} onChange={e => setForm(f => ({ ...f, releasingRoommate: e.target.value }))} required /></label>
          <label>Remaining Roommates<input type="text" value={form.remainingRoommates} onChange={e => setForm(f => ({ ...f, remainingRoommates: e.target.value }))} required /></label>
        </>
      ),
      validate: () => Boolean(form.releasingRoommate && form.remainingRoommates),
    },
    {
      label: 'Step 3',
      content: (
        <>
          <label>Premises Address<input type="text" value={form.premisesAddress} onChange={e => setForm(f => ({ ...f, premisesAddress: e.target.value }))} required /></label>
          <label>Premises City<input type="text" value={form.premisesCity} onChange={e => setForm(f => ({ ...f, premisesCity: e.target.value }))} required /></label>
          <label>Lease Date<input type="date" value={form.leaseDate} onChange={e => setForm(f => ({ ...f, leaseDate: e.target.value }))} required /></label>
        </>
      ),
      validate: () => Boolean(form.premisesAddress && form.premisesCity && form.leaseDate),
    },
    {
      label: 'Step 4',
      content: (
        <>
          <label>Vacate Date<input type="date" value={form.vacateDate} onChange={e => setForm(f => ({ ...f, vacateDate: e.target.value }))} required /></label>
        </>
      ),
      validate: () => Boolean(form.vacateDate),
    },
  ];

  return <FormWizard steps={steps} onFinish={() => alert('Form submitted!')} />;
};

export default RoommateReleaseAgreementForm;
