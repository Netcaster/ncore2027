import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Zap, Send } from "lucide-react";

const BUBBLE_COLOR = "#6366f1";
const BUBBLE_DARK  = "#4f46e5";
const API_KEY      = "ncore_k_2026_tpg";
const API_URL      = "https://naluask.com/api/embed/query";

const NEURAL_SVG = (
  <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="3.5" fill="white"/>
    <circle cx="15" cy="5"  r="2.2" fill="white" opacity="0.85"/>
    <circle cx="23.5" cy="10" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="23.5" cy="20" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="15" cy="25" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="6.5" cy="20" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="6.5" cy="10" r="2.2" fill="white" opacity="0.85"/>
    <line x1="15" y1="7.2"   x2="15"   y2="11.5" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="21.7" y1="11.2" x2="18.2" y2="13.2" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="21.7" y1="18.8" x2="18.2" y2="16.8" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="15" y1="22.8"  x2="15"   y2="18.5" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="8.3" y1="18.8" x2="11.8" y2="16.8" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="8.3" y1="11.2" x2="11.8" y2="13.2" stroke="white" strokeWidth="1" opacity="0.45"/>
    <circle cx="15" cy="15" r="7"  stroke="white" strokeWidth="0.5" opacity="0.15"/>
    <circle cx="15" cy="15" r="12" stroke="white" strokeWidth="0.4" opacity="0.08"/>
  </svg>
);

const CLOSE_SVG = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6"  x2="6"  y2="18"/>
    <line x1="6"  y1="6"  x2="18" y2="18"/>
  </svg>
);

const quickLinks = [
  { label: "Explore Destination",  href: "#destination" },
  { label: "Conference Program",   href: "#program" },
  { label: "TPG Live Layer",       href: "#ncore-live" },
];

const quickFacts = [
  "ARIA Las Vegas venue hold confirmed",
  "No NCORE conference in 2026",
  "TPG Worldwide destination platform",
  "NALU-powered attendee intelligence",
];

type Msg = { role: "user" | "assistant"; content: string };

export function NeuralWidget() {
  const [open, setOpen]         = useState(false);
  const [view, setView]         = useState<"home" | "chat">("home");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && view === "chat") setTimeout(() => inputRef.current?.focus(), 150);
  }, [open, view]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setInput("");
    setView("chat");
    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setLoading(true);
    try {
      const res  = await fetch(API_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ key: API_KEY, query: q }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || data.error || "No response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const renderText = (text: string) =>
    text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");

  return (
    <>
      {/* Floating indigo bubble */}
      <button
        aria-label="Open NCORE 2027 Neural assistant"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          position:       "fixed",
          bottom:         "24px",
          right:          "24px",
          width:          "56px",
          height:         "56px",
          borderRadius:   "50%",
          background:     `linear-gradient(135deg, ${BUBBLE_COLOR}, ${BUBBLE_DARK})`,
          border:         "none",
          cursor:         "pointer",
          boxShadow:      "0 4px 24px rgba(99,102,241,0.45)",
          zIndex:         2147483646,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          transition:     "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 6px 32px rgba(99,102,241,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,102,241,0.45)";
        }}
      >
        {open ? CLOSE_SVG : NEURAL_SVG}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position:      "fixed",
              bottom:        "92px",
              right:         "24px",
              width:         "370px",
              maxHeight:     "540px",
              zIndex:        2147483645,
              borderRadius:  "18px",
              overflow:      "hidden",
              boxShadow:     "0 8px 48px rgba(0,0,0,0.45)",
              display:       "flex",
              flexDirection: "column",
              fontFamily:    "system-ui, -apple-system, sans-serif",
            }}
          >
            {/* Header */}
            <div style={{
              background: `linear-gradient(135deg, ${BUBBLE_COLOR} 0%, ${BUBBLE_DARK} 100%)`,
              padding:    "14px 16px",
              display:    "flex",
              alignItems: "center",
              gap:        10,
              flexShrink: 0,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {NEURAL_SVG}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>NCORE 2027 Neural</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, marginTop: 1 }}>Powered by Nalu AI · TPG Worldwide</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {view === "chat" && (
                  <button
                    onClick={() => setView("home")}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: "4px 6px", borderRadius: 6, fontSize: 11 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  >
                    Home
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={{
              background:    "#070b14",
              flex:          1,
              overflowY:     "auto",
              display:       "flex",
              flexDirection: "column",
            }}>
              {view === "home" ? (
                <div style={{ padding: "16px 16px 8px" }}>
                  {/* Welcome */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: BUBBLE_COLOR,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, fontSize: 10, fontWeight: 700, color: "#fff",
                    }}>AI</div>
                    <div style={{
                      background:   "#0f1729",
                      borderRadius: "4px 14px 14px 14px",
                      padding:      "9px 12px",
                      fontSize:     13,
                      lineHeight:   1.55,
                      color:        "#e2e8f0",
                    }}>
                      I'm the AI assistant for <strong>NCORE 2027 at ARIA Las Vegas</strong>. Ask about the conference, venue, programming, or Las Vegas.
                    </div>
                  </div>

                  {/* Quick facts */}
                  {quickFacts.map((f) => (
                    <div key={f} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "7px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      color: "#94a3b8", fontSize: 11.5,
                    }}>
                      <Zap size={10} color={BUBBLE_COLOR} />
                      {f}
                    </div>
                  ))}

                  {/* Ask prompt */}
                  <div
                    onClick={() => { setView("chat"); setTimeout(() => inputRef.current?.focus(), 150); }}
                    style={{
                      marginTop:  12,
                      padding:    "9px 13px",
                      borderRadius: 10,
                      background: "rgba(99,102,241,0.10)",
                      border:     "1px solid rgba(99,102,241,0.22)",
                      color:      "#a5b4fc",
                      fontSize:   12.5,
                      cursor:     "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.18)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.10)")}
                  >
                    Ask anything about NCORE 2027… →
                  </div>

                  {/* Nav links */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 10, paddingBottom: 4 }}>
                    {quickLinks.map((link) => (
                      <a key={link.label} href={link.href} onClick={() => setOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "9px 13px",
                          borderRadius: 10,
                          background:   "rgba(99,102,241,0.07)",
                          border:       "1px solid rgba(99,102,241,0.16)",
                          color:        "#a5b4fc",
                          fontSize:     12.5,
                          fontWeight:   500,
                          textDecoration: "none",
                          transition:   "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.16)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.07)")}
                      >
                        {link.label}
                        <ArrowRight size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                /* Chat view */
                <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {messages.map((msg, i) => (
                    <div key={i} style={{
                      display:        "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                      gap:            8,
                      alignItems:     "flex-start",
                    }}>
                      {msg.role === "assistant" && (
                        <div style={{
                          width: 26, height: 26, borderRadius: "50%",
                          background: BUBBLE_COLOR,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, fontSize: 9, fontWeight: 700, color: "#fff", marginTop: 2,
                        }}>AI</div>
                      )}
                      <div
                        dangerouslySetInnerHTML={{ __html: renderText(msg.content) }}
                        style={{
                          maxWidth:     "82%",
                          background:   msg.role === "user" ? BUBBLE_COLOR : "#0f1729",
                          borderRadius: msg.role === "user" ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                          padding:      "9px 12px",
                          fontSize:     12.5,
                          lineHeight:   1.6,
                          color:        msg.role === "user" ? "#fff" : "#e2e8f0",
                        }}
                      />
                    </div>
                  ))}
                  {loading && (
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: "50%",
                        background: BUBBLE_COLOR,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, fontSize: 9, fontWeight: 700, color: "#fff",
                      }}>AI</div>
                      <div style={{
                        background: "#0f1729", borderRadius: "4px 14px 14px 14px",
                        padding: "10px 14px", display: "flex", gap: 5, alignItems: "center",
                      }}>
                        {[0, 1, 2].map((i) => (
                          <motion.div key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                            style={{ width: 6, height: 6, borderRadius: "50%", background: BUBBLE_COLOR }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            {/* Input */}
            {view === "chat" && (
              <div style={{
                background:  "#070b14",
                borderTop:   "1px solid rgba(255,255,255,0.06)",
                padding:     "10px 12px",
                display:     "flex",
                gap:         8,
                alignItems:  "center",
                flexShrink:  0,
              }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about NCORE 2027, ARIA, Las Vegas…"
                  style={{
                    flex:         1,
                    background:   "#0f1729",
                    border:       "1px solid rgba(99,102,241,0.25)",
                    borderRadius: 10,
                    padding:      "9px 12px",
                    fontSize:     12.5,
                    color:        "#e2e8f0",
                    outline:      "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.6)")}
                  onBlur={(e)  => (e.target.style.borderColor = "rgba(99,102,241,0.25)")}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  style={{
                    width:          36,
                    height:         36,
                    borderRadius:   "50%",
                    background:     BUBBLE_COLOR,
                    border:         "none",
                    cursor:         input.trim() && !loading ? "pointer" : "not-allowed",
                    opacity:        input.trim() && !loading ? 1 : 0.4,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                    transition:     "opacity 0.15s",
                  }}
                >
                  <Send size={14} color="#fff" />
                </button>
              </div>
            )}

            {/* Footer */}
            <div style={{
              background:  "#070b14",
              borderTop:   view === "chat" ? "none" : "1px solid rgba(255,255,255,0.05)",
              padding:     "7px 16px",
              textAlign:   "center",
              fontSize:    10,
              color:       "rgba(255,255,255,0.18)",
              flexShrink:  0,
            }}>
              Powered by <span style={{ color: "rgba(255,255,255,0.32)" }}>Nalu AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
