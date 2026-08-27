import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  IRS_PURPOSES, NONPROFIT_PRICE_USD, getNpStateRules, getSelectableStates,
  type IrsPurpose, type NpStateCode,
} from "@/data/nonprofitRulesEngine";
import {
  createEmptyNonprofitFormation, emptyAddress,
  type Address, type Director, type NonprofitFormationData,
} from "@/types/nonprofitFormation";
import { buildMergeData } from "@/services/nonprofitMerge";
import { generateNonprofitZip } from "@/services/nonprofitDocuments";
import {
  validatePhase0, validatePhase1, validatePhase2, validatePhase3,
  validatePhase4, validatePhase5, type PhaseResult,
} from "@/services/nonprofitValidation";
import { startNonprofitCheckout } from "@/services/checkout";

const STORE = "legalgram_nonprofit_formation";

/* ── Field helpers ─────────────────────────────────────── */
const Label = ({ children, hint }: { children: React.ReactNode; hint?: string }) => (
  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
    {children}
    {hint && <span className="block text-xs font-normal text-gray-500 mt-0.5">{hint}</span>}
  </label>
);
const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div className="mb-4"><Label hint={hint}>{label}</Label>{children}</div>
);
const AddressFields = ({ value, onChange }: { value: Address; onChange: (a: Address) => void }) => (
  <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
    <Input className="sm:col-span-6" placeholder="Street address (no PO Box)" value={value.street} onChange={(e) => onChange({ ...value, street: e.target.value })} />
    <Input className="sm:col-span-3" placeholder="City" value={value.city} onChange={(e) => onChange({ ...value, city: e.target.value })} />
    <Input className="sm:col-span-2" placeholder="State" value={value.state} onChange={(e) => onChange({ ...value, state: e.target.value })} />
    <Input className="sm:col-span-1" placeholder="ZIP" value={value.zip} onChange={(e) => onChange({ ...value, zip: e.target.value })} />
  </div>
);
const sel = "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-bright-orange-500";

type StepId = "ack" | "entity" | "agent" | "board" | "purpose" | "governance" | "review" | "attest";
const STEPS: { id: StepId; title: string }[] = [
  { id: "ack", title: "Before You Start" },
  { id: "entity", title: "Entity Basics" },
  { id: "agent", title: "Registered Agent" },
  { id: "board", title: "Incorporators & Board" },
  { id: "purpose", title: "Purpose & 501(c)(3)" },
  { id: "governance", title: "Governance" },
  { id: "review", title: "Review" },
  { id: "attest", title: "Confirm & Continue" },
];
const VALIDATORS: Partial<Record<StepId, (d: NonprofitFormationData) => PhaseResult>> = {
  ack: validatePhase0, entity: validatePhase1, agent: validatePhase2,
  board: validatePhase3, purpose: validatePhase4, governance: validatePhase5,
};
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const FormMyNonprofit = () => {
  const [data, setData] = useState<NonprofitFormationData>(createEmptyNonprofitFormation());
  const [stepIdx, setStepIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [route, setRoute] = useState<{ to: "waitlist" | "attorney"; reason: string } | null>(null);
  const [waitEmail, setWaitEmail] = useState("");

  const patch = (p: Partial<NonprofitFormationData>) => setData((d) => ({ ...d, ...p }));

  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem(STORE) || ""); if (saved) setData(saved); } catch { /* ignore */ }
    if (new URLSearchParams(window.location.search).get("payment") === "success") {
      try { const saved = JSON.parse(localStorage.getItem(STORE) || ""); if (saved) setData(saved); } catch { /* ignore */ }
      setSubmitted(true);
    }
  }, []);

  const rules = useMemo(() => getNpStateRules(data.state), [data.state]);
  const step = STEPS[stepIdx];

  const downloadDocuments = async () => {
    setDownloading(true);
    try {
      const merge = buildMergeData(data, { generatedAt: new Date() });
      const blob = await generateNonprofitZip(merge, data.state as NpStateCode);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(data.nameFirstChoice || "Nonprofit").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_")}_Formation_Documents.zip`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
      toast.success("Your documents are downloading.");
    } catch (e) {
      toast.error("Couldn't build the documents. Please try again.");
    } finally { setDownloading(false); }
  };

  const joinWaitlist = () => {
    if (!/^\S+@\S+\.\S+$/.test(waitEmail)) { toast.error("Enter a valid email."); return; }
    try {
      const list = JSON.parse(localStorage.getItem("legalgram_nonprofit_waitlist") || "[]");
      list.push({ email: waitEmail, state: data.state, at: new Date().toISOString() });
      localStorage.setItem("legalgram_nonprofit_waitlist", JSON.stringify(list));
    } catch { /* ignore */ }
    toast.success("Thanks — we'll notify you when this is available.");
    setWaitEmail("");
  };

  const runValidator = (id: StepId): PhaseResult => {
    const v = VALIDATORS[id];
    return v ? v(data) : { errors: [], warnings: [] };
  };

  const next = () => {
    setErrors([]); setWarnings([]); setRoute(null);
    const res = runValidator(step.id);
    if (res.route) { setRoute(res.route); }
    if (res.errors.length) { setErrors(res.errors); setWarnings(res.warnings); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setWarnings(res.warnings);
    if (step.id === "attest") { void handleSubmit(); return; }
    try { localStorage.setItem(STORE, JSON.stringify(data)); } catch { /* ignore */ }
    setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => { setErrors([]); setWarnings([]); setRoute(null); setStepIdx((i) => Math.max(i - 1, 0)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleSubmit = async () => {
    // Re-validate every phase before payment.
    for (const [id, v] of Object.entries(VALIDATORS)) {
      const res = (v as (d: NonprofitFormationData) => PhaseResult)(data);
      if (res.route) { setRoute(res.route); toast.error("Please resolve the highlighted item before continuing."); return; }
      if (res.errors.length) {
        const idx = STEPS.findIndex((s) => s.id === (id as StepId));
        setStepIdx(idx); setErrors(res.errors); toast.error("Please complete the required fields."); return;
      }
    }
    try { localStorage.setItem(STORE, JSON.stringify(data)); } catch { /* ignore */ }
    setPaying(true);
    const res = await startNonprofitCheckout({ email: data.email || undefined });
    if (!res.ok) { setPaying(false); toast.error(res.error || "Couldn't start checkout."); }
  };

  /* ── Success / download screen ─────────────────────────── */
  if (submitted) {
    return (
      <Layout>
        <Helmet><title>Request Received | Form My Nonprofit | Legalgram</title></Helmet>
        <section className="pt-24 pb-16 min-h-[70vh]">
          <div className="container-custom max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-green-600 mb-3">Payment Received</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your nonprofit documents are ready</h1>
            <p className="text-gray-600 mb-2">We've prepared your 6-document package for <strong>{data.nameFirstChoice} {data.designator}</strong> ({rules?.name}).</p>
            <p className="text-gray-600 mb-8">Bylaws, Conflict of Interest Policy, Initial Board Meeting Minutes, EIN Worksheet, your state's {rules?.articlesLabel}, and your state Filing Checklist.</p>
            <Button variant="orange" onClick={downloadDocuments} disabled={downloading} className="px-6">
              {downloading ? "Preparing documents…" : "Download My 6 Documents"}
            </Button>
            <div className="mt-8 text-left bg-amber-50 border-l-[4px] border-l-amber-500 rounded-lg p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700 mb-1">Important</p>
              <p className="text-sm text-amber-900">State incorporation and IRS 501(c)(3) status are two separate steps. After your state approves your filing, you must file IRS Form 1023 (or 1023-EZ) within 27 months of the end of the month of incorporation to obtain retroactive tax-exempt status. Legalgram is not a law firm and does not provide legal or tax advice.</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  /* ── Step content ──────────────────────────────────────── */
  const supported = getSelectableStates();
  const setDirector = (i: number, p: Partial<Director>) =>
    patch({ directors: data.directors.map((d, idx) => (idx === i ? { ...d, ...p } : d)) });
  const addDirector = () =>
    patch({ directors: [...data.directors, { id: `d${Date.now()}`, name: "", address: "", position: "Director" }] });
  const removeDirector = (i: number) =>
    patch({ directors: data.directors.filter((_, idx) => idx !== i) });

  const content = () => {
    switch (step.id) {
      case "ack":
        return (
          <div>
            <div className="bg-amber-50 border-l-[4px] border-l-amber-500 rounded-lg p-5 mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700 mb-2">⚠ Before you start</p>
              <p className="text-sm text-amber-900 mb-2">Forming a nonprofit corporation with your state and obtaining <strong>501(c)(3) tax-exempt status</strong> from the IRS are <strong>two separate processes</strong>.</p>
              <p className="text-sm text-amber-900 mb-2">This flow handles <strong>state incorporation</strong> and prepares the documents you'll need for your IRS Form 1023 application. You'll file Form 1023 with the IRS separately.</p>
              <p className="text-sm text-amber-800 italic">By continuing, you acknowledge that Legalgram is not a law firm and does not provide legal or tax advice.</p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 h-4 w-4" checked={data.acknowledgedNotALawFirm}
                onChange={(e) => patch({ acknowledgedNotALawFirm: e.target.checked, acknowledgedAt: e.target.checked ? new Date().toISOString() : null })} />
              <span className="text-sm font-semibold text-gray-800">I understand.</span>
            </label>
          </div>
        );
      case "entity":
        return (
          <div>
            <Field label="State of incorporation" hint="Only states we currently support are shown. Not listed? Join the waitlist below.">
              <select className={sel} value={data.state} onChange={(e) => patch({ state: e.target.value as NpStateCode })}>
                {supported.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
              </select>
            </Field>
            <div className="mb-5 rounded-lg border border-gray-200 p-4 bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Don't see your state? We'll notify you when it's added.</p>
              <div className="flex gap-2">
                <Input placeholder="you@example.org" value={waitEmail} onChange={(e) => setWaitEmail(e.target.value)} />
                <Button variant="outline" onClick={joinWaitlist} className="whitespace-nowrap">Notify me</Button>
              </div>
            </div>
            <Field label="Nonprofit name — first choice"><Input value={data.nameFirstChoice} onChange={(e) => patch({ nameFirstChoice: e.target.value })} placeholder="e.g. Bright Futures" /></Field>
            <Field label="Backup name 1"><Input value={data.nameBackup1} onChange={(e) => patch({ nameBackup1: e.target.value })} /></Field>
            <Field label="Backup name 2 (optional)"><Input value={data.nameBackup2} onChange={(e) => patch({ nameBackup2: e.target.value })} /></Field>
            <Field label="Designator" hint="A nonprofit is a corporation, never an LLC.">
              <select className={sel} value={data.designator} onChange={(e) => patch({ designator: e.target.value as NonprofitFormationData["designator"] })}>
                <option value="Inc.">Inc.</option><option value="Corporation">Corporation</option>
                <option value="Corp.">Corp.</option><option value="">(none, if state permits)</option>
              </select>
            </Field>
            <Field label="Principal office address" hint="Physical address (not a PO Box in most states)."><AddressFields value={data.principalOffice} onChange={(a) => patch({ principalOffice: a })} /></Field>
            <label className="flex items-center gap-2 mb-4 text-sm">
              <input type="checkbox" checked={data.mailingSameAsPrincipal} onChange={(e) => patch({ mailingSameAsPrincipal: e.target.checked })} /> Mailing address same as principal
            </label>
            {!data.mailingSameAsPrincipal && <Field label="Mailing address"><AddressFields value={data.mailingAddress} onChange={(a) => patch({ mailingAddress: a })} /></Field>}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Phone"><Input value={data.phone} onChange={(e) => patch({ phone: e.target.value })} /></Field>
              <Field label="Email"><Input value={data.email} onChange={(e) => patch({ email: e.target.value })} /></Field>
            </div>
            {rules?.requiresOfficeCounty && (
              <Field label="Office county (New York — Article FIFTH)"><Input value={data.nyOfficeCounty} onChange={(e) => patch({ nyOfficeCounty: e.target.value })} placeholder="e.g. New York" /></Field>
            )}
          </div>
        );
      case "agent":
        return (
          <div>
            <Field label="Registered agent">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm"><input type="radio" checked={data.registeredAgentType === "individual"} onChange={() => patch({ registeredAgentType: "individual" })} /> An individual (director, officer, or founder)</label>
                <label className="flex items-center gap-2 text-sm"><input type="radio" checked={data.registeredAgentType === "legalgram_service"} onChange={() => patch({ registeredAgentType: "legalgram_service" })} /> Legalgram's registered-agent service (waitlist)</label>
              </div>
            </Field>
            {data.registeredAgentType === "individual" && (
              <>
                <Field label="Registered agent full legal name"><Input value={data.registeredAgentName} onChange={(e) => patch({ registeredAgentName: e.target.value })} /></Field>
                <Field label={`Physical address in ${rules?.name} (not a PO Box)`}><AddressFields value={data.registeredAgentAddress} onChange={(a) => patch({ registeredAgentAddress: a })} /></Field>
                {rules?.requiresRegisteredAgentCounty && (
                  <Field label="Registered agent county (Delaware — Article II)"><Input value={data.registeredAgentCounty} onChange={(e) => patch({ registeredAgentCounty: e.target.value })} placeholder="New Castle / Kent / Sussex" /></Field>
                )}
                <label className="flex items-start gap-2 text-sm mb-2"><input type="checkbox" className="mt-1" checked={data.registeredAgentAvailabilityAck} onChange={(e) => patch({ registeredAgentAvailabilityAck: e.target.checked })} /> The agent is available Monday–Friday, 9am–5pm to accept service of process.</label>
              </>
            )}
          </div>
        );
      case "board":
        return (
          <div>
            <Label hint="The person(s) who sign and file the Articles. The first incorporator is used on the state form; others can sign the physical Articles by hand.">Incorporator(s)</Label>
            {data.incorporators.map((inc, i) => (
              <div key={i} className="grid sm:grid-cols-2 gap-3 mb-3">
                <Input placeholder="Full legal name" value={inc.name} onChange={(e) => patch({ incorporators: data.incorporators.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x) })} />
                <div className="flex gap-2">
                  <Input placeholder="Address" value={inc.address} onChange={(e) => patch({ incorporators: data.incorporators.map((x, idx) => idx === i ? { ...x, address: e.target.value } : x) })} />
                  {data.incorporators.length > 1 && <Button variant="outline" onClick={() => patch({ incorporators: data.incorporators.filter((_, idx) => idx !== i) })}>×</Button>}
                </div>
              </div>
            ))}
            <Button variant="outline" className="mb-6" onClick={() => patch({ incorporators: [...data.incorporators, { name: "", address: "" }] })}>+ Add incorporator</Button>

            <Label hint={`Minimum ${rules?.minDirectors ?? 3} directors for 501(c)(3). Most nonprofits have 3–9.`}>Board of directors</Label>
            {data.directors.map((d, i) => (
              <div key={d.id} className="grid sm:grid-cols-12 gap-2 mb-3">
                <Input className="sm:col-span-4" placeholder="Full legal name" value={d.name} onChange={(e) => setDirector(i, { name: e.target.value })} />
                <Input className="sm:col-span-4" placeholder="Address" value={d.address} onChange={(e) => setDirector(i, { address: e.target.value })} />
                <select className={`${sel} sm:col-span-3`} value={d.position} onChange={(e) => setDirector(i, { position: e.target.value as Director["position"] })}>
                  {["President", "Vice President", "Secretary", "Treasurer", "Director"].map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {data.directors.length > 1 && <Button variant="outline" className="sm:col-span-1" onClick={() => removeDirector(i)}>×</Button>}
              </div>
            ))}
            <Button variant="outline" className="mb-6" onClick={addDirector}>+ Add director</Button>
            <Field label="Director term length (years)"><Input type="number" min={1} value={data.directorTermYears} onChange={(e) => patch({ directorTermYears: Number(e.target.value) || 1 })} className="max-w-[120px]" /></Field>
          </div>
        );
      case "purpose":
        return (
          <div>
            <Label hint="Select all that apply (the 8 IRS-recognized 501(c)(3) categories).">Primary charitable purpose</Label>
            <div className="grid sm:grid-cols-2 gap-2 mb-5">
              {IRS_PURPOSES.map((p) => (
                <label key={p.value} className="flex items-center gap-2 text-sm border border-gray-200 rounded-md px-3 py-2 cursor-pointer">
                  <input type="checkbox" checked={data.purposes.includes(p.value)}
                    onChange={(e) => patch({ purposes: e.target.checked ? [...data.purposes, p.value] : data.purposes.filter((x) => x !== p.value) as IrsPurpose[] })} />
                  {p.label}
                </label>
              ))}
            </div>
            <Field label="Describe your mission" hint="This text goes verbatim into your Articles as the purpose clause. Aim for 2–4 sentences.">
              <textarea className={`${sel} min-h-[110px]`} value={data.missionStatement} onChange={(e) => patch({ missionStatement: e.target.value })} />
            </Field>
            <Field label="Do you plan to apply for 501(c)(3) tax-exempt status?">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm"><input type="radio" checked={data.apply501c3} onChange={() => patch({ apply501c3: true })} /> Yes</label>
                <label className="flex items-center gap-2 text-sm"><input type="radio" checked={!data.apply501c3} onChange={() => patch({ apply501c3: false })} /> No</label>
              </div>
            </Field>
            <Field label="Will you have voting members (in addition to directors)?" hint="Most nonprofits do NOT have voting members.">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm"><input type="radio" checked={!data.hasVotingMembers} onChange={() => patch({ hasVotingMembers: false })} /> No</label>
                <label className="flex items-center gap-2 text-sm"><input type="radio" checked={data.hasVotingMembers} onChange={() => patch({ hasVotingMembers: true })} /> Yes</label>
              </div>
            </Field>
          </div>
        );
      case "governance": {
        const officerSel = (key: keyof NonprofitFormationData["officers"], label: string, optional = false) => (
          <Field label={label}>
            <select className={sel} value={data.officers[key]} onChange={(e) => patch({ officers: { ...data.officers, [key]: e.target.value } })}>
              <option value="">{optional ? "(none)" : "Select a director…"}</option>
              {data.directors.map((d) => <option key={d.id} value={d.id}>{d.name || "(unnamed director)"}</option>)}
            </select>
          </Field>
        );
        return (
          <div>
            <Field label="Fiscal year">
              <div className="flex gap-4 mb-2">
                <label className="flex items-center gap-2 text-sm"><input type="radio" checked={data.fiscalYearKind === "calendar"} onChange={() => patch({ fiscalYearKind: "calendar" })} /> Calendar year (Jan–Dec)</label>
                <label className="flex items-center gap-2 text-sm"><input type="radio" checked={data.fiscalYearKind === "custom"} onChange={() => patch({ fiscalYearKind: "custom" })} /> Custom</label>
              </div>
              {data.fiscalYearKind === "custom" && (
                <select className={`${sel} max-w-[220px]`} value={data.fiscalYearEndMonth} onChange={(e) => patch({ fiscalYearEndMonth: Number(e.target.value) })}>
                  {MONTHS.map((mn, i) => <option key={mn} value={i + 1}>Ends {mn}</option>)}
                </select>
              )}
            </Field>
            <Label hint="President and Secretary cannot be the same person.">Initial officers (from your directors)</Label>
            {officerSel("presidentId", "President")}
            {officerSel("vicePresidentId", "Vice President (optional)", true)}
            {officerSel("secretaryId", "Secretary")}
            {officerSel("treasurerId", "Treasurer")}
            <Field label="Board meeting frequency">
              <select className={sel} value={data.boardMeetingFrequency} onChange={(e) => patch({ boardMeetingFrequency: e.target.value as NonprofitFormationData["boardMeetingFrequency"] })}>
                {["Monthly", "Quarterly", "Semi-annual", "Annual"].map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Quorum requirement">
              <select className={sel} value={data.quorum} onChange={(e) => patch({ quorum: e.target.value as NonprofitFormationData["quorum"] })}>
                {["Majority", "Two-thirds", "All"].map((q) => <option key={q} value={q}>{q} of directors</option>)}
              </select>
            </Field>
          </div>
        );
      }
      case "review": {
        const row = (k: string, v: string) => (<div className="flex justify-between gap-4 py-1.5 border-b border-gray-100 text-sm"><span className="text-gray-500">{k}</span><span className="text-gray-900 text-right font-medium">{v || "—"}</span></div>);
        return (
          <div>
            <p className="text-gray-600 mb-4">Review your answers. You can go back to edit anything before payment.</p>
            {row("State", rules?.name || data.state)}
            {row("Name", `${data.nameFirstChoice} ${data.designator}`)}
            {row("Principal office", [data.principalOffice.street, data.principalOffice.city, data.principalOffice.state, data.principalOffice.zip].filter(Boolean).join(", "))}
            {row("Registered agent", data.registeredAgentName)}
            {row("Directors", String(data.directors.length))}
            {row("Purposes", data.purposes.map((p) => IRS_PURPOSES.find((x) => x.value === p)?.label).join(", "))}
            {row("Apply for 501(c)(3)", data.apply501c3 ? "Yes" : "No")}
            {row("Voting members", data.hasVotingMembers ? "Yes" : "No")}
            {row("Fiscal year", data.fiscalYearKind === "calendar" ? "Calendar (Dec 31)" : `Ends ${MONTHS[data.fiscalYearEndMonth - 1]}`)}
          </div>
        );
      }
      case "attest":
        return (
          <div>
            <div className="rounded-lg border border-gray-200 p-5 mb-5">
              <p className="text-sm text-gray-700 mb-3">Your package includes <strong>6 documents</strong>: Bylaws, Conflict of Interest Policy, Initial Board Meeting Minutes, EIN Application Worksheet, your state's {rules?.articlesLabel}, and your state Filing Checklist.</p>
              <p className="text-sm text-gray-700">Meeting-related dates are left blank for you to fill after you hold your initial board meeting.</p>
            </div>
            {rules?.filingNote && <div className="rounded-lg bg-blue-50 border-l-[4px] border-l-blue-500 p-4 mb-5 text-sm text-blue-900">{rules.filingNote}</div>}
            <p className="text-2xl font-bold text-gray-900 mb-1">${NONPROFIT_PRICE_USD} <span className="text-base font-normal text-gray-500">+ state filing fee</span></p>
            <p className="text-sm text-gray-600">You'll pay securely with Stripe, then download your documents immediately.</p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Form My Nonprofit | DIY Nonprofit Formation | Legalgram</title>
        <meta name="description" content="Form your nonprofit corporation in minutes. Legalgram prepares your Bylaws, Conflict of Interest Policy, board minutes, EIN worksheet, and your state's Articles and filing checklist." />
      </Helmet>
      <section className="pt-24 pb-16 bg-gradient-to-b from-rocket-gray-50 to-white min-h-screen">
        <div className="container-custom max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bright-orange-600 mb-2">Start a Business · Nonprofit</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Form Your Nonprofit</h1>

          {/* progress */}
          <div className="flex flex-wrap gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s.id} className={`text-xs px-3 py-1.5 rounded-full border ${i === stepIdx ? "bg-bright-orange-500 text-white border-bright-orange-500" : i < stepIdx ? "bg-bright-orange-50 text-bright-orange-700 border-bright-orange-200" : "bg-white text-gray-500 border-gray-200"}`}>
                {String(i + 1).padStart(2, "0")} {s.title}
              </div>
            ))}
          </div>

          <motion.div key={step.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 border-t-[3px] border-t-bright-orange-500 shadow-sm p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">{step.title}</h2>

            {errors.length > 0 && (
              <div className="rounded-lg bg-red-50 border-l-[4px] border-l-red-500 p-4 mb-5">
                {errors.map((e, i) => <p key={i} className="text-sm text-red-800">• {e}</p>)}
              </div>
            )}
            {warnings.length > 0 && errors.length === 0 && (
              <div className="rounded-lg bg-amber-50 border-l-[4px] border-l-amber-500 p-4 mb-5">
                {warnings.map((w, i) => <p key={i} className="text-sm text-amber-800">• {w}</p>)}
              </div>
            )}
            {route && (
              <div className="rounded-lg bg-blue-50 border-l-[4px] border-l-blue-500 p-4 mb-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700 mb-1">{route.to === "attorney" ? "Attorney assistance recommended" : "Coming soon in your state"}</p>
                <p className="text-sm text-blue-900 mb-3">{route.reason}</p>
                <div className="flex gap-2">
                  <Input placeholder="you@example.org" value={waitEmail} onChange={(e) => setWaitEmail(e.target.value)} />
                  <Button variant="outline" onClick={joinWaitlist} className="whitespace-nowrap">Notify me</Button>
                </div>
              </div>
            )}

            {content()}

            <div className="flex items-center justify-between mt-8">
              <Button variant="ghost" onClick={back} disabled={stepIdx === 0}>Back</Button>
              <Button variant="orange" onClick={next} disabled={paying} className="px-6">
                {step.id === "attest" ? (paying ? "Redirecting to payment…" : `Pay $${NONPROFIT_PRICE_USD} & Get My Documents`) : "Continue"}
              </Button>
            </div>
          </motion.div>

          <p className="text-xs text-gray-400 text-center mt-6">Legalgram is not a law firm and does not provide legal or tax advice. State incorporation and IRS 501(c)(3) status are separate processes.</p>
        </div>
      </section>
    </Layout>
  );
};

export default FormMyNonprofit;
