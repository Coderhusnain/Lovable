import React from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  {
    label: "Copyright Info",
    content: <>
      <Input name="copyrightHolder" placeholder="Copyright Holder" />
      <Input name="requester" placeholder="Requester Name" />
      <Input name="workTitle" placeholder="Work Title" />
    </>,
  },
  {
    label: "Details",
    content: <>
      <Textarea name="workDescription" placeholder="Work Description" />
      <Textarea name="permissionScope" placeholder="Permission Scope" />
    </>,
  },
  {
    label: "Signatures",
    content: <>
      <Input name="signHolder" placeholder="Holder Signature" />
      <Input name="signRequester" placeholder="Requester Signature" />
    </>,
  },
];

const CopyrightPermissionForm = () => (
  <FormWizard steps={steps} onFinish={() => alert("Form submitted!")} />
);

export default CopyrightPermissionForm;
