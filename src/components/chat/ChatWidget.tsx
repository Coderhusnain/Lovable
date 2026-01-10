
import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { legalFaqData } from "@/data/legalFaqData";

interface Message {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "support",
      text: "Welcome to Legalgram! ⚖️\nI'm here to help you with legal document questions. What can I assist you with today?",
      timestamp: "Now",
    }
  ]);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Find FAQ matches from user input
  const findFaqMatch = (text: string): string | null => {
    const lowercaseText = text.toLowerCase();
    
    for (const faq of legalFaqData) {
      for (const keyword of faq.keywords) {
        if (lowercaseText.includes(keyword.toLowerCase())) {
          return faq.answer;
        }
      }
    }
    
    return null;
  };
  
  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: inputMessage,
        timestamp: getCurrentTime(),
      };
      
      // Add user message to chat
      setMessages(prev => [...prev, userMessage]);
      setInputMessage("");
      
      // Check for FAQ matches
      const faqAnswer = findFaqMatch(inputMessage);
      
      // Simulate a short delay before assistant responds
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'support',
          text: faqAnswer || "I don't have a specific answer for that question. For personalized assistance, please email us at support@legalgram.com or call us at 1-800-LEGAL-HELP.",
          timestamp: getCurrentTime(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
    }
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
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
        <div className="mb-4 w-80 rounded-xl shadow-2xl overflow-hidden animate-fade-in border border-gray-200">
          {/* Chat Header - Professional Legal Theme */}
          <div className="bg-gradient-to-r from-deep-blue-500 to-deep-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-bright-orange-500 flex items-center justify-center shadow-md">
                <Scale size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base">Legal Assistant</h3>
                <p className="text-xs text-gray-300">Here to help with your questions</p>
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
          <div className="bg-gray-50 h-72 overflow-auto p-4">
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
                  <p className="text-xs text-bright-orange-500 font-semibold mb-1">Legal Assistant</p>
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
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input - Clean Professional Style */}
          <form onSubmit={handleSendMessage} className="bg-white p-3 flex items-center border-t border-gray-100">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask a legal question..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-bright-orange-500 focus:border-transparent bg-gray-50"
            />
            <button 
              type="submit" 
              className={`ml-2 rounded-full p-2.5 transition-all ${
                inputMessage.trim() 
                  ? 'bg-bright-orange-500 hover:bg-bright-orange-600 shadow-md' 
                  : 'bg-gray-100'
              }`}
              disabled={!inputMessage.trim()}
            >
              <Send size={18} className={`${!inputMessage.trim() ? 'text-gray-400' : 'text-white'}`} />
            </button>
          </form>
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
