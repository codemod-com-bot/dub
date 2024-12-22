"use client";
import { useTranslation } from "react-i18next";


import { Button, useKeyboardShortcut } from "@dub/ui";
import { useInvitePartnerSheet } from "./invite-partner-sheet";

export function InvitePartnerButton() {
const { t } = useTranslation("app.dub.co/(dashboard)/[slug]/programs/[programId]/partners");

  const { invitePartnerSheet, setIsOpen: setShowInvitePartnerSheet } =
    useInvitePartnerSheet();

  useKeyboardShortcut("p", () => setShowInvitePartnerSheet(true));

  return (
    <>
      {invitePartnerSheet}
      <Button
        type="button"
        onClick={() => setShowInvitePartnerSheet(true)}
        text={t('invite-partner')}
        shortcut="P"
      />
    </>
  );
}
