"use client";
import { useTranslations } from "next-intl";


import { ExpandingArrow, LoadingSpinner } from "@dub/ui/icons";
import { useOnboardingProgress } from "../use-onboarding-progress";

export function ExitButton() {
const t = useTranslations("app.dub.co/(onboarding)/onboarding/(steps)");

  const { finish, isLoading, isSuccessful } = useOnboardingProgress();

  return (
    <button
      type="button"
      onClick={finish}
      disabled={isLoading || isSuccessful}
      className="group flex items-center gap-1 p-3 pr-7 text-sm text-black/50 transition-colors enabled:hover:text-black/80"
    >
      {(isLoading || isSuccessful) && (
        <LoadingSpinner className="mr-1 size-3" />
      )}{t('skip-onboarding')}<ExpandingArrow className="size-3" />
    </button>
  );
}
