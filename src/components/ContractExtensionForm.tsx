import React from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  {
    label: "Contract Details",
    content: <>
      <Input name="contractName" placeholder="Contract Name" />
      <Input name="originalEndDate" placeholder="Original End Date" type="date" />
      <Input name="extensionPeriod" placeholder="Extension Period" />
    </>,
  },
  {
    label: "Extension Terms",
    content: <>
      <Textarea name="extensionTerms" placeholder="Extension Terms" />
      <Textarea name="additionalNotes" placeholder="Additional Notes" />
      <Input name="newEndDate" placeholder="New End Date" type="date" />
    </>,
  },
  {
    label: "Signatures",
    content: <>
      <Input name="partyOneSignature" placeholder="Party One Signature" />
      <Input name="partyOneSignDate" placeholder="Party One Signature Date" type="date" />
      <Input name="partyTwoSignature" placeholder="Party Two Signature" />
      <Input name="partyTwoSignDate" placeholder="Party Two Signature Date" type="date" />
    </>,
  },
];

export default function ContractExtensionForm() {
  return <FormWizard steps={steps} onFinish={() => alert("Form submitted!")} />;
}
