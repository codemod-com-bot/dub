"use client";
import { useTranslations } from "next-intl";


import usePartnersCount from "@/lib/swr/use-partners-count";
import { PartnerStatusBadges } from "@/ui/partners/partner-status-badges";
import { ProgramStatsFilter } from "@/ui/partners/program-stats-filter";
import { useRouterStuff } from "@dub/ui";
import { ChartLine, Users } from "@dub/ui/icons";
import { useParams } from "next/navigation";

interface PartnerCount {
  status: string;
  _count: number;
}

export function PartnerStats() {
const t = useTranslations("app.dub.co/(dashboard)/[slug]/programs/[programId]/partners");

  const { slug, programId } = useParams();
  const { queryParams } = useRouterStuff();

  const { partnersCount, error } = usePartnersCount<PartnerCount[]>({
    groupBy: "status",
    ignoreParams: true,
  });

  const approved = partnersCount?.find(
    (partner) => partner.status === "approved",
  )?._count;

  const pending = partnersCount?.find(
    (partner) => partner.status === "pending",
  )?._count;

  const all = partnersCount?.reduce((acc, curr) => acc + curr._count, 0);

  return (
    <div className="xs:grid-cols-4 xs:divide-x xs:divide-y-0 grid divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200">
      <ProgramStatsFilter
        label={t('all')}
        href={`/${slug}/programs/${programId}/partners`}
        count={all}
        icon={Users}
        iconClassName="text-gray-600 bg-gray-100"
        error={!!error}
      />
      <ProgramStatsFilter
        label={t('top-partners')}
        href={
          queryParams({
            set: {
              sortBy: "earnings",
              sortOrder: "desc",
            },
            getNewPath: true,
          }) as string
        }
        count={approved}
        icon={ChartLine}
        iconClassName="text-blue-600 bg-blue-100"
        error={!!error}
      />
      <ProgramStatsFilter
        label={t('approved')}
        href={
          queryParams({
            set: { status: "approved" },
            getNewPath: true,
          }) as string
        }
        count={approved}
        icon={PartnerStatusBadges.approved.icon}
        iconClassName={PartnerStatusBadges.approved.className}
        error={!!error}
      />
      <ProgramStatsFilter
        label={t('pending')}
        href={
          queryParams({
            set: { status: "pending" },
            getNewPath: true,
          }) as string
        }
        count={pending}
        icon={PartnerStatusBadges.pending.icon}
        iconClassName={PartnerStatusBadges.pending.className}
        error={!!error}
      />
    </div>
  );
}
