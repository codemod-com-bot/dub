"use client";
import { useTranslations } from "next-intl";

import { clientAccessCheck } from "@/lib/api/tokens/permissions";
import useWebhooks from "@/lib/swr/use-webhooks";
import useWorkspace from "@/lib/swr/use-workspace";
import EmptyState from "@/ui/shared/empty-state";
import WebhookCard from "@/ui/webhooks/webhook-card";
import WebhookPlaceholder from "@/ui/webhooks/webhook-placeholder";
import { Button, InfoTooltip, TooltipContent } from "@dub/ui";
import { Webhook } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WebhooksPageClient() {
  const t = useTranslations("app.dub.co/(dashboard)/[slug]/settings/webhooks");

  const router = useRouter();
  const { slug, plan, role } = useWorkspace();

  const { webhooks, isLoading } = useWebhooks();

  const { error: permissionsError } = clientAccessCheck({
    action: "webhooks.write",
    role: role,
  });

  const needsHigherPlan = plan === "free" || plan === "pro";

  if (needsHigherPlan) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-10">
        <EmptyState
          icon={Webhook}
          title={t("webhooks-title")}
          description={t("webhooks-description")}
          learnMore="https://d.to/webhooks"
          buttonText="Upgrade to Business"
          buttonLink={`/${slug}/upgrade`}
        />
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap justify-between gap-6">
        <div className="flex items-center gap-x-2">
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            {t("webhooks-title-visual")}
          </h1>
          <InfoTooltip
            content={
              <TooltipContent
                title={t("webhooks-description-duplicate")}
                href="https://d.to/webhooks"
                target="_blank"
                cta="Learn more"
              />
            }
          />
        </div>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <Button
            className="flex h-10 items-center justify-center whitespace-nowrap rounded-lg border px-4 text-sm"
            text={t("create-webhook-button")}
            onClick={() => router.push(`/${slug}/settings/webhooks/new`)}
            disabledTooltip={permissionsError}
          />
        </div>
      </div>

      <div className="animate-fade-in">
        {!isLoading ? (
          webhooks && webhooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {webhooks.map((webhook) => (
                <WebhookCard {...webhook} key={webhook.id} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 py-10">
              <EmptyState
                icon={Webhook}
                title={t("no-webhooks-message")}
                description={t("webhooks-description-duplicate-2")}
                learnMore="https://d.to/webhooks"
              />
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <WebhookPlaceholder key={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
