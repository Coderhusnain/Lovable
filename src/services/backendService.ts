/**
 * =========================================================
 * LEGALGRAM 2.0 - Backend Service
 * =========================================================
 * Secure client that calls Python FastAPI backend
 * NO MORE exposed API keys!
 * =========================================================
 */

// Types
export interface ChatRequest {
  message: string;
  session_id?: string;
  user_name?: string;
  context_stage?: string;  // Matches backend field name
}

export interface ActionButton {
  label: string;
  value: string;
  type?: 'action' | 'link';
}

export interface ChatResponse {
  response: string;
  session_id: string;
  new_stage: string;  // Backend returns new_stage
  user_name: string | null;
  suggested_documents: string[] | null;
  action_buttons: ActionButton[] | null;
}

export interface DocumentInfo {
  full_name: string;
  category: string;
  description: string;
  use_cases: string[];
  key_clauses: string[];
  why_legalgram: string;
}

export interface SessionState {
  session_id: string;
  user_name: string | null;
  stage: string;
  created_at: string;
  last_activity: string;
  messages_count: number;
}

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Generate a unique session ID for tracking conversation
 */
function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `lg_${timestamp}_${random}`;
}

/**
 * Get or create session ID from localStorage
 */
function getSessionId(): string {
  const stored = localStorage.getItem('legalgram_session_id');
  if (stored) return stored;
  
  const newId = generateSessionId();
  localStorage.setItem('legalgram_session_id', newId);
  return newId;
}

/**
 * LegalgramAPI - Secure backend communication
 */
export const LegalgramAPI = {
  
  /**
   * Send a chat message to the backend
   */
  async sendMessage(
    message: string, 
    options?: { 
      user_name?: string; 
      stage?: string;
      session_id?: string;
    }
  ): Promise<ChatResponse> {
    const sessionId = options?.session_id || getSessionId();
    
    const request: ChatRequest = {
      message,
      session_id: sessionId,
      user_name: options?.user_name,
      context_stage: options?.stage || 'INIT'
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data: ChatResponse = await response.json();
      
      // Store session ID if returned
      if (data.session_id) {
        localStorage.setItem('legalgram_session_id', data.session_id);
      }
      
      // Store user name if captured
      if (data.user_name) {
        localStorage.setItem('legalgram_user_name', data.user_name);
      }
      
      return data;
      
    } catch (error) {
      console.error('[LegalgramAPI] Error:', error);
      
      // Return fallback response
      return {
        response: "I apologize, I'm having trouble connecting right now. Please try again in a moment.",
        session_id: sessionId,
        new_stage: options?.stage || 'INIT',
        user_name: options?.user_name || null,
        suggested_documents: null,
        action_buttons: [
          { label: 'Try Again', value: 'retry', type: 'action' },
          { label: 'Browse Documents', value: '/documents', type: 'link' }
        ]
      };
    }
  },
  
  /**
   * Initialize a new chat session
   */
  async initSession(): Promise<ChatResponse> {
    // Clear any existing session
    localStorage.removeItem('legalgram_session_id');
    localStorage.removeItem('legalgram_user_name');
    
    // Start fresh
    return this.sendMessage('', { stage: 'INIT' });
  },
  
  /**
   * Get session state from backend
   */
  async getSession(sessionId?: string): Promise<SessionState | null> {
    const id = sessionId || getSessionId();
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/session/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Session not found
        }
        throw new Error(`HTTP ${response.status}`);
      }
      
      return response.json();
      
    } catch (error) {
      console.error('[LegalgramAPI] Session fetch error:', error);
      return null;
    }
  },
  
  /**
   * Get available documents
   */
  async getDocuments(): Promise<DocumentInfo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/documents`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      return data.documents || [];
      
    } catch (error) {
      console.error('[LegalgramAPI] Documents fetch error:', error);
      return [];
    }
  },
  
  /**
   * Get specific document details
   */
  async getDocumentDetails(documentName: string): Promise<DocumentInfo | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/documents/${encodeURIComponent(documentName)}`
      );
      
      if (!response.ok) {
        return null;
      }
      
      return response.json();
      
    } catch (error) {
      console.error('[LegalgramAPI] Document details error:', error);
      return null;
    }
  },
  
  /**
   * Check API health
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5s timeout
      });
      return response.ok;
    } catch {
      return false;
    }
  },
  
  /**
   * Get stored user name
   */
  getUserName(): string | null {
    return localStorage.getItem('legalgram_user_name');
  },
  
  /**
   * Get current session ID
   */
  getSessionId(): string {
    return getSessionId();
  },
  
  /**
   * Clear session (for logout/reset)
   */
  clearSession(): void {
    localStorage.removeItem('legalgram_session_id');
    localStorage.removeItem('legalgram_user_name');
  }
};

// Default export
export default LegalgramAPI;
