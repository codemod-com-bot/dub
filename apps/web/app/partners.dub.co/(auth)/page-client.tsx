"use client";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@dub/ui";
import { LinkedIn, Twitter } from "@dub/ui/icons";
import { cn } from "@dub/utils";
import Link from "next/link";

export function PartnersPageClient() {
  const t = useTranslations("partners.dub.co/(auth)");

  return (
    <div className="mx-auto my-10 w-full max-w-md md:mt-16 lg:mt-20">
      <div className="rounded-lg border border-neutral-200 bg-white p-4 py-6 sm:p-8 sm:pb-10">
        <h1 className="text-lg font-medium text-neutral-800">
          {t("on-waitlist-message")}
        </h1>
        <p className="mt-0.5 text-sm text-neutral-500">
          {t("contact-when-ready-message")}
        </p>
        <div className="my-8 h-px w-full bg-neutral-300" />
        <h2 className="text-sm font-medium text-neutral-800">
          {t("subscribe-to-news-message")}
        </h2>
        <p className="mt-0.5 text-sm text-neutral-500">
          {t("stay-up-to-date-message")}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Link
            href="https://x.com/dubdotco"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "flex h-9 items-center justify-center rounded-md border px-4 text-center text-sm",
            )}
          >
            <Twitter className="mr-2 size-4" />
            {t("social-handle-dubdotco")}
          </Link>
          <Link
            href="https://www.linkedin.com/company/dubinc"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "flex h-9 items-center justify-center rounded-md border px-4 text-center text-sm",
            )}
          >
            <LinkedIn className="mr-2 size-4 text-current" />
            {t("social-handle-dubinc")}
          </Link>
        </div>
      </div>
    </div>
  );
}
