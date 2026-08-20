import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Building2, FileDown, CheckCircle2, Circle, Landmark, Receipt, ShieldCheck,
  BadgeCheck, CalendarClock, ExternalLink, Sparkles, ArrowRight, Clock, FileText,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LLC_STATES, type StateCode } from "@/data/llcRulesEngine";
import type { LlcFormationData } from "@/types/llcFormation";
import { generateLlcZip } from "@/services/llcDocuments";

const STORE = "legalgram_llc_formation";
const PROGRESS = "legalgram_llc_progress";

interface Progress {
  filed: boolean;
  filedDate: string;
  checklist: Record<string, boolean>;
}

const CHECKLIST: { key: string; icon: React.ElementType; title: string; desc: string }[] = [
  { key: "ein", icon: FileText, title: "Get your EIN from the IRS", desc: "Use the EIN Application Worksheet in your package. It's free at irs.gov." },
  { key: "bank", icon: Landmark, title: "Open a business bank account", desc: "Bring your filed Articles and EIN. Keep business and personal funds separate." },
  { key: "tax", icon: Receipt, title: "Register for state tax accounts", desc: "Sales tax, withholding, and any state-specific registrations." },
  { key: "license", icon: BadgeCheck, title: "Obtain required business licenses", desc: "Check local city/county and industry-specific licensing." },
  { key: "boi", icon: ShieldCheck, title: "File your BOI report with FinCEN", desc: "Federal Beneficial Ownership Information report. Required for most new LLCs." },
];

const loadProgress = (): Progress => {
  try { const p = JSON.parse(localStorage.getItem(PROGRESS) || ""); if (p) return p; } catch { /* ignore */ }
  return { filed: false, filedDate: "", checklist: {} };
};

const LlcDashboard = () => {
  const [data, setData] = useState<LlcFormationData | null>(null);
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [downloading, setDownloading] = useState(false);
  const [waitEmail, setWaitEmail] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    try { const d = JSON.parse(localStorage.getItem(STORE) || ""); if (d) setData(d); } catch { /* ignore */ }
  }, []);
  useEffect(() => { localStorage.setItem(PROGRESS, JSON.stringify(progress)); }, [progress]);

  const rules = data?.state ? LLC_STATES[data.state as StateCode] : null;
  const done = useMemo(() => CHECKLIST.filter((c) => progress.checklist[c.key]).length, [progress]);
  const pct = Math.round((done / CHECKLIST.length) * 100);

  const toggle = (key: string) =>
    setProgress((p) => ({ ...p, checklist: { ...p.checklist, [key]: !p.checklist[key] } }));

  const downloadDocuments = async () => {
    if (!data) return;
    setDownloading(true);
    try {
      const blob = await generateLlcZip(data);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(data.llcName || "LLC").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_")}_Formation_Documents.zip`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
      toast.success("Your documents are downloading.");
    } catch { toast.error("Could not generate documents. Please try again."); }
    finally { setDownloading(false); }
  };

  const joinWaitlist = async () => {
    if (!/^\S+@\S+\.\S+$/.test(waitEmail)) { toast.error("Please enter a valid email."); return; }
    try {
      await supabase.from("file_it_for_me_waitlist").insert([{
        email: waitEmail, llc_name: data ? `${data.llcName} ${data.designator}`.trim() : null, state: data?.state || null,
      }]);
    } catch { /* best-effort */ }
    setJoined(true);
    toast.success("You're on the waitlist!");
  };

  /* Empty state — no formation found in this browser. */
  if (!data) {
    return (
      <Layout>
        <Helmet><title>My LLC Dashboard | Legalgram</title></Helmet>
        <div className="container-custom max-w-xl mx-auto py-24 pt-28 text-center">
          <Building2 className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No LLC formation found</h1>
          <p className="text-gray-600 mb-6">Start your LLC formation to unlock your post-formation dashboard.</p>
          <Button variant="orange" asChild><a href="/form-my-llc">Form My LLC <ArrowRight className="h-4 w-4 ml-2" /></a></Button>
        </div>
      </Layout>
    );
  }

  const name = `${data.llcName} ${data.designator}`.trim();

  return (
    <Layout>
      <Helmet><title>{name} — LLC Dashboard | Legalgram</title></Helmet>
      <div className="bg-gradient-to-b from-orange-50/40 to-white min-h-screen pt-24 pb-16">
        <div className="container-custom max-w-4xl mx-auto px-4">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-bright-orange-500 flex items-center justify-center shrink-0">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{name}</h1>
              <p className="text-gray-500 text-sm">{rules?.name} Limited Liability Company · Post-formation dashboard</p>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${progress.filed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
              {progress.filed ? <><CheckCircle2 className="h-4 w-4" /> Filed with state</> : <><Clock className="h-4 w-4" /> Not yet filed</>}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Left column */}
            <div className="md:col-span-2 space-y-5">

              {/* Filing status */}
              <Card icon={FileText} title="Filing status">
                <p className="text-sm text-gray-600 mb-3">
                  Your documents are prepared. Formation is complete once you file your {rules?.articlesLabel} with the {rules?.name} Secretary of State.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant={progress.filed ? "outline" : "orange"} size="sm"
                    onClick={() => setProgress((p) => ({ ...p, filed: !p.filed, filedDate: !p.filed ? new Date().toISOString().slice(0, 10) : "" }))}>
                    {progress.filed ? "Mark as not filed" : "I've filed with the state"}
                  </Button>
                  <a href={rules?.sosUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-bright-orange-600 hover:underline">
                    Open {rules?.name} filing portal <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                {progress.filed && progress.filedDate && (
                  <p className="text-xs text-green-600 mt-2">Marked filed on {progress.filedDate}.</p>
                )}
              </Card>

              {/* Checklist */}
              <Card icon={CheckCircle2} title="Post-formation checklist"
                right={<span className="text-xs font-medium text-gray-500">{done}/{CHECKLIST.length} done</span>}>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-4">
                  <motion.div className="h-full bg-gradient-to-r from-bright-orange-500 to-bright-orange-400"
                    animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
                </div>
                <div className="space-y-2">
                  {CHECKLIST.map((c) => {
                    const on = !!progress.checklist[c.key];
                    return (
                      <button key={c.key} onClick={() => toggle(c.key)}
                        className={`w-full text-left flex items-start gap-3 rounded-xl border p-3 transition-all ${on ? "border-green-200 bg-green-50/60" : "border-gray-200 hover:border-gray-300"}`}>
                        {on ? <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" /> : <Circle className="h-5 w-5 text-gray-300 mt-0.5 shrink-0" />}
                        <span>
                          <span className={`block text-sm font-semibold ${on ? "text-green-800 line-through" : "text-gray-900"}`}>{c.title}</span>
                          <span className="block text-xs text-gray-500">{c.desc}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* File It For Me — Coming Soon */}
              <Card icon={Sparkles} title="File It For Me" right={<span className="text-[10px] font-bold uppercase tracking-wide text-bright-orange-600 bg-bright-orange-100 px-2 py-0.5 rounded-full">Coming soon</span>}>
                <p className="text-sm text-gray-600 mb-3">
                  Prefer we file with the state on your behalf? Join the waitlist and we'll let you know the moment it launches.
                </p>
                {joined ? (
                  <p className="text-sm font-medium text-green-700 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> You're on the waitlist — we'll be in touch.</p>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input type="email" placeholder="you@business.com" value={waitEmail}
                      onChange={(e) => setWaitEmail(e.target.value)} className="flex-1" />
                    <Button variant="orange" onClick={joinWaitlist}>Join Waitlist</Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Documents */}
              <Card icon={FileDown} title="Your documents">
                <ul className="text-sm text-gray-600 space-y-1.5 mb-4">
                  <li className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-bright-orange-500" /> {rules?.articlesLabel}</li>
                  <li className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-bright-orange-500" /> Operating Agreement</li>
                  <li className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-bright-orange-500" /> Filing Instructions</li>
                  <li className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-bright-orange-500" /> EIN Worksheet</li>
                </ul>
                <Button variant="orange" className="w-full" onClick={downloadDocuments} disabled={downloading}>
                  {downloading ? "Preparing…" : "Download all (ZIP)"}
                </Button>
              </Card>

              {/* BOI notice */}
              <Card icon={ShieldCheck} title="Beneficial Ownership (BOI)">
                <p className="text-sm text-gray-600">
                  Most new LLCs must file a Beneficial Ownership Information report with FinCEN. There is no fee to file directly at
                  <a href="https://www.fincen.gov/boi" target="_blank" rel="noopener noreferrer" className="text-bright-orange-600 hover:underline"> fincen.gov/boi</a>.
                  Missing the deadline can carry penalties.
                </p>
              </Card>

              {/* Compliance reminders */}
              <Card icon={CalendarClock} title="Ongoing compliance">
                <p className="text-sm text-gray-600">{rules?.ongoingCompliance}</p>
                {rules?.postFiling && (
                  <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3">
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">{rules.postFiling.title}</p>
                    <p className="text-xs text-amber-900 leading-relaxed">{rules.postFiling.body}</p>
                  </div>
                )}
              </Card>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-8 max-w-xl mx-auto">
            Legalgram is not a law firm and does not provide legal advice. State filing fees are paid directly to your state.
          </p>
        </div>
      </div>
    </Layout>
  );
};

/* Small card wrapper */
const Card = ({ icon: Icon, title, right, children }: {
  icon: React.ElementType; title: string; right?: React.ReactNode; children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
          <Icon className="h-4 w-4 text-bright-orange-600" />
        </div>
        <h2 className="font-bold text-gray-900">{title}</h2>
      </div>
      {right}
    </div>
    {children}
  </div>
);

export default LlcDashboard;
