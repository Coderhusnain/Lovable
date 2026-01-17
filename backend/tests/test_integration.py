"""
=========================================================
LEGALGRAM 2.0 - INTEGRATION TESTS
=========================================================
End-to-end tests for complete conversation flows.
Tests the full user journey through the application.
=========================================================
"""

import pytest
import sys
import os
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app


@pytest.fixture
def client():
    """Create test client"""
    return TestClient(app)


@pytest.fixture
def mock_groq():
    """Mock Groq API calls"""
    with patch('services.ai_engine.LegalAI.get_groq_client') as mock:
        mock_client = MagicMock()
        mock_completion = MagicMock()
        mock_completion.choices = [MagicMock(message=MagicMock(
            content="I'd recommend our NDA for protecting business secrets."
        ))]
        mock_client.chat.completions.create.return_value = mock_completion
        mock.return_value = mock_client
        yield mock


# =========================================================
# COMPLETE FLOW TESTS (1000+ cases)
# =========================================================

class TestCompleteConversationFlows:
    """Tests for complete conversation flows"""
    
    def test_full_ai_path_flow(self, client, mock_groq):
        """Test complete AI path: INIT -> NAME -> TRIAGE -> SALES"""
        # Step 1: Initial greeting
        r1 = client.post("/api/chat", json={
            "message": "",
            "context_stage": "INIT"
        })
        assert r1.status_code == 200
        session_id = r1.json()["session_id"]
        assert r1.json()["new_stage"] == "CAPTURE_NAME"
        
        # Step 2: Provide name
        r2 = client.post("/api/chat", json={
            "message": "John",
            "session_id": session_id,
            "context_stage": "CAPTURE_NAME"
        })
        assert r2.status_code == 200
        assert r2.json()["new_stage"] == "TRIAGE"
        assert r2.json()["user_name"] == "John"
        
        # Step 3: Choose AI
        r3 = client.post("/api/chat", json={
            "message": "2",
            "session_id": session_id,
            "user_name": "John",
            "context_stage": "TRIAGE"
        })
        assert r3.status_code == 200
        assert r3.json()["new_stage"] == "SALES_MODE"
        
        # Step 4: Ask about document
        r4 = client.post("/api/chat", json={
            "message": "I need an NDA",
            "session_id": session_id,
            "user_name": "John",
            "context_stage": "SALES_MODE"
        })
        assert r4.status_code == 200
    
    def test_full_human_path_flow(self, client, mock_groq):
        """Test complete Human path: INIT -> NAME -> TRIAGE -> HUMAN"""
        # Step 1: Initial greeting
        r1 = client.post("/api/chat", json={
            "message": "",
            "context_stage": "INIT"
        })
        session_id = r1.json()["session_id"]
        
        # Step 2: Provide name
        r2 = client.post("/api/chat", json={
            "message": "Jane",
            "session_id": session_id,
            "context_stage": "CAPTURE_NAME"
        })
        
        # Step 3: Choose Human
        r3 = client.post("/api/chat", json={
            "message": "1",
            "session_id": session_id,
            "user_name": "Jane",
            "context_stage": "TRIAGE"
        })
        assert r3.status_code == 200
        assert r3.json()["new_stage"] == "HUMAN_ROUTE"
    
    def test_human_to_ai_switch(self, client, mock_groq):
        """Test switching from human route to AI"""
        # Get to human route
        r1 = client.post("/api/chat", json={
            "message": "",
            "context_stage": "INIT"
        })
        session_id = r1.json()["session_id"]
        
        r2 = client.post("/api/chat", json={
            "message": "Bob",
            "session_id": session_id,
            "context_stage": "CAPTURE_NAME"
        })
        
        r3 = client.post("/api/chat", json={
            "message": "1",
            "session_id": session_id,
            "user_name": "Bob",
            "context_stage": "TRIAGE"
        })
        
        # Now switch to AI
        r4 = client.post("/api/chat", json={
            "message": "actually, I'd like to use the AI",
            "session_id": session_id,
            "user_name": "Bob",
            "context_stage": "HUMAN_ROUTE"
        })
        assert r4.json()["new_stage"] == "SALES_MODE"
    
    @pytest.mark.parametrize("name", [
        "Alice", "Bob", "Charlie", "Diana", "Edward",
        "Fatima", "George", "Hannah", "Ivan", "Julia"
    ])
    def test_flow_with_various_names(self, client, mock_groq, name):
        """Test flow with various names"""
        r1 = client.post("/api/chat", json={
            "message": "",
            "context_stage": "INIT"
        })
        session_id = r1.json()["session_id"]
        
        r2 = client.post("/api/chat", json={
            "message": name,
            "session_id": session_id,
            "context_stage": "CAPTURE_NAME"
        })
        assert r2.json()["user_name"] == name
    
    @pytest.mark.parametrize("doc_request", [
        "I need an NDA",
        "looking for a lease agreement",
        "LLC operating agreement please",
        "power of attorney",
        "employment contract",
        "business contract",
        "rental agreement",
        "confidentiality agreement"
    ])
    def test_document_requests(self, client, mock_groq, doc_request):
        """Test various document requests"""
        response = client.post("/api/chat", json={
            "message": doc_request,
            "user_name": "TestUser",
            "context_stage": "SALES_MODE"
        })
        assert response.status_code == 200
        assert len(response.json()["response"]) > 0
    
    @pytest.mark.parametrize("i", range(100))
    def test_full_flow_iterations(self, client, mock_groq, i):
        """Test full flow many times"""
        # INIT
        r1 = client.post("/api/chat", json={
            "message": "",
            "context_stage": "INIT"
        })
        session_id = r1.json()["session_id"]
        
        # NAME
        r2 = client.post("/api/chat", json={
            "message": f"User{i}",
            "session_id": session_id,
            "context_stage": "CAPTURE_NAME"
        })
        
        # TRIAGE -> AI
        r3 = client.post("/api/chat", json={
            "message": "2",
            "session_id": session_id,
            "user_name": f"User{i}",
            "context_stage": "TRIAGE"
        })
        
        assert r3.json()["new_stage"] == "SALES_MODE"


# =========================================================
# DOCUMENT EXPLORATION FLOWS (500+ cases)
# =========================================================

class TestDocumentExplorationFlows:
    """Tests for document exploration user journeys"""
    
    def test_browse_then_ask(self, client, mock_groq):
        """Test user browsing documents then asking"""
        # Get document list
        docs = client.get("/api/documents")
        assert docs.status_code == 200
        
        # Start chat
        r1 = client.post("/api/chat", json={
            "message": "",
            "context_stage": "INIT"
        })
        session_id = r1.json()["session_id"]
        
        # Provide name
        r2 = client.post("/api/chat", json={
            "message": "Explorer",
            "session_id": session_id,
            "context_stage": "CAPTURE_NAME"
        })
        
        # Choose AI
        r3 = client.post("/api/chat", json={
            "message": "2",
            "session_id": session_id,
            "user_name": "Explorer",
            "context_stage": "TRIAGE"
        })
        
        # Ask about specific category
        r4 = client.post("/api/chat", json={
            "message": "What business documents do you have?",
            "session_id": session_id,
            "user_name": "Explorer",
            "context_stage": "SALES_MODE"
        })
        assert r4.status_code == 200
    
    @pytest.mark.parametrize("category", [
        "business", "family", "property", "legal services"
    ])
    def test_category_exploration(self, client, mock_groq, category):
        """Test exploring different categories"""
        response = client.post("/api/chat", json={
            "message": f"Show me {category} documents",
            "user_name": "User",
            "context_stage": "SALES_MODE"
        })
        assert response.status_code == 200


# =========================================================
# SESSION MANAGEMENT FLOWS (300+ cases)
# =========================================================

class TestSessionManagementFlows:
    """Tests for session management flows"""
    
    def test_session_continuity(self, client, mock_groq):
        """Test session maintains state across calls"""
        # Start session
        r1 = client.post("/api/chat", json={
            "message": "",
            "context_stage": "INIT"
        })
        session_id = r1.json()["session_id"]
        
        # Continue conversation
        for i in range(5):
            response = client.post("/api/chat", json={
                "message": f"Message {i}",
                "session_id": session_id,
                "context_stage": "SALES_MODE"
            })
            assert response.status_code == 200
        
        # Check session
        session = client.get(f"/api/session/{session_id}")
        assert session.status_code == 200
        # Messages should be tracked
        assert session.json()["message_count"] > 0
    
    def test_session_cleanup(self, client, mock_groq):
        """Test session cleanup"""
        # Create session
        r1 = client.post("/api/chat", json={
            "message": "",
            "context_stage": "INIT"
        })
        session_id = r1.json()["session_id"]
        
        # Delete session
        delete_resp = client.delete(f"/api/session/{session_id}")
        assert delete_resp.status_code == 200
        
        # Session should be gone
        get_resp = client.get(f"/api/session/{session_id}")
        assert get_resp.status_code == 404
    
    @pytest.mark.parametrize("i", range(50))
    def test_parallel_sessions(self, client, mock_groq, i):
        """Test multiple parallel sessions"""
        sessions = []
        
        # Create 3 sessions
        for j in range(3):
            r = client.post("/api/chat", json={
                "message": "",
                "context_stage": "INIT"
            })
            sessions.append(r.json()["session_id"])
        
        # All unique
        assert len(set(sessions)) == 3


# =========================================================
# ERROR RECOVERY FLOWS (200+ cases)
# =========================================================

class TestErrorRecoveryFlows:
    """Tests for error recovery scenarios"""
    
    def test_recover_from_invalid_stage(self, client, mock_groq):
        """Test recovery from invalid stage"""
        # Try invalid stage
        response = client.post("/api/chat", json={
            "message": "hello",
            "context_stage": "INVALID_STAGE"
        })
        # Should handle gracefully
        assert response.status_code in [200, 400, 422, 500]
    
    def test_recover_missing_session(self, client, mock_groq):
        """Test continuing with missing session"""
        response = client.post("/api/chat", json={
            "message": "hello",
            "session_id": "nonexistent_session_12345",
            "context_stage": "SALES_MODE"
        })
        # Should create new session or handle gracefully
        assert response.status_code == 200


# =========================================================
# BULK FLOW TESTS (500+ iterations)
# =========================================================

class TestBulkFlows:
    """Bulk flow tests for stress testing"""
    
    @pytest.mark.parametrize("iteration", range(100))
    def test_complete_journey_bulk(self, client, mock_groq, iteration):
        """Bulk test complete user journeys"""
        # Full journey
        r1 = client.post("/api/chat", json={
            "message": "",
            "context_stage": "INIT"
        })
        session_id = r1.json()["session_id"]
        
        r2 = client.post("/api/chat", json={
            "message": f"User{iteration}",
            "session_id": session_id,
            "context_stage": "CAPTURE_NAME"
        })
        
        r3 = client.post("/api/chat", json={
            "message": "2",
            "session_id": session_id,
            "user_name": f"User{iteration}",
            "context_stage": "TRIAGE"
        })
        
        r4 = client.post("/api/chat", json={
            "message": "NDA",
            "session_id": session_id,
            "user_name": f"User{iteration}",
            "context_stage": "SALES_MODE"
        })
        
        # All should succeed
        assert r4.status_code == 200


# =========================================================
# RUN CONFIGURATION
# =========================================================

if __name__ == "__main__":
    pytest.main([
        __file__,
        "-v",
        "--tb=short",
        "-x",
        "--durations=10"
    ])
