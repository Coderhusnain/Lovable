
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Mail, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const QASection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await (supabase as any)
        .from("newsletter_subscribers")
        .insert({ email: trimmed, source: "qa_section" });

      if (error && error.code !== "23505") {
        toast.error("Could not subscribe right now. Please try again later.");
        return;
      }

      // 23505 = already subscribed, treat as success
      setIsSubscribed(true);
      toast.success("You are subscribed to weekly legal tips");
    } catch {
      toast.error("Could not subscribe right now. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-8 md:py-12 bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Interactive Q&A Preview */}
          <div>
            <Card className="bg-blue-50/60 border border-blue-100 shadow-lg rounded-2xl">
              <CardContent className="p-6 md:p-8">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-bright-orange-500">Legal Question</span>
                  <p className="text-lg font-medium mt-2 text-gray-900 leading-relaxed">I was walking on Broadway in New York when a cop suddenly stopped me and asked for my ID. Am I legally required to show it?</p>
                </div>

                {/* First lawyer response */}
                <div className="flex gap-4 mb-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bright-orange-100 text-bright-orange-600 text-sm font-semibold">
                    AR
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h4 className="font-semibold text-gray-900">Alex Rivera</h4>
                      <span className="text-xs text-gray-500">Criminal Defense Attorney</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      In New York, you're not required to show ID just because a police officer asks, unless you're being formally detained or arrested.
                    </p>
                  </div>
                </div>

                {/* Second lawyer response */}
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
                    MC
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h4 className="font-semibold text-gray-900">Monica Chen</h4>
                      <span className="text-xs text-gray-500">Civil Rights Lawyer</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      If the officer has a valid reason to suspect you're involved in a crime (reasonable suspicion), they can detain you briefly. But you still don't have to carry or show ID unless you're driving or under arrest.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="relative z-10 -mt-5 text-center">
              <p className="text-sm text-gray-600 bg-white border border-gray-200 px-5 py-2 rounded-full inline-block shadow-md">
                Free legal Q&A, powered by Gram AI and reviewed workflows
              </p>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <div className="space-y-5">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                Got Legal Questions?
                <span className="block mt-2 text-bright-orange-500">We Have Answers!</span>
              </h2>

              <p className="text-lg text-gray-600">
                Experienced lawyers across the country answer user questions every day in our Q&A forum. Get your answer today.
              </p>

              <div className="space-y-10 pt-4">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bright-orange-500 text-white font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Ask a Question for Free</h3>
                    <p className="text-gray-600 mt-2 leading-relaxed">
                      Post your legal question anonymously, and experienced lawyers will respond within hours.
                    </p>
                    <Link to="/ask-legal-advice" className="inline-block mt-4">
                      <Button variant="orange" size="lg" className="px-8">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Ask a Question
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bright-orange-500 text-white font-semibold">
                    2
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900">Get Weekly Legal Advice by Email</h3>
                    <p className="text-gray-600 mt-2 leading-relaxed">
                      We only ask for your email so we can send you free weekly advice that helps you understand your legal rights. No account needed and you can unsubscribe anytime.
                    </p>
                    {isSubscribed ? (
                      <div className="mt-4 flex items-center gap-2 text-green-600 font-medium">
                        <CheckCircle className="h-5 w-5" />
                        You are subscribed. Your first weekly email is on its way.
                      </div>
                    ) : (
                      <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md">
                        <div className="relative flex-grow">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="pl-10 h-11"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          variant="orange"
                          disabled={isSubmitting}
                          className="shrink-0 h-11 px-6"
                        >
                          {isSubmitting ? "Subscribing..." : "Subscribe Free"}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QASection;
