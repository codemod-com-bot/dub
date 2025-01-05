import { PageContent } from "@/ui/layout/page-content";
import { useTranslations } from "next-intl";

import { AnimatedEmptyState } from "@/ui/shared/animated-empty-state";
import { MaxWidthWrapper, UserCheck } from "@dub/ui";

export default function PeopleSettings() {
  const t = useTranslations("partners.dub.co/(dashboard)/settings/people");

  return (
    <PageContent title="People" hideReferButton>
      <MaxWidthWrapper>
        <AnimatedEmptyState
          title={t("people-label")}
          description={t("add-manage-teammates")}
          cardContent={
            <>
              <UserCheck className="size-4 text-neutral-700" />
              <div className="h-2.5 w-28 min-w-0 rounded-sm bg-neutral-200" />
            </>
          }
          pillContent="Coming soon"
        />
      </MaxWidthWrapper>
    </PageContent>
  );
}
