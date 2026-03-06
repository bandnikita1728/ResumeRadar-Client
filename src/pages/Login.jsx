import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

        .login-page {
          min-height: 100vh;
          background: #0a0a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .login-orb-1 {
          position: fixed;
          width: 20rem;
          height: 20rem;
          background: #7c3aed;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: 0.08;
          top: -5rem;
          right: -5rem;
          pointer-events: none;
        }
        .login-orb-2 {
          position: fixed;
          width: 16rem;
          height: 16rem;
          background: #2563eb;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: 0.08;
          bottom: -4rem;
          left: -4rem;
          pointer-events: none;
        }
        .login-box {
          width: 100%;
          max-width: 26rem;
          position: relative;
          z-index: 1;
        }
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .login-logo-icon {
          width: 3rem;
          height: 3rem;
          border-radius: 0.875rem;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: white;
          letter-spacing: 0.05em;
          box-shadow: 0 0 24px rgba(124,58,237,0.4);
        }
        .login-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #f9fafb;
          margin-bottom: 0.25rem;
        }
        .login-subtitle {
          font-size: 0.875rem;
          color: #4b5563;
        }
        .login-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          padding: 1.75rem;
        }
        .login-error {
          margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(248,113,113,0.1);
          border: 1px solid rgba(248,113,113,0.2);
          color: #f87171;
          font-size: 0.875rem;
        }
        .login-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          color: #9ca3af;
          margin-bottom: 0.375rem;
        }
        .login-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 0.75rem;
          padding: 0.65rem 1rem;
          color: #f9fafb;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .login-input::placeholder { color: #374151; }
        .login-input:focus {
          border-color: rgba(124,58,237,0.5);
          background: rgba(124,58,237,0.06);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }
        .login-field {
          margin-bottom: 1rem;
        }
        .login-btn {
          width: 100%;
          padding: 0.7rem 1rem;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 0 20px rgba(124,58,237,0.25);
          margin-top: 0.5rem;
          letter-spacing: 0.01em;
        }
        .login-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #6d28d9, #1d4ed8);
          box-shadow: 0 0 28px rgba(124,58,237,0.4);
          transform: translateY(-1px);
        }
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .login-footer {
          text-align: center;
          font-size: 0.8125rem;
          color: #4b5563;
          margin-top: 1.25rem;
        }
          .login-input:-webkit-autofill,
.login-input:-webkit-autofill:hover,
.login-input:-webkit-autofill:focus,
.login-input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px #0a0a0f inset !important;
  -webkit-text-fill-color: #f9fafb !important;
  caret-color: #f9fafb !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
        .login-footer a {
          color: #a78bfa;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .login-footer a:hover { color: #c4b5fd; }
      `}</style>

      <div className="login-page">
        <div className="login-orb-1" />
        <div className="login-orb-2" />

        <div className="login-box">
          <div className="login-header">
            <Link to="/" style={{
  display: "inline-flex", alignItems: "center", gap: "0.375rem",
  fontSize: "0.8rem", color: "#4b5563", textDecoration: "none",
  marginBottom: "1.25rem", transition: "color 0.2s ease"
}}
onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}
>
  ← Back to Home
</Link>
            <div className="login-logo-icon">🤖</div>
            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">Sign in to ResumeRadar AI</p>
          </div>

          <div className="login-card">
            {error && <div className="login-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="login-field">
                <label className="login-label">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="login-input"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="login-field">
                <label className="login-label">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="login-input"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="login-btn">
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="login-footer">
              Don't have an account?{" "}
              <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
