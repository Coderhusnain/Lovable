import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { FormWizard } from './FormWizard';

const CopyrightRequestForm = () => {
  const [form, setForm] = useState({
    requester: '',
    copyrightHolder: '',
    workTitle: '',
    workDescription: '',
    requestedUse: '',
    duration: '',
    territory: '',
    payment: '',
    restrictions: '',
    governingLaw: '',
    signRequester: '',
    signRequesterDate: '',
    signHolder: '',
    signHolderDate: '',
  });

  const steps = [
    {
      label: 'Step 1',
      content: (
        <>
          <Label htmlFor="requester">Requester Name</Label>
          <Input 
            id="requester"
            value={form.requester}
            onChange={(e) => setForm(f => ({ ...f, requester: e.target.value }))}
            required
          />
          
          <Label htmlFor="copyrightHolder">Copyright Holder</Label>
          <Input 
            id="copyrightHolder"
            value={form.copyrightHolder}
            onChange={(e) => setForm(f => ({ ...f, copyrightHolder: e.target.value }))}
            required
          />
          
          <Label htmlFor="workTitle">Work Title</Label>
          <Input 
            id="workTitle"
            value={form.workTitle}
            onChange={(e) => setForm(f => ({ ...f, workTitle: e.target.value }))}
            required
          />
        </>
      ),
      validate: () => Boolean(form.requester && form.copyrightHolder && form.workTitle),
    },
    {
      label: 'Step 2',
      content: (
        <>
          <Label htmlFor="workDescription">Work Description</Label>
          <textarea
            id="workDescription"
            value={form.workDescription}
            onChange={(e) => setForm(f => ({ ...f, workDescription: e.target.value }))}
            required
            className="w-full mt-1 p-2 border rounded-md"
            rows={4}
          />
          
          <Label htmlFor="requestedUse">Requested Use</Label>
          <textarea
            id="requestedUse"
            value={form.requestedUse}
            onChange={(e) => setForm(f => ({ ...f, requestedUse: e.target.value }))}
            required
            className="w-full mt-1 p-2 border rounded-md"
            rows={4}
          />
          
          <Label htmlFor="duration">Duration</Label>
          <Input 
            id="duration"
            value={form.duration}
            onChange={(e) => setForm(f => ({ ...f, duration: e.target.value }))}
            required
          />
        </>
      ),
      validate: () => Boolean(form.workDescription && form.requestedUse && form.duration),
    },
    {
      label: 'Step 3',
      content: (
        <>
          <Label htmlFor="territory">Territory</Label>
          <Input 
            id="territory"
            value={form.territory}
            onChange={(e) => setForm(f => ({ ...f, territory: e.target.value }))}
            required
          />
          
          <Label htmlFor="payment">Payment</Label>
          <textarea
            id="payment"
            value={form.payment}
            onChange={(e) => setForm(f => ({ ...f, payment: e.target.value }))}
            required
            className="w-full mt-1 p-2 border rounded-md"
            rows={4}
          />
          
          <Label htmlFor="restrictions">Restrictions</Label>
          <textarea
            id="restrictions"
            value={form.restrictions}
            onChange={(e) => setForm(f => ({ ...f, restrictions: e.target.value }))}
            required
            className="w-full mt-1 p-2 border rounded-md"
            rows={4}
          />
        </>
      ),
      validate: () => Boolean(form.territory && form.payment && form.restrictions),
    },
    {
      label: 'Step 4',
      content: (
        <>
          <Label htmlFor="governingLaw">Governing Law</Label>
          <Input 
            id="governingLaw"
            value={form.governingLaw}
            onChange={(e) => setForm(f => ({ ...f, governingLaw: e.target.value }))}
            required
          />
          
          <Label htmlFor="signRequester">Requester Signature</Label>
          <Input 
            id="signRequester"
            value={form.signRequester}
            onChange={(e) => setForm(f => ({ ...f, signRequester: e.target.value }))}
            required
          />
          
          <Label htmlFor="signRequesterDate">Requester Date</Label>
          <Input 
            id="signRequesterDate"
            type="date"
            value={form.signRequesterDate}
            onChange={(e) => setForm(f => ({ ...f, signRequesterDate: e.target.value }))}
            required
          />
        </>
      ),
      validate: () => Boolean(form.governingLaw && form.signRequester && form.signRequesterDate),
    },
    {
      label: 'Step 5',
      content: (
        <>
          <Label htmlFor="signHolder">Holder Signature</Label>
          <Input 
            id="signHolder"
            value={form.signHolder}
            onChange={(e) => setForm(f => ({ ...f, signHolder: e.target.value }))}
            required
          />
          
          <Label htmlFor="signHolderDate">Holder Date</Label>
          <Input 
            id="signHolderDate"
            type="date"
            value={form.signHolderDate}
            onChange={(e) => setForm(f => ({ ...f, signHolderDate: e.target.value }))}
            required
          />
        </>
      ),
      validate: () => Boolean(form.signHolder && form.signHolderDate),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Copyright Request Form</CardTitle>
      </CardHeader>
      <CardContent>
        <FormWizard 
          steps={steps} 
          onFinish={() => toast.success('Form submitted successfully!')} 
        />
      </CardContent>
    </Card>
  );
};

export default CopyrightRequestForm;