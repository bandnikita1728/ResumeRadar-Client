import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import { getJobRecommendations } from "../services/jobService";
import { getResumes } from "../services/resumeService";

const FILTERS = ["all", "remote", "fulltime", "internship", "parttime", "contract"];

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [resumeId, setResumeId] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const { resumes } = await getResumes();
        if (resumes?.length > 0) setResumeId(resumes[0]._id);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getJobRecommendations(resumeId, { type: filter });
        setJobs(data.jobs || []);
      } catch (err) {
        setError("Failed to load job recommendations.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filter, resumeId]);

  const filteredJobs = useMemo(() => {
    if (!search.trim()) return jobs;
    const q = search.toLowerCase();
    return jobs.filter(
      (j) => j.company?.toLowerCase().includes(q) || j.title?.toLowerCase().includes(q)
    );
  }, [jobs, search]);

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
        .orb {
          position: fixed;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: 0.1;
          pointer-events: none;
          z-index: 0;
        }
        .search-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.875rem;
          padding: 0.65rem 1rem 0.65rem 2.5rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
        }
        .search-input::placeholder { color: #4b5563; }
        .search-input:focus {
          border-color: rgba(124,58,237,0.5);
          background: rgba(124,58,237,0.06);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }
        .filter-btn {
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: capitalize;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #6b7280;
        }
        .filter-btn:hover {
          border-color: rgba(124,58,237,0.3);
          color: #a78bfa;
          background: rgba(124,58,237,0.08);
        }
        .filter-btn.active {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border-color: transparent;
          color: white;
          box-shadow: 0 0 15px rgba(124,58,237,0.3);
        }
        .card-dark {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          padding: 1.5rem;
        }
        .skeleton-dark {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1.25rem;
          height: 14rem;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <div className="orb w-80 h-80 bg-violet-600 top-0 right-0" />
      <div className="orb w-64 h-64 bg-blue-600 bottom-20 left-0" />

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

        <div className="mb-8">
          <p className="text-gray-600 text-sm mb-1">AI-Powered</p>
          <h1 className="syne text-2xl sm:text-3xl font-bold">
            Job <span className="grad-text">Recommendations</span>
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Live jobs matched to your resume from LinkedIn, Indeed, Glassdoor & more
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <svg
              style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "1rem", height: "1rem", color: "#4b5563" }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by company or job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#4b5563", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem" }}
              >✕</button>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-btn ${filter === f ? "active" : ""}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {!loading && (
          <p style={{ fontSize: "0.75rem", color: "#4b5563", marginBottom: "1rem" }}>
            {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
            {search && ` for "${search}"`}
          </p>
        )}

        {error && (
          <div style={{
            marginBottom: "1rem", padding: "0.75rem 1rem",
            borderRadius: "0.875rem", fontSize: "0.875rem",
            background: "rgba(248,113,113,0.1)",
            border: "1px solid rgba(248,113,113,0.2)",
            color: "#f87171",
          }}>
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-dark" />
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="card-dark text-center" style={{ padding: "4rem 2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <h3 className="syne" style={{ fontSize: "1.125rem", fontWeight: "700", color: "white", marginBottom: "0.5rem" }}>
              No jobs found
            </h3>
            <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>
              {search ? `No results for "${search}". Try a different search.` : "Try a different filter or upload a resume."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        )}

      </main>
    </div>
  );
};

export default Jobs;