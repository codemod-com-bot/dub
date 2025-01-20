"use client";
import { useTranslations } from "next-intl";

import { Button } from "@dub/ui";
import { useRouter } from "next/navigation";

export function ApplyButton({ programSlug }: { programSlug: string }) {
  const t = useTranslations("partners.dub.co/(apply)/[programSlug]");

  const router = useRouter();

  return (
    <Button
      type="button"
      text={t("apply-today")}
      className="border-[var(--brand)] bg-[var(--brand)] hover:bg-[var(--brand)] hover:ring-[var(--brand-ring)]"
      onClick={() => router.push(`/apply/${programSlug}/application`)}
    />
  );
}
