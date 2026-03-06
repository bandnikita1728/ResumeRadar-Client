import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: "🎯",
    title: "ATS Score Analysis",
    desc: "Instantly see how your resume scores against any job description with our intelligent matching engine.",
  },
  {
    icon: "🤖",
    title: "AI Copilot",
    desc: "Chat with LLaMA 3.3 to get personalized resume advice, rewrites, and career guidance.",
  },
  {
    icon: "✨",
    title: "AI Resume Improvement",
    desc: "Let AI strengthen your bullet points, add missing keywords, and tailor your resume for any role.",
  },
  {
    icon: "💼",
    title: "Live Job Matches",
    desc: "Get real job recommendations from LinkedIn, Indeed & Glassdoor matched to your skills.",
  },
  {
    icon: "🔍",
    title: "Keyword Gap Analysis",
    desc: "See exactly which keywords are missing from your resume compared to the job description.",
  },
  {
    icon: "📊",
    title: "Skill Gap Insights",
    desc: "Visualize which skills you have vs. what employers are looking for in real time.",
  },
];

const STATS = [
  { value: "98%", label: "ATS Pass Rate" },
  { value: "3x", label: "More Interviews" },
  { value: "10K+", label: "Resumes Analyzed" },
  { value: "< 30s", label: "Analysis Time" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Upload Your Resume", desc: "Drop your PDF or DOCX — we parse it instantly with AI." },
  { step: "02", title: "Paste a Job Description", desc: "Copy any JD from LinkedIn, Naukri, or anywhere." },
  { step: "03", title: "Get Your ATS Score", desc: "See your match score, missing keywords, and skill gaps." },
  { step: "04", title: "Let AI Fix It", desc: "One click to improve, tailor, or chat with your AI Copilot." },
];

const FloatingOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`} />
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        .syne { font-family: 'Syne', sans-serif; }
        .grad-text {
          background: linear-gradient(135deg, #a78bfa, #60a5fa, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-glass {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
        }
        .card-glass:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(167,139,250,0.3);
          transform: translateY(-4px);
          transition: all 0.3s ease;
        }
        .step-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .btn-glow {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          box-shadow: 0 0 30px rgba(124,58,237,0.4);
          transition: all 0.3s ease;
        }
        .btn-glow:hover {
          box-shadow: 0 0 50px rgba(124,58,237,0.6);
          transform: translateY(-2px);
        }
        .fade-up {
          animation: fadeUp 0.7s ease forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tag { background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.25); }
      `}</style>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{ background: "rgba(10,10,15,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}>
              <div className="login-logo-icon">🤖</div>
            </div>
            <span className="font-semibold text-white syne text-lg">ResumeRadar <span className="grad-text">AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2">Sign In</Link>
            <Link to="/signup" className="btn-glow text-sm font-semibold px-5 py-2.5 rounded-xl text-white">Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <FloatingOrb className="w-96 h-96 bg-violet-600 top-20 -left-48" />
        <FloatingOrb className="w-80 h-80 bg-blue-600 top-40 right-0" />
        <FloatingOrb className="w-64 h-64 bg-emerald-500 bottom-20 left-1/3" />

        <div className="max-w-4xl mx-auto text-center relative z-10 fade-up">
          <div className="inline-flex items-center gap-2 tag rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-violet-300 font-medium">Powered by LLaMA 3.3 · Free to use</span>
          </div>

          <h1 className="syne text-5xl sm:text-6xl lg:text-7xl font-800 leading-tight mb-6">
            Land Your Dream Job<br />
            <span className="grad-text">Beat the ATS.</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your resume, paste any job description, and get an instant ATS score with AI-powered suggestions to land more interviews.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="btn-glow text-base font-semibold px-8 py-4 rounded-2xl text-white w-full sm:w-auto">
              Analyze My Resume — It's Free →
            </Link>
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
              Already have an account? Sign in
            </Link>
          </div>

          {/* Mock ATS Score Card */}
          <div className="mt-16">
            <div className="card-glass rounded-3xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs text-gray-500 ml-2">ResumeRadar AI · ATS Analysis</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative flex-shrink-0">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                      strokeDasharray="251" strokeDashoffset="63" strokeLinecap="round" transform="rotate(-90 50 50)" />
                    <defs>
                      <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                    <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="700" fill="white">75</text>
                    <text x="50" y="64" textAnchor="middle" fontSize="7" fill="#9ca3af">/100</text>
                  </svg>
                </div>
                <div className="flex-1 space-y-2.5 text-left">
                  {[
                    { label: "Keyword Match", val: 78, color: "#a78bfa" },
                    { label: "Skills Match", val: 65, color: "#60a5fa" },
                    { label: "Experience", val: 82, color: "#34d399" },
                  ].map(({ label, val, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">{label}</span>
                        <span className="text-white font-semibold">{val}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${val}%`, background: color, opacity: 0.8 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden sm:flex flex-col gap-1.5 flex-shrink-0">
                  {["React", "Node.js", "MongoDB"].map(s => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full text-emerald-400"
                      style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>✓ {s}</span>
                  ))}
                  {["Docker", "AWS"].map(s => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full text-red-400"
                      style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>✗ {s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="syne text-3xl sm:text-4xl font-bold grad-text mb-1">{value}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="tag text-xs text-violet-300 px-3 py-1.5 rounded-full font-medium">How It Works</span>
            <h2 className="syne text-3xl sm:text-4xl font-bold mt-4 mb-3">
              From resume to interview<br /><span className="grad-text">in 4 simple steps</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="step-card rounded-2xl p-6">
                <div className="syne text-4xl font-bold mb-4" style={{ color: "rgba(167,139,250,0.3)" }}>{step}</div>
                <h3 className="font-semibold text-white mb-2 text-sm">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 relative">
        <FloatingOrb className="w-96 h-96 bg-blue-700 top-0 right-0 opacity-10" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="tag text-xs text-violet-300 px-3 py-1.5 rounded-full font-medium">Features</span>
            <h2 className="syne text-3xl sm:text-4xl font-bold mt-4">
              <span className="grad-text">Everything you need</span><br />to get hired faster
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="card-glass rounded-2xl p-6 transition-all duration-300 cursor-default">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-glass rounded-3xl p-12 relative overflow-hidden">
            <FloatingOrb className="w-64 h-64 bg-violet-600 -top-20 -right-20 opacity-30" />
            <FloatingOrb className="w-48 h-48 bg-blue-600 -bottom-10 -left-10 opacity-20" />
            <div className="relative z-10">
              <h2 className="syne text-3xl sm:text-4xl font-bold mb-4">
                Ready to <span className="grad-text">beat the ATS?</span>
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Join thousands of job seekers who've improved their resume with ResumeRadar AI.
              </p>
              <Link to="/signup" className="btn-glow inline-block text-base font-semibold px-10 py-4 rounded-2xl text-white">
                Get Started Free — No Credit Card
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}>
              <span className="text-white text-xs font-bold syne">RR</span>
            </div>
            <span className="text-gray-500 text-sm">ResumeRadar AI</span>
          </div>
          <p className="text-gray-600 text-xs">Built with ❤️ by Nikita Band · Powered by Groq & LLaMA 3.3</p>
          <div className="flex gap-4 text-xs text-gray-600">
            <Link to="/login" className="hover:text-gray-400 transition-colors">Sign In</Link>
            <Link to="/signup" className="hover:text-gray-400 transition-colors">Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;