import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function App() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load roles
  useEffect(() => {
    axios
      .get(`${API_URL}/api/roles`)
      .then((response) => {
        setRoles(response.data.roles);
      })
      .catch((error) => {
        console.error("Error loading roles:", error);
        setError("Unable to load roles from backend.");
      });
  }, []);

  // Add skill
  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    const alreadyExists = skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase()
    );

    if (!alreadyExists) {
      setSkills([...skills, skill]);
    }

    setSkillInput("");
  };

  // Enter key
  const handleSkillKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  };

  // Remove skill
  const removeSkill = (skillToRemove) => {
    setSkills(
      skills.filter(
        (skill) =>
          skill.toLowerCase() !== skillToRemove.toLowerCase()
      )
    );
  };

  // Analyze career
  const analyzeCareer = async () => {
    if (!role) {
      setError("Please select a target role.");
      return;
    }

    if (skills.length === 0) {
      setError("Please add at least one skill.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        `${API_URL}/api/analyze`,
        {
          role,
          skills,
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error("Analysis error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Unable to analyze career. Check the backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">

      {/* ================= HEADER ================= */}

      <header className="hero-section">
        <div className="hero-content">

          <p className="eyebrow">
            AI-POWERED CAREER INTELLIGENCE
          </p>

          <h1>
            Job Skill
            <span> Intelligence</span>
          </h1>

          <p className="hero-description">
            Discover your career skill gaps using real job
            market demand and build a focused learning path.
          </p>

        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="main-content">

        {/* ================= ANALYSIS ================= */}

        <section className="analysis-card">

          <div className="section-heading">

            <h2>
              Analyze Your Career Match
            </h2>

            <p>
              Select your target role and enter the skills
              you already have.
            </p>

          </div>

          {/* Role */}

          <div className="form-group">

            <label>
              Target Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >

              <option value="">
                Select your target role
              </option>

              {roles.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

          {/* Skills */}

          <div className="form-group">

            <label>
              Your Skills
            </label>

            <div className="skill-input-row">

              <input
                type="text"
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(e.target.value)
                }
                onKeyDown={handleSkillKeyDown}
                placeholder="Enter a skill e.g. SQL"
              />

              <button
                className="secondary-button"
                onClick={addSkill}
              >
                Add Skill
              </button>

            </div>

          </div>

          {/* Skill chips */}

          {skills.length > 0 && (

            <div className="skills-container">

              {skills.map((skill) => (

                <div
                  className="skill-chip"
                  key={skill}
                >

                  <span>
                    {skill}
                  </span>

                  <button
                    onClick={() =>
                      removeSkill(skill)
                    }
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

          )}

          {/* Error */}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Analyze */}

          <button
            className="analyze-button"
            onClick={analyzeCareer}
            disabled={loading}
          >

            {loading
              ? "Analyzing..."
              : "Analyze Career Match"}

          </button>

        </section>

        {/* ================= RESULTS ================= */}

        {result && (

          <section className="results-section">

            {/* Header */}

            <div className="results-header">

              <p className="eyebrow">
                CAREER ANALYSIS
              </p>

              <h2>
                {result.role}
              </h2>

              <p>
                Analysis based on role-specific job demand.
              </p>

            </div>

            {/* ================= STATS ================= */}

            <div className="stats-grid">

              <div className="stat-card">

                <span className="stat-label">
                  Skill Match
                </span>

                <strong>
                  {result.match_percentage}%
                </strong>

              </div>

              <div className="stat-card">

                <span className="stat-label">
                  Skills Matched
                </span>

                <strong>
                  {result.matched_skills.length}
                </strong>

              </div>

              <div className="stat-card">

                <span className="stat-label">
                  Skills to Develop
                </span>

                <strong>
                  {result.skill_gaps.length}
                </strong>

              </div>

            </div>

            {/* ================= MATCHED SKILLS ================= */}

            <div className="result-card">

              <h3>
                Skills You Already Have
              </h3>

              {result.matched_skills.length > 0 ? (

                <div className="skills-container">

                  {result.matched_skills.map(
                    (skill) => (

                      <div
                        className="skill-chip matched"
                        key={skill}
                      >
                        ✓ {skill}
                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="muted-text">
                  No matching skills found.
                </p>

              )}

            </div>

            {/* ================= SKILL GAPS ================= */}

            <div className="result-card">

              <h3>
                Skills to Develop
              </h3>

              {result.skill_gaps.length > 0 ? (

                <div className="skills-container">

                  {result.skill_gaps.map(
                    (skill) => (

                      <div
                        className="skill-chip gap"
                        key={skill}
                      >
                        {skill}
                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="muted-text">
                  No major skill gaps found.
                </p>

              )}

            </div>
{/* ================= SKILL DEMAND CHART ================= */}

<div className="result-card">

  <h3>
    Top Skill Demand
  </h3>

  <p className="card-description">
    Job-posting demand for the most requested skills in the selected role.
  </p>

  <div className="skill-demand-chart">

    {result.top_demanded_skills
      .slice(0, 10)
      .map((item, index) => {

        const maxDemand =
          result.top_demanded_skills[0].job_postings;

        const barWidth =
          (item.job_postings / maxDemand) * 100;

        return (
          <div
            className="skill-bar-row"
            key={item.skill}
          >

            <div className="skill-bar-label">
              <span>
                {index + 1}. {item.skill}
              </span>

              <strong>
                {item.job_postings}
              </strong>
            </div>

            <div className="skill-bar-track">

              <div
                className="skill-bar-fill"
                style={{
                  width: `${barWidth}%`
                }}
              />

            </div>

          </div>
        );
      })}

  </div>

</div>
            {/* ================= LEARNING ROADMAP ================= */}

            {result.learning_roadmap &&
              result.learning_roadmap.length > 0 && (

              <div className="result-card">

                <h3>
                  Learning & Action Roadmap
                </h3>

                <p className="card-description">
                  A focused learning path based on the
                  highest-demand skills you are currently
                  missing.
                </p>

                <div className="roadmap-list">

                  {result.learning_roadmap.map(
                    (item) => (

                      <div
                        className="roadmap-item"
                        key={item.skill}
                      >

                        <div className="roadmap-header">

                          <div className="roadmap-title">

                            <div className="roadmap-number">
                              {item.rank}
                            </div>

                            <div>

                              <h4>
                                {item.skill}
                              </h4>

                              <span className="roadmap-demand">
                                {item.job_postings} job
                                postings
                              </span>

                            </div>

                          </div>

                          <span
                            className={`priority-badge ${item.priority.toLowerCase()}`}
                          >
                            {item.priority} Priority
                          </span>

                        </div>

                        <div className="roadmap-body">

                          <h5>
                            Focus Areas
                          </h5>

                          <div className="topic-list">

                            {item.topics.map(
                              (topic) => (

                                <span
                                  className="topic-chip"
                                  key={topic}
                                >
                                  {topic}
                                </span>

                              )
                            )}

                          </div>

                          <div className="action-box">

                            <strong>
                              Recommended Action
                            </strong>

                            <p>
                              {item.action}
                            </p>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

            {/* ================= RECOMMENDATIONS ================= */}

            <div className="result-card">

              <h3>
                Career Recommendations
              </h3>

              <p className="card-description">
                Skills are prioritized using their demand
                in the selected role.
              </p>

              <div className="recommendation-list">

                {result.recommendations &&
                result.recommendations.length > 0 ? (

                  result.recommendations.map(
                    (item, index) => (

                      <div
                        className="recommendation-item"
                        key={item.skill}
                      >

                        <div className="recommendation-number">
                          {index + 1}
                        </div>

                        <div className="recommendation-content">

                          <h4>
                            {item.skill}
                          </h4>

                          <p>
                            {item.recommendation}
                          </p>

                        </div>

                        <div className="demand-count">

                          {item.job_postings}

                          <span>
                            job postings
                          </span>

                        </div>

                      </div>

                    )
                  )

                ) : (

                  <p className="muted-text">
                    No recommendations available.
                  </p>

                )}

              </div>

            </div>
{/* ================= SKILL GAP OVERVIEW ================= */}

<div className="result-card">

  <h3>
    Your Skills vs Skill Gaps
  </h3>

  <p className="card-description">
    Comparison of your current skills with the skills demanded for the selected role.
  </p>

  <div className="gap-overview">

    <div className="gap-column">

      <div className="gap-column-header">
        <span>Your Skills</span>
        <strong>{result.matched_skills.length}</strong>
      </div>

      {result.matched_skills.length > 0 ? (

        result.matched_skills.map((skill) => (

          <div
            className="gap-item matched-item"
            key={skill}
          >
            <span>✓</span>
            {skill}
          </div>

        ))

      ) : (

        <p className="muted-text">
          No matching skills.
        </p>

      )}

    </div>


    <div className="gap-column">

      <div className="gap-column-header">
        <span>Skills to Develop</span>
        <strong>{result.skill_gaps.length}</strong>
      </div>

      {result.skill_gaps.length > 0 ? (

        result.skill_gaps.map((skill) => (

          <div
            className="gap-item missing-item"
            key={skill}
          >
            <span>!</span>
            {skill}
          </div>

        ))

      ) : (

        <p className="muted-text">
          No skill gaps found.
        </p>

      )}

    </div>

  </div>

</div>
{/* ================= SKILL PRIORITY ================= */}

<div className="result-card">

  <h3>
    Skill Priority
  </h3>

  <p className="card-description">
    Missing skills ranked by their demand in the selected role.
  </p>

  <div className="priority-chart">

    {result.top_demanded_skills
      .filter((item) =>
        result.skill_gaps.some(
          (gap) =>
            gap.toLowerCase() ===
            item.skill.toLowerCase()
        )
      )
      .slice(0, 8)
      .map((item, index) => {

        const maxDemand =
          result.top_demanded_skills[0].job_postings;

        const barWidth =
          (item.job_postings / maxDemand) * 100;

        return (
          <div
            className="priority-row"
            key={item.skill}
          >

            <div className="priority-info">

              <div className="priority-skill">

                <span className="priority-rank">
                  {index + 1}
                </span>

                <span>
                  {item.skill}
                </span>

              </div>

              <strong>
                {item.job_postings}
              </strong>

            </div>

            <div className="priority-track">

              <div
                className="priority-fill"
                style={{
                  width: `${barWidth}%`
                }}
              />

            </div>

          </div>
        );
      })}

  </div>

</div>

            {/* ================= TOP SKILLS ================= */}

            <div className="result-card">

              <h3>
                Top Skills for {result.role}
              </h3>

              <p className="card-description">
                Most frequently requested skills in the
                selected role profile.
              </p>

              <div className="table-container">

                <table>

                  <thead>

                    <tr>
                      <th>Rank</th>
                      <th>Skill</th>
                      <th>Job Postings</th>
                    </tr>

                  </thead>

                  <tbody>

                    {result.top_demanded_skills.map(
                      (item, index) => (

                        <tr key={item.skill}>

                          <td>
                            {index + 1}
                          </td>

                          <td>
                            {item.skill}
                          </td>

                          <td>
                            {item.job_postings}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {/* ================= COMBINATIONS ================= */}

            {result.top_skill_combinations &&
              result.top_skill_combinations.length > 0 && (

              <div className="result-card">

                <h3>
                  Common Skill Combinations
                </h3>

                <p className="card-description">
                  Frequently occurring skill combinations
                  found in the analyzed job data.
                </p>

                <div className="combination-grid">

                  {result.top_skill_combinations
                    .slice(0, 10)
                    .map((item, index) => {

                      const skillPair =
                        item.skill_pair ||
                        item.skills ||
                        item.pair ||
                        Object.keys(item)
                          .filter(
                            (key) =>
                              typeof item[key] ===
                              "string"
                          )
                          .map(
                            (key) => item[key]
                          )
                          .join(" + ");

                      const count =
                        item.job_postings ||
                        item.count ||
                        item.frequency ||
                        Object.keys(item)
                          .filter(
                            (key) =>
                              typeof item[key] ===
                              "number"
                          )
                          .map(
                            (key) => item[key]
                          )[0];

                      return (

                        <div
                          className="combination-item"
                          key={index}
                        >

                          <span>
                            {skillPair}
                          </span>

                          <strong>
                            {count}
                          </strong>

                        </div>

                      );

                    })}

                </div>

              </div>

            )}

          </section>

        )}

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <p>
          AI-Powered Job Skill Gap & Career Intelligence System
        </p>

      </footer>

    </div>
  );
}

export default App;