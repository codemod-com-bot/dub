"use client";
import { useTranslations } from "next-intl";


import { CopyButton } from "@dub/ui";

export default function OAuthAppCredentials({
  clientId,
  clientSecret,
  partialClientSecret,
}: {
  clientId: string;
  clientSecret: string | null;
  partialClientSecret: string;
}) {
const t = useTranslations("../ui/oauth-apps");

  if (!clientId) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-3 text-left">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-500">{t('client-id')}</label>
        <div className="grid grid-cols-[1fr,auto] items-center gap-2 rounded-md border border-gray-300 bg-white p-3">
          <p className="truncate font-mono text-sm text-gray-500">{clientId}</p>
          <CopyButton value={clientId} className="rounded-md" />
        </div>
      </div>

      {clientSecret && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">{t('client-secret-label')}</label>
          <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white p-3">
            <p className="text-nowrap font-mono text-sm text-gray-500">
              {clientSecret}
            </p>
            <div className="flex flex-col gap-2">
              <CopyButton value={clientSecret} className="rounded-md" />
            </div>
          </div>
          <span className="text-xs text-red-400">{t('client-secret-warning')}</span>
        </div>
      )}

      {!clientSecret && partialClientSecret && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">{t('client-secret-label-duplicate')}</label>
          <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white p-3">
            <p className="text-nowrap font-mono text-sm text-gray-500">
              {partialClientSecret}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
