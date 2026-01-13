import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  FileText, 
  Home, 
  Shield, 
  Briefcase, 
  Building2, 
  Heart, 
  Users, 
  Scale,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  X,
  DollarSign,
  Gavel,
  UserCheck,
  MapPin,
  GraduationCap,
  TrendingUp,
  Handshake,
  Lock,
  ShoppingCart,
  Factory,
  Truck,
  Package,
  Boxes,
  FileSignature,
  Scroll,
  Hammer,
  Utensils,
  Megaphone,
  ShieldCheck,
  Clipboard,
  BookOpen,
  HardHat,
  Camera,
  ShieldAlert,
  Sparkles,
  Building,
  FileCheck,
  FileMinus,
  MessageSquare,
  Music,
  FileX,
  Paintbrush,
  Baby,
  Split,
  HeartHandshake,
  SplitSquareHorizontal,
  Construction,
  UserMinus,
  EyeOff,
  Cpu,
  Calculator,
  Stethoscope,
  CalendarClock,
  Computer,
  GitMerge,
  AlarmClockCheck,
  Share2,
  FilePlus,
  Fuel,
  UtensilsCrossed
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Document definitions - matching EXACT IDs from Documents.tsx
const familyProtectionDocs = [
  { id: "InformationForPoliceReportForm", title: "Information For Police Report", description: "Create a comprehensive information for police report agreement", icon: ShieldAlert, category: "Legal Reports" },
  { id: "AffidavitOfSurvivorshipForm", title: "Affidavit Of Survivorship", description: "Create a comprehensive affidavit for survivorship", icon: Scroll, category: "Affidavits" },
  { id: "ParentingPlanForm", title: "Parenting Plan Form", description: "Create a comprehensive parenting plan agreement", icon: Baby, category: "Child & Family" },
  { id: "SeparationAgreementForm", title: "Separation Agreement", description: "Create a comprehensive separation agreement", icon: UserMinus, category: "Marriage & Divorce" },
  { id: "PrenuptialAgreementForm", title: "Prenuptial Agreement", description: "Create a comprehensive prenuptial agreement", icon: SplitSquareHorizontal, category: "Marriage & Divorce" },
  { id: "PostnuptialAgreementForm", title: "Postnuptial Agreement", description: "Create a comprehensive postnuptial agreement", icon: HeartHandshake, category: "Marriage & Divorce" },
  { id: "living-will", title: "Living Will", description: "Create a Living Will to specify your health care directives", icon: Heart, category: "Healthcare" },
  { id: "child-care-auth", title: "Child Care Authorization Agreement", description: "Create an authorization agreement for child care arrangements", icon: Users, category: "Child & Family" },
  { id: "affidavit-of-marriage", title: "Affidavit of Marriage", description: "Create an affidavit to verify a name change due to marriage", icon: UserCheck, category: "Affidavits" },
  { id: "divorce-settlement-agreement", title: "Divorce Settlement Agreement", description: "Create a comprehensive divorce settlement agreement", icon: Gavel, category: "Marriage & Divorce" },
  { id: "general-power-of-attorney", title: "General Power of Attorney", description: "Create a comprehensive general power of attorney for legal representation", icon: FileText, category: "Power of Attorney" },
  { id: "special-power-of-attorney", title: "Special Power of Attorney", description: "Create a special power of attorney for specific legal matters", icon: Scale, category: "Power of Attorney" },
  { id: "gift-affidavit", title: "Gift Affidavit", description: "Create a sworn affidavit declaring a transfer of money or property is a gift", icon: DollarSign, category: "Affidavits" },
  { id: "financial-support-affidavit", title: "Affidavit of Financial Support", description: "Create a sworn statement of your financial condition", icon: DollarSign, category: "Affidavits" },
  { id: "affidavit-general", title: "General Affidavit", description: "Create a legally binding sworn statement for various purposes", icon: FileText, category: "Affidavits" },
  { id: "affidavit-character", title: "Affidavit of Character", description: "Create a sworn character reference statement for legal proceedings", icon: UserCheck, category: "Affidavits" },
  { id: "affidavit-ownership", title: "Affidavit of Ownership", description: "Formally declare ownership of property with a sworn statement", icon: FileSignature, category: "Affidavits" },
  { id: "healthcare-poa", title: "Healthcare Power of Attorney", description: "Authorize someone to make medical decisions on your behalf", icon: Heart, category: "Healthcare" },
];

const businessSecurityDocs = [
  { id: "production-agreement", title: "Production Agreement", description: "Create a comprehensive production agreement", icon: Factory, category: "Contracts" },
  { id: "WarrantyAgreementForm", title: "Warranty Agreement", description: "Create a comprehensive warranty agreement", icon: ShieldCheck, category: "Contracts" },
  { id: "SupplierAgreementForm", title: "Supplier Agreement", description: "Create a comprehensive supplier agreement", icon: Truck, category: "Contracts" },
  { id: "StockPurchaseAgreementForm", title: "Stock Purchase Agreement", description: "Create a comprehensive stock purchase agreement", icon: FilePlus, category: "Business Formation" },
  { id: "StaffingAgencyContractForm", title: "Staffing Agency Contract", description: "Create a comprehensive staffing agency agreement", icon: Users, category: "Employment" },
  { id: "SocialMediaContractForm", title: "Social Media Contract", description: "Create a comprehensive social media agreement", icon: Share2, category: "Marketing" },
  { id: "ServiceLevelAgreementForm", title: "Service Level Agreement", description: "Create a comprehensive service level agreement", icon: AlarmClockCheck, category: "Contracts" },
  { id: "ProductDistributionAgreementForm", title: "Product Distribution Agreement", description: "Create a comprehensive product distribution agreement", icon: Package, category: "Contracts" },
  { id: "ReferralAndWarrantyForm", title: "Referral Fee Agreement", description: "Create a comprehensive referral fee agreement", icon: Handshake, category: "Contracts" },
  { id: "MergerAgreementForm", title: "Merger Agreement", description: "Create a comprehensive merger agreement", icon: GitMerge, category: "Business Formation" },
  { id: "MarketingAgreementForm", title: "Marketing Agreement", description: "Create a comprehensive marketing agreement", icon: Megaphone, category: "Marketing" },
  { id: "JointBidAgreementForm", title: "Joint Bid Agreement", description: "Create a comprehensive joint bid agreement", icon: Handshake, category: "Contracts" },
  { id: "ITServicesAgreementForm", title: "IT Services Agreement", description: "Create a comprehensive IT services agreement", icon: Computer, category: "Technology" },
  { id: "FranchisePurchaseForm", title: "Franchise Purchase Agreement", description: "Create a comprehensive franchise purchase agreement", icon: Factory, category: "Business Formation" },
  { id: "FeeAgreementForm", title: "Fee Agreement", description: "Create a comprehensive fee agreement", icon: DollarSign, category: "Financial" },
  { id: "ContractForSaleForm", title: "Contract For Sale", description: "Create a comprehensive contract for sale", icon: ShoppingCart, category: "Contracts" },
  { id: "ContractExtensionForm", title: "Contract Extension", description: "Create a comprehensive contract extension", icon: CalendarClock, category: "Contracts" },
  { id: "ClinicalTrialAgreementForm", title: "Clinical Trial Agreement", description: "Create a comprehensive clinical trial agreement", icon: Stethoscope, category: "Healthcare" },
  { id: "AdvertisingAgencyAgreementForm", title: "Advertising Agency Agreement", description: "Create a comprehensive advertising agency agreement", icon: Megaphone, category: "Marketing" },
  { id: "AdministrativeServicesContractForm", title: "Administrative Services Contract", description: "Create a comprehensive administrative services contract", icon: Briefcase, category: "Contracts" },
  { id: "AccountingContractForm", title: "Accounting Contract", description: "Create a comprehensive accounting contract", icon: Calculator, category: "Financial" },
  { id: "BarterAgreementForm", title: "Barter Agreement", description: "Create a comprehensive barter agreement", icon: Handshake, category: "Contracts" },
  { id: "BusinessSaleAgreementForm", title: "Business Sale Agreement", description: "Create a comprehensive business sale agreement", icon: Briefcase, category: "Contracts" },
  { id: "AssetPurchaseForm", title: "Asset Purchase Agreement", description: "Create a comprehensive asset purchase agreement", icon: Briefcase, category: "Contracts" },
  { id: "TechnicalConsultingForm", title: "Technical Consulting Agreement", description: "Create a comprehensive technical consulting agreement", icon: Cpu, category: "Technology" },
  { id: "StrategicAllianceForm", title: "Strategic Alliance Agreement", description: "Create a comprehensive strategic alliance agreement", icon: Handshake, category: "Business Formation" },
  { id: "SilentPartnershipForm", title: "Silent Partnership Agreement", description: "Create a comprehensive silent partnership agreement", icon: EyeOff, category: "Business Formation" },
  { id: "ServiceAgreementForm", title: "Service Agreement", description: "Create a comprehensive service agreement", icon: Briefcase, category: "Contracts" },
  { id: "SecurityAgreementForm", title: "Security Agreement", description: "Create a comprehensive security agreement", icon: Lock, category: "Financial" },
  { id: "RetailerAgreementForm", title: "Retailer Agreement", description: "Create a comprehensive retailer agreement", icon: ShoppingCart, category: "Contracts" },
  { id: "PartnershipDissolutionForm", title: "Partnership Dissolution Agreement", description: "Create a comprehensive partnership dissolution agreement", icon: Split, category: "Business Formation" },
  { id: "PartnershipAgreementForm", title: "Partnership Agreement", description: "Create a comprehensive partnership agreement", icon: Handshake, category: "Business Formation" },
  { id: "MutualRescissionForm", title: "Mutual Rescission Agreement", description: "Create a comprehensive mutual rescission agreement", icon: FileX, category: "Contracts" },
  { id: "MutualReleaseForm", title: "Mutual Release Agreement", description: "Create a comprehensive mutual release agreement", icon: FileCheck, category: "Contracts" },
  { id: "MusicalPerformanceAgreementForm", title: "Musical Performance Agreement", description: "Create a comprehensive musical performance agreement", icon: Music, category: "Contracts" },
  { id: "MOUForm", title: "Memorandum Of Understanding", description: "Create a comprehensive MOU agreement", icon: FileSignature, category: "Contracts" },
  { id: "MemorandumOfAgreementForm", title: "Memorandum Of Agreement", description: "Create a comprehensive memorandum of agreement", icon: FileText, category: "Contracts" },
  { id: "MediationAgreementForm", title: "Mediation Agreement", description: "Create a comprehensive mediation agreement", icon: MessageSquare, category: "Contracts" },
  { id: "LiquidationDissolutionAgreementForm", title: "Liquidation Dissolution Agreement", description: "Create a comprehensive liquidation dissolution agreement", icon: FileMinus, category: "Business Formation" },
  { id: "LimitedPartnershipAgreementForm", title: "Limited Partnership Agreement", description: "Create a comprehensive limited partnership agreement", icon: Users, category: "Business Formation" },
  { id: "LeaseSubordinationAgreementForm", title: "Lease Subordination Agreement", description: "Create a comprehensive lease subordination agreement", icon: FileCheck, category: "Contracts" },
  { id: "JointVentureAgreementForm", title: "Joint Venture Agreement", description: "Create a comprehensive joint venture agreement", icon: Building, category: "Business Formation" },
  { id: "EventPhotographyAgreementForm", title: "Event Photography Agreement", description: "Create a comprehensive event photography agreement", icon: Camera, category: "Contracts" },
  { id: "MasterServiceAgreementForm", title: "Master Service Agreement", description: "Create a comprehensive master service agreement", icon: Handshake, category: "Contracts" },
  { id: "CoursePartnershipAgreementForm", title: "Course Partnership Agreement", description: "Create a comprehensive course partnership agreement", icon: BookOpen, category: "Contracts" },
  { id: "ConstructionPerformanceBondForm", title: "Construction Performance Bond Agreement", description: "Create a comprehensive construction performance bond agreement", icon: ShieldCheck, category: "Contracts" },
  { id: "CooperationAgreementForm", title: "Cooperation Agreement", description: "Create a comprehensive cooperation agreement", icon: Users, category: "Contracts" },
  { id: "ConsignmentAgreementForm", title: "Consignment Agreement", description: "Create a comprehensive consignment agreement", icon: Package, category: "Contracts" },
  { id: "CoMarketingAgreementForm", title: "CoMarketing Agreement", description: "Create a comprehensive co-marketing agreement", icon: Megaphone, category: "Marketing" },
  { id: "CollaborationAgreementForm", title: "Collaboration Agreement", description: "Create a comprehensive collaboration agreement", icon: Handshake, category: "Contracts" },
  { id: "CateringAgreementForm", title: "Catering Agreement", description: "Create a comprehensive catering agreement", icon: Utensils, category: "Contracts" },
  { id: "ArbitrationAgreementForm", title: "Arbitration Agreement", description: "Create a comprehensive arbitration agreement", icon: Handshake, category: "Contracts" },
  { id: "BillOfSaleForm", title: "Bill Of Sale", description: "Create a comprehensive bill of sale agreement", icon: FileText, category: "Contracts" },
  { id: "BrokerAgreementForm", title: "Broker Agreement", description: "Create a comprehensive broker agreement", icon: Handshake, category: "Contracts" },
  { id: "trucking-agreement", title: "Trucking Agreement", description: "Create a comprehensive trucking agreement", icon: Truck, category: "Contracts" },
  { id: "bidproposal-agreement", title: "Bid Proposal Agreement", description: "Create a comprehensive bid proposal agreement", icon: FileSignature, category: "Contracts" },
  { id: "Moving-agreement", title: "Moving Agreement", description: "Create a comprehensive moving agreement", icon: Package, category: "Contracts" },
  { id: "Fulfillment-agreement", title: "Fulfillment Agreement", description: "Create a comprehensive fulfillment agreement", icon: Boxes, category: "Contracts" },
  { id: "business-agreement", title: "Business Agreement", description: "Create a comprehensive business agreement", icon: Briefcase, category: "Contracts" },
  { id: "DEBTSETTLEMENTAGREEMENT", title: "Debt Settlement Agreement", description: "Create a comprehensive debt settlement agreement", icon: Briefcase, category: "Financial" },
  { id: "GuaranteeAgreementForm", title: "Guarantee Agreement Form", description: "Create a comprehensive guarantee agreement form", icon: Briefcase, category: "Financial" },
  { id: "services-contract", title: "Services Contract", description: "Create a comprehensive services contract", icon: Briefcase, category: "Contracts" },
  { id: "payment-agreement", title: "Payment Agreement", description: "Create a comprehensive payment agreement", icon: Briefcase, category: "Financial" },
  { id: "SECURITYAGREEMENT", title: "Security Agreement", description: "Create a comprehensive security agreement", icon: Briefcase, category: "Financial" },
  { id: "PROMISSORYNOTEAGREEMENT", title: "Promissory Note Agreement", description: "Create a comprehensive promissory note agreement", icon: Briefcase, category: "Financial" },
  { id: "independent-contractor", title: "Independent Contractor Agreement", description: "Create a comprehensive independent contractor agreement", icon: Briefcase, category: "Employment" },
  { id: "nda", title: "Non-Disclosure Agreement", description: "Create a legally binding confidentiality agreement", icon: Shield, category: "Confidentiality" },
  { id: "mutual-nda", title: "Mutual Non-Disclosure Agreement", description: "Create a bilateral confidentiality agreement", icon: Handshake, category: "Confidentiality" },
  { id: "llc-operating-agreement", title: "LLC Operating Agreement", description: "Create a comprehensive LLC Operating Agreement", icon: Building2, category: "Business Formation" },
  { id: "sale-agreement", title: "Sale Agreement", description: "Create a comprehensive sale agreement", icon: Briefcase, category: "Contracts" },
  { id: "general-contract", title: "General Contract for Products", description: "Create a comprehensive contract for the sale and purchase of products", icon: ShoppingCart, category: "Contracts" },
  { id: "share-purchase-agreement", title: "Share Purchase Agreement", description: "Create a comprehensive share purchase agreement", icon: Building2, category: "Business Formation" },
  { id: "loan-agreement", title: "Loan Agreement", description: "Create a comprehensive loan agreement", icon: DollarSign, category: "Financial" },
  { id: "Cohabitation-AgreementForm", title: "Cohabitation Agreement", description: "Create a comprehensive cohabitation agreement", icon: DollarSign, category: "Contracts" },
  { id: "copyright-assignment", title: "Copyright Assignment", description: "Create a comprehensive copyright assignment agreement", icon: FileText, category: "Contracts" },
  { id: "copyright-license", title: "Copyright License Agreement", description: "Grant or obtain rights to use copyrighted material", icon: Shield, category: "Contracts" },
  { id: "domestic-service-agreement", title: "Domestic Service Agreement", description: "Create a comprehensive domestic service agreement", icon: Home, category: "Employment" },
  { id: "corporate-bylaws", title: "Corporate Bylaws", description: "Create comprehensive corporate bylaws", icon: Scale, category: "Business Formation" },
  { id: "buy-sell-agreement", title: "Buy-Sell Agreement", description: "Create a comprehensive buy-sell agreement", icon: TrendingUp, category: "Business Formation" },
  { id: "business-plan", title: "Business Plan", description: "Create a comprehensive business plan", icon: Briefcase, category: "Business Formation" },
  { id: "confidential-information", title: "Confidential Information Agreement", description: "Protect sensitive business information with legally binding terms", icon: Shield, category: "Confidentiality" },
  { id: "non-circumvention", title: "Non-Circumvention Agreement", description: "Protect business relationships and prevent contact circumvention", icon: Handshake, category: "Confidentiality" },
  { id: "copyright-permission", title: "Copyright Permission Request", description: "Formally request permission to use copyrighted material", icon: FileText, category: "Contracts" },
  { id: "patent-assignment", title: "Patent Assignment Agreement", description: "Create a comprehensive patent assignment agreement", icon: Shield, category: "Contracts" },
  { id: "royalty-agreement", title: "Royalty Agreement", description: "Create a professional royalty agreement", icon: DollarSign, category: "Financial" },
  { id: "Confidentialityagreement", title: "Confidentiality Agreement", description: "Create a professional employee confidentiality agreement", icon: Lock, category: "Confidentiality" },
  { id: "Employeehandbook", title: "Employee Handbook", description: "Create a professional employee handbook", icon: Users, category: "Employment" },
  { id: "employeeretirementt", title: "Employee Retirement Agreement", description: "Create a professional employee retirement agreement", icon: Briefcase, category: "Employment" },
  { id: "EmploymentAgreement", title: "Employment Agreement", description: "Create a professional employment agreement", icon: TrendingUp, category: "Employment" },
  { id: "lastwill", title: "Last Will and Testament", description: "Create a professional last will and testament", icon: Home, category: "Contracts" },
  { id: "Home-Agreement", title: "Work From Home Agreement", description: "Create a professional work from home agreement", icon: Home, category: "Employment" },
  { id: "employment", title: "Offer of Employment Letter", description: "Create a professional offer of employment letter", icon: Users, category: "Employment" },
  { id: "Severance", title: "Severance Agreement", description: "Create a professional severance agreement", icon: DollarSign, category: "Employment" },
  { id: "software", title: "Software License Agreement", description: "Create a professional software license agreement", icon: FileText, category: "Technology" },
  { id: "license-agreement", title: "License Agreement", description: "Create a comprehensive license agreement", icon: Scale, category: "Contracts" },
  { id: "manufacturing-license", title: "Manufacturing License Agreement", description: "Create a manufacturing license agreement", icon: Scale, category: "Contracts" },
  { id: "music-license", title: "Music License Agreement", description: "Create a music licensing agreement", icon: Scale, category: "Contracts" },
  { id: "office-space-lease", title: "Office Space Lease Agreement", description: "Create a comprehensive lease agreement for renting office space", icon: Building2, category: "Commercial Lease" },
];

const propertyMattersDocs = [
  { id: "JanitorialServicesAgreementForm", title: "Janitorial Services Agreement", description: "Create a comprehensive janitorial agreement", icon: Sparkles, category: "Property Management" },
  { id: "VacationLeaseForm", title: "Vacation Lease Agreement", description: "Create a comprehensive vacation lease agreement", icon: Building2, category: "Residential Lease" },
  { id: "InteriorDesignAgreementForm", title: "Interior Design Agreement", description: "Create a comprehensive interior design agreement", icon: Home, category: "Construction" },
  { id: "CarpentryContractForm", title: "Carpentry Contract", description: "Create a comprehensive carpentry agreement", icon: Hammer, category: "Construction" },
  { id: "ArchitecturalServicesAgreementForm", title: "Architectural Services Agreement", description: "Create a comprehensive architectural agreement", icon: Home, category: "Construction" },
  { id: "ConstructionManagementAgreementForm", title: "Construction Management Agreement", description: "Create a comprehensive construction management agreement", icon: Handshake, category: "Construction" },
  { id: "ConstructionContractForm", title: "Construction Contract", description: "Create a comprehensive construction agreement", icon: Home, category: "Construction" },
  { id: "DrywallServicesAgreementForm", title: "Drywall Services Agreement", description: "Create a comprehensive drywall services agreement", icon: Camera, category: "Construction" },
  { id: "HomeRemodellingAgreementForm", title: "Home Remodelling Agreement", description: "Create a comprehensive home remodelling agreement", icon: Home, category: "Construction" },
  { id: "HomeImprovementContractForm", title: "Home Improvement Contract", description: "Create a comprehensive home improvement agreement", icon: FileText, category: "Construction" },
  { id: "FlooringServicesAgreementForm", title: "Flooring Services Agreement", description: "Create a comprehensive flooring services agreement", icon: HardHat, category: "Construction" },
  { id: "LandscapingServicesAgreementForm", title: "Landscaping Services Agreement", description: "Create a comprehensive landscaping services agreement", icon: Home, category: "Construction" },
  { id: "PaintingServicesContractForm", title: "Painting Services Contract", description: "Create a comprehensive painting services agreement", icon: Paintbrush, category: "Construction" },
  { id: "RealEstateDevelopmentForm", title: "Real Estate Development", description: "Create a comprehensive real estate development agreement", icon: Construction, category: "Construction" },
  { id: "PropertyManagerAgreementForm", title: "Property Manager Agreement", description: "Create a comprehensive property manager agreement", icon: Home, category: "Property Management" },
  { id: "RoofingContractForm", title: "Roofing Contract Agreement", description: "Create a comprehensive roofing contract agreement", icon: Clipboard, category: "Construction" },
  { id: "CoSignerAgreementForm", title: "CoSigner Agreement", description: "Create a comprehensive co-signer agreement", icon: Clipboard, category: "Residential Lease" },
  { id: "lease-agreement", title: "Lease Agreement", description: "Generate a comprehensive lease agreement for rental properties", icon: FileText, category: "Residential Lease" },
  { id: "condominium-lease", title: "Condominium Lease Agreement", description: "Create a comprehensive lease agreement for condominium units", icon: Building2, category: "Residential Lease" },
  { id: "lease-renewal", title: "Lease Renewal Agreement", description: "Create a comprehensive lease renewal agreement", icon: FileText, category: "Lease Modifications" },
  { id: "lease-termination", title: "Agreement to Terminate Lease", description: "Create a mutual agreement to terminate a lease", icon: FileText, category: "Lease Modifications" },
  { id: "rent-increase", title: "Rent Increase Agreement", description: "Create a formal agreement to increase rent", icon: DollarSign, category: "Lease Modifications" },
  { id: "sublease", title: "Sublease Agreement", description: "Create a comprehensive sublease agreement", icon: Building2, category: "Residential Lease" },
  { id: "lease-amendment", title: "Lease Amendment", description: "Create a formal amendment to modify existing lease terms", icon: FileText, category: "Lease Modifications" },
  { id: "roommate-agreement", title: "Roommate Agreement", description: "Create a comprehensive agreement between roommates", icon: Users, category: "Residential Lease" },
  { id: "bartending-agreement", title: "Bartending Services Agreement", description: "Create a professional bartending services agreement", icon: UtensilsCrossed, category: "Property Management" },
  { id: "dj-services-agreement", title: "DJ Services Agreement", description: "Create a professional DJ services agreement", icon: Music, category: "Property Management" },
  { id: "wedding-planner-agreement", title: "Wedding Planner Agreement", description: "Create a comprehensive wedding planner services agreement", icon: Heart, category: "Property Management" },
  { id: "food-service-agreement", title: "Food Service Agreement", description: "Create a catering and food service agreement", icon: UtensilsCrossed, category: "Property Management" },
  { id: "videography-agreement", title: "Videography Services Agreement", description: "Create a professional videography services agreement", icon: Camera, category: "Property Management" },
  { id: "personal-training-agreement", title: "Personal Training Agreement", description: "Create a personal training services agreement", icon: Heart, category: "Property Management" },
  { id: "tutoring-agreement", title: "Tutoring Agreement", description: "Create a tutoring services agreement", icon: GraduationCap, category: "Property Management" },
  { id: "retainer-agreement", title: "Retainer Agreement", description: "Create a legal retainer agreement", icon: Scale, category: "Property Management" },
  { id: "limousine-agreement", title: "Limousine Service Agreement", description: "Create a professional limousine service agreement", icon: Truck, category: "Property Management" },
  { id: "consulting-agreement", title: "Consulting Agreement", description: "Create a consulting services agreement", icon: Briefcase, category: "Property Management" },
  { id: "vendor-agreement", title: "Vendor Agreement", description: "Create a vendor services agreement", icon: FileText, category: "Property Management" },
  { id: "composer-agreement", title: "Composer Agreement", description: "Create a comprehensive agreement for original music", icon: FileText, category: "Property Management" },
  { id: "concession-agreement", title: "Concession Agreement", description: "Create a comprehensive concession agreement", icon: FileText, category: "Property Management" },
  { id: "co-tenancy-agreement", title: "Co-Tenancy Agreement", description: "Create an agreement between roommates sharing a rental property", icon: Users, category: "Residential Lease" },
  { id: "valet-service-agreement", title: "Valet Service Agreement", description: "Create a professional valet parking services agreement", icon: FileText, category: "Property Management" },
  { id: "commercial-lease", title: "Commercial Lease Agreement", description: "Create a comprehensive commercial lease agreement", icon: Building2, category: "Commercial Lease" },
  { id: "billboard-lease", title: "Billboard Lease Agreement", description: "Create a comprehensive lease agreement for billboard advertising", icon: Building2, category: "Commercial Lease" },
  { id: "agreement-to-sell", title: "Agreement to Sell", description: "Create a comprehensive agreement to sell for property transactions", icon: FileText, category: "Property Sales" },
  { id: "eviction-notice", title: "Eviction Notice", description: "Create a formal notice to terminate a tenancy", icon: FileText, category: "Notices & Letters" },
  { id: "affidavit-of-residence", title: "Affidavit of Residence", description: "Create an affidavit to verify residence", icon: MapPin, category: "Affidavits" },
  { id: "transcript-request", title: "Transcript Request", description: "Create a formal request for academic transcripts", icon: GraduationCap, category: "Notices & Letters" },
  { id: "storage-space-lease", title: "Storage Space Lease Agreement", description: "Create a comprehensive lease agreement for renting storage space", icon: Building2, category: "Commercial Lease" },
  { id: "restaurant-lease", title: "Restaurant Lease Agreement", description: "Create a comprehensive lease agreement for restaurant operations", icon: UtensilsCrossed, category: "Commercial Lease" },
  { id: "warehouse-lease", title: "Warehouse Lease Agreement", description: "Create a comprehensive lease agreement for warehouse facilities", icon: Building2, category: "Commercial Lease" },
  { id: "oil-lease", title: "Oil Lease Agreement", description: "Create a comprehensive oil and gas lease agreement", icon: Fuel, category: "Energy & Resources" },
  { id: "gas-lease", title: "Gas Lease Agreement", description: "Create a comprehensive gas lease agreement", icon: Fuel, category: "Energy & Resources" },
  { id: "security-deposit-return", title: "Security Deposit Return Letter", description: "Create a professional letter for returning security deposits", icon: FileText, category: "Notices & Letters" },
  { id: "lease-termination-letter", title: "Lease Termination Letter", description: "Create a professional letter to notify tenants of lease termination", icon: FileText, category: "Notices & Letters" },
  { id: "late-rent-payment-agreement", title: "Late Rent Payment Agreement", description: "Create a professional agreement for tenants with past due rent", icon: DollarSign, category: "Lease Modifications" },
  { id: "non-disturbance-agreement", title: "Non-Disturbance Agreement", description: "Create a professional non-disturbance agreement", icon: Shield, category: "Property Protection" },
  { id: "roommate-release-agreement", title: "Roommate Release Agreement", description: "Create an agreement to release a roommate from a shared lease", icon: UserMinus, category: "Residential Lease" },
  { id: "offer-to-lease", title: "Offer to Lease", description: "Create a formal offer to lease commercial property", icon: Building2, category: "Commercial Lease" },
  { id: "legal-services-agreement", title: "Legal Services Agreement", description: "Create a comprehensive attorney-client legal services agreement", icon: Scale, category: "Property Management" },
  { id: "physician-services-agreement", title: "Physician Services Agreement", description: "Create a professional agreement for physician services", icon: Stethoscope, category: "Property Management" },
  { id: "real-estate-agent-agreement", title: "Real Estate Agent Agreement", description: "Create an exclusive listing agreement with a real estate agent", icon: Home, category: "Property Sales" },
  { id: "limited-scope-representation-agreement", title: "Limited Scope Representation Agreement", description: "Create a limited scope legal representation agreement", icon: Scale, category: "Property Management" },
  { id: "unbundled-legal-services-agreement", title: "Unbundled Legal Services Agreement", description: "Create an agreement for specific unbundled legal services", icon: Scale, category: "Property Management" },
  { id: "attorney-engagement-letter", title: "Attorney Engagement Letter", description: "Create a formal attorney engagement letter", icon: FileText, category: "Property Management" },
  { id: "vehicle-lease", title: "Vehicle Lease Agreement", description: "Create a contract for leasing a vehicle between owner and driver", icon: Truck, category: "Property Management" },
];

// Category structure
const categories = [
  {
    id: "family",
    title: "Family Protection",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
    documents: familyProtectionDocs,
    subcategories: ["Child & Family", "Marriage & Divorce", "Healthcare", "Power of Attorney", "Affidavits", "Legal Reports"]
  },
  {
    id: "business",
    title: "Business Security",
    icon: Briefcase,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    documents: businessSecurityDocs,
    subcategories: ["Contracts", "Employment", "Business Formation", "Confidentiality", "Financial", "Marketing", "Technology", "Healthcare", "Commercial Lease"]
  },
  {
    id: "property",
    title: "Property Matters",
    icon: Building2,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    documents: propertyMattersDocs,
    subcategories: ["Residential Lease", "Commercial Lease", "Lease Modifications", "Property Sales", "Construction", "Property Management", "Notices & Letters", "Energy & Resources", "Affidavits", "Property Protection"]
  }
];

const DocumentCategories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Get the currently selected category object
  const activeCategory = useMemo(() => {
    return categories.find(c => c.id === selectedCategory) || null;
  }, [selectedCategory]);

  // Filter documents based on search and selections
  const filteredDocuments = useMemo(() => {
    if (!activeCategory) return [];
    
    let docs = activeCategory.documents;
    
    // Filter by subcategory if selected
    if (selectedSubcategory) {
      docs = docs.filter(d => d.category === selectedSubcategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(d => 
        d.title.toLowerCase().includes(query) || 
        d.description.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query)
      );
    }
    
    return docs;
  }, [activeCategory, selectedSubcategory, searchQuery]);

  // Toggle category expansion
  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle category selection - show documents inline
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory === selectedSubcategory ? null : subcategory);
  };

  // Handle document click - navigate to the Documents page with doc ID
  // The Documents page uses URL params to auto-select a document and show its form
  const handleDocumentClick = (docId: string) => {
    navigate(`/documents/${docId}`);
  };

  // Go back to category list
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery("");
  };

  // Render category cards (main view)
  const renderCategoryList = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Browse Document Categories
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Select a category to explore legal documents. Each category contains subcategories for easy navigation.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isExpanded = expandedCategories.includes(category.id);
          
          return (
            <Card 
              key={category.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
            >
              {/* Category Header */}
              <div 
                className={`bg-gradient-to-r ${category.color} p-6 cursor-pointer`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    <p className="text-white/80 text-sm">
                      {category.documents.length} documents
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Subcategory Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.subcategories.slice(0, 3).map((sub) => (
                    <Badge 
                      key={sub} 
                      variant="secondary" 
                      className={`${category.bgColor} ${category.iconColor} border-0`}
                    >
                      {sub}
                    </Badge>
                  ))}
                  {category.subcategories.length > 3 && (
                    <Badge variant="outline" className="text-gray-500">
                      +{category.subcategories.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Expand/Collapse Subcategories */}
                <button
                  onClick={() => toggleCategoryExpand(category.id)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full"
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  {isExpanded ? "Hide subcategories" : "Show all subcategories"}
                </button>

                {/* Expanded Subcategories */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t space-y-2">
                    {category.subcategories.map((sub) => {
                      const count = category.documents.filter(d => d.category === sub).length;
                      return (
                        <button
                          key={sub}
                          onClick={() => {
                            handleCategorySelect(category.id);
                            setTimeout(() => handleSubcategorySelect(sub), 100);
                          }}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-gray-100 transition-colors`}
                        >
                          <span className="text-gray-700">{sub}</span>
                          <span className="text-gray-400 text-xs">{count} docs</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Browse Button */}
                <Button
                  onClick={() => handleCategorySelect(category.id)}
                  className={`w-full mt-4 bg-gradient-to-r ${category.color} hover:opacity-90 text-white`}
                >
                  Browse {category.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="flex justify-center gap-8 mt-8 py-6 bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {categories.reduce((sum, c) => sum + c.documents.length, 0)}
          </div>
          <div className="text-sm text-gray-500">Total Documents</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{categories.length}</div>
          <div className="text-sm text-gray-500">Categories</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {categories.reduce((sum, c) => sum + c.subcategories.length, 0)}
          </div>
          <div className="text-sm text-gray-500">Subcategories</div>
        </div>
      </div>
    </div>
  );

  // Render documents view (when category is selected)
  const renderDocumentsView = () => {
    if (!activeCategory) return null;
    const IconComponent = activeCategory.icon;

    return (
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={handleBackToCategories}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Categories
          </Button>
        </div>

        {/* Category Header */}
        <div className={`bg-gradient-to-r ${activeCategory.color} rounded-2xl p-6 md:p-8`}>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-xl">
              <IconComponent className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {activeCategory.title}
              </h1>
              <p className="text-white/80">
                {filteredDocuments.length} of {activeCategory.documents.length} documents
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={`Search in ${activeCategory.title}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400"
            />
          </div>
        </div>

        {/* Subcategory Pills */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSubcategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSubcategory(null)}
            className={selectedSubcategory === null ? `bg-gradient-to-r ${activeCategory.color} text-white` : ""}
          >
            All ({activeCategory.documents.length})
          </Button>
          {activeCategory.subcategories.map((sub) => {
            const count = activeCategory.documents.filter(d => d.category === sub).length;
            const isSelected = selectedSubcategory === sub;
            return (
              <Button
                key={sub}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => handleSubcategorySelect(sub)}
                className={isSelected ? `bg-gradient-to-r ${activeCategory.color} text-white` : ""}
              >
                {sub} ({count})
              </Button>
            );
          })}
        </div>

        {/* Clear Selection */}
        {(selectedSubcategory || searchQuery) && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Filters active:</span>
            {selectedSubcategory && (
              <Badge 
                variant="secondary" 
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-200"
                onClick={() => setSelectedSubcategory(null)}
              >
                {selectedSubcategory}
                <X className="h-3 w-3" />
              </Badge>
            )}
            {searchQuery && (
              <Badge 
                variant="secondary" 
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-200"
                onClick={() => setSearchQuery("")}
              >
                "{searchQuery}"
                <X className="h-3 w-3" />
              </Badge>
            )}
          </div>
        )}

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => {
              const DocIcon = doc.icon;
              return (
                <Card
                  key={doc.id}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-orange-300 group"
                  onClick={() => handleDocumentClick(doc.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${activeCategory.bgColor} group-hover:scale-110 transition-transform`}>
                        <DocIcon className={`h-6 w-6 ${activeCategory.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                          {doc.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {doc.description}
                        </p>
                        <Badge 
                          variant="outline" 
                          className="mt-2 text-xs"
                        >
                          {doc.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedSubcategory(null);
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-xl font-bold"
            >
              <Scale className="h-6 w-6 text-orange-500" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                LegalGram
              </span>
            </button>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/documents")}
                className="text-gray-600 hover:text-gray-900"
              >
                All Documents
              </Button>
              <Button
                onClick={() => navigate("/documents")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCategory ? renderDocumentsView() : renderCategoryList()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 LegalGram. Professional legal document templates for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DocumentCategories;
