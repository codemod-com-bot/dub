import { getSession, hashToken } from "@/lib/auth";
import { redis } from "@/lib/upstash";
import EmptyState from "@/ui/shared/empty-state";
import { sendEmail } from "@dub/email";
import { subscribe } from "@dub/email/resend/subscribe";
import { unsubscribe } from "@dub/email/resend/unsubscribe";
import { EmailUpdated } from "@dub/email/templates/email-updated";
import { prisma } from "@dub/prisma";
import { InputPassword, LoadingSpinner } from "@dub/ui";
import { VerificationToken } from "@prisma/client";
import { waitUntil } from "@vercel/functions";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ConfirmEmailChangePageClient from "./page-client";

export const runtime = "nodejs";

interface PageProps {
  params: { token: string };
  searchParams: { cancel?: string };
}

export default async function ConfirmEmailChangePage(props: PageProps) {
  const t = await getTranslations(
    "app.dub.co/(auth)/auth/confirm-email-change/[token]",
  );

  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <Suspense
        fallback={
          <EmptyState
            icon={LoadingSpinner}
            title={t("verifying-email-change")}
            description={t("verifying-email-change-request")}
          />
        }
      >
        <VerifyEmailChange {...props} />
      </Suspense>
    </div>
  );
}

const VerifyEmailChange = async ({
  params: { token },
  searchParams,
}: PageProps) => {
  const t = await getTranslations(
    "app.dub.co/(auth)/auth/confirm-email-change/[token]",
  );

  const tokenFound = await prisma.verificationToken.findUnique({
    where: {
      token: await hashToken(token, { secret: true }),
    },
  });

  if (!tokenFound || tokenFound.expires < new Date()) {
    return (
      <EmptyState
        icon={InputPassword}
        title={t("invalid-token")}
        description={t("invalid-or-expired-token")}
      />
    );
  }

  // Cancel the email change request (?cancel=true)
  const { cancel } = searchParams;

  if (cancel && cancel === "true") {
    await deleteRequest(tokenFound);

    return (
      <EmptyState
        icon={InputPassword}
        title={t("email-change-request-cancelled")}
        description={t("email-change-request-cancellation-message")}
      />
    );
  }

  // Process the email change request
  const session = await getSession();

  if (!session) {
    redirect(`/login?next=/auth/confirm-email-change/${token}`);
  }

  const currentUserId = session.user.id;

  const data = await redis.get<{
    email: string;
    newEmail: string;
  }>(`email-change-request:user:${currentUserId}`);

  if (!data) {
    return (
      <EmptyState
        icon={InputPassword}
        title={t("duplicate-invalid-token")}
        description={t("request-new-token")}
      />
    );
  }

  const user = await prisma.user.update({
    where: {
      id: currentUserId,
    },
    data: {
      email: data.newEmail,
    },
    select: {
      subscribed: true,
    },
  });

  waitUntil(
    Promise.all([
      deleteRequest(tokenFound),

      ...(user.subscribed
        ? [
            unsubscribe({ email: data.email }),
            subscribe({ email: data.newEmail }),
          ]
        : []),

      sendEmail({
        subject: "Your email address has been changed",
        email: data.email,
        react: EmailUpdated({
          oldEmail: data.email,
          newEmail: data.newEmail,
        }),
      }),
    ]),
  );

  return <ConfirmEmailChangePageClient />;
};

const deleteRequest = async (tokenFound: VerificationToken) => {
  await Promise.all([
    prisma.verificationToken.delete({
      where: {
        token: tokenFound.token,
      },
    }),

    redis.del(`email-change-request:user:${tokenFound.identifier}`),
  ]);
};
