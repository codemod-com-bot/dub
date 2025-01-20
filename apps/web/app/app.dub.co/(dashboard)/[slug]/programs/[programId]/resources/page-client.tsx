"use client";
import { useTranslations } from "next-intl";

import { AnimatedEmptyState } from "@/ui/shared/animated-empty-state";
import { FileZip2, Palette2, Post } from "@dub/ui/icons";

const emptyStateIcons = [Post, Palette2, FileZip2];

export function ProgramResourcesPageClient() {
  const t = useTranslations(
    "app.dub.co/(dashboard)/[slug]/programs/[programId]/resources",
  );

  return (
    <AnimatedEmptyState
      title={t("resources")}
      description={t("partner-guides-and-materials")}
      cardContent={(idx) => {
        const Icon = emptyStateIcons[idx % emptyStateIcons.length];
        return (
          <>
            <Icon className="size-4 text-neutral-700" />
            <div className="h-2.5 w-24 min-w-0 rounded-sm bg-neutral-200" />
          </>
        );
      }}
      pillContent="Coming soon"
    />
  );
}
