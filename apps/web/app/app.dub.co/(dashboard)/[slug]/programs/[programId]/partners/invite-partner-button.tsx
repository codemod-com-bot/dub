"use client";
import { useTranslations } from "next-intl";

import { Button, useKeyboardShortcut } from "@dub/ui";
import { useInvitePartnerSheet } from "./invite-partner-sheet";

export function InvitePartnerButton() {
  const t = useTranslations(
    "app.dub.co/(dashboard)/[slug]/programs/[programId]/partners",
  );

  const { invitePartnerSheet, setIsOpen: setShowInvitePartnerSheet } =
    useInvitePartnerSheet();

  useKeyboardShortcut("p", () => setShowInvitePartnerSheet(true));

  return (
    <>
      {invitePartnerSheet}
      <Button
        type="button"
        onClick={() => setShowInvitePartnerSheet(true)}
        text={t("invite-partner")}
        shortcut="P"
      />
    </>
  );
}
