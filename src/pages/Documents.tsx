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
  Search, ShoppingCart, FileText, Users, Briefcase, Heart, ArrowLeft, Building2, 
  DollarSign, Home, Scale, UserCheck, MapPin, Gavel, GraduationCap, 
  Shield, TrendingUp, Handshake, UtensilsCrossed, Fuel, Lock, 
  Factory, Truck, Package, Boxes, FileSignature, Scroll, Hammer, 
  Utensils, Megaphone, ShieldCheck, Clipboard, BookOpen, HardHat, Camera, 
  ShieldAlert, Sparkles, Building, FileCheck, FileMinus, MessageSquare, 
  Music, FileX, Paintbrush, Baby, Split, HeartHandshake, SplitSquareHorizontal, 
  Construction, UserMinus, EyeOff, Cpu, Calculator, Stethoscope, 
  CalendarClock, Computer, GitMerge, AlarmClockCheck, Share2, FilePlus,
  Car, Wallet, CreditCard, Receipt, Phone, Mail, BadgeAlert, 
  BadgeCheck, Landmark, PiggyBank, Ticket, Award, UserPlus,
  Bed, TreePine, Droplets, Zap, Store, Warehouse as WarehouseIcon, Coffee
} from "lucide-react";



// ============================================================================
// LAZY IMPORTS - ALL 200+ FORM COMPONENTS
// ============================================================================

// --- MAIN COMPONENTS FOLDER ---
const PromissoryNoteDueOnSpecificDateForm = lazy(() => import("@/components/PromissoryNoteDueOnSpecificDateForm"));
const ComplaintLetterToCompanyForm = lazy(() => import("@/components/ComplaintLetterToCompanyForm"));
const RequestCreditReferenceForm = lazy(() => import("@/components/RequestCreditReferenceForm"));
const PromissoryNoteForm = lazy(() => import("@/components/PromissoryNoteForm"));
const WarrantyRepairRequestForm = lazy(() => import("@/components/WarrantyRepairRequestForm"));
const StatementOfClaimAgainstEstateForm = lazy(() => import("@/components/StatementOfClaimAgainstEstateForm"));
const RemoveFromMarketingListForm = lazy(() => import("@/components/RemoveFromMarketingListForm"));
const DemandForMoneyOwedForm = lazy(() => import("@/components/DemandForMoneyOwedForm"));
const SubordinatedLoanAgreementForm = lazy(() => import("@/components/SubordinatedLoanAgreementForm"));
const SecurityAgreementInfoForm = lazy(() => import("@/components/SecurityAgreementInfoForm"));
const RemovePersonalInfoRequestForm = lazy(() => import("@/components/RemovePersonalInfoRequestForm"));
const BankCreditReferenceForm  = lazy(() => import("@/components/BankCreditReferenceForm"));
const LotteryPoolContractForm = lazy(() => import("@/components/LotteryPoolContractForm"));
const NotePayableForm = lazy(() => import("@/components/NotePayableForm"));
const MembershipCancellationLetterForm = lazy(() => import("@/components/MembershipCancellationLetterForm"));
const IOUForm = lazy(() => import("@/components/IOUForm"));
const InstallmentPromissoryNoteForm = lazy(() => import("@/components/InstallmentPromissoryNoteForm"));
const SecuredPromissoryNoteForm = lazy(() => import("@/components/SecuredPromissoryNoteForm"));
const FormalComplaintRefundForm = lazy(() => import("@/components/FormalComplaintRefundForm"));
const DirectMailAdvertisingForm = lazy(() => import("@/components/DirectMailAdvertisingForm"));
const DebtCollectionWorksheetForm = lazy(() => import("@/components/DebtCollectionWorksheetForm"));
const ReservationConfirmationForm = lazy(() => import("@/components/ReservationConfirmationForm"));
const CellPhoneInquiryLetterForm = lazy(() => import("@/components/CellPhoneInquiryLetterForm"));
const DemandForDeliveryForm = lazy(() => import("@/components/DemandForDeliveryForm"));
const DueOnDemandPromissoryNoteForm  = lazy(() => import("@/components/DueOnDemandPromissoryNoteForm"));
const ChangeOfBeneficiaryForm =lazy(()=>import("@/components/ChangeOfBeneficiaryForm")) ;
const AccountingContractForm = lazy(() => import("@/components/AccountingContractForm"));
const AdministrativeServicesContractForm = lazy(() => import("@/components/AdministrativeServicesContractForm"));
const AdministrativeServicesForm = lazy(() => import("@/components/AdministrativeServicesForm"));
const AdvertisingAgencyAgreementForm = lazy(() => import("@/components/AdvertisingAgencyAgreementForm"));
const AdvertisingAgencyForm = lazy(() => import("@/components/AdvertisingAgencyForm"));
const AffidavitOfMarriageForm = lazy(() => import("@/components/AffidavitOfMarriageForm"));
const AffidavitOfResidenceForm = lazy(() => import("@/components/AffidavitOfResidenceForm"));
const AffidavitOfSurvivorshipForm = lazy(() => import("@/components/AffidavitOfSurvivorshipForm"));
const AgreementToSellForm = lazy(() => import("@/components/AgreementToSellForm"));
const ArbitrationAgreementForm = lazy(() => import("@/components/ArbitrationAgreementForm"));
const ArchitecturalServicesAgreementForm = lazy(() => import("@/components/ArchitecturalServicesAgreementForm"));
const AssetPurchaseForm = lazy(() => import("@/components/AssetPurchaseForm"));
const BartendingAgreementForm = lazy(() => import("@/components/BartendingAgreementForm"));
const BarterAgreementForm = lazy(() => import("@/components/BarterAgreementForm"));
const BidProposalForm = lazy(() => import("@/components/BidProposalForm"));
const BillboardLeaseForm = lazy(() => import("@/components/BillboardLeaseForm"));
const BillOfSaleForm = lazy(() => import("@/components/BillOfSaleForm"));
const BrokerAgreementForm = lazy(() => import("@/components/BrokerAgreementForm"));
const BusinessAgreementForm = lazy(() => import("@/components/BusinessAgreementForm"));
const BusinessPlanForm = lazy(() => import("@/components/BusinessPlanForm"));
const BusinessSaleAgreementForm = lazy(() => import("@/components/BusinessSaleAgreementForm"));
const BuySellAgreementForm = lazy(() => import("@/components/BuySellAgreementForm"));
const CarpentryContractForm = lazy(() => import("@/components/CarpentryContractForm"));
const CateringAgreementForm = lazy(() => import("@/components/CateringAgreementForm"));
const ChildCareAuthForm = lazy(() => import("@/components/ChildCareAuthForm"));
const ClinicalTrialAgreementForm = lazy(() => import("@/components/ClinicalTrialAgreementForm"));
const CohabitationAgreementForm = lazy(() => import("@/components/CohabitationAgreementForm"));
const CollaborationAgreementForm = lazy(() => import("@/components/CollaborationAgreementForm"));
const CoMarketingAgreementForm = lazy(() => import("@/components/CoMarketingAgreementForm"));
const CommercialLeaseForm = lazy(() => import("@/components/CommercialLeaseForm"));
const ComposerAgreementForm = lazy(() => import("@/components/ComposerAgreementForm"));
const ConcessionAgreementForm = lazy(() => import("@/components/ConcessionAgreementForm"));
const ConditionalForm = lazy(() => import("@/components/ConditionalForm"));
const CondominiumLeaseForm = lazy(() => import("@/components/CondominiumLeaseForm"));
const ConfidentialInformationForm = lazy(() => import("@/components/ConfidentialInformationForm"));
const Confidentialityagreement = lazy(() => import("@/components/Confidentialityagreement"));
const ConsignmentAgreementForm = lazy(() => import("@/components/ConsignmentAgreementForm"));
const ConstructionContractForm = lazy(() => import("@/components/ConstructionContractForm"));
const ConstructionManagementAgreementForm = lazy(() => import("@/components/ConstructionManagementAgreementForm"));
const ConstructionPerformanceBondForm = lazy(() => import("@/components/ConstructionPerformanceBondForm"));
const ConsultingAgreementForm = lazy(() => import("@/components/ConsultingAgreementForm"));
const ContractExtensionForm = lazy(() => import("@/components/ContractExtensionForm"));
const ContractForSaleForm = lazy(() => import("@/components/ContractForSaleForm"));
const CooperationAgreementForm = lazy(() => import("@/components/CooperationAgreementForm"));
const CopyrightAssignmentForm = lazy(() => import("@/components/CopyrightAssignmentForm"));
const CopyrightLicenseForm = lazy(() => import("@/components/CopyrightLicenseForm"));
const CopyrightPermissionForm = lazy(() => import("@/components/CopyrightPermissionForm"));
const CopyrightRequestForm = lazy(() => import("@/components/CopyrightRequestForm"));
const CorporateBylawsForm = lazy(() => import("@/components/CorporateBylawsForm"));
const CorporationFormation = lazy(() => import("@/components/CorporationFormation"));
const CoSignerAgreementForm = lazy(() => import("@/components/CoSignerAgreementForm"));
const CoTenancyAgreementForm = lazy(() => import("@/components/CoTenancyAgreementForm"));
const CoursePartnershipAgreementForm = lazy(() => import("@/components/CoursePartnershipAgreementForm"));
const DEBTSETTLEMENTAGREEMENT = lazy(() => import("@/components/DEBTSETTLEMENTAGREEMENT"));
const DivorceSettlementAgreementForm = lazy(() => import("@/components/DivorceSettlementAgreementForm"));
const DJServicesAgreementForm = lazy(() => import("@/components/DJServicesAgreementForm"));
const DomesticServiceAgreementForm = lazy(() => import("@/components/DomesticServiceAgreementForm"));
const DrywallServicesAgreementForm = lazy(() => import("@/components/DrywallServicesAgreementForm"));
const Employeehandbook = lazy(() => import("@/components/Employeehandbook"));
const Employeeretirement = lazy(() => import("@/components/Employeeretirement"));
const EmploymentAgreement = lazy(() => import("@/components/EmploymentAgreement"));
const EventPhotographyAgreementForm = lazy(() => import("@/components/EventPhotographyAgreementForm"));
const EvictionNoticeForm = lazy(() => import("@/components/EvictionNoticeForm"));
const FeeAgreementForm = lazy(() => import("@/components/FeeAgreementForm"));
const FinancialSupportAffidavitForm = lazy(() => import("@/components/FinancialSupportAffidavitForm"));
const FlooringServicesAgreementForm = lazy(() => import("@/components/FlooringServicesAgreementForm"));
const FoodServiceAgreementForm = lazy(() => import("@/components/FoodServiceAgreementForm"));
const FranchisePurchaseForm = lazy(() => import("@/components/FranchisePurchaseForm"));
const FulfillmentAgreementForm = lazy(() => import("@/components/FulfillmentAgreementForm"));
const GasLeaseForm = lazy(() => import("@/components/GasLeaseForm"));
const GeneralContractForm = lazy(() => import("@/components/GeneralContractForm"));
const GeneralPowerOfAttorneyForm = lazy(() => import("@/components/GeneralPowerOfAttorneyForm"));
const GiftAffidavitForm = lazy(() => import("@/components/GiftAffidavitForm"));
const GuaranteeAgreementForm = lazy(() => import("@/components/GuaranteeAgreementForm"));
const HomeImprovementContractForm = lazy(() => import("@/components/HomeImprovementContractForm"));
const HomeRemodellingAgreementForm = lazy(() => import("@/components/HomeRemodellingAgreementForm"));
const IndependentContractorForm = lazy(() => import("@/components/IndependentContractorForm"));
const InformationForPoliceReportForm = lazy(() => import("@/components/InformationForPoliceReportForm"));
const InteriorDesignAgreementForm = lazy(() => import("@/components/InteriorDesignAgreementForm"));
const ITServiceAgreementForm = lazy(() => import("@/components/ITServiceAgreementForm"));
const ITServicesAgreementForm = lazy(() => import("@/components/ITServicesAgreementForm"));
const JanitorialServicesAgreementForm = lazy(() => import("@/components/JanitorialServicesAgreementForm"));
const JointBidAgreementForm = lazy(() => import("@/components/JointBidAgreementForm"));
const JointVentureAgreementForm = lazy(() => import("@/components/JointVentureAgreementForm"));
const LandscapingServicesAgreementForm = lazy(() => import("@/components/LandscapingServicesAgreementForm"));
const lastwill = lazy(() => import("@/components/lastwill"));
const LateRentPaymentAgreement = lazy(() => import("@/components/LateRentPaymentAgreement"));
const LeaseAmendmentForm = lazy(() => import("@/components/LeaseAmendmentForm"));
const LeaseRenewalForm = lazy(() => import("@/components/LeaseRenewalForm"));
const LeaseSubordinationAgreement = lazy(() => import("@/components/LeaseSubordinationAgreement"));
const LeaseSubordinationAgreementForm = lazy(() => import("@/components/LeaseSubordinationAgreementForm"));
const LeaseTerminationForm = lazy(() => import("@/components/LeaseTerminationForm"));
const LeaseTerminationLetter = lazy(() => import("@/components/LeaseTerminationLetter"));
const LicenseAgreementForm = lazy(() => import("@/components/LicenseAgreementForm"));
const LimitedPartnershipAgreementForm = lazy(() => import("@/components/LimitedPartnershipAgreementForm"));
const LimousineServiceAgreementForm = lazy(() => import("@/components/LimousineServiceAgreementForm"));
const LiquidationDissolutionAgreementForm = lazy(() => import("@/components/LiquidationDissolutionAgreementForm"));
const LivingWillForm = lazy(() => import("@/components/LivingWillForm"));
const LLCBusinessFormation = lazy(() => import("@/components/LLCBusinessFormation"));
const LLCOperatingAgreementForm = lazy(() => import("@/components/LLCOperatingAgreementForm"));
const LoanAgreementForm = lazy(() => import("../components/LoanAgreementForm"));
const BalloonPaymentPromissoryNoteForm = lazy(() => import("../components/BalloonPaymentPromissoryNoteForm"));
const ManufacturingLicenseForm = lazy(() => import("@/components/ManufacturingLicenseForm"));
const MarketingAgreementForm = lazy(() => import("@/components/MarketingAgreementForm"));
const MarketingAgreementFormSimple = lazy(() => import("@/components/MarketingAgreementFormSimple"));
const MasterServiceAgreementForm = lazy(() => import("@/components/MasterServiceAgreementForm"));
const MasterUseLicenseForm = lazy(() => import("@/components/MasterUseLicenseForm"));
const MediationAgreementForm = lazy(() => import("@/components/MediationAgreementForm"));
const MemorandumOfAgreementForm = lazy(() => import("@/components/MemorandumOfAgreementForm"));
const MerchandisingAgreementForm = lazy(() => import("@/components/MerchandisingAgreementForm"));
const MergerAgreementForm = lazy(() => import("@/components/MergerAgreementForm"));
const MOUForm = lazy(() => import("@/components/MOUForm"));
const MovingContractForm = lazy(() => import("@/components/MovingContractForm"));
const MusicalPerformanceAgreementForm = lazy(() => import("@/components/MusicalPerformanceAgreementForm"));
const MusicLicenseForm = lazy(() => import("@/components/MusicLicenseForm"));
const MutualNDAForm = lazy(() => import("@/components/MutualNDAForm"));
const MutualReleaseForm = lazy(() => import("@/components/MutualReleaseForm"));
const MutualRescissionForm = lazy(() => import("@/components/MutualRescissionForm"));
const NDAForm = lazy(() => import("@/components/NDAForm"));
const NonCircumventionForm = lazy(() => import("@/components/NonCircumventionForm"));
const NonDisturbanceAgreement = lazy(() => import("@/components/NonDisturbanceAgreement"));
const NonprofitFormation = lazy(() => import("@/components/NonprofitFormation"));
const Offerofemployment = lazy(() => import("@/components/Offerofemployment "));
const OfficeSpaceLeaseForm = lazy(() => import("@/components/OfficeSpaceLeaseForm"));
const OilLeaseForm = lazy(() => import("@/components/OilLeaseForm"));
const PaintingServicesContractForm = lazy(() => import("@/components/PaintingServicesContractForm"));
const ParentingPlanForm = lazy(() => import("@/components/ParentingPlanForm"));
const PartnershipAgreementForm = lazy(() => import("@/components/PartnershipAgreementForm"));
const PartnershipDissolutionForm = lazy(() => import("@/components/PartnershipDissolutionForm"));
const PatentAssignmentForm = lazy(() => import("@/components/PatentAssignmentForm"));
const PaymentAgreement = lazy(() => import("@/components/PaymentAgreement"));
const PersonalTrainingAgreementForm = lazy(() => import("@/components/PersonalTrainingAgreementForm"));
const PostnuptialAgreementForm = lazy(() => import("@/components/PostnuptialAgreementForm"));
const PrenuptialAgreementForm = lazy(() => import("@/components/PrenuptialAgreementForm"));
const ProductDistributionAgreementForm = lazy(() => import("@/components/ProductDistributionAgreementForm"));
const ProductDistributionForm = lazy(() => import("@/components/ProductDistributionForm"));
const ProductionContractForm = lazy(() => import("@/components/ProductionContractForm"));
const PROMISSORYNOTEAGREEMENT = lazy(() => import("@/components/PROMISSORYNOTEAGREEMENT"));
const PropertyManagerAgreementForm = lazy(() => import("@/components/PropertyManagerAgreementForm"));
const RealEstateDevelopmentForm = lazy(() => import("@/components/RealEstateDevelopmentForm"));
const ReferralAndWarrantyForm = lazy(() => import("@/components/ReferralAndWarrantyForm"));
const ReferralFeeAgreementForm = lazy(() => import("@/components/ReferralFeeAgreementForm"));
const RentIncreaseForm = lazy(() => import("@/components/RentIncreaseForm"));
const RestaurantLeaseForm = lazy(() => import("@/components/RestaurantLeaseForm"));
const RetailerAgreementForm = lazy(() => import("@/components/RetailerAgreementForm"));
const RetainerAgreementForm = lazy(() => import("@/components/RetainerAgreementForm"));
const RoofingContractForm = lazy(() => import("@/components/RoofingContractForm"));
const RoommateAgreementForm = lazy(() => import("@/components/RoommateAgreementForm"));
const RoommateReleaseAgreementForm = lazy(() => import("@/components/RoommateReleaseAgreementForm"));
const RoyaltyAgreementForm = lazy(() => import("@/components/RoyaltyAgreementForm"));
const SaleAgreementForm = lazy(() => import("@/components/SaleAgreementForm"));
const SaleOfGoodsForm = lazy(() => import("@/components/SaleOfGoodsForm"));
const SECURITYAGREEMENT = lazy(() => import("@/components/SECURITYAGREEMENT"));
const SecurityAgreementForm = lazy(() => import("@/components/SecurityAgreementForm"));
const SecurityDepositReturnLetter = lazy(() => import("@/components/SecurityDepositReturnLetter"));
const SeparationAgreementForm = lazy(() => import("@/components/SeparationAgreementForm"));
const ServiceAgreementForm = lazy(() => import("@/components/ServiceAgreementForm"));
const ServiceLevelAgreementForm = lazy(() => import("@/components/ServiceLevelAgreementForm"));
const ServicesContractForm = lazy(() => import("@/components/ServicesContractForm"));
const Severance = lazy(() => import("@/components/Severance"));
const SharePurchaseAgreementForm = lazy(() => import("@/components/SharePurchaseAgreementForm"));
const SilentPartnershipForm = lazy(() => import("@/components/SilentPartnershipForm"));
const SocialMediaContractForm = lazy(() => import("@/components/SocialMediaContractForm"));
const Softwarelicense = lazy(() => import("@/components/Softwarelicense"));
const SpecialPowerOfAttorneyForm = lazy(() => import("@/components/SpecialPowerOfAttorneyForm"));
const StaffingAgencyContractForm = lazy(() => import("@/components/StaffingAgencyContractForm"));
const StockPurchaseAgreementForm = lazy(() => import("@/components/StockPurchaseAgreementForm"));
const StorageSpaceLeaseForm = lazy(() => import("@/components/StorageSpaceLeaseForm"));
const StrategicAllianceForm = lazy(() => import("@/components/StrategicAllianceForm"));
const SubleaseForm = lazy(() => import("@/components/SubleaseForm"));
const SupplierAgreementForm = lazy(() => import("@/components/SupplierAgreementForm"));
const TechnicalConsultingForm = lazy(() => import("@/components/TechnicalConsultingForm"));
const TranscriptRequestForm = lazy(() => import("@/components/TranscriptRequestForm"));
const TripleNetLeaseForm = lazy(() => import("@/components/TripleNetLeaseForm"));
const TruckingContractForm = lazy(() => import("@/components/TruckingContractForm"));
const TutoringAgreementForm = lazy(() => import("@/components/TutoringAgreementForm"));
const VacationLeaseForm = lazy(() => import("@/components/VacationLeaseForm"));
const ValetServiceAgreementForm = lazy(() => import("@/components/ValetServiceAgreementForm"));
const VendorAgreementForm = lazy(() => import("@/components/VendorAgreementForm"));
const VideographyServicesAgreementForm = lazy(() => import("@/components/VideographyServicesAgreementForm"));
const WarehouseLeaseForm = lazy(() => import("@/components/WarehouseLeaseForm"));
const WarrantyAgreementForm = lazy(() => import("@/components/WarrantyAgreementForm"));
const WeddingPlannerAgreementForm = lazy(() => import("@/components/WeddingPlannerAgreementForm"));
const workfromhome = lazy(() => import("@/components/workfromhome"));


// --- DOCUMENTS SUBFOLDER ---
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
const ComplaintLetterInfoForm= lazy(() => import("@/components/ComplaintLetterInfoForm"));

// ============================================================================
// DOCUMENT DEFINITIONS - COMPREHENSIVE REGISTRY (200+ DOCUMENTS)
// ============================================================================

export const familyProtectionDocs = [
  // === AFFIDAVITS ===
  { id: "affidavit-general", title: "General Affidavit", description: "Create a legally binding sworn statement for various purposes", icon: FileText, category: "Affidavits", component: AffidavitGeneralForm },
  { id: "affidavit-character", title: "Affidavit of Character", description: "Create a sworn character reference statement for legal proceedings", icon: UserCheck, category: "Affidavits", component: AffidavitCharacterForm },
  { id: "affidavit-ownership", title: "Affidavit of Ownership", description: "Formally declare ownership of property with a sworn statement", icon: FileSignature, category: "Affidavits", component: AffidavitOwnershipForm },
  { id: "affidavit-of-marriage", title: "Affidavit of Marriage", description: "Create an affidavit to verify a name change due to marriage", icon: UserCheck, category: "Affidavits", component: AffidavitOfMarriageForm },
  { id: "AffidavitOfSurvivorshipForm", title: "Affidavit Of Survivorship", description: "Create a comprehensive affidavit for survivorship", icon: Scroll, category: "Affidavits", component: AffidavitOfSurvivorshipForm },
  { id: "affidavit-of-residence", title: "Affidavit of Residence", description: "Create an affidavit to verify residence for living or deceased persons", icon: MapPin, category: "Affidavits", component: AffidavitOfResidenceForm },
  { id: "gift-affidavit", title: "Gift Affidavit", description: "Create a sworn affidavit declaring a transfer of money or property is a gift", icon: DollarSign, category: "Affidavits", component: GiftAffidavitForm },
  { id: "financial-support-affidavit", title: "Affidavit of Financial Support", description: "Create a sworn statement of your financial condition", icon: DollarSign, category: "Affidavits", component: FinancialSupportAffidavitForm },

  // === HEALTHCARE & END OF LIFE ===
  { id: "living-will", title: "Living Will", description: "Create a Living Will to specify your health care directives", icon: Heart, category: "Healthcare", component: LivingWillForm },
  { id: "healthcare-poa", title: "Healthcare Power of Attorney", description: "Authorize someone to make medical decisions on your behalf", icon: Heart, category: "Healthcare", component: HealthcarePOAForm },
  { id: "lastwill", title: "Last Will and Testament", description: "Create a professional last will and testament agreement", icon: FileText, category: "Estate Planning", component: lastwill },

  // === CHILD & FAMILY ===
  { id: "child-care-auth", title: "Child Care Authorization Agreement", description: "Create an authorization agreement for child care arrangements", icon: Users, category: "Child & Family", component: ChildCareAuthForm },
  { id: "ParentingPlanForm", title: "Parenting Plan Form", description: "Create a comprehensive parenting plan agreement", icon: Baby, category: "Child & Family", component: ParentingPlanForm },

  // === MARRIAGE & DIVORCE ===
  { id: "PrenuptialAgreementForm", title: "Prenuptial Agreement", description: "Create a comprehensive prenuptial agreement", icon: SplitSquareHorizontal, category: "Marriage & Divorce", component: PrenuptialAgreementForm },
  { id: "PostnuptialAgreementForm", title: "Postnuptial Agreement", description: "Create a comprehensive postnuptial agreement", icon: HeartHandshake, category: "Marriage & Divorce", component: PostnuptialAgreementForm },
  { id: "SeparationAgreementForm", title: "Separation Agreement", description: "Create a comprehensive separation agreement", icon: UserMinus, category: "Marriage & Divorce", component: SeparationAgreementForm },
  { id: "divorce-settlement-agreement", title: "Divorce Settlement Agreement", description: "Create a comprehensive divorce settlement agreement", icon: Gavel, category: "Marriage & Divorce", component: DivorceSettlementAgreementForm },
  { id: "Cohabitation-AgreementForm", title: "Cohabitation Agreement", description: "Create a comprehensive Cohabitation Agreement", icon: Home, category: "Marriage & Divorce", component: CohabitationAgreementForm },

  // === POWER OF ATTORNEY ===
  { id: "general-power-of-attorney", title: "General Power of Attorney", description: "Create a comprehensive general power of attorney for legal representation", icon: FileText, category: "Power of Attorney", component: GeneralPowerOfAttorneyForm },
  { id: "special-power-of-attorney", title: "Special Power of Attorney", description: "Create a special power of attorney for specific legal matters", icon: Scale, category: "Power of Attorney", component: SpecialPowerOfAttorneyForm },

  // === LEGAL REPORTS ===
  { id: "InformationForPoliceReportForm", title: "Information For Police Report", description: "Create a comprehensive information for police report", icon: ShieldAlert, category: "Legal Reports", component: InformationForPoliceReportForm },
  { id: "change-of-beneficiary-form", title: "Information For changing beneficiary", description: "Create a comprehensive information for beneficiary changing", icon: UserCheck, category: "Legal Reports", component: ChangeOfBeneficiaryForm },
  { id: "statement-of-claim-against-estate", title: "Statement Of Claim Against Estate", description: "Create a comprehensive statment against estate", icon: FilePlus, category: "Legal Reports", component: StatementOfClaimAgainstEstateForm },
  { id: "balloon-payment-promissory-note", title: "Balloon Payment Promissory Note", description: "Create a promissory note with installment payments and a final balloon payment", icon: FileText, category: "Legal Reports", component: BalloonPaymentPromissoryNoteForm },
  { id: "due-on-demand-promissory-note", title: "Due on Demand Promissory Note", description: "Create a comprehensive due on demand promissory note contract", icon: Calculator, category: "Legal Reports", component: DueOnDemandPromissoryNoteForm },
  { id: "debt-collection-worksheet", title: "Debt collection", description: "Create a comprehensive debt collection worksheet", icon: Calculator, category: "Legal Reports", component: DebtCollectionWorksheetForm },
  { id: "secured-promissory-note", title: "Secured Promissory note", description: "Create a comprehensive agreement for secured promissory", icon: Calculator, category: "Legal Reports", component: SecuredPromissoryNoteForm },
  { id: "installment-promissory-note", title: "Installment Promissory note", description: "Create a comprehensive agreement for installment promissory note", icon: Calculator, category: "Legal Reports", component: InstallmentPromissoryNoteForm },
  { id: "iou", title: "IOU", description: "Create a comprehensive iou agreement acknowledment of debt", icon: Calculator, category: "Legal Reports", component: IOUForm },
  { id: "note-payable", title: "Note Pyabale", description: "Create a comprehensive agreement for note payable", icon: Calculator, category: "Legal Reports", component: NotePayableForm },
  { id: "request-bankcredit-reference", title: "Request Bank Credit Reference", description: "Create a comprehensive reference to request bank credit", icon: Calculator, category: "Legal Reports", component: BankCreditReferenceForm },
  { id: "subordinated-loan-agreement", title: "Subordinated Loan Agreement", description: "Create a comprehensive subordinated loan agreement", icon: Calculator, category:"Legal Reports", component: SubordinatedLoanAgreementForm },
  { id: "demand-for-money-owed", title: "Demand for Owed Money", description: "Create a comprehensive agreement to Demand for Owed Money", icon: Calculator, category: "Legal Reports", component: DemandForMoneyOwedForm },
  { id: "demand-for-delivery", title: "Demand For Delivery", description: "Create a comprehensive demand of delivery agreement", icon: FileSignature, category: "Legal Reports", component: DemandForDeliveryForm },
  { id: "direct-mail-request", title: "Direct mail advertising request", description: "Create a comprehensive direct mail advirtisng request agreement", icon: FileSignature, category: "Legal Reports", component: DirectMailAdvertisingForm },
  { id: "lottery-pool-contract", title: "Lottery Pool Contract", description: "Create a comprehensiveLottery Pool Contract agreement", icon: FileSignature, category: "Legal Reports", component: LotteryPoolContractForm},
  { id: "attorney-engagement-letter", title: "Attorney Engagement Letter", description: "Create a formal attorney engagement letter for legal representation", icon: FileText, category: "Legal Reports", component: AttorneyEngagementLetterForm },
  { id: "complaint-letter-info", title: "Complaint to BBB/Attorney General", description: "Create a formal complaint letter to Attorney Gneral", icon: FileText, category: "Legal Reports", component: ComplaintLetterInfoForm },
  {id: "cellphone-inquiry-letter", title:"Cell Phone Inquiry Letter",description:"Create a formal letter to inquire about or dispute cellular service charges", icon: FileText, category: "Legal Reports", component: CellPhoneInquiryLetterForm},
  {id : "reservation-confirmation", title:"Reservations confirmation Letter",description:"Create a formal letter for confirming reservations", icon: FileText, category: "Legal Reports", component: ReservationConfirmationForm},
  {id : "complaint-demand-refund", title:"Complaint for Refund",description:"Create a formal complaint for refund", icon: FileText, category:"Legal Reports", component: FormalComplaintRefundForm},
  {id : "membership-cancellation-letter", title:"Member Cancellation Request",description:"Create a formal request to cancel membership", icon: FileText, category: "Legal Reports", component: MembershipCancellationLetterForm},
  {id : "request-remove-personal-information", title:"Request Remove Personal Information ",description:"Create a formal request to remove personal information", icon: FileText, category:"Legal Reports", component: RemovePersonalInfoRequestForm},
  {id : "security-agreement-info", title:"Security agreement Information",description:"Create a formal agreement of security information", icon: FileText, category: "Legal Reports", component: SecurityAgreementInfoForm},
  {id : "remove-from-marketing-list", title:"Remove from Marketing List  ",description:"Create a formal agreement to remove information from marketing list", icon: FileText, category: "Legal Reports", component: RemoveFromMarketingListForm},
  {id : "warranty-repair-request", title:"Warranty Repair Request",description:"Create a formal agreement for Warranty Repair Request", icon: FileText, category:"Legal Reports", component: WarrantyRepairRequestForm},
  { id: "GuaranteeAgreementForm", title: "Guarantee Agreement", description: "Create a comprehensive guarantee agreement", icon: ShieldCheck, category: "Legal Reports", component: GuaranteeAgreementForm },
  { id: "payment-agreement", title: "Payment Agreement", description: "Create a comprehensive payment agreement", icon: Briefcase, category: "Legal Reports", component: PaymentAgreement },
  { id: "DEBTSETTLEMENTAGREEMENT", title: "Debt Settlement Agreement", description: "Create a comprehensive debt settlement agreement", icon: Briefcase, category: "Legal Reports", component: DEBTSETTLEMENTAGREEMENT },
  { id: "promissory-note", title: "Promissory Note Agreement", description: "Create a comprehensive promissory note agreement", icon: Briefcase, category: "Legal Reports", component: PromissoryNoteForm},
  { id: "request-credit-reference", title: "Request Credit Reference", description: "Create a comprehensive request agreement for credit reference", icon: Briefcase, category: "Legal Reports", component: RequestCreditReferenceForm},
  { id: "complaint-letter-to-company", title: "Complaint Letter To Company", description: "Create a comprehensive  Letter to Complaint about Company", icon: Briefcase, category: "Legal Reports", component: ComplaintLetterToCompanyForm},
  { id: "promissory-note-due-on-specific-date", title: "Promissory Note Due on Specific date", description: "Create a comprehensive  agreement for Promissory Note Due on Specific date", icon: Briefcase, category: "Legal Reports", component: PromissoryNoteDueOnSpecificDateForm},
  { id: "loan-agreement", title: "Loan Agreement", description: "Create a comprehensive loan agreement", icon: Calculator, category:"Legal Reports", component: LoanAgreementForm },

];

export const businessSecurityDocs = [
  // === BUSINESS FORMATION ===
  { id: "llc-operating-agreement", title: "LLC Operating Agreement", description: "Create a comprehensive LLC Operating Agreement", icon: Building2, category: "Business Formation", component: LLCOperatingAgreementForm },
  { id: "llc-business-formation", title: "LLC Business Formation", description: "Form a new Limited Liability Company", icon: Building2, category: "Business Formation", component: LLCBusinessFormation },
  { id: "corporate-bylaws", title: "Corporate Bylaws", description: "Create comprehensive corporate bylaws", icon: Scale, category: "Business Formation", component: CorporateBylawsForm },
  { id: "corporation-formation", title: "Corporation Formation", description: "Form a new corporation entity", icon: Building, category: "Business Formation", component: CorporationFormation },
  { id: "nonprofit-formation", title: "Nonprofit Formation", description: "Form a nonprofit organization", icon: Heart, category: "Business Formation", component: NonprofitFormation },
  { id: "PartnershipAgreementForm", title: "Partnership Agreement", description: "Create a comprehensive partnership agreement", icon: Handshake, category: "Business Formation", component: PartnershipAgreementForm },
  { id: "LimitedPartnershipAgreementForm", title: "Limited Partnership Agreement", description: "Create a comprehensive limited partnership agreement", icon: Users, category: "Business Formation", component: LimitedPartnershipAgreementForm },
  { id: "SilentPartnershipForm", title: "Silent Partnership Agreement", description: "Create a comprehensive silent partnership agreement", icon: EyeOff, category: "Business Formation", component: SilentPartnershipForm },
  { id: "PartnershipDissolutionForm", title: "Partnership Dissolution Agreement", description: "Create a comprehensive partnership dissolution agreement", icon: Split, category: "Business Formation", component: PartnershipDissolutionForm },
  { id: "JointVentureAgreementForm", title: "Joint Venture Agreement", description: "Create a comprehensive joint venture agreement", icon: Building, category: "Business Formation", component: JointVentureAgreementForm },
  { id: "StrategicAllianceForm", title: "Strategic Alliance Agreement", description: "Create a comprehensive strategic alliance agreement", icon: Handshake, category: "Business Formation", component: StrategicAllianceForm },
  { id: "MergerAgreementForm", title: "Merger Agreement", description: "Create a comprehensive merger agreement", icon: GitMerge, category: "Business Formation", component: MergerAgreementForm },
  { id: "LiquidationDissolutionAgreementForm", title: "Liquidation Dissolution Agreement", description: "Create a comprehensive liquidation dissolution agreement", icon: FileMinus, category: "Business Formation", component: LiquidationDissolutionAgreementForm },
  { id: "buy-sell-agreement", title: "Buy-Sell Agreement", description: "Create a comprehensive buy-sell agreement", icon: TrendingUp, category: "Business Formation", component: BuySellAgreementForm },
  { id: "business-plan", title: "Business Plan", description: "Create a comprehensive business plan", icon: Briefcase, category: "Business Formation", component: BusinessPlanForm },
  { id: "MOUForm", title: "Memorandum Of Understanding", description: "Create a comprehensive MOU agreement", icon: FileSignature, category: "Business Formation", component: MOUForm },
  { id: "MemorandumOfAgreementForm", title: "Memorandum Of Agreement", description: "Create a comprehensive memorandum of agreement", icon: FileText, category: "Business Formation", component: MemorandumOfAgreementForm },

  // === STOCK & SHARES ===
  { id: "share-purchase-agreement", title: "Share Purchase Agreement", description: "Create a comprehensive share purchase agreement", icon: Building2, category: "Business Formation", component: SharePurchaseAgreementForm },
  { id: "StockPurchaseAgreementForm", title: "Stock Purchase Agreement", description: "Create a comprehensive stock purchase agreement", icon: FilePlus, category: "Business Formation", component: StockPurchaseAgreementForm },

  
  // === CONFIDENTIALITY ===
  { id: "nda", title: "Non-Disclosure Agreement", description: "Create a legally binding confidentiality agreement", icon: Shield, category: "Confidentiality", component: NDAForm },
  { id: "mutual-nda", title: "Mutual Non-Disclosure Agreement", description: "Create a bilateral confidentiality agreement", icon: Handshake, category: "Confidentiality", component: MutualNDAForm },
  { id: "confidential-information", title: "Confidential Information Agreement", description: "Protect sensitive business information", icon: Shield, category: "Confidentiality", component: ConfidentialInformationForm },
  { id: "non-circumvention", title: "Non-Circumvention Agreement", description: "Protect your business relationships and prevent circumvention", icon: Handshake, category: "Confidentiality", component: NonCircumventionForm },
  { id: "Confidentialityagreement", title: "Employee Confidentiality Agreement", description: "Create a professional Employee Confidentiality agreement", icon: Lock, category: "Confidentiality", component: Confidentialityagreement },

  // === EMPLOYMENT ===
  { id: "independent-contractor", title: "Independent Contractor Agreement", description: "Create a comprehensive independent contractor agreement", icon: Briefcase, category: "Employment", component: IndependentContractorForm },
  { id: "EmploymentAgreement", title: "Employment Agreement", description: "Create a professional Employment Agreement", icon: TrendingUp, category: "Employment", component: EmploymentAgreement },
  { id: "employment", title: "Offer of Employment Letter", description: "Create a professional Offer of employment letter", icon: Users, category: "Employment", component: Offerofemployment },
  { id: "Severance", title: "Severance Agreement", description: "Create a professional Severance agreement", icon: DollarSign, category: "Employment", component: Severance },
  { id: "Employeehandbook", title: "Employee Handbook", description: "Create a professional Employee handbook", icon: Users, category: "Employment", component: Employeehandbook },
  { id: "employeeretirementt", title: "Employee Retirement Agreement", description: "Create a professional Employee retirement agreement", icon: Briefcase, category: "Employment", component: Employeeretirement },
  { id: "Home-Agreement", title: "Work from Home Agreement", description: "Create a professional Work from home agreement", icon: Home, category: "Employment", component: workfromhome },
  { id: "domestic-service-agreement", title: "Domestic Service Agreement", description: "Create a comprehensive domestic service agreement", icon: Home, category: "Employment", component: DomesticServiceAgreementForm },
  { id: "StaffingAgencyContractForm", title: "Staffing Agency Contract", description: "Create a comprehensive staffing agency agreement", icon: Users, category: "Employment", component: StaffingAgencyContractForm },

  // === FINANCIAL ===
  { id: "payment-agreement", title: "Payment Agreement", description: "Create a comprehensive payment agreement", icon: Briefcase, category: "Financial", component: PaymentAgreement },
  { id: "DEBTSETTLEMENTAGREEMENT", title: "Debt Settlement Agreement", description: "Create a comprehensive debt settlement agreement", icon: Briefcase, category: "Financial", component: DEBTSETTLEMENTAGREEMENT },
  { id: "SECURITYAGREEMENT", title: "Security Agreement", description: "Create a comprehensive security agreement", icon: Lock, category: "Financial", component: SECURITYAGREEMENT },
  { id: "SecurityAgreementForm", title: "Security Agreement Form", description: "Create a comprehensive security agreement", icon: Lock, category: "Financial", component: SecurityAgreementForm },
  { id: "PROMISSORYNOTEAGREEMENT", title: "Promissory Note Agreement", description: "Create a comprehensive promissory note agreement", icon: FileText, category: "Financial", component: PROMISSORYNOTEAGREEMENT },
  { id: "GuaranteeAgreementForm", title: "Guarantee Agreement", description: "Create a comprehensive guarantee agreement", icon: ShieldCheck, category: "Financial", component: GuaranteeAgreementForm },
  { id: "FeeAgreementForm", title: "Fee Agreement", description: "Create a comprehensive fee agreement", icon: DollarSign, category: "Financial", component: FeeAgreementForm },
  { id: "royalty-agreement", title: "Royalty Agreement", description: "Create a professional royalty agreement", icon: DollarSign, category: "Financial", component: RoyaltyAgreementForm },
  { id: "AccountingContractForm", title: "Accounting Contract", description: "Create a comprehensive accounting contract", icon: Calculator, category: "Financial", component: AccountingContractForm },
 

  
  // === INTELLECTUAL PROPERTY ===
  { id: "copyright-assignment", title: "Copyright Assignment", description: "Create a comprehensive copyright assignment agreement", icon: FileText, category: "Intellectual Property", component: CopyrightAssignmentForm },
  { id: "copyright-license", title: "Copyright License Agreement", description: "Grant or obtain rights to use copyrighted material", icon: Shield, category: "Intellectual Property", component: CopyrightLicenseForm },
  { id: "copyright-permission", title: "Copyright Permission Request", description: "Formally request permission to use copyrighted material", icon: FileText, category: "Intellectual Property", component: CopyrightPermissionForm },
  { id: "CopyrightRequestForm", title: "Copyright Request Form", description: "Submit a copyright request", icon: FileText, category: "Intellectual Property", component: CopyrightRequestForm },
  { id: "patent-assignment", title: "Patent Assignment Agreement", description: "Create a comprehensive patent assignment agreement", icon: Shield, category: "Intellectual Property", component: PatentAssignmentForm },
  { id: "license-agreement", title: "License Agreement", description: "Create a comprehensive license agreement", icon: Scale, category: "Intellectual Property", component: LicenseAgreementForm },
  { id: "manufacturing-license", title: "Manufacturing License Agreement", description: "Create a manufacturing license agreement", icon: Factory, category: "Intellectual Property", component: ManufacturingLicenseForm },

  // === TECHNOLOGY ===
  { id: "software", title: "Software License Agreement", description: "Create a professional Software license agreement", icon: Computer, category: "Technology", component: Softwarelicense },
  { id: "ITServiceAgreementForm", title: "IT Service Agreement", description: "Create a comprehensive IT service agreement", icon: Computer, category: "Technology", component: ITServiceAgreementForm },
  { id: "ITServicesAgreementForm", title: "IT Services Agreement", description: "Create a comprehensive IT services agreement", icon: Computer, category: "Technology", component: ITServicesAgreementForm },
  { id: "TechnicalConsultingForm", title: "Technical Consulting Agreement", description: "Create a comprehensive technical consulting agreement", icon: Cpu, category: "Technology", component: TechnicalConsultingForm },
  { id: "SocialMediaContractForm", title: "Social Media Contract", description: "Create a comprehensive social media agreement", icon: Share2, category: "Technology", component: SocialMediaContractForm },

  // === SALES & CONTRACTS ===
  { id: "BillOfSaleForm", title: "Bill Of Sale", description: "Create a comprehensive bill of sale agreement", icon: FileText, category: "Sales", component: BillOfSaleForm },
  { id: "sale-agreement", title: "Sale Agreement", description: "Create a comprehensive sale agreement", icon: Briefcase, category: "Sales", component: SaleAgreementForm },
  { id: "SaleOfGoodsForm", title: "Sale of Goods Agreement", description: "Create a comprehensive sale of goods agreement", icon: ShoppingCart, category: "Sales", component: SaleOfGoodsForm },
  { id: "general-contract", title: "General Contract for Products", description: "Create a comprehensive contract for products", icon: ShoppingCart, category: "Contracts", component: GeneralContractForm },
  { id: "ContractForSaleForm", title: "Contract For Sale", description: "Create a comprehensive contract for sale", icon: ShoppingCart, category: "Contracts", component: ContractForSaleForm },
  { id: "ContractExtensionForm", title: "Contract Extension", description: "Create a comprehensive contract extension", icon: CalendarClock, category: "Contracts", component: ContractExtensionForm },
  { id: "business-agreement", title: "Business Agreement", description: "Create a comprehensive business agreement", icon: Briefcase, category: "Contracts", component: BusinessAgreementForm },
  { id: "services-contract", title: "Services Contract", description: "Create a comprehensive services contract", icon: Briefcase, category: "Contracts", component: ServicesContractForm },
  { id: "ServiceAgreementForm", title: "Service Agreement", description: "Create a comprehensive service agreement", icon: Briefcase, category: "Contracts", component: ServiceAgreementForm },
  { id: "ServiceLevelAgreementForm", title: "Service Level Agreement", description: "Create a comprehensive service level agreement", icon: AlarmClockCheck, category: "Contracts", component: ServiceLevelAgreementForm },
  { id: "MasterServiceAgreementForm", title: "Master Service Agreement", description: "Create a comprehensive master service agreement", icon: Handshake, category: "Contracts", component: MasterServiceAgreementForm },
  { id: "BarterAgreementForm", title: "Barter Agreement", description: "Create a comprehensive barter agreement", icon: Handshake, category: "Contracts", component: BarterAgreementForm },
  { id: "ConsignmentAgreementForm", title: "Consignment Agreement", description: "Create a comprehensive consignment agreement", icon: Package, category: "Contracts", component: ConsignmentAgreementForm },
  { id: "ReferralFeeAgreementForm", title: "Referral Fee Agreement", description: "Create a comprehensive referral fee agreement", icon: Handshake, category: "Contracts", component: ReferralFeeAgreementForm },
  { id: "ReferralAndWarrantyForm", title: "Referral & Warranty Agreement", description: "Create a comprehensive referral & warranty agreement", icon: Handshake, category: "Contracts", component: ReferralAndWarrantyForm },
  { id: "JointBidAgreementForm", title: "Joint Bid Agreement", description: "Create a comprehensive joint bid agreement", icon: Handshake, category: "Contracts", component: JointBidAgreementForm },
  { id: "bidproposal-agreement", title: "Bid Proposal Agreement", description: "Create a comprehensive bid proposal agreement", icon: FileSignature, category: "Contracts", component: BidProposalForm },
  { id: "WarrantyAgreementForm", title: "Warranty Agreement", description: "Create a comprehensive warranty agreement", icon: ShieldCheck, category: "Contracts", component: WarrantyAgreementForm },


 
  // === BUSINESS ACQUISITIONS ===
  { id: "AssetPurchaseForm", title: "Asset Purchase Agreement", description: "Create a comprehensive asset purchase agreement", icon: Briefcase, category: "Acquisitions", component: AssetPurchaseForm },
  { id: "BusinessSaleAgreementForm", title: "Business Sale Agreement", description: "Create a comprehensive business sale agreement", icon: Briefcase, category: "Acquisitions", component: BusinessSaleAgreementForm },
  { id: "FranchisePurchaseForm", title: "Franchise Purchase Agreement", description: "Create a comprehensive franchise purchase agreement", icon: Factory, category: "Acquisitions", component: FranchisePurchaseForm },

  // === MARKETING ===
  { id: "MarketingAgreementForm", title: "Marketing Agreement", description: "Create a comprehensive marketing agreement", icon: Megaphone, category: "Marketing", component: MarketingAgreementForm },
  { id: "AdvertisingAgencyAgreementForm", title: "Advertising Agency Agreement", description: "Create a comprehensive advertising agency agreement", icon: Megaphone, category: "Marketing", component: AdvertisingAgencyAgreementForm },
  { id: "CoMarketingAgreementForm", title: "Co-Marketing Agreement", description: "Create a comprehensive CoMarketing agreement", icon: Megaphone, category: "Marketing", component: CoMarketingAgreementForm },
  { id: "MerchandisingAgreementForm", title: "Merchandising Agreement", description: "Create a comprehensive merchandising agreement", icon: Store, category: "Marketing", component: MerchandisingAgreementForm },

  // === DISTRIBUTION & SUPPLY ===
  { id: "ProductDistributionAgreementForm", title: "Product Distribution Agreement", description: "Create a comprehensive product distribution agreement", icon: Package, category: "Distribution", component: ProductDistributionAgreementForm },
  { id: "SupplierAgreementForm", title: "Supplier Agreement", description: "Create a comprehensive supplier agreement", icon: Truck, category: "Distribution", component: SupplierAgreementForm },
  { id: "RetailerAgreementForm", title: "Retailer Agreement", description: "Create a comprehensive retailer agreement", icon: ShoppingCart, category: "Distribution", component: RetailerAgreementForm },
  { id: "Fulfillment-agreement", title: "Fulfillment Agreement", description: "Create a comprehensive fulfillment agreement", icon: Boxes, category: "Distribution", component: FulfillmentAgreementForm },
  { id: "VendorAgreementForm", title: "Vendor Agreement", description: "Create a vendor services agreement", icon: FileText, category: "Distribution", component: VendorAgreementForm },

  // === ADMINISTRATIVE ===
  { id: "AdministrativeServicesContractForm", title: "Administrative Services Contract", description: "Create a comprehensive administrative services contract", icon: Briefcase, category: "Administrative", component: AdministrativeServicesContractForm },

  // === DISPUTE RESOLUTION ===
  { id: "ArbitrationAgreementForm", title: "Arbitration Agreement", description: "Create a comprehensive arbitration agreement", icon: Handshake, category: "Dispute Resolution", component: ArbitrationAgreementForm },
  { id: "MediationAgreementForm", title: "Mediation Agreement", description: "Create a comprehensive mediation agreement", icon: MessageSquare, category: "Dispute Resolution", component: MediationAgreementForm },
  { id: "MutualReleaseForm", title: "Mutual Release Agreement", description: "Create a comprehensive mutual release agreement", icon: FileCheck, category: "Dispute Resolution", component: MutualReleaseForm },
  { id: "MutualRescissionForm", title: "Mutual Rescission Agreement", description: "Create a comprehensive mutual rescission agreement", icon: FileX, category: "Dispute Resolution", component: MutualRescissionForm },

  // === COLLABORATIONS ===
  { id: "CollaborationAgreementForm", title: "Collaboration Agreement", description: "Create a comprehensive collaboration agreement", icon: Handshake, category: "Collaborations", component: CollaborationAgreementForm },
  { id: "CooperationAgreementForm", title: "Cooperation Agreement", description: "Create a comprehensive cooperation agreement", icon: Users, category: "Collaborations", component: CooperationAgreementForm },
  { id: "CoursePartnershipAgreementForm", title: "Course Partnership Agreement", description: "Create a comprehensive course partnership agreement", icon: BookOpen, category: "Education", component: CoursePartnershipAgreementForm },
  { id: "BrokerAgreementForm", title: "Broker Agreement", description: "Create a comprehensive broker agreement", icon: Handshake, category: "Collaborations", component: BrokerAgreementForm },

  // === HEALTHCARE ===
  { id: "ClinicalTrialAgreementForm", title: "Clinical Trial Agreement", description: "Create a comprehensive clinical trial agreement", icon: Stethoscope, category: "Healthcare", component: ClinicalTrialAgreementForm },
  { id: "physician-services-agreement", title: "Physician Services Agreement", description: "Create a professional agreement for physician services", icon: Stethoscope, category: "Healthcare", component: PhysicianServicesAgreementForm },

  // === ARTS & MEDIA ===
  { id: "MusicalPerformanceAgreementForm", title: "Musical Performance Agreement", description: "Create a comprehensive musical performance agreement", icon: Music, category: "Arts & Media", component: MusicalPerformanceAgreementForm },
  { id: "music-license", title: "Music License Agreement", description: "Create a music licensing agreement", icon: Music, category: "Arts & Media", component: MusicLicenseForm },
  { id: "MasterUseLicenseForm", title: "Master Use License", description: "Create a master use license agreement", icon: Music, category: "Arts & Media", component: MasterUseLicenseForm },
  { id: "EventPhotographyAgreementForm", title: "Event Photography Agreement", description: "Create a comprehensive event photography agreement", icon: Camera, category: "Arts & Media", component: EventPhotographyAgreementForm },
  { id: "composer-agreement", title: "Composer Agreement", description: "Create a comprehensive agreement between a production company and composer", icon: Music, category: "Arts & Media", component: ComposerAgreementForm },
  { id: "production-agreement", title: "Production Agreement", description: "Create a comprehensive production agreement between two parties", icon: Factory, category: "Arts & Media", component: ProductionContractForm },

  // === TRANSPORTATION ===
  { id: "trucking-agreement", title: "Trucking Agreement", description: "Create a comprehensive trucking agreement", icon: Truck, category: "Transportation", component: TruckingContractForm },
  { id: "Moving-agreement", title: "Moving Agreement", description: "Create a comprehensive Moving agreement", icon: Package, category: "Transportation", component: MovingContractForm },
  { id: "limousine-agreement", title: "Limousine Service Agreement", description: "Create a professional limousine service agreement for events", icon: Truck, category: "Transportation", component: LimousineServiceAgreementForm },
  { id: "vehicle-lease", title: "Vehicle Lease Agreement", description: "Create a contract for leasing a vehicle between owner and driver", icon: Car, category: "Transportation", component: VehicleLeaseForm },

  // === LEGAL SERVICES ===
  { id: "legal-services-agreement", title: "Legal Services Agreement", description: "Create a comprehensive attorney-client legal services agreement", icon: Scale, category: "Legal Services", component: LegalServicesAgreementForm },
  { id: "retainer-agreement", title: "Retainer Agreement", description: "Create a legal retainer agreement between attorney and client", icon: Scale, category: "Legal Services", component: RetainerAgreementForm },
  { id: "limited-scope-representation-agreement", title: "Limited Scope Representation Agreement", description: "Create a limited scope legal representation agreement", icon: Scale, category: "Legal Services", component: LimitedScopeRepresentationAgreementForm },
  { id: "unbundled-legal-services-agreement", title: "Unbundled Legal Services Agreement", description: "Create an agreement for specific unbundled legal services", icon: Scale, category: "Legal Services", component: UnbundledLegalServicesAgreementForm },
  


  // === CONSULTING ===
  { id: "consulting-agreement", title: "Consulting Agreement", description: "Create a consulting services agreement between consultant and client", icon: Briefcase, category: "Consulting", component: ConsultingAgreementForm },
];

export const propertyMattersDocs = [
  // === RESIDENTIAL LEASE ===
  { id: "lease-agreement", title: "Lease Agreement", description: "Generate a comprehensive lease agreement for rental properties.", icon: FileText, category: "Residential Lease", component: ConditionalForm },
  { id: "condominium-lease", title: "Condominium Lease Agreement", description: "Create a comprehensive lease agreement for condominium units", icon: Building2, category: "Residential Lease", component: CondominiumLeaseForm },
  { id: "sublease", title: "Sublease Agreement", description: "Create a comprehensive sublease agreement with property inspection checklist", icon: Building2, category: "Residential Lease", component: SubleaseForm },
  { id: "roommate-agreement", title: "Roommate Agreement", description: "Create a comprehensive agreement between roommates for shared living", icon: Users, category: "Residential Lease", component: RoommateAgreementForm },
  { id: "co-tenancy-agreement", title: "Co-Tenancy Agreement", description: "Create an agreement between roommates sharing a rental property", icon: Users, category: "Residential Lease", component: CoTenancyAgreementForm },
  { id: "roommate-release-agreement", title: "Roommate Release Agreement", description: "Create an agreement to release a roommate from a shared lease", icon: UserMinus, category: "Residential Lease", component: RoommateReleaseAgreementForm },
  { id: "CoSignerAgreementForm", title: "Co-Signer Agreement", description: "Create a comprehensive CoSigner agreement", icon: Clipboard, category: "Residential Lease", component: CoSignerAgreementForm },
  { id: "VacationLeaseForm", title: "Vacation Lease Agreement", description: "Create a comprehensive vacation lease agreement", icon: Building2, category: "Residential Lease", component: VacationLeaseForm },

  // === LEASE MODIFICATIONS ===
  { id: "lease-renewal", title: "Lease Renewal Agreement", description: "Create a comprehensive lease renewal agreement", icon: FileText, category: "Lease Modifications", component: LeaseRenewalForm },
  { id: "lease-termination", title: "Agreement to Terminate Lease", description: "Create a mutual agreement to terminate a lease", icon: FileText, category: "Lease Modifications", component: LeaseTerminationForm },
  { id: "rent-increase", title: "Rent Increase Agreement", description: "Create a formal agreement to increase rent", icon: DollarSign, category: "Lease Modifications", component: RentIncreaseForm },
  { id: "lease-amendment", title: "Lease Amendment", description: "Create a formal amendment to modify existing lease terms", icon: FileText, category: "Lease Modifications", component: LeaseAmendmentForm },
  { id: "late-rent-payment-agreement", title: "Late Rent Payment Agreement", description: "Create a professional agreement for tenants with past due rent", icon: DollarSign, category: "Lease Modifications", component: LateRentPaymentAgreement },

  // === COMMERCIAL LEASE ===
  { id: "commercial-lease", title: "Commercial Lease Agreement", description: "Create a comprehensive commercial lease agreement", icon: Building2, category: "Commercial Lease", component: CommercialLeaseForm },
  { id: "office-space-lease", title: "Office Space Lease Agreement", description: "Create a comprehensive lease agreement for renting office space", icon: Building2, category: "Commercial Lease", component: OfficeSpaceLeaseForm },
  { id: "storage-space-lease", title: "Storage Space Lease Agreement", description: "Create a comprehensive lease agreement for renting storage space", icon: Building2, category: "Commercial Lease", component: StorageSpaceLeaseForm },
  { id: "restaurant-lease", title: "Restaurant Lease Agreement", description: "Create a comprehensive lease agreement for restaurant and food service", icon: UtensilsCrossed, category: "Commercial Lease", component: RestaurantLeaseForm },
  { id: "warehouse-lease", title: "Warehouse Lease Agreement", description: "Create a comprehensive lease agreement for warehouse facilities", icon: WarehouseIcon, category: "Commercial Lease", component: WarehouseLeaseForm },
  { id: "billboard-lease", title: "Billboard Lease Agreement", description: "Create a comprehensive lease agreement for billboard advertising", icon: Building2, category: "Commercial Lease", component: BillboardLeaseForm },
  { id: "triple-net-lease", title: "Triple Net Lease Agreement", description: "Create a comprehensive triple net lease agreement", icon: Building2, category: "Commercial Lease", component: TripleNetLeaseForm },
  { id: "offer-to-lease", title: "Offer to Lease", description: "Create a formal offer to lease commercial property", icon: Building2, category: "Commercial Lease", component: OfferToLeaseForm },
  { id: "LeaseSubordinationAgreementForm", title: "Lease Subordination Agreement", description: "Create a comprehensive lease subordination agreement", icon: FileCheck, category: "Commercial Lease", component: LeaseSubordinationAgreementForm },
  { id: "concession-agreement", title: "Concession Agreement", description: "Create a comprehensive concession agreement for vendor operations", icon: Store, category: "Commercial Lease", component: ConcessionAgreementForm },

  // === ENERGY & RESOURCES ===
  { id: "oil-lease", title: "Oil Lease Agreement", description: "Create a comprehensive oil and gas lease agreement", icon: Fuel, category: "Energy & Resources", component: OilLeaseForm },
  { id: "gas-lease", title: "Gas Lease Agreement", description: "Create a comprehensive gas lease agreement", icon: Fuel, category: "Energy & Resources", component: GasLeaseForm },

  // === NOTICES & LETTERS ===
  { id: "eviction-notice", title: "Eviction Notice", description: "Create a formal notice to terminate a tenancy", icon: FileText, category: "Notices & Letters", component: EvictionNoticeForm },
  { id: "security-deposit-return", title: "Security Deposit Return Letter", description: "Create a professional letter for returning security deposits", icon: FileText, category: "Notices & Letters", component: SecurityDepositReturnLetter },
  { id: "lease-termination-letter", title: "Lease Termination Letter", description: "Create a professional letter to notify tenants of lease termination", icon: FileText, category: "Notices & Letters", component: LeaseTerminationLetter },
  

 
  // === PROPERTY SALES ===
  { id: "agreement-to-sell", title: "Agreement to Sell", description: "Create a comprehensive agreement to sell for property transactions", icon: FileText, category: "Property Sales", component: AgreementToSellForm },
  { id: "real-estate-agent-agreement", title: "Real Estate Agent Agreement", description: "Create an exclusive listing agreement with a real estate agent", icon: Home, category: "Property Sales", component: RealEstateAgentAgreementForm },

  // === PROPERTY MANAGEMENT ===
  { id: "PropertyManagerAgreementForm", title: "Property Manager Agreement", description: "Create a comprehensive property manager agreement", icon: Home, category: "Property Management", component: PropertyManagerAgreementForm },
  { id: "JanitorialServicesAgreementForm", title: "Janitorial Services Agreement", description: "Create a comprehensive Janitorial agreement", icon: Sparkles, category: "Property Management", component: JanitorialServicesAgreementForm },
  { id: "LandscapingServicesAgreementForm", title: "Landscaping Services Agreement", description: "Create a comprehensive landscaping services agreement", icon: TreePine, category: "Property Management", component: LandscapingServicesAgreementForm },
  { id: "PaintingServicesContractForm", title: "Painting Services Contract", description: "Create a comprehensive painting services agreement", icon: Paintbrush, category: "Property Management", component: PaintingServicesContractForm },

  // === PROPERTY PROTECTION ===
  { id: "non-disturbance-agreement", title: "Non-Disturbance Agreement", description: "Create a professional non-disturbance agreement", icon: Shield, category: "Property Protection", component: NonDisturbanceAgreement },

  // === CONSTRUCTION ===
  { id: "ConstructionContractForm", title: "Construction Contract", description: "Create a comprehensive construction agreement", icon: Construction, category: "Construction", component: ConstructionContractForm },
  { id: "ConstructionManagementAgreementForm", title: "Construction Management Agreement", description: "Create a comprehensive construction management agreement", icon: Handshake, category: "Construction", component: ConstructionManagementAgreementForm },
  { id: "ConstructionPerformanceBondForm", title: "Construction Performance Bond", description: "Create a comprehensive construction performance bond agreement", icon: ShieldCheck, category: "Construction", component: ConstructionPerformanceBondForm },
  { id: "HomeImprovementContractForm", title: "Home Improvement Contract", description: "Create a comprehensive home improvement agreement", icon: Home, category: "Construction", component: HomeImprovementContractForm },
  { id: "HomeRemodellingAgreementForm", title: "Home Remodelling Agreement", description: "Create a comprehensive home remodelling agreement", icon: Home, category: "Construction", component: HomeRemodellingAgreementForm },
  { id: "ArchitecturalServicesAgreementForm", title: "Architectural Services Agreement", description: "Create a comprehensive architectural agreement", icon: Home, category: "Construction", component: ArchitecturalServicesAgreementForm },
  { id: "InteriorDesignAgreementForm", title: "Interior Design Agreement", description: "Create a comprehensive interior design agreement", icon: Home, category: "Construction", component: InteriorDesignAgreementForm },
  { id: "CarpentryContractForm", title: "Carpentry Contract", description: "Create a comprehensive carpentry agreement", icon: Hammer, category: "Construction", component: CarpentryContractForm },
  { id: "RoofingContractForm", title: "Roofing Contract Agreement", description: "Create a comprehensive roofing contract agreement", icon: Home, category: "Construction", component: RoofingContractForm },
  { id: "FlooringServicesAgreementForm", title: "Flooring Services Agreement", description: "Create a comprehensive flooring services agreement", icon: HardHat, category: "Construction", component: FlooringServicesAgreementForm },
  { id: "DrywallServicesAgreementForm", title: "Drywall Services Agreement", description: "Create a comprehensive drywall services agreement", icon: Construction, category: "Construction", component: DrywallServicesAgreementForm },
  { id: "RealEstateDevelopmentForm", title: "Real Estate Development", description: "Create a comprehensive real estate development agreement", icon: Construction, category: "Construction", component: RealEstateDevelopmentForm },

  // === EVENTS ===
  { id: "bartending-agreement", title: "Bartending Services Agreement", description: "Create a professional bartending services agreement for events", icon: Coffee, category: "Events", component: BartendingAgreementForm },
  { id: "dj-services-agreement", title: "DJ Services Agreement", description: "Create a professional DJ services agreement for events", icon: Music, category: "Events", component: DJServicesAgreementForm },
  { id: "wedding-planner-agreement", title: "Wedding Planner Agreement", description: "Create a comprehensive wedding planner services agreement", icon: Heart, category: "Events", component: WeddingPlannerAgreementForm },
  { id: "food-service-agreement", title: "Food Service Agreement", description: "Create a catering and food service agreement for events", icon: UtensilsCrossed, category: "Events", component: FoodServiceAgreementForm },
  { id: "videography-agreement", title: "Videography Services Agreement", description: "Create a professional videography services agreement", icon: Camera, category: "Events", component: VideographyServicesAgreementForm },
  { id: "CateringAgreementForm", title: "Catering Agreement", description: "Create a comprehensive catering agreement", icon: Utensils, category: "Events", component: CateringAgreementForm },
  { id: "valet-service-agreement", title: "Valet Service Agreement", description: "Create a professional valet parking services agreement", icon: Car, category: "Events", component: ValetServiceAgreementForm },

  // === SERVICES ===
  { id: "personal-training-agreement", title: "Personal Training Agreement", description: "Create a personal training services agreement", icon: Heart, category: "Services", component: PersonalTrainingAgreementForm },

  // === EDUCATION ===
  { id: "tutoring-agreement", title: "Tutoring Agreement", description: "Create a tutoring services agreement between tutor and student/parent", icon: GraduationCap, category: "Education", component: TutoringAgreementForm },
  { id: "transcript-request", title: "Transcript Request", description: "Create a formal request for academic transcripts", icon: GraduationCap, category: "Education", component: TranscriptRequestForm },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

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
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get total document count
  const totalDocuments = allDocumentTypes.length;

  // 1. Render Specific Document Form or Landing Page
  if (selectedDocument && selectedDocumentType) {
    if (!showForm) {
      return (
        <Layout>
          <div className="container mx-auto px-4 py-12 bg-white min-h-screen pt-24">
             <DocumentInfoLanding
              title={selectedDocumentType.title}
              description={selectedDocumentType.description}
              category={selectedDocumentType.category || "Legal Document"}
              onStart={() => setShowForm(true)}
              onBack={handleBackToDocuments}
            />
          </div>
        </Layout>
      );
    }
    
    // Form is now FULL SCREEN - the new FormWizard has its own sidebar
    const DocumentComponent = selectedDocumentType.component;
    return (
      <Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="h-10 w-10 mx-auto animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading document builder...</p>
          </div>
        </div>
      }>
        <DocumentComponent />
      </Suspense>
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
            <p className="text-muted-foreground mb-2">Choose a document type to begin generating your legal documents</p>
            <p className="text-sm text-blue-600 font-medium mb-6">{categoryDocuments.length} documents available in this category</p>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search documents by name or category..."
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
                    className="flex flex-col h-full cursor-pointer hover:shadow-lg transition-all duration-200 bg-white hover:border-blue-300"
                    onClick={() => {
                      setSelectedDocument(docType.id);
                      navigate(`/documents/${docType.id}`);
                    }}
                  >
                    <CardHeader className="text-center flex flex-col flex-grow">
                      <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <CardTitle className="text-xl">{docType.title}</CardTitle>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mt-2 w-fit mx-auto">{docType.category}</span>
                      <CardDescription className="flex-grow flex items-center justify-center min-h-[64px] mt-2">
                        {docType.description}
                      </CardDescription>
                    </CardHeader>
                    <div className="flex-1" />
                    <CardContent className="text-center mt-auto">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Creating Document</Button>
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
            <p className="text-muted-foreground mb-2">
              Create professional legal documents from our comprehensive library
            </p>
            <p className="text-lg text-blue-600 font-semibold">
              📄 {totalDocuments}+ Documents Available
            </p>
          </div>
        </div>
        <LegalConcernsSection onCategorySelect={(cat) => setSelectedCategory(cat)} />
      </div>
    </Layout>
  );
};

export default Documents;
