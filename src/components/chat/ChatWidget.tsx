/**
 * =========================================================
 * LEGALGRAM 2.0 - ChatWidget Component
 * =========================================================
 * Updated to use secure Python FastAPI backend
 * Features:
 * - Stage-based conversation flow
 * - Action buttons from AI
 * - User name capture
 * - Triage routing (Human vs AI)
 * =========================================================
 */

import { useState, useRef, useEffect } from "react";
import { X, Send, Scale, Loader2, Sparkles, User, Bot, ExternalLink } from "lucide-react";
import LegalgramAPI, { ActionButton, ChatResponse } from "@/services/backendService";

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionButtons?: ActionButton[] | null;
}

interface SessionState {
  sessionId: string;
  userName: string | null;
  stage: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [session, setSession] = useState<SessionState>({
    sessionId: '',
    userName: null,
    stage: 'INIT'
  });
  
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat session when widget opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);
  
  const initializeChat = async () => {
    setIsInitializing(true);
    try {
      const response = await LegalgramAPI.initSession();
      
      setSession({
        sessionId: response.session_id,
        userName: response.user_name,
        stage: response.new_stage
      });
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        sender: 'assistant',
        text: response.response,
        timestamp: getCurrentTime(),
        actionButtons: response.action_buttons
      };
      
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      // Fallback welcome
      setMessages([{
        id: 'welcome',
        sender: 'assistant',
        text: "👋 Welcome to Legalgram! I'm your AI Legal Assistant. How can I help you today?",
        timestamp: getCurrentTime(),
        actionButtons: null
      }]);
    } finally {
      setIsInitializing(false);
    }
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputMessage.trim() && !isTyping) {
      await sendMessage(inputMessage.trim());
    }
  };
  
  const sendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: getCurrentTime(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    try {
      const response: ChatResponse = await LegalgramAPI.sendMessage(messageText, {
        user_name: session.userName || undefined,
        stage: session.stage,
        session_id: session.sessionId
      });
      
      // Update session state
      setSession({
        sessionId: response.session_id,
        userName: response.user_name,
        stage: response.new_stage
      });
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.response,
        timestamp: getCurrentTime(),
        actionButtons: response.action_buttons
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: getCurrentTime(),
        actionButtons: [
          { label: 'Try Again', value: 'retry', type: 'action' }
        ]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleActionButton = (button: ActionButton) => {
    if (button.type === 'link') {
      // Navigate to link
      window.location.href = button.value;
    } else {
      // Send as message
      sendMessage(button.value);
    }
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);
  
  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Render markdown-like formatting
  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, i) => {
      let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processedLine = processedLine.replace(/_(.*?)_/g, '<em>$1</em>');
      processedLine = processedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline hover:text-blue-800">$1</a>');
      
      return (
        <p 
          key={i} 
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      {/* Chat Popup */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-xl shadow-2xl overflow-hidden animate-fade-in border border-gray-200">
          {/* Chat Header - Professional Legal Theme */}
          <div className="bg-gradient-to-r from-deep-blue-500 to-deep-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-bright-orange-500 flex items-center justify-center shadow-md">
                <Scale size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base flex items-center gap-1.5">
                  Legal Assistant
                  <Sparkles size={14} className="text-yellow-300" />
                </h3>
                <p className="text-xs text-gray-300">
                  {isTyping ? 'Typing...' : session.userName ? `Helping ${session.userName}` : 'Powered by AI'}
                </p>
              </div>
            </div>
            <button 
              onClick={toggleChat} 
              className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="bg-gray-50 h-80 overflow-auto p-4">
            {isInitializing ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 size={24} className="animate-spin text-bright-orange-500" />
                <span className="ml-2 text-gray-500">Starting chat...</span>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`${
                      msg.sender === 'user' 
                        ? 'ml-auto bg-bright-orange-500 text-white' 
                        : 'bg-white text-gray-800 border border-gray-100'
                    } rounded-xl p-3 shadow-sm max-w-[85%] mb-3`}
                  >
                    {msg.sender === 'assistant' && (
                      <p className="text-xs text-bright-orange-500 font-semibold mb-1 flex items-center gap-1">
                        <Bot size={10} />
                        AI Legal Assistant
                      </p>
                    )}
                    {msg.sender === 'user' && (
                      <p className="text-xs text-orange-100 font-semibold mb-1 flex items-center gap-1">
                        <User size={10} />
                        {session.userName || 'You'}
                      </p>
                    )}
                    
                    <div className={msg.sender === 'user' ? 'text-white' : 'text-gray-700'}>
                      {renderMessageText(msg.text)}
                    </div>
                    
                    {/* Action Buttons */}
                    {msg.actionButtons && msg.actionButtons.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.actionButtons.map((btn, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleActionButton(btn)}
                            className="text-xs bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
                          >
                            {btn.type === 'link' && <ExternalLink size={10} />}
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <p className={`text-xs ${msg.sender === 'user' ? 'text-orange-100' : 'text-gray-400'} text-right mt-2`}>
                      {msg.timestamp} {msg.sender === 'user' ? '✓✓' : ''}
                    </p>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="bg-white text-gray-800 border border-gray-100 rounded-xl p-3 shadow-sm max-w-[85%] mb-3">
                    <p className="text-xs text-bright-orange-500 font-semibold mb-2 flex items-center gap-1">
                      <Bot size={10} />
                      AI Legal Assistant
                    </p>
                    <div className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-bright-orange-500" />
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="bg-white p-3 flex items-center border-t border-gray-100">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={session.stage === 'CAPTURE_NAME' ? "Enter your name..." : "Ask about legal documents..."}
              className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-bright-orange-500 focus:border-transparent bg-gray-50"
              disabled={isTyping || isInitializing}
            />
            <button 
              type="submit" 
              className={`ml-2 rounded-full p-2.5 transition-all ${
                inputMessage.trim() && !isTyping && !isInitializing
                  ? 'bg-bright-orange-500 hover:bg-bright-orange-600 shadow-md' 
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
              disabled={!inputMessage.trim() || isTyping || isInitializing}
            >
              {isTyping ? (
                <Loader2 size={18} className="animate-spin text-gray-400" />
              ) : (
                <Send size={18} className={`${!inputMessage.trim() ? 'text-gray-400' : 'text-white'}`} />
              )}
            </button>
          </form>
          
          {/* Footer Disclaimer */}
          <div className="bg-gray-100 px-3 py-2 border-t border-gray-200">
            <p className="text-[10px] text-gray-400 text-center">
              AI responses are for guidance only, not legal advice.
            </p>
          </div>
        </div>
      )}
      
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 hover:from-bright-orange-600 hover:to-bright-orange-700 transition-all rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105"
        aria-label="Open legal assistant chat"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Scale size={26} className="text-white" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
