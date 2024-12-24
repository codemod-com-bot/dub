"use client";
import { useTranslations } from "next-intl";


import useWorkspace from "@/lib/swr/use-workspace";
import { buttonVariants, MaxWidthWrapper } from "@dub/ui";
import { cn } from "@dub/utils";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function WorkspaceExceededClicks() {
const t = useTranslations("../ui/workspaces");

  const { slug, nextPlan } = useWorkspace();

  return (
    <MaxWidthWrapper>
      <div className="my-10 flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
        <div className="rounded-full bg-gray-100 p-3">
          <Lock className="h-6 w-6 text-gray-600" />
        </div>
        <h1 className="my-3 text-xl font-semibold text-gray-700">{t('stats-locked')}</h1>
        <p className="z-10 max-w-sm text-center text-sm text-gray-600">{t('workspace-exceeded-monthly-clicks-limits')}</p>
        <img
          src="https://assets.dub.co/misc/video-park.svg"
          alt={t('no-links-yet')}
          width={400}
          height={400}
          className="-my-8"
        />

        <Link
          href={`/${slug}/upgrade`}
          className={cn(
            buttonVariants(),
            "flex h-9 items-center justify-center rounded-md border px-4 text-sm",
          )}
        >{t('upgrade-to')}{nextPlan.name}
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
