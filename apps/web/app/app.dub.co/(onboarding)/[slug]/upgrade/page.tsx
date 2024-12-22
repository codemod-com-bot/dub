import { useTranslation } from "react-i18next";
import { Wordmark } from "@dub/ui";
import Link from "next/link";
import { PlanSelector } from "../../onboarding/(steps)/plan/plan-selector";
import { StepPage } from "../../onboarding/(steps)/step-page";
import ExitButton from "./exit-button";

export default function Plan() {
const { t } = useTranslation("app.dub.co/(onboarding)/[slug]/upgrade");

  return (
    <div className="relative flex flex-col items-center">
      <ExitButton />
      <Link href="/">
        <Wordmark className="mt-6 h-8" />
      </Link>
      <div className="mt-8 flex w-full flex-col items-center px-3 pb-16 md:mt-20 lg:px-8">
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
          </div>
        </StepPage>
      </div>
    </div>
  );
}
