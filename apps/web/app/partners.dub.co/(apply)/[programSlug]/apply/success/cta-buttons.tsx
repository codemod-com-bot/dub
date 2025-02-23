"use client";
import { useTranslations } from "next-intl";

import { Button } from "@dub/ui";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CTAButtons() {
  const t = useTranslations(
    "partners.dub.co/(apply)/[programSlug]/apply/success",
  );

  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      <Link href={status === "authenticated" ? "/" : "/register"}>
        <Button
          type="button"
          text={
            status === "authenticated"
              ? "Continue to Dub Partners"
              : "Create your Dub Partners account"
          }
          className="border-[var(--brand)] bg-[var(--brand)] hover:bg-[var(--brand)] hover:ring-[var(--brand-ring)]"
        />
      </Link>
      {status === "unauthenticated" && (
        <Link href="/login">
          <Button
            type="button"
            variant="secondary"
            text={t("log-in-to-dub-partners")}
          />
        </Link>
      )}
    </>
  );
}
