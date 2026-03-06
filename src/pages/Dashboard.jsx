import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import ResumeUpload from "../components/ResumeUpload";
import { getResumes, deleteResume } from "../services/resumeService";

const getScoreColor = (score) => {
  if (!score) return { color: "#6b7280", bg: "rgba(107,114,128,0.12)", border: "rgba(107,114,128,0.2)" };
  if (score >= 75) return { color: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.25)" };
  if (score >= 50) return { color: "#fbbf24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.25)" };
  return { color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.25)" };
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchResumes = async () => {
    try {
      const data = await getResumes();
      setResumes(data.resumes || []);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResumes(); }, []);
  useEffect(() => {
    const interval = setInterval(fetchResumes, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUploadSuccess = (resume) => {
    setShowUpload(false);
    fetchResumes();
    navigate(`/analyze/${resume._id}`);
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm("Delete this resume?")) return;
    setDeletingId(resumeId);
    try {
      await deleteResume(resumeId);
      setResumes((prev) => prev.filter((r) => r._id !== resumeId));
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const scoredResumes = resumes.filter((r) => r.lastAtsScore != null && r.lastAtsScore > 0);
  const avgScore = scoredResumes.length
    ? Math.round(scoredResumes.reduce((acc, r) => acc + r.lastAtsScore, 0) / scoredResumes.length)
    : null;
  const avgColors = getScoreColor(avgScore);

  return (
    <div className="min-h-screen text-white" style={{ background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        .syne { font-family: 'Syne', sans-serif; }
        .grad-text {
          background: linear-gradient(135deg, #a78bfa, #60a5fa, #34d399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-dark {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border-radius: 1.25rem;
          padding: 1.5rem;
        }
        .resume-row {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1rem;
          padding: 1rem 1.25rem;
          transition: all 0.2s ease;
        }
        .resume-row:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(167,139,250,0.3);
        }
        .btn-glow {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          box-shadow: 0 0 20px rgba(124,58,237,0.3);
          transition: all 0.3s ease;
          border-radius: 0.875rem;
          padding: 0.6rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          border: none;
          cursor: pointer;
        }
        .btn-glow:hover {
          box-shadow: 0 0 35px rgba(124,58,237,0.5);
          transform: translateY(-1px);
        }
        .btn-glow:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem;
          padding: 1.25rem;
        }
        .quick-action {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.875rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .quick-action:hover {
          background: rgba(124,58,237,0.15);
          border-color: rgba(124,58,237,0.3);
          transform: translateX(4px);
        }
        .orb {
          position: fixed;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: 0.12;
          pointer-events: none;
          z-index: 0;
        }
        .hero-banner {
          background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.15), rgba(52,211,153,0.1));
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 1.5rem;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        .hero-banner::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%);
          border-radius: 50%;
        }
      `}</style>

      <div className="orb w-80 h-80 bg-violet-600 top-0 right-0" />
      <div className="orb w-64 h-64 bg-blue-600 bottom-20 left-0" />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 relative z-10">

        {/* Hero Banner */}
        <div className="hero-banner mb-8">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">{getGreeting()} 👋</p>
              <h1 className="syne text-3xl sm:text-4xl font-bold mb-2">
                {user?.name?.split(" ")[0]},{" "}
                <span className="grad-text">let's get you hired.</span>
              </h1>
              <p className="text-gray-500 text-sm max-w-md">
                Your AI-powered resume coach is ready. Upload a resume and start optimizing.
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-20 h-20 rounded-2xl text-5xl flex-shrink-0"
              style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)" }}>
              🚀
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {[
            { label: "Resumes", value: resumes.length, color: "#a78bfa" },
            {
              label: "Avg ATS Score",
              value: avgScore ? `${avgScore}%` : "—",
              color: avgColors.color
            },
            { label: "Analyses Run", value: scoredResumes.length, color: "#60a5fa" },
            
          ].map(({ label, value, color }) => (
            <div key={label} className="stat-card">
              <div className="syne text-2xl font-bold mb-1" style={{ color }}>{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Main 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Resumes — left 2/3 */}
          <div className="lg:col-span-2 card-dark">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="syne text-lg font-bold text-white">My Resumes</h2>
                <p className="text-xs text-gray-600 mt-0.5">{resumes.length} total</p>
              </div>
              <button onClick={() => setShowUpload(!showUpload)} className="btn-glow">
                {showUpload ? "✕ Cancel" : "+ Upload Resume"}
              </button>
            </div>

            {showUpload && (
              <div className="mb-6 p-4 rounded-xl"
                style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
                <ResumeUpload onUploadSuccess={handleUploadSuccess} />
              </div>
            )}

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="resume-row animate-pulse flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)" }} />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 rounded w-1/2" style={{ background: "rgba(255,255,255,0.05)" }} />
                      <div className="h-2 rounded w-1/3" style={{ background: "rgba(255,255,255,0.05)" }} />
                    </div>
                    <div className="w-16 h-6 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
                  </div>
                ))}
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">📄</div>
                <p className="text-gray-400 font-medium mb-1">No resumes yet</p>
                <p className="text-gray-600 text-sm mb-5">Upload your first resume to get started with AI analysis</p>
                <button onClick={() => setShowUpload(true)} className="btn-glow">
                  Upload Resume →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {resumes.map((resume) => {
                  const sc = getScoreColor(resume.lastAtsScore);
                  return (
                    <div key={resume._id} className="resume-row flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}>
                          <span className="text-lg">{resume.fileType === "pdf" ? "📕" : "📘"}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white truncate">{resume.fileName}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-xs text-gray-600">
                              {new Date(resume.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            {resume.parsedData?.skills?.length > 0 && (
                              <span className="text-xs text-gray-600">{resume.parsedData.skills.length} skills</span>
                            )}
                            {resume.lastAtsScore != null && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                style={{ color: sc.color, background: sc.bg, border: `1px solid ${sc.border}` }}>
                                ATS {resume.lastAtsScore}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {resume.lastAtsScore != null && (
                        <div className="hidden sm:block w-20 flex-shrink-0">
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                            <div className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${resume.lastAtsScore}%`, background: sc.color }} />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => navigate(`/analyze/${resume._id}`)} className="btn-glow text-xs px-3 py-1.5">
                          Analyze
                        </button>
                        <button
                          onClick={() => handleDelete(resume._id)}
                          disabled={deletingId === resume._id}
                          className="p-2 rounded-lg transition-all"
                          style={{ color: "#4b5563" }}
                          onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                          onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">

            {/* Quick Actions */}
            <div className="card-dark"
              style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.2)" }}>
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="syne text-base font-bold text-white mb-1">Quick Actions</h3>
              <p className="text-xs text-gray-600 mb-4">Jump right in</p>
              <div className="space-y-2">
                <button onClick={() => setShowUpload(true)} className="quick-action">
                  📤 Upload New Resume
                </button>
                <button onClick={() => navigate("/jobs")} className="quick-action">
                  💼 Browse Jobs
                </button>
                
              </div>
            </div>

            {/* Pro Tips */}
            <div className="card-dark"
              style={{ background: "rgba(124,58,237,0.06)", borderColor: "rgba(124,58,237,0.15)" }}>
              <h3 className="syne text-sm font-bold mb-3" style={{ color: "#a78bfa" }}>💡 Pro Tips</h3>
              <div className="space-y-3">
                {[
                  { icon: "📝", tip: "Paste a job description to get an accurate ATS score" },
                  { icon: "🤖", tip: "Use AI Copilot to rewrite bullet points with action verbs" },
                  { icon: "🎯", tip: "Aim for ATS score above 75% before applying" },
                ].map(({ icon, tip }) => (
                  <div key={tip} className="flex items-start gap-2.5">
                    <span className="text-base flex-shrink-0">{icon}</span>
                    <p className="text-xs text-gray-500 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;