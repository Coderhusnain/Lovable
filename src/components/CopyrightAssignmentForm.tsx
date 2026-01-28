import React from "react";
import { FormWizard } from "./FormWizard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  {
    label: "Copyright Details",
    content: <>
      <Input name="workTitle" placeholder="Work Title" />
      <Input name="authorName" placeholder="Author Name" />
      <Input name="assignmentDate" placeholder="Assignment Date" type="date" />
    </>,
  },
  {
    label: "Assignee & Terms",
    content: <>
      <Input name="assigneeName" placeholder="Assignee Name" />
      <Textarea name="assignmentTerms" placeholder="Assignment Terms" />
      <Textarea name="additionalNotes" placeholder="Additional Notes" />
    </>,
  },
  {
    label: "Signatures",
    content: <>
      <Input name="authorSignature" placeholder="Author Signature" />
      <Input name="authorSignDate" placeholder="Author Signature Date" type="date" />
      <Input name="assigneeSignature" placeholder="Assignee Signature" />
      <Input name="assigneeSignDate" placeholder="Assignee Signature Date" type="date" />
    </>,
  },
];

export default function CopyrightAssignmentForm() {
  return <FormWizard steps={steps} onFinish={() => alert("Form submitted!")} />;
}
