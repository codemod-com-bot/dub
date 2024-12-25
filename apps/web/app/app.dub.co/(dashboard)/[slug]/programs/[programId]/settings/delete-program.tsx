"use client";
import { useTranslations } from "next-intl";

import { Button } from "@dub/ui";

export function DeleteProgram({ programId }: { programId: string }) {
  const t = useTranslations(
    "app.dub.co/(dashboard)/[slug]/programs/[programId]/settings",
  );

  // TODO:
  // Delete program

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col gap-1 p-8">
        <h2 className="text-xl font-medium text-neutral-900">
          {t("delete-program")}
        </h2>
        <p className="text-sm font-normal text-neutral-600">
          {t("permanently-delete-partner-program")}
        </p>
      </div>
      <div className="border-t border-gray-200" />
      <div className="flex items-center justify-end rounded-b-lg bg-gray-50 px-8 py-5">
        <div>
          <Button
            text={t("delete-program-string")}
            variant="danger"
            className="h-8"
            disabledTooltip={
              <div className="px-3 py-2 text-sm text-neutral-600">
                {t("contact-us-delete-program", {
                  component0: (
                    <a
                      className="underline"
                      href="mailto:support@dub.co?subject=Delete my program"
                    >
                      {t("contact-us-delete-program_component0")}
                    </a>
                  ),
                })}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
