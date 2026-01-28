import { useState } from "react";
import { FormWizard } from "./FormWizard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Send, CheckCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { toast } from "sonner";
import CountryStateAPI from 'countries-states-cities';
import UserInfoStep from "@/components/UserInfoStep";
import { generateGuidePDF } from "@/utils/generateGuidePDF";

interface CountryData { id: number; name: string; iso3: string; iso2: string; phone_code: string; capital: string; currency: string; native: string; region: string; subregion: string; emoji: string; }
interface StateData { id: number; name: string; country_id: number; country_code: string; state_code: string; }

const getAllCountries = (): CountryData[] => CountryStateAPI.getAllCountries();
const getStatesByCountry = (countryId: number): StateData[] => CountryStateAPI.getStatesOfCountry(countryId);
const getStateName = (countryId: string, stateId: string): string => { const c = getAllCountries().find(c => c.id.toString() === countryId); if (!c) return stateId; const s = getStatesByCountry(c.id).find(s => s.id.toString() === stateId); return s?.name || stateId; };

interface FormData {
  country: string; state: string; effectiveDate: string;
  clientName1: string; clientName2: string; clientAddress: string; clientPhone: string; clientEmail: string;
}

// Refactor in progress: FormWizard integration will be added next

const fields = [
  // Step 1: Location
  {
    name: "country",
    label: "Country",
    type: "select",
    options: getAllCountries().map((c) => ({ value: `${c.id}:${c.name}`, label: c.name })),
    required: true,
  },
  {
    name: "state",
    label: "State/Province",
    type: "select",
    options: [], // Will be dynamically set in FormWizard based on country
    required: true,
    dependsOn: "country",
  },
  {
    name: "effectiveDate",
    label: "Agreement Date",
    type: "date",
    required: true,
  },
  // Step 2: Parties
  { name: "clientName1", label: "Partner 1 Name", type: "text", required: true },
  { name: "clientName2", label: "Partner 2 Name", type: "text" },
  { name: "clientAddress", label: "Client Address", type: "textarea", required: true },
  { name: "clientPhone", label: "Client Phone", type: "text" },
  { name: "clientEmail", label: "Client Email", type: "email" },
  { name: "plannerName", label: "Planner Name", type: "text", required: true },
  { name: "plannerCompany", label: "Planner Company", type: "text" },
  { name: "plannerAddress", label: "Planner Address", type: "textarea" },
  { name: "plannerPhone", label: "Planner Phone", type: "text" },
  { name: "plannerEmail", label: "Planner Email", type: "email" },
  // Step 3: Wedding Details
  { name: "weddingDate", label: "Wedding Date", type: "date", required: true },
  { name: "ceremonyLocation", label: "Ceremony Location", type: "textarea" },
  { name: "receptionLocation", label: "Reception Location", type: "textarea" },
  { name: "estimatedGuests", label: "Estimated Number of Guests", type: "number" },
  // Step 4: Services & Payment
  {
    name: "packageType",
    label: "Package Type",
    type: "select",
    options: [
      { value: "Full Planning", label: "Full Planning" },
      { value: "Partial Planning", label: "Partial Planning" },
      { value: "Day-Of Coordination", label: "Day-Of Coordination" },
      { value: "Custom", label: "Custom Package" },
    ],
  },
  {
    name: "servicesIncluded",
    label: "Services Included",
    type: "checkbox-group",
    options: [
      "Venue selection and booking",
      "Vendor coordination (caterer, florist, photographer, etc.)",
      "Budget planning and management",
      "Timeline and schedule creation",
      "Guest list management",
      "Invitation design coordination",
      "Ceremony coordination",
      "Reception coordination",
      "Rehearsal coordination",
      "Day-of coordination",
      "Transportation arrangements",
      "Accommodation arrangements",
    ].map((s) => ({ value: s, label: s })),
    required: true,
  },
  { name: "totalFee", label: "Total Fee ($)", type: "number", required: true },
  { name: "depositAmount", label: "Deposit Amount ($)", type: "number", required: true },
  { name: "depositDueDate", label: "Deposit Due Date", type: "date" },
  { name: "paymentSchedule", label: "Payment Schedule", type: "text" },
  { name: "additionalNotes", label: "Additional Notes", type: "textarea" },
  { name: "cancellationDays", label: "Cancellation Days", type: "number", default: 30 },
];

const initialValues = {
  country: "",
  state: "",
  effectiveDate: "",
  clientName1: "",
  clientName2: "",
  clientAddress: "",
  clientPhone: "",
  clientEmail: "",
  plannerName: "",
  plannerCompany: "",
  plannerAddress: "",
  plannerPhone: "",
  plannerEmail: "",
  weddingDate: "",
  ceremonyLocation: "",
  receptionLocation: "",
  estimatedGuests: "",
  packageType: "Full Planning",
  servicesIncluded: [],
  totalFee: "",
  depositAmount: "",
  depositDueDate: "",
  paymentSchedule: "",
  additionalNotes: "",
  cancellationDays: 30,
};

import React from "react";

const WeddingPlannerAgreementForm = () => {
  // State for all form values
  const [values, setValues] = useState(initialValues);

  // Step definitions (max 3 fields per step)
  const steps = [
    {
      label: "Location",
      content: (
        <>
          {/* Country */}
          <Label>Country</Label>
          <select
            value={values.country}
            onChange={e => {
              setValues(v => ({ ...v, country: e.target.value, state: "" }));
            }}
            className="block w-full mb-4 border rounded p-2"
          >
            <option value="">Select...</option>
            {getAllCountries().map(c => (
              <option key={c.id} value={`${c.id}:${c.name}`}>{c.name}</option>
            ))}
          </select>
          {/* State/Province */}
          <Label>State/Province</Label>
          <select
            value={values.state}
            onChange={e => setValues(v => ({ ...v, state: e.target.value }))}
            disabled={!values.country}
            className="block w-full mb-4 border rounded p-2"
          >
            <option value="">Select...</option>
            {values.country && getStatesByCountry(parseInt(values.country.split(":")[0])).map(s => (
              <option key={s.id} value={`${s.id}:${s.name}`}>{s.name}</option>
            ))}
          </select>
          {/* Agreement Date */}
          <Label>Agreement Date</Label>
          <Input type="date" value={values.effectiveDate} onChange={e => setValues(v => ({ ...v, effectiveDate: e.target.value }))} />
        </>
      ),
      validate: () => !!(values.country && values.state && values.effectiveDate),
    },
    {
      label: "Parties",
      content: (
        <>
          <Label>Partner 1 Name *</Label>
          <Input value={values.clientName1} onChange={e => setValues(v => ({ ...v, clientName1: e.target.value }))} />
          <Label>Partner 2 Name</Label>
          <Input value={values.clientName2} onChange={e => setValues(v => ({ ...v, clientName2: e.target.value }))} />
          <Label>Client Address *</Label>
          <Textarea value={values.clientAddress} onChange={e => setValues(v => ({ ...v, clientAddress: e.target.value }))} />
        </>
      ),
      validate: () => !!values.clientName1 && !!values.clientAddress,
    },
    {
      label: "Contact Info",
      content: (
        <>
          <Label>Client Phone</Label>
          <Input value={values.clientPhone} onChange={e => setValues(v => ({ ...v, clientPhone: e.target.value }))} />
          <Label>Client Email</Label>
          <Input type="email" value={values.clientEmail} onChange={e => setValues(v => ({ ...v, clientEmail: e.target.value }))} />
          <Label>Planner Name *</Label>
          <Input value={values.plannerName} onChange={e => setValues(v => ({ ...v, plannerName: e.target.value }))} />
        </>
      ),
      validate: () => !!values.plannerName,
    },
    {
      label: "Planner Details",
      content: (
        <>
          <Label>Planner Company</Label>
          <Input value={values.plannerCompany} onChange={e => setValues(v => ({ ...v, plannerCompany: e.target.value }))} />
          <Label>Planner Address</Label>
          <Textarea value={values.plannerAddress} onChange={e => setValues(v => ({ ...v, plannerAddress: e.target.value }))} />
          <Label>Planner Phone</Label>
          <Input value={values.plannerPhone} onChange={e => setValues(v => ({ ...v, plannerPhone: e.target.value }))} />
          <Label>Planner Email</Label>
          <Input type="email" value={values.plannerEmail} onChange={e => setValues(v => ({ ...v, plannerEmail: e.target.value }))} />
        </>
      ),
    },
    {
      label: "Wedding Details",
      content: (
        <>
          <Label>Wedding Date *</Label>
          <Input type="date" value={values.weddingDate} onChange={e => setValues(v => ({ ...v, weddingDate: e.target.value }))} />
          <Label>Ceremony Location</Label>
          <Textarea value={values.ceremonyLocation} onChange={e => setValues(v => ({ ...v, ceremonyLocation: e.target.value }))} />
          <Label>Reception Location</Label>
          <Textarea value={values.receptionLocation} onChange={e => setValues(v => ({ ...v, receptionLocation: e.target.value }))} />
          <Label>Estimated Number of Guests</Label>
          <Input type="number" value={values.estimatedGuests} onChange={e => setValues(v => ({ ...v, estimatedGuests: e.target.value }))} />
        </>
      ),
      validate: () => !!values.weddingDate,
    },
    {
      label: "Services & Payment",
      content: (
        <>
          <Label>Package Type</Label>
          <select
            value={values.packageType}
            onChange={e => setValues(v => ({ ...v, packageType: e.target.value }))}
            className="block w-full mb-4 border rounded p-2"
          >
            <option value="Full Planning">Full Planning</option>
            <option value="Partial Planning">Partial Planning</option>
            <option value="Day-Of Coordination">Day-Of Coordination</option>
            <option value="Custom">Custom Package</option>
          </select>
          <Label>Services Included *</Label>
          <div className="mb-2">
            {[
              "Venue selection and booking",
              "Vendor coordination (caterer, florist, photographer, etc.)",
              "Budget planning and management",
              "Timeline and schedule creation",
              "Guest list management",
              "Invitation design coordination",
              "Ceremony coordination",
              "Reception coordination",
              "Rehearsal coordination",
              "Day-of coordination",
              "Transportation arrangements",
              "Accommodation arrangements",
            ].map((s) => (
              <div key={s} className="flex items-center space-x-2">
                <Checkbox
                  id={s}
                  checked={values.servicesIncluded.includes(s)}
                  onCheckedChange={() => {
                    setValues(v => ({
                      ...v,
                      servicesIncluded: v.servicesIncluded.includes(s)
                        ? v.servicesIncluded.filter(x => x !== s)
                        : [...v.servicesIncluded, s],
                    }));
                  }}
                />
                <Label htmlFor={s} className="text-sm cursor-pointer">{s}</Label>
              </div>
            ))}
          </div>
          <Label>Total Fee ($) *</Label>
          <Input type="number" value={values.totalFee} onChange={e => setValues(v => ({ ...v, totalFee: e.target.value }))} />
          <Label>Deposit Amount ($) *</Label>
          <Input type="number" value={values.depositAmount} onChange={e => setValues(v => ({ ...v, depositAmount: e.target.value }))} />
          <Label>Deposit Due Date</Label>
          <Input type="date" value={values.depositDueDate} onChange={e => setValues(v => ({ ...v, depositDueDate: e.target.value }))} />
          <Label>Payment Schedule</Label>
          <Input value={values.paymentSchedule} onChange={e => setValues(v => ({ ...v, paymentSchedule: e.target.value }))} />
          <Label>Additional Notes</Label>
          <Textarea value={values.additionalNotes} onChange={e => setValues(v => ({ ...v, additionalNotes: e.target.value }))} />
          <Label>Cancellation Days</Label>
          <Input type="number" value={values.cancellationDays} onChange={e => setValues(v => ({ ...v, cancellationDays: Number(e.target.value) }))} />
        </>
      ),
      validate: () => !!values.totalFee && !!values.depositAmount && values.servicesIncluded.length > 0,
    },
  ];

  return <FormWizard steps={steps} onFinish={() => {/* TODO: PDF generation */}} />;
};

export default WeddingPlannerAgreementForm;
