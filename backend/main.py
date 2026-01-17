"""
=========================================================
LEGALGRAM 2.0 - PYTHON FASTAPI BACKEND
=========================================================
Enterprise Legal AI Platform Backend
- Secure API Key Storage (Server-Side)
- Salesperson & Triage Logic (AJA Requirements)
- Session Management for Conversation Flow
=========================================================
"""

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
from dotenv import load_dotenv
import uvicorn
import os
import uuid
from datetime import datetime

# Load environment variables FIRST
load_dotenv()

# Import the AI Engine
from services.ai_engine import LegalAI

# =========================================================
# FastAPI Application Setup
# =========================================================
app = FastAPI(
    title="Legalgram 2.0 API",
    description="Enterprise Legal Document AI Platform - Secure Backend",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# =========================================================
# CORS Configuration - Allow React Frontend
# =========================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite default
        "http://localhost:8080",   # Legalgram dev port
        "http://localhost:3000",   # Alternative
        "https://legalgram.com",   # Production
        "https://www.legalgram.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# Session Storage (In-Memory for dev, use Redis in prod)
# =========================================================
sessions: Dict[str, Dict[str, Any]] = {}

# =========================================================
# Request/Response Models
# =========================================================
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    user_name: Optional[str] = None
    context_stage: str = "INIT"  # INIT, CAPTURE_NAME, TRIAGE, ADVISING, SALES_MODE, DONE

class ChatResponse(BaseModel):
    response: str
    new_stage: str
    session_id: str
    user_name: Optional[str] = None
    suggested_documents: Optional[list] = None
    action_buttons: Optional[list] = None

class SessionInfo(BaseModel):
    session_id: str
    user_name: Optional[str]
    stage: str
    message_count: int
    created_at: str

# =========================================================
# Health Check Endpoint
# =========================================================
@app.get("/")
def health_check():
    """Health check endpoint"""
    api_key_status = "CONFIGURED" if os.getenv("GROQ_API_KEY") else "MISSING"
    return {
        "status": "🟢 Legalgram Brain Online",
        "version": "2.0.0",
        "security": "MAXIMUM - Server-Side Keys",
        "api_key_status": api_key_status,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/status")
def api_status():
    """Detailed API status"""
    return {
        "service": "Legalgram AI Backend",
        "groq_configured": bool(os.getenv("GROQ_API_KEY")),
        "active_sessions": len(sessions),
        "endpoints": ["/api/chat", "/api/session", "/api/documents"]
    }

# =========================================================
# Main Chat Endpoint - THE BRAIN
# =========================================================
@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    """
    Main chat endpoint implementing AJA's requirements:
    1. Captures user name/details first
    2. Routes to Human vs AI (Triage)
    3. Acts as Salesperson for document recommendations
    """
    
    # Generate or use existing session ID
    session_id = req.session_id or str(uuid.uuid4())
    
    # Get or create session
    if session_id not in sessions:
        sessions[session_id] = {
            "user_name": None,
            "stage": "INIT",
            "messages": [],
            "created_at": datetime.now().isoformat()
        }
    
    session = sessions[session_id]
    
    # Update session with any provided data
    if req.user_name:
        session["user_name"] = req.user_name
    
    # Use the stage from request or session
    current_stage = req.context_stage if req.context_stage != "INIT" else session["stage"]
    
    # Process through the AI Engine
    try:
        result = LegalAI.process_flow(
            message=req.message,
            user_name=session.get("user_name"),
            stage=current_stage,
            session_id=session_id
        )
        
        # Update session
        session["stage"] = result["new_stage"]
        if result.get("user_name"):
            session["user_name"] = result["user_name"]
        session["messages"].append({
            "role": "user",
            "content": req.message,
            "timestamp": datetime.now().isoformat()
        })
        session["messages"].append({
            "role": "assistant", 
            "content": result["response"],
            "timestamp": datetime.now().isoformat()
        })
        
        return ChatResponse(
            response=result["response"],
            new_stage=result["new_stage"],
            session_id=session_id,
            user_name=session.get("user_name"),
            suggested_documents=result.get("suggested_documents"),
            action_buttons=result.get("action_buttons")
        )
        
    except Exception as e:
        print(f"[ERROR] Chat processing failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"AI processing error: {str(e)}")

# =========================================================
# Session Management Endpoints
# =========================================================
@app.get("/api/session/{session_id}")
def get_session(session_id: str):
    """Get session information"""
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session = sessions[session_id]
    return SessionInfo(
        session_id=session_id,
        user_name=session.get("user_name"),
        stage=session.get("stage", "INIT"),
        message_count=len(session.get("messages", [])),
        created_at=session.get("created_at", "")
    )

@app.delete("/api/session/{session_id}")
def clear_session(session_id: str):
    """Clear a session (start fresh)"""
    if session_id in sessions:
        del sessions[session_id]
    return {"status": "Session cleared", "session_id": session_id}

# =========================================================
# Document Information Endpoint
# =========================================================
@app.get("/api/documents")
def list_documents():
    """List available document categories"""
    return {
        "categories": [
            {
                "name": "Family Protection",
                "documents": [
                    "Living Will", "Power of Attorney", "Healthcare POA",
                    "Prenuptial Agreement", "Parenting Plan", "Child Care Authorization"
                ]
            },
            {
                "name": "Business Security",
                "documents": [
                    "NDA", "LLC Operating Agreement", "Employment Agreement",
                    "Independent Contractor", "Partnership Agreement", "Consulting Agreement"
                ]
            },
            {
                "name": "Property Matters",
                "documents": [
                    "Lease Agreement", "Commercial Lease", "Bill of Sale",
                    "Sublease", "Eviction Notice", "Roommate Agreement"
                ]
            },
            {
                "name": "Legal Services",
                "documents": [
                    "Attorney Engagement Letter", "Legal Services Agreement",
                    "Retainer Agreement", "Limited Scope Representation"
                ]
            }
        ],
        "total_templates": 170
    }

@app.get("/api/documents/{document_name}")
def get_document_info(document_name: str):
    """Get detailed information about a specific document"""
    # This would connect to a database in production
    return LegalAI.get_document_details(document_name)

# =========================================================
# Run Server
# =========================================================
if __name__ == "__main__":
    print("\n" + "="*60)
    print("🏛️  LEGALGRAM 2.0 BACKEND STARTING...")
    print("="*60)
    print(f"📍 API Docs: http://localhost:8000/docs")
    print(f"🔐 Security: Server-Side API Keys")
    print(f"🤖 AI Model: LLaMA 3 8B via Groq")
    print("="*60 + "\n")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Hot reload for development
        log_level="info"
    )
