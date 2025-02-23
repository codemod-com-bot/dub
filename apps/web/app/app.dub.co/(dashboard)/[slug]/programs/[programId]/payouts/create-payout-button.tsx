"use client";
import { useTranslations } from "next-intl";

import { useCreatePayoutSheet } from "@/ui/partners/create-payout-sheet";
import { Button, useKeyboardShortcut } from "@dub/ui";

export function CreatePayoutButton() {
  const t = useTranslations(
    "app.dub.co/(dashboard)/[slug]/programs/[programId]/payouts",
  );

  const { createPayoutSheet, setIsOpen: setShowCreatePayoutSheet } =
    useCreatePayoutSheet({ nested: false, partnerId: "" });

  useKeyboardShortcut("p", () => setShowCreatePayoutSheet(true));

  return (
    <>
      {createPayoutSheet}
      <Button
        type="button"
        onClick={() => setShowCreatePayoutSheet(true)}
        text={t("create-payout")}
        shortcut="P"
      />
    </>
  );
}
