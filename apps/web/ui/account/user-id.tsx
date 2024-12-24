"use client";
import { useTranslations } from "next-intl";


import { CopyButton } from "@dub/ui";
import { useSession } from "next-auth/react";

export default function UserId() {
const t = useTranslations("../ui/account");

  const { data: session } = useSession() as
    | {
        data: { user: { id: string } };
      }
    | { data: null };

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="relative flex flex-col space-y-6 p-5 sm:p-10">
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-medium">{t('your-user-id')}</h2>
            <p className="text-sm text-gray-500">{t('unique-account-identifier-on-dub')}</p>
          </div>
          {session?.user?.id ? (
            <div className="flex w-full max-w-md items-center justify-between rounded-md border border-gray-300 bg-white p-2">
              <p className="text-sm text-gray-500">{session.user.id}</p>
              <CopyButton value={session.user.id} className="rounded-md" />
            </div>
          ) : (
            <div className="h-[2.35rem] w-full max-w-md animate-pulse rounded-md bg-gray-200" />
          )}
        </div>
        <div className="h-14 rounded-b-lg border-t border-gray-200 bg-gray-50" />
      </div>
    </>
  );
}
