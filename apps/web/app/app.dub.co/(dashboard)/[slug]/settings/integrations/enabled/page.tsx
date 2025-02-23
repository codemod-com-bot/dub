import { IntegrationLogo } from "@/ui/integrations/integration-logo";
import { BackLink } from "@/ui/shared/back-link";
import { prisma } from "@dub/prisma";
import { Avatar } from "@dub/ui";
import { cn, formatDate, truncate } from "@dub/utils";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

export default function EnabledIntegrationsPage({
  params,
}: {
  params: { slug: string };
}) {
  const t = useTranslations(
    "app.dub.co/(dashboard)/[slug]/settings/integrations/enabled",
  );

  return (
    <div className="mx-auto flex w-full max-w-screen-md flex-col gap-8">
      <BackLink href={`/${params.slug}/settings/integrations`}>
        {t("integrations-title")}
      </BackLink>
      <h1 className="text-2xl font-semibold tracking-tight text-black">
        {t("enabled-integrations-title")}
      </h1>
      <Suspense fallback={<div>{t("loading-message")}</div>}>
        <EnabledIntegrationsPageRSC slug={params.slug} />
      </Suspense>
    </div>
  );
}

async function EnabledIntegrationsPageRSC({ slug }: { slug: string }) {
  const t = await getTranslations(
    "app.dub.co/(dashboard)/[slug]/settings/integrations/enabled",
  );

  const integrations = await prisma.integration.findMany({
    where: {
      verified: true,
      installations: {
        some: {
          project: {
            slug,
          },
        },
      },
    },
    include: {
      installations: {
        where: {
          project: {
            slug,
          },
        },
        include: {
          user: true,
        },
      },
    },
  });

  return (
    <ul className="flex flex-col gap-2">
      {integrations.map((integration) => {
        const installation = integration.installations?.[0];
        const installerName =
          installation?.user?.name || installation?.user?.email;

        return (
          <li key={integration.id}>
            <Link
              href={`/${slug}/settings/integrations/${integration?.slug}`}
              className={cn(
                "group flex items-center justify-between rounded-lg border border-neutral-200 p-3 pr-5 text-sm",
                "transition-colors duration-75 hover:bg-neutral-50",
              )}
            >
              <div className="flex min-w-0 items-center justify-between gap-3">
                <IntegrationLogo
                  src={integration.logo}
                  alt={t("logo-description-integration", {
                    integrationName: integration.name,
                  })}
                  className="size-10"
                />

                <div className="flex min-w-0 flex-col">
                  <span className="text-sm font-medium text-neutral-800">
                    {integration.name}
                  </span>
                  {installation && (
                    <span className="truncate text-[0.8125rem] text-neutral-500">
                      {t("enabled-label")}
                      {installerName ? (
                        <>
                          {t("by-label")}
                          <Avatar
                            user={installation.user}
                            className="inline-block size-3 -translate-y-0.5 border-0"
                          />{" "}
                          <span className="text-neutral-600">
                            {truncate(installerName, 24)}
                          </span>{" "}
                        </>
                      ) : null}
                      {formatDate(installation.createdAt, {
                        month: "short",
                        year:
                          installation.createdAt.getFullYear() ===
                          new Date().getFullYear()
                            ? undefined
                            : "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="size-4 shrink-0 text-neutral-400 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-neutral-600" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
