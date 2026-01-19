import Groq from 'groq-sdk';

// --- CONFIGURATION ---
// Pointing to the new separate backend on Railway
// NOTE: Once you deploy to Railway, verify this URL matches your active domain.
const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://legalgramchatbotbackend-production.up.railway.app';

export const getChatCompletion = async (message: string, history: any[]) => {
  try {
    // We are now sending the request to the Python Microservice
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        session_id: 'guest_user',
        context_stage: 'INIT' // The backend now handles the stage logic
      })
    });
    
    if (!response.ok) throw new Error('Backend Connection Failed');
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('API Error:', error);
    return "I'm currently updating my servers. Please try again in a moment.";
  }
}

