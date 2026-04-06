'use client';

import { useCallback, useMemo, useState } from 'react';

import { calculateMacros } from '../lib/calculate-macros';
import {
  type GoalData,
  type OnboardingData,
  type ParqData,
  type PersonalData,
  personalDataSchema,
  type PreferencesData,
} from '../lib/schemas';

import { StepGoal } from './step-goal';
import { StepParq } from './step-parq';
import { StepPersonalData } from './step-personal-data';
import { StepPreferences } from './step-preferences';
import { StepSummary } from './step-summary';

const STEPS = [
  { id: 'parq', title: 'Salud', subtitle: 'PAR-Q' },
  { id: 'personal', title: 'Datos', subtitle: 'Sobre ti' },
  { id: 'goal', title: 'Objetivo', subtitle: 'Tu meta' },
  { id: 'preferences', title: 'Preferencias', subtitle: 'Tu estilo' },
  { id: 'summary', title: 'Resumen', subtitle: 'Tu plan' },
] as const;

const INITIAL_PARQ: ParqData = { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false };
const INITIAL_PERSONAL: PersonalData = { sex: 'male', age: 0, weight_kg: 0, height_cm: 0 };
const INITIAL_GOAL: GoalData = { goal: 'lose_fat' };
const INITIAL_PREFERENCES: PreferencesData = {
  training_days_per_week: 3,
  training_experience: 'beginner',
  equipment_access: 'full_gym',
  preferred_fasting_time: 'morning',
  big_meal_preference: 'lunch',
};

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const [parq, setParq] = useState<ParqData>(INITIAL_PARQ);
  const [personal, setPersonal] = useState<PersonalData>(INITIAL_PERSONAL);
  const [goal, setGoal] = useState<GoalData>(INITIAL_GOAL);
  const [preferences, setPreferences] = useState<PreferencesData>(INITIAL_PREFERENCES);
  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>({});

  const hasRisk = Object.values(parq).some(Boolean);

  const macros = useMemo(
    () =>
      calculateMacros({
        sex: personal.sex,
        age: personal.age || 25,
        weight_kg: personal.weight_kg || 70,
        height_cm: personal.height_cm || 175,
        goal: goal.goal,
      }),
    [personal, goal]
  );

  const canAdvance = useCallback((): boolean => {
    switch (step) {
      case 0:
        return !hasRisk;
      case 1: {
        const result = personalDataSchema.safeParse(personal);
        return result.success;
      }
      case 2:
        return !!goal.goal;
      case 3:
        return !!(
          preferences.training_days_per_week &&
          preferences.training_experience &&
          preferences.equipment_access &&
          preferences.preferred_fasting_time &&
          preferences.big_meal_preference
        );
      default:
        return true;
    }
  }, [step, hasRisk, personal, goal, preferences]);

  function goNext() {
    if (step === 1) {
      const result = personalDataSchema.safeParse(personal);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const field = issue.path[0];
          if (field) fieldErrors[String(field)] = issue.message;
        }
        setPersonalErrors(fieldErrors);
        return;
      }
      setPersonalErrors({});
    }

    if (step < STEPS.length - 1) {
      setDirection('forward');
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    if (step > 0) {
      setDirection('back');
      setStep((s) => s - 1);
    }
  }

  function handleFinish() {
    const fullData: OnboardingData = { parq, personal, goal, preferences };
    // TODO: enviar a Supabase y redirigir a /app/dashboard
    console.log('Onboarding complete:', fullData, macros);
  }

  const currentStep = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-lg flex-col px-4 py-8">
      {/* Progress bar */}
      <div className="mb-2 flex items-center gap-1.5">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i <= step ? 'bg-orange-500' : 'bg-zinc-800'
            }`}
          />
        ))}
      </div>

      {/* Step counter */}
      <div className="mb-8 flex items-center justify-between">
        <span className="text-xs text-zinc-600">
          Paso {step + 1} de {STEPS.length}
        </span>
        <span className="text-xs text-zinc-600">{currentStep.subtitle}</span>
      </div>

      {/* Title */}
      <h2 className="mb-6 font-alt text-2xl font-bold text-white">
        {step === 0 && 'Cuestionario de salud'}
        {step === 1 && 'Tus datos'}
        {step === 2 && 'Tu objetivo'}
        {step === 3 && 'Tus preferencias'}
        {step === 4 && 'Tu plan FORZZA'}
      </h2>

      {/* Risk blocker */}
      {step === 0 && hasRisk && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-4">
          <p className="text-sm font-medium text-red-400">
            Consulta con un profesional de la salud antes de continuar
          </p>
          <p className="mt-1 text-xs text-red-400/70">
            Has indicado una o más condiciones que requieren evaluación médica
            antes de iniciar un programa de ejercicio. No podemos generar un
            programa hasta que un profesional te autorice.
          </p>
        </div>
      )}

      {/* Step content */}
      <div
        key={step}
        className={`flex-1 ${
          direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'
        }`}
      >
        {step === 0 && <StepParq data={parq} onChange={setParq} />}
        {step === 1 && <StepPersonalData data={personal} onChange={setPersonal} errors={personalErrors} />}
        {step === 2 && <StepGoal data={goal} onChange={setGoal} />}
        {step === 3 && <StepPreferences data={preferences} onChange={setPreferences} />}
        {step === 4 && (
          <StepSummary
            data={{ parq, personal, goal, preferences }}
            macros={macros}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-3 pb-4">
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="flex h-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 px-6 text-sm font-medium text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:text-zinc-300"
          >
            Atrás
          </button>
        )}
        <button
          type="button"
          onClick={isLast ? handleFinish : goNext}
          disabled={!canAdvance()}
          className="flex h-12 flex-1 items-center justify-center rounded-lg bg-orange-500 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-orange-500"
        >
          {isLast ? 'Empezar mi programa' : 'Continuar'}
        </button>
      </div>

      {/* Legal disclaimer */}
      <p className="pb-2 text-center text-[10px] leading-relaxed text-zinc-600">
        El contenido de esta plataforma tiene fines exclusivamente informativos y educativos.
        No constituye asesoramiento médico, deportivo profesional ni nutricional personalizado.
      </p>
    </div>
  );
}
