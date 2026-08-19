import { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  ArrowLeft, ArrowRight, Check, ShieldCheck, FileText, Building2,
  MapPin, Users, CalendarClock, ScrollText, Lock, Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  LLC_STATE_LIST, LLC_STATES, NY_COUNTIES, IRS_ACTIVITY_CATEGORIES,
  type StateCode,
} from "@/data/llcRulesEngine";
import {
  createEmptyFormation, emptyMember, type LlcFormationData, type Address,
} from "@/types/llcFormation";

/* ── Small field helpers ───────────────────────────────── */
const Label = ({ children, hint }: { children: React.ReactNode; hint?: string }) => (
  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
    {children}
    {hint && <span className="block text-xs font-normal text-gray-500 mt-0.5">{hint}</span>}
  </label>
);

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <Label hint={hint}>{label}</Label>
    {children}
  </div>
);

const PublicTag = () => (
  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full ml-2">
    <Lock className="h-2.5 w-2.5" /> Public record
  </span>
);

const AddressFields = ({
  value, onChange, stateLocked,
}: { value: Address; onChange: (a: Address) => void; stateLocked?: string }) => (
  <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
    <Input className="sm:col-span-6" placeholder="Street address" value={value.street}
      onChange={(e) => onChange({ ...value, street: e.target.value })} />
    <Input className="sm:col-span-3" placeholder="City" value={value.city}
      onChange={(e) => onChange({ ...value, city: e.target.value })} />
    <Input className="sm:col-span-2" placeholder="State" value={stateLocked ?? value.state}
      disabled={!!stateLocked}
      onChange={(e) => onChange({ ...value, state: e.target.value })} />
    <Input className="sm:col-span-1" placeholder="ZIP" value={value.zip}
      onChange={(e) => onChange({ ...value, zip: e.target.value })} />
  </div>
);

/* ── Step definitions ──────────────────────────────────── */
type StepId =
  | "state" | "type" | "name" | "address" | "agent"
  | "members" | "final" | "operating" | "review" | "attest";

const ALL_STEPS: { id: StepId; title: string; icon: React.ElementType }[] = [
  { id: "state", title: "State of Formation", icon: Building2 },
  { id: "type", title: "LLC Type", icon: FileText },
  { id: "name", title: "Name & Designator", icon: ScrollText },
  { id: "address", title: "Addresses & Contact", icon: MapPin },
  { id: "agent", title: "Registered Agent", icon: ShieldCheck },
  { id: "members", title: "Members & Management", icon: Users },
  { id: "final", title: "Effective Date, Purpose & Organizer", icon: CalendarClock },
  { id: "operating", title: "Operating Agreement", icon: ScrollText },
  { id: "review", title: "Review", icon: Check },
  { id: "attest", title: "Confirm & Continue", icon: ShieldCheck },
];

const FormMyLlc = () => {
  const [data, setData] = useState<LlcFormationData>(createEmptyFormation());
  const [stepIdx, setStepIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const set = (patch: Partial<LlcFormationData>) => setData((d) => ({ ...d, ...patch }));

  const rules = data.state ? LLC_STATES[data.state as StateCode] : null;

  const steps = ALL_STEPS; // all steps are visible; content adapts per state
  const step = steps[stepIdx];
  const progress = Math.round((stepIdx / (steps.length - 1)) * 100);

  /* Per-step required validation (light — encourages completion, does not block editing). */
  const canProceed = useMemo(() => {
    switch (step.id) {
      case "state": return !!data.state;
      case "type": return !!data.llcType && (data.llcType !== "pllc" || !!data.licensedActivity.trim());
      case "name": return !!data.llcName.trim() && !!data.designator;
      case "address":
        return rules?.principalAddressStyle === "county_only"
          ? !!data.principalCounty
          : !!data.principalOffice.street.trim() && !!data.principalOffice.city.trim();
      case "agent":
        if (rules?.registeredAgent.sosIsDefaultAgent && data.raChoice === "sos_default") return true;
        return !!data.raName.trim() && !!data.raAddress.street.trim() &&
          (!rules?.registeredAgent.requiresSignature || data.raConsent);
      case "members":
        return !!data.memberCount && !!data.managementStructure &&
          data.members.every((m) => m.name.trim());
      case "final":
        return !!data.effectiveDateType && !!data.businessPurpose.trim() &&
          !!data.organizerName.trim() && (!rules?.organizerNeedsEmail || !!data.organizerEmail.trim());
      case "operating": return true;
      case "review": return true;
      case "attest": return data.attestationAccepted;
      default: return true;
    }
  }, [step.id, data, rules]);

  const next = () => {
    if (!canProceed) { toast.error("Please complete the required fields to continue."); return; }
    if (step.id === "attest") { void handleSubmit(); return; }
    setStepIdx((i) => Math.min(i + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => { setStepIdx((i) => Math.max(i - 1, 0)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleSubmit = async () => {
    try {
      await supabase.from("llc_formation_leads").insert([{
        state: data.state,
        llc_name: `${data.llcName} ${data.designator}`.trim(),
        email: data.businessEmail || null,
        organizer_name: data.organizerName || null,
        answers: data as unknown as Record<string, unknown>,
      }]);
    } catch {
      /* non-blocking: lead capture is best-effort */
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <Layout>
        <Helmet><title>Request Received | Form My LLC | Legalgram</title></Helmet>
        <div className="container-custom max-w-2xl mx-auto py-20 pt-28 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">You're all set</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We've saved your {LLC_STATES[data.state as StateCode]?.name} LLC details for
            <span className="font-semibold"> {data.llcName} {data.designator}</span>. Document
            checkout and instant download are launching soon — we'll email
            {data.businessEmail ? <span className="font-semibold"> {data.businessEmail}</span> : " you"} the
            moment your documents are ready to generate.
          </p>
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 text-left text-sm text-gray-700 mb-8">
            <p className="font-semibold text-gray-900 mb-1">What happens next</p>
            Your 4-document package — {rules?.articlesLabel}, Operating Agreement, Filing
            Instructions, and EIN Worksheet — will be generated from your answers. You'll then
            file with the {rules?.name} Secretary of State yourself. Any state filing fees are
            paid directly to the state.
          </div>
          <Button variant="orange" asChild><a href="/">Back to Home</a></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet><title>Form My LLC | DIY LLC Formation | Legalgram</title></Helmet>
      <div className="bg-gradient-to-b from-orange-50/40 to-white min-h-screen pt-24 pb-16">
        <div className="container-custom max-w-3xl mx-auto px-4">

          {/* Header + progress */}
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 bg-bright-orange-100 text-bright-orange-600 font-medium px-4 py-1 rounded-full text-sm mb-3">
              <Sparkles className="h-3.5 w-3.5" /> DIY LLC Formation
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Form Your LLC</h1>
            <p className="text-gray-500 text-sm mt-1">Answer a few questions to prepare your formation documents.</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span className="font-medium text-gray-700">{step.title}</span>
              <span>{progress}% complete</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-bright-orange-500 to-bright-orange-400"
                initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
            </div>
          </div>

          {/* State warning banner */}
          {rules?.flowWarning && step.id !== "state" && (
            <div className="mb-5 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900">
              <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
              <span>{rules.flowWarning}</span>
            </div>
          )}

          {/* Step card */}
          <motion.div key={step.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-bright-orange-500 flex items-center justify-center">
                <step.icon className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{step.title}</h2>
            </div>

            {renderStep(step.id, data, set, rules)}
          </motion.div>

          {/* Nav */}
          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" onClick={back} disabled={stepIdx === 0}
              className="disabled:opacity-40">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Button variant="orange" onClick={next}>
              {step.id === "attest" ? "Submit" : step.id === "review" ? "Looks Good" : "Continue"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-5 max-w-xl mx-auto">
            Legalgram is not a law firm and does not provide legal advice. State filing fees are
            paid directly to your state, not to Legalgram.
          </p>
        </div>
      </div>
    </Layout>
  );
};

/* ── Step renderer ─────────────────────────────────────── */
function renderStep(
  id: StepId,
  data: LlcFormationData,
  set: (p: Partial<LlcFormationData>) => void,
  rules: ReturnType<typeof getRules>,
) {
  const radioCard = (active: boolean) =>
    `cursor-pointer rounded-xl border-2 px-4 py-3 transition-all ${active
      ? "border-bright-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`;

  switch (id) {
    case "state":
      return (
        <div>
          <Field label="Which state do you want to form your LLC in?"
            hint="Your state drives every requirement below. We currently support seven states.">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {LLC_STATE_LIST.map((s) => (
                <div key={s.code} className={radioCard(data.state === s.code)}
                  onClick={() => set({ state: s.code })}>
                  <p className="font-semibold text-gray-900">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.articlesLabel}</p>
                </div>
              ))}
            </div>
          </Field>
        </div>
      );

    case "type":
      return (
        <div>
          <Field label="What type of LLC are you forming?">
            <div className="space-y-3">
              {[
                { v: "standard", t: "Standard LLC", d: "The typical LLC for most businesses." },
                { v: "pllc", t: "Professional LLC (PLLC)", d: "For state-licensed professions (law, medicine, accounting, etc.)." },
                { v: "other", t: "Not sure / Other", d: "We'll default to a standard LLC; you can adjust later." },
              ].map((o) => (
                <div key={o.v} className={radioCard(data.llcType === o.v)}
                  onClick={() => set({ llcType: o.v as LlcFormationData["llcType"] })}>
                  <p className="font-semibold text-gray-900">{o.t}</p>
                  <p className="text-xs text-gray-500">{o.d}</p>
                </div>
              ))}
            </div>
          </Field>
          {data.llcType === "pllc" && (
            <Field label="Which licensed profession?"
              hint="PLLCs usually need prior approval from the profession's licensing board.">
              <Input value={data.licensedActivity}
                onChange={(e) => set({ licensedActivity: e.target.value })}
                placeholder="e.g. Certified Public Accounting" />
            </Field>
          )}
        </div>
      );

    case "name":
      return (
        <div>
          <Field label="LLC name" hint="Enter your desired name without the designator (LLC, L.L.C., etc.).">
            <Input value={data.llcName} onChange={(e) => set({ llcName: e.target.value })}
              placeholder="e.g. Blue Harbor Ventures" />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Backup name 1 (optional)">
              <Input value={data.backupName1} onChange={(e) => set({ backupName1: e.target.value })} />
            </Field>
            <Field label="Backup name 2 (optional)">
              <Input value={data.backupName2} onChange={(e) => set({ backupName2: e.target.value })} />
            </Field>
          </div>
          <Field label="Designator" hint={`Options permitted in ${rules?.name ?? "your state"}.`}>
            <div className="flex flex-wrap gap-2">
              {(rules?.designators ?? ["LLC"]).map((d) => (
                <button key={d} type="button" onClick={() => set({ designator: d })}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${data.designator === d
                    ? "border-bright-orange-500 bg-orange-50 text-bright-orange-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"}`}>{d}</button>
              ))}
            </div>
          </Field>
          {data.llcName && data.designator && (
            <p className="text-sm text-gray-500 mt-2">Your LLC will be named
              <span className="font-semibold text-gray-800"> {data.llcName} {data.designator}</span>.</p>
          )}
        </div>
      );

    case "address":
      return (
        <div>
          {rules?.principalAddressStyle === "county_only" ? (
            <Field label={<>Principal office county <PublicTag /></> as unknown as string}
              hint="New York files a county, not a street address.">
              <select className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm"
                value={data.principalCounty} onChange={(e) => set({ principalCounty: e.target.value })}>
                <option value="">Select a county…</option>
                {NY_COUNTIES.map((c) => <option key={c} value={c}>{c} County</option>)}
              </select>
            </Field>
          ) : (
            <div className="mb-2">
              <Label hint={rules?.code === "CA" || rules?.code === "WY" ? undefined : "This appears on the public record."}>
                Principal office address <PublicTag />
              </Label>
              <AddressFields value={data.principalOffice} onChange={(a) => set({ principalOffice: a })}
                stateLocked={rules?.code === "CA" ? "California" : undefined} />
            </div>
          )}

          <div className="mt-5">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
              <input type="checkbox" checked={data.mailingSameAsPrincipal}
                onChange={(e) => set({ mailingSameAsPrincipal: e.target.checked })}
                className="h-4 w-4 accent-bright-orange-500" />
              Mailing address is the same as the principal office
            </label>
          </div>
          {!data.mailingSameAsPrincipal && (
            <div className="mt-4">
              <Label>Mailing address</Label>
              <AddressFields value={data.mailingAddress} onChange={(a) => set({ mailingAddress: a })} />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            <Field label="Business email" hint="Legalgram account only — not filed with the state.">
              <Input type="email" value={data.businessEmail}
                onChange={(e) => set({ businessEmail: e.target.value })} placeholder="you@business.com" />
            </Field>
            <Field label="Business phone (optional)" hint="Legalgram account only.">
              <Input value={data.businessPhone} onChange={(e) => set({ businessPhone: e.target.value })} />
            </Field>
          </div>
        </div>
      );

    case "agent": {
      const ra = rules?.registeredAgent;
      return (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            A registered agent receives legal and state mail on behalf of your LLC during business hours.
          </p>
          {ra?.sosIsDefaultAgent && (
            <div className={radioCard(data.raChoice === "sos_default") + " mb-3"}
              onClick={() => set({ raChoice: "sos_default" })}>
              <p className="font-semibold text-gray-900">Use the {rules?.name} Secretary of State (default)</p>
              <p className="text-xs text-gray-500">In New York the Secretary of State is your LLC's statutory agent. You just provide an address for forwarded mail.</p>
            </div>
          )}
          <div className={radioCard(data.raChoice === "self") + " mb-3"}
            onClick={() => set({ raChoice: "self" })}>
            <p className="font-semibold text-gray-900">I'll be my own registered agent</p>
            <p className="text-xs text-gray-500">You must have a physical street address in {rules?.name} and be available during business hours.</p>
          </div>
          <div className={radioCard(data.raChoice === "third_party")}
            onClick={() => set({ raChoice: "third_party" })}>
            <p className="font-semibold text-gray-900">Someone else / a service</p>
            <p className="text-xs text-gray-500">Enter their name and {rules?.name} address below.</p>
          </div>

          {data.raChoice && data.raChoice !== "sos_default" && (
            <div className="mt-5 border-t border-gray-100 pt-5">
              {ra?.entityChoice && (
                <Field label="Is the agent an individual or an organization?">
                  <div className="flex gap-2">
                    {["individual", "organization"].map((t) => (
                      <button key={t} type="button"
                        onClick={() => set({ raEntityType: t as LlcFormationData["raEntityType"] })}
                        className={`px-4 py-2 rounded-lg border-2 text-sm capitalize ${data.raEntityType === t
                          ? "border-bright-orange-500 bg-orange-50" : "border-gray-200"}`}>{t}</button>
                    ))}
                  </div>
                </Field>
              )}
              <Field label="Registered agent name">
                <Input value={data.raName} onChange={(e) => set({ raName: e.target.value })} />
              </Field>
              <div className="mb-2">
                <Label hint={`Must be a physical ${rules?.name} street address — no P.O. Box.`}>
                  Registered agent address <PublicTag />
                </Label>
                <AddressFields value={data.raAddress} onChange={(a) => set({ raAddress: a })}
                  stateLocked={rules?.name} />
              </div>
            </div>
          )}

          {data.raChoice && data.raChoice !== "sos_default" && (
            <div className="mt-4 space-y-2">
              <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={data.raAvailabilityAck}
                  onChange={(e) => set({ raAvailabilityAck: e.target.checked })}
                  className="h-4 w-4 mt-0.5 accent-bright-orange-500" />
                I confirm the agent is available at this address during normal business hours.
              </label>
              {ra?.requiresSignature && (
                <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={data.raConsent}
                    onChange={(e) => set({ raConsent: e.target.checked })}
                    className="h-4 w-4 mt-0.5 accent-bright-orange-500" />
                  The agent consents to the appointment. ({rules?.name} requires the agent's signature — a signature line will appear on your documents.)
                </label>
              )}
            </div>
          )}
        </div>
      );
    }

    case "members":
      return (
        <div>
          <Field label="How many members will your LLC have?">
            <div className="grid grid-cols-2 gap-3">
              {[{ v: "single", t: "Single-member", d: "Just me (100% ownership)." },
                { v: "multi", t: "Multi-member", d: "Two or more owners." }].map((o) => (
                <div key={o.v} className={radioCard(data.memberCount === o.v)}
                  onClick={() => {
                    const single = o.v === "single";
                    set({ memberCount: o.v as LlcFormationData["memberCount"],
                      members: single ? [{ ...(data.members[0] ?? emptyMember()), ownershipPct: "100" }] : data.members });
                  }}>
                  <p className="font-semibold text-gray-900">{o.t}</p>
                  <p className="text-xs text-gray-500">{o.d}</p>
                </div>
              ))}
            </div>
          </Field>

          {data.memberCount && (
            <div className="mt-5">
              <Label>Member details</Label>
              {data.members.map((m, i) => (
                <div key={i} className="rounded-xl border border-gray-200 p-4 mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Member {i + 1}</span>
                    {data.memberCount === "multi" && data.members.length > 1 && (
                      <button className="text-xs text-red-500"
                        onClick={() => set({ members: data.members.filter((_, j) => j !== i) })}>Remove</button>
                    )}
                  </div>
                  <Input className="mb-2" placeholder="Full legal name" value={m.name}
                    onChange={(e) => set({ members: data.members.map((x, j) => j === i ? { ...x, name: e.target.value } : x) })} />
                  <Input className="mb-2" placeholder="Address" value={m.address}
                    onChange={(e) => set({ members: data.members.map((x, j) => j === i ? { ...x, address: e.target.value } : x) })} />
                  <div className="grid grid-cols-2 gap-2">
                    {data.memberCount === "multi" && (
                      <Input placeholder="Ownership %" value={m.ownershipPct}
                        onChange={(e) => set({ members: data.members.map((x, j) => j === i ? { ...x, ownershipPct: e.target.value } : x) })} />
                    )}
                    <Input placeholder="Capital contribution (optional)" value={m.contribution}
                      onChange={(e) => set({ members: data.members.map((x, j) => j === i ? { ...x, contribution: e.target.value } : x) })} />
                  </div>
                </div>
              ))}
              {data.memberCount === "multi" && (
                <button className="text-sm font-medium text-bright-orange-600"
                  onClick={() => set({ members: [...data.members, emptyMember()] })}>+ Add another member</button>
              )}
            </div>
          )}

          <div className="mt-6">
            <Field label="How will the LLC be managed?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[{ v: "member_managed", t: "Member-managed", d: "The owners run day-to-day operations." },
                  { v: "manager_managed", t: "Manager-managed", d: "Appointed managers run the company." }].map((o) => (
                  <div key={o.v} className={radioCard(data.managementStructure === o.v)}
                    onClick={() => set({ managementStructure: o.v as LlcFormationData["managementStructure"] })}>
                    <p className="font-semibold text-gray-900">{o.t}</p>
                    <p className="text-xs text-gray-500">{o.d}</p>
                  </div>
                ))}
              </div>
            </Field>
            {data.managementStructure === "manager_managed" && (
              <div className="mt-2">
                <Label>Manager name(s)</Label>
                {data.managers.map((mg, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 mb-2">
                    <Input placeholder="Manager name" value={mg.name}
                      onChange={(e) => set({ managers: data.managers.map((x, j) => j === i ? { ...x, name: e.target.value } : x) })} />
                    <Input placeholder="Manager address" value={mg.address}
                      onChange={(e) => set({ managers: data.managers.map((x, j) => j === i ? { ...x, address: e.target.value } : x) })} />
                  </div>
                ))}
                <button className="text-sm font-medium text-bright-orange-600"
                  onClick={() => set({ managers: [...data.managers, { name: "", address: "" }] })}>+ Add manager</button>
              </div>
            )}
          </div>
        </div>
      );

    case "final":
      return (
        <div>
          <Field label="When should your LLC take effect?" hint={rules?.effectiveDate.note}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className={radioCard(data.effectiveDateType === "immediate")}
                onClick={() => set({ effectiveDateType: "immediate" })}>
                <p className="font-semibold text-gray-900">Immediately on filing</p>
              </div>
              {rules?.effectiveDate.allowsDelayed && (
                <div className={radioCard(data.effectiveDateType === "delayed")}
                  onClick={() => set({ effectiveDateType: "delayed" })}>
                  <p className="font-semibold text-gray-900">On a specific date</p>
                </div>
              )}
            </div>
          </Field>
          {data.effectiveDateType === "delayed" && (
            <Field label="Effective date">
              <Input type="date" value={data.formationDate}
                onChange={(e) => set({ formationDate: e.target.value })} />
            </Field>
          )}
          <Field label="Business purpose"
            hint="A short, plain-English description of what your business does.">
            <textarea className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[80px]"
              value={data.businessPurpose} onChange={(e) => set({ businessPurpose: e.target.value })}
              placeholder="e.g. Freelance graphic design and branding services." />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Primary business activity" hint="Used on your EIN worksheet.">
              <Input value={data.businessActivity} onChange={(e) => set({ businessActivity: e.target.value })}
                placeholder="e.g. Graphic design services" />
            </Field>
            <Field label="Activity category (IRS)">
              <select className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm"
                value={data.businessActivityCategory}
                onChange={(e) => set({ businessActivityCategory: e.target.value })}>
                <option value="">Select…</option>
                {IRS_ACTIVITY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <div className="border-t border-gray-100 pt-4 mt-2">
            <Label hint="The person authorized to sign and file the formation documents.">Organizer</Label>
            <Input className="mb-2" placeholder="Organizer full name" value={data.organizerName}
              onChange={(e) => set({ organizerName: e.target.value })} />
            <Input className="mb-2" placeholder="Organizer address" value={data.organizerAddress}
              onChange={(e) => set({ organizerAddress: e.target.value })} />
            {rules?.organizerNeedsEmail && (
              <Input className="mb-2" type="email" placeholder="Organizer email (required in Wyoming)"
                value={data.organizerEmail} onChange={(e) => set({ organizerEmail: e.target.value })} />
            )}
          </div>
        </div>
      );

    case "operating":
      return (
        <div>
          <p className="text-sm text-gray-600 mb-5">
            These choices customize your Operating Agreement — the private contract that governs how
            your LLC runs. You can keep the recommended defaults.
          </p>
          {[
            { key: "votingThreshold", label: "Voting on major decisions",
              opts: [["majority", "Majority"], ["unanimous", "Unanimous"], ["custom", "Custom %"]] },
            { key: "profitLossMethod", label: "How profits & losses are split",
              opts: [["by_ownership_pct", "By ownership %"], ["custom", "Custom"]] },
            { key: "transferRestrictions", label: "Transferring membership interests",
              opts: [["rofr", "Right of first refusal"], ["unanimous_consent", "Unanimous consent"], ["free_transfer", "Free transfer"]] },
            { key: "buyoutMethod", label: "Buyout price if a member leaves",
              opts: [["fair_market_value", "Fair market value"], ["book_value", "Book value"], ["custom", "Custom"]] },
          ].map((row) => (
            <Field key={row.key} label={row.label}>
              <div className="flex flex-wrap gap-2">
                {row.opts.map(([v, t]) => (
                  <button key={v} type="button" onClick={() => set({ [row.key]: v } as Partial<LlcFormationData>)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium ${(data as unknown as Record<string, string>)[row.key] === v
                      ? "border-bright-orange-500 bg-orange-50 text-bright-orange-700" : "border-gray-200 text-gray-700"}`}>{t}</button>
                ))}
              </div>
            </Field>
          ))}
        </div>
      );

    case "review":
      return <ReviewList data={data} rules={rules} />;

    case "attest":
      return (
        <div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-700 leading-relaxed mb-5">
            Your documents will be generated from the answers you provided. Please confirm they are
            accurate before continuing.
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={data.attestationAccepted}
              onChange={(e) => set({ attestationAccepted: e.target.checked })}
              className="h-5 w-5 mt-0.5 accent-bright-orange-500" />
            <span className="text-sm text-gray-700">
              I confirm the information is accurate. I understand Legalgram is not a law firm and does
              not provide legal advice on my specific situation, and that I am responsible for filing
              the {rules?.articlesLabel ?? "Articles"} with the {rules?.name ?? "state"} myself.
            </span>
          </label>
        </div>
      );

    default: return null;
  }
}

/* helper so the renderer can type `rules` */
function getRules(code: StateCode) { return LLC_STATES[code]; }

/* ── Review list ── */
const Row = ({ label, value, pub }: { label: string; value?: string; pub?: boolean }) => (
  value ? (
    <div className="flex justify-between gap-4 py-2 border-b border-gray-100 text-sm">
      <span className="text-gray-500">{label}{pub && <PublicTag />}</span>
      <span className="text-gray-900 font-medium text-right">{value}</span>
    </div>
  ) : null
);

const ReviewList = ({ data, rules }: { data: LlcFormationData; rules: ReturnType<typeof getRules> | null }) => {
  const addr = (a: Address) => [a.street, a.city, a.state, a.zip].filter(Boolean).join(", ");
  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">Review your answers. Use Back to edit anything.</p>
      <Row label="State" value={rules?.name} />
      <Row label="LLC name" value={`${data.llcName} ${data.designator}`.trim()} />
      <Row label="LLC type" value={data.llcType === "pllc" ? `PLLC — ${data.licensedActivity}` : data.llcType} />
      <Row label="Principal office" pub
        value={rules?.principalAddressStyle === "county_only" ? (data.principalCounty && `${data.principalCounty} County`) : addr(data.principalOffice)} />
      {!data.mailingSameAsPrincipal && <Row label="Mailing address" value={addr(data.mailingAddress)} />}
      <Row label="Registered agent" pub
        value={data.raChoice === "sos_default" ? "Secretary of State (default)" : `${data.raName}${data.raAddress.street ? " — " + addr(data.raAddress) : ""}`} />
      <Row label="Members" value={data.memberCount === "single" ? "Single-member" : `${data.members.length} members`} />
      <Row label="Management" value={data.managementStructure?.replace("_", "-")} />
      <Row label="Effective date" value={data.effectiveDateType === "delayed" ? data.formationDate : "Immediately on filing"} />
      <Row label="Business purpose" value={data.businessPurpose} />
      <Row label="Organizer" value={data.organizerName} />
      <Row label="Business email" value={data.businessEmail} />
    </div>
  );
};

export default FormMyLlc;
