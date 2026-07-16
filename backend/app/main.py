from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import resume

# Create the FastAPI application instance.
# This object is the core of the backend — every route we define
# will be attached to it.
app = FastAPI(
    title="ResumeLens AI API",
    description="Backend API for AI-powered resume analysis",
    version="0.1.0",
)

# CORS (Cross-Origin Resource Sharing) configuration.
# By default, browsers block requests from one origin (our frontend,
# running on localhost:3000) to a different origin (our backend,
# running on localhost:8000). This middleware explicitly allows it.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router) 


@app.get("/")
def read_root():
    """Health check endpoint. Used to verify the server is running."""
    return {"status": "ok", "service": "ResumeLens AI API"}