// ============================================================================
// LEGALGRAM — STRIPE CUSTOMER PORTAL (Supabase Edge Function)
// Given a signed-in customer's email, finds their Stripe customer and returns a
// hosted Billing Portal URL where they can manage payment methods, invoices, and
// subscriptions. The STRIPE_SECRET_KEY stays server-side.
//
// Deploy:  supabase functions deploy customer-portal
// ============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const STRIPE_SECRET_KEY = (Deno.env.get("STRIPE_SECRET_KEY") ?? "").replace(/[^\x21-\x7E]/g, "");

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const headers = { ...corsHeaders, "Content-Type": "application/json" };
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  if (!STRIPE_SECRET_KEY) return new Response(JSON.stringify({ error: "Stripe is not configured." }), { status: 500, headers });

  let body: { email?: string; origin?: string };
  try { body = await req.json(); } catch { return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers }); }

  const email = (body.email || "").trim();
  if (!email) return new Response(JSON.stringify({ error: "Missing email" }), { status: 400, headers });
  const origin = (body.origin || "").replace(/[^\x21-\x7E]/g, "").replace(/\/$/, "") || "https://legalgram.co";
  const auth = { Authorization: `Bearer ${STRIPE_SECRET_KEY}` };

  try {
    // Find the Stripe customer by email.
    const custResp = await fetch(`https://api.stripe.com/v1/customers?email=${encodeURIComponent(email)}&limit=1`, { headers: auth });
    const custData = await custResp.json();
    if (!custResp.ok) {
      console.error("Stripe customers error:", custData?.error);
      return new Response(JSON.stringify({ error: "Could not reach billing." }), { status: 502, headers });
    }
    const customer = custData?.data?.[0]?.id;
    if (!customer) {
      // No purchases yet — nothing to manage.
      return new Response(JSON.stringify({ noCustomer: true }), { status: 200, headers });
    }

    // Create a Billing Portal session.
    const p = new URLSearchParams();
    p.set("customer", customer);
    p.set("return_url", `${origin}/user-dashboard`);
    const portalResp = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/x-www-form-urlencoded" },
      body: p.toString(),
    });
    const portalData = await portalResp.json();
    if (!portalResp.ok) {
      // Most common in test mode: the Customer Portal has not been configured yet.
      const msg = String(portalData?.error?.message || "");
      const needsConfig = /configuration/i.test(msg);
      console.error("Stripe portal error:", portalData?.error);
      return new Response(JSON.stringify({ error: "Billing portal is not available yet.", needsConfig }), { status: 200, headers });
    }
    return new Response(JSON.stringify({ url: portalData.url }), { status: 200, headers });
  } catch (error) {
    console.error("customer-portal error:", error);
    return new Response(JSON.stringify({ error: "Unexpected error opening billing." }), { status: 500, headers });
  }
});
