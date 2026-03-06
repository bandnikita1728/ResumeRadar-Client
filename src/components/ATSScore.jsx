import React, { useEffect, useState } from "react";

const getColor = (score) => {
  if (score >= 75) return { stroke: "#34d399", glow: "rgba(52,211,153,0.3)", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)", text: "#34d399", label: "Excellent Match" };
  if (score >= 50) return { stroke: "#fbbf24", glow: "rgba(251,191,36,0.3)", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.2)", text: "#fbbf24", label: "Good Match" };
  return { stroke: "#f87171", glow: "rgba(248,113,113,0.3)", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.2)", text: "#f87171", label: "Needs Work" };
};

const ScoreRing = ({ score, size = 160 }) => {
  const [animated, setAnimated] = useState(false);
  const r = 45;
  const circ = 2 * Math.PI * r;
  const { stroke, glow, bg, border, text, label } = getColor(score);
  const offset = animated ? circ - (score / 100) * circ : circ;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
      <div style={{ filter: `drop-shadow(0 0 16px ${glow})` }}>
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={r} fill="none"
            stroke={stroke} strokeWidth="8"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
          />
          <text x="50" y="46" textAnchor="middle" dominantBaseline="middle"
            fontSize="22" fontWeight="800" fill={stroke}>{score}</text>
          <text x="50" y="62" textAnchor="middle" fontSize="8" fill="#4b5563">/ 100</text>
        </svg>
      </div>
      <span style={{
        fontSize: "0.7rem", fontWeight: 700, padding: "0.25rem 0.75rem",
        borderRadius: "2rem", background: bg, color: text, border: `1px solid ${border}`
      }}>
        {label}
      </span>
    </div>
  );
};

const Bar = ({ label, value, gradient }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
        <span style={{ fontSize: "0.8125rem", color: "#9ca3af" }}>{label}</span>
        <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#f9fafb" }}>{value}%</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "9999px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: animated ? `${value}%` : "0%",
          background: gradient,
          borderRadius: "9999px",
          transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
};

const ATSScore = ({ atsAnalysis, loading }) => {
  if (loading) {
    return (
      <div style={{
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1.25rem", padding: "1.5rem"
      }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{
            height: i === 1 ? "1rem" : "0.5rem",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            width: i === 1 ? "40%" : "100%",
            animation: "pulse 1.5s ease-in-out infinite"
          }} />
        ))}
      </div>
    );
  }

  if (!atsAnalysis) return null;

  const { overallScore, keywordScore, skillsScore, experienceScore, formattingScore } = atsAnalysis;

  const bars = [
    { label: "Keyword Match", value: keywordScore, gradient: "linear-gradient(90deg, #7c3aed, #60a5fa)" },
    { label: "Skills Match", value: skillsScore, gradient: "linear-gradient(90deg, #a78bfa, #34d399)" },
    { label: "Experience", value: experienceScore, gradient: "linear-gradient(90deg, #fbbf24, #f87171)" },
    { label: "Formatting", value: formattingScore, gradient: "linear-gradient(90deg, #34d399, #60a5fa)" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        @keyframes ats-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
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
          marginBottom: "1.5rem",
        }}>
          ATS Compatibility Score
        </h3>
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}>
          <ScoreRing score={overallScore} />
          <div style={{ flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {bars.map((bar) => (
              <Bar key={bar.label} {...bar} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ATSScore;
