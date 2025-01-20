"use client";
import { useTranslations } from "next-intl";

import { X } from "@/ui/shared/icons";
import { Button } from "@dub/ui";
import { cn } from "@dub/utils";
import { notFound } from "next/navigation";
import { useState } from "react";
import { Drawer } from "vaul";

export function ProgramsPageClient() {
  const t = useTranslations("app.dub.co/(dashboard)/[slug]/programs");

  notFound(); // TODO: remove this once we support multiple programs

  return (
    <Drawer.Root open={true} onOpenChange={() => {}}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/20" />
        <Drawer.Content
          className="fixed bottom-2 right-2 top-2 z-10 flex w-[calc(100%-16px)] outline-none md:w-[540px]"
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          <div className="scrollbar-hide flex size-full grow flex-col overflow-y-auto rounded-lg bg-white">
            <div className="flex items-center justify-between border-b border-neutral-200 px-8 py-5">
              <Drawer.Title className="text-xl font-medium text-zinc-900">
                {t("create-program")}
              </Drawer.Title>
              <Drawer.Close asChild>
                <Button
                  variant="outline"
                  icon={<X className="size-5" />}
                  className="h-auto w-fit p-1"
                />
              </Drawer.Close>
            </div>
            <div className="p-6">
              <CreateOrUpdateProgramForm />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

const commissionTypes = [
  {
    label: "One-off",
    description: "Pay a one-time payout",
    value: "one-off",
  },
  {
    label: "Recurring",
    description: "Pay an ongoing payout",
    value: "recurring",
  },
];

const CreateOrUpdateProgramForm = () => {
  const t = useTranslations("app.dub.co/(dashboard)/[slug]/programs");

  const [commissionType, setCommissionType] = useState("one-off");

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold leading-[17.60px] text-neutral-900">
            {t("summary")}
          </h3>
          <p className="rounded-md border border-neutral-200 bg-[#f9f9f9] p-4 text-sm font-normal leading-[18.20px] text-neutral-900">
            {t("earn-conversion-reward")}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-semibold leading-[17.60px] text-neutral-900">
              {t("commission")}
            </h3>
            <p className="text-sm font-normal leading-[21px] text-neutral-600">
              {t("partner-reward-settings")}
            </p>
          </div>
          <p className="space-y-6">
            <div className="flex w-full gap-3">
              {commissionTypes.map(({ value, description, label }) => (
                <label
                  key={value}
                  className={cn(
                    "relative inline-flex w-full cursor-pointer flex-col gap-1 rounded-md border border-neutral-200 bg-white p-3 hover:bg-neutral-50",
                    value === commissionType && "border-2 border-neutral-900",
                  )}
                >
                  <input
                    type="radio"
                    value={value}
                    name="commissionType"
                    className={cn(
                      "absolute right-2 top-2 h-4 w-4 cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0",
                      value !== commissionType && "hidden",
                    )}
                    onChange={(e) => setCommissionType(e.target.value)}
                    checked={value === commissionType}
                  />
                  <span className="mb-1 text-sm font-semibold leading-none text-neutral-900">
                    {label}
                  </span>
                  <span className="text-sm font-normal leading-none text-neutral-900">
                    {description}
                  </span>
                </label>
              ))}
            </div>

            {/* <div>
            <label
              htmlFor="duration"
              className="text-sm font-medium text-neutral-800"
            >
              Duration
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <select
                className="block w-full rounded-md border-neutral-300 text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 sm:text-sm"
                required
              >
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
            </div>
          </div> */}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-semibold leading-[17.60px] text-neutral-900">
              {t("payout")}
            </h3>
            <p className="text-sm font-normal leading-[21px] text-neutral-600">
              {t("partner-reward-amount")}
            </p>
          </div>

          <p className="space-y-4">
            <div>
              <label
                htmlFor="commissionType"
                className="text-sm font-medium text-neutral-800"
              >
                {t("payout-model")}
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <select
                  className="block w-full rounded-md border-neutral-300 text-neutral-800 focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 sm:text-sm"
                  required
                >
                  <option value="flat">{t("flat")}</option>
                  <option value="percentage">{t("percentage")}</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="duration"
                className="text-sm font-medium text-neutral-800"
              >
                {t("amount")}
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  className="block w-full rounded-md border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 sm:text-sm"
                  required
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="duration"
                className="text-sm font-medium text-neutral-800"
              >
                {t("minimum-payout")}
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  className="block w-full rounded-md border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-neutral-500 sm:text-sm"
                  required
                  autoComplete="off"
                />
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                {t("minimum-payout-amount")}
              </p>
            </div>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-neutral-200 bg-neutral-50 px-8 py-5">
        <div>
          <Button text={t("save-changes")} className="h-8" />
        </div>
      </div>
    </div>
  );
};
