// This type must mirror the backend's ResumeAnalysis Pydantic model
// (backend/app/models/schemas.py) exactly. If the backend's schema
// changes, this file must be updated to match.
export interface ResumeAnalysis {
  strengths: string[];
  weaknesses: string[];
  ats_score: number;
  technical_skills: string[];
  missing_keywords: string[];
  recommendations: string[];
}