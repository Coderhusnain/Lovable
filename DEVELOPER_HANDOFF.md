# Legalgram — Developer Handoff

Onboarding guide for the next developer. Live site: **https://legalgram.co**
(auto-deploys from the `main` branch on Vercel — every push to `main` goes live).

---

## 1. Tech stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui + framer-motion
- **Routing:** react-router-dom (single-page app; all routes in `src/App.tsx`)
- **Backend:** Supabase — Postgres (with RLS), Auth, and **Edge Functions** (Deno/TypeScript)
- **Payments:** Stripe (hosted Checkout + Customer Portal), called only from edge functions
- **Email:** Supabase Auth SMTP → **Brevo** (sender `noreply@legalgram.co`)
- **PDF generation:** client-side **jsPDF** (see `src/services/*Pdf.ts` / `*Documents.ts`) + `jszip`
- **Hosting:** Vercel (frontend), Supabase (backend). Repo: GitHub `main`.

### Run locally
```bash
npm install
npm run dev      # local dev server
npm run build    # production build (must pass before pushing)
```
> Note: the built `dist/` folder is currently committed to git (legacy). Building
> regenerates it. Consider untracking it (`git rm -r --cached dist` + add to
> `.gitignore`) — see "Known issues".

---

## 2. Repo map (what lives where)

```
src/
  App.tsx                     # ALL routes (large file; lazy + eager imports)
  pages/                      # one file per page
    Documents.tsx             # THE document library registry (source of truth)
    FormMyLlc.tsx             # DIY LLC formation wizard  (/form-my-llc)
    FormMyNonprofit.tsx       # DIY Nonprofit formation wizard (/form-my-nonprofit)
    Pricing.tsx  Signup.tsx  Login.tsx  StartABusiness.tsx  ...
    *Info.tsx                 # per-document informational landing pages (~180)
    *Form.tsx / components    # the actual fillable document forms
  components/
    dashboard/                # the logged-in MEMBER PORTAL (/user-dashboard)
      UserDashboardSidebar.tsx  DashboardContent.tsx  MakeDocument.tsx
      MemberBenefits.tsx  StartBusiness.tsx  PaymentInfo.tsx  UserProfile.tsx
    home/                     # homepage sections
    DocumentInfoLanding.tsx   # shared template for many document landing pages
  data/
    formsCatalog.ts           # AUTO-GENERATED from Documents.tsx (chatbot search)
    documentContent.impl.ts   # copy/content for document info pages
    llcRulesEngine.ts         # LLC: per-state rules
    nonprofitRulesEngine.ts   # Nonprofit: 7-state rules, gating, template registry
  services/
    checkout.ts               # starts Stripe checkout via the edge function
    llcDocuments.ts / llcPdf.ts            # LLC PDF generation
    nonprofitDocuments.ts / nonprofitMerge.ts / nonprofitValidation.ts
  types/                      # llcFormation.ts, nonprofitFormation.ts, ...
supabase/functions/           # Deno edge functions (deployed separately, see §5)
  create-checkout/  customer-portal/  generate-document/  ...
```

---

## 3. How to add a new document (e.g. an S-Corp document)

There is **no separate "S Corp" category** — S-Corp documents live under the
**"Business Formation"** category (alongside Corporation Formation, Corporate
Bylaws). The single source of truth is **`src/pages/Documents.tsx`**.

1. **Create the form component** — copy an existing `*Form.tsx` as a starting
   point (e.g. `src/components/SCorpElectionForm.tsx`).
2. **Import it** at the top of `src/pages/Documents.tsx`.
3. **Add one entry** to the documents array in `Documents.tsx`:
   ```ts
   { id: "s-corp-election", title: "S-Corp Election (Form 2553)",
     description: "…", icon: FileText,
     category: "Business Formation", component: SCorpElectionForm },
   ```
4. Done — the route `/documents/s-corp-election` works automatically (all
   documents are served by the `/documents/:id` route), and it appears in the
   catalog under Business Formation.
5. (Optional) Add an "About" landing page (`SCorpElectionInfo.tsx`) + a
   `documentContent` entry, and register its route in `App.tsx`.
6. `src/data/formsCatalog.ts` is auto-generated from `Documents.tsx` for the
   chatbot — add the same `{id,title,description,category}` row there (or
   regenerate) so the assistant can find it.

To create a **new category or subcategory**, edit `categories` /
`subcategories` in `src/pages/DocumentCategories.tsx` and tag documents with the
new `category` string.

---

## 4. The two "formation" products (built recently)

Both follow the same pattern: a step wizard → validate → Stripe checkout → on
`?payment=success` the browser generates branded PDFs (jsPDF) and downloads a ZIP.

### DIY LLC formation — `/form-my-llc` ($49)
- Wizard: `src/pages/FormMyLlc.tsx`
- Rules: `src/data/llcRulesEngine.ts` · Docs: `src/services/llcDocuments.ts`

### DIY Nonprofit formation — `/form-my-nonprofit` ($59)
- Wizard: `src/pages/FormMyNonprofit.tsx` (Phase 0 acknowledgement → phases 1–5 → review → checkout)
- Rules/states: `src/data/nonprofitRulesEngine.ts` — 7 states (DE, WY, FL, TX, CA, NV, NY),
  launch gating + waitlist, CA public-benefit-only + NY N-PCL §404 purpose routing
- **One merge object:** `src/services/nonprofitMerge.ts` — all template fields +
  conditionals + the "six merge-field gaps" are produced here. Templates never
  re-check flags; this is the single place.
- Validation: `src/services/nonprofitValidation.ts`
- Documents (7 PDFs): `src/services/nonprofitDocuments.ts` — Bylaws, Conflict of
  Interest Policy, Board Minutes, EIN Worksheet, state Articles, Filing
  Checklist, Form 1023 Next-Steps Guide. IRS 501(c)(3) clauses are verbatim.
- **Gate:** `ATTORNEY_SIGNOFF = false` in the rules engine — do not promote in
  nav / go live to real customers until a nonprofit attorney signs off the
  templates in writing (see "Outstanding").
- **Template QA note:** the bylaws template compares `state == "CA"` AND prints
  `{{ state }}` in prose; we pass the 2-letter code so the conditional works
  (prose reads "State of CA"). The attorney template pass should add a separate
  `{{ state_name }}` field.

---

## 5. Backend: Supabase + Stripe + email

**Supabase project ref:** `nksumgiugukzdmrhhroj`
Frontend uses the **publishable/anon** key (safe, in `src/integrations/supabase/client.ts`).

### Edge functions (`supabase/functions/*`)
Deployed with the Supabase CLI (needs `SUPABASE_ACCESS_TOKEN`):
```bash
SUPABASE_ACCESS_TOKEN=<personal-access-token> \
  npx supabase functions deploy <name> --project-ref nksumgiugukzdmrhhroj
```
Editing the file in the repo is **not** enough — you must redeploy the function.

- `create-checkout` — creates Stripe Checkout sessions. Handles subscription
  plans (`essentials`, `business`, …) and one-time products (`llc_formation`
  $49, `nonprofit_formation` $59, `single_document` $39). **Prices live
  server-side** so the client can't tamper with them.
- `customer-portal` — returns a Stripe Billing Portal URL (Payment tab). Requires
  the Customer Portal to be activated once in the Stripe dashboard.
- `generate-document` — AI document generation (Anthropic).

### Secrets (set in Supabase → Edge Functions → Secrets; NEVER in the repo)
- `STRIPE_SECRET_KEY` — currently a **test** key (`sk_test_…`). For real charges,
  replace with `sk_live_…` in Supabase — no code change needed.
- `ANTHROPIC_API_KEY`, and the Brevo SMTP credentials.

### Payments flow
Client → `supabase.functions.invoke("create-checkout")` → hosted Stripe Checkout →
redirect back with `?payment=success` / `?checkout=success`. We use **hosted
Checkout**, so the Stripe **publishable key is not needed** in the frontend.

### Plan purchase flow
Pricing CTAs are auth-aware: signed-in users go straight to checkout; signed-out
users go to `/signup?plan=<key>&cycle=<cycle>` — the plan is carried through
signup (and login, if email confirmation is on) so it is not lost.

### Auth email (password reset, confirmation)
Configured via Supabase Auth → SMTP → Brevo (`smtp-relay.brevo.com`, sender
`noreply@legalgram.co`). If reset emails aren't arriving, check **Brevo →
Transactional → Logs** (delivered / blocked / bounced), verify the sender is
validated and SPF/DKIM are green, and check spam. The Supabase auth email rate
limit was raised to 30/hour.

---

## 6. Deploy

Push to `main` → Vercel auto-builds and deploys the frontend. Edge functions are
deployed separately with the Supabase CLI (§5). Always run `npm run build`
locally first — it must pass.

---

## 7. Outstanding / TODO (business + technical)

**Business decisions (owner):**
- Nonprofit **attorney sign-off** before real customers receive documents
  (`ATTORNEY_SIGNOFF` flag). Then link `/form-my-nonprofit` more prominently.
- Switch Stripe to **live key** when ready for real payments.
- Activate the Stripe **Customer Portal** (Settings → Billing → Customer portal → Save).

**Not built (was descoped):** the nonprofit spec's server delivery pipeline
(webhook → server generate → storage → email delivery → drip → Form 1023 deadline
countdown → 30-day re-download). Documents are delivered client-side today.

**Known issues / cleanup:**
- `dist/` is committed to git (bloats the repo) — untrack it.
- TypeScript `strict` is off in `tsconfig` — turn on incrementally.
- There is a **nested duplicate `Lovable/` folder** pointing at a *different*
  Supabase project — do all work in the top-level project; consider deleting it.
- ~180 `*Info.tsx` pages and ~200 `*Form.tsx` components are near-duplicates that
  could be made data-driven.
- The site is a client-rendered SPA; the info pages have no SSR/meta — a
  prerender/SSG pass would help SEO significantly.
- Remove backup/junk files (`Documents.backup.tsx`, `ai_engine_backup.txt`, a
  file named with a trailing space `Offerofemployment .tsx`).

---

## 8. Quick "where do I…" index

| I want to… | Go to |
|---|---|
| Add a document | `src/pages/Documents.tsx` (+ a `*Form.tsx` component) |
| Add/rename a category | `src/pages/DocumentCategories.tsx` |
| Change a route | `src/App.tsx` |
| Edit the member portal | `src/components/dashboard/*` |
| Change pricing/plans | `src/pages/Pricing.tsx` + `create-checkout` PLANS |
| Change LLC/Nonprofit rules | `src/data/llcRulesEngine.ts` / `nonprofitRulesEngine.ts` |
| Change generated PDFs | `src/services/*Documents.ts` (engine: `*Pdf.ts`) |
| Change Stripe/email/secrets | Supabase dashboard (Edge Functions → Secrets) |
