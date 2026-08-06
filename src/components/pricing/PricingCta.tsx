
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const PricingCta = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("consultations").insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        message: `[Free consultation request from pricing page] ${details.trim()}`,
        status: "pending",
      });

      if (error) {
        toast.error("Could not send your request right now. Please try again later.");
        return;
      }

      setIsSubmitted(true);
      toast.success("Consultation request sent. We will contact you soon.");
    } catch {
      toast.error("Could not send your request right now. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setIsSubmitted(false);
      setName("");
      setEmail("");
      setPhone("");
      setDetails("");
    }
  };

  return (
    <div className="bg-bright-orange-500">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Not sure which plan is right for you?
            </h2>
            <p className="text-white/90 max-w-xl text-lg">
              Our legal experts can help you choose the perfect plan for your specific legal needs. Schedule a free consultation today.
            </p>
          </div>

          <Dialog open={open} onOpenChange={resetAndClose}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-bright-orange-600 hover:bg-bright-orange-50 shadow-lg min-w-[200px]">
                Get Free Consultation
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                  <DialogHeader>
                    <DialogTitle className="text-center">Request Received</DialogTitle>
                    <DialogDescription className="text-center">
                      Thank you, {name.split(" ")[0] || "friend"}. Our legal team will reach out to {email} shortly to schedule your free consultation.
                    </DialogDescription>
                  </DialogHeader>
                  <Button onClick={() => resetAndClose(false)} className="bg-bright-orange-500 hover:bg-bright-orange-600 text-white">
                    Done
                  </Button>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle>Get a Free Consultation</DialogTitle>
                    <DialogDescription>
                      Share your details and our legal experts will contact you to help choose the right plan.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="consult-name" className="text-sm font-medium">Full Name</label>
                      <Input
                        id="consult-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="consult-email" className="text-sm font-medium">Email</label>
                      <Input
                        id="consult-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="consult-phone" className="text-sm font-medium">Phone (optional)</label>
                      <Input
                        id="consult-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="consult-details" className="text-sm font-medium">What do you need help with?</label>
                      <Textarea
                        id="consult-details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Tell us briefly about your legal needs"
                        rows={3}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-bright-orange-500 hover:bg-bright-orange-600 text-white"
                    >
                      {isSubmitting ? "Sending..." : "Request Free Consultation"}
                    </Button>
                  </form>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PricingCta;
