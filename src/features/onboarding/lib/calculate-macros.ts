interface MacroInput {
  sex: 'male' | 'female';
  age: number;
  weight_kg: number;
  height_cm: number;
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'active';
  goal: 'lose_fat' | 'gain_muscle' | 'recomposition' | 'maintain';
}

export interface MacroResult {
  tmb: number;
  tdee: number;
  target_calories: number;
  target_protein_g: number;
  target_carbs_g: number;
  target_fat_g: number;
}

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
} as const;

const GOAL_ADJUSTMENTS = {
  lose_fat: -0.15,
  gain_muscle: 0.1,
  recomposition: -0.05,
  maintain: 0,
} as const;

export function calculateMacros(input: MacroInput): MacroResult {
  // Mifflin-St Jeor
  const tmb =
    input.sex === 'male'
      ? 10 * input.weight_kg + 6.25 * input.height_cm - 5 * input.age + 5
      : 10 * input.weight_kg + 6.25 * input.height_cm - 5 * input.age - 161;

  const activityLevel = input.activity_level ?? 'light';
  const tdee = Math.round(tmb * ACTIVITY_MULTIPLIERS[activityLevel]);

  const adjustment = GOAL_ADJUSTMENTS[input.goal];
  const target_calories = Math.round(tdee * (1 + adjustment));

  // Método FORZZA: proteína 1.8g/kg, grasa 0.7g/kg, resto carbos
  const target_protein_g = Math.round(input.weight_kg * 1.8);
  const target_fat_g = Math.round(input.weight_kg * 0.7);

  const protein_cal = target_protein_g * 4;
  const fat_cal = target_fat_g * 9;
  const target_carbs_g = Math.round(Math.max(0, (target_calories - protein_cal - fat_cal) / 4));

  return {
    tmb: Math.round(tmb),
    tdee,
    target_calories,
    target_protein_g,
    target_carbs_g,
    target_fat_g,
  };
}
