# ResumeLens AI

AI-powered resume analyzer that gives job seekers instant, actionable feedback
on their resume — strengths, weaknesses, ATS compatibility, missing keywords,
and personalized recommendations.

## Features

- 📄 Upload a PDF resume (drag-and-drop or file picker) and get instant AI-powered analysis
- ✅ Strengths and weaknesses detection
- 🎯 ATS (Applicant Tracking System) compatibility score
- 🛠️ Technical skills extraction
- 🔍 Missing keyword suggestions based on industry standards
- 💡 Personalized improvement recommendations
- 🌐 Responds in the same language as the uploaded resume

## Tech Stack

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui

**Backend**
- Python 3.13
- FastAPI
- pypdf (PDF text extraction)

**AI**
- Groq API (Llama 3.3 70B), via an OpenAI-compatible SDK

**Deployment**
- Vercel (frontend)
- Render (backend)

## Architecture

This project follows a three-layer architecture: the frontend never talks to
the AI provider directly. All requests go through the backend, which keeps
API keys secure and keeps each layer focused on a single responsibility.
Frontend (Next.js) → Backend (FastAPI) → Groq API

The backend itself is organized in layers:
- `routers/` — defines HTTP endpoints, delegates to services
- `services/` — business logic (PDF extraction, AI calls)
- `models/` — Pydantic schemas (the data contract between backend and frontend)
- `core/` — configuration and environment variables

## Getting Started

### Prerequisites
- Node.js v20+
- Python 3.11+
- A [Groq API key](https://console.groq.com) (free tier available)

### 1. Clone the repository
```bash
git clone https://github.com/david-velazquez-h/resumelens-ai.git
cd resumelens-ai
```

### 2. Backend setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # Windows PowerShell
# source venv/bin/activate    # macOS/Linux

pip install -r requirements.txt

# Create a .env file based on the example, and add your Groq API key
cp .env.example .env

uvicorn app.main:app --reload
```
The backend runs at `http://localhost:8000`. Interactive API docs are
available at `http://localhost:8000/docs`.

### 3. Frontend setup
```bash
cd frontend
npm install

# Create a .env.local file based on the example
cp .env.example .env.local

npm run dev
```
The frontend runs at `http://localhost:3000`.

## Project Structure
resumelens-ai/
├── frontend/
│   ├── app/                # Routes (Next.js App Router)
│   ├── components/         # UI components
│   ├── lib/                # API client and utilities
│   └── types/               # Shared TypeScript types
├── backend/
│   ├── app/
│   │   ├── routers/         # HTTP endpoints
│   │   ├── services/        # Business logic (PDF + AI)
│   │   ├── models/          # Pydantic schemas
│   │   └── core/            # Configuration
│   └── requirements.txt
└── README.md

## Roadmap

**v1.0 (MVP)** ✅
- [x] PDF upload (drag-and-drop) and text extraction
- [x] AI-powered resume analysis (strengths, weaknesses, skills, ATS score)
- [x] Missing keyword suggestions
- [x] Personalized recommendations
- [x] Multi-language support (matches the resume's language)

**Future versions**
- [ ] Validate that the uploaded document is actually a resume
- [ ] User accounts and analysis history
- [ ] Compare resume against a specific job posting
- [ ] Export analysis as PDF report

## License

This project is licensed under the MIT License.