'use client';

import { PARQ_QUESTIONS, type ParqData } from '../lib/schemas';

interface StepParqProps {
  data: ParqData;
  onChange: (data: ParqData) => void;
}

export function StepParq({ data, onChange }: StepParqProps) {
  const keys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

  function toggle(key: keyof ParqData) {
    onChange({ ...data, [key]: !data[key] });
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-400">
        Responde con honestidad. Tu seguridad es lo primero.
      </p>

      <div className="space-y-2">
        {PARQ_QUESTIONS.map((question, i) => {
          const key = keys[i];
          const active = data[key];

          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              className={`flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-all duration-200 ${
                active
                  ? 'border-red-500/50 bg-red-500/10 text-red-300'
                  : 'border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900'
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all duration-200 ${
                  active
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-zinc-600'
                }`}
              >
                {active && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm leading-snug">{question}</span>
            </button>
          );
        })}
      </div>

      <p className="rounded-lg border border-zinc-800 bg-zinc-900/30 px-4 py-3 text-xs text-zinc-500">
        Este cuestionario no sustituye el consejo médico profesional. Si tienes
        dudas sobre tu estado de salud, consulta con tu médico antes de comenzar.
      </p>
    </div>
  );
}
