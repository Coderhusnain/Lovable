import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { openBillingPortal } from "@/services/checkout";

const PaymentInfo: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user?.email || "");
    });
  }, []);

  const manageBilling = async () => {
    if (!email) { toast.error("Please sign in to manage billing."); return; }
    setLoading(true);
    const res = await openBillingPortal(email);
    setLoading(false);
    if (res.ok) return; // redirected to Stripe
    if (res.noCustomer) {
      toast.info("You don't have any payments yet. Your payment method is added at checkout when you buy a document or plan.");
      return;
    }
    if (res.needsConfig) {
      toast.info("Billing management isn't switched on yet. You can still buy documents and plans at checkout.");
      return;
    }
    toast.error(res.error || "Couldn't open billing.");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Payment & Billing</h2>

      <Card className="border-t-[3px] border-t-bright-orange-500 mb-6">
        <CardContent className="p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-bright-orange-600 mb-2">How billing works</p>
          <p className="text-gray-700 mb-2">
            Legalgram is pay-as-you-go — there's no card required to browse. You pay securely at checkout only when you buy a document, form a business, or upgrade to a plan. Your card details are handled by Stripe and are never stored on Legalgram.
          </p>
          <p className="text-sm text-gray-500">
            {email ? <>Signed in as <span className="font-medium text-gray-700">{email}</span>.</> : "Sign in to see your billing details."}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <h3 className="font-bold text-gray-900 mb-1">Payment methods & invoices</h3>
            <p className="text-sm text-gray-600 flex-1">
              Manage your saved cards, view past invoices and receipts, and update or cancel a plan in the secure Stripe billing portal.
            </p>
            <Button variant="orange" className="w-full mt-4" onClick={manageBilling} disabled={loading}>
              {loading ? "Opening…" : "Manage payment & billing"}
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <h3 className="font-bold text-gray-900 mb-1">Plans & pricing</h3>
            <p className="text-sm text-gray-600 flex-1">
              Compare Free, Single Document, Essentials, and Business plans, or start forming an LLC or nonprofit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button variant="outline" className="flex-1" asChild><Link to="/pricing">View plans</Link></Button>
              <Button variant="outline" className="flex-1" asChild><Link to="/start-a-business">Start a business</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        Payments are processed by Stripe. Legalgram does not store your card number.
      </p>
    </div>
  );
};

export default PaymentInfo;
