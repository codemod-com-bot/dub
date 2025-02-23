"use client";
import { useTranslations } from "next-intl";

import { AnimatedEmptyState } from "@/ui/shared/animated-empty-state";
import { Discount } from "@dub/ui/icons";

export function ProgramSettingsDiscountsPageClient() {
  const t = useTranslations(
    "app.dub.co/(dashboard)/[slug]/programs/[programId]/settings/discounts",
  );

  return (
    <AnimatedEmptyState
      title={t("discounts-title")}
      description={t("offer-discounts-to-partners")}
      cardContent={() => {
        return (
          <>
            <Discount className="size-4 text-neutral-700" />
            <div className="h-2.5 w-24 min-w-0 rounded-sm bg-neutral-200" />
          </>
        );
      }}
      pillContent="Coming soon"
    />
  );
}
