"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, SendHorizontal, X, MessageCircle } from "lucide-react";

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Hello! I'm your personal fashion stylist. How can I help you today?" }
  ]);

  const suggestions = [
    "What should I wear to a wedding?",
    "Show me evening gowns under ₹10,000",
    "Help me style the Monarch gown",
    "What's trending this season?"
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: message },
      {
        role: "assistant",
        text: "Thank you for your question! Our AI stylist is being trained and will be available soon. In the meantime, our team of personal shoppers would love to help you find the perfect piece."
      }
    ]);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-[360px] overflow-hidden rounded-3xl border border-ink/5 bg-cream shadow-editorial dark:border-cream/10 dark:bg-[#0e0c0a]"
          >
            <div className="flex items-center justify-between border-b border-ink/5 px-6 py-4 dark:border-cream/5">
              <div>
                <p className="font-serif text-lg text-ink dark:text-cream">GRAND Stylist</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">AI-Powered</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-ink/5 dark:text-cream/40 dark:hover:bg-cream/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-72 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      msg.role === "user"
                        ? "bg-ink text-cream dark:bg-cream dark:text-ink"
                        : "bg-ink/5 text-ink/80 dark:bg-cream/10 dark:text-cream/80"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-ink/30 dark:text-cream/30">Try asking</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setMessage(s)}
                      className="rounded-full border border-ink/8 px-3 py-1.5 text-[11px] text-ink/50 transition-colors hover:border-gold hover:text-gold dark:border-cream/10 dark:text-cream/50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-ink/5 p-4 dark:border-cream/5">
              <div className="flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about styling, sizing..."
                  className="flex-1 rounded-full bg-ink/5 px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/30 focus:bg-ink/8 dark:bg-cream/5 dark:text-cream dark:placeholder:text-cream/30"
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-white transition-colors hover:bg-gold-dark disabled:opacity-40"
                >
                  <SendHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex h-14 items-center gap-2 rounded-full bg-ink px-5 shadow-editorial transition-colors hover:bg-gold dark:bg-cream dark:text-ink"
      >
        {open ? (
          <X className="h-5 w-5 text-cream dark:text-ink" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5 text-cream" />
            <span className="hidden text-[13px] font-medium tracking-wide text-cream sm:block">Ask our Stylist</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
