'use client';

import { GOAL_OPTIONS, type GoalData } from '../lib/schemas';

interface StepGoalProps {
  data: GoalData;
  onChange: (data: GoalData) => void;
}

export function StepGoal({ data, onChange }: StepGoalProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-400">
        Esto determina cómo calculamos tus calorías y macros.
      </p>

      <div className="space-y-2">
        {GOAL_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange({ goal: option.value })}
            className={`flex w-full items-center gap-4 rounded-lg border px-4 py-4 text-left transition-all duration-200 ${
              data.goal === option.value
                ? 'border-orange-500 bg-orange-500/10'
                : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
            }`}
          >
            <span className="text-2xl">{option.icon}</span>
            <div>
              <div
                className={`text-sm font-semibold ${
                  data.goal === option.value ? 'text-orange-400' : 'text-zinc-200'
                }`}
              >
                {option.label}
              </div>
              <div className="text-xs text-zinc-500">{option.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
