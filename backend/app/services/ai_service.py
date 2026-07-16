import json
from groq import Groq
from app.core.config import GROQ_API_KEY
from app.models.schemas import ResumeAnalysis

client = Groq(api_key=GROQ_API_KEY)

SYSTEM_PROMPT = """You are an expert technical recruiter and resume reviewer.

Analyze the resume text provided by the user and return ONLY a JSON object
with exactly this structure, no extra text before or after:

{
  "strengths": ["short bullet point", ...],
  "weaknesses": ["short bullet point", ...],
  "ats_score": integer from 0 to 100,
  "technical_skills": ["skill", ...],
  "missing_keywords": ["keyword that would strengthen this resume", ...],
  "recommendations": ["actionable suggestion", ...]
}

IMPORTANT: Write all text values in the SAME language as the resume text
provided by the user. If the resume is in Spanish, respond entirely in
Spanish. If it's in English, respond in English. Match the resume's
language exactly.
"""


def analyze_resume(resume_text: str) -> ResumeAnalysis:
    """
    Sends resume text to Groq's LLM and returns a validated
    ResumeAnalysis object.
    """
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": resume_text},
        ],
        temperature=0.3,
        response_format={"type": "json_object"},
    )

    raw_content = response.choices[0].message.content
    parsed = json.loads(raw_content)

    # Validates the AI's output against our schema. If the AI returned
    # something malformed, this raises a clear error instead of passing
    # broken data downstream.
    return ResumeAnalysis(**parsed)