import { z } from 'zod';

export const parqSchema = z.object({
  q1: z.boolean(),
  q2: z.boolean(),
  q3: z.boolean(),
  q4: z.boolean(),
  q5: z.boolean(),
  q6: z.boolean(),
  q7: z.boolean(),
});

export type ParqData = z.infer<typeof parqSchema>;

export const PARQ_QUESTIONS = [
  '¿Alguna vez tu médico te ha dicho que tienes un problema cardíaco y que solo deberías hacer actividad física recomendada por un médico?',
  '¿Sientes dolor en el pecho cuando realizas actividad física?',
  '¿En el último mes, has tenido dolor en el pecho estando en reposo?',
  '¿Pierdes el equilibrio por mareos o alguna vez has perdido el conocimiento?',
  '¿Tienes algún problema óseo o articular que podría empeorar con un cambio en tu actividad física?',
  '¿Tu médico te está recetando actualmente medicamentos para la presión arterial o alguna condición cardíaca?',
  '¿Conoces alguna otra razón por la que no deberías realizar actividad física?',
] as const;

export const personalDataSchema = z.object({
  sex: z.enum(['male', 'female']),
  age: z.number().min(16, 'Debes tener al menos 16 años').max(80, 'Edad máxima: 80 años'),
  weight_kg: z.number().min(30, 'Mínimo 30 kg').max(250, 'Máximo 250 kg'),
  height_cm: z.number().min(120, 'Mínimo 120 cm').max(230, 'Máximo 230 cm'),
});

export type PersonalData = z.infer<typeof personalDataSchema>;

export const goalSchema = z.object({
  goal: z.enum(['lose_fat', 'gain_muscle', 'recomposition', 'maintain']),
});

export type GoalData = z.infer<typeof goalSchema>;

export const GOAL_OPTIONS = [
  { value: 'lose_fat', label: 'Perder grasa', description: 'Definición y pérdida de peso', icon: '🔥' },
  { value: 'gain_muscle', label: 'Ganar músculo', description: 'Volumen y fuerza', icon: '💪' },
  { value: 'recomposition', label: 'Recomposición', description: 'Perder grasa y ganar músculo', icon: '⚡' },
  { value: 'maintain', label: 'Mantenerme', description: 'Conservar mi físico actual', icon: '🎯' },
] as const;

export const preferencesSchema = z.object({
  training_days_per_week: z.union([z.literal(2), z.literal(3)]),
  training_experience: z.enum(['beginner', 'intermediate', 'advanced']),
  equipment_access: z.enum(['full_gym', 'home_basic', 'home_full']),
  preferred_fasting_time: z.enum(['morning', 'evening']),
  big_meal_preference: z.enum(['lunch', 'dinner']),
});

export type PreferencesData = z.infer<typeof preferencesSchema>;

export interface OnboardingData {
  parq: ParqData;
  personal: PersonalData;
  goal: GoalData;
  preferences: PreferencesData;
}
