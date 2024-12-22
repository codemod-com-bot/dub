import { useTranslation } from "react-i18next";
import { PageContent } from "@/ui/layout/page-content";

import { AnimatedEmptyState } from "@/ui/shared/animated-empty-state";
import { MaxWidthWrapper, UserCheck } from "@dub/ui";

export default function PeopleSettings() {
const { t } = useTranslation("partners.dub.co/(dashboard)/settings/people");

  return (
    <PageContent title="People" hideReferButton>
      <MaxWidthWrapper>
        <AnimatedEmptyState
          title={t('people')}
          description={t('add-and-manage-teammates-to-this-partner-profile')}
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
