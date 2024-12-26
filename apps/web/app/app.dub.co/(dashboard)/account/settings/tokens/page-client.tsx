"use client";
import { useTranslations } from "next-intl";

import { TokenProps } from "@/lib/types";
import { useDeleteTokenModal } from "@/ui/modals/delete-token-modal";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  IconMenu,
  LoadingSpinner,
  Popover,
  TokenAvatar,
} from "@dub/ui";
import { fetcher, timeAgo } from "@dub/utils";
import { FolderOpen, Info, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

export default function TokensPageClient() {
  const t = useTranslations("app.dub.co/(dashboard)/account/settings/tokens");

  const { data: tokens, isLoading } = useSWR<TokenProps[]>(
    "/api/user/tokens",
    fetcher,
  );

  return (
    <>
      <Alert>
        <Info className="mt-2 h-5 w-5 text-yellow-500" />
        <AlertTitle>
          {t("user-api-keys-replaced-by-workspace-api-keys")}
        </AlertTitle>
        <AlertDescription className="text-gray-500">
          {t("recommend-creating-new-workspace-api-key", {
            component0: (
              <a
                href="https://dub.co/docs/api-reference/tokens"
                target="_blank"
                className="font-medium underline underline-offset-4 hover:text-black"
              >
                {t("recommend-creating-new-workspace-api-key_component0")}
              </a>
            ),
            component1: (
              <a
                href="https://dub.co/blog/workspace-api-keys"
                target="_blank"
                className="font-medium underline underline-offset-4 hover:text-black"
              >
                {t("recommend-creating-new-workspace-api-key_component1")}
              </a>
            ),
          })}
        </AlertDescription>
      </Alert>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex flex-col space-y-3 p-5 sm:p-10">
          <h2 className="text-xl font-medium">{t("your-api-keys")}</h2>
          <p className="text-sm text-gray-500">
            {t("api-keys-allow-access-caution")}
          </p>
        </div>
        {isLoading || !tokens ? (
          <div className="flex flex-col items-center justify-center space-y-4 pb-20 pt-10">
            <LoadingSpinner className="h-6 w-6 text-gray-500" />
            <p className="text-sm text-gray-500">{t("fetching-api-keys")}</p>
          </div>
        ) : tokens.length > 0 ? (
          <div>
            <div className="grid grid-cols-5 border-b border-gray-200 px-5 py-2 text-sm font-medium text-gray-500 sm:px-10">
              <div className="col-span-3">{t("name")}</div>
              <div>{t("key")}</div>
              <div className="text-center">{t("last-used")}</div>
            </div>
            <div className="divide-y divide-gray-200">
              {tokens.map((token) => (
                <TokenRow key={token.id} {...token} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 pb-20 pt-10">
            <FolderOpen className="h-6 w-6 text-gray-500" />
            <p className="text-sm text-gray-500">
              {t("no-api-keys-found-create-one")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

const TokenRow = (token: TokenProps) => {
  const t = useTranslations("app.dub.co/(dashboard)/account/settings/tokens");

  const [openPopover, setOpenPopover] = useState(false);

  const { DeleteTokenModal, setShowDeleteTokenModal } = useDeleteTokenModal({
    token,
  });

  return (
    <>
      <DeleteTokenModal />
      <div className="relative grid grid-cols-5 items-center px-5 py-3 sm:px-10">
        <div className="col-span-3 flex items-center space-x-3">
          <TokenAvatar id={token.id} />
          <div className="flex flex-col space-y-px">
            <p className="font-semibold text-gray-700">{token.name}</p>
            <p className="text-sm text-gray-500" suppressHydrationWarning>
              {t("created")}
              {timeAgo(token.createdAt, { withAgo: true })}
            </p>
          </div>
        </div>
        <div className="font-mono text-sm">{token.partialKey}</div>
        <div
          className="text-center text-sm text-gray-500"
          suppressHydrationWarning
        >
          {timeAgo(token.lastUsed)}
        </div>
        <Popover
          content={
            <div className="grid w-full gap-1 p-2 sm:w-48">
              <button
                onClick={() => {
                  setOpenPopover(false);
                  setShowDeleteTokenModal(true);
                }}
                className="rounded-md p-2 text-left text-sm font-medium text-red-600 transition-all duration-75 hover:bg-red-600 hover:text-white"
              >
                <IconMenu
                  text={t("delete-api-key")}
                  icon={<Trash className="h-4 w-4" />}
                />
              </button>
            </div>
          }
          align="end"
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        >
          <button
            onClick={() => {
              setOpenPopover(!openPopover);
            }}
            className="absolute right-4 rounded-md px-1 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
          >
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>
        </Popover>
      </div>
    </>
  );
};
