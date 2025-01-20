"use client";
import { useTranslations } from "next-intl";

import useWorkspace from "@/lib/swr/use-workspace";
import { SegmentIntegrationCredentials } from "@/lib/types";
import { Lock } from "@/ui/shared/icons";
import { Button, Tooltip, TooltipContent } from "@dub/ui";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { installSegmentAction } from "../install";

export function SetWriteKey({
  credentials,
  installed,
}: {
  credentials: SegmentIntegrationCredentials;
  installed: boolean;
}) {
  const t = useTranslations("../lib/integrations/segment/ui");

  const { id: workspaceId, slug, plan } = useWorkspace();
  const [writeKey, setWriteKey] = useState(credentials?.writeKey);

  const { executeAsync, isExecuting } = useAction(installSegmentAction, {
    async onSuccess() {
      toast.success("Segment integration enabled successfully.");
    },
    onError({ error }) {
      toast.error(error.serverError || "Failed to enable Segment integration.");
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!workspaceId) {
      return;
    }

    if (!writeKey) {
      toast.error("Write key is required.");
      return;
    }

    await executeAsync({
      workspaceId,
      writeKey,
    });
  };

  const planDisabledTooltip = (
    <TooltipContent
      title={t("segment-integration-business-plan")}
      cta="Upgrade to Business"
      href={`/${slug}/upgrade`}
    />
  );

  return (
    <form className="mt-4 flex items-end gap-2" onSubmit={onSubmit}>
      <div className="w-full rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center gap-x-2 border-b border-gray-200 px-6 py-4">
          <Lock className="size-4" />
          <p className="text-sm font-medium text-gray-700">
            {t("write-key-label")}
          </p>
        </div>

        <div className="p-4">
          <p className="text-sm leading-normal text-gray-600">
            {t("send-click-events-segment", {
              component0: (
                <a
                  href="https://segment.com/docs/connections/find-writekey/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 underline underline-offset-4 hover:text-gray-700"
                >
                  {t("send-click-events-segment_component0")}
                </a>
              ),
            })}
          </p>

          {plan === "free" || plan === "pro" ? (
            <Tooltip content={planDisabledTooltip}>
              <div className="mt-4 cursor-not-allowed rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-400">
                {t("enter-write-key-prompt")}
              </div>
            </Tooltip>
          ) : (
            <div className="relative mt-4 rounded-md shadow-sm">
              <input
                className="w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder={t("enter-your-write-key")}
                required
                type="text"
                autoComplete="off"
                name="writeKey"
                value={writeKey}
                onChange={(e) => setWriteKey(e.target.value)}
                readOnly={installed}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-end rounded-b-lg border-t border-gray-200 bg-gray-50 px-4 py-3">
          <div className="shrink-0">
            <Button
              type="submit"
              variant="primary"
              text={t("save-changes-button")}
              className="h-8 w-fit"
              loading={isExecuting}
              disabled={installed || !writeKey}
              disabledTooltip={
                plan === "free" || plan === "pro"
                  ? planDisabledTooltip
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
}
