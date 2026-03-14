import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, FileDown, Scale } from "lucide-react";
import { jsPDF } from "jspdf";

interface FieldDef {
  name: string;
  label: string;
  description?: string;
  type: "text" | "date" | "textarea";
  required?: boolean;
  placeholder?: string;
}

interface StepDef {
  title: string;
  subtitle: string;
  fields: FieldDef[];
}

// ─────────────────────────────────────────────────────────────────────────────
// STEPS
// ─────────────────────────────────────────────────────────────────────────────
const steps: StepDef[] = [
  // ── STEP 1: Declarant (Principal) ─────────────────────────────────────────
  {
    title: "Step 1: Declarant (Principal)",
    subtitle:
      "Identify the person granting the power of attorney. These details fill the opening paragraph of the document.",
    fields: [
      {
        name: "declarantName",
        label: "Declarant Full Legal Name",
        description:
          'Draft paragraph: "I, __________ (\u201cDeclarant\u201d), residing at <insert address> hereby appoint <insert name> (\u201cAgent\u201d) of,................ as my attorney-in-fact (\u201cAgent\u2019) to exercise the powers and discretions described below."',
        type: "text",
        required: true,
        placeholder: "e.g. Jane Marie Smith",
      },
      {
        name: "declarantAddress",
        label: "Declarant Full Residential Address",
        description:
          'Fills \u201cresiding at <insert address>\u201d in the opening paragraph above.',
        type: "text",
        required: true,
        placeholder: "e.g. 123 Main St, Los Angeles, CA 90001",
      },
    ],
  },
  // ── STEP 2: Agent (Attorney-in-Fact) ─────────────────────────────────────
  {
    title: "Step 2: Agent (Attorney-in-Fact)",
    subtitle:
      "Identify the person being appointed. These details fill the opening paragraph and the execution line \u201cAgent (phone\u202f/\u202femail):\u201d.",
    fields: [
      {
        name: "agentName",
        label: "Agent Full Legal Name",
        description:
          'Draft paragraph: "I, __________ (\u201cDeclarant\u201d), residing at __________ hereby appoint __________ (\u201cAgent\u201d) of,................ as my attorney-in-fact (\u201cAgent\u2019) to exercise the powers and discretions described below."',
        type: "text",
        required: true,
        placeholder: "e.g. John David Doe",
      },
      {
        name: "agentAddress",
        label: "Agent Full Address",
        description:
          'Fills \u201cof,................\u201d in the opening paragraph \u2014 the agent\u2019s full address.',
        type: "text",
        required: true,
        placeholder: "e.g. 456 Oak Ave, San Francisco, CA 94102",
      },
      {
        name: "agentPhone",
        label: "Agent Phone Number",
        description:
          'Fills the execution line: \u201cAgent (phone / email):............................"',
        type: "text",
        required: false,
        placeholder: "e.g. +1 (555) 123-4567",
      },
      {
        name: "agentEmail",
        label: "Agent Email Address",
        description:
          'Fills the execution line: \u201cAgent (phone / email):............................"',
        type: "text",
        required: false,
        placeholder: "e.g. agent@email.com",
      },
    ],
  },
  // ── STEP 3: Alternate Agent ───────────────────────────────────────────────
  {
    title: "Step 3: Alternate Agent",
    subtitle:
      "Identify the backup agent. These details fill the second paragraph and the execution line \u201cAlternate Agent (phone\u202f/\u202femail):\u201d.",
    fields: [
      {
        name: "altAgentName",
        label: "Alternate Agent Full Legal Name",
        description:
          'Draft paragraph: "If the Agent is unable or unwilling to serve for any reason, I appoint __________ (\u201cAlternate Agent\u201d), of ..............., as my alternate or successor Agent, as the case may be to serve with the same powers and discretions."',
        type: "text",
        required: false,
        placeholder: "e.g. Mary Jane Johnson",
      },
      {
        name: "altAgentAddress",
        label: "Alternate Agent Full Address",
        description:
          'Fills \u201cof,...............,\u201d in the Alternate Agent paragraph above.',
        type: "text",
        required: false,
        placeholder: "e.g. 789 Pine Rd, Chicago, IL 60601",
      },
      {
        name: "altAgentPhone",
        label: "Alternate Agent Phone Number",
        description:
          'Fills the execution line: \u201cAlternate Agent (phone / email):........................."',
        type: "text",
        required: false,
        placeholder: "e.g. +1 (555) 987-6543",
      },
      {
        name: "altAgentEmail",
        label: "Alternate Agent Email Address",
        description:
          'Fills the execution line: \u201cAlternate Agent (phone / email):........................."',
        type: "text",
        required: false,
        placeholder: "e.g. altAgent@email.com",
      },
    ],
  },
  // ── STEP 4: Powers 1 – 4 ─────────────────────────────────────────────────
  {
    title: "Step 4: Powers Granted \u2014 Bank Accounts, Assets, Insurance & Legal Claims",
    subtitle:
      'These fields cover Powers 1\u20134 from the draft. The full authority grant reads: "My Agent shall have full power and authority to act on my behalf. This power and authority shall authorize my Agent to manage and conduct all of my affairs and to exercise all of my legal rights and powers, including all rights and powers that I may acquire in the future. My Agent\u2019s powers shall include, but not be limited to, the power to:" Enter a status for each power \u2014 e.g. \u201cGranted in full\u201d or a specific limitation.',
    fields: [
      {
        name: "power1",
        label: "Power 1 \u2014 Bank & Financial Accounts",
        description:
          "1.     Open, maintain or close bank accounts (including, but not limited to, checking accounts, savings accounts, and certificates of deposit), brokerage accounts, retirement plan accounts, and other similar accounts with financial institutions.",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
      {
        name: "power2",
        label: "Power 2 \u2014 Assets & Property",
        description:
          "2.      Sell, exchange, buy, invest, or reinvest any assets or property owned by me. Such assets or property may include income producing or non-income producing assets and property.",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
      {
        name: "power3",
        label: "Power 3 \u2014 Insurance & Annuity Contracts",
        description:
          "3.     Purchase and/or maintain insurance and annuity contracts, including life insurance upon my life or the life of any other appropriate person.",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
      {
        name: "power4",
        label: "Power 4 \u2014 Legal Claims & Debt Collection",
        description:
          "4.      Take any and all legal steps necessary to collect any amount or debt owed to me, or to settle any claim, whether made against me or asserted on my behalf against any other person or entity.",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
    ],
  },
  // ── STEP 5: Powers 5 – 8 ─────────────────────────────────────────────────
  {
    title: "Step 5: Powers Granted \u2014 Contracts, Stocks, Business & Professional Assistance",
    subtitle:
      "These fields cover Powers 5\u20138 from the draft. Enter a status for each power.",
    fields: [
      {
        name: "power5",
        label: "Power 5 \u2014 Binding Contracts",
        description:
          "5.     Enter into binding contracts on my behalf.",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
      {
        name: "power6",
        label: "Power 6 \u2014 Stock Rights & Investments",
        description:
          "6.     Exercise all stock rights on my behalf as my proxy, including all rights with respect to stocks, bonds, debentures, commodities, options or other investments.",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
      {
        name: "power7",
        label: "Power 7 \u2014 Business Operations",
        description:
          "7.     Maintain and/or operate any business that I may own.",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
      {
        name: "power8",
        label: "Power 8 \u2014 Professional Assistance",
        description:
          "8.      Employ professional and business assistance, as may be appropriate, including attorneys, accountants, and real estate agents, for my personal or business affairs.",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
    ],
  },
  // ── STEP 6: Powers 9 – 11 ────────────────────────────────────────────────
  {
    title: "Step 6: Powers Granted \u2014 Property, Government Documents & Gifts",
    subtitle:
      "These fields cover Powers 9\u201311 from the draft.",
    fields: [
      {
        name: "power9",
        label: "Power 9 \u2014 Real & Personal Property",
        description:
          "9.     Sell, convey, lease, mortgage, manage, insure, improve, repair, or perform any other act with respect to any of my property (now owned or later acquired) including, but not limited to, real estate and real estate rights (including the right to remove tenants and to recover possession). This includes the right to sell or encumber any homestead that I now own or may own in the future.",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
      {
        name: "power10",
        label: "Power 10 \u2014 Government Documents",
        description:
          "10.  Prepare, sign, and file documents with any governmental body or agency, including,but not limited to, authorization to:",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
      {
        name: "power10Detail",
        label: "Power 10 \u2014 Specific Authorizations (continues after \u201cauthorization to:\u201d)",
        description:
          'Specify the exact government authorizations \u2014 this text continues directly after \u201cauthorization to:\u201d in the final document.',
        type: "textarea",
        required: false,
        placeholder:
          "e.g. file state and federal income tax returns; apply for Social Security benefits; register or transfer property titles with the county recorder\u2019s office",
      },
      {
        name: "power11",
        label: "Power 11 \u2014 Gifts & Gift Tax Returns",
        description:
          "11.   Make gifts from my assets to members of my family and to such other persons or charitable organizations with whom I have an established pattern of giving, to file state and federal gift tax returns, and to file a tax election to split gifts with my spouse, if any.",
        type: "text",
        required: true,
        placeholder: "e.g. Granted in full",
      },
    ],
  },
  // ── STEP 7: Additional Powers & Execution Date ────────────────────────────
  {
    title: "Step 7: Additional Powers & Execution Date",
    subtitle:
      'Add any extra powers or limitations not covered above. Then enter the execution date \u2014 this fills \u201cDate:\u201d which is the first line of the execution block.',
    fields: [
      {
        name: "additionalPowers",
        label: "Additional Powers or Limitations (optional)",
        description:
          "Any powers not listed in Powers 1\u201311, or specific restrictions placed on the agent\u2019s authority.",
        type: "textarea",
        required: false,
        placeholder:
          "e.g. Agent may not change beneficiary designations on life insurance policies.",
      },
      {
        name: "declarantSignDate",
        label: "Date",
        description:
          'Fills the first execution line: \u201cDate:\u201d \u2014 the date on which the declarant signs this instrument.',
        type: "date",
        required: true,
      },
    ],
  },
  // ── STEP 8: Witnesses ─────────────────────────────────────────────────────
  {
    title: "Step 8: Witnesses",
    subtitle:
      'Two witnesses are required. The draft contains three lines per witness: "Witness #N:", "Signature: Address:", and "Full Legal Name:".',
    fields: [
      {
        name: "witness1Name",
        label: "Witness 1 \u2014 Full Legal Name",
        description:
          'Fills both \u201cWitness #1:    .........................\u201d and \u201cFull Legal Name:        .......................\u201d lines in the draft.',
        type: "text",
        required: true,
        placeholder: "e.g. Robert A. Williams",
      },
      {
        name: "witness1Address",
        label: "Witness 1 \u2014 Address",
        description:
          'Fills \u201cSignature: Address:........................\u201d for Witness 1.',
        type: "text",
        required: true,
        placeholder: "e.g. 321 Elm St, Los Angeles, CA 90001",
      },
      {
        name: "witness2Name",
        label: "Witness 2 \u2014 Full Legal Name",
        description:
          'Fills both \u201cWitness #2:..............................\u201d and \u201cFull Legal Name:............................\u201d lines in the draft.',
        type: "text",
        required: true,
        placeholder: "e.g. Susan B. Clark",
      },
      {
        name: "witness2Address",
        label: "Witness 2 \u2014 Address",
        description:
          'Fills \u201cSignature: Address:.................................\u201d for Witness 2.',
        type: "text",
        required: true,
        placeholder: "e.g. 654 Maple Ave, Los Angeles, CA 90002",
      },
    ],
  },
  // ── STEP 9: Notary Acknowledgment ─────────────────────────────────────────
  {
    title: "Step 9: Notary Acknowledgment",
    subtitle:
      'These details fill the final lines of the draft: the notary acknowledgment paragraph, \u201cSignature of Notary taking acknowledgment\u201d, and \u201cDate of Expiration:\u201d.',
    fields: [
      {
        name: "notaryDate",
        label: "Date Acknowledged Before Notary",
        description:
          'Fills: \u201cThe foregoing instrument was acknowledged before me on __________, by Claimant, who is personally known to me or who has produced __________ as identification.\u201d',
        type: "date",
        required: true,
      },
      {
        name: "claimantId",
        label: "Identification Produced by Claimant",
        description:
          'Fills \u201cwho has produced __________ as identification\u201d. Leave blank if personally known to the notary.',
        type: "text",
        required: false,
        placeholder: "e.g. Florida Driver\u2019s License No. A123-456-78-910-0",
      },
      {
        name: "notaryName",
        label: "Notary Public Full Name",
        description:
          'Fills the line: \u201cSignature of Notary taking acknowledgment\u201d.',
        type: "text",
        required: true,
        placeholder: "e.g. Patricia L. Thompson",
      },
      {
        name: "notaryExpiry",
        label: "Date of Expiration",
        description:
          'Fills the last line of the draft: \u201cDate of Expiration:\u201d \u2014 the notary commission expiry date.',
        type: "text",
        required: false,
        placeholder: "e.g. December 31, 2027",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PDF Generator — exact draft layout, same font, same spacing
// ─────────────────────────────────────────────────────────────────────────────
const generatePDF = (values: Record<string, string>) => {
  const doc   = new jsPDF({ unit: "mm", format: "a4" });
  const W     = 210;
  const M     = 16;
  const TW    = W - M * 2;
  const LH    = 5.4;
  const LIMIT = 282;
  let y = 20;

  const v = (val?: string, dots = 16) =>
    (val || "").trim() || ".".repeat(dots);

  const ensure = (need = 8) => {
    if (y + need > LIMIT) { doc.addPage(); y = 20; }
  };

  const para = (text: string, bold = false, gap = 2.6) => {
    const lines = doc.splitTextToSize(text, TW);
    ensure(lines.length * LH + gap);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(lines, M, y);
    y += lines.length * LH + gap;
  };

  const execLine = (boldLabel: string, value?: string) => {
    ensure(LH + 3);
    doc.setFont("helvetica", "bold");
    doc.text(boldLabel, M, y);
    const x = M + doc.getTextWidth(boldLabel);
    doc.setFont("helvetica", "normal");
    const val = (value || "").trim();
    if (val) {
      doc.text(val, x + 1, y);
    } else {
      const dots = "............................................................................";
      const avail = W - M - x - 2;
      doc.text(doc.splitTextToSize(dots, avail)[0], x + 1, y);
    }
    y += LH + 1.8;
  };

  // ── Title ──────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.8);
  doc.text("General Power of Attorney", W / 2, y, { align: "center" });
  y += 10;
  doc.setFontSize(10.5);

  // ── Opening paragraph ──────────────────────────────────────────────
  para(
    `I, ${v(values.declarantName)} (\u201cDeclarant\u201d), residing at ${v(values.declarantAddress)} hereby appoint ${v(values.agentName)} (\u201cAgent\u201d) of,${v(values.agentAddress, 16)} as my attorney-in-fact (\u201cAgent\u2019) to exercise the powers and discretions described below.`
  );

  // ── Alternate Agent paragraph ───────────────────────────────────────
  para(
    `If the Agent is unable or unwilling to serve for any reason, I appoint ${v(values.altAgentName)} (\u201cAlternate Agent\u201d), of ${v(values.altAgentAddress, 15)}, as my alternate or successor Agent, as the case may be to serve with the same powers and discretions.`
  );

  // ── Authority grant paragraph ───────────────────────────────────────
  para(
    `My Agent shall have full power and authority to act on my behalf. This power and authority shall authorize my Agent to manage and conduct all of my affairs and to exercise all of my legal rights and powers, including all rights and powers that I may acquire in the future. My Agent\u2019s powers shall include, but not be limited to, the power to:`
  );

  para(`1.     Open, maintain or close bank accounts (including, but not limited to, checking accounts, savings accounts, and certificates of deposit), brokerage accounts, retirement plan accounts, and other similar accounts with financial institutions.`);
  para(`2.      Sell, exchange, buy, invest, or reinvest any assets or property owned by me. Such assets or property may include income producing or non-income producing assets and property.`);
  para(`3.     Purchase and/or maintain insurance and annuity contracts, including life insurance upon my life or the life of any other appropriate person.`);
  para(`4.      Take any and all legal steps necessary to collect any amount or debt owed to me, or to settle any claim, whether made against me or asserted on my behalf against any other person or entity.`);
  para(`5.     Enter into binding contracts on my behalf.`);
  para(`6.     Exercise all stock rights on my behalf as my proxy, including all rights with respect to stocks, bonds, debentures, commodities, options or other investments.`);
  para(`7.     Maintain and/or operate any business that I may own.`);
  para(`8.      Employ professional and business assistance, as may be appropriate, including attorneys, accountants, and real estate agents, for my personal or business affairs.`);
  para(`9.     Sell, convey, lease, mortgage, manage, insure, improve, repair, or perform any other act with respect to any of my property (now owned or later acquired) including, but not limited to, real estate and real estate rights (including the right to remove tenants and to recover possession). This includes the right to sell or encumber any homestead that I now own or may own in the future.`);

  const p10detail = (values.power10Detail || "").trim();
  para(`10.  Prepare, sign, and file documents with any governmental body or agency, including,but not limited to, authorization to:${p10detail ? " " + p10detail : ""}`);

  para(`11.   Make gifts from my assets to members of my family and to such other persons or charitable organizations with whom I have an established pattern of giving, to file state and federal gift tax returns, and to file a tax election to split gifts with my spouse, if any.`);

  if ((values.additionalPowers || "").trim()) {
    para(values.additionalPowers);
  }

  y += 5;

  // ── Execution block ────────────────────────────────────────────────
  execLine("Date:", values.declarantSignDate);
  execLine("Declarant (signature)");
  const agentContact = [values.agentPhone, values.agentEmail].filter(Boolean).join(" / ");
  execLine("Agent (phone / email):", agentContact || undefined);
  const altContact = [values.altAgentPhone, values.altAgentEmail].filter(Boolean).join(" / ");
  execLine("Alternate Agent (phone / email):", altContact || undefined);
  execLine("Witness #1:    ", values.witness1Name);
  execLine("Signature: Address:", values.witness1Address);
  execLine("Full Legal Name:        ", values.witness1Name);
  execLine("Witness #2:", values.witness2Name);
  execLine("Signature: Address:", values.witness2Address);
  execLine("Full Legal Name:", values.witness2Name);

  y += 3;

  const claimantId = (values.claimantId || "").trim();
  para(
    `The foregoing instrument was acknowledged before me on ${v(values.notaryDate, 10)}, by Claimant, who is personally known to me or who has produced ${claimantId || "________________________"} as identification.`
  );

  y += 1;
  execLine("Signature of Notary taking acknowledgment", values.notaryName);
  execLine("Date of Expiration:", values.notaryExpiry);

  doc.save("general_power_of_attorney.pdf");
};

// ─────────────────────────────────────────────────────────────────────────────
// Inline FormWizard
// ─────────────────────────────────────────────────────────────────────────────
const FormWizard: React.FC<{
  steps: StepDef[];
  onGenerate: (v: Record<string, string>) => void;
}> = ({ steps, onGenerate }) => {
  const [current, setCurrent] = useState(0);
  const [values,  setValues]  = useState<Record<string, string>>({});
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  const step   = steps[current];
  const isLast = current === steps.length - 1;

  const change = (name: string, val: string) => {
    setValues(v => ({ ...v, [name]: val }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    step.fields.forEach(f => {
      if (f.required && !(values[f.name] || "").trim())
        e[f.name] = "This field is required";
    });
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => {
    if (!validate()) return;
    if (isLast) { onGenerate(values); return; }
    setCurrent(c => c + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setCurrent(c => Math.max(0, c - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span className="font-semibold text-gray-800">{step.title}</span>
          <span>Step {current + 1} of {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
          <div
            className="bg-bright-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-1 mb-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                i < current ? "bg-bright-orange-400" : i === current ? "bg-bright-orange-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 leading-relaxed italic border-l-2 border-bright-orange-300 pl-3">
          {step.subtitle}
        </p>
      </div>

      <div className="space-y-7">
        {step.fields.map(f => (
          <div key={f.name} className="space-y-1">
            <label className="block text-sm font-semibold text-gray-800">
              {f.label}
              {f.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {f.description && (
              <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 border border-gray-200 rounded-md px-3 py-2 mb-1">
                {f.description}
              </p>
            )}
            {f.type === "textarea" ? (
              <textarea
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bright-orange-400 resize-none min-h-[90px] ${
                  errors[f.name] ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
                placeholder={f.placeholder}
                value={values[f.name] || ""}
                onChange={e => change(f.name, e.target.value)}
              />
            ) : (
              <input
                type={f.type}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bright-orange-400 ${
                  errors[f.name] ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
                placeholder={f.placeholder}
                value={values[f.name] || ""}
                onChange={e => change(f.name, e.target.value)}
              />
            )}
            {errors[f.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[f.name]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline" onClick={back} disabled={current === 0} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button onClick={next} className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white flex items-center gap-2">
          {isLast ? <><FileDown className="w-4 h-4" /> Generate PDF</> : <>Continue <ArrowRight className="w-4 h-4" /></>}
        </Button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
const GeneralPowerOfAttorneyForm = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-2xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div className="text-center mb-8">
            <Scale className="w-16 h-16 text-bright-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">General Power of Attorney</h1>
            <p className="text-gray-600">Complete each step to generate your document</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <FormWizard steps={steps} onGenerate={generatePDF} />
        </div>
      </div>
    </Layout>
  );
};

export default GeneralPowerOfAttorneyForm;
