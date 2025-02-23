"use client";
import { getTranslations } from "next-intl/server";

import { EmptyState, LoadingSpinner } from "@dub/ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default async function ConfirmEmailChangePageClient() {
  const t = await getTranslations(
    "app.dub.co/(auth)/auth/confirm-email-change/[token]",
  );

  const router = useRouter();
  const { update, status } = useSession();
  const hasUpdatedSession = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || hasUpdatedSession.current) {
      return;
    }

    async function updateSession() {
      hasUpdatedSession.current = true;
      await update();
      toast.success("Successfully updated your email!");
      router.replace("/account/settings");
    }

    updateSession();
  }, [status, update]);

  return (
    <EmptyState
      icon={LoadingSpinner}
      title={t("verifying-email-change")}
      description={t("verifying-email-change-request")}
    />
  );
}
