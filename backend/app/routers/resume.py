from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.pdf_service import extract_text_from_pdf
from app.services.ai_service import analyze_resume
from app.models.schemas import ResumeAnalysis

# APIRouter groups related endpoints together. Instead of registering
# every route directly on the main FastAPI app, we register them here
# and "plug in" this whole router into main.py. This keeps main.py
# clean as the project grows more routers (e.g. /users, /auth later).
router = APIRouter(prefix="/resume", tags=["resume"])


@router.post("/analyze", response_model=ResumeAnalysis)
async def analyze_resume_endpoint(file: UploadFile = File(...)):
    """
    Receives a PDF resume, extracts its text, and returns
    an AI-generated analysis.
    """
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported.",
        )

    file_bytes = await file.read()

    try:
        resume_text = extract_text_from_pdf(file_bytes)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    try:
        analysis = analyze_resume(resume_text)
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"AI analysis failed: {str(e)}",
        )

    return analysis