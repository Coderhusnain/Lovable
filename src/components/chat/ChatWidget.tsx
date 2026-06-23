/**
 * =========================================================
 * LEGALGRAM 2.0 - ChatWidget Component ("Gram AI")
 * =========================================================
 */

import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import {
  X,
  Send,
  Scale,
  Loader2,
  Sparkles,
  User,
  Bot,
  ExternalLink,
  ChevronDown,
  Paperclip,
  FileText,
  FileDown,
} from "lucide-react";
import LegalgramAPI, { ActionButton, ChatResponse } from "@/services/backendService";

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionButtons?: ActionButton[] | null;
  attachmentName?: string | null;
  noDocumentMatch?: boolean;
}

interface SessionState {
  sessionId: string;
  userName: string | null;
  stage: string;
}

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.txt,.rtf,.png,.jpg,.jpeg";
const MAX_FILE_MB = 10;

export const OPEN_GRAM_AI_EVENT = "open-gram-ai";

interface CustomDocField {
  key: string;
  question: string;
}

const CUSTOM_DOC_FIELDS: CustomDocField[] = [
  { key: "documentTitle", question: "What should this document be called? (e.g. \"Equipment Rental Agreement\")" },
  { key: "partyAName", question: "What is the full name of the first party?" },
  { key: "partyAAddress", question: "What is the first party's address (or principal place of business)?" },
  { key: "partyBName", question: "What is the full name of the second party?" },
  { key: "partyBAddress", question: "What is the second party's address (or principal place of business)?" },
  { key: "effectiveDate", question: "What date should this agreement take effect? (e.g. \"2026-07-08\")" },
  { key: "purpose", question: "In a sentence or two, what is the purpose of this agreement?" },
  { key: "keyTerms", question: "What are the key terms or obligations each party agrees to? (You can list a few.)" },
  { key: "paymentOrConsideration", question: "Is there any payment, fee, or consideration involved? If so, describe it (or say \"none\")." },
  { key: "duration", question: "How long does this agreement last, or when does it end?" },
  { key: "governingLaw", question: "Which state/country's laws should govern this agreement?" },
];

// Keywords that trigger the custom doc flow directly without waiting for backend
const CUSTOM_DOC_TRIGGERS = [
  "build it new", "create new", "new form", "new document",
  "custom document", "not in list", "build new", "make new",
  "create custom", "generate new", "i want to build", "new doc",
  "banana hai", "banao", "create it", "make a new", "build a new",
  "doesn't exist", "does not exist", "not available",
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [userTurnCount, setUserTurnCount] = useState(0);
  const [session, setSession] = useState<SessionState>({
    sessionId: '',
    userName: null,
    stage: 'INIT'
  });

  const [inCustomDocFlow, setInCustomDocFlow] = useState(false);
  const [customDocStep, setCustomDocStep] = useState(0);
  const [customDocAnswers, setCustomDocAnswers] = useState<Record<string, string>>({});

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const atBottomRef = useRef(true);

  const toggleChat = () => setIsOpen((o) => !o);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener(OPEN_GRAM_AI_EVENT, handler);
    return () => window.removeEventListener(OPEN_GRAM_AI_EVENT, handler);
  }, []);

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
      setMessages([{
        id: 'welcome',
        sender: 'assistant',
        text: response.response,
        timestamp: getCurrentTime(),
        actionButtons: response.action_buttons
      }]);
    } catch (error) {
      console.error('Failed to initialize chat:', error);
      setMessages([{
        id: 'welcome',
        sender: 'assistant',
        text: "\u{1F44B} Welcome to Legalgram! I'm Gram AI, your legal assistant. How can I help you today?",
        timestamp: getCurrentTime(),
        actionButtons: null
      }]);
    } finally {
      setIsInitializing(false);
    }
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`File is too large (max ${MAX_FILE_MB}MB).`);
      return;
    }
    setAttachedFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    setFileError(null);
  };

  const canSend = (inputMessage.trim().length > 0 || !!attachedFile) && !isTyping && !isInitializing;

  const isNoDocumentMatch = (response: ChatResponse, turnIndex: number): boolean => {
    const noSuggestions = !response.suggested_documents || response.suggested_documents.length === 0;
    return noSuggestions && turnIndex > 0;
  };

  const startCustomDocFlow = () => {
    setInCustomDocFlow(true);
    setCustomDocStep(0);
    setCustomDocAnswers({});
    setMessages(prev => [...prev, {
      id: `${Date.now()}-customdoc-start`,
      sender: 'assistant',
      text: "No problem \u2014 I'll create a custom document for you. I just need to ask a few questions first.",
      timestamp: getCurrentTime(),
    }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `${Date.now()}-customdoc-q0`,
        sender: 'assistant',
        text: CUSTOM_DOC_FIELDS[0].question,
        timestamp: getCurrentTime(),
      }]);
    }, 400);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    atBottomRef.current = true;

    const text = inputMessage.trim();
    const file = attachedFile;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: getCurrentTime(),
      attachmentName: file ? file.name : null,
    }]);

    setInputMessage("");
    setAttachedFile(null);

    // --- Custom doc Q&A flow: handle answers locally, no backend call ---
    if (inCustomDocFlow) {
      const currentField = CUSTOM_DOC_FIELDS[customDocStep];
      const updatedAnswers = { ...customDocAnswers, [currentField.key]: text };
      setCustomDocAnswers(updatedAnswers);

      const nextStep = customDocStep + 1;
      if (nextStep < CUSTOM_DOC_FIELDS.length) {
        setCustomDocStep(nextStep);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: `${Date.now()}-customdoc-q${nextStep}`,
            sender: 'assistant',
            text: CUSTOM_DOC_FIELDS[nextStep].question,
            timestamp: getCurrentTime(),
          }]);
        }, 350);
      } else {
        // All questions answered — generate the PDF
        setInCustomDocFlow(false);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: `${Date.now()}-customdoc-done`,
            sender: 'assistant',
            text: "Great, I have everything I need. Generating your document now...",
            timestamp: getCurrentTime(),
          }]);
          generateStructuredDocumentPdf(updatedAnswers);
        }, 350);
      }
      return;
    }

    // --- Check if user explicitly wants a new/custom document ---
    const lowerText = text.toLowerCase();
    const wantsCustomDoc = CUSTOM_DOC_TRIGGERS.some(trigger => lowerText.includes(trigger));
    if (wantsCustomDoc) {
      startCustomDocFlow();
      return;
    }

    // --- Normal backend flow ---
    setIsTyping(true);
    const turnIndex = userTurnCount;
    setUserTurnCount((c) => c + 1);

    try {
      const response: ChatResponse = await LegalgramAPI.sendMessage(
        text || (file ? `I'm uploading a document: ${file.name}` : ""),
        {
          user_name: session.userName || undefined,
          stage: session.stage,
          session_id: session.sessionId,
        }
      );
      setSession({
        sessionId: response.session_id,
        userName: response.user_name,
        stage: response.new_stage
      });
      const noMatch = isNoDocumentMatch(response, turnIndex);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.response,
        timestamp: getCurrentTime(),
        actionButtons: response.action_buttons,
        noDocumentMatch: noMatch,
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: getCurrentTime(),
        actionButtons: [{ label: 'Try Again', value: 'retry', type: 'action' }]
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionButton = (button: ActionButton) => {
    if (button.type === 'link') {
      window.location.href = button.value;
    } else {
      atBottomRef.current = true;
      sendQuickMessage(button.value);
    }
  };

  const sendQuickMessage = async (messageText: string) => {
    const turnIndex = userTurnCount;
    setUserTurnCount((c) => c + 1);

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: getCurrentTime(),
    }]);
    setIsTyping(true);
    try {
      const response: ChatResponse = await LegalgramAPI.sendMessage(messageText, {
        user_name: session.userName || undefined,
        stage: session.stage,
        session_id: session.sessionId
      });
      setSession({ sessionId: response.session_id, userName: response.user_name, stage: response.new_stage });
      const noMatch = isNoDocumentMatch(response, turnIndex);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response.response,
        timestamp: getCurrentTime(),
        actionButtons: response.action_buttons,
        noDocumentMatch: noMatch,
      }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const generateStructuredDocumentPdf = (answers: Record<string, string>) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const marginX = 56;
    const pageWidth = 595;
    const contentWidth = pageWidth - marginX * 2;
    let y = 64;

    const title = (answers.documentTitle || "Custom Agreement").toUpperCase();
    const partyA = answers.partyAName || "Party A";
    const partyAAddress = answers.partyAAddress || "[address not provided]";
    const partyB = answers.partyBName || "Party B";
    const partyBAddress = answers.partyBAddress || "[address not provided]";
    const effectiveDate = answers.effectiveDate || "[date not provided]";

    const ensureSpace = (needed: number) => {
      if (y + needed > 770) {
        doc.addPage();
        y = 64;
      }
    };

    const writeParagraph = (text: string, opts?: { bold?: boolean; size?: number; gap?: number }) => {
      const size = opts?.size ?? 10.5;
      doc.setFont("helvetica", opts?.bold ? "bold" : "normal");
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, contentWidth);
      ensureSpace(lines.length * (size * 1.35) + (opts?.gap ?? 14));
      doc.text(lines, marginX, y);
      y += lines.length * (size * 1.35) + (opts?.gap ?? 14);
    };

    const writeSectionHeading = (text: string) => {
  ensureSpace(32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  // Center the heading
  doc.text(text, pageWidth / 2, y, { align: "center" });
  // Underline it manually
  const textWidth = doc.getTextWidth(text);
  const underlineX = (pageWidth / 2) - (textWidth / 2);
  doc.setLineWidth(0.5);
  doc.line(underlineX, y + 2, underlineX + textWidth, y + 2);
  y += 20;
};

    // Title
    // Title - centered and underlined
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
const titleLines = doc.splitTextToSize(title, contentWidth);
doc.text(titleLines, pageWidth / 2, y, { align: "center" });
// Underline each title line
titleLines.forEach((line: string, i: number) => {
  const lineWidth = doc.getTextWidth(line);
  const lineX = (pageWidth / 2) - (lineWidth / 2);
  doc.setLineWidth(0.8);
  doc.line(lineX, y + (i * 22) + 3, lineX + lineWidth, y + (i * 22) + 3);
});
y += titleLines.length * 22 + 14;
    // Recital paragraph
    writeParagraph(
      `This ${answers.documentTitle || "Agreement"} is made and entered into as of ${effectiveDate}, by and between ${partyA}, having its principal office/address at ${partyAAddress}, and ${partyB}, having its principal office/address at ${partyBAddress}.`
    );
    writeParagraph(`Each may be referred to individually as a "Party" and collectively as the "Parties."`);
    writeParagraph(`In consideration of the mutual promises, covenants, and agreements contained herein, the Parties agree as follows:`, { gap: 18 });

    // Numbered sections
    let sectionNum = 1;

    writeSectionHeading(`${sectionNum++}. PURPOSE`);
    writeParagraph(answers.purpose || "[purpose not provided]");

    writeSectionHeading(`${sectionNum++}. KEY TERMS AND OBLIGATIONS`);
    writeParagraph(answers.keyTerms || "[key terms not provided]");

    writeSectionHeading(`${sectionNum++}. PAYMENT / CONSIDERATION`);
    writeParagraph(answers.paymentOrConsideration || "No payment or consideration specified.");

    writeSectionHeading(`${sectionNum++}. TERM AND DURATION`);
    writeParagraph(
      `This Agreement takes effect on ${effectiveDate} and continues until ${answers.duration || "terminated by mutual written consent of the Parties"}.`
    );

    writeSectionHeading(`${sectionNum++}. GOVERNING LAW`);
    writeParagraph(`This Agreement is governed by the laws of ${answers.governingLaw || "[governing law not provided]"}.`);

    writeSectionHeading(`${sectionNum++}. AMENDMENT`);
    writeParagraph("This Agreement may only be amended in writing signed by both Parties. No assignment or transfer of rights under this Agreement may occur without prior written consent of the other Party.");

    writeSectionHeading(`${sectionNum++}. SEVERABILITY`);
    writeParagraph("If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.");

    writeSectionHeading(`${sectionNum++}. ENTIRE AGREEMENT`);
    writeParagraph("This Agreement constitutes the entire understanding between the Parties and supersedes all prior negotiations, representations, or agreements relating to its subject matter.");

    // Signature blocks
    ensureSpace(140);
    writeSectionHeading(`${sectionNum++}. SIGNATORIES`);
    y += 6;

    const signatureBlock = (partyName: string) => {
      ensureSpace(90);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text(`[${partyName}]`, marginX, y);
      y += 22;
      doc.setFont("helvetica", "normal");
      doc.text("By: ___________________________", marginX, y);
      y += 20;
      doc.text(`Name: ${partyName}`, marginX, y);
      y += 20;
      doc.text("Title: ___________________________", marginX, y);
      y += 20;
      doc.text("Date: ___________________________", marginX, y);
      y += 30;
    };

    signatureBlock(partyA);
    signatureBlock(partyB);

    // Footer
    ensureSpace(40);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(140);
    doc.text(
      "This document was generated automatically by Gram AI based on a chatbot conversation and has not been reviewed by an attorney. Please review carefully before use.",
      marginX, y, { maxWidth: contentWidth }
    );

    const safeTitle = (answers.documentTitle || "custom-agreement").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const fileName = `${safeTitle}-${Date.now()}.pdf`;
    doc.save(fileName);

    setMessages(prev => [...prev, {
      id: `${Date.now()}-pdf-confirm`,
      sender: 'assistant',
      text: `Done! I've generated "${answers.documentTitle || "your document"}" and started the download (${fileName}). Please review it carefully \u2014 it hasn't been checked by an attorney.`,
      timestamp: getCurrentTime(),
    }]);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior });
      atBottomRef.current = true;
      setShowScrollButton(false);
    }
  };

  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const nearBottom = distanceFromBottom < 80;
    atBottomRef.current = nearBottom;
    setShowScrollButton(!nearBottom);
  };

  useEffect(() => {
    if (atBottomRef.current) {
      scrollToBottom("smooth");
    } else {
      setShowScrollButton(true);
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const renderMessageText = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processedLine = processedLine.replace(/_(.*?)_/g, '<em>$1</em>');
      processedLine = processedLine.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" class="text-blue-600 underline hover:text-blue-800">$1</a>'
      );
      return (
        <p key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      {isOpen && (
        <div className="mb-4 w-[22rem] sm:w-96 h-[34rem] max-h-[80vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in border border-gray-200">
          {/* Header */}
          <div className="shrink-0 bg-gradient-to-r from-deep-blue-500 to-deep-blue-600 text-white px-5 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-bright-orange-500 flex items-center justify-center shadow-md">
                <Scale size={20} className="text-white" />
              </div>
              <div className="leading-tight">
                <h3 className="font-semibold text-base flex items-center gap-1.5">
                  Gram AI
                  <Sparkles size={14} className="text-yellow-300" />
                </h3>
                <p className="text-xs text-gray-300 mt-0.5">
                  {isTyping ? 'Typing\u2026' : session.userName ? `Helping ${session.userName}` : 'Powered by AI'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-1.5 rounded-full hover:bg-white/10"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="relative flex-1 min-h-0">
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="absolute inset-0 overflow-y-auto overscroll-contain bg-gray-50 px-4 py-4 scroll-smooth"
            >
              {isInitializing ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 size={24} className="animate-spin text-bright-orange-500" />
                  <span className="ml-2 text-gray-500 text-sm">Starting chat\u2026</span>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div key={msg.id} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${
                        msg.sender === 'user'
                          ? 'bg-bright-orange-500 text-white rounded-2xl rounded-br-md'
                          : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-md'
                      } px-4 py-3 shadow-sm max-w-[85%]`}>
                        {msg.sender === 'assistant' && (
                          <p className="text-[11px] uppercase tracking-wide text-bright-orange-500 font-semibold mb-1.5 flex items-center gap-1">
                            <Bot size={11} />
                            Gram AI
                          </p>
                        )}
                        {msg.sender === 'user' && (
                          <p className="text-[11px] uppercase tracking-wide text-orange-100 font-semibold mb-1.5 flex items-center gap-1">
                            <User size={11} />
                            {session.userName || 'You'}
                          </p>
                        )}

                        {msg.attachmentName && (
                          <div className={`mb-2 flex items-center gap-2 rounded-lg px-2.5 py-2 ${msg.sender === 'user' ? 'bg-white/15' : 'bg-gray-100'}`}>
                            <FileText size={16} className={msg.sender === 'user' ? 'text-white' : 'text-bright-orange-500'} />
                            <span className={`text-xs truncate max-w-[12rem] ${msg.sender === 'user' ? 'text-white' : 'text-gray-700'}`}>
                              {msg.attachmentName}
                            </span>
                          </div>
                        )}

                        {msg.text && (
                          <div className={msg.sender === 'user' ? 'text-white' : 'text-gray-700'}>
                            {renderMessageText(msg.text)}
                          </div>
                        )}

                        {msg.actionButtons && msg.actionButtons.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {msg.actionButtons.map((btn, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleActionButton(btn)}
                                className="text-xs bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
                              >
                                {btn.type === 'link' && <ExternalLink size={11} />}
                                {btn.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {msg.noDocumentMatch && (
                          <div className="mt-3">
                            <button
                              onClick={startCustomDocFlow}
                              className="text-xs bg-deep-blue-600 hover:bg-deep-blue-700 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
                            >
                              <FileDown size={12} />
                              Create a Custom Document
                            </button>
                          </div>
                        )}

                        <p className={`text-[11px] ${msg.sender === 'user' ? 'text-orange-100' : 'text-gray-400'} text-right mt-2`}>
                          {msg.timestamp} {msg.sender === 'user' ? '\u2713\u2713' : ''}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="mb-3 flex justify-start">
                      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                        <p className="text-[11px] uppercase tracking-wide text-bright-orange-500 font-semibold mb-2 flex items-center gap-1">
                          <Bot size={11} />
                          Gram AI
                        </p>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-bright-orange-500 animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-bright-orange-500 animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-bright-orange-500 animate-bounce" />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {showScrollButton && (
              <button
                onClick={() => scrollToBottom("smooth")}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-bright-orange-500 hover:bg-bright-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 transition-all animate-fade-in"
                aria-label="Scroll to latest message"
              >
                <ChevronDown size={14} />
                Latest
              </button>
            )}
          </div>

          {/* Attachment preview */}
          {(attachedFile || fileError) && (
            <div className="shrink-0 bg-white px-3 pt-2 border-t border-gray-100">
              {attachedFile && (
                <div className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText size={16} className="text-bright-orange-500 shrink-0" />
                    <span className="text-xs text-gray-700 truncate">{attachedFile.name}</span>
                  </div>
                  <button type="button" onClick={removeAttachment} className="text-gray-400 hover:text-gray-600 shrink-0" aria-label="Remove attachment">
                    <X size={14} />
                  </button>
                </div>
              )}
              {fileError && <p className="text-[11px] text-red-500 mt-1 px-1">{fileError}</p>}
            </div>
          )}

          {/* Input row */}
          <form onSubmit={handleSendMessage} className="shrink-0 bg-white px-3 py-3 flex items-center gap-2 border-t border-gray-100">
            <input ref={fileInputRef} type="file" accept={ACCEPTED_TYPES} className="hidden" onChange={handleFilePick} />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl p-2.5 text-gray-500 hover:text-bright-orange-500 hover:bg-gray-50 transition-colors shrink-0"
              disabled={isTyping || isInitializing}
              aria-label="Attach document"
            >
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                inCustomDocFlow
                  ? "Type your answer\u2026"
                  : session.stage === 'CAPTURE_NAME'
                    ? "Enter your name\u2026"
                    : attachedFile
                      ? "Add a note (optional)\u2026"
                      : "Ask or attach a document\u2026"
              }
              className="flex-1 min-w-0 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-bright-orange-500 focus:border-transparent bg-gray-50"
              disabled={isTyping || isInitializing}
            />
            <button
              type="submit"
              className={`rounded-xl p-2.5 transition-all shrink-0 ${canSend ? 'bg-bright-orange-500 hover:bg-bright-orange-600 shadow-md text-white' : 'bg-gray-100 cursor-not-allowed text-gray-400'}`}
              disabled={!canSend}
              aria-label="Send message"
            >
              {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>

          {/* Footer */}
          <div className="shrink-0 bg-gray-100 px-4 py-2.5 border-t border-gray-200">
            <p className="text-[11px] text-gray-400 text-center">
              AI responses are for guidance only, not legal advice.
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 hover:from-bright-orange-600 hover:to-bright-orange-700 transition-all rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105"
        aria-label="Open Gram AI chat"
      >
        {isOpen ? <X size={24} className="text-white" /> : <Scale size={26} className="text-white" />}
      </button>
    </div>
  );
};

export default ChatWidget;