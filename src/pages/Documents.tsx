import React, { useState, lazy, Suspense, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import LegalConcernsSection from "@/components/LegalConcernsSection";
import DocumentAboutSidebar from "@/components/DocumentAboutSidebar";
import DocumentInfoLanding from "@/components/DocumentInfoLanding";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { 
  Search,
  ShoppingCart, // <--- ADD THIS to fix the error in your screenshot // This is the import you need
  FileText, Users, Briefcase, Heart, ArrowLeft, Building2, 
  DollarSign, Home, Scale, UserCheck, MapPin, Gavel, GraduationCap, 
  Shield, TrendingUp, Handshake, UtensilsCrossed, Fuel, Lock, 
  Factory, Truck, Package, Boxes, FileSignature, Scroll, Hammer, 
  Utensils, Megaphone, ShieldCheck, Clipboard, BookOpen, HardHat, Camera, 
  ShieldAlert, Sparkles, Building, FileCheck, FileMinus, MessageSquare, 
  Music, FileX, Paintbrush, Baby, Split, HeartHandshake, SplitSquareHorizontal, 
  Construction, UserMinus, EyeOff, Cpu, Calculator, Stethoscope, 
  CalendarClock, Computer, GitMerge, AlarmClockCheck, Share2, FilePlus 
} from "lucide-react";

// --- LAZY IMPORTS ---
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
const ReferralFeeAgreementForm = lazy(() => import("@/components/ReferralFeeAgreementForm"));
const SaleOfGoodsForm = lazy(() => import("@/components/SaleOfGoodsForm"));
const ProductDistributionAgreementForm = lazy(() => import("@/components/ProductDistributionAgreementForm"));
const ITServiceAgreementForm = lazy(() => import("@/components/ITServiceAgreementForm"));
const AdvertisingAgencyAgreementForm = lazy(() => import("@/components/AdvertisingAgencyAgreementForm"));
const ContractExtensionForm = lazy(() => import("@/components/ContractExtensionForm"));
const MarketingAgreementForm = lazy(() => import("@/components/MarketingAgreementForm"));
const ClinicalTrialAgreementForm = lazy(() => import("@/components/ClinicalTrialAgreementForm"));
const ContractForSaleForm = lazy(() => import("@/components/ContractForSaleForm"));
const FeeAgreementForm = lazy(() => import("@/components/FeeAgreementForm"));
const FranchisePurchaseForm = lazy(() => import("@/components/FranchisePurchaseForm"));
const ITServicesAgreementForm = lazy(() => import("@/components/ITServicesAgreementForm"));
const JointBidAgreementForm = lazy(() => import("@/components/JointBidAgreementForm"));
const MergerAgreementForm = lazy(() => import("@/components/MergerAgreementForm"));
const ReferralAndWarrantyForm = lazy(() => import("@/components/ReferralAndWarrantyForm"));
const ServiceLevelAgreementForm = lazy(() => import("@/components/ServiceLevelAgreementForm"));
const SocialMediaContractForm = lazy(() => import("@/components/SocialMediaContractForm"));
const StaffingAgencyContractForm = lazy(() => import("@/components/StaffingAgencyContractForm"));
const StockPurchaseAgreementForm = lazy(() => import("@/components/StockPurchaseAgreementForm"));
const SupplierAgreementForm = lazy(() => import("@/components/SupplierAgreementForm"));
const WarrantyAgreementForm = lazy(() => import("@/components/WarrantyAgreementForm"));
const BidProposalForm = lazy(() => import("@/components/BidProposalForm"));
const TruckingContractForm = lazy(() => import("@/components/TruckingContractForm"));
const ProductionContractForm = lazy(() => import("@/components/ProductionContractForm"));
const MovingContractForm = lazy(() => import("@/components/MovingContractForm"));
const FulfillmentServicesContractForm = lazy(() => import("@/components/FulfillmentAgreementForm"));
const RoommateAgreementForm = lazy(() => import("@/components/RoommateAgreementForm"));
const BartendingAgreementForm = lazy(() => import("@/components/BartendingAgreementForm"));
const DJServicesAgreementForm = lazy(() => import("@/components/DJServicesAgreementForm"));
const WeddingPlannerAgreementForm = lazy(() => import("@/components/WeddingPlannerAgreementForm"));
const FoodServiceAgreementForm = lazy(() => import("@/components/FoodServiceAgreementForm"));
const VideographyServicesAgreementForm = lazy(() => import("@/components/VideographyServicesAgreementForm"));
const PersonalTrainingAgreementForm = lazy(() => import("@/components/PersonalTrainingAgreementForm"));
const TutoringAgreementForm = lazy(() => import("@/components/TutoringAgreementForm"));
const RetainerAgreementForm = lazy(() => import("@/components/RetainerAgreementForm"));
const LimousineServiceAgreementForm = lazy(() => import("@/components/LimousineServiceAgreementForm"));
const ConsultingAgreementForm = lazy(() => import("@/components/ConsultingAgreementForm"));
const VendorAgreementForm = lazy(() => import("@/components/VendorAgreementForm"));
const ComposerAgreementForm = lazy(() => import("@/components/ComposerAgreementForm"));
const ConcessionAgreementForm = lazy(() => import("@/components/ConcessionAgreementForm"));
const CoTenancyAgreementForm = lazy(() => import("@/components/CoTenancyAgreementForm"));
const ValetServiceAgreementForm = lazy(() => import("@/components/ValetServiceAgreementForm"));
const RoommateReleaseAgreementForm = lazy(() => import("@/components/RoommateReleaseAgreementForm"));
const OfferToLeaseForm = lazy(() => import("@/components/documents/OfferToLeaseForm"));
const LegalServicesAgreementForm = lazy(() => import("@/components/documents/LegalServicesAgreementForm"));
const PhysicianServicesAgreementForm = lazy(() => import("@/components/documents/PhysicianServicesAgreementForm"));
const RealEstateAgentAgreementForm = lazy(() => import("@/components/documents/RealEstateAgentAgreementForm"));
const LimitedScopeRepresentationAgreementForm = lazy(() => import("@/components/documents/LimitedScopeRepresentationAgreementForm"));
const UnbundledLegalServicesAgreementForm = lazy(() => import("@/components/documents/UnbundledLegalServicesAgreementForm"));
const AttorneyEngagementLetterForm = lazy(() => import("@/components/documents/AttorneyEngagementLetterForm"));
const AffidavitGeneralForm = lazy(() => import("@/components/documents/AffidavitGeneralForm"));
const AffidavitCharacterForm = lazy(() => import("@/components/documents/AffidavitCharacterForm"));
const AffidavitOwnershipForm = lazy(() => import("@/components/documents/AffidavitOwnershipForm"));
const HealthcarePOAForm = lazy(() => import("@/components/documents/HealthcarePOAForm"));
const VehicleLeaseForm = lazy(() => import("@/components/documents/VehicleLeaseForm"));
const JointVentureAgreementForm = lazy(() => import("@/components/JointVentureAgreementForm"));

// --- DOCUMENT DEFINITIONS (Exported) ---

export const familyProtectionDocs = [
  { id: "InformationForPoliceReportForm", title: "Information For Police Report", description: "Create a comprehensive information for police report agreement", icon: ShieldAlert, category: "Legal Reports", component: InformationForPoliceReportForm },
  { id: "AffidavitOfSurvivorshipForm", title: "Affidavit Of Survivorship", description: "Create a comprehensive affidavit for survivorship", icon: Scroll, category: "Affidavits", component: AffidavitOfSurvivorshipForm },
  { id: "ParentingPlanForm", title: "Parenting Plan Form", description: "Create a comprehensive parenting plan agreement", icon: Baby, category: "Child & Family", component: ParentingPlanForm },
  { id: "SeparationAgreementForm", title: "Separation Agreement", description: "Create a comprehensive separation agreement", icon: UserMinus, category: "Marriage & Divorce", component: SeparationAgreementForm },
  { id: "PrenuptialAgreementForm", title: "Prenuptial Agreement", description: "Create a comprehensive prenuptial agreement", icon: SplitSquareHorizontal, category: "Marriage & Divorce", component: PrenuptialAgreementForm },
  { id: "PostnuptialAgreementForm", title: "Postnuptial Agreement", description: "Create a comprehensive postnuptial agreement", icon: HeartHandshake, category: "Marriage & Divorce", component: PostnuptialAgreementForm },
  { id: "living-will", title: "Living Will", description: "Create a Living Will to specify your health care directives", icon: Heart, category: "Healthcare", component: LivingWillForm },
  { id: "child-care-auth", title: "Child Care Authorization Agreement", description: "Create an authorization agreement for child care arrangements", icon: Users, category: "Child & Family", component: ChildCareAuthForm },
  { id: "affidavit-of-marriage", title: "Affidavit of Marriage", description: "Create an affidavit to verify a name change due to marriage", icon: UserCheck, category: "Affidavits", component: AffidavitOfMarriageForm },
  { id: "divorce-settlement-agreement", title: "Divorce Settlement Agreement", description: "Create a comprehensive divorce settlement agreement", icon: Gavel, category: "Marriage & Divorce", component: DivorceSettlementAgreementForm },
  { id: "general-power-of-attorney", title: "General Power of Attorney", description: "Create a comprehensive general power of attorney for legal representation", icon: FileText, category: "Power of Attorney", component: GeneralPowerOfAttorneyForm },
  { id: "special-power-of-attorney", title: "Special Power of Attorney", description: "Create a special power of attorney for specific legal matters", icon: Scale, category: "Power of Attorney", component: SpecialPowerOfAttorneyForm },
  { id: "gift-affidavit", title: "Gift Affidavit", description: "Create a sworn affidavit declaring a transfer of money or property is a gift", icon: DollarSign, category: "Affidavits", component: GiftAffidavitForm },
  { id: "financial-support-affidavit", title: "Affidavit of Financial Support", description: "Create a sworn statement of your financial condition", icon: DollarSign, category: "Affidavits", component: FinancialSupportAffidavitForm },
  { id: "affidavit-general", title: "General Affidavit", description: "Create a legally binding sworn statement for various purposes", icon: FileText, category: "Affidavits", component: AffidavitGeneralForm },
  { id: "affidavit-character", title: "Affidavit of Character", description: "Create a sworn character reference statement for legal proceedings", icon: UserCheck, category: "Affidavits", component: AffidavitCharacterForm },
  { id: "affidavit-ownership", title: "Affidavit of Ownership", description: "Formally declare ownership of property with a sworn statement", icon: FileSignature, category: "Affidavits", component: AffidavitOwnershipForm },
  { id: "healthcare-poa", title: "Healthcare Power of Attorney", description: "Authorize someone to make medical decisions on your behalf", icon: Heart, category: "Healthcare", component: HealthcarePOAForm },
  { id: "lastwill", title: "Last Will and Testament", description: "Create a professional last will and testament agreement", icon: Home, category: "Child & Family", component: lastwill },
  { id: "Cohabitation-AgreementForm", title: "Cohabitation Agreement", description: "Create a comprehensive Cohabitation Agreement", icon: DollarSign, category: "Marriage & Divorce", component: SharePurchaseAgreementForm }
];

export const businessSecurityDocs = [
  { id: "production-agreement", title: "Production Agreement", description: "Create a comprehensive production agreement between two parties", icon: Factory, category: "Contracts", component: ProductionContractForm },
  { id: "WarrantyAgreementForm", title: "Warranty Agreement", description: "Create a comprehensive warranty agreement", icon: ShieldCheck, category: "Contracts", component: WarrantyAgreementForm },
  { id: "SupplierAgreementForm", title: "Supplier Agreement", description: "Create a comprehensive supplier agreement", icon: Truck, category: "Contracts", component: SupplierAgreementForm },
  { id: "StockPurchaseAgreementForm", title: "Stock Purchase Agreement", description: "Create a comprehensive stock purchase agreement", icon: FilePlus, category: "Business Formation", component: StockPurchaseAgreementForm },
  { id: "StaffingAgencyContractForm", title: "Staffing Agency Contract", description: "Create a comprehensive staffing agency agreement", icon: Users, category: "Employment", component: StaffingAgencyContractForm },
  { id: "SocialMediaContractForm", title: "Social Media Contract", description: "Create a comprehensive social media agreement", icon: Share2, category: "Marketing", component: SocialMediaContractForm },
  { id: "ServiceLevelAgreementForm", title: "Service Level Agreement", description: "Create a comprehensive service level agreement", icon: AlarmClockCheck, category: "Contracts", component: ServiceLevelAgreementForm },
  { id: "ProductDistributionAgreementForm", title: "Product Distribution Agreement", description: "Create a comprehensive product distribution agreement", icon: Package, category: "Contracts", component: ProductDistributionAgreementForm },
  { id: "ReferralAndWarrantyForm", title: "Referral Fee Agreement", description: "Create a comprehensive referral fee agreement", icon: Handshake, category: "Contracts", component: ReferralAndWarrantyForm },
  { id: "MergerAgreementForm", title: "Merger Agreement", description: "Create a comprehensive merger agreement", icon: GitMerge, category: "Business Formation", component: MergerAgreementForm },
  { id: "MarketingAgreementForm", title: "Marketing Agreement", description: "Create a comprehensive marketing agreement", icon: Megaphone, category: "Marketing", component: MarketingAgreementForm },
  { id: "JointBidAgreementForm", title: "Joint Bid Agreement", description: "Create a comprehensive joint bid agreement", icon: Handshake, category: "Contracts", component: JointBidAgreementForm },
  { id: "ITServicesAgreementForm", title: "IT Services Agreement", description: "Create a comprehensive IT services agreement", icon: Computer, category: "Technology", component: ITServicesAgreementForm },
  { id: "FranchisePurchaseForm", title: "Franchise Purchase Agreement", description: "Create a comprehensive franchise purchase agreement", icon: Factory, category: "Business Formation", component: FranchisePurchaseForm },
  { id: "FeeAgreementForm", title: "Fee Agreement", description: "Create a comprehensive fee agreement", icon: DollarSign, category: "Financial", component: FeeAgreementForm },
  { id: "ContractForSaleForm", title: "Contract For Sale", description: "Create a comprehensive contract for sale", icon: ShoppingCart, category: "Contracts", component: ContractForSaleForm },
  { id: "ContractExtensionForm", title: "Contract Extension", description: "Create a comprehensive contract extension", icon: CalendarClock, category: "Contracts", component: ContractExtensionForm },
  { id: "ClinicalTrialAgreementForm", title: "Clinical Trial Agreement", description: "Create a comprehensive clinical trial agreement", icon: Stethoscope, category: "Healthcare", component: ClinicalTrialAgreementForm },
  { id: "AdvertisingAgencyAgreementForm", title: "Advertising Agency Agreement", description: "Create a comprehensive advertising agency agreement", icon: Megaphone, category: "Marketing", component: AdvertisingAgencyAgreementForm },
  { id: "AdministrativeServicesContractForm", title: "Administrative Services Contract", description: "Create a comprehensive administrative services contract", icon: Briefcase, category: "Contracts", component: AdministrativeServicesContractForm },
  { id: "AccountingContractForm", title: "Accounting Contract", description: "Create a comprehensive accounting contract", icon: Calculator, category: "Financial", component: AccountingContractForm },
  { id: "BarterAgreementForm", title: "Barter Agreement", description: "Create a comprehensive barter agreement", icon: Handshake, category: "Contracts", component: BarterAgreementForm },
  { id: "BusinessSaleAgreementForm", title: "Business Sale Agreement", description: "Create a comprehensive business sale agreement", icon: Briefcase, category: "Contracts", component: BusinessSaleAgreementForm },
  { id: "AssetPurchaseForm", title: "Asset Purchase Agreement", description: "Create a comprehensive asset purchase agreement", icon: Briefcase, category: "Contracts", component: AssetPurchaseForm },
  { id: "TechnicalConsultingForm", title: "Technical Consulting Agreement", description: "Create a comprehensive technical consulting agreement", icon: Cpu, category: "Technology", component: TechnicalConsultingForm },
  { id: "StrategicAllianceForm", title: "Strategic Alliance Agreement", description: "Create a comprehensive strategic alliance agreement", icon: Handshake, category: "Business Formation", component: StrategicAllianceForm },
  { id: "SilentPartnershipForm", title: "Silent Partnership Agreement", description: "Create a comprehensive silent partnership agreement", icon: EyeOff, category: "Business Formation", component: SilentPartnershipForm },
  { id: "ServiceAgreementForm", title: "Service Agreement", description: "Create a comprehensive service agreement", icon: Briefcase, category: "Contracts", component: ServiceAgreementForm },
  { id: "SecurityAgreementForm", title: "Security Agreement", description: "Create a comprehensive security agreement", icon: Lock, category: "Financial", component: SecurityAgreementForm },
  { id: "RetailerAgreementForm", title: "Retailer Agreement", description: "Create a comprehensive retailer agreement", icon: ShoppingCart, category: "Contracts", component: RetailerAgreementForm },
  { id: "PartnershipDissolutionForm", title: "Partnership Dissolution Agreement", description: "Create a comprehensive partnership dissolution agreement", icon: Split, category: "Business Formation", component: PartnershipDissolutionForm },
  { id: "PartnershipAgreementForm", title: "Partnership Agreement", description: "Create a comprehensive partnership agreement", icon: Handshake, category: "Business Formation", component: PartnershipAgreementForm },
  { id: "MutualRescissionForm", title: "Mutual Rescission Agreement", description: "Create a comprehensive mutual recision agreement", icon: FileX, category: "Contracts", component: MutualRescissionForm },
  { id: "MutualReleaseForm", title: "Mutual Release Agreement", description: "Create a comprehensive mutual release agreement", icon: FileCheck, category: "Contracts", component: MutualReleaseForm },
  { id: "MusicalPerformanceAgreementForm", title: "Musical Performance Agreement", description: "Create a comprehensive musical performance agreement", icon: Music, category: "Arts & Media", component: MusicalPerformanceAgreementForm },
  { id: "MOUForm", title: "Memorandum Of Understanding", description: "Create a comprehensive MOU agreement", icon: FileSignature, category: "Business Formation", component: MOUForm },
  { id: "MemorandumOfAgreementForm", title: "Memorandum Of Agreement", description: "Create a comprehensive memorandum of agreement", icon: FileText, category: "Business Formation", component: MemorandumOfAgreementForm },
  { id: "MediationAgreementForm", title: "Mediation Agreement", description: "Create a comprehensive mediation agreement", icon: MessageSquare, category: "Dispute Resolution", component: MediationAgreementForm },
  { id: "LiquidationDissolutionAgreementForm", title: "Liquidation Dissolution Agreement", description: "Create a comprehensive liquidation dissolution agreement", icon: FileMinus, category: "Business Formation", component: LiquidationDissolutionAgreementForm },
  { id: "LimitedPartnershipAgreementForm", title: "Limited Partnership Agreement", description: "Create a comprehensive limited partnership agreement", icon: Users, category: "Business Formation", component: LimitedPartnershipAgreementForm },
  { id: "LeaseSubordinationAgreementForm", title: "Lease Subordination Agreement", description: "Create a comprehensive lease subordination agreement", icon: FileCheck, category: "Commercial Lease", component: LeaseSubordinationAgreementForm },
  { id: "JointVentureAgreementForm", title: "Joint Venture Agreement", description: "Create a comprehensive joint venture agreement", icon: Building, category: "Business Formation", component: JointVentureAgreementForm },
  { id: "EventPhotographyAgreementForm", title: "Event Photography Agreement", description: "Create a comprehensive event photography agreement", icon: Factory, category: "Arts & Media", component: EventPhotographyAgreementForm },
  { id: "MasterServiceAgreementForm", title: "Master Service Agreement", description: "Create a comprehensive master service agreement", icon: Handshake, category: "Contracts", component: MasterServiceAgreementForm },
  { id: "CoursePartnershipAgreementForm", title: "Course Partnership Agreement", description: "Create a comprehensive course partnership agreement", icon: BookOpen, category: "Education", component: CoursePartnershipAgreementForm },
  { id: "ConstructionPerformanceBondForm", title: "Construction Performance Bond", description: "Create a comprehensive construction performance bond agreement", icon: ShieldCheck, category: "Construction", component: ConstructionPerformanceBondForm },
  { id: "CooperationAgreementForm", title: "Cooperation Agreement", description: "Create a comprehensive cooperation agreement", icon: Users, category: "Business Formation", component: CooperationAgreementForm },
  { id: "ConsignmentAgreementForm", title: "Consignment Agreement", description: "Create a comprehensive consignment agreement", icon: Package, category: "Contracts", component: ConsignmentAgreementForm },
  { id: "CoMarketingAgreementForm", title: "CoMarketing Agreement", description: "Create a comprehensive CoMarketing agreement", icon: Megaphone, category: "Marketing", component: CoMarketingAgreementForm },
  { id: "CollaborationAgreementForm", title: "Collaboration Agreement", description: "Create a comprehensive collaboration agreement", icon: Handshake, category: "Business Formation", component: CollaborationAgreementForm },
  { id: "CateringAgreementForm", title: "Catering Agreement", description: "Create a comprehensive catering agreement", icon: Utensils, category: "Events", component: CateringAgreementForm },
  { id: "ArbitrationAgreementForm", title: "Arbitration Agreement", description: "Create a comprehensive arbitration agreement", icon: Handshake, category: "Dispute Resolution", component: ArbitrationAgreementForm },
  { id: "BillOfSaleForm", title: "Bill Of Sale", description: "Create a comprehensive bill of sale agreement", icon: FileText, category: "Sales", component: BillOfSaleForm },
  { id: "BrokerAgreementForm", title: "Broker Agreement", description: "Create a comprehensive broker agreement", icon: Handshake, category: "Business Formation", component: BrokerAgreementForm },
  { id: "trucking-agreement", title: "Trucking Agreement", description: "Create a comprehensive trucking agreement", icon: Truck, category: "Transportation", component: TruckingContractForm },
  { id: "bidproposal-agreement", title: "Bid Proposal Agreement", description: "Create a comprehensive bid proposal agreement", icon: FileSignature, category: "Contracts", component: BidProposalForm },
  { id: "Moving-agreement", title: "Moving Agreement", description: "Create a comprehensive Moving agreement", icon: Package, category: "Transportation", component: MovingContractForm },
  { id: "Fulfillment-agreement", title: "Fulfillment Agreement", description: "Create a comprehensive fulfillment agreement", icon: Boxes, category: "Contracts", component: FulfillmentServicesContractForm },
  { id: "business-agreement", title: "Business Agreement", description: "Create a comprehensive business agreement", icon: Briefcase, category: "Business Formation", component: BusinessAgreementForm },
  { id: "DEBTSETTLEMENTAGREEMENT", title: "DEBT SETTLEMENT AGREEMENT", description: "Create a comprehensive debt settlement agreement", icon: Briefcase, category: "Financial", component: DEBTSETTLEMENTAGREEMENT },
  { id: "GuaranteeAgreementForm", title: "Guarantee Agreement Form", description: "Create a comprehensive guarantee agreement", icon: Briefcase, category: "Financial", component: GuaranteeAgreementForm },
  { id: "services-contract", title: "Services Contract", description: "Create a comprehensive services contract", icon: Briefcase, category: "Contracts", component: ServicesContractForm },
  { id: "payment-agreement", title: "Payment Agreement", description: "Create a comprehensive payment agreement", icon: Briefcase, category: "Financial", component: PaymentAgreement },
  { id: "SECURITYAGREEMENT", title: "SECURITY AGREEMENT", description: "Create a comprehensive security agreement", icon: Briefcase, category: "Financial", component: SECURITYAGREEMENT },
  { id: "PROMISSORYNOTEAGREEMENT", title: "PROMISSORY NOTE AGREEMENT", description: "Create a comprehensive promissory note agreement", icon: Briefcase, category: "Financial", component: PROMISSORYNOTEAGREEMENT },
  { id: "independent-contractor", title: "Independent Contractor Agreement", description: "Create a comprehensive independent contractor agreement", icon: Briefcase, category: "Employment", component: IndependentContractorForm },
  { id: "nda", title: "Non-Disclosure Agreement", description: "Create a legally binding confidentiality agreement", icon: Shield, category: "Confidentiality", component: NDAForm },
  { id: "mutual-nda", title: "Mutual Non-Disclosure Agreement", description: "Create a bilateral confidentiality agreement", icon: Handshake, category: "Confidentiality", component: MutualNDAForm },
  { id: "llc-operating-agreement", title: "LLC Operating Agreement", description: "Create a comprehensive LLC Operating Agreement", icon: Building2, category: "Business Formation", component: LLCOperatingAgreementForm },
  { id: "sale-agreement", title: "Sale Agreement", description: "Create a comprehensive sale agreement", icon: Briefcase, category: "Sales", component: SaleAgreementForm },
  { id: "general-contract", title: "General Contract for Products", description: "Create a comprehensive contract for the sale and purchase of products", icon: ShoppingCart, category: "Contracts", component: GeneralContractForm },
  { id: "share-purchase-agreement", title: "Share Purchase Agreement", description: "Create a comprehensive share purchase agreement", icon: Building2, category: "Business Formation", component: SharePurchaseAgreementForm },
  { id: "loan-agreement", title: "Loan Agreement", description: "Create a comprehensive loan agreement", icon: DollarSign, category: "Financial", component: LoanAgreementForm },
  { id: "copyright-assignment", title: "Copyright Assignment", description: "Create a comprehensive copyright assignment agreement", icon: FileText, category: "Intellectual Property", component: CopyrightAssignmentForm },
  { id: "copyright-license", title: "Copyright License Agreement", description: "Grant or obtain rights to use copyrighted material", icon: Shield, category: "Intellectual Property", component: CopyrightLicenseForm },
  { id: "domestic-service-agreement", title: "Domestic Service Agreement", description: "Create a comprehensive domestic service agreement", icon: Home, category: "Employment", component: DomesticServiceAgreementForm },
  { id: "corporate-bylaws", title: "Corporate Bylaws", description: "Create comprehensive corporate bylaws", icon: Scale, category: "Business Formation", component: CorporateBylawsForm },
  { id: "buy-sell-agreement", title: "Buy-Sell Agreement", description: "Create a comprehensive buy-sell agreement", icon: TrendingUp, category: "Business Formation", component: BuySellAgreementForm },
  { id: "business-plan", title: "Business Plan", description: "Create a comprehensive business plan", icon: Briefcase, category: "Business Formation", component: BusinessPlanForm },
  { id: "confidential-information", title: "Confidential Information Agreement", description: "Protect sensitive business information", icon: Shield, category: "Confidentiality", component: ConfidentialInformationForm },
  { id: "non-circumvention", title: "Non-Circumvention Agreement", description: "Protect your business relationships and prevent circumvention", icon: Handshake, category: "Confidentiality", component: NonCircumventionForm },
  { id: "copyright-permission", title: "Copyright Permission Request", description: "Formally request permission to use copyrighted material", icon: FileText, category: "Intellectual Property", component: CopyrightPermissionForm },
  { id: "patent-assignment", title: "Patent Assignment Agreement", description: "Create a comprehensive patent assignment agreement", icon: Shield, category: "Intellectual Property", component: PatentAssignmentForm },
  { id: "royalty-agreement", title: "Royalty Agreement", description: "Create a professional royalty agreement", icon: DollarSign, category: "Financial", component: RoyaltyAgreementForm },
  { id: "Confidentialityagreement", title: "Confidentiality agreement", description: "Create a professional Employee Confidentiality agreement", icon: Lock, category: "Employment", component: Confidentialityagreement },
  { id: "Employeehandbook", title: "Employee handbook", description: "Create a professional Employee handbook agreement", icon: Users, category: "Employment", component: Employeehandbook },
  { id: "employeeretirementt", title: "Employee retirement agreement", description: "Create a professional Employee retirement agreement", icon: Briefcase, category: "Employment", component: Employeeretirement },
  { id: "EmploymentAgreement", title: "Employment Agreement", description: "Create a professional Employment Agreement", icon: TrendingUp, category: "Employment", component: EmploymentAgreement },
  { id: "Home-Agreement", title: "Work from home agreement", description: "Create a professional Work from home agreement", icon: Home, category: "Employment", component: workfromhome },
  { id: "employment", title: "Offer of employment letter", description: "Create a professional Offer of employment letter", icon: Users, category: "Employment", component: Offerofemployment },
  { id: "Severance", title: "Severance agreement", description: "Create a professional Severance agreement", icon: DollarSign, category: "Employment", component: Severance },
  { id: "software", title: "Software license agreement", description: "Create a professional Software license agreement", icon: FileText, category: "Technology", component: Softwarelicense },
  { id: "license-agreement", title: "License Agreement", description: "Create a comprehensive license agreement", icon: Scale, category: "Intellectual Property", component: LicenseAgreementForm },
  { id: "manufacturing-license", title: "Manufacturing License Agreement", description: "Create a manufacturing license agreement", icon: Scale, category: "Intellectual Property", component: ManufacturingLicenseForm },
  { id: "music-license", title: "Music License Agreement", description: "Create a music licensing agreement", icon: Scale, category: "Arts & Media", component: MusicLicenseForm },
  { id: "office-space-lease", title: "Office Space Lease Agreement", description: "Create a comprehensive lease agreement for renting office space", icon: Building2, category: "Commercial Lease", component: OfficeSpaceLeaseForm },
  { id: "SaleOfGoodsForm", title: "Sale of Goods Agreement", description: "Create a comprehensive sale of goods agreement", icon: ShoppingCart, category: "Sales", component: SaleOfGoodsForm },
  { id: "ReferralFeeAgreementForm", title: "Referral Fee Agreement", description: "Create a comprehensive referral fee agreement", icon: Handshake, category: "Contracts", component: ReferralFeeAgreementForm },
  { id: "ITServiceAgreementForm", title: "IT Service Agreement", description: "Create a comprehensive IT service agreement", icon: Computer, category: "Technology", component: ITServiceAgreementForm },
  { id: "AdvertisingAgencyAgreementForm", title: "Advertising Agency Agreement", description: "Create a comprehensive advertising agency agreement", icon: Megaphone, category: "Marketing", component: AdvertisingAgencyAgreementForm },
  { id: "AssetPurchaseForm", title: "Asset Purchase Agreement", description: "Create a comprehensive asset purchase agreement", icon: Briefcase, category: "Contracts", component: AssetPurchaseForm },
  { id: "ContractExtensionForm", title: "Contract Extension", description: "Create a comprehensive contract extension", icon: CalendarClock, category: "Contracts", component: ContractExtensionForm },
  { id: "MarketingAgreementForm", title: "Marketing Agreement", description: "Create a comprehensive marketing agreement", icon: Megaphone, category: "Marketing", component: MarketingAgreementForm },
  { id: "BarterAgreementForm", title: "Barter Agreement", description: "Create a comprehensive barter agreement", icon: Handshake, category: "Contracts", component: BarterAgreementForm },
];

export const propertyMattersDocs = [
  { id: "JanitorialServicesAgreementForm", title: "Janitorial Services Agreement", description: "Create a comprehensive Janitorial agreement", icon: Sparkles, category: "Property Management", component: JanitorialServicesAgreementForm },
  { id: "VacationLeaseForm", title: "Vacation Lease Agreement", description: "Create a comprehensive vacation lease agreement", icon: Building2, category: "Residential Lease", component: VacationLeaseForm },
  { id: "InteriorDesignAgreementForm", title: "Interior Design Agreement", description: "Create a comprehensive interior design agreement", icon: Home, category: "Construction", component: InteriorDesignAgreementForm },
  { id: "CarpentryContractForm", title: "Carpentry Contract", description: "Create a comprehensive carpentry agreement", icon: Hammer, category: "Construction", component: CarpentryContractForm },
  { id: "ArchitecturalServicesAgreementForm", title: "Architectural Services Agreement", description: "Create a comprehensive architectural agreement", icon: Home, category: "Construction", component: ArchitecturalServicesAgreementForm },
  { id: "ConstructionManagementAgreementForm", title: "Construction Management Agreement", description: "Create a comprehensive construction management agreement", icon: Handshake, category: "Construction", component: ConstructionManagementAgreementForm },
  { id: "ConstructionContractForm", title: "Construction Contract", description: "Create a comprehensive construction agreement", icon: Home, category: "Construction", component: ConstructionContractForm },
  { id: "DrywallServicesAgreementForm", title: "Drywall Services Agreement", description: "Create a comprehensive drywall services agreement", icon: Camera, category: "Construction", component: DrywallServicesAgreementForm },
  { id: "HomeRemodellingAgreementForm", title: "Home Remodelling Agreement", description: "Create a comprehensive home remodelling agreement", icon: Home, category: "Construction", component: HomeRemodellingAgreementForm },
  { id: "HomeImprovementContractForm", title: "Home Improvement Contract", description: "Create a comprehensive home improvement agreement", icon: FileText, category: "Construction", component: HomeImprovementContractForm },
  { id: "FlooringServicesAgreementForm", title: "Flooring Services Agreement", description: "Create a comprehensive flooring services agreement", icon: HardHat, category: "Construction", component: FlooringServicesAgreementForm },
  { id: "LandscapingServicesAgreementForm", title: "Landscaping Services Agreement", description: "Create a comprehensive landscaping services agreement", icon: Home, category: "Property Management", component: LandscapingServicesAgreementForm },
  { id: "PaintingServicesContractForm", title: "Painting Services Contract", description: "Create a comprehensive painting services agreement", icon: Paintbrush, category: "Property Management", component: PaintingServicesContractForm },
  { id: "RealEstateDevelopmentForm", title: "Real Estate Development", description: "Create a comprehensive real estate development agreement", icon: Construction, category: "Construction", component: RealEstateDevelopmentForm },
  { id: "PropertyManagerAgreementForm", title: "Property Manager Agreement", description: "Create a comprehensive property manager agreement", icon: Home, category: "Property Management", component: PropertyManagerAgreementForm },
  { id: "RoofingContractForm", title: "Roofing Contract Agreement", description: "Create a comprehensive roofing contract agreement", icon: Clipboard, category: "Construction", component: RoofingContractForm },
  { id: "CoSignerAgreementForm", title: "CoSigner Agreement", description: "Create a comprehensive CoSigner agreement", icon: Clipboard, category: "Residential Lease", component: CoSignerAgreementForm },
  { id: "lease-agreement", title: "Lease Agreement", description: "Generate a comprehensive lease agreement for rental properties.", icon: FileText, category: "Residential Lease", component: ConditionalForm },
  { id: "condominium-lease", title: "Condominium Lease Agreement", description: "Create a comprehensive lease agreement specifically for condominium units", icon: Building2, category: "Residential Lease", component: CondominiumLeaseForm },
  { id: "lease-renewal", title: "Lease Renewal Agreement", description: "Create a comprehensive lease renewal agreement to extend existing rental terms", icon: FileText, category: "Lease Modifications", component: LeaseRenewalForm },
  { id: "lease-termination", title: "Agreement to Terminate Lease", description: "Create a mutual agreement to terminate a lease before its expiration date", icon: FileText, category: "Lease Modifications", component: LeaseTerminationForm },
  { id: "rent-increase", title: "Rent Increase Agreement", description: "Create a formal agreement to increase rent between landlord and tenant", icon: DollarSign, category: "Lease Modifications", component: RentIncreaseForm },
  { id: "sublease", title: "Sublease Agreement", description: "Create a comprehensive sublease agreement with property inspection checklist", icon: Building2, category: "Residential Lease", component: SubleaseForm },
  { id: "lease-amendment", title: "Lease Amendment", description: "Create a formal amendment to modify existing lease terms and conditions", icon: FileText, category: "Lease Modifications", component: LeaseAmendmentForm },
  { id: "roommate-agreement", title: "Roommate Agreement", description: "Create a comprehensive agreement between roommates for shared living arrangements", icon: Users, category: "Residential Lease", component: RoommateAgreementForm },
  { id: "bartending-agreement", title: "Bartending Services Agreement", description: "Create a professional bartending services agreement for events", icon: UtensilsCrossed, category: "Events", component: BartendingAgreementForm },
  { id: "dj-services-agreement", title: "DJ Services Agreement", description: "Create a professional DJ services agreement for events and performances", icon: Music, category: "Events", component: DJServicesAgreementForm },
  { id: "wedding-planner-agreement", title: "Wedding Planner Agreement", description: "Create a comprehensive wedding planner services agreement", icon: Heart, category: "Events", component: WeddingPlannerAgreementForm },
  { id: "food-service-agreement", title: "Food Service Agreement", description: "Create a catering and food service agreement for events", icon: UtensilsCrossed, category: "Events", component: FoodServiceAgreementForm },
  { id: "videography-agreement", title: "Videography Services Agreement", description: "Create a professional videography services agreement for events", icon: Camera, category: "Events", component: VideographyServicesAgreementForm },
  { id: "personal-training-agreement", title: "Personal Training Agreement", description: "Create a personal training services agreement between trainer and client", icon: Heart, category: "Services", component: PersonalTrainingAgreementForm },
  { id: "tutoring-agreement", title: "Tutoring Agreement", description: "Create a tutoring services agreement between tutor and student/parent", icon: GraduationCap, category: "Education", component: TutoringAgreementForm },
  { id: "retainer-agreement", title: "Retainer Agreement", description: "Create a legal retainer agreement between attorney and client", icon: Scale, category: "Legal Reports", component: RetainerAgreementForm },
  { id: "limousine-agreement", title: "Limousine Service Agreement", description: "Create a professional limousine service agreement for events", icon: Truck, category: "Transportation", component: LimousineServiceAgreementForm },
  { id: "consulting-agreement", title: "Consulting Agreement", description: "Create a consulting services agreement between consultant and client", icon: Briefcase, category: "Contracts", component: ConsultingAgreementForm },
  { id: "vendor-agreement", title: "Vendor Agreement", description: "Create a vendor services agreement for event or business services", icon: FileText, category: "Contracts", component: VendorAgreementForm },
  { id: "composer-agreement", title: "Composer Agreement", description: "Create a comprehensive agreement between a production company and composer", icon: FileText, category: "Arts & Media", component: ComposerAgreementForm },
  { id: "concession-agreement", title: "Concession Agreement", description: "Create a comprehensive concession agreement for vendor operations", icon: FileText, category: "Contracts", component: ConcessionAgreementForm },
  { id: "co-tenancy-agreement", title: "Co-Tenancy Agreement", description: "Create an agreement between roommates sharing a rental property", icon: Users, category: "Residential Lease", component: CoTenancyAgreementForm },
  { id: "valet-service-agreement", title: "Valet Service Agreement", description: "Create a professional valet parking services agreement", icon: FileText, category: "Services", component: ValetServiceAgreementForm },
  { id: "commercial-lease", title: "Commercial Lease Agreement", description: "Create a comprehensive commercial lease agreement for business properties", icon: Building2, category: "Commercial Lease", component: CommercialLeaseForm },
  { id: "billboard-lease", title: "Billboard Lease Agreement", description: "Create a comprehensive lease agreement for billboard advertising space", icon: Building2, category: "Commercial Lease", component: BillboardLeaseForm },
  { id: "agreement-to-sell", title: "Agreement to Sell", description: "Create a comprehensive agreement to sell for property transactions", icon: FileText, category: "Property Sales", component: AgreementToSellForm },
  { id: "eviction-notice", title: "Eviction Notice", description: "Create a formal notice to terminate a tenancy and initiate eviction proceedings", icon: FileText, category: "Notices & Letters", component: EvictionNoticeForm },
  { id: "affidavit-of-residence", title: "Affidavit of Residence", description: "Create an affidavit to verify residence for living or deceased persons", icon: MapPin, category: "Affidavits", component: AffidavitOfResidenceForm },
  { id: "transcript-request", title: "Transcript Request", description: "Create a formal request for academic transcripts", icon: GraduationCap, category: "Education", component: TranscriptRequestForm },
  { id: "storage-space-lease", title: "Storage Space Lease Agreement", description: "Create a comprehensive lease agreement for renting storage space", icon: Building2, category: "Commercial Lease", component: StorageSpaceLeaseForm },
  { id: "restaurant-lease", title: "Restaurant Lease Agreement", description: "Create a comprehensive lease agreement for restaurant and food service", icon: UtensilsCrossed, category: "Commercial Lease", component: RestaurantLeaseForm },
  { id: "warehouse-lease", title: "Warehouse Lease Agreement", description: "Create a comprehensive lease agreement for warehouse facilities", icon: Building2, category: "Commercial Lease", component: WarehouseLeaseForm },
  { id: "oil-lease", title: "Oil Lease Agreement", description: "Create a comprehensive oil and gas lease agreement", icon: Fuel, category: "Energy & Resources", component: OilLeaseForm },
  { id: "gas-lease", title: "Gas Lease Agreement", description: "Create a comprehensive gas lease agreement", icon: Fuel, category: "Energy & Resources", component: GasLeaseForm },
  { id: "security-deposit-return", title: "Security Deposit Return Letter", description: "Create a professional letter for returning security deposits", icon: FileText, category: "Notices & Letters", component: SecurityDepositReturnLetter },
  { id: "lease-termination-letter", title: "Lease Termination Letter", description: "Create a professional letter to notify tenants of lease termination", icon: FileText, category: "Notices & Letters", component: LeaseTerminationLetter },
  { id: "late-rent-payment-agreement", title: "Late Rent Payment Agreement", description: "Create a professional agreement for tenants with past due rent", icon: DollarSign, category: "Notices & Letters", component: LateRentPaymentAgreement },
  { id: "non-disturbance-agreement", title: "Non-Disturbance Agreement", description: "Create a professional non-disturbance agreement", icon: Shield, category: "Property Protection", component: NonDisturbanceAgreement },
  { id: "roommate-release-agreement", title: "Roommate Release Agreement", description: "Create an agreement to release a roommate from a shared lease", icon: UserMinus, category: "Residential Lease", component: RoommateReleaseAgreementForm },
  { id: "offer-to-lease", title: "Offer to Lease", description: "Create a formal offer to lease commercial property", icon: Building2, category: "Commercial Lease", component: OfferToLeaseForm },
  { id: "legal-services-agreement", title: "Legal Services Agreement", description: "Create a comprehensive attorney-client legal services agreement", icon: Scale, category: "Legal Reports", component: LegalServicesAgreementForm },
  { id: "physician-services-agreement", title: "Physician Services Agreement", description: "Create a professional agreement for physician services", icon: Stethoscope, category: "Healthcare", component: PhysicianServicesAgreementForm },
  { id: "real-estate-agent-agreement", title: "Real Estate Agent Agreement", description: "Create an exclusive listing agreement with a real estate agent", icon: Home, category: "Property Sales", component: RealEstateAgentAgreementForm },
  { id: "limited-scope-representation-agreement", title: "Limited Scope Representation Agreement", description: "Create a limited scope legal representation agreement", icon: Scale, category: "Legal Reports", component: LimitedScopeRepresentationAgreementForm },
  { id: "unbundled-legal-services-agreement", title: "Unbundled Legal Services Agreement", description: "Create an agreement for specific unbundled legal services", icon: Scale, category: "Legal Reports", component: UnbundledLegalServicesAgreementForm },
  { id: "attorney-engagement-letter", title: "Attorney Engagement Letter", description: "Create a formal attorney engagement letter for legal representation", icon: FileText, category: "Legal Reports", component: AttorneyEngagementLetterForm },
  { id: "vehicle-lease", title: "Vehicle Lease Agreement", description: "Create a contract for leasing a vehicle between owner and driver", icon: Truck, category: "Transportation", component: VehicleLeaseForm }
];

// --- MAIN COMPONENT ---

const Documents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (id) {
      setSelectedDocument(id);
    }
  }, [id]);

  const allDocumentTypes = [...familyProtectionDocs, ...businessSecurityDocs, ...propertyMattersDocs];
  const selectedDocumentType = allDocumentTypes.find(doc => doc.id === selectedDocument);

  const getCategoryDocuments = (category: string) => {
    switch (category) {
      case 'family-protection': return familyProtectionDocs;
      case 'business-security': return businessSecurityDocs;
      case 'property-matters': return propertyMattersDocs;
      default: return [];
    }
  };

  const handleBackToDocuments = () => {
    setSelectedDocument(null);
    setShowForm(false);
    if (id) navigate('/documents');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  const filterDocuments = (documents: any[]) => {
    if (!searchQuery.trim()) return documents;
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // 1. Render Specific Document Form or Landing Page
  if (selectedDocument && selectedDocumentType) {
    if (!showForm) {
      return (
        <Layout>
          <div className="container mx-auto px-4 py-12 bg-white min-h-screen pt-24">
             <DocumentInfoLanding
              title={selectedDocumentType.title}
              description={selectedDocumentType.description}
              category={selectedCategory || selectedDocumentType.category || "Legal Document"}
              onStart={() => setShowForm(true)}
              onBack={handleBackToDocuments}
            />
          </div>
        </Layout>
      );
    }
    
    const DocumentComponent = selectedDocumentType.component;
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 bg-white min-h-screen">
          <div className="mb-8 pt-16">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{selectedDocumentType.title}</h1>
              <p className="text-muted-foreground">{selectedDocumentType.description}</p>
            </div>
            <Button variant="outline" onClick={handleBackToDocuments} className="mb-4 mt-4 pt-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Document Selection
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-[68%] xl:w-[70%] min-w-0">
              <Suspense fallback={
                <div className="flex h-64 w-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              }>
                <DocumentComponent />
              </Suspense>
            </div>
            <div className="w-full lg:w-[32%] xl:w-[30%] min-w-0">
               <DocumentAboutSidebar 
                documentId={selectedDocument} 
                onNavigateToDocument={(docId) => {
                  setSelectedDocument(docId);
                  navigate(`/documents/${docId}`);
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // 2. Render Category Document Grid
  if (selectedCategory) {
    const categoryDocuments = getCategoryDocuments(selectedCategory);
    const filteredDocuments = filterDocuments(categoryDocuments);
    const categoryTitles: Record<string, string> = {
      'family-protection': 'Family Protection Documents',
      'business-security': 'Business Security Documents', 
      'property-matters': 'Property Matters Documents'
    };

    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 bg-white min-h-screen pt-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 pt-4">{categoryTitles[selectedCategory] || 'Documents'}</h1>
            <p className="text-muted-foreground mb-6">Choose a document type to begin generating your legal documents</p>
            
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

          <Button variant="outline" onClick={handleBackToCategories} className="mb-4">
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
                    onClick={() => {
                      setSelectedDocument(docType.id);
                      navigate(`/documents/${docType.id}`);
                    }}
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
                      <Button className="w-full">Start Creating Document</Button>
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

  // 3. Render Main Category Selection
  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 pb-8 pt-28">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 pt-4">Legal Documents</h1>
            <p className="text-muted-foreground mb-6">
              Create professional legal documents from our comprehensive library
            </p>
          </div>
        </div>
        <LegalConcernsSection onCategorySelect={(cat) => setSelectedCategory(cat)} />
      </div>
    </Layout>
  );
};

export default Documents;