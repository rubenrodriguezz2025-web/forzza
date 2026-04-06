import { OnboardingWizard } from '@/features/onboarding/components/onboarding-wizard';

export const metadata = {
  title: 'Onboarding — FORZZA',
  description: 'Configura tu perfil y obtén tu programa personalizado',
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
