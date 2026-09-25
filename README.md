# AI-Powered Job Skill Gap & Career Intelligence System

An AI-assisted career intelligence system that analyzes job-market skill demand and helps users identify skill gaps for a selected career role.

## 📌 Project Overview

The system analyzes real-world job vacancy and skill data to understand which technical skills are most frequently demanded for different roles.

Users can select a target career role and enter their existing skills. The system then:

- Calculates a skill-match percentage
- Identifies matched skills
- Detects missing skills
- Shows the most demanded skills for the selected role
- Displays common skill combinations
- Provides prioritized learning recommendations
- Generates a learning roadmap

## 🎯 Objectives

- Analyze current job-market skill requirements
- Identify important skills for different career roles
- Compare a user's skills with job-market demand
- Highlight skill gaps
- Provide actionable learning recommendations
- Present career intelligence through an interactive dashboard

## 🛠️ Technologies Used

### Data Analysis

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Scikit-learn
- Jupyter Notebook

### Backend

- Node.js
- Express.js
- REST API
- Axios
- CORS

### Frontend

- React.js
- Vite
- JavaScript
- HTML
- CSS

### Data

- CSV
- Kaggle Dataset

## 📊 Dataset

Dataset used:

**Data Analyst Skills Evolution (2022–2026)**

Source:

https://www.kaggle.com/datasets/bohdandanoi/data-analyst-skills-evolution-2022-2026

The dataset contains job vacancy information and the skills associated with those vacancies.

Main files:

- `skills_rows.csv`
- `vacancies_rows.csv`
- `vacancy_skills_rows.csv`

## 🔄 Data Analysis Workflow

```text
Raw Dataset
     ↓
Data Cleaning
     ↓
Data Integration
     ↓
Skill Normalization
     ↓
Exploratory Data Analysis
     ↓
Skill Demand Analysis
     ↓
Role-Specific Analysis
     ↓
Skill Gap Analysis
     ↓
Career Intelligence
     ↓
Learning Recommendations
     ↓
Interactive Dashboard
```

## 📈 Key Analysis

The project analyzes:

- Overall skill demand
- Skill demand by career role
- Skill combinations
- Experience-level skill requirements
- Role-specific skill profiles
- User skill matches
- Skill gaps
- Weighted skill-match percentage

## 💡 Example

For a **Data Analyst** role, a user can enter:

```text
SQL
Python
```

The system compares these skills with the skills demanded in Data Analyst job postings and identifies additional skills that could strengthen the user's profile.

## 📌 Features

- Role selection
- User skill selection
- Skill-match calculation
- Matched skill identification
- Skill-gap detection
- Top skill-demand visualization
- Skill priority visualization
- Common skill combinations
- Personalized recommendations
- Learning roadmap
- Interactive career dashboard

## 🖥️ System Architecture

```text
                 Job Dataset
                      ↓
             Python Data Analysis
                      ↓
          Career Intelligence JSON
                      ↓
             Node.js Backend
              Express REST API
                      ↓
              React Frontend
                      ↓
          Interactive Dashboard
```

## 📁 Project Structure

```text
AI-Job-Skill-Intelligence/
│
├── backend/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── data/
│   ├── skills_rows.csv
│   ├── vacancies_rows.csv
│   └── vacancy_skills_rows.csv
│
├── notebooks/
│   └── job_skill_intelligence.ipynb
│
├── report/
│
├── career_intelligence_output.json
├── role_skill_profiles.json
├── requirements.txt
└── README.md
```

## 🚀 How to Run

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd AI-Job-Skill-Intelligence
```

### 2. Create Python Environment

```bash
python -m venv .venv
```

For Windows:

```bash
.venv\Scripts\activate
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the Backend

Open a terminal:

```bash
cd backend
node server.js
```

The backend runs at:

```text
http://localhost:5000
```

### 5. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## 🔌 API Endpoints

### Get Available Roles

```text
GET /api/roles
```

### Get Career Intelligence

```text
GET /api/career-intelligence
```

### Analyze Skills

```text
POST /api/analyze
```

Example request:

```json
{
  "role": "Data Analyst",
  "skills": ["SQL", "Python"]
}
```

## 📊 Sample Career Intelligence

For the Data Analyst role, the system can compare a user's existing skills with job-market demand and calculate a weighted skill-match percentage.

For example:

```text
Target Role: Data Analyst

Existing Skills:
- SQL
- Python

Matched Skills:
- SQL
- Python

Skill Gaps:
- Excel
- Tableau
- Power BI
- R
- Data Visualization
- Data Analysis
- Data Modeling
- Looker
- AWS
- ETL
- Snowflake
- Reporting
- SAS
```

The dashboard uses these results to provide prioritized recommendations and a learning roadmap.

## 🧠 Career Intelligence

The system goes beyond simply counting skills.

It connects:

```text
Job Demand
     ↓
Role-Specific Skills
     ↓
User Skills
     ↓
Skill Match
     ↓
Skill Gaps
     ↓
Learning Priorities
     ↓
Career Action
```

This helps transform job-market data into actionable career insights.

## 📚 Learning Roadmap

The system generates a learning roadmap based on the most important missing skills for the selected role.

Each roadmap item contains:

- Skill priority
- Topics to learn
- Suggested action

This allows users to understand not only **what skills they are missing**, but also **what they should focus on learning next**.

## 🔮 Future Enhancements

- Resume upload and automatic skill extraction
- Job description analysis
- Personalized course recommendations
- Integration with live job APIs
- Salary analysis
- Location-based job-market analysis
- Advanced machine-learning based career recommendations

## 👩‍💻 Author

**Pranitha Taneti**

B.Tech Information Technology  
Shri Vishnu Engineering College for Women

## 📄 Project Status

Completed as an AI-assisted career intelligence and job-market skill gap analysis project.