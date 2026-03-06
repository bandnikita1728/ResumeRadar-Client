import React from "react";

const JobCard = ({ job }) => {
  const postedDate = new Date(job.postedAt);
  const daysAgo = Math.floor((Date.now() - postedDate) / (1000 * 60 * 60 * 24));
  const searchQuery = encodeURIComponent(`${job.title} ${job.company}`);
  const realApplyUrls = {
    LinkedIn: `https://www.linkedin.com/jobs/search/?keywords=${searchQuery}`,
    Indeed: `https://www.indeed.com/jobs?q=${searchQuery}`,
    Wellfound: `https://wellfound.com/jobs?q=${searchQuery}`,
    Internshala: `https://internshala.com/jobs/${encodeURIComponent((job.title || "").toLowerCase().replace(/ /g, "-"))}-jobs`,
    Naukri: `https://www.naukri.com/${encodeURIComponent((job.title || "").toLowerCase().replace(/ /g, "-"))}-jobs`,
  };
  const applyUrl = realApplyUrls[job.platform] || job.applyUrl || "#";

  const scoreColor =
    job.matchScore >= 75
      ? { text: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)" }
      : job.matchScore >= 50
      ? { text: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)" }
      : { text: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)" };

  const typeBadge = {
    remote:     { bg: "rgba(96,165,250,0.1)",  text: "#60a5fa" },
    internship: { bg: "rgba(167,139,250,0.1)", text: "#a78bfa" },
    fulltime:   { bg: "rgba(52,211,153,0.1)",  text: "#34d399" },
    parttime:   { bg: "rgba(251,191,36,0.1)",  text: "#fbbf24" },
    contract:   { bg: "rgba(255,255,255,0.06)",text: "#9ca3af" },
  };
  const badge = typeBadge[job.type] || typeBadge.contract;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        .job-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .job-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.25rem;
          background: linear-gradient(135deg, rgba(124,58,237,0.04), rgba(37,99,235,0.04));
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .job-card:hover {
          border-color: rgba(124,58,237,0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(124,58,237,0.1);
        }
        .job-card:hover::before { opacity: 1; }
        .job-company-logo {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.625rem;
          object-fit: contain;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .job-company-logo-placeholder {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.625rem;
          background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2));
          border: 1px solid rgba(124,58,237,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .job-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #f9fafb;
          line-height: 1.3;
        }
        .job-company {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.125rem;
        }
        .job-score {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.625rem;
          border-radius: 2rem;
          border: 1px solid;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }
        .job-meta-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #9ca3af;
        }
        .job-meta-icon { font-size: 0.8rem; opacity: 0.7; }
        .job-divider { height: 1px; background: rgba(255,255,255,0.06); }
        .job-pill {
          padding: 0.2rem 0.6rem;
          border-radius: 2rem;
          font-size: 0.7rem;
          font-weight: 500;
        }
        .job-pill-muted {
          background: rgba(255,255,255,0.05);
          color: #6b7280;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .job-skill-tag {
          padding: 0.2rem 0.6rem;
          background: rgba(96,165,250,0.1);
          color: #60a5fa;
          border: 1px solid rgba(96,165,250,0.15);
          border-radius: 2rem;
          font-size: 0.68rem;
          font-weight: 500;
        }
        .job-apply-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          width: 100%;
          padding: 0.55rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: white;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 0 20px rgba(124,58,237,0.2);
          border: none;
          cursor: pointer;
          letter-spacing: 0.01em;
        }
        .job-apply-btn:hover {
          background: linear-gradient(135deg, #6d28d9, #1d4ed8);
          box-shadow: 0 0 28px rgba(124,58,237,0.4);
          transform: translateY(-1px);
        }
      `}</style>

      <div className="job-card">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="job-company-logo" />
            ) : (
              <div className="job-company-logo-placeholder">🏢</div>
            )}
            <div>
              <div className="job-title">{job.title}</div>
              <div className="job-company">{job.company}</div>
            </div>
          </div>
          <span
            className="job-score"
            style={{ color: scoreColor.text, background: scoreColor.bg, borderColor: scoreColor.border }}
          >
            {job.matchScore}%
          </span>
        </div>

        {/* Meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", position: "relative", zIndex: 1 }}>
          <div className="job-meta-row">
            <span className="job-meta-icon">📍</span>
            <span style={{ color: "#d1d5db", fontWeight: 500 }}>{job.location || "Location not specified"}</span>
          </div>
          <div className="job-meta-row">
            <span className="job-meta-icon">💰</span>
            <span style={{ color: job.salary && job.salary !== "Not specified" ? "#d1d5db" : "#4b5563", fontWeight: 500 }}>
              {job.salary && job.salary !== "Not specified" ? job.salary : "Salary not disclosed"}
            </span>
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", position: "relative", zIndex: 1 }}>
          <span
            className="job-pill"
            style={{ background: badge.bg, color: badge.text, border: `1px solid ${badge.text}22`, textTransform: "capitalize" }}
          >
            {job.type}
          </span>
          <span className="job-pill job-pill-muted">
            {daysAgo === 0 ? "Today" : daysAgo === 1 ? "1d ago" : `${daysAgo}d ago`}
          </span>
          <span className="job-pill job-pill-muted">via {job.platform}</span>
        </div>

        {/* Skills */}
        {job.matchedSkills?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", position: "relative", zIndex: 1 }}>
            {job.matchedSkills.slice(0, 4).map((skill) => (
              <span key={skill} className="job-skill-tag">{skill}</span>
            ))}
            {job.matchedSkills.length > 4 && (
              <span className="job-pill job-pill-muted">+{job.matchedSkills.length - 4}</span>
            )}
          </div>
        )}

        <div className="job-divider" />

        {/* CTA */}
        <a href={applyUrl} target="_blank" rel="noopener noreferrer" className="job-apply-btn" style={{ position: "relative", zIndex: 1 }}>
          Apply Now <span style={{ opacity: 0.8 }}>→</span>
        </a>
      </div>
    </>
  );
};

export default JobCard;