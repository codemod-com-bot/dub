import AddEditIntegrationForm from "@/ui/oauth-apps/add-edit-integration-form";
import { BackLink } from "@/ui/shared/back-link";
import { prisma } from "@dub/prisma";
import { MaxWidthWrapper } from "@dub/ui";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function IntegrationManagePage({
  params,
}: {
  params: { slug: string; integrationSlug: string };
}) {
  const t = await getTranslations(
    "app.dub.co/(dashboard)/[slug]/settings/integrations/[integrationSlug]/manage",
  );

  // this is only available for Dub workspace for now
  // we might open this up to other workspaces in the future
  if (params.slug !== "dub") {
    notFound();
  }
  const integration = await prisma.integration.findUnique({
    where: {
      slug: params.integrationSlug,
    },
  });
  if (!integration) {
    notFound();
  }
  return (
    <MaxWidthWrapper className="grid max-w-screen-lg gap-8">
      <BackLink href={`/${params.slug}/settings/integrations`}>
        {t("back-to-integrations")}
      </BackLink>

      <AddEditIntegrationForm
        integration={{
          ...integration,
          screenshots: integration.screenshots as string[],
        }}
      />
    </MaxWidthWrapper>
  );
}
