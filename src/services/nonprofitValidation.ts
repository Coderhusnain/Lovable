/* ────────────────────────────────────────────────────────────────
   Nonprofit Formation — per-phase validation (spec slides 1–6).
   Errors block "Continue"; warnings are soft (show, but allow proceeding).
   ──────────────────────────────────────────────────────────────── */

import {
  getNpStateRules,
  isSupportedState,
  routePurpose,
} from "@/data/nonprofitRulesEngine";
import type { Address, NonprofitFormationData } from "@/types/nonprofitFormation";

export interface PhaseResult {
  errors: string[];
  warnings: string[];
  /** Non-null when the answers must route out of the DIY flow. */
  route?: { to: "waitlist" | "attorney"; reason: string };
}

const ok = (): PhaseResult => ({ errors: [], warnings: [] });

/** True if an address looks like a PO Box (blocked in most states). */
export function isPoBox(a: Address): boolean {
  return /\bp\.?\s*o\.?\s*box\b|\bpost\s*office\s*box\b/i.test(a.street || "");
}

function addressComplete(a: Address): boolean {
  return Boolean(a.street && a.city && a.state && a.zip);
}

export function validatePhase0(d: NonprofitFormationData): PhaseResult {
  const r = ok();
  if (!d.acknowledgedNotALawFirm) {
    r.errors.push('Please check "I understand" to continue.');
  }
  return r;
}

export function validatePhase1(d: NonprofitFormationData): PhaseResult {
  const r = ok();
  if (!d.state || !isSupportedState(d.state)) {
    r.errors.push("Please choose a state we currently support.");
  }
  if (!d.nameFirstChoice.trim()) r.errors.push("Enter your nonprofit's first-choice name.");
  if (!d.nameBackup1.trim()) r.errors.push("Enter at least one backup name (states often reject the first choice).");
  // This flow is corporations only — never an LLC designator.
  if (/l\.?\s*l\.?\s*c\.?/i.test(d.nameFirstChoice)) {
    r.errors.push('A nonprofit is a corporation, not an "LLC". Remove "LLC" from the name.');
  }
  if (!addressComplete(d.principalOffice)) r.errors.push("Enter the full principal office address.");
  else if (isPoBox(d.principalOffice)) r.errors.push("The principal office cannot be a PO Box — use a physical street address.");
  if (!d.mailingSameAsPrincipal && !addressComplete(d.mailingAddress)) {
    r.errors.push("Enter the full mailing address, or check “same as principal”.");
  }
  if (!d.phone.trim()) r.errors.push("Enter a phone number.");
  if (!/^\S+@\S+\.\S+$/.test(d.email)) r.errors.push("Enter a valid email address.");
  if (getNpStateRules(d.state as any)?.requiresOfficeCounty && !d.nyOfficeCounty.trim()) {
    r.errors.push("New York requires the county where your office is located (Article FIFTH).");
  }
  return r;
}

export function validatePhase2(d: NonprofitFormationData): PhaseResult {
  const r = ok();
  if (d.registeredAgentType === "legalgram_service") {
    // Not live — collect intent, but the customer must pick an individual to continue.
    r.route = {
      to: "waitlist",
      reason: "Legalgram's registered-agent service isn't live yet. Choose an individual agent to continue, and we'll notify you when the service launches.",
    };
    r.errors.push("Select an individual registered agent to continue.");
    return r;
  }
  if (!d.registeredAgentName.trim()) r.errors.push("Enter the registered agent's full legal name.");
  if (!addressComplete(d.registeredAgentAddress)) r.errors.push("Enter the registered agent's physical address.");
  else if (isPoBox(d.registeredAgentAddress)) r.errors.push("The registered agent address cannot be a PO Box.");
  // Agent must be in the state of incorporation.
  if (d.registeredAgentAddress.state && d.registeredAgentAddress.state.toUpperCase() !== d.state) {
    r.errors.push(`The registered agent must be located in ${d.state} (the state of incorporation).`);
  }
  if (!d.registeredAgentAvailabilityAck) {
    r.errors.push("Confirm the agent is available Monday–Friday, 9am–5pm to accept service of process.");
  }
  return r;
}

export function validatePhase3(d: NonprofitFormationData): PhaseResult {
  const r = ok();
  const rules = getNpStateRules(d.state);
  const minDirectors = rules?.minDirectors ?? 3;

  if (d.incorporators.length < 1 || !d.incorporators[0]?.name.trim()) {
    r.errors.push("Add at least one incorporator (the person who signs and files the Articles).");
  }
  d.incorporators.forEach((inc, i) => {
    if (inc.name.trim() && !inc.address.trim()) r.errors.push(`Add an address for incorporator ${i + 1}.`);
  });

  if (d.directors.length < minDirectors) {
    r.errors.push(`${rules.name} nonprofits applying for 501(c)(3) need at least ${minDirectors} directors.`);
  }
  if (d.directors.length > 15) {
    r.warnings.push("Is this correct? Most nonprofits have 3–9 directors.");
  }
  d.directors.forEach((dir, i) => {
    if (!dir.name.trim() || !dir.address.trim() || !dir.position) {
      r.errors.push(`Director ${i + 1} needs a name, address, and position — no blank rows.`);
    }
  });

  if (d.directorTermYears < 1) r.errors.push("Enter a director term length of at least 1 year.");
  return r;
}

export function validatePhase4(d: NonprofitFormationData): PhaseResult {
  const r = ok();
  if (d.purposes.length < 1) r.errors.push("Select at least one charitable purpose.");
  if (!d.missionStatement.trim()) {
    r.errors.push("Describe your mission — this text goes verbatim into your Articles.");
  } else if (d.missionStatement.trim().length < 150) {
    r.warnings.push(
      "Add more detail — describe who you serve, what activities you'll do, and how they accomplish an exempt purpose (aim for 2–4 sentences).",
    );
  }
  if (!d.apply501c3) {
    r.warnings.push("Without 501(c)(3) status your organization is not eligible for tax-deductible donations.");
  }
  // Purpose routing (CA public-benefit-only, NY §404 pre-approval).
  const routing = routePurpose(d.state, d.purposes);
  if (!routing.ok) r.route = { to: routing.route, reason: routing.reason };
  return r;
}

export function validatePhase5(d: NonprofitFormationData): PhaseResult {
  const r = ok();
  const rules = getNpStateRules(d.state);
  const minDirectors = rules?.minDirectors ?? 3;

  if (d.directors.length < minDirectors) {
    r.errors.push(`You now have fewer than ${minDirectors} directors — go back and add more.`);
  }
  const { presidentId, secretaryId } = d.officers;
  if (!presidentId) r.errors.push("Assign a President from your directors.");
  if (!secretaryId) r.errors.push("Assign a Secretary from your directors.");
  if (presidentId && secretaryId && presidentId === secretaryId) {
    r.errors.push("The President and Secretary must be two different people.");
  }
  // Officers must be drawn from the Phase-3 director list.
  const ids = new Set(d.directors.map((x) => x.id));
  (["presidentId", "vicePresidentId", "secretaryId", "treasurerId"] as const).forEach((k) => {
    const v = d.officers[k];
    if (v && !ids.has(v)) r.errors.push("Officers must be chosen from your list of directors.");
  });
  if (d.fiscalYearKind === "custom") {
    r.warnings.push("The IRS expects a calendar year for most first-time 501(c)(3) applicants unless there's a business reason.");
  }
  return r;
}

export const PHASE_VALIDATORS = [
  validatePhase0,
  validatePhase1,
  validatePhase2,
  validatePhase3,
  validatePhase4,
  validatePhase5,
];
