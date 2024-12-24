"use client";
import { useTranslations } from "next-intl";


import { OnboardingStep } from "@/lib/onboarding/types";
import { Button, ButtonProps } from "@dub/ui";
import { useOnboardingProgress } from "./use-onboarding-progress";

export function NextButton({
  step,
  ...rest
}: { step: OnboardingStep } & ButtonProps) {
const t = useTranslations("app.dub.co/(onboarding)/onboarding");

  const { continueTo, isLoading, isSuccessful } = useOnboardingProgress();

  return (
    <Button
      variant="primary"
      text={t('next')}
      onClick={() => continueTo(step)}
      loading={isLoading || isSuccessful}
      {...rest}
    />
  );
}
