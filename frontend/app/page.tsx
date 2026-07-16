"use client";

import { useState } from "react";
import { UploadForm } from "@/components/upload-form";
import { AnalysisResults } from "@/components/analysis-results";
import { ResumeAnalysis } from "@/types/resume";

export default function Home() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  return (
    <main className="min-h-screen bg-brand-bg">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(232,181,77,0.12) 0%, rgba(11,12,16,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl flex flex-col items-center gap-12 px-6 py-24">
        <div className="text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-accent">
            AI resume analysis
          </p>
          <h1 className="font-serif text-5xl font-semibold text-brand-text">
            ResumeLens AI
          </h1>
          <p className="mt-3 text-brand-text-muted">
            Sube tu CV y recibe feedback de IA al instante.
          </p>
        </div>

        <UploadForm onAnalysisComplete={setAnalysis} />

        {analysis && <AnalysisResults analysis={analysis} />}
      </div>
    </main>
  );
}