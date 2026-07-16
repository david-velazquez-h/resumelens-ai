"use client";

import { useState, useRef } from "react";
import { analyzeResume } from "@/lib/api";
import { ResumeAnalysis } from "@/types/resume";

interface UploadFormProps {
  onAnalysisComplete: (analysis: ResumeAnalysis) => void;
}

export function UploadForm({ onAnalysisComplete }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelected(selected: File | null) {
    if (selected && selected.type !== "application/pdf") {
      setError("Solo se aceptan archivos PDF.");
      return;
    }
    setError(null);
    setFile(selected);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelected(e.dataTransfer.files?.[0] ?? null);
  }

  async function handleSubmit() {
    if (!file) return;
    setIsLoading(true);
    setError(null);

    try {
      const analysis = await analyzeResume(file);
      onAnalysisComplete(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-2xl border p-12 text-center transition-all ${
          isDragging
            ? "border-brand-accent bg-brand-accent/5"
            : "border-brand-border bg-brand-surface hover:border-white/20"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleFileSelected(e.target.files?.[0] ?? null)}
        />
        <p className="font-medium text-brand-text">
          {file ? file.name : "Arrastra tu PDF aquí, o haz clic para elegirlo"}
        </p>
        <p className="mt-1 text-sm text-brand-text-muted">
          Solo archivos PDF
        </p>
      </div>

      {error && <p className="text-sm text-brand-danger">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!file || isLoading}
        className="w-full rounded-lg bg-brand-accent py-3 font-medium text-brand-bg transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isLoading ? "Analizando..." : "Analizar resume"}
      </button>
    </div>
  );
}