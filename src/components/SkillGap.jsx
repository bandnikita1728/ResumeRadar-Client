import React from "react";

const SkillGap = ({ matchedSkills = [], missingSkills = [], loading }) => {
  if (loading) {
    return (
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1.25rem",
        padding: "1.5rem",
      }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            height: "0.75rem", background: "rgba(255,255,255,0.06)",
            borderRadius: "9999px", marginBottom: "0.75rem",
            width: i === 1 ? "35%" : "100%",
            animation: "pulse 1.5s ease-in-out infinite"
          }} />
        ))}
      </div>
    );
  }

  const total = matchedSkills.length + missingSkills.length;
  if (total === 0) return null;
  const matchPct = Math.round((matchedSkills.length / total) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
      `}</style>
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1.25rem",
        padding: "1.5rem",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <h3 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#f9fafb",
          marginBottom: "1.25rem",
        }}>
          Skill Gap Analysis
        </h3>

        {/* Match bar */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8125rem", color: "#9ca3af" }}>Skills Match</span>
            <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#f9fafb" }}>
              {matchedSkills.length} / {total}
            </span>
          </div>
          <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "9999px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${matchPct}%`,
              background: "linear-gradient(90deg, #7c3aed, #60a5fa)",
              borderRadius: "9999px",
              transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>
          <p style={{ fontSize: "0.7rem", color: "#4b5563", marginTop: "0.375rem" }}>
            {matchPct}% of required skills found
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {/* Have */}
          <div>
            <h4 style={{
              fontSize: "0.7rem", fontWeight: 600, color: "#34d399",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem"
            }}>
              ✅ You Have ({matchedSkills.length})
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {matchedSkills.slice(0, 10).map((skill) => (
                <div key={skill} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#34d399", flexShrink: 0
                  }} />
                  <span style={{ fontSize: "0.8125rem", color: "#d1d5db" }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing */}
          <div>
            <h4 style={{
              fontSize: "0.7rem", fontWeight: 600, color: "#f87171",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem"
            }}>
              ❌ Missing ({missingSkills.length})
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {missingSkills.slice(0, 10).map((skill) => (
                <div key={skill} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#f87171", flexShrink: 0
                  }} />
                  <span style={{ fontSize: "0.8125rem", color: "#6b7280" }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillGap;
