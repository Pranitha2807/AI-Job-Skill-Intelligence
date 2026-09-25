const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// LOAD DATA
// ==========================================

const careerDataPath = path.join(
    __dirname,
    "..",
    "career_intelligence_output.json"
);

const roleProfilesPath = path.join(
    __dirname,
    "..",
    "role_skill_profiles.json"
);

const careerData = JSON.parse(
    fs.readFileSync(careerDataPath, "utf-8")
);

const roleSkillProfiles = JSON.parse(
    fs.readFileSync(roleProfilesPath, "utf-8")
);

// ==========================================
// LEARNING ROADMAP DATA
// ==========================================

const learningRoadmap = {
    "SQL": {
        priority: "High",
        topics: [
            "Joins",
            "Subqueries",
            "CTEs",
            "Window Functions",
            "Aggregations"
        ],
        action: "Practice SQL queries on real-world datasets."
    },

    "Excel": {
        priority: "High",
        topics: [
            "Formulas",
            "Pivot Tables",
            "Lookup Functions",
            "Data Cleaning",
            "Charts & Dashboards"
        ],
        action: "Build an Excel dashboard using a business dataset."
    },

    "Python": {
        priority: "High",
        topics: [
            "Pandas",
            "NumPy",
            "Data Cleaning",
            "Data Analysis",
            "Data Visualization"
        ],
        action: "Analyze a real dataset using Python and Pandas."
    },

    "Tableau": {
        priority: "High",
        topics: [
            "Data Connections",
            "Calculated Fields",
            "Interactive Charts",
            "Dashboards",
            "Filters"
        ],
        action: "Create an interactive Tableau dashboard."
    },

    "Power BI": {
        priority: "High",
        topics: [
            "Power Query",
            "Data Modeling",
            "DAX",
            "Interactive Visuals",
            "Dashboard Design"
        ],
        action: "Build a Power BI dashboard from a real dataset."
    },

    "R": {
        priority: "Medium",
        topics: [
            "R Basics",
            "Data Frames",
            "dplyr",
            "ggplot2",
            "Statistical Analysis"
        ],
        action: "Perform exploratory data analysis using R."
    },

    "Data Visualization": {
        priority: "High",
        topics: [
            "Chart Selection",
            "Data Storytelling",
            "Dashboards",
            "Visual Design",
            "Interactive Visualization"
        ],
        action: "Create a dashboard that communicates 3–5 key insights."
    },

    "Data Analysis": {
        priority: "High",
        topics: [
            "Exploratory Data Analysis",
            "Data Cleaning",
            "Pattern Detection",
            "Insight Generation",
            "Business Recommendations"
        ],
        action: "Analyze a dataset and convert observations into actionable insights."
    },

    "Data Modeling": {
        priority: "Medium",
        topics: [
            "Data Relationships",
            "Normalization",
            "Star Schema",
            "Fact Tables",
            "Dimension Tables"
        ],
        action: "Design a simple analytical data model."
    },

    "Looker": {
        priority: "Medium",
        topics: [
            "Looker Basics",
            "LookML",
            "Explores",
            "Dimensions",
            "Dashboards"
        ],
        action: "Create a basic BI dashboard using Looker concepts."
    },

    "AWS": {
        priority: "Medium",
        topics: [
            "AWS Basics",
            "S3",
            "EC2",
            "Cloud Data Storage",
            "Data Services"
        ],
        action: "Build a small cloud-based data workflow."
    },

    "ETL": {
        priority: "High",
        topics: [
            "Extract",
            "Transform",
            "Load",
            "Data Pipelines",
            "Data Validation"
        ],
        action: "Build a simple ETL pipeline using Python."
    },

    "Snowflake": {
        priority: "Medium",
        topics: [
            "Snowflake Basics",
            "Warehouses",
            "Databases & Schemas",
            "SQL Queries",
            "Data Loading"
        ],
        action: "Practice analytical SQL using Snowflake."
    },

    "Reporting": {
        priority: "Medium",
        topics: [
            "KPI Reporting",
            "Business Reports",
            "Data Summaries",
            "Dashboard Reporting",
            "Stakeholder Communication"
        ],
        action: "Create a monthly business performance report."
    },

    "SAS": {
        priority: "Medium",
        topics: [
            "SAS Basics",
            "Data Steps",
            "PROC SQL",
            "Data Analysis",
            "Reporting"
        ],
        action: "Practice basic data analysis using SAS."
    }
};

// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
    res.json({
        message: "Job Skill Intelligence API is running"
    });
});

// ==========================================
// AVAILABLE ROLES
// ==========================================

app.get("/api/roles", (req, res) => {

    const roleMap = new Map();

    Object.keys(roleSkillProfiles).forEach(role => {

        const normalized = role
            .trim()
            .replace(/\s+/g, " ");

        const key = normalized.toLowerCase();

        if (!roleMap.has(key)) {
            roleMap.set(key, normalized);
        }
    });

    const roles = Array.from(roleMap.values()).sort();

    res.json({
        roles: roles
    });
});

// ==========================================
// CAREER INTELLIGENCE
// ==========================================

app.get("/api/career-intelligence", (req, res) => {
    res.json(careerData);
});

// ==========================================
// ANALYZE CAREER
// ==========================================

app.post("/api/analyze", (req, res) => {

    const { role, skills } = req.body;

    // Validate input
    if (!role || !Array.isArray(skills)) {
        return res.status(400).json({
            error: "Please provide role and skills"
        });
    }

    // ==========================================
    // FIND ROLE
    // ==========================================

    const matchedRole = Object.keys(roleSkillProfiles).find(
        existingRole =>
            existingRole.toLowerCase() === role.trim().toLowerCase()
    );

    if (!matchedRole) {

        return res.status(404).json({
            error: "Role not found",
            message: "Please select a role from the available roles.",
            available_roles: Object.keys(roleSkillProfiles).sort()
        });
    }

    // ==========================================
    // NORMALIZE USER SKILLS
    // ==========================================

    const normalizedSkills = skills
        .map(skill => skill.trim().toLowerCase())
        .filter(skill => skill.length > 0);

    // ==========================================
    // ROLE-SPECIFIC SKILLS
    // ==========================================

    const demandedSkills = roleSkillProfiles[matchedRole];

    // ==========================================
    // MATCHED SKILLS
    // ==========================================

    const matchedSkills = demandedSkills
        .filter(item =>
            normalizedSkills.includes(item.skill.toLowerCase())
        )
        .map(item => item.skill);

    // ==========================================
    // SKILL GAPS
    // ==========================================

    const skillGaps = demandedSkills
        .filter(item =>
            !normalizedSkills.includes(item.skill.toLowerCase())
        )
        .map(item => item.skill);

    // ==========================================
    // WEIGHTED MATCH
    // ==========================================

    const totalDemand = demandedSkills.reduce(
        (sum, item) => sum + item.job_postings,
        0
    );

    const matchedDemand = demandedSkills
        .filter(item =>
            normalizedSkills.includes(item.skill.toLowerCase())
        )
        .reduce(
            (sum, item) => sum + item.job_postings,
            0
        );

    const matchPercentage = Number(
        ((matchedDemand / totalDemand) * 100).toFixed(2)
    );

    // ==========================================
    // CAREER RECOMMENDATIONS
    // ==========================================

    const recommendations = demandedSkills
        .filter(item =>
            !normalizedSkills.includes(item.skill.toLowerCase())
        )
        .slice(0, 5)
        .map(item => ({
            skill: item.skill,
            job_postings: item.job_postings,
            recommendation:
                `Develop ${item.skill} because it appears in ${item.job_postings} job postings for ${matchedRole}.`
        }));

    // ==========================================
    // LEARNING & ACTION ROADMAP
    // ==========================================

    const roadmap = demandedSkills
        .filter(item =>
            !normalizedSkills.includes(item.skill.toLowerCase())
        )
        .slice(0, 5)
        .map((item, index) => {

            const roadmapInfo =
                learningRoadmap[item.skill];

            if (roadmapInfo) {

                return {
                    rank: index + 1,
                    skill: item.skill,
                    job_postings: item.job_postings,
                    priority: roadmapInfo.priority,
                    topics: roadmapInfo.topics,
                    action: roadmapInfo.action
                };

            }

            // Fallback for skills without predefined topics
            return {
                rank: index + 1,
                skill: item.skill,
                job_postings: item.job_postings,
                priority: "Medium",
                topics: [
                    `Learn ${item.skill} fundamentals`,
                    `Practice ${item.skill}`,
                    `Build a small project using ${item.skill}`
                ],
                action:
                    `Build practical experience with ${item.skill}.`
            };
        });

    // ==========================================
    // RESPONSE
    // ==========================================

    res.json({

        role: matchedRole,

        match_percentage: matchPercentage,

        matched_skills: matchedSkills,

        skill_gaps: skillGaps,

        top_demanded_skills: demandedSkills,

        top_skill_combinations:
            careerData.top_skill_combinations,

        recommendations: recommendations,

        learning_roadmap: roadmap
    });
});

// ==========================================
// START SERVER
// ==========================================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});