"use client";
import { useTranslations } from "next-intl";

import { Button, useKeyboardShortcut } from "@dub/ui";
import { useAddPartnerSheet } from "./add-partner-sheet";

export function AddPartnerButton() {
  const t = useTranslations(
    "app.dub.co/(dashboard)/[slug]/programs/[programId]/partners",
  );

  const { addPartnerSheet, setIsOpen: setShowAddPartnerSheet } =
    useAddPartnerSheet();

  useKeyboardShortcut("p", () => setShowAddPartnerSheet(true));

  return (
    <>
      {addPartnerSheet}
      <Button
        type="button"
        onClick={() => setShowAddPartnerSheet(true)}
        text={t("add-partner")}
        shortcut="P"
      />
    </>
  );
}
