import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(({ id, message, type }) => (
          <div key={id}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium"
            style={{
              background: type === "success" ? "#052e16" : type === "error" ? "#2d0a0a" : "#0c1a2e",
              border: `1px solid ${type === "success" ? "#166534" : type === "error" ? "#7f1d1d" : "#1e3a5f"}`,
              color: type === "success" ? "#4ade80" : type === "error" ? "#f87171" : "#60a5fa",
              minWidth: "260px",
              animation: "slideIn 0.3s ease",
            }}>
            <span className="text-base">{type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
            <span className="flex-1">{message}</span>
            <button onClick={() => removeToast(id)} className="opacity-60 hover:opacity-100 ml-2">✕</button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};