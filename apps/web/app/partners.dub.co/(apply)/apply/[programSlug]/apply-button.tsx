"use client";
import { useTranslation } from "react-i18next";


import { Button } from "@dub/ui";
import { useRouter } from "next/navigation";

export function ApplyButton({ programSlug }: { programSlug: string }) {
const { t } = useTranslation("partners.dub.co/(apply)/apply/[programSlug]");

  const router = useRouter();

  return (
    <Button
      type="button"
      text={t('apply-today')}
      className="border-[var(--brand)] bg-[var(--brand)] hover:bg-[var(--brand)] hover:ring-[var(--brand-ring)]"
      onClick={() => router.push(`/apply/${programSlug}/application`)}
    />
  );
}
