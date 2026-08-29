import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, InfoIcon, Mail, Lock, Phone } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { startPlanCheckout } from "@/services/checkout";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PLAN_LABEL: Record<string, string> = {
  free: "Free",
  single_document: "Single Document",
  essentials: "Essentials",
  business: "Business",
};

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Get redirect parameters from URL
  const urlParams = new URLSearchParams(location.search);
  const redirectTo = urlParams.get('redirect');
  const redirectStep = urlParams.get('step');
  const planKey = (urlParams.get('plan') || '').toLowerCase();
  const planCycle = (urlParams.get('cycle') === 'monthly' ? 'monthly' : 'annually') as 'monthly' | 'annually';
  const planLabel = PLAN_LABEL[planKey];

  // After the account exists, continue to the chosen plan (or the dashboard).
  const continueToPlan = async (userEmail: string) => {
    if (planKey && planKey !== 'free') {
      const res = await startPlanCheckout(planKey, planCycle, { email: userEmail });
      if (res.ok && !res.free) return; // redirected to Stripe checkout
    }
    if (redirectTo === 'ask-legal-advice' && redirectStep) navigate(`/ask-legal-advice?step=${redirectStep}`);
    else navigate('/user-dashboard');
  };

  // Already signed in and arrived here to pick a plan → skip the form.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) void continueToPlan(data.session.user.email || '');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    if (!agreeToTerms) {
      setErrorMessage("You must agree to the Terms of Service and Privacy Policy");
      toast.error("You must agree to the Terms of Service and Privacy Policy");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create a new account without email verification
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phoneNumber
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });


      if (error) {
        console.error("Signup error details:", {
          message: error.message,
          status: error.status || 'No status',
          name: error.name || 'Unknown error type'
        });
        setErrorMessage(error.message);
        toast.error("Signup failed");
        setIsSubmitting(false);
        return;
      }
      
      // Supabase returns a user with no identities when the email is
      // already registered (instead of an error) - surface that clearly
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setErrorMessage("An account with this email already exists. Please sign in instead.");
        toast.error("An account with this email already exists");
        setIsSubmitting(false);
        return;
      }

      // Store email for login page
      localStorage.setItem("lastLoginEmail", email);

      if (data.session) {
        // Email confirmation is disabled, the user is already signed in
        toast.success("Account created successfully! Welcome to Legalgram.");
        await continueToPlan(data.session.user?.email || email);
        return;
      }

      // Email confirmation is required before the account can be used.
      toast.success("Account created! Please check your email to confirm your account, then log in.");

      // Redirect to login, carrying the chosen plan / redirect so it isn't lost.
      const loginParams = new URLSearchParams();
      if (redirectTo) loginParams.set("redirect", redirectTo);
      if (redirectStep) loginParams.set("step", redirectStep);
      if (planKey) { loginParams.set("plan", planKey); loginParams.set("cycle", planCycle); }
      const qs = loginParams.toString();
      navigate(qs ? `/login?${qs}` : "/login");

    } catch (error) {
      console.error("Signup exception:", error);
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setErrorMessage("Network error - please check your connection and try again.");
      toast.error("Network error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-10">
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/067c7b04-b1a2-4236-97eb-2b7cf8b24291.png"
            alt="Background"
            className="w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>

        <div className="w-full max-w-md px-4 relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2 text-white">Create Your Account</h1>
            {planLabel && planKey !== 'free' ? (
              <p className="text-white/90 font-medium">
                Just one step — create your account to continue to the{" "}
                <span className="font-bold text-bright-orange-300">{planLabel}</span> plan
                {" "}({planCycle === 'annually' ? 'annual' : 'monthly'}). You'll go straight to secure checkout next.
              </p>
            ) : (
              <p className="text-white/90 font-medium">
                Sign up to access legal documents and advice.
              </p>
            )}
          </div>

          <div className="glass-card rounded-xl shadow-xl border border-white/10 p-8 animate-scale-in backdrop-blur-lg bg-white/10">
            <Alert className="mb-6 bg-black/20 border-amber-300/30 animate-slide-in" style={{ animationDelay: "0.025s" }}>
              <InfoIcon className="h-4 w-4 text-white" />
              <AlertDescription className="text-xs text-white font-medium">
                Create an account. Your information is securely stored in Supabase.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSignup} className="space-y-6">
              {errorMessage && (
                <div className="p-3 bg-red-500/20 border border-red-400 text-white text-sm rounded-md animate-shake">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-white mb-1">First Name</label>
                  <div className="relative">
                    <Input
                      id="first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      className="pl-10 bg-white/10 border-black/20 text-white placeholder:text-white/60 placeholder:font-medium focus:border-black/40 focus:ring-black/20 hover:bg-white/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-white mb-1">Last Name</label>
                  <div className="relative">
                    <Input
                      id="last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                      className="pl-10 bg-white/10 border-black/20 text-white placeholder:text-white/60 placeholder:font-medium focus:border-black/40 focus:ring-black/20 hover:bg-white/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-white/10 border-black/20 text-white placeholder:text-white/60 placeholder:font-medium focus:border-black/40 focus:ring-black/20 hover:bg-white/20 transition-all duration-300"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">Phone Number</label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="pl-10 bg-white/10 border-black/20 text-white placeholder:text-white/60 placeholder:font-medium focus:border-black/40 focus:ring-black/20 hover:bg-white/20 transition-all duration-300"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="pl-10 bg-white/10 border-black/20 text-white placeholder:text-white/60 placeholder:font-medium focus:border-black/40 focus:ring-black/20 hover:bg-white/20 transition-all duration-300"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-white/70 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="block text-sm font-medium text-white mb-1">Confirm Password</label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-10 bg-white/10 border-black/20 text-white placeholder:text-white/60 placeholder:font-medium focus:border-black/40 focus:ring-black/20 hover:bg-white/20 transition-all duration-300"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-white/70 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agree-terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                    className="border-white/50 data-[state=checked]:bg-white"
                  />
                  <label htmlFor="agree-terms" className="text-sm cursor-pointer text-white hover:text-white/70 transition-colors">
                    I agree to the{" "}
                    <Link to="/terms" className="hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-300/50 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
              </div>
            </form>

            <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <p className="text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-white hover:text-white/70 transition-colors hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
