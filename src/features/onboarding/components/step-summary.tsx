'use client';

import { type MacroResult } from '../lib/calculate-macros';
import { GOAL_OPTIONS, type OnboardingData } from '../lib/schemas';

interface StepSummaryProps {
  data: OnboardingData;
  macros: MacroResult;
}

const MACRO_CARDS = [
  { key: 'target_calories', label: 'Calorías', unit: 'kcal', color: 'text-orange-400' },
  { key: 'target_protein_g', label: 'Proteína', unit: 'g', color: 'text-emerald-400' },
  { key: 'target_carbs_g', label: 'Carbos', unit: 'g', color: 'text-sky-400' },
  { key: 'target_fat_g', label: 'Grasa', unit: 'g', color: 'text-amber-400' },
] as const;

export function StepSummary({ data, macros }: StepSummaryProps) {
  const goalLabel = GOAL_OPTIONS.find((g) => g.value === data.goal.goal)?.label ?? '';

  return (
    <div className="space-y-6">
      {/* Resumen datos */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-4">
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="text-zinc-500">Sexo</div>
          <div className="text-zinc-200">{data.personal.sex === 'male' ? 'Hombre' : 'Mujer'}</div>
          <div className="text-zinc-500">Edad</div>
          <div className="text-zinc-200">{data.personal.age} años</div>
          <div className="text-zinc-500">Peso</div>
          <div className="text-zinc-200">{data.personal.weight_kg} kg</div>
          <div className="text-zinc-500">Altura</div>
          <div className="text-zinc-200">{data.personal.height_cm} cm</div>
          <div className="text-zinc-500">Objetivo</div>
          <div className="text-zinc-200">{goalLabel}</div>
          <div className="text-zinc-500">Entrenamiento</div>
          <div className="text-zinc-200">{data.preferences.training_days_per_week} días/semana</div>
        </div>
      </div>

      {/* Macros calculados */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-zinc-400">Tu plan personalizado</h3>
        <div className="grid grid-cols-2 gap-3">
          {MACRO_CARDS.map((card) => (
            <div
              key={card.key}
              className="rounded-lg border border-zinc-800 bg-zinc-900/30 px-4 py-4"
            >
              <div className={`text-2xl font-bold tabular-nums ${card.color}`}>
                {macros[card.key]}
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                {card.label} <span className="text-zinc-600">({card.unit})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TMB / TDEE */}
      <div className="flex items-center justify-center gap-6 text-center">
        <div>
          <div className="text-lg font-semibold text-zinc-300">{macros.tmb}</div>
          <div className="text-xs text-zinc-600">TMB</div>
        </div>
        <div className="h-8 w-px bg-zinc-800" />
        <div>
          <div className="text-lg font-semibold text-zinc-300">{macros.tdee}</div>
          <div className="text-xs text-zinc-600">TDEE</div>
        </div>
      </div>

      <p className="text-xs text-zinc-500">
        Calculado con la fórmula Mifflin-St Jeor. Estos valores son una referencia
        inicial que se ajustará según tu progreso.
      </p>
    </div>
  );
}
