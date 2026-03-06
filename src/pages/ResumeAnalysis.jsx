import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ATSScore from "../components/ATSScore";
import KeywordAnalysis from "../components/KeywordAnalysis";
import SkillGap from "../components/SkillGap";
import ChatAssistant from "../components/ChatAssistant";
import { getResumeById, analyzeResume, improveResume, tailorResume } from "../services/resumeService";

const TABS = ["ATS Analysis", "Keywords", "Skills", "AI Copilot"];

const ResumeAnalysis = () => {
  const { resumeId } = useParams();
  const [resume, setResume] = useState(null);
  const [activeTab, setActiveTab] = useState("ATS Analysis");
  const [atsAnalysis, setAtsAnalysis] = useState(null);
  const [jobDescText, setJobDescText] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescriptionId, setJobDescriptionId] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [improving, setImproving] = useState(false);
  const [tailoring, setTailoring] = useState(false);
  const [improvedText, setImprovedText] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { resume } = await getResumeById(resumeId);
        setResume(resume);
      } catch (err) {
        setError("Failed to load resume.");
      }
    };
    fetchResume();
  }, [resumeId]);

  const handleAnalyze = async () => {
    if (!jobDescText.trim()) return;
    setAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeResume(resumeId, { jobDescriptionText: jobDescText, jobTitle });
      setAtsAnalysis(result.atsAnalysis);
      setJobDescriptionId(result.jobDescriptionId);
      setActiveTab("ATS Analysis");
    } catch (err) {
      setError(err.response?.data?.error || "Analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleImprove = async () => {
    setImproving(true);
    try {
      const result = await improveResume(resumeId, { missingKeywords: atsAnalysis?.missingKeywords || [], jobTitle });
      setImprovedText(result.improvedText);
    } catch (err) {
      setError(err.response?.data?.error || "Improvement failed.");
    } finally {
      setImproving(false);
    }
  };

  const handleTailor = async () => {
    if (!jobDescText.trim()) return;
    setTailoring(true);
    try {
      const result = await tailorResume(resumeId, jobDescText);
      setImprovedText(result.tailoredText);
    } catch (err) {
      setError(err.response?.data?.error || "Tailoring failed.");
    } finally {
      setTailoring(false);
    }
  };

  const downloadText = (text, filename) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

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
        .input-dark {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.875rem;
          padding: 0.75rem 1rem;
          color: white;
          font-size: 0.875rem;
          width: 100%;
          outline: none;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .input-dark::placeholder { color: #4b5563; }
        .input-dark:focus {
          border-color: rgba(124,58,237,0.5);
          background: rgba(124,58,237,0.06);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }
        .btn-glow {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          box-shadow: 0 0 20px rgba(124,58,237,0.3);
          transition: all 0.3s ease;
          border-radius: 0.875rem;
          padding: 0.7rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          border: none;
          cursor: pointer;
          width: 100%;
        }
        .btn-glow:hover {
          box-shadow: 0 0 35px rgba(124,58,237,0.5);
          transform: translateY(-1px);
        }
        .btn-glow:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .btn-secondary-dark {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.875rem;
          padding: 0.65rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #d1d5db;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s ease;
        }
        .btn-secondary-dark:hover {
          background: rgba(124,58,237,0.12);
          border-color: rgba(124,58,237,0.3);
          color: white;
        }
        .btn-secondary-dark:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .tab-bar {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem;
          padding: 0.25rem;
          display: flex;
          gap: 0.25rem;
        }
        .tab-btn {
          flex: 1;
          padding: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 500;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          color: #6b7280;
        }
        .tab-btn:hover { color: #d1d5db; }
        .tab-btn.active {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: white;
          box-shadow: 0 0 15px rgba(124,58,237,0.3);
        }
        .orb {
          position: fixed;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: 0.1;
          pointer-events: none;
          z-index: 0;
        }
        .improved-box {
          background: rgba(52,211,153,0.06);
          border: 1px solid rgba(52,211,153,0.2);
          border-radius: 1rem;
          padding: 1.25rem;
        }
      `}</style>

      <div className="orb w-80 h-80 bg-violet-600 top-0 right-0" />
      <div className="orb w-64 h-64 bg-blue-600 bottom-20 left-0" />

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-1">AI-Powered Resume Optimizer</p>
          <h1 className="syne text-2xl sm:text-3xl font-bold">
            Resume <span className="grad-text">Analysis</span>
          </h1>
          {resume && (
            <p className="text-gray-600 text-sm mt-1">
              {resume.fileName} · {resume.parsedData?.skills?.length || 0} skills detected
            </p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl text-sm"
            style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-1 space-y-4">
            <div className="card-dark">
              <h2 className="syne text-base font-bold text-white mb-4">Job Description</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Job title (e.g. Frontend Engineer)"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="input-dark"
                />
                <textarea
                  placeholder="Paste the job description here..."
                  value={jobDescText}
                  onChange={(e) => setJobDescText(e.target.value)}
                  rows={10}
                  className="input-dark resize-none"
                />
                <button onClick={handleAnalyze} disabled={!jobDescText.trim() || analyzing} className="btn-glow">
                  {analyzing ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                      <span style={{
                        width: "1rem", height: "1rem",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.8s linear infinite"
                      }} />
                      Analyzing...
                    </span>
                  ) : "🎯 Run ATS Analysis"}
                </button>
              </div>
            </div>

            {resume && (
              <div className="card-dark">
                <h2 className="syne text-base font-bold text-white mb-4">AI Actions</h2>
                <div className="space-y-2">
                  <button onClick={handleImprove} disabled={improving} className="btn-secondary-dark">
                    {improving ? "Improving..." : "✨ AI Improve Resume"}
                  </button>
                  <button onClick={handleTailor} disabled={!jobDescText.trim() || tailoring} className="btn-secondary-dark">
                    {tailoring ? "Tailoring..." : "🎯 Tailor for This Job"}
                  </button>
                </div>
              </div>
            )}

            {improvedText && (
              <div className="improved-box">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "#34d399" }}>✅ AI-Optimized Resume</h3>
                  <button
                    onClick={() => downloadText(improvedText, "resume_optimized.txt")}
                    style={{ fontSize: "0.75rem", color: "#a78bfa", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Download
                  </button>
                </div>
                <pre style={{ fontSize: "0.75rem", color: "#9ca3af", whiteSpace: "pre-wrap", maxHeight: "12rem", overflowY: "auto" }}>
                  {improvedText}
                </pre>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="tab-bar mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "ATS Analysis" && <ATSScore atsAnalysis={atsAnalysis} loading={analyzing} />}
            {activeTab === "Keywords" && <KeywordAnalysis matchedKeywords={atsAnalysis?.matchedKeywords} missingKeywords={atsAnalysis?.missingKeywords} loading={analyzing} />}
            {activeTab === "Skills" && <SkillGap matchedSkills={atsAnalysis?.matchedSkills} missingSkills={atsAnalysis?.missingSkills} loading={analyzing} />}
            {activeTab === "AI Copilot" && (
              <ChatAssistant
                resumeId={resumeId}
                jobDescriptionId={jobDescriptionId}
                onResumeUpdate={(text) => setImprovedText(text)}
              />
            )}

            {!analyzing && !atsAnalysis && activeTab !== "AI Copilot" && (
              <div className="card-dark text-center py-16">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="syne text-lg font-bold text-white mb-2">Ready to Analyze</h3>
                <p className="text-gray-600 text-sm max-w-sm mx-auto">
                  Paste a job description on the left and click "Run ATS Analysis" to see how well your resume matches.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalysis;
