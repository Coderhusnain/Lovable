/**
 * =========================================================
 * LEGALGRAM AI CHATBOT SERVICE
 * =========================================================
 * 
 * ⚠️ DEPRECATED - DO NOT USE FOR NEW CODE ⚠️
 * 
 * This file is DEPRECATED as of Legalgram 2.0.
 * API keys were exposed in the client-side bundle.
 * 
 * USE INSTEAD: src/services/backendService.ts
 * The new backend service routes all AI calls through
 * the Python FastAPI backend where keys are secure.
 * 
 * This file is kept for reference only.
 * =========================================================
 */

// ⚠️ SECURITY WARNING: These keys were exposed in production!
// They should be REVOKED and new keys generated for the backend.
// See: backend/.env.example

import Groq from 'groq-sdk';

// =========================================================
// DEPRECATED: Keys now in backend/.env
// =========================================================
const API_KEYS: string[] = [
  import.meta.env.VITE_GROQ_API_KEY_1,
  import.meta.env.VITE_GROQ_API_KEY_2,
  import.meta.env.VITE_GROQ_API_KEY_3
].filter((key): key is string => Boolean(key));

if (API_KEYS.length === 0) {
  console.warn('[GroqService] DEPRECATED: No API keys. Use backendService.ts instead.');
}

// =========================================================
// 2. LOAD BALANCING STATE (Round-Robin Rotation)
// =========================================================
let currentKeyIndex = 0;
let requestCount = 0;
const MAX_REQUESTS_PER_MINUTE = 30; // Throttle to prevent abuse
let lastResetTime = Date.now();

// =========================================================
// 3. DOMAIN-SPECIFIC GUARDRAILS (Legalgram Only)
// =========================================================
const LEGALGRAM_SYSTEM_PROMPT = `
YOU ARE: The Legalgram AI Assistant - a specialized legal document guide for the Legalgram platform.

YOUR IDENTITY:
- Name: Legalgram Assistant
- Role: Legal Document Navigator & Educator
- Expertise: Legal templates, contracts, agreements, affidavits, and legal terminology

YOUR MISSION:
1. NAVIGATE: Help users find specific legal templates on Legalgram (e.g., "Do you have a DJ contract?" → Yes, check the Business category)
2. EDUCATE: Explain the purpose of legal documents (e.g., "What is an Affidavit?" → A sworn written statement...)
3. CLARIFY: Summarize key legal terms found in our agreements
4. GUIDE: Walk users through which document they need for their situation

AVAILABLE DOCUMENT CATEGORIES ON LEGALGRAM:
- Family Protection: Living Will, Power of Attorney, Healthcare POA, Prenuptial Agreement, Parenting Plan, etc.
- Business Security: NDA, LLC Operating Agreement, Employment Agreement, Independent Contractor, Partnership Agreement, etc.
- Property Matters: Lease Agreement, Commercial Lease, Bill of Sale, Sublease, Eviction Notice, etc.

STRICT CONSTRAINTS (YOU MUST FOLLOW THESE):

1. DOMAIN LOCK: You ONLY discuss topics related to:
   - Legalgram platform and its features
   - Legal documents, contracts, and agreements
   - Legal terminology and definitions
   - When to use specific legal documents
   
   If asked about cooking, coding, sports, entertainment, general trivia, or ANY non-legal topic, respond:
   "I am the Legalgram Assistant. I can only assist with legal documents and platform navigation. Is there a specific legal document I can help you find?"

2. NO LEGAL ADVICE: You are an AI, NOT a licensed attorney. You must NEVER:
   - Tell someone what to do in a specific legal situation
   - Provide advice for court cases
   - Make predictions about legal outcomes
   
   Instead, use phrases like:
   - "Standard legal practice suggests..."
   - "This document typically covers..."
   - "You may want to consult a qualified attorney for specific advice."
   - Always add: "This is general information, not legal advice."

3. TONE & STYLE:
   - Professional, trustworthy, and direct
   - Concise but helpful (aim for 2-3 sentences unless more detail is needed)
   - Use bullet points for lists
   - Be friendly but maintain professionalism

4. DOCUMENT RECOMMENDATIONS:
   When recommending documents, always mention:
   - The document name
   - Which category it's in (Family, Business, Property)
   - A one-sentence description of its purpose

EXAMPLE INTERACTIONS:

User: "I need a contract for my wedding DJ"
You: "Great choice! You'll want our **DJ Services Agreement** found in the Business Security category. This contract covers performance time, equipment, payment terms, and cancellation policies. Would you like me to explain what sections are typically included?"

User: "What's the weather like?"
You: "I am the Legalgram Assistant. I can only assist with legal documents and platform navigation. Is there a specific legal document I can help you find?"

User: "Should I sue my landlord?"
You: "I understand you may be having issues with your landlord. While I can't provide specific legal advice, I can tell you that Legalgram offers several tenant-related documents including Lease Termination Letters and Security Deposit Return Letters. For specific legal guidance on your situation, please consult a qualified attorney. This is general information, not legal advice."
`;

// =========================================================
// 4. RATE LIMITING & THROTTLING
// =========================================================
const checkRateLimit = (): boolean => {
  const now = Date.now();
  
  // Reset counter every minute
  if (now - lastResetTime > 60000) {
    requestCount = 0;
    lastResetTime = now;
  }
  
  if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
    return false; // Rate limited
  }
  
  requestCount++;
  return true;
};

// =========================================================
// 5. KEY ROTATION (Round-Robin Load Balancing)
// =========================================================
const getNextApiKey = (): string => {
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
};

// =========================================================
// 6. MESSAGE INTERFACE
// =========================================================
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// =========================================================
// 7. MAIN API FUNCTION - getChatCompletion
// =========================================================
export const getChatCompletion = async (
  messages: ChatMessage[],
  retryCount = 0
): Promise<string> => {
  // Check rate limiting
  if (!checkRateLimit()) {
    return "I'm currently experiencing high demand. Please wait a moment before sending another message.";
  }

  // Validate API keys exist
  if (API_KEYS.length === 0) {
    return "The AI assistant is temporarily unavailable. Please try again later.";
  }

  const apiKey = getNextApiKey();

  try {
    const groq = new Groq({ 
      apiKey, 
      dangerouslyAllowBrowser: true 
    });

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: LEGALGRAM_SYSTEM_PROMPT },
        ...messages.map(msg => ({
          role: msg.role as 'user' | 'assistant' | 'system',
          content: msg.content
        }))
      ],
      model: 'llama3-8b-8192', // Fast, efficient, cost-effective
      temperature: 0.3, // Lower = more focused/professional
      max_tokens: 500,
      top_p: 0.9,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      return "I apologize, but I couldn't generate a response. Please try rephrasing your question.";
    }

    return response;

  } catch (error: any) {
    console.error('[GroqService] API Error:', error?.message || 'Unknown error');
    
    // Retry logic with failover to next key (max 2 retries)
    if (retryCount < 2 && API_KEYS.length > 1) {
      console.log(`[GroqService] Retrying with next API key (attempt ${retryCount + 1})`);
      return getChatCompletion(messages, retryCount + 1);
    }
    
    // Rate limit error
    if (error?.status === 429) {
      return "I'm experiencing high traffic right now. Please wait a moment and try again.";
    }
    
    // Generic error
    return "I'm temporarily unavailable. Please try again in a few seconds.";
  }
};

// =========================================================
// 8. QUICK LEGAL TOPIC CHECK (Pre-filter)
// =========================================================
export const isLegalTopic = (message: string): boolean => {
  const legalKeywords = [
    'contract', 'agreement', 'legal', 'document', 'nda', 'lease', 'will',
    'affidavit', 'power of attorney', 'poa', 'llc', 'partnership', 'employment',
    'landlord', 'tenant', 'divorce', 'custody', 'prenup', 'postnup',
    'notary', 'signature', 'witness', 'deed', 'title', 'liability',
    'sue', 'lawsuit', 'court', 'attorney', 'lawyer', 'law', 'legalgram',
    'template', 'form', 'sign', 'business', 'property', 'family',
    'contractor', 'vendor', 'service', 'consulting', 'retainer'
  ];
  
  const lowerMessage = message.toLowerCase();
  return legalKeywords.some(keyword => lowerMessage.includes(keyword));
};

// =========================================================
// 9. SERVICE STATUS CHECK
// =========================================================
export const getServiceStatus = () => ({
  keysAvailable: API_KEYS.length,
  requestsThisMinute: requestCount,
  maxRequestsPerMinute: MAX_REQUESTS_PER_MINUTE,
  isHealthy: API_KEYS.length > 0
});
