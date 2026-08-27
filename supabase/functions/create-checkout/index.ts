// ============================================================================
// LEGALGRAM — STRIPE CHECKOUT (Supabase Edge Function)
// Creates a Stripe Checkout Session (subscription) for a pricing plan and
// returns the hosted checkout URL. Prices live server-side so the client can't
// tamper with them. The STRIPE_SECRET_KEY is read from an edge-function secret
// and is NEVER exposed to the browser.
//
// Deploy:  supabase functions deploy create-checkout
// Secret:  set STRIPE_SECRET_KEY (sk_test_... / sk_live_...) in Edge Functions.
// ============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Strip stray/invisible characters from the key (copy-paste safety).
const STRIPE_SECRET_KEY = (Deno.env.get("STRIPE_SECRET_KEY") ?? "").replace(
  /[^\x21-\x7E]/g,
  "",
);

type Cycle = "monthly" | "annually";

// Per-MONTH price (USD) for each plan — mirrors src/pages/Pricing.tsx.
const PLANS: Record<string, { name: string; monthly: number; annually: number }> = {
  starter: { name: "Starter", monthly: 39.99, annually: 29.99 },
  premium: { name: "Premium", monthly: 49.99, annually: 39.99 },
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const headers = { ...corsHeaders, "Content-Type": "application/json" };

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  }
  if (!STRIPE_SECRET_KEY) {
    return new Response(
      JSON.stringify({ error: "Stripe is not configured. Set the STRIPE_SECRET_KEY secret." }),
      { status: 500, headers },
    );
  }

  let body: { plan?: string; cycle?: Cycle; origin?: string; email?: string; product?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers });
  }

  const originClean = (body.origin || "").replace(/[^\x21-\x7E]/g, "").replace(/\/$/, "") || "https://legalgram.co";

  // ── One-time DIY LLC formation payment ($49, mode: payment) ──
  if ((body.product || "").toLowerCase() === "llc_formation") {
    const p = new URLSearchParams();
    p.set("mode", "payment");
    p.set("success_url", `${originClean}/form-my-llc?payment=success`);
    p.set("cancel_url", `${originClean}/form-my-llc?payment=cancelled`);
    p.set("allow_promotion_codes", "true");
    if (body.email) p.set("customer_email", body.email);
    p.set("line_items[0][quantity]", "1");
    p.set("line_items[0][price_data][currency]", "usd");
    p.set("line_items[0][price_data][product_data][name]", "Legalgram DIY LLC Formation");
    p.set("line_items[0][price_data][product_data][description]", "Prepares your Articles, Operating Agreement, Filing Instructions, and EIN Worksheet.");
    p.set("line_items[0][price_data][unit_amount]", "4900");
    try {
      const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
        body: p.toString(),
      });
      const data = await resp.json();
      if (!resp.ok) {
        console.error("Stripe error (llc):", resp.status, JSON.stringify(data?.error || data));
        return new Response(JSON.stringify({ error: "Could not start checkout. Please try again.", detail: data?.error?.message ?? null }), { status: 502, headers });
      }
      return new Response(JSON.stringify({ url: data.url }), { status: 200, headers });
    } catch (error) {
      console.error("create-checkout llc error:", error);
      return new Response(JSON.stringify({ error: "Unexpected error starting checkout." }), { status: 500, headers });
    }
  }

  // ── One-time DIY Nonprofit formation payment ($59, mode: payment) ──
  if ((body.product || "").toLowerCase() === "nonprofit_formation") {
    const p = new URLSearchParams();
    p.set("mode", "payment");
    p.set("success_url", `${originClean}/form-my-nonprofit?payment=success`);
    p.set("cancel_url", `${originClean}/form-my-nonprofit?payment=cancelled`);
    p.set("allow_promotion_codes", "true");
    if (body.email) p.set("customer_email", body.email);
    p.set("line_items[0][quantity]", "1");
    p.set("line_items[0][price_data][currency]", "usd");
    p.set("line_items[0][price_data][product_data][name]", "Legalgram DIY Nonprofit Formation");
    p.set("line_items[0][price_data][product_data][description]", "Prepares your Bylaws, Conflict of Interest Policy, Board Minutes, EIN Worksheet, and your state's Articles + Filing Checklist.");
    p.set("line_items[0][price_data][unit_amount]", "5900");
    try {
      const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
        body: p.toString(),
      });
      const data = await resp.json();
      if (!resp.ok) {
        console.error("Stripe error (nonprofit):", resp.status, JSON.stringify(data?.error || data));
        return new Response(JSON.stringify({ error: "Could not start checkout. Please try again.", detail: data?.error?.message ?? null }), { status: 502, headers });
      }
      return new Response(JSON.stringify({ url: data.url }), { status: 200, headers });
    } catch (error) {
      console.error("create-checkout nonprofit error:", error);
      return new Response(JSON.stringify({ error: "Unexpected error starting checkout." }), { status: 500, headers });
    }
  }

  const plan = PLANS[(body.plan || "").toLowerCase()];
  const cycle: Cycle = body.cycle === "annually" ? "annually" : "monthly";
  if (!plan) {
    return new Response(JSON.stringify({ error: "Unknown plan" }), { status: 400, headers });
  }

  const origin = (body.origin || "").replace(/[^\x21-\x7E]/g, "").replace(/\/$/, "") || "https://legalgram.app";

  // Compute the amount charged per billing interval.
  //  - monthly  → charged every month at the monthly rate
  //  - annually → charged once a year at (annual per-month rate × 12)
  const interval = cycle === "annually" ? "year" : "month";
  const perInterval = cycle === "annually" ? plan.annually * 12 : plan.monthly;
  const unitAmount = Math.round(perInterval * 100); // cents

  const params = new URLSearchParams();
  params.set("mode", "subscription");
  params.set("success_url", `${origin}/pricing?checkout=success`);
  params.set("cancel_url", `${origin}/pricing?checkout=cancelled`);
  params.set("allow_promotion_codes", "true");
  if (body.email) params.set("customer_email", body.email);
  params.set("line_items[0][quantity]", "1");
  params.set("line_items[0][price_data][currency]", "usd");
  params.set(
    "line_items[0][price_data][product_data][name]",
    `Legalgram ${plan.name} (${cycle === "annually" ? "Annual" : "Monthly"})`,
  );
  params.set("line_items[0][price_data][unit_amount]", String(unitAmount));
  params.set("line_items[0][price_data][recurring][interval]", interval);

  try {
    const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Stripe error:", resp.status, JSON.stringify(data?.error || data));
      return new Response(
        JSON.stringify({
          error: "Could not start checkout. Please try again.",
          detail: data?.error?.message ?? null,
        }),
        { status: 502, headers },
      );
    }

    return new Response(JSON.stringify({ url: data.url }), { status: 200, headers });
  } catch (error) {
    console.error("create-checkout error:", error);
    return new Response(
      JSON.stringify({ error: "Unexpected error starting checkout.", detail: String((error as Error)?.message || error) }),
      { status: 500, headers },
    );
  }
});
