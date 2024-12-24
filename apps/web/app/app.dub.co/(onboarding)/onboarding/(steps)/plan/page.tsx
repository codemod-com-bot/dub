import { useTranslations } from "next-intl";
import { LaterButton } from "../../later-button";
import { StepPage } from "../step-page";
import { PlanSelector } from "./plan-selector";

export default function Plan() {
const t = useTranslations("app.dub.co/(onboarding)/onboarding/(steps)/plan");

  return (
    <StepPage
      title="Choose your plan"
      description="Find a plan that fits your needs"
      className="max-w-2xl"
    >
      <PlanSelector />
      <div className="mt-8 flex flex-col gap-3">
        <a
          href="https://dub.co/enterprise"
          target="_blank"
          className="w-full text-center text-sm text-gray-500 transition-colors hover:text-gray-700"
        >{t('looking-for-enterprise')}</a>
        <LaterButton next="finish">{t('ill-pick-a-plan-later')}</LaterButton>
      </div>
    </StepPage>
  );
}
