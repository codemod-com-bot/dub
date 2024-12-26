import { getSession } from "@/lib/auth";
import EmptyState from "@/ui/shared/empty-state";
import { prisma } from "@dub/prisma";
import { LoadingSpinner } from "@dub/ui";
import { LinkBroken, Users6 } from "@dub/ui/icons";
import { APP_NAME } from "@dub/utils";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const runtime = "nodejs";

export default function InitesPage({
  params,
}: {
  params: {
    code: string;
  };
}) {
  const t = useTranslations("app.dub.co/(auth)/invites/[code]");

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <Suspense
        fallback={
          <EmptyState
            icon={LoadingSpinner}
            title={t("verifying-invite")}
            description={`${APP_NAME} is verifying your invite link. This might take a few seconds...`}
          />
        }
      >
        <VerifyInvite code={params.code} />
      </Suspense>
    </div>
  );
}

async function VerifyInvite({ code }: { code: string }) {
  const t = await getTranslations("app.dub.co/(auth)/invites/[code]");

  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const workspace = await prisma.project.findUnique({
    where: {
      inviteCode: code,
    },
    select: {
      id: true,
      slug: true,
      usersLimit: true,
      users: {
        where: {
          userId: session.user.id,
        },
        select: {
          role: true,
        },
      },
      _count: {
        select: {
          users: {
            where: {
              user: {
                isMachine: false,
              },
            },
          },
        },
      },
    },
  });

  if (!workspace) {
    return (
      <EmptyState
        icon={LinkBroken}
        title={t("invalid-invite-link")}
        description={t("invalid-invite-link-message")}
      />
    );
  }

  // check if user is already in the workspace
  if (workspace.users.length > 0) {
    redirect(`/${workspace.slug}`);
  }

  if (workspace._count.users >= workspace.usersLimit) {
    return (
      <EmptyState
        icon={Users6}
        title={t("user-limit-reached")}
        description={t("workspace-full-message")}
      />
    );
  }

  await prisma.projectUsers.create({
    data: {
      userId: session.user.id,
      projectId: workspace.id,
      notificationPreference: {
        create: {}, // by default, users are opted in to all notifications
      },
    },
  });

  redirect(`/${workspace.slug}`);
}
