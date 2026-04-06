'use client';

import { type PreferencesData } from '../lib/schemas';

interface StepPreferencesProps {
  data: PreferencesData;
  onChange: (data: PreferencesData) => void;
}

interface OptionGroup {
  label: string;
  field: keyof PreferencesData;
  options: { value: string | number; label: string; sublabel?: string }[];
}

const OPTION_GROUPS: OptionGroup[] = [
  {
    label: 'Días de entrenamiento por semana',
    field: 'training_days_per_week',
    options: [
      { value: 2, label: '2 días', sublabel: 'Upper / Lower' },
      { value: 3, label: '3 días', sublabel: 'Push / Pull / Legs' },
    ],
  },
  {
    label: 'Experiencia entrenando',
    field: 'training_experience',
    options: [
      { value: 'beginner', label: 'Principiante', sublabel: 'Menos de 1 año' },
      { value: 'intermediate', label: 'Intermedio', sublabel: '1-3 años' },
      { value: 'advanced', label: 'Avanzado', sublabel: 'Más de 3 años' },
    ],
  },
  {
    label: 'Equipo disponible',
    field: 'equipment_access',
    options: [
      { value: 'full_gym', label: 'Gym completo' },
      { value: 'home_basic', label: 'Casa básico', sublabel: 'Mancuernas + barra' },
      { value: 'home_full', label: 'Casa completo', sublabel: 'Home gym equipado' },
    ],
  },
  {
    label: 'Ventana de ayuno preferida',
    field: 'preferred_fasting_time',
    options: [
      { value: 'morning', label: 'Mañana', sublabel: 'No comer hasta mediodía' },
      { value: 'evening', label: 'Noche', sublabel: 'Cenar ligero' },
    ],
  },
  {
    label: 'Comida grande del día',
    field: 'big_meal_preference',
    options: [
      { value: 'lunch', label: 'Almuerzo' },
      { value: 'dinner', label: 'Cena' },
    ],
  },
];

export function StepPreferences({ data, onChange }: StepPreferencesProps) {
  function update(field: keyof PreferencesData, value: string | number) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-6">
      {OPTION_GROUPS.map((group) => (
        <div key={group.field} className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">{group.label}</label>
          <div className={`grid gap-2 ${group.options.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
            {group.options.map((option) => {
              const isSelected = data[group.field] === option.value;
              return (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => update(group.field, option.value)}
                  className={`rounded-lg border px-3 py-3 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                  }`}
                >
                  <div className={`text-sm font-medium ${isSelected ? 'text-orange-400' : 'text-zinc-300'}`}>
                    {option.label}
                  </div>
                  {option.sublabel && (
                    <div className="mt-0.5 text-xs text-zinc-500">{option.sublabel}</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
