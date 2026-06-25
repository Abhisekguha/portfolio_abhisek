"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Message = { role: "user" | "bot"; content: string };

const SUGGESTIONS = [
  "What's Abhisek's strongest skill?",
  "Tell me about the OCR pipeline work",
  "What projects can he show code for?",
  "Is he open to new opportunities?",
];

function renderMarkdown(text: string): string {
  marked.setOptions({ breaks: true, gfm: true });
  const raw = marked.parse(text) as string;
  return DOMPurify.sanitize(raw, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "p", "br", "ul", "ol", "li",
      "table", "thead", "tbody", "tr", "th", "td",
      "pre", "code", "blockquote", "strong", "em", "a",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
  });
}

export function AskAbhisekAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialized && open) {
      setMessages([
        {
          role: "bot",
          content: `Hi! I'm **Abhisek's AI assistant**. Ask me about experience, projects, skills, or metrics — I respond in Markdown.`,
        },
      ]);
      setInitialized(true);
    }
  }, [open, initialized]);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }

      const data = await res.json();
      const answer = data?.choices?.[0]?.message?.content;
      if (!answer) throw new Error("No response from AI");

      setMessages((prev) => [...prev, { role: "bot", content: answer.trim() }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: `⚠️ ${err instanceof Error ? err.message : "Something went wrong"}` },
      ]);
    } finally {
      setLoading(false);
    }
  }, [loading, messages]);

  return (
    <>
      <section id="ask-ai" className="relative py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-electric">Mission Control</span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-[-0.04em] mt-4 mb-6">
            Ask Abhisek AI
          </h2>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            RAG-powered assistant with full context on resume, projects, experience, and skills.
          </p>
          <MagneticButton
            onClick={() => setOpen(true)}
            className="px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full bg-electric/10 border border-electric/40 text-electric hover:glow-blue"
          >
            Launch Assistant ✦
          </MagneticButton>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg z-[70] flex flex-col border-l border-electric/20 bg-[#080810]/95 backdrop-blur-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse glow-blue" />
                  <div>
                    <div className="text-sm font-bold uppercase tracking-wider">Ask Abhisek AI</div>
                    <div className="text-[10px] text-muted uppercase tracking-widest">RAG · Portfolio Context</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-electric/40 transition-colors text-muted hover:text-white"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div ref={messagesRef} className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length <= 1 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendMessage(s)}
                        className="text-xs px-3 py-2 rounded-full border border-white/10 text-muted hover:border-electric/40 hover:text-electric transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "ml-8 p-4 rounded-2xl bg-electric/10 border border-electric/20 text-right"
                        : "mr-4 p-4 rounded-2xl glass prose prose-invert prose-sm max-w-none [&_a]:text-electric"
                    }`}
                    {...(msg.role === "bot"
                      ? { dangerouslySetInnerHTML: { __html: renderMarkdown(msg.content) } }
                      : {})}
                  >
                    {msg.role === "user" ? msg.content : null}
                  </div>
                ))}
                {loading && (
                  <div className="text-xs text-muted animate-pulse font-mono uppercase tracking-widest">
                    Processing...
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-white/5 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask anything about Abhisek…"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm outline-none focus:border-electric/40 transition-colors"
                />
                <MagneticButton
                  onClick={() => sendMessage(input)}
                  className="w-12 h-12 rounded-full bg-electric text-white flex items-center justify-center glow-blue"
                >
                  →
                </MagneticButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-electric/90 text-white text-xs font-bold uppercase tracking-wider glow-blue gpu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✦ Ask Me
        </motion.button>
      )}
    </>
  );
}
