from pydantic import BaseModel


class ResumeAnalysis(BaseModel):
    """
    Defines the exact shape of the AI's analysis result.
    FastAPI uses this to validate outgoing data and to generate
    accurate API documentation automatically.
    """
    strengths: list[str]
    weaknesses: list[str]
    ats_score: int  # 0-100
    technical_skills: list[str]
    missing_keywords: list[str]
    recommendations: list[str]