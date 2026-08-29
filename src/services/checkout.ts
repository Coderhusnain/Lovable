import { supabase } from "@/integrations/supabase/client";

/**
 * Starts a Stripe Checkout session via the `create-checkout` edge function
 * (the Stripe secret key stays server-side) and redirects the browser to the
 * hosted Stripe checkout page.
 */
/**
 * Starts the one-time $49 DIY LLC formation checkout and redirects to Stripe.
 */
export async function startLlcCheckout(
  opts: { email?: string; origin?: string } = {},
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { product: "llc_formation", email: opts.email, origin: opts.origin ?? window.location.origin },
    });
    if (error) return { ok: false, error: "Couldn't reach the payment service. Please try again." };
    if (data?.error) return { ok: false, error: data.error as string };
    if (!data?.url) return { ok: false, error: "No checkout URL returned. Please try again." };
    window.location.href = data.url as string;
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong starting checkout. Please try again." };
  }
}

/**
 * Starts the one-time $59 DIY Nonprofit formation checkout and redirects to Stripe.
 * NOTE: do not link this from live UI until the nonprofit attorney review is
 * signed off and the doc-generation pipeline is wired (see nonprofitMerge.ts).
 */
export async function startNonprofitCheckout(
  opts: { email?: string; origin?: string } = {},
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { product: "nonprofit_formation", email: opts.email, origin: opts.origin ?? window.location.origin },
    });
    if (error) return { ok: false, error: "Couldn't reach the payment service. Please try again." };
    if (data?.error) return { ok: false, error: data.error as string };
    if (!data?.url) return { ok: false, error: "No checkout URL returned. Please try again." };
    window.location.href = data.url as string;
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong starting checkout. Please try again." };
  }
}

/**
 * Opens the Stripe Customer Portal for the signed-in customer (manage payment
 * methods, invoices, subscriptions). Returns a status the UI can act on.
 */
export async function openBillingPortal(
  email: string,
): Promise<{ ok: boolean; noCustomer?: boolean; needsConfig?: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke("customer-portal", {
      body: { email, origin: window.location.origin },
    });
    if (error) return { ok: false, error: "Couldn't reach the billing service. Please try again." };
    if (data?.url) { window.location.href = data.url as string; return { ok: true }; }
    if (data?.noCustomer) return { ok: false, noCustomer: true };
    if (data?.needsConfig) return { ok: false, needsConfig: true };
    return { ok: false, error: (data?.error as string) || "Billing is not available yet." };
  } catch {
    return { ok: false, error: "Something went wrong opening billing. Please try again." };
  }
}

/**
 * Routes a chosen Pricing plan to the right Stripe checkout.
 *  - "free"            → no charge (caller sends the user to the dashboard)
 *  - "single_document" → one-time $39
 *  - "essentials"/"business" → subscription at the given cycle
 */
export async function startPlanCheckout(
  planKey: string,
  cycle: "monthly" | "annually",
  opts: { email?: string } = {},
): Promise<{ ok: boolean; free?: boolean; error?: string }> {
  const key = (planKey || "").toLowerCase();
  if (key === "free") return { ok: true, free: true };

  const body =
    key === "single_document"
      ? { product: "single_document", email: opts.email, origin: window.location.origin }
      : { plan: key, cycle, email: opts.email, origin: window.location.origin };
  try {
    const { data, error } = await supabase.functions.invoke("create-checkout", { body });
    if (error) return { ok: false, error: "Couldn't reach the payment service. Please try again." };
    if (data?.error) return { ok: false, error: data.error as string };
    if (!data?.url) return { ok: false, error: "No checkout URL returned. Please try again." };
    window.location.href = data.url as string;
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong starting checkout. Please try again." };
  }
}

export async function startCheckout(
  plan: "starter" | "premium",
  cycle: "monthly" | "annually",
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { plan, cycle, origin: window.location.origin },
    });

    if (error) {
      console.error("[checkout] invoke error:", error);
      return { ok: false, error: "Couldn't reach the payment service. Please try again." };
    }
    if (data?.error) return { ok: false, error: data.error as string };
    if (!data?.url) return { ok: false, error: "No checkout URL returned. Please try again." };

    window.location.href = data.url as string;
    return { ok: true };
  } catch (err) {
    console.error("[checkout] unexpected error:", err);
    return { ok: false, error: "Something went wrong starting checkout. Please try again." };
  }
}
