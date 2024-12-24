import { getTranslations } from "next-intl/server";
import { getSession } from "@/lib/auth/utils";
import { dub } from "@/lib/dub";
import LayoutLoader from "@/ui/layout/layout-loader";
import { AnimatedEmptyState } from "@/ui/shared/animated-empty-state";
import { DubWidget } from "@dub/embed-react";
import { CursorRays, Hyperlink, InvoiceDollar, UserCheck } from "@dub/ui/icons";
import { Suspense } from "react";

export const dynamic = "auto";

export default function ReferralsPage() {
  return (
    <Suspense fallback={<LayoutLoader />}>
      <ReferralsPageRSC />
    </Suspense>
  );
}
async function ReferralsPageRSC() {
const t = await getTranslations("app.dub.co/(dashboard)/account/settings/referrals");

  const session = await getSession();
  const referralLinkId = session?.user.referralLinkId;

  if (!referralLinkId)
    return (
      <AnimatedEmptyState
        title={t('refer-a-friend')}
        description={t('activate-your-referral-link-to-share-the-word-about-dub-and-earn-cash-rewards')}
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
    );

  const { publicToken } = await dub.embedTokens.create({
    linkId: referralLinkId,
  });

  return <DubWidget token={publicToken} variant="inline" />;
}
