import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { sendMessage } from "../services/chatService";

const QUICK_PROMPTS = [
  "Improve my bullet points",
  "Add missing keywords",
  "Tailor for this job",
  "Make it ATS-friendly",
];

const ChatAssistant = ({ resumeId, jobDescriptionId, onResumeUpdate }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI Resume Copilot powered by LLaMA 3.3. I can help you improve your resume, suggest edits, and tailor it for specific jobs. What would you like help with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendMessage({
        message: userMsg.content,
        sessionId,
        resumeId,
        jobDescriptionId,
      });
      setSessionId(data.sessionId);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (data.updatedResume && onResumeUpdate) onResumeUpdate(data.updatedResume);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again.", isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "1.25rem",
      display: "flex",
      flexDirection: "column",
      height: "600px",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Header */}
      <div style={{
        padding: "1rem 1.25rem",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(124,58,237,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "2.25rem", height: "2.25rem",
            borderRadius: "0.75rem",
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem",
            boxShadow: "0 0 15px rgba(124,58,237,0.4)",
          }}>🤖</div>
          <div>
            <p style={{ fontSize: "0.875rem", fontWeight: "700", color: "white", fontFamily: "'Syne', sans-serif" }}>
              AI Copilot
            </p>
            <p style={{ fontSize: "0.7rem", color: "#6b7280" }}>Powered by LLaMA 3.3</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399" }} />
          <span style={{ fontSize: "0.7rem", color: "#6b7280" }}>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{
                width: "1.75rem", height: "1.75rem", borderRadius: "0.5rem",
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", flexShrink: 0, marginRight: "0.5rem", marginTop: "0.25rem",
              }}>🤖</div>
            )}
            <div style={{
              maxWidth: "80%",
              padding: "0.75rem 1rem",
              borderRadius: msg.role === "user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
              fontSize: "0.875rem",
              lineHeight: "1.6",
              background: msg.role === "user"
                ? "linear-gradient(135deg, #7c3aed, #2563eb)"
                : msg.isError
                ? "rgba(248,113,113,0.1)"
                : "rgba(255,255,255,0.05)",
              border: msg.role === "user"
                ? "none"
                : msg.isError
                ? "1px solid rgba(248,113,113,0.2)"
                : "1px solid rgba(255,255,255,0.08)",
              color: msg.role === "user" ? "white" : msg.isError ? "#f87171" : "#d1d5db",
              boxShadow: msg.role === "user" ? "0 0 20px rgba(124,58,237,0.25)" : "none",
            }}>
              {msg.role === "assistant" ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p style={{ margin: "0 0 0.5rem 0" }}>{children}</p>,
                    strong: ({ children }) => <strong style={{ color: "#a78bfa" }}>{children}</strong>,
                    ul: ({ children }) => <ul style={{ paddingLeft: "1.25rem", margin: "0.25rem 0" }}>{children}</ul>,
                    li: ({ children }) => <li style={{ marginBottom: "0.25rem" }}>{children}</li>,
                    code: ({ children }) => (
                      <code style={{
                        background: "rgba(124,58,237,0.2)",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "0.25rem",
                        fontSize: "0.8rem",
                        color: "#a78bfa",
                      }}>{children}</code>
                    ),
                  }}
                >{msg.content}</ReactMarkdown>
              ) : msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{
              width: "1.75rem", height: "1.75rem", borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.75rem", flexShrink: 0,
            }}>🤖</div>
            <div style={{
              padding: "0.75rem 1rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "1rem 1rem 1rem 0.25rem",
              display: "flex", gap: "0.35rem", alignItems: "center",
            }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: "0.4rem", height: "0.4rem",
                  borderRadius: "50%",
                  background: "#7c3aed",
                  animation: "bounce 1s infinite",
                  animationDelay: `${i * 0.15}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div style={{ padding: "0 1rem 0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              style={{
                fontSize: "0.75rem",
                padding: "0.35rem 0.875rem",
                borderRadius: "2rem",
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.25)",
                color: "#a78bfa",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(124,58,237,0.2)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(124,58,237,0.1)";
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)";
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: "0.75rem 1rem 1rem",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        gap: "0.625rem",
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ask about your resume..."
          disabled={loading}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0.875rem",
            padding: "0.65rem 1rem",
            color: "white",
            fontSize: "0.875rem",
            outline: "none",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          style={{
            background: input.trim() && !loading
              ? "linear-gradient(135deg, #7c3aed, #2563eb)"
              : "rgba(255,255,255,0.06)",
            border: "none",
            borderRadius: "0.875rem",
            padding: "0.65rem 1rem",
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
            boxShadow: input.trim() && !loading ? "0 0 15px rgba(124,58,237,0.3)" : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg style={{ width: "1rem", height: "1rem", color: input.trim() && !loading ? "white" : "#4b5563" }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
