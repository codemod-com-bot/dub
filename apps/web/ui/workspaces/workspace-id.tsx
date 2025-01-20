"use client";
import { useTranslations } from "next-intl";

import useWorkspace from "@/lib/swr/use-workspace";
import { CopyButton } from "@dub/ui";

export default function WorkspaceId() {
  const t = useTranslations("../ui/workspaces");

  const { id } = useWorkspace();

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="relative flex flex-col space-y-6 p-5 sm:p-10">
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-medium">{t("workspace-id")}</h2>
            <p className="text-sm text-gray-500">
              {t("workspace-id-description")}
            </p>
          </div>
          {id ? (
            <div className="flex w-full max-w-md items-center justify-between rounded-md border border-gray-300 bg-white p-2">
              <p className="text-sm text-gray-500">{id}</p>
              <CopyButton value={id} className="rounded-md" />
            </div>
          ) : (
            <div className="h-[2.35rem] w-full max-w-md animate-pulse rounded-md bg-gray-200" />
          )}
        </div>
        <div className="flex items-center justify-between rounded-b-lg border-t border-gray-200 bg-gray-50 px-3 py-5 sm:px-10">
          <p className="text-sm text-gray-500">
            {t("workspace-id-usage", {
              component0: (
                <a
                  href="https://dub.co/api"
                  target="_blank"
                  className="underline underline-offset-2 transition-colors hover:text-gray-700"
                >
                  {t("workspace-id-usage_component0")}
                </a>
              ),
            })}
          </p>
        </div>
      </div>
    </>
  );
}
