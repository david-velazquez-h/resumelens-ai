import { ResumeAnalysis } from "@/types/resume";

interface AnalysisResultsProps {
  analysis: ResumeAnalysis;
}

function scoreColor(score: number) {
  if (score >= 70) return "#5FAE7C";
  if (score >= 40) return "#E8B54D";
  return "#E2726A";
}

function AtsGauge({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg width="144" height="144" className="-rotate-90">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="72" cy="72" r={radius} fill="none"
          stroke={scoreColor(score)} strokeWidth="10"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute font-mono text-3xl font-medium text-brand-text">
        {score}
      </span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-surface p-6">
      <h3 className="mb-4 font-serif text-lg font-medium text-brand-text">{title}</h3>
      {children}
    </div>
  );
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Section title="ATS compatibility score">
        <div className="flex justify-center py-2">
          <AtsGauge score={analysis.ats_score} />
        </div>
      </Section>

      <Section title="Fortalezas">
        <ul className="space-y-2">
          {analysis.strengths.map((item, i) => (
            <li key={i} className="flex gap-2 text-brand-text-muted">
              <span className="text-brand-success">+</span>{item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Debilidades">
        <ul className="space-y-2">
          {analysis.weaknesses.map((item, i) => (
            <li key={i} className="flex gap-2 text-brand-text-muted">
              <span className="text-brand-danger">–</span>{item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Skills técnicos detectados">
        <div className="flex flex-wrap gap-2">
          {analysis.technical_skills.map((skill, i) => (
            <span
              key={i}
              className="rounded-full bg-brand-accent/10 px-3 py-1 text-sm text-brand-accent"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Keywords faltantes">
        <div className="flex flex-wrap gap-2">
          {analysis.missing_keywords.map((kw, i) => (
            <span
              key={i}
              className="rounded-full border border-brand-border px-3 py-1 text-sm text-brand-text-muted"
            >
              {kw}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Recomendaciones">
        <ul className="space-y-2">
          {analysis.recommendations.map((item, i) => (
            <li key={i} className="flex gap-2 text-brand-text-muted">
              <span className="text-brand-accent">→</span>{item}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}