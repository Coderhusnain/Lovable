import React, { useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LegalConcernsSection from "@/components/LegalConcernsSection";
import DocumentAboutSidebar from "@/components/DocumentAboutSidebar";

// Convert all large components to lazy imports to fix deployment chunk issues
const GuaranteeAgreementForm = lazy(() => import("@/components/GuaranteeAgreementForm"));
const PaymentAgreement = lazy(() => import("@/components/PaymentAgreement"));
const DEBTSETTLEMENTAGREEMENT = lazy(() => import("@/components/DEBTSETTLEMENTAGREEMENT"));
const SECURITYAGREEMENT = lazy(() => import("@/components/SECURITYAGREEMENT"));
const PROMISSORYNOTEAGREEMENT = lazy(() => import("@/components/PROMISSORYNOTEAGREEMENT"));
const Confidentialityagreement = lazy(() => import("@/components/Confidentialityagreement"));
const Employeehandbook = lazy(() => import("@/components/Employeehandbook"));
const Employeeretirement = lazy(() => import("@/components/Employeeretirement"));
const EmploymentAgreement = lazy(() => import("@/components/EmploymentAgreement"));
const lastwill = lazy(() => import("@/components/lastwill"));
const Offerofemployment  = lazy(() => import("@/components/Offerofemployment "));
const Severance  = lazy(() => import("@/components/Severance"));
const Softwarelicense = lazy(() => import("@/components/Softwarelicense"));
const workfromhome = lazy(() => import("@/components/workfromhome"));
const ConditionalForm = lazy(() => import("@/components/ConditionalForm"));
const ChildCareAuthForm = lazy(() => import("@/components/ChildCareAuthForm"));
const GeneralContractForm = lazy(() => import("@/components/GeneralContractForm"));
const IndependentContractorForm = lazy(() => import("@/components/IndependentContractorForm"));
const LivingWillForm = lazy(() => import("@/components/LivingWillForm"));
const SharePurchaseAgreementForm = lazy(() => import("@/components/SharePurchaseAgreementForm"));
const CohabitationAgreementForm = lazy(() => import("@/components/SharePurchaseAgreementForm"));
const LoanAgreementForm = lazy(() => import("@/components/LoanAgreementForm"));
const GiftAffidavitForm = lazy(() => import("@/components/GiftAffidavitForm"));
const FinancialSupportAffidavitForm = lazy(() => import("@/components/FinancialSupportAffidavitForm"));
const ServicesContractForm = lazy(() => import("@/components/ServicesContractForm"));
const BusinessAgreementForm = lazy(() => import("@/components/BusinessAgreementForm"));
const DomesticServiceAgreementForm = lazy(() => import("@/components/DomesticServiceAgreementForm"));
const AgreementToSellForm = lazy(() => import("@/components/AgreementToSellForm"));
const GeneralPowerOfAttorneyForm = lazy(() => import("@/components/GeneralPowerOfAttorneyForm"));
const SpecialPowerOfAttorneyForm = lazy(() => import("@/components/SpecialPowerOfAttorneyForm"));
const SaleAgreementForm = lazy(() => import("@/components/SaleAgreementForm"));
const LLCOperatingAgreementForm = lazy(() => import("@/components/LLCOperatingAgreementForm"));
const AffidavitOfMarriageForm = lazy(() => import("@/components/AffidavitOfMarriageForm"));
const AffidavitOfResidenceForm = lazy(() => import("@/components/AffidavitOfResidenceForm"));
const DivorceSettlementAgreementForm = lazy(() => import("@/components/DivorceSettlementAgreementForm"));
const EvictionNoticeForm = lazy(() => import("@/components/EvictionNoticeForm"));
const TranscriptRequestForm = lazy(() => import("@/components/TranscriptRequestForm"));
const NDAForm = lazy(() => import("@/components/NDAForm"));
const CopyrightAssignmentForm = lazy(() => import("@/components/CopyrightAssignmentForm"));
const CopyrightLicenseForm = lazy(() => import("@/components/CopyrightLicenseForm"));
const LeaseRenewalForm = lazy(() => import("@/components/LeaseRenewalForm"));
const LeaseTerminationForm = lazy(() => import("@/components/LeaseTerminationForm"));
const CondominiumLeaseForm = lazy(() => import("@/components/CondominiumLeaseForm"));
const RentIncreaseForm = lazy(() => import("@/components/RentIncreaseForm"));
const SubleaseForm = lazy(() => import("@/components/SubleaseForm"));
const LeaseAmendmentForm = lazy(() => import("@/components/LeaseAmendmentForm"));
const CommercialLeaseForm = lazy(() => import("@/components/CommercialLeaseForm"));
const TripleNetLeaseForm = lazy(() => import("@/components/TripleNetLeaseForm"));
const CorporateBylawsForm = lazy(() => import("@/components/CorporateBylawsForm"));
const BuySellAgreementForm = lazy(() => import("@/components/BuySellAgreementForm"));
const MutualNDAForm = lazy(() => import("@/components/MutualNDAForm"));
const BusinessPlanForm = lazy(() => import("@/components/BusinessPlanForm"));
const ConfidentialInformationForm = lazy(() => import("@/components/ConfidentialInformationForm"));
const NonCircumventionForm = lazy(() => import("@/components/NonCircumventionForm"));
const CopyrightPermissionForm = lazy(() => import("@/components/CopyrightPermissionForm"));
const LicenseAgreementForm = lazy(() => import("@/components/LicenseAgreementForm"));
const ManufacturingLicenseForm = lazy(() => import("@/components/ManufacturingLicenseForm"));
const MusicLicenseForm = lazy(() => import("@/components/MusicLicenseForm"));
const PatentAssignmentForm = lazy(() => import("@/components/PatentAssignmentForm"));
const RoyaltyAgreementForm = lazy(() => import("@/components/RoyaltyAgreementForm"));
const BillboardLeaseForm = lazy(() => import("@/components/BillboardLeaseForm"));
const OfficeSpaceLeaseForm = lazy(() => import("@/components/OfficeSpaceLeaseForm"));
const StorageSpaceLeaseForm = lazy(() => import("@/components/StorageSpaceLeaseForm"));
const RestaurantLeaseForm = lazy(() => import("@/components/RestaurantLeaseForm"));
const WarehouseLeaseForm = lazy(() => import("@/components/WarehouseLeaseForm"));
const OilLeaseForm = lazy(() => import("@/components/OilLeaseForm"));
const GasLeaseForm = lazy(() => import("@/components/GasLeaseForm"));
const SecurityDepositReturnLetter = lazy(() => import("@/components/SecurityDepositReturnLetter"));
const LeaseTerminationLetter = lazy(() => import("@/components/LeaseTerminationLetter"));
const LateRentPaymentAgreement = lazy(() => import("@/components/LateRentPaymentAgreement"));
const NonDisturbanceAgreement = lazy(() => import("@/components/NonDisturbanceAgreement"));
const AffidavitOfSurvivorshipForm = lazy(() => import("@/components/AffidavitOfSurvivorshipForm"));
const ArbitrationAgreementForm = lazy(() => import("@/components/ArbitrationAgreementForm"));
const ArchitecturalServicesAgreementForm = lazy(() => import("@/components/ArchitecturalServicesAgreementForm"));
const BrokerAgreementForm = lazy(() => import("@/components/BrokerAgreementForm"));
const BillOfSaleForm = lazy(() => import("@/components/BillOfSaleForm"));
const CarpentryContractForm = lazy(() => import("@/components/CarpentryContractForm"));
const CateringAgreementForm = lazy(() => import("@/components/CateringAgreementForm"));
const CollaborationAgreementForm = lazy(() => import("@/components/CollaborationAgreementForm"));
const CoMarketingAgreementForm = lazy(() => import("@/components/CoMarketingAgreementForm"));
const ConsignmentAgreementForm = lazy(() => import("@/components/ConsignmentAgreementForm"));
const ConstructionContractForm = lazy(() => import("@/components/ConstructionContractForm"));
const ConstructionManagementAgreementForm = lazy(() => import("@/components/ConstructionManagementAgreementForm"));
const ConstructionPerformanceBondForm = lazy(() => import("@/components/ConstructionPerformanceBondForm"));
const CooperationAgreementForm = lazy(() => import("@/components/CooperationAgreementForm"));
const CoSignerAgreementForm = lazy(() => import("@/components/CoSignerAgreementForm"));
const CoursePartnershipAgreementForm = lazy(() => import("@/components/CoursePartnershipAgreementForm"));
const MasterServiceAgreementForm = lazy(() => import("@/components/MasterServiceAgreementForm"));
const DrywallServicesAgreementForm = lazy(() => import("@/components/DrywallServicesAgreementForm"));
const EventPhotographyAgreementForm = lazy(() => import("@/components/EventPhotographyAgreementForm"));
const FlooringServicesAgreementForm = lazy(() => import("@/components/FlooringServicesAgreementForm"));
const HomeImprovementContractForm = lazy(() => import("@/components/HomeImprovementContractForm"));
const HomeRemodellingAgreementForm = lazy(() => import("@/components/HomeRemodellingAgreementForm"));
const InformationForPoliceReportForm = lazy(() => import("@/components/InformationForPoliceReportForm")); 
const InteriorDesignAgreementForm = lazy(() => import("@/components/InteriorDesignAgreementForm"));
const JanitorialServicesAgreementForm = lazy(() => import("@/components/JanitorialServicesAgreementForm"));
const LandscapingServicesAgreementForm = lazy(() => import("@/components/LandscapingServicesAgreementForm"));
const LeaseSubordinationAgreementForm = lazy(() => import("@/components/LeaseSubordinationAgreementForm"));
const LimitedPartnershipAgreementForm = lazy(() => import("@/components/LimitedPartnershipAgreementForm"));
const LiquidationDissolutionAgreementForm = lazy(() => import("@/components/LiquidationDissolutionAgreementForm"));
const MemorandumOfAgreementForm = lazy(() => import("@/components/MemorandumOfAgreementForm"));
const MediationAgreementForm = lazy(() => import("@/components/MediationAgreementForm"));
const MOUForm = lazy(() => import("@/components/MOUForm"));
const MusicalPerformanceAgreementForm = lazy(() => import("@/components/MusicalPerformanceAgreementForm"));
const MutualReleaseForm = lazy(() => import("@/components/MutualReleaseForm"));
const MutualRescissionForm = lazy(() => import("@/components/MutualRescissionForm"));
const PaintingServicesContractForm = lazy(() => import("@/components/PaintingServicesContractForm"));
const ParentingPlanForm = lazy(() => import("@/components/ParentingPlanForm"));
const PartnershipAgreementForm = lazy(() => import("@/components/PartnershipAgreementForm"));
const PartnershipDissolutionForm = lazy(() => import("@/components/PartnershipDissolutionForm"));
const PostnuptialAgreementForm = lazy(() => import("@/components/PostnuptialAgreementForm"));
const PrenuptialAgreementForm = lazy(() => import("@/components/PrenuptialAgreementForm"));
const PropertyManagerAgreementForm = lazy(() => import("@/components/PropertyManagerAgreementForm"));
const RealEstateDevelopmentForm = lazy(() => import("@/components/RealEstateDevelopmentForm"));
const RetailerAgreementForm = lazy(() => import("@/components/RetailerAgreementForm"));
const RoofingContractForm = lazy(() => import("@/components/RoofingContractForm"));
const SecurityAgreementForm = lazy(() => import("@/components/SecurityAgreementForm"));
const SeparationAgreementForm = lazy(() => import("@/components/SeparationAgreementForm"));
const ServiceAgreementForm = lazy(() => import("@/components/ServiceAgreementForm"));
const SilentPartnershipForm = lazy(() => import("@/components/SilentPartnershipForm"));
const StrategicAllianceForm = lazy(() => import("@/components/StrategicAllianceForm"));
const TechnicalConsultingForm = lazy(() => import("@/components/TechnicalConsultingForm"));
const VacationLeaseForm = lazy(() => import("@/components/VacationLeaseForm"));
const AssetPurchaseForm = lazy(() => import("@/components/AssetPurchaseForm"));
const BarterAgreementForm = lazy(() => import("@/components/BarterAgreementForm"));
const BusinessSaleAgreementForm = lazy(() => import("@/components/BusinessSaleAgreementForm"));
const AccountingContractForm = lazy(() => import("@/components/AccountingContractForm"));
const AdministrativeServicesContractForm = lazy(() => import("@/components/AdministrativeServicesContractForm"));
const AdvertisingAgencyAgreementForm = lazy(() => import("@/components/AdvertisingAgencyAgreementForm"));
const ClinicalTrialAgreementForm = lazy(() => import("@/components/ClinicalTrialAgreementForm"));
const ContractExtensionForm = lazy(() => import("@/components/ContractExtensionForm"));
const ContractForSaleForm = lazy(() => import("@/components/ContractForSaleForm"));
const FeeAgreementForm = lazy(() => import("@/components/FeeAgreementForm"));
const FranchisePurchaseForm = lazy(() => import("@/components/FranchisePurchaseForm"));
const ITServicesAgreementForm = lazy(() => import("@/components/ITServicesAgreementForm"));
const JointBidAgreementForm = lazy(() => import("@/components/JointBidAgreementForm"));
const MarketingAgreementForm = lazy(() => import("@/components/MarketingAgreementForm"))
const MergerAgreementForm = lazy(() => import("@/components/MergerAgreementForm"));
const ProductDistributionAgreementForm = lazy(() => import("@/components/ProductDistributionAgreementForm"));
const ReferralAndWarrantyForm = lazy(() => import("@/components/ReferralAndWarrantyForm"));
const ServiceLevelAgreementForm = lazy(() => import("@/components/ServiceLevelAgreementForm"));
const SocialMediaContractForm = lazy(() => import("@/components/SocialMediaContractForm"));
const StaffingAgencyContractForm = lazy(() => import("@/components/StaffingAgencyContractForm"));
const StockPurchaseAgreementForm = lazy(() => import("@/components/StockPurchaseAgreementForm"));
const SupplierAgreementForm = lazy(() => import("@/components/StockPurchaseAgreementForm"));
const WarrantyAgreementForm = lazy(() => import("@/components/WarrantyAgreementForm"));
import BidProposalForm from "@/components/BidProposalForm";

import TruckingContractForm from "@/components/TruckingContractForm";
import ProductionContractForm from "@/components/ProductionContractForm";
import MovingContractForm from "@/components/MovingContractForm";
import FulfillmentServicesContractForm from "@/components/FulfillmentAgreementForm";
import RoommateAgreementForm from "@/components/RoommateAgreementForm";
import BartendingAgreementForm from "@/components/BartendingAgreementForm";
import DJServicesAgreementForm from "@/components/DJServicesAgreementForm";
import WeddingPlannerAgreementForm from "@/components/WeddingPlannerAgreementForm";
import FoodServiceAgreementForm from "@/components/FoodServiceAgreementForm";
import VideographyServicesAgreementForm from "@/components/VideographyServicesAgreementForm";
import PersonalTrainingAgreementForm from "@/components/PersonalTrainingAgreementForm";
import TutoringAgreementForm from "@/components/TutoringAgreementForm";
import RetainerAgreementForm from "@/components/RetainerAgreementForm";
import LimousineServiceAgreementForm from "@/components/LimousineServiceAgreementForm";
import ConsultingAgreementForm from "@/components/ConsultingAgreementForm";
import VendorAgreementForm from "@/components/VendorAgreementForm";
import ComposerAgreementForm from "@/components/ComposerAgreementForm";
import ConcessionAgreementForm from "@/components/ConcessionAgreementForm";
import CoTenancyAgreementForm from "@/components/CoTenancyAgreementForm";
import ValetServiceAgreementForm from "@/components/ValetServiceAgreementForm";
import RoommateReleaseAgreementForm from "@/components/RoommateReleaseAgreementForm";
import OfferToLeaseForm from "@/components/documents/OfferToLeaseForm";
import LegalServicesAgreementForm from "@/components/documents/LegalServicesAgreementForm";
import PhysicianServicesAgreementForm from "@/components/documents/PhysicianServicesAgreementForm";
import RealEstateAgentAgreementForm from "@/components/documents/RealEstateAgentAgreementForm";
import LimitedScopeRepresentationAgreementForm from "@/components/documents/LimitedScopeRepresentationAgreementForm";
import UnbundledLegalServicesAgreementForm from "@/components/documents/UnbundledLegalServicesAgreementForm";
import AttorneyEngagementLetterForm from "@/components/documents/AttorneyEngagementLetterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { FileText, Users, ShoppingCart, Briefcase, Heart, ArrowLeft, Building2, DollarSign, Home, Scale, UserCheck, MapPin, Gavel, GraduationCap, Shield, TrendingUp, Handshake, UtensilsCrossed, Fuel,Lock, Phone, Search, Factory, Truck, Package, Boxes, FileSignature, Scroll, Hammer, Utensils, Megaphone, ShieldCheck, Clipboard, BookOpen, HardHat, Camera, ShieldAlert, Sparkles, Building, FileCheck, FileMinus,  MessageSquare, Music, FileX, Paintbrush, Baby, Split, HeartHandshake, SplitSquareHorizontal, Construction, UserMinus, EyeOff, Cpu, Calculator, Stethoscope, CalendarClock, Computer, GitMerge, AlarmClockCheck, Share2, FilePlus } from "lucide-react";
import JointVentureAgreementForm from "@/components/JointVentureAgreementForm";

const Documents = () => {
  const { id } = useParams();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(id || null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Family Protection documents
  const familyProtectionDocs = [
     {
      id: 'InformationForPoliceReportForm',
      title: 'Information For Police Report  ',
      description: 'Create a comprehensive information for police report agreement between two parties for joint ventures and partnerships',
      icon: ShieldAlert ,
      component: InformationForPoliceReportForm
    },
   
     {
      id: 'AffidavitOfSurvivorshipForm',
      title: 'Affidavit Of Survivorship ',
      description: 'Create a comprehensive affidavit agreement between two parties for joint ventures and partnerships',
      icon: Scroll,
      component: AffidavitOfSurvivorshipForm
    },
     {
      id: 'ParentingPlanForm',
      title: 'Parenting Plan Form   ',
      description: 'Create a comprehensive parenting plan agreement between two parties for joint ventures and partnerships',
      icon: Baby ,
      component: ParentingPlanForm
    },
    
     {
      id: 'SeparationAgreementForm',
      title: 'Separation Agreement',
      description: 'Create a comprehensive separation agreement between two parties for joint ventures and partnerships',
      icon: UserMinus  ,
      component: SeparationAgreementForm
    },
     {
      id: 'PrenuptialAgreementForm',
      title: 'Prenuptial Agreement',
      description: 'Create a comprehensive prenuptial agreement between two parties for joint ventures and partnerships',
      icon: SplitSquareHorizontal  ,
      component: PrenuptialAgreementForm
    },
    
       {
      id: 'PostnuptialAgreementForm',
      title: 'Postnuptial Agreement',
      description: 'Create a comprehensive postnuptial agreement between two parties for joint ventures and partnerships',
      icon: HeartHandshake ,
      component: PostnuptialAgreementForm
    },
    {
      id: 'living-will',
      title: 'Living Will',
      description: 'Create a Living Will to specify your health care directives and agent appointments',
      icon: Heart,
      component: LivingWillForm
    },
    {
      id: 'child-care-auth',
      title: 'Child Care Authorization Agreement',
      description: 'Create an authorization agreement for child care arrangements',
      icon: Users,
      component: ChildCareAuthForm
    },
    {
      id: 'affidavit-of-marriage',
      title: 'Affidavit of Marriage',
      description: 'Create an affidavit to verify a name change due to marriage, establishing the connection between former and current names',
      icon: UserCheck,
      component: AffidavitOfMarriageForm
    },
    {
      id: 'divorce-settlement-agreement',
      title: 'Divorce Settlement Agreement',
      description: 'Create a comprehensive divorce settlement agreement covering asset division, debts, spousal support, and terms for dissolution of marriage',
      icon: Gavel,
      component: DivorceSettlementAgreementForm
    },
    {
      id: 'general-power-of-attorney',
      title: 'General Power of Attorney',
      description: 'Create a comprehensive general power of attorney for legal representation',
      icon: FileText,
      component: GeneralPowerOfAttorneyForm
    },
    {
      id: 'special-power-of-attorney',
      title: 'Special Power of Attorney',
      description: 'Create a special power of attorney for specific legal matters and court proceedings',
      icon: Scale,
      component: SpecialPowerOfAttorneyForm
    },

    {
      id: 'gift-affidavit',
      title: 'Gift Affidavit',
      description: 'Create a sworn affidavit declaring that a transfer of money or property is a gift with no expectation of repayment',
      icon: DollarSign,
      component: GiftAffidavitForm
    },

    {
      id: 'financial-support-affidavit',
      title: 'Affidavit of Financial Support',
      description: 'Create a sworn statement of your financial condition and ability to provide financial support',
      icon: DollarSign,
      component: FinancialSupportAffidavitForm
    }
  ];

  // Business Security documents
  const businessSecurityDocs = [
    {
      id: 'production-agreement',
      title: 'Production Agreement',
      description: 'Create a comprehensive production agreement between two parties for joint ventures and partnerships',
      icon: Factory,
      component: ProductionContractForm
    },
    
    
    {
      id: 'WarrantyAgreementForm',
      title: 'Warranty Agreement',
      description: 'Create a comprehensive warranty agreement between two parties for joint ventures and partnerships',
      icon: ShieldCheck,
      component: WarrantyAgreementForm
    },
    {
      id: 'SupplierAgreementForm',
      title: 'Supplier Agreement',
      description: 'Create a comprehensive supplier agreement between two parties for joint ventures and partnerships',
      icon: Truck,
      component: SupplierAgreementForm
    },
    
    {
      id: 'StockPurchaseAgreementForm',
      title: 'Stock Purchase Agreement',
      description: 'Create a comprehensive stock purchase agreement between two parties for joint ventures and partnerships',
      icon: FilePlus,
      component: StockPurchaseAgreementForm
    },
    
    {
      id: 'StaffingAgencyContractForm',
      title: 'Staffing Agency Contract',
      description: 'Create a comprehensive staffing agency agreement between two parties for joint ventures and partnerships',
      icon: Users,
      component: StaffingAgencyContractForm

    },
    
    {
      id: 'SocialMediaContractForm',
      title: 'Social Media Contract',
      description: 'Create a comprehensive social media agreement between two parties for joint ventures and partnerships',
      icon: Share2,
      component: SocialMediaContractForm

    },
    
    {
      id: 'ServiceLevelAgreementForm',
      title: 'Service Level Agreement',
      description: 'Create a comprehensive service level agreement between two parties for joint ventures and partnerships',
      icon: AlarmClockCheck,
      component: ServiceLevelAgreementForm

    },
    
    {
      id: 'ProductDistributionAgreementForm',
      title: 'Product Distribution Agreement',
      description: 'Create a comprehensive product distribution agreement between two parties for joint ventures and partnerships',
      icon: Package,
      component: ProductDistributionAgreementForm

    },
    
    {
      id: 'ReferralAndWarrantyForm',
      title: 'Referral Fee Agreement',
      description: 'Create a comprehensive referral fee agreement between two parties for joint ventures and partnerships',
      icon: Handshake,
      component: ReferralAndWarrantyForm
      

    },
    {
      id: 'MergerAgreementForm',
      title: 'Merger Agreement',
      description: 'Create a comprehensive merger agreement between two parties for joint ventures and partnerships',
      icon: GitMerge,
      component: MergerAgreementForm
      

    },
    {
      id: 'MarketingAgreementForm',
      title: 'Marketing Agreement',
      description: 'Create a comprehensive marketing agreement between two parties for joint ventures and partnerships',
      icon: Megaphone,
      component: MarketingAgreementForm
      

    },
    {
      id: "JointBidAgreementForm",
      title: 'Joint Bid Agreement',
      description: 'Create a comprehensive joint bid agreement between two parties for joint ventures and partnerships',
      icon: Handshake,
      component: JointBidAgreementForm
      
    },
  
  {
    id: 'ITServicesAgreementForm',
    title: 'IT Services Agreement',
    description: 'Create a comprehensive IT services agreement between two parties for joint ventures and partnerships',
    icon: Computer,
    component: ITServicesAgreementForm
  },
    {
      id: 'FranchisePurchaseForm',
      title: 'Franchise Purchase Agreement',
      description: 'Create a comprehensive franchise purchase agreement between two parties for joint ventures and partnerships',
      icon: Factory,
      component: FranchisePurchaseForm
    },
    {
      id: 'FeeAgreementForm',
      title: 'Fee Agreement',
      description: 'Create a comprehensive fee agreement between two parties for joint ventures and partnerships',
      icon: DollarSign,
      component: FeeAgreementForm
    },
    
    {
      id: 'ContractForSaleForm',
      title: 'Contract For Sale',
      description: 'Create a comprehensive contract for sale between two parties for joint ventures and partnerships',
      icon: ShoppingCart,
      component: ContractForSaleForm
    },
    {
      id: 'ContractExtensionForm',
      title: 'Contract Extension',
      description: 'Create a comprehensive contract extension between two parties for joint ventures and partnerships',
      icon: CalendarClock,
      component: ContractExtensionForm
    },
    {
      id: 'ClinicalTrialAgreementForm',
      title: 'Clinical Trial Agreement',
      description: 'Create a comprehensive clinical trial agreement between two parties for joint ventures and partnerships',
      icon: Stethoscope,
      component: ClinicalTrialAgreementForm
    },
    {
      id: 'AdvertisingAgencyAgreementForm',
      title: 'Advertising Agency Agreement',
      description: 'Create a comprehensive advertising agency agreement between two parties for joint ventures and partnerships',
      icon: Megaphone,
      component: AdvertisingAgencyAgreementForm
    },
    {
      id: 'AdministrativeServicesContractForm',
      title: 'Administrative Services Contract',
      description: 'Create a comprehensive administrative services contract between two parties for joint ventures and partnerships',
      icon: Briefcase,
      component: AdministrativeServicesContractForm
    },
    {
      id: 'AccountingContractForm',
      title: 'Accounting Contract',
      description: 'Create a comprehensive accounting contract between two parties for joint ventures and partnerships',
      icon: Calculator,
      component: AccountingContractForm
    },
    {
      id: 'BarterAgreementForm',
      title: 'Barter Agreement',
      description: 'Create a comprehensive barter agreement between two parties for joint ventures and partnerships',
      icon: Handshake,
      component: BarterAgreementForm
    },
    {
      id: 'BusinessSaleAgreementForm',
      title: 'Business Sale Agreement',
      description: 'Create a comprehensive business sale agreement between two parties for joint ventures and partnerships',
      icon: Briefcase,
      component: BusinessSaleAgreementForm
    },
    {
      id: 'AssetPurchaseForm',
      title: 'Asset Purchase Agreement',
      description: 'Create a comprehensive asset purchase agreement between two parties for joint ventures and partnerships',
      icon: Briefcase,
      component: AssetPurchaseForm
    },
    {
      id: 'TechnicalConsultingForm',
      title: 'Technical Consulting Agreement',
      description: 'Create a comprehensive technical consulting agreement between two parties for joint ventures and partnerships',
      icon: Cpu,
      component: TechnicalConsultingForm
    },
    {
      id: 'StrategicAllianceForm',
      title: 'Strategic Alliance Agreement',
      description: 'Create a comprehensive strategic alliance agreement between two parties for joint ventures and partnerships',
      icon: Handshake,
      component: StrategicAllianceForm
    },
    {
      id: 'SilentPartnershipForm',
      title: 'Silent Partnership Agreement',
      description: 'Create a comprehensive silent partnership agreement between two parties for joint ventures and partnerships',
      icon: EyeOff,
      component: SilentPartnershipForm
    },
    
    {
      id: 'ServiceAgreementForm',
      title: 'Service Agreement',
      description: 'Create a comprehensive service agreement between two parties for joint ventures and partnerships',
      icon: Briefcase   ,
      component: ServiceAgreementForm
    },
    
   
    
    {
      id: 'SecurityAgreementForm',
      title: 'Security Agreement',
      description: 'Create a comprehensive security agreement between two parties for joint ventures and partnerships',
      icon: Lock  ,
      component: SecurityAgreementForm
    },
    
   
    
     {
      id: 'RetailerAgreementForm',
      title: 'Retailer Agreement',
      description: 'Create a comprehensive retailer agreement between two parties for joint ventures and partnerships',
      icon: ShoppingCart  ,
      component: RetailerAgreementForm
    },
    
    
    
    
    
      
      {
      id: 'PartnershipDissolutionForm',
      title: 'Partnership Dissolution Agreement    ',
      description: 'Create a comprehensive partnership dissolution agreement between two parties for joint ventures and partnerships',
      icon: Split ,
      component: PartnershipDissolutionForm
    },
    
     {
      id: 'PartnershipAgreementForm',
      title: 'Partnership Agreement    ',
      description: 'Create a comprehensive partnership agreement between two parties for joint ventures and partnerships',
      icon: Handshake ,
      component: PartnershipAgreementForm
    },
    
    
   
    
      {
      id: 'MutualRescissionForm',
      title: 'Mutual Rescission Agreement ',
      description: 'Create a comprehensive mutual recision agreement between two parties for joint ventures and partnerships',
      icon: FileX ,
      component: MutualRescissionForm
    },

    {
      id: 'MutualReleaseForm',
      title: 'Mutual Release Agreement ',
      description: 'Create a comprehensive mutual release agreement between two parties for joint ventures and partnerships',
      icon: FileCheck ,
      component: MutualReleaseForm
    },

    
    {
      id: 'MusicalPerformanceAgreementForm',
      title: 'Musical Performance Agreement  ',
      description: 'Create a comprehensive musical performance agreement between two parties for joint ventures and partnerships',
      icon: Music ,
      component: MusicalPerformanceAgreementForm
    },
    {
      id: 'MOUForm',
      title: 'Memorandum Of Understanding  ',
      description: 'Create a comprehensive MOU agreement between two parties for joint ventures and partnerships',
      icon: FileSignature ,
      component: MOUForm
    },
    
     {
      id: 'MemorandumOfAgreementForm',
      title: 'Memorandum Of Agreement  ',
      description: 'Create a comprehensive memorandum of agreement between two parties for joint ventures and partnerships',
      icon: FileText,
      component: MemorandumOfAgreementForm
    },
    
     {
      id: 'MediationAgreementForm',
      title: 'Mediation Agreement   ',
      description: 'Create a comprehensive mediation agreement between two parties for joint ventures and partnerships',
      icon: MessageSquare,
      component: MediationAgreementForm
    },
    
    
     {
      id: 'LiquidationDissolutionAgreementForm',
      title: 'Liquidation Dissolution Agreement  ',
      description: 'Create a comprehensive liquidation dissolution agreement between two parties for joint ventures and partnerships',
      icon: FileMinus,
      component: LiquidationDissolutionAgreementForm
    },
    
     {
      id: 'LimitedPartnershipAgreementForm',
      title: 'Limited Partnership Agreement  ',
      description: 'Create a comprehensive limited partnership agreement between two parties for joint ventures and partnerships',
      icon: Users,
      component: LimitedPartnershipAgreementForm
    },
    
    
     {
      id: 'LeaseSubordinationAgreementForm',
      title: 'Lease Subordination Agreement   ',
      description: 'Create a comprehensive lease subordiantion agreement between two parties for joint ventures and partnerships',
      icon: FileCheck,
      component: LeaseSubordinationAgreementForm
    },
    
   
    {
      id: 'JointVentureAgreementForm',
      title: 'Joint Venture Agreement  ',
      description: 'Create a comprehensive joint venture agreement between two parties for joint ventures and partnerships',
      icon: Building,
      component: JointVentureAgreementForm
    },
    
    
      
    
    {
      id: 'EventPhotographyAgreementForm',
      title: 'Event Photography Agreement ',
      description: 'Create a comprehensive event photography agreement between two parties for joint ventures and partnerships',
      icon: Factory,
      component: EventPhotographyAgreementForm
    },
    
    
    
    
     {
      id: 'MasterServiceAgreementForm',
      title: 'Master Service Agreement ',
      description: 'Create a comprehensive master service agreement between two parties for joint ventures and partnerships',
      icon: Handshake,
      component: MasterServiceAgreementForm
        },

    
     {
      id: 'CoursePartnershipAgreementForm',
      title: 'Course Partnership Agreement ',
      description: 'Create a comprehensive course partnership agreement between two parties for joint ventures and partnerships',
      icon: BookOpen,
      component: CoursePartnershipAgreementForm
        },
    {
      id: 'ConstructionPerformanceBondForm',
      title: 'Construction Performance Bond Agreement',
      description: 'Create a comprehensive construction performance bond agreement between two parties for joint ventures and partnerships',
      icon: ShieldCheck,
      component: ConstructionPerformanceBondForm
        },

       {
      id: 'CooperationAgreementForm',
      title: 'Cooperation Agreement ',
      description: 'Create a comprehensive cooperation performance bond agreement between two parties for joint ventures and partnerships',
      icon: Users,
      component: CooperationAgreementForm
        },
        
      

      
        
    
    
    
     {
      id: 'ConsignmentAgreementForm',
      title: 'Consignment Agreement',
      description: 'Create a comprehensive consignment agreement between two parties for joint ventures and partnerships',
      icon: Package,
      component: ConsignmentAgreementForm
    },
    
    {
      id: 'CoMarketingAgreementForm',
      title: 'CoMarketing Agreement ',
      description: 'Create a comprehensive CoMarketing agreement between two parties for joint ventures and partnerships',
      icon: Megaphone,
      component: CoMarketingAgreementForm
    },
    
    {
      id: 'CollaborationAgreementForm',
      title: 'Collaboration Agreement ',
      description: 'Create a comprehensive collaboration agreement between two parties for joint ventures and partnerships',
      icon: Handshake,
      component: CollaborationAgreementForm
    },
    
    {
      id: 'CateringAgreementForm',
      title: 'Catering Agreement',
      description: 'Create a comprehensive catering agreement between two parties for joint ventures and partnerships',
      icon: Utensils,
      component: CateringAgreementForm
    },
    
    
   {
    id: 'ArbitrationAgreementForm',
    title: 'Arbitration Agreement',
    description: 'Create a comprehensive arbitration agreement between two parties for joint ventures and partnerships',
    icon: Handshake,
    component: ArbitrationAgreementForm
  },
 
  {
    id: 'BillOfSaleForm',
    title: 'Bill Of Sale',
    description: 'Create a comprehensive bill of sale agreement between two parties for joint ventures and partnerships',
    icon: FileText,
    component: BillOfSaleForm
  },
  {
    id: 'BrokerAgreementForm',
    title: 'Broker Agreement',
    description: 'Create a comprehensive broker agreement between two parties for joint ventures and partnerships',
    icon: Handshake,
    component: BrokerAgreementForm
  },
 
    
    
    
    
      {
      id: 'trucking-agreement',
      title: 'Trucking Agreement',
      description: 'Create a comprehensive trucking agreement between two parties for joint ventures and partnerships',
      icon: Truck,
      component: TruckingContractForm
    },
    {
      id: 'bidproposal-agreement',
      title: 'Bid Proposal Agreement',
      description: 'Create a comprehensive bid proposal agreement between two parties for joint ventures and partnerships',
      icon: FileSignature,
      component: BidProposalForm
    },
     {
      id: 'Moving-agreement',
      title: 'Moving Agreement',
      description: 'Create a comprehensive Moving agreement between two parties for joint ventures and partnerships',
      icon: Package,
      component: MovingContractForm
    },
     {
      id: 'Fulfillment-agreement',
      title: 'Fulfillment Agreement',
      description: 'Create a comprehensive fulfillment agreement between two parties for joint ventures and partnerships',
      icon: Boxes,
      component: FulfillmentServicesContractForm
    },
    {
      id: 'business-agreement',
      title: 'Business Agreement',
      description: 'Create a comprehensive business agreement between two parties for joint ventures and partnerships',
      icon: Briefcase,
      component: BusinessAgreementForm
    },
    
    {
      id: 'DEBTSETTLEMENTAGREEMENT',
      title: 'DEBT SETTLEMENT AGREEMENT',
      description: 'Create a comprehensive debt settlement agreement contract for professional service arrangements and staff augmentation',
      icon: Briefcase,
      component: DEBTSETTLEMENTAGREEMENT
    },
    
    {
      id: 'GuaranteeAgreementForm',
      title: 'Guarantee Agreement Form',
      description: 'Create a comprehensive guarantee agreement form for professional service arrangements and staff augmentation',
      icon: Briefcase,
      component: GuaranteeAgreementForm
    },
    {
      id: 'services-contract',
      title: 'Services Contract',
      description: 'Create a comprehensive services contract for professional service arrangements and staff augmentation',
      icon: Briefcase,
      component: ServicesContractForm
    },
    {
      id: 'payment-agreement',
      title: 'Payment Agreement',
      description: 'Create a comprehensive payment agreement contract for professional service arrangements and staff augmentation',
      icon: Briefcase,
      component: PaymentAgreement
    },
    {
      id: 'SECURITYAGREEMENT',
      title: 'SECURITY AGREEMENT',
      description: 'Create a comprehensive security agreement contract for professional service arrangements and staff augmentation',
      icon: Briefcase,
      component: SECURITYAGREEMENT
    },
    
    
     {
      id: 'PROMISSORYNOTEAGREEMENT',
      title: 'PROMISSORY NOT EAGREEMENT',
      description: 'Create a comprehensive promissory not agreement contract for professional service arrangements and staff augmentation',
      icon: Briefcase,
      component: PROMISSORYNOTEAGREEMENT
    },
    {
      id: 'independent-contractor',
      title: 'Independent Contractor Agreement',
      description: 'Create a comprehensive independent contractor agreement defining work relationship',
      icon: Briefcase,
      component: IndependentContractorForm
    },
    {
      id: 'nda',
      title: 'Non-Disclosure Agreement',
      description: 'Create a legally binding confidentiality agreement to protect sensitive information',
      icon: Shield,
      component: NDAForm
    },
    { 
      id: 'mutual-nda',
      title: 'Mutual Non-Disclosure Agreement',
      description: 'Create a bilateral confidentiality agreement where both parties protect each other\'s sensitive information',
      icon: Handshake,
      component: MutualNDAForm
    },
    {
      id: 'llc-operating-agreement',
      title: 'LLC Operating Agreement',
      description: 'Create a comprehensive Limited Liability Company Operating Agreement with member management and governance provisions',
      icon: Building2,
      component: LLCOperatingAgreementForm
    },
    {
      id: 'sale-agreement',
      title: 'Sale Agreement',
      description: 'Create a comprehensive sale agreement for business transactions',
      icon: Briefcase,
      component: SaleAgreementForm
    },
    {
      id: 'general-contract',
      title: 'General Contract for Products',
      description: 'Create a comprehensive contract for the sale and purchase of products',
      icon: ShoppingCart,
      component: GeneralContractForm
    },
    {
      id: 'share-purchase-agreement',
      title: 'Share Purchase Agreement',
      description: 'Create a comprehensive share purchase agreement for transferring company shares',
      icon: Building2,
      component: SharePurchaseAgreementForm
    },
    {
      id: 'loan-agreement',
      title: 'Loan Agreement',
      description: 'Create a comprehensive loan agreement for personal or business lending arrangements',
      icon: DollarSign,
      component: LoanAgreementForm
    },
     {
      id: 'Cohabitation-AgreementForm',
      title: 'Cohabitation Agreement',
      description: 'Create a comprehensive Cohabitation Agreement for personal or business lending arrangements',
      icon: DollarSign,
      component: CohabitationAgreementForm
    },
    {
      id: 'copyright-assignment',
      title: 'Copyright Assignment',
      description: 'Create a comprehensive copyright assignment agreement to transfer intellectual property rights',
      icon: FileText,
      component: CopyrightAssignmentForm
    },
    {
      id: 'copyright-license',
      title: 'Copyright License Agreement',
      description: 'Grant or obtain rights to use copyrighted material while maintaining ownership',
      icon: Shield,
      component: CopyrightLicenseForm
    },
    {
      id: 'domestic-service-agreement',
      title: 'Domestic Service Agreement',
      description: 'Create a comprehensive domestic service agreement for household employment arrangements',
      icon: Home,
      component: DomesticServiceAgreementForm
    },
    {
      id: 'corporate-bylaws',
      title: 'Corporate Bylaws',
      description: 'Create comprehensive corporate bylaws to establish governance structure and operational procedures',
      icon: Scale,
      component: CorporateBylawsForm
    },
    {
      id: 'buy-sell-agreement',
      title: 'Buy-Sell Agreement',
      description: 'Create a comprehensive buy-sell agreement to manage ownership transfers and protect business interests',
      icon: TrendingUp,
      component: BuySellAgreementForm
    },
    {
      id: 'business-plan',
      title: 'Business Plan',
      description: 'Create a comprehensive business plan for launching and growing your venture',
      icon: Briefcase,
      component: BusinessPlanForm
    },
    {
      id: 'confidential-information',
      title: 'Confidential Information Agreement',
      description: 'Protect sensitive business information with legally binding confidentiality terms',
      icon: Shield,
      component: ConfidentialInformationForm
    },
    {
      id: 'non-circumvention',
      title: 'Non-Circumvention Agreement',
      description: 'Protect your business relationships and prevent contact circumvention',
      icon: Handshake,
      component: NonCircumventionForm
    },
    {
      id: 'copyright-permission',
      title: 'Copyright Permission Request',
      description: 'Formally request permission to use copyrighted material in your projects',
      icon: FileText,
      component: CopyrightPermissionForm
    },
    {
      id: 'patent-assignment',
      title: 'Patent Assignment Agreement',
      description: 'Create a comprehensive patent assignment agreement to transfer patent rights and ownership',
      icon: Shield,
      component: PatentAssignmentForm
    },
    {
      id: 'royalty-agreement',
      title: 'Royalty Agreement',
      description: 'Create a professional royalty agreement for intellectual property licensing and compensation',
      icon: DollarSign,
      component: RoyaltyAgreementForm
    },
      {
      id: 'Confidentialityagreement',
      title: ' Confidentiality agreement ',
      description: 'Create a professional Employee Confidentiality agreement  for intellectual property licensing and compensation',
      icon: Lock ,
      component: Confidentialityagreement
    },
     {
      id: 'Employeehandbook',
      title: 'Employee handbook',
      description: 'Create a professional Employee handbook agreement  for intellectual property licensing and compensation',
      icon: Users,
      component: Employeehandbook
    },
      {
      id: 'employeeretirementt',
      title: ' Employee retirement agreement ',
      description: 'Create a professional Employee retirement agreement  for intellectual property licensing and compensation',
      icon: Briefcase,
      component: Employeeretirement
    }, 
      {
      id: 'EmploymentAgreement',
      title: 'Employment Agreement',
      description: 'Create a professional Employment Agreement   for intellectual property licensing and compensation',
      icon: TrendingUp,
      component: EmploymentAgreement
    }, 
     {
      id: 'lastwill',
      title: ' Last will and Testament  ',
      description: 'Create a professional  last will and testament agreement   for intellectual property licensing and compensation',
      icon: Home,
      component: lastwill
    }, 
    {
      id: 'Home-Agreement',
      title: 'Work  from home agreement ',
      description: 'Create a professional Work from home  agreement for intellectual property licensing and compensation',
      icon: Home,
      component: workfromhome
    }, 
     {
      id: 'employment',
      title: ' Offer of employment letter',
      description: 'Create a professional Offer of employment letter  for intellectual property licensing and compensation',
      icon: Users,
      component:Offerofemployment 
    },
    {
      id: 'Severance',
      title: 'Severance agreement ',
      description: 'Create a professional  Severance agreement   for intellectual property licensing and compensation',
      icon: DollarSign,
      component:Severance 
     
    },
     {
      id: 'software',
      title: ' Software license agreement ',
      description: 'Create a professional  Software license agreement  for intellectual property licensing and compensation',
      icon: FileText,
      component: Softwarelicense
    },
    {
      id: 'license-agreement',
      title: 'License Agreement',
      description: 'Create a comprehensive license agreement for intellectual property rights and royalty management',
      icon: Scale,
      component: LicenseAgreementForm
    },
    {
      id: 'manufacturing-license',
      title: 'Manufacturing License Agreement',
      description: 'Create a manufacturing license agreement with quality control and legal protection',
      icon: Scale,
      component: ManufacturingLicenseForm
    },
    {
      id: 'music-license',
      title: 'Music License Agreement',
      description: 'Create a music licensing agreement for copyright protection and royalty management',
      icon: Scale,
      component: MusicLicenseForm
    },
    {
      id: 'office-space-lease',
      title: 'Office Space Lease Agreement',
      description: 'Create a comprehensive lease agreement for renting office space',
      icon: Building2,
      component: OfficeSpaceLeaseForm
    },
  ];

  // Property Matters documents
  const propertyMattersDocs = [
     {
      id: 'JanitorialServicesAgreementForm',
      title: 'Janitorial Services Agreement ',
      description: 'Create a comprehensive Janitorial agreement between two parties for joint ventures and partnerships',
      icon: Sparkles,
      component: JanitorialServicesAgreementForm
    },
    {
      id: 'VacationLeaseForm',
      title: 'Vacation Lease Agreement',
      description: 'Create a comprehensive vacation lease agreement between two parties for joint ventures and partnerships',
      icon: Building2,
      component: VacationLeaseForm
    },
    
      {
      id: 'InteriorDesignAgreementForm',
      title: 'Interior Design Agreement',
      description: 'Create a comprehensive interior design agreement between two parties for joint ventures and partnerships',
      icon: Home,
      component: InteriorDesignAgreementForm
    },
     {
    id: 'CarpentryContractForm',
    title: 'Carpentry Contract',
    description: 'Create a comprehensive carpentry agreement between two parties for joint ventures and partnerships',
    icon: Hammer,
    component: CarpentryContractForm
  },
     {
    id: 'ArchitecturalServicesAgreementForm',
    title: 'Architectural Services Agreement',
    description: 'Create a comprehensive architectural agreement between two parties for joint ventures and partnerships',
    icon: Home,
    component: ArchitecturalServicesAgreementForm
  },
    {
      id: 'ConstructionManagementAgreementForm',
      title: 'Construction Management Agreement',
      description: 'Create a comprehensive construction management agreement between two parties for joint ventures and partnerships',
      icon: Handshake,
      component: ConstructionManagementAgreementForm
    },
    
     {
      id: 'ConstructionContractForm',
      title: 'Construction Contract',
      description: 'Create a comprehensive construction agreement between two parties for joint ventures and partnerships',
      icon: Home,
      component: ConstructionContractForm
    },
     {
      id: 'DrywallServicesAgreementForm',
      title: 'Drywall Services Agreement ',
      description: 'Create a comprehensive drywall services agreement between two parties for joint ventures and partnerships',
      icon: Camera,
      component: DrywallServicesAgreementForm
        },
     {
      id: 'HomeRemodellingAgreementForm',
      title: 'Home Remodelling Agreement ',
      description: 'Create a comprehensive home remodelling agreement between two parties for joint ventures and partnerships',
      icon: Home,
      component: HomeRemodellingAgreementForm
    },

    
    
     {
      id: 'HomeImprovementContractForm',
      title: 'Home Improvement Contract  ',
      description: 'Create a comprehensive home improvement agreement between two parties for joint ventures and partnerships',
      icon: FileText,
      component: HomeImprovementContractForm
    },
    
    
     {
      id: 'FlooringServicesAgreementForm',
      title: 'Flooring Services Agreement ',
      description: 'Create a comprehensive flooring services agreement between two parties for joint ventures and partnerships',
      icon: HardHat,
      component: FlooringServicesAgreementForm
    },
     {
      id: 'LandscapingServicesAgreementForm',
      title: 'Landscaping Services Agreement  ',
      description: 'Create a comprehensive landscaping services agreement between two parties for joint ventures and partnerships',
      icon: Home,
      component: LandscapingServicesAgreementForm
    },
    
     {
      id: 'PaintingServicesContractForm',
      title: 'Painting Services Contract  ',
      description: 'Create a comprehensive painting services agreement between two parties for joint ventures and partnerships',
      icon: Paintbrush ,
      component: PaintingServicesContractForm
    },
     {
      id: 'RealEstateDevelopmentForm',
      title: 'Real Estate Development',
      description: 'Create a comprehensive real estate development agreement between two parties for joint ventures and partnerships',
      icon: Construction  ,
      component: RealEstateDevelopmentForm
    },
    

 {
      id: 'PropertyManagerAgreementForm',
      title: 'Property Manager Agreement',
      description: 'Create a comprehensive property manager agreement between two parties for joint ventures and partnerships',
      icon: Home  ,
      component: PropertyManagerAgreementForm
    },
      {
      id: 'RoofingContractForm',
      title: 'Roofing Contract Agreement',
      description: 'Create a comprehensive roofing contract agreement between two parties for joint ventures and partnerships',
      icon: Clipboard  ,
      component: RoofingContractForm
    },
     {
      id: 'CoSignerAgreementForm',
      title: 'CoSigner Agreement ',
      description: 'Create a comprehensive CoSigner agreement between two parties for joint ventures and partnerships',
      icon: Clipboard,
      component: CoSignerAgreementForm
        },
    {
      id: 'lease-agreement',
      title: 'Lease Agreement',
      description: 'Generate a comprehensive lease agreement for rental properties.',
      icon: FileText,
      component: ConditionalForm
    },
    {
      id: 'condominium-lease',
      title: 'Condominium Lease Agreement',
      description: 'Create a comprehensive lease agreement specifically for condominium units',
      icon: Building2,
      component: CondominiumLeaseForm
    },
    {
      id: 'lease-renewal',
      title: 'Lease Renewal Agreement',
      description: 'Create a comprehensive lease renewal agreement to extend existing rental terms',
      icon: FileText,
      component: LeaseRenewalForm
    },
    {
      id: 'lease-termination',
      title: 'Agreement to Terminate Lease',
      description: 'Create a mutual agreement to terminate a lease before its expiration date',
      icon: FileText,
      component: LeaseTerminationForm
    },
    {
      id: 'rent-increase',
      title: 'Rent Increase Agreement',
      description: 'Create a formal agreement to increase rent between landlord and tenant',
      icon: DollarSign,
      component: RentIncreaseForm
    },
    {
      id: 'sublease',
      title: 'Sublease Agreement',
      description: 'Create a comprehensive sublease agreement with property inspection checklist',
      icon: Building2,
      component: SubleaseForm
    },
    {
      id: 'lease-amendment',
      title: 'Lease Amendment',
      description: 'Create a formal amendment to modify existing lease terms and conditions',
      icon: FileText,
      component: LeaseAmendmentForm
    },
    {
      id: 'roommate-agreement',
      title: 'Roommate Agreement',
      description: 'Create a comprehensive agreement between roommates for shared living arrangements',
      icon: Users,
      component: RoommateAgreementForm
    },
    {
      id: 'bartending-agreement',
      title: 'Bartending Services Agreement',
      description: 'Create a professional bartending services agreement for events',
      icon: UtensilsCrossed,
      component: BartendingAgreementForm
    },
    {
      id: 'dj-services-agreement',
      title: 'DJ Services Agreement',
      description: 'Create a professional DJ services agreement for events and performances',
      icon: Music,
      component: DJServicesAgreementForm
    },
    {
      id: 'wedding-planner-agreement',
      title: 'Wedding Planner Agreement',
      description: 'Create a comprehensive wedding planner services agreement',
      icon: Heart,
      component: WeddingPlannerAgreementForm
    },
    {
      id: 'food-service-agreement',
      title: 'Food Service Agreement',
      description: 'Create a catering and food service agreement for events',
      icon: UtensilsCrossed,
      component: FoodServiceAgreementForm
    },
    {
      id: 'videography-agreement',
      title: 'Videography Services Agreement',
      description: 'Create a professional videography services agreement for events',
      icon: Camera,
      component: VideographyServicesAgreementForm
    },
    {
      id: 'personal-training-agreement',
      title: 'Personal Training Agreement',
      description: 'Create a personal training services agreement between trainer and client',
      icon: Heart,
      component: PersonalTrainingAgreementForm
    },
    {
      id: 'tutoring-agreement',
      title: 'Tutoring Agreement',
      description: 'Create a tutoring services agreement between tutor and student/parent',
      icon: GraduationCap,
      component: TutoringAgreementForm
    },
    {
      id: 'retainer-agreement',
      title: 'Retainer Agreement',
      description: 'Create a legal retainer agreement between attorney and client',
      icon: Scale,
      component: RetainerAgreementForm
    },
    {
      id: 'limousine-agreement',
      title: 'Limousine Service Agreement',
      description: 'Create a professional limousine service agreement for events',
      icon: Truck,
      component: LimousineServiceAgreementForm
    },
    {
      id: 'consulting-agreement',
      title: 'Consulting Agreement',
      description: 'Create a consulting services agreement between consultant and client',
      icon: Briefcase,
      component: ConsultingAgreementForm
    },
    {
      id: 'vendor-agreement',
      title: 'Vendor Agreement',
      description: 'Create a vendor services agreement for event or business services',
      icon: FileText,
      component: VendorAgreementForm
    },
    {
      id: 'composer-agreement',
      title: 'Composer Agreement',
      description: 'Create a comprehensive agreement between a production company and composer for original music',
      icon: FileText,
      component: ComposerAgreementForm
    },
    {
      id: 'concession-agreement',
      title: 'Concession Agreement',
      description: 'Create a comprehensive concession agreement for vendor operations',
      icon: FileText,
      component: ConcessionAgreementForm
    },
    {
      id: 'co-tenancy-agreement',
      title: 'Co-Tenancy Agreement',
      description: 'Create an agreement between roommates sharing a rental property',
      icon: Users,
      component: CoTenancyAgreementForm
    },
    {
      id: 'valet-service-agreement',
      title: 'Valet Service Agreement',
      description: 'Create a professional valet parking services agreement',
      icon: FileText,
      component: ValetServiceAgreementForm
    },
    {
      id: 'commercial-lease',
      title: 'Commercial Lease Agreement',
      description: 'Create a comprehensive commercial lease agreement for business properties',
      icon: Building2,
      component: CommercialLeaseForm
    },
    {
      id: 'billboard-lease',
      title: 'Billboard Lease Agreement',
      description: 'Create a comprehensive lease agreement for billboard advertising space on private property',
      icon: Building2,
      component: BillboardLeaseForm
    },
    {
      id: 'agreement-to-sell',
      title: 'Agreement to Sell',
      description: 'Create a comprehensive agreement to sell for property transactions',
      icon: FileText,
      component: AgreementToSellForm
    },
    {
      id: 'eviction-notice',
      title: 'Eviction Notice',
      description: 'Create a formal notice to terminate a tenancy and initiate eviction proceedings',
      icon: FileText,
      component: EvictionNoticeForm
    },
    {
      id: 'affidavit-of-residence',
      title: 'Affidavit of Residence',
      description: 'Create an affidavit to verify residence for living or deceased persons, establishing legal domicile and residence history',
      icon: MapPin,
      component: AffidavitOfResidenceForm
    },
    {
      id: 'transcript-request',
      title: 'Transcript Request',
      description: 'Create a formal request for academic transcripts and degree documents from educational institutions',
      icon: GraduationCap,
      component: TranscriptRequestForm
    },
    {
      id: 'storage-space-lease',
      title: 'Storage Space Lease Agreement',
      description: 'Create a comprehensive lease agreement for renting storage space',
      icon: Building2,
      component: StorageSpaceLeaseForm
    },
    {
      id: 'restaurant-lease',
      title: 'Restaurant Lease Agreement',
      description: 'Create a comprehensive lease agreement for restaurant and food service operations',
      icon: UtensilsCrossed,
      component: RestaurantLeaseForm
    },
    {
      id: 'warehouse-lease',
      title: 'Warehouse Lease Agreement',
      description: 'Create a comprehensive lease agreement for warehouse, storage, and distribution facilities',
      icon: Building2,
      component: WarehouseLeaseForm
    },
    {
      id: 'oil-lease',
      title: 'Oil Lease Agreement',
      description: 'Create a comprehensive oil and gas lease agreement for mineral rights and hydrocarbon extraction',
      icon: Fuel,
      component: OilLeaseForm
    },
    {
      id: 'gas-lease',
      title: 'Gas Lease Agreement',
      description: 'Create a comprehensive gas lease agreement for natural gas exploration and energy development',
      icon: Fuel,
      component: GasLeaseForm
    },
    {
      id: 'security-deposit-return',
      title: 'Security Deposit Return Letter',
      description: 'Create a professional letter for returning security deposits with deduction details',
      icon: FileText,
      component: SecurityDepositReturnLetter
    },
    {
      id: 'lease-termination-letter',
      title: 'Lease Termination Letter',
      description: 'Create a professional letter to notify tenants of lease termination',
      icon: FileText,
      component: LeaseTerminationLetter
    },
    {
      id: 'late-rent-payment-agreement',
      title: 'Late Rent Payment Agreement',
      description: 'Create a professional agreement for tenants with past due rent to establish payment plans',
      icon: DollarSign,
      component: LateRentPaymentAgreement
    },
    {
      id: 'non-disturbance-agreement',
      title: 'Non-Disturbance Agreement',
      description: 'Create a professional non-disturbance agreement between mortgagee and tenant',
      icon: Shield,
      component: NonDisturbanceAgreement
    },
    {
      id: 'roommate-release-agreement',
      title: 'Roommate Release Agreement',
      description: 'Create an agreement to release a roommate from a shared lease',
      icon: UserMinus,
      component: RoommateReleaseAgreementForm
    },
    {
      id: 'offer-to-lease',
      title: 'Offer to Lease',
      description: 'Create a formal offer to lease commercial property',
      icon: Building2,
      component: OfferToLeaseForm
    },
    {
      id: 'legal-services-agreement',
      title: 'Legal Services Agreement',
      description: 'Create a comprehensive attorney-client legal services agreement',
      icon: Scale,
      component: LegalServicesAgreementForm
    },
    {
      id: 'physician-services-agreement',
      title: 'Physician Services Agreement',
      description: 'Create a professional agreement for physician services',
      icon: Stethoscope,
      component: PhysicianServicesAgreementForm
    },
    {
      id: 'real-estate-agent-agreement',
      title: 'Real Estate Agent Agreement',
      description: 'Create an exclusive listing agreement with a real estate agent',
      icon: Home,
      component: RealEstateAgentAgreementForm
    },
    {
      id: 'limited-scope-representation-agreement',
      title: 'Limited Scope Representation Agreement',
      description: 'Create a limited scope legal representation agreement',
      icon: Scale,
      component: LimitedScopeRepresentationAgreementForm
    },
    {
      id: 'unbundled-legal-services-agreement',
      title: 'Unbundled Legal Services Agreement',
      description: 'Create an agreement for specific unbundled legal services',
      icon: Scale,
      component: UnbundledLegalServicesAgreementForm
    },
    {
      id: 'attorney-engagement-letter',
      title: 'Attorney Engagement Letter',
      description: 'Create a formal attorney engagement letter for legal representation',
      icon: FileText,
      component: AttorneyEngagementLetterForm
    }
  ];

  // Combine all documents for direct access
  const allDocumentTypes = [...familyProtectionDocs, ...businessSecurityDocs, ...propertyMattersDocs];

  // Get documents for selected category
  const getCategoryDocuments = (category: string) => {
    switch (category) {
      case 'family-protection':
        return familyProtectionDocs;
      case 'business-security':
        return businessSecurityDocs;
      case 'property-matters':
        return propertyMattersDocs;
      default:
        return allDocumentTypes;
    }
  };

  const selectedDocumentType = allDocumentTypes.find(doc => doc.id === selectedDocument);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedDocument(null);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedDocument(null);
  };

  const handleBackToDocuments = () => {
    setSelectedDocument(null);
  };

  // Filter documents based on search query
  const filterDocuments = (documents: any[]) => {
    if (!searchQuery.trim()) return documents;
    
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Render specific document form
  if (selectedDocument && selectedDocumentType) {
    const DocumentComponent = selectedDocumentType.component;
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 bg-white min-h-screen">
          <div className="mb-8 pt-16">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{selectedDocumentType.title}</h1>
              <p className="text-muted-foreground">
                {selectedDocumentType.description}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleBackToDocuments}
              className="mb-4 mt-4 pt-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Document Selection
            </Button>
          </div>
          
          {/* Form with About Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Form - 68% on large screens */}
            <div className="w-full lg:w-[68%] xl:w-[70%] min-w-0">
              <Suspense fallback={
                <div className="flex h-64 w-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              }>
                <DocumentComponent />
              </Suspense>
            </div>
            
            {/* About Sidebar */}
            <DocumentAboutSidebar 
              documentId={selectedDocument} 
              onNavigateToDocument={(docId) => setSelectedDocument(docId)}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // Render documents in selected category
  if (selectedCategory) {
    const categoryDocuments = getCategoryDocuments(selectedCategory);
    const filteredDocuments = filterDocuments(categoryDocuments);
    const categoryTitles = {
      'family-protection': 'Family Protection Documents',
      'business-security': 'Business Security Documents', 
      'property-matters': 'Property Matters Documents'
    };

    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 bg-white min-h-screen pt-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 pt-4">{categoryTitles[selectedCategory as keyof typeof categoryTitles]}</h1>
            <p className="text-muted-foreground mb-6">
              Choose a document type to begin generating your legal documents
            </p>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={handleBackToCategories}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((docType) => {
                const IconComponent = docType.icon;
                return (
                  <Card 
                    key={docType.id}
                    className="flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow bg-white"
                    onClick={() => setSelectedDocument(docType.id)}
                  >
                    <CardHeader className="text-center flex flex-col flex-grow">
                      <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <CardTitle className="text-xl">{docType.title}</CardTitle>
                      <CardDescription className="flex-grow flex items-center justify-center min-h-[64px]">
                        {docType.description}
                      </CardDescription>
                    </CardHeader>
                    <div className="flex-1" />
                    <CardContent className="text-center mt-auto">
                      <Button 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDocument(docType.id);
                        }}
                      >
                        Start Creating Document
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No documents found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  // Render category selection (main page)
  return (
    <Layout>
      <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 pb-8 pt-28 px-4">
        <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 pt-4">Legal Documents</h1>
        <p className="text-muted-foreground mb-6">
          Create professional legal documents from our comprehensive library
        </p>
        </div>
      </div>
      <LegalConcernsSection onCategorySelect={handleCategorySelect} />
      </div>
    </Layout>
  );
};

export default Documents;
