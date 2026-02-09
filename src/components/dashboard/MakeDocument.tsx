import React, { useState, lazy, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Users, ShoppingCart, Briefcase, Heart, Building2, DollarSign, Home, Scale, UserCheck, MapPin, Gavel, GraduationCap, Shield, ArrowLeft, TrendingUp, Handshake, Factory, UtensilsCrossed, Fuel, Search, FileSignature, Calculator, FilePlus, ShieldCheck } from "lucide-react";
import LegalConcernsSection from "@/components/LegalConcernsSection";
//import DemandForDeliveryForm from '../DemandForDeliveryForm';
import { Description } from '@radix-ui/react-toast';


// Convert all form imports to lazy loading to prevent build conflicts
const ConditionalForm = lazy(() => import("@/components/ConditionalForm"));
const ChildCareAuthForm = lazy(() => import("@/components/ChildCareAuthForm"));
const GeneralContractForm = lazy(() => import("@/components/GeneralContractForm"));
const IndependentContractorForm = lazy(() => import("@/components/IndependentContractorForm"));
const LivingWillForm = lazy(() => import("@/components/LivingWillForm"));
const SharePurchaseAgreementForm = lazy(() => import("@/components/SharePurchaseAgreementForm"));
const LoanAgreementForm = lazy(() => import("@/components/LoanAgreementForm"));
const BalloonPaymentPromissoryNoteForm = lazy(() => import("@/components/BalloonPaymentPromissoryNoteForm"));
const GiftAffidavitForm = lazy(() => import("@/components/GiftAffidavitForm"));
const FinancialSupportAffidavitForm = lazy(() => import("@/components/FinancialSupportAffidavitForm"));
const ServicesContractForm = lazy(() => import("@/components/ServicesContractForm"));
const DomesticServiceAgreementForm = lazy(() => import("@/components/DomesticServiceAgreementForm"));
const AgreementToSellForm = lazy(() => import("@/components/AgreementToSellForm"));
const GeneralPowerOfAttorneyForm = lazy(() => import("@/components/GeneralPowerOfAttorneyForm"));
const SpecialPowerOfAttorneyForm = lazy(() => import("@/components/SpecialPowerOfAttorneyForm"));
const SaleAgreementForm = lazy(() => import("@/components/SaleAgreementForm"));
const BusinessAgreementForm = lazy(() => import("@/components/BusinessAgreementForm"));
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
const BillboardLeaseForm = lazy(() => import("@/components/BillboardLeaseForm"));
const OfficeSpaceLeaseForm = lazy(() => import("@/components/OfficeSpaceLeaseForm"));
const StorageSpaceLeaseForm = lazy(() => import("@/components/StorageSpaceLeaseForm"));
const RestaurantLeaseForm = lazy(() => import("@/components/RestaurantLeaseForm"));
const PatentAssignmentForm = lazy(() => import("@/components/PatentAssignmentForm"));
const RoyaltyAgreementForm = lazy(() => import("@/components/RoyaltyAgreementForm"));
const WarehouseLeaseForm = lazy(() => import("@/components/WarehouseLeaseForm"));
const OilLeaseForm = lazy(() => import("@/components/OilLeaseForm"));
const GasLeaseForm = lazy(() => import("@/components/GasLeaseForm"));
const SecurityDepositReturnLetter = lazy(() => import("@/components/SecurityDepositReturnLetter"));
const LeaseTerminationLetter = lazy(() => import("@/components/LeaseTerminationLetter"));
const LateRentPaymentAgreement = lazy(() => import("@/components/LateRentPaymentAgreement"));
const NonDisturbanceAgreement = lazy(() => import("@/components/NonDisturbanceAgreement"));
const CellPhoneInquiryLetterForm = lazy(() => import("@/components/CellPhoneInquiryLetterForm"));
const DueOnDemandPromissoryNoteForm = lazy(() => import("@/components/DueOnDemandPromissoryNoteForm"));
const DemandForDeliveryForm = lazy(() => import("@/components/DemandForDeliveryForm"));
const ComplaintLetterInfoForm = lazy(() => import("@/components/ComplaintLetterInfoForm"));
const ChangeOfBeneficiaryForm = lazy(() => import("@/components/ChangeOfBeneficiaryForm"));
const ReservationConfirmationForm = lazy(() => import("@/components/ReservationConfirmationForm"));
const DebtCollectionWorksheetForm = lazy(() => import("@/components/DebtCollectionWorksheetForm"));
const DirectMailAdvertisingForm = lazy(() => import("@/components/DirectMailAdvertisingForm"));
const FormalComplaintRefundForm = lazy(() => import("@/components/FormalComplaintRefundForm"));
const SecuredPromissoryNoteForm = lazy(() => import("@/components/SecuredPromissoryNoteForm"));
const InstallmentPromissoryNoteForm = lazy(() => import("@/components/InstallmentPromissoryNoteForm"));
const IOUForm = lazy(() => import("@/components/IOUForm"));
const MembershipCancellationLetterForm = lazy(() => import("@/components/MembershipCancellationLetterForm"));
const NotePayableForm = lazy(() => import("@/components/NotePayableForm"));
const LotteryPoolContractForm = lazy(() => import("@/components/LotteryPoolContractForm"));
const BankCreditReferenceForm = lazy(() => import("@/components/BankCreditReferenceForm"));
const RemovePersonalInfoRequestForm = lazy(() => import("@/components/RemovePersonalInfoRequestForm"));
const SecurityAgreementInfoForm = lazy(() => import("@/components/SecurityAgreementInfoForm"));
const SubordinatedLoanAgreementForm = lazy(() => import("@/components/SubordinatedLoanAgreementForm"));
const DemandForMoneyOwedForm = lazy(() => import("@/components/DemandForMoneyOwedForm"));
const RemoveFromMarketingListForm = lazy(() => import("@/components/RemoveFromMarketingListForm"));
const StatementOfClaimAgainstEstateForm = lazy(() => import("@/components/StatementOfClaimAgainstEstateForm"));
const WarrantyRepairRequestForm = lazy(() => import("@/components/WarrantyRepairRequestForm"));
const GuaranteeAgreementForm = lazy(() => import("@/components/GuaranteeAgreementForm"));
const PaymentAgreement = lazy(() => import("@/components/PaymentAgreement"));
const DEBTSETTLEMENTAGREEMENT= lazy(() => import("@/components/DEBTSETTLEMENTAGREEMENT"));
const PromissoryNoteForm = lazy(() => import("@/components/PromissoryNoteForm"));
const RequestCreditReferenceForm = lazy(() => import("@/components/RequestCreditReferenceForm"));
const ComplaintLetterToCompanyForm = lazy(() => import("@/components/ComplaintLetterToCompanyForm"));
const PromissoryNoteDueOnSpecificDateForm = lazy(() => import("@/components/PromissoryNoteDueOnSpecificDateForm"));


const MakeDocument = () => {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Family Protection documents
  const familyProtectionDocs = [
    {
      id: 'living-will',
      title: 'Living Will',
      description: 'Health Care & Estate Planning',
      content: 'Create a Living Will to specify your health care directives and agent appointments',
      icon: Heart,
      component: LivingWillForm
    },
    {
      id: 'child-care-auth',
      title: 'Child Care Authorization Agreement',
      description: 'Family Law',
      content: 'Create an authorization agreement for child care arrangements',
      icon: Users,
      component: ChildCareAuthForm
    },
    {
      id: 'affidavit-of-marriage',
      title: 'Affidavit of Marriage',
      description: 'Family Law & Name Change',
      content: 'Create an affidavit to verify a name change due to marriage, establishing the connection between former and current names',
      icon: UserCheck,
      component: AffidavitOfMarriageForm
    },
    { id: "change-of-beneficiary-form", 
      title: "Changing beneficiary", 
      description:"Information For changing beneficiary",
      content: "Create a comprehensive information for beneficiary changing", 
      icon: UserCheck, 
      component: ChangeOfBeneficiaryForm },

    {
      id: 'divorce-settlement-agreement',
      title: 'Divorce Settlement Agreement',
      description: 'Family Law & Divorce',
      content: 'Create a comprehensive divorce settlement agreement covering asset division, debts, spousal support, and terms for dissolution of marriage',
      icon: Gavel,
      component: DivorceSettlementAgreementForm
    },
    {
      id: 'general-power-of-attorney',
      title: 'General Power of Attorney',
      description: 'Legal Authority & Powers',
      content: 'Create a comprehensive general power of attorney for legal representation',
      icon: FileText,
      component: GeneralPowerOfAttorneyForm
    },
    {
      id: 'special-power-of-attorney',
      title: 'Special Power of Attorney',
      description: 'Legal Authority & Powers',
      content: 'Create a special power of attorney for specific legal matters and court proceedings',
      icon: Scale,
      component: SpecialPowerOfAttorneyForm
    },
    {
      id: 'gift-affidavit',
      title: 'Gift Affidavit',
      description: 'Financial Support',
      content: 'Create a sworn affidavit declaring that a transfer of money or property is a gift with no expectation of repayment',
      icon: DollarSign,
      component: GiftAffidavitForm
    },
    {
      id: 'financial-support-affidavit',
      title: 'Affidavit of Financial Support',
      description: 'Financial Support',
      content: 'Create a sworn statement of your financial condition and ability to provide financial support',
      icon: DollarSign,
      component: FinancialSupportAffidavitForm
    },

    {
      id: 'demand-for-delivery',
      title: 'Demand for Delivery',
      description: 'Business & Commercial',
      content: 'Create a comprehensive demand for delivery agreement',
      icon: FileSignature,
      component: DemandForDeliveryForm
    },

    { id: "due-on-demand-promissory-note",
      title: "Due On Demand Promissory Note",
      description:"Due on Demand Promissory Note",
      content: "Create a comprehensive due on demand promissory note contract", 
      icon: Calculator, 
      component: DueOnDemandPromissoryNoteForm
      },
      { id: "statement-of-claim-against-estate", 
       title: "Statement Of Claim Against Estate",
       description:"Statement Of Claim Against Estate",
        content: "Create a comprehensive statment against estate", 
        icon: FilePlus, 
         component: StatementOfClaimAgainstEstateForm },
 
         {
           id: 'balloon-payment-promissory-note',
           title: 'Balloon Payment Promissory Note',
           description: 'Financial & Lending',
           content: 'Create a promissory note with installment payments and a final balloon payment',
           icon: DollarSign,
           component: BalloonPaymentPromissoryNoteForm
         },
         { id: "complaint-letter-info",
          title: "Complaint to BBB/Attorney General", 
          description:"Complaint to Attorney General",
          content: "Create a formal complaint letter to Attorney Gneral", 
          icon: FileText, 
          component: ComplaintLetterInfoForm 
         },
   
     {
            id: "direct-mail-request", 
           title: "Direct mail advertising request",
           description:"Direct Mail advertising request",
            content: "Create a comprehensive direct mail advirtisng request agreement", 
            icon: FileSignature, 
            component: DirectMailAdvertisingForm },
   
            { id: "secured-promissory-note",
              title: "Secured Promissory note", 
              description:"Secure Promisssory note",
              content: "Create a comprehensive agreement for secured promissory",
               icon: Calculator, 
               component: SecuredPromissoryNoteForm
              },
   
              { id: "installment-promissory-note", 
               title: "installment Promissory note", 
               description:"installment Promissory note",
               content: "Create a comprehensive agreement for installment promissory note", 
               icon: Calculator, 
               component: InstallmentPromissoryNoteForm },
   
               { id: "iou", 
                 title: "IOU", 
                 description:"Acknowledment of debt",
                 content: "Create a comprehensive iou agreement acknowledment of debt", 
                 icon: Calculator,
                 component: IOUForm 
               },
   
        { id: "note-payable",
          title: "Note Pyabale", 
          description:"Note Payable",
          content: "Create a comprehensive agreement for note payable", 
          icon: Calculator,
          component: NotePayableForm 
         },
   
     { id: "lottery-pool-contract", 
       title: "Lottery Pool Contract", 
       description:"Lottery Pool Contract",
       content: "Create a comprehensiveLottery Pool Contract agreement", 
       icon: FileSignature,
       component: LotteryPoolContractForm
     },
     { id: "request-bankcredit-reference", 
       title: "Request Bank Credit Reference", 
       description:"Request Bank credit",
       content: "Create a comprehensive reference to request bank credit", 
       icon: Calculator, 
        component: BankCreditReferenceForm 
       },
   
         { id: "debt-collection-worksheet",
            title: "Debt collection", 
            description:"Debt collection",
            content: "Create a comprehensive debt collection worksheet",
             icon: Calculator, 
             component: DebtCollectionWorksheetForm
          },
          {
            id: 'cellphone-inquiry-letter',
            title: 'Cell Phone Inquiry Letter',
            description: 'Cellular Service',
            content: 'Create a formal letter to inquire about or dispute cellular service charges',
            icon: FileText,
            component: CellPhoneInquiryLetterForm
          },
      
          {id : "membership-cancellation-letter  ",
             title:"Membership Cancellation Request",
             description:"Membership cancellation",
             content:"Create a formal request to cancel membership", 
             icon: FileText, 
              component: MembershipCancellationLetterForm},
      
      
          {
            id : "complaint-demand-refund", 
            title:"Complaint for refund",
            description:"Complaint for refund",
            content:"Create a formal complaint for refund", 
            icon: FileText, 
             component: FormalComplaintRefundForm
            },
      
          { id: "subordinated-loan-agreement", 
            title: "Subordinated Loan Agreement", 
            description:"Subordinated Loan Agreement",
            content: "Create a comprehensive subordinated loan agreement", 
            icon: Calculator, 
            component: SubordinatedLoanAgreementForm },
      
         { id: "demand-for-money-owed",
           title: "Demand for Owed Money",
           description:"Demand for Owed Money",
            content: "Create a comprehensive agreement to Demand for Owed Money", 
            icon: Calculator, 
            component: DemandForMoneyOwedForm },
      
         {id : "request-remove-personal-information", 
          title:"Request Remove Personal Information ",
          description:"Request Remove personal info",
          content:"Create a formal request to remove personal information",
           icon: FileText, 
           component: RemovePersonalInfoRequestForm
          },
      
          {id : "security-agreement-info",
             title:"Security agreement Information",
             description:"Security agreement info",
             content:"Create a formal agreement of security information",
              icon: FileText,
              component: SecurityAgreementInfoForm
            },
      
         {id : "remove-from-marketing-list", 
          title:"Remove from Marketing List  ",
          description:"Remove from Marketing List ",
          content:"Create a formal agreement to remove information from marketing list",
           icon: FileText, 
           component: RemoveFromMarketingListForm},
      
           {id : "warranty-repair-request", 
            title:"Warranty Repair Request",
            description:"Warranty Repair Request",
            content:"Create a formal agreement for Warranty Repair Request", 
            icon: FileText, 
            component: WarrantyRepairRequestForm},
      
          {
            id : "reservation-confirmation", 
            title:"Reservations confirmation Letter",
            description:"Reservation Confirmation",
            content:"Create a formal letter for confirming reservations",
             icon: FileText, 
              component: ReservationConfirmationForm
            },

    { id: "GuaranteeAgreementForm", 
      title: "Guarantee Agreement", 
      description:"Create a comprehensive guarantee agreement",
      content: "Create a comprehensive guarantee agreement", 
      icon: ShieldCheck, 
       component: GuaranteeAgreementForm },

    { id: "payment-agreement", 
      title: "Payment Agreement",
      description:"Create a comprehensive payment agreement",
       content: "Create a comprehensive payment agreement",
        icon: Briefcase, 
        component: PaymentAgreement },

        { id: "DEBTSETTLEMENTAGREEMENT",
           title: "Debt Settlement Agreement",
           description:"Create a comprehensive personal or business debt settlement agreement",
           content: "Create a comprehensive debt settlement agreement",
            icon: Briefcase, 
          component: DEBTSETTLEMENTAGREEMENT },

        {
          id: 'loan-agreement',
          title: 'Loan Agreement',
          description: 'Financial & Lending',
          content: 'Create a comprehensive loan agreement for personal or business lending arrangements',
          icon: DollarSign,
          component: LoanAgreementForm
        },

        { id: "promissory-note", 
          title: "Promissory Note Agreement", 
          description: "Create a comprehensive promissory note agreement", 
          content: "Create a comprehensive promissory note agreement", 
          icon: Briefcase,
          component: PromissoryNoteForm},

{ id: "request-credit-reference",
   title: "Request Credit Reference",
    description: "Create a comprehensive request agreement for credit reference", 
    content: "Create a comprehensive request agreement for credit reference", 
    icon: Briefcase,
     component: RequestCreditReferenceForm},

 { id: "complaint-letter-to-company",
   title: "Complaint Letter To Company", 
   description: "Create a comprehensive  Letter to Complaint about Company",
   content: "Create a comprehensive  Letter to Complaint about Company",
   icon: Briefcase, 
    component: ComplaintLetterToCompanyForm},

 { id: "promissory-note-due-on-specific-date", 
  title: "Promissory Note Due on Specific date", 
  description: "Create a comprehensive  agreement for Promissory Note Due on Specific date", 
  content: "Create a comprehensive  agreement for Promissory Note Due on Specific date", 
  icon: Briefcase,
  component: PromissoryNoteDueOnSpecificDateForm},
 


  ];

  // Business Security documents  
  const businessSecurityDocs = [
    {
      id: 'business-agreement',
      title: 'Business Agreement',
      description: 'Business Partnership',
      content: 'Create a comprehensive business agreement between two parties for joint ventures and partnerships',
      icon: Briefcase,
      component: BusinessAgreementForm
    },
    {
      id: 'services-contract',
      title: 'Services Contract',
      description: 'Service Arrangements',
      content: 'Create a comprehensive services contract for professional service arrangements and staff augmentation',
      icon: Briefcase,
      component: ServicesContractForm
    },
    {
      id: 'independent-contractor',
      title: 'Independent Contractor Agreement',
      description: 'Employment & Contractor',
      content: 'Create a comprehensive independent contractor agreement defining work relationship',
      icon: Briefcase,
      component: IndependentContractorForm
    },
    {
      id: 'nda',
      title: 'Non-Disclosure Agreement',
      description: 'Confidentiality & Privacy',
      content: 'Create a legally binding confidentiality agreement to protect sensitive information',
      icon: Shield,
      component: NDAForm
    },
    {
      id: 'mutual-nda',
      title: 'Mutual Non-Disclosure Agreement',
      description: 'Bilateral Confidentiality',
      content: 'Create a bilateral confidentiality agreement where both parties protect each other\'s sensitive information',
      icon: Handshake,
      component: MutualNDAForm
    },
    {
      id: 'llc-operating-agreement',
      title: 'LLC Operating Agreement',
      description: 'Corporate Formation',
      content: 'Create a comprehensive Limited Liability Company Operating Agreement with member management and governance provisions',
      icon: Building2,
      component: LLCOperatingAgreementForm
    },
    {
      id: 'sale-agreement',
      title: 'Sale Agreement',
      description: 'Business & Commercial',
      content: 'Create a comprehensive sale agreement for business transactions',
      icon: Briefcase,
      component: SaleAgreementForm
    },
    {
      id: 'general-contract',
      title: 'General Contract for Products',
      description: 'Business & Commercial',
      content: 'Create a comprehensive contract for the sale and purchase of products',
      icon: ShoppingCart,
      component: GeneralContractForm
    },
   
   
    {
      id: 'share-purchase-agreement',
      title: 'Share Purchase Agreement',
      description: 'Corporate & Investment',
      content: 'Create a comprehensive share purchase agreement for transferring company shares',
      icon: Building2,
      component: SharePurchaseAgreementForm
    },
    {
      id: 'loan-agreement',
      title: 'Loan Agreement',
      description: 'Financial & Lending',
      content: 'Create a comprehensive loan agreement for personal or business lending arrangements',
      icon: DollarSign,
      component: LoanAgreementForm
    },
  
    {
      id: 'copyright-assignment',
      title: 'Copyright Assignment',
      description: 'Intellectual Property',
      content: 'Create a comprehensive copyright assignment agreement to transfer intellectual property rights',
      icon: FileText,
      component: CopyrightAssignmentForm
    },
    {
      id: 'copyright-license',
      title: 'Copyright License Agreement',
      description: 'Intellectual Property',
      content: 'Grant or obtain rights to use copyrighted material while maintaining ownership',
      icon: Shield,
      component: CopyrightLicenseForm
    },
    {
      id: 'domestic-service-agreement',
      title: 'Domestic Service Agreement',
      description: 'Employment & Labor',
      content: 'Create a domestic service agreement for household employment arrangements',
      icon: Home,
      component: DomesticServiceAgreementForm
    },

   
    {
      id: 'corporate-bylaws',
      title: 'Corporate Bylaws',
      description: 'Corporate Governance',
      content: 'Create comprehensive corporate bylaws to establish governance structure and operational procedures',
      icon: Scale,
      component: CorporateBylawsForm
    },
    {
      id: 'buy-sell-agreement',
      title: 'Buy-Sell Agreement',
      description: 'Business Agreements',
      content: 'Create a comprehensive buy-sell agreement to manage ownership transfers and protect business interests',
      icon: TrendingUp,
      component: BuySellAgreementForm
    },
    {
      id: 'business-plan',
      title: 'Business Plan',
      description: 'Business Development',
      content: 'Create a comprehensive business plan for launching and growing your venture',
      icon: Briefcase,
      component: BusinessPlanForm
    },
    {
      id: 'confidential-information',
      title: 'Confidential Information Agreement',
      description: 'Information Protection',
      content: 'Protect sensitive business information with legally binding confidentiality terms',
      icon: Shield,
      component: ConfidentialInformationForm
    },
    {
      id: 'non-circumvention',
      title: 'Non-Circumvention Agreement',
      description: 'Relationship Protection',
      content: 'Protect your business relationships and prevent contact circumvention',
      icon: Handshake,
      component: NonCircumventionForm
    },
    {
      id: 'copyright-permission',
      title: 'Copyright Permission Request',
      description: 'Copyright Compliance',
      content: 'Formally request permission to use copyrighted material in your projects',
      icon: FileText,
      component: CopyrightPermissionForm
    },
    {
      id: 'patent-assignment',
      title: 'Patent Assignment Agreement',
      description: 'Patent Transfer',
      content: 'Create a comprehensive patent assignment agreement to transfer patent rights and ownership',
      icon: Shield,
      component: PatentAssignmentForm
    },
  

    {
      id: 'royalty-agreement',
      title: 'Royalty Agreement',
      description: 'IP Royalties',
      content: 'Create a professional royalty agreement for intellectual property licensing and compensation',
      icon: TrendingUp,
      component: RoyaltyAgreementForm
    },
    {
      id: 'license-agreement',
      title: 'License Agreement',
      description: 'IP Licensing',
      content: 'Create a comprehensive license agreement for intellectual property rights and royalty management',
      icon: Scale,
      component: LicenseAgreementForm
    },
    {
      id: 'manufacturing-license',
      title: 'Manufacturing License Agreement',
      description: 'Manufacturing Rights',
      content: 'Create a manufacturing license agreement with quality control and legal protection',
      icon: Factory,
      component: ManufacturingLicenseForm
    },
    {
      id: 'music-license',
      title: 'Music License Agreement',
      description: 'Music Licensing',
      content: 'Create a music licensing agreement for copyright protection and royalty management',
      icon: FileText,
      component: MusicLicenseForm
    },
    {
      id: 'office-space-lease',
      title: 'Office Space Lease Agreement',
      description: 'Commercial Real Estate',
      content: 'Create a comprehensive lease agreement for renting office space in a commercial building',
      icon: Building2,
      component: OfficeSpaceLeaseForm
    }

  ];

  // Property Matters documents
  const propertyMattersDocs = [
    {
      id: 'lease-agreement',
      title: 'Residential Lease Agreement',
      description: 'Real Estate',
      content: 'Create a customized Lease Agreement for residential rental properties',
      icon: FileText,
      component: ConditionalForm
    },
    {
      id: 'condominium-lease',
      title: 'Condominium Lease Agreement',
      description: 'Real Estate & Condos',
      content: 'Create a comprehensive lease agreement specifically for condominium units',
      icon: Building2,
      component: CondominiumLeaseForm
    },
    {
      id: 'lease-renewal',
      title: 'Lease Renewal Agreement',
      description: 'Landlord & Tenant',
      content: 'Create a comprehensive lease renewal agreement to extend existing rental terms',
      icon: FileText,
      component: LeaseRenewalForm
    },
    {
      id: 'lease-termination',
      title: 'Agreement to Terminate Lease',
      description: 'Landlord & Tenant',
      content: 'Create a mutual agreement to terminate a lease before its expiration date',
      icon: FileText,
      component: LeaseTerminationForm
    },
    {
      id: 'rent-increase',
      title: 'Rent Increase Agreement',
      description: 'Landlord & Tenant',
      content: 'Create a formal agreement to increase rent between landlord and tenant',
      icon: DollarSign,
      component: RentIncreaseForm
    },
    {
      id: 'sublease',
      title: 'Sublease Agreement',
      description: 'Landlord & Tenant',
      content: 'Create a comprehensive sublease agreement with property inspection checklist',
      icon: Building2,
      component: SubleaseForm
    },
    {
      id: 'lease-amendment',
      title: 'Lease Amendment',
      description: 'Landlord & Tenant',
      content: 'Create a formal amendment to modify existing lease terms and conditions',
      icon: FileText,
      component: LeaseAmendmentForm
    },
    {
      id: 'commercial-lease',
      title: 'Commercial Lease Agreement',
      description: 'Business & Commercial',
      content: 'Create a comprehensive commercial lease agreement for business properties',
      icon: Building2,
      component: CommercialLeaseForm
    },
    {
      id: 'billboard-lease',
      title: 'Billboard Lease Agreement',
      description: 'Property & Advertising',
      content: 'Create a comprehensive lease agreement for billboard advertising space on private property',
      icon: Building2,
      component: BillboardLeaseForm
    },
    {
      id: 'agreement-to-sell',
      title: 'Agreement to Sell',
      description: 'Real Estate & Property',
      content: 'Create a comprehensive agreement to sell for property transactions',
      icon: FileText,
      component: AgreementToSellForm
    },
    {
      id: 'eviction-notice',
      title: 'Eviction Notice',
      description: 'Landlord & Tenant',
      content: 'Create a formal notice to terminate a tenancy and initiate eviction proceedings',
      icon: FileText,
      component: EvictionNoticeForm
    },
    {
      id: 'affidavit-of-residence',
      title: 'Affidavit of Residence',
      description: 'Residency Verification',
      content: 'Create an affidavit to verify residence for living or deceased persons, establishing legal domicile and residence history',
      icon: MapPin,
      component: AffidavitOfResidenceForm
    },
    {
      id: 'transcript-request',
      title: 'Transcript Request',
      description: 'Educational Documents',
      content: 'Create a formal request for academic transcripts and degree documents from educational institutions',
      icon: GraduationCap,
      component: TranscriptRequestForm
    },
    {
      id: 'storage-space-lease',
      title: 'Storage Space Lease Agreement',
      description: 'Storage Rental',
      content: 'Create a comprehensive month-to-month lease agreement for personal storage space',
      icon: Building2,
      component: StorageSpaceLeaseForm
    },
    {
      id: 'restaurant-lease',
      title: 'Restaurant Lease Agreement',
      description: 'Food Service',
      content: 'Create a comprehensive lease agreement for restaurant and food service operations',
      icon: UtensilsCrossed,
      component: RestaurantLeaseForm
    },
    {
      id: 'warehouse-lease',
      title: 'Warehouse Lease Agreement',
      description: 'Industrial Real Estate',
      content: 'Create a comprehensive lease agreement for warehouse, storage, and distribution facilities',
      icon: Building2,
      component: WarehouseLeaseForm
    },
    {
      id: 'oil-lease',
      title: 'Oil Lease Agreement',
      description: 'Mineral Rights',
      content: 'Create a comprehensive oil and gas lease agreement for mineral rights and hydrocarbon extraction',
      icon: Fuel,
      component: OilLeaseForm
    },
    {
      id: 'gas-lease',
      title: 'Gas Lease Agreement',
      description: 'Gas & Energy Rights',
      content: 'Create a comprehensive gas lease agreement for natural gas exploration and energy development',
      icon: Fuel,
      component: GasLeaseForm
    },
    {
      id: 'security-deposit-return',
      title: 'Security Deposit Return Letter',
      description: 'Tenant Relations',
      content: 'Create a professional letter for returning security deposits with deduction details',
      icon: FileText,
      component: SecurityDepositReturnLetter
    },
    {
      id: 'lease-termination-letter',
      title: 'Lease Termination Letter',
      description: 'Tenant Notice',
      content: 'Create a professional letter to notify tenants of lease termination',
      icon: FileText,
      component: LeaseTerminationLetter
    },
    {
      id: 'late-rent-payment-agreement',
      title: 'Late Rent Payment Agreement',
      description: 'Payment Plans',
      content: 'Create a professional agreement for tenants with past due rent to establish payment plans',
      icon: DollarSign,
      component: LateRentPaymentAgreement
    },
    {
      id: 'non-disturbance-agreement',
      title: 'Non-Disturbance Agreement',
      description: 'Tenant Protection',
      content: 'Create a professional non-disturbance agreement between mortgagee and tenant',
      icon: Shield,
      component: NonDisturbanceAgreement
    },
    

  ];

  // Combine all documents for direct access
  const allDocumentTypes = [...familyProtectionDocs, ...businessSecurityDocs, ...propertyMattersDocs];

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
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

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

  // Render specific document form
  if (selectedDocument && selectedDocumentType) {
    const DocumentComponent = selectedDocumentType.component;
    return (
      <div>
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToDocuments}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Document Selection
          </Button>
          <h1 className="text-3xl font-bold mb-2">{selectedDocumentType.title}</h1>
          <p className="text-muted-foreground">
            {selectedDocumentType.description}
          </p>
        </div>
        <Suspense fallback={
          <div className="flex h-64 w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        }>
          <DocumentComponent />
        </Suspense>
      </div>
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
      <div>
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToCategories}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          <h1 className="text-3xl font-bold mb-2">{categoryTitles[selectedCategory as keyof typeof categoryTitles]}</h1>
          <p className="text-muted-foreground mb-4">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((docType) => {
              const IconComponent = docType.icon;
              return (
                <Card key={docType.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-primary" />
                      {docType.title}
                    </CardTitle>
                    <CardDescription>{docType.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    {docType.content}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedDocument(docType.id)}
                    >
                      Select Template
                    </Button>
                  </CardFooter>
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
    );
  }

  // Render category selection (main page)
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Make Documents</h1>
        <p className="text-muted-foreground">
          Create legal documents from our professionally-drafted templates.
        </p>
      </div>
      
      <LegalConcernsSection onCategorySelect={handleCategorySelect} />
    </div>
  );
};

export default MakeDocument;
