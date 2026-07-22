/**
 * =========================================================
 * LEGALGRAM 2.0 - ChatWidget ("Gram AI")
 * Full-page overlay, slide-in animation.
 * LOCAL DOC KB: matches queries against a document knowledge
 * base first; if no match → offers custom doc creation.
 * =========================================================
 */

import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import {
  X, Send, Scale, Loader2, Sparkles, User,
  ExternalLink, ChevronDown, Paperclip, FileText,
  FileDown, Search, BookOpen, MessageSquare,
  BarChart2, GitCompare, ArrowUp, SlidersHorizontal, Zap,
  ArrowLeft, CheckCircle,
} from "lucide-react";
import LegalgramAPI, { ActionButton, ChatResponse } from "@/services/backendService";
import { generateDocumentWithAI } from "@/services/documentAI";

/* ─────────────────────────────────────────────
   DOCUMENT KNOWLEDGE BASE
   Each entry: name, keywords (for matching),
   description, key clauses, url (deep-link).
───────────────────────────────────────────── */
interface DocEntry {
  id: string;
  name: string;
  keywords: string[];
  description: string;
  clauses: string[];
  url: string;
}

const DOCUMENT_KB: DocEntry[] = [

  // ─── BUSINESS & CORPORATE ───────────────────────────────────────
  {
    id: "partnership-agreement",
    name: "Partnership Agreement",
    keywords: ["partnership","partner","joint venture","co-owner","business partner","partnership contract","partnership deed","general partnership","limited partnership","llp"],
    description: "A legal contract between two or more individuals who agree to run a business together and share profits, losses, and responsibilities.",
    clauses: ["Names and addresses of all partners","Nature and purpose of the business","Capital contributions by each partner","Profit and loss sharing ratio","Roles, duties, and decision-making authority","Admission and withdrawal of partners","Dispute resolution mechanism","Duration and dissolution terms","Non-compete and confidentiality obligations","Governing law"],
    url: "/documents/partnership-agreement",
  },
  {
    id: "shareholders-agreement",
    name: "Shareholders Agreement",
    keywords: ["shareholder","shareholders agreement","equity","share","stock","investor","founder","startup","company","board","dividend","stockholder","share capital"],
    description: "An agreement among shareholders of a company governing their rights, obligations, share transfers, and management of the company.",
    clauses: ["Share ownership and classes","Board composition and voting rights","Dividend policy","Pre-emption rights on new shares","Drag-along and tag-along rights","Right of first refusal on transfers","Anti-dilution provisions","Confidentiality and non-compete","Deadlock resolution","Governing law"],
    url: "/documents/shareholders-agreement",
  },
  {
    id: "operating-agreement",
    name: "LLC Operating Agreement",
    keywords: ["llc","operating agreement","limited liability company","member","managing member","single member llc","multi member llc"],
    description: "A document that outlines the ownership and operating procedures of an LLC, including member roles and profit distribution.",
    clauses: ["Member names and ownership percentages","Management structure (member or manager-managed)","Capital contributions","Profit and loss allocation","Voting rights and decision-making","Transfer of membership interests","Dissolution and winding up","Indemnification of members","Tax treatment elections","Governing law"],
    url: "/documents/llc-operating-agreement",
  },
  {
    id: "incorporation-articles",
    name: "Articles of Incorporation",
    keywords: ["articles of incorporation","incorporate","incorporation","company formation","certificate of incorporation","memorandum of association","register company"],
    description: "The foundational document filed with the state to legally form a corporation, establishing its basic structure and purpose.",
    clauses: ["Corporate name","Registered agent and address","Purpose of corporation","Authorized shares and classes","Incorporator information","Initial directors (if named)","Liability limitations","Governing law"],
    url: "/documents/articles-of-incorporation",
  },
  {
    id: "bylaws",
    name: "Corporate Bylaws",
    keywords: ["bylaws","by-laws","corporate bylaws","board of directors","corporate governance","shareholders meeting","annual meeting"],
    description: "Internal rules governing how a corporation is managed, including board meetings, officer roles, and shareholder rights.",
    clauses: ["Board of directors structure","Officer roles and duties","Shareholder meeting procedures","Voting requirements","Amendment procedures","Indemnification policy","Conflict of interest policy","Fiscal year and records"],
    url: "/documents/corporate-bylaws",
  },
  {
    id: "joint-venture-agreement",
    name: "Joint Venture Agreement",
    keywords: ["joint venture","jv","collaboration","co-venture","strategic alliance","business collaboration","joint project"],
    description: "A contract between two or more parties who agree to combine resources for a specific project or business activity while remaining independent.",
    clauses: ["Purpose and scope of joint venture","Capital contributions","Profit and loss sharing","Management and decision-making","Intellectual property ownership","Confidentiality","Term and termination","Exit and dissolution","Governing law"],
    url: "/documents/joint-venture-agreement",
  },
  {
    id: "business-purchase-agreement",
    name: "Business Purchase Agreement",
    keywords: ["buy business","purchase business","sell business","business acquisition","asset purchase","stock purchase","merger","acquisition","business sale","buy company"],
    description: "A contract for the sale and purchase of a business, covering assets, liabilities, price, and transition terms.",
    clauses: ["Purchase price and payment structure","Assets and liabilities included","Representations and warranties","Due diligence period","Closing conditions","Non-compete covenant","Transition assistance","Indemnification","Governing law"],
    url: "/documents/business-purchase-agreement",
  },
  {
    id: "franchise-agreement",
    name: "Franchise Agreement",
    keywords: ["franchise","franchisee","franchisor","franchise contract","franchise license","franchise business"],
    description: "A contract granting a franchisee the right to operate a business under the franchisor's brand and business model.",
    clauses: ["Grant of franchise rights","Territory","Fees and royalties","Training and support","Brand standards compliance","Term and renewal","Termination rights","Post-termination obligations","Intellectual property license","Governing law"],
    url: "/documents/franchise-agreement",
  },
  {
    id: "distribution-agreement",
    name: "Distribution Agreement",
    keywords: ["distribution","distributor","distribution agreement","reseller","dealer","channel partner","wholesale","supply chain"],
    description: "A contract between a supplier and distributor defining the terms for distributing products in a specific territory.",
    clauses: ["Products covered","Territory and exclusivity","Minimum purchase requirements","Pricing and payment","Marketing obligations","Intellectual property license","Term and termination","Return and warranty policy","Governing law"],
    url: "/documents/distribution-agreement",
  },
  {
    id: "agency-agreement",
    name: "Agency Agreement",
    keywords: ["agency","agent","commercial agent","agency contract","sales agent","principal agent","authority to act","authorized agent"],
    description: "A contract appointing an agent to act on behalf of a principal in business transactions.",
    clauses: ["Scope of authority","Territory","Commission structure","Agent's obligations","Principal's obligations","Sub-agency rights","Exclusivity","Term and termination","Post-termination commission","Governing law"],
    url: "/documents/agency-agreement",
  },

  // ─── EMPLOYMENT & HR ────────────────────────────────────────────
  {
    id: "employment-contract",
    name: "Employment Contract",
    keywords: ["employment","employee","employer","job","hire","hiring","work contract","staff","labour","labor","job offer","offer letter","employment agreement","work agreement"],
    description: "An agreement between an employer and employee setting out terms of employment including salary, duties, working hours, and termination.",
    clauses: ["Job title and description","Start date and probation period","Salary and benefits","Working hours and location","Leave entitlements","Intellectual property assignment","Non-compete and non-solicitation","Termination and notice period","Governing law"],
    url: "/documents/employment-contract",
  },
  {
    id: "freelance-contract",
    name: "Freelance / Independent Contractor Agreement",
    keywords: ["freelance","freelancer","gig","independent contractor","remote work","project contract","contract worker","consultant agreement","consulting contract","contractor agreement"],
    description: "A contract between a freelancer and a client defining project scope, payment, deadlines, and IP ownership.",
    clauses: ["Project description and deliverables","Payment rate and schedule","Revision and approval process","Intellectual property ownership","Confidentiality","Independent contractor status","Termination clause","Governing law"],
    url: "/documents/freelance-contract",
  },
  {
    id: "nda",
    name: "Non-Disclosure Agreement (NDA)",
    keywords: ["nda","non disclosure","confidentiality","confidential","trade secret","proprietary information","non-disclosure","confidentiality agreement","secrecy agreement","mutual nda","unilateral nda"],
    description: "A contract obliging one or more parties to keep certain information confidential and not disclose it to third parties.",
    clauses: ["Definition of confidential information","Obligations of the receiving party","Permitted disclosures and exclusions","Duration of confidentiality","Return or destruction of information","Remedies for breach","Governing law and jurisdiction"],
    url: "/documents/nda",
  },
  {
    id: "non-compete-agreement",
    name: "Non-Compete Agreement",
    keywords: ["non compete","non-compete","noncompete","competition restriction","restraint of trade","non solicitation","non-solicitation","poaching","competitor restriction"],
    description: "An agreement restricting an employee or contractor from working for competitors or starting a competing business for a specified time period.",
    clauses: ["Restricted activities","Geographic scope","Duration of restriction","Consideration for signing","Carve-outs and exceptions","Remedies for breach","Severability","Governing law"],
    url: "/documents/non-compete-agreement",
  },
  {
    id: "offer-letter",
    name: "Job Offer Letter",
    keywords: ["offer letter","job offer","letter of appointment","appointment letter","hire letter","employment offer"],
    description: "A formal letter from an employer to a candidate offering them a position, outlining basic terms before a full employment contract.",
    clauses: ["Position title","Start date","Compensation and benefits","At-will or fixed-term statement","Contingencies (background check, references)","Offer expiry date","Reporting structure"],
    url: "/documents/offer-letter",
  },
  {
    id: "termination-letter",
    name: "Termination Letter",
    keywords: ["termination","termination letter","dismiss","dismissal","fire","fired","layoff","end contract","contract termination","separation letter","redundancy","retrenchment"],
    description: "A formal letter ending an employment relationship or contract.",
    clauses: ["Effective date of termination","Reason for termination","Final pay and benefits","Return of company property","Post-termination obligations","Reference information","Severance terms"],
    url: "/documents/termination-letter",
  },
  {
    id: "resignation-letter",
    name: "Resignation Letter",
    keywords: ["resignation","resign","quit","leave job","notice of resignation","two weeks notice","notice period","leaving job"],
    description: "A formal letter from an employee notifying their employer of their intention to leave the position.",
    clauses: ["Effective date of resignation","Notice period","Offer to assist with transition","Expression of gratitude (optional)","Final settlement terms"],
    url: "/documents/resignation-letter",
  },
  {
    id: "hr-policy",
    name: "HR Policy Manual",
    keywords: ["hr policy","human resources","employee handbook","workplace policy","staff handbook","code of conduct","hr manual","employee manual","workplace rules"],
    description: "A comprehensive document outlining company policies, employee rights and responsibilities, and workplace standards.",
    clauses: ["Equal opportunity and anti-discrimination","Leave policies (annual, sick, maternity/paternity)","Working hours and overtime","Code of conduct","Disciplinary procedure","Grievance procedure","Health and safety","Social media and IT policy","Confidentiality"],
    url: "/documents/hr-policy",
  },
  {
    id: "severance-agreement",
    name: "Severance Agreement",
    keywords: ["severance","severance pay","severance package","separation agreement","exit agreement","mutual separation","golden handshake"],
    description: "An agreement between an employer and departing employee outlining severance pay and mutual obligations upon separation.",
    clauses: ["Severance amount and schedule","Release of claims","Non-disparagement","Return of company property","Continuation of benefits","Confidentiality","Non-compete confirmation","Governing law"],
    url: "/documents/severance-agreement",
  },
  {
    id: "remote-work-agreement",
    name: "Remote Work Agreement",
    keywords: ["remote work","work from home","wfh","telecommute","telecommuting","remote employee","home office","hybrid work"],
    description: "An agreement establishing terms and conditions for an employee working remotely.",
    clauses: ["Approved work location","Working hours and availability","Equipment and expenses","Data security requirements","Performance expectations","Communication protocols","Health and safety at home","Right to visit home office"],
    url: "/documents/remote-work-agreement",
  },
  {
    id: "internship-agreement",
    name: "Internship Agreement",
    keywords: ["internship","intern","trainee","work placement","industrial training","apprentice","apprenticeship","summer intern"],
    description: "A contract defining the terms of an internship or work placement including duties, duration, and compensation.",
    clauses: ["Duration and schedule","Role and responsibilities","Compensation or stipend","Confidentiality","IP assignment","Supervision structure","Termination","Conversion to employment (optional)"],
    url: "/documents/internship-agreement",
  },

  // ─── SERVICES & CONSULTING ──────────────────────────────────────
  {
    id: "service-agreement",
    name: "Service Agreement",
    keywords: ["service","service agreement","service contract","professional services","scope of work","statement of work","sow","managed services","outsourcing"],
    description: "A contract between a service provider and a client defining the scope of work, deliverables, timelines, and payment terms.",
    clauses: ["Scope of services and deliverables","Timeline and milestones","Payment terms and invoicing","Intellectual property ownership","Confidentiality obligations","Warranties and representations","Limitation of liability","Termination for convenience or breach","Governing law"],
    url: "/documents/service-agreement",
  },
  {
    id: "consulting-agreement",
    name: "Consulting Agreement",
    keywords: ["consulting","consultant","advisory","advisor","advisory services","management consulting","business consultant","technical consultant"],
    description: "A contract between a consultant and client setting out the scope of advisory services, fees, and ownership of work product.",
    clauses: ["Consulting scope and deliverables","Fees and payment schedule","Expenses","Confidentiality","IP and work product ownership","Non-solicitation","Independent contractor status","Termination","Governing law"],
    url: "/documents/consulting-agreement",
  },
  {
    id: "it-services-agreement",
    name: "IT Services Agreement",
    keywords: ["it services","technology services","software development","tech contract","software contract","development agreement","it support","managed it","system integration","saas agreement"],
    description: "A contract for the provision of IT or technology services including development, support, maintenance, and SLAs.",
    clauses: ["Services description and deliverables","Service level agreement (SLA)","Uptime and availability","Payment terms","Data security and privacy","IP ownership","Acceptance testing","Maintenance and support","Limitation of liability","Governing law"],
    url: "/documents/it-services-agreement",
  },
  {
    id: "software-development-agreement",
    name: "Software Development Agreement",
    keywords: ["software development","custom software","app development","mobile app","web development","website development","coding contract","developer agreement","tech development"],
    description: "A contract for custom software or application development, covering specifications, delivery, IP, and payment.",
    clauses: ["Project specifications","Milestones and delivery schedule","Payment and pricing","Source code ownership","IP assignment","Change request process","Testing and acceptance","Warranties","Post-delivery support","Governing law"],
    url: "/documents/software-development-agreement",
  },
  {
    id: "marketing-services-agreement",
    name: "Marketing Services Agreement",
    keywords: ["marketing","advertising","digital marketing","branding","seo","social media","pr","public relations","marketing agency","campaign","media buying"],
    description: "A contract between a marketing agency or freelancer and a client defining campaign deliverables, timelines, and fees.",
    clauses: ["Scope of marketing services","Campaign objectives and KPIs","Budget and payment","Ownership of creative assets","Ad spend authority","Reporting requirements","Confidentiality","Termination","Governing law"],
    url: "/documents/marketing-services-agreement",
  },
  {
    id: "graphic-design-contract",
    name: "Graphic Design Contract",
    keywords: ["graphic design","designer","design contract","logo design","branding design","creative services","illustrator","visual design","artwork contract"],
    description: "A contract between a graphic designer and client covering design deliverables, revisions, IP ownership, and payment.",
    clauses: ["Project description","Deliverables and formats","Number of revisions","Timeline","Payment schedule","IP ownership and license","Credit and portfolio rights","Termination","Kill fee"],
    url: "/documents/graphic-design-contract",
  },
  {
    id: "photography-contract",
    name: "Photography Contract",
    keywords: ["photography","photographer","photo contract","photo shoot","wedding photography","event photography","commercial photography","portrait","video contract"],
    description: "A contract between a photographer and client for photo/video services, usage rights, and delivery.",
    clauses: ["Event/session details","Package and pricing","Payment and deposit","Cancellation and rescheduling","Delivery timeline and format","Usage and licensing rights","Model release","Equipment and backup","Governing law"],
    url: "/documents/photography-contract",
  },
  {
    id: "catering-agreement",
    name: "Catering Agreement",
    keywords: ["catering","catering agreement","food service","caterer","event catering","wedding catering","corporate catering"],
    description: "A contract between a catering company and client for food service at an event.",
    clauses: ["Event details (date, venue, guest count)","Menu and dietary requirements","Pricing and deposit","Staffing","Setup and cleanup","Cancellation policy","Liability for food safety","Payment terms"],
    url: "/documents/catering-agreement",
  },

  // ─── REAL ESTATE & PROPERTY ─────────────────────────────────────
  {
    id: "lease-agreement",
    name: "Lease / Rental Agreement",
    keywords: ["lease","rental","rent","tenant","landlord","property","apartment","flat","house rent","office space","commercial lease","residential lease","tenancy","tenancy agreement","rental contract"],
    description: "A contract granting the tenant the right to use a property for a specified period in exchange for rent payments.",
    clauses: ["Description of the property","Lease term (start and end dates)","Monthly rent and due date","Security deposit amount and conditions","Permitted use of property","Maintenance and repair responsibilities","Subletting restrictions","Early termination conditions","Renewal options","Governing law"],
    url: "/documents/lease-agreement",
  },
  {
    id: "commercial-lease",
    name: "Commercial Lease Agreement",
    keywords: ["commercial lease","office lease","retail lease","shop lease","commercial property","commercial rent","commercial tenancy","shop rent","office rent"],
    description: "A lease agreement for commercial premises including offices, retail spaces, and warehouses.",
    clauses: ["Premises description and permitted use","Lease term and renewal options","Base rent and escalation","Service charges and outgoings","Fit-out works","Assignment and subletting","Break clause","Dilapidations","Governing law"],
    url: "/documents/commercial-lease",
  },
  {
    id: "property-sale-agreement",
    name: "Property Sale Agreement",
    keywords: ["property sale","real estate","house sale","sell house","buy house","property purchase","land sale","real estate contract","conveyancing","transfer of property"],
    description: "A contract for the sale and transfer of real property from seller to buyer, specifying price, conditions, and completion.",
    clauses: ["Property description","Purchase price","Deposit amount","Completion date","Fixtures and fittings included","Planning consents","Vacant possession","Title and searches","Default provisions","Governing law"],
    url: "/documents/property-sale-agreement",
  },
  {
    id: "mortgage-agreement",
    name: "Mortgage Agreement",
    keywords: ["mortgage","home loan","property loan","mortgage deed","charge over property","home finance","housing loan"],
    description: "A contract creating a security interest in real property in exchange for a loan.",
    clauses: ["Loan amount and interest rate","Repayment schedule","Property description","Borrower covenants","Lender rights on default","Insurance requirements","Early repayment terms","Governing law"],
    url: "/documents/mortgage-agreement",
  },
  {
    id: "sublease-agreement",
    name: "Sublease Agreement",
    keywords: ["sublease","sublet","subletting","sub-lease","sub-tenant","subleasing"],
    description: "An agreement allowing a tenant to lease all or part of their rented property to a third party.",
    clauses: ["Property description","Sublease term","Rent amount","Original lease compliance","Permitted use","Maintenance obligations","Termination rights","Consent of landlord"],
    url: "/documents/sublease-agreement",
  },
  {
    id: "property-management-agreement",
    name: "Property Management Agreement",
    keywords: ["property management","property manager","letting agent","real estate management","rental management","landlord agent"],
    description: "A contract appointing a property manager to manage a rental property on behalf of the owner.",
    clauses: ["Scope of management services","Fees and commission","Authority to sign leases","Rent collection","Maintenance authority and limits","Accounting and reporting","Insurance","Termination","Governing law"],
    url: "/documents/property-management-agreement",
  },
  {
    id: "construction-contract",
    name: "Construction Contract",
    keywords: ["construction","build","builder","contractor","civil works","building contract","construction agreement","project contract","works contract","renovation contract"],
    description: "A contract between an owner and contractor for construction or renovation of a building or structure.",
    clauses: ["Scope of work and specifications","Project timeline and milestones","Contract price and payment schedule","Variations and change orders","Materials and workmanship standards","Subcontracting","Insurance and bonds","Defects liability period","Dispute resolution","Governing law"],
    url: "/documents/construction-contract",
  },
  {
    id: "architect-agreement",
    name: "Architect Agreement",
    keywords: ["architect","architectural services","architect contract","design and build","structural design","architectural design","architect fee"],
    description: "A contract between an architect and client for architectural design, planning, and construction supervision services.",
    clauses: ["Scope of architectural services","Design phases","Fees and payment","Client's obligations","Change orders","IP and drawings ownership","Construction administration","Limitation of liability","Governing law"],
    url: "/documents/architect-agreement",
  },

  // ─── FINANCE & BANKING ──────────────────────────────────────────
  {
    id: "loan-agreement",
    name: "Loan Agreement",
    keywords: ["loan","borrow","lender","borrower","interest","repayment","debt","credit","promissory note","money lend","personal loan","business loan","intercompany loan"],
    description: "A contract between a lender and borrower specifying the loan amount, interest rate, repayment schedule, and consequences of default.",
    clauses: ["Loan amount and disbursement","Interest rate (fixed or variable)","Repayment schedule and method","Security or collateral (if any)","Late payment penalties","Prepayment rights","Events of default","Governing law and jurisdiction"],
    url: "/documents/loan-agreement",
  },
  {
    id: "promissory-note",
    name: "Promissory Note",
    keywords: ["promissory note","note","iou","promise to pay","debt instrument","negotiable instrument"],
    description: "A written promise by one party to pay a specific sum to another party at a specified future date.",
    clauses: ["Principal amount","Interest rate","Maturity/due date","Payment terms","Maker and payee identification","Default provisions","Governing law"],
    url: "/documents/promissory-note",
  },
  {
    id: "investment-agreement",
    name: "Investment Agreement",
    keywords: ["investment","investor","invest","funding","raise capital","seed funding","venture capital","angel investor","seed round","series a","term sheet","equity investment"],
    description: "A contract between a company and investor setting out the terms of an equity or debt investment.",
    clauses: ["Investment amount","Equity stake or instrument","Pre-money valuation","Use of funds","Investor rights (board seat, information)","Anti-dilution protection","Liquidation preference","Transfer restrictions","Representations and warranties","Governing law"],
    url: "/documents/investment-agreement",
  },
  {
    id: "guarantee-agreement",
    name: "Guarantee Agreement",
    keywords: ["guarantee","guarantor","surety","personal guarantee","bank guarantee","corporate guarantee","guarantee bond"],
    description: "A contract where a guarantor agrees to be responsible for the debt or obligation of another party if that party defaults.",
    clauses: ["Guaranteed obligation","Guarantor's liability scope","Demand and payment","Duration of guarantee","Release conditions","Indemnification","Governing law"],
    url: "/documents/guarantee-agreement",
  },
  {
    id: "invoice",
    name: "Invoice / Payment Demand",
    keywords: ["invoice","billing","bill","payment demand","tax invoice","vat invoice","commercial invoice","receipt"],
    description: "A commercial document issued by a seller to a buyer indicating products or services provided and the amount due.",
    clauses: ["Invoice number and date","Seller details","Buyer details","Description of goods/services","Amounts and tax","Payment due date","Bank details","Late payment notice"],
    url: "/documents/invoice",
  },

  // ─── INTELLECTUAL PROPERTY ──────────────────────────────────────
  {
    id: "ip-assignment",
    name: "IP Assignment Agreement",
    keywords: ["ip assignment","intellectual property assignment","transfer ip","assign copyright","assign patent","ip transfer","assign trademark","ip ownership transfer"],
    description: "A contract transferring ownership of intellectual property from one party to another.",
    clauses: ["Description of IP being assigned","Consideration","Representations about ownership","Warranties","Excluded rights","Further assurance obligations","Governing law"],
    url: "/documents/ip-assignment",
  },
  {
    id: "license-agreement",
    name: "License Agreement",
    keywords: ["license","licence","licensing","software license","ip license","technology license","patent license","copyright license","trademark license","royalty"],
    description: "A contract granting one party the right to use another's intellectual property under specified terms.",
    clauses: ["Scope of license (exclusive/non-exclusive)","Territory","Duration","Royalties and payment","Sub-licensing rights","Quality control","Audit rights","Termination","IP ownership remains with licensor","Governing law"],
    url: "/documents/license-agreement",
  },
  {
    id: "software-license",
    name: "Software License Agreement",
    keywords: ["software license","eula","end user license","software subscription","software saas","software use","app license","source code license"],
    description: "A contract granting users the right to use software under defined conditions.",
    clauses: ["License grant and scope","Permitted users","Prohibited uses","Updates and upgrades","Support and maintenance","Fees","Warranties disclaimer","Limitation of liability","Term and termination","Governing law"],
    url: "/documents/software-license",
  },
  {
    id: "trademark-assignment",
    name: "Trademark Assignment",
    keywords: ["trademark","trademark assignment","brand transfer","trade mark","brand assignment","trademark sale","logo transfer"],
    description: "A document transferring ownership of a registered or unregistered trademark from one party to another.",
    clauses: ["Trademark details (name, registration number)","Consideration","Goodwill transfer","Representations and warranties","Recordal with trademark office","Governing law"],
    url: "/documents/trademark-assignment",
  },
  {
    id: "copyright-assignment",
    name: "Copyright Assignment",
    keywords: ["copyright assignment","copyright transfer","assign copyright","creative works","assign artistic work","music rights","book rights","content ownership"],
    description: "A contract transferring copyright ownership in a creative work from creator to another party.",
    clauses: ["Description of work","Rights being assigned","Consideration","Moral rights waiver","Warranties of ownership","Governing law"],
    url: "/documents/copyright-assignment",
  },

  // ─── SALES, SUPPLY & PROCUREMENT ────────────────────────────────
  {
    id: "sale-agreement",
    name: "Sale of Goods Agreement",
    keywords: ["sale","purchase","buy","sell","buyer","seller","goods","supply of goods","product sale","sales contract","purchase agreement","bill of sale","trading agreement","procurement"],
    description: "A contract documenting the transfer of ownership of goods from a seller to a buyer for a specified price.",
    clauses: ["Description of goods","Purchase price and payment terms","Delivery date and method","Title and risk transfer","Warranties and representations","Inspection and acceptance","Default and remedies","Governing law"],
    url: "/documents/sale-agreement",
  },
  {
    id: "supply-agreement",
    name: "Supply Agreement",
    keywords: ["supply","supplier","vendor","supply agreement","supply chain","procurement","vendor contract","supplier contract","manufacturer","wholesale supply"],
    description: "A long-term contract between a buyer and supplier for the ongoing provision of goods or materials.",
    clauses: ["Products and specifications","Order process","Pricing and price review","Delivery terms (Incoterms)","Minimum order quantity","Quality standards","Warranties","Force majeure","Term and termination","Governing law"],
    url: "/documents/supply-agreement",
  },
  {
    id: "purchase-order",
    name: "Purchase Order",
    keywords: ["purchase order","po","order form","procurement order","buy order"],
    description: "A commercial document issued by a buyer to a seller indicating types, quantities, and agreed prices for products.",
    clauses: ["Order number","Buyer and seller details","Product description and quantity","Unit price and total","Delivery date and address","Payment terms","Cancellation rights","Acceptance terms"],
    url: "/documents/purchase-order",
  },
  {
    id: "equipment-lease",
    name: "Equipment Lease Agreement",
    keywords: ["equipment lease","equipment rental","machine rental","machinery lease","asset lease","plant hire","tool rental","vehicle lease","car lease","fleet lease"],
    description: "A contract granting the lessee the right to use equipment owned by the lessor in exchange for periodic payments.",
    clauses: ["Equipment description","Lease term","Rental payments","Maintenance responsibilities","Insurance","Return conditions","Purchase option","Default and repossession","Governing law"],
    url: "/documents/equipment-lease",
  },
  {
    id: "vehicle-sale-agreement",
    name: "Vehicle Sale Agreement",
    keywords: ["vehicle sale","car sale","sell car","buy car","auto sale","vehicle purchase","used car","vehicle transfer","motor sale"],
    description: "A contract for the sale of a motor vehicle including price, condition, and transfer of title.",
    clauses: ["Vehicle details (make, model, VIN)","Purchase price","Payment method","As-is or warranty statement","Title transfer","Odometer disclosure","Delivery date","Governing law"],
    url: "/documents/vehicle-sale-agreement",
  },

  // ─── LEGAL & DISPUTE ────────────────────────────────────────────
  {
    id: "settlement-agreement",
    name: "Settlement Agreement",
    keywords: ["settlement","settle","dispute settlement","out of court","compromise","full and final settlement","release of claims","mutual release","litigation settlement"],
    description: "A contract resolving a dispute between parties without going to court, typically involving a payment or other concession.",
    clauses: ["Parties and dispute background","Settlement sum","Payment terms","Full and final release of claims","Confidentiality","Non-disparagement","No admission of liability","Governing law"],
    url: "/documents/settlement-agreement",
  },
  {
    id: "arbitration-agreement",
    name: "Arbitration Agreement",
    keywords: ["arbitration","arbitration clause","arbitration agreement","adr","alternative dispute resolution","arbitrate","arbitrator","dispute resolution"],
    description: "An agreement to resolve disputes through arbitration rather than court litigation.",
    clauses: ["Scope of disputes covered","Arbitration rules and institution","Number of arbitrators","Seat of arbitration","Language","Governing law","Confidentiality","Enforcement"],
    url: "/documents/arbitration-agreement",
  },
  {
    id: "power-of-attorney",
    name: "Power of Attorney",
    keywords: ["power of attorney","poa","attorney","proxy","authorize","authorization","representative","agent","legal representative","general poa","special poa"],
    description: "A legal document authorizing one person (the agent) to act on behalf of another (the principal) in legal or financial matters.",
    clauses: ["Principal and agent identification","Scope of authority granted","Duration of the POA","Revocation conditions","Witness and notarization requirements","Governing law"],
    url: "/documents/power-of-attorney",
  },
  {
    id: "affidavit",
    name: "Affidavit",
    keywords: ["affidavit","sworn statement","declaration","statutory declaration","oath","deponent","notarized statement","witnessed statement"],
    description: "A written statement confirmed under oath or affirmation, used as evidence in legal proceedings.",
    clauses: ["Deponent identification","Statement of facts","Oath or affirmation","Signature and date","Witness/commissioner details","Notarization"],
    url: "/documents/affidavit",
  },
  {
    id: "legal-notice",
    name: "Legal Notice",
    keywords: ["legal notice","notice","demand notice","cease and desist","notice of default","legal warning","demand letter","formal notice","breach notice"],
    description: "A formal written notice sent to a party to notify them of a legal matter, demand, or intention to take legal action.",
    clauses: ["Sender and recipient details","Subject matter","Statement of facts","Legal basis","Demand or required action","Deadline for compliance","Consequences of non-compliance","Date"],
    url: "/documents/legal-notice",
  },
  {
    id: "indemnity-agreement",
    name: "Indemnity Agreement",
    keywords: ["indemnity","indemnification","hold harmless","indemnify","indemnity clause","liability indemnity","indemnity bond"],
    description: "A contract where one party agrees to compensate another for losses or damages arising from specific events.",
    clauses: ["Indemnifying and indemnified parties","Scope of indemnity","Covered losses","Notice of claim","Duty to defend","Exclusions","Caps on liability","Governing law"],
    url: "/documents/indemnity-agreement",
  },

  // ─── TECHNOLOGY & DIGITAL ───────────────────────────────────────
  {
    id: "privacy-policy",
    name: "Privacy Policy",
    keywords: ["privacy","privacy policy","data protection","gdpr","personal data","user data","data collection","cookies","ccpa","data privacy","data processing"],
    description: "A legal document explaining how a business collects, uses, stores, and protects personal data of its users or customers.",
    clauses: ["What data is collected","How and why data is used","Data sharing with third parties","Data retention period","User rights (access, deletion)","Cookie policy","Security measures","Contact information for data queries"],
    url: "/documents/privacy-policy",
  },
  {
    id: "terms-of-service",
    name: "Terms of Service / Terms & Conditions",
    keywords: ["terms","terms of service","terms and conditions","tos","t&c","website terms","user agreement","acceptable use","terms of use"],
    description: "Legal rules and guidelines users must agree to in order to use a product or service.",
    clauses: ["Acceptance of terms","User eligibility","Permitted and prohibited use","Intellectual property rights","Disclaimer of warranties","Limitation of liability","Termination of access","Governing law and dispute resolution"],
    url: "/documents/terms-of-service",
  },
  {
    id: "website-development-contract",
    name: "Website Development Contract",
    keywords: ["website development","web design","website contract","web developer","frontend","backend","e-commerce website","wordpress","web app"],
    description: "A contract for building a website or web application covering design, development, hosting, and content.",
    clauses: ["Project scope and features","Design and functionality specs","Timeline and milestones","Payment schedule","IP and content ownership","Hosting and maintenance","Testing and launch","Change requests","Governing law"],
    url: "/documents/website-development-contract",
  },
  {
    id: "data-processing-agreement",
    name: "Data Processing Agreement (DPA)",
    keywords: ["data processing agreement","dpa","gdpr processor","data processor","data controller","data sharing","sub-processor","data protection agreement"],
    description: "A contract between a data controller and data processor defining how personal data is handled, required under GDPR and similar laws.",
    clauses: ["Nature and purpose of processing","Types of personal data","Data subject categories","Processor obligations","Sub-processing restrictions","Security measures","Data breach notification","Data subject rights assistance","Return and deletion of data","Governing law"],
    url: "/documents/data-processing-agreement",
  },
  {
    id: "cookie-policy",
    name: "Cookie Policy",
    keywords: ["cookie","cookies","cookie policy","tracking","analytics cookies","marketing cookies","consent","cookie consent"],
    description: "A document explaining what cookies a website uses, why, and how users can manage their cookie preferences.",
    clauses: ["What cookies are","Types of cookies used","Third-party cookies","Cookie duration","How to manage cookies","Consent mechanism","Updates to policy","Contact details"],
    url: "/documents/cookie-policy",
  },
  {
    id: "app-development-agreement",
    name: "Mobile App Development Agreement",
    keywords: ["app development","mobile app","android app","ios app","flutter","react native","application development","mobile development"],
    description: "A contract for developing a mobile application including design, development, testing, and deployment.",
    clauses: ["App specifications and features","Platform (iOS/Android/both)","Timeline and milestones","Payment","Source code ownership","App store submission","Post-launch support","Bug fix warranty","Governing law"],
    url: "/documents/app-development-agreement",
  },

  // ─── PERSONAL & FAMILY ──────────────────────────────────────────
  {
    id: "will",
    name: "Last Will and Testament",
    keywords: ["will","last will","testament","will and testament","estate planning","inheritance","beneficiary","executor","probate","bequeath","legacy"],
    description: "A legal document expressing a person's wishes for the distribution of their estate and care of dependents after death.",
    clauses: ["Testator identification","Revocation of prior wills","Appointment of executor","Specific bequests","Residuary estate distribution","Guardianship of minor children","Funeral wishes","Witness signatures","Notarization"],
    url: "/documents/will",
  },
  {
    id: "prenuptial-agreement",
    name: "Prenuptial Agreement",
    keywords: ["prenuptial","prenup","premarital agreement","marriage contract","antenuptial","before marriage","financial agreement marriage"],
    description: "A contract entered into before marriage defining the financial rights and obligations of each spouse in the event of divorce or death.",
    clauses: ["Separate property of each spouse","Marital property","Debt responsibility","Spousal support waiver or amount","Business interests","Inheritance rights","Disclosure of assets","Governing law"],
    url: "/documents/prenuptial-agreement",
  },
  {
    id: "cohabitation-agreement",
    name: "Cohabitation Agreement",
    keywords: ["cohabitation","living together","unmarried couple","domestic partnership","de facto","common law","cohabiting"],
    description: "An agreement between an unmarried couple living together that defines ownership of assets, financial contributions, and arrangements if the relationship ends.",
    clauses: ["Shared and separate property","Financial contributions","Joint bank account arrangements","Property ownership on separation","Debt responsibility","Children arrangements","Dispute resolution","Governing law"],
    url: "/documents/cohabitation-agreement",
  },
  {
    id: "child-support-agreement",
    name: "Child Support Agreement",
    keywords: ["child support","child maintenance","maintenance agreement","custody","parenting plan","child custody","alimony","divorce settlement","co-parenting"],
    description: "An agreement between parents regarding financial support, custody arrangements, and parenting responsibilities for their children.",
    clauses: ["Child support amount and payment frequency","Payment method","Duration","Custody and visitation schedule","Education expenses","Medical expenses","Variation mechanism","Governing law"],
    url: "/documents/child-support-agreement",
  },
  {
    id: "adoption-consent",
    name: "Adoption Consent Form",
    keywords: ["adoption","adopt","adoption consent","surrender parental rights","foster","adoption agreement"],
    description: "A legal document where a birth parent or legal guardian consents to the adoption of a child.",
    clauses: ["Identifying information of child","Birth parent identification","Voluntary consent statement","Rights being surrendered","Witness requirements","Revocation period","Governing law"],
    url: "/documents/adoption-consent",
  },

  // ─── BANKING & SECURITY ─────────────────────────────────────────
  {
    id: "pledge-agreement",
    name: "Pledge Agreement",
    keywords: ["pledge","pledging","security","collateral","pledge agreement","charge","lien","security interest","hypothecation"],
    description: "A contract where a debtor pledges an asset as security for a loan or obligation.",
    clauses: ["Description of pledged assets","Secured obligation","Pledgee's rights","Duties of pledgor","Default and enforcement","Release of pledge","Insurance","Governing law"],
    url: "/documents/pledge-agreement",
  },
  {
    id: "escrow-agreement",
    name: "Escrow Agreement",
    keywords: ["escrow","escrow agreement","escrow account","third party hold","source code escrow","software escrow"],
    description: "A contract where a third party (escrow agent) holds funds or assets until specified conditions are met.",
    clauses: ["Parties and escrow agent","Escrow amount or assets","Release conditions","Escrow agent duties","Fees","Dispute procedure","Default","Governing law"],
    url: "/documents/escrow-agreement",
  },

  // ─── GOVERNMENT & OFFICIAL ──────────────────────────────────────
  {
    id: "noc",
    name: "No Objection Certificate (NOC)",
    keywords: ["noc","no objection","no objection certificate","clearance letter","no objection letter","noc letter","travel noc","employment noc"],
    description: "A document issued by an authority stating it has no objection to the named person or entity undertaking the stated activity.",
    clauses: ["Issuing authority details","Recipient name and details","Purpose of NOC","Conditions (if any)","Validity period","Authorized signatory"],
    url: "/documents/noc",
  },
  {
    id: "mou",
    name: "Memorandum of Understanding (MOU)",
    keywords: ["mou","memorandum","memorandum of understanding","letter of intent","loi","moi","heads of agreement","preliminary agreement","moa","memorandum of agreement"],
    description: "A non-binding document outlining the intentions and expectations of two or more parties before a formal agreement is signed.",
    clauses: ["Parties and their roles","Purpose and objectives","Scope of cooperation","Timeline and milestones","Financial arrangements (if any)","Confidentiality","Non-binding declaration","Governing law"],
    url: "/documents/mou",
  },
  {
    id: "government-contract",
    name: "Government / Public Procurement Contract",
    keywords: ["government contract","public procurement","tender","bid","rft","rfp","rfq","public sector","government supplier","bid contract"],
    description: "A contract between a government body and a private supplier for goods or services, subject to public procurement rules.",
    clauses: ["Contract scope and specifications","Contract price","Delivery schedule","Compliance with regulations","Audit rights","Termination for convenience","Intellectual property","Data protection","Governing law"],
    url: "/documents/government-contract",
  },

  // ─── HEALTHCARE & MEDICAL ───────────────────────────────────────
  {
    id: "medical-consent",
    name: "Medical Consent Form",
    keywords: ["medical consent","informed consent","treatment consent","surgery consent","patient consent","medical procedure","consent to treat"],
    description: "A form by which a patient gives informed consent to a medical procedure, treatment, or clinical trial.",
    clauses: ["Patient identification","Description of procedure","Risks and benefits","Alternatives","Right to withdraw consent","Emergency provisions","Patient signature","Witness"],
    url: "/documents/medical-consent",
  },
  {
    id: "healthcare-services-agreement",
    name: "Healthcare Services Agreement",
    keywords: ["healthcare","medical services","hospital contract","clinic contract","doctor agreement","health services","patient services agreement","telemedicine"],
    description: "A contract between a healthcare provider and patient or institution for the provision of medical services.",
    clauses: ["Services description","Fees and billing","Patient rights","Provider obligations","Insurance","Privacy (HIPAA)","Termination","Emergency services","Governing law"],
    url: "/documents/healthcare-services-agreement",
  },

  // ─── EVENTS & ENTERTAINMENT ─────────────────────────────────────
  {
    id: "event-planning-contract",
    name: "Event Planning Contract",
    keywords: ["event planning","event planner","event management","wedding planner","party planner","event coordinator","conference organizer"],
    description: "A contract between an event planner and client covering event details, services, budget, and cancellation.",
    clauses: ["Event details (date, venue, type)","Services provided","Budget and payment schedule","Vendor management","Cancellation and postponement","Force majeure","Liability","Governing law"],
    url: "/documents/event-planning-contract",
  },
  {
    id: "talent-agreement",
    name: "Talent / Performer Agreement",
    keywords: ["talent","performer","artist","band","musician","speaker","entertainer","talent contract","performance agreement","booking agreement","appearance fee"],
    description: "A contract engaging a performer, artist, or speaker for an appearance or performance.",
    clauses: ["Performance details (date, venue, duration)","Fee and payment","Technical requirements","Travel and accommodation","Cancellation policy","Exclusivity window","Recording rights","Intellectual property","Governing law"],
    url: "/documents/talent-agreement",
  },
  {
    id: "venue-hire-agreement",
    name: "Venue Hire Agreement",
    keywords: ["venue hire","venue rental","event space","hall hire","conference room","banquet hall","venue booking","function room"],
    description: "A contract for the hire of a venue or event space for a specific event and time period.",
    clauses: ["Venue description","Event date and times","Hire fee and deposit","Permitted capacity","Catering and alcohol policy","Noise and curfew","Setup and cleanup","Cancellation policy","Damage liability","Governing law"],
    url: "/documents/venue-hire-agreement",
  },
  {
    id: "sponsorship-agreement",
    name: "Sponsorship Agreement",
    keywords: ["sponsorship","sponsor","sponsorship agreement","event sponsor","corporate sponsorship","brand sponsor","funding sponsorship"],
    description: "A contract between a sponsor and an event or individual receiving sponsorship, defining benefits, obligations, and branding rights.",
    clauses: ["Sponsorship fee","Sponsorship benefits and entitlements","Brand usage rights","Event/activity obligations","Exclusivity","Term","Termination","Governing law"],
    url: "/documents/sponsorship-agreement",
  },

  // ─── EDUCATION ──────────────────────────────────────────────────
  {
    id: "student-enrollment-agreement",
    name: "Student Enrollment Agreement",
    keywords: ["student enrollment","school contract","tuition agreement","education contract","training agreement","course agreement","academy contract","student agreement"],
    description: "A contract between an educational institution and student (or parent) setting out enrollment terms, fees, and policies.",
    clauses: ["Program description","Tuition fees and payment schedule","Refund policy","Academic policies","Conduct code","Intellectual property","Data privacy","Termination","Governing law"],
    url: "/documents/student-enrollment-agreement",
  },
  {
    id: "tutoring-agreement",
    name: "Tutoring Agreement",
    keywords: ["tutoring","tutor","private tuition","online tutoring","teaching contract","coaching contract","academic coaching"],
    description: "A contract between a tutor and student (or parent) for private tutoring services.",
    clauses: ["Sessions schedule","Subject matter","Hourly rate","Payment terms","Cancellation policy","Confidentiality","Duration","Termination"],
    url: "/documents/tutoring-agreement",
  },

  // ─── TRANSPORT & LOGISTICS ──────────────────────────────────────
  {
    id: "freight-contract",
    name: "Freight / Logistics Contract",
    keywords: ["freight","logistics","shipping","transport","cargo","haulage","trucking","carrier","freight contract","logistics agreement","supply chain logistics"],
    description: "A contract between a shipper and carrier for the transportation of goods.",
    clauses: ["Cargo description","Origin and destination","Delivery timeline","Freight charges","Incoterms","Insurance","Liability limits","Damage claims procedure","Governing law"],
    url: "/documents/freight-contract",
  },
  {
    id: "vehicle-hire-agreement",
    name: "Vehicle Hire Agreement",
    keywords: ["vehicle hire","car hire","car rental","vehicle rental","fleet hire","truck hire","minibus hire","van rental"],
    description: "A contract for the short-term hire of a vehicle including terms of use, insurance, and damage liability.",
    clauses: ["Vehicle description","Hire period","Rental rate","Security deposit","Permitted drivers","Insurance and excess","Fuel policy","Mileage limits","Damage policy","Governing law"],
    url: "/documents/vehicle-hire-agreement",
  },

  // ─── AGRICULTURE & ENVIRONMENT ──────────────────────────────────
  {
    id: "farm-lease",
    name: "Farm / Agricultural Lease",
    keywords: ["farm lease","agricultural lease","farming contract","crop sharing","sharecropping","farmland","land lease","agricultural tenancy","farm rent"],
    description: "A contract for the lease of agricultural land for farming purposes.",
    clauses: ["Land description","Lease term","Rent","Permitted crops/use","Maintenance obligations","Water rights","Sub-letting","Improvements","Governing law"],
    url: "/documents/farm-lease",
  },
  {
    id: "carbon-credit-agreement",
    name: "Carbon Credit Agreement",
    keywords: ["carbon credit","carbon offset","emissions trading","carbon market","carbon certificate","net zero","climate contract"],
    description: "A contract for the purchase or sale of carbon credits or offsets.",
    clauses: ["Project description","Credit quantity","Verification standard","Price per credit","Delivery and registration","Warranties","Force majeure","Governing law"],
    url: "/documents/carbon-credit-agreement",
  },

  // ─── MISCELLANEOUS ──────────────────────────────────────────────
  {
    id: "donation-agreement",
    name: "Donation Agreement",
    keywords: ["donation","donate","charity","gift agreement","charitable donation","grant","philanthropy","donor"],
    description: "A contract formalizing a donation from a donor to a recipient organization, including any conditions attached to the gift.",
    clauses: ["Donor and recipient identification","Donation amount","Purpose and restrictions","Payment schedule","Recognition","Reporting requirements","Return conditions","Governing law"],
    url: "/documents/donation-agreement",
  },
  {
    id: "volunteer-agreement",
    name: "Volunteer Agreement",
    keywords: ["volunteer","volunteering","volunteer agreement","ngo volunteer","charity volunteer","unpaid work","community service"],
    description: "An agreement between an organization and a volunteer defining the volunteer's role, duties, and the organization's obligations.",
    clauses: ["Role description","Time commitment","Expenses reimbursement","Confidentiality","Health and safety","IP assignment","No employment relationship","Termination"],
    url: "/documents/volunteer-agreement",
  },
  {
    id: "hotel-accommodation-agreement",
    name: "Hotel Accommodation Agreement",
    keywords: ["hotel","accommodation","hotel contract","hotel agreement","corporate rate","room booking","hospitality contract","resort agreement"],
    description: "A contract between a hotel and a corporate or group client for accommodation at agreed rates.",
    clauses: ["Room types and block allocation","Rate per room","Booking and cancellation policy","Check-in and check-out times","Attrition clause","F&B minimums","Payment terms","Force majeure","Governing law"],
    url: "/documents/hotel-accommodation-agreement",
  },
  {
    id: "artist-management-agreement",
    name: "Artist Management Agreement",
    keywords: ["artist management","music management","talent management","artist manager","entertainment management","band management","record deal"],
    description: "A contract between an artist and their manager defining management services, commission, and duration.",
    clauses: ["Scope of management services","Commission percentage","Expenses","Term and post-term commission","Exclusivity","Manager's authority","Record keeping","Termination","Governing law"],
    url: "/documents/artist-management-agreement",
  },
  {
    id: "publishing-agreement",
    name: "Publishing Agreement",
    keywords: ["publishing","publisher","book contract","author agreement","manuscript","literary agent","ebook rights","publishing rights"],
    description: "A contract between an author and publisher for the publication and distribution of a written work.",
    clauses: ["Work description","Rights granted","Territory","Royalty rates","Advance against royalties","Publication timeline","Author's warranties","Editing and approval","Termination and reversion of rights","Governing law"],
    url: "/documents/publishing-agreement",
  },
  {
    id: "music-license",
    name: "Music License Agreement",
    keywords: ["music license","music licensing","sync license","mechanical license","performance rights","music rights","background music","music usage"],
    description: "A contract granting permission to use copyrighted music in a specific context (film, ad, event, etc.).",
    clauses: ["Musical work description","Type of license (sync, mechanical, master)","Usage territory and media","Duration","License fee","Royalties","Exclusivity","Credit requirements","Governing law"],
    url: "/documents/music-license",
  },
  {
    id: "influencer-agreement",
    name: "Influencer / Brand Ambassador Agreement",
    keywords: ["influencer","brand ambassador","social media influencer","content creator","sponsored post","collaboration","ugc","creator contract","tiktok","instagram","youtube"],
    description: "A contract between a brand and influencer or content creator for promotional content creation and posting.",
    clauses: ["Deliverables (posts, stories, videos)","Platform(s)","Content approval process","Posting schedule","Fee and payment","FTC disclosure requirements","Exclusivity","Content ownership","Termination","Governing law"],
    url: "/documents/influencer-agreement",
  },
  {
    id: "non-solicitation-agreement",
    name: "Non-Solicitation Agreement",
    keywords: ["non solicitation","no poaching","non-solicitation","employee poaching","client poaching","customer non-solicitation"],
    description: "An agreement preventing a party from soliciting employees or clients of another business for a specified period.",
    clauses: ["Restricted activities (employees, clients, or both)","Geographic scope","Duration","Consideration","Exceptions","Remedies for breach","Governing law"],
    url: "/documents/non-solicitation-agreement",
  },
  {
    id: "partnership-dissolution",
    name: "Partnership Dissolution Agreement",
    keywords: ["dissolution","dissolve partnership","wind up","end partnership","close business","partnership dissolution","winding up"],
    description: "A contract terminating a partnership and setting out how assets, liabilities, and goodwill will be distributed.",
    clauses: ["Effective dissolution date","Asset valuation and distribution","Liability settlement","Creditor notifications","Final accounting","Non-compete post-dissolution","Tax obligations","Governing law"],
    url: "/documents/partnership-dissolution",
  },
  {
    id: "liability-waiver",
    name: "Liability Waiver / Release Form",
    keywords: ["waiver","liability waiver","release form","release of liability","disclaimer","hold harmless","activity waiver","sport waiver","event waiver","risk consent"],
    description: "A form by which a participant releases an organization from liability for injuries or damages arising from an activity.",
    clauses: ["Activity description","Risks acknowledged","Release of liability","Indemnification","Assumption of risk","Emergency medical consent","Governing law","Participant signature"],
    url: "/documents/liability-waiver",
  },
  {
    id: "subcontractor-agreement",
    name: "Subcontractor Agreement",
    keywords: ["subcontractor","sub-contractor","subcontracting","subbies","construction subcontractor","trade contractor","specialist contractor"],
    description: "A contract between a main contractor and subcontractor for the completion of part of a larger project.",
    clauses: ["Scope of subcontract works","Price and payment","Programme and milestones","Compliance with main contract","Insurance","Safety obligations","Defects","Termination","Governing law"],
    url: "/documents/subcontractor-agreement",
  },
  {
    id: "co-founder-agreement",
    name: "Co-Founder Agreement",
    keywords: ["co-founder","cofounder","founders agreement","startup founders","equity split","founding team","startup agreement","co-founders"],
    description: "An agreement between co-founders of a startup defining equity splits, roles, vesting, and what happens if a founder leaves.",
    clauses: ["Equity allocation","Vesting schedule and cliff","Roles and responsibilities","Decision-making authority","IP assignment to company","Founder departure terms","Non-compete","Dispute resolution","Governing law"],
    url: "/documents/co-founder-agreement",
  },
  {
    id: "referral-agreement",
    name: "Referral Agreement",
    keywords: ["referral","referral fee","referral agreement","lead generation","affiliate","finder's fee","broker","introduction fee","commission referral"],
    description: "A contract defining the terms under which one party refers clients to another in exchange for a fee or commission.",
    clauses: ["Referral scope and territory","Referral fee or commission rate","Payment timing","Qualifying referrals","Exclusivity","Term","Non-solicitation","Governing law"],
    url: "/documents/referral-agreement",
  },
  {
    id: "terms-of-sale",
    name: "Terms of Sale / E-Commerce Terms",
    keywords: ["terms of sale","ecommerce","e-commerce terms","online shop","online store","return policy","refund policy","shipping policy","consumer terms"],
    description: "Legal terms governing the sale of goods or services through an online store or e-commerce platform.",
    clauses: ["Product descriptions and pricing","Order process","Payment methods","Delivery times and methods","Returns and refunds","Consumer rights","Warranty","Dispute resolution","Governing law"],
    url: "/documents/terms-of-sale",
  },
];


/* ─────────────────────────────────────────────
   SMART MATCHER
   Score each doc against the user query.
   Returns top matches (score > 0) sorted desc.
───────────────────────────────────────────── */
function matchDocuments(query: string): { doc: DocEntry; score: number }[] {
  const q = query.toLowerCase();
  const results: { doc: DocEntry; score: number }[] = [];
  for (const doc of DOCUMENT_KB) {
    let score = 0;
    for (const kw of doc.keywords) {
      if (q.includes(kw)) score += kw.split(" ").length * 2; // multi-word kw scores higher
    }
    // also check doc name words
    const nameWords = doc.name.toLowerCase().split(/\s+/);
    for (const nw of nameWords) {
      if (nw.length > 3 && q.includes(nw)) score += 1;
    }
    if (score > 0) results.push({ doc, score });
  }
  return results.sort((a, b) => b.score - a.score);
}

/* Build a rich assistant reply from matched docs */
function buildDocReply(
  matches: { doc: DocEntry; score: number }[],
  userName: string | null,
  query: string
): { text: string; actionButtons: ActionButton[]; noDocumentMatch: boolean } {
  const top = matches.slice(0, 3);
  const uname = userName || null;

  if (top.length === 0) {
    // No document match but let's still give a helpful response
    const uname = userName ? `${userName}, ` : "";
    return {
      text: `${uname}I don't have specific information about that in my document library right now.\n\nHowever, here are some things I can help with:\n\n• **Find the right legal document** — I have 230+ templates covering business, finance, real estate, employment, and more\n• **Explain legal concepts** — Ask me about contracts, agreements, or legal terms\n• **Build a custom document** — I can guide you through creating one tailored to your situation\n\nWhat would you like to do?`,
      actionButtons: [
        { label: "Browse Documents", value: "/documents", type: "link" as const },
        { label: "Create New Document", value: "create new document", type: "action" as const },
      ],
      noDocumentMatch: true,
    };
  }

  const primary = top[0].doc;
  const isInfoQuery = /^(what|how|explain|tell|describe|define)/i.test(query.trim());
  let text = "";

  if (isInfoQuery) {
    text += `${uname ? `${uname}, h` : "H"}ere\'s everything about the **${primary.name}**:\n\n`;
    text += `**What it is:**\n${primary.description}\n\n`;
    text += `**Key clauses it should include:**\n`;
    primary.clauses.forEach((c, i) => { text += `${i + 1}. ${c}\n`; });
    const whenMap: Record<string, string> = {
      "partnership-agreement": "two or more people want to run a business together and need to define profit sharing, decision-making, and responsibilities",
      "shareholders-agreement": "multiple shareholders in a company need to define rights, obligations, and what happens if someone sells their stake",
      "nda": "you want to share confidential information and legally prevent it from being disclosed",
      "employment-contract": "you are hiring someone as an employee and need to set out salary, duties, hours, and notice period",
      "freelance-contract": "you hire a freelancer or contractor and want to define scope, payment, and IP ownership",
      "service-agreement": "a business provides services to a client and both need clarity on deliverables and payment",
      "lease-agreement": "a landlord rents property to a tenant and both need written terms for rent, deposit, and duration",
      "loan-agreement": "you are lending or borrowing money and need a formal record with repayment terms",
      "sale-agreement": "goods or assets are being sold and you need to document price, delivery, and title transfer",
      "power-of-attorney": "you need to authorize someone to act on your behalf in legal or financial matters",
      "will": "you want to formally record how your estate should be distributed after death",
      "mou": "two parties want to record their intent to collaborate before signing a full agreement",
      "privacy-policy": "your website or app collects personal data and you must legally disclose how it is used",
      "terms-of-service": "you offer an online product or service and need users to agree to rules of use",
      "co-founder-agreement": "you are starting a company with others and need to define equity, roles, and vesting",
      "investment-agreement": "an investor is putting money into your business in exchange for equity or a return",
      "settlement-agreement": "two parties want to resolve a dispute without going to court",
      "ip-assignment": "you want to formally transfer ownership of intellectual property",
    };
    const when = whenMap[primary.id] ?? "you need to formally document rights and obligations between parties in this type of arrangement";
    text += `\n**When do you need it:**\nYou need a ${primary.name} when ${when}.`;
  } else {
    text += `${uname ? `${uname}, h` : "H"}ere\'s what I found in our document library:\n\n`;
    text += `**${primary.name}**\n${primary.description}\n\n`;
    text += `**Key clauses:**\n`;
    primary.clauses.forEach(c => { text += `• ${c}\n`; });
  }

  if (top.length > 1) {
    text += `\n\n**Related documents you might also need:**\n`;
    top.slice(1).forEach(m => { text += `• **${m.doc.name}** — ${m.doc.description}\n`; });
  }

  const actionButtons: ActionButton[] = [
    { label: `Get ${primary.name}`, value: primary.url, type: "link" as const },
    ...top.slice(1, 3).map(m => ({ label: m.doc.name, value: m.doc.url, type: "link" as const })),
    { label: "Browse all 230+ documents", value: "/documents", type: "link" as const },
    { label: "Build custom version", value: `create custom ${primary.name}`, type: "action" as const },
  ];

  return { text, actionButtons, noDocumentMatch: false };
}


/* ─────────────────────────────────────────────
   LEGAL Q&A — detect informational questions
   and answer directly from KB context.
───────────────────────────────────────────── */
const LEGAL_QUESTION_PATTERNS = [
  /what is (a |an |the )?(.+)/i,
  /what are (.+)/i,
  /how (do|does|should|can) (.+)/i,
  /explain (.+)/i,
  /tell me about (.+)/i,
  /describe (.+)/i,
  /clauses? (of|in|for) (.+)/i,
  /sections? (of|in|for) (.+)/i,
  /should|must|required|include|termination|period|notice/i,
];

function isLegalQuestion(query: string): boolean {
  return LEGAL_QUESTION_PATTERNS.some(p => p.test(query.trim()));
}

/* General legal knowledge base for common questions */
function getGeneralLegalAdvice(query: string): string | null {
  const q = query.toLowerCase();
  
  if (q.includes("termination") && (q.includes("lease") || q.includes("rental") || q.includes("tenancy") || q.includes("tenant"))) {
    return `**Termination Period for Lease/Rental Agreements:**\n\nThe termination period depends on the lease terms and local laws, but here are common standards:\n\n**Typical Notice Periods:**\n• **Month-to-month leases**: Usually 30 days notice required from either party\n• **Fixed-term leases**: Either party may need to provide 30-60 days notice before expiration\n• **Annual leases**: Typically 60-90 days notice before the end of the lease year\n• **Commercial leases**: Often 60-90 days or longer\n\n**Important Considerations:**\n✓ **Check your specific lease** — The exact notice requirement must be in your lease agreement\n✓ **Jurisdiction matters** — Local tenant laws override lease terms in many areas\n✓ **Notice format** — Usually must be in writing (email, certified mail, or hand-delivered)\n✓ **Count correctly** — Count calendar days unless the lease specifies business days\n✓ **Early termination** — Some leases allow early termination with penalty fees\n✓ **"Just cause" laws** — Many jurisdictions require legal grounds for eviction (not arbitrary)\n✓ **Security deposit** — Landlord has specific timeframes to return deposits\n✓ **Keep proof** — Always keep proof of notice delivery\n\n**Consequences of improper notice:**\n• Tenant may continue owing rent\n• Landlord cannot enforce eviction\n• Potential legal liability for damages\n\n**Related documents you should review:**\n• Your signed Lease Agreement\n• Local tenant/landlord laws\n• Any amendments or addendums to your lease\n\nI recommend reviewing your specific lease agreement to confirm the exact termination requirements. Would you like to see a lease template or get help understanding other clauses?`;
  }
  
  if (q.includes("termination") && (q.includes("employment") || q.includes("employee") || q.includes("job") || q.includes("work"))) {
    return `**Termination Period for Employment Agreements:**\n\n**Notice Periods by Type:**\n• **At-will employment** (USA): No notice required unless contract specifies\n• **Standard practice**: 2 weeks notice is common professional courtesy\n• **Executive roles**: 30-90 days notice typical\n• **Contract positions**: As specified in employment agreement\n• **Unionized jobs**: Per collective bargaining agreement\n\n**Who must give notice:**\n→ Employee leaving: Usually 2 weeks\n→ Employer firing: Depends on reason and local laws\n→ Layoffs: May require WARN Act notice (60 days in USA) or severance\n\n**Key Points:**\n✓ **State laws vary** — Some states require cause for termination\n✓ **Employment contracts override default rules**\n✓ **Documentation is critical** — Get termination in writing\n✓ **Final paycheck** — Must include all earned wages by law\n✓ **Benefits ending** — Usually continue through notice period\n✓ **References** — Agree on what will be said about employment\n\n**During Notice Period:**\n• Employee should train replacement\n• Return company property\n• Maintain confidentiality\n• Continue performing duties\n• Prepare transition documents\n\n**Getting Terminated:**\nIf you're terminated, ensure you receive:\n✓ Final paycheck\n✓ Unused vacation/PTO payout\n✓ Written explanation (if requested)\n✓ COBRA notice (health insurance continuation)\n✓ Severance agreement (if offered)\n\nIf you believe termination was illegal, consult an employment attorney. Would you like help with an employment contract or severance agreement?`;
  }
  
  if ((q.includes("termination") || q.includes("end")) && q.includes("contract")) {
    return `**How to Properly Terminate a Contract:**\n\n**Standard Termination Provisions:**\n1. **Notice period** — Time required before termination takes effect (30-90 days)\n2. **For cause** — Grounds that allow immediate termination (breach, default)\n3. **For convenience** — Ability to end contract for any reason (with notice)\n4. **Early termination** — Fees or penalties for ending before term expires\n\n**Steps to Terminate Properly:**\n\n**STEP 1: Review the contract**\n→ Find the termination clause\n→ Verify notice period required\n→ Identify any penalties or conditions\n→ Check if cause is required\n\n**STEP 2: Provide written notice**\n→ Send via registered mail or email (with read receipt)\n→ State contract ID/reference\n→ Specify effective date\n→ Keep a copy for your records\n\n**STEP 3: Calculate termination date**\n→ Add notice period to when notice was received\n→ Business days vs. calendar days (check contract)\n→ Include any conditions that must be met\n\n**STEP 4: Wind down obligations**\n→ Transition services/products\n→ Return materials/files\n→ Process final payments\n→ Close any accounts\n\n**STEP 5: Document everything**\n→ Get written confirmation of termination acceptance\n→ Keep proof of notice delivery\n→ Document final transactions\n→ Resolve any disputes in writing\n\n**Common Termination Issues:**\n⚠ Improper notice → Contract continues\n⚠ Missing required conditions → May be invalid\n⚠ No written notice → Difficult to prove\n⚠ Ignoring obligations → Could face legal action\n⚠ Not calculating period correctly → Could violate contract\n\n**What happens after termination:**\n✓ Obligations end on effective date\n✓ No new work accepted after date\n✓ Final invoices/payments processed\n✓ Confidentiality provisions may continue\n✓ Non-compete may still apply\n\nThe exact process depends on your specific contract. Review your contract terms carefully or have an attorney review before terminating. Would you like help with a specific contract type?`;
  }
  
  if (q.includes("notice") && (q.includes("period") || q.includes("days") || q.includes("month") || q.includes("termination"))) {
    return `**Understanding Notice Periods in Contracts:**\n\nNotice periods are the time required for one party to inform another of contract termination or changes. Here's what you need to know:\n\n**Common Notice Periods:**\n• **Residential leases**: 30-60 days\n• **Commercial contracts**: 30-90 days  \n• **Employment**: 2 weeks to 30 days (varies by region)\n• **Service agreements**: 30-90 days\n• **Vendor/supplier**: 30-60 days\n\n**How to Calculate Notice Correctly:**\n→ Check if "calendar days" or "business days" (M-F only)\n→ Count from when notice is RECEIVED, not sent\n→ Check if start date is day 0 or day 1\n→ Note weekends and holidays if applicable\n→ Verify in writing to avoid disputes\n\n**Key Points:**\n✓ Notice should ALWAYS be in writing\n✓ Use certified mail or email with read receipt\n✓ Keep proof of delivery\n✓ Send to address specified in contract\n✓ Failure to provide proper notice may invalidate termination\n✓ Some contracts auto-renew if no notice is given\n✓ Late notice may mean contract renews for another term\n\n**How to Give Proper Notice:**\n\n1. **Write formally:**\n   - \"This is formal notice of termination\"\n   - Include contract date and reference\n   - State effective termination date\n   - Reference the specific termination clause\n\n2. **Send properly:**\n   - Registered/certified mail (proof of delivery)\n   - Email to official email address (request read receipt)\n   - Hand delivery with signature\n   - DO NOT use text/casual methods\n\n3. **Keep records:**\n   - Save copy of notice sent\n   - Document delivery proof\n   - Note who received it and when\n   - Store safely for 3-7 years\n\n**What can go wrong:**\n⚠ Sending to wrong address → Notice invalid\n⚠ Wrong number of days → Contract continues\n⚠ Verbal notice only → No legal proof\n⚠ Missing formalities → May not be enforceable\n⚠ Late notice → Automatic renewal possible\n\n**Pro Tip:** Always send notice at the beginning of a notice period window so you have buffer time. If giving 30 days notice, send on day 1-2, not day 28!\n\nThe specific requirements depend on your contract type and jurisdiction. Review your contract carefully or have an attorney verify before sending notice.`;
  }
  
  if ((q.includes("what should") || q.includes("what must") || q.includes("what clauses")) && q.includes("include")) {
    return `**What Should a Contract Include?**\n\nMost legal agreements should have these key elements:\n\n**ESSENTIAL CLAUSES (must have):**\n\n1. **Parties & Effective Date**\n   → Names of all parties involved\n   → Roles/capacity of each party\n   → Effective date and signing date\n\n2. **Scope of Work/Agreement**\n   → What exactly is being agreed to?\n   → Specific deliverables or services\n   → Boundaries and limitations\n\n3. **Term & Duration**\n   → When does it start and end?\n   → Is it renewable?\n   → Conditions for renewal\n\n4. **Payment/Consideration**\n   → What is the exchange of value?\n   → Payment amount and method\n   → Due dates and late payment terms\n   → Any expenses or reimbursements\n\n5. **Responsibilities & Obligations**\n   → What must each party do?\n   → Specific requirements\n   → Performance standards\n   → Timelines and deadlines\n\n6. **Termination Provisions**\n   → How can agreement end?\n   → Notice period required\n   → Grounds for early termination\n   → What happens upon termination\n\n7. **Confidentiality**\n   → What information is confidential?\n   → Who can access it?\n   → Duration of confidentiality\n   → Exceptions (public info, etc.)\n\n8. **Dispute Resolution**\n   → How are conflicts handled?\n   → Mediation/arbitration?\n   → Litigation option?\n   → Who pays legal costs?\n\n9. **Governing Law & Jurisdiction**\n   → Which state/country's laws apply?\n   → Which court has jurisdiction?\n   → Venue for disputes\n\n10. **Signatures**\n    → All parties must sign\n    → Date of signature\n    → Print name under signature\n    → Consider notarization if needed\n\n**COMMON ADDITIONAL CLAUSES:**\n\n• **Liability & Indemnification** — Who pays if something goes wrong?\n• **Insurance Requirements** — Protection needed\n• **Amendment Procedures** — How to change agreement\n• **Force Majeure** — Unforeseen circumstances\n• **Assignment Rights** — Can parties transfer agreement?\n• **Warranties** — Promises about quality/performance\n• **Limitation of Liability** — Caps on damages\n• **Severability** — If one clause is invalid, rest remains\n• **Entire Agreement** — This replaces all prior agreements\n• **Notices** — How to formally contact the other party\n\n**RED FLAGS - AVOID THESE:**\n⚠ Blank fields or \"TBD\" spaces\n⚠ Vague language or undefined terms\n⚠ Missing signature lines\n⚠ One-sided terms heavily favoring one party\n⚠ No termination clause\n⚠ Missing effective date\n⚠ Contradictory provisions\n⚠ Handwritten changes without initials\n\n**BEST PRACTICES:**\n✓ Keep it clear and specific\n✓ Define all key terms\n✓ Use plain English, avoid legal jargon\n✓ Number all sections\n✓ Date and sign in blue ink (not black)\n✓ Keep copies for all parties\n✓ Store safely (original + digital)\n✓ Have attorney review before signing if high-value\n\nThe exact clauses needed depend on your specific agreement type. Would you like help with a particular contract?`;
  }
  
  if (q.includes("should") && (q.includes("agreement") || q.includes("contract"))) {
    return `**Standard Contract Best Practices:**\n\nWhen creating or reviewing any agreement:\n\n**BEFORE YOU SIGN:**\n\n✓ **Read everything carefully**\n  → Every word matters in contracts\n  → Don't skip the fine print\n  → Ask about anything unclear\n\n✓ **Understand your obligations**\n  → What must YOU do?\n  → What are the deadlines?\n  → What are the consequences if you fail?\n  → Can you afford these obligations?\n\n✓ **Understand your rights**\n  → What are you getting in return?\n  → Can you terminate early?\n  → What happens if the other party breaches?\n  → Who pays if something goes wrong?\n\n✓ **Identify ambiguous language**\n  → Ask for clarification in writing\n  → Define any unclear terms\n  → Get answers in the contract itself\n\n✓ **Verify key information**\n  → Names and addresses are correct\n  → Payment amounts and dates\n  → Delivery/performance schedules\n  → All contact information\n\n✓ **Confirm termination conditions**\n  → Notice period required\n  → Can you exit early?\n  → Any penalties for early exit?\n  → What happens to pending payments?\n\n**PROTECTION CLAUSES YOU SHOULD HAVE:**\n\n• **Liability limits** — Cap on damages if something goes wrong\n• **Confidentiality/NDA** — Protect sensitive information\n• **Dispute resolution** — Arbitration or court option\n• **Governing law** — Which state/country's laws apply\n• **Amendment procedures** — How to change the agreement\n• **Entire agreement** — This document replaces all prior deals\n• **Severability** — If one clause is bad, rest still valid\n• **Force majeure** — Protection for unforeseeable events\n\n**RED FLAGS - DON'T SIGN:**\n\n⚠ **Blank fields** — Always filled with anything later\n⚠ **Vague terms** — \"Reasonable\" or \"appropriate\" undefined\n⚠ **One-sided terms** — All risk on you, all benefit to them\n⚠ **No termination clause** — Stuck forever\n⚠ **Missing effective date** — When does it start?\n⚠ **Contradiction** — Different sections contradict each other\n⚠ **You're forced to rush** — \"Sign today or deal's off\"\n⚠ **Handwritten changes** — Not initialed by both parties\n⚠ **Unclear who's paying what** — Ambiguous payment terms\n\n**AFTER YOU SIGN:**\n\n✓ Keep original in safe place (fire-proof box, safe)\n✓ Keep digital copy (cloud backup)\n✓ Save all amendments separately\n✓ Document all payments made\n✓ Note any changes agreed verbally (get in writing)\n✓ Keep proof of delivery for notices\n✓ Review periodically for renewal dates\n✓ Keep for 3-7 years minimum (longer for important docs)\n\n**CRITICAL:** Have an attorney review important contracts or high-value agreements before signing. A small upfront legal fee can save thousands in disputes.\n\nWould you like help understanding a specific contract or creating one?`;
  }
  
  if (q.includes("payment") && (q.includes("term") || q.includes("schedule") || q.includes("due"))) {
    return `**Payment Terms in Contracts:**\n\n**Standard Payment Terms:**\n\n• **Net 30/60/90** — Invoice due in 30, 60, or 90 days from invoice date\n• **Net Due on Receipt** — Payment immediately upon invoice/delivery\n• **Deposits/Prepayment** — Payment upfront before work begins\n• **Installments** — Spread payments over contract period\n• **Retainer** — Upfront fee for reserved services/availability\n• **Percentage-based** — Payment tied to project milestones\n• **Upon Completion** — Payment only after work is fully done\n• **C.O.D.** (Cash on Delivery) — Payment when goods received\n\n**Late Payment Consequences:**\n\n→ Late fees (typically 1.5% monthly interest or 18% annual)\n→ Suspension of services if payment is overdue\n→ Collection costs and attorney fees\n→ Right to suspend or terminate for non-payment\n→ Damage to credit score/payment history\n→ Interest may continue accruing\n\n**Payment Methods:**\n\n✓ Bank wire transfer\n✓ ACH (automatic bank transfer)\n✓ Credit card (may include processing fees)\n✓ Check by mail\n✓ PayPal/Venmo/digital wallets\n✓ Cryptocurrency (if parties agree)\n✓ In-kind payment (trade, barter)\n\n**Invoice Best Practices:**\n\n1. **Include:**\n   ✓ Invoice number (for tracking)\n   ✓ Invoice date\n   ✓ Due date (based on payment terms)\n   ✓ Detailed description of goods/services\n   ✓ Quantity and unit price\n   ✓ Total amount due\n   ✓ Payment method instructions\n   ✓ Bank details (wire transfer)\n   ✓ Contact for questions\n\n2. **Tracking:**\n   ✓ Send invoice immediately upon delivery\n   ✓ Follow up 5 days before due date\n   ✓ Send reminder 2-3 days after due date\n   ✓ Document all communications\n   ✓ Keep copy for accounting\n\n3. **Record keeping:**\n   ✓ Save all invoices (3-7 years)\n   ✓ Track payment received date\n   ✓ Note any partial payments\n   ✓ Document late payments\n   ✓ Keep payment receipts\n\n**Payment Terms Negotiation Tips:**\n\n→ Understand industry standards for your field\n→ For large orders, ask for partial upfront payment\n→ Offer discount for early payment (e.g., \"2/10 Net 30\" = 2% off if paid in 10 days)\n→ For new clients, request 50% upfront\n→ For established clients, Net 30 is standard\n→ Don't accept \"Net 90\" unless absolutely necessary\n→ Get everything in writing, including terms\n\n**Common Mistakes to Avoid:**\n\n⚠ Not specifying payment terms clearly\n⚠ Forgetting to include due date on invoice\n⚠ No late payment penalties specified\n⚠ No payment method listed\n⚠ Losing track of who paid what\n⚠ Accepting verbal promises to pay\n⚠ Not following up on overdue payments\n⚠ Delivering before payment (unless established client)\n\n**If Payment is Late:**\n\n1. Send payment reminder (email + formal letter)\n2. Reference invoice number and amount\n3. Reference agreed-upon due date\n4. Request payment within 5-10 days\n5. Specify late fees will be added if unpaid\n6. Threaten suspension of services\n7. If still unpaid, may pursue collection\n\n**Pro Tip:** For large contracts, require 30-50% deposit before work starts, 50% at milestone, 20% upon completion. This protects your cash flow!\n\nMake sure payment terms are crystal clear to avoid disputes and ensure timely payment. Would you like help with a service agreement or payment contract?`;
  }
  
  return null;
}

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  actionButtons?: ActionButton[] | null;
  attachmentName?: string | null;
  noDocumentMatch?: boolean;
}
interface SessionState { sessionId: string; userName: string | null; stage: string; }
interface CustomDocField { key: string; question: string; }

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.txt,.rtf,.png,.jpg,.jpeg";
const MAX_FILE_MB = 10;
export const OPEN_GRAM_AI_EVENT = "open-gram-ai";

const CUSTOM_DOC_FIELDS: CustomDocField[] = [
  { key: "documentTitle",          question: "What should this document be called? (e.g. \"Partnership Agreement\")" },
  { key: "partyAName",             question: "What is the full name of the first party?" },
  { key: "partyAAddress",          question: "What is the first party's address (or principal place of business)?" },
  { key: "partyBName",             question: "What is the full name of the second party?" },
  { key: "partyBAddress",          question: "What is the second party's address (or principal place of business)?" },
  { key: "effectiveDate",          question: "What date should this agreement take effect? (e.g. \"2026-07-08\")" },
  { key: "purpose",                question: "In a sentence or two, what is the purpose of this agreement?" },
  { key: "keyTerms",               question: "What are the key terms or obligations each party agrees to?" },
  { key: "paymentOrConsideration", question: "Is there any payment, fee, or consideration involved? (or say \"none\")" },
  { key: "duration",               question: "How long does this agreement last, or when does it end?" },
  { key: "governingLaw",           question: "Which country/state's laws should govern this agreement?" },
];

const CUSTOM_DOC_TRIGGERS = [
  "build it new","create new","new form","new document","custom document",
  "not in list","build new","make new","create custom","generate new",
  "i want to build","new doc","banana hai","banao","create it","make a new",
  "build a new","doesn't exist","does not exist","not available","custom doc",
  "draft a","make me a","generate a","create a","write a","prepare a",
];

const QUICK_ACTIONS = [
  { icon: BookOpen,      label: "Find a Document",      desc: "Search and find the right legal document for your needs.",    value: "Help me find the right legal document" },
  { icon: MessageSquare, label: "Ask a Legal Question",  desc: "Get a practical understanding of legal concepts.",            value: "What is a partnership agreement and what clauses should it have?" },
  { icon: BarChart2,     label: "Make a Legal Analysis", desc: "Assess your situation considering facts and legal framework.", value: "I need a legal analysis for my situation" },
  { icon: GitCompare,    label: "Create a Document",     desc: "Build a custom legal document tailored to your needs.",       value: "create new document" },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const ChatWidget = () => {
  const [isOpen, setIsOpen]                     = useState(false);
  const [isAnimatingIn, setIsAnimatingIn]       = useState(false);
  const [isAnimatingOut, setIsAnimatingOut]     = useState(false);
  const [inputMessage, setInputMessage]         = useState("");
  const [isTyping, setIsTyping]                 = useState(false);
  const [isInitializing, setIsInitializing]     = useState(false);
  const [messages, setMessages]                 = useState<Message[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [attachedFile, setAttachedFile]         = useState<File | null>(null);
  const [fileError, setFileError]               = useState<string | null>(null);
  const [hasStarted, setHasStarted]             = useState(false);
  const [session, setSession]                   = useState<SessionState>({ sessionId: "", userName: null, stage: "INIT" });
  const [inCustomDocFlow, setInCustomDocFlow]   = useState(false);
  const [customDocStep, setCustomDocStep]       = useState(0);
  const [customDocAnswers, setCustomDocAnswers] = useState<Record<string, string>>({});

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef         = useRef<HTMLInputElement>(null);
  const inputRef             = useRef<HTMLInputElement>(null);
  const atBottomRef          = useRef(true);

  // Keep a live ref of the session so async callbacks read fresh values
  const sessionRef = useRef(session);
  const lastCustomAnswersRef = useRef<Record<string, string>>({});
  useEffect(() => { sessionRef.current = session; }, [session]);

  /* ── Open / Close ── */
  const openChat = () => {
    setIsOpen(true); setIsAnimatingIn(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsAnimatingIn(false), 400);
  };
  const closeChat = () => {
    setIsAnimatingOut(true);
    setTimeout(() => { setIsOpen(false); setIsAnimatingOut(false); document.body.style.overflow = ""; }, 350);
  };

  useEffect(() => {
    const h = () => openChat();
    window.addEventListener(OPEN_GRAM_AI_EVENT, h);
    return () => window.removeEventListener(OPEN_GRAM_AI_EVENT, h);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") closeChat(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen]);

  const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const addBotMessage = (text: string, actionButtons?: ActionButton[] | null, noDocumentMatch = false) => {
    setMessages(prev => [...prev, {
      id: `${Date.now()}-bot-${Math.random()}`,
      sender: "assistant", text, timestamp: getCurrentTime(),
      actionButtons: actionButtons ?? null, noDocumentMatch,
    }]);
  };

  /* Session init: fully local, backend only for session ID.
     Optionally accepts a first user message so nothing is dropped. */
  const initializeChat = async (pendingText?: string, pendingFile?: File | null) => {
    setIsInitializing(true);

    let sessionId = `local-${Date.now()}`;
    let userName: string | null = null;
    try {
      const r = await LegalgramAPI.initSession();
      sessionId = r.session_id;
      userName = r.user_name ?? null;
    } catch { /* fall back to local session */ }

    const startWithRequest = !!(pendingText && pendingText.trim());
    const nextStage = startWithRequest ? "CHAT" : "CAPTURE_NAME";
    setSession({ sessionId, userName, stage: nextStage });
    sessionRef.current = { sessionId, userName, stage: nextStage };

    const welcome: Message = {
      id: "welcome",
      sender: "assistant",
      timestamp: getCurrentTime(),
      actionButtons: null,
      text: "Hi! I'm Gram AI, your Legalgram legal assistant.\n\nI can help you:\n• **Find the right legal document** from our library\n• **Explain what a document contains** and its key clauses\n• **Build a custom document** tailored to your needs\n\nWhat's your name? (Or just tell me what you need.)",
    };

    if (startWithRequest) {
      const q = pendingText!.trim();
      const lower = q.toLowerCase();
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: "user",
        text: q,
        timestamp: getCurrentTime(),
        attachmentName: pendingFile?.name ?? null,
      };
      setMessages([welcome, userMsg]);
      setIsInitializing(false);
      setIsTyping(true);

      // Custom-doc intent → jump straight into the builder
      if (CUSTOM_DOC_TRIGGERS.some(t => lower.includes(t))) {
        setIsTyping(false);
        setTimeout(() => startCustomDocFlow(), 300);
        return;
      }

      // Otherwise answer from the KB
      const matches = matchDocuments(lower);
      setTimeout(() => {
        setIsTyping(false);
        const reply = buildDocReply(matches, userName, q);
        addBotMessage(reply.text, reply.actionButtons, reply.noDocumentMatch);
      }, 700);
      return;
    }

    setMessages([welcome]);
    setIsInitializing(false);
  };

  /* ── File pick ── */
  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) { setFileError(`File too large (max ${MAX_FILE_MB}MB).`); return; }
    setAttachedFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canSend = (inputMessage.trim().length > 0 || !!attachedFile) && !isTyping && !isInitializing;

  /* ── Custom doc flow ── */
  const startCustomDocFlow = (prefillTitle?: string) => {
    setIsTyping(false); // make sure the typing indicator can never get stuck here
    setHasStarted(true);
    setInCustomDocFlow(true);
    setCustomDocStep(0);
    setCustomDocAnswers(prefillTitle ? { documentTitle: prefillTitle } : {});
    addBotMessage("No problem — I'll help you build a custom document. I'll ask a few quick questions to get the details right.");
    const startStep = prefillTitle ? 1 : 0;
    setCustomDocStep(startStep);
    setTimeout(() => {
      addBotMessage(CUSTOM_DOC_FIELDS[startStep].question);
    }, 450);
  };

  /* Process every message locally first — backend is last resort only.
     IMPORTANT: every return path clears the typing indicator. */
  const processMessageLocally = (text: string, userName: string | null): boolean => {
    const lower = text.toLowerCase().trim();
    const wordCount = lower.split(/\s+/).filter(Boolean).length;
    const stage = sessionRef.current.stage;

    // Does this look like an actual request rather than a name?
    const looksLikeRequest =
      CUSTOM_DOC_TRIGGERS.some(t => lower.includes(t)) ||
      isLegalQuestion(text) ||
      matchDocuments(lower).some(m => m.score >= 2) ||
      wordCount >= 4;

    // 1. Name capture — only when it actually looks like a name
    if (stage === "CAPTURE_NAME" && !looksLikeRequest) {
      const name = text.trim();
      if (name.length > 0) {
        setSession(s => ({ ...s, userName: name, stage: "CHAT" }));
        sessionRef.current = { ...sessionRef.current, userName: name, stage: "CHAT" };
        setTimeout(() => {
          setIsTyping(false); // <-- the core bug fix: clear the typing dots
          addBotMessage(
            `Nice to meet you, **${name}**! \n\nHow can I help you today?\n\n• Ask me **what a document is** and I\'ll explain it with all its key clauses\n• Tell me what you need and I\'ll **find the right document** from our library\n• Or I can **build a custom document** from scratch just for you`,
            [
              { label: "Find a document", value: "Help me find the right legal document", type: "action" as const },
              { label: "What is a Partnership Agreement?", value: "What is a partnership agreement and what clauses should it have?", type: "action" as const },
              { label: "Create custom document", value: "create new document", type: "action" as const },
            ]
          );
        }, 400);
        return true;
      }
    }

    // User skipped the name and asked directly — promote to CHAT and continue
    if (stage === "CAPTURE_NAME") {
      setSession(s => ({ ...s, stage: "CHAT" }));
      sessionRef.current = { ...sessionRef.current, stage: "CHAT" };
    }

    // 2. Custom doc trigger
    if (CUSTOM_DOC_TRIGGERS.some(t => lower.includes(t))) {
      const titleMatch = lower.match(/(?:draft|create|make|generate|write|prepare)\s+(?:a |an |the )?(.+?)(?:\s+for|\s+between|\s+agreement|\s+contract)?$/i);
      const prefill = titleMatch ? titleMatch[1].replace(/(agreement|contract|document|doc)$/i, "").trim() : undefined;
      setIsTyping(false);
      setTimeout(() => startCustomDocFlow(prefill ? prefill.charAt(0).toUpperCase() + prefill.slice(1) : undefined), 300);
      return true;
    }

    // 3. Check for specific legal advice FIRST (before document KB)
    const isQuestion = /^(what|how|explain|tell|describe|define|when|why|can|should|is|are|does|do)\b/i.test(lower);
    const hasLegalTerm = ["legal","law","clause","contract","agreement","document","rights","liability","terms","party","sign","govern"]
      .some(w => lower.includes(w));

    if (isQuestion || /should|must|required|include|termination|notice|period/i.test(lower)) {
      const generalAdvice = getGeneralLegalAdvice(text);
      if (generalAdvice) {
        const relatedDocs = matchDocuments(lower);
        const buttons: ActionButton[] = [];
        if (relatedDocs.length > 0) {
          relatedDocs.slice(0, 2).forEach(m => {
            buttons.push({ label: m.doc.name, value: m.doc.url, type: "link" as const });
          });
        }
        buttons.push({ label: "Browse all documents", value: "/documents", type: "link" as const });
        setTimeout(() => { setIsTyping(false); addBotMessage(generalAdvice, buttons.length > 0 ? buttons : null); }, 700);
        return true;
      }
    }

    // 4. Try KB match for ANY message containing legal terms
    const matches = matchDocuments(lower);

    // Strong KB hit — answer from KB regardless of query form
    if (matches.length > 0 && matches[0].score >= 2) {
      const reply = buildDocReply(matches, userName, text);
      setTimeout(() => { setIsTyping(false); addBotMessage(reply.text, reply.actionButtons, reply.noDocumentMatch); }, 700);
      return true;
    }

    // 5. Informational / question patterns — even with weak KB match, answer from KB
    if (isQuestion && hasLegalTerm) {
      const reply = buildDocReply(matches, userName, text);  // may be empty -> noDocumentMatch
      setTimeout(() => { setIsTyping(false); addBotMessage(reply.text, reply.actionButtons, reply.noDocumentMatch); }, 700);
      return true;
    }

    // 6. Browse / find / search intent
    if (/\b(find|search|look|browse|show|list|need|want|looking for)\b/i.test(lower)) {
      const reply = buildDocReply(matches, userName, text);
      setTimeout(() => { setIsTyping(false); addBotMessage(reply.text, reply.actionButtons, reply.noDocumentMatch); }, 700);
      return true;
    }

    // 7. Default fallback — ANY unmatched query still gets a helpful response locally
    // Instead of waiting for backend, respond immediately with guidance
    const fallbackReply = buildDocReply(matches.length > 0 ? matches : [], userName, text);
    setTimeout(() => { setIsTyping(false); addBotMessage(fallbackReply.text, fallbackReply.actionButtons, true); }, 700);
    return true;
  };

  /* ── Quick action handler ── */
  const handleQuickAction = (value: string) => {
    const lower = value.toLowerCase();
    if (CUSTOM_DOC_TRIGGERS.some(t => lower.includes(t))) { startCustomDocFlow(); return; }
    if (!hasStarted) { setHasStarted(true); initializeChat(); }
    setInputMessage(value);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  /* Action button handler - local KB first, backend only for non-doc queries */
  const handleActionButton = (button: ActionButton) => {
    if (button.type === "link") { window.location.href = button.value; return; }
    // Fallback: build a basic template PDF from the last collected answers (no AI).
    if (button.value === "__fallback_template__") {
      atBottomRef.current = true;
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage("No problem — here's a basic template version, downloading now.");
        generateStructuredDocumentPdf(lastCustomAnswersRef.current || {});
      }, 250);
      return;
    }
    atBottomRef.current = true;
    const msg = button.value;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "user", text: msg, timestamp: getCurrentTime() }]);
    setIsTyping(true);
    const handled = processMessageLocally(msg, sessionRef.current.userName);
    if (!handled) {
      // Non-doc query — backend is acceptable here
      LegalgramAPI.sendMessage(msg, { user_name: sessionRef.current.userName || undefined, stage: "CHAT", session_id: sessionRef.current.sessionId })
        .then(r => {
          setIsTyping(false);
          // Still override with KB if we get a match
          const localMatches = matchDocuments(msg);
          if (localMatches.length > 0) {
            const reply = buildDocReply(localMatches, sessionRef.current.userName, msg);
            addBotMessage(reply.text, reply.actionButtons, reply.noDocumentMatch);
          } else {
            addBotMessage(r.response ?? "How can I help you?", r.action_buttons);
          }
        })
        .catch(() => {
          setIsTyping(false);
          const localMatches = matchDocuments(msg);
          if (localMatches.length > 0) {
            const reply = buildDocReply(localMatches, sessionRef.current.userName, msg);
            addBotMessage(reply.text, reply.actionButtons, reply.noDocumentMatch);
          } else {
            addBotMessage("I\'m having a connection issue. Please try again.", null, false);
          }
        });
    }
  };

  /* ── Main send ── */
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    atBottomRef.current = true;

    // First interaction: start the session AND keep the user's first message
    if (!hasStarted) {
      setHasStarted(true);
      const firstText = inputMessage.trim();
      const firstFile = attachedFile;
      setInputMessage("");
      setAttachedFile(null);
      await initializeChat(firstText || undefined, firstFile);
      return;
    }

    const text = inputMessage.trim();
    const file = attachedFile;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "user", text, timestamp: getCurrentTime(), attachmentName: file?.name ?? null }]);
    setInputMessage("");
    setAttachedFile(null);

    // ── Custom doc flow: collect answers ──
    if (inCustomDocFlow) {
      const cur = CUSTOM_DOC_FIELDS[customDocStep];
      const updated = { ...customDocAnswers, [cur.key]: text };
      setCustomDocAnswers(updated);
      const next = customDocStep + 1;
      if (next < CUSTOM_DOC_FIELDS.length) {
        setCustomDocStep(next);
        setIsTyping(true);
        setTimeout(() => { setIsTyping(false); addBotMessage(CUSTOM_DOC_FIELDS[next].question); }, 350);
      } else {
        setInCustomDocFlow(false);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage("✅ Got everything I need. Drafting your document with Gram AI — this can take up to a minute…");
          generateAIDocument(updated);
        }, 350);
      }
      return;
    }

    // Local KB is the PRIMARY source for ALL doc/legal queries
    setIsTyping(true);
    const handled = processMessageLocally(text, sessionRef.current.userName);
    if (handled) return;

    // Only truly unrecognised queries (greetings, complex analysis) hit backend
    try {
      const r: ChatResponse = await LegalgramAPI.sendMessage(
        text || (file ? `Uploading: ${file.name}` : ""),
        { user_name: sessionRef.current.userName || undefined, stage: "CHAT", session_id: sessionRef.current.sessionId }
      );
      setIsTyping(false);
      const localMatches = matchDocuments(text);
      if (localMatches.length > 0) {
        // KB match found — use it, ignore backend response
        const reply = buildDocReply(localMatches, sessionRef.current.userName, text);
        addBotMessage(reply.text, reply.actionButtons, reply.noDocumentMatch);
      } else {
        // Non-doc query — backend reply is acceptable
        addBotMessage(r.response ?? "I\'m here to help! Try asking about a specific legal document or say \"create document\".");
      }
    } catch {
      setIsTyping(false);
      const localMatches = matchDocuments(text);
      
      // Try general legal advice first
      const generalAdvice = getGeneralLegalAdvice(text);
      if (generalAdvice) {
        const buttons: ActionButton[] = [];
        if (localMatches.length > 0) {
          localMatches.slice(0, 2).forEach(m => {
            buttons.push({ label: m.doc.name, value: m.doc.url, type: "link" as const });
          });
        }
        buttons.push({ label: "Browse all documents", value: "/documents", type: "link" as const });
        addBotMessage(generalAdvice, buttons.length > 0 ? buttons : null);
        return;
      }
      
      if (localMatches.length > 0) {
        const reply = buildDocReply(localMatches, sessionRef.current.userName, text);
        addBotMessage(reply.text, reply.actionButtons, reply.noDocumentMatch);
      } else {
        addBotMessage(
          `I'm having trouble connecting right now, but I'd love to help!\n\nI can help you:\n• **Find legal documents** from our library of 230+ templates\n• **Explain legal terms** and concepts\n• **Create a custom document** tailored to your needs\n\nWhat would you like to do?`,
          [
            { label: "Browse Documents", value: "/documents", type: "link" as const },
            { label: "Create Document", value: "create new document", type: "action" as const },
          ]
        );
      }
    }
  };

  /* ── AI document generation (Claude via edge function) ── */
  const generateAIDocument = async (answers: Record<string, string>) => {
    const documentType = (answers.documentTitle || "Custom Agreement").trim();
    const { document, error } = await generateDocumentWithAI({ documentType, details: answers });

    if (error || !document) {
      addBotMessage(
        `⚠️ ${error || "I couldn't generate that document just now."}\n\nYou can try again, or I can fall back to a basic template.`,
        [
          { label: "Try again", value: "create new document", type: "action" },
          { label: "Use a basic template", value: "__fallback_template__", type: "action" },
        ],
      );
      // Stash answers so a fallback can reuse them.
      lastCustomAnswersRef.current = answers;
      return;
    }

    // Render Claude's draft into a downloadable PDF…
    renderTextToPdf(documentType, document);

    // …and show it in the chat so the user can read it immediately.
    addBotMessage(
      `✅ **${documentType}** is ready and has been downloaded as a PDF.\n\nHere's the draft:\n\n${document}`,
      [
        { label: "Create another document", value: "create new document", type: "action" },
        { label: "Browse all documents", value: "/documents", type: "link" },
      ],
    );
  };

  /* ── Render document text into a clean, professionally formatted PDF ── */
  const renderTextToPdf = (documentType: string, text: string) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pw = 595, ph = 842;
    const mx = 64, top = 78, bottom = ph - 70;
    const cw = pw - mx * 2;
    let y = top;

    const ensure = (h: number) => { if (y + h > bottom) { doc.addPage(); y = top; } };

    const rawLines = text.replace(/\r\n/g, "\n").split("\n");
    // Drop leading blank lines.
    while (rawLines.length && rawLines[0].trim() === "") rawLines.shift();

    let titleDone = false;
    rawLines.forEach((raw) => {
      // Strip markdown bold markers and trailing whitespace.
      const line = raw.replace(/\*\*/g, "").replace(/^#+\s*/, "").trimEnd();
      if (line.trim() === "") { y += 9; return; }

      const trimmed = line.trim();
      const letters = trimmed.replace(/[^A-Za-z]/g, "");
      const isAllCaps = letters.length > 1 && letters === letters.toUpperCase();

      // 1) TITLE — the first non-empty line: centered, bold, underlined.
      if (!titleDone) {
        titleDone = true;
        doc.setFont("times", "bold");
        doc.setFontSize(16);
        const wrapped = doc.splitTextToSize(trimmed.toUpperCase(), cw);
        ensure(wrapped.length * 20 + 16);
        wrapped.forEach((w: string) => {
          doc.text(w, pw / 2, y, { align: "center" });
          y += 20;
        });
        // underline under the (widest) title line
        const tw = Math.min(cw, doc.getTextWidth(wrapped[0]));
        doc.setLineWidth(1);
        doc.line((pw - tw) / 2, y - 6, (pw + tw) / 2, y - 6);
        y += 18;
        return;
      }

      // 2) DISCLAIMER — the closing generated-by line: small, italic, separated.
      if (/^["“]?This document was generated/i.test(trimmed)) {
        y += 10;
        ensure(40);
        doc.setDrawColor(180);
        doc.setLineWidth(0.5);
        doc.line(mx, y, pw - mx, y);
        y += 14;
        doc.setFont("times", "italic");
        doc.setFontSize(8.5);
        doc.setTextColor(120);
        const wrapped = doc.splitTextToSize(trimmed.replace(/^["“]|["”]$/g, ""), cw);
        doc.text(wrapped, mx, y);
        y += wrapped.length * 12;
        doc.setTextColor(0);
        return;
      }

      // 3) SECTION HEADING — "1. PURPOSE" or a short ALL-CAPS line (RECITALS…).
      const isNumberedHeading = /^\d+\.\s+\S/.test(trimmed) && trimmed.length < 80;
      const isCapsHeading = isAllCaps && trimmed.length < 70;
      if (isNumberedHeading || isCapsHeading) {
        doc.setFont("times", "bold");
        doc.setFontSize(11.5);
        const wrapped = doc.splitTextToSize(trimmed, cw);
        ensure(wrapped.length * 15 + 14);
        y += 10; // space above heading
        doc.text(wrapped, mx, y);
        y += wrapped.length * 15 + 3;
        return;
      }

      // 4) BODY paragraph — justified, comfortable line height.
      doc.setFont("times", "normal");
      doc.setFontSize(11);
      const wrapped = doc.splitTextToSize(line, cw);
      const lh = 15.5;
      ensure(wrapped.length * lh + 6);
      // Justify all lines except the last of the paragraph.
      wrapped.forEach((w: string, i: number) => {
        const isLast = i === wrapped.length - 1;
        doc.text(w, mx, y, isLast ? undefined : { align: "justify", maxWidth: cw });
        y += lh;
      });
      y += 5; // paragraph spacing
    });

    // Page numbers on every page.
    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFont("times", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(140);
      doc.text(`Page ${i} of ${pages}`, pw / 2, ph - 32, { align: "center" });
      doc.setTextColor(0);
    }

    const safe = documentType.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    doc.save(`${safe || "document"}-${Date.now()}.pdf`);
  };

  /* ── PDF generator (basic template fallback — no AI) ── */
  const generateStructuredDocumentPdf = (answers: Record<string, string>) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const mx = 56, pw = 595, cw = pw - mx * 2; let y = 64;
    const pA = answers.partyAName || "Party A", pAA = answers.partyAAddress || "[address]";
    const pB = answers.partyBName || "Party B", pBA = answers.partyBAddress || "[address]";
    const ed = answers.effectiveDate || "[date]";
    const es = (n: number) => { if (y + n > 770) { doc.addPage(); y = 64; } };
    const wp = (t: string, bold = false, gap = 14, size = 10.5) => {
      doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(size);
      const lines = doc.splitTextToSize(t, cw); es(lines.length * (size * 1.35) + gap);
      doc.text(lines, mx, y); y += lines.length * (size * 1.35) + gap;
    };
    const wh = (t: string) => {
      es(32); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
      doc.text(t, pw / 2, y, { align: "center" });
      const tw = doc.getTextWidth(t), ux = (pw / 2) - (tw / 2);
      doc.setLineWidth(0.5); doc.line(ux, y + 2, ux + tw, y + 2); y += 20;
    };
    const title = (answers.documentTitle || "Custom Agreement").toUpperCase();
    doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    const tl = doc.splitTextToSize(title, cw);
    doc.text(tl, pw / 2, y, { align: "center" });
    tl.forEach((l: string, i: number) => { const lw = doc.getTextWidth(l), lx = (pw / 2) - (lw / 2); doc.setLineWidth(0.8); doc.line(lx, y + (i * 22) + 3, lx + lw, y + (i * 22) + 3); });
    y += tl.length * 22 + 14;
    wp(`This ${answers.documentTitle || "Agreement"} is made and entered into as of ${ed}, by and between ${pA}, having its principal office at ${pAA}, and ${pB}, having its principal office at ${pBA}.`);
    wp(`Each may be referred to individually as a "Party" and collectively as the "Parties."`);
    wp(`In consideration of the mutual promises contained herein, the Parties agree as follows:`, false, 18);

    // If the document matches a known type, include its standard clauses
    const docMatches = matchDocuments(answers.documentTitle || "");
    const standardClauses = docMatches.length > 0 ? docMatches[0].doc.clauses : [];

    let sn = 1;
    wh(`${sn++}. PURPOSE`); wp(answers.purpose || "[not provided]");
    wh(`${sn++}. KEY TERMS AND OBLIGATIONS`); wp(answers.keyTerms || "[not provided]");
    wh(`${sn++}. PAYMENT / CONSIDERATION`); wp(answers.paymentOrConsideration || "None specified.");
    wh(`${sn++}. TERM AND DURATION`); wp(`This Agreement takes effect on ${ed} and continues until ${answers.duration || "terminated by mutual written consent"}.`);
    if (standardClauses.length > 0) {
      wh(`${sn++}. STANDARD PROVISIONS`);
      standardClauses.forEach(c => wp(`• ${c}`));
    }
    wh(`${sn++}. GOVERNING LAW`); wp(`This Agreement is governed by the laws of ${answers.governingLaw || "[not provided]"}.`);
    wh(`${sn++}. AMENDMENT`); wp("This Agreement may only be amended in writing signed by both Parties.");
    wh(`${sn++}. SEVERABILITY`); wp("If any provision is held invalid, the remaining provisions continue in full force.");
    wh(`${sn++}. ENTIRE AGREEMENT`); wp("This Agreement supersedes all prior negotiations and agreements on this subject matter.");
    es(140); wh(`${sn++}. SIGNATORIES`); y += 6;
    const sb = (name: string) => {
      es(90); doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
      doc.text(`[${name}]`, mx, y); y += 22; doc.setFont("helvetica", "normal");
      doc.text("By: ___________________________", mx, y); y += 20;
      doc.text(`Name: ${name}`, mx, y); y += 20;
      doc.text("Title: ___________________________", mx, y); y += 20;
      doc.text("Date: ___________________________", mx, y); y += 30;
    };
    sb(pA); sb(pB);
    es(40); doc.setFont("helvetica", "italic"); doc.setFontSize(8.5); doc.setTextColor(140);
    doc.text("Generated by Gram AI · Legalgram. Not reviewed by an attorney. Please review before use.", mx, y, { maxWidth: cw });
    const safe = (answers.documentTitle || "custom-agreement").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    doc.save(`${safe}-${Date.now()}.pdf`);
    addBotMessage(
      `✅ **"${answers.documentTitle || "Your document"}"** has been downloaded!\n\nPlease review it carefully before use, as it has not been reviewed by a licensed attorney.`,
      [{ label: "Create another document", value: "create new document", type: "action" }, { label: "Browse all documents", value: "/documents", type: "link" }]
    );
  };

  /* ── Scroll helpers ── */
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = messagesContainerRef.current;
    if (el) { el.scrollTo({ top: el.scrollHeight, behavior }); atBottomRef.current = true; setShowScrollButton(false); }
  };
  const handleScroll = () => {
    const el = messagesContainerRef.current; if (!el) return;
    const d = el.scrollHeight - el.scrollTop - el.clientHeight;
    atBottomRef.current = d < 80; setShowScrollButton(!atBottomRef.current);
  };
  useEffect(() => { if (atBottomRef.current) scrollToBottom(); else setShowScrollButton(true); }, [messages, isTyping]);

  /* ── Render markdown-lite ── */
  const renderText = (text: string) => text.split("\n").map((line, i) => {
    const l = line
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/^• /, "• ")
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="underline text-bright-orange-600">$1</a>');
    return <p key={i} className={`text-sm leading-relaxed ${line.startsWith("• ") ? "ml-1" : ""}`} dangerouslySetInnerHTML={{ __html: l }} />;
  });

  const resetChat = () => {
    setHasStarted(false); setMessages([]);
    setSession({ sessionId: "", userName: null, stage: "INIT" });
    sessionRef.current = { sessionId: "", userName: null, stage: "INIT" };
    setInCustomDocFlow(false); setInputMessage("");
    setCustomDocAnswers({}); setCustomDocStep(0);
    setIsTyping(false);
  };

  /* ── Slide animation ── */
  const overlayStyle: React.CSSProperties = {
    position: "fixed", inset: 0, zIndex: 9999,
    display: "flex", flexDirection: "column", background: "#fff",
    transform: isAnimatingIn ? "translateX(100%)" : isAnimatingOut ? "translateX(100%)" : "translateX(0)",
    transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    willChange: "transform",
  };

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <>
      {isOpen && (
        <div style={overlayStyle}>

          {/* ── HEADER ── */}
          <div className="shrink-0 bg-gradient-to-r from-deep-blue-500 to-deep-blue-600 px-4 py-3 flex items-center gap-3 shadow-sm">
            <button onClick={closeChat} className="text-blue-200 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Go back">
              <ArrowLeft size={20} />
            </button>
            <div className="w-9 h-9 rounded-full bg-bright-orange-500 flex items-center justify-center shadow">
              <Scale size={17} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                Gram AI <Sparkles size={12} className="text-yellow-300" />
              </h3>
              <p className="text-[11px] text-blue-200 truncate">
                {isTyping ? "Typing…" : session.userName ? `Helping ${session.userName}` : "Legalgram Legal Assistant"}
              </p>
            </div>
            {hasStarted && messages.length > 0 && (
              <button onClick={resetChat} className="text-blue-200 hover:text-white text-[11px] px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors border border-white/20">
                Home
              </button>
            )}
          </div>

          {/* ── LANDING VIEW ── */}
          {!hasStarted && (
            <div className="flex flex-col items-center justify-start pt-10 px-5 pb-8 flex-1 overflow-y-auto bg-white max-w-2xl mx-auto w-full">
              <div className="w-14 h-14 rounded-full bg-bright-orange-500 flex items-center justify-center shadow-md mb-6">
                <Scale size={26} className="text-white" />
              </div>
              <h2 className="font-serif text-[1.75rem] leading-[1.2] font-medium text-gray-900 text-center tracking-tight mb-2 px-2">
                AI Agent for Legal Documents
              </h2>
              <p className="text-[12px] text-gray-400 text-center mb-8">Powered by Gram AI · Legalgram</p>

              {/* Search box */}
              <div className="w-full rounded-2xl border border-gray-200 shadow-sm bg-white mb-6 overflow-hidden transition-all focus-within:border-bright-orange-300 focus-within:shadow-md">
                <div className="flex items-center gap-2.5 px-4 py-4">
                  <div className="w-8 h-8 rounded-lg bg-bright-orange-500 flex items-center justify-center shrink-0">
                    <Scale size={14} className="text-white" />
                  </div>
                  <Search size={16} className="text-gray-400 shrink-0" />
                  <input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && inputMessage.trim()) handleSendMessage(e as any); }}
                    placeholder="Ask about any legal document…"
                    className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                  />
                  <button type="button" onClick={e => { if (inputMessage.trim()) handleSendMessage(e as any); }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0 ${inputMessage.trim() ? "bg-bright-orange-500 text-white shadow" : "border border-gray-200 text-gray-300"}`}>
                    <ArrowUp size={15} />
                  </button>
                </div>
                <div className="flex items-center gap-2 px-4 pb-4 border-t border-gray-100 pt-3">
                  <input ref={fileInputRef} type="file" accept={ACCEPTED_TYPES} className="hidden" onChange={handleFilePick} />
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-bright-orange-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-bright-orange-300 transition-colors">
                    <span className="font-medium">+</span> Add
                  </button>
                  <button type="button" className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-300 transition-colors">
                    <SlidersHorizontal size={12} /> Filters
                  </button>
                  <button type="button" className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-300 transition-colors">
                    <Zap size={12} /> Light
                  </button>
                  {attachedFile && (
                    <div className="flex items-center gap-1 bg-orange-50 border border-bright-orange-200 rounded-lg px-2 py-1 ml-auto">
                      <FileText size={12} className="text-bright-orange-500" />
                      <span className="text-[11px] text-gray-600 truncate max-w-[90px]">{attachedFile.name}</span>
                      <button type="button" onClick={() => setAttachedFile(null)}><X size={11} className="text-gray-400" /></button>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {QUICK_ACTIONS.map((action, i) => (
                  <button key={i} type="button" onClick={() => handleQuickAction(action.value)}
                    className="flex flex-col items-start gap-2.5 p-4 rounded-xl border border-gray-200 bg-white hover:border-bright-orange-300 hover:bg-orange-50/40 transition-all text-left group">
                    <action.icon size={20} className="text-bright-orange-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 leading-tight">{action.label}</span>
                    <span className="text-[11px] text-gray-400 leading-snug">{action.desc}</span>
                  </button>
                ))}
              </div>

              {/* Doc count badge */}
              <div className="mt-6 flex items-center gap-2 text-[11px] text-gray-400">
                <CheckCircle size={13} className="text-green-500" />
                {DOCUMENT_KB.length} legal document types available · Custom creation for anything else
              </div>
            </div>
          )}

          {/* ── CHAT VIEW ── */}
          {hasStarted && (
            <>
              <div className="relative flex-1 min-h-0">
                <div ref={messagesContainerRef} onScroll={handleScroll}
                  className="absolute inset-0 overflow-y-auto overscroll-contain bg-gray-50 py-5 scroll-smooth">
                  <div className="max-w-3xl mx-auto px-4">
                    {isInitializing ? (
                      <div className="flex items-center justify-center h-32">
                        <Loader2 size={24} className="animate-spin text-bright-orange-500" />
                        <span className="ml-2 text-gray-400 text-sm">Starting…</span>
                      </div>
                    ) : (
                      <>
                        {messages.map(msg => (
                          <div key={msg.id} className={`mb-4 flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.sender === "assistant" && (
                              <div className="w-9 h-9 rounded-full bg-bright-orange-500 flex items-center justify-center shadow shrink-0 mt-0.5">
                                <Scale size={15} className="text-white" />
                              </div>
                            )}
                            <div className={`${msg.sender === "user"
                              ? "bg-bright-orange-500 text-white rounded-2xl rounded-br-md max-w-[60%]"
                              : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-md max-w-[70%]"
                            } px-4 py-3 shadow-sm`}>
                              {msg.sender === "assistant" && (
                                <p className="text-[10px] uppercase tracking-widest text-bright-orange-500 font-bold mb-1.5">Gram AI</p>
                              )}
                              {msg.sender === "user" && (
                                <p className="text-[10px] uppercase tracking-widest text-orange-100 font-bold mb-1.5 flex items-center gap-1">
                                  <User size={10} />{session.userName || "You"}
                                </p>
                              )}
                              {msg.attachmentName && (
                                <div className={`mb-2 flex items-center gap-2 rounded-lg px-2.5 py-2 ${msg.sender === "user" ? "bg-white/15" : "bg-gray-100"}`}>
                                  <FileText size={13} className={msg.sender === "user" ? "text-white" : "text-bright-orange-500"} />
                                  <span className="text-xs truncate max-w-[12rem]">{msg.attachmentName}</span>
                                </div>
                              )}
                              {msg.text && (
                                <div className={msg.sender === "user" ? "text-white" : "text-gray-700"}>
                                  {renderText(msg.text)}
                                </div>
                              )}
                              {msg.actionButtons && msg.actionButtons.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {msg.actionButtons.map((btn, idx) => (
                                    <button key={idx} type="button" onClick={() => handleActionButton(btn)}
                                      className="text-xs bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                                      {btn.type === "link" && <ExternalLink size={10} />}{btn.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                              {msg.noDocumentMatch && (
                                <div className="mt-3">
                                  <button type="button" onClick={() => startCustomDocFlow()}
                                    className="text-xs bg-deep-blue-600 hover:bg-deep-blue-700 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <FileDown size={11} /> Build a Custom Document
                                  </button>
                                </div>
                              )}
                              <p className={`text-[10px] ${msg.sender === "user" ? "text-orange-100" : "text-gray-400"} text-right mt-2`}>
                                {msg.timestamp}{msg.sender === "user" ? " ✓✓" : ""}
                              </p>
                            </div>
                            {msg.sender === "user" && (
                              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                                <User size={15} className="text-gray-500" />
                              </div>
                            )}
                          </div>
                        ))}
                        {isTyping && (
                          <div className="mb-4 flex gap-2.5 justify-start">
                            <div className="w-9 h-9 rounded-full bg-bright-orange-500 flex items-center justify-center shadow shrink-0 mt-0.5">
                              <Scale size={15} className="text-white" />
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                              <p className="text-[10px] uppercase tracking-widest text-bright-orange-500 font-bold mb-2">Gram AI</p>
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-bright-orange-500 animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 rounded-full bg-bright-orange-500 animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 rounded-full bg-bright-orange-500 animate-bounce" />
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {showScrollButton && (
                  <button type="button" onClick={() => scrollToBottom()}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-bright-orange-500 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 z-10">
                    <ChevronDown size={14} /> Latest
                  </button>
                )}
              </div>

              {/* File preview */}
              {(attachedFile || fileError) && (
                <div className="shrink-0 bg-white pt-2 border-t border-gray-100">
                  <div className="max-w-3xl mx-auto px-4">
                    {attachedFile && (
                      <div className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText size={14} className="text-bright-orange-500 shrink-0" />
                          <span className="text-xs text-gray-700 truncate">{attachedFile.name}</span>
                        </div>
                        <button type="button" onClick={() => setAttachedFile(null)}><X size={13} className="text-gray-400 hover:text-gray-600" /></button>
                      </div>
                    )}
                    {fileError && <p className="text-[11px] text-red-500 mt-1 px-1">{fileError}</p>}
                  </div>
                </div>
              )}

              {/* Input bar */}
              <form onSubmit={handleSendMessage} className="shrink-0 bg-white border-t border-gray-100">
                <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
                  <input ref={fileInputRef} type="file" accept={ACCEPTED_TYPES} className="hidden" onChange={handleFilePick} />
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl p-2 text-gray-400 hover:text-bright-orange-500 hover:bg-gray-50 transition-colors shrink-0"
                    disabled={isTyping || isInitializing}>
                    <Paperclip size={18} />
                  </button>
                  <input
                    ref={inputRef} type="text" value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder={
                      inCustomDocFlow ? "Type your answer…"
                        : session.stage === "CAPTURE_NAME" ? "Enter your name…"
                        : "Ask about any legal document…"
                    }
                    className="flex-1 min-w-0 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-bright-orange-500 bg-gray-50"
                    disabled={isTyping || isInitializing}
                  />
                  <button type="submit"
                    className={`rounded-xl p-3 transition-all shrink-0 ${canSend ? "bg-bright-orange-500 hover:bg-bright-orange-600 text-white shadow-md" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
                    disabled={!canSend}>
                    {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
              </form>

              <div className="shrink-0 bg-gray-50 px-4 py-2 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 text-center">AI responses are for guidance only, not legal advice.</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button type="button" onClick={openChat}
            className="bg-bright-orange-500 hover:bg-bright-orange-600 transition-all rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105"
            aria-label="Open Gram AI">
            <Scale size={24} className="text-white" />
          </button>
        </div>
      )}
    </>
  );
};

export default ChatWidget;