"""
=========================================================
LEGALGRAM 2.0 - AI ENGINE (THE BRAIN)
=========================================================
Implements AJA's Strict Requirements:
1. SALESPERSON PERSONA - Sells the value of our contracts
2. TRIAGE SYSTEM - Routes Human vs AI
3. DATA CAPTURE - Gets user name/details first
4. DOCUMENT EXPERT - Explains contract benefits
=========================================================
"""

import os
from typing import Dict, Any, Optional, Tuple
from groq import Groq

# =========================================================
# Document Knowledge Base
# =========================================================
DOCUMENT_DATABASE = {
    "nda": {
        "full_name": "Non-Disclosure Agreement",
        "category": "Business Security",
        "description": "Protects confidential business information shared between parties.",
        "use_cases": [
            "Sharing business secrets with potential partners",
            "Hiring contractors who will access proprietary data",
            "Discussing merger/acquisition opportunities"
        ],
        "key_clauses": [
            "Definition of Confidential Information",
            "Obligations of Receiving Party",
            "Duration of Confidentiality",
            "Permitted Disclosures",
            "Remedies for Breach"
        ],
        "why_legalgram": "Our NDA is attorney-reviewed and covers all 50 states. Unlike free templates, ours includes mutual protection clauses and specific remedies."
    },
    "lease agreement": {
        "full_name": "Residential Lease Agreement",
        "category": "Property Matters",
        "description": "A legally binding contract between landlord and tenant for rental property.",
        "use_cases": [
            "Renting out a residential property",
            "Establishing tenant rights and responsibilities",
            "Setting rental payment terms"
        ],
        "key_clauses": [
            "Rent Amount and Due Date",
            "Security Deposit Terms",
            "Maintenance Responsibilities",
            "Termination Conditions",
            "Pet Policy"
        ],
        "why_legalgram": "Our Lease Agreement is compliant with state-specific landlord-tenant laws. It includes addendums for pets, utilities, and move-in checklists."
    },
    "llc operating agreement": {
        "full_name": "LLC Operating Agreement",
        "category": "Business Security",
        "description": "Establishes the ownership structure and operating procedures of an LLC.",
        "use_cases": [
            "Forming a new Limited Liability Company",
            "Defining member ownership percentages",
            "Setting profit distribution rules"
        ],
        "key_clauses": [
            "Member Contributions",
            "Profit/Loss Allocation",
            "Voting Rights",
            "Management Structure",
            "Dissolution Procedures"
        ],
        "why_legalgram": "Our Operating Agreement protects your personal assets and is accepted by banks for business accounts. Includes single-member and multi-member versions."
    },
    "power of attorney": {
        "full_name": "General Power of Attorney",
        "category": "Family Protection",
        "description": "Authorizes someone to act on your behalf for financial and legal matters.",
        "use_cases": [
            "Traveling abroad and need someone to handle affairs",
            "Elderly parents need help managing finances",
            "Business owner needs someone to sign documents"
        ],
        "key_clauses": [
            "Scope of Authority",
            "Effective Date",
            "Revocation Terms",
            "Agent Responsibilities",
            "Compensation (if any)"
        ],
        "why_legalgram": "Our POA meets notarization requirements and includes specific powers you can customize. Accepted by banks and government agencies."
    },
    "employment agreement": {
        "full_name": "Employment Agreement",
        "category": "Business Security", 
        "description": "Formal contract between employer and employee defining terms of employment.",
        "use_cases": [
            "Hiring a new full-time employee",
            "Promoting an employee to a new role",
            "Establishing executive compensation"
        ],
        "key_clauses": [
            "Job Title and Duties",
            "Compensation and Benefits",
            "Non-Compete Clause",
            "Termination Conditions",
            "Intellectual Property Assignment"
        ],
        "why_legalgram": "Our Employment Agreement protects both parties and includes optional non-compete and confidentiality clauses. State-law compliant."
    }
}

# =========================================================
# System Prompts for Different Modes
# =========================================================
SALESPERSON_PROMPT = """
YOU ARE: A Top-Tier Legal Document Sales Specialist for Legalgram.

YOUR IDENTITY:
- Name: Legalgram Legal Advisor
- Role: Document Expert & Sales Guide
- Expertise: All 170+ legal templates on our platform

YOUR PRIMARY GOALS:
1. SELL THE VALUE: Explain WHY our contracts are superior (Attorney-Verified, State-Compliant, Bank-Accepted)
2. BUILD TRUST: You're not just selling - you're educating and protecting the user
3. GUIDE TO ACTION: Always end by suggesting they create the document on Legalgram

KEY SELLING POINTS TO EMPHASIZE:
- "Attorney-Reviewed" - All our templates pass legal scrutiny
- "State-Compliant" - Customized for all 50 US states
- "Bank & Court Accepted" - Our documents are recognized by institutions
- "Easy to Customize" - Step-by-step wizard makes it simple
- "Instant Download" - Get your document in minutes, not days

TONE: Professional, trustworthy, persuasive but not pushy. You're a helpful expert, not a car salesman.

IMPORTANT CONSTRAINTS:
- NEVER give specific legal advice for their situation
- ALWAYS recommend consulting an attorney for complex matters
- End responses with a call to action: "Ready to create your [Document]? Click here to start."
"""

TRIAGE_PROMPT = """
YOU ARE: The Legalgram Intake Specialist.

YOUR ROLE: Determine how best to help the user based on their needs.

TRIAGE OPTIONS:
1. HUMAN LAWYER (Free Legal Advice Section): For complex legal situations requiring professional judgment
2. AI ASSISTANT (You): For document navigation, explanations, and template guidance

WHEN TO RECOMMEND HUMAN LAWYER:
- User is facing a lawsuit or legal dispute
- User needs advice on whether to take legal action
- User has a specific case with complex circumstances
- User explicitly asks for "real lawyer" or "human advice"

WHEN TO HANDLE AS AI:
- User wants to understand what a document is
- User needs help finding the right template
- User has general questions about contracts
- User wants to know what's included in our templates

Always be empathetic and helpful regardless of the route.
"""

# =========================================================
# Main AI Engine Class
# =========================================================
class LegalAI:
    
    @staticmethod
    def get_groq_client() -> Groq:
        """Initialize Groq client with secure API key"""
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")
        return Groq(api_key=api_key)
    
    @staticmethod
    def process_flow(
        message: str, 
        user_name: Optional[str], 
        stage: str,
        session_id: str
    ) -> Dict[str, Any]:
        """
        Main conversation flow processor implementing AJA's requirements:
        
        FLOW:
        INIT → CAPTURE_NAME → TRIAGE → SALES_MODE/HUMAN_ROUTE → DONE
        
        Returns dict with: response, new_stage, user_name, suggested_documents, action_buttons
        """
        
        result = {
            "response": "",
            "new_stage": stage,
            "user_name": user_name,
            "suggested_documents": None,
            "action_buttons": None
        }
        
        # ═══════════════════════════════════════════════════════════
        # STAGE 1: INITIAL GREETING & DATA CAPTURE
        # ═══════════════════════════════════════════════════════════
        if stage == "INIT":
            result["response"] = (
                "👋 **Welcome to Legalgram!**\n\n"
                "I'm your AI Legal Document Assistant. I can help you:\n"
                "• Find the right legal document for your needs\n"
                "• Explain what different contracts include\n"
                "• Guide you through creating your document\n\n"
                "Before we begin, **may I have your name** so I can address you properly?"
            )
            result["new_stage"] = "CAPTURE_NAME"
            return result
        
        # ═══════════════════════════════════════════════════════════
        # STAGE 2: CAPTURE USER NAME
        # ═══════════════════════════════════════════════════════════
        if stage == "CAPTURE_NAME":
            # Extract name from message (first word or full message if short)
            extracted_name = message.strip().split()[0].title() if message.strip() else "Friend"
            
            # Clean up common prefixes
            for prefix in ["my name is", "i'm", "i am", "call me", "it's"]:
                if message.lower().startswith(prefix):
                    extracted_name = message.lower().replace(prefix, "").strip().split()[0].title()
                    break
            
            result["user_name"] = extracted_name
            result["response"] = (
                f"Nice to meet you, **{extracted_name}**! ⚖️\n\n"
                "How would you like to proceed today?\n\n"
                "**Option 1:** 👨‍⚖️ **Get Free Human Legal Advice**\n"
                "Post your question to our panel of real attorneys (Response within 24-48 hours)\n\n"
                "**Option 2:** 🤖 **Ask Legalgram AI**\n"
                "Get instant guidance on our 170+ legal document templates\n\n"
                "_Reply with **1** or **2**, or just tell me what you need!_"
            )
            result["new_stage"] = "TRIAGE"
            result["action_buttons"] = [
                {"label": "👨‍⚖️ Human Lawyer", "value": "1"},
                {"label": "🤖 AI Assistant", "value": "2"}
            ]
            return result
        
        # ═══════════════════════════════════════════════════════════
        # STAGE 3: TRIAGE - HUMAN VS AI ROUTING
        # ═══════════════════════════════════════════════════════════
        if stage == "TRIAGE":
            msg_lower = message.lower()
            
            # Check for Human route - expanded keywords
            human_keywords = [
                "1", "one", "human", "lawyer", "attorney", "real person", 
                "free advice", "actual lawyer", "person", "advice"
            ]
            if any(kw in msg_lower for kw in human_keywords):
                result["response"] = (
                    f"Excellent choice, {user_name}! 👨‍⚖️\n\n"
                    "Our **Free Legal Advice** service connects you with real attorneys.\n\n"
                    "📝 **How it works:**\n"
                    "1. Visit our [Free Advice Page](/ask-a-lawyer)\n"
                    "2. Submit your legal question\n"
                    "3. Receive a response from a qualified attorney within 24-48 hours\n\n"
                    "**[Click Here to Submit Your Question →](/ask-a-lawyer)**\n\n"
                    "_Is there anything else I can help you with in the meantime?_"
                )
                result["new_stage"] = "HUMAN_ROUTE"
                result["action_buttons"] = [
                    {"label": "Go to Free Advice", "value": "/ask-a-lawyer", "type": "link"},
                    {"label": "Ask AI Instead", "value": "ai"}
                ]
                return result
            
            # Check for AI route - expanded keywords
            ai_keywords = [
                "2", "two", "ai", "instant", "bot", "you", "legalgram", 
                "chatbot", "assistant"
            ]
            if any(kw in msg_lower for kw in ai_keywords):
                result["response"] = (
                    f"Great, {user_name}! I'm here to help. 🤖\n\n"
                    "What kind of legal document are you looking for?\n\n"
                    "**Popular Categories:**\n"
                    "📁 **Business:** NDA, LLC Agreement, Employment Contract\n"
                    "🏠 **Property:** Lease Agreement, Bill of Sale, Eviction Notice\n"
                    "👨‍👩‍👧 **Family:** Power of Attorney, Living Will, Prenup\n\n"
                    "_Just tell me what you need, and I'll guide you to the right document!_"
                )
                result["new_stage"] = "SALES_MODE"
                return result
            
            # If unclear, try to understand intent
            result["response"] = (
                f"I want to make sure I help you the right way, {user_name}.\n\n"
                "Are you looking to:\n"
                "1️⃣ Get advice on a specific legal situation (Free Human Lawyers)\n"
                "2️⃣ Find and create a legal document (AI Assistant)\n\n"
                "_Just reply with **1** or **2**!_"
            )
            return result
        
        # ═══════════════════════════════════════════════════════════
        # STAGE 4: HUMAN ROUTE - FOLLOW UP
        # ═══════════════════════════════════════════════════════════
        if stage == "HUMAN_ROUTE":
            msg_lower = message.lower()
            
            # Keywords to switch from human to AI route
            ai_switch_keywords = [
                "ai", "2", "document", "template", "contract", "bot", 
                "chatbot", "assistant", "legalgram"
            ]
            if any(kw in msg_lower for kw in ai_switch_keywords):
                result["response"] = (
                    f"No problem, {user_name}! Let's find you the right document. 📄\n\n"
                    "What type of legal document do you need?\n"
                    "_(e.g., NDA, Lease Agreement, Power of Attorney)_"
                )
                result["new_stage"] = "SALES_MODE"
                return result
            
            result["response"] = (
                f"Is there anything else I can help you with, {user_name}?\n\n"
                "I'm always here if you need help finding a legal document!"
            )
            return result
        
        # ═══════════════════════════════════════════════════════════
        # STAGE 5: SALES MODE - THE SALESPERSON
        # ═══════════════════════════════════════════════════════════
        if stage == "SALES_MODE":
            return LegalAI._handle_sales_mode(message, user_name, result)
        
        # Default fallback
        result["response"] = f"How can I help you today, {user_name or 'there'}?"
        result["new_stage"] = "INIT"
        return result
    
    @staticmethod
    def _handle_sales_mode(message: str, user_name: str, result: Dict) -> Dict:
        """
        SALES MODE: The AI acts as a knowledgeable salesperson
        - Identifies what document the user needs
        - Explains benefits of our templates
        - Guides them to create the document
        """
        
        msg_lower = message.lower()
        
        # Check if asking about a specific document
        matched_doc = None
        for doc_key, doc_info in DOCUMENT_DATABASE.items():
            if doc_key in msg_lower or doc_info["full_name"].lower() in msg_lower:
                matched_doc = doc_info
                break
        
        if matched_doc:
            # Found a specific document - give detailed sales pitch
            result["response"] = LegalAI._generate_document_pitch(matched_doc, user_name)
            result["suggested_documents"] = [matched_doc["full_name"]]
            result["action_buttons"] = [
                {"label": f"Create {matched_doc['full_name']}", "value": f"/documents/{matched_doc['full_name'].lower().replace(' ', '-')}", "type": "link"},
                {"label": "See Other Documents", "value": "other"}
            ]
            return result
        
        # No specific document - use AI to understand and recommend
        try:
            client = LegalAI.get_groq_client()
            
            system_prompt = f"""
{SALESPERSON_PROMPT}

USER CONTEXT:
- User Name: {user_name}
- They are looking for legal document help
- Current Query: {message}

AVAILABLE DOCUMENTS (mention these by name):
- NDA (Non-Disclosure Agreement) - Business confidentiality
- Lease Agreement - Rental property
- LLC Operating Agreement - Business formation
- Power of Attorney - Financial/legal authority
- Employment Agreement - Hiring employees
- And 165+ more templates

YOUR RESPONSE SHOULD:
1. Acknowledge their need
2. Recommend 1-2 specific documents that fit
3. Briefly explain why our version is best
4. End with a call to action
"""
            
            completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": message}
                ],
                model="llama3-8b-8192",
                temperature=0.6,
                max_tokens=600
            )
            
            ai_response = completion.choices[0].message.content
            
            # Add personalization
            result["response"] = ai_response
            result["new_stage"] = "SALES_MODE"
            
        except Exception as e:
            print(f"[AI ENGINE ERROR] {str(e)}")
            result["response"] = (
                f"I apologize, {user_name}, I'm experiencing high demand right now.\n\n"
                "In the meantime, you can:\n"
                "• Browse our [Document Library](/documents)\n"
                "• Or tell me more specifically what document you're looking for!"
            )
        
        return result
    
    @staticmethod
    def _generate_document_pitch(doc_info: Dict, user_name: str) -> str:
        """Generate a compelling sales pitch for a specific document"""
        
        use_cases = "\n".join([f"• {uc}" for uc in doc_info["use_cases"][:3]])
        key_clauses = "\n".join([f"✓ {kc}" for kc in doc_info["key_clauses"][:4]])
        
        return f"""
Great choice, {user_name}! 📄 **{doc_info['full_name']}**

**What is it?**
{doc_info['description']}

**Common Use Cases:**
{use_cases}

**Key Sections Included:**
{key_clauses}

**Why Legalgram?** 🏆
{doc_info['why_legalgram']}

---
**Ready to create your {doc_info['full_name']}?**
Our step-by-step wizard makes it easy - just answer a few questions and download your document in minutes!

_Need help with something else? Just ask!_
"""
    
    @staticmethod
    def get_document_details(document_name: str) -> Dict:
        """Get detailed information about a specific document"""
        
        doc_key = document_name.lower().replace("-", " ")
        
        if doc_key in DOCUMENT_DATABASE:
            return {
                "found": True,
                "document": DOCUMENT_DATABASE[doc_key]
            }
        
        # Fuzzy match
        for key, doc in DOCUMENT_DATABASE.items():
            if key in doc_key or doc_key in key:
                return {
                    "found": True,
                    "document": doc
                }
        
        return {
            "found": False,
            "message": f"Document '{document_name}' not found in database.",
            "suggestion": "Try searching for: NDA, Lease Agreement, LLC Operating Agreement, Power of Attorney"
        }
