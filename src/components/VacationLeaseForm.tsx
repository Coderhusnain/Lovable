import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface FormData {
  landlordName: string;
  tenantName: string;
  premisesAddress: string;
  premisesCity: string;
  premisesState: string;
  premisesZip: string;

  leaseStartDate: string;
  leaseStartTime: string;
  leaseEndDate: string;
  leaseEndTime: string;

  totalRent: string;
  nonRefundableDeposit: string;
  depositPaidByDate: string;
  remainingBalance: string;
  remainingDueDate: string;
  paymentAddress: string;
  paymentCity: string;
  paymentState: string;
  paymentZip: string;

  securityDeposit: string;
  minimumStayNights: string;
  maxOccupancy: string;
  guestAgeLimit: string;
  furnishingsProvided: string;

  cancellationDaysBefore: string;
  cancellationFee: string;
  cancellationShortDays: string;
  cancellationShortFee: string;
  noCancellationWithinDays: string;

  smokingAllowed: string; // e.g., "No indoor smoking"
  cleaningIncluded: string; // e.g., "Linen laundry included"
  holdoverRate: string;

  governingLaw: string;

  inspectionBathrooms: string;
  inspectionCarpeting: string;
  inspectionCeilings: string;
  inspectionClosets: string;
  inspectionDishwasher: string;
  inspectionDisposal: string;
  inspectionDoors: string;
  inspectionFireplace: string;
  inspectionLights: string;
  inspectionLocks: string;
  inspectionRefrigerator: string;
  inspectionScreens: string;
  inspectionStove: string;

  landlordSignatureName: string;
  landlordSignatureDate: string;
  tenantSignatureName: string;
  tenantSignatureDate: string;
}

export default function VacationLeaseForm() {
  const [formData, setFormData] = useState<FormData>({
    landlordName: "",
    tenantName: "",
    premisesAddress: "",
    premisesCity: "",
    premisesState: "",
    premisesZip: "",

    leaseStartDate: "",
    leaseStartTime: "",
    leaseEndDate: "",
    leaseEndTime: "",

    totalRent: "",
    nonRefundableDeposit: "",
    depositPaidByDate: "",
    remainingBalance: "",
    remainingDueDate: "",
    paymentAddress: "",
    paymentCity: "",
    paymentState: "",
    paymentZip: "",

    securityDeposit: "",
    minimumStayNights: "",
    maxOccupancy: "",
    guestAgeLimit: "",
    furnishingsProvided: "",

    cancellationDaysBefore: "",
    cancellationFee: "",
    cancellationShortDays: "",
    cancellationShortFee: "",
    noCancellationWithinDays: "",

    smokingAllowed: "Smoking is strictly prohibited indoors.",
    cleaningIncluded: "Linen laundry included",
    holdoverRate: "",

    governingLaw: "",

    inspectionBathrooms: "",
    inspectionCarpeting: "",
    inspectionCeilings: "",
    inspectionClosets: "",
    inspectionDishwasher: "",
    inspectionDisposal: "",
    inspectionDoors: "",
    inspectionFireplace: "",
    inspectionLights: "",
    inspectionLocks: "",
    inspectionRefrigerator: "",
    inspectionScreens: "",
    inspectionStove: "",

    landlordSignatureName: "",
    landlordSignatureDate: "",
    tenantSignatureName: "",
    tenantSignatureDate: "",
  });

  const [step, setStep] = useState<number>(1);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const writeText = (doc: jsPDF, text: string, yRef: { y: number }, opts?: { size?: number; bold?: boolean; center?: boolean }) => {
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 40;
    const maxW = pageW - margin * 2;
    const size = opts?.size ?? 11;
    doc.setFont("times", opts?.bold ? "bold" as any : "normal" as any);
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, maxW);
    lines.forEach((line) => {
      if (yRef.y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        yRef.y = margin;
      }
      if (opts?.center) {
        const tw = (doc.getStringUnitWidth(line) * size) / doc.internal.scaleFactor;
        const tx = (pageW - tw) / 2;
        doc.text(line, tx, yRef.y);
      } else {
        doc.text(line, margin, yRef.y);
      }
      yRef.y += size * 1.3;
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const yRef = { y: 40 };

    writeText(doc, "VACATION LEASE AGREEMENT", yRef, { size: 14, bold: true, center: true });
    writeText(doc, "\n", yRef);

    // Header (Landlord / Tenant)
    writeText(
      doc,
      `This Vacation Lease Agreement ("Lease") is made and entered into on ________________ by and between ${formData.landlordName ||
        "_______________________"} ("Landlord") and ${formData.tenantName || "_______________________"} ("Tenant"). The parties agree as follows:`,
      yRef
    );

    writeText(doc, "\n1. Premises", yRef, { size: 12, bold: true });
    writeText(
      doc,
      `The Landlord, in consideration of the lease payments set forth herein, leases to the Tenant the premises located at:\nAddress: ${formData.premisesAddress ||
        "_________________________________"}\n\nCity: ${formData.premisesCity || "___________________"} State: ${formData.premisesState ||
        "____________"} ZIP: ${formData.premisesZip || "________"}`,
      yRef
    );

    writeText(doc, "\n2. Term", yRef, { size: 12, bold: true });
    writeText(
      doc,
      `Tenant shall have exclusive use and control of the Premises from ${formData.leaseStartTime || "_________"} on ${formData.leaseStartDate ||
        "______________"} through ${formData.leaseEndTime || "_________"} on ${formData.leaseEndDate || "______________"}.`,
      yRef
    );

    writeText(doc, "\n3. Lease Payments", yRef, { size: 12, bold: true });
    writeText(
      doc,
      `The total rent due for the Lease term is $${formData.totalRent || "________"}, payable in advance. A non-refundable deposit of $${formData.nonRefundableDeposit ||
        "________"} shall be paid by ${formData.depositPaidByDate || "______________"} to secure the reservation. This deposit will be applied to the total rental amount.\nThe remaining balance of $${formData.remainingBalance ||
        "_________"} is due no later than ${formData.remainingDueDate || "______________"}.\nPayments shall be made to the Landlord at:\nAddress: ${formData.paymentAddress || "_________________________________"}\nCity: ${formData.paymentCity || "___________________"} State: ${formData.paymentState ||
        "__________"} ZIP: ${formData.paymentZip || "________"}\n(Note: This address may be updated by written notice from the Landlord.)`,
      yRef
    );

    writeText(doc, "\n4. Security Deposit", yRef, { size: 12, bold: true });
    writeText(
      doc,
      `At the time of signing, Tenant shall pay a security deposit of $${formData.securityDeposit || "_________"}, held in trust by the Landlord, to cover any damages or defaults under this agreement, as allowed by law.`,
      yRef
    );

    writeText(doc, "\n5. Possession", yRef, { size: 12, bold: true });
    writeText(
      doc,
      "Tenant shall take possession on the Lease start date and shall vacate the Premises on the end date, unless otherwise agreed in writing. Tenant shall return the Premises in a clean and undamaged condition, normal wear and tear excepted.",
      yRef
    );

    writeText(doc, "\n6. Minimum Stay", yRef, { size: 12, bold: true });
    writeText(doc, `A minimum stay of ${formData.minimumStayNights || "_______"} night(s) is required. Longer minimums may apply during holidays.`, yRef);

    writeText(doc, "\n7. Use of Premises & Absences", yRef, { size: 12, bold: true });
    writeText(doc, "Tenant agrees to use the Premises solely as a residential dwelling and to notify the Landlord of any extended absence. Tenant shall maintain the Premises in clean and good condition.", yRef);

    writeText(doc, "\n8. Occupancy", yRef, { size: 12, bold: true });
    writeText(
      doc,
      `Maximum occupancy is limited to ${formData.maxOccupancy || "_______"} persons. All guests over the age of ${formData.guestAgeLimit || "_______"} count toward occupancy limits. Misrepresentation or exceeding occupancy may result in immediate eviction without refund.`,
      yRef
    );

    writeText(doc, "\n9. Furnishings", yRef, { size: 12, bold: true });
    writeText(doc, `The following furnishings are provided: ${formData.furnishingsProvided || "__________________________"}. Tenant shall return them in their original condition, less reasonable wear.`, yRef);

    writeText(doc, "\n10. Insurance", yRef, { size: 12, bold: true });
    writeText(doc, "Both parties are responsible for insuring their respective interests. Tenant is advised to carry travel and personal property insurance.", yRef);

    writeText(doc, "\n11. Non-Disturbance Clause", yRef, { size: 12, bold: true });
    writeText(doc, "Tenant and guests shall not disturb or endanger neighbours or engage in unlawful activities on the Premises.", yRef);

    writeText(doc, "\n12. Cancellation Policy", yRef, { size: 12, bold: true });
    writeText(
      doc,
      `(a) If the Premises become unavailable before occupancy, the Landlord will refund all amounts paid.\n(b) If the Tenant cancels more than ${formData.cancellationDaysBefore ||
        "_______"} days before arrival, a refund will be issued minus a $${formData.cancellationFee || "_______"} cancellation fee.\nCancellations ${formData.cancellationShortDays ||
        "_______"} days or fewer before arrival result in forfeiture unless the Landlord re-rents the Premises. If so, a refund minus a cancellation fee of $${formData.cancellationShortFee ||
        "_______"} will be issued.\n(c) No cancellations permitted within ${formData.noCancellationWithinDays || "_______"} days of arrival. Failure to pay the final balance will be treated as cancellation.`,
      yRef
    );

    writeText(doc, "\n13. Smoking", yRef, { size: 12, bold: true });
    writeText(doc, `${formData.smokingAllowed || "Smoking is strictly prohibited indoors. Outdoor smoking is allowed in designated areas. Violations may lead to eviction, forfeiture, and cleaning fees."}`, yRef);

    writeText(doc, "\n14. Cooking", yRef, { size: 12, bold: true });
    writeText(doc, "Cooking is restricted to designated areas. Open flames are only allowed in grills, outdoor fireplaces, or stone hearths. Fires must never be left unattended.", yRef);

    writeText(doc, "\n15. Cleaning", yRef, { size: 12, bold: true });
    writeText(doc, `${formData.cleaningIncluded || "Tenant must leave the Premises in good condition. Rental fee includes linen laundry. Tenant is responsible for washing dishes and ensuring the unit is tidy."}`, yRef);

    writeText(doc, "\n16. Holdover", yRef, { size: 12, bold: true });
    writeText(doc, `If Tenant remains in possession after the Lease ends, rent shall continue at ${formData.holdoverRate || "the most recent monthly rate"}. This creates a month-to-month tenancy.`, yRef);

    writeText(doc, "\n17. Cumulative Rights", yRef, { size: 12, bold: true });
    writeText(doc, "All rights provided are cumulative and do not exclude rights granted by law.", yRef);

    writeText(doc, "\n18. Casualty or Destruction", yRef, { size: 12, bold: true });
    writeText(doc, "(a) If the Premises are destroyed before occupancy due to natural disaster or environmental cause, the Lease is void and all payments refunded.\n\n(b) If destruction occurs during occupancy, a prorated refund may be negotiated. No refund for inclement weather.", yRef);

    writeText(doc, "\n19. Notices", yRef, { size: 12, bold: true });
    writeText(doc, "All notices must be in writing and sent by prepaid mail to the addresses provided by both parties. Notices are deemed received three (3) days after mailing.", yRef);

    writeText(doc, "\n20. Governing Law", yRef, { size: 12, bold: true });
    writeText(doc, `This Lease shall be governed by the laws of the State of ${formData.governingLaw || "______________"}.`, yRef);

    writeText(doc, "\n21. Entire Agreement", yRef, { size: 12, bold: true });
    writeText(doc, "This document represents the full agreement between the parties.", yRef);

    writeText(doc, "\n22. Amendments", yRef, { size: 12, bold: true });
    writeText(doc, "This Lease may only be modified by a written document signed by both parties.", yRef);

    writeText(doc, "\n23. Severability", yRef, { size: 12, bold: true });
    writeText(doc, "If any provision is held invalid, the remaining provisions shall remain in effect.", yRef);

    writeText(doc, "\n24. Waiver", yRef, { size: 12, bold: true });
    writeText(doc, "Failure to enforce any part of this Lease does not waive the right to enforce it later.", yRef);

    writeText(doc, "\n25. Binding Effect", yRef, { size: 12, bold: true });
    writeText(doc, "This Lease binds and benefits both parties, their heirs, successors, and assigns.", yRef);

    writeText(doc, "\n26. Dispute Resolution", yRef, { size: 12, bold: true });
    writeText(doc, "Disputes shall first be resolved through good faith negotiation. If unresolved, parties shall use mediation before seeking legal remedies.", yRef);

    writeText(doc, "\n27. Cause for Eviction", yRef, { size: 12, bold: true });
    writeText(doc, "Tenant may be evicted for Lease violations, including unauthorized occupancy, pets, noise, smoking, or damage.", yRef);

    writeText(doc, "\n28. Attorney’s Fees", yRef, { size: 12, bold: true });
    writeText(doc, "Tenant shall pay reasonable attorney’s fees and costs if the Landlord must enforce this Lease.", yRef);

    writeText(doc, "\n29. Acknowledgment", yRef, { size: 12, bold: true });
    writeText(doc, "The parties acknowledge they have read and agree to this Lease.", yRef);

    writeText(doc, `\nLandlord Signature: ${formData.landlordSignatureName || "_____________________"}    Date: ${formData.landlordSignatureDate ||
      "__________"}`, yRef);
    writeText(doc, `\nTenant Signature: ${formData.tenantSignatureName || "_____________________"}    Date: ${formData.tenantSignatureDate || "__________"}`, yRef);

    // Inspection Checklist - add heading on new page if needed
    if (yRef.y > doc.internal.pageSize.getHeight() - 200) {
      doc.addPage();
      yRef.y = 40;
    } else {
      yRef.y += 10;
    }
    writeText(doc, "\nVACATION LEASE INSPECTION CHECKLIST", yRef, { size: 13, bold: true, center: true });
    writeText(doc, "\nTenant affirms Premises is in satisfactory condition unless noted below:", yRef);
    const checklistItems = [
      { label: "Bathrooms", value: formData.inspectionBathrooms },
      { label: "Carpeting", value: formData.inspectionCarpeting },
      { label: "Ceilings", value: formData.inspectionCeilings },
      { label: "Closets", value: formData.inspectionClosets },
      { label: "Dishwasher", value: formData.inspectionDishwasher },
      { label: "Disposal", value: formData.inspectionDisposal },
      { label: "Doors", value: formData.inspectionDoors },
      { label: "Fireplace", value: formData.inspectionFireplace },
      { label: "Lights", value: formData.inspectionLights },
      { label: "Locks", value: formData.inspectionLocks },
      { label: "Refrigerator", value: formData.inspectionRefrigerator },
      { label: "Screens", value: formData.inspectionScreens },
      { label: "Stove", value: formData.inspectionStove },
    ];

    checklistItems.forEach((it) => {
      writeText(doc, `${it.label} : ${it.value || "_________________"}`, yRef);
    });

    writeText(doc, "\nTenant’s Acknowledgment (initial): (c) _____ Received all required information.\n(d) _____ Received lead safety pamphlet.", yRef);

    writeText(doc, "\nCertification of Accuracy: We, the undersigned, certify that the information disclosed is true and complete to the best of our knowledge.", yRef);

    writeText(doc, `\nLandlord/Agent Signature: ${formData.landlordSignatureName || "_____________________"}    Date: ${formData.landlordSignatureDate ||
      "__________"}`, yRef);
    writeText(doc, `\nTenant Signature: ${formData.tenantSignatureName || "_____________________"}    Date: ${formData.tenantSignatureDate || "__________"}`, yRef);

    const fileName = `Vacation_Lease_${(formData.tenantName || "lease").replace(/\s+/g, "_")}.pdf`;
    doc.save(fileName);
    setPdfGenerated(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Parties & Premises</h3>
              <Label>Landlord Name</Label>
              <Input name="landlordName" value={formData.landlordName} onChange={handleChange} />
              <Label>Tenant Name</Label>
              <Input name="tenantName" value={formData.tenantName} onChange={handleChange} />
              <Label>Premises Address</Label>
              <Textarea name="premisesAddress" value={formData.premisesAddress} onChange={handleChange} />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>City</Label>
                  <Input name="premisesCity" value={formData.premisesCity} onChange={handleChange} />
                </div>
                <div>
                  <Label>State</Label>
                  <Input name="premisesState" value={formData.premisesState} onChange={handleChange} />
                </div>
                <div>
                  <Label>ZIP</Label>
                  <Input name="premisesZip" value={formData.premisesZip} onChange={handleChange} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Term & Payments</h3>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <Label>Start Time</Label>
                  <Input name="leaseStartTime" value={formData.leaseStartTime} onChange={handleChange} />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input name="leaseStartDate" value={formData.leaseStartDate} onChange={handleChange} />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input name="leaseEndTime" value={formData.leaseEndTime} onChange={handleChange} />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input name="leaseEndDate" value={formData.leaseEndDate} onChange={handleChange} />
                </div>
              </div>

              <Label>Total Rent ($)</Label>
              <Input name="totalRent" value={formData.totalRent} onChange={handleChange} />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Non-refundable Deposit ($)</Label>
                  <Input name="nonRefundableDeposit" value={formData.nonRefundableDeposit} onChange={handleChange} />
                </div>
                <div>
                  <Label>Deposit paid by</Label>
                  <Input name="depositPaidByDate" value={formData.depositPaidByDate} onChange={handleChange} />
                </div>
                <div>
                  <Label>Remaining Balance ($)</Label>
                  <Input name="remainingBalance" value={formData.remainingBalance} onChange={handleChange} />
                </div>
              </div>

              <Label>Remaining Balance Due Date</Label>
              <Input name="remainingDueDate" value={formData.remainingDueDate} onChange={handleChange} />

              <Label>Payment Address</Label>
              <Textarea name="paymentAddress" value={formData.paymentAddress} onChange={handleChange} />
              <div className="grid grid-cols-3 gap-2">
                <Input name="paymentCity" value={formData.paymentCity} onChange={handleChange} placeholder="City" />
                <Input name="paymentState" value={formData.paymentState} onChange={handleChange} placeholder="State" />
                <Input name="paymentZip" value={formData.paymentZip} onChange={handleChange} placeholder="ZIP" />
              </div>
              <Label>Security Deposit ($)</Label>
              <Input name="securityDeposit" value={formData.securityDeposit} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Rules & Policies</h3>
              <Label>Minimum stay (nights)</Label>
              <Input name="minimumStayNights" value={formData.minimumStayNights} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Max Occupancy</Label>
                  <Input name="maxOccupancy" value={formData.maxOccupancy} onChange={handleChange} />
                </div>
                <div>
                  <Label>Guest Age Limit</Label>
                  <Input name="guestAgeLimit" value={formData.guestAgeLimit} onChange={handleChange} />
                </div>
              </div>
              <Label>Furnishings Provided (comma separated)</Label>
              <Input name="furnishingsProvided" value={formData.furnishingsProvided} onChange={handleChange} />
              <Label>Smoking / Cleaning Notes</Label>
              <Textarea name="smokingAllowed" value={formData.smokingAllowed} onChange={handleChange} />
              <Label>Cleaning Included</Label>
              <Input name="cleaningIncluded" value={formData.cleaningIncluded} onChange={handleChange} />
              <Label>Holdover rent rate description</Label>
              <Input name="holdoverRate" value={formData.holdoverRate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Cancellation & Law</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Cancel days before (full refund policy)</Label>
                  <Input name="cancellationDaysBefore" value={formData.cancellationDaysBefore} onChange={handleChange} />
                </div>
                <div>
                  <Label>Cancellation fee ($)</Label>
                  <Input name="cancellationFee" value={formData.cancellationFee} onChange={handleChange} />
                </div>
                <div>
                  <Label>Short notice days</Label>
                  <Input name="cancellationShortDays" value={formData.cancellationShortDays} onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Short notice fee ($)</Label>
                  <Input name="cancellationShortFee" value={formData.cancellationShortFee} onChange={handleChange} />
                </div>
                <div>
                  <Label>No cancellations within (days)</Label>
                  <Input name="noCancellationWithinDays" value={formData.noCancellationWithinDays} onChange={handleChange} />
                </div>
              </div>
              <Label>Governing Law / State</Label>
              <Input name="governingLaw" value={formData.governingLaw} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardContent className="space-y-3">
              <h3 className="font-semibold">Inspection Checklist & Signatures</h3>
              <Label>Bathrooms</Label>
              <Input name="inspectionBathrooms" value={formData.inspectionBathrooms} onChange={handleChange} />
              <Label>Carpeting</Label>
              <Input name="inspectionCarpeting" value={formData.inspectionCarpeting} onChange={handleChange} />
              <Label>Ceilings</Label>
              <Input name="inspectionCeilings" value={formData.inspectionCeilings} onChange={handleChange} />
              <Label>Closets</Label>
              <Input name="inspectionClosets" value={formData.inspectionClosets} onChange={handleChange} />
              <Label>Dishwasher</Label>
              <Input name="inspectionDishwasher" value={formData.inspectionDishwasher} onChange={handleChange} />
              <Label>Disposal</Label>
              <Input name="inspectionDisposal" value={formData.inspectionDisposal} onChange={handleChange} />
              <Label>Doors</Label>
              <Input name="inspectionDoors" value={formData.inspectionDoors} onChange={handleChange} />
              <Label>Fireplace</Label>
              <Input name="inspectionFireplace" value={formData.inspectionFireplace} onChange={handleChange} />
              <Label>Lights</Label>
              <Input name="inspectionLights" value={formData.inspectionLights} onChange={handleChange} />
              <Label>Locks</Label>
              <Input name="inspectionLocks" value={formData.inspectionLocks} onChange={handleChange} />
              <Label>Refrigerator</Label>
              <Input name="inspectionRefrigerator" value={formData.inspectionRefrigerator} onChange={handleChange} />
              <Label>Screens</Label>
              <Input name="inspectionScreens" value={formData.inspectionScreens} onChange={handleChange} />
              <Label>Stove</Label>
              <Input name="inspectionStove" value={formData.inspectionStove} onChange={handleChange} />

              <hr />
              <Label>Landlord - Signature Name</Label>
              <Input name="landlordSignatureName" value={formData.landlordSignatureName} onChange={handleChange} />
              <Label>Landlord - Date</Label>
              <Input name="landlordSignatureDate" value={formData.landlordSignatureDate} onChange={handleChange} />
              <Label>Tenant - Signature Name</Label>
              <Input name="tenantSignatureName" value={formData.tenantSignatureName} onChange={handleChange} />
              <Label>Tenant - Date</Label>
              <Input name="tenantSignatureDate" value={formData.tenantSignatureDate} onChange={handleChange} />
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      {renderStep()}

      <div className="flex justify-between pt-4">
        <Button disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Back
        </Button>
        {step < 5 ? (
          <Button onClick={() => setStep((s) => Math.min(5, s + 1))}>Next</Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={generatePDF}>Generate PDF</Button>
          </div>
        )}
      </div>

      {pdfGenerated && (
        <Card>
          <CardContent>
            <div className="text-green-600 font-semibold">Vacation Lease PDF Generated Successfully</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
