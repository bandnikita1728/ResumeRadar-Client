import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/jobs", label: "Jobs" },
];

  const isActive = (path) => {
  if (path === "/") return location.pathname === "/";
  return location.pathname.startsWith(path);
};
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

        .navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(10, 10, 15, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          font-family: 'DM Sans', sans-serif;
        }
        .navbar-inner {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 3.75rem;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          text-decoration: none;
        }
        .navbar-logo-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem;
          font-weight: 800;
          color: white;
          letter-spacing: 0.05em;
          box-shadow: 0 0 16px rgba(124,58,237,0.35);
          flex-shrink: 0;
        }
        .navbar-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #f9fafb;
        }
        .navbar-logo-text span {
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .navbar-link {
          padding: 0.4rem 0.875rem;
          border-radius: 0.625rem;
          font-size: 0.8125rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          color: #6b7280;
          border: 1px solid transparent;
        }
        .navbar-link:hover {
          color: #e5e7eb;
          background: rgba(255,255,255,0.06);
        }
        .navbar-link.active {
          color: #a78bfa;
          background: rgba(124,58,237,0.12);
          border-color: rgba(124,58,237,0.2);
        }
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .navbar-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: white;
          border: 1px solid rgba(124,58,237,0.3);
          flex-shrink: 0;
        }
        .navbar-username {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #d1d5db;
        }
        .navbar-logout {
          font-size: 0.75rem;
          font-weight: 500;
          color: #4b5563;
          background: none;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0.5rem;
          padding: 0.3rem 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .navbar-logout:hover {
          color: #f87171;
          border-color: rgba(248,113,113,0.25);
          background: rgba(248,113,113,0.08);
        }
        .navbar-hamburger {
          display: none;
          padding: 0.4rem;
          border-radius: 0.5rem;
          background: none;
          border: 1px solid rgba(255,255,255,0.08);
          color: #9ca3af;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .navbar-hamburger:hover {
          background: rgba(255,255,255,0.06);
          color: #e5e7eb;
        }
        .navbar-mobile {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 0.75rem 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .navbar-mobile-link {
          display: block;
          padding: 0.5rem 0.75rem;
          border-radius: 0.625rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #9ca3af;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .navbar-mobile-link:hover {
          background: rgba(255,255,255,0.06);
          color: #e5e7eb;
        }
        .navbar-mobile-logout {
          display: block;
          width: 100%;
          text-align: left;
          padding: 0.5rem 0.75rem;
          border-radius: 0.625rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #f87171;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
        }
        .navbar-mobile-logout:hover {
          background: rgba(248,113,113,0.08);
        }
        @media (max-width: 768px) {
          .navbar-links, .navbar-desktop-only { display: none !important; }
          .navbar-hamburger { display: flex; align-items: center; justify-content: center; }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/dashboard" className="navbar-logo">
            <div className="navbar-logo-icon" style={{ fontSize: "1.1rem" }}>🤖</div>
            <span className="navbar-logo-text">
              ResumeRadar <span>AI</span>
            </span>
          </Link>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-right">
            <div className="navbar-desktop-only" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div className="navbar-avatar">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="navbar-username">{user?.name}</span>
              <button onClick={handleLogout} className="navbar-logout">Logout</button>
            </div>
            <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="navbar-mobile">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="navbar-mobile-link"
                onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0.25rem 0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem" }}>
              <div className="navbar-avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
              <span className="navbar-username">{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="navbar-mobile-logout">Logout</button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;