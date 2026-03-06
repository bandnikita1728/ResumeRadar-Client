import React from "react";

const KeywordAnalysis = ({ matchedKeywords = [], missingKeywords = [], loading }) => {
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{
              height: "1.5rem", width: "4rem",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "9999px",
              animation: "pulse 1.5s ease-in-out infinite"
            }} />
          ))}
        </div>
      </div>
    );
  }

  if (!matchedKeywords?.length && !missingKeywords?.length) return null;

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
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}>
        <h3 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#f9fafb",
          margin: 0,
        }}>
          Keyword Analysis
        </h3>

        {matchedKeywords?.length > 0 && (
          <div>
            <h4 style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#34d399",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "0.75rem",
            }}>
              ✅ Found in Resume ({matchedKeywords.length})
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {matchedKeywords.map((kw) => (
                <span key={kw} style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  background: "rgba(52,211,153,0.1)",
                  color: "#34d399",
                  border: "1px solid rgba(52,211,153,0.2)",
                }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {missingKeywords?.length > 0 && (
          <div>
            <h4 style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#f87171",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "0.75rem",
            }}>
              ❌ Missing Keywords ({missingKeywords.length})
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {missingKeywords.map((kw) => (
                <span key={kw} style={{
                  padding: "0.25rem 0.75rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  background: "rgba(248,113,113,0.1)",
                  color: "#f87171",
                  border: "1px solid rgba(248,113,113,0.2)",
                }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KeywordAnalysis;
