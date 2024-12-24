"use client";
import { useTranslations } from "next-intl";


import { AnimatedEmptyState } from "@/ui/shared/animated-empty-state";
import { Palette2, Photo, Post } from "@dub/ui/icons";

const emptyStateIcons = [Post, Palette2, Photo];

export function ProgramBrandingPageClient() {
const t = useTranslations("app.dub.co/(dashboard)/[slug]/programs/[programId]/branding");

  return (
    <AnimatedEmptyState
      title={t('branding')}
      description={t('customize-graphics-colors-and-more-to-fit-your-brand')}
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
