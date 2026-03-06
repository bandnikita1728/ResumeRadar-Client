/**
 * Client-side ATS score utilities.
 * Used for displaying, formatting and categorizing score data.
 */

/** Returns a color class based on the score value. */
export const getScoreColor = (score) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

/** Returns a background color class for score badges. */
export const getScoreBg = (score) => {
  if (score >= 80) return "bg-green-100";
  if (score >= 60) return "bg-yellow-100";
  return "bg-red-100";
};

/** Returns a label for the overall ATS score. */
export const getScoreLabel = (score) => {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 55) return "Fair";
  return "Needs Work";
};

/** Returns a stroke color for Recharts radial bar. */
export const getScoreStroke = (score) => {
  if (score >= 80) return "#10B981";
  if (score >= 60) return "#F59E0B";
  return "#EF4444";
};

/**
 * Formats score breakdown data into chart-ready format.
 *
 * @param {object} atsAnalysis
 * @returns {Array}
 */
export const formatScoreBreakdown = (atsAnalysis) => {
  if (!atsAnalysis) return [];
  return [
    { name: "Keywords", score: atsAnalysis.keywordScore, fill: "#7C3AED" },
    { name: "Skills", score: atsAnalysis.skillsScore, fill: "#2563EB" },
    { name: "Experience", score: atsAnalysis.experienceScore, fill: "#10B981" },
    { name: "Formatting", score: atsAnalysis.formattingScore, fill: "#F59E0B" },
  ];
};
