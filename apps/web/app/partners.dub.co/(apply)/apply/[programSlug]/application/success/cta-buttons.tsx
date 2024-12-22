"use client";
import { useTranslation } from "react-i18next";


import { Button } from "@dub/ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function CTAButtons() {
const { t } = useTranslation("partners.dub.co/(apply)/apply/[programSlug]/application/success");

  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      <Button
        type="button"
        text={
          status === "authenticated"
            ? "Continue to Dub Partners"
            : "Create your Dub Partners account"
        }
        className="border-[var(--brand)] bg-[var(--brand)] hover:bg-[var(--brand)] hover:ring-[var(--brand-ring)]"
        onClick={() =>
          router.push(status === "authenticated" ? "/" : "/register")
        }
      />
      {status === "unauthenticated" && (
        <Button
          type="button"
          variant="secondary"
          text={t('log-in-to-dub-partners')}
          onClick={() => router.push("/login")}
        />
      )}
    </>
  );
}
