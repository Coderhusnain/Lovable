/**
 * =========================================================
 * LEGALGRAM 2.0 - ChatWidget ("Gram AI")
 * UPDATE: Clicking the FAB opens a full-page overlay that
 * slides in from the right, like navigating to a new page.
 * =========================================================
 */

import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import {
  X, Send, Scale, Loader2, Sparkles, User,
  ExternalLink, ChevronDown, Paperclip, FileText,
  FileDown, Search, BookOpen, MessageSquare,
  BarChart2, GitCompare, ArrowUp, SlidersHorizontal, Zap,
  ArrowLeft,
} from "lucide-react";
import LegalgramAPI, { ActionButton, ChatResponse } from "@/services/backendService";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  actionButtons?: ActionButton[] | null;
  attachmentName?: string | null;
  noDocumentMatch?: boolean;
}
interface SessionState { sessionId: string; userName: string | null; stage: string; }
interface CustomDocField { key: string; question: string; }

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.txt,.rtf,.png,.jpg,.jpeg";
const MAX_FILE_MB = 10;
export const OPEN_GRAM_AI_EVENT = "open-gram-ai";

const CUSTOM_DOC_FIELDS: CustomDocField[] = [
  { key: "documentTitle",          question: "What should this document be called? (e.g. \"Equipment Rental Agreement\")" },
  { key: "partyAName",             question: "What is the full name of the first party?" },
  { key: "partyAAddress",          question: "What is the first party's address (or principal place of business)?" },
  { key: "partyBName",             question: "What is the full name of the second party?" },
  { key: "partyBAddress",          question: "What is the second party's address (or principal place of business)?" },
  { key: "effectiveDate",          question: "What date should this agreement take effect? (e.g. \"2026-07-08\")" },
  { key: "purpose",                question: "In a sentence or two, what is the purpose of this agreement?" },
  { key: "keyTerms",               question: "What are the key terms or obligations each party agrees to?" },
  { key: "paymentOrConsideration", question: "Is there any payment, fee, or consideration involved? (or say \"none\")" },
  { key: "duration",               question: "How long does this agreement last, or when does it end?" },
  { key: "governingLaw",           question: "Which state/country's laws should govern this agreement?" },
];

const CUSTOM_DOC_TRIGGERS = [
  "build it new","create new","new form","new document","custom document",
  "not in list","build new","make new","create custom","generate new",
  "i want to build","new doc","banana hai","banao","create it","make a new",
  "build a new","doesn't exist","does not exist","not available",
];

const QUICK_ACTIONS = [
  { icon: BookOpen,      label: "Find a Document",      desc: "Search and find the right legal document for your needs.",    value: "Help me find the right legal document" },
  { icon: MessageSquare, label: "Ask a Legal Question",  desc: "Get a practical understanding of legal concepts.",            value: "I have a legal question I need help with" },
  { icon: BarChart2,     label: "Make a Legal Analysis", desc: "Assess your situation considering facts and legal framework.", value: "I need a legal analysis for my situation" },
  { icon: GitCompare,    label: "Create a Document",     desc: "Build a custom legal document tailored to your needs.",       value: "create new document" },
];

const ChatWidget = () => {
  const [isOpen, setIsOpen]                     = useState(false);
  const [isAnimatingIn, setIsAnimatingIn]       = useState(false);
  const [isAnimatingOut, setIsAnimatingOut]     = useState(false);
  const [inputMessage, setInputMessage]         = useState("");
  const [isTyping, setIsTyping]                 = useState(false);
  const [isInitializing, setIsInitializing]     = useState(false);
  const [messages, setMessages]                 = useState<Message[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [attachedFile, setAttachedFile]         = useState<File | null>(null);
  const [fileError, setFileError]               = useState<string | null>(null);
  const [userTurnCount, setUserTurnCount]       = useState(0);
  const [hasStarted, setHasStarted]             = useState(false);
  const [session, setSession]                   = useState<SessionState>({ sessionId: "", userName: null, stage: "INIT" });
  const [inCustomDocFlow, setInCustomDocFlow]   = useState(false);
  const [customDocStep, setCustomDocStep]       = useState(0);
  const [customDocAnswers, setCustomDocAnswers] = useState<Record<string, string>>({});

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef         = useRef<HTMLInputElement>(null);
  const inputRef             = useRef<HTMLInputElement>(null);
  const atBottomRef          = useRef(true);

  /* ── Open / Close with slide animation ── */
  const openChat = () => {
    setIsOpen(true);
    setIsAnimatingIn(true);
    // lock body scroll
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsAnimatingIn(false), 400);
  };

  const closeChat = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimatingOut(false);
      document.body.style.overflow = "";
    }, 350);
  };

  useEffect(() => {
    const handler = () => openChat();
    window.addEventListener(OPEN_GRAM_AI_EVENT, handler);
    return () => window.removeEventListener(OPEN_GRAM_AI_EVENT, handler);
  }, []);

  /* ── Escape key closes ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeChat(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const initializeChat = async () => {
    setIsInitializing(true);
    try {
      const r = await LegalgramAPI.initSession();
      setSession({ sessionId: r.session_id, userName: r.user_name, stage: r.new_stage });
      setMessages([{ id: "welcome", sender: "assistant", text: r.response, timestamp: getCurrentTime(), actionButtons: r.action_buttons }]);
    } catch {
      setMessages([{ id: "welcome", sender: "assistant", text: "👋 Welcome! I'm Gram AI, your legal assistant.", timestamp: getCurrentTime(), actionButtons: null }]);
    } finally { setIsInitializing(false); }
  };

  const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) { setFileError(`File too large (max ${MAX_FILE_MB}MB).`); return; }
    setAttachedFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canSend = (inputMessage.trim().length > 0 || !!attachedFile) && !isTyping && !isInitializing;

  const isNoDocumentMatch = (r: ChatResponse, i: number) =>
    (!r.suggested_documents || r.suggested_documents.length === 0) && i > 0;

  const startCustomDocFlow = () => {
    setHasStarted(true);
    setInCustomDocFlow(true);
    setCustomDocStep(0);
    setCustomDocAnswers({});
    setMessages(prev => [
      ...prev,
      { id: `${Date.now()}-cs`, sender: "assistant", timestamp: getCurrentTime(), text: "No problem — I'll create a custom document. I just need to ask a few questions." },
    ]);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: `${Date.now()}-q0`, sender: "assistant", timestamp: getCurrentTime(), text: CUSTOM_DOC_FIELDS[0].question }]);
    }, 400);
  };

  const handleQuickAction = (value: string) => {
    const lower = value.toLowerCase();
    if (CUSTOM_DOC_TRIGGERS.some(t => lower.includes(t))) { startCustomDocFlow(); return; }
    if (!hasStarted) { setHasStarted(true); initializeChat(); }
    setInputMessage(value);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    atBottomRef.current = true;
    if (!hasStarted) { setHasStarted(true); await initializeChat(); }

    const text = inputMessage.trim();
    const file = attachedFile;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "user", text, timestamp: getCurrentTime(), attachmentName: file?.name ?? null }]);
    setInputMessage("");
    setAttachedFile(null);

    if (inCustomDocFlow) {
      const cur = CUSTOM_DOC_FIELDS[customDocStep];
      const updated = { ...customDocAnswers, [cur.key]: text };
      setCustomDocAnswers(updated);
      const next = customDocStep + 1;
      if (next < CUSTOM_DOC_FIELDS.length) {
        setCustomDocStep(next);
        setIsTyping(true);
        setTimeout(() => { setIsTyping(false); setMessages(prev => [...prev, { id: `${Date.now()}-q${next}`, sender: "assistant", timestamp: getCurrentTime(), text: CUSTOM_DOC_FIELDS[next].question }]); }, 350);
      } else {
        setInCustomDocFlow(false); setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { id: `${Date.now()}-done`, sender: "assistant", timestamp: getCurrentTime(), text: "Great! Generating your document now..." }]);
          generateStructuredDocumentPdf(updated);
        }, 350);
      }
      return;
    }

    if (CUSTOM_DOC_TRIGGERS.some(t => text.toLowerCase().includes(t))) { startCustomDocFlow(); return; }

    setIsTyping(true);
    const ti = userTurnCount; setUserTurnCount(c => c + 1);
    try {
      const r: ChatResponse = await LegalgramAPI.sendMessage(text || (file ? `Uploading: ${file.name}` : ""), { user_name: session.userName || undefined, stage: session.stage, session_id: session.sessionId });
      setSession({ sessionId: r.session_id, userName: r.user_name, stage: r.new_stage });
      setMessages(prev => [...prev, { id: `${Date.now() + 1}`, sender: "assistant", text: r.response, timestamp: getCurrentTime(), actionButtons: r.action_buttons, noDocumentMatch: isNoDocumentMatch(r, ti) }]);
    } catch {
      setMessages(prev => [...prev, { id: `${Date.now() + 1}`, sender: "assistant", timestamp: getCurrentTime(), text: "I'm having trouble connecting. Please try again.", actionButtons: [{ label: "Try Again", value: "retry", type: "action" }] }]);
    } finally { setIsTyping(false); }
  };

  const handleActionButton = (button: ActionButton) => {
    if (button.type === "link") { window.location.href = button.value; return; }
    atBottomRef.current = true;
    const ti = userTurnCount; setUserTurnCount(c => c + 1);
    const msg = button.value;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "user", text: msg, timestamp: getCurrentTime() }]);
    setIsTyping(true);
    LegalgramAPI.sendMessage(msg, { user_name: session.userName || undefined, stage: session.stage, session_id: session.sessionId })
      .then(r => { setSession({ sessionId: r.session_id, userName: r.user_name, stage: r.new_stage }); setMessages(prev => [...prev, { id: `${Date.now() + 1}`, sender: "assistant", text: r.response, timestamp: getCurrentTime(), actionButtons: r.action_buttons, noDocumentMatch: isNoDocumentMatch(r, ti) }]); })
      .catch(() => {})
      .finally(() => setIsTyping(false));
  };

  const generateStructuredDocumentPdf = (answers: Record<string, string>) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const mx = 56, pw = 595, cw = pw - mx * 2; let y = 64;
    const pA = answers.partyAName || "Party A", pAA = answers.partyAAddress || "[address]";
    const pB = answers.partyBName || "Party B", pBA = answers.partyBAddress || "[address]";
    const ed = answers.effectiveDate || "[date]";
    const es = (n: number) => { if (y + n > 770) { doc.addPage(); y = 64; } };
    const wp = (t: string, bold = false, gap = 14, size = 10.5) => {
      doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(size);
      const lines = doc.splitTextToSize(t, cw); es(lines.length * (size * 1.35) + gap);
      doc.text(lines, mx, y); y += lines.length * (size * 1.35) + gap;
    };
    const wh = (t: string) => {
      es(32); doc.setFont("helvetica", "bold"); doc.setFontSize(11);
      doc.text(t, pw / 2, y, { align: "center" });
      const tw = doc.getTextWidth(t), ux = (pw / 2) - (tw / 2);
      doc.setLineWidth(0.5); doc.line(ux, y + 2, ux + tw, y + 2); y += 20;
    };
    const title = (answers.documentTitle || "Custom Agreement").toUpperCase();
    doc.setFont("helvetica", "bold"); doc.setFontSize(16);
    const tl = doc.splitTextToSize(title, cw);
    doc.text(tl, pw / 2, y, { align: "center" });
    tl.forEach((l: string, i: number) => { const lw = doc.getTextWidth(l), lx = (pw / 2) - (lw / 2); doc.setLineWidth(0.8); doc.line(lx, y + (i * 22) + 3, lx + lw, y + (i * 22) + 3); });
    y += tl.length * 22 + 14;
    wp(`This ${answers.documentTitle || "Agreement"} is made and entered into as of ${ed}, by and between ${pA}, having its principal office at ${pAA}, and ${pB}, having its principal office at ${pBA}.`);
    wp(`Each may be referred to individually as a "Party" and collectively as the "Parties."`);
    wp(`In consideration of the mutual promises contained herein, the Parties agree as follows:`, false, 18);
    let sn = 1;
    wh(`${sn++}. PURPOSE`); wp(answers.purpose || "[not provided]");
    wh(`${sn++}. KEY TERMS AND OBLIGATIONS`); wp(answers.keyTerms || "[not provided]");
    wh(`${sn++}. PAYMENT / CONSIDERATION`); wp(answers.paymentOrConsideration || "None specified.");
    wh(`${sn++}. TERM AND DURATION`); wp(`This Agreement takes effect on ${ed} and continues until ${answers.duration || "terminated by mutual written consent"}.`);
    wh(`${sn++}. GOVERNING LAW`); wp(`This Agreement is governed by the laws of ${answers.governingLaw || "[not provided]"}.`);
    wh(`${sn++}. AMENDMENT`); wp("This Agreement may only be amended in writing signed by both Parties.");
    wh(`${sn++}. SEVERABILITY`); wp("If any provision is held invalid, the remaining provisions continue in full force.");
    wh(`${sn++}. ENTIRE AGREEMENT`); wp("This Agreement supersedes all prior negotiations and agreements on this subject matter.");
    es(140); wh(`${sn++}. SIGNATORIES`); y += 6;
    const sb = (name: string) => { es(90); doc.setFont("helvetica", "bold"); doc.setFontSize(10.5); doc.text(`[${name}]`, mx, y); y += 22; doc.setFont("helvetica", "normal"); doc.text("By: ___________________________", mx, y); y += 20; doc.text(`Name: ${name}`, mx, y); y += 20; doc.text("Title: ___________________________", mx, y); y += 20; doc.text("Date: ___________________________", mx, y); y += 30; };
    sb(pA); sb(pB);
    es(40); doc.setFont("helvetica", "italic"); doc.setFontSize(8.5); doc.setTextColor(140);
    doc.text("Generated by Gram AI. Not reviewed by an attorney. Please review before use.", mx, y, { maxWidth: cw });
    const safe = (answers.documentTitle || "custom-agreement").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    doc.save(`${safe}-${Date.now()}.pdf`);
    setMessages(prev => [...prev, { id: `${Date.now()}-pdf`, sender: "assistant", timestamp: getCurrentTime(), text: `Done! "${answers.documentTitle || "Your document"}" has been downloaded. Please review before use.` }]);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = messagesContainerRef.current;
    if (el) { el.scrollTo({ top: el.scrollHeight, behavior }); atBottomRef.current = true; setShowScrollButton(false); }
  };
  const handleScroll = () => { const el = messagesContainerRef.current; if (!el) return; const d = el.scrollHeight - el.scrollTop - el.clientHeight; atBottomRef.current = d < 80; setShowScrollButton(!atBottomRef.current); };
  useEffect(() => { if (atBottomRef.current) scrollToBottom(); else setShowScrollButton(true); }, [messages, isTyping]);

  const renderText = (text: string) => text.split("\n").map((line, i) => {
    const l = line
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="underline">$1</a>');
    return <p key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: l }} />;
  });

  const resetChat = () => {
    setHasStarted(false);
    setMessages([]);
    setSession({ sessionId: "", userName: null, stage: "INIT" });
    setInCustomDocFlow(false);
    setInputMessage("");
  };

  /* ── Slide animation styles ── */
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    transform: isAnimatingIn
      ? "translateX(100%)"
      : isAnimatingOut
      ? "translateX(100%)"
      : "translateX(0)",
    transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    willChange: "transform",
  };

  return (
    <>
      {/* ── FULL-PAGE OVERLAY ── */}
      {isOpen && (
        <div style={overlayStyle}>

          {/* HEADER */}
          <div className="shrink-0 bg-gradient-to-r from-deep-blue-500 to-deep-blue-600 px-4 py-3 flex items-center gap-3 shadow-sm">
            {/* Back / close button */}
            <button
              onClick={closeChat}
              className="text-blue-200 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="w-9 h-9 rounded-full bg-bright-orange-500 flex items-center justify-center shadow">
              <Scale size={17} className="text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                Gram AI <Sparkles size={12} className="text-yellow-300" />
              </h3>
              <p className="text-[11px] text-blue-200 truncate">
                {isTyping ? "Typing…" : session.userName ? `Helping ${session.userName}` : "Legalgram Legal Assistant"}
              </p>
            </div>

            {hasStarted && (
              <button
                onClick={resetChat}
                className="text-blue-200 hover:text-white text-[11px] px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors border border-white/20"
              >
                Home
              </button>
            )}
          </div>

          {/* ── LANDING VIEW ── */}
          {!hasStarted && (
            <div className="flex flex-col items-center justify-start pt-10 px-5 pb-8 flex-1 overflow-y-auto bg-white max-w-2xl mx-auto w-full">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bright-orange-500 to-bright-orange-600 flex items-center justify-center shadow-md mb-6">
                <Scale size={26} className="text-white" />
              </div>

              <h2 className="font-serif text-[1.75rem] leading-[1.2] font-medium text-gray-900 text-center tracking-tight mb-2 px-2">
                AI Agent for Legal Documents
              </h2>
              <p className="text-[12px] text-gray-400 text-center mb-8">Powered by Gram AI · Legalgram</p>

              {/* Search box */}
              <div className="w-full rounded-2xl border border-gray-200 shadow-sm bg-white mb-6 overflow-hidden transition-all focus-within:border-bright-orange-300 focus-within:shadow-md">
                <div className="flex items-center gap-2.5 px-4 py-4">
                  <div className="w-8 h-8 rounded-lg bg-bright-orange-500 flex items-center justify-center shrink-0">
                    <Scale size={14} className="text-white" />
                  </div>
                  <Search size={16} className="text-gray-400 shrink-0" />
                  <input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && inputMessage.trim()) handleSendMessage(e as any); }}
                    placeholder="Type in your request…"
                    className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={e => { if (inputMessage.trim()) handleSendMessage(e as any); }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0 ${inputMessage.trim() ? "bg-bright-orange-500 text-white shadow" : "border border-gray-200 text-gray-300"}`}
                  >
                    <ArrowUp size={15} />
                  </button>
                </div>

                <div className="flex items-center gap-2 px-4 pb-4 border-t border-gray-100 pt-3">
                  <input ref={fileInputRef} type="file" accept={ACCEPTED_TYPES} className="hidden" onChange={handleFilePick} />
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-bright-orange-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-bright-orange-300 transition-colors">
                    <span className="font-medium">+</span> Add
                  </button>
                  <button type="button" className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-300 transition-colors">
                    <SlidersHorizontal size={12} /> Filters
                  </button>
                  <button type="button" className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-300 transition-colors">
                    <Zap size={12} /> Light
                  </button>
                  {attachedFile && (
                    <div className="flex items-center gap-1 bg-orange-50 border border-bright-orange-200 rounded-lg px-2 py-1 ml-auto">
                      <FileText size={12} className="text-bright-orange-500" />
                      <span className="text-[11px] text-gray-600 truncate max-w-[90px]">{attachedFile.name}</span>
                      <button type="button" onClick={() => setAttachedFile(null)} className="text-gray-400 hover:text-gray-600 ml-0.5"><X size={11} /></button>
                    </div>
                  )}
                </div>
              </div>

              {/* 2×2 quick action cards */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {QUICK_ACTIONS.map((action, i) => (
                  <button key={i} type="button" onClick={() => handleQuickAction(action.value)}
                    className="flex flex-col items-start gap-2.5 p-4 rounded-xl border border-gray-200 bg-white hover:border-bright-orange-300 hover:bg-orange-50/40 transition-all text-left group">
                    <action.icon size={20} className="text-bright-orange-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 leading-tight">{action.label}</span>
                    <span className="text-[11px] text-gray-400 leading-snug">{action.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── CHAT VIEW ── */}
          {hasStarted && (
            <>
              <div className="relative flex-1 min-h-0">
                <div
                  ref={messagesContainerRef}
                  onScroll={handleScroll}
                  className="absolute inset-0 overflow-y-auto overscroll-contain bg-gray-50 px-4 py-5 scroll-smooth"
                  style={{ maxWidth: "100%" }}
                >
                  {/* Constrain message width on wide screens */}
                  <div className="max-w-2xl mx-auto">
                    {isInitializing ? (
                      <div className="flex items-center justify-center h-32">
                        <Loader2 size={24} className="animate-spin text-bright-orange-500" />
                        <span className="ml-2 text-gray-400 text-sm">Starting…</span>
                      </div>
                    ) : (
                      <>
                        {messages.map(msg => (
                          <div key={msg.id} className={`mb-4 flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.sender === "assistant" && (
                              <div className="w-9 h-9 rounded-full bg-bright-orange-500 flex items-center justify-center shadow shrink-0 mt-0.5">
                                <Scale size={15} className="text-white" />
                              </div>
                            )}
                            <div className={`${msg.sender === "user" ? "bg-bright-orange-500 text-white rounded-2xl rounded-br-md" : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-md"} px-4 py-3 shadow-sm max-w-[78%]`}>
                              {msg.sender === "assistant" && <p className="text-[10px] uppercase tracking-widest text-bright-orange-500 font-bold mb-1.5">Gram AI</p>}
                              {msg.sender === "user" && (
                                <p className="text-[10px] uppercase tracking-widest text-orange-100 font-bold mb-1.5 flex items-center gap-1">
                                  <User size={10} />{session.userName || "You"}
                                </p>
                              )}
                              {msg.attachmentName && (
                                <div className={`mb-2 flex items-center gap-2 rounded-lg px-2.5 py-2 ${msg.sender === "user" ? "bg-white/15" : "bg-gray-100"}`}>
                                  <FileText size={13} className={msg.sender === "user" ? "text-white" : "text-bright-orange-500"} />
                                  <span className="text-xs truncate max-w-[12rem]">{msg.attachmentName}</span>
                                </div>
                              )}
                              {msg.text && <div className={msg.sender === "user" ? "text-white" : "text-gray-700"}>{renderText(msg.text)}</div>}
                              {msg.actionButtons && msg.actionButtons.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {msg.actionButtons.map((btn, idx) => (
                                    <button key={idx} type="button" onClick={() => handleActionButton(btn)}
                                      className="text-xs bg-bright-orange-500 hover:bg-bright-orange-600 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                                      {btn.type === "link" && <ExternalLink size={10} />}{btn.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                              {msg.noDocumentMatch && (
                                <div className="mt-3">
                                  <button type="button" onClick={startCustomDocFlow}
                                    className="text-xs bg-deep-blue-600 hover:bg-deep-blue-700 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <FileDown size={11} /> Create a Custom Document
                                  </button>
                                </div>
                              )}
                              <p className={`text-[10px] ${msg.sender === "user" ? "text-orange-100" : "text-gray-400"} text-right mt-2`}>
                                {msg.timestamp}{msg.sender === "user" ? " ✓✓" : ""}
                              </p>
                            </div>
                            {msg.sender === "user" && (
                              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                                <User size={15} className="text-gray-500" />
                              </div>
                            )}
                          </div>
                        ))}
                        {isTyping && (
                          <div className="mb-4 flex gap-2.5 justify-start">
                            <div className="w-9 h-9 rounded-full bg-bright-orange-500 flex items-center justify-center shadow shrink-0 mt-0.5">
                              <Scale size={15} className="text-white" />
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                              <p className="text-[10px] uppercase tracking-widest text-bright-orange-500 font-bold mb-2">Gram AI</p>
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-bright-orange-500 animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 rounded-full bg-bright-orange-500 animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 rounded-full bg-bright-orange-500 animate-bounce" />
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {showScrollButton && (
                  <button type="button" onClick={() => scrollToBottom()}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-bright-orange-500 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 z-10">
                    <ChevronDown size={14} /> Latest
                  </button>
                )}
              </div>

              {/* Attached file preview */}
              {(attachedFile || fileError) && (
                <div className="shrink-0 bg-white px-4 pt-2 border-t border-gray-100">
                  <div className="max-w-2xl mx-auto">
                    {attachedFile && (
                      <div className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText size={14} className="text-bright-orange-500 shrink-0" />
                          <span className="text-xs text-gray-700 truncate">{attachedFile.name}</span>
                        </div>
                        <button type="button" onClick={() => setAttachedFile(null)} className="text-gray-400 hover:text-gray-600"><X size={13} /></button>
                      </div>
                    )}
                    {fileError && <p className="text-[11px] text-red-500 mt-1 px-1">{fileError}</p>}
                  </div>
                </div>
              )}

              {/* Input bar */}
              <form onSubmit={handleSendMessage} className="shrink-0 bg-white px-4 py-3 flex items-center gap-3 border-t border-gray-100">
                <div className="max-w-2xl mx-auto flex items-center gap-3 w-full">
                  <input ref={fileInputRef} type="file" accept={ACCEPTED_TYPES} className="hidden" onChange={handleFilePick} />
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="rounded-xl p-2 text-gray-400 hover:text-bright-orange-500 hover:bg-gray-50 transition-colors shrink-0"
                    disabled={isTyping || isInitializing}>
                    <Paperclip size={18} />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder={
                      inCustomDocFlow
                        ? "Type your answer…"
                        : session.stage === "CAPTURE_NAME"
                        ? "Enter your name…"
                        : "Type in your request…"
                    }
                    className="flex-1 min-w-0 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-bright-orange-500 bg-gray-50"
                    disabled={isTyping || isInitializing}
                  />
                  <button
                    type="submit"
                    className={`rounded-xl p-3 transition-all shrink-0 ${canSend ? "bg-bright-orange-500 hover:bg-bright-orange-600 text-white shadow-md" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
                    disabled={!canSend}
                  >
                    {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
              </form>

              <div className="shrink-0 bg-gray-50 px-4 py-2 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 text-center">AI responses are for guidance only, not legal advice.</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── FLOATING ACTION BUTTON ── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            type="button"
            onClick={openChat}
            className="bg-gradient-to-r from-bright-orange-500 to-bright-orange-600 hover:from-bright-orange-600 hover:to-bright-orange-700 transition-all rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-105"
            aria-label="Open Gram AI"
          >
            <Scale size={24} className="text-white" />
          </button>
        </div>
      )}
    </>
  );
};

export default ChatWidget;