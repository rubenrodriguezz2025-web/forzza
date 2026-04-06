'use client';

import { type PersonalData } from '../lib/schemas';

interface StepPersonalDataProps {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
  errors: Record<string, string>;
}

export function StepPersonalData({ data, onChange, errors }: StepPersonalDataProps) {
  function update(field: keyof PersonalData, value: string | number) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-6">
      {/* Sexo */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Sexo</label>
        <div className="grid grid-cols-2 gap-3">
          {([
            { value: 'male', label: 'Hombre' },
            { value: 'female', label: 'Mujer' },
          ] as const).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => update('sex', option.value)}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                data.sex === option.value
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Edad */}
      <div className="space-y-2">
        <label htmlFor="age" className="text-sm font-medium text-zinc-300">
          Edad
        </label>
        <input
          id="age"
          type="number"
          inputMode="numeric"
          placeholder="25"
          value={data.age || ''}
          onChange={(e) => update('age', parseInt(e.target.value) || 0)}
          className="flex h-12 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all duration-200"
        />
        {errors.age && <p className="text-xs text-red-400">{errors.age}</p>}
      </div>

      {/* Peso */}
      <div className="space-y-2">
        <label htmlFor="weight" className="text-sm font-medium text-zinc-300">
          Peso (kg)
        </label>
        <input
          id="weight"
          type="number"
          inputMode="decimal"
          step="0.1"
          placeholder="75"
          value={data.weight_kg || ''}
          onChange={(e) => update('weight_kg', parseFloat(e.target.value) || 0)}
          className="flex h-12 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all duration-200"
        />
        {errors.weight_kg && <p className="text-xs text-red-400">{errors.weight_kg}</p>}
      </div>

      {/* Altura */}
      <div className="space-y-2">
        <label htmlFor="height" className="text-sm font-medium text-zinc-300">
          Altura (cm)
        </label>
        <input
          id="height"
          type="number"
          inputMode="numeric"
          placeholder="178"
          value={data.height_cm || ''}
          onChange={(e) => update('height_cm', parseInt(e.target.value) || 0)}
          className="flex h-12 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all duration-200"
        />
        {errors.height_cm && <p className="text-xs text-red-400">{errors.height_cm}</p>}
      </div>
    </div>
  );
}
