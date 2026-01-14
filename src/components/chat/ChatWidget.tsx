
import { useState, useRef, useEffect } from "react";
import { X, Send, Scale, Loader2, Sparkles } from "lucide-react";
import { getChatCompletion, ChatMessage } from "@/services/groqService";

interface Message {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "support",
      text: "Welcome to Legalgram! ⚖️\nI'm your AI Legal Assistant, here to help you find the right legal documents. What can I assist you with today?",
      timestamp: "Now",
    }
  ]);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Convert messages to ChatMessage format for the AI
  const getConversationHistory = (): ChatMessage[] => {
    return messages
      .filter(msg => msg.id !== 'welcome') // Exclude welcome message
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputMessage.trim() && !isTyping) {
      const userMessageText = inputMessage.trim();
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: userMessageText,
        timestamp: getCurrentTime(),
      };
      
      // Add user message to chat
      setMessages(prev => [...prev, userMessage]);
      setInputMessage("");
      setIsTyping(true);
      
      try {
        // Get conversation history including the new message
        const conversationHistory: ChatMessage[] = [
          ...getConversationHistory(),
          { role: 'user', content: userMessageText }
        ];
        
        // Call the Groq AI service
        const aiResponse = await getChatCompletion(conversationHistory);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'support',
          text: aiResponse,
          timestamp: getCurrentTime(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Chat error:', error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'support',
          text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
          timestamp: getCurrentTime(),
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
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
                  {isTyping ? 'Typing...' : 'Powered by AI'}
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
          
          {/* Chat Messages - Solid Professional Background */}
          <div className="bg-gray-50 h-80 overflow-auto p-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`${
                  msg.sender === 'user' 
                    ? 'ml-auto bg-bright-orange-500 text-white' 
                    : 'bg-white text-gray-800 border border-gray-100'
                } rounded-xl p-3 shadow-sm max-w-[85%] mb-3`}
              >
                {msg.sender === 'support' && (
                  <p className="text-xs text-bright-orange-500 font-semibold mb-1 flex items-center gap-1">
                    <Sparkles size={10} />
                    AI Legal Assistant
                  </p>
                )}
                {msg.text.split('\n').map((text, i) => (
                  <p key={i} className={`${msg.sender === 'user' ? 'text-white' : 'text-gray-700'} text-sm leading-relaxed`}>
                    {text}
                  </p>
                ))}
                <p className={`text-xs ${msg.sender === 'user' ? 'text-orange-100' : 'text-gray-400'} text-right mt-2`}>
                  {msg.timestamp} {msg.sender === 'user' ? '✓✓' : ''}
                </p>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="bg-white text-gray-800 border border-gray-100 rounded-xl p-3 shadow-sm max-w-[85%] mb-3">
                <p className="text-xs text-bright-orange-500 font-semibold mb-2 flex items-center gap-1">
                  <Sparkles size={10} />
                  AI Legal Assistant
                </p>
                <div className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-bright-orange-500" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input - Clean Professional Style */}
          <form onSubmit={handleSendMessage} className="bg-white p-3 flex items-center border-t border-gray-100">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about legal documents..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-bright-orange-500 focus:border-transparent bg-gray-50"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className={`ml-2 rounded-full p-2.5 transition-all ${
                inputMessage.trim() && !isTyping
                  ? 'bg-bright-orange-500 hover:bg-bright-orange-600 shadow-md' 
                  : 'bg-gray-100 cursor-not-allowed'
              }`}
              disabled={!inputMessage.trim() || isTyping}
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
      
      {/* Floating Button - Professional Legal Theme */}
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
