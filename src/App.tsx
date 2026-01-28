import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const StartABusiness = lazy(() => import("./pages/StartABusiness"));
const Documents = lazy(() => import("./pages/Documents"));
const DocumentCategories = lazy(() => import("./pages/DocumentCategories"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const WhatsAnLLC = lazy(() => import("./pages/WhatsAnLLC"));
const WhatsACorporation = lazy(() => import("./pages/WhatsACorporation"));
const WhatsAnSCorp = lazy(() => import("./pages/WhatsAnSCorp"));
const DocumentTemplates = lazy(() => import("./pages/DocumentTemplates"));
const ContactLawyer = lazy(() => import("./pages/ContactLawyer"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Signup = lazy(() => import("./pages/Signup"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SSOCallback = lazy(() => import("./pages/SSOCallback"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const AskLegalAdvice = lazy(() => import("./pages/AskLegalAdvice"));
const AskALawyer = lazy(() => import("./pages/AskALawyer"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const MostFreqDocuments = lazy(() => import("./pages/MostFreqDocuments"));
const CommunityFeed = lazy(() => import("./pages/CommunityFeed")); // <--- ADDED COMMUNITY TAB

// Direct Imports for Info Pages
import AffidavitOfMarriageInfo from "./pages/AffidavitOfMarriageInfo";
import AffidavitOfResidenceInfo from "./pages/AffidavitOfResidenceInfo";
import LLCOperatingAgreementInfo from "./pages/LLCOperatingAgreementInfo";
import SpecialPowerOfAttorneyInfo from "./pages/SpecialPowerOfAttorneyInfo";
import GeneralPowerOfAttorneyInfo from "./pages/GeneralPowerOfAttorneyInfo";
import LeaseAgreementInfo from "./pages/LeaseAgreementInfo";
import LeaseRenewalInfo from "./pages/LeaseRenewalInfo";
import LeaseTerminationInfo from "./pages/LeaseTerminationInfo";
import CondominiumLeaseInfo from "./pages/CondominiumLeaseInfo";
import RentIncreaseInfo from "./pages/RentIncreaseInfo";
import SubleaseInfo from "./pages/SubleaseInfo";
import LeaseAmendmentInfo from "./pages/LeaseAmendmentInfo";
import CommercialLeaseInfo from "./pages/CommercialLeaseInfo";
import TripleNetLeaseInfo from "./pages/TripleNetLeaseInfo";
import CorporateBylawsInfo from "./pages/CorporateBylawsInfo";
import BuySellAgreementInfo from "./pages/BuySellAgreementInfo";
import MutualNDAInfo from "./pages/MutualNDAInfo";
import BusinessPlanInfo from "./pages/BusinessPlanInfo";
import ConfidentialInformationInfo from "./pages/ConfidentialInformationInfo";
import NonCircumventionInfo from "./pages/NonCircumventionInfo";
import CopyrightPermissionInfo from "./pages/CopyrightPermissionInfo";
import LicenseAgreementInfo from "./pages/LicenseAgreementInfo";
import ManufacturingLicenseInfo from "./pages/ManufacturingLicenseInfo";
import MusicLicenseInfo from "./pages/MusicLicenseInfo";
import ChildCareAuthorizationInfo from "./pages/ChildCareAuthorizationInfo";
import DivorceSettlementAgreementInfo from "./pages/DivorceSettlementAgreementInfo";
import GeneralContractInfo from "./pages/GeneralContractInfo";
import LivingWillInfo from "./pages/LivingWillInfo";
import SaleAgreementInfo from "./pages/SaleAgreementInfo";
import IndependentContractorInfo from "./pages/IndependentContractorInfo";
import LoanAgreementInfo from "./pages/LoanAgreementInfo";
import GiftAffidavitInfo from "./pages/GiftAffidavitInfo";
import FinancialSupportAffidavitInfo from "./pages/FinancialSupportAffidavitInfo";
import ServicesContractInfo from "./pages/ServicesContractInfo";
import OfficeSpaceLeaseInfo from "./pages/OfficeSpaceLeaseInfo";
import StorageSpaceLeaseInfo from "./pages/StorageSpaceLeaseInfo";
import PatentAssignmentInfo from "./pages/PatentAssignmentInfo";
import RoyaltyAgreementInfo from "./pages/RoyaltyAgreementInfo";
import BillboardLeaseInfo from "./pages/BillboardLeaseInfo";
import RestaurantLeaseInfo from "./pages/RestaurantLeaseInfo";
import GasLeaseInfo from "./pages/GasLeaseInfo";
import AccountingContractInfo from "./pages/AccountingContractInfo";
import BusinessSaleAgreementInfo from "./pages/BusinessSaleContractInfo";
import ClinicalTrialAgreementInfo from "./pages/ClinicalTrialContractInfo";
import FeeAgreementContractInfo from "./pages/FeeAgreementContractInfo";
import FranchiseAgreementInfo from "./pages/FranchiseAgreementInfo";
import AdministrativeServicesAgreementInfo from "./pages/AdministrativeServicesAgreementInfo";
import AdvertisingAgencyAgreementInfo from "./pages/AdvertisingAgencyAgreementInfo";
import ITServiceAgreementInfo from "./pages/ITServiceAgreementInfo";
import MergerAgreementInfo from "./pages/MergerAgreementInfo";
import AssetPurchaseAgreementInfo from "./pages/AssetPurchaseAgreementInfo";
import MarketingAgreementInfo from "./pages/MarketingAgreementInfo";
import ContractExtensionAgreementInfo from "./pages/ContractExtensionAgreementInfo";
import ProductDistributionAgreementInfo from "./pages/ProductDistributionAgreementInfo";
import ReferralFeeAgreementInfo from "./pages/ReferralFeeAgreementInfo";
import BarterAgreementInfo from "./pages/BarterAgreementInfo";

// --- NEW DOCUMENT INFO IMPORTS ---
import SecurityAgreementInfo from "./pages/SecurityAgreementInfo"; // <--- FIXED IMPORT
import MediationAgreementInfo from "./pages/MediationAgreementInfo";
import MutualReleaseInfo from "./pages/MutualReleaseInfo";
import LeaseSubordinationAgreementInfo from "./pages/LeaseSubordinationAgreementInfo";
import MasterUseLicenseInfo from "./pages/MasterUseLicenseInfo";
import FlooringServicesAgreementInfo from "./pages/FlooringServicesAgreementInfo";
import CoSignerAgreementInfo from "./pages/CoSignerAgreementInfo";
import CopyrightLicenseInfo from "./pages/CopyrightLicenseInfo";
import CooperationAgreementInfo from "./pages/CooperationAgreementInfo";

// Loading component
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-rocket-blue-300 border-t-rocket-blue-600"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Core Pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<LandingPage />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/document-categories" element={<DocumentCategories />} />
                <Route path="/most-freq-documents" element={<MostFreqDocuments />} />
                <Route path="/community" element={<CommunityFeed />} /> {/* <--- ADDED COMMUNITY ROUTE */}
                <Route path="/documents/:id" element={<Documents />} />
                <Route path="/make-documents" element={<Documents />} />
                <Route path="/make-documents/:id" element={<Documents />} />
                
                {/* Auth & User */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/sso-callback" element={<SSOCallback />} />
                
                {/* Admin */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                
                {/* Services */}
                <Route path="/contact-lawyer" element={<ContactLawyer />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/start-a-business" element={<StartABusiness />} />
                <Route path="/ask-legal-advice" element={<AskLegalAdvice />} />
                <Route path="/ask-lawyer" element={<AskALawyer />} />

                {/* Educational / Static */}
                <Route path="/whats-an-llc" element={<WhatsAnLLC />} />
                <Route path="/whats-a-corporation" element={<WhatsACorporation />} />
                <Route path="/whats-an-s-corp" element={<WhatsAnSCorp />} />

                {/* --- DOCUMENT ROUTES --- */}
                <Route path="/affidavit-of-marriage-info" element={<AffidavitOfMarriageInfo />} />
                <Route path="/affidavit-of-residence-info" element={<AffidavitOfResidenceInfo />} />
                <Route path="/llc-operating-agreement-info" element={<LLCOperatingAgreementInfo />} />
                <Route path="/special-power-of-attorney-info" element={<SpecialPowerOfAttorneyInfo />} />
                <Route path="/general-power-of-attorney-info" element={<GeneralPowerOfAttorneyInfo />} />
                <Route path="/child-care-authorization-info" element={<ChildCareAuthorizationInfo />} />
                <Route path="/divorce-settlement-agreement-info" element={<DivorceSettlementAgreementInfo />} />
                <Route path="/general-contract-info" element={<GeneralContractInfo />} />
                <Route path="/lease-agreement-info" element={<LeaseAgreementInfo />} />
                <Route path="/lease-renewal-info" element={<LeaseRenewalInfo />} />
                <Route path="/lease-termination-info" element={<LeaseTerminationInfo />} />
                <Route path="/condominium-lease-info" element={<CondominiumLeaseInfo />} />
                <Route path="/rent-increase-info" element={<RentIncreaseInfo />} />
                <Route path="/sublease-info" element={<SubleaseInfo />} />
                <Route path="/lease-amendment-info" element={<LeaseAmendmentInfo />} />
                <Route path="/commercial-lease-info" element={<CommercialLeaseInfo />} />
                <Route path="/triple-net-lease-info" element={<TripleNetLeaseInfo />} />
                <Route path="/corporate-bylaws-info" element={<CorporateBylawsInfo />} />
                <Route path="/corporate-bylaws-form" element={<Documents />} />
                <Route path="/buy-sell-agreement-info" element={<BuySellAgreementInfo />} />
                <Route path="/buy-sell-agreement-form" element={<Documents />} />
                <Route path="/business-agreement-info" element={<BuySellAgreementInfo />} />
                <Route path="/mutual-nda-info" element={<MutualNDAInfo />} />
                <Route path="/mutual-nda-form" element={<Documents />} />
                <Route path="/nda-info" element={<MutualNDAInfo />} />
                <Route path="/nda-form" element={<Documents />} />
                <Route path="/business-plan-info" element={<BusinessPlanInfo />} />
                <Route path="/business-plan-form" element={<Documents />} />
                <Route path="/confidential-information-info" element={<ConfidentialInformationInfo />} />
                <Route path="/confidential-information-form" element={<Documents />} />
                <Route path="/non-circumvention-info" element={<NonCircumventionInfo />} />
                <Route path="/non-circumvention-form" element={<Documents />} />
                <Route path="/copyright-permission-info" element={<CopyrightPermissionInfo />} />
                <Route path="/copyright-permission-form" element={<Documents />} />
                <Route path="/license-agreement-info" element={<LicenseAgreementInfo />} />
                <Route path="/license-agreement-form" element={<Documents />} />
                <Route path="/manufacturing-license-info" element={<ManufacturingLicenseInfo />} />
                <Route path="/manufacturing-license-form" element={<Documents />} />
                <Route path="/music-license-info" element={<MusicLicenseInfo />} />
                <Route path="/music-license-form" element={<Documents />} />
                <Route path="/patent-assignment-info" element={<PatentAssignmentInfo />} />
                <Route path="/patent-assignment-form" element={<Documents />} />
                <Route path="/royalty-agreement-info" element={<RoyaltyAgreementInfo />} />
                <Route path="/royalty-agreement-form" element={<Documents />} />
                <Route path="/living-will-info" element={<LivingWillInfo />} />
                <Route path="/sale-agreement-info" element={<SaleAgreementInfo />} />
                <Route path="/independent-contractor-info" element={<IndependentContractorInfo />} />
                <Route path="/loan-agreement-info" element={<LoanAgreementInfo />} />
                <Route path="/gift-affidavit-info" element={<GiftAffidavitInfo />} />
                <Route path="/financial-support-affidavit-info" element={<FinancialSupportAffidavitInfo />} />
                <Route path="/services-contract-info" element={<ServicesContractInfo />} />
                <Route path="/billboard-lease-info" element={<BillboardLeaseInfo />} />
                <Route path="/billboard-lease-form" element={<Documents />} />
                <Route path="/office-space-lease-info" element={<OfficeSpaceLeaseInfo />} />
                <Route path="/office-space-lease-form" element={<Documents />} />
                <Route path="/storage-space-lease-info" element={<StorageSpaceLeaseInfo />} />
                <Route path="/storage-space-lease-form" element={<Documents />} />
                <Route path="/restaurant-lease-info" element={<RestaurantLeaseInfo />} />
                <Route path="/restaurant-lease-form" element={<Documents />} />
                <Route path="/warehouse-lease-form" element={<Documents />} />
                <Route path="/gas-lease-info" element={<GasLeaseInfo />} />
                <Route path="/gas-lease-form" element={<Documents />} />
                <Route path="/security-deposit-return-letter" element={<Documents />} />
                <Route path="/lease-termination-letter" element={<Documents />} />
                <Route path="/late-rent-payment-agreement" element={<Documents />} />
                <Route path="/non-disturbance-agreement" element={<Documents />} />
                <Route path="/accounting-contract-info" element={<AccountingContractInfo />} />
                <Route path="/business-sale-agreement-info" element={<BusinessSaleAgreementInfo />} />
                <Route path="/clinical-trial-agreement-info" element={<ClinicalTrialAgreementInfo />} />
                <Route path="/fee-agreement-info" element={<FeeAgreementContractInfo />} />
                <Route path="/franchise-agreement-info" element={<FranchiseAgreementInfo />} />
                <Route path="/it-services-agreement-info" element={<ITServiceAgreementInfo />} />
                <Route path="/merger-agreement-info" element={<MergerAgreementInfo />} />
                <Route path="/administrative-services-contract-info" element={<AdministrativeServicesAgreementInfo />} />
                <Route path="/advertising-agency-agreement-info" element={<AdvertisingAgencyAgreementInfo />} />
                <Route path="/asset-purchase-agreement-info" element={<AssetPurchaseAgreementInfo />} />
                <Route path="/contract-extension-agreement-info" element={<ContractExtensionAgreementInfo />} />
                <Route path="/marketing-agreement-info" element={<MarketingAgreementInfo />} />
                <Route path="/product-distribution-agreement-info" element={<ProductDistributionAgreementInfo />} />
                <Route path="/referral-fee-agreement-info" element={<ReferralFeeAgreementInfo />} />
                <Route path="/barter-agreement-info" element={<BarterAgreementInfo />} />

                {/* --- NEW DOCUMENT ROUTES --- */}
                
                {/* Security Agreement */}
                <Route path="/security-agreement-info" element={<SecurityAgreementInfo />} />
                <Route path="/security-agreement-form" element={<Documents />} />

                {/* Mediation Agreement */}
                <Route path="/mediation-agreement-info" element={<MediationAgreementInfo />} />
                <Route path="/mediation-agreement-form" element={<Documents />} />

                {/* Mutual Release */}
                <Route path="/mutual-release-info" element={<MutualReleaseInfo />} />
                <Route path="/mutual-release-form" element={<Documents />} />

                {/* Lease Subordination */}
                <Route path="/lease-subordination-agreement-info" element={<LeaseSubordinationAgreementInfo />} />
                <Route path="/lease-subordination-agreement-form" element={<Documents />} />

                {/* Master Use License */}
                <Route path="/master-use-license-info" element={<MasterUseLicenseInfo />} />
                <Route path="/master-use-license-form" element={<Documents />} />

                {/* Flooring Services */}
                <Route path="/flooring-services-agreement-info" element={<FlooringServicesAgreementInfo />} />
                <Route path="/flooring-services-agreement-form" element={<Documents />} />

                {/* Co-Signer Agreement */}
                <Route path="/co-signer-agreement-info" element={<CoSignerAgreementInfo />} />
                <Route path="/co-signer-agreement-form" element={<Documents />} />

                {/* Copyright License */}
                <Route path="/copyright-license-info" element={<CopyrightLicenseInfo />} />
                <Route path="/copyright-license-form" element={<Documents />} />

                {/* Cooperation Agreement */}
                <Route path="/cooperation-agreement-info" element={<CooperationAgreementInfo />} />
                <Route path="/cooperation-agreement-form" element={<Documents />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;