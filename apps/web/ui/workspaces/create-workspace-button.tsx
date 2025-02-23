"use client";
import { useTranslations } from "next-intl";

import useWorkspaces from "@/lib/swr/use-workspaces";
import { ModalContext } from "@/ui/modals/modal-provider";
import { Button, TooltipContent } from "@dub/ui";
import { FREE_WORKSPACES_LIMIT } from "@dub/utils";
import { useContext } from "react";

export default function CreateWorkspaceButton() {
  const t = useTranslations("../ui/workspaces");

  const { setShowAddWorkspaceModal } = useContext(ModalContext);
  const { freeWorkspaces, exceedingFreeWorkspaces } = useWorkspaces();

  return (
    <div>
      <Button
        text={t("create-workspace")}
        disabledTooltip={
          exceedingFreeWorkspaces ? (
            <TooltipContent
              title={t("free-workspaces-limit-message", {
                FREE_WORKSPACES_LIMIT: FREE_WORKSPACES_LIMIT,
              })}
              cta="Upgrade to Pro"
              href={
                freeWorkspaces
                  ? `/${freeWorkspaces[0].slug}/upgrade`
                  : "https://dub.co/pricing"
              }
            />
          ) : undefined
        }
        className="flex-shrink-0 truncate"
        onClick={() => setShowAddWorkspaceModal(true)}
      />
    </div>
  );
}
