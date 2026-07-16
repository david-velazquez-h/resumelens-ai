import { ResumeAnalysis } from "@/types/resume";

// Reads the backend URL from an environment variable instead of
// hardcoding "http://localhost:8000". This is what lets the exact
// same code work in local development AND in production, just by
// changing the env variable's value per environment.
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function analyzeResume(file: File): Promise<ResumeAnalysis> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/resume/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.detail || `Request failed with status ${response.status}`
    );
  }

  return response.json();
}