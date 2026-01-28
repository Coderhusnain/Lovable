import React, { useState } from 'react';
import { FormWizard } from './FormWizard';

const CoursePartnershipAgreementForm: React.FC = () => {
  const [form, setForm] = useState({
    effectiveDate: '',
    instructorName: '',
    expertName: '',
    platformName: '',
    platformTermsUrl: '',
    purposeNote: '',
    servicesDescription: '',
    completionDates: '',
    // ... add all other fields as needed
  });

  const steps = [
    {
      label: 'Step 1',
      content: (
        <>
          <label>Effective Date<input type="date" value={form.effectiveDate} onChange={e => setForm(f => ({ ...f, effectiveDate: e.target.value }))} required /></label>
          <label>Instructor Name<input type="text" value={form.instructorName} onChange={e => setForm(f => ({ ...f, instructorName: e.target.value }))} required /></label>
          <label>Expert Name<input type="text" value={form.expertName} onChange={e => setForm(f => ({ ...f, expertName: e.target.value }))} required /></label>
        </>
      ),
      validate: () => Boolean(form.effectiveDate && form.instructorName && form.expertName),
    },
    // ... (continue splitting fields into steps, max 3 per step)
  ];

  return <FormWizard steps={steps} onFinish={() => alert('Form submitted!')} />;
}

export default CoursePartnershipAgreementForm;
