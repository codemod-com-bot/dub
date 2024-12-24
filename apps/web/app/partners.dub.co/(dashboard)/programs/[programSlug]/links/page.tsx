import { useTranslations } from "next-intl";
import { PageContent } from "@/ui/layout/page-content";

import { AnimatedEmptyState } from "@/ui/shared/animated-empty-state";
import {
  CursorRays,
  Hyperlink,
  InvoiceDollar,
  MaxWidthWrapper,
  UserCheck,
} from "@dub/ui";

export default function ProgramLinks() {
const t = useTranslations("partners.dub.co/(dashboard)/programs/[programSlug]/links");

  return (
    <PageContent title="Links" hideReferButton>
      <MaxWidthWrapper>
        <AnimatedEmptyState
          title={t('links')}
          description={t('create-additional-partner-links-and-view-more-details-about-each-one')}
          cardContent={
            <>
              <Hyperlink className="size-4 text-neutral-700" />
              <div className="h-2.5 w-24 min-w-0 rounded-sm bg-neutral-200" />
              <div className="xs:flex hidden grow items-center justify-end gap-1.5 text-gray-500">
                <CursorRays className="size-3.5" />
                <UserCheck className="size-3.5" />
                <InvoiceDollar className="size-3.5" />
              </div>
            </>
          }
          pillContent="Coming soon"
        />
      </MaxWidthWrapper>
    </PageContent>
  );
}
