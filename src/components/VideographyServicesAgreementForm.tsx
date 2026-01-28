

import { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FormData {
  country: string;
  state: string;
  effectiveDate: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  videographerName: string;
  videographerCompany: string;
  videographerAddress: string;
  videographerPhone: string;
  videographerEmail: string;
  eventDate: string;
  eventLocation: string;
  eventType: string;
  eventDescription: string;
  startTime: string;
  endTime: string;
  deliverables: string[];
  footageDeliveryFormat: string;
  editedVideoLength: string;
  deliveryDeadline: string;
  totalFee: string;
  depositAmount: string;
  depositDueDate: string;
  travelFees: string;
  additionalServices: string;
  rawFootageIncluded: boolean;
  highlightReel: boolean;
  additionalNotes: string;
}

const deliverableOptions = [
  "Raw Footage",
  "Edited Video",
  "Highlight Reel",
  "Social Media Clips",
  "Drone Footage"
];

const VideographyServicesAgreementForm = () => {
  const [formData, setFormData] = useState<FormData>({
    country: '', state: '', effectiveDate: '', clientName: '', clientAddress: '', clientPhone: '', clientEmail: '',
    videographerName: '', videographerCompany: '', videographerAddress: '', videographerPhone: '', videographerEmail: '',
    eventDate: '', eventLocation: '', eventType: '', eventDescription: '', startTime: '', endTime: '', deliverables: [],
    footageDeliveryFormat: '', editedVideoLength: '', deliveryDeadline: '', totalFee: '', depositAmount: '', depositDueDate: '',
    travelFees: '', additionalServices: '', rawFootageIncluded: false, highlightReel: false, additionalNotes: ''
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      label: "Client & Videographer Info",
      content: <>
        <Label>Country</Label>
        <Input value={formData.country} onChange={e => handleInputChange('country', e.target.value)} />
        <Label>State</Label>
        <Input value={formData.state} onChange={e => handleInputChange('state', e.target.value)} />
        <Label>Effective Date</Label>
        <Input type="date" value={formData.effectiveDate} onChange={e => handleInputChange('effectiveDate', e.target.value)} />
        <Label>Client Name</Label>
        <Input value={formData.clientName} onChange={e => handleInputChange('clientName', e.target.value)} />
        <Label>Client Address</Label>
        <Input value={formData.clientAddress} onChange={e => handleInputChange('clientAddress', e.target.value)} />
        <Label>Client Phone</Label>
        <Input value={formData.clientPhone} onChange={e => handleInputChange('clientPhone', e.target.value)} />
        <Label>Client Email</Label>
        <Input value={formData.clientEmail} onChange={e => handleInputChange('clientEmail', e.target.value)} />
        <Label>Videographer Name</Label>
        <Input value={formData.videographerName} onChange={e => handleInputChange('videographerName', e.target.value)} />
        <Label>Videographer Company</Label>
        <Input value={formData.videographerCompany} onChange={e => handleInputChange('videographerCompany', e.target.value)} />
        <Label>Videographer Address</Label>
        <Input value={formData.videographerAddress} onChange={e => handleInputChange('videographerAddress', e.target.value)} />
        <Label>Videographer Phone</Label>
        <Input value={formData.videographerPhone} onChange={e => handleInputChange('videographerPhone', e.target.value)} />
        <Label>Videographer Email</Label>
        <Input value={formData.videographerEmail} onChange={e => handleInputChange('videographerEmail', e.target.value)} />
      </>
    },
    {
      label: "Event Details",
      content: <>
        <Label>Event Date</Label>
        <Input type="date" value={formData.eventDate} onChange={e => handleInputChange('eventDate', e.target.value)} />
        <Label>Event Location</Label>
        <Input value={formData.eventLocation} onChange={e => handleInputChange('eventLocation', e.target.value)} />
        <Label>Event Type</Label>
        <Input value={formData.eventType} onChange={e => handleInputChange('eventType', e.target.value)} />
        <Label>Event Description</Label>
        <Textarea value={formData.eventDescription} onChange={e => handleInputChange('eventDescription', e.target.value)} />
        <Label>Start Time</Label>
        <Input type="time" value={formData.startTime} onChange={e => handleInputChange('startTime', e.target.value)} />
        <Label>End Time</Label>
        <Input type="time" value={formData.endTime} onChange={e => handleInputChange('endTime', e.target.value)} />
      </>
    },
    {
      label: "Deliverables & Payment",
      content: <>
        <Label>Deliverables</Label>
        {deliverableOptions.map(opt => (
          <div key={opt}>
            <Checkbox checked={formData.deliverables.includes(opt)} onCheckedChange={checked => {
              if (checked) handleInputChange('deliverables', [...formData.deliverables, opt]);
              else handleInputChange('deliverables', formData.deliverables.filter((d: string) => d !== opt));
            }} /> {opt}
          </div>
        ))}
        <Label>Footage Delivery Format</Label>
        <Input value={formData.footageDeliveryFormat} onChange={e => handleInputChange('footageDeliveryFormat', e.target.value)} />
        <Label>Edited Video Length</Label>
        <Input value={formData.editedVideoLength} onChange={e => handleInputChange('editedVideoLength', e.target.value)} />
        <Label>Delivery Deadline</Label>
        <Input type="date" value={formData.deliveryDeadline} onChange={e => handleInputChange('deliveryDeadline', e.target.value)} />
        <Label>Total Fee</Label>
        <Input value={formData.totalFee} onChange={e => handleInputChange('totalFee', e.target.value)} />
        <Label>Deposit Amount</Label>
        <Input value={formData.depositAmount} onChange={e => handleInputChange('depositAmount', e.target.value)} />
        <Label>Deposit Due Date</Label>
        <Input type="date" value={formData.depositDueDate} onChange={e => handleInputChange('depositDueDate', e.target.value)} />
        <Label>Travel Fees</Label>
        <Input value={formData.travelFees} onChange={e => handleInputChange('travelFees', e.target.value)} />
        <Label>Additional Services</Label>
        <Textarea value={formData.additionalServices} onChange={e => handleInputChange('additionalServices', e.target.value)} />
        <Label>Raw Footage Included</Label>
        <Checkbox checked={formData.rawFootageIncluded} onCheckedChange={checked => handleInputChange('rawFootageIncluded', !!checked)} />
        <Label>Highlight Reel</Label>
        <Checkbox checked={formData.highlightReel} onCheckedChange={checked => handleInputChange('highlightReel', !!checked)} />
        <Label>Additional Notes</Label>
        <Textarea value={formData.additionalNotes} onChange={e => handleInputChange('additionalNotes', e.target.value)} />
      </>
    }
  ];

  return <FormWizard steps={steps} onFinish={() => alert("Form submitted!")} />;
};

export default VideographyServicesAgreementForm;

// (Corrupted code removed below. File ends here.)

 