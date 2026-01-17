# Legalgram 2.0 Backend

## 🔒 Secure Python FastAPI Backend for Legalgram AI Chatbot

This backend implements all the security and feature requirements from the Legalgram 2.0 transformation:

### ✅ Security Fixes
- **API keys are server-side only** - No more exposed keys in client JavaScript
- All AI calls route through `/api/chat` endpoint
- Environment variables for sensitive configuration

### ✅ New Features (Per AJA's Requirements)
1. **Salesperson Persona** - AI acts as a legal document expert who sells the value of our templates
2. **Triage System** - Routes users to Human Lawyers OR AI Assistant based on their needs
3. **Data Capture** - Captures user's name before providing guidance
4. **Stage-Based Flow** - Conversation progresses through defined stages

## 🚀 Quick Start

### 1. Create Virtual Environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env and add your Groq API key
```

### 4. Run the Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 📁 Project Structure

```
backend/
├── main.py              # FastAPI application & endpoints
├── services/
│   ├── __init__.py
│   └── ai_engine.py     # LegalAI class with conversation flow
├── .env.example         # Environment template (NEVER commit .env)
├── .gitignore          # Excludes .env from Git
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## 🔌 API Endpoints

### POST `/api/chat`
Main chat endpoint that processes user messages.

**Request:**
```json
{
  "message": "I need an NDA",
  "session_id": "lg_abc123_xyz",
  "user_name": "John",
  "stage": "SALES_MODE"
}
```

**Response:**
```json
{
  "response": "Great choice, John! Our NDA is attorney-reviewed...",
  "session_id": "lg_abc123_xyz",
  "stage": "SALES_MODE",
  "user_name": "John",
  "suggested_documents": ["Non-Disclosure Agreement"],
  "action_buttons": [
    {"label": "Create NDA", "value": "/documents/nda", "type": "link"}
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### GET `/api/documents`
Returns list of available legal documents.

### GET `/api/session/{session_id}`
Retrieves session state.

### GET `/api/health`
Health check endpoint.

## 🎯 Conversation Flow Stages

```
INIT → CAPTURE_NAME → TRIAGE → SALES_MODE/HUMAN_ROUTE → DONE
```

1. **INIT**: Welcome message
2. **CAPTURE_NAME**: Get user's name
3. **TRIAGE**: Human vs AI routing decision
4. **SALES_MODE**: AI provides document guidance
5. **HUMAN_ROUTE**: Directs to human lawyers
6. **DONE**: Conversation complete

## 🔐 Security Notes

1. **REVOKE OLD KEYS**: Any keys previously exposed in client-side code should be revoked immediately at [console.groq.com](https://console.groq.com)

2. **Generate New Key**: Create a new key at [console.groq.com](https://console.groq.com)

3. **Never Commit .env**: The `.gitignore` is configured to exclude it

## 🔧 Frontend Integration

The React frontend has been updated to use `backendService.ts` instead of the deprecated `groqService.ts`.

Update your `.env` in the frontend:
```
VITE_API_URL=http://localhost:8000
```

## 📝 License

Proprietary - Legalgram LLC
