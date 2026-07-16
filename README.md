# ResumeLens AI

AI-powered resume analyzer that gives job seekers instant, actionable feedback
on their resume — strengths, weaknesses, ATS compatibility, missing keywords,
and personalized recommendations.

## Features

- 📄 Upload a PDF resume and get instant AI-powered analysis
- ✅ Strengths and weaknesses detection
- 🎯 ATS (Applicant Tracking System) compatibility score
- 🛠️ Technical skills extraction
- 🔍 Missing keyword suggestions based on industry standards
- 💡 Personalized improvement recommendations

## Tech Stack

**Frontend**
- Next.js (React framework)
- TypeScript
- Tailwind CSS
- shadcn/ui

**Backend**
- Python
- FastAPI

**AI**
- OpenAI API

**Deployment**
- Vercel (frontend)

## Architecture

This project follows a three-layer architecture: the frontend never talks to
the AI provider directly. All requests go through the backend, which keeps
API keys secure and keeps each layer focused on a single responsibility.

Frontend (Next.js) → Backend (FastAPI) → OpenAI API

## Getting Started

> Instructions will be completed as the project is built.

### Prerequisites
- Node.js (v20+)
- Python (3.11+)
- OpenAI API key

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/resumelens-ai.git
cd resumelens-ai
```

Detailed setup instructions for frontend and backend will be added as each
part is implemented.

## Project Structure
resumelens-ai/
├── frontend/     # Next.js application
├── backend/      # FastAPI application
└── README.md

## Roadmap

**v1.0 (MVP)**
- [ ] PDF upload and text extraction
- [ ] AI-powered resume analysis (strengths, weaknesses, skills, ATS score)
- [ ] Missing keyword suggestions
- [ ] Personalized recommendations

**Future versions**
- [ ] User accounts and analysis history
- [ ] Compare resume against a specific job posting
- [ ] Export analysis as PDF report
- [ ] Multi-language support

## License

This project is licensed under the MIT License.
