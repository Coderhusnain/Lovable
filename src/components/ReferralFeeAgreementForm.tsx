import React from 'react';
import { FormWizard } from './FormWizard';
import jsPDF from 'jspdf';

const initialData = {
  referrer: '',
  recipient: '',
  referralCriteria: '',
  feeAmountOrPercentage: '',
  paymentTrigger: '',
};

function generatePDF(data: typeof initialData) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('REFERRAL FEE AGREEMENT', 20, 20);
  doc.setFontSize(12);
  doc.text(`Referrer: ${data.referrer}`, 20, 40);
  doc.text(`Recipient: ${data.recipient}`, 20, 50);
  doc.text(`Referral Criteria: ${data.referralCriteria}`, 20, 60);
  doc.text(`Fee: ${data.feeAmountOrPercentage}`, 20, 70);
  doc.text(`Payment Trigger: ${data.paymentTrigger}`, 20, 80);
  doc.save('ReferralFeeAgreement.pdf');
}


const ReferralFeeAgreementForm = () => {
  const [form, setForm] = React.useState(initialData);

  const steps = [
    {
      label: 'Parties',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Referrer"
            value={form.referrer}
            onChange={e => setForm(f => ({ ...f, referrer: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Recipient"
            value={form.recipient}
            onChange={e => setForm(f => ({ ...f, recipient: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Referral Criteria"
            value={form.referralCriteria}
            onChange={e => setForm(f => ({ ...f, referralCriteria: e.target.value }))}
          />
        </div>
      ),
    },
    {
      label: 'Fee & Payment',
      content: (
        <div className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Fee Amount/Percentage"
            value={form.feeAmountOrPercentage}
            onChange={e => setForm(f => ({ ...f, feeAmountOrPercentage: e.target.value }))}
          />
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Payment Trigger"
            value={form.paymentTrigger}
            onChange={e => setForm(f => ({ ...f, paymentTrigger: e.target.value }))}
          />
        </div>
      ),
    },
  ];

  return (
    <FormWizard
      steps={steps}
      onFinish={() => generatePDF(form)}
    />
  );
};


export default ReferralFeeAgreementForm;
