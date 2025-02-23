import { getSession } from "@/lib/auth";
import { prisma } from "@dub/prisma";
import { ConnectedDots4 } from "@dub/ui/icons";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { OnboardingForm } from "./onboarding-form";

export default function PartnerOnboarding() {
  const t = useTranslations("partners.dub.co/(onboarding)/onboarding");

  return (
    <div className="mx-auto my-10 flex w-full max-w-sm flex-col items-center md:mt-14">
      <div className="animate-slide-up-fade flex size-10 items-center justify-center rounded-full border border-neutral-200 bg-white backdrop-blur-sm [--offset:8px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
        <ConnectedDots4 className="size-5 text-neutral-900" />
      </div>
      <h1 className="animate-slide-up-fade mt-6 text-lg font-medium [--offset:8px] [animation-delay:250ms] [animation-duration:1s] [animation-fill-mode:both]">
        {t("create-dub-partner-profile")}
      </h1>
      <div className="animate-slide-up-fade mt-8 w-full [--offset:10px] [animation-delay:500ms] [animation-duration:1s] [animation-fill-mode:both]">
        <Suspense fallback={<OnboardingForm />}>
          <OnboardingFormRSC />
        </Suspense>
      </div>
    </div>
  );
}

async function OnboardingFormRSC() {
  const { user } = await getSession();

  const partner = await prisma.partner.findUnique({
    where: {
      email: user.email,
    },
    select: {
      name: true,
      email: true,
      description: true,
      country: true,
      image: true,
    },
  });
  return <OnboardingForm partner={partner} />;
}
